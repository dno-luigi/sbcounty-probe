import test from "node:test";
import assert from "node:assert/strict";
import { computeNextScrapeAt } from "../worker.js";

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
