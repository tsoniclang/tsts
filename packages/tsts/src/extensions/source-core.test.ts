import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "@tsonic/core/types.js";
import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import {
  Node_Arguments,
  Node_Elements,
  Node_Expression,
  Node_ImportClause,
  Node_ModuleSpecifier,
  Node_PropertyName,
  Node_Statements,
  Node_Symbol,
  Node_Text,
  Node_Type,
  SourceFile_FileName,
} from "../internal/ast/ast.js";
import { Node_ForEachChild, Node_Name } from "../internal/ast/spine.js";
import { AsExportDeclaration, AsImportClause, AsNamespaceImport, AsQualifiedName, AsTypeReferenceNode } from "../internal/ast/generated/casts.js";
import {
  KindExportDeclaration,
  KindCallExpression,
  KindImportDeclaration,
  KindNamedImports,
  KindNamedExports,
  KindNamespaceImport,
  KindQualifiedName,
  KindTypeAliasDeclaration,
  KindTypeReference,
} from "../internal/ast/generated/kinds.js";
import { LibPath, WrapFS } from "../internal/bundled/bundled.js";
import type { CompilerOptions } from "../internal/core/compileroptions.js";
import { NewCompilerHost } from "../internal/compiler/host.js";
import {
  NewProgram,
  Program_BindSourceFiles,
  Program_GetProgramDiagnostics,
  Program_GetSemanticDiagnostics,
  Program_GetSourceFile,
  Program_GetSyntacticDiagnostics,
} from "../internal/compiler/program.js";
import type { Program, ProgramOptions } from "../internal/compiler/program.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import {
  attachExtensionHost,
  argumentPassingFactKey,
  canonicalIdentityFactKey,
  createExtensionConsumerQueries,
  createSourceCoreExtension,
  finalizeExtensionSemantics,
  flowStateFactKey,
  functionPointerFactKey,
  pointerFactKey,
  sourcePrimitiveFactKey,
} from "./index.js";
import { Diagnostic_Code, Diagnostic_String } from "../internal/ast/diagnostic.js";
import type { ExtendedProgram } from "./index.js";

test("source-core records primitive facts from canonical named imports", () => {
  const { extended, program, index } = createProgram(`
    import type { int as i32, long } from "@tsonic/core/types.js";

    let left!: i32;
    let right!: long;
  `);

  assertCleanProgram(program, index);
  Program_BindSourceFiles(program);

  const i32Specifier = getNamedImportSpecifier(index, "i32");
  const i32Symbol = Node_Symbol(i32Specifier);
  assert.ok(i32Symbol !== undefined);

  assert.equal(extended.extensionHost.facts.get(i32Specifier, sourcePrimitiveFactKey)?.kind, "int32");
  assert.equal(extended.extensionHost.facts.get(i32Specifier, sourcePrimitiveFactKey)?.width, 32);
  assert.equal(extended.extensionHost.facts.get(i32Symbol, sourcePrimitiveFactKey)?.runtimeBase, "number");
  assert.equal(extended.extensionHost.facts.get(i32Symbol, canonicalIdentityFactKey)?.exportName, "int");
  assert.equal(extended.extensionHost.facts.get(i32Symbol, canonicalIdentityFactKey)?.id, "@tsonic/core/types.js::int");

  const longSpecifier = getNamedImportSpecifier(index, "long");
  const longSymbol = Node_Symbol(longSpecifier);
  assert.ok(longSymbol !== undefined);
  assert.equal(extended.extensionHost.facts.get(longSymbol, sourcePrimitiveFactKey)?.kind, "int64");
  assert.equal(extended.extensionHost.facts.get(longSymbol, sourcePrimitiveFactKey)?.runtimeBase, "bigint");

  assert.equal(finalizeExtensionSemantics(extended.program), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "test-consumer");
  assert.equal(consumer.getSourcePrimitiveFact(i32Symbol)?.kind, "int32");
  assert.equal(consumer.getSourcePrimitiveFact(longSymbol)?.kind, "int64");
});

