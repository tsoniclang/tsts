import { createHash } from "node:crypto";

import { requireFinalizedExternalFacadeStorageCatalog } from "./external-facades.mjs";
import {
  renderCanonicalSignature,
  renderCanonicalType,
  renderCanonicalTypeParameters,
} from "./canonical-type-renderer.mjs";
import { compareText } from "./deterministic-order.mjs";
import { blankValueName, localTsName, safeIdentifier, safePropertyName, uniqueName } from "./names.mjs";
import { buildSymbolIndex, fileFromUnit, importAliasMap, relativeImportPath } from "./render-indexes.mjs";
import { invariantSemanticVariant } from "./semantic-variants.mjs";
import { semanticTypeContexts } from "./semantic-type-nilability.mjs";
import {
  invariantSemanticDeclarationContext,
  invariantSemanticSignatureContract,
  invariantSemanticTypeContract,
} from "../ts-extractor/semantic-carrier-rendering.mjs";
import { semanticTypeDeclarationContract } from "../ts-extractor/semantic-named-nilability.mjs";
import { addProfileSemanticStorageEvidence, buildTypeRepresentationEvidence } from "../ts-extractor/semantic-pointer-lowering.mjs";
import { semanticContractContainsApproximation, semanticTypeParameterKey } from "../ts-extractor/semantic-type-contract.mjs";
import { loadProfile } from "../ts-extractor/profile.mjs";
import { buildTypeStorageIdentityMap } from "./type-storage-policies.mjs";
import { isSemanticPrimaryUnitKind } from "./unit-kinds.mjs";
import { canonicalStructFieldLayout } from "./struct-field-layout.mjs";

export function renderUnitGroup(config, snapshot, relativeTargetPath, units, options = {}) {
  requireOnlyRendererOptions(options);
  for (const unit of units) {
    if (!isSemanticPrimaryUnitKind(unit.kind)) {
      throw new Error(`cannot render scaffold for non-portable Go unit kind '${unit.kind}': ${unit.id}`);
    }
  }
  const context = createSemanticRendererContext(config, snapshot, relativeTargetPath, units, options);
  const body = units.map((unit) => renderUnit(unit, context)).join("\n");
  return `${renderImports(context)}${body}`.replace(/\s*$/, "\n");
}

function requireOnlyRendererOptions(options) {
  const allowed = new Set(["diagnostics", "externalFacadeCatalog", "filesByPath", "largeFileSplits", "localTopLevelNames", "symbolIndex"]);
  const unknown = Reflect.ownKeys(options).filter((key) => typeof key !== "string" || !allowed.has(key)).map(String).sort();
  if (unknown.length > 0) throw new Error(`unit renderer options contain unknown current-contract key(s): ${unknown.join(", ")}`);
  if (!Object.hasOwn(options, "largeFileSplits") || options.largeFileSplits === undefined) {
    throw new Error("unit renderer options must contain finalized largeFileSplits evidence");
  }
}

export function createSemanticRendererContext(config, snapshot, relativeTargetPath, units, options = {}) {
  requireOnlyRendererOptions(options);
  const filesByPath = options.filesByPath ?? new Map(snapshot.files.map((file) => [file.path, file]));
  const largeFileSplits = options.largeFileSplits;
  const symbolIndex = options.symbolIndex ?? buildSymbolIndex(config, snapshot, largeFileSplits);
  const firstUnit = units[0];
  const file = filesByPath.get(firstUnit?.metadata?.goPath ?? "") ?? fileFromUnit(firstUnit);
  const externalFacadeCatalog = requireFinalizedExternalFacadeStorageCatalog(options.externalFacadeCatalog, config, snapshot);
  const externalFacades = externalFacadeCatalog.artifactFacades(config, snapshot);
  const profile = loadProfile(config);
  const evidence = addProfileSemanticStorageEvidence(
    buildTypeRepresentationEvidence(config, snapshot, externalFacades),
    profile,
    buildTypeStorageIdentityMap(config, snapshot),
  );
  const semanticIndex = {
    goModule: config.goModulePath,
    core: profile.modules.core,
    compat: profile.modules.compat,
    bridge: profile.bridge,
    primKeyword: profile.primitives.keyword,
    primCore: profile.primitives.core,
    primCompat: profile.primitives.compat,
    declaredTypeContractsByProfile: evidence.declaredTypeContractsByProfile,
    externalTypeContracts: evidence.externalTypeContracts,
    dependencyTypeContractsByProfile: evidence.dependencyTypeContractsByProfile,
    dependencyPointerTerminalsByProfile: evidence.dependencyPointerTerminalsByProfile,
    externalFacadeArities: evidence.externalFacadeArities,
    namedTypeStorage: evidence.namedTypeStorage,
    rawInterfaceObjects: evidence.rawInterfaceObjects,
    storageCarrierByIdentity: evidence.storageCarrierByIdentity,
    knownStorageIdentities: evidence.knownStorageIdentities,
  };
  const localTopLevelNames = options.localTopLevelNames ?? new Set(units.flatMap((unit) => topLevelNamesForUnit(unit)));
  if (!(localTopLevelNames instanceof Set) || [...localTopLevelNames].some((name) => typeof name !== "string" || name === "")) {
    throw new Error("semantic renderer localTopLevelNames must be one Set of non-empty strings");
  }
  return {
    config,
    snapshot,
    semanticIndex,
    symbolIndex,
    file,
    relativeTargetPath,
    imports: new Map(),
    valueImports: new Map(),
    coreImports: new Set(),
    compatImports: new Set(),
    diagnostics: options.diagnostics ?? [],
    localTopLevelNames: new Set(localTopLevelNames),
    importAliases: rendererImportAliases(file.imports ?? []),
    externalFacades,
    bridge: profile.bridge,
  };
}

