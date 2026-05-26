import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { HEADER_OFFSET_NODES, NODE_LEN } from "../api/binary-ast/index.js";
import { Kind } from "../ast/index.js";
import { compileSource } from "./index.js";

export class CompilerApiTests {
  compiles_source_through_scanner_parser_binary_ast_and_js_emitter(): void {
    const result = compileSource("x + 1;", { fileName: "input.ts" });
    const view = new DataView(result.binaryAst.buffer, result.binaryAst.byteOffset, result.binaryAst.byteLength);
    const offsetNodes = view.getUint32(HEADER_OFFSET_NODES, true);

    Assert.Equal(Kind.SourceFile, result.sourceFile.kind);
    Assert.Equal("x + 1;", result.javascript);
    Assert.Equal(Kind.SourceFile, view.getUint32(offsetNodes + NODE_LEN, true));
  }

  compiles_typed_declarations_through_ast_and_javascript_emission(): void {
    const result = compileSource("export function add(a: number, b: number): number { return a + b; }");

    Assert.Equal(
      ["export function add(a, b) {", "  return a + b;", "}"].join("\n"),
      result.javascript,
    );
  }
}

A<CompilerApiTests>().method((t) => t.compiles_source_through_scanner_parser_binary_ast_and_js_emitter).add(FactAttribute);
A<CompilerApiTests>().method((t) => t.compiles_typed_declarations_through_ast_and_javascript_emission).add(FactAttribute);
