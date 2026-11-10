import test from "node:test";
import assert from "node:assert/strict";
import { cleanReportNote, isReportCategory, isReportInBBox, distanceMiles, parseDispatchTime, findCountyMatch, secretEqual, ownerKeyMatches, isReportPubliclyVisible } from "../worker.js";

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

test("distance in miles is zero for the same point and sane for a known pair", () => {
  assert.equal(distanceMiles(34.1083, -117.2898, 34.1083, -117.2898), 0);
  // San Bernardino to Ontario, roughly 20 miles apart.
  const d = distanceMiles(34.1083, -117.2898, 34.0633, -117.6509);
  assert.ok(d > 18 && d < 23, String(d));
});

test("county times like 11/1/2026 8:35:37 PM parse as Pacific", () => {
  // 8:35:37 PM PST == 04:35:37 UTC the next day.
  assert.equal(parseDispatchTime("11/1/2026 8:35:37 PM"), Date.UTC(2026, 10, 2, 4, 35, 37));
  assert.equal(parseDispatchTime("not a date"), null);
  assert.equal(parseDispatchTime(null), null);
});

test("a nearby scraped call within the window confirms a report", () => {
  const report = { lat: 34.1083, lng: -117.2898, created_at: Date.UTC(2026, 10, 9, 20, 0, 0) };
  const near = { hash: "h1", call_type: "459", lat: 34.11, lng: -117.29, ts: Date.UTC(2026, 10, 9, 19, 55, 0) };
  const match = findCountyMatch(report, [near]);
  assert.ok(match, "expected a match");
  assert.equal(match.call_type, "459");
  assert.ok(match.distance_miles < 0.6);
  assert.equal(match.minutes_apart, 5);
});

test("far away or out of window calls do not confirm a report", () => {
  const report = { lat: 34.1083, lng: -117.2898, created_at: Date.UTC(2026, 10, 9, 20, 0, 0) };
  const far = { hash: "h2", call_type: "459", lat: 34.3, lng: -117.5, ts: Date.UTC(2026, 10, 9, 19, 55, 0) };
  const late = { hash: "h3", call_type: "459", lat: 34.11, lng: -117.29, ts: Date.UTC(2026, 10, 9, 21, 30, 0) };
  assert.equal(findCountyMatch(report, [far]), null);
  assert.equal(findCountyMatch(report, [late]), null);
  assert.equal(findCountyMatch(report, []), null);
});

test("owner keys are compared without an early exit and never match nothing", async () => {
  assert.equal(await secretEqual("abc", "abc"), true);
  assert.equal(await secretEqual("abc", "abd"), false);
  assert.equal(await secretEqual("abc", "abcd"), false);
  assert.equal(await secretEqual("", "abc"), false);
  assert.equal(await secretEqual(null, null), false);
  assert.equal(await secretEqual("a".repeat(5000), "a".repeat(5000)), true);
});

test("owner access fails closed when the secret is not configured", async () => {
  const req = (headers) => ({ headers: { get: (name) => headers[name.toLowerCase()] ?? null } });
  assert.equal(await ownerKeyMatches(req({ "x-owner-key": "k" }), {}), false);
  assert.equal(await ownerKeyMatches(req({ "x-owner-key": "k" }), { OWNER_REPORT_KEY: "" }), false);
  assert.equal(await ownerKeyMatches(req({}), { OWNER_REPORT_KEY: "k" }), false);
  assert.equal(await ownerKeyMatches(req({ "x-owner-key": "nope" }), { OWNER_REPORT_KEY: "k" }), false);
  assert.equal(await ownerKeyMatches(req({ "x-owner-key": "k" }), { OWNER_REPORT_KEY: "k" }), true);
});

test("a report is public until the crowd or the owner hides it", () => {
  const crowd = new Set(["a"]);
  const owner = new Set(["b"]);
  assert.equal(isReportPubliclyVisible("c", crowd, owner), true);
  assert.equal(isReportPubliclyVisible("a", crowd, owner), false);
  assert.equal(isReportPubliclyVisible("b", crowd, owner), false);
});
