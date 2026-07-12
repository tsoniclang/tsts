import { compareText } from "./deterministic-order.mjs";
import { safeIdentifier } from "./names.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";

export function normalizeExternalPackageSurfaceSelections(config) {
  const configured = config.externalPackageSurfaceSelections ?? [];
  if (!Array.isArray(configured)) throw new Error("config.externalPackageSurfaceSelections must be an array");
  const authoredModules = new Set(config.authoredFacadeModules ?? []);
  const objectIds = new Set();
  const storageIdentities = new Set();
  const selections = [];
  for (const [index, selection] of configured.entries()) {
    const label = `externalPackageSurfaceSelections[${index}]`;
    requireExactObject(selection, new Set(["objectId", "tsModule", "tsName"]), label);
    const identity = parseExternalPackageObjectId(selection.objectId, `${label}.objectId`);
    if (identity.packagePath === config.goModulePath || identity.packagePath.startsWith(`${config.goModulePath}/`)) {
      throw new Error(`${label}.objectId must identify an external Go package declaration`);
    }
    requireExactTsModule(selection.tsModule, `${label}.tsModule`);
    if (!authoredModules.has(selection.tsModule)) {
      throw new Error(`${label}.tsModule '${selection.tsModule}' is not listed in config.authoredFacadeModules`);
    }
    if (typeof selection.tsName !== "string" || selection.tsName === "" || safeIdentifier(selection.tsName) !== selection.tsName) {
      throw new Error(`${label}.tsName must be one exact TypeScript declaration identifier`);
    }
    const storageIdentity = `${selection.tsModule}::${selection.tsName}`;
    if (objectIds.has(selection.objectId)) throw new Error(`${label}.objectId duplicates '${selection.objectId}'`);
    if (storageIdentities.has(storageIdentity)) throw new Error(`${label} duplicates TypeScript storage '${storageIdentity}'`);
    objectIds.add(selection.objectId);
    storageIdentities.add(storageIdentity);
    selections.push({ ...selection, ...identity, storageIdentity });
  }
  return selections.sort((left, right) => compareText(left.objectId, right.objectId));
}

export function externalPackageSurfaceObjectIds(config) {
  return normalizeExternalPackageSurfaceSelections(config).map((selection) => selection.objectId);
}