export function renderUnit(unit, context) {
  const metadata = { id: unit.id, kind: unit.kind, status: "stub", sigHash: unit.sigHash };
  const header = `/**\n * @tsgo-unit ${JSON.stringify(metadata)}\n */\n`;
  if (unit.kind === "type") return `${header}${renderTypeUnit(unit, context)}\n`;
  if (unit.kind === "func" || unit.kind === "method") return `${header}${renderFunctionUnit(unit, context)}\n`;
  if (unit.kind === "constGroup") return `${header}${renderValueGroup(unit, context, "const")}\n`;
  if (unit.kind === "varGroup") return `${header}${renderValueGroup(unit, context, "let")}\n`;
  throw new Error(`unsupported unit kind ${unit.kind}`);
}

export function renderTypeUnit(unit, context) {
  const semantic = invariantSemanticVariant(unit, "rendered as one TypeScript type declaration");
  const declaration = semantic.type;
  if (declaration === undefined) throw new Error(`canonical Go type declaration semantics are missing for ${unit.id}`);
  semanticTypeDeclarationContract(declaration, `Go type unit '${unit.id}'`);
  const declarationContext = invariantSemanticDeclarationContext(declaration, context, unit);
  const constraints = new Map(declarationContext.typeParameterConstraints);
  const typeParameters = renderDeclarationTypeParameters(
    declarationContext.parameters,
    unit.typeParameterDetails,
    context,
    unit,
  );
  const name = safeIdentifier(unit.name);

  if (declaration.alias === true) {
    const rhs = invariantSemanticTypeContract(declaration.rhs, context, unit, semanticTypeContexts.declarationShape, {
      typeParameterConstraints: constraints,
    });
    return `export type ${name}${typeParameters} = ${renderSemanticContract(rhs, context, unit)};`;
  }
  if (declaration.rhs.kind === "struct") {
    const shape = invariantSemanticTypeContract(declaration.rhs, context, unit, semanticTypeContexts.declarationShape, {
      typeParameterConstraints: constraints,
    });
    const members = renderStructDeclaration(shape, unit.members, context, unit);
    return `export interface ${name}${typeParameters} {\n${members.join("\n")}\n}`;
  }
  if (declaration.rhs.kind === "interface") {
    const shape = invariantSemanticTypeContract(declaration.rhs, context, unit, semanticTypeContexts.constraint, {
      typeParameterConstraints: constraints,
    });
    const { heritage, members } = renderInterfaceDeclaration(shape, unit.members, context, unit);
    const extendsClause = heritage.length === 0 ? "" : ` extends ${heritage.join(", ")}`;
    return `export interface ${name}${typeParameters}${extendsClause} {\n${members.join("\n")}\n}`;
  }
  const rhs = invariantSemanticTypeContract(declaration.rhs, context, unit, semanticTypeContexts.declarationShape, {
    typeParameterConstraints: constraints,
  });
  return `export type ${name}${typeParameters} = ${renderSemanticContract(rhs, context, unit)};`;
}

