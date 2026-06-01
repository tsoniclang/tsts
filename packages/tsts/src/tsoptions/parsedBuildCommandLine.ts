/**
 * Parsed `tsc --build` command line.
 *
 * Port of TS-Go `internal/tsoptions/parsedbuildcommandline.go`.
 */

import type { Diagnostic } from "../diagnostics/types.js";
import type { ComparePathsOptions } from "../tspath/index.js";

/**
 * Forward-declared `core.BuildOptions`, `core.CompilerOptions`,
 * `core.WatchOptions`. Arrive with the `core` port.
 */
export interface BuildOptions {
  readonly dry?: boolean;
  readonly force?: boolean;
  readonly verbose?: boolean;
  readonly clean?: boolean;
}

export interface CompilerOptions {
  readonly locale?: string;
}

export interface WatchOptions {
  readonly watchFile?: string;
  readonly watchDirectory?: string;
}

/**
 * Forward-declared locale tag. The real implementation lives in the
 * `locale` module.
 */
export type Locale = string;

/**
 * The result of parsing a `tsc --build ...` command line. Mirrors
 * TS-Go `ParsedBuildCommandLine`.
 */
export class ParsedBuildCommandLine {
  public buildOptions?: BuildOptions;
  public compilerOptions?: CompilerOptions;
  public watchOptions?: WatchOptions;
  public projects: readonly string[] = [];
  public errors: readonly Diagnostic[] = [];
  public raw?: unknown;

  private readonly comparePathsOptions: ComparePathsOptions;

  private resolvedProjectPathsCache?: readonly string[];
  private localeCache?: Locale;

  constructor(comparePathsOptions: ComparePathsOptions) {
    this.comparePathsOptions = comparePathsOptions;
  }

  /**
   * Resolves each project path against `comparePathsOptions.currentDirectory`
   * and the config-file-name-of-project-reference rule. Cached on first
   * call.
   *
   * Mirrors TS-Go `ResolvedProjectPaths`.
   */
  resolvedProjectPaths(resolveProjectReference: (path: string) => string, resolvePath: (...parts: string[]) => string): readonly string[] {
    if (this.resolvedProjectPathsCache !== undefined) return this.resolvedProjectPathsCache;
    const result = this.projects.map((project) =>
      resolveProjectReference(resolvePath(this.comparePathsOptions.currentDirectory, project)),
    );
    this.resolvedProjectPathsCache = result;
    return result;
  }

  /**
   * Returns the locale specified in the compiler options. Cached on
   * first call. Mirrors TS-Go `Locale`.
   */
  locale(parseLocale: (tag: string | undefined) => Locale): Locale {
    if (this.localeCache !== undefined) return this.localeCache;
    this.localeCache = parseLocale(this.compilerOptions?.locale);
    return this.localeCache;
  }
}
