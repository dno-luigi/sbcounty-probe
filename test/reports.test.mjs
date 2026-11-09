import test from "node:test";
import assert from "node:assert/strict";
import { cleanReportNote, isReportCategory, isReportInBBox } from "../worker.js";

test("only the known report categories are accepted", () => {
  for (const c of ["police", "fire", "medical", "traffic", "other"]) {
    assert.equal(isReportCategory(c), true, c);
  }
  assert.equal(isReportCategory("Police"), false);
  assert.equal(isReportCategory("arson"), false);
  assert.equal(isReportCategory(undefined), false);
  assert.equal(isReportCategory(7), false);
});

test("a report inside the county is accepted", () => {
  // The map's own default centre, so this must be inside the county box.
  assert.equal(isReportInBBox(34.85, -117.2), true);
});

test("a report outside the county is rejected", () => {
  assert.equal(isReportInBBox(37.7749, -122.4194), false); // San Francisco
});

test("a nonsense location is rejected", () => {
  assert.equal(isReportInBBox(NaN, -117), false);
  assert.equal(isReportInBBox(34, Infinity), false);
  assert.equal(isReportInBBox(undefined, undefined), false);
  assert.equal(isReportInBBox("34.1", "-117.3"), true); // numeric strings coerce
});

test("notes are collapsed, trimmed, capped and stripped of control characters", () => {
  assert.equal(cleanReportNote("  two  cars\nracing  "), "two cars racing");
  assert.equal(cleanReportNote("a".repeat(400)).length, 280);
  assert.equal(cleanReportNote(null), "");
  assert.equal(cleanReportNote(42), "");
  assert.equal(cleanReportNote("ok\u0000\u0007fine"), "ok fine");
});
