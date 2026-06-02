/**
 * The authoritative numeric-primitive table for "@tsonic/core/types.js".
 *
 * Each row maps a SOURCE spelling (the name as exported by the module, e.g.
 * `int`, `ushort`, `bool`) to its source-language numeric intent. This is the
 * single source of truth the numeric-primitives extension consults when a type
 * reference resolves to one of these imported primitives.
 *
 * IMPORTANT (spec "Example: Numeric Primitive Facts"): the recorded fact
 * describes SOURCE-LANGUAGE semantics only — `kind`, `runtimeBase`, `signed`,
 * `width`. It carries NO backend data (no `csharpKeyword`, no `clrType`); the
 * backend mapping is a consumer (Tsonic emitter) responsibility.
 *
 * Modeled as a const-map object keyed by source name (NOT a TS enum / namespace)
 * so the file is type-strippable under Node's native loader.
 *
 * `signed` is OMITTED entirely for the floating/decimal/non-integer primitives
 * (half, float, double, decimal, bool, char) — leaving it `undefined` per the
 * authoritative table — rather than recorded as a value.
 */

/** The runtime carrier a source primitive lowers onto in the host language. */
export type NumericRuntimeBase = "number" | "boolean" | "string";

/** The declared bit width, or "pointer" for native-pointer-width primitives. */
export type NumericWidth = number | "pointer";

/** One row of source-language numeric intent (no backend data). */
export interface PrimitiveTableEntry {
  readonly kind: string;
  readonly runtimeBase: NumericRuntimeBase;
  readonly signed?: boolean;
  readonly width: NumericWidth;
}

/**
 * The 18 recognized source primitives, keyed by the name exported from
 * "@tsonic/core/types.js". `signed` is present only where the table defines it.
 */
export const NUMERIC_PRIMITIVE_TABLE: Readonly<Record<string, PrimitiveTableEntry>> = {
  sbyte: { kind: "int8", runtimeBase: "number", signed: true, width: 8 },
  byte: { kind: "uint8", runtimeBase: "number", signed: false, width: 8 },
  short: { kind: "int16", runtimeBase: "number", signed: true, width: 16 },
  ushort: { kind: "uint16", runtimeBase: "number", signed: false, width: 16 },
  int: { kind: "int32", runtimeBase: "number", signed: true, width: 32 },
  uint: { kind: "uint32", runtimeBase: "number", signed: false, width: 32 },
  long: { kind: "int64", runtimeBase: "number", signed: true, width: 64 },
  ulong: { kind: "uint64", runtimeBase: "number", signed: false, width: 64 },
  nint: { kind: "nint", runtimeBase: "number", signed: true, width: "pointer" },
  nuint: { kind: "nuint", runtimeBase: "number", signed: false, width: "pointer" },
  int128: { kind: "int128", runtimeBase: "number", signed: true, width: 128 },
  uint128: { kind: "uint128", runtimeBase: "number", signed: false, width: 128 },
  half: { kind: "float16", runtimeBase: "number", width: 16 },
  float: { kind: "float32", runtimeBase: "number", width: 32 },
  double: { kind: "float64", runtimeBase: "number", width: 64 },
  decimal: { kind: "decimal", runtimeBase: "number", width: 128 },
  bool: { kind: "bool", runtimeBase: "boolean", width: 1 },
  char: { kind: "char", runtimeBase: "string", width: 16 },
} as const;

/** Look up a source primitive row by its exported name. */
export function lookupPrimitive(sourceName: string): PrimitiveTableEntry | undefined {
  return Object.prototype.hasOwnProperty.call(NUMERIC_PRIMITIVE_TABLE, sourceName)
    ? NUMERIC_PRIMITIVE_TABLE[sourceName]
    : undefined;
}
