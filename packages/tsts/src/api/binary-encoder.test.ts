import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { Kind } from "../ast/index.js";
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
} from "./binary-ast/index.js";
import { parseSourceFile } from "../parser/index.js";

export class BinaryAstEncoderTests {
  writes_protocol_header_sections_and_root_source_file_node(): void {
    const encoded = encodeSourceFile(parseSourceFile("x + 1;", { fileName: "sample.ts" }));
    const view = new DataView(encoded.buffer, encoded.byteOffset, encoded.byteLength);
    const offsetNodes = view.getUint32(HEADER_OFFSET_NODES, true);

    Assert.Equal(PROTOCOL_VERSION << 24, view.getUint32(HEADER_OFFSET_METADATA, true));
    Assert.Equal(HEADER_SIZE, view.getUint32(HEADER_OFFSET_STRING_TABLE_OFFSETS, true));
    Assert.True(view.getUint32(HEADER_OFFSET_STRING_TABLE, true) >= HEADER_SIZE);
    Assert.True(view.getUint32(HEADER_OFFSET_EXTENDED_DATA, true) >= view.getUint32(HEADER_OFFSET_STRING_TABLE, true));
    Assert.Equal(offsetNodes, view.getUint32(HEADER_OFFSET_STRUCTURED_DATA, true));
    Assert.Equal(Kind.SourceFile, view.getUint32(offsetNodes + NODE_LEN + NODE_OFFSET_KIND, true));
    Assert.Equal(NODE_DATA_TYPE_EXTENDED, (view.getUint32(offsetNodes + NODE_LEN + NODE_OFFSET_DATA, true) & NODE_DATA_TYPE_EXTENDED) >>> 0);
  }

  encodes_parser_produced_child_nodes_after_the_root(): void {
    const encoded = encodeSourceFile(parseSourceFile("x + 1;"));
    const view = new DataView(encoded.buffer, encoded.byteOffset, encoded.byteLength);
    const offsetNodes = view.getUint32(HEADER_OFFSET_NODES, true);
    const nodeKinds: number[] = [];

    for (let offset = offsetNodes; offset < encoded.byteLength; offset += NODE_LEN) {
      nodeKinds.push(view.getUint32(offset + NODE_OFFSET_KIND, true));
    }

    Assert.True(nodeKinds.includes(Kind.ExpressionStatement));
    Assert.True(nodeKinds.includes(Kind.BinaryExpression));
    Assert.True(nodeKinds.includes(Kind.Identifier));
    Assert.True(nodeKinds.includes(Kind.NumericLiteral));
  }
}

A<BinaryAstEncoderTests>().method((t) => t.writes_protocol_header_sections_and_root_source_file_node).add(FactAttribute);
A<BinaryAstEncoderTests>().method((t) => t.encodes_parser_produced_child_nodes_after_the_root).add(FactAttribute);
