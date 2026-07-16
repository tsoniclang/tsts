import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../go/scalars.js";
import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import type { Node } from "../internal/ast/ast.js";
import { Node_Type, SourceFile_FileName } from "../internal/ast/ast.js";
import type { Symbol } from "../internal/ast/symbol.js";
import { SymbolFlagsAlias } from "../internal/ast/symbolflags.js";
import { GetSourceFileOfNode } from "../internal/ast/utilities.js";
import { IsNewExpression } from "../internal/ast/generated/predicates.js";
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
  Program_GetSourceFiles,
  Program_GetSyntacticDiagnostics,
} from "../internal/compiler/program.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import {
  TstsProviderContractVersion,
  acceptObservation,
  attachExtensionHost,
  createExtensionConsumerQueries,
  finalizeExtensionSemantics,
} from "./index.js";
import type {
  CheckedCallMappingRequest,
  CheckedCallMappingResult,
  CompilerExtension,
  SelectedTargetSignatureFact,
  SourceSelectedSignatureParameter,
  TargetBindingProvider,
  TargetSemanticProvider,
  TargetSignatureSelection,
  TargetTypeArgumentMappingRequest,
} from "./index.js";

type TargetSignatureSelectionKeys = keyof CheckedCallMappingResult["selectedSignature"];
type TargetSignatureSelectionAllowedKeys = "member" | "targetTypeArguments" | "argumentConversions" | "providerDeclaration";
const targetSignatureSelectionHasExactTargetOwnedKeys: Exclude<TargetSignatureSelectionKeys, TargetSignatureSelectionAllowedKeys> extends never
  ? Exclude<TargetSignatureSelectionAllowedKeys, TargetSignatureSelectionKeys> extends never
    ? true
    : false
  : false = true;

