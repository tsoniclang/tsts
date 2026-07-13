import { compareSignatures } from "./comparison.mjs";
import { hashText } from "../core/runtime.mjs";

const SIGNATURE_MISMATCH_KINDS = new Set([
  "declaration-kind", "declaration-modifier", "declaration-fragment-contract", "declaration-fragment-count",
  "declaration-fragment-modifier", "type-param-count", "type-param-name", "type-param-binding", "type-param-constraint",
  "type-param-default", "type-param-const", "type-param-variance", "type-param-modifier", "type-param-invalid-constraint",
  "function-signature-count", "param-order", "arity", "param-name", "param-role", "param-type",
  "param-annotation-missing", "param-optionality", "param-optional-syntax", "param-question", "param-modifier",
  "param-initializer-status", "param-initializer", "param-initializer-unresolved",
  "variadic-position", "return-type", "return-type-policy", "return-annotation-missing", "function-modifier",
  "interface-heritage", "member-order", "missing-member", "unsupported-member", "extra-member", "duplicate-member",
  "member-overload-count", "member-type", "member-optionality", "member-readonly", "member-definite", "member-modifier",
  "member-annotation-missing", "alias-type", "enum-member-count", "enum-member-name", "enum-member-value",
  "value-annotation-missing", "value-type-unresolved", "value-type", "missing-value", "extra-value",
  "value-declaration-kind", "value-definite", "value-modifier", "unresolved-ref", "unsupported-type",
]);
const INITIALIZER_MISMATCH_KINDS = new Set([
  "value-initializer-status", "value-initializer", "value-initializer-unresolved",
]);
const VALUE_ORDER_MISMATCH_KINDS = new Set(["value-order"]);

export function resolveOverride(localOverride, id, expected, actual, canon, overrideIssues, conventions = {}, ambientReferences = { accept: () => false }) {
  const ignore = new Set();
  const issues = [];
  if (localOverride?.allow?.includes?.("signature")) {
    if (localOverride.runtimeDictionaries === undefined) {
      requireSnapshot(localOverride.goSignatureHash, unitSignatureHash(expected, canon), "goSignatureHash", issues);
      requireSnapshot(localOverride.tsSignatureHash, unitSignatureHash(actual, canon), "tsSignatureHash", issues);
    } else {
      validateRuntimeDictionaryProjection(localOverride.runtimeDictionaries, expected, actual, canon, conventions, ambientReferences, issues);
    }
  }
  if (localOverride?.allow?.includes?.("initializer")) {
    requireSnapshot(localOverride.goInitializer, unitInitializerSnapshot(expected), "goInitializer", issues);
    requireSnapshot(localOverride.tsInitializer, unitInitializerSnapshot(actual), "tsInitializer", issues);
  }
  if (localOverride?.allow?.includes?.("value-order")) {
    requireSnapshot(localOverride.goValueOrder, unitValueOrderSnapshot(expected), "goValueOrder", issues);
    requireSnapshot(localOverride.tsValueOrder, unitValueOrderSnapshot(actual), "tsValueOrder", issues);
  }
  if (issues.length > 0) {
    overrideIssues.push({ id, reason: issues.join("; ") });
    return { ignore, reason: localOverride.reason ?? "" };
  }
  if (localOverride?.allow?.includes?.("signature")) for (const kind of SIGNATURE_MISMATCH_KINDS) ignore.add(kind);
  if (localOverride?.allow?.includes?.("initializer")) for (const kind of INITIALIZER_MISMATCH_KINDS) ignore.add(kind);
  if (localOverride?.allow?.includes?.("value-order")) for (const kind of VALUE_ORDER_MISMATCH_KINDS) ignore.add(kind);
  return { ignore, reason: localOverride?.reason ?? "" };
}

const RUNTIME_DICTIONARY_TYPES = new Map([
  ["zero-value", { id: "packages/tsts/src/go/compat.ts::GoZeroFactory", name: "GoZeroFactory" }],
  ["equality", { id: "packages/tsts/src/go/compat.ts::GoEquality", name: "GoEquality" }],
  ["map-key", { id: "packages/tsts/src/go/compat.ts::GoMapKeyDescriptor", name: "GoMapKeyDescriptor" }],
]);
const RUNTIME_DICTIONARY_PARAMETER_FIELDS = new Set([
  "name", "role", "modifiers", "type", "rest", "optional", "optionalSyntax", "question", "missingType",
  "initializerStatus", "initializer", "initializerIssue",
]);

