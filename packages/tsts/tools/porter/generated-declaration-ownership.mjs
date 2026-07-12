import { buildAstGeneratedTypeOwnership } from "./ast-generator/artifacts.mjs";
import { compareText } from "./core/deterministic-order.mjs";
import { inspectGeneratedArtifactRegistration } from "./generated-source.mjs";

const UNICODE_GENERATOR = "porter:unicode";
const UNICODE_SOURCE_PATH = "internal/stringutil/js_case_generated.go";
const UNICODE_MODULE_PATH = "internal/stringutil/generated/js_case_generated.ts";
const UNICODE_TYPE_NAMES = Object.freeze(["specialCasingCondition", "specialCasingMapping"]);

export function buildGeneratedTypeDeclarationOwnership(config, snapshot, moduleIndex) {
  return validateGeneratedTypeDeclarationOwnership(config, moduleIndex, [
    ...buildAstGeneratedTypeOwnership(config, snapshot),
    ...buildUnicodeGeneratedTypeOwnership(config, snapshot),
  ]);
}

export function validateGeneratedTypeDeclarationOwnership(config, moduleIndex, rows) {
  const byObjectId = new Map();
  const byStorage = new Map();
  const prefix = `${config.tsRoot.replace(/\/$/, "")}/`;
  for (const row of [...rows].sort(compareOwnership)) {
    validateOwnershipRow(row);
    if (byObjectId.has(row.objectId)) throw new Error(`generated Go object '${row.objectId}' has more than one TypeScript owner`);
    const storageIdentity = `${row.moduleId}::${row.tsName}`;
    if (byStorage.has(storageIdentity)) {
      throw new Error(`generated TypeScript declaration '${storageIdentity}' owns both '${byStorage.get(storageIdentity)}' and '${row.objectId}'`);
    }
    if (!row.moduleId.startsWith(prefix)) throw new Error(`generated declaration module '${row.moduleId}' is outside configured tsRoot '${config.tsRoot}'`);
    const module = moduleIndex.modules.get(row.moduleId);
    if (module === undefined) throw new Error(`generated declaration owner module '${row.moduleId}' is missing from the TypeScript module index`);
    const relativePath = row.moduleId.slice(prefix.length);
    const registration = inspectGeneratedArtifactRegistration(relativePath, module.text);
    if (registration.error !== undefined) throw new Error(`invalid generated TypeScript artifact '${relativePath}': ${registration.error}`);
    if (registration.provider?.id !== row.generator) {
      throw new Error(`generated declaration '${storageIdentity}' claims '${row.generator}' but its registered provider is '${registration.provider?.id ?? "missing"}'`);
    }
    if (!module.structure.exportedTypeNames.has(row.tsName)) {
      throw new Error(`generated declaration owner '${storageIdentity}' is not an exported type declaration`);
    }
    const owner = Object.freeze({ ...row });
    byObjectId.set(row.objectId, owner);
    byStorage.set(storageIdentity, row.objectId);
  }
  return byObjectId;
}

function buildUnicodeGeneratedTypeOwnership(config, snapshot) {
  const file = (snapshot.files ?? []).find((candidate) => candidate.path === UNICODE_SOURCE_PATH);
  if (file === undefined) throw new Error(`Unicode generated type source '${UNICODE_SOURCE_PATH}' is missing from the Porter snapshot`);
  const units = (file.units ?? []).filter((unit) => unit.kind === "type");
  const names = units.map((unit) => unit.name).sort(compareText);
  const expected = [...UNICODE_TYPE_NAMES].sort(compareText);
  if (names.length !== expected.length || names.some((name, index) => name !== expected[index])) {
    throw new Error(`Unicode generated type ownership must cover exactly ${expected.join(", ")}; got ${names.join(", ")}`);
  }
  const moduleId = `${config.tsRoot.replace(/\/$/, "")}/${UNICODE_MODULE_PATH}`;
  return units.map((unit) => ({
    generator: UNICODE_GENERATOR,
    objectId: exactSemanticTypeObjectId(unit),
    unitId: unit.id,
    moduleId,
    tsName: unit.name,
  }));
}

function exactSemanticTypeObjectId(unit) {
  const objectIds = new Set((unit.semantic ?? []).map((variant) => variant?.type?.object?.id).filter((id) => typeof id === "string" && id !== ""));
  if (objectIds.size !== 1) throw new Error(`generated Go type '${unit.id}' must have one profile-invariant object identity`);
  return [...objectIds][0];
}

function validateOwnershipRow(row) {
  const expectedKeys = ["generator", "moduleId", "objectId", "tsName", "unitId"];
  if (row === null || typeof row !== "object" || Array.isArray(row)) throw new Error("generated declaration ownership row must be an object");
  const actualKeys = Object.keys(row).sort(compareText);
  if (actualKeys.length !== expectedKeys.length || actualKeys.some((key, index) => key !== expectedKeys[index])) {
    throw new Error(`generated declaration ownership keys must be exactly ${expectedKeys.join(", ")}; got ${actualKeys.join(", ")}`);
  }
  for (const key of expectedKeys) if (typeof row[key] !== "string" || row[key] === "") throw new Error(`generated declaration ownership ${key} must be non-empty`);
}

function compareOwnership(left, right) {
  return compareText(left.objectId, right.objectId) || compareText(left.moduleId, right.moduleId) || compareText(left.tsName, right.tsName);
}
