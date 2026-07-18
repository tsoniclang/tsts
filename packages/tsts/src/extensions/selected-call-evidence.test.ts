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
} from "./index.js";

type TargetCallMappingResult = Extract<CheckedCallMappingResult, { readonly kind: "target" }>;
type SourceCallMappingResult = Extract<CheckedCallMappingResult, { readonly kind: "source" }>;
type TargetSignatureSelectionKeys = keyof TargetCallMappingResult["selectedSignature"];
type TargetSignatureSelectionAllowedKeys = "member" | "targetTypeArguments" | "providerDeclaration";
const targetSignatureSelectionHasExactTargetOwnedKeys: Exclude<TargetSignatureSelectionKeys, TargetSignatureSelectionAllowedKeys> extends never
  ? Exclude<TargetSignatureSelectionAllowedKeys, TargetSignatureSelectionKeys> extends never
    ? true
    : false
  : false = true;
type TargetCallMappingResultKeys = keyof TargetCallMappingResult;
type TargetCallMappingResultAllowedKeys = "kind" | "selectedSignature" | "argumentConversions";
const checkedCallMappingResultHasExactKeys: Exclude<TargetCallMappingResultKeys, TargetCallMappingResultAllowedKeys> extends never
  ? Exclude<TargetCallMappingResultAllowedKeys, TargetCallMappingResultKeys> extends never
    ? true
    : false
  : false = true;
const sourceCallMappingResultHasExactKeys: Exclude<keyof SourceCallMappingResult, "kind"> extends never
  ? Exclude<"kind", keyof SourceCallMappingResult> extends never
    ? true
    : false
  : false = true;

test("checked construction exposes alias-resolved class identity across imports and re-exports", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
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
    extension: selectedCallEvidenceExtension(callRequests),
  });

  assertCleanProgram(program);
  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  assert.equal(callRequests.length, 7);

  const modelRequests = callRequests.slice(0, 6);
  const canonicalSymbols = modelRequests.map((request) => request.sourceCallee.selectedSymbol as GoPtr<Symbol>);
  const canonicalDeclarations = modelRequests.map((request) => request.sourceCallee.selectedDeclaration as GoPtr<Node>);
  assert.deepEqual(canonicalSymbols.map((symbol) => symbol?.Name), ["Model", "Model", "Model", "Model", "Model", "Model"]);
  assert.ok(canonicalSymbols.every((symbol) => symbol === canonicalSymbols[0]));
  assert.ok(canonicalDeclarations.every((declaration) => declaration !== undefined && declaration === canonicalDeclarations[0]));
  assert.equal(SourceFile_FileName(GetSourceFileOfNode(canonicalDeclarations[0])), "/src/model.ts");

  for (const index_ of [0, 1, 2, 4, 5, 6]) {
    const syntaxSymbol = callRequests[index_]?.sourceCallee.symbol as GoPtr<Symbol>;
    const syntaxDeclaration = callRequests[index_]?.sourceCallee.declaration as GoPtr<Node>;
    assert.ok(syntaxSymbol !== undefined && (syntaxSymbol.Flags & SymbolFlagsAlias) !== 0);
    assert.ok(syntaxDeclaration !== undefined, `Call ${index_} must retain its authored import declaration.`);
    assert.equal(SourceFile_FileName(GetSourceFileOfNode(syntaxDeclaration)), "/src/index.ts");
    assert.ok(syntaxSymbol !== callRequests[index_]?.sourceCallee.selectedSymbol, "Import syntax and selected callee symbols must remain distinct subjects.");
  }
  assert.equal((callRequests[6]?.sourceCallee.selectedSymbol as GoPtr<Symbol>)?.Name, "default");
  assert.equal(SourceFile_FileName(GetSourceFileOfNode(callRequests[6]?.sourceCallee.selectedDeclaration as GoPtr<Node>)), "/src/model.ts");

  for (let index_ = 0; index_ < callRequests.length; index_++) {
    const request = callRequests[index_]!;
    assert.ok(request.sourceSelectedSignature !== undefined);
    assert.equal(request.sourceSelectedSignatureKind, "resolved");
    assert.ok(request.sourceSelectedDeclaration === undefined, "Class construction must not fabricate a selected member declaration.");
    assert.equal(request.sourceSelectedSignatureParameters?.length, 0);
  }

  const consumer = createExtensionConsumerQueries(extensionHost, "selected-call-test");
  for (const request of callRequests) {
    const selected = consumer.getSelectedTargetCall(request.call);
    assert.ok(selected?.sourceCallee.selectedSymbol === request.sourceCallee.selectedSymbol, "Selected call facts must retain the exact selected callee symbol.");
    assert.ok(selected?.sourceCallee.selectedDeclaration === request.sourceCallee.selectedDeclaration, "Selected call facts must retain the exact selected callee declaration.");
    assertPersistedSelectedParameters(selected?.sourceSelectedSignatureParameters, request.sourceSelectedSignatureParameters);
    assert.deepEqual(selected?.argumentConversions, []);
  }
});

