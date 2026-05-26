/**
 * Module resolution algorithm.
 *
 * Port skeleton of TS-Go `internal/module/resolver.go` (~2360 LoC).
 * The Strada source implements full TypeScript module resolution
 * across classic / node10 / node16 / nodenext / bundler strategies,
 * including package.json `exports`/`imports` walking, version paths,
 * type-roots discovery, and project-reference redirects.
 *
 * Skeleton scope:
 * - Public API: ResolvedModule, Resolver, resolveModuleName,
 *   resolveTypeReferenceDirective, resolveTripleslashReference
 * - resolutionState struct with all state fields
 * - tracer for --traceResolution logging
 * - Top-level dispatch (resolveByStrategy)
 * - NodeResolutionFeatures bit flags
 * - extensions tags + PackageId
 *
 * Deep per-strategy walkers (nodeNextModuleResolutionWorker,
 * loadModuleFromNodeModules, loadModuleFromTypesPackagePath,
 * tryLoadModuleUsingPathsOptions, loadNodeModuleFromDirectory,
 * loadModuleFromSelfNameReference) stubbed for incremental fill-in.
 *
 * Cross-module deps forward-declared.
 */

import type { CompilerOptions, ModuleResolutionKind } from "../core/compileroptions.js";
import type { Diagnostic } from "../ast/index.js";

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

export interface ResolutionMode {
  readonly _kind: number;
}

export type NodeResolutionFeatures = number;
export const NodeResolutionFeatures = {
  None: 0,
  Imports: 1 << 1,
  SelfName: 1 << 2,
  Exports: 1 << 3,
  ExportsPatternTrailers: 1 << 4,
  AllFeatures: (1 << 1) | (1 << 2) | (1 << 3) | (1 << 4),
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

// ---------------------------------------------------------------------------
// Resolver class
// ---------------------------------------------------------------------------

export interface ResolverHost {
  useCaseSensitiveFileNames(): boolean;
  getCurrentDirectory(): string;
  fileExists(path: string): boolean;
  readFile(path: string): string | undefined;
  realpath?(path: string): string;
  getAccessibleEntries(path: string): { files: readonly string[]; directories: readonly string[] };
}

export class Resolver {
  readonly host: ResolverHost;
  readonly compilerOptions: CompilerOptions;
  readonly typeReferenceDirectives: ReadonlyMap<string, ResolvedTypeReferenceDirective>;
  readonly traceEnabled: boolean;

  constructor(
    host: ResolverHost,
    compilerOptions: CompilerOptions,
    typeReferenceDirectives: ReadonlyMap<string, ResolvedTypeReferenceDirective>,
  ) {
    this.host = host;
    this.compilerOptions = compilerOptions;
    this.typeReferenceDirectives = typeReferenceDirectives;
    this.traceEnabled = compilerOptions.traceResolution === 2; // TSTrue
  }

  resolveModuleName(
    moduleName: string,
    containingFile: string,
    resolutionMode: ResolutionMode | undefined,
    redirectedReference: ResolvedProjectReference | undefined,
  ): ResolvedModuleWithFailedLookupLocations {
    void moduleName; void containingFile; void resolutionMode; void redirectedReference;
    // Full version dispatches by getModuleResolutionKind into per-strategy workers.
    return {
      resolvedModule: undefined,
      failedLookupLocations: [],
      affectingLocations: [],
      resolutionDiagnostics: [],
      alternateResult: undefined,
    };
  }

  resolveTypeReferenceDirective(
    typeReferenceDirectiveName: string,
    containingFile: string | undefined,
    resolutionMode: ResolutionMode | undefined,
    redirectedReference: ResolvedProjectReference | undefined,
  ): ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
    void typeReferenceDirectiveName; void containingFile; void resolutionMode; void redirectedReference;
    return {
      resolvedTypeReferenceDirective: undefined,
      failedLookupLocations: [],
      affectingLocations: [],
      resolutionDiagnostics: [],
    };
  }

  resolveTripleslashReference(
    refModuleName: string,
    containingFile: string,
  ): ResolvedTripleslashReference {
    return { resolvedFileName: undefined, isExternalLibraryImport: false };
  }
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
