import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  Kind,
  forEachChild,
  isBinaryExpression,
  isExpressionStatement,
  isIdentifier,
  isNumericLiteral,
  isParenthesizedExpression,
} from "../../src/ast/index.js";
import { parseSourceFile } from "../../src/parser/index.js";

describe("TS-Go parser groundwork", () => {
  it("produces a SourceFile with expression statements", () => {
    const sourceFile = parseSourceFile("x + 1;", { fileName: "sample.ts" });

    assert.equal(sourceFile.kind, Kind.SourceFile);
    assert.equal(sourceFile.fileName, "sample.ts");
    assert.equal(sourceFile.statements.length, 1);

    const statement = sourceFile.statements[0]!;
    assert.equal(isExpressionStatement(statement), true);
    if (!isExpressionStatement(statement)) throw new Error("unreachable");
    assert.equal(isBinaryExpression(statement.expression), true);
  });

  it("preserves binary precedence in AST shape", () => {
    const sourceFile = parseSourceFile("a + b * 2;");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement) || !isBinaryExpression(statement.expression)) {
      throw new Error("Expected binary expression statement");
    }

    assert.equal(statement.expression.operatorToken.kind, Kind.PlusToken);
    assert.equal(isIdentifier(statement.expression.left), true);
    assert.equal(isBinaryExpression(statement.expression.right), true);
    if (!isBinaryExpression(statement.expression.right)) throw new Error("unreachable");
    assert.equal(statement.expression.right.operatorToken.kind, Kind.AsteriskToken);
    assert.equal(isNumericLiteral(statement.expression.right.right), true);
  });

  it("round-trips parenthesized expressions as explicit AST nodes", () => {
    const sourceFile = parseSourceFile("(a + 1);");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) {
      throw new Error("Expected expression statement");
    }

    assert.equal(isParenthesizedExpression(statement.expression), true);
  });

  it("is consumable through generated child traversal", () => {
    const sourceFile = parseSourceFile("a + 1;");
    const visitedKinds: Kind[] = [];

    forEachChild(sourceFile, node => {
      visitedKinds.push(node.kind);
      return undefined;
    });

    assert.deepEqual(visitedKinds, [Kind.ExpressionStatement, Kind.EndOfFile]);
  });
});
