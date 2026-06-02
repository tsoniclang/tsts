import test from "node:test";
import assert from "node:assert/strict";

import {
  Kind,
  NodeFlags,
  forEachChild,
  isArrowFunction,
  isAsExpression,
  isBinaryExpression,
  isBlock,
  isCallExpression,
  isCallSignatureDeclaration,
  isClassDeclaration,
  isConstructorDeclaration,
  isConstructSignatureDeclaration,
  isIndexSignatureDeclaration,
  isContinueStatement,
  isConditionalExpression,
  isElementAccessExpression,
  isEnumDeclaration,
  isExpressionStatement,
  isForOfStatement,
  isForStatement,
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
  isNewExpression,
  isNumericLiteral,
  isObjectBindingPattern,
  isParenthesizedExpression,
  isPostfixUnaryExpression,
  isPrefixUnaryExpression,
  isPrivateIdentifier,
  isPropertyDeclaration,
  isPropertyAccessExpression,
  isPropertySignatureDeclaration,
  isReturnStatement,
  isStringLiteral,
  isTypeAliasDeclaration,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isTypePredicateNode,
  isVariableStatement,
  isWhileStatement,
  isArrayBindingPattern,
} from "../ast/index.js";
import { parseSourceFile } from "./index.js";

test("produces a source file with expression statements", () => {
  const sourceFile = parseSourceFile("x + 1;", { fileName: "sample.ts" });

  assert.strictEqual(sourceFile.kind, Kind.SourceFile);
  assert.strictEqual(sourceFile.fileName, "sample.ts");
  assert.strictEqual(sourceFile.statements.length, 1);

  const statement = sourceFile.statements[0]!;
  assert.ok(isExpressionStatement(statement));
  if (!isExpressionStatement(statement)) throw new Error("unreachable");
  assert.ok(isBinaryExpression(statement.expression));
});

test("preserves binary precedence in ast shape", () => {
  const sourceFile = parseSourceFile("a + b * 2;");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement) || !isBinaryExpression(statement.expression)) {
    throw new Error("Expected binary expression statement");
  }

  assert.strictEqual(statement.expression.operatorToken.kind, Kind.PlusToken);
  assert.ok(isIdentifier(statement.expression.left));
  assert.ok(isBinaryExpression(statement.expression.right));
  if (!isBinaryExpression(statement.expression.right)) throw new Error("unreachable");
  assert.strictEqual(statement.expression.right.operatorToken.kind, Kind.AsteriskToken);
  assert.ok(isNumericLiteral(statement.expression.right.right));
});

test("round trips parenthesized expressions as explicit ast nodes", () => {
  const sourceFile = parseSourceFile("(a + 1);");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");

  assert.ok(isParenthesizedExpression(statement.expression));
});

test("is consumable through generated child traversal", () => {
  const sourceFile = parseSourceFile("a + 1;");
  const visitedKinds: Kind[] = [];

  forEachChild(sourceFile, (node) => {
    visitedKinds.push(node.kind);
    return undefined;
  });

  assert.deepStrictEqual(visitedKinds, [Kind.ExpressionStatement, Kind.EndOfFile]);
});

test("produces ts go variable declaration lists with exact flags and typed initializers", () => {
  const sourceFile = parseSourceFile("export const answer: number = 42;");
  const statement = sourceFile.statements[0]!;

  assert.ok(isVariableStatement(statement));
  if (!isVariableStatement(statement)) throw new Error("Expected variable statement");
  assert.strictEqual(statement.modifiers?.[0]?.kind, Kind.ExportKeyword);
  assert.strictEqual(statement.declarationList.flags, NodeFlags.Const);

  const declaration = statement.declarationList.declarations[0]!;
  assert.ok(isIdentifier(declaration.name));
  assert.strictEqual(declaration.name.parent, declaration);
  assert.ok(isKeywordTypeNode(declaration.type!));
  assert.strictEqual(declaration.type!.kind, Kind.NumberKeyword);
  assert.ok(isNumericLiteral(declaration.initializer!));
});

