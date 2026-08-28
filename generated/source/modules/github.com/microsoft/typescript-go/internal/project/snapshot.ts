import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { DuplicateSourceFile as DuplicateSourceFile__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Converters as Converters__from_lsconv, LSPLineMap as LSPLineMap__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import type { Project as Project__from_ls } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/package.js";
import type { TypingsInfo as TypingsInfo__from_ata } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/ata/package.js";
import type { Logger as Logger__from_logging } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/package.js";
import type { ECMALineInfo as ECMALineInfo__from_sourcemap } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/sourcemap/package.js";
import type { TsConfigSourceFile as TsConfigSourceFile__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { ConfigFileRegistry, configFileEntry } from "./configfileregistry.js";
import type { mapEntry$Storage as mapEntry__from_dirty$Storage } from "./dirty/entry.js";
import type { FileHandle, Overlay, diskFile, overlayFS } from "./overlayfs.js";
import type { Project } from "./project.js";
import type { Session, SessionOptions, UpdateReason } from "./session.js";
import type { WatchedFiles } from "./watch.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint64 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { SourceFileParseOptions as SourceFileParseOptions__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { NewRegistry as NewRegistry__from_autoimport, RegistryChange as RegistryChange__from_autoimport, Registry as Registry__from_autoimport } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/package.js";
import { NewConverters as NewConverters__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { UserPreferences as UserPreferences__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { DocumentUri as DocumentUri__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { SyncMapEntry as SyncMapEntry__from_dirty } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/dirty/package.js";
import { LogTree as LogTree__from_logging, NewLogTree as NewLogTree__from_logging } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/package.js";
import { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Entries as Entries__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import { ReadDirectory as ReadDirectory__from_vfsmatch } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/vfsmatch/package.js";
import { Uint128 as Uint128__from_xxh3 } from "../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import { Set$Keys$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { Set$Len$Named_lsproto$DocumentUri } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { OwnerCache$AddOwner$Named_tspath$Path$PointerTo_Named_project$ExtendedConfigCacheEntry$Named_project$ExtendedConfigParseArgs } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/OwnerCache$AddOwner.js";
import { OwnerCache$Release$Named_tspath$Path$PointerTo_Named_project$ExtendedConfigCacheEntry$Named_project$ExtendedConfigParseArgs } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/OwnerCache$Release.js";
import { RefCountCache$Deref$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/RefCountCache$Deref.js";
import { WatchedFiles$Clone$MapOf_Named_tspath$Path_To_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/WatchedFiles$Clone.js";
import { SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$diskFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$Range.js";
import { SyncMapEntry$Delete$Named_tspath$Path$PointerTo_Named_project$diskFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMapEntry$Delete.js";
import { mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$diskFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/mapEntry$Key.js";
import { Keys$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void } from "../../../../../../support/generics/concretizations/maps/Keys.js";
import { Collect$Named_tspath$Path } from "../../../../../../support/generics/concretizations/slices/Collect.js";
import { $goInterfaceAdapter$Named_collections$SetOf_Named_lsproto$DocumentUri, $goInterfaceAdapter$Named_lsproto$DocumentUri, $goInterfaceAdapter$Named_time$Duration, $goInterfaceAdapter$PointerTo_Named_project$autoImportRegistryCloneHost, $goInterfaceAdapter$SliceOf_Named_lsproto$DocumentUri, $goInterfaceAdapter$SliceOf_Named_tspath$Path, $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$uint64 as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Project, $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_bool, $goMap$MapOf_Named_tspath$Path_To_string, $goMap$MapOf_Named_tspath$Path_To_Named_tspath$Path as GoMap } from "../../../../../../support/maps.js";
import { autoImportRegistryCloneHost, newAutoImportRegistryCloneHost } from "./autoimport.js";
import { checkerPool } from "./checkerpool.js";
import { compilerHost } from "./compilerhost.js";
import { mapEntry as mapEntry__from_dirty } from "./dirty/entry.js";
import { FileChangeSummary } from "./filechange.js";
import { fileBase } from "./overlayfs.js";
import { NewParseCacheKey } from "./parsecache.js";
import { programCounter } from "./programcounter.js";
import { ProgramUpdateKindCloned$constant, ProgramUpdateKindNewFiles$constant } from "./project.js";
import { ProjectCollection, openFilePaths } from "./projectcollection.js";
import { ProjectCollectionBuilder, newProjectCollectionBuilder } from "./projectcollectionbuilder.js";
import { SnapshotFS, newSnapshotFSBuilder, snapshotFSBuilder, sourceFS } from "./snapshotfs.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class Snapshot {
    declare private readonly $goType: void;
    public constructor(public id: uint64, public parentId: uint64, public refCount: atomic__from_gostdlib.Int32, public sessionOptions: {
        value: SessionOptions;
    } | undefined, public toPath: (($0: gostring) => Path__from_tspath) | undefined, public converters: {
        value: Converters__from_lsconv;
    } | undefined, public fs: {
        value: SnapshotFS;
    } | undefined, public ProjectCollection: {
        value: ProjectCollection;
    } | undefined, public ConfigFileRegistry: {
        value: ConfigFileRegistry;
    } | undefined, public AutoImports: {
        value: Registry__from_autoimport;
    } | undefined, public autoImportsWatch: {
        value: WatchedFiles<GoMapValue<Path__from_tspath, gostring>>;
    } | undefined, public compilerOptionsForInferredProjects: {
        value: CompilerOptions__from_core;
    } | undefined, public userPreferences: UserPreferences__from_lsutil, public builderLogs: {
        value: LogTree__from_logging;
    } | undefined, public apiError: GoInterface | undefined) {
    }
    static $copy($source: Snapshot): Snapshot {
        return new Snapshot($source.id, $source.parentId, named_sync_atomic.SyncAtomicInt32Operations.$copy($source.refCount), $source.sessionOptions, $source.toPath, $source.converters, $source.fs, $source.ProjectCollection, $source.ConfigFileRegistry, $source.AutoImports, $source.autoImportsWatch, $source.compilerOptionsForInferredProjects, UserPreferences__from_lsutil.$copy($source.userPreferences), $source.builderLogs, $source.apiError);
    }
    declare private readonly then?: never;
    static AutoImportRegistry(s: {
        value: Snapshot;
    } | undefined): {
        value: Registry__from_autoimport;
    } | undefined {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImports;
    }
    static Clone(s: {
        value: Snapshot;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, change: SnapshotChange, overlays: GoMapValue<Path__from_tspath, {
        value: Overlay;
    } | undefined>, session: {
        value: Session;
    } | undefined): {
        value: Snapshot;
    } | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: {
            value: Snapshot;
        } | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let logger: {
                        value: LogTree__from_logging;
                    } | undefined = void 0;
                    if (((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                        const __gotots_callee_1 = ($go$recovery: GoRecovery): void => {
                            {
                                let r: $goInterface$Interface_void | undefined = $go$recovery === undefined ? undefined : $go$recovery.take();
                                if (!(r === undefined)) {
                                    const __gotots_receiver_5: Session["logger"] = (session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                                    const __gotots_argument_8 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(LogTree__from_logging.String(logger))]);
                                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_5).Log(__gotots_argument_8);
                                    const __gotots_argument_9 = r;
                                    GoPanic.raise(__gotots_argument_9 === undefined ? GoPanicNilValue.create() : __gotots_argument_9);
                                }
                            }
                        };
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_callee_1($go$recovery);
                        });
                    }
                    if (((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                        logger = NewLogTree__from_logging(fmt__from_gostdlib.Sprintf("Cloning snapshot %d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id)])));
                        let getDetails: (() => gostring) | undefined = (): gostring => {
                            let details = "";
                            if (change.ResourceRequest.Documents.length !== 0) {
                                details = details + fmt__from_gostdlib.Sprintf(" Documents: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_Named_lsproto$DocumentUri(change.ResourceRequest.Documents)]));
                            }
                            if (change.ResourceRequest.ConfiguredProjectDocuments.length !== 0) {
                                details = details + fmt__from_gostdlib.Sprintf(" ConfiguredProjectDocuments: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_Named_lsproto$DocumentUri(change.ResourceRequest.ConfiguredProjectDocuments)]));
                            }
                            if (change.ResourceRequest.Projects.length !== 0) {
                                details = details + fmt__from_gostdlib.Sprintf(" Projects: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_Named_tspath$Path(change.ResourceRequest.Projects)]));
                            }
                            if (!(change.ResourceRequest.ProjectTree === undefined)) {
                                details = details + fmt__from_gostdlib.Sprintf(" ProjectTree: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_Named_tspath$Path(ProjectTreeRequest.Projects(change.ResourceRequest.ProjectTree))]));
                            }
                            return details;
                        };
                        switch (change.reason.$value) {
                            case 1: {
                                LogTree__from_logging.Logf(logger, "Reason: DidOpenFile - %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_lsproto$DocumentUri(change.fileChanges.Opened)]));
                                break;
                            }
                            case 2: {
                                LogTree__from_logging.Logf(logger, "Reason: DidCloseFile - %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_collections$SetOf_Named_lsproto$DocumentUri(Set__from_collections.$copy<DocumentUri__from_lsproto>(change.fileChanges.Closed))]));
                                break;
                            }
                            case 3: {
                                LogTree__from_logging.Logf(logger, "Reason: DidChangeCompilerOptionsForInferredProjects", RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
                                break;
                            }
                            case 4: {
                                const __gotots_receiver_6 = logger;
                                const __gotots_argument_11 = "Reason: RequestedLanguageService (pending file changes) - %v";
                                const __gotots_callee_2 = getDetails;
                                const __gotots_argument_10 = new $goInterfaceAdapter$string((__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))());
                                const __gotots_argument_12 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_10]);
                                LogTree__from_logging.Logf(__gotots_receiver_6, __gotots_argument_11, __gotots_argument_12);
                                break;
                            }
                            case 5: {
                                const __gotots_receiver_7 = logger;
                                const __gotots_argument_14 = "Reason: RequestedLanguageService (project not loaded) - %v";
                                const __gotots_callee_3 = getDetails;
                                const __gotots_argument_13 = new $goInterfaceAdapter$string((__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))());
                                const __gotots_argument_15 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_13]);
                                LogTree__from_logging.Logf(__gotots_receiver_7, __gotots_argument_14, __gotots_argument_15);
                                break;
                            }
                            case 6: {
                                const __gotots_receiver_8 = logger;
                                const __gotots_argument_17 = "Reason: RequestedLanguageService (file not open) - %v";
                                const __gotots_callee_4 = getDetails;
                                const __gotots_argument_16 = new $goInterfaceAdapter$string((__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))());
                                const __gotots_argument_18 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_16]);
                                LogTree__from_logging.Logf(__gotots_receiver_8, __gotots_argument_17, __gotots_argument_18);
                                break;
                            }
                            case 7: {
                                const __gotots_receiver_9 = logger;
                                const __gotots_argument_20 = "Reason: RequestedLanguageService (project dirty) - %v";
                                const __gotots_callee_5 = getDetails;
                                const __gotots_argument_19 = new $goInterfaceAdapter$string((__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))());
                                const __gotots_argument_21 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_19]);
                                LogTree__from_logging.Logf(__gotots_receiver_9, __gotots_argument_20, __gotots_argument_21);
                                break;
                            }
                            case 8: {
                                const __gotots_receiver_10 = logger;
                                const __gotots_argument_23 = "Reason: RequestedLoadProjectTree - %v";
                                const __gotots_callee_6 = getDetails;
                                const __gotots_argument_22 = new $goInterfaceAdapter$string((__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))());
                                const __gotots_argument_24 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_22]);
                                LogTree__from_logging.Logf(__gotots_receiver_10, __gotots_argument_23, __gotots_argument_24);
                                break;
                            }
                            case 10: {
                                LogTree__from_logging.Logf(logger, "Reason: IdleCleanDiskCache", RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
                                break;
                            }
                        }
                    }
                    let start = time__from_gostdlib.Now();
                    let fs: {
                        value: snapshotFSBuilder;
                    } | undefined = newSnapshotFSBuilder(((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays, overlays, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskDirectories, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModulesRealpathAliases, ((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PositionEncoding, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath);
                    if (change.fileChanges.HasExcessiveWatchEvents()) {
                        let invalidateStart = time__from_gostdlib.Now();
                        if (change.fileChanges.InvalidateAll) {
                            snapshotFSBuilder.$go$private$project$invalidateCache(fs);
                            LogTree__from_logging.Logf(logger, "InvalidateAll: invalidated file cache in %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_time$Duration(time__from_gostdlib.Since(named_time.TimeOperations.$copy(invalidateStart)))]));
                        }
                        else if (!snapshotFSBuilder.$go$private$project$watchChangesOverlapCache(fs, FileChangeSummary.$copy(change.fileChanges))) {
                            change.fileChanges.Changed = Set__from_collections.$fromStorage<DocumentUri__from_lsproto>({
                                M: $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil()
                            });
                            change.fileChanges.Deleted = Set__from_collections.$fromStorage<DocumentUri__from_lsproto>({
                                M: $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil()
                            });
                        }
                        else if (change.fileChanges.IncludesWatchChangeOutsideNodeModules) {
                            snapshotFSBuilder.$go$private$project$invalidateCache(fs);
                            LogTree__from_logging.Logf(logger, "Excessive watch changes detected, invalidated file cache in %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_time$Duration(time__from_gostdlib.Since(named_time.TimeOperations.$copy(invalidateStart)))]));
                        }
                        else {
                            snapshotFSBuilder.$go$private$project$invalidateNodeModulesCache(fs);
                            LogTree__from_logging.Logf(logger, "npm install detected, invalidated node_modules cache in %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_time$Duration(time__from_gostdlib.Since(named_time.TimeOperations.$copy(invalidateStart)))]));
                        }
                    }
                    else {
                        change.fileChanges = snapshotFSBuilder.$go$private$project$expandAndFilterWatchEvents(fs, FileChangeSummary.$copy(change.fileChanges));
                        change.fileChanges = SnapshotFS.$go$private$project$expandRealpathAliases((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, FileChangeSummary.$copy(change.fileChanges));
                        snapshotFSBuilder.$go$private$project$markDirtyFiles(fs, FileChangeSummary.$copy(change.fileChanges));
                        change.fileChanges = snapshotFSBuilder.$go$private$project$convertOpenAndCloseToChanges(fs, FileChangeSummary.$copy(change.fileChanges));
                    }
                    let compilerOptionsForInferredProjects: {
                        value: CompilerOptions__from_core;
                    } | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptionsForInferredProjects;
                    if (!(change.compilerOptionsForInferredProjects === undefined)) {
                        compilerOptionsForInferredProjects = change.compilerOptionsForInferredProjects;
                    }
                    let customConfigFileName: ConfigFileRegistry["customConfigFileName"] = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFileRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.customConfigFileName;
                    if (!(change.newConfig === undefined)) {
                        customConfigFileName = ((change.newConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UserPreferences__from_lsutil>).value.CustomConfigFileName;
                    }
                    let newSnapshotID = atomic__from_gostdlib.Uint64.Add((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotID, 1n);
                    let projectCollectionBuilder: {
                        value: ProjectCollectionBuilder;
                    } | undefined = newProjectCollectionBuilder(ctx, newSnapshotID, fs, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFileRegistry, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiOpenedProjects, compilerOptionsForInferredProjects, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions, customConfigFileName, (session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parseCache, (session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfigCache, (session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client);
                    if (change.ataChanges.length() !== 0) {
                        ProjectCollectionBuilder.DidUpdateATAState(projectCollectionBuilder, change.ataChanges, LogTree__from_logging.Fork(logger, "DidUpdateATAState"));
                    }
                    ProjectCollectionBuilder.DidChangeCustomConfigFileName(projectCollectionBuilder, LogTree__from_logging.Fork(logger, "DidChangeCustomConfigFileName"));
                    if (!change.fileChanges.IsEmpty()) {
                        ProjectCollectionBuilder.DidChangeFiles(projectCollectionBuilder, FileChangeSummary.$copy(change.fileChanges), LogTree__from_logging.Fork(logger, "DidChangeFiles"));
                    }
                    let apiError: GoInterface | undefined = void 0;
                    if (!(change.apiRequest === undefined)) {
                        apiError = ProjectCollectionBuilder.HandleAPIRequest(projectCollectionBuilder, change.apiRequest, LogTree__from_logging.Fork(logger, "HandleAPIRequest"));
                    }
                    const __gotots_range_5 = change.ResourceRequest.Documents;
                    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length; __gotots_range_index_4++) {
                        const __gotots_range_value_7 = new DocumentUri__from_lsproto(__gotots_range_5.get(__gotots_range_index_4));
                        let uri = __gotots_range_value_7;
                        ProjectCollectionBuilder.DidRequestFile(projectCollectionBuilder, uri, false, LogTree__from_logging.Fork(logger, "DidRequestFile"));
                    }
                    const __gotots_range_6 = change.ResourceRequest.ConfiguredProjectDocuments;
                    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6.length; __gotots_range_index_5++) {
                        const __gotots_range_value_8 = new DocumentUri__from_lsproto(__gotots_range_6.get(__gotots_range_index_5));
                        let uri = __gotots_range_value_8;
                        ProjectCollectionBuilder.DidRequestFile(projectCollectionBuilder, uri, true, LogTree__from_logging.Fork(logger, "DidRequestFile (optional)"));
                    }
                    const __gotots_range_7 = change.ResourceRequest.Projects;
                    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_7.length; __gotots_range_index_6++) {
                        const __gotots_range_value_9 = new Path__from_tspath(__gotots_range_7.get(__gotots_range_index_6));
                        let projectId = __gotots_range_value_9;
                        ProjectCollectionBuilder.DidRequestProject(projectCollectionBuilder, projectId, LogTree__from_logging.Fork(logger, "DidRequestProject"));
                    }
                    if (!(change.ResourceRequest.ProjectTree === undefined)) {
                        ProjectCollectionBuilder.DidRequestProjectTrees(projectCollectionBuilder, change.ResourceRequest.ProjectTree, LogTree__from_logging.Fork(logger, "DidRequestProjectTrees"));
                    }
                    const __gotots_results_0 = ProjectCollectionBuilder.Finalize(projectCollectionBuilder, logger);
                    let projectCollection: {
                        value: ProjectCollection;
                    } | undefined = __gotots_results_0[0];
                    let configFileRegistry: {
                        value: ConfigFileRegistry;
                    } | undefined = __gotots_results_0[1];
                    let projectsWithNewProgramStructure: GoMapValue<Path__from_tspath, bool> = $goMap$MapOf_Named_tspath$Path_To_bool.make(0, []);
                    const __gotots_range_8 = ProjectCollection.Projects(projectCollection);
                    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_8.length; __gotots_range_index_7++) {
                        const __gotots_range_value_10 = __gotots_range_8.get(__gotots_range_index_7);
                        let project: {
                            value: Project;
                        } | undefined = __gotots_range_value_10;
                        if ((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProgramLastUpdate === newSnapshotID && !((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProgramUpdateKind.$value === ProgramUpdateKindCloned$constant().$value)) {
                            projectsWithNewProgramStructure.store((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath, (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProgramUpdateKind.$value === ProgramUpdateKindNewFiles$constant().$value);
                        }
                    }
                    let __gotots_logical_result_0 = change.cleanDiskCache || !(change.fileChanges.Opened.$value ===
                        ((void DocumentUri__from_lsproto,
                            "") as string)) || !(change.fileChanges.Reopened.$value ===
                        ((void DocumentUri__from_lsproto,
                            "") as string));
                    if (!__gotots_logical_result_0) {
                        const __gotots_store_0 = change.fileChanges;
                        const __gotots_binary_operand_0 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Closed"));
                        const __gotots_binary_operand_1 = 0;
                        __gotots_logical_result_0 = __gotots_binary_operand_0 > __gotots_binary_operand_1;
                    }
                    let __gotots_logical_result_1 = __gotots_logical_result_0;
                    if (!__gotots_logical_result_1) {
                        const __gotots_store_1 = change.fileChanges;
                        const __gotots_binary_operand_2 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Deleted"));
                        const __gotots_binary_operand_3 = 0;
                        __gotots_logical_result_1 = __gotots_binary_operand_2 > __gotots_binary_operand_3;
                    }
                    let shouldCleanDiskCache = __gotots_logical_result_1;
                    if (shouldCleanDiskCache) {
                        if (projectsWithNewProgramStructure.length() > 0 || change.cleanDiskCache) {
                            let cleanFilesStart = time__from_gostdlib.Now();
                            let removedFiles = 0;
                            SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$diskFile((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, (entry: {
                                value: SyncMapEntry__from_dirty<Path__from_tspath, {
                                    value: diskFile;
                                } | undefined>;
                            } | undefined): bool => {
                                const __gotots_range_9 = ProjectCollection.Projects(projectCollection);
                                for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_9.length; __gotots_range_index_8++) {
                                    const __gotots_range_value_11 = __gotots_range_9.get(__gotots_range_index_8);
                                    let project: {
                                        value: Project;
                                    } | undefined = __gotots_range_value_11;
                                    let __gotots_logical_result_2 = !((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host === undefined);
                                    if (__gotots_logical_result_2) {
                                        const __gotots_receiver_11: compilerHost["sourceFS"] = ((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFS;
                                        const __gotots_store_2 = SyncMapEntry__from_dirty.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                                        const __gotots_argument_25 = mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$diskFile(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<Path__from_tspath, {
                                            value: diskFile;
                                        } | undefined>, mapEntry__from_dirty<Path__from_tspath, {
                                            value: diskFile;
                                        } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "mapEntry"), mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf));
                                        __gotots_logical_result_2 = sourceFS.SeenFile(__gotots_receiver_11, __gotots_argument_25);
                                    }
                                    if (__gotots_logical_result_2) {
                                        return true;
                                    }
                                }
                                SyncMapEntry$Delete$Named_tspath$Path$PointerTo_Named_project$diskFile(entry);
                                removedFiles++;
                                return true;
                            });
                            if (((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                                LogTree__from_logging.Logf(logger, "Removed %d cached file(s) in %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(removedFiles), new $goInterfaceAdapter$Named_time$Duration(time__from_gostdlib.Since(named_time.TimeOperations.$copy(cleanFilesStart)))]));
                            }
                        }
                    }
                    let config = UserPreferences__from_lsutil.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.userPreferences);
                    if (!(change.newConfig === undefined)) {
                        config = UserPreferences__from_lsutil.$copy(UserPreferences__from_lsutil.$copy(((change.newConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UserPreferences__from_lsutil>).value));
                    }
                    let autoImportHost: {
                        value: autoImportRegistryCloneHost;
                    } | undefined = newAutoImportRegistryCloneHost(projectCollection, (session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parseCache, fs, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath);
                    let openFiles: GoMapValue<Path__from_tspath, gostring> = $goMap$MapOf_Named_tspath$Path_To_string.make(overlays.length(), []);
                    const __gotots_range_10 = overlays;
                    const __gotots_range_keys_1 = __gotots_range_10.keys();
                    for (const __gotots_range_value_12 of __gotots_range_keys_1) {
                        const __gotots_range_value_13 = __gotots_range_10.lookupOk(__gotots_range_value_12);
                        if (!__gotots_range_value_13[1]) {
                            continue;
                        }
                        const __gotots_range_value_14 = __gotots_range_value_12;
                        const __gotots_range_value_15 = __gotots_range_value_13[0];
                        let path = __gotots_range_value_14;
                        let overlay: {
                            value: Overlay;
                        } | undefined = __gotots_range_value_15;
                        const __gotots_store_4 = openFiles;
                        const __gotots_store_5 = path;
                        const __gotots_store_3 = (overlay ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_4.store(__gotots_store_5, fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "fileBase")));
                    }
                    let prepareAutoImports = new Path__from_tspath("");
                    if (!(change.ResourceRequest.AutoImports.$value ===
                        ((void DocumentUri__from_lsproto,
                            "") as string))) {
                        prepareAutoImports = change.ResourceRequest.AutoImports.Path(Snapshot.UseCaseSensitiveFileNames(s));
                    }
                    let oldAutoImports: {
                        value: Registry__from_autoimport;
                    } | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImports;
                    if (oldAutoImports === undefined) {
                        oldAutoImports = NewRegistry__from_autoimport((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath, UserPreferences__from_lsutil.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.userPreferences));
                    }
                    let autoImportsWatch: {
                        value: WatchedFiles<GoMapValue<Path__from_tspath, gostring>>;
                    } | undefined = void 0;
                    const __gotots_results_1 = Registry__from_autoimport.Clone(oldAutoImports, ctx, new RegistryChange__from_autoimport(prepareAutoImports, openFiles, Set__from_collections.$copy<DocumentUri__from_lsproto>(change.fileChanges.Changed), Set__from_collections.$copy<DocumentUri__from_lsproto>(change.fileChanges.Created), Set__from_collections.$copy<DocumentUri__from_lsproto>(change.fileChanges.Deleted), projectsWithNewProgramStructure, change.newConfig), new $goInterfaceAdapter$PointerTo_Named_project$autoImportRegistryCloneHost(autoImportHost), LogTree__from_logging.Fork(logger, "UpdateAutoImports"));
                    let autoImports: {
                        value: Registry__from_autoimport;
                    } | undefined = __gotots_results_1[0];
                    let err: GoInterface | undefined = __gotots_results_1[1];
                    if (err === undefined) {
                        autoImportsWatch = WatchedFiles$Clone$MapOf_Named_tspath$Path_To_string((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoImportsWatch, Registry__from_autoimport.NodeModulesDirectories(autoImports));
                    }
                    const __gotots_results_2 = snapshotFSBuilder.Finalize(fs);
                    let snapshotFS: {
                        value: SnapshotFS;
                    } | undefined = __gotots_results_2[0];
                    let newSnapshot: {
                        value: Snapshot;
                    } | undefined = NewSnapshot(newSnapshotID, snapshotFS, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions, void 0, compilerOptionsForInferredProjects, UserPreferences__from_lsutil.$copy(config), autoImports, autoImportsWatch, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath);
                    (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parentId = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id;
                    (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection = projectCollection;
                    (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFileRegistry = configFileRegistry;
                    (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builderLogs = logger;
                    (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiError = apiError;
                    const __gotots_range_11 = ProjectCollection.Projects((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection);
                    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_11.length; __gotots_range_index_9++) {
                        const __gotots_range_value_16 = __gotots_range_11.get(__gotots_range_index_9);
                        let project: {
                            value: Project;
                        } | undefined = __gotots_range_value_16;
                        if (!((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program === undefined)) {
                            programCounter.Ref((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programCounter, (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program);
                            if ((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProgramLastUpdate === newSnapshotID) {
                                compilerHost.$go$private$project$freeze((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, snapshotFS, (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFileRegistry);
                            }
                        }
                    }
                    const __gotots_range_12: ConfigFileRegistry["configs"] = ((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFileRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs;
                    const __gotots_range_keys_2 = __gotots_range_12.keys();
                    for (const __gotots_range_value_17 of __gotots_range_keys_2) {
                        const __gotots_range_value_18 = __gotots_range_12.lookupOk(__gotots_range_value_17);
                        if (!__gotots_range_value_18[1]) {
                            continue;
                        }
                        const __gotots_range_value_19 = __gotots_range_value_18[0];
                        let config__shadow_1: {
                            value: configFileEntry;
                        } | undefined = __gotots_range_value_19;
                        if (!((config__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine === undefined) && !((((config__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined)) {
                            const __gotots_range_13: TsConfigSourceFile__from_tsoptions["ExtendedSourceFiles"] = ((((config__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedSourceFiles;
                            for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_13.length; __gotots_range_index_10++) {
                                const __gotots_range_value_20 = __gotots_range_13.get(__gotots_range_index_10);
                                let file = __gotots_range_value_20;
                                const __gotots_receiver_12: Session["extendedConfigCache"] = (session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfigCache;
                                const __gotots_callee_7: Snapshot["toPath"] = (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                                const __gotots_argument_26 = file;
                                const __gotots_argument_27 = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_26);
                                const __gotots_argument_28: Snapshot["id"] = (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id;
                                OwnerCache$AddOwner$Named_tspath$Path$PointerTo_Named_project$ExtendedConfigCacheEntry$Named_project$ExtendedConfigParseArgs(__gotots_receiver_12, __gotots_argument_27, __gotots_argument_28);
                            }
                        }
                    }
                    autoImportRegistryCloneHost.Dispose(autoImportHost);
                    LogTree__from_logging.Logf(logger, "Finished cloning snapshot %d into snapshot %d in %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id), new GoInterfaceAdapter((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id), new $goInterfaceAdapter$Named_time$Duration(time__from_gostdlib.Since(named_time.TimeOperations.$copy(start)))]));
                    __gotots_return_0 = newSnapshot;
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static Converters(s: {
        value: Snapshot;
    } | undefined): {
        value: Converters__from_lsconv;
    } | undefined {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.converters;
    }
    static Deref(s: {
        value: Snapshot;
    } | undefined, session: {
        value: Session;
    } | undefined): void {
        let rc = atomic__from_gostdlib.Int32.Add((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refCount, -1);
        if (rc < 0) {
            const __gotots_argument_2 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("snapshot %d: ref count below zero, parentId=%d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id), new GoInterfaceAdapter((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parentId)])));
            GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
        }
        if (rc === 0) {
            Snapshot.$go$private$project$dispose(s, session);
        }
    }
    static DirectoryExists(s: {
        value: Snapshot;
    } | undefined, path: gostring): bool {
        const __gotots_receiver_13: SnapshotFS["fs"] = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_29 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_13).DirectoryExists(__gotots_argument_29);
    }
    static FileExists(s: {
        value: Snapshot;
    } | undefined, path: gostring): bool {
        const __gotots_receiver_14: SnapshotFS["fs"] = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_30 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_14).FileExists(__gotots_argument_30);
    }
    static GetDefaultProject(s: {
        value: Snapshot;
    } | undefined, uri: DocumentUri__from_lsproto): {
        value: Project;
    } | undefined {
        return ProjectCollection.GetDefaultProject((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection, uri.Path(Snapshot.UseCaseSensitiveFileNames(s)));
    }
    static GetDirectories(s: {
        value: Snapshot;
    } | undefined, path: gostring): RuntimeSlice<gostring> {
        const __gotots_receiver_15: SnapshotFS["fs"] = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_31 = path;
        return Entries__from_vfs.$storageOf(goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_15).GetAccessibleEntries(__gotots_argument_31)).Directories;
    }
    static GetECMALineInfo(s: {
        value: Snapshot;
    } | undefined, fileName: gostring): {
        value: ECMALineInfo__from_sourcemap;
    } | undefined {
        {
            let file: FileHandle | undefined = SnapshotFS.GetFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, fileName);
            if (!(file === undefined)) {
                const __gotots_receiver_16 = file;
                return goInterfaceNonNil<FileHandle>(__gotots_receiver_16).ECMALineInfo();
            }
        }
        return void 0;
    }
    static GetFile(s: {
        value: Snapshot;
    } | undefined, fileName: gostring): FileHandle | undefined {
        return SnapshotFS.GetFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, fileName);
    }
    static GetPreferences(s: {
        value: Snapshot;
    } | undefined, activeFile: gostring): UserPreferences__from_lsutil {
        return UserPreferences__from_lsutil.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.userPreferences);
    }
    static GetProjectsContainingFile(s: {
        value: Snapshot;
    } | undefined, uri: DocumentUri__from_lsproto): RuntimeSlice<Project__from_ls | undefined> {
        let fileName = uri.FileName();
        const __gotots_callee_8: Snapshot["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_32 = fileName;
        let path = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_32);
        return ProjectCollection.GetProjectsContainingFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection, path);
    }
    static ID(s: {
        value: Snapshot;
    } | undefined): uint64 {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id;
    }
    static LSPLineMap(s: {
        value: Snapshot;
    } | undefined, fileName: gostring): {
        value: LSPLineMap__from_lsconv;
    } | undefined {
        {
            let file: FileHandle | undefined = SnapshotFS.GetFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, fileName);
            if (!(file === undefined)) {
                const __gotots_receiver_1 = file;
                return goInterfaceNonNil<FileHandle>(__gotots_receiver_1).LSPLineMap();
            }
        }
        return void 0;
    }
    static ReadDirectory(s: {
        value: Snapshot;
    } | undefined, currentDir: gostring, path: gostring, extensions: RuntimeSlice<gostring>, excludes: RuntimeSlice<gostring>, includes: RuntimeSlice<gostring>, depth: int): RuntimeSlice<gostring> {
        return ReadDirectory__from_vfsmatch(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, currentDir, path, extensions, excludes, includes, depth);
    }
    static ReadFile(s: {
        value: Snapshot;
    } | undefined, fileName: gostring): [
        gostring,
        bool
    ] {
        let handle: FileHandle | undefined = Snapshot.GetFile(s, fileName);
        if (handle === undefined) {
            return ["", false];
        }
        const __gotots_receiver_17 = handle;
        const __gotots_results_3 = goInterfaceNonNil<FileHandle>(__gotots_receiver_17).Content();
        const __gotots_results_4 = true;
        return [__gotots_results_3, __gotots_results_4];
    }
    static UseCaseSensitiveFileNames(s: {
        value: Snapshot;
    } | undefined): bool {
        const __gotots_receiver_3: SnapshotFS["fs"] = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).UseCaseSensitiveFileNames();
    }
    static UserPreferences(s: {
        value: Snapshot;
    } | undefined): UserPreferences__from_lsutil {
        return UserPreferences__from_lsutil.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.userPreferences);
    }
    static $go$private$project$dispose(s: {
        value: Snapshot;
    } | undefined, session: {
        value: Session;
    } | undefined): void {
        const __gotots_range_0 = ProjectCollection.Projects((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection);
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let project: {
                value: Project;
            } | undefined = __gotots_range_value_0;
            if (!((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program === undefined) && programCounter.Deref((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programCounter, (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program)) {
                if (!((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool === undefined)) {
                    checkerPool.Discard((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool);
                }
                const __gotots_range_1 = Program__from_compiler.SourceFiles((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program);
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                    let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_1;
                    RefCountCache$Deref$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parseCache, NewParseCacheKey(SourceFile__from_ast.ParseOptions(file), Uint128__from_xxh3.$copy(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Hash), ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind));
                }
                const __gotots_range_2 = Program__from_compiler.DuplicateSourceFiles((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program);
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                    const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                    let file: {
                        value: DuplicateSourceFile__from_compiler;
                    } | undefined = __gotots_range_value_2;
                    RefCountCache$Deref$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parseCache, NewParseCacheKey(SourceFileParseOptions__from_ast.$copy((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ParseOptions), Uint128__from_xxh3.$copy((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hash), (file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ScriptKind));
                }
            }
        }
        const __gotots_range_3: ConfigFileRegistry["configs"] = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFileRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs;
        const __gotots_range_keys_0 = __gotots_range_3.keys();
        for (const __gotots_range_value_3 of __gotots_range_keys_0) {
            const __gotots_range_value_4 = __gotots_range_3.lookupOk(__gotots_range_value_3);
            if (!__gotots_range_value_4[1]) {
                continue;
            }
            const __gotots_range_value_5 = __gotots_range_value_4[0];
            let config: {
                value: configFileEntry;
            } | undefined = __gotots_range_value_5;
            if (!((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine === undefined)) {
                const __gotots_range_4 = ParsedCommandLine__from_tsoptions.ExtendedSourceFiles((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commandLine);
                for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4.length; __gotots_range_index_3++) {
                    const __gotots_range_value_6 = __gotots_range_4.get(__gotots_range_index_3);
                    let file = __gotots_range_value_6;
                    const __gotots_receiver_2: Session["extendedConfigCache"] = (session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfigCache;
                    const __gotots_callee_0: Session["toPath"] = (session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                    const __gotots_argument_3 = file;
                    const __gotots_argument_4 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
                    const __gotots_argument_5: Snapshot["id"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id;
                    OwnerCache$Release$Named_tspath$Path$PointerTo_Named_project$ExtendedConfigCacheEntry$Named_project$ExtendedConfigParseArgs(__gotots_receiver_2, __gotots_argument_4, __gotots_argument_5);
                }
            }
        }
    }
    static $go$private$project$ref(s: {
        value: Snapshot;
    } | undefined): void {
        if (atomic__from_gostdlib.Int32.Add((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refCount, 1) <= 1) {
            const __gotots_argument_25 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("snapshot %d: ref on disposed snapshot, parentId=%d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id), new GoInterfaceAdapter((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parentId)])));
            GoPanic.raise(__gotots_argument_25 === undefined ? GoPanicNilValue.create() : __gotots_argument_25);
        }
    }
    static $go$private$project$tryRef(s: {
        value: Snapshot;
    } | undefined): bool {
        for (;;) {
            let rc = atomic__from_gostdlib.Int32.Load((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refCount);
            if (rc <= 0) {
                return false;
            }
            if (atomic__from_gostdlib.Int32.CompareAndSwap((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refCount, rc, rc + 1)) {
                return true;
            }
        }
    }
}
export function NewSnapshot(id: uint64, fs: {
    value: SnapshotFS;
} | undefined, sessionOptions: {
    value: SessionOptions;
} | undefined, configFileRegistry: {
    value: ConfigFileRegistry;
} | undefined, compilerOptionsForInferredProjects: {
    value: CompilerOptions__from_core;
} | undefined, userPreferences: UserPreferences__from_lsutil, autoImports: {
    value: Registry__from_autoimport;
} | undefined, autoImportsWatch: {
    value: WatchedFiles<GoMapValue<Path__from_tspath, gostring>>;
} | undefined, toPath: (($0: gostring) => Path__from_tspath) | undefined): {
    value: Snapshot;
} | undefined {
    let s: {
        value: Snapshot;
    } | undefined = { value: new Snapshot(id, 0n, named_sync_atomic.SyncAtomicInt32Operations.$zero(), sessionOptions, toPath, void 0, fs, { value: new ProjectCollection(toPath, void 0, GoMap.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Project.nil(), openFilePaths((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays), void 0, $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil(), named_sync.SyncOnceOperations.$zero(), void 0) }, configFileRegistry, autoImports, autoImportsWatch, compilerOptionsForInferredProjects, UserPreferences__from_lsutil.$copy(userPreferences), void 0, void 0) };
    atomic__from_gostdlib.Int32.Store((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refCount, 1);
    const __gotots_argument_0: SessionOptions["PositionEncoding"] = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sessionOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PositionEncoding;
    const __gotots_receiver_0 = s;
    const __gotots_argument_1 = ($argument0: gostring): {
        value: LSPLineMap__from_lsconv;
    } | undefined => {
        return Snapshot.LSPLineMap(__gotots_receiver_0, $argument0);
    };
    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.converters = NewConverters__from_lsconv(__gotots_argument_0, __gotots_argument_1);
    return s;
}
export class APISnapshotRequest {
    declare private readonly $goType: void;
    public constructor(public OpenProjects: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public CloseProjects: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined) {
    }
    declare private readonly then?: never;
}
export class ProjectTreeRequest {
    declare private readonly $goType: void;
    public constructor(public referencedProjects: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined) {
    }
    declare private readonly then?: never;
    static IsAllProjects(p: ProjectTreeRequest | undefined): bool {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).referencedProjects === undefined;
    }
    static IsProjectReferenced(p: ProjectTreeRequest | undefined, projectID: Path__from_tspath): bool {
        return Set__from_collections.Has<Path__from_tspath>((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).referencedProjects, projectID);
    }
    static Projects(p: ProjectTreeRequest | undefined): RuntimeSlice<gostring> {
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).referencedProjects === undefined) {
            return RuntimeSlice.nil<gostring>();
        }
        return Collect$Named_tspath$Path(Keys$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(Set$Keys$Named_tspath$Path((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).referencedProjects)));
    }
}
export class ResourceRequest {
    declare private readonly $goType: void;
    public constructor(public Documents: RuntimeSlice<gostring>, public ConfiguredProjectDocuments: RuntimeSlice<gostring>, public Projects: RuntimeSlice<gostring>, public ProjectTree: ProjectTreeRequest | undefined, public AutoImports: DocumentUri__from_lsproto) {
    }
    static $zero(): ResourceRequest {
        return new ResourceRequest(RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), void 0, new DocumentUri__from_lsproto(""));
    }
    static $copy($source: ResourceRequest): ResourceRequest {
        return new ResourceRequest($source.Documents, $source.ConfiguredProjectDocuments, $source.Projects, $source.ProjectTree, $source.AutoImports);
    }
    declare private readonly then?: never;
}
export class SnapshotChange {
    declare private readonly $goType: void;
    public constructor(public ResourceRequest: ResourceRequest, public reason: UpdateReason, public fileChanges: FileChangeSummary, public compilerOptionsForInferredProjects: {
        value: CompilerOptions__from_core;
    } | undefined, public newConfig: tsonicTypeScriptRuntime.Location<UserPreferences__from_lsutil> | undefined, public ataChanges: GoMapValue<Path__from_tspath, ATAStateChange | undefined>, public apiRequest: APISnapshotRequest | undefined, public cleanDiskCache: bool) {
    }
    static $copy($source: SnapshotChange): SnapshotChange {
        return new SnapshotChange(ResourceRequest.$copy($source.ResourceRequest), $source.reason, FileChangeSummary.$copy($source.fileChanges), $source.compilerOptionsForInferredProjects, $source.newConfig, $source.ataChanges, $source.apiRequest, $source.cleanDiskCache);
    }
    declare private readonly then?: never;
}
export class ATAStateChange {
    declare private readonly $goType: void;
    public constructor(public ProjectID: Path__from_tspath, public TypingsInfo: tsonicTypeScriptRuntime.Location<TypingsInfo__from_ata> | undefined, public TypingsFiles: RuntimeSlice<gostring>, public TypingsFilesToWatch: RuntimeSlice<gostring>, public Logs: {
        value: LogTree__from_logging;
    } | undefined) {
    }
    declare private readonly then?: never;
}
