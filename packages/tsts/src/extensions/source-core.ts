import type { bool } from "@tsonic/core/types.js";
import type { GoPtr } from "../go/compat.js";
import type { Node, SourceFile } from "../internal/ast/ast.js";
import type { Symbol } from "../internal/ast/symbol.js";
import {
  Node_Arguments,
  Node_Expression,
  Node_Elements,
  Node_ImportClause,
  Node_Initializer,
  Node_ModuleSpecifier,
  Node_PropertyName,
  Node_Properties,
  Node_Statements,
  Node_Symbol,
  Node_Text,
  Node_TypeArguments,
} from "../internal/ast/ast.js";
import { Node_ForEachChild, Node_Name } from "../internal/ast/spine.js";
import { AsExportDeclaration, AsExportSpecifier, AsImportClause, AsNamespaceImport, AsPropertyAccessExpression, AsQualifiedName, AsTypeReferenceNode } from "../internal/ast/generated/casts.js";
import {
  KindCallExpression,
  KindExportDeclaration,
  KindImportDeclaration,
  KindNamedImports,
  KindNamedExports,
  KindNamespaceImport,
  KindObjectLiteralExpression,
  KindPropertyAccessExpression,
  KindPropertyAssignment,
  KindPropertyDeclaration,
  KindQualifiedName,
  KindTypeKeyword,
  KindTypeReference,
  KindTupleType,
  KindVariableDeclaration,
} from "../internal/ast/generated/kinds.js";
import { IsLeftHandSideExpression } from "../internal/ast/utilities.js";
import {
  argumentPassingFactKey,
  attributeFactKey,
  canonicalIdentityFactKey,
  defaultValueFactKey,
  fieldFactKey,
  flowStateFactKey,
  functionPointerFactKey,
  pointerFactKey,
  sourcePrimitiveFactKey,
  structFactKey,
} from "./facts.js";
import type {
  ArgumentPassingFact,
  AttributeFact,
  DefaultValueFact,
  ExtensionCanonicalIdentity,
  ExtensionImportKind,
  FieldFact,
  FlowStateFact,
  FunctionPointerFact,
  PointerFact,
  SourcePrimitiveFact,
  SourcePrimitiveKind,
  StructFact,
} from "./facts.js";
import { ExtensionLifecycleEvent } from "./host.js";
import type {
  CompilerExtension,
  ExtensionDiagnosticStore,
  ExtensionEvidence,
  ExtensionFactKey,
  ExtensionFactResolverContext,
  ExtensionFactSubject,
  ExtensionFactStore,
  SourceFileBoundLifecycleRequest,
} from "./host.js";

export interface SourceCoreExtensionOptions {
  readonly modules?: readonly SourceCoreModuleIdentity[];
  readonly primitives?: readonly SourcePrimitiveDeclaration[];
  readonly callMarkers?: readonly SourceCallMarkerDeclaration[];
  readonly typeMarkers?: readonly SourceTypeMarkerDeclaration[];
}

export type SourceCoreModuleCapability = "primitive" | "call-marker" | "type-marker";

export interface SourceCoreModuleIdentity {
  readonly moduleSpecifier: string;
  readonly packageName?: string;
  readonly packageVersion?: string;
  readonly subpath?: string;
  readonly capabilities?: readonly SourceCoreModuleCapability[];
}

export interface SourcePrimitiveDeclaration extends SourcePrimitiveFact {
  readonly exportName: string;
}

export type SourceCallMarkerKind =
  | "out"
  | "ref"
  | "inref"
  | "borrow"
  | "borrowMut"
  | "move"
  | "struct"
  | "field"
  | "attribute"
  | "defaultof";

type ArgumentPassingMarkerKind = Extract<SourceCallMarkerKind, "out" | "ref" | "inref">;

export interface SourceCallMarkerDeclaration {
  readonly exportName: string;
  readonly kind: SourceCallMarkerKind;
}

export type SourceTypeMarkerKind = "ptr" | "fnptr";

export interface SourceTypeMarkerDeclaration {
  readonly exportName: string;
  readonly kind: SourceTypeMarkerKind;
}

interface SourceCoreMarkerImportIndex {
  readonly primitivesByLocalName: ReadonlyMap<string, SourcePrimitiveImportBinding>;
  readonly callMarkersByLocalName: ReadonlyMap<string, SourceCallMarkerDeclaration>;
  readonly typeMarkersByLocalName: ReadonlyMap<string, SourceTypeMarkerDeclaration>;
  readonly namespacesByLocalName: ReadonlyMap<string, SourceCoreModuleIdentity>;
}

