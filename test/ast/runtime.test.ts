import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  Kind,
  createBinaryExpression,
  createExpressionStatement,
  createIdentifier,
  createNodeArray,
  createNumericLiteral,
  createSourceFile,
  createToken,
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
});