test("checked construction exposes alias-resolved class identity across imports and re-exports", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
  const targetTypeRequests: TargetTypeArgumentMappingRequest[] = [];
  const { programOptions, extensionHost, program } = createSelectedCallProgram({
    files: {
      "profile.d.ts": sourceProfile,
      "model.ts": `
        export class Model {}
        export default class DefaultModel {}
      `,
      "barrel.ts": `
        export { Model as ReExportedModel } from "./model.js";
        export * from "./model.js";
      `,
      "deep-barrel.ts": `export * from "./barrel.js";`,
      "index.ts": `
        import { Model } from "./model.js";
        import { Model as LocalModel } from "./model.js";
        import { ReExportedModel } from "./barrel.js";
        import { Model as StarModel } from "./deep-barrel.js";
        import DefaultModel from "./model.js";
        import * as Models from "./model.js";

        export const direct = new Model();
        export const renamed = new LocalModel();
        export const reExported = new ReExportedModel();
        export const namespaced = new Models.Model();
        export const parenthesized = new (Model)();
        export const starExported = new StarModel();
        export const defaultExported = new DefaultModel();
      `,
    },
    extension: selectedCallEvidenceExtension(callRequests, targetTypeRequests),
  });

  assertCleanProgram(program);
  assert.equal(callRequests.length, 7);
  assert.equal(targetTypeRequests.length, 7);

  const modelRequests = callRequests.slice(0, 6);
  const canonicalSymbols = modelRequests.map((request) => request.sourceSelectedCalleeSymbol as GoPtr<Symbol>);
  const canonicalDeclarations = modelRequests.map((request) => request.sourceSelectedCalleeDeclaration as GoPtr<Node>);
  assert.deepEqual(canonicalSymbols.map((symbol) => symbol?.Name), ["Model", "Model", "Model", "Model", "Model", "Model"]);
  assert.ok(canonicalSymbols.every((symbol) => symbol === canonicalSymbols[0]));
  assert.ok(canonicalDeclarations.every((declaration) => declaration !== undefined && declaration === canonicalDeclarations[0]));
  assert.equal(SourceFile_FileName(GetSourceFileOfNode(canonicalDeclarations[0])), "/src/model.ts");

  for (const index_ of [0, 1, 2, 4, 5, 6]) {
    const syntaxSymbol = callRequests[index_]?.sourceCalleeSymbol as GoPtr<Symbol>;
    const syntaxDeclaration = callRequests[index_]?.sourceCalleeDeclaration as GoPtr<Node>;
    assert.ok(syntaxSymbol !== undefined && (syntaxSymbol.Flags & SymbolFlagsAlias) !== 0);
    assert.equal(SourceFile_FileName(GetSourceFileOfNode(syntaxDeclaration)), "/src/index.ts");
    assert.notEqual(syntaxSymbol, callRequests[index_]?.sourceSelectedCalleeSymbol);
  }
  assert.equal((callRequests[6]?.sourceSelectedCalleeSymbol as GoPtr<Symbol>)?.Name, "default");
  assert.equal(SourceFile_FileName(GetSourceFileOfNode(callRequests[6]?.sourceSelectedCalleeDeclaration as GoPtr<Node>)), "/src/model.ts");

  for (let index_ = 0; index_ < callRequests.length; index_++) {
    const request = callRequests[index_]!;
    assert.ok(request.sourceSelectedSignature !== undefined);
    assert.equal(request.sourceSelectedSignatureKind, "resolved");
    assert.equal(request.sourceSelectedDeclaration, undefined);
    assert.deepEqual(request.sourceSelectedSignatureParameters, []);
    assert.equal(targetTypeRequests[index_]?.sourceSelectedCalleeSymbol, request.sourceSelectedCalleeSymbol);
    assert.equal(targetTypeRequests[index_]?.sourceSelectedCalleeDeclaration, request.sourceSelectedCalleeDeclaration);
    assert.equal(targetTypeRequests[index_]?.sourceSelectedSignatureParameters, request.sourceSelectedSignatureParameters);
  }

  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  const consumer = createExtensionConsumerQueries(extensionHost, "selected-call-test");
  for (const request of callRequests) {
    const selected = consumer.getSelectedTargetCall(request.call);
    assert.equal(selected?.sourceSelectedCalleeSymbol, request.sourceSelectedCalleeSymbol);
    assert.equal(selected?.sourceSelectedCalleeDeclaration, request.sourceSelectedCalleeDeclaration);
    assert.equal(selected?.sourceSelectedSignatureParameters, request.sourceSelectedSignatureParameters);
  }
});

test("provider virtual construction exposes one canonical selected export identity", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
  const targetTypeRequests: TargetTypeArgumentMappingRequest[] = [];
  const { programOptions, extensionHost, program } = createSelectedCallProgram({
    files: {
      "profile.d.ts": sourceProfile,
      "barrel.ts": `export { Options as ReExportedOptions } from "@acme/native.js";`,
      "index.ts": `
        import { Options as LocalOptions } from "@acme/native.js";
        import { ReExportedOptions } from "./barrel.js";
        export const direct = new LocalOptions();
        export const reExported = new ReExportedOptions();
      `,
    },
    extension: selectedCallEvidenceExtension(callRequests, targetTypeRequests, optionsBindingProvider),
  });

  assertCleanProgram(program);
  assert.equal(callRequests.length, 2);
  const directSymbol = callRequests[0]?.sourceSelectedCalleeSymbol as GoPtr<Symbol>;
  const reExportedSymbol = callRequests[1]?.sourceSelectedCalleeSymbol as GoPtr<Symbol>;
  const directDeclaration = callRequests[0]?.sourceSelectedCalleeDeclaration as GoPtr<Node>;
  assert.ok(directSymbol !== undefined);
  assert.equal(reExportedSymbol, directSymbol);
  assert.equal(callRequests[1]?.sourceSelectedCalleeDeclaration, directDeclaration);
  assert.ok(SourceFile_FileName(GetSourceFileOfNode(directDeclaration)).startsWith("tsts-provider://"));
  assert.deepEqual(callRequests[0]?.sourceSelectedSignatureParameters, []);
  assert.deepEqual(callRequests[1]?.sourceSelectedSignatureParameters, []);

  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  const consumer = createExtensionConsumerQueries(extensionHost, "selected-provider-constructor-test");
  for (const request of callRequests) {
    const selected = consumer.getSelectedTargetCall(request.call);
    assert.equal(selected?.sourceSelectedCalleeSymbol, directSymbol);
    assert.equal(selected?.sourceSelectedCalleeDeclaration, directDeclaration);
  }
});

