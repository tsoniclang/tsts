import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../go/scalars.js";
import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import { SourceFile_FileName, SourceFile_Text, SourceFile_as_ast_HasFileName } from "../internal/ast/ast.js";
import { Node_Arguments, Node_Locals, Node_Members, Node_ModifierFlags, Node_Symbol, Node_Text, Node_TypeArguments } from "../internal/ast/ast.js";
import type { Symbol } from "../internal/ast/symbol.js";
import { Node_End, Node_ForEachChild, Node_Name, Node_Pos } from "../internal/ast/spine.js";
import { ModifierFlagsStatic } from "../internal/ast/modifierflags.js";
import { SymbolFlagsAlias } from "../internal/ast/symbolflags.js";
import { GetSourceFileOfNode } from "../internal/ast/utilities.js";
import { Diagnostic_Code, Diagnostic_End, Diagnostic_Pos, Diagnostic_String } from "../internal/ast/diagnostic.js";
import { AsTypeReferenceNode } from "../internal/ast/generated/casts.js";
import { KindAnyKeyword, KindArrowFunction, KindAsExpression, KindBinaryExpression, KindCallExpression, KindElementAccessExpression, KindEnumMember, KindFunctionDeclaration, KindIdentifier, KindIndexSignature, KindMappedType, KindNeverKeyword, KindNumberKeyword, KindParenthesizedExpression, KindPropertyAccessExpression, KindTypeAssertionExpression, KindTypeReference, KindUnionType, KindVariableDeclaration } from "../internal/ast/generated/kinds.js";
import { Type_Flags, Type_Symbol, TypeFlagsUniqueESSymbol } from "../internal/checker/types.js";
import type { Type } from "../internal/checker/types.js";
import { LibPath, WrapFS } from "../internal/bundled/bundled.js";
import type { CompilerOptions } from "../internal/core/compileroptions.js";
import { ResolutionModeESM } from "../internal/core/compileroptions.js";
import { NewCompilerHost } from "../internal/compiler/host.js";
import {
  NewProgram,
  Program_BindSourceFiles,
  Program_GetProgramDiagnostics,
  Program_GetResolvedModule,
  Program_GetSemanticDiagnostics,
  Program_GetSourceFile,
  Program_GetSourceFiles,
  Program_GetSyntacticDiagnostics,
  Program_GetTypeCheckerForFile,
} from "../internal/compiler/program.js";
import { Checker_isTypeIdenticalTo } from "../internal/checker/relater.js";
import { Checker_GetAliasedSymbol } from "../internal/checker/checker/symbols.js";
import { ResolvedModuleExtensionProviderVirtual, ResolvedModule_IsProviderVirtual } from "../internal/module/types.js";
import type { Program, ProgramOptions } from "../internal/compiler/program.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import { TstsProviderContractVersion, ExtensionHostDiagnosticCode, ExtensionLifecycleEvent, ExtensionObservationPoint, acceptObservation, argumentPassingFactKey, attachExtensionHost, createExtensionConsumerQueries, createSourceSemanticsExtension, deferObservation, finalizeExtensionSemantics, getExtensionHost, rejectObservation, runtimeCarrierFactKey, sourcePrimitive, sourcePrimitiveFactKey, targetConversionFactKey } from "./index.js";
import { canonicalIdentityFactKey, flowStateFactKey, instantiatedTargetTypeFactKey, providerTypeFamilyFactKey, providerVirtualDeclarationFactKey, selectedTargetSignatureFactKey, targetOperationFactKey, targetBindingFactKey } from "./index.js";
import type { ArgumentPassingMode, CheckedCallMappingRequest, CheckedConversionMappingRequest, CheckedElementAccessMappingRequest, CheckedIterationMappingRequest, CheckedOperatorMappingRequest, CheckedPropertyAccessMappingRequest, CompilerExtension, ExtensionFactSubject, ExtensionHost, ExtensionObservationContext, ParameterPassingRequest, ProviderDeclarationModel, ProviderImportSlice, ProviderMemberDeclaration, ProviderVirtualDeclarationDocument, RuntimeCarrierFactRequest, SourceFileBoundLifecycleRequest, SourcePrimitiveFact, SelectedTargetSignatureFact, SourceSelectedMethodTypeArgument, TargetConstraintValidationRequest, TargetOperationFact, TargetBindingProvider, TargetIdentity, TargetMember, TargetSemanticProvider, TargetTypeArgumentMappingRequest, TargetTypeRef } from "./index.js";
import { recordExtensionCheckedAssertionConversion, recordExtensionCheckedElementAccessMapping, recordExtensionCheckedPropertyAccessMapping } from "./checker-integration.js";
import {
  getProviderVirtualArtifactForCompiler,
  providerCanonicalExportOwnerMarker,
  providerCanonicalModuleDependencyContextMarker,
  providerVirtualInternalRoot,
  providerVirtualPublicRoot,
} from "./provider-virtual-internal.js";

function createExampleSourceSemanticsExtension(): CompilerExtension {
  return createSourceSemanticsExtension({
    identity: {
      id: "example.source-semantics",
      version: "1.0.0",
      capabilityNamespace: "example-source-semantics",
    },
    modules: [{
      moduleSpecifier: "@example/native/types.js",
      packageName: "@example/native",
      subpath: "types.js",
      exports: [
        sourcePrimitive("int", "int32", "number", true, 32),
        sourcePrimitive("byte", "uint8", "number", false, 8),
      ],
    }, {
      moduleSpecifier: "@example/native/lang.js",
      packageName: "@example/native",
      subpath: "lang.js",
      exports: [
        { kind: "call-marker", exportName: "move", marker: "move" },
      ],
    }],
  });
}

test("provider-backed virtual modules participate in normal program binding", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { SearchValues } from "@example/target/Acme.Buffers.js";

      declare const values: SearchValues<number>;
      values.Contains(1);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerExtension("@example/target/Acme.Buffers.js")],
  });

  const program = NewProgram(options);
  const sourceFileNames = Program_GetSourceFiles(program).map((file) => SourceFile_FileName(file));

  assert.equal(extended.extensionHost.diagnostics.all().length, 0);
  assert.ok(sourceFileNames.includes("/src/index.ts"));
  assert.equal(getPublicProviderSourceFiles(program, extended.extensionHost, "@example/target/Acme.Buffers.js").length, 1);

  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assert.equal(Program_GetProgramDiagnostics(program).length, 0);
  assert.equal(Program_GetSyntacticDiagnostics(program, Background(), index).length, 0);
  assert.equal(Program_GetSemanticDiagnostics(program, Background(), index).length, 0);
  const resolvedProviderModule = Program_GetResolvedModule(program, SourceFile_as_ast_HasFileName(index), "@example/target/Acme.Buffers.js", ResolutionModeESM);
  assert.equal(ResolvedModule_IsProviderVirtual(resolvedProviderModule), true);
  assert.equal(resolvedProviderModule?.Extension, ResolvedModuleExtensionProviderVirtual);
  assert.equal(resolvedProviderModule?.ProviderVirtual?.ProviderId, "acme-provider");
  assert.equal(resolvedProviderModule?.ProviderVirtual?.ProviderTarget, "acme");
  assert.equal(resolvedProviderModule?.ProviderVirtual?.ProviderModuleId, "Acme.Buffers");
  assert.equal(resolvedProviderModule?.ProviderVirtual?.ModuleSpecifier, "@example/target/Acme.Buffers.js");

  Program_BindSourceFiles(program);
  const virtualFile = getOnlyPublicProviderSourceFile(program, extended.extensionHost, "@example/target/Acme.Buffers.js");
  const virtualModuleSymbol = Node_Symbol(virtualFile as never);
  const searchValuesSymbol = virtualModuleSymbol?.Exports?.get("SearchValues");
  assert.ok(searchValuesSymbol !== undefined);
  const canonicalSearchValuesSymbol = getAliasedProviderExportSymbol(program, index, searchValuesSymbol);
  const containsSymbol = canonicalSearchValuesSymbol.Members?.get("Contains");
  assert.ok(containsSymbol !== undefined);

  assert.equal(extended.extensionHost.facts.get(virtualFile, canonicalIdentityFactKey)?.id, "Acme.Buffers");
  assert.equal(extended.extensionHost.facts.get(virtualFile, providerVirtualDeclarationFactKey)?.providerId, "acme-provider");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, canonicalIdentityFactKey)?.exportName, "SearchValues");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, providerVirtualDeclarationFactKey)?.exportName, "SearchValues");
  assert.equal(extended.extensionHost.facts.get(canonicalSearchValuesSymbol, providerVirtualDeclarationFactKey)?.exportName, "SearchValues");
  assert.equal(extended.extensionHost.facts.get(containsSymbol, providerVirtualDeclarationFactKey)?.memberName, "Contains");
  const containsDeclaration = containsSymbol.Declarations?.[0];
  assert.ok(containsDeclaration !== undefined);
  assert.equal(
    extended.extensionHost.facts.get(containsDeclaration, providerVirtualDeclarationFactKey)?.signatureId,
    "Contains(T)",
  );
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, targetBindingFactKey)?.id, "Acme.Buffers.SearchValues`1");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, targetBindingFactKey)?.typeParameters?.[0]?.constraints?.[0]?.kind, "implements");
  const constraint = extended.extensionHost.facts.get(searchValuesSymbol, targetBindingFactKey)?.typeParameters?.[0]?.constraints?.[0];
  assert.equal(constraint?.kind === "implements" ? constraint.contract : undefined, "Acme.IEquatable`1");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, targetBindingFactKey)?.members?.[0]?.id, "Contains(T)");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, targetBindingFactKey)?.members?.[0]?.parameters[0]?.type.kind, "type-parameter");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, targetBindingFactKey)?.members?.[0]?.returnType?.kind, "source-primitive");

  const call = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(extended.extensionHost.facts.get(call, selectedTargetSignatureFactKey), undefined);

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getVirtualDeclaration(virtualFile)?.providerModuleId, "Acme.Buffers");
  assert.equal(consumer.getVirtualDeclaration(searchValuesSymbol)?.exportName, "SearchValues");
  assert.equal(consumer.getTargetBindingFact(searchValuesSymbol)?.id, "Acme.Buffers.SearchValues`1");
  assert.equal(consumer.getSelectedTargetCall(call), undefined);
});

test("provider-backed virtual declarations expose undefined as a source type", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { continueWith } from "@acme/native/tasks.js";

      const result = continueWith(() => ({}), undefined);
      result;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [undefinedStateProviderExtension()],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  assertCleanProgram(program, sourceFile);
  assertCleanProviderVirtualFiles(program);

  const providerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "continueWith");
  assert.match(SourceFile_Text(providerFile), /state: object \| undefined/);
});

test("provider declarations bind exact active source-global types while retaining target carriers", () => {
  const propertyRequests: CheckedPropertyAccessMappingRequest[] = [];
  const callRequests: CheckedCallMappingRequest[] = [];
  const members: readonly ProviderMemberDeclaration[] = [{
    id: "Holder.instant",
    name: "instant",
    kind: "property",
    type: {
      kind: "target-named",
      target: "acme",
      id: "Acme.ClockInstant",
      sourceShape: { kind: "source-global", name: "ClockInstant" },
    },
  }, {
    id: "Holder.pending",
    name: "pending",
    kind: "property",
    type: {
      kind: "target-named",
      target: "acme",
      id: "Acme.Task`1",
      typeArguments: [{ kind: "provider-ref", moduleSpecifier: "@acme/native/source-globals.js", exportName: "Value" }],
      sourceShape: {
        kind: "source-global",
        name: "PromiseLikeValue",
        typeArguments: [{ kind: "provider-ref", moduleSpecifier: "@acme/native/source-globals.js", exportName: "Value" }],
      },
    },
  }];
  const { program, index, extended } = createSourceGlobalProviderProgram({
    profiles: [sourceGlobalProfile(`
      interface ClockInstant { toTicks(): number; }
      interface PromiseLikeValue<T> { then<TResult>(callback: (value: T) => TResult): PromiseLikeValue<TResult>; }
    `)],
    members,
    source: `
      import { Holder } from "@acme/native/source-globals.js";
      declare const holder: Holder;
      holder.instant.toTicks();
      holder.pending.then(value => value.label);
    `,
    onProperty: (request) => propertyRequests.push(request),
    onCall: (request) => callRequests.push(request),
  });

  assertCleanProgram(program, index);
  assertCleanProviderVirtualFiles(program);
  const providerFile = getOnlyPublicProviderSourceFile(program, extended.extensionHost, "@acme/native/source-globals.js");
  const holderOwner = getCanonicalProviderExportOwnerDocuments(extended.extensionHost)
    .find((document) => document.declarationModel.exports.some((declaration) => declaration.id === "Holder"));
  assert.ok(holderOwner !== undefined);
  assert.match(holderOwner.sourceText, /instant: globalThis\.ClockInstant;/);
  assert.match(holderOwner.sourceText, /pending: globalThis\.PromiseLikeValue<[^>]*Value[^>]*>;/);

  const instantRequest = propertyRequests.find((request) => request.propertyName === "instant");
  const pendingRequest = propertyRequests.find((request) => request.propertyName === "pending");
  assert.ok(instantRequest?.sourceResultType !== undefined);
  assert.ok(pendingRequest?.sourceResultType !== undefined);
  assert.equal(Type_Symbol(instantRequest.sourceResultType as GoPtr<Type>)?.Name, "ClockInstant");
  assert.equal(Type_Symbol(pendingRequest.sourceResultType as GoPtr<Type>)?.Name, "PromiseLikeValue");
  for (const request of [instantRequest, pendingRequest]) {
    const declarations = Type_Symbol(request.sourceResultType as GoPtr<Type>)?.Declarations ?? [];
    assert.ok(declarations.length > 0);
    assert.ok(declarations.every((declaration) => SourceFile_FileName(GetSourceFileOfNode(declaration)) === "/src/profile-0.d.ts"));
  }
  assert.ok(propertyRequests.some((request) => request.propertyName === "toTicks"));
  assert.ok(propertyRequests.some((request) => request.propertyName === "then"));
  assert.ok(propertyRequests.some((request) => request.propertyName === "label"));
  assert.ok(callRequests.length >= 2);

  Program_BindSourceFiles(program);
  const providerSymbol = Node_Symbol(providerFile as GoPtr<Node>);
  const holderSymbol = providerSymbol?.Exports?.get("Holder");
  const targetMembers = extended.extensionHost.facts.get(holderSymbol, targetBindingFactKey)?.members ?? [];
  assert.deepEqual(targetMembers.map((member) => [member.sourceName, member.returnType]), [[
    "instant",
    { kind: "target-named", id: "Acme.ClockInstant" },
  ], [
    "pending",
    {
      kind: "target-named",
      id: "Acme.Task`1",
      typeArguments: [{ kind: "opaque", id: "@acme/native/source-globals.js::Value" }],
    },
  ]]);
});

test("source-global provider references fail through exact source checking when unavailable or invalid", () => {
  const cases: readonly {
    readonly name: string;
    readonly profiles: readonly string[];
    readonly sourceShape: ProviderMemberDeclaration["type"];
    readonly expectedCode: number;
  }[] = [{
    name: "unselected",
    profiles: [sourceGlobalProfile("")],
    sourceShape: { kind: "source-global", name: "ClockInstant" },
    expectedCode: 2694,
  }, {
    name: "wrong-arity",
    profiles: [sourceGlobalProfile("interface Box<T> { value: T; }")],
    sourceShape: { kind: "source-global", name: "Box" },
    expectedCode: 2314,
  }, {
    name: "value-only",
    profiles: [sourceGlobalProfile("declare const ClockInstant: object;")],
    sourceShape: { kind: "source-global", name: "ClockInstant" },
    expectedCode: 2694,
  }, {
    name: "duplicate",
    profiles: [
      sourceGlobalProfile("type ClockInstant = object;"),
      sourceGlobalProfile("type ClockInstant = object;"),
    ],
    sourceShape: { kind: "source-global", name: "ClockInstant" },
    expectedCode: 2300,
  }];

  for (const entry of cases) {
    const { program } = createSourceGlobalProviderProgram({
      profiles: entry.profiles,
      members: [{
        id: "Holder.value",
        name: "value",
        kind: "property",
        type: {
          kind: "target-named",
          target: "acme",
          id: "Acme.Value",
          sourceShape: entry.sourceShape!,
        },
      }],
      source: `
        import { Holder } from "@acme/native/source-globals.js";
        declare const holder: Holder;
        holder.value;
      `,
    });
    const diagnostics = Program_GetSemanticDiagnostics(program, Background(), undefined);
    assert.ok(diagnostics.some((diagnostic) => Diagnostic_Code(diagnostic) === entry.expectedCode), `${entry.name}: ${diagnostics.map(Diagnostic_String).join("\n")}`);
  }
});

test("source-global provider references cannot be captured by provider-local declarations", () => {
  const propertyRequests: CheckedPropertyAccessMappingRequest[] = [];
  const { program, index } = createSourceGlobalProviderProgram({
    profiles: [sourceGlobalProfile("interface Holder { profileOnly(): number; }")],
    members: [{
      id: "Holder.profileHolder",
      name: "profileHolder",
      kind: "property",
      type: {
        kind: "target-named",
        target: "acme",
        id: "Acme.ProfileHolder",
        sourceShape: { kind: "source-global", name: "Holder" },
      },
    }],
    source: `
      import { Holder } from "@acme/native/source-globals.js";
      declare const holder: Holder;
      holder.profileHolder.profileOnly();
    `,
    onProperty: (request) => propertyRequests.push(request),
  });

  assertCleanProgram(program, index);
  assertCleanProviderVirtualFiles(program);
  const selected = propertyRequests.find((request) => request.propertyName === "profileHolder");
  assert.ok(selected?.sourceResultType !== undefined);
  const symbol = Type_Symbol(selected.sourceResultType as GoPtr<Type>);
  assert.equal(symbol?.Name, "Holder");
  assert.ok((symbol?.Declarations ?? []).every((declaration) =>
    SourceFile_FileName(GetSourceFileOfNode(declaration)) === "/src/profile-0.d.ts"));
  assert.ok(propertyRequests.some((request) => request.propertyName === "profileOnly"));
});

test("provider declarations preserve parameter passing metadata in target binding facts", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { NativePort } from "@acme/native/calls.js";

      declare const native: NativePort;
      native.byValue(1);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [passingModeProviderExtension()],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  Program_BindSourceFiles(program);
  const virtualFile = getOnlyPublicProviderSourceFile(program, extended.extensionHost, "@acme/native/calls.js");
  const ownerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "NativePort");
  const virtualText = SourceFile_Text(ownerFile);
  assert.match(virtualText, /byValue\(value: number\): void;/);
  assert.match(virtualText, /readonlyRef\(value: number\): void;/);
  assert.equal(virtualText.includes("byref-readonly"), false);
  assert.equal(virtualText.includes("byref-writeonly-must-init"), false);

  const virtualModuleSymbol = Node_Symbol(virtualFile as never);
  const nativePortSymbol = virtualModuleSymbol?.Exports?.get("NativePort");
  assert.ok(nativePortSymbol !== undefined);
  const binding = extended.extensionHost.facts.get(nativePortSymbol, targetBindingFactKey);
  const modes = new Map((binding?.members ?? []).map((member) => [member.id, member.parameters[0]?.passingMode]));
  assert.equal(modes.get("byValue(number)"), "by-value");
  assert.equal(modes.get("readonlyRef(number)"), "byref-readonly");
  assert.equal(modes.get("readwriteRef(number)"), "byref-readwrite");
  assert.equal(modes.get("writeonlyRef(number)"), "byref-writeonly-must-init");
  assert.equal(modes.get("borrowShared(number)"), "borrow-shared");
  assert.equal(modes.get("borrowMut(number)"), "borrow-mut");
  assert.equal(modes.get("move(number)"), "move");
  assert.equal(modes.get("sameShape.readonly(number)"), "byref-readonly");
  assert.equal(modes.get("sameShape.move(number)"), "move");
});

test("provider-backed virtual modules support alias and namespace import forms", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import type { SearchValues as SearchValuesAlias } from "@example/target/Acme.Buffers.js";
      import type * as Buffers from "@example/target/Acme.Buffers.js";

      declare const aliased: SearchValuesAlias<number>;
      declare const namespaced: Buffers.SearchValues<number>;
      aliased;
      namespaced;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerExtension("@example/target/Acme.Buffers.js")],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  Program_BindSourceFiles(program);
  const virtualFile = getOnlyPublicProviderSourceFile(program, extended.extensionHost, "@example/target/Acme.Buffers.js");
  const searchValuesSymbol = Node_Symbol(virtualFile as never)?.Exports?.get("SearchValues");
  assert.ok(searchValuesSymbol !== undefined);
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, targetBindingFactKey)?.id, "Acme.Buffers.SearchValues`1");
});

