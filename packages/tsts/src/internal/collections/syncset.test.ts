import { test } from "node:test";
import assert from "node:assert/strict";

import { SyncSet_AddIfAbsent, SyncSet_Delete, SyncSet_Has, SyncSet_Size, type SyncSet } from "./syncset.js";

test("SyncSet zero value lazily initializes its embedded SyncMap", () => {
  const set: SyncSet<string> = {};

  assert.equal(SyncSet_Has(set, "value"), false);
  assert.equal(SyncSet_AddIfAbsent(set, "value"), true);
  assert.equal(SyncSet_AddIfAbsent(set, "value"), false);
  assert.equal(SyncSet_Has(set, "value"), true);
  assert.equal(SyncSet_Size(set), 1);
  SyncSet_Delete(set, "value");
  assert.equal(SyncSet_Size(set), 0);
});
