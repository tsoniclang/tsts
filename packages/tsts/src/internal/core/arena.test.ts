import assert from "node:assert/strict";
import test from "node:test";

import { GoNilSlice, GoSliceIsNil, GoZeroNumber } from "../../go/compat.js";
import { Arena_New } from "./arena.js";
import type { Arena } from "./arena.js";

test("Arena_New turns nil storage into allocation-stable non-nil storage", () => {
  const arena: Arena<number> = { data: GoNilSlice() };

  const first = Arena_New(arena, GoZeroNumber);
  first!.v = 41;
  const storage = arena.data;

  const second = Arena_New(arena, GoZeroNumber);
  second!.v = 42;

  assert.equal(GoSliceIsNil(arena.data), false);
  assert.equal(arena.data, storage);
  assert.deepEqual(arena.data, [41, 42]);
  assert.equal(first!.v, 41);
  assert.equal(second!.v, 42);
});
