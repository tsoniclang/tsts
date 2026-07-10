// Mirror of internal/checker/checker_test.go (TestGetSymbolAtLocation).
// BenchmarkNewChecker is a Go benchmark and has no mirror.
import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../../go/scalars.js";
import type { GoPtr } from "../../go/compat.js";
import { Background } from "../../go/context.js";
import type { Node } from "../ast/spine.js";
import { Node_Name } from "../ast/spine.js";
import { Node_Expression, Node_Members, Node_Parameters, Node_Symbol } from "../ast/ast.js";
import { AsVariableDeclarationList, AsVariableStatement } from "../ast/generated/casts.js";
import { InternalSymbolNameMissing } from "../ast/symbol.js";
import { LibPath, WrapFS } from "../bundled/bundled.js";
import { NewCompilerHost } from "../compiler/host.js";
import type { ProgramOptions } from "../compiler/program.js";
import { NewProgram, Program_BindSourceFiles, Program_GetSourceFile, Program_GetTypeChecker } from "../compiler/program.js";
import type { CompilerOptions } from "../core/compileroptions.js";
import { Checker_GetSymbolAtLocation, Checker_getDeclaredTypeOfSymbol, Checker_getSymbolIfSameReference, Checker_instantiateSymbol } from "./checker/symbols.js";
import { Checker_getApplicableIndexInfo } from "./checker/signatures.js";
import { isThisless } from "./checker/state.js";
import { Checker_getStringLiteralType } from "./checker/types.js";
import { newSimpleTypeMapper } from "./mapper.js";
import { canUsePropertyAccess } from "./nodebuilderimpl.js";
import { Type_AsInterfaceType } from "./types.js";
import type { ParseConfigHost } from "../tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../tsoptions/tsconfigparsing.js";
import { FromMap } from "../vfs/vfstest/vfstest.js";

function nodeAt(nodes: ReadonlyArray<GoPtr<Node>> | undefined, index: number): Node {
  assert.ok(nodes !== undefined, "Expected node list to be non-nil");
  const node = nodes[index];
  assert.ok(node !== undefined, `Expected node at index ${index}`);
  return node;
}

