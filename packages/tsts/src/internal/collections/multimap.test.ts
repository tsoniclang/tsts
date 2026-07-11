import { test } from "node:test";
import assert from "node:assert/strict";
import type { GoSlice } from "../../go/compat.js";
import { GroupBy, MultiMap_Add, MultiMap_Get, MultiMap_Has, MultiMap_Len, NewMultiMapWithSizeHint } from "./multimap.js";

test("MultiMap.Get distinguishes a missing Go map entry from allocated empty", () => {
  const map = NewMultiMapWithSizeHint<string, number>(0);
  assert.equal(MultiMap_Get(map, "missing"), undefined);

  const empty: GoSlice<number> = [];
  map!.M!.set("empty", empty);
  assert.equal(MultiMap_Get(map, "empty"), empty);

  MultiMap_Add(map, "value", 1);
  assert.deepEqual(MultiMap_Get(map, "value"), [1]);
});

test("GroupBy preserves the zero-value nil map until an item is added", () => {
  const nilGrouped = GroupBy<string, number>(undefined, String);
  assert.equal(nilGrouped!.M, undefined);
  assert.equal(MultiMap_Len(nilGrouped), 0);
  assert.equal(MultiMap_Has(nilGrouped, "1"), false);
  assert.equal(MultiMap_Get(nilGrouped, "1"), undefined);

  const emptyGrouped = GroupBy<string, number>([], String);
  assert.equal(emptyGrouped!.M, undefined);

  const grouped = GroupBy<string, number>([1], String);
  assert.notEqual(grouped!.M, undefined);
  assert.deepEqual(MultiMap_Get(grouped, "1"), [1]);
});
