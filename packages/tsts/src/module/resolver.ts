/**
 * Module resolution algorithm.
 *
 * Substantive port of TS-Go `internal/module/resolver.go` (~2360 LoC).
 * Implements the full TypeScript module-resolution algorithm across the
 * classic / node10 / node16 / nodenext / bundler strategies.
 *
 * What this commit delivers (~700 LoC of careful port):
 *   - `Resolver` constructor + `ResolveModuleName` main entry that
 *     dispatches by `compilerOptions.moduleResolution`.
 *   - Relative-path resolution (`./`, `../`, `/`) with extension probing
 *     in TS/TSX/JSX/JS/JSON/.d.ts order respecting allowJs +
 *     resolveJsonModule.
 *   - Classic strategy (walks ancestor directories looking for a file).
 *   - Node-style relative + ancestor walk for non-relative names
 *     (probes node_modules folders up the directory chain). The basic
 *     case — `foo` → `node_modules/foo.{ts,d.ts,js}` or
 *     `node_modules/foo/index.{ts,d.ts,js}` — works.
 *   - `resolutionState` struct + tracer + `ResolvedModuleWithFailedLookupLocations`
 *     bookkeeping (failed-lookup tracking for cache invalidation).
 *
 * Deferred to follow-up commits on this branch (need packagejson port
 * + binder integration):
 *   - package.json `exports`/`imports` walking (Node16, NodeNext).
 *   - package.json `main`/`types`/`typings` field resolution.
 *   - Self-name reference resolution (`#identifier` imports).
 *   - Project-reference redirect handling.
 *   - Type-roots discovery for `///<reference types="..."/>`.
 *   - Path-mapping (`paths` option) full resolution.
 *   - Symlink realpath chasing.
 *   - Caching + the package-json info cache.
 *
 * Mirrors TS-Go semantics; comments cite the upstream function names
 * where they directly correspond.
 */

import type { CompilerOptions, ModuleResolutionKind } from "../core/compilerOptions.js";
import {
  ModuleResolutionKind as MRK,
  ModuleKind as MK,
  getEffectiveTypeRoots,
  getPathsBasePath,
  getModuleResolutionKind,
} from "../core/compilerOptions.js";
import { Tristate } from "../core/tristate.js";
import type { Diagnostic } from "../ast/index.js";
import {
  combinePaths, getDirectoryPath, normalizePath, isRootedDiskPath,
  hasTrailingDirectorySeparator, getBaseFileName, comparePaths,
  forEachAncestorDirectoryStoppingAtGlobalCache,
  type ComparePathsOptions,
} from "../tspath/path.js";
import {
  removeFileExtension, changeFullExtension,
  extensionIsOneOf, supportedTSExtensionsWithJsonFlat,
  extensionJs, extensionJsx, extensionMjs, extensionCjs,
  extensionTs, extensionTsx, extensionMts, extensionCts,
  extensionDts, extensionDmts, extensionDcts, extensionJson,
} from "../tspath/extension.js";
import { hasPrefixAndSuffixWithoutOverlap } from "../stringutil/compare.js";
import {
  parseNodeModuleFromPath, parsePackageName, mangleScopedPackageName,
  comparePatternKeys, isApplicableVersionedTypesKey, tryGetJSExtensionForFile,
} from "./util.js";
import {
  type Pattern,
  tryParsePattern,
  patternIsValid,
  patternMatchedText,
  findBestPatternMatch as coreFindBestPatternMatch,
} from "../core/pattern.js";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface ResolvedModule {
  readonly resolvedFileName: string;
  readonly extension: string;
  readonly packageId: PackageId | undefined;
  readonly originalPath: string | undefined;
  readonly resolvedUsingTsExtension: boolean;
}

export interface PackageId {
  readonly name: string;
  readonly subModuleName: string;
  readonly version: string;
  readonly peerDependencies: string;
}

export type ResolutionMode = number;

// Mirrors TS-Go `NodeResolutionFeatures` (an `int32` flag set defined via iota).
export type NodeResolutionFeatures = number;
export const NodeResolutionFeatures = {
  Imports: 1 << 0,
  SelfName: 1 << 1,
  Exports: 1 << 2,
  ExportsPatternTrailers: 1 << 3,
  // allowing `#/` root imports in package.json imports field
  // not supported until mass adoption - https://github.com/nodejs/node/pull/60864
  ImportsPatternRoot: 1 << 4,

  None: 0,
  All: (1 << 0) | (1 << 1) | (1 << 2) | (1 << 3) | (1 << 4),
  Node16Default: (1 << 0) | (1 << 1) | (1 << 2) | (1 << 3),
  NodeNextDefault: (1 << 0) | (1 << 1) | (1 << 2) | (1 << 3) | (1 << 4),
  BundlerDefault: (1 << 0) | (1 << 1) | (1 << 2) | (1 << 3) | (1 << 4),
} as const;

type Extensions = number;
const Extensions = {
  TypeScript: 1 << 0,
  JavaScript: 1 << 1,
  Json: 1 << 2,
  Declaration: 1 << 3,
} as const;

export interface ResolvedModuleWithFailedLookupLocations {
  resolvedModule: ResolvedModule | undefined;
  failedLookupLocations: readonly string[];
  affectingLocations: readonly string[];
  resolutionDiagnostics: readonly Diagnostic[];
  alternateResult: ResolvedModule | undefined;
}

export interface ResolvedTypeReferenceDirective {
  primary: boolean;
  resolvedFileName: string;
  packageId: PackageId | undefined;
  isExternalLibraryImport: boolean;
  originalPath: string | undefined;
  resolvedUsingTsExtension: boolean;
}

export interface ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
  resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective | undefined;
  failedLookupLocations: readonly string[];
  affectingLocations: readonly string[];
  resolutionDiagnostics: readonly Diagnostic[];
}

export interface ResolvedTripleslashReference {
  resolvedFileName: string | undefined;
  isExternalLibraryImport: boolean;
}

export interface ResolvedProjectReference {
  configFileName: string;
  resolvedFileName: string;
  compilerOptions?: CompilerOptions;
}

export type EntrypointEnding = number;
export const EntrypointEnding = {
  Fixed: 0,
  ExtensionChangeable: 1,
  Changeable: 2,
} as const;

/**
 * Mirrors TS-Go `Ending`. Indicates whether the file name and extension
 * portion of a module specifier is fixed or can be changed.
 */
export type Ending = number;
export const Ending = {
  // EndingFixed indicates that the module specifier cannot be changed without changing its resolution.
  Fixed: 0,
  // EndingExtensionChangeable indicates that the module specifier's extension portion was inferred from
  // a file on disk, so an interchangeable one could be used instead (e.g. replacing .d.ts with .js).
  ExtensionChangeable: 1,
  // EndingChangeable indicates that the module specifier's file name and extension portion were inferred
  // from a file on disk without being matched as part of an 'exports' pattern, so can be changed
  // according to the importer's module resolution rules (e.g. an /index.d.ts may be dropped entirely in
  // CommonJS settings).
  Changeable: 2,
} as const;

export interface ResolvedEntrypoint {
  readonly originalFileName: string | undefined;
  readonly resolvedFileName: string;
  readonly moduleSpecifier: string;
  readonly ending: EntrypointEnding;
  readonly includeConditions: ReadonlySet<string> | undefined;
  readonly excludeConditions: ReadonlySet<string> | undefined;
}

/** Mirrors TS-Go `(*ResolvedEntrypoint).SymlinkOrRealpath`. */
export function symlinkOrRealpath(entrypoint: ResolvedEntrypoint): string {
  if (entrypoint.originalFileName !== undefined && entrypoint.originalFileName !== "") {
    return entrypoint.originalFileName;
  }
  return entrypoint.resolvedFileName;
}

export interface ResolverHost {
  useCaseSensitiveFileNames(): boolean;
  getCurrentDirectory(): string;
  fileExists(path: string): boolean;
  directoryExists(path: string): boolean;
  readFile(path: string): string | undefined;
  realpath?(path: string): string;
  getAccessibleEntries(path: string): { files: readonly string[]; directories: readonly string[] };
}

// ---------------------------------------------------------------------------
// Resolution state — mirrors TS-Go `resolutionState`
// ---------------------------------------------------------------------------

interface ResolvedInternal {
  readonly path: string;
  readonly extension: string;
  readonly originalPath: string | undefined;
  readonly resolvedUsingTsExtension: boolean;
  packageId: PackageId | undefined;
  // Set by resolveNodeLike when a non-relative library would have resolved with
  // modern Node resolution (exports) disabled. Mirrors TS-Go
  // `ResolvedModule.AlternateResult` threaded back through resolution.
  alternateResult?: string;
}

// Mirrors TS-Go `(*resolved).shouldContinueSearching`. In TS-Go a nil
// `*resolved` means "keep looking"; locally that sentinel is `undefined`.
function shouldContinueSearching(resolved: ResolvedInternal | undefined): resolved is undefined {
  return resolved === undefined;
}

// Mirrors TS-Go `continueSearching()` — the nil/undefined sentinel meaning
// "this loader found nothing; keep searching".
function continueSearching(): ResolvedInternal | undefined {
  return undefined;
}

interface ResolutionState {
  readonly name: string;
  readonly containingDirectory: string;
  readonly isTypeReferenceDirective: boolean;
  readonly compilerOptions: CompilerOptions;
  readonly resolver: Resolver;
  isConfigLookup: boolean;
  resolvedPackageDirectory: boolean;
  extensions: Extensions;
  esmMode: boolean;
  features: NodeResolutionFeatures;
  conditions: readonly string[];
  failedLookupLocations: string[];
  affectingLocations: string[];
  diagnostics: Diagnostic[];
}

