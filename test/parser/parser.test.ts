import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  Kind,
  NodeFlags,
  forEachChild,
  isBinaryExpression,
  isBlock,
  isExpressionStatement,
  isExportDeclaration,
  isFunctionDeclaration,
  isIdentifier,
  isImportDeclaration,
  isKeywordTypeNode,
  isNamedExports,
  isNamedImports,
  isNumericLiteral,
  isParenthesizedExpression,
  isReturnStatement,
  isVariableStatement,
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

  it("produces TS-Go variable declaration lists with exact flags and typed initializers", () => {
    const sourceFile = parseSourceFile("export const answer: number = 42;");
    const statement = sourceFile.statements[0]!;

    assert.equal(isVariableStatement(statement), true);
    if (!isVariableStatement(statement)) throw new Error("Expected variable statement");
    assert.equal(statement.modifiers?.[0]?.kind, Kind.ExportKeyword);
    assert.equal(statement.declarationList.flags, NodeFlags.Const);

    const declaration = statement.declarationList.declarations[0]!;
    assert.equal(isIdentifier(declaration.name), true);
    assert.equal(declaration.name.parent, declaration);
    assert.equal(isKeywordTypeNode(declaration.type!), true);
    assert.equal(declaration.type!.kind, Kind.NumberKeyword);
    assert.equal(isNumericLiteral(declaration.initializer!), true);
  });

  it("produces function declarations with parameters, return types, and return statements", () => {
    const sourceFile = parseSourceFile("function add(a: number, b: number): number { return a + b; }");
    const statement = sourceFile.statements[0]!;

    assert.equal(isFunctionDeclaration(statement), true);
    if (!isFunctionDeclaration(statement)) throw new Error("Expected function declaration");
    assert.equal(statement.name?.text, "add");
    assert.equal(statement.parameters.length, 2);
    assert.equal(statement.parameters[0]!.parent, statement);
    assert.equal(statement.parameters[0]!.type?.kind, Kind.NumberKeyword);
    assert.equal(statement.type?.kind, Kind.NumberKeyword);
    assert.equal(isBlock(statement.body!), true);

    const returnStatement = statement.body!.statements[0]!;
    assert.equal(isReturnStatement(returnStatement), true);
    if (!isReturnStatement(returnStatement)) throw new Error("Expected return statement");
    assert.equal(isBinaryExpression(returnStatement.expression!), true);
  });

  it("produces import and export declarations with named bindings", () => {
    const sourceFile = parseSourceFile("import value, { dep as renamed } from \"./dep\"; export { renamed as value };");
    const importDeclaration = sourceFile.statements[0]!;
    const exportDeclaration = sourceFile.statements[1]!;

    assert.equal(isImportDeclaration(importDeclaration), true);
    if (!isImportDeclaration(importDeclaration)) throw new Error("Expected import declaration");
    assert.equal(importDeclaration.importClause?.name?.text, "value");
    assert.equal(isNamedImports(importDeclaration.importClause!.namedBindings!), true);
    if (!isNamedImports(importDeclaration.importClause!.namedBindings!)) throw new Error("Expected named imports");
    assert.equal(importDeclaration.importClause!.namedBindings.elements[0]!.propertyName?.text, "dep");
    assert.equal(importDeclaration.importClause!.namedBindings.elements[0]!.name.text, "renamed");

    assert.equal(isExportDeclaration(exportDeclaration), true);
    if (!isExportDeclaration(exportDeclaration)) throw new Error("Expected export declaration");
    assert.equal(isNamedExports(exportDeclaration.exportClause!), true);
    if (!isNamedExports(exportDeclaration.exportClause!)) throw new Error("Expected named exports");
    assert.equal(exportDeclaration.exportClause.elements[0]!.propertyName?.text, "renamed");
    assert.equal(exportDeclaration.exportClause.elements[0]!.name.text, "value");
  });
});