test("produces function declarations with parameters return types and return statements", () => {
  const sourceFile = parseSourceFile("function add(a: number, b: number): number { return a + b; }");
  const statement = sourceFile.statements[0]!;

  assert.ok(isFunctionDeclaration(statement));
  if (!isFunctionDeclaration(statement)) throw new Error("Expected function declaration");
  assert.strictEqual(statement.name?.text, "add");
  assert.strictEqual(statement.parameters.length, 2);
  assert.strictEqual(statement.parameters[0]!.parent, statement);
  assert.strictEqual(statement.parameters[0]!.type?.kind, Kind.NumberKeyword);
  assert.strictEqual(statement.type?.kind, Kind.NumberKeyword);
  assert.ok(isBlock(statement.body!));

  const returnStatement = statement.body!.statements[0]!;
  assert.ok(isReturnStatement(returnStatement));
  if (!isReturnStatement(returnStatement)) throw new Error("Expected return statement");
  assert.ok(isBinaryExpression(returnStatement.expression!));
});

test("produces import and export declarations with named bindings", () => {
  const sourceFile = parseSourceFile("import value, { dep as renamed } from \"./dep\"; export { renamed as value };");
  const importDeclaration = sourceFile.statements[0]!;
  const exportDeclaration = sourceFile.statements[1]!;

  assert.ok(isImportDeclaration(importDeclaration));
  if (!isImportDeclaration(importDeclaration)) throw new Error("Expected import declaration");
  assert.strictEqual(importDeclaration.importClause?.name?.text, "value");
  assert.ok(isNamedImports(importDeclaration.importClause!.namedBindings!));
  if (!isNamedImports(importDeclaration.importClause!.namedBindings!)) throw new Error("Expected named imports");
  assert.strictEqual(importDeclaration.importClause!.namedBindings.elements[0]!.propertyName?.text, "dep");
  assert.strictEqual(importDeclaration.importClause!.namedBindings.elements[0]!.name.text, "renamed");

  assert.ok(isExportDeclaration(exportDeclaration));
  if (!isExportDeclaration(exportDeclaration)) throw new Error("Expected export declaration");
  assert.ok(isNamedExports(exportDeclaration.exportClause!));
  if (!isNamedExports(exportDeclaration.exportClause!)) throw new Error("Expected named exports");
  assert.strictEqual(exportDeclaration.exportClause.elements[0]!.propertyName?.text, "renamed");
  assert.strictEqual(exportDeclaration.exportClause.elements[0]!.name.text, "value");
});

test("parses contextual import export names and star re exports", () => {
  const sourceFile = parseSourceFile([
    "import assert from \"node:assert/strict\";",
    "import type { type RuntimeShape, default as fallback } from \"./runtime.js\";",
    "export * from \"./generated/kind.js\";",
  ].join("\n"));
  const defaultImport = sourceFile.statements[0]!;
  const typeImport = sourceFile.statements[1]!;
  const starExport = sourceFile.statements[2]!;

  assert.ok(isImportDeclaration(defaultImport));
  if (!isImportDeclaration(defaultImport)) throw new Error("Expected default import");
  assert.strictEqual(defaultImport.importClause?.name?.text, "assert");

  assert.ok(isImportDeclaration(typeImport));
  if (!isImportDeclaration(typeImport)) throw new Error("Expected type import");
  assert.strictEqual(typeImport.importClause?.phaseModifier, Kind.TypeKeyword);
  assert.ok(isNamedImports(typeImport.importClause!.namedBindings!));
  if (!isNamedImports(typeImport.importClause!.namedBindings!)) throw new Error("Expected named imports");
  assert.ok(typeImport.importClause!.namedBindings.elements[0]!.isTypeOnly);
  assert.strictEqual(typeImport.importClause!.namedBindings.elements[0]!.name.text, "RuntimeShape");
  assert.strictEqual(typeImport.importClause!.namedBindings.elements[1]!.propertyName?.text, "default");
  assert.strictEqual(typeImport.importClause!.namedBindings.elements[1]!.name.text, "fallback");

  assert.ok(isExportDeclaration(starExport));
  if (!isExportDeclaration(starExport)) throw new Error("Expected star export");
  assert.strictEqual(starExport.exportClause, undefined);
  assert.ok(isStringLiteral(starExport.moduleSpecifier!));
  if (!isStringLiteral(starExport.moduleSpecifier!)) throw new Error("Expected string literal module specifier");
  assert.strictEqual(starExport.moduleSpecifier.text, "./generated/kind.js");
});

test("parses const assertions as contextual type references", () => {
  const sourceFile = parseSourceFile("const values = [1, 2] as const;");
  const statement = sourceFile.statements[0]!;
  if (!isVariableStatement(statement)) throw new Error("Expected variable statement");
  const initializer = statement.declarationList.declarations[0]!.initializer;

  assert.ok(isAsExpression(initializer!));
  if (!isAsExpression(initializer!)) throw new Error("Expected as expression");
  assert.ok(isTypeReferenceNode(initializer.type));
  if (!isTypeReferenceNode(initializer.type)) throw new Error("Expected type reference");
  const typeName = initializer.type.typeName;
  assert.ok(isIdentifier(typeName));
  if (!isIdentifier(typeName)) throw new Error("Expected identifier type name");
  assert.strictEqual(typeName.text, "const");
});

