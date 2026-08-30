import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CompilerOptions as CompilerOptions__from_core, ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { InfoCache as InfoCache__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import type { ParsedPatterns } from "./resolver.js";
import type { ModeAwareCacheKey, ResolvedModule, ResolvedProjectReference, ResolvedTypeReferenceDirective } from "./types.js";
import type * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { NewInfoCache as NewInfoCache__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import { SyncMap$Load$Named___go_module$moduleResolutionCacheKey$PointerTo_Named___go_module$ResolvedModule, SyncMap$Load$Named___go_module$typeRefDirectiveResolutionCacheKey$PointerTo_Named___go_module$ResolvedTypeReferenceDirective } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named___go_module$moduleResolutionCacheKey$PointerTo_Named___go_module$ResolvedModule } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { SyncMap$Store$Named___go_module$typeRefDirectiveResolutionCacheKey$PointerTo_Named___go_module$ResolvedTypeReferenceDirective } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class ModeAwareCache<T> {
    declare private readonly $goType: void;
    constructor(public readonly $value: GoMapValue<ModeAwareCacheKey, T>) {
    }
    declare private readonly then?: never;
}
export type moduleResolutionCacheKey$Storage = {
    containingDirectory: gostring;
    moduleName: gostring;
    resolutionMode: int32;
    redirectConfigName: gostring;
};
export class moduleResolutionCacheKey implements GoContainerStoredValue<moduleResolutionCacheKey$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: moduleResolutionCacheKey$Storage) {
    }
    public static $storageOf($source: moduleResolutionCacheKey): moduleResolutionCacheKey$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: moduleResolutionCacheKey$Storage): moduleResolutionCacheKey {
        return new moduleResolutionCacheKey($source);
    }
    public get containingDirectory(): gostring {
        return this.$storage.containingDirectory;
    }
    public set containingDirectory($value: gostring) {
        this.$storage.containingDirectory = $value;
    }
    public get moduleName(): gostring {
        return this.$storage.moduleName;
    }
    public set moduleName($value: gostring) {
        this.$storage.moduleName = $value;
    }
    public get resolutionMode(): ModuleKind__from_core {
        return this.$storage.resolutionMode;
    }
    public set resolutionMode($value: ModuleKind__from_core) {
        this.$storage.resolutionMode = $value;
    }
    public get redirectConfigName(): gostring {
        return this.$storage.redirectConfigName;
    }
    public set redirectConfigName($value: gostring) {
        this.$storage.redirectConfigName = $value;
    }
    declare readonly [$goContainerStorageType]: moduleResolutionCacheKey$Storage;
    static $copy($source: moduleResolutionCacheKey): moduleResolutionCacheKey {
        return new moduleResolutionCacheKey({
            containingDirectory: $source.$storage.containingDirectory,
            moduleName: $source.$storage.moduleName,
            resolutionMode: $source.$storage.resolutionMode,
            redirectConfigName: $source.$storage.redirectConfigName
        });
    }
    static $equal($left: moduleResolutionCacheKey, $right: moduleResolutionCacheKey): bool {
        return $left.$storage.containingDirectory === $right.$storage.containingDirectory && $left.$storage.moduleName === $right.$storage.moduleName && $left.$storage.resolutionMode === $right.$storage.resolutionMode && $left.$storage.redirectConfigName === $right.$storage.redirectConfigName;
    }
    static $hash($source: moduleResolutionCacheKey): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.containingDirectory));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.moduleName));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.resolutionMode));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.redirectConfigName));
        return $hash;
    }
    declare private readonly then?: never;
}
export class moduleResolutionCache {
    declare private readonly $goType: void;
    public constructor(public cache: SyncMap__from_collections<moduleResolutionCacheKey, ResolvedModule | undefined>) {
    }
    static $zero(): moduleResolutionCache {
        return new moduleResolutionCache(SyncMap__from_collections.$zero<moduleResolutionCacheKey, ResolvedModule | undefined>());
    }
    static $copy($source: moduleResolutionCache): moduleResolutionCache {
        return new moduleResolutionCache(SyncMap__from_collections.$copy<moduleResolutionCacheKey, ResolvedModule | undefined>($source.cache));
    }
    declare private readonly then?: never;
    static Get(c: tsonicTypeScriptRuntime.Location<moduleResolutionCache> | undefined, key: moduleResolutionCacheKey): [
        ResolvedModule | undefined,
        bool
    ] {
        const __gotots_store_0 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<moduleResolutionCache>).value;
        return SyncMap$Load$Named___go_module$moduleResolutionCacheKey$PointerTo_Named___go_module$ResolvedModule(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "cache"), moduleResolutionCacheKey.$copy(key));
    }
    static Set(c: tsonicTypeScriptRuntime.Location<moduleResolutionCache> | undefined, key: moduleResolutionCacheKey, value: ResolvedModule | undefined): void {
        const __gotots_store_1 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<moduleResolutionCache>).value;
        SyncMap$LoadOrStore$Named___go_module$moduleResolutionCacheKey$PointerTo_Named___go_module$ResolvedModule(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "cache"), moduleResolutionCacheKey.$copy(key), value);
    }
}
export type typeRefDirectiveResolutionCacheKey$Storage = {
    containingDirectory: gostring;
    typeReferenceName: gostring;
    resolutionMode: int32;
    redirectConfigName: gostring;
    fromInferredTypesContainingFile: bool;
};
export class typeRefDirectiveResolutionCacheKey implements GoContainerStoredValue<typeRefDirectiveResolutionCacheKey$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: typeRefDirectiveResolutionCacheKey$Storage) {
    }
    public static $storageOf($source: typeRefDirectiveResolutionCacheKey): typeRefDirectiveResolutionCacheKey$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: typeRefDirectiveResolutionCacheKey$Storage): typeRefDirectiveResolutionCacheKey {
        return new typeRefDirectiveResolutionCacheKey($source);
    }
    public get containingDirectory(): gostring {
        return this.$storage.containingDirectory;
    }
    public set containingDirectory($value: gostring) {
        this.$storage.containingDirectory = $value;
    }
    public get typeReferenceName(): gostring {
        return this.$storage.typeReferenceName;
    }
    public set typeReferenceName($value: gostring) {
        this.$storage.typeReferenceName = $value;
    }
    public get resolutionMode(): ModuleKind__from_core {
        return this.$storage.resolutionMode;
    }
    public set resolutionMode($value: ModuleKind__from_core) {
        this.$storage.resolutionMode = $value;
    }
    public get redirectConfigName(): gostring {
        return this.$storage.redirectConfigName;
    }
    public set redirectConfigName($value: gostring) {
        this.$storage.redirectConfigName = $value;
    }
    public get fromInferredTypesContainingFile(): bool {
        return this.$storage.fromInferredTypesContainingFile;
    }
    public set fromInferredTypesContainingFile($value: bool) {
        this.$storage.fromInferredTypesContainingFile = $value;
    }
    declare readonly [$goContainerStorageType]: typeRefDirectiveResolutionCacheKey$Storage;
    static $copy($source: typeRefDirectiveResolutionCacheKey): typeRefDirectiveResolutionCacheKey {
        return new typeRefDirectiveResolutionCacheKey({
            containingDirectory: $source.$storage.containingDirectory,
            typeReferenceName: $source.$storage.typeReferenceName,
            resolutionMode: $source.$storage.resolutionMode,
            redirectConfigName: $source.$storage.redirectConfigName,
            fromInferredTypesContainingFile: $source.$storage.fromInferredTypesContainingFile
        });
    }
    static $equal($left: typeRefDirectiveResolutionCacheKey, $right: typeRefDirectiveResolutionCacheKey): bool {
        return $left.$storage.containingDirectory === $right.$storage.containingDirectory && $left.$storage.typeReferenceName === $right.$storage.typeReferenceName && $left.$storage.resolutionMode === $right.$storage.resolutionMode && $left.$storage.redirectConfigName === $right.$storage.redirectConfigName && $left.$storage.fromInferredTypesContainingFile === $right.$storage.fromInferredTypesContainingFile;
    }
    static $hash($source: typeRefDirectiveResolutionCacheKey): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.containingDirectory));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.typeReferenceName));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.resolutionMode));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.redirectConfigName));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.fromInferredTypesContainingFile));
        return $hash;
    }
    declare private readonly then?: never;
}
export class typeRefDirectiveResolutionCache {
    declare private readonly $goType: void;
    public constructor(public cache: SyncMap__from_collections<typeRefDirectiveResolutionCacheKey, ResolvedTypeReferenceDirective | undefined>) {
    }
    static $zero(): typeRefDirectiveResolutionCache {
        return new typeRefDirectiveResolutionCache(SyncMap__from_collections.$zero<typeRefDirectiveResolutionCacheKey, ResolvedTypeReferenceDirective | undefined>());
    }
    static $copy($source: typeRefDirectiveResolutionCache): typeRefDirectiveResolutionCache {
        return new typeRefDirectiveResolutionCache(SyncMap__from_collections.$copy<typeRefDirectiveResolutionCacheKey, ResolvedTypeReferenceDirective | undefined>($source.cache));
    }
    declare private readonly then?: never;
    static Get(c: tsonicTypeScriptRuntime.Location<typeRefDirectiveResolutionCache> | undefined, key: typeRefDirectiveResolutionCacheKey): [
        ResolvedTypeReferenceDirective | undefined,
        bool
    ] {
        const __gotots_store_2 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<typeRefDirectiveResolutionCache>).value;
        return SyncMap$Load$Named___go_module$typeRefDirectiveResolutionCacheKey$PointerTo_Named___go_module$ResolvedTypeReferenceDirective(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "cache"), typeRefDirectiveResolutionCacheKey.$copy(key));
    }
    static Set(c: tsonicTypeScriptRuntime.Location<typeRefDirectiveResolutionCache> | undefined, key: typeRefDirectiveResolutionCacheKey, value: ResolvedTypeReferenceDirective | undefined): void {
        const __gotots_store_3 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<typeRefDirectiveResolutionCache>).value;
        SyncMap$Store$Named___go_module$typeRefDirectiveResolutionCacheKey$PointerTo_Named___go_module$ResolvedTypeReferenceDirective(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "cache"), typeRefDirectiveResolutionCacheKey.$copy(key), value);
    }
}
export class caches {
    declare private readonly $goType: void;
    public constructor(public packageJsonInfoCache: {
        value: InfoCache__from_packagejson;
    } | undefined, public moduleResolutionCache: moduleResolutionCache, public typeRefDirectiveResolutionCache: typeRefDirectiveResolutionCache, public parsedPatternsForPathsOnce: sync__from_gostdlib.Once, public parsedPatternsForPaths: {
        value: ParsedPatterns;
    } | undefined) {
    }
    static $zero(): caches {
        return new caches(void 0, moduleResolutionCache.$zero(), typeRefDirectiveResolutionCache.$zero(), named_sync.SyncOnceOperations.$zero(), void 0);
    }
    static $copy($source: caches): caches {
        return new caches($source.packageJsonInfoCache, moduleResolutionCache.$copy($source.moduleResolutionCache), typeRefDirectiveResolutionCache.$copy($source.typeRefDirectiveResolutionCache), named_sync.SyncOnceOperations.$copy($source.parsedPatternsForPathsOnce), $source.parsedPatternsForPaths);
    }
    declare private readonly then?: never;
}
export function newCaches(currentDirectory: gostring, useCaseSensitiveFileNames: bool, options: {
    value: CompilerOptions__from_core;
} | undefined): caches {
    return new caches(NewInfoCache__from_packagejson(currentDirectory, useCaseSensitiveFileNames), moduleResolutionCache.$zero(), typeRefDirectiveResolutionCache.$zero(), named_sync.SyncOnceOperations.$zero(), void 0);
}
export function getRedirectConfigName(redirect: ResolvedProjectReference | undefined): gostring {
    if (redirect === undefined) {
        return "";
    }
    const __gotots_receiver_0 = redirect;
    return goInterfaceNonNil<ResolvedProjectReference>(__gotots_receiver_0).ConfigName();
}