test("provider virtual declaration facts distinguish static instance constructor and index members", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { Buffer } from "@example/target/Acme.Buffer.js";

      declare const left: Buffer;
      declare const right: Buffer;
      Buffer.compare(left, right);
      left.compare(right);
      left[0];
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [bufferProviderExtension()],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  Program_BindSourceFiles(program);
  const virtualFile = getOnlyPublicProviderSourceFile(program, extended.extensionHost, "@example/target/Acme.Buffer.js");
  const bufferSymbol = Node_Symbol(virtualFile as never)?.Exports?.get("Buffer");
  assert.ok(bufferSymbol !== undefined);
  const canonicalBufferSymbol = getAliasedProviderExportSymbol(program, index, bufferSymbol);
  const bufferDeclaration = canonicalBufferSymbol.Declarations?.[0];
  assert.ok(bufferDeclaration !== undefined);
  const members = Node_Members(bufferDeclaration) ?? [];
  const compareMembers = members.filter((member) => {
    const name = Node_Name(member);
    return name !== undefined && Node_Text(name) === "compare";
  });
  const staticCompare = compareMembers.find((member) => (Node_ModifierFlags(member) & ModifierFlagsStatic) !== 0);
  const instanceCompare = compareMembers.find((member) => (Node_ModifierFlags(member) & ModifierFlagsStatic) === 0);
  const constructor = members.find((member) => extended.extensionHost.facts.get(member, providerVirtualDeclarationFactKey)?.memberId === "Buffer.constructor");
  const indexer = members.find((member) => extended.extensionHost.facts.get(member, providerVirtualDeclarationFactKey)?.memberId === "Buffer.index");

  assert.equal(extended.extensionHost.facts.get(staticCompare, providerVirtualDeclarationFactKey)?.signatureId, "Buffer.compare(Buffer,Buffer)");
  assert.equal(extended.extensionHost.facts.get(instanceCompare, providerVirtualDeclarationFactKey)?.signatureId, "Buffer.prototype.compare(Buffer)");
  assert.equal(extended.extensionHost.facts.get(constructor, providerVirtualDeclarationFactKey)?.signatureId, "Buffer.constructor()");
  assert.equal(extended.extensionHost.facts.get(indexer, providerVirtualDeclarationFactKey)?.signatureId, "Buffer[index]");
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("provider virtual declaration facts distinguish static and instance members with identical source names", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { DualMember } from "@acme/native/dual.js";

      declare const value: DualMember;
      DualMember.Equals(value, value);
      value.Equals(value);
      DualMember.GetType("DualMember");
      value.GetType();
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [dualMemberProviderExtension()],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  Program_BindSourceFiles(program);
  const virtualFile = getOnlyPublicProviderSourceFile(program, extended.extensionHost, "@acme/native/dual.js");
  const dualMemberSymbol = Node_Symbol(virtualFile as never)?.Exports?.get("DualMember");
  assert.ok(dualMemberSymbol !== undefined);
  const canonicalDualMemberSymbol = getAliasedProviderExportSymbol(program, index, dualMemberSymbol);
  const dualMemberDeclaration = canonicalDualMemberSymbol.Declarations?.[0];
  assert.ok(dualMemberDeclaration !== undefined);
  const members = Node_Members(dualMemberDeclaration) ?? [];

  const findMember = (name: string, staticMember: boolean): GoPtr<Node> =>
    members.find((member) => Node_Text(Node_Name(member)) === name && ((Node_ModifierFlags(member) & ModifierFlagsStatic) !== 0) === staticMember);

  assert.equal(extended.extensionHost.facts.get(findMember("Equals", true), providerVirtualDeclarationFactKey)?.memberId, "DualMember.Equals#static");
  assert.equal(extended.extensionHost.facts.get(findMember("Equals", true), providerVirtualDeclarationFactKey)?.memberStatic, true);
  assert.equal(extended.extensionHost.facts.get(findMember("Equals", false), providerVirtualDeclarationFactKey)?.memberId, "DualMember.Equals#instance");
  assert.equal(extended.extensionHost.facts.get(findMember("Equals", false), providerVirtualDeclarationFactKey)?.memberStatic, false);
  assert.equal(extended.extensionHost.facts.get(findMember("GetType", true), providerVirtualDeclarationFactKey)?.signatureId, "DualMember.GetType#static(string)");
  assert.equal(extended.extensionHost.facts.get(findMember("GetType", false), providerVirtualDeclarationFactKey)?.signatureId, "DualMember.GetType#instance()");
  assert.equal(extended.extensionHost.facts.get(canonicalDualMemberSymbol.Exports?.get("Equals"), providerVirtualDeclarationFactKey)?.memberId, "DualMember.Equals#static");
  assert.equal(extended.extensionHost.facts.get(canonicalDualMemberSymbol.Members?.get("Equals"), providerVirtualDeclarationFactKey)?.memberId, "DualMember.Equals#instance");
  assert.equal(extended.extensionHost.facts.get(canonicalDualMemberSymbol.Exports?.get("GetType"), providerVirtualDeclarationFactKey)?.memberId, "DualMember.GetType#static");
  assert.equal(extended.extensionHost.facts.get(canonicalDualMemberSymbol.Members?.get("GetType"), providerVirtualDeclarationFactKey)?.memberId, "DualMember.GetType#instance");
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("provider virtual declaration facts distinguish text keys from well-known symbol keys", () => {
  const specifier = "@acme/native/property-keys.js";
  let fs = FromMap(new Map<string, string>([
    ["/src/globals.d.ts", `
      declare const Symbol: { readonly iterator: unique symbol };
    `],
    ["/src/index.ts", `
      import type { Token } from "${specifier}";

      declare const token: Token;
      token;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["globals.d.ts", "index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);
  const options = { Config: parsed, Host: host } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [{
      identity: {
        id: "acme-property-key-facts-extension",
        version: "1.0.0",
        capabilityNamespace: "acme-property-key-facts",
      },
      initialize(context): void {
        assert.equal(context.registerTargetBindingProvider({
          identity: {
            id: "acme-property-key-facts-provider",
            version: "1.0.0",
            target: "acme",
            extensionContractVersion: TstsProviderContractVersion,
            providerKind: "binding",
          },
          ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
          resolveModule: (moduleSpecifier) => ({
            kind: "virtual",
            moduleSpecifier,
            virtualFileName: "tsts-provider://acme/property-keys",
            providerModuleId: "acme.property-keys",
          }),
          getDeclarationModel: (resolution) => ({
            moduleSpecifier: resolution.moduleSpecifier,
            providerModuleId: resolution.providerModuleId,
            exports: [{
              id: "Token",
              name: "Token",
              kind: "interface",
              members: [{
                id: "Token.text",
                name: { kind: "string-literal", text: "Symbol.iterator" },
                kind: "property",
                type: { kind: "number" },
              }, {
                id: "Token.symbol",
                name: { kind: "well-known-symbol", name: "iterator" },
                kind: "property",
                type: { kind: "string" },
              }],
            }],
          }),
        }), true);
      },
    }],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);
  assertCleanProviderVirtualFiles(program);
  Program_BindSourceFiles(program);

  const ownerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "Token", specifier);
  const tokenDeclaration = Node_Locals(ownerFile)?.get("Token")?.Declarations?.[0];
  assert.ok(tokenDeclaration !== undefined);
  const facts = (Node_Members(tokenDeclaration) ?? [])
    .map((member) => extended.extensionHost.facts.get(member, providerVirtualDeclarationFactKey))
    .filter((fact) => fact !== undefined);
  assert.equal(facts.length, 2);
  assert.deepEqual(facts.map((fact) => [fact.memberId, fact.memberKey]), [[
    "Token.text",
    { kind: "property-key", name: "Symbol.iterator" },
  ], [
    "Token.symbol",
    { kind: "well-known-symbol", name: "iterator" },
  ]]);
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("provider virtual module slice identities stay stable across source and provider imports", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { IAsyncEnumerable } from "@acme/dotnet/System.js";
      import { Query } from "@acme/dotnet/System.Linq.js";

      declare const seq: IAsyncEnumerable<number>;
      Query.consume(seq);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [sliceProviderExtension()],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  Program_BindSourceFiles(program);
  const systemFile = getOnlyPublicProviderSourceFile(program, extended.extensionHost, "@acme/dotnet/System.js");
  const systemSymbol = Node_Symbol(systemFile as never);
  assert.ok(systemSymbol !== undefined);
  const moduleIdentity = extended.extensionHost.facts.get(systemSymbol, canonicalIdentityFactKey);
  assert.equal(moduleIdentity?.id, "acme.slice.System");
  const moduleCanonicalSymbolId = moduleIdentity?.canonicalSymbolId;
  assert.ok(moduleCanonicalSymbolId !== undefined);
  assert.equal(moduleCanonicalSymbolId.includes("[object Object]"), false);
  assert.equal(moduleCanonicalSymbolId.endsWith(":undefined"), false);

  const asyncEnumerableSymbol = systemSymbol.Exports?.get("IAsyncEnumerable");
  assert.ok(asyncEnumerableSymbol !== undefined);
  const exportIdentity = extended.extensionHost.facts.get(asyncEnumerableSymbol, canonicalIdentityFactKey);
  assert.equal(exportIdentity?.exportName, "IAsyncEnumerable");
  const exportCanonicalSymbolId = exportIdentity?.canonicalSymbolId;
  assert.ok(exportCanonicalSymbolId !== undefined);
  assert.equal(exportCanonicalSymbolId.includes("[object Object]"), false);
  assert.equal(exportCanonicalSymbolId.endsWith(":undefined"), false);
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("provider virtual module dependency slices do not hide later source-requested exports", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/a.ts", `
      import { Query } from "@acme/sliced/System.Linq.js";

      Query.consume(undefined as never);
    `],
    ["/src/b.ts", `
      import { PublicReader, PublicWriter } from "@acme/sliced/System.IO.js";

      declare const reader: PublicReader;
      declare const writer: PublicWriter;
      reader;
      writer;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["a.ts", "b.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [orderDependentSliceProviderExtension()],
  });

  const program = NewProgram(options);
  const first = Program_GetSourceFile(program, "/src/a.ts");
  const second = Program_GetSourceFile(program, "/src/b.ts");
  assert.ok(first !== undefined);
  assert.ok(second !== undefined);
  assertCleanProgram(program, first);
  assertCleanProgram(program, second);

  const runtimeFiles = getPublicProviderSourceFiles(program, extended.extensionHost, "@acme/sliced/System.IO.js");
  assert.equal(runtimeFiles.length, 1);
  assert.equal(SourceFile_Text(runtimeFiles[0]).includes("__TstsProviderCanonical_DependencyOnly"), false);
  assert.ok(SourceFile_Text(runtimeFiles[0]).includes("export type { __TstsProviderCanonical_PublicReader as PublicReader };"));
  assert.ok(SourceFile_Text(runtimeFiles[0]).includes("export type { __TstsProviderCanonical_PublicWriter as PublicWriter };"));
  for (const exportName of ["DependencyOnly", "PublicReader", "PublicWriter"]) {
    assert.ok(SourceFile_Text(getCanonicalProviderExportOwnerFile(program, extended.extensionHost, exportName)).includes(`interface ${exportName}`));
  }

  Program_BindSourceFiles(program);
  for (const file of runtimeFiles) {
    const fileSymbol = Node_Symbol(file as never);
    assert.ok(fileSymbol !== undefined);
    assert.equal(extended.extensionHost.facts.get(fileSymbol, canonicalIdentityFactKey)?.id, "acme.sliced.System.IO");
    assert.equal(extended.extensionHost.facts.get(fileSymbol, providerVirtualDeclarationFactKey)?.moduleSpecifier, "@acme/sliced/System.IO.js");
  }
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("provider virtual module dependency slices preserve public export identity across heritage checks", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { Base } from "@acme/public/core.js";
      import { Derived, Token } from "@acme/public/reflection.js";

      declare const derived: Derived;
      declare const token: Token;
      const base: Base = derived;
      const made: Token = derived.make();
      derived.make();
      derived.makeMany();
      base.make();
      base.makeMany();
      token;
      made;
    `],
    ["/src/again.ts", `
      import { Token } from "@acme/public/reflection.js";
      import { Base } from "@acme/public/core.js";

      declare const base: Base;
      const token: Token = base.make();
      token;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts", "again.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [publicProviderSliceIdentityProviderExtension()],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  const repeatedSourceFile = Program_GetSourceFile(program, "/src/again.ts");
  assert.ok(sourceFile !== undefined);
  assert.ok(repeatedSourceFile !== undefined);
  assertCleanProgram(program, sourceFile);
  assertCleanProgram(program, repeatedSourceFile);
  assertCleanProviderVirtualFiles(program);

  const reflectionFiles = getPublicProviderSourceFiles(program, extended.extensionHost, "@acme/public/reflection.js");
  assert.equal(reflectionFiles.length, 2);
  assert.ok(reflectionFiles.every((file) => SourceFile_Text(file).includes("export { __TstsProviderCanonical_Token as Token };")));
  assert.ok(reflectionFiles.every((file) => SourceFile_Text(file).includes("export type { __TstsProviderCanonical_Descriptor as Descriptor };")));
  assert.equal(reflectionFiles.some((file) => SourceFile_Text(file).includes("class Token")), false);
  assert.equal(reflectionFiles.some((file) => SourceFile_Text(file).includes("@acme/public/support.js")), false);
  assert.equal(
    reflectionFiles.filter((file) => SourceFile_Text(file).includes("export { __TstsProviderCanonical_Derived as Derived };")).length,
    1,
    JSON.stringify(
      extended.extensionHost.providers.getVirtualDeclarationDocuments()
        .filter((document) => document.moduleSpecifier === "@acme/public/reflection.js")
        .map((document) => ({ fileName: document.fileName, sourceText: document.sourceText })),
      undefined,
      2,
    ),
  );

  Program_BindSourceFiles(program);
  const canonicalSymbols = new Map(["Token", "Member", "Flags", "Descriptor"].map((exportName) => [
    exportName,
    Node_Symbol(getCanonicalProviderExportOwnerFile(program, extended.extensionHost, exportName) as never)?.Exports?.get(exportName),
  ]));
  for (const [exportName, canonicalSymbol] of canonicalSymbols) {
    assert.ok(canonicalSymbol !== undefined);
    assert.equal(extended.extensionHost.facts.get(canonicalSymbol, canonicalIdentityFactKey)?.id, `acme.public.Reflection::${exportName}`);
  }
  assert.notEqual(canonicalSymbols.get("Token"), canonicalSymbols.get("Member"));
  assert.notEqual(canonicalSymbols.get("Token"), canonicalSymbols.get("Flags"));
  const [checker, done] = Program_GetTypeCheckerForFile(program, Background(), sourceFile);
  try {
    for (const aliasReflectionFile of reflectionFiles) {
      const aliasModuleSymbol = Node_Symbol(aliasReflectionFile as never);
      for (const [exportName, canonicalSymbol] of canonicalSymbols) {
        const aliasSymbol = aliasModuleSymbol?.Exports?.get(exportName);
        assert.ok(canonicalSymbol !== undefined);
        assert.ok(aliasSymbol !== undefined);
        const canonicalTarget = (canonicalSymbol.Flags & SymbolFlagsAlias) !== 0
          ? Checker_GetAliasedSymbol(checker, canonicalSymbol)
          : canonicalSymbol;
        assert.ok(Checker_GetAliasedSymbol(checker, aliasSymbol) === canonicalTarget, exportName);
      }
    }
  } finally {
    done();
  }
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("provider virtual public export identity is independent of dependency-first slice order", () => {
  const reflectionResolutionContexts: string[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { Base } from "@acme/public/core.js";

      declare const base: Base;
      base.make();
    `],
    ["/src/reflection.ts", `
      import { Token } from "@acme/public/reflection.js";

      declare const token: Token;
      token;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
        verbatimModuleSyntax: true,
      },
      files: ["index.ts", "reflection.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [publicProviderSliceIdentityProviderExtension(reflectionResolutionContexts)],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  const reflectionSourceFile = Program_GetSourceFile(program, "/src/reflection.ts");
  assert.ok(sourceFile !== undefined);
  assert.ok(reflectionSourceFile !== undefined);
  assertCleanProgram(program, sourceFile);
  assertCleanProgram(program, reflectionSourceFile);
  assert.equal(reflectionResolutionContexts[0]?.startsWith(providerVirtualInternalRoot), true);
  assert.equal(reflectionResolutionContexts[0]?.includes(providerCanonicalModuleDependencyContextMarker), true);

  const reflectionFiles = getPublicProviderSourceFiles(program, extended.extensionHost, "@acme/public/reflection.js");
  assert.equal(reflectionFiles.length, 1);
  const aliasReflectionFile = reflectionFiles[0]!;
  assert.equal(SourceFile_Text(aliasReflectionFile).includes("@acme/public/support.js"), false);
  assert.equal(SourceFile_Text(aliasReflectionFile).includes("class Token"), false);
  assert.ok(SourceFile_Text(aliasReflectionFile).includes("export type { __TstsProviderCanonical_Descriptor as Descriptor };"));

  Program_BindSourceFiles(program);
  const aliasModuleSymbol = Node_Symbol(aliasReflectionFile as never);
  const [checker, done] = Program_GetTypeCheckerForFile(program, Background(), sourceFile);
  try {
    for (const exportName of ["Token", "Member", "Flags", "Descriptor"]) {
      const canonicalSymbol = Node_Symbol(getCanonicalProviderExportOwnerFile(program, extended.extensionHost, exportName) as never)?.Exports?.get(exportName);
      const aliasSymbol = aliasModuleSymbol?.Exports?.get(exportName);
      assert.ok(canonicalSymbol !== undefined);
      assert.ok(aliasSymbol !== undefined);
      const canonicalTarget = (canonicalSymbol.Flags & SymbolFlagsAlias) !== 0
        ? Checker_GetAliasedSymbol(checker, canonicalSymbol)
        : canonicalSymbol;
      assert.ok(Checker_GetAliasedSymbol(checker, aliasSymbol) === canonicalTarget, exportName);
    }
  } finally {
    done();
  }
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("provider virtual public export identity is independent of direct-first slice order", () => {
  const reflectionResolutionContexts: string[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/reflection.ts", `
      import { Token } from "@acme/public/reflection.js";

      declare const token: Token;
      token;
    `],
    ["/src/index.ts", `
      import { Base } from "@acme/public/core.js";

      declare const base: Base;
      base.make();
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
        verbatimModuleSyntax: true,
      },
      files: ["reflection.ts", "index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);
  const options = { Config: parsed, Host: host } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [publicProviderSliceIdentityProviderExtension(reflectionResolutionContexts)],
  });
  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/reflection.ts");
  const coreSourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  assert.ok(coreSourceFile !== undefined);
  assertCleanProgram(program, sourceFile);
  assertCleanProgram(program, coreSourceFile);
  assert.equal(reflectionResolutionContexts[0], "/src/reflection.ts");

  const reflectionFiles = getPublicProviderSourceFiles(program, extended.extensionHost, "@acme/public/reflection.js");
  assert.equal(reflectionFiles.length, 1);
  const aliasFile = reflectionFiles[0]!;
  assert.ok(SourceFile_Text(aliasFile).includes("export { __TstsProviderCanonical_Token as Token };"));
  assert.equal(SourceFile_Text(aliasFile).includes("@acme/public/support.js"), false);

  Program_BindSourceFiles(program);
  const aliasModuleSymbol = Node_Symbol(aliasFile as never);
  const [checker, done] = Program_GetTypeCheckerForFile(program, Background(), sourceFile);
  try {
    for (const exportName of ["Token", "Member", "Flags", "Descriptor"]) {
      const canonicalSymbol = Node_Symbol(getCanonicalProviderExportOwnerFile(program, extended.extensionHost, exportName) as never)?.Exports?.get(exportName);
      const aliasSymbol = aliasModuleSymbol?.Exports?.get(exportName);
      assert.ok(canonicalSymbol !== undefined);
      assert.ok(aliasSymbol !== undefined);
      const canonicalTarget = (canonicalSymbol.Flags & SymbolFlagsAlias) !== 0
        ? Checker_GetAliasedSymbol(checker, canonicalSymbol)
        : canonicalSymbol;
      assert.ok(Checker_GetAliasedSymbol(checker, aliasSymbol) === canonicalTarget, exportName);
    }
  } finally {
    done();
  }
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("provider export owners give shared ordinary dependencies one checker identity", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { Left } from "@acme/shared/left.js";
      import { Right } from "@acme/shared/right.js";
      import { Token } from "@acme/shared/support.js";

      declare const left: Left;
      declare const right: Right;
      const fromLeft: Token = left.make();
      const fromRight: Token = right.make();
      fromLeft;
      fromRight;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);
  const options = { Config: parsed, Host: host } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [sharedOrdinaryDependencyProviderExtension()],
  });
  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  assertCleanProgram(program, sourceFile);
  assertCleanProviderVirtualFiles(program);

  const tokenOwners = getCanonicalProviderExportOwnerDocuments(extended.extensionHost).filter((document) =>
    document.moduleSpecifier === "@acme/shared/support.js"
    && document.declarationModel.exports.some((declaration) => declaration.id === "Token"));
  assert.equal(tokenOwners.length, 1);
  const tokenOwnerFile = Program_GetSourceFile(program, tokenOwners[0]!.fileName);
  assert.ok(tokenOwnerFile !== undefined);
  const leftOwnerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "Left");
  const rightOwnerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "Right");
  const leftImport = SourceFile_Text(leftOwnerFile).match(/import type \{ Token as ([A-Za-z0-9_$]+) \} from "([^"]+)";/);
  const rightImport = SourceFile_Text(rightOwnerFile).match(/import type \{ Token as ([A-Za-z0-9_$]+) \} from "([^"]+)";/);
  assert.ok(leftImport !== null);
  assert.ok(rightImport !== null);
  assert.equal(leftImport[2], tokenOwners[0]!.fileName);
  assert.equal(rightImport[2], tokenOwners[0]!.fileName);

  Program_BindSourceFiles(program);
  const tokenSymbol = Node_Symbol(tokenOwnerFile as never)?.Exports?.get("Token");
  const leftAlias = Node_Locals(leftOwnerFile)?.get(leftImport[1]!);
  const rightAlias = Node_Locals(rightOwnerFile)?.get(rightImport[1]!);
  assert.ok(tokenSymbol !== undefined);
  assert.ok(leftAlias !== undefined);
  assert.ok(rightAlias !== undefined);
  const [checker, done] = Program_GetTypeCheckerForFile(program, Background(), sourceFile);
  try {
    assert.ok(Checker_GetAliasedSymbol(checker, leftAlias) === tokenSymbol);
    assert.ok(Checker_GetAliasedSymbol(checker, rightAlias) === tokenSymbol);
    const publicSupportFile = getOnlyPublicProviderSourceFile(program, extended.extensionHost, "@acme/shared/support.js");
    const publicToken = Node_Symbol(publicSupportFile as never)?.Exports?.get("Token");
    assert.ok(publicToken !== undefined);
    assert.ok(Checker_GetAliasedSymbol(checker, publicToken) === tokenSymbol);
  } finally {
    done();
  }
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("provider virtual canonical default exports bind as one value and type identity", () => {
  const valueSpecifier = "@acme/default/value.js";
  const typeSpecifier = "@acme/default/type.js";
  const supportSpecifier = "@acme/default/support.js";
  let needsSupportImport = false;
  const defaultProviderExtension: CompilerExtension = {
    identity: {
      id: "acme-default-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-default-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-default-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === valueSpecifier || moduleSpecifier === typeSpecifier || moduleSpecifier === supportSpecifier
          ? { kind: "owned" }
          : { kind: "unowned" },
        resolveModule: (moduleSpecifier, moduleContext) => {
          needsSupportImport = moduleContext.containingFile?.includes("second") === true;
          return {
            kind: "virtual",
            moduleSpecifier,
            virtualFileName: moduleSpecifier === valueSpecifier
              ? "tsts-provider://acme/default-value"
              : moduleSpecifier === typeSpecifier
                ? "tsts-provider://acme/default-type"
                : "tsts-provider://acme/default-support",
            providerModuleId: moduleSpecifier === valueSpecifier
              ? "acme.default.value"
              : moduleSpecifier === typeSpecifier
                ? "acme.default.type"
                : "acme.default.support",
          };
        },
        getDeclarationModel: (resolution) => {
          if (resolution.moduleSpecifier === supportSpecifier) {
            return {
              moduleSpecifier: resolution.moduleSpecifier,
              providerModuleId: resolution.providerModuleId,
              exports: [{ id: "Marker", name: "Marker", kind: "interface", members: [] }],
            };
          }
          const kind = resolution.moduleSpecifier === valueSpecifier ? "class" : "interface";
          return {
            moduleSpecifier: resolution.moduleSpecifier,
            providerModuleId: resolution.providerModuleId,
            ...(needsSupportImport ? {
              imports: [{
                moduleSpecifier: supportSpecifier,
                typeOnly: true,
                namedImports: [{ exportedName: "Marker" }],
              }],
            } : {}),
            exports: [{
              id: kind === "class" ? "DefaultToken" : "DefaultShape",
              name: kind === "class" ? "DefaultToken" : "DefaultShape",
              exportKind: "default",
              kind,
              members: [],
            }],
          };
        },
      }), true);
    },
  };
  let fs = FromMap(new Map<string, string>([
    ["/src/value-first.ts", `
      import DefaultToken from "${valueSpecifier}";
      declare const token: DefaultToken;
      token;
    `],
    ["/src/value-second.ts", `
      import DefaultToken from "${valueSpecifier}";
      declare const token: DefaultToken;
      token;
    `],
    ["/src/type-first.ts", `
      import type DefaultShape from "${typeSpecifier}";
      declare const shape: DefaultShape;
      shape;
    `],
    ["/src/type-second.ts", `
      import type DefaultShape from "${typeSpecifier}";
      declare const shape: DefaultShape;
      shape;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
        verbatimModuleSyntax: true,
      },
      files: ["value-first.ts", "value-second.ts", "type-first.ts", "type-second.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);
  const options = { Config: parsed, Host: host } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, { activeTarget: "acme", extensions: [defaultProviderExtension] });
  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/value-first.ts");
  assert.ok(sourceFile !== undefined);
  for (const fileName of ["/src/value-first.ts", "/src/value-second.ts", "/src/type-first.ts", "/src/type-second.ts"]) {
    const file = Program_GetSourceFile(program, fileName);
    assert.ok(file !== undefined);
    assertCleanProgram(program, file);
  }

  Program_BindSourceFiles(program);
  const [checker, done] = Program_GetTypeCheckerForFile(program, Background(), sourceFile);
  try {
    for (const moduleSpecifier of [valueSpecifier, typeSpecifier] as const) {
      const files = getPublicProviderSourceFiles(program, extended.extensionHost, moduleSpecifier);
      assert.equal(files.length, 1);
      const aliasFile = files[0]!;
      const ownerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "default", moduleSpecifier);
      const canonicalSymbol = Node_Symbol(ownerFile as never)?.Exports?.get("default");
      const aliasSymbol = Node_Symbol(aliasFile as never)?.Exports?.get("default");
      assert.ok(canonicalSymbol !== undefined);
      assert.ok(aliasSymbol !== undefined);
      const canonicalTarget = (canonicalSymbol.Flags & SymbolFlagsAlias) !== 0
        ? Checker_GetAliasedSymbol(checker, canonicalSymbol)
        : canonicalSymbol;
      assert.ok(Checker_GetAliasedSymbol(checker, aliasSymbol) === canonicalTarget, moduleSpecifier);
    }
  } finally {
    done();
  }
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("provider virtual external generic heritage uses value-capable family variants", () => {
  for (const familyFirst of [true, false]) {
    assertExternalGenericHeritageProgram(familyFirst);
  }
});

function assertExternalGenericHeritageProgram(familyFirst: boolean): void {
  const providerRequests: { readonly moduleSpecifier: string; readonly requestedExports: readonly string[] }[] = [];
  const imports = familyFirst
    ? `
      import { ReadOnlyCollection } from "@acme/public/collections.js";
      import {
        ModelCollection,
        ModelMetadata,
        ModelPropertyCollection,
        NamespaceModelCollection,
        OpaqueModelPropertyCollection,
        WrappedModelPropertyCollection,
      } from "@acme/public/model-binding.js";
    `
    : `
      import {
        ModelCollection,
        ModelMetadata,
        ModelPropertyCollection,
        NamespaceModelCollection,
        OpaqueModelPropertyCollection,
        WrappedModelPropertyCollection,
      } from "@acme/public/model-binding.js";
      import { ReadOnlyCollection } from "@acme/public/collections.js";
    `;
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      ${imports}

      declare const plain: ModelCollection;
      declare const collection: ModelPropertyCollection;
      declare const namespaceCollection: NamespaceModelCollection;
      declare const wrappedCollection: WrappedModelPropertyCollection;
      declare const opaqueCollection: OpaqueModelPropertyCollection;
      declare const metadata: ModelMetadata;
      declare const plainReadOnly: ReadOnlyCollection;
      declare const readOnly: ReadOnlyCollection<ModelMetadata>;
      const count: number = plain.Count;
      const item: ModelMetadata = collection.Item;
      const namespaceCount: number = namespaceCollection.Count;
      const wrappedItem: ModelMetadata = wrappedCollection.Item;
      const opaqueItem: ModelMetadata = opaqueCollection.Item;
      plain;
      collection;
      namespaceCollection;
      wrappedCollection;
      opaqueCollection;
      metadata;
      plainReadOnly;
      readOnly;
      count;
      item;
      namespaceCount;
      wrappedItem;
      opaqueItem;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
        verbatimModuleSyntax: true,
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [externalGenericHeritageProviderExtension((moduleSpecifier, requestedExports) => {
      providerRequests.push({ moduleSpecifier, requestedExports });
    })],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  assertCleanProgram(program, sourceFile);
  assertCleanProviderVirtualFiles(program);

  const modelCollectionFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "ModelCollection");
  const modelPropertyCollectionFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "ModelPropertyCollection");
  const modelCollectionText = SourceFile_Text(modelCollectionFile);
  const modelPropertyCollectionText = SourceFile_Text(modelPropertyCollectionFile);
  const exactZeroImport = modelCollectionText.match(/import \{ __TstsProvider_ReadOnlyCollection_0 as ([A-Za-z0-9_$]+) \} from "([^"]+\.tsts-export-owner-[^"]+\.d\.ts)";/);
  const exactOneImport = modelPropertyCollectionText.match(/import \{ __TstsProvider_ReadOnlyCollection_1 as ([A-Za-z0-9_$]+) \} from "([^"]+\.tsts-export-owner-[^"]+\.d\.ts)";/);
  assert.ok(exactZeroImport !== null);
  assert.ok(exactOneImport !== null);
  assert.equal(exactZeroImport[2], exactOneImport[2]);
  assert.ok(modelCollectionText.includes(`class ModelCollection extends ${exactZeroImport[1]}`));
  assert.ok(modelPropertyCollectionText.includes(`class ModelPropertyCollection extends ${exactOneImport[1]}<`));
  for (const [exportName, variant] of [
    ["NamespaceModelCollection", "0"],
    ["WrappedModelPropertyCollection", "1"],
    ["OpaqueModelPropertyCollection", "1"],
  ] as const) {
    const text = SourceFile_Text(getCanonicalProviderExportOwnerFile(program, extended.extensionHost, exportName));
    assert.match(text, new RegExp(`import \\{ __TstsProvider_ReadOnlyCollection_${variant} as [A-Za-z0-9_$]+ \\} from ${JSON.stringify(exactZeroImport[2])};`));
    assert.equal(text.includes("extends ImportedReadOnlyCollection"), false);
  }
  assert.equal(providerRequests.some((request) =>
    request.moduleSpecifier.startsWith("tsts-provider://")
    || request.requestedExports.some((exportName) => exportName.startsWith("__TstsProvider_"))), false);
  const collectionFiles = getPublicProviderSourceFiles(program, extended.extensionHost, "@acme/public/collections.js");
  assert.equal(collectionFiles.length, 1);
  const aliasCollectionFile = collectionFiles[0]!;
  const ownerFile = Program_GetSourceFile(program, exactZeroImport[2]!);
  assert.ok(ownerFile !== undefined);
  const ownerArtifact = getProviderVirtualArtifactForCompiler(extended.extensionHost.providers, exactZeroImport[2]!);
  assert.ok(ownerArtifact !== undefined);
  assert.equal(ownerArtifact.packageName, "@acme/public");
  assert.equal(ownerArtifact.packageVersion, "1.0.0");
  assert.match(SourceFile_Text(aliasCollectionFile), /export \{ __TstsProviderCanonical_ReadOnlyCollection as ReadOnlyCollection \};/);
  assert.match(SourceFile_Text(ownerFile), /export declare const ReadOnlyCollection: typeof __TstsProvider_ReadOnlyCollection_0 & typeof __TstsProvider_ReadOnlyCollection_1;/);
  assert.match(SourceFile_Text(ownerFile), /export \{ __TstsProvider_ReadOnlyCollection_0 \};/);
  assert.match(SourceFile_Text(ownerFile), /export \{ __TstsProvider_ReadOnlyCollection_1 \};/);
  Program_BindSourceFiles(program);
  const ownerZero = Node_Locals(ownerFile)?.get("__TstsProvider_ReadOnlyCollection_0");
  const ownerOne = Node_Locals(ownerFile)?.get("__TstsProvider_ReadOnlyCollection_1");
  assert.ok(ownerZero !== undefined);
  assert.ok(ownerOne !== undefined);
  assert.equal(extended.extensionHost.facts.get(ownerZero, providerVirtualDeclarationFactKey)?.exportId, "ReadOnlyCollection");
  assert.equal(extended.extensionHost.facts.get(ownerOne, providerVirtualDeclarationFactKey)?.exportId, "ReadOnlyCollection_1");
  assert.equal(extended.extensionHost.facts.get(ownerZero, targetBindingFactKey)?.id, "Acme.Collections.ReadOnlyCollection");
  assert.equal(extended.extensionHost.facts.get(ownerOne, targetBindingFactKey)?.id, "Acme.Collections.ReadOnlyCollection`1");
  assert.equal(extended.extensionHost.facts.get(ownerZero, canonicalIdentityFactKey)?.packageName, "@acme/public");
  assert.equal(extended.extensionHost.facts.get(ownerOne, canonicalIdentityFactKey)?.packageVersion, "1.0.0");
  const canonicalFamilySymbol = Node_Symbol(ownerFile as never)?.Exports?.get("ReadOnlyCollection");
  assert.ok(canonicalFamilySymbol !== undefined);
  const [checker, done] = Program_GetTypeCheckerForFile(program, Background(), sourceFile);
  try {
    const aliasFamilySymbol = Node_Symbol(aliasCollectionFile as never)?.Exports?.get("ReadOnlyCollection");
    assert.ok(aliasFamilySymbol !== undefined);
    assert.ok(Checker_GetAliasedSymbol(checker, aliasFamilySymbol) === canonicalFamilySymbol);
    const zeroHeritageAlias = Node_Locals(modelCollectionFile)?.get(exactZeroImport[1]!);
    const oneHeritageAlias = Node_Locals(modelPropertyCollectionFile)?.get(exactOneImport[1]!);
    assert.ok(zeroHeritageAlias !== undefined);
    assert.ok(oneHeritageAlias !== undefined);
    assert.ok(Checker_GetAliasedSymbol(checker, zeroHeritageAlias) === ownerZero);
    assert.ok(Checker_GetAliasedSymbol(checker, oneHeritageAlias) === ownerOne);
  } finally {
    done();
  }
}

test("canonical provider export owners stay hidden from extension enumeration and lifecycle hooks", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { SearchValues } from "@example/target/Acme.Buffers.js";

      declare const values: SearchValues<number>;
      values;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const boundFileNames: string[] = [];
  let ownerFileNames: readonly string[] = [];
  let compilerSourceFileNames: readonly string[] | undefined;
  let compilerOwnerFiles: readonly (GoPtr<SourceFile> | undefined)[] | undefined;
  let inspectedBeforeFinalization = false;
  const lifecycleObserver: CompilerExtension = {
    identity: {
      id: "acme-provider-owner-lifecycle-observer",
      version: "1.0.0",
      capabilityNamespace: "acme-provider-owner-lifecycle-observer",
    },
    initialize(context): void {
      context.registerLifecycleHook<SourceFileBoundLifecycleRequest>(ExtensionLifecycleEvent.afterSourceFileBound, (request) => {
        boundFileNames.push(request.fileName);
      });
      context.registerLifecycleHook(ExtensionLifecycleEvent.beforeSemanticsFinalized, (_request, lifecycleContext) => {
        inspectedBeforeFinalization = true;
        compilerSourceFileNames = lifecycleContext.compiler.getSourceFiles().map((file) => SourceFile_FileName(file));
        compilerOwnerFiles = ownerFileNames.map((fileName) => lifecycleContext.compiler.getSourceFile(fileName));
      });
    },
  };

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);
  const options = { Config: parsed, Host: host } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerExtension("@example/target/Acme.Buffers.js"), lifecycleObserver],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  const publicDocuments = extended.extensionHost.providers.getVirtualDeclarationDocuments();
  assert.equal(publicDocuments.length, 1);
  const publicFileName = publicDocuments[0]!.fileName;
  assert.equal(publicDocuments.some((document) => document.fileName.includes(providerCanonicalExportOwnerMarker)), false);
  assert.ok(Program_GetSourceFile(program, publicFileName) !== undefined);

  const ownerDocuments = getCanonicalProviderExportOwnerDocuments(extended.extensionHost);
  assert.equal(ownerDocuments.length, 1);
  ownerFileNames = ownerDocuments.map((document) => document.fileName);
  const ownerFiles = ownerDocuments.map((document) => {
    assert.equal(extended.extensionHost.providers.getVirtualDeclarationDocument(document.fileName), undefined);
    assert.equal(extended.extensionHost.providers.getVirtualDeclarationDocument(document.uri), undefined);
    const file = Program_GetSourceFile(program, document.fileName);
    assert.ok(file !== undefined);
    return file;
  });

  Program_BindSourceFiles(program);
  assertCleanProgram(program, sourceFile);
  assert.ok(boundFileNames.includes("/src/index.ts"));
  assert.ok(boundFileNames.includes(publicFileName));
  assert.equal(boundFileNames.some((fileName) => fileName.includes(providerCanonicalExportOwnerMarker)), false);
  for (const [index, ownerFile] of ownerFiles.entries()) {
    const ownerDocument = ownerDocuments[index]!;
    assert.equal(extended.extensionHost.facts.get(ownerFile, canonicalIdentityFactKey)?.id, ownerDocument.providerModuleId);
    assert.equal(extended.extensionHost.facts.get(ownerFile, providerVirtualDeclarationFactKey)?.providerId, "acme-provider");
    const ownerSymbol = Node_Symbol(ownerFile as never);
    assert.ok(ownerSymbol !== undefined);
    assert.equal(extended.extensionHost.facts.get(ownerSymbol, providerVirtualDeclarationFactKey)?.moduleSpecifier, ownerDocument.moduleSpecifier);
  }

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  assert.equal(inspectedBeforeFinalization, true);
  assert.ok(compilerSourceFileNames !== undefined);
  assert.ok(compilerSourceFileNames.includes("/src/index.ts"));
  assert.ok(compilerSourceFileNames.includes(publicFileName));
  assert.equal(compilerSourceFileNames.some((fileName) => fileName.includes(providerCanonicalExportOwnerMarker)), false);
  assert.deepEqual(compilerOwnerFiles, ownerFiles.map(() => undefined));
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("canonical provider export owners remain internal to provider virtual declarations", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", "export {};"],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);
  const options = { Config: parsed, Host: host } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [externalGenericHeritageProviderExtension()],
  });
  const prepared = extended.extensionHost.providers.resolveVirtualModule("@acme/public/model-binding.js", {
    activeTarget: "acme",
    containingFile: "/src/bootstrap.ts",
    importSlice: {
      moduleSpecifier: "@acme/public/model-binding.js",
      kind: "named",
      requestedExports: [{ exportedName: "ModelCollection", kind: "value" }],
      typeOnly: false,
    },
  });
  assert.equal(prepared.kind, "resolved");
  const owner = getCanonicalProviderExportOwnerDocuments(extended.extensionHost).find((document) =>
    document.sourceText.includes("__TstsProvider_ReadOnlyCollection_1"));
  assert.ok(owner !== undefined);
  assert.equal(fs.WriteFile("/src/index.ts", `
    import { __TstsProvider_ReadOnlyCollection_0 } from "@acme/public/collections.js";
    import { __TstsProvider_ReadOnlyCollection_1 } from ${JSON.stringify(owner.fileName)};
    __TstsProvider_ReadOnlyCollection_0;
    __TstsProvider_ReadOnlyCollection_1;
  `), undefined);

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  assert.equal(Program_GetProgramDiagnostics(program).length, 0);
  assert.equal(Program_GetSyntacticDiagnostics(program, Background(), sourceFile).length, 0);
  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), sourceFile);
  assert.deepEqual(diagnostics.map(Diagnostic_Code).sort((left, right) => left - right), [2305, 2307]);
});

test("host-owned provider URI roots cannot be claimed from user source", () => {
  const publicSpecifier = "@acme/provider-uri-boundary.js";
  const reservedSpecifiers = [
    "tsts-provider://tsts-internal/forged-owner.d.ts",
    "tsts-provider://tsts-public/forged-slice.d.ts",
  ] as const;
  const ownershipRequests: string[] = [];
  const resolutionRequests: string[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import type { Widget } from ${JSON.stringify(publicSpecifier)};
      import ${JSON.stringify(reservedSpecifiers[0])};
      import ${JSON.stringify(reservedSpecifiers[1])};

      declare const widget: Widget;
      widget;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);
  const options = { Config: parsed, Host: host } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [broadProviderUriBoundaryExtension(publicSpecifier, ownershipRequests, resolutionRequests)],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  assert.equal(Program_GetProgramDiagnostics(program).length, 0);
  assert.equal(Program_GetSyntacticDiagnostics(program, Background(), sourceFile).length, 0);
  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), sourceFile);
  assert.deepEqual(diagnostics.map(Diagnostic_Code), [2882, 2882]);
  for (const reservedSpecifier of reservedSpecifiers) {
    assert.equal(diagnostics.filter((diagnostic) => Diagnostic_String(diagnostic).includes(reservedSpecifier)).length, 1);
  }

  assert.ok(ownershipRequests.includes(publicSpecifier));
  assert.ok(resolutionRequests.includes(publicSpecifier));
  assert.equal(ownershipRequests.some(isReservedProviderUri), false);
  assert.equal(resolutionRequests.some(isReservedProviderUri), false);

  const publicDocuments = extended.extensionHost.providers.getVirtualDeclarationDocuments();
  assert.equal(publicDocuments.length, 1);
  const ownerDocuments = getCanonicalProviderExportOwnerDocuments(extended.extensionHost);
  assert.equal(ownerDocuments.length, 1);
  assert.equal(publicDocuments[0]!.sourceText.includes(ownerDocuments[0]!.fileName), true);
  assert.ok(Program_GetSourceFile(program, ownerDocuments[0]!.fileName) !== undefined);
  assertCleanProviderVirtualFiles(program);
});

