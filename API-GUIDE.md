# API and bindings guide

Everything the watcher exposes — the four bindings, the three storage layouts, and
every route in `handleApi()` — with snippets that paste and run.

Payloads and status codes below were fetched from the live Worker on **2026-11-10**.
If a snippet here disagrees with the code, the code wins: `worker.js` is the source of
truth, and `wrangler.jsonc` reproduces the deployed bindings.

Base URL: `https://watcher.ai-n.org` (alias: `https://sbcounty-probe.ai-n.workers.dev`).

---

## 1. Bindings

Declared in `wrangler.jsonc`, consumed as `env.<BINDING>`. There are three resource
bindings and one secret. The Worker holds no credential of its own.

| Binding | Kind | Resource | Identifier | Uses in `worker.js` | Holds |
| --- | --- | --- | --- | --- | --- |
| `DISPATCH_D1` | D1 | `sbcd1` | `eb19d2f8-8555-4aea-a3dc-6b6e6c37ba1e` | 46 | dispatch records, community reports |
| `DISPATCH_KV` | KV | — | `35069c0e518a4a68b952a208e0cc225c` | 66 | run metadata, locks, rate limits, latest per agency |
| `DISPATCH_R2` | R2 | `sbclog` | — | 5 | snapshots, daily backups, scrape log |
| `OWNER_REPORT_KEY` | secret | — | not in the repo | 3 | one owner passphrase for report moderation |

The secret is the only one you have to set, and only for moderation to work:

```bash
# prompts for the value, never puts it on a command line or in the repo
npx wrangler secret put OWNER_REPORT_KEY
```

With no secret set, `ownerKeyMatches()` returns `false` for every request, so a fresh
environment cannot be moderated by accident or by sending an empty header. `hide` and
`restore` answer `401 Owner access is not configured on this Worker` in that state.

Cron is `*/1 * * * *`, compatibility date `2026-08-20`, `main` is `worker.js`.

### Binding idioms

These are the exact shapes the Worker uses. Copy them rather than inventing new ones.

```js
// D1 — always .prepare(...).bind(...), never string interpolation.
const row = await env.DISPATCH_D1.prepare(
  'SELECT COUNT(*) AS total FROM dispatch_calls'
).first();

const rows = await env.DISPATCH_D1.prepare(
  'SELECT hash, agency, location FROM dispatch_calls WHERE county = ? ORDER BY scraped_at DESC LIMIT ?'
).bind('SB', 100).all();          // rows.results is the array

// KV — pass "json" to get a parsed value back; other keys are stored as JSON strings.
const lock = await env.DISPATCH_KV.get('meta:run_lock', 'json');
await env.DISPATCH_KV.put('report_hidden:abc', '1', { expirationTtl: 12 * 60 * 60 });

// KV — prefix listing (this is how hidden-report sets are rebuilt)
const listed = await env.DISPATCH_KV.list({ prefix: 'report_owner_hidden:' });
const ids = (listed.keys || []).map(k => k.name.slice('report_owner_hidden:'.length));

// R2 — content type matters; a backup without it downloads as octet-stream.
await env.DISPATCH_R2.put(key, JSON.stringify(rows), {
  httpMetadata: { contentType: 'application/json' }
});
const obj = await env.DISPATCH_R2.get(key);       // null when absent
const text = obj && await obj.text();
```

### Verify the bindings are attached

```bash
npx wrangler deploy --dry-run          # validates config + bundle, deploys nothing
npx wrangler deployments status        # what is actually serving
npx wrangler tail                      # live logs; expect "Cron [fast] ..." / "Skipping: ..."
```

---

## 2. D1 — `DISPATCH_D1`

Two tables. Neither is created by a migration in this repo; `handleAdminMigrate()`
adds the `county` column and its index to an existing database.

### `dispatch_calls`

19 columns, written with `INSERT OR IGNORE` keyed on `hash` — that hash *is* the
deduplication. A run reporting `stored: 0` means every row was a duplicate.

