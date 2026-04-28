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
  isClassStaticBlockDeclaration,
  isConstructorDeclaration,
  isContinueStatement,
  isConditionalTypeNode,
  isConditionalExpression,
  isConstructSignatureDeclaration,
  isElementAccessExpression,
  isEmptyStatement,
  isEnumDeclaration,
  isExportAssignment,
  isExpressionStatement,
  isExpressionWithTypeArguments,
  isDebuggerStatement,
  isDecorator,
  isForInStatement,
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
  isLabeledStatement,
  isMappedTypeNode,
  isMethodDeclaration,
  isMethodSignatureDeclaration,
  isModuleBlock,
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
  isPropertyAssignment,
  isPropertyDeclaration,
  isPropertyAccessExpression,
  isPropertySignatureDeclaration,
  isReturnStatement,
  isRestTypeNode,
  isSetAccessorDeclaration,
  isShorthandPropertyAssignment,
  isSatisfiesExpression,
  isStringLiteral,
  isTaggedTemplateExpression,
  isTemplateLiteralTypeNode,
  isTypeAliasDeclaration,
  isTypeAssertion,
  isTypeLiteralNode,
  isTupleTypeNode,
  isTryStatement,
  isTypeReferenceNode,
  isTypePredicateNode,
  isVariableStatement,
  isWithStatement,
  isWhileStatement,
  isArrayBindingPattern,
  isAwaitExpression,
  isYieldExpression,
  isKeywordExpression,
  isMetaProperty,
  isNamedTupleMember,
  isOptionalTypeNode,
} from "../../src/ast/index.js";
import { parseSourceFile, parseSourceFileWithDiagnostics } from "../../src/parser/index.js";

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

  it("parses assignment and exponentiation operators as right-associative", () => {
    const sourceFile = parseSourceFile("a = b = c; x ** y ** z;");

    const assignmentStatement = sourceFile.statements[0]!;
    if (!isExpressionStatement(assignmentStatement) || !isBinaryExpression(assignmentStatement.expression)) {
      throw new Error("Expected assignment expression statement");
    }
    assert.equal(assignmentStatement.expression.operatorToken.kind, Kind.EqualsToken);
    assert.equal(isIdentifier(assignmentStatement.expression.left), true);
    assert.equal(isBinaryExpression(assignmentStatement.expression.right), true);
    if (!isBinaryExpression(assignmentStatement.expression.right)) throw new Error("unreachable");
    assert.equal(assignmentStatement.expression.right.operatorToken.kind, Kind.EqualsToken);

    const exponentStatement = sourceFile.statements[1]!;
    if (!isExpressionStatement(exponentStatement) || !isBinaryExpression(exponentStatement.expression)) {
      throw new Error("Expected exponentiation expression statement");
    }
    assert.equal(exponentStatement.expression.operatorToken.kind, Kind.AsteriskAsteriskToken);
    assert.equal(isIdentifier(exponentStatement.expression.left), true);
    assert.equal(isBinaryExpression(exponentStatement.expression.right), true);
    if (!isBinaryExpression(exponentStatement.expression.right)) throw new Error("unreachable");
    assert.equal(exponentStatement.expression.right.operatorToken.kind, Kind.AsteriskAsteriskToken);
  });

  it("parses assertions and satisfies with relational precedence", () => {
    const sourceFile = parseSourceFile([
      "state as any && state;",
      "total + delta as number;",
      "value satisfies Shape || fallback;",
    ].join("\n"));

    const assertionAnd = sourceFile.statements[0]!;
    if (!isExpressionStatement(assertionAnd) || !isBinaryExpression(assertionAnd.expression)) {
      throw new Error("Expected assertion logical expression");
    }
    assert.equal(assertionAnd.expression.operatorToken.kind, Kind.AmpersandAmpersandToken);
    assert.equal(isAsExpression(assertionAnd.expression.left), true);

    const additiveAssertion = sourceFile.statements[1]!;
    if (!isExpressionStatement(additiveAssertion) || !isAsExpression(additiveAssertion.expression)) {
      throw new Error("Expected additive assertion expression");
    }
    assert.equal(isBinaryExpression(additiveAssertion.expression.expression), true);
    if (!isBinaryExpression(additiveAssertion.expression.expression)) throw new Error("Expected additive expression under assertion");
    assert.equal(additiveAssertion.expression.expression.operatorToken.kind, Kind.PlusToken);

    const satisfiesOr = sourceFile.statements[2]!;
    if (!isExpressionStatement(satisfiesOr) || !isBinaryExpression(satisfiesOr.expression)) {
      throw new Error("Expected satisfies logical expression");
    }
    assert.equal(satisfiesOr.expression.operatorToken.kind, Kind.BarBarToken);
    assert.equal(isSatisfiesExpression(satisfiesOr.expression.left), true);
  });

  it("parses comma expressions only in expression grammar contexts", () => {
    const sourceFile = parseSourceFile([
      "a, b, c;",
      "let x = 1, y = 2;",
      "call(a, b);",
      "const computed = obj[a, b];",
    ].join("\n"));

    const commaStatement = sourceFile.statements[0]!;
    if (!isExpressionStatement(commaStatement) || !isBinaryExpression(commaStatement.expression)) {
      throw new Error("Expected comma expression statement");
    }
    assert.equal(commaStatement.expression.operatorToken.kind, Kind.CommaToken);
    assert.equal(isBinaryExpression(commaStatement.expression.left), true);
    assert.equal(isIdentifier(commaStatement.expression.right), true);

    const variableStatement = sourceFile.statements[1]!;
    if (!isVariableStatement(variableStatement)) throw new Error("Expected variable statement");
    assert.equal(variableStatement.declarationList.declarations.length, 2);
    assert.equal(isNumericLiteral(variableStatement.declarationList.declarations[0]!.initializer!), true);
    assert.equal(isNumericLiteral(variableStatement.declarationList.declarations[1]!.initializer!), true);

    const callStatement = sourceFile.statements[2]!;
    if (!isExpressionStatement(callStatement) || !isCallExpression(callStatement.expression)) {
      throw new Error("Expected call expression statement");
    }
    assert.equal(callStatement.expression.arguments.length, 2);

    const computedStatement = sourceFile.statements[3]!;
    if (!isVariableStatement(computedStatement)) throw new Error("Expected computed access variable");
    const computedInitializer = computedStatement.declarationList.declarations[0]!.initializer;
    if (!isElementAccessExpression(computedInitializer!)) throw new Error("Expected element access expression");
    assert.equal(isBinaryExpression(computedInitializer.argumentExpression), true);
    if (!isBinaryExpression(computedInitializer.argumentExpression)) throw new Error("Expected comma element access argument");
    assert.equal(computedInitializer.argumentExpression.operatorToken.kind, Kind.CommaToken);
  });

  it("keeps deeply parenthesized assignment expressions out of arrow-head speculation", () => {
    let expression = "x";
    for (let index = 0; index < 120; index += 1) {
      expression = `(x = ${expression} + ${index} | 0)`;
    }

    const sourceFile = parseSourceFile(`function f() { ${expression}; }`);
    const statement = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(statement) || statement.body === undefined) {
      throw new Error("Expected parsed function declaration");
    }
    assert.equal(statement.body.statements.length, 1);
    assert.equal(isExpressionStatement(statement.body.statements[0]!), true);
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
    const sourceFile = parseSourceFile("export const answer: number = 42; let assigned!: string;");
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

    const definiteAssignmentStatement = sourceFile.statements[1]!;
    assert.equal(isVariableStatement(definiteAssignmentStatement), true);
    if (!isVariableStatement(definiteAssignmentStatement)) throw new Error("Expected definite assignment variable statement");
    assert.equal(definiteAssignmentStatement.declarationList.flags, NodeFlags.Let);
    assert.equal(definiteAssignmentStatement.declarationList.declarations[0]!.exclamationToken?.kind, Kind.ExclamationToken);
    assert.equal(definiteAssignmentStatement.declarationList.declarations[0]!.type?.kind, Kind.StringKeyword);
  });

  it("uses TS-Go let-declaration lookahead instead of treating every let token as a declaration", () => {
    const sourceFile = parseSourceFile("let = 30; let\na; for (let = 0; let < 1; let++) { }");

    const assignmentStatement = sourceFile.statements[0]!;
    assert.equal(isExpressionStatement(assignmentStatement), true);
    if (!isExpressionStatement(assignmentStatement) || !isBinaryExpression(assignmentStatement.expression)) throw new Error("Expected let assignment expression statement");
    assert.equal(isIdentifier(assignmentStatement.expression.left), true);
    assert.equal(assignmentStatement.expression.operatorToken.kind, Kind.EqualsToken);

    const declarationStatement = sourceFile.statements[1]!;
    assert.equal(isVariableStatement(declarationStatement), true);
    if (!isVariableStatement(declarationStatement)) throw new Error("Expected let declaration after line-break-insensitive lookahead");
    assert.equal(declarationStatement.declarationList.flags, NodeFlags.Let);
    assert.equal((declarationStatement.declarationList.declarations[0]!.name as { readonly text?: string }).text, "a");

    const forStatement = sourceFile.statements[2]!;
    assert.equal(isForStatement(forStatement), true);
    if (!isForStatement(forStatement)) throw new Error("Expected for statement");
    assert.equal(isBinaryExpression(forStatement.initializer!), true);
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

  it("parses default export assignments and declarations", () => {
    const sourceFile = parseSourceFile("export default value; export default interface Shape { value: string; }");
    const assignment = sourceFile.statements[0]!;
    const declaration = sourceFile.statements[1]!;

    assert.equal(isExportAssignment(assignment), true);
    if (!isExportAssignment(assignment)) throw new Error("Expected export assignment");
    assert.equal(assignment.isExportEquals, false);
    assert.equal(assignment.modifiers?.[0]?.kind, Kind.ExportKeyword);
    assert.equal(assignment.modifiers?.[1]?.kind, Kind.DefaultKeyword);

    assert.equal(isInterfaceDeclaration(declaration), true);
    if (!isInterfaceDeclaration(declaration)) throw new Error("Expected default interface declaration");
    assert.equal(declaration.modifiers?.[0]?.kind, Kind.ExportKeyword);
    assert.equal(declaration.modifiers?.[1]?.kind, Kind.DefaultKeyword);
  });

  it("parses TS-Go decorator modifier nodes on declarations, members, parameters, and object elements", () => {
    const sourceFile = parseSourceFile([
      "@sealed export default class C {",
      "  @field accessor value: string;",
      "  @logged method(@arg input: string) { }",
      "}",
      "const ExpressionClass = @sealed class { };",
      "const obj = { @logged method() { }, @field get value() { return 1; } };",
    ].join("\n"));

    const classDeclaration = sourceFile.statements[0]!;
    assert.equal(isClassDeclaration(classDeclaration), true);
    if (!isClassDeclaration(classDeclaration)) throw new Error("Expected decorated class declaration");
    assert.equal(isDecorator(classDeclaration.modifiers?.[0]!), true);
    assert.equal(classDeclaration.modifiers?.[1]?.kind, Kind.ExportKeyword);
    assert.equal(classDeclaration.modifiers?.[2]?.kind, Kind.DefaultKeyword);

    const property = classDeclaration.members[0]!;
    assert.equal(isPropertyDeclaration(property), true);
    if (!isPropertyDeclaration(property)) throw new Error("Expected decorated class property");
    assert.equal(isDecorator(property.modifiers?.[0]!), true);
    assert.equal(property.modifiers?.[1]?.kind, Kind.AccessorKeyword);

    const method = classDeclaration.members[1]!;
    assert.equal(isMethodDeclaration(method), true);
    if (!isMethodDeclaration(method)) throw new Error("Expected decorated class method");
    assert.equal(isDecorator(method.modifiers?.[0]!), true);
    assert.equal(isDecorator(method.parameters[0]!.modifiers?.[0]!), true);

    const classExpressionStatement = sourceFile.statements[1]!;
    if (!isVariableStatement(classExpressionStatement)) throw new Error("Expected class expression variable");
    const classExpression = classExpressionStatement.declarationList.declarations[0]!.initializer;
    assert.equal(isClassExpression(classExpression!), true);
    if (!isClassExpression(classExpression!)) throw new Error("Expected decorated class expression");
    assert.equal(isDecorator(classExpression.modifiers?.[0]!), true);

    const objectStatement = sourceFile.statements[2]!;
    if (!isVariableStatement(objectStatement)) throw new Error("Expected object variable");
    const objectExpression = objectStatement.declarationList.declarations[0]!.initializer;
    assert.equal(isObjectLiteralExpression(objectExpression!), true);
    if (!isObjectLiteralExpression(objectExpression!)) throw new Error("Expected object expression");
    assert.equal(isMethodDeclaration(objectExpression.properties[0]!), true);
    const objectMethod = objectExpression.properties[0]!;
    if (!isMethodDeclaration(objectMethod)) throw new Error("Expected decorated object method");
    assert.equal(isDecorator(objectMethod.modifiers?.[0]!), true);
    assert.equal(isGetAccessorDeclaration(objectExpression.properties[1]!), true);
    const objectAccessor = objectExpression.properties[1]!;
    if (!isGetAccessorDeclaration(objectAccessor)) throw new Error("Expected decorated object accessor");
    assert.equal(isDecorator(objectAccessor.modifiers?.[0]!), true);
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

  it("recovers empty element access with TS-Go diagnostics", () => {
    const result = parseSourceFileWithDiagnostics("number[]; new Z[];");

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1011, 1011]);
    const accessStatement = result.sourceFile.statements[0]!;
    assert.equal(isExpressionStatement(accessStatement), true);
    if (!isExpressionStatement(accessStatement) || !isElementAccessExpression(accessStatement.expression)) {
      throw new Error("Expected empty element access expression");
    }
    const accessArgument = accessStatement.expression.argumentExpression;
    assert.equal(isIdentifier(accessArgument), true);
    if (!isIdentifier(accessArgument)) throw new Error("Expected synthetic missing element-access argument");
    assert.equal(accessArgument.text, "");

    const newStatement = result.sourceFile.statements[1]!;
    assert.equal(isExpressionStatement(newStatement), true);
    if (!isExpressionStatement(newStatement) || !isNewExpression(newStatement.expression)) {
      throw new Error("Expected new expression with empty element access target");
    }
    assert.equal(isElementAccessExpression(newStatement.expression.expression), true);
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

  it("parses mapped types with TS-Go modifier and type-parameter structure", () => {
    const sourceFile = parseSourceFile("type Box<T> = { readonly [P in keyof T]?: T[P]; };");
    const statement = sourceFile.statements[0]!;

    assert.equal(isTypeAliasDeclaration(statement), true);
    if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias");
    assert.equal(isMappedTypeNode(statement.type), true);
    if (!isMappedTypeNode(statement.type)) throw new Error("Expected mapped type");
    assert.equal(statement.type.readonlyToken?.kind, Kind.ReadonlyKeyword);
    assert.equal(statement.type.typeParameter.name.text, "P");
    assert.equal(statement.type.typeParameter.constraint?.kind, Kind.TypeOperator);
    assert.equal(statement.type.questionToken?.kind, Kind.QuestionToken);
    assert.equal(statement.type.type?.kind, Kind.IndexedAccessType);
  });

  it("parses tuple rest elements and infer conditional types", () => {
    const sourceFile = parseSourceFile("type Logic<T> = [\"and\", ...T[]] | (T extends ReadonlyArray<infer U> ? U : T);");
    const statement = sourceFile.statements[0]!;

    assert.equal(isTypeAliasDeclaration(statement), true);
    if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias");
    assert.equal(statement.type.kind, Kind.UnionType);
    if (statement.type.kind !== Kind.UnionType) throw new Error("Expected union type");
    const tuple = statement.type.types[0]!;
    assert.equal(isTupleTypeNode(tuple), true);
    if (!isTupleTypeNode(tuple)) throw new Error("Expected tuple type");
    assert.equal(isRestTypeNode(tuple.elements[1]!), true);
    const conditionalWrapper = statement.type.types[1]!;
    assert.equal(conditionalWrapper.kind, Kind.ParenthesizedType);
    if (conditionalWrapper.kind !== Kind.ParenthesizedType) throw new Error("Expected parenthesized conditional type");
    const conditional = conditionalWrapper.type;
    assert.equal(isConditionalTypeNode(conditional), true);
    if (!isConditionalTypeNode(conditional)) throw new Error("Expected conditional type");
    assert.equal(conditional.extendsType.kind, Kind.TypeReference);
  });

  it("parses TS-Go named and optional tuple elements", () => {
    const sourceFile = parseSourceFile("type T = [first: string, second?: number, ...rest: boolean[], Date?];");
    const statement = sourceFile.statements[0]!;

    assert.equal(isTypeAliasDeclaration(statement), true);
    if (!isTypeAliasDeclaration(statement)) throw new Error("Expected type alias");
    assert.equal(isTupleTypeNode(statement.type), true);
    if (!isTupleTypeNode(statement.type)) throw new Error("Expected tuple type");

    const first = statement.type.elements[0]!;
    assert.equal(isNamedTupleMember(first), true);
    if (!isNamedTupleMember(first)) throw new Error("Expected first named tuple member");
    assert.equal(first.name.text, "first");
    assert.equal(first.questionToken, undefined);
    assert.equal(first.type.kind, Kind.StringKeyword);

    const second = statement.type.elements[1]!;
    assert.equal(isNamedTupleMember(second), true);
    if (!isNamedTupleMember(second)) throw new Error("Expected optional named tuple member");
    assert.equal(second.name.text, "second");
    assert.equal(second.questionToken?.kind, Kind.QuestionToken);
    assert.equal(second.type.kind, Kind.NumberKeyword);

    const rest = statement.type.elements[2]!;
    assert.equal(isNamedTupleMember(rest), true);
    if (!isNamedTupleMember(rest)) throw new Error("Expected named rest tuple member");
    assert.equal(rest.dotDotDotToken?.kind, Kind.DotDotDotToken);
    assert.equal(rest.name.text, "rest");

    const optional = statement.type.elements[3]!;
    assert.equal(isOptionalTypeNode(optional), true);
    if (!isOptionalTypeNode(optional)) throw new Error("Expected optional tuple element");
    assert.equal(optional.type.kind, Kind.TypeReference);
  });

  it("parses template literal types with TS-Go span structure", () => {
    const sourceFile = parseSourceFile([
      "type Simple = `plain`;",
      "type Branded<T> = T extends `${'a' & { a: 1 }}-${number}` ? 1 : 2;",
    ].join("\n"));

    const simple = sourceFile.statements[0]!;
    assert.equal(isTypeAliasDeclaration(simple), true);
    if (!isTypeAliasDeclaration(simple)) throw new Error("Expected simple template literal type alias");
    assert.equal(simple.type.kind, Kind.LiteralType);

    const branded = sourceFile.statements[1]!;
    assert.equal(isTypeAliasDeclaration(branded), true);
    if (!isTypeAliasDeclaration(branded)) throw new Error("Expected branded template literal type alias");
    assert.equal(isConditionalTypeNode(branded.type), true);
    if (!isConditionalTypeNode(branded.type)) throw new Error("Expected conditional template literal type");
    assert.equal(isTemplateLiteralTypeNode(branded.type.extendsType), true);
    if (!isTemplateLiteralTypeNode(branded.type.extendsType)) throw new Error("Expected template literal extends type");
    assert.equal(branded.type.extendsType.head.text, "");
    assert.equal(branded.type.extendsType.templateSpans.length, 2);
    assert.equal(branded.type.extendsType.templateSpans[0]!.type.kind, Kind.IntersectionType);
    assert.equal(branded.type.extendsType.templateSpans[0]!.literal.kind, Kind.TemplateMiddle);
    assert.equal(branded.type.extendsType.templateSpans[0]!.literal.text, "-");
    assert.equal(branded.type.extendsType.templateSpans[1]!.type.kind, Kind.NumberKeyword);
    assert.equal(branded.type.extendsType.templateSpans[1]!.literal.kind, Kind.TemplateTail);
  });

  it("parses accessor declarations in class, object, and type-member contexts", () => {
    const sourceFile = parseSourceFile([
      "class C { get value(): string { return \"x\"; } set value(public next = \"x\"): number { } }",
      "class Auto { accessor value: string; accessor named = 1; accessor: number; }",
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

    const autoAccessorDeclaration = sourceFile.statements[1]!;
    assert.equal(isClassDeclaration(autoAccessorDeclaration), true);
    if (!isClassDeclaration(autoAccessorDeclaration)) throw new Error("Expected auto accessor class");
    assert.equal(autoAccessorDeclaration.members.length, 3);
    assert.equal(isPropertyDeclaration(autoAccessorDeclaration.members[0]!), true);
    const autoAccessorMember = autoAccessorDeclaration.members[0]!;
    if (!isPropertyDeclaration(autoAccessorMember)) throw new Error("Expected auto accessor property");
    assert.equal(autoAccessorMember.modifiers?.[0]?.kind, Kind.AccessorKeyword);
    assert.equal(isPropertyDeclaration(autoAccessorDeclaration.members[2]!), true);
    const contextualAccessorProperty = autoAccessorDeclaration.members[2]!;
    if (!isPropertyDeclaration(contextualAccessorProperty)) throw new Error("Expected contextual accessor property");
    assert.equal(contextualAccessorProperty.modifiers, undefined);

    const objectStatement = sourceFile.statements[2]!;
    if (!isVariableStatement(objectStatement)) throw new Error("Expected object variable");
    const objectInitializer = objectStatement.declarationList.declarations[0]!.initializer;
    assert.equal(isObjectLiteralExpression(objectInitializer!), true);
    if (!isObjectLiteralExpression(objectInitializer!)) throw new Error("Expected object literal");
    assert.equal(isGetAccessorDeclaration(objectInitializer.properties[0]!), true);
    assert.equal(isSetAccessorDeclaration(objectInitializer.properties[1]!), true);

    const typeAlias = sourceFile.statements[3]!;
    assert.equal(isTypeAliasDeclaration(typeAlias), true);
    if (!isTypeAliasDeclaration(typeAlias) || !isTypeLiteralNode(typeAlias.type)) throw new Error("Expected type literal");
    assert.equal(isGetAccessorDeclaration(typeAlias.type.members[0]!), true);
    assert.equal(isSetAccessorDeclaration(typeAlias.type.members[1]!), true);
  });

  it("produces interface declarations with heritage and method signatures", () => {
    const result = parseSourceFileWithDiagnostics("interface Named extends Base<string>, Other<number> { id: number; rename(value: string): void; } interface Wrapped<T> extends Base<Array<T>> { map<U>(value: U): Array<U>; }");
    assert.deepEqual(result.diagnostics, []);
    const sourceFile = result.sourceFile;
    const statement = sourceFile.statements[0]!;
    const nestedGeneric = sourceFile.statements[1]!;

    assert.equal(isInterfaceDeclaration(statement), true);
    if (!isInterfaceDeclaration(statement)) throw new Error("Expected interface");
    assert.equal(statement.name.text, "Named");
    assert.equal(statement.heritageClauses?.[0]?.token, Kind.ExtendsKeyword);
    assert.equal(statement.heritageClauses?.[0]?.types.length, 2);
    assert.equal(isExpressionWithTypeArguments(statement.heritageClauses![0]!.types[0]!.expression), false);
    assert.equal(statement.heritageClauses?.[0]?.types[0]?.typeArguments?.[0]?.kind, Kind.StringKeyword);
    assert.equal(statement.heritageClauses?.[0]?.types[1]?.typeArguments?.[0]?.kind, Kind.NumberKeyword);
    assert.equal(isPropertySignatureDeclaration(statement.members[0]!), true);
    assert.equal(isMethodSignatureDeclaration(statement.members[1]!), true);
    if (!isMethodSignatureDeclaration(statement.members[1]!)) throw new Error("Expected method signature");
    assert.equal(statement.members[1]!.parameters[0]?.name.kind, Kind.Identifier);
    assert.equal(statement.members[1]!.type?.kind, Kind.VoidKeyword);
    assert.equal(isInterfaceDeclaration(nestedGeneric), true);
    if (!isInterfaceDeclaration(nestedGeneric)) throw new Error("Expected nested generic interface");
    assert.equal(nestedGeneric.heritageClauses?.[0]?.types[0]?.typeArguments?.[0]?.kind, Kind.TypeReference);
    assert.equal(isMethodSignatureDeclaration(nestedGeneric.members[0]!), true);
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

  it("parses async generic arrows, async generators, yield, and for-await statements", () => {
    const result = parseSourceFileWithDiagnostics([
      "const fn = () => ({",
      "  test: async <T = undefined>(value: T): Promise<T> => value,",
      "  extraValue: () => {},",
      "});",
      "async function * asyncGen(n) { yield n; }",
      "for await (const value of asyncGen(1)) { value; }",
    ].join("\n"));

    assert.deepEqual(result.diagnostics, []);
    const fnStatement = result.sourceFile.statements[0]!;
    if (!isVariableStatement(fnStatement) || !isArrowFunction(fnStatement.declarationList.declarations[0]!.initializer!)) throw new Error("Expected arrow function variable");
    const objectBody = fnStatement.declarationList.declarations[0]!.initializer.body;
    if (!isParenthesizedExpression(objectBody) || !isObjectLiteralExpression(objectBody.expression)) throw new Error("Expected parenthesized object literal arrow body");
    const testProperty = objectBody.expression.properties[0]!;
    if (!isPropertyAssignment(testProperty) || !isArrowFunction(testProperty.initializer)) throw new Error("Expected async arrow property initializer");
    assert.equal(testProperty.initializer.modifiers?.[0]?.kind, Kind.AsyncKeyword);
    assert.equal(testProperty.initializer.typeParameters?.[0]?.name.text, "T");

    const generator = result.sourceFile.statements[1]!;
    if (!isFunctionDeclaration(generator) || generator.body === undefined) throw new Error("Expected async generator declaration");
    assert.equal(generator.modifiers?.[0]?.kind, Kind.AsyncKeyword);
    assert.equal(generator.asteriskToken?.kind, Kind.AsteriskToken);
    const yieldStatement = generator.body.statements[0]!;
    if (!isExpressionStatement(yieldStatement)) throw new Error("Expected yield expression statement");
    assert.equal(isYieldExpression(yieldStatement.expression), true);

    const forAwait = result.sourceFile.statements[2]!;
    if (!isForOfStatement(forAwait)) throw new Error("Expected for-await statement");
    assert.equal(forAwait.awaitModifier?.kind, Kind.AwaitKeyword);
  });

  it("parses statement-start dynamic import as an expression", () => {
    const result = parseSourceFileWithDiagnostics([
      "async function* foo() {",
      "  import((await import(yield \"foo\")).default);",
      "  import.meta;",
      "}",
    ].join("\n"));

    assert.deepEqual(result.diagnostics, []);
    const declaration = result.sourceFile.statements[0]!;
    assert.equal(isFunctionDeclaration(declaration), true);
    if (!isFunctionDeclaration(declaration) || declaration.body === undefined) throw new Error("Expected async generator declaration");

    const importStatement = declaration.body.statements[0]!;
    assert.equal(isExpressionStatement(importStatement), true);
    if (!isExpressionStatement(importStatement) || !isCallExpression(importStatement.expression)) {
      throw new Error("Expected dynamic import call expression");
    }
    assert.equal(isKeywordExpression(importStatement.expression.expression), true);
    assert.equal(importStatement.expression.expression.kind, Kind.ImportKeyword);

    const argument = importStatement.expression.arguments[0]!;
    assert.equal(isPropertyAccessExpression(argument), true);
    if (!isPropertyAccessExpression(argument) || !isParenthesizedExpression(argument.expression)) {
      throw new Error("Expected property access over awaited dynamic import");
    }
    const awaitedImport = argument.expression.expression;
    assert.equal(isAwaitExpression(awaitedImport), true);
    if (!isAwaitExpression(awaitedImport)) {
      throw new Error("Expected awaited dynamic import argument");
    }

    const metaStatement = declaration.body.statements[1]!;
    assert.equal(isExpressionStatement(metaStatement), true);
    if (!isExpressionStatement(metaStatement)) throw new Error("Expected import.meta statement");
    assert.equal(isMetaProperty(metaStatement.expression), true);
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
      "export const enum Kind { Unknown = 0, Identifier }",
      "class Box { #value: number = 1; getValue(): number { return this.#value; } }",
      "function isBox(value: unknown): value is Box { return value instanceof Box; }",
    ].join("\n"));
    const enumDeclaration = sourceFile.statements[0]!;
    const classDeclaration = sourceFile.statements[1]!;
    const predicateFunction = sourceFile.statements[2]!;

    assert.equal(isEnumDeclaration(enumDeclaration), true);
    if (!isEnumDeclaration(enumDeclaration)) throw new Error("Expected enum declaration");
    assert.equal(enumDeclaration.modifiers?.[0]?.kind, Kind.ExportKeyword);
    assert.equal(enumDeclaration.modifiers?.[1]?.kind, Kind.ConstKeyword);
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

  it("recovers catch clause initializers without corrupting the catch body", () => {
    const result = parseSourceFileWithDiagnostics("try {\n}\ncatch (e = 1) {\n  e;\n}");

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1197]);
    const statement = result.sourceFile.statements[0]!;
    assert.equal(isTryStatement(statement), true);
    if (!isTryStatement(statement)) throw new Error("Expected try statement");
    assert.equal(statement.catchClause?.variableDeclaration?.name.kind, Kind.Identifier);
    assert.equal(isNumericLiteral(statement.catchClause?.variableDeclaration?.initializer!), true);
    assert.equal(statement.catchClause?.block.statements.length, 1);
  });

  it("parses import equals declarations and type-literal call signatures", () => {
    const sourceFile = parseSourceFile([
      "import ts = require(\"typescript\");",
      "interface Callable<T> {",
      "  (value: T): T;",
      "  <U>(value: T): U;",
      "  new (...args: any[]): T;",
      "  new <U>(value: T): U;",
      "}",
    ].join("\n"));

    assert.equal(isImportEqualsDeclaration(sourceFile.statements[0]!), true);
    assert.equal(isInterfaceDeclaration(sourceFile.statements[1]!), true);
    if (!isInterfaceDeclaration(sourceFile.statements[1]!)) throw new Error("Expected interface");
    assert.equal(isCallSignatureDeclaration(sourceFile.statements[1]!.members[0]!), true);
    assert.equal(isCallSignatureDeclaration(sourceFile.statements[1]!.members[1]!), true);
    assert.equal(isConstructSignatureDeclaration(sourceFile.statements[1]!.members[2]!), true);
    assert.equal(isConstructSignatureDeclaration(sourceFile.statements[1]!.members[3]!), true);
  });

  it("parses class heritage clauses using TS-Go left-hand-side expressions", () => {
    const sourceFile = parseSourceFile([
      "class Derived extends mixin(Base) implements Named<string> {",
      "}",
      "const DerivedExpression = class extends factory.create(Base) {",
      "};",
    ].join("\n"));

    const classDeclaration = sourceFile.statements[0]!;
    if (!isClassDeclaration(classDeclaration)) throw new Error("Expected class declaration");
    assert.equal(classDeclaration.heritageClauses?.[0]?.token, Kind.ExtendsKeyword);
    assert.equal(isCallExpression(classDeclaration.heritageClauses?.[0]?.types[0]?.expression!), true);
    assert.equal(classDeclaration.heritageClauses?.[1]?.token, Kind.ImplementsKeyword);
    assert.equal(classDeclaration.heritageClauses?.[1]?.types[0]?.typeArguments?.[0]?.kind, Kind.StringKeyword);

    const classExpressionStatement = sourceFile.statements[1]!;
    if (!isVariableStatement(classExpressionStatement)) throw new Error("Expected variable statement");
    const initializer = classExpressionStatement.declarationList.declarations[0]?.initializer;
    if (!isClassExpression(initializer!)) throw new Error("Expected class expression");
    assert.equal(isCallExpression(initializer.heritageClauses?.[0]?.types[0]?.expression!), true);
  });

  it("recovers trailing separators in class heritage clauses without corrupting class bodies", () => {
    const result = parseSourceFileWithDiagnostics("class Base { value: number } class Derived extends Base, { item: string }");

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1009]);
    const derived = result.sourceFile.statements[1]!;
    assert.equal(isClassDeclaration(derived), true);
    if (!isClassDeclaration(derived)) throw new Error("Expected recovered class declaration");
    assert.equal(derived.heritageClauses?.[0]?.types.length, 1);
    assert.equal(derived.members.length, 1);
    assert.equal(isPropertyDeclaration(derived.members[0]!), true);
  });

  it("keeps contextual module names as expressions when declaration lookahead fails", () => {
    const sourceFile = parseSourceFile("module.exports = value;");
    const statement = sourceFile.statements[0]!;

    assert.equal(isExpressionStatement(statement), true);
    if (!isExpressionStatement(statement)) throw new Error("Expected expression statement");
    assert.equal(isBinaryExpression(statement.expression), true);
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

  it("parses class index signatures without consuming following members", () => {
    const sourceFile = parseSourceFile("class N { [idx: string]: Shape; x: Shape; }");
    const statement = sourceFile.statements[0]!;

    assert.equal(isClassDeclaration(statement), true);
    if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
    assert.equal(isIndexSignatureDeclaration(statement.members[0]!), true);
    assert.equal(isPropertyDeclaration(statement.members[1]!), true);
  });

  it("distinguishes index signatures from computed properties in member lists", () => {
    const sourceFile = parseSourceFile([
      "type T = { [x]: string; [key: string]: string; [...rest]: string; };",
      "class C { [x]: string; [key: string]: string; [...rest]: string; }",
    ].join("\n"));
    const typeStatement = sourceFile.statements[0]!;
    const classStatement = sourceFile.statements[1]!;

    assert.equal(isTypeAliasDeclaration(typeStatement), true);
    if (!isTypeAliasDeclaration(typeStatement) || !isTypeLiteralNode(typeStatement.type)) throw new Error("Expected type literal");
    assert.equal(isPropertySignatureDeclaration(typeStatement.type.members[0]!), true);
    assert.equal(isIndexSignatureDeclaration(typeStatement.type.members[1]!), true);
    assert.equal(isIndexSignatureDeclaration(typeStatement.type.members[2]!), true);
    if (!isIndexSignatureDeclaration(typeStatement.type.members[2]!)) throw new Error("Expected rest index signature");
    assert.equal(typeStatement.type.members[2]!.parameters[0]!.dotDotDotToken?.kind, Kind.DotDotDotToken);

    assert.equal(isClassDeclaration(classStatement), true);
    if (!isClassDeclaration(classStatement)) throw new Error("Expected class");
    assert.equal(isPropertyDeclaration(classStatement.members[0]!), true);
    assert.equal(isIndexSignatureDeclaration(classStatement.members[1]!), true);
    assert.equal(isIndexSignatureDeclaration(classStatement.members[2]!), true);
  });

  it("reports missing index-signature value types while preserving AST shape", () => {
    const result = parseSourceFileWithDiagnostics("type T = { [key: string]; }; class C { [idx: number]; }");

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1021, 1021]);
    const typeStatement = result.sourceFile.statements[0]!;
    const classStatement = result.sourceFile.statements[1]!;
    assert.equal(isTypeAliasDeclaration(typeStatement), true);
    if (!isTypeAliasDeclaration(typeStatement) || !isTypeLiteralNode(typeStatement.type)) throw new Error("Expected type literal");
    assert.equal(isIndexSignatureDeclaration(typeStatement.type.members[0]!), true);
    assert.equal(isClassDeclaration(classStatement), true);
    if (!isClassDeclaration(classStatement)) throw new Error("Expected class");
    assert.equal(isIndexSignatureDeclaration(classStatement.members[0]!), true);
  });

  it("parses class static blocks as TS-Go class elements", () => {
    const sourceFile = parseSourceFile("class C { static { value = 1; } static field = 2; }");
    const statement = sourceFile.statements[0]!;

    assert.equal(isClassDeclaration(statement), true);
    if (!isClassDeclaration(statement)) throw new Error("Expected class declaration");
    assert.equal(isClassStaticBlockDeclaration(statement.members[0]!), true);
    assert.equal(isPropertyDeclaration(statement.members[1]!), true);
    if (!isPropertyDeclaration(statement.members[1]!)) throw new Error("Expected static property");
    assert.equal(statement.members[1]!.modifiers?.[0]?.kind, Kind.StaticKeyword);
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

  it("keeps modifier-looking parameter names as bindings before commas and closing parens", () => {
    const result = parseSourceFileWithDiagnostics("interface I { m(package, protected); } class C { constructor(private, public, static) { private = public = static; } }");

    assert.deepEqual(result.diagnostics, []);
    const interfaceDeclaration = result.sourceFile.statements[0]!;
    assert.equal(isInterfaceDeclaration(interfaceDeclaration), true);
    if (!isInterfaceDeclaration(interfaceDeclaration)) throw new Error("Expected interface declaration");
    const method = interfaceDeclaration.members[0]!;
    assert.equal(isMethodSignatureDeclaration(method), true);
    if (!isMethodSignatureDeclaration(method)) throw new Error("Expected method signature");
    assert.deepEqual(method.parameters.map(parameter => (parameter.name as { readonly text?: string }).text), ["package", "protected"]);

    const classDeclaration = result.sourceFile.statements[1]!;
    assert.equal(isClassDeclaration(classDeclaration), true);
    if (!isClassDeclaration(classDeclaration)) throw new Error("Expected class declaration");
    const constructor = classDeclaration.members[0]!;
    assert.equal(isConstructorDeclaration(constructor), true);
    if (!isConstructorDeclaration(constructor)) throw new Error("Expected constructor");
    assert.deepEqual(constructor.parameters.map(parameter => (parameter.name as { readonly text?: string }).text), ["private", "public", "static"]);
  });

  it("recovers import-equals module references with TypeScript syntax diagnostics", () => {
    const result = parseSourceFileWithDiagnostics([
      "import n = 5;",
      "import q = null;",
      "import r = undefined;",
    ].join("\n"));

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1003, 1359]);
    assert.equal(result.sourceFile.statements.every(isImportEqualsDeclaration), true);
  });

  it("recovers variable-style class member errors without inventing const-property diagnostics", () => {
    const result = parseSourceFileWithDiagnostics([
      "class C {",
      "  public const var export foo = 10;",
      "  var constructor() { }",
      "}",
    ].join("\n"));

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1440, 1068, 1005, 1005, 1128]);
  });

  it("reports legacy octal literals and invalid string-like escapes before semantic checking", () => {
    const result = parseSourceFileWithDiagnostics([
      "-01;",
      "00;",
      "08;",
      "\"\\5\";",
      "\"\\8\";",
      "`0${05}`;",
      "`${0}\\55`;",
    ].join("\n"));

    assert.deepEqual(result.diagnostics.map(diagnostic => [diagnostic.code, diagnostic.message]), [
      [1121, "Octal literals are not allowed. Use the syntax '-0o1'."],
      [1121, "Octal literals are not allowed. Use the syntax '0o0'."],
      [1489, "Decimals with leading zeros are not allowed."],
      [1487, "Octal escape sequences are not allowed. Use the syntax '\\x05'."],
      [1488, "Escape sequence '\\8' is not allowed."],
      [1121, "Octal literals are not allowed. Use the syntax '0o5'."],
      [1487, "Octal escape sequences are not allowed. Use the syntax '\\x2d'."],
    ]);
  });

  it("treats a line break as an automatic statement terminator", () => {
    const result = parseSourceFileWithDiagnostics([
      "\"use strict\"",
      "function f() { return 1; }",
      "value",
      "++counter;",
    ].join("\n"));

    assert.equal(result.diagnostics.length, 0);
    assert.deepEqual(result.sourceFile.statements.map(statement => statement.kind), [Kind.ExpressionStatement, Kind.FunctionDeclaration, Kind.ExpressionStatement, Kind.ExpressionStatement]);
  });

  it("recovers colon after non-label expression statements as a missing semicolon", () => {
    const result = parseSourceFileWithDiagnostics("this.foo: any;");

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1005]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["';' expected."]);
    assert.deepEqual(result.sourceFile.statements.map(statement => statement.kind), [Kind.ExpressionStatement, Kind.ExpressionStatement]);
    const firstStatement = result.sourceFile.statements[0]!;
    const secondStatement = result.sourceFile.statements[1]!;
    assert.equal(isExpressionStatement(firstStatement), true);
    assert.equal(isExpressionStatement(secondStatement), true);
    if (!isExpressionStatement(firstStatement) || !isExpressionStatement(secondStatement)) throw new Error("Expected expression statements");
    assert.equal(isPropertyAccessExpression(firstStatement.expression), true);
    assert.equal(isIdentifier(secondStatement.expression), true);
    if (!isPropertyAccessExpression(firstStatement.expression) || !isIdentifier(secondStatement.expression)) throw new Error("Expected recovered expressions");
    assert.equal(firstStatement.expression.name.text, "foo");
    assert.equal(secondStatement.expression.text, "any");
  });

  it("parses JSX elements and fragments in TSX files", () => {
    const result = parseSourceFileWithDiagnostics("const view = <div id=\"x\">hello {name}<span /></div>; const fragment = <>{view}</>;", { fileName: "sample.tsx" });

    assert.deepEqual(result.diagnostics, []);
    assert.deepEqual(result.sourceFile.statements.map(statement => statement.kind), [Kind.VariableStatement, Kind.VariableStatement]);
    const firstStatement = result.sourceFile.statements[0]!;
    const secondStatement = result.sourceFile.statements[1]!;
    if (firstStatement.kind !== Kind.VariableStatement || secondStatement.kind !== Kind.VariableStatement) throw new Error("Expected variable statements");
    const element = firstStatement.declarationList.declarations[0]!.initializer;
    const fragment = secondStatement.declarationList.declarations[0]!.initializer;
    assert.equal(element?.kind, Kind.JsxElement);
    assert.equal(fragment?.kind, Kind.JsxFragment);
    if (element?.kind !== Kind.JsxElement || fragment?.kind !== Kind.JsxFragment) throw new Error("Expected JSX nodes");
    assert.equal(element.openingElement.tagName.kind, Kind.Identifier);
    assert.equal(element.children.map(child => child.kind).join(","), [Kind.JsxText, Kind.JsxExpression, Kind.JsxSelfClosingElement].join(","));
    assert.equal(fragment.children.map(child => child.kind).join(","), String(Kind.JsxExpression));
  });

  it("parses object literal methods and UMD namespace exports", () => {
    const result = parseSourceFileWithDiagnostics([
      "export as namespace Foo;",
      "const obj = {",
      "  data(value) { return value; },",
      "};",
    ].join("\n"));

    assert.equal(result.diagnostics.length, 0);
    assert.equal(result.sourceFile.statements[0]!.kind, Kind.NamespaceExportDeclaration);
    const variable = result.sourceFile.statements[1]!;
    assert.equal(isVariableStatement(variable), true);
    if (!isVariableStatement(variable) || !isObjectLiteralExpression(variable.declarationList.declarations[0]!.initializer!)) throw new Error("Expected object literal initializer");
    assert.equal(isMethodDeclaration(variable.declarationList.declarations[0]!.initializer.properties[0]!), true);
  });

  it("parses tagged template expressions as TS-Go member expressions", () => {
    const sourceFile = parseSourceFile([
      "tag`plain`;",
      "tag<T>`value ${item}`.prop;",
    ].join("\n"));

    const plainStatement = sourceFile.statements[0]!;
    assert.equal(isExpressionStatement(plainStatement), true);
    if (!isExpressionStatement(plainStatement)) throw new Error("Expected tagged template expression statement");
    assert.equal(isTaggedTemplateExpression(plainStatement.expression), true);

    const propertyStatement = sourceFile.statements[1]!;
    assert.equal(isExpressionStatement(propertyStatement), true);
    if (!isExpressionStatement(propertyStatement) || !isPropertyAccessExpression(propertyStatement.expression)) {
      throw new Error("Expected property access on tagged template expression");
    }
    assert.equal(isTaggedTemplateExpression(propertyStatement.expression.expression), true);
    if (!isTaggedTemplateExpression(propertyStatement.expression.expression)) throw new Error("Expected tagged template receiver");
    assert.equal(propertyStatement.expression.expression.typeArguments?.length, 1);
  });

  it("parses instantiation expressions as TS-Go expression-with-type-arguments", () => {
    const result = parseSourceFileWithDiagnostics([
      "getValue<number> = () => 1234;",
      "getValue<string>();",
      "getValue<boolean>.prop;",
    ].join("\n"));

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1477]);
    const assignment = result.sourceFile.statements[0]!;
    assert.equal(isExpressionStatement(assignment), true);
    if (!isExpressionStatement(assignment) || !isBinaryExpression(assignment.expression)) {
      throw new Error("Expected assignment expression statement");
    }
    assert.equal(isExpressionWithTypeArguments(assignment.expression.left), true);
    if (!isExpressionWithTypeArguments(assignment.expression.left)) throw new Error("Expected instantiation expression assignment target");
    assert.equal(assignment.expression.left.typeArguments?.length, 1);

    const call = result.sourceFile.statements[1]!;
    assert.equal(isExpressionStatement(call), true);
    if (!isExpressionStatement(call) || !isCallExpression(call.expression)) {
      throw new Error("Expected call expression statement");
    }
    assert.equal(call.expression.typeArguments?.length, 1);
    assert.equal(isExpressionWithTypeArguments(call.expression.expression), false);

    const property = result.sourceFile.statements[2]!;
    assert.equal(isExpressionStatement(property), true);
    if (!isExpressionStatement(property) || !isPropertyAccessExpression(property.expression)) {
      throw new Error("Expected property access expression statement");
    }
    assert.equal(isExpressionWithTypeArguments(property.expression.expression), true);
  });

  it("recovers malformed type argument lists without leaving expression parsing", () => {
    const result = parseSourceFileWithDiagnostics([
      "Foo<a,,b>();",
      "Foo<>();",
      "type T = Array<string,>;",
    ].join("\n"));

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1110, 1099, 1009]);

    const call = result.sourceFile.statements[0]!;
    assert.equal(isExpressionStatement(call), true);
    if (!isExpressionStatement(call) || !isCallExpression(call.expression)) {
      throw new Error("Expected malformed generic call to remain a call expression");
    }
    assert.equal(call.expression.typeArguments?.length, 3);
    assert.equal(call.expression.arguments.length, 0);

    const emptyCall = result.sourceFile.statements[1]!;
    assert.equal(isExpressionStatement(emptyCall), true);
    if (!isExpressionStatement(emptyCall) || !isCallExpression(emptyCall.expression)) {
      throw new Error("Expected empty generic call to remain a call expression");
    }
    assert.equal(emptyCall.expression.typeArguments?.length, 0);
  });

  it("parses TS-Go ambient namespace chains and statement forms without corrupting following syntax", () => {
    const result = parseSourceFileWithDiagnostics([
      "declare namespace Foo.Bar { export var value; };",
      "debugger;",
      "with (scope) { value; }",
      "label: var item;",
      "for (item in source) { continue; }",
    ].join("\n"));

    assert.deepEqual(result.diagnostics, []);
    assert.deepEqual(result.sourceFile.statements.map(statement => statement.kind), [
      Kind.ModuleDeclaration,
      Kind.DebuggerStatement,
      Kind.WithStatement,
      Kind.LabeledStatement,
      Kind.ForInStatement,
    ]);

    const namespaceDeclaration = result.sourceFile.statements[0]!;
    assert.equal(isModuleDeclaration(namespaceDeclaration), true);
    if (!isModuleDeclaration(namespaceDeclaration)) throw new Error("Expected namespace declaration");
    assert.equal(isIdentifier(namespaceDeclaration.name), true);
    if (!isIdentifier(namespaceDeclaration.name)) throw new Error("Expected namespace identifier");
    assert.equal(namespaceDeclaration.name.text, "Foo");
    assert.equal(isModuleDeclaration(namespaceDeclaration.body), true);
    if (!isModuleDeclaration(namespaceDeclaration.body)) throw new Error("Expected nested namespace declaration");
    assert.equal(isIdentifier(namespaceDeclaration.body.name), true);
    if (!isIdentifier(namespaceDeclaration.body.name)) throw new Error("Expected nested namespace identifier");
    assert.equal(namespaceDeclaration.body.name.text, "Bar");
    assert.equal(isModuleBlock(namespaceDeclaration.body.body), true);
    if (!isModuleBlock(namespaceDeclaration.body.body)) throw new Error("Expected nested namespace block");
    assert.equal(namespaceDeclaration.body.body.statements.length, 1);

    assert.equal(isDebuggerStatement(result.sourceFile.statements[1]!), true);
    assert.equal(isWithStatement(result.sourceFile.statements[2]!), true);
    assert.equal(isLabeledStatement(result.sourceFile.statements[3]!), true);
    assert.equal(isForInStatement(result.sourceFile.statements[4]!), true);
  });

  it("parses decimal numeric literal forms without statement recovery cascades", () => {
    const result = parseSourceFileWithDiagnostics([
      "const half = Math.random() < .5;",
      "const trailing = 1.;",
      "const exponent = 1.e2;",
      "const signedExponent = 1e+2;",
    ].join("\n"));

    assert.deepEqual(result.diagnostics, []);
    assert.equal(result.sourceFile.statements.length, 4);
  });

  it("reports TypeScript numeric literal lexical diagnostics", () => {
    const result = parseSourceFileWithDiagnostics("1e; 1e+; 1e2n; 1.0n; .5n;");

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [
      1124,
      1124,
      1352,
      1353,
      1353,
    ]);
  });
});
