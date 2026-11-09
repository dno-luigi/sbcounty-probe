# AGENTS.md

Rules for this repository. `mind` (`dno-luigi/mind`) is the authority for the
ecosystem: its `AGENTS.md` governs work here too, and this file only records what
is specific to this project. Read both.

## What this is

The Worker behind the SB County Dispatch page: it scrapes county dispatch feeds,
deduplicates them into D1, geocodes what it can, and serves the site and its API
from one origin.

## Invariants

- **One cron, every minute** (`*/1 * * * *`). Pacing is decided inside `scheduled()`:
  fast mode (3 min) when a run stored something, slow mode (15 min) when it stored
  nothing and the data is neither stale nor changed. Do not shorten the interval to
  chase freshness — the source sites rate-limit and `meta:rate_limited` already
  suspends scraping for 5 minutes when they do.
- **Deduplication is the content hash.** `INSERT OR IGNORE INTO dispatch_calls` keyed
  on `hash`, produced by `contentHash(normalized)`. A run with `stored: 0` is normal,
  not a fault: it means nothing new. Never "fix" emptiness by dropping the hash.
- **Retention is 8 days.** `purgeOldRecords(env, 8)` deletes rows whose `scraped_at` is
  older than that on every cron run. A row count that stops growing is retention, not
  a stalled pipeline.
- **Health must describe the run, not a guess.** `meta:source_health` is written from
  the values the run actually produced. Reading a property that does not exist is what
  made every health record claim `reporting: 0` of `39` and left `degraded: true`
  permanently. If you add a counter, take it from the payload you were handed.
- **Geocoding is rate-limited to one request per 1.1 s and bounded to the region.**
  Nominatim is a courtesy service; the `BBOX` guard keeps lookups inside San
  Bernardino County.
- **Secrets are by name only** — `CLOUDFLARE_API_TOKEN`, `OPENROUTER_API_KEY`,
  `ADMIN_KEY`. Never echo a value, never commit one, never put one in a command line.
  This repository needs none: every credential is a Worker binding.
- **A push here does not deploy.** There is no CI workflow. Deploying is a deliberate
  `wrangler deploy`, and it is the owner's call.

## Checks

```bash
node --check worker.js          # syntax
node --test test/               # unit tests
npx wrangler deploy --dry-run   # config and bundle, without deploying
```

## Layout

| path | what lives there |
| --- | --- |
| `worker.js` | the whole Worker: scraper, storage, geocoding, API, site |
| `wrangler.jsonc` | bindings and the cron trigger, reproducing the deployed Worker |
| `test/health.test.mjs` | the reporting-count rule behind `/api/health` |
