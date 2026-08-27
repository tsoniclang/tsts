import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Event$Storage as Event__from_fswatch$Storage, WatchOption as WatchOption__from_fswatch, Watcher as Watcher__from_fswatch } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/fswatch/package.js";
import type { FileSystemWatcher as FileSystemWatcher__from_lsproto, RelativePattern as RelativePattern__from_lsproto, URI as URI__from_lsproto, WatchKind as WatchKind__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { Logger as Logger__from_logging } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode, $goInterface$Interface_void, $goInterface$Interface_Method_io$Close_void_to_Named_error as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { $state as $state__fswatch, Default as Default__from_fswatch, EventKind as EventKind__from_fswatch, Event as Event__from_fswatch, WatchCallback as WatchCallback__from_fswatch, WithRecursive as WithRecursive__from_fswatch } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/fswatch/package.js";
import { FileNameToDocumentURI as FileNameToDocumentURI__from_lsconv } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { DocumentUri as DocumentUri__from_lsproto, FileChangeTypeChanged$constant as FileChangeTypeChanged$constant__from_lsproto, FileChangeTypeCreated$constant as FileChangeTypeCreated$constant__from_lsproto, FileChangeTypeDeleted$constant as FileChangeTypeDeleted$constant__from_lsproto, FileEvent as FileEvent__from_lsproto, WatchKindCreate$constant as WatchKindCreate$constant__from_lsproto, WatchKindDelete$constant as WatchKindDelete$constant__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ContainsPath as ContainsPath__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetRelativePathFromDirectory as GetRelativePathFromDirectory__from_tspath, NormalizePath as NormalizePath__from_tspath, NormalizeSlashes as NormalizeSlashes__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Entries as Entries__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$Named_lspwatcher$defaultWatcherBackend as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is, $goInterface$Interface_Method_Is_Named_error_to_bool$contract as GoInterface$contract, $goInterface$Interface_Method_Is_Named_error_to_bool$is as GoInterface$is } from "../../../../../../../support/interface-contracts.js";
import { $goInterfaceMethod$WatchDirectory$string_Named_fswatch$WatchCallback_Variadic_SliceOf_Named_fswatch$WatchOption_to_Named_io$Closer_Named_error } from "../../../../../../../support/interface-methods.js";
import { $goMap$MapOf_string_To_PointerTo_Named_lsproto$FileEvent, $goMap$MapOf_string_To_SliceOf_PointerTo_Named_lspwatcher$watch as GoMap } from "../../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../../support/provider-interface-bridges.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as provider_error from "@gotots/gostdlib/internal/facets/provider-error.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function throttleWindow$constant(): time__from_gostdlib.Duration {
    return named_time.TimeDurationValueOperations.$wrap(75000000n);
}
export interface watcherBackend extends GoInterfaceValue {
    WatchDirectory($argument0: gostring, $argument1: WatchCallback__from_fswatch, $argument2: RuntimeSlice<WatchOption__from_fswatch | undefined>): [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const watcherBackend$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$WatchDirectory$string_Named_fswatch$WatchCallback_Variadic_SliceOf_Named_fswatch$WatchOption_to_Named_io$Closer_Named_error]);
export function watcherBackend$is(value: GoInterfaceValue | undefined): value is watcherBackend {
    return value !== undefined && value.$go$implements(watcherBackend$contract);
}
export class defaultWatcherBackend {
    declare private readonly $goType: void;
    public constructor(public watcher: Watcher__from_fswatch | undefined) {
    }
    static $copy($source: defaultWatcherBackend): defaultWatcherBackend {
        return new defaultWatcherBackend($source.watcher);
    }
    static $equal($left: defaultWatcherBackend, $right: defaultWatcherBackend): bool {
        return goInterfaceEqual($left.watcher, $right.watcher);
    }
    static $hash($source: defaultWatcherBackend): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.watcher === undefined ? 0 : $source.watcher.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    WatchDirectory(dir: gostring, fn: WatchCallback__from_fswatch, opts: RuntimeSlice<WatchOption__from_fswatch | undefined>): [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_receiver_3 = this.watcher;
        const __gotots_argument_0 = dir;
        const __gotots_argument_1 = fn;
        const __gotots_argument_2 = opts;
        const __gotots_results_0 = goInterfaceNonNil<Watcher__from_fswatch>(__gotots_receiver_3).WatchDirectory(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
        return [__gotots_results_0[0], __gotots_results_0[1]];
    }
}
export class Watcher {
    declare private readonly $goType: void;
    public constructor(public fs: FS__from_vfs | undefined, public backend: watcherBackend | undefined, public onChanges: (($0: RuntimeSlice<{
        value: FileEvent__from_lsproto;
    } | undefined>) => void) | undefined, public logger: Logger__from_logging | undefined, public mu: sync__from_gostdlib.Mutex, public watches: GoMapValue<gostring, RuntimeSlice<watch | undefined>>, public closed: bool, public pending: GoMapValue<gostring, {
        value: FileEvent__from_lsproto;
    } | undefined>, public flushTimer: tsonicTypeScriptRuntime.Location<time__from_gostdlib.Timer> | undefined) {
    }
    static $copy($source: Watcher): Watcher {
        return new Watcher($source.fs, $source.backend, $source.onChanges, $source.logger, named_sync.SyncMutexOperations.$copy($source.mu), $source.watches, $source.closed, $source.pending, $source.flushTimer);
    }
    declare private readonly then?: never;
    static Close(w: {
        value: Watcher;
    } | undefined): void {
        sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.closed) {
            sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            return;
        }
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.closed = true;
        let watchesByID: GoMapValue<gostring, RuntimeSlice<watch | undefined>> = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches = GoMap.nil();
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flushTimer === undefined)) {
            const __gotots_receiver_0 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flushTimer;
            time__from_gostdlib.Timer.Stop(__gotots_receiver_0 === void 0 ? void 0 :
                (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Timer>).value);
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flushTimer = void 0;
        }
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending = $goMap$MapOf_string_To_PointerTo_Named_lsproto$FileEvent.nil();
        sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        const __gotots_range_0 = watchesByID;
        const __gotots_range_keys_0 = __gotots_range_0.keys();
        for (const __gotots_range_value_0 of __gotots_range_keys_0) {
            const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
            if (!__gotots_range_value_1[1]) {
                continue;
            }
            const __gotots_range_value_2 = __gotots_range_value_1[0];
            let watches = __gotots_range_value_2;
            const __gotots_range_1 = watches;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
                const __gotots_range_value_3 = __gotots_range_1.get(__gotots_range_index_0);
                let watch__shadow_1: watch | undefined = __gotots_range_value_3;
                watch.$go$private$lspwatcher$close(watch__shadow_1);
            }
        }
    }
    static UnwatchFiles(w: {
        value: Watcher;
    } | undefined, id: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
        sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        const __gotots_results_1 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches.lookupOk(id);
        let watches = __gotots_results_1[0];
        let ok = __gotots_results_1[1];
        if (!ok) {
            sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("lspwatcher: no watcher with id %q", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(id)])));
        }
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches.delete(id);
        sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        const __gotots_range_2 = watches;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_2.length; __gotots_range_index_1++) {
            const __gotots_range_value_4 = __gotots_range_2.get(__gotots_range_index_1);
            let watch__shadow_1: watch | undefined = __gotots_range_value_4;
            watch.$go$private$lspwatcher$close(watch__shadow_1);
        }
        return void 0;
    }
    static WatchFiles(w: {
        value: Watcher;
    } | undefined, id: gostring, fileSystemWatchers: RuntimeSlice<{
        value: FileSystemWatcher__from_lsproto;
    } | undefined>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.closed) {
            sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            return GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("lspwatcher: closed"));
        }
        {
            const __gotots_results_2 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches.lookupOk(id);
            let exists = __gotots_results_2[1];
            if (exists) {
                sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("lspwatcher: watcher %q already exists", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(id)])));
            }
        }
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches.store(id, RuntimeSlice.nil<watch | undefined>());
        sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        let failed = false;
        const __gotots_range_3 = fileSystemWatchers;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_3.length; __gotots_range_index_2++) {
            const __gotots_range_value_5 = __gotots_range_3.get(__gotots_range_index_2);
            let fileSystemWatcher: {
                value: FileSystemWatcher__from_lsproto;
            } | undefined = __gotots_range_value_5;
            const __gotots_results_3 = watchRoot(fileSystemWatcher);
            let directory = __gotots_results_3[0];
            let ok = __gotots_results_3[1];
            if (!ok || directory === "") {
                const __gotots_receiver_4 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                const __gotots_argument_3 = "lspwatcher: skipping watcher %q: unrecognized pattern %q";
                const __gotots_argument_4 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(id), new $goInterfaceAdapter$string(watchPatternString(fileSystemWatcher))]);
                goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_4).Logf(__gotots_argument_3, __gotots_argument_4);
                continue;
            }
            let newWatch: watch | undefined = new watch(w, directory, effectiveKind(fileSystemWatcher), isRecursiveGlob(fileSystemWatcher), named_sync.SyncMutexOperations.$zero(), void 0, "", false, false);
            {
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = watch.$go$private$lspwatcher$reconcile(newWatch, false);
                if (!(err === undefined)) {
                    const __gotots_receiver_5 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                    const __gotots_argument_5 = "lspwatcher: failed to register watcher %q for %q: %v";
                    const __gotots_argument_6 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(id), new $goInterfaceAdapter$string(directory), err]);
                    goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_5).Logf(__gotots_argument_5, __gotots_argument_6);
                    watch.$go$private$lspwatcher$close(newWatch);
                    failed = true;
                    break;
                }
            }
            sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches.store(id, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watches.lookup(id).append(void 0, [newWatch]));
            sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        }
        if (failed) {
            Watcher.UnwatchFiles(w, id);
            return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("lspwatcher: failed to register one or more watchers for %q", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(id)])));
        }
        return void 0;
    }
    static $go$private$lspwatcher$emitSyntheticCreates(w: {
        value: Watcher;
    } | undefined, watchedDirectory: gostring, requestedDirectory: gostring, kind: WatchKind__from_lsproto, recursive: bool): void {
        if ((kind & WatchKindCreate$constant__from_lsproto()) >>> 0 === 0) {
            return;
        }
        const __gotots_receiver_18 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_field_0 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_18).UseCaseSensitiveFileNames();
        let comparePathsOptions = new ComparePathsOptions__from_tspath(__gotots_field_0, "");
        let paths = RuntimeSlice.literal<gostring>([requestedDirectory]);
        if (recursive) {
            const __gotots_receiver_19 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
            const __gotots_argument_27 = watchedDirectory;
            const __gotots_argument_28 = (path: gostring, entry: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, err: $goInterface$Interface_Method_Error_void_to_string | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                if (!(err === undefined)) {
                    return void 0;
                }
                let normalizedPath = NormalizeSlashes__from_tspath(path);
                if (normalizedPath === watchedDirectory) {
                    return void 0;
                }
                paths = paths.append("", [remapEventPath(watchedDirectory, requestedDirectory, normalizedPath, ComparePathsOptions__from_tspath.$copy(comparePathsOptions))]);
                return void 0;
            };
            goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_19).WalkDir(__gotots_argument_27, __gotots_argument_28);
        }
        else {
            const __gotots_receiver_20 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
            const __gotots_argument_29 = watchedDirectory;
            let entries = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_20).GetAccessibleEntries(__gotots_argument_29);
            const __gotots_range_5 = Entries__from_vfs.$storageOf(entries).Files;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length; __gotots_range_index_4++) {
                const __gotots_range_value_7 = __gotots_range_5.get(__gotots_range_index_4);
                let name = __gotots_range_value_7;
                paths = paths.append("", [CombinePaths__from_tspath(requestedDirectory, RuntimeSlice.literal<gostring>([name]))]);
            }
            const __gotots_range_6 = Entries__from_vfs.$storageOf(entries).Directories;
            for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6.length; __gotots_range_index_5++) {
                const __gotots_range_value_8 = __gotots_range_6.get(__gotots_range_index_5);
                let name = __gotots_range_value_8;
                paths = paths.append("", [CombinePaths__from_tspath(requestedDirectory, RuntimeSlice.literal<gostring>([name]))]);
            }
        }
        Watcher.$go$private$lspwatcher$enqueueSyntheticCreates(w, paths);
    }
    static $go$private$lspwatcher$enqueueSyntheticCreates(w: {
        value: Watcher;
    } | undefined, paths: RuntimeSlice<gostring>): void {
        sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.closed) {
            sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            return;
        }
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending.isNil()) {
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending = $goMap$MapOf_string_To_PointerTo_Named_lsproto$FileEvent.make(paths.length, []);
        }
        const __gotots_range_8 = paths;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_8.length; __gotots_range_index_7++) {
            const __gotots_range_value_10 = __gotots_range_8.get(__gotots_range_index_7);
            let path = __gotots_range_value_10;
            let uri = FileNameToDocumentURI__from_lsconv(path);
            {
                const __gotots_results_7 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending.lookupOk(uri.$value);
                let ok = __gotots_results_7[1];
                if (ok) {
                    continue;
                }
            }
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending.store(uri.$value, { value: new FileEvent__from_lsproto(uri, FileChangeTypeCreated$constant__from_lsproto()) });
        }
        Watcher.$go$private$lspwatcher$scheduleFlushLocked(w);
        sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
    }
    static $go$private$lspwatcher$flush(w: {
        value: Watcher;
    } | undefined): void {
        sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.closed) {
            sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            return;
        }
        let pending: GoMapValue<gostring, {
            value: FileEvent__from_lsproto;
        } | undefined> = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending = $goMap$MapOf_string_To_PointerTo_Named_lsproto$FileEvent.nil();
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flushTimer = void 0;
        sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        if (pending.length() === 0) {
            return;
        }
        let changes = RuntimeSlice.make<{
            value: FileEvent__from_lsproto;
        } | undefined>(0, pending.length(), void 0);
        const __gotots_range_9 = pending;
        const __gotots_range_keys_1 = __gotots_range_9.keys();
        for (const __gotots_range_value_11 of __gotots_range_keys_1) {
            const __gotots_range_value_12 = __gotots_range_9.lookupOk(__gotots_range_value_11);
            if (!__gotots_range_value_12[1]) {
                continue;
            }
            const __gotots_range_value_13 = __gotots_range_value_12[0];
            let event: {
                value: FileEvent__from_lsproto;
            } | undefined = __gotots_range_value_13;
            changes = changes.append(void 0, [event]);
        }
        const __gotots_callee_1 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.onChanges;
        const __gotots_argument_32 = changes;
        (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_32);
    }
    static $go$private$lspwatcher$forwardEvents(w: {
        value: Watcher;
    } | undefined, watchedDirectory: gostring, requestedDirectory: gostring, kind: WatchKind__from_lsproto, events: RuntimeSlice<Event__from_fswatch$Storage>): void {
        sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.closed) {
            sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            return;
        }
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending.isNil()) {
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending = $goMap$MapOf_string_To_PointerTo_Named_lsproto$FileEvent.make(events.length, []);
        }
        const __gotots_receiver_21 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_field_1 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_21).UseCaseSensitiveFileNames();
        let comparePathsOptions = new ComparePathsOptions__from_tspath(__gotots_field_1, "");
        const __gotots_range_7 = events;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_7.length; __gotots_range_index_6++) {
            const __gotots_range_value_9 = Event__from_fswatch.$copy(Event__from_fswatch.$fromStorage(__gotots_range_7.get(__gotots_range_index_6)));
            let event = __gotots_range_value_9;
            let changeType = 0;
            switch (((void EventKind__from_fswatch,
                Event__from_fswatch.$storageOf(event).Kind) as number)) {
                case 1: {
                    if ((kind & (3)) >>> 0 === 0) {
                        continue;
                    }
                    changeType = FileChangeTypeChanged$constant__from_lsproto();
                    break;
                }
                case 2: {
                    if ((kind & WatchKindDelete$constant__from_lsproto()) >>> 0 === 0) {
                        continue;
                    }
                    changeType = FileChangeTypeDeleted$constant__from_lsproto();
                    break;
                }
                default: {
                    continue;
                    break;
                }
            }
            let path = remapEventPath(watchedDirectory, requestedDirectory, NormalizeSlashes__from_tspath(Event__from_fswatch.$storageOf(event).Path), ComparePathsOptions__from_tspath.$copy(comparePathsOptions));
            let uri = FileNameToDocumentURI__from_lsconv(path);
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending.store(uri.$value, { value: new FileEvent__from_lsproto(uri, changeType) });
        }
        Watcher.$go$private$lspwatcher$scheduleFlushLocked(w);
        sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
    }
    static $go$private$lspwatcher$scheduleFlushLocked(w: {
        value: Watcher;
    } | undefined): void {
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flushTimer === undefined) {
            const __gotots_argument_30 = throttleWindow$constant();
            const __gotots_receiver_23 = w;
            const __gotots_argument_31 = (): void => {
                Watcher.$go$private$lspwatcher$flush(__gotots_receiver_23);
            };
            const __gotots_conversion_0 = time__from_gostdlib.AfterFunc(__gotots_argument_30, __gotots_argument_31);
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flushTimer = __gotots_conversion_0 === undefined ? undefined :
                tsonicTypeScriptRuntime.boundLocation<time__from_gostdlib.Timer>(__gotots_conversion_0, (): time__from_gostdlib.Timer => {
                    return __gotots_conversion_0;
                }, ($go$providerPointerValue: time__from_gostdlib.Timer): void => {
                    named_time.TimeTimerOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
                });
        }
    }
}
export class watch {
    declare private readonly $goType: void;
    public constructor(public watcher: {
        value: Watcher;
    } | undefined, public requestedDirectory: gostring, public kind: WatchKind__from_lsproto, public recursive: bool, public mu: sync__from_gostdlib.Mutex, public subscription: GoInterface | undefined, public watchedDirectory: gostring, public watchingTarget: bool, public closed: bool) {
    }
    declare private readonly then?: never;
    static $go$private$lspwatcher$ancestorCallback(w: watch | undefined): WatchCallback__from_fswatch {
        return new WatchCallback__from_fswatch((events: RuntimeSlice<Event__from_fswatch$Storage>, err: $goInterface$Interface_Method_Error_void_to_string | undefined): void => {
            watch.$go$private$lspwatcher$reconcile(w, true);
        });
    }
    static $go$private$lspwatcher$close(w: watch | undefined): void {
        sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).closed = true;
        let subscription: GoInterface | undefined = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).subscription;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).subscription = void 0;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirectory = "";
        sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu);
        if (!(subscription === undefined)) {
            const __gotots_receiver_1 = subscription;
            goInterfaceNonNil<GoInterface>(__gotots_receiver_1).Close();
        }
    }
    static $go$private$lspwatcher$handleTerminated(w: watch | undefined): void {
        sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu);
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).closed) {
            sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu);
            return;
        }
        let previous: GoInterface | undefined = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).subscription;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).subscription = void 0;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirectory = "";
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchingTarget = false;
        sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu);
        if (!(previous === undefined)) {
            const __gotots_receiver_22 = previous;
            goInterfaceNonNil<GoInterface>(__gotots_receiver_22).Close();
        }
        watch.$go$private$lspwatcher$reconcile(w, true);
    }
    static $go$private$lspwatcher$reconcile(w: watch | undefined, emitSyntheticCreates: bool): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu);
                    const __gotots_receiver_6 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_6, $go$recovery);
                    };
                    let watcher: {
                        value: Watcher;
                    } | undefined = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watcher;
                    for (;;) {
                        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).closed) {
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                        }
                        const __gotots_receiver_7 = (watcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
                        const __gotots_argument_7 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).requestedDirectory;
                        if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_7).DirectoryExists(__gotots_argument_7)) {
                            if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchingTarget && !((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).subscription === undefined)) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            const __gotots_receiver_8 = (watcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
                            const __gotots_argument_8 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).requestedDirectory;
                            let targetDirectory = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_8).Realpath(__gotots_argument_8);
                            let options = RuntimeSlice.nil<WatchOption__from_fswatch | undefined>();
                            if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).recursive) {
                                options = options.append(void 0, [WithRecursive__from_fswatch()]);
                            }
                            const __gotots_receiver_9 = (watcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backend;
                            const __gotots_argument_9 = targetDirectory;
                            const __gotots_argument_10 = watch.$go$private$lspwatcher$targetCallback(w, targetDirectory);
                            const __gotots_argument_11 = options;
                            const __gotots_results_4 = goInterfaceNonNil<watcherBackend>(__gotots_receiver_9).WatchDirectory(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
                            let subscription__shadow_1: GoInterface | undefined = __gotots_results_4[0];
                            let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_4[1];
                            if (!(err__shadow_1 === undefined)) {
                                __gotots_return_0 = err__shadow_1;
                                break __gotots_return_block_0;
                            }
                            let previous__shadow_1: GoInterface | undefined = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).subscription;
                            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).subscription = subscription__shadow_1;
                            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirectory = targetDirectory;
                            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchingTarget = true;
                            if (!(previous__shadow_1 === undefined)) {
                                const __gotots_receiver_10 = previous__shadow_1;
                                goInterfaceNonNil<GoInterface>(__gotots_receiver_10).Close();
                            }
                            if (emitSyntheticCreates) {
                                Watcher.$go$private$lspwatcher$emitSyntheticCreates(watcher, targetDirectory, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).requestedDirectory, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).recursive);
                            }
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                        }
                        const __gotots_results_5 = nearestExistingAncestor((watcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).requestedDirectory);
                        let ancestor = __gotots_results_5[0];
                        let ok = __gotots_results_5[1];
                        if (!ok) {
                            if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).subscription === undefined)) {
                                let previous__shadow_1: GoInterface | undefined = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).subscription;
                                (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).subscription = void 0;
                                (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirectory = "";
                                (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchingTarget = false;
                                const __gotots_receiver_11 = previous__shadow_1;
                                goInterfaceNonNil<GoInterface>(__gotots_receiver_11).Close();
                            }
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                        }
                        const __gotots_receiver_12 = (watcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
                        const __gotots_argument_12 = ancestor;
                        let ancestorDirectory = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_12).Realpath(__gotots_argument_12);
                        if (!(w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchingTarget && !((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).subscription === undefined) && (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirectory === ancestorDirectory) {
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                        }
                        const __gotots_receiver_13 = (watcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backend;
                        const __gotots_argument_13 = ancestorDirectory;
                        const __gotots_argument_14 = watch.$go$private$lspwatcher$ancestorCallback(w);
                        const __gotots_argument_15 = RuntimeSlice.nil<WatchOption__from_fswatch | undefined>();
                        const __gotots_results_6 = goInterfaceNonNil<watcherBackend>(__gotots_receiver_13).WatchDirectory(__gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
                        let subscription: GoInterface | undefined = __gotots_results_6[0];
                        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_6[1];
                        if (!(err === undefined)) {
                            __gotots_return_0 = err;
                            break __gotots_return_block_0;
                        }
                        let previous: GoInterface | undefined = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).subscription;
                        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).subscription = subscription;
                        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirectory = ancestorDirectory;
                        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchingTarget = false;
                        if (!(previous === undefined)) {
                            const __gotots_receiver_14 = previous;
                            goInterfaceNonNil<GoInterface>(__gotots_receiver_14).Close();
                        }
                        emitSyntheticCreates = true;
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
        return __gotots_return_0;
    }
    static $go$private$lspwatcher$targetCallback(w: watch | undefined, watchedDirectory: gostring): WatchCallback__from_fswatch {
        let watcher: {
            value: Watcher;
        } | undefined = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watcher;
        return new WatchCallback__from_fswatch((events: RuntimeSlice<Event__from_fswatch$Storage>, err: $goInterface$Interface_Method_Error_void_to_string | undefined): void => {
            let terminated = false;
            if (!(err === undefined)) {
                {
                    let __gotots_switch_selection_0 = -1;
                    if (__gotots_switch_selection_0 === -1) {
                        let __gotots_switch_match_0 = false;
                        if (!__gotots_switch_match_0) {
                            const __gotots_argument_17 = err;
                            const __gotots_argument_18 = $state__fswatch.ErrOverflow;
                            __gotots_switch_match_0 = provider_error.ErrorsIsDirect(__gotots_argument_17, __gotots_argument_18, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is);
                        }
                        if (__gotots_switch_match_0) {
                            __gotots_switch_selection_0 = 0;
                        }
                    }
                    if (__gotots_switch_selection_0 === -1) {
                        let __gotots_switch_match_1 = false;
                        if (!__gotots_switch_match_1) {
                            const __gotots_argument_21 = err;
                            const __gotots_argument_22 = $state__fswatch.ErrWatchTerminated;
                            __gotots_switch_match_1 = provider_error.ErrorsIsDirect(__gotots_argument_21, __gotots_argument_22, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is);
                        }
                        if (__gotots_switch_match_1) {
                            __gotots_switch_selection_0 = 1;
                        }
                    }
                    if (__gotots_switch_selection_0 === -1) {
                        __gotots_switch_selection_0 = 2;
                    }
                    __gotots_control_target_0: switch (__gotots_switch_selection_0) {
                        case 0: {
                            const __gotots_receiver_15 = (watcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                            const __gotots_argument_19 = "lspwatcher: watch overflow in %q (some events may have been dropped): %v";
                            const __gotots_argument_20 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(watchedDirectory), err]);
                            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_15).Logf(__gotots_argument_19, __gotots_argument_20);
                            break;
                        }
                        case 1: {
                            terminated = true;
                            const __gotots_receiver_16 = (watcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                            const __gotots_argument_23 = "lspwatcher: watch terminated in %q (directory removed): %v";
                            const __gotots_argument_24 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(watchedDirectory), err]);
                            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_16).Logf(__gotots_argument_23, __gotots_argument_24);
                            break;
                        }
                        case 2: {
                            const __gotots_receiver_17 = (watcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                            const __gotots_argument_25 = "lspwatcher: watch error in %q: %v";
                            const __gotots_argument_26 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(watchedDirectory), err]);
                            goInterfaceNonNil<Logger__from_logging>(__gotots_receiver_17).Logf(__gotots_argument_25, __gotots_argument_26);
                            break;
                        }
                    }
                }
            }
            if (events.length > 0) {
                Watcher.$go$private$lspwatcher$forwardEvents(watcher, watchedDirectory, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).requestedDirectory, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind, events);
            }
            if (terminated) {
                watch.$go$private$lspwatcher$handleTerminated(w);
            }
        });
    }
}
export function New(fs: FS__from_vfs | undefined, onChanges: (($0: RuntimeSlice<{
    value: FileEvent__from_lsproto;
} | undefined>) => void) | undefined, logger: Logger__from_logging | undefined): {
    value: Watcher;
} | undefined {
    return NewWithFSWatcher(fs, Default__from_fswatch(), onChanges, logger);
}
export function NewWithFSWatcher(fs: FS__from_vfs | undefined, watcher: Watcher__from_fswatch | undefined, onChanges: (($0: RuntimeSlice<{
    value: FileEvent__from_lsproto;
} | undefined>) => void) | undefined, logger: Logger__from_logging | undefined): {
    value: Watcher;
} | undefined {
    return newWithBackend(fs, new GoInterfaceAdapter(new defaultWatcherBackend(watcher)), onChanges, logger);
}
export function newWithBackend(fs: FS__from_vfs | undefined, backend: watcherBackend | undefined, onChanges: (($0: RuntimeSlice<{
    value: FileEvent__from_lsproto;
} | undefined>) => void) | undefined, logger: Logger__from_logging | undefined): {
    value: Watcher;
} | undefined {
    return { value: new Watcher(fs, backend, onChanges, logger, named_sync.SyncMutexOperations.$zero(), GoMap.make(0, []), false, $goMap$MapOf_string_To_PointerTo_Named_lsproto$FileEvent.nil(), void 0) };
}
export function nearestExistingAncestor(fs: FS__from_vfs | undefined, dir: gostring): [
    gostring,
    bool
] {
    for (;;) {
        const __gotots_receiver_14 = fs;
        const __gotots_argument_16 = dir;
        if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_14).DirectoryExists(__gotots_argument_16)) {
            return [dir, true];
        }
        let parent = GetDirectoryPath__from_tspath(dir);
        if (parent === dir) {
            return ["", false];
        }
        dir = parent;
    }
}
export function remapEventPath(watchedDirectory: gostring, requestedDirectory: gostring, path: gostring, comparePathsOptions: ComparePathsOptions__from_tspath): gostring {
    if (watchedDirectory === requestedDirectory) {
        return path;
    }
    if (ContainsPath__from_tspath(watchedDirectory, path, ComparePathsOptions__from_tspath.$copy(comparePathsOptions))) {
        let relative = GetRelativePathFromDirectory__from_tspath(watchedDirectory, path, ComparePathsOptions__from_tspath.$copy(comparePathsOptions));
        if (relative === "" || relative === ".") {
            return requestedDirectory;
        }
        return CombinePaths__from_tspath(requestedDirectory, RuntimeSlice.literal<gostring>([relative]));
    }
    return path;
}
export function watchRoot(fileSystemWatcher: {
    value: FileSystemWatcher__from_lsproto;
} | undefined): [
    gostring,
    bool
] {
    if (!((fileSystemWatcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.Pattern === undefined)) {
        return [rootFromGlob((((fileSystemWatcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.Pattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value), true];
    }
    {
        let relativePattern: {
            value: RelativePattern__from_lsproto;
        } | undefined = (fileSystemWatcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.RelativePattern;
        if (!(relativePattern === undefined)) {
            let base = "";
            if (!((relativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUri.URI === undefined)) {
                base = new DocumentUri__from_lsproto((((relativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUri.URI ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<URI__from_lsproto>).value.$value).FileName();
            }
            else {
                return ["", false];
            }
            let pattern = CombinePaths__from_tspath(base, RuntimeSlice.literal<gostring>([(relativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Pattern]));
            return [rootFromGlob(pattern), true];
        }
    }
    return ["", false];
}
export function rootFromGlob(pattern: gostring): gostring {
    pattern = NormalizeSlashes__from_tspath(pattern);
    let metaIndex = -1;
    const __gotots_range_4 = pattern.length;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4; __gotots_range_index_3++) {
        const __gotots_range_value_6 = __gotots_range_index_3;
        let i = __gotots_range_value_6;
        switch (goStringIndex(pattern, i)) {
            case 42:
            case 63:
            case 91:
            case 123: {
                metaIndex = i;
                break;
            }
        }
        if (metaIndex !== -1) {
            break;
        }
    }
    if (metaIndex === -1) {
        return NormalizePath__from_tspath(strings__from_gostdlib.TrimRight(pattern, "/"));
    }
    let directory = strings__from_gostdlib.TrimRight(goStringSlice(pattern, 0, metaIndex), "/");
    if (directory === "") {
        return "";
    }
    return NormalizePath__from_tspath(directory);
}
export function watchPatternString(fileSystemWatcher: {
    value: FileSystemWatcher__from_lsproto;
} | undefined): gostring {
    if (!((fileSystemWatcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.Pattern === undefined)) {
        return (((fileSystemWatcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.Pattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value;
    }
    {
        let relativePattern: {
            value: RelativePattern__from_lsproto;
        } | undefined = (fileSystemWatcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GlobPattern.RelativePattern;
        if (!(relativePattern === undefined)) {
            let base = "";
            if (!((relativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUri.URI === undefined)) {
                base = (((relativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUri.URI ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<URI__from_lsproto>).value.$value;
            }
            return base + "/" + (relativePattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Pattern;
        }
    }
    return "";
}
export function isRecursiveGlob(fileSystemWatcher: {
    value: FileSystemWatcher__from_lsproto;
} | undefined): bool {
    return strings__from_gostdlib.Contains(watchPatternString(fileSystemWatcher), "**");
}
export function effectiveKind(fileSystemWatcher: {
    value: FileSystemWatcher__from_lsproto;
} | undefined): WatchKind__from_lsproto {
    if (!((fileSystemWatcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind === undefined)) {
        return (((fileSystemWatcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<WatchKind__from_lsproto>).value;
    }
    return 7;
}