interface SourcePrimitiveImportBinding {
  readonly moduleIdentity: SourceCoreModuleIdentity;
  readonly exportName: string;
  readonly primitiveFact: SourcePrimitiveDeclaration;
}

const sourceCoreExtensionId = "tsts.source-core";

const defaultSourceCoreModules: readonly SourceCoreModuleIdentity[] = [{
  moduleSpecifier: "@tsonic/core/types.js",
  packageName: "@tsonic/core",
  subpath: "types.js",
  capabilities: ["primitive", "type-marker"],
}, {
  moduleSpecifier: "@tsonic/core/lang.js",
  packageName: "@tsonic/core",
  subpath: "lang.js",
  capabilities: ["call-marker"],
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

const defaultSourceCallMarkers: readonly SourceCallMarkerDeclaration[] = [
  { exportName: "out", kind: "out" },
  { exportName: "ref", kind: "ref" },
  { exportName: "inref", kind: "inref" },
  { exportName: "borrow", kind: "borrow" },
  { exportName: "borrowMut", kind: "borrowMut" },
  { exportName: "move", kind: "move" },
  { exportName: "struct", kind: "struct" },
  { exportName: "field", kind: "field" },
  { exportName: "attribute", kind: "attribute" },
  { exportName: "defaultof", kind: "defaultof" },
];

const defaultSourceTypeMarkers: readonly SourceTypeMarkerDeclaration[] = [
  { exportName: "ptr", kind: "ptr" },
  { exportName: "fnptr", kind: "fnptr" },
];

export function createSourceCoreExtension(options: SourceCoreExtensionOptions = {}): CompilerExtension {
  const modules = options.modules ?? defaultSourceCoreModules;
  const primitivesByExportName = new Map((options.primitives ?? defaultSourcePrimitives).map((entry) => [entry.exportName, entry]));
  const callMarkersByExportName = new Map((options.callMarkers ?? defaultSourceCallMarkers).map((entry) => [entry.exportName, entry]));
  const typeMarkersByExportName = new Map((options.typeMarkers ?? defaultSourceTypeMarkers).map((entry) => [entry.exportName, entry]));
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
      provides: [
        "source-core.primitives",
        "source-core.argument-passing",
        "source-core.pointer-types",
        "source-core.flow-markers",
        "source-core.structs",
        "source-core.attributes",
        "source-core.defaults",
      ],
    },
    initialize(context): void {
      context.factResolver.register(sourcePrimitiveFactKey, (subject, resolverContext) =>
        resolveSourcePrimitiveFact(subject, resolverContext, modules, primitivesByExportName));
      context.registerLifecycleHook<SourceFileBoundLifecycleRequest>(ExtensionLifecycleEvent.afterSourceFileBound, (request) => {
        recordSourceCoreFacts(request, context.facts, context.diagnostics, modules, primitivesByExportName, callMarkersByExportName, typeMarkersByExportName);
      });
    },
  };
}

function recordSourceCoreFacts(
  request: SourceFileBoundLifecycleRequest,
  facts: ExtensionFactStore,
  diagnostics: ExtensionDiagnosticStore,
  modules: readonly SourceCoreModuleIdentity[],
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
  callMarkersByExportName: ReadonlyMap<string, SourceCallMarkerDeclaration>,
  typeMarkersByExportName: ReadonlyMap<string, SourceTypeMarkerDeclaration>,
): void {
  const sourceFile = getLifecycleSourceFile(request);
  if (sourceFile === undefined) {
    return;
  }

  for (const statement of Node_Statements(sourceFile) ?? []) {
    if (statement?.Kind === KindImportDeclaration) {
      const moduleIdentity = getSourceCoreModuleIdentity(statement, modules);
      if (moduleIdentity !== undefined) {
        recordSourceCoreImportClause(facts, statement, moduleIdentity, primitivesByExportName, callMarkersByExportName, typeMarkersByExportName);
      }
      continue;
    }
    if (statement?.Kind === KindExportDeclaration) {
      const moduleIdentity = getSourceCoreModuleIdentity(statement, modules);
      if (moduleIdentity !== undefined) {
        recordSourceCoreExportClause(facts, statement, moduleIdentity, primitivesByExportName, callMarkersByExportName, typeMarkersByExportName);
      }
    }
  }
  const markerImportIndex = createSourceCoreMarkerImportIndex(sourceFile, modules, callMarkersByExportName, typeMarkersByExportName, primitivesByExportName);
  recordSourceCoreCallMarkers(facts, diagnostics, sourceFile, modules, callMarkersByExportName, markerImportIndex);
  recordSourceCoreTypeReferences(facts, sourceFile, modules, primitivesByExportName, typeMarkersByExportName, markerImportIndex);
}

