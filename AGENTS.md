# AGENTS.md — sbcounty-probe (the watcher)

Rules for this repository. **`mind`** (`dno-luigi/mind`) is the authority for the
ecosystem: its `AGENTS.md` governs work here too, and this file records only what is
specific to the watcher. Read `mind`'s file first, then this one, then `HANDOFF.md`.

This file holds invariants only. Current state and open questions live in `HANDOFF.md`;
the front door is `START-HERE.md`.

## 0. Who `mind` is

- `mind` is the **supervising project** for this account — not a peer repo and not a
  dependency. It runs at `mind.ai-n.workers.dev` and `ai-nspired.com`.
- It **inspects production read-only**: Worker bindings, secret *names*, deployment
  history, D1 row counts, health payloads, live HTTP.
- It **sets standards** across the account and **may write this repository's agent
  instruction files**.
- It does **not** own this repository's runtime. Source, deployment, data and
  enforcement stay here. The charter is `docs/MIND-AUTHORITY.md` in `mind`.
- Practical consequence: `mind` has already read this project's deployed state and will
  re-check anything you claim. Verify against the API or the live URL; do not answer
  from memory. If you say the health endpoint reports 34 agencies, fetch it.

## What this is

SB County Dispatch, live at **`watcher.ai-n.org`** (also
`sbcounty-probe.ai-n.workers.dev`). One Cloudflare Worker scrapes county dispatch
feeds, deduplicates them into D1, geocodes what it can inside the county bounding box,
and serves both the map UI and a JSON API from the same origin. There is no separate
frontend build.

## Invariants

These look like bugs when met cold. Do not "fix" them.

- **One cron, every minute** (`*/1 * * * *`). Pacing is decided inside `scheduled()`:
  fast (3 min) when a run stored something, and a backoff of 3 → 6 → 12 → 15 min when
  nothing was new and the data is neither stale nor changed (`computeSlowInterval()`).
  Do not shorten the trigger to chase freshness — the source sites rate-limit, and
  `meta:rate_limited` already suspends scraping for five minutes when they do.
- **Deduplication is the content hash.** `INSERT OR IGNORE INTO dispatch_calls` keyed on
  `hash`, from `contentHash(normalized)`. A run reporting `stored: 0` is normal: it means
  nothing new. Never make emptiness disappear by dropping the hash.
- **Retention is eight days.** `purgeOldRecords(env, 8)` deletes rows older than that on
  every run. A row count that stops growing is retention, not a stalled pipeline.
- **The next run is scheduled from the finish time**, through `computeNextScrapeAt()`,
  on the success path and in the failure `catch` alike — the `catch` used to measure
  from the run's start, which retries immediately once a failing run outlives its
  window. Do not rename it to `nextScrapeAt`: `scheduled()` already binds a *local*
  `nextScrapeAt` from KV, which shadows a module-level function of that name and turns
  the call site into a number. That exact mistake broke every run for half an hour on
  2026-11-09.
- **Health counters come from the payload the run produced.** `countReportingAgencies()`
  unions `aspNet`, `riverside` and `wordpress` agencies and intersects
  `ALL_AGENCY_CODES`, because ASP.NET holds only 28 of the 34 configured codes and the
  Riverside divisions arrive as `RC-*` rows from a different source. `degraded` is
  `(total - reporting) > 3`, so the counter must be comparable to that denominator.
- **A run takes ~165–185 s**, longer than the 3-minute fast interval. That is why pacing
  is measured from the finish, and why `last_run` describes the *previous* run.
- **Geocoding is Nominatim**, at most one request per 1.1 s, bounded by `BBOX` to San
  Bernardino County. It is a courtesy service; do not raise the rate.
- **The UI is inlined** in `STATIC_ASSETS` inside `worker.js`, one bundled file of about
  4,700 lines. There is no build step and no asset directory. An unknown path returns
  `index.html`, so a catch-all route can look like a working endpoint.
- **Secrets are by name only.** Never echo a value, commit one, or put one on a command
  line. Prefer `GIT_ASKPASS` over an inline credential helper: an inline helper leaked a
  token into a transcript on 2026-11-09.
- **A push does not deploy.** There is no CI workflow here. Deploying is an explicit
  `wrangler deploy`, and it is the owner's decision.

## Verify before claiming

```bash
node --check worker.js
node --test test/                       # 30 tests
npx wrangler deploy --dry-run           # config and bundle, deploys nothing
curl -s https://watcher.ai-n.org/api/health
```

The health endpoint describes the last *completed* run. After a deploy, wait for a run
to finish before quoting it: a run already in flight belongs to the previous isolate and
will report the old values.

## Stop and ask

- A deploy.
- A D1 schema change, a change to the retention window, or anything that deletes rows.
- A change to `ALL_AGENCY_CODES` or to the `degraded` threshold: both change what the
  health number *means*, and the owner reads that number.
- Adding a source, a binding or a namespace.
- Two instructions that conflict, or this file disagreeing with the code.

## Layout

| path | what lives there |
| --- | --- |
| `START-HERE.md` | front door: who `mind` is, what to read, what not to touch |
| `HANDOFF.md` | current state, what changed, what is verified and what is open |
| `worker.js` | the whole Worker: scraper, storage, geocoding, API, inlined site |
| `wrangler.jsonc` | bindings and cron, reproducing the deployed Worker |
| `test/health.test.mjs` | the reporting count rule behind `/api/health` |
| `test/cadence.test.mjs` | the next-run scheduling rule |
| `test/reports.test.mjs` | the report rules: categories, county box, note cleaning, county match, owner key |
| `test/citizen.test.mjs` | the Citizen source: vector-tile reading and the category allow-list |
