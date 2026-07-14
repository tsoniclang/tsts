import assert from "node:assert/strict";
import test from "node:test";

import { GoAppend, GoNilSlice, GoSliceIsNil, GoSliceToZeroLength } from "./compat.js";

test("GoAppend appends to a nil slice like Go append(nil, ...)", () => {
  const nilSlice = GoNilSlice<string>();
  const result = GoAppend(nilSlice, "a", "b");

  assert.equal(GoSliceIsNil(nilSlice), true);
  assert.equal(GoNilSlice<string>(), nilSlice);
  assert.deepEqual(nilSlice, []);
  assert.deepEqual(Object.keys(nilSlice), []);
  assert.equal(Object.isFrozen(nilSlice), true);
  assert.equal(GoSliceIsNil(result), false);
  assert.deepEqual(result, ["a", "b"]);
});

test("GoSliceToZeroLength preserves nilness and independent slice-header length", () => {
  const nilSlice = GoNilSlice<number>();
  assert.equal(GoSliceToZeroLength(nilSlice), nilSlice);
  assert.equal(GoSliceIsNil(nilSlice), true);

  const values = [1, 2, 3];
  const zeroLength = GoSliceToZeroLength(values);
  assert.notEqual(zeroLength, values);
  assert.equal(GoSliceIsNil(values), false);
  assert.equal(GoSliceIsNil(zeroLength), false);
  assert.deepEqual(values, [1, 2, 3]);
  assert.deepEqual(zeroLength, []);
});

test("GoAppend returns an extended slice without mutating the input slice", () => {
  const source = ["a"];
  const result = GoAppend(source, "b");

  assert.deepEqual(source, ["a"]);
  assert.deepEqual(result, ["a", "b"]);
});
