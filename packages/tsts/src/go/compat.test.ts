import assert from "node:assert/strict";
import test from "node:test";

import { GoAppend, GoNilSlice } from "./compat.js";

test("GoAppend appends to a nil slice like Go append(nil, ...)", () => {
  assert.deepEqual(GoAppend<string>(GoNilSlice(), "a", "b"), ["a", "b"]);
});

test("GoAppend returns an extended slice without mutating the input slice", () => {
  const source = ["a"];
  const result = GoAppend(source, "b");

  assert.deepEqual(source, ["a"]);
  assert.deepEqual(result, ["a", "b"]);
});
