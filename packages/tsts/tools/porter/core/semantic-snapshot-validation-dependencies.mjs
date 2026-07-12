import {
  canonicalSemanticDeclaration,
  compareExactKeys,
} from "./snapshot-validation.mjs";
import {
  validateObject,
  validateTypeDeclaration,
} from "./semantic-snapshot-validation.mjs";
import {
  isObject,
  objectId,
  validateProfileIndexes,
} from "./semantic-snapshot-validation-identity.mjs";

export function validateDependencyTypeDeclarations(declarations, profileCount, activeTypeProfileKeys, issues, options = {}) {
  const label = options.label ?? "snapshot.semantic.dependencyTypeDeclarations";
  if (!Array.isArray(declarations)) {
    issues.push(`${label} must be an array`);
    return;
  }
  const profilesByObject = new Map();
  let previousKey = "";
  for (const [index, semantic] of declarations.entries()) {
    const itemLabel = `${label}[${index}]`;
    validateDependencyDeclaration(semantic, itemLabel, profileCount, activeTypeProfileKeys, issues);
    if (!isObject(semantic)) continue;
    const objectIdentity = semantic.object?.id ?? "";
    const objectProfiles = profilesByObject.get(objectIdentity) ?? new Set();
    for (const profile of Array.isArray(semantic.profiles) ? semantic.profiles : []) {
      if (objectProfiles.has(profile)) issues.push(`${itemLabel}.profiles duplicates dependency declaration '${objectIdentity}' profile ${profile}`);
      objectProfiles.add(profile);
    }
    profilesByObject.set(objectIdentity, objectProfiles);
    const key = `${objectIdentity}\0${canonicalSemanticDeclaration(semantic)}`;
    if (previousKey !== "" && previousKey >= key) issues.push(`${label} must be sorted by object identity and canonical profile variant`);
    previousKey = key;
  }
}

export function activeSemanticTypeProfileKeys(files) {
  const keys = new Set();
  for (const file of Array.isArray(files) ? files : []) {
    for (const unit of Array.isArray(file?.units) ? file.units : []) {
      for (const declaration of Array.isArray(unit?.semantic) ? unit.semantic : []) {
        if (declaration?.kind !== "type" || typeof declaration.object?.id !== "string") continue;
        for (const profile of Array.isArray(declaration.profiles) ? declaration.profiles : []) {
          if (Number.isSafeInteger(profile) && profile >= 0) keys.add(`${profile}\0${declaration.object.id}`);
        }
      }
    }
  }
  return keys;
}

function validateDependencyDeclaration(semantic, label, profileCount, activeTypeProfileKeys, issues) {
  if (!isObject(semantic)) {
    issues.push(`${label} must be an object`);
    return;
  }
  compareExactKeys(semantic, ["kind", "object", "packagePath", "profiles", "type"], label, issues);
  const kind = semantic.kind;
  if (kind !== "type") issues.push(`${label}.kind must be 'type'; dependency type closure contains only reachable named types`);
  if (typeof semantic.packagePath !== "string" || semantic.packagePath === "") issues.push(`${label}.packagePath must be non-empty`);
  const expectedId = objectId(semantic.packagePath, "type", semantic.object?.name);
  validateObject(semantic.object, `${label}.object`, issues, expectedId);
  if (semantic.object?.packagePath !== semantic.packagePath) issues.push(`${label}.object.packagePath must equal declaration packagePath`);
  validateProfileIndexes(semantic.profiles, `${label}.profiles`, issues, profileCount);
  for (const profile of Array.isArray(semantic.profiles) ? semantic.profiles : []) {
    if (activeTypeProfileKeys.has(`${profile}\0${semantic.object?.id}`)) {
      issues.push(`${label} duplicates active local type '${semantic.object?.id}' in semantic profile ${profile}`);
    }
  }
  validateTypeDeclaration(semantic.type, `${label}.type`, issues, semantic.object, "complete");
}
