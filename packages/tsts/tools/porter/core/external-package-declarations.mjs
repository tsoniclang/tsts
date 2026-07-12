import { compareText } from "./deterministic-order.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";

// Package-surface declarations are an explicit partial audit input. They are
// never read from dependencyTypeDeclarations and never seed facade generation.
export function buildExternalPackageSurfaceDeclarationIndex(declarations) {
  if (!Array.isArray(declarations)) throw new Error("external package surface contract must be an explicit declaration array");
  const index = new Map();
  for (const [declarationIndex, report] of declarations.entries()) {
    const label = `externalPackageSurface[${declarationIndex}]`;
    requireSurfaceDeclaration(report, label);
    const objectId = report.object.id;
    const entry = index.get(objectId) ?? {
      kind: report.kind,
      name: report.object.name,
      objectId,
      packagePath: report.packagePath,
      variants: [],
      byProfile: new Map(),
    };
    if (entry.kind !== report.kind || entry.name !== report.object.name || entry.packagePath !== report.packagePath) {
      throw new Error(`${label} changes exact external package declaration identity '${objectId}'`);
    }
    for (const profile of report.profiles) {
      if (entry.byProfile.has(profile)) throw new Error(`${label} duplicates '${objectId}' in semantic profile '${profile}'`);
      entry.byProfile.set(profile, report);
    }
    entry.variants.push({ declaration: report, profiles: [...report.profiles] });
    index.set(objectId, entry);
  }
  for (const entry of index.values()) {
    entry.variants.sort((left, right) => compareText(canonicalSchemaValue(left.declaration), canonicalSchemaValue(right.declaration)));
  }
  return new Map([...index].sort(([left], [right]) => compareText(left, right)));
}

export function externalPackageSurfaceValueUnit(entry) {
  const kind = entry.kind === "const" ? "constGroup" : entry.kind === "var" ? "varGroup" : entry.kind;
  if (!new Set(["constGroup", "func", "varGroup"]).has(kind)) {
    throw new Error(`external package surface declaration '${entry.objectId}' is not a callable/value unit`);
  }
  const first = entry.variants[0]?.declaration;
  const typeParameterDetails = (first?.signature?.typeParameters ?? []).map((parameter) => ({
    constraint: { text: exactConstraintSyntax(parameter, entry.objectId) },
    name: parameter.reference.name,
  }));
  return {
    id: `external-package:${entry.objectId}`,
    kind,
    name: entry.name,
    packagePath: entry.packagePath,
    semantic: entry.variants.map(({ declaration }) => declaration),
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
  const expectedKeys = ["kind", "object", "packagePath", "profiles", payload].sort(compareText);
  const actualKeys = Object.keys(report).sort(compareText);
  if (actualKeys.length !== expectedKeys.length || actualKeys.some((key, index) => key !== expectedKeys[index])) {
    throw new Error(`${label} must contain exactly ${expectedKeys.join(", ")}`);
  }
  if (report.object?.exported !== true) throw new Error(`${label}.object must identify an exported Go declaration`);
  if (typeof report.object?.id !== "string" || report.object.id === "") throw new Error(`${label}.object.id must be non-empty`);
  if (typeof report.object?.name !== "string" || report.object.name === "") throw new Error(`${label}.object.name must be non-empty`);
  if (typeof report.packagePath !== "string" || report.packagePath === "") throw new Error(`${label}.packagePath must be non-empty`);
  const expectedId = `${report.packagePath}::${report.kind}::${report.object.name}`;
  if (report.object.id !== expectedId || report.object.packagePath !== report.packagePath) {
    throw new Error(`${label}.object must equal exact Go identity '${expectedId}'`);
  }
  if (!Array.isArray(report.profiles) || report.profiles.length === 0
    || report.profiles.some((profile) => !Number.isSafeInteger(profile) || profile < 0)) {
    throw new Error(`${label}.profiles must be non-empty non-negative semantic profile indexes`);
  }
  for (let index = 1; index < report.profiles.length; index++) {
    if (report.profiles[index - 1] >= report.profiles[index]) throw new Error(`${label}.profiles must be sorted with no duplicates`);
  }
}
