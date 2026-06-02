import test from "node:test";
import assert from "node:assert/strict";

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
  isMethodDeclaration,
  isPropertyDeclaration,
  isTypeAliasDeclaration,
  isVariableStatement,
} from "../ast/index.js";
import { bindSourceFile, getSymbol, lookupSymbol } from "./index.js";
import { parseSourceFile } from "../parser/index.js";

test("binds source file variables and function declarations into symbol tables", () => {
  const sourceFile = parseSourceFile("const answer = 42; function add(a: number, b: number): number { return a + b; }");
  const diagnostics = bindSourceFile(sourceFile);

  assert.strictEqual(diagnostics.length, 0);
  assert.notStrictEqual(sourceFile.locals, undefined);
  assert.strictEqual(lookupSymbol(sourceFile.locals!, "answer")?.flags, SymbolFlags.BlockScopedVariable);
  assert.strictEqual(lookupSymbol(sourceFile.locals!, "add")?.flags, SymbolFlags.Function);

  const variableStatement = sourceFile.statements[0]!;
  if (!isVariableStatement(variableStatement)) throw new Error("Expected variable statement");
  const variableDeclaration = variableStatement.declarationList.declarations[0]!;
  const variableSymbol = getSymbol(variableDeclaration);
  assert.strictEqual(variableSymbol?.name, "answer");
  // The in-place symbol slot and the source-file locals entry are the same object.
  assert.ok(lookupSymbol(sourceFile.locals!, "answer") === variableSymbol);
  // Parent pointers are populated during the bind walk.
  assert.ok(variableDeclaration.parent === variableStatement.declarationList);
  assert.ok(variableStatement.declarationList.parent === variableStatement);
  assert.ok(variableStatement.parent === sourceFile);

  const functionDeclaration = sourceFile.statements[1]!;
  if (!isFunctionDeclaration(functionDeclaration)) throw new Error("Expected function declaration");
  const functionLocals = functionDeclaration.locals;
  assert.notStrictEqual(functionLocals, undefined);
  assert.strictEqual(functionLocals?.get("a")?.flags, SymbolFlags.FunctionScopedVariable);
  assert.strictEqual(functionLocals?.get("b")?.flags, SymbolFlags.FunctionScopedVariable);
  // The function's own symbol lives in the source-file locals.
  assert.ok(lookupSymbol(sourceFile.locals!, "add") === functionDeclaration.symbol);
});

test("uses block scope for let const and function scope for var", () => {
  const sourceFile = parseSourceFile("function f(a: number) { var hoisted = a; { const local = hoisted; } }");
  bindSourceFile(sourceFile);
  const functionDeclaration = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(functionDeclaration)) throw new Error("Expected function declaration");

  const functionLocals = functionDeclaration.locals;
  assert.strictEqual(functionLocals?.get("hoisted")?.flags, SymbolFlags.FunctionScopedVariable);

  const nestedBlock = functionDeclaration.body!.statements[1]!;
  if (!isBlock(nestedBlock)) throw new Error("Expected nested block");
  assert.strictEqual(nestedBlock.locals?.get("local")?.flags, SymbolFlags.BlockScopedVariable);
  assert.ok(!(functionLocals?.has("local") ?? false));
});

test("diagnoses duplicate block scoped declarations without rejecting valid var redeclarations", () => {
  const blockScoped = bindSourceFile(parseSourceFile("let x; const x = 1;"));
  const functionScoped = bindSourceFile(parseSourceFile("var y; var y;"));

  // Faithful declareSymbolEx (binder.go:221-285): a block-scoped redeclaration
  // emits Cannot_redeclare_block_scoped_variable_0 on the prior declaration(s)
  // AND on the conflicting one — two diagnostics for `let x; const x;`.
  assert.deepStrictEqual(
    blockScoped.map((d) => d.message),
    ["Cannot redeclare block-scoped variable 'x'.", "Cannot redeclare block-scoped variable 'x'."],
  );
  // `var y; var y;` is a compatible function-scoped merge — no diagnostic.
  assert.strictEqual(functionScoped.length, 0);
});

test("binds imported names as aliases", () => {
  const sourceFile = parseSourceFile("import value, { dep as renamed } from \"./dep\";");
  const diagnostics = bindSourceFile(sourceFile);

  assert.strictEqual(diagnostics.length, 0);
  assert.notStrictEqual(sourceFile.locals, undefined);
  assert.strictEqual(lookupSymbol(sourceFile.locals!, "value")?.flags, SymbolFlags.Alias);
  assert.strictEqual(lookupSymbol(sourceFile.locals!, "renamed")?.flags, SymbolFlags.Alias);
});