export function renderFunctionUnit(unit, context) {
  const semantic = invariantSemanticVariant(unit, "rendered as one TypeScript callable declaration");
  if (semantic.signature === undefined) throw new Error(`canonical Go callable semantics are missing for ${unit.id}`);
  const signature = invariantSemanticSignatureContract(semantic.signature, context, unit, { includeReceiver: unit.kind === "method" });
  const typeParameters = renderSignatureTypeParameters(signature, unit.typeParameterDetails, context, unit);
  const operations = semanticRendererOperations(context, unit);
  const { parameters, returnType } = renderCanonicalSignature(signature, operations, { includeReceiver: unit.kind === "method" });
  return `export function ${localTsName(unit)}${typeParameters}(${parameters.join(", ")}): ${returnType} {\n  throw new globalThis.Error(${JSON.stringify(`TSGO_UNIMPLEMENTED ${unit.id}`)});\n}`;
}

export function renderValueGroup(unit, context, declarationKind) {
  const semantic = invariantSemanticVariant(unit, "rendered as one TypeScript value declaration");
  const lines = [];
  let blankIndex = 0;
  const usedNames = new Set();
  for (const [specIndex, spec] of (unit.valueSpecs ?? []).entries()) {
    const semanticSpec = semantic.valueSpecs?.[specIndex];
    if (semanticSpec === undefined) throw new Error(`canonical Go value declaration semantics are missing for ${unit.id} spec ${specIndex}`);
    const names = spec.names ?? [];
    if (names.length === 0) throw new Error(`Go value declaration ${unit.id} spec ${specIndex} has no bindings`);
    for (const [nameIndex, name] of names.entries()) {
      const binding = semanticSpec.names?.[nameIndex];
      if (binding === undefined || binding.name !== name || binding.type === undefined) {
        throw new Error(`canonical Go value binding ${unit.id} spec ${specIndex} name ${nameIndex} is incomplete`);
      }
      const baseName = name === "_" ? blankValueName(unit, blankIndex++) : safeIdentifier(name);
      const localName = uniqueName(baseName, usedNames);
      const contract = invariantSemanticTypeContract(binding.type, context, unit, semanticTypeContexts.value);
      lines.push(`export ${declarationKind} ${localName}: ${renderSemanticContract(contract, context, unit)} = undefined as never;`);
    }
  }
  if (lines.length === 0) throw new Error(`Go value declaration ${unit.id} has no value specifications`);
  return lines.join("\n");
}

export function tsCanonicalType(type, context, _scope, unit, options = {}) {
  const contract = invariantSemanticTypeContract(type, context, unit, options.typeContext ?? semanticTypeContexts.value, {
    typeParameterConstraints: options.typeParameterConstraints,
  });
  return renderSemanticContract(contract, context, unit);
}

function renderStructDeclaration(shape, sourceMembers, context, unit) {
  if (shape.kind !== "struct") throw new Error(`Go struct unit '${unit.id}' did not lower to a struct shape`);
  if (!Array.isArray(sourceMembers) || sourceMembers.length !== shape.fields.length) throw new Error(`Go struct unit '${unit.id}' syntax/semantic field counts differ`);
  const members = canonicalStructFieldLayout(shape.fields, `Go struct unit '${unit.id}' semantic fields`).map(({ field, index, name }) => {
    const source = sourceMembers[index];
    const expectedKind = field.embedded ? "embeddedField" : "field";
    if (source?.kind !== expectedKind || (!field.embedded && source.name !== field.name)) throw new Error(`Go struct unit '${unit.id}' syntax/semantic field #${index} differs`);
    return `  ${safePropertyName(name)}: ${renderSemanticContract(field.type, context, unit)};`;
  });
  return members.length === 0 ? ["  readonly __tsgoEmpty?: never;"] : members;
}

