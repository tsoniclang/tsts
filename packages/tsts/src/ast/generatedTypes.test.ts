import test from "node:test";
import assert from "node:assert/strict";

import {
  Kind,
  SyntaxKind,
  type BinaryOperator,
  type BinaryOperatorToken,
  type BindingPattern,
  type ForInOrOfStatement,
  type Modifier,
  type ModifierSyntaxKind,
  type NodeArray,
  type NullLiteral,
  type ParameterDeclaration,
  type PseudoLiteralSyntaxKind,
  type SourceFile,
  type Statement,
  type TemplateLiteralLikeNode,
  type EndOfFile,
} from "./index.js";

type Equal<Actual, Expected> =
  (<T>() => T extends Actual ? 1 : 2) extends
  (<T>() => T extends Expected ? 1 : 2) ? true : false;

function assertType<_T extends true>(): void {}

test("exports syntax kind as a value alias for kind", () => {
  assert.strictEqual(SyntaxKind.Identifier, Kind.Identifier);
  assert.strictEqual(SyntaxKind.SourceFile, Kind.SourceFile);
});

test("preserves token aliases without lowering kind unions to enum members", () => {
  assertType<Equal<EndOfFile["kind"], Kind.EndOfFile>>();
  assertType<Equal<BinaryOperatorToken["kind"], BinaryOperator>>();
});

test("resolves syntax kind aliases to node token aliases for node unions", () => {
  assertType<Equal<Modifier["kind"], ModifierSyntaxKind>>();
  assertType<Equal<TemplateLiteralLikeNode["kind"], PseudoLiteralSyntaxKind>>();
});

test("expands ts go multi kind implementation nodes into exact variant unions", () => {
  assertType<Equal<ForInOrOfStatement["kind"], Kind.ForInStatement | Kind.ForOfStatement>>();
  assertType<Equal<BindingPattern["kind"], Kind.ObjectBindingPattern | Kind.ArrayBindingPattern>>();
});

test("includes multi kind statement implementations in base derived node aliases", () => {
  assertType<ForInOrOfStatement extends Statement ? true : false>();
});

test("keeps handwritten source file and schema generated node fields aligned", () => {
  assertType<Equal<SourceFile["statements"], NodeArray<Statement>>>();
  assertType<Equal<ParameterDeclaration["kind"], Kind.Parameter>>();
  assertType<Equal<NullLiteral["kind"], Kind.NullKeyword>>();
});