test("produces property access and call expression nodes", () => {
  const sourceFile = parseSourceFile("answer.toFixed(2);");
  const statement = sourceFile.statements[0]!;
  if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");

  assert.ok(isCallExpression(statement.expression));
  if (!isCallExpression(statement.expression)) throw new Error("Expected call expression");
  assert.strictEqual(statement.expression.arguments.length, 1);
  assert.ok(isPropertyAccessExpression(statement.expression.expression));
  if (!isPropertyAccessExpression(statement.expression.expression)) throw new Error("Expected property access");
  assert.strictEqual(statement.expression.expression.name.text, "toFixed");
});

test("produces type aliases and type literal members", () => {
  const sourceFile = parseSourceFile("export type Box<T> = { value: T; label?: string };");
  const statement = sourceFile.statements[0]!;

  assert.ok(isTypeAliasDeclaration(statement));
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias");
  assert.strictEqual(statement.modifiers?.[0]?.kind, Kind.ExportKeyword);
  assert.strictEqual(statement.name.text, "Box");
  assert.strictEqual(statement.typeParameters?.[0]?.name.text, "T");
  assert.ok(isTypeLiteralNode(statement.type));
  if (!isTypeLiteralNode(statement.type)) throw new Error("Expected type literal");
  assert.strictEqual(statement.type.members.length, 2);
  assert.ok(isPropertySignatureDeclaration(statement.type.members[0]!));
  assert.ok(isPropertySignatureDeclaration(statement.type.members[1]!));
  if (!isPropertySignatureDeclaration(statement.type.members[1]!)) throw new Error("Expected property signature");
  assert.strictEqual(statement.type.members[1]!.postfixToken?.kind, Kind.QuestionToken);
});

test("produces interface declarations with heritage and method signatures", () => {
  const sourceFile = parseSourceFile("interface Named extends Base<string> { id: number; rename(value: string): void; }");
  const statement = sourceFile.statements[0]!;

  assert.ok(isInterfaceDeclaration(statement));
  if (!isInterfaceDeclaration(statement)) throw new Error("Expected interface");
  assert.strictEqual(statement.name.text, "Named");
  assert.strictEqual(statement.heritageClauses?.[0]?.token, Kind.ExtendsKeyword);
  assert.strictEqual(statement.heritageClauses?.[0]?.types[0]?.typeArguments?.[0]?.kind, Kind.StringKeyword);
  assert.ok(isPropertySignatureDeclaration(statement.members[0]!));
  assert.ok(isMethodSignatureDeclaration(statement.members[1]!));
  if (!isMethodSignatureDeclaration(statement.members[1]!)) throw new Error("Expected method signature");
  assert.strictEqual(statement.members[1]!.parameters[0]?.name.kind, Kind.Identifier);
  assert.strictEqual(statement.members[1]!.type?.kind, Kind.VoidKeyword);
});

test("produces class declarations with heritage constructor methods and properties", () => {
  const sourceFile = parseSourceFile("export class Box<T> extends Base implements Named { value: T; constructor(value: T) { this.value = value; } getValue(): T { return this.value; } }");
  const statement = sourceFile.statements[0]!;

  assert.ok(isClassDeclaration(statement));
  if (!isClassDeclaration(statement)) throw new Error("Expected class");
  assert.strictEqual(statement.name?.text, "Box");
  assert.strictEqual(statement.typeParameters?.[0]?.name.text, "T");
  assert.strictEqual(statement.heritageClauses?.[0]?.token, Kind.ExtendsKeyword);
  assert.strictEqual(statement.heritageClauses?.[1]?.token, Kind.ImplementsKeyword);
  assert.ok(isPropertyDeclaration(statement.members[0]!));
  assert.ok(isConstructorDeclaration(statement.members[1]!));
  assert.ok(isMethodDeclaration(statement.members[2]!));
  if (!isMethodDeclaration(statement.members[2]!)) throw new Error("Expected method");
  assert.ok(isTypeReferenceNode(statement.members[2]!.type!));
  if (!isTypeReferenceNode(statement.members[2]!.type!)) throw new Error("Expected type reference");
  assert.strictEqual(statement.members[2]!.type!.typeName.kind, Kind.Identifier);
});

