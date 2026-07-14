import assert from "node:assert/strict";
import test from "node:test";

import { canonicalStructFieldLayout } from "./struct-field-layout.mjs";

test("synthetic struct field names cannot collide with authored fields", () => {
  const fields = [
    field("__tsgoBlank0"),
    field("_"),
    field("__tsgoEmbedded0"),
    field("Embedded", true),
    field("_"),
  ];
  assert.deepEqual(
    canonicalStructFieldLayout(fields).map((entry) => entry.name),
    ["__tsgoBlank0", "__tsgoBlank1", "__tsgoEmbedded0", "__tsgoEmbedded1", "__tsgoBlank2"],
  );
});

test("duplicate authored struct fields fail closed", () => {
  assert.throws(
    () => canonicalStructFieldLayout([field("value"), field("value")]),
    /duplicate named field 'value'/,
  );
});

function field(name, embedded = false) {
  return { embedded, name };
}