function recordSourceCoreImportClause(
  facts: ExtensionFactStore,
  importDeclaration: GoPtr<Node>,
  moduleIdentity: SourceCoreModuleIdentity,
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
  callMarkersByExportName: ReadonlyMap<string, SourceCallMarkerDeclaration>,
  typeMarkersByExportName: ReadonlyMap<string, SourceTypeMarkerDeclaration>,
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
    if (primitiveFact !== undefined && moduleSupports(moduleIdentity, "primitive")) {
      recordSourcePrimitiveImport(facts, importSpecifier, moduleIdentity, exportName, primitiveFact, typedImport);
      continue;
    }
    if (callMarkersByExportName.has(exportName) && moduleSupports(moduleIdentity, "call-marker")) {
      recordSourceCoreSymbolImport(facts, importSpecifier, moduleIdentity, exportName, typedImport ? "type" : "value");
      continue;
    }
    if (typeMarkersByExportName.has(exportName) && moduleSupports(moduleIdentity, "type-marker")) {
      recordSourceCoreSymbolImport(facts, importSpecifier, moduleIdentity, exportName, typedImport ? "type" : "value");
    }
  }
}

function recordSourceCoreExportClause(
  facts: ExtensionFactStore,
  exportDeclaration: GoPtr<Node>,
  moduleIdentity: SourceCoreModuleIdentity,
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
  callMarkersByExportName: ReadonlyMap<string, SourceCallMarkerDeclaration>,
  typeMarkersByExportName: ReadonlyMap<string, SourceTypeMarkerDeclaration>,
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
    if (primitiveFact !== undefined && moduleSupports(moduleIdentity, "primitive")) {
      const specifierIsTypeOnly = AsExportSpecifier(exportSpecifier)!.IsTypeOnly;
      recordSourcePrimitiveImport(facts, exportSpecifier, moduleIdentity, sourceName, primitiveFact, declarationIsTypeOnly || specifierIsTypeOnly);
      continue;
    }
    const specifierIsTypeOnly = AsExportSpecifier(exportSpecifier)!.IsTypeOnly;
    if (callMarkersByExportName.has(sourceName) && moduleSupports(moduleIdentity, "call-marker")) {
      recordSourceCoreSymbolImport(facts, exportSpecifier, moduleIdentity, sourceName, declarationIsTypeOnly || specifierIsTypeOnly ? "type" : "value");
      continue;
    }
    if (typeMarkersByExportName.has(sourceName) && moduleSupports(moduleIdentity, "type-marker")) {
      recordSourceCoreSymbolImport(facts, exportSpecifier, moduleIdentity, sourceName, declarationIsTypeOnly || specifierIsTypeOnly ? "type" : "value");
    }
  }
}

function recordSourceCoreCallMarkers(
  facts: ExtensionFactStore,
  diagnostics: ExtensionDiagnosticStore,
  sourceFile: GoPtr<SourceFile>,
  modules: readonly SourceCoreModuleIdentity[],
  callMarkersByExportName: ReadonlyMap<string, SourceCallMarkerDeclaration>,
  markerImportIndex: SourceCoreMarkerImportIndex,
): void {
  visitSourceCoreNodePost(sourceFile, (node) => {
    if (node?.Kind !== KindCallExpression) {
      return;
    }
    const marker = resolveSourceCoreCallMarkerReference(facts, Node_Expression(node), modules, callMarkersByExportName, markerImportIndex);
    if (marker === undefined) {
      return;
    }
    recordSourceCoreCallMarker(facts, diagnostics, node, marker);
  });
}

function recordSourceCoreCallMarker(
  facts: ExtensionFactStore,
  diagnostics: ExtensionDiagnosticStore,
  callExpression: GoPtr<Node>,
  marker: SourceCallMarkerDeclaration,
): void {
  const evidence = createMarkerEvidence(marker.exportName);
  switch (marker.kind) {
    case "out":
    case "ref":
    case "inref": {
      const argument = (Node_Arguments(callExpression) ?? [])[0];
      if (argument === undefined) {
        return;
      }
      recordArgumentPassingMarker(facts, diagnostics, callExpression, argument, marker, evidence);
      return;
    }
    case "borrow": {
      const argument = (Node_Arguments(callExpression) ?? [])[0];
      if (argument === undefined) {
        return;
      }
      recordFlowMarker(facts, callExpression, argument, { state: "borrowed-shared" }, evidence);
      return;
    }
    case "borrowMut": {
      const argument = (Node_Arguments(callExpression) ?? [])[0];
      if (argument === undefined) {
        return;
      }
      recordFlowMarker(facts, callExpression, argument, { state: "borrowed-mut" }, evidence);
      return;
    }
    case "move": {
      const argument = (Node_Arguments(callExpression) ?? [])[0];
      if (argument === undefined) {
        return;
      }
      recordFlowMarker(facts, callExpression, argument, { state: "moved" }, evidence);
      return;
    }
    case "field":
      recordFieldMarker(facts, callExpression, evidence);
      return;
    case "struct":
      recordStructMarker(facts, callExpression, evidence);
      return;
    case "attribute":
      recordAttributeMarker(facts, callExpression, evidence);
      return;
    case "defaultof":
      recordDefaultValueMarker(facts, callExpression, evidence);
      return;
  }
}

