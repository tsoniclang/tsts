import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as protocol from "../../src/api/binary-ast/protocol.js";

describe("TS-Go binary AST protocol", () => {
  it("preserves protocol header and node layout constants", () => {
    assert.equal(protocol.PROTOCOL_VERSION, 5);
    assert.equal(protocol.HEADER_SIZE, 44);
    assert.equal(protocol.NODE_LEN, 28);
    assert.equal(protocol.HEADER_OFFSET_NODES, 40);
    assert.equal(protocol.NODE_OFFSET_KIND, 0);
    assert.equal(protocol.NODE_OFFSET_POS, 4);
    assert.equal(protocol.NODE_OFFSET_END, 8);
    assert.equal(protocol.NODE_OFFSET_NEXT, 12);
    assert.equal(protocol.NODE_OFFSET_PARENT, 16);
    assert.equal(protocol.NODE_OFFSET_DATA, 20);
    assert.equal(protocol.NODE_OFFSET_FLAGS, 24);
    assert.equal(protocol.KIND_NODE_LIST, 0xFFFFFFFF);
  });
});
