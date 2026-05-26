import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Exception } from "@tsonic/dotnet/System.js";

import {
  SymbolFlags,
  isClassDeclaration,
  isForStatement,
  isFunctionDeclaration,
  isInterfaceDeclaration,
  isTypeAliasDeclaration,
  isVariableStatement,
} from "../ast/index.js";
import { bindSourceFile, getSymbol, lookupSymbol } from "./index.js";
import { parseSourceFile } from "../parser/index.js";

export class BinderGroundworkTests {
  binds_source_file_variables_and_function_declarations_into_symbol_tables(): void {
    const sourceFile = parseSourceFile("const answer = 42; function add(a: number, b: number): number { return a + b; }");
    const result = bindSourceFile(sourceFile);

    Assert.Equal(0, result.diagnostics.length);
    Assert.Equal(SymbolFlags.BlockScopedVariable, lookupSymbol(result.globals, "answer")?.flags);
    Assert.Equal(SymbolFlags.Function, lookupSymbol(result.globals, "add")?.flags);

    const variableStatement = sourceFile.statements[0]!;
    if (!isVariableStatement(variableStatement)) throw new Exception("Expected variable statement");
    const variableSymbol = getSymbol(result, variableStatement.declarationList.declarations[0]!);
    Assert.Equal("answer", variableSymbol?.name);

    const functionDeclaration = sourceFile.statements[1]!;
    if (!isFunctionDeclaration(functionDeclaration)) throw new Exception("Expected function declaration");
    const functionLocals = result.locals.get(functionDeclaration);
    Assert.NotNull(functionLocals);
    Assert.Equal(SymbolFlags.FunctionScopedVariable, functionLocals?.get("a")?.flags);
    Assert.Equal(SymbolFlags.FunctionScopedVariable, functionLocals?.get("b")?.flags);
  }

  uses_block_scope_for_let_const_and_function_scope_for_var(): void {
    const sourceFile = parseSourceFile("function f(a: number) { var hoisted = a; { const local = hoisted; } }");
    const result = bindSourceFile(sourceFile);
    const functionDeclaration = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(functionDeclaration)) throw new Exception("Expected function declaration");

    const functionLocals = result.locals.get(functionDeclaration);
    Assert.Equal(SymbolFlags.FunctionScopedVariable, functionLocals?.get("hoisted")?.flags);

    const nestedBlock = functionDeclaration.body!.statements[1]!;
    const blockLocals = result.locals.get(nestedBlock);
    Assert.Equal(SymbolFlags.BlockScopedVariable, blockLocals?.get("local")?.flags);
    Assert.False(functionLocals?.has("local") ?? false);
  }

  diagnoses_duplicate_block_scoped_declarations_without_rejecting_valid_var_redeclarations(): void {
    const blockScoped = bindSourceFile(parseSourceFile("let x; const x = 1;"));
    const functionScoped = bindSourceFile(parseSourceFile("var y; var y;"));

    Assert.Equal<readonly string[]>(["Duplicate identifier 'x'."], blockScoped.diagnostics.map((d) => d.message));
    Assert.Equal(0, functionScoped.diagnostics.length);
  }

  binds_imported_names_as_aliases(): void {
    const sourceFile = parseSourceFile("import value, { dep as renamed } from \"./dep\";");
    const result = bindSourceFile(sourceFile);

    Assert.Equal(0, result.diagnostics.length);
    Assert.Equal(SymbolFlags.Alias, lookupSymbol(result.globals, "value")?.flags);
    Assert.Equal(SymbolFlags.Alias, lookupSymbol(result.globals, "renamed")?.flags);
  }

  binds_class_interface_and_type_alias_declarations_with_ts_go_symbol_meanings(): void {
    const sourceFile = parseSourceFile("class Box { value: string; } interface Named { value: string; } type Alias = Named;");
    const result = bindSourceFile(sourceFile);

    Assert.Equal(0, result.diagnostics.length);
    Assert.Equal(SymbolFlags.Class, lookupSymbol(result.globals, "Box")?.flags);
    Assert.Equal(SymbolFlags.Interface, lookupSymbol(result.globals, "Named")?.flags);
    Assert.Equal(SymbolFlags.TypeAlias, lookupSymbol(result.globals, "Alias")?.flags);

    const classDeclaration = sourceFile.statements[0]!;
    const interfaceDeclaration = sourceFile.statements[1]!;
    const typeAliasDeclaration = sourceFile.statements[2]!;
    Assert.True(isClassDeclaration(classDeclaration));
    Assert.True(isInterfaceDeclaration(interfaceDeclaration));
    Assert.True(isTypeAliasDeclaration(typeAliasDeclaration));
    Assert.NotNull(result.locals.get(classDeclaration));
    Assert.NotNull(result.locals.get(interfaceDeclaration));
  }

  binds_loop_declaration_initializers_into_the_loop_lexical_scope(): void {
    const sourceFile = parseSourceFile("for (let index = 0; index < 1; index += 1) { const local = index; }");
    const result = bindSourceFile(sourceFile);
    const forStatement = sourceFile.statements[0]!;

    Assert.Equal(0, result.diagnostics.length);
    Assert.Null(lookupSymbol(result.globals, "index"));
    Assert.True(isForStatement(forStatement));
    if (!isForStatement(forStatement)) throw new Exception("Expected for statement");
    Assert.Equal(SymbolFlags.BlockScopedVariable, result.locals.get(forStatement)?.get("index")?.flags);
  }

  binds_names_inside_object_and_array_binding_patterns(): void {
    const sourceFile = parseSourceFile("const { id, name: label, ...rest } = item; function f([first, second]: string[]) { return first; }");
    const result = bindSourceFile(sourceFile);
    const functionDeclaration = sourceFile.statements[1]!;
    if (!isFunctionDeclaration(functionDeclaration)) throw new Exception("Expected function declaration");
    const functionLocals = result.locals.get(functionDeclaration);

    Assert.Equal(0, result.diagnostics.length);
    Assert.Equal(SymbolFlags.BlockScopedVariable, lookupSymbol(result.globals, "id")?.flags);
    Assert.Equal(SymbolFlags.BlockScopedVariable, lookupSymbol(result.globals, "label")?.flags);
    Assert.Equal(SymbolFlags.BlockScopedVariable, lookupSymbol(result.globals, "rest")?.flags);
    Assert.Equal(SymbolFlags.FunctionScopedVariable, functionLocals?.get("first")?.flags);
    Assert.Equal(SymbolFlags.FunctionScopedVariable, functionLocals?.get("second")?.flags);
  }
}

A<BinderGroundworkTests>().method((t) => t.binds_source_file_variables_and_function_declarations_into_symbol_tables).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.uses_block_scope_for_let_const_and_function_scope_for_var).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.diagnoses_duplicate_block_scoped_declarations_without_rejecting_valid_var_redeclarations).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.binds_imported_names_as_aliases).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.binds_class_interface_and_type_alias_declarations_with_ts_go_symbol_meanings).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.binds_loop_declaration_initializers_into_the_loop_lexical_scope).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.binds_names_inside_object_and_array_binding_patterns).add(FactAttribute);