test("provider virtual construction exposes one canonical selected export identity", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
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
    extension: selectedCallEvidenceExtension(callRequests, optionsBindingProvider),
  });

  assertCleanProgram(program);
  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  assert.equal(callRequests.length, 2);
  const directSymbol = callRequests[0]?.sourceCallee.selectedSymbol as GoPtr<Symbol>;
  const reExportedSymbol = callRequests[1]?.sourceCallee.selectedSymbol as GoPtr<Symbol>;
  const directDeclaration = callRequests[0]?.sourceCallee.selectedDeclaration as GoPtr<Node>;
  assert.ok(directSymbol !== undefined);
  assert.ok(reExportedSymbol === directSymbol, "Re-exported construction must resolve to the canonical provider symbol.");
  assert.ok(callRequests[1]?.sourceCallee.selectedDeclaration === directDeclaration, "Re-exported construction must resolve to the canonical provider declaration.");
  assert.ok(SourceFile_FileName(GetSourceFileOfNode(directDeclaration)).startsWith("tsts-provider://"));
  assert.equal(callRequests[0]?.sourceSelectedSignatureParameters?.length, 0);
  assert.equal(callRequests[1]?.sourceSelectedSignatureParameters?.length, 0);

  const consumer = createExtensionConsumerQueries(extensionHost, "selected-provider-constructor-test");
  for (const request of callRequests) {
    const selected = consumer.getSelectedTargetCall(request.call);
    assert.ok(selected?.sourceCallee.selectedSymbol === directSymbol, "Provider construction must persist the canonical selected symbol.");
    assert.ok(selected?.sourceCallee.selectedDeclaration === directDeclaration, "Provider construction must persist the canonical selected declaration.");
    assert.deepEqual(selected?.argumentConversions, []);
  }
});