test("binds class interface and type alias declarations with ts go symbol meanings", () => {
  const sourceFile = parseSourceFile("class Box { value: string; } interface Named { value: string; } type Alias = Named;");
  const diagnostics = bindSourceFile(sourceFile);

  assert.strictEqual(diagnostics.length, 0);
  assert.notStrictEqual(sourceFile.locals, undefined);
  assert.strictEqual(lookupSymbol(sourceFile.locals!, "Box")?.flags, SymbolFlags.Class);
  assert.strictEqual(lookupSymbol(sourceFile.locals!, "Named")?.flags, SymbolFlags.Interface);
  assert.strictEqual(lookupSymbol(sourceFile.locals!, "Alias")?.flags, SymbolFlags.TypeAlias);

  const classDeclaration = sourceFile.statements[0]!;
  const interfaceDeclaration = sourceFile.statements[1]!;
  const typeAliasDeclaration = sourceFile.statements[2]!;
  assert.ok(isClassDeclaration(classDeclaration));
  assert.ok(isInterfaceDeclaration(interfaceDeclaration));
  assert.ok(isTypeAliasDeclaration(typeAliasDeclaration));
  if (!isClassDeclaration(classDeclaration)) throw new Error("Expected class declaration");
  if (!isInterfaceDeclaration(interfaceDeclaration)) throw new Error("Expected interface declaration");
  // Faithful GetContainerFlags: a class is IsContainer but NOT HasLocals
  // (binder.go:2570), so its instance members live on the class symbol's
  // members table — not on node.locals (which holds only type-parameter scope,
  // unallocated here as Box has none).
  assert.notStrictEqual(classDeclaration.symbol?.members, undefined);
  assert.notStrictEqual(interfaceDeclaration.symbol?.members, undefined);
  // The class member `value` is bound onto the class symbol's member table.
  assert.strictEqual(classDeclaration.symbol?.members?.get("value")?.flags, SymbolFlags.Property);
  assert.strictEqual(interfaceDeclaration.symbol?.members?.get("value")?.flags, SymbolFlags.Property);
});

test("binds loop declaration initializers into the loop lexical scope", () => {
  const sourceFile = parseSourceFile("for (let index = 0; index < 1; index += 1) { const local = index; }");
  const diagnostics = bindSourceFile(sourceFile);
  const forStatement = sourceFile.statements[0]!;

  assert.strictEqual(diagnostics.length, 0);
  assert.notStrictEqual(sourceFile.locals, undefined);
  assert.strictEqual(lookupSymbol(sourceFile.locals!, "index"), undefined);
  assert.ok(isForStatement(forStatement));
  if (!isForStatement(forStatement)) throw new Error("Expected for statement");
  assert.strictEqual(forStatement.locals?.get("index")?.flags, SymbolFlags.BlockScopedVariable);
});

test("binds names inside object and array binding patterns", () => {
  const sourceFile = parseSourceFile("const { id, name: label, ...rest } = item; function f([first, second]: string[]) { return first; }");
  const diagnostics = bindSourceFile(sourceFile);
  const functionDeclaration = sourceFile.statements[1]!;
  if (!isFunctionDeclaration(functionDeclaration)) throw new Error("Expected function declaration");
  const functionLocals = functionDeclaration.locals;

  assert.strictEqual(diagnostics.length, 0);
  assert.notStrictEqual(sourceFile.locals, undefined);
  assert.strictEqual(lookupSymbol(sourceFile.locals!, "id")?.flags, SymbolFlags.BlockScopedVariable);
  assert.strictEqual(lookupSymbol(sourceFile.locals!, "label")?.flags, SymbolFlags.BlockScopedVariable);
  assert.strictEqual(lookupSymbol(sourceFile.locals!, "rest")?.flags, SymbolFlags.BlockScopedVariable);
  assert.strictEqual(functionLocals?.get("first")?.flags, SymbolFlags.FunctionScopedVariable);
  assert.strictEqual(functionLocals?.get("second")?.flags, SymbolFlags.FunctionScopedVariable);
});

