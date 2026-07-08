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
import { GetSourceFileOfNode } from "../internal/ast/utilities.js";
import { Diagnostic_Code, Diagnostic_End, Diagnostic_Pos, Diagnostic_String } from "../internal/ast/diagnostic.js";
import { AsTypeReferenceNode } from "../internal/ast/generated/casts.js";
import { KindArrowFunction, KindBinaryExpression, KindCallExpression, KindElementAccessExpression, KindEnumMember, KindFunctionDeclaration, KindIdentifier, KindIndexSignature, KindMappedType, KindNumberKeyword, KindPropertyAccessExpression, KindTypeReference, KindVariableDeclaration } from "../internal/ast/generated/kinds.js";
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
} from "../internal/compiler/program.js";
import { ResolvedModuleExtensionProviderVirtual, ResolvedModule_IsProviderVirtual } from "../internal/module/types.js";
import type { Program, ProgramOptions } from "../internal/compiler/program.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import { TstsProviderContractVersion, ExtensionHostDiagnosticCode, ExtensionObservationPoint, acceptObservation, argumentPassingFactKey, attachExtensionHost, createExtensionConsumerQueries, createSourceSemanticsExtension, deferObservation, finalizeExtensionSemantics, getExtensionHost, rejectObservation, runtimeCarrierFactKey, sourcePrimitive, sourcePrimitiveFactKey, targetConversionFactKey } from "./index.js";
import { canonicalIdentityFactKey, flowStateFactKey, instantiatedTargetTypeFactKey, providerTypeFamilyFactKey, providerVirtualDeclarationFactKey, selectedTargetSignatureFactKey, targetOperationFactKey, targetBindingFactKey } from "./index.js";
import type { ArgumentPassingMode, CheckedCallMappingRequest, CheckedElementAccessMappingRequest, CheckedIterationMappingRequest, CheckedOperatorMappingRequest, CheckedPropertyAccessMappingRequest, CompilerExtension, ExtensionFactSubject, ExtensionObservationContext, ProviderImportSlice, SourcePrimitiveFact, SelectedTargetSignatureFact, SourceSelectedMethodTypeArgument, TargetConstraintValidationRequest, TargetOperationFact, TargetBindingProvider, TargetIdentity, TargetMember, TargetSemanticProvider } from "./index.js";

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
  const virtualFile = Program_GetSourceFile(program, "tsts-provider://acme/Native.Calls");
  assert.ok(virtualFile !== undefined);
  const virtualText = SourceFile_Text(virtualFile);
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
  const virtualFile = Program_GetSourceFile(program, "tsts-provider://acme/Dual.Member");
  assert.ok(virtualFile !== undefined);
  const dualMemberSymbol = Node_Symbol(virtualFile as never)?.Exports?.get("DualMember");
  assert.ok(dualMemberSymbol !== undefined);
  const dualMemberDeclaration = dualMemberSymbol.Declarations?.[0];
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
  assert.equal(extended.extensionHost.facts.get(dualMemberSymbol.Exports?.get("Equals"), providerVirtualDeclarationFactKey)?.memberId, "DualMember.Equals#static");
  assert.equal(extended.extensionHost.facts.get(dualMemberSymbol.Members?.get("Equals"), providerVirtualDeclarationFactKey)?.memberId, "DualMember.Equals#instance");
  assert.equal(extended.extensionHost.facts.get(dualMemberSymbol.Exports?.get("GetType"), providerVirtualDeclarationFactKey)?.memberId, "DualMember.GetType#static");
  assert.equal(extended.extensionHost.facts.get(dualMemberSymbol.Members?.get("GetType"), providerVirtualDeclarationFactKey)?.memberId, "DualMember.GetType#instance");
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
  const systemFile = Program_GetSourceFile(program, "tsts-provider://acme/slice-IAsyncEnumerable");
  assert.ok(systemFile !== undefined);
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

  const runtimeFiles = Program_GetSourceFiles(program).filter((file) =>
    SourceFile_FileName(file).startsWith("tsts-provider://acme/sliced-System.IO"));
  assert.equal(runtimeFiles.length, 2);
  assert.ok(runtimeFiles.some((file) => SourceFile_Text(file).includes("DependencyOnly")));
  assert.ok(runtimeFiles.some((file) => SourceFile_Text(file).includes("PublicReader") && SourceFile_Text(file).includes("PublicWriter")));

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

      declare const token: Token;
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

  const reflectionFiles = Program_GetSourceFiles(program).filter((file) =>
    SourceFile_FileName(file).startsWith("tsts-provider://acme/public-reflection"));
  assert.equal(reflectionFiles.length, 2);
  const fullReflectionFile = reflectionFiles.find((file) => SourceFile_Text(file).includes("enum Token") && SourceFile_Text(file).includes("class Derived"));
  const aliasReflectionFile = reflectionFiles.find((file) => SourceFile_Text(file).includes("export { __TstsProviderCanonical_Token as Token };"));
  assert.ok(fullReflectionFile !== undefined);
  assert.ok(aliasReflectionFile !== undefined);
  assert.equal(SourceFile_Text(aliasReflectionFile).includes("enum Token"), false);

  Program_BindSourceFiles(program);
  const fullReflectionSymbol = Node_Symbol(fullReflectionFile as never);
  const aliasReflectionSymbol = Node_Symbol(aliasReflectionFile as never);
  assert.ok(fullReflectionSymbol?.Exports?.get("Token") !== undefined);
  assert.ok(aliasReflectionSymbol?.Exports?.get("Token") !== undefined);
  assert.equal(extended.extensionHost.diagnostics.hasErrors(), false);
});