test("checked calls expose alias-resolved callable identity and selected parameter evidence", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
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
        export const parenthesized = (make)(options);
      `,
    },
    extension: selectedCallEvidenceExtension(callRequests, optionsBindingProvider),
  });

  assertCleanProgram(program);
  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  assert.equal(callRequests.length, 4);
  const selectedParameterTypes = callRequests.map((request) => request.sourceSelectedSignatureParameters?.[0]?.selectedType);
  assert.ok(selectedParameterTypes.every((selectedType) => selectedType !== undefined && selectedType === selectedParameterTypes[0]));

  const canonicalSymbols = callRequests.map((request) => request.sourceCallee.selectedSymbol as GoPtr<Symbol>);
  const canonicalDeclarations = callRequests.map((request) => request.sourceCallee.selectedDeclaration as GoPtr<Node>);
  assert.ok(canonicalSymbols.every((symbol) => symbol !== undefined && symbol.Name === "make"));
  assert.ok(canonicalSymbols.every((symbol) => symbol === canonicalSymbols[0]));
  assert.ok(canonicalDeclarations.every((declaration) => declaration !== undefined && declaration === canonicalDeclarations[0]));
  assert.equal(SourceFile_FileName(GetSourceFileOfNode(canonicalDeclarations[0])), "/src/functions.ts");
  assert.ok(canonicalSymbols[3] === canonicalSymbols[0], "Parenthesized callees must resolve to the selected callable symbol.");
  assert.ok(canonicalDeclarations[3] === canonicalDeclarations[0], "Parenthesized callees must resolve to the selected callable declaration.");

  for (let requestIndex = 0; requestIndex < callRequests.length; requestIndex++) {
    const request = callRequests[requestIndex]!;
    const syntaxSymbol = request.sourceCallee.symbol as GoPtr<Symbol>;
    assert.ok(syntaxSymbol !== undefined && (syntaxSymbol.Flags & SymbolFlagsAlias) !== 0);
    assert.ok(syntaxSymbol !== request.sourceCallee.selectedSymbol, "Authored aliases must remain distinct from selected callable symbols.");
    assert.ok(request.sourceSelectedDeclaration === canonicalDeclarations[requestIndex], "Selected declarations must retain canonical callable identity.");
    assertSelectedParameterProvenance(request.sourceSelectedSignatureParameters ?? []);
  }

  const consumer = createExtensionConsumerQueries(extensionHost, "selected-function-call-test");
  for (const request of callRequests) {
    const selected = consumer.getSelectedTargetCall(request.call);
    assertPersistedSelectedParameters(selected?.sourceSelectedSignatureParameters, request.sourceSelectedSignatureParameters);
    assert.ok(selected?.sourceCallee.selectedSymbol === request.sourceCallee.selectedSymbol, "Function call facts must retain selected callee symbol identity.");
    assert.ok(selected?.sourceCallee.selectedDeclaration === request.sourceCallee.selectedDeclaration, "Function call facts must retain selected callee declaration identity.");
    assert.deepEqual(selected?.argumentConversions, []);
  }
});

test("checked untyped calls are distinct from resolved zero-parameter signatures", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
  const { programOptions, extensionHost, program } = createSelectedCallProgram({
    files: {
      "profile.d.ts": sourceProfile,
      "index.ts": `
        declare const dynamicValue: any;
        export const result = dynamicValue();
      `,
    },
    extension: selectedCallEvidenceExtension(callRequests),
  });

  assertCleanProgram(program);
  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  assert.equal(callRequests.length, 1);
  assert.equal(callRequests[0]?.sourceSelectedSignatureKind, "untyped");
  assert.equal(callRequests[0]?.sourceSelectedSignatureParameters?.length, 0);

  const selected = createExtensionConsumerQueries(extensionHost, "selected-untyped-call-test").getSelectedTargetCall(callRequests[0]!.call);
  assert.equal(selected?.sourceSelectedSignatureKind, "untyped");
  assert.equal(selected?.sourceSelectedSignatureParameters?.length, 0);
  assert.deepEqual(selected?.argumentConversions, []);
});

test("checked construction exposes selected source parameter types and authored provenance", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
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
    extension: selectedCallEvidenceExtension(callRequests, optionsBindingProvider),
  });

  assertCleanProgram(program);
  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  assert.equal(callRequests.length, 10);
  const providerOptionsType = callRequests[0]?.sourceSelectedSignatureParameters?.[0]?.selectedType;
  const localOptionsType = callRequests[1]?.sourceSelectedSignatureParameters?.[0]?.selectedType;
  assert.ok(providerOptionsType !== undefined);
  assert.ok(localOptionsType !== undefined);
  assert.ok(providerOptionsType !== localOptionsType, "Provider and local option types must remain distinct semantic subjects.");
  assert.ok(callRequests[2]?.sourceSelectedSignatureParameters?.[0]?.selectedType === providerOptionsType, "Renamed imports must retain provider parameter type identity.");
  assert.ok(callRequests[3]?.sourceSelectedSignatureParameters?.[0]?.selectedType === providerOptionsType, "Re-exports must retain provider parameter type identity.");
  assert.ok(callRequests[4]?.sourceSelectedSignatureParameters?.[0]?.selectedType === localOptionsType, "Local constructors must retain local parameter type identity.");
  assert.ok(callRequests[5]?.sourceSelectedSignatureParameters?.[0]?.selectedType === providerOptionsType, "Optional provider parameters must retain provider type identity.");
  assert.ok(callRequests[6]?.sourceSelectedSignatureParameters?.[0]?.selectedType === providerOptionsType, "Rest provider parameters must retain provider type identity.");
  assert.ok(callRequests[5]?.sourceSelectedSignatureParameters?.[1]?.selectedType === callRequests[6]?.sourceSelectedSignatureParameters?.[1]?.selectedType, "Repeated selected primitive parameter types must retain identity.");
  assert.ok(callRequests[5]?.sourceSelectedSignatureParameters?.[2]?.selectedType === callRequests[6]?.sourceSelectedSignatureParameters?.[2]?.selectedType, "Repeated selected rest element types must retain identity.");

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
  assert.ok(genericParameter.authoredTypeNode !== genericParameter.selectedType, "Authored type syntax and selected semantic type must remain distinct subjects.");
  assert.ok(callRequests[7]?.sourceSelectedDeclaration === undefined, "Implicit empty construction must not fabricate a selected declaration.");
  assert.equal(callRequests[7]?.sourceSelectedSignatureParameters?.length, 0);

  const consumer = createExtensionConsumerQueries(extensionHost, "selected-parameter-test");
  for (const request of callRequests) {
    const selected = consumer.getSelectedTargetCall(request.call);
    assertPersistedSelectedParameters(selected?.sourceSelectedSignatureParameters, request.sourceSelectedSignatureParameters);
    assert.ok(selected?.sourceCallee.selectedSymbol === request.sourceCallee.selectedSymbol, "Constructor facts must retain selected callee symbol identity.");
    assert.ok(selected?.sourceCallee.selectedDeclaration === request.sourceCallee.selectedDeclaration, "Constructor facts must retain selected callee declaration identity.");
    assert.deepEqual(selected?.argumentConversions, []);
  }
});

test("checked construction keeps callee identity, signature origin, and result type distinct", () => {
  const callRequests: CheckedCallMappingRequest[] = [];
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
    extension: selectedCallEvidenceExtension(callRequests, optionsBindingProvider),
  });

  assertCleanProgram(program);
  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  assert.equal(callRequests.length, 4);

  const explicitDerived = callRequests.find((request) => (request.sourceCallee.selectedSymbol as GoPtr<Symbol>)?.Name === "ExplicitDerivedService");
  const inherited = callRequests.find((request) => (request.sourceCallee.selectedSymbol as GoPtr<Symbol>)?.Name === "InheritedService");
  const structural = callRequests.find((request) => (request.sourceCallee.selectedSymbol as GoPtr<Symbol>)?.Name === "ProductCtor");
  const superCall = callRequests.find((request) => request !== explicitDerived && request !== inherited && request !== structural);
  assert.ok(explicitDerived !== undefined);
  assert.ok(inherited !== undefined);
  assert.ok(structural !== undefined);
  assert.ok(superCall !== undefined);

  assert.ok(explicitDerived.sourceResult.type !== undefined);
  assert.ok(inherited.sourceResult.type !== undefined);
  assert.ok(structural.sourceResult.type !== undefined);
  assert.ok(explicitDerived.sourceResult.type !== inherited.sourceResult.type, "Distinct constructed classes must retain distinct source result types.");
  assert.ok(inherited.sourceResult.type !== structural.sourceResult.type, "Nominal and structural construction must retain distinct source result types.");
  assert.equal((inherited.sourceCallee.selectedSymbol as GoPtr<Symbol>)?.Name, "InheritedService");
  assert.equal((inherited.sourceSelectedSignatureParameters?.[0]?.parameterSymbol as GoPtr<Symbol>)?.Name, "options");
  assert.ok(inherited.sourceSelectedDeclaration !== undefined);
  assert.ok(inherited.sourceSelectedDeclaration !== inherited.sourceCallee.selectedDeclaration, "Inherited constructor origin must remain distinct from the selected class declaration.");
  assert.equal((structural.sourceCallee.selectedSymbol as GoPtr<Symbol>)?.Name, "ProductCtor");
  assert.equal(structural.sourceSelectedSignatureParameters?.[0]?.parameterName, "options");
  assert.ok(structural.sourceSelectedDeclaration !== undefined);
  assert.ok(structural.sourceSelectedDeclaration !== structural.sourceCallee.selectedDeclaration, "Structural constructor signature origin must remain distinct from its callee declaration.");
  assert.equal(superCall.sourceSelectedSignatureParameters?.[0]?.parameterName, "options");

  const consumer = createExtensionConsumerQueries(extensionHost, "selected-constructor-shape-test");
  for (const request of callRequests) {
    const selected = consumer.getSelectedTargetCall(request.call);
    assertPersistedSelectedParameters(selected?.sourceSelectedSignatureParameters, request.sourceSelectedSignatureParameters);
    assert.ok(selected?.sourceDeclaration === request.sourceSelectedDeclaration, "Construction facts must retain the checker-selected signature declaration identity.");
    assert.ok(selected?.sourceCallee.selectedSymbol === request.sourceCallee.selectedSymbol, "Construction facts must retain selected callee symbol identity.");
    assert.ok(selected?.sourceCallee.selectedDeclaration === request.sourceCallee.selectedDeclaration, "Construction facts must retain selected callee declaration identity.");
    assert.ok(selected?.sourceResult.type === request.sourceResult.type, "Construction facts must retain selected source result type identity.");
  }
});

test("target mappers cannot replace checker-owned selected source evidence", () => {
  assert.equal(targetSignatureSelectionHasExactTargetOwnedKeys, true);
  assert.equal(checkedCallMappingResultHasExactKeys, true);
  assert.equal(sourceCallMappingResultHasExactKeys, true);
  const callRequests: CheckedCallMappingRequest[] = [];
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
    sourceArgumentBindings: [],
    sourceCallee: {
      expression: forgedDeclaration,
      type: forgedType,
      symbol: forgedSymbol,
      declaration: forgedDeclaration,
      selectedSymbol: forgedSymbol,
      selectedDeclaration: forgedDeclaration,
    },
    sourceArguments: [],
    sourceResult: {
      expression: forgedDeclaration,
      type: forgedType,
    },
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
    extension: selectedCallEvidenceExtension(callRequests),
  });

  assertCleanProgram(program);
  assert.ok(finalizeExtensionSemantics(programOptions) !== undefined);
  assert.equal(callRequests.length, 1);
  const request = callRequests[0]!;
  const selected = createExtensionConsumerQueries(extensionHost, "selected-source-authority-test").getSelectedTargetCall(request.call);
  assert.ok(selected !== undefined);
  assert.ok(selected.sourceSignature === request.sourceSelectedSignature, "Selected target evidence must retain the checker-selected signature.");
  assert.ok(selected.sourceDeclaration === request.sourceSelectedDeclaration, "Selected target evidence must retain the checker-selected declaration.");
  assert.ok(selected.sourceCallee.symbol === request.sourceCallee.symbol, "Selected target evidence must retain the authored callee symbol.");
  assert.ok(selected.sourceCallee.declaration === request.sourceCallee.declaration, "Selected target evidence must retain the authored callee declaration.");
  assert.ok(selected.sourceCallee.selectedSymbol === request.sourceCallee.selectedSymbol, "Selected target evidence must retain the alias-resolved callee symbol.");
  assert.ok(selected.sourceCallee.selectedDeclaration === request.sourceCallee.selectedDeclaration, "Selected target evidence must retain the alias-resolved callee declaration.");
  assert.ok(selected.sourceResult.type === request.sourceResult.type, "Selected target evidence must retain the selected source return type.");
  assertPersistedSelectedParameters(selected.sourceSelectedSignatureParameters, request.sourceSelectedSignatureParameters);
  assert.equal(selected.sourceSelectedSignatureKind, request.sourceSelectedSignatureKind);
  assert.ok(selected.sourceSignature !== forgedSignature, "Target-provided source signature replacement must be ignored.");
  assert.ok(selected.sourceCallee.selectedSymbol !== forgedSymbol, "Target-provided source symbol replacement must be ignored.");
  assert.ok(selected.sourceSelectedSignatureParameters !== forgedProvenance.sourceSelectedSignatureParameters, "Target-provided source parameter replacement must be ignored.");
  assert.notEqual(selected.sourceSelectedSignatureKind, forgedProvenance.sourceSelectedSignatureKind);
  assert.equal(selected.sourceSelectedMethodTypeArguments, undefined);

  const rejectedRequests: CheckedCallMappingRequest[] = [];
  const rejectedProgram = createSelectedCallProgram({
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
    extension: selectedCallEvidenceExtension(rejectedRequests, undefined, forgedProvenance),
  });
  assertCleanProgram(rejectedProgram.program);
  assert.ok(finalizeExtensionSemantics(rejectedProgram.programOptions) !== undefined);
  assert.equal(rejectedRequests.length, 1);
  assert.equal(
    createExtensionConsumerQueries(rejectedProgram.extensionHost, "selected-source-injection-test").getSelectedTargetCall(rejectedRequests[0]!.call),
    undefined,
    "A target response containing source-owned provenance must be rejected rather than sanitized.",
  );
  const hookFailures = rejectedProgram.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "OBSERVATION_HOOK_FAILED");
  assert.equal(hookFailures.length, 1);
  assert.match(String(hookFailures[0]?.evidence?.[0]?.details), /TargetSignatureSelection.*unsupported field 'sourceSelectedMethodTypeArguments'/);
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
      assert.equal(context.registerTargetSemanticProvider(selectedCallSemanticProvider(callRequests, returnedSourceProvenance)), true);
    },
  };
}

function selectedCallSemanticProvider(
  callRequests: CheckedCallMappingRequest[],
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
      return acceptObservation({
        kind: "target",
        selectedSignature: {
          ...returnedSourceProvenance,
          member: {
            id: `Acme.Call.${callRequests.length}`,
            sourceName: "call",
            targetName: "invoke",
            kind: "method",
            parameters: [],
          },
          targetTypeArguments: [],
        } satisfies TargetSignatureSelection,
        argumentConversions: [],
      });
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
    assert.ok(declaration === symbol.ValueDeclaration, "Selected parameter evidence must retain the symbol's value declaration.");
    assert.ok(parameter.authoredTypeNode === Node_Type(declaration), "Selected parameter evidence must retain the authored type node.");
  }
}

function assertPersistedSelectedParameters(
  persisted: readonly SourceSelectedSignatureParameter[] | undefined,
  observed: readonly SourceSelectedSignatureParameter[] | undefined,
): void {
  assert.ok(persisted !== undefined);
  assert.ok(observed !== undefined);
  assert.ok(persisted !== observed, "Selected parameter evidence containers must cross the immutable fact snapshot boundary.");
  assert.equal(Object.isFrozen(persisted), true);
  assert.equal(persisted.length, observed.length);
  for (let parameterIndex = 0; parameterIndex < observed.length; parameterIndex++) {
    const actual: SourceSelectedSignatureParameter = persisted[parameterIndex]!;
    const expected: SourceSelectedSignatureParameter = observed[parameterIndex]!;
    assert.ok(actual !== expected, "Selected parameter evidence records must be snapshotted.");
    assert.equal(Object.isFrozen(actual), true);
    assert.equal(actual.parameterIndex, expected.parameterIndex);
    assert.equal(actual.parameterName, expected.parameterName);
    assert.ok(actual.parameterSymbol === expected.parameterSymbol, "Selected parameter symbol identity must be preserved exactly.");
    assert.ok(actual.parameterDeclaration === expected.parameterDeclaration, "Selected parameter declaration identity must be preserved exactly.");
    assert.ok(actual.selectedType === expected.selectedType, "Selected parameter semantic type identity must be preserved exactly.");
    assert.ok(actual.authoredTypeNode === expected.authoredTypeNode, "Selected parameter authored type-node identity must be preserved exactly.");
    assert.equal(actual.acceptsOmission, expected.acceptsOmission);
    assert.equal(actual.rest, expected.rest);
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
