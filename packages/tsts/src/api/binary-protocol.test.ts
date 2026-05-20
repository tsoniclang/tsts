import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as protocol from "./binary-ast/protocol.js";

export class BinaryAstProtocolTests {
  preserves_header_and_node_layout_constants(): void {
    Assert.Equal(5, protocol.PROTOCOL_VERSION);
    Assert.Equal(44, protocol.HEADER_SIZE);
    Assert.Equal(28, protocol.NODE_LEN);
    Assert.Equal(40, protocol.HEADER_OFFSET_NODES);
    Assert.Equal(0, protocol.NODE_OFFSET_KIND);
    Assert.Equal(4, protocol.NODE_OFFSET_POS);
    Assert.Equal(8, protocol.NODE_OFFSET_END);
    Assert.Equal(12, protocol.NODE_OFFSET_NEXT);
    Assert.Equal(16, protocol.NODE_OFFSET_PARENT);
    Assert.Equal(20, protocol.NODE_OFFSET_DATA);
    Assert.Equal(24, protocol.NODE_OFFSET_FLAGS);
    Assert.Equal(0xffffffff, protocol.KIND_NODE_LIST);
  }
}

A<BinaryAstProtocolTests>()
  .method((t) => t.preserves_header_and_node_layout_constants)
  .add(FactAttribute);