function validateRuntimeDictionaryProjection(dictionaries, expected, actual, canon, conventions, ambientReferences, issues) {
  if (!Array.isArray(dictionaries) || dictionaries.length === 0 || dictionaries.some((dictionary) => dictionary === null || typeof dictionary !== "object" || Array.isArray(dictionary))) {
    issues.push("runtime dictionary projection requires a non-empty array of dictionary contracts");
    return;
  }
  if (actual?.kind !== "func" || !Array.isArray(actual.signatures) || actual.signatures.length !== 1) {
    issues.push("runtime dictionary projection requires exactly one TypeScript function signature");
    return;
  }
  const signature = actual.signatures[0];
  if (!Array.isArray(signature.params) || !Array.isArray(signature.typeParams)) {
    issues.push("runtime dictionary projection requires complete parameter and type-parameter arrays");
    return;
  }
  const projected = structuredClone(actual);
  const projectedSignature = projected.signatures[0];
  const restIndices = signature.params.flatMap((parameter, index) => parameter?.rest === true ? [index] : []);
  if (restIndices.length > 1 || (restIndices.length === 1 && restIndices[0] !== signature.params.length - 1)) {
    issues.push("runtime dictionary projection requires the TypeScript rest parameter to be unique and last");
    return;
  }
  const dictionaryEnd = restIndices.length === 1 ? restIndices[0] : signature.params.length;
  const firstDictionary = dictionaryEnd - dictionaries.length;
  if (firstDictionary < 0) {
    issues.push(`runtime dictionary projection expected ${dictionaries.length} dictionary parameter(s), found only ${dictionaryEnd} available slot(s)`);
    return;
  }
  for (const [index, dictionary] of dictionaries.entries()) {
    const parameter = signature.params[firstDictionary + index];
    const label = `runtime dictionary '${dictionary.parameter}'`;
    if (parameter?.name !== dictionary.parameter) {
      issues.push(`${label} must occupy dictionary parameter #${firstDictionary + index}; found '${parameter?.name ?? "<missing>"}'`);
      continue;
    }
    const typeParameterIndex = signature.typeParams.findIndex((candidate) => candidate?.name === dictionary.typeParameter);
    if (typeParameterIndex < 0) {
      issues.push(`${label} references missing type parameter '${dictionary.typeParameter}'`);
      continue;
    }
    validateRuntimeDictionaryParameter(parameter, signature.typeParams[typeParameterIndex], typeParameterIndex, dictionary.kind, label, canon, issues);
  }
  projectedSignature.params = [
    ...projectedSignature.params.slice(0, firstDictionary),
    ...projectedSignature.params.slice(dictionaryEnd),
  ];
  const mismatches = compareSignatures(expected, projected, null, canon, conventions, ambientReferences);
  if (mismatches.length > 0) {
    issues.push(`runtime dictionary projection leaves ${mismatches.length} unrelated signature mismatch(es): ${mismatches.slice(0, 4).map((mismatch) => `${mismatch.kind} (${mismatch.detail})`).join("; ")}`);
  }
}

function validateRuntimeDictionaryParameter(parameter, typeParameter, typeParameterIndex, dictionaryKind, label, canon, issues) {
  if (parameter === null || typeof parameter !== "object" || Array.isArray(parameter)) {
    issues.push(`${label} must be a complete parameter descriptor`);
    return;
  }
  const unknownFields = Object.keys(parameter).filter((field) => !RUNTIME_DICTIONARY_PARAMETER_FIELDS.has(field));
  const missingFields = [...RUNTIME_DICTIONARY_PARAMETER_FIELDS].filter((field) => !Object.hasOwn(parameter, field));
  if (unknownFields.length > 0 || missingFields.length > 0) {
    issues.push(`${label} must use the exact parameter descriptor contract; missing=${missingFields.join(",") || "<none>"} unknown=${unknownFields.join(",") || "<none>"}`);
  }
  const expectedStaticFields = {
    role: "parameter",
    modifiers: [],
    rest: false,
    optional: false,
    optionalSyntax: "required",
    question: false,
    missingType: false,
    initializerStatus: "missing",
  };
  for (const [field, expected] of Object.entries(expectedStaticFields)) {
    if (JSON.stringify(parameter?.[field]) !== JSON.stringify(expected)) {
      issues.push(`${label} ${field} must be ${JSON.stringify(expected)}, found ${JSON.stringify(parameter?.[field])}`);
    }
  }
  if (parameter?.initializer !== undefined || parameter?.initializerIssue !== undefined) {
    issues.push(`${label} must not have an initializer or initializer issue`);
  }
  const type = parameter?.type;
  const dictionaryType = RUNTIME_DICTIONARY_TYPES.get(dictionaryKind);
  if (dictionaryType === undefined) {
    issues.push(`${label} has unsupported dictionary kind '${dictionaryKind}'`);
    return;
  }
  const canonicalDictionary = type?.t === "ref" && typeof type.id === "string" ? canon(type.id) : undefined;
  if (type?.t !== "ref" || canonicalDictionary !== canon(dictionaryType.id) || !Array.isArray(type.args) || type.args.length !== 1) {
    issues.push(`${label} must have exact type ${dictionaryType.name}<${typeParameter.name}>`);
    return;
  }
  const argument = type.args[0];
  const binding = typeParameter?.binding;
  if (argument?.t !== "tp" || argument.depth !== binding?.depth || argument.index !== binding?.index || binding?.index !== typeParameterIndex) {
    issues.push(`${label} must reference the exact lexical type parameter '${typeParameter.name}'`);
  }
}

