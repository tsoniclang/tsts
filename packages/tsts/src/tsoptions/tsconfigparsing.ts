/**
 * tsconfig.json parsing.
 *
 * Port skeleton of TS-Go `internal/tsoptions/tsconfigparsing.go`
 * (~1792 LoC). The Strada file is the production tsconfig.json
 * loader — resolves `extends` chains, normalizes file globs, applies
 * project references, validates compilerOptions schema, and produces
 * a fully-realized `ParsedCommandLine`.
 *
 * Skeleton scope:
 * - Public API: parseConfigFileTextToJson, parseJsonConfigFileContent,
 *   parseJsonSourceFileConfigFileContent, ParseConfigHost,
 *   ExtendedConfigCacheEntry, NewTsconfigSourceFileFromFilePath,
 *   getParsedCommandLineOfConfigFile
 * - Internal: convertConfigFileToObject, convertToJson,
 *   convertJsonOption, normalizeNonListOptionValue,
 *   validateJsonOptionValue, convertJsonOptionOfListType,
 *   getExtendsConfigPath(OrArray), directoryOfCombinedPath,
 *   isCompilerOptionsValue, startsWithConfigDirTemplate
 * - configFileSpecs class with matchesExclude /
 *   getMatchedIncludeSpec / getMatchedFileSpec
 *
 * Deep parser internals (recursive object/array literal conversion,
 * extends chain resolution, project reference walking) stubbed —
 * tests will surface gaps as the integration matures.
 */

import type { CompilerOptions } from "../core/compileroptions.js";
import type { ParsedCommandLine } from "./parsedcommandline.js";
import type { Diagnostic } from "../ast/index.js";
import type { CommandLineOption } from "./commandlineoption.js";
import type { Tristate } from "../core/tristate.js";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface ParseConfigHost {
  readonly useCaseSensitiveFileNames: boolean;
  readDirectory(
    rootDir: string,
    extensions: readonly string[],
    excludes: readonly string[] | undefined,
    includes: readonly string[],
    depth?: number,
  ): readonly string[];
  fileExists(path: string): boolean;
  readFile(path: string): string | undefined;
  trace?(msg: string): void;
}

export interface ExtendedConfigCacheEntry {
  extendedResult: TsConfigSourceFile;
  extendedConfig: ParsedTsconfig | undefined;
}

export type ExtendedConfigCache = Map<string, ExtendedConfigCacheEntry>;

export interface ParsedTsconfig {
  raw: unknown;
  options?: CompilerOptions;
  watchOptions?: Record<string, unknown>;
  typeAcquisition?: Record<string, unknown>;
  errors: Diagnostic[];
}

export interface FileExtensionInfo {
  extension: string;
  isMixedContent: boolean;
  scriptKind?: number;
}

export interface TsConfigSourceFile {
  fileName: string;
  text: string;
  configFileSpecs: ConfigFileSpecs | undefined;
  // The parsed AST root, or undefined if the file failed to parse.
  jsonObject: unknown;
}

export interface ConfigFileSpecs {
  filesSpecs?: readonly string[];
  includeSpecs?: readonly string[];
  excludeSpecs?: readonly string[];
  validatedFilesSpec?: readonly string[];
  validatedIncludeSpecs?: readonly string[];
  validatedExcludeSpecs?: readonly string[];
}

export interface ResolutionStackEntry {
  path: string;
}

// ---------------------------------------------------------------------------
// Top-level entry points
// ---------------------------------------------------------------------------

export function parseConfigFileTextToJson(
  fileName: string,
  path: string,
  jsonText: string,
): { config: unknown; errors: readonly Diagnostic[] } {
  try {
    const config = JSON.parse(jsonText) as unknown;
    return { config, errors: [] };
  } catch (e) {
    return { config: undefined, errors: [createParseError(fileName, (e as Error).message)] };
  }
}

export function newTsconfigSourceFileFromFilePath(
  configFileName: string,
  configPath: string,
  configSourceText: string,
): TsConfigSourceFile {
  return { fileName: configFileName, text: configSourceText, configFileSpecs: undefined, jsonObject: undefined };
}

export function parseJsonConfigFileContent(
  json: unknown,
  host: ParseConfigHost,
  basePath: string,
  existingOptions: CompilerOptions | undefined,
  configFileName: string | undefined,
  resolutionStack: readonly ResolutionStackEntry[] | undefined,
  extraFileExtensions: readonly FileExtensionInfo[] | undefined,
  extendedConfigCache: ExtendedConfigCache | undefined,
): ParsedCommandLine {
  void json; void host; void basePath; void configFileName;
  void resolutionStack; void extraFileExtensions; void extendedConfigCache;
  return {
    options: existingOptions ?? {},
    fileNames: [],
    errors: [],
    raw: json,
    projectReferences: undefined,
    typeAcquisition: undefined,
    watchOptions: undefined,
  } as unknown as ParsedCommandLine;
}

