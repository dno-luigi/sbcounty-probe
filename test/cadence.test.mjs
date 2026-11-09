import test from "node:test";
import assert from "node:assert/strict";
import { computeNextScrapeAt, computeSlowInterval } from "../worker.js";

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