function requireSnapshot(recorded, current, name, issues) {
  if (recorded !== current) issues.push(`${name} snapshot drifted: metadata=${recorded ?? "<missing>"} current=${current}`);
}

function unitInitializerSnapshot(descriptor) {
  if (descriptor?.kind === "profileVariants") {
    return profileSnapshot(descriptor, unitInitializerSnapshot, "initializer");
  }
  if (descriptor?.kind !== "value") return "<not-value>";
  return (descriptor.decls ?? []).map((declaration) =>
    `${declaration.name}=${declaration.valueIssue !== undefined ? `unresolved:${declaration.valueIssue}` : JSON.stringify(declaration.value)}`,
  ).join(";");
}

function unitValueOrderSnapshot(descriptor) {
  if (descriptor?.kind === "profileVariants") {
    return profileSnapshot(descriptor, unitValueOrderSnapshot, "value-order");
  }
  if (descriptor?.kind !== "value") return "<not-value>";
  return (descriptor.decls ?? []).map((declaration) => declaration.name).join(",");
}

function profileSnapshot(descriptor, snapshot, label) {
  if (!Array.isArray(descriptor.variants) || descriptor.variants.length === 0) {
    throw new Error(`profile-aware ${label} snapshot requires at least one semantic variant`);
  }
  return descriptor.variants.map((variant) => {
    if (!Array.isArray(variant.profiles) || variant.profiles.length === 0) {
      throw new Error(`profile-aware ${label} snapshot requires a non-empty profile identity list`);
    }
    return `${JSON.stringify(variant.profiles)}=>${snapshot(variant.descriptor)}`;
  }).join("|");
}

export function unitSignatureSnapshot(descriptor, canon = (identity) => identity) {
  if (!descriptor) return "<missing>";
  return stableSnapshot(descriptor, canon);
}

export function unitSignatureHash(descriptor, canon = (identity) => identity) {
  return hashText(unitSignatureSnapshot(descriptor, canon));
}

function stableSnapshot(value, canon = (identity) => identity, owner = undefined) {
  return JSON.stringify(snapshotValue(value, canon, owner));
}

function snapshotValue(value, canon, owner) {
  if (value === undefined) return ["undefined"];
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return ["array", value.map((item) => snapshotValue(item, canon))];
  const entries = Object.keys(value).sort().map((key) => {
    const child = (value.t === "ref" || value.t === "query") && key === "id" ? canon(value[key]) : value[key];
    return [key, snapshotValue(child, canon, value)];
  });
  return ["object", entries];
}

export function withSignatureOverrideHashes(mismatches, expected, actual, canon = (identity) => identity) {
  const goSignatureHash = unitSignatureHash(expected, canon);
  const tsSignatureHash = unitSignatureHash(actual, canon);
  return mismatches.map((mismatch) => ({ ...mismatch, goSignatureHash, tsSignatureHash }));
}

export { unitInitializerSnapshot, unitValueOrderSnapshot };

export function validateOverrideUse(localOverride, mismatches, id, overrideIssues) {
  if (!Array.isArray(localOverride?.allow)) return;
  for (const [aspect, kinds] of [
    ["signature", SIGNATURE_MISMATCH_KINDS],
    ["initializer", INITIALIZER_MISMATCH_KINDS],
    ["value-order", VALUE_ORDER_MISMATCH_KINDS],
  ]) {
    if (localOverride.allow.includes(aspect) && !mismatches.some((mismatch) => kinds.has(mismatch.kind))) {
      overrideIssues.push({ id, reason: `unused '${aspect}' override allowance: the current Go and TypeScript contracts have no ${aspect} mismatch` });
    }
  }
}