test("source-core does not guess primitives from local names or unrelated modules", () => {
  const { extended, program, index } = createProgram(`
    import type { int } from "./local.js";

    type shadowedInt = int;
    type uint = string;
  `, new Map([
    ["/src/local.ts", "export type int = string;"],
  ]));

  assertCleanProgram(program, index);
  Program_BindSourceFiles(program);

  const unrelatedImport = getNamedImportSpecifier(index, "int");
  const unrelatedImportSymbol = Node_Symbol(unrelatedImport);
  assert.ok(unrelatedImportSymbol !== undefined);
  assert.equal(extended.extensionHost.facts.get(unrelatedImportSymbol, sourcePrimitiveFactKey), undefined);
  assert.equal(extended.extensionHost.facts.get(unrelatedImportSymbol, canonicalIdentityFactKey), undefined);

  const localUint = getTopLevelDeclaration(index, KindTypeAliasDeclaration, "uint");
  const localUintSymbol = Node_Symbol(localUint);
  assert.ok(localUintSymbol !== undefined);
  assert.equal(extended.extensionHost.facts.get(localUintSymbol, sourcePrimitiveFactKey), undefined);
});

test("source-core records namespace import identity without manufacturing primitive facts", () => {
  const { extended, program, index } = createProgram(`
    import type * as core from "@tsonic/core/types.js";

    let value!: core.int;
  `);

  assertCleanProgram(program, index);
  Program_BindSourceFiles(program);

  const namespaceImport = getNamespaceImport(index, "@tsonic/core/types.js");
  const namespaceSymbol = Node_Symbol(namespaceImport);
  assert.ok(namespaceSymbol !== undefined);

  assert.equal(extended.extensionHost.facts.get(namespaceSymbol, canonicalIdentityFactKey)?.kind, "module");
  assert.equal(extended.extensionHost.facts.get(namespaceSymbol, canonicalIdentityFactKey)?.id, "@tsonic/core/types.js");
  assert.equal(extended.extensionHost.facts.get(namespaceSymbol, sourcePrimitiveFactKey), undefined);
});

test("source-core records primitive facts on type references from explicit source-core imports", () => {
  const { extended, program, index } = createProgram(`
    import type { int as i32 } from "@tsonic/core/types.js";
    import type * as core from "@tsonic/core/types.js";

    type Direct = i32;
    type Namespaced = core.uint;
  `);

  assertCleanProgram(program, index);
  Program_BindSourceFiles(program);

  const directReference = getTypeAliasType(index, "Direct");
  assert.equal(directReference?.Kind, KindTypeReference);
  assert.equal(extended.extensionHost.facts.get(directReference, sourcePrimitiveFactKey)?.kind, "int32");
  assert.equal(extended.extensionHost.facts.get(AsTypeReferenceNode(directReference)!.TypeName, canonicalIdentityFactKey)?.id, "@tsonic/core/types.js::int");

  const namespacedReference = getTypeAliasType(index, "Namespaced");
  assert.equal(namespacedReference?.Kind, KindTypeReference);
  const namespacedTypeName = AsTypeReferenceNode(namespacedReference)!.TypeName;
  assert.equal(namespacedTypeName?.Kind, KindQualifiedName);
  assert.equal(extended.extensionHost.facts.get(namespacedReference, sourcePrimitiveFactKey)?.kind, "uint32");
  assert.equal(extended.extensionHost.facts.get(namespacedTypeName, canonicalIdentityFactKey)?.id, "@tsonic/core/types.js::uint");
  assert.equal(extended.extensionHost.facts.get(AsQualifiedName(namespacedTypeName)!.Right, sourcePrimitiveFactKey)?.kind, "uint32");
});

test("source-core fact resolver returns primitive type-reference facts from canonical imports", () => {
  const { extended, program, index } = createProgram(`
    import type { int } from "@tsonic/core/types.js";

    type Direct = int;
  `);

  assertCleanProgram(program, index);
  Program_BindSourceFiles(program);

  const directReference = getTypeAliasType(index, "Direct");
  assert.equal(directReference?.Kind, KindTypeReference);
  assert.equal(extended.extensionHost.facts.get(directReference, sourcePrimitiveFactKey)?.kind, "int32");
  assert.equal(extended.extensionHost.factResolver.resolve(directReference, sourcePrimitiveFactKey)?.kind, "int32");
  assert.equal(extended.extensionHost.facts.get(directReference, sourcePrimitiveFactKey)?.runtimeBase, "number");
});

