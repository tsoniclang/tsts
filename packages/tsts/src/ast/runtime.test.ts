import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  Kind,
  NodeFlags,
  SymbolFlags,
  createBinaryExpression,
  createExpressionStatement,
  createIdentifier,
  createJSImportDeclaration,
  createNodeArray,
  createNumericLiteral,
  createSourceFile,
  createStringLiteral,
  createToken,
  createVariableDeclaration,
  createVariableDeclarationList,
  forEachChild,
  isBinaryOperatorToken,
  isExpression,
  isIdentifier,
  isSourceFile,
  updateIdentifier,
  type BinaryOperatorToken,
  type Node,
} from "../../src/ast/index.js";

describe("TS-Go generated AST runtime", () => {
  it("creates and updates schema-generated nodes through typed factories", () => {
    const identifier = createIdentifier("answer");

    assert.equal(identifier.kind, Kind.Identifier);
    assert.equal(identifier.text, "answer");
    assert.equal(isIdentifier(identifier), true);
    assert.equal(isExpression(identifier), true);
    assert.equal(updateIdentifier(identifier, "answer"), identifier);

    const renamed = updateIdentifier(identifier, "total");
    assert.notEqual(renamed, identifier);
    assert.equal(renamed.text, "total");
  });

  it("creates instantiation-alias token nodes with exact guards", () => {
    const plusToken = createToken(Kind.PlusToken) as BinaryOperatorToken;

    assert.equal(plusToken.kind, Kind.PlusToken);
    assert.equal(isBinaryOperatorToken(plusToken), true);
  });

  it("visits schema child members in TS-Go member order", () => {
    const left = createIdentifier("left");
    const operatorToken = createToken(Kind.PlusToken) as BinaryOperatorToken;
    const right = createNumericLiteral("1", 0);
    const expression = createBinaryExpression(undefined, left, undefined, operatorToken, right);
    const visitedKinds: Kind[] = [];

    forEachChild(expression, node => {
      visitedKinds.push(node.kind);
      return undefined;
    });

    assert.deepEqual(visitedKinds, [Kind.Identifier, Kind.PlusToken, Kind.NumericLiteral]);
  });

  it("models hand-written SourceFile with generated NodeArray storage", () => {
    const expression = createExpressionStatement(createIdentifier("x"));
    const endOfFileToken = createToken(Kind.EndOfFile);
    const sourceFile = createSourceFile("input.ts", "input.ts" as never, "x;", createNodeArray([expression]), endOfFileToken);
    const visited: Node[] = [];

    assert.equal(sourceFile.kind, Kind.SourceFile);
    assert.equal(isSourceFile(sourceFile), true);

    forEachChild(sourceFile, node => {
      visited.push(node);
      return undefined;
    });

    assert.deepEqual(visited, [expression, endOfFileToken]);
  });

  it("preserves TS-Go node and symbol flag values", () => {
    assert.equal(NodeFlags.Let, 1);
    assert.equal(NodeFlags.Const, 2);
    assert.equal(NodeFlags.BlockScoped, 7);
    assert.equal(NodeFlags.AwaitUsing, 6);
    assert.equal(NodeFlags.ContextFlags, 25_263_104);
    assert.equal(SymbolFlags.FunctionScopedVariable, 1);
    assert.equal(SymbolFlags.BlockScopedVariable, 2);
    assert.equal(SymbolFlags.Value, 111_551);
    assert.equal(SymbolFlags.Type, 788_968);
    assert.equal(SymbolFlags.All, 1_073_741_823);
  });

  it("maps schema Flags members onto Node.flags and wires parent links generically", () => {
    const name = createIdentifier("answer");
    const declaration = createVariableDeclaration(name, undefined, undefined, createNumericLiteral("42", 0));
    const declarations = createNodeArray([declaration]);
    const list = createVariableDeclarationList(declarations, NodeFlags.Const);

    assert.equal(list.flags, NodeFlags.Const);
    assert.equal(declaration.parent, list);
    assert.equal(name.parent, declaration);
    assert.equal(declaration.initializer?.parent, declaration);
  });

  it("generates separate factories for TS-Go multi-kind node definitions", () => {
    const moduleSpecifier = createStringLiteral("./dep", 0);
    const importDeclaration = createJSImportDeclaration(undefined, undefined, moduleSpecifier, undefined);

    assert.equal(importDeclaration.kind, Kind.JSImportDeclaration);
    assert.equal(importDeclaration.moduleSpecifier, moduleSpecifier);
    assert.equal(moduleSpecifier.parent, importDeclaration);
  });
});