// Package-surface declarations are an explicit partial audit input. They are
// never read from ordinary dependencyTypeDeclarations and never seed generation.
export function buildExternalPackageSurfaceDeclarationIndex(config, snapshot) {
  const selections = normalizeExternalPackageSurfaceSelections(config);
  const surface = snapshot?.semantic?.externalPackageSurface;
  if (surface === null || typeof surface !== "object" || Array.isArray(surface)) {
    throw new Error("snapshot.semantic.externalPackageSurface must be an object");
  }
  const profileCount = snapshot.semantic?.profiles?.length;
  if (!Number.isSafeInteger(profileCount) || profileCount < 1) throw new Error("snapshot has no exact semantic profile set");
  const index = new Map();
  for (const selection of selections) {
    index.set(selection.objectId, {
      kind: selection.goKind,
      name: selection.goName,
      objectId: selection.objectId,
      packagePath: selection.packagePath,
      tsModule: selection.tsModule,
      tsName: selection.tsName,
      variants: [],
      byProfile: new Map(),
      unresolvedProfiles: new Set(),
    });
  }
  if (!Array.isArray(surface.declarations)) throw new Error("snapshot.semantic.externalPackageSurface.declarations must be an array");
  for (const [declarationIndex, report] of surface.declarations.entries()) {
    const label = `snapshot.semantic.externalPackageSurface.declarations[${declarationIndex}]`;
    const object = requireSurfaceDeclaration(report, label);
    const objectId = object.id;
    const entry = index.get(objectId);
    if (entry === undefined) throw new Error(`${label} has no configured external package selection '${objectId}'`);
    if (entry.kind !== report.kind || entry.name !== object.name || entry.packagePath !== report.packagePath || object.packagePath !== report.packagePath) {
      throw new Error(`${label} changes exact external package declaration identity '${objectId}'`);
    }
    for (const profile of report.profiles) {
      requireProfileIndex(profile, profileCount, `${label}.profiles`);
      if (entry.byProfile.has(profile)) throw new Error(`${label} duplicates '${objectId}' in semantic profile '${profile}'`);
      entry.byProfile.set(profile, report);
    }
    entry.variants.push({ declaration: report, profiles: [...report.profiles] });
  }
  if (!Array.isArray(surface.unresolvedSelections)) throw new Error("snapshot.semantic.externalPackageSurface.unresolvedSelections must be an array");
  for (const [rowIndex, row] of surface.unresolvedSelections.entries()) {
    const label = `snapshot.semantic.externalPackageSurface.unresolvedSelections[${rowIndex}]`;
    requireExactObject(row, new Set(["objectId", "profiles"]), label);
    const entry = index.get(row.objectId);
    if (entry === undefined) throw new Error(`${label}.objectId has no configured external package selection`);
    if (!Array.isArray(row.profiles) || row.profiles.length === 0) throw new Error(`${label}.profiles must be non-empty`);
    for (const profile of row.profiles) {
      requireProfileIndex(profile, profileCount, `${label}.profiles`);
      if (entry.unresolvedProfiles.has(profile) || entry.byProfile.has(profile)) {
        throw new Error(`${label} duplicates outcome for '${row.objectId}' in semantic profile '${profile}'`);
      }
      entry.unresolvedProfiles.add(profile);
    }
  }
  for (const entry of index.values()) {
    if (entry.variants.length === 0) throw new Error(`external package selection '${entry.objectId}' is unresolved in every semantic profile`);
    for (let profile = 0; profile < profileCount; profile++) {
      if (Number(entry.byProfile.has(profile)) + Number(entry.unresolvedProfiles.has(profile)) !== 1) {
        throw new Error(`external package selection '${entry.objectId}' has no exact outcome in semantic profile '${profile}'`);
      }
    }
    entry.variants.sort((left, right) => compareText(canonicalSchemaValue(left.declaration), canonicalSchemaValue(right.declaration)));
  }
  return new Map([...index].sort(([left], [right]) => compareText(left, right)));
}

export function externalPackageSurfaceValueUnit(entry) {
  const kind = entry.kind === "const" ? "constGroup" : entry.kind === "var" ? "varGroup" : entry.kind;
  if (!new Set(["constGroup", "func", "varGroup"]).has(kind)) {
    throw new Error(`external package surface declaration '${entry.objectId}' is not a callable/value unit`);
  }
  const semantic = entry.variants.map(({ declaration }) => projectSelectedValueName(declaration, entry));
  const first = semantic[0];
  const typeParameterDetails = (first?.signature?.typeParameters ?? []).map((parameter) => ({
    constraint: { text: exactConstraintSyntax(parameter, entry.objectId) },
    name: parameter.reference.name,
  }));
  return {
    id: `external-package:${entry.objectId}`,
    kind,
    name: entry.tsName,
    packagePath: entry.packagePath,
    semantic,
    typeParameterDetails,
    valueSpecs: (first?.valueSpecs ?? []).map((specification) => ({
      names: specification.names.map((binding) => binding.name),
    })),
  };
}

function exactConstraintSyntax(parameter, objectId) {
  if (typeof parameter?.constraintSyntax !== "string" || parameter.constraintSyntax === "") {
    throw new Error(`external package surface declaration '${objectId}' has no exact type-parameter constraint syntax`);
  }
  return parameter.constraintSyntax;
}