function renderInterfaceDeclaration(shape, sourceMembers, context, unit) {
  if (shape.kind !== "interfaceShape") throw new Error(`Go interface unit '${unit.id}' did not lower to an interface shape`);
  if (!Array.isArray(sourceMembers)) throw new Error(`Go interface unit '${unit.id}' has no syntax member order`);
  const heritage = [];
  const members = [];
  let methodIndex = 0;
  let embeddedIndex = 0;
  for (const source of sourceMembers) {
    if (source?.kind === "method") {
      const method = shape.methods[methodIndex++];
      if (method === undefined || method.name !== source.name) throw new Error(`Go interface unit '${unit.id}' syntax/semantic method order differs`);
      const typeParameters = renderSignatureTypeParameters(method.signature, [], context, unit);
      const rendered = renderCanonicalSignature(method.signature, semanticRendererOperations(context, unit));
      members.push(`  ${safePropertyName(method.name)}${typeParameters}(${rendered.parameters.join(", ")}): ${rendered.returnType};`);
      continue;
    }
    if (source?.kind !== "embeddedInterface") throw new Error(`Go interface unit '${unit.id}' has unsupported syntax member '${source?.kind}'`);
    const embedded = shape.embedded[embeddedIndex++];
    if (embedded === undefined) throw new Error(`Go interface unit '${unit.id}' has more syntax embeddings than semantic embeddings`);
    const rendered = renderSemanticContract(embedded.type, context, unit);
    if (embedded.embeddingKind === "interface") heritage.push(rendered);
    else members.push(`  readonly __tsgoEmbedded${embeddedIndex - 1}?: ${rendered};`);
  }
  if (methodIndex !== shape.methods.length || embeddedIndex !== shape.embedded.length) throw new Error(`Go interface unit '${unit.id}' syntax/semantic member counts differ`);
  if (members.length === 0) members.push("  readonly __tsgoEmpty?: never;");
  return { heritage, members };
}

function renderDeclarationTypeParameters(parameters, sourceParameters, context, unit) {
  return renderCanonicalTypeParameters(parameters, typeParameterRenderingOperations(
    semanticRendererOperations(context, unit),
    parameters,
    sourceParameters,
    unit,
  ));
}

function renderSignatureTypeParameters(signature, sourceParameters, context, unit) {
  const parameters = [...signature.receiverTypeParameters, ...signature.typeParameters];
  return renderCanonicalTypeParameters(parameters, typeParameterRenderingOperations(
    semanticRendererOperations(context, unit),
    signature.typeParameters,
    sourceParameters,
    unit,
  ));
}

function sourceConstraintMap(parameters, sourceParameters, unit) {
  const output = new Map();
  for (const [index, parameter] of parameters.entries()) {
    const source = sourceParameters?.[index];
    if (source !== undefined && source.name !== parameter.reference.name) throw new Error(`Go source and semantic type parameter #${index} names differ for ${unit.id}`);
    if (source?.constraint !== undefined) output.set(semanticTypeParameterKey(parameter.reference), source.constraint);
  }
  return output;
}

export function typeParameterRenderingOperations(operations, parameters, sourceParameters, unit) {
  const sourceByName = sourceConstraintMap(parameters, sourceParameters, unit);
  return {
    ...operations,
    constraint: (contract, parameter) => renderConstraint(contract, sourceByName.get(semanticTypeParameterKey(parameter.reference)), operations),
  };
}

function renderConstraint(contract, sourceConstraint, operations) {
  const rendered = renderCanonicalType(contract, operations);
  if (!semanticContractContainsApproximation(contract)) return rendered;
  if (typeof sourceConstraint?.text !== "string" || sourceConstraint.text === "") throw new Error("canonical Go approximation constraint has no exact source text provenance");
  return `${operations.compat("GoConstraint")}<${JSON.stringify(sourceConstraint.text)}> & ${rendered}`;
}

function renderSemanticContract(contract, context, unit) {
  return renderCanonicalType(contract, semanticRendererOperations(context, unit));
}

export function semanticRendererOperations(context, unit) {
  return {
    basic: (name) => renderBasic(name, context),
    carrier: (key) => useCompat(context, requireBridge(context, key)),
    pointerCarrier: (representation) => {
      return useCompat(context, requireBridge(context, pointerBridgeKey(representation)));
    },
    compat: (name) => useCompat(context, name),
    reference: (reference, argumentsList) => renderReference(reference, argumentsList, context, unit),
    approximation: (contract, rendered) => primitiveApproximation(contract) ?? rendered,
  };
}

function renderBasic(name, context) {
  const index = context.semanticIndex;
  if (Object.hasOwn(index.primKeyword, name)) return index.primKeyword[name];
  if (Object.hasOwn(index.primCore, name)) return useCore(context, index.primCore[name]);
  if (Object.hasOwn(index.primCompat, name)) return useCompat(context, index.primCompat[name]);
  throw new Error(`unmapped canonical Go basic type '${name}'`);
}