| column | type | note |
| --- | --- | --- |
| `hash` | TEXT | primary dedupe key, from `contentHash(normalized)` |
| `call_date` | TEXT | source-formatted, e.g. `11/10/2026 8:36:23 AM` |
| `call_type` / `call_type_desc` | TEXT | code and label (`T` / `Traffic Stop`) |
| `location` / `location_clean` | TEXT | raw and cleaned; masked rows read `* ,*` |
| `agency` | TEXT | `RC`, `RC-MV`, `CITIZEN`, … (55 distinct in practice) |
| `call_no` / `report_no` | TEXT | `report_no` is often empty |
| `dispo` / `dispo_desc` | TEXT | disposition code and label |
| `severity` | TEXT | `low`, `medium`, `high` |
| `category` | TEXT | `Traffic`, `Police`, … |
| `scraped_at` | TEXT | ISO timestamp of the storing run |
| `lat` / `lng` | REAL | null until geocoded |
| `geo_source` | TEXT | `geocoded`, etc. |
| `geocoded_at` | TEXT | ISO |
| `county` | TEXT | defaults to `SB` |

Index: `idx_dc_county ON dispatch_calls(county)`.

Retention is eight days by `scraped_at`, swept on every run by
`purgeOldRecords(env, 8)` — a row count that stops growing is retention, not a stall.

### `user_reports`

Short-lived community reports, TTL 6 hours, swept by `purgeExpiredReports()` each run.

```sql
INSERT INTO user_reports
  (id, created_at, category, note, lat, lng, accuracy_m, confirmations, expires_at)
VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)
```

`id` is a UUID, `created_at` / `expires_at` are epoch **milliseconds** as INTEGER,
`category` is one of `police|fire|medical|traffic|other`, `note` is capped at 280
characters after cleaning.

### Query patterns worth reusing

```js
// newest N with the columns the UI needs
const { results } = await env.DISPATCH_D1.prepare(
  `SELECT hash, call_date, call_type, call_type_desc, location, location_clean,
          agency, call_no, report_no, dispo, dispo_desc, severity, category,
          scraped_at, lat, lng, geo_source, geocoded_at, county
     FROM dispatch_calls ORDER BY scraped_at DESC LIMIT ?`
).bind(500).all();

// per-agency counts (feeds /api/dispatch/agencies and the map legend)
await env.DISPATCH_D1.prepare(
  'SELECT agency, COUNT(*) as count FROM dispatch_calls GROUP BY agency ORDER BY count DESC'
).all();

// bounding-box scan for route alerts — bind every bound
await env.DISPATCH_D1.prepare(
  `SELECT hash, call_date, call_type_desc, location, agency, lat, lng, severity, category
     FROM dispatch_calls
    WHERE lat IS NOT NULL AND lng IS NOT NULL
      AND lat BETWEEN ? AND ? AND lng BETWEEN ? AND ?
    ORDER BY scraped_at DESC LIMIT 100`
).bind(latMin, latMax, lngMin, lngMax).all();
```

---

## 3. KV — `DISPATCH_KV`

Two clocks matter here, and they are deliberately separate:

- `meta:next_scrape_at` — **when the next run may start** (epoch ms, JSON number).
- `meta:run_lock` — **whether a run is in flight** (`{started_at, finished_at?}`).

When one key did both jobs, a run that died left the schedule frozen for ten minutes.
They are now independent; a lock older than `RUN_STALE_MS` (5 min) is reclaimed.