test("provider virtual canonical slices preserve exact multi-arity family heritage", () => {
  for (const fileOrder of [
    ["base.ts", "derived.ts"],
    ["derived.ts", "base.ts"],
    ["base.ts", "middle.ts", "derived.ts"],
    ["base.ts", "derived.ts", "middle.ts"],
    ["middle.ts", "base.ts", "derived.ts"],
    ["middle.ts", "derived.ts", "base.ts"],
    ["derived.ts", "base.ts", "middle.ts"],
    ["derived.ts", "middle.ts", "base.ts"],
  ] as const) {
    const { program, sourceFiles, extended } = createCanonicalMultiArityHeritageProgram(fileOrder);
    for (const sourceFile of sourceFiles) {
      assertCleanProgram(program, sourceFile);
    }
    assertCleanProviderVirtualFiles(program);

    const familyFiles = getPublicProviderSourceFiles(program, extended.extensionHost, "@acme/canonical/family.js");
    assert.equal(familyFiles.length, fileOrder.length);
    const canonicalFile = familyFiles.find((file) => SourceFile_Text(file).includes("__TstsProviderCanonical_Base"));
    assert.ok(canonicalFile !== undefined);
    assert.match(SourceFile_Text(canonicalFile), /export \{ __TstsProviderCanonical_Base as Base \};/);
    const baseOwnerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "Base");
    const middleZeroOwnerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "Middle0");
    const middleOneOwnerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "Middle1");
    const derivedZeroOwnerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "Derived0");
    const derivedOneOwnerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "Derived1");
    assert.match(SourceFile_Text(baseOwnerFile), /export declare const Base: typeof __TstsProvider_Base_0 & typeof __TstsProvider_Base_1;/);
    assert.match(SourceFile_Text(middleZeroOwnerFile), /class Middle0 extends __TstsProviderExact_Base_0_/);
    assert.match(SourceFile_Text(middleOneOwnerFile), /class Middle1<T> extends __TstsProviderExact_Base_1_[A-Za-z0-9_$]*<T>/);
    assert.match(SourceFile_Text(derivedZeroOwnerFile), /class Derived0 extends __TstsProviderExact_Middle0_0_/);
    assert.match(SourceFile_Text(derivedOneOwnerFile), /class Derived1<T> extends __TstsProviderExact_Middle1_1_[A-Za-z0-9_$]*<T>/);
    Program_BindSourceFiles(program);
    const exactZero = Node_Locals(baseOwnerFile)?.get("__TstsProvider_Base_0");
    const exactOne = Node_Locals(baseOwnerFile)?.get("__TstsProvider_Base_1");
    assert.ok(exactZero !== undefined);
    assert.ok(exactOne !== undefined);
    assert.equal(extended.extensionHost.facts.get(exactZero, providerVirtualDeclarationFactKey)?.exportId, "Base");
    assert.equal(extended.extensionHost.facts.get(exactOne, providerVirtualDeclarationFactKey)?.exportId, "Base_1");
    assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
  }
});

test("provider virtual recursive declaration closure preserves acyclic class heritage in either source order", () => {
  const coreSpecifier = "@acme/recursive/core.js";
  const reflectionSpecifier = "@acme/recursive/reflection.js";
  const snapshots: string[][] = [];

  for (const importOrder of [
    [coreSpecifier, reflectionSpecifier],
    [reflectionSpecifier, coreSpecifier],
  ] as const) {
    const importText = importOrder.map((moduleSpecifier) => moduleSpecifier === coreSpecifier
      ? `import { Base } from ${JSON.stringify(coreSpecifier)};`
      : `import { DerivedMember } from ${JSON.stringify(reflectionSpecifier)};`).join("\n");
    let fs = FromMap(new Map<string, string>([
      ["/src/index.ts", `
        ${importText}

        declare const derived: DerivedMember;
        const base: Base = derived;
        const inherited: number = derived.BaseValue;
        base;
        inherited;
      `],
      ["/src/tsconfig.json", JSON.stringify({
        compilerOptions: {
          noLib: true,
          module: "esnext",
          moduleResolution: "bundler",
          verbatimModuleSyntax: true,
        },
        files: ["index.ts"],
      })],
    ]), false as bool);
    fs = WrapFS(fs);

    const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
    const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
    assert.equal((configErrors ?? []).length, 0);
    const options = { Config: parsed, Host: host } satisfies ProgramOptions;
    const providerRequests: Array<{ readonly moduleSpecifier: string; readonly requestedExports: readonly string[] }> = [];
    const extended = attachExtensionHost(options, {
      activeTarget: "acme",
      extensions: [recursiveDeclarationHeritageProviderExtension((moduleSpecifier, requestedExports) => {
        providerRequests.push({ moduleSpecifier, requestedExports });
      })],
    });
    const program = NewProgram(options);
    const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
    assert.ok(sourceFile !== undefined);
    assertCleanProgram(program, sourceFile);
    assertCleanProviderVirtualFiles(program);
    assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
    assert.ok(providerRequests.some((request) =>
      request.moduleSpecifier === coreSpecifier && request.requestedExports.includes("Base")));
    assert.ok(providerRequests.some((request) =>
      request.moduleSpecifier === reflectionSpecifier && request.requestedExports.includes("Member")));
    assert.equal(providerRequests.some((request) =>
      request.moduleSpecifier.startsWith("tsts-provider://")
      || request.requestedExports.some((exportName) => exportName.startsWith("__TstsProvider_"))), false);

    const providerFiles = Program_GetSourceFiles(program).filter((file) =>
      SourceFile_FileName(file).startsWith("tsts-provider://"));
    assert.match(SourceFile_Text(getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "DerivedMember")),
      /class __TstsProvider_DerivedMember_0 extends __TstsProviderExact_Base_0_/);
    assert.match(SourceFile_Text(getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "Base")),
      /class __TstsProvider_Base_0 extends __TstsProviderExact_Member_0_/);
    assert.match(SourceFile_Text(getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "Member")),
      /class __TstsProvider_Member_0 extends __TstsProviderExact_Root_0_/);
    snapshots.push(providerFiles
      .map((file) => `${SourceFile_FileName(file)}\n${SourceFile_Text(file)}`)
      .sort());
  }

  assert.deepEqual(snapshots[0], snapshots[1]);
});

test("provider virtual generic member chains do not leave stale unresolved property diagnostics", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { List, Dictionary } from "@acme/public/collections.js";

      interface Todo {
        readonly title: string;
      }

      declare const todos: Dictionary<number, Todo>;
      declare const result: List<Todo>;
      const values = todos.Values;
      const enumerator = values.GetEnumerator();
      const current = enumerator.Current;
      result.Add(enumerator.Current);
      current.title;
    `],
    ["/src/again.ts", `
      import { Dictionary_ValueCollection_Enumerator } from "@acme/public/collections.js";

      declare const enumerator: Dictionary_ValueCollection_Enumerator<number, { readonly title: string }>;
      enumerator.Current.title;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts", "again.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerGenericMemberChainExtension()],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  const repeatedSourceFile = Program_GetSourceFile(program, "/src/again.ts");
  assert.ok(sourceFile !== undefined);
  assert.ok(repeatedSourceFile !== undefined);
  assertCleanProgram(program, sourceFile);
  assertCleanProgram(program, repeatedSourceFile);

  const collectionFiles = getPublicProviderSourceFiles(program, extended.extensionHost, "@acme/public/collections.js");
  assert.equal(collectionFiles.length, 2);
  assert.ok(collectionFiles.some((file) => SourceFile_Text(file).includes("export { __TstsProviderCanonical_Dictionary_ValueCollection_Enumerator as Dictionary_ValueCollection_Enumerator };")));
  assert.match(SourceFile_Text(getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "Dictionary_ValueCollection_Enumerator")),
    /class Dictionary_ValueCollection_Enumerator/);
});

test("provider virtual module same-file named import slices compose before resolution", () => {
  const requestedSlices: string[][] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { A } from "@acme/native/mod.js";
      import { B, C } from "@acme/native/mod.js";

      declare const a: A;
      declare const b: B;
      declare const c: C;
      a;
      b;
      c;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [sameModuleSliceProviderExtension(requestedSlices)],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  assertCleanProgram(program, sourceFile);

  assert.deepEqual(requestedSlices[0], ["A", "B", "C"]);
  const runtimeFiles = getPublicProviderSourceFiles(program, extended.extensionHost, "@acme/native/mod.js");
  assert.equal(runtimeFiles.length, 1);
  for (const exportName of ["A", "B", "C"]) {
    assert.ok(SourceFile_Text(runtimeFiles[0]).includes(`export type { __TstsProviderCanonical_${exportName} as ${exportName} };`));
    assert.ok(SourceFile_Text(getCanonicalProviderExportOwnerFile(program, extended.extensionHost, exportName)).includes(`interface ${exportName}`));
  }
});

test("provider virtual rest parameters preserve array-of-function source shapes", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { Parallel } from "@acme/native/parallel.js";

      Parallel.Invoke(
        () => {},
        () => {}
      );
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [restFunctionArrayProviderExtension()],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  assertCleanProgram(program, sourceFile);

  const virtualFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "Parallel");
  assert.ok(SourceFile_Text(virtualFile).includes("...actions: (() => void)[]"));
  assert.ok(!SourceFile_Text(virtualFile).includes("...actions: () => void[]"));
});

test("provider type families select same-name variants by source type-argument arity", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { Task } from "@acme/native/tasks.js";

      declare const pending: Task;
      declare const completed: Task<string>;
      declare const bottom: Task<never>;
      declare const dynamic: Task<any>;

      pending.Wait();
      completed.Wait();
      completed.Result;
      bottom.Wait();
      bottom.Result;
      dynamic.Wait();
      dynamic.Result;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [taskTypeFamilyProviderExtension()],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  assertCleanProgram(program, sourceFile);
  assertCleanProviderVirtualFiles(program);

  Program_BindSourceFiles(program);
  const publicDocuments = extended.extensionHost.providers.getVirtualDeclarationDocuments()
    .filter((document) => document.moduleSpecifier === "@acme/native/tasks.js");
  assert.equal(publicDocuments.length, 1);
  const virtualFile = Program_GetSourceFile(program, publicDocuments[0]!.fileName);
  assert.ok(virtualFile !== undefined);
  const ownerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "Task");
  const virtualText = SourceFile_Text(ownerFile);
  assert.match(virtualText, /declare class __TstsProvider_Task_0/);
  assert.match(virtualText, /declare class __TstsProvider_Task_1<TResult> extends __TstsProvider_Task_0/);
  assert.match(virtualText, /Duplicate: Task<TResult>;/);
  assert.equal(/declare class __TstsProvider_Task_[01][^\n]* extends Task(?:<|\s*\{)/.test(virtualText), false);
  assert.match(virtualText, /export type Task<TResult = __TstsProviderTypeFamilyDefault> = __TstsProviderTypeFamilyIsDefault<TResult> extends true \? __TstsProvider_Task_0 : __TstsProvider_Task_1<TResult>;/);
  assert.match(virtualText, /export declare const Task: typeof __TstsProvider_Task_0 & typeof __TstsProvider_Task_1;/);
  assert.equal(virtualText.includes("export { Task_1 as Task }"), false);

  const publicSymbol = Node_Symbol(virtualFile as never)?.Exports?.get("Task");
  const taskFamilySymbol = Node_Symbol(ownerFile as never)?.Exports?.get("Task");
  assert.ok(publicSymbol !== undefined);
  assert.ok(taskFamilySymbol !== undefined);
  const familyFact = extended.extensionHost.facts.get(taskFamilySymbol, providerTypeFamilyFactKey);
  assert.equal(familyFact?.exportName, "Task");
  assert.deepEqual(familyFact?.variants.map((variant) => [variant.sourceTypeArgumentCount, variant.declaration.exportId, variant.declaration.targetIdentity?.kind === "target-named" ? variant.declaration.targetIdentity.id : undefined]), [
    [0, "Task", "Acme.Threading.Tasks.Task"],
    [1, "Task_1", "Acme.Threading.Tasks.Task`1"],
  ]);

  const task0Symbol = Node_Locals(ownerFile)?.get("__TstsProvider_Task_0");
  const task1Symbol = Node_Locals(ownerFile)?.get("__TstsProvider_Task_1");
  assert.equal(extended.extensionHost.facts.get(task0Symbol, providerVirtualDeclarationFactKey)?.exportName, "Task");
  assert.equal(extended.extensionHost.facts.get(task0Symbol, providerVirtualDeclarationFactKey)?.exportId, "Task");
  assert.equal(extended.extensionHost.facts.get(task1Symbol, providerVirtualDeclarationFactKey)?.exportName, "Task");
  assert.equal(extended.extensionHost.facts.get(task1Symbol, providerVirtualDeclarationFactKey)?.exportId, "Task_1");
  const publicFamilyFact = extended.extensionHost.facts.get(publicSymbol, providerTypeFamilyFactKey);
  assert.deepEqual(publicFamilyFact?.variants.map((variant) => [variant.sourceTypeArgumentCount, variant.declaration.exportId, variant.targetBinding?.id]),
    familyFact?.variants.map((variant) => [variant.sourceTypeArgumentCount, variant.declaration.exportId, variant.targetBinding?.id]));
  assert.ok(publicFamilyFact?.variants.every((variant) => variant.declaration.artifactFileName === publicDocuments[0]!.fileName));
  assert.ok(familyFact?.variants.every((variant) => variant.declaration.artifactFileName.includes(providerCanonicalExportOwnerMarker)));

  const task0Reference = findTypeReferenceByNameAndArity(sourceFile, "Task", 0);
  const taskStringReference = findTypeReferenceByNameAndArity(sourceFile, "Task", 1);
  const taskNeverReference = findTypeReferenceByNameAndTypeArgumentKind(sourceFile, "Task", KindNeverKeyword);
  const taskAnyReference = findTypeReferenceByNameAndTypeArgumentKind(sourceFile, "Task", KindAnyKeyword);
  for (const [reference, exportId, targetId, typeArgumentCount] of [
    [task0Reference, "Task", "Acme.Threading.Tasks.Task", 0],
    [taskStringReference, "Task_1", "Acme.Threading.Tasks.Task`1", 1],
    [taskNeverReference, "Task_1", "Acme.Threading.Tasks.Task`1", 1],
    [taskAnyReference, "Task_1", "Acme.Threading.Tasks.Task`1", 1],
  ] as const) {
    assert.equal(extended.extensionHost.facts.get(reference, providerVirtualDeclarationFactKey)?.exportId, exportId);
    assert.equal(extended.extensionHost.facts.get(reference, targetBindingFactKey)?.id, targetId);
    assert.equal(extended.extensionHost.facts.get(reference, instantiatedTargetTypeFactKey)?.targetType.id, targetId);
    assert.equal(extended.extensionHost.facts.get(reference, instantiatedTargetTypeFactKey)?.typeArguments.length, typeArgumentCount);
  }
});

test("provider type families keep variant members separate", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { Task } from "@acme/native/tasks.js";

      declare const pending: Task;
      pending.Result;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [taskTypeFamilyProviderExtension()],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  assert.equal(Program_GetProgramDiagnostics(program).length, 0);
  assert.equal(Program_GetSyntacticDiagnostics(program, Background(), sourceFile).length, 0);
  const semanticDiagnostics = Program_GetSemanticDiagnostics(program, Background(), sourceFile);
  assert.equal(semanticDiagnostics.length, 1, semanticDiagnostics.map(Diagnostic_String).join("\n"));
  assert.equal(Diagnostic_Code(semanticDiagnostics[0]), 2339);
  assert.match(Diagnostic_String(semanticDiagnostics[0]), /Result/);
});

