import assert from "node:assert/strict";
import { test } from "node:test";

import type { bool } from "../../../go/scalars.js";
import { Background } from "../../../go/context.js";
import type { SourceFile } from "../../ast/ast.js";
import { AsSourceFile } from "../../ast/ast.js";
import { Node_Clone } from "../../ast/spine.js";
import { LibPath, WrapFS } from "../../bundled/bundled.js";
import { emitHost_as_declarations_DeclarationEmitHost, newEmitHost } from "../../compiler/emitHost.js";
import { NewCompilerHost } from "../../compiler/host.js";
import type { EmitOptions, ProgramOptions } from "../../compiler/program.js";
import { NewProgram, Program_Emit, Program_GetSourceFile, Program_Options } from "../../compiler/program.js";
import { EmitOnlyDts } from "../../compiler/emitter.js";
import type { CompilerOptions } from "../../core/compileroptions.js";
import { EmitContext_SetOriginal, NewEmitContext } from "../../printer/emitcontext.js";
import type { EmitResolver } from "../../printer/emitresolver.js";
import type { ParseConfigHost } from "../../tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../../tsoptions/tsconfigparsing.js";
import { FromMap } from "../../vfs/vfstest/vfstest.js";
import { Transformer_TransformSourceFile } from "../transformer.js";
import type { DeclarationEmitHost } from "./transform.js";
import { NewDeclarationTransformer } from "./transform.js";

function createProgram(files: Readonly<Record<string, string>>, compilerOptions: Readonly<Record<string, unknown>>) {
  const entries = new Map<string, string>();
  for (const [fileName, text] of Object.entries(files)) {
    entries.set(`/src/${fileName}`, text);
  }
  entries.set("/src/tsconfig.json", JSON.stringify({
    compilerOptions,
    files: Object.keys(files),
  }));

  let fs = FromMap(entries, false as bool);
  fs = WrapFS(fs);
  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [config, configErrors] = GetParsedCommandLineOfConfigFile(
    "/src/tsconfig.json",
    {} as CompilerOptions,
    undefined,
    host as ParseConfigHost,
    undefined,
  );
  assert.equal((configErrors ?? []).length, 0);

  return NewProgram({ Config: config, Host: host } satisfies ProgramOptions);
}

function emitDeclaration(files: Readonly<Record<string, string>>, compilerOptions: Readonly<Record<string, unknown>>): string {
  const program = createProgram(files, compilerOptions);
  const outputs = new Map<string, string>();
  const emitOptions: EmitOptions = {
    TargetSourceFile: undefined,
    EmitOnly: EmitOnlyDts,
    WriteFile: (fileName, text) => {
      outputs.set(fileName, text);
      return undefined;
    },
  };
  const result = Program_Emit(program, Background(), emitOptions);
  assert.ok(result !== undefined);
  assert.equal(result.EmitSkipped, false);
  assert.equal(result.Diagnostics, undefined);

  const declarations = [...outputs.entries()].filter(([fileName]) => fileName.endsWith(".d.ts"));
  assert.equal(declarations.length, 1);
  return declarations[0]![1];
}

test("declaration transformer treats explicit false tristates as false", () => {
  const declaration = emitDeclaration({
    "main.ts": `
/** @internal */
export const kept = 1;
export function inferred() {
  return { value: 1 };
}
`,
  }, {
    declaration: true,
    emitDeclarationOnly: true,
    isolatedDeclarations: false,
    noLib: true,
    stripInternal: false,
  });

  assert.match(declaration, /export declare const kept = 1;/);
  assert.match(declaration, /export declare function inferred\(\): \{/);
});

test("declaration transformer reconstructs remapped JSDoc generic references", () => {
  const declaration = emitDeclaration({
    "main.js": `
/** @param {Array} value */
function arrayValue(value) {}
/** @param {Promise} value */
function promiseValue(value) {}
`,
  }, {
    allowJs: true,
    checkJs: true,
    declaration: true,
    emitDeclarationOnly: true,
    target: "es2015",
  });

  assert.match(declaration, /declare function arrayValue\(value: any\[\]\): void;/);
  assert.match(declaration, /declare function promiseValue\(value: Promise<any>\): void;/);
});

test("declaration transformer emits expandos that become visible late", () => {
  const declaration = emitDeclaration({
    "main.ts": `
declare function wrap<T>(component: T): T;
function FunctionComponent() { return null; }
FunctionComponent.propTypes = { num: 0 };
export const WrappedFunction = wrap(FunctionComponent);
`,
  }, {
    declaration: true,
    emitDeclarationOnly: true,
    noLib: true,
    strict: true,
  });

  assert.match(declaration, /declare function FunctionComponent\(\): null;/);
  assert.match(declaration, /declare namespace FunctionComponent \{/);
  assert.match(declaration, /var propTypes: \{/);
  assert.match(declaration, /export declare const WrappedFunction: typeof FunctionComponent;/);
});

test("declaration transformer resets source state and precalculates the most-original source", () => {
  const program = createProgram({
    "main.ts": "export const value = 1;",
    "types.d.ts": "export declare const existing: number;",
  }, {
    declaration: true,
    noLib: true,
  });
  const source = Program_GetSourceFile(program, "/src/main.ts");
  const declarationFile = Program_GetSourceFile(program, "/src/types.d.ts");
  assert.ok(source !== undefined);
  assert.ok(declarationFile !== undefined);

  const [rawHost, done] = newEmitHost(Background(), program, source);
  try {
    const baseHost = emitHost_as_declarations_DeclarationEmitHost(rawHost);
    const baseResolver = baseHost.GetEmitResolver();
    let precalculatedSource: SourceFile | undefined;
    const resolver: EmitResolver = {
      ...baseResolver,
      PrecalculateDeclarationEmitVisibility: (file) => {
        precalculatedSource = file;
        baseResolver.PrecalculateDeclarationEmitVisibility(file);
      },
    };
    const host: DeclarationEmitHost = {
      ...baseHost,
      GetEmitResolver: () => resolver,
    };
    const context = NewEmitContext();
    const transformer = NewDeclarationTransformer(host, context, Program_Options(program), "", "");
    const secondTransformer = NewDeclarationTransformer(host, NewEmitContext(), Program_Options(program), "", "");
    assert.notEqual(transformer!.seenProperties.M, secondTransformer!.seenProperties.M);

    const staleDeferredAssignments = transformer!.deferredExpandoAssignments;
    staleDeferredAssignments.set(1n, []);
    const clone = AsSourceFile(Node_Clone(source, context!.Factory!));
    EmitContext_SetOriginal(context, clone, source);
    Transformer_TransformSourceFile(transformer!.__tsgoEmbedded0, clone);
    assert.equal(precalculatedSource, source);
    assert.notEqual(transformer!.deferredExpandoAssignments, staleDeferredAssignments);
    assert.equal(transformer!.deferredExpandoAssignments.size, 0);

    transformer!.cjsExportAssignmentName = source;
    assert.equal(Transformer_TransformSourceFile(transformer!.__tsgoEmbedded0, declarationFile), declarationFile);
    assert.equal(transformer!.cjsExportAssignmentName, undefined);
  } finally {
    done();
  }
});