test("produces arrow functions with parameter and return type nodes", () => {
  const sourceFile = parseSourceFile("const add = (a: number, b: number): number => a + b;");
  const statement = sourceFile.statements[0]!;
  if (!isVariableStatement(statement)) throw new Error("Expected variable statement");
  const initializer = statement.declarationList.declarations[0]!.initializer;

  assert.ok(isArrowFunction(initializer!));
  if (!isArrowFunction(initializer!)) throw new Error("Expected arrow function");
  assert.strictEqual(initializer.parameters.length, 2);
  assert.strictEqual(initializer.parameters[0]!.type?.kind, Kind.NumberKeyword);
  assert.strictEqual(initializer.type?.kind, Kind.NumberKeyword);
  assert.ok(isBinaryExpression(initializer.body));
});

test("produces loop statements with ts go initializer and body nodes", () => {
  const sourceFile = parseSourceFile("for (let index = 0; index < 3; index += 1) { continue; } for (const item of items) { item; } while (ready) { ready; }");
  const forStatement = sourceFile.statements[0]!;
  const forOfStatement = sourceFile.statements[1]!;
  const whileStatement = sourceFile.statements[2]!;

  assert.ok(isForStatement(forStatement));
  if (!isForStatement(forStatement)) throw new Error("Expected for statement");
  assert.strictEqual(forStatement.initializer?.kind, Kind.VariableDeclarationList);
  assert.ok(isBinaryExpression(forStatement.condition!));
  assert.ok(isBinaryExpression(forStatement.incrementor!));
  assert.ok(isBlock(forStatement.statement));
  if (!isBlock(forStatement.statement)) throw new Error("Expected for block");
  assert.ok(isContinueStatement(forStatement.statement.statements[0]!));

  assert.ok(isForOfStatement(forOfStatement));
  if (!isForOfStatement(forOfStatement)) throw new Error("Expected for-of statement");
  assert.strictEqual(forOfStatement.initializer.kind, Kind.VariableDeclarationList);
  assert.ok(isIdentifier(forOfStatement.expression));

  assert.ok(isWhileStatement(whileStatement));
  if (!isWhileStatement(whileStatement)) throw new Error("Expected while statement");
  assert.ok(isIdentifier(whileStatement.expression));
});

test("produces core access unary new and conditional expression nodes", () => {
  const sourceFile = parseSourceFile("const value = enabled ? new Box(items[index++], ...rest).value as number : -1;");
  const statement = sourceFile.statements[0]!;
  if (!isVariableStatement(statement)) throw new Error("Expected variable statement");
  const initializer = statement.declarationList.declarations[0]!.initializer;

  assert.ok(isConditionalExpression(initializer!));
  if (!isConditionalExpression(initializer!)) throw new Error("Expected conditional expression");
  assert.ok(isIdentifier(initializer.condition));
  assert.ok(isAsExpression(initializer.whenTrue));
  if (!isAsExpression(initializer.whenTrue)) throw new Error("Expected as expression");
  assert.ok(isPropertyAccessExpression(initializer.whenTrue.expression));
  if (!isPropertyAccessExpression(initializer.whenTrue.expression)) throw new Error("Expected property access");
  assert.ok(isNewExpression(initializer.whenTrue.expression.expression));
  if (!isNewExpression(initializer.whenTrue.expression.expression)) throw new Error("Expected new expression");
  const firstArgument = initializer.whenTrue.expression.expression.arguments?.[0];
  assert.ok(isElementAccessExpression(firstArgument!));
  if (!isElementAccessExpression(firstArgument!)) throw new Error("Expected element access");
  assert.ok(isPostfixUnaryExpression(firstArgument.argumentExpression));
  assert.ok(isPrefixUnaryExpression(initializer.whenFalse));
});

test("produces object and array binding patterns in declarations and parameters", () => {
  const sourceFile = parseSourceFile("const { id, name: label = \"x\", ...rest } = item; function f([first, second]: string[]) { return first; }");
  const variableStatement = sourceFile.statements[0]!;
  const functionStatement = sourceFile.statements[1]!;
  if (!isVariableStatement(variableStatement)) throw new Error("Expected variable statement");
  if (!isFunctionDeclaration(functionStatement)) throw new Error("Expected function statement");

  const bindingName = variableStatement.declarationList.declarations[0]!.name;
  assert.ok(isObjectBindingPattern(bindingName));
  if (!isObjectBindingPattern(bindingName)) throw new Error("Expected object binding pattern");
  assert.strictEqual(bindingName.elements.length, 3);
  assert.strictEqual(bindingName.elements[1]!.propertyName?.kind, Kind.Identifier);
  assert.strictEqual(bindingName.elements[1]!.initializer?.kind, Kind.StringLiteral);
  assert.strictEqual(bindingName.elements[2]!.dotDotDotToken?.kind, Kind.DotDotDotToken);

  assert.ok(isArrayBindingPattern(functionStatement.parameters[0]!.name));
});