test("provider virtual declaration facts include enum members", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { NativeEnum } from "@acme/native/enums.js";

      const value = NativeEnum.memberA;
      value;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [enumProviderExtension()],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  Program_BindSourceFiles(program);
  const virtualFile = getOnlyPublicProviderSourceFile(program, extended.extensionHost, "@acme/native/enums.js");
  const nativeEnumSymbol = Node_Symbol(virtualFile as never)?.Exports?.get("NativeEnum");
  assert.ok(nativeEnumSymbol !== undefined);
  const canonicalNativeEnumSymbol = getAliasedProviderExportSymbol(program, index, nativeEnumSymbol);
  const memberSymbol = canonicalNativeEnumSymbol.Exports?.get("memberA");
  assert.ok(memberSymbol !== undefined);
  const ownerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "NativeEnum");
  const memberDeclaration = findFirstNodeByKind(ownerFile as GoPtr<Node>, KindEnumMember);

  const symbolFact = extended.extensionHost.facts.get(memberSymbol, providerVirtualDeclarationFactKey);
  const declarationFact = extended.extensionHost.facts.get(memberDeclaration, providerVirtualDeclarationFactKey);
  assert.equal(symbolFact?.providerId, "acme-enum-provider");
  assert.equal(symbolFact?.providerVersion, "1.0.0");
  assert.equal(symbolFact?.providerModuleId, "acme.native.enums");
  assert.equal(symbolFact?.moduleSpecifier, "@acme/native/enums.js");
  assert.equal(symbolFact?.exportName, "NativeEnum");
  assert.equal(symbolFact?.exportId, "NativeEnum");
  assert.equal(symbolFact?.memberName, "memberA");
  assert.equal(symbolFact?.memberId, "Acme.NativeEnum.memberA");
  assert.deepEqual(declarationFact, symbolFact);
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("provider virtual declaration facts include namespace value and function members", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { NativeNamespace } from "@acme/native/namespace.js";

      const value = NativeNamespace.value;
      const computed = NativeNamespace.compute();
      value;
      computed;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [namespaceProviderExtension()],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  Program_BindSourceFiles(program);
  const virtualFile = getOnlyPublicProviderSourceFile(program, extended.extensionHost, "@acme/native/namespace.js");
  const nativeNamespaceSymbol = Node_Symbol(virtualFile as never)?.Exports?.get("NativeNamespace");
  assert.ok(nativeNamespaceSymbol !== undefined);
  const canonicalNativeNamespaceSymbol = getAliasedProviderExportSymbol(program, index, nativeNamespaceSymbol);
  const valueSymbol = canonicalNativeNamespaceSymbol.Exports?.get("value");
  const computeSymbol = canonicalNativeNamespaceSymbol.Exports?.get("compute");
  assert.ok(valueSymbol !== undefined);
  assert.ok(computeSymbol !== undefined);

  const ownerFile = getCanonicalProviderExportOwnerFile(program, extended.extensionHost, "NativeNamespace");
  const valueDeclaration = findNamedNodeByKind(ownerFile as GoPtr<Node>, KindVariableDeclaration, "value");
  const computeDeclaration = findNamedNodeByKind(ownerFile as GoPtr<Node>, KindFunctionDeclaration, "compute");
  assert.equal(extended.extensionHost.facts.get(valueSymbol, providerVirtualDeclarationFactKey)?.memberId, "Acme.NativeNamespace.value");
  assert.equal(extended.extensionHost.facts.get(valueDeclaration, providerVirtualDeclarationFactKey)?.memberId, "Acme.NativeNamespace.value");
  assert.equal(extended.extensionHost.facts.get(computeSymbol, providerVirtualDeclarationFactKey)?.memberId, "Acme.NativeNamespace.compute");
  assert.equal(extended.extensionHost.facts.get(computeDeclaration, providerVirtualDeclarationFactKey)?.signatureId, "Acme.NativeNamespace.compute()");
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("provider-backed resolution receives import slices without target-specific defaults", () => {
  const observedSlices = new Map<string, ProviderImportSlice | undefined>();
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { Foo as LocalFoo, type Bar } from "@acme/provider/named.js";
      import type * as AcmeNs from "@acme/provider/namespace.js";
      import "@acme/provider/bare.js";
      export { Foo as ReFoo } from "@acme/provider/reexport.js";

      declare const localFoo: LocalFoo;
      declare const bar: Bar;
      declare const nsFoo: AcmeNs.Foo;
      localFoo;
      bar;
      nsFoo;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme-native",
    extensions: [acmeProviderExtension(observedSlices)],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const named = observedSlices.get("@acme/provider/named.js");
  assert.equal(named?.kind, "named");
  assert.equal(named?.typeOnly, undefined);
  assert.deepEqual(named?.requestedExports, [
    { exportedName: "Foo", localName: "LocalFoo", kind: "value" },
    { exportedName: "Bar", localName: "Bar", kind: "type" },
  ]);

  const namespace = observedSlices.get("@acme/provider/namespace.js");
  assert.equal(namespace?.kind, "namespace");
  assert.equal(namespace?.typeOnly, true);
  assert.equal(namespace?.broadImport, true);

  const bare = observedSlices.get("@acme/provider/bare.js");
  assert.equal(bare?.kind, "bare");
  assert.equal(bare?.broadImport, true);

  const reexport = observedSlices.get("@acme/provider/reexport.js");
  assert.equal(reexport?.kind, "reexport");
  assert.deepEqual(reexport?.requestedExports, [
    { exportedName: "Foo", localName: "ReFoo", kind: "value" },
  ]);

  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("programs without an extension host stay on the direct TS-Go path", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { value } from "./local.js";
      value.toString();
    `],
    ["/src/local.ts", "export const value = 1;"],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const program = NewProgram(options);
  assert.ok(program !== undefined);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);

  assert.equal(getExtensionHost(program), undefined);
  assert.ok(!Program_GetSourceFiles(program).some((file) => SourceFile_FileName(file).startsWith("tsts-provider://")));
  assert.equal(Program_GetProgramDiagnostics(program).length, 0);
  assert.equal(Program_GetSyntacticDiagnostics(program, Background(), index).length, 0);
});

test("checker records provider-owned target call facts for consumers", () => {
  const selectedSignature = selectedSearchValuesContainsSignature();
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare function contains(value: number): boolean;
      contains(1);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerExtension("@example/target/Acme.Console.js", false, semanticProvider(selectedSignature))],
  });

  const program = NewProgram(options);
  assert.ok(program !== undefined);
  assert.equal(getExtensionHost(program), extended.extensionHost);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const call = findFirstNodeByKind(index, KindCallExpression);
  const selected = extended.extensionHost.facts.get(call, selectedTargetSignatureFactKey);
  assert.equal(selected?.member.id, "Contains(T)");
  assert.equal(selected?.member.parameters[0]?.type.kind, "type-parameter");
  assert.equal(selected?.member.returnType?.kind, "source-primitive");
  assert.ok(selected?.sourceSignature !== undefined);
  assert.ok(selected?.sourceDeclaration !== undefined);

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getSelectedTargetCall(call)?.member.id, "Contains(T)");
});

test("checker records provider-owned target type argument facts on selected calls", () => {
  let observedTargetTypeArgumentRequest: TargetTypeArgumentMappingRequest | undefined;
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare function convert<T>(value: number): T;
      const result = convert(1);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-generic-inference-extension", genericInferenceSemanticProvider((request) => {
      observedTargetTypeArgumentRequest = request;
    }))],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const call = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  const selectedCall = consumer.getSelectedTargetCall(call);
  assert.equal(observedTargetTypeArgumentRequest?.call, call);
  assert.equal(observedTargetTypeArgumentRequest?.target, "acme");
  assert.ok(observedTargetTypeArgumentRequest?.sourceSelectedSignature !== undefined);
  assert.ok(observedTargetTypeArgumentRequest?.sourceSelectedDeclaration !== undefined);
  assert.ok(observedTargetTypeArgumentRequest?.sourceCalleeSymbol !== undefined);
  assert.ok(observedTargetTypeArgumentRequest?.sourceCalleeDeclaration !== undefined);
  assert.ok(observedTargetTypeArgumentRequest?.sourceReturnType !== undefined);
  assert.equal(selectedCall?.member.id, "Acme.Convert.ChangeType<T>(Acme.Int32)");
  assert.equal(selectedCall?.typeArguments, undefined);
  assert.deepEqual(selectedCall?.targetTypeArguments, [{ kind: "source-primitive", name: "int32" }]);
});

test("checker exposes explicit selected source method type arguments on checked calls", () => {
  let observedTypeArguments: readonly SourceSelectedMethodTypeArgument[] | undefined;
  let observedTypeArgumentRequest: CheckedCallMappingRequest | undefined;
  let observedTypeText = "";
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare class Result {}
      declare function id<T>(value: T): T;
      declare const value: Result;
      id<Result>(value);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-source-type-arguments-extension", sourceTypeArgumentSemanticProvider((request, context) => {
      observedTypeArgumentRequest = request;
      observedTypeArguments = request.sourceSelectedMethodTypeArguments;
      observedTypeText = context.compiler.checker.typeToString(observedTypeArguments?.[0]?.selectedType as GoPtr<Type>);
    }))],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const call = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  const selectedCall = consumer.getSelectedTargetCall(call);
  assert.equal(observedTypeArguments?.length, 1);
  assert.equal(observedTypeArguments?.[0]?.typeParameterName, "T");
  assert.ok(observedTypeArguments?.[0]?.typeParameter !== undefined);
  assert.ok(observedTypeArguments?.[0]?.selectedType !== undefined);
  assert.equal(observedTypeArguments?.[0]?.explicitTypeNode, (Node_TypeArguments(call) ?? [])[0]);
  assert.equal(observedTypeArgumentRequest?.call, call);
  assert.equal(observedTypeArgumentRequest?.sourceReturnType, observedTypeArguments?.[0]?.selectedType);
  assert.equal(observedTypeText, "Result");
  assert.equal(selectedCall?.sourceSelectedMethodTypeArguments?.[0]?.selectedType, observedTypeArguments?.[0]?.selectedType);
  assert.equal(selectedCall?.sourceSelectedMethodTypeArguments?.[0]?.explicitTypeNode, observedTypeArguments?.[0]?.explicitTypeNode);
  assert.equal(selectedCall?.sourceCalleeSymbol, observedTypeArgumentRequest?.sourceCalleeSymbol);
  assert.equal(selectedCall?.sourceCalleeDeclaration, observedTypeArgumentRequest?.sourceCalleeDeclaration);
  assert.equal(selectedCall?.sourceReturnType, observedTypeArgumentRequest?.sourceReturnType);
});

test("checker exposes inferred selected source method type arguments on checked calls", () => {
  let observedTypeArguments: readonly SourceSelectedMethodTypeArgument[] | undefined;
  let observedTypeText = "";
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare class Result {}
      declare function id<T>(value: T): T;
      declare const value: Result;
      id(value);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-source-type-arguments-extension", sourceTypeArgumentSemanticProvider((request, context) => {
      observedTypeArguments = request.sourceSelectedMethodTypeArguments;
      observedTypeText = context.compiler.checker.typeToString(observedTypeArguments?.[0]?.selectedType as GoPtr<Type>);
    }))],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const call = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  const selectedCall = consumer.getSelectedTargetCall(call);
  assert.equal(observedTypeArguments?.length, 1);
  assert.equal(observedTypeArguments?.[0]?.typeParameterName, "T");
  assert.ok(observedTypeArguments?.[0]?.typeParameter !== undefined);
  assert.ok(observedTypeArguments?.[0]?.selectedType !== undefined);
  assert.equal(observedTypeArguments?.[0]?.explicitTypeNode, undefined);
  assert.equal(observedTypeText, "Result");
  assert.equal(selectedCall?.sourceSelectedMethodTypeArguments?.[0]?.selectedType, observedTypeArguments?.[0]?.selectedType);
  assert.equal(selectedCall?.sourceSelectedMethodTypeArguments?.[0]?.explicitTypeNode, undefined);
});

test("checker exposes explicit selected source method type arguments on callback-shaped generic methods", () => {
  let observedTypeArguments: readonly SourceSelectedMethodTypeArgument[] | undefined;
  let observedTypeText = "";
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare class State {}
      declare class Task<T> {
        ContinueWith<TNewResult>(continuation: (task: Task<T>, state: State) => TNewResult, state: State): Task<TNewResult>;
      }
      declare const requestTask: Task<string>;
      declare const nextTask: Task<string>;
      declare const state: State;
      requestTask.ContinueWith<Task<string>>((task, currentState) => nextTask, state);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-source-type-arguments-extension", sourceTypeArgumentSemanticProvider((request, context) => {
      observedTypeArguments = request.sourceSelectedMethodTypeArguments;
      observedTypeText = context.compiler.checker.typeToString(observedTypeArguments?.[0]?.selectedType as GoPtr<Type>);
    }))],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const call = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  const selectedCall = consumer.getSelectedTargetCall(call);
  assert.equal(observedTypeArguments?.length, 1);
  assert.equal(observedTypeArguments?.[0]?.typeParameterName, "TNewResult");
  assert.ok(observedTypeArguments?.[0]?.typeParameter !== undefined);
  assert.ok(observedTypeArguments?.[0]?.selectedType !== undefined);
  assert.equal(observedTypeArguments?.[0]?.explicitTypeNode, (Node_TypeArguments(call) ?? [])[0]);
  assert.equal(observedTypeText, "Task<string>");
  assert.equal(selectedCall?.sourceSelectedMethodTypeArguments?.[0]?.selectedType, observedTypeArguments?.[0]?.selectedType);
  assert.equal(selectedCall?.sourceSelectedMethodTypeArguments?.[0]?.explicitTypeNode, observedTypeArguments?.[0]?.explicitTypeNode);
});

test("checker exposes selected source member evidence on checked property access", () => {
  const observedRequests: CheckedPropertyAccessMappingRequest[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      interface String {
        Split(separator: String): Array<String>;
      }
      interface Array<T> {
        readonly Length: number;
      }

      declare const path: String;
      const parts = path.Split(path);
      const n = parts.Length;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-selected-property-evidence-extension", {
      identity: semanticProviderIdentity("acme-selected-property-evidence-provider"),
      mapCheckedPropertyAccess: (request) => {
        observedRequests.push(request);
        return acceptObservation({
          operation: targetOperation(`Acme.${request.propertyName}`, "property", "int32"),
          resultType: targetResultType("int32"),
        });
      },
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const splitRequest = observedRequests.find((request) => request.propertyName === "Split");
  const lengthRequest = observedRequests.find((request) => request.propertyName === "Length");
  assertSelectedMemberEvidence(splitRequest, "Split");
  assertSelectedMemberEvidence(lengthRequest, "Length");
  assert.ok(splitRequest?.sourceResultType !== undefined);
  assert.ok(lengthRequest?.sourceResultType !== undefined);
  const lengthAccess = findNamedNodeByKind(index, KindPropertyAccessExpression, "Length");
  assert.deepEqual(extended.extensionHost.facts.get(lengthAccess, targetOperationFactKey)?.resultType, targetResultType("int32"));
});

test("repeated checked property observations preserve equivalent source result type provenance", () => {
  const observedRequests: CheckedPropertyAccessMappingRequest[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/profile.d.ts", `
      interface Object {}
      interface Function {}
      interface Boolean {}
      interface Number {}
      interface String {}
      interface RegExp {}
      interface IArguments {}

      interface SymbolConstructor {
        readonly iterator: unique symbol;
      }
      declare var Symbol: SymbolConstructor;

      interface IteratorResult<T, TReturn = unknown> {
        done?: boolean;
        value: T | TReturn;
      }
      interface Iterator<T, TReturn = unknown, TNext = unknown> {
        next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
      }
      interface Iterable<T> {
        [Symbol.iterator](): Iterator<T>;
      }
      interface Array<T> extends Iterable<T> {
        readonly Length: number;
        [index: number]: T;
      }
      type Parameters<T extends (...args: any) => any> =
        T extends (...args: infer P) => any ? P : never;
    `],
    ["/src/index.ts", `
      type Fn = (input: { count: number }) => number;
      type Args = Parameters<Fn>;

      interface LeftBox {
        value: { count: number };
      }
      interface RightBox {
        value: { count: number };
      }
      interface OtherBox {
        value: string;
      }
      declare const leftBox: LeftBox;
      declare const rightBox: RightBox;
      declare const otherBox: OtherBox;
      const leftValue = leftBox.value;
      const rightValue = rightBox.value;
      const otherValue = otherBox.value;

      export function read([input]: Args): number {
        return input.count;
      }
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["profile.d.ts", "index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-repeated-property-extension", {
      identity: semanticProviderIdentity("acme-repeated-property-provider"),
      mapCheckedPropertyAccess: (request) => {
        observedRequests.push(request);
        return acceptObservation({
          operation: targetOperation("Acme.DeclarationOnly.Property", "property", "int32"),
          resultType: targetResultType("int32"),
        });
      },
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const iteratorRequest = observedRequests.find((request) => request.propertyName === "iterator");
  assert.ok(iteratorRequest !== undefined);
  assert.ok(iteratorRequest.sourceSelectedSymbol !== undefined);
  assert.ok(iteratorRequest.sourceSelectedDeclaration !== undefined);
  assert.ok(iteratorRequest.sourceResultType !== undefined);
  const iteratorFact = extended.extensionHost.facts.get(iteratorRequest.expression, targetOperationFactKey);
  assert.equal(iteratorFact?.provenance?.sourceExpression, iteratorRequest.expression);
  assert.equal(iteratorFact?.provenance?.sourceReceiver, iteratorRequest.receiver);
  assert.equal(iteratorFact?.provenance?.sourceSelectedSymbol, iteratorRequest.sourceSelectedSymbol);
  assert.equal(iteratorFact?.provenance?.sourceSelectedDeclaration, iteratorRequest.sourceSelectedDeclaration);
  assert.equal(iteratorFact?.provenance?.sourceResultType, iteratorRequest.sourceResultType);

  const valueRequests = observedRequests.filter((request) => request.propertyName === "value");
  assert.equal(valueRequests.length, 3);
  const firstValueRequest = valueRequests[0]!;
  const secondValueRequest = valueRequests[1]!;
  const incompatibleValueRequest = valueRequests[2]!;
  assert.ok(firstValueRequest.sourceSelectedSymbol !== undefined);
  assert.ok(firstValueRequest.sourceResultType !== undefined);
  assert.ok(secondValueRequest.sourceResultType !== undefined);
  assert.ok(incompatibleValueRequest.sourceResultType !== undefined);
  assert.notEqual(firstValueRequest.sourceResultType, secondValueRequest.sourceResultType);

  const [checker, done] = Program_GetTypeCheckerForFile(program, Background(), index);
  try {
    recordExtensionCheckedPropertyAccessMapping(
      checker,
      iteratorRequest.expression as GoPtr<Node>,
      iteratorRequest.sourceSelectedSymbol as GoPtr<Symbol>,
      iteratorRequest.sourceResultType as GoPtr<Type>,
    );
    assert.equal(extended.extensionHost.diagnostics.all().some((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT"), false);

    const sourceResultType = firstValueRequest.sourceResultType as GoPtr<Type>;
    const equivalentResultType = secondValueRequest.sourceResultType as GoPtr<Type>;
    assert.equal(Checker_isTypeIdenticalTo(checker, sourceResultType, equivalentResultType), true);
    recordExtensionCheckedPropertyAccessMapping(
      checker,
      firstValueRequest.expression as GoPtr<Node>,
      firstValueRequest.sourceSelectedSymbol as GoPtr<Symbol>,
      equivalentResultType,
    );
    assert.equal(extended.extensionHost.diagnostics.all().some((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT"), false);
    assert.equal(
      extended.extensionHost.facts.get(firstValueRequest.expression, targetOperationFactKey)?.provenance?.sourceResultType,
      sourceResultType,
    );

    const incompatibleResultType = incompatibleValueRequest.sourceResultType as GoPtr<Type>;
    assert.equal(Checker_isTypeIdenticalTo(checker, sourceResultType, incompatibleResultType), false);
    recordExtensionCheckedPropertyAccessMapping(
      checker,
      firstValueRequest.expression as GoPtr<Node>,
      firstValueRequest.sourceSelectedSymbol as GoPtr<Symbol>,
      incompatibleResultType,
    );
  } finally {
    done();
  }

  assert.equal(extended.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT").length, 1);

  const countAccess = findNamedNodeByKind(index, KindPropertyAccessExpression, "count");
  const countFact = extended.extensionHost.facts.get(countAccess, targetOperationFactKey);
  assert.equal(countFact?.provenance?.sourceExpression, countAccess);
  assert.ok(countFact?.provenance?.sourceReceiver !== undefined);
  assert.ok(countFact?.provenance?.sourceSelectedSymbol !== undefined);
  assert.ok(countFact?.provenance?.sourceSelectedDeclaration !== undefined);
  assert.ok(countFact?.provenance?.sourceResultType !== undefined);
});

test("repeated unique-symbol property results use their selected declaration identity", () => {
  const observedRequests: CheckedPropertyAccessMappingRequest[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/profile.d.ts", `
      interface Object {}
      interface Function {}
      interface Boolean {}
      interface Number {}
      interface String {}
      interface RegExp {}
      interface IArguments {}

      interface SymbolConstructor {
        readonly iterator: unique symbol;
      }
      declare var Symbol: SymbolConstructor;

      interface OtherSymbolConstructor {
        readonly other: unique symbol;
      }
      declare var OtherSymbol: OtherSymbolConstructor;

      interface IteratorResult<T, TReturn = unknown> {
        done?: boolean;
        value: T | TReturn;
      }
      interface Iterator<T, TReturn = unknown, TNext = unknown> {
        next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
      }
      interface Iterable<T> {
        [Symbol.iterator](): Iterator<T>;
      }
      interface Array<T> extends Iterable<T> {
        readonly Length: number;
        [index: number]: T;
      }
      type Parameters<T extends (...args: any) => any> =
        T extends (...args: infer P) => any ? P : never;
    `],
    ["/src/index.ts", `
      type Fn = (input: { count: number }) => number;
      type Args = Parameters<Fn>;
      const other = OtherSymbol.other;

      export function read([input]: Args): number {
        return input.count;
      }
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["profile.d.ts", "index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-unique-symbol-property-extension", {
      identity: semanticProviderIdentity("acme-unique-symbol-property-provider"),
      mapCheckedPropertyAccess: (request) => {
        observedRequests.push(request);
        return acceptObservation({
          operation: targetOperation("Acme.DeclarationOnly.Property", "property", undefined),
          resultType: targetResultType("int32"),
        });
      },
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const iteratorRequest = observedRequests.find((request) => request.propertyName === "iterator");
  assert.ok(iteratorRequest?.sourceSelectedSymbol !== undefined);
  assert.ok(iteratorRequest.sourceSelectedDeclaration !== undefined);
  const sourceResultType = iteratorRequest.sourceResultType as GoPtr<Type>;
  assert.ok(sourceResultType !== undefined);
  const repeatedSourceResultType = { ...sourceResultType } satisfies Type;
  assert.notEqual(sourceResultType, repeatedSourceResultType);
  assert.notEqual(Type_Flags(sourceResultType) & TypeFlagsUniqueESSymbol, 0);
  assert.notEqual(Type_Flags(repeatedSourceResultType) & TypeFlagsUniqueESSymbol, 0);
  const sourceResultSymbol = Type_Symbol(sourceResultType);
  const repeatedSourceResultSymbol = Type_Symbol(repeatedSourceResultType);
  assert.ok(sourceResultSymbol !== undefined);
  assert.equal(sourceResultSymbol, repeatedSourceResultSymbol);
  const sourceResultDeclaration = sourceResultSymbol.ValueDeclaration ?? sourceResultSymbol.Declarations?.find((declaration) => declaration !== undefined);
  const repeatedSourceResultDeclaration = repeatedSourceResultSymbol?.ValueDeclaration ?? repeatedSourceResultSymbol?.Declarations?.find((declaration) => declaration !== undefined);
  assert.ok(sourceResultDeclaration !== undefined);
  assert.equal(sourceResultDeclaration, repeatedSourceResultDeclaration);
  assert.equal(sourceResultDeclaration, iteratorRequest.sourceSelectedDeclaration);

  const otherRequest = observedRequests.find((request) => request.propertyName === "other");
  assert.ok(otherRequest?.sourceResultType !== undefined);
  const otherSourceResultType = otherRequest.sourceResultType as GoPtr<Type>;
  assert.notEqual(Type_Flags(otherSourceResultType) & TypeFlagsUniqueESSymbol, 0);
  assert.notEqual(Type_Symbol(otherSourceResultType), sourceResultSymbol);

  const [checker, done] = Program_GetTypeCheckerForFile(program, Background(), index);
  try {
    assert.equal(Checker_isTypeIdenticalTo(checker, sourceResultType, repeatedSourceResultType), false);
    recordExtensionCheckedPropertyAccessMapping(
      checker,
      iteratorRequest.expression as GoPtr<Node>,
      iteratorRequest.sourceSelectedSymbol as GoPtr<Symbol>,
      repeatedSourceResultType,
    );
    assert.equal(extended.extensionHost.diagnostics.all().some((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT"), false);
    assert.equal(
      extended.extensionHost.facts.get(iteratorRequest.expression, targetOperationFactKey)?.provenance?.sourceResultType,
      sourceResultType,
    );

    assert.equal(Checker_isTypeIdenticalTo(checker, sourceResultType, otherSourceResultType), false);
    recordExtensionCheckedPropertyAccessMapping(
      checker,
      iteratorRequest.expression as GoPtr<Node>,
      iteratorRequest.sourceSelectedSymbol as GoPtr<Symbol>,
      otherSourceResultType,
    );
  } finally {
    done();
  }

  assert.equal(extended.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT").length, 1);
});

test("repeated property and element mappings compare target result references structurally", () => {
  const propertyRequests: CheckedPropertyAccessMappingRequest[] = [];
  const elementRequests: CheckedElementAccessMappingRequest[] = [];
  const propertyResultTypes: TargetTypeRef[] = [];
  const elementResultTypes: TargetTypeRef[] = [];
  let propertyResultName: "int32" | "char" = "int32";
  let elementResultName: "int32" | "char" = "int32";
  let fs = FromMap(new Map<string, string>([
    ["/src/profile.d.ts", `
      interface Object {}
      interface Function {}
      interface Boolean {}
      interface Number {}
      interface String {}
      interface RegExp {}
      interface IArguments {}

      interface IndexedValues {
        readonly size: number;
        [index: number]: number;
      }
    `],
    ["/src/index.ts", `
      declare const values: IndexedValues;
      export const size = values.size;
      export const first = values[0];
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["profile.d.ts", "index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-structural-target-result-extension", {
      identity: semanticProviderIdentity("acme-structural-target-result-provider"),
      mapCheckedPropertyAccess: (request) => {
        propertyRequests.push(request);
        const resultType = targetResultType(propertyResultName);
        propertyResultTypes.push(resultType);
        return acceptObservation({
          operation: targetOperation("Acme.Collection.Size", "property", undefined),
          resultType,
        });
      },
      mapCheckedElementAccess: (request) => {
        elementRequests.push(request);
        const resultType = targetResultType(elementResultName);
        elementResultTypes.push(resultType);
        return acceptObservation({
          operation: targetOperation("Acme.Collection.Get", "indexer", undefined),
          resultType,
        });
      },
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const propertyRequest = propertyRequests.find((request) => request.propertyName === "size");
  const elementRequest = elementRequests[0];
  assert.ok(propertyRequest?.sourceSelectedSymbol !== undefined);
  assert.ok(propertyRequest.sourceResultType !== undefined);
  assert.ok(elementRequest?.sourceSelectedSymbol !== undefined);
  assert.ok(elementRequest.sourceResultType !== undefined);
  assert.deepEqual(extended.extensionHost.facts.get(propertyRequest.expression, targetOperationFactKey)?.resultType, targetResultType("int32"));
  assert.deepEqual(extended.extensionHost.facts.get(elementRequest.expression, targetOperationFactKey)?.resultType, targetResultType("int32"));

  const [checker, done] = Program_GetTypeCheckerForFile(program, Background(), index);
  try {
    recordExtensionCheckedPropertyAccessMapping(
      checker,
      propertyRequest.expression as GoPtr<Node>,
      propertyRequest.sourceSelectedSymbol as GoPtr<Symbol>,
      propertyRequest.sourceResultType as GoPtr<Type>,
    );
    recordExtensionCheckedElementAccessMapping(
      checker,
      elementRequest.expression as GoPtr<Node>,
      elementRequest.sourceSelectedSymbol as GoPtr<Symbol>,
      elementRequest.sourceResultType as GoPtr<Type>,
    );
    assert.ok(propertyResultTypes.length >= 2);
    assert.ok(elementResultTypes.length >= 2);
    assert.notEqual(propertyResultTypes.at(-2), propertyResultTypes.at(-1));
    assert.notEqual(elementResultTypes.at(-2), elementResultTypes.at(-1));
    assert.deepEqual(propertyResultTypes.at(-2), propertyResultTypes.at(-1));
    assert.deepEqual(elementResultTypes.at(-2), elementResultTypes.at(-1));
    assert.equal(extended.extensionHost.diagnostics.all().some((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT"), false);

    propertyResultName = "char";
    recordExtensionCheckedPropertyAccessMapping(
      checker,
      propertyRequest.expression as GoPtr<Node>,
      propertyRequest.sourceSelectedSymbol as GoPtr<Symbol>,
      propertyRequest.sourceResultType as GoPtr<Type>,
    );
    assert.equal(extended.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT").length, 1);

    elementResultName = "char";
    recordExtensionCheckedElementAccessMapping(
      checker,
      elementRequest.expression as GoPtr<Node>,
      elementRequest.sourceSelectedSymbol as GoPtr<Symbol>,
      elementRequest.sourceResultType as GoPtr<Type>,
    );
  } finally {
    done();
  }

  assert.equal(extended.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT").length, 2);
});

test("checker exposes selected source index-signature evidence on checked element access", () => {
  const observedRequests: CheckedElementAccessMappingRequest[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      interface Text {
        [index: number]: string;
      }
      interface IndexedRecord<T> {
        [key: string]: T;
      }
      type Record<K extends string, T> = {
        [P in K]: T;
      };

      export function at(value: Text, index: number): string {
        return value[index];
      }
      export function rec(r: IndexedRecord<number>, key: string): number {
        return r[key];
      }
      export function mapped(r: Record<string, number>, key: string): number {
        return r[key];
      }
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-selected-index-evidence-extension", {
      identity: semanticProviderIdentity("acme-selected-index-evidence-provider"),
      mapCheckedElementAccess: (request) => {
        observedRequests.push(request);
        return acceptObservation({
          operation: targetOperation("Acme.Index", "property", "int32"),
          resultType: targetResultType("int32"),
        });
      },
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  assert.equal(observedRequests.length, 3);
  assertSelectedIndexEvidence(observedRequests[0]);
  assertSelectedIndexEvidence(observedRequests[1]);
  assertSelectedMappedIndexEvidence(observedRequests[2]);
  assert.ok(observedRequests.every((request) => request.sourceResultType !== undefined));
});

test("checker exposes only checker-selected fixed tuple element ordinals", () => {
  const observedRequests: CheckedElementAccessMappingRequest[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/profile.d.ts", `
      interface Object {}
      interface Function {}
      interface Boolean {}
      interface Number {}
      interface String {}
      interface RegExp {}
      interface IArguments {}
      interface Array<T> {
        readonly length: number;
        [index: number]: T;
      }
    `],
    ["/src/index.ts", `
      const one = 1 as const;
      declare const index: number;
      declare const eitherIndex: 0 | 1;
      declare const pair: [number, string];
      declare const labeled: [first: number, second: string];
      declare const duplicate: [string, string];
      declare const optional: [number, string?];
      declare const rest: [string, ...number[]];
      declare const union: [number, string] | [boolean, string];
      declare const mixed: [number, string] | string[];
      declare const intersection: [number, string] & { tag: string };
      declare const maybePair: [number, string] | undefined;
      declare let mutablePair: [number, string];

      export const literal = pair[1];
      export const stringLiteral = pair["1"];
      export const constant = pair[one];
      export const parenthesized = pair[(one)];
      export const nonNull = pair[one!];
      export const named = labeled[one];
      export const sameTypes = duplicate[one];
      export const optionalFixed = optional[one];
      export const restFixed = rest[0];
      export const restExpanded = rest[2];
      export const unionFixed = union[one];
      export const mixedReceiver = mixed[one];
      export const intersectionReceiver = intersection[one];
      export const generalNumber = pair[index];
      export const ambiguousOrdinal = pair[eitherIndex];
      export const optionalChain = maybePair?.[one];
      mutablePair[one] = "updated";
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        strictNullChecks: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["profile.d.ts", "index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  let operationId = "Acme.Tuple.Get";
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-tuple-index-extension", {
      identity: semanticProviderIdentity("acme-tuple-index-provider"),
      mapCheckedElementAccess: (request) => {
        observedRequests.push(request);
        return acceptObservation({
          operation: targetOperation(operationId, "indexer", "int32"),
        });
      },
    })],
  });

  const program = NewProgram(options);
  const indexFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(indexFile !== undefined);
  assertCleanProgram(program, indexFile);

  assert.deepEqual(
    observedRequests.map((request) => request.sourceSelectedElementIndex),
    [1, 1, 1, 1, 1, 1, 1, 1, 0, undefined, 1, undefined, 1, undefined, undefined, 1, 1],
  );
  assert.ok(observedRequests.every((request) => request.sourceResultType !== undefined));

  const canonicalRequestCount = observedRequests.length;
  assert.equal(Program_GetSemanticDiagnostics(program, Background(), indexFile).length, 0);
  assert.equal(observedRequests.length, canonicalRequestCount);

  const firstRequest = observedRequests[0];
  assert.ok(firstRequest?.sourceSelectedSymbol !== undefined);
  assert.ok(firstRequest.sourceResultType !== undefined);
  const [checker, done] = Program_GetTypeCheckerForFile(program, Background(), indexFile);
  try {
    recordExtensionCheckedElementAccessMapping(
      checker,
      firstRequest.expression as GoPtr<Node>,
      firstRequest.sourceSelectedSymbol as GoPtr<Symbol>,
      firstRequest.sourceResultType as GoPtr<Type>,
      firstRequest.sourceSelectedElementIndex,
    );
    assert.equal(observedRequests.at(-1)?.sourceSelectedElementIndex, 1);
    assert.equal(extended.extensionHost.diagnostics.all().some((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT"), false);

    operationId = "Acme.Tuple.GetOther";
    recordExtensionCheckedElementAccessMapping(
      checker,
      firstRequest.expression as GoPtr<Node>,
      firstRequest.sourceSelectedSymbol as GoPtr<Symbol>,
      firstRequest.sourceResultType as GoPtr<Type>,
      firstRequest.sourceSelectedElementIndex,
    );
  } finally {
    done();
  }
  assert.equal(extended.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT").length, 1);
});

test("invalid tuple indexes never expose a selected fixed ordinal or bypass TypeScript diagnostics", () => {
  const observedRequests: CheckedElementAccessMappingRequest[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/profile.d.ts", `
      interface Object {}
      interface Function {}
      interface Boolean {}
      interface Number {}
      interface String {}
      interface RegExp {}
      interface IArguments {}
      interface Array<T> {
        readonly length: number;
        [index: number]: T;
      }
    `],
    ["/src/index.ts", `
      declare const pair: [number, string];
      export const negative = pair[-1];
      export const fractional = pair[1.5];
      export const outOfRange = pair[2];
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["profile.d.ts", "index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-invalid-tuple-index-extension", {
      identity: semanticProviderIdentity("acme-invalid-tuple-index-provider"),
      mapCheckedElementAccess: (request) => {
        observedRequests.push(request);
        return acceptObservation({
          operation: targetOperation("Acme.Tuple.Get", "indexer", "int32"),
        });
      },
    })],
  });

  const program = NewProgram(options);
  const indexFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(indexFile !== undefined);
  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), indexFile);
  assert.equal(diagnostics.length, 3);
  assert.ok(diagnostics.every((diagnostic) => Diagnostic_Code(diagnostic) < 9000000));
  assert.equal(observedRequests.length, 3);
  assert.ok(observedRequests.every((request) => request.sourceSelectedElementIndex === undefined));
});

test("checker exposes selected source member evidence on optional-chain property access", () => {
  const observedRequests: CheckedPropertyAccessMappingRequest[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      interface String {
        readonly length: number;
      }

      class User {
        name: string = "Ada";
      }
      declare const user: User;
      declare const maybeUser: User | null;

      const direct = user.name.length;
      const optional = maybeUser?.name.length ?? 0;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        strictNullChecks: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-selected-optional-property-evidence-extension", {
      identity: semanticProviderIdentity("acme-selected-optional-property-evidence-provider"),
      mapCheckedPropertyAccess: (request) => {
        observedRequests.push(request);
        return acceptObservation({
          operation: targetOperation(`Acme.${request.propertyName}`, "property", "int32"),
          resultType: targetResultType("int32"),
        });
      },
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const nameRequests = observedRequests.filter((request) => request.propertyName === "name");
  const lengthRequests = observedRequests.filter((request) => request.propertyName === "length");
  assert.equal(nameRequests.length, 2);
  assert.equal(lengthRequests.length, 2);
  for (const request of nameRequests) {
    assertSelectedMemberEvidence(request, "name");
  }
  for (const request of lengthRequests) {
    assertSelectedMemberEvidence(request, "length");
  }
  assert.equal(nameRequests.some((request) => request.optionalChain === true), true);
});

test("checker exposes source element types on for-of declaration and assignment iterations", () => {
  const observed: Array<{ request: CheckedIterationMappingRequest; elementType: string | undefined }> = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      const values = [1, 2, 3];
      for (const value of values) {
        value;
      }
      let existing = 0;
      for (existing of values) {
        existing;
      }
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-selected-iteration-evidence-extension", {
      identity: semanticProviderIdentity("acme-selected-iteration-evidence-provider"),
      mapCheckedIteration: (request, context) => {
        observed.push({
          request,
          elementType: request.sourceElementType === undefined ? undefined : context.compiler.checker.typeToString(request.sourceElementType as GoPtr<Type>),
        });
        return acceptObservation({
          operation: targetOperation("Acme.Iterate", "method", "int32"),
          resultType: targetResultType("int32"),
        });
      },
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  assert.equal(observed.length, 2);
  assert.deepEqual(observed.map((entry) => entry.request.kind), ["for-of", "for-of"]);
  assert.deepEqual(observed.map((entry) => entry.elementType), ["number", "number"]);
});

test("checker maps checked unary operators through the operator observation", () => {
  const observedRequests: CheckedOperatorMappingRequest[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      export function invert(value: boolean): boolean {
        return !value;
      }
      export function negate(value: number): number {
        return -value;
      }
      export function bump(value: number): number {
        return ++value;
      }
      export function post(value: number): number {
        return value--;
      }
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-selected-unary-operator-extension", {
      identity: semanticProviderIdentity("acme-selected-unary-operator-provider"),
      mapCheckedOperator: (request) => {
        observedRequests.push(request);
        return acceptObservation({
          operation: targetOperation(`Acme.Operator.${request.operator}`, "operator", request.operator === "!" ? "boolean" : "number"),
          resultType: targetResultType(request.operator === "!" ? "boolean" : "number"),
        });
      },
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  assert.deepEqual(observedRequests.map((request) => request.operator), ["!", "-", "++", "--"]);
  for (const request of observedRequests) {
    assert.equal(request.right, undefined);
  }
});

test("checker exposes selected callee member evidence on checked calls", () => {
  let observedRequest: CheckedCallMappingRequest | undefined;
  let observedReturnTypeText = "";
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      interface String {}
      interface ConsoleApi {
        WriteLine(value: String): void;
      }

      declare const Console: ConsoleApi;
      declare const message: String;
      Console.WriteLine(message);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-selected-callee-evidence-extension", {
      identity: semanticProviderIdentity("acme-selected-callee-evidence-provider"),
      mapCheckedCall: (request, context) => {
        observedRequest = request;
        observedReturnTypeText = context.compiler.checker.typeToString(request.sourceReturnType as GoPtr<Type>);
        return acceptObservation({
          selectedSignature: {
            member: {
              id: "Acme.Console.WriteLine(String)",
              sourceName: "WriteLine",
              targetName: "WriteLine",
              kind: "method",
              parameters: [{
                name: "value",
                type: { kind: "target-named", id: "Acme.String" },
                passingMode: "by-value",
              }],
              overloadGroup: "Acme.Console.WriteLine",
            },
          },
        });
      },
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const selectedSymbol = observedRequest?.sourceCalleeSymbol as GoPtr<Symbol>;
  const selectedDeclaration = observedRequest?.sourceCalleeDeclaration as GoPtr<Node>;
  assert.equal(selectedSymbol?.Name, "WriteLine");
  assert.ok(selectedDeclaration !== undefined);
  assert.equal(selectedDeclaration, selectedSymbol?.ValueDeclaration);
  assert.equal(Node_Text(Node_Name(selectedDeclaration)), "WriteLine");
  assert.equal(observedRequest?.sourceSelectedDeclaration, selectedDeclaration);
  assert.equal(observedReturnTypeText, "void");

  const call = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  const selectedCall = consumer.getSelectedTargetCall(call);
  assert.equal(selectedCall?.sourceCalleeSymbol, observedRequest?.sourceCalleeSymbol);
  assert.equal(selectedCall?.sourceCalleeDeclaration, observedRequest?.sourceCalleeDeclaration);
  assert.equal(selectedCall?.sourceReturnType, observedRequest?.sourceReturnType);
});

test("checker records provider-owned contextual target facts without changing TS contextual type", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      const callback: (value: number) => number = value => value;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-contextual-extension", contextualSemanticProvider())],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const arrow = findFirstNodeByKind(index, KindArrowFunction);
  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  const contextualFact = consumer.getContextualTargetTypeFact(arrow);
  assert.equal(contextualFact?.targetType?.kind, "target-named");
  assert.equal(contextualFact?.targetType?.id, "Acme.Func`2");
});

test("checker allows provider contextual target observers to defer without diagnostics", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      const callback: (value: number) => number = value => value;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-deferred-contextual-extension", {
      identity: semanticProviderIdentity("acme-deferred-contextual-provider"),
      recordContextualTargetType: () => deferObservation,
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const arrow = findFirstNodeByKind(index, KindArrowFunction);
  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getContextualTargetTypeFact(arrow), undefined);
  assert.equal(extended.extensionHost.diagnostics.all().some((diagnostic) => diagnostic.numericCode === ExtensionHostDiagnosticCode.observationOwnerDeferred), false);
});

test("checker records provider-owned parameter mode facts from selected target signatures", () => {
  const providerDeclaration = providerDeclarationIdentity("acme-provider", "acme-native", "acme.runtime", "Contains", "Contains(T)");
  const selectedSignature = {
    member: {
      ...searchValuesContainsTargetMember("byref-readonly"),
      providerDeclaration,
    },
  } satisfies SelectedTargetSignatureFact;
  const observedParameterRequests: ParameterPassingRequest[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare function contains(value: number): boolean;
      declare let value: number;
      contains(value);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerExtension("@example/target/Acme.Console.js", false, parameterModeSemanticProvider(selectedSignature, (request) => observedParameterRequests.push(request)))],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const call = findFirstNodeByKind(index, KindCallExpression);
  const argument = getFirstCallArgument(call);
  assert.equal(observedParameterRequests[0]?.call, call);
  assert.equal(observedParameterRequests[0]?.parameterIndex, 0);
  assert.equal(observedParameterRequests[0]?.targetParameter?.name, "value");
  assert.equal(observedParameterRequests[0]?.selectedSignature?.member.id, "Contains(T)");
  const argumentPassing = extended.extensionHost.facts.get(argument, argumentPassingFactKey);
  assert.equal(argumentPassing?.mode, "byref-readonly");
  assert.equal(argumentPassing?.parameterIndex, 0);
  assert.equal(argumentPassing?.targetParameter?.name, "value");
  assert.deepEqual(argumentPassing?.selectedSignature, providerDeclaration);
  assert.deepEqual(extended.extensionHost.facts.get(call, selectedTargetSignatureFactKey)?.providerDeclaration, providerDeclaration);
  assert.equal(extended.extensionHost.facts.get(call, argumentPassingFactKey), undefined);

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getArgumentPassingFact(argument)?.mode, "byref-readonly");
});

test("checker records parameter mode facts per argument without collapsing them onto the call", () => {
  const selectedSignature = {
    member: twoParameterTargetMember(),
  } satisfies SelectedTargetSignatureFact;
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare function pair(first: number, second: number): void;
      declare let first: number;
      declare let second: number;
      pair(first, second);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerExtension("@example/target/Acme.Console.js", false, parameterModeSequenceSemanticProvider(selectedSignature))],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const call = findFirstNodeByKind(index, KindCallExpression);
  const arguments_ = Node_Arguments(call) ?? [];
  const first = arguments_[0];
  const second = arguments_[1];
  assert.ok(first !== undefined);
  assert.ok(second !== undefined);
  assert.equal(extended.extensionHost.facts.get(first, argumentPassingFactKey)?.mode, "by-value");
  assert.equal(extended.extensionHost.facts.get(second, argumentPassingFactKey)?.mode, "byref-readonly");
  assert.equal(extended.extensionHost.facts.get(call, argumentPassingFactKey), undefined);
  assert.equal(extended.extensionHost.diagnostics.all().some((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT"), false);
});

test("checker records provider-owned runtime carrier and argument conversion facts", () => {
  const observedConversionRequests: CheckedConversionMappingRequest[] = [];
  const observedRuntimeCarrierRequests: RuntimeCarrierFactRequest[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import type { SearchValues } from "@example/target/Acme.Buffers.js";

      declare let values: SearchValues<number>;
      declare function toByte(value: number): number;
      values;
      toByte(300);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerExtension("@example/target/Acme.Buffers.js", false, carrierConversionSemanticProvider(
      (request) => observedConversionRequests.push(request),
      (request) => observedRuntimeCarrierRequests.push(request),
    ))],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const searchValuesTypeReference = findFirstNodeByKind(index, KindTypeReference);
  assert.equal(observedRuntimeCarrierRequests.length, 1);
  assert.equal(observedRuntimeCarrierRequests[0]?.sourceTypeReference, searchValuesTypeReference);
  assert.ok(observedRuntimeCarrierRequests[0]?.sourceSymbol !== undefined);
  const runtimeCarrierFact = extended.extensionHost.facts.get(searchValuesTypeReference, runtimeCarrierFactKey);
  const runtimeCarrier = runtimeCarrierFact?.carrier;
  assert.equal(runtimeCarrier?.kind, "target-named");
  assert.equal(runtimeCarrier?.kind === "target-named" ? runtimeCarrier.id : undefined, "Acme.Buffers.SearchValues`1");
  assert.equal(runtimeCarrierFact?.provenance?.sourceTypeReference, searchValuesTypeReference);
  assert.ok(runtimeCarrierFact?.provenance?.sourceType !== undefined);
  assert.equal(runtimeCarrierFact?.provenance?.providerDeclaration?.providerId, "acme-carrier-provider");

  const call = findFirstNodeByKind(index, KindCallExpression);
  const argument = getFirstCallArgument(call);
  assert.equal(observedConversionRequests[0]?.conversionKind, "call-argument");
  assert.equal(observedConversionRequests[0]?.call, call);
  assert.equal(observedConversionRequests[0]?.parameterIndex, 0);
  assert.equal(observedConversionRequests[0]?.targetParameter?.name, "value");
  assert.equal(observedConversionRequests[0]?.selectedSignature?.member.id, "ToByte(Acme.Int32)");
  assert.equal(extended.extensionHost.facts.get(argument, targetConversionFactKey)?.convertedType?.kind, "target-named");
  assert.equal(extended.extensionHost.facts.get(argument, targetConversionFactKey)?.operation?.operationId, "Acme.Convert.ToByte");

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getRuntimeCarrierFact(searchValuesTypeReference)?.carrier.kind, "target-named");
  assert.equal(consumer.getTargetConversionFact(argument)?.operation?.targetOperation, "Acme.Convert.ToByte");
});

test("checker records selected source and target types for ordinary assertion conversions only", () => {
  const observedRequests: CheckedConversionMappingRequest[] = [];
  let convertedTypeId = "Acme.Dog";
  let fs = FromMap(new Map<string, string>([
    ["/src/profile.d.ts", `
      interface Object {}
      interface Function {}
      interface Boolean {}
      interface Number {}
      interface String {}
      interface RegExp {}
      interface IArguments {}
      interface Array<T> {}
    `],
    ["/src/index.ts", `
      class Animal {}
      class Dog extends Animal {}

      declare const animal: Animal;
      declare const maybeDog: Dog | undefined;
      declare const holder: { animal?: Animal };

      export const asDog = animal as Dog;
      export const angleDog = <Dog>animal;
      export const nested = (animal as Dog) as Animal;
      export const optionalAdjacent = holder?.animal as Dog | undefined;
      export const deferred = () => animal as Dog;
      export const literal = 1 as const;
      export const angleLiteral = <const>1;
      export const checkedOnly = animal satisfies Animal;
      export const nonNullDog = maybeDog!;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        strictNullChecks: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["profile.d.ts", "index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-assertion-conversion-extension", {
      identity: semanticProviderIdentity("acme-assertion-conversion-provider"),
      mapCheckedConversion: (request) => {
        observedRequests.push(request);
        return acceptObservation({
          convertedType: { kind: "target-named", id: convertedTypeId },
        });
      },
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  assert.equal(observedRequests.length, 6);
  assert.ok(observedRequests.every((request) => request.conversionKind === "assertion"));
  const assertionRequests = observedRequests.filter((request): request is Extract<CheckedConversionMappingRequest, { readonly conversionKind: "assertion" }> => request.conversionKind === "assertion");
  assert.equal(assertionRequests.length, 6);
  assert.equal(observedRequests.filter((request) => request.assertionKind === "as").length, 5);
  assert.equal(observedRequests.filter((request) => request.assertionKind === "angle-bracket").length, 1);
  assert.equal(observedRequests.filter((request) => (request.expression as GoPtr<Node>)?.Kind === KindAsExpression).length, 5);
  assert.equal(observedRequests.filter((request) => (request.expression as GoPtr<Node>)?.Kind === KindTypeAssertionExpression).length, 1);
  assert.ok(observedRequests.every((request) => request.targetPlatform === "acme"));
  assert.ok(observedRequests.every((request) => request.call === undefined));
  assert.ok(observedRequests.every((request) => request.parameterIndex === undefined));
  assert.ok(observedRequests.every((request) => request.selectedSignature === undefined));
  assert.ok(assertionRequests.every((request) => request.sourceExpression !== undefined));
  assert.ok(assertionRequests.every((request) => request.explicitTargetTypeNode !== undefined));
  assert.equal((assertionRequests[0]?.sourceExpression as GoPtr<Node>)?.Kind, KindIdentifier);
  assert.ok(assertionRequests[0]?.sourceSelectedSymbol !== undefined);
  assert.ok(assertionRequests[0]?.sourceSelectedDeclaration !== undefined);
  assert.equal((assertionRequests[0]?.sourceSelectedDeclarationTypeNode as GoPtr<Node>)?.Kind, KindTypeReference);
  assert.equal((assertionRequests[0]?.explicitTargetTypeNode as GoPtr<Node>)?.Kind, KindTypeReference);
  assert.ok(assertionRequests.every((request) => request.sourceExpression !== request.expression));
  assert.ok(assertionRequests.some((request) => request.sourceSelectedDeclarationTypeNode === undefined));
  assert.ok(assertionRequests.some((request) => (request.explicitTargetTypeNode as GoPtr<Node>)?.Kind === KindUnionType));
  assert.deepEqual(
    observedRequests.map((request) => [Type_Symbol(request.source as GoPtr<Type>)?.Name, Type_Symbol(request.target as GoPtr<Type>)?.Name]),
    [["Animal", "Dog"], ["Animal", "Dog"], ["Animal", "Dog"], ["Dog", "Animal"], [undefined, undefined], ["Animal", "Dog"]],
  );
  assert.equal(observedRequests[0]!.source, observedRequests[1]!.source);
  assert.equal(observedRequests[0]!.target, observedRequests[1]!.target);
  assert.equal(observedRequests[0]!.source, observedRequests[2]!.source);
  assert.equal(observedRequests[0]!.target, observedRequests[2]!.target);
  assert.equal(observedRequests[0]!.target, observedRequests[3]!.source);
  assert.equal(observedRequests[0]!.source, observedRequests[3]!.target);
  assert.equal(observedRequests[0]!.source, observedRequests[5]!.source);
  assert.equal(observedRequests[0]!.target, observedRequests[5]!.target);
  assert.ok(observedRequests.every((request) => extended.extensionHost.facts.get(request.expression, targetConversionFactKey)?.convertedType?.kind === "target-named"));
  assert.equal(Program_GetSemanticDiagnostics(program, Background(), index).length, 0);
  assert.equal(observedRequests.length, 6);

  const firstRequest = observedRequests[0];
  assert.ok(firstRequest !== undefined);
  const [checker, done] = Program_GetTypeCheckerForFile(program, Background(), index);
  try {
    recordExtensionCheckedAssertionConversion(
      checker,
      firstRequest.expression as GoPtr<Node>,
      firstRequest.source as GoPtr<Type>,
      firstRequest.target as GoPtr<Type>,
      firstRequest.assertionKind,
    );
    assert.equal(extended.extensionHost.diagnostics.all().some((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT"), false);

    convertedTypeId = "Acme.Animal";
    recordExtensionCheckedAssertionConversion(
      checker,
      firstRequest.expression as GoPtr<Node>,
      firstRequest.source as GoPtr<Type>,
      firstRequest.target as GoPtr<Type>,
      firstRequest.assertionKind,
    );
  } finally {
    done();
  }
  assert.equal(extended.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "FACT_CONFLICT").length, 1);
});

test("checker preserves source alias provenance for checked assertion conversions", () => {
  const observed: {
    readonly request: Extract<CheckedConversionMappingRequest, { readonly conversionKind: "assertion" }>;
    readonly semanticSourcePrimitive: SourcePrimitiveFact | undefined;
    readonly semanticTargetPrimitive: SourcePrimitiveFact | undefined;
    readonly declaredSourcePrimitive: SourcePrimitiveFact | undefined;
    readonly explicitTargetPrimitive: SourcePrimitiveFact | undefined;
  }[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import type { int as Count, byte as Byte } from "@example/native/types.js";

      export function toByte(value: Count): Byte {
        return (value) as Byte;
      }

      export function narrowedToByte(value: Count | undefined): void {
        if (value !== undefined) {
          const narrowed = value as Byte;
        }
      }

      interface Box { value: Count; }
      declare const box: Box;
      declare function readCount(): Count;
      export const propertyByte = box.value as Byte;
      export const callByte = readCount() as Byte;
    `],
    ["/src/node_modules/@example/native/package.json", JSON.stringify({
      name: "@example/native",
      version: "1.0.0",
      type: "module",
      exports: {
        "./types.js": {
          types: "./types.d.ts",
          default: "./types.js",
        },
      },
    })],
    ["/src/node_modules/@example/native/types.d.ts", `
      export type int = number;
      export type byte = number;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [
      createExampleSourceSemanticsExtension(),
      semanticOnlyExtension("acme-assertion-alias-extension", {
        identity: semanticProviderIdentity("acme-assertion-alias-provider"),
        mapCheckedConversion: (request, context) => {
          if (request.conversionKind === "assertion") {
            observed.push({
              request,
              semanticSourcePrimitive: context.factResolver.resolve(request.source, sourcePrimitiveFactKey),
              semanticTargetPrimitive: context.factResolver.resolve(request.target, sourcePrimitiveFactKey),
              declaredSourcePrimitive: request.sourceSelectedDeclarationTypeNode === undefined
                ? undefined
                : context.factResolver.resolve(request.sourceSelectedDeclarationTypeNode, sourcePrimitiveFactKey),
              explicitTargetPrimitive: context.factResolver.resolve(request.explicitTargetTypeNode, sourcePrimitiveFactKey),
            });
          }
          return acceptObservation({
            convertedType: { kind: "source-primitive", name: "uint8" },
          });
        },
      }),
    ],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  assert.equal(observed.length, 4);
  const result = observed.find((candidate) => (candidate.request.sourceExpression as GoPtr<Node>)?.Kind === KindParenthesizedExpression);
  assert.ok(result !== undefined);
  assert.equal(result.request.source, result.request.target);
  assert.equal(result.semanticSourcePrimitive, undefined);
  assert.equal(result.semanticTargetPrimitive, undefined);
  assert.deepEqual(result.declaredSourcePrimitive, {
    kind: "int32",
    runtimeBase: "number",
    signed: true,
    width: 32,
  });
  assert.deepEqual(result.explicitTargetPrimitive, {
    kind: "uint8",
    runtimeBase: "number",
    signed: false,
    width: 8,
  });
  assert.equal((result.request.sourceExpression as GoPtr<Node>)?.Kind, KindParenthesizedExpression);
  assert.ok(result.request.sourceSelectedSymbol !== undefined);
  assert.ok(result.request.sourceSelectedDeclaration !== undefined);
  assert.equal((result.request.sourceSelectedDeclarationTypeNode as GoPtr<Node>)?.Kind, KindTypeReference);
  assert.equal((result.request.explicitTargetTypeNode as GoPtr<Node>)?.Kind, KindTypeReference);
  const narrowedResult = observed.find((candidate) => (candidate.request.sourceSelectedDeclarationTypeNode as GoPtr<Node>)?.Kind === KindUnionType);
  assert.ok(narrowedResult !== undefined);
  assert.equal(narrowedResult.declaredSourcePrimitive, undefined);
  assert.deepEqual(narrowedResult.explicitTargetPrimitive, {
    kind: "uint8",
    runtimeBase: "number",
    signed: false,
    width: 8,
  });
  assert.equal((narrowedResult.request.sourceExpression as GoPtr<Node>)?.Kind, KindIdentifier);
  const propertyResult = observed.find((candidate) => (candidate.request.sourceExpression as GoPtr<Node>)?.Kind === KindPropertyAccessExpression);
  assert.ok(propertyResult !== undefined);
  assert.equal(propertyResult.declaredSourcePrimitive?.kind, "int32");
  assert.ok(propertyResult.request.sourceSelectedSymbol !== undefined);
  assert.ok(propertyResult.request.sourceSelectedDeclaration !== undefined);
  const callResult = observed.find((candidate) => (candidate.request.sourceExpression as GoPtr<Node>)?.Kind === KindCallExpression);
  assert.ok(callResult !== undefined);
  assert.equal(callResult.request.sourceSelectedDeclarationTypeNode, undefined);
  assert.deepEqual(callResult.explicitTargetPrimitive, {
    kind: "uint8",
    runtimeBase: "number",
    signed: false,
    width: 8,
  });
});

test("checker classifies JSDoc assertions as explicit checked conversions", () => {
  const observedRequests: CheckedConversionMappingRequest[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/profile.d.ts", `
      interface Object {}
      interface Function {}
      interface Boolean {}
      interface Number {}
      interface String {}
      interface RegExp {}
      interface IArguments {}
      interface Array<T> {}
    `],
    ["/src/index.js", `
      // @ts-check
      class Animal {}
      class Dog extends Animal {}
      /** @type {Animal} */
      const animal = new Animal();
      export const dog = /** @type {Dog} */ (animal);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        allowJs: true,
        checkJs: true,
        noEmit: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["profile.d.ts", "index.js"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-jsdoc-assertion-extension", {
      identity: semanticProviderIdentity("acme-jsdoc-assertion-provider"),
      mapCheckedConversion: (request) => {
        observedRequests.push(request);
        return acceptObservation({
          convertedType: { kind: "target-named", id: "Acme.Dog" },
        });
      },
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.js");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);
  assert.equal(observedRequests.length, 1);
  assert.equal(observedRequests[0]!.conversionKind, "assertion");
  assert.equal(observedRequests[0]!.assertionKind, "jsdoc");
  assert.equal((observedRequests[0]!.expression as GoPtr<Node>)?.Kind, KindAsExpression);
  assert.equal((observedRequests[0]!.sourceExpression as GoPtr<Node>)?.Kind, KindIdentifier);
  assert.equal((observedRequests[0]!.explicitTargetTypeNode as GoPtr<Node>)?.Kind, KindTypeReference);
  assert.equal(Type_Symbol(observedRequests[0]!.source as GoPtr<Type>)?.Name, "Animal");
  assert.equal(Type_Symbol(observedRequests[0]!.target as GoPtr<Type>)?.Name, "Dog");
  assert.ok(extended.extensionHost.facts.get(observedRequests[0]!.expression, targetConversionFactKey) !== undefined);
});

test("target assertion mappings cannot rescue invalid TypeScript assertions", () => {
  const observedRequests: CheckedConversionMappingRequest[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/profile.d.ts", `
      interface Object {}
      interface Function {}
      interface Boolean {}
      interface Number {}
      interface String {}
      interface RegExp {}
      interface IArguments {}
      interface Array<T> {}
    `],
    ["/src/index.ts", `
      class Dog { bark(): void {} }
      declare const text: string;
      export const invalid = text as Dog;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["profile.d.ts", "index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-invalid-assertion-extension", {
      identity: semanticProviderIdentity("acme-invalid-assertion-provider"),
      mapCheckedConversion: (request) => {
        observedRequests.push(request);
        return acceptObservation({
          convertedType: { kind: "target-named", id: "Acme.Dog" },
        });
      },
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), index);
  assert.equal(diagnostics.length, 1);
  assert.equal(Diagnostic_Code(diagnostics[0]), 2352);
  assert.equal(observedRequests.length, 0);
  assert.equal(extended.extensionHost.facts.get(findFirstNodeByKind(index, KindAsExpression), targetConversionFactKey), undefined);
});

test("rejected assertion conversions surface deterministic extension diagnostics", () => {
  const observedRequests: CheckedConversionMappingRequest[] = [];
  let fs = FromMap(new Map<string, string>([
    ["/src/profile.d.ts", `
      interface Object {}
      interface Function {}
      interface Boolean {}
      interface Number {}
      interface String {}
      interface RegExp {}
      interface IArguments {}
      interface Array<T> {}
    `],
    ["/src/index.ts", `
      class Animal {}
      class Dog extends Animal {}
      declare const animal: Animal;
      export const rejected = animal as Dog;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["profile.d.ts", "index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-rejected-assertion-extension", {
      identity: semanticProviderIdentity("acme-rejected-assertion-provider"),
      mapCheckedConversion: (request, context) => {
        observedRequests.push(request);
        return rejectObservation({
          extensionId: context.extensionId,
          extensionCode: "ACME_ASSERTION_REJECTED",
          numericCode: 9910451,
          publicCode: "ACME0451",
          category: "error",
          message: "The checked assertion has no Acme target conversion.",
          nodeOrSpan: request.expression,
          identity: `acme-assertion-rejected:${String((request.expression as GoPtr<Node>)?.id ?? "unknown")}`,
        });
      },
    })],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), index);
  assert.equal(diagnostics.length, 1);
  assert.equal(Diagnostic_Code(diagnostics[0]), 9910451);
  assert.match(Diagnostic_String(diagnostics[0]), /ACME0451/);
  assert.equal(observedRequests.length, 1);
  assert.equal(observedRequests[0]!.conversionKind, "assertion");
  assert.equal(observedRequests[0]!.assertionKind, "as");
  assert.equal(extended.extensionHost.facts.get(observedRequests[0]!.expression, targetConversionFactKey), undefined);
});

test("checker validates provider-owned flow use diagnostics from source-semantics marker facts", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { move } from "@example/native/lang.js";

      declare let value: number;
      move(value);
      value;
    `],
    ["/src/node_modules/@example/native/package.json", JSON.stringify({
      name: "@example/native",
      version: "1.0.0",
      type: "module",
      exports: {
        "./lang.js": {
          types: "./lang.d.ts",
          default: "./lang.js",
        },
      },
    })],
    ["/src/node_modules/@example/native/lang.d.ts", "export declare function move<T>(value: T): T;"],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "borrow",
    extensions: [
      createExampleSourceSemanticsExtension(),
      semanticOnlyExtension("borrow-flow-extension", borrowFlowSemanticProvider()),
    ],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);

  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), index);
  assert.equal(diagnostics.length, 1);
  assert.equal(Diagnostic_Code(diagnostics[0]), 9920301);
  assert.match(Diagnostic_String(diagnostics[0]), /BORROW0301/);
  assert.match(Diagnostic_String(diagnostics[0]), /value was moved/);

  const movedUse = findLastIdentifierByText(index, "value");
  const flowDiagnostics = extended.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "BORROW_MOVED_VALUE");
  assert.equal(flowDiagnostics.length, 1);
  assert.equal(flowDiagnostics[0]?.nodeOrSpan, movedUse);
  assert.equal(extended.extensionHost.facts.get(movedUse, flowStateFactKey), undefined);
});

test("checker validates provider-owned assignability after normal TS compatibility", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { move } from "@example/native/lang.js";

      declare let source: number;
      declare let target: number;
      target = move(source);
    `],
    ["/src/node_modules/@example/native/package.json", JSON.stringify({
      name: "@example/native",
      version: "1.0.0",
      type: "module",
      exports: {
        "./lang.js": {
          types: "./lang.d.ts",
          default: "./lang.js",
        },
      },
    })],
    ["/src/node_modules/@example/native/lang.d.ts", "export declare function move<T>(value: T): T;"],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "borrow",
    extensions: [
      createExampleSourceSemanticsExtension(),
      semanticOnlyExtension("borrow-assignability-extension", borrowAssignabilityProvider()),
    ],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  Program_BindSourceFiles(program);
  const moveCall = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(extended.extensionHost.facts.get(moveCall, flowStateFactKey)?.state, "moved");

  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), index);
  assert.equal(diagnostics.length, 1);
  assert.equal(Diagnostic_Code(diagnostics[0]), 9920401);
  assert.match(Diagnostic_String(diagnostics[0]), /BORROW0401/);
  assert.match(Diagnostic_String(diagnostics[0]), /moved expression cannot be assigned/);

  const assignabilityDiagnostics = extended.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "BORROW_MOVED_ASSIGNMENT");
  assert.equal(assignabilityDiagnostics.length, 1);
  assert.equal(assignabilityDiagnostics[0]?.nodeOrSpan, moveCall);
});

test("checker validates provider-owned target constraints through standard semantic diagnostics", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import type { int } from "@example/native/types.js";
      import type { SearchValues } from "@example/target/Acme.Buffers.js";

      type Good = SearchValues<int>;
      type Bad = SearchValues<number>;
    `],
    ["/src/node_modules/@example/native/package.json", JSON.stringify({
      name: "@example/native",
      version: "1.0.0",
      type: "module",
      exports: {
        "./types.js": {
          types: "./types.d.ts",
          default: "./types.js",
        },
      },
    })],
    ["/src/node_modules/@example/native/types.d.ts", "export type int = number;"],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [
      createExampleSourceSemanticsExtension(),
      providerExtension("@example/target/Acme.Buffers.js", false, constraintSemanticProvider()),
    ],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);

  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), index);
  assert.equal(diagnostics.length, 1);
  assert.equal(Diagnostic_Code(diagnostics[0]), 9910201);
  assert.match(Diagnostic_String(diagnostics[0]), /ACME0201/);
  assert.match(Diagnostic_String(diagnostics[0]), /must implement Acme\.IEquatable`1/);

  const targetDiagnostics = extended.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "ACME_CONSTRAINT");
  assert.equal(targetDiagnostics.length, 1);
  assert.equal((targetDiagnostics[0]?.nodeOrSpan as GoPtr<Node>)?.Kind, KindNumberKeyword);
});

test("provider extensions can drive a realistic emitter-facing fact chain", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import type { int } from "@example/native/types.js";
      import type { SearchValues } from "@example/target/Acme.Buffers.js";

      declare const values: SearchValues<int>;
      declare let value: int;
      values.Contains(value);
    `],
    ["/src/node_modules/@example/native/package.json", JSON.stringify({
      name: "@example/native",
      version: "1.0.0",
      type: "module",
      exports: {
        "./types.js": {
          types: "./types.d.ts",
          default: "./types.js",
        },
      },
    })],
    ["/src/node_modules/@example/native/types.d.ts", "export type int = number;"],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [
      createExampleSourceSemanticsExtension(),
      providerExtension("@example/target/Acme.Buffers.js", false, compositeAcmeProvider()),
    ],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const call = findFirstNodeByKind(index, KindCallExpression);
  const argument = getFirstCallArgument(call);
  const searchValuesTypeReference = findTypeReferenceByName(index, "SearchValues");

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getSelectedTargetCall(call)?.member.id, "Contains(T)");
  assert.deepEqual(consumer.getSelectedTargetCall(call)?.targetTypeArguments, [{ kind: "source-primitive", name: "int32" }]);
  assert.equal(consumer.getArgumentPassingFact(argument)?.mode, "byref-readonly");
  assert.equal(consumer.getTargetConversionFact(argument)?.convertedType?.kind, "target-named");
  assert.equal(consumer.getRuntimeCarrierFact(searchValuesTypeReference)?.carrier.kind, "target-named");
});

test("checker-owned target call seam reports deferred providers without fallback facts", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare function contains(value: number): boolean;
      contains(1);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerExtension("@example/target/Acme.Console.js", false, deferredSemanticProvider())],
  });

  const program = NewProgram(options);
  assert.ok(program !== undefined);
  assert.equal(getExtensionHost(program), extended.extensionHost);
  assert.equal(extended.extensionHost.getObservationOwner(ExtensionObservationPoint.mapCheckedCall)?.identity.id, "acme-provider-extension");
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assert.equal(Program_GetProgramDiagnostics(program).length, 0);
  assert.equal(Program_GetSyntacticDiagnostics(program, Background(), index).length, 0);
  assert.equal(Program_GetSemanticDiagnostics(program, Background(), index).length, 0);

  const call = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(extended.extensionHost.facts.get(call, selectedTargetSignatureFactKey), undefined);
  assert.equal(extended.extensionHost.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.observationOwnerDeferred);

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getSelectedTargetCall(call), undefined);
});

test("checker records provider-owned member element and operator facts for consumers", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare const text: { length: number };
      declare const values: { [index: number]: number };
      declare const left: number;
      declare const right: number;

      text.length;
      values[0];
      left + right;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerExtension("@example/target/Acme.Console.js", false, surfaceSemanticProvider())],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const propertyAccess = findFirstNodeByKind(index, KindPropertyAccessExpression);
  const elementAccess = findFirstNodeByKind(index, KindElementAccessExpression);
  const binaryExpression = findFirstNodeByKind(index, KindBinaryExpression);

  assert.equal(extended.extensionHost.facts.get(propertyAccess, targetOperationFactKey)?.operationId, "Acme.String.Length");
  assert.equal(extended.extensionHost.facts.get(elementAccess, targetOperationFactKey)?.operationId, "Acme.ReadOnlySpan.GetItem");
  assert.equal(extended.extensionHost.facts.get(binaryExpression, targetOperationFactKey)?.operationId, "Acme.Int32.op_Addition");
  assert.equal(extended.extensionHost.facts.get(propertyAccess, targetOperationFactKey)?.provenance?.sourceExpression, propertyAccess);
  assert.ok(extended.extensionHost.facts.get(propertyAccess, targetOperationFactKey)?.provenance?.sourceReceiver !== undefined);
  assert.equal(extended.extensionHost.facts.get(propertyAccess, targetOperationFactKey)?.provenance?.providerDeclaration?.providerId, "acme-property-provider");

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getSelectedTargetProperty(propertyAccess)?.targetOperation, "Acme.String.Length");
  assert.equal(consumer.getSelectedTargetElementAccess(elementAccess)?.targetOperation, "Acme.ReadOnlySpan.GetItem");
  assert.equal(consumer.getSelectedTargetOperator(binaryExpression)?.targetOperation, "Acme.Int32.op_Addition");
});

test("checker-owned member element and operator seams report deferred providers without fallback facts", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare const text: { length: number };
      declare const values: { [index: number]: number };
      declare const left: number;
      declare const right: number;

      text.length;
      values[0];
      left + right;
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerExtension("@example/target/Acme.Console.js", false, deferredSurfaceSemanticProvider())],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assert.equal(Program_GetSemanticDiagnostics(program, Background(), index).length, 0);

  const propertyAccess = findFirstNodeByKind(index, KindPropertyAccessExpression);
  const elementAccess = findFirstNodeByKind(index, KindElementAccessExpression);
  const binaryExpression = findFirstNodeByKind(index, KindBinaryExpression);

  assert.equal(extended.extensionHost.facts.get(propertyAccess, targetOperationFactKey), undefined);
  assert.equal(extended.extensionHost.facts.get(elementAccess, targetOperationFactKey), undefined);
  assert.equal(extended.extensionHost.facts.get(binaryExpression, targetOperationFactKey), undefined);
  assert.ok(extended.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.numericCode === ExtensionHostDiagnosticCode.observationOwnerDeferred).length >= 3);
});

test("extension-owned semantic rejections surface through standard diagnostics with source location", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare function toByte(value: number): number;
      toByte(300);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerExtension("@example/target/Acme.Console.js", false, rejectingCallSemanticProvider())],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);

  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), index);
  assert.equal(diagnostics.length, 1);
  assert.equal(Diagnostic_Code(diagnostics[0]), 9910125);
  assert.match(Diagnostic_String(diagnostics[0]), /ACME0125/);
  assert.match(Diagnostic_String(diagnostics[0]), /does not fit in Acme.Byte/);

  const call = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(extended.extensionHost.facts.get(call, selectedTargetSignatureFactKey), undefined);
});

