import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { Stats as Stats__from_memory } from "../../../../../../packages/github.com/mackerelio/go-osstat@v0.2.7/memory/package.js";
import type { Diagnostic as Diagnostic__from_ast, Node$Storage as Node__from_ast$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { SyncMap$Storage as SyncMap__from_collections$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { Tristate as Tristate__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { CacheStats as CacheStats__from_autoimport } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/package.js";
import type { Converters as Converters__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import type { LanguageService as LanguageService__from_ls, Project as Project__from_ls } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/package.js";
import type { Diagnostic as Diagnostic__from_lsproto, FileEvent as FileEvent__from_lsproto, FileSystemWatcher as FileSystemWatcher__from_lsproto, PositionEncodingKind as PositionEncodingKind__from_lsproto, RequestFailureTelemetryEvent as RequestFailureTelemetryEvent__from_lsproto, ResolvedClientCapabilities as ResolvedClientCapabilities__from_lsproto, TextDocumentContentChangePartialOrWholeDocument$Storage as TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { NpmExecutor as NpmExecutor__from_ata, TypingsInfo as TypingsInfo__from_ata, TypingsInstallResult as TypingsInstallResult__from_ata } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/ata/package.js";
import type { Logger as Logger__from_logging } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { Client } from "./client.js";
import type { configFileEntry } from "./configfileregistry.js";
import type { ExtendedConfigCacheEntry, ExtendedConfigParseArgs } from "./extendedconfigcache.js";
import type { FileChange$Storage as FileChange__from_project$Storage } from "./filechange.js";
import type { FileHandle, Overlay } from "./overlayfs.js";
import type { ownerCacheEntry } from "./ownercache.js";
import type { ParseCacheKey, ParseCacheKey$Storage as ParseCacheKey__from_project$Storage } from "./parsecache.js";
import type { refCountCacheEntry } from "./refcountcache.js";
import type { memoizedDiskFile } from "./snapshotfs.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, float64, gostring, int, int32, uint64, uint8 } from "@gotots/runtime/scalars.js";
import type { GoStorage } from "@gotots/runtime/storage.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Get as Get__from_memory } from "../../../../../../packages/github.com/mackerelio/go-osstat@v0.2.7/memory/package.js";
import { NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { OrderedMap as OrderedMap__from_collections, Set as Set__from_collections, SyncMap as SyncMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompilerOptions as CompilerOptions__from_core, GetScriptKindFromFileName as GetScriptKindFromFileName__from_core, JsxEmitNone$constant as JsxEmitNone$constant__from_core, JsxEmit_String as JsxEmit_String__from_core, ModuleKindNone$constant as ModuleKindNone$constant__from_core, ModuleKind_String as ModuleKind_String__from_core, ModuleResolutionKindUnknown$constant as ModuleResolutionKindUnknown$constant__from_core, ModuleResolutionKind_String as ModuleResolutionKind_String__from_core, ScriptKindJS$constant as ScriptKindJS$constant__from_core, ScriptKindJSX$constant as ScriptKindJSX$constant__from_core, ScriptKindTS$constant as ScriptKindTS$constant__from_core, ScriptKindTSX$constant as ScriptKindTSX$constant__from_core, ScriptTargetNone$constant as ScriptTargetNone$constant__from_core, ScriptTarget_String as ScriptTarget_String__from_core, TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, Tristate_IsFalse as Tristate_IsFalse__from_core, Version as Version__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { Marshal as Marshal__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { BucketState as BucketState__from_autoimport, BucketStats as BucketStats__from_autoimport, Registry as Registry__from_autoimport } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/package.js";
import { DiagnosticToLSPPush as DiagnosticToLSPPush__from_lsconv, FileNameToDocumentURI as FileNameToDocumentURI__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { CodeLensUserPreferences as CodeLensUserPreferences__from_lsutil, InlayHintsPreferences as InlayHintsPreferences__from_lsutil, NewDefaultUserPreferences as NewDefaultUserPreferences__from_lsutil, UserPreferences as UserPreferences__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { NewLanguageService as NewLanguageService__from_ls } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/package.js";
import { DocumentUri as DocumentUri__from_lsproto, FileChangeTypeChanged$constant as FileChangeTypeChanged$constant__from_lsproto, FileChangeTypeCreated$constant as FileChangeTypeCreated$constant__from_lsproto, FileChangeTypeDeleted$constant as FileChangeTypeDeleted$constant__from_lsproto, GetClientCapabilities as GetClientCapabilities__from_lsproto, LanguageKind as LanguageKind__from_lsproto, PerformanceStatsTelemetryEvent as PerformanceStatsTelemetryEvent__from_lsproto, PerformanceStatsTelemetryMeasurements as PerformanceStatsTelemetryMeasurements__from_lsproto, ProjectInfoTelemetryEvent as ProjectInfoTelemetryEvent__from_lsproto, ProjectInfoTelemetryMeasurements as ProjectInfoTelemetryMeasurements__from_lsproto, PublishDiagnosticsParams as PublishDiagnosticsParams__from_lsproto, RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull as RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto, StringLiteralLanguageServerPerformanceStats as StringLiteralLanguageServerPerformanceStats__from_lsproto, StringLiteralLanguageServerProjectInfo as StringLiteralLanguageServerProjectInfo__from_lsproto, StringLiteralUsage as StringLiteralUsage__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { NewTypingsInstaller as NewTypingsInstaller__from_ata, TypingsInstallRequest as TypingsInstallRequest__from_ata, TypingsInstallerOptions as TypingsInstallerOptions__from_ata, TypingsInstaller as TypingsInstaller__from_ata } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/ata/package.js";
import { NewQueue as NewQueue__from_background, Queue as Queue__from_background } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/background/package.js";
import { LogTree as LogTree__from_logging, NewLogTree as NewLogTree__from_logging, NewNopLogger as NewNopLogger__from_logging } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/state.js";
import { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { GetBaseFileName as GetBaseFileName__from_tspath, IsDeclarationFileName as IsDeclarationFileName__from_tspath, Path as Path__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { DiffOrderedMaps$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/DiffOrderedMaps.js";
import { NewSetFromItems$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetFromItems.js";
import { OrderedMap$Entries$Named_project$WatcherID$PointerTo_Named_lsproto$FileSystemWatcher, OrderedMap$Entries$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { OrderedMap$Get$Named_tspath$Path$PointerTo_Named_project$Project } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Get.js";
import { OrderedMap$Set$Named_project$WatcherID$PointerTo_Named_lsproto$FileSystemWatcher } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { Set$Keys$Named_lsproto$DocumentUri, Set$Keys$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { Set$Len$Named_lsproto$DocumentUri, Set$Len$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { SyncMap$Range$Named_project$ParseCacheKey$PointerTo_Named_project$refCountCacheEntryOf_PointerTo_Named_ast$SourceFile, SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$ownerCacheEntryOf_PointerTo_Named_project$ExtendedConfigCacheEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Range.js";
import { SyncSet$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Add.js";
import { SyncSet$Has$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Has.js";
import { DiffMapsFunc$Named_tspath$Path$PointerTo_Named_project$configFileEntry$PointerTo_Named_project$configFileEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/DiffMapsFunc.js";
import { IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Map$PointerTo_Named_ast$SourceFile$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { NewWatchedFiles$MapOf_Named_tspath$Path_To_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/NewWatchedFiles.js";
import { WatchedFiles$ID$MapOf_Named_tspath$Path_To_string, WatchedFiles$ID$Named_project$PatternsAndIgnored, WatchedFiles$ID$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/WatchedFiles$ID.js";
import { updateWatch$MapOf_Named_tspath$Path_To_string, updateWatch$Named_project$PatternsAndIgnored, updateWatch$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/updateWatch.js";
import { Clone$SliceOf_Named_metrics$Sample$Named_metrics$Sample } from "../../../../../../support/generics/concretizations/slices/Clone.js";
import { Equal$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Equal.js";
import { Sort$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Sort.js";
import { $goInterfaceAdapter$MapOf_string_To_Interface_void, $goInterfaceAdapter$Named_lsproto$DocumentUri, $goInterfaceAdapter$Named_project$WatcherID, $goInterfaceAdapter$Named_time$Duration, $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void, $goInterfaceAdapter$PointerTo_Named_logging$LogTree, $goInterfaceAdapter$PointerTo_Named_project$Snapshot, $goInterfaceAdapter$PointerTo_Named_strings$Builder, $goInterfaceAdapter$SliceOf_Named_error, $goInterfaceAdapter$bool, $goInterfaceAdapter$float64, $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$uint64, $goInterfaceAdapter$PointerTo_Named_project$Session as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void, $goMap$MapOf_Named_project$WatcherID_To_PointerTo_Named_lsproto$FileSystemWatcher, $goMap$MapOf_Named_tspath$Path_To_MapOf_Named_tspath$Path_To_string, $goMap$MapOf_Named_tspath$Path_To_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$ATAStateChange, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileEntry, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileNames, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$diskFile, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$realpathAliasSet, $goMap$MapOf_PointerTo_Named_compiler$Program_To_int32, $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Overlay as GoMap } from "../../../../../../support/maps.js";
import { $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct, $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { CheckerPoolOptions, checkerPool } from "./checkerpool.js";
import { ConfigFileRegistry } from "./configfileregistry.js";
import { NewExtendedConfigCache } from "./extendedconfigcache.js";
import { FileChange, FileChangeKind, FileChangeKindChange$constant, FileChangeKindClose$constant, FileChangeKindOpen$constant, FileChangeKindSave$constant, FileChangeKindWatchChange$constant, FileChangeKindWatchCreate$constant, FileChangeKindWatchDelete$constant, FileChangeSummary, mergeFileChangeSummary } from "./filechange.js";
import { newOverlayFS, overlayFS } from "./overlayfs.js";
import { OwnerCache } from "./ownercache.js";
import { NewParseCache } from "./parsecache.js";
import { programCounter } from "./programcounter.js";
import { KindConfigured$constant, ProgramUpdateKindCloned$constant, ProgramUpdateKindNewFiles$constant, Project, hr$string } from "./project.js";
import { ProjectCollection } from "./projectcollection.js";
import { RefCountCache, RefCountCacheOptions } from "./refcountcache.js";
import { APISnapshotRequest, ATAStateChange, NewSnapshot, ProjectTreeRequest, ResourceRequest, Snapshot, SnapshotChange } from "./snapshot.js";
import { SnapshotFS } from "./snapshotfs.js";
import { PatternsAndIgnored, WatchedFiles, WatcherID, fileSystemWatcherGlobString, getRecursiveGlobPattern, newWatchRegistry, watchRegistry } from "./watch.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_runtime_metrics from "@gotots/gostdlib/internal/facets/named-runtime-metrics.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as provider_context from "@gotots/gostdlib/internal/facets/provider-context.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as recovery_value from "@gotots/gostdlib/internal/facets/recovery-value.js";
import * as runtime__from_gostdlib from "@gotots/gostdlib/runtime.js";
import * as metrics from "@gotots/gostdlib/runtime/metrics.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { GoChannel, goSelect } from "@gotots/runtime/channel.js";
import { goUint64 } from "@gotots/runtime/integer.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash, GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class UpdateReason {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function UpdateReasonUnknown$constant(): UpdateReason {
    return new UpdateReason(0);
}
export function UpdateReasonDidOpenFile$constant(): UpdateReason {
    return new UpdateReason(1);
}
export function UpdateReasonDidCloseFile$constant(): UpdateReason {
    return new UpdateReason(2);
}
export function UpdateReasonDidChangeCompilerOptionsForInferredProjects$constant(): UpdateReason {
    return new UpdateReason(3);
}
export function UpdateReasonRequestedLanguageServicePendingChanges$constant(): UpdateReason {
    return new UpdateReason(4);
}
export function UpdateReasonRequestedLanguageServiceProjectNotLoaded$constant(): UpdateReason {
    return new UpdateReason(5);
}
export function UpdateReasonRequestedLanguageServiceForFileNotOpen$constant(): UpdateReason {
    return new UpdateReason(6);
}
export function UpdateReasonRequestedLanguageServiceProjectDirty$constant(): UpdateReason {
    return new UpdateReason(7);
}
export function UpdateReasonRequestedLoadProjectTree$constant(): UpdateReason {
    return new UpdateReason(8);
}
export function UpdateReasonRequestedLanguageServiceWithAutoImports$constant(): UpdateReason {
    return new UpdateReason(9);
}
export function UpdateReasonIdleCleanDiskCache$constant(): UpdateReason {
    return new UpdateReason(10);
}
export function watchRequestTimeout$constant(): time__from_gostdlib.Duration {
    return named_time.TimeDurationValueOperations.$wrap(1000000000n);
}
export class SessionOptions {
    declare private readonly $goType: void;
    public constructor(public CurrentDirectory: gostring, public DefaultLibraryPath: gostring, public TypingsLocation: gostring, public PositionEncoding: PositionEncodingKind__from_lsproto, public WatchEnabled: bool, public LoggingEnabled: bool, public TelemetryEnabled: bool, public PushDiagnosticsEnabled: bool, public DebounceDelay: time__from_gostdlib.Duration, public Locale: Locale__from_locale, public CheckerPoolOptions: CheckerPoolOptions) {
    }
    static $copy($source: SessionOptions): SessionOptions {
        return new SessionOptions($source.CurrentDirectory, $source.DefaultLibraryPath, $source.TypingsLocation, $source.PositionEncoding, $source.WatchEnabled, $source.LoggingEnabled, $source.TelemetryEnabled, $source.PushDiagnosticsEnabled, $source.DebounceDelay, Locale__from_locale.$copy($source.Locale), CheckerPoolOptions.$copy($source.CheckerPoolOptions));
    }
    static $equal($left: SessionOptions, $right: SessionOptions): bool {
        return $left.CurrentDirectory === $right.CurrentDirectory && $left.DefaultLibraryPath === $right.DefaultLibraryPath && $left.TypingsLocation === $right.TypingsLocation && $left.PositionEncoding.$value === $right.PositionEncoding.$value && $left.WatchEnabled === $right.WatchEnabled && $left.LoggingEnabled === $right.LoggingEnabled && $left.TelemetryEnabled === $right.TelemetryEnabled && $left.PushDiagnosticsEnabled === $right.PushDiagnosticsEnabled && named_time.TimeDurationValueOperations.$project($left.DebounceDelay) === named_time.TimeDurationValueOperations.$project($right.DebounceDelay) && Locale__from_locale.$equal($left.Locale, $right.Locale) && CheckerPoolOptions.$equal($left.CheckerPoolOptions, $right.CheckerPoolOptions);
    }
    static $hash($source: SessionOptions): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.CurrentDirectory));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.DefaultLibraryPath));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.TypingsLocation));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.PositionEncoding.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.WatchEnabled));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.LoggingEnabled));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.TelemetryEnabled));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.PushDiagnosticsEnabled));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint(named_time.TimeDurationValueOperations.$project($source.DebounceDelay)));
        $hash = GoMapHash.mix($hash, Locale__from_locale.$hash($source.Locale));
        $hash = GoMapHash.mix($hash, CheckerPoolOptions.$hash($source.CheckerPoolOptions));
        return $hash;
    }
    declare private readonly then?: never;
}
export class SessionInit {
    declare private readonly $goType: void;
    public constructor(public BackgroundCtx: GoInterface | undefined, public Options: {
        value: SessionOptions;
    } | undefined, public FS: FS__from_vfs | undefined, public Client: Client | undefined, public Logger: Logger__from_logging | undefined, public NpmExecutor: NpmExecutor__from_ata | undefined, public ParseCache: {
        value: RefCountCache<ParseCacheKey, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, FileHandle | undefined>;
    } | undefined) {
    }
    declare private readonly then?: never;
}
export class Session {
    declare private readonly $goType: void;
    public constructor(public backgroundCtx: GoInterface | undefined, public options: {
        value: SessionOptions;
    } | undefined, public startTime: time__from_gostdlib.Time, public toPath: (($0: gostring) => Path__from_tspath) | undefined, public client: Client | undefined, public logger: Logger__from_logging | undefined, public npmExecutor: NpmExecutor__from_ata | undefined, public fs: {
        value: overlayFS;
    } | undefined, public parseCache: {
        value: RefCountCache<ParseCacheKey, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, FileHandle | undefined>;
    } | undefined, public extendedConfigCache: {
        value: OwnerCache<Path__from_tspath, {
            value: ExtendedConfigCacheEntry;
        } | undefined, ExtendedConfigParseArgs>;
    } | undefined, public programCounter: {
        value: programCounter;
    } | undefined, public initialUserPreferences: UserPreferences__from_lsutil, public workspaceUserPreferences: UserPreferences__from_lsutil, public compilerOptionsForInferredProjects: {
        value: CompilerOptions__from_core;
    } | undefined, public typingsInstaller: {
        value: TypingsInstaller__from_ata;
    } | undefined, public backgroundQueue: {
        value: Queue__from_background;
    } | undefined, public snapshotID: atomic__from_gostdlib.Uint64, public snapshot: {
        value: Snapshot;
    } | undefined, public snapshotMu: sync__from_gostdlib.RWMutex, public snapshotUpdateMu: sync__from_gostdlib.Mutex, public scheduledSnapshotUpdateCancel: (() => void) | undefined, public scheduledSnapshotUpdateGeneration: uint64, public scheduledSnapshotUpdateMu: sync__from_gostdlib.Mutex, public pendingUserConfigChanges: bool, public userConfigRWMu: sync__from_gostdlib.Mutex, public pendingFileChanges: RuntimeSlice<FileChange__from_project$Storage>, public pendingFileChangesMu: sync__from_gostdlib.Mutex, public pendingATAChanges: GoMapValue<Path__from_tspath, ATAStateChange | undefined>, public pendingATAChangesMu: sync__from_gostdlib.Mutex, public diagnosticsRefreshCancel: (() => void) | undefined, public diagnosticsRefreshGeneration: uint64, public diagnosticsRefreshMu: sync__from_gostdlib.Mutex, public warmAutoImportCancel: (() => void) | undefined, public warmAutoImportMu: sync__from_gostdlib.Mutex, public idleCacheCleanTimer: tsonicTypeScriptRuntime.Location<time__from_gostdlib.Timer> | undefined, public idleCacheCleanMu: sync__from_gostdlib.Mutex, public performanceTelemetryCancel: (() => void) | undefined, public seenProjects: SyncSet__from_collections<Path__from_tspath>, public watches: {
        value: watchRegistry;
    } | undefined, public globalDiagPublishPending: atomic__from_gostdlib.Bool) {
    }
    static $copy($source: Session): Session {
        return new Session($source.backgroundCtx, $source.options, named_time.TimeOperations.$copy($source.startTime), $source.toPath, $source.client, $source.logger, $source.npmExecutor, $source.fs, $source.parseCache, $source.extendedConfigCache, $source.programCounter, UserPreferences__from_lsutil.$copy($source.initialUserPreferences), UserPreferences__from_lsutil.$copy($source.workspaceUserPreferences), $source.compilerOptionsForInferredProjects, $source.typingsInstaller, $source.backgroundQueue, named_sync_atomic.SyncAtomicUint64Operations.$copy($source.snapshotID), $source.snapshot, named_sync.SyncRWMutexOperations.$copy($source.snapshotMu), named_sync.SyncMutexOperations.$copy($source.snapshotUpdateMu), $source.scheduledSnapshotUpdateCancel, $source.scheduledSnapshotUpdateGeneration, named_sync.SyncMutexOperations.$copy($source.scheduledSnapshotUpdateMu), $source.pendingUserConfigChanges, named_sync.SyncMutexOperations.$copy($source.userConfigRWMu), $source.pendingFileChanges, named_sync.SyncMutexOperations.$copy($source.pendingFileChangesMu), $source.pendingATAChanges, named_sync.SyncMutexOperations.$copy($source.pendingATAChangesMu), $source.diagnosticsRefreshCancel, $source.diagnosticsRefreshGeneration, named_sync.SyncMutexOperations.$copy($source.diagnosticsRefreshMu), $source.warmAutoImportCancel, named_sync.SyncMutexOperations.$copy($source.warmAutoImportMu), $source.idleCacheCleanTimer, named_sync.SyncMutexOperations.$copy($source.idleCacheCleanMu), $source.performanceTelemetryCancel, SyncSet__from_collections.$copy<Path__from_tspath>($source.seenProjects), $source.watches, named_sync_atomic.SyncAtomicBoolOperations.$copy($source.globalDiagPublishPending));
    }
    declare private readonly then?: never;
    static APIOpenProject(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, configFileName: gostring, apiFileChanges: FileChangeSummary): [
        {
            value: Project;
        } | undefined,
        {
            value: Snapshot;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            {
                value: Project;
            } | undefined,
            {
                value: Snapshot;
            } | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0, void 0];
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotUpdateMu);
                    const __gotots_receiver_2: Session["snapshotUpdateMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotUpdateMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_2, $go$recovery);
                    };
                    Session.$go$private$project$cancelScheduledSnapshotUpdate(s);
                    const __gotots_results_0 = Session.$go$private$project$flushChanges(s, ctx);
                    let fileChanges = __gotots_results_0[0];
                    let overlays: GoMapValue<Path__from_tspath, {
                        value: Overlay;
                    } | undefined> = __gotots_results_0[1];
                    let ataChanges: GoMapValue<Path__from_tspath, ATAStateChange | undefined> = __gotots_results_0[2];
                    mergeFileChangeSummary(fileChanges, FileChangeSummary.$copy(apiFileChanges));
                    let newSnapshot: {
                        value: Snapshot;
                    } | undefined = Session.$go$private$project$updateSnapshotRef(s, ctx, overlays, new SnapshotChange(ResourceRequest.$zero(), new UpdateReason(0), FileChangeSummary.$copy(fileChanges), void 0, void 0, ataChanges, new APISnapshotRequest(NewSetFromItems$string(RuntimeSlice.literal<gostring>([configFileName])), void 0), false));
                    if (!((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiError === undefined)) {
                        __gotots_return_0 = [void 0, newSnapshot, (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiError];
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_3: Snapshot["ProjectCollection"] = (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection;
                    const __gotots_callee_0: Session["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                    const __gotots_argument_2 = configFileName;
                    const __gotots_argument_3 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
                    let project: {
                        value: Project;
                    } | undefined = ProjectCollection.ConfiguredProject(__gotots_receiver_3, __gotots_argument_3);
                    if (project === undefined) {
                        const __gotots_argument_4 = new $goInterfaceAdapter$string("OpenProject request returned no error but project not present in snapshot");
                        GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
                    }
                    __gotots_return_0 = [project, newSnapshot, void 0];
                    break __gotots_return_block_0;
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
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
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
        return __gotots_return_0;
    }
    static APIUpdateWithFileChanges(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, apiFileChanges: FileChangeSummary): {
        value: Snapshot;
    } | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: {
            value: Snapshot;
        } | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotUpdateMu);
                    const __gotots_receiver_3: Session["snapshotUpdateMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotUpdateMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_3, $go$recovery);
                    };
                    Session.$go$private$project$cancelScheduledSnapshotUpdate(s);
                    const __gotots_results_1 = Session.$go$private$project$flushChanges(s, ctx);
                    let fileChanges = __gotots_results_1[0];
                    let overlays: GoMapValue<Path__from_tspath, {
                        value: Overlay;
                    } | undefined> = __gotots_results_1[1];
                    let ataChanges: GoMapValue<Path__from_tspath, ATAStateChange | undefined> = __gotots_results_1[2];
                    mergeFileChangeSummary(fileChanges, FileChangeSummary.$copy(apiFileChanges));
                    __gotots_return_0 = Session.$go$private$project$updateSnapshotRef(s, ctx, overlays, new SnapshotChange(ResourceRequest.$zero(), new UpdateReason(0), FileChangeSummary.$copy(fileChanges), void 0, void 0, ataChanges, new APISnapshotRequest(void 0, void 0), false));
                    break __gotots_return_block_0;
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
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
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
        return __gotots_return_0;
    }
    static Close(s: {
        value: Session;
    } | undefined): void {
        Session.$go$private$project$cancelScheduledSnapshotUpdate(s);
        Session.$go$private$project$cancelDiagnosticsRefresh(s);
        Session.$go$private$project$cancelWarmAutoImportCache(s);
        Session.$go$private$project$cancelIdleCacheClean(s);
        Session.$go$private$project$stopPerformanceTelemetry(s);
        Queue__from_background.Close((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundQueue);
    }
    static Config(s: {
        value: Session;
    } | undefined): UserPreferences__from_lsutil {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: UserPreferences__from_lsutil = UserPreferences__from_lsutil.$zero();
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.userConfigRWMu);
                    const __gotots_receiver_9: Session["userConfigRWMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.userConfigRWMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_9, $go$recovery);
                    };
                    __gotots_return_0 = UserPreferences__from_lsutil.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.workspaceUserPreferences);
                    break __gotots_return_block_0;
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
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
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
        return __gotots_return_0;
    }
    static Configure(s: {
        value: Session;
    } | undefined, config: UserPreferences__from_lsutil): void {
        let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_2: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.userConfigRWMu);
                    const __gotots_receiver_84: Session["userConfigRWMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.userConfigRWMu;
                    __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_84, $go$recovery);
                    };
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingUserConfigChanges = true;
                    let oldConfig = UserPreferences__from_lsutil.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.workspaceUserPreferences);
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.workspaceUserPreferences = UserPreferences__from_lsutil.$copy(config);
                    Session.$go$private$project$refreshInlayHintsIfNeeded(s, UserPreferences__from_lsutil.$copy(oldConfig), UserPreferences__from_lsutil.$copy(config));
                    Session.$go$private$project$refreshCodeLensIfNeeded(s, UserPreferences__from_lsutil.$copy(oldConfig), UserPreferences__from_lsutil.$copy(config));
                    Session.$go$private$project$refreshDiagnosticsIfNeeded(s, UserPreferences__from_lsutil.$copy(oldConfig), UserPreferences__from_lsutil.$copy(config));
                    Session.$go$private$project$refreshATAIfNeeded(s, UserPreferences__from_lsutil.$copy(oldConfig), UserPreferences__from_lsutil.$copy(config));
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_3 !== undefined) {
                const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_3(__gotots_recovery_3);
                    if (__gotots_recovery_3.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
    }
    static DidChangeCompilerOptionsForInferredProjects(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, options: {
        value: CompilerOptions__from_core;
    } | undefined): void {
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptionsForInferredProjects = options;
        Session.UpdateSnapshot(s, ctx, overlayFS.Overlays((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs), new SnapshotChange(ResourceRequest.$zero(), UpdateReasonDidChangeCompilerOptionsForInferredProjects$constant(), FileChangeSummary.$zero(), options, void 0, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$ATAStateChange.nil(), void 0, false));
    }
    static DidChangeFile(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, uri: DocumentUri__from_lsproto, version: int32, changes: RuntimeSlice<TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage>): void {
        let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_2: {
                    Session.$go$private$project$cancelDiagnosticsRefresh(s);
                    Session.$go$private$project$cancelWarmAutoImportCache(s);
                    Session.$go$private$project$scheduleIdleCacheClean(s);
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChangesMu);
                    const __gotots_receiver_84: Session["pendingFileChangesMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChangesMu;
                    __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_84, $go$recovery);
                    };
                    const __gotots_slice_build_16: Session["pendingFileChanges"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges;
                    const __gotots_slice_build_18 = __gotots_slice_build_16.length + 1;
                    let __gotots_slice_build_17 = __gotots_slice_build_16;
                    if (__gotots_slice_build_18 <= __gotots_slice_build_16.capacity) {
                        __gotots_slice_build_17 = __gotots_slice_build_16.$withLength(__gotots_slice_build_18);
                        __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, (void FileChange.$storageOf, (void FileChange.$fromStorage,
                            {
                                Kind: FileChangeKindChange$constant().$value,
                                URI: uri.$value,
                                Version: version,
                                Changes: changes,
                                Content: "",
                                LanguageKind: ((void LanguageKind__from_lsproto,
                                    "") as string)
                            })));
                    }
                    else {
                        __gotots_slice_build_17 = goSliceAllocate<FileChange__from_project$Storage>(__gotots_slice_build_18, RuntimeSlice.$grownCapacity(__gotots_slice_build_16.capacity, __gotots_slice_build_18));
                        for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_16.length; __gotots_slice_build_19++) {
                            __gotots_slice_build_17.set(__gotots_slice_build_19, FileChange.$storageOf(FileChange.$copy(FileChange.$fromStorage(__gotots_slice_build_16.get(__gotots_slice_build_19)))));
                        }
                        __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, (void FileChange.$storageOf, (void FileChange.$fromStorage,
                            {
                                Kind: FileChangeKindChange$constant().$value,
                                URI: uri.$value,
                                Version: version,
                                Changes: changes,
                                Content: "",
                                LanguageKind: ((void LanguageKind__from_lsproto,
                                    "") as string)
                            })));
                        for (let __gotots_slice_build_19 = __gotots_slice_build_18; __gotots_slice_build_19 < __gotots_slice_build_17.capacity; __gotots_slice_build_19++) {
                            __gotots_slice_build_17.$initialize(__gotots_slice_build_19, FileChange.$zeroStorage());
                        }
                    }
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges = __gotots_slice_build_17;
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_3 !== undefined) {
                const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_3(__gotots_recovery_3);
                    if (__gotots_recovery_3.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
    }
    static DidChangeWatchedFiles(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, changes: RuntimeSlice<{
        value: FileEvent__from_lsproto;
    } | undefined>): void {
        const __gotots_slice_build_0 = goSliceAllocate<FileChange__from_project$Storage>(0, changes.length);
        for (let __gotots_slice_build_1 = 0; __gotots_slice_build_1 < __gotots_slice_build_0.capacity; __gotots_slice_build_1++) {
            __gotots_slice_build_0.$initialize(__gotots_slice_build_1, FileChange.$zeroStorage());
        }
        let fileChanges = __gotots_slice_build_0;
        const __gotots_range_17 = changes;
        for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_17.length; __gotots_range_index_9++) {
            const __gotots_range_value_31 = __gotots_range_17.get(__gotots_range_index_9);
            let change: {
                value: FileEvent__from_lsproto;
            } | undefined = __gotots_range_value_31;
            let kind = new FileChangeKind(0);
            switch ((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type) {
                case FileChangeTypeCreated$constant__from_lsproto(): {
                    kind = FileChangeKindWatchCreate$constant();
                    break;
                }
                case FileChangeTypeChanged$constant__from_lsproto(): {
                    kind = FileChangeKindWatchChange$constant();
                    break;
                }
                case FileChangeTypeDeleted$constant__from_lsproto(): {
                    kind = FileChangeKindWatchDelete$constant();
                    break;
                }
                default: {
                    continue;
                    break;
                }
            }
            const __gotots_slice_build_2 = fileChanges;
            const __gotots_slice_build_4 = __gotots_slice_build_2.length + 1;
            let __gotots_slice_build_3 = __gotots_slice_build_2;
            if (__gotots_slice_build_4 <= __gotots_slice_build_2.capacity) {
                __gotots_slice_build_3 = __gotots_slice_build_2.$withLength(__gotots_slice_build_4);
                __gotots_slice_build_3.set(__gotots_slice_build_2.length + 0, (void FileChange.$storageOf, (void FileChange.$fromStorage,
                    {
                        Kind: kind.$value,
                        URI: (change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Uri.$value,
                        Version: 0,
                        Content: "",
                        LanguageKind: ((void LanguageKind__from_lsproto,
                            "") as string),
                        Changes: RuntimeSlice.nil<TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage>()
                    })));
            }
            else {
                __gotots_slice_build_3 = goSliceAllocate<FileChange__from_project$Storage>(__gotots_slice_build_4, RuntimeSlice.$grownCapacity(__gotots_slice_build_2.capacity, __gotots_slice_build_4));
                for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                    __gotots_slice_build_3.set(__gotots_slice_build_5, FileChange.$storageOf(FileChange.$copy(FileChange.$fromStorage(__gotots_slice_build_2.get(__gotots_slice_build_5)))));
                }
                __gotots_slice_build_3.set(__gotots_slice_build_2.length + 0, (void FileChange.$storageOf, (void FileChange.$fromStorage,
                    {
                        Kind: kind.$value,
                        URI: (change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Uri.$value,
                        Version: 0,
                        Content: "",
                        LanguageKind: ((void LanguageKind__from_lsproto,
                            "") as string),
                        Changes: RuntimeSlice.nil<TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage>()
                    })));
                for (let __gotots_slice_build_5 = __gotots_slice_build_4; __gotots_slice_build_5 < __gotots_slice_build_3.capacity; __gotots_slice_build_5++) {
                    __gotots_slice_build_3.$initialize(__gotots_slice_build_5, FileChange.$zeroStorage());
                }
            }
            fileChanges = __gotots_slice_build_3;
        }
        sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChangesMu);
        const __gotots_slice_build_6: Session["pendingFileChanges"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges;
        const __gotots_slice_build_7 = fileChanges;
        let __gotots_slice_build_8 = __gotots_slice_build_7;
        if (__gotots_slice_build_7.length > 0) {
            __gotots_slice_build_8 = goSliceAllocate<FileChange__from_project$Storage>(__gotots_slice_build_7.length, null);
            for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_7.length; __gotots_slice_build_11++) {
                __gotots_slice_build_8.set(__gotots_slice_build_11, FileChange.$storageOf(FileChange.$copy(FileChange.$fromStorage(__gotots_slice_build_7.get(__gotots_slice_build_11)))));
            }
        }
        const __gotots_slice_build_10 = __gotots_slice_build_6.length + __gotots_slice_build_8.length;
        let __gotots_slice_build_9 = __gotots_slice_build_6;
        if (__gotots_slice_build_10 <= __gotots_slice_build_6.capacity) {
            __gotots_slice_build_9 = __gotots_slice_build_6.$withLength(__gotots_slice_build_10);
            for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                __gotots_slice_build_9.set(__gotots_slice_build_6.length + __gotots_slice_build_11, __gotots_slice_build_8.get(__gotots_slice_build_11));
            }
        }
        else {
            __gotots_slice_build_9 = goSliceAllocate<FileChange__from_project$Storage>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_6.capacity, __gotots_slice_build_10));
            for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_6.length; __gotots_slice_build_11++) {
                __gotots_slice_build_9.set(__gotots_slice_build_11, FileChange.$storageOf(FileChange.$copy(FileChange.$fromStorage(__gotots_slice_build_6.get(__gotots_slice_build_11)))));
            }
            for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                __gotots_slice_build_9.set(__gotots_slice_build_6.length + __gotots_slice_build_11, __gotots_slice_build_8.get(__gotots_slice_build_11));
            }
            for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                __gotots_slice_build_9.$initialize(__gotots_slice_build_11, FileChange.$zeroStorage());
            }
        }
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges = __gotots_slice_build_9;
        sync__from_gostdlib.Mutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChangesMu);
        Session.ScheduleDiagnosticsRefresh(s);
        Session.$go$private$project$cancelWarmAutoImportCache(s);
        Session.$go$private$project$scheduleIdleCacheClean(s);
    }
    static DidCloseFile(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, uri: DocumentUri__from_lsproto): void {
        Session.$go$private$project$cancelWarmAutoImportCache(s);
        Session.$go$private$project$scheduleIdleCacheClean(s);
        sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChangesMu);
        const __gotots_slice_build_24: Session["pendingFileChanges"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges;
        const __gotots_slice_build_26 = __gotots_slice_build_24.length + 1;
        let __gotots_slice_build_25 = __gotots_slice_build_24;
        if (__gotots_slice_build_26 <= __gotots_slice_build_24.capacity) {
            __gotots_slice_build_25 = __gotots_slice_build_24.$withLength(__gotots_slice_build_26);
            __gotots_slice_build_25.set(__gotots_slice_build_24.length + 0, (void FileChange.$storageOf, (void FileChange.$fromStorage,
                {
                    Kind: FileChangeKindClose$constant().$value,
                    URI: uri.$value,
                    Version: 0,
                    Content: "",
                    LanguageKind: ((void LanguageKind__from_lsproto,
                        "") as string),
                    Changes: RuntimeSlice.nil<TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage>()
                })));
        }
        else {
            __gotots_slice_build_25 = goSliceAllocate<FileChange__from_project$Storage>(__gotots_slice_build_26, RuntimeSlice.$grownCapacity(__gotots_slice_build_24.capacity, __gotots_slice_build_26));
            for (let __gotots_slice_build_27 = 0; __gotots_slice_build_27 < __gotots_slice_build_24.length; __gotots_slice_build_27++) {
                __gotots_slice_build_25.set(__gotots_slice_build_27, FileChange.$storageOf(FileChange.$copy(FileChange.$fromStorage(__gotots_slice_build_24.get(__gotots_slice_build_27)))));
            }
            __gotots_slice_build_25.set(__gotots_slice_build_24.length + 0, (void FileChange.$storageOf, (void FileChange.$fromStorage,
                {
                    Kind: FileChangeKindClose$constant().$value,
                    URI: uri.$value,
                    Version: 0,
                    Content: "",
                    LanguageKind: ((void LanguageKind__from_lsproto,
                        "") as string),
                    Changes: RuntimeSlice.nil<TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage>()
                })));
            for (let __gotots_slice_build_27 = __gotots_slice_build_26; __gotots_slice_build_27 < __gotots_slice_build_25.capacity; __gotots_slice_build_27++) {
                __gotots_slice_build_25.$initialize(__gotots_slice_build_27, FileChange.$zeroStorage());
            }
        }
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges = __gotots_slice_build_25;
        sync__from_gostdlib.Mutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChangesMu);
        Session.ScheduleSnapshotUpdate(s, UpdateReasonDidCloseFile$constant());
    }
    static DidOpenFile(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, uri: DocumentUri__from_lsproto, version: int32, content: gostring, languageKind: LanguageKind__from_lsproto): void {
        let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_2: {
                    Session.$go$private$project$cancelWarmAutoImportCache(s);
                    Session.$go$private$project$scheduleIdleCacheClean(s);
                    Session.$go$private$project$cancelScheduledSnapshotUpdate(s);
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotUpdateMu);
                    const __gotots_receiver_84: Session["snapshotUpdateMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotUpdateMu;
                    __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_84, $go$recovery);
                    };
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChangesMu);
                    const __gotots_slice_build_12: Session["pendingFileChanges"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges;
                    const __gotots_slice_build_14 = __gotots_slice_build_12.length + 1;
                    let __gotots_slice_build_13 = __gotots_slice_build_12;
                    if (__gotots_slice_build_14 <= __gotots_slice_build_12.capacity) {
                        __gotots_slice_build_13 = __gotots_slice_build_12.$withLength(__gotots_slice_build_14);
                        __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, (void FileChange.$storageOf, (void FileChange.$fromStorage,
                            {
                                Kind: FileChangeKindOpen$constant().$value,
                                URI: uri.$value,
                                Version: version,
                                Content: content,
                                LanguageKind: languageKind.$value,
                                Changes: RuntimeSlice.nil<TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage>()
                            })));
                    }
                    else {
                        __gotots_slice_build_13 = goSliceAllocate<FileChange__from_project$Storage>(__gotots_slice_build_14, RuntimeSlice.$grownCapacity(__gotots_slice_build_12.capacity, __gotots_slice_build_14));
                        for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_12.length; __gotots_slice_build_15++) {
                            __gotots_slice_build_13.set(__gotots_slice_build_15, FileChange.$storageOf(FileChange.$copy(FileChange.$fromStorage(__gotots_slice_build_12.get(__gotots_slice_build_15)))));
                        }
                        __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, (void FileChange.$storageOf, (void FileChange.$fromStorage,
                            {
                                Kind: FileChangeKindOpen$constant().$value,
                                URI: uri.$value,
                                Version: version,
                                Content: content,
                                LanguageKind: languageKind.$value,
                                Changes: RuntimeSlice.nil<TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage>()
                            })));
                        for (let __gotots_slice_build_15 = __gotots_slice_build_14; __gotots_slice_build_15 < __gotots_slice_build_13.capacity; __gotots_slice_build_15++) {
                            __gotots_slice_build_13.$initialize(__gotots_slice_build_15, FileChange.$zeroStorage());
                        }
                    }
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges = __gotots_slice_build_13;
                    const __gotots_results_23 = Session.$go$private$project$flushChangesLocked(s, ctx);
                    let changes = __gotots_results_23[0];
                    let overlays: GoMapValue<Path__from_tspath, {
                        value: Overlay;
                    } | undefined> = __gotots_results_23[1];
                    sync__from_gostdlib.Mutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChangesMu);
                    Session.UpdateSnapshot(s, ctx, overlays, new SnapshotChange(new ResourceRequest(RuntimeSlice.literal<gostring>([uri.$value]), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), void 0, new DocumentUri__from_lsproto("")), UpdateReasonDidOpenFile$constant(), FileChangeSummary.$copy(changes), void 0, void 0, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$ATAStateChange.nil(), void 0, false));
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_3 !== undefined) {
                const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_3(__gotots_recovery_3);
                    if (__gotots_recovery_3.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
    }
    static DidSaveFile(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, uri: DocumentUri__from_lsproto): void {
        let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_2: {
                    Session.$go$private$project$scheduleIdleCacheClean(s);
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChangesMu);
                    const __gotots_receiver_84: Session["pendingFileChangesMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChangesMu;
                    __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_84, $go$recovery);
                    };
                    const __gotots_slice_build_20: Session["pendingFileChanges"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges;
                    const __gotots_slice_build_22 = __gotots_slice_build_20.length + 1;
                    let __gotots_slice_build_21 = __gotots_slice_build_20;
                    if (__gotots_slice_build_22 <= __gotots_slice_build_20.capacity) {
                        __gotots_slice_build_21 = __gotots_slice_build_20.$withLength(__gotots_slice_build_22);
                        __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, (void FileChange.$storageOf, (void FileChange.$fromStorage,
                            {
                                Kind: FileChangeKindSave$constant().$value,
                                URI: uri.$value,
                                Version: 0,
                                Content: "",
                                LanguageKind: ((void LanguageKind__from_lsproto,
                                    "") as string),
                                Changes: RuntimeSlice.nil<TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage>()
                            })));
                    }
                    else {
                        __gotots_slice_build_21 = goSliceAllocate<FileChange__from_project$Storage>(__gotots_slice_build_22, RuntimeSlice.$grownCapacity(__gotots_slice_build_20.capacity, __gotots_slice_build_22));
                        for (let __gotots_slice_build_23 = 0; __gotots_slice_build_23 < __gotots_slice_build_20.length; __gotots_slice_build_23++) {
                            __gotots_slice_build_21.set(__gotots_slice_build_23, FileChange.$storageOf(FileChange.$copy(FileChange.$fromStorage(__gotots_slice_build_20.get(__gotots_slice_build_23)))));
                        }
                        __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, (void FileChange.$storageOf, (void FileChange.$fromStorage,
                            {
                                Kind: FileChangeKindSave$constant().$value,
                                URI: uri.$value,
                                Version: 0,
                                Content: "",
                                LanguageKind: ((void LanguageKind__from_lsproto,
                                    "") as string),
                                Changes: RuntimeSlice.nil<TextDocumentContentChangePartialOrWholeDocument__from_lsproto$Storage>()
                            })));
                        for (let __gotots_slice_build_23 = __gotots_slice_build_22; __gotots_slice_build_23 < __gotots_slice_build_21.capacity; __gotots_slice_build_23++) {
                            __gotots_slice_build_21.$initialize(__gotots_slice_build_23, FileChange.$zeroStorage());
                        }
                    }
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges = __gotots_slice_build_21;
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_3 !== undefined) {
                const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_3(__gotots_recovery_3);
                    if (__gotots_recovery_3.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
    }
    static EnqueuePublishGlobalDiagnostics(s: {
        value: Session;
    } | undefined): void {
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PushDiagnosticsEnabled) {
            return;
        }
        if (atomic__from_gostdlib.Bool.CompareAndSwap((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalDiagPublishPending, false, true)) {
            const __gotots_receiver_81: Session["backgroundQueue"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundQueue;
            const __gotots_argument_126: Session["backgroundCtx"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
            const __gotots_receiver_80 = s;
            const __gotots_argument_127 = ($argument0: GoInterface | undefined): void => {
                Session.$go$private$project$publishGlobalDiagnostics(__gotots_receiver_80, $argument0);
            };
            Queue__from_background.Enqueue(__gotots_receiver_81, __gotots_argument_126, __gotots_argument_127);
        }
    }
    static FS(s: {
        value: Session;
    } | undefined): FS__from_vfs | undefined {
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
    }
    static GetCurrentDirectory(s: {
        value: Session;
    } | undefined): gostring {
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory;
    }
    static GetLanguageService(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, uri: DocumentUri__from_lsproto): [
        LanguageService__from_ls | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_18 = Session.$go$private$project$getSnapshotAndDefaultProject(s, ctx, uri, false);
        let languageService: LanguageService__from_ls | undefined = __gotots_results_18[2];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_18[3];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        return [languageService, void 0];
    }
    static GetLanguageServiceAndProjectsForFile(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, uri: DocumentUri__from_lsproto): [
        {
            value: Project;
        } | undefined,
        LanguageService__from_ls | undefined,
        RuntimeSlice<Project__from_ls | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_24 = Session.$go$private$project$getSnapshotAndDefaultProject(s, ctx, uri, false);
        let snapshot: {
            value: Snapshot;
        } | undefined = __gotots_results_24[0];
        let project: {
            value: Project;
        } | undefined = __gotots_results_24[1];
        let defaultLs: LanguageService__from_ls | undefined = __gotots_results_24[2];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_24[3];
        if (!(err === undefined)) {
            return [void 0, void 0, RuntimeSlice.nil<Project__from_ls | undefined>(), err];
        }
        let allProjects = Snapshot.GetProjectsContainingFile(snapshot, uri);
        return [project, defaultLs, allProjects, void 0];
    }
    static GetLanguageServiceForProjectWithFile(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, project: {
        value: Project;
    } | undefined, uri: DocumentUri__from_lsproto): LanguageService__from_ls | undefined {
        let snapshot: {
            value: Snapshot;
        } | undefined = Session.$go$private$project$getSnapshot(s, ctx, new ResourceRequest(RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), RuntimeSlice.literal<gostring>([Project.Id(project).$value]), void 0, new DocumentUri__from_lsproto("")), false);
        project = ProjectCollection.GetProjectByPath((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection, Project.Id(project));
        if (project === undefined) {
            return void 0;
        }
        if (!Project.HasFile(project, uri.FileName())) {
            return void 0;
        }
        return NewLanguageService__from_ls((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath, Project.GetProgram(project), new $goInterfaceAdapter$PointerTo_Named_project$Snapshot(snapshot), uri.FileName());
    }
    static GetLanguageServiceWithAutoImports(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, baseSnapshot: {
        value: Snapshot;
    } | undefined, uri: DocumentUri__from_lsproto): [
        LanguageService__from_ls | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let change = new SnapshotChange(new ResourceRequest(RuntimeSlice.literal<gostring>([uri.$value]), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), void 0, uri), UpdateReasonRequestedLanguageServiceWithAutoImports$constant(), FileChangeSummary.$zero(), void 0, void 0, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$ATAStateChange.nil(), void 0, false);
        let newSnapshot: {
            value: Snapshot;
        } | undefined = Snapshot.Clone(baseSnapshot, ctx, SnapshotChange.$copy(change), ((baseSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays, s);
        let project: {
            value: Project;
        } | undefined = Snapshot.GetDefaultProject(newSnapshot, uri);
        if (project === undefined) {
            Snapshot.Deref(newSnapshot, s);
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("no project found for URI %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_lsproto$DocumentUri(uri)])))];
        }
        Queue__from_background.Enqueue((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundQueue, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx, (ctx__shadow_1: GoInterface | undefined): void => {
            Session.$go$private$project$adoptSnapshotChange(s, baseSnapshot, newSnapshot);
        });
        return [NewLanguageService__from_ls((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath, Project.GetProgram(project), new $goInterfaceAdapter$PointerTo_Named_project$Snapshot(newSnapshot), uri.FileName()), void 0];
    }
    static GetLanguageServicesForDocuments(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, uris: RuntimeSlice<gostring>): RuntimeSlice<LanguageService__from_ls | undefined> {
        let snapshot: {
            value: Snapshot;
        } | undefined = Session.$go$private$project$getSnapshot(s, ctx, new ResourceRequest(uris, RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), void 0, new DocumentUri__from_lsproto("")), false);
        let activeFile = "";
        if (uris.length > 0) {
            activeFile = new DocumentUri__from_lsproto(uris.get(0)).FileName();
        }
        let projects = ProjectCollection.Projects((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection);
        let services = RuntimeSlice.make<LanguageService__from_ls | undefined>(0, projects.length, void 0);
        const __gotots_range_21 = projects;
        for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_21.length; __gotots_range_index_13++) {
            const __gotots_range_value_35 = __gotots_range_21.get(__gotots_range_index_13);
            let project: {
                value: Project;
            } | undefined = __gotots_range_value_35;
            let program: {
                value: Program__from_compiler;
            } | undefined = Project.GetProgram(project);
            if (program === undefined) {
                continue;
            }
            services = services.append(void 0, [NewLanguageService__from_ls((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath, program, new $goInterfaceAdapter$PointerTo_Named_project$Snapshot(snapshot), activeFile)]);
        }
        return services;
    }
    static GetProjectsForFile(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, uri: DocumentUri__from_lsproto): [
        RuntimeSlice<Project__from_ls | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let snapshot: {
            value: Snapshot;
        } | undefined = Session.$go$private$project$getSnapshot(s, ctx, new ResourceRequest(RuntimeSlice.nil<gostring>(), RuntimeSlice.literal<gostring>([uri.$value]), RuntimeSlice.nil<gostring>(), void 0, new DocumentUri__from_lsproto("")), false);
        let allProjects = Snapshot.GetProjectsContainingFile(snapshot, uri);
        return [allProjects, void 0];
    }
    static InitializeWithUserConfig(s: {
        value: Session;
    } | undefined, config: UserPreferences__from_lsutil): void {
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initialUserPreferences = UserPreferences__from_lsutil.$copy(config);
        Session.Configure(s, UserPreferences__from_lsutil.$copy(config));
    }
    static NpmInstall(s: {
        value: Session;
    } | undefined, cwd: gostring, npmInstallArgs: RuntimeSlice<gostring>): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_receiver_1: Session["npmExecutor"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.npmExecutor;
        const __gotots_argument_0 = cwd;
        const __gotots_argument_1 = npmInstallArgs;
        return goInterfaceNonNil<NpmExecutor__from_ata>(__gotots_receiver_1).NpmInstall(__gotots_argument_0, __gotots_argument_1);
    }
    static ScheduleDiagnosticsRefresh(s: {
        value: Session;
    } | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshMu);
                    const __gotots_receiver_26: Session["diagnosticsRefreshMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_26, $go$recovery);
                    };
                    if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshCancel === undefined)) {
                        const __gotots_callee_9: Session["diagnosticsRefreshCancel"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshCancel;
                        (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))();
                        const __gotots_receiver_27: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_38 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Delaying scheduled diagnostics refresh...")]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_27).Log(__gotots_argument_38);
                    }
                    else {
                        const __gotots_receiver_28: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_39 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Scheduling new diagnostics refresh...")]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_28).Log(__gotots_argument_39);
                    }
                    const __gotots_argument_40: Session["backgroundCtx"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
                    const __gotots_results_9 = provider_context.ContextWithCancelDirect($goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$to(__gotots_argument_40));
                    const __gotots_results_10 = [$goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$from(__gotots_results_9[0]), __gotots_results_9[1]] satisfies [
                        GoInterface | undefined,
                        (() => void) | undefined
                    ];
                    let debounceCtx: GoInterface | undefined = __gotots_results_10[0];
                    let cancel: (() => void) | undefined = __gotots_results_10[1];
                    const __gotots_store_3 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_store_3.diagnosticsRefreshGeneration = goUint64(__gotots_store_3.diagnosticsRefreshGeneration + 1n);
                    let generation: Session["diagnosticsRefreshGeneration"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshGeneration;
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshCancel = cancel;
                    Queue__from_background.Enqueue((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundQueue, debounceCtx, (ctx: GoInterface | undefined): void => {
                        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                        let __gotots_panic_1: GoPanic | undefined = undefined;
                        try {
                            try {
                                __gotots_return_block_1: {
                                    const __gotots_callee_11: (() => void) | undefined = cancel;
                                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_11);
                                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                                        __gotots_deferred_2 === undefined ? (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                                    };
                                    let __gotots_receive_0: [
                                        time__from_gostdlib.Time,
                                        boolean
                                    ] | undefined = undefined;
                                    const __gotots_select_0 = GoChannel.$selectReceive(time__from_gostdlib.After(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DebounceDelay), (value: time__from_gostdlib.Time, ok: boolean): void => {
                                        __gotots_receive_0 = [value, ok];
                                    });
                                    const __gotots_receiver_29 = ctx;
                                    const __gotots_channel_0 = goInterfaceNonNil<GoInterface>(__gotots_receiver_29).Done();
                                    const __gotots_channel_1 = (value: GoEmptyStruct, ok: boolean): void => {
                                        __gotots_receive_1 = [value, ok];
                                    };
                                    let __gotots_receive_1: [
                                        GoEmptyStruct,
                                        boolean
                                    ] | undefined = undefined;
                                    const __gotots_select_1 = GoChannel.$selectReceive(__gotots_channel_0, __gotots_channel_1);
                                    const __gotots_switch_selection_0 = goSelect([__gotots_select_0, __gotots_select_1]);
                                    switch (__gotots_switch_selection_0) {
                                        case 0: {
                                            break;
                                        }
                                        case 1: {
                                            break __gotots_return_block_1;
                                            break;
                                        }
                                        default: GoPanic.raiseRuntime("select returned an invalid case");
                                    }
                                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshMu);
                                    if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshGeneration !== generation) {
                                        sync__from_gostdlib.Mutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshMu);
                                        break __gotots_return_block_1;
                                    }
                                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshCancel = void 0;
                                    sync__from_gostdlib.Mutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshMu);
                                    if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                                        const __gotots_receiver_30: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                                        const __gotots_argument_41 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Running scheduled diagnostics refresh")]);
                                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_30).Log(__gotots_argument_41);
                                    }
                                    {
                                        const __gotots_receiver_31: Session["client"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client;
                                        const __gotots_argument_42: Session["backgroundCtx"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
                                        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<Client>(__gotots_receiver_31).RefreshDiagnostics(__gotots_argument_42);
                                        if (!(err === undefined) && ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                                            const __gotots_receiver_32: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                                            const __gotots_argument_43 = "Error refreshing diagnostics: %v";
                                            const __gotots_argument_44 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err]);
                                            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_32).Logf(__gotots_argument_43, __gotots_argument_44);
                                        }
                                    }
                                }
                            }
                            catch (__gotots_caught_3) {
                                if (!(__gotots_caught_3 instanceof GoPanic)) {
                                    throw __gotots_caught_3;
                                }
                                __gotots_panic_1 = __gotots_caught_3;
                            }
                        }
                        finally {
                            if (__gotots_deferred_1 !== undefined) {
                                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                                try {
                                    __gotots_deferred_1(__gotots_recovery_1);
                                    if (__gotots_recovery_1.recovered()) {
                                        __gotots_panic_1 = undefined;
                                    }
                                }
                                catch (__gotots_caught_2) {
                                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                                        throw __gotots_caught_2;
                                    }
                                    __gotots_panic_1 = __gotots_caught_2;
                                }
                            }
                        }
                        if (__gotots_panic_1 !== undefined) {
                            throw __gotots_panic_1;
                        }
                    });
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
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
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
    static ScheduleSnapshotUpdate(s: {
        value: Session;
    } | undefined, reason: UpdateReason): void {
        let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_2: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateMu);
                    const __gotots_receiver_93: Session["scheduledSnapshotUpdateMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateMu;
                    __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_93, $go$recovery);
                    };
                    if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateCancel === undefined)) {
                        const __gotots_callee_37: Session["scheduledSnapshotUpdateCancel"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateCancel;
                        (__gotots_callee_37 ?? GoPanic.raiseRuntime("call of nil function"))();
                        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                            const __gotots_receiver_94: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                            const __gotots_argument_157 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Delaying scheduled snapshot update...")]);
                            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_94).Log(__gotots_argument_157);
                        }
                    }
                    else if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                        const __gotots_receiver_95: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_158 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Scheduling new snapshot update...")]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_95).Log(__gotots_argument_158);
                    }
                    const __gotots_argument_159: Session["backgroundCtx"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
                    const __gotots_results_27 = provider_context.ContextWithCancelDirect($goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$to(__gotots_argument_159));
                    const __gotots_results_28 = [$goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$from(__gotots_results_27[0]), __gotots_results_27[1]] satisfies [
                        GoInterface | undefined,
                        (() => void) | undefined
                    ];
                    let debounceCtx: GoInterface | undefined = __gotots_results_28[0];
                    let cancel: (() => void) | undefined = __gotots_results_28[1];
                    const __gotots_store_27 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_store_27.scheduledSnapshotUpdateGeneration = goUint64(__gotots_store_27.scheduledSnapshotUpdateGeneration + 1n);
                    let generation: Session["scheduledSnapshotUpdateGeneration"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateGeneration;
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateCancel = cancel;
                    Queue__from_background.Enqueue((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundQueue, debounceCtx, (ctx: GoInterface | undefined): void => {
                        let __gotots_deferred_4: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                        let __gotots_deferred_5: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                        let __gotots_panic_3: GoPanic | undefined = undefined;
                        try {
                            try {
                                __gotots_return_block_3: {
                                    const __gotots_callee_39: (() => void) | undefined = cancel;
                                    const __gotots_deferred_6 = DeferredCallableRegistry.resolve(__gotots_callee_39);
                                    __gotots_deferred_4 = ($go$recovery: GoRecovery): void => {
                                        __gotots_deferred_6 === undefined ? (__gotots_callee_39 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_6($go$recovery);
                                    };
                                    let __gotots_receive_4: [
                                        time__from_gostdlib.Time,
                                        boolean
                                    ] | undefined = undefined;
                                    const __gotots_select_4 = GoChannel.$selectReceive(time__from_gostdlib.After(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DebounceDelay), (value: time__from_gostdlib.Time, ok: boolean): void => {
                                        __gotots_receive_4 = [value, ok];
                                    });
                                    const __gotots_receiver_96 = ctx;
                                    const __gotots_channel_4 = goInterfaceNonNil<GoInterface>(__gotots_receiver_96).Done();
                                    const __gotots_channel_5 = (value: GoEmptyStruct, ok: boolean): void => {
                                        __gotots_receive_5 = [value, ok];
                                    };
                                    let __gotots_receive_5: [
                                        GoEmptyStruct,
                                        boolean
                                    ] | undefined = undefined;
                                    const __gotots_select_5 = GoChannel.$selectReceive(__gotots_channel_4, __gotots_channel_5);
                                    const __gotots_switch_selection_2 = goSelect([__gotots_select_4, __gotots_select_5]);
                                    switch (__gotots_switch_selection_2) {
                                        case 0: {
                                            break;
                                        }
                                        case 1: {
                                            break __gotots_return_block_3;
                                            break;
                                        }
                                        default: GoPanic.raiseRuntime("select returned an invalid case");
                                    }
                                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateMu);
                                    if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateGeneration !== generation) {
                                        sync__from_gostdlib.Mutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateMu);
                                        break __gotots_return_block_3;
                                    }
                                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateCancel = void 0;
                                    sync__from_gostdlib.Mutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateMu);
                                    if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                                        const __gotots_receiver_97: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                                        const __gotots_argument_160 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Running scheduled snapshot update")]);
                                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_97).Log(__gotots_argument_160);
                                    }
                                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotUpdateMu);
                                    const __gotots_receiver_98: Session["snapshotUpdateMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotUpdateMu;
                                    __gotots_deferred_5 = ($go$recovery: GoRecovery): void => {
                                        recovery_sync.SyncMutexUnlock(__gotots_receiver_98, $go$recovery);
                                    };
                                    const __gotots_results_29 = Session.$go$private$project$flushChanges(s, ctx);
                                    let fileChanges = __gotots_results_29[0];
                                    let overlays: GoMapValue<Path__from_tspath, {
                                        value: Overlay;
                                    } | undefined> = __gotots_results_29[1];
                                    let ataChanges: GoMapValue<Path__from_tspath, ATAStateChange | undefined> = __gotots_results_29[2];
                                    let newConfig: tsonicTypeScriptRuntime.Location<UserPreferences__from_lsutil> | undefined = __gotots_results_29[3];
                                    if (fileChanges.IsEmpty() && ataChanges.length() === 0 && newConfig === undefined) {
                                        break __gotots_return_block_3;
                                    }
                                    Session.UpdateSnapshot(s, ctx, overlays, new SnapshotChange(ResourceRequest.$zero(), reason, FileChangeSummary.$copy(fileChanges), void 0, newConfig, ataChanges, void 0, false));
                                }
                            }
                            catch (__gotots_caught_8) {
                                if (!(__gotots_caught_8 instanceof GoPanic)) {
                                    throw __gotots_caught_8;
                                }
                                __gotots_panic_3 = __gotots_caught_8;
                            }
                        }
                        finally {
                            if (__gotots_deferred_5 !== undefined) {
                                const __gotots_recovery_5 = new GoRecovery(__gotots_panic_3);
                                try {
                                    __gotots_deferred_5(__gotots_recovery_5);
                                    if (__gotots_recovery_5.recovered()) {
                                        __gotots_panic_3 = undefined;
                                    }
                                }
                                catch (__gotots_caught_7) {
                                    if (!(__gotots_caught_7 instanceof GoPanic)) {
                                        throw __gotots_caught_7;
                                    }
                                    __gotots_panic_3 = __gotots_caught_7;
                                }
                            }
                            if (__gotots_deferred_4 !== undefined) {
                                const __gotots_recovery_4 = new GoRecovery(__gotots_panic_3);
                                try {
                                    __gotots_deferred_4(__gotots_recovery_4);
                                    if (__gotots_recovery_4.recovered()) {
                                        __gotots_panic_3 = undefined;
                                    }
                                }
                                catch (__gotots_caught_6) {
                                    if (!(__gotots_caught_6 instanceof GoPanic)) {
                                        throw __gotots_caught_6;
                                    }
                                    __gotots_panic_3 = __gotots_caught_6;
                                }
                            }
                        }
                        if (__gotots_panic_3 !== undefined) {
                            throw __gotots_panic_3;
                        }
                    });
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_3 !== undefined) {
                const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_3(__gotots_recovery_3);
                    if (__gotots_recovery_3.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
    }
    static StartPerformanceTelemetry(s: {
        value: Session;
    } | undefined): void {
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TelemetryEnabled) {
            return;
        }
        const __gotots_argument_130: Session["backgroundCtx"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
        const __gotots_results_21 = provider_context.ContextWithCancelDirect($goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$to(__gotots_argument_130));
        const __gotots_results_22 = [$goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$from(__gotots_results_21[0]), __gotots_results_21[1]] satisfies [
            GoInterface | undefined,
            (() => void) | undefined
        ];
        let ctx: GoInterface | undefined = __gotots_results_22[0];
        let cancel: (() => void) | undefined = __gotots_results_22[1];
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.performanceTelemetryCancel = cancel;
        Queue__from_background.Enqueue((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundQueue, ctx, (ctx__shadow_1: GoInterface | undefined): void => {
            let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
            let __gotots_panic_2: GoPanic | undefined = undefined;
            try {
                try {
                    __gotots_return_block_2: {
                        const __gotots_conversion_3 = time__from_gostdlib.NewTicker(performanceTelemetryInterval$constant());
                        let ticker: tsonicTypeScriptRuntime.Location<time__from_gostdlib.Ticker> | undefined = __gotots_conversion_3 === undefined ? undefined :
                            tsonicTypeScriptRuntime.boundLocation<time__from_gostdlib.Ticker>(__gotots_conversion_3, (): time__from_gostdlib.Ticker => {
                                return __gotots_conversion_3;
                            }, ($go$providerPointerValue: time__from_gostdlib.Ticker): void => {
                                named_time.TimeTickerOperations.$assign(__gotots_conversion_3, $go$providerPointerValue);
                            });
                        const __gotots_receiver_82 = ticker;
                        const __gotots_receiver_83 = __gotots_receiver_82 === void 0 ? void 0 :
                            (__gotots_receiver_82 as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Ticker>).value;
                        __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                            recovery_value.TimeTickerStop(__gotots_receiver_83, $go$recovery);
                        };
                        for (;;) {
                            const __gotots_receiver_84 = ctx__shadow_1;
                            const __gotots_channel_2 = goInterfaceNonNil<GoInterface>(__gotots_receiver_84).Done();
                            const __gotots_channel_3 = (value: GoEmptyStruct, ok: boolean): void => {
                                __gotots_receive_2 = [value, ok];
                            };
                            let __gotots_receive_2: [
                                GoEmptyStruct,
                                boolean
                            ] | undefined = undefined;
                            const __gotots_select_2 = GoChannel.$selectReceive(__gotots_channel_2, __gotots_channel_3);
                            let __gotots_receive_3: [
                                time__from_gostdlib.Time,
                                boolean
                            ] | undefined = undefined;
                            const __gotots_select_3 = GoChannel.$selectReceive(((ticker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Ticker>).value.C, (value: time__from_gostdlib.Time, ok: boolean): void => {
                                __gotots_receive_3 = [value, ok];
                            });
                            const __gotots_switch_selection_1 = goSelect([__gotots_select_2, __gotots_select_3]);
                            switch (__gotots_switch_selection_1) {
                                case 0: {
                                    break __gotots_return_block_2;
                                    break;
                                }
                                case 1: {
                                    let __gotots_logical_result_1 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client === undefined;
                                    if (!__gotots_logical_result_1) {
                                        const __gotots_receiver_85: Session["client"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client;
                                        __gotots_logical_result_1 = !goInterfaceNonNil<Client>(__gotots_receiver_85).IsActive();
                                    }
                                    if (__gotots_logical_result_1) {
                                        continue;
                                    }
                                    Session.$go$private$project$sendPerformanceTelemetry(s, ctx__shadow_1);
                                    break;
                                }
                                default: GoPanic.raiseRuntime("select returned an invalid case");
                            }
                        }
                    }
                }
                catch (__gotots_caught_5) {
                    if (!(__gotots_caught_5 instanceof GoPanic)) {
                        throw __gotots_caught_5;
                    }
                    __gotots_panic_2 = __gotots_caught_5;
                }
            }
            finally {
                if (__gotots_deferred_3 !== undefined) {
                    const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                    try {
                        __gotots_deferred_3(__gotots_recovery_3);
                        if (__gotots_recovery_3.recovered()) {
                            __gotots_panic_2 = undefined;
                        }
                    }
                    catch (__gotots_caught_4) {
                        if (!(__gotots_caught_4 instanceof GoPanic)) {
                            throw __gotots_caught_4;
                        }
                        __gotots_panic_2 = __gotots_caught_4;
                    }
                }
            }
            if (__gotots_panic_2 !== undefined) {
                throw __gotots_panic_2;
            }
        });
    }
    static UpdateSnapshot(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, overlays: GoMapValue<Path__from_tspath, {
        value: Overlay;
    } | undefined>, change: SnapshotChange): void {
        Session.$go$private$project$updateSnapshot(s, ctx, overlays, SnapshotChange.$copy(change), false);
    }
    static WithLanguageServiceAndSnapshot(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, uri: DocumentUri__from_lsproto, fn: (($0: LanguageService__from_ls | undefined, $1: {
        value: Snapshot;
    } | undefined) => [
        (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ]) | undefined): [
        (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_19 = Session.$go$private$project$getSnapshotAndDefaultProject(s, ctx, uri, true);
        let snapshot: {
            value: Snapshot;
        } | undefined = __gotots_results_19[0];
        let languageService: LanguageService__from_ls | undefined = __gotots_results_19[2];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_19[3];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        const __gotots_callee_15 = fn;
        const __gotots_argument_128 = languageService;
        const __gotots_argument_129 = snapshot;
        const __gotots_results_20 = (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_128, __gotots_argument_129);
        let asyncWork: (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined = __gotots_results_20[0];
        err = __gotots_results_20[1];
        if (!(err === undefined) || asyncWork === undefined) {
            Snapshot.Deref(snapshot, s);
            return [void 0, err];
        }
        return [(): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                let __gotots_panic_2: GoPanic | undefined = undefined;
                let __gotots_return_1: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
                try {
                    try {
                        __gotots_return_block_2: {
                            const __gotots_receiver_82 = snapshot;
                            const __gotots_argument_130 = s;
                            __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                                Snapshot.Deref(__gotots_receiver_82, __gotots_argument_130);
                            };
                            const __gotots_callee_16 = asyncWork;
                            __gotots_return_1 = (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))();
                            break __gotots_return_block_2;
                        }
                    }
                    catch (__gotots_caught_5) {
                        if (!(__gotots_caught_5 instanceof GoPanic)) {
                            throw __gotots_caught_5;
                        }
                        __gotots_panic_2 = __gotots_caught_5;
                    }
                }
                finally {
                    if (__gotots_deferred_3 !== undefined) {
                        const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                        try {
                            __gotots_deferred_3(__gotots_recovery_3);
                            if (__gotots_recovery_3.recovered()) {
                                __gotots_panic_2 = undefined;
                            }
                        }
                        catch (__gotots_caught_4) {
                            if (!(__gotots_caught_4 instanceof GoPanic)) {
                                throw __gotots_caught_4;
                            }
                            __gotots_panic_2 = __gotots_caught_4;
                        }
                    }
                }
                if (__gotots_panic_2 !== undefined) {
                    throw __gotots_panic_2;
                }
                return __gotots_return_1;
            }, void 0];
    }
    static WithSnapshotLoadingProjectTree(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, requestedProjectTrees: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined, fn: (($0: {
        value: Snapshot;
    } | undefined) => void) | undefined): void {
        let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_2: {
                    let snapshot: {
                        value: Snapshot;
                    } | undefined = Session.$go$private$project$getSnapshot(s, ctx, new ResourceRequest(RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), new ProjectTreeRequest(requestedProjectTrees), new DocumentUri__from_lsproto("")), true);
                    const __gotots_receiver_84 = snapshot;
                    const __gotots_argument_131 = s;
                    __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                        Snapshot.Deref(__gotots_receiver_84, __gotots_argument_131);
                    };
                    const __gotots_callee_18 = fn;
                    const __gotots_argument_132 = snapshot;
                    (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_132);
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_3 !== undefined) {
                const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_3(__gotots_recovery_3);
                    if (__gotots_recovery_3.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
    }
    static $go$private$project$adoptSnapshotChange(s: {
        value: Session;
    } | undefined, baseSnapshot: {
        value: Snapshot;
    } | undefined, newSnapshot: {
        value: Snapshot;
    } | undefined): void {
        sync__from_gostdlib.RWMutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotMu);
        let oldSnapshot: {
            value: Snapshot;
        } | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot;
        if (oldSnapshot
            ===
                baseSnapshot) {
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot = newSnapshot;
            sync__from_gostdlib.RWMutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotMu);
            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                const __gotots_receiver_74: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                const __gotots_argument_116 = "Adopted snapshot %d (parent %d) as current session snapshot (replacing %d)";
                const __gotots_argument_117 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$uint64((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id), new $goInterfaceAdapter$uint64((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parentId), new $goInterfaceAdapter$uint64((oldSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id)]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_74).Logf(__gotots_argument_116, __gotots_argument_117);
                const __gotots_receiver_75: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                const __gotots_argument_118 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(LogTree__from_logging.String((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builderLogs))]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_75).Log(__gotots_argument_118);
            }
            Snapshot.Deref(oldSnapshot, s);
        }
        else {
            sync__from_gostdlib.RWMutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotMu);
            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                const __gotots_receiver_76: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                const __gotots_argument_119 = "Discarded snapshot %d (parent %d); session has moved on to snapshot %d";
                const __gotots_argument_120 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$uint64((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id), new $goInterfaceAdapter$uint64((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parentId), new $goInterfaceAdapter$uint64((oldSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id)]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_76).Logf(__gotots_argument_119, __gotots_argument_120);
                {
                    let logs = LogTree__from_logging.String((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builderLogs);
                    if (logs !== "") {
                        const __gotots_receiver_77: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_121 = "--- Discarded snapshot %d builder logs (NOT adopted) ---";
                        const __gotots_argument_122 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$uint64((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id)]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_77).Logf(__gotots_argument_121, __gotots_argument_122);
                        const __gotots_receiver_78: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_123 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(logs)]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_78).Log(__gotots_argument_123);
                        const __gotots_receiver_79: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_124 = "--- End discarded snapshot %d builder logs ---";
                        const __gotots_argument_125 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$uint64((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id)]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_79).Logf(__gotots_argument_124, __gotots_argument_125);
                    }
                }
            }
            Snapshot.Deref(newSnapshot, s);
        }
    }
    static $go$private$project$cancelDiagnosticsRefresh(s: {
        value: Session;
    } | undefined): void {
        let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_2: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshMu);
                    const __gotots_receiver_87: Session["diagnosticsRefreshMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshMu;
                    __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_87, $go$recovery);
                    };
                    if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshCancel === undefined)) {
                        const __gotots_callee_35: Session["diagnosticsRefreshCancel"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshCancel;
                        (__gotots_callee_35 ?? GoPanic.raiseRuntime("call of nil function"))();
                        const __gotots_receiver_88: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_150 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Canceled scheduled diagnostics refresh")]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_88).Log(__gotots_argument_150);
                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticsRefreshCancel = void 0;
                        const __gotots_store_26 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_26.diagnosticsRefreshGeneration = goUint64(__gotots_store_26.diagnosticsRefreshGeneration + 1n);
                    }
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_3 !== undefined) {
                const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_3(__gotots_recovery_3);
                    if (__gotots_recovery_3.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
    }
    static $go$private$project$cancelIdleCacheClean(s: {
        value: Session;
    } | undefined): void {
        let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_2: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idleCacheCleanMu);
                    const __gotots_receiver_88: Session["idleCacheCleanMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idleCacheCleanMu;
                    __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_88, $go$recovery);
                    };
                    if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idleCacheCleanTimer === undefined)) {
                        const __gotots_receiver_89: Session["idleCacheCleanTimer"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idleCacheCleanTimer;
                        time__from_gostdlib.Timer.Stop(__gotots_receiver_89 === void 0 ? void 0 :
                            (__gotots_receiver_89 as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Timer>).value);
                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idleCacheCleanTimer = void 0;
                    }
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_3 !== undefined) {
                const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_3(__gotots_recovery_3);
                    if (__gotots_recovery_3.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
    }
    static $go$private$project$cancelScheduledSnapshotUpdate(s: {
        value: Session;
    } | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateMu);
                    const __gotots_receiver_3: Session["scheduledSnapshotUpdateMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_3, $go$recovery);
                    };
                    if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateCancel === undefined)) {
                        const __gotots_callee_1: Session["scheduledSnapshotUpdateCancel"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateCancel;
                        (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
                        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                            const __gotots_receiver_4: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                            const __gotots_argument_5 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Canceled scheduled snapshot update")]);
                            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_4).Log(__gotots_argument_5);
                        }
                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.scheduledSnapshotUpdateCancel = void 0;
                        const __gotots_store_0 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_0.scheduledSnapshotUpdateGeneration = goUint64(__gotots_store_0.scheduledSnapshotUpdateGeneration + 1n);
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
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
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
    static $go$private$project$cancelWarmAutoImportCache(s: {
        value: Session;
    } | undefined): void {
        let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_2: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.warmAutoImportMu);
                    const __gotots_receiver_84: Session["warmAutoImportMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.warmAutoImportMu;
                    __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_84, $go$recovery);
                    };
                    if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.warmAutoImportCancel === undefined)) {
                        const __gotots_callee_19: Session["warmAutoImportCancel"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.warmAutoImportCancel;
                        (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))();
                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.warmAutoImportCancel = void 0;
                    }
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_3 !== undefined) {
                const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_3(__gotots_recovery_3);
                    if (__gotots_recovery_3.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
    }
    static $go$private$project$collectProjectInfoTelemetry(s: {
        value: Session;
    } | undefined, project: {
        value: Project;
    } | undefined): RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto {
        let opts: {
            value: CompilerOptions__from_core;
        } | undefined = ParsedCommandLine__from_tsoptions.CompilerOptions((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine);
        if (opts === undefined) {
            const __gotots_struct_0 = CompilerOptions__from_core.$zero();
            opts =
                { value: __gotots_struct_0 };
        }
        let configFileName = "other";
        if ((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === KindConfigured$constant().$value) {
            let baseName = GetBaseFileName__from_tspath((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileName);
            if (baseName === "tsconfig.json" || baseName === "jsconfig.json") {
                configFileName = baseName;
            }
        }
        let projectType = "inferred";
        if ((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === KindConfigured$constant().$value) {
            projectType = "configured";
        }
        let props: GoMapValue<gostring, gostring> = GoMap__from_gotots_runtime.make<gostring, gostring>("", 3, [["configFileName", configFileName], ["projectType", projectType], ["version", Version__from_core()]]);
        let compilerOptions: GoMapValue<gostring, $goInterface$Interface_void | undefined> = $goMap$MapOf_string_To_Interface_void.make(0, []);
        setTristate(compilerOptions, "strict", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Strict);
        setTristate(compilerOptions, "noImplicitAny", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoImplicitAny);
        setTristate(compilerOptions, "noImplicitThis", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoImplicitThis);
        setTristate(compilerOptions, "strictNullChecks", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictNullChecks);
        setTristate(compilerOptions, "strictFunctionTypes", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictFunctionTypes);
        setTristate(compilerOptions, "strictBindCallApply", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictBindCallApply);
        setTristate(compilerOptions, "strictPropertyInitialization", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictPropertyInitialization);
        setTristate(compilerOptions, "strictBuiltinIteratorReturn", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictBuiltinIteratorReturn);
        setTristate(compilerOptions, "useUnknownInCatchVariables", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UseUnknownInCatchVariables);
        setTristate(compilerOptions, "exactOptionalPropertyTypes", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExactOptionalPropertyTypes);
        setTristate(compilerOptions, "allowJs", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowJs);
        setTristate(compilerOptions, "checkJs", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CheckJs);
        setTristate(compilerOptions, "noEmit", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit);
        setTristate(compilerOptions, "declaration", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Declaration);
        setTristate(compilerOptions, "composite", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite);
        setTristate(compilerOptions, "isolatedModules", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsolatedModules);
        setTristate(compilerOptions, "skipLibCheck", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SkipLibCheck);
        setTristate(compilerOptions, "incremental", (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incremental);
        if (!((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target === ScriptTargetNone$constant__from_core())) {
            compilerOptions.store("target", new $goInterfaceAdapter$string(ScriptTarget_String__from_core((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target)));
        }
        if (!((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Module === ModuleKindNone$constant__from_core())) {
            compilerOptions.store("module", new $goInterfaceAdapter$string(ModuleKind_String__from_core((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Module)));
        }
        if (!((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleResolution === ModuleResolutionKindUnknown$constant__from_core())) {
            compilerOptions.store("moduleResolution", new $goInterfaceAdapter$string(ModuleResolutionKind_String__from_core((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleResolution)));
        }
        if (!((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitNone$constant__from_core())) {
            compilerOptions.store("jsx", new $goInterfaceAdapter$string(JsxEmit_String__from_core((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx)));
        }
        {
            const __gotots_results_16 = Marshal__from_json__package_1(new $goInterfaceAdapter$MapOf_string_To_Interface_void(compilerOptions), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            let b = __gotots_results_16[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_16[1];
            if (err === undefined) {
                const __gotots_store_8 = props;
                const __gotots_store_9 = "compilerOptions";
                const __gotots_conversion_0 = b;
                let __gotots_conversion_1 = "";
                for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                    __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
                }
                __gotots_store_8.store(__gotots_store_9, __gotots_conversion_1);
            }
        }
        {
            const __gotots_results_17 = (($value: $goInterface$Interface_void | undefined): [
                tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, $goInterface$Interface_void | undefined>> | undefined,
                boolean
            ] => {
                if (!$goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void.$is($value)) {
                    return [void 0, false];
                }
                return [$value.$go$value, true];
            })((((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.Raw);
            let raw: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, $goInterface$Interface_void | undefined>> | undefined = __gotots_results_17[0];
            let ok = __gotots_results_17[1];
            if (ok) {
                props.store("extends", boolTelemetry(OrderedMap__from_collections.Has<gostring, $goInterface$Interface_void | undefined>(raw, "extends")));
                props.store("files", boolTelemetry(OrderedMap__from_collections.Has<gostring, $goInterface$Interface_void | undefined>(raw, "files")));
                props.store("include", boolTelemetry(OrderedMap__from_collections.Has<gostring, $goInterface$Interface_void | undefined>(raw, "include")));
                props.store("exclude", boolTelemetry(OrderedMap__from_collections.Has<gostring, $goInterface$Interface_void | undefined>(raw, "exclude")));
            }
        }
        return RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto.$fromStorage({
            ProjectInfoTelemetryEvent: { value: new ProjectInfoTelemetryEvent__from_lsproto(StringLiteralLanguageServerProjectInfo__from_lsproto.$zero(), StringLiteralUsage__from_lsproto.$zero(), props, countFileStats(Program__from_compiler.GetSourceFiles((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program))) },
            RequestFailureTelemetryEvent: void 0,
            PerformanceStatsTelemetryEvent: void 0
        });
    }
    static $go$private$project$flushChanges(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined): [
        FileChangeSummary,
        GoMapValue<Path__from_tspath, {
            value: Overlay;
        } | undefined>,
        GoMapValue<Path__from_tspath, ATAStateChange | undefined>,
        tsonicTypeScriptRuntime.Location<UserPreferences__from_lsutil> | undefined
    ] {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            FileChangeSummary,
            GoMapValue<Path__from_tspath, {
                value: Overlay;
            } | undefined>,
            GoMapValue<Path__from_tspath, ATAStateChange | undefined>,
            tsonicTypeScriptRuntime.Location<UserPreferences__from_lsutil> | undefined
        ] = [FileChangeSummary.$zero(), GoMap.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$ATAStateChange.nil(), void 0];
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChangesMu);
                    const __gotots_receiver_4: Session["pendingFileChangesMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChangesMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_4, $go$recovery);
                    };
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingATAChangesMu);
                    const __gotots_receiver_5: Session["pendingATAChangesMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingATAChangesMu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_5, $go$recovery);
                    };
                    let pendingATAChanges: GoMapValue<Path__from_tspath, ATAStateChange | undefined> = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingATAChanges;
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingATAChanges = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$ATAStateChange.make(0, []);
                    const __gotots_results_2 = Session.$go$private$project$flushChangesLocked(s, ctx);
                    let fileChanges = __gotots_results_2[0];
                    let overlays: GoMapValue<Path__from_tspath, {
                        value: Overlay;
                    } | undefined> = __gotots_results_2[1];
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.userConfigRWMu);
                    const __gotots_receiver_6: Session["userConfigRWMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.userConfigRWMu;
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_6, $go$recovery);
                    };
                    let newPrefs: tsonicTypeScriptRuntime.Location<UserPreferences__from_lsutil> | undefined = void 0;
                    if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingUserConfigChanges) {
                        let p = UserPreferences__from_lsutil.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.workspaceUserPreferences);
                        const p$location = tsonicTypeScriptRuntime.boundLocation({}, () => p, p$next => p = p$next);
                        newPrefs =
                            p$location;
                    }
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingUserConfigChanges = false;
                    __gotots_return_0 = [FileChangeSummary.$copy(fileChanges), overlays, pendingATAChanges, newPrefs];
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_0 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_2 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_2(__gotots_recovery_2);
                    if (__gotots_recovery_2.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_0 = __gotots_caught_2;
                }
            }
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
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
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
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
        return __gotots_return_0;
    }
    static $go$private$project$flushChangesLocked(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined): [
        FileChangeSummary,
        GoMapValue<Path__from_tspath, {
            value: Overlay;
        } | undefined>
    ] {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges.length === 0) {
            return [new FileChangeSummary(new DocumentUri__from_lsproto(""), new DocumentUri__from_lsproto(""), Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
                    return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil();
                }), Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
                    return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil();
                }), Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
                    return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil();
                }), Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
                    return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil();
                }), false, false), overlayFS.Overlays((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs)];
        }
        let start = time__from_gostdlib.Now();
        const __gotots_results_3 = overlayFS.$go$private$project$processChanges((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges);
        let changes = __gotots_results_3[0];
        let overlays: GoMapValue<Path__from_tspath, {
            value: Overlay;
        } | undefined> = __gotots_results_3[1];
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
            const __gotots_receiver_4: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
            const __gotots_argument_6 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Processed %d file changes in %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges.length), new $goInterfaceAdapter$Named_time$Duration(time__from_gostdlib.Since(named_time.TimeOperations.$copy(start)))])))]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_4).Log(__gotots_argument_6);
        }
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingFileChanges = RuntimeSlice.nil<FileChange__from_project$Storage>();
        return [FileChangeSummary.$copy(changes), overlays];
    }
    static $go$private$project$getSnapshot(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, request: ResourceRequest, callerRef: bool): {
        value: Snapshot;
    } | undefined {
        let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        let __gotots_return_1: {
            value: Snapshot;
        } | undefined = void 0;
        try {
            try {
                __gotots_return_block_2: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotUpdateMu);
                    const __gotots_receiver_97: Session["snapshotUpdateMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotUpdateMu;
                    __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_97, $go$recovery);
                    };
                    Session.$go$private$project$cancelScheduledSnapshotUpdate(s);
                    const __gotots_results_30 = Session.$go$private$project$flushChanges(s, ctx);
                    let fileChanges = __gotots_results_30[0];
                    let overlays: GoMapValue<Path__from_tspath, {
                        value: Overlay;
                    } | undefined> = __gotots_results_30[1];
                    let ataChanges: GoMapValue<Path__from_tspath, ATAStateChange | undefined> = __gotots_results_30[2];
                    let newConfig: tsonicTypeScriptRuntime.Location<UserPreferences__from_lsutil> | undefined = __gotots_results_30[3];
                    let updateSnapshot = !fileChanges.IsEmpty() || ataChanges.length() > 0 || !(newConfig === undefined);
                    if (updateSnapshot) {
                        __gotots_return_1 = Session.$go$private$project$updateSnapshot(s, ctx, overlays, new SnapshotChange(ResourceRequest.$copy(request), UpdateReasonRequestedLanguageServicePendingChanges$constant(), FileChangeSummary.$copy(fileChanges), void 0, newConfig, ataChanges, void 0, false), callerRef);
                        break __gotots_return_block_2;
                    }
                    sync__from_gostdlib.RWMutex.RLock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotMu);
                    let snapshot: {
                        value: Snapshot;
                    } | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot;
                    let updateReason = new UpdateReason(0);
                    if (request.Projects.length > 0) {
                        updateReason = UpdateReasonRequestedLanguageServiceProjectDirty$constant();
                    }
                    else if (!(request.ProjectTree === undefined)) {
                        updateReason = UpdateReasonRequestedLoadProjectTree$constant();
                    }
                    else if (!(request.AutoImports.$value ===
                        ((void DocumentUri__from_lsproto,
                            "") as string))) {
                        updateReason = UpdateReasonRequestedLanguageServiceWithAutoImports$constant();
                    }
                    else {
                        const __gotots_range_22 = request.Documents;
                        for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_22.length; __gotots_range_index_14++) {
                            const __gotots_range_value_36 = new DocumentUri__from_lsproto(__gotots_range_22.get(__gotots_range_index_14));
                            let document = __gotots_range_value_36;
                            let project: {
                                value: Project;
                            } | undefined = Snapshot.GetDefaultProject(snapshot, document);
                            if (project === undefined) {
                                updateReason = UpdateReasonRequestedLanguageServiceProjectNotLoaded$constant();
                            }
                            else if ((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty) {
                                updateReason = UpdateReasonRequestedLanguageServiceProjectDirty$constant();
                            }
                        }
                        if (updateReason.$value === UpdateReasonUnknown$constant().$value) {
                            const __gotots_range_23 = request.ConfiguredProjectDocuments;
                            for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_23.length; __gotots_range_index_15++) {
                                const __gotots_range_value_37 = new DocumentUri__from_lsproto(__gotots_range_23.get(__gotots_range_index_15));
                                let document = __gotots_range_value_37;
                                if (SnapshotFS.$go$private$project$isOpenFile((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, document.FileName())) {
                                    let project: {
                                        value: Project;
                                    } | undefined = Snapshot.GetDefaultProject(snapshot, document);
                                    if (project === undefined) {
                                        updateReason = UpdateReasonRequestedLanguageServiceProjectNotLoaded$constant();
                                    }
                                    else if ((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty) {
                                        updateReason = UpdateReasonRequestedLanguageServiceProjectDirty$constant();
                                    }
                                }
                                else {
                                    updateReason = UpdateReasonRequestedLanguageServiceForFileNotOpen$constant();
                                }
                            }
                        }
                    }
                    if (updateReason.$value === UpdateReasonUnknown$constant().$value) {
                        if (callerRef) {
                            Snapshot.$go$private$project$ref(snapshot);
                        }
                        sync__from_gostdlib.RWMutex.RUnlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotMu);
                        __gotots_return_1 = snapshot;
                        break __gotots_return_block_2;
                    }
                    sync__from_gostdlib.RWMutex.RUnlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotMu);
                    __gotots_return_1 = Session.$go$private$project$updateSnapshot(s, ctx, overlays, new SnapshotChange(ResourceRequest.$copy(request), updateReason, FileChangeSummary.$zero(), void 0, void 0, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$ATAStateChange.nil(), void 0, false), callerRef);
                    break __gotots_return_block_2;
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_3 !== undefined) {
                const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_3(__gotots_recovery_3);
                    if (__gotots_recovery_3.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
        return __gotots_return_1;
    }
    static $go$private$project$getSnapshotAndDefaultProject(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, uri: DocumentUri__from_lsproto, callerRef: bool): [
        {
            value: Snapshot;
        } | undefined,
        {
            value: Project;
        } | undefined,
        LanguageService__from_ls | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let snapshot: {
            value: Snapshot;
        } | undefined = Session.$go$private$project$getSnapshot(s, ctx, new ResourceRequest(RuntimeSlice.literal<gostring>([uri.$value]), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), void 0, new DocumentUri__from_lsproto("")), callerRef);
        let project: {
            value: Project;
        } | undefined = Snapshot.GetDefaultProject(snapshot, uri);
        if (project === undefined) {
            return [void 0, void 0, void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("no project found for URI %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_lsproto$DocumentUri(uri)])))];
        }
        return [snapshot, project, NewLanguageService__from_ls((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath, Project.GetProgram(project), new $goInterfaceAdapter$PointerTo_Named_project$Snapshot(snapshot), uri.FileName()), void 0];
    }
    static $go$private$project$logCacheStats(s: {
        value: Session;
    } | undefined, snapshot: {
        value: Snapshot;
    } | undefined): void {
        let parseCacheSize = 0;
        let extendedConfigCount = 0;
        const __gotots_receiver_32: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
        if (goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_32).IsVerbose()) {
            const __gotots_store_4 = RefCountCache.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parseCache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
            SyncMap$Range$Named_project$ParseCacheKey$PointerTo_Named_project$refCountCacheEntryOf_PointerTo_Named_ast$SourceFile(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<ParseCacheKey, {
                value: refCountCacheEntry<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
            } | undefined>, SyncMap__from_collections<ParseCacheKey, {
                value: refCountCacheEntry<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
            } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "entries"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), ($0: ParseCacheKey, $1: {
                value: refCountCacheEntry<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
            } | undefined): bool => {
                parseCacheSize++;
                return true;
            });
            const __gotots_store_5 = OwnerCache.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfigCache ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
            SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$ownerCacheEntryOf_PointerTo_Named_project$ExtendedConfigCacheEntry(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<Path__from_tspath, {
                value: ownerCacheEntry<{
                    value: ExtendedConfigCacheEntry;
                } | undefined>;
            } | undefined>, SyncMap__from_collections<Path__from_tspath, {
                value: ownerCacheEntry<{
                    value: ExtendedConfigCacheEntry;
                } | undefined>;
            } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "entries"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), ($0: Path__from_tspath, $1: {
                value: ownerCacheEntry<{
                    value: ExtendedConfigCacheEntry;
                } | undefined>;
            } | undefined): bool => {
                extendedConfigCount++;
                return true;
            });
        }
        const __gotots_receiver_33: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
        const __gotots_argument_45 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("\n======== Cache Statistics ========")]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_33).Log(__gotots_argument_45);
        const __gotots_receiver_34: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
        const __gotots_argument_46 = "Open file count:   %6d";
        const __gotots_argument_47 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays.length())]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_34).Logf(__gotots_argument_46, __gotots_argument_47);
        const __gotots_receiver_35: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
        const __gotots_argument_48 = "Cached disk files: %6d";
        const __gotots_argument_49 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles.length())]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_35).Logf(__gotots_argument_48, __gotots_argument_49);
        const __gotots_receiver_36: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
        const __gotots_argument_50 = "Realpath aliases:  %6d";
        const __gotots_argument_51 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModulesRealpathAliases.length())]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_36).Logf(__gotots_argument_50, __gotots_argument_51);
        const __gotots_receiver_37: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
        const __gotots_argument_52 = "Project count:     %6d";
        const __gotots_argument_53 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(ProjectCollection.Projects((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection).length)]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_37).Logf(__gotots_argument_52, __gotots_argument_53);
        const __gotots_receiver_38: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
        const __gotots_argument_54 = "Config count:      %6d";
        const __gotots_argument_55 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFileRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs.length())]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_38).Logf(__gotots_argument_54, __gotots_argument_55);
        const __gotots_receiver_39: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
        if (goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_39).IsVerbose()) {
            const __gotots_receiver_40: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
            const __gotots_argument_56 = "Parse cache size:           %6d";
            const __gotots_argument_57 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(parseCacheSize)]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_40).Logf(__gotots_argument_56, __gotots_argument_57);
            const __gotots_receiver_41: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
            const __gotots_argument_58 = "Program count:              %6d";
            const __gotots_argument_59 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(programCounter.Len((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programCounter))]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_41).Logf(__gotots_argument_58, __gotots_argument_59);
            const __gotots_receiver_42: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
            const __gotots_argument_60 = "Extended config cache size: %6d";
            const __gotots_argument_61 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(extendedConfigCount)]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_42).Logf(__gotots_argument_60, __gotots_argument_61);
            const __gotots_receiver_43: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
            const __gotots_argument_62 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Auto Imports:")]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_43).Log(__gotots_argument_62);
            let autoImportStats: CacheStats__from_autoimport | undefined = Registry__from_autoimport.GetCacheStats(Snapshot.AutoImportRegistry(snapshot));
            const __gotots_receiver_44: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
            const __gotots_argument_63 = "\tUnique packages (by realpath): %d";
            const __gotots_argument_64 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int((autoImportStats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).UniquePackageCount)]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_44).Logf(__gotots_argument_63, __gotots_argument_64);
            if ((autoImportStats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectBuckets.length > 0) {
                const __gotots_receiver_45: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                const __gotots_argument_65 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("\tProject buckets:")]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_45).Log(__gotots_argument_65);
                const __gotots_range_6 = (autoImportStats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectBuckets;
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_6.length; __gotots_range_index_2++) {
                    const __gotots_range_value_14 = BucketStats__from_autoimport.$copy(BucketStats__from_autoimport.$fromStorage(__gotots_range_6.get(__gotots_range_index_2)));
                    let bucket = __gotots_range_value_14;
                    const __gotots_receiver_46: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                    const __gotots_argument_66 = "\t\t%s%s:";
                    const __gotots_argument_67 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(new Path__from_tspath(BucketStats__from_autoimport.$storageOf(bucket).Path)), new $goInterfaceAdapter$string(IfElse$string(BucketState__from_autoimport.$fromStorage(BucketStats__from_autoimport.$storageOf(bucket).State).Dirty(), " (dirty)", ""))]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_46).Logf(__gotots_argument_66, __gotots_argument_67);
                    const __gotots_receiver_47: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                    const __gotots_argument_68 = "\t\t\tFiles: %d";
                    const __gotots_argument_69 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(BucketStats__from_autoimport.$storageOf(bucket).FileCount)]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_47).Logf(__gotots_argument_68, __gotots_argument_69);
                    const __gotots_receiver_48: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                    const __gotots_argument_70 = "\t\t\tExports: %d";
                    const __gotots_argument_71 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(BucketStats__from_autoimport.$storageOf(bucket).ExportCount)]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_48).Logf(__gotots_argument_70, __gotots_argument_71);
                }
            }
            if ((autoImportStats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeModulesBuckets.length > 0) {
                const __gotots_receiver_49: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                const __gotots_argument_72 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("\tnode_modules buckets:")]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_49).Log(__gotots_argument_72);
                const __gotots_range_7 = (autoImportStats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeModulesBuckets;
                for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_7.length; __gotots_range_index_3++) {
                    const __gotots_range_value_15 = BucketStats__from_autoimport.$copy(BucketStats__from_autoimport.$fromStorage(__gotots_range_7.get(__gotots_range_index_3)));
                    let bucket = __gotots_range_value_15;
                    const __gotots_receiver_50: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                    const __gotots_argument_73 = "\t\t%s%s:";
                    const __gotots_argument_74 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_tspath$Path(new Path__from_tspath(BucketStats__from_autoimport.$storageOf(bucket).Path)), new $goInterfaceAdapter$string(IfElse$string(BucketState__from_autoimport.$fromStorage(BucketStats__from_autoimport.$storageOf(bucket).State).Dirty(), " (dirty)", ""))]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_50).Logf(__gotots_argument_73, __gotots_argument_74);
                    const __gotots_range_8 = Set$Keys$string(BucketState__from_autoimport.$fromStorage(BucketStats__from_autoimport.$storageOf(bucket).State).DirtyPackages());
                    const __gotots_range_keys_3 = __gotots_range_8.keys();
                    for (const __gotots_range_value_16 of __gotots_range_keys_3) {
                        const __gotots_range_value_17 = __gotots_range_8.lookupOk(__gotots_range_value_16);
                        if (!__gotots_range_value_17[1]) {
                            continue;
                        }
                        const __gotots_range_value_18 = __gotots_range_value_16;
                        let packageName = __gotots_range_value_18;
                        const __gotots_receiver_51: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_75 = "\t\t\tNeeds granular update: %s";
                        const __gotots_argument_76 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(packageName)]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_51).Logf(__gotots_argument_75, __gotots_argument_76);
                    }
                    if (!(BucketStats__from_autoimport.$storageOf(bucket).DependencyNames === undefined)) {
                        const __gotots_receiver_52: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_77 = "\t\t\tCollected packages: %d";
                        const __gotots_argument_78 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(Set$Len$string(BucketStats__from_autoimport.$storageOf(bucket).DependencyNames))]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_52).Logf(__gotots_argument_77, __gotots_argument_78);
                    }
                    else {
                        const __gotots_receiver_53: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_79 = "\t\t\tCollected packages: all, due to no package.json!";
                        const __gotots_argument_80 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_53).Logf(__gotots_argument_79, __gotots_argument_80);
                    }
                    const __gotots_receiver_54: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                    const __gotots_argument_81 = "\t\t\tTotal packages: %d";
                    const __gotots_argument_82 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(Set$Len$string(BucketStats__from_autoimport.$storageOf(bucket).PackageNames))]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_54).Logf(__gotots_argument_81, __gotots_argument_82);
                    const __gotots_receiver_55: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                    const __gotots_argument_83 = "\t\t\tFiles: %d";
                    const __gotots_argument_84 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(BucketStats__from_autoimport.$storageOf(bucket).FileCount)]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_55).Logf(__gotots_argument_83, __gotots_argument_84);
                    const __gotots_receiver_56: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                    const __gotots_argument_85 = "\t\t\tExports: %d";
                    const __gotots_argument_86 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(BucketStats__from_autoimport.$storageOf(bucket).ExportCount)]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_56).Logf(__gotots_argument_85, __gotots_argument_86);
                    if (BucketState__from_autoimport.$fromStorage(BucketStats__from_autoimport.$storageOf(bucket).State).RecursiveSearchPackages() === undefined) {
                        const __gotots_receiver_57: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_87 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("\t\t\tRecursive search: all")]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_57).Log(__gotots_argument_87);
                    }
                    else if (Set$Len$string(BucketState__from_autoimport.$fromStorage(BucketStats__from_autoimport.$storageOf(bucket).State).RecursiveSearchPackages()) > 0) {
                        const __gotots_receiver_58: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_88 = "\t\t\tRecursive search: %d packages";
                        const __gotots_argument_89 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(Set$Len$string(BucketState__from_autoimport.$fromStorage(BucketStats__from_autoimport.$storageOf(bucket).State).RecursiveSearchPackages()))]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_58).Logf(__gotots_argument_88, __gotots_argument_89);
                    }
                    else {
                        const __gotots_receiver_59: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_90 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("\t\t\tRecursive search: none")]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_59).Log(__gotots_argument_90);
                    }
                }
            }
        }
    }
    static $go$private$project$logProjectChanges(s: {
        value: Session;
    } | undefined, oldSnapshot: {
        value: Snapshot;
    } | undefined, newSnapshot: {
        value: Snapshot;
    } | undefined): void {
        let loggedProjectChanges = false;
        let logProject: (($0: {
            value: Project;
        } | undefined) => void) | undefined = (project: {
            value: Project;
        } | undefined): void => {
            let builder = named_strings.StringsBuilderOperations.$zero();
            const builder$location = tsonicTypeScriptRuntime.boundLocation({}, () => builder, builder$next => builder = builder$next);
            const __gotots_receiver_15 = project;
            const __gotots_receiver_13: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
            const __gotots_argument_18 = goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_13).IsVerbose();
            const __gotots_receiver_14: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
            const __gotots_argument_19 = goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_14).IsVerbose();
            const __gotots_argument_20 = builder$location;
            Project.$go$private$project$print(__gotots_receiver_15, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20);
            const __gotots_receiver_16: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
            const __gotots_argument_21 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(strings__from_gostdlib.Builder.String(builder))]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_16).Log(__gotots_argument_21);
            loggedProjectChanges = true;
        };
        DiffOrderedMaps$Named_tspath$Path$PointerTo_Named_project$Project(ProjectCollection.ProjectsByPath((oldSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection), ProjectCollection.ProjectsByPath((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection), (path: Path__from_tspath, addedProject: {
            value: Project;
        } | undefined): void => {
            const __gotots_callee_2 = logProject;
            const __gotots_argument_22 = addedProject;
            (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_22);
        }, (path: Path__from_tspath, removedProject: {
            value: Project;
        } | undefined): void => {
            const __gotots_receiver_17: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
            const __gotots_argument_23 = "\nProject '%s' removed\n%s";
            const __gotots_argument_24 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(Project.Name(removedProject)), new $goInterfaceAdapter$string(hr$string)]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_17).Logf(__gotots_argument_23, __gotots_argument_24);
        }, (path: Path__from_tspath, oldProject: {
            value: Project;
        } | undefined, newProject: {
            value: Project;
        } | undefined): void => {
            if ((newProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProgramUpdateKind.$value === ProgramUpdateKindNewFiles$constant().$value) {
                const __gotots_callee_3 = logProject;
                const __gotots_argument_25 = newProject;
                (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25);
            }
        });
        let __gotots_logical_result_0 = loggedProjectChanges;
        if (!__gotots_logical_result_0) {
            const __gotots_receiver_18: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
            __gotots_logical_result_0 = goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_18).IsVerbose();
        }
        if (__gotots_logical_result_0) {
            Session.$go$private$project$logCacheStats(s, newSnapshot);
        }
    }
    static $go$private$project$logRuntimeMetrics(s: {
        value: Session;
    } | undefined): void {
        const __gotots_callee_4 = $state.runtimeMetricsSamples;
        const __gotots_argument_26 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))();
        let samples = Clone$SliceOf_Named_metrics$Sample$Named_metrics$Sample(__gotots_argument_26);
        metrics.Read(samples);
        let builder = named_strings.StringsBuilderOperations.$zero();
        const builder$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => builder, builder$next2 => builder = builder$next2);
        strings__from_gostdlib.Builder.WriteString(builder, "\n======== Runtime Metrics ========");
        const __gotots_range_2 = samples;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_2.length; __gotots_range_index_1++) {
            const __gotots_range_value_4 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(__gotots_range_2.get(__gotots_range_index_1));
            let sample = __gotots_range_value_4;
            switch (named_runtime_metrics.RuntimeMetricsValueKindValueOperations.$project(sample.Value.Kind())) {
                case 1n: {
                    const __gotots_argument_27 = new $goInterfaceAdapter$PointerTo_Named_strings$Builder(builder$location2);
                    const __gotots_argument_28 = "\n%s = %d";
                    const __gotots_argument_29 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(sample.Name), new $goInterfaceAdapter$uint64(sample.Value.Uint64())]);
                    provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_27), __gotots_argument_28, __gotots_argument_29);
                    break;
                }
                case 2n: {
                    const __gotots_argument_30 = new $goInterfaceAdapter$PointerTo_Named_strings$Builder(builder$location2);
                    const __gotots_argument_31 = "\n%s = %f";
                    const __gotots_argument_32 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(sample.Name), new $goInterfaceAdapter$float64(sample.Value.Float64())]);
                    provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_30), __gotots_argument_31, __gotots_argument_32);
                    break;
                }
                case 3n: {
                    break;
                }
            }
        }
        const __gotots_receiver_19: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
        const __gotots_argument_33 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(strings__from_gostdlib.Builder.String(builder))]);
        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_19).Log(__gotots_argument_33);
    }
    static $go$private$project$publishGlobalDiagnostics(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined): void {
        let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_deferred_4: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_2: {
                    const __gotots_receiver_84: Session["globalDiagPublishPending"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalDiagPublishPending;
                    const __gotots_argument_132 = false;
                    __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncAtomicBoolStore(__gotots_receiver_84, __gotots_argument_132, $go$recovery);
                    };
                    sync__from_gostdlib.RWMutex.RLock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotMu);
                    let snapshot: {
                        value: Snapshot;
                    } | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot;
                    Snapshot.$go$private$project$ref(snapshot);
                    sync__from_gostdlib.RWMutex.RUnlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotMu);
                    const __gotots_receiver_85 = snapshot;
                    const __gotots_argument_133 = s;
                    __gotots_deferred_4 = ($go$recovery: GoRecovery): void => {
                        Snapshot.Deref(__gotots_receiver_85, __gotots_argument_133);
                    };
                    const __gotots_range_18 = ProjectCollection.Projects((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection);
                    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_18.length; __gotots_range_index_10++) {
                        const __gotots_range_value_32 = __gotots_range_18.get(__gotots_range_index_10);
                        let project: {
                            value: Project;
                        } | undefined = __gotots_range_value_32;
                        if (!((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === KindConfigured$constant().$value) || (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool === undefined) {
                            continue;
                        }
                        if (checkerPool.TakeNewGlobalDiagnostics((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool)) {
                            Session.$go$private$project$publishProjectDiagnostics(s, ctx, (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath.$value, Project.GetProjectDiagnostics(project, ctx), (snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.converters);
                        }
                    }
                }
            }
            catch (__gotots_caught_6) {
                if (!(__gotots_caught_6 instanceof GoPanic)) {
                    throw __gotots_caught_6;
                }
                __gotots_panic_2 = __gotots_caught_6;
            }
        }
        finally {
            if (__gotots_deferred_4 !== undefined) {
                const __gotots_recovery_4 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_4(__gotots_recovery_4);
                    if (__gotots_recovery_4.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_5) {
                    if (!(__gotots_caught_5 instanceof GoPanic)) {
                        throw __gotots_caught_5;
                    }
                    __gotots_panic_2 = __gotots_caught_5;
                }
            }
            if (__gotots_deferred_3 !== undefined) {
                const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_3(__gotots_recovery_3);
                    if (__gotots_recovery_3.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
    }
    static $go$private$project$publishProgramDiagnostics(s: {
        value: Session;
    } | undefined, oldSnapshot: {
        value: Snapshot;
    } | undefined, newSnapshot: {
        value: Snapshot;
    } | undefined): void {
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PushDiagnosticsEnabled) {
            return;
        }
        let ctx: GoInterface | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
        let oldProjects: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, {
            value: Project;
        } | undefined>> | undefined = ProjectCollection.ProjectsByPath((oldSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection);
        let newProjects: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, {
            value: Project;
        } | undefined>> | undefined = ProjectCollection.ProjectsByPath((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection);
        let oldOpenProjects: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = ProjectCollection.GetOpenConfiguredProjects((oldSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection);
        let newOpenProjects: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = ProjectCollection.GetOpenConfiguredProjects((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection);
        DiffOrderedMaps$Named_tspath$Path$PointerTo_Named_project$Project(oldProjects, newProjects, (configFilePath: Path__from_tspath, addedProject: {
            value: Project;
        } | undefined): void => {
            if (!shouldPublishProgramDiagnostics(addedProject, Snapshot.ID(newSnapshot)) || !Set__from_collections.Has<Path__from_tspath>(newOpenProjects, configFilePath)) {
                return;
            }
            Session.$go$private$project$publishProjectDiagnostics(s, ctx, configFilePath.$value, Project.GetProjectDiagnostics(addedProject, ctx), (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.converters);
        }, (configFilePath: Path__from_tspath, removedProject: {
            value: Project;
        } | undefined): void => {
            if (!((removedProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === KindConfigured$constant().$value)) {
                return;
            }
            Session.$go$private$project$publishProjectDiagnostics(s, ctx, configFilePath.$value, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), (oldSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.converters);
        }, (configFilePath: Path__from_tspath, oldProject: {
            value: Project;
        } | undefined, newProject: {
            value: Project;
        } | undefined): void => {
            if (!shouldPublishProgramDiagnostics(newProject, Snapshot.ID(newSnapshot)) || !Set__from_collections.Has<Path__from_tspath>(newOpenProjects, configFilePath)) {
                return;
            }
            Session.$go$private$project$publishProjectDiagnostics(s, ctx, configFilePath.$value, Project.GetProjectDiagnostics(newProject, ctx), (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.converters);
        });
        const __gotots_range_4 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$Named_tspath$Path$PointerTo_Named_project$Project(newProjects));
        if (__gotots_range_4 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        __gotots_range_4(($argument0: Path__from_tspath, $argument1: {
            value: Project;
        } | undefined): bool => {
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
            const __gotots_range_value_9 = $argument0;
            const __gotots_range_value_10 = $argument1;
            let configFilePath = __gotots_range_value_9;
            let newProject: {
                value: Project;
            } | undefined = __gotots_range_value_10;
            if (!((newProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === KindConfigured$constant().$value)) {
                __gotots_range_state_0 = 1;
                return true;
            }
            if (!OrderedMap__from_collections.Has<Path__from_tspath, {
                value: Project;
            } | undefined>(oldProjects, configFilePath)) {
                __gotots_range_state_0 = 1;
                return true;
            }
            const __gotots_results_6 = OrderedMap$Get$Named_tspath$Path$PointerTo_Named_project$Project(oldProjects, configFilePath);
            let oldProject: {
                value: Project;
            } | undefined = __gotots_results_6[0];
            let newHasOpenFiles = Set__from_collections.Has<Path__from_tspath>(newOpenProjects, configFilePath);
            let oldHasOpenFiles = Set__from_collections.Has<Path__from_tspath>(oldOpenProjects, configFilePath);
            if (newHasOpenFiles && !oldHasOpenFiles && (newProject
                ===
                    oldProject
                || !shouldPublishProgramDiagnostics(newProject, Snapshot.ID(newSnapshot)))) {
                Session.$go$private$project$publishProjectDiagnostics(s, ctx, configFilePath.$value, Project.GetProjectDiagnostics(newProject, ctx), (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.converters);
            }
            else if (!newHasOpenFiles && oldHasOpenFiles) {
                Session.$go$private$project$publishProjectDiagnostics(s, ctx, configFilePath.$value, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.converters);
            }
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        __gotots_range_state_0 = -2;
    }
    static $go$private$project$publishProjectDiagnostics(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, configFilePath: gostring, diagnostics__shadow_1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, converters: {
        value: Converters__from_lsconv;
    } | undefined): void {
        let lspDiagnostics = RuntimeSlice.make<{
            value: Diagnostic__from_lsproto;
        } | undefined>(0, diagnostics__shadow_1.length, void 0);
        const __gotots_range_15 = diagnostics__shadow_1;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_15.length; __gotots_range_index_7++) {
            const __gotots_range_value_29 = __gotots_range_15.get(__gotots_range_index_7);
            let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_29;
            lspDiagnostics = lspDiagnostics.append(void 0, [DiagnosticToLSPPush__from_lsconv(ctx, converters, diag)]);
        }
        {
            const __gotots_receiver_70: Session["client"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client;
            const __gotots_argument_108 = ctx;
            const __gotots_argument_109 = tsonicTypeScriptRuntime.location<PublishDiagnosticsParams__from_lsproto>(new PublishDiagnosticsParams__from_lsproto(FileNameToDocumentURI__from_lsconv(configFilePath), void 0, lspDiagnostics));
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<Client>(__gotots_receiver_70).PublishDiagnostics(__gotots_argument_108, __gotots_argument_109);
            if (!(err === undefined) && ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                const __gotots_receiver_71: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                const __gotots_argument_110 = "Error publishing diagnostics: %v";
                const __gotots_argument_111 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_71).Logf(__gotots_argument_110, __gotots_argument_111);
            }
        }
    }
    static $go$private$project$refreshATAIfNeeded(s: {
        value: Session;
    } | undefined, oldPrefs: UserPreferences__from_lsutil, newPrefs: UserPreferences__from_lsutil): void {
        if (oldPrefs.IsATADisabled() && !newPrefs.IsATADisabled()) {
            Session.ScheduleDiagnosticsRefresh(s);
        }
    }
    static $go$private$project$refreshCodeLensIfNeeded(s: {
        value: Session;
    } | undefined, oldPrefs: UserPreferences__from_lsutil, newPrefs: UserPreferences__from_lsutil): void {
        if (!CodeLensUserPreferences__from_lsutil.$equal(oldPrefs.CodeLens, newPrefs.CodeLens)) {
            {
                const __gotots_receiver_91: Session["client"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client;
                const __gotots_argument_154: Session["backgroundCtx"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<Client>(__gotots_receiver_91).RefreshCodeLens(__gotots_argument_154);
                if (!(err === undefined) && ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                    const __gotots_receiver_92: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                    const __gotots_argument_155 = "Error refreshing code lens: %v";
                    const __gotots_argument_156 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_92).Logf(__gotots_argument_155, __gotots_argument_156);
                }
            }
        }
    }
    static $go$private$project$refreshDiagnosticsIfNeeded(s: {
        value: Session;
    } | undefined, oldPrefs: UserPreferences__from_lsutil, newPrefs: UserPreferences__from_lsutil): void {
        if (oldPrefs.CustomConfigFileName !== newPrefs.CustomConfigFileName) {
            Session.ScheduleDiagnosticsRefresh(s);
        }
    }
    static $go$private$project$refreshInlayHintsIfNeeded(s: {
        value: Session;
    } | undefined, oldPrefs: UserPreferences__from_lsutil, newPrefs: UserPreferences__from_lsutil): void {
        if (!InlayHintsPreferences__from_lsutil.$equal(oldPrefs.InlayHints, newPrefs.InlayHints)) {
            {
                const __gotots_receiver_89: Session["client"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client;
                const __gotots_argument_151: Session["backgroundCtx"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<Client>(__gotots_receiver_89).RefreshInlayHints(__gotots_argument_151);
                if (!(err === undefined) && ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                    const __gotots_receiver_90: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                    const __gotots_argument_152 = "Error refreshing inlay hints: %v";
                    const __gotots_argument_153 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_90).Logf(__gotots_argument_152, __gotots_argument_153);
                }
            }
        }
    }
    static $go$private$project$scheduleIdleCacheClean(s: {
        value: Session;
    } | undefined): void {
        let __gotots_deferred_3: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_2: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idleCacheCleanMu);
                    const __gotots_receiver_84: Session["idleCacheCleanMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idleCacheCleanMu;
                    __gotots_deferred_3 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_84, $go$recovery);
                    };
                    if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idleCacheCleanTimer === undefined)) {
                        const __gotots_receiver_85: Session["idleCacheCleanTimer"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idleCacheCleanTimer;
                        time__from_gostdlib.Timer.Stop(__gotots_receiver_85 === void 0 ? void 0 :
                            (__gotots_receiver_85 as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Timer>).value);
                    }
                    const __gotots_conversion_4 = time__from_gostdlib.AfterFunc(idleCacheCleanDelay$constant(), (): void => {
                        let __gotots_deferred_4: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                        let __gotots_panic_3: GoPanic | undefined = undefined;
                        try {
                            try {
                                __gotots_return_block_3: {
                                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idleCacheCleanMu);
                                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idleCacheCleanTimer = void 0;
                                    sync__from_gostdlib.Mutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idleCacheCleanMu);
                                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotUpdateMu);
                                    const __gotots_receiver_86: Session["snapshotUpdateMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotUpdateMu;
                                    __gotots_deferred_4 = ($go$recovery: GoRecovery): void => {
                                        recovery_sync.SyncMutexUnlock(__gotots_receiver_86, $go$recovery);
                                    };
                                    Session.$go$private$project$cancelScheduledSnapshotUpdate(s);
                                    let ctx: GoInterface | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
                                    const __gotots_results_25 = Session.$go$private$project$flushChanges(s, ctx);
                                    let fileChanges = __gotots_results_25[0];
                                    let overlays: GoMapValue<Path__from_tspath, {
                                        value: Overlay;
                                    } | undefined> = __gotots_results_25[1];
                                    let ataChanges: GoMapValue<Path__from_tspath, ATAStateChange | undefined> = __gotots_results_25[2];
                                    let newConfig: tsonicTypeScriptRuntime.Location<UserPreferences__from_lsutil> | undefined = __gotots_results_25[3];
                                    Session.UpdateSnapshot(s, ctx, overlays, new SnapshotChange(ResourceRequest.$zero(), UpdateReasonIdleCleanDiskCache$constant(), FileChangeSummary.$copy(fileChanges), void 0, newConfig, ataChanges, void 0, true));
                                    ((): void => {
                                        runtime__from_gostdlib.GC();
                                    })();
                                }
                            }
                            catch (__gotots_caught_7) {
                                if (!(__gotots_caught_7 instanceof GoPanic)) {
                                    throw __gotots_caught_7;
                                }
                                __gotots_panic_3 = __gotots_caught_7;
                            }
                        }
                        finally {
                            if (__gotots_deferred_4 !== undefined) {
                                const __gotots_recovery_4 = new GoRecovery(__gotots_panic_3);
                                try {
                                    __gotots_deferred_4(__gotots_recovery_4);
                                    if (__gotots_recovery_4.recovered()) {
                                        __gotots_panic_3 = undefined;
                                    }
                                }
                                catch (__gotots_caught_6) {
                                    if (!(__gotots_caught_6 instanceof GoPanic)) {
                                        throw __gotots_caught_6;
                                    }
                                    __gotots_panic_3 = __gotots_caught_6;
                                }
                            }
                        }
                        if (__gotots_panic_3 !== undefined) {
                            throw __gotots_panic_3;
                        }
                    });
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idleCacheCleanTimer = __gotots_conversion_4 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<time__from_gostdlib.Timer>(__gotots_conversion_4, (): time__from_gostdlib.Timer => {
                            return __gotots_conversion_4;
                        }, ($go$providerPointerValue: time__from_gostdlib.Timer): void => {
                            named_time.TimeTimerOperations.$assign(__gotots_conversion_4, $go$providerPointerValue);
                        });
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_3 !== undefined) {
                const __gotots_recovery_3 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_3(__gotots_recovery_3);
                    if (__gotots_recovery_3.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
    }
    static $go$private$project$sendPerformanceTelemetry(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined): void {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client === undefined || !((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TelemetryEnabled) {
            return;
        }
        sync__from_gostdlib.RWMutex.RLock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotMu);
        let snapshot: {
            value: Snapshot;
        } | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot;
        sync__from_gostdlib.RWMutex.RUnlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotMu);
        const sMemoryUsedBytes$int: int = 0;
        const sGoMemLimit$int: int = 1;
        const sGoGCPercent$int: int = 2;
        const sHeapGoalBytes$int: int = 3;
        const sHeapLiveBytes$int: int = 4;
        const sHeapObjectCount$int: int = 5;
        const sHeapStackBytes$int: int = 6;
        const sHeapReleasedBytes$int: int = 7;
        const sHeapFreeBytes$int: int = 8;
        const sGcScanHeapBytes$int: int = 9;
        const sGoMaxProcs$int: int = 10;
        const sGoroutineCount$int: int = 11;
        const sGcCyclesTotal$int: int = 12;
        const sGcCPUSeconds$int: int = 13;
        const sUserCPUSeconds$int: int = 14;
        const sMetricCount$int: int = 15;
        const __gotots_slice_build_28 = goSliceAllocate<metrics.Sample>(sMetricCount$int, null);
        for (let __gotots_slice_build_29 = 0; __gotots_slice_build_29 < __gotots_slice_build_28.capacity; __gotots_slice_build_29++) {
            __gotots_slice_build_28.$initialize(__gotots_slice_build_29, named_runtime_metrics.RuntimeMetricsSampleOperations.$zero());
        }
        let samples = __gotots_slice_build_28;
        samples.get(sMemoryUsedBytes$int).Name = "/memory/classes/total:bytes";
        samples.get(sGoMemLimit$int).Name = "/gc/gomemlimit:bytes";
        samples.get(sGoGCPercent$int).Name = "/gc/gogc:percent";
        samples.get(sHeapGoalBytes$int).Name = "/gc/heap/goal:bytes";
        samples.get(sHeapLiveBytes$int).Name = "/gc/heap/live:bytes";
        samples.get(sHeapObjectCount$int).Name = "/gc/heap/objects:objects";
        samples.get(sHeapStackBytes$int).Name = "/memory/classes/heap/stacks:bytes";
        samples.get(sHeapReleasedBytes$int).Name = "/memory/classes/heap/released:bytes";
        samples.get(sHeapFreeBytes$int).Name = "/memory/classes/heap/free:bytes";
        samples.get(sGcScanHeapBytes$int).Name = "/gc/scan/heap:bytes";
        samples.get(sGoMaxProcs$int).Name = "/sched/gomaxprocs:threads";
        samples.get(sGoroutineCount$int).Name = "/sched/goroutines:goroutines";
        samples.get(sGcCyclesTotal$int).Name = "/gc/cycles/total:gc-cycles";
        samples.get(sGcCPUSeconds$int).Name = "/cpu/classes/gc/total:cpu-seconds";
        samples.get(sUserCPUSeconds$int).Name = "/cpu/classes/user:cpu-seconds";
        metrics.Read(samples);
        let measurements: {
            value: PerformanceStatsTelemetryMeasurements__from_lsproto;
        } | undefined = { value: new PerformanceStatsTelemetryMeasurements__from_lsproto(((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays.length(), time__from_gostdlib.Since(named_time.TimeOperations.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.startTime)).Seconds(), ProjectCollection.Projects((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection).length, ((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFileRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs.length(), ((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles.length(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) };
        let readUint64: (($0: metrics.Sample) => float64) | undefined = (s__shadow_1: metrics.Sample): float64 => {
            if (named_runtime_metrics.RuntimeMetricsValueKindValueOperations.$project(s__shadow_1.Value.Kind()) === named_runtime_metrics.RuntimeMetricsValueKindValueOperations.$project(metrics.KindUint64)) {
                return globalThis.Number(s__shadow_1.Value.Uint64());
            }
            return 0;
        };
        let readFloat64: (($0: metrics.Sample) => float64) | undefined = (s__shadow_1: metrics.Sample): float64 => {
            if (named_runtime_metrics.RuntimeMetricsValueKindValueOperations.$project(s__shadow_1.Value.Kind()) === named_runtime_metrics.RuntimeMetricsValueKindValueOperations.$project(metrics.KindFloat64)) {
                return s__shadow_1.Value.Float64();
            }
            return 0;
        };
        const __gotots_callee_21 = readUint64;
        const __gotots_argument_132 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sMemoryUsedBytes$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MemoryUsedBytes = (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_132);
        if (named_runtime_metrics.RuntimeMetricsValueKindValueOperations.$project(samples.get(sGoMemLimit$int).Value.Kind()) === named_runtime_metrics.RuntimeMetricsValueKindValueOperations.$project(metrics.KindUint64)) {
            let v = samples.get(sGoMemLimit$int).Value.Uint64();
            if (v < 9223372036854775807n) {
                (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoMemLimit = globalThis.Number(v);
            }
        }
        const __gotots_callee_22 = readUint64;
        const __gotots_argument_133 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sGoGCPercent$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoGCPercent = (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_133);
        const __gotots_callee_23 = readUint64;
        const __gotots_argument_134 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sHeapGoalBytes$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.HeapGoalBytes = (__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_134);
        const __gotots_callee_24 = readUint64;
        const __gotots_argument_135 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sHeapLiveBytes$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.HeapLiveBytes = (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_135);
        const __gotots_callee_25 = readUint64;
        const __gotots_argument_136 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sHeapObjectCount$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.HeapObjectCount = (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_136);
        const __gotots_callee_26 = readUint64;
        const __gotots_argument_137 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sHeapStackBytes$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.HeapStackBytes = (__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_137);
        const __gotots_callee_27 = readUint64;
        const __gotots_argument_138 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sHeapReleasedBytes$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.HeapReleasedBytes = (__gotots_callee_27 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_138);
        const __gotots_callee_28 = readUint64;
        const __gotots_argument_139 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sHeapFreeBytes$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.HeapFreeBytes = (__gotots_callee_28 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_139);
        const __gotots_callee_29 = readUint64;
        const __gotots_argument_140 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sGcScanHeapBytes$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GcScanHeapBytes = (__gotots_callee_29 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_140);
        const __gotots_callee_30 = readUint64;
        const __gotots_argument_141 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sGoMaxProcs$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoMaxProcs = (__gotots_callee_30 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_141);
        const __gotots_callee_31 = readUint64;
        const __gotots_argument_142 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sGoroutineCount$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GoroutineCount = (__gotots_callee_31 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_142);
        const __gotots_callee_32 = readUint64;
        const __gotots_argument_143 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sGcCyclesTotal$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GcCyclesTotal = (__gotots_callee_32 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_143);
        const __gotots_callee_33 = readFloat64;
        const __gotots_argument_144 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sGcCPUSeconds$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GcCPUSeconds = (__gotots_callee_33 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_144);
        const __gotots_callee_34 = readFloat64;
        const __gotots_argument_145 = named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(samples.get(sUserCPUSeconds$int));
        (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UserCPUSeconds = (__gotots_callee_34 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_145);
        {
            const __gotots_results_26 = Get__from_memory();
            let sysMem: Stats__from_memory | undefined = __gotots_results_26[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_26[1];
            if (err === undefined) {
                (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SystemMemTotal = globalThis.Number((sysMem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Total);
                (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SystemMemUsed = globalThis.Number((sysMem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Used);
            }
        }
        {
            let registry: {
                value: Registry__from_autoimport;
            } | undefined = Snapshot.AutoImportRegistry(snapshot);
            if (!(registry === undefined)) {
                let autoImportStats: CacheStats__from_autoimport | undefined = Registry__from_autoimport.GetCacheStats(registry);
                (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportProjectBucketCount = (autoImportStats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectBuckets.length;
                (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportNodeModulesBucketCount = (autoImportStats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeModulesBuckets.length;
                (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImportUniquePackageCount = (autoImportStats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).UniquePackageCount;
                const __gotots_range_19 = (autoImportStats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectBuckets;
                for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_19.length; __gotots_range_index_11++) {
                    const __gotots_range_value_33 = BucketStats__from_autoimport.$copy(BucketStats__from_autoimport.$fromStorage(__gotots_range_19.get(__gotots_range_index_11)));
                    let b = __gotots_range_value_33;
                    const __gotots_store_21 = (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_store_21.AutoImportProjectExportCount = __gotots_store_21.AutoImportProjectExportCount + BucketStats__from_autoimport.$storageOf(b).ExportCount;
                    const __gotots_store_22 = (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_store_22.AutoImportProjectFileCount = __gotots_store_22.AutoImportProjectFileCount + BucketStats__from_autoimport.$storageOf(b).FileCount;
                }
                const __gotots_range_20 = (autoImportStats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeModulesBuckets;
                for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_20.length; __gotots_range_index_12++) {
                    const __gotots_range_value_34 = BucketStats__from_autoimport.$copy(BucketStats__from_autoimport.$fromStorage(__gotots_range_20.get(__gotots_range_index_12)));
                    let b = __gotots_range_value_34;
                    const __gotots_store_23 = (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_store_23.AutoImportNodeModulesExportCount = __gotots_store_23.AutoImportNodeModulesExportCount + BucketStats__from_autoimport.$storageOf(b).ExportCount;
                    const __gotots_store_24 = (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_store_24.AutoImportNodeModulesFileCount = __gotots_store_24.AutoImportNodeModulesFileCount + BucketStats__from_autoimport.$storageOf(b).FileCount;
                    if (BucketStats__from_autoimport.$storageOf(b).DependencyNames === undefined) {
                        const __gotots_store_25 = (measurements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_25.AutoImportNodeModulesUnfilteredBucketCount = __gotots_store_25.AutoImportNodeModulesUnfilteredBucketCount + 1;
                    }
                }
            }
        }
        {
            const __gotots_receiver_85: Session["client"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client;
            const __gotots_argument_146 = ctx;
            const __gotots_argument_147 = RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto.$fromStorage({
                PerformanceStatsTelemetryEvent: { value: new PerformanceStatsTelemetryEvent__from_lsproto(StringLiteralLanguageServerPerformanceStats__from_lsproto.$zero(), StringLiteralUsage__from_lsproto.$zero(), measurements) },
                RequestFailureTelemetryEvent: void 0,
                ProjectInfoTelemetryEvent: void 0
            });
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<Client>(__gotots_receiver_85).SendTelemetry(__gotots_argument_146, __gotots_argument_147);
            if (!(err === undefined) && ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                const __gotots_receiver_86: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                const __gotots_argument_148 = "Error sending performance telemetry: %v";
                const __gotots_argument_149 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_86).Logf(__gotots_argument_148, __gotots_argument_149);
            }
        }
    }
    static $go$private$project$sendProjectInfoTelemetry(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, project: {
        value: Project;
    } | undefined): void {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client === undefined || !((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TelemetryEnabled) {
            return;
        }
        const __gotots_store_6 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        if (SyncSet$Has$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "seenProjects"), (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath)) {
            return;
        }
        if ((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program === undefined || (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine === undefined) {
            return;
        }
        let info = Session.$go$private$project$collectProjectInfoTelemetry(s, project);
        {
            const __gotots_receiver_72: Session["client"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client;
            const __gotots_argument_112 = ctx;
            const __gotots_argument_113 = RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto.$copy(info);
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<Client>(__gotots_receiver_72).SendTelemetry(__gotots_argument_112, __gotots_argument_113);
            if (!(err === undefined)) {
                if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                    const __gotots_receiver_73: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                    const __gotots_argument_114 = "Error sending project info telemetry: %v";
                    const __gotots_argument_115 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_73).Logf(__gotots_argument_114, __gotots_argument_115);
                }
                return;
            }
        }
        const __gotots_store_7 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncSet$Add$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "seenProjects"), (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath);
    }
    static $go$private$project$sendProjectInfoTelemetryForNewProjects(s: {
        value: Session;
    } | undefined, oldSnapshot: {
        value: Snapshot;
    } | undefined, newSnapshot: {
        value: Snapshot;
    } | undefined): void {
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TelemetryEnabled) {
            return;
        }
        let ctx: GoInterface | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
        DiffOrderedMaps$Named_tspath$Path$PointerTo_Named_project$Project(ProjectCollection.ProjectsByPath((oldSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection), ProjectCollection.ProjectsByPath((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection), ($0: Path__from_tspath, addedProject: {
            value: Project;
        } | undefined): void => {
            Session.$go$private$project$sendProjectInfoTelemetry(s, ctx, addedProject);
        }, ($0: Path__from_tspath, $1: {
            value: Project;
        } | undefined): void => {
        }, ($0: Path__from_tspath, $1: {
            value: Project;
        } | undefined, $2: {
            value: Project;
        } | undefined): void => {
        });
    }
    static $go$private$project$stopPerformanceTelemetry(s: {
        value: Session;
    } | undefined): void {
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.performanceTelemetryCancel === undefined)) {
            const __gotots_callee_36: Session["performanceTelemetryCancel"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.performanceTelemetryCancel;
            (__gotots_callee_36 ?? GoPanic.raiseRuntime("call of nil function"))();
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.performanceTelemetryCancel = void 0;
        }
    }
    static $go$private$project$triggerATAForUpdatedProjects(s: {
        value: Session;
    } | undefined, newSnapshot: {
        value: Snapshot;
    } | undefined): void {
        const __gotots_range_1 = ProjectCollection.Projects((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection);
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
            const __gotots_range_value_3 = __gotots_range_1.get(__gotots_range_index_0);
            let project: {
                value: Project;
            } | undefined = __gotots_range_value_3;
            if (Project.ShouldTriggerATA(project, Snapshot.ID(newSnapshot))) {
                Queue__from_background.Enqueue((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundQueue, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx, (ctx: GoInterface | undefined): void => {
                    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
                    let __gotots_panic_0: GoPanic | undefined = undefined;
                    try {
                        try {
                            __gotots_return_block_0: {
                                let logTree: {
                                    value: LogTree__from_logging;
                                } | undefined = void 0;
                                if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                                    logTree = NewLogTree__from_logging("Triggering ATA for project " + Project.Name(project));
                                }
                                let typingsInfo = Project.ComputeTypingsInfo(project);
                                const typingsInfo$location = tsonicTypeScriptRuntime.boundLocation({}, () => typingsInfo, typingsInfo$next => typingsInfo = typingsInfo$next);
                                let request: TypingsInstallRequest__from_ata | undefined = new TypingsInstallRequest__from_ata((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath, typingsInfo$location, Map$PointerTo_Named_ast$SourceFile$string(Program__from_compiler.GetSourceFiles((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program), (file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): gostring => {
                                    return SourceFile__from_ast.FileName(file);
                                }), (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory, ParsedCommandLine__from_tsoptions.CompilerOptions((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CommandLine), ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory, GetScriptKindFromFileName__from_core, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, new $goInterfaceAdapter$PointerTo_Named_logging$LogTree(logTree));
                                let projectDisplayName = Project.DisplayName(project, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory);
                                if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client === undefined)) {
                                    const __gotots_receiver_9: Session["client"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client;
                                    const __gotots_argument_12 = $state__diagnostics.Installing_types_for_0;
                                    const __gotots_argument_13 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(projectDisplayName)]);
                                    goInterfaceNonNil<Client>(__gotots_receiver_9).ProgressStart(__gotots_argument_12, __gotots_argument_13);
                                }
                                const __gotots_results_4 = TypingsInstaller__from_ata.InstallTypings((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsInstaller, request);
                                let result: TypingsInstallResult__from_ata | undefined = __gotots_results_4[0];
                                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_4[1];
                                if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client === undefined)) {
                                    const __gotots_receiver_10: Session["client"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client;
                                    const __gotots_argument_14 = $state__diagnostics.Installing_types_for_0;
                                    const __gotots_argument_15 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(projectDisplayName)]);
                                    goInterfaceNonNil<Client>(__gotots_receiver_10).ProgressFinish(__gotots_argument_14, __gotots_argument_15);
                                }
                                if (!(err === undefined)) {
                                    if (!(logTree === undefined)) {
                                        const __gotots_receiver_11: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                                        const __gotots_argument_16 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("ATA installation failed for project %s: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(Project.Name(project)), err])))]);
                                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_11).Log(__gotots_argument_16);
                                        const __gotots_receiver_12: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                                        const __gotots_argument_17 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(LogTree__from_logging.String(logTree))]);
                                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_12).Log(__gotots_argument_17);
                                    }
                                }
                                else {
                                    if (!Equal$SliceOf_string$string((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypingsFiles, (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsFiles)) {
                                        sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingATAChangesMu);
                                        const __gotots_receiver_13: Session["pendingATAChangesMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingATAChangesMu;
                                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                            recovery_sync.SyncMutexUnlock(__gotots_receiver_13, $go$recovery);
                                        });
                                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingATAChanges.store((project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath, new ATAStateChange(new Path__from_tspath(""), typingsInfo$location, (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypingsFiles, (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FilesToWatch, logTree));
                                        Session.ScheduleDiagnosticsRefresh(s);
                                    }
                                }
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
                });
            }
        }
    }
    static $go$private$project$updateSnapshot(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, overlays: GoMapValue<Path__from_tspath, {
        value: Overlay;
    } | undefined>, change: SnapshotChange, callerRef: bool): {
        value: Snapshot;
    } | undefined {
        sync__from_gostdlib.RWMutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotMu);
        let oldSnapshot: {
            value: Snapshot;
        } | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot;
        let newSnapshot: {
            value: Snapshot;
        } | undefined = Snapshot.Clone(oldSnapshot, ctx, SnapshotChange.$copy(change), overlays, s);
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot = newSnapshot;
        if (callerRef) {
            Snapshot.$go$private$project$ref(newSnapshot);
        }
        if (!(newSnapshot
            ===
                oldSnapshot)) {
            Snapshot.Deref(oldSnapshot, s);
        }
        sync__from_gostdlib.RWMutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshotMu);
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsInstaller === undefined) && !Session.Config(s).IsATADisabled()) {
            Session.$go$private$project$triggerATAForUpdatedProjects(s, newSnapshot);
        }
        Queue__from_background.Enqueue((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundQueue, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx, (ctx__shadow_1: GoInterface | undefined): void => {
            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                const __gotots_receiver_5: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                const __gotots_argument_7 = "Adopted snapshot %d (parent %d) as current session snapshot (replacing %d)";
                const __gotots_argument_8 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$uint64((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id), new $goInterfaceAdapter$uint64((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parentId), new $goInterfaceAdapter$uint64((oldSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.id)]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_5).Logf(__gotots_argument_7, __gotots_argument_8);
                const __gotots_receiver_6: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                const __gotots_argument_9 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(LogTree__from_logging.String((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builderLogs))]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_6).Log(__gotots_argument_9);
                Session.$go$private$project$logProjectChanges(s, oldSnapshot, newSnapshot);
                Session.$go$private$project$logRuntimeMetrics(s);
                const __gotots_receiver_7: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                const __gotots_argument_10 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("")]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_7).Log(__gotots_argument_10);
            }
            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.WatchEnabled) {
                {
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Session.$go$private$project$updateWatches(s, oldSnapshot, newSnapshot);
                    if (!(err === undefined) && ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
                        const __gotots_receiver_8: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                        const __gotots_argument_11 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_8).Log(__gotots_argument_11);
                    }
                }
            }
            Session.$go$private$project$publishProgramDiagnostics(s, oldSnapshot, newSnapshot);
            Session.$go$private$project$sendProjectInfoTelemetryForNewProjects(s, oldSnapshot, newSnapshot);
            Session.$go$private$project$warmAutoImportCache(s, ctx__shadow_1, SnapshotChange.$copy(change), oldSnapshot, newSnapshot);
        });
        return newSnapshot;
    }
    static $go$private$project$updateSnapshotRef(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, overlays: GoMapValue<Path__from_tspath, {
        value: Overlay;
    } | undefined>, change: SnapshotChange): {
        value: Snapshot;
    } | undefined {
        return Session.$go$private$project$updateSnapshot(s, ctx, overlays, SnapshotChange.$copy(change), true);
    }
    static $go$private$project$updateWatches(s: {
        value: Session;
    } | undefined, oldSnapshot: {
        value: Snapshot;
    } | undefined, newSnapshot: {
        value: Snapshot;
    } | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let errors = RuntimeSlice.nil<$goInterface$Interface_Method_Error_void_to_string | undefined>();
        let start = time__from_gostdlib.Now();
        let ctx: GoInterface | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
        DiffMapsFunc$Named_tspath$Path$PointerTo_Named_project$configFileEntry$PointerTo_Named_project$configFileEntry(((oldSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFileRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, ((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFileRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs, (a: {
            value: configFileEntry;
        } | undefined, b: {
            value: configFileEntry;
        } | undefined): bool => {
            return WatchedFiles$ID$Named_project$PatternsAndIgnored((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch).$value === WatchedFiles$ID$Named_project$PatternsAndIgnored((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch).$value;
        }, ($0: Path__from_tspath, addedEntry: {
            value: configFileEntry;
        } | undefined): void => {
            errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$Named_project$PatternsAndIgnored(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, void 0, (addedEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch), void 0);
        }, ($0: Path__from_tspath, removedEntry: {
            value: configFileEntry;
        } | undefined): void => {
            errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$Named_project$PatternsAndIgnored(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, (removedEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch, void 0), void 0);
        }, ($0: Path__from_tspath, oldEntry: {
            value: configFileEntry;
        } | undefined, newEntry: {
            value: configFileEntry;
        } | undefined): void => {
            errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$Named_project$PatternsAndIgnored(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, (oldEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch, (newEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch), void 0);
        });
        const __gotots_range_3: ConfigFileRegistry["configs"] = ((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFileRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs;
        const __gotots_range_keys_1 = __gotots_range_3.keys();
        for (const __gotots_range_value_5 of __gotots_range_keys_1) {
            const __gotots_range_value_6 = __gotots_range_3.lookupOk(__gotots_range_value_5);
            if (!__gotots_range_value_6[1]) {
                continue;
            }
            const __gotots_range_value_7 = __gotots_range_value_5;
            const __gotots_range_value_8 = __gotots_range_value_6[0];
            let path = __gotots_range_value_7;
            let newEntry: {
                value: configFileEntry;
            } | undefined = __gotots_range_value_8;
            {
                const __gotots_results_5 = ((oldSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFileRegistry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configs.lookupOk(path);
                let oldEntry: {
                    value: configFileEntry;
                } | undefined = __gotots_results_5[0];
                let ok = __gotots_results_5[1];
                if (ok) {
                    if (WatchedFiles$ID$Named_project$PatternsAndIgnored((oldEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch).$value === WatchedFiles$ID$Named_project$PatternsAndIgnored((newEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch).$value) {
                        if (watchRegistry.IsPending((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches, WatchedFiles$ID$Named_project$PatternsAndIgnored((newEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch))) {
                            errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$Named_project$PatternsAndIgnored(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, void 0, (newEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.rootFilesWatch), void 0);
                        }
                    }
                }
            }
        }
        DiffOrderedMaps$Named_tspath$Path$PointerTo_Named_project$Project(ProjectCollection.ProjectsByPath((oldSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection), ProjectCollection.ProjectsByPath((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection), ($0: Path__from_tspath, addedProject: {
            value: Project;
        } | undefined): void => {
            errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, void 0, (addedProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programFilesWatch), void 0);
            errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$Named_project$PatternsAndIgnored(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, void 0, (addedProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsWatch), void 0);
        }, ($0: Path__from_tspath, removedProject: {
            value: Project;
        } | undefined): void => {
            errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, (removedProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programFilesWatch, void 0), void 0);
            errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$Named_project$PatternsAndIgnored(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, (removedProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsWatch, void 0), void 0);
        }, ($0: Path__from_tspath, oldProject: {
            value: Project;
        } | undefined, newProject: {
            value: Project;
        } | undefined): void => {
            if (!(WatchedFiles$ID$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path((oldProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programFilesWatch).$value === WatchedFiles$ID$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path((newProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programFilesWatch).$value)) {
                errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, (oldProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programFilesWatch, (newProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programFilesWatch), void 0);
            }
            else {
                if (watchRegistry.IsPending((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches, WatchedFiles$ID$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path((newProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programFilesWatch))) {
                    errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, void 0, (newProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programFilesWatch), void 0);
                }
            }
            if (!(WatchedFiles$ID$Named_project$PatternsAndIgnored((oldProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsWatch).$value === WatchedFiles$ID$Named_project$PatternsAndIgnored((newProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsWatch).$value)) {
                errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$Named_project$PatternsAndIgnored(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, (oldProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsWatch, (newProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsWatch), void 0);
            }
            else {
                if (watchRegistry.IsPending((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches, WatchedFiles$ID$Named_project$PatternsAndIgnored((newProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsWatch))) {
                    errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$Named_project$PatternsAndIgnored(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, void 0, (newProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsWatch), void 0);
                }
            }
        });
        if (!(WatchedFiles$ID$MapOf_Named_tspath$Path_To_string((oldSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoImportsWatch).$value === WatchedFiles$ID$MapOf_Named_tspath$Path_To_string((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoImportsWatch).$value)) {
            errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$MapOf_Named_tspath$Path_To_string(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, (oldSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoImportsWatch, (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoImportsWatch), void 0);
        }
        else {
            if (watchRegistry.IsPending((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches, WatchedFiles$ID$MapOf_Named_tspath$Path_To_string((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoImportsWatch))) {
                errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, updateWatch$MapOf_Named_tspath$Path_To_string(ctx, s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, void 0, (newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.autoImportsWatch), void 0);
            }
        }
        if (errors.length > 0) {
            return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("errors updating watches: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$SliceOf_Named_error(errors)])));
        }
        else if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LoggingEnabled) {
            const __gotots_receiver_20: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
            const __gotots_argument_34 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Updated watches in %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_time$Duration(time__from_gostdlib.Since(named_time.TimeOperations.$copy(start)))])))]);
            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_20).Log(__gotots_argument_34);
        }
        return void 0;
    }
    static $go$private$project$warmAutoImportCache(s: {
        value: Session;
    } | undefined, ctx: GoInterface | undefined, change: SnapshotChange, oldSnapshot: {
        value: Snapshot;
    } | undefined, newSnapshot: {
        value: Snapshot;
    } | undefined): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_store_1 = change.fileChanges;
                    const __gotots_binary_operand_0 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Changed"));
                    const __gotots_binary_operand_1 = 1;
                    if (__gotots_binary_operand_0 === __gotots_binary_operand_1) {
                        let changedFile = new DocumentUri__from_lsproto("");
                        const __gotots_store_2 = change.fileChanges;
                        const __gotots_range_5 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Changed"));
                        const __gotots_range_keys_2 = __gotots_range_5.keys();
                        for (const __gotots_range_value_11 of __gotots_range_keys_2) {
                            const __gotots_range_value_12 = __gotots_range_5.lookupOk(__gotots_range_value_11);
                            if (!__gotots_range_value_12[1]) {
                                continue;
                            }
                            const __gotots_range_value_13 = __gotots_range_value_11;
                            let uri = __gotots_range_value_13;
                            changedFile = uri;
                        }
                        if (!SnapshotFS.$go$private$project$isOpenFile((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, changedFile.FileName())) {
                            break __gotots_return_block_0;
                        }
                        let prefs = Snapshot.UserPreferences(newSnapshot);
                        if (Tristate_IsFalse__from_core(prefs.IncludeCompletionsForModuleExports)) {
                            break __gotots_return_block_0;
                        }
                        let project: {
                            value: Project;
                        } | undefined = Snapshot.GetDefaultProject(newSnapshot, changedFile);
                        if (project === undefined) {
                            break __gotots_return_block_0;
                        }
                        if (Registry__from_autoimport.IsPreparedForImportingFile((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AutoImports, changedFile.FileName(), (project ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFilePath, UserPreferences__from_lsutil.$copy(prefs))) {
                            break __gotots_return_block_0;
                        }
                        sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.warmAutoImportMu);
                        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.warmAutoImportCancel === undefined)) {
                            const __gotots_callee_5: Session["warmAutoImportCancel"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.warmAutoImportCancel;
                            (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))();
                        }
                        const __gotots_argument_35 = ctx;
                        const __gotots_results_7 = provider_context.ContextWithCancelDirect($goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$to(__gotots_argument_35));
                        const __gotots_results_8 = [$goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$from(__gotots_results_7[0]), __gotots_results_7[1]] satisfies [
                            GoInterface | undefined,
                            (() => void) | undefined
                        ];
                        let warmCtx: GoInterface | undefined = __gotots_results_8[0];
                        let cancel: (() => void) | undefined = __gotots_results_8[1];
                        const __gotots_receiver_21 = warmCtx;
                        if (goInterfaceNonNil<GoInterface>(__gotots_receiver_21).Err() === undefined) {
                            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.warmAutoImportCancel = (): void => {
                                const __gotots_receiver_22 = warmCtx;
                                if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_22).Err() === undefined)) {
                                    return;
                                }
                                const __gotots_receiver_23: Session["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                                const __gotots_argument_36 = "Cancelling auto-import warming for file %s";
                                const __gotots_argument_37 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(changedFile.FileName())]);
                                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_23).Logf(__gotots_argument_36, __gotots_argument_37);
                                const __gotots_callee_7 = cancel;
                                (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))();
                            };
                        }
                        sync__from_gostdlib.Mutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.warmAutoImportMu);
                        const __gotots_receiver_24 = warmCtx;
                        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_24).Err() === undefined)) {
                            const __gotots_callee_8 = cancel;
                            (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))();
                            break __gotots_return_block_0;
                        }
                        const __gotots_callee_9: (() => void) | undefined = cancel;
                        const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_9);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                        });
                        if (!Snapshot.$go$private$project$tryRef(newSnapshot)) {
                            break __gotots_return_block_0;
                        }
                        const __gotots_receiver_25 = newSnapshot;
                        const __gotots_argument_38 = s;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            Snapshot.Deref(__gotots_receiver_25, __gotots_argument_38);
                        });
                        let warmChange = new SnapshotChange(new ResourceRequest(RuntimeSlice.literal<gostring>([changedFile.$value]), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), void 0, changedFile), UpdateReasonRequestedLanguageServiceWithAutoImports$constant(), FileChangeSummary.$zero(), void 0, void 0, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$ATAStateChange.nil(), void 0, false);
                        let clonedSnapshot: {
                            value: Snapshot;
                        } | undefined = Snapshot.Clone(newSnapshot, warmCtx, SnapshotChange.$copy(warmChange), ((newSnapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays, s);
                        const __gotots_receiver_26 = warmCtx;
                        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_26).Err() === undefined)) {
                            Snapshot.Deref(clonedSnapshot, s);
                            break __gotots_return_block_0;
                        }
                        Session.$go$private$project$adoptSnapshotChange(s, newSnapshot, clonedSnapshot);
                    }
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
    }
}
export function NewSession(init: SessionInit | undefined): {
    value: Session;
} | undefined {
    let currentDirectory: SessionOptions["CurrentDirectory"] = ((init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CurrentDirectory;
    const __gotots_receiver_0 = (init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FS;
    let useCaseSensitiveFileNames = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_0).UseCaseSensitiveFileNames();
    let toPath: (($0: gostring) => Path__from_tspath) | undefined = (fileName: gostring): Path__from_tspath => {
        return ToPath__from_tspath(fileName, currentDirectory, useCaseSensitiveFileNames);
    };
    let overlayFS__shadow_1: {
        value: overlayFS;
    } | undefined = newOverlayFS((init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FS, GoMap.make(0, []), ((init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PositionEncoding, toPath);
    let parseCache: {
        value: RefCountCache<ParseCacheKey, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, FileHandle | undefined>;
    } | undefined = (init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ParseCache;
    if (parseCache === undefined) {
        parseCache = NewParseCache(RefCountCacheOptions.$fromStorage({
            DisableDeletion: false
        }));
    }
    let extendedConfigCache: {
        value: OwnerCache<Path__from_tspath, {
            value: ExtendedConfigCacheEntry;
        } | undefined, ExtendedConfigParseArgs>;
    } | undefined = NewExtendedConfigCache();
    let sessionLogger: Logger__from_logging | undefined = (init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Logger;
    if (sessionLogger === undefined) {
        sessionLogger = NewNopLogger__from_logging();
    }
    let session: {
        value: Session;
    } | undefined = { value: new Session((init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).BackgroundCtx, (init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options, time__from_gostdlib.Now(), toPath, (init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Client, sessionLogger, (init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NpmExecutor, overlayFS__shadow_1, parseCache, extendedConfigCache, { value: new programCounter(named_sync.SyncMutexOperations.$zero(), $goMap$MapOf_PointerTo_Named_compiler$Program_To_int32.nil()) }, NewDefaultUserPreferences__from_lsutil(), NewDefaultUserPreferences__from_lsutil(), void 0, void 0, NewQueue__from_background(), named_sync_atomic.SyncAtomicUint64Operations.$zero(), NewSnapshot(0n, { value: new SnapshotFS(toPath, (init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FS, GoMap.nil(), $goMap$MapOf_Named_tspath$Path_To_MapOf_Named_tspath$Path_To_string.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$diskFile.nil(), $goMap$MapOf_Named_tspath$Path_To_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string.nil(), SyncMap__from_collections.$zero<Path__from_tspath, memoizedDiskFile>(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$realpathAliasSet.nil()) }, (init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options, { value: new ConfigFileRegistry($goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileEntry.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileNames.nil(), "") }, void 0, NewDefaultUserPreferences__from_lsutil(), void 0, NewWatchedFiles$MapOf_Named_tspath$Path_To_string("auto-import", 7, ((GetClientCapabilities__from_lsproto((init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).BackgroundCtx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.Workspace.DidChangeWatchedFiles.RelativePatternSupport, (nodeModulesDirs: GoMapValue<Path__from_tspath, gostring>): PatternsAndIgnored => {
            let patterns = RuntimeSlice.make<gostring>(0, nodeModulesDirs.length(), "");
            const __gotots_range_0 = nodeModulesDirs;
            const __gotots_range_keys_0 = __gotots_range_0.keys();
            for (const __gotots_range_value_0 of __gotots_range_keys_0) {
                const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
                if (!__gotots_range_value_1[1]) {
                    continue;
                }
                const __gotots_range_value_2 = __gotots_range_value_1[0];
                let dir = __gotots_range_value_2;
                patterns = patterns.append("", [getRecursiveGlobPattern(dir)]);
            }
            Sort$SliceOf_string$string(patterns);
            return PatternsAndIgnored.$fromStorage({
                patternsInsideWorkspace: patterns,
                directoriesOutsideWorkspace: RuntimeSlice.nil<gostring>(),
                ignored: $goMap$MapOf_string_To_Struct_void.nil()
            });
        }), toPath), named_sync.SyncRWMutexOperations.$zero(), named_sync.SyncMutexOperations.$zero(), void 0, 0n, named_sync.SyncMutexOperations.$zero(), false, named_sync.SyncMutexOperations.$zero(), RuntimeSlice.nil<FileChange__from_project$Storage>(), named_sync.SyncMutexOperations.$zero(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$ATAStateChange.make(0, []), named_sync.SyncMutexOperations.$zero(), void 0, 0n, named_sync.SyncMutexOperations.$zero(), void 0, named_sync.SyncMutexOperations.$zero(), void 0, named_sync.SyncMutexOperations.$zero(), void 0, SyncSet__from_collections.$zero<Path__from_tspath>(), newWatchRegistry(), named_sync_atomic.SyncAtomicBoolOperations.$zero()) };
    if (((init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypingsLocation !== "" && !((init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NpmExecutor === undefined)) {
        (session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsInstaller = NewTypingsInstaller__from_ata(new TypingsInstallerOptions__from_ata(((init ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypingsLocation, 5), new GoInterfaceAdapter(session));
    }
    return session;
}
export function idleCacheCleanDelay$constant(): time__from_gostdlib.Duration {
    return named_time.TimeDurationValueOperations.$wrap(30000000000n);
}
export function performanceTelemetryInterval$constant(): time__from_gostdlib.Duration {
    return named_time.TimeDurationValueOperations.$wrap(300000000000n);
}
export function setTristate(m: GoMapValue<gostring, $goInterface$Interface_void | undefined>, key: gostring, v: Tristate__from_core): void {
    if (v === TSTrue$constant__from_core()) {
        m.store(key, new $goInterfaceAdapter$bool(true));
    }
    else if (v === TSFalse$constant__from_core()) {
        m.store(key, new $goInterfaceAdapter$bool(false));
    }
}
export function boolTelemetry(v: bool): gostring {
    if (v) {
        return "true";
    }
    return "false";
}
export function countFileStats(sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): ProjectInfoTelemetryMeasurements__from_lsproto | undefined {
    let stats = ProjectInfoTelemetryMeasurements__from_lsproto.$zero();
    const __gotots_range_16 = sourceFiles;
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_16.length; __gotots_range_index_8++) {
        const __gotots_range_value_30 = __gotots_range_16.get(__gotots_range_index_8);
        let sf: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_30;
        const __gotots_store_10 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            NodeBase__from_ast.$storageOf(((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase).NodeDefault));
        let size = Node__from_ast.End(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
        switch (((sf ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind) {
            case ScriptKindJS$constant__from_core(): {
                const __gotots_store_11 = stats;
                __gotots_store_11.JsFileCount = __gotots_store_11.JsFileCount + 1;
                const __gotots_store_12 = stats;
                __gotots_store_12.JsFileSize = __gotots_store_12.JsFileSize + size;
                break;
            }
            case ScriptKindJSX$constant__from_core(): {
                const __gotots_store_13 = stats;
                __gotots_store_13.JsxFileCount = __gotots_store_13.JsxFileCount + 1;
                const __gotots_store_14 = stats;
                __gotots_store_14.JsxFileSize = __gotots_store_14.JsxFileSize + size;
                break;
            }
            case ScriptKindTS$constant__from_core(): {
                if (IsDeclarationFileName__from_tspath(SourceFile__from_ast.FileName(sf))) {
                    const __gotots_store_15 = stats;
                    __gotots_store_15.DtsFileCount = __gotots_store_15.DtsFileCount + 1;
                    const __gotots_store_16 = stats;
                    __gotots_store_16.DtsFileSize = __gotots_store_16.DtsFileSize + size;
                }
                else {
                    const __gotots_store_17 = stats;
                    __gotots_store_17.TsFileCount = __gotots_store_17.TsFileCount + 1;
                    const __gotots_store_18 = stats;
                    __gotots_store_18.TsFileSize = __gotots_store_18.TsFileSize + size;
                }
                break;
            }
            case ScriptKindTSX$constant__from_core(): {
                const __gotots_store_19 = stats;
                __gotots_store_19.TsxFileCount = __gotots_store_19.TsxFileCount + 1;
                const __gotots_store_20 = stats;
                __gotots_store_20.TsxFileSize = __gotots_store_20.TsxFileSize + size;
                break;
            }
        }
    }
    return stats;
}
export function updateWatch$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, ctx: GoInterface | undefined, session: {
    value: Session;
} | undefined, logger: Logger__from_logging | undefined, oldWatcher: {
    value: WatchedFiles<T>;
} | undefined, newWatcher: {
    value: WatchedFiles<T>;
} | undefined): RuntimeSlice<$goInterface$Interface_Method_Error_void_to_string | undefined> {
    let errors = RuntimeSlice.nil<$goInterface$Interface_Method_Error_void_to_string | undefined>();
    if (!(newWatcher === undefined)) {
        let w = WatchedFiles.Watchers$kernel<T>(newWatcher, $go$copy$T0_to_T0, $go$from_storage$T0_to_T0);
        let watchers = goSliceAppendSlice<{
            value: FileSystemWatcher__from_lsproto;
        } | undefined>(w.WorkspaceWatchers, w.OutsideWorkspaceWatchers, void 0);
        if (watchers.length > 0) {
            let newWatchers = OrderedMap__from_collections.$zero<WatcherID, {
                value: FileSystemWatcher__from_lsproto;
            } | undefined>((): GoMapValue<WatcherID, {
                value: FileSystemWatcher__from_lsproto;
            } | undefined> => {
                return $goMap$MapOf_Named_project$WatcherID_To_PointerTo_Named_lsproto$FileSystemWatcher.nil();
            });
            const newWatchers$location = tsonicTypeScriptRuntime.boundLocation({}, () => newWatchers, newWatchers$next => newWatchers = newWatchers$next);
            const __gotots_range_9 = watchers;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_9.length; __gotots_range_index_4++) {
                const __gotots_range_value_19 = __gotots_range_index_4;
                const __gotots_range_value_20 = __gotots_range_9.get(__gotots_range_index_4);
                let i = __gotots_range_value_19;
                let watcher: {
                    value: FileSystemWatcher__from_lsproto;
                } | undefined = __gotots_range_value_20;
                let globId = new WatcherID(fmt__from_gostdlib.Sprintf("%s.%d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_project$WatcherID(w.WatcherID), new $goInterfaceAdapter$int(i)])));
                if (watchRegistry.Acquire((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches, watcher, globId)) {
                    OrderedMap$Set$Named_project$WatcherID$PointerTo_Named_lsproto$FileSystemWatcher(newWatchers$location, globId, watcher);
                }
            }
            let watchErrors = RuntimeSlice.nil<$goInterface$Interface_Method_Error_void_to_string | undefined>();
            const __gotots_range_10 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$Named_project$WatcherID$PointerTo_Named_lsproto$FileSystemWatcher(newWatchers$location));
            if (__gotots_range_10 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_1 = 1;
            __gotots_range_10(($argument0: WatcherID, $argument1: {
                value: FileSystemWatcher__from_lsproto;
            } | undefined): bool => {
                if (__gotots_range_state_1 === 0) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                if (__gotots_range_state_1 === -1) {
                    GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                }
                if (__gotots_range_state_1 === -2) {
                    GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                }
                if (__gotots_range_state_1 === 2) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                __gotots_range_state_1 = -1;
                const __gotots_range_value_21 = $argument0;
                const __gotots_range_value_22 = $argument1;
                let id = __gotots_range_value_21;
                let watcher: {
                    value: FileSystemWatcher__from_lsproto;
                } | undefined = __gotots_range_value_22;
                const __gotots_argument_91 = ctx;
                const __gotots_argument_92 = watchRequestTimeout$constant();
                const __gotots_results_11 = provider_context.ContextWithTimeoutDirect($goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$to(__gotots_argument_91), __gotots_argument_92);
                const __gotots_results_12 = [$goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$from(__gotots_results_11[0]), __gotots_results_11[1]] satisfies [
                    GoInterface | undefined,
                    (() => void) | undefined
                ];
                let callCtx: GoInterface | undefined = __gotots_results_12[0];
                let callCancel: (() => void) | undefined = __gotots_results_12[1];
                const __gotots_receiver_60: Session["client"] = (session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client;
                const __gotots_argument_93 = callCtx;
                const __gotots_argument_94 = id;
                const __gotots_argument_95 = RuntimeSlice.literal<{
                    value: FileSystemWatcher__from_lsproto;
                } | undefined>([watcher]);
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<Client>(__gotots_receiver_60).WatchFiles(__gotots_argument_93, __gotots_argument_94, __gotots_argument_95);
                const __gotots_callee_12 = callCancel;
                (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))();
                if (!(err === undefined)) {
                    watchErrors = watchErrors.append(void 0, [err]);
                }
                else if (!(logger === undefined)) {
                    if (oldWatcher === undefined) {
                        const __gotots_receiver_61 = logger;
                        const __gotots_argument_96 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Added new watch: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_project$WatcherID(id)])))]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_61).Log(__gotots_argument_96);
                    }
                    else {
                        const __gotots_receiver_62 = logger;
                        const __gotots_argument_97 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Updated watch: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_project$WatcherID(id)])))]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_62).Log(__gotots_argument_97);
                    }
                    const __gotots_receiver_63 = logger;
                    const __gotots_argument_98 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("\t" + fileSystemWatcherGlobString(watcher))]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_63).Log(__gotots_argument_98);
                    const __gotots_receiver_64 = logger;
                    const __gotots_argument_99 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("")]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_64).Log(__gotots_argument_99);
                }
                __gotots_range_state_1 = 1;
                return true;
            });
            if (__gotots_range_state_1 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            __gotots_range_state_1 = -2;
            if (watchErrors.length > 0) {
                const __gotots_range_11 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$Named_project$WatcherID$PointerTo_Named_lsproto$FileSystemWatcher(newWatchers$location));
                if (__gotots_range_11 === void 0) {
                    GoPanic.raiseRuntime("call of nil function");
                }
                let __gotots_range_state_2 = 1;
                __gotots_range_11(($argument0: WatcherID, $argument1: {
                    value: FileSystemWatcher__from_lsproto;
                } | undefined): bool => {
                    if (__gotots_range_state_2 === 0) {
                        GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                    }
                    if (__gotots_range_state_2 === -1) {
                        GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                    }
                    if (__gotots_range_state_2 === -2) {
                        GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                    }
                    if (__gotots_range_state_2 === 2) {
                        GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                    }
                    __gotots_range_state_2 = -1;
                    const __gotots_range_value_23 = $argument1;
                    let watcher: {
                        value: FileSystemWatcher__from_lsproto;
                    } | undefined = __gotots_range_value_23;
                    watchRegistry.Release((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches, watcher);
                    __gotots_range_state_2 = 1;
                    return true;
                });
                if (__gotots_range_state_2 === -1) {
                    GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                }
                __gotots_range_state_2 = -2;
                watchRegistry.MarkPending((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches, w.WatcherID);
                errors = goSliceAppendSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>(errors, watchErrors, void 0);
            }
            else {
                watchRegistry.ClearPending((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches, w.WatcherID);
            }
            if (w.IgnoredPaths.length() > 0) {
                const __gotots_receiver_65 = logger;
                const __gotots_argument_100 = "%d paths ineligible for watching";
                const __gotots_argument_101 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(w.IgnoredPaths.length())]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_65).Logf(__gotots_argument_100, __gotots_argument_101);
                const __gotots_receiver_66 = logger;
                if (goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_66).IsVerbose()) {
                    const __gotots_range_12 = w.IgnoredPaths;
                    const __gotots_range_keys_4 = __gotots_range_12.keys();
                    for (const __gotots_range_value_24 of __gotots_range_keys_4) {
                        const __gotots_range_value_25 = __gotots_range_12.lookupOk(__gotots_range_value_24);
                        if (!__gotots_range_value_25[1]) {
                            continue;
                        }
                        const __gotots_range_value_26 = __gotots_range_value_24;
                        let path = __gotots_range_value_26;
                        const __gotots_receiver_67 = logger;
                        const __gotots_argument_102 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("\t" + path)]);
                        goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_67).Log(__gotots_argument_102);
                    }
                }
            }
        }
    }
    if (!(oldWatcher === undefined)) {
        let w = WatchedFiles.Watchers$kernel<T>(oldWatcher, $go$copy$T0_to_T0, $go$from_storage$T0_to_T0);
        let watchers = goSliceAppendSlice<{
            value: FileSystemWatcher__from_lsproto;
        } | undefined>(w.WorkspaceWatchers, w.OutsideWorkspaceWatchers, void 0);
        if (watchers.length > 0) {
            let removedIDs = RuntimeSlice.nil<gostring>();
            const __gotots_range_13 = watchers;
            for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_13.length; __gotots_range_index_5++) {
                const __gotots_range_value_27 = __gotots_range_13.get(__gotots_range_index_5);
                let watcher: {
                    value: FileSystemWatcher__from_lsproto;
                } | undefined = __gotots_range_value_27;
                {
                    const __gotots_results_13 = watchRegistry.Release((session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches, watcher);
                    let id = __gotots_results_13[0];
                    let removed = __gotots_results_13[1];
                    if (removed) {
                        removedIDs = removedIDs.append(((void WatcherID,
                            "") as string), [id.$value]);
                    }
                }
            }
            const __gotots_range_14 = removedIDs;
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_14.length; __gotots_range_index_6++) {
                const __gotots_range_value_28 = new WatcherID(__gotots_range_14.get(__gotots_range_index_6));
                let id = __gotots_range_value_28;
                const __gotots_argument_103 = ctx;
                const __gotots_argument_104 = watchRequestTimeout$constant();
                const __gotots_results_14 = provider_context.ContextWithTimeoutDirect($goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$to(__gotots_argument_103), __gotots_argument_104);
                const __gotots_results_15 = [$goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$from(__gotots_results_14[0]), __gotots_results_14[1]] satisfies [
                    GoInterface | undefined,
                    (() => void) | undefined
                ];
                let callCtx: GoInterface | undefined = __gotots_results_15[0];
                let callCancel: (() => void) | undefined = __gotots_results_15[1];
                const __gotots_receiver_68: Session["client"] = (session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.client;
                const __gotots_argument_105 = callCtx;
                const __gotots_argument_106 = id;
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<Client>(__gotots_receiver_68).UnwatchFiles(__gotots_argument_105, __gotots_argument_106);
                const __gotots_callee_14 = callCancel;
                (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))();
                if (!(err === undefined)) {
                    errors = errors.append(void 0, [err]);
                }
                else if (!(logger === undefined) && newWatcher === undefined) {
                    const __gotots_receiver_69 = logger;
                    const __gotots_argument_107 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Removed watch: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_project$WatcherID(id)])))]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_69).Log(__gotots_argument_107);
                }
            }
        }
    }
    return errors;
}
export function shouldPublishProgramDiagnostics(p: {
    value: Project;
} | undefined, snapshotID: uint64): bool {
    if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === KindConfigured$constant().$value) || (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Program === undefined || (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProgramLastUpdate !== snapshotID) {
        return false;
    }
    return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProgramUpdateKind.$value > ProgramUpdateKindCloned$constant().$value;
}
