import { test } from "node:test";
import assert from "node:assert/strict";
import { MustCompile } from "./regexp.js";

test("regexp nil slice results remain distinct from allocated results", () => {
  const expression = MustCompile("(a)?b");

  assert.equal(expression.FindStringSubmatch("x"), undefined);
  assert.deepEqual(expression.FindStringSubmatch("b"), ["b", ""]);

  const delimiter = MustCompile(",");
  assert.equal(delimiter.Split("a,b", 0), undefined);
  assert.deepEqual(delimiter.Split("a,b", -1), ["a", "b"]);
});
