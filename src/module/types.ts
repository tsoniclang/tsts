/**
 * Module resolution types.
 *
 * Port of TS-Go internal/module/types.go.
 *
 * Defines the data shapes that flow through module resolution. The
 * resolver itself (resolver.go, ~2363 LOC) is forthcoming — it depends
 * on the active AST and CompilerOptions which aren't yet ported.
 */

import type { FS } from "../vfs/index.js";

/**
 * Host providing FS access and current-directory awareness to the
 * resolver. Mirrors TS-Go's ResolutionHost interface.
 */
export interface ResolutionHost {
  fs(): FS;
  getCurrentDirectory(): string;
}

/**
 * Resolution mode: Node10 (legacy), Node16, NodeNext, Bundler.
 *
 * Currently `unknown` placeholder — will be the ResolutionMode enum
 * from `core` once CompilerOptions is ported.
 */
export type ResolutionMode = number;

/** Cache key including resolution mode (since the same import name may resolve differently per mode). */
export interface ModeAwareCacheKey {
  readonly name: string;
  readonly mode: ResolutionMode;
}

/**
 * Reference to another resolved project (for project references).
 */
export interface ResolvedProjectReference {
  configName(): string;
  compilerOptions(): unknown;  // CompilerOptions placeholder
}

/**
 * Bit flags for Node-resolution features enabled by a given resolution
 * mode. Mirrors TS-Go's NodeResolutionFeatures.
 */
export enum NodeResolutionFeatures {
  None = 0,
  Imports = 1 << 0,
  SelfName = 1 << 1,
  Exports = 1 << 2,
  ExportsPatternTrailers = 1 << 3,
  /**
   * Allows `#/` root imports in package.json `imports` field.
   * Not yet supported widely; see nodejs/node#60864.
   */
  ImportsPatternRoot = 1 << 4,

  All = Imports | SelfName | Exports | ExportsPatternTrailers | ImportsPatternRoot,
  Node16Default = Imports | SelfName | Exports | ExportsPatternTrailers,
  NodeNextDefault = All,
  BundlerDefault = Imports | SelfName | Exports | ExportsPatternTrailers | ImportsPatternRoot,
}

/**
 * Identifies a module by its package, sub-path, version, and peer deps.
 */
export interface PackageId {
  readonly name: string;
  readonly subModuleName: string;
  readonly version: string;
  readonly peerDependencies: string;
}

export function packageIdToString(p: PackageId): string {
  return `${packageName(p)}@${p.version}${p.peerDependencies}`;
}

export function packageName(p: PackageId): string {
  return p.subModuleName !== "" ? `${p.name}/${p.subModuleName}` : p.name;
}

/**
 * Result of resolving a module import.
 */
export interface ResolvedModule {
  readonly resolutionDiagnostics: readonly unknown[];   // AST diagnostics; placeholder
  readonly resolvedFileName: string;
  readonly originalPath: string;
  readonly extension: string;
  readonly resolvedUsingTsExtension: boolean;
  readonly packageId: PackageId;
  readonly isExternalLibraryImport: boolean;
  readonly alternateResult: string;
}

export function isResolved(m: ResolvedModule | undefined): m is ResolvedModule {
  return m !== undefined && m.resolvedFileName !== "";
}

/**
 * Result of resolving a `/// <reference types="...">` directive or
 * an entry in `types`/`typeRoots`.
 */
export interface ResolvedTypeReferenceDirective {
  readonly resolutionDiagnostics: readonly unknown[];
  readonly primary: boolean;
  readonly resolvedFileName: string;
  readonly originalPath: string;
  readonly packageId: PackageId;
  readonly isExternalLibraryImport: boolean;
}

export function isResolvedTypeRef(r: ResolvedTypeReferenceDirective | undefined): r is ResolvedTypeReferenceDirective {
  return r !== undefined && r.resolvedFileName !== "";
}

/**
 * Bit flags for which extensions the resolver should look for during
 * each pass.
 */
export enum ResolutionExtensions {
  TypeScript = 1 << 0,
  JavaScript = 1 << 1,
  Declaration = 1 << 2,
  Json = 1 << 3,

  ImplementationFiles = TypeScript | JavaScript,
  TsTypings = TypeScript | Declaration,
  All = TypeScript | JavaScript | Declaration | Json,
}
