import { externalPackageSurfaceObjectIds, normalizeExternalPackageSurfaceSelections } from "./external-package-declarations.mjs";
import { validateDependencyTypeDeclarations } from "./semantic-snapshot-validation-dependencies.mjs";
import {
  canonicalSchemaValue,
  canonicalSemanticDeclaration,
  compareExactKeys,
} from "./snapshot-validation.mjs";
import {
  isObject,
  validateProfileIndexes,
} from "./semantic-snapshot-validation-identity.mjs";
import {
  validateConstant,
  validateObject,
  validateSignature,
  validateType,
  validateTypeDeclaration,
} from "./semantic-snapshot-validation.mjs";

const surfaceKeys = ["declarations", "dependencyTypeDeclarations", "selections", "unresolvedSelections"];

export function validateExternalPackageSurface(surface, config, profileCount, forbiddenDependencyProfiles, issues) {
  const label = "snapshot.semantic.externalPackageSurface";
  if (!isObject(surface)) {
    issues.push(`${label} must be an object`);
    return;
  }
  compareExactKeys(surface, surfaceKeys, label, issues);
  const expectedSelections = externalPackageSurfaceObjectIds(config);
  validateExactSelections(surface.selections, expectedSelections, `${label}.selections`, issues);
  const configured = new Map(normalizeExternalPackageSurfaceSelections(config).map((selection) => [selection.objectId, selection]));
  const coverage = new Map(expectedSelections.map((objectIdentity) => [objectIdentity, new Set()]));
  validateSurfaceDeclarations(surface.declarations, configured, profileCount, coverage, issues);
  validateUnresolvedSelections(surface.unresolvedSelections, configured, profileCount, coverage, issues);
  const resolvedSelections = new Set((Array.isArray(surface.declarations) ? surface.declarations : []).map(selectedDeclarationObjectId));
  for (const [objectIdentity, profiles] of coverage) {
    if (!resolvedSelections.has(objectIdentity)) issues.push(`${label} selection '${objectIdentity}' is unresolved in every semantic profile`);
    for (let profile = 0; profile < profileCount; profile++) {
      if (!profiles.has(profile)) issues.push(`${label} selection '${objectIdentity}' has no declaration or unresolved evidence in profile ${profile}`);
    }
  }
  const forbidden = new Set(forbiddenDependencyProfiles);
  for (const declaration of Array.isArray(surface.declarations) ? surface.declarations : []) {
    if (declaration?.kind !== "type") continue;
    for (const profile of declaration.profiles ?? []) forbidden.add(`${profile}\0${declaration.object?.id}`);
  }
  validateDependencyTypeDeclarations(
    surface.dependencyTypeDeclarations,
    profileCount,
    forbidden,
    issues,
    { label: `${label}.dependencyTypeDeclarations` },
  );
}

function validateExactSelections(actual, expected, label, issues) {
  if (!Array.isArray(actual)) {
    issues.push(`${label} must be an array`);
    return;
  }
  if (actual.some((value) => typeof value !== "string" || value === "")) issues.push(`${label} must contain non-empty object identities`);
  for (let index = 1; index < actual.length; index++) {
    if (actual[index - 1] >= actual[index]) issues.push(`${label} must be sorted with no duplicates`);
  }
  if (JSON.stringify(actual) !== JSON.stringify(expected)) issues.push(`${label} must equal config.externalPackageSurfaceSelections object identities`);
}

function validateSurfaceDeclarations(declarations, configured, profileCount, coverage, issues) {
  const label = "snapshot.semantic.externalPackageSurface.declarations";
  if (!Array.isArray(declarations)) {
    issues.push(`${label} must be an array`);
    return;
  }
  let previous = "";
  for (const [index, declaration] of declarations.entries()) {
    const itemLabel = `${label}[${index}]`;
    if (!isObject(declaration)) {
      issues.push(`${itemLabel} must be an object`);
      continue;
    }
    const selectedId = selectedDeclarationObjectId(declaration);
    const selection = configured.get(selectedId);
    if (selection === undefined) issues.push(`${itemLabel} has no exact configured selection '${selectedId}'`);
    const expectedKeys = declaration.kind === "type"
      ? ["kind", "object", "packagePath", "profiles", "type"]
      : declaration.kind === "func"
        ? ["kind", "object", "packagePath", "profiles", "signature"]
        : ["kind", "packagePath", "profiles", "valueSpecs"];
    compareExactKeys(declaration, expectedKeys, itemLabel, issues);
    validateProfileIndexes(declaration.profiles, `${itemLabel}.profiles`, issues, profileCount);
    if (selection !== undefined) {
      if (declaration.kind !== selection.goKind) issues.push(`${itemLabel}.kind must equal selected Go object kind '${selection.goKind}'`);
      if (declaration.packagePath !== selection.packagePath) issues.push(`${itemLabel}.packagePath must equal '${selection.packagePath}'`);
      recordProfiles(coverage.get(selectedId), declaration.profiles, itemLabel, issues);
    }
    validateSelectedDeclaration(declaration, selection, itemLabel, issues);
    const key = `${selectedId}\0${canonicalSemanticDeclaration(declaration)}`;
    if (previous !== "" && previous >= key) issues.push(`${label} must be sorted by object identity and canonical profile variant`);
    previous = key;
  }
}

