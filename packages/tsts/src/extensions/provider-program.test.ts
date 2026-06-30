import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../go/scalars.js";
import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import { SourceFile_FileName, SourceFile_as_ast_HasFileName } from "../internal/ast/ast.js";
import { Node_Arguments, Node_Members, Node_ModifierFlags, Node_Symbol, Node_Text } from "../internal/ast/ast.js";
import { Node_End, Node_ForEachChild, Node_Name, Node_Pos } from "../internal/ast/spine.js";
import { ModifierFlagsStatic } from "../internal/ast/modifierflags.js";
import { GetSourceFileOfNode } from "../internal/ast/utilities.js";
import { Diagnostic_Code, Diagnostic_End, Diagnostic_Pos, Diagnostic_String } from "../internal/ast/diagnostic.js";
import { AsTypeReferenceNode } from "../internal/ast/generated/casts.js";
import { KindArrowFunction, KindBinaryExpression, KindCallExpression, KindElementAccessExpression, KindEnumMember, KindIdentifier, KindNumberKeyword, KindPropertyAccessExpression, KindTypeReference } from "../internal/ast/generated/kinds.js";
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
} from "../internal/compiler/program.js";
import { ResolvedModuleExtensionProviderVirtual, ResolvedModule_IsProviderVirtual } from "../internal/module/types.js";
import type { Program, ProgramOptions } from "../internal/compiler/program.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import { TstsProviderContractVersion, ExtensionHostDiagnosticCode, ExtensionObservationPoint, acceptObservation, argumentPassingFactKey, attachExtensionHost, createExtensionConsumerQueries, createSourceSemanticsExtension, deferObservation, finalizeExtensionSemantics, getExtensionHost, rejectObservation, runtimeCarrierFactKey, sourcePrimitive, sourcePrimitiveFactKey, targetConversionFactKey } from "./index.js";
import { canonicalIdentityFactKey, flowStateFactKey, providerVirtualDeclarationFactKey, selectedTargetSignatureFactKey, targetOperationFactKey, targetBindingFactKey } from "./index.js";
import type { CheckedCallMappingRequest, CompilerExtension, ExtensionFactSubject, ExtensionObservationContext, ProviderImportSlice, SourcePrimitiveFact, SelectedTargetSignatureFact, TargetConstraintValidationRequest, TargetOperationFact, TargetBindingProvider, TargetIdentity, TargetMember, TargetSemanticProvider } from "./index.js";

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
  assert.ok(sourceFileNames.includes("tsts-provider://acme/Acme.Buffers"));

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
  const virtualFile = Program_GetSourceFile(program, "tsts-provider://acme/Acme.Buffers");
  assert.ok(virtualFile !== undefined);
  const virtualModuleSymbol = Node_Symbol(virtualFile as never);
  const searchValuesSymbol = virtualModuleSymbol?.Exports?.get("SearchValues");
  assert.ok(searchValuesSymbol !== undefined);
  const containsSymbol = searchValuesSymbol.Members?.get("Contains");
  assert.ok(containsSymbol !== undefined);

  assert.equal(extended.extensionHost.facts.get(virtualFile, canonicalIdentityFactKey)?.id, "Acme.Buffers");
  assert.equal(extended.extensionHost.facts.get(virtualFile, providerVirtualDeclarationFactKey)?.providerId, "acme-provider");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, canonicalIdentityFactKey)?.exportName, "SearchValues");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, providerVirtualDeclarationFactKey)?.exportName, "SearchValues");
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
  const virtualFile = Program_GetSourceFile(program, "tsts-provider://acme/Acme.Buffers");
  assert.ok(virtualFile !== undefined);
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
  const virtualFile = Program_GetSourceFile(program, "tsts-provider://acme/Acme.Buffer");
  assert.ok(virtualFile !== undefined);
  const bufferSymbol = Node_Symbol(virtualFile as never)?.Exports?.get("Buffer");
  assert.ok(bufferSymbol !== undefined);
  const bufferDeclaration = bufferSymbol.Declarations?.[0];
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
  const virtualFile = Program_GetSourceFile(program, "tsts-provider://acme/Native.Enums");
  assert.ok(virtualFile !== undefined);
  const nativeEnumSymbol = Node_Symbol(virtualFile as never)?.Exports?.get("NativeEnum");
  assert.ok(nativeEnumSymbol !== undefined);
  const memberSymbol = nativeEnumSymbol.Exports?.get("memberA");
  assert.ok(memberSymbol !== undefined);
  const memberDeclaration = findFirstNodeByKind(virtualFile as GoPtr<Node>, KindEnumMember);

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
    extensions: [semanticOnlyExtension("acme-generic-inference-extension", genericInferenceSemanticProvider())],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const call = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  const selectedCall = consumer.getSelectedTargetCall(call);
  assert.equal(selectedCall?.member.id, "Acme.Convert.ChangeType<T>(Acme.Int32)");
  assert.equal(selectedCall?.typeArguments, undefined);
  assert.deepEqual(selectedCall?.targetTypeArguments, [{ kind: "source-primitive", name: "int32" }]);
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
    extensions: [providerExtension("@example/target/Acme.Console.js", false, parameterModeSemanticProvider(selectedSignature))],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const call = findFirstNodeByKind(index, KindCallExpression);
  const argument = getFirstCallArgument(call);
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
    extensions: [providerExtension("@example/target/Acme.Buffers.js", false, carrierConversionSemanticProvider())],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const searchValuesTypeReference = findFirstNodeByKind(index, KindTypeReference);
  const runtimeCarrierFact = extended.extensionHost.facts.get(searchValuesTypeReference, runtimeCarrierFactKey);
  const runtimeCarrier = runtimeCarrierFact?.carrier;
  assert.equal(runtimeCarrier?.kind, "target-named");
  assert.equal(runtimeCarrier?.kind === "target-named" ? runtimeCarrier.id : undefined, "Acme.Buffers.SearchValues`1");
  assert.equal(runtimeCarrierFact?.provenance?.sourceTypeReference, searchValuesTypeReference);
  assert.ok(runtimeCarrierFact?.provenance?.sourceType !== undefined);
  assert.equal(runtimeCarrierFact?.provenance?.providerDeclaration?.providerId, "acme-carrier-provider");

  const call = findFirstNodeByKind(index, KindCallExpression);
  const argument = getFirstCallArgument(call);
  assert.equal(extended.extensionHost.facts.get(argument, targetConversionFactKey)?.convertedType?.kind, "target-named");
  assert.equal(extended.extensionHost.facts.get(argument, targetConversionFactKey)?.operation?.operationId, "Acme.Convert.ToByte");

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getRuntimeCarrierFact(searchValuesTypeReference)?.carrier.kind, "target-named");
  assert.equal(consumer.getTargetConversionFact(argument)?.operation?.targetOperation, "Acme.Convert.ToByte");
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
        getTargetIdentity: () => undefined,
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
        getTargetIdentity: () => undefined,
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
    getTargetIdentity: () => undefined,
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

