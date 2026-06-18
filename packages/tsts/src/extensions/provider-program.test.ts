import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "@tsonic/core/types.js";
import type { GoPtr } from "../go/compat.js";
import { Background } from "../go/context.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import { SourceFile_FileName } from "../internal/ast/ast.js";
import { Node_Arguments, Node_Symbol } from "../internal/ast/ast.js";
import { Node_ForEachChild } from "../internal/ast/spine.js";
import { Diagnostic_Code, Diagnostic_String } from "../internal/ast/diagnostic.js";
import { AsTypeReferenceNode } from "../internal/ast/generated/casts.js";
import { KindBinaryExpression, KindCallExpression, KindElementAccessExpression, KindPropertyAccessExpression, KindTypeReference } from "../internal/ast/generated/kinds.js";
import { LibPath, WrapFS } from "../internal/bundled/bundled.js";
import type { CompilerOptions } from "../internal/core/compileroptions.js";
import { NewCompilerHost } from "../internal/compiler/host.js";
import {
  NewProgram,
  Program_BindSourceFiles,
  Program_GetProgramDiagnostics,
  Program_GetSemanticDiagnostics,
  Program_GetSourceFile,
  Program_GetSourceFiles,
  Program_GetSyntacticDiagnostics,
} from "../internal/compiler/program.js";
import type { Program, ProgramOptions } from "../internal/compiler/program.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import { DynamicProviderExtensionContractVersion, ExtensionDecisionQuestion, ExtensionHostDiagnosticCode, acceptDecision, argumentPassingFactKey, attachExtensionHost, createExtensionConsumerQueries, createSourceCoreExtension, deferDecision, finalizeExtensionSemantics, getExtensionHost, runtimeCarrierFactKey, sourcePrimitiveFactKey, targetConversionFactKey } from "./index.js";
import { canonicalIdentityFactKey, providerVirtualDeclarationFactKey, selectedTargetSignatureFactKey, surfaceOperationFactKey, targetBindingFactKey } from "./index.js";
import type { CompilerExtension, ExtensionDecisionContext, ExtensionFactSubject, ResolveCallRequest, SatisfiesConstraintRequest, SourcePrimitiveFact, SelectedTargetSignatureFact, SurfaceOperationFact, TargetBindingProvider, TargetIdentity, TargetMember, TargetSemanticProvider } from "./index.js";

test("provider-backed virtual modules participate in normal program binding", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import { SearchValues } from "@tsonic/dotnet/System.Buffers.js";

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
    activeTarget: "dotnet",
    extensions: [providerExtension("@tsonic/dotnet/System.Buffers.js")],
  });

  const program = NewProgram(options);
  const sourceFileNames = Program_GetSourceFiles(program).map((file) => SourceFile_FileName(file));

  assert.equal(extended.extensionHost.diagnostics.all().length, 0);
  assert.ok(sourceFileNames.includes("/src/index.ts"));
  assert.ok(sourceFileNames.includes("tsts-provider://dotnet/System.Buffers"));

  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assert.equal(Program_GetProgramDiagnostics(program).length, 0);
  assert.equal(Program_GetSyntacticDiagnostics(program, Background(), index).length, 0);
  assert.equal(Program_GetSemanticDiagnostics(program, Background(), index).length, 0);

  Program_BindSourceFiles(program);
  const virtualFile = Program_GetSourceFile(program, "tsts-provider://dotnet/System.Buffers");
  assert.ok(virtualFile !== undefined);
  const virtualModuleSymbol = Node_Symbol(virtualFile as never);
  const searchValuesSymbol = virtualModuleSymbol?.Exports?.get("SearchValues");
  assert.ok(searchValuesSymbol !== undefined);

  assert.equal(extended.extensionHost.facts.get(virtualFile, canonicalIdentityFactKey)?.id, "System.Buffers");
  assert.equal(extended.extensionHost.facts.get(virtualFile, providerVirtualDeclarationFactKey)?.providerId, "dotnet-provider");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, canonicalIdentityFactKey)?.exportName, "SearchValues");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, targetBindingFactKey)?.id, "System.Buffers.SearchValues`1");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, targetBindingFactKey)?.typeParameters?.[0]?.constraints?.[0]?.kind, "implements");
  const constraint = extended.extensionHost.facts.get(searchValuesSymbol, targetBindingFactKey)?.typeParameters?.[0]?.constraints?.[0];
  assert.equal(constraint?.kind === "implements" ? constraint.contract : undefined, "System.IEquatable`1");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, targetBindingFactKey)?.members?.[0]?.id, "Contains(T)");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, targetBindingFactKey)?.members?.[0]?.parameters[0]?.type.kind, "type-parameter");
  assert.equal(extended.extensionHost.facts.get(searchValuesSymbol, targetBindingFactKey)?.members?.[0]?.returnType?.kind, "source-primitive");

  const call = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(extended.extensionHost.facts.get(call, selectedTargetSignatureFactKey), undefined);

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getVirtualDeclaration(virtualFile)?.providerModuleId, "System.Buffers");
  assert.equal(consumer.getVirtualDeclaration(searchValuesSymbol)?.exportName, "SearchValues");
  assert.equal(consumer.getTargetBindingFact(searchValuesSymbol)?.id, "System.Buffers.SearchValues`1");
  assert.equal(consumer.getSelectedTargetCall(call), undefined);
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
    activeTarget: "dotnet",
    extensions: [providerExtension("@tsonic/dotnet/System.Console.js", false, semanticProvider(selectedSignature))],
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

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getSelectedTargetCall(call)?.member.id, "Contains(T)");
});

