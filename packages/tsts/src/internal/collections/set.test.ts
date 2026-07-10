import { test } from "node:test";
import assert from "node:assert/strict";

import {
  NewSetFromItems,
  Set_Add,
  Set_Clear,
  Set_Clone,
  Set_Has,
  Set_Keys,
  Set_Len,
  type Set,
} from "./set.js";

test("Set preserves a nil backing map until the first add", () => {
  const set: Set<string> = { M: undefined };

  assert.equal(Set_Keys(set), undefined);
  assert.equal(Set_Has(set, "value"), false);
  assert.equal(Set_Len(set), 0);
  Set_Clear(set);
  assert.equal(set.M, undefined);

  const clone = Set_Clone(set);
  assert.notEqual(clone, undefined);
  if (clone === undefined) {
    throw new Error("Set.Clone returned nil for a non-nil receiver");
  }
  assert.equal(clone.M, undefined);

  Set_Add(set, "value");
  assert.equal(Set_Has(set, "value"), true);
  assert.equal(Set_Len(set), 1);
});

test("NewSetFromItems preserves Go's nil map for an empty item list", () => {
  const empty = NewSetFromItems<string>();
  assert.notEqual(empty, undefined);
  if (empty === undefined) {
    throw new Error("NewSetFromItems returned nil");
  }
  assert.equal(empty.M, undefined);

  const populated = NewSetFromItems("a", "b");
  assert.equal(Set_Len(populated), 2);
});