test("provider virtual external generic heritage uses value-capable family variants", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { ModelMetadata, ModelPropertyCollection } from "@acme/public/model-binding.js";

      declare const collection: ModelPropertyCollection;
      declare const metadata: ModelMetadata;
      const item: ModelMetadata = collection.Item;
      collection;
      metadata;
      item;
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
    extensions: [externalGenericHeritageProviderExtension()],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  assertCleanProgram(program, sourceFile);

  const modelBindingFile = Program_GetSourceFiles(program).find((file) =>
    SourceFile_FileName(file).startsWith("tsts-provider://acme/public-model-binding"));
  assert.ok(modelBindingFile !== undefined);
  const modelBindingText = SourceFile_Text(modelBindingFile);
  assert.match(modelBindingText, /class ModelPropertyCollection extends/);
  assert.ok(modelBindingText.includes("extends ImportedReadOnlyCollection<ModelMetadata>"));
  const collectionFile = Program_GetSourceFiles(program).find((file) =>
    SourceFile_FileName(file).startsWith("tsts-provider://acme/public-collections-generic"));
  assert.ok(collectionFile !== undefined);
  assert.ok(SourceFile_Text(collectionFile).includes("export declare const ReadOnlyCollection: typeof __TstsProvider_ReadOnlyCollection_1;"));
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
  attachExtensionHost(options, {
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

  const collectionFiles = Program_GetSourceFiles(program).filter((file) =>
    SourceFile_FileName(file).startsWith("tsts-provider://acme/public-collections"));
  assert.equal(collectionFiles.length, 2);
  assert.ok(collectionFiles.some((file) => SourceFile_Text(file).includes("class Dictionary_ValueCollection_Enumerator")));
  assert.ok(collectionFiles.some((file) => SourceFile_Text(file).includes("export { __TstsProviderCanonical_Dictionary_ValueCollection_Enumerator as Dictionary_ValueCollection_Enumerator };")));
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
  attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [sameModuleSliceProviderExtension(requestedSlices)],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  assertCleanProgram(program, sourceFile);

  assert.deepEqual(requestedSlices[0], ["A", "B", "C"]);
  const runtimeFiles = Program_GetSourceFiles(program).filter((file) =>
    SourceFile_FileName(file).startsWith("tsts-provider://acme/native-mod"));
  assert.equal(runtimeFiles.length, 1);
  assert.ok(SourceFile_Text(runtimeFiles[0]).includes("interface A"));
  assert.ok(SourceFile_Text(runtimeFiles[0]).includes("interface B"));
  assert.ok(SourceFile_Text(runtimeFiles[0]).includes("interface C"));
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
  attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [restFunctionArrayProviderExtension()],
  });

  const program = NewProgram(options);
  const sourceFile = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(sourceFile !== undefined);
  assertCleanProgram(program, sourceFile);

  const virtualFile = Program_GetSourceFiles(program).find((file) =>
    SourceFile_FileName(file).startsWith("tsts-provider://acme/native-parallel"));
  assert.ok(virtualFile !== undefined);
  assert.ok(SourceFile_Text(virtualFile).includes("...actions: (() => void)[]"));
  assert.ok(!SourceFile_Text(virtualFile).includes("...actions: () => void[]"));
});