function recordArgumentPassingMarker(
  facts: ExtensionFactStore,
  diagnostics: ExtensionDiagnosticStore,
  callExpression: GoPtr<Node>,
  target: GoPtr<Node>,
  marker: SourceCallMarkerDeclaration,
  evidence: readonly ExtensionEvidence[],
): void {
  const fact = {
    mode: getArgumentPassingMode(marker.kind as ArgumentPassingMarkerKind),
    targetExpression: target,
  } satisfies ArgumentPassingFact;
  facts.set(callExpression, argumentPassingFactKey, fact, evidence);
  if (IsLeftHandSideExpression(target)) {
    facts.set(target, argumentPassingFactKey, fact, evidence);
    return;
  }
  diagnostics.append({
    extensionId: sourceCoreExtensionId,
    extensionCode: "SOURCE_CORE_NON_STORAGE_ARGUMENT",
    numericCode: 9901101,
    publicCode: "TSTS_SOURCE_CORE_0001",
    category: "error",
    message: `${marker.exportName}(...) requires a storage expression.`,
    nodeOrSpan: target,
    evidence,
    identity: `source-core-non-storage:${marker.exportName}:${String(target?.id ?? "unknown")}`,
  });
}

function getArgumentPassingMode(kind: ArgumentPassingMarkerKind): ArgumentPassingFact["mode"] {
  switch (kind) {
    case "out":
      return "byref-writeonly-must-init";
    case "ref":
      return "byref-readwrite";
    case "inref":
      return "byref-readonly";
  }
}

function recordFieldMarker(
  facts: ExtensionFactStore,
  callExpression: GoPtr<Node>,
  evidence: readonly ExtensionEvidence[],
): void {
  const fieldType = (Node_TypeArguments(callExpression) ?? [])[0];
  if (fieldType === undefined) {
    return;
  }
  const propertyAssignment = callExpression?.Parent?.Kind === KindPropertyAssignment ? callExpression.Parent : undefined;
  const nameNode = propertyAssignment === undefined ? undefined : (Node_Name(propertyAssignment) ?? Node_PropertyName(propertyAssignment));
  const name = Node_Text(nameNode);
  const fact = {
    name,
    type: fieldType,
  } satisfies FieldFact;
  facts.set(callExpression, fieldFactKey, fact, evidence);
  if (propertyAssignment !== undefined) {
    facts.set(propertyAssignment, fieldFactKey, fact, evidence);
    if (nameNode !== undefined) {
      facts.set(nameNode, fieldFactKey, fact, evidence);
    }
  }
}

function recordStructMarker(
  facts: ExtensionFactStore,
  callExpression: GoPtr<Node>,
  evidence: readonly ExtensionEvidence[],
): void {
  const shape = (Node_Arguments(callExpression) ?? [])[0];
  const fields: FieldFact[] = [];
  if (shape?.Kind === KindObjectLiteralExpression) {
    for (const property of Node_Properties(shape) ?? []) {
      if (property?.Kind !== KindPropertyAssignment) {
        continue;
      }
      const field = facts.get(property, fieldFactKey) ?? facts.get(Node_Initializer(property), fieldFactKey);
      if (field !== undefined) {
        fields.push(field);
      }
    }
  }
  const fact = {
    valueType: true,
    fields,
  } satisfies StructFact;
  facts.set(callExpression, structFactKey, fact, evidence);
  recordInitializerOwnerFact(facts, callExpression, structFactKey, fact, evidence);
}

function recordAttributeMarker(
  facts: ExtensionFactStore,
  callExpression: GoPtr<Node>,
  evidence: readonly ExtensionEvidence[],
): void {
  const target = (Node_TypeArguments(callExpression) ?? [])[0];
  if (target === undefined) {
    return;
  }
  const fact = {
    target,
    attributeName: getTypeReferenceNameText(target),
    arguments: Node_Arguments(callExpression) ?? [],
  } satisfies AttributeFact;
  facts.set(callExpression, attributeFactKey, fact, evidence);
  recordInitializerOwnerFact(facts, callExpression, attributeFactKey, fact, evidence);
}

