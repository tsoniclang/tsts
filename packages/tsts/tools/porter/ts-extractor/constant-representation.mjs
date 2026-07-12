import { canonicalSchemaValue } from "../core/semantic-variants.mjs";

export function buildDeclaredTypeRhsIndex(snapshot) {
  const byProfile = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (unit.kind !== "type") continue;
      for (const semantic of unit.semantic ?? []) {
        const declaration = semantic?.type;
        if (declaration?.rhs === undefined) continue;
        addDeclaration(declaration.object?.id, declaration.rhs, semantic.profiles, `Go type unit '${unit.id}'`);
      }
    }
  }
  for (const semantic of snapshot.semantic?.dependencyTypeDeclarations ?? []) {
    if (semantic?.kind !== "type" || semantic.type?.rhs === undefined) continue;
    addDeclaration(semantic.type.object?.id, semantic.type.rhs, semantic.profiles, "dependency Go type");
  }
  for (const semantic of externalPackageTypeDeclarations(snapshot)) {
    addDeclaration(semantic.type.object?.id, semantic.type.rhs, semantic.profiles, "external package Go type");
  }
  return byProfile;

  function addDeclaration(objectId, rhs, profiles, label) {
    if (typeof objectId !== "string" || objectId.length === 0) throw new Error(`${label} has an exact RHS without an object identity`);
    for (const profile of profiles ?? []) {
      const declarations = byProfile.get(profile) ?? new Map();
      setExactRhs(declarations, objectId, rhs, profile);
      byProfile.set(profile, declarations);
    }
  }
}

function externalPackageTypeDeclarations(snapshot) {
  const surface = snapshot.semantic?.externalPackageSurface;
  return [
    ...(Array.isArray(surface?.declarations) ? surface.declarations : []),
    ...(Array.isArray(surface?.dependencyTypeDeclarations) ? surface.dependencyTypeDeclarations : []),
  ].filter((semantic) => semantic?.kind === "type" && semantic.type?.rhs !== undefined);
}

export function semanticConstantUsesBigInt(type, index, profile) {
  return typeUsesBigInt(type, index, profile, new Set());
}

function typeUsesBigInt(type, index, profile, resolving) {
  const representations = index.constantRepresentations ?? {};
  if (type?.kind === "basic") return representations.bigintBasics?.has(type.basic?.name) === true;
  if (type?.kind !== "named" && type?.kind !== "alias") return false;
  const objectId = type.reference?.objectId;
  if (typeof objectId !== "string" || objectId.length === 0) {
    throw new Error("canonical Go named/alias constant type has no object identity");
  }
  if (representations.bigintNamedTypes?.has(objectId) === true) return true;
  const rhs = index.declaredTypeRhsByProfile?.get(profile)?.get(objectId);
  if (rhs === undefined) return false;
  if (resolving.has(objectId)) throw new Error(`Go declared type RHS cycle at '${objectId}'`);
  resolving.add(objectId);
  try {
    return typeUsesBigInt(rhs, index, profile, resolving);
  } finally {
    resolving.delete(objectId);
  }
}

function setExactRhs(declarations, objectId, rhs, profile) {
  const previous = declarations.get(objectId);
  if (previous !== undefined && canonicalSchemaValue(previous) !== canonicalSchemaValue(rhs)) {
    throw new Error(`Go type '${objectId}' has conflicting RHS types in semantic profile '${profile}'`);
  }
  declarations.set(objectId, rhs);
}
