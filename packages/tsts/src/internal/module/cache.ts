import type { bool } from "../../go/scalars.js";
import { GoBooleanKey, GoNumberKey, GoStringKey, GoStructField, GoStructKey, GoZeroPointer, type GoInterface, type GoMap, type GoPtr } from "../../go/compat.js";
import { Map, Once } from "../../go/sync.js";
import type { SyncMap } from "../collections/syncmap.js";
import { SyncMap_Load, SyncMap_LoadOrStore, SyncMap_Store } from "../collections/syncmap.js";
import type { CompilerOptions, ResolutionMode } from "../core/compileroptions.js";
import type { InfoCache } from "../packagejson/cache.js";
import { NewInfoCache } from "../packagejson/cache.js";
import type { ParsedPatterns } from "./resolver.js";
import type { ModeAwareCacheKey, ResolvedModule, ResolvedProjectReference, ResolvedTypeReferenceDirective } from "./types.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/cache.go::type::ModeAwareCache","kind":"type","status":"implemented","sigHash":"95650572f07c5e6811559dad8f16d68eb9e940101c53fea75e641d6adc247922"}
 *
 * Go source:
 * ModeAwareCache[T any] map[ModeAwareCacheKey]T
 */
export type ModeAwareCache<T> = GoMap<ModeAwareCacheKey, T>;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/cache.go::type::moduleResolutionCacheKey","kind":"type","status":"implemented","sigHash":"cbb92ff37ce938b2d50ea24f3016fb25bf89d2cbe5e703d89db31479364a79d5"}
 *
 * Go source:
 * moduleResolutionCacheKey struct {
 * 	containingDirectory string
 * 	moduleName          string
 * 	resolutionMode      core.ResolutionMode
 * 	redirectConfigName  string
 * }
 */
export interface moduleResolutionCacheKey {
  containingDirectory: string;
  moduleName: string;
  resolutionMode: ResolutionMode;
  redirectConfigName: string;
}

const moduleResolutionCacheKeyDescriptor = GoStructKey<moduleResolutionCacheKey, readonly [string, string, ResolutionMode, string]>(
  [
    GoStructField((value) => value.containingDirectory, GoStringKey),
    GoStructField((value) => value.moduleName, GoStringKey),
    GoStructField((value) => value.resolutionMode, GoNumberKey),
    GoStructField((value) => value.redirectConfigName, GoStringKey),
  ],
  ([containingDirectory, moduleName, resolutionMode, redirectConfigName]) => ({ containingDirectory, moduleName, resolutionMode, redirectConfigName }),
);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/cache.go::type::moduleResolutionCache","kind":"type","status":"implemented","sigHash":"66cde73c5c4cf5575efeb5988afcd9bef9987b0d9fec3c6f8a3169a97cae8170"}
 *
 * Go source:
 * moduleResolutionCache struct {
 * 	cache collections.SyncMap[moduleResolutionCacheKey, *ResolvedModule]
 * }
 */