test("checker records provider-owned parameter mode facts from selected target signatures", () => {
  const selectedSignature = {
    member: searchValuesContainsTargetMember("byref-readonly"),
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
    activeTarget: "dotnet",
    extensions: [providerExtension("@tsonic/dotnet/System.Console.js", false, parameterModeSemanticProvider(selectedSignature))],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const call = findFirstNodeByKind(index, KindCallExpression);
  const argument = getFirstCallArgument(call);
  assert.equal(extended.extensionHost.facts.get(argument, argumentPassingFactKey)?.mode, "byref-readonly");
  assert.equal(extended.extensionHost.facts.get(call, argumentPassingFactKey)?.targetExpression, argument);

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getArgumentPassingFact(argument)?.mode, "byref-readonly");
});

test("checker records provider-owned runtime carrier and argument conversion facts", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import type { SearchValues } from "@tsonic/dotnet/System.Buffers.js";

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
    activeTarget: "dotnet",
    extensions: [providerExtension("@tsonic/dotnet/System.Buffers.js", false, carrierConversionSemanticProvider())],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const searchValuesTypeReference = findFirstNodeByKind(index, KindTypeReference);
  const runtimeCarrier = extended.extensionHost.facts.get(searchValuesTypeReference, runtimeCarrierFactKey)?.carrier;
  assert.equal(runtimeCarrier?.kind, "target-named");
  assert.equal(runtimeCarrier?.kind === "target-named" ? runtimeCarrier.id : undefined, "System.Buffers.SearchValues`1");

  const call = findFirstNodeByKind(index, KindCallExpression);
  const argument = getFirstCallArgument(call);
  assert.equal(extended.extensionHost.facts.get(argument, targetConversionFactKey)?.convertedType?.kind, "target-named");
  assert.equal(extended.extensionHost.facts.get(argument, targetConversionFactKey)?.operation?.operationId, "System.Convert.ToByte");

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getRuntimeCarrierFact(searchValuesTypeReference)?.carrier.kind, "target-named");
  assert.equal(consumer.getTargetConversionFact(argument)?.operation?.targetOperation, "System.Convert.ToByte");
});