test("extension diagnostics can use explicit source spans through the standard semantic channel", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare function pin(value: number): number;
      pin(1);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerExtension("@example/target/Acme.Console.js", false, sourceSpanRejectingCallProvider())],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  const call = findFirstNodeByKind(index, KindCallExpression);

  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), index);
  assert.equal(diagnostics.length, 1);
  assert.equal(Diagnostic_Code(diagnostics[0]), 9910126);
  assert.equal(Diagnostic_Pos(diagnostics[0]), Node_Pos(call));
  assert.equal(Diagnostic_End(diagnostics[0]), Node_End(call));
  assert.match(Diagnostic_String(diagnostics[0]), /ACME0126/);
});

test("unsupported native surface operations are diagnostics, not fallback calls", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare const values: { push(value: number): number };
      values.push(1);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    activeSurface: "native-array",
    extensions: [providerExtension("@example/target/Acme.Console.js", false, rejectingNativeArrayPushProvider())],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  const call = findFirstNodeByKind(index, KindCallExpression);

  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), index);
  assert.equal(diagnostics.length, 1);
  assert.equal(Diagnostic_Code(diagnostics[0]), 9910301);
  assert.ok(Diagnostic_Pos(diagnostics[0]) >= Node_Pos(call));
  assert.ok(Diagnostic_End(diagnostics[0]) <= Node_End(call));
  assert.match(Diagnostic_String(diagnostics[0]), /ACME0301/);
  assert.match(Diagnostic_String(diagnostics[0]), /native-array surface does not support push/);

  const nativeSurfaceDiagnostics = extended.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "ACME_NATIVE_ARRAY_PUSH");
  assert.equal(nativeSurfaceDiagnostics.length, 1);
  assert.equal(nativeSurfaceDiagnostics[0]?.extensionId, "acme-native-array-surface-provider");
  assert.match(nativeSurfaceDiagnostics[0]?.evidence?.[0]?.message ?? "", /Surface capability/);
  assert.equal(extended.extensionHost.facts.get(call, selectedTargetSignatureFactKey), undefined);
  assert.equal(extended.extensionHost.facts.get(call, targetOperationFactKey), undefined);
});

