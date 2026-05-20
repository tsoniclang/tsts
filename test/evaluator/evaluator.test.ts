/**
 * Tests for evaluator utility functions. The full walker is stubbed
 * until AST adoption completes.
 */

import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import { anyToString, isTruthy, newResult } from "../../src/evaluator/index.js";

describe("evaluator — anyToString", () => {
  it("strings pass through", () => {
    assert.equal(anyToString("hello"), "hello");
    assert.equal(anyToString(""), "");
  });

  it("numbers stringify per JS spec", () => {
    assert.equal(anyToString(42), "42");
    assert.equal(anyToString(1.5), "1.5");
    assert.equal(anyToString(NaN), "NaN");
    assert.equal(anyToString(Infinity), "Infinity");
  });

  it("booleans", () => {
    assert.equal(anyToString(true), "true");
    assert.equal(anyToString(false), "false");
  });

  it("bigints", () => {
    assert.equal(anyToString(42n), "42");
  });
});

describe("evaluator — isTruthy", () => {
  it("strings", () => {
    assert.equal(isTruthy("hello"), true);
    assert.equal(isTruthy(""), false);
  });

  it("numbers", () => {
    assert.equal(isTruthy(1), true);
    assert.equal(isTruthy(0), false);
    assert.equal(isTruthy(NaN), false);
  });

  it("booleans", () => {
    assert.equal(isTruthy(true), true);
    assert.equal(isTruthy(false), false);
  });

  it("bigints", () => {
    assert.equal(isTruthy(1n), true);
    assert.equal(isTruthy(0n), false);
  });
});

describe("evaluator — newResult", () => {
  it("constructs Result objects", () => {
    const r = newResult("foo", true, false, false);
    assert.equal(r.value, "foo");
    assert.equal(r.isSyntacticallyString, true);
    assert.equal(r.resolvedOtherFiles, false);
    assert.equal(r.hasExternalReferences, false);
  });
});