function renderReference(reference, argumentsList, context, unit) {
  let base;
  if (reference.packagePath === "") {
    base = renderBasic(reference.name, context);
  } else {
    const storageIdentity = context.semanticIndex.namedTypeStorage.get(reference.objectId);
    if (storageIdentity !== undefined) {
      base = renderStorageIdentity(storageIdentity, context, unit);
    } else if (isInternal(reference.packagePath, context.config.goModulePath)) {
      base = resolvePackageSymbol(context, reference.packagePath, reference.name, unit);
      if (base === undefined) throw new Error(`internal canonical Go type '${reference.objectId}' has no exact scaffold symbol`);
    } else {
      if (context.semanticIndex.externalTypeContracts.has(reference.objectId)) return tsExternalType(context, reference, argumentsList, unit);
      throw new Error(`canonical Go type '${reference.objectId}' has no exact profile storage identity`);
    }
  }
  return argumentsList.length === 0 ? base : `${base}<${argumentsList.join(", ")}>`;
}

function renderStorageIdentity(identity, context, unit) {
  const separator = identity.lastIndexOf("::");
  if (separator <= 0 || separator === identity.length - 2) throw new Error(`invalid exact TypeScript storage identity '${identity}'`);
  const moduleId = identity.slice(0, separator);
  const name = identity.slice(separator + 2);
  if (moduleId === context.semanticIndex.core) return useCore(context, name);
  if (moduleId === context.semanticIndex.compat) return useCompat(context, name);
  if (moduleId === context.relativeTargetPath) return safeIdentifier(name);
  return importTypeName(context, moduleId, name, unit);
}

export function tsExternalType(context, reference, typeArguments, unit) {
  const objectId = reference?.objectId;
  if (typeof objectId !== "string" || objectId === "") throw new Error("external Go type has no exact object identity");
  if (!Array.isArray(typeArguments)) throw new Error(`external Go type '${objectId}' requires one exact rendered type-argument list`);
  const facade = context.externalFacades.get(objectId);
  if (facade === undefined) throw new Error(`external Go type '${objectId}' has no exact facade storage`);
  const expectedArity = context.semanticIndex.externalFacadeArities.get(objectId);
  if (expectedArity === undefined || typeArguments.length !== expectedArity) {
    throw new Error(`external Go type '${objectId}' expected exact facade arity '${expectedArity ?? "missing"}', got ${typeArguments.length}`);
  }
  const base = importExternalFacadeName(context, facade, unit);
  return typeArguments.length === 0 ? base : `${base}<${typeArguments.join(", ")}>`;
}

function primitiveApproximation(contract) {
  if (contract?.kind !== "basic") return undefined;
  if (contract.name === "bool") return "boolean";
  if (contract.name === "string") return "string";
  if (new Set(["int", "int8", "int16", "int32", "int64", "uint", "uint8", "uint16", "uint32", "uint64", "uintptr", "float32", "float64"]).has(contract.name)) return "number";
  return undefined;
}

export function topLevelNamesForUnit(unit) {
  if (unit.kind === "type" || unit.kind === "func" || unit.kind === "method") return [localTsName(unit), safeIdentifier(unit.name)];
  if (unit.kind === "constGroup" || unit.kind === "varGroup") {
    const names = (unit.valueSpecs ?? []).flatMap((spec) => (spec.names ?? []).filter((name) => name !== "_").map(safeIdentifier));
    return names.length > 0 ? names : [localTsName(unit)];
  }
  return [localTsName(unit)];
}

export function resolvePackageSymbol(context, importPath, name, unit) {
  const symbol = context.symbolIndex.get(`${importPath}::${name}`);
  if (symbol === undefined) return undefined;
  if (!symbol.active) throw new Error(`internal Go type '${symbol.goName}' is excluded and has no active semantic scaffold declaration`);
  if (symbol.targetPath === context.relativeTargetPath) return safeIdentifier(symbol.exportName);
  return importTypeName(context, symbol.targetPath, symbol.exportName, unit);
}

export function importTypeName(context, targetPath, exportName, unit) {
  const source = relativeImportPath(context.relativeTargetPath, targetPath);
  const valueNames = context.valueImports?.get(source);
  const safeExport = safeIdentifier(exportName);
  const valueAlias = valueNames?.get(safeExport);
  if (valueAlias !== undefined) return valueAlias;
  const names = context.imports.get(source) ?? new Map();
  context.imports.set(source, names);
  const existing = names.get(safeExport);
  if (existing !== undefined) return existing;
  const alias = context.localTopLevelNames.has(safeExport) || isImportAliasUsed(context, safeExport)
    ? allocateImportAlias(context, safeExport, unit, targetPath) : safeExport;
  names.set(safeExport, alias);
  return alias;
}

