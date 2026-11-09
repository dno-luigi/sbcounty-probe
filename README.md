# sbcounty-probe

The Worker behind **SB County Dispatch** (`https://sbcounty-probe.ai-n.workers.dev`):
it scrapes San Bernardino County dispatch feeds, deduplicates them into D1, geocodes
what it can within the county bounding box, and serves both the site and its JSON API
from one origin.

## Provenance, and why this repo starts with one file

Until 2026-11-09 this Worker had no repository. Its last deployment (2026-09-23) came
from source `api`, not `wrangler`, so the only copy of its source was the module
Cloudflare served. Commit 1 is that module, byte-for-byte, pulled from the Workers API
and committed unmodified; everything after it is a normal diff against a real base.

`worker.js` is a single bundled file — the front-end markup and client script are
inlined in `STATIC_ASSETS` — so it stays one file here rather than being split on
extraction, which would have made the first diff unreviewable.

## What runs

| binding | resource | id |
| --- | --- | --- |
| `DISPATCH_D1` | D1 `sbcd1` | `eb19d2f8-8555-4aea-a3dc-6b6e6c37ba1e` |
| `DISPATCH_KV` | KV | `35069c0e518a4a68b952a208e0cc225c` |
| `DISPATCH_R2` | R2 `sbclog` | — |

Cron: `*/1 * * * *`. `scheduled()` picks its own pace — a 3-minute interval in fast
mode (a run stored something), 15 minutes in slow mode (nothing new, data neither
stale nor changed). `meta:rate_limited` suspends scraping for 5 minutes when a source
answers 429.

Records are inserted with `INSERT OR IGNORE` against a content hash, and
`purgeOldRecords(env, 8)` deletes anything whose `scraped_at` is older than eight days
on every run. **A run reporting `stored: 0` is therefore normal** — it means every
record was a duplicate. It is not a stalled pipeline.

## Endpoints

Verified against the live Worker with a `GET` on 2026-11-09:

| path | status | |
| --- | --- | --- |
| `/api/health` | 200 | source health, last run, last backup |
| `/api/quality` | 200 | completeness: location, geocode, disposition |
| `/api/codes` | 200 | call types, dispositions, agency names |
| `/api/metrics` | 200 | metrics snapshot |

The router also declares `/api/dispatch*`, `/api/freshness`, `/api/geo/*`,
`/api/analytics/*`, `/api/backup(s)`, `/api/scrape` and `/api/admin/*`
(`scrape`, `cleanup`, `migrate`, `diag`). The admin paths answer **404** to a request
that carries no credentials, which is why they were not exercised from here.

## The fix this repo exists to carry

`/api/health` reported `reporting_agencies: 0` of `39` with `degraded: true` on every
cycle, while the pipeline was demonstrably healthy — 36,968 rows in `dispatch_calls`
spanning 2026-11-02 to 2026-11-09, ~4,900 new rows a day, disposition populated on
every row.

The cause was one property name. `runScraper()` returns
`{ aspNet, wordpress, riverside, stats, errors }`; the health writer read
`scrapeResults.results`, which never exists, so `Object.keys(undefined || {})` was 0
every time, and `degraded` is computed as `(total - reporting) > 3`.

`countReportingAgencies()` now counts the agency buckets that actually returned rows,
from `aspNet`, and is exported so the rule is testable:

```bash
node --test test/     # 6 tests, covering the bug directly
```

### The second fix: cadence

Fast mode is a 3-minute interval, but a run takes about 185 seconds. `next_scrape` was
computed from the moment the cron fired, so it was written **in the past** on every
fast run — observed as `next_scrape: 14:32:38` against a `timestamp` of `14:32:44` —
and each minute's tick started a fresh scrape with no idle gap. Scheduling from the
finish time (`nextScrapeAt()`) restores the intended pause.

## Working here

```bash
node --check worker.js
node --test test/
npx wrangler deploy --dry-run     # validates config and bundle; deploys nothing
npx wrangler deploy               # the real deploy — the owner's call
```

There is no CI workflow: **a push does not deploy.** The deployed Worker still runs the
pre-fix module until someone deploys this repository.

Read `AGENTS.md` before changing anything — it records the invariants (the dedupe hash,
the 8-day retention, the one-minute cron, the geocoding limits) that look like bugs if
you meet them cold.
