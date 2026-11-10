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
`44713316-a797-44f2-a990-6367e4b2e6c4`, from `d9209f1`. That adds the narrowed roster,
the slow-mode ramp, the failure retry measured from the finish, and the map-view and
search changes. The deployed bytes were verified to contain `computeNextScrapeAt` and
`countReportingAgencies`, and to contain **zero** occurrences of `nextScrapeAt2` or
`scrapeResults.results`. Bindings and the `*/1` cron survived the deploy.

**Verified after deploy.** The first run on the corrected build finished at
`2026-11-09T15:13:52.211Z`, and its record is clean:

```json
{"mode": "fast", "stored": 33, "skipped": 2586, "error": null,
 "next_scrape": "2026-11-09T15:16:52.211Z"}
```

Health reads `reporting_agencies: 34 of 34`, `degraded: false` — the first time that flag
has cleared. Both fixes are therefore confirmed in production, not merely deployed: the
counter is no longer pinned at zero, and `next_scrape` lands three minutes *after* the
run finished, so the Worker idles between runs instead of scraping back to back. The
flag used to stay `true` because of the five silent codes the narrowed roster removed,
not because of a fault.

Storage always happens before the point where the old code failed, so nothing was lost
while pacing was broken; rows kept arriving throughout. The cron lock does mean a failed
run can leave the Worker idle for up to fifteen minutes, so after any deploy read
`last_run` before concluding anything — and remember it describes the last *completed*
run, not the one in flight.

## Open questions — the owner's calls

1. **`degraded` can never clear, and the roster is stale in both directions.** Health is
   computed against 39 configured codes, and across the whole eight-day retention window
   the best attainable count is **34**: `AL`, `CB`, `RC-HE`, `RC-BE` and `RC-LE` have no
   rows at all, so `39 - 34 = 5 > 3` and `degraded: true` is structural rather than a
   fault signal. In the other direction the data holds **54** agency values, because 20
   `RC-*` station codes (`RC-T`, `RC-I`, `RC-L`, `RC-PC`, `RC-D`, …) report but are not in
   the roster — which is why the site header advertises "54 agencies" while health says
   39. Decide the denominator before touching the threshold: narrowing the roster and
   widening it are different decisions, and neither is the same as measuring against the
   codes that have reported recently.

   **Decided 2026-11-09 (owner):** narrow the roster. `AL`, `CB`, `RC-HE`, `RC-BE` and
   `RC-LE` are removed from `ALL_AGENCY_CODES`, so the denominator is 34 and `degraded`
   clears on a cycle where all 34 report; widening it to the 20 unlisted `RC-*` station
   codes was not chosen. The removal also ends the ASP.NET city query for those five,
   and rows that arrive for them from another source are still stored but no longer
   counted.
2. **Slow mode never varies — fixed 2026-11-09.** It computed `Math.min(prevInterval * 2,
   15 min)` then `Math.max(that, 15 min)`, which is always exactly 15 minutes, so the
   intended backoff was dead code and one quiet cycle dropped straight to the slowest
   pace. `computeSlowInterval()` now doubles the previous gap held between the fast
   interval and the 15-minute cap, so a quiet cycle steps 3 → 6 → 12 → 15 and the
   interval is testable rather than inlined in `scheduled()`.
3. **The repo is public.** It was intended private. The code contains no credentials, but
   the scraper's implementation is readable by anyone, including the agencies it reads.
4. **Rotate `GITHUB_PAT_TOKEN`.** It was printed into a chat transcript by a malformed
   inline git credential helper on 2026-11-09, and it still authenticated afterwards.
5. **The error path's retry was measured from the run's start — fixed 2026-11-09.** The
   `catch` that schedules after a failure computed `now + 15 min` from when the run
   *began*, not when it failed. Harmless at ~190 s, so it was left alone in `cbf5071`,
   but it turns into a same-minute retry loop once a failing run outlives its window.
   It now goes through `computeNextScrapeAt(Date.now(), 15 min)` like the success path.

## Working rules that will bite you

