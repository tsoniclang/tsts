import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../go/scalars.js";
import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import { SourceFile_FileName } from "../internal/ast/ast.js";
import { Node_ForEachChild } from "../internal/ast/spine.js";
import { GetSourceFileOfNode } from "../internal/ast/utilities.js";
import { KindPropertyAccessExpression } from "../internal/ast/generated/kinds.js";
import { Diagnostic_String } from "../internal/ast/diagnostic.js";
import { LibPath, WrapFS } from "../internal/bundled/bundled.js";
import type { CompilerOptions } from "../internal/core/compileroptions.js";
import { NewCompilerHost } from "../internal/compiler/host.js";
import type { Program, ProgramOptions } from "../internal/compiler/program.js";
import {
  NewProgram,
  Program_GetProgramDiagnostics,
  Program_GetSemanticDiagnostics,
  Program_GetSourceFile,
  Program_GetSyntacticDiagnostics,
} from "../internal/compiler/program.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import {
  ExtensionHostDiagnosticCode,
  TstsProviderContractVersion,
  acceptObservation,
  attachExtensionHost,
  finalizeExtensionSemantics,
  targetOperationFactKey,
} from "./index.js";
import type {
  CheckedPropertyAccessMappingRequest,
  CompilerExtension,
  ExtensionHost,
  TargetOperationFact,
  TargetOperationProposal,
} from "./index.js";

test("semantic finalization discovers every implementation file exactly once without publishing declaration operations", () => {
  const propertyRequests: CheckedPropertyAccessMappingRequest[] = [];
  const propertyPhases: string[] = [];
  const extension = semanticExtension(propertyRequests, propertyPhases);
  const setup = createProgram(extension);
  const profile = requireSourceFile(setup.program, "/src/profile.d.ts");
  const first = requireSourceFile(setup.program, "/src/first.ts");
  const second = requireSourceFile(setup.program, "/src/second.ts");
  const declarationAccess = onlyPropertyAccess(profile);
  const firstAccess = onlyPropertyAccess(first);
  const secondAccess = onlyPropertyAccess(second);

  assert.equal(profile.IsDeclarationFile, true);
  assert.equal(first.IsDeclarationFile, false);
  assert.equal(second.IsDeclarationFile, false);
  assertCleanSyntax(setup.program, profile);
  assertCleanSyntax(setup.program, first);
  assertCleanSyntax(setup.program, second);
  assertCleanSemantics(setup.program, profile);
  assertCleanSemantics(setup.program, first);
  assert.equal(propertyRequests.length, 1, "The implementation file checked by the compiler must publish its ready operation during checking.");
  assert.deepEqual(propertyPhases, ["checking"]);
  assertOperation(setup.extensionHost.facts.get(firstAccess, targetOperationFactKey), "/src/first.ts");
  assert.equal(setup.extensionHost.facts.get(secondAccess, targetOperationFactKey), undefined);
  assert.equal(setup.extensionHost.facts.get(declarationAccess, targetOperationFactKey), undefined);

  assert.ok(finalizeExtensionSemantics(setup.programOptions) === setup.extensionHost);

  assert.equal(propertyRequests.length, 2);
  assert.deepEqual(propertyPhases, ["checking", "checking"], "Finalization-triggered source discovery still runs the discovered file through its exact checking phase.");
  assert.deepEqual(
    propertyRequests.map((request) => SourceFile_FileName(requireOwner(request.expression as GoPtr<Node>))).sort(),
    ["/src/first.ts", "/src/second.ts"],
  );
  assert.equal(propertyRequests.filter((request) => request.expression === firstAccess).length, 1);
  assert.equal(propertyRequests.filter((request) => request.expression === secondAccess).length, 1);
  assert.ok(propertyRequests.every((request) => {
    if (request.accessMode === "write") {
      return false;
    }
    const selectedDeclaration = request.sourceReadResult.selectedDeclaration as GoPtr<Node>;
    return selectedDeclaration !== undefined && GetSourceFileOfNode(selectedDeclaration) === profile;
  }), "Implementation operations must retain declaration-file selected evidence without publishing declaration execution.");
  assertOperation(setup.extensionHost.facts.get(firstAccess, targetOperationFactKey), "/src/first.ts");
  assertOperation(setup.extensionHost.facts.get(secondAccess, targetOperationFactKey), "/src/second.ts");
  assert.equal(setup.extensionHost.facts.get(declarationAccess, targetOperationFactKey), undefined);
  assert.equal(
    propertyRequests.filter((request) => requireOwner(request.expression as GoPtr<Node>).IsDeclarationFile).length,
    0,
  );
  assert.equal(
    setup.extensionHost.diagnostics.all().filter((diagnostic) =>
      diagnostic.numericCode === ExtensionHostDiagnosticCode.observationOwnerDeferred).length,
    0,
  );

  const firstOperation = setup.extensionHost.facts.get(firstAccess, targetOperationFactKey);
  const secondOperation = setup.extensionHost.facts.get(secondAccess, targetOperationFactKey);
  assert.ok(finalizeExtensionSemantics(setup.programOptions) === setup.extensionHost);
  assert.equal(propertyRequests.length, 2, "Repeated finalization must not replay completed operations.");
  assert.deepEqual(propertyPhases, ["checking", "checking"]);
  assert.ok(setup.extensionHost.facts.get(firstAccess, targetOperationFactKey) === firstOperation);
  assert.ok(setup.extensionHost.facts.get(secondAccess, targetOperationFactKey) === secondOperation);
  assert.equal(setup.extensionHost.diagnostics.all().length, 0);
});