test("source-core records primitive facts on canonical named re-exports", () => {
  const { extended, program, index } = createProgram(`
    export type { int as i32, uint } from "@tsonic/core/types.js";
  `);

  assertCleanProgram(program, index);
  Program_BindSourceFiles(program);

  const i32Specifier = getNamedExportSpecifier(index, "i32");
  const i32Symbol = Node_Symbol(i32Specifier);
  assert.ok(i32Symbol !== undefined);
  assert.equal(extended.extensionHost.facts.get(i32Specifier, sourcePrimitiveFactKey)?.kind, "int32");
  assert.equal(extended.extensionHost.facts.get(i32Symbol, sourcePrimitiveFactKey)?.kind, "int32");
  assert.equal(extended.extensionHost.facts.get(i32Symbol, canonicalIdentityFactKey)?.id, "@tsonic/core/types.js::int");

  const uintSpecifier = getNamedExportSpecifier(index, "uint");
  const uintSymbol = Node_Symbol(uintSpecifier);
  assert.ok(uintSymbol !== undefined);
  assert.equal(extended.extensionHost.facts.get(uintSymbol, sourcePrimitiveFactKey)?.kind, "uint32");
  assert.equal(extended.extensionHost.facts.get(uintSymbol, canonicalIdentityFactKey)?.exportName, "uint");
});

test("source-core records out ref inref borrow move call-site facts without name guessing", () => {
  const { extended, program, index } = createProgram(`
    import { out, ref as refArg, inref, borrow, borrowMut, move } from "@tsonic/core/lang.js";
    import { out as localOut } from "./local.js";

    let value!: number;
    out(value);
    refArg(value);
    inref(value);
    borrow(value);
    borrowMut(value);
    move(value);
    out(value + 1);
    localOut(value);
  `, new Map([
    ["/src/local.ts", "export function out<T>(value: T): T { return value; }"],
  ]));

  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), index);
  assert.equal(diagnostics.length, 1);
  assert.equal(Diagnostic_Code(diagnostics[0]), 9901101);
  assert.match(Diagnostic_String(diagnostics[0]), /out\(\.\.\.\) requires a storage expression/);
  Program_BindSourceFiles(program);

  const outCall = getCallExpression(index, "out", 0);
  const refCall = getCallExpression(index, "refArg", 0);
  const inrefCall = getCallExpression(index, "inref", 0);
  const borrowCall = getCallExpression(index, "borrow", 0);
  const borrowMutCall = getCallExpression(index, "borrowMut", 0);
  const moveCall = getCallExpression(index, "move", 0);
  const invalidOutCall = getCallExpression(index, "out", 1);
  const localOutCall = getCallExpression(index, "localOut", 0);

  assert.equal(extended.extensionHost.facts.get(outCall, argumentPassingFactKey)?.mode, "byref-writeonly-must-init");
  assert.equal(extended.extensionHost.facts.get(refCall, argumentPassingFactKey)?.mode, "byref-readwrite");
  assert.equal(extended.extensionHost.facts.get(inrefCall, argumentPassingFactKey)?.mode, "byref-readonly");
  assert.equal(extended.extensionHost.facts.get(getFirstCallArgument(outCall), argumentPassingFactKey)?.mode, "byref-writeonly-must-init");
  assert.equal(extended.extensionHost.facts.get(getFirstCallArgument(invalidOutCall), argumentPassingFactKey), undefined);
  assert.equal(extended.extensionHost.facts.get(localOutCall, argumentPassingFactKey), undefined);

  assert.equal(extended.extensionHost.facts.get(borrowCall, flowStateFactKey)?.state, "borrowed-shared");
  assert.equal(extended.extensionHost.facts.get(borrowMutCall, flowStateFactKey)?.state, "borrowed-mut");
  assert.equal(extended.extensionHost.facts.get(moveCall, flowStateFactKey)?.state, "moved");
  assert.equal(extended.extensionHost.facts.get(getFirstCallArgument(moveCall), flowStateFactKey)?.state, "moved");

  assert.equal(finalizeExtensionSemantics(extended.program), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "test-consumer");
  assert.equal(consumer.getArgumentPassingFact(outCall)?.mode, "byref-writeonly-must-init");
  assert.equal(consumer.getFact(moveCall, flowStateFactKey)?.state, "moved");
});

