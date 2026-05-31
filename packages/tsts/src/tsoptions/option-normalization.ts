/**
 * Option normalization and serialization.
 *
 * This is the executable companion for TS-Go `parsinghelpers.go` and
 * `showconfig.go`: command-line/JSON values are normalized through the
 * option declaration shape, and effective compiler options are serialized
 * back to the JSON representation used by `--showConfig`.
 */

import type { CompilerOptions } from "../core/compileroptions.js";
import { Tristate } from "../core/tristate.js";
import {
  getAllowImportingTsExtensions,
  getAllowJS,
  getAreDeclarationMapsEnabled,
  getEmitDeclarations,
  getEmitModuleDetectionKind,
  getEmitModuleKind,
  getModuleResolutionKind,
  getResolveJsonModule,
  getResolvePackageJsonExports,
  getResolvePackageJsonImports,
  getUseDefineForClassFields,
  isIncremental,
  shouldPreserveConstEnums,
} from "../core/compileroptions.js";
import { getNormalizedAbsolutePath, getRelativePathFromFile, type ComparePathsOptions } from "../tspath/index.js";
import type { CommandLineOption } from "./commandlineoption.js";
import { libMap } from "./enummaps.js";
import { optionDeclarations } from "./declscompiler.js";
import { optionCatalog, type OptionCatalogEntry } from "./option-catalog.js";

export interface NormalizedOptionValue {
  readonly option: string;
  readonly value: unknown;
  readonly source: "commandLine" | "tsconfig" | "computed";
}

export interface OptionNormalizationDiagnostic {
  readonly option: string;
  readonly message: string;
  readonly value: unknown;
}

export interface OptionNormalizationResult {
  readonly options: Record<string, unknown>;
  readonly diagnostics: readonly OptionNormalizationDiagnostic[];
}

export interface SerializedCompilerOptions {
  readonly values: Record<string, unknown>;
  readonly implied: readonly NormalizedOptionValue[];
}

const compilerOptionMap: ReadonlyMap<string, CommandLineOption> = buildOptionMap(optionDeclarations);
const catalogMap: ReadonlyMap<string, OptionCatalogEntry> = buildCatalogMap();

function buildOptionMap(options: readonly CommandLineOption[]): ReadonlyMap<string, CommandLineOption> {
  const map = new Map<string, CommandLineOption>();
  for (const option of options) {
    map.set(option.name.toLowerCase(), option);
    if (option.shortName !== undefined) map.set(option.shortName.toLowerCase(), option);
  }
  return map;
}

function buildCatalogMap(): ReadonlyMap<string, OptionCatalogEntry> {
  const map = new Map<string, OptionCatalogEntry>();
  for (const option of optionCatalog) {
    map.set(option.name.toLowerCase(), option);
    if (option.shortName !== undefined) map.set(option.shortName.toLowerCase(), option);
  }
  return map;
}

export function normalizeCompilerOptionsFromJson(
  jsonOptions: unknown,
  basePath: string,
): OptionNormalizationResult {
  const options: Record<string, unknown> = {};
  const diagnostics: OptionNormalizationDiagnostic[] = [];
  if (jsonOptions === undefined || jsonOptions === null) return { options, diagnostics };
  if (typeof jsonOptions !== "object" || Array.isArray(jsonOptions)) {
    return {
      options,
      diagnostics: [{ option: "compilerOptions", message: "compilerOptions must be an object.", value: jsonOptions }],
    };
  }
  for (const [name, raw] of Object.entries(jsonOptions as Record<string, unknown>)) {
    const option = compilerOptionMap.get(name.toLowerCase());
    if (option === undefined) {
      diagnostics.push({ option: name, message: `Unknown compiler option '${name}'.`, value: raw });
      continue;
    }
    const normalized = normalizeOptionValue(option, raw, basePath, "tsconfig");
    diagnostics.push(...normalized.diagnostics);
    if (normalized.ok) options[option.name] = normalized.value;
  }
  return { options, diagnostics };
}

export function normalizeCommandLineOption(
  optionName: string,
  rawValue: string | undefined,
  currentDirectory: string,
): { readonly option: CommandLineOption | undefined; readonly result: OptionNormalizationResult } {
  const option = compilerOptionMap.get(optionName.toLowerCase());
  if (option === undefined) {
    return {
      option: undefined,
      result: {
        options: {},
        diagnostics: [{ option: optionName, message: `Unknown compiler option '${optionName}'.`, value: rawValue }],
      },
    };
  }
  const value = rawValue === undefined && option.type === "boolean" ? true : rawValue;
  const normalized = normalizeOptionValue(option, value, currentDirectory, "commandLine");
  return {
    option,
    result: {
      options: normalized.ok ? { [option.name]: normalized.value } : {},
      diagnostics: normalized.diagnostics,
    },
  };
}