function validateSelectedDeclaration(declaration, selection, label, issues) {
  if (selection === undefined) return;
  const selectedObject = selectedDeclarationObject(declaration);
  if (selectedObject?.name !== selection.goName) issues.push(`${label} selected object name must equal '${selection.goName}'`);
  if (selectedObject?.packagePath !== selection.packagePath) issues.push(`${label} selected object packagePath must equal '${selection.packagePath}'`);
  if (selectedObject?.exported !== true) issues.push(`${label} selected object must be exported`);
  if (declaration.kind === "func") {
    validateObject(declaration.object, `${label}.object`, issues, selection.objectId);
    validateSignature(declaration.signature, `${label}.signature`, issues, {
      declarationKind: "func",
      ownerId: selection.objectId,
      ownerPath: `${selection.objectId}::signature`,
      outerScope: new Map(),
    });
    return;
  }
  if (declaration.kind === "type") {
    validateObject(declaration.object, `${label}.object`, issues, selection.objectId);
    validateTypeDeclaration(declaration.type, `${label}.type`, issues, declaration.object, "complete");
    return;
  }
  if (declaration.kind !== "const" && declaration.kind !== "var") {
    issues.push(`${label}.kind must be const, func, type, or var`);
    return;
  }
  if (!Array.isArray(declaration.valueSpecs) || declaration.valueSpecs.length !== 1) {
    issues.push(`${label}.valueSpecs must contain exactly one selected package value`);
    return;
  }
  const specification = declaration.valueSpecs[0];
  if (!isObject(specification)) {
    issues.push(`${label}.valueSpecs[0] must be an object`);
    return;
  }
  compareExactKeys(specification, ["names", "specIndex"], `${label}.valueSpecs[0]`, issues);
  if (specification.specIndex !== 0) issues.push(`${label}.valueSpecs[0].specIndex must be 0`);
  if (!Array.isArray(specification.names) || specification.names.length !== 1) {
    issues.push(`${label}.valueSpecs[0].names must contain exactly one binding`);
    return;
  }
  const binding = specification.names[0];
  if (!isObject(binding)) {
    issues.push(`${label}.valueSpecs[0].names[0] must be an object`);
    return;
  }
  const bindingKeys = declaration.kind === "const"
    ? ["blank", "constant", "name", "nameIndex", "object", "type"]
    : ["blank", "name", "nameIndex", "object", "type"];
  compareExactKeys(binding, bindingKeys, `${label}.valueSpecs[0].names[0]`, issues);
  if (binding.name !== selection.goName || binding.nameIndex !== 0 || binding.blank !== false) {
    issues.push(`${label}.valueSpecs[0].names[0] must be the exact selected binding '${selection.goName}'`);
  }
  validateObject(binding.object, `${label}.valueSpecs[0].names[0].object`, issues, selection.objectId);
  validateType(binding.type, `${label}.valueSpecs[0].names[0].type`, issues, undefined, `${selection.objectId}::type`);
  if (canonicalSchemaValue(binding.object?.type) !== canonicalSchemaValue(binding.type)) {
    issues.push(`${label}.valueSpecs[0].names[0].object.type must equal binding type`);
  }
  if (declaration.kind === "const") validateConstant(binding.constant, `${label}.valueSpecs[0].names[0].constant`, issues);
}

function validateUnresolvedSelections(rows, configured, profileCount, coverage, issues) {
  const label = "snapshot.semantic.externalPackageSurface.unresolvedSelections";
  if (!Array.isArray(rows)) {
    issues.push(`${label} must be an array`);
    return;
  }
  let previous = "";
  for (const [index, row] of rows.entries()) {
    const itemLabel = `${label}[${index}]`;
    if (!isObject(row)) {
      issues.push(`${itemLabel} must be an object`);
      continue;
    }
    compareExactKeys(row, ["objectId", "profiles"], itemLabel, issues);
    if (!configured.has(row.objectId)) issues.push(`${itemLabel}.objectId has no configured selection`);
    validateProfileIndexes(row.profiles, `${itemLabel}.profiles`, issues, profileCount);
    recordProfiles(coverage.get(row.objectId), row.profiles, itemLabel, issues);
    if (previous !== "" && previous >= row.objectId) issues.push(`${label} must be sorted by object identity with no duplicates`);
    previous = row.objectId;
  }
}

function selectedDeclarationObjectId(declaration) {
  return selectedDeclarationObject(declaration)?.id ?? "<missing>";
}

function selectedDeclarationObject(declaration) {
  if (declaration?.kind === "type" || declaration?.kind === "func") return declaration.object;
  return declaration?.valueSpecs?.[0]?.names?.[0]?.object;
}

function recordProfiles(target, profiles, label, issues) {
  if (!(target instanceof Set)) return;
  for (const profile of Array.isArray(profiles) ? profiles : []) {
    if (target.has(profile)) issues.push(`${label}.profiles duplicates selection profile ${profile}`);
    target.add(profile);
  }
}
