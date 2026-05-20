import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { HEADER_OFFSET_NODES, NODE_LEN } from "../../src/api/binary-ast/index.js";
import { Kind } from "../../src/ast/index.js";
import { compileSource } from "../../src/compiler/index.js";

describe("compiler API", () => {
  it("compiles source through scanner, parser, binary AST, and JS emitter", () => {
    const result = compileSource("x + 1;", { fileName: "input.ts" });
    const view = new DataView(result.binaryAst.buffer, result.binaryAst.byteOffset, result.binaryAst.byteLength);
    const offsetNodes = view.getUint32(HEADER_OFFSET_NODES, true);

    assert.equal(result.sourceFile.kind, Kind.SourceFile);
    assert.equal(result.javascript, "x + 1;");
    assert.equal(view.getUint32(offsetNodes + NODE_LEN, true), Kind.SourceFile);
  });

  it("compiles typed declarations through AST and JavaScript emission", () => {
    const result = compileSource("export function add(a: number, b: number): number { return a + b; }");

    assert.equal(
      result.javascript,
      [
        "export function add(a, b) {",
        "  return a + b;",
        "}",
      ].join("\n"),
    );
  });
});
