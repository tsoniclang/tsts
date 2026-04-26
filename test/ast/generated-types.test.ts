import assert from "node:assert/strict";
import { describe, it } from "node:test";
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
  type Token,
} from "../../src/ast/index.js";

type Equal<Actual, Expected> =
  (<T>() => T extends Actual ? 1 : 2) extends
  (<T>() => T extends Expected ? 1 : 2) ? true : false;

function assertType<T extends true>(): void {}

describe("TS-Go generated AST type surface", () => {
  it("exports SyntaxKind as a value alias for Kind", () => {
    assert.equal(SyntaxKind.Identifier, Kind.Identifier);
    assert.equal(SyntaxKind.SourceFile, Kind.SourceFile);
  });

  it("preserves generic token aliases without lowering kind unions to enum members", () => {
    assertType<Equal<Token<Kind.EndOfFile>["kind"], Kind.EndOfFile>>();
    assertType<Equal<BinaryOperatorToken["kind"], BinaryOperator>>();
  });

  it("resolves syntax-kind aliases to node-token aliases for node unions", () => {
    assertType<Equal<Modifier["kind"], ModifierSyntaxKind>>();
    assertType<Equal<TemplateLiteralLikeNode["kind"], PseudoLiteralSyntaxKind>>();
  });

  it("expands TS-Go multi-kind implementation nodes into exact variant unions", () => {
    assertType<Equal<ForInOrOfStatement["kind"], Kind.ForInStatement | Kind.ForOfStatement>>();
    assertType<Equal<BindingPattern["kind"], Kind.ObjectBindingPattern | Kind.ArrayBindingPattern>>();
  });

  it("keeps hand-written SourceFile and schema-generated node fields aligned", () => {
    assertType<Equal<SourceFile["statements"], NodeArray<Statement>>>();
    assertType<Equal<ParameterDeclaration["kind"], Kind.Parameter>>();
    assertType<Equal<NullLiteral["kind"], Kind.NullKeyword>>();
  });
});
