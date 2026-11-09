import test from "node:test";
import assert from "node:assert/strict";
import worker, { countReportingAgencies } from "../worker.js";

/** n agency buckets, each holding `rows` records. */
const buckets = (n, rows = 1) =>
  Object.fromEntries(
    Array.from({ length: n }, (_, i) => [
      `A${String(i).padStart(2, "0")}`,
      Array.from({ length: rows }, () => ({ call_no: "x" })),
    ])
  );

test("counts one agency per bucket that returned rows", () => {
  assert.equal(countReportingAgencies({ aspNet: buckets(39) }), 39);
});

test("an agency that returned nothing does not count", () => {
  assert.equal(countReportingAgencies({ aspNet: { ...buckets(38), ZY: [] } }), 38);
});

test("does not read a results property", () => {
  // The deployed code read scrapeResults.results, which never exists, so every
  // health record claimed 0 agencies and degraded stayed true forever.
  assert.equal(countReportingAgencies({ results: buckets(39) }), 0);
});

test("tolerates an empty or missing payload", () => {
  assert.equal(countReportingAgencies({}), 0);
  assert.equal(countReportingAgencies(undefined), 0);
  assert.equal(countReportingAgencies({ aspNet: {} }), 0);
});

test("a full cycle is not degraded, an empty one is", () => {
  const total = 39; // ALL_AGENCY_CODES
  const healthy = total - countReportingAgencies({ aspNet: buckets(39) }) > 3;
  const broken = total - countReportingAgencies({}) > 3;
  assert.equal(healthy, false);
  assert.equal(broken, true);
});

test("the worker still exports its handlers", () => {
  assert.equal(typeof worker.fetch, "function");
  assert.equal(typeof worker.scheduled, "function");
});
