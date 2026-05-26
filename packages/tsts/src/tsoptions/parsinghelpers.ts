/**
 * Option-value parsing helpers.
 *
 * Port of TS-Go `internal/tsoptions/parsinghelpers.go` (~631 LoC).
 * Provides value-conversion helpers used by both the command-line
 * parser and tsconfig.json parser:
 * - Tristate / boolean / number / string / list / map parsing
 * - Path normalization
 * - Per-option-type conversion helpers
 * - Compiler/Watch/TypeAcquisition options assembly from raw JSON
 *
 * Cross-module deps forward-declared at file end.
 */

import { Tristate } from "../core/tristate.js";
import type { CommandLineOption } from "./commandlineoption.js";
import type { ProjectReference } from "../core/projectreference.js";

// ---------------------------------------------------------------------------
// Primitive parsers
// ---------------------------------------------------------------------------

export function parseTristate(value: unknown): Tristate {
  if (value === undefined || value === null) return Tristate.Unknown;
  if (typeof value === "number") return value as Tristate;
  if (value === true) return Tristate.True;
  return Tristate.False;
}

export function parseStringArray(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return [];
  const result: string[] = [];
  for (const v of value as readonly unknown[]) {
    if (typeof v === "string") result.push(v);
  }
  return result;
}

export function parseStringMap(value: unknown): ReadonlyMap<string, readonly string[]> | undefined {
  if (value === null || typeof value !== "object") return undefined;
  if (Array.isArray(value)) return undefined;
  const map = new Map<string, readonly string[]>();
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    map.set(k, parseStringArray(v));
  }
  return map;
}

export function parseString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function parseNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined;
}

export function parseProjectReference(json: unknown): readonly ProjectReference[] {
  if (!Array.isArray(json)) return [];
  const result: ProjectReference[] = [];
  for (const entry of json as readonly unknown[]) {
    if (entry === null || typeof entry !== "object") continue;
    const obj = entry as Record<string, unknown>;
    const path = typeof obj.path === "string" ? obj.path : "";
    const circular = obj.circular === true;
    const originalPath = typeof obj.originalPath === "string" ? obj.originalPath : undefined;
    result.push({ path, circular, originalPath });
  }
  return result;
}

export function parseBooleanFromText(value: string): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export function parseIntFromString(value: string): number | undefined {
  if (!/^-?\d+$/.test(value)) return undefined;
  return parseInt(value, 10);
}

// ---------------------------------------------------------------------------
// Option-aware value conversion
// ---------------------------------------------------------------------------

export function convertJsonOption(
  opt: CommandLineOption | undefined,
  value: unknown,
  basePath: string,
  errors: unknown[],
): unknown {
  if (opt === undefined) return value;
  if (value === undefined || value === null) return undefined;
  switch (opt.type) {
    case "string": return parseString(value);
    case "number": return parseNumber(value);
    case "boolean": return Boolean(value);
    case "list": return convertJsonOptionOfListType(opt, value, basePath, errors);
    case "listOrElement":
      if (Array.isArray(value)) return convertJsonOptionOfListType(opt, value, basePath, errors);
      return opt.element !== undefined ? convertJsonOption(opt.element, value, basePath, errors) : value;
    case "object": return value;
  }
  if (opt.type instanceof Map) {
    const m = opt.type as ReadonlyMap<string, number>;
    return m.get(String(value).toLowerCase());
  }
  return value;
}

export function convertJsonOptionOfListType(
  opt: CommandLineOption,
  values: unknown,
  basePath: string,
  errors: unknown[],
): unknown[] {
  if (!Array.isArray(values)) return [];
  if (opt.element === undefined) return values as unknown[];
  return (values as readonly unknown[]).map((v) => convertJsonOption(opt.element, v, basePath, errors));
}

export function normalizeOptionValue(
  opt: CommandLineOption,
  basePath: string,
  value: unknown,
  errors: unknown[],
): unknown {
  if (value === null || value === undefined) return undefined;
  if (opt.type === "list" || opt.type === "listOrElement") {
    return convertJsonOptionOfListType(opt, value, basePath, errors);
  }
  if (opt.type === "string" && opt.isFilePath === true && typeof value === "string") {
    return joinPaths(basePath, value);
  }
  return value;
}

// ---------------------------------------------------------------------------
// Compiler/Watch/TypeAcquisition object assembly
// ---------------------------------------------------------------------------

export interface ParsedOptionsResult {
  options: Record<string, unknown>;
  errors: readonly unknown[];
}

/**
 * Assemble a typed-options object from raw JSON, given the
 * known-options name-map. Mirrors TS-Go `convertOptionsFromJson`.
 */
export function convertOptionsFromJson(
  optionsNameMap: ReadonlyMap<string, CommandLineOption>,
  jsonOptions: unknown,
  basePath: string,
): ParsedOptionsResult {
  const options: Record<string, unknown> = {};
  const errors: unknown[] = [];
  if (jsonOptions === null || typeof jsonOptions !== "object" || Array.isArray(jsonOptions)) {
    return { options, errors };
  }
  for (const [key, rawValue] of Object.entries(jsonOptions as Record<string, unknown>)) {
    const opt = optionsNameMap.get(key);
    if (opt === undefined) {
      continue;
    }
    options[opt.name] = convertJsonOption(opt, rawValue, basePath, errors);
  }
  return { options, errors };
}

// ---------------------------------------------------------------------------
// Forward-declared
// ---------------------------------------------------------------------------

declare function joinPaths(base: string, relative: string): string;
