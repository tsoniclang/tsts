import test from "node:test";
import assert from "node:assert/strict";

import { isJsonArray, isJsonObject, marshal, marshalIndent } from "./index.js";

test("round trips simple values", () => {
  assert.strictEqual(marshal(null), "null");
  assert.strictEqual(marshal(true), "true");
  assert.strictEqual(marshal(42), "42");
  assert.strictEqual(marshal("hello"), '"hello"');
});

test("marshal indent without prefix", () => {
  const result = marshalIndent({ a: 1 }, "", "  ");
  assert.strictEqual(result, '{\n  "a": 1\n}');
});

test("marshal indent empty prefix and indent equals marshal", () => {
  assert.strictEqual(marshalIndent({ a: 1 }, "", ""), marshal({ a: 1 }));
});

test("marshal indent with prefix adds prefix to subsequent lines", () => {
  const result = marshalIndent({ a: 1 }, "> ", "  ");
  assert.strictEqual(result, '{\n>   "a": 1\n> }');
});

test("is json object", () => {
  assert.ok(isJsonObject({}));
  assert.ok(!isJsonObject([]));
  assert.ok(!isJsonObject(null));
  assert.ok(!isJsonObject("foo"));
});

test("is json array", () => {
  assert.ok(isJsonArray([]));
  assert.ok(!isJsonArray({}));
  assert.ok(!isJsonArray(null));
});