test("checked calls expose alias-resolved callable identity and selected parameter evidence", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
  const targetTypeRequests: TargetTypeArgumentMappingRequest[] = [];
  const { programOptions, extensionHost, program } = createSelectedCallProgram({
    files: {
      "profile.d.ts": sourceProfile,
      "functions.ts": `
        import type { Options } from "@acme/native.js";
        export function make(options: Options): Options { return options; }
      `,
      "barrel.ts": `export { make as makeFromBarrel } from "./functions.js";`,
      "index.ts": `
        import { make } from "./functions.js";
        import { make as localMake } from "./functions.js";
        import { makeFromBarrel } from "./barrel.js";
        import type { Options } from "@acme/native.js";
        declare const options: Options;
        export const direct = make(options);
        export const renamed = localMake(options);
        export const reExported = makeFromBarrel(options);
      `,
    },
    extension: selectedCallEvidenceExtension(callRequests, targetTypeRequests, optionsBindingProvider),
  });

  assertCleanProgram(program);
  assert.equal(callRequests.length, 3);
  assert.equal(targetTypeRequests.length, 3);
  const selectedParameterTypes = callRequests.map((request) => request.sourceSelectedSignatureParameters?.[0]?.selectedType);
  assert.ok(selectedParameterTypes.every((selectedType) => selectedType !== undefined && selectedType === selectedParameterTypes[0]));

  const canonicalSymbols = callRequests.map((request) => request.sourceSelectedCalleeSymbol as GoPtr<Symbol>);
  const canonicalDeclarations = callRequests.map((request) => request.sourceSelectedCalleeDeclaration as GoPtr<Node>);
  assert.ok(canonicalSymbols.every((symbol) => symbol !== undefined && symbol.Name === "make"));
  assert.ok(canonicalSymbols.every((symbol) => symbol === canonicalSymbols[0]));
  assert.ok(canonicalDeclarations.every((declaration) => declaration !== undefined && declaration === canonicalDeclarations[0]));
  assert.equal(SourceFile_FileName(GetSourceFileOfNode(canonicalDeclarations[0])), "/src/functions.ts");

  for (let requestIndex = 0; requestIndex < callRequests.length; requestIndex++) {
    const request = callRequests[requestIndex]!;
    const syntaxSymbol = request.sourceCalleeSymbol as GoPtr<Symbol>;
    assert.ok(syntaxSymbol !== undefined && (syntaxSymbol.Flags & SymbolFlagsAlias) !== 0);
    assert.notEqual(syntaxSymbol, request.sourceSelectedCalleeSymbol);
    assert.equal(request.sourceSelectedDeclaration, canonicalDeclarations[requestIndex]);
    assertSelectedParameterProvenance(request.sourceSelectedSignatureParameters ?? []);
    assert.equal(targetTypeRequests[requestIndex]?.sourceSelectedSignatureParameters, request.sourceSelectedSignatureParameters);
    assert.equal(targetTypeRequests[requestIndex]?.sourceSelectedCalleeSymbol, request.sourceSelectedCalleeSymbol);
  }

  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  const consumer = createExtensionConsumerQueries(extensionHost, "selected-function-call-test");
  for (const request of callRequests) {
    const selected = consumer.getSelectedTargetCall(request.call);
    assert.equal(selected?.sourceSelectedSignatureParameters, request.sourceSelectedSignatureParameters);
    assert.equal(selected?.sourceSelectedCalleeSymbol, request.sourceSelectedCalleeSymbol);
    assert.equal(selected?.sourceSelectedCalleeDeclaration, request.sourceSelectedCalleeDeclaration);
  }
});

