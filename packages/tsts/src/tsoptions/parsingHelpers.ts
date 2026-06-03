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
import type { CommandLineOption } from "./commandLineOption.js";
import type { ProjectReference } from "../core/projectReference.js";
import { combinePaths as joinPaths, getNormalizedAbsolutePath } from "../tspath/path.js";
import { map as coreMap } from "../core/core.js";
import type { OrderedMap } from "../collections/orderedMap.js";
import type { CommandLineOptionNameMap } from "./tsconfigParsing.js";

// ---------------------------------------------------------------------------
// Primitive parsers
// ---------------------------------------------------------------------------

export function parseTristate(value: unknown): Tristate {
  if (value === undefined || value === null) {
    return Tristate.Unknown;
  }
  if (typeof value === "number") {
    return value as Tristate;
  }
  if (value === true) {
    return Tristate.True;
  } else {
    return Tristate.False;
  }
}

export function parseStringArray(value: unknown): readonly string[] {
  if (Array.isArray(value)) {
    const arr = value as readonly unknown[];
    const result: string[] = [];
    for (const v of arr) {
      if (typeof v === "string") {
        result.push(v);
      }
    }
    return result;
  }
  return [];
}

export function parseStringMap(value: unknown): ReadonlyMap<string, readonly string[]> | undefined {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    const m = value as Record<string, unknown>;
    const result = new Map<string, readonly string[]>();
    for (const [k, v] of Object.entries(m)) {
      result.set(k, parseStringArray(v));
    }
    return result;
  }
  return undefined;
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
    const ref: ProjectReference = typeof obj.originalPath === "string"
      ? { path, circular, originalPath: obj.originalPath }
      : { path, circular };
    result.push(ref);
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
// Absolute-path conversion
// ---------------------------------------------------------------------------

/**
 * Port of TS-Go `parsinghelpers.go#convertToOptionsWithAbsolutePaths`. Walks
 * the raw options map and rewrites file-path option values to normalized
 * absolute paths.
 */
export function convertToOptionsWithAbsolutePaths(
  optionsBase: OrderedMap<string, unknown> | undefined,
  optionMap: CommandLineOptionNameMap,
  cwd: string,
): OrderedMap<string, unknown> | undefined {
  // !!! convert to options with absolute paths was previously done with `CompilerOptions` object, but for ease of implementation, we do it pre-conversion.
  // !!! Revisit this choice if/when refactoring when conversion is done in tsconfig parsing
  if (optionsBase === undefined) {
    return undefined;
  }
  for (const [o, v] of optionsBase.entries()) {
    const { value: result, ok } = convertOptionToAbsolutePath(o, v, optionMap, cwd);
    if (ok) {
      optionsBase.set(o, result);
    }
  }
  return optionsBase;
}

/**
 * Port of TS-Go `parsinghelpers.go#ConvertOptionToAbsolutePath`. Returns the
 * absolute-path-normalized value and whether the option carries a file path
 * that was rewritten. The `ok` flag mirrors Go's second return value.
 */
export function convertOptionToAbsolutePath(
  o: string,
  v: unknown,
  optionMap: CommandLineOptionNameMap,
  cwd: string,
): { value: unknown; ok: boolean } {
  const option = optionMap.get(o);
  if (option === undefined) {
    return { value: undefined, ok: false };
  }
  if (option.type === "list") {
    const elements = option.element ?? option.elements?.();
    if (elements !== undefined && elements.isFilePath === true) {
      if (isStringArray(v)) {
        return { value: coreMap(v, (item) => getNormalizedAbsolutePath(item, cwd)), ok: true };
      }
      if (Array.isArray(v)) {
        return {
          value: coreMap(v as readonly unknown[], (item) =>
            typeof item === "string" ? getNormalizedAbsolutePath(item, cwd) : item),
          ok: true,
        };
      }
    }
  } else if (option.isFilePath === true) {
    if (typeof v === "string") {
      return { value: getNormalizedAbsolutePath(v, cwd), ok: true };
    }
  }
  return { value: undefined, ok: false };
}

function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

// ---------------------------------------------------------------------------
// Forward-declared
// ---------------------------------------------------------------------------