function genericInferenceSemanticProvider(): TargetSemanticProvider {
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
    mapInferredSourceTypeArgumentsToTarget: () => acceptObservation({
      targetTypeArguments: [{ kind: "source-primitive", name: "int32" }],
    }),
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

function parameterModeSemanticProvider(selectedSignature: SelectedTargetSignatureFact): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("acme-parameter-mode-semantic-provider"),
    mapCheckedCall: () => acceptObservation({
      selectedSignature,
      returnType: semanticSubject("bool"),
    }),
    resolveParameterPassing: (request) => acceptObservation({
      passing: {
        mode: "byref-readonly",
        ...(request.argument !== undefined ? { targetExpression: request.argument } : {}),
      },
    }),
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

function carrierConversionSemanticProvider(): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("acme-carrier-conversion-semantic-provider"),
    mapCheckedCall: () => acceptObservation({
      selectedSignature: {
        member: byteConversionTargetMember(),
      },
      returnType: semanticSubject("number"),
    }),
    mapCheckedConversion: () => acceptObservation({
      convertedType: { kind: "target-named", id: "Acme.Byte" },
      operation: targetOperation("Acme.Convert.ToByte", "method", "number"),
    }),
    resolveRuntimeCarrier: () => acceptObservation({
      carrier: { kind: "target-named", id: "Acme.Buffers.SearchValues`1" },
      requiresAllocation: false,
      provenance: {
        providerDeclaration: providerDeclarationIdentity("acme-carrier-provider", "acme-native", "acme.runtime", "SearchValues"),
      },
    }),
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
      resultType: semanticSubject("int32"),
      provenance: {
        providerDeclaration: providerDeclarationIdentity("acme-property-provider", "acme-native", "acme.string", "length"),
      },
    }),
    mapCheckedElementAccess: () => acceptObservation({
      operation: targetOperation("Acme.ReadOnlySpan.GetItem", "indexer", "char"),
      resultType: semanticSubject("char"),
    }),
    mapCheckedOperator: () => acceptObservation({
      operation: targetOperation("Acme.Int32.op_Addition", "operator", "int32"),
      resultType: semanticSubject("int32"),
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

function providerDeclarationIdentity(providerId: string, _providerTarget: string, providerModuleId: string, exportName: string, signatureId?: string) {
  return {
    providerId,
    providerModuleId,
    moduleSpecifier: `@acme/provider/${providerModuleId}.js`,
    exportName,
    ...(signatureId !== undefined ? { signatureId } : {}),
  };
}

function targetOperation(operationId: string, operationKind: TargetOperationFact["operationKind"], resultType: string | TargetOperationFact["resultType"]): TargetOperationFact {
  return {
    operationId,
    operationKind,
    targetOperation: operationId,
    ...(resultType !== undefined ? { resultType: typeof resultType === "string" ? semanticSubject(resultType) : resultType } : {}),
  };
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
    getTargetIdentity(symbol) {
      return symbol.moduleSpecifier === specifier && symbol.exportName === "SearchValues" ? targetIdentity : undefined;
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

function findFirstNodeByKind(root: GoPtr<Node>, kind: number): GoPtr<Node> {
  const found = findFirstNodeByKindWorker(root, kind);
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
