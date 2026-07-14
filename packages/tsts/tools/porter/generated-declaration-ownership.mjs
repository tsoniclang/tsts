import { buildAstGeneratedDeclarationOwnerRows } from "./ast-generator/artifacts.mjs";
import { compareText } from "./core/deterministic-order.mjs";
import {
  finalizeGeneratedDeclarationOwners,
  validateGeneratedDeclarationOwnerShape,
} from "./core/generated-declaration-owner-catalog.mjs";
import { exactSemanticTypeObjectId } from "./core/semantic-variants.mjs";
import { buildTypeStorageIdentityMap } from "./core/type-storage-policies.mjs";
import { generatedArtifactProviders, inspectGeneratedArtifactRegistration } from "./generated-artifact-registry.mjs";
import { buildUnicodeGeneratedDeclarationOwnerRows } from "../unicode/declaration-ownership.mjs";

export function buildGeneratedTypeDeclarationOwnership(config, snapshot, moduleIndex) {
  return validateGeneratedTypeDeclarationOwnership(config, snapshot, moduleIndex, [
    ...buildAstGeneratedDeclarationOwnerRows(config, snapshot),
    ...buildUnicodeGeneratedDeclarationOwnerRows(config, snapshot),
  ]);
}

export function validateGeneratedTypeDeclarationOwnership(config, snapshot, moduleIndex, rows) {
  requireModuleIndex(moduleIndex);
  if (!Array.isArray(rows)) throw new Error("generated declaration ownership rows must be one array");
  const unitsById = indexSnapshotUnits(snapshot);
  const storagePolicies = buildTypeStorageIdentityMap(config, snapshot);
  const registeredGenerators = new Set(generatedArtifactProviders.map((provider) => provider.id));
  const owners = [];
  const byObjectId = new Map();
  const byUnitId = new Map();
  const byStorage = new Map();
  const prefix = `${config.tsRoot.replace(/\/+$/, "")}/`;
  for (const row of rows) validateGeneratedDeclarationOwnerShape(row);
  for (const row of [...rows].sort(compareOwnership)) {
    if (!registeredGenerators.has(row.generator)) {
      throw new Error(`generated declaration owner '${row.objectId}' names unregistered generator '${row.generator}'`);
    }
    const record = unitsById.get(row.unitId);
    if (record === undefined) throw new Error(`generated declaration owner '${row.objectId}' references missing Go unit '${row.unitId}'`);
    if (record.unit.kind !== "type" || record.unit.generated !== true || record.file.generated !== true) {
      throw new Error(`generated declaration owner '${row.objectId}' must reference one generated Go type unit`);
    }
    const semanticObjectId = exactSemanticTypeObjectId(record.unit);
    if (semanticObjectId !== row.objectId) {
      throw new Error(`generated declaration owner '${row.objectId}' references Go unit '${row.unitId}' owned by '${semanticObjectId}'`);
    }
    if (record.unit.name !== row.tsName) {
      throw new Error(`generated declaration owner '${row.objectId}' changes source name '${record.unit.name}' to '${row.tsName}'`);
    }
    if (moduleIndex.metadataById.has(row.unitId)) {
      const competing = moduleIndex.metadataById.get(row.unitId);
      throw new Error(`generated Go unit '${row.unitId}' also has @tsgo-unit ownership in '${competing.moduleId}'`);
    }
    const configuredStorage = storagePolicies.get(row.objectId);
    if (configuredStorage !== undefined) {
      throw new Error(`generated Go object '${row.objectId}' also has configured TypeScript storage '${configuredStorage}'`);
    }
    const previousObject = byObjectId.get(row.objectId);
    if (previousObject !== undefined) throw new Error(`generated Go object '${row.objectId}' has more than one TypeScript owner`);
    const previousUnit = byUnitId.get(row.unitId);
    if (previousUnit !== undefined) throw new Error(`generated Go unit '${row.unitId}' owns both '${previousUnit}' and '${row.objectId}'`);
    const storageIdentity = `${row.moduleId}::${row.tsName}`;
    const previousStorage = byStorage.get(storageIdentity);
    if (previousStorage !== undefined) {
      throw new Error(`generated TypeScript declaration '${storageIdentity}' owns both '${previousStorage}' and '${row.objectId}'`);
    }
    if (!row.moduleId.startsWith(prefix)) {
      throw new Error(`generated declaration module '${row.moduleId}' is outside configured tsRoot '${config.tsRoot}'`);
    }
    const module = moduleIndex.modules.get(row.moduleId);
    if (module === undefined) throw new Error(`generated declaration owner module '${row.moduleId}' is missing from the TypeScript module index`);
    const relativePath = row.moduleId.slice(prefix.length);
    const registration = inspectGeneratedArtifactRegistration(relativePath, module.text);
    if (registration.error !== undefined) throw new Error(`invalid generated TypeScript artifact '${relativePath}': ${registration.error}`);
    if (registration.provider?.id !== row.generator) {
      throw new Error(`generated declaration '${storageIdentity}' claims '${row.generator}' but its registered provider is '${registration.provider?.id ?? "missing"}'`);
    }
    if (!module.structure.exportedTypeNames.has(row.tsName)) {
      throw new Error(`generated declaration owner '${storageIdentity}' is not a direct exported type declaration`);
    }
    const owner = Object.freeze({ ...row });
    owners.push(owner);
    byObjectId.set(row.objectId, owner);
    byUnitId.set(row.unitId, row.objectId);
    byStorage.set(storageIdentity, row.objectId);
  }
  return finalizeGeneratedDeclarationOwners(config, snapshot, owners);
}

function indexSnapshotUnits(snapshot) {
  if (!Array.isArray(snapshot?.files)) throw new Error("generated declaration ownership requires one exact Porter snapshot");
  const byId = new Map();
  for (const file of snapshot.files) {
    for (const unit of file.units ?? []) {
      if (byId.has(unit.id)) throw new Error(`Porter snapshot duplicates Go unit '${unit.id}'`);
      byId.set(unit.id, { file, unit });
    }
  }
  return byId;
}

function requireModuleIndex(moduleIndex) {
  if (!(moduleIndex?.modules instanceof Map) || !(moduleIndex?.metadataById instanceof Map)) {
    throw new Error("generated declaration ownership requires one finalized TypeScript module index");
  }
}

function compareOwnership(left, right) {
  return compareText(left.objectId, right.objectId) || compareText(left.moduleId, right.moduleId) || compareText(left.tsName, right.tsName);
}