function requireSurfaceDeclaration(report, label) {
  if (report === null || typeof report !== "object" || Array.isArray(report)) throw new Error(`${label} must be one exact Go declaration`);
  if (!new Set(["const", "func", "type", "var"]).has(report.kind)) throw new Error(`${label}.kind is invalid`);
  const payload = report.kind === "type" ? "type" : report.kind === "func" ? "signature" : "valueSpecs";
  const expectedKeys = ["kind", "packagePath", "profiles", payload,
    ...(report.kind === "func" || report.kind === "type" ? ["object"] : [])].sort(compareText);
  const actualKeys = Object.keys(report).sort(compareText);
  if (actualKeys.length !== expectedKeys.length || actualKeys.some((key, index) => key !== expectedKeys[index])) {
    throw new Error(`${label} must contain exactly ${expectedKeys.join(", ")}`);
  }
  const object = selectedDeclarationObject(report);
  if (object?.exported !== true) throw new Error(`${label} must identify an exported Go declaration`);
  if (typeof object?.id !== "string" || object.id === "") throw new Error(`${label} object id must be non-empty`);
  if (typeof object?.name !== "string" || object.name === "") throw new Error(`${label} object name must be non-empty`);
  if (typeof report.packagePath !== "string" || report.packagePath === "") throw new Error(`${label}.packagePath must be non-empty`);
  const expectedId = `${report.packagePath}::${report.kind}::${object.name}`;
  if (object.id !== expectedId || object.packagePath !== report.packagePath) {
    throw new Error(`${label} object must equal exact Go identity '${expectedId}'`);
  }
  if (!Array.isArray(report.profiles) || report.profiles.length === 0
    || report.profiles.some((profile) => !Number.isSafeInteger(profile) || profile < 0)) {
    throw new Error(`${label}.profiles must be non-empty non-negative semantic profile indexes`);
  }
  for (let index = 1; index < report.profiles.length; index++) {
    if (report.profiles[index - 1] >= report.profiles[index]) throw new Error(`${label}.profiles must be sorted with no duplicates`);
  }
  return object;
}

function selectedDeclarationObject(report) {
  if (report?.kind === "func" || report?.kind === "type") return report.object;
  if (!Array.isArray(report?.valueSpecs) || report.valueSpecs.length !== 1) return undefined;
  const specification = report.valueSpecs[0];
  if (!Array.isArray(specification?.names) || specification.names.length !== 1) return undefined;
  return specification.names[0]?.object;
}

function projectSelectedValueName(declaration, entry) {
  if (declaration.kind !== "const" && declaration.kind !== "var") return declaration;
  const specification = declaration.valueSpecs[0];
  const binding = specification.names[0];
  return {
    ...declaration,
    valueSpecs: [{ ...specification, names: [{ ...binding, name: entry.tsName }] }],
  };
}

function requireProfileIndex(profile, profileCount, label) {
  if (!Number.isSafeInteger(profile) || profile < 0 || profile >= profileCount) {
    throw new Error(`${label} contains invalid semantic profile '${profile}'`);
  }
}

function parseExternalPackageObjectId(value, label) {
  if (typeof value !== "string") throw new Error(`${label} must be one exact external Go declaration identity`);
  const match = /^([^:\s]+)::(const|func|type|var)::([^:\s]+)$/.exec(value);
  if (match === null) throw new Error(`${label} must be package::(const|func|type|var)::name`);
  return { packagePath: match[1], goKind: match[2], goName: match[3] };
}

function requireExactTsModule(value, label) {
  if (typeof value !== "string" || value.startsWith("/") || value.includes("\\") || !value.endsWith(".ts") ||
      value.split("/").some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new Error(`${label} must be one normalized relative TypeScript module path ending in .ts`);
  }
}

function requireExactObject(value, allowed, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) throw new Error(`${label} contains unknown key(s): ${unknown.sort(compareText).join(", ")}`);
  const missing = [...allowed].filter((key) => !Object.hasOwn(value, key));
  if (missing.length > 0) throw new Error(`${label} is missing key(s): ${missing.sort(compareText).join(", ")}`);
}
