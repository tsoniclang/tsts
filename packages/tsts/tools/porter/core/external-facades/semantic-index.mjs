import { compareText } from "../deterministic-order.mjs";
import { exactSemanticTypeDeclarationIdentity } from "../semantic-type-declaration-identity.mjs";
import { canonicalSchemaValue } from "../semantic-variants.mjs";
import { isPlainObject } from "./dependency-closure.mjs";

export function buildDependencySemanticTypeIndex(snapshot, scope = "artifact") {
  if (scope !== "artifact" && scope !== "audit") {
    throw new Error(`dependency semantic type index scope must be 'artifact' or 'audit'; got '${scope}'`);
  }
  if (!Array.isArray(snapshot?.semantic?.dependencyTypeDeclarations)) {
    throw new Error("Porter snapshot has no exact dependency go/types declaration index");
  }
  const rows = snapshot.semantic.dependencyTypeDeclarations.map((report, index) => ({
    label: `snapshot.semantic.dependencyTypeDeclarations[${index}]`, report,
  }));
  if (scope === "audit") {
    for (const [index, report] of externalPackageTypeEvidence(snapshot).entries()) {
      rows.push({ label: `snapshot.semantic.externalPackageSurface type declaration[${index}]`, report });
    }
  }
  const index = new Map();
  for (const { label, report } of rows) {
    const declaration = requireDependencyTypeDeclaration(report, label);
    const objectId = declaration.object.id;
    const entry = index.get(objectId) ?? {
      objectId,
      packagePath: declaration.object.packagePath,
      name: declaration.object.name,
      goDisplayName: `${declaration.object.packagePath}.${declaration.object.name}`,
      byProfile: new Map(),
      variants: [],
    };
    if (entry.packagePath !== declaration.object.packagePath || entry.name !== declaration.object.name) {
      throw new Error(`${label} changes exact external Go object identity '${objectId}'`);
    }
    for (const profile of report.profiles) {
      if (entry.byProfile.has(profile)) throw new Error(`${label} duplicates dependency Go type '${objectId}' in semantic profile '${profile}'`);
      entry.byProfile.set(profile, declaration);
    }
    entry.variants.push({ declaration, profiles: [...report.profiles] });
    index.set(objectId, entry);
  }
  for (const entry of index.values()) {
    entry.variants.sort((left, right) => compareText(canonicalSchemaValue(left.declaration), canonicalSchemaValue(right.declaration)));
    entry.arity = invariantDependencyProperty(entry, "type-parameter arity", (declaration) => declaration.typeParameters.length);
  }
  return new Map([...index.entries()].sort(([left], [right]) => compareText(left, right)));
}

export function externalPackageTypeEvidence(snapshot) {
  const surface = snapshot.semantic?.externalPackageSurface;
  return [
    ...(Array.isArray(surface?.declarations) ? surface.declarations : []),
    ...(Array.isArray(surface?.dependencyTypeDeclarations) ? surface.dependencyTypeDeclarations : []),
  ].filter((declaration) => declaration?.kind === "type");
}

function requireDependencyTypeDeclaration(report, label) {
  if (!isPlainObject(report) || report.kind !== "type" || !isPlainObject(report.type) || !isPlainObject(report.object)) {
    throw new Error(`${label} must be one canonical dependency Go type declaration`);
  }
  if (Object.hasOwn(report, "externalRole")) throw new Error(`${label}.externalRole is obsolete; dependency declarations are exact reachable types only`);
  if (!Array.isArray(report.profiles) || report.profiles.length === 0 || report.profiles.some((profile) => !Number.isSafeInteger(profile) || profile < 0)) {
    throw new Error(`${label}.profiles must identify one or more exact semantic profiles`);
  }
  if (!isPlainObject(report.object.type) || typeof report.object.type.nilable !== "boolean") throw new Error(`${label}.object.type has no intrinsic nilability evidence`);
  if (typeof report.object.id !== "string" || typeof report.object.packagePath !== "string" || typeof report.object.name !== "string") {
    throw new Error(`${label}.object has incomplete exact Go identity`);
  }
  const expectedId = `${report.object.packagePath}::type::${report.object.name}`;
  if (report.object.id !== expectedId || report.packagePath !== report.object.packagePath) throw new Error(`${label} has inconsistent exact Go object identity`);
  if (report.type.alias !== true && report.type.alias !== false) throw new Error(`${label}.type has no exact alias flag`);
  if (canonicalSchemaValue(report.type.object) !== canonicalSchemaValue(report.object)) throw new Error(`${label}.type.object does not equal its exact declaration object`);
  exactSemanticTypeDeclarationIdentity(report.type, `${label}.type`);
  if (!Array.isArray(report.type.typeParameters) || !isPlainObject(report.type.rhs) || typeof report.type.rhs.nilable !== "boolean") {
    throw new Error(`${label}.type lacks exact type parameters, RHS, or intrinsic nilability`);
  }
  if (report.type.rhs.nilable !== report.object.type.nilable) throw new Error(`${label}.type RHS and object disagree on intrinsic nilability`);
  if (report.type.methods !== undefined && !Array.isArray(report.type.methods)) throw new Error(`${label}.type.methods must be an exact array when present`);
  return { ...report.type, methods: report.type.methods ?? [] };
}

function invariantDependencyProperty(entry, label, select) {
  let value;
  for (const declaration of entry.byProfile.values()) {
    const next = select(declaration);
    if (value === undefined) value = next;
    else if (canonicalSchemaValue(value) !== canonicalSchemaValue(next)) {
      throw new Error(`dependency Go type '${entry.objectId}' changes ${label} across active semantic profiles`);
    }
  }
  if (value === undefined) throw new Error(`dependency Go type '${entry.objectId}' has no active semantic profile`);
  return value;
}
