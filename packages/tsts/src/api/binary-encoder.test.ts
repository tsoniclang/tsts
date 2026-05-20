import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Kind } from "../../src/ast/index.js";
import {
  HEADER_OFFSET_EXTENDED_DATA,
  HEADER_OFFSET_METADATA,
  HEADER_OFFSET_NODES,
  HEADER_OFFSET_STRING_TABLE,
  HEADER_OFFSET_STRING_TABLE_OFFSETS,
  HEADER_OFFSET_STRUCTURED_DATA,
  HEADER_SIZE,
  NODE_DATA_TYPE_EXTENDED,
  NODE_LEN,
  NODE_OFFSET_DATA,
  NODE_OFFSET_KIND,
  PROTOCOL_VERSION,
  encodeSourceFile,
} from "../../src/api/binary-ast/index.js";
import { parseSourceFile } from "../../src/parser/index.js";

describe("TS-Go binary AST encoder", () => {
  it("writes protocol header sections and root SourceFile node", () => {
    const encoded = encodeSourceFile(parseSourceFile("x + 1;", { fileName: "sample.ts" }));
    const view = new DataView(encoded.buffer, encoded.byteOffset, encoded.byteLength);
    const offsetNodes = view.getUint32(HEADER_OFFSET_NODES, true);

    assert.equal(view.getUint32(HEADER_OFFSET_METADATA, true), PROTOCOL_VERSION << 24);
    assert.equal(view.getUint32(HEADER_OFFSET_STRING_TABLE_OFFSETS, true), HEADER_SIZE);
    assert.ok(view.getUint32(HEADER_OFFSET_STRING_TABLE, true) >= HEADER_SIZE);
    assert.ok(view.getUint32(HEADER_OFFSET_EXTENDED_DATA, true) >= view.getUint32(HEADER_OFFSET_STRING_TABLE, true));
    assert.equal(view.getUint32(HEADER_OFFSET_STRUCTURED_DATA, true), offsetNodes);
    assert.equal(view.getUint32(offsetNodes + NODE_LEN + NODE_OFFSET_KIND, true), Kind.SourceFile);
    assert.equal((view.getUint32(offsetNodes + NODE_LEN + NODE_OFFSET_DATA, true) & NODE_DATA_TYPE_EXTENDED) >>> 0, NODE_DATA_TYPE_EXTENDED);
  });

  it("encodes parser-produced child nodes after the root", () => {
    const encoded = encodeSourceFile(parseSourceFile("x + 1;"));
    const view = new DataView(encoded.buffer, encoded.byteOffset, encoded.byteLength);
    const offsetNodes = view.getUint32(HEADER_OFFSET_NODES, true);
    const nodeKinds: number[] = [];

    for (let offset = offsetNodes; offset < encoded.byteLength; offset += NODE_LEN) {
      nodeKinds.push(view.getUint32(offset + NODE_OFFSET_KIND, true));
    }

    assert.equal(nodeKinds.includes(Kind.ExpressionStatement), true);
    assert.equal(nodeKinds.includes(Kind.BinaryExpression), true);
    assert.equal(nodeKinds.includes(Kind.Identifier), true);
    assert.equal(nodeKinds.includes(Kind.NumericLiteral), true);
  });
});
