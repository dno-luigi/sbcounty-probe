import test from "node:test";
import assert from "node:assert/strict";
import { computeNextScrapeAt, computeSlowInterval, shouldStartScrape, RUN_STALE_MS } from "../worker.js";

const FAST = 3 * 60_000;
const CAP = 15 * 60_000;

test("the next run is measured from the end of this one", () => {
  assert.equal(computeNextScrapeAt(1_000, 180_000), 181_000);
});

test("a run that outlasts its interval still schedules into the future", () => {
  const startedAt = 0;
  const finishedAt = 185_000; // measured live
  const interval = 180_000;   // fast mode
  assert.ok(computeNextScrapeAt(finishedAt, interval) > finishedAt);
  // The original defect: from the start time the next run landed 5s in the past.
  assert.ok(startedAt + interval < finishedAt);
});

test("the helper is not the shadowed nextScrapeAt", async () => {
  // scheduled() binds a local `nextScrapeAt` from KV; a module-level function of
  // that name resolved to a number at the call site and failed every run.
  assert.equal(typeof computeNextScrapeAt, "function");
});

test("a quiet cycle backs off a step at a time, not straight to the cap", () => {
  // The old clamps were Math.min(x * 2, 15) then Math.max(that, 15): always 15.
  assert.equal(computeSlowInterval(FAST), 6 * 60_000);
  assert.equal(computeSlowInterval(6 * 60_000), 12 * 60_000);
  assert.ok(computeSlowInterval(FAST) < CAP);
});

test("the ramp stops at fifteen minutes", () => {
  assert.equal(computeSlowInterval(12 * 60_000), CAP);
  assert.equal(computeSlowInterval(60 * 60_000), CAP);
});

test("a missing or nonsense previous interval falls back to the fast interval", () => {
  assert.equal(computeSlowInterval(0), FAST);
  assert.equal(computeSlowInterval(undefined), FAST);
  assert.equal(computeSlowInterval(-5000), FAST);
});

test("the quiet interval is never faster than fast mode, nor slower than the cap", () => {
  for (const prev of [0, 1_000, FAST, 7 * 60_000, CAP, 4 * 60 * 60_000]) {
    const ms = computeSlowInterval(prev);
    assert.ok(ms >= FAST, `${ms}ms is below the fast interval for prev=${prev}`);
    assert.ok(ms <= CAP, `${ms}ms exceeds the cap for prev=${prev}`);
  }
});

// The ten-minute reservation used to live in next_scrape_at, so a run that died
// mid-flight blocked every tick until it expired. A stale in-flight marker is now
// reclaimed on the next tick instead.

test("a run in flight keeps the next tick off, even when a scrape is due", () => {
  const now = 1_000_000;
  const decision = shouldStartScrape(now, now - 60_000, { started_at: now - 10_000 });
  assert.equal(decision.start, false);
  assert.equal(decision.reason, "running");
});

test("a run that outlives the staleness bound is reclaimed", () => {
  const now = 1_000_000;
  for (const age of [RUN_STALE_MS, RUN_STALE_MS + 1, 10 * 60_000]) {
    const decision = shouldStartScrape(now, now - 60_000, { started_at: now - age });
    assert.equal(decision.start, true, `${age}ms old should be reclaimed`);
    assert.equal(decision.reason, "reclaimed");
  }
});

test("a finished run puts pacing back in charge", () => {
  const now = 1_000_000;
  const lock = { started_at: now - 400_000, finished_at: now - 200_000 };
  assert.equal(shouldStartScrape(now, now + 120_000, lock).reason, "scheduled");
  assert.equal(shouldStartScrape(now, now - 1, lock).reason, "due");
});

test("a scheduled pause is not mistaken for a dead run", () => {
  const now = 1_000_000;
  assert.deepEqual(shouldStartScrape(now, now + 60_000, null), {
    start: false,
    reason: "scheduled"
  });
});

test("no markers at all means a scrape is due", () => {
  assert.deepEqual(shouldStartScrape(1_000_000, null, null), { start: true, reason: "due" });
  assert.deepEqual(shouldStartScrape(1_000_000, 0, null), { start: true, reason: "due" });
});