export function importValueName(context, targetPath, exportName, unit) {
  if (!(context.valueImports instanceof Map)) throw new Error("semantic renderer context has no runtime-value import registry");
  if (targetPath === context.relativeTargetPath) return safeIdentifier(exportName);
  const source = relativeImportPath(context.relativeTargetPath, targetPath);
  const safeExport = safeIdentifier(exportName);
  const names = context.valueImports.get(source) ?? new Map();
  context.valueImports.set(source, names);
  const existing = names.get(safeExport);
  if (existing !== undefined) return existing;
  const typeNames = context.imports.get(source);
  const typeAlias = typeNames?.get(safeExport);
  if (typeAlias !== undefined) {
    typeNames.delete(safeExport);
    names.set(safeExport, typeAlias);
    return typeAlias;
  }
  const alias = context.localTopLevelNames.has(safeExport) || isImportAliasUsed(context, safeExport)
    ? allocateImportAlias(context, safeExport, unit, targetPath) : safeExport;
  names.set(safeExport, alias);
  return alias;
}

export function renderImports(context) {
  const lines = [];
  for (const [source, names] of [...(context.valueImports ?? new Map()).entries()].sort()) {
    if (names.size === 0) continue;
    const specifiers = renderImportSpecifiers(names);
    lines.push(`import { ${specifiers} } from "${source}";`);
  }
  if (context.coreImports.size > 0) lines.push(`import type { ${[...context.coreImports].sort().join(", ")} } from "${relativeImportPath(context.relativeTargetPath, `${context.config.tsRoot}/go/scalars.ts`)}";`);
  if (context.compatImports.size > 0) lines.push(`import type { ${[...context.compatImports].sort().join(", ")} } from "${relativeImportPath(context.relativeTargetPath, `${context.config.tsRoot}/go/compat.ts`)}";`);
  for (const [source, names] of [...context.imports.entries()].sort()) {
    if (names.size === 0) continue;
    const specifiers = renderImportSpecifiers(names);
    lines.push(`import type { ${specifiers} } from "${source}";`);
  }
  return lines.length === 0 ? "" : `${lines.join("\n")}\n\n`;
}

export function useCore(context, name) {
  context.coreImports.add(name);
  return name;
}

export function useCompat(context, name) {
  context.compatImports.add(name);
  return name;
}

export function importExternalFacadeName(context, policy, unit) {
  if (!policy.tsModule || !policy.tsName) throw new Error(`external type policy for '${policy.objectId}' must specify tsModule and tsName`);
  if (`${context.config.tsRoot}/${policy.tsModule}` === context.relativeTargetPath) return safeIdentifier(policy.tsName);
  return importTypeName(context, `${context.config.tsRoot}/${policy.tsModule}`, policy.tsName, unit);
}

export function uniqueImportAlias(exportName, unit, targetPath = "") {
  const hash = createHash("sha256").update(`${unit?.id ?? ""}:${targetPath}:${exportName}`).digest("hex").slice(0, 8);
  return `${exportName}_${hash}`;
}

function allocateImportAlias(context, exportName, unit, targetPath) {
  const base = uniqueImportAlias(exportName, unit, targetPath);
  let candidate = base;
  let suffix = 0;
  while (context.localTopLevelNames.has(candidate) || isImportAliasUsed(context, candidate)) {
    candidate = `${base}_${++suffix}`;
  }
  return candidate;
}

export function isImportAliasUsed(context, alias) {
  return [...context.imports.values(), ...(context.valueImports?.values() ?? [])]
    .some((names) => [...names.values()].includes(alias));
}

function renderImportSpecifiers(names) {
  return [...names.entries()].sort(([left], [right]) => compareText(left, right))
    .map(([exportName, alias]) => exportName === alias ? exportName : `${exportName} as ${alias}`).join(", ");
}

function rendererImportAliases(imports) {
  const aliases = importAliasMap(imports);
  for (const imported of imports) if (typeof imported.path === "string" && imported.path !== "") aliases.set(imported.path, imported.path);
  return aliases;
}

function requireBridge(context, key) {
  const carrier = context.bridge[key];
  if (typeof carrier !== "string" || carrier === "") throw new Error(`canonical semantic carrier '${key}' has no exact bridge identity`);
  return carrier;
}

function pointerBridgeKey(representation) {
  if (representation === "aggregate") return "pointer";
  if (representation === "slot") return "ref";
  if (representation === "constraint") return "pointerConstraint";
  throw new Error(`canonical semantic pointer has unknown representation '${representation}'`);
}

function isInternal(importPath, goModule) {
  return importPath === goModule || importPath.startsWith(`${goModule}/`);
}
