import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Exception } from "@tsonic/dotnet/System.js";

import {
  SymbolFlags,
  isBlock,
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
    const diagnostics = bindSourceFile(sourceFile);

    Assert.Equal(0, diagnostics.length);
    Assert.NotNull(sourceFile.locals);
    Assert.Equal(SymbolFlags.BlockScopedVariable, lookupSymbol(sourceFile.locals!, "answer")?.flags);
    Assert.Equal(SymbolFlags.Function, lookupSymbol(sourceFile.locals!, "add")?.flags);

    const variableStatement = sourceFile.statements[0]!;
    if (!isVariableStatement(variableStatement)) throw new Exception("Expected variable statement");
    const variableDeclaration = variableStatement.declarationList.declarations[0]!;
    const variableSymbol = getSymbol(variableDeclaration);
    Assert.Equal("answer", variableSymbol?.name);
    // The in-place symbol slot and the source-file locals entry are the same object.
    Assert.True(lookupSymbol(sourceFile.locals!, "answer") === variableSymbol);
    // Parent pointers are populated during the bind walk.
    Assert.True(variableDeclaration.parent === variableStatement.declarationList);
    Assert.True(variableStatement.declarationList.parent === variableStatement);
    Assert.True(variableStatement.parent === sourceFile);

    const functionDeclaration = sourceFile.statements[1]!;
    if (!isFunctionDeclaration(functionDeclaration)) throw new Exception("Expected function declaration");
    const functionLocals = functionDeclaration.locals;
    Assert.NotNull(functionLocals);
    Assert.Equal(SymbolFlags.FunctionScopedVariable, functionLocals?.get("a")?.flags);
    Assert.Equal(SymbolFlags.FunctionScopedVariable, functionLocals?.get("b")?.flags);
    // The function's own symbol lives in the source-file locals.
    Assert.True(lookupSymbol(sourceFile.locals!, "add") === functionDeclaration.symbol);
  }

  uses_block_scope_for_let_const_and_function_scope_for_var(): void {
    const sourceFile = parseSourceFile("function f(a: number) { var hoisted = a; { const local = hoisted; } }");
    bindSourceFile(sourceFile);
    const functionDeclaration = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(functionDeclaration)) throw new Exception("Expected function declaration");

    const functionLocals = functionDeclaration.locals;
    Assert.Equal(SymbolFlags.FunctionScopedVariable, functionLocals?.get("hoisted")?.flags);

    const nestedBlock = functionDeclaration.body!.statements[1]!;
    if (!isBlock(nestedBlock)) throw new Exception("Expected nested block");
    Assert.Equal(SymbolFlags.BlockScopedVariable, nestedBlock.locals?.get("local")?.flags);
    Assert.False(functionLocals?.has("local") ?? false);
  }

  diagnoses_duplicate_block_scoped_declarations_without_rejecting_valid_var_redeclarations(): void {
    const blockScoped = bindSourceFile(parseSourceFile("let x; const x = 1;"));
    const functionScoped = bindSourceFile(parseSourceFile("var y; var y;"));

    Assert.Equal<readonly string[]>(["Duplicate identifier 'x'."], blockScoped.map((d) => d.message));
    Assert.Equal(0, functionScoped.length);
  }

  binds_imported_names_as_aliases(): void {
    const sourceFile = parseSourceFile("import value, { dep as renamed } from \"./dep\";");
    const diagnostics = bindSourceFile(sourceFile);

    Assert.Equal(0, diagnostics.length);
    Assert.NotNull(sourceFile.locals);
    Assert.Equal(SymbolFlags.Alias, lookupSymbol(sourceFile.locals!, "value")?.flags);
    Assert.Equal(SymbolFlags.Alias, lookupSymbol(sourceFile.locals!, "renamed")?.flags);
  }

  binds_class_interface_and_type_alias_declarations_with_ts_go_symbol_meanings(): void {
    const sourceFile = parseSourceFile("class Box { value: string; } interface Named { value: string; } type Alias = Named;");
    const diagnostics = bindSourceFile(sourceFile);

    Assert.Equal(0, diagnostics.length);
    Assert.NotNull(sourceFile.locals);
    Assert.Equal(SymbolFlags.Class, lookupSymbol(sourceFile.locals!, "Box")?.flags);
    Assert.Equal(SymbolFlags.Interface, lookupSymbol(sourceFile.locals!, "Named")?.flags);
    Assert.Equal(SymbolFlags.TypeAlias, lookupSymbol(sourceFile.locals!, "Alias")?.flags);

    const classDeclaration = sourceFile.statements[0]!;
    const interfaceDeclaration = sourceFile.statements[1]!;
    const typeAliasDeclaration = sourceFile.statements[2]!;
    Assert.True(isClassDeclaration(classDeclaration));
    Assert.True(isInterfaceDeclaration(interfaceDeclaration));
    Assert.True(isTypeAliasDeclaration(typeAliasDeclaration));
    if (!isClassDeclaration(classDeclaration)) throw new Exception("Expected class declaration");
    if (!isInterfaceDeclaration(interfaceDeclaration)) throw new Exception("Expected interface declaration");
    Assert.NotNull(classDeclaration.locals);
    Assert.NotNull(interfaceDeclaration.symbol?.members);
    // The class member `value` is bound onto the class symbol's member table.
    Assert.Equal(SymbolFlags.Property, classDeclaration.symbol?.members?.get("value")?.flags);
    Assert.Equal(SymbolFlags.Property, interfaceDeclaration.symbol?.members?.get("value")?.flags);
  }

  binds_loop_declaration_initializers_into_the_loop_lexical_scope(): void {
    const sourceFile = parseSourceFile("for (let index = 0; index < 1; index += 1) { const local = index; }");
    const diagnostics = bindSourceFile(sourceFile);
    const forStatement = sourceFile.statements[0]!;

    Assert.Equal(0, diagnostics.length);
    Assert.NotNull(sourceFile.locals);
    Assert.Null(lookupSymbol(sourceFile.locals!, "index"));
    Assert.True(isForStatement(forStatement));
    if (!isForStatement(forStatement)) throw new Exception("Expected for statement");
    Assert.Equal(SymbolFlags.BlockScopedVariable, forStatement.locals?.get("index")?.flags);
  }

  binds_names_inside_object_and_array_binding_patterns(): void {
    const sourceFile = parseSourceFile("const { id, name: label, ...rest } = item; function f([first, second]: string[]) { return first; }");
    const diagnostics = bindSourceFile(sourceFile);
    const functionDeclaration = sourceFile.statements[1]!;
    if (!isFunctionDeclaration(functionDeclaration)) throw new Exception("Expected function declaration");
    const functionLocals = functionDeclaration.locals;

    Assert.Equal(0, diagnostics.length);
    Assert.NotNull(sourceFile.locals);
    Assert.Equal(SymbolFlags.BlockScopedVariable, lookupSymbol(sourceFile.locals!, "id")?.flags);
    Assert.Equal(SymbolFlags.BlockScopedVariable, lookupSymbol(sourceFile.locals!, "label")?.flags);
    Assert.Equal(SymbolFlags.BlockScopedVariable, lookupSymbol(sourceFile.locals!, "rest")?.flags);
    Assert.Equal(SymbolFlags.FunctionScopedVariable, functionLocals?.get("first")?.flags);
    Assert.Equal(SymbolFlags.FunctionScopedVariable, functionLocals?.get("second")?.flags);
  }

  // codex-021307 M4a GATE: `function f() { let x = 1; }` must bind in place —
  // sourceFile.locals contains `f`; f's container locals contain `x`
  // (BlockScopedVariable); declaration `symbol` slots populated; parents set.
  binds_function_f_let_x_gate_in_place(): void {
    const sourceFile = parseSourceFile("function f() { let x = 1; }");
    const diagnostics = bindSourceFile(sourceFile);

    Assert.Equal(0, diagnostics.length);
    Assert.NotNull(sourceFile.locals);
    const functionDeclaration = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(functionDeclaration)) throw new Exception("Expected function declaration");

    // sourceFile.locals contains `f`, and it is the same object as f.symbol.
    const fSymbol = lookupSymbol(sourceFile.locals!, "f");
    Assert.Equal(SymbolFlags.Function, fSymbol?.flags);
    Assert.True(fSymbol === functionDeclaration.symbol);
    Assert.True(functionDeclaration.symbol?.valueDeclaration === functionDeclaration);

    // `x` lives in the block-scope locals of f's body block, BlockScopedVariable.
    const body = functionDeclaration.body!;
    const xVariableStatement = body.statements[0]!;
    if (!isVariableStatement(xVariableStatement)) throw new Exception("Expected variable statement");
    const xDeclaration = xVariableStatement.declarationList.declarations[0]!;
    const xSymbol = body.locals?.get("x");
    Assert.Equal(SymbolFlags.BlockScopedVariable, xSymbol?.flags);
    Assert.True(xSymbol === getSymbol(xDeclaration));

    // Parent pointers are populated in place along the chain.
    Assert.True(functionDeclaration.parent === sourceFile);
    Assert.True(body.parent === functionDeclaration);
    Assert.True(xVariableStatement.parent === body);
    Assert.True(xDeclaration.parent === xVariableStatement.declarationList);
  }
}

A<BinderGroundworkTests>().method((t) => t.binds_source_file_variables_and_function_declarations_into_symbol_tables).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.uses_block_scope_for_let_const_and_function_scope_for_var).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.diagnoses_duplicate_block_scoped_declarations_without_rejecting_valid_var_redeclarations).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.binds_imported_names_as_aliases).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.binds_class_interface_and_type_alias_declarations_with_ts_go_symbol_meanings).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.binds_loop_declaration_initializers_into_the_loop_lexical_scope).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.binds_names_inside_object_and_array_binding_patterns).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.binds_function_f_let_x_gate_in_place).add(FactAttribute);