function normalizeOptionValue(
  option: CommandLineOption,
  value: unknown,
  basePath: string,
  source: "commandLine" | "tsconfig",
): { readonly ok: boolean; readonly value: unknown; readonly diagnostics: readonly OptionNormalizationDiagnostic[] } {
  if (value === null || value === undefined) {
    if (option.disallowNullOrUndefined === true || option.name === "extends") {
      return {
        ok: false,
        value,
        diagnostics: [{ option: option.name, message: `Option '${option.name}' cannot be null or undefined.`, value }],
      };
    }
    return { ok: true, value: undefined, diagnostics: [] };
  }
  if (option.type === "boolean") return normalizeBooleanOption(option, value, source);
  if (option.type === "number") return normalizeNumberOption(option, value);
  if (option.type === "string") return normalizeStringOption(option, value, basePath);
  if (option.type === "object") return normalizeObjectOption(option, value);
  if (option.type === "list" || option.type === "listOrElement") return normalizeListOption(option, value, basePath, source);
  return normalizeEnumOption(option, value);
}

function normalizeBooleanOption(
  option: CommandLineOption,
  value: unknown,
  source: "commandLine" | "tsconfig",
): { readonly ok: boolean; readonly value: unknown; readonly diagnostics: readonly OptionNormalizationDiagnostic[] } {
  if (typeof value === "boolean") return { ok: true, value, diagnostics: [] };
  if (source === "commandLine" && (value === "true" || value === "false")) {
    return { ok: true, value: value === "true", diagnostics: [] };
  }
  return {
    ok: false,
    value,
    diagnostics: [{ option: option.name, message: `Option '${option.name}' expects a boolean value.`, value }],
  };
}

function normalizeNumberOption(
  option: CommandLineOption,
  value: unknown,
): { readonly ok: boolean; readonly value: unknown; readonly diagnostics: readonly OptionNormalizationDiagnostic[] } {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isFinite(parsed)) {
    return {
      ok: false,
      value,
      diagnostics: [{ option: option.name, message: `Option '${option.name}' expects a number.`, value }],
    };
  }
  if (option.minValue !== undefined && parsed < option.minValue) {
    return {
      ok: false,
      value,
      diagnostics: [{ option: option.name, message: `Option '${option.name}' must be at least ${option.minValue}.`, value }],
    };
  }
  return { ok: true, value: parsed, diagnostics: [] };
}

function normalizeStringOption(
  option: CommandLineOption,
  value: unknown,
  basePath: string,
): { readonly ok: boolean; readonly value: unknown; readonly diagnostics: readonly OptionNormalizationDiagnostic[] } {
  if (typeof value !== "string") {
    return {
      ok: false,
      value,
      diagnostics: [{ option: option.name, message: `Option '${option.name}' expects a string.`, value }],
    };
  }
  if (option.isFilePath === true && value !== "") {
    return { ok: true, value: getNormalizedAbsolutePath(value, basePath), diagnostics: [] };
  }
  return { ok: true, value, diagnostics: [] };
}

function normalizeObjectOption(
  option: CommandLineOption,
  value: unknown,
): { readonly ok: boolean; readonly value: unknown; readonly diagnostics: readonly OptionNormalizationDiagnostic[] } {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) return { ok: true, value, diagnostics: [] };
  return {
    ok: false,
    value,
    diagnostics: [{ option: option.name, message: `Option '${option.name}' expects an object.`, value }],
  };
}

function normalizeListOption(
  option: CommandLineOption,
  value: unknown,
  basePath: string,
  source: "commandLine" | "tsconfig",
): { readonly ok: boolean; readonly value: unknown; readonly diagnostics: readonly OptionNormalizationDiagnostic[] } {
  const rawValues = Array.isArray(value)
    ? value
    : source === "commandLine" && typeof value === "string"
      ? value.split(",").filter((part) => part !== "")
      : option.type === "listOrElement"
        ? [value]
        : undefined;
  if (rawValues === undefined) {
    return {
      ok: false,
      value,
      diagnostics: [{ option: option.name, message: `Option '${option.name}' expects a list.`, value }],
    };
  }
  const element = option.element ?? option.elements?.();
  if (element === undefined) return { ok: true, value: rawValues, diagnostics: [] };
  const diagnostics: OptionNormalizationDiagnostic[] = [];
  const normalized: unknown[] = [];
  for (const item of rawValues) {
    const one = normalizeOptionValue(element, item, basePath, source);
    diagnostics.push(...one.diagnostics);
    if (one.ok) normalized.push(one.value);
  }
  return { ok: diagnostics.length === 0, value: normalized, diagnostics };
}

