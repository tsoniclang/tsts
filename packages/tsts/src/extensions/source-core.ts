import type { bool } from "@tsonic/core/types.js";
import type { GoPtr } from "../go/compat.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import type { Symbol } from "../internal/ast/symbol.js";
import {
  Node_Elements,
  Node_ImportClause,
  Node_ModuleSpecifier,
  Node_PropertyName,
  Node_Statements,
  Node_Symbol,
  Node_Text,
} from "../internal/ast/ast.js";
import { Node_ForEachChild, Node_Name } from "../internal/ast/spine.js";
import { AsExportDeclaration, AsExportSpecifier, AsImportClause, AsNamespaceImport, AsQualifiedName, AsTypeReferenceNode } from "../internal/ast/generated/casts.js";
import {
  KindExportDeclaration,
  KindImportDeclaration,
  KindNamedImports,
  KindNamedExports,
  KindNamespaceImport,
  KindQualifiedName,
  KindTypeKeyword,
  KindTypeReference,
} from "../internal/ast/generated/kinds.js";
import {
  canonicalIdentityFactKey,
  sourcePrimitiveFactKey,
} from "./facts.js";
import type {
  ExtensionCanonicalIdentity,
  ExtensionImportKind,
  SourcePrimitiveFact,
  SourcePrimitiveKind,
} from "./facts.js";
import { ExtensionLifecycleEvent } from "./host.js";
import type {
  CompilerExtension,
  ExtensionEvidence,
  ExtensionFactStore,
  SourceFileBoundLifecycleRequest,
} from "./host.js";

export interface SourceCoreExtensionOptions {
  readonly modules?: readonly SourceCoreModuleIdentity[];
  readonly primitives?: readonly SourcePrimitiveDeclaration[];
}

export interface SourceCoreModuleIdentity {
  readonly moduleSpecifier: string;
  readonly packageName?: string;
  readonly packageVersion?: string;
  readonly subpath?: string;
}

export interface SourcePrimitiveDeclaration extends SourcePrimitiveFact {
  readonly exportName: string;
}

const sourceCoreExtensionId = "tsts.source-core";

const defaultSourceCoreModules: readonly SourceCoreModuleIdentity[] = [{
  moduleSpecifier: "@tsonic/core/types.js",
  packageName: "@tsonic/core",
  subpath: "types.js",
}];

const defaultSourcePrimitives: readonly SourcePrimitiveDeclaration[] = [
  primitive("bool", "bool", "boolean"),
  primitive("char", "char", "string", false, 16),
  primitive("sbyte", "int8", "number", true, 8),
  primitive("byte", "uint8", "number", false, 8),
  primitive("short", "int16", "number", true, 16),
  primitive("ushort", "uint16", "number", false, 16),
  primitive("int", "int32", "number", true, 32),
  primitive("uint", "uint32", "number", false, 32),
  primitive("long", "int64", "bigint", true, 64),
  primitive("ulong", "uint64", "bigint", false, 64),
  primitive("nint", "native-int", "number", true),
  primitive("nuint", "native-uint", "number", false),
  primitive("half", "float16", "number", true, 16),
  primitive("float", "float32", "number", true, 32),
  primitive("double", "float64", "number", true, 64),
  primitive("decimal", "decimal", "object", true, 128),
  primitive("int128", "int128", "bigint", true, 128),
  primitive("uint128", "uint128", "bigint", false, 128),
];

export function createSourceCoreExtension(options: SourceCoreExtensionOptions = {}): CompilerExtension {
  const modules = options.modules ?? defaultSourceCoreModules;
  const primitivesByExportName = new Map((options.primitives ?? defaultSourcePrimitives).map((entry) => [entry.exportName, entry]));
  return {
    identity: {
      id: sourceCoreExtensionId,
      version: "1.0.0",
      capabilityNamespace: "source-core",
    },
    composition: {
      kind: "source",
    },
    capabilities: {
      provides: ["source-core.primitives"],
    },
    initialize(context): void {
      context.registerLifecycleHook<SourceFileBoundLifecycleRequest>(ExtensionLifecycleEvent.afterSourceFileBound, (request) => {
        recordSourceCoreImports(request, context.facts, modules, primitivesByExportName);
      });
    },
  };
}