export function parseJsonSourceFileConfigFileContent(
  sourceFile: TsConfigSourceFile,
  host: ParseConfigHost,
  basePath: string,
  existingOptions: CompilerOptions | undefined,
  configFileName: string | undefined,
  resolutionStack: readonly ResolutionStackEntry[] | undefined,
  extraFileExtensions: readonly FileExtensionInfo[] | undefined,
  extendedConfigCache: ExtendedConfigCache | undefined,
): ParsedCommandLine {
  return parseJsonConfigFileContent(
    sourceFile.jsonObject,
    host,
    basePath,
    existingOptions,
    configFileName,
    resolutionStack,
    extraFileExtensions,
    extendedConfigCache,
  );
}

export function getParsedCommandLineOfConfigFile(
  configFileName: string,
  optionsToExtend: CompilerOptions | undefined,
  host: ParseConfigHost,
  extendedConfigCache: ExtendedConfigCache | undefined,
): ParsedCommandLine | undefined {
  const text = host.readFile(configFileName);
  if (text === undefined) return undefined;
  const { config, errors } = parseConfigFileTextToJson(configFileName, configFileName, text);
  if (config === undefined) return { options: {}, fileNames: [], errors, raw: undefined } as unknown as ParsedCommandLine;
  return parseJsonConfigFileContent(
    config,
    host,
    getDirectoryPath(configFileName),
    optionsToExtend,
    configFileName,
    undefined,
    undefined,
    extendedConfigCache,
  );
}

// ---------------------------------------------------------------------------
// configFileSpecs methods
// ---------------------------------------------------------------------------

export function configFileSpecsMatchesExclude(
  specs: ConfigFileSpecs,
  fileName: string,
  options: { currentDirectory: string; useCaseSensitiveFileNames: boolean },
): boolean {
  void specs; void fileName; void options;
  return false;
}

export function configFileSpecsGetMatchedIncludeSpec(
  specs: ConfigFileSpecs,
  fileName: string,
  options: { currentDirectory: string; useCaseSensitiveFileNames: boolean },
): string {
  void specs; void fileName; void options;
  return "";
}

export function configFileSpecsGetMatchedFileSpec(
  specs: ConfigFileSpecs,
  fileName: string,
  options: { currentDirectory: string; useCaseSensitiveFileNames: boolean },
): string {
  void specs; void fileName; void options;
  return "";
}

// ---------------------------------------------------------------------------
// Option value conversion + validation
// ---------------------------------------------------------------------------

export function isCompilerOptionsValue(option: CommandLineOption | undefined, value: unknown): boolean {
  if (option === undefined) return false;
  if (value === null) return option.type !== "boolean" && option.type !== "number" && option.type !== "string";
  switch (option.type) {
    case "boolean": return typeof value === "boolean";
    case "number": return typeof value === "number";
    case "string": return typeof value === "string";
    case "list": case "listOrElement": return Array.isArray(value);
    case "object": return typeof value === "object";
  }
  return true;
}

export function startsWithConfigDirTemplate(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return value.startsWith("${configDir}");
}

export function convertJsonOption(
  option: CommandLineOption | undefined,
  value: unknown,
  basePath: string,
  errors: Diagnostic[],
): unknown {
  if (option === undefined) return value;
  if (!isCompilerOptionsValue(option, value)) return undefined;
  if (option.type === "list" || option.type === "listOrElement") {
    return convertJsonOptionOfListType(option, value, basePath, errors);
  }
  return normalizeNonListOptionValue(option, basePath, value);
}

export function convertJsonOptionOfListType(
  option: CommandLineOption,
  values: unknown,
  basePath: string,
  errors: Diagnostic[],
): unknown[] {
  if (!Array.isArray(values)) return [];
  if (option.element === undefined) return values as unknown[];
  return (values as unknown[]).map((v) => convertJsonOption(option.element, v, basePath, errors));
}

export function normalizeNonListOptionValue(
  option: CommandLineOption,
  basePath: string,
  value: unknown,
): unknown {
  if (value === null) return undefined;
  if (option.type === "string" && option.isFilePath === true && typeof value === "string") {
    return combinePaths(basePath, value);
  }
  return value;
}

export function validateJsonOptionValue(
  option: CommandLineOption,
  value: unknown,
  errors: Diagnostic[],
): unknown {
  void option; void errors;
  return value;
}

// ---------------------------------------------------------------------------
// Extends chain
// ---------------------------------------------------------------------------

export function getExtendsConfigPath(
  extendedConfig: string,
  host: ParseConfigHost,
  basePath: string,
  errors: Diagnostic[],
  createDiagnostic: (msg: string) => Diagnostic,
): string {
  void host; void basePath; void errors; void createDiagnostic;
  return extendedConfig;
}

export function getExtendsConfigPathOrArray(
  extendedConfig: unknown,
  host: ParseConfigHost,
  basePath: string,
  errors: Diagnostic[],
): readonly string[] {
  if (typeof extendedConfig === "string") {
    return [getExtendsConfigPath(extendedConfig, host, basePath, errors, () => ({} as Diagnostic))];
  }
  if (Array.isArray(extendedConfig)) {
    return (extendedConfig as unknown[]).filter((x): x is string => typeof x === "string");
  }
  return [];
}

export function directoryOfCombinedPath(fileName: string, basePath: string): string {
  return getDirectoryPath(combinePaths(basePath, fileName));
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

declare function createParseError(fileName: string, message: string): Diagnostic;
declare function getDirectoryPath(path: string): string;
declare function combinePaths(base: string, child: string): string;