test("checked untyped calls are distinct from resolved zero-parameter signatures", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
  const targetTypeRequests: TargetTypeArgumentMappingRequest[] = [];
  const { programOptions, extensionHost, program } = createSelectedCallProgram({
    files: {
      "profile.d.ts": sourceProfile,
      "index.ts": `
        declare const dynamicValue: any;
        export const result = dynamicValue();
      `,
    },
    extension: selectedCallEvidenceExtension(callRequests, targetTypeRequests),
  });

  assertCleanProgram(program);
  assert.equal(callRequests.length, 1);
  assert.equal(callRequests[0]?.sourceSelectedSignatureKind, "untyped");
  assert.deepEqual(callRequests[0]?.sourceSelectedSignatureParameters, []);
  assert.equal(targetTypeRequests[0]?.sourceSelectedSignatureKind, "untyped");

  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  const selected = createExtensionConsumerQueries(extensionHost, "selected-untyped-call-test").getSelectedTargetCall(callRequests[0]!.call);
  assert.equal(selected?.sourceSelectedSignatureKind, "untyped");
  assert.deepEqual(selected?.sourceSelectedSignatureParameters, []);
});

test("checked construction exposes selected source parameter types and authored provenance", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
  const targetTypeRequests: TargetTypeArgumentMappingRequest[] = [];
  const { programOptions, extensionHost, program } = createSelectedCallProgram({
    files: {
      "profile.d.ts": sourceProfile,
      "index.ts": `
        import type { Options } from "@acme/native.js";

        type LocalOptions = { local: number };

        class ProviderService {
          constructor(options: Options) {}
        }

        class LocalService {
          constructor(options: LocalOptions) {}
        }

        class Box<T> {
          constructor(value: T) {}
        }

        class OverloadedService {
          constructor(options: Options);
          constructor(options: LocalOptions);
          constructor(options: Options | LocalOptions) {}
        }

        class VariadicService {
          constructor(required: Options, optional?: LocalOptions, ...rest: Options[]) {}
        }

        class EmptyService {}

        class TupleRestService {
          constructor(...args: [head: string, tail?: number]) {}
        }

        class VoidOptionalService {
          constructor(value: string | void) {}
        }

        declare const options: Options;
        declare const localOptions: LocalOptions;
        declare const restOptions: Options[];

        new ProviderService(options);
        new LocalService(localOptions);
        new Box<Options>(options);
        new OverloadedService(options);
        new OverloadedService(localOptions);
        new VariadicService(options, localOptions, options);
        new VariadicService(options, localOptions, ...restOptions);
        new EmptyService();
        new TupleRestService("head");
        new VoidOptionalService();
      `,
    },
    extension: selectedCallEvidenceExtension(callRequests, targetTypeRequests, optionsBindingProvider),
  });

  assertCleanProgram(program);
  assert.equal(callRequests.length, 10);
  const providerOptionsType = callRequests[0]?.sourceSelectedSignatureParameters?.[0]?.selectedType;
  const localOptionsType = callRequests[1]?.sourceSelectedSignatureParameters?.[0]?.selectedType;
  assert.ok(providerOptionsType !== undefined);
  assert.ok(localOptionsType !== undefined);
  assert.notEqual(providerOptionsType, localOptionsType);
  assert.equal(callRequests[2]?.sourceSelectedSignatureParameters?.[0]?.selectedType, providerOptionsType);
  assert.equal(callRequests[3]?.sourceSelectedSignatureParameters?.[0]?.selectedType, providerOptionsType);
  assert.equal(callRequests[4]?.sourceSelectedSignatureParameters?.[0]?.selectedType, localOptionsType);
  assert.equal(callRequests[5]?.sourceSelectedSignatureParameters?.[0]?.selectedType, providerOptionsType);
  assert.equal(callRequests[6]?.sourceSelectedSignatureParameters?.[0]?.selectedType, providerOptionsType);
  assert.equal(callRequests[5]?.sourceSelectedSignatureParameters?.[1]?.selectedType, callRequests[6]?.sourceSelectedSignatureParameters?.[1]?.selectedType);
  assert.equal(callRequests[5]?.sourceSelectedSignatureParameters?.[2]?.selectedType, callRequests[6]?.sourceSelectedSignatureParameters?.[2]?.selectedType);

  const expectedParameterNames = [
    ["options"],
    ["options"],
    ["value"],
    ["options"],
    ["options"],
    ["required", "optional", "rest"],
    ["required", "optional", "rest"],
    [],
    ["args"],
    ["value"],
  ];
  for (let requestIndex = 0; requestIndex < callRequests.length; requestIndex++) {
    const request = callRequests[requestIndex]!;
    const parameters = request.sourceSelectedSignatureParameters;
    assert.ok(parameters !== undefined);
    assert.deepEqual(parameters.map((parameter) => parameter.parameterName), expectedParameterNames[requestIndex]);
    assertSelectedParameterProvenance(parameters);
    assert.equal(targetTypeRequests[requestIndex]?.sourceSelectedSignatureParameters, parameters);
    assert.equal(targetTypeRequests[requestIndex]?.sourceSelectedCalleeSymbol, request.sourceSelectedCalleeSymbol);
    assert.equal(targetTypeRequests[requestIndex]?.sourceSelectedCalleeDeclaration, request.sourceSelectedCalleeDeclaration);
  }

  assert.deepEqual(callRequests[5]?.sourceSelectedSignatureParameters?.map(({ acceptsOmission, rest }) => ({ acceptsOmission, rest })), [
    { acceptsOmission: false, rest: false },
    { acceptsOmission: true, rest: false },
    { acceptsOmission: true, rest: true },
  ]);
  assert.deepEqual(callRequests[8]?.sourceSelectedSignatureParameters?.map(({ acceptsOmission, rest }) => ({ acceptsOmission, rest })), [
    { acceptsOmission: false, rest: true },
  ]);
  assert.deepEqual(callRequests[9]?.sourceSelectedSignatureParameters?.map(({ acceptsOmission, rest }) => ({ acceptsOmission, rest })), [
    { acceptsOmission: true, rest: false },
  ]);

  const genericParameter = callRequests[2]?.sourceSelectedSignatureParameters?.[0];
  assert.ok(genericParameter?.authoredTypeNode !== undefined);
  assert.notEqual(genericParameter.authoredTypeNode, genericParameter.selectedType);
  assert.equal(callRequests[7]?.sourceSelectedDeclaration, undefined);
  assert.deepEqual(callRequests[7]?.sourceSelectedSignatureParameters, []);

  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  const consumer = createExtensionConsumerQueries(extensionHost, "selected-parameter-test");
  for (const request of callRequests) {
    const selected = consumer.getSelectedTargetCall(request.call);
    assert.equal(selected?.sourceSelectedSignatureParameters, request.sourceSelectedSignatureParameters);
    assert.equal(selected?.sourceSelectedCalleeSymbol, request.sourceSelectedCalleeSymbol);
    assert.equal(selected?.sourceSelectedCalleeDeclaration, request.sourceSelectedCalleeDeclaration);
  }
});