test("source-core records ptr and fnptr type facts from canonical type marker imports", () => {
  const { extended, program, index } = createProgram(`
    import type { int, ptr, fnptr } from "@tsonic/core/types.js";
    import type { ptr as localPtr } from "./local.js";

    type Pointer = ptr<int>;
    type FunctionPointer = fnptr<[int], int>;
    type LocalPointer = localPtr<int>;
  `, new Map([
    ["/src/local.ts", "export type ptr<T> = T;"],
  ]));

  assertCleanProgram(program, index);
  Program_BindSourceFiles(program);

  const pointerReference = getTypeAliasType(index, "Pointer");
  const functionPointerReference = getTypeAliasType(index, "FunctionPointer");
  const localPointerReference = getTypeAliasType(index, "LocalPointer");

  assert.equal(pointerReference?.Kind, KindTypeReference);
  assert.equal(functionPointerReference?.Kind, KindTypeReference);
  assert.equal(extended.extensionHost.facts.get(pointerReference, pointerFactKey)?.mutability, "target-defined");
  assert.equal(extended.extensionHost.facts.get(pointerReference, pointerFactKey)?.unsafeRequired, true);
  assert.equal((extended.extensionHost.facts.get(pointerReference, pointerFactKey)?.pointee as GoPtr<Node>)?.Kind, KindTypeReference);
  assert.equal(extended.extensionHost.facts.get(functionPointerReference, functionPointerFactKey)?.parameters.length, 1);
  assert.equal((extended.extensionHost.facts.get(functionPointerReference, functionPointerFactKey)?.parameters[0] as GoPtr<Node>)?.Kind, KindTypeReference);
  assert.equal((extended.extensionHost.facts.get(functionPointerReference, functionPointerFactKey)?.result as GoPtr<Node>)?.Kind, KindTypeReference);
  assert.equal(extended.extensionHost.facts.get(localPointerReference, pointerFactKey), undefined);

  assert.equal(finalizeExtensionSemantics(extended.program), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "test-consumer");
  assert.equal(consumer.getPointerFact(pointerReference)?.unsafeRequired, true);
  assert.equal(consumer.getFunctionPointerFact(functionPointerReference)?.parameters.length, 1);
});

function createProgram(indexText: string, extraFiles: ReadonlyMap<string, string> = new Map()): {
  readonly extended: ExtendedProgram<ProgramOptions>;
  readonly program: GoPtr<Program>;
  readonly index: GoPtr<SourceFile>;
} {
  const files = new Map<string, string>([
    ["/src/index.ts", indexText],
    ["/src/node_modules/@tsonic/core/package.json", JSON.stringify({
      name: "@tsonic/core",
      version: "1.0.0",
      type: "module",
      exports: {
        "./types.js": {
          types: "./types.d.ts",
          default: "./types.js",
        },
        "./lang.js": {
          types: "./lang.d.ts",
          default: "./lang.js",
        },
      },
    })],
    ["/src/node_modules/@tsonic/core/types.d.ts", [
      "export type bool = boolean;",
      "export type char = string;",
      "export type int = number;",
      "export type uint = number;",
      "export type long = bigint;",
      "export type ulong = bigint;",
      "export type ptr<T> = T;",
      "export type fnptr<Args, Result> = unknown;",
    ].join("\n")],
    ["/src/node_modules/@tsonic/core/lang.d.ts", [
      "export declare function out<T>(value: T): T;",
      "export declare function ref<T>(value: T): T;",
      "export declare function inref<T>(value: T): T;",
      "export declare function borrow<T>(value: T): T;",
      "export declare function borrowMut<T>(value: T): T;",
      "export declare function move<T>(value: T): T;",
    ].join("\n")],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
    ...extraFiles,
  ]);
  let fs = FromMap(files, false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    extensions: [createSourceCoreExtension()],
  });
  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assert.equal(SourceFile_FileName(index), "/src/index.ts");
  return { extended, program, index };
}

function assertCleanProgram(program: GoPtr<Program>, sourceFile: GoPtr<SourceFile>): void {
  assert.equal(Program_GetProgramDiagnostics(program).length, 0);
  assert.equal(Program_GetSyntacticDiagnostics(program, Background(), sourceFile).length, 0);
  assert.equal(Program_GetSemanticDiagnostics(program, Background(), sourceFile).length, 0);
}

