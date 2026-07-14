import path from "node:path";

import { compareText } from "../deterministic-order.mjs";
import { safeIdentifier } from "../names.mjs";
import { requirePorterUnitOwnership } from "../unit-ownership.mjs";
import { requireGeneratorOwnedGoValueOperationCatalog } from "./generator-owned-providers.mjs";
import { requireReviewedGoValueOperationCatalog } from "./reviewed-providers.mjs";
import { buildGoValueOperationCatalog } from "./shape-plan.mjs";
import { directUnitStorageIdentity } from "./storage-identity.mjs";
import { requireAuditedTypeStorageCatalog } from "../../sig-check/audited-type-storage.mjs";

const inputKeys = Object.freeze([
  "auditedStorage",
  "config",
  "generatorOwnedProviders",
  "largeFileSplits",
  "reviewedProviders",
  "snapshot",
  "tsUnits",
  "unitOwnership",
]);
const intrinsicProviders = new Map([
  ["builtin::type::any", intrinsicInterfaceProvider("any")],
  ["builtin::type::error", intrinsicInterfaceProvider("error")],
]);
const intrinsicRequirements = new Map([...intrinsicProviders].map(([objectId, provider]) => [objectId, Object.freeze({
  disposition: provider.disposition,
  operationTypeParameterIndexes: provider.operationTypeParameterIndexes,
  typeParameterCount: provider.typeParameterCount,
})]));

export class FinalizedGoValueOperationPlan {
  #config;
  #entries;
  #generated;
  #providers;
  #snapshot;

  constructor(config, snapshot, entries, generated, providers) {
    this.#config = config;
    this.#snapshot = snapshot;
    this.#entries = new Map(entries.map((entry) => [entry.objectId, entry]));
    for (const provider of providers) {
      const existing = this.#entries.get(provider.objectId);
      if (existing !== undefined && existing !== provider) {
        throw new Error(`Go value-operation plan has conflicting entries for '${provider.objectId}'`);
      }
      this.#entries.set(provider.objectId, provider);
    }
    this.#generated = Object.freeze([...generated]);
    this.#providers = Object.freeze([...providers]);
    Object.freeze(this);
  }

