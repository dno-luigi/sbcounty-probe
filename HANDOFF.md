# Handoff — the watcher (SB County Dispatch)

Written 2026-11-09 by `mind`, from live reads of production. Everything here was
observed. Where something was *not* observed, it says so.

## What exists

| | |
| --- | --- |
| Public site | `watcher.ai-n.org` (also `sbcounty-probe.ai-n.workers.dev`) |
| Worker | `sbcounty-probe`, cron `*/1 * * * *` |
| Repo | `dno-luigi/sbcounty-probe`, public, branch `main` |
| Bindings | `DISPATCH_D1` → D1 `sbcd1` (`eb19d2f8-8555-4aea-a3dc-6b6e6c37ba1e`), `DISPATCH_KV` (`35069c0e518a4a68b952a208e0cc225c`), `DISPATCH_R2` → bucket `sbclog` |
| Secrets | none — the Worker holds no credentials of its own |
| Data | ~36,987 records, 54 distinct agency codes, 8-day retention, ~36% geocoded |

The site was confirmed rendering in a real browser on 2026-11-09: header read
"36,987 records · 54 agencies · scraped 6m ago · refreshed just now", with the map,
agency legend and dispatch list populated.

## Where the source came from

The Worker had **no repository** until 2026-11-09. Its last deployment (2026-09-23) came
from source `api`, so the only copy of its code was the module Cloudflare served. Commit
`84d41f8` is that module byte-for-byte, pulled from the Workers API; everything after it
is a normal diff against a real base. `wrangler.jsonc` reproduces the deployed bindings
and cron exactly, so a deploy from here changes code and nothing else (verified: the
config equals the live binding set).

## What changed today, in order

1. **`2625173` — health counted nothing.** `/api/health` reported
   `reporting_agencies: 0` of `39` with `degraded: true` on every cycle, while
   `dispatch_calls` was writing roughly 4,900 rows a day. `runScraper()` returns
   `{ aspNet, wordpress, riverside, stats, errors }`; the health writer read
   `scrapeResults.results`, which has never existed, so the count was zero by
   construction and `degraded` (`(total - reporting) > 3`) was pinned on.
2. **`ed218db` — cadence.** `nextAt` was `now + intervalMs` where `now` was the moment
   the cron fired. In fast mode the interval is 180 s and a run takes ~185 s, so
   `next_scrape` was written five seconds in the past and each minute's tick started
   another scrape with no idle gap.
3. **`cbf5071` — the regression that fix introduced, plus a second counting error.**
   Naming the helper `nextScrapeAt` collided with the *local* `const nextScrapeAt` that
   `scheduled()` reads from KV. The module-level function was shadowed at the call site,
   which resolved to a number: every run did about 160 s of real work and then died with
   `nextScrapeAt2 is not a function`, before writing `last_run` — losing `mode`,
   `stored` and `next_scrape`, and leaving the lock at the error branch's 15 minutes.
   Renamed to `computeNextScrapeAt`. Separately, counting only `aspNet` gave 28 of 39,
   because the Riverside divisions report as `RC-*` rows from a separate source; the
   count now unions `aspNet`, `riverside` and `wordpress` and intersects
   `ALL_AGENCY_CODES`.

Tests: 11, including one that fails if `.results` is read again, one for the cross-source
union, and one pinning the shadowing hazard.

## Deployed state

The corrected build is deployed: `source: wrangler`, version
`4e94c332-b087-4abd-89ae-3f1cba5d87c4`, from `cbf5071`. The deployed bytes were verified
to contain `computeNextScrapeAt` and `countReportingAgencies`, and to contain **zero**
occurrences of `nextScrapeAt2` or `scrapeResults.results`. Bindings and the `*/1` cron
survived the deploy.

**The thing to check first.** Storage happens *before* the failure point, so no data was
ever at risk, and rows kept arriving throughout the broken window. But `last_run` may
still describe a run that began before the deploy, and the error branch pushed the cron
lock (`meta:next_scrape_at`) fifteen minutes ahead. So:

```bash
curl -s https://watcher.ai-n.org/api/health
```

Healthy now looks like: no `error` field in `last_run`, `mode` present, `next_scrape`
strictly after `timestamp`, and `reporting_agencies` in the low thirties (see below for
why not 39). If you still see `error: nextScrapeAt2 is not a function`, that is a record
from before the deploy — wait one cycle and look again. Do not "fix" it again; it is
already fixed in `cbf5071`.

## Open questions — the owner's calls

1. **Seven configured agencies never report.** `ALL_AGENCY_CODES` has 39 entries; in a
   20-minute window `AL`, `AV`, `CB`, `VT`, `RC-HE`, `RC-BE` and `RC-LE` produced no rows
   at all, while `RC-A` … `RC-Y` and others report but are **not** in the list. So
   `degraded` may legitimately stay `true` on a healthy pipeline, and the denominator is
   stale in both directions. Pruning the list, or changing the threshold, changes what
   the health number means.
2. **Slow mode never varies.** It computes `Math.min(prevInterval * 2, 15 min)` then
   `Math.max(that, 15 min)`, which is always exactly 15 minutes, so the intended backoff
   is dead code.
3. **The repo is public.** It was intended private. The code contains no credentials, but
   the scraper's implementation is readable by anyone, including the agencies it reads.
4. **Rotate `GITHUB_PAT_TOKEN`.** It was printed into a chat transcript by a malformed
   inline git credential helper on 2026-11-09, and it still authenticated afterwards.

## Working rules that will bite you

- `wrangler deploy` warns that the Worker was last updated via the script API and that
  local code overrides those edits. Expected on the first deploy from the repo; after
  today the repo and production agree.
- The cron lock is written at the start of every run, so after a failed run the Worker
  can sit idle for up to 15 minutes. That is not a crash.
- `/api/admin/*` is declared in the router and answers **404** without credentials. It
  was not exercised.
- `wrangler deploy` from this repo is the only deploy path. There is no CI.
