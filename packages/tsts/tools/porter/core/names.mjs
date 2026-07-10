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