test("checked construction keeps callee identity, signature origin, and result type distinct", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
  const targetTypeRequests: TargetTypeArgumentMappingRequest[] = [];
  const { programOptions, extensionHost, program } = createSelectedCallProgram({
    files: {
      "profile.d.ts": sourceProfile,
      "index.ts": `
        import type { Options } from "@acme/native.js";

        class BaseService {
          constructor(options: Options) {}
        }

        class ExplicitDerivedService extends BaseService {
          constructor(options: Options) { super(options); }
        }

        class InheritedService extends BaseService {}
        class Product {}

        interface ProductFactory {
          new(options: Options): Product;
        }

        declare const options: Options;
        declare const ProductCtor: ProductFactory;

        new ExplicitDerivedService(options);
        new InheritedService(options);
        new ProductCtor(options);
      `,
    },
    extension: selectedCallEvidenceExtension(callRequests, targetTypeRequests, optionsBindingProvider),
  });

  assertCleanProgram(program);
  assert.equal(callRequests.length, 4);
  assert.equal(targetTypeRequests.length, 4);

  const explicitDerived = callRequests.find((request) => (request.sourceSelectedCalleeSymbol as GoPtr<Symbol>)?.Name === "ExplicitDerivedService");
  const inherited = callRequests.find((request) => (request.sourceSelectedCalleeSymbol as GoPtr<Symbol>)?.Name === "InheritedService");
  const structural = callRequests.find((request) => (request.sourceSelectedCalleeSymbol as GoPtr<Symbol>)?.Name === "ProductCtor");
  const superCall = callRequests.find((request) => request !== explicitDerived && request !== inherited && request !== structural);
  assert.ok(explicitDerived !== undefined);
  assert.ok(inherited !== undefined);
  assert.ok(structural !== undefined);
  assert.ok(superCall !== undefined);

  assert.ok(explicitDerived.sourceReturnType !== undefined);
  assert.ok(inherited.sourceReturnType !== undefined);
  assert.ok(structural.sourceReturnType !== undefined);
  assert.notEqual(explicitDerived.sourceReturnType, inherited.sourceReturnType);
  assert.notEqual(inherited.sourceReturnType, structural.sourceReturnType);
  assert.equal((inherited.sourceSelectedCalleeSymbol as GoPtr<Symbol>)?.Name, "InheritedService");
  assert.equal((inherited.sourceSelectedSignatureParameters?.[0]?.parameterSymbol as GoPtr<Symbol>)?.Name, "options");
  assert.ok(inherited.sourceSelectedDeclaration !== undefined);
  assert.notEqual(inherited.sourceSelectedDeclaration, inherited.sourceSelectedCalleeDeclaration);
  assert.equal((structural.sourceSelectedCalleeSymbol as GoPtr<Symbol>)?.Name, "ProductCtor");
  assert.equal(structural.sourceSelectedSignatureParameters?.[0]?.parameterName, "options");
  assert.ok(structural.sourceSelectedDeclaration !== undefined);
  assert.notEqual(structural.sourceSelectedDeclaration, structural.sourceSelectedCalleeDeclaration);
  assert.equal(superCall.sourceSelectedSignatureParameters?.[0]?.parameterName, "options");

  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  const consumer = createExtensionConsumerQueries(extensionHost, "selected-constructor-shape-test");
  for (const request of callRequests) {
    const selected = consumer.getSelectedTargetCall(request.call);
    assert.equal(selected?.sourceSelectedSignatureParameters, request.sourceSelectedSignatureParameters);
    assert.equal(selected?.sourceSelectedCalleeSymbol, request.sourceSelectedCalleeSymbol);
    assert.equal(selected?.sourceSelectedCalleeDeclaration, request.sourceSelectedCalleeDeclaration);
    assert.equal(selected?.sourceReturnType, request.sourceReturnType);
  }
});

