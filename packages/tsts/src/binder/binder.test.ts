import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Exception } from "@tsonic/dotnet/System.js";

import {
  Kind,
  SymbolFlags,
  isBlock,
  isClassDeclaration,
  isExportDeclaration,
  isForStatement,
  isFunctionDeclaration,
  isImportDeclaration,
  isInterfaceDeclaration,
  isNamedExports,
  isNamedImports,
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

    // Faithful declareSymbolEx (binder.go:221-285): a block-scoped redeclaration
    // emits Cannot_redeclare_block_scoped_variable_0 on the prior declaration(s)
    // AND on the conflicting one — two diagnostics for `let x; const x;`.
    Assert.Equal<readonly string[]>(
      ["Cannot redeclare block-scoped variable 'x'.", "Cannot redeclare block-scoped variable 'x'."],
      blockScoped.map((d) => d.message),
    );
    // `var y; var y;` is a compatible function-scoped merge — no diagnostic.
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
    // Faithful GetContainerFlags: a class is IsContainer but NOT HasLocals
    // (binder.go:2570), so its instance members live on the class symbol's
    // members table — not on node.locals (which holds only type-parameter scope,
    // unallocated here as Box has none).
    Assert.NotNull(classDeclaration.symbol?.members);
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

  // codex-021307 M4a GATE (faithful under M4b): `function f() { let x = 1; }`
  // must bind in place — sourceFile.locals contains `f`; f's container locals
  // contain `x` (BlockScopedVariable); declaration `symbol` slots populated;
  // parents set. M4b uses the real GetContainerFlags: a Block parented by a
  // function-like is ContainerFlagsNone (binder.go:2602-2604), so the function
  // BODY shares the function's locals — `x` lands in f.locals, and f.body has no
  // locals table of its own (the M4a interim binder created a body-block table;
  // the faithful binder does not).
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

    // `x` lives in f's function locals (the body block shares the function
    // scope), BlockScopedVariable.
    const body = functionDeclaration.body!;
    const xVariableStatement = body.statements[0]!;
    if (!isVariableStatement(xVariableStatement)) throw new Exception("Expected variable statement");
    const xDeclaration = xVariableStatement.declarationList.declarations[0]!;
    const xSymbol = functionDeclaration.locals?.get("x");
    Assert.Equal(SymbolFlags.BlockScopedVariable, xSymbol?.flags);
    Assert.True(xSymbol === getSymbol(xDeclaration));
    // The function body Block is NOT its own block-scoped container.
    Assert.Null(body.locals);

    // Parent pointers are populated in place along the chain.
    Assert.True(functionDeclaration.parent === sourceFile);
    Assert.True(body.parent === functionDeclaration);
    Assert.True(xVariableStatement.parent === body);
    Assert.True(xDeclaration.parent === xVariableStatement.declarationList);
  }

  // codex-024359 M4b ACCEPTANCE A: function var/let scoping with a nested block.
  // `function f() { var shared = 1; let scoped = 2; { let scoped = 3; } }`
  //   - `f` in sourceFile.locals
  //   - `shared` FUNCTION-scoped → f's container locals (NOT a body-block table)
  //   - outer `scoped` (let) → f's container locals (the function body block
  //     shares the function scope; GetContainerFlags(Block parented by fn) = None)
  //   - inner `scoped` (let) → the INNER block's own locals (that block is parented
  //     by the body block, so it IS a block-scoped container)
  //   - the two `scoped` are DISTINCT symbols, no false duplicate.
  binds_function_var_let_block_scopes_with_distinct_inner_let(): void {
    const sourceFile = parseSourceFile("function f() { var shared = 1; let scoped = 2; { let scoped = 3; } }");
    const diagnostics = bindSourceFile(sourceFile);

    Assert.Equal(0, diagnostics.length);
    Assert.NotNull(sourceFile.locals);
    Assert.NotNull(lookupSymbol(sourceFile.locals!, "f"));

    const functionDeclaration = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(functionDeclaration)) throw new Exception("Expected function declaration");
    const functionLocals = functionDeclaration.locals!;
    Assert.NotNull(functionLocals);

    // `shared` is function-scoped, in the function's locals.
    Assert.Equal(SymbolFlags.FunctionScopedVariable, functionLocals.get("shared")?.flags);
    // Outer `scoped` (let) is block-scoped but its nearest block-scope container
    // is the function (the body block shares the function scope).
    const outerScoped = functionLocals.get("scoped");
    Assert.Equal(SymbolFlags.BlockScopedVariable, outerScoped?.flags);

    // The function body block is not its own locals container.
    const body = functionDeclaration.body!;
    Assert.Null(body.locals);

    // The inner `{ let scoped = 3; }` block IS a block-scoped container.
    const innerBlock = body.statements[2]!;
    if (!isBlock(innerBlock)) throw new Exception("Expected inner block");
    const innerScoped = innerBlock.locals?.get("scoped");
    Assert.Equal(SymbolFlags.BlockScopedVariable, innerScoped?.flags);

    // The two `scoped` are distinct symbols — no false duplicate diagnostic.
    Assert.NotNull(outerScoped);
    Assert.NotNull(innerScoped);
    Assert.True(outerScoped !== innerScoped);
  }

  // codex-024359 M4b ACCEPTANCE B: class static vs instance member routing.
  // `class C { static s = 1; m() { return C.s; } }`
  //   - `C` in sourceFile.locals
  //   - static `s` → C.symbol.exports (declareClassMember: IsStatic → GetExports)
  //   - instance `m` → C.symbol.members (declareClassMember: GetMembers)
  //   - both have their own node.symbol; valueDeclaration points at the member.
  binds_class_static_member_to_exports_and_instance_member_to_members(): void {
    const sourceFile = parseSourceFile("class C { static s = 1; m() { return C.s; } }");
    const diagnostics = bindSourceFile(sourceFile);

    Assert.Equal(0, diagnostics.length);
    Assert.NotNull(sourceFile.locals);
    Assert.NotNull(lookupSymbol(sourceFile.locals!, "C"));

    const classDeclaration = sourceFile.statements[0]!;
    if (!isClassDeclaration(classDeclaration)) throw new Exception("Expected class declaration");
    const classSymbol = classDeclaration.symbol!;
    Assert.NotNull(classSymbol);

    // static `s` on the class symbol's EXPORTS, not its members.
    const staticS = classSymbol.exports?.get("s");
    Assert.Equal(SymbolFlags.Property, staticS?.flags);
    Assert.Null(classSymbol.members?.get("s"));

    // instance `m` on the class symbol's MEMBERS, not its exports.
    const instanceM = classSymbol.members?.get("m");
    Assert.Equal(SymbolFlags.Method, instanceM?.flags);
    Assert.Null(classSymbol.exports?.get("m"));

    // Each member declaration has its own node.symbol === the table entry, and the
    // value declaration points at the declaring member.
    const staticMember = classDeclaration.members[0]!;
    const instanceMember = classDeclaration.members[1]!;
    Assert.True(getSymbol(staticMember) === staticS);
    Assert.True(getSymbol(instanceMember) === instanceM);
    Assert.True(staticS?.valueDeclaration === staticMember);
    Assert.True(instanceM?.valueDeclaration === instanceMember);
  }

  // codex-032140 M4c ACCEPTANCE A: external-module detection + import/export alias
  // binding + the local↔export DUAL symbol link.
  //   import { value as localValue } from "./dep.js";
  //   export { localValue };
  //   - the file is an external module → sourceFile.symbol is set (a ValueModule)
  //   - sourceFile.locals.get("localValue") is an Alias whose declaration is the
  //     ImportSpecifier (imports route to locals, NOT to exports)
  //   - sourceFile.symbol.exports.get("localValue") is an Alias whose declaration
  //     is the ExportSpecifier (export-specifiers route to the module's exports)
  binds_import_and_export_aliases_with_external_module_symbol(): void {
    const sourceFile = parseSourceFile("import { value as localValue } from \"./dep.js\";\nexport { localValue };");
    const diagnostics = bindSourceFile(sourceFile);

    Assert.Equal(0, diagnostics.length);
    // External-module detection: the file got a module symbol (an Alias-free
    // ValueModule), and the parser flagged the external-module indicator.
    Assert.NotNull(sourceFile.externalModuleIndicator);
    Assert.NotNull(sourceFile.symbol);
    Assert.Equal(SymbolFlags.ValueModule, sourceFile.symbol?.flags);

    // The imported alias lives in the file's LOCALS, declared by the ImportSpecifier.
    Assert.NotNull(sourceFile.locals);
    const localAlias = lookupSymbol(sourceFile.locals!, "localValue");
    Assert.Equal(SymbolFlags.Alias, localAlias?.flags);
    const importDeclaration = sourceFile.statements[0]!;
    if (!isImportDeclaration(importDeclaration)) throw new Exception("Expected import declaration");
    const namedImports = importDeclaration.importClause!.namedBindings!;
    if (!isNamedImports(namedImports)) throw new Exception("Expected named imports");
    const importSpecifier = namedImports.elements[0]!;
    Assert.Equal(Kind.ImportSpecifier, importSpecifier.kind);
    Assert.Equal(1, localAlias?.declarations.length);
    Assert.True(localAlias?.declarations[0] === importSpecifier);

    // The export specifier lives in the MODULE's exports, declared by the
    // ExportSpecifier — a separate Alias symbol from the local import alias.
    const exportTable = sourceFile.symbol?.exports;
    Assert.NotNull(exportTable);
    const exportAlias = exportTable?.get("localValue");
    Assert.Equal(SymbolFlags.Alias, exportAlias?.flags);
    const exportDeclaration = sourceFile.statements[1]!;
    if (!isExportDeclaration(exportDeclaration)) throw new Exception("Expected export declaration");
    const namedExports = exportDeclaration.exportClause!;
    if (!isNamedExports(namedExports)) throw new Exception("Expected named exports");
    const exportSpecifier = namedExports.elements[0]!;
    Assert.Equal(Kind.ExportSpecifier, exportSpecifier.kind);
    Assert.Equal(1, exportAlias?.declarations.length);
    Assert.True(exportAlias?.declarations[0] === exportSpecifier);

    // The import alias (local) and the export alias are DISTINCT symbols.
    Assert.True(localAlias !== exportAlias);
  }

  // codex-032140 M4c ACCEPTANCE A (dual symbol): an `export const` produces a
  // local symbol AND an export symbol, linked via local.exportSymbol and the
  // node.localSymbol back-link (ExportableBase.LocalSymbol).
  //   export const exported = 1;
  binds_exported_const_with_local_export_dual_symbol_link(): void {
    const sourceFile = parseSourceFile("export const exported = 1;");
    const diagnostics = bindSourceFile(sourceFile);

    Assert.Equal(0, diagnostics.length);
    Assert.NotNull(sourceFile.symbol);

    // The local symbol is flagged ExportValue (declareModuleMember exportKind) and
    // lives in the file's locals; the export symbol carries the real flags. The
    // local is read directly (not via lookupSymbol, which filters by value/type/
    // namespace/alias meaning — ExportValue is none of those).
    const local = sourceFile.locals!.get("exported");
    Assert.Equal(SymbolFlags.ExportValue, local?.flags);
    const exported = sourceFile.symbol?.exports?.get("exported");
    Assert.Equal(SymbolFlags.BlockScopedVariable, exported?.flags);

    // The local↔export link is set both ways: local.exportSymbol === the export
    // symbol, and the declaration node's localSymbol back-link === the local.
    Assert.True(local?.exportSymbol === exported);
    const variableStatement = sourceFile.statements[0]!;
    if (!isVariableStatement(variableStatement)) throw new Exception("Expected variable statement");
    const variableDeclaration = variableStatement.declarationList.declarations[0]!;
    Assert.True(variableDeclaration.localSymbol === local);
  }

  // codex-032140 M4c ACCEPTANCE B: a module cannot have multiple default exports.
  //   export default 1;
  //   export default 2;
  // The second `export default <expr>` conflicts with the first under the
  // reserved name "default", emitting A_module_cannot_have_multiple_default_exports
  // on both the prior and the conflicting declaration.
  diagnoses_multiple_default_exports(): void {
    const diagnostics = bindSourceFile(parseSourceFile("export default 1;\nexport default 2;"));
    Assert.Equal<readonly string[]>(
      ["A module cannot have multiple default exports.", "A module cannot have multiple default exports."],
      diagnostics.map((d) => d.message),
    );
  }

  // codex-032140 M4c ACCEPTANCE C: faithful enum merge.
  //   enum E { A }
  //   enum E { B }
  // The two enum declarations merge into ONE symbol whose member table contains
  // both A and B — no spurious duplicate diagnostic.
  binds_merged_enum_declarations_without_duplicate(): void {
    const sourceFile = parseSourceFile("enum E { A } enum E { B }");
    const diagnostics = bindSourceFile(sourceFile);

    Assert.Equal(0, diagnostics.length);
    Assert.NotNull(sourceFile.locals);
    const enumSymbol = lookupSymbol(sourceFile.locals!, "E");
    Assert.Equal(SymbolFlags.RegularEnum, enumSymbol?.flags);
    // A single merged symbol with both declarations and both members.
    Assert.Equal(2, enumSymbol?.declarations.length);
    Assert.Equal(SymbolFlags.EnumMember, enumSymbol?.exports?.get("A")?.flags);
    Assert.Equal(SymbolFlags.EnumMember, enumSymbol?.exports?.get("B")?.flags);
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
A<BinderGroundworkTests>().method((t) => t.binds_function_var_let_block_scopes_with_distinct_inner_let).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.binds_class_static_member_to_exports_and_instance_member_to_members).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.binds_import_and_export_aliases_with_external_module_symbol).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.binds_exported_const_with_local_export_dual_symbol_link).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.diagnoses_multiple_default_exports).add(FactAttribute);
A<BinderGroundworkTests>().method((t) => t.binds_merged_enum_declarations_without_duplicate).add(FactAttribute);
