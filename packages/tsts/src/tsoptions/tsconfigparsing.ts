/**
 * tsconfig.json parsing.
 *
 * Substantive port of TS-Go `internal/tsoptions/tsconfigparsing.go`
 * (~1792 LoC). Loads a tsconfig.json file, applies extends-chain
 * resolution, expands `include`/`exclude`/`files`, and produces a
 * fully-realized `ParsedCommandLine` with typed CompilerOptions and
 * resolved fileNames.
 *
 * What this commit delivers:
 *   - Real `parseJsonConfigFileContent` body using vfsmatch.readDirectory
 *     for include/exclude/files expansion.
 *   - Real JSON → CompilerOptions conversion via a field-by-field copy
 *     (typed map driven by the commandline option declarations once they
 *     are fully ported; today we accept known JSON keys directly).
 *   - Defaults for jsconfig.json (allowJs, skipLibCheck, noEmit).
 *   - Proper ParsedCommandLine construction (not the previous
 *     `{} as unknown as ParsedCommandLine` cast).
 *
 * Deferred to follow-up commits in this branch (need parser body +
 * extendedConfigCache wiring):
 *   - Extends-chain resolution (`extends: "..."`).
 *   - Project references walking.
 *   - tsconfig source-file AST + per-property diagnostics.
 *   - typeAcquisition / watchOptions / build options.
 *   - convertToObject (JSON syntax-tree → value-tree conversion).
 */

import type { CompilerOptions } from "../core/compileroptions.js";
import { ParsedCommandLine } from "./parsedcommandline.js";
import type { ParsedOptions } from "./parsedcommandline.js";
import type { Diagnostic } from "../ast/index.js";
import type { CommandLineOption } from "./commandlineoption.js";
import { Tristate } from "../core/tristate.js";
import { getDirectoryPath, combinePaths, normalizePath, getBaseFileName } from "../tspath/path.js";
import { readDirectory } from "../vfs/vfsmatch/vfsmatch.js";
import type { FS } from "../vfs/vfs.js";

