import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "@tsonic/core/types.js";
import { Background } from "../go/context.js";
import { SourceFile_FileName } from "../internal/ast/ast.js";
import { Node_Symbol } from "../internal/ast/ast.js";
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
import type { ProgramOptions } from "../internal/compiler/program.js";
import type { ParseConfigHost } from "../internal/tsoptions/tsconfigparsing.js";
import { GetParsedCommandLineOfConfigFile } from "../internal/tsoptions/tsconfigparsing.js";
import { FromMap } from "../internal/vfs/vfstest/vfstest.js";
import { attachExtensionHost, createExtensionConsumerQueries, finalizeExtensionSemantics } from "./index.js";
import { canonicalIdentityFactKey, providerVirtualDeclarationFactKey, targetBindingFactKey } from "./index.js";
import type { CompilerExtension, TargetBindingProvider, TargetIdentity } from "./index.js";

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

  assert.equal(finalizeExtensionSemantics(options), extended.extensionHost);
  const consumer = createExtensionConsumerQueries(extended.extensionHost, "emitter");
  assert.equal(consumer.getVirtualDeclaration(virtualFile)?.providerModuleId, "System.Buffers");
  assert.equal(consumer.getVirtualDeclaration(searchValuesSymbol)?.exportName, "SearchValues");
  assert.equal(consumer.getTargetBindingFact(searchValuesSymbol)?.id, "System.Buffers.SearchValues`1");
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

function providerExtension(specifier: string, reject = false): CompilerExtension {
  return {
    identity: {
      id: "dotnet-provider-extension",
      version: "1.0.0",
      capabilityNamespace: "dotnet",
    },
    initialize(context): void {
      context.registerTargetBindingProvider(dotnetProvider(specifier, reject));
    },
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
      extensionContractVersion: "new-hope.dynamic-provider.1",
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
            constraints: [{ kind: "unknown" }],
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
