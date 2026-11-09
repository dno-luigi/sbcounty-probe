import test from "node:test";
import assert from "node:assert/strict";
import { nextScrapeAt } from "../worker.js";

test("the next run is measured from the end of this one", () => {
  assert.equal(nextScrapeAt(1_000, 180_000), 181_000);
});

test("a run that outlasts its interval still schedules into the future", () => {
  const startedAt = 0;
  const finishedAt = 185_000; // measured run duration, live
  const interval = 180_000;   // fast mode
  const next = nextScrapeAt(finishedAt, interval);
  assert.ok(next > finishedAt, "the next run must not be scheduled in the past");
  // The defect: scheduling from the start time put the next run 5s before the
  // current one even finished, so every minute's tick began a new scrape.
  assert.ok(startedAt + interval < finishedAt);
});
