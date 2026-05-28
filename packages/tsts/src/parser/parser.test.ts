import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Exception } from "@tsonic/dotnet/System.js";

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

export class ParserGroundworkTests {
  produces_a_source_file_with_expression_statements(): void {
    const sourceFile = parseSourceFile("x + 1;", { fileName: "sample.ts" });

    Assert.Equal(Kind.SourceFile, sourceFile.kind);
    Assert.Equal("sample.ts", sourceFile.fileName);
    Assert.Equal(1, sourceFile.statements.length);

    const statement = sourceFile.statements[0]!;
    Assert.True(isExpressionStatement(statement));
    if (!isExpressionStatement(statement)) throw new Exception("unreachable");
    Assert.True(isBinaryExpression(statement.expression));
  }

  preserves_binary_precedence_in_ast_shape(): void {
    const sourceFile = parseSourceFile("a + b * 2;");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement) || !isBinaryExpression(statement.expression)) {
      throw new Exception("Expected binary expression statement");
    }

    Assert.Equal(Kind.PlusToken, statement.expression.operatorToken.kind);
    Assert.True(isIdentifier(statement.expression.left));
    Assert.True(isBinaryExpression(statement.expression.right));
    if (!isBinaryExpression(statement.expression.right)) throw new Exception("unreachable");
    Assert.Equal(Kind.AsteriskToken, statement.expression.right.operatorToken.kind);
    Assert.True(isNumericLiteral(statement.expression.right.right));
  }

  round_trips_parenthesized_expressions_as_explicit_ast_nodes(): void {
    const sourceFile = parseSourceFile("(a + 1);");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");

    Assert.True(isParenthesizedExpression(statement.expression));
  }

  is_consumable_through_generated_child_traversal(): void {
    const sourceFile = parseSourceFile("a + 1;");
    const visitedKinds: Kind[] = [];

    forEachChild(sourceFile, (node) => {
      visitedKinds.push(node.kind);
      return undefined;
    });

    Assert.Equal<readonly Kind[]>([Kind.ExpressionStatement, Kind.EndOfFile], visitedKinds);
  }

  produces_ts_go_variable_declaration_lists_with_exact_flags_and_typed_initializers(): void {
    const sourceFile = parseSourceFile("export const answer: number = 42;");
    const statement = sourceFile.statements[0]!;

    Assert.True(isVariableStatement(statement));
    if (!isVariableStatement(statement)) throw new Exception("Expected variable statement");
    Assert.Equal(Kind.ExportKeyword, statement.modifiers?.[0]?.kind);
    Assert.Equal(NodeFlags.Const, statement.declarationList.flags);

    const declaration = statement.declarationList.declarations[0]!;
    Assert.True(isIdentifier(declaration.name));
    Assert.Equal(declaration, declaration.name.parent);
    Assert.True(isKeywordTypeNode(declaration.type!));
    Assert.Equal(Kind.NumberKeyword, declaration.type!.kind);
    Assert.True(isNumericLiteral(declaration.initializer!));
  }

  produces_function_declarations_with_parameters_return_types_and_return_statements(): void {
    const sourceFile = parseSourceFile("function add(a: number, b: number): number { return a + b; }");
    const statement = sourceFile.statements[0]!;

    Assert.True(isFunctionDeclaration(statement));
    if (!isFunctionDeclaration(statement)) throw new Exception("Expected function declaration");
    Assert.Equal("add", statement.name?.text);
    Assert.Equal(2, statement.parameters.length);
    Assert.Equal(statement, statement.parameters[0]!.parent);
    Assert.Equal(Kind.NumberKeyword, statement.parameters[0]!.type?.kind);
    Assert.Equal(Kind.NumberKeyword, statement.type?.kind);
    Assert.True(isBlock(statement.body!));

    const returnStatement = statement.body!.statements[0]!;
    Assert.True(isReturnStatement(returnStatement));
    if (!isReturnStatement(returnStatement)) throw new Exception("Expected return statement");
    Assert.True(isBinaryExpression(returnStatement.expression!));
  }

  produces_import_and_export_declarations_with_named_bindings(): void {
    const sourceFile = parseSourceFile("import value, { dep as renamed } from \"./dep\"; export { renamed as value };");
    const importDeclaration = sourceFile.statements[0]!;
    const exportDeclaration = sourceFile.statements[1]!;

    Assert.True(isImportDeclaration(importDeclaration));
    if (!isImportDeclaration(importDeclaration)) throw new Exception("Expected import declaration");
    Assert.Equal("value", importDeclaration.importClause?.name?.text);
    Assert.True(isNamedImports(importDeclaration.importClause!.namedBindings!));
    if (!isNamedImports(importDeclaration.importClause!.namedBindings!)) throw new Exception("Expected named imports");
    Assert.Equal("dep", importDeclaration.importClause!.namedBindings.elements[0]!.propertyName?.text);
    Assert.Equal("renamed", importDeclaration.importClause!.namedBindings.elements[0]!.name.text);

    Assert.True(isExportDeclaration(exportDeclaration));
    if (!isExportDeclaration(exportDeclaration)) throw new Exception("Expected export declaration");
    Assert.True(isNamedExports(exportDeclaration.exportClause!));
    if (!isNamedExports(exportDeclaration.exportClause!)) throw new Exception("Expected named exports");
    Assert.Equal("renamed", exportDeclaration.exportClause.elements[0]!.propertyName?.text);
    Assert.Equal("value", exportDeclaration.exportClause.elements[0]!.name.text);
  }

  parses_contextual_import_export_names_and_star_re_exports(): void {
    const sourceFile = parseSourceFile([
      "import assert from \"node:assert/strict\";",
      "import type { type RuntimeShape, default as fallback } from \"./runtime.js\";",
      "export * from \"./generated/kind.js\";",
    ].join("\n"));
    const defaultImport = sourceFile.statements[0]!;
    const typeImport = sourceFile.statements[1]!;
    const starExport = sourceFile.statements[2]!;

    Assert.True(isImportDeclaration(defaultImport));
    if (!isImportDeclaration(defaultImport)) throw new Exception("Expected default import");
    Assert.Equal("assert", defaultImport.importClause?.name?.text);

    Assert.True(isImportDeclaration(typeImport));
    if (!isImportDeclaration(typeImport)) throw new Exception("Expected type import");
    Assert.Equal(Kind.TypeKeyword, typeImport.importClause?.phaseModifier);
    Assert.True(isNamedImports(typeImport.importClause!.namedBindings!));
    if (!isNamedImports(typeImport.importClause!.namedBindings!)) throw new Exception("Expected named imports");
    Assert.True(typeImport.importClause!.namedBindings.elements[0]!.isTypeOnly);
    Assert.Equal("RuntimeShape", typeImport.importClause!.namedBindings.elements[0]!.name.text);
    Assert.Equal("default", typeImport.importClause!.namedBindings.elements[1]!.propertyName?.text);
    Assert.Equal("fallback", typeImport.importClause!.namedBindings.elements[1]!.name.text);

    Assert.True(isExportDeclaration(starExport));
    if (!isExportDeclaration(starExport)) throw new Exception("Expected star export");
    Assert.Null(starExport.exportClause);
    Assert.True(isStringLiteral(starExport.moduleSpecifier!));
    if (!isStringLiteral(starExport.moduleSpecifier!)) throw new Exception("Expected string literal module specifier");
    Assert.Equal("./generated/kind.js", starExport.moduleSpecifier.text);
  }

  parses_const_assertions_as_contextual_type_references(): void {
    const sourceFile = parseSourceFile("const values = [1, 2] as const;");
    const statement = sourceFile.statements[0]!;
    if (!isVariableStatement(statement)) throw new Exception("Expected variable statement");
    const initializer = statement.declarationList.declarations[0]!.initializer;

    Assert.True(isAsExpression(initializer!));
    if (!isAsExpression(initializer!)) throw new Exception("Expected as expression");
    Assert.True(isTypeReferenceNode(initializer.type));
    if (!isTypeReferenceNode(initializer.type)) throw new Exception("Expected type reference");
    const typeName = initializer.type.typeName;
    Assert.True(isIdentifier(typeName));
    if (!isIdentifier(typeName)) throw new Exception("Expected identifier type name");
    Assert.Equal("const", typeName.text);
  }

  produces_property_access_and_call_expression_nodes(): void {
    const sourceFile = parseSourceFile("answer.toFixed(2);");
    const statement = sourceFile.statements[0]!;
    if (!isExpressionStatement(statement)) throw new Exception("Expected expression statement");

    Assert.True(isCallExpression(statement.expression));
    if (!isCallExpression(statement.expression)) throw new Exception("Expected call expression");
    Assert.Equal(1, statement.expression.arguments.length);
    Assert.True(isPropertyAccessExpression(statement.expression.expression));
    if (!isPropertyAccessExpression(statement.expression.expression)) throw new Exception("Expected property access");
    Assert.Equal("toFixed", statement.expression.expression.name.text);
  }

  produces_type_aliases_and_type_literal_members(): void {
    const sourceFile = parseSourceFile("export type Box<T> = { value: T; label?: string };");
    const statement = sourceFile.statements[0]!;

    Assert.True(isTypeAliasDeclaration(statement));
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias");
    Assert.Equal(Kind.ExportKeyword, statement.modifiers?.[0]?.kind);
    Assert.Equal("Box", statement.name.text);
    Assert.Equal("T", statement.typeParameters?.[0]?.name.text);
    Assert.True(isTypeLiteralNode(statement.type));
    if (!isTypeLiteralNode(statement.type)) throw new Exception("Expected type literal");
    Assert.Equal(2, statement.type.members.length);
    Assert.True(isPropertySignatureDeclaration(statement.type.members[0]!));
    Assert.True(isPropertySignatureDeclaration(statement.type.members[1]!));
    if (!isPropertySignatureDeclaration(statement.type.members[1]!)) throw new Exception("Expected property signature");
    Assert.Equal(Kind.QuestionToken, statement.type.members[1]!.postfixToken?.kind);
  }

  produces_interface_declarations_with_heritage_and_method_signatures(): void {
    const sourceFile = parseSourceFile("interface Named extends Base<string> { id: number; rename(value: string): void; }");
    const statement = sourceFile.statements[0]!;

    Assert.True(isInterfaceDeclaration(statement));
    if (!isInterfaceDeclaration(statement)) throw new Exception("Expected interface");
    Assert.Equal("Named", statement.name.text);
    Assert.Equal(Kind.ExtendsKeyword, statement.heritageClauses?.[0]?.token);
    Assert.Equal(Kind.StringKeyword, statement.heritageClauses?.[0]?.types[0]?.typeArguments?.[0]?.kind);
    Assert.True(isPropertySignatureDeclaration(statement.members[0]!));
    Assert.True(isMethodSignatureDeclaration(statement.members[1]!));
    if (!isMethodSignatureDeclaration(statement.members[1]!)) throw new Exception("Expected method signature");
    Assert.Equal(Kind.Identifier, statement.members[1]!.parameters[0]?.name.kind);
    Assert.Equal(Kind.VoidKeyword, statement.members[1]!.type?.kind);
  }

  produces_class_declarations_with_heritage_constructor_methods_and_properties(): void {
    const sourceFile = parseSourceFile("export class Box<T> extends Base implements Named { value: T; constructor(value: T) { this.value = value; } getValue(): T { return this.value; } }");
    const statement = sourceFile.statements[0]!;

    Assert.True(isClassDeclaration(statement));
    if (!isClassDeclaration(statement)) throw new Exception("Expected class");
    Assert.Equal("Box", statement.name?.text);
    Assert.Equal("T", statement.typeParameters?.[0]?.name.text);
    Assert.Equal(Kind.ExtendsKeyword, statement.heritageClauses?.[0]?.token);
    Assert.Equal(Kind.ImplementsKeyword, statement.heritageClauses?.[1]?.token);
    Assert.True(isPropertyDeclaration(statement.members[0]!));
    Assert.True(isConstructorDeclaration(statement.members[1]!));
    Assert.True(isMethodDeclaration(statement.members[2]!));
    if (!isMethodDeclaration(statement.members[2]!)) throw new Exception("Expected method");
    Assert.True(isTypeReferenceNode(statement.members[2]!.type!));
    if (!isTypeReferenceNode(statement.members[2]!.type!)) throw new Exception("Expected type reference");
    Assert.Equal(Kind.Identifier, statement.members[2]!.type!.typeName.kind);
  }

  produces_arrow_functions_with_parameter_and_return_type_nodes(): void {
    const sourceFile = parseSourceFile("const add = (a: number, b: number): number => a + b;");
    const statement = sourceFile.statements[0]!;
    if (!isVariableStatement(statement)) throw new Exception("Expected variable statement");
    const initializer = statement.declarationList.declarations[0]!.initializer;

    Assert.True(isArrowFunction(initializer!));
    if (!isArrowFunction(initializer!)) throw new Exception("Expected arrow function");
    Assert.Equal(2, initializer.parameters.length);
    Assert.Equal(Kind.NumberKeyword, initializer.parameters[0]!.type?.kind);
    Assert.Equal(Kind.NumberKeyword, initializer.type?.kind);
    Assert.True(isBinaryExpression(initializer.body));
  }

  produces_loop_statements_with_ts_go_initializer_and_body_nodes(): void {
    const sourceFile = parseSourceFile("for (let index = 0; index < 3; index += 1) { continue; } for (const item of items) { item; } while (ready) { ready; }");
    const forStatement = sourceFile.statements[0]!;
    const forOfStatement = sourceFile.statements[1]!;
    const whileStatement = sourceFile.statements[2]!;

    Assert.True(isForStatement(forStatement));
    if (!isForStatement(forStatement)) throw new Exception("Expected for statement");
    Assert.Equal(Kind.VariableDeclarationList, forStatement.initializer?.kind);
    Assert.True(isBinaryExpression(forStatement.condition!));
    Assert.True(isBinaryExpression(forStatement.incrementor!));
    Assert.True(isBlock(forStatement.statement));
    if (!isBlock(forStatement.statement)) throw new Exception("Expected for block");
    Assert.True(isContinueStatement(forStatement.statement.statements[0]!));

    Assert.True(isForOfStatement(forOfStatement));
    if (!isForOfStatement(forOfStatement)) throw new Exception("Expected for-of statement");
    Assert.Equal(Kind.VariableDeclarationList, forOfStatement.initializer.kind);
    Assert.True(isIdentifier(forOfStatement.expression));

    Assert.True(isWhileStatement(whileStatement));
    if (!isWhileStatement(whileStatement)) throw new Exception("Expected while statement");
    Assert.True(isIdentifier(whileStatement.expression));
  }

  produces_core_access_unary_new_and_conditional_expression_nodes(): void {
    const sourceFile = parseSourceFile("const value = enabled ? new Box(items[index++], ...rest).value as number : -1;");
    const statement = sourceFile.statements[0]!;
    if (!isVariableStatement(statement)) throw new Exception("Expected variable statement");
    const initializer = statement.declarationList.declarations[0]!.initializer;

    Assert.True(isConditionalExpression(initializer!));
    if (!isConditionalExpression(initializer!)) throw new Exception("Expected conditional expression");
    Assert.True(isIdentifier(initializer.condition));
    Assert.True(isAsExpression(initializer.whenTrue));
    if (!isAsExpression(initializer.whenTrue)) throw new Exception("Expected as expression");
    Assert.True(isPropertyAccessExpression(initializer.whenTrue.expression));
    if (!isPropertyAccessExpression(initializer.whenTrue.expression)) throw new Exception("Expected property access");
    Assert.True(isNewExpression(initializer.whenTrue.expression.expression));
    if (!isNewExpression(initializer.whenTrue.expression.expression)) throw new Exception("Expected new expression");
    const firstArgument = initializer.whenTrue.expression.expression.arguments?.[0];
    Assert.True(isElementAccessExpression(firstArgument!));
    if (!isElementAccessExpression(firstArgument!)) throw new Exception("Expected element access");
    Assert.True(isPostfixUnaryExpression(firstArgument.argumentExpression));
    Assert.True(isPrefixUnaryExpression(initializer.whenFalse));
  }

  produces_object_and_array_binding_patterns_in_declarations_and_parameters(): void {
    const sourceFile = parseSourceFile("const { id, name: label = \"x\", ...rest } = item; function f([first, second]: string[]) { return first; }");
    const variableStatement = sourceFile.statements[0]!;
    const functionStatement = sourceFile.statements[1]!;
    if (!isVariableStatement(variableStatement)) throw new Exception("Expected variable statement");
    if (!isFunctionDeclaration(functionStatement)) throw new Exception("Expected function statement");

    const bindingName = variableStatement.declarationList.declarations[0]!.name;
    Assert.True(isObjectBindingPattern(bindingName));
    if (!isObjectBindingPattern(bindingName)) throw new Exception("Expected object binding pattern");
    Assert.Equal(3, bindingName.elements.length);
    Assert.Equal(Kind.Identifier, bindingName.elements[1]!.propertyName?.kind);
    Assert.Equal(Kind.StringLiteral, bindingName.elements[1]!.initializer?.kind);
    Assert.Equal(Kind.DotDotDotToken, bindingName.elements[2]!.dotDotDotToken?.kind);

    Assert.True(isArrayBindingPattern(functionStatement.parameters[0]!.name));
  }

  parses_ts_go_enum_private_identifier_and_type_predicate_surfaces(): void {
    const sourceFile = parseSourceFile([
      "export enum Kind { Unknown = 0, Identifier }",
      "class Box { #value: number = 1; getValue(): number { return this.#value; } }",
      "function isBox(value: unknown): value is Box { return value instanceof Box; }",
    ].join("\n"));
    const enumDeclaration = sourceFile.statements[0]!;
    const classDeclaration = sourceFile.statements[1]!;
    const predicateFunction = sourceFile.statements[2]!;

    Assert.True(isEnumDeclaration(enumDeclaration));
    if (!isEnumDeclaration(enumDeclaration)) throw new Exception("Expected enum declaration");
    Assert.Equal(Kind.Identifier, enumDeclaration.members[1]!.name.kind);

    Assert.True(isClassDeclaration(classDeclaration));
    if (!isClassDeclaration(classDeclaration)) throw new Exception("Expected class declaration");
    Assert.True(isPropertyDeclaration(classDeclaration.members[0]!));
    if (!isPropertyDeclaration(classDeclaration.members[0]!)) throw new Exception("Expected property declaration");
    Assert.True(isPrivateIdentifier(classDeclaration.members[0]!.name));

    Assert.True(isFunctionDeclaration(predicateFunction));
    if (!isFunctionDeclaration(predicateFunction)) throw new Exception("Expected predicate function");
    Assert.True(isTypePredicateNode(predicateFunction.type!));
  }

  parses_generic_function_types_try_catch_switch_and_throw_statements(): void {
    const sourceFile = parseSourceFile([
      "type Equal<Actual, Expected> = (<T>() => T extends Actual ? 1 : 2) extends (<T>() => T extends Expected ? 1 : 2) ? true : false;",
      "try { throw new Error(\"x\"); } catch (error) { switch (error) { default: break; } }",
    ].join("\n"));

    Assert.True(isTypeAliasDeclaration(sourceFile.statements[0]!));
    Assert.Equal(Kind.TryStatement, sourceFile.statements[1]!.kind);
  }

  parses_type_literal_call_index_and_construct_signatures(): void {
    const sourceFile = parseSourceFile(
      "type T = { (text: string): number; [key: string]: number; new (text: string): Widget };",
    );
    const statement = sourceFile.statements[0]!;
    Assert.True(isTypeAliasDeclaration(statement));
    if (!isTypeAliasDeclaration(statement)) throw new Exception("Expected type alias");
    Assert.True(isTypeLiteralNode(statement.type));
    if (!isTypeLiteralNode(statement.type)) throw new Exception("Expected type literal");
    Assert.Equal(3, statement.type.members.length);

    const callSig = statement.type.members[0]!;
    Assert.True(isCallSignatureDeclaration(callSig));
    if (!isCallSignatureDeclaration(callSig)) throw new Exception("Expected call signature");
    Assert.Equal(1, callSig.parameters.length);
    Assert.Equal(Kind.StringKeyword, callSig.parameters[0]!.type?.kind);
    Assert.Equal(Kind.NumberKeyword, callSig.type?.kind);

    const indexSig = statement.type.members[1]!;
    Assert.True(isIndexSignatureDeclaration(indexSig));
    if (!isIndexSignatureDeclaration(indexSig)) throw new Exception("Expected index signature");
    Assert.Equal(1, indexSig.parameters.length);
    Assert.Equal("key", (indexSig.parameters[0]!.name as { text: string }).text);
    Assert.Equal(Kind.StringKeyword, indexSig.parameters[0]!.type?.kind);
    Assert.Equal(Kind.NumberKeyword, indexSig.type?.kind);

    const constructSig = statement.type.members[2]!;
    Assert.True(isConstructSignatureDeclaration(constructSig));
    if (!isConstructSignatureDeclaration(constructSig)) throw new Exception("Expected construct signature");
    Assert.Equal(1, constructSig.parameters.length);
    Assert.Equal(Kind.StringKeyword, constructSig.parameters[0]!.type?.kind);
  }
}

