import type { uint8 } from "@gotots/runtime/scalars.js";
import { FileChangeKindChange$constant, FileChangeKindClose$constant, FileChangeKindOpen$constant, FileChangeKindSave$constant, FileChangeKindWatchChange$constant, FileChangeKindWatchCreate$constant, FileChangeKindWatchDelete$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/filechange.js";
import { KindConfigured$constant, KindInferred$constant, PendingReloadFileNames$constant, PendingReloadFull$constant, PendingReloadNone$constant, ProgramUpdateKindCloned$constant, ProgramUpdateKindNewFiles$constant, ProgramUpdateKindNone$constant, ProgramUpdateKindSameFileNames$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import { UpdateReasonDidChangeCompilerOptionsForInferredProjects$constant, UpdateReasonDidCloseFile$constant, UpdateReasonDidOpenFile$constant, UpdateReasonIdleCleanDiskCache$constant, UpdateReasonRequestedLanguageServiceForFileNotOpen$constant, UpdateReasonRequestedLanguageServicePendingChanges$constant, UpdateReasonRequestedLanguageServiceProjectDirty$constant, UpdateReasonRequestedLanguageServiceProjectNotLoaded$constant, UpdateReasonRequestedLanguageServiceWithAutoImports$constant, UpdateReasonRequestedLoadProjectTree$constant, UpdateReasonUnknown$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/session.js";
import { $state } from "./state.js";
import * as named_runtime_metrics from "@gotots/gostdlib/internal/facets/named-runtime-metrics.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as metrics from "@gotots/gostdlib/runtime/metrics.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoArray } from "@gotots/runtime/array.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    FileChangeKindChange = FileChangeKindChange$constant();
    FileChangeKindClose = FileChangeKindClose$constant();
    FileChangeKindOpen = FileChangeKindOpen$constant();
    FileChangeKindSave = FileChangeKindSave$constant();
    FileChangeKindWatchChange = FileChangeKindWatchChange$constant();
    FileChangeKindWatchCreate = FileChangeKindWatchCreate$constant();
    FileChangeKindWatchDelete = FileChangeKindWatchDelete$constant();
    KindConfigured = KindConfigured$constant();
    KindInferred = KindInferred$constant();
    PendingReloadFileNames = PendingReloadFileNames$constant();
    PendingReloadFull = PendingReloadFull$constant();
    PendingReloadNone = PendingReloadNone$constant();
    ProgramUpdateKindCloned = ProgramUpdateKindCloned$constant();
    ProgramUpdateKindNewFiles = ProgramUpdateKindNewFiles$constant();
    ProgramUpdateKindNone = ProgramUpdateKindNone$constant();
    ProgramUpdateKindSameFileNames = ProgramUpdateKindSameFileNames$constant();
    UpdateReasonDidChangeCompilerOptionsForInferredProjects = UpdateReasonDidChangeCompilerOptionsForInferredProjects$constant();
    UpdateReasonDidCloseFile = UpdateReasonDidCloseFile$constant();
    UpdateReasonDidOpenFile = UpdateReasonDidOpenFile$constant();
    UpdateReasonIdleCleanDiskCache = UpdateReasonIdleCleanDiskCache$constant();
    UpdateReasonRequestedLanguageServiceForFileNotOpen = UpdateReasonRequestedLanguageServiceForFileNotOpen$constant();
    UpdateReasonRequestedLanguageServicePendingChanges = UpdateReasonRequestedLanguageServicePendingChanges$constant();
    UpdateReasonRequestedLanguageServiceProjectDirty = UpdateReasonRequestedLanguageServiceProjectDirty$constant();
    UpdateReasonRequestedLanguageServiceProjectNotLoaded = UpdateReasonRequestedLanguageServiceProjectNotLoaded$constant();
    UpdateReasonRequestedLanguageServiceWithAutoImports = UpdateReasonRequestedLanguageServiceWithAutoImports$constant();
    UpdateReasonRequestedLoadProjectTree = UpdateReasonRequestedLoadProjectTree$constant();
    UpdateReasonUnknown = UpdateReasonUnknown$constant();
    $state._Kind_index = GoArray.zero<uint8, 3>(3, 0);
    $state.runtimeMetricsSamples = void 0;
    $state.watcherID = named_sync_atomic.SyncAtomicUint64Operations.$zero();
    {
        void 0;
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        $state._Kind_index = GoArray.literal<uint8, 3>(3, 0, [0, 1, 2], [0, 8, 18]);
    }
    {
        $state.runtimeMetricsSamples = sync__from_gostdlib.OnceValue<RuntimeSlice<metrics.Sample>>((): RuntimeSlice<metrics.Sample> => {
            let descs = metrics.All();
            let samples = RuntimeSlice.nil<metrics.Sample>();
            const __gotots_range_0 = descs;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = named_runtime_metrics.RuntimeMetricsDescriptionOperations.$copy(__gotots_range_0.get(__gotots_range_index_0));
                let desc = __gotots_range_value_0;
                let name = desc.Name;
                if (strings__from_gostdlib.HasPrefix(name, "/memory/") || strings__from_gostdlib.HasPrefix(name, "/gc/")) {
                    const __gotots_slice_build_0 = samples;
                    const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                    let __gotots_slice_build_1 = __gotots_slice_build_0;
                    if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                        __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, named_runtime_metrics.RuntimeMetricsSampleOperations.$make(name, named_runtime_metrics.RuntimeMetricsValueOperations.$zero()));
                    }
                    else {
                        __gotots_slice_build_1 = goSliceAllocate<metrics.Sample>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.set(__gotots_slice_build_3, named_runtime_metrics.RuntimeMetricsSampleOperations.$copy(__gotots_slice_build_0.get(__gotots_slice_build_3)));
                        }
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, named_runtime_metrics.RuntimeMetricsSampleOperations.$make(name, named_runtime_metrics.RuntimeMetricsValueOperations.$zero()));
                        for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.$initialize(__gotots_slice_build_3, named_runtime_metrics.RuntimeMetricsSampleOperations.$zero());
                        }
                    }
                    samples = __gotots_slice_build_1;
                }
            }
            return samples;
        });
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        void 0;
    }
}
export { CheckerPoolOptions } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/checkerpool.js";
export { Client, Client$contract, Client$is } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/client.js";
export { ConfigFileRegistry } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
export { ExtendedConfigCacheEntry, ExtendedConfigParseArgs, NewExtendedConfigCache } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/extendedconfigcache.js";
export { FileChange, FileChange$Storage, FileChangeKind, FileChangeKindChange$constant, FileChangeKindClose$constant, FileChangeKindOpen$constant, FileChangeKindSave$constant, FileChangeKindWatchChange$constant, FileChangeKindWatchCreate$constant, FileChangeKindWatchDelete$constant, FileChangeSummary } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/filechange.js";
export { FileHandle, FileHandle$contract, FileHandle$is, Overlay } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
export { NewOwnerCache, OwnerCache, OwnerCache$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/ownercache.js";
export { NewParseCache, NewParseCacheKey, ParseCacheKey, ParseCacheKey$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/parsecache.js";
export { CreateProgramResult, Kind, KindConfigured$constant, KindInferred$constant, NewConfiguredProject, NewInferredProject, NewProject, PendingReload, PendingReloadFileNames$constant, PendingReloadFull$constant, PendingReloadNone$constant, ProgramUpdateKind, ProgramUpdateKindCloned$constant, ProgramUpdateKindNewFiles$constant, ProgramUpdateKindNone$constant, ProgramUpdateKindSameFileNames$constant, Project } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
export { ProjectCollection } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/projectcollection.js";
export { ProjectCollectionBuilder } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/projectcollectionbuilder.js";
export { NewRefCountCache, RefCountCache, RefCountCache$Storage, RefCountCacheOptions, RefCountCacheOptions$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/refcountcache.js";
export { NewSession, Session, SessionInit, SessionOptions, UpdateReason, UpdateReasonDidChangeCompilerOptionsForInferredProjects$constant, UpdateReasonDidCloseFile$constant, UpdateReasonDidOpenFile$constant, UpdateReasonIdleCleanDiskCache$constant, UpdateReasonRequestedLanguageServiceForFileNotOpen$constant, UpdateReasonRequestedLanguageServicePendingChanges$constant, UpdateReasonRequestedLanguageServiceProjectDirty$constant, UpdateReasonRequestedLanguageServiceProjectNotLoaded$constant, UpdateReasonRequestedLanguageServiceWithAutoImports$constant, UpdateReasonRequestedLoadProjectTree$constant, UpdateReasonUnknown$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/session.js";
export { APISnapshotRequest, ATAStateChange, NewSnapshot, ProjectTreeRequest, ResourceRequest, Snapshot, SnapshotChange } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/snapshot.js";
export { FileSource, FileSource$contract, FileSource$is, SnapshotFS } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/snapshotfs.js";
export { PatternsAndIgnored, PatternsAndIgnored$Storage, WatchedFiles, WatchedFiles$Storage, WatcherID, Watchers } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
export let FileChangeKindChange: ReturnType<typeof FileChangeKindChange$constant>;
export let FileChangeKindClose: ReturnType<typeof FileChangeKindClose$constant>;
export let FileChangeKindOpen: ReturnType<typeof FileChangeKindOpen$constant>;
export let FileChangeKindSave: ReturnType<typeof FileChangeKindSave$constant>;
export let FileChangeKindWatchChange: ReturnType<typeof FileChangeKindWatchChange$constant>;
export let FileChangeKindWatchCreate: ReturnType<typeof FileChangeKindWatchCreate$constant>;
export let FileChangeKindWatchDelete: ReturnType<typeof FileChangeKindWatchDelete$constant>;
export let KindConfigured: ReturnType<typeof KindConfigured$constant>;
export let KindInferred: ReturnType<typeof KindInferred$constant>;
export let PendingReloadFileNames: ReturnType<typeof PendingReloadFileNames$constant>;
export let PendingReloadFull: ReturnType<typeof PendingReloadFull$constant>;
export let PendingReloadNone: ReturnType<typeof PendingReloadNone$constant>;
export let ProgramUpdateKindCloned: ReturnType<typeof ProgramUpdateKindCloned$constant>;
export let ProgramUpdateKindNewFiles: ReturnType<typeof ProgramUpdateKindNewFiles$constant>;
export let ProgramUpdateKindNone: ReturnType<typeof ProgramUpdateKindNone$constant>;
export let ProgramUpdateKindSameFileNames: ReturnType<typeof ProgramUpdateKindSameFileNames$constant>;
export let UpdateReasonDidChangeCompilerOptionsForInferredProjects: ReturnType<typeof UpdateReasonDidChangeCompilerOptionsForInferredProjects$constant>;
export let UpdateReasonDidCloseFile: ReturnType<typeof UpdateReasonDidCloseFile$constant>;
export let UpdateReasonDidOpenFile: ReturnType<typeof UpdateReasonDidOpenFile$constant>;
export let UpdateReasonIdleCleanDiskCache: ReturnType<typeof UpdateReasonIdleCleanDiskCache$constant>;
export let UpdateReasonRequestedLanguageServiceForFileNotOpen: ReturnType<typeof UpdateReasonRequestedLanguageServiceForFileNotOpen$constant>;
export let UpdateReasonRequestedLanguageServicePendingChanges: ReturnType<typeof UpdateReasonRequestedLanguageServicePendingChanges$constant>;
export let UpdateReasonRequestedLanguageServiceProjectDirty: ReturnType<typeof UpdateReasonRequestedLanguageServiceProjectDirty$constant>;
export let UpdateReasonRequestedLanguageServiceProjectNotLoaded: ReturnType<typeof UpdateReasonRequestedLanguageServiceProjectNotLoaded$constant>;
export let UpdateReasonRequestedLanguageServiceWithAutoImports: ReturnType<typeof UpdateReasonRequestedLanguageServiceWithAutoImports$constant>;
export let UpdateReasonRequestedLoadProjectTree: ReturnType<typeof UpdateReasonRequestedLoadProjectTree$constant>;
export let UpdateReasonUnknown: ReturnType<typeof UpdateReasonUnknown$constant>;
