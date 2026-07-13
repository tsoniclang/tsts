import assert from "node:assert/strict";
import test from "node:test";

import { GoAppend, GoNilSlice, GoSliceIsNil } from "./compat.js";

test("GoAppend appends to a nil slice like Go append(nil, ...)", () => {
  const nilSlice = GoNilSlice<string>();
  const result = GoAppend(nilSlice, "a", "b");

  assert.equal(GoSliceIsNil(nilSlice), true);
  assert.equal(GoSliceIsNil(result), false);
  assert.deepEqual(result, ["a", "b"]);
});

test("GoAppend returns an extended slice without mutating the input slice", () => {
  const source = ["a"];
  const result = GoAppend(source, "b");

  assert.deepEqual(source, ["a"]);
  assert.deepEqual(result, ["a", "b"]);
});
