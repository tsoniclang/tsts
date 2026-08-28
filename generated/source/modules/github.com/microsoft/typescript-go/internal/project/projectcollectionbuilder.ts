import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CheckerPool as CheckerPool__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { BreadthFirstSearchLevel as BreadthFirstSearchLevel__from_core, CompilerOptions as CompilerOptions__from_core, WorkGroup as WorkGroup__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { FileChangeType as FileChangeType__from_lsproto, ResolvedClientCapabilities as ResolvedClientCapabilities__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { TypingsInfo as TypingsInfo__from_ata } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/ata/package.js";
import type { SyncMap as SyncMap__from_dirty, Value as Value__from_dirty } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/dirty/package.js";
import type { TsConfigSourceFile as TsConfigSourceFile__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Client } from "./client.js";
import type { compilerHost } from "./compilerhost.js";
import type { ConfigFileRegistry } from "./configfileregistry.js";
import type { mapEntry$Storage as mapEntry__from_dirty$Storage } from "./dirty/entry.js";
import type { ExtendedConfigCacheEntry, ExtendedConfigParseArgs } from "./extendedconfigcache.js";
import type { FileHandle, Overlay } from "./overlayfs.js";
import type { OwnerCache } from "./ownercache.js";
import type { ParseCacheKey, ParseCacheKey$Storage as ParseCacheKey__from_project$Storage } from "./parsecache.js";
import type { RefCountCache } from "./refcountcache.js";
import type { SessionOptions } from "./session.js";
import type { APISnapshotRequest, ATAStateChange } from "./snapshot.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint64 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, $goStorageType, GoContainerStoredValue, GoStoredValue } from "@gotots/runtime/storage.js";
import { SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { BreadthFirstSearchOptions as BreadthFirstSearchOptions__from_core, BreadthFirstSearchResult as BreadthFirstSearchResult__from_core, NewWorkGroup as NewWorkGroup__from_core, TSTrue$constant as TSTrue$constant__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { DocumentUri as DocumentUri__from_lsproto, FileChangeTypeChanged$constant as FileChangeTypeChanged$constant__from_lsproto, FileChangeTypeCreated$constant as FileChangeTypeCreated$constant__from_lsproto, FileChangeTypeDeleted$constant as FileChangeTypeDeleted$constant__from_lsproto, GetClientCapabilities as GetClientCapabilities__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { Box as Box__from_dirty, NewSyncMap as NewSyncMap__from_dirty, SyncMapEntry as SyncMapEntry__from_dirty } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/dirty/package.js";
import { LogTree as LogTree__from_logging } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/package.js";
import { NewParsedCommandLine as NewParsedCommandLine__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, GetBaseFileName as GetBaseFileName__from_tspath, Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$AddIfAbsent$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { Set$Keys$Named_lsproto$DocumentUri, Set$Keys$Named_tspath$Path, Set$Keys$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { Set$Len$Named_lsproto$DocumentUri } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Store$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { SyncSet$AddIfAbsent$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$AddIfAbsent.js";
import { SyncSet$Range$Named_project$searchNodeKey } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Range.js";
import { BreadthFirstSearchLevel$Delete$Named_project$searchNodeKey$Named_project$searchNode } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/BreadthFirstSearchLevel$Delete.js";
import { BreadthFirstSearchLevel$Has$Named_project$searchNodeKey$Named_project$searchNode } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/BreadthFirstSearchLevel$Has.js";
import { BreadthFirstSearchLevel$Range$Named_project$searchNodeKey$Named_project$searchNode } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/BreadthFirstSearchLevel$Range.js";
import { BreadthFirstSearchParallelEx$Named_project$searchNodeKey$Named_project$searchNode } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/BreadthFirstSearchParallelEx.js";
import { FirstNonZero$Named_lsproto$DocumentUri } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstNonZero.js";
import { IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Map$string$Named_project$searchNode } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { WatchedFiles$Clone$Named_project$PatternsAndIgnored } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/WatchedFiles$Clone.js";
import { Box$ChangeIf$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Box$ChangeIf.js";
import { Box$Finalize$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Box$Finalize.js";
import { Box$Set$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Box$Set.js";
import { Box$Value$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Box$Value.js";
import { NewBox$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/NewBox.js";
import { SyncMap$Finalize$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$Finalize.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$LoadOrStore.js";
import { SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$Range.js";
import { SyncMapEntry$Change$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMapEntry$Change.js";
import { SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMapEntry$ChangeIf.js";
import { SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMapEntry$Value.js";
import { mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/mapEntry$Key.js";
import { Clone$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void } from "../../../../../../support/generics/concretizations/maps/Clone.js";
import { Equal$MapOf_Named_tspath$Path_To_Named_tspath$Path$MapOf_Named_tspath$Path_To_Named_tspath$Path$Named_tspath$Path$Named_tspath$Path, Equal$MapOf_Named_tspath$Path_To_Struct_void$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void, Equal$MapOf_Named_tspath$Path_To_string$MapOf_Named_tspath$Path_To_string$Named_tspath$Path$string } from "../../../../../../support/generics/concretizations/maps/Equal.js";
import { Keys$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void } from "../../../../../../support/generics/concretizations/maps/Keys.js";
import { Collect$Named_tspath$Path } from "../../../../../../support/generics/concretizations/slices/Collect.js";
import { Delete$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Delete.js";
import { Index$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Index.js";
import { Sort$SliceOf_Named_tspath$Path$Named_tspath$Path, Sort$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Sort.js";
import { $goInterfaceAdapter$Named_time$Duration, $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project, $goInterfaceAdapter$PointerTo_Named_project$checkerPool, $goInterfaceAdapter$SliceOf_Named_tspath$Path, $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_dirty$BoxOf_PointerTo_Named_project$Project as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project, $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_Named_tspath$Path as GoMap } from "../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { checkerPool } from "./checkerpool.js";
import { newCompilerHost } from "./compilerhost.js";
import { changeFileResult, configFileRegistryBuilder, newConfigFileRegistryBuilder } from "./configfileregistrybuilder.js";
import { mapEntry as mapEntry__from_dirty } from "./dirty/entry.js";
import { FileChangeSummary } from "./filechange.js";
import { fileBase } from "./overlayfs.js";
import { KindConfigured$constant, KindInferred$constant, NewConfiguredProject, NewInferredProject, ProgramUpdateKindCloned$constant, ProgramUpdateKindNewFiles$constant, Project, inferredProjectName$string } from "./project.js";
import { ProjectCollection, findDefaultConfiguredProjectFromProgramInclusion, openFilePaths } from "./projectcollection.js";
import { ProjectTreeRequest } from "./snapshot.js";
import { snapshotFSBuilder, sourceFS } from "./snapshotfs.js";
import { PatternsAndIgnored, getTypingsLocationsGlobs } from "./watch.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export class projectLoadKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function projectLoadKindFind$constant(): projectLoadKind {
    return new projectLoadKind(0);
}
export function projectLoadKindCreate$constant(): projectLoadKind {
    return new projectLoadKind(1);
}
export class ProjectCollectionBuilder {
    declare private readonly $goType: void;
    public constructor(public sessionOptions: {
        value: SessionOptions;
    } | undefined, public parseCache: {
        value: RefCountCache<ParseCacheKey, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, FileHandle | undefined>;
    } | undefined, public extendedConfigCache: {
        value: OwnerCache<Path__from_tspath, {
            value: ExtendedConfigCacheEntry;
        } | undefined, ExtendedConfigParseArgs>;
    } | undefined, public toPath: (($0: gostring) => Path__from_tspath) | undefined, public ctx: GoInterface | undefined, public fs: {
        value: snapshotFSBuilder;
    } | undefined, public base: {
        value: ProjectCollection;
    } | undefined, public compilerOptionsForInferredProjects: {
        value: CompilerOptions__from_core;
    } | undefined, public configFileRegistryBuilder: {
        value: configFileRegistryBuilder;
    } | undefined, public client: Client | undefined, public newSnapshotID: uint64, public programStructureChanged: bool, public defaultProjectsInvalidated: bool, public openFilesChanged: bool, public fileDefaultProjects: GoMapValue<Path__from_tspath, Path__from_tspath>, public configuredProjects: {
        value: SyncMap__from_dirty<Path__from_tspath, {
            value: Project;
        } | undefined>;
    } | undefined, public inferredProject: {
        value: Box__from_dirty<{
            value: Project;
        } | undefined>;
    } | undefined, public apiOpenedProjects: GoMapValue<Path__from_tspath, GoEmptyStruct>) {
    }
    static $copy($source: ProjectCollectionBuilder): ProjectCollectionBuilder {
        return new ProjectCollectionBuilder($source.sessionOptions, $source.parseCache, $source.extendedConfigCache, $source.toPath, $source.ctx, $source.fs, $source.base, $source.compilerOptionsForInferredProjects, $source.configFileRegistryBuilder, $source.client, $source.newSnapshotID, $source.programStructureChanged, $source.defaultProjectsInvalidated, $source.openFilesChanged, $source.fileDefaultProjects, $source.configuredProjects, $source.inferredProject, $source.apiOpenedProjects);
    }
    declare private readonly then?: never;
    static DidChangeCustomConfigFileName(b: {
        value: ProjectCollectionBuilder;
    } | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        if (!configFileRegistryBuilder.DidChangeCustomConfigFileName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistryBuilder, logger)) {
            return;
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects = GoMap.nil();
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.defaultProjectsInvalidated = true;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programStructureChanged = true;
    }
    static DidChangeFiles(b: {
        value: ProjectCollectionBuilder;
    } | undefined, summary: FileChangeSummary, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        let __gotots_logical_result_0 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.openFilesChanged || !(summary.Opened.$value ===
            ((void DocumentUri__from_lsproto,
                "") as string));
        if (!__gotots_logical_result_0) {
            const __gotots_store_0 = summary;
            const __gotots_binary_operand_0 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Closed"));
            const __gotots_binary_operand_1 = 0;
            __gotots_logical_result_0 = __gotots_binary_operand_0 > __gotots_binary_operand_1;
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.openFilesChanged = __gotots_logical_result_0;
        const __gotots_argument_11 = 0;
        const __gotots_store_1 = summary;
        const __gotots_argument_12 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Changed"));
        const __gotots_argument_13 = ((void Path__from_tspath,
            "") as string);
        let changedFiles = RuntimeSlice.make<gostring>(__gotots_argument_11, __gotots_argument_12, __gotots_argument_13);
        const __gotots_store_2 = summary;
        const __gotots_range_1 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Changed"));
        const __gotots_range_keys_1 = __gotots_range_1.keys();
        for (const __gotots_range_value_4 of __gotots_range_keys_1) {
            const __gotots_range_value_5 = __gotots_range_1.lookupOk(__gotots_range_value_4);
            if (!__gotots_range_value_5[1]) {
                continue;
            }
            const __gotots_range_value_6 = __gotots_range_value_4;
            let uri = __gotots_range_value_6;
            let fileName = uri.FileName();
            const __gotots_callee_2: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_14 = fileName;
            let path = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14);
            changedFiles = changedFiles.append(((void Path__from_tspath,
                "") as string), [path.$value]);
        }
        let configChangeLogger: {
            value: LogTree__from_logging;
        } | undefined = LogTree__from_logging.Fork(logger, "Checking for changes affecting config files");
        let configChangeResult = configFileRegistryBuilder.DidChangeFiles((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistryBuilder, FileChangeSummary.$copy(summary), configChangeLogger);
        logChangeFileResult(changeFileResult.$copy(configChangeResult), configChangeLogger);
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programStructureChanged = ProjectCollectionBuilder.$go$private$project$markProjectsAffectedByConfigChanges(b, changeFileResult.$copy(configChangeResult), logger);
        ProjectCollectionBuilder.$go$private$project$forEachProject(b, (entry: Value__from_dirty<{
            value: Project;
        } | undefined> | undefined): bool => {
            if (summary.HasExcessiveNonCreateWatchEvents()) {
                const __gotots_receiver_2 = entry;
                const __gotots_argument_15 = (p: {
                    value: Project;
                } | undefined): void => {
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty = true;
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirtyFilePath = new Path__from_tspath("");
                    if (!(logger === undefined)) {
                        LogTree__from_logging.Logf(logger, "Marking project as dirty due to excessive watch changes: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath)]));
                    }
                };
                goInterfaceNonNil<Value__from_dirty<{
                    value: Project;
                } | undefined>>(__gotots_receiver_2).Change(__gotots_argument_15);
                return true;
            }
            ProjectCollectionBuilder.$go$private$project$markFilesChanged(b, entry, changedFiles, FileChangeTypeChanged$constant__from_lsproto(), logger);
            const __gotots_receiver_3 = entry;
            let __gotots_logical_result_1 = (goInterfaceNonNil<Value__from_dirty<{
                value: Project;
            } | undefined>>(__gotots_receiver_3).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === KindInferred$constant().$value;
            if (__gotots_logical_result_1) {
                const __gotots_store_3 = summary;
                const __gotots_binary_operand_2 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Closed"));
                const __gotots_binary_operand_3 = 0;
                __gotots_logical_result_1 = __gotots_binary_operand_2 > __gotots_binary_operand_3;
            }
            if (__gotots_logical_result_1) {
                const __gotots_receiver_4 = entry;
                let rootFilesMap: GoMapValue<Path__from_tspath, gostring> = ParsedCommandLine__from_tsoptions.FileNamesByPath((goInterfaceNonNil<Value__from_dirty<{
                    value: Project;
                } | undefined>>(__gotots_receiver_4).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine);
                const __gotots_receiver_5 = entry;
                let newRootFiles = ParsedCommandLine__from_tsoptions.FileNames((goInterfaceNonNil<Value__from_dirty<{
                    value: Project;
                } | undefined>>(__gotots_receiver_5).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine);
                const __gotots_store_4 = summary;
                const __gotots_range_2 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Closed"));
                const __gotots_range_keys_2 = __gotots_range_2.keys();
                for (const __gotots_range_value_7 of __gotots_range_keys_2) {
                    const __gotots_range_value_8 = __gotots_range_2.lookupOk(__gotots_range_value_7);
                    if (!__gotots_range_value_8[1]) {
                        continue;
                    }
                    const __gotots_range_value_9 = __gotots_range_value_7;
                    let uri = __gotots_range_value_9;
                    let fileName = uri.FileName();
                    const __gotots_callee_3: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                    const __gotots_argument_16 = fileName;
                    let path = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16);
                    {
                        const __gotots_results_1 = rootFilesMap.lookupOk(path);
                        let ok = __gotots_results_1[1];
                        if (ok) {
                            newRootFiles = Delete$SliceOf_string$string(newRootFiles, Index$SliceOf_string$string(newRootFiles, fileName), Index$SliceOf_string$string(newRootFiles, fileName) + 1);
                        }
                    }
                }
                ProjectCollectionBuilder.$go$private$project$updateInferredProjectRoots(b, newRootFiles, logger);
            }
            const __gotots_store_5 = summary;
            const __gotots_binary_operand_4 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Deleted"));
            const __gotots_binary_operand_5 = 0;
            if (__gotots_binary_operand_4 > __gotots_binary_operand_5) {
                const __gotots_argument_17 = 0;
                const __gotots_store_6 = summary;
                const __gotots_argument_18 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Deleted"));
                const __gotots_argument_19 = ((void Path__from_tspath,
                    "") as string);
                let deletedPaths = RuntimeSlice.make<gostring>(__gotots_argument_17, __gotots_argument_18, __gotots_argument_19);
                const __gotots_store_7 = summary;
                const __gotots_range_3 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Deleted"));
                const __gotots_range_keys_3 = __gotots_range_3.keys();
                for (const __gotots_range_value_10 of __gotots_range_keys_3) {
                    const __gotots_range_value_11 = __gotots_range_3.lookupOk(__gotots_range_value_10);
                    if (!__gotots_range_value_11[1]) {
                        continue;
                    }
                    const __gotots_range_value_12 = __gotots_range_value_10;
                    let uri = __gotots_range_value_12;
                    let fileName = uri.FileName();
                    const __gotots_callee_4: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                    const __gotots_argument_20 = fileName;
                    let path = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20);
                    deletedPaths = deletedPaths.append(((void Path__from_tspath,
                        "") as string), [path.$value]);
                }
                ProjectCollectionBuilder.$go$private$project$markFilesChanged(b, entry, deletedPaths, FileChangeTypeDeleted$constant__from_lsproto(), logger);
            }
            const __gotots_store_8 = summary;
            const __gotots_binary_operand_6 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Created"));
            const __gotots_binary_operand_7 = 0;
            if (__gotots_binary_operand_6 > __gotots_binary_operand_7) {
                const __gotots_argument_21 = 0;
                const __gotots_store_9 = summary;
                const __gotots_argument_22 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Created"));
                const __gotots_argument_23 = ((void Path__from_tspath,
                    "") as string);
                let createdPaths = RuntimeSlice.make<gostring>(__gotots_argument_21, __gotots_argument_22, __gotots_argument_23);
                const __gotots_store_10 = summary;
                const __gotots_range_4 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Created"));
                const __gotots_range_keys_4 = __gotots_range_4.keys();
                for (const __gotots_range_value_13 of __gotots_range_keys_4) {
                    const __gotots_range_value_14 = __gotots_range_4.lookupOk(__gotots_range_value_13);
                    if (!__gotots_range_value_14[1]) {
                        continue;
                    }
                    const __gotots_range_value_15 = __gotots_range_value_13;
                    let uri = __gotots_range_value_15;
                    let fileName = uri.FileName();
                    const __gotots_callee_5: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                    const __gotots_argument_24 = fileName;
                    let path = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24);
                    createdPaths = createdPaths.append(((void Path__from_tspath,
                        "") as string), [path.$value]);
                }
                ProjectCollectionBuilder.$go$private$project$markFilesChanged(b, entry, createdPaths, FileChangeTypeCreated$constant__from_lsproto(), logger);
            }
            return true;
        });
        if (!(summary.Opened.$value ===
            ((void DocumentUri__from_lsproto,
                "") as string)) || !(summary.Reopened.$value ===
            ((void DocumentUri__from_lsproto,
                "") as string))) {
            let toRemoveProjects = Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
                return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
            });
            const toRemoveProjects$location = tsonicTypeScriptRuntime.boundLocation({}, () => toRemoveProjects, toRemoveProjects$next => toRemoveProjects = toRemoveProjects$next);
            let fileName = FirstNonZero$Named_lsproto$DocumentUri(RuntimeSlice.literal<gostring>([summary.Opened.$value, summary.Reopened.$value])).FileName();
            const __gotots_callee_6: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_25 = fileName;
            let path = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25);
            let openFileResult = ProjectCollectionBuilder.$go$private$project$ensureConfiguredProjectAndAncestorsForFile(b, fileName, path, logger);
            SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, (entry: {
                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                    value: Project;
                } | undefined>;
            } | undefined): bool => {
                const __gotots_receiver_6 = toRemoveProjects$location;
                const __gotots_store_11 = SyncMapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                const __gotots_argument_26 = mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$Project(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, {
                    value: Project;
                } | undefined>, mapEntry__from_dirty<Path__from_tspath, {
                    value: Project;
                } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf));
                Set$Add$Named_tspath$Path(__gotots_receiver_6, __gotots_argument_26);
                return true;
            });
            let isReferencedBy: (($0: {
                value: Project;
            } | undefined, $1: Path__from_tspath, $2: tsonicTypeScriptRuntime.Location<Set__from_collections<{
                value: Project;
            } | undefined>> | undefined) => bool) | undefined;
            isReferencedBy = (project: {
                value: Project;
            } | undefined, refPath: Path__from_tspath, seenProjects: tsonicTypeScriptRuntime.Location<Set__from_collections<{
                value: Project;
            } | undefined>> | undefined): bool => {
                if (!Set$AddIfAbsent$PointerTo_Named_project$Project(seenProjects, project)) {
                    return false;
                }
                if (!((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.potentialProjectReferences === undefined)) {
                    const __gotots_range_5 = Set$Keys$Named_tspath$Path((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.potentialProjectReferences);
                    const __gotots_range_keys_5 = __gotots_range_5.keys();
                    for (const __gotots_range_value_16 of __gotots_range_keys_5) {
                        const __gotots_range_value_17 = __gotots_range_5.lookupOk(__gotots_range_value_16);
                        if (!__gotots_range_value_17[1]) {
                            continue;
                        }
                        const __gotots_range_value_18 = __gotots_range_value_16;
                        let potentialRef = __gotots_range_value_18;
                        if (potentialRef.$value === refPath.$value) {
                            return true;
                        }
                    }
                    const __gotots_range_6 = Set$Keys$Named_tspath$Path((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.potentialProjectReferences);
                    const __gotots_range_keys_6 = __gotots_range_6.keys();
                    for (const __gotots_range_value_19 of __gotots_range_keys_6) {
                        const __gotots_range_value_20 = __gotots_range_6.lookupOk(__gotots_range_value_19);
                        if (!__gotots_range_value_20[1]) {
                            continue;
                        }
                        const __gotots_range_value_21 = __gotots_range_value_19;
                        let potentialRef = __gotots_range_value_21;
                        {
                            const __gotots_results_2 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, potentialRef);
                            let refProject: {
                                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                                    value: Project;
                                } | undefined>;
                            } | undefined = __gotots_results_2[0];
                            let foundRef = __gotots_results_2[1];
                            let __gotots_logical_result_2 = foundRef;
                            if (__gotots_logical_result_2) {
                                const __gotots_callee_7 = isReferencedBy;
                                const __gotots_argument_27 = SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project(refProject);
                                const __gotots_argument_28 = refPath;
                                const __gotots_argument_29 = seenProjects;
                                __gotots_logical_result_2 = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27, __gotots_argument_28, __gotots_argument_29);
                            }
                            if (__gotots_logical_result_2) {
                                return true;
                            }
                        }
                    }
                }
                else {
                    let program: {
                        value: Program__from_compiler;
                    } | undefined = Project.GetProgram(project);
                    if (!(program === undefined) && !Program__from_compiler.RangeResolvedProjectReference(program, (referencePath: Path__from_tspath, $1: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $2: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $3: int): bool => {
                        return !(referencePath.$value === refPath.$value);
                    })) {
                        return true;
                    }
                }
                return false;
            };
            let retainProjectAndReferences: (($0: {
                value: Project;
            } | undefined) => void) | undefined = (project: {
                value: Project;
            } | undefined): void => {
                Set__from_collections.Delete<Path__from_tspath>(toRemoveProjects$location, (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath);
                {
                    let program: {
                        value: Program__from_compiler;
                    } | undefined = Project.GetProgram(project);
                    if (!(program === undefined)) {
                        Program__from_compiler.RangeResolvedProjectReference(program, (referencePath: Path__from_tspath, $1: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $2: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $3: int): bool => {
                            {
                                const __gotots_results_3 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, referencePath);
                                let ok = __gotots_results_3[1];
                                if (ok) {
                                    Set__from_collections.Delete<Path__from_tspath>(toRemoveProjects$location, referencePath);
                                }
                            }
                            return true;
                        });
                    }
                }
            };
            let retainDefaultConfiguredProject: (($0: gostring, $1: Path__from_tspath, $2: {
                value: Project;
            } | undefined) => void) | undefined = (openFile: gostring, openFilePath: Path__from_tspath, project: {
                value: Project;
            } | undefined): void => {
                const __gotots_callee_8 = retainProjectAndReferences;
                const __gotots_argument_30 = project;
                (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_30);
                configFileRegistryBuilder.$go$private$project$forEachConfigFileNameFor((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistryBuilder, openFilePath, (configFileName: gostring): void => {
                    {
                        const __gotots_receiver_7 = b;
                        const __gotots_argument_32 = configFileName;
                        const __gotots_callee_9: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                        const __gotots_argument_31 = configFileName;
                        const __gotots_argument_33 = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_31);
                        const __gotots_argument_34 = projectLoadKindFind$constant();
                        const __gotots_argument_35 = logger;
                        let ancestor: {
                            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                                value: Project;
                            } | undefined>;
                        } | undefined = ProjectCollectionBuilder.$go$private$project$findOrCreateProject(__gotots_receiver_7, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35);
                        if (!(ancestor === undefined)) {
                            const __gotots_callee_10 = retainProjectAndReferences;
                            const __gotots_argument_36 = SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project(ancestor);
                            (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_36);
                        }
                    }
                });
            };
            let inferredProjectFiles = RuntimeSlice.nil<gostring>();
            const __gotots_range_7: snapshotFSBuilder["overlays"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays;
            const __gotots_range_keys_7 = __gotots_range_7.keys();
            for (const __gotots_range_value_22 of __gotots_range_keys_7) {
                const __gotots_range_value_23 = __gotots_range_7.lookupOk(__gotots_range_value_22);
                if (!__gotots_range_value_23[1]) {
                    continue;
                }
                const __gotots_range_value_24 = __gotots_range_value_23[0];
                let overlay: {
                    value: Overlay;
                } | undefined = __gotots_range_value_24;
                const __gotots_store_12 = (overlay ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let openFile = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "fileBase"));
                const __gotots_callee_11: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_argument_37 = openFile;
                let openFilePath = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_37);
                {
                    let p: {
                        value: SyncMapEntry__from_dirty<Path__from_tspath, {
                            value: Project;
                        } | undefined>;
                    } | undefined = ProjectCollectionBuilder.$go$private$project$findDefaultConfiguredProject(b, openFile, openFilePath);
                    if (!(p === undefined)) {
                        const __gotots_callee_12 = retainDefaultConfiguredProject;
                        const __gotots_argument_38 = openFile;
                        const __gotots_argument_39 = openFilePath;
                        const __gotots_argument_40 = SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project(p);
                        (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_38, __gotots_argument_39, __gotots_argument_40);
                    }
                    else {
                        const __gotots_argument_41 = inferredProjectFiles;
                        const __gotots_store_13 = (overlay ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_42 = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "fileBase"));
                        inferredProjectFiles = __gotots_argument_41.append("", [__gotots_argument_42]);
                    }
                }
            }
            const __gotots_range_8 = Set$Keys$Named_tspath$Path(toRemoveProjects$location);
            const __gotots_range_keys_8 = __gotots_range_8.keys();
            for (const __gotots_range_value_25 of __gotots_range_keys_8) {
                const __gotots_range_value_26 = __gotots_range_8.lookupOk(__gotots_range_value_25);
                if (!__gotots_range_value_26[1]) {
                    continue;
                }
                const __gotots_range_value_27 = __gotots_range_value_25;
                let projectPath = __gotots_range_value_27;
                const __gotots_store_14 = openFileResult;
                if (Set__from_collections.Has<Path__from_tspath>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "retain"), projectPath)) {
                    continue;
                }
                {
                    const __gotots_results_4 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiOpenedProjects.lookupOk(projectPath);
                    let ok = __gotots_results_4[1];
                    if (ok) {
                        continue;
                    }
                }
                {
                    const __gotots_results_5 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, projectPath);
                    let p: {
                        value: SyncMapEntry__from_dirty<Path__from_tspath, {
                            value: Project;
                        } | undefined>;
                    } | undefined = __gotots_results_5[0];
                    let ok = __gotots_results_5[1];
                    if (ok) {
                        ProjectCollectionBuilder.$go$private$project$deleteConfiguredProject(b, new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project(p), logger);
                    }
                }
            }
            ProjectCollectionBuilder.$go$private$project$updateInferredProjectRoots(b, inferredProjectFiles, logger);
            configFileRegistryBuilder.Cleanup((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistryBuilder);
        }
    }
    static DidRequestFile(b: {
        value: ProjectCollectionBuilder;
    } | undefined, uri: DocumentUri__from_lsproto, configuredProjectsOnly: bool, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        let startTime = time__from_gostdlib.Now();
        let fileName = uri.FileName();
        const __gotots_callee_15: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_47 = fileName;
        let path = (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_47);
        if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.defaultProjectsInvalidated) {
            ProjectCollectionBuilder.$go$private$project$ensureConfiguredProjectAndAncestorsForFile(b, fileName, path, logger);
            if (!snapshotFSBuilder.$go$private$project$isOpenFile((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, path)) {
                return;
            }
        }
        if (snapshotFSBuilder.$go$private$project$isOpenFile((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, path)) {
            let hasChanges: ProjectCollectionBuilder["programStructureChanged"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programStructureChanged;
            {
                let result: Value__from_dirty<{
                    value: Project;
                } | undefined> | undefined = ProjectCollectionBuilder.$go$private$project$findDefaultProject(b, fileName, path);
                if (!(result === undefined)) {
                    hasChanges = ProjectCollectionBuilder.$go$private$project$updateProgram(b, result, logger) || hasChanges;
                    const __gotots_receiver_9 = result;
                    if (!(goInterfaceNonNil<Value__from_dirty<{
                        value: Project;
                    } | undefined>>(__gotots_receiver_9).Value() === undefined)) {
                        if (hasChanges) {
                            ProjectCollectionBuilder.$go$private$project$cleanupInferredProject(b, logger);
                            if (!(Box$Value$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject) === undefined)) {
                                ProjectCollectionBuilder.$go$private$project$updateProgram(b, new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject), logger);
                            }
                        }
                        return;
                    }
                }
            }
            SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, (entry: {
                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                    value: Project;
                } | undefined>;
            } | undefined): bool => {
                hasChanges = ProjectCollectionBuilder.$go$private$project$updateProgram(b, new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project(entry), logger) || hasChanges;
                return true;
            });
            if (hasChanges) {
                ProjectCollectionBuilder.$go$private$project$cleanupInferredProject(b, logger);
            }
            if (!(Box$Value$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject) === undefined)) {
                ProjectCollectionBuilder.$go$private$project$updateProgram(b, new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject), logger);
            }
        }
        else {
            let result = ProjectCollectionBuilder.$go$private$project$ensureConfiguredProjectAndAncestorsForFile(b, fileName, path, logger);
            if (result.project === undefined && !configuredProjectsOnly) {
                ProjectCollectionBuilder.$go$private$project$ensureInferredProjectIncludesClosedFile(b, fileName, logger);
            }
        }
        if (!(logger === undefined)) {
            let elapsed = time__from_gostdlib.Since(named_time.TimeOperations.$copy(startTime));
            LogTree__from_logging.Log(logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Completed file request for %s in %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fileName), new $goInterfaceAdapter$Named_time$Duration(elapsed)])))]));
        }
    }
    static DidRequestProject(b: {
        value: ProjectCollectionBuilder;
    } | undefined, projectId: Path__from_tspath, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        let startTime = time__from_gostdlib.Now();
        if (projectId.$value ===
            ((void Path__from_tspath,
                inferredProjectName$string) as string)) {
            if (!(Box$Value$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject) === undefined)) {
                ProjectCollectionBuilder.$go$private$project$updateProgram(b, new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject), logger);
            }
        }
        else {
            {
                const __gotots_results_8 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, projectId);
                let entry: {
                    value: SyncMapEntry__from_dirty<Path__from_tspath, {
                        value: Project;
                    } | undefined>;
                } | undefined = __gotots_results_8[0];
                let ok = __gotots_results_8[1];
                if (ok) {
                    ProjectCollectionBuilder.$go$private$project$updateProgram(b, new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project(entry), logger);
                }
            }
        }
        if (!(logger === undefined)) {
            let elapsed = time__from_gostdlib.Since(named_time.TimeOperations.$copy(startTime));
            LogTree__from_logging.Log(logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Completed project update request for %s in %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(projectId), new $goInterfaceAdapter$Named_time$Duration(elapsed)])))]));
        }
    }
    static DidRequestProjectTrees(b: {
        value: ProjectCollectionBuilder;
    } | undefined, projectTreeRequest: ProjectTreeRequest | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        let startTime = time__from_gostdlib.Now();
        let currentProjects = RuntimeSlice.nil<gostring>();
        SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, (sme: {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: Project;
            } | undefined>;
        } | undefined): bool => {
            const __gotots_argument_48 = currentProjects;
            const __gotots_store_17 = SyncMapEntry__from_dirty.$storageOf((sme ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
            const __gotots_argument_49 = mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$Project(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, {
                value: Project;
            } | undefined>, mapEntry__from_dirty<Path__from_tspath, {
                value: Project;
            } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf));
            currentProjects = __gotots_argument_48.append(((void Path__from_tspath,
                "") as string), [__gotots_argument_49.$value]);
            return true;
        });
        let seenProjects = SyncSet__from_collections.$zero<Path__from_tspath>();
        const seenProjects$location = tsonicTypeScriptRuntime.boundLocation({}, () => seenProjects, seenProjects$next => seenProjects = seenProjects$next);
        let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(false);
        const __gotots_range_14 = currentProjects;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_14.length; __gotots_range_index_0++) {
            const __gotots_range_value_43 = new Path__from_tspath(__gotots_range_14.get(__gotots_range_index_0));
            let projectId = __gotots_range_value_43;
            const __gotots_receiver_10 = wg;
            const __gotots_argument_50 = (): void => {
                {
                    const __gotots_results_9 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, projectId);
                    let entry: {
                        value: SyncMapEntry__from_dirty<Path__from_tspath, {
                            value: Project;
                        } | undefined>;
                    } | undefined = __gotots_results_9[0];
                    let ok = __gotots_results_9[1];
                    if (ok) {
                        {
                            let project: {
                                value: Project;
                            } | undefined = SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project(entry);
                            if (!(project === undefined) && (ProjectTreeRequest.IsAllProjects(projectTreeRequest) || Project.$go$private$project$hasPotentialProjectReference(project, projectTreeRequest))) {
                                ProjectCollectionBuilder.$go$private$project$updateProgram(b, new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project(entry), logger);
                            }
                        }
                        ProjectCollectionBuilder.$go$private$project$ensureProjectTree(b, wg, entry, projectTreeRequest, seenProjects$location, logger);
                    }
                }
            };
            goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_10).Queue(__gotots_argument_50);
        }
        const __gotots_receiver_11 = wg;
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_11).RunAndWait();
        if (!(logger === undefined)) {
            let elapsed = time__from_gostdlib.Since(named_time.TimeOperations.$copy(startTime));
            LogTree__from_logging.Log(logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Completed project tree request for %v in %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_Named_tspath$Path(ProjectTreeRequest.Projects(projectTreeRequest)), new $goInterfaceAdapter$Named_time$Duration(elapsed)])))]));
        }
    }
    static DidUpdateATAState(b: {
        value: ProjectCollectionBuilder;
    } | undefined, ataChanges: GoMapValue<Path__from_tspath, ATAStateChange | undefined>, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        let updateProject: (($0: Value__from_dirty<{
            value: Project;
        } | undefined> | undefined, $1: ATAStateChange | undefined) => void) | undefined = (project: Value__from_dirty<{
            value: Project;
        } | undefined> | undefined, ataChange: ATAStateChange | undefined): void => {
            const __gotots_receiver_1 = project;
            const __gotots_argument_5 = (p: {
                value: Project;
            } | undefined): bool => {
                if (p === undefined) {
                    return false;
                }
                return (((ataChange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypingsInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypingsInfo__from_ata>).value.Equals(Project.ComputeTypingsInfo(p));
            };
            const __gotots_argument_6 = (p: {
                value: Project;
            } | undefined): void => {
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.installedTypingsInfo = (ataChange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypingsInfo;
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsFiles = (ataChange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypingsFiles;
                const __gotots_argument_0 = (ataChange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypingsFilesToWatch;
                const __gotots_argument_1: SessionOptions["TypingsLocation"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypingsLocation;
                const __gotots_argument_2: SessionOptions["CurrentDirectory"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory;
                const __gotots_argument_3: Project["currentDirectory"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory;
                const __gotots_receiver_0: snapshotFSBuilder["fs"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
                const __gotots_argument_4 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_0).UseCaseSensitiveFileNames();
                let typingsWatchGlobs = getTypingsLocationsGlobs(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsWatch = WatchedFiles$Clone$Named_project$PatternsAndIgnored((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsWatch, PatternsAndIgnored.$copy(typingsWatchGlobs));
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty = true;
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirtyFilePath = new Path__from_tspath("");
            };
            goInterfaceNonNil<Value__from_dirty<{
                value: Project;
            } | undefined>>(__gotots_receiver_1).ChangeIf(__gotots_argument_5, __gotots_argument_6);
        };
        const __gotots_range_0 = ataChanges;
        const __gotots_range_keys_0 = __gotots_range_0.keys();
        for (const __gotots_range_value_0 of __gotots_range_keys_0) {
            const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
            if (!__gotots_range_value_1[1]) {
                continue;
            }
            const __gotots_range_value_2 = __gotots_range_value_0;
            const __gotots_range_value_3 = __gotots_range_value_1[0];
            let projectPath = __gotots_range_value_2;
            let ataChange: ATAStateChange | undefined = __gotots_range_value_3;
            LogTree__from_logging.Embed(logger, (ataChange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Logs);
            if (projectPath.$value ===
                ((void Path__from_tspath,
                    inferredProjectName$string) as string)) {
                const __gotots_callee_0 = updateProject;
                const __gotots_argument_7 = new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject);
                const __gotots_argument_8 = ataChange;
                (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7, __gotots_argument_8);
            }
            else {
                const __gotots_results_0 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, projectPath);
                let project: {
                    value: SyncMapEntry__from_dirty<Path__from_tspath, {
                        value: Project;
                    } | undefined>;
                } | undefined = __gotots_results_0[0];
                let ok = __gotots_results_0[1];
                if (ok) {
                    const __gotots_callee_1 = updateProject;
                    const __gotots_argument_9 = new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project(project);
                    const __gotots_argument_10 = ataChange;
                    (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9, __gotots_argument_10);
                }
            }
            if (!(logger === undefined)) {
                LogTree__from_logging.Log(logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Updated ATA state for project %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(projectPath)])))]));
            }
        }
    }
    static Finalize(b: {
        value: ProjectCollectionBuilder;
    } | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): [
        {
            value: ProjectCollection;
        } | undefined,
        {
            value: ConfigFileRegistry;
        } | undefined
    ] {
        let changed = false;
        let newProjectCollection: {
            value: ProjectCollection;
        } | undefined = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        let ensureCloned: (() => void) | undefined = (): void => {
            if (!changed) {
                newProjectCollection = ProjectCollection.$go$private$project$clone(newProjectCollection);
                changed = true;
            }
        };
        {
            const __gotots_results_10 = SyncMap$Finalize$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects);
            let configuredProjects: GoMapValue<Path__from_tspath, {
                value: Project;
            } | undefined> = __gotots_results_10[0];
            let configuredProjectsChanged = __gotots_results_10[1];
            if (configuredProjectsChanged) {
                const __gotots_callee_16 = ensureCloned;
                (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))();
                (newProjectCollection ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects = configuredProjects;
            }
        }
        if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.openFilesChanged) {
            const __gotots_callee_17 = ensureCloned;
            (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))();
            (newProjectCollection ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.openFiles = openFilePaths(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays);
        }
        if (!Equal$MapOf_Named_tspath$Path_To_Named_tspath$Path$MapOf_Named_tspath$Path_To_Named_tspath$Path$Named_tspath$Path$Named_tspath$Path((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects)) {
            const __gotots_callee_18 = ensureCloned;
            (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))();
            (newProjectCollection ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects;
        }
        {
            const __gotots_results_11 = Box$Finalize$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject);
            let newInferredProject: {
                value: Project;
            } | undefined = __gotots_results_11[0];
            let inferredProjectChanged = __gotots_results_11[1];
            if (inferredProjectChanged) {
                const __gotots_callee_19 = ensureCloned;
                (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))();
                (newProjectCollection ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject = newInferredProject;
            }
        }
        let configFileRegistry: {
            value: ConfigFileRegistry;
        } | undefined = configFileRegistryBuilder.Finalize((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistryBuilder);
        if (!(configFileRegistry
            ===
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistry)) {
            const __gotots_callee_20 = ensureCloned;
            (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))();
            (newProjectCollection ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistry = configFileRegistry;
        }
        if (!Equal$MapOf_Named_tspath$Path_To_Struct_void$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiOpenedProjects, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiOpenedProjects)) {
            const __gotots_callee_21 = ensureCloned;
            (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))();
            (newProjectCollection ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiOpenedProjects = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiOpenedProjects;
        }
        return [newProjectCollection, configFileRegistry];
    }
    static HandleAPIRequest(b: {
        value: ProjectCollectionBuilder;
    } | undefined, apiRequest: APISnapshotRequest | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let projectsToClose: GoMapValue<Path__from_tspath, GoEmptyStruct> = $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
        if (!((apiRequest ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CloseProjects === undefined)) {
            projectsToClose = Clone$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(Set__from_collections.$storageOf((((apiRequest ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CloseProjects ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>>).value).M);
            const __gotots_range_9 = Set$Keys$Named_tspath$Path((apiRequest ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CloseProjects);
            const __gotots_range_keys_9 = __gotots_range_9.keys();
            for (const __gotots_range_value_28 of __gotots_range_keys_9) {
                const __gotots_range_value_29 = __gotots_range_9.lookupOk(__gotots_range_value_28);
                if (!__gotots_range_value_29[1]) {
                    continue;
                }
                const __gotots_range_value_30 = __gotots_range_value_28;
                let projectPath = __gotots_range_value_30;
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiOpenedProjects.delete(projectPath);
            }
        }
        if (!((apiRequest ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).OpenProjects === undefined)) {
            const __gotots_range_10 = Set$Keys$string((apiRequest ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).OpenProjects);
            const __gotots_range_keys_10 = __gotots_range_10.keys();
            for (const __gotots_range_value_31 of __gotots_range_keys_10) {
                const __gotots_range_value_32 = __gotots_range_10.lookupOk(__gotots_range_value_31);
                if (!__gotots_range_value_32[1]) {
                    continue;
                }
                const __gotots_range_value_33 = __gotots_range_value_31;
                let configFileName = __gotots_range_value_33;
                const __gotots_callee_13: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_argument_43 = configFileName;
                let configPath = (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_43);
                {
                    let entry: {
                        value: SyncMapEntry__from_dirty<Path__from_tspath, {
                            value: Project;
                        } | undefined>;
                    } | undefined = ProjectCollectionBuilder.$go$private$project$findOrCreateProject(b, configFileName, configPath, projectLoadKindCreate$constant(), logger);
                    if (!(entry === undefined)) {
                        if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiOpenedProjects.isNil()) {
                            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiOpenedProjects = $goMap$MapOf_Named_tspath$Path_To_Struct_void.make(0, []);
                        }
                        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiOpenedProjects.store(configPath, new GoEmptyStruct);
                    }
                    else {
                        return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("project not found for open: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(configFileName)])));
                    }
                }
            }
        }
        const __gotots_range_11: ProjectCollectionBuilder["apiOpenedProjects"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiOpenedProjects;
        const __gotots_range_keys_11 = __gotots_range_11.keys();
        for (const __gotots_range_value_34 of __gotots_range_keys_11) {
            const __gotots_range_value_35 = __gotots_range_11.lookupOk(__gotots_range_value_34);
            if (!__gotots_range_value_35[1]) {
                continue;
            }
            const __gotots_range_value_36 = __gotots_range_value_34;
            let configPath = __gotots_range_value_36;
            {
                const __gotots_results_6 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, configPath);
                let entry: {
                    value: SyncMapEntry__from_dirty<Path__from_tspath, {
                        value: Project;
                    } | undefined>;
                } | undefined = __gotots_results_6[0];
                let ok = __gotots_results_6[1];
                if (ok) {
                    ProjectCollectionBuilder.$go$private$project$updateProgram(b, new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project(entry), logger);
                }
                else {
                    return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("project not found for update: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(configPath)])));
                }
            }
        }
        const __gotots_range_12: snapshotFSBuilder["overlays"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays;
        const __gotots_range_keys_12 = __gotots_range_12.keys();
        for (const __gotots_range_value_37 of __gotots_range_keys_12) {
            const __gotots_range_value_38 = __gotots_range_12.lookupOk(__gotots_range_value_37);
            if (!__gotots_range_value_38[1]) {
                continue;
            }
            const __gotots_range_value_39 = __gotots_range_value_38[0];
            let overlay: {
                value: Overlay;
            } | undefined = __gotots_range_value_39;
            {
                const __gotots_receiver_8 = b;
                const __gotots_store_15 = (overlay ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_45 = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "fileBase"));
                const __gotots_callee_14: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_store_16 = (overlay ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_44 = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "fileBase"));
                const __gotots_argument_46 = (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_44);
                let entry: {
                    value: SyncMapEntry__from_dirty<Path__from_tspath, {
                        value: Project;
                    } | undefined>;
                } | undefined = ProjectCollectionBuilder.$go$private$project$findDefaultConfiguredProject(__gotots_receiver_8, __gotots_argument_45, __gotots_argument_46);
                if (!(entry === undefined)) {
                    projectsToClose.delete((SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project(entry) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath);
                }
            }
        }
        const __gotots_range_13 = projectsToClose;
        const __gotots_range_keys_13 = __gotots_range_13.keys();
        for (const __gotots_range_value_40 of __gotots_range_keys_13) {
            const __gotots_range_value_41 = __gotots_range_13.lookupOk(__gotots_range_value_40);
            if (!__gotots_range_value_41[1]) {
                continue;
            }
            const __gotots_range_value_42 = __gotots_range_value_40;
            let projectPath = __gotots_range_value_42;
            {
                const __gotots_results_7 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, projectPath);
                let entry: {
                    value: SyncMapEntry__from_dirty<Path__from_tspath, {
                        value: Project;
                    } | undefined>;
                } | undefined = __gotots_results_7[0];
                let ok = __gotots_results_7[1];
                if (ok) {
                    ProjectCollectionBuilder.$go$private$project$deleteConfiguredProject(b, new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project(entry), logger);
                }
            }
        }
        return void 0;
    }
    static $go$private$project$cleanupInferredProject(b: {
        value: ProjectCollectionBuilder;
    } | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        let inferredProjectFiles = RuntimeSlice.nil<gostring>();
        const __gotots_range_18: snapshotFSBuilder["overlays"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays;
        const __gotots_range_keys_16 = __gotots_range_18.keys();
        for (const __gotots_range_value_51 of __gotots_range_keys_16) {
            const __gotots_range_value_52 = __gotots_range_18.lookupOk(__gotots_range_value_51);
            if (!__gotots_range_value_52[1]) {
                continue;
            }
            const __gotots_range_value_53 = __gotots_range_value_51;
            const __gotots_range_value_54 = __gotots_range_value_52[0];
            let path = __gotots_range_value_53;
            let overlay: {
                value: Overlay;
            } | undefined = __gotots_range_value_54;
            const __gotots_receiver_34 = b;
            const __gotots_store_22 = (overlay ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_75 = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "fileBase"));
            const __gotots_argument_76 = path;
            if (ProjectCollectionBuilder.$go$private$project$findDefaultConfiguredProject(__gotots_receiver_34, __gotots_argument_75, __gotots_argument_76) === undefined) {
                const __gotots_argument_77 = inferredProjectFiles;
                const __gotots_store_23 = (overlay ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_78 = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "fileBase"));
                inferredProjectFiles = __gotots_argument_77.append("", [__gotots_argument_78]);
            }
        }
        ProjectCollectionBuilder.$go$private$project$updateInferredProjectRoots(b, inferredProjectFiles, logger);
    }
    static $go$private$project$createAncestorTree(b: {
        value: ProjectCollectionBuilder;
    } | undefined, fileName: gostring, path: Path__from_tspath, openResult: searchResult | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        let project: {
            value: Project;
        } | undefined = SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project((openResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).project);
        for (;;) {
            if (!((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine === undefined) && (!Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite) || Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableSolutionSearching))) {
                return;
            }
            let ancestorConfigName = configFileRegistryBuilder.$go$private$project$getAncestorConfigFileName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistryBuilder, fileName, path, (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileName, logger);
            if (ancestorConfigName === "") {
                return;
            }
            const __gotots_callee_24: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_85 = ancestorConfigName;
            let ancestorPath = (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_85);
            let ancestor: {
                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                    value: Project;
                } | undefined>;
            } | undefined = ProjectCollectionBuilder.$go$private$project$findOrCreateProject(b, ancestorConfigName, ancestorPath, projectLoadKindCreate$constant(), logger);
            if (ancestor === undefined) {
                return;
            }
            const __gotots_store_27 = (openResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            Set$Add$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "retain"), ancestorPath);
            if ((SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project(ancestor) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine === undefined && ((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine === undefined || Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite))) {
                SyncMapEntry$Change$Named_tspath$Path$PointerTo_Named_project$Project(ancestor, (ancestorProject: {
                    value: Project;
                } | undefined): void => {
                    Project.$go$private$project$setPotentialProjectReference(ancestorProject, (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath);
                });
            }
            project = SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project(ancestor);
        }
    }
    static $go$private$project$deleteConfiguredProject(b: {
        value: ProjectCollectionBuilder;
    } | undefined, project: Value__from_dirty<{
        value: Project;
    } | undefined> | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        const __gotots_receiver_14 = project;
        let projectPath: Project["configFilePath"] = (goInterfaceNonNil<Value__from_dirty<{
            value: Project;
        } | undefined>>(__gotots_receiver_14).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath;
        if (!(logger === undefined)) {
            const __gotots_receiver_16 = logger;
            const __gotots_binary_operand_8 = "Deleting configured project: ";
            const __gotots_receiver_15 = project;
            const __gotots_binary_operand_9: Project["configFileName"] = (goInterfaceNonNil<Value__from_dirty<{
                value: Project;
            } | undefined>>(__gotots_receiver_15).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileName;
            const __gotots_argument_61 = new $goInterfaceAdapter$string(__gotots_binary_operand_8 + __gotots_binary_operand_9);
            const __gotots_argument_62 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_61]);
            LogTree__from_logging.Log(__gotots_receiver_16, __gotots_argument_62);
        }
        {
            const __gotots_receiver_17 = project;
            let program: {
                value: Program__from_compiler;
            } | undefined = (goInterfaceNonNil<Value__from_dirty<{
                value: Project;
            } | undefined>>(__gotots_receiver_17).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program;
            if (!(program === undefined)) {
                Program__from_compiler.RangeResolvedProjectReference(program, (referencePath: Path__from_tspath, config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $2: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $3: int): bool => {
                    configFileRegistryBuilder.$go$private$project$releaseConfigForProject((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistryBuilder, referencePath, projectPath);
                    return true;
                });
            }
        }
        configFileRegistryBuilder.$go$private$project$releaseConfigForProject((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistryBuilder, projectPath, projectPath);
        const __gotots_receiver_18 = project;
        goInterfaceNonNil<Value__from_dirty<{
            value: Project;
        } | undefined>>(__gotots_receiver_18).Delete();
    }
    static $go$private$project$ensureConfiguredProjectAndAncestorsForFile(b: {
        value: ProjectCollectionBuilder;
    } | undefined, fileName: gostring, path: Path__from_tspath, logger: {
        value: LogTree__from_logging;
    } | undefined): searchResult {
        let result = ProjectCollectionBuilder.$go$private$project$findOrCreateDefaultConfiguredProjectForFile(b, fileName, path, projectLoadKindCreate$constant(), logger);
        if (!(result.project === undefined) && snapshotFSBuilder.$go$private$project$isOpenFile((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, path)) {
            ProjectCollectionBuilder.$go$private$project$createAncestorTree(b, fileName, path, result, logger);
        }
        return searchResult.$copy(result);
    }
    static $go$private$project$ensureInferredProjectIncludesClosedFile(b: {
        value: ProjectCollectionBuilder;
    } | undefined, fileName: gostring, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        let inferredProjectFiles = RuntimeSlice.nil<gostring>();
        const __gotots_range_19: snapshotFSBuilder["overlays"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays;
        const __gotots_range_keys_17 = __gotots_range_19.keys();
        for (const __gotots_range_value_55 of __gotots_range_keys_17) {
            const __gotots_range_value_56 = __gotots_range_19.lookupOk(__gotots_range_value_55);
            if (!__gotots_range_value_56[1]) {
                continue;
            }
            const __gotots_range_value_57 = __gotots_range_value_55;
            const __gotots_range_value_58 = __gotots_range_value_56[0];
            let path = __gotots_range_value_57;
            let overlay: {
                value: Overlay;
            } | undefined = __gotots_range_value_58;
            const __gotots_receiver_35 = b;
            const __gotots_store_24 = (overlay ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_79 = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "fileBase"));
            const __gotots_argument_80 = path;
            if (ProjectCollectionBuilder.$go$private$project$findDefaultConfiguredProject(__gotots_receiver_35, __gotots_argument_79, __gotots_argument_80) === undefined) {
                const __gotots_argument_81 = inferredProjectFiles;
                const __gotots_store_25 = (overlay ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_82 = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "fileBase"));
                inferredProjectFiles = __gotots_argument_81.append("", [__gotots_argument_82]);
            }
        }
        inferredProjectFiles = inferredProjectFiles.append("", [fileName]);
        ProjectCollectionBuilder.$go$private$project$updateInferredProjectRoots(b, inferredProjectFiles, logger);
        if (!(Box$Value$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject) === undefined)) {
            ProjectCollectionBuilder.$go$private$project$updateProgram(b, new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject), logger);
        }
    }
    static $go$private$project$ensureProjectTree(b: {
        value: ProjectCollectionBuilder;
    } | undefined, wg: WorkGroup__from_core | undefined, entry: {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: Project;
        } | undefined>;
    } | undefined, projectTreeRequest: ProjectTreeRequest | undefined, seenProjects: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        const __gotots_receiver_36 = seenProjects;
        const __gotots_store_26 = SyncMapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
        const __gotots_argument_83 = mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$Project(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, {
            value: Project;
        } | undefined>, mapEntry__from_dirty<Path__from_tspath, {
            value: Project;
        } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf));
        if (!SyncSet$AddIfAbsent$Named_tspath$Path(__gotots_receiver_36, __gotots_argument_83)) {
            return;
        }
        let project: {
            value: Project;
        } | undefined = SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project(entry);
        if (project === undefined) {
            return;
        }
        let program: {
            value: Program__from_compiler;
        } | undefined = Project.GetProgram(project);
        if (program === undefined) {
            return;
        }
        if (Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(Program__from_compiler.CommandLine(program)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableReferencedProjectLoad)) {
            return;
        }
        let children = Program__from_compiler.GetResolvedProjectReferences(program);
        if (children.isNil()) {
            return;
        }
        const __gotots_range_20 = children;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_20.length; __gotots_range_index_2++) {
            const __gotots_range_value_59 = __gotots_range_20.get(__gotots_range_index_2);
            let childConfig: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_range_value_59;
            if (childConfig === undefined) {
                continue;
            }
            const __gotots_receiver_37 = wg;
            const __gotots_argument_84 = (): void => {
                if (!ProjectTreeRequest.IsAllProjects(projectTreeRequest) && Program__from_compiler.RangeResolvedProjectReferenceInChildConfig(program, childConfig, (referencePath: Path__from_tspath, config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $2: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $3: int): bool => {
                    return !ProjectTreeRequest.IsProjectReferenced(projectTreeRequest, referencePath);
                })) {
                    return;
                }
                let childProjectEntry: {
                    value: SyncMapEntry__from_dirty<Path__from_tspath, {
                        value: Project;
                    } | undefined>;
                } | undefined = ProjectCollectionBuilder.$go$private$project$findOrCreateProject(b, ParsedCommandLine__from_tsoptions.ConfigName(childConfig), SourceFile__from_ast.Path((((childConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile), projectLoadKindCreate$constant(), logger);
                ProjectCollectionBuilder.$go$private$project$updateProgram(b, new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project(childProjectEntry), logger);
                ProjectCollectionBuilder.$go$private$project$ensureProjectTree(b, wg, childProjectEntry, projectTreeRequest, seenProjects, logger);
            };
            goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_37).Queue(__gotots_argument_84);
        }
    }
    static $go$private$project$findDefaultConfiguredProject(b: {
        value: ProjectCollectionBuilder;
    } | undefined, fileName: gostring, path: Path__from_tspath): {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: Project;
        } | undefined>;
    } | undefined {
        {
            const __gotots_results_15 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects.lookupOk(path);
            let key = __gotots_results_15[0];
            let ok = __gotots_results_15[1];
            if (ok && !(key.$value ===
                ((void Path__from_tspath,
                    inferredProjectName$string) as string))) {
                {
                    const __gotots_results_16 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, key);
                    let entry: {
                        value: SyncMapEntry__from_dirty<Path__from_tspath, {
                            value: Project;
                        } | undefined>;
                    } | undefined = __gotots_results_16[0];
                    let ok__shadow_1 = __gotots_results_16[1];
                    if (ok__shadow_1) {
                        return entry;
                    }
                }
            }
        }
        let configuredProjectPaths = RuntimeSlice.nil<gostring>();
        let configuredProjects: GoMapValue<Path__from_tspath, {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: Project;
            } | undefined>;
        } | undefined> = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project.make(0, []);
        SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, (entry: {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: Project;
            } | undefined>;
        } | undefined): bool => {
            const __gotots_argument_59 = configuredProjectPaths;
            const __gotots_store_19 = SyncMapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
            const __gotots_argument_60 = mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$Project(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, {
                value: Project;
            } | undefined>, mapEntry__from_dirty<Path__from_tspath, {
                value: Project;
            } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf));
            configuredProjectPaths = __gotots_argument_59.append(((void Path__from_tspath,
                "") as string), [__gotots_argument_60.$value]);
            const __gotots_store_21 = configuredProjects;
            const __gotots_store_20 = SyncMapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
            __gotots_store_21.store(mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$Project(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, {
                value: Project;
            } | undefined>, mapEntry__from_dirty<Path__from_tspath, {
                value: Project;
            } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)), entry);
            return true;
        });
        Sort$SliceOf_Named_tspath$Path$Named_tspath$Path(configuredProjectPaths);
        const __gotots_results_17 = findDefaultConfiguredProjectFromProgramInclusion(fileName, path, configuredProjectPaths, (path__shadow_1: Path__from_tspath): {
            value: Project;
        } | undefined => {
            return SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project(configuredProjects.lookup(path__shadow_1));
        });
        let project = __gotots_results_17[0];
        let multipleCandidates = __gotots_results_17[1];
        if (multipleCandidates) {
            {
                let p: {
                    value: SyncMapEntry__from_dirty<Path__from_tspath, {
                        value: Project;
                    } | undefined>;
                } | undefined = ProjectCollectionBuilder.$go$private$project$findOrCreateDefaultConfiguredProjectForFile(b, fileName, path, projectLoadKindFind$constant(), void 0).project;
                if (!(p === undefined)) {
                    return p;
                }
            }
        }
        return configuredProjects.lookup(project);
    }
    static $go$private$project$findDefaultProject(b: {
        value: ProjectCollectionBuilder;
    } | undefined, fileName: gostring, path: Path__from_tspath): Value__from_dirty<{
        value: Project;
    } | undefined> | undefined {
        {
            let configuredProject: {
                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                    value: Project;
                } | undefined>;
            } | undefined = ProjectCollectionBuilder.$go$private$project$findDefaultConfiguredProject(b, fileName, path);
            if (!(configuredProject === undefined)) {
                return new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project(configuredProject);
            }
        }
        {
            const __gotots_results_18 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects.lookupOk(path);
            let key = __gotots_results_18[0];
            let ok = __gotots_results_18[1];
            if (ok && key.$value ===
                ((void Path__from_tspath,
                    inferredProjectName$string) as string)) {
                return new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject);
            }
        }
        {
            let inferredProject: {
                value: Project;
            } | undefined = Box$Value$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject);
            if (!(inferredProject === undefined) && Project.$go$private$project$containsFile(inferredProject, path)) {
                if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects.isNil()) {
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects = GoMap.make(0, []);
                }
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects.store(path, new Path__from_tspath(inferredProjectName$string));
                return new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject);
            }
        }
        return void 0;
    }
    static $go$private$project$findOrCreateDefaultConfiguredProjectForFile(b: {
        value: ProjectCollectionBuilder;
    } | undefined, fileName: gostring, path: Path__from_tspath, loadKind: projectLoadKind, logger: {
        value: LogTree__from_logging;
    } | undefined): searchResult {
        {
            const __gotots_results_19 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects.lookupOk(path);
            let key = __gotots_results_19[0];
            let ok = __gotots_results_19[1];
            if (ok) {
                if (key.$value ===
                    ((void Path__from_tspath,
                        inferredProjectName$string) as string)) {
                    return new searchResult(void 0, Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
                        return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
                    }));
                }
                const __gotots_results_20 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, key);
                let entry: {
                    value: SyncMapEntry__from_dirty<Path__from_tspath, {
                        value: Project;
                    } | undefined>;
                } | undefined = __gotots_results_20[0];
                return new searchResult(entry, Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
                    return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
                }));
            }
        }
        {
            let configFileName = configFileRegistryBuilder.$go$private$project$getConfigFileNameForFile((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistryBuilder, fileName, path, logger);
            if (configFileName !== "") {
                let startTime = time__from_gostdlib.Now();
                let result = ProjectCollectionBuilder.$go$private$project$findOrCreateDefaultConfiguredProjectWorker(b, fileName, path, configFileName, loadKind, void 0, void 0, LogTree__from_logging.Fork(logger, "Searching for default configured project for " + fileName));
                if (!(result.project === undefined)) {
                    if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects.isNil()) {
                        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects = GoMap.make(0, []);
                    }
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileDefaultProjects.store(path, (SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project(result.project) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath);
                }
                if (!(logger === undefined)) {
                    let elapsed = time__from_gostdlib.Since(named_time.TimeOperations.$copy(startTime));
                    if (!(result.project === undefined)) {
                        LogTree__from_logging.Log(logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Found default configured project for %s: %s (in %v)", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fileName), new $goInterfaceAdapter$string((SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project(result.project) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileName), new $goInterfaceAdapter$Named_time$Duration(elapsed)])))]));
                    }
                    else {
                        LogTree__from_logging.Log(logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("No default configured project found for %s (searched in %v)", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fileName), new $goInterfaceAdapter$Named_time$Duration(elapsed)])))]));
                    }
                }
                return searchResult.$copy(result);
            }
        }
        return new searchResult(void 0, Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
            return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
        }));
    }
    static $go$private$project$findOrCreateDefaultConfiguredProjectWorker(b: {
        value: ProjectCollectionBuilder;
    } | undefined, fileName: gostring, path: Path__from_tspath, configFileName: gostring, loadKind: projectLoadKind, visited: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<searchNodeKey>> | undefined, fallback: searchResult | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): searchResult {
        let configs = SyncMap__from_collections.$zero<Path__from_tspath, tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>();
        const configs$location = tsonicTypeScriptRuntime.boundLocation({}, () => configs, configs$next => configs = configs$next);
        if (visited === undefined) {
            const __gotots_struct_0 = SyncSet__from_collections.$zero<searchNodeKey>();
            visited =
                tsonicTypeScriptRuntime.location<SyncSet__from_collections<searchNodeKey>>(__gotots_struct_0);
        }
        let search = BreadthFirstSearchParallelEx$Named_project$searchNodeKey$Named_project$searchNode(searchNode.$fromStorage({
            configFileName: configFileName,
            loadKind: loadKind.$value,
            logger: logger
        }), (node: searchNode): RuntimeSlice<searchNode$Storage> => {
            {
                const __gotots_receiver_38 = configs$location;
                const __gotots_callee_25: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_argument_86 = searchNode.$storageOf(node).configFileName;
                const __gotots_argument_87 = (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_86);
                const __gotots_results_21 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine(__gotots_receiver_38, __gotots_argument_87);
                let config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_results_21[0];
                let ok = __gotots_results_21[1];
                if (ok && ParsedCommandLine__from_tsoptions.ProjectReferences(config).length > 0) {
                    let referenceLoadKind = new projectLoadKind(searchNode.$storageOf(node).loadKind);
                    if (Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableReferencedProjectLoad)) {
                        referenceLoadKind = projectLoadKindFind$constant();
                    }
                    let refLogger: {
                        value: LogTree__from_logging;
                    } | undefined = void 0;
                    let references = ParsedCommandLine__from_tsoptions.ResolvedProjectReferencePaths(config);
                    if (references.length > 0 && !(searchNode.$storageOf(node).logger === undefined)) {
                        refLogger = LogTree__from_logging.Fork(searchNode.$storageOf(node).logger, fmt__from_gostdlib.Sprintf("Searching %d project references of %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(references.length), new $goInterfaceAdapter$string(searchNode.$storageOf(node).configFileName)])));
                    }
                    return Map$string$Named_project$searchNode(references, (configFileName__shadow_1: gostring): searchNode => {
                        return searchNode.$fromStorage({
                            configFileName: configFileName__shadow_1,
                            loadKind: referenceLoadKind.$value,
                            logger: LogTree__from_logging.Fork(refLogger, "Searching project reference " + configFileName__shadow_1)
                        });
                    });
                }
            }
            return RuntimeSlice.nil<searchNode$Storage>();
        }, (node: searchNode): [
            bool,
            bool
        ] => {
            let isResult: bool = false;
            let stop: bool = false;
            const __gotots_callee_26: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_88 = searchNode.$storageOf(node).configFileName;
            let configFilePath = (__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_88);
            let config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = configFileRegistryBuilder.$go$private$project$findOrAcquireConfigForFile((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistryBuilder, searchNode.$storageOf(node).configFileName, configFilePath, path, new projectLoadKind(searchNode.$storageOf(node).loadKind), LogTree__from_logging.Fork(searchNode.$storageOf(node).logger, "Acquiring config for open file"));
            if (config === undefined) {
                LogTree__from_logging.Log(searchNode.$storageOf(node).logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Config file for project does not already exist")]));
                return [false, false];
            }
            SyncMap$Store$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine(configs$location, configFilePath, config);
            if (ParsedCommandLine__from_tsoptions.FileNames(config).length === 0) {
                LogTree__from_logging.Log(searchNode.$storageOf(node).logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Project does not contain file (no root files)")]));
                return [false, false];
            }
            if ((ParsedCommandLine__from_tsoptions.CompilerOptions(config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite === TSTrue$constant__from_core()) {
                {
                    const __gotots_results_22 = ParsedCommandLine__from_tsoptions.FileNamesByPath(config).lookupOk(path);
                    let ok = __gotots_results_22[1];
                    if (!ok) {
                        LogTree__from_logging.Log(searchNode.$storageOf(node).logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Project does not contain file (by composite config inclusion)")]));
                        return [false, false];
                    }
                }
            }
            let project__shadow_1: {
                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                    value: Project;
                } | undefined>;
            } | undefined = ProjectCollectionBuilder.$go$private$project$findOrCreateProject(b, searchNode.$storageOf(node).configFileName, configFilePath, new projectLoadKind(searchNode.$storageOf(node).loadKind), searchNode.$storageOf(node).logger);
            if (project__shadow_1 === undefined) {
                LogTree__from_logging.Log(searchNode.$storageOf(node).logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Project does not already exist")]));
                return [false, false];
            }
            if (((void projectLoadKind,
                searchNode.$storageOf(node).loadKind) as int)
                === projectLoadKindCreate$constant().$value) {
                ProjectCollectionBuilder.$go$private$project$updateProgram(b, new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project(project__shadow_1), searchNode.$storageOf(node).logger);
            }
            if (Project.$go$private$project$containsFile(SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project(project__shadow_1), path)) {
                let isDirectInclusion = !Project.IsSourceFromProjectReference(SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$Project(project__shadow_1), path);
                if (!(searchNode.$storageOf(node).logger === undefined)) {
                    LogTree__from_logging.Logf(searchNode.$storageOf(node).logger, "Project contains file %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(IfElse$string(isDirectInclusion, "directly", "as a source of a referenced project"))]));
                }
                return [true, isDirectInclusion];
            }
            LogTree__from_logging.Log(searchNode.$storageOf(node).logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Project does not contain file")]));
            return [false, false];
        }, BreadthFirstSearchOptions__from_core.$fromStorage<searchNodeKey, searchNode>({
            Visited: visited,
            PreprocessLevel: (level: BreadthFirstSearchLevel__from_core<searchNodeKey, searchNode> | undefined): void => {
                BreadthFirstSearchLevel$Range$Named_project$searchNodeKey$Named_project$searchNode(level, (node: searchNode): bool => {
                    if (((void projectLoadKind,
                        searchNode.$storageOf(node).loadKind) as int)
                        === projectLoadKindFind$constant().$value && BreadthFirstSearchLevel$Has$Named_project$searchNodeKey$Named_project$searchNode(level, searchNodeKey.$fromStorage({
                        configFileName: searchNode.$storageOf(node).configFileName,
                        loadKind: projectLoadKindCreate$constant().$value
                    }))) {
                        BreadthFirstSearchLevel$Delete$Named_project$searchNodeKey$Named_project$searchNode(level, searchNodeKey.$fromStorage({
                            configFileName: searchNode.$storageOf(node).configFileName,
                            loadKind: ((void projectLoadKind,
                                searchNode.$storageOf(node).loadKind) as int)
                        }));
                    }
                    return true;
                });
            }
        }), (node: searchNode): searchNodeKey => {
            return searchNodeKey.$fromStorage({
                configFileName: searchNode.$storageOf(node).configFileName,
                loadKind: ((void projectLoadKind,
                    searchNode.$storageOf(node).loadKind) as int)
            });
        });
        let retain = Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
            return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
        });
        const retain$location = tsonicTypeScriptRuntime.boundLocation({}, () => retain, retain$next => retain = retain$next);
        let project: {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: Project;
            } | undefined>;
        } | undefined = void 0;
        if (BreadthFirstSearchResult__from_core.$storageOf(search).Path.length > 0) {
            const __gotots_receiver_39: ProjectCollectionBuilder["configuredProjects"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects;
            const __gotots_callee_27: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_89 = (void searchNode.$storageOf, (void searchNode.$fromStorage,
                BreadthFirstSearchResult__from_core.$storageOf(search).Path.get(0))).configFileName;
            const __gotots_argument_90 = (__gotots_callee_27 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_89);
            const __gotots_results_23 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project(__gotots_receiver_39, __gotots_argument_90);
            project = __gotots_results_23[0];
            const __gotots_range_21 = BreadthFirstSearchResult__from_core.$storageOf(search).Path;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_21.length; __gotots_range_index_3++) {
                const __gotots_range_value_60 = searchNode.$copy(searchNode.$fromStorage(__gotots_range_21.get(__gotots_range_index_3)));
                let node = __gotots_range_value_60;
                const __gotots_receiver_40 = retain$location;
                const __gotots_callee_28: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_argument_91 = searchNode.$storageOf(node).configFileName;
                const __gotots_argument_92 = (__gotots_callee_28 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_91);
                Set$Add$Named_tspath$Path(__gotots_receiver_40, __gotots_argument_92);
            }
        }
        if (BreadthFirstSearchResult__from_core.$storageOf(search).Stopped) {
            return new searchResult(project, Set__from_collections.$copy<Path__from_tspath>(retain));
        }
        if (!(project === undefined)) {
            fallback = new searchResult(project, Set__from_collections.$copy<Path__from_tspath>(retain));
        }
        {
            const __gotots_receiver_41 = configs$location;
            const __gotots_callee_29: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_93 = configFileName;
            const __gotots_argument_94 = (__gotots_callee_29 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_93);
            const __gotots_results_24 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine(__gotots_receiver_41, __gotots_argument_94);
            let config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_results_24[0];
            let ok = __gotots_results_24[1];
            if (ok && Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableSolutionSearching)) {
                if (!(fallback === undefined)) {
                    return searchResult.$copy(searchResult.$copy((fallback ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))));
                }
            }
        }
        {
            let ancestorConfigName = configFileRegistryBuilder.$go$private$project$getAncestorConfigFileName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistryBuilder, fileName, path, configFileName, logger);
            if (ancestorConfigName !== "") {
                return ProjectCollectionBuilder.$go$private$project$findOrCreateDefaultConfiguredProjectWorker(b, fileName, path, ancestorConfigName, loadKind, visited, fallback, LogTree__from_logging.Fork(logger, "Searching ancestor config file at " + ancestorConfigName));
            }
        }
        if (!(fallback === undefined)) {
            return searchResult.$copy(searchResult.$copy((fallback ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))));
        }
        SyncSet$Range$Named_project$searchNodeKey(visited, (node: searchNodeKey): bool => {
            const __gotots_receiver_42 = retain$location;
            const __gotots_callee_30: ProjectCollectionBuilder["toPath"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_95 = searchNodeKey.$storageOf(node).configFileName;
            const __gotots_argument_96 = (__gotots_callee_30 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_95);
            Set$Add$Named_tspath$Path(__gotots_receiver_42, __gotots_argument_96);
            return true;
        });
        return new searchResult(void 0, Set__from_collections.$copy<Path__from_tspath>(retain));
    }
    static $go$private$project$findOrCreateProject(b: {
        value: ProjectCollectionBuilder;
    } | undefined, configFileName: gostring, configFilePath: Path__from_tspath, loadKind: projectLoadKind, logger: {
        value: LogTree__from_logging;
    } | undefined): {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: Project;
        } | undefined>;
    } | undefined {
        if (loadKind.$value === projectLoadKindFind$constant().$value) {
            const __gotots_results_13 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, configFilePath);
            let entry__shadow_1: {
                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                    value: Project;
                } | undefined>;
            } | undefined = __gotots_results_13[0];
            return entry__shadow_1;
        }
        const __gotots_results_14 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, configFilePath, NewConfiguredProject(configFileName, configFilePath, b, logger));
        let entry: {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: Project;
            } | undefined>;
        } | undefined = __gotots_results_14[0];
        return entry;
    }
    static $go$private$project$forEachProject(b: {
        value: ProjectCollectionBuilder;
    } | undefined, fn: (($0: Value__from_dirty<{
        value: Project;
    } | undefined> | undefined) => bool) | undefined): void {
        let keepGoing = true;
        SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, (entry: {
            value: SyncMapEntry__from_dirty<Path__from_tspath, {
                value: Project;
            } | undefined>;
        } | undefined): bool => {
            const __gotots_callee_22 = fn;
            const __gotots_argument_57 = new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project(entry);
            keepGoing = (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_57);
            return keepGoing;
        });
        if (!keepGoing) {
            return;
        }
        if (!(Box$Value$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject) === undefined)) {
            const __gotots_callee_23 = fn;
            const __gotots_argument_58 = new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject);
            (__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_58);
        }
    }
    static $go$private$project$markFilesChanged(b: {
        value: ProjectCollectionBuilder;
    } | undefined, entry: Value__from_dirty<{
        value: Project;
    } | undefined> | undefined, paths: RuntimeSlice<gostring>, changeType: FileChangeType__from_lsproto, logger: {
        value: LogTree__from_logging;
    } | undefined): void {
        let dirty__shadow_1 = false;
        let dirtyFilePath = new Path__from_tspath("");
        const __gotots_receiver_12 = entry;
        const __gotots_argument_52 = (p: {
            value: Project;
        } | undefined): bool => {
            if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program === undefined || (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty && (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirtyFilePath.$value ===
                ((void Path__from_tspath,
                    "") as string)) {
                return false;
            }
            dirtyFilePath = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirtyFilePath;
            const __gotots_range_17 = paths;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_17.length; __gotots_range_index_1++) {
                const __gotots_range_value_50 = new Path__from_tspath(__gotots_range_17.get(__gotots_range_index_1));
                let path = __gotots_range_value_50;
                if (Project.$go$private$project$containsFile(p, path)) {
                    dirty__shadow_1 = true;
                    if (changeType === FileChangeTypeDeleted$constant__from_lsproto()) {
                        dirtyFilePath = new Path__from_tspath("");
                        break;
                    }
                    if (GetBaseFileName__from_tspath(path.$value) === "package.json") {
                        dirtyFilePath = new Path__from_tspath("");
                        break;
                    }
                    if (dirtyFilePath.$value ===
                        ((void Path__from_tspath,
                            "") as string)) {
                        dirtyFilePath = path;
                    }
                    else if (!(dirtyFilePath.$value === path.$value)) {
                        dirtyFilePath = new Path__from_tspath("");
                        break;
                    }
                }
                else if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host === undefined) && (changeType === FileChangeTypeCreated$constant__from_lsproto() && sourceFS.SeenFileOrMissingParentDirectory(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFS, path) || !(changeType === FileChangeTypeCreated$constant__from_lsproto()) && sourceFS.SeenFile(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFS, path))) {
                    dirty__shadow_1 = true;
                    dirtyFilePath = new Path__from_tspath("");
                    break;
                }
            }
            return dirty__shadow_1 || !((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirtyFilePath.$value === dirtyFilePath.$value);
        };
        const __gotots_argument_53 = (p: {
            value: Project;
        } | undefined): void => {
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty = true;
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirtyFilePath = dirtyFilePath;
            if (!(logger === undefined)) {
                if (!(dirtyFilePath.$value ===
                    ((void Path__from_tspath,
                        "") as string))) {
                    LogTree__from_logging.Logf(logger, "Marking project %s as dirty due to changes in %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileName), new $goInterfaceAdapter$Named_tspath$Path(dirtyFilePath)]));
                }
                else {
                    LogTree__from_logging.Logf(logger, "Marking project %s as dirty", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileName)]));
                }
            }
        };
        goInterfaceNonNil<Value__from_dirty<{
            value: Project;
        } | undefined>>(__gotots_receiver_12).ChangeIf(__gotots_argument_52, __gotots_argument_53);
    }
    static $go$private$project$markProjectsAffectedByConfigChanges(b: {
        value: ProjectCollectionBuilder;
    } | undefined, configChangeResult: changeFileResult, logger: {
        value: LogTree__from_logging;
    } | undefined): bool {
        const __gotots_range_15 = configChangeResult.affectedProjects;
        const __gotots_range_keys_14 = __gotots_range_15.keys();
        for (const __gotots_range_value_44 of __gotots_range_keys_14) {
            const __gotots_range_value_45 = __gotots_range_15.lookupOk(__gotots_range_value_44);
            if (!__gotots_range_value_45[1]) {
                continue;
            }
            const __gotots_range_value_46 = __gotots_range_value_44;
            let projectPath = __gotots_range_value_46;
            const __gotots_results_12 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects, projectPath);
            let project: {
                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                    value: Project;
                } | undefined>;
            } | undefined = __gotots_results_12[0];
            let ok = __gotots_results_12[1];
            if (!ok) {
                const __gotots_argument_51 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("project %s affected by config change not found", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(projectPath)])));
                GoPanic.raise(__gotots_argument_51 === undefined ? GoPanicNilValue.create() : __gotots_argument_51);
            }
            SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$Project(project, (p: {
                value: Project;
            } | undefined): bool => {
                return !(p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty || !((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirtyFilePath.$value ===
                    ((void Path__from_tspath,
                        "") as string));
            }, (p: {
                value: Project;
            } | undefined): void => {
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty = true;
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirtyFilePath = new Path__from_tspath("");
                if (!(logger === undefined)) {
                    LogTree__from_logging.Logf(logger, "Marking project %s as dirty due to change affecting config", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(projectPath)]));
                }
            });
        }
        let hasChanges = false;
        const __gotots_range_16 = configChangeResult.affectedFiles;
        const __gotots_range_keys_15 = __gotots_range_16.keys();
        for (const __gotots_range_value_47 of __gotots_range_keys_15) {
            const __gotots_range_value_48 = __gotots_range_16.lookupOk(__gotots_range_value_47);
            if (!__gotots_range_value_48[1]) {
                continue;
            }
            const __gotots_range_value_49 = __gotots_range_value_47;
            let path = __gotots_range_value_49;
            const __gotots_store_18 = (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays.lookup(path) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let fileName = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "fileBase"));
            ProjectCollectionBuilder.$go$private$project$ensureConfiguredProjectAndAncestorsForFile(b, fileName, path, logger);
            hasChanges = true;
        }
        return hasChanges;
    }
    static $go$private$project$updateInferredProjectRoots(b: {
        value: ProjectCollectionBuilder;
    } | undefined, rootFileNames: RuntimeSlice<gostring>, logger: {
        value: LogTree__from_logging;
    } | undefined): bool {
        if (rootFileNames.length === 0) {
            if (!(Box$Value$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject) === undefined)) {
                if (!(logger === undefined)) {
                    LogTree__from_logging.Log(logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Deleting inferred project")]));
                }
                Box__from_dirty.Delete<{
                    value: Project;
                } | undefined>((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject);
                return true;
            }
            return false;
        }
        Sort$SliceOf_string$string(rootFileNames);
        if (Box$Value$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject) === undefined) {
            Box$Set$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject, NewInferredProject(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptionsForInferredProjects, rootFileNames, b, logger));
        }
        else {
            let newCompilerOptions: {
                value: CompilerOptions__from_core;
            } | undefined = ParsedCommandLine__from_tsoptions.CompilerOptions((Box$Value$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine);
            if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptionsForInferredProjects === undefined)) {
                newCompilerOptions = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptionsForInferredProjects;
            }
            const __gotots_argument_54 = newCompilerOptions;
            const __gotots_argument_55 = rootFileNames;
            const __gotots_receiver_13: snapshotFSBuilder["fs"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
            const __gotots_field_0 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_13).UseCaseSensitiveFileNames();
            const __gotots_argument_56 = new ComparePathsOptions__from_tspath(__gotots_field_0, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory);
            let newCommandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = NewParsedCommandLine__from_tsoptions(__gotots_argument_54, __gotots_argument_55, __gotots_argument_56);
            let changed = Box$ChangeIf$PointerTo_Named_project$Project((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject, (p: {
                value: Project;
            } | undefined): bool => {
                return !Equal$MapOf_Named_tspath$Path_To_string$MapOf_Named_tspath$Path_To_string$Named_tspath$Path$string(ParsedCommandLine__from_tsoptions.FileNamesByPath((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine), ParsedCommandLine__from_tsoptions.FileNamesByPath(newCommandLine));
            }, (p: {
                value: Project;
            } | undefined): void => {
                if (!(logger === undefined)) {
                    LogTree__from_logging.Log(logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Updating inferred project config with %d root files", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(rootFileNames.length)])))]));
                }
                Project.SetCommandLine(p, newCommandLine);
            });
            if (!changed) {
                return false;
            }
        }
        return true;
    }
    static $go$private$project$updateProgram(b: {
        value: ProjectCollectionBuilder;
    } | undefined, entry: Value__from_dirty<{
        value: Project;
    } | undefined> | undefined, logger: {
        value: LogTree__from_logging;
    } | undefined): bool {
        let updateProgram = false;
        let deleteProject = false;
        let filesChanged = false;
        const __gotots_receiver_19 = entry;
        let configFileName: Project["configFileName"] = (goInterfaceNonNil<Value__from_dirty<{
            value: Project;
        } | undefined>>(__gotots_receiver_19).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileName;
        let startTime = time__from_gostdlib.Now();
        let notifiedLoading = false;
        let displayName = "";
        const __gotots_receiver_29 = entry;
        const __gotots_argument_68 = (entry__shadow_1: Value__from_dirty<{
            value: Project;
        } | undefined> | undefined): void => {
            const __gotots_receiver_20 = entry__shadow_1;
            if ((goInterfaceNonNil<Value__from_dirty<{
                value: Project;
            } | undefined>>(__gotots_receiver_20).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === KindConfigured$constant().$value) {
                const __gotots_receiver_24: ProjectCollectionBuilder["configFileRegistryBuilder"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileRegistryBuilder;
                const __gotots_receiver_21 = entry__shadow_1;
                const __gotots_argument_63: Project["configFileName"] = (goInterfaceNonNil<Value__from_dirty<{
                    value: Project;
                } | undefined>>(__gotots_receiver_21).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileName;
                const __gotots_receiver_22 = entry__shadow_1;
                const __gotots_argument_64: Project["configFilePath"] = (goInterfaceNonNil<Value__from_dirty<{
                    value: Project;
                } | undefined>>(__gotots_receiver_22).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath;
                const __gotots_receiver_23 = entry__shadow_1;
                const __gotots_argument_65 = goInterfaceNonNil<Value__from_dirty<{
                    value: Project;
                } | undefined>>(__gotots_receiver_23).Value();
                const __gotots_argument_66 = LogTree__from_logging.Fork(logger, "Acquiring config for project");
                let commandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = configFileRegistryBuilder.$go$private$project$acquireConfigForProject(__gotots_receiver_24, __gotots_argument_63, __gotots_argument_64, __gotots_argument_65, __gotots_argument_66);
                if (commandLine === undefined) {
                    deleteProject = true;
                    filesChanged = true;
                    return;
                }
                const __gotots_receiver_25 = entry__shadow_1;
                if (!tsonicTypeScriptRuntime.sameLocation((goInterfaceNonNil<Value__from_dirty<{
                    value: Project;
                } | undefined>>(__gotots_receiver_25).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine, commandLine)) {
                    updateProgram = true;
                    const __gotots_receiver_26 = entry__shadow_1;
                    const __gotots_argument_67 = (p: {
                        value: Project;
                    } | undefined): void => {
                        Project.SetCommandLine(p, commandLine);
                    };
                    goInterfaceNonNil<Value__from_dirty<{
                        value: Project;
                    } | undefined>>(__gotots_receiver_26).Change(__gotots_argument_67);
                }
            }
            if (!updateProgram) {
                const __gotots_receiver_27 = entry__shadow_1;
                updateProgram = (goInterfaceNonNil<Value__from_dirty<{
                    value: Project;
                } | undefined>>(__gotots_receiver_27).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty;
            }
            if (updateProgram) {
                if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client === undefined)) {
                    const __gotots_receiver_28 = entry__shadow_1;
                    displayName = Project.DisplayName(goInterfaceNonNil<Value__from_dirty<{
                        value: Project;
                    } | undefined>>(__gotots_receiver_28).Value(), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory);
                    notifiedLoading = true;
                }
            }
        };
        goInterfaceNonNil<Value__from_dirty<{
            value: Project;
        } | undefined>>(__gotots_receiver_29).Locked(__gotots_argument_68);
        if (notifiedLoading && !((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client === undefined)) {
            const __gotots_receiver_30: ProjectCollectionBuilder["client"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client;
            const __gotots_argument_69 = $state__diagnostics.Project_0;
            const __gotots_argument_70 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(displayName)]);
            goInterfaceNonNil<Client>(__gotots_receiver_30).ProgressStart(__gotots_argument_69, __gotots_argument_70);
        }
        if (deleteProject) {
            ProjectCollectionBuilder.$go$private$project$deleteConfiguredProject(b, entry, logger);
        }
        if (updateProgram) {
            const __gotots_receiver_32 = entry;
            const __gotots_argument_72 = (entry__shadow_1: Value__from_dirty<{
                value: Project;
            } | undefined> | undefined): void => {
                const __gotots_receiver_31 = entry__shadow_1;
                const __gotots_argument_71 = (project: {
                    value: Project;
                } | undefined): void => {
                    let oldHost: {
                        value: compilerHost;
                    } | undefined = (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                    let oldCheckerPool: {
                        value: checkerPool;
                    } | undefined = (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool;
                    (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host = newCompilerHost((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory, project, b, LogTree__from_logging.Fork(logger, "CompilerHost"));
                    let result = Project.CreateProgram(project);
                    (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program = result.Program;
                    (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool = (($value: CheckerPool__from_compiler | undefined): {
                        value: checkerPool;
                    } | undefined => {
                        if (!$goInterfaceAdapter$PointerTo_Named_project$checkerPool.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(Program__from_compiler.GetCheckerPool(result.Program));
                    (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProgramUpdateKind = result.UpdateKind;
                    (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProgramLastUpdate = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.newSnapshotID;
                    if (result.UpdateKind.$value === ProgramUpdateKindCloned$constant().$value) {
                        (((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFS ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenFiles = ((oldHost ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFS ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenFiles;
                    }
                    if (result.UpdateKind.$value === ProgramUpdateKindNewFiles$constant().$value) {
                        filesChanged = true;
                        (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programFilesWatch = Project.CloneWatchers(project);
                    }
                    (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty = false;
                    (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirtyFilePath = new Path__from_tspath("");
                    if (!(oldCheckerPool === undefined)) {
                        checkerPool.Discard(oldCheckerPool);
                    }
                };
                goInterfaceNonNil<Value__from_dirty<{
                    value: Project;
                } | undefined>>(__gotots_receiver_31).Change(__gotots_argument_71);
            };
            goInterfaceNonNil<Value__from_dirty<{
                value: Project;
            } | undefined>>(__gotots_receiver_32).Locked(__gotots_argument_72);
        }
        if (notifiedLoading && !((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client === undefined)) {
            const __gotots_receiver_33: ProjectCollectionBuilder["client"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client;
            const __gotots_argument_73 = $state__diagnostics.Project_0;
            const __gotots_argument_74 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(displayName)]);
            goInterfaceNonNil<Client>(__gotots_receiver_33).ProgressFinish(__gotots_argument_73, __gotots_argument_74);
        }
        if (updateProgram && !(logger === undefined)) {
            let elapsed = time__from_gostdlib.Since(named_time.TimeOperations.$copy(startTime));
            LogTree__from_logging.Log(logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Program update for %s completed in %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(configFileName), new $goInterfaceAdapter$Named_time$Duration(elapsed)])))]));
        }
        return filesChanged;
    }
}
export function newProjectCollectionBuilder(ctx: GoInterface | undefined, newSnapshotID: uint64, fs: {
    value: snapshotFSBuilder;
} | undefined, oldProjectCollection: {
    value: ProjectCollection;
} | undefined, oldConfigFileRegistry: {
    value: ConfigFileRegistry;
} | undefined, oldAPIOpenedProjects: GoMapValue<Path__from_tspath, GoEmptyStruct>, compilerOptionsForInferredProjects: {
    value: CompilerOptions__from_core;
} | undefined, sessionOptions: {
    value: SessionOptions;
} | undefined, customConfigFileName: gostring, parseCache: {
    value: RefCountCache<ParseCacheKey, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, FileHandle | undefined>;
} | undefined, extendedConfigCache: {
    value: OwnerCache<Path__from_tspath, {
        value: ExtendedConfigCacheEntry;
    } | undefined, ExtendedConfigParseArgs>;
} | undefined, client: Client | undefined): {
    value: ProjectCollectionBuilder;
} | undefined {
    return { value: new ProjectCollectionBuilder(sessionOptions, parseCache, extendedConfigCache, (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath, ctx, fs, oldProjectCollection, compilerOptionsForInferredProjects, newConfigFileRegistryBuilder(((GetClientCapabilities__from_lsproto(ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.Workspace.DidChangeWatchedFiles.RelativePatternSupport, fs, oldConfigFileRegistry, extendedConfigCache, newSnapshotID, sessionOptions, customConfigFileName, void 0), client, newSnapshotID, false, false, false, GoMap.nil(), NewSyncMap__from_dirty<Path__from_tspath, {
            value: Project;
        } | undefined>((oldProjectCollection ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configuredProjects), NewBox$PointerTo_Named_project$Project((oldProjectCollection ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferredProject), Clone$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(oldAPIOpenedProjects)) };
}
export function logChangeFileResult(result: changeFileResult, logger: {
    value: LogTree__from_logging;
} | undefined): void {
    if (result.affectedProjects.length() > 0) {
        LogTree__from_logging.Logf(logger, "Config file change affected projects: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_Named_tspath$Path(Collect$Named_tspath$Path(Keys$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(result.affectedProjects)))]));
    }
    if (result.affectedFiles.length() > 0) {
        LogTree__from_logging.Logf(logger, "Config file change affected config file lookups for %d files", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(result.affectedFiles.length())]));
    }
}
export type searchNode$Storage = {
    configFileName: gostring;
    loadKind: int;
    logger: {
        value: LogTree__from_logging;
    } | undefined;
};
export class searchNode implements GoStoredValue<searchNode$Storage>, GoContainerStoredValue<searchNode$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: searchNode$Storage) {
    }
    public static $storageOf($source: searchNode): searchNode$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: searchNode$Storage): searchNode {
        return new searchNode($source);
    }
    public get configFileName(): gostring {
        return this.$storage.configFileName;
    }
    public set configFileName($value: gostring) {
        this.$storage.configFileName = $value;
    }
    public get loadKind(): projectLoadKind {
        return new projectLoadKind(this.$storage.loadKind);
    }
    public set loadKind($value: projectLoadKind) {
        this.$storage.loadKind = $value.$value;
    }
    public get logger(): {
        value: LogTree__from_logging;
    } | undefined {
        return this.$storage.logger;
    }
    public set logger($value: {
        value: LogTree__from_logging;
    } | undefined) {
        this.$storage.logger = $value;
    }
    declare readonly [$goStorageType]: searchNode$Storage;
    declare readonly [$goContainerStorageType]: searchNode$Storage;
    static $zero(): searchNode {
        return new searchNode({
            configFileName: "",
            loadKind: ((void projectLoadKind,
                0) as int),
            logger: void 0
        });
    }
    static $copy($source: searchNode): searchNode {
        return new searchNode({
            configFileName: $source.$storage.configFileName,
            loadKind: ((void projectLoadKind,
                $source.$storage.loadKind) as int),
            logger: $source.$storage.logger
        });
    }
    declare private readonly then?: never;
}
export type searchNodeKey$Storage = {
    configFileName: gostring;
    loadKind: int;
};
export class searchNodeKey implements GoStoredValue<searchNodeKey$Storage>, GoContainerStoredValue<searchNodeKey$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: searchNodeKey$Storage) {
    }
    public static $storageOf($source: searchNodeKey): searchNodeKey$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: searchNodeKey$Storage): searchNodeKey {
        return new searchNodeKey($source);
    }
    public get configFileName(): gostring {
        return this.$storage.configFileName;
    }
    public set configFileName($value: gostring) {
        this.$storage.configFileName = $value;
    }
    public get loadKind(): projectLoadKind {
        return new projectLoadKind(this.$storage.loadKind);
    }
    public set loadKind($value: projectLoadKind) {
        this.$storage.loadKind = $value.$value;
    }
    declare readonly [$goStorageType]: searchNodeKey$Storage;
    declare readonly [$goContainerStorageType]: searchNodeKey$Storage;
    static $zero(): searchNodeKey {
        return new searchNodeKey({
            configFileName: "",
            loadKind: ((void projectLoadKind,
                0) as int)
        });
    }
    static $copy($source: searchNodeKey): searchNodeKey {
        return new searchNodeKey({
            configFileName: $source.$storage.configFileName,
            loadKind: ((void projectLoadKind,
                $source.$storage.loadKind) as int)
        });
    }
    static $equal($left: searchNodeKey, $right: searchNodeKey): bool {
        return $left.$storage.configFileName === $right.$storage.configFileName && ((void projectLoadKind,
            $left.$storage.loadKind) as int)
            ===
                ((void projectLoadKind,
                    $right.$storage.loadKind) as int);
    }
    static $hash($source: searchNodeKey): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.configFileName));
        $hash = GoMapHash.mix($hash, GoMapHash.number(((void projectLoadKind,
            $source.$storage.loadKind) as int)));
        return $hash;
    }
    declare private readonly then?: never;
}
export class searchResult {
    declare private readonly $goType: void;
    public constructor(public project: {
        value: SyncMapEntry__from_dirty<Path__from_tspath, {
            value: Project;
        } | undefined>;
    } | undefined, public retain: Set__from_collections<Path__from_tspath>) {
    }
    static $copy($source: searchResult): searchResult {
        return new searchResult($source.project, Set__from_collections.$copy<Path__from_tspath>($source.retain));
    }
    declare private readonly then?: never;
}
