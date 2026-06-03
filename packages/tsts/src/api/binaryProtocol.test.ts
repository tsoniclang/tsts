import test from "node:test";
import assert from "node:assert/strict";

import * as protocol from "./binary-ast/protocol.js";

test("preserves header and node layout constants", () => {
  assert.strictEqual(protocol.PROTOCOL_VERSION, 5);
  assert.strictEqual(protocol.HEADER_SIZE, 44);
  assert.strictEqual(protocol.NODE_LEN, 28);
  assert.strictEqual(protocol.HEADER_OFFSET_NODES, 40);
  assert.strictEqual(protocol.NODE_OFFSET_KIND, 0);
  assert.strictEqual(protocol.NODE_OFFSET_POS, 4);
  assert.strictEqual(protocol.NODE_OFFSET_END, 8);
  assert.strictEqual(protocol.NODE_OFFSET_NEXT, 12);
  assert.strictEqual(protocol.NODE_OFFSET_PARENT, 16);
  assert.strictEqual(protocol.NODE_OFFSET_DATA, 20);
  assert.strictEqual(protocol.NODE_OFFSET_FLAGS, 24);
  assert.strictEqual(protocol.KIND_NODE_LIST, 0xffffffff);
});