test("GetSymbolAtLocation", () => {
  const content = `interface Foo {
  bar: string;
}
declare const foo: Foo;
foo.bar;`;
  let fs = FromMap(new Map<string, string>([
    ["/foo.ts", content],
    ["/tsconfig.json", `
				{
					"compilerOptions": {},
					"files": ["foo.ts"]
				}
			`],
  ]), false as bool /*useCaseSensitiveFileNames*/);
  fs = WrapFS(fs);

  const cd = "/";
  const host = NewCompilerHost(cd, fs, LibPath(), undefined, undefined);

  const [parsed, errors] = GetParsedCommandLineOfConfigFile("/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((errors ?? []).length, 0, "Expected no errors in parsed command line");

  const p = NewProgram({
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions);
  Program_BindSourceFiles(p);
  const [c, done] = Program_GetTypeChecker(p, Background());
  try {
    assert.ok(c !== undefined, "Expected checker to be non-nil");
    const checker = c;
    assert.equal(checker.instantiationDepth, 0, "checker instantiationDepth should start at Go zero-value");
    assert.equal(checker.conditionalConstraintDepth, 0, "checker conditionalConstraintDepth should start at Go zero-value");
    assert.equal(checker.serializationLevel, 0, "checker serializationLevel should start at Go zero-value");
    assert.equal(checker.withinUnreachableCode, false, "checker withinUnreachableCode should start at Go zero-value");
    const file = Program_GetSourceFile(p, "/foo.ts");
    assert.ok(file !== undefined);
    const interfaceId = Node_Name(nodeAt(file.Statements?.Nodes, 0));
    const variableStatement = AsVariableStatement(nodeAt(file.Statements?.Nodes, 1));
    assert.ok(variableStatement !== undefined);
    const declarationList = AsVariableDeclarationList(variableStatement.DeclarationList);
    assert.ok(declarationList !== undefined);
    const varId = Node_Name(nodeAt(declarationList.Declarations?.Nodes, 0));
    const propAccess = Node_Expression(nodeAt(file.Statements?.Nodes, 2));
    const nodes: Array<GoPtr<Node>> = [interfaceId, varId, propAccess];
    for (const node of nodes) {
      const symbol = Checker_GetSymbolAtLocation(checker, node);
      assert.ok(symbol !== undefined, "Expected symbol to be non-nil");
    }
  } finally {
    done();
  }
});

test("this-only symbol instantiation reuses thisless parameters exactly", () => {
  let fs = FromMap(new Map<string, string>([
    ["/checker.ts", `
      class Container {
        method(value: string, owner: this): string {
          return value;
        }
      }
    `],
    ["/tsconfig.json", JSON.stringify({
      compilerOptions: { noLib: true },
      files: ["checker.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/", fs, LibPath(), undefined, undefined);
  const [parsed, errors] = GetParsedCommandLineOfConfigFile("/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((errors ?? []).length, 0);
  const program = NewProgram({ Config: parsed, Host: host } satisfies ProgramOptions);
  Program_BindSourceFiles(program);
  const [checker, done] = Program_GetTypeChecker(program, Background());
  try {
    assert.ok(checker !== undefined);
    const file = Program_GetSourceFile(program, "/checker.ts");
    assert.ok(file !== undefined);
    const classDeclaration = nodeAt(file.Statements?.Nodes, 0);
    const methodDeclaration = nodeAt(Node_Members(classDeclaration), 0);
    const parameters = Node_Parameters(methodDeclaration);
    const thislessParameter = nodeAt(parameters, 0);
    const thisfulParameter = nodeAt(parameters, 1);
    const classSymbol = Node_Symbol(classDeclaration);
    const thislessSymbol = Node_Symbol(thislessParameter);
    const thisfulSymbol = Node_Symbol(thisfulParameter);
    assert.ok(classSymbol !== undefined);
    assert.ok(thislessSymbol !== undefined);
    assert.ok(thisfulSymbol !== undefined);
    assert.equal(isThisless(thislessSymbol), true);
    assert.equal(isThisless(thisfulSymbol), false);

    const classType = Checker_getDeclaredTypeOfSymbol(checker, classSymbol);
    const thisType = Type_AsInterfaceType(classType)?.thisType;
    assert.ok(thisType !== undefined);
    const mapper = newSimpleTypeMapper(thisType, classType);
    assert.equal(Checker_instantiateSymbol(checker, thislessSymbol, mapper), thislessSymbol);
    const instantiatedThisfulSymbol = Checker_instantiateSymbol(checker, thisfulSymbol, mapper);
    assert.notEqual(instantiatedThisfulSymbol, thisfulSymbol);
    assert.equal(Checker_getSymbolIfSameReference(checker, thisfulSymbol, instantiatedThisfulSymbol), undefined);
    assert.equal(Checker_getSymbolIfSameReference(checker, thisfulSymbol, thisfulSymbol), thisfulSymbol);
  } finally {
    done();
  }
});

test("internal symbol names are not property-access identifiers", () => {
  assert.equal(canUsePropertyAccess(InternalSymbolNameMissing), false);
});

test("merged applicable index info remains synthetic and declarationless", () => {
  const content = [
    "interface MergedIndex {",
    "  [key: number]: string;",
    "  [key: `${number}`]: string;",
    "}",
  ].join("\n");
  let fs = FromMap(new Map<string, string>([
    ["/checker.ts", content],
    ["/tsconfig.json", JSON.stringify({
      compilerOptions: { noLib: true },
      files: ["checker.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/", fs, LibPath(), undefined, undefined);
  const [parsed, errors] = GetParsedCommandLineOfConfigFile("/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((errors ?? []).length, 0);
  const program = NewProgram({ Config: parsed, Host: host } satisfies ProgramOptions);
  Program_BindSourceFiles(program);
  const [checker, done] = Program_GetTypeChecker(program, Background());
  try {
    assert.ok(checker !== undefined);
    const file = Program_GetSourceFile(program, "/checker.ts");
    assert.ok(file !== undefined);
    const declaration = nodeAt(file.Statements?.Nodes, 0);
    const symbol = Node_Symbol(declaration);
    assert.ok(symbol !== undefined);
    const type = Checker_getDeclaredTypeOfSymbol(checker, symbol);
    const info = Checker_getApplicableIndexInfo(checker, type, Checker_getStringLiteralType(checker, "1"));
    assert.ok(info !== undefined);
    assert.equal(info.keyType, checker.unknownType);
    assert.equal(info.declaration, undefined);
  } finally {
    done();
  }
});