test("target mappers cannot replace checker-owned selected source evidence", () => {
  assert.equal(targetSignatureSelectionHasExactTargetOwnedKeys, true);
  const callRequests: CheckedCallMappingRequest[] = [];
  const targetTypeRequests: TargetTypeArgumentMappingRequest[] = [];
  const forgedSymbol = {};
  const forgedDeclaration = {};
  const forgedType = {};
  const forgedSignature = {};
  const forgedParameter: SourceSelectedSignatureParameter = {
    parameterIndex: 99,
    parameterName: "forged",
    parameterSymbol: forgedSymbol,
    parameterDeclaration: forgedDeclaration,
    selectedType: forgedType,
    authoredTypeNode: forgedDeclaration,
    acceptsOmission: true,
    rest: true,
  };
  const forgedProvenance: Partial<SelectedTargetSignatureFact> = {
    sourceSelectedMethodTypeArguments: [{ typeParameterName: "Forged", selectedType: forgedType }],
    sourceSelectedSignatureParameters: [forgedParameter],
    sourceSelectedSignatureKind: "error",
    sourceSignature: forgedSignature,
    sourceDeclaration: forgedDeclaration,
    sourceCalleeSymbol: forgedSymbol,
    sourceCalleeDeclaration: forgedDeclaration,
    sourceSelectedCalleeSymbol: forgedSymbol,
    sourceSelectedCalleeDeclaration: forgedDeclaration,
    sourceReturnType: forgedType,
  };
  const { programOptions, extensionHost, program } = createSelectedCallProgram({
    files: {
      "profile.d.ts": sourceProfile,
      "index.ts": `
        class Service {
          constructor(value: string) {}
        }
        declare const value: string;
        export const service = new Service(value);
      `,
    },
    extension: selectedCallEvidenceExtension(callRequests, targetTypeRequests, undefined, forgedProvenance),
  });

  assertCleanProgram(program);
  assert.equal(callRequests.length, 1);
  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  const request = callRequests[0]!;
  const selected = createExtensionConsumerQueries(extensionHost, "selected-source-authority-test").getSelectedTargetCall(request.call);
  assert.ok(selected !== undefined);
  assert.equal(selected.sourceSignature, request.sourceSelectedSignature);
  assert.equal(selected.sourceDeclaration, request.sourceSelectedDeclaration);
  assert.equal(selected.sourceCalleeSymbol, request.sourceCalleeSymbol);
  assert.equal(selected.sourceCalleeDeclaration, request.sourceCalleeDeclaration);
  assert.equal(selected.sourceSelectedCalleeSymbol, request.sourceSelectedCalleeSymbol);
  assert.equal(selected.sourceSelectedCalleeDeclaration, request.sourceSelectedCalleeDeclaration);
  assert.equal(selected.sourceReturnType, request.sourceReturnType);
  assert.equal(selected.sourceSelectedSignatureParameters, request.sourceSelectedSignatureParameters);
  assert.equal(selected.sourceSelectedSignatureKind, request.sourceSelectedSignatureKind);
  assert.notEqual(selected.sourceSignature, forgedSignature);
  assert.notEqual(selected.sourceSelectedCalleeSymbol, forgedSymbol);
  assert.notEqual(selected.sourceSelectedSignatureParameters, forgedProvenance.sourceSelectedSignatureParameters);
  assert.notEqual(selected.sourceSelectedSignatureKind, forgedProvenance.sourceSelectedSignatureKind);
  assert.equal(selected.sourceSelectedMethodTypeArguments, undefined);
});