- `wrangler deploy` warns that the Worker was last updated via the script API and that
  local code overrides those edits. Expected on the first deploy from the repo; after
  today the repo and production agree.
- The cron lock is written at the start of every run, so after a failed run the Worker
  can sit idle for up to 15 minutes. That is not a crash.
- `/api/admin/*` is declared in the router and answers **404** without credentials. It
  was not exercised.
- `wrangler deploy` from this repo is the only deploy path. There is no CI.

## 2026-11-09 - anonymous community reports

Owner chose the shape: a real D1 table, public but labelled unverified, geo-fenced with a per-IP limit.

- Storage: new table `user_reports` (id, created_at, category, note, lat, lng, accuracy_m, confirmations, expires_at) plus `idx_user_reports_expires`. It was created out-of-band with `CREATE TABLE IF NOT EXISTS`, so a fresh environment needs that DDL before reports work.
- Routes: `GET /api/reports` returns active rows (expires_at > now, newest first, max 200); `POST /api/reports` accepts `{category, note, lat, lng, accuracy_m}`.
- Guarantees: category allowlist (police/fire/medical/traffic/other); coordinates must fall inside BBOX; notes are stripped of control characters, collapsed and capped at 280; one report per hashed CF-Connecting-IP every 3 minutes, held in KV under `report_rl:<sha256 prefix>`; every row expires after 6 hours and `purgeExpiredReports()` sweeps on each cron run.
- UI: header `Report` button opens `#report-modal`, which defaults to the map centre and offers an optional "use my location" button. Reports draw in their own amber dashed layer (`initReportLayer`/`renderReports` in map.js) tagged "COMMUNITY REPORT - UNVERIFIED", so agency filters never hide them and they are not mistakable for county dispatch data.
- Tests: `test/reports.test.mjs` (5 tests); suite is 20.
- Open: no moderation queue - any in-county pin is public immediately. `confirmations` exists in the schema but nothing increments it yet, so there is no way for other users to corroborate a report.

## 2026-11-10 - reports beside the dispatch list, and an owner override

- **List.** `#report-list` sits between the panel header and `#card-grid`, so community reports are visible next to the dispatch cards instead of only as pins. Each row shows the category, the note (or coordinates when there is no note), the age, the confirmation count and either `CONFIRMED` in green or a `hidden by flags` / `hidden by owner` marker. Clicking a row recentres the map on that pin and opens the same popup. The list follows the existing all / confirmed / off filter and the local "hide for me" set, and hides itself when empty.
- **Owner override.** `POST /api/reports/:id/hide` and `.../restore` are owner-only. Access is gated on the secret binding `OWNER_REPORT_KEY`, supplied by the browser as the `X-Owner-Key` header; the comparison hashes both sides and XORs the digests so it does not leak length or position. **With no secret set every owner request answers 401**, so the feature fails closed and a fresh environment is never moderatable by an empty header.
- **Where the state lives.** Owner hides go in KV under `report_owner_hidden:<id>` (24 h TTL) - deliberately KV, not a column, so this needed no schema change. `restore` deletes that key plus `report_hidden:<id>` and `report_abuse:<id>`, so restoring also clears the crowd's flags.
- **Who sees hidden rows.** The public `GET /api/reports` now filters both the crowd-hidden and the owner-hidden set. A request carrying a valid owner key sees every active row, annotated with `owner_hidden` and `crowd_hidden`, and that response is `Cache-Control: no-store`.
- **UI.** The padlock in the report list header prompts once for the key, verifies it with `GET /api/reports` (`owner: true` in the reply), keeps it in `localStorage` (`sb-owner-key`) and adds Hide / Restore to each row. A 401/403 forgets the key rather than silently retrying.
- **Not yet exercised in production:** the secret has to be created by the owner (`wrangler secret put OWNER_REPORT_KEY`, or Workers -> Settings -> Variables), so at time of writing the owner endpoints answer 401 and the hide/restore path is proven only against a stub D1/KV harness and the unit tests.
- Tests: 27. Map module cache bumped to `sb-dispatch-v3` because `/js/*` is cache-first and a fixed cache name pins the old module.
