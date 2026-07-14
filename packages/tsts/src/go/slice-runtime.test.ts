import assert from "node:assert/strict";
import test from "node:test";

import { GoNilSlice } from "./compat.js";
import { GoSlicePrefix, GoSliceRange } from "./slice-runtime.js";

test("GoSlicePrefix preserves nilness and never mutates the source header", () => {
  const nilSlice = GoNilSlice<number>();
  assert.equal(GoSlicePrefix(nilSlice, 0), nilSlice);

  const values = [1, 2, 3];
  assert.equal(GoSlicePrefix(values, values.length), values);
  assert.deepEqual(GoSlicePrefix(values, 2), [1, 2]);
  assert.deepEqual(values, [1, 2, 3]);
  assert.throws(() => GoSlicePrefix(values, -1), /slice bounds out of range/);
  assert.throws(() => GoSlicePrefix(values, 4), /slice bounds out of range/);
});

test("GoSliceRange preserves nilness and checks both bounds", () => {
  const nilSlice = GoNilSlice<number>();
  assert.equal(GoSliceRange(nilSlice, 0), nilSlice);

  const values = [1, 2, 3, 4];
  assert.equal(GoSliceRange(values, 0, values.length), values);
  assert.deepEqual(GoSliceRange(values, 1), [2, 3, 4]);
  assert.deepEqual(GoSliceRange(values, 1, 3), [2, 3]);
  assert.deepEqual(values, [1, 2, 3, 4]);
  assert.throws(() => GoSliceRange(values, -1), /slice bounds out of range/);
  assert.throws(() => GoSliceRange(values, 2, 1), /slice bounds out of range/);
  assert.throws(() => GoSliceRange(values, 0, 5), /slice bounds out of range/);
});