function recordDefaultValueMarker(
  facts: ExtensionFactStore,
  callExpression: GoPtr<Node>,
  evidence: readonly ExtensionEvidence[],
): void {
  const type = (Node_TypeArguments(callExpression) ?? [])[0];
  if (type === undefined) {
    return;
  }
  const fact = { type } satisfies DefaultValueFact;
  facts.set(callExpression, defaultValueFactKey, fact, evidence);
  recordInitializerOwnerFact(facts, callExpression, defaultValueFactKey, fact, evidence);
}

function recordInitializerOwnerFact<TFact>(
  facts: ExtensionFactStore,
  callExpression: GoPtr<Node>,
  key: ExtensionFactKey<TFact>,
  fact: TFact,
  evidence: readonly ExtensionEvidence[],
): void {
  const parent = callExpression?.Parent;
  if (parent === undefined || !isInitializerOwner(parent) || Node_Initializer(parent) !== callExpression) {
    return;
  }
  facts.set(parent, key, fact, evidence);
  const symbol = Node_Symbol(parent);
  if (symbol !== undefined) {
    facts.set(symbol, key, fact, evidence);
  }
}

function isInitializerOwner(node: GoPtr<Node>): boolean {
  return node?.Kind === KindVariableDeclaration || node?.Kind === KindPropertyDeclaration || node?.Kind === KindPropertyAssignment;
}

function recordFlowMarker(
  facts: ExtensionFactStore,
  callExpression: GoPtr<Node>,
  target: GoPtr<Node>,
  fact: FlowStateFact,
  evidence: readonly ExtensionEvidence[],
): void {
  facts.set(callExpression, flowStateFactKey, fact, evidence);
  facts.set(target, flowStateFactKey, fact, evidence);
  const symbol = Node_Symbol(target);
  if (symbol !== undefined) {
    facts.set(symbol, flowStateFactKey, fact, evidence);
  }
}

function resolveSourcePrimitiveFact(
  subject: ExtensionFactSubject,
  context: ExtensionFactResolverContext,
  modules: readonly SourceCoreModuleIdentity[],
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
): { readonly value: SourcePrimitiveFact; readonly evidence?: readonly ExtensionEvidence[] } | undefined {
  if (subject === null || subject === undefined || typeof subject !== "object") {
    return undefined;
  }
  const node = subject as GoPtr<Node>;
  if (node?.Kind !== KindTypeReference) {
    return undefined;
  }
  const typeName = AsTypeReferenceNode(node)?.TypeName;
  const primitive = resolvePrimitiveTypeReference(context.facts, typeName, modules, primitivesByExportName);
  if (primitive === undefined) {
    return undefined;
  }
  return {
    value: stripExportName(primitive.primitiveFact),
    evidence: createPrimitiveEvidence(primitive.moduleIdentity, primitive.exportName),
  };
}

