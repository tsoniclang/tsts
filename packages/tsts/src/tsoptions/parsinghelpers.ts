/**
 * Option value parsing helpers.
 *
 * Port skeleton of TS-Go `internal/tsoptions/parsinghelpers.go`
 * (~631 LoC). Provides value-conversion helpers used by both the
 * command-line parser and tsconfig.json parser:
 * - boolean ("true"/"false"/missing) coercion
 * - number parsing with diagnostics
 * - enum-string → enum-value lookup
 * - list parsing (comma-separated and JSON arrays)
 * - path normalization
 *
 * Skeleton exposes the public functions with minimal bodies — tests
 * will drive fill-in.
 */

import type { CommandLineOption } from "./commandlineoption.js";

export function convertJsonOption(
  opt: CommandLineOption,
  value: unknown,
  basePath: string,
  errors: unknown[],
): unknown {
  if (value === undefined) return undefined;
  switch (opt.type) {
    case "string": return String(value);
    case "number": return typeof value === "number" ? value : Number(value);
    case "boolean": return Boolean(value);
    case "list": return convertJsonOptionOfListType(opt, value, basePath, errors);
    case "listOrElement":
      if (Array.isArray(value)) return convertJsonOptionOfListType(opt, value, basePath, errors);
      return convertJsonOption(opt.element!, value, basePath, errors);
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
  return (values as unknown[]).map((v) => convertJsonOption(opt.element!, v, basePath, errors));
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
  if (opt.type === "string" && opt.isFilePath === true) {
    return joinPaths(basePath, String(value));
  }
  return value;
}

declare function joinPaths(base: string, relative: string): string;