test("borrow owned Vec surface records provider call facts without JS array fallback", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      declare const values: { push(value: number): void };
      values.push(1);
    `],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "borrow",
    activeSurface: "owned-vec",
    extensions: [semanticOnlyExtension("borrow-vec-surface-extension", borrowVecSurfaceProvider())],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const call = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  const selectedCall = consumer.getSelectedTargetCall(call);
  assert.equal(selectedCall?.member.id, "alloc.vec.Vec.push(i32)");
  assert.equal(selectedCall?.member.targetName, "push");
  assert.equal(selectedCall?.member.parameters[0]?.passingMode, "move");
});

test("provider-owned rejected modules do not fall back to file-system resolution", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `import { SearchValues } from "@example/target/Acme.Buffers.js";`],
    ["/src/node_modules/@example/target/Acme.Buffers.js", "export const SearchValues = 1;"],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        allowJs: true,
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [providerExtension("@example/target/Acme.Buffers.js", true)],
  });

  const program = NewProgram(options);
  const sourceFileNames = Program_GetSourceFiles(program).map((file) => SourceFile_FileName(file));

  assert.equal(extended.extensionHost.diagnostics.all().length, 1);
  assert.equal(extended.extensionHost.diagnostics.all()[0]?.extensionCode, "PROVIDER_REJECTED_MODULE");
  assert.ok(!sourceFileNames.includes("/src/node_modules/@example/target/Acme.Buffers.js"));
});

test("configured provider-owned imports diagnose missing providers and do not fall back to files", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `import { SearchValues } from "@target/runtime.js";`],
    ["/src/node_modules/@target/runtime.js", "export const SearchValues = 1;"],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        allowJs: true,
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
      },
      files: ["index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);

  const options = {
    Config: parsed,
    Host: host,
  } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "demo",
    requiredProviderModules: [{
      specifierPrefix: "@target/",
      target: "demo",
      message: "The demo target provider is required for @target/* imports.",
    }],
  });

  const program = NewProgram(options);
  const sourceFileNames = Program_GetSourceFiles(program).map((file) => SourceFile_FileName(file));

  assert.equal(extended.extensionHost.diagnostics.all().length, 1);
  assert.equal(extended.extensionHost.diagnostics.all()[0]?.numericCode, ExtensionHostDiagnosticCode.providerMissing);
  assert.ok(!sourceFileNames.includes("/src/node_modules/@target/runtime.js"));
});

function broadProviderUriBoundaryExtension(
  publicSpecifier: string,
  ownershipRequests: string[],
  resolutionRequests: string[],
): CompilerExtension {
  return {
    identity: {
      id: "acme-provider-uri-boundary-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-provider-uri-boundary",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-provider-uri-boundary-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule(moduleSpecifier) {
          ownershipRequests.push(moduleSpecifier);
          return { kind: "owned" };
        },
        resolveModule(moduleSpecifier) {
          resolutionRequests.push(moduleSpecifier);
          return {
            kind: "virtual",
            moduleSpecifier,
            virtualFileName: "tsts-provider://acme/provider-uri-boundary",
            providerModuleId: "acme.provider-uri-boundary",
          };
        },
        getDeclarationModel(resolution): ProviderDeclarationModel {
          return {
            moduleSpecifier: resolution.moduleSpecifier,
            providerModuleId: resolution.providerModuleId,
            exports: [{
              id: "Widget",
              name: "Widget",
              kind: "interface",
              members: [],
            }],
          };
        },
      }), true);
    },
  };
}

function isReservedProviderUri(moduleSpecifier: string): boolean {
  return moduleSpecifier.startsWith(providerVirtualInternalRoot)
    || moduleSpecifier.startsWith(providerVirtualPublicRoot);
}

function providerExtension(specifier: string, reject = false, provider?: TargetSemanticProvider): CompilerExtension {
  return {
    identity: {
      id: "acme-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme",
    },
    initialize(context): void {
      context.registerTargetBindingProvider(acmeProvider(specifier, reject));
      if (provider !== undefined) {
        assert.equal(context.registerTargetSemanticProvider(provider), true);
      }
    },
  };
}

function undefinedStateProviderExtension(): CompilerExtension {
  return {
    identity: {
      id: "acme-undefined-state-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-undefined-state-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-undefined-state-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === "@acme/native/tasks.js" ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier) => ({
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: "tsts-provider://acme/Native.Tasks",
          providerModuleId: "acme.native.tasks",
        }),
        getDeclarationModel: (resolution) => ({
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [{
            id: "continueWith",
            name: "continueWith",
            kind: "function",
            signatures: [{
              id: "continueWith(callback,state)",
              parameters: [{
                name: "callback",
                type: {
                  kind: "function",
                  parameters: [],
                  returnType: { kind: "object" },
                },
              }, {
                name: "state",
                type: {
                  kind: "union",
                  types: [{ kind: "object" }, { kind: "undefined" }],
                },
              }],
              returnType: { kind: "object" },
            }],
          }],
        }),
      }), true);
    },
  };
}

function sourceGlobalProfile(declarations: string): string {
  return `
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
    ${declarations}
  `;
}

function createSourceGlobalProviderProgram(options: {
  readonly profiles: readonly string[];
  readonly members: readonly ProviderMemberDeclaration[];
  readonly source: string;
  readonly onProperty?: (request: CheckedPropertyAccessMappingRequest) => void;
  readonly onCall?: (request: CheckedCallMappingRequest) => void;
}) {
  const profileFiles = options.profiles.map((text, index) => [`/src/profile-${index}.d.ts`, text] as const);
  let fs = FromMap(new Map<string, string>([
    ...profileFiles,
    ["/src/index.ts", options.source],
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
        strict: true,
      },
      files: [...profileFiles.map(([fileName]) => fileName.slice("/src/".length)), "index.ts"],
    })],
  ]), false as bool);
  fs = WrapFS(fs);
  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);
  const programOptions = { Config: parsed, Host: host } satisfies ProgramOptions;
  const extended = attachExtensionHost(programOptions, {
    activeTarget: "acme",
    extensions: [sourceGlobalProviderExtension(options)],
  });
  const program = NewProgram(programOptions);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  return { program, index, extended };
}

function sourceGlobalProviderExtension(options: {
  readonly members: readonly ProviderMemberDeclaration[];
  readonly onProperty?: (request: CheckedPropertyAccessMappingRequest) => void;
  readonly onCall?: (request: CheckedCallMappingRequest) => void;
}): CompilerExtension {
  const specifier = "@acme/native/source-globals.js";
  return {
    identity: {
      id: "acme-source-global-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-source-global-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-source-global-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier) => ({
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: "tsts-provider://acme/source-globals",
          providerModuleId: "acme.source-globals",
        }),
        getDeclarationModel: (resolution) => ({
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [{
            id: "Value",
            name: "Value",
            kind: "class",
            targetIdentity: { target: "acme", id: "Acme.Value" },
            members: [{ id: "Value.label", name: "label", kind: "property", type: { kind: "string" } }],
          }, {
            id: "Holder",
            name: "Holder",
            kind: "class",
            targetIdentity: { target: "acme", id: "Acme.Holder" },
            members: options.members,
          }],
        }),
      }), true);
      assert.equal(context.registerTargetSemanticProvider({
        identity: semanticProviderIdentity("acme-source-global-semantic-provider"),
        mapCheckedPropertyAccess: (request) => {
          options.onProperty?.(request);
          return deferObservation;
        },
        mapCheckedCall: (request) => {
          options.onCall?.(request);
          return deferObservation;
        },
      }), true);
    },
  };
}

function semanticOnlyExtension(id: string, provider: TargetSemanticProvider): CompilerExtension {
  return {
    identity: {
      id,
      version: "1.0.0",
      capabilityNamespace: id,
    },
    initialize(context): void {
      assert.equal(context.registerTargetSemanticProvider(provider), true);
    },
  };
}

function passingModeProviderExtension(): CompilerExtension {
  return {
    identity: {
      id: "acme-passing-mode-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-passing-mode-provider",
    },
    initialize(context): void {
      const targetIdentity: TargetIdentity = {
        target: "acme",
        id: "Acme.NativePort",
        displayName: "Acme.NativePort",
      };
      const method = (id: string, name: string, passingMode?: ArgumentPassingMode) => ({
        id,
        name,
        kind: "method" as const,
        signatures: [{
          id: `${id}(number)`,
          parameters: [{
            name: "value",
            type: { kind: "number" as const },
            ...(passingMode !== undefined ? { passingMode } : {}),
          }],
          returnType: { kind: "void" as const },
        }],
      });
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-passing-mode-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === "@acme/native/calls.js" ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier) => ({
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: "tsts-provider://acme/Native.Calls",
          providerModuleId: "acme.native.calls",
        }),
        getDeclarationModel: (resolution) => ({
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [{
            id: "NativePort",
            name: "NativePort",
            kind: "class",
            targetIdentity,
            members: [
              method("byValue", "byValue"),
              method("readonlyRef", "readonlyRef", "byref-readonly"),
              method("readwriteRef", "readwriteRef", "byref-readwrite"),
              method("writeonlyRef", "writeonlyRef", "byref-writeonly-must-init"),
              method("borrowShared", "borrowShared", "borrow-shared"),
              method("borrowMut", "borrowMut", "borrow-mut"),
              method("move", "move", "move"),
              {
                id: "sameShape",
                name: "sameShape",
                kind: "method",
                signatures: [{
                  id: "sameShape.readonly(number)",
                  parameters: [{ name: "value", type: { kind: "number" }, passingMode: "byref-readonly" }],
                  returnType: { kind: "void" },
                }, {
                  id: "sameShape.move(number)",
                  parameters: [{ name: "value", type: { kind: "number" }, passingMode: "move" }],
                  returnType: { kind: "void" },
                }],
              },
            ],
          }],
        }),
      }), true);
    },
  };
}

function bufferProviderExtension(): CompilerExtension {
  return {
    identity: {
      id: "acme-buffer-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-buffer-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-buffer-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === "@example/target/Acme.Buffer.js" ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier) => ({
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: "tsts-provider://acme/Acme.Buffer",
          providerModuleId: "Acme.Buffer",
        }),
        getDeclarationModel: (resolution) => ({
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [{
            id: "Buffer",
            name: "Buffer",
            kind: "class",
            members: [{
              id: "Buffer.constructor",
              name: "constructor",
              kind: "constructor",
              signatures: [{
                id: "Buffer.constructor()",
                parameters: [],
              }],
            }, {
              id: "Buffer.compare.static",
              name: "compare",
              kind: "method",
              static: true,
              signatures: [{
                id: "Buffer.compare(Buffer,Buffer)",
                parameters: [
                  { name: "left", type: { kind: "provider-ref", moduleSpecifier: resolution.moduleSpecifier, exportName: "Buffer" } },
                  { name: "right", type: { kind: "provider-ref", moduleSpecifier: resolution.moduleSpecifier, exportName: "Buffer" } },
                ],
                returnType: { kind: "number" },
              }],
            }, {
              id: "Buffer.compare.instance",
              name: "compare",
              kind: "method",
              static: false,
              signatures: [{
                id: "Buffer.prototype.compare(Buffer)",
                parameters: [
                  { name: "other", type: { kind: "provider-ref", moduleSpecifier: resolution.moduleSpecifier, exportName: "Buffer" } },
                ],
                returnType: { kind: "number" },
              }],
            }, {
              id: "Buffer.index",
              name: "index",
              kind: "indexer",
              signatures: [{
                id: "Buffer[index]",
                parameters: [{ name: "index", type: { kind: "number" } }],
                returnType: { kind: "number" },
              }],
            }],
          }],
        }),
      }), true);
    },
  };
}

function dualMemberProviderExtension(): CompilerExtension {
  return {
    identity: {
      id: "acme-dual-member-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-dual-member-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-dual-member-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === "@acme/native/dual.js" ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier) => ({
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: "tsts-provider://acme/Dual.Member",
          providerModuleId: "acme.dual.member",
        }),
        getDeclarationModel: (resolution) => ({
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [{
            id: "DualMember",
            name: "DualMember",
            kind: "class",
            members: [{
              id: "DualMember.Equals#instance",
              name: "Equals",
              kind: "method",
              static: false,
              signatures: [{
                id: "DualMember.Equals#instance(DualMember)",
                parameters: [
                  { name: "other", type: { kind: "provider-ref", moduleSpecifier: resolution.moduleSpecifier, exportName: "DualMember" } },
                ],
                returnType: { kind: "boolean" },
              }],
            }, {
              id: "DualMember.Equals#static",
              name: "Equals",
              kind: "method",
              static: true,
              signatures: [{
                id: "DualMember.Equals#static(DualMember,DualMember)",
                parameters: [
                  { name: "left", type: { kind: "provider-ref", moduleSpecifier: resolution.moduleSpecifier, exportName: "DualMember" } },
                  { name: "right", type: { kind: "provider-ref", moduleSpecifier: resolution.moduleSpecifier, exportName: "DualMember" } },
                ],
                returnType: { kind: "boolean" },
              }],
            }, {
              id: "DualMember.GetType#instance",
              name: "GetType",
              kind: "method",
              static: false,
              signatures: [{
                id: "DualMember.GetType#instance()",
                parameters: [],
                returnType: { kind: "provider-ref", moduleSpecifier: resolution.moduleSpecifier, exportName: "DualType" },
              }],
            }, {
              id: "DualMember.GetType#static",
              name: "GetType",
              kind: "method",
              static: true,
              signatures: [{
                id: "DualMember.GetType#static(string)",
                parameters: [{ name: "typeName", type: { kind: "string" } }],
                returnType: { kind: "provider-ref", moduleSpecifier: resolution.moduleSpecifier, exportName: "DualType" },
              }],
            }],
          }, {
            id: "DualType",
            name: "DualType",
            kind: "class",
            members: [],
          }],
        }),
      }), true);
    },
  };
}

function sliceProviderExtension(): CompilerExtension {
  return {
    identity: {
      id: "acme-slice-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-slice-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-slice-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier.startsWith("@acme/dotnet/") ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier) => ({
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: moduleSpecifier === "@acme/dotnet/System.js"
            ? "tsts-provider://acme/slice-IAsyncEnumerable"
            : "tsts-provider://acme/slice-System.Linq",
          providerModuleId: moduleSpecifier === "@acme/dotnet/System.js"
            ? "acme.slice.System"
            : "acme.slice.System.Linq",
        }),
        getDeclarationModel: (resolution) => {
          if (resolution.moduleSpecifier === "@acme/dotnet/System.js") {
            return {
              moduleSpecifier: resolution.moduleSpecifier,
              providerModuleId: resolution.providerModuleId,
              exports: [{
                id: "IAsyncEnumerable",
                name: "IAsyncEnumerable",
                kind: "interface",
                typeParameters: [{ name: "T" }],
                members: [],
              }],
            };
          }
          return {
            moduleSpecifier: resolution.moduleSpecifier,
            providerModuleId: resolution.providerModuleId,
            imports: [{
              moduleSpecifier: "@acme/dotnet/System.js",
              typeOnly: true,
              namedImports: [{ exportedName: "IAsyncEnumerable" }],
            }],
            exports: [{
              id: "Query",
              name: "Query",
              kind: "namespace",
              members: [{
                id: "Query.consume",
                name: "consume",
                kind: "method",
                signatures: [{
                  id: "Query.consume(IAsyncEnumerable<number>)",
                  parameters: [{
                    name: "seq",
                    type: {
                      kind: "provider-ref",
                      moduleSpecifier: "@acme/dotnet/System.js",
                      exportName: "IAsyncEnumerable",
                      typeArguments: [{ kind: "number" }],
                    },
                  }],
                  returnType: { kind: "void" },
                }],
              }],
            }],
          };
        },
      }), true);
    },
  };
}

function orderDependentSliceProviderExtension(): CompilerExtension {
  let pendingRuntimeExports: readonly string[] = [];
  return {
    identity: {
      id: "acme-order-dependent-slice-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-order-dependent-slice-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-order-dependent-slice-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier.startsWith("@acme/sliced/") ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier, moduleContext) => {
          if (moduleSpecifier === "@acme/sliced/System.IO.js") {
            pendingRuntimeExports = (moduleContext.importSlice?.requestedExports ?? [])
              .map((request) => request.exportedName)
              .sort();
          }
          return {
            kind: "virtual",
            moduleSpecifier,
            virtualFileName: moduleSpecifier === "@acme/sliced/System.IO.js"
              ? "tsts-provider://acme/sliced-System.IO"
              : "tsts-provider://acme/sliced-System.Linq",
            providerModuleId: moduleSpecifier === "@acme/sliced/System.IO.js"
              ? "acme.sliced.System.IO"
              : "acme.sliced.System.Linq",
            packageName: "@acme/sliced",
            packageVersion: "1.0.0",
          };
        },
        getDeclarationModel: (resolution) => {
          if (resolution.moduleSpecifier === "@acme/sliced/System.IO.js") {
            const requested = pendingRuntimeExports.length === 0
              ? ["DependencyOnly", "PublicReader", "PublicWriter"]
              : pendingRuntimeExports;
            return {
              moduleSpecifier: resolution.moduleSpecifier,
              providerModuleId: resolution.providerModuleId,
              exports: requested.map((exportName) => ({
                id: exportName,
                name: exportName,
                kind: "interface" as const,
                members: [],
              })),
            };
          }
          return {
            moduleSpecifier: resolution.moduleSpecifier,
            providerModuleId: resolution.providerModuleId,
            imports: [{
              moduleSpecifier: "@acme/sliced/System.IO.js",
              typeOnly: true,
              namedImports: [{ exportedName: "DependencyOnly" }],
            }],
            exports: [{
              id: "Query",
              name: "Query",
              kind: "namespace",
              members: [{
                id: "Query.consume",
                name: "consume",
                kind: "method",
                signatures: [{
                  id: "Query.consume(DependencyOnly)",
                  parameters: [{
                    name: "value",
                    type: {
                      kind: "provider-ref",
                      moduleSpecifier: "@acme/sliced/System.IO.js",
                      exportName: "DependencyOnly",
                    },
                  }],
                  returnType: { kind: "void" },
                }],
              }],
            }],
          };
        },
      }), true);
    },
  };
}

function sharedOrdinaryDependencyProviderExtension(): CompilerExtension {
  const leftSpecifier = "@acme/shared/left.js";
  const rightSpecifier = "@acme/shared/right.js";
  const supportSpecifier = "@acme/shared/support.js";
  return {
    identity: {
      id: "acme-shared-ordinary-dependency-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-shared-ordinary-dependency",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-shared-ordinary-dependency-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => [leftSpecifier, rightSpecifier, supportSpecifier].includes(moduleSpecifier)
          ? { kind: "owned" }
          : { kind: "unowned" },
        resolveModule: (moduleSpecifier) => ({
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: moduleSpecifier === leftSpecifier
            ? "tsts-provider://acme/shared-left"
            : moduleSpecifier === rightSpecifier
              ? "tsts-provider://acme/shared-right"
              : "tsts-provider://acme/shared-support",
          providerModuleId: moduleSpecifier === leftSpecifier
            ? "acme.shared.left"
            : moduleSpecifier === rightSpecifier
              ? "acme.shared.right"
              : "acme.shared.support",
        }),
        getDeclarationModel: (resolution) => {
          if (resolution.moduleSpecifier === supportSpecifier) {
            return {
              moduleSpecifier: supportSpecifier,
              providerModuleId: "acme.shared.support",
              exports: [{ id: "Token", name: "Token", kind: "interface", members: [] }],
            };
          }
          const exportName = resolution.moduleSpecifier === leftSpecifier ? "Left" : "Right";
          return {
            moduleSpecifier: resolution.moduleSpecifier,
            providerModuleId: resolution.moduleSpecifier === leftSpecifier ? "acme.shared.left" : "acme.shared.right",
            imports: [{ moduleSpecifier: supportSpecifier, typeOnly: true, namedImports: [{ exportedName: "Token" }] }],
            exports: [{
              id: exportName,
              name: exportName,
              kind: "class",
              members: [{
                id: `${exportName}.make`,
                name: "make",
                kind: "method",
                signatures: [{
                  id: `${exportName}.make()`,
                  parameters: [],
                  returnType: { kind: "provider-ref", moduleSpecifier: supportSpecifier, exportName: "Token" },
                }],
              }],
            }],
          };
        },
      }), true);
    },
  };
}

function publicProviderSliceIdentityProviderExtension(reflectionResolutionContexts?: string[]): CompilerExtension {
  const pendingExportsByModule = new Map<string, readonly string[]>();
  let reflectionNeedsSupportImport = false;
  return {
    identity: {
      id: "acme-public-provider-slice-identity-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-public-provider-slice-identity",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-public-provider-slice-identity",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier.startsWith("@acme/public/") ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier, moduleContext) => {
          pendingExportsByModule.set(moduleSpecifier, (moduleContext.importSlice?.requestedExports ?? [])
            .map((request) => request.exportedName)
            .sort());
          if (moduleSpecifier === "@acme/public/reflection.js") {
            reflectionResolutionContexts?.push(moduleContext.containingFile ?? "");
            reflectionNeedsSupportImport = moduleContext.containingFile?.startsWith("tsts-provider://acme/public-core") !== true;
          }
          return {
            kind: "virtual",
            moduleSpecifier,
            virtualFileName: moduleSpecifier === "@acme/public/reflection.js"
              ? "tsts-provider://acme/public-reflection"
              : moduleSpecifier === "@acme/public/core.js"
                ? "tsts-provider://acme/public-core"
                : "tsts-provider://acme/public-support",
            providerModuleId: moduleSpecifier === "@acme/public/reflection.js"
              ? "acme.public.Reflection"
              : moduleSpecifier === "@acme/public/core.js"
                ? "acme.public.Core"
                : "acme.public.Support",
            packageName: "@acme/public",
            packageVersion: "1.0.0",
          };
        },
        getDeclarationModel: (resolution) => {
          if (resolution.moduleSpecifier === "@acme/public/support.js") {
            return {
              moduleSpecifier: resolution.moduleSpecifier,
              providerModuleId: resolution.providerModuleId,
              exports: [{
                id: "Marker",
                name: "Marker",
                kind: "interface",
                members: [],
              }],
            };
          }
          if (resolution.moduleSpecifier === "@acme/public/core.js") {
            return {
              moduleSpecifier: resolution.moduleSpecifier,
              providerModuleId: resolution.providerModuleId,
              imports: [{
                moduleSpecifier: "@acme/public/reflection.js",
                typeOnly: true,
                namedImports: [{ exportedName: "Token" }],
              }],
              exports: [{
                id: "Base",
                name: "Base",
                kind: "class",
                members: [{
                  id: "Base.make",
                  name: "make",
                  kind: "method",
                  signatures: [{
                    id: "Base.make()",
                    parameters: [],
                    returnType: {
                      kind: "provider-ref",
                      moduleSpecifier: "@acme/public/reflection.js",
                      exportName: "Token",
                    },
                  }],
                }, {
                  id: "Base.makeMany",
                  name: "makeMany",
                  kind: "method",
                  signatures: [{
                    id: "Base.makeMany()",
                    parameters: [],
                    returnType: {
                      kind: "array",
                      elementType: {
                        kind: "provider-ref",
                        moduleSpecifier: "@acme/public/reflection.js",
                        exportName: "Token",
                      },
                    },
                  }],
                }],
              }],
            };
          }
          const requested = pendingExportsByModule.get(resolution.moduleSpecifier) ?? [];
          const needsDerived = requested.length === 0 || requested.includes("Derived");
          const imports = [
            ...(needsDerived ? [{
              moduleSpecifier: "@acme/public/core.js",
              namedImports: [{ exportedName: "Base" }],
            }] : []),
            ...(reflectionNeedsSupportImport ? [{
              moduleSpecifier: "@acme/public/support.js",
              typeOnly: true,
              namedImports: [{ exportedName: "Marker" }],
            }] : []),
          ];
          return {
            moduleSpecifier: resolution.moduleSpecifier,
            providerModuleId: resolution.providerModuleId,
            ...(imports.length > 0 ? { imports } : {}),
            exports: [
              {
                id: "Token",
                name: "TokenImplementation",
                exportName: "Token",
                kind: "class" as const,
                members: [{
                  id: "Token.invoke",
                  name: "invoke",
                  kind: "method" as const,
                  signatures: [{
                    id: "Token.invoke(Flags)",
                    parameters: [{
                      name: "flags",
                      type: {
                        kind: "provider-ref" as const,
                        moduleSpecifier: "@acme/public/reflection.js",
                        exportName: "Flags",
                      },
                    }],
                    returnType: {
                      kind: "provider-ref" as const,
                      moduleSpecifier: "@acme/public/reflection.js",
                      exportName: "Member",
                    },
                  }],
                }, {
                  id: "Token.describe",
                  name: "describe",
                  kind: "method" as const,
                  signatures: [{
                    id: "Token.describe()",
                    parameters: [],
                    returnType: {
                      kind: "provider-ref" as const,
                      moduleSpecifier: "@acme/public/reflection.js",
                      exportName: "Descriptor",
                    },
                  }],
                }],
              }, {
                id: "Member",
                name: "Member",
                kind: "class" as const,
                members: [{
                  id: "Member.token",
                  name: "token",
                  kind: "property" as const,
                  readonly: true,
                  type: {
                    kind: "provider-ref" as const,
                    moduleSpecifier: "@acme/public/reflection.js",
                    exportName: "Token",
                    localName: "TokenImplementation",
                  },
                }],
              }, {
                id: "Flags",
                name: "Flags",
                kind: "enum" as const,
                members: [{
                  id: "Flags.none",
                  name: "none",
                  kind: "field" as const,
                }],
              }, {
                id: "Descriptor",
                name: "Descriptor",
                kind: "interface" as const,
                members: [],
              },
              ...(needsDerived ? [{
                id: "Derived",
                name: "Derived",
                kind: "class" as const,
                heritage: [{
                  kind: "extends" as const,
                  type: {
                    kind: "provider-ref" as const,
                    moduleSpecifier: "@acme/public/core.js",
                    exportName: "Base",
                  },
                }],
                members: [{
                  id: "Derived.make",
                  name: "make",
                  kind: "method" as const,
                  signatures: [{
                    id: "Derived.make()",
                    parameters: [],
                    returnType: {
                      kind: "provider-ref" as const,
                      moduleSpecifier: "@acme/public/reflection.js",
                      exportName: "Token",
                    },
                  }],
                }, {
                  id: "Derived.makeMany",
                  name: "makeMany",
                  kind: "method" as const,
                  signatures: [{
                    id: "Derived.makeMany()",
                    parameters: [],
                    returnType: {
                      kind: "array" as const,
                      elementType: {
                        kind: "provider-ref" as const,
                        moduleSpecifier: "@acme/public/reflection.js",
                        exportName: "Token",
                      },
                    },
                  }],
                }],
              }] : []),
            ],
          };
        },
      }), true);
    },
  };
}

function externalGenericHeritageProviderExtension(
  observeRequest?: (moduleSpecifier: string, requestedExports: readonly string[]) => void,
): CompilerExtension {
  let collectionsNeedSupportImport = false;
  return {
    identity: {
      id: "acme-external-generic-heritage-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-external-generic-heritage",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-external-generic-heritage-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === "@acme/public/collections.js"
          || moduleSpecifier === "@acme/public/model-binding.js"
          || moduleSpecifier === "@acme/public/support.js"
          ? { kind: "owned" }
          : { kind: "unowned" },
        resolveModule: (moduleSpecifier, moduleContext) => {
          assert.equal(moduleSpecifier.startsWith("tsts-provider://"), false);
          observeRequest?.(
            moduleSpecifier,
            (moduleContext.importSlice?.requestedExports ?? []).map((request) => request.exportedName),
          );
          if (moduleSpecifier === "@acme/public/collections.js") {
            collectionsNeedSupportImport = moduleContext.containingFile?.startsWith("tsts-provider://acme/public-model-binding") !== true;
          }
          return {
            kind: "virtual",
            moduleSpecifier,
            virtualFileName: moduleSpecifier === "@acme/public/collections.js"
              ? "tsts-provider://acme/public-collections-generic"
              : moduleSpecifier === "@acme/public/model-binding.js"
                ? "tsts-provider://acme/public-model-binding"
                : "tsts-provider://acme/public-support-generic",
            providerModuleId: moduleSpecifier === "@acme/public/collections.js"
              ? "acme.public.Collections"
              : moduleSpecifier === "@acme/public/model-binding.js"
                ? "acme.public.ModelBinding"
                : "acme.public.Support",
            packageName: "@acme/public",
            packageVersion: "1.0.0",
          };
        },
        getDeclarationModel: (resolution) => {
          if (resolution.moduleSpecifier === "@acme/public/support.js") {
            return {
              moduleSpecifier: resolution.moduleSpecifier,
              providerModuleId: resolution.providerModuleId,
              exports: [{
                id: "Marker",
                name: "Marker",
                kind: "interface",
                members: [],
              }],
            };
          }
          if (resolution.moduleSpecifier === "@acme/public/collections.js") {
            return {
              moduleSpecifier: resolution.moduleSpecifier,
              providerModuleId: resolution.providerModuleId,
              ...(collectionsNeedSupportImport ? {
                imports: [{
                  moduleSpecifier: "@acme/public/support.js",
                  typeOnly: true,
                  namedImports: [{ exportedName: "Marker" }],
                }],
              } : {}),
              exports: [{
                id: "ReadOnlyCollection",
                name: "ReadOnlyCollection",
                kind: "class",
                sourceTypeFamily: {
                  exportName: "ReadOnlyCollection",
                  typeArgumentCount: 0,
                },
                targetIdentity: {
                  target: "acme",
                  id: "Acme.Collections.ReadOnlyCollection",
                },
                members: [{
                  id: "ReadOnlyCollection.Count",
                  name: "Count",
                  kind: "property",
                  readonly: true,
                  type: { kind: "number" },
                }],
              }, {
                id: "ReadOnlyCollection_1",
                name: "ReadOnlyCollection_1",
                kind: "class",
                sourceTypeFamily: {
                  exportName: "ReadOnlyCollection",
                  typeArgumentCount: 1,
                },
                targetIdentity: {
                  target: "acme",
                  id: "Acme.Collections.ReadOnlyCollection`1",
                },
                typeParameters: [{ name: "T" }],
                heritage: [{
                  kind: "extends",
                  type: {
                    kind: "provider-ref",
                    moduleSpecifier: "@acme/public/collections.js",
                    exportName: "ReadOnlyCollection",
                  },
                }],
                members: [{
                  id: "ReadOnlyCollection.Item",
                  name: "Item",
                  kind: "property",
                  readonly: true,
                  type: { kind: "type-parameter", name: "T" },
                }],
              }],
            };
          }
          return {
            moduleSpecifier: resolution.moduleSpecifier,
            providerModuleId: resolution.providerModuleId,
            imports: [{
              moduleSpecifier: "@acme/public/collections.js",
              namedImports: [{
                exportedName: "ReadOnlyCollection",
                localName: "ImportedReadOnlyCollection",
              }],
            }, {
              moduleSpecifier: "@acme/public/collections.js",
              namespaceImport: "Collections",
            }],
            exports: [{
              id: "ModelMetadata",
              name: "ModelMetadata",
              kind: "class",
              members: [],
            }, {
              id: "ModelCollection",
              name: "ModelCollection",
              kind: "class",
              heritage: [{
                kind: "extends",
                type: {
                  kind: "provider-ref",
                  moduleSpecifier: "@acme/public/collections.js",
                  exportName: "ReadOnlyCollection",
                  localName: "ImportedReadOnlyCollection",
                },
              }],
              members: [],
            }, {
              id: "ModelPropertyCollection",
              name: "ModelPropertyCollection",
              kind: "class",
              heritage: [{
                kind: "extends",
                type: {
                  kind: "provider-ref",
                  moduleSpecifier: "@acme/public/collections.js",
                  exportName: "ReadOnlyCollection",
                  localName: "ImportedReadOnlyCollection",
                  typeArguments: [{
                    kind: "provider-ref",
                    moduleSpecifier: "@acme/public/model-binding.js",
                    exportName: "ModelMetadata",
                  }],
                },
              }],
              members: [],
            }, {
              id: "NamespaceModelCollection",
              name: "NamespaceModelCollection",
              kind: "class",
              heritage: [{
                kind: "extends",
                type: {
                  kind: "provider-ref",
                  moduleSpecifier: "@acme/public/collections.js",
                  exportName: "ReadOnlyCollection",
                  namespaceImport: "Collections",
                },
              }],
              members: [],
            }, {
              id: "WrappedModelPropertyCollection",
              name: "WrappedModelPropertyCollection",
              kind: "class",
              heritage: [{
                kind: "extends",
                type: {
                  kind: "target-named",
                  target: "acme",
                  id: "Acme.Collections.ReadOnlyCollection`1",
                  sourceShape: {
                    kind: "provider-ref",
                    moduleSpecifier: "@acme/public/collections.js",
                    exportName: "ReadOnlyCollection",
                    localName: "ImportedReadOnlyCollection",
                    typeArguments: [{
                      kind: "provider-ref",
                      moduleSpecifier: "@acme/public/model-binding.js",
                      exportName: "ModelMetadata",
                    }],
                  },
                },
              }],
              members: [],
            }, {
              id: "OpaqueModelPropertyCollection",
              name: "OpaqueModelPropertyCollection",
              kind: "class",
              heritage: [{
                kind: "extends",
                type: {
                  kind: "opaque",
                  id: "acme-read-only-collection-of-model-metadata",
                  sourceShape: {
                    kind: "provider-ref",
                    moduleSpecifier: "@acme/public/collections.js",
                    exportName: "ReadOnlyCollection",
                    localName: "ImportedReadOnlyCollection",
                    typeArguments: [{
                      kind: "provider-ref",
                      moduleSpecifier: "@acme/public/model-binding.js",
                      exportName: "ModelMetadata",
                    }],
                  },
                },
              }],
              members: [],
            }],
          };
        },
      }), true);
    },
  };
}

