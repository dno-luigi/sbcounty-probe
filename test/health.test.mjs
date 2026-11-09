import test from "node:test";
import assert from "node:assert/strict";
import worker, { countReportingAgencies } from "../worker.js";

/** n agency buckets, each holding one record. */
const codes = (n, prefix = "A") =>
  Array.from({ length: n }, (_, i) => `${prefix}${String(i).padStart(2, "0")}`);
const buckets = (list) => Object.fromEntries(list.map((c) => [c, [{ call_no: "x" }]]));

test("counts one agency per bucket that returned rows", () => {
  const list = codes(39);
  assert.equal(countReportingAgencies({ aspNet: buckets(list) }, list), 39);
});

test("an agency that returned nothing does not count", () => {
  const list = codes(39).slice(0, 38);
  assert.equal(countReportingAgencies({ aspNet: { ...buckets(list), ZY: [] } }, [...list, "ZY"]), 38);
});

test("does not read a results property", () => {
  const list = codes(39);
  assert.equal(countReportingAgencies({ results: buckets(list) }, list), 0);
});

test("counts agencies that report through the riverside source", () => {
  const list = [...codes(2), "RC", "RC-MV"];
  const payload = {
    aspNet: buckets(codes(2)),
    riverside: [{ agency: "RC", call_no: "1" }, { agency: "RC-MV", call_no: "2" }],
  };
  assert.equal(countReportingAgencies(payload, list), 4);
});

test("ignores agency codes that are not configured", () => {
  const payload = { aspNet: buckets(["A00", "XX"]), riverside: [{ agency: "RC-Z" }] };
  assert.equal(countReportingAgencies(payload, ["A00"]), 1);
});

test("tolerates an empty or missing payload", () => {
  assert.equal(countReportingAgencies({}, ["A00"]), 0);
  assert.equal(countReportingAgencies(undefined, ["A00"]), 0);
  assert.equal(countReportingAgencies({ aspNet: {} }, ["A00"]), 0);
});

test("a full cycle is not degraded, an empty one is", () => {
  const list = codes(39);
  assert.equal(39 - countReportingAgencies({ aspNet: buckets(list) }, list) > 3, false);
  assert.equal(39 - countReportingAgencies({}, list) > 3, true);
});

test("the worker still exports its handlers", () => {
  assert.equal(typeof worker.fetch, "function");
  assert.equal(typeof worker.scheduled, "function");
});