// codex-021307 M4a GATE (faithful under M4b): `function f() { let x = 1; }`
// must bind in place — sourceFile.locals contains `f`; f's container locals
// contain `x` (BlockScopedVariable); declaration `symbol` slots populated;
// parents set. M4b uses the real GetContainerFlags: a Block parented by a
// function-like is ContainerFlagsNone (binder.go:2602-2604), so the function
// BODY shares the function's locals — `x` lands in f.locals, and f.body has no
// locals table of its own (the M4a interim binder created a body-block table;
// the faithful binder does not).
test("binds function f let x gate in place", () => {
  const sourceFile = parseSourceFile("function f() { let x = 1; }");
  const diagnostics = bindSourceFile(sourceFile);

  assert.strictEqual(diagnostics.length, 0);
  assert.notStrictEqual(sourceFile.locals, undefined);
  const functionDeclaration = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(functionDeclaration)) throw new Error("Expected function declaration");

  // sourceFile.locals contains `f`, and it is the same object as f.symbol.
  const fSymbol = lookupSymbol(sourceFile.locals!, "f");
  assert.strictEqual(fSymbol?.flags, SymbolFlags.Function);
  assert.ok(fSymbol === functionDeclaration.symbol);
  assert.ok(functionDeclaration.symbol?.valueDeclaration === functionDeclaration);

  // `x` lives in f's function locals (the body block shares the function
  // scope), BlockScopedVariable.
  const body = functionDeclaration.body!;
  const xVariableStatement = body.statements[0]!;
  if (!isVariableStatement(xVariableStatement)) throw new Error("Expected variable statement");
  const xDeclaration = xVariableStatement.declarationList.declarations[0]!;
  const xSymbol = functionDeclaration.locals?.get("x");
  assert.strictEqual(xSymbol?.flags, SymbolFlags.BlockScopedVariable);
  assert.ok(xSymbol === getSymbol(xDeclaration));
  // The function body Block is NOT its own block-scoped container.
  assert.strictEqual(body.locals, undefined);

  // Parent pointers are populated in place along the chain.
  assert.ok(functionDeclaration.parent === sourceFile);
  assert.ok(body.parent === functionDeclaration);
  assert.ok(xVariableStatement.parent === body);
  assert.ok(xDeclaration.parent === xVariableStatement.declarationList);
});

// codex-024359 M4b ACCEPTANCE A: function var/let scoping with a nested block.
// `function f() { var shared = 1; let scoped = 2; { let scoped = 3; } }`
//   - `f` in sourceFile.locals
//   - `shared` FUNCTION-scoped → f's container locals (NOT a body-block table)
//   - outer `scoped` (let) → f's container locals (the function body block
//     shares the function scope; GetContainerFlags(Block parented by fn) = None)
//   - inner `scoped` (let) → the INNER block's own locals (that block is parented
//     by the body block, so it IS a block-scoped container)
//   - the two `scoped` are DISTINCT symbols, no false duplicate.
test("binds function var let block scopes with distinct inner let", () => {
  const sourceFile = parseSourceFile("function f() { var shared = 1; let scoped = 2; { let scoped = 3; } }");
  const diagnostics = bindSourceFile(sourceFile);

  assert.strictEqual(diagnostics.length, 0);
  assert.notStrictEqual(sourceFile.locals, undefined);
  assert.notStrictEqual(lookupSymbol(sourceFile.locals!, "f"), undefined);

  const functionDeclaration = sourceFile.statements[0]!;
  if (!isFunctionDeclaration(functionDeclaration)) throw new Error("Expected function declaration");
  const functionLocals = functionDeclaration.locals!;
  assert.notStrictEqual(functionLocals, undefined);

  // `shared` is function-scoped, in the function's locals.
  assert.strictEqual(functionLocals.get("shared")?.flags, SymbolFlags.FunctionScopedVariable);
  // Outer `scoped` (let) is block-scoped but its nearest block-scope container
  // is the function (the body block shares the function scope).
  const outerScoped = functionLocals.get("scoped");
  assert.strictEqual(outerScoped?.flags, SymbolFlags.BlockScopedVariable);

  // The function body block is not its own locals container.
  const body = functionDeclaration.body!;
  assert.strictEqual(body.locals, undefined);

  // The inner `{ let scoped = 3; }` block IS a block-scoped container.
  const innerBlock = body.statements[2]!;
  if (!isBlock(innerBlock)) throw new Error("Expected inner block");
  const innerScoped = innerBlock.locals?.get("scoped");
  assert.strictEqual(innerScoped?.flags, SymbolFlags.BlockScopedVariable);

  // The two `scoped` are distinct symbols — no false duplicate diagnostic.
  assert.notStrictEqual(outerScoped, undefined);
  assert.notStrictEqual(innerScoped, undefined);
  assert.ok(outerScoped !== innerScoped);
});