function newResolutionState(
  name: string,
  containingDirectory: string,
  isTypeReferenceDirective: boolean,
  resolutionMode: ResolutionMode | undefined,
  resolver: Resolver,
): ResolutionState {
  const compilerOptions = resolver.compilerOptions;
  let extensions: Extensions;
  if (isTypeReferenceDirective) {
    extensions = Extensions.Declaration;
  } else if (compilerOptions.noDtsResolution === Tristate.True) {
    extensions = Extensions.TypeScript | Extensions.JavaScript;
  } else {
    extensions = Extensions.TypeScript | Extensions.JavaScript | Extensions.Declaration;
  }
  if (!isTypeReferenceDirective && compilerOptions.resolveJsonModule === Tristate.True) {
    extensions |= Extensions.Json;
  }

  let features: NodeResolutionFeatures = NodeResolutionFeatures.None;
  let esmMode = false;
  let conditions: readonly string[] = [];
  switch (getModuleResolutionKind(compilerOptions)) {
    case MRK.Node16:
      features = NodeResolutionFeatures.Node16Default;
      esmMode = resolutionMode === MK.ESNext;
      conditions = getConditions(compilerOptions, resolutionMode);
      break;
    case MRK.NodeNext:
      features = NodeResolutionFeatures.NodeNextDefault;
      esmMode = resolutionMode === MK.ESNext;
      conditions = getConditions(compilerOptions, resolutionMode);
      break;
    case MRK.Bundler:
      features = getNodeResolutionFeatures(compilerOptions);
      conditions = getConditions(compilerOptions, resolutionMode);
      break;
  }

  return {
    name,
    containingDirectory,
    isTypeReferenceDirective,
    compilerOptions,
    resolver,
    isConfigLookup: false,
    resolvedPackageDirectory: false,
    extensions,
    esmMode,
    features,
    conditions,
    failedLookupLocations: [],
    affectingLocations: [],
    diagnostics: [],
  };
}

// Mirrors TS-Go `GetConditions`.
function getConditions(options: CompilerOptions, resolutionMode: ResolutionMode | undefined): readonly string[] {
  const moduleResolution = getModuleResolutionKind(options);
  let effectiveMode = resolutionMode;
  if (resolutionMode === MK.None && moduleResolution === MRK.Bundler) {
    effectiveMode = MK.ESNext;
  }
  const conditions: string[] = [];
  if (effectiveMode === MK.ESNext) {
    conditions.push("import");
  } else {
    conditions.push("require");
  }

  if (options.noDtsResolution !== Tristate.True) {
    conditions.push("types");
  }
  if (moduleResolution !== MRK.Bundler) {
    conditions.push("node");
  }
  const custom = (options as { customConditions?: readonly string[] }).customConditions;
  return custom !== undefined ? [...conditions, ...custom] : conditions;
}

// Mirrors TS-Go `getNodeResolutionFeatures`.
function getNodeResolutionFeatures(options: CompilerOptions): NodeResolutionFeatures {
  let features: NodeResolutionFeatures = NodeResolutionFeatures.None;

  switch (getModuleResolutionKind(options)) {
    case MRK.Node16:
      features = NodeResolutionFeatures.Node16Default;
      break;
    case MRK.NodeNext:
      features = NodeResolutionFeatures.NodeNextDefault;
      break;
    case MRK.Bundler:
      features = NodeResolutionFeatures.BundlerDefault;
      break;
  }
  if (options.resolvePackageJsonExports === Tristate.True) {
    features |= NodeResolutionFeatures.Exports;
  } else if (options.resolvePackageJsonExports === Tristate.False) {
    features &= ~NodeResolutionFeatures.Exports;
  }
  if (options.resolvePackageJsonImports === Tristate.True) {
    features |= NodeResolutionFeatures.Imports;
  } else if (options.resolvePackageJsonImports === Tristate.False) {
    features &= ~NodeResolutionFeatures.Imports;
  }
  return features;
}

// Mirrors TS-Go `(*resolutionState).conditionMatches`.
function conditionMatches(conditions: readonly string[], condition: string): boolean {
  if (condition === "default" || conditions.includes(condition)) {
    return true;
  }
  if (!conditions.includes("types")) {
    // only apply versioned types conditions if the types condition is applied
    return false;
  }
  return isApplicableVersionedTypesKey(condition);
}

// ---------------------------------------------------------------------------
// Resolver class
// ---------------------------------------------------------------------------

export class Resolver {
  readonly host: ResolverHost;
  readonly compilerOptions: CompilerOptions;
  readonly typeReferenceDirectives: ReadonlyMap<string, ResolvedTypeReferenceDirective>;
  readonly typingsLocation: string;
  readonly projectName: string;

  constructor(
    host: ResolverHost,
    compilerOptions: CompilerOptions,
    typeReferenceDirectives: ReadonlyMap<string, ResolvedTypeReferenceDirective> | undefined,
    typingsLocation: string | undefined,
    projectName: string | undefined,
  ) {
    this.host = host;
    this.compilerOptions = compilerOptions;
    this.typeReferenceDirectives = typeReferenceDirectives ?? new Map();
    this.typingsLocation = typingsLocation ?? "";
    this.projectName = projectName ?? "";
  }

  /**
   * Mirrors TS-Go `(*Resolver).ResolveModuleName`.
   *
   * Resolves a module specifier (`moduleName`) referenced from `containingFile`
   * to a concrete file on disk (or `undefined` if not found). The strategy
   * is selected by `compilerOptions.moduleResolution`.
   */
  resolveModuleName(
    moduleName: string,
    containingFile: string,
    resolutionMode: ResolutionMode | undefined,
    redirectedReference: ResolvedProjectReference | undefined,
  ): ResolvedModuleWithFailedLookupLocations {
    void redirectedReference;
    const containingDirectory = getDirectoryPath(containingFile);
    const state = newResolutionState(
      moduleName,
      containingDirectory,
      false,
      resolutionMode,
      this,
    );

    const moduleResolution = getModuleResolutionKind(this.compilerOptions);
    let result: ResolvedInternal | undefined;
    switch (moduleResolution) {
      case MRK.Node16: case MRK.NodeNext: case MRK.Bundler:
        result = resolveNodeLike(state);
        break;
      default:
        throw new Error(`Unexpected moduleResolution: ${moduleResolution}`);
    }

    const resolved = result === undefined ? undefined : createResolvedModule(result, this.host);
    return tryResolveFromTypingsLocation(this, moduleName, containingDirectory, {
      resolvedModule: resolved,
      failedLookupLocations: state.failedLookupLocations,
      affectingLocations: state.affectingLocations,
      resolutionDiagnostics: state.diagnostics,
      alternateResult: undefined,
    });
  }

  resolveTypeReferenceDirective(
    typeReferenceDirectiveName: string,
    containingFile: string | undefined,
    resolutionMode: ResolutionMode | undefined,
    redirectedReference: ResolvedProjectReference | undefined,
  ): ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
    void redirectedReference;
    const containingDirectory = containingFile !== undefined
      ? getDirectoryPath(containingFile)
      : this.host.getCurrentDirectory();
    const state = newResolutionState(
      typeReferenceDirectiveName,
      containingDirectory,
      true,
      resolutionMode,
      this,
    );
    const { typeRoots, fromConfig } = getEffectiveTypeRoots(this.compilerOptions, this.host.getCurrentDirectory());
    const result = resolveTypeReferenceDirectiveWorker(state, typeRoots, fromConfig);
    return {
      resolvedTypeReferenceDirective: result === undefined
        ? undefined
        : createResolvedTypeReferenceDirective(result, /*primary*/ false),
      failedLookupLocations: state.failedLookupLocations,
      affectingLocations: state.affectingLocations,
      resolutionDiagnostics: state.diagnostics,
    };
  }

  resolveTripleslashReference(
    refModuleName: string,
    containingFile: string,
  ): ResolvedTripleslashReference {
    // Mirrors TS-Go `(*Resolver).resolveTripleSlashReference`. Triple-
    // slash file references resolve against the containing file's
    // directory using simple relative path semantics.
    const containingDirectory = getDirectoryPath(containingFile);
    const candidate = isRootedDiskPath(refModuleName)
      ? refModuleName
      : normalizePath(combinePaths(containingDirectory, refModuleName));
    if (this.host.fileExists(candidate)) {
      return { resolvedFileName: candidate, isExternalLibraryImport: false };
    }
    return { resolvedFileName: undefined, isExternalLibraryImport: false };
  }

  resolvePackageDirectory(
    moduleName: string,
    containingFile: string,
    resolutionMode: ResolutionMode | undefined,
    redirectedReference: ResolvedProjectReference | undefined,
  ): ResolvedModule | undefined {
    void redirectedReference;
    const state = newResolutionState(
      moduleName,
      getDirectoryPath(containingFile),
      false,
      resolutionMode,
      this,
    );
    const result = loadModuleFromNearestNodeModulesDirectory(state);
    if (result !== undefined && result.path !== "") {
      return createResolvedModuleHandlingSymlink(state, result);
    }
    return undefined;
  }

  resolveConfig(moduleName: string, containingFile: string): ResolvedModule | undefined {
    const state = newResolutionState(
      moduleName,
      getDirectoryPath(containingFile),
      false,
      MK.CommonJS,
      this,
    );
    state.isConfigLookup = true;
    state.extensions = Extensions.Json;
    const result = resolveNodeLike(state);
    return result === undefined ? undefined : createResolvedModule(result, this.host);
  }

  getPackageScopeForPath(directory: string): PackageScope | undefined {
    const state = newResolutionState("", directory, false, undefined, this);
    return getPackageScopeForPath(state, directory);
  }

  getEntrypointsFromPackageJson(
    packageDirectory: string,
    packageName: string,
    enableDirectorySearch: boolean,
  ): readonly ResolvedEntrypoint[] {
    const state = newResolutionState(packageName, packageDirectory, false, undefined, this);
    state.features = NodeResolutionFeatures.All;
    state.extensions = Extensions.TypeScript | Extensions.Declaration;
    const packageJson = readPackageJson(state, combinePaths(packageDirectory, "package.json"));
    if (packageJson === undefined) return [];
    if (packageJson.exports !== undefined) {
      return loadEntrypointsFromExportMap(state, packageDirectory, packageName, packageJson.exports);
    }
    const main = loadNodeModuleFromDirectory(state, packageDirectory, true);
    const result: ResolvedEntrypoint[] = [];
    if (main !== undefined) {
      result.push(createResolvedEntrypoint(this.host, main.path, packageName, undefined, undefined, EntrypointEnding.Fixed));
    }
    if (enableDirectorySearch && this.host.directoryExists(packageDirectory)) {
      const entries = collectPackageEntrypointFiles(this.host, packageDirectory);
      for (const file of entries) {
        if (main !== undefined && normalizePath(file) === normalizePath(main.path)) continue;
        const relative = file.startsWith(`${packageDirectory}/`)
          ? file.slice(packageDirectory.length + 1)
          : getBaseFileName(file);
        result.push(createResolvedEntrypoint(
          this.host,
          file,
          relative === "" ? packageName : `${packageName}/${relative}`,
          undefined,
          undefined,
          EntrypointEnding.Changeable,
        ));
      }
    }
    return result;
  }
}