A<ParserGroundworkTests>().method((t) => t.produces_a_source_file_with_expression_statements).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.preserves_binary_precedence_in_ast_shape).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.round_trips_parenthesized_expressions_as_explicit_ast_nodes).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.is_consumable_through_generated_child_traversal).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.produces_ts_go_variable_declaration_lists_with_exact_flags_and_typed_initializers).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.produces_function_declarations_with_parameters_return_types_and_return_statements).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.produces_import_and_export_declarations_with_named_bindings).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.parses_contextual_import_export_names_and_star_re_exports).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.parses_const_assertions_as_contextual_type_references).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.produces_property_access_and_call_expression_nodes).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.produces_type_aliases_and_type_literal_members).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.produces_interface_declarations_with_heritage_and_method_signatures).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.produces_class_declarations_with_heritage_constructor_methods_and_properties).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.produces_arrow_functions_with_parameter_and_return_type_nodes).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.produces_loop_statements_with_ts_go_initializer_and_body_nodes).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.produces_core_access_unary_new_and_conditional_expression_nodes).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.produces_object_and_array_binding_patterns_in_declarations_and_parameters).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.parses_ts_go_enum_private_identifier_and_type_predicate_surfaces).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.parses_generic_function_types_try_catch_switch_and_throw_statements).add(FactAttribute);
A<ParserGroundworkTests>().method((t) => t.parses_type_literal_call_index_and_construct_signatures).add(FactAttribute);
