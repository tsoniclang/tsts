import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  Kind,
  NodeFlags,
  forEachChild,
  isArrowFunction,
  isBinaryExpression,
  isBlock,
  isCallExpression,
  isClassDeclaration,
  isConstructorDeclaration,
  isExpressionStatement,
  isExportDeclaration,
  isFunctionDeclaration,
  isIdentifier,
  isImportDeclaration,
  isInterfaceDeclaration,
  isKeywordTypeNode,
  isMethodDeclaration,
  isMethodSignatureDeclaration,
  isNamedExports,
  isNamedImports,
  isNumericLiteral,
  isParenthesizedExpression,
  isPropertyDeclaration,
  isPropertyAccessExpression,
  isPropertySignatureDeclaration,
  isReturnStatement,
  isTypeAliasDeclaration,
  isTypeLiteralNode,
  isTypeReferenceNode,
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

  it("produces property access and call expression nodes", () => {
    const sourceFile = parseSourceFile("answer.toFixed(2);");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");

    assert.equal(isCallExpression(statement.expression), true);
    if (!isCallExpression(statement.expression)) throw new Error("Expected call expression");
    assert.equal(statement.expression.arguments.length, 1);
    assert.equal(isPropertyAccessExpression(statement.expression.expression), true);
    if (!isPropertyAccessExpression(statement.expression.expression)) throw new Error("Expected property access");
    assert.equal(statement.expression.expression.name.text, "toFixed");
  });

  it("produces type aliases and type literal members with TS-Go declaration nodes", () => {
    const sourceFile = parseSourceFile("export type Box<T> = { value: T; label?: string };");
    const statement = sourceFile.statements[0]!;

    assert.equal(isTypeAliasDeclaration(statement), true);
    if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias");
    assert.equal(statement.modifiers?.[0]?.kind, Kind.ExportKeyword);
    assert.equal(statement.name.text, "Box");
    assert.equal(statement.typeParameters?.[0]?.name.text, "T");
    assert.equal(isTypeLiteralNode(statement.type), true);
    if (!isTypeLiteralNode(statement.type)) throw new Error("Expected type literal");
    assert.equal(statement.type.members.length, 2);
    assert.equal(isPropertySignatureDeclaration(statement.type.members[0]!), true);
    assert.equal(isPropertySignatureDeclaration(statement.type.members[1]!), true);
    if (!isPropertySignatureDeclaration(statement.type.members[1]!)) throw new Error("Expected property signature");
    assert.equal(statement.type.members[1]!.postfixToken?.kind, Kind.QuestionToken);
  });

  it("produces interface declarations with heritage and method signatures", () => {
    const sourceFile = parseSourceFile("interface Named extends Base<string> { id: number; rename(value: string): void; }");
    const statement = sourceFile.statements[0]!;

    assert.equal(isInterfaceDeclaration(statement), true);
    if (!isInterfaceDeclaration(statement)) throw new Error("Expected interface");
    assert.equal(statement.name.text, "Named");
    assert.equal(statement.heritageClauses?.[0]?.token, Kind.ExtendsKeyword);
    assert.equal(statement.heritageClauses?.[0]?.types[0]?.typeArguments?.[0]?.kind, Kind.StringKeyword);
    assert.equal(isPropertySignatureDeclaration(statement.members[0]!), true);
    assert.equal(isMethodSignatureDeclaration(statement.members[1]!), true);
    if (!isMethodSignatureDeclaration(statement.members[1]!)) throw new Error("Expected method signature");
    assert.equal(statement.members[1]!.parameters[0]?.name.kind, Kind.Identifier);
    assert.equal(statement.members[1]!.type?.kind, Kind.VoidKeyword);
  });

  it("produces class declarations with heritage, constructor, methods, and properties", () => {
    const sourceFile = parseSourceFile("export class Box<T> extends Base implements Named { value: T; constructor(value: T) { this.value = value; } getValue(): T { return this.value; } }");
    const statement = sourceFile.statements[0]!;

    assert.equal(isClassDeclaration(statement), true);
    if (!isClassDeclaration(statement)) throw new Error("Expected class");
    assert.equal(statement.name?.text, "Box");
    assert.equal(statement.typeParameters?.[0]?.name.text, "T");
    assert.equal(statement.heritageClauses?.[0]?.token, Kind.ExtendsKeyword);
    assert.equal(statement.heritageClauses?.[1]?.token, Kind.ImplementsKeyword);
    assert.equal(isPropertyDeclaration(statement.members[0]!), true);
    assert.equal(isConstructorDeclaration(statement.members[1]!), true);
    assert.equal(isMethodDeclaration(statement.members[2]!), true);
    if (!isMethodDeclaration(statement.members[2]!)) throw new Error("Expected method");
    assert.equal(isTypeReferenceNode(statement.members[2]!.type!), true);
    if (!isTypeReferenceNode(statement.members[2]!.type!)) throw new Error("Expected type reference");
    assert.equal(statement.members[2]!.type!.typeName.kind, Kind.Identifier);
  });

  it("produces arrow functions with parameter and return type nodes", () => {
    const sourceFile = parseSourceFile("const add = (a: number, b: number): number => a + b;");
    const statement = sourceFile.statements[0]!;
    if (!isVariableStatement(statement)) throw new Error("Expected variable statement");
    const initializer = statement.declarationList.declarations[0]!.initializer;

    assert.equal(isArrowFunction(initializer!), true);
    if (!isArrowFunction(initializer!)) throw new Error("Expected arrow function");
    assert.equal(initializer.parameters.length, 2);
    assert.equal(initializer.parameters[0]!.type?.kind, Kind.NumberKeyword);
    assert.equal(initializer.type?.kind, Kind.NumberKeyword);
    assert.equal(isBinaryExpression(initializer.body), true);
  });
});
