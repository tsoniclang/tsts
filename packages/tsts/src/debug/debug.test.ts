import test from "node:test";
import assert from "node:assert/strict";

import { assert as debugAssert, assertNever, fail } from "./debug.js";

function throwsContaining(fn: () => void, substring: string): void {
  assert.throws(fn, (err: unknown) => {
    assert.ok(err instanceof Error);
    assert.ok(err.message.includes(substring));
    return true;
  });
}

test("fail throws with default message", () => {
  assert.throws(() => {
    fail();
  });
});

test("fail throws with custom reason", () => {
  throwsContaining(() => {
    fail("something broke");
  }, "something broke");
});

test("assert returns silently for true", () => {
  debugAssert(true);
  debugAssert(true, "fine");
});

test("assert throws for false without context", () => {
  throwsContaining(() => {
    debugAssert(false);
  }, "False expression");
});

test("assert throws for false with context", () => {
  throwsContaining(() => {
    debugAssert(false, "context");
  }, "False expression: context");
});

test("assertNever throws with default message", () => {
  throwsContaining(() => {
    assertNever("unreachable" as never);
  }, "Illegal value");
});

test("assertNever includes member detail", () => {
  throwsContaining(() => {
    assertNever("xyz" as never);
  }, "xyz");
});
