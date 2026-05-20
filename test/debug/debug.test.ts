/**
 * Tests for debug.
 */

import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import { assert as debugAssert, assertNever, fail } from "../../src/debug/index.js";

describe("debug — fail", () => {
  it("throws with default message", () => {
    assert.throws(() => fail(), /Debug failure\.$/);
  });

  it("throws with custom reason", () => {
    assert.throws(() => fail("something broke"), /Debug failure\. something broke/);
  });
});

describe("debug — assert", () => {
  it("returns silently for true", () => {
    debugAssert(true);
    debugAssert(true, "fine");
  });

  it("throws for false", () => {
    assert.throws(() => debugAssert(false), /False expression/);
    assert.throws(() => debugAssert(false, "context"), /False expression: context/);
  });
});

describe("debug — assertNever", () => {
  it("throws with default message", () => {
    assert.throws(() => assertNever("unreachable" as never), /Illegal value:/);
  });

  it("includes member detail", () => {
    assert.throws(() => assertNever("xyz" as never), /xyz/);
  });
});