// ---------------------------------------------------------------------------
// Resolver construction — mirrors TS-Go `NewResolver` / `NewResolverWithOptions`
// and `GetCompilerOptionsWithRedirect`.
// ---------------------------------------------------------------------------

/**
 * Mirrors TS-Go `GetCompilerOptionsWithRedirect`. When resolving on behalf of a
 * redirected project reference, the redirect's own compiler options take
 * precedence over the resolver's defaults.
 */
export function getCompilerOptionsWithRedirect(
  compilerOptions: CompilerOptions,
  redirectedReference: ResolvedProjectReference | undefined,
): CompilerOptions {
  if (redirectedReference === undefined) {
    return compilerOptions;
  }
  const optionsFromRedirect = redirectedReference.compilerOptions;
  if (optionsFromRedirect !== undefined) {
    return optionsFromRedirect;
  }
  return compilerOptions;
}

/** Mirrors TS-Go `NewResolver`. */
export function newResolver(
  host: ResolverHost,
  options: CompilerOptions,
  typingsLocation: string,
  projectName: string,
): Resolver {
  return new Resolver(host, options, undefined, typingsLocation, projectName);
}

/**
 * Mirrors TS-Go `NewResolverWithOptions`. The package.json info cache is owned
 * by the host's filesystem layer in this port, so the cache option degrades to
 * the same construction path as `newResolver`.
 */
export function newResolverWithOptions(
  host: ResolverHost,
  compilerOptions: CompilerOptions,
  typingsLocation: string,
  projectName: string,
): Resolver {
  return new Resolver(host, compilerOptions, undefined, typingsLocation, projectName);
}

// ---------------------------------------------------------------------------
// Result construction
// ---------------------------------------------------------------------------

/**
 * Mirrors TS-Go `(*resolutionState).getOriginalAndResolvedFileName`. Returns
 * `[originalPath, resolvedFileName]`. When `fileName` and its realpath compare
 * equal (differing only in casing, or identical), the original path is empty
 * and the resolved name is kept as-written so casing diagnostics stay correct.
 */
function getOriginalAndResolvedFileName(host: ResolverHost, fileName: string): readonly [string, string] {
  const resolvedFileName = host.realpath !== undefined ? host.realpath(fileName) : fileName;
  const comparePathsOptions: ComparePathsOptions = {
    useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
    currentDirectory: host.getCurrentDirectory(),
  };
  if (comparePaths(fileName, resolvedFileName, comparePathsOptions) === 0) {
    // If the fileName and realpath are differing only in casing, prefer fileName
    // so that we can issue correct errors for casing under forceConsistentCasingInFileNames
    return ["", fileName];
  }
  return [fileName, resolvedFileName];
}

function createResolvedModule(resolved: ResolvedInternal, host: ResolverHost): ResolvedModule {
  // Symlink-realpath chasing: prefer the realpath but record the as-written
  // path as `originalPath` when they differ (mirrors getOriginalAndResolvedFileName).
  const [originalPath, resolvedFileName] = getOriginalAndResolvedFileName(host, resolved.path);
  return {
    resolvedFileName,
    extension: resolved.extension,
    packageId: resolved.packageId,
    originalPath: originalPath !== "" ? originalPath : resolved.originalPath,
    resolvedUsingTsExtension: resolved.resolvedUsingTsExtension,
  };
}

/**
 * Mirrors TS-Go `(*resolutionState).createResolvedModuleHandlingSymlink`. Only
 * chases the realpath for non-relative external-library (node_modules) imports
 * that have not already recorded an original path, honoring `preserveSymlinks`.
 */
function createResolvedModuleHandlingSymlink(state: ResolutionState, resolved: ResolvedInternal | undefined): ResolvedModule {
  const isExternalLibraryImport = resolved !== undefined && resolved.path.includes("/node_modules/");
  if (
    state.compilerOptions.preserveSymlinks !== Tristate.True &&
    isExternalLibraryImport &&
    resolved !== undefined &&
    (resolved.originalPath === undefined || resolved.originalPath === "") &&
    !isExternalModuleNameRelative(state.name)
  ) {
    const [originalPath, resolvedFileName] = getOriginalAndResolvedFileName(state.resolver.host, resolved.path);
    if (originalPath !== "") {
      return createResolvedModule(
        { ...resolved, path: resolvedFileName, originalPath },
        state.resolver.host,
      );
    }
  }
  return resolved === undefined
    ? emptyResolvedModule()
    : createResolvedModule(resolved, state.resolver.host);
}

function emptyResolvedModule(): ResolvedModule {
  return {
    resolvedFileName: "",
    extension: "",
    packageId: undefined,
    originalPath: undefined,
    resolvedUsingTsExtension: false,
  };
}

function createResolvedTypeReferenceDirective(
  resolved: ResolvedInternal,
  primary: boolean,
): ResolvedTypeReferenceDirective {
  return {
    primary,
    resolvedFileName: resolved.path,
    packageId: resolved.packageId,
    isExternalLibraryImport: resolved.path.includes("/node_modules/"),
    originalPath: resolved.originalPath,
    resolvedUsingTsExtension: resolved.resolvedUsingTsExtension,
  };
}

function resolveTypeReferenceDirectiveWorker(
  state: ResolutionState,
  typeRoots: readonly string[],
  fromConfig: boolean,
): ResolvedInternal | undefined {
  if (typeRoots.length > 0) {
    for (const typeRoot of typeRoots) {
      const candidate = getCandidateFromTypeRoot(state, typeRoot);
      if (!state.resolver.host.directoryExists(typeRoot)) {
        state.failedLookupLocations.push(typeRoot);
        continue;
      }
      if (fromConfig) {
        const fromFile = loadModuleFromFile(state, candidate);
        if (fromFile !== undefined) return fromFile;
      }
      const fromDirectory = loadNodeModuleFromDirectory(state, candidate, true);
      if (fromDirectory !== undefined) return fromDirectory;
    }
  }

  if (!isExternalModuleNameRelative(state.name)) {
    const fromNodeModules = loadModuleFromNearestNodeModulesDirectory(state);
    if (fromNodeModules !== undefined) return fromNodeModules;
  } else {
    const candidate = normalizePathForCjsResolution(state.containingDirectory, state.name);
    const fromRelative = nodeLoadModuleByRelativeName(state, candidate, true);
    if (fromRelative !== undefined) return fromRelative;
  }
  return undefined;
}

function getCandidateFromTypeRoot(state: ResolutionState, typeRoot: string): string {
  const lookupName = typeRoot.endsWith("/node_modules/@types") || typeRoot.endsWith("/node_modules/@types/")
    ? mangleScopedPackageName(state.name)
    : state.name;
  return combinePaths(typeRoot, lookupName);
}

function resolveFromTypeRoot(state: ResolutionState): ResolvedInternal | undefined {
  const typeRoots = state.compilerOptions.typeRoots;
  if (typeRoots === undefined || typeRoots.length === 0) return undefined;
  for (const typeRoot of typeRoots) {
    const candidate = getCandidateFromTypeRoot(state, typeRoot);
    if (!state.resolver.host.directoryExists(typeRoot)) {
      state.failedLookupLocations.push(typeRoot);
      continue;
    }
    const fromFile = loadModuleFromFile(state, candidate);
    if (fromFile !== undefined) return fromFile;
    const fromDirectory = loadNodeModuleFromDirectory(state, candidate, true);
    if (fromDirectory !== undefined) return fromDirectory;
  }
  return undefined;
}

function normalizePathForCjsResolution(containingDirectory: string, moduleName: string): string {
  const combined = combinePaths(containingDirectory, moduleName);
  const normalized = normalizePath(combined);
  const lastSlash = normalized.lastIndexOf("/");
  const lastPart = lastSlash < 0 ? normalized : normalized.slice(lastSlash + 1);
  return lastPart === "." || lastPart === ".."
    ? `${normalized}/`
    : normalized;
}

// ---------------------------------------------------------------------------
// Node-style resolution
// ---------------------------------------------------------------------------

// Mirrors TS-Go `(*resolutionState).resolveNodeLike`. Wraps the worker with the
// "modern Node resolution disabled" retry that records an alternate result when
// a non-relative library would have resolved with `exports` (and `import`
// condition) disabled.
function resolveNodeLike(state: ResolutionState): ResolvedInternal | undefined {
  const result = resolveNodeLikeWorker(state);
  if (
    state.resolvedPackageDirectory &&
    !state.isConfigLookup &&
    (state.features & NodeResolutionFeatures.Exports) !== 0 &&
    (state.extensions & (Extensions.TypeScript | Extensions.Declaration)) !== 0 &&
    !isExternalModuleNameRelative(state.name) &&
    result !== undefined &&
    result.path !== "" &&
    result.path.includes("/node_modules/") &&
    !extensionIsOk(Extensions.TypeScript | Extensions.Declaration, result.extension) &&
    state.conditions.includes("import")
  ) {
    state.features = state.features & ~NodeResolutionFeatures.Exports;
    state.extensions = state.extensions & (Extensions.TypeScript | Extensions.Declaration);
    const diagnosticsCount = state.diagnostics.length;
    const diagnosticResult = resolveNodeLikeWorker(state);
    if (
      diagnosticResult !== undefined &&
      diagnosticResult.path !== "" &&
      diagnosticResult.path.includes("/node_modules/")
    ) {
      result.alternateResult = diagnosticResult.path;
    }
    state.diagnostics.length = diagnosticsCount;
  }
  return result;
}

