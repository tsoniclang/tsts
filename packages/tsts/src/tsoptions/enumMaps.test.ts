/**
 * Parity tests for the CLI option enum maps (node:test).
 *
 * These pin the TS-Go string -> numeric ModuleKind bindings so enum-map drift
 * (e.g. a missing `node20`) is caught immediately. The numeric values mirror
 * TS-Go `internal/core/compileroptions.go` exactly:
 *
 *   ModuleKindNode16   = 100
 *   ModuleKindNode18   = 101
 *   ModuleKindNode20   = 102
 *   ModuleKindNodeNext = 199
 *   ModuleKindPreserve = 200
 */

import test from "node:test";
import assert from "node:assert/strict";

import { moduleKindMap } from "./enumMaps.js";

test("moduleKindMap matches TS-Go ModuleKind values for the node family", () => {
  assert.equal(moduleKindMap.get("node16"), 100);
  assert.equal(moduleKindMap.get("node18"), 101);
  assert.equal(moduleKindMap.get("node20"), 102);
  assert.equal(moduleKindMap.get("nodenext"), 199);
  assert.equal(moduleKindMap.get("preserve"), 200);
});