function semanticExtension(propertyRequests: CheckedPropertyAccessMappingRequest[], propertyPhases: string[]): CompilerExtension {
  return {
    identity: {
      id: "compiler-semantic-discovery-regression",
      version: "1.0.0",
      capabilityNamespace: "compiler-semantic-discovery-regression",
    },
    initialize(context): void {
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: "compiler-semantic-discovery-provider",
          version: "1.0.0",
          target: "neutral",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        mapCheckedPropertyAccess: (request, observationContext) => {
          propertyRequests.push(request);
          propertyPhases.push(observationContext.phase);
          const owner = requireOwner(request.expression as GoPtr<Node>);
          return acceptObservation({ operation: operation(SourceFile_FileName(owner)) });
        },
      }), true);
    },
  };
}

function operation(ownerFileName: string): TargetOperationProposal {
  const operationId = `neutral.property:${ownerFileName}`;
  return {
    operationId,
    operationKind: "property",
    targetOperation: operationId,
  };
}

function assertOperation(actual: TargetOperationFact | undefined, ownerFileName: string): void {
  const expected = operation(ownerFileName);
  assert.equal(actual?.operationId, expected.operationId);
  assert.equal(actual?.operationKind, expected.operationKind);
  assert.equal(actual?.targetOperation, expected.targetOperation);
}

function createProgram(extension: CompilerExtension): {
  readonly program: GoPtr<Program>;
  readonly programOptions: ProgramOptions;
  readonly extensionHost: ExtensionHost;
} {
  let fs = FromMap(new Map<string, string>([
    ["/src/profile.d.ts", sourceProfile],
    ["/src/first.ts", "export const first = firstCounter.value;"],
    ["/src/second.ts", "export const second = secondCounter.value;"],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
        strict: true,
      },
      files: ["profile.d.ts", "first.ts", "second.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);
  const compilerHost = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile(
    "/src/tsconfig.json",
    {} as CompilerOptions,
    undefined,
    compilerHost as ParseConfigHost,
    undefined,
  );
  assert.equal((configErrors ?? []).length, 0);
  const baseOptions = { Config: parsed, Host: compilerHost } satisfies ProgramOptions;
  const attached = attachExtensionHost(baseOptions, {
    activeTarget: "neutral",
    extensions: [extension],
  });
  return {
    program: NewProgram(attached.program),
    programOptions: attached.program,
    extensionHost: attached.extensionHost,
  };
}

function assertCleanSyntax(program: GoPtr<Program>, sourceFile: GoPtr<SourceFile>): void {
  const programDiagnostics = Program_GetProgramDiagnostics(program);
  const syntacticDiagnostics = Program_GetSyntacticDiagnostics(program, Background(), sourceFile);
  assert.equal(programDiagnostics.length, 0, programDiagnostics.map(Diagnostic_String).join("\n"));
  assert.equal(syntacticDiagnostics.length, 0, syntacticDiagnostics.map(Diagnostic_String).join("\n"));
}

function assertCleanSemantics(program: GoPtr<Program>, sourceFile: GoPtr<SourceFile>): void {
  const semanticDiagnostics = Program_GetSemanticDiagnostics(program, Background(), sourceFile);
  assert.equal(semanticDiagnostics.length, 0, semanticDiagnostics.map(Diagnostic_String).join("\n"));
}

function requireSourceFile(program: GoPtr<Program>, fileName: string): SourceFile {
  const sourceFile = Program_GetSourceFile(program, fileName);
  assert.ok(sourceFile !== undefined);
  return sourceFile;
}

function requireOwner(node: GoPtr<Node>): SourceFile {
  const owner = GetSourceFileOfNode(node);
  assert.ok(owner !== undefined);
  return owner;
}

function onlyPropertyAccess(sourceFile: SourceFile): Node {
  const propertyAccesses: Node[] = [];
  visitNodes(sourceFile, (node) => {
    if (node.Kind === KindPropertyAccessExpression) {
      propertyAccesses.push(node);
    }
  });
  assert.equal(propertyAccesses.length, 1);
  return propertyAccesses[0]!;
}

function visitNodes(node: GoPtr<Node>, visit: (node: Node) => void): void {
  if (node === undefined) {
    return;
  }
  visit(node);
  Node_ForEachChild(node, (child) => {
    visitNodes(child, visit);
    return false as bool;
  });
}

const sourceProfile = `
  interface Object {}
  interface Function {}
  interface CallableFunction extends Function {}
  interface NewableFunction extends Function {}
  interface IArguments {}
  interface String {}
  interface Number {}
  interface Boolean {}
  interface RegExp {}
  interface Array<T> { readonly length: number; [index: number]: T; }
  interface SymbolConstructor { readonly iterator: unique symbol; }
  declare var Symbol: SymbolConstructor;
  interface Iterable<T> { [Symbol.iterator](): T; }
  interface Counter { readonly value: number; }
  declare const firstCounter: Counter;
  declare const secondCounter: Counter;
`;
