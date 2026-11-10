import test from "node:test";
import assert from "node:assert/strict";
import { readCitizenTile, citizenCallType } from "../worker.js";

function varint(n) {
  const out = [];
  while (n > 127) {
    out.push((n & 127) | 128);
    n >>= 7;
  }
  out.push(n);
  return out;
}
function lenField(field, bytes) {
  return [...varint((field << 3) | 2), ...varint(bytes.length), ...bytes];
}
function utf8(text) {
  return Array.from(new TextEncoder().encode(text));
}

// Builds the smallest tile that looks like Citizen's: one layer named
// "incidents", string keys/values, packed feature tags, plus a numeric value
// to prove non-string attributes are skipped rather than mangled.
function syntheticTile(features) {
  const keys = ["incident_id", "category", "latitude"];
  const values = [];
  const featureBufs = [];
  for (const f of features) {
    const idIdx = values.push(f.id) - 1;
    const catIdx = values.push(f.category) - 1;
    const numIdx = values.push(null) - 1;
    const tags = [0, idIdx, 1, catIdx, 2, numIdx].flatMap(varint);
    featureBufs.push(lenField(2, tags));
  }
  const layer = [
    ...lenField(1, utf8("incidents")),
    ...featureBufs.flatMap((f) => lenField(2, f)),
    ...keys.flatMap((k) => lenField(3, utf8(k))),
  ];
  for (const v of values) {
    layer.push(...lenField(4, v == null ? lenField(3, [0, 0, 0, 0, 0, 0, 0, 0]) : lenField(1, utf8(v))));
  }
  return new Uint8Array(lenField(3, layer));
}

test("reads incident ids and categories out of a vector tile", () => {
  const tile = syntheticTile([
    { id: "-P62Cgx_-fIxhMxqUFva", category: "Report of Structure Fire" },
    { id: "-P61zym01rTS3c8S-MG3", category: "Missing Dog" },
  ]);
  const features = readCitizenTile(tile);
  assert.equal(features.length, 2);
  assert.equal(features[0].incident_id, "-P62Cgx_-fIxhMxqUFva");
  assert.equal(features[0].category, "Report of Structure Fire");
  assert.equal(features[1].incident_id, "-P61zym01rTS3c8S-MG3");
  assert.equal(features[0].latitude, undefined);
});

test("drops a tile that carries no incident ids", () => {
  const tile = new Uint8Array(lenField(3, [...lenField(1, utf8("incidents"))]));
  assert.deepEqual(readCitizenTile(tile), []);
});

test("maps only dispatch-like categories onto call types", () => {
  assert.equal(citizenCallType("Fire / EMS Activity"), "CIT-FIRE");
  assert.equal(citizenCallType("Wildfire"), "CIT-FIRE");
  assert.equal(citizenCallType("Medical"), "CIT-MED");
  assert.equal(citizenCallType("Traffic Related"), "CIT-TRAFFIC");
  assert.equal(citizenCallType("Shooting"), "CIT-POLICE");
  assert.equal(citizenCallType("Missing Pet"), null);
  assert.equal(citizenCallType("Power Outage"), null);
  assert.equal(citizenCallType(""), null);
});
