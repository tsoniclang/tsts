import { compareText } from "./deterministic-order.mjs";
import { semanticDeclarationVariantsHash } from "./semantic-declaration-hash.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";
import { semanticRelationsOfKind } from "./semantic-relations.mjs";

export function buildTypeStoragePolicyCatalog(config, snapshot) {
  const declarations = buildSemanticTypeCatalog(snapshot);
  const configured = semanticRelationsOfKind(config, "go-type-storage");
  const policies = new Map();
  const storageOwners = new Map();
  for (const [index, value] of configured.entries()) {
    const label = `semanticRelations[go-type-storage:${index}]`;
    requireExactObject(value, new Set([
      "goDeclarationHash", "kind", "objectId", "reason", "storageIdentity", "tsDeclarationHash",
    ]), label);
    requireIdentity(value.objectId, `${label}.objectId`);
    requireStorageIdentity(value.storageIdentity, `${label}.storageIdentity`);
    requireHash(value.goDeclarationHash, `${label}.goDeclarationHash`);
    requireHash(value.tsDeclarationHash, `${label}.tsDeclarationHash`);
    requireReason(value.reason, `${label}.reason`);
    if (policies.has(value.objectId)) throw new Error(`${label} duplicates Go type storage policy '${value.objectId}'`);
    const storageOwner = storageOwners.get(value.storageIdentity);
    if (storageOwner !== undefined) throw new Error(`${label} shares TypeScript storage '${value.storageIdentity}' with '${storageOwner}'`);
    const semantic = declarations.get(value.objectId);
    if (semantic === undefined) throw new Error(`${label}.objectId '${value.objectId}' has no extracted Go type declaration`);
    const goDeclarationHash = semanticDeclarationVariantsHash(semantic, `type storage policy '${value.objectId}'`);
    if (goDeclarationHash !== value.goDeclarationHash) {
      throw new Error(`${label} Go declaration snapshot drifted: config=${value.goDeclarationHash} current=${goDeclarationHash}`);
    }
    const policy = { ...value, reason: value.reason.trim(), semantic };
    policies.set(value.objectId, policy);
    storageOwners.set(value.storageIdentity, value.objectId);
  }
  return new Map([...policies].sort(([left], [right]) => compareText(left, right)));
}

export function buildTypeStorageIdentityMap(config, snapshot) {
  return new Map([...buildTypeStoragePolicyCatalog(config, snapshot)].map(([objectId, policy]) => [objectId, policy.storageIdentity]));
}

export function buildSemanticTypeCatalog(snapshot) {
  const rows = [];
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (unit.kind !== "type") continue;
      for (const declaration of unit.semantic ?? []) if (declaration?.type !== undefined) rows.push(declaration);
    }
  }
  for (const declaration of snapshot.semantic?.dependencyTypeDeclarations ?? []) {
    if (declaration?.kind === "type" && declaration.type !== undefined) rows.push(declaration);
  }
  for (const declaration of snapshot.semantic?.externalPackageSurface?.declarations ?? []) {
    if (declaration?.kind === "type" && declaration.type !== undefined) rows.push(declaration);
  }
  for (const declaration of snapshot.semantic?.externalPackageSurface?.dependencyTypeDeclarations ?? []) {
    if (declaration?.kind === "type" && declaration.type !== undefined) rows.push(declaration);
  }
  const catalog = new Map();
  for (const declaration of rows) {
    const object = declaration.type?.object;
    const objectId = object?.id;
    if (typeof objectId !== "string" || objectId === "") throw new Error("semantic Go type declaration has no exact object identity");
    const entry = catalog.get(objectId) ?? {
      objectId,
      packagePath: object.packagePath,
      name: object.name,
      variants: [],
      byProfile: new Map(),
    };
    if (entry.packagePath !== object.packagePath || entry.name !== object.name) {
      throw new Error(`semantic Go type '${objectId}' changes package/name identity`);
    }
    for (const profile of declaration.profiles ?? []) {
      const previous = entry.byProfile.get(profile);
      if (previous !== undefined && canonicalSchemaValue(previous) !== canonicalSchemaValue(declaration)) {
        throw new Error(`semantic Go type '${objectId}' has conflicting declarations in profile '${profile}'`);
      }
      entry.byProfile.set(profile, declaration);
    }
    const key = canonicalSchemaValue({ ...declaration, profiles: undefined });
    const existing = entry.variants.find((variant) => canonicalSchemaValue({ ...variant.declaration, profiles: undefined }) === key);
    if (existing === undefined) entry.variants.push({ declaration, profiles: [...declaration.profiles] });
    else existing.profiles.push(...declaration.profiles);
    catalog.set(objectId, entry);
  }
  for (const entry of catalog.values()) {
    for (const variant of entry.variants) variant.profiles = [...new Set(variant.profiles)].sort((left, right) => left - right);
    entry.variants.sort((left, right) => compareText(canonicalSchemaValue(left.declaration), canonicalSchemaValue(right.declaration)));
  }
  return catalog;
}

function requireExactObject(value, allowed, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) throw new Error(`${label} contains unknown key(s): ${unknown.sort(compareText).join(", ")}`);
}

function requireIdentity(value, label) {
  if (typeof value !== "string" || !/^(?:builtin|[^:\s]+)::type::[^:\s]+$/.test(value)) {
    throw new Error(`${label} must be one exact Go type object identity`);
  }
}

function requireStorageIdentity(value, label) {
  if (typeof value !== "string" || !/^[^:\s]+::[^:\s]+$/.test(value)) {
    throw new Error(`${label} must be one exact module/name TypeScript storage identity`);
  }
}

function requireHash(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/.test(value)) throw new Error(`${label} must be one SHA-256 contract snapshot`);
}

function requireReason(value, label) {
  if (typeof value !== "string" || value.trim().length < 20) throw new Error(`${label} must specifically justify the Go-to-TypeScript storage adaptation`);
}