test("checker validates provider-owned target constraints through standard semantic diagnostics", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `
      import type { int } from "@tsonic/core/types.js";
      import type { SearchValues } from "@tsonic/dotnet/System.Buffers.js";

      type Good = SearchValues<int>;
      type Bad = SearchValues<number>;
    `],
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
    ["/src/node_modules/@tsonic/core/types.d.ts", "export type int = number;"],
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
    activeTarget: "dotnet",
    extensions: [
      createSourceCoreExtension(),
      providerExtension("@tsonic/dotnet/System.Buffers.js", false, constraintSemanticProvider()),
    ],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);

  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), index);
  assert.equal(diagnostics.length, 1);
  assert.equal(Diagnostic_Code(diagnostics[0]), 9910201);
  assert.match(Diagnostic_String(diagnostics[0]), /DOTNET0201/);
  assert.match(Diagnostic_String(diagnostics[0]), /must implement System\.IEquatable`1/);

  const targetDiagnostics = extended.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.extensionCode === "DOTNET_CONSTRAINT");
  assert.equal(targetDiagnostics.length, 1);
  assert.equal((targetDiagnostics[0]?.nodeOrSpan as GoPtr<Node>)?.Kind, KindTypeReference);
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
    activeTarget: "dotnet",
    extensions: [providerExtension("@tsonic/dotnet/System.Console.js", false, deferredSemanticProvider())],
  });

  const program = NewProgram(options);
  assert.ok(program !== undefined);
  assert.equal(getExtensionHost(program), extended.extensionHost);
  assert.equal(extended.extensionHost.getDecisionOwner(ExtensionDecisionQuestion.resolveCall)?.identity.id, "dotnet-provider-extension");
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assert.equal(Program_GetProgramDiagnostics(program).length, 0);
  assert.equal(Program_GetSyntacticDiagnostics(program, Background(), index).length, 0);
  assert.equal(Program_GetSemanticDiagnostics(program, Background(), index).length, 0);

  const call = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(extended.extensionHost.facts.get(call, selectedTargetSignatureFactKey), undefined);
  assert.equal(extended.extensionHost.diagnostics.all().at(-1)?.numericCode, ExtensionHostDiagnosticCode.decisionOwnerDeferred);

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
    activeTarget: "dotnet",
    extensions: [providerExtension("@tsonic/dotnet/System.Console.js", false, surfaceSemanticProvider())],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assertCleanProgram(program, index);

  const propertyAccess = findFirstNodeByKind(index, KindPropertyAccessExpression);
  const elementAccess = findFirstNodeByKind(index, KindElementAccessExpression);
  const binaryExpression = findFirstNodeByKind(index, KindBinaryExpression);

  assert.equal(extended.extensionHost.facts.get(propertyAccess, surfaceOperationFactKey)?.operationId, "System.String.Length");
  assert.equal(extended.extensionHost.facts.get(elementAccess, surfaceOperationFactKey)?.operationId, "System.ReadOnlySpan.GetItem");
  assert.equal(extended.extensionHost.facts.get(binaryExpression, surfaceOperationFactKey)?.operationId, "System.Int32.op_Addition");

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getSelectedTargetProperty(propertyAccess)?.targetOperation, "System.String.Length");
  assert.equal(consumer.getSelectedTargetElementAccess(elementAccess)?.targetOperation, "System.ReadOnlySpan.GetItem");
  assert.equal(consumer.getSelectedTargetOperator(binaryExpression)?.targetOperation, "System.Int32.op_Addition");
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
    activeTarget: "dotnet",
    extensions: [providerExtension("@tsonic/dotnet/System.Console.js", false, deferredSurfaceSemanticProvider())],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);
  assert.equal(Program_GetSemanticDiagnostics(program, Background(), index).length, 0);

  const propertyAccess = findFirstNodeByKind(index, KindPropertyAccessExpression);
  const elementAccess = findFirstNodeByKind(index, KindElementAccessExpression);
  const binaryExpression = findFirstNodeByKind(index, KindBinaryExpression);

  assert.equal(extended.extensionHost.facts.get(propertyAccess, surfaceOperationFactKey), undefined);
  assert.equal(extended.extensionHost.facts.get(elementAccess, surfaceOperationFactKey), undefined);
  assert.equal(extended.extensionHost.facts.get(binaryExpression, surfaceOperationFactKey), undefined);
  assert.ok(extended.extensionHost.diagnostics.all().filter((diagnostic) => diagnostic.numericCode === ExtensionHostDiagnosticCode.decisionOwnerDeferred).length >= 3);
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
    activeTarget: "dotnet",
    extensions: [providerExtension("@tsonic/dotnet/System.Console.js", false, rejectingCallSemanticProvider())],
  });

  const program = NewProgram(options);
  const index = Program_GetSourceFile(program, "/src/index.ts");
  assert.ok(index !== undefined);

  const diagnostics = Program_GetSemanticDiagnostics(program, Background(), index);
  assert.equal(diagnostics.length, 1);
  assert.equal(Diagnostic_Code(diagnostics[0]), 9910125);
  assert.match(Diagnostic_String(diagnostics[0]), /DOTNET0125/);
  assert.match(Diagnostic_String(diagnostics[0]), /does not fit in System.Byte/);

  const call = findFirstNodeByKind(index, KindCallExpression);
  assert.equal(extended.extensionHost.facts.get(call, selectedTargetSignatureFactKey), undefined);
});

test("provider-owned rejected modules do not fall back to file-system resolution", () => {
  let fs = FromMap(new Map<string, string>([
    ["/src/index.ts", `import { SearchValues } from "@tsonic/dotnet/System.Buffers.js";`],
    ["/src/node_modules/@tsonic/dotnet/System.Buffers.js", "export const SearchValues = 1;"],
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
    activeTarget: "dotnet",
    extensions: [providerExtension("@tsonic/dotnet/System.Buffers.js", true)],
  });

  const program = NewProgram(options);
  const sourceFileNames = Program_GetSourceFiles(program).map((file) => SourceFile_FileName(file));

  assert.equal(extended.extensionHost.diagnostics.all().length, 1);
  assert.equal(extended.extensionHost.diagnostics.all()[0]?.extensionCode, "PROVIDER_REJECTED_MODULE");
  assert.ok(!sourceFileNames.includes("/src/node_modules/@tsonic/dotnet/System.Buffers.js"));
});

function providerExtension(specifier: string, reject = false, provider?: TargetSemanticProvider): CompilerExtension {
  return {
    identity: {
      id: "dotnet-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "dotnet",
    },
    initialize(context): void {
      context.registerTargetBindingProvider(dotnetProvider(specifier, reject));
      if (provider !== undefined) {
        assert.equal(context.registerTargetSemanticProvider(provider), true);
      }
    },
  };
}

function semanticProvider(selectedSignature: SelectedTargetSignatureFact): TargetSemanticProvider {
  return {
    identity: {
      id: "dotnet-semantic-provider",
      version: "1.0.0",
      target: "dotnet",
      extensionContractVersion: DynamicProviderExtensionContractVersion,
      providerKind: "semantic",
    },
    resolveCall: () => acceptDecision({
      selectedSignature,
      returnType: "bool",
    }),
  };
}

function deferredSemanticProvider(): TargetSemanticProvider {
  return {
    identity: {
      id: "dotnet-deferred-semantic-provider",
      version: "1.0.0",
      target: "dotnet",
      extensionContractVersion: DynamicProviderExtensionContractVersion,
      providerKind: "semantic",
    },
    resolveCall: () => deferDecision,
  };
}

function parameterModeSemanticProvider(selectedSignature: SelectedTargetSignatureFact): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("dotnet-parameter-mode-semantic-provider"),
    resolveCall: () => acceptDecision({
      selectedSignature,
      returnType: "bool",
    }),
    getParameterMode: (request) => acceptDecision({
      passing: {
        mode: "byref-readonly",
        targetExpression: request.argument,
      },
    }),
  };
}

function carrierConversionSemanticProvider(): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("dotnet-carrier-conversion-semantic-provider"),
    resolveCall: () => acceptDecision({
      selectedSignature: {
        member: byteConversionTargetMember(),
      },
      returnType: "number",
    }),
    resolveConversion: () => acceptDecision({
      convertedType: { kind: "target-named", id: "System.Byte" },
      operation: surfaceOperation("System.Convert.ToByte", "method", "number"),
    }),
    getRuntimeCarrier: () => acceptDecision({
      carrier: { kind: "target-named", id: "System.Buffers.SearchValues`1" },
      requiresAllocation: false,
    }),
  };
}

