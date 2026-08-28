import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { DocumentUri as DocumentUri__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { Map as Map__from_dirty, SyncMap as SyncMap__from_dirty } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/dirty/package.js";
import type { ExtendedConfigCacheEntry as ExtendedConfigCacheEntry__from_tsoptions, ParseConfigHost as ParseConfigHost__from_tsoptions, TsConfigSourceFile as TsConfigSourceFile__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { configFileEntry } from "./configfileregistry.js";
import type { mapEntry$Storage as mapEntry__from_dirty$Storage } from "./dirty/entry.js";
import type { ExtendedConfigCacheEntry } from "./extendedconfigcache.js";
import type { FileChangeSummary } from "./filechange.js";
import type { FileHandle } from "./overlayfs.js";
import type { OwnerCache } from "./ownercache.js";
import type { Project } from "./project.js";
import type { projectLoadKind } from "./projectcollectionbuilder.js";
import type { SessionOptions } from "./session.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, uint64 } from "@gotots/runtime/scalars.js";
import { SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { MapEntry as MapEntry__from_dirty, NewSyncMap as NewSyncMap__from_dirty, SyncMapEntry as SyncMapEntry__from_dirty } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/dirty/package.js";
import { LogTree as LogTree__from_logging } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/package.js";
import { GetParsedCommandLineOfConfigFilePath as GetParsedCommandLineOfConfigFilePath__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ContainsIgnoredPath as ContainsIgnoredPath__from_tspath, ContainsPath as ContainsPath__from_tspath, GetBaseFileName as GetBaseFileName__from_tspath, GetCommonParents as GetCommonParents__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, IsDynamicFileName as IsDynamicFileName__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Keys$Named_lsproto$DocumentUri } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { Set$Len$Named_lsproto$DocumentUri } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { CopyMapInto$MapOf_Named_tspath$Path_To_Struct_void$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/CopyMapInto.js";
import { OwnerCache$LoadAndAcquire$Named_tspath$Path$PointerTo_Named_project$ExtendedConfigCacheEntry$Named_project$ExtendedConfigParseArgs } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/OwnerCache$LoadAndAcquire.js";
import { WatchedFiles$Clone$Named_project$PatternsAndIgnored } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/WatchedFiles$Clone.js";
import { Map$Add$Named_tspath$Path$PointerTo_Named_project$configFileNames } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Add.js";
import { Map$Clear$Named_tspath$Path$PointerTo_Named_project$configFileNames } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Clear.js";
import { Map$Delete$Named_tspath$Path$PointerTo_Named_project$configFileNames } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Delete.js";
import { Map$Finalize$Named_tspath$Path$PointerTo_Named_project$configFileNames } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Finalize.js";
import { Map$Get$Named_tspath$Path$PointerTo_Named_project$configFileNames } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Get.js";
import { Map$Range$Named_tspath$Path$PointerTo_Named_project$configFileNames } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Range.js";
import { MapEntry$Change$Named_tspath$Path$PointerTo_Named_project$configFileNames } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/MapEntry$Change.js";
import { MapEntry$Delete$Named_tspath$Path$PointerTo_Named_project$configFileNames } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/MapEntry$Delete.js";
import { NewMap$Named_tspath$Path$PointerTo_Named_project$configFileNames } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/NewMap.js";
import { SyncMap$Finalize$Named_tspath$Path$PointerTo_Named_project$configFileEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$Finalize.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$configFileEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_project$configFileEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$LoadOrStore.js";
import { SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$configFileEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$Range.js";
import { SyncMapEntry$Change$Named_tspath$Path$PointerTo_Named_project$configFileEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMapEntry$Change.js";
import { SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$configFileEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMapEntry$ChangeIf.js";
import { SyncMapEntry$DeleteIf$Named_tspath$Path$PointerTo_Named_project$configFileEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMapEntry$DeleteIf.js";
import { SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$configFileEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMapEntry$Value.js";
import { mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$configFileEntry, mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$configFileNames } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/mapEntry$Key.js";
import { mapEntry$Value$Named_tspath$Path$PointerTo_Named_project$configFileNames } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/mapEntry$Value.js";
import { ForEachAncestorDirectory$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/tspath/ForEachAncestorDirectory.js";
import { Clone$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void } from "../../../../../../support/generics/concretizations/maps/Clone.js";
import { Copy$MapOf_Named_tspath$Path_To_Struct_void$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void } from "../../../../../../support/generics/concretizations/maps/Copy.js";
import { Sort$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Sort.js";
import { $goInterfaceAdapter$Named_project$projectLoadKind, $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_project$configFileRegistryBuilder, $goInterfaceAdapter$PointerTo_Named_project$sourceFS, $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_project$snapshotFSBuilder as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_string, $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { ConfigFileRegistry, configFileNames, newConfigFileEntry, newExtendedConfigFileEntry } from "./configfileregistry.js";
import { mapEntry as mapEntry__from_dirty } from "./dirty/entry.js";
import { ExtendedConfigParseArgs } from "./extendedconfigcache.js";
import { PendingReloadFileNames$constant, PendingReloadFull$constant, PendingReloadNone$constant } from "./project.js";
import { newSourceFS, snapshotFSBuilder, sourceFS } from "./snapshotfs.js";
import { PatternsAndIgnored, getPathComponentsForWatching, getRecursiveGlobPattern, minWatchLocationDepth$int } from "./watch.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export class configFileRegistryBuilder {
    declare private readonly $goType: void;
    public constructor(public hasRelativePatternCapability: bool, public fs: {
        value: sourceFS;
    } | undefined, public isOpenFile: (($0: Path__from_tspath) => bool) | undefined, public extendedConfigCache: {
        value: OwnerCache<Path__from_tspath, {
            value: ExtendedConfigCacheEntry;
        } | undefined, ExtendedConfigParseArgs>;
    } | undefined, public snapshotID: uint64, public sessionOptions: {
        value: SessionOptions;
    } | undefined, public customConfigFileName: gostring, public base: {
        value: ConfigFileRegistry;
    } | undefined, public configs: {
        value: SyncMap__from_dirty<Path__from_tspath, {
            value: configFileEntry;
        } | undefined>;
    } | undefined, public configFileNames: {
        value: Map__from_dirty<Path__from_tspath, configFileNames | undefined>;
    } | undefined, public customConfigFileNameChanged: bool) {
    }
    static $copy($source: configFileRegistryBuilder): configFileRegistryBuilder {
        return new configFileRegistryBuilder($source.hasRelativePatternCapability, $source.fs, $source.isOpenFile, $source.extendedConfigCache, $source.snapshotID, $source.sessionOptions, $source.customConfigFileName, $source.base, $source.configs, $source.configFileNames, $source.customConfigFileNameChanged);
    }
    declare private readonly then?: never;
    static Cleanup(c: {
        value: configFileRegistryBuilder;
    } | undefined): void {
        SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, (entry: {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: configFileEntry;
            } | undefined>;
        } | undefined): bool => {
            SyncMapEntry$DeleteIf$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry, (value: {
                value: configFileEntry;
            } | undefined): bool => {
                return (value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingProjects.length() === 0 && (value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingOpenFiles.length() === 0 && (value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingConfigs.length() === 0;
            });
            return true;
        });
    }
    static DidChangeCustomConfigFileName(c: {
        value: configFileRegistryBuilder;
    } | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): bool {
        if (!(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.customConfigFileNameChanged) {
            return false;
        }
        Map$Clear$Named_tspath$Path$PointerTo_Named_project$configFileNames((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames);
        return true;
    }
    static DidChangeFiles(c: {
        value: configFileRegistryBuilder;
    } | undefined, summary: FileChangeSummary, logger: {
        value: LogTree__from_logging;
    } | undefined): changeFileResult {
        let affectedProjects: GoMapValue<Path__from_tspath, GoEmptyStruct> = GoMap.nil();
        let affectedFiles: GoMapValue<Path__from_tspath, GoEmptyStruct> = GoMap.nil();
        let shouldInvalidateCache = false;
        LogTree__from_logging.Log(logger, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("Summarizing file changes")]));
        let hasExcessiveChanges = summary.HasExcessiveWatchEvents() && summary.IncludesWatchChangeOutsideNodeModules;
        const __gotots_store_0 = summary;
        let createdFiles: GoMapValue<Path__from_tspath, gostring> = $goMap$MapOf_Named_tspath$Path_To_string.make(Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Created")), []);
        const __gotots_store_1 = summary;
        let deletedFiles: GoMapValue<Path__from_tspath, gostring> = $goMap$MapOf_Named_tspath$Path_To_string.make(Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Deleted")), []);
        let createdOrDeletedConfigFiles: GoMapValue<Path__from_tspath, GoEmptyStruct> = GoMap.make(0, []);
        const __gotots_store_2 = summary;
        const __gotots_binary_operand_0 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Changed"));
        const __gotots_store_3 = summary;
        const __gotots_binary_operand_1 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Deleted"));
        let createdOrChangedOrDeletedFiles: GoMapValue<Path__from_tspath, GoEmptyStruct> = GoMap.make(__gotots_binary_operand_0 + __gotots_binary_operand_1, []);
        const __gotots_store_4 = summary;
        const __gotots_range_0 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Changed"));
        const __gotots_range_keys_0 = __gotots_range_0.keys();
        for (const __gotots_range_value_0 of __gotots_range_keys_0) {
            const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
            if (!__gotots_range_value_1[1]) {
                continue;
            }
            const __gotots_range_value_2 = __gotots_range_value_0;
            let uri = __gotots_range_value_2;
            if (ContainsIgnoredPath__from_tspath(uri.$value)) {
                continue;
            }
            let fileName = uri.FileName();
            const __gotots_callee_0: sourceFS["toPath"] = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_0 = fileName;
            let path = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
            let baseName = GetBaseFileName__from_tspath(path.$value);
            if (configFileRegistryBuilder.$go$private$project$isConfigBaseName(c, baseName)) {
                createdOrDeletedConfigFiles.store(path, new GoEmptyStruct);
            }
            createdOrChangedOrDeletedFiles.store(path, new GoEmptyStruct);
        }
        const __gotots_store_5 = summary;
        const __gotots_range_1 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Deleted"));
        const __gotots_range_keys_1 = __gotots_range_1.keys();
        for (const __gotots_range_value_3 of __gotots_range_keys_1) {
            const __gotots_range_value_4 = __gotots_range_1.lookupOk(__gotots_range_value_3);
            if (!__gotots_range_value_4[1]) {
                continue;
            }
            const __gotots_range_value_5 = __gotots_range_value_3;
            let uri = __gotots_range_value_5;
            if (ContainsIgnoredPath__from_tspath(uri.$value)) {
                continue;
            }
            let fileName = uri.FileName();
            const __gotots_callee_1: sourceFS["toPath"] = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_1 = fileName;
            let path = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
            deletedFiles.store(path, fileName);
            let baseName = GetBaseFileName__from_tspath(path.$value);
            if (configFileRegistryBuilder.$go$private$project$isConfigBaseName(c, baseName)) {
                createdOrDeletedConfigFiles.store(path, new GoEmptyStruct);
            }
            createdOrChangedOrDeletedFiles.store(path, new GoEmptyStruct);
        }
        const __gotots_store_6 = summary;
        const __gotots_range_2 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Created"));
        const __gotots_range_keys_2 = __gotots_range_2.keys();
        for (const __gotots_range_value_6 of __gotots_range_keys_2) {
            const __gotots_range_value_7 = __gotots_range_2.lookupOk(__gotots_range_value_6);
            if (!__gotots_range_value_7[1]) {
                continue;
            }
            const __gotots_range_value_8 = __gotots_range_value_6;
            let uri = __gotots_range_value_8;
            if (ContainsIgnoredPath__from_tspath(uri.$value)) {
                continue;
            }
            let fileName = uri.FileName();
            const __gotots_callee_2: sourceFS["toPath"] = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_2 = fileName;
            let path = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
            createdFiles.store(path, fileName);
            let baseName = GetBaseFileName__from_tspath(path.$value);
            if (configFileRegistryBuilder.$go$private$project$isConfigBaseName(c, baseName)) {
                createdOrDeletedConfigFiles.store(path, new GoEmptyStruct);
            }
            createdOrChangedOrDeletedFiles.store(path, new GoEmptyStruct);
        }
        const __gotots_store_7 = summary;
        const __gotots_range_3 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Closed"));
        const __gotots_range_keys_3 = __gotots_range_3.keys();
        for (const __gotots_range_value_9 of __gotots_range_keys_3) {
            const __gotots_range_value_10 = __gotots_range_3.lookupOk(__gotots_range_value_9);
            if (!__gotots_range_value_10[1]) {
                continue;
            }
            const __gotots_range_value_11 = __gotots_range_value_9;
            let uri = __gotots_range_value_11;
            let fileName = uri.FileName();
            const __gotots_callee_3: sourceFS["toPath"] = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_3 = fileName;
            let path = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
            configFileRegistryBuilder.$go$private$project$didCloseFile(c, path);
        }
        LogTree__from_logging.Log(logger, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("Checking if any changed files are config files")]));
        const __gotots_range_4 = createdOrChangedOrDeletedFiles;
        const __gotots_range_keys_4 = __gotots_range_4.keys();
        for (const __gotots_range_value_12 of __gotots_range_keys_4) {
            const __gotots_range_value_13 = __gotots_range_4.lookupOk(__gotots_range_value_12);
            if (!__gotots_range_value_13[1]) {
                continue;
            }
            const __gotots_range_value_14 = __gotots_range_value_12;
            let path = __gotots_range_value_14;
            {
                const __gotots_results_0 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, path);
                let entry: {
                    value: SyncMapEntry__from_dirty<Path__from_tspath, {
                        value: configFileEntry;
                    } | undefined>;
                } | undefined = __gotots_results_0[0];
                let ok = __gotots_results_0[1];
                if (ok) {
                    if (hasExcessiveChanges) {
                        return configFileRegistryBuilder.$go$private$project$invalidateCache(c, logger);
                    }
                    affectedProjects = CopyMapInto$MapOf_Named_tspath$Path_To_Struct_void$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(affectedProjects, configFileRegistryBuilder.$go$private$project$handleConfigChange(c, entry, logger));
                    const __gotots_range_5: configFileEntry["retainingConfigs"] = (SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingConfigs;
                    const __gotots_range_keys_5 = __gotots_range_5.keys();
                    for (const __gotots_range_value_15 of __gotots_range_keys_5) {
                        const __gotots_range_value_16 = __gotots_range_5.lookupOk(__gotots_range_value_15);
                        if (!__gotots_range_value_16[1]) {
                            continue;
                        }
                        const __gotots_range_value_17 = __gotots_range_value_15;
                        let extendingConfigPath = __gotots_range_value_17;
                        {
                            const __gotots_results_1 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, extendingConfigPath);
                            let extendingConfigEntry: {
                                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                                    value: configFileEntry;
                                } | undefined>;
                            } | undefined = __gotots_results_1[0];
                            let ok__shadow_1 = __gotots_results_1[1];
                            if (ok__shadow_1) {
                                affectedProjects = CopyMapInto$MapOf_Named_tspath$Path_To_Struct_void$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(affectedProjects, configFileRegistryBuilder.$go$private$project$handleConfigChange(c, extendingConfigEntry, logger));
                            }
                        }
                    }
                    createdFiles.delete(path);
                }
            }
        }
        const __gotots_range_6 = createdOrDeletedConfigFiles;
        const __gotots_range_keys_6 = __gotots_range_6.keys();
        for (const __gotots_range_value_18 of __gotots_range_keys_6) {
            const __gotots_range_value_19 = __gotots_range_6.lookupOk(__gotots_range_value_18);
            if (!__gotots_range_value_19[1]) {
                continue;
            }
            const __gotots_range_value_20 = __gotots_range_value_18;
            let path = __gotots_range_value_20;
            if (hasExcessiveChanges) {
                return configFileRegistryBuilder.$go$private$project$invalidateCache(c, logger);
            }
            let directoryPath = path.GetDirectoryPath();
            Map$Range$Named_tspath$Path$PointerTo_Named_project$configFileNames((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames, (entry: MapEntry__from_dirty<Path__from_tspath, configFileNames | undefined> | undefined): bool => {
                const __gotots_receiver_1 = directoryPath;
                const __gotots_store_8 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                const __gotots_argument_4 = mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$configFileNames(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, configFileNames | undefined>, mapEntry__from_dirty<Path__from_tspath, configFileNames | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf));
                if (__gotots_receiver_1.ContainsPath(__gotots_argument_4)) {
                    if (affectedFiles.isNil()) {
                        affectedFiles = GoMap.make(0, []);
                    }
                    const __gotots_store_10 = affectedFiles;
                    const __gotots_store_9 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                    __gotots_store_10.store(mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$configFileNames(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, configFileNames | undefined>, mapEntry__from_dirty<Path__from_tspath, configFileNames | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)), new GoEmptyStruct);
                    MapEntry$Delete$Named_tspath$Path$PointerTo_Named_project$configFileNames(entry);
                }
                return true;
            });
        }
        const __gotots_range_7 = deletedFiles;
        const __gotots_range_keys_7 = __gotots_range_7.keys();
        for (const __gotots_range_value_21 of __gotots_range_keys_7) {
            const __gotots_range_value_22 = __gotots_range_7.lookupOk(__gotots_range_value_21);
            if (!__gotots_range_value_22[1]) {
                continue;
            }
            const __gotots_range_value_23 = __gotots_range_value_21;
            const __gotots_range_value_24 = __gotots_range_value_22[0];
            let path = __gotots_range_value_23;
            let fileName = __gotots_range_value_24;
            SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, (entry: {
                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                    value: configFileEntry;
                } | undefined>;
            } | undefined): bool => {
                SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry, (config: {
                    value: configFileEntry;
                } | undefined): bool => {
                    if (!((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingReload.$value === PendingReloadNone$constant().$value) || (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine === undefined) {
                        return false;
                    }
                    {
                        const __gotots_results_2 = ParsedCommandLine__from_tsoptions.FileNamesByPath((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine).lookupOk(path);
                        let ok = __gotots_results_2[1];
                        if (ok) {
                            return ParsedCommandLine__from_tsoptions.GetMatchedFileSpec((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine, fileName) === "";
                        }
                    }
                    return false;
                }, (config: {
                    value: configFileEntry;
                } | undefined): void => {
                    (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingReload = PendingReloadFileNames$constant();
                    if (affectedProjects.isNil()) {
                        affectedProjects = GoMap.make(0, []);
                    }
                    Copy$MapOf_Named_tspath$Path_To_Struct_void$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(affectedProjects, (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingProjects);
                    const __gotots_receiver_2 = logger;
                    const __gotots_argument_6 = "Root files for config %s changed";
                    const __gotots_store_11 = SyncMapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    const __gotots_argument_5 = new $goInterfaceAdapter$Named_tspath$Path(mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$configFileEntry(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, {
                        value: configFileEntry;
                    } | undefined>, mapEntry__from_dirty<Path__from_tspath, {
                        value: configFileEntry;
                    } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)));
                    const __gotots_argument_7 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_5]);
                    LogTree__from_logging.Logf(__gotots_receiver_2, __gotots_argument_6, __gotots_argument_7);
                    shouldInvalidateCache = hasExcessiveChanges;
                });
                return !shouldInvalidateCache;
            });
            if (shouldInvalidateCache) {
                return configFileRegistryBuilder.$go$private$project$invalidateCache(c, logger);
            }
        }
        if (createdFiles.length() > 0) {
            SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, (entry: {
                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                    value: configFileEntry;
                } | undefined>;
            } | undefined): bool => {
                SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry, (config: {
                    value: configFileEntry;
                } | undefined): bool => {
                    if ((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine === undefined || (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch === undefined || !((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingReload.$value === PendingReloadNone$constant().$value)) {
                        return false;
                    }
                    const __gotots_receiver_3 = logger;
                    const __gotots_argument_10 = "Checking if any of %d created files match root files for config %s";
                    const __gotots_argument_8 = new $goInterfaceAdapter$int(createdFiles.length());
                    const __gotots_store_12 = SyncMapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    const __gotots_argument_9 = new $goInterfaceAdapter$Named_tspath$Path(mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$configFileEntry(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, {
                        value: configFileEntry;
                    } | undefined>, mapEntry__from_dirty<Path__from_tspath, {
                        value: configFileEntry;
                    } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)));
                    const __gotots_argument_11 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_8, __gotots_argument_9]);
                    LogTree__from_logging.Logf(__gotots_receiver_3, __gotots_argument_10, __gotots_argument_11);
                    const __gotots_range_8 = createdFiles;
                    const __gotots_range_keys_8 = __gotots_range_8.keys();
                    for (const __gotots_range_value_25 of __gotots_range_keys_8) {
                        const __gotots_range_value_26 = __gotots_range_8.lookupOk(__gotots_range_value_25);
                        if (!__gotots_range_value_26[1]) {
                            continue;
                        }
                        const __gotots_range_value_27 = __gotots_range_value_25;
                        const __gotots_range_value_28 = __gotots_range_value_26[0];
                        let path = __gotots_range_value_27;
                        let fileName = __gotots_range_value_28;
                        if (ParsedCommandLine__from_tsoptions.PossiblyMatchesFileName((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine, fileName)) {
                            return true;
                        }
                        if (ParsedCommandLine__from_tsoptions.PossiblyMatchesDirectoryName((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine, path) && sourceFS.DirectoryExists((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, fileName)) {
                            return true;
                        }
                    }
                    return false;
                }, (config: {
                    value: configFileEntry;
                } | undefined): void => {
                    (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingReload = PendingReloadFileNames$constant();
                    if (affectedProjects.isNil()) {
                        affectedProjects = GoMap.make(0, []);
                    }
                    Copy$MapOf_Named_tspath$Path_To_Struct_void$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(affectedProjects, (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingProjects);
                    const __gotots_receiver_4 = logger;
                    const __gotots_argument_13 = "Root files for config %s changed";
                    const __gotots_store_13 = SyncMapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    const __gotots_argument_12 = new $goInterfaceAdapter$Named_tspath$Path(mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$configFileEntry(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, {
                        value: configFileEntry;
                    } | undefined>, mapEntry__from_dirty<Path__from_tspath, {
                        value: configFileEntry;
                    } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)));
                    const __gotots_argument_14 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_12]);
                    LogTree__from_logging.Logf(__gotots_receiver_4, __gotots_argument_13, __gotots_argument_14);
                    shouldInvalidateCache = hasExcessiveChanges;
                });
                return !shouldInvalidateCache;
            });
            if (shouldInvalidateCache) {
                return configFileRegistryBuilder.$go$private$project$invalidateCache(c, logger);
            }
        }
        return new changeFileResult(affectedProjects, affectedFiles);
    }
    static FS(c: {
        value: configFileRegistryBuilder;
    } | undefined): FS__from_vfs | undefined {
        return new $goInterfaceAdapter$PointerTo_Named_project$sourceFS((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs);
    }
    static Finalize(c: {
        value: configFileRegistryBuilder;
    } | undefined): {
        value: ConfigFileRegistry;
    } | undefined {
        let changed = false;
        let newRegistry: {
            value: ConfigFileRegistry;
        } | undefined = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        let ensureCloned: (() => void) | undefined = (): void => {
            if (!changed) {
                newRegistry = ConfigFileRegistry.$go$private$project$clone(newRegistry);
                changed = true;
            }
        };
        {
            const __gotots_results_5 = SyncMap$Finalize$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs);
            let configs: GoMapValue<Path__from_tspath, {
                value: configFileEntry;
            } | undefined> = __gotots_results_5[0];
            let changedConfigs = __gotots_results_5[1];
            if (changedConfigs) {
                const __gotots_callee_5 = ensureCloned;
                (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))();
                (newRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs = configs;
            }
        }
        {
            const __gotots_results_6 = Map$Finalize$Named_tspath$Path$PointerTo_Named_project$configFileNames((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames);
            let configFileNames__shadow_1: GoMapValue<Path__from_tspath, configFileNames | undefined> = __gotots_results_6[0];
            let changedNames = __gotots_results_6[1];
            if (changedNames) {
                const __gotots_callee_6 = ensureCloned;
                (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))();
                (newRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames = configFileNames__shadow_1;
            }
        }
        if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.customConfigFileNameChanged) {
            const __gotots_callee_7 = ensureCloned;
            (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))();
            (newRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.customConfigFileName = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.customConfigFileName;
        }
        return newRegistry;
    }
    static GetCurrentDirectory(c: {
        value: configFileRegistryBuilder;
    } | undefined): gostring {
        return ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory;
    }
    static GetExtendedConfig(c: {
        value: configFileRegistryBuilder;
    } | undefined, fileName: gostring, path: Path__from_tspath, resolutionStack: RuntimeSlice<gostring>, host: ParseConfigHost__from_tsoptions | undefined): {
        value: ExtendedConfigCacheEntry__from_tsoptions;
    } | undefined {
        let content = "";
        let fh: FileHandle | undefined = sourceFS.GetFileByPath((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, fileName, path);
        if (!(fh === undefined)) {
            const __gotots_receiver_11 = fh;
            content = goInterfaceNonNil<FileHandle>(__gotots_receiver_11).Content();
        }
        return (OwnerCache$LoadAndAcquire$Named_tspath$Path$PointerTo_Named_project$ExtendedConfigCacheEntry$Named_project$ExtendedConfigParseArgs((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfigCache, path, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotID, new ExtendedConfigParseArgs(fileName, content, ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source, resolutionStack, host, new $goInterfaceAdapter$PointerTo_Named_project$configFileRegistryBuilder(c))) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedConfigCacheEntry;
    }
    static $go$private$project$acquireConfigForFile(c: {
        value: configFileRegistryBuilder;
    } | undefined, configFileName: gostring, configFilePath: Path__from_tspath, filePath: Path__from_tspath, logger: {
        value: LogTree__from_logging;
    } | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        const __gotots_results_25 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, configFilePath, newConfigFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasRelativePatternCapability, configFileName));
        let entry: {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: configFileEntry;
            } | undefined>;
        } | undefined = __gotots_results_25[0];
        let needsRetainOpenFile = false;
        SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry, (config: {
            value: configFileEntry;
        } | undefined): bool => {
            const __gotots_callee_12: configFileRegistryBuilder["isOpenFile"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isOpenFile;
            const __gotots_argument_28 = filePath;
            if ((__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_28)) {
                const __gotots_results_26 = (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingOpenFiles.lookupOk(filePath);
                let alreadyRetaining = __gotots_results_26[1];
                needsRetainOpenFile = !alreadyRetaining;
            }
            return needsRetainOpenFile || !((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingReload.$value === PendingReloadNone$constant().$value);
        }, (config: {
            value: configFileEntry;
        } | undefined): void => {
            if (needsRetainOpenFile) {
                if ((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingOpenFiles.isNil()) {
                    (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingOpenFiles = GoMap.make(0, []);
                }
                (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingOpenFiles.store(filePath, new GoEmptyStruct);
            }
            configFileRegistryBuilder.$go$private$project$reloadIfNeeded(c, config, configFileName, configFilePath, logger);
        });
        return (SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine;
    }
    static $go$private$project$acquireConfigForProject(c: {
        value: configFileRegistryBuilder;
    } | undefined, fileName: gostring, path: Path__from_tspath, project: {
        value: Project;
    } | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        const __gotots_results_11 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, path, newConfigFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasRelativePatternCapability, fileName));
        let entry: {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: configFileEntry;
            } | undefined>;
        } | undefined = __gotots_results_11[0];
        let needsRetainProject = false;
        SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry, (config: {
            value: configFileEntry;
        } | undefined): bool => {
            const __gotots_results_12 = (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingProjects.lookupOk((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath);
            let alreadyRetaining = __gotots_results_12[1];
            needsRetainProject = !alreadyRetaining;
            return needsRetainProject || !((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingReload.$value === PendingReloadNone$constant().$value);
        }, (config: {
            value: configFileEntry;
        } | undefined): void => {
            if (needsRetainProject) {
                if ((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingProjects.isNil()) {
                    (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingProjects = GoMap.make(0, []);
                }
                (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingProjects.store((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath, new GoEmptyStruct);
            }
            configFileRegistryBuilder.$go$private$project$reloadIfNeeded(c, config, fileName, path, logger);
        });
        return (SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine;
    }
    static $go$private$project$computeConfigFileName(c: {
        value: configFileRegistryBuilder;
    } | undefined, fileName: gostring, skipSearchInDirectoryOfFile: bool, logger: {
        value: LogTree__from_logging;
    } | undefined): gostring {
        let searchPath = GetDirectoryPath__from_tspath(fileName);
        if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.customConfigFileName !== "") {
            let skip = skipSearchInDirectoryOfFile;
            {
                const __gotots_results_17 = ForEachAncestorDirectory$string(searchPath, (directory: gostring): [
                    gostring,
                    bool
                ] => {
                    let result__shadow_2: gostring = "";
                    let stop: bool = false;
                    if (!skip) {
                        let customPath = CombinePaths__from_tspath(directory, RuntimeSlice.literal<gostring>([(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.customConfigFileName]));
                        const __gotots_receiver_7 = configFileRegistryBuilder.FS(c);
                        const __gotots_argument_22 = customPath;
                        if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_7).FileExists(__gotots_argument_22)) {
                            return [customPath, true];
                        }
                    }
                    if (strings__from_gostdlib.HasSuffix(directory, "/node_modules")) {
                        return ["", true];
                    }
                    skip = false;
                    return ["", false];
                });
                let result__shadow_1 = __gotots_results_17[0];
                if (result__shadow_1 !== "") {
                    LogTree__from_logging.Logf(logger, "computeConfigFileName:: File: %s:: Result: %s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(fileName), new $goInterfaceAdapter$string(result__shadow_1)]));
                    return result__shadow_1;
                }
            }
        }
        let skipTsconfig = skipSearchInDirectoryOfFile;
        let skipJsconfig = skipSearchInDirectoryOfFile && !strings__from_gostdlib.HasSuffix(fileName, "/tsconfig.json");
        const __gotots_results_18 = ForEachAncestorDirectory$string(searchPath, (directory: gostring): [
            gostring,
            bool
        ] => {
            let result__shadow_1: gostring = "";
            let stop: bool = false;
            if (!skipTsconfig) {
                let tsconfigPath = CombinePaths__from_tspath(directory, RuntimeSlice.literal<gostring>(["tsconfig.json"]));
                const __gotots_receiver_8 = configFileRegistryBuilder.FS(c);
                const __gotots_argument_23 = tsconfigPath;
                if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_8).FileExists(__gotots_argument_23)) {
                    return [tsconfigPath, true];
                }
            }
            if (!skipJsconfig) {
                let jsconfigPath = CombinePaths__from_tspath(directory, RuntimeSlice.literal<gostring>(["jsconfig.json"]));
                const __gotots_receiver_9 = configFileRegistryBuilder.FS(c);
                const __gotots_argument_24 = jsconfigPath;
                if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_9).FileExists(__gotots_argument_24)) {
                    return [jsconfigPath, true];
                }
            }
            if (strings__from_gostdlib.HasSuffix(directory, "/node_modules")) {
                return ["", true];
            }
            skipTsconfig = false;
            skipJsconfig = false;
            return ["", false];
        });
        let result = __gotots_results_18[0];
        LogTree__from_logging.Logf(logger, "computeConfigFileName:: File: %s:: Result: %s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(fileName), new $goInterfaceAdapter$string(result)]));
        return result;
    }
    static $go$private$project$didCloseFile(c: {
        value: configFileRegistryBuilder;
    } | undefined, path: Path__from_tspath): void {
        if (IsDynamicFileName__from_tspath(path.$value)) {
            return;
        }
        Map$Delete$Named_tspath$Path$PointerTo_Named_project$configFileNames((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames, path);
        SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, (entry: {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: configFileEntry;
            } | undefined>;
        } | undefined): bool => {
            SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry, (config: {
                value: configFileEntry;
            } | undefined): bool => {
                const __gotots_results_7 = (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingOpenFiles.lookupOk(path);
                let ok = __gotots_results_7[1];
                return ok;
            }, (config: {
                value: configFileEntry;
            } | undefined): void => {
                (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingOpenFiles.delete(path);
            });
            return true;
        });
    }
    static $go$private$project$findOrAcquireConfigForFile(c: {
        value: configFileRegistryBuilder;
    } | undefined, configFileName: gostring, configFilePath: Path__from_tspath, filePath: Path__from_tspath, loadKind: projectLoadKind, logger: {
        value: LogTree__from_logging;
    } | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        switch (loadKind.$value) {
            case 0: {
                {
                    const __gotots_results_19 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, configFilePath);
                    let entry: {
                        value: SyncMapEntry__from_dirty<Path__from_tspath, {
                            value: configFileEntry;
                        } | undefined>;
                    } | undefined = __gotots_results_19[0];
                    let ok = __gotots_results_19[1];
                    if (ok) {
                        return (SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine;
                    }
                }
                return void 0;
                break;
            }
            case 1: {
                return configFileRegistryBuilder.$go$private$project$acquireConfigForFile(c, configFileName, configFilePath, filePath, logger);
                break;
            }
            default: {
                const __gotots_argument_25 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("unknown project load kind: %d", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_project$projectLoadKind(loadKind)])));
                GoPanic.raise(__gotots_argument_25 === undefined ? GoPanicNilValue.create() : __gotots_argument_25);
                break;
            }
        }
    }
    static $go$private$project$forEachConfigFileNameFor(c: {
        value: configFileRegistryBuilder;
    } | undefined, path: Path__from_tspath, cb: (($0: gostring) => void) | undefined): void {
        if (IsDynamicFileName__from_tspath(path.$value)) {
            return;
        }
        {
            const __gotots_results_3 = Map$Get$Named_tspath$Path$PointerTo_Named_project$configFileNames((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames, path);
            let entry: MapEntry__from_dirty<Path__from_tspath, configFileNames | undefined> | undefined = __gotots_results_3[0];
            let ok = __gotots_results_3[1];
            if (ok) {
                const __gotots_store_14 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                let configFileName = (mapEntry$Value$Named_tspath$Path$PointerTo_Named_project$configFileNames(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, configFileNames | undefined>, mapEntry__from_dirty<Path__from_tspath, configFileNames | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nearestConfigFileName;
                for (; configFileName !== "";) {
                    const __gotots_callee_4 = cb;
                    const __gotots_argument_15 = configFileName;
                    (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15);
                    {
                        const __gotots_store_15 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                        const __gotots_map_0 = (mapEntry$Value$Named_tspath$Path$PointerTo_Named_project$configFileNames(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, configFileNames | undefined>, mapEntry__from_dirty<Path__from_tspath, configFileNames | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ancestors;
                        const __gotots_map_1 = configFileName;
                        const __gotots_results_4 = __gotots_map_0.lookupOk(__gotots_map_1);
                        let ancestorConfigName = __gotots_results_4[0];
                        let found = __gotots_results_4[1];
                        if (found) {
                            configFileName = ancestorConfigName;
                        }
                        else {
                            return;
                        }
                    }
                }
            }
        }
    }
    static $go$private$project$getAncestorConfigFileName(c: {
        value: configFileRegistryBuilder;
    } | undefined, fileName: gostring, path: Path__from_tspath, configFileName: gostring, logger: {
        value: LogTree__from_logging;
    } | undefined): gostring {
        if (IsDynamicFileName__from_tspath(fileName)) {
            return "";
        }
        const __gotots_results_14 = Map$Get$Named_tspath$Path$PointerTo_Named_project$configFileNames((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames, path);
        let entry: MapEntry__from_dirty<Path__from_tspath, configFileNames | undefined> | undefined = __gotots_results_14[0];
        let ok = __gotots_results_14[1];
        if (!ok) {
            return "";
        }
        {
            const __gotots_store_20 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
            const __gotots_map_2 = (mapEntry$Value$Named_tspath$Path$PointerTo_Named_project$configFileNames(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, configFileNames | undefined>, mapEntry__from_dirty<Path__from_tspath, configFileNames | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ancestors;
            const __gotots_map_3 = configFileName;
            const __gotots_results_15 = __gotots_map_2.lookupOk(__gotots_map_3);
            let ancestorConfigName = __gotots_results_15[0];
            let found = __gotots_results_15[1];
            if (found) {
                return ancestorConfigName;
            }
        }
        let result = configFileRegistryBuilder.$go$private$project$computeConfigFileName(c, configFileName, true, logger);
        const __gotots_callee_9: configFileRegistryBuilder["isOpenFile"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isOpenFile;
        const __gotots_argument_21 = path;
        if ((__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21)) {
            MapEntry$Change$Named_tspath$Path$PointerTo_Named_project$configFileNames(entry, (value: configFileNames | undefined): void => {
                if ((value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ancestors.isNil()) {
                    (value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ancestors = GoMap__from_gotots_runtime.make<gostring, gostring>("", 0, []);
                }
                (value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ancestors.store(configFileName, result);
            });
        }
        return result;
    }
    static $go$private$project$getConfigFileNameForFile(c: {
        value: configFileRegistryBuilder;
    } | undefined, fileName: gostring, path: Path__from_tspath, logger: {
        value: LogTree__from_logging;
    } | undefined): gostring {
        if (IsDynamicFileName__from_tspath(fileName)) {
            return "";
        }
        {
            const __gotots_results_13 = Map$Get$Named_tspath$Path$PointerTo_Named_project$configFileNames((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames, path);
            let entry: MapEntry__from_dirty<Path__from_tspath, configFileNames | undefined> | undefined = __gotots_results_13[0];
            let ok = __gotots_results_13[1];
            if (ok) {
                const __gotots_store_19 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
                return (mapEntry$Value$Named_tspath$Path$PointerTo_Named_project$configFileNames(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, configFileNames | undefined>, mapEntry__from_dirty<Path__from_tspath, configFileNames | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nearestConfigFileName;
            }
        }
        let configName = configFileRegistryBuilder.$go$private$project$computeConfigFileName(c, fileName, false, logger);
        const __gotots_callee_8: configFileRegistryBuilder["isOpenFile"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isOpenFile;
        const __gotots_argument_20 = path;
        if ((__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20)) {
            Map$Add$Named_tspath$Path$PointerTo_Named_project$configFileNames((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames, path, new configFileNames(configName, GoMap__from_gotots_runtime.nil<gostring, gostring>("")));
        }
        return configName;
    }
    static $go$private$project$handleConfigChange(c: {
        value: configFileRegistryBuilder;
    } | undefined, entry: {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: configFileEntry;
        } | undefined>;
    } | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): GoMapValue<Path__from_tspath, GoEmptyStruct> {
        let affectedProjects: GoMapValue<Path__from_tspath, GoEmptyStruct> = GoMap.nil();
        let changed = SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry, (config: {
            value: configFileEntry;
        } | undefined): bool => {
            return !((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingReload.$value === PendingReloadFull$constant().$value);
        }, (config: {
            value: configFileEntry;
        } | undefined): void => {
            (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingReload = PendingReloadFull$constant();
        });
        if (changed) {
            const __gotots_receiver_6 = logger;
            const __gotots_argument_18 = "Config file %s changed";
            const __gotots_store_18 = SyncMapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
            const __gotots_argument_17 = new $goInterfaceAdapter$Named_tspath$Path(mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$configFileEntry(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, {
                value: configFileEntry;
            } | undefined>, mapEntry__from_dirty<Path__from_tspath, {
                value: configFileEntry;
            } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)));
            const __gotots_argument_19 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_17]);
            LogTree__from_logging.Logf(__gotots_receiver_6, __gotots_argument_18, __gotots_argument_19);
            affectedProjects = Clone$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void((SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingProjects);
        }
        return affectedProjects;
    }
    static $go$private$project$invalidateCache(c: {
        value: configFileRegistryBuilder;
    } | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): changeFileResult {
        let affectedProjects: GoMapValue<Path__from_tspath, GoEmptyStruct> = GoMap.nil();
        let affectedFiles: GoMapValue<Path__from_tspath, GoEmptyStruct> = GoMap.nil();
        LogTree__from_logging.Log(logger, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("Too many files changed; marking all configs for reload")]));
        Map$Range$Named_tspath$Path$PointerTo_Named_project$configFileNames((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames, (entry: MapEntry__from_dirty<Path__from_tspath, configFileNames | undefined> | undefined): bool => {
            if (affectedFiles.isNil()) {
                affectedFiles = GoMap.make(0, []);
            }
            const __gotots_store_17 = affectedFiles;
            const __gotots_store_16 = MapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
            __gotots_store_17.store(mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$configFileNames(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, configFileNames | undefined>, mapEntry__from_dirty<Path__from_tspath, configFileNames | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)), new GoEmptyStruct);
            return true;
        });
        Map$Clear$Named_tspath$Path$PointerTo_Named_project$configFileNames((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames);
        SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, (entry: {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: configFileEntry;
            } | undefined>;
        } | undefined): bool => {
            SyncMapEntry$Change$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry, (entry__shadow_1: {
                value: configFileEntry;
            } | undefined): void => {
                affectedProjects = CopyMapInto$MapOf_Named_tspath$Path_To_Struct_void$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(affectedProjects, (entry__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingProjects);
                if (!((entry__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingReload.$value === PendingReloadFull$constant().$value)) {
                    const __gotots_receiver_5 = configFileRegistryBuilder.FS(c);
                    const __gotots_argument_16: configFileEntry["fileName"] = (entry__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileName;
                    const __gotots_results_8 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_5).ReadFile(__gotots_argument_16);
                    let text = __gotots_results_8[0];
                    let ok = __gotots_results_8[1];
                    if (!ok || text !== SourceFile__from_ast.Text(((((entry__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile)) {
                        (entry__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingReload = PendingReloadFull$constant();
                    }
                    else {
                        (entry__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingReload = PendingReloadFileNames$constant();
                    }
                }
            });
            return true;
        });
        return new changeFileResult(affectedProjects, affectedFiles);
    }
    static $go$private$project$isConfigBaseName(c: {
        value: configFileRegistryBuilder;
    } | undefined, baseName: gostring): bool {
        return baseName === "tsconfig.json" || baseName === "jsconfig.json" || ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.customConfigFileName !== "" && baseName === (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.customConfigFileName);
    }
    static $go$private$project$releaseConfigForProject(c: {
        value: configFileRegistryBuilder;
    } | undefined, configFilePath: Path__from_tspath, projectPath: Path__from_tspath): void {
        {
            const __gotots_results_9 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, configFilePath);
            let entry: {
                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                    value: configFileEntry;
                } | undefined>;
            } | undefined = __gotots_results_9[0];
            let ok = __gotots_results_9[1];
            if (ok) {
                SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry, (config: {
                    value: configFileEntry;
                } | undefined): bool => {
                    const __gotots_results_10 = (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingProjects.lookupOk(projectPath);
                    let exists = __gotots_results_10[1];
                    return exists;
                }, (config: {
                    value: configFileEntry;
                } | undefined): void => {
                    (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingProjects.delete(projectPath);
                });
            }
        }
    }
    static $go$private$project$reloadIfNeeded(c: {
        value: configFileRegistryBuilder;
    } | undefined, entry: {
        value: configFileEntry;
    } | undefined, fileName: gostring, path: Path__from_tspath, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        switch ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingReload.$value) {
            case 1: {
                LogTree__from_logging.Log(logger, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("Reloading file names for config: " + fileName)]));
                (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine = ParsedCommandLine__from_tsoptions.ReloadFileNamesOfParsedCommandLine((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine, new $goInterfaceAdapter$PointerTo_Named_project$sourceFS((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs));
                break;
            }
            case 2: {
                LogTree__from_logging.Log(logger, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("Loading config file: " + fileName)]));
                let oldCommandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine;
                const __gotots_store_21 = (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_results_16 = GetParsedCommandLineOfConfigFilePath__from_tsoptions(fileName, path, void 0, void 0, new $goInterfaceAdapter$PointerTo_Named_project$configFileRegistryBuilder(c), new $goInterfaceAdapter$PointerTo_Named_project$configFileRegistryBuilder(c));
                __gotots_store_21.commandLine = __gotots_results_16[0];
                configFileRegistryBuilder.$go$private$project$updateExtendingConfigs(c, path, (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine, oldCommandLine);
                configFileRegistryBuilder.$go$private$project$updateRootFilesWatch(c, fileName, entry);
                LogTree__from_logging.Log(logger, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("Finished loading config file")]));
                break;
            }
            default: {
                return;
                break;
            }
        }
        (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingReload = PendingReloadNone$constant();
    }
    static $go$private$project$updateExtendingConfigs(c: {
        value: configFileRegistryBuilder;
    } | undefined, extendingConfigPath: Path__from_tspath, newCommandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, oldCommandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): void {
        let newExtendedConfigPaths = Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
            return GoMap.nil();
        });
        const newExtendedConfigPaths$location = tsonicTypeScriptRuntime.boundLocation({}, () => newExtendedConfigPaths, newExtendedConfigPaths$next => newExtendedConfigPaths = newExtendedConfigPaths$next);
        if (!(newCommandLine === undefined)) {
            const __gotots_range_9 = ParsedCommandLine__from_tsoptions.ExtendedSourceFiles(newCommandLine);
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_9.length; __gotots_range_index_0++) {
                const __gotots_range_value_29 = __gotots_range_9.get(__gotots_range_index_0);
                let extendedConfig = __gotots_range_value_29;
                const __gotots_callee_10: sourceFS["toPath"] = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_argument_26 = extendedConfig;
                let extendedConfigPath = (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_26);
                Set$Add$Named_tspath$Path(newExtendedConfigPaths$location, extendedConfigPath);
                const __gotots_results_20 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, extendedConfigPath, newExtendedConfigFileEntry(extendedConfig, extendingConfigPath));
                let entry: {
                    value: SyncMapEntry__from_dirty<Path__from_tspath, {
                        value: configFileEntry;
                    } | undefined>;
                } | undefined = __gotots_results_20[0];
                let loaded = __gotots_results_20[1];
                if (loaded) {
                    SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry, (config: {
                        value: configFileEntry;
                    } | undefined): bool => {
                        const __gotots_results_21 = (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingConfigs.lookupOk(extendingConfigPath);
                        let alreadyRetaining = __gotots_results_21[1];
                        return !alreadyRetaining;
                    }, (config: {
                        value: configFileEntry;
                    } | undefined): void => {
                        if ((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingConfigs.isNil()) {
                            (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingConfigs = GoMap.make(0, []);
                        }
                        (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingConfigs.store(extendingConfigPath, new GoEmptyStruct);
                    });
                }
            }
        }
        if (!(oldCommandLine === undefined)) {
            const __gotots_range_10 = ParsedCommandLine__from_tsoptions.ExtendedSourceFiles(oldCommandLine);
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_10.length; __gotots_range_index_1++) {
                const __gotots_range_value_30 = __gotots_range_10.get(__gotots_range_index_1);
                let extendedConfig = __gotots_range_value_30;
                const __gotots_callee_11: sourceFS["toPath"] = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_argument_27 = extendedConfig;
                let extendedConfigPath = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27);
                if (Set__from_collections.Has<Path__from_tspath>(newExtendedConfigPaths$location, extendedConfigPath)) {
                    continue;
                }
                {
                    const __gotots_results_22 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$configFileEntry((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, extendedConfigPath);
                    let entry: {
                        value: SyncMapEntry__from_dirty<Path__from_tspath, {
                            value: configFileEntry;
                        } | undefined>;
                    } | undefined = __gotots_results_22[0];
                    let ok = __gotots_results_22[1];
                    if (ok) {
                        SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$configFileEntry(entry, (config: {
                            value: configFileEntry;
                        } | undefined): bool => {
                            const __gotots_results_23 = (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingConfigs.lookupOk(extendingConfigPath);
                            let exists = __gotots_results_23[1];
                            return exists;
                        }, (config: {
                            value: configFileEntry;
                        } | undefined): void => {
                            (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.retainingConfigs.delete(extendingConfigPath);
                        });
                    }
                }
            }
        }
    }
    static $go$private$project$updateRootFilesWatch(c: {
        value: configFileRegistryBuilder;
    } | undefined, fileName: gostring, entry: {
        value: configFileEntry;
    } | undefined): void {
        if ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch === undefined) {
            return;
        }
        let ignored: GoMapValue<gostring, GoEmptyStruct> = $goMap$MapOf_string_To_Struct_void.nil();
        let globs = RuntimeSlice.nil<gostring>();
        let externalDirectories = RuntimeSlice.nil<gostring>();
        let includeWorkspace = false;
        let includeTsconfigDir = false;
        let tsconfigDir = GetDirectoryPath__from_tspath(fileName);
        let wildcardDirectories: GoMapValue<gostring, bool> = ParsedCommandLine__from_tsoptions.WildcardDirectories((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine);
        const __gotots_field_3: SessionOptions["CurrentDirectory"] = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory;
        const __gotots_receiver_10 = configFileRegistryBuilder.FS(c);
        const __gotots_field_4 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_10).UseCaseSensitiveFileNames();
        let comparePathsOptions = new ComparePathsOptions__from_tspath(__gotots_field_4, __gotots_field_3);
        const __gotots_range_11 = wildcardDirectories;
        const __gotots_range_keys_9 = __gotots_range_11.keys();
        for (const __gotots_range_value_31 of __gotots_range_keys_9) {
            const __gotots_range_value_32 = __gotots_range_11.lookupOk(__gotots_range_value_31);
            if (!__gotots_range_value_32[1]) {
                continue;
            }
            const __gotots_range_value_33 = __gotots_range_value_31;
            let dir = __gotots_range_value_33;
            if (ContainsPath__from_tspath(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory, dir, ComparePathsOptions__from_tspath.$copy(comparePathsOptions))) {
                includeWorkspace = true;
            }
            else if (ContainsPath__from_tspath(tsconfigDir, dir, ComparePathsOptions__from_tspath.$copy(comparePathsOptions))) {
                includeTsconfigDir = true;
            }
            else {
                externalDirectories = externalDirectories.append("", [dir]);
            }
        }
        const __gotots_range_12 = ParsedCommandLine__from_tsoptions.LiteralFileNames((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine);
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_12.length; __gotots_range_index_2++) {
            const __gotots_range_value_34 = __gotots_range_12.get(__gotots_range_index_2);
            let fileName__shadow_1 = __gotots_range_value_34;
            if (ContainsPath__from_tspath(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory, fileName__shadow_1, ComparePathsOptions__from_tspath.$copy(comparePathsOptions))) {
                includeWorkspace = true;
            }
            else if (ContainsPath__from_tspath(tsconfigDir, fileName__shadow_1, ComparePathsOptions__from_tspath.$copy(comparePathsOptions))) {
                includeTsconfigDir = true;
            }
            else {
                externalDirectories = externalDirectories.append("", [GetDirectoryPath__from_tspath(fileName__shadow_1)]);
            }
        }
        if (includeWorkspace) {
            globs = globs.append("", [getRecursiveGlobPattern(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory)]);
        }
        if (includeTsconfigDir) {
            globs = globs.append("", [getRecursiveGlobPattern(tsconfigDir)]);
        }
        const __gotots_range_13 = ParsedCommandLine__from_tsoptions.ExtendedSourceFiles((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine);
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_13.length; __gotots_range_index_3++) {
            const __gotots_range_value_35 = __gotots_range_13.get(__gotots_range_index_3);
            let fileName__shadow_1 = __gotots_range_value_35;
            if (includeWorkspace && ContainsPath__from_tspath(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory, fileName__shadow_1, ComparePathsOptions__from_tspath.$copy(comparePathsOptions))) {
                continue;
            }
            globs = globs.append("", [fileName__shadow_1]);
        }
        if (externalDirectories.length > 0) {
            const __gotots_results_24 = GetCommonParents__from_tspath(externalDirectories, minWatchLocationDepth$int, getPathComponentsForWatching, ComparePathsOptions__from_tspath.$copy(comparePathsOptions));
            let commonParents = __gotots_results_24[0];
            let ignoredExternalDirs: GoMapValue<gostring, GoEmptyStruct> = __gotots_results_24[1];
            const __gotots_range_14 = commonParents;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_14.length; __gotots_range_index_4++) {
                const __gotots_range_value_36 = __gotots_range_14.get(__gotots_range_index_4);
                let parent = __gotots_range_value_36;
                globs = globs.append("", [getRecursiveGlobPattern(parent)]);
            }
            ignored = ignoredExternalDirs;
        }
        Sort$SliceOf_string$string(globs);
        (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch = WatchedFiles$Clone$Named_project$PatternsAndIgnored((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch, PatternsAndIgnored.$fromStorage({
            patternsInsideWorkspace: globs,
            ignored: ignored,
            directoriesOutsideWorkspace: RuntimeSlice.nil<gostring>()
        }));
    }
}
export function newConfigFileRegistryBuilder(hasRelativePatternCapability: bool, fs: {
    value: snapshotFSBuilder;
} | undefined, oldConfigFileRegistry: {
    value: ConfigFileRegistry;
} | undefined, extendedConfigCache: {
    value: OwnerCache<Path__from_tspath, {
        value: ExtendedConfigCacheEntry;
    } | undefined, ExtendedConfigParseArgs>;
} | undefined, snapshotID: uint64, sessionOptions: {
    value: SessionOptions;
} | undefined, customConfigFileName: gostring, logger: {
    value: LogTree__from_logging;
} | undefined): {
    value: configFileRegistryBuilder;
} | undefined {
    const __gotots_field_0 = hasRelativePatternCapability;
    const __gotots_field_1 = newSourceFS(false, new GoInterfaceAdapter(fs), (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath);
    const __gotots_receiver_0 = fs;
    const __gotots_field_2 = ($argument0: Path__from_tspath): bool => {
        return snapshotFSBuilder.$go$private$project$isOpenFile(__gotots_receiver_0, $argument0);
    };
    return { value: new configFileRegistryBuilder(__gotots_field_0, __gotots_field_1, __gotots_field_2, extendedConfigCache, snapshotID, sessionOptions, customConfigFileName, oldConfigFileRegistry, NewSyncMap__from_dirty<Path__from_tspath, {
            value: configFileEntry;
        } | undefined>((oldConfigFileRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs), NewMap$Named_tspath$Path$PointerTo_Named_project$configFileNames((oldConfigFileRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileNames), customConfigFileName !== (oldConfigFileRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.customConfigFileName) };
}
export class changeFileResult {
    declare private readonly $goType: void;
    public constructor(public affectedProjects: GoMapValue<Path__from_tspath, GoEmptyStruct>, public affectedFiles: GoMapValue<Path__from_tspath, GoEmptyStruct>) {
    }
    static $copy($source: changeFileResult): changeFileResult {
        return new changeFileResult($source.affectedProjects, $source.affectedFiles);
    }
    declare private readonly then?: never;
}
