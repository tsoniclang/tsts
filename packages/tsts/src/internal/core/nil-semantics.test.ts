import { test } from "node:test";
import assert from "node:assert/strict";
import type { GoError, GoSlice } from "../../go/compat.js";
import type { int } from "../../go/scalars.js";
import { Arena_Clone, Arena_NewSlice, type Arena } from "./arena.js";
import {
  AppendIfUnique,
  CheckEachDefined,
  Concatenate,
  Deduplicate,
  DeduplicateSorted,
  ElementOrNil,
  Find,
  FindIndex,
  FindLast,
  FindLastIndex,
  Filter,
  FilterIndex,
  FlatMap,
  Flatten,
  Map,
  MapFiltered,
  MapIndex,
  MapNonNil,
  MinAllFunc,
  PositionToLineAndByteOffset,
  ReplaceElement,
  Same,
  SameMap,
  SameMapIndex,
  CountWhere,
  FirstNonNil,
  FirstOrNil,
  InsertSorted,
  LastOrNil,
  SingleElementSlice,
  Splice,
  TryMap,
  UnorderedEqual,
  levenshteinWithMax,
} from "./core.js";

test("core slice-preserving helpers distinguish nil from allocated empty", () => {
  const empty: GoSlice<number> = [];
  const keep = (): boolean => true;

  assert.equal(Filter(undefined, keep), undefined);
  assert.equal(Filter(empty, keep), empty);
  assert.equal(FilterIndex(undefined, keep), undefined);
  assert.equal(FilterIndex(empty, keep), empty);

  assert.equal(SameMap(undefined, value => value), undefined);
  assert.equal(SameMap(empty, value => value), empty);
  assert.equal(SameMapIndex(undefined, value => value), undefined);
  assert.equal(SameMapIndex(empty, value => value), empty);

  assert.equal(CheckEachDefined(undefined, "defined"), undefined);
  assert.equal(CheckEachDefined(empty, "defined"), empty);
  assert.equal(Deduplicate(undefined), undefined);
  assert.equal(Deduplicate(empty), empty);
  assert.equal(DeduplicateSorted(undefined, (left, right) => left === right), undefined);
  assert.equal(DeduplicateSorted(empty, (left, right) => left === right), empty);
});

test("core scalar slice queries accept nil without caller normalization", () => {
  const never = (): boolean => {
    throw new globalThis.Error("predicate must not run");
  };

  assert.equal(Same(undefined, undefined), true);
  assert.equal(Same(undefined, []), true);
  assert.equal(Find(undefined, never), undefined);
  assert.equal(FindLast(undefined, never), undefined);
  assert.equal(FindIndex(undefined, never), -1);
  assert.equal(FindLastIndex(undefined, never), -1);
  assert.equal(FirstOrNil(undefined), undefined);
  assert.equal(LastOrNil(undefined, () => "zero"), "zero");
  assert.equal(ElementOrNil(undefined, 0 as int), undefined);
  assert.throws(() => ElementOrNil(undefined, -1 as int), RangeError);
  assert.equal(FirstNonNil(undefined, value => value), undefined);
  assert.equal(CountWhere(undefined, never), 0);
  assert.equal(UnorderedEqual(undefined, []), true);
});

test("core nil slice mutation boundaries preserve Go allocation and panic behavior", () => {
  assert.throws(() => ReplaceElement(undefined, 0 as int, 1));
  assert.deepEqual(InsertSorted(undefined, 1, (left, right) => (left - right) as int), [1]);
  assert.throws(() => PositionToLineAndByteOffset(0 as int, undefined));
  assert.equal(levenshteinWithMax({ previous: [], current: [] }, undefined, undefined, 1), 0);
});

test("core allocating maps preserve the Go nil and empty result contracts", () => {
  const empty: GoSlice<number> = [];

  assert.equal(Map(undefined, value => value), undefined);
  const mappedEmpty = Map(empty, value => value);
  assert.notEqual(mappedEmpty, undefined);
  assert.notEqual(mappedEmpty, empty);
  assert.deepEqual(mappedEmpty, []);

  assert.equal(MapIndex(undefined, value => value), undefined);
  const mappedIndexEmpty = MapIndex(empty, value => value);
  assert.notEqual(mappedIndexEmpty, undefined);
  assert.notEqual(mappedIndexEmpty, empty);
  assert.deepEqual(mappedIndexEmpty, []);

  assert.deepEqual(TryMap(undefined, value => [value, undefined]), [undefined, undefined]);
  assert.deepEqual(TryMap(empty, value => [value, undefined]), [undefined, undefined]);
  const failure = new globalThis.Error("stop") as GoError;
  assert.deepEqual(TryMap([1], () => [0, failure]), [undefined, failure]);
});