function surfaceSemanticProvider(): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("dotnet-surface-semantic-provider"),
    resolvePropertyAccess: () => acceptDecision({
      operation: surfaceOperation("System.String.Length", "property", "int32"),
      resultType: "int32",
    }),
    resolveElementAccess: () => acceptDecision({
      operation: surfaceOperation("System.ReadOnlySpan.GetItem", "indexer", "char"),
      resultType: "char",
    }),
    resolveOperator: () => acceptDecision({
      operation: surfaceOperation("System.Int32.op_Addition", "operator", "int32"),
      resultType: "int32",
    }),
  };
}

function deferredSurfaceSemanticProvider(): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("dotnet-deferred-surface-semantic-provider"),
    resolvePropertyAccess: () => deferDecision,
    resolveElementAccess: () => deferDecision,
    resolveOperator: () => deferDecision,
  };
}

function rejectingCallSemanticProvider(): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("dotnet-rejecting-call-semantic-provider"),
    resolveCall: (request: ResolveCallRequest) => ({
      kind: "reject",
      diagnostic: {
        extensionId: "dotnet-rejecting-call-semantic-provider",
        extensionCode: "DOTNET_BYTE_RANGE",
        numericCode: 9910125,
        publicCode: "DOTNET0125",
        category: "error",
        message: "Numeric literal 300 does not fit in System.Byte.",
        nodeOrSpan: request.call,
        evidence: [{ message: "Target range", details: "System.Byte accepts 0..255." }],
        identity: "dotnet-byte-range:/src/index.ts:toByte",
      },
    }),
  };
}