// codex-024359 M4b ACCEPTANCE B: class static vs instance member routing.
// `class C { static s = 1; m() { return C.s; } }`
//   - `C` in sourceFile.locals
//   - static `s` → C.symbol.exports (declareClassMember: IsStatic → GetExports)
//   - instance `m` → C.symbol.members (declareClassMember: GetMembers)
//   - both have their own node.symbol; valueDeclaration points at the member.
test("binds class static member to exports and instance member to members", () => {
  const sourceFile = parseSourceFile("class C { static s = 1; m() { return C.s; } }");
  const diagnostics = bindSourceFile(sourceFile);

  assert.strictEqual(diagnostics.length, 0);
  assert.notStrictEqual(sourceFile.locals, undefined);
  assert.notStrictEqual(lookupSymbol(sourceFile.locals!, "C"), undefined);

  const classDeclaration = sourceFile.statements[0]!;
  if (!isClassDeclaration(classDeclaration)) throw new Error("Expected class declaration");
  const classSymbol = classDeclaration.symbol!;
  assert.notStrictEqual(classSymbol, undefined);

  // static `s` on the class symbol's EXPORTS, not its members.
  const staticS = classSymbol.exports?.get("s");
  assert.strictEqual(staticS?.flags, SymbolFlags.Property);
  assert.strictEqual(classSymbol.members?.get("s"), undefined);

  // instance `m` on the class symbol's MEMBERS, not its exports.
  const instanceM = classSymbol.members?.get("m");
  assert.strictEqual(instanceM?.flags, SymbolFlags.Method);
  assert.strictEqual(classSymbol.exports?.get("m"), undefined);

  // Each member declaration has its own node.symbol === the table entry, and the
  // value declaration points at the declaring member.
  const staticMember = classDeclaration.members[0]!;
  const instanceMember = classDeclaration.members[1]!;
  if (!isPropertyDeclaration(staticMember)) throw new Error("Expected static property");
  if (!isMethodDeclaration(instanceMember)) throw new Error("Expected instance method");
  assert.ok(getSymbol(staticMember) === staticS);
  assert.ok(getSymbol(instanceMember) === instanceM);
  assert.ok(staticS?.valueDeclaration === staticMember);
  assert.ok(instanceM?.valueDeclaration === instanceMember);
});

// codex-032140 M4c ACCEPTANCE A: external-module detection + import/export alias
// binding + the local↔export DUAL symbol link.
//   import { value as localValue } from "./dep.js";
//   export { localValue };
//   - the file is an external module → sourceFile.symbol is set (a ValueModule)
//   - sourceFile.locals.get("localValue") is an Alias whose declaration is the
//     ImportSpecifier (imports route to locals, NOT to exports)
//   - sourceFile.symbol.exports.get("localValue") is an Alias whose declaration
//     is the ExportSpecifier (export-specifiers route to the module's exports)
test("binds import and export aliases with external module symbol", () => {
  const sourceFile = parseSourceFile("import { value as localValue } from \"./dep.js\";\nexport { localValue };");
  const diagnostics = bindSourceFile(sourceFile);

  assert.strictEqual(diagnostics.length, 0);
  // External-module detection: the file got a module symbol (an Alias-free
  // ValueModule), and the parser flagged the external-module indicator.
  assert.notStrictEqual(sourceFile.externalModuleIndicator, undefined);
  assert.notStrictEqual(sourceFile.symbol, undefined);
  assert.strictEqual(sourceFile.symbol?.flags, SymbolFlags.ValueModule);

  // The imported alias lives in the file's LOCALS, declared by the ImportSpecifier.
  assert.notStrictEqual(sourceFile.locals, undefined);
  const localAlias = lookupSymbol(sourceFile.locals!, "localValue");
  assert.strictEqual(localAlias?.flags, SymbolFlags.Alias);
  const importDeclaration = sourceFile.statements[0]!;
  if (!isImportDeclaration(importDeclaration)) throw new Error("Expected import declaration");
  const namedImports = importDeclaration.importClause!.namedBindings!;
  if (!isNamedImports(namedImports)) throw new Error("Expected named imports");
  const importSpecifier = namedImports.elements[0]!;
  assert.strictEqual(importSpecifier.kind, Kind.ImportSpecifier);
  assert.strictEqual(localAlias?.declarations.length, 1);
  assert.ok(localAlias?.declarations[0] === importSpecifier);

  // The export specifier lives in the MODULE's exports, declared by the
  // ExportSpecifier — a separate Alias symbol from the local import alias.
  const exportTable = sourceFile.symbol?.exports;
  assert.notStrictEqual(exportTable, undefined);
  const exportAlias = exportTable?.get("localValue");
  assert.strictEqual(exportAlias?.flags, SymbolFlags.Alias);
  const exportDeclaration = sourceFile.statements[1]!;
  if (!isExportDeclaration(exportDeclaration)) throw new Error("Expected export declaration");
  const namedExports = exportDeclaration.exportClause!;
  if (!isNamedExports(namedExports)) throw new Error("Expected named exports");
  const exportSpecifier = namedExports.elements[0]!;
  assert.strictEqual(exportSpecifier.kind, Kind.ExportSpecifier);
  assert.strictEqual(exportAlias?.declarations.length, 1);
  assert.ok(exportAlias?.declarations[0] === exportSpecifier);

  // The import alias (local) and the export alias are DISTINCT symbols.
  assert.ok(localAlias !== exportAlias);
});

