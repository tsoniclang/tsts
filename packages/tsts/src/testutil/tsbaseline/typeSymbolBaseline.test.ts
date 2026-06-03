import test from "node:test";
import assert from "node:assert/strict";

import { parseSourceFile } from "../../parser/index.js";
import { isIdentifier, type Node, type SourceFile } from "../../ast/index.js";

import {
  newTypeWriterWalker,
  type TypeWriterProgram,
} from "./typeSymbolBaseline.js";

/**
 * Slice C (binding-pattern element walker emission). The type walker must emit a
 * `>name : Type` line for binding-pattern element names (destructuring / rest),
 * matching TS-Go's `writeTypeOrSymbol` (type_symbol_baseline.go): that function
 * never returns `nil` based on the `IsBindingElement`/property-access/label/etc.
 * condition — the condition only SELECTS the rendering path (intrinsic name vs
 * node builder), and for the intrinsic `any` type both paths render the literal
 * string "any". A binding-element name whose type is `any` therefore still prints
 * (e.g. catchClauseRestProperties.ts `>rest : any`, circularDestructuring's LHS
 * `>c : any` / `>f : any`).
 *
 * The walker is exercised over a real parsed AST with a fake TypeWriterProgram
 * that maps every identifier to `any`, isolating the walker's EMISSION decision
 * from checker type-resolution quality.
 */
function typeLinesForAnyProgram(fileName: string, source: string): readonly string[] {
  const sourceFile = parseSourceFile(source);
  const program: TypeWriterProgram = {
    getSourceFile(name: string): SourceFile | undefined {
      return name === fileName ? sourceFile : undefined;
    },
    getTypeAtLocation(node: Node): string | undefined {
      return isIdentifier(node) ? "any" : undefined;
    },
  };
  const walker = newTypeWriterWalker(program, false);
  return walker.getTypes(fileName).map((result) => `>${result.sourceText} : ${result.type}`);
}

test("type walker emits an object-binding rest element name as >rest : any", () => {
  const lines = typeLinesForAnyProgram(
    "catchClauseRestProperties.ts",
    "try {\n} catch ({ ...rest }) {\n}\n",
  );
  assert.ok(
    lines.includes(">rest : any"),
    `expected '>rest : any' to be emitted; got: ${JSON.stringify(lines)}`,
  );
});

test("type walker emits object-binding element names on the LHS of a destructuring", () => {
  const lines = typeLinesForAnyProgram(
    "destructuring.ts",
    "declare const o: { c: number; f: number };\nconst { c, f } = o;\n",
  );
  assert.ok(
    lines.includes(">c : any"),
    `expected '>c : any' to be emitted; got: ${JSON.stringify(lines)}`,
  );
  assert.ok(
    lines.includes(">f : any"),
    `expected '>f : any' to be emitted; got: ${JSON.stringify(lines)}`,
  );
});

test("type walker emits array-binding element names", () => {
  const lines = typeLinesForAnyProgram(
    "arrayBinding.ts",
    "declare const arr: number[];\nconst [head, ...tail] = arr;\n",
  );
  assert.ok(
    lines.includes(">head : any"),
    `expected '>head : any' to be emitted; got: ${JSON.stringify(lines)}`,
  );
  assert.ok(
    lines.includes(">tail : any"),
    `expected '>tail : any' to be emitted; got: ${JSON.stringify(lines)}`,
  );
});
