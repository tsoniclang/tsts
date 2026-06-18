import type { GoPtr } from "../go/compat.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import { Node_Symbol, SourceFile_FileName } from "../internal/ast/ast.js";
import type { Symbol } from "../internal/ast/symbol.js";
import {
  canonicalIdentityFactKey,
  providerVirtualDeclarationFactKey,
  targetBindingFactKey,
} from "./facts.js";
import type { ProviderVirtualDeclarationFact, TargetBindingFact, TargetTypeRef } from "./facts.js";
import { ExtensionLifecycleEvent, getExtensionHost } from "./host.js";
import type { ExtensionEvidence, ExtensionHost, ProviderExportDeclaration, ProviderResolvedModule } from "./host.js";

export function recordBoundSourceFileExtensionFacts(program: object, file: GoPtr<SourceFile>): void {
  const extensionHost = getExtensionHost(program);
  if (extensionHost === undefined || file === undefined) {
    return;
  }

  const fileName = SourceFile_FileName(file);
  const virtualModule = extensionHost.providers.getVirtualModuleByFileName(fileName);
  if (virtualModule !== undefined) {
    recordProviderVirtualModuleFacts(extensionHost, file, virtualModule);
  }
  extensionHost.runLifecycle(ExtensionLifecycleEvent.afterSourceFileBound, {
    sourceFile: file,
    fileName,
    ...(virtualModule !== undefined ? { providerVirtualModule: virtualModule } : {}),
  });
}

export function finalizeExtensionSemantics(program: object): ExtensionHost | undefined {
  const extensionHost = getExtensionHost(program);
  if (extensionHost === undefined) {
    return undefined;
  }
  extensionHost.finalizeSemantics();
  return extensionHost;
}

function recordProviderVirtualModuleFacts(extensionHost: ExtensionHost, file: GoPtr<SourceFile>, virtualModule: ProviderResolvedModule): void {
  const evidence = getProviderVirtualModuleEvidence(virtualModule);
  extensionHost.facts.set(file, canonicalIdentityFactKey, {
    kind: "module",
    id: virtualModule.declarationModel.providerModuleId,
    ...(virtualModule.resolution.packageName !== undefined ? { packageName: virtualModule.resolution.packageName } : {}),
    ...(virtualModule.resolution.packageVersion !== undefined ? { packageVersion: virtualModule.resolution.packageVersion } : {}),
    subpath: virtualModule.resolution.moduleSpecifier,
  }, evidence);
  extensionHost.facts.set(file, providerVirtualDeclarationFactKey, getProviderVirtualDeclarationFact(virtualModule), evidence);

  const fileSymbol = Node_Symbol(file as unknown as GoPtr<Node>);
  if (fileSymbol === undefined) {
    return;
  }

  extensionHost.facts.set(fileSymbol, canonicalIdentityFactKey, {
    kind: "module",
    id: virtualModule.declarationModel.providerModuleId,
    ...(virtualModule.resolution.packageName !== undefined ? { packageName: virtualModule.resolution.packageName } : {}),
    ...(virtualModule.resolution.packageVersion !== undefined ? { packageVersion: virtualModule.resolution.packageVersion } : {}),
    subpath: virtualModule.resolution.moduleSpecifier,
    canonicalSymbolId: getSymbolFactId(fileSymbol),
  }, evidence);
  extensionHost.facts.set(fileSymbol, providerVirtualDeclarationFactKey, getProviderVirtualDeclarationFact(virtualModule), evidence);

  for (const declaration of virtualModule.declarationModel.exports) {
    const symbol = fileSymbol.Exports?.get(declaration.name);
    if (symbol === undefined) {
      continue;
    }
    extensionHost.facts.set(symbol, canonicalIdentityFactKey, {
      kind: "export",
      id: `${virtualModule.declarationModel.providerModuleId}::${declaration.name}`,
      ...(virtualModule.resolution.packageName !== undefined ? { packageName: virtualModule.resolution.packageName } : {}),
      ...(virtualModule.resolution.packageVersion !== undefined ? { packageVersion: virtualModule.resolution.packageVersion } : {}),
      subpath: virtualModule.resolution.moduleSpecifier,
      exportName: declaration.name,
      canonicalSymbolId: getSymbolFactId(symbol),
    }, evidence);
    extensionHost.facts.set(symbol, providerVirtualDeclarationFactKey, getProviderVirtualDeclarationFact(virtualModule, declaration), evidence);

    const targetBinding = getTargetBindingFact(virtualModule, declaration);
    if (targetBinding !== undefined) {
      extensionHost.facts.set(symbol, targetBindingFactKey, targetBinding, evidence);
    }
  }
}

function getProviderVirtualModuleEvidence(virtualModule: ProviderResolvedModule): readonly ExtensionEvidence[] {
  return [{
    message: "provider virtual module",
    details: {
      provider: virtualModule.provider.identity,
      moduleSpecifier: virtualModule.resolution.moduleSpecifier,
      providerModuleId: virtualModule.resolution.providerModuleId,
      virtualFileName: virtualModule.resolution.virtualFileName,
    },
  }];
}

function getSymbolFactId(symbol: Symbol): string {
  return `${symbol.Name}:${String(symbol.id)}`;
}

function getTargetBindingFact(virtualModule: ProviderResolvedModule, declaration: ProviderExportDeclaration): TargetBindingFact | undefined {
  if (declaration.targetIdentity === undefined) {
    return undefined;
  }
  return {
    id: declaration.targetIdentity.id,
    sourceName: declaration.name,
    targetName: declaration.targetIdentity.displayName ?? declaration.targetIdentity.id,
    target: declaration.targetIdentity.target,
    kind: getTargetBindingKind(declaration.kind),
    ...(declaration.typeParameters !== undefined
      ? {
        typeParameters: declaration.typeParameters.map((parameter) => ({
          name: parameter.name,
          ...(parameter.variance !== undefined ? { variance: parameter.variance } : {}),
        })),
      }
      : {}),
  };
}

function getProviderVirtualDeclarationFact(virtualModule: ProviderResolvedModule, declaration?: ProviderExportDeclaration): ProviderVirtualDeclarationFact {
  return {
    providerId: virtualModule.provider.identity.id,
    providerVersion: virtualModule.provider.identity.version,
    providerModuleId: virtualModule.resolution.providerModuleId,
    moduleSpecifier: virtualModule.resolution.moduleSpecifier,
    virtualFileName: virtualModule.resolution.virtualFileName,
    ...(declaration !== undefined ? { exportName: declaration.name } : {}),
    ...(declaration?.targetIdentity !== undefined
      ? {
        targetIdentity: {
          kind: "target-named",
          id: declaration.targetIdentity.id,
        } satisfies TargetTypeRef,
      }
      : {}),
  };
}

function getTargetBindingKind(kind: ProviderExportDeclaration["kind"]): TargetBindingFact["kind"] {
  switch (kind) {
    case "class":
      return "class";
    case "interface":
      return "interface";
    case "enum":
      return "enum";
    case "function":
      return "function";
    case "opaque":
      return "opaque";
    case "type":
    case "value":
    case "namespace":
      return "opaque";
  }
}