function createSelectedCallProgram(options: {
  readonly files: Readonly<Record<string, string>>;
  readonly extension: CompilerExtension;
}): {
  readonly programOptions: ProgramOptions;
  readonly extensionHost: ReturnType<typeof attachExtensionHost>["extensionHost"];
  readonly program: GoPtr<Program>;
} {
  const fileEntries = Object.entries(options.files).map(([fileName, text]) => [`/src/${fileName}`, text] as const);
  let fs = FromMap(new Map<string, string>([
    ...fileEntries,
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
        strict: true,
      },
      files: Object.keys(options.files),
    })],
  ]), false as bool);
  fs = WrapFS(fs);
  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);
  const baseOptions = { Config: parsed, Host: host } satisfies ProgramOptions;
  const extended = attachExtensionHost(baseOptions, {
    activeTarget: "acme",
    extensions: [options.extension],
  });
  const program = NewProgram(extended.program);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  return { programOptions: extended.program, extensionHost: extended.extensionHost, program };
}

function selectedCallEvidenceExtension(
  callRequests: CheckedCallMappingRequest[],
  targetTypeRequests: TargetTypeArgumentMappingRequest[],
  bindingProvider?: TargetBindingProvider,
  returnedSourceProvenance?: Partial<SelectedTargetSignatureFact>,
): CompilerExtension {
  return {
    identity: {
      id: "acme-selected-call-evidence-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-selected-call-evidence",
    },
    initialize(context): void {
      if (bindingProvider !== undefined) {
        assert.equal(context.registerTargetBindingProvider(bindingProvider), true);
      }
      assert.equal(context.registerTargetSemanticProvider(selectedCallSemanticProvider(callRequests, targetTypeRequests, returnedSourceProvenance)), true);
    },
  };
}

