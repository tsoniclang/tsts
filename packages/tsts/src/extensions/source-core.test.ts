import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "@tsonic/core/types.js";
import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import {
  Node_Elements,
  Node_ImportClause,
  Node_ModuleSpecifier,
  Node_PropertyName,
  Node_Statements,
  Node_Symbol,
  Node_Text,
  SourceFile_FileName,
} from "../internal/ast/ast.js";
import { Node_Name } from "../internal/ast/spine.js";
import { AsImportClause, AsNamespaceImport } from "../internal/ast/generated/casts.js";
import {
  KindImportDeclaration,
  KindNamedImports,
  KindNamespaceImport,
  KindTypeAliasDeclaration,
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
  canonicalIdentityFactKey,
  createExtensionConsumerQueries,
  createSourceCoreExtension,
  finalizeExtensionSemantics,
  sourcePrimitiveFactKey,
} from "./index.js";
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
      },
    })],
    ["/src/node_modules/@tsonic/core/types.d.ts", [
      "export type bool = boolean;",
      "export type char = string;",
      "export type int = number;",
      "export type uint = number;",
      "export type long = bigint;",
      "export type ulong = bigint;",
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
