import assert from "node:assert/strict";
import test from "node:test";

import { GoAppend, GoAppendSlice, GoNilSlice, GoSliceIsNil, GoSliceToZeroLength } from "./compat.js";

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

test("GoAppendSlice preserves nil on an empty append and copies non-empty inputs", () => {
  const nilSlice = GoNilSlice<number>();
  assert.equal(GoAppendSlice(nilSlice, GoNilSlice()), nilSlice);

  const source = [1, 2];
  const items = [3, 4];
  const result = GoAppendSlice(source, items);

  assert.deepEqual(source, [1, 2]);
  assert.deepEqual(items, [3, 4]);
  assert.deepEqual(result, [1, 2, 3, 4]);
});

test("GoAppendSlice handles inputs beyond JavaScript's argument-spread limit", () => {
  const items = Array.from({ length: 150_000 }, (_, index) => index);
  const result = GoAppendSlice(GoNilSlice<number>(), items);

  assert.equal(result.length, items.length);
  assert.equal(result[0], 0);
  assert.equal(result.at(-1), items.length - 1);
});