test("core nil-accumulator helpers stay nil until an append occurs", () => {
  assert.equal(MapNonNil(undefined, value => value), undefined);
  assert.equal(MapNonNil([1], () => undefined), undefined);
  assert.deepEqual(MapNonNil([1, 2], value => value === 2 ? value : undefined), [2]);

  assert.equal(MapFiltered(undefined, value => [value, false]), undefined);
  assert.equal(MapFiltered([1], value => [value, false]), undefined);
  assert.deepEqual(MapFiltered([1, 2], value => [value, value === 2]), [2]);

  assert.equal(FlatMap(undefined, value => [value]), undefined);
  assert.equal(FlatMap([1], () => []), undefined);
  assert.deepEqual(FlatMap([1, 2], value => value === 2 ? [value] : undefined), [2]);

  assert.equal(Flatten(undefined), undefined);
  assert.equal(Flatten([undefined, []]), undefined);
  assert.deepEqual(Flatten([undefined, [1], [], [2]]), [1, 2]);
});

test("core concatenate and splice preserve each Go slice-header branch", () => {
  const leftEmpty: GoSlice<number> = [];
  const rightEmpty: GoSlice<number> = [];
  const left = [1];
  const right = [2];

  assert.equal(Concatenate(undefined, undefined), undefined);
  assert.equal(Concatenate(leftEmpty, undefined), leftEmpty);
  assert.equal(Concatenate(undefined, rightEmpty), undefined);
  assert.equal(Concatenate(left, rightEmpty), left);
  assert.equal(Concatenate(leftEmpty, right), right);
  assert.deepEqual(Concatenate(left, right), [1, 2]);

  assert.equal(Splice(undefined, 0 as int, 0 as int), undefined);
  assert.equal(Splice(leftEmpty, 0 as int, 0 as int), leftEmpty);
  assert.equal(Splice(left, 0 as int, 0 as int), left);
  assert.equal(Splice([1], 0 as int, 1 as int), undefined);
  assert.deepEqual(Splice([1, 2], 1 as int, 1 as int, 3), [1, 3]);
});

test("core explicit nil-result helpers retain their distinct contracts", () => {
  const compare = (left: number, right: number): int => (left - right) as int;
  const value = { id: 1 };

  assert.equal(MinAllFunc(undefined, compare), undefined);
  assert.equal(MinAllFunc([], compare), undefined);
  assert.deepEqual(MinAllFunc([2, 1, 1], compare), [1, 1]);

  assert.deepEqual(AppendIfUnique(undefined, 1), [1]);
  const existing = [1];
  assert.equal(AppendIfUnique(existing, 1), existing);

  assert.equal(SingleElementSlice(undefined), undefined);
  assert.deepEqual(SingleElementSlice(value), [value]);
});

test("arena zero-length allocation and clone return Go nil", () => {
  const arena = { data: [] } as Arena<number>;
  const zeroArena = { data: undefined } as Arena<number>;
  assert.equal(Arena_NewSlice(arena, 0 as int), undefined);
  assert.equal(Arena_NewSlice(zeroArena, 0 as int), undefined);
  assert.equal(zeroArena.data, undefined);
  assert.equal(Arena_Clone(arena, undefined), undefined);
  assert.equal(Arena_Clone(arena, []), undefined);
  assert.equal(Arena_Clone(zeroArena, []), undefined);
  assert.equal(zeroArena.data, undefined);

  const allocated = Arena_NewSlice(arena, 2 as int);
  assert.notEqual(allocated, undefined);
  assert.equal(allocated!.length, 2);
  assert.deepEqual(Arena_Clone(arena, [1, 2]), [1, 2]);
  assert.notEqual(Arena_NewSlice(zeroArena, 1 as int), undefined);
  assert.deepEqual(zeroArena.data, []);
  assert.throws(() => Arena_NewSlice(undefined, 1 as int));
  assert.throws(() => Arena_Clone(undefined, [1]));
});