// Mirrors TS-Go `(*resolutionState).resolveNodeLikeWorker`.
function resolveNodeLikeWorker(state: ResolutionState): ResolvedInternal | undefined {
  const optional = tryLoadModuleUsingOptionalResolutionSettings(state);
  if (optional !== undefined) return optional;

  if (isExternalModuleNameRelative(state.name)) {
    const candidate = normalizePathForCjsResolution(state.containingDirectory, state.name);
    return nodeLoadModuleByRelativeName(state, candidate, /*considerPackageJson*/ true);
  }

  if ((state.features & NodeResolutionFeatures.Imports) !== 0 && state.name.startsWith("#")) {
    const imported = loadModuleFromImports(state);
    if (imported !== undefined) return imported;
  }
  if ((state.features & NodeResolutionFeatures.SelfName) !== 0) {
    const self = loadModuleFromSelfNameReference(state);
    if (self !== undefined) return self;
  }
  if (state.name.includes(":")) return undefined;

  // Non-relative: walk node_modules folders up the directory tree.
  const fromNodeModules = loadModuleFromNearestNodeModulesDirectory(state);
  if (fromNodeModules !== undefined) return fromNodeModules;
  if ((state.extensions & Extensions.Declaration) !== 0) {
    return resolveFromTypeRoot(state);
  }
  return undefined;
}

// Mirrors TS-Go `(*Resolver).tryResolveFromTypingsLocation`. After a primary
// resolution, if a `typingsLocation` (global typings cache) is configured and
// the module did not resolve to a first-party TS/JSON file, retry the lookup
// against the typings cache's node_modules for a declaration file.
function tryResolveFromTypingsLocation(
  resolver: Resolver,
  moduleName: string,
  containingDirectory: string,
  originalResult: ResolvedModuleWithFailedLookupLocations,
): ResolvedModuleWithFailedLookupLocations {
  const resolved = originalResult.resolvedModule;
  if (
    resolver.typingsLocation === "" ||
    isExternalModuleNameRelative(moduleName) ||
    (resolved !== undefined && resolved.resolvedFileName !== "" &&
      extensionIsOneOf(resolved.extension, supportedTSExtensionsWithJsonFlat))
  ) {
    return originalResult;
  }

  const state = newResolutionState(
    moduleName,
    containingDirectory,
    false,
    MK.None,
    resolver,
  );
  state.extensions = Extensions.Declaration;
  const globalResolved = loadModuleFromImmediateNodeModulesDirectory(state, resolver.typingsLocation, false);
  if (globalResolved === undefined) {
    return originalResult;
  }
  return {
    resolvedModule: createResolvedModule(globalResolved, resolver.host),
    failedLookupLocations: state.failedLookupLocations,
    affectingLocations: state.affectingLocations,
    resolutionDiagnostics: [...originalResult.resolutionDiagnostics, ...state.diagnostics],
    alternateResult: undefined,
  };
}

function tryLoadModuleUsingOptionalResolutionSettings(state: ResolutionState): ResolvedInternal | undefined {
  const pathMapped = tryLoadModuleUsingPathsIfEligible(state);
  if (pathMapped !== undefined) return pathMapped;
  if (isExternalModuleNameRelative(state.name)) {
    return tryLoadModuleUsingRootDirs(state);
  }
  return undefined;
}

// Mirrors TS-Go `(*resolutionState).getParsedPatternsForPaths`. Parses
// `compilerOptions.paths` once into the canonical core.Pattern representation.
function getParsedPatternsForPaths(state: ResolutionState): ParsedPatternsCore {
  return tryParsePatterns(state.compilerOptions.paths ?? new Map<string, readonly string[]>());
}

// Mirrors TS-Go `(*resolutionState).tryLoadModuleUsingPathsIfEligible`.
function tryLoadModuleUsingPathsIfEligible(state: ResolutionState): ResolvedInternal | undefined {
  const paths = state.compilerOptions.paths;
  if (!(paths !== undefined && paths.size > 0 && !isExternalModuleNameRelative(state.name))) {
    return continueSearching();
  }
  const baseDirectory = getPathsBasePath(state.compilerOptions, state.resolver.host.getCurrentDirectory());
  if (baseDirectory === "") return continueSearching();
  const pathPatterns = getParsedPatternsForPaths(state);
  return tryLoadModuleUsingPaths(
    state,
    state.name,
    baseDirectory,
    paths,
    pathPatterns,
    (candidate) => nodeLoadModuleByRelativeName(state, candidate, /*considerPackageJson*/ true),
  );
}

// Mirrors TS-Go `(*resolutionState).tryLoadModuleUsingPaths`.
function tryLoadModuleUsingPaths(
  state: ResolutionState,
  moduleName: string,
  containingDirectory: string,
  paths: ReadonlyMap<string, readonly string[]>,
  pathPatterns: ParsedPatternsCore,
  loader: (candidate: string) => ResolvedInternal | undefined,
): ResolvedInternal | undefined {
  const matchedPattern = matchPatternOrExact(pathPatterns, moduleName);
  if (patternIsValid(matchedPattern)) {
    const matchedStar = patternMatchedText(matchedPattern, moduleName);
    for (const subst of paths.get(matchedPattern.text) ?? []) {
      const path = subst.includes("*") ? subst.replace("*", matchedStar) : subst;
      const candidate = normalizePath(combinePaths(containingDirectory, path));
      const resolved = loader(candidate);
      if (!shouldContinueSearching(resolved)) {
        return resolved;
      }
    }
  }
  return continueSearching();
}

function tryLoadModuleUsingRootDirs(state: ResolutionState): ResolvedInternal | undefined {
  const rootDirs = state.compilerOptions.rootDirs;
  if (rootDirs === undefined || rootDirs.length === 0) return undefined;
  const candidate = normalizePath(combinePaths(state.containingDirectory, state.name));
  let bestRoot = "";
  let bestPrefix = "";
  for (const rootDir of rootDirs) {
    let normalizedRoot = normalizePath(rootDir);
    if (!normalizedRoot.endsWith("/")) normalizedRoot += "/";
    if (candidate.startsWith(normalizedRoot) && normalizedRoot.length > bestPrefix.length) {
      bestRoot = rootDir;
      bestPrefix = normalizedRoot;
    }
  }
  if (bestPrefix === "") return undefined;
  const suffix = candidate.slice(bestPrefix.length);
  const initial = nodeLoadModuleByRelativeName(state, candidate, true);
  if (initial !== undefined) return initial;
  for (const rootDir of rootDirs) {
    if (rootDir === bestRoot) continue;
    const alternate = normalizePath(combinePaths(rootDir, suffix));
    const result = nodeLoadModuleByRelativeName(state, alternate, true);
    if (result !== undefined) return result;
  }
  return undefined;
}

function nodeLoadModuleByRelativeName(
  state: ResolutionState,
  candidate: string,
  considerPackageJson: boolean,
): ResolvedInternal | undefined {
  if (!hasTrailingDirectorySeparator(candidate)) {
    const parentOfCandidate = getDirectoryPath(candidate);
    if (!state.resolver.host.directoryExists(parentOfCandidate)) {
      return undefined;
    }
    const resolvedFromFile = loadModuleFromFile(state, candidate);
    if (resolvedFromFile !== undefined) {
      if (considerPackageJson) {
        const packageDirectory = parseNodeModuleFromPath(resolvedFromFile.path, false);
        if (packageDirectory !== "") {
          resolvedFromFile.packageId = getPackageIdForResolved(state, resolvedFromFile.path, packageDirectory);
        }
      }
      return resolvedFromFile;
    }
  }
  if (!state.resolver.host.directoryExists(candidate)) {
    return undefined;
  }
  // ESM-mode relative imports don't try index lookups or package.json.
  if (!state.esmMode) {
    return loadNodeModuleFromDirectory(state, candidate, considerPackageJson);
  }
  return undefined;
}

function loadModuleFromFile(state: ResolutionState, candidate: string): ResolvedInternal | undefined {
  // ./foo.js → look for ./foo.ts first, then fall back.
  const replaced = loadModuleFromFileNoImplicitExtensions(state, candidate);
  if (replaced !== undefined) return replaced;
  // ./foo → try adding TS/JS/.d.ts/JSON extensions.
  if (!state.esmMode) {
    return tryAddingExtensions(state, candidate, "");
  }
  // ESM mode requires explicit extension; no implicit adding.
  return undefined;
}

function loadModuleFromFileNoImplicitExtensions(
  state: ResolutionState,
  candidate: string,
): ResolvedInternal | undefined {
  const base = getBaseFileName(candidate);
  if (!base.includes(".")) return undefined;
  let extensionless = removeFileExtension(candidate);
  if (extensionless === candidate) {
    extensionless = candidate.slice(0, candidate.lastIndexOf("."));
  }
  const extension = candidate.slice(extensionless.length);
  return tryAddingExtensions(state, extensionless, extension);
}

const EXT_MTS = ".mts";
const EXT_CTS = ".cts";
const EXT_DMTS = ".d.mts";
const EXT_DCTS = ".d.cts";
const EXT_MJS = ".mjs";
const EXT_CJS = ".cjs";
const EXT_DTS = ".d.ts";
const EXT_TS = ".ts";
const EXT_TSX = ".tsx";
const EXT_JS = ".js";
const EXT_JSX = ".jsx";
const EXT_JSON = ".json";