function getNamedImportSpecifier(sourceFile: GoPtr<SourceFile>, localName: string): GoPtr<Node> {
  for (const statement of Node_Statements(sourceFile) ?? []) {
    if (statement?.Kind !== KindImportDeclaration) {
      continue;
    }
    const namedBindings = AsImportClause(Node_ImportClause(statement))?.NamedBindings;
    if (namedBindings?.Kind !== KindNamedImports) {
      continue;
    }
    for (const importSpecifier of Node_Elements(namedBindings) ?? []) {
      if (Node_Text(Node_Name(importSpecifier)) === localName) {
        return importSpecifier;
      }
    }
  }
  assert.fail(`Missing named import '${localName}'.`);
}

function getNamespaceImport(sourceFile: GoPtr<SourceFile>, moduleSpecifierText: string): GoPtr<Node> {
  for (const statement of Node_Statements(sourceFile) ?? []) {
    if (statement?.Kind !== KindImportDeclaration) {
      continue;
    }
    const moduleSpecifier = Node_ModuleSpecifier(statement);
    if (moduleSpecifier === undefined || Node_Text(moduleSpecifier) !== moduleSpecifierText) {
      continue;
    }
    const namedBindings = AsImportClause(Node_ImportClause(statement))?.NamedBindings;
    if (namedBindings?.Kind === KindNamespaceImport) {
      assert.ok(AsNamespaceImport(namedBindings)?.name !== undefined);
      return namedBindings;
    }
  }
  assert.fail(`Missing namespace import from '${moduleSpecifierText}'.`);
}

function getTopLevelDeclaration(sourceFile: GoPtr<SourceFile>, kind: number, name: string): GoPtr<Node> {
  for (const statement of Node_Statements(sourceFile) ?? []) {
    if (statement?.Kind === kind && Node_Text(Node_Name(statement)) === name) {
      return statement;
    }
  }
  assert.fail(`Missing top-level declaration '${name}'.`);
}

function getTypeAliasType(sourceFile: GoPtr<SourceFile>, name: string): GoPtr<Node> {
  return Node_Type(getTopLevelDeclaration(sourceFile, KindTypeAliasDeclaration, name));
}

function getNamedExportSpecifier(sourceFile: GoPtr<SourceFile>, exportedName: string): GoPtr<Node> {
  for (const statement of Node_Statements(sourceFile) ?? []) {
    if (statement?.Kind !== KindExportDeclaration) {
      continue;
    }
    const exportClause = AsExportDeclaration(statement)!.ExportClause;
    if (exportClause?.Kind !== KindNamedExports) {
      continue;
    }
    for (const exportSpecifier of Node_Elements(exportClause) ?? []) {
      if (Node_Text(Node_Name(exportSpecifier)) === exportedName) {
        return exportSpecifier;
      }
    }
  }
  assert.fail(`Missing named export '${exportedName}'.`);
}

function getCallExpression(sourceFile: GoPtr<SourceFile>, calleeText: string, occurrence: number): GoPtr<Node> {
  let seen = 0;
  const found = findNode(sourceFile, (node) => {
    if (node?.Kind !== KindCallExpression) {
      return false;
    }
    const callee = Node_Expression(node);
    if (Node_Text(Node_Name(callee) ?? callee) !== calleeText) {
      return false;
    }
    if (seen === occurrence) {
      return true;
    }
    seen += 1;
    return false;
  });
  assert.ok(found !== undefined, `Missing call '${calleeText}' occurrence ${occurrence}.`);
  return found;
}

function getFirstCallArgument(callExpression: GoPtr<Node>): GoPtr<Node> {
  const argument = (Node_Arguments(callExpression) ?? [])[0];
  assert.ok(argument !== undefined);
  return argument;
}

function findNode(root: GoPtr<Node>, predicate: (node: GoPtr<Node>) => boolean): GoPtr<Node> {
  if (root === undefined) {
    return undefined;
  }
  if (predicate(root)) {
    return root;
  }
  let found: GoPtr<Node>;
  Node_ForEachChild(root, (child) => {
    found = findNode(child, predicate);
    return (found !== undefined) as bool;
  });
  return found;
}