| Key | Shape | TTL | Written by | Read by |
| --- | --- | --- | --- | --- |
| `meta:last_run` | JSON run summary | — | `scheduled()` success and failure | health, stats, freshness |
| `meta:next_scrape_at` | epoch ms number | — | every run, failures included | `scheduled()`, freshness |
| `meta:last_scrape_at` | epoch ms number | — | success path, manual trigger | slow-interval maths |
| `meta:last_scrape_row_count` | number | — | success path | freshness validation |
| `meta:last_scrape_result` | JSON | — | `POST /api/scrape` | manual-run inspection |
| `meta:source_health` | `{timestamp, reporting, total, errors, errorDetails}` | — | every run | `/api/health` |
| `meta:last_backup` | epoch ms number | — | daily backup gate | `/api/health`, backup gate |
| `meta:rate_limited` | epoch ms number | — | a source answering 429 | `scheduled()` |
| `meta:run_lock` | `{started_at, finished_at?}` | — | start + finish of each run | `scheduled()` |
| `latest:<AGENCY>` | JSON latest rows | — | success path | per-agency readers |
| `citizen:last_poll` | epoch ms string | 1 h | Citizen poller | Citizen budgeting |
| `citizen:cooldown` | `"1"` | `CITIZEN_COOLDOWN_MS` | after a Citizen failure | skip polling |
| `citizen_seen:<id>` | `"1"` | 6 h | per accepted item | dedupe |
| `citizen_tile_stats` | JSON per-tile yield | 30 d | each poll | tile budgeting |
| `report_rl:<client>` | epoch ms JSON | 180 s | report create | 3-minute post limit |
| `report_confirm_rl:<id>:<client>` | `"1"` | 24 h | confirm | one confirm per caller |
| `report_abuse_rl:<id>:<client>` | `"1"` | 1 h | abuse | one flag per caller |
| `report_abuse:<id>` | count as string | 12 h | abuse | hide at 3 flags |
| `report_hidden:<id>` | `"1"` | 12 h | abuse threshold | crowd-hide |
| `report_owner_hidden:<id>` | `"1"` | 24 h | owner `hide` | owner-hide |

Timestamps are epoch **milliseconds**, and `meta:next_scrape_at` is a bare number, not
an ISO string. Read it with `get(key, "json")` and compare against `Date.now()`.

```js
// the two-clock decision, in miniature
const nextAt = await env.DISPATCH_KV.get('meta:next_scrape_at', 'json');
const lock   = await env.DISPATCH_KV.get('meta:run_lock', 'json');
const decision = shouldStartScrape(Date.now(), nextAt, lock);
// -> { start: false, reason: 'pacing' | 'running' }
// -> { start: true,  reason: 'due' | 'reclaimed' | 'no_schedule' }
```

### Reading KV from a terminal

```bash
NS=35069c0e518a4a68b952a208e0cc225c   # DISPATCH_KV id from wrangler.jsonc
npx wrangler kv key get meta:run_lock   --namespace-id="$NS" --remote
npx wrangler kv key get meta:last_run   --namespace-id="$NS" --remote
npx wrangler kv key list                --namespace-id="$NS" --remote --prefix 'report_'
```

A missing key prints a wrangler "create an issue" log and no value. That is an absent
key, not an error — `meta:rate_limited` and `report_*` keys are legitimately absent most
of the time.

---

## 4. R2 — `DISPATCH_R2` (`sbclog`)

| Prefix | Key format | Written by |
| --- | --- | --- |
| `snapshots/` | `snapshots/YYYY/MM/DD/HHMMSS/<AGENCY>.json` | `storeSnapshot()` |
| `snapshots/` | `snapshots/YYYY/MM/DD/HHMMSS/all.json` | `storeFullSnapshot()` |
| `backups/` | `backups/YYYY-MM-DD/dispatch_calls.json` | daily gate in `scheduled()` |
| `backups/` | `backups/YYYY-MM-DD/dispatch_calls_manual.json` | `POST /api/backup` |

The daily backup runs at most once per 24 hours, gated on `meta:last_backup`; the manual
route always runs and also resets that gate.

```js
// list recent backups
const list = await env.DISPATCH_R2.list({ prefix: 'backups/' });

// read one back
const key = 'backups/2026-11-10/dispatch_calls.json';
const obj = await env.DISPATCH_R2.get(key);
const rows = obj ? JSON.parse(await obj.text()) : [];
```

```bash
npx wrangler r2 object get sbclog/backups/2026-11-10/dispatch_calls.json --file - | head -c 300
npx wrangler r2 object list sbclog --prefix snapshots/ | head
```

---

## 5. How a request is routed

`fetch()` checks three things in order, then falls through to the site:

```js
if (url.pathname === '/favicon.ico') return new Response(null, { status: 204 });
if (url.pathname.startsWith('/api/')) return handleApi(request, env, ctx);
const asset = serveStatic(url.pathname);   // /css/*, /js/*, /sw.js, /manifest.json
if (asset) return new Response(asset.content, { headers: { 'Content-Type': ..., 'Cache-Control': 'no-cache' } });
return new Response(serveStatic('/index.html').content, { headers: { 'Content-Type': 'text/html' } });
```

Two consequences that look like bugs:

- **An unknown non-API path returns `index.html` with status 200.** `/api/whatever`
  returns a real `404 {"error":"Not found"}`, but `/whatever` returns the app.
- **A route with the wrong method also falls through to that 404.** `GET /api/scrape`
  is `404`, because the route requires `POST` — the path exists, the method does not.

Every JSON response goes through `json()`, and every one of them carries the same CORS set:

```js
var CORS_ALLOW_METHODS = "GET, POST, OPTIONS";
var CORS_ALLOW_HEADERS = "Content-Type, X-Owner-Key";
var CORS_MAX_AGE_SECONDS = "86400";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": CORS_ALLOW_METHODS,
    "Access-Control-Allow-Headers": CORS_ALLOW_HEADERS,
    "Access-Control-Max-Age": CORS_MAX_AGE_SECONDS
  };
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(), ...extraHeaders }
  });
}
```

`handleApi()` answers `OPTIONS` **before** it routes anything:

```js
if (request.method === "OPTIONS") return corsPreflight();   // 204, no env access
```

So any `/api/*` path — including `/api/reports/<id>/confirm` and paths that do not exist —
finishes a browser preflight, and the real request follows it. Three consequences:

- The preflight returns before any handler, so `OPTIONS` can never mutate anything and
  never touches D1, KV or R2. It needs no `x-owner-key`.
- `Access-Control-Allow-Credentials` is deliberately **absent**. A wildcard origin is only
  legal without credentials, and this API has no cookie auth to carry.
- The origin is `*`, so **any website can call the unauthenticated write routes**
  (`POST /api/reports`, `/api/reports/<id>/confirm|abuse`, `/api/scrape`). Reads were
  already world-readable; if writes should not be, pin the origin inside `corsHeaders()`.

Owner moderation is untouched: `x-owner-key` is a header value compared server-side
against `OWNER_REPORT_KEY`, not a cookie, so no origin can borrow a session. A wrong key
is still `403`, and a Worker with no secret set still answers `401`.

```bash
# exactly what a browser sends, and what it must get back
curl -s -i -X OPTIONS https://watcher.ai-n.org/api/reports \
  -H 'Origin: https://example.com' \
  -H 'Access-Control-Request-Method: POST' \
  -H 'Access-Control-Request-Headers: content-type,x-owner-key' \
  | grep -i '^HTTP\|^access-control'
```

Expect `204 Access-Control-Allow-Methods: GET, POST, OPTIONS` and
`Access-Control-Allow-Headers: Content-Type, X-Owner-Key`.

---

## 6. Route reference

### Dispatch data

| Route | Method | Query | Returns |
| --- | --- | --- | --- |
| `/api/dispatch` | GET | `from`, `to`, `agency`, `county`, `limit`≤1000, `offset` | `{records: [...]}` |
| `/api/dispatch/latest` | GET | `limit`≤500 (default 500), `county` | `{records: [...]}`, `Cache-Control: public, max-age=120` |
| `/api/dispatch/agencies` | GET | — | `{agencies: [{code, name, color, count}]}` |
| `/api/dispatch/stats` | GET | — | `{total_records, last_run, by_agency, by_county}` |
| `/api/dispatch/geo` | GET | `limit`≤1000, `agency` | geocode worklist |

```bash
curl -s 'https://watcher.ai-n.org/api/dispatch/latest?limit=2&county=SB' | jq '.records[0]'
curl -s 'https://watcher.ai-n.org/api/dispatch/agencies'          | jq '.agencies[0]'
curl -s 'https://watcher.ai-n.org/api/dispatch/stats'             | jq '{total_records, by_agency: (.by_agency|length)}'
curl -s 'https://watcher.ai-n.org/api/dispatch?agency=RC&limit=5' | jq '.records|length'
```

```js
const { records } = await fetch('/api/dispatch/latest?limit=500').then(r => r.json());
```

A record, verbatim from the live API:

```json
{
  "hash": "hzdirmy17",
  "call_date": "11/10/2026 8:36:23 AM",
  "call_type": "T",
  "call_type_desc": "Traffic Stop",
  "location": "* ,*",
  "location_clean": "* ,*",
  "agency": "LL",
  "call_no": "LL263140016",
  "report_no": "",
  "dispo": "NAT",
  "dispo_desc": "Necessary Action Taken",
  "severity": "low",
  "category": "Traffic",
  "scraped_at": "2026-11-10T17:06:54.732Z",
  "lat": 34.0537971,
  "lng": -117.2610925,
  "geo_source": "geocoded",
  "geocoded_at": "2026-11-10T17:07:20.943Z",
  "county": "SB"
}
```

`lat`/`lng` are nullable; `location` may be masked (`* ,*`) — filter on a numeric `lat`
before plotting, which is what the map does.

### Health and freshness

| Route | Method | Returns |
| --- | --- | --- |
| `/api/health` | GET | `source{reporting_agencies, total_agencies, errors, error_details, last_check, degraded}`, `rate_limited`, `last_run`, `last_backup` |
| `/api/freshness` | GET | `freshness_window_min`, `db_scraped_at`, `age_min`, `fresh`, `stale`, `total_records`, `next_scrape`, `next_in_s` |
| `/api/quality` | GET | `total_records`, `completeness{location_pct, geocode_pct, disposition_pct}`, `by_agency` |

```bash
curl -s https://watcher.ai-n.org/api/health | jq '.source'
curl -s https://watcher.ai-n.org/api/freshness | jq '{age_min, fresh, stale, next_in_s}'
curl -s https://watcher.ai-n.org/api/quality | jq '.completeness'
```

`degraded` is `(total_agencies - reporting_agencies) > 3`, computed from the
`meta:source_health` the **last completed run** wrote. `last_run` describes the previous
run: a run in flight will still show the older values for a few minutes. That is not a
fault.

`/api/freshness` measures `age_min` from the newest `scraped_at` **in the table**, not
from `last_run.timestamp`. During a slow-mode backoff (up to 15 min) the two numbers
diverge, and `stale` only flips past `freshness_window_min` (45).

### Geo

| Route | Method | Body / query | Returns |
| --- | --- | --- | --- |
| `/api/geo/status` | GET | — | `{total, geocoded, pending, pct, ...}` |
| `/api/geo/backfill` | POST | — | kicks a backfill |

Nominatim is rate-limited to one request per 1.1 s and bounded by the county `BBOX`.
Do not raise either: it is a courtesy service.

### Analytics

| Route | Method | Body | Returns |
| --- | --- | --- | --- |
| `/api/analytics/duplicates` | GET | — | duplicate analysis |
| `/api/analytics/severity-trend` | GET | — | severity over time |
| `/api/analytics/day-of-week` | GET | — | `{days, peak_day, peak_count, insight}` |
| `/api/analytics/response-times` | GET | — | `{leaderboard: [{agency, total_calls, resolution_rate_pct, high_severity_calls}]}` |
| `/api/analytics/zip-density` | GET | — | `{density: [{county, agency, calls, geocoded, unique_locations}]}` |
| `/api/analytics/route-alerts` | POST | `{start_lat, start_lng, end_lat, end_lng, radius_mi}` | `{route, alerts, count}` |

```bash
curl -s https://watcher.ai-n.org/api/analytics/day-of-week | jq '{peak_day, peak_count}'
curl -s https://watcher.ai-n.org/api/analytics/response-times | jq '.leaderboard[0]'

curl -s -X POST https://watcher.ai-n.org/api/analytics/route-alerts \
  -H 'Content-Type: application/json' \
  -d '{"start_lat":34.10,"start_lng":-117.30,"end_lat":34.20,"end_lng":-117.20,"radius_mi":2}' \
  | jq '{count, first: .alerts[0].location}'
```

`radius_mi` defaults to 2 and is converted at 69 miles per degree, so it is a box, not a
circle. Missing or non-numeric coordinates return `400 {"error":"Invalid coordinates"}`.

### Community reports

| Route | Method | Needs | Returns |
| --- | --- | --- | --- |
| `/api/reports` | GET | — | `{reports, unverified: true, ttl_hours: 6}` |
| `/api/reports` | POST | `category`, `lat`, `lng`, optional `note`, `accuracy_m` | `201 {ok, report, expires_at}` |
| `/api/reports/<id>/confirm` | POST | — | `{ok, confirmations}` |
| `/api/reports/<id>/abuse` | POST | — | `{ok, flags, hidden}` |
| `/api/reports/<id>/hide` | POST | `x-owner-key` | `{ok, id, owner_hidden: true}` |
| `/api/reports/<id>/restore` | POST | `x-owner-key` | `{ok, id, owner_hidden: false}` |

