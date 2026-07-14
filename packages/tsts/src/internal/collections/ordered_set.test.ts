import { test } from "node:test";
import assert from "node:assert/strict";
import { GoEqualStrict, GoNumberKey } from "../../go/compat.js";
import { Collect, IsSorted } from "../../go/slices.js";
import {
  NewOrderedSetWithSizeHint,
  OrderedSet_Add,
  OrderedSet_Clear,
  OrderedSet_Clone,
  OrderedSet_Delete,
  OrderedSet_Has,
  OrderedSet_Size,
  OrderedSet_Values,
} from "./ordered_set.js";

test("OrderedSet mirrors upstream add/delete/clear/clone behavior", () => {
  const set = NewOrderedSetWithSizeHint<number>(0, GoNumberKey)!;

  OrderedSet_Add(set, 1, GoNumberKey);
  OrderedSet_Add(set, 2, GoNumberKey);
  OrderedSet_Add(set, 3, GoNumberKey);

  assert.equal(OrderedSet_Has(set, 1), true);
  assert.equal(OrderedSet_Has(set, 2), true);
  assert.equal(OrderedSet_Has(set, 3), true);

  assert.equal(OrderedSet_Delete(set, 2, GoEqualStrict), true);

  const values = Collect(OrderedSet_Values(set));
  assert.equal(values.length, 2);
  assert.equal(IsSorted(values), true);
  assert.deepEqual(values, [1, 3]);

  OrderedSet_Clear(set);

  assert.equal(OrderedSet_Size(set), 0);
  assert.equal(OrderedSet_Has(set, 1), false);
  assert.equal(OrderedSet_Has(set, 2), false);
  assert.equal(OrderedSet_Has(set, 3), false);

  const clone = OrderedSet_Clone(set, GoNumberKey)!;
  assert.notEqual(set, clone);
  assert.equal(OrderedSet_Size(clone), 0);
});

test("NewOrderedSetWithSizeHint preserves ordered-set behavior", () => {
  const count = 1_024;
  const set = NewOrderedSetWithSizeHint<number>(count, GoNumberKey)!;

  for (let index = 0; index < count; index++) {
    OrderedSet_Add(set, index, GoNumberKey);
  }

  assert.equal(OrderedSet_Size(set), count);
  assert.deepEqual(Collect(OrderedSet_Values(set)).slice(0, 4), [0, 1, 2, 3]);
});
