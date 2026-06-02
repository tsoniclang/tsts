import test from "node:test";
import assert from "node:assert/strict";

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
  type EndOfFile,
  type Node,
  type NodeArray,
  type Statement,
  type VariableDeclaration,
} from "./index.js";

test("creates and updates schema generated nodes through typed factories", () => {
  const identifier = createIdentifier("answer");

  assert.strictEqual(identifier.kind, Kind.Identifier);
  assert.strictEqual(identifier.text, "answer");
  assert.ok(isIdentifier(identifier));
  assert.ok(isExpression(identifier));
  assert.strictEqual(updateIdentifier(identifier, "answer"), identifier);

  const renamed = updateIdentifier(identifier, "total");
  assert.notStrictEqual(renamed, identifier);
  assert.strictEqual(renamed.text, "total");
});

test("creates instantiation alias token nodes with exact guards", () => {
  const plusToken = createToken(Kind.PlusToken) as BinaryOperatorToken;

  assert.strictEqual(plusToken.kind, Kind.PlusToken);
  assert.ok(isBinaryOperatorToken(plusToken));
});

test("visits schema child members in ts go member order", () => {
  const left = createIdentifier("left");
  const operatorToken = createToken(Kind.PlusToken) as BinaryOperatorToken;
  const right = createNumericLiteral("1", 0);
  const expression = createBinaryExpression(undefined, left, undefined, operatorToken, right);
  const visitedKinds: Kind[] = [];

  forEachChild(expression, (node) => {
    visitedKinds.push(node.kind);
    return undefined;
  });

  assert.deepStrictEqual(visitedKinds, [Kind.Identifier, Kind.PlusToken, Kind.NumericLiteral]);
});

test("models handwritten source file with generated node array storage", () => {
  const expression = createExpressionStatement(createIdentifier("x"));
  const endOfFileToken = createToken(Kind.EndOfFile) as EndOfFile;
  const sourceFile = createSourceFile("input.ts", "input.ts" as never, "x;", createNodeArray([expression]) as NodeArray<Statement>, endOfFileToken, [], 0, 0);
  const visited: Node[] = [];

  assert.strictEqual(sourceFile.kind, Kind.SourceFile);
  assert.ok(isSourceFile(sourceFile));

  forEachChild(sourceFile, (node) => {
    visited.push(node);
    return undefined;
  });

  assert.deepStrictEqual(visited, [expression, endOfFileToken]);
});

test("preserves ts go node and symbol flag values", () => {
  assert.strictEqual(NodeFlags.Let, 1);
  assert.strictEqual(NodeFlags.Const, 2);
  assert.strictEqual(NodeFlags.BlockScoped, 7);
  assert.strictEqual(NodeFlags.AwaitUsing, 6);
  assert.strictEqual(NodeFlags.ContextFlags, 25_263_104);
  assert.strictEqual(SymbolFlags.FunctionScopedVariable, 1);
  assert.strictEqual(SymbolFlags.BlockScopedVariable, 2);
  assert.strictEqual(SymbolFlags.Value, 111_551);
  assert.strictEqual(SymbolFlags.Type, 788_968);
  assert.strictEqual(SymbolFlags.All, 1_073_741_823);
});

test("maps schema flags members onto node flags and wires parent links generically", () => {
  const name = createIdentifier("answer");
  const declaration = createVariableDeclaration(name, undefined, undefined, createNumericLiteral("42", 0));
  const declarations = createNodeArray([declaration]) as NodeArray<VariableDeclaration>;
  const list = createVariableDeclarationList(declarations, NodeFlags.Const);

  assert.strictEqual(list.flags, NodeFlags.Const);
  assert.strictEqual(declaration.parent, list);
  assert.strictEqual(name.parent, declaration);
  assert.strictEqual(declaration.initializer?.parent, declaration);
});

test("generates separate factories for ts go multi kind node definitions", () => {
  const moduleSpecifier = createStringLiteral("./dep", 0);
  const importDeclaration = createJSImportDeclaration(undefined, undefined, moduleSpecifier, undefined);

  assert.strictEqual(importDeclaration.kind, Kind.JSImportDeclaration);
  assert.strictEqual(importDeclaration.moduleSpecifier, moduleSpecifier);
  assert.strictEqual(moduleSpecifier.parent, importDeclaration);
});