`<id>` must match `[A-Za-z0-9-]{8,64}`; anything else is `404`, as is an expired report.

```bash
# list (public view: hidden reports are filtered out server-side)
curl -s https://watcher.ai-n.org/api/reports | jq '{count: (.reports|length), ttl_hours}'

# create
curl -s -X POST https://watcher.ai-n.org/api/reports \
  -H 'Content-Type: application/json' \
  -d '{"category":"traffic","lat":34.1083,"lng":-117.2898,"note":"signal out at the intersection"}' \
  | jq '.report'

# confirm / flag
curl -s -X POST "https://watcher.ai-n.org/api/reports/<id>/confirm" | jq
curl -s -X POST "https://watcher.ai-n.org/api/reports/<id>/abuse"   | jq '.flags, .hidden'

# owner moderation — the key comes from the environment, never the repo
curl -s -X POST "https://watcher.ai-n.org/api/reports/<id>/hide" \
  -H "x-owner-key: $OWNER_REPORT_KEY" | jq
```

Error contract:

| Status | When |
| --- | --- |
| `400` | invalid JSON, unknown category, missing/invalid `lat`/`lng`, point outside the county box, unidentifiable caller |
| `401` | `hide`/`restore` with no `OWNER_REPORT_KEY` configured on the Worker |
| `403` | `hide`/`restore` with a wrong key |
| `404` | malformed id, unknown action, or expired report |
| `429` | posting again within 3 min, confirming twice, or flagging twice |

Categories are exactly `police`, `fire`, `medical`, `traffic`, `other`. The note is
cleaned and capped at 280 characters. A report is public unless the crowd hid it
(3 flags) or the owner did — `isReportPubliclyVisible()` is the single rule.

An owner request gets extras: `owner_hidden`, `crowd_hidden` on each report, and
`Cache-Control: no-store`.

### Codes, metrics, ops

| Route | Method | Returns |
| --- | --- | --- |
| `/api/codes` | GET | `{call_types, dispositions, agencies}` |
| `/api/metrics` | GET | `{metrics, timestamp}` |
| `/api/backups` | GET | `{backups: [{key, size, ...}]}` from R2 |
| `/api/backup` | POST | `{success, key, rows}` — writes `dispatch_calls_manual.json` |
| `/api/discover` | GET | probes the first five agency codes and reports what answered |
| `/api/scrape` | POST | starts a run now via `ctx.waitUntil` |
| `/api/admin/scrape` | POST | admin counterpart of the above |
| `/api/admin/cleanup` | POST | retention sweep |
| `/api/admin/migrate` | POST | adds `county` + `idx_dc_county` |
| `/api/admin/diag` | GET | diagnostics |

```bash
curl -s https://watcher.ai-n.org/api/codes | jq 'keys'
curl -s https://watcher.ai-n.org/api/backups | jq

curl -s -X POST https://watcher.ai-n.org/api/scrape | jq   # starts a run immediately
```

`POST /api/scrape` and the `admin` POSTs bypass pacing **and take no run lock**, so a
manual trigger can overlap a scheduled run. Treat them as owner tools, not as a polling
mechanism.

---

## 7. The card calls

The UI never calls `/api/dispatch`; it loads one page of the newest records and filters
in the browser. These are the calls that actually populate the screen.

| Call | Fills | Cap |
| --- | --- | --- |
| `GET /api/dispatch/latest?limit=500` | dispatch cards **and** map dots | 500, cached 120 s |
| `GET /api/dispatch/agencies` | agency chips with counts, legend colours | — |
| `GET /api/dispatch/stats` | header: records / agencies / "scraped Nm ago" | — |
| `GET /api/freshness` | stale banner (`stale` past 45 min) | — |
| `GET /api/reports` | community report markers **and** report list | 200, TTL 6 h |
| `POST /api/scrape` | the **Scrape** button | one run |
| `POST /api/reports` | report submission | 3 min per client |
| `POST /api/reports/<id>/confirm` \| `/abuse` | report card buttons | 1 per caller |