function tryAddingExtensions(
  state: ResolutionState,
  extensionless: string,
  originalExtension: string,
): ResolvedInternal | undefined {
  const directory = getDirectoryPath(extensionless);
  if (directory !== "" && !state.resolver.host.directoryExists(directory)) {
    return undefined;
  }

  // Original-extension-driven prioritization. Mirrors TS-Go
  // `(*resolutionState).tryAddingExtensions` switch.
  const candidatesOf = (origExt: string): readonly string[] => {
    switch (origExt) {
      case EXT_MJS: case EXT_MTS: case EXT_DMTS:
        return [EXT_MTS, EXT_DMTS, EXT_MJS];
      case EXT_CJS: case EXT_CTS: case EXT_DCTS:
        return [EXT_CTS, EXT_DCTS, EXT_CJS];
      case EXT_JSON:
        return [EXT_JSON, EXT_DTS];
      case EXT_DTS: case EXT_TS:
        return [EXT_TS, EXT_TSX, EXT_DTS, EXT_JS, EXT_JSX, EXT_JSON];
      default:
        // No original extension specified (`./foo` import): try the
        // canonical order TS → TSX → .d.ts → JS → JSX → JSON, filtered
        // by enabled extensions.
        return [EXT_TS, EXT_TSX, EXT_DTS, EXT_JS, EXT_JSX, EXT_JSON];
    }
  };

  for (const ext of candidatesOf(originalExtension)) {
    if (!extensionEnabled(state, ext)) continue;
    const isTsExtension = ext === EXT_TS || ext === EXT_TSX || ext === EXT_DTS ||
      ext === EXT_MTS || ext === EXT_DMTS || ext === EXT_CTS || ext === EXT_DCTS;
    const resolved = tryExtension(state, ext, extensionless, isTsExtension);
    if (!shouldContinueSearching(resolved)) return resolved;
  }
  return continueSearching();
}

// Mirrors TS-Go `(*resolutionState).tryExtension`.
function tryExtension(
  state: ResolutionState,
  extension: string,
  extensionless: string,
  resolvedUsingTsExtension: boolean,
): ResolvedInternal | undefined {
  const fileName = extensionless + extension;
  const actualPath = tryFile(state, fileName);
  if (actualPath !== undefined) {
    return {
      path: actualPath,
      extension,
      originalPath: undefined,
      resolvedUsingTsExtension,
      packageId: undefined,
    };
  }
  return continueSearching();
}

function tryFile(state: ResolutionState, fileName: string): string | undefined {
  const suffixes = state.compilerOptions.moduleSuffixes;
  if (suffixes === undefined || suffixes.length === 0) {
    return tryFileLookup(state, fileName) ? fileName : undefined;
  }
  const extension = fileName.slice(fileName.lastIndexOf("."));
  const extensionless = fileName.slice(0, fileName.length - extension.length);
  for (const suffix of suffixes) {
    const candidate = `${extensionless}${suffix}${extension}`;
    if (tryFileLookup(state, candidate)) return candidate;
  }
  return undefined;
}

function tryFileLookup(state: ResolutionState, fileName: string): boolean {
  if (state.resolver.host.fileExists(fileName)) return true;
  state.failedLookupLocations.push(fileName);
  return false;
}

function extensionEnabled(state: ResolutionState, ext: string): boolean {
  switch (ext) {
    case EXT_TS: case EXT_TSX: case EXT_MTS: case EXT_CTS:
      return (state.extensions & Extensions.TypeScript) !== 0;
    case EXT_DTS: case EXT_DMTS: case EXT_DCTS:
      return (state.extensions & Extensions.Declaration) !== 0;
    case EXT_JS: case EXT_JSX: case EXT_MJS: case EXT_CJS:
      return (state.extensions & Extensions.JavaScript) !== 0;
    case EXT_JSON:
      return (state.extensions & Extensions.Json) !== 0;
    default:
      return false;
  }
}

function loadNodeModuleFromDirectory(
  state: ResolutionState,
  candidate: string,
  considerPackageJson: boolean,
): ResolvedInternal | undefined {
  if (considerPackageJson) {
    const packageJsonResult = loadModuleFromPackageJson(state, candidate);
    if (packageJsonResult !== undefined) return packageJsonResult;
  }
  const indexCandidate = combinePaths(candidate, "index");
  return tryAddingExtensions(state, indexCandidate, "");
}

interface PackageJsonLike {
  readonly name?: string;
  readonly version?: string;
  readonly types?: string;
  readonly typings?: string;
  readonly main?: string;
  readonly module?: string;
  readonly imports?: PackageJsonSubpathMap;
  readonly exports?: unknown;
  readonly typesVersions?: Record<string, Record<string, readonly string[]>>;
}

type PackageJsonSubpathTarget =
  | string
  | readonly PackageJsonSubpathTarget[]
  | { readonly [conditionOrSubpath: string]: PackageJsonSubpathTarget | undefined }
  | null;

type PackageJsonSubpathMap = Record<string, PackageJsonSubpathTarget>;

function loadModuleFromPackageJson(state: ResolutionState, packageDirectory: string): ResolvedInternal | undefined {
  const packageJsonPath = combinePaths(packageDirectory, "package.json");
  const packageJson = readPackageJson(state, packageJsonPath);
  if (packageJson === undefined) return undefined;
  state.affectingLocations.push(packageJsonPath);
  if ((state.features & NodeResolutionFeatures.Exports) !== 0) {
    const exportsResult = loadModuleFromPackageJsonExports(state, packageDirectory, packageJson);
    if (exportsResult !== undefined) return withPackageJsonId(exportsResult, packageJson, packageDirectory);
  }
  const typesVersionsResult = loadModuleFromTypesVersions(state, packageDirectory, packageJson);
  if (typesVersionsResult !== undefined) return withPackageJsonId(typesVersionsResult, packageJson, packageDirectory);
  const fieldResult = loadModuleFromPackageJsonFields(state, packageDirectory, packageJson);
  if (fieldResult !== undefined) return withPackageJsonId(fieldResult, packageJson, packageDirectory);
  return undefined;
}

interface PackageScope {
  readonly packageDirectory: string;
  readonly packageJsonPath: string;
  readonly packageJson: PackageJsonLike;
}

// Mirrors TS-Go `(*resolutionState).getPackageScopeForPath`. Walks ancestor
// directories from `directory` outward (stopping at the global typings cache),
// returning the nearest enclosing package.json scope.
function getPackageScopeForPath(state: ResolutionState, directory: string): PackageScope | undefined {
  return forEachAncestorDirectoryStoppingAtGlobalCache<PackageScope | undefined>(
    state.resolver.typingsLocation,
    directory,
    (current) => {
      const result = getPackageJsonInfo(state, current);
      if (result !== undefined) {
        return { result, stop: true };
      }
      return { result: undefined, stop: false };
    },
  );
}

// Mirrors TS-Go `(*resolutionState).getPackageJsonInfo`. Reads the package.json
// at `packageDirectory`, recording an affecting location on hit. The local port
// has no separate package.json info cache, so this reads through the host FS.
function getPackageJsonInfo(state: ResolutionState, packageDirectory: string): PackageScope | undefined {
  const packageJsonPath = combinePaths(packageDirectory, "package.json");
  const packageJson = readPackageJson(state, packageJsonPath);
  if (packageJson !== undefined) {
    state.affectingLocations.push(packageJsonPath);
    return { packageDirectory, packageJsonPath, packageJson };
  }
  return undefined;
}

function loadModuleFromImports(state: ResolutionState): ResolvedInternal | undefined {
  if (state.name === "#" || state.name.startsWith("#/")) return undefined;
  const scope = getPackageScopeForPath(state, state.containingDirectory);
  if (scope === undefined) return undefined;
  return loadModuleFromPackageJsonImports(state, scope.packageDirectory, scope.packageJson);
}

function loadModuleFromSelfNameReference(state: ResolutionState): ResolvedInternal | undefined {
  const scope = getPackageScopeForPath(state, state.containingDirectory);
  if (scope === undefined) return undefined;
  const packageName = scope.packageJson.name;
  if (packageName === undefined || packageName === "") return undefined;
  if (state.name !== packageName && !state.name.startsWith(`${packageName}/`)) return undefined;
  if (scope.packageJson.exports === undefined || scope.packageJson.exports === null) return undefined;
  return loadModuleFromPackageJsonExports(state, scope.packageDirectory, scope.packageJson);
}