// codex-032140 M4c ACCEPTANCE A (dual symbol): an `export const` produces a
// local symbol AND an export symbol, linked via local.exportSymbol and the
// node.localSymbol back-link (ExportableBase.LocalSymbol).
//   export const exported = 1;
test("binds exported const with local export dual symbol link", () => {
  const sourceFile = parseSourceFile("export const exported = 1;");
  const diagnostics = bindSourceFile(sourceFile);

  assert.strictEqual(diagnostics.length, 0);
  assert.notStrictEqual(sourceFile.symbol, undefined);

  // The local symbol is flagged ExportValue (declareModuleMember exportKind) and
  // lives in the file's locals; the export symbol carries the real flags. The
  // local is read directly (not via lookupSymbol, which filters by value/type/
  // namespace/alias meaning — ExportValue is none of those).
  const local = sourceFile.locals!.get("exported");
  assert.strictEqual(local?.flags, SymbolFlags.ExportValue);
  const exported = sourceFile.symbol?.exports?.get("exported");
  assert.strictEqual(exported?.flags, SymbolFlags.BlockScopedVariable);

  // The local↔export link is set both ways: local.exportSymbol === the export
  // symbol, and the declaration node's localSymbol back-link === the local.
  assert.ok(local?.exportSymbol === exported);
  const variableStatement = sourceFile.statements[0]!;
  if (!isVariableStatement(variableStatement)) throw new Error("Expected variable statement");
  const variableDeclaration = variableStatement.declarationList.declarations[0]!;
  assert.ok(variableDeclaration.localSymbol === local);
});

// codex-032140 M4c ACCEPTANCE B: a module cannot have multiple default exports.
//   export default 1;
//   export default 2;
// The second `export default <expr>` conflicts with the first under the
// reserved name "default", emitting A_module_cannot_have_multiple_default_exports
// on both the prior and the conflicting declaration.
test("diagnoses multiple default exports", () => {
  const diagnostics = bindSourceFile(parseSourceFile("export default 1;\nexport default 2;"));
  assert.deepStrictEqual(
    diagnostics.map((d) => d.message),
    ["A module cannot have multiple default exports.", "A module cannot have multiple default exports."],
  );
});

// codex-032140 M4c ACCEPTANCE C: faithful enum merge.
//   enum E { A }
//   enum E { B }
// The two enum declarations merge into ONE symbol whose member table contains
// both A and B — no spurious duplicate diagnostic.
test("binds merged enum declarations without duplicate", () => {
  const sourceFile = parseSourceFile("enum E { A } enum E { B }");
  const diagnostics = bindSourceFile(sourceFile);

  assert.strictEqual(diagnostics.length, 0);
  assert.notStrictEqual(sourceFile.locals, undefined);
  const enumSymbol = lookupSymbol(sourceFile.locals!, "E");
  assert.strictEqual(enumSymbol?.flags, SymbolFlags.RegularEnum);
  // A single merged symbol with both declarations and both members.
  assert.strictEqual(enumSymbol?.declarations.length, 2);
  assert.strictEqual(enumSymbol?.exports?.get("A")?.flags, SymbolFlags.EnumMember);
  assert.strictEqual(enumSymbol?.exports?.get("B")?.flags, SymbolFlags.EnumMember);
});
