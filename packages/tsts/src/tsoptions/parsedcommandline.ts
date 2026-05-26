/**
 * Parsed compiler command line / tsconfig result.
 *
 * Port of TS-Go `internal/tsoptions/parsedcommandline.go`. Captures
 * the surface used by Program, the CLI, and the language service.
 * Full method bodies (input/output name parsing, source/output
 * mappings, common source directory resolution) land in follow-up
 * commits as the dependencies (vfsmatch, module, outputpaths) mature.
 */

import type { Diagnostic } from "../diagnostics/types.js";
import type { ComparePathsOptions } from "../tspath/index.js";

/**
 * The literal glob patterns the parser uses to expand `include` /
 * directory references when no explicit `files` list is present.
 * Mirrors TS-Go constants.
 */
export const FILE_GLOB_PATTERN = "*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}";
export const RECURSIVE_FILE_GLOB_PATTERN = "**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}";

/**
 * Forward-declared `core.CompilerOptions` / `core.ParsedOptions`.
 */
export interface CompilerOptionsHandle {
  // Many fields; consumers reference them directly. Full shape lands
  // with the core port.
}

export interface ParsedOptions {
  readonly compilerOptions: CompilerOptionsHandle;
  readonly fileNames: readonly string[];
}

/**
 * Forward-declared `TsConfigSourceFile`. Returned by tsconfig.json
 * parsing; carries the source-file AST plus the raw JSON shape.
 */
export interface TsConfigSourceFile {
  readonly fileName: string;
}

/**
 * Extra file extension info passed alongside the parsed command line
 * for non-default extensions (e.g. `.vue`). Mirrors TS-Go
 * `FileExtensionInfo`.
 */
export interface FileExtensionInfo {
  readonly extension: string;
  readonly isMixedContent: boolean;
  readonly scriptKind?: "ts" | "tsx" | "js" | "jsx" | "json" | "external" | "deferred";
}

/**
 * Reference from a source file to the project reference that produces
 * it (or to its declaration-only output). Mirrors TS-Go
 * `SourceOutputAndProjectReference`.
 */
export interface SourceOutputAndProjectReference {
  readonly source: string;
  readonly outputDts: string;
  readonly resolved?: ParsedCommandLine;
}

/**
 * Result of parsing a compiler command line / tsconfig.json. Mirrors
 * TS-Go `ParsedCommandLine`.
 */
export class ParsedCommandLine {
  public parsedConfig: ParsedOptions;
  public configFile?: TsConfigSourceFile;
  public errors: readonly Diagnostic[] = [];
  public raw?: unknown;
  public compileOnSave?: boolean;

  private readonly comparePathsOptions: ComparePathsOptions;

  private wildcardDirectoriesCache?: Map<string, boolean>;
  private commonSourceDirectoryCache?: string;
  private resolvedProjectReferencePathsCache?: readonly string[];

  private sourceToProjectReferenceMap?: Map<string, SourceOutputAndProjectReference>;
  private outputDtsToProjectReferenceMap?: Map<string, SourceOutputAndProjectReference>;
  private fileNamesByPathMap?: Map<string, string>;

  constructor(
    compilerOptions: CompilerOptionsHandle,
    rootFileNames: readonly string[],
    comparePathsOptions: ComparePathsOptions,
  ) {
    this.parsedConfig = { compilerOptions, fileNames: rootFileNames };
    this.comparePathsOptions = comparePathsOptions;
  }

  configName(): string {
    return this.configFile?.fileName ?? "";
  }

  sourceToProjectReference(): Map<string, SourceOutputAndProjectReference> | undefined {
    return this.sourceToProjectReferenceMap;
  }

  outputDtsToProjectReference(): Map<string, SourceOutputAndProjectReference> | undefined {
    return this.outputDtsToProjectReferenceMap;
  }

  /**
   * Returns `true` if cached wildcard directories have been computed.
   * The actual computation is forthcoming (depends on the vfsmatch
   * full matcher).
   */
  hasWildcardDirectoryCache(): boolean {
    return this.wildcardDirectoriesCache !== undefined;
  }

  /**
   * Cached common source directory. Computed lazily on first access
   * once the underlying `outputpaths.GetCommonSourceDirectory` lands.
   */
  commonSourceDirectory(): string | undefined {
    return this.commonSourceDirectoryCache;
  }

  /** Cached file names → path map for quick lookups. */
  fileNamesByPath(): Map<string, string> | undefined {
    return this.fileNamesByPathMap;
  }

  resolvedProjectReferencePaths(): readonly string[] | undefined {
    return this.resolvedProjectReferencePathsCache;
  }

  /** Expose `comparePathsOptions` for downstream consumers. */
  getComparePathsOptions(): ComparePathsOptions {
    return this.comparePathsOptions;
  }
}

/**
 * Convenience constructor. Mirrors TS-Go `NewParsedCommandLine`.
 */
export function newParsedCommandLine(
  compilerOptions: CompilerOptionsHandle,
  rootFileNames: readonly string[],
  comparePathsOptions: ComparePathsOptions,
): ParsedCommandLine {
  return new ParsedCommandLine(compilerOptions, rootFileNames, comparePathsOptions);
}
