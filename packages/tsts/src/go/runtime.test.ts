import { test } from "node:test";
import assert from "node:assert/strict";

import { ReadMemStats, type MemStats } from "./runtime.js";

test("ReadMemStats reports live Node heap use and the documented zero allocation-count fallback", () => {
  const stats: MemStats = { Alloc: 0n, Mallocs: 99n };

  ReadMemStats(stats);

  assert.equal(typeof stats.Alloc, "bigint");
  assert.ok(stats.Alloc > 0n);
  assert.equal(stats.Mallocs, 0n);
});