function recordSourceCoreTypeReferences(
  facts: ExtensionFactStore,
  sourceFile: GoPtr<SourceFile>,
  modules: readonly SourceCoreModuleIdentity[],
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
  typeMarkersByExportName: ReadonlyMap<string, SourceTypeMarkerDeclaration>,
  markerImportIndex: SourceCoreMarkerImportIndex,
): void {
  visitSourceCoreNode(sourceFile, (node) => {
    if (node?.Kind !== KindTypeReference) {
      return;
    }
    const typeName = AsTypeReferenceNode(node)!.TypeName;
    if (typeName === undefined) {
      return;
    }
    const marker = resolveSourceCoreTypeMarkerReference(facts, typeName, modules, typeMarkersByExportName, markerImportIndex);
    if (marker !== undefined) {
      recordSourceCoreTypeMarker(facts, node, typeName, marker);
    }
    const primitive = resolvePrimitiveTypeReference(facts, typeName, modules, primitivesByExportName, markerImportIndex);
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

function recordSourceCoreTypeMarker(
  facts: ExtensionFactStore,
  typeReference: GoPtr<Node>,
  typeName: GoPtr<Node>,
  marker: SourceTypeMarkerDeclaration,
): void {
  const typeArguments = Node_TypeArguments(typeReference) ?? [];
  const evidence = createMarkerEvidence(marker.exportName);
  if (marker.kind === "ptr") {
    const pointee = typeArguments[0];
    if (pointee === undefined) {
      return;
    }
    const fact = {
      pointee,
      mutability: "target-defined",
      unsafeRequired: true,
    } satisfies PointerFact;
    facts.set(typeReference, pointerFactKey, fact, evidence);
    facts.set(typeName, pointerFactKey, fact, evidence);
    return;
  }
  const result = typeArguments[1];
  if (result === undefined) {
    return;
  }
  const parameters = getFunctionPointerParameters(typeArguments[0]);
  const fact = {
    parameters,
    result,
    abi: ["target-default"],
  } satisfies FunctionPointerFact;
  facts.set(typeReference, functionPointerFactKey, fact, evidence);
  facts.set(typeName, functionPointerFactKey, fact, evidence);
}

function getFunctionPointerParameters(parameterList: GoPtr<Node>): readonly GoPtr<Node>[] {
  if (parameterList === undefined) {
    return [];
  }
  if (parameterList.Kind === KindTupleType) {
    return Node_Elements(parameterList) ?? [];
  }
  return [parameterList];
}

function resolveSourceCoreCallMarkerReference(
  facts: ExtensionFactStore,
  node: GoPtr<Node>,
  modules: readonly SourceCoreModuleIdentity[],
  markersByExportName: ReadonlyMap<string, SourceCallMarkerDeclaration>,
  markerImportIndex: SourceCoreMarkerImportIndex,
): SourceCallMarkerDeclaration | undefined {
  return resolveSourceCoreMarkerFromImportIndex(node, markerImportIndex.callMarkersByLocalName, markerImportIndex.namespacesByLocalName, markersByExportName, "call-marker")
    ?? resolveSourceCoreMarkerReference(facts, node, modules, markersByExportName, "call-marker");
}

function resolveSourceCoreTypeMarkerReference(
  facts: ExtensionFactStore,
  node: GoPtr<Node>,
  modules: readonly SourceCoreModuleIdentity[],
  markersByExportName: ReadonlyMap<string, SourceTypeMarkerDeclaration>,
  markerImportIndex: SourceCoreMarkerImportIndex,
): SourceTypeMarkerDeclaration | undefined {
  return resolveSourceCoreMarkerFromImportIndex(node, markerImportIndex.typeMarkersByLocalName, markerImportIndex.namespacesByLocalName, markersByExportName, "type-marker")
    ?? resolveSourceCoreMarkerReference(facts, node, modules, markersByExportName, "type-marker");
}

function resolveSourceCoreMarkerFromImportIndex<TMarker extends { readonly exportName: string }>(
  node: GoPtr<Node>,
  markersByLocalName: ReadonlyMap<string, TMarker>,
  namespacesByLocalName: ReadonlyMap<string, SourceCoreModuleIdentity>,
  markersByExportName: ReadonlyMap<string, TMarker>,
  capability: SourceCoreModuleCapability,
): TMarker | undefined {
  if (node === undefined) {
    return undefined;
  }
  if (node.Kind === KindPropertyAccessExpression) {
    const receiverName = Node_Text(AsPropertyAccessExpression(node)?.Expression);
    const namespaceModule = namespacesByLocalName.get(receiverName);
    const propertyName = Node_Text(Node_Name(node));
    const marker = markersByExportName.get(propertyName);
    return namespaceModule !== undefined && marker !== undefined && moduleSupports(namespaceModule, capability) ? marker : undefined;
  }
  if (node.Kind === KindQualifiedName) {
    const qualifiedName = AsQualifiedName(node);
    const namespaceModule = namespacesByLocalName.get(Node_Text(qualifiedName?.Left));
    const marker = markersByExportName.get(Node_Text(qualifiedName?.Right));
    return namespaceModule !== undefined && marker !== undefined && moduleSupports(namespaceModule, capability) ? marker : undefined;
  }
  return markersByLocalName.get(Node_Text(node));
}

function resolveSourceCoreMarkerReference<TMarker extends { readonly exportName: string }>(
  facts: ExtensionFactStore,
  node: GoPtr<Node>,
  modules: readonly SourceCoreModuleIdentity[],
  markersByExportName: ReadonlyMap<string, TMarker>,
  capability: SourceCoreModuleCapability,
): TMarker | undefined {
  if (node === undefined) {
    return undefined;
  }
  if (node.Kind === KindPropertyAccessExpression) {
    const propertyName = Node_Text(Node_Name(node));
    const marker = markersByExportName.get(propertyName);
    if (marker === undefined) {
      return undefined;
    }
    const receiverSymbol = Node_Symbol(AsPropertyAccessExpression(node)?.Expression);
    const receiverIdentity = receiverSymbol === undefined ? undefined : facts.get(receiverSymbol, canonicalIdentityFactKey);
    if (receiverIdentity?.kind !== "module") {
      return undefined;
    }
    return modules.some((candidate) => candidate.moduleSpecifier === receiverIdentity.id && moduleSupports(candidate, capability)) ? marker : undefined;
  }
  if (node.Kind === KindQualifiedName) {
    const qualifiedName = AsQualifiedName(node);
    const exportName = Node_Text(qualifiedName?.Right);
    const marker = markersByExportName.get(exportName);
    if (marker === undefined) {
      return undefined;
    }
    const leftSymbol = Node_Symbol(qualifiedName?.Left);
    const leftIdentity = leftSymbol === undefined ? undefined : facts.get(leftSymbol, canonicalIdentityFactKey);
    if (leftIdentity?.kind !== "module") {
      return undefined;
    }
    return modules.some((candidate) => candidate.moduleSpecifier === leftIdentity.id && moduleSupports(candidate, capability)) ? marker : undefined;
  }
  const symbol = Node_Symbol(node);
  const identity = symbol === undefined ? undefined : facts.get(symbol, canonicalIdentityFactKey);
  if (identity?.exportName === undefined) {
    return undefined;
  }
  const marker = markersByExportName.get(identity.exportName);
  if (marker === undefined) {
    return undefined;
  }
  return modules.some((candidate) => moduleSupports(candidate, capability) && identity.id === `${candidate.moduleSpecifier}::${identity.exportName}`) ? marker : undefined;
}

function createSourceCoreMarkerImportIndex(
  sourceFile: GoPtr<SourceFile>,
  modules: readonly SourceCoreModuleIdentity[],
  callMarkersByExportName: ReadonlyMap<string, SourceCallMarkerDeclaration>,
  typeMarkersByExportName: ReadonlyMap<string, SourceTypeMarkerDeclaration>,
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
): SourceCoreMarkerImportIndex {
  const primitivesByLocalName = new Map<string, SourcePrimitiveImportBinding>();
  const callMarkersByLocalName = new Map<string, SourceCallMarkerDeclaration>();
  const typeMarkersByLocalName = new Map<string, SourceTypeMarkerDeclaration>();
  const namespacesByLocalName = new Map<string, SourceCoreModuleIdentity>();
  for (const statement of Node_Statements(sourceFile) ?? []) {
    if (statement?.Kind !== KindImportDeclaration) {
      continue;
    }
    const moduleIdentity = getSourceCoreModuleIdentity(statement, modules);
    if (moduleIdentity === undefined) {
      continue;
    }
    const namedBindings = AsImportClause(Node_ImportClause(statement))?.NamedBindings;
    if (namedBindings === undefined) {
      continue;
    }
    if (namedBindings.Kind === KindNamespaceImport) {
      const namespaceName = Node_Text(Node_Name(namedBindings));
      if (namespaceName !== "") {
        namespacesByLocalName.set(namespaceName, moduleIdentity);
      }
      continue;
    }
    if (namedBindings.Kind !== KindNamedImports) {
      continue;
    }
    for (const importSpecifier of Node_Elements(namedBindings) ?? []) {
      const localName = Node_Text(Node_Name(importSpecifier));
      const exportName = Node_Text(Node_PropertyName(importSpecifier) ?? Node_Name(importSpecifier));
      const primitive = primitivesByExportName.get(exportName);
      if (primitive !== undefined && moduleSupports(moduleIdentity, "primitive")) {
        primitivesByLocalName.set(localName, { moduleIdentity, exportName, primitiveFact: primitive });
      }
      const callMarker = callMarkersByExportName.get(exportName);
      if (callMarker !== undefined && moduleSupports(moduleIdentity, "call-marker")) {
        callMarkersByLocalName.set(localName, callMarker);
      }
      const typeMarker = typeMarkersByExportName.get(exportName);
      if (typeMarker !== undefined && moduleSupports(moduleIdentity, "type-marker")) {
        typeMarkersByLocalName.set(localName, typeMarker);
      }
    }
  }
  return { primitivesByLocalName, callMarkersByLocalName, typeMarkersByLocalName, namespacesByLocalName };
}

function resolvePrimitiveTypeReference(
  facts: ExtensionFactStore,
  typeName: GoPtr<Node>,
  modules: readonly SourceCoreModuleIdentity[],
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
  importIndex?: SourceCoreMarkerImportIndex,
): { readonly moduleIdentity: SourceCoreModuleIdentity; readonly exportName: string; readonly primitiveFact: SourcePrimitiveDeclaration; readonly identity: ExtensionCanonicalIdentity } | undefined {
  if (typeName === undefined) {
    return undefined;
  }
  if (typeName.Kind === KindQualifiedName) {
    return resolveQualifiedPrimitiveFromImportIndex(typeName, importIndex, primitivesByExportName)
      ?? resolveQualifiedPrimitiveReference(facts, typeName, modules, primitivesByExportName);
  }

  const indexedPrimitive = resolvePrimitiveFromImportIndex(typeName, importIndex);
  if (indexedPrimitive !== undefined) {
    return indexedPrimitive;
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

function resolvePrimitiveFromImportIndex(
  typeName: GoPtr<Node>,
  importIndex: SourceCoreMarkerImportIndex | undefined,
): { readonly moduleIdentity: SourceCoreModuleIdentity; readonly exportName: string; readonly primitiveFact: SourcePrimitiveDeclaration; readonly identity: ExtensionCanonicalIdentity } | undefined {
  if (typeName === undefined || importIndex === undefined) {
    return undefined;
  }
  const binding = importIndex.primitivesByLocalName.get(Node_Text(typeName));
  if (binding === undefined) {
    return undefined;
  }
  const symbol = Node_Symbol(typeName);
  return {
    ...binding,
    identity: createExportIdentity(binding.moduleIdentity, binding.exportName, "type", symbol === undefined ? `${binding.moduleIdentity.moduleSpecifier}::${binding.exportName}` : getSymbolFactId(symbol)),
  };
}

function resolveQualifiedPrimitiveFromImportIndex(
  typeName: GoPtr<Node>,
  importIndex: SourceCoreMarkerImportIndex | undefined,
  primitivesByExportName: ReadonlyMap<string, SourcePrimitiveDeclaration>,
): { readonly moduleIdentity: SourceCoreModuleIdentity; readonly exportName: string; readonly primitiveFact: SourcePrimitiveDeclaration; readonly identity: ExtensionCanonicalIdentity } | undefined {
  if (typeName === undefined || importIndex === undefined) {
    return undefined;
  }
  const qualifiedName = AsQualifiedName(typeName);
  const moduleIdentity = importIndex.namespacesByLocalName.get(Node_Text(qualifiedName?.Left));
  if (moduleIdentity === undefined || !moduleSupports(moduleIdentity, "primitive")) {
    return undefined;
  }
  const right = qualifiedName!.Right;
  const exportName = Node_Text(right);
  const primitiveFact = primitivesByExportName.get(exportName);
  if (primitiveFact === undefined) {
    return undefined;
  }
  const symbol = Node_Symbol(right);
  return {
    moduleIdentity,
    exportName,
    primitiveFact,
    identity: createExportIdentity(moduleIdentity, exportName, "type", symbol === undefined ? `${moduleIdentity.moduleSpecifier}::${exportName}` : getSymbolFactId(symbol)),
  };
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

function visitSourceCoreNodePost(node: GoPtr<Node>, visit: (node: GoPtr<Node>) => void): void {
  if (node === undefined) {
    return;
  }
  Node_ForEachChild(node, (child: GoPtr<Node>) => {
    visitSourceCoreNodePost(child, visit);
    return false as bool;
  });
  visit(node);
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

function recordSourceCoreSymbolImport(
  facts: ExtensionFactStore,
  importSpecifier: GoPtr<Node>,
  moduleIdentity: SourceCoreModuleIdentity,
  exportName: string,
  importKind: ExtensionImportKind,
): void {
  const localSymbol = Node_Symbol(importSpecifier);
  if (localSymbol === undefined) {
    return;
  }
  const identity = createExportIdentity(moduleIdentity, exportName, importKind, getSymbolFactId(localSymbol));
  facts.set(importSpecifier, canonicalIdentityFactKey, identity, createModuleEvidence(moduleIdentity));
  facts.set(localSymbol, canonicalIdentityFactKey, identity, createModuleEvidence(moduleIdentity));
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

function createMarkerEvidence(exportName: string): readonly ExtensionEvidence[] {
  return [{
    message: "source core marker",
    details: { exportName },
  }];
}

function getTypeReferenceNameText(node: GoPtr<Node>): string {
  if (node?.Kind === KindTypeReference) {
    return getTypeReferenceNameText(AsTypeReferenceNode(node)?.TypeName);
  }
  if (node?.Kind === KindQualifiedName) {
    const qualifiedName = AsQualifiedName(node);
    const left = getTypeReferenceNameText(qualifiedName?.Left);
    const right = getTypeReferenceNameText(qualifiedName?.Right);
    return left === "" ? right : `${left}.${right}`;
  }
  return Node_Text(node);
}

function moduleSupports(moduleIdentity: SourceCoreModuleIdentity, capability: SourceCoreModuleCapability): boolean {
  return moduleIdentity.capabilities?.includes(capability) ?? true;
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
