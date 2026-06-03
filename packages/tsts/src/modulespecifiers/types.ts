/**
 * Module-specifier generation type surface.
 *
 * Port of TS-Go `internal/modulespecifiers/types.go`. Generates the
 * specifier strings used in `import` statements when emitting TypeScript
 * → JavaScript (e.g. when transformers rewrite imports, or when
 * auto-imports surface in the language service).
 *
 * Many host-interface methods reference subsystems that TSTS will grow
 * (`tsoptions`, `module`, `symlinks`, `packagejson` cache). Until those
 * land, the host shape is the contract; concrete implementations come
 * incrementally.
 */

import type { Node, StringLiteralLike, Symbol as AstSymbol } from "../ast/index.js";
// Forward-declared modules these types refer to. Until each module's
// internal API is finalized, the imports here point to placeholder
// shapes that mirror the TS-Go surface.

/** A file ready for specifier generation — minimal AST surface. */
export interface SourceFileForSpecifierGeneration {
  path(): string;
  fileName(): string;
  imports(): readonly StringLiteralLike[];
  isJS(): boolean;
}

/** Subset of the checker needed for specifier generation. */
export interface CheckerShape {
  getSymbolAtLocation(node: Node): AstSymbol | undefined;
  getAliasedSymbol(symbol: AstSymbol): AstSymbol | undefined;
}

/**
 * Categorical outcome of specifier generation. Mirrors TS-Go
 * `ResultKind` enum.
 */
export type ResultKind = 0 | 1 | 2 | 3 | 4 | 5;
export const ResultKind: {
  readonly None: ResultKind;
  readonly NodeModules: ResultKind;
  readonly Paths: ResultKind;
  readonly Redirect: ResultKind;
  readonly Relative: ResultKind;
  readonly Ambient: ResultKind;
} = {
  None: 0 as ResultKind,
  NodeModules: 1 as ResultKind,
  Paths: 2 as ResultKind,
  Redirect: 3 as ResultKind,
  Relative: 4 as ResultKind,
  Ambient: 5 as ResultKind,
};

/** A candidate file path during specifier generation. */
export interface ModulePath {
  readonly fileName: string;
  readonly isInNodeModules: boolean;
  readonly isRedirect: boolean;
}

/**
 * Host capabilities the specifier generator needs. Forward-declared
 * placeholder types reference subsystems TSTS will grow.
 */
export interface ModuleSpecifierGenerationHost {
  // Symlink resolution cache. TSTS forward-declares this as an opaque
  // handle until the `symlinks.KnownSymlinks` port lands.
  getSymlinkCache(): unknown;

  commonSourceDirectory(): string;
  getGlobalTypingsCacheLocation(): string;
  useCaseSensitiveFileNames(): boolean;
  getCurrentDirectory(): string;

  getProjectReferenceFromSource(path: string): unknown;
  getRedirectTargets(path: string): readonly string[];
  getSourceOfProjectReferenceIfOutputIncluded(file: unknown): string;

  fileExists(path: string): boolean;

  getNearestAncestorDirectoryWithPackageJson(dirname: string): string;
  getPackageJsonInfo(pkgJsonPath: string): unknown;
  getDefaultResolutionModeForFile(file: unknown): ResolutionMode;
  getResolvedModuleFromModuleSpecifier(file: unknown, moduleSpecifier: StringLiteralLike): unknown;
  getModeForUsageLocation(file: unknown, moduleSpecifier: StringLiteralLike): ResolutionMode;
}

/**
 * Resolution mode for a file/import. Forward-declared since the
 * `core.ResolutionMode` port hasn't landed in TSTS yet. Matches TS-Go's
 * 0=undefined/1=CommonJS/2=ESM convention.
 */
export type ResolutionMode = 0 | 1 | 2;
export const ResolutionMode: {
  readonly None: ResolutionMode;
  readonly CommonJS: ResolutionMode;
  readonly ESM: ResolutionMode;
} = {
  None: 0 as ResolutionMode,
  CommonJS: 1 as ResolutionMode,
  ESM: 2 as ResolutionMode,
};

/**
 * String-literal preference unions match TS-Go's typed string constants.
 */
export type ImportModuleSpecifierPreference =
  | ""
  | "shortest"
  | "project-relative"
  | "relative"
  | "non-relative";