test("parses ts go enum private identifier and type predicate surfaces", () => {
  const sourceFile = parseSourceFile([
    "export enum Kind { Unknown = 0, Identifier }",
    "class Box { #value: number = 1; getValue(): number { return this.#value; } }",
    "function isBox(value: unknown): value is Box { return value instanceof Box; }",
  ].join("\n"));
  const enumDeclaration = sourceFile.statements[0]!;
  const classDeclaration = sourceFile.statements[1]!;
  const predicateFunction = sourceFile.statements[2]!;

  assert.ok(isEnumDeclaration(enumDeclaration));
  if (!isEnumDeclaration(enumDeclaration)) throw new Error("Expected enum declaration");
  assert.strictEqual(enumDeclaration.members[1]!.name.kind, Kind.Identifier);

  assert.ok(isClassDeclaration(classDeclaration));
  if (!isClassDeclaration(classDeclaration)) throw new Error("Expected class declaration");
  assert.ok(isPropertyDeclaration(classDeclaration.members[0]!));
  if (!isPropertyDeclaration(classDeclaration.members[0]!)) throw new Error("Expected property declaration");
  assert.ok(isPrivateIdentifier(classDeclaration.members[0]!.name));

  assert.ok(isFunctionDeclaration(predicateFunction));
  if (!isFunctionDeclaration(predicateFunction)) throw new Error("Expected predicate function");
  assert.ok(isTypePredicateNode(predicateFunction.type!));
});

test("parses generic function types try catch switch and throw statements", () => {
  const sourceFile = parseSourceFile([
    "type Equal<Actual, Expected> = (<T>() => T extends Actual ? 1 : 2) extends (<T>() => T extends Expected ? 1 : 2) ? true : false;",
    "try { throw new Error(\"x\"); } catch (error) { switch (error) { default: break; } }",
  ].join("\n"));

  assert.ok(isTypeAliasDeclaration(sourceFile.statements[0]!));
  assert.strictEqual(sourceFile.statements[1]!.kind, Kind.TryStatement);
});

test("parses type literal call index and construct signatures", () => {
  const sourceFile = parseSourceFile(
    "type T = { (text: string): number; [key: string]: number; new (text: string): Widget };",
  );
  const statement = sourceFile.statements[0]!;
  assert.ok(isTypeAliasDeclaration(statement));
  if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias");
  assert.ok(isTypeLiteralNode(statement.type));
  if (!isTypeLiteralNode(statement.type)) throw new Error("Expected type literal");
  assert.strictEqual(statement.type.members.length, 3);

  const callSig = statement.type.members[0]!;
  assert.ok(isCallSignatureDeclaration(callSig));
  if (!isCallSignatureDeclaration(callSig)) throw new Error("Expected call signature");
  assert.strictEqual(callSig.parameters.length, 1);
  assert.strictEqual(callSig.parameters[0]!.type?.kind, Kind.StringKeyword);
  assert.strictEqual(callSig.type?.kind, Kind.NumberKeyword);

  const indexSig = statement.type.members[1]!;
  assert.ok(isIndexSignatureDeclaration(indexSig));
  if (!isIndexSignatureDeclaration(indexSig)) throw new Error("Expected index signature");
  assert.strictEqual(indexSig.parameters.length, 1);
  assert.strictEqual((indexSig.parameters[0]!.name as { text: string }).text, "key");
  assert.strictEqual(indexSig.parameters[0]!.type?.kind, Kind.StringKeyword);
  assert.strictEqual(indexSig.type?.kind, Kind.NumberKeyword);

  const constructSig = statement.type.members[2]!;
  assert.ok(isConstructSignatureDeclaration(constructSig));
  if (!isConstructSignatureDeclaration(constructSig)) throw new Error("Expected construct signature");
  assert.strictEqual(constructSig.parameters.length, 1);
  assert.strictEqual(constructSig.parameters[0]!.type?.kind, Kind.StringKeyword);
});
