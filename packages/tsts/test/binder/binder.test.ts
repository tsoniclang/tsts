import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  SymbolFlags,
  isClassDeclaration,
  isForStatement,
  isFunctionDeclaration,
  isInterfaceDeclaration,
  isTypeAliasDeclaration,
  isVariableStatement,
} from "../../src/ast/index.js";
import { bindSourceFile, getSymbol, lookupSymbol } from "../../src/binder/index.js";
import { parseSourceFile } from "../../src/parser/index.js";

describe("TS-Go binder groundwork", () => {
  it("binds source-file variables and function declarations into symbol tables", () => {
    const sourceFile = parseSourceFile("const answer = 42; function add(a: number, b: number): number { return a + b; }");
    const result = bindSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
    assert.equal(lookupSymbol(result.globals, "answer")?.flags, SymbolFlags.BlockScopedVariable);
    assert.equal(lookupSymbol(result.globals, "add")?.flags, SymbolFlags.Function);

    const variableStatement = sourceFile.statements[0]!;
    if (!isVariableStatement(variableStatement)) throw new Error("Expected variable statement");
    const variableSymbol = getSymbol(result, variableStatement.declarationList.declarations[0]!);
    assert.equal(variableSymbol?.name, "answer");

    const functionDeclaration = sourceFile.statements[1]!;
    if (!isFunctionDeclaration(functionDeclaration)) throw new Error("Expected function declaration");
    const functionLocals = result.locals.get(functionDeclaration);
    assert.notEqual(functionLocals, undefined);
    assert.equal(functionLocals?.get("a")?.flags, SymbolFlags.FunctionScopedVariable);
    assert.equal(functionLocals?.get("b")?.flags, SymbolFlags.FunctionScopedVariable);
  });

  it("uses block scope for let/const declarations and function scope for var declarations", () => {
    const sourceFile = parseSourceFile("function f(a: number) { var hoisted = a; { const local = hoisted; } }");
    const result = bindSourceFile(sourceFile);
    const functionDeclaration = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(functionDeclaration)) throw new Error("Expected function declaration");

    const functionLocals = result.locals.get(functionDeclaration);
    assert.equal(functionLocals?.get("hoisted")?.flags, SymbolFlags.FunctionScopedVariable);

    const nestedBlock = functionDeclaration.body!.statements[1]!;
    const blockLocals = result.locals.get(nestedBlock);
    assert.equal(blockLocals?.get("local")?.flags, SymbolFlags.BlockScopedVariable);
    assert.equal(functionLocals?.has("local"), false);
  });

  it("diagnoses duplicate block-scoped declarations without rejecting valid var redeclarations", () => {
    const blockScoped = bindSourceFile(parseSourceFile("let x; const x = 1;"));
    const functionScoped = bindSourceFile(parseSourceFile("var y; var y;"));

    assert.deepEqual(blockScoped.diagnostics.map(diagnostic => diagnostic.message), ["Duplicate identifier 'x'."]);
    assert.equal(functionScoped.diagnostics.length, 0);
  });

  it("binds imported names as aliases", () => {
    const sourceFile = parseSourceFile("import value, { dep as renamed } from \"./dep\";");
    const result = bindSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
    assert.equal(lookupSymbol(result.globals, "value")?.flags, SymbolFlags.Alias);
    assert.equal(lookupSymbol(result.globals, "renamed")?.flags, SymbolFlags.Alias);
  });

  it("binds class, interface, and type alias declarations with TS-Go symbol meanings", () => {
    const sourceFile = parseSourceFile("class Box { value: string; } interface Named { value: string; } type Alias = Named;");
    const result = bindSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
    assert.equal(lookupSymbol(result.globals, "Box")?.flags, SymbolFlags.Class);
    assert.equal(lookupSymbol(result.globals, "Named")?.flags, SymbolFlags.Interface);
    assert.equal(lookupSymbol(result.globals, "Alias")?.flags, SymbolFlags.TypeAlias);

    const classDeclaration = sourceFile.statements[0]!;
    const interfaceDeclaration = sourceFile.statements[1]!;
    const typeAliasDeclaration = sourceFile.statements[2]!;
    assert.equal(isClassDeclaration(classDeclaration), true);
    assert.equal(isInterfaceDeclaration(interfaceDeclaration), true);
    assert.equal(isTypeAliasDeclaration(typeAliasDeclaration), true);
    assert.notEqual(result.locals.get(classDeclaration), undefined);
    assert.notEqual(result.locals.get(interfaceDeclaration), undefined);
  });

  it("binds loop declaration initializers into the loop lexical scope", () => {
    const sourceFile = parseSourceFile("for (let index = 0; index < 1; index += 1) { const local = index; }");
    const result = bindSourceFile(sourceFile);
    const forStatement = sourceFile.statements[0]!;

    assert.equal(result.diagnostics.length, 0);
    assert.equal(lookupSymbol(result.globals, "index"), undefined);
    assert.equal(isForStatement(forStatement), true);
    if (!isForStatement(forStatement)) throw new Error("Expected for statement");
    assert.equal(result.locals.get(forStatement)?.get("index")?.flags, SymbolFlags.BlockScopedVariable);
  });

  it("binds names inside object and array binding patterns", () => {
    const sourceFile = parseSourceFile("const { id, name: label, ...rest } = item; function f([first, second]: string[]) { return first; }");
    const result = bindSourceFile(sourceFile);
    const functionDeclaration = sourceFile.statements[1]!;
    if (!isFunctionDeclaration(functionDeclaration)) throw new Error("Expected function declaration");
    const functionLocals = result.locals.get(functionDeclaration);

    assert.equal(result.diagnostics.length, 0);
    assert.equal(lookupSymbol(result.globals, "id")?.flags, SymbolFlags.BlockScopedVariable);
    assert.equal(lookupSymbol(result.globals, "label")?.flags, SymbolFlags.BlockScopedVariable);
    assert.equal(lookupSymbol(result.globals, "rest")?.flags, SymbolFlags.BlockScopedVariable);
    assert.equal(functionLocals?.get("first")?.flags, SymbolFlags.FunctionScopedVariable);
    assert.equal(functionLocals?.get("second")?.flags, SymbolFlags.FunctionScopedVariable);
  });
});