  get size() { return this.#entries.size; }
  get generatedCount() { return this.#generated.length; }
  get providerCount() { return this.#providers.length; }
  get(objectId) { return this.#entries.get(objectId); }
  entries() { return this.#entries.values(); }
  generated(config, snapshot) { this.#requireInputs(config, snapshot); return this.#generated; }
  providers(config, snapshot) { this.#requireInputs(config, snapshot); return this.#providers; }
  require(config, snapshot) { this.#requireInputs(config, snapshot); return this; }

  #requireInputs(config, snapshot) {
    if (config !== this.#config || snapshot !== this.#snapshot) {
      throw new Error("Go value-operation plan was built from different config or snapshot objects");
    }
  }
}

export function buildGoValueOperationPlan(input) {
  requireExactInput(input, inputKeys, "Go value-operation plan input");
  const { auditedStorage, config, generatorOwnedProviders, largeFileSplits, reviewedProviders, snapshot, tsUnits, unitOwnership } = input;
  requirePorterUnitOwnership(unitOwnership, { config, largeFileSplits, snapshot, tsUnits });
  requireReviewedGoValueOperationCatalog(reviewedProviders, config, snapshot);
  requireGeneratorOwnedGoValueOperationCatalog(generatorOwnedProviders, config, snapshot);
  requireAuditedTypeStorageCatalog(auditedStorage, { config, snapshot, unitOwnership });
  requireCleanTypeOwnership(unitOwnership);

  const providers = mergeProviderRequirements(
    intrinsicRequirements,
    reviewedProviders.requirements(config, snapshot),
    generatorOwnedProviders.requirements(config, snapshot),
  );
  const implementedTypes = unitOwnership.implementedUnits.filter((entry) => entry.goUnit.kind === "type");
  const catalog = buildGoValueOperationCatalog(implementedTypes.map((entry) => entry.goUnit), { providers });
  const ownershipByUnit = new Map(implementedTypes.map((entry) => [entry.goUnit.id, entry]));
  const operationOwners = new Map();
  const entries = catalog.entries.map((entry) => {
    const ownership = ownershipByUnit.get(entry.unitId);
    if (ownership === undefined) throw new Error(`Go value operation '${entry.objectId}' has no finalized TypeScript ownership`);
    const storageIdentity = directUnitStorageIdentity(config, ownership.tsUnit, entry.objectId);
    const storageAudit = auditedStorage.get(entry.objectId);
    if (storageAudit === undefined) throw new Error(`Go value operation '${entry.objectId}' has no audited TypeScript storage declaration`);
    if (storageAudit.storageIdentity !== storageIdentity) {
      throw new Error(`Go value operation '${entry.objectId}' audit storage '${storageAudit.storageIdentity}' differs from direct declaration '${storageIdentity}'`);
    }
    const provider = providerEvidence(entry.objectId, entry.disposition, reviewedProviders, generatorOwnedProviders);
    if (provider?.storageIdentity !== undefined && provider.storageIdentity !== storageIdentity) {
      throw new Error(`Go value operation '${entry.objectId}' provider storage '${provider.storageIdentity}' differs from direct declaration '${storageIdentity}'`);
    }
    if (entry.disposition === "generated" && !storageAudit.exact) {
      throw new Error(`Go value operation '${entry.objectId}' uses adapted TypeScript storage and requires one reviewed operation provider`);
    }
    const operationIdentity = entry.disposition === "generated"
      ? generatedOperationIdentity(config, ownership.goUnit, entry.name)
      : provider.operationIdentity;
    claimOperationIdentity(operationOwners, operationIdentity, entry.objectId);
    return Object.freeze({
      ...entry,
      operationIdentity,
      sourceUnit: ownership.goUnit,
      storageAudit,
      storageIdentity,
      tsPath: ownership.tsUnit.path,
      ...(provider === undefined ? {} : { provider }),
    });
  }).sort((left, right) => compareText(left.objectId, right.objectId));

  const usedProviderIds = new Set(catalog.usedProviderObjectIds);
  requireAllConfiguredProvidersUsed(reviewedProviders, usedProviderIds, "reviewed");
  requireAllConfiguredProvidersUsed(generatorOwnedProviders, usedProviderIds, "generator-owned");
  const localObjectIds = new Set(entries.map((entry) => entry.objectId));
  const externalProviders = catalog.usedProviderObjectIds
    .filter((objectId) => !localObjectIds.has(objectId))
    .map((objectId) => {
      const intrinsic = intrinsicProviders.get(objectId);
      if (intrinsic !== undefined) return intrinsic;
      const reviewed = reviewedProviders.get(objectId);
      if (reviewed !== undefined) return reviewed;
      const generated = generatorOwnedProviders.get(objectId);
      if (generated !== undefined) return generated;
      throw new Error(`used Go value-operation provider '${objectId}' has no finalized evidence`);
    });
  for (const provider of externalProviders) {
    if (provider.disposition !== "intrinsic" && provider.operationIdentity !== undefined) {
      claimOperationIdentity(operationOwners, provider.operationIdentity, provider.objectId);
    }
  }
  const generated = entries.filter((entry) => entry.disposition === "generated");
  const providerEntries = [
    ...entries.filter((entry) => entry.disposition !== "generated"),
    ...externalProviders,
  ].sort((left, right) => compareText(left.objectId, right.objectId));
  return new FinalizedGoValueOperationPlan(config, snapshot, entries, generated, providerEntries);
}

export function requireGoValueOperationPlan(value, config, snapshot) {
  if (!(value instanceof FinalizedGoValueOperationPlan)) throw new Error("artifact rendering requires one finalized Go value-operation plan");
  return value.require(config, snapshot);
}

function requireCleanTypeOwnership(ownership) {
  const failures = [
    ...ownership.missing.filter((row) => row.kind === "type"),
    ...ownership.stale.filter((row) => row.kind === "type"),
    ...ownership.stubbed.filter((row) => row.kind === "type"),
  ];
  if (failures.length > 0) throw new Error(`Go value-operation planning requires every active type declaration to be implemented and current; found ${failures.length}`);
  if (ownership.duplicateGoIDs.length > 0 || ownership.duplicateTsIDs.length > 0 || ownership.invalidTsMetadata.length > 0 || ownership.splitPathMismatches.length > 0) {
    throw new Error("Go value-operation planning requires unambiguous finalized declaration ownership");
  }
}

function mergeProviderRequirements(...catalogs) {
  const result = new Map();
  for (const catalog of catalogs) {
    for (const [objectId, provider] of catalog) {
      if (result.has(objectId)) throw new Error(`Go value-operation provider '${objectId}' has multiple dispositions`);
      result.set(objectId, provider);
    }
  }
  return result;
}

function generatedOperationIdentity(config, goUnit, typeName) {
  const modulePath = config.goModulePath;
  const packagePath = goUnit.file.importPath;
  const relativePackage = packagePath === modulePath
    ? "root"
    : packagePath.startsWith(`${modulePath}/`) ? packagePath.slice(modulePath.length + 1) : undefined;
  if (relativePackage === undefined || relativePackage.includes("\\") || path.posix.isAbsolute(relativePackage) ||
      path.posix.normalize(relativePackage) !== relativePackage || relativePackage.split("/").some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new Error(`generated Go value operation package '${packagePath}' is outside module '${modulePath}'`);
  }
  const exportName = safeIdentifier(`${typeName}ValueOps`);
  return `${config.tsRoot.replace(/\/+$/, "")}/go/value-ops/${relativePackage}.ts::${exportName}`;
}

function providerEvidence(objectId, disposition, reviewed, generatorOwned) {
  if (disposition === "generated") return undefined;
  if (disposition === "reviewed") {
    const provider = reviewed.get(objectId);
    if (provider === undefined) throw new Error(`reviewed Go value operation '${objectId}' has no reviewed evidence`);
    return provider;
  }
  if (disposition === "generator-owned") {
    const provider = generatorOwned.get(objectId);
    if (provider === undefined) throw new Error(`generator-owned Go value operation '${objectId}' has no generator evidence`);
    return provider;
  }
  throw new Error(`local Go type '${objectId}' cannot use intrinsic provider disposition`);
}

function requireAllConfiguredProvidersUsed(catalog, used, label) {
  const unused = [...catalog].map(([objectId]) => objectId).filter((objectId) => !used.has(objectId));
  if (unused.length > 0) throw new Error(`${label} Go value-operation provider(s) were not consumed: ${unused.sort(compareText).join(", ")}`);
}

function claimOperationIdentity(owners, identity, objectId) {
  const previous = owners.get(identity);
  if (previous !== undefined) throw new Error(`Go value operation '${identity}' is shared by '${previous}' and '${objectId}'`);
  owners.set(identity, objectId);
}

function intrinsicInterfaceProvider(name) {
  const objectId = `builtin::type::${name}`;
  return Object.freeze({
    disposition: "intrinsic",
    objectId,
    operationIdentity: "packages/tsts/src/go/compat.ts::GoInterfaceValueOps",
    operationTypeParameterIndexes: Object.freeze([]),
    typeParameterCount: 0,
  });
}

function requireExactInput(value, expectedKeys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const actual = Object.keys(value).sort(compareText);
  const expected = [...expectedKeys].sort(compareText);
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
  for (const key of expected) if (value[key] === undefined) throw new Error(`${label}.${key} must be defined`);
}