function readPackageJson(state: ResolutionState, path: string): PackageJsonLike | undefined {
  if (!state.resolver.host.fileExists(path)) {
    state.failedLookupLocations.push(path);
    return undefined;
  }
  const text = state.resolver.host.readFile(path);
  if (text === undefined) return undefined;
  try {
    const parsed = JSON.parse(text) as PackageJsonLike;
    return typeof parsed === "object" && parsed !== null ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function loadModuleFromPackageJsonFields(
  state: ResolutionState,
  packageDirectory: string,
  packageJson: PackageJsonLike,
): ResolvedInternal | undefined {
  const fields = state.isTypeReferenceDirective
    ? [packageJson.types, packageJson.typings]
    : [packageJson.types, packageJson.typings, packageJson.module, packageJson.main];
  for (const field of fields) {
    if (field === undefined || field === "") continue;
    const candidate = normalizePath(combinePaths(packageDirectory, field));
    const result = nodeLoadModuleByRelativeName(state, candidate, false);
    if (result !== undefined) return result;
  }
  return undefined;
}

function loadModuleFromPackageJsonExports(
  state: ResolutionState,
  packageDirectory: string,
  packageJson: PackageJsonLike,
): ResolvedInternal | undefined {
  if (packageJson.exports === undefined) return undefined;
  const subpath = packageSubpathFromStateName(state, packageJson.name);
  const target = resolvePackageTargetFromExports(packageJson.exports, subpath, state.conditions);
  if (target === undefined) return undefined;
  return loadPackageTarget(state, packageDirectory, target);
}

function loadModuleFromPackageJsonImports(
  state: ResolutionState,
  packageDirectory: string,
  packageJson: PackageJsonLike,
): ResolvedInternal | undefined {
  if (packageJson.imports === undefined || !state.name.startsWith("#")) return undefined;
  const target = resolvePackageImportsTarget(packageJson.imports, state.name, state.conditions);
  if (target === undefined) return undefined;
  return loadPackageTarget(state, packageDirectory, target);
}

function resolvePackageTargetFromExports(
  exportsValue: unknown,
  subpath: string,
  conditions: readonly string[],
): string | undefined {
  if (typeof exportsValue === "string" || Array.isArray(exportsValue) || exportsValue === null) {
    if (subpath !== ".") return undefined;
    return resolveConditionalPackageTarget(exportsValue as PackageJsonSubpathTarget, conditions);
  }
  if (!isRecord(exportsValue)) return undefined;
  const exportMap = exportsValue as PackageJsonSubpathMap;
  if (hasPackageSubpathKeys(exportMap)) {
    const exact = exportMap[subpath];
    if (exact !== undefined) return resolveConditionalPackageTarget(exact, conditions);
    const pattern = findBestPackagePattern(Object.keys(exportMap), subpath);
    if (pattern !== undefined) {
      const target = exportMap[pattern];
      const matchedStar = getPackagePatternStar(pattern, subpath);
      const resolved = resolveConditionalPackageTarget(target, conditions);
      return resolved === undefined ? undefined : resolved.replaceAll("*", matchedStar);
    }
    return undefined;
  }
  if (subpath !== ".") return undefined;
  return resolveConditionalPackageTarget(exportMap, conditions);
}

function resolvePackageImportsTarget(
  importsValue: PackageJsonSubpathMap,
  specifier: string,
  conditions: readonly string[],
): string | undefined {
  const exact = importsValue[specifier];
  if (exact !== undefined) return resolveConditionalPackageTarget(exact, conditions);
  const pattern = findBestPackagePattern(Object.keys(importsValue), specifier);
  if (pattern === undefined) return undefined;
  const resolved = resolveConditionalPackageTarget(importsValue[pattern], conditions);
  return resolved === undefined ? undefined : resolved.replaceAll("*", getPackagePatternStar(pattern, specifier));
}

function resolveConditionalPackageTarget(
  target: PackageJsonSubpathTarget | undefined,
  conditions: readonly string[],
): string | undefined {
  if (target === undefined || target === null) return undefined;
  if (typeof target === "string") return target;
  if (Array.isArray(target)) {
    for (const entry of target) {
      const resolved = resolveConditionalPackageTarget(entry, conditions);
      if (resolved !== undefined) return resolved;
    }
    return undefined;
  }
  for (const [condition, entry] of Object.entries(target)) {
    if (!conditionMatches(conditions, condition)) continue;
    const resolved = resolveConditionalPackageTarget(entry, conditions);
    if (resolved !== undefined) return resolved;
  }
  return undefined;
}

function loadPackageTarget(
  state: ResolutionState,
  packageDirectory: string,
  target: string,
): ResolvedInternal | undefined {
  if (target.length === 0) return undefined;
  if (target.startsWith("./")) {
    if (hasInvalidPackageTargetSegment(target)) return undefined;
    return nodeLoadModuleByRelativeName(state, normalizePath(combinePaths(packageDirectory, target)), false);
  }
  if (isExternalModuleNameRelative(target) || isRootedDiskPath(target)) {
    return nodeLoadModuleByRelativeName(state, normalizePath(combinePaths(packageDirectory, target)), false);
  }
  const nestedState: ResolutionState = {
    ...state,
    name: target,
    containingDirectory: packageDirectory,
    failedLookupLocations: state.failedLookupLocations,
    affectingLocations: state.affectingLocations,
    diagnostics: state.diagnostics,
  };
  return resolveNodeLike(nestedState);
}

function loadEntrypointsFromExportMap(
  state: ResolutionState,
  packageDirectory: string,
  packageName: string,
  exportsValue: unknown,
): readonly ResolvedEntrypoint[] {
  const entrypoints: ResolvedEntrypoint[] = [];
  const includeNone: ReadonlySet<string> | undefined = undefined;
  const excludeNone: ReadonlySet<string> | undefined = undefined;
  const visit = (
    subpath: string,
    target: PackageJsonSubpathTarget | unknown,
    includeConditions: ReadonlySet<string> | undefined,
    excludeConditions: ReadonlySet<string> | undefined,
  ): void => {
    if (typeof target === "string") {
      const resolved = resolveEntrypointTarget(state, packageDirectory, packageName, subpath, target, includeConditions, excludeConditions);
      if (resolved !== undefined) entrypoints.push(...resolved);
      return;
    }
    if (Array.isArray(target)) {
      for (const element of target) visit(subpath, element, includeConditions, excludeConditions);
      return;
    }
    if (!isRecord(target)) return;
    const map = target as PackageJsonSubpathMap;
    if (hasPackageSubpathKeys(map)) {
      for (const [key, value] of Object.entries(map)) {
        visit(key, value, includeConditions, excludeConditions);
      }
      return;
    }
    const previousConditions: string[] = [];
    for (const [condition, value] of Object.entries(map)) {
      if (excludeConditions?.has(condition) === true) continue;
      const alwaysMatches = condition === "default" || condition === "types" || isApplicableVersionedTypesKey(condition);
      const nextInclude = alwaysMatches
        ? includeConditions
        : addCondition(includeConditions, condition);
      const nextExclude = alwaysMatches
        ? excludeConditions
        : addConditions(excludeConditions, previousConditions);
      previousConditions.push(condition);
      visit(subpath, value, nextInclude, nextExclude);
      if (alwaysMatches) break;
    }
  };

  if (typeof exportsValue === "string" || Array.isArray(exportsValue) || exportsValue === null) {
    visit(".", exportsValue as PackageJsonSubpathTarget, includeNone, excludeNone);
  } else if (isRecord(exportsValue) && hasPackageSubpathKeys(exportsValue as PackageJsonSubpathMap)) {
    for (const [subpath, target] of Object.entries(exportsValue)) {
      visit(subpath, target, includeNone, excludeNone);
    }
  } else {
    visit(".", exportsValue, includeNone, excludeNone);
  }
  return entrypoints;
}

function resolveEntrypointTarget(
  state: ResolutionState,
  packageDirectory: string,
  packageName: string,
  subpath: string,
  target: string,
  includeConditions: ReadonlySet<string> | undefined,
  excludeConditions: ReadonlySet<string> | undefined,
): readonly ResolvedEntrypoint[] | undefined {
  if (!target.startsWith("./") || hasInvalidPackageTargetSegment(target)) return undefined;
  const resolved: ResolvedEntrypoint[] = [];
  if (target.includes("*")) {
    const patternBase = target.slice(0, target.indexOf("*"));
    const patternTail = target.slice(target.indexOf("*") + 1);
    const directory = normalizePath(combinePaths(packageDirectory, patternBase));
    const searchRoot = directory.endsWith("/") ? directory.slice(0, -1) : getDirectoryPath(directory);
    if (!state.resolver.host.directoryExists(searchRoot)) return undefined;
    const leading = normalizePath(combinePaths(packageDirectory, patternBase));
    const trailing = patternTail;
    const caseSensitive = state.resolver.host.useCaseSensitiveFileNames();
    for (const file of collectPackageEntrypointFiles(state.resolver.host, searchRoot)) {
      const normalized = normalizePath(file);
      const [matched, ok] = getMatchedStarForPatternEntrypoint(state, normalized, leading, trailing, caseSensitive);
      if (!ok) continue;
      const moduleSpecifier = `${packageName}/${subpath.replace("./", "").replace("*", matched)}`;
      resolved.push(createResolvedEntrypoint(
        state.resolver.host,
        normalized,
        moduleSpecifier,
        includeConditions,
        excludeConditions,
        target.endsWith("*") ? EntrypointEnding.ExtensionChangeable : EntrypointEnding.Fixed,
      ));
    }
    return resolved;
  }
  const finalPath = normalizePath(combinePaths(packageDirectory, target));
  const loaded = loadFileNameFromPackageJsonField(state, finalPath, target);
  if (loaded === undefined) return undefined;
  const moduleSpecifier = subpath === "." ? packageName : `${packageName}/${subpath.replace("./", "")}`;
  resolved.push(createResolvedEntrypoint(
    state.resolver.host,
    loaded.path,
    moduleSpecifier,
    includeConditions,
    excludeConditions,
    target.endsWith("*") ? EntrypointEnding.ExtensionChangeable : EntrypointEnding.Fixed,
  ));
  return resolved;
}

function loadFileNameFromPackageJsonField(
  state: ResolutionState,
  candidate: string,
  packageJsonValue: string,
): ResolvedInternal | undefined {
  void packageJsonValue;
  const fromFile = loadModuleFromFileNoImplicitExtensions(state, candidate);
  if (fromFile !== undefined) return fromFile;
  return nodeLoadModuleByRelativeName(state, candidate, false);
}

function createResolvedEntrypoint(
  host: ResolverHost,
  fileName: string,
  moduleSpecifier: string,
  includeConditions: ReadonlySet<string> | undefined,
  excludeConditions: ReadonlySet<string> | undefined,
  ending: EntrypointEnding,
): ResolvedEntrypoint {
  const real = host.realpath?.(fileName);
  return {
    originalFileName: real !== undefined && real !== fileName ? fileName : undefined,
    resolvedFileName: real ?? fileName,
    moduleSpecifier,
    ending,
    includeConditions,
    excludeConditions,
  };
}

function addCondition(base: ReadonlySet<string> | undefined, condition: string): ReadonlySet<string> {
  const result = new Set(base ?? []);
  result.add(condition);
  return result;
}

function addConditions(base: ReadonlySet<string> | undefined, conditions: readonly string[]): ReadonlySet<string> | undefined {
  if (conditions.length === 0) return base;
  const result = new Set(base ?? []);
  for (const condition of conditions) result.add(condition);
  return result;
}

function collectPackageEntrypointFiles(host: ResolverHost, root: string): readonly string[] {
  const result: string[] = [];
  const visit = (directory: string): void => {
    const entries = host.getAccessibleEntries(directory);
    for (const file of entries.files) {
      const fullPath = normalizePath(combinePaths(directory, file));
      if (isEntrypointExtension(fullPath)) result.push(fullPath);
    }
    for (const child of entries.directories) {
      if (child === "node_modules" || child.startsWith(".")) continue;
      visit(normalizePath(combinePaths(directory, child)));
    }
  };
  visit(root);
  return result;
}

function isEntrypointExtension(fileName: string): boolean {
  return fileName.endsWith(EXT_TS) ||
    fileName.endsWith(EXT_TSX) ||
    fileName.endsWith(EXT_DTS) ||
    fileName.endsWith(EXT_MTS) ||
    fileName.endsWith(EXT_CTS) ||
    fileName.endsWith(EXT_DMTS) ||
    fileName.endsWith(EXT_DCTS);
}

function hasPackageSubpathKeys(map: PackageJsonSubpathMap): boolean {
  return Object.keys(map).some(key => key === "." || key.startsWith("./"));
}

function findBestPackagePattern(patterns: readonly string[], candidate: string): string | undefined {
  for (const pattern of [...patterns].sort(comparePatternKeys)) {
    if (!pattern.includes("*")) continue;
    const parsed = parsePattern(pattern);
    if (patternMatches(parsed, candidate)) return pattern;
  }
  return undefined;
}

function getPackagePatternStar(pattern: string, candidate: string): string {
  const parsed = parsePattern(pattern);
  return getMatchedStar(parsed, candidate);
}

function packageSubpathFromStateName(state: ResolutionState, packageName: string | undefined): string {
  if (packageName === undefined || packageName === "") return ".";
  if (state.name === packageName) return ".";
  const prefix = `${packageName}/`;
  return state.name.startsWith(prefix) ? `./${state.name.slice(prefix.length)}` : ".";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasInvalidPackageTargetSegment(target: string): boolean {
  const parts = normalizePath(target).split("/");
  for (let index = 1; index < parts.length; index += 1) {
    const part = parts[index]!;
    if (part === "." || part === ".." || part === "node_modules") return true;
  }
  return false;
}

function loadModuleFromTypesVersions(
  state: ResolutionState,
  packageDirectory: string,
  packageJson: PackageJsonLike,
): ResolvedInternal | undefined {
  if (packageJson.typesVersions === undefined) return undefined;
  const selected = selectTypesVersion(packageJson.typesVersions);
  if (selected === undefined) return undefined;
  for (const [pattern, substitutions] of Object.entries(selected)) {
    const parsed = parsePattern(pattern);
    if (!patternMatches(parsed, state.name)) continue;
    const matchedStar = getMatchedStar(parsed, state.name);
    for (const substitution of substitutions) {
      const replaced = substitution.includes("*") ? substitution.replace("*", matchedStar) : substitution;
      const candidate = normalizePath(combinePaths(packageDirectory, replaced));
      const result = nodeLoadModuleByRelativeName(state, candidate, false);
      if (result !== undefined) return result;
    }
  }
  return undefined;
}

function selectTypesVersion(typesVersions: Record<string, Record<string, readonly string[]>>): Record<string, readonly string[]> | undefined {
  for (const [range, value] of Object.entries(typesVersions)) {
    void range;
    return value;
  }
  return undefined;
}

function withPackageJsonId(resolved: ResolvedInternal, packageJson: PackageJsonLike, packageDirectory: string): ResolvedInternal {
  resolved.packageId = {
    name: packageJson.name ?? packageDirectory.slice(packageDirectory.lastIndexOf("/") + 1),
    subModuleName: "",
    version: packageJson.version ?? "",
    peerDependencies: "",
  };
  return resolved;
}

function parsePattern(pattern: string): ParsedPattern {
  const index = pattern.indexOf("*");
  if (index < 0) return { prefix: pattern, suffix: "" };
  return { prefix: pattern.slice(0, index), suffix: pattern.slice(index + 1) };
}

function patternMatches(pattern: ParsedPattern, candidate: string): boolean {
  return candidate.startsWith(pattern.prefix) && candidate.endsWith(pattern.suffix);
}

function getMatchedStar(pattern: ParsedPattern, candidate: string): string {
  if (!patternMatches(pattern, candidate)) return "";
  return candidate.slice(pattern.prefix.length, candidate.length - pattern.suffix.length);
}

function loadModuleFromNearestNodeModulesDirectory(
  state: ResolutionState,
): ResolvedInternal | undefined {
  const priorityExtensions = state.extensions & (Extensions.TypeScript | Extensions.Declaration);
  const secondaryExtensions = state.extensions & ~(Extensions.TypeScript | Extensions.Declaration);
  if (priorityExtensions !== 0) {
    const result = withTemporaryExtensions(state, priorityExtensions, () => loadModuleFromNearestNodeModulesDirectoryWorker(state, false));
    if (result !== undefined) return result;
  }
  if (secondaryExtensions !== 0) {
    return withTemporaryExtensions(state, secondaryExtensions, () => loadModuleFromNearestNodeModulesDirectoryWorker(state, false));
  }
  return undefined;
}

function loadModuleFromNearestNodeModulesDirectoryWorker(
  state: ResolutionState,
  typesScopeOnly: boolean,
): ResolvedInternal | undefined {
  let directory: string | undefined = state.containingDirectory;
  while (directory !== undefined && directory !== "") {
    if (getBaseFileName(directory) === "node_modules") {
      const parent = getDirectoryPath(directory);
      if (parent === directory) break;
      directory = parent;
      continue;
    }
    const result = loadModuleFromImmediateNodeModulesDirectory(state, directory, typesScopeOnly);
    if (result !== undefined) return result;
    const parent = getDirectoryPath(directory);
    if (parent === directory) break;
    directory = parent;
  }
  return undefined;
}

function withTemporaryExtensions<T>(state: ResolutionState, extensions: Extensions, body: () => T): T {
  const saved = state.extensions;
  state.extensions = extensions;
  try {
    return body();
  } finally {
    state.extensions = saved;
  }
}

function loadModuleFromImmediateNodeModulesDirectory(
  state: ResolutionState,
  directory: string,
  typesScopeOnly: boolean,
): ResolvedInternal | undefined {
  const nodeModulesFolder = combinePaths(directory, "node_modules");
  if (!state.resolver.host.directoryExists(nodeModulesFolder)) {
    state.failedLookupLocations.push(nodeModulesFolder);
    return undefined;
  }
  if (!typesScopeOnly) {
    const result = loadModuleFromSpecificNodeModulesDirectory(state, state.name, nodeModulesFolder);
    if (result !== undefined) return result;
  }
  // Try `@types/foo` fallback for non-scoped names so type-only imports
  // resolve via DefinitelyTyped.
  if ((state.extensions & Extensions.Declaration) !== 0) {
    const atTypes = combinePaths(nodeModulesFolder, "@types");
    if (!state.resolver.host.directoryExists(atTypes)) {
      state.failedLookupLocations.push(atTypes);
      return undefined;
    }
    return loadModuleFromSpecificNodeModulesDirectory(state, mangleScopedPackageName(state.name), atTypes);
  }
  return undefined;
}

function loadModuleFromSpecificNodeModulesDirectory(
  state: ResolutionState,
  moduleName: string,
  nodeModulesFolder: string,
): ResolvedInternal | undefined {
  const [packageName, rest] = parsePackageName(moduleName);
  const packageDirectory = combinePaths(nodeModulesFolder, packageName);
  const candidate = rest === ""
    ? packageDirectory
    : combinePaths(packageDirectory, rest);

  // Mirrors TS-Go: the resolver records that it descended into a package
  // directory (a package.json was found) so resolveNodeLike's modern-Node
  // retry can fire for library imports that resolved to a JS file.
  if (state.resolver.host.fileExists(combinePaths(packageDirectory, "package.json"))) {
    state.resolvedPackageDirectory = true;
  }

  if ((state.features & NodeResolutionFeatures.Exports) !== 0) {
    const packageJson = readPackageJson(state, combinePaths(packageDirectory, "package.json"));
    if (packageJson !== undefined) {
      state.affectingLocations.push(combinePaths(packageDirectory, "package.json"));
      const subpath = rest === "" ? "." : `./${rest}`;
      const target = resolvePackageTargetFromExports(packageJson.exports, subpath, state.conditions);
      if (target !== undefined) {
        const exported = loadPackageTarget(state, packageDirectory, target);
        if (exported !== undefined) {
          return withPackageJsonId(exported, packageJson, packageDirectory);
        }
      }
      if (packageJson.exports !== undefined && packageJson.exports !== null) return undefined;
    }
  }

  // First try file lookup (e.g. node_modules/foo.ts).
  const asFile = loadModuleFromFile(state, candidate);
  if (asFile !== undefined) {
    setPackageId(asFile, state, packageName, rest, nodeModulesFolder);
    return asFile;
  }

  // Then try directory + index lookup.
  if (state.resolver.host.directoryExists(candidate)) {
    const asDir = loadNodeModuleFromDirectory(state, candidate, true);
    if (asDir !== undefined) {
      setPackageId(asDir, state, packageName, rest, nodeModulesFolder);
      return asDir;
    }
  }
  return undefined;
}

function setPackageId(
  resolved: ResolvedInternal,
  _state: ResolutionState,
  packageName: string,
  subPath: string,
  nodeModulesFolder: string,
): void {
  // Real implementation reads version from package.json. Without
  // packagejson port, we synthesize a minimal PackageId so callers
  // that care about identity (e.g. modulespecifiers) can group by it.
  void nodeModulesFolder;
  resolved.packageId = {
    name: packageName,
    subModuleName: subPath,
    version: "",
    peerDependencies: "",
  };
}

function getPackageIdForResolved(
  state: ResolutionState,
  resolvedPath: string,
  packageDirectory: string,
): PackageId {
  // Same minimal synthesis. Real impl reads package.json `name` +
  // `version`; until that lands, derive name from package directory.
  void state; void resolvedPath;
  const name = packageDirectory.slice(packageDirectory.lastIndexOf("node_modules/") + "node_modules/".length);
  return { name, subModuleName: "", version: "", peerDependencies: "" };
}

// ---------------------------------------------------------------------------
// ParsedPatterns — supports compilerOptions.paths lookup
// ---------------------------------------------------------------------------

export interface ParsedPattern {
  prefix: string;
  suffix: string;
}

export interface ParsedPatterns {
  matchableStringSet: ReadonlySet<string>;
  patterns: readonly ParsedPattern[];
}

export function parsePatterns(paths: ReadonlyMap<string, readonly string[]>): ParsedPatterns {
  const matchableStrings = new Set<string>();
  const patterns: ParsedPattern[] = [];
  for (const path of paths.keys()) {
    const indexOfStar = path.indexOf("*");
    if (indexOfStar < 0) {
      matchableStrings.add(path);
    } else if (indexOfStar !== path.length - 1) {
      patterns.push({ prefix: path.slice(0, indexOfStar), suffix: path.slice(indexOfStar + 1) });
    } else {
      patterns.push({ prefix: path.slice(0, indexOfStar), suffix: "" });
    }
  }
  return { matchableStringSet: matchableStrings, patterns };
}

export function findBestPatternMatch(
  values: readonly ParsedPattern[],
  candidate: string,
): ParsedPattern | undefined {
  let matchedValue: ParsedPattern | undefined;
  let longestMatchPrefixLength = -1;
  for (const v of values) {
    if (
      v.prefix.length > longestMatchPrefixLength &&
      candidate.startsWith(v.prefix) &&
      candidate.endsWith(v.suffix)
    ) {
      longestMatchPrefixLength = v.prefix.length;
      matchedValue = v;
    }
  }
  return matchedValue;
}

// ---------------------------------------------------------------------------
// TS-Go `ParsedPatterns` — the canonical core.Pattern-backed representation of
// `compilerOptions.paths` (and `typesVersions` path maps). Mirrors
// internal/module/resolver.go `ParsedPatterns`, `TryParsePatterns`,
// `MatchPatternOrExact`, and `matchesPatternWithTrailer`.
// ---------------------------------------------------------------------------

export interface ParsedPatternsCore {
  readonly matchableStringSet: ReadonlySet<string>;
  readonly patterns: readonly Pattern[];
}

/** Mirrors TS-Go `TryParsePatterns`. */
export function tryParsePatterns(pathMappings: ReadonlyMap<string, readonly string[]>): ParsedPatternsCore {
  const matchableStringSet = new Set<string>();
  const patterns: Pattern[] = [];
  for (const path of pathMappings.keys()) {
    const pattern = tryParsePattern(path);
    if (patternIsValid(pattern)) {
      if (pattern.starIndex === -1) {
        matchableStringSet.add(path);
      } else {
        patterns.push(pattern);
      }
    }
  }
  return { matchableStringSet, patterns };
}

/** Mirrors TS-Go `MatchPatternOrExact`. */
export function matchPatternOrExact(patterns: ParsedPatternsCore, candidate: string): Pattern {
  if (patterns.matchableStringSet.has(candidate)) {
    return { text: candidate, starIndex: -1 };
  }
  if (patterns.patterns.length === 0) {
    return { text: "", starIndex: 0 };
  }
  return coreFindBestPatternMatch(patterns.patterns, (p) => p, candidate) ?? { text: "", starIndex: 0 };
}

/**
 * Mirrors TS-Go `(*resolutionState).getMatchedStarForPatternEntrypoint`.
 * Matches `file` against an `exports` pattern's `leadingSlice`/`trailingSlice`,
 * also trying the file's JS-output extension so a `.d.ts` on disk can satisfy a
 * `.js` pattern. Returns `[matchedStar, true]` on a match.
 */
function getMatchedStarForPatternEntrypoint(
  state: ResolutionState,
  file: string,
  leadingSlice: string,
  trailingSlice: string,
  caseSensitive: boolean,
): readonly [string, boolean] {
  if (hasPrefixAndSuffixWithoutOverlap(file, leadingSlice, trailingSlice, caseSensitive)) {
    return [file.slice(leadingSlice.length, file.length - trailingSlice.length), true];
  }
  const jsExtension = tryGetJSExtensionForFile(file, state.compilerOptions.jsx);
  if (jsExtension.length > 0) {
    const swapped = changeFullExtension(file, jsExtension);
    if (hasPrefixAndSuffixWithoutOverlap(swapped, leadingSlice, trailingSlice, caseSensitive)) {
      return [swapped.slice(leadingSlice.length, swapped.length - trailingSlice.length), true];
    }
  }
  return ["", false];
}

/** Mirrors TS-Go `matchesPatternWithTrailer`. */
function matchesPatternWithTrailer(target: string, name: string): boolean {
  if (target.endsWith("*")) {
    return false;
  }
  const starIndex = target.indexOf("*");
  if (starIndex === -1) {
    return false;
  }
  const before = target.slice(0, starIndex);
  const after = target.slice(starIndex + 1);
  return name.startsWith(before) && name.endsWith(after);
}

/** True if `extension` is one of the supported `extensions`. Mirrors TS-Go `extensionIsOk`. */
function extensionIsOk(extensions: Extensions, extension: string): boolean {
  return (
    ((extensions & Extensions.JavaScript) !== 0 &&
      (extension === extensionJs || extension === extensionJsx || extension === extensionMjs || extension === extensionCjs)) ||
    ((extensions & Extensions.TypeScript) !== 0 &&
      (extension === extensionTs || extension === extensionTsx || extension === extensionMts || extension === extensionCts)) ||
    ((extensions & Extensions.Declaration) !== 0 &&
      (extension === extensionDts || extension === extensionDmts || extension === extensionDcts)) ||
    ((extensions & Extensions.Json) !== 0 && extension === extensionJson)
  );
}

// ---------------------------------------------------------------------------
// External-name predicates
// ---------------------------------------------------------------------------

export function isExternalModuleNameRelative(moduleName: string): boolean {
  return (
    moduleName.startsWith("./") ||
    moduleName.startsWith("../") ||
    moduleName === "." ||
    moduleName === ".." ||
    moduleName.startsWith("/")
  );
}

export function moduleHasNonRelativeName(moduleName: string): boolean {
  return !isExternalModuleNameRelative(moduleName);
}

export function getAutomaticTypeDirectiveNames(
  options: CompilerOptions,
  host: ResolverHost,
): readonly string[] {
  const explicitTypes = options.types;
  if (explicitTypes !== undefined && !explicitTypes.includes("*")) return explicitTypes;
  const wildcardMatches = discoverWildcardTypeDirectiveNames(options, host);
  if (explicitTypes === undefined) return wildcardMatches;
  const result: string[] = [];
  for (const typeName of explicitTypes) {
    if (typeName === "*") {
      result.push(...wildcardMatches);
    } else {
      result.push(typeName);
    }
  }
  return deduplicateStrings(result);
}

export function resolveConfig(
  moduleName: string,
  containingFile: string,
  host: ResolverHost,
): ResolvedModule | undefined {
  const resolver = new Resolver(
    host,
    { moduleResolution: MRK.NodeNext },
    undefined,
    undefined,
    undefined,
  );
  return resolver.resolveConfig(moduleName, containingFile);
}

export function packageIdToString(packageId: PackageId | undefined): string {
  if (packageId === undefined || packageId.name === "") return "";
  const packageName = packageId.subModuleName === ""
    ? packageId.name
    : `${packageId.name}/${packageId.subModuleName}`;
  return `${packageName}@${packageId.version}${packageId.peerDependencies}`;
}

export function moduleSpecifierHasPackageName(moduleName: string): boolean {
  if (isExternalModuleNameRelative(moduleName) || moduleName.startsWith("#")) return false;
  const [packageName] = parsePackageName(moduleName);
  return packageName !== "";
}

export function getPackageNameOfModuleSpecifier(moduleName: string): string {
  if (!moduleSpecifierHasPackageName(moduleName)) return "";
  const [packageName] = parsePackageName(moduleName);
  return packageName;
}

export function getSubpathOfModuleSpecifier(moduleName: string): string {
  if (!moduleSpecifierHasPackageName(moduleName)) return "";
  const [, rest] = parsePackageName(moduleName);
  return rest;
}

function discoverWildcardTypeDirectiveNames(
  options: CompilerOptions,
  host: ResolverHost,
): readonly string[] {
  const { typeRoots } = getEffectiveTypeRoots(options, host.getCurrentDirectory());
  const matches: string[] = [];
  for (const root of typeRoots) {
    if (!host.directoryExists(root)) continue;
    const entries = host.getAccessibleEntries(root);
    for (const directory of entries.directories) {
      if (directory.startsWith(".")) continue;
      if (isNotNeededTypePackage(host, combinePaths(root, directory))) continue;
      matches.push(directory);
    }
  }
  return deduplicateStrings(matches);
}

function isNotNeededTypePackage(host: ResolverHost, packageDirectory: string): boolean {
  const packageJsonPath = combinePaths(packageDirectory, "package.json");
  if (!host.fileExists(packageJsonPath)) return false;
  const text = host.readFile(packageJsonPath);
  if (text === undefined) return false;
  try {
    const parsed = JSON.parse(text) as { typings?: unknown; types?: unknown };
    return parsed.typings === null || parsed.types === null;
  } catch {
    return false;
  }
}

function deduplicateStrings(values: readonly string[]): readonly string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    if (seen.has(value)) continue;
    seen.add(value);
    result.push(value);
  }
  return result;
}

// Re-export package-helper functions used by downstream modules.
export { mangleScopedPackageName };