function selectedCallSemanticProvider(
  callRequests: CheckedCallMappingRequest[],
  targetTypeRequests: TargetTypeArgumentMappingRequest[],
  returnedSourceProvenance?: Partial<SelectedTargetSignatureFact>,
): TargetSemanticProvider {
  return {
    identity: {
      id: "acme-selected-call-evidence-provider",
      version: "1.0.0",
      target: "acme",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "semantic",
    },
    mapCheckedCall: (request) => {
      callRequests.push(request);
      const construct = IsNewExpression(request.call as GoPtr<Node>);
      return acceptObservation({
        selectedSignature: {
          ...returnedSourceProvenance,
          member: {
            id: `Acme.${construct ? "Construct" : "Call"}.${callRequests.length}`,
            sourceName: construct ? "constructor" : "call",
            targetName: construct ? "new" : "invoke",
            kind: construct ? "constructor" : "method",
            parameters: request.arguments.map((_, parameterIndex) => ({
              name: `argument${parameterIndex}`,
              type: { kind: "target-specific", target: "acme", name: "selected-source-parameter" },
              passingMode: "by-value",
            })),
          },
        } satisfies TargetSignatureSelection,
      });
    },
    mapInferredSourceTypeArgumentsToTarget: (request) => {
      targetTypeRequests.push(request);
      return acceptObservation({ targetTypeArguments: [] });
    },
  };
}

const optionsBindingProvider: TargetBindingProvider = {
  identity: {
    id: "acme-options-provider",
    version: "1.0.0",
    target: "acme",
    extensionContractVersion: TstsProviderContractVersion,
    providerKind: "binding",
  },
  ownsModule: (moduleSpecifier) => moduleSpecifier === "@acme/native.js" ? { kind: "owned" } : { kind: "unowned" },
  resolveModule: (moduleSpecifier) => ({
    kind: "virtual",
    moduleSpecifier,
    virtualFileName: "tsts-provider://acme/native",
    providerModuleId: "acme.native",
    packageName: "@acme/native",
    packageVersion: "1.0.0",
  }),
  getDeclarationModel: (resolution) => ({
    moduleSpecifier: resolution.moduleSpecifier,
    providerModuleId: resolution.providerModuleId,
    exports: [{
      id: "Options",
      name: "Options",
      kind: "class",
      targetIdentity: { target: "acme", id: "Acme.Options" },
      members: [{
        id: "Options.nativeId",
        name: "nativeId",
        kind: "property",
        readonly: true,
        type: { kind: "string" },
      }],
    }],
  }),
};

function assertSelectedParameterProvenance(parameters: readonly SourceSelectedSignatureParameter[]): void {
  for (let parameterIndex = 0; parameterIndex < parameters.length; parameterIndex++) {
    const parameter = parameters[parameterIndex]!;
    const symbol = parameter.parameterSymbol as GoPtr<Symbol>;
    const declaration = parameter.parameterDeclaration as GoPtr<Node>;
    assert.equal(parameter.parameterIndex, parameterIndex);
    assert.ok(symbol !== undefined);
    assert.ok(parameter.selectedType !== undefined);
    assert.ok(declaration !== undefined);
    assert.equal(declaration, symbol.ValueDeclaration);
    assert.equal(parameter.authoredTypeNode, Node_Type(declaration));
  }
}

function assertCleanProgram(program: GoPtr<Program>): void {
  const programDiagnostics = Program_GetProgramDiagnostics(program);
  assert.equal(programDiagnostics.length, 0, programDiagnostics.map(Diagnostic_String).join("\n"));
  for (const sourceFile of Program_GetSourceFiles(program)) {
    const syntacticDiagnostics = Program_GetSyntacticDiagnostics(program, Background(), sourceFile);
    const semanticDiagnostics = Program_GetSemanticDiagnostics(program, Background(), sourceFile);
    assert.equal(syntacticDiagnostics.length, 0, syntacticDiagnostics.map(Diagnostic_String).join("\n"));
    assert.equal(semanticDiagnostics.length, 0, semanticDiagnostics.map(Diagnostic_String).join("\n"));
  }
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
`;