function normalizeEnumOption(
  option: CommandLineOption,
  value: unknown,
): { readonly ok: boolean; readonly value: unknown; readonly diagnostics: readonly OptionNormalizationDiagnostic[] } {
  if (!(option.type instanceof Map)) {
    return {
      ok: false,
      value,
      diagnostics: [{ option: option.name, message: `Option '${option.name}' has no enum map.`, value }],
    };
  }
  const key = String(value).toLowerCase();
  const enumValue = option.type.get(key);
  if (enumValue === undefined) {
    return {
      ok: false,
      value,
      diagnostics: [{ option: option.name, message: `Option '${option.name}' has an invalid enum value '${String(value)}'.`, value }],
    };
  }
  return { ok: true, value: enumValue, diagnostics: [] };
}

export function serializeCompilerOptionsForShowConfig(
  options: CompilerOptions,
  configFilePath: string,
  comparePathsOptions: ComparePathsOptions,
): SerializedCompilerOptions {
  const result: Record<string, unknown> = {};
  const implied: NormalizedOptionValue[] = [];
  for (const option of optionDeclarations) {
    if (option.isCommandLineOnly === true) continue;
    const value = getCompilerOptionValue(options, option.name);
    if (value === undefined || value === Tristate.Unknown) continue;
    result[option.name] = serializeOptionValue(option, value, configFilePath, comparePathsOptions);
  }
  addImpliedOption(result, implied, "module", getEmitModuleKind(options));
  addImpliedOption(result, implied, "moduleResolution", getModuleResolutionKind(options));
  addImpliedOption(result, implied, "moduleDetection", getEmitModuleDetectionKind(options));
  addImpliedOption(result, implied, "isolatedModules", getBooleanValue(options.isolatedModules) || getBooleanValue(options.verbatimModuleSyntax));
  addImpliedOption(result, implied, "preserveConstEnums", shouldPreserveConstEnums(options));
  addImpliedOption(result, implied, "declaration", getEmitDeclarations(options));
  addImpliedOption(result, implied, "declarationMap", getAreDeclarationMapsEnabled(options));
  addImpliedOption(result, implied, "incremental", isIncremental(options));
  addImpliedOption(result, implied, "useDefineForClassFields", getUseDefineForClassFields(options));
  addImpliedOption(result, implied, "resolvePackageJsonExports", getResolvePackageJsonExports(options));
  addImpliedOption(result, implied, "resolvePackageJsonImports", getResolvePackageJsonImports(options));
  addImpliedOption(result, implied, "resolveJsonModule", getResolveJsonModule(options));
  addImpliedOption(result, implied, "allowJs", getAllowJS(options));
  addImpliedOption(result, implied, "allowImportingTsExtensions", getAllowImportingTsExtensions(options));
  return { values: result, implied };
}

function addImpliedOption(
  result: Record<string, unknown>,
  implied: NormalizedOptionValue[],
  option: string,
  value: unknown,
): void {
  if (result[option] !== undefined || value === undefined || value === false || value === 0) return;
  result[option] = value;
  implied.push({ option, value, source: "computed" });
}

function getCompilerOptionValue(options: CompilerOptions, name: string): unknown {
  return (options as unknown as Record<string, unknown>)[name];
}

function serializeOptionValue(
  option: CommandLineOption,
  value: unknown,
  configFilePath: string,
  comparePathsOptions: ComparePathsOptions,
): unknown {
  if (option.type === "boolean") return getBooleanValue(value);
  if (option.type === "list" || option.type === "listOrElement") {
    const values = Array.isArray(value) ? value : [value];
    const element = option.element ?? option.elements?.();
    return values.map((item) => element === undefined
      ? item
      : serializeOptionValue(element, item, configFilePath, comparePathsOptions));
  }
  if (option.type === "string" && option.isFilePath === true && typeof value === "string") {
    return getRelativePathFromFile(configFilePath, getNormalizedAbsolutePath(value, comparePathsOptions.currentDirectory), comparePathsOptions);
  }
  if (option.type instanceof Map) {
    return enumNameForValue(option, value) ?? value;
  }
  return value;
}

function getBooleanValue(value: unknown): boolean | undefined {
  if (value === Tristate.True) return true;
  if (value === Tristate.False) return false;
  if (typeof value === "boolean") return value;
  return undefined;
}

function enumNameForValue(option: CommandLineOption, value: unknown): string | undefined {
  if (!(option.type instanceof Map)) return undefined;
  for (const [name, enumValue] of option.type.entries()) {
    if (enumValue === value) return name;
  }
  if (option.name === "lib" && typeof value === "string") {
    for (const [libName, fileName] of libMap.entries()) {
      if (fileName === value) return libName;
    }
  }
  return undefined;
}

export function catalogEntryForOptionName(name: string): OptionCatalogEntry | undefined {
  return catalogMap.get(name.toLowerCase());
}