function recordSourceCoreImports(
  request: SourceFileBoundLifecycleRequest,
  facts: ExtensionFactStore,
  modules: readonly SourceCoreModuleIdentity[],
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
): void {
  const sourceFile = getLifecycleSourceFile(request);
  if (sourceFile === undefined) {
    return;
  }

  for (const statement of Node_Statements(sourceFile) ?? []) {
    if (statement?.Kind === KindImportDeclaration) {
      const moduleIdentity = getSourceCoreModuleIdentity(statement, modules);
      if (moduleIdentity !== undefined) {
        recordSourceCoreImportClause(facts, statement, moduleIdentity, primitivesByExportName);
      }
      continue;
    }
    if (statement?.Kind === KindExportDeclaration) {
      const moduleIdentity = getSourceCoreModuleIdentity(statement, modules);
      if (moduleIdentity !== undefined) {
        recordSourceCoreExportClause(facts, statement, moduleIdentity, primitivesByExportName);
      }
    }
  }
  recordSourceCoreTypeReferences(facts, sourceFile, modules, primitivesByExportName);
}

function recordSourceCoreImportClause(
  facts: ExtensionFactStore,
  importDeclaration: GoPtr<Node>,
  moduleIdentity: SourceCoreModuleIdentity,
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
): void {
  const importClause = Node_ImportClause(importDeclaration);
  if (importClause === undefined) {
    return;
  }
  const typedImport = AsImportClause(importClause)!.PhaseModifier === KindTypeKeyword;
  const namedBindings = AsImportClause(importClause)!.NamedBindings;
  if (namedBindings === undefined) {
    return;
  }
  if (namedBindings.Kind === KindNamespaceImport) {
    recordNamespaceImportIdentity(facts, namedBindings, moduleIdentity, typedImport);
    return;
  }
  if (namedBindings.Kind !== KindNamedImports) {
    return;
  }
  for (const importSpecifier of Node_Elements(namedBindings) ?? []) {
    const localName = Node_Name(importSpecifier);
    if (localName === undefined) {
      continue;
    }
    const exportName = Node_Text(Node_PropertyName(importSpecifier) ?? localName);
    const primitiveFact = primitivesByExportName.get(exportName);
    if (primitiveFact === undefined) {
      continue;
    }
    recordSourcePrimitiveImport(facts, importSpecifier, moduleIdentity, exportName, primitiveFact, typedImport);
  }
}

function recordSourceCoreExportClause(
  facts: ExtensionFactStore,
  exportDeclaration: GoPtr<Node>,
  moduleIdentity: SourceCoreModuleIdentity,
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
): void {
  const exportClause = AsExportDeclaration(exportDeclaration)!.ExportClause;
  if (exportClause === undefined || exportClause.Kind !== KindNamedExports) {
    return;
  }
  const declarationIsTypeOnly = AsExportDeclaration(exportDeclaration)!.IsTypeOnly;
  for (const exportSpecifier of Node_Elements(exportClause) ?? []) {
    const exportedName = Node_Name(exportSpecifier);
    if (exportedName === undefined) {
      continue;
    }
    const sourceName = Node_Text(Node_PropertyName(exportSpecifier) ?? exportedName);
    const primitiveFact = primitivesByExportName.get(sourceName);
    if (primitiveFact === undefined) {
      continue;
    }
    const specifierIsTypeOnly = AsExportSpecifier(exportSpecifier)!.IsTypeOnly;
    recordSourcePrimitiveImport(facts, exportSpecifier, moduleIdentity, sourceName, primitiveFact, declarationIsTypeOnly || specifierIsTypeOnly);
  }
}

function recordSourceCoreTypeReferences(
  facts: ExtensionFactStore,
  sourceFile: GoPtr<SourceFile>,
  modules: readonly SourceCoreModuleIdentity[],
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
): void {
  visitSourceCoreNode(sourceFile, (node) => {
    if (node?.Kind !== KindTypeReference) {
      return;
    }
    const typeName = AsTypeReferenceNode(node)!.TypeName;
    if (typeName === undefined) {
      return;
    }
    const primitive = resolvePrimitiveTypeReference(facts, typeName, modules, primitivesByExportName);
    if (primitive === undefined) {
      return;
    }
    const evidence = createPrimitiveEvidence(primitive.moduleIdentity, primitive.exportName);
    facts.set(node, canonicalIdentityFactKey, primitive.identity, evidence);
    facts.set(node, sourcePrimitiveFactKey, stripExportName(primitive.primitiveFact), evidence);
    facts.set(typeName, canonicalIdentityFactKey, primitive.identity, evidence);
    facts.set(typeName, sourcePrimitiveFactKey, stripExportName(primitive.primitiveFact), evidence);
    if (typeName.Kind === KindQualifiedName) {
      const right = AsQualifiedName(typeName)!.Right;
      facts.set(right, canonicalIdentityFactKey, primitive.identity, evidence);
      facts.set(right, sourcePrimitiveFactKey, stripExportName(primitive.primitiveFact), evidence);
    }
  });
}

