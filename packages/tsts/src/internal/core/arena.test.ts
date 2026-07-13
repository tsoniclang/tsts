import assert from "node:assert/strict";
import test from "node:test";

import { GoNilSlice, GoSliceIsNil } from "../../go/compat.js";
import { Arena_New } from "./arena.js";
import type { Arena } from "./arena.js";

test("Arena_New turns nil storage into allocation-stable non-nil storage", () => {
  const arena: Arena<number> = { data: GoNilSlice() };

  const first = Arena_New(arena);
  first!.v = 41;
  const storage = arena.data;

  const second = Arena_New(arena);
  second!.v = 42;

  assert.equal(GoSliceIsNil(arena.data), false);
  assert.equal(arena.data, storage);
  assert.deepEqual(arena.data, [41, 42]);
  assert.equal(first!.v, 41);
  assert.equal(second!.v, 42);
});