export const ImportModuleSpecifierPreference: {
  readonly None: ImportModuleSpecifierPreference;
  readonly Shortest: ImportModuleSpecifierPreference;
  readonly ProjectRelative: ImportModuleSpecifierPreference;
  readonly Relative: ImportModuleSpecifierPreference;
  readonly NonRelative: ImportModuleSpecifierPreference;
} = {
  None: "" as ImportModuleSpecifierPreference,
  Shortest: "shortest" as ImportModuleSpecifierPreference,
  ProjectRelative: "project-relative" as ImportModuleSpecifierPreference,
  Relative: "relative" as ImportModuleSpecifierPreference,
  NonRelative: "non-relative" as ImportModuleSpecifierPreference,
};

export type ImportModuleSpecifierEndingPreference =
  | ""
  | "auto"
  | "minimal"
  | "index"
  | "js";

export const ImportModuleSpecifierEndingPreference: {
  readonly None: ImportModuleSpecifierEndingPreference;
  readonly Auto: ImportModuleSpecifierEndingPreference;
  readonly Minimal: ImportModuleSpecifierEndingPreference;
  readonly Index: ImportModuleSpecifierEndingPreference;
  readonly Js: ImportModuleSpecifierEndingPreference;
} = {
  None: "" as ImportModuleSpecifierEndingPreference,
  Auto: "auto" as ImportModuleSpecifierEndingPreference,
  Minimal: "minimal" as ImportModuleSpecifierEndingPreference,
  Index: "index" as ImportModuleSpecifierEndingPreference,
  Js: "js" as ImportModuleSpecifierEndingPreference,
};

export interface UserPreferences {
  readonly importModuleSpecifierPreference: ImportModuleSpecifierPreference;
  readonly importModuleSpecifierEnding: ImportModuleSpecifierEndingPreference;
  readonly autoImportSpecifierExcludeRegexes: readonly string[];
}

export interface ModuleSpecifierOptions {
  readonly overrideImportMode: ResolutionMode;
}

/**
 * Internal preference resolved from user preferences + project config.
 *
 * Mirrors TS-Go `RelativePreferenceKind` iota constants. The Go member
 * names drop the trailing `Kind`, so they are exported here verbatim
 * (`RelativePreferenceRelative` etc.) and the namespaced accessor object
 * references them.
 */
export type RelativePreferenceKind = 0 | 1 | 2 | 3;
export const RelativePreferenceRelative = 0 as RelativePreferenceKind;
export const RelativePreferenceNonRelative = 1 as RelativePreferenceKind;
export const RelativePreferenceShortest = 2 as RelativePreferenceKind;
export const RelativePreferenceExternalNonRelative = 3 as RelativePreferenceKind;
export const RelativePreferenceKind: {
  readonly Relative: RelativePreferenceKind;
  readonly NonRelative: RelativePreferenceKind;
  readonly Shortest: RelativePreferenceKind;
  readonly ExternalNonRelative: RelativePreferenceKind;
} = {
  Relative: RelativePreferenceRelative,
  NonRelative: RelativePreferenceNonRelative,
  Shortest: RelativePreferenceShortest,
  ExternalNonRelative: RelativePreferenceExternalNonRelative,
};

/** Ending shape applied to the generated specifier. */
export type ModuleSpecifierEnding = 0 | 1 | 2 | 3;
export const ModuleSpecifierEnding: {
  readonly Minimal: ModuleSpecifierEnding;
  readonly Index: ModuleSpecifierEnding;
  readonly JsExtension: ModuleSpecifierEnding;
  readonly TsExtension: ModuleSpecifierEnding;
} = {
  Minimal: 0 as ModuleSpecifierEnding,
  Index: 1 as ModuleSpecifierEnding,
  JsExtension: 2 as ModuleSpecifierEnding,
  TsExtension: 3 as ModuleSpecifierEnding,
};

/** Matching mode used by paths/baseUrl resolution. */
export type MatchingMode = 0 | 1 | 2;
export const MatchingMode: {
  readonly Exact: MatchingMode;
  readonly Directory: MatchingMode;
  readonly Pattern: MatchingMode;
} = {
  Exact: 0 as MatchingMode,
  Directory: 1 as MatchingMode,
  Pattern: 2 as MatchingMode,
};