function resolvePrimitiveTypeReference(
  facts: ExtensionFactStore,
  typeName: GoPtr<Node>,
  modules: readonly SourceCoreModuleIdentity[],
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
): { readonly moduleIdentity: SourceCoreModuleIdentity; readonly exportName: string; readonly primitiveFact: SourcePrimitiveDeclaration; readonly identity: ExtensionCanonicalIdentity } | undefined {
  if (typeName === undefined) {
    return undefined;
  }
  if (typeName.Kind === KindQualifiedName) {
    return resolveQualifiedPrimitiveReference(facts, typeName, modules, primitivesByExportName);
  }

  const typeNameSymbol = Node_Symbol(typeName);
  if (typeNameSymbol === undefined) {
    return undefined;
  }
  const primitiveFact = facts.get(typeNameSymbol, sourcePrimitiveFactKey);
  const identity = facts.get(typeNameSymbol, canonicalIdentityFactKey);
  if (primitiveFact === undefined || identity === undefined || identity.exportName === undefined) {
    return undefined;
  }
  const moduleIdentity = modules.find((candidate) => identity.id === `${candidate.moduleSpecifier}::${identity.exportName}`);
  if (moduleIdentity === undefined) {
    return undefined;
  }
  const declaration = primitivesByExportName.get(identity.exportName);
  if (declaration === undefined) {
    return undefined;
  }
  return { moduleIdentity, exportName: identity.exportName, primitiveFact: declaration, identity };
}

function resolveQualifiedPrimitiveReference(
  facts: ExtensionFactStore,
  typeName: GoPtr<Node>,
  modules: readonly SourceCoreModuleIdentity[],
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
): { readonly moduleIdentity: SourceCoreModuleIdentity; readonly exportName: string; readonly primitiveFact: SourcePrimitiveDeclaration; readonly identity: ExtensionCanonicalIdentity } | undefined {
  const qualifiedName = AsQualifiedName(typeName);
  const leftSymbol = Node_Symbol(qualifiedName?.Left);
  if (leftSymbol === undefined) {
    return undefined;
  }
  const moduleIdentityFact = facts.get(leftSymbol, canonicalIdentityFactKey);
  if (moduleIdentityFact?.kind !== "module") {
    return undefined;
  }
  const moduleIdentity = modules.find((candidate) => candidate.moduleSpecifier === moduleIdentityFact.id);
  if (moduleIdentity === undefined) {
    return undefined;
  }
  const right = qualifiedName!.Right;
  const exportName = Node_Text(right);
  const primitiveFact = primitivesByExportName.get(exportName);
  if (primitiveFact === undefined) {
    return undefined;
  }
  const rightSymbol = Node_Symbol(right);
  const identity = createExportIdentity(moduleIdentity, exportName, "type", rightSymbol === undefined ? `${moduleIdentity.moduleSpecifier}::${exportName}` : getSymbolFactId(rightSymbol));
  return { moduleIdentity, exportName, primitiveFact, identity };
}

function visitSourceCoreNode(node: GoPtr<Node>, visit: (node: GoPtr<Node>) => void): void {
  if (node === undefined) {
    return;
  }
  visit(node);
  Node_ForEachChild(node, (child: GoPtr<Node>) => {
    visitSourceCoreNode(child, visit);
    return false as bool;
  });
}

function recordNamespaceImportIdentity(
  facts: ExtensionFactStore,
  namespaceImport: GoPtr<Node>,
  moduleIdentity: SourceCoreModuleIdentity,
  typedImport: boolean,
): void {
  const namespaceSymbol = Node_Symbol(namespaceImport);
  if (namespaceSymbol === undefined) {
    return;
  }
  facts.set(namespaceImport, canonicalIdentityFactKey, createModuleIdentity(moduleIdentity, "namespace", getSymbolFactId(namespaceSymbol)), createModuleEvidence(moduleIdentity));
  facts.set(namespaceSymbol, canonicalIdentityFactKey, createModuleIdentity(moduleIdentity, typedImport ? "type" : "namespace", getSymbolFactId(namespaceSymbol)), createModuleEvidence(moduleIdentity));
}

