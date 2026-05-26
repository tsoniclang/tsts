/**
 * Module resolution caches.
 *
 * Port of TS-Go `internal/module/cache.go` (79 LoC).
 */

import type { ResolvedModule, ResolvedTypeReferenceDirective, ResolvedProjectReference, ParsedPatterns, ResolutionMode } from "./resolver.js";
import { InfoCache as PackageJsonInfoCache } from "../packagejson/cache.js";
import type { CompilerOptions } from "../core/compileroptions.js";

interface ModuleResolutionCacheKey {
  containingDirectory: string;
  moduleName: string;
  resolutionMode: ResolutionMode | undefined;
  redirectConfigName: string;
}

interface TypeRefDirectiveResolutionCacheKey {
  containingDirectory: string;
  typeReferenceName: string;
  resolutionMode: ResolutionMode | undefined;
  redirectConfigName: string;
  fromInferredTypesContainingFile: boolean;
}

export interface ModeAwareCache<T> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
}

function keyToString<T extends { [k: string]: unknown }>(key: T): string {
  return JSON.stringify(key);
}

export class ModuleResolutionCache {
  private readonly cache = new Map<string, ResolvedModule>();

  get(key: ModuleResolutionCacheKey): ResolvedModule | undefined {
    return this.cache.get(keyToString(key));
  }
  set(key: ModuleResolutionCacheKey, value: ResolvedModule): void {
    this.cache.set(keyToString(key), value);
  }
}

export class TypeRefDirectiveResolutionCache {
  private readonly cache = new Map<string, ResolvedTypeReferenceDirective>();

  get(key: TypeRefDirectiveResolutionCacheKey): ResolvedTypeReferenceDirective | undefined {
    return this.cache.get(keyToString(key));
  }
  set(key: TypeRefDirectiveResolutionCacheKey, value: ResolvedTypeReferenceDirective): void {
    this.cache.set(keyToString(key), value);
  }
}

export interface Caches {
  packageJsonInfoCache: PackageJsonInfoCache;
  moduleResolutionCache: ModuleResolutionCache;
  typeRefDirectiveResolutionCache: TypeRefDirectiveResolutionCache;
  parsedPatternsForPaths?: ParsedPatterns;
}

export function newCaches(
  currentDirectory: string,
  useCaseSensitiveFileNames: boolean,
  options: CompilerOptions,
): Caches {
  void options;
  return {
    packageJsonInfoCache: new PackageJsonInfoCache(currentDirectory, useCaseSensitiveFileNames),
    moduleResolutionCache: new ModuleResolutionCache(),
    typeRefDirectiveResolutionCache: new TypeRefDirectiveResolutionCache(),
  };
}

export function getRedirectConfigName(redirect: ResolvedProjectReference | undefined): string {
  if (redirect === undefined) return "";
  return redirect.configFileName;
}
