import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { HasFileName as HasFileName__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Checker as Checker__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { Tristate as Tristate__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { DocumentUri as DocumentUri__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { Map as Map__from_dirty } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/project/dirty/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { mapEntry$Storage as mapEntry__from_dirty$Storage } from "../../project/dirty/entry.js";
import type { Export } from "./export.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { BindSourceFile as BindSourceFile__from_binder } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import { NewChecker as NewChecker__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { $state as $state__core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/state.js";
import { FileNameToDocumentURI as FileNameToDocumentURI__from_lsconv } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { UserPreferences as UserPreferences__from_lsutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { GetTypesPackageName as GetTypesPackageName__from___go_module, NewResolverWithOptions as NewResolverWithOptions__from___go_module, ResolvedEntrypoint as ResolvedEntrypoint__from___go_module, ResolverOptions as ResolverOptions__from___go_module, Resolver as Resolver__from___go_module } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { InfoCacheEntry as InfoCacheEntry__from_packagejson } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import { MapBuilder as MapBuilder__from_dirty, MapEntry as MapEntry__from_dirty } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/project/dirty/package.js";
import { LogTree as LogTree__from_logging } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/package.js";
import { KnownSymlinks as KnownSymlinks__from_symlinks } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/symlinks/package.js";
import { CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ContainsPath as ContainsPath__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, IsDynamicFileName as IsDynamicFileName__from_tspath, Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { SpecMatcher as SpecMatcher__from_vfsmatch } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/vfsmatch/package.js";
import { $goDeferred$void_to_void, $goDeferred$string_to_string as DeferredCallableRegistry } from "../../../../../../../support/deferred-callables.js";
import { Compare$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/cmp/Compare.js";
import { NewSetWithSizeHint$Named_tspath$Path, NewSetWithSizeHint$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetWithSizeHint.js";
import { Set$Add$Named_tspath$Path, Set$Add$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$AddIfAbsent$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { Set$Clone$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Clone.js";
import { Set$Equals$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Equals.js";
import { Set$IsSubsetOf$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$IsSubsetOf.js";
import { Set$Keys$Named_lsproto$DocumentUri, Set$Keys$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { Set$Len$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_collections$SyncSetOf_string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_autoimport$failedAmbientModuleLookupSource } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { SyncMap$Range$Named_tspath$Path$PointerTo_Named_autoimport$failedAmbientModuleLookupSource } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Range.js";
import { SyncSet$Add$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Add.js";
import { SyncSet$Keys$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Keys.js";
import { SyncSet$Range$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Range.js";
import { Coalesce$PointerTo_Named_collections$SetOf_string$Named_collections$SetOf_string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Coalesce.js";
import { DiffMapsFunc$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket$Struct_void, DiffMapsFunc$Named_tspath$Path$PointerTo_Named_autoimport$directory$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/DiffMapsFunc.js";
import { FirstResult$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$RegistryBucket, FirstResult$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$directory, FirstResult$MapOf_Named_tspath$Path_To_PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string, FirstResult$Named_tspath$Path, FirstResult$PointerTo_Named_autoimport$directory, FirstResult$PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_autoimport$RegistryBucket, FirstResult$PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_autoimport$directory, FirstResult$SliceOf_string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstResult.js";
import { Identity$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string, Identity$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Identity.js";
import { IfElse$Named_autoimport$newProgramStructure } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { UnorderedEqual$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/UnorderedEqual.js";
import { Index$Clone$PointerTo_Named_autoimport$Export } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/ls/autoimport/Index$Clone.js";
import { Index$insertAsWords$PointerTo_Named_autoimport$Export } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/ls/autoimport/Index$insertAsWords.js";
import { Map$Add$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket, Map$Add$Named_tspath$Path$PointerTo_Named_autoimport$directory } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Add.js";
import { Map$Delete$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket, Map$Delete$Named_tspath$Path$PointerTo_Named_autoimport$directory } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Delete.js";
import { Map$Finalize$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket, Map$Finalize$Named_tspath$Path$PointerTo_Named_autoimport$directory } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Finalize.js";
import { Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket, Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$directory } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Get.js";
import { Map$Range$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket, Map$Range$Named_tspath$Path$PointerTo_Named_autoimport$directory } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Range.js";
import { Map$TryDelete$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$TryDelete.js";
import { MapBuilder$Build$Named_tspath$Path$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string, MapBuilder$Build$Named_tspath$Path$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/MapBuilder$Build.js";
import { MapBuilder$Clear$Named_tspath$Path$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/MapBuilder$Clear.js";
import { MapBuilder$Delete$Named_tspath$Path$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string, MapBuilder$Delete$Named_tspath$Path$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/MapBuilder$Delete.js";
import { MapEntry$Change$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/MapEntry$Change.js";
import { MapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_autoimport$directory } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/MapEntry$ChangeIf.js";
import { MapEntry$Replace$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/MapEntry$Replace.js";
import { NewMap$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket, NewMap$Named_tspath$Path$PointerTo_Named_autoimport$directory } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/NewMap.js";
import { NewMapBuilder$Named_tspath$Path$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string, NewMapBuilder$Named_tspath$Path$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/NewMapBuilder.js";
import { mapEntry$Key$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket, mapEntry$Key$Named_tspath$Path$PointerTo_Named_autoimport$directory } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/mapEntry$Key.js";
import { mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket, mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$directory } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/mapEntry$Value.js";
import { ForEachAncestorDirectoryPath$Interface_void, ForEachAncestorDirectoryPath$PointerTo_Named_autoimport$directory, ForEachAncestorDirectoryPath$SliceOf_string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/tspath/ForEachAncestorDirectoryPath.js";
import { Clone$MapOf_string_To_MapOf_Named_tspath$Path_To_string$string$MapOf_Named_tspath$Path_To_string } from "../../../../../../../support/generics/concretizations/maps/Clone.js";
import { Copy$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named_autoimport$Export$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named_autoimport$Export$Named_tspath$Path$SliceOf_PointerTo_Named_autoimport$Export, Copy$MapOf_Named_tspath$Path_To_string$MapOf_Named_tspath$Path_To_string$Named_tspath$Path$string, Copy$MapOf_string_To_MapOf_Named_tspath$Path_To_string$MapOf_string_To_MapOf_Named_tspath$Path_To_string$string$MapOf_Named_tspath$Path_To_string } from "../../../../../../../support/generics/concretizations/maps/Copy.js";
import { Values$MapOf_string_To_PointerTo_Named_ast$SourceFile$string$PointerTo_Named_ast$SourceFile } from "../../../../../../../support/generics/concretizations/maps/Values.js";
import { Clone$SliceOf_string$string } from "../../../../../../../support/generics/concretizations/slices/Clone.js";
import { Collect$PointerTo_Named_ast$SourceFile } from "../../../../../../../support/generics/concretizations/slices/Collect.js";
import { DeleteFunc$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint$PointerTo_Named___go_module$ResolvedEntrypoint, DeleteFunc$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile } from "../../../../../../../support/generics/concretizations/slices/DeleteFunc.js";
import { SortFunc$SliceOf_Named_autoimport$BucketStats$Named_autoimport$BucketStats } from "../../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_autoimport$aliasResolver, $goInterfaceAdapter$PointerTo_Named_compiler$Program, $goInterfaceAdapter$bool, $goInterfaceAdapter$int, $goInterfaceAdapter$int32, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_time$Duration as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$Dispose$void_to_void, $goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetDefaultProject$Named_tspath$Path_to_Named_tspath$Path_PointerTo_Named_compiler$Program, $goInterfaceMethod$GetPackageJson$string_to_PointerTo_Named_packagejson$InfoCacheEntry, $goInterfaceMethod$GetProgramForProject$Named_tspath$Path_to_PointerTo_Named_compiler$Program, $goInterfaceMethod$GetSourceFile$string_Named_tspath$Path_to_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$Realpath$string_to_string } from "../../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_tspath$Path_To_Named_autoimport$pathAndFileName, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$RegistryBucket, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$failedAmbientModuleLookupSource, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_collections$SetOf_string, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string, $goMap$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint, $goMap$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named_autoimport$Export, $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_string, $goMap$MapOf_rune_To_SliceOf_int, $goMap$MapOf_string_To_MapOf_Named_tspath$Path_To_string, $goMap$MapOf_string_To_PointerTo_Named_ast$SourceFile, $goMap$MapOf_string_To_PointerTo_Named_autoimport$perPackageExtractionResult, $goMap$MapOf_string_To_SliceOf_string, $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$directory as GoMap } from "../../../../../../../support/maps.js";
import { mapEntry as mapEntry__from_dirty } from "../../project/dirty/entry.js";
import { aliasResolver, newAliasResolver, pathAndFileName } from "./aliasresolver.js";
import { exportExtractor, extractorStats, newSymbolExtractor } from "./extract.js";
import { Index } from "./index.js";
import { addPackageJsonDependencies, addProjectReferenceOutputMappings, createCheckerPool, getModuleResolver, getPackageNamesInNodeModules, getPackageRealpathFuncs, getResolvedPackageNames } from "./util.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash, GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export class newProgramStructure {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function newProgramStructureFalse$constant(): newProgramStructure {
    return new newProgramStructure(0);
}
export function newProgramStructureSameFileNames$constant(): newProgramStructure {
    return new newProgramStructure(1);
}
export function newProgramStructureDifferentFileNames$constant(): newProgramStructure {
    return new newProgramStructure(2);
}
export type bucketBuildPreferences$Storage = {
    fileExcludePatterns: RuntimeSlice<gostring>;
    autoImportEntrypointDirectorySearch: uint8;
};
export class bucketBuildPreferences {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: bucketBuildPreferences$Storage) {
    }
    public static $storageOf($source: bucketBuildPreferences): bucketBuildPreferences$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: bucketBuildPreferences$Storage): bucketBuildPreferences {
        return new bucketBuildPreferences($source);
    }
    public get fileExcludePatterns(): RuntimeSlice<gostring> {
        return this.$storage.fileExcludePatterns;
    }
    public set fileExcludePatterns($value: RuntimeSlice<gostring>) {
        this.$storage.fileExcludePatterns = $value;
    }
    public get autoImportEntrypointDirectorySearch(): Tristate__from_core {
        return this.$storage.autoImportEntrypointDirectorySearch;
    }
    public set autoImportEntrypointDirectorySearch($value: Tristate__from_core) {
        this.$storage.autoImportEntrypointDirectorySearch = $value;
    }
    static $zero(): bucketBuildPreferences {
        return new bucketBuildPreferences({
            fileExcludePatterns: RuntimeSlice.nil<gostring>(),
            autoImportEntrypointDirectorySearch: 0
        });
    }
    static $copy($source: bucketBuildPreferences): bucketBuildPreferences {
        return new bucketBuildPreferences({
            fileExcludePatterns: $source.$storage.fileExcludePatterns,
            autoImportEntrypointDirectorySearch: $source.$storage.autoImportEntrypointDirectorySearch
        });
    }
    declare private readonly then?: never;
    Clone(): bucketBuildPreferences {
        let p: bucketBuildPreferences = bucketBuildPreferences.$copy(this);
        bucketBuildPreferences.$storageOf(p).fileExcludePatterns = Clone$SliceOf_string$string(bucketBuildPreferences.$storageOf(p).fileExcludePatterns);
        return bucketBuildPreferences.$copy(p);
    }
    Equal(other: bucketBuildPreferences): bool {
        return UnorderedEqual$string(bucketBuildPreferences.$storageOf(this).fileExcludePatterns, bucketBuildPreferences.$storageOf(other).fileExcludePatterns) && bucketBuildPreferences.$storageOf(this).autoImportEntrypointDirectorySearch === bucketBuildPreferences.$storageOf(other).autoImportEntrypointDirectorySearch;
    }
}
export function bucketBuildPreferencesFromUserPreferences(prefs: UserPreferences__from_lsutil): bucketBuildPreferences {
    return bucketBuildPreferences.$fromStorage({
        fileExcludePatterns: prefs.AutoImportFileExcludePatterns,
        autoImportEntrypointDirectorySearch: prefs.AutoImportEntrypointDirectorySearch
    });
}
export type BucketState$Storage = {
    dirtyFile: gostring;
    multipleFilesDirty: bool;
    newProgramStructure: int;
    buildPreferences: bucketBuildPreferences$Storage;
    dirtyPackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined;
    recursiveSearchPackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined;
};
export class BucketState {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: BucketState$Storage) {
    }
    public static $storageOf($source: BucketState): BucketState$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: BucketState$Storage): BucketState {
        return new BucketState($source);
    }
    public get dirtyFile(): Path__from_tspath {
        return new Path__from_tspath(this.$storage.dirtyFile);
    }
    public set dirtyFile($value: Path__from_tspath) {
        this.$storage.dirtyFile = $value.$value;
    }
    public get multipleFilesDirty(): bool {
        return this.$storage.multipleFilesDirty;
    }
    public set multipleFilesDirty($value: bool) {
        this.$storage.multipleFilesDirty = $value;
    }
    public get newProgramStructure(): newProgramStructure {
        return new newProgramStructure(this.$storage.newProgramStructure);
    }
    public set newProgramStructure($value: newProgramStructure) {
        this.$storage.newProgramStructure = $value.$value;
    }
    public get buildPreferences(): bucketBuildPreferences {
        return bucketBuildPreferences.$fromStorage(this.$storage.buildPreferences);
    }
    public set buildPreferences($value: bucketBuildPreferences) {
        this.$storage.buildPreferences = bucketBuildPreferences.$storageOf($value);
    }
    public get dirtyPackages(): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        return this.$storage.dirtyPackages;
    }
    public set dirtyPackages($value: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined) {
        this.$storage.dirtyPackages = $value;
    }
    public get recursiveSearchPackages(): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        return this.$storage.recursiveSearchPackages;
    }
    public set recursiveSearchPackages($value: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined) {
        this.$storage.recursiveSearchPackages = $value;
    }
    static $zero(): BucketState {
        return new BucketState({
            dirtyFile: ((void Path__from_tspath,
                "") as string),
            multipleFilesDirty: false,
            newProgramStructure: ((void newProgramStructure,
                0) as int),
            buildPreferences: bucketBuildPreferences.$storageOf(bucketBuildPreferences.$zero()),
            dirtyPackages: void 0,
            recursiveSearchPackages: void 0
        });
    }
    static $copy($source: BucketState): BucketState {
        return new BucketState({
            dirtyFile: ((void Path__from_tspath,
                $source.$storage.dirtyFile) as string),
            multipleFilesDirty: $source.$storage.multipleFilesDirty,
            newProgramStructure: ((void newProgramStructure,
                $source.$storage.newProgramStructure) as int),
            buildPreferences: bucketBuildPreferences.$storageOf(bucketBuildPreferences.$copy(bucketBuildPreferences.$fromStorage($source.$storage.buildPreferences))),
            dirtyPackages: $source.$storage.dirtyPackages,
            recursiveSearchPackages: $source.$storage.recursiveSearchPackages
        });
    }
    declare private readonly then?: never;
    Clone(): BucketState {
        let b: BucketState = BucketState.$copy(this);
        BucketState.$storageOf(b).buildPreferences = bucketBuildPreferences.$storageOf(bucketBuildPreferences.$fromStorage(BucketState.$storageOf(b).buildPreferences).Clone());
        BucketState.$storageOf(b).dirtyPackages = Set$Clone$string(BucketState.$storageOf(b).dirtyPackages);
        BucketState.$storageOf(b).recursiveSearchPackages = Set$Clone$string(BucketState.$storageOf(b).recursiveSearchPackages);
        return BucketState.$copy(b);
    }
    Dirty(): bool {
        return BucketState.$storageOf(this).multipleFilesDirty || !(((void Path__from_tspath,
            BucketState.$storageOf(this).dirtyFile) as string)
            ===
                ((void Path__from_tspath,
                    "") as string)) || ((void newProgramStructure,
            BucketState.$storageOf(this).newProgramStructure) as int)
            > 0 || Set$Len$string(BucketState.$storageOf(this).dirtyPackages) > 0;
    }
    DirtyPackages(): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        if (this.multipleFilesDirty) {
            return void 0;
        }
        return this.dirtyPackages;
    }
    RecursiveSearchPackages(): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        return this.recursiveSearchPackages;
    }
    $go$private$autoimport$hasDirtyFileBesides(file: Path__from_tspath): bool {
        return BucketState.$storageOf(this).multipleFilesDirty || !(((void Path__from_tspath,
            BucketState.$storageOf(this).dirtyFile) as string)
            ===
                ((void Path__from_tspath,
                    "") as string)) && !(((void Path__from_tspath,
            BucketState.$storageOf(this).dirtyFile) as string)
            === file.$value);
    }
    $go$private$autoimport$possiblyNeedsRebuildForFile(file: Path__from_tspath, preferences: UserPreferences__from_lsutil): bool {
        return ((void newProgramStructure,
            BucketState.$storageOf(this).newProgramStructure) as int)
            > 0 || this.$go$private$autoimport$hasDirtyFileBesides(file) || !bucketBuildPreferences.$fromStorage(BucketState.$storageOf(this).buildPreferences).Equal(bucketBuildPreferencesFromUserPreferences(UserPreferences__from_lsutil.$copy(preferences))) || Set$Len$string(BucketState.$storageOf(this).dirtyPackages) > 0;
    }
}
export function recursiveSearchSubset(target: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, current: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): bool {
    if (target === undefined) {
        return current === undefined;
    }
    if (current === undefined) {
        return true;
    }
    return Set$IsSubsetOf$string(target, current);
}
export class RegistryBucket {
    declare private readonly $goType: void;
    public constructor(public state: BucketState, public Paths: GoMapValue<Path__from_tspath, gostring>, public PackageFiles: GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>>, public ResolvedPackageNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public DependencyNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public AmbientModuleNames: GoMapValue<gostring, RuntimeSlice<gostring>>, public Index: Index<{
        value: Export;
    } | undefined> | undefined) {
    }
    declare private readonly then?: never;
    static Clone(b: RegistryBucket | undefined): RegistryBucket | undefined {
        return new RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state.Clone(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Paths, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PackageFiles, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedPackageNames, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).DependencyNames, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).AmbientModuleNames, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Index);
    }
    static $go$private$autoimport$markNodeModulesDirty(b: RegistryBucket | undefined, packageName: gostring): void {
        if (BucketState.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).multipleFilesDirty) {
            return;
        }
        if (packageName === "") {
            BucketState.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).multipleFilesDirty = true;
            return;
        }
        if (BucketState.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).dirtyPackages === undefined) {
            BucketState.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).dirtyPackages =
                tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
                    M: $goMap$MapOf_string_To_Struct_void.nil()
                }));
        }
        Set$Add$string(BucketState.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).dirtyPackages, packageName);
    }
    static $go$private$autoimport$markProjectFileDirty(b: RegistryBucket | undefined, file: Path__from_tspath): void {
        if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state.$go$private$autoimport$hasDirtyFileBesides(file)) {
            BucketState.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).multipleFilesDirty = true;
        }
        else {
            BucketState.$storageOf((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).dirtyFile = file.$value;
        }
    }
}
export function newRegistryBucket(): RegistryBucket | undefined {
    return new RegistryBucket(BucketState.$fromStorage({
        multipleFilesDirty: true,
        newProgramStructure: newProgramStructureDifferentFileNames$constant().$value,
        dirtyFile: ((void Path__from_tspath,
            "") as string),
        buildPreferences: bucketBuildPreferences.$storageOf(bucketBuildPreferences.$zero()),
        dirtyPackages: void 0,
        recursiveSearchPackages: void 0
    }), $goMap$MapOf_Named_tspath$Path_To_string.nil(), $goMap$MapOf_string_To_MapOf_Named_tspath$Path_To_string.nil(), void 0, void 0, $goMap$MapOf_string_To_SliceOf_string.nil(), void 0);
}
export class directory {
    declare private readonly $goType: void;
    public constructor(public name: gostring, public packageJson: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined, public hasNodeModules: bool) {
    }
    declare private readonly then?: never;
    static Clone(d: directory | undefined): directory | undefined {
        return new directory((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageJson, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasNodeModules);
    }
}
export class Registry {
    declare private readonly $goType: void;
    public constructor(public toPath: (($0: gostring) => Path__from_tspath) | undefined, public userPreferences: UserPreferences__from_lsutil, public directories: GoMapValue<Path__from_tspath, directory | undefined>, public nodeModules: GoMapValue<Path__from_tspath, RegistryBucket | undefined>, public projects: GoMapValue<Path__from_tspath, RegistryBucket | undefined>, public uniquePackageCount: int, public entrypoints: GoMapValue<Path__from_tspath, RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>>, public specifierCache: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined>) {
    }
    static $copy($source: Registry): Registry {
        return new Registry($source.toPath, UserPreferences__from_lsutil.$copy($source.userPreferences), $source.directories, $source.nodeModules, $source.projects, $source.uniquePackageCount, $source.entrypoints, $source.specifierCache);
    }
    declare private readonly then?: never;
    static Clone(r: {
        value: Registry;
    } | undefined, ctx: GoInterface | undefined, change: RegistryChange, host: RegistryCloneHost | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): [
        {
            value: Registry;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let start = time__from_gostdlib.Now();
        if (!(logger === undefined)) {
            logger = LogTree__from_logging.Fork(logger, "Building autoimport registry");
        }
        let builder: registryBuilder | undefined = newRegistryBuilder(r, host);
        if (!(change.UserPreferences === undefined)) {
            (builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).userPreferences = UserPreferences__from_lsutil.$copy(UserPreferences__from_lsutil.$copy(((change.UserPreferences ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UserPreferences__from_lsutil>).value));
            if (!UnorderedEqual$string((builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).userPreferences.AutoImportSpecifierExcludeRegexes, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.userPreferences.AutoImportSpecifierExcludeRegexes)) {
                MapBuilder$Clear$Named_tspath$Path$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string((builder ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).specifierCache);
            }
        }
        registryBuilder.$go$private$autoimport$updateBucketAndDirectoryExistence(builder, RegistryChange.$copy(change), logger);
        registryBuilder.$go$private$autoimport$markBucketsDirty(builder, RegistryChange.$copy(change), logger);
        if (!(change.RequestedFile.$value ===
            ((void Path__from_tspath,
                "") as string))) {
            registryBuilder.$go$private$autoimport$updateIndexes(builder, ctx, RegistryChange.$copy(change), logger);
        }
        if (!(logger === undefined)) {
            LogTree__from_logging.Logf(logger, "Built autoimport registry in %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(time__from_gostdlib.Since(named_time.TimeOperations.$copy(start)))]));
        }
        let registry: {
            value: Registry;
        } | undefined = registryBuilder.Build(builder);
        return [registry, void 0];
    }
    static GetCacheStats(r: {
        value: Registry;
    } | undefined): CacheStats | undefined {
        let stats: CacheStats | undefined = new CacheStats(RuntimeSlice.nil<BucketStats$Storage>(), RuntimeSlice.nil<BucketStats$Storage>(), (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.uniquePackageCount);
        const __gotots_range_24 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projects;
        const __gotots_range_keys_9 = __gotots_range_24.keys();
        for (const __gotots_range_value_46 of __gotots_range_keys_9) {
            const __gotots_range_value_47 = __gotots_range_24.lookupOk(__gotots_range_value_46);
            if (!__gotots_range_value_47[1]) {
                continue;
            }
            const __gotots_range_value_48 = __gotots_range_value_46;
            const __gotots_range_value_49 = __gotots_range_value_47[0];
            let path = __gotots_range_value_48;
            let bucket: RegistryBucket | undefined = __gotots_range_value_49;
            let exportCount = 0;
            if (!((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Index === undefined)) {
                exportCount = Index.$storageOf(((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Index ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries.length;
            }
            const __gotots_slice_build_0 = (stats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectBuckets;
            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
            let __gotots_slice_build_1 = __gotots_slice_build_0;
            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, BucketStats.$storageOf(BucketStats.$fromStorage({
                    Path: path.$value,
                    ExportCount: exportCount,
                    FileCount: (bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Paths.length(),
                    State: BucketState.$storageOf(BucketState.$copy((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state)),
                    DependencyNames: (bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).DependencyNames,
                    PackageNames: void 0
                })));
            }
            else {
                __gotots_slice_build_1 = goSliceAllocate<BucketStats$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.set(__gotots_slice_build_3, BucketStats.$storageOf(BucketStats.$copy(BucketStats.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                }
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, BucketStats.$storageOf(BucketStats.$fromStorage({
                    Path: path.$value,
                    ExportCount: exportCount,
                    FileCount: (bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Paths.length(),
                    State: BucketState.$storageOf(BucketState.$copy((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state)),
                    DependencyNames: (bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).DependencyNames,
                    PackageNames: void 0
                })));
                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, BucketStats.$storageOf(BucketStats.$zero()));
                }
            }
            (stats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectBuckets = __gotots_slice_build_1;
        }
        const __gotots_range_25 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModules;
        const __gotots_range_keys_10 = __gotots_range_25.keys();
        for (const __gotots_range_value_50 of __gotots_range_keys_10) {
            const __gotots_range_value_51 = __gotots_range_25.lookupOk(__gotots_range_value_50);
            if (!__gotots_range_value_51[1]) {
                continue;
            }
            const __gotots_range_value_52 = __gotots_range_value_50;
            const __gotots_range_value_53 = __gotots_range_value_51[0];
            let path = __gotots_range_value_52;
            let bucket: RegistryBucket | undefined = __gotots_range_value_53;
            let exportCount = 0;
            if (!((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Index === undefined)) {
                exportCount = Index.$storageOf(((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Index ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries.length;
            }
            let packageNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = void 0;
            let fileCount = 0;
            if (!(bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PackageFiles.isNil()) {
                packageNames = NewSetWithSizeHint$string((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PackageFiles.length());
                const __gotots_range_26 = (bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PackageFiles;
                const __gotots_range_keys_11 = __gotots_range_26.keys();
                for (const __gotots_range_value_54 of __gotots_range_keys_11) {
                    const __gotots_range_value_55 = __gotots_range_26.lookupOk(__gotots_range_value_54);
                    if (!__gotots_range_value_55[1]) {
                        continue;
                    }
                    const __gotots_range_value_56 = __gotots_range_value_54;
                    const __gotots_range_value_57 = __gotots_range_value_55[0];
                    let name = __gotots_range_value_56;
                    let paths: GoMapValue<Path__from_tspath, gostring> = __gotots_range_value_57;
                    Set$Add$string(packageNames, name);
                    fileCount += paths.length();
                }
            }
            const __gotots_slice_build_4 = (stats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeModulesBuckets;
            const __gotots_slice_build_6 = __gotots_slice_build_4.length + 1;
            let __gotots_slice_build_5 = __gotots_slice_build_4;
            if (__gotots_slice_build_6 <= __gotots_slice_build_4.capacity) {
                __gotots_slice_build_5 = __gotots_slice_build_4.$withLength(__gotots_slice_build_6);
                __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, BucketStats.$storageOf(BucketStats.$fromStorage({
                    Path: path.$value,
                    ExportCount: exportCount,
                    FileCount: fileCount,
                    State: BucketState.$storageOf(BucketState.$copy((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state)),
                    DependencyNames: (bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).DependencyNames,
                    PackageNames: packageNames
                })));
            }
            else {
                __gotots_slice_build_5 = goSliceAllocate<BucketStats$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_6));
                for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                    __gotots_slice_build_5.set(__gotots_slice_build_7, BucketStats.$storageOf(BucketStats.$copy(BucketStats.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_7)))));
                }
                __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, BucketStats.$storageOf(BucketStats.$fromStorage({
                    Path: path.$value,
                    ExportCount: exportCount,
                    FileCount: fileCount,
                    State: BucketState.$storageOf(BucketState.$copy((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state)),
                    DependencyNames: (bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).DependencyNames,
                    PackageNames: packageNames
                })));
                for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                    __gotots_slice_build_5.$initialize(__gotots_slice_build_7, BucketStats.$storageOf(BucketStats.$zero()));
                }
            }
            (stats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeModulesBuckets = __gotots_slice_build_5;
        }
        SortFunc$SliceOf_Named_autoimport$BucketStats$Named_autoimport$BucketStats((stats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectBuckets, (a: BucketStats, b: BucketStats): int => {
            return Compare$Named_tspath$Path(new Path__from_tspath(BucketStats.$storageOf(a).Path), new Path__from_tspath(BucketStats.$storageOf(b).Path));
        });
        SortFunc$SliceOf_Named_autoimport$BucketStats$Named_autoimport$BucketStats((stats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeModulesBuckets, (a: BucketStats, b: BucketStats): int => {
            return Compare$Named_tspath$Path(new Path__from_tspath(BucketStats.$storageOf(a).Path), new Path__from_tspath(BucketStats.$storageOf(b).Path));
        });
        return stats;
    }
    static IsPreparedForImportingFile(r: {
        value: Registry;
    } | undefined, fileName: gostring, projectPath: Path__from_tspath, preferences: UserPreferences__from_lsutil): bool {
        if (r === undefined) {
            return false;
        }
        const __gotots_results_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projects.lookupOk(projectPath);
        let projectBucket: RegistryBucket | undefined = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (!ok) {
            return false;
        }
        const __gotots_callee_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_0 = fileName;
        let path = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
        if ((projectBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state.$go$private$autoimport$possiblyNeedsRebuildForFile(path, UserPreferences__from_lsutil.$copy(preferences))) {
            return false;
        }
        let dirPath = path.GetDirectoryPath();
        for (;;) {
            {
                const __gotots_results_1 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModules.lookupOk(dirPath);
                let dirBucket: RegistryBucket | undefined = __gotots_results_1[0];
                let ok__shadow_1 = __gotots_results_1[1];
                if (ok__shadow_1) {
                    if ((dirBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state.$go$private$autoimport$possiblyNeedsRebuildForFile(path, UserPreferences__from_lsutil.$copy(preferences))) {
                        return false;
                    }
                }
            }
            let parent = dirPath.GetDirectoryPath();
            if (parent.$value === dirPath.$value) {
                break;
            }
            dirPath = parent;
        }
        return true;
    }
    static NodeModulesDirectories(r: {
        value: Registry;
    } | undefined): GoMapValue<Path__from_tspath, gostring> {
        let dirs: GoMapValue<Path__from_tspath, gostring> = $goMap$MapOf_Named_tspath$Path_To_string.make(0, []);
        const __gotots_range_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.directories;
        const __gotots_range_keys_0 = __gotots_range_0.keys();
        for (const __gotots_range_value_0 of __gotots_range_keys_0) {
            const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
            if (!__gotots_range_value_1[1]) {
                continue;
            }
            const __gotots_range_value_2 = __gotots_range_value_0;
            const __gotots_range_value_3 = __gotots_range_value_1[0];
            let dirPath = __gotots_range_value_2;
            let dir: directory | undefined = __gotots_range_value_3;
            if ((dir ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasNodeModules) {
                dirs.store(new Path__from_tspath(CombinePaths__from_tspath(dirPath.$value, RuntimeSlice.literal<gostring>(["node_modules"]))), CombinePaths__from_tspath((dir ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name, RuntimeSlice.literal<gostring>(["node_modules"])));
            }
        }
        return dirs;
    }
}
export function NewRegistry(toPath: (($0: gostring) => Path__from_tspath) | undefined, preferences: UserPreferences__from_lsutil): {
    value: Registry;
} | undefined {
    return { value: new Registry(toPath, UserPreferences__from_lsutil.$copy(preferences), GoMap.make(0, []), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$RegistryBucket.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$RegistryBucket.nil(), 0, $goMap$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string.nil()) };
}
export type BucketStats$Storage = {
    Path: gostring;
    ExportCount: int;
    FileCount: int;
    State: BucketState$Storage;
    DependencyNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined;
    PackageNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined;
};
export class BucketStats implements GoContainerStoredValue<BucketStats$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: BucketStats$Storage) {
    }
    public static $storageOf($source: BucketStats): BucketStats$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: BucketStats$Storage): BucketStats {
        return new BucketStats($source);
    }
    public get Path(): Path__from_tspath {
        return new Path__from_tspath(this.$storage.Path);
    }
    public set Path($value: Path__from_tspath) {
        this.$storage.Path = $value.$value;
    }
    public get ExportCount(): int {
        return this.$storage.ExportCount;
    }
    public set ExportCount($value: int) {
        this.$storage.ExportCount = $value;
    }
    public get FileCount(): int {
        return this.$storage.FileCount;
    }
    public set FileCount($value: int) {
        this.$storage.FileCount = $value;
    }
    public get State(): BucketState {
        return BucketState.$fromStorage(this.$storage.State);
    }
    public set State($value: BucketState) {
        this.$storage.State = BucketState.$storageOf($value);
    }
    public get DependencyNames(): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        return this.$storage.DependencyNames;
    }
    public set DependencyNames($value: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined) {
        this.$storage.DependencyNames = $value;
    }
    public get PackageNames(): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        return this.$storage.PackageNames;
    }
    public set PackageNames($value: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined) {
        this.$storage.PackageNames = $value;
    }
    declare readonly [$goContainerStorageType]: BucketStats$Storage;
    static $zero(): BucketStats {
        return new BucketStats({
            Path: ((void Path__from_tspath,
                "") as string),
            ExportCount: 0,
            FileCount: 0,
            State: BucketState.$storageOf(BucketState.$zero()),
            DependencyNames: void 0,
            PackageNames: void 0
        });
    }
    static $copy($source: BucketStats): BucketStats {
        return new BucketStats({
            Path: ((void Path__from_tspath,
                $source.$storage.Path) as string),
            ExportCount: $source.$storage.ExportCount,
            FileCount: $source.$storage.FileCount,
            State: BucketState.$storageOf(BucketState.$copy(BucketState.$fromStorage($source.$storage.State))),
            DependencyNames: $source.$storage.DependencyNames,
            PackageNames: $source.$storage.PackageNames
        });
    }
    declare private readonly then?: never;
}
export class CacheStats {
    declare private readonly $goType: void;
    public constructor(public ProjectBuckets: RuntimeSlice<BucketStats$Storage>, public NodeModulesBuckets: RuntimeSlice<BucketStats$Storage>, public UniquePackageCount: int) {
    }
    declare private readonly then?: never;
}
export class RegistryChange {
    declare private readonly $goType: void;
    public constructor(public RequestedFile: Path__from_tspath, public OpenFiles: GoMapValue<Path__from_tspath, gostring>, public Changed: Set__from_collections<DocumentUri__from_lsproto>, public Created: Set__from_collections<DocumentUri__from_lsproto>, public Deleted: Set__from_collections<DocumentUri__from_lsproto>, public RebuiltPrograms: GoMapValue<Path__from_tspath, bool>, public UserPreferences: tsonicTypeScriptRuntime.Location<UserPreferences__from_lsutil> | undefined) {
    }
    static $copy($source: RegistryChange): RegistryChange {
        return new RegistryChange($source.RequestedFile, $source.OpenFiles, Set__from_collections.$copy<DocumentUri__from_lsproto>($source.Changed), Set__from_collections.$copy<DocumentUri__from_lsproto>($source.Created), Set__from_collections.$copy<DocumentUri__from_lsproto>($source.Deleted), $source.RebuiltPrograms, $source.UserPreferences);
    }
    declare private readonly then?: never;
}
export interface RegistryCloneHost extends GoInterfaceValue {
    Dispose(): void;
    FS(): FS__from_vfs | undefined;
    GetCurrentDirectory(): gostring;
    GetDefaultProject($argument0: Path__from_tspath): [
        Path__from_tspath,
        {
            value: Program__from_compiler;
        } | undefined
    ];
    GetPackageJson($argument0: gostring): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined;
    GetProgramForProject($argument0: Path__from_tspath): {
        value: Program__from_compiler;
    } | undefined;
    GetSourceFile($argument0: gostring, $argument1: Path__from_tspath): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined;
}
export const RegistryCloneHost$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Dispose$void_to_void, $goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetDefaultProject$Named_tspath$Path_to_Named_tspath$Path_PointerTo_Named_compiler$Program, $goInterfaceMethod$GetPackageJson$string_to_PointerTo_Named_packagejson$InfoCacheEntry, $goInterfaceMethod$GetProgramForProject$Named_tspath$Path_to_PointerTo_Named_compiler$Program, $goInterfaceMethod$GetSourceFile$string_Named_tspath$Path_to_PointerTo_Named_ast$SourceFile]);
export function RegistryCloneHost$is(value: GoInterfaceValue | undefined): value is RegistryCloneHost {
    return value !== undefined && value.$go$implements(RegistryCloneHost$contract);
}
export class registryBuilder {
    declare private readonly $goType: void;
    public constructor(public host: RegistryCloneHost | undefined, public base: {
        value: Registry;
    } | undefined, public userPreferences: UserPreferences__from_lsutil, public directories: {
        value: Map__from_dirty<Path__from_tspath, directory | undefined>;
    } | undefined, public nodeModules: {
        value: Map__from_dirty<Path__from_tspath, RegistryBucket | undefined>;
    } | undefined, public projects: {
        value: Map__from_dirty<Path__from_tspath, RegistryBucket | undefined>;
    } | undefined, public specifierCache: MapBuilder__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined> | undefined, public resolverOptions: ResolverOptions__from___go_module, public uniquePackageCount: int, public entrypoints: MapBuilder__from_dirty<Path__from_tspath, RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>, RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>> | undefined) {
    }
    declare private readonly then?: never;
    static Build(b: registryBuilder | undefined): {
        value: Registry;
    } | undefined {
        const __gotots_field_8 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_field_9 = UserPreferences__from_lsutil.$copy((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).userPreferences);
        const __gotots_results_23 = Map$Finalize$Named_tspath$Path$PointerTo_Named_autoimport$directory((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).directories);
        const __gotots_field_10 = FirstResult$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$directory(__gotots_results_23[0], RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$bool(__gotots_results_23[1])]));
        const __gotots_results_24 = Map$Finalize$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeModules);
        const __gotots_field_11 = FirstResult$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$RegistryBucket(__gotots_results_24[0], RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$bool(__gotots_results_24[1])]));
        const __gotots_results_25 = Map$Finalize$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projects);
        const __gotots_field_12 = FirstResult$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$RegistryBucket(__gotots_results_25[0], RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$bool(__gotots_results_25[1])]));
        return { value: new Registry(__gotots_field_8, __gotots_field_9, __gotots_field_10, __gotots_field_11, __gotots_field_12, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).uniquePackageCount, MapBuilder$Build$Named_tspath$Path$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints), FirstResult$MapOf_Named_tspath$Path_To_PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string(MapBuilder$Build$Named_tspath$Path$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).specifierCache), RuntimeSlice.nil<$goInterface$Interface_void | undefined>())) };
    }
    static $go$private$autoimport$buildNodeModulesBucket(b: registryBuilder | undefined, ctx: GoInterface | undefined, result: bucketBuildResult | undefined, dependencies: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, dirPath: Path__from_tspath, discovered: RuntimeSlice<discoveredPackage | undefined>, directoryPackageNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, extractionCache: GoMapValue<gostring, perPackageExtractionResult | undefined>, recursiveSearchPackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        const __gotots_receiver_50 = ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_50).Err() === undefined)) {
            const __gotots_receiver_51 = ctx;
            (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err = goInterfaceNonNil<GoInterface>(__gotots_receiver_51).Err();
            return;
        }
        let extraction: packageExtractionResult | undefined = installExtractions(discovered, extractionCache);
        let indexStart = time__from_gostdlib.Now();
        let allPackageFiles: GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>> = $goMap$MapOf_string_To_MapOf_Named_tspath$Path_To_string.make(Set$Len$string(directoryPackageNames), []);
        const __gotots_range_47 = Set$Keys$string(directoryPackageNames);
        const __gotots_range_keys_24 = __gotots_range_47.keys();
        for (const __gotots_range_value_106 of __gotots_range_keys_24) {
            const __gotots_range_value_107 = __gotots_range_47.lookupOk(__gotots_range_value_106);
            if (!__gotots_range_value_107[1]) {
                continue;
            }
            const __gotots_range_value_108 = __gotots_range_value_106;
            let pkgName = __gotots_range_value_108;
            allPackageFiles.store(pkgName, (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageFiles.lookup(pkgName));
        }
        let paths: GoMapValue<Path__from_tspath, gostring> = $goMap$MapOf_Named_tspath$Path_To_string.make(0, []);
        const __gotots_range_48 = Set$Keys$string((extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).workspacePackages);
        const __gotots_range_keys_25 = __gotots_range_48.keys();
        for (const __gotots_range_value_109 of __gotots_range_keys_25) {
            const __gotots_range_value_110 = __gotots_range_48.lookupOk(__gotots_range_value_109);
            if (!__gotots_range_value_110[1]) {
                continue;
            }
            const __gotots_range_value_111 = __gotots_range_value_109;
            let pkgName = __gotots_range_value_111;
            {
                const __gotots_results_36 = (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageFiles.lookupOk(pkgName);
                let files: GoMapValue<Path__from_tspath, gostring> = __gotots_results_36[0];
                let ok = __gotots_results_36[1];
                if (ok) {
                    const __gotots_range_49 = files;
                    const __gotots_range_keys_26 = __gotots_range_49.keys();
                    for (const __gotots_range_value_112 of __gotots_range_keys_26) {
                        const __gotots_range_value_113 = __gotots_range_49.lookupOk(__gotots_range_value_112);
                        if (!__gotots_range_value_113[1]) {
                            continue;
                        }
                        const __gotots_range_value_114 = __gotots_range_value_112;
                        let path = __gotots_range_value_114;
                        paths.store(path, pkgName);
                    }
                }
            }
        }
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bucket = new RegistryBucket(BucketState.$fromStorage({
            buildPreferences: bucketBuildPreferences.$storageOf(bucketBuildPreferencesFromUserPreferences(UserPreferences__from_lsutil.$copy((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).userPreferences))),
            recursiveSearchPackages: Set$Clone$string(recursiveSearchPackages),
            dirtyFile: ((void Path__from_tspath,
                "") as string),
            multipleFilesDirty: false,
            newProgramStructure: ((void newProgramStructure,
                0) as int),
            dirtyPackages: void 0
        }), paths, allPackageFiles, void 0, dependencies, (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ambientModuleNames, Index.$fromStorage<{
            value: Export;
        } | undefined>({
            entries: RuntimeSlice.nil<{
                value: Export;
            } | undefined>(),
            index: $goMap$MapOf_rune_To_SliceOf_int.nil()
        }));
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints = $goMap$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint.make((extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exports.length(), []);
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleFailedAmbientModuleLookupSources = (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleFailedAmbientModuleLookupSources;
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleFailedAmbientModuleLookupTargets = (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleFailedAmbientModuleLookupTargets;
        const __gotots_range_50 = (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exports;
        const __gotots_range_keys_27 = __gotots_range_50.keys();
        for (const __gotots_range_value_115 of __gotots_range_keys_27) {
            const __gotots_range_value_116 = __gotots_range_50.lookupOk(__gotots_range_value_115);
            if (!__gotots_range_value_116[1]) {
                continue;
            }
            const __gotots_range_value_117 = __gotots_range_value_116[0];
            let fileExports = __gotots_range_value_117;
            const __gotots_range_51 = fileExports;
            for (let __gotots_range_index_22 = 0; __gotots_range_index_22 < __gotots_range_51.length; __gotots_range_index_22++) {
                const __gotots_range_value_118 = __gotots_range_51.get(__gotots_range_index_22);
                let exp: {
                    value: Export;
                } | undefined = __gotots_range_value_118;
                Index$insertAsWords$PointerTo_Named_autoimport$Export(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Index, exp);
            }
        }
        const __gotots_range_52 = (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints;
        for (let __gotots_range_index_23 = 0; __gotots_range_index_23 < __gotots_range_52.length; __gotots_range_index_23++) {
            const __gotots_range_value_119 = __gotots_range_52.get(__gotots_range_index_23);
            let entrypointSet = __gotots_range_value_119;
            const __gotots_range_53 = entrypointSet;
            for (let __gotots_range_index_24 = 0; __gotots_range_index_24 < __gotots_range_53.length; __gotots_range_index_24++) {
                const __gotots_range_value_120 = __gotots_range_53.get(__gotots_range_index_24);
                let entrypoint: ResolvedEntrypoint__from___go_module | undefined = __gotots_range_value_120;
                const __gotots_callee_22 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_argument_64 = (entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedFileName;
                let path = (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_64);
                (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints.store(path, (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints.lookup(path).append(void 0, [entrypoint]));
            }
        }
        {
            const __gotots_results_37 = Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeModules, dirPath);
            let oldEntry: MapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> | undefined = __gotots_results_37[0];
            let ok = __gotots_results_37[1];
            if (ok) {
                const __gotots_store_41 = MapEntry__from_dirty.$storageOf((oldEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                let oldBucket: RegistryBucket | undefined = mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                    return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                    return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                }));
                const __gotots_range_54 = (oldBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PackageFiles;
                const __gotots_range_keys_28 = __gotots_range_54.keys();
                for (const __gotots_range_value_121 of __gotots_range_keys_28) {
                    const __gotots_range_value_122 = __gotots_range_54.lookupOk(__gotots_range_value_121);
                    if (!__gotots_range_value_122[1]) {
                        continue;
                    }
                    const __gotots_range_value_123 = __gotots_range_value_122[0];
                    let files: GoMapValue<Path__from_tspath, gostring> = __gotots_range_value_123;
                    const __gotots_range_55 = files;
                    const __gotots_range_keys_29 = __gotots_range_55.keys();
                    for (const __gotots_range_value_124 of __gotots_range_keys_29) {
                        const __gotots_range_value_125 = __gotots_range_55.lookupOk(__gotots_range_value_124);
                        if (!__gotots_range_value_125[1]) {
                            continue;
                        }
                        const __gotots_range_value_126 = __gotots_range_value_124;
                        let path = __gotots_range_value_126;
                        {
                            const __gotots_results_38 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entrypoints.lookupOk(path);
                            let ok__shadow_1 = __gotots_results_38[1];
                            if (ok__shadow_1) {
                                (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).removedEntrypointPaths = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).removedEntrypointPaths.append(((void Path__from_tspath,
                                    "") as string), [path.$value]);
                            }
                        }
                    }
                }
            }
        }
        if (!(logger === undefined)) {
            LogTree__from_logging.Logf(logger, "Installed %d exports (%d used checker)", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int32(atomic__from_gostdlib.Int32.Load((extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).stats.exports)), new $goInterfaceAdapter$int32(atomic__from_gostdlib.Int32.Load((extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).stats.usedChecker))]));
            if ((extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).skippedEntrypointsCount > 0) {
                LogTree__from_logging.Logf(logger, "Skipped %d entrypoints due to exclude patterns", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int((extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).skippedEntrypointsCount)]));
            }
            LogTree__from_logging.Logf(logger, "Built index: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(time__from_gostdlib.Since(named_time.TimeOperations.$copy(indexStart)))]));
        }
        const __gotots_receiver_52 = ctx;
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err = goInterfaceNonNil<GoInterface>(__gotots_receiver_52).Err();
    }
    static $go$private$autoimport$buildProjectBucket(b: registryBuilder | undefined, ctx: GoInterface | undefined, result: bucketBuildResult | undefined, projectPath: Path__from_tspath, resolvedPackageNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_54 = ctx;
                    if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_54).Err() === undefined)) {
                        const __gotots_receiver_55 = ctx;
                        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err = goInterfaceNonNil<GoInterface>(__gotots_receiver_55).Err();
                        break __gotots_return_block_0;
                    }
                    let start = time__from_gostdlib.Now();
                    let mu = named_sync.SyncMutexOperations.$zero();
                    const __gotots_receiver_58 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).userPreferences;
                    const __gotots_receiver_56 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                    const __gotots_receiver_57 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_56).FS();
                    const __gotots_argument_65 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_57).UseCaseSensitiveFileNames();
                    let fileExcludePatterns: SpecMatcher__from_vfsmatch | undefined = __gotots_receiver_58.ParsedAutoImportFileExcludePatterns(__gotots_argument_65);
                    (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bucket = new RegistryBucket(BucketState.$zero(), $goMap$MapOf_Named_tspath$Path_To_string.nil(), $goMap$MapOf_string_To_MapOf_Named_tspath$Path_To_string.nil(), void 0, void 0, $goMap$MapOf_string_To_SliceOf_string.nil(), void 0);
                    let moduleResolver: {
                        value: Resolver__from___go_module;
                    } | undefined = NewResolverWithOptions__from___go_module((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host, $state__core.EmptyCompilerOptions, "", "", ResolverOptions__from___go_module.$copy((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolverOptions));
                    const __gotots_receiver_59 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                    const __gotots_argument_66 = projectPath;
                    let program: {
                        value: Program__from_compiler;
                    } | undefined = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_59).GetProgramForProject(__gotots_argument_66);
                    let symlinkCache: tsonicTypeScriptRuntime.Location<KnownSymlinks__from_symlinks> | undefined = Program__from_compiler.GetSymlinkCache(program);
                    const __gotots_results_39 = createCheckerPool(new $goInterfaceAdapter$PointerTo_Named_compiler$Program(program));
                    let getChecker: (() => [
                        tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined,
                        (() => void) | undefined
                    ]) | undefined = __gotots_results_39[0];
                    let closePool: (() => void) | undefined = __gotots_results_39[1];
                    let checkerCount: (() => int32) | undefined = __gotots_results_39[2];
                    const __gotots_callee_23: (() => void) | undefined = closePool;
                    const __gotots_deferred_2 = $goDeferred$void_to_void.resolve(__gotots_callee_23);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    let exports: GoMapValue<Path__from_tspath, RuntimeSlice<{
                        value: Export;
                    } | undefined>> = $goMap$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named_autoimport$Export.make(0, []);
                    let wg = named_sync.SyncWaitGroupOperations.$zero();
                    let skippedFileCount = 0;
                    let combinedStats = extractorStats.$zero();
                    const __gotots_range_56 = Program__from_compiler.GetSourceFiles(program);
                    for (let __gotots_range_index_25 = 0; __gotots_range_index_25 < __gotots_range_56.length; __gotots_range_index_25++) {
                        const __gotots_range_value_127 = __gotots_range_56.get(__gotots_range_index_25);
                        let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_127;
                        if (isIgnoredFile(program, file)) {
                            continue;
                        }
                        if (!(fileExcludePatterns === undefined) && SpecMatcher__from_vfsmatch.MatchString(fileExcludePatterns, SourceFile__from_ast.FileName(file))) {
                            skippedFileCount++;
                            continue;
                        }
                        if (strings__from_gostdlib.Contains(SourceFile__from_ast.FileName(file), "/node_modules/")) {
                            continue;
                        }
                        if (hasSymlinkToNodeModules(SourceFile__from_ast.Path(file), symlinkCache)) {
                            continue;
                        }
                        sync__from_gostdlib.WaitGroup.Go(wg, (): void => {
                            const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
                            let __gotots_panic_1: GoPanic | undefined = undefined;
                            try {
                                try {
                                    __gotots_return_block_1: {
                                        const __gotots_receiver_60 = ctx;
                                        if (goInterfaceNonNil<GoInterface>(__gotots_receiver_60).Err() === undefined) {
                                            const __gotots_callee_24 = getChecker;
                                            const __gotots_results_40 = (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))();
                                            let checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_40[0];
                                            let done: (() => void) | undefined = __gotots_results_40[1];
                                            const __gotots_callee_25: (() => void) | undefined = done;
                                            const __gotots_deferred_4 = $goDeferred$void_to_void.resolve(__gotots_callee_25);
                                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                                __gotots_deferred_4 === undefined ? (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_4($go$recovery);
                                            });
                                            let extractor: exportExtractor | undefined = registryBuilder.$go$private$autoimport$newExportExtractor(b, "", checker__shadow_1, moduleResolver, void 0);
                                            let fileExports = exportExtractor.$go$private$autoimport$extractFromFile(extractor, file);
                                            sync__from_gostdlib.Mutex.Lock(mu);
                                            exports.store(SourceFile__from_ast.Path(file), fileExports);
                                            sync__from_gostdlib.Mutex.Unlock(mu);
                                            let stats: extractorStats | undefined = exportExtractor.Stats(extractor);
                                            atomic__from_gostdlib.Int32.Add(combinedStats.exports, atomic__from_gostdlib.Int32.Load((stats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exports));
                                            atomic__from_gostdlib.Int32.Add(combinedStats.usedChecker, atomic__from_gostdlib.Int32.Load((stats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).usedChecker));
                                        }
                                    }
                                }
                                catch (__gotots_caught_2) {
                                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                                        throw __gotots_caught_2;
                                    }
                                    __gotots_panic_1 = __gotots_caught_2;
                                }
                            }
                            finally {
                                while (__gotots_defers_0.length !== 0) {
                                    const __gotots_deferred_3 = goDeferPop(__gotots_defers_0);
                                    const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                                    try {
                                        __gotots_deferred_3(__gotots_recovery_1);
                                        if (__gotots_recovery_1.recovered()) {
                                            __gotots_panic_1 = undefined;
                                        }
                                    }
                                    catch (__gotots_caught_3) {
                                        if (!(__gotots_caught_3 instanceof GoPanic)) {
                                            throw __gotots_caught_3;
                                        }
                                        __gotots_panic_1 = __gotots_caught_3;
                                    }
                                }
                            }
                            if (__gotots_panic_1 !== undefined) {
                                throw __gotots_panic_1;
                            }
                        });
                    }
                    sync__from_gostdlib.WaitGroup.Wait(wg);
                    let indexStart = time__from_gostdlib.Now();
                    let idx: Index<{
                        value: Export;
                    } | undefined> | undefined = Index.$fromStorage<{
                        value: Export;
                    } | undefined>({
                        entries: RuntimeSlice.nil<{
                            value: Export;
                        } | undefined>(),
                        index: $goMap$MapOf_rune_To_SliceOf_int.nil()
                    });
                    let paths: GoMapValue<Path__from_tspath, gostring> = $goMap$MapOf_Named_tspath$Path_To_string.make(exports.length(), []);
                    const __gotots_range_57 = exports;
                    const __gotots_range_keys_30 = __gotots_range_57.keys();
                    for (const __gotots_range_value_128 of __gotots_range_keys_30) {
                        const __gotots_range_value_129 = __gotots_range_57.lookupOk(__gotots_range_value_128);
                        if (!__gotots_range_value_129[1]) {
                            continue;
                        }
                        const __gotots_range_value_130 = __gotots_range_value_128;
                        const __gotots_range_value_131 = __gotots_range_value_129[0];
                        let path = __gotots_range_value_130;
                        let fileExports = __gotots_range_value_131;
                        paths.store(path, "");
                        const __gotots_range_58 = fileExports;
                        for (let __gotots_range_index_26 = 0; __gotots_range_index_26 < __gotots_range_58.length; __gotots_range_index_26++) {
                            const __gotots_range_value_132 = __gotots_range_58.get(__gotots_range_index_26);
                            let exp: {
                                value: Export;
                            } | undefined = __gotots_range_value_132;
                            Index$insertAsWords$PointerTo_Named_autoimport$Export(idx, exp);
                        }
                    }
                    ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Paths = paths;
                    ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Index = idx;
                    ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedPackageNames = resolvedPackageNames;
                    BucketState.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).buildPreferences = bucketBuildPreferences.$storageOf(bucketBuildPreferencesFromUserPreferences(UserPreferences__from_lsutil.$copy((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).userPreferences)));
                    if (!(logger === undefined)) {
                        const __gotots_receiver_61 = logger;
                        const __gotots_argument_71 = "Extracted exports: %v (%d exports, %d used checker, %d created checkers)";
                        const __gotots_argument_67 = new GoInterfaceAdapter(indexStart.Sub(named_time.TimeOperations.$copy(start)));
                        const __gotots_argument_68 = new $goInterfaceAdapter$int32(atomic__from_gostdlib.Int32.Load(combinedStats.exports));
                        const __gotots_argument_69 = new $goInterfaceAdapter$int32(atomic__from_gostdlib.Int32.Load(combinedStats.usedChecker));
                        const __gotots_callee_27 = checkerCount;
                        const __gotots_argument_70 = new $goInterfaceAdapter$int32((__gotots_callee_27 ?? GoPanic.raiseRuntime("call of nil function"))());
                        const __gotots_argument_72 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_67, __gotots_argument_68, __gotots_argument_69, __gotots_argument_70]);
                        LogTree__from_logging.Logf(__gotots_receiver_61, __gotots_argument_71, __gotots_argument_72);
                        if (skippedFileCount > 0) {
                            LogTree__from_logging.Logf(logger, "Skipped %d files due to exclude patterns", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(skippedFileCount)]));
                        }
                        LogTree__from_logging.Logf(logger, "Built index: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(time__from_gostdlib.Since(named_time.TimeOperations.$copy(indexStart)))]));
                        LogTree__from_logging.Logf(logger, "Bucket total: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(time__from_gostdlib.Since(named_time.TimeOperations.$copy(start)))]));
                    }
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_1(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
    }
    static $go$private$autoimport$computeDependenciesForNodeModulesDirectory(b: registryBuilder | undefined, change: RegistryChange, allResolvedPackageNames: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined>, dirName: gostring, dirPath: Path__from_tspath): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        const __gotots_range_28 = change.OpenFiles;
        const __gotots_range_keys_12 = __gotots_range_28.keys();
        for (const __gotots_range_value_59 of __gotots_range_keys_12) {
            const __gotots_range_value_60 = __gotots_range_28.lookupOk(__gotots_range_value_59);
            if (!__gotots_range_value_60[1]) {
                continue;
            }
            const __gotots_range_value_61 = __gotots_range_value_59;
            let path = __gotots_range_value_61;
            if (dirPath.ContainsPath(path) && registryBuilder.$go$private$autoimport$getNearestAncestorDirectoryWithPackageJson(b, path) === undefined) {
                return void 0;
            }
        }
        let dependencies: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
            M: $goMap$MapOf_string_To_Struct_void.nil()
        }));
        Map$Range$Named_tspath$Path$PointerTo_Named_autoimport$directory((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).directories, (entry: MapEntry__from_dirty<Path__from_tspath, directory | undefined> | undefined): bool => {
            const __gotots_store_36 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
            let __gotots_logical_result_6 = InfoCacheEntry__from_packagejson.Exists((mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$directory(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined>, mapEntry__from_dirty<Path__from_tspath, directory | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined>): mapEntry__from_dirty<Path__from_tspath, directory | undefined> => {
                return mapEntry__from_dirty.$fromStorage<Path__from_tspath, directory | undefined>($go$storage);
            }, ($go$value: mapEntry__from_dirty<Path__from_tspath, directory | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined> => {
                return mapEntry__from_dirty.$storageOf<Path__from_tspath, directory | undefined>($go$value);
            })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageJson);
            if (__gotots_logical_result_6) {
                const __gotots_receiver_29 = dirPath;
                const __gotots_store_37 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                const __gotots_argument_42 = mapEntry$Key$Named_tspath$Path$PointerTo_Named_autoimport$directory(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined>, mapEntry__from_dirty<Path__from_tspath, directory | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined>): mapEntry__from_dirty<Path__from_tspath, directory | undefined> => {
                    return mapEntry__from_dirty.$fromStorage<Path__from_tspath, directory | undefined>($go$storage);
                }, ($go$value: mapEntry__from_dirty<Path__from_tspath, directory | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined> => {
                    return mapEntry__from_dirty.$storageOf<Path__from_tspath, directory | undefined>($go$value);
                }));
                __gotots_logical_result_6 = __gotots_receiver_29.ContainsPath(__gotots_argument_42);
            }
            if (__gotots_logical_result_6) {
                const __gotots_store_38 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                const __gotots_argument_43 = ((mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$directory(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined>, mapEntry__from_dirty<Path__from_tspath, directory | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined>): mapEntry__from_dirty<Path__from_tspath, directory | undefined> => {
                    return mapEntry__from_dirty.$fromStorage<Path__from_tspath, directory | undefined>($go$storage);
                }, ($go$value: mapEntry__from_dirty<Path__from_tspath, directory | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined> => {
                    return mapEntry__from_dirty.$storageOf<Path__from_tspath, directory | undefined>($go$value);
                })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents;
                const __gotots_argument_44 = dependencies;
                addPackageJsonDependencies(__gotots_argument_43, __gotots_argument_44);
            }
            return true;
        });
        const __gotots_range_29 = allResolvedPackageNames;
        const __gotots_range_keys_13 = __gotots_range_29.keys();
        for (const __gotots_range_value_62 of __gotots_range_keys_13) {
            const __gotots_range_value_63 = __gotots_range_29.lookupOk(__gotots_range_value_62);
            if (!__gotots_range_value_63[1]) {
                continue;
            }
            const __gotots_range_value_64 = __gotots_range_value_63[0];
            let resolvedPackageNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = __gotots_range_value_64;
            const __gotots_range_30 = Set$Keys$string(resolvedPackageNames);
            const __gotots_range_keys_14 = __gotots_range_30.keys();
            for (const __gotots_range_value_65 of __gotots_range_keys_14) {
                const __gotots_range_value_66 = __gotots_range_30.lookupOk(__gotots_range_value_65);
                if (!__gotots_range_value_66[1]) {
                    continue;
                }
                const __gotots_range_value_67 = __gotots_range_value_65;
                let name = __gotots_range_value_67;
                Set$Add$string(dependencies, name);
            }
        }
        return dependencies;
    }
    static $go$private$autoimport$discoverBucketPackages(b: registryBuilder | undefined, packageNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, dirName: gostring, dirPath: Path__from_tspath): RuntimeSlice<discoveredPackage | undefined> {
        let result = RuntimeSlice.make<discoveredPackage | undefined>(0, Set$Len$string(packageNames), void 0);
        const __gotots_range_31 = Set$Keys$string(packageNames);
        const __gotots_range_keys_15 = __gotots_range_31.keys();
        for (const __gotots_range_value_68 of __gotots_range_keys_15) {
            const __gotots_range_value_69 = __gotots_range_31.lookupOk(__gotots_range_value_68);
            if (!__gotots_range_value_69[1]) {
                continue;
            }
            const __gotots_range_value_70 = __gotots_range_value_68;
            let packageName = __gotots_range_value_70;
            let typesPackageName = GetTypesPackageName__from___go_module(packageName);
            const __gotots_receiver_31 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
            const __gotots_argument_45 = CombinePaths__from_tspath(dirName, RuntimeSlice.literal<gostring>(["node_modules", packageName, "package.json"]));
            let packageJson: {
                value: InfoCacheEntry__from_packagejson;
            } | undefined = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_31).GetPackageJson(__gotots_argument_45);
            let typesPackageJson: {
                value: InfoCacheEntry__from_packagejson;
            } | undefined = void 0;
            if (packageName !== typesPackageName) {
                const __gotots_receiver_32 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_46 = CombinePaths__from_tspath(dirName, RuntimeSlice.literal<gostring>(["node_modules", typesPackageName, "package.json"]));
                let typesJson: {
                    value: InfoCacheEntry__from_packagejson;
                } | undefined = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_32).GetPackageJson(__gotots_argument_46);
                if ((typesJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DirectoryExists) {
                    typesPackageJson = typesJson;
                }
            }
            let realpath = "";
            if ((packageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DirectoryExists) {
                const __gotots_receiver_33 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_receiver_34 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_33).FS();
                const __gotots_argument_47 = (packageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory;
                realpath = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_34).Realpath(__gotots_argument_47);
            }
            let typesRealpath = "";
            if (!(typesPackageJson === undefined)) {
                const __gotots_receiver_35 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_receiver_36 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_35).FS();
                const __gotots_argument_48 = (typesPackageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory;
                typesRealpath = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_36).Realpath(__gotots_argument_48);
            }
            let __gotots_logical_result_7 = realpath !== "" && !strings__from_gostdlib.Contains(realpath, "/node_modules/");
            if (__gotots_logical_result_7) {
                const __gotots_receiver_37 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_49 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_37).GetCurrentDirectory();
                const __gotots_argument_50 = realpath;
                const __gotots_receiver_38 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_receiver_39 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_38).FS();
                const __gotots_field_13 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_39).UseCaseSensitiveFileNames();
                const __gotots_argument_51 = new ComparePathsOptions__from_tspath(__gotots_field_13, "");
                __gotots_logical_result_7 = ContainsPath__from_tspath(__gotots_argument_49, __gotots_argument_50, __gotots_argument_51);
            }
            let isLocal = __gotots_logical_result_7;
            result = result.append(void 0, [new discoveredPackage(packageName, packageJson, realpath, typesPackageJson, typesRealpath, dirPath, isLocal),]);
        }
        return result;
    }
    static $go$private$autoimport$extractPackage(b: registryBuilder | undefined, ctx: GoInterface | undefined, packageJson: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined, packageName: gostring, projectReferenceOutputs: GoMapValue<Path__from_tspath, gostring>, fileExcludePatterns: SpecMatcher__from_vfsmatch | undefined, enableDirectorySearch: bool): perPackageExtractionResult | undefined {
        if (packageJson === undefined || !(packageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DirectoryExists) {
            return void 0;
        }
        const __gotots_receiver_40 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_argument_52 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_40).FS();
        const __gotots_argument_53 = (packageJson ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory;
        const __gotots_results_27 = getPackageRealpathFuncs(__gotots_argument_52, __gotots_argument_53);
        let toRealpath: (($0: gostring) => gostring) | undefined = __gotots_results_27[0];
        let toSymlink: (($0: gostring) => gostring) | undefined = __gotots_results_27[1];
        let resolver: {
            value: Resolver__from___go_module;
        } | undefined = getModuleResolver((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host, toRealpath, ResolverOptions__from___go_module.$copy((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolverOptions));
        let packageEntrypoints = Resolver__from___go_module.GetEntrypointsFromPackageJsonInfo(resolver, packageJson, packageName, enableDirectorySearch);
        if (packageEntrypoints.isNil()) {
            return void 0;
        }
        let skippedEntrypoints = 0;
        if (!(fileExcludePatterns === undefined)) {
            let count = packageEntrypoints.length;
            packageEntrypoints = DeleteFunc$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint$PointerTo_Named___go_module$ResolvedEntrypoint(packageEntrypoints, (entrypoint: ResolvedEntrypoint__from___go_module | undefined): bool => {
                return SpecMatcher__from_vfsmatch.MatchString(fileExcludePatterns, (entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedFileName);
            });
            skippedEntrypoints = count - packageEntrypoints.length;
        }
        if (packageEntrypoints.length === 0) {
            return void 0;
        }
        let result: perPackageExtractionResult | undefined = new perPackageExtractionResult($goMap$MapOf_Named_tspath$Path_To_string.make(0, []), packageEntrypoints, $goMap$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named_autoimport$Export.make(0, []), $goMap$MapOf_string_To_SliceOf_string.make(0, []), 0, 0, skippedEntrypoints, false, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$failedAmbientModuleLookupSource.make(0, []), tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
            M: $goMap$MapOf_string_To_Struct_void.nil()
        })));
        let seenFiles: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = NewSetWithSizeHint$Named_tspath$Path(packageEntrypoints.length);
        let rootFiles = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(packageEntrypoints.length, null, void 0);
        let symlinks__shadow_1: GoMapValue<Path__from_tspath, pathAndFileName> = $goMap$MapOf_Named_tspath$Path_To_Named_autoimport$pathAndFileName.make(0, []);
        let wg = named_sync.SyncWaitGroupOperations.$zero();
        const __gotots_range_32 = packageEntrypoints;
        for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_32.length; __gotots_range_index_15++) {
            const __gotots_range_value_71 = __gotots_range_index_15;
            const __gotots_range_value_72 = __gotots_range_32.get(__gotots_range_index_15);
            let i = __gotots_range_value_71;
            let entrypoint: ResolvedEntrypoint__from___go_module | undefined = __gotots_range_value_72;
            let fileName = ResolvedEntrypoint__from___go_module.SymlinkOrRealpath(entrypoint);
            let realpathFileName = (entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedFileName;
            const __gotots_callee_14 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_54 = realpathFileName;
            let realpathPath = (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_54);
            {
                const __gotots_results_28 = projectReferenceOutputs.lookupOk(realpathPath);
                let inputFileName = __gotots_results_28[0];
                let ok = __gotots_results_28[1];
                if (ok) {
                    const __gotots_callee_15 = toSymlink;
                    const __gotots_argument_55 = inputFileName;
                    fileName = (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_55);
                    realpathFileName = inputFileName;
                    const __gotots_callee_16 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                    const __gotots_argument_56 = realpathFileName;
                    realpathPath = (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_56);
                }
            }
            if (!Set$AddIfAbsent$Named_tspath$Path(seenFiles, realpathPath)) {
                continue;
            }
            if (fileName !== realpathFileName) {
                const __gotots_callee_17 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_argument_57 = fileName;
                let symlinkPath = (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_57);
                symlinks__shadow_1.store(realpathPath, new pathAndFileName(symlinkPath, fileName));
                (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isSymlinked = true;
            }
            sync__from_gostdlib.WaitGroup.Go(wg, (): void => {
                const __gotots_receiver_41 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_58 = realpathFileName;
                const __gotots_argument_59 = realpathPath;
                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_41).GetSourceFile(__gotots_argument_58, __gotots_argument_59);
                if (!(file === undefined)) {
                    BindSourceFile__from_binder(file);
                }
                rootFiles.set(i, file);
            });
        }
        sync__from_gostdlib.WaitGroup.Wait(wg);
        rootFiles = DeleteFunc$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile(rootFiles, (f: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
            return f === undefined;
        });
        let aliasResolver__shadow_1: {
            value: aliasResolver;
        } | undefined = newAliasResolver(rootFiles, symlinks__shadow_1, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host, resolver, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath, (source: HasFileName__from_ast | undefined, moduleName: gostring): void => {
            Set$Add$string((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).failedAmbientModuleLookupTargets, moduleName);
            {
                const __gotots_map_6 = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).failedAmbientModuleLookupSources;
                const __gotots_receiver_42 = source;
                const __gotots_map_7 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_42).Path();
                const __gotots_results_29 = __gotots_map_6.lookupOk(__gotots_map_7);
                let exists = __gotots_results_29[1];
                if (!exists) {
                    const __gotots_store_39 = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).failedAmbientModuleLookupSources;
                    const __gotots_receiver_43 = source;
                    const __gotots_store_40 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_43).Path();
                    const __gotots_receiver_44 = source;
                    const __gotots_field_14 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_44).FileName();
                    __gotots_store_39.store(__gotots_store_40, { value: new failedAmbientModuleLookupSource(named_sync.SyncMutexOperations.$zero(), __gotots_field_14, "") });
                }
            }
        });
        const __gotots_results_30 = NewChecker__from_checker(new $goInterfaceAdapter$PointerTo_Named_autoimport$aliasResolver(aliasResolver__shadow_1), void 0);
        let ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_30[0];
        let extractor: exportExtractor | undefined = registryBuilder.$go$private$autoimport$newExportExtractor(b, packageName, ch, resolver, toRealpath);
        let nonModuleFiles = Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
            return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
        });
        const nonModuleFiles$location = tsonicTypeScriptRuntime.boundLocation({}, () => nonModuleFiles, nonModuleFiles$next => nonModuleFiles = nonModuleFiles$next);
        const __gotots_range_33 = (aliasResolver__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFiles;
        for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_33.length; __gotots_range_index_16++) {
            const __gotots_range_value_73 = __gotots_range_33.get(__gotots_range_index_16);
            let entrypoint: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_73;
            const __gotots_receiver_45 = ctx;
            if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_45).Err() === undefined)) {
                return void 0;
            }
            let fileExports = exportExtractor.$go$private$autoimport$extractFromFile(extractor, entrypoint);
            const __gotots_range_34 = ((entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.AmbientModuleNames;
            for (let __gotots_range_index_17 = 0; __gotots_range_index_17 < __gotots_range_34.length; __gotots_range_index_17++) {
                const __gotots_range_value_74 = __gotots_range_34.get(__gotots_range_index_17);
                let name = __gotots_range_value_74;
                (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ambientModules.store(name, (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ambientModules.lookup(name).append("", [SourceFile__from_ast.FileName(entrypoint)]));
            }
            (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageFiles.store(SourceFile__from_ast.Path(entrypoint), SourceFile__from_ast.FileName(entrypoint));
            const __gotots_results_31 = (aliasResolver__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.symlinks.lookupOk(SourceFile__from_ast.Path(entrypoint));
            let symlink = __gotots_results_31[0];
            let hasSymlink = __gotots_results_31[1];
            if (hasSymlink) {
                (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageFiles.store(symlink.path, symlink.fileName);
            }
            let hasExports = fileExports.length > 0 && !(((entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined);
            {
                const __gotots_results_32 = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).failedAmbientModuleLookupSources.lookupOk(SourceFile__from_ast.Path(entrypoint));
                let source: {
                    value: failedAmbientModuleLookupSource;
                } | undefined = __gotots_results_32[0];
                let ok = __gotots_results_32[1];
                if (!ok) {
                    (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exports.store(SourceFile__from_ast.Path(entrypoint), fileExports);
                }
                else {
                    (source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageName = packageName;
                    hasExports = !(((entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined);
                }
            }
            if (!hasExports) {
                Set$Add$Named_tspath$Path(nonModuleFiles$location, SourceFile__from_ast.Path(entrypoint));
                if (hasSymlink) {
                    Set$Add$Named_tspath$Path(nonModuleFiles$location, symlink.path);
                }
            }
        }
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints = DeleteFunc$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint$PointerTo_Named___go_module$ResolvedEntrypoint((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints, (ep: ResolvedEntrypoint__from___go_module | undefined): bool => {
            const __gotots_receiver_46 = nonModuleFiles$location;
            const __gotots_callee_19 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_60 = (ep ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedFileName;
            const __gotots_argument_61 = (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_60);
            return Set__from_collections.Has<Path__from_tspath>(__gotots_receiver_46, __gotots_argument_61);
        });
        let stats: extractorStats | undefined = exportExtractor.Stats(extractor);
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).statsExports = atomic__from_gostdlib.Int32.Load((stats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exports);
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).statsUsedChecker = atomic__from_gostdlib.Int32.Load((stats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).usedChecker);
        return result;
    }
    static $go$private$autoimport$getNearestAncestorDirectoryWithPackageJson(b: registryBuilder | undefined, filePath: Path__from_tspath): directory | undefined {
        const __gotots_results_47 = ForEachAncestorDirectoryPath$PointerTo_Named_autoimport$directory(filePath.GetDirectoryPath(), (dirPath: Path__from_tspath): [
            directory | undefined,
            bool
        ] => {
            let result: directory | undefined = void 0;
            let stop: bool = false;
            {
                const __gotots_results_44 = Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$directory((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).directories, dirPath);
                let dirEntry: MapEntry__from_dirty<Path__from_tspath, directory | undefined> | undefined = __gotots_results_44[0];
                let ok = __gotots_results_44[1];
                let __gotots_logical_result_8 = ok;
                if (__gotots_logical_result_8) {
                    const __gotots_store_43 = MapEntry__from_dirty.$storageOf((dirEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                    __gotots_logical_result_8 = InfoCacheEntry__from_packagejson.Exists((mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$directory(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined>, mapEntry__from_dirty<Path__from_tspath, directory | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined>): mapEntry__from_dirty<Path__from_tspath, directory | undefined> => {
                        return mapEntry__from_dirty.$fromStorage<Path__from_tspath, directory | undefined>($go$storage);
                    }, ($go$value: mapEntry__from_dirty<Path__from_tspath, directory | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined> => {
                        return mapEntry__from_dirty.$storageOf<Path__from_tspath, directory | undefined>($go$value);
                    })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageJson);
                }
                if (__gotots_logical_result_8) {
                    const __gotots_store_44 = MapEntry__from_dirty.$storageOf((dirEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                    const __gotots_results_45 = mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$directory(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined>, mapEntry__from_dirty<Path__from_tspath, directory | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined>): mapEntry__from_dirty<Path__from_tspath, directory | undefined> => {
                        return mapEntry__from_dirty.$fromStorage<Path__from_tspath, directory | undefined>($go$storage);
                    }, ($go$value: mapEntry__from_dirty<Path__from_tspath, directory | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined> => {
                        return mapEntry__from_dirty.$storageOf<Path__from_tspath, directory | undefined>($go$value);
                    }));
                    const __gotots_results_46 = true;
                    return [__gotots_results_45, __gotots_results_46];
                }
            }
            return [void 0, false];
        });
        return FirstResult$PointerTo_Named_autoimport$directory(__gotots_results_47[0], RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$bool(__gotots_results_47[1])]));
    }
    static $go$private$autoimport$markBucketsDirty(b: registryBuilder | undefined, change: RegistryChange, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        const __gotots_range_7 = change.RebuiltPrograms;
        const __gotots_range_keys_3 = __gotots_range_7.keys();
        for (const __gotots_range_value_15 of __gotots_range_keys_3) {
            const __gotots_range_value_16 = __gotots_range_7.lookupOk(__gotots_range_value_15);
            if (!__gotots_range_value_16[1]) {
                continue;
            }
            const __gotots_range_value_17 = __gotots_range_value_15;
            const __gotots_range_value_18 = __gotots_range_value_16[0];
            let projectPath = __gotots_range_value_17;
            let newFileNames = __gotots_range_value_18;
            {
                const __gotots_results_9 = Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projects, projectPath);
                let bucket: MapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> | undefined = __gotots_results_9[0];
                let ok = __gotots_results_9[1];
                if (ok) {
                    MapEntry$Change$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(bucket, (bucket__shadow_1: RegistryBucket | undefined): void => {
                        BucketState.$storageOf((bucket__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).newProgramStructure = IfElse$Named_autoimport$newProgramStructure(newFileNames, newProgramStructureDifferentFileNames$constant(), newProgramStructureSameFileNames$constant()).$value;
                    });
                }
            }
        }
        let cleanNodeModulesBuckets: GoMapValue<Path__from_tspath, GoEmptyStruct> = $goMap$MapOf_Named_tspath$Path_To_Struct_void.make(0, []);
        let cleanProjectBuckets: GoMapValue<Path__from_tspath, GoEmptyStruct> = $goMap$MapOf_Named_tspath$Path_To_Struct_void.make(0, []);
        Map$Range$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeModules, (entry: MapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> | undefined): bool => {
            const __gotots_store_5 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
            if (!BucketState.$storageOf((mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
            }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
            })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).multipleFilesDirty) {
                const __gotots_store_7 = cleanNodeModulesBuckets;
                const __gotots_store_6 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                __gotots_store_7.store(mapEntry$Key$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                    return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                    return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                })), new GoEmptyStruct);
            }
            return true;
        });
        Map$Range$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projects, (entry: MapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> | undefined): bool => {
            const __gotots_store_8 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
            if (!BucketState.$storageOf((mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
            }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
            })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).multipleFilesDirty) {
                const __gotots_store_10 = cleanProjectBuckets;
                const __gotots_store_9 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                __gotots_store_10.store(mapEntry$Key$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                    return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                    return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                })), new GoEmptyStruct);
            }
            return true;
        });
        let markFilesDirty: (($0: GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct>) => void) | undefined = (uris: GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct>): void => {
            if (cleanNodeModulesBuckets.length() === 0 && cleanProjectBuckets.length() === 0) {
                return;
            }
            const __gotots_range_8 = uris;
            const __gotots_range_keys_4 = __gotots_range_8.keys();
            for (const __gotots_range_value_19 of __gotots_range_keys_4) {
                const __gotots_range_value_20 = __gotots_range_8.lookupOk(__gotots_range_value_19);
                if (!__gotots_range_value_20[1]) {
                    continue;
                }
                const __gotots_range_value_21 = __gotots_range_value_19;
                let uri = __gotots_range_value_21;
                const __gotots_callee_3 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_argument_19 = uri.FileName();
                let path = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19);
                if (cleanNodeModulesBuckets.length() > 0) {
                    {
                        let nodeModulesIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(path.$value, "/node_modules/")));
                        if (nodeModulesIndex !== -1) {
                            let dirPath = new Path__from_tspath(goStringSlice(path.$value, 0, nodeModulesIndex));
                            {
                                const __gotots_results_10 = cleanNodeModulesBuckets.lookupOk(dirPath);
                                let ok = __gotots_results_10[1];
                                if (ok) {
                                    const __gotots_results_11 = Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeModules, dirPath);
                                    let entry: MapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> | undefined = FirstResult$PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_autoimport$RegistryBucket(__gotots_results_11[0], RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$bool(__gotots_results_11[1])]));
                                    const __gotots_store_11 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                                    const __gotots_map_0 = (mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                                        return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                                    }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                                        return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                                    })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Paths;
                                    const __gotots_map_1 = path;
                                    let packageName = __gotots_map_0.lookup(__gotots_map_1);
                                    MapEntry$Change$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(entry, (bucket: RegistryBucket | undefined): void => {
                                        RegistryBucket.$go$private$autoimport$markNodeModulesDirty(bucket, packageName);
                                    });
                                    const __gotots_store_12 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                                    if (!BucketState.$storageOf((mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                                        return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                                    }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                                        return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                                    })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).multipleFilesDirty) {
                                        cleanNodeModulesBuckets.delete(dirPath);
                                    }
                                }
                            }
                        }
                        else {
                            const __gotots_range_9 = cleanNodeModulesBuckets;
                            const __gotots_range_keys_5 = __gotots_range_9.keys();
                            for (const __gotots_range_value_22 of __gotots_range_keys_5) {
                                const __gotots_range_value_23 = __gotots_range_9.lookupOk(__gotots_range_value_22);
                                if (!__gotots_range_value_23[1]) {
                                    continue;
                                }
                                const __gotots_range_value_24 = __gotots_range_value_22;
                                let bucketDirPath = __gotots_range_value_24;
                                const __gotots_results_12 = Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeModules, bucketDirPath);
                                let entry: MapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> | undefined = FirstResult$PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_autoimport$RegistryBucket(__gotots_results_12[0], RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$bool(__gotots_results_12[1])]));
                                {
                                    const __gotots_store_13 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                                    const __gotots_map_2 = (mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                                        return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                                    }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                                        return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                                    })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Paths;
                                    const __gotots_map_3 = path;
                                    const __gotots_results_13 = __gotots_map_2.lookupOk(__gotots_map_3);
                                    let packageName = __gotots_results_13[0];
                                    let ok = __gotots_results_13[1];
                                    if (ok) {
                                        MapEntry$Change$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(entry, (bucket: RegistryBucket | undefined): void => {
                                            RegistryBucket.$go$private$autoimport$markNodeModulesDirty(bucket, packageName);
                                        });
                                        const __gotots_store_14 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                                        if (!BucketState.$storageOf((mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                                            return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                                        }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                                            return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                                        })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).multipleFilesDirty) {
                                            cleanNodeModulesBuckets.delete(bucketDirPath);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                const __gotots_range_10 = cleanProjectBuckets;
                const __gotots_range_keys_6 = __gotots_range_10.keys();
                for (const __gotots_range_value_25 of __gotots_range_keys_6) {
                    const __gotots_range_value_26 = __gotots_range_10.lookupOk(__gotots_range_value_25);
                    if (!__gotots_range_value_26[1]) {
                        continue;
                    }
                    const __gotots_range_value_27 = __gotots_range_value_25;
                    let projectDirPath = __gotots_range_value_27;
                    const __gotots_results_14 = Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projects, projectDirPath);
                    let entry: MapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> | undefined = __gotots_results_14[0];
                    {
                        const __gotots_store_15 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                        const __gotots_map_4 = (mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                            return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                        }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                            return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                        })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Paths;
                        const __gotots_map_5 = path;
                        const __gotots_results_15 = __gotots_map_4.lookupOk(__gotots_map_5);
                        let ok = __gotots_results_15[1];
                        if (ok) {
                            MapEntry$Change$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(entry, (bucket: RegistryBucket | undefined): void => {
                                RegistryBucket.$go$private$autoimport$markProjectFileDirty(bucket, path);
                            });
                            const __gotots_store_16 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                            if (!BucketState.$storageOf((mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                                return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                            }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                                return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                            })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).multipleFilesDirty) {
                                cleanProjectBuckets.delete(projectDirPath);
                            }
                        }
                    }
                }
            }
        };
        const __gotots_callee_4 = markFilesDirty;
        const __gotots_store_17 = change;
        const __gotots_argument_20 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "Created"));
        (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20);
        const __gotots_callee_5 = markFilesDirty;
        const __gotots_store_18 = change;
        const __gotots_argument_21 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "Deleted"));
        (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21);
        const __gotots_callee_6 = markFilesDirty;
        const __gotots_store_19 = change;
        const __gotots_argument_22 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "Changed"));
        (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_22);
    }
    static $go$private$autoimport$newExportExtractor(b: registryBuilder | undefined, packageName: gostring, checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, moduleResolver: {
        value: Resolver__from___go_module;
    } | undefined, realpath: (($0: gostring) => gostring) | undefined): exportExtractor | undefined {
        return new exportExtractor(newSymbolExtractor(packageName, checker__shadow_1, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath, realpath), moduleResolver);
    }
    static $go$private$autoimport$resolveAmbientModuleName(b: registryBuilder | undefined, moduleName: gostring, fromPath: Path__from_tspath): RuntimeSlice<gostring> {
        const __gotots_results_43 = ForEachAncestorDirectoryPath$SliceOf_string(fromPath, (dirPath: Path__from_tspath): [
            RuntimeSlice<gostring>,
            bool
        ] => {
            let result: RuntimeSlice<gostring> = RuntimeSlice.nil<gostring>();
            let stop: bool = false;
            {
                const __gotots_results_41 = Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeModules, dirPath);
                let bucket: MapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> | undefined = __gotots_results_41[0];
                let ok = __gotots_results_41[1];
                if (ok) {
                    {
                        const __gotots_store_42 = MapEntry__from_dirty.$storageOf((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                        const __gotots_map_8 = (mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                            return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                        }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                            return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                        })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).AmbientModuleNames;
                        const __gotots_map_9 = moduleName;
                        const __gotots_results_42 = __gotots_map_8.lookupOk(__gotots_map_9);
                        let fileNames = __gotots_results_42[0];
                        let ok__shadow_1 = __gotots_results_42[1];
                        if (ok__shadow_1) {
                            return [fileNames, true];
                        }
                    }
                }
            }
            return [RuntimeSlice.nil<gostring>(), false];
        });
        return FirstResult$SliceOf_string(__gotots_results_43[0], RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$bool(__gotots_results_43[1])]));
    }
    static $go$private$autoimport$updateBucketAndDirectoryExistence(b: registryBuilder | undefined, change: RegistryChange, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        let start = time__from_gostdlib.Now();
        let neededProjects: GoMapValue<Path__from_tspath, GoEmptyStruct> = $goMap$MapOf_Named_tspath$Path_To_Struct_void.make(0, []);
        let neededDirectories: GoMapValue<Path__from_tspath, gostring> = $goMap$MapOf_Named_tspath$Path_To_string.make(0, []);
        const __gotots_range_1 = change.OpenFiles;
        const __gotots_range_keys_1 = __gotots_range_1.keys();
        for (const __gotots_range_value_4 of __gotots_range_keys_1) {
            const __gotots_range_value_5 = __gotots_range_1.lookupOk(__gotots_range_value_4);
            if (!__gotots_range_value_5[1]) {
                continue;
            }
            const __gotots_range_value_6 = __gotots_range_value_4;
            const __gotots_range_value_7 = __gotots_range_value_5[0];
            let path = __gotots_range_value_6;
            let fileName = __gotots_range_value_7;
            const __gotots_store_0 = neededProjects;
            const __gotots_receiver_0 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
            const __gotots_argument_1 = path;
            const __gotots_results_2 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_0).GetDefaultProject(__gotots_argument_1);
            __gotots_store_0.store(FirstResult$Named_tspath$Path(__gotots_results_2[0], RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$PointerTo_Named_compiler$Program(__gotots_results_2[1])])), new GoEmptyStruct);
            if (IsDynamicFileName__from_tspath(fileName)) {
                continue;
            }
            let dir = fileName;
            let dirPath = path;
            for (;;) {
                dir = GetDirectoryPath__from_tspath(dir);
                let lastDirPath = dirPath;
                dirPath = dirPath.GetDirectoryPath();
                if (dirPath.$value === lastDirPath.$value) {
                    break;
                }
                {
                    const __gotots_results_3 = neededDirectories.lookupOk(dirPath);
                    let ok = __gotots_results_3[1];
                    if (ok) {
                        break;
                    }
                }
                neededDirectories.store(dirPath, dir);
            }
            if (!MapBuilder__from_dirty.Has<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined>((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).specifierCache, path)) {
                const __gotots_receiver_1 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).specifierCache;
                const __gotots_argument_2 = path;
                const __gotots_struct_0 = SyncMap__from_collections.$zero<Path__from_tspath, gostring>();
                const __gotots_argument_3 = tsonicTypeScriptRuntime.location<SyncMap__from_collections<Path__from_tspath, gostring>>(__gotots_struct_0);
                MapBuilder__from_dirty.Set<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined>(__gotots_receiver_1, __gotots_argument_2, __gotots_argument_3);
            }
        }
        if (!(change.RequestedFile.$value ===
            ((void Path__from_tspath,
                "") as string))) {
            const __gotots_store_1 = neededProjects;
            const __gotots_receiver_2 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
            const __gotots_argument_4 = change.RequestedFile;
            const __gotots_results_4 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_2).GetDefaultProject(__gotots_argument_4);
            __gotots_store_1.store(FirstResult$Named_tspath$Path(__gotots_results_4[0], RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$PointerTo_Named_compiler$Program(__gotots_results_4[1])])), new GoEmptyStruct);
            if (!MapBuilder__from_dirty.Has<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined>((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).specifierCache, change.RequestedFile)) {
                const __gotots_receiver_3 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).specifierCache;
                const __gotots_argument_5 = change.RequestedFile;
                const __gotots_struct_1 = SyncMap__from_collections.$zero<Path__from_tspath, gostring>();
                const __gotots_argument_6 = tsonicTypeScriptRuntime.location<SyncMap__from_collections<Path__from_tspath, gostring>>(__gotots_struct_1);
                MapBuilder__from_dirty.Set<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined>(__gotots_receiver_3, __gotots_argument_5, __gotots_argument_6);
            }
        }
        const __gotots_range_2 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.specifierCache;
        const __gotots_range_keys_2 = __gotots_range_2.keys();
        for (const __gotots_range_value_8 of __gotots_range_keys_2) {
            const __gotots_range_value_9 = __gotots_range_2.lookupOk(__gotots_range_value_8);
            if (!__gotots_range_value_9[1]) {
                continue;
            }
            const __gotots_range_value_10 = __gotots_range_value_8;
            let path = __gotots_range_value_10;
            {
                const __gotots_results_5 = change.OpenFiles.lookupOk(path);
                let ok = __gotots_results_5[1];
                if (!ok && !(path.$value === change.RequestedFile.$value)) {
                    MapBuilder$Delete$Named_tspath$Path$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).specifierCache, path);
                }
            }
        }
        let addedProjects = RuntimeSlice.nil<gostring>(), removedProjects = RuntimeSlice.nil<gostring>();
        DiffMapsFunc$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket$Struct_void(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projects, neededProjects, ($0: RegistryBucket | undefined, $1: GoEmptyStruct): bool => {
            const __gotots_argument_7 = new $goInterfaceAdapter$string("never called because onChanged is nil");
            GoPanic.raise(__gotots_argument_7 === undefined ? GoPanicNilValue.create() : __gotots_argument_7);
            GoPanic.raiseRuntime("unreachable Go function end");
        }, (projectPath: Path__from_tspath, $1: GoEmptyStruct): void => {
            Map$Add$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projects, projectPath, newRegistryBucket());
            addedProjects = addedProjects.append(((void Path__from_tspath,
                "") as string), [projectPath.$value]);
        }, (projectPath: Path__from_tspath, $1: RegistryBucket | undefined): void => {
            Map$Delete$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projects, projectPath);
            removedProjects = removedProjects.append(((void Path__from_tspath,
                "") as string), [projectPath.$value]);
        }, void 0);
        if (!(logger === undefined)) {
            const __gotots_range_3 = addedProjects;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_3.length; __gotots_range_index_0++) {
                const __gotots_range_value_11 = new Path__from_tspath(__gotots_range_3.get(__gotots_range_index_0));
                let projectPath = __gotots_range_value_11;
                LogTree__from_logging.Logf(logger, "Added project: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(projectPath)]));
            }
            const __gotots_range_4 = removedProjects;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_4.length; __gotots_range_index_1++) {
                const __gotots_range_value_12 = new Path__from_tspath(__gotots_range_4.get(__gotots_range_index_1));
                let projectPath = __gotots_range_value_12;
                LogTree__from_logging.Logf(logger, "Removed project: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(projectPath)]));
            }
        }
        let updateDirectory: (($0: Path__from_tspath, $1: gostring, $2: bool) => void) | undefined = (dirPath: Path__from_tspath, dirName: gostring, packageJsonChanged: bool): void => {
            let packageJsonFileName = CombinePaths__from_tspath(dirName, RuntimeSlice.literal<gostring>(["package.json"]));
            const __gotots_receiver_4 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
            const __gotots_receiver_5 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_4).FS();
            const __gotots_argument_8 = CombinePaths__from_tspath(dirName, RuntimeSlice.literal<gostring>(["node_modules"]));
            let hasNodeModules = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_5).DirectoryExists(__gotots_argument_8);
            {
                const __gotots_results_6 = Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$directory((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).directories, dirPath);
                let entry: MapEntry__from_dirty<Path__from_tspath, directory | undefined> | undefined = __gotots_results_6[0];
                let ok = __gotots_results_6[1];
                if (ok) {
                    MapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_autoimport$directory(entry, (dir: directory | undefined): bool => {
                        return packageJsonChanged || (dir ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasNodeModules !== hasNodeModules;
                    }, (dir: directory | undefined): void => {
                        const __gotots_receiver_6 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                        const __gotots_argument_9 = packageJsonFileName;
                        (dir ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageJson = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_6).GetPackageJson(__gotots_argument_9);
                        (dir ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasNodeModules = hasNodeModules;
                    });
                }
                else {
                    const __gotots_receiver_8 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).directories;
                    const __gotots_argument_11 = dirPath;
                    const __gotots_field_0 = dirName;
                    const __gotots_receiver_7 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                    const __gotots_argument_10 = packageJsonFileName;
                    const __gotots_field_1 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_7).GetPackageJson(__gotots_argument_10);
                    const __gotots_argument_12 = new directory(__gotots_field_0, __gotots_field_1, hasNodeModules);
                    Map$Add$Named_tspath$Path$PointerTo_Named_autoimport$directory(__gotots_receiver_8, __gotots_argument_11, __gotots_argument_12);
                }
            }
            if (packageJsonChanged) {
                return;
            }
            if (hasNodeModules) {
                {
                    const __gotots_results_7 = Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeModules, dirPath);
                    let ok = __gotots_results_7[1];
                    if (!ok) {
                        Map$Add$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeModules, dirPath, newRegistryBucket());
                    }
                }
            }
            else {
                Map$TryDelete$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeModules, dirPath);
            }
        };
        let addedNodeModulesDirs = RuntimeSlice.nil<gostring>(), removedNodeModulesDirs = RuntimeSlice.nil<gostring>();
        DiffMapsFunc$Named_tspath$Path$PointerTo_Named_autoimport$directory$string(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.directories, neededDirectories, (dir: directory | undefined, dirName: gostring): bool => {
            let packageJsonUri = FileNameToDocumentURI__from_lsconv(CombinePaths__from_tspath(dirName, RuntimeSlice.literal<gostring>(["package.json"])));
            const __gotots_store_2 = change;
            let __gotots_logical_result_0 = !Set__from_collections.Has<DocumentUri__from_lsproto>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Changed"), packageJsonUri);
            if (__gotots_logical_result_0) {
                const __gotots_store_3 = change;
                __gotots_logical_result_0 = !Set__from_collections.Has<DocumentUri__from_lsproto>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Deleted"), packageJsonUri);
            }
            let __gotots_logical_result_1 = __gotots_logical_result_0;
            if (__gotots_logical_result_1) {
                const __gotots_store_4 = change;
                __gotots_logical_result_1 = !Set__from_collections.Has<DocumentUri__from_lsproto>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Created"), packageJsonUri);
            }
            return __gotots_logical_result_1;
        }, (dirPath: Path__from_tspath, dirName: gostring): void => {
            let hadNodeModules = !(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModules.lookup(dirPath) === undefined);
            const __gotots_callee_1 = updateDirectory;
            const __gotots_argument_13 = dirPath;
            const __gotots_argument_14 = dirName;
            const __gotots_argument_15 = false;
            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
            if (!(logger === undefined)) {
                LogTree__from_logging.Logf(logger, "Added directory: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(dirPath)]));
            }
            {
                const __gotots_results_8 = Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeModules, dirPath);
                let hasNow = __gotots_results_8[1];
                if (hasNow && !hadNodeModules) {
                    addedNodeModulesDirs = addedNodeModulesDirs.append(((void Path__from_tspath,
                        "") as string), [dirPath.$value]);
                }
            }
        }, (dirPath: Path__from_tspath, dir: directory | undefined): void => {
            let hadNodeModules = !(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModules.lookup(dirPath) === undefined);
            Map$Delete$Named_tspath$Path$PointerTo_Named_autoimport$directory((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).directories, dirPath);
            Map$TryDelete$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeModules, dirPath);
            if (!(logger === undefined)) {
                LogTree__from_logging.Logf(logger, "Removed directory: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(dirPath)]));
            }
            if (hadNodeModules) {
                removedNodeModulesDirs = removedNodeModulesDirs.append(((void Path__from_tspath,
                    "") as string), [dirPath.$value]);
            }
        }, (dirPath: Path__from_tspath, dir: directory | undefined, dirName: gostring): void => {
            const __gotots_callee_2 = updateDirectory;
            const __gotots_argument_16 = dirPath;
            const __gotots_argument_17 = dirName;
            const __gotots_argument_18 = true;
            (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16, __gotots_argument_17, __gotots_argument_18);
            if (!(logger === undefined)) {
                LogTree__from_logging.Logf(logger, "Changed directory: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(dirPath)]));
            }
        });
        if (!(logger === undefined)) {
            const __gotots_range_5 = addedNodeModulesDirs;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_5.length; __gotots_range_index_2++) {
                const __gotots_range_value_13 = new Path__from_tspath(__gotots_range_5.get(__gotots_range_index_2));
                let dirPath = __gotots_range_value_13;
                LogTree__from_logging.Logf(logger, "Added node_modules bucket: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(dirPath)]));
            }
            const __gotots_range_6 = removedNodeModulesDirs;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_6.length; __gotots_range_index_3++) {
                const __gotots_range_value_14 = new Path__from_tspath(__gotots_range_6.get(__gotots_range_index_3));
                let dirPath = __gotots_range_value_14;
                LogTree__from_logging.Logf(logger, "Removed node_modules bucket: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(dirPath)]));
            }
            LogTree__from_logging.Logf(logger, "Updated buckets and directories in %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(time__from_gostdlib.Since(named_time.TimeOperations.$copy(start)))]));
        }
    }
    static $go$private$autoimport$updateIndexes(b: registryBuilder | undefined, ctx: GoInterface | undefined, change: RegistryChange, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        class nodeModulesBucketTask {
            declare private readonly $goType: void;
            public constructor(public entry: MapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> | undefined, public dependencyNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public dirName: gostring, public dirPath: Path__from_tspath, public isUpdate: bool, public existingBucket: RegistryBucket | undefined, public dirtyPackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public packageNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public directoryPackageNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public discovered: RuntimeSlice<discoveredPackage | undefined>, public discoverErr: $goInterface$Interface_Method_Error_void_to_string | undefined) {
            }
            declare private readonly then?: never;
        }
        const __gotots_receiver_9 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_argument_23 = change.RequestedFile;
        const __gotots_results_16 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_9).GetDefaultProject(__gotots_argument_23);
        let projectPath = __gotots_results_16[0];
        if (projectPath.$value ===
            ((void Path__from_tspath,
                "") as string)) {
            return;
        }
        let wg = named_sync.SyncWaitGroupOperations.$zero();
        let allResolvedPackageNames: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined> = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_collections$SetOf_string.make(0, []);
        let projectReferenceOutputs: GoMapValue<Path__from_tspath, gostring> = $goMap$MapOf_Named_tspath$Path_To_string.make(0, []);
        let allDeepImportPackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
            M: $goMap$MapOf_string_To_Struct_void.nil()
        }));
        Map$Range$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projects, (entry: MapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> | undefined): bool => {
            const __gotots_receiver_10 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
            const __gotots_store_20 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
            const __gotots_argument_24 = mapEntry$Key$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
            }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
            }));
            let program: {
                value: Program__from_compiler;
            } | undefined = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_10).GetProgramForProject(__gotots_argument_24);
            if (!(program === undefined)) {
                const __gotots_store_22 = allResolvedPackageNames;
                const __gotots_store_21 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                __gotots_store_22.store(mapEntry$Key$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                    return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                    return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                })), getResolvedPackageNames(ctx, program));
                addProjectReferenceOutputMappings(program, projectReferenceOutputs);
                const __gotots_range_11 = Set$Keys$string(Program__from_compiler.DeepImportPackageNames(program));
                const __gotots_range_keys_7 = __gotots_range_11.keys();
                for (const __gotots_range_value_28 of __gotots_range_keys_7) {
                    const __gotots_range_value_29 = __gotots_range_11.lookupOk(__gotots_range_value_28);
                    if (!__gotots_range_value_29[1]) {
                        continue;
                    }
                    const __gotots_range_value_30 = __gotots_range_value_28;
                    let name = __gotots_range_value_30;
                    Set$Add$string(allDeepImportPackages, name);
                }
            }
            return true;
        });
        const __gotots_receiver_13 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).userPreferences;
        const __gotots_receiver_11 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_receiver_12 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_11).FS();
        const __gotots_argument_25 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_12).UseCaseSensitiveFileNames();
        let fileExcludePatterns: SpecMatcher__from_vfsmatch | undefined = __gotots_receiver_13.ParsedAutoImportFileExcludePatterns(__gotots_argument_25);
        let targetRecursivePackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = void 0;
        if (!Tristate_IsTrue__from_core((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).userPreferences.AutoImportEntrypointDirectorySearch)) {
            targetRecursivePackages = allDeepImportPackages;
        }
        let nodeModulesTasks = RuntimeSlice.nil<nodeModulesBucketTask | undefined>();
        ForEachAncestorDirectoryPath$Interface_void(change.RequestedFile, (dirPath: Path__from_tspath): [
            $goInterface$Interface_void | undefined,
            bool
        ] => {
            {
                const __gotots_results_17 = Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeModules, dirPath);
                let nodeModulesBucket: MapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> | undefined = __gotots_results_17[0];
                let ok = __gotots_results_17[1];
                if (ok) {
                    const __gotots_results_18 = Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$directory((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).directories, dirPath);
                    const __gotots_store_23 = MapEntry__from_dirty.$storageOf((FirstResult$PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_autoimport$directory(__gotots_results_18[0], RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$bool(__gotots_results_18[1])])) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                    let dirName = (mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$directory(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined>, mapEntry__from_dirty<Path__from_tspath, directory | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined>): mapEntry__from_dirty<Path__from_tspath, directory | undefined> => {
                        return mapEntry__from_dirty.$fromStorage<Path__from_tspath, directory | undefined>($go$storage);
                    }, ($go$value: mapEntry__from_dirty<Path__from_tspath, directory | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, directory | undefined> => {
                        return mapEntry__from_dirty.$storageOf<Path__from_tspath, directory | undefined>($go$value);
                    })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name;
                    let dependencies: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = registryBuilder.$go$private$autoimport$computeDependenciesForNodeModulesDirectory(b, RegistryChange.$copy(change), allResolvedPackageNames, dirName, dirPath);
                    const __gotots_store_24 = MapEntry__from_dirty.$storageOf((nodeModulesBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                    let bucketState = BucketState.$copy((mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                        return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                    }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                        return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                    })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state);
                    let __gotots_logical_result_2 = BucketState.$storageOf(bucketState).multipleFilesDirty;
                    if (!__gotots_logical_result_2) {
                        const __gotots_store_25 = MapEntry__from_dirty.$storageOf((nodeModulesBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                        __gotots_logical_result_2 = !Set$Equals$string((mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                            return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                        }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                            return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                        })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).DependencyNames, dependencies);
                    }
                    let needsFullRebuild = __gotots_logical_result_2 || !bucketBuildPreferences.$fromStorage(BucketState.$storageOf(bucketState).buildPreferences).Equal(bucketBuildPreferencesFromUserPreferences(UserPreferences__from_lsutil.$copy((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).userPreferences))) || !recursiveSearchSubset(targetRecursivePackages, BucketState.$storageOf(bucketState).recursiveSearchPackages);
                    let dirtyPackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = bucketState.DirtyPackages();
                    let canDoGranularUpdate = !needsFullRebuild && Set$Len$string(dirtyPackages) > 0;
                    if (needsFullRebuild) {
                        nodeModulesTasks = nodeModulesTasks.append(void 0, [new nodeModulesBucketTask(nodeModulesBucket, dependencies, dirName, dirPath, false, void 0, void 0, void 0, void 0, RuntimeSlice.nil<discoveredPackage | undefined>(), void 0),]);
                    }
                    else if (canDoGranularUpdate) {
                        const __gotots_argument_26 = nodeModulesTasks;
                        const __gotots_field_2 = nodeModulesBucket;
                        const __gotots_field_3 = dependencies;
                        const __gotots_field_4 = dirName;
                        const __gotots_field_5 = dirPath;
                        const __gotots_field_6 = true;
                        const __gotots_store_26 = MapEntry__from_dirty.$storageOf((nodeModulesBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                        const __gotots_field_7 = mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                            return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                        }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                            return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                        }));
                        const __gotots_argument_27 = new nodeModulesBucketTask(__gotots_field_2, __gotots_field_3, __gotots_field_4, __gotots_field_5, __gotots_field_6, __gotots_field_7, dirtyPackages, void 0, void 0, RuntimeSlice.nil<discoveredPackage | undefined>(), void 0);
                        nodeModulesTasks = __gotots_argument_26.append(void 0, [__gotots_argument_27]);
                    }
                }
            }
            return [void 0, false];
        });
        let nodeModulesLogger: {
            value: LogTree__from_logging;
        } | undefined = void 0;
        if (!(logger === undefined) && nodeModulesTasks.length > 0) {
            nodeModulesLogger = LogTree__from_logging.Fork(logger, "Building node_modules indexes");
        }
        let discoveryStart = time__from_gostdlib.Now();
        const __gotots_range_12 = nodeModulesTasks;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_12.length; __gotots_range_index_4++) {
            const __gotots_range_value_31 = __gotots_range_12.get(__gotots_range_index_4);
            let task: nodeModulesBucketTask | undefined = __gotots_range_value_31;
            sync__from_gostdlib.WaitGroup.Go(wg, (): void => {
                if ((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isUpdate) {
                    (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageNames = (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dirtyPackages;
                }
                else {
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
                    const __gotots_store_27 = (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_28 = CombinePaths__from_tspath((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dirName, RuntimeSlice.literal<gostring>(["node_modules"]));
                    const __gotots_receiver_14 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                    const __gotots_argument_29 = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_14).FS();
                    const __gotots_results_19 = getPackageNamesInNodeModules(__gotots_argument_28, __gotots_argument_29);
                    __gotots_store_27.directoryPackageNames = __gotots_results_19[0];
                    err = __gotots_results_19[1];
                    if (!(err === undefined)) {
                        (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discoverErr = err;
                        return;
                    }
                    (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageNames = Coalesce$PointerTo_Named_collections$SetOf_string$Named_collections$SetOf_string((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dependencyNames, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).directoryPackageNames);
                }
                (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discovered = registryBuilder.$go$private$autoimport$discoverBucketPackages(b, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageNames, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dirName, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dirPath);
            });
        }
        sync__from_gostdlib.WaitGroup.Wait(wg);
        if (!(nodeModulesLogger === undefined)) {
            LogTree__from_logging.Logf(nodeModulesLogger, "Discovered packages: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(time__from_gostdlib.Since(named_time.TimeOperations.$copy(discoveryStart)))]));
        }
        let extractionStart = time__from_gostdlib.Now();
        let seen: GoMapValue<gostring, bool> = GoMap__from_gotots_runtime.make<gostring, bool>(false, 0, []);
        let extractionCache: GoMapValue<gostring, perPackageExtractionResult | undefined> = $goMap$MapOf_string_To_PointerTo_Named_autoimport$perPackageExtractionResult.make(0, []);
        let extractionMu = named_sync.SyncMutexOperations.$zero();
        let typesFallbackCandidates = RuntimeSlice.nil<discoveredPackage | undefined>();
        const __gotots_range_13 = nodeModulesTasks;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_13.length; __gotots_range_index_5++) {
            const __gotots_range_value_32 = __gotots_range_13.get(__gotots_range_index_5);
            let task: nodeModulesBucketTask | undefined = __gotots_range_value_32;
            if (!((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discoverErr === undefined)) {
                continue;
            }
            const __gotots_range_14 = (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discovered;
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_14.length; __gotots_range_index_6++) {
                const __gotots_range_value_33 = __gotots_range_14.get(__gotots_range_index_6);
                let pkg: discoveredPackage | undefined = __gotots_range_value_33;
                if ((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).realpath !== "") {
                    if (!seen.lookup((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).realpath)) {
                        seen.store((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).realpath, true);
                        let enableDirSearch = targetRecursivePackages === undefined || Set__from_collections.Has<gostring>(targetRecursivePackages, (pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageName) || Set__from_collections.Has<gostring>($state.knownRecursiveSearchPackages, (pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageName);
                        if (enableDirSearch && !(targetRecursivePackages === undefined)) {
                            Set$Add$string(targetRecursivePackages, (pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageName);
                        }
                        sync__from_gostdlib.WaitGroup.Go(wg, (): void => {
                            const __gotots_receiver_15 = ctx;
                            if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_15).Err() === undefined)) {
                                return;
                            }
                            let result: perPackageExtractionResult | undefined = registryBuilder.$go$private$autoimport$extractPackage(b, ctx, (pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageJson, (pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageName, projectReferenceOutputs, fileExcludePatterns, enableDirSearch);
                            if (!(result === undefined)) {
                                sync__from_gostdlib.Mutex.Lock(extractionMu);
                                extractionCache.store((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).realpath, result);
                                sync__from_gostdlib.Mutex.Unlock(extractionMu);
                            }
                        });
                    }
                    if ((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typesRealpath !== "") {
                        typesFallbackCandidates = typesFallbackCandidates.append(void 0, [pkg]);
                    }
                }
                else if ((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typesRealpath !== "") {
                    if (!seen.lookup((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typesRealpath)) {
                        seen.store((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typesRealpath, true);
                        if (!(targetRecursivePackages === undefined)) {
                            Set$Add$string(targetRecursivePackages, (pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageName);
                        }
                        sync__from_gostdlib.WaitGroup.Go(wg, (): void => {
                            const __gotots_receiver_16 = ctx;
                            if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_16).Err() === undefined)) {
                                return;
                            }
                            let result: perPackageExtractionResult | undefined = registryBuilder.$go$private$autoimport$extractPackage(b, ctx, (pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typesPackageJson, (pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageName, projectReferenceOutputs, fileExcludePatterns, true);
                            if (!(result === undefined)) {
                                sync__from_gostdlib.Mutex.Lock(extractionMu);
                                extractionCache.store((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typesRealpath, result);
                                sync__from_gostdlib.Mutex.Unlock(extractionMu);
                            }
                        });
                    }
                }
            }
        }
        sync__from_gostdlib.WaitGroup.Wait(wg);
        const __gotots_range_15 = typesFallbackCandidates;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_15.length; __gotots_range_index_7++) {
            const __gotots_range_value_34 = __gotots_range_15.get(__gotots_range_index_7);
            let pkg: discoveredPackage | undefined = __gotots_range_value_34;
            if (!(extractionCache.lookup((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).realpath) === undefined) || seen.lookup((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typesRealpath)) {
                continue;
            }
            seen.store((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typesRealpath, true);
            if (!(targetRecursivePackages === undefined)) {
                Set$Add$string(targetRecursivePackages, (pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageName);
            }
            sync__from_gostdlib.WaitGroup.Go(wg, (): void => {
                const __gotots_receiver_17 = ctx;
                if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_17).Err() === undefined)) {
                    return;
                }
                let result: perPackageExtractionResult | undefined = registryBuilder.$go$private$autoimport$extractPackage(b, ctx, (pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typesPackageJson, (pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageName, projectReferenceOutputs, fileExcludePatterns, true);
                if (!(result === undefined)) {
                    sync__from_gostdlib.Mutex.Lock(extractionMu);
                    extractionCache.store((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typesRealpath, result);
                    sync__from_gostdlib.Mutex.Unlock(extractionMu);
                }
            });
        }
        sync__from_gostdlib.WaitGroup.Wait(wg);
        if (!(nodeModulesLogger === undefined)) {
            LogTree__from_logging.Logf(nodeModulesLogger, "Extracted exports: %v (%d packages)", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(time__from_gostdlib.Since(named_time.TimeOperations.$copy(extractionStart))), new $goInterfaceAdapter$int(seen.length())]));
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).uniquePackageCount = seen.length();
        let allResults = RuntimeSlice.nil<bucketBuildResult | undefined>();
        const __gotots_range_16 = nodeModulesTasks;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_16.length; __gotots_range_index_8++) {
            const __gotots_range_value_35 = __gotots_range_16.get(__gotots_range_index_8);
            let task: nodeModulesBucketTask | undefined = __gotots_range_value_35;
            let br: bucketBuildResult | undefined = new bucketBuildResult((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entry, void 0, void 0, $goMap$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint.nil(), RuntimeSlice.nil<gostring>(), void 0, void 0);
            allResults = allResults.append(void 0, [br]);
            if (!((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discoverErr === undefined)) {
                (br ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err = (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discoverErr;
                continue;
            }
            sync__from_gostdlib.WaitGroup.Go(wg, (): void => {
                if ((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isUpdate) {
                    registryBuilder.$go$private$autoimport$updateNodeModulesBucket(b, ctx, br, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).existingBucket, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dirtyPackages, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discovered, extractionCache, targetRecursivePackages, LogTree__from_logging.Fork(nodeModulesLogger, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dirName));
                }
                else {
                    registryBuilder.$go$private$autoimport$buildNodeModulesBucket(b, ctx, br, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dependencyNames, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dirPath, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).discovered, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).directoryPackageNames, extractionCache, targetRecursivePackages, LogTree__from_logging.Fork(nodeModulesLogger, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dirName));
                }
            });
        }
        {
            const __gotots_results_20 = Map$Get$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).projects, projectPath);
            let project: MapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> | undefined = __gotots_results_20[0];
            let hasProject = __gotots_results_20[1];
            if (hasProject) {
                const __gotots_receiver_18 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_30 = projectPath;
                let program: {
                    value: Program__from_compiler;
                } | undefined = goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_18).GetProgramForProject(__gotots_argument_30);
                let resolvedPackageNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = allResolvedPackageNames.lookup(projectPath);
                const __gotots_store_28 = MapEntry__from_dirty.$storageOf((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                let __gotots_logical_result_3 = (mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                    return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                    return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state.$go$private$autoimport$hasDirtyFileBesides(change.RequestedFile);
                if (!__gotots_logical_result_3) {
                    const __gotots_store_29 = MapEntry__from_dirty.$storageOf((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                    __gotots_logical_result_3 = !bucketBuildPreferences.$fromStorage(BucketState.$storageOf((mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                        return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                    }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                        return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                    })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).buildPreferences).Equal(bucketBuildPreferencesFromUserPreferences(UserPreferences__from_lsutil.$copy((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).userPreferences)));
                }
                let shouldRebuild = __gotots_logical_result_3;
                let __gotots_logical_result_4 = !shouldRebuild;
                if (__gotots_logical_result_4) {
                    const __gotots_store_30 = MapEntry__from_dirty.$storageOf((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                    const __gotots_binary_operand_0 = ((void newProgramStructure,
                        BucketState.$storageOf((mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                            return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                        }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                            return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                        })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).newProgramStructure) as int);
                    const __gotots_binary_operand_1 = 0;
                    __gotots_logical_result_4 = __gotots_binary_operand_0 > __gotots_binary_operand_1;
                }
                if (__gotots_logical_result_4) {
                    const __gotots_store_31 = MapEntry__from_dirty.$storageOf((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                    let __gotots_logical_result_5 = !Set$Equals$string((mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                        return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                    }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                        return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                    })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedPackageNames, resolvedPackageNames);
                    if (!__gotots_logical_result_5) {
                        const __gotots_argument_31 = program;
                        const __gotots_store_32 = MapEntry__from_dirty.$storageOf((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                        const __gotots_argument_32 = mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                            return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                        }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                            return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                        }));
                        __gotots_logical_result_5 = hasNewNonNodeModulesFiles(__gotots_argument_31, __gotots_argument_32);
                    }
                    if (__gotots_logical_result_5) {
                        shouldRebuild = true;
                    }
                    else {
                        MapEntry$Change$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(project, (b__shadow_1: RegistryBucket | undefined): void => {
                            BucketState.$storageOf((b__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).newProgramStructure = newProgramStructureFalse$constant().$value;
                        });
                    }
                }
                if (shouldRebuild) {
                    let br: bucketBuildResult | undefined = new bucketBuildResult(project, void 0, void 0, $goMap$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint.nil(), RuntimeSlice.nil<gostring>(), void 0, void 0);
                    allResults = allResults.append(void 0, [br]);
                    sync__from_gostdlib.WaitGroup.Go(wg, (): void => {
                        registryBuilder.$go$private$autoimport$buildProjectBucket(b, ctx, br, projectPath, resolvedPackageNames, LogTree__from_logging.Fork(logger, "Building project bucket " + projectPath.$value));
                    });
                }
            }
        }
        sync__from_gostdlib.WaitGroup.Wait(wg);
        const __gotots_range_17 = allResults;
        for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_17.length; __gotots_range_index_9++) {
            const __gotots_range_value_36 = __gotots_range_17.get(__gotots_range_index_9);
            let br: bucketBuildResult | undefined = __gotots_range_value_36;
            if (!((br ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err === undefined)) {
                continue;
            }
            const __gotots_range_18 = (br ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).removedEntrypointPaths;
            for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_18.length; __gotots_range_index_10++) {
                const __gotots_range_value_37 = new Path__from_tspath(__gotots_range_18.get(__gotots_range_index_10));
                let path = __gotots_range_value_37;
                MapBuilder$Delete$Named_tspath$Path$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints, path);
            }
            const __gotots_range_19 = (br ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints;
            const __gotots_range_keys_8 = __gotots_range_19.keys();
            for (const __gotots_range_value_38 of __gotots_range_keys_8) {
                const __gotots_range_value_39 = __gotots_range_19.lookupOk(__gotots_range_value_38);
                if (!__gotots_range_value_39[1]) {
                    continue;
                }
                const __gotots_range_value_40 = __gotots_range_value_38;
                const __gotots_range_value_41 = __gotots_range_value_39[0];
                let path = __gotots_range_value_40;
                let entries = __gotots_range_value_41;
                MapBuilder__from_dirty.Set<Path__from_tspath, RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>, RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>>((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints, path, entries);
            }
            MapEntry$Replace$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((br ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entry, (br ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bucket);
        }
        let secondPassStart = time__from_gostdlib.Now();
        let secondPassFileCount = 0;
        const __gotots_range_20 = allResults;
        for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_20.length; __gotots_range_index_11++) {
            const __gotots_range_value_42 = __gotots_range_20.get(__gotots_range_index_11);
            let br: bucketBuildResult | undefined = __gotots_range_value_42;
            if (!((br ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err === undefined)) {
                continue;
            }
            if ((br ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleFailedAmbientModuleLookupTargets === undefined) {
                continue;
            }
            let rootFiles: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> = $goMap$MapOf_string_To_PointerTo_Named_ast$SourceFile.make(0, []);
            const __gotots_range_21 = named_iter.IterSeqValueOperations.$project(SyncSet$Keys$string((br ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleFailedAmbientModuleLookupTargets));
            if (__gotots_range_21 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_0 = 1;
            __gotots_range_21(($argument0: gostring): bool => {
                if (__gotots_range_state_0 === 0) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                if (__gotots_range_state_0 === -1) {
                    GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                }
                if (__gotots_range_state_0 === -2) {
                    GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                }
                if (__gotots_range_state_0 === 2) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                __gotots_range_state_0 = -1;
                const __gotots_range_value_43 = $argument0;
                let target = __gotots_range_value_43;
                const __gotots_receiver_19 = b;
                const __gotots_argument_33 = target;
                const __gotots_store_33 = MapEntry__from_dirty.$storageOf(((br ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                const __gotots_argument_34 = mapEntry$Key$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>, mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> => {
                    return mapEntry__from_dirty.$fromStorage<Path__from_tspath, RegistryBucket | undefined>($go$storage);
                }, ($go$value: mapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined>): mapEntry__from_dirty$Storage<Path__from_tspath, RegistryBucket | undefined> => {
                    return mapEntry__from_dirty.$storageOf<Path__from_tspath, RegistryBucket | undefined>($go$value);
                }));
                const __gotots_range_22 = registryBuilder.$go$private$autoimport$resolveAmbientModuleName(__gotots_receiver_19, __gotots_argument_33, __gotots_argument_34);
                for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_22.length; __gotots_range_index_12++) {
                    const __gotots_range_value_44 = __gotots_range_22.get(__gotots_range_index_12);
                    let fileName = __gotots_range_value_44;
                    {
                        const __gotots_results_21 = rootFiles.lookupOk(fileName);
                        let exists = __gotots_results_21[1];
                        if (exists) {
                            continue;
                        }
                    }
                    const __gotots_store_34 = rootFiles;
                    const __gotots_store_35 = fileName;
                    const __gotots_receiver_20 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                    const __gotots_argument_36 = fileName;
                    const __gotots_callee_13 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                    const __gotots_argument_35 = fileName;
                    const __gotots_argument_37 = (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_35);
                    __gotots_store_34.store(__gotots_store_35, goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_20).GetSourceFile(__gotots_argument_36, __gotots_argument_37));
                    secondPassFileCount++;
                }
                __gotots_range_state_0 = 1;
                return true;
            });
            if (__gotots_range_state_0 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            __gotots_range_state_0 = -2;
            if (rootFiles.length() > 0) {
                let moduleResolver: {
                    value: Resolver__from___go_module;
                } | undefined = NewResolverWithOptions__from___go_module((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host, $state__core.EmptyCompilerOptions, "", "", ResolverOptions__from___go_module.$copy((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolverOptions));
                let aliasResolver__shadow_1: {
                    value: aliasResolver;
                } | undefined = newAliasResolver(Collect$PointerTo_Named_ast$SourceFile(Values$MapOf_string_To_PointerTo_Named_ast$SourceFile$string$PointerTo_Named_ast$SourceFile(rootFiles)), $goMap$MapOf_Named_tspath$Path_To_Named_autoimport$pathAndFileName.nil(), (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host, moduleResolver, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath, ($0: HasFileName__from_ast | undefined, $1: gostring): void => {
                });
                const __gotots_results_22 = NewChecker__from_checker(new $goInterfaceAdapter$PointerTo_Named_autoimport$aliasResolver(aliasResolver__shadow_1), void 0);
                let ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined = __gotots_results_22[0];
                SyncMap$Range$Named_tspath$Path$PointerTo_Named_autoimport$failedAmbientModuleLookupSource((br ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleFailedAmbientModuleLookupSources, (path: Path__from_tspath, source: {
                    value: failedAmbientModuleLookupSource;
                } | undefined): bool => {
                    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = aliasResolver.GetSourceFile(aliasResolver__shadow_1, (source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileName);
                    const __gotots_receiver_24 = b;
                    const __gotots_argument_38 = (source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageName;
                    const __gotots_argument_39 = ch;
                    const __gotots_argument_40 = moduleResolver;
                    const __gotots_receiver_21 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                    const __gotots_receiver_22 = goInterfaceNonNil(goInterfaceNonNil<RegistryCloneHost>(__gotots_receiver_21).FS());
                    const __gotots_argument_41 = DeferredCallableRegistry.register(($argument0: gostring): gostring => __gotots_receiver_22.Realpath($argument0), ($go$recovery: GoRecovery, $argument0: gostring): gostring => {
                        const __gotots_receiver_23: FS__from_vfs = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_22);
                        const __gotots_deferred_0 = DeferredCallableRegistry.resolveMethod($goInterfaceMethod$Realpath$string_to_string, __gotots_receiver_23);
                        return __gotots_deferred_0 === undefined ? __gotots_receiver_23.Realpath($argument0) : __gotots_deferred_0($go$recovery, __gotots_receiver_23, $argument0);
                    });
                    let extractor: exportExtractor | undefined = registryBuilder.$go$private$autoimport$newExportExtractor(__gotots_receiver_24, __gotots_argument_38, __gotots_argument_39, __gotots_argument_40, __gotots_argument_41);
                    let fileExports = exportExtractor.$go$private$autoimport$extractFromFile(extractor, sourceFile);
                    const __gotots_range_23 = fileExports;
                    for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_23.length; __gotots_range_index_13++) {
                        const __gotots_range_value_45 = __gotots_range_23.get(__gotots_range_index_13);
                        let exp: {
                            value: Export;
                        } | undefined = __gotots_range_value_45;
                        Index$insertAsWords$PointerTo_Named_autoimport$Export(((br ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Index, exp);
                    }
                    return true;
                });
            }
        }
        if (!(nodeModulesLogger === undefined)) {
            if (secondPassFileCount > 0) {
                LogTree__from_logging.Logf(nodeModulesLogger, "%d files required second pass, took %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(secondPassFileCount), new GoInterfaceAdapter(time__from_gostdlib.Since(named_time.TimeOperations.$copy(secondPassStart)))]));
            }
            LogTree__from_logging.Logf(nodeModulesLogger, "Total: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(time__from_gostdlib.Since(named_time.TimeOperations.$copy(discoveryStart)))]));
        }
    }
    static $go$private$autoimport$updateNodeModulesBucket(b: registryBuilder | undefined, ctx: GoInterface | undefined, result: bucketBuildResult | undefined, existingBucket: RegistryBucket | undefined, dirtyPackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, discovered: RuntimeSlice<discoveredPackage | undefined>, extractionCache: GoMapValue<gostring, perPackageExtractionResult | undefined>, recursiveSearchPackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        const __gotots_receiver_47 = ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_47).Err() === undefined)) {
            const __gotots_receiver_48 = ctx;
            (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err = goInterfaceNonNil<GoInterface>(__gotots_receiver_48).Err();
            return;
        }
        let start = time__from_gostdlib.Now();
        let extraction: packageExtractionResult | undefined = installExtractions(discovered, extractionCache);
        let indexStart = time__from_gostdlib.Now();
        let newIndex: Index<{
            value: Export;
        } | undefined> | undefined = Index$Clone$PointerTo_Named_autoimport$Export((existingBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Index, (exp: {
            value: Export;
        } | undefined): bool => {
            return !Set__from_collections.Has<gostring>(dirtyPackages, (exp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageName);
        });
        let newPackageFiles: GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>> = Clone$MapOf_string_To_MapOf_Named_tspath$Path_To_string$string$MapOf_Named_tspath$Path_To_string((existingBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PackageFiles);
        const __gotots_range_35 = Set$Keys$string(dirtyPackages);
        const __gotots_range_keys_16 = __gotots_range_35.keys();
        for (const __gotots_range_value_75 of __gotots_range_keys_16) {
            const __gotots_range_value_76 = __gotots_range_35.lookupOk(__gotots_range_value_75);
            if (!__gotots_range_value_76[1]) {
                continue;
            }
            const __gotots_range_value_77 = __gotots_range_value_75;
            let pkgName = __gotots_range_value_77;
            newPackageFiles.delete(pkgName);
        }
        Copy$MapOf_string_To_MapOf_Named_tspath$Path_To_string$MapOf_string_To_MapOf_Named_tspath$Path_To_string$string$MapOf_Named_tspath$Path_To_string(newPackageFiles, (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageFiles);
        let newPaths: GoMapValue<Path__from_tspath, gostring> = $goMap$MapOf_Named_tspath$Path_To_string.make((existingBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Paths.length(), []);
        const __gotots_range_36 = (existingBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Paths;
        const __gotots_range_keys_17 = __gotots_range_36.keys();
        for (const __gotots_range_value_78 of __gotots_range_keys_17) {
            const __gotots_range_value_79 = __gotots_range_36.lookupOk(__gotots_range_value_78);
            if (!__gotots_range_value_79[1]) {
                continue;
            }
            const __gotots_range_value_80 = __gotots_range_value_78;
            const __gotots_range_value_81 = __gotots_range_value_79[0];
            let path = __gotots_range_value_80;
            let pkgName = __gotots_range_value_81;
            if (Set__from_collections.Has<gostring>(dirtyPackages, pkgName)) {
                continue;
            }
            newPaths.store(path, pkgName);
        }
        const __gotots_range_37 = Set$Keys$string((extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).workspacePackages);
        const __gotots_range_keys_18 = __gotots_range_37.keys();
        for (const __gotots_range_value_82 of __gotots_range_keys_18) {
            const __gotots_range_value_83 = __gotots_range_37.lookupOk(__gotots_range_value_82);
            if (!__gotots_range_value_83[1]) {
                continue;
            }
            const __gotots_range_value_84 = __gotots_range_value_82;
            let pkgName = __gotots_range_value_84;
            {
                const __gotots_results_33 = (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageFiles.lookupOk(pkgName);
                let files: GoMapValue<Path__from_tspath, gostring> = __gotots_results_33[0];
                let ok = __gotots_results_33[1];
                if (ok) {
                    const __gotots_range_38 = files;
                    const __gotots_range_keys_19 = __gotots_range_38.keys();
                    for (const __gotots_range_value_85 of __gotots_range_keys_19) {
                        const __gotots_range_value_86 = __gotots_range_38.lookupOk(__gotots_range_value_85);
                        if (!__gotots_range_value_86[1]) {
                            continue;
                        }
                        const __gotots_range_value_87 = __gotots_range_value_85;
                        let path = __gotots_range_value_87;
                        newPaths.store(path, pkgName);
                    }
                }
            }
        }
        let newAmbientModuleNames: GoMapValue<gostring, RuntimeSlice<gostring>> = $goMap$MapOf_string_To_SliceOf_string.make((existingBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).AmbientModuleNames.length(), []);
        const __gotots_range_39 = (existingBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).AmbientModuleNames;
        const __gotots_range_keys_20 = __gotots_range_39.keys();
        for (const __gotots_range_value_88 of __gotots_range_keys_20) {
            const __gotots_range_value_89 = __gotots_range_39.lookupOk(__gotots_range_value_88);
            if (!__gotots_range_value_89[1]) {
                continue;
            }
            const __gotots_range_value_90 = __gotots_range_value_88;
            const __gotots_range_value_91 = __gotots_range_value_89[0];
            let moduleName = __gotots_range_value_90;
            let fileNames = __gotots_range_value_91;
            let filtered = RuntimeSlice.nil<gostring>();
            const __gotots_range_40 = fileNames;
            for (let __gotots_range_index_18 = 0; __gotots_range_index_18 < __gotots_range_40.length; __gotots_range_index_18++) {
                const __gotots_range_value_92 = __gotots_range_40.get(__gotots_range_index_18);
                let fileName = __gotots_range_value_92;
                const __gotots_callee_20 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_argument_62 = fileName;
                let path = (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_62);
                {
                    const __gotots_results_34 = (existingBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Paths.lookupOk(path);
                    let pkgName = __gotots_results_34[0];
                    let ok = __gotots_results_34[1];
                    if (ok && Set__from_collections.Has<gostring>(dirtyPackages, pkgName)) {
                        continue;
                    }
                }
                filtered = filtered.append("", [fileName]);
            }
            if (filtered.length > 0) {
                newAmbientModuleNames.store(moduleName, filtered);
            }
        }
        const __gotots_range_41 = (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ambientModuleNames;
        const __gotots_range_keys_21 = __gotots_range_41.keys();
        for (const __gotots_range_value_93 of __gotots_range_keys_21) {
            const __gotots_range_value_94 = __gotots_range_41.lookupOk(__gotots_range_value_93);
            if (!__gotots_range_value_94[1]) {
                continue;
            }
            const __gotots_range_value_95 = __gotots_range_value_93;
            const __gotots_range_value_96 = __gotots_range_value_94[0];
            let moduleName = __gotots_range_value_95;
            let fileNames = __gotots_range_value_96;
            newAmbientModuleNames.store(moduleName, goSliceAppendSlice<gostring>(newAmbientModuleNames.lookup(moduleName), fileNames, ""));
        }
        let removedEntrypointPaths = RuntimeSlice.nil<gostring>();
        const __gotots_range_42 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entrypoints;
        const __gotots_range_keys_22 = __gotots_range_42.keys();
        for (const __gotots_range_value_97 of __gotots_range_keys_22) {
            const __gotots_range_value_98 = __gotots_range_42.lookupOk(__gotots_range_value_97);
            if (!__gotots_range_value_98[1]) {
                continue;
            }
            const __gotots_range_value_99 = __gotots_range_value_97;
            let path = __gotots_range_value_99;
            {
                const __gotots_results_35 = (existingBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Paths.lookupOk(path);
                let pkgName = __gotots_results_35[0];
                let ok = __gotots_results_35[1];
                if (ok && Set__from_collections.Has<gostring>(dirtyPackages, pkgName)) {
                    removedEntrypointPaths = removedEntrypointPaths.append(((void Path__from_tspath,
                        "") as string), [path.$value]);
                }
            }
        }
        let newEntrypoints: GoMapValue<Path__from_tspath, RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>> = $goMap$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint.make(0, []);
        const __gotots_range_43 = (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints;
        for (let __gotots_range_index_19 = 0; __gotots_range_index_19 < __gotots_range_43.length; __gotots_range_index_19++) {
            const __gotots_range_value_100 = __gotots_range_43.get(__gotots_range_index_19);
            let entrypointSet = __gotots_range_value_100;
            const __gotots_range_44 = entrypointSet;
            for (let __gotots_range_index_20 = 0; __gotots_range_index_20 < __gotots_range_44.length; __gotots_range_index_20++) {
                const __gotots_range_value_101 = __gotots_range_44.get(__gotots_range_index_20);
                let entrypoint: ResolvedEntrypoint__from___go_module | undefined = __gotots_range_value_101;
                const __gotots_callee_21 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_argument_63 = (entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedFileName;
                let path = (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_63);
                newEntrypoints.store(path, newEntrypoints.lookup(path).append(void 0, [entrypoint]));
            }
        }
        const __gotots_range_45 = (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exports;
        const __gotots_range_keys_23 = __gotots_range_45.keys();
        for (const __gotots_range_value_102 of __gotots_range_keys_23) {
            const __gotots_range_value_103 = __gotots_range_45.lookupOk(__gotots_range_value_102);
            if (!__gotots_range_value_103[1]) {
                continue;
            }
            const __gotots_range_value_104 = __gotots_range_value_103[0];
            let fileExports = __gotots_range_value_104;
            const __gotots_range_46 = fileExports;
            for (let __gotots_range_index_21 = 0; __gotots_range_index_21 < __gotots_range_46.length; __gotots_range_index_21++) {
                const __gotots_range_value_105 = __gotots_range_46.get(__gotots_range_index_21);
                let exp: {
                    value: Export;
                } | undefined = __gotots_range_value_105;
                Index$insertAsWords$PointerTo_Named_autoimport$Export(newIndex, exp);
            }
        }
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bucket = new RegistryBucket(BucketState.$fromStorage({
            buildPreferences: bucketBuildPreferences.$storageOf(bucketBuildPreferencesFromUserPreferences(UserPreferences__from_lsutil.$copy((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).userPreferences))),
            recursiveSearchPackages: Set$Clone$string(recursiveSearchPackages),
            dirtyFile: ((void Path__from_tspath,
                "") as string),
            multipleFilesDirty: false,
            newProgramStructure: ((void newProgramStructure,
                0) as int),
            dirtyPackages: void 0
        }), newPaths, newPackageFiles, void 0, (existingBucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).DependencyNames, newAmbientModuleNames, newIndex);
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints = newEntrypoints;
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).removedEntrypointPaths = removedEntrypointPaths;
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleFailedAmbientModuleLookupSources = (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleFailedAmbientModuleLookupSources;
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleFailedAmbientModuleLookupTargets = (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleFailedAmbientModuleLookupTargets;
        if (!(logger === undefined)) {
            LogTree__from_logging.Logf(logger, "Granular update of %d packages: %v (%d exports)", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(Set$Len$string(dirtyPackages)), new GoInterfaceAdapter(indexStart.Sub(named_time.TimeOperations.$copy(start))), new $goInterfaceAdapter$int32(atomic__from_gostdlib.Int32.Load((extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).stats.exports))]));
            LogTree__from_logging.Logf(logger, "Built index: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(time__from_gostdlib.Since(named_time.TimeOperations.$copy(indexStart)))]));
        }
        const __gotots_receiver_49 = ctx;
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err = goInterfaceNonNil<GoInterface>(__gotots_receiver_49).Err();
    }
}
export function newRegistryBuilder(registry: {
    value: Registry;
} | undefined, host: RegistryCloneHost | undefined): registryBuilder | undefined {
    return new registryBuilder(host, registry, UserPreferences__from_lsutil.$copy((registry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.userPreferences), NewMap$Named_tspath$Path$PointerTo_Named_autoimport$directory((registry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.directories), NewMap$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((registry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModules), NewMap$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket((registry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projects), NewMapBuilder$Named_tspath$Path$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string((registry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.specifierCache, ($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined): tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined => {
        return Identity$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined): tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined => {
        return Identity$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string($argument0);
    }), ResolverOptions__from___go_module.$zero(), (registry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.uniquePackageCount, NewMapBuilder$Named_tspath$Path$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint((registry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entrypoints, ($argument0: RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>): RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined> => {
        return Identity$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint($argument0);
    }, ($argument0: RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>): RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined> => {
        return Identity$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint($argument0);
    }));
}
export function hasNewNonNodeModulesFiles(program: {
    value: Program__from_compiler;
} | undefined, bucket: RegistryBucket | undefined): bool {
    if (!(((void newProgramStructure,
        BucketState.$storageOf((bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state).newProgramStructure) as int)
        === newProgramStructureDifferentFileNames$constant().$value)) {
        return false;
    }
    const __gotots_range_27 = Program__from_compiler.GetSourceFiles(program);
    for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_27.length; __gotots_range_index_14++) {
        const __gotots_range_value_58 = __gotots_range_27.get(__gotots_range_index_14);
        let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_58;
        if (strings__from_gostdlib.Contains(SourceFile__from_ast.FileName(file), "/node_modules/") || isIgnoredFile(program, file)) {
            continue;
        }
        {
            const __gotots_results_26 = (bucket ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Paths.lookupOk(SourceFile__from_ast.Path(file));
            let ok = __gotots_results_26[1];
            if (!ok) {
                return true;
            }
        }
    }
    return false;
}
export function isIgnoredFile(program: {
    value: Program__from_compiler;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return Program__from_compiler.IsSourceFileDefaultLibrary(program, SourceFile__from_ast.Path(file)) || Program__from_compiler.IsGlobalTypingsFile(program, SourceFile__from_ast.FileName(file));
}
export function hasSymlinkToNodeModules(filePath: Path__from_tspath, symlinkCache: tsonicTypeScriptRuntime.Location<KnownSymlinks__from_symlinks> | undefined): bool {
    if (symlinkCache === undefined) {
        return false;
    }
    {
        let filesByRealpath: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>> | undefined = KnownSymlinks__from_symlinks.FilesByRealpath(symlinkCache);
        if (!(filesByRealpath === undefined)) {
            {
                const __gotots_results_48 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_collections$SyncSetOf_string(filesByRealpath, filePath);
                let symlinkPaths: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined = __gotots_results_48[0];
                let ok = __gotots_results_48[1];
                if (ok) {
                    let found__shadow_1 = false;
                    SyncSet$Range$string(symlinkPaths, (symlinkPath: gostring): bool => {
                        if (strings__from_gostdlib.Contains(symlinkPath, "/node_modules/")) {
                            found__shadow_1 = true;
                            return false;
                        }
                        return true;
                    });
                    if (found__shadow_1) {
                        return true;
                    }
                }
            }
        }
    }
    let directoriesByRealpath: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined>> | undefined = KnownSymlinks__from_symlinks.DirectoriesByRealpath(symlinkCache);
    if (directoriesByRealpath === undefined) {
        return false;
    }
    let found = false;
    ForEachAncestorDirectoryPath$Interface_void(filePath, (dirPath: Path__from_tspath): [
        $goInterface$Interface_void | undefined,
        bool
    ] => {
        const __gotots_results_49 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_collections$SyncSetOf_string(directoriesByRealpath, dirPath.EnsureTrailingDirectorySeparator());
        let symlinkPaths: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined = __gotots_results_49[0];
        let ok = __gotots_results_49[1];
        if (!ok) {
            return [void 0, false];
        }
        SyncSet$Range$string(symlinkPaths, (symlinkPath: gostring): bool => {
            if (strings__from_gostdlib.Contains(symlinkPath, "/node_modules/")) {
                found = true;
                return false;
            }
            return true;
        });
        return [void 0, found];
    });
    return found;
}
export class failedAmbientModuleLookupSource {
    declare private readonly $goType: void;
    public constructor(public mu: sync__from_gostdlib.Mutex, public fileName: gostring, public packageName: gostring) {
    }
    static $copy($source: failedAmbientModuleLookupSource): failedAmbientModuleLookupSource {
        return new failedAmbientModuleLookupSource(named_sync.SyncMutexOperations.$copy($source.mu), $source.fileName, $source.packageName);
    }
    static $equal($left: failedAmbientModuleLookupSource, $right: failedAmbientModuleLookupSource): bool {
        return named_sync.SyncMutexOperations.$equal($left.mu, $right.mu) && $left.fileName === $right.fileName && $left.packageName === $right.packageName;
    }
    static $hash($source: failedAmbientModuleLookupSource): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, named_sync.SyncMutexOperations.$hash($source.mu));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.fileName));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.packageName));
        return $hash;
    }
    declare private readonly then?: never;
}
export class bucketBuildResult {
    declare private readonly $goType: void;
    public constructor(public entry: MapEntry__from_dirty<Path__from_tspath, RegistryBucket | undefined> | undefined, public err: $goInterface$Interface_Method_Error_void_to_string | undefined, public bucket: RegistryBucket | undefined, public entrypoints: GoMapValue<Path__from_tspath, RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>>, public removedEntrypointPaths: RuntimeSlice<gostring>, public possibleFailedAmbientModuleLookupSources: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
        value: failedAmbientModuleLookupSource;
    } | undefined>> | undefined, public possibleFailedAmbientModuleLookupTargets: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined) {
    }
    declare private readonly then?: never;
}
export class discoveredPackage {
    declare private readonly $goType: void;
    public constructor(public packageName: gostring, public packageJson: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined, public realpath: gostring, public typesPackageJson: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined, public typesRealpath: gostring, public dirPath: Path__from_tspath, public isLocal: bool) {
    }
    declare private readonly then?: never;
}
export class perPackageExtractionResult {
    declare private readonly $goType: void;
    public constructor(public packageFiles: GoMapValue<Path__from_tspath, gostring>, public entrypoints: RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>, public exports: GoMapValue<Path__from_tspath, RuntimeSlice<{
        value: Export;
    } | undefined>>, public ambientModules: GoMapValue<gostring, RuntimeSlice<gostring>>, public statsExports: int, public statsUsedChecker: int, public skippedEntrypoints: int, public isSymlinked: bool, public failedAmbientModuleLookupSources: GoMapValue<Path__from_tspath, {
        value: failedAmbientModuleLookupSource;
    } | undefined>, public failedAmbientModuleLookupTargets: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined) {
    }
    declare private readonly then?: never;
}
export class packageExtractionResult {
    declare private readonly $goType: void;
    public constructor(public exports: GoMapValue<Path__from_tspath, RuntimeSlice<{
        value: Export;
    } | undefined>>, public packageFiles: GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>>, public ambientModuleNames: GoMapValue<gostring, RuntimeSlice<gostring>>, public entrypoints: RuntimeSlice<RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>>, public workspacePackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public possibleFailedAmbientModuleLookupSources: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
        value: failedAmbientModuleLookupSource;
    } | undefined>> | undefined, public possibleFailedAmbientModuleLookupTargets: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined, public stats: extractorStats, public skippedEntrypointsCount: int) {
    }
    declare private readonly then?: never;
}
export function installExtractions(discovered: RuntimeSlice<discoveredPackage | undefined>, extractionCache: GoMapValue<gostring, perPackageExtractionResult | undefined>): packageExtractionResult | undefined {
    const __gotots_field_15 = $goMap$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named_autoimport$Export.make(0, []);
    const __gotots_field_16 = $goMap$MapOf_string_To_MapOf_Named_tspath$Path_To_string.make(0, []);
    const __gotots_field_17 = $goMap$MapOf_string_To_SliceOf_string.make(0, []);
    const __gotots_field_18 = tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
        M: $goMap$MapOf_string_To_Struct_void.nil()
    }));
    const __gotots_struct_2 = SyncMap__from_collections.$zero<Path__from_tspath, {
        value: failedAmbientModuleLookupSource;
    } | undefined>();
    const __gotots_field_19 = tsonicTypeScriptRuntime.location<SyncMap__from_collections<Path__from_tspath, {
        value: failedAmbientModuleLookupSource;
    } | undefined>>(__gotots_struct_2);
    const __gotots_struct_3 = SyncSet__from_collections.$zero<gostring>();
    const __gotots_field_20 = tsonicTypeScriptRuntime.location<SyncSet__from_collections<gostring>>(__gotots_struct_3);
    let result: packageExtractionResult | undefined = new packageExtractionResult(__gotots_field_15, __gotots_field_16, __gotots_field_17, RuntimeSlice.nil<RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>>(), __gotots_field_18, __gotots_field_19, __gotots_field_20, extractorStats.$zero(), 0);
    const __gotots_range_59 = discovered;
    for (let __gotots_range_index_27 = 0; __gotots_range_index_27 < __gotots_range_59.length; __gotots_range_index_27++) {
        const __gotots_range_value_133 = __gotots_range_59.get(__gotots_range_index_27);
        let pkg: discoveredPackage | undefined = __gotots_range_value_133;
        let extraction: perPackageExtractionResult | undefined = extractionCache.lookup((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).realpath);
        if (extraction === undefined) {
            extraction = extractionCache.lookup((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typesRealpath);
        }
        if (extraction === undefined) {
            continue;
        }
        Copy$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named_autoimport$Export$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named_autoimport$Export$Named_tspath$Path$SliceOf_PointerTo_Named_autoimport$Export((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exports, (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exports);
        if ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageFiles.lookup((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageName).isNil()) {
            (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageFiles.store((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageName, $goMap$MapOf_Named_tspath$Path_To_string.make((extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageFiles.length(), []));
        }
        Copy$MapOf_Named_tspath$Path_To_string$MapOf_Named_tspath$Path_To_string$Named_tspath$Path$string((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageFiles.lookup((pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageName), (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageFiles);
        const __gotots_range_60 = (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ambientModules;
        const __gotots_range_keys_31 = __gotots_range_60.keys();
        for (const __gotots_range_value_134 of __gotots_range_keys_31) {
            const __gotots_range_value_135 = __gotots_range_60.lookupOk(__gotots_range_value_134);
            if (!__gotots_range_value_135[1]) {
                continue;
            }
            const __gotots_range_value_136 = __gotots_range_value_134;
            const __gotots_range_value_137 = __gotots_range_value_135[0];
            let name = __gotots_range_value_136;
            let fileNames = __gotots_range_value_137;
            (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ambientModuleNames.store(name, goSliceAppendSlice<gostring>((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ambientModuleNames.lookup(name), fileNames, ""));
        }
        if (!(extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints.isNil()) {
            (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints.append(RuntimeSlice.nil<ResolvedEntrypoint__from___go_module | undefined>(), [(extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).entrypoints]);
        }
        const __gotots_range_61 = (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).failedAmbientModuleLookupSources;
        const __gotots_range_keys_32 = __gotots_range_61.keys();
        for (const __gotots_range_value_138 of __gotots_range_keys_32) {
            const __gotots_range_value_139 = __gotots_range_61.lookupOk(__gotots_range_value_138);
            if (!__gotots_range_value_139[1]) {
                continue;
            }
            const __gotots_range_value_140 = __gotots_range_value_138;
            const __gotots_range_value_141 = __gotots_range_value_139[0];
            let path = __gotots_range_value_140;
            let source: {
                value: failedAmbientModuleLookupSource;
            } | undefined = __gotots_range_value_141;
            SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_autoimport$failedAmbientModuleLookupSource((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleFailedAmbientModuleLookupSources, path, source);
        }
        const __gotots_range_62 = Set$Keys$string((extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).failedAmbientModuleLookupTargets);
        const __gotots_range_keys_33 = __gotots_range_62.keys();
        for (const __gotots_range_value_142 of __gotots_range_keys_33) {
            const __gotots_range_value_143 = __gotots_range_62.lookupOk(__gotots_range_value_142);
            if (!__gotots_range_value_143[1]) {
                continue;
            }
            const __gotots_range_value_144 = __gotots_range_value_142;
            let target = __gotots_range_value_144;
            SyncSet$Add$string((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleFailedAmbientModuleLookupTargets, target);
        }
        if ((extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isSymlinked && (pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isLocal) {
            Set$Add$string((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).workspacePackages, (pkg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).packageName);
        }
        atomic__from_gostdlib.Int32.Add((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).stats.exports, (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).statsExports | 0);
        atomic__from_gostdlib.Int32.Add((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).stats.usedChecker, (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).statsUsedChecker | 0);
        const __gotots_store_45 = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        __gotots_store_45.skippedEntrypointsCount = __gotots_store_45.skippedEntrypointsCount + (extraction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).skippedEntrypoints;
    }
    return result;
}