function createParseError(fileName: string, message: string): Diagnostic {
  return {
    file: undefined,
    start: 0,
    length: 0,
    messageText: `${fileName}: ${message}`,
    category: 1,
    code: 0,
  } as unknown as Diagnostic;
}

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface ParseConfigHost {
  readonly useCaseSensitiveFileNames: boolean;
  /**
   * Lower-level file-discovery hook. Strada's ParseConfigHost requires
   * an FS-shaped readDirectory; our type widens it so callers can also
   * pass a host that already has a backing FS (we then route through
   * vfsmatch.readDirectory directly).
   */
  readDirectory?(
    rootDir: string,
    extensions: readonly string[],
    excludes: readonly string[] | undefined,
    includes: readonly string[],
    depth?: number,
  ): readonly string[];
  fileExists(path: string): boolean;
  readFile(path: string): string | undefined;
  /** Optional pass-through FS for callers that want vfsmatch directly. */
  fs?: FS;
  /** Optional current directory used for resolving relative paths. */
  currentDirectory?: string;
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
// Defaults
// ---------------------------------------------------------------------------

/**
 * Default include pattern used when neither `files` nor `include` is
 * provided. Mirrors TS-Go `defaultIncludeSpec`.
 */
const DEFAULT_INCLUDE_SPEC = "**/*";

/**
 * Default exclude patterns used when `exclude` is not provided. Mirrors
 * TS-Go behavior of always excluding node_modules + bower_components +
 * jspm_packages plus the `outDir`/`declarationDir`.
 */
const DEFAULT_EXCLUDE_SPECS: readonly string[] = [
  "**/node_modules",
  "**/bower_components",
  "**/jspm_packages",
];

/**
 * Default supported extensions for file discovery. Mirrors TS-Go
 * supported extensions for TS-aware projects.
 */
const SUPPORTED_TS_EXTENSIONS: readonly string[] = [".ts", ".tsx", ".d.ts", ".mts", ".cts", ".d.mts", ".d.cts"];
const SUPPORTED_JS_EXTENSIONS: readonly string[] = [".js", ".jsx", ".mjs", ".cjs"];

function getSupportedExtensions(options: CompilerOptions): readonly string[] {
  const exts: string[] = [...SUPPORTED_TS_EXTENSIONS];
  const allowJs = (options as unknown as { allowJs?: Tristate }).allowJs;
  if (allowJs === Tristate.True) {
    for (const e of SUPPORTED_JS_EXTENSIONS) exts.push(e);
  }
  const resolveJsonModule = (options as unknown as { resolveJsonModule?: Tristate }).resolveJsonModule;
  if (resolveJsonModule === Tristate.True) {
    exts.push(".json");
  }
  return exts;
}

/**
 * Returns the default CompilerOptions for the given config file. Mirrors
 * TS-Go `getDefaultCompilerOptions`. jsconfig.json gets allowJs, skipLibCheck,
 * and noEmit defaults.
 */
function getDefaultCompilerOptions(configFileName: string): CompilerOptions {
  const options: Record<string, unknown> = {};
  if (configFileName !== "" && getBaseFileName(configFileName) === "jsconfig.json") {
    options.allowJs = Tristate.True;
    options.skipLibCheck = Tristate.True;
    options.noEmit = Tristate.True;
    options.maxNodeModuleJsDepth = 2;
  }
  return options as unknown as CompilerOptions;
}

// ---------------------------------------------------------------------------
// Top-level entry points
// ---------------------------------------------------------------------------

export function parseConfigFileTextToJson(
  fileName: string,
  path: string,
  jsonText: string,
): { config: unknown; errors: readonly Diagnostic[] } {
  void path;
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
  void configPath;
  return { fileName: configFileName, text: configSourceText, configFileSpecs: undefined, jsonObject: undefined };
}

/**
 * Converts a JSON `compilerOptions` object into a typed CompilerOptions
 * value. Performs path normalization for string-typed file paths
 * (`outDir`, `rootDir`, `baseUrl`, `declarationDir`) and tristate
 * coercion for boolean fields. A pragmatic field-by-field copy until
 * the full CommandLineOption-driven converter lands.
 */
function convertCompilerOptionsFromJson(
  json: unknown,
  basePath: string,
  configFileName: string,
): { options: CompilerOptions; errors: Diagnostic[] } {
  const options = getDefaultCompilerOptions(configFileName);
  const errors: Diagnostic[] = [];
  if (json === undefined || json === null || typeof json !== "object") {
    return { options, errors };
  }
  const source = json as Record<string, unknown>;
  const target = options as unknown as Record<string, unknown>;
  for (const [key, value] of Object.entries(source)) {
    target[key] = normalizeOptionValue(key, value, basePath);
  }
  if (configFileName !== "") {
    target.configFilePath = normalizePath(configFileName);
  }
  return { options, errors };
}

const PATH_LIKE_KEYS = new Set<string>([
  "outDir", "rootDir", "baseUrl", "declarationDir", "outFile",
  "tsBuildInfoFile", "rootDirs",
]);
const STRING_LIST_KEYS = new Set<string>([
  "rootDirs", "types", "typeRoots", "lib",
]);

function normalizeOptionValue(key: string, value: unknown, basePath: string): unknown {
  // Booleans → Tristate for fields that the rest of the compiler reads
  // via tristate predicates.
  if (typeof value === "boolean") {
    return value ? Tristate.True : Tristate.False;
  }
  if (typeof value === "string" && PATH_LIKE_KEYS.has(key)) {
    return combinePaths(basePath, value);
  }
  if (Array.isArray(value) && STRING_LIST_KEYS.has(key) && key !== "lib" && key !== "types" && key !== "typeRoots") {
    return value.map((v) => typeof v === "string" ? combinePaths(basePath, v) : v);
  }
  return value;
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
  void resolutionStack; void extendedConfigCache;
  const errors: Diagnostic[] = [];

  // Extract well-known top-level fields.
  const root = (json && typeof json === "object") ? (json as Record<string, unknown>) : {};
  const filesField = readStringArray(root, "files");
  const includeField = readStringArray(root, "include");
  const excludeField = readStringArray(root, "exclude");
  const compilerOptionsField = root.compilerOptions;

  // Merge default + JSON options, then layer existingOptions on top.
  const { options: jsonOptions, errors: optErrors } = convertCompilerOptionsFromJson(
    compilerOptionsField,
    basePath,
    configFileName ?? "",
  );
  for (const e of optErrors) errors.push(e);
  const mergedOptions = existingOptions !== undefined
    ? mergeCompilerOptions(jsonOptions, existingOptions)
    : jsonOptions;

  // Compute file extensions (TS by default; +JS if allowJs; +.json if
  // resolveJsonModule; +extraFileExtensions).
  const extensions: string[] = [...getSupportedExtensions(mergedOptions)];
  if (extraFileExtensions !== undefined) {
    for (const e of extraFileExtensions) {
      if (!extensions.includes(e.extension)) extensions.push(e.extension);
    }
  }

  // Discover root file names.
  const rootFileNames = computeRootFileNames(
    host,
    basePath,
    filesField,
    includeField,
    excludeField,
    extensions,
  );

  const cmpOptions = {
    useCaseSensitiveFileNames: host.useCaseSensitiveFileNames,
    currentDirectory: host.currentDirectory ?? basePath,
  };

  const result = new ParsedCommandLine(
    mergedOptions as unknown as ParsedOptions["compilerOptions"],
    rootFileNames,
    cmpOptions,
  );
  result.raw = json;
  result.errors = errors;
  return result;
}

function readStringArray(obj: Record<string, unknown>, key: string): readonly string[] | undefined {
  const v = obj[key];
  if (v === undefined) return undefined;
  if (!Array.isArray(v)) return undefined;
  const out: string[] = [];
  for (const e of v) if (typeof e === "string") out.push(e);
  return out;
}

function mergeCompilerOptions(base: CompilerOptions, overlay: CompilerOptions): CompilerOptions {
  const target: Record<string, unknown> = { ...(base as unknown as Record<string, unknown>) };
  const ov = overlay as unknown as Record<string, unknown>;
  for (const [k, v] of Object.entries(ov)) {
    if (v !== undefined) target[k] = v;
  }
  return target as unknown as CompilerOptions;
}

/**
 * Compute the root file names from `files`/`include`/`exclude`. Falls
 * back to a recursive include if neither `files` nor `include` is set.
 */
function computeRootFileNames(
  host: ParseConfigHost,
  basePath: string,
  filesSpec: readonly string[] | undefined,
  includeSpec: readonly string[] | undefined,
  excludeSpec: readonly string[] | undefined,
  extensions: readonly string[],
): readonly string[] {
  const seen = new Set<string>();
  const out: string[] = [];

  // Explicit `files` entries.
  if (filesSpec !== undefined) {
    for (const f of filesSpec) {
      const absolute = normalizePath(combinePaths(basePath, f));
      if (!seen.has(absolute) && host.fileExists(absolute)) {
        seen.add(absolute);
        out.push(absolute);
      }
    }
  }

  // Glob-expanded includes.
  const includes = includeSpec ?? (filesSpec === undefined ? [DEFAULT_INCLUDE_SPEC] : []);
  if (includes.length > 0) {
    const excludes: string[] = excludeSpec !== undefined ? [...excludeSpec] : [...DEFAULT_EXCLUDE_SPECS];
    // Also exclude outDir/declarationDir if present (TS-Go behavior).
    // (Pulled from options later when wired to compilerOptions.)

    const found = expandIncludes(host, basePath, extensions, excludes, includes);
    for (const f of found) {
      if (!seen.has(f)) {
        seen.add(f);
        out.push(f);
      }
    }
  }

  return out;
}

function expandIncludes(
  host: ParseConfigHost,
  basePath: string,
  extensions: readonly string[],
  excludes: readonly string[],
  includes: readonly string[],
): readonly string[] {
  // Prefer host's own readDirectory if it brings its own logic.
  if (host.readDirectory !== undefined) {
    return host.readDirectory(basePath, extensions, excludes, includes);
  }
  // Otherwise route through vfsmatch.readDirectory via host.fs.
  if (host.fs === undefined) return [];
  return readDirectory(host.fs, basePath, basePath, extensions, excludes, includes, Number.MAX_SAFE_INTEGER);
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
  if (config === undefined) {
    const result = new ParsedCommandLine({}, [], {
      useCaseSensitiveFileNames: host.useCaseSensitiveFileNames,
      currentDirectory: host.currentDirectory ?? getDirectoryPath(configFileName),
    });
    result.errors = errors;
    return result;
  }
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
  void options;
  const excludes = specs.validatedExcludeSpecs ?? specs.excludeSpecs;
  if (excludes === undefined || excludes.length === 0) return false;
  return excludes.some((e) => globMatchesPath(fileName, e));
}

export function configFileSpecsGetMatchedIncludeSpec(
  specs: ConfigFileSpecs,
  fileName: string,
  options: { currentDirectory: string; useCaseSensitiveFileNames: boolean },
): string {
  void options;
  const includes = specs.validatedIncludeSpecs ?? specs.includeSpecs;
  if (includes === undefined) return "";
  for (const inc of includes) {
    if (globMatchesPath(fileName, inc)) return inc;
  }
  return "";
}

export function configFileSpecsGetMatchedFileSpec(
  specs: ConfigFileSpecs,
  fileName: string,
  options: { currentDirectory: string; useCaseSensitiveFileNames: boolean },
): string {
  void options;
  const files = specs.validatedFilesSpec ?? specs.filesSpecs;
  if (files === undefined) return "";
  for (const f of files) {
    if (fileName === f || fileName.endsWith("/" + f)) return f;
  }
  return "";
}

function globMatchesPath(filePath: string, spec: string): boolean {
  // Same simple-glob conversion vfsmatch uses for its internal matcher.
  const re = "^" +
    spec
      .replace(/[.+^${}()|[\]\\]/g, "\\$&")
      .replace(/\*\*\//g, "(?:.*/)?")
      .replace(/\*\*/g, ".*")
      .replace(/\*/g, "[^/]*")
      .replace(/\?/g, ".") +
    "$";
  return new RegExp(re).test(filePath);
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