function createCanonicalMultiArityHeritageProgram(fileOrder: readonly string[]): {
  readonly program: GoPtr<Program>;
  readonly sourceFiles: readonly GoPtr<SourceFile>[];
  readonly extended: ReturnType<typeof attachExtensionHost>;
} {
  const sourceByName = new Map<string, string>([
    ["base.ts", `
      import { Base } from "@acme/canonical/family.js";

      declare const base: Base;
      const zero: number = base.Zero;
      zero;
    `],
    ["middle.ts", `
      import { Middle0, Middle1 } from "@acme/canonical/family.js";

      declare const zero: Middle0;
      declare const one: Middle1<string>;
      const zeroValue: number = zero.Zero;
      const value: string = one.Value;
      zeroValue;
      value;
    `],
    ["derived.ts", `
      import { Derived0, Derived1 } from "@acme/canonical/family.js";

      declare const zero: Derived0;
      declare const one: Derived1<string>;
      const inheritedZero: number = zero.Zero;
      const inheritedValue: string = one.Value;
      inheritedZero;
      inheritedValue;
    `],
  ]);
  let fs = FromMap(new Map<string, string>([
    ...fileOrder.map((fileName) => [`/src/${fileName}`, sourceByName.get(fileName)!] as const),
    ["/src/tsconfig.json", JSON.stringify({
      compilerOptions: {
        noLib: true,
        module: "esnext",
        moduleResolution: "bundler",
        verbatimModuleSyntax: true,
      },
      files: fileOrder,
    })],
  ]), false as bool);
  fs = WrapFS(fs);

  const host = NewCompilerHost("/src", fs, LibPath(), undefined, undefined);
  const [parsed, configErrors] = GetParsedCommandLineOfConfigFile("/src/tsconfig.json", {} as CompilerOptions, undefined, host as ParseConfigHost, undefined);
  assert.equal((configErrors ?? []).length, 0);
  const options = { Config: parsed, Host: host } satisfies ProgramOptions;
  const extended = attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [canonicalMultiArityHeritageProviderExtension()],
  });
  const program = NewProgram(options);
  const sourceFiles = fileOrder.map((fileName) => {
    const sourceFile = Program_GetSourceFile(program, `/src/${fileName}`);
    assert.ok(sourceFile !== undefined);
    return sourceFile;
  });
  return { program, sourceFiles, extended };
}

function canonicalMultiArityHeritageProviderExtension(): CompilerExtension {
  const familySpecifier = "@acme/canonical/family.js";
  const supportSpecifier = "@acme/canonical/support.js";
  let pendingExports: readonly string[] = [];
  let includeSupport = false;
  return {
    identity: {
      id: "acme-canonical-multi-arity-heritage-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-canonical-multi-arity-heritage",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-canonical-multi-arity-heritage-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === familySpecifier || moduleSpecifier === supportSpecifier
          ? { kind: "owned" }
          : { kind: "unowned" },
        resolveModule: (moduleSpecifier, moduleContext) => {
          pendingExports = (moduleContext.importSlice?.requestedExports ?? []).map((request) => request.exportedName);
          includeSupport = moduleContext.containingFile?.endsWith("/middle.ts") === true;
          return {
            kind: "virtual",
            moduleSpecifier,
            virtualFileName: moduleSpecifier === familySpecifier
              ? "tsts-provider://acme/canonical-family"
              : "tsts-provider://acme/canonical-family-support",
            providerModuleId: moduleSpecifier === familySpecifier
              ? "acme.canonical.family"
              : "acme.canonical.support",
          };
        },
        getDeclarationModel: (resolution) => {
          if (resolution.moduleSpecifier === supportSpecifier) {
            return {
              moduleSpecifier: resolution.moduleSpecifier,
              providerModuleId: resolution.providerModuleId,
              exports: [{ id: "Marker", name: "Marker", kind: "interface", members: [] }],
            };
          }
          const includeDerived = pendingExports.includes("Derived0") || pendingExports.includes("Derived1");
          const includeMiddle = includeDerived || pendingExports.includes("Middle0") || pendingExports.includes("Middle1");
          return {
            moduleSpecifier: resolution.moduleSpecifier,
            providerModuleId: resolution.providerModuleId,
            ...(includeSupport ? {
              imports: [{
                moduleSpecifier: supportSpecifier,
                typeOnly: true,
                namedImports: [{ exportedName: "Marker" }],
              }],
            } : {}),
            exports: [{
              id: "Base",
              name: "Base",
              kind: "class" as const,
              sourceTypeFamily: { exportName: "Base", typeArgumentCount: 0 },
              members: [{
                id: "Base.Zero",
                name: "Zero",
                kind: "property" as const,
                readonly: true,
                type: { kind: "number" as const },
              }],
            }, {
              id: "Base_1",
              name: "Base_1",
              kind: "class" as const,
              sourceTypeFamily: { exportName: "Base", typeArgumentCount: 1 },
              typeParameters: [{ name: "T" }],
              heritage: [{
                kind: "extends" as const,
                type: { kind: "provider-ref" as const, moduleSpecifier: familySpecifier, exportName: "Base" },
              }],
              members: [{
                id: "Base_1.Value",
                name: "Value",
                kind: "property" as const,
                readonly: true,
                type: { kind: "type-parameter" as const, name: "T" },
              }],
            }, ...(includeMiddle ? [{
              id: "Middle0",
              name: "Middle0",
              kind: "class" as const,
              heritage: [{
                kind: "extends" as const,
                type: { kind: "provider-ref" as const, moduleSpecifier: familySpecifier, exportName: "Base" },
              }],
              members: [],
            }, {
              id: "Middle1",
              name: "Middle1",
              kind: "class" as const,
              typeParameters: [{ name: "T" }],
              heritage: [{
                kind: "extends" as const,
                type: {
                  kind: "provider-ref" as const,
                  moduleSpecifier: familySpecifier,
                  exportName: "Base",
                  typeArguments: [{ kind: "type-parameter" as const, name: "T" }],
                },
              }],
              members: [],
            }] : []), ...(includeDerived ? [{
              id: "Derived0",
              name: "Derived0",
              kind: "class" as const,
              heritage: [{
                kind: "extends" as const,
                type: { kind: "provider-ref" as const, moduleSpecifier: familySpecifier, exportName: "Middle0" },
              }],
              members: [],
            }, {
              id: "Derived1",
              name: "Derived1",
              kind: "class" as const,
              typeParameters: [{ name: "T" }],
              heritage: [{
                kind: "extends" as const,
                type: {
                  kind: "provider-ref" as const,
                  moduleSpecifier: familySpecifier,
                  exportName: "Middle1",
                  typeArguments: [{ kind: "type-parameter" as const, name: "T" }],
                },
              }],
              members: [],
            }] : [])],
          };
        },
      }), true);
    },
  };
}

function recursiveDeclarationHeritageProviderExtension(
  onResolve: (moduleSpecifier: string, requestedExports: readonly string[]) => void,
): CompilerExtension {
  const coreSpecifier = "@acme/recursive/core.js";
  const reflectionSpecifier = "@acme/recursive/reflection.js";
  const familyClass = (
    exportName: string,
    heritage: ProviderDeclarationModel["exports"][number]["heritage"] = [],
    members: ProviderDeclarationModel["exports"][number]["members"] = [],
  ): ProviderDeclarationModel["exports"][number] => ({
    id: exportName,
    name: exportName,
    kind: "class",
    sourceTypeFamily: { exportName, typeArgumentCount: 0 },
    heritage,
    members,
  });
  const models = new Map<string, ProviderDeclarationModel>([
    [coreSpecifier, {
      moduleSpecifier: coreSpecifier,
      providerModuleId: "acme.recursive.core",
      imports: [{
        moduleSpecifier: reflectionSpecifier,
        namedImports: [{ exportedName: "Member", localName: "ImportedMember", kind: "value" }],
      }],
      exports: [familyClass("Base", [{
        kind: "extends",
        type: {
          kind: "provider-ref",
          moduleSpecifier: reflectionSpecifier,
          exportName: "Member",
          localName: "ImportedMember",
        },
      }], [{
        id: "Base.BaseValue",
        name: "BaseValue",
        kind: "property",
        readonly: true,
        type: { kind: "number" },
      }])],
    }],
    [reflectionSpecifier, {
      moduleSpecifier: reflectionSpecifier,
      providerModuleId: "acme.recursive.reflection",
      imports: [{
        moduleSpecifier: coreSpecifier,
        namedImports: [{ exportedName: "Base", localName: "ImportedBase", kind: "value" }],
      }],
      exports: [
        familyClass("Root"),
        familyClass("Member", [{
          kind: "extends",
          type: { kind: "provider-ref", moduleSpecifier: reflectionSpecifier, exportName: "Root" },
        }]),
        familyClass("DerivedMember", [{
          kind: "extends",
          type: {
            kind: "provider-ref",
            moduleSpecifier: coreSpecifier,
            exportName: "Base",
            localName: "ImportedBase",
          },
        }]),
      ],
    }],
  ]);
  const pendingRequestedExports = new Map<string, readonly string[]>();
  return {
    identity: {
      id: "acme-recursive-declaration-heritage-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-recursive-declaration-heritage",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-recursive-declaration-heritage-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => models.has(moduleSpecifier) ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier, moduleContext) => {
          const requestedExports = (moduleContext.importSlice?.requestedExports ?? []).map((request) => request.exportedName);
          pendingRequestedExports.set(moduleSpecifier, requestedExports);
          onResolve(
            moduleSpecifier,
            requestedExports,
          );
          const model = models.get(moduleSpecifier)!;
          return {
            kind: "virtual",
            moduleSpecifier,
            virtualFileName: moduleSpecifier === coreSpecifier
              ? "tsts-provider://acme/recursive-core"
              : "tsts-provider://acme/recursive-reflection",
            providerModuleId: model.providerModuleId,
          };
        },
        getDeclarationModel: (resolution) => getRecursiveDeclarationHeritageSlice(
          models.get(resolution.moduleSpecifier)!,
          pendingRequestedExports.get(resolution.moduleSpecifier) ?? [],
        ),
      }), true);
    },
  };
}

function getRecursiveDeclarationHeritageSlice(
  model: ProviderDeclarationModel,
  requestedExports: readonly string[],
): ProviderDeclarationModel {
  if (requestedExports.length === 0) {
    return model;
  }
  const closure = new Set(requestedExports);
  if (requestedExports.includes("Member")) {
    closure.add("Root");
    closure.add("DerivedMember");
  }
  const exports = model.exports.filter((declaration) => closure.has(declaration.sourceTypeFamily?.exportName ?? declaration.exportName ?? declaration.name));
  return { ...model, exports };
}

function providerGenericMemberChainExtension(): CompilerExtension {
  let pendingExports: readonly string[] = [];
  return {
    identity: {
      id: "acme-provider-generic-member-chain-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-provider-generic-member-chain",
    },
    initialize(context): void {
      assert.equal(context.registerTargetSemanticProvider({
        identity: {
          id: "acme-provider-generic-member-chain-semantic",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "semantic",
        },
        mapCheckedCall: (request, observationContext) => {
          const compiler = observationContext.compiler;
          if (compiler !== undefined) {
            for (const argument of request.arguments) {
              const node = argument !== null && typeof argument === "object" && "Kind" in argument
                ? argument as GoPtr<Node>
                : undefined;
              if (node !== undefined) {
                compiler.checker.getTypeAtLocation(node, { sourceFile: compiler.ast.getSourceFile(node) });
                if (node.Kind === KindPropertyAccessExpression) {
                  compiler.checker.getResolvedSymbol(Node_Name(node), { sourceFile: compiler.ast.getSourceFile(node) });
                }
              }
            }
          }
          return acceptObservation({
            selectedSignature: {
              member: {
                id: "Acme.Generic.Call",
                sourceName: "call",
                targetName: "Call",
                kind: "method",
                parameters: [],
              },
            },
          });
        },
      }), true);
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-provider-generic-member-chain",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === "@acme/public/collections.js" ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier, moduleContext) => {
          pendingExports = (moduleContext.importSlice?.requestedExports ?? [])
            .map((request) => request.exportedName)
            .sort();
          return {
            kind: "virtual",
            moduleSpecifier,
            virtualFileName: "tsts-provider://acme/public-collections",
            providerModuleId: "acme.public.Collections",
            packageName: "@acme/public",
            packageVersion: "1.0.0",
          };
        },
        getDeclarationModel: (resolution) => {
          const exportNames = new Set(pendingExports.length === 0
            ? ["Dictionary", "Dictionary_ValueCollection", "Dictionary_ValueCollection_Enumerator", "List"]
            : pendingExports);
          if (exportNames.has("Dictionary")) {
            exportNames.add("Dictionary_ValueCollection");
          }
          if (exportNames.has("Dictionary") || exportNames.has("Dictionary_ValueCollection")) {
            exportNames.add("Dictionary_ValueCollection_Enumerator");
          }
          const exports = [];
          if (exportNames.has("List")) {
            exports.push({
              id: "List",
              name: "List",
              kind: "class" as const,
              typeParameters: [{ name: "T" }],
              members: [{
                id: "List.Add",
                name: "Add",
                kind: "method" as const,
                signatures: [{
                  id: "List.Add(T)",
                  parameters: [{ name: "value", type: { kind: "type-parameter" as const, name: "T" } }],
                  returnType: { kind: "void" as const },
                }],
              }],
            });
          }
          if (exportNames.has("Dictionary")) {
            exports.push({
              id: "Dictionary",
              name: "Dictionary",
              kind: "class" as const,
              typeParameters: [{ name: "TKey" }, { name: "TValue" }],
              members: [{
                id: "Dictionary.Values",
                name: "Values",
                kind: "property" as const,
                readonly: true,
                type: {
                  kind: "provider-ref" as const,
                  moduleSpecifier: resolution.moduleSpecifier,
                  exportName: "Dictionary_ValueCollection",
                  typeArguments: [{ kind: "type-parameter" as const, name: "TKey" }, { kind: "type-parameter" as const, name: "TValue" }],
                },
              }],
            });
          }
          if (exportNames.has("Dictionary_ValueCollection")) {
            exports.push({
              id: "Dictionary_ValueCollection",
              name: "Dictionary_ValueCollection",
              kind: "class" as const,
              typeParameters: [{ name: "TKey" }, { name: "TValue" }],
              members: [{
                id: "Dictionary_ValueCollection.GetEnumerator",
                name: "GetEnumerator",
                kind: "method" as const,
                signatures: [{
                  id: "Dictionary_ValueCollection.GetEnumerator()",
                  parameters: [],
                  returnType: {
                    kind: "provider-ref" as const,
                    moduleSpecifier: resolution.moduleSpecifier,
                    exportName: "Dictionary_ValueCollection_Enumerator",
                    typeArguments: [{ kind: "type-parameter" as const, name: "TKey" }, { kind: "type-parameter" as const, name: "TValue" }],
                  },
                }],
              }],
            });
          }
          if (exportNames.has("Dictionary_ValueCollection_Enumerator")) {
            exports.push({
              id: "Dictionary_ValueCollection_Enumerator",
              name: "Dictionary_ValueCollection_Enumerator",
              kind: "class" as const,
              typeParameters: [{ name: "TKey" }, { name: "TValue" }],
              members: [{
                id: "Dictionary_ValueCollection_Enumerator.Current",
                name: "Current",
                kind: "property" as const,
                readonly: true,
                type: { kind: "type-parameter" as const, name: "TValue" },
              }],
            });
          }
          return {
            moduleSpecifier: resolution.moduleSpecifier,
            providerModuleId: resolution.providerModuleId,
            exports,
          };
        },
      }), true);
    },
  };
}

function sameModuleSliceProviderExtension(requestedSlices: string[][]): CompilerExtension {
  let pendingExports: readonly string[] = [];
  return {
    identity: {
      id: "acme-same-module-slice-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-same-module-slice-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-same-module-slice-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === "@acme/native/mod.js" ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier, moduleContext) => {
          pendingExports = (moduleContext.importSlice?.requestedExports ?? [])
            .map((request) => request.exportedName)
            .sort();
          requestedSlices.push([...pendingExports]);
          return {
            kind: "virtual",
            moduleSpecifier,
            virtualFileName: "tsts-provider://acme/native-mod",
            providerModuleId: "acme.native.mod",
            packageName: "@acme/native",
            packageVersion: "1.0.0",
          };
        },
        getDeclarationModel: (resolution) => {
          const exports = pendingExports.length === 0 ? ["A", "B", "C"] : pendingExports;
          return {
            moduleSpecifier: resolution.moduleSpecifier,
            providerModuleId: resolution.providerModuleId,
            exports: exports.map((exportName) => ({
              id: exportName,
              name: exportName,
              kind: "interface" as const,
              members: [],
            })),
          };
        },
      }), true);
    },
  };
}

function restFunctionArrayProviderExtension(): CompilerExtension {
  return {
    identity: {
      id: "acme-rest-function-array-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-rest-function-array-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-rest-function-array-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === "@acme/native/parallel.js" ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier) => ({
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: "tsts-provider://acme/native-parallel",
          providerModuleId: "acme.native.parallel",
          packageName: "@acme/native",
          packageVersion: "1.0.0",
        }),
        getDeclarationModel: (resolution) => ({
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [{
            id: "Parallel",
            name: "Parallel",
            kind: "class",
            members: [{
              id: "Parallel.Invoke",
              name: "Invoke",
              kind: "method",
              static: true,
              signatures: [{
                id: "Parallel.Invoke(Action[])",
                parameters: [{
                  name: "actions",
                  rest: true,
                  type: {
                    kind: "array",
                    elementType: {
                      kind: "function",
                      parameters: [],
                      returnType: { kind: "void" },
                    },
                  },
                }],
                returnType: { kind: "void" },
              }],
            }],
          }],
        }),
      }), true);
    },
  };
}

function taskTypeFamilyProviderExtension(): CompilerExtension {
  return {
    identity: {
      id: "acme-task-type-family-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-task-type-family-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-task-type-family-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === "@acme/native/tasks.js" ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier) => ({
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: "tsts-provider://acme/native-tasks",
          providerModuleId: "acme.native.tasks",
          packageName: "@acme/native",
          packageVersion: "1.0.0",
        }),
        getDeclarationModel: (resolution) => ({
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [{
            id: "Task",
            name: "Task",
            kind: "class",
            sourceTypeFamily: {
              exportName: "Task",
              typeArgumentCount: 0,
            },
            targetIdentity: {
              target: "acme",
              id: "Acme.Threading.Tasks.Task",
              displayName: "Acme.Threading.Tasks.Task",
            },
            members: [{
              id: "Task.Wait",
              name: "Wait",
              kind: "method",
              signatures: [{
                id: "Task.Wait()",
                parameters: [],
                returnType: { kind: "void" },
              }],
            }],
          }, {
            id: "Task_1",
            name: "Task_1",
            kind: "class",
            sourceTypeFamily: {
              exportName: "Task",
              typeArgumentCount: 1,
            },
            typeParameters: [{ name: "TResult" }],
            heritage: [{
              kind: "extends",
              type: {
                kind: "provider-ref",
                moduleSpecifier: "@acme/native/tasks.js",
                exportName: "Task",
              },
            }],
            targetIdentity: {
              target: "acme",
              id: "Acme.Threading.Tasks.Task`1",
              displayName: "Acme.Threading.Tasks.Task<TResult>",
            },
            members: [{
              id: "Task_1.Result",
              name: "Result",
              kind: "property",
              readonly: true,
              type: { kind: "type-parameter", name: "TResult" },
            }, {
              id: "Task_1.Duplicate",
              name: "Duplicate",
              kind: "property",
              readonly: true,
              type: {
                kind: "provider-ref",
                moduleSpecifier: "@acme/native/tasks.js",
                exportName: "Task_1",
                typeArguments: [{ kind: "type-parameter", name: "TResult" }],
              },
            }, {
              id: "Task_1.Wait",
              name: "Wait",
              kind: "method",
              signatures: [{
                id: "Task_1.Wait()",
                parameters: [],
                returnType: { kind: "void" },
              }],
            }],
          }],
        }),
      }), true);
    },
  };
}

function enumProviderExtension(): CompilerExtension {
  return {
    identity: {
      id: "acme-enum-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-enum-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-enum-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === "@acme/native/enums.js" ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier) => ({
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: "tsts-provider://acme/Native.Enums",
          providerModuleId: "acme.native.enums",
        }),
        getDeclarationModel: (resolution) => ({
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [{
            id: "NativeEnum",
            name: "NativeEnum",
            kind: "enum",
            targetIdentity: {
              target: "acme",
              id: "Acme.NativeEnum",
              displayName: "Acme.NativeEnum",
            },
            members: [{
              id: "Acme.NativeEnum.memberA",
              name: "memberA",
              kind: "field",
            }, {
              id: "Acme.NativeEnum.memberB",
              name: "memberB",
              kind: "field",
            }],
          }],
        }),
      }), true);
    },
  };
}

function namespaceProviderExtension(): CompilerExtension {
  return {
    identity: {
      id: "acme-namespace-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-namespace-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider({
        identity: {
          id: "acme-namespace-provider",
          version: "1.0.0",
          target: "acme",
          extensionContractVersion: TstsProviderContractVersion,
          providerKind: "binding",
        },
        ownsModule: (moduleSpecifier) => moduleSpecifier === "@acme/native/namespace.js" ? { kind: "owned" } : { kind: "unowned" },
        resolveModule: (moduleSpecifier) => ({
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: "tsts-provider://acme/Native.Namespace",
          providerModuleId: "acme.native.namespace",
        }),
        getDeclarationModel: (resolution) => ({
          moduleSpecifier: resolution.moduleSpecifier,
          providerModuleId: resolution.providerModuleId,
          exports: [{
            id: "NativeNamespace",
            name: "NativeNamespace",
            kind: "namespace",
            members: [{
              id: "Acme.NativeNamespace.value",
              name: "value",
              kind: "field",
              type: { kind: "number" },
            }, {
              id: "Acme.NativeNamespace.compute",
              name: "compute",
              kind: "method",
              signatures: [{
                id: "Acme.NativeNamespace.compute()",
                parameters: [],
                returnType: { kind: "number" },
              }],
            }],
          }],
        }),
      }), true);
    },
  };
}

function acmeProviderExtension(observedSlices: Map<string, ProviderImportSlice | undefined>): CompilerExtension {
  return {
    identity: {
      id: "acme-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "acme-provider",
    },
    initialize(context): void {
      assert.equal(context.registerTargetBindingProvider(acmeBindingProvider(observedSlices)), true);
    },
  };
}

