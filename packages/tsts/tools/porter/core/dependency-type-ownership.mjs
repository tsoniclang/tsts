import { isActivePortPolicy, policyForUnit } from "./policies.mjs";

export function isExternalPackage(packagePath, modulePath) {
  return packagePath !== "" && packagePath !== modulePath && !packagePath.startsWith(`${modulePath}/`);
}

export function isModulePackage(packagePath, modulePath) {
  return packagePath === modulePath || packagePath.startsWith(`${modulePath}/`);
}

export function requiresDependencyDeclarationForProfile(
  reference,
  profile,
  semanticIndex,
  activeLocalTypeProfileKeys,
  modulePath,
) {
  if (reference.packagePath === "") return false;
  if (semanticIndex.get(reference.objectId)?.byProfile.has(profile)) return true;
  if (isExternalPackage(reference.packagePath, modulePath)) return true;
  if (!isModulePackage(reference.packagePath, modulePath)) {
    throw new Error(`Go type reference '${reference.objectId}' belongs to neither module '${modulePath}' nor an external package`);
  }
  return !activeLocalTypeProfileKeys.has(`${profile}\0${reference.objectId}`);
}

export function buildActiveLocalTypeProfileKeys(config, snapshot) {
  return buildLocalTypeProfileKeys(config, snapshot, (policy) => isActivePortPolicy(policy));
}

export function buildMechanicallyStoredLocalTypeProfileKeys(config, snapshot) {
  return buildLocalTypeProfileKeys(config, snapshot, (policy) =>
    isActivePortPolicy(policy) ||
    (policy?.active === false && policy?.category === "generated-artifact" && typeof policy.mechanism === "string" && policy.mechanism !== ""));
}

export function buildAllSemanticLocalTypeProfileKeys(snapshot) {
  const keys = new Set();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (unit.kind !== "type") continue;
      for (const declaration of unit.semantic ?? []) {
        if (typeof declaration?.object?.id !== "string") continue;
        for (const profile of declaration.profiles ?? []) keys.add(`${profile}\0${declaration.object.id}`);
      }
    }
  }
  return keys;
}

function buildLocalTypeProfileKeys(config, snapshot, include) {
  const keys = new Set();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (!include(policyForUnit(config, unit, file))) continue;
      for (const declaration of unit.semantic ?? []) {
        if (declaration?.kind !== "type" || typeof declaration.object?.id !== "string") continue;
        for (const profile of exactProfiles(declaration.profiles, `active local Go type '${declaration.object.id}'`)) {
          keys.add(`${profile}\0${declaration.object.id}`);
        }
      }
    }
  }
  return keys;
}

function exactProfiles(value, label) {
  if (!Array.isArray(value) || value.length === 0 || value.some((profile) => !Number.isSafeInteger(profile) || profile < 0)) {
    throw new Error(`${label} has no exact semantic profile set`);
  }
  return value;
}
