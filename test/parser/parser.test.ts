import assert from "node:assert/strict";
import { describe, it } from "node:test";
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
  isClassExpression,
  isConstructorDeclaration,
  isContinueStatement,
  isConditionalExpression,
  isElementAccessExpression,
  isEmptyStatement,
  isEnumDeclaration,
  isExportAssignment,
  isExpressionStatement,
  isForOfStatement,
  isForStatement,
  isExportDeclaration,
  isFunctionDeclaration,
  isGetAccessorDeclaration,
  isIdentifier,
  isIndexSignatureDeclaration,
  isImportDeclaration,
  isImportEqualsDeclaration,
  isInterfaceDeclaration,
  isKeywordTypeNode,
  isMethodDeclaration,
  isMethodSignatureDeclaration,
  isModuleDeclaration,
  isNamedExports,
  isNamedImports,
  isNewExpression,
  isNumericLiteral,
  isObjectBindingPattern,
  isObjectLiteralExpression,
  isParenthesizedExpression,
  isPostfixUnaryExpression,
  isPrefixUnaryExpression,
  isPrivateIdentifier,
  isPropertyDeclaration,
  isPropertyAccessExpression,
  isPropertySignatureDeclaration,
  isReturnStatement,
  isSetAccessorDeclaration,
  isShorthandPropertyAssignment,
  isStringLiteral,
  isTypeAliasDeclaration,
  isTypeAssertion,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isTypePredicateNode,
  isVariableStatement,
  isWhileStatement,
  isArrayBindingPattern,
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

  it("parses contextual import/export names and star re-exports", () => {
    const sourceFile = parseSourceFile([
      "import assert from \"node:assert/strict\";",
      "import type { type RuntimeShape, default as fallback } from \"./runtime.js\";",
      "export * from \"./generated/kind.js\";",
    ].join("\n"));
    const defaultImport = sourceFile.statements[0]!;
    const typeImport = sourceFile.statements[1]!;
    const starExport = sourceFile.statements[2]!;

    assert.equal(isImportDeclaration(defaultImport), true);
    if (!isImportDeclaration(defaultImport)) throw new Error("Expected default import");
    assert.equal(defaultImport.importClause?.name?.text, "assert");

    assert.equal(isImportDeclaration(typeImport), true);
    if (!isImportDeclaration(typeImport)) throw new Error("Expected type import");
    assert.equal(typeImport.importClause?.phaseModifier, Kind.TypeKeyword);
    assert.equal(isNamedImports(typeImport.importClause!.namedBindings!), true);
    if (!isNamedImports(typeImport.importClause!.namedBindings!)) throw new Error("Expected named imports");
    assert.equal(typeImport.importClause!.namedBindings.elements[0]!.isTypeOnly, true);
    assert.equal(typeImport.importClause!.namedBindings.elements[0]!.name.text, "RuntimeShape");
    assert.equal(typeImport.importClause!.namedBindings.elements[1]!.propertyName?.text, "default");
    assert.equal(typeImport.importClause!.namedBindings.elements[1]!.name.text, "fallback");

    assert.equal(isExportDeclaration(starExport), true);
    if (!isExportDeclaration(starExport)) throw new Error("Expected star export");
    assert.equal(starExport.exportClause, undefined);
    assert.equal(isStringLiteral(starExport.moduleSpecifier!), true);
    if (!isStringLiteral(starExport.moduleSpecifier!)) throw new Error("Expected string literal module specifier");
    assert.equal(starExport.moduleSpecifier.text, "./generated/kind.js");
  });

  it("parses const assertions as contextual type references", () => {
    const sourceFile = parseSourceFile("const values = [1, 2] as const;");
    const statement = sourceFile.statements[0]!;
    if (!isVariableStatement(statement)) throw new Error("Expected variable statement");
    const initializer = statement.declarationList.declarations[0]!.initializer;

    assert.equal(isAsExpression(initializer!), true);
    if (!isAsExpression(initializer!)) throw new Error("Expected as expression");
    assert.equal(isTypeReferenceNode(initializer.type), true);
    if (!isTypeReferenceNode(initializer.type)) throw new Error("Expected type reference");
    assert.equal(initializer.type.typeName.kind, Kind.Identifier);
    assert.equal(initializer.type.typeName.text, "const");
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

  it("parses accessor declarations in class, object, and type-member contexts", () => {
    const sourceFile = parseSourceFile([
      "class C { get value(): string { return \"x\"; } set value(public next = \"x\"): number { } }",
      "const obj = { get value() { return 1; }, set value(...next) { } };",
      "type Shape = { get value() { return 1; }; set value(next) { } };",
    ].join("\n"));

    const classDeclaration = sourceFile.statements[0]!;
    assert.equal(isClassDeclaration(classDeclaration), true);
    if (!isClassDeclaration(classDeclaration)) throw new Error("Expected class declaration");
    assert.equal(isGetAccessorDeclaration(classDeclaration.members[0]!), true);
    assert.equal(isSetAccessorDeclaration(classDeclaration.members[1]!), true);
    if (!isSetAccessorDeclaration(classDeclaration.members[1]!)) throw new Error("Expected set accessor");
    assert.equal(classDeclaration.members[1]!.parameters[0]!.modifiers?.[0]?.kind, Kind.PublicKeyword);
    assert.equal(classDeclaration.members[1]!.parameters[0]!.initializer?.kind, Kind.StringLiteral);
    assert.equal(classDeclaration.members[1]!.type?.kind, Kind.NumberKeyword);

    const objectStatement = sourceFile.statements[1]!;
    if (!isVariableStatement(objectStatement)) throw new Error("Expected object variable");
    const objectInitializer = objectStatement.declarationList.declarations[0]!.initializer;
    assert.equal(isObjectLiteralExpression(objectInitializer!), true);
    if (!isObjectLiteralExpression(objectInitializer!)) throw new Error("Expected object literal");
    assert.equal(isGetAccessorDeclaration(objectInitializer.properties[0]!), true);
    assert.equal(isSetAccessorDeclaration(objectInitializer.properties[1]!), true);

    const typeAlias = sourceFile.statements[2]!;
    assert.equal(isTypeAliasDeclaration(typeAlias), true);
    if (!isTypeAliasDeclaration(typeAlias) || !isTypeLiteralNode(typeAlias.type)) throw new Error("Expected type literal");
    assert.equal(isGetAccessorDeclaration(typeAlias.type.members[0]!), true);
    assert.equal(isSetAccessorDeclaration(typeAlias.type.members[1]!), true);
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

  it("produces loop statements with TS-Go initializer and body nodes", () => {
    const sourceFile = parseSourceFile("for (let index = 0; index < 3; index += 1) { continue; } for (const item of items) { item; } while (ready) { ready; }");
    const forStatement = sourceFile.statements[0]!;
    const forOfStatement = sourceFile.statements[1]!;
    const whileStatement = sourceFile.statements[2]!;

    assert.equal(isForStatement(forStatement), true);
    if (!isForStatement(forStatement)) throw new Error("Expected for statement");
    assert.equal(forStatement.initializer?.kind, Kind.VariableDeclarationList);
    assert.equal(isBinaryExpression(forStatement.condition!), true);
    assert.equal(isBinaryExpression(forStatement.incrementor!), true);
    assert.equal(isBlock(forStatement.statement), true);
    if (!isBlock(forStatement.statement)) throw new Error("Expected for block");
    assert.equal(isContinueStatement(forStatement.statement.statements[0]!), true);

    assert.equal(isForOfStatement(forOfStatement), true);
    if (!isForOfStatement(forOfStatement)) throw new Error("Expected for-of statement");
    assert.equal(forOfStatement.initializer.kind, Kind.VariableDeclarationList);
    assert.equal(isIdentifier(forOfStatement.expression), true);

    assert.equal(isWhileStatement(whileStatement), true);
    if (!isWhileStatement(whileStatement)) throw new Error("Expected while statement");
    assert.equal(isIdentifier(whileStatement.expression), true);
  });

  it("produces core access, unary, new, and conditional expression nodes", () => {
    const sourceFile = parseSourceFile("const value = enabled ? new Box(items[index++], ...rest).value as number : -1;");
    const statement = sourceFile.statements[0]!;
    if (!isVariableStatement(statement)) throw new Error("Expected variable statement");
    const initializer = statement.declarationList.declarations[0]!.initializer;

    assert.equal(isConditionalExpression(initializer!), true);
    if (!isConditionalExpression(initializer!)) throw new Error("Expected conditional expression");
    assert.equal(isIdentifier(initializer.condition), true);
    assert.equal(isAsExpression(initializer.whenTrue), true);
    if (!isAsExpression(initializer.whenTrue)) throw new Error("Expected as expression");
    assert.equal(isPropertyAccessExpression(initializer.whenTrue.expression), true);
    if (!isPropertyAccessExpression(initializer.whenTrue.expression)) throw new Error("Expected property access");
    assert.equal(isNewExpression(initializer.whenTrue.expression.expression), true);
    if (!isNewExpression(initializer.whenTrue.expression.expression)) throw new Error("Expected new expression");
    const firstArgument = initializer.whenTrue.expression.expression.arguments?.[0];
    assert.equal(isElementAccessExpression(firstArgument!), true);
    if (!isElementAccessExpression(firstArgument!)) throw new Error("Expected element access");
    assert.equal(isPostfixUnaryExpression(firstArgument.argumentExpression), true);
    assert.equal(isPrefixUnaryExpression(initializer.whenFalse), true);
  });

  it("produces object and array binding patterns in declarations and parameters", () => {
    const sourceFile = parseSourceFile("const { id, name: label = \"x\", ...rest } = item; function f([first, second]: string[]) { return first; }");
    const variableStatement = sourceFile.statements[0]!;
    const functionStatement = sourceFile.statements[1]!;
    if (!isVariableStatement(variableStatement)) throw new Error("Expected variable statement");
    if (!isFunctionDeclaration(functionStatement)) throw new Error("Expected function statement");

    const bindingName = variableStatement.declarationList.declarations[0]!.name;
    assert.equal(isObjectBindingPattern(bindingName), true);
    if (!isObjectBindingPattern(bindingName)) throw new Error("Expected object binding pattern");
    assert.equal(bindingName.elements.length, 3);
    assert.equal(bindingName.elements[1]!.propertyName?.kind, Kind.Identifier);
    assert.equal(bindingName.elements[1]!.initializer?.kind, Kind.StringLiteral);
    assert.equal(bindingName.elements[2]!.dotDotDotToken?.kind, Kind.DotDotDotToken);

    assert.equal(isArrayBindingPattern(functionStatement.parameters[0]!.name), true);
  });

  it("parses TS-Go enum, private identifier, and type-predicate surfaces", () => {
    const sourceFile = parseSourceFile([
      "export enum Kind { Unknown = 0, Identifier }",
      "class Box { #value: number = 1; getValue(): number { return this.#value; } }",
      "function isBox(value: unknown): value is Box { return value instanceof Box; }",
    ].join("\n"));
    const enumDeclaration = sourceFile.statements[0]!;
    const classDeclaration = sourceFile.statements[1]!;
    const predicateFunction = sourceFile.statements[2]!;

    assert.equal(isEnumDeclaration(enumDeclaration), true);
    if (!isEnumDeclaration(enumDeclaration)) throw new Error("Expected enum declaration");
    assert.equal(enumDeclaration.members[1]!.name.kind, Kind.Identifier);

    assert.equal(isClassDeclaration(classDeclaration), true);
    if (!isClassDeclaration(classDeclaration)) throw new Error("Expected class declaration");
    assert.equal(isPropertyDeclaration(classDeclaration.members[0]!), true);
    if (!isPropertyDeclaration(classDeclaration.members[0]!)) throw new Error("Expected property declaration");
    assert.equal(isPrivateIdentifier(classDeclaration.members[0]!.name), true);

    assert.equal(isFunctionDeclaration(predicateFunction), true);
    if (!isFunctionDeclaration(predicateFunction)) throw new Error("Expected predicate function");
    assert.equal(isTypePredicateNode(predicateFunction.type!), true);
  });

  it("parses generic function types, try/catch, switch, and throw statements", () => {
    const sourceFile = parseSourceFile([
      "type Equal<Actual, Expected> = (<T>() => T extends Actual ? 1 : 2) extends (<T>() => T extends Expected ? 1 : 2) ? true : false;",
      "try { throw new Error(\"x\"); } catch (error) { switch (error) { default: break; } }",
    ].join("\n"));

    assert.equal(isTypeAliasDeclaration(sourceFile.statements[0]!), true);
    assert.equal(sourceFile.statements[1]!.kind, Kind.TryStatement);
  });

  it("parses import equals declarations and type-literal call signatures", () => {
    const sourceFile = parseSourceFile([
      "import ts = require(\"typescript\");",
      "interface Callable<T> {",
      "  (value: T): T;",
      "  <U>(value: T): U;",
      "}",
    ].join("\n"));

    assert.equal(isImportEqualsDeclaration(sourceFile.statements[0]!), true);
    assert.equal(isInterfaceDeclaration(sourceFile.statements[1]!), true);
    if (!isInterfaceDeclaration(sourceFile.statements[1]!)) throw new Error("Expected interface");
    assert.equal(isCallSignatureDeclaration(sourceFile.statements[1]!.members[0]!), true);
    assert.equal(isCallSignatureDeclaration(sourceFile.statements[1]!.members[1]!), true);
  });

  it("parses empty statements inside blocks without corrupting following expressions", () => {
    const sourceFile = parseSourceFile("function f() { ;(() => value)(); }");
    const statement = sourceFile.statements[0]!;

    assert.equal(isFunctionDeclaration(statement), true);
    if (!isFunctionDeclaration(statement)) throw new Error("Expected function");
    assert.equal(isEmptyStatement(statement.body!.statements[0]!), true);
    assert.equal(isExpressionStatement(statement.body!.statements[1]!), true);
  });

  it("parses assignment-position arrows, generic arrows, type assertions, and class expressions", () => {
    const sourceFile = parseSourceFile([
      "host.createProgram = (rootNames: ReadonlyArray<string> | undefined, options) => options;",
      "const fn = <K extends T>(): K => <K>value;",
      "const klass = class Box { static #foo = 1; [key] = value; };",
    ].join("\n"));
    const assignedArrow = sourceFile.statements[0]!;
    const genericArrow = sourceFile.statements[1]!;
    const classExpression = sourceFile.statements[2]!;

    assert.equal(isExpressionStatement(assignedArrow), true);
    if (!isExpressionStatement(assignedArrow) || !isBinaryExpression(assignedArrow.expression)) throw new Error("Expected assignment expression");
    assert.equal(isArrowFunction(assignedArrow.expression.right), true);

    assert.equal(isVariableStatement(genericArrow), true);
    if (!isVariableStatement(genericArrow)) throw new Error("Expected generic arrow variable");
    const initializer = genericArrow.declarationList.declarations[0]!.initializer;
    assert.equal(isArrowFunction(initializer!), true);
    if (!isArrowFunction(initializer!)) throw new Error("Expected generic arrow");
    assert.equal(initializer.typeParameters?.[0]?.name.text, "K");
    assert.equal(isTypeAssertion(initializer.body), true);

    assert.equal(isVariableStatement(classExpression), true);
    if (!isVariableStatement(classExpression)) throw new Error("Expected class expression variable");
    const classInitializer = classExpression.declarationList.declarations[0]!.initializer;
    assert.equal(isClassExpression(classInitializer!), true);
    if (!isClassExpression(classInitializer!)) throw new Error("Expected class expression");
    assert.equal(classInitializer.members.length, 2);
    assert.equal(isPropertyDeclaration(classInitializer.members[0]!), true);
    if (!isPropertyDeclaration(classInitializer.members[0]!)) throw new Error("Expected private property");
    assert.equal(isPrivateIdentifier(classInitializer.members[0]!.name), true);
  });

  it("parses type literal index signatures", () => {
    const sourceFile = parseSourceFile("type Dict = { description?: string, [key: string]: string | undefined };");
    const statement = sourceFile.statements[0]!;

    assert.equal(isTypeAliasDeclaration(statement), true);
    if (!isTypeAliasDeclaration(statement) || !isTypeLiteralNode(statement.type)) throw new Error("Expected type literal alias");
    assert.equal(isPropertySignatureDeclaration(statement.type.members[0]!), true);
    assert.equal(isIndexSignatureDeclaration(statement.type.members[1]!), true);
    if (!isIndexSignatureDeclaration(statement.type.members[1]!)) throw new Error("Expected index signature");
    assert.equal(statement.type.members[1]!.parameters[0]!.name.kind, Kind.Identifier);
    assert.equal(statement.type.members[1]!.parameters[0]!.type?.kind, Kind.StringKeyword);
  });

  it("parses ambient declarations, module blocks, const type parameters, and destructuring assignment defaults", () => {
    const sourceFile = parseSourceFile([
      "export function foo();",
      "declare global { var expectedCondition: \"import\"; }",
      "declare module \"knex\" { namespace Knex { function newFunc(): Interface; } }",
      "export = knex;",
      "declare function make<const T extends { value: unknown }>(arg: T): T;",
      "class Box<T,> { value?: T; }",
      "({ x = class { static #z = 2; } } = {} as any);",
    ].join("\n"));

    assert.equal(isFunctionDeclaration(sourceFile.statements[0]!), true);
    if (!isFunctionDeclaration(sourceFile.statements[0]!)) throw new Error("Expected ambient function");
    assert.equal(sourceFile.statements[0]!.body, undefined);

    assert.equal(isModuleDeclaration(sourceFile.statements[1]!), true);
    assert.equal(isModuleDeclaration(sourceFile.statements[2]!), true);
    assert.equal(isExportAssignment(sourceFile.statements[3]!), true);

    assert.equal(isFunctionDeclaration(sourceFile.statements[4]!), true);
    if (!isFunctionDeclaration(sourceFile.statements[4]!)) throw new Error("Expected const generic function");
    assert.equal(sourceFile.statements[4]!.typeParameters?.[0]?.modifiers?.[0]?.kind, Kind.ConstKeyword);

    assert.equal(isClassDeclaration(sourceFile.statements[5]!), true);
    if (!isClassDeclaration(sourceFile.statements[5]!)) throw new Error("Expected class declaration");
    assert.equal(sourceFile.statements[5]!.typeParameters?.[0]?.name.text, "T");

    assert.equal(isExpressionStatement(sourceFile.statements[6]!), true);
    if (!isExpressionStatement(sourceFile.statements[6]!) || !isParenthesizedExpression(sourceFile.statements[6]!.expression)) throw new Error("Expected parenthesized assignment");
    const assignment = sourceFile.statements[6]!.expression.expression;
    assert.equal(isBinaryExpression(assignment), true);
    if (!isBinaryExpression(assignment) || !isObjectLiteralExpression(assignment.left)) throw new Error("Expected object literal assignment");
    const firstProperty = assignment.left.properties[0]!;
    assert.equal(isShorthandPropertyAssignment(firstProperty), true);
    if (!isShorthandPropertyAssignment(firstProperty)) throw new Error("Expected shorthand assignment");
    assert.equal(isClassExpression(firstProperty.objectAssignmentInitializer!), true);
  });

  it("preserves parameter property modifiers for checker diagnostics", () => {
    const sourceFile = parseSourceFile("const f = (public value: string) => value;");
    const statement = sourceFile.statements[0]!;

    assert.equal(isVariableStatement(statement), true);
    if (!isVariableStatement(statement)) throw new Error("Expected variable statement");
    const initializer = statement.declarationList.declarations[0]!.initializer;
    assert.equal(isArrowFunction(initializer!), true);
    if (!isArrowFunction(initializer!)) throw new Error("Expected arrow function");
    assert.equal(initializer.parameters[0]!.modifiers?.[0]?.kind, Kind.PublicKeyword);
  });
});
