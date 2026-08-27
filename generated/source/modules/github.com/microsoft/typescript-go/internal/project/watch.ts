import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SyncSet as SyncSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { WatchKind as WatchKind__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint32, uint64 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, $goStorageType, GoContainerStoredValue, GoStorage, GoStoredValue } from "@gotots/runtime/storage.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { FileNameToDocumentURI as FileNameToDocumentURI__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { FileSystemWatcher as FileSystemWatcher__from_lsproto, PatternOrRelativePattern as PatternOrRelativePattern__from_lsproto, RelativePattern as RelativePattern__from_lsproto, URI as URI__from_lsproto, WorkspaceFolderOrURI as WorkspaceFolderOrURI__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/state.js";
import { CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ContainsPath as ContainsPath__from_tspath, GetCommonParents as GetCommonParents__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetPathComponents as GetPathComponents__from_tspath, IsDynamicFileName as IsDynamicFileName__from_tspath, IsVolumeCharacter as IsVolumeCharacter__from_tspath, Path as Path__from_tspath, RemoveTrailingDirectorySeparator as RemoveTrailingDirectorySeparator__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$AddIfAbsent$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { Set$Keys$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { Set$Len$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { SyncSet$Range$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Range.js";
import { Map$string$PointerTo_Named_lsproto$FileSystemWatcher } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { Values$MapOf_Named_tspath$Path_To_string$Named_tspath$Path$string } from "../../../../../../support/generics/concretizations/maps/Values.js";
import { Collect$string } from "../../../../../../support/generics/concretizations/slices/Collect.js";
import { Compact$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Compact.js";
import { EqualFunc$SliceOf_PointerTo_Named_lsproto$FileSystemWatcher$SliceOf_string$PointerTo_Named_lsproto$FileSystemWatcher$string } from "../../../../../../support/generics/concretizations/slices/EqualFunc.js";
import { Sort$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Sort.js";
import { Sorted$string } from "../../../../../../support/generics/concretizations/slices/Sorted.js";
import { Values$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Values.js";
import { $goInterfaceAdapter$uint64, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_project$WatcherID_To_Struct_void, $goMap$MapOf_Named_project$fileSystemWatcherKey_To_PointerTo_Named_project$fileSystemWatcherValue, $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_string, $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export const minWatchLocationDepth$int: int = 2;
export class fileSystemWatcherKey {
    declare private readonly $goType: void;
    public constructor(public pattern: gostring, public kind: WatchKind__from_lsproto) {
    }
    static $copy($source: fileSystemWatcherKey): fileSystemWatcherKey {
        return new fileSystemWatcherKey($source.pattern, $source.kind);
    }
    static $equal($left: fileSystemWatcherKey, $right: fileSystemWatcherKey): bool {
        return $left.pattern === $right.pattern && $left.kind === $right.kind;
    }
    static $hash($source: fileSystemWatcherKey): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.pattern));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.kind));
        return $hash;
    }
    declare private readonly then?: never;
}
export class fileSystemWatcherValue {
    declare private readonly $goType: void;
    public constructor(public count: int, public id: WatcherID) {
    }
    declare private readonly then?: never;
}
export class watchRegistry {
    declare private readonly $goType: void;
    public constructor(public mu: sync__from_gostdlib.Mutex, public entries: GoMapValue<fileSystemWatcherKey, fileSystemWatcherValue | undefined>, public pending: GoMapValue<WatcherID, GoEmptyStruct>) {
    }
    static $copy($source: watchRegistry): watchRegistry {
        return new watchRegistry(named_sync.SyncMutexOperations.$copy($source.mu), $source.entries, $source.pending);
    }
    declare private readonly then?: never;
    static Acquire(r: {
        value: watchRegistry;
    } | undefined, watcher: {
        value: FileSystemWatcher__from_lsproto;
    } | undefined, id: WatcherID): bool {
        let isNew: bool = false;
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    let key = toFileSystemWatcherKey(watcher);
                    let value: fileSystemWatcherValue | undefined = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries.lookup(key);
                    if (value === undefined) {
                        value = new fileSystemWatcherValue(0, id);
                        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries.store(key, value);
                    }
                    const __gotots_store_1 = (value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    __gotots_store_1.count = __gotots_store_1.count + 1;
                    isNew = (value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).count === 1;
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
        return isNew;
    }
    static ClearPending(r: {
        value: watchRegistry;
    } | undefined, id: WatcherID): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending.delete(id);
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
    static IsPending(r: {
        value: watchRegistry;
    } | undefined, id: WatcherID): bool {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    const __gotots_results_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending.lookupOk(id);
                    let ok = __gotots_results_0[1];
                    __gotots_return_0 = ok;
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
    static MarkPending(r: {
        value: watchRegistry;
    } | undefined, id: WatcherID): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending.store(id, new GoEmptyStruct);
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
    static Release(r: {
        value: watchRegistry;
    } | undefined, watcher: {
        value: FileSystemWatcher__from_lsproto;
    } | undefined): [
        WatcherID,
        bool
    ] {
        let id: WatcherID = new WatcherID("");
        let removed: bool = false;
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    let key = toFileSystemWatcherKey(watcher);
                    let value: fileSystemWatcherValue | undefined = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries.lookup(key);
                    if (value === undefined) {
                        const __gotots_results_2: [
                            WatcherID,
                            bool
                        ] = [new WatcherID(""), false];
                        id = __gotots_results_2[0];
                        removed = __gotots_results_2[1];
                        break __gotots_return_block_0;
                    }
                    if ((value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).count <= 1) {
                        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.entries.delete(key);
                        const __gotots_results_3: [
                            WatcherID,
                            bool
                        ] = [(value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).id, true];
                        id = __gotots_results_3[0];
                        removed = __gotots_results_3[1];
                        break __gotots_return_block_0;
                    }
                    const __gotots_store_2 = (value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    __gotots_store_2.count = __gotots_store_2.count - 1;
                    const __gotots_results_4: [
                        WatcherID,
                        bool
                    ] = [new WatcherID(""), false];
                    id = __gotots_results_4[0];
                    removed = __gotots_results_4[1];
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
        return [id, removed];
    }
}
export function newWatchRegistry(): {
    value: watchRegistry;
} | undefined {
    return { value: new watchRegistry(named_sync.SyncMutexOperations.$zero(), $goMap$MapOf_Named_project$fileSystemWatcherKey_To_PointerTo_Named_project$fileSystemWatcherValue.make(0, []), $goMap$MapOf_Named_project$WatcherID_To_Struct_void.make(0, [])) };
}
export type PatternsAndIgnored$Storage = {
    directoriesOutsideWorkspace: RuntimeSlice<gostring>;
    patternsInsideWorkspace: RuntimeSlice<gostring>;
    ignored: GoMapValue<gostring, GoEmptyStruct>;
};
export class PatternsAndIgnored implements GoStoredValue<PatternsAndIgnored$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: PatternsAndIgnored$Storage) {
    }
    public static $storageOf($source: PatternsAndIgnored): PatternsAndIgnored$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: PatternsAndIgnored$Storage): PatternsAndIgnored {
        return new PatternsAndIgnored($source);
    }
    public get directoriesOutsideWorkspace(): RuntimeSlice<gostring> {
        return this.$storage.directoriesOutsideWorkspace;
    }
    public set directoriesOutsideWorkspace($value: RuntimeSlice<gostring>) {
        this.$storage.directoriesOutsideWorkspace = $value;
    }
    public get patternsInsideWorkspace(): RuntimeSlice<gostring> {
        return this.$storage.patternsInsideWorkspace;
    }
    public set patternsInsideWorkspace($value: RuntimeSlice<gostring>) {
        this.$storage.patternsInsideWorkspace = $value;
    }
    public get ignored(): GoMapValue<gostring, GoEmptyStruct> {
        return this.$storage.ignored;
    }
    public set ignored($value: GoMapValue<gostring, GoEmptyStruct>) {
        this.$storage.ignored = $value;
    }
    declare readonly [$goStorageType]: PatternsAndIgnored$Storage;
    static $zero(): PatternsAndIgnored {
        return new PatternsAndIgnored({
            directoriesOutsideWorkspace: RuntimeSlice.nil<gostring>(),
            patternsInsideWorkspace: RuntimeSlice.nil<gostring>(),
            ignored: GoMap.nil()
        });
    }
    static $copy($source: PatternsAndIgnored): PatternsAndIgnored {
        return new PatternsAndIgnored({
            directoriesOutsideWorkspace: $source.$storage.directoriesOutsideWorkspace,
            patternsInsideWorkspace: $source.$storage.patternsInsideWorkspace,
            ignored: $source.$storage.ignored
        });
    }
    declare private readonly then?: never;
}
export function toFileSystemWatcherKey(w: {
    value: FileSystemWatcher__from_lsproto;
} | undefined): fileSystemWatcherKey {
    let kind: tsonicTypeScriptRuntime.Location<WatchKind__from_lsproto> | undefined = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind;
    if (kind === undefined) {
        kind =
            tsonicTypeScriptRuntime.location<WatchKind__from_lsproto>(7);
    }
    let pattern = "";
    if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.Pattern === undefined)) {
        pattern =
            (((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.Pattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value;
    }
    else if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.RelativePattern === undefined)) {
        let base = "";
        if (!(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.RelativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUri.URI === undefined)) {
            base = ((((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.RelativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUri.URI ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<URI__from_lsproto>).value.$value;
        }
        else if (!(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.RelativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUri.WorkspaceFolder === undefined)) {
            const __gotots_argument_2 = new GoInterfaceAdapter("workspace folder-based relative patterns not implemented");
            GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
        }
        pattern = base + "/" + ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.RelativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Pattern;
    }
    return new fileSystemWatcherKey(pattern, ((kind ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<WatchKind__from_lsproto>).value);
}
export function fileSystemWatcherGlobString(w: {
    value: FileSystemWatcher__from_lsproto;
} | undefined): gostring {
    if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.Pattern === undefined)) {
        return (((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.Pattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value;
    }
    if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.RelativePattern === undefined)) {
        let base = "";
        if (!(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.RelativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUri.URI === undefined)) {
            base = ((((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.RelativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUri.URI ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<URI__from_lsproto>).value.$value;
        }
        else if (!(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.RelativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUri.WorkspaceFolder === undefined)) {
            const __gotots_argument_0 = new GoInterfaceAdapter("workspace folder-based relative patterns not implemented");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        return base + "/" + ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.RelativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Pattern;
    }
    return "";
}
export class WatcherID implements GoContainerStoredValue<gostring> {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare readonly [$goContainerStorageType]: gostring;
    declare private readonly then?: never;
}
export type WatchedFiles$Storage<T> = {
    name: gostring;
    watchKind: uint32;
    hasRelativePatternCapability: bool;
    computeGlobPatterns: (($0: T) => PatternsAndIgnored) | undefined;
    mu: sync__from_gostdlib.RWMutex;
    input: GoStorage<T>;
    computeWatchersOnce: sync__from_gostdlib.Once;
    workspaceWatchers: RuntimeSlice<{
        value: FileSystemWatcher__from_lsproto;
    } | undefined>;
    outsideWorkspaceWatchers: RuntimeSlice<{
        value: FileSystemWatcher__from_lsproto;
    } | undefined>;
    ignored: GoMapValue<gostring, GoEmptyStruct>;
    id: uint64;
};
export class WatchedFiles<T> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: WatchedFiles$Storage<T>) {
    }
    public static $storageOf<T>($source: WatchedFiles<T>): WatchedFiles$Storage<T> {
        return $source.$storage;
    }
    public static $fromStorage<T>($source: WatchedFiles$Storage<T>): WatchedFiles<T> {
        return new WatchedFiles<T>($source);
    }
    static $copy<T>($go$copy$T0_to_T0: ($0: T) => T, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, $go$to_storage$T0_to_T0: ($0: T) => GoStorage<T>, $source: WatchedFiles<T>): WatchedFiles<T> {
        return new WatchedFiles<T>({
            name: $source.$storage.name,
            watchKind: $source.$storage.watchKind,
            hasRelativePatternCapability: $source.$storage.hasRelativePatternCapability,
            computeGlobPatterns: $source.$storage.computeGlobPatterns,
            mu: named_sync.SyncRWMutexOperations.$copy($source.$storage.mu),
            input: $go$to_storage$T0_to_T0($go$copy$T0_to_T0($go$from_storage$T0_to_T0($source.$storage.input))),
            computeWatchersOnce: named_sync.SyncOnceOperations.$copy($source.$storage.computeWatchersOnce),
            workspaceWatchers: $source.$storage.workspaceWatchers,
            outsideWorkspaceWatchers: $source.$storage.outsideWorkspaceWatchers,
            ignored: $source.$storage.ignored,
            id: $source.$storage.id
        });
    }
    declare private readonly then?: never;
    static Clone$kernel<T>(w: {
        value: WatchedFiles<T>;
    } | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$to_storage$T0_to_T0: ($0: T) => GoStorage<T>, input: T): {
        value: WatchedFiles<T>;
    } | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: {
            value: WatchedFiles<T>;
        } | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if (w === undefined) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    sync__from_gostdlib.RWMutex.RLock(WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_0 = WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncRWMutexRUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    __gotots_return_0 =
                        { value: WatchedFiles.$fromStorage<T>({
                                name: WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).name,
                                watchKind: WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).watchKind,
                                hasRelativePatternCapability: WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).hasRelativePatternCapability,
                                computeGlobPatterns: WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).computeGlobPatterns,
                                workspaceWatchers: WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).workspaceWatchers,
                                outsideWorkspaceWatchers: WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).outsideWorkspaceWatchers,
                                input: $go$to_storage$T0_to_T0($go$copy$T0_to_T0(input)),
                                mu: named_sync.SyncRWMutexOperations.$zero(),
                                computeWatchersOnce: named_sync.SyncOnceOperations.$zero(),
                                ignored: GoMap.nil(),
                                id: 0n
                            }) };
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
    static ID$kernel<T>(w: {
        value: WatchedFiles<T>;
    } | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T): WatcherID {
        if (w === undefined) {
            return new WatcherID("");
        }
        return WatchedFiles.Watchers$kernel<T>(w, $go$copy$T0_to_T0, $go$from_storage$T0_to_T0).WatcherID;
    }
    static Watchers$kernel<T>(w: {
        value: WatchedFiles<T>;
    } | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T): Watchers {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: Watchers = Watchers.$zero();
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Once.Do(WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).computeWatchersOnce, (): void => {
                        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                        let __gotots_panic_1: GoPanic | undefined = undefined;
                        try {
                            try {
                                __gotots_return_block_1: {
                                    sync__from_gostdlib.RWMutex.Lock(WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                                    const __gotots_receiver_0 = WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                                        recovery_sync.SyncRWMutexUnlock(__gotots_receiver_0, $go$recovery);
                                    };
                                    const __gotots_callee_0 = WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).computeGlobPatterns;
                                    const __gotots_argument_1 = $go$copy$T0_to_T0($go$from_storage$T0_to_T0(WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).input));
                                    let result = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
                                    let globs = Compact$SliceOf_string$string(Sorted$string(Values$SliceOf_string$string(PatternsAndIgnored.$storageOf(result).patternsInsideWorkspace)));
                                    let ignored: GoMapValue<gostring, GoEmptyStruct> = PatternsAndIgnored.$storageOf(result).ignored;
                                    WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).ignored = ignored;
                                    let changed = false;
                                    if (!EqualFunc$SliceOf_PointerTo_Named_lsproto$FileSystemWatcher$SliceOf_string$PointerTo_Named_lsproto$FileSystemWatcher$string(WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).workspaceWatchers, globs, (a: {
                                        value: FileSystemWatcher__from_lsproto;
                                    } | undefined, b: gostring): bool => {
                                        return (((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.Pattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value
                                            === b;
                                    })) {
                                        WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).workspaceWatchers = Map$string$PointerTo_Named_lsproto$FileSystemWatcher(globs, (glob: gostring): {
                                            value: FileSystemWatcher__from_lsproto;
                                        } | undefined => {
                                            const glob$location = tsonicTypeScriptRuntime.boundLocation({}, () => glob, glob$next => glob = glob$next);
                                            const __gotots_field_0 = new PatternOrRelativePattern__from_lsproto(glob$location, void 0);
                                            const __gotots_store_0 = WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                                            const __gotots_field_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "watchKind");
                                            return { value: new FileSystemWatcher__from_lsproto(__gotots_field_0, __gotots_field_1) };
                                        });
                                        changed = true;
                                    }
                                    let dirsOutside = Compact$SliceOf_string$string(Sorted$string(Values$SliceOf_string$string(PatternsAndIgnored.$storageOf(result).directoriesOutsideWorkspace)));
                                    if (!EqualFunc$SliceOf_PointerTo_Named_lsproto$FileSystemWatcher$SliceOf_string$PointerTo_Named_lsproto$FileSystemWatcher$string(WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).outsideWorkspaceWatchers, dirsOutside, (a: {
                                        value: FileSystemWatcher__from_lsproto;
                                    } | undefined, b: gostring): bool => {
                                        return fileSystemWatcherGlobString(a) === recursiveDirectoryGlobPattern(b, WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).hasRelativePatternCapability);
                                    })) {
                                        WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).outsideWorkspaceWatchers = Map$string$PointerTo_Named_lsproto$FileSystemWatcher(dirsOutside, (dir: gostring): {
                                            value: FileSystemWatcher__from_lsproto;
                                        } | undefined => {
                                            return newRecursiveDirectoryWatcher(dir, WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).watchKind, WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).hasRelativePatternCapability);
                                        });
                                        changed = true;
                                    }
                                    if (changed) {
                                        WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).id = atomic__from_gostdlib.Uint64.Add($state.watcherID, 1n);
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
                    sync__from_gostdlib.RWMutex.RLock(WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_1 = WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncRWMutexRUnlock(__gotots_receiver_1, $go$recovery);
                    };
                    __gotots_return_0 = new Watchers(new WatcherID(fmt__from_gostdlib.Sprintf("%s watcher %d", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).name), new $goInterfaceAdapter$uint64(WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).id)]))), WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).workspaceWatchers, WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).outsideWorkspaceWatchers, WatchedFiles.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).ignored);
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
}
export function NewWatchedFiles$kernel<T>($go$to_storage$T0_to_T0: ($0: T) => GoStorage<T>, $go$zero$void_to_T0: () => T, name: gostring, watchKind: WatchKind__from_lsproto, hasRelativePatternCapability: bool, computeGlobPatterns: (($0: T) => PatternsAndIgnored) | undefined): {
    value: WatchedFiles<T>;
} | undefined {
    return { value: WatchedFiles.$fromStorage<T>({
            id: atomic__from_gostdlib.Uint64.Add($state.watcherID, 1n),
            name: name,
            watchKind: watchKind,
            hasRelativePatternCapability: hasRelativePatternCapability,
            computeGlobPatterns: computeGlobPatterns,
            mu: named_sync.SyncRWMutexOperations.$zero(),
            input: $go$to_storage$T0_to_T0($go$zero$void_to_T0()),
            computeWatchersOnce: named_sync.SyncOnceOperations.$zero(),
            workspaceWatchers: RuntimeSlice.nil<{
                value: FileSystemWatcher__from_lsproto;
            } | undefined>(),
            outsideWorkspaceWatchers: RuntimeSlice.nil<{
                value: FileSystemWatcher__from_lsproto;
            } | undefined>(),
            ignored: GoMap.nil()
        }) };
}
export class Watchers {
    declare private readonly $goType: void;
    public constructor(public WatcherID: WatcherID, public WorkspaceWatchers: RuntimeSlice<{
        value: FileSystemWatcher__from_lsproto;
    } | undefined>, public OutsideWorkspaceWatchers: RuntimeSlice<{
        value: FileSystemWatcher__from_lsproto;
    } | undefined>, public IgnoredPaths: GoMapValue<gostring, GoEmptyStruct>) {
    }
    static $zero(): Watchers {
        return new Watchers(new WatcherID(""), RuntimeSlice.nil<{
            value: FileSystemWatcher__from_lsproto;
        } | undefined>(), RuntimeSlice.nil<{
            value: FileSystemWatcher__from_lsproto;
        } | undefined>(), GoMap.nil());
    }
    declare private readonly then?: never;
}
export function createResolutionLookupGlobMapper(workspaceDirectory: gostring, libDirectory: gostring, currentDirectory: gostring, useCaseSensitiveFileNames: bool): (($0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined) => PatternsAndIgnored) | undefined {
    let workspaceDirectoryPath = ToPath__from_tspath(workspaceDirectory, currentDirectory, useCaseSensitiveFileNames);
    let currentDirectoryPath = ToPath__from_tspath(currentDirectory, currentDirectory, useCaseSensitiveFileNames);
    let libDirectoryPath = ToPath__from_tspath(libDirectory, currentDirectory, useCaseSensitiveFileNames);
    return (data: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined): PatternsAndIgnored => {
        let ignored: GoMapValue<gostring, GoEmptyStruct> = GoMap.nil();
        let seenDirs = Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
            return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
        });
        const seenDirs$location = tsonicTypeScriptRuntime.boundLocation({}, () => seenDirs, seenDirs$next => seenDirs = seenDirs$next);
        let includeWorkspace = false, includeRoot = false, includeLib = false;
        let nodeModulesDirectories = Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
            return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
        });
        const nodeModulesDirectories$location = tsonicTypeScriptRuntime.boundLocation({}, () => nodeModulesDirectories, nodeModulesDirectories$next => nodeModulesDirectories = nodeModulesDirectories$next);
        let externalDirectories = Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
            return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
        });
        const externalDirectories$location = tsonicTypeScriptRuntime.boundLocation({}, () => externalDirectories, externalDirectories$next => externalDirectories = externalDirectories$next);
        if (!(data === undefined)) {
            SyncSet$Range$Named_tspath$Path(data, (path: Path__from_tspath): bool => {
                if (IsDynamicFileName__from_tspath(path.$value)) {
                    return true;
                }
                if (!Set$AddIfAbsent$Named_tspath$Path(seenDirs$location, path.GetDirectoryPath())) {
                    return true;
                }
                if (workspaceDirectoryPath.ContainsPath(path)) {
                    includeWorkspace = true;
                }
                else if (currentDirectoryPath.ContainsPath(path)) {
                    includeRoot = true;
                }
                else if (libDirectoryPath.ContainsPath(path)) {
                    includeLib = true;
                }
                else {
                    let idx = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(path.$value, "/node_modules/")));
                    if (idx !== -1) {
                        Set$Add$Named_tspath$Path(nodeModulesDirectories$location, new Path__from_tspath(goStringSlice(path.$value, 0, idx + 13)));
                    }
                    else {
                        Set$Add$Named_tspath$Path(externalDirectories$location, path.GetDirectoryPath());
                    }
                }
                return true;
            });
        }
        let globs = RuntimeSlice.nil<gostring>();
        if (includeWorkspace) {
            globs = globs.append("", [getRecursiveGlobPattern(workspaceDirectoryPath.$value)]);
        }
        if (includeRoot) {
            globs = globs.append("", [getRecursiveGlobPattern(currentDirectoryPath.$value)]);
        }
        if (includeLib) {
            globs = globs.append("", [getRecursiveGlobPattern(libDirectoryPath.$value)]);
        }
        if (Set$Len$Named_tspath$Path(nodeModulesDirectories$location) > 0) {
            let nodeModulesGlobs = RuntimeSlice.make<gostring>(0, Set$Len$Named_tspath$Path(nodeModulesDirectories$location), "");
            const __gotots_range_1 = Set$Keys$Named_tspath$Path(nodeModulesDirectories$location);
            const __gotots_range_keys_0 = __gotots_range_1.keys();
            for (const __gotots_range_value_1 of __gotots_range_keys_0) {
                const __gotots_range_value_2 = __gotots_range_1.lookupOk(__gotots_range_value_1);
                if (!__gotots_range_value_2[1]) {
                    continue;
                }
                const __gotots_range_value_3 = __gotots_range_value_1;
                let dir = __gotots_range_value_3;
                nodeModulesGlobs = nodeModulesGlobs.append("", [getRecursiveGlobPattern(dir.$value)]);
            }
            Sort$SliceOf_string$string(nodeModulesGlobs);
            globs = goSliceAppendSlice<gostring>(globs, nodeModulesGlobs, "");
        }
        let outsideDirs = RuntimeSlice.nil<gostring>();
        if (Set$Len$Named_tspath$Path(externalDirectories$location) > 0) {
            let externalDirStrings = RuntimeSlice.make<gostring>(0, Set$Len$Named_tspath$Path(externalDirectories$location), "");
            const __gotots_range_2 = Set$Keys$Named_tspath$Path(externalDirectories$location);
            const __gotots_range_keys_1 = __gotots_range_2.keys();
            for (const __gotots_range_value_4 of __gotots_range_keys_1) {
                const __gotots_range_value_5 = __gotots_range_2.lookupOk(__gotots_range_value_4);
                if (!__gotots_range_value_5[1]) {
                    continue;
                }
                const __gotots_range_value_6 = __gotots_range_value_4;
                let dir = __gotots_range_value_6;
                externalDirStrings = externalDirStrings.append("", [dir.$value]);
            }
            const __gotots_results_2 = GetCommonParents__from_tspath(externalDirStrings, minWatchLocationDepth$int, getPathComponentsForWatching, new ComparePathsOptions__from_tspath(true, ""));
            let externalDirectoryParents = __gotots_results_2[0];
            let ignoredExternalDirs: GoMapValue<gostring, GoEmptyStruct> = __gotots_results_2[1];
            Sort$SliceOf_string$string(externalDirectoryParents);
            ignored = ignoredExternalDirs;
            outsideDirs = externalDirectoryParents;
        }
        return PatternsAndIgnored.$fromStorage({
            directoriesOutsideWorkspace: outsideDirs,
            patternsInsideWorkspace: globs,
            ignored: ignored
        });
    };
}
export function getTypingsLocationsGlobs(typingsFiles: RuntimeSlice<gostring>, typingsLocation: gostring, workspaceDirectory: gostring, currentDirectory: gostring, useCaseSensitiveFileNames: bool): PatternsAndIgnored {
    let includeTypingsLocation = false, includeWorkspace = false;
    let externalDirectories: GoMapValue<Path__from_tspath, gostring> = $goMap$MapOf_Named_tspath$Path_To_string.make(0, []);
    let globs: GoMapValue<Path__from_tspath, gostring> = $goMap$MapOf_Named_tspath$Path_To_string.make(0, []);
    let comparePathsOptions = new ComparePathsOptions__from_tspath(useCaseSensitiveFileNames, currentDirectory);
    const __gotots_range_0 = typingsFiles;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let file = __gotots_range_value_0;
        if (ContainsPath__from_tspath(typingsLocation, file, ComparePathsOptions__from_tspath.$copy(comparePathsOptions))) {
            includeTypingsLocation = true;
        }
        else if (!ContainsPath__from_tspath(workspaceDirectory, file, ComparePathsOptions__from_tspath.$copy(comparePathsOptions))) {
            let directory = GetDirectoryPath__from_tspath(file);
            externalDirectories.store(ToPath__from_tspath(directory, currentDirectory, useCaseSensitiveFileNames), directory);
        }
        else {
            includeWorkspace = true;
        }
    }
    const __gotots_results_1 = GetCommonParents__from_tspath(Collect$string(Values$MapOf_Named_tspath$Path_To_string$Named_tspath$Path$string(externalDirectories)), minWatchLocationDepth$int, getPathComponentsForWatching, ComparePathsOptions__from_tspath.$copy(comparePathsOptions));
    let externalDirectoryParents = __gotots_results_1[0];
    let ignored: GoMapValue<gostring, GoEmptyStruct> = __gotots_results_1[1];
    Sort$SliceOf_string$string(externalDirectoryParents);
    if (includeWorkspace) {
        globs.store(ToPath__from_tspath(workspaceDirectory, currentDirectory, useCaseSensitiveFileNames), getRecursiveGlobPattern(workspaceDirectory));
    }
    if (includeTypingsLocation) {
        globs.store(ToPath__from_tspath(typingsLocation, currentDirectory, useCaseSensitiveFileNames), getRecursiveGlobPattern(typingsLocation));
    }
    return PatternsAndIgnored.$fromStorage({
        directoriesOutsideWorkspace: externalDirectoryParents,
        patternsInsideWorkspace: Collect$string(Values$MapOf_Named_tspath$Path_To_string$Named_tspath$Path$string(globs)),
        ignored: ignored
    });
}
export function getPathComponentsForWatching(path: gostring, currentDirectory: gostring): RuntimeSlice<gostring> {
    let components = GetPathComponents__from_tspath(path, currentDirectory);
    let rootLength = perceivedOsRootLengthForWatching(components);
    if (rootLength <= 1) {
        return components;
    }
    let newRoot = CombinePaths__from_tspath(components.get(0), components.slice(1, rootLength, null));
    return goSliceAppendSlice<gostring>(RuntimeSlice.literal<gostring>([newRoot]), components.slice(rootLength, null, null), "");
}
export function perceivedOsRootLengthForWatching(pathComponents: RuntimeSlice<gostring>): int {
    let length = pathComponents.length;
    if (length <= 1) {
        return length;
    }
    if (strings__from_gostdlib.HasPrefix(pathComponents.get(0), "//")) {
        return 2;
    }
    if (pathComponents.get(0).length === 3 && IsVolumeCharacter__from_tspath(goStringIndex(pathComponents.get(0), 0)) && goStringIndex(pathComponents.get(0), 1) === 58 && goStringIndex(pathComponents.get(0), 2) === 47) {
        if (strings__from_gostdlib.EqualFold(pathComponents.get(1), "users")) {
            return globalThis.Math.min(3, length);
        }
        return 1;
    }
    if (pathComponents.get(1) === "home") {
        return globalThis.Math.min(3, length);
    }
    return 1;
}
export function getRecursiveGlobPattern(directory: gostring): gostring {
    return fmt__from_gostdlib.Sprintf("%s/%s", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(RemoveTrailingDirectorySeparator__from_tspath(directory)), new GoInterfaceAdapter("**/*")]));
}
export function recursiveDirectoryGlobPattern(directory: gostring, useRelativePattern: bool): gostring {
    if (useRelativePattern) {
        return FileNameToDocumentURI__from_lsconv(directory).$value + "/**/*";
    }
    return getRecursiveGlobPattern(directory);
}
export function newRecursiveDirectoryWatcher(directory: gostring, kind: WatchKind__from_lsproto, useRelativePattern: bool): {
    value: FileSystemWatcher__from_lsproto;
} | undefined {
    const kind$location = tsonicTypeScriptRuntime.boundLocation({}, () => kind, kind$next => kind = kind$next);
    if (useRelativePattern) {
        let baseUri = new URI__from_lsproto(FileNameToDocumentURI__from_lsconv(directory).$value);
        const baseUri$location = tsonicTypeScriptRuntime.boundLocation({}, () => baseUri, baseUri$next => baseUri = baseUri$next);
        return { value: new FileSystemWatcher__from_lsproto(new PatternOrRelativePattern__from_lsproto(void 0, { value: new RelativePattern__from_lsproto(new WorkspaceFolderOrURI__from_lsproto(void 0, baseUri$location), "**/*") }), kind$location) };
    }
    let glob = getRecursiveGlobPattern(directory);
    const glob$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => glob, glob$next2 => glob = glob$next2);
    return { value: new FileSystemWatcher__from_lsproto(new PatternOrRelativePattern__from_lsproto(glob$location2, void 0), kind$location) };
}