test("provider type families select same-name variants by source type-argument arity", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { Task } from "@acme/native/tasks.js";

      declare const pending: Task;
      declare const completed: Task<string>;

      pending.Wait();
      completed.Wait();
      completed.Result;
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

  Program_BindSourceFiles(program);
  const virtualFile = Program_GetSourceFile(program, "tsts-provider://acme/native-tasks");
  assert.ok(virtualFile !== undefined);
  const virtualText = SourceFile_Text(virtualFile);
  assert.match(virtualText, /declare class __TstsProvider_Task_0/);
  assert.match(virtualText, /declare class __TstsProvider_Task_1<TResult> extends __TstsProvider_Task_0/);
  assert.match(virtualText, /Duplicate: Task<TResult>;/);
  assert.equal(virtualText.includes("extends Task"), false);
  assert.match(virtualText, /export type Task<TResult = __TstsProviderTypeFamilyDefault> = \[TResult\] extends \[__TstsProviderTypeFamilyDefault\] \? __TstsProvider_Task_0 : __TstsProvider_Task_1<TResult>;/);
  assert.match(virtualText, /export declare const Task: typeof __TstsProvider_Task_0 & typeof __TstsProvider_Task_1;/);
  assert.equal(virtualText.includes("export { Task_1 as Task }"), false);

  const virtualSymbol = Node_Symbol(virtualFile as never);
  const taskFamilySymbol = virtualSymbol?.Exports?.get("Task");
  assert.ok(taskFamilySymbol !== undefined);
  const familyFact = extended.extensionHost.facts.get(taskFamilySymbol, providerTypeFamilyFactKey);
  assert.equal(familyFact?.exportName, "Task");
  assert.deepEqual(familyFact?.variants.map((variant) => [variant.sourceTypeArgumentCount, variant.declaration.exportId, variant.declaration.targetIdentity?.kind === "target-named" ? variant.declaration.targetIdentity.id : undefined]), [
    [0, "Task", "Acme.Threading.Tasks.Task"],
    [1, "Task_1", "Acme.Threading.Tasks.Task`1"],
  ]);

  const task0Symbol = Node_Locals(virtualFile)?.get("__TstsProvider_Task_0");
  const task1Symbol = Node_Locals(virtualFile)?.get("__TstsProvider_Task_1");
  assert.equal(extended.extensionHost.facts.get(task0Symbol, providerVirtualDeclarationFactKey)?.exportName, "Task");
  assert.equal(extended.extensionHost.facts.get(task0Symbol, providerVirtualDeclarationFactKey)?.exportId, "Task");
  assert.equal(extended.extensionHost.facts.get(task1Symbol, providerVirtualDeclarationFactKey)?.exportName, "Task");
  assert.equal(extended.extensionHost.facts.get(task1Symbol, providerVirtualDeclarationFactKey)?.exportId, "Task_1");

  const task0Reference = findTypeReferenceByNameAndArity(sourceFile, "Task", 0);
  const task1Reference = findTypeReferenceByNameAndArity(sourceFile, "Task", 1);
  assert.equal(extended.extensionHost.facts.get(task0Reference, providerVirtualDeclarationFactKey)?.exportId, "Task");
  assert.equal(extended.extensionHost.facts.get(task1Reference, providerVirtualDeclarationFactKey)?.exportId, "Task_1");
  assert.equal(extended.extensionHost.facts.get(task0Reference, targetBindingFactKey)?.id, "Acme.Threading.Tasks.Task");
  assert.equal(extended.extensionHost.facts.get(task1Reference, targetBindingFactKey)?.id, "Acme.Threading.Tasks.Task`1");
  assert.equal(extended.extensionHost.facts.get(task1Reference, instantiatedTargetTypeFactKey)?.typeArguments.length, 1);
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
  const virtualFile = Program_GetSourceFile(program, "tsts-provider://acme/Native.Namespace");
  assert.ok(virtualFile !== undefined);
  const nativeNamespaceSymbol = Node_Symbol(virtualFile as never)?.Exports?.get("NativeNamespace");
  assert.ok(nativeNamespaceSymbol !== undefined);
  const valueSymbol = nativeNamespaceSymbol.Exports?.get("value");
  const computeSymbol = nativeNamespaceSymbol.Exports?.get("compute");
  assert.ok(valueSymbol !== undefined);
  assert.ok(computeSymbol !== undefined);

  const valueDeclaration = findNamedNodeByKind(virtualFile as GoPtr<Node>, KindVariableDeclaration, "value");
  const computeDeclaration = findNamedNodeByKind(virtualFile as GoPtr<Node>, KindFunctionDeclaration, "compute");
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

test("checker exposes explicit selected source method type arguments on checked calls", () => {
  let observedTypeArguments: readonly SourceSelectedMethodTypeArgument[] | undefined;
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
  assert.equal(observedTypeText, "Result");
  assert.equal(selectedCall?.sourceSelectedMethodTypeArguments?.[0]?.selectedType, observedTypeArguments?.[0]?.selectedType);
  assert.equal(selectedCall?.sourceSelectedMethodTypeArguments?.[0]?.explicitTypeNode, observedTypeArguments?.[0]?.explicitTypeNode);
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
  attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-selected-property-evidence-extension", {
      identity: semanticProviderIdentity("acme-selected-property-evidence-provider"),
      mapCheckedPropertyAccess: (request) => {
        observedRequests.push(request);
        return acceptObservation({
          operation: targetOperation(`Acme.${request.propertyName}`, "property", "int32"),
          resultType: semanticSubject("int32"),
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
          resultType: semanticSubject("int32"),
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
          resultType: semanticSubject("int32"),
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
          resultType: semanticSubject("int32"),
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
          resultType: semanticSubject(request.operator === "!" ? "boolean" : "number"),
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
  attachExtensionHost(options, {
    activeTarget: "acme",
    extensions: [semanticOnlyExtension("acme-selected-callee-evidence-extension", {
      identity: semanticProviderIdentity("acme-selected-callee-evidence-provider"),
      mapCheckedCall: (request) => {
        observedRequest = request;
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
        getTargetIdentity: (symbol) => symbol.moduleSpecifier === "@acme/native/calls.js" && symbol.exportName === "NativePort"
          ? targetIdentity
          : undefined,
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
        getTargetIdentity: () => undefined,
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
        getTargetIdentity: () => undefined,
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
        getTargetIdentity: () => undefined,
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
        getTargetIdentity: () => undefined,
      }), true);
    },
  };
}

function publicProviderSliceIdentityProviderExtension(): CompilerExtension {
  const pendingExportsByModule = new Map<string, readonly string[]>();
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
          return {
            kind: "virtual",
            moduleSpecifier,
            virtualFileName: moduleSpecifier === "@acme/public/reflection.js"
              ? "tsts-provider://acme/public-reflection"
              : "tsts-provider://acme/public-core",
            providerModuleId: moduleSpecifier === "@acme/public/reflection.js"
              ? "acme.public.Reflection"
              : "acme.public.Core",
            packageName: "@acme/public",
            packageVersion: "1.0.0",
          };
        },
        getDeclarationModel: (resolution) => {
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
          return {
            moduleSpecifier: resolution.moduleSpecifier,
            providerModuleId: resolution.providerModuleId,
            ...(needsDerived ? {
              imports: [{
                moduleSpecifier: "@acme/public/core.js",
                typeOnly: true,
                namedImports: [{ exportedName: "Base" }],
              }],
            } : {}),
            exports: [
              {
                id: "Token",
                name: "Token",
                kind: "enum" as const,
                members: [{
                  id: "Token.ready",
                  name: "ready",
                  kind: "field" as const,
                }],
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
        getTargetIdentity: () => undefined,
      }), true);
    },
  };
}

function externalGenericHeritageProviderExtension(): CompilerExtension {
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
        ownsModule: (moduleSpecifier) => moduleSpecifier === "@acme/public/collections.js" || moduleSpecifier === "@acme/public/model-binding.js"
          ? { kind: "owned" }
          : { kind: "unowned" },
        resolveModule: (moduleSpecifier) => ({
          kind: "virtual",
          moduleSpecifier,
          virtualFileName: moduleSpecifier === "@acme/public/collections.js"
            ? "tsts-provider://acme/public-collections-generic"
            : "tsts-provider://acme/public-model-binding",
          providerModuleId: moduleSpecifier === "@acme/public/collections.js"
            ? "acme.public.Collections"
            : "acme.public.ModelBinding",
          packageName: "@acme/public",
          packageVersion: "1.0.0",
        }),
        getDeclarationModel: (resolution) => {
          if (resolution.moduleSpecifier === "@acme/public/collections.js") {
            return {
              moduleSpecifier: resolution.moduleSpecifier,
              providerModuleId: resolution.providerModuleId,
              exports: [{
                id: "ReadOnlyCollection_1",
                name: "ReadOnlyCollection_1",
                kind: "class",
                sourceTypeFamily: {
                  exportName: "ReadOnlyCollection",
                  typeArgumentCount: 1,
                },
                typeParameters: [{ name: "T" }],
                members: [{
                  id: "ReadOnlyCollection.Item",
                  name: "Item",
                  kind: "property",
                  readonly: true,
                  type: { kind: "type-parameter", name: "T" },
                }, {
                  id: "ReadOnlyCollection.Count",
                  name: "Count",
                  kind: "property",
                  readonly: true,
                  type: { kind: "number" },
                }],
              }],
            };
          }
          return {
            moduleSpecifier: resolution.moduleSpecifier,
            providerModuleId: resolution.providerModuleId,
            imports: [{
              moduleSpecifier: "@acme/public/collections.js",
              typeOnly: true,
              namedImports: [{
                exportedName: "ReadOnlyCollection",
                localName: "ImportedReadOnlyCollection",
              }],
            }],
            exports: [{
              id: "ModelMetadata",
              name: "ModelMetadata",
              kind: "class",
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
            }],
          };
        },
        getTargetIdentity: () => undefined,
      }), true);
    },
  };
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
        getTargetIdentity: () => undefined,
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
        getTargetIdentity: () => undefined,
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
        getTargetIdentity: () => undefined,
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