function constraintSemanticProvider(): TargetSemanticProvider {
  return {
    identity: semanticProviderIdentity("dotnet-constraint-semantic-provider"),
    satisfiesConstraint: (request, context) => {
      const primitive = getSourcePrimitiveForConstraintArgument(request.source, context);
      if (request.constraint.kind === "implements" && request.constraint.contract === "System.IEquatable`1" && primitive?.kind === "int32") {
        return acceptDecision(true, [{ message: "Source primitive int32 maps to System.Int32, which implements System.IEquatable<System.Int32>." }]);
      }
      return rejectTargetConstraint(request, context);
    },
  };
}

function rejectTargetConstraint(request: SatisfiesConstraintRequest, context: ExtensionDecisionContext) {
  return {
    kind: "reject" as const,
    diagnostic: {
      extensionId: context.extensionId,
      extensionCode: "DOTNET_CONSTRAINT",
      numericCode: 9910201,
      publicCode: "DOTNET0201",
      category: "error" as const,
      message: "Target type argument must implement System.IEquatable`1.",
      nodeOrSpan: request.source,
      evidence: [{ message: "Provider target constraint", details: request.constraint }],
      identity: getConstraintDiagnosticIdentity(request.source),
    },
  };
}

function getConstraintDiagnosticIdentity(source: ExtensionFactSubject): string {
  if (source !== null && source !== undefined && typeof source === "object") {
    const node = source as GoPtr<Node>;
    return `dotnet-constraint:${String(node?.id ?? "unknown")}`;
  }
  return `dotnet-constraint:${typeof source}:${String(source)}`;
}

function getSourcePrimitiveForConstraintArgument(source: ExtensionFactSubject, context: ExtensionDecisionContext): SourcePrimitiveFact | undefined {
  if (source === null || source === undefined || typeof source !== "object") {
    return undefined;
  }
  const node = source as GoPtr<Node>;
  if (node === undefined) {
    return undefined;
  }
  const direct = context.facts.get(node, sourcePrimitiveFactKey);
  if (direct !== undefined) {
    return direct;
  }
  const typeName = node.Kind === KindTypeReference ? AsTypeReferenceNode(node)?.TypeName : node;
  const symbol = Node_Symbol(typeName);
  return symbol === undefined ? undefined : context.facts.get(symbol, sourcePrimitiveFactKey);
}

function semanticProviderIdentity(id: string) {
  return {
    id,
    version: "1.0.0",
    target: "dotnet",
    extensionContractVersion: DynamicProviderExtensionContractVersion,
    providerKind: "semantic" as const,
  };
}

function surfaceOperation(operationId: string, sourceOperation: SurfaceOperationFact["sourceOperation"], resultType: SurfaceOperationFact["resultType"]): SurfaceOperationFact {
  return {
    operationId,
    sourceOperation,
    targetOperation: operationId,
    ...(resultType !== undefined ? { resultType } : {}),
  };
}

function dotnetProvider(specifier: string, reject: boolean): TargetBindingProvider {
  const targetIdentity: TargetIdentity = {
    target: "dotnet",
    id: "System.Buffers.SearchValues`1",
    displayName: "System.Buffers.SearchValues<T>",
  };
  return {
    identity: {
      id: "dotnet-provider",
      version: "1.0.0",
      target: "dotnet",
      extensionContractVersion: DynamicProviderExtensionContractVersion,
      providerKind: "binding",
    },
    ownsModule(moduleSpecifier) {
      return moduleSpecifier === specifier ? { kind: "owned" } : { kind: "unowned" };
    },
    resolveModule(moduleSpecifier) {
      if (reject) {
        return {
          extensionId: "dotnet-provider",
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
        virtualFileName: "tsts-provider://dotnet/System.Buffers",
        providerModuleId: "System.Buffers",
        packageName: "@tsonic/dotnet",
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
            target: "dotnet",
            id: "System.IEquatable`1",
            typeArguments: [{ kind: "type-parameter", name: "T" }],
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
  assert.equal(Program_GetProgramDiagnostics(program).length, 0);
  assert.equal(Program_GetSyntacticDiagnostics(program, Background(), sourceFile).length, 0);
  assert.equal(Program_GetSemanticDiagnostics(program, Background(), sourceFile).length, 0);
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

function selectedSearchValuesContainsSignature(): SelectedTargetSignatureFact {
  return {
    member: searchValuesContainsTargetMember(),
  };
}

function byteConversionTargetMember(): TargetMember {
  return {
    id: "ToByte(System.Int32)",
    sourceName: "toByte",
    targetName: "ToByte",
    kind: "method",
    parameters: [{
      name: "value",
      type: { kind: "target-named", id: "System.Byte" },
      passingMode: "by-value",
    }],
    returnType: { kind: "target-named", id: "System.Byte" },
    overloadGroup: "ToByte",
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
