import {
  activePortCategories,
  matchGlob,
} from "./common.mjs";

export const primitiveTypes = new Map([
  ["any", { source: "inline", name: "unknown" }],
  ["bool", { source: "core", name: "bool" }],
  ["byte", { source: "core", name: "byte" }],
  ["complex64", { source: "compat", name: "GoComplex64" }],
  ["complex128", { source: "compat", name: "GoComplex128" }],
  ["error", { source: "compat", name: "GoError" }],
  ["float32", { source: "core", name: "float" }],
  ["float64", { source: "core", name: "double" }],
  ["int", { source: "core", name: "int" }],
  ["int8", { source: "core", name: "sbyte" }],
  ["int16", { source: "core", name: "short" }],
  ["int32", { source: "core", name: "int" }],
  ["int64", { source: "core", name: "long" }],
  ["rune", { source: "compat", name: "GoRune" }],
  ["string", { source: "inline", name: "string" }],
  ["uint", { source: "core", name: "uint" }],
  ["uint8", { source: "core", name: "byte" }],
  ["uint16", { source: "core", name: "ushort" }],
  ["uint32", { source: "core", name: "uint" }],
  ["uint64", { source: "core", name: "ulong" }],
  ["uintptr", { source: "core", name: "nuint" }],
  ["unsafe.Pointer", { source: "compat", name: "GoUnsafePointer" }],
]);

export const standardSelectorTypes = new Map([
  ["cmp.Ordered", "GoOrdered"],
  ["constraints.Ordered", "GoOrdered"],
  ["iter.Seq", "GoSeq"],
  ["iter.Seq2", "GoSeq2"],
  ["unsafe.Pointer", "GoUnsafePointer"],
]);

export function localTsName(unit) {
  const name = safeIdentifier(unit.receiver ? `${unit.receiver}_${unit.name}` : unit.name);
  return name || "tsgoUnimplemented";
}

export function safeIdentifier(value) {
  const name = String(value ?? "")
    .replace(/[^A-Za-z0-9_$]/g, "_")
    .replace(/^([0-9])/, "_$1");
  if (name === "" || name === "_") return name;
  if (reservedWords.has(name)) return `${name}_`;
  return name;
}

export function safeParamName(value) {
  const name = safeIdentifier(value);
  if (name === "" || name === "_") return "arg";
  return name;
}

export function safePropertyName(value) {
  const name = String(value ?? "");
  const safe = safeIdentifier(name);
  if (safe === name && safe !== "" && safe !== "_") return safe;
  return JSON.stringify(name);
}

const reservedWords = new Set([
  "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else",
  "enum", "export", "extends", "false", "finally", "for", "function", "if", "import", "in", "instanceof",
  "new", "null", "return", "super", "switch", "this", "throw", "true", "try", "typeof", "var", "void",
  "while", "with", "as", "implements", "interface", "let", "package", "private", "protected", "public",
  "static", "yield", "any", "arguments", "boolean", "constructor", "declare", "get", "module", "require", "number",
  "set", "string", "symbol", "type", "from", "of",
]);

export function expectedTsPath(config, unit, largeFileSplits = undefined) {
  const splitTarget = largeFileSplits?.assignments?.[unit.id];
  if (splitTarget) return splitTarget;
  const goPath = unit.metadata.goPath;
  return `${config.tsRoot}/${goPath.replace(/\.go$/, ".ts")}`;
}

export function policyFor(config, rel, generated) {
  const inactivePolicy = (config.policies ?? []).find((candidate) => candidate.active === false && matchGlob(candidate.match, rel));
  if (inactivePolicy) {
    return { category: inactivePolicy.category, active: inactivePolicy.active, reason: inactivePolicy.reason };
  }
  if (generated) {
    return { category: "generated", reason: "Go file is marked generated." };
  }
  const override = (config.overrides ?? []).find((candidate) => matchGlob(candidate.match, rel));
  if (override) {
    return { category: override.category, reason: override.reason };
  }
  const policy = (config.policies ?? []).find((candidate) => matchGlob(candidate.match, rel));
  if (policy) {
    return { category: policy.category, reason: policy.reason };
  }
  return { category: "literal-port", reason: "Default production compiler unit: mechanically port from TS-Go." };
}

export function policyForUnit(config, unit, file = undefined) {
  const unitPolicy = (config.unitPolicies ?? []).find((candidate) => {
    if (candidate.id && candidate.id === unit.id) return true;
    if (candidate.match && matchGlob(candidate.match, unit.id)) return true;
    return false;
  });
  if (unitPolicy) {
    return {
      category: unitPolicy.category,
      active: unitPolicy.active,
      reason: unitPolicy.reason,
    };
  }
  return policyFor(config, unit.metadata.goPath, unit.generated || file?.generated);
}

export function isActivePortPolicy(policy) {
  return policy.active !== false && activePortCategories.has(policy.category);
}

export function tsFilePolicyFor(config, rel) {
  const policy = (config.tsFilePolicies ?? []).find((candidate) => matchGlob(candidate.match, rel));
  if (policy) {
    return { category: policy.category, reason: policy.reason };
  }
  return { category: "unclassified-ts-source", reason: "No TypeScript source policy matched this file." };
}