function getSourceCoreModuleIdentity(node: GoPtr<Node>, modules: readonly SourceCoreModuleIdentity[]): SourceCoreModuleIdentity | undefined {
  const moduleSpecifier = Node_ModuleSpecifier(node);
  return moduleSpecifier === undefined
    ? undefined
    : modules.find((candidate) => candidate.moduleSpecifier === Node_Text(moduleSpecifier));
}

function recordSourcePrimitiveImport(
  facts: ExtensionFactStore,
  importSpecifier: GoPtr<Node>,
  moduleIdentity: SourceCoreModuleIdentity,
  exportName: string,
  primitiveFact: SourcePrimitiveDeclaration,
  typedImport: boolean,
): void {
  const localSymbol = Node_Symbol(importSpecifier);
  if (localSymbol === undefined) {
    return;
  }
  const identity = createExportIdentity(moduleIdentity, exportName, typedImport ? "type" : "value", getSymbolFactId(localSymbol));
  const evidence = createPrimitiveEvidence(moduleIdentity, exportName);
  facts.set(importSpecifier, canonicalIdentityFactKey, identity, evidence);
  facts.set(importSpecifier, sourcePrimitiveFactKey, stripExportName(primitiveFact), evidence);
  facts.set(localSymbol, canonicalIdentityFactKey, identity, evidence);
  facts.set(localSymbol, sourcePrimitiveFactKey, stripExportName(primitiveFact), evidence);
}

function createModuleIdentity(moduleIdentity: SourceCoreModuleIdentity, importKind: ExtensionImportKind, canonicalSymbolId: string): ExtensionCanonicalIdentity {
  return {
    kind: "module",
    id: moduleIdentity.moduleSpecifier,
    ...(moduleIdentity.packageName !== undefined ? { packageName: moduleIdentity.packageName } : {}),
    ...(moduleIdentity.packageVersion !== undefined ? { packageVersion: moduleIdentity.packageVersion } : {}),
    subpath: moduleIdentity.subpath ?? moduleIdentity.moduleSpecifier,
    importKind,
    canonicalSymbolId,
  };
}

function createExportIdentity(moduleIdentity: SourceCoreModuleIdentity, exportName: string, importKind: ExtensionImportKind, canonicalSymbolId: string): ExtensionCanonicalIdentity {
  return {
    kind: "export",
    id: `${moduleIdentity.moduleSpecifier}::${exportName}`,
    ...(moduleIdentity.packageName !== undefined ? { packageName: moduleIdentity.packageName } : {}),
    ...(moduleIdentity.packageVersion !== undefined ? { packageVersion: moduleIdentity.packageVersion } : {}),
    subpath: moduleIdentity.subpath ?? moduleIdentity.moduleSpecifier,
    exportName,
    importKind,
    canonicalSymbolId,
  };
}

function createPrimitiveEvidence(moduleIdentity: SourceCoreModuleIdentity, exportName: string): readonly ExtensionEvidence[] {
  return [{
    message: "source primitive import",
    details: {
      moduleSpecifier: moduleIdentity.moduleSpecifier,
      exportName,
    },
  }];
}

function createModuleEvidence(moduleIdentity: SourceCoreModuleIdentity): readonly ExtensionEvidence[] {
  return [{
    message: "source core module import",
    details: {
      moduleSpecifier: moduleIdentity.moduleSpecifier,
    },
  }];
}

function stripExportName(declaration: SourcePrimitiveDeclaration): SourcePrimitiveFact {
  return {
    kind: declaration.kind,
    runtimeBase: declaration.runtimeBase,
    ...(declaration.signed !== undefined ? { signed: declaration.signed } : {}),
    ...(declaration.width !== undefined ? { width: declaration.width } : {}),
  };
}

function primitive(
  exportName: string,
  kind: SourcePrimitiveKind,
  runtimeBase: SourcePrimitiveFact["runtimeBase"],
  signed?: boolean,
  width?: number,
): SourcePrimitiveDeclaration {
  return {
    exportName,
    kind,
    runtimeBase,
    ...(signed !== undefined ? { signed } : {}),
    ...(width !== undefined ? { width } : {}),
  };
}

function getSymbolFactId(symbol: Symbol): string {
  return `${symbol.Name}:${String(symbol.id)}`;
}

function getLifecycleSourceFile(request: SourceFileBoundLifecycleRequest): GoPtr<SourceFile> {
  if (typeof request.sourceFile !== "object" || request.sourceFile === null) {
    return undefined;
  }
  return request.sourceFile as SourceFile;
}
