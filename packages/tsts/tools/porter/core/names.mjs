import { createHash } from "node:crypto";

export function localTsName(unit) {
  const ordinal = /::#(\d+)$/.exec(unit.id ?? "");
  const authored = unit.receiver ? `${unit.receiver}_${unit.name}` : unit.name;
  const name = safeIdentifier(ordinal === null ? authored : `${authored}__${ordinal[1]}`);
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

export function uniqueName(name, used) {
  const base = name === "" ? "arg" : name;
  let candidate = base;
  let index = 0;
  while (used.has(candidate)) candidate = `${base}${++index}`;
  used.add(candidate);
  return candidate;
}

export function unitHash(unit) {
  return createHash("sha256").update(unit?.id ?? "").digest("hex").slice(0, 8);
}

export function blankValueName(unit, blankIndex) {
  return `${localTsName(unit)}_${unitHash(unit)}_${blankIndex}`;
}

export function safePropertyName(value) {
  const name = String(value ?? "");
  const safe = safeIdentifier(name);
  if (safe === name && safe !== "" && safe !== "_") return safe;
  return JSON.stringify(name);
}

export const reservedWords = new Set([
  "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else",
  "enum", "export", "extends", "false", "finally", "for", "function", "if", "import", "in", "instanceof",
  "new", "null", "return", "super", "switch", "this", "throw", "true", "try", "typeof", "var", "void",
  "while", "with", "as", "implements", "interface", "let", "package", "private", "protected", "public",
  "static", "yield", "any", "arguments", "boolean", "constructor", "declare", "get", "module", "require", "number",
  "set", "string", "symbol", "type", "from", "of",
]);
