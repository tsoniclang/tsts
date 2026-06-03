import test from "node:test";
import assert from "node:assert/strict";

import { anyToString, isTruthy, newResult } from "./index.js";

test("strings pass through", () => {
  assert.strictEqual(anyToString("hello"), "hello");
  assert.strictEqual(anyToString(""), "");
});

test("numbers stringify per js spec", () => {
  assert.strictEqual(anyToString(42), "42");
  assert.strictEqual(anyToString(1.5), "1.5");
  assert.strictEqual(anyToString(NaN), "NaN");
  assert.strictEqual(anyToString(Infinity), "Infinity");
});

test("anyToString booleans", () => {
  assert.strictEqual(anyToString(true), "true");
  assert.strictEqual(anyToString(false), "false");
});

test("anyToString bigints", () => {
  assert.strictEqual(anyToString(42n), "42");
});

test("isTruthy strings", () => {
  assert.ok(isTruthy("hello"));
  assert.ok(!isTruthy(""));
});

test("isTruthy numbers", () => {
  assert.ok(isTruthy(1));
  assert.ok(!isTruthy(0));
  assert.ok(!isTruthy(NaN));
});

test("isTruthy booleans", () => {
  assert.ok(isTruthy(true));
  assert.ok(!isTruthy(false));
});

test("isTruthy bigints", () => {
  assert.ok(isTruthy(1n));
  assert.ok(!isTruthy(0n));
});

test("constructs result objects", () => {
  const r = newResult("foo", true, false, false);
  assert.strictEqual(r.value, "foo");
  assert.ok(r.isSyntacticallyString);
  assert.ok(!r.resolvedOtherFiles);
  assert.ok(!r.hasExternalReferences);
});