function acmeBindingProvider(observedSlices: Map<string, ProviderImportSlice | undefined>): TargetBindingProvider {
  return {
    identity: {
      id: "acme-provider",
      version: "1.0.0",
      target: "acme-native",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "binding",
    },
    ownsModule: (moduleSpecifier) => moduleSpecifier.startsWith("@acme/provider/") ? { kind: "owned" } : { kind: "unowned" },
    resolveModule: (moduleSpecifier, context) => {
      observedSlices.set(moduleSpecifier, context.importSlice);
      const moduleId = moduleSpecifier.slice("@acme/provider/".length).replace(/\.js$/, "");
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: `tsts-provider://acme/${moduleId}`,
        providerModuleId: `acme.${moduleId}`,
      };
    },
    getDeclarationModel: (resolution) => ({
      moduleSpecifier: resolution.moduleSpecifier,
      providerModuleId: resolution.providerModuleId,
      exports: [{
        id: "Foo",
        name: "Foo",
        kind: "class",
        members: [],
      }, {
        id: "Bar",
        name: "Bar",
        kind: "interface",
        members: [],
      }, {
        id: "SideEffect",
        name: "SideEffect",
        kind: "value",
        type: { kind: "number" },
      }],
    }),
  };
}

function semanticProvider(selectedSignature: SelectedTargetSignatureFact): TargetSemanticProvider {
  return {
    identity: {
      id: "acme-semantic-provider",
      version: "1.0.0",
      target: "acme",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "semantic",
    },
    mapCheckedCall: () => acceptObservation({
      selectedSignature,
      returnType: semanticSubject("bool"),
    }),
  };
}

function genericInferenceSemanticProvider(onTargetTypeArguments?: (request: TargetTypeArgumentMappingRequest) => void): TargetSemanticProvider {
  return {
    identity: {
      id: "acme-generic-inference-semantic-provider",
      version: "1.0.0",
      target: "acme",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "semantic",
    },
    mapCheckedCall: () => acceptObservation({
      selectedSignature: {
        member: {
          id: "Acme.Convert.ChangeType<T>(Acme.Int32)",
          sourceName: "convert",
          targetName: "ChangeType",
          kind: "method",
          parameters: [{
            name: "value",
            type: { kind: "source-primitive", name: "int32" },
            passingMode: "by-value",
          }],
          typeParameters: [{ name: "T" }],
          overloadGroup: "Acme.Convert.ChangeType",
        },
      },
      returnType: semanticSubject("T"),
    }),
    mapInferredSourceTypeArgumentsToTarget: (request) => {
      onTargetTypeArguments?.(request);
      return acceptObservation({
        targetTypeArguments: [{ kind: "source-primitive", name: "int32" }],
      });
    },
  };
}

function sourceTypeArgumentSemanticProvider(onCall: (request: CheckedCallMappingRequest, context: ExtensionObservationContext<typeof ExtensionObservationPoint.mapCheckedCall>) => void): TargetSemanticProvider {
  return {
    identity: {
      id: "acme-source-type-arguments-semantic-provider",
      version: "1.0.0",
      target: "acme",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "semantic",
    },
    mapCheckedCall: (request, context) => {
      onCall(request, context);
      return acceptObservation({
        selectedSignature: {
          member: {
            id: "Acme.Generic.Id<T>(T)",
            sourceName: "id",
            targetName: "Id",
            kind: "method",
            parameters: [{
              name: "value",
              type: { kind: "type-parameter", name: "T" },
              passingMode: "by-value",
            }],
            returnType: { kind: "type-parameter", name: "T" },
            typeParameters: [{ name: "T" }],
            overloadGroup: "Acme.Generic.Id",
          },
        },
      });
    },
  };
}

function contextualSemanticProvider(): TargetSemanticProvider {
  return {
    identity: {
      id: "acme-contextual-semantic-provider",
      version: "1.0.0",
      target: "acme",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "semantic",
    },
    recordContextualTargetType: (request) => acceptObservation({
      type: request.context,
      targetType: {
        kind: "target-named",
        id: "Acme.Func`2",
        typeArguments: [
          { kind: "source-primitive", name: "int32" },
          { kind: "source-primitive", name: "int32" },
        ],
      },
    }),
  };
}

function deferredSemanticProvider(): TargetSemanticProvider {
  return {
    identity: {
      id: "acme-deferred-semantic-provider",
      version: "1.0.0",
      target: "acme",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "semantic",
    },
    mapCheckedCall: () => deferObservation,
  };
}

function parameterModeSemanticProvider(selectedSignature: SelectedTargetSignatureFact, onParameterPassing?: (request: ParameterPassingRequest) => void): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("acme-parameter-mode-semantic-provider"),
    mapCheckedCall: () => acceptObservation({
      selectedSignature,
      returnType: semanticSubject("bool"),
    }),
    resolveParameterPassing: (request) => {
      onParameterPassing?.(request);
      return acceptObservation({
        passing: {
          mode: "byref-readonly",
          ...(request.argument !== undefined ? { targetExpression: request.argument } : {}),
        },
      });
    },
  };
}

function parameterModeSequenceSemanticProvider(selectedSignature: SelectedTargetSignatureFact): TargetSemanticProvider {
  let parameterIndex = 0;
  return {
    identity: semanticProviderIdentity("acme-parameter-mode-sequence-semantic-provider"),
    mapCheckedCall: () => acceptObservation({
      selectedSignature,
      returnType: semanticSubject("void"),
    }),
    resolveParameterPassing: (request) => {
      const mode = parameterIndex === 0 ? "by-value" : "byref-readonly";
      parameterIndex += 1;
      return acceptObservation({
        passing: {
          mode,
          ...(request.argument !== undefined ? { targetExpression: request.argument } : {}),
        },
      });
    },
  };
}

function carrierConversionSemanticProvider(
  onConversion?: (request: CheckedConversionMappingRequest) => void,
  onRuntimeCarrier?: (request: RuntimeCarrierFactRequest) => void,
): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("acme-carrier-conversion-semantic-provider"),
    mapCheckedCall: () => acceptObservation({
      selectedSignature: {
        member: byteConversionTargetMember(),
      },
      returnType: semanticSubject("number"),
    }),
    mapCheckedConversion: (request) => {
      onConversion?.(request);
      return acceptObservation({
        convertedType: { kind: "target-named", id: "Acme.Byte" },
        operation: targetOperation("Acme.Convert.ToByte", "method", "number"),
      });
    },
    resolveRuntimeCarrier: (request) => {
      onRuntimeCarrier?.(request);
      return acceptObservation({
        carrier: { kind: "target-named", id: "Acme.Buffers.SearchValues`1" },
        requiresAllocation: false,
        provenance: {
          providerDeclaration: providerDeclarationIdentity("acme-carrier-provider", "acme-native", "acme.runtime", "SearchValues"),
        },
      });
    },
  };
}

function compositeAcmeProvider(): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("acme-composite-semantic-provider"),
    validateTargetConstraint: (request, context) => constraintSemanticProvider().validateTargetConstraint!(request, context),
    mapCheckedCall: () => acceptObservation({
      selectedSignature: selectedSearchValuesContainsSignature(),
      returnType: semanticSubject("bool"),
    }),
    mapInferredSourceTypeArgumentsToTarget: () => acceptObservation({
      targetTypeArguments: [{ kind: "source-primitive", name: "int32" }],
    }),
    resolveParameterPassing: (request) => acceptObservation({
      passing: {
        mode: "byref-readonly",
        ...(request.argument !== undefined ? { targetExpression: request.argument } : {}),
      },
    }),
    mapCheckedConversion: () => acceptObservation({
      convertedType: { kind: "target-named", id: "Acme.Int32" },
      operation: targetOperation("Acme.Int32.Identity", "method", "int32"),
    }),
    resolveRuntimeCarrier: () => acceptObservation({
      carrier: { kind: "target-named", id: "Acme.Buffers.SearchValues`1" },
      requiresAllocation: false,
    }),
  };
}

function borrowFlowSemanticProvider(): TargetSemanticProvider {
  return {
    identity: {
      id: "borrow-flow-semantic-provider",
      version: "1.0.0",
      target: "borrow",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "semantic",
    },
    validateExtensionFlowUse: (request, context) => {
      const state = context.facts.get(request.symbol, flowStateFactKey);
      if (state?.state !== "moved") {
        return acceptObservation({ valid: true });
      }
      return rejectObservation({
        extensionId: context.extensionId,
        extensionCode: "BORROW_MOVED_VALUE",
        numericCode: 9920301,
        publicCode: "BORROW0301",
        category: "error",
        message: "The value was moved and cannot be used here.",
        nodeOrSpan: request.useSite,
        evidence: [{ message: "Source-core move marker", details: state }],
        identity: `borrow-moved-value:${String((request.useSite as GoPtr<Node>)?.id ?? "unknown")}`,
      });
    },
  };
}

function borrowAssignabilityProvider(): TargetSemanticProvider {
  return {
    identity: {
      id: "borrow-assignability-semantic-provider",
      version: "1.0.0",
      target: "borrow",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "semantic",
    },
    observePostCheckAssignability: (request, context) => {
      const state = context.facts.get(request.expression, flowStateFactKey);
      if (state?.state !== "moved") {
        return acceptObservation(undefined);
      }
      return rejectObservation({
        extensionId: context.extensionId,
        extensionCode: "BORROW_MOVED_ASSIGNMENT",
        numericCode: 9920401,
        publicCode: "BORROW0401",
        category: "error",
        message: "A moved expression cannot be assigned into target storage without target validation.",
        nodeOrSpan: request.expression,
        evidence: [{ message: "Source-core move marker", details: state }],
        identity: `borrow-moved-assignment:${String((request.expression as GoPtr<Node>)?.id ?? "unknown")}`,
      });
    },
  };
}

function surfaceSemanticProvider(): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("acme-surface-semantic-provider"),
    mapCheckedPropertyAccess: () => acceptObservation({
      operation: targetOperation("Acme.String.Length", "property", "int32"),
      resultType: targetResultType("int32"),
      provenance: {
        providerDeclaration: providerDeclarationIdentity("acme-property-provider", "acme-native", "acme.string", "length"),
      },
    }),
    mapCheckedElementAccess: () => acceptObservation({
      operation: targetOperation("Acme.ReadOnlySpan.GetItem", "indexer", "char"),
      resultType: targetResultType("char"),
    }),
    mapCheckedOperator: () => acceptObservation({
      operation: targetOperation("Acme.Int32.op_Addition", "operator", "int32"),
      resultType: targetResultType("int32"),
    }),
  };
}

function deferredSurfaceSemanticProvider(): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("acme-deferred-surface-semantic-provider"),
    mapCheckedPropertyAccess: () => deferObservation,
    mapCheckedElementAccess: () => deferObservation,
    mapCheckedOperator: () => deferObservation,
  };
}

function rejectingCallSemanticProvider(): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("acme-rejecting-call-semantic-provider"),
    mapCheckedCall: (request: CheckedCallMappingRequest) => ({
      kind: "reject",
      diagnostic: {
        extensionId: "acme-rejecting-call-semantic-provider",
        extensionCode: "ACME_BYTE_RANGE",
        numericCode: 9910125,
        publicCode: "ACME0125",
        category: "error",
        message: "Numeric literal 300 does not fit in Acme.Byte.",
        nodeOrSpan: request.call,
        evidence: [{ message: "Target range", details: "Acme.Byte accepts 0..255." }],
        identity: "acme-byte-range:/src/index.ts:toByte",
      },
    }),
  };
}

function sourceSpanRejectingCallProvider(): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("acme-source-span-rejecting-call-provider"),
    mapCheckedCall: (request: CheckedCallMappingRequest) => {
      const call = request.call as GoPtr<Node>;
      return rejectObservation({
        extensionId: "acme-source-span-rejecting-call-provider",
        extensionCode: "ACME_PIN_REQUIRES_FIXED",
        numericCode: 9910126,
        publicCode: "ACME0126",
        category: "error",
        message: "The target pin operation requires a fixed storage location.",
        nodeOrSpan: {
          sourceFile: GetSourceFileOfNode(call),
          pos: Node_Pos(call),
          end: Node_End(call),
        },
        evidence: [{ message: "Target rule", details: "pin(value) must be proven fixed before lowering." }],
        identity: "acme-pin-requires-fixed:/src/index.ts",
      });
    },
  };
}

function rejectingNativeArrayPushProvider(): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("acme-native-array-surface-provider"),
    mapCheckedCall: (request: CheckedCallMappingRequest) => rejectObservation({
      extensionId: "acme-native-array-surface-provider",
      extensionCode: "ACME_NATIVE_ARRAY_PUSH",
      numericCode: 9910301,
      publicCode: "ACME0301",
      category: "error",
      message: "The active native-array surface does not support push; use a provider-supported collection surface.",
      nodeOrSpan: request.call,
      evidence: [{ message: "Surface capability", details: "native arrays expose fixed-size element access, not mutable push." }],
      identity: "acme-native-array-push:/src/index.ts",
    }),
  };
}

function borrowVecSurfaceProvider(): TargetSemanticProvider {
  return {
    identity: {
      id: "borrow-vec-surface-provider",
      version: "1.0.0",
      target: "borrow",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "semantic",
    },
    mapCheckedCall: () => acceptObservation({
      selectedSignature: {
        member: {
          id: "alloc.vec.Vec.push(i32)",
          sourceName: "push",
          targetName: "push",
          kind: "method",
          parameters: [{
            name: "value",
            type: { kind: "source-primitive", name: "int32" },
            passingMode: "move",
          }],
          overloadGroup: "Vec.push",
        },
      },
      returnType: semanticSubject("void"),
    }),
  };
}

function constraintSemanticProvider(): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("acme-constraint-semantic-provider"),
    validateTargetConstraint: (request, context) => {
      const primitive = getSourcePrimitiveForConstraintArgument(request.source, context);
      if (request.constraint.kind === "implements" && request.constraint.contract === "Acme.IEquatable`1" && primitive?.kind === "int32") {
        return acceptObservation(true, [{ message: "Source primitive int32 maps to Acme.Int32, which implements Acme.IEquatable<Acme.Int32>." }]);
      }
      return rejectTargetConstraint(request, context);
    },
  };
}

function rejectTargetConstraint(request: TargetConstraintValidationRequest, context: ExtensionObservationContext) {
  return {
    kind: "reject" as const,
    diagnostic: {
      extensionId: context.extensionId,
      extensionCode: "ACME_CONSTRAINT",
      numericCode: 9910201,
      publicCode: "ACME0201",
      category: "error" as const,
      message: "Target type argument must implement Acme.IEquatable`1.",
      nodeOrSpan: request.source,
      evidence: [{ message: "Provider target constraint", details: request.constraint }],
      identity: getConstraintDiagnosticIdentity(request.source),
    },
  };
}

function getConstraintDiagnosticIdentity(source: ExtensionFactSubject): string {
  if (source !== null && source !== undefined && typeof source === "object") {
    const node = source as GoPtr<Node>;
    return `acme-constraint:${String(node?.id ?? "unknown")}`;
  }
  return `acme-constraint:${typeof source}:${String(source)}`;
}

function getSourcePrimitiveForConstraintArgument(source: ExtensionFactSubject, context: ExtensionObservationContext): SourcePrimitiveFact | undefined {
  if (source === null || source === undefined || typeof source !== "object") {
    return undefined;
  }
  const node = source as GoPtr<Node>;
  if (node === undefined) {
    return undefined;
  }
  const direct = context.factResolver.resolve(node, sourcePrimitiveFactKey);
  if (direct !== undefined) {
    return direct;
  }
  const typeName = node.Kind === KindTypeReference ? AsTypeReferenceNode(node)?.TypeName : node;
  const symbol = Node_Symbol(typeName);
  return symbol === undefined ? undefined : context.factResolver.resolve(symbol, sourcePrimitiveFactKey);
}

function semanticProviderIdentity(id: string) {
  return {
    id,
    version: "1.0.0",
    target: "acme",
    extensionContractVersion: TstsProviderContractVersion,
    providerKind: "semantic" as const,
  };
}

function semanticSubject(name: string): object {
  const existing = semanticSubjects.get(name);
  if (existing !== undefined) {
    return existing;
  }
  const created = Object.freeze({ name });
  semanticSubjects.set(name, created);
  return created;
}

const semanticSubjects = new Map<string, object>();

function assertSelectedMemberEvidence(request: CheckedPropertyAccessMappingRequest | undefined, name: string): void {
  assert.ok(request !== undefined);
  const selectedSymbol = request.sourceSelectedSymbol as GoPtr<Symbol>;
  const selectedDeclaration = request.sourceSelectedDeclaration as GoPtr<Node>;
  assert.equal(selectedSymbol?.Name, name);
  assert.ok(selectedDeclaration !== undefined);
  assert.equal(selectedDeclaration, selectedSymbol?.ValueDeclaration);
  assert.equal(Node_Text(Node_Name(selectedDeclaration)), name);
}

function assertSelectedIndexEvidence(request: CheckedElementAccessMappingRequest | undefined): void {
  assert.ok(request !== undefined);
  const selectedSymbol = request.sourceSelectedSymbol as GoPtr<Symbol>;
  const selectedDeclaration = request.sourceSelectedDeclaration as GoPtr<Node>;
  assert.ok(selectedSymbol !== undefined);
  assert.equal(selectedSymbol?.ValueDeclaration, selectedDeclaration);
  assert.ok(selectedDeclaration !== undefined);
  assert.equal(selectedDeclaration.Kind, KindIndexSignature);
}

function assertSelectedMappedIndexEvidence(request: CheckedElementAccessMappingRequest | undefined): void {
  assert.ok(request !== undefined);
  const selectedSymbol = request.sourceSelectedSymbol as GoPtr<Symbol>;
  const selectedDeclaration = request.sourceSelectedDeclaration as GoPtr<Node>;
  assert.ok(selectedSymbol !== undefined);
  assert.equal(selectedSymbol?.ValueDeclaration, selectedDeclaration);
  assert.ok(selectedDeclaration !== undefined);
  assert.equal(selectedDeclaration.Kind, KindMappedType);
}

function providerDeclarationIdentity(providerId: string, _providerTarget: string, providerModuleId: string, exportName: string, signatureId?: string) {
  return {
    providerId,
    providerModuleId,
    moduleSpecifier: `@acme/provider/${providerModuleId}.js`,
    exportName,
    ...(signatureId !== undefined ? { signatureId } : {}),
  };
}

function targetOperation(operationId: string, operationKind: TargetOperationFact["operationKind"], resultType?: string | TargetOperationFact["resultType"]): TargetOperationFact {
  return {
    operationId,
    operationKind,
    targetOperation: operationId,
    ...(resultType !== undefined ? { resultType: typeof resultType === "string" ? targetResultType(resultType) : resultType } : {}),
  };
}

function targetResultType(name: string): TargetTypeRef {
  switch (name) {
    case "boolean":
      return { kind: "source-primitive", name: "bool" };
    case "number":
      return { kind: "source-primitive", name: "float64" };
    case "char":
    case "int32":
      return { kind: "source-primitive", name };
    default:
      return { kind: "target-named", id: `Acme.${name}` };
  }
}

function acmeProvider(specifier: string, reject: boolean): TargetBindingProvider {
  const targetIdentity: TargetIdentity = {
    target: "acme",
    id: "Acme.Buffers.SearchValues`1",
    displayName: "Acme.Buffers.SearchValues<T>",
  };
  return {
    identity: {
      id: "acme-provider",
      version: "1.0.0",
      target: "acme",
      extensionContractVersion: TstsProviderContractVersion,
      providerKind: "binding",
    },
    ownsModule(moduleSpecifier) {
      return moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" };
    },
    resolveModule(moduleSpecifier) {
      if (reject) {
        return {
          extensionId: "acme-provider",
          extensionCode: "PROVIDER_REJECTED_MODULE",
          numericCode: 9900001,
          category: "error",
          message: `Rejected ${moduleSpecifier}`,
          identity: `rejected:${moduleSpecifier}`,
        };
      }
      return {
        kind: "virtual",
        moduleSpecifier,
        virtualFileName: "tsts-provider://acme/Acme.Buffers",
        providerModuleId: "Acme.Buffers",
        packageName: "@example/target",
        packageVersion: "1.0.0",
      };
    },
    getDeclarationModel(resolution) {
      return {
        moduleSpecifier: resolution.moduleSpecifier,
        providerModuleId: resolution.providerModuleId,
        exports: [{
          id: "SearchValues",
          name: "SearchValues",
          kind: "class",
          targetIdentity,
          typeParameters: [{
          name: "T",
          constraints: [{
            kind: "target-named",
            target: "acme",
            id: "Acme.IEquatable`1",
            typeArguments: [{ kind: "type-parameter", name: "T" }],
            sourceShape: { kind: "unknown" },
          }],
        }],
          members: [{
            id: "Contains",
            name: "Contains",
            kind: "method",
            signatures: [{
              id: "Contains(T)",
              parameters: [{ name: "value", type: { kind: "type-parameter", name: "T" } }],
              returnType: { kind: "boolean" },
            }],
          }],
        }],
      };
    },
  };
}

function assertCleanProgram(program: GoPtr<Program>, sourceFile: GoPtr<SourceFile>): void {
  const programDiagnostics = Program_GetProgramDiagnostics(program);
  const syntacticDiagnostics = Program_GetSyntacticDiagnostics(program, Background(), sourceFile);
  const semanticDiagnostics = Program_GetSemanticDiagnostics(program, Background(), sourceFile);
  assert.equal(programDiagnostics.length, 0, programDiagnostics.map(Diagnostic_String).join("\n"));
  assert.equal(syntacticDiagnostics.length, 0, syntacticDiagnostics.map(Diagnostic_String).join("\n"));
  assert.equal(semanticDiagnostics.length, 0, semanticDiagnostics.map(Diagnostic_String).join("\n"));
}

function assertCleanProviderVirtualFiles(program: GoPtr<Program>): void {
  for (const file of Program_GetSourceFiles(program)) {
    if (SourceFile_FileName(file).startsWith("tsts-provider://")) {
      assertCleanProgram(program, file);
    }
  }
}

function getPublicProviderSourceFiles(
  program: GoPtr<Program>,
  extensionHost: ExtensionHost,
  moduleSpecifier: string,
): GoPtr<SourceFile>[] {
  return extensionHost.providers.getVirtualDeclarationDocuments()
    .filter((document) => document.moduleSpecifier === moduleSpecifier)
    .map((document) => {
      const file = Program_GetSourceFile(program, document.fileName);
      assert.ok(file !== undefined, `public provider source file ${document.fileName}`);
      return file;
    });
}

function getOnlyPublicProviderSourceFile(
  program: GoPtr<Program>,
  extensionHost: ExtensionHost,
  moduleSpecifier: string,
): GoPtr<SourceFile> {
  const files = getPublicProviderSourceFiles(program, extensionHost, moduleSpecifier);
  assert.equal(files.length, 1, `one public provider source file for ${moduleSpecifier}`);
  return files[0];
}

function getCanonicalProviderExportOwnerFile(
  program: GoPtr<Program>,
  extensionHost: ExtensionHost,
  sourceExportName: string,
  moduleSpecifier?: string,
): GoPtr<SourceFile> {
  const documents = getCanonicalProviderExportOwnerDocuments(extensionHost).filter((document) =>
    (moduleSpecifier === undefined || document.moduleSpecifier === moduleSpecifier)
    && document.declarationModel.exports.some((declaration) =>
      (declaration.sourceTypeFamily?.exportName
        ?? (declaration.exportKind === "default" ? "default" : declaration.exportName ?? declaration.name)) === sourceExportName));
  assert.equal(documents.length, 1, `canonical owner for ${sourceExportName}`);
  const file = Program_GetSourceFile(program, documents[0]!.fileName);
  assert.ok(file !== undefined);
  return file;
}

function getCanonicalProviderExportOwnerDocuments(extensionHost: ExtensionHost): ProviderVirtualDeclarationDocument[] {
  const documents = new Map<string, ProviderVirtualDeclarationDocument>();
  const pending = extensionHost.providers.getVirtualDeclarationDocuments()
    .flatMap((document) => getCanonicalProviderExportOwnerReferences(document.sourceText));
  for (let index = 0; index < pending.length; index++) {
    const fileName = pending[index]!;
    if (documents.has(fileName)) {
      continue;
    }
    const artifact = getProviderVirtualArtifactForCompiler(extensionHost.providers, fileName);
    assert.equal(artifact?.kind, "canonical-export-owner", `canonical owner artifact ${fileName}`);
    if (artifact?.kind !== "canonical-export-owner") {
      continue;
    }
    const document = artifact.document;
    documents.set(fileName, document);
    pending.push(...getCanonicalProviderExportOwnerReferences(document.sourceText));
  }
  return [...documents.values()].sort((left, right) =>
    left.fileName < right.fileName ? -1 : left.fileName > right.fileName ? 1 : 0);
}

function getCanonicalProviderExportOwnerReferences(sourceText: string): string[] {
  return [...sourceText.matchAll(/^[ \t]*(?:import|export)[ \t]+(?:type[ \t]+)?[^"\n;]+[ \t]+from[ \t]+"([^"\n]*\.tsts-export-owner-[^"\n]*\.d\.ts)"[ \t]*;[ \t]*\r?$/gm)]
    .map((match) => match[1]!);
}

function getAliasedProviderExportSymbol(
  program: GoPtr<Program>,
  sourceFile: GoPtr<SourceFile>,
  symbol: NonNullable<GoPtr<Symbol>>,
): NonNullable<GoPtr<Symbol>> {
  const [checker, done] = Program_GetTypeCheckerForFile(program, Background(), sourceFile);
  try {
    const resolved = (symbol.Flags & SymbolFlagsAlias) === 0 ? symbol : Checker_GetAliasedSymbol(checker, symbol);
    assert.ok(resolved !== undefined);
    return resolved;
  } finally {
    done();
  }
}

function findFirstNodeByKind(root: GoPtr<Node>, kind: number): GoPtr<Node> {
  const found = findFirstNodeByKindWorker(root, kind);
  assert.ok(found !== undefined);
  return found;
}

function findNamedNodeByKind(root: GoPtr<Node>, kind: number, name: string): GoPtr<Node> {
  let found: GoPtr<Node>;
  visitNodes(root, (node) => {
    if (found === undefined && node?.Kind === kind && Node_Text(Node_Name(node)) === name) {
      found = node;
    }
  });
  assert.ok(found !== undefined);
  return found;
}

function getFirstCallArgument(callExpression: GoPtr<Node>): GoPtr<Node> {
  const argument = (Node_Arguments(callExpression) ?? [])[0];
  assert.ok(argument !== undefined);
  return argument;
}

function findTypeReferenceByName(root: GoPtr<Node>, name: string): GoPtr<Node> {
  let found: GoPtr<Node>;
  visitNodes(root, (node) => {
    if (found !== undefined || node?.Kind !== KindTypeReference) {
      return;
    }
    const typeName = AsTypeReferenceNode(node)?.TypeName;
    if (Node_Text(typeName) === name) {
      found = node;
    }
  });
  assert.ok(found !== undefined);
  return found;
}

function findTypeReferenceByNameAndArity(root: GoPtr<Node>, name: string, typeArgumentCount: number): GoPtr<Node> {
  let found: GoPtr<Node>;
  visitNodes(root, (node) => {
    if (found !== undefined || node?.Kind !== KindTypeReference) {
      return;
    }
    const typeReference = AsTypeReferenceNode(node);
    if (Node_Text(typeReference?.TypeName) === name && (Node_TypeArguments(node)?.length ?? 0) === typeArgumentCount) {
      found = node;
    }
  });
  assert.ok(found !== undefined);
  return found;
}

function findTypeReferenceByNameAndTypeArgumentKind(root: GoPtr<Node>, name: string, typeArgumentKind: number): GoPtr<Node> {
  let found: GoPtr<Node>;
  visitNodes(root, (node) => {
    if (found !== undefined || node?.Kind !== KindTypeReference) {
      return;
    }
    const typeReference = AsTypeReferenceNode(node);
    const typeArguments = Node_TypeArguments(node) ?? [];
    if (Node_Text(typeReference?.TypeName) === name && typeArguments.length === 1 && typeArguments[0]?.Kind === typeArgumentKind) {
      found = node;
    }
  });
  assert.ok(found !== undefined);
  return found;
}

function findLastIdentifierByText(root: GoPtr<Node>, text: string): GoPtr<Node> {
  let found: GoPtr<Node>;
  visitNodes(root, (node) => {
    if (node?.Kind === KindIdentifier && Node_Text(node) === text) {
      found = node;
    }
  });
  assert.ok(found !== undefined);
  return found;
}

function findFirstNodeByKindWorker(root: GoPtr<Node>, kind: number): GoPtr<Node> {
  if (root === undefined) {
    return undefined;
  }
  if (root.Kind === kind) {
    return root;
  }
  let found: GoPtr<Node>;
  Node_ForEachChild(root, (child) => {
    found = findFirstNodeByKindWorker(child, kind);
    return (found !== undefined) as bool;
  });
  return found;
}

function visitNodes(root: GoPtr<Node>, visit: (node: GoPtr<Node>) => void): void {
  if (root === undefined) {
    return;
  }
  visit(root);
  Node_ForEachChild(root, (child) => {
    visitNodes(child, visit);
    return false as bool;
  });
}

function selectedSearchValuesContainsSignature(): SelectedTargetSignatureFact {
  return {
    member: searchValuesContainsTargetMember(),
  };
}

function byteConversionTargetMember(): TargetMember {
  return {
    id: "ToByte(Acme.Int32)",
    sourceName: "toByte",
    targetName: "ToByte",
    kind: "method",
    parameters: [{
      name: "value",
      type: { kind: "target-named", id: "Acme.Byte" },
      passingMode: "by-value",
    }],
    returnType: { kind: "target-named", id: "Acme.Byte" },
    overloadGroup: "ToByte",
  };
}

function twoParameterTargetMember(): TargetMember {
  return {
    id: "Pair(Acme.Int32,Acme.Int32)",
    sourceName: "pair",
    targetName: "Pair",
    kind: "method",
    parameters: [
      {
        name: "first",
        type: { kind: "target-named", id: "Acme.Int32" },
        passingMode: "by-value",
      },
      {
        name: "second",
        type: { kind: "target-named", id: "Acme.Int32" },
        passingMode: "byref-readonly",
      },
    ],
    overloadGroup: "Pair",
  };
}

function searchValuesContainsTargetMember(passingMode: TargetMember["parameters"][number]["passingMode"] = "by-value"): TargetMember {
  return {
    id: "Contains(T)",
    sourceName: "Contains",
    targetName: "Contains",
    kind: "method",
    parameters: [{
      name: "value",
      type: { kind: "type-parameter", name: "T" },
      passingMode,
    }],
    returnType: { kind: "source-primitive", name: "bool" },
    overloadGroup: "Contains",
  };
}