The bundle in `/js/app-data.js` (`export const APP_DATA = ...`) is static reference
data for the deep-dive and analytics panels; it does not carry live records.

The load pattern, as the page does it:

```js
const [latest, agencies, stats] = await Promise.all([
  fetch('/api/dispatch/latest?limit=500').then(r => r.json()),
  fetch('/api/dispatch/agencies').then(r => r.json()),
  fetch('/api/dispatch/stats').then(r => r.json())
]);

updateCards(latest.records);    // /js/cards.js — builds the card grid
updateMap(latest.records);      // /js/map.js  — plots the dots
// agencies.agencies -> chips + legend; stats -> header counters
```

Filtering after that load is client-side and does not hit the network:

```js
// /js/cards.js
filterCards(searchTerm, agencyCode, excludedSet, nearby);
```

So **filters only ever see the newest 500 records.** For anything deeper — a date range,
an offset, the whole county — call `/api/dispatch` with `from`/`to`/`offset`, which pages
up to 1000 rows per request.

Fetching a report list is the same shape:

```js
const { reports } = await fetch('/api/reports').then(r => r.json());
renderReports(reports);      // map markers
renderReportList(reports);   // the community list
```

Owner moderation adds one header and nothing else:

```js
const resp = await fetch('/api/reports', { headers: { 'X-Owner-Key': key } });
```

### One caching trap

`/sw.js` (cache name `sb-dispatch-v7`) caches `/api/*` network-first and falls back to
the cached copy, and caches the static bundle cache-first. Two implications:

- A card list that refuses to change when the data has is the service worker serving its
  fallback, not a broken endpoint.
- Any UI edit inside `STATIC_ASSETS` needs a **cache bump** (`sb-dispatch-v8`, …), or
  browsers keep serving the old asset.

---

## 8. The scheduled path

```bash
npx wrangler tail --format pretty     # watch one cycle
```

The order inside `scheduled()`, and what each key means:

```text
cron fires (every minute)
  ├─ read meta:next_scrape_at  → not yet due?           log "Skipping: next scrape at ..." and stop
  ├─ read meta:run_lock        → started < 5 min ago?    log "Skipping: ... still in flight" and stop
  │                              started ≥ 5 min ago?    log "Reclaiming a run lock from Ns ago" and run
  ├─ meta:rate_limited active?                           push next_scrape 5 min out and stop
  ├─ put  meta:run_lock {started_at}
  ├─ runScraper → processScrapeResults → purgeOldRecords(8) → purgeExpiredReports
  ├─ put  meta:source_health {reporting, total, errors, errorDetails}
  ├─ optional daily backup to R2 (gated on meta:last_backup, 24 h)
  ├─ optional geocodePendingRecords
  ├─ pace: stored > 0 ? 3 min : computeSlowInterval(prev) (3 → 6 → 12 → 15 min)
  └─ put  meta:last_run, meta:next_scrape_at, meta:last_scrape_at,
          meta:last_scrape_row_count,
          meta:run_lock {started_at, finished_at}     ← retired, not deleted
```

A run takes ~165–185 s, longer than the 3-minute fast interval, which is why pacing is
measured from the **finish** (`computeNextScrapeAt`) on both the success and the failure
path. The marker is overwritten with `{started_at, finished_at}` rather than deleted, so
"finished" and "never ran" stay distinguishable.

The reclaim branch is the one state you cannot reproduce on demand; `test/cadence.test.mjs`
covers it, and it logs `Reclaiming a run lock from Ns ago` when a live run exceeds
`RUN_STALE_MS`.

---

## 9. Verify before claiming

```bash
node --check worker.js
node --test test/                      # 35 tests
npx wrangler deploy --dry-run          # config + bundle, deploys nothing
curl -s https://watcher.ai-n.org/api/health | jq '.source'
```

After a deploy, wait for a run to finish before quoting `/api/health`: a run already in
flight belongs to the previous isolate and reports the old values.

## Stop and ask before

- deploying;
- changing the D1 schema, the 8-day retention, or deleting rows;
- changing `ALL_AGENCY_CODES` or the `degraded` threshold;
- adding a source, a binding or a namespace.
