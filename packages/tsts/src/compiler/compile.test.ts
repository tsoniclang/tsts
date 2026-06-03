import test from "node:test";
import assert from "node:assert/strict";

import { HEADER_OFFSET_NODES, NODE_LEN } from "../api/binary-ast/index.js";
import { Kind } from "../ast/index.js";
import { compileSource } from "./index.js";

test("compiles source through scanner parser binary ast and js emitter", () => {
  const result = compileSource("x + 1;", { fileName: "input.ts" });
  const view = new DataView(result.binaryAst.buffer, result.binaryAst.byteOffset, result.binaryAst.byteLength);
  const offsetNodes = view.getUint32(HEADER_OFFSET_NODES, true);

  assert.strictEqual(result.sourceFile.kind, Kind.SourceFile);
  assert.strictEqual(result.javascript, "x + 1;");
  assert.strictEqual(view.getUint32(offsetNodes + NODE_LEN, true), Kind.SourceFile);
});

test("compiles typed declarations through ast and javascript emission", () => {
  const result = compileSource("export function add(a: number, b: number): number { return a + b; }");

  assert.strictEqual(
    result.javascript,
    ["export function add(a, b) {", "  return a + b;", "}"].join("\n"),
  );
});