export interface moduleResolutionCache {
  cache: SyncMap<moduleResolutionCacheKey, GoPtr<ResolvedModule>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/cache.go::method::moduleResolutionCache.Get","kind":"method","status":"implemented","sigHash":"d3e2923c1615b89358992c51f5e2505b58219f435d49e06062686de2082c268b"}
 *
 * Go source:
 * func (c *moduleResolutionCache) Get(key moduleResolutionCacheKey) (*ResolvedModule, bool) {
 * 	return c.cache.Load(key)
 * }
 */
export function moduleResolutionCache_Get(receiver: GoPtr<moduleResolutionCache>, key: moduleResolutionCacheKey): [GoPtr<ResolvedModule>, bool] {
  return SyncMap_Load(receiver!.cache, key, GoZeroPointer<ResolvedModule>, moduleResolutionCacheKeyDescriptor);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/cache.go::method::moduleResolutionCache.Set","kind":"method","status":"implemented","sigHash":"e06f4591536431344b2f2372edf63bd6fd38978018999a1d176025a05e091cc8"}
 *
 * Go source:
 * func (c *moduleResolutionCache) Set(key moduleResolutionCacheKey, value *ResolvedModule) {
 * 	c.cache.LoadOrStore(key, value)
 * }
 */
export function moduleResolutionCache_Set(receiver: GoPtr<moduleResolutionCache>, key: moduleResolutionCacheKey, value: GoPtr<ResolvedModule>): void {
  SyncMap_LoadOrStore(receiver!.cache, key, value, GoZeroPointer<ResolvedModule>, moduleResolutionCacheKeyDescriptor);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/cache.go::type::typeRefDirectiveResolutionCacheKey","kind":"type","status":"implemented","sigHash":"7de5c33a9b2c3893f2185bfce2aa8734601d9fe7acbf76882973a5782eae49cf"}
 *
 * Go source:
 * typeRefDirectiveResolutionCacheKey struct {
 * 	containingDirectory             string
 * 	typeReferenceName               string
 * 	resolutionMode                  core.ResolutionMode
 * 	redirectConfigName              string
 * 	fromInferredTypesContainingFile bool
 * }
 */
export interface typeRefDirectiveResolutionCacheKey {
  containingDirectory: string;
  typeReferenceName: string;
  resolutionMode: ResolutionMode;
  redirectConfigName: string;
  fromInferredTypesContainingFile: bool;
}

const typeRefDirectiveResolutionCacheKeyDescriptor = GoStructKey<typeRefDirectiveResolutionCacheKey, readonly [string, string, ResolutionMode, string, bool]>(
  [
    GoStructField((value) => value.containingDirectory, GoStringKey),
    GoStructField((value) => value.typeReferenceName, GoStringKey),
    GoStructField((value) => value.resolutionMode, GoNumberKey),
    GoStructField((value) => value.redirectConfigName, GoStringKey),
    GoStructField((value) => value.fromInferredTypesContainingFile, GoBooleanKey),
  ],
  ([containingDirectory, typeReferenceName, resolutionMode, redirectConfigName, fromInferredTypesContainingFile]) => ({ containingDirectory, typeReferenceName, resolutionMode, redirectConfigName, fromInferredTypesContainingFile }),
);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/cache.go::type::typeRefDirectiveResolutionCache","kind":"type","status":"implemented","sigHash":"bef38d55f610311801f058fd12ad8fad2d28e6ea9c7f500e398707857d187dbc"}
 *
 * Go source:
 * typeRefDirectiveResolutionCache struct {
 * 	cache collections.SyncMap[typeRefDirectiveResolutionCacheKey, *ResolvedTypeReferenceDirective]
 * }
 */
export interface typeRefDirectiveResolutionCache {
  cache: SyncMap<typeRefDirectiveResolutionCacheKey, GoPtr<ResolvedTypeReferenceDirective>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/cache.go::method::typeRefDirectiveResolutionCache.Get","kind":"method","status":"implemented","sigHash":"c7ba3965585e90fd056502af18e8e8ec5c86e305ff6d7cf845a369c37ef28b45"}
 *
 * Go source:
 * func (c *typeRefDirectiveResolutionCache) Get(key typeRefDirectiveResolutionCacheKey) (*ResolvedTypeReferenceDirective, bool) {
 * 	return c.cache.Load(key)
 * }
 */
export function typeRefDirectiveResolutionCache_Get(receiver: GoPtr<typeRefDirectiveResolutionCache>, key: typeRefDirectiveResolutionCacheKey): [GoPtr<ResolvedTypeReferenceDirective>, bool] {
  return SyncMap_Load(receiver!.cache, key, GoZeroPointer<ResolvedTypeReferenceDirective>, typeRefDirectiveResolutionCacheKeyDescriptor);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/cache.go::method::typeRefDirectiveResolutionCache.Set","kind":"method","status":"implemented","sigHash":"9633cc28aa0ecc82cd4d7b3fcddbf46663e21a236495c7fc3a1a71d26f1b75b8"}
 *
 * Go source:
 * func (c *typeRefDirectiveResolutionCache) Set(key typeRefDirectiveResolutionCacheKey, value *ResolvedTypeReferenceDirective) {
 * 	c.cache.Store(key, value)
 * }
 */
export function typeRefDirectiveResolutionCache_Set(receiver: GoPtr<typeRefDirectiveResolutionCache>, key: typeRefDirectiveResolutionCacheKey, value: GoPtr<ResolvedTypeReferenceDirective>): void {
  SyncMap_Store(receiver!.cache, key, value, typeRefDirectiveResolutionCacheKeyDescriptor);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/cache.go::type::caches","kind":"type","status":"implemented","sigHash":"27790d4369371517c63e0e2f89cd63a7c51d9b758a1e5b7e71ac232832b76778"}
 *
 * Go source:
 * caches struct {
 * 	packageJsonInfoCache *packagejson.InfoCache
 * 
 * 	moduleResolutionCache           moduleResolutionCache
 * 	typeRefDirectiveResolutionCache typeRefDirectiveResolutionCache
 * 
 * 	// Cached representation for `core.CompilerOptions.paths`.
 * 	// Doesn't handle other path patterns like in `typesVersions`.
 * 	parsedPatternsForPathsOnce sync.Once
 * 	parsedPatternsForPaths     *ParsedPatterns
 * }
 */
export interface caches {
  packageJsonInfoCache: GoPtr<InfoCache>;
  moduleResolutionCache: moduleResolutionCache;
  typeRefDirectiveResolutionCache: typeRefDirectiveResolutionCache;
  parsedPatternsForPathsOnce: Once;
  parsedPatternsForPaths: GoPtr<ParsedPatterns>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/cache.go::func::newCaches","kind":"func","status":"implemented","sigHash":"ed7e5bbac1fdd252c9985c4c1c91f9a0573d2204c422b5b757ca6aa9e903bb8a"}
 *
 * Go source:
 * func newCaches(
 * 	currentDirectory string,
 * 	useCaseSensitiveFileNames bool,
 * 	options *core.CompilerOptions,
 * ) caches {
 * 	return caches{
 * 		packageJsonInfoCache: packagejson.NewInfoCache(currentDirectory, useCaseSensitiveFileNames),
 * 	}
 * }
 */
export function newCaches(currentDirectory: string, useCaseSensitiveFileNames: bool, options: GoPtr<CompilerOptions>): caches {
  return {
    packageJsonInfoCache: NewInfoCache(currentDirectory, useCaseSensitiveFileNames),
    moduleResolutionCache: { cache: { __tsgoBlank0: [], __tsgoBlank1: [], m: new Map() } },
    typeRefDirectiveResolutionCache: { cache: { __tsgoBlank0: [], __tsgoBlank1: [], m: new Map() } },
    parsedPatternsForPathsOnce: new Once(),
    parsedPatternsForPaths: undefined,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/cache.go::func::getRedirectConfigName","kind":"func","status":"implemented","sigHash":"c73d7d1d07689bf4be9d6b7d7a67ec3d31f4fd31ef272958e8aee9233f4d9aa2"}
 *
 * Go source:
 * func getRedirectConfigName(redirect ResolvedProjectReference) string {
 * 	if redirect == nil {
 * 		return ""
 * 	}
 * 	return redirect.ConfigName()
 * }
 */
export function getRedirectConfigName(redirect: GoInterface<ResolvedProjectReference>): string {
  if (redirect === undefined) {
    return "";
  }
  return redirect.ConfigName();
}
