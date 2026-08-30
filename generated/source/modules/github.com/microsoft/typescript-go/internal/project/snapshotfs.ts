import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { PositionEncodingKind as PositionEncodingKind__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { Map as Map__from_dirty, SyncMap as SyncMap__from_dirty, Value as Value__from_dirty } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/dirty/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { mapEntry$Storage as mapEntry__from_dirty$Storage } from "./dirty/entry.js";
import type { FileHandle, Overlay } from "./overlayfs.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { FileNameToDocumentURI as FileNameToDocumentURI__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { DocumentUri as DocumentUri__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { CloneableMap as CloneableMap__from_dirty, FinalizationHooks as FinalizationHooks__from_dirty, MapEntry as MapEntry__from_dirty, NewSyncMap as NewSyncMap__from_dirty, SyncMapEntry as SyncMapEntry__from_dirty } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/dirty/package.js";
import { GetBaseFileName as GetBaseFileName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, IsDynamicFileName as IsDynamicFileName__from_tspath, Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { FS as FS__from_cachedvfs, From as From__from_cachedvfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/cachedvfs/package.js";
import { Entries as Entries__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import { HashString128 as HashString128__from_xxh3, Uint128 as Uint128__from_xxh3 } from "../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import { Set$Add$Named_lsproto$DocumentUri, Set$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Clone$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Clone.js";
import { Set$Keys$Named_lsproto$DocumentUri, Set$Keys$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { Set$Len$Named_lsproto$DocumentUri, Set$Len$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$Named_project$memoizedDiskFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { SyncSet$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Add.js";
import { SyncSet$Has$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Has.js";
import { SyncSet$IsEmpty$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$IsEmpty.js";
import { FirstResult$MapOf_Named_tspath$Path_To_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstResult.js";
import { Map$Add$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Add.js";
import { Map$Finalize$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Finalize.js";
import { Map$Get$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/Map$Get.js";
import { MapEntry$Change$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/MapEntry$Change.js";
import { MapEntry$Delete$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/MapEntry$Delete.js";
import { NewMap$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/NewMap.js";
import { SyncMap$Finalize$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$Finalize.js";
import { SyncMap$FinalizeWith$Named_tspath$Path$PointerTo_Named_project$diskFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$FinalizeWith.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$diskFile, SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_project$diskFile, SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$LoadOrStore.js";
import { SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$diskFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMap$Range.js";
import { SyncMapEntry$Change$Named_tspath$Path$PointerTo_Named_project$diskFile, SyncMapEntry$Change$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMapEntry$Change.js";
import { SyncMapEntry$Delete$Named_tspath$Path$PointerTo_Named_project$diskFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMapEntry$Delete.js";
import { SyncMapEntry$Locked$Named_tspath$Path$PointerTo_Named_project$diskFile, SyncMapEntry$Locked$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMapEntry$Locked.js";
import { SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$diskFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/SyncMapEntry$Value.js";
import { mapEntry$Key$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string, mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$diskFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/mapEntry$Key.js";
import { mapEntry$Original$Named_tspath$Path$PointerTo_Named_project$diskFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/mapEntry$Original.js";
import { mapEntry$Value$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/dirty/mapEntry$Value.js";
import { readDirectoryIntoEntries$MapOf_Named_tspath$Path_To_string, readDirectoryIntoEntries$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/project/readDirectoryIntoEntries.js";
import { $goInterfaceAdapter$PointerTo_Named_cachedvfs$FS, $goInterfaceAdapter$PointerTo_Named_project$diskFile, $goInterfaceAdapter$bool, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_project$Overlay as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$FileExists$string_Named_tspath$Path_to_bool, $goInterfaceMethod$GetAccessibleEntries$string_to_Named_vfs$Entries, $goInterfaceMethod$GetFile$string_to_Named_project$FileHandle, $goInterfaceMethod$GetFileByPath$string_Named_tspath$Path_to_Named_project$FileHandle } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_MapOf_Named_tspath$Path_To_string, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$diskFile, $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_string as GoMap } from "../../../../../../support/maps.js";
import { mapEntry as mapEntry__from_dirty } from "./dirty/entry.js";
import { FileChangeSummary } from "./filechange.js";
import { diskFile, fileBase, newDiskFile } from "./overlayfs.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
class $ProjectedPropertyLocation<TObject extends object, TKey extends keyof TObject, TTarget> {
    storageIdentity: TObject;
    storageKey: TKey;
    fromSource: (value: TObject[TKey]) => TTarget;
    toSource: (value: TTarget) => TObject[TKey];
    constructor(storageIdentity: TObject, storageKey: TKey, fromSource: (value: TObject[TKey]) => TTarget, toSource: (value: TTarget) => TObject[TKey]) {
        this.storageIdentity = storageIdentity;
        this.storageKey = storageKey;
        this.fromSource = fromSource;
        this.toSource = toSource;
    }
    get value(): TTarget {
        return this.fromSource(this.storageIdentity[this.storageKey]);
    }
    set value(value: TTarget) {
        this.storageIdentity[this.storageKey] = this.toSource(value);
    }
}
export interface FileSource extends GoInterfaceValue {
    FS(): FS__from_vfs | undefined;
    FileExists($argument0: gostring, $argument1: Path__from_tspath): bool;
    GetAccessibleEntries($argument0: gostring): Entries__from_vfs;
    GetFile($argument0: gostring): FileHandle | undefined;
    GetFileByPath($argument0: gostring, $argument1: Path__from_tspath): FileHandle | undefined;
}
export const FileSource$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$FileExists$string_Named_tspath$Path_to_bool, $goInterfaceMethod$GetAccessibleEntries$string_to_Named_vfs$Entries, $goInterfaceMethod$GetFile$string_to_Named_project$FileHandle, $goInterfaceMethod$GetFileByPath$string_Named_tspath$Path_to_Named_project$FileHandle]);
export function FileSource$is(value: GoInterfaceValue | undefined): value is FileSource {
    return value !== undefined && value.$go$implements(FileSource$contract);
}
export class realpathAliasSet {
    declare private readonly $goType: void;
    public constructor(public mu: sync__from_gostdlib.Mutex, public paths: Set__from_collections<Path__from_tspath>) {
    }
    static $copy($source: realpathAliasSet): realpathAliasSet {
        return new realpathAliasSet(named_sync.SyncMutexOperations.$copy($source.mu), Set__from_collections.$copy<Path__from_tspath>($source.paths));
    }
    declare private readonly then?: never;
    static Add(s: tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined, path: Path__from_tspath): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<realpathAliasSet>).value.mu);
                    const __gotots_receiver_25 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<realpathAliasSet>).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_25, $go$recovery);
                    };
                    const __gotots_store_33 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<realpathAliasSet>).value;
                    Set$Add$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "paths"), path);
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
    static Clone(s: tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined): tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined = void 0;
        try {
            try {
                __gotots_return_block_1: {
                    sync__from_gostdlib.Mutex.Lock(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<realpathAliasSet>).value.mu);
                    const __gotots_receiver_46 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<realpathAliasSet>).value.mu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_46, $go$recovery);
                    };
                    let clone: tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined = tsonicTypeScriptRuntime.location<realpathAliasSet>(new realpathAliasSet(named_sync.SyncMutexOperations.$zero(), Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
                        return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
                    })));
                    const __gotots_store_34 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<realpathAliasSet>).value;
                    const __gotots_binary_operand_6 = Set$Len$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "paths"));
                    const __gotots_binary_operand_7 = 0;
                    if (__gotots_binary_operand_6 > __gotots_binary_operand_7) {
                        const __gotots_store_35 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<realpathAliasSet>).value;
                        ((clone ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<realpathAliasSet>).value.paths = Set__from_collections.$copy<Path__from_tspath>(Set__from_collections.$copy<Path__from_tspath>(((Set$Clone$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "paths")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>>).value));
                    }
                    __gotots_return_0 = clone;
                    break __gotots_return_block_1;
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
        return __gotots_return_0;
    }
}
export class SnapshotFS {
    declare private readonly $goType: void;
    public constructor(public toPath: (($0: gostring) => Path__from_tspath) | undefined, public fs: FS__from_vfs | undefined, public overlays: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Overlay> | undefined>, public overlayDirectories: GoMapValue<Path__from_tspath, GoMapValue<Path__from_tspath, gostring>>, public diskFiles: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>, public diskDirectories: GoMapValue<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>, public readFiles: SyncMap__from_collections<Path__from_tspath, memoizedDiskFile>, public nodeModulesRealpathAliases: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined>) {
    }
    static $copy($source: SnapshotFS): SnapshotFS {
        return new SnapshotFS($source.toPath, $source.fs, $source.overlays, $source.overlayDirectories, $source.diskFiles, $source.diskDirectories, SyncMap__from_collections.$copy<Path__from_tspath, memoizedDiskFile>($source.readFiles), $source.nodeModulesRealpathAliases);
    }
    declare private readonly then?: never;
    static FS(s: {
        value: SnapshotFS;
    } | undefined): FS__from_vfs | undefined {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
    }
    static FileExists(s: {
        value: SnapshotFS;
    } | undefined, fileName: gostring, path: Path__from_tspath): bool {
        {
            const __gotots_results_37 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays.lookupOk(path);
            let ok = __gotots_results_37[1];
            if (ok) {
                return true;
            }
        }
        {
            const __gotots_results_38 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles.lookupOk(path);
            let ok = __gotots_results_38[1];
            if (ok) {
                return true;
            }
        }
        const __gotots_receiver_31: SnapshotFS["fs"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_45 = fileName;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_31).FileExists(__gotots_argument_45);
    }
    static GetAccessibleEntries(s: {
        value: SnapshotFS;
    } | undefined, directoryName: gostring): Entries__from_vfs {
        let entries = Entries__from_vfs.$zero();
        const __gotots_callee_24: SnapshotFS["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_46 = directoryName;
        let path = (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_46);
        {
            const __gotots_results_39 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskDirectories.lookupOk(path);
            let diskDirectories: CloneableMap__from_dirty<Path__from_tspath, gostring> = __gotots_results_39[0];
            let ok = __gotots_results_39[1];
            if (ok) {
                const __gotots_argument_47 = diskDirectories;
                const __gotots_receiver_32 = s;
                const __gotots_argument_48 = ($argument0: Path__from_tspath): bool => {
                    return SnapshotFS.$go$private$project$isFile(__gotots_receiver_32, $argument0);
                };
                const __gotots_argument_49 = entries;
                readDirectoryIntoEntries$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string(__gotots_argument_47, __gotots_argument_48, __gotots_argument_49);
            }
        }
        {
            const __gotots_results_40 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlayDirectories.lookupOk(path);
            let overlayDirectories: GoMapValue<Path__from_tspath, gostring> = __gotots_results_40[0];
            let ok = __gotots_results_40[1];
            if (ok) {
                const __gotots_argument_50 = overlayDirectories;
                const __gotots_receiver_33 = s;
                const __gotots_argument_51 = ($argument0: Path__from_tspath): bool => {
                    return SnapshotFS.$go$private$project$isFile(__gotots_receiver_33, $argument0);
                };
                const __gotots_argument_52 = entries;
                readDirectoryIntoEntries$MapOf_Named_tspath$Path_To_string(__gotots_argument_50, __gotots_argument_51, __gotots_argument_52);
            }
        }
        return Entries__from_vfs.$copy(entries);
    }
    static GetFile(s: {
        value: SnapshotFS;
    } | undefined, fileName: gostring): FileHandle | undefined {
        const __gotots_receiver_0 = s;
        const __gotots_argument_1 = fileName;
        const __gotots_callee_0: SnapshotFS["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_0 = fileName;
        const __gotots_argument_2 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
        return SnapshotFS.GetFileByPath(__gotots_receiver_0, __gotots_argument_1, __gotots_argument_2);
    }
    static GetFileByPath(s: {
        value: SnapshotFS;
    } | undefined, fileName: gostring, path: Path__from_tspath): FileHandle | undefined {
        {
            const __gotots_results_0 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays.lookupOk(path);
            let file: tsonicTypeScriptRuntime.Location<Overlay> | undefined = __gotots_results_0[0];
            let ok = __gotots_results_0[1];
            if (ok) {
                return new GoInterfaceAdapter(file);
            }
        }
        {
            const __gotots_results_1 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles.lookupOk(path);
            let file: tsonicTypeScriptRuntime.Location<diskFile> | undefined = __gotots_results_1[0];
            let ok = __gotots_results_1[1];
            if (ok) {
                return new $goInterfaceAdapter$PointerTo_Named_project$diskFile(file);
            }
        }
        let newEntry: memoizedDiskFile = new memoizedDiskFile(sync__from_gostdlib.OnceValue<FileHandle | undefined>((): FileHandle | undefined => {
            {
                const __gotots_receiver_1: SnapshotFS["fs"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
                const __gotots_argument_3 = fileName;
                const __gotots_results_2 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_1).ReadFile(__gotots_argument_3);
                let contents = __gotots_results_2[0];
                let ok = __gotots_results_2[1];
                if (ok) {
                    return new $goInterfaceAdapter$PointerTo_Named_project$diskFile(newDiskFile(fileName, contents));
                }
            }
            return void 0;
        }));
        const __gotots_store_0 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_results_3 = SyncMap$LoadOrStore$Named_tspath$Path$Named_project$memoizedDiskFile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "readFiles"), path, newEntry);
        let entry: memoizedDiskFile = __gotots_results_3[0];
        const __gotots_callee_3 = entry.$value;
        return (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))();
    }
    static $go$private$project$expandRealpathAliases(s: {
        value: SnapshotFS;
    } | undefined, change: FileChangeSummary): FileChangeSummary {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModulesRealpathAliases.length() === 0) {
            return FileChangeSummary.$copy(change);
        }
        let additionalChanged = Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
            return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil();
        });
        const additionalChanged$location = tsonicTypeScriptRuntime.boundLocation({}, () => additionalChanged, additionalChanged$next => additionalChanged = additionalChanged$next);
        const __gotots_store_9 = change;
        const __gotots_range_5 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Changed"));
        const __gotots_range_keys_5 = __gotots_range_5.keys();
        for (const __gotots_range_value_15 of __gotots_range_keys_5) {
            const __gotots_range_value_16 = __gotots_range_5.lookupOk(__gotots_range_value_15);
            if (!__gotots_range_value_16[1]) {
                continue;
            }
            const __gotots_range_value_17 = __gotots_range_value_15;
            let uri = __gotots_range_value_17;
            const __gotots_callee_7: SnapshotFS["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_9 = uri.FileName();
            let path = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9);
            {
                const __gotots_results_10 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModulesRealpathAliases.lookupOk(path);
                let aliases: tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined = __gotots_results_10[0];
                let ok = __gotots_results_10[1];
                if (ok) {
                    const __gotots_store_10 = ((aliases ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<realpathAliasSet>).value;
                    const __gotots_range_6 = Set$Keys$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "paths"));
                    const __gotots_range_keys_6 = __gotots_range_6.keys();
                    for (const __gotots_range_value_18 of __gotots_range_keys_6) {
                        const __gotots_range_value_19 = __gotots_range_6.lookupOk(__gotots_range_value_18);
                        if (!__gotots_range_value_19[1]) {
                            continue;
                        }
                        const __gotots_range_value_20 = __gotots_range_value_18;
                        let aliasPath = __gotots_range_value_20;
                        Set$Add$Named_lsproto$DocumentUri(additionalChanged$location, FileNameToDocumentURI__from_lsconv(aliasPath.$value));
                    }
                }
            }
        }
        const __gotots_range_7 = Set$Keys$Named_lsproto$DocumentUri(additionalChanged$location);
        const __gotots_range_keys_7 = __gotots_range_7.keys();
        for (const __gotots_range_value_21 of __gotots_range_keys_7) {
            const __gotots_range_value_22 = __gotots_range_7.lookupOk(__gotots_range_value_21);
            if (!__gotots_range_value_22[1]) {
                continue;
            }
            const __gotots_range_value_23 = __gotots_range_value_21;
            let uri = __gotots_range_value_23;
            const __gotots_store_11 = change;
            Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Changed"), uri);
        }
        let additionalDeleted = Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
            return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil();
        });
        const additionalDeleted$location = tsonicTypeScriptRuntime.boundLocation({}, () => additionalDeleted, additionalDeleted$next => additionalDeleted = additionalDeleted$next);
        const __gotots_store_12 = change;
        const __gotots_range_8 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Deleted"));
        const __gotots_range_keys_8 = __gotots_range_8.keys();
        for (const __gotots_range_value_24 of __gotots_range_keys_8) {
            const __gotots_range_value_25 = __gotots_range_8.lookupOk(__gotots_range_value_24);
            if (!__gotots_range_value_25[1]) {
                continue;
            }
            const __gotots_range_value_26 = __gotots_range_value_24;
            let uri = __gotots_range_value_26;
            const __gotots_callee_8: SnapshotFS["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_10 = uri.FileName();
            let path = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10);
            {
                const __gotots_results_11 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModulesRealpathAliases.lookupOk(path);
                let aliases: tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined = __gotots_results_11[0];
                let ok = __gotots_results_11[1];
                if (ok) {
                    const __gotots_store_13 = ((aliases ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<realpathAliasSet>).value;
                    const __gotots_range_9 = Set$Keys$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "paths"));
                    const __gotots_range_keys_9 = __gotots_range_9.keys();
                    for (const __gotots_range_value_27 of __gotots_range_keys_9) {
                        const __gotots_range_value_28 = __gotots_range_9.lookupOk(__gotots_range_value_27);
                        if (!__gotots_range_value_28[1]) {
                            continue;
                        }
                        const __gotots_range_value_29 = __gotots_range_value_27;
                        let aliasPath = __gotots_range_value_29;
                        Set$Add$Named_lsproto$DocumentUri(additionalDeleted$location, FileNameToDocumentURI__from_lsconv(aliasPath.$value));
                    }
                }
            }
        }
        const __gotots_range_10 = Set$Keys$Named_lsproto$DocumentUri(additionalDeleted$location);
        const __gotots_range_keys_10 = __gotots_range_10.keys();
        for (const __gotots_range_value_30 of __gotots_range_keys_10) {
            const __gotots_range_value_31 = __gotots_range_10.lookupOk(__gotots_range_value_30);
            if (!__gotots_range_value_31[1]) {
                continue;
            }
            const __gotots_range_value_32 = __gotots_range_value_30;
            let uri = __gotots_range_value_32;
            const __gotots_store_14 = change;
            Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "Deleted"), uri);
        }
        return FileChangeSummary.$copy(change);
    }
    static $go$private$project$isFile(s: {
        value: SnapshotFS;
    } | undefined, path: Path__from_tspath): bool {
        {
            const __gotots_results_41 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles.lookupOk(path);
            let ok = __gotots_results_41[1];
            if (ok) {
                return true;
            }
        }
        {
            const __gotots_results_42 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays.lookupOk(path);
            let ok = __gotots_results_42[1];
            if (ok) {
                return true;
            }
        }
        return false;
    }
    static $go$private$project$isOpenFile(s: {
        value: SnapshotFS;
    } | undefined, fileName: gostring): bool {
        const __gotots_callee_16: SnapshotFS["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_20 = fileName;
        let path = (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20);
        const __gotots_results_24 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays.lookupOk(path);
        let ok = __gotots_results_24[1];
        return ok;
    }
}
export class memoizedDiskFile implements GoContainerStoredValue<(() => FileHandle | undefined) | undefined> {
    declare private readonly $goType: void;
    constructor(public readonly $value: (() => FileHandle | undefined) | undefined) {
    }
    declare readonly [$goContainerStorageType]: (() => FileHandle | undefined) | undefined;
    declare private readonly then?: never;
}
export class snapshotFSBuilder {
    declare private readonly $goType: void;
    public constructor(public fs: FS__from_vfs | undefined, public prevOverlays: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Overlay> | undefined>, public overlays: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Overlay> | undefined>, public overlayDirectories: GoMapValue<Path__from_tspath, GoMapValue<Path__from_tspath, gostring>>, public diskFiles: {
        value: SyncMap__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>;
    } | undefined, public diskDirectories: {
        value: Map__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>;
    } | undefined, public nodeModulesRealpathAliases: {
        value: SyncMap__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined>;
    } | undefined, public toPath: (($0: gostring) => Path__from_tspath) | undefined) {
    }
    static $copy($source: snapshotFSBuilder): snapshotFSBuilder {
        return new snapshotFSBuilder($source.fs, $source.prevOverlays, $source.overlays, $source.overlayDirectories, $source.diskFiles, $source.diskDirectories, $source.nodeModulesRealpathAliases, $source.toPath);
    }
    declare private readonly then?: never;
    static FS(s: {
        value: snapshotFSBuilder;
    } | undefined): FS__from_vfs | undefined {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
    }
    static FileExists(s: {
        value: snapshotFSBuilder;
    } | undefined, fileName: gostring, path: Path__from_tspath): bool {
        {
            const __gotots_results_33 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays.lookupOk(path);
            let ok = __gotots_results_33[1];
            if (ok) {
                return true;
            }
        }
        {
            const __gotots_results_34 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$diskFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, path);
            let entry: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>> | undefined = __gotots_results_34[0];
            let ok = __gotots_results_34[1];
            if (ok) {
                let val: tsonicTypeScriptRuntime.Location<diskFile> | undefined = SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$diskFile(entry);
                if (val === undefined) {
                    return false;
                }
                return !(snapshotFSBuilder.$go$private$project$reloadEntryIfNeeded(s, entry) === undefined);
            }
        }
        const __gotots_receiver_28: snapshotFSBuilder["fs"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_37 = fileName;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_28).FileExists(__gotots_argument_37);
    }
    static Finalize(s: {
        value: snapshotFSBuilder;
    } | undefined): [
        {
            value: SnapshotFS;
        } | undefined,
        bool
    ] {
        let onDeletedFileOrDirectory: (($0: Path__from_tspath) => void) | undefined;
        let deleted: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined> = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$diskFile.nil();
        let onAddedFile: (($0: Path__from_tspath, $1: gostring) => void) | undefined = (path: Path__from_tspath, fileName: gostring): void => {
            let childPath = path;
            let child = fileName;
            for (;;) {
                let parentPath = childPath.GetDirectoryPath();
                let parent = GetDirectoryPath__from_tspath(child);
                if (childPath.$value === parentPath.$value) {
                    break;
                }
                let baseName = GetBaseFileName__from_tspath(child);
                {
                    const __gotots_results_16 = Map$Get$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskDirectories, parentPath);
                    let dirEntry: tsonicTypeScriptRuntime.Location<MapEntry__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>> | undefined = __gotots_results_16[0];
                    let ok = __gotots_results_16[1];
                    if (ok) {
                        MapEntry$Change$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string(dirEntry, (dir: CloneableMap__from_dirty<Path__from_tspath, gostring>): void => {
                            dir.$value.store(childPath, baseName);
                        });
                        break;
                    }
                    else {
                        let dir: CloneableMap__from_dirty<Path__from_tspath, gostring> = new CloneableMap__from_dirty(GoMap.make(0, []));
                        dir.$value.store(childPath, baseName);
                        Map$Add$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskDirectories, parentPath, dir);
                    }
                }
                childPath = parentPath;
                child = parent;
            }
        };
        onDeletedFileOrDirectory = (path: Path__from_tspath): void => {
            const __gotots_results_17 = Map$Get$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskDirectories, path.GetDirectoryPath());
            let dirEntry: tsonicTypeScriptRuntime.Location<MapEntry__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>> | undefined = __gotots_results_17[0];
            let ok = __gotots_results_17[1];
            if (!ok) {
                return;
            }
            MapEntry$Change$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string(dirEntry, (dir: CloneableMap__from_dirty<Path__from_tspath, gostring>): void => {
                dir.$value.delete(path);
                if (dir.$value.length() === 0) {
                    MapEntry$Delete$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string(dirEntry);
                    const __gotots_callee_13 = onDeletedFileOrDirectory;
                    const __gotots_store_27 = MapEntry__from_dirty.$storageOf(((dirEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MapEntry__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>>).value);
                    const __gotots_argument_15 = mapEntry$Key$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string(new $ProjectedPropertyLocation(__gotots_store_27, "mapEntry", mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf));
                    (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15);
                }
            });
        };
        const __gotots_results_18 = SyncMap$FinalizeWith$Named_tspath$Path$PointerTo_Named_project$diskFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, FinalizationHooks__from_dirty.$fromStorage<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>({
            OnDelete: (key: Path__from_tspath, value: tsonicTypeScriptRuntime.Location<diskFile> | undefined): void => {
                if (deleted.isNil()) {
                    deleted = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$diskFile.make(0, []);
                }
                deleted.store(key, value);
            },
            OnAdd: (key: Path__from_tspath, value: tsonicTypeScriptRuntime.Location<diskFile> | undefined): void => {
                const __gotots_callee_14 = onAddedFile;
                const __gotots_argument_16 = key;
                const __gotots_store_28 = ((value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value;
                const __gotots_argument_17 = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "fileBase"));
                (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16, __gotots_argument_17);
            },
            OnChange: void 0
        }));
        let diskFiles: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined> = __gotots_results_18[0];
        let changed = __gotots_results_18[1];
        const __gotots_range_14 = deleted;
        const __gotots_range_keys_14 = __gotots_range_14.keys();
        for (const __gotots_range_value_42 of __gotots_range_keys_14) {
            const __gotots_range_value_43 = __gotots_range_14.lookupOk(__gotots_range_value_42);
            if (!__gotots_range_value_43[1]) {
                continue;
            }
            const __gotots_range_value_44 = __gotots_range_value_42;
            let path = __gotots_range_value_44;
            const __gotots_callee_15 = onDeletedFileOrDirectory;
            const __gotots_argument_18 = path;
            (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_18);
        }
        const __gotots_range_15 = deleted;
        const __gotots_range_keys_15 = __gotots_range_15.keys();
        for (const __gotots_range_value_45 of __gotots_range_keys_15) {
            const __gotots_range_value_46 = __gotots_range_15.lookupOk(__gotots_range_value_45);
            if (!__gotots_range_value_46[1]) {
                continue;
            }
            const __gotots_range_value_47 = __gotots_range_value_45;
            const __gotots_range_value_48 = __gotots_range_value_46[0];
            let deletedPath = __gotots_range_value_47;
            let deletedFile: tsonicTypeScriptRuntime.Location<diskFile> | undefined = __gotots_range_value_48;
            if (((deletedFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.realpathPath.$value ===
                ((void Path__from_tspath,
                    "") as string)) {
                continue;
            }
            {
                const __gotots_results_19 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModulesRealpathAliases, ((deletedFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.realpathPath);
                let entry: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined>> | undefined = __gotots_results_19[0];
                let ok = __gotots_results_19[1];
                if (ok) {
                    SyncMapEntry$Locked$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet(entry, (e: Value__from_dirty<tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined> | undefined): void => {
                        const __gotots_receiver_3 = e;
                        const __gotots_argument_19 = (aliasSet: tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined): void => {
                            const __gotots_store_29 = ((aliasSet ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<realpathAliasSet>).value;
                            Set__from_collections.Delete<Path__from_tspath>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "paths"), deletedPath);
                        };
                        goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined>>(__gotots_receiver_3).Change(__gotots_argument_19);
                        const __gotots_receiver_4 = e;
                        const __gotots_store_30 = ((goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined>>(__gotots_receiver_4).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<realpathAliasSet>).value;
                        const __gotots_binary_operand_4 = Set$Len$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "paths"));
                        const __gotots_binary_operand_5 = 0;
                        if (__gotots_binary_operand_4 === __gotots_binary_operand_5) {
                            const __gotots_receiver_5 = e;
                            goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined>>(__gotots_receiver_5).Delete();
                        }
                    });
                }
            }
        }
        const __gotots_results_20 = SyncMap$Finalize$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModulesRealpathAliases);
        let nodeModulesRealpathAliases: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined> = __gotots_results_20[0];
        let aliasesChanged = __gotots_results_20[1];
        const __gotots_field_0: snapshotFSBuilder["fs"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_field_1: snapshotFSBuilder["overlays"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays;
        const __gotots_field_2: snapshotFSBuilder["overlayDirectories"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlayDirectories;
        const __gotots_field_3 = diskFiles;
        const __gotots_results_21 = Map$Finalize$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskDirectories);
        const __gotots_field_4 = FirstResult$MapOf_Named_tspath$Path_To_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string(__gotots_results_21[0], RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$bool(__gotots_results_21[1])]));
        const __gotots_results_22 = { value: new SnapshotFS((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath, __gotots_field_0, __gotots_field_1, __gotots_field_2, __gotots_field_3, __gotots_field_4, SyncMap__from_collections.$zero<Path__from_tspath, memoizedDiskFile>(), nodeModulesRealpathAliases) };
        const __gotots_results_23 = changed || aliasesChanged;
        return [__gotots_results_22, __gotots_results_23];
    }
    static GetAccessibleEntries(s: {
        value: snapshotFSBuilder;
    } | undefined, path: gostring): Entries__from_vfs {
        const __gotots_receiver_29: snapshotFSBuilder["fs"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_38 = path;
        let entries = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_29).GetAccessibleEntries(__gotots_argument_38);
        const __gotots_map_0: snapshotFSBuilder["overlayDirectories"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlayDirectories;
        const __gotots_callee_21: snapshotFSBuilder["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_39 = path;
        const __gotots_map_1 = (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_39);
        const __gotots_results_35 = __gotots_map_0.lookupOk(__gotots_map_1);
        let overlayDirectories: GoMapValue<Path__from_tspath, gostring> = __gotots_results_35[0];
        let ok = __gotots_results_35[1];
        if (!ok) {
            return Entries__from_vfs.$copy(entries);
        }
        const __gotots_argument_40 = overlayDirectories;
        const __gotots_receiver_30 = s;
        const __gotots_argument_41 = ($argument0: Path__from_tspath): bool => {
            return snapshotFSBuilder.$go$private$project$isOpenFile(__gotots_receiver_30, $argument0);
        };
        const __gotots_argument_42 = entries;
        readDirectoryIntoEntries$MapOf_Named_tspath$Path_To_string(__gotots_argument_40, __gotots_argument_41, __gotots_argument_42);
        return Entries__from_vfs.$copy(entries);
    }
    static GetFile(s: {
        value: snapshotFSBuilder;
    } | undefined, fileName: gostring): FileHandle | undefined {
        const __gotots_callee_22: snapshotFSBuilder["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_43 = fileName;
        let path = (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_43);
        return snapshotFSBuilder.GetFileByPath(s, fileName, path);
    }
    static GetFileByPath(s: {
        value: snapshotFSBuilder;
    } | undefined, fileName: gostring, path: Path__from_tspath): FileHandle | undefined {
        {
            const __gotots_results_36 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays.lookupOk(path);
            let file: tsonicTypeScriptRuntime.Location<Overlay> | undefined = __gotots_results_36[0];
            let ok = __gotots_results_36[1];
            if (ok) {
                return new GoInterfaceAdapter(file);
            }
        }
        return snapshotFSBuilder.$go$private$project$getDiskFile(s, fileName, path, false);
    }
    static $go$private$project$collectFilesRecursive(s: {
        value: snapshotFSBuilder;
    } | undefined, dirPath: Path__from_tspath, files: tsonicTypeScriptRuntime.Location<Set__from_collections<DocumentUri__from_lsproto>> | undefined): void {
        const __gotots_results_25 = Map$Get$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskDirectories, dirPath);
        let dirEntry: tsonicTypeScriptRuntime.Location<MapEntry__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>> | undefined = __gotots_results_25[0];
        let ok = __gotots_results_25[1];
        if (!ok) {
            return;
        }
        const __gotots_store_31 = MapEntry__from_dirty.$storageOf(((dirEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MapEntry__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>>).value);
        const __gotots_range_16 = mapEntry$Value$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string(new $ProjectedPropertyLocation(__gotots_store_31, "mapEntry", mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)).$value;
        const __gotots_range_keys_16 = __gotots_range_16.keys();
        for (const __gotots_range_value_49 of __gotots_range_keys_16) {
            const __gotots_range_value_50 = __gotots_range_16.lookupOk(__gotots_range_value_49);
            if (!__gotots_range_value_50[1]) {
                continue;
            }
            const __gotots_range_value_51 = __gotots_range_value_49;
            let childPath = __gotots_range_value_51;
            {
                const __gotots_results_26 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$diskFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, childPath);
                let entry: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>> | undefined = __gotots_results_26[0];
                let ok__shadow_1 = __gotots_results_26[1];
                if (ok__shadow_1) {
                    {
                        let file: tsonicTypeScriptRuntime.Location<diskFile> | undefined = SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$diskFile(entry);
                        if (!(file === undefined)) {
                            const __gotots_receiver_6 = files;
                            const __gotots_store_32 = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value;
                            const __gotots_argument_21 = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "fileBase"));
                            const __gotots_argument_22 = FileNameToDocumentURI__from_lsconv(__gotots_argument_21);
                            Set$Add$Named_lsproto$DocumentUri(__gotots_receiver_6, __gotots_argument_22);
                        }
                    }
                }
            }
            snapshotFSBuilder.$go$private$project$collectFilesRecursive(s, childPath, files);
        }
    }
    static $go$private$project$convertOpenAndCloseToChanges(s: {
        value: snapshotFSBuilder;
    } | undefined, change: FileChangeSummary): FileChangeSummary {
        if (!(change.Opened.$value ===
            ((void DocumentUri__from_lsproto,
                "") as string)) && !IsDynamicFileName__from_tspath(change.Opened.FileName())) {
            const __gotots_callee_11: snapshotFSBuilder["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_13 = change.Opened.FileName();
            let path = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13);
            {
                const __gotots_results_14 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$diskFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, path);
                let entry: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>> | undefined = __gotots_results_14[0];
                let ok = __gotots_results_14[1];
                let __gotots_logical_result_0 = !ok;
                if (!__gotots_logical_result_0) {
                    const __gotots_store_17 = SyncMapEntry__from_dirty.$storageOf(((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>>).value);
                    __gotots_logical_result_0 = mapEntry$Original$Named_tspath$Path$PointerTo_Named_project$diskFile(new $ProjectedPropertyLocation(__gotots_store_17, "mapEntry", mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)) === undefined;
                }
                if (__gotots_logical_result_0) {
                    const __gotots_store_18 = change;
                    Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "Created"), change.Opened);
                }
                else {
                    const __gotots_results_15 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays.lookupOk(path);
                    let overlay: tsonicTypeScriptRuntime.Location<Overlay> | undefined = __gotots_results_15[0];
                    let ok__shadow_1 = __gotots_results_15[1];
                    if (ok__shadow_1) {
                        {
                            const __gotots_store_19 = SyncMapEntry__from_dirty.$storageOf(((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>>).value);
                            let diskFile__shadow_1: tsonicTypeScriptRuntime.Location<diskFile> | undefined = mapEntry$Original$Named_tspath$Path$PointerTo_Named_project$diskFile(new $ProjectedPropertyLocation(__gotots_store_19, "mapEntry", mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf));
                            let __gotots_logical_result_1 = !(diskFile__shadow_1 === undefined);
                            if (__gotots_logical_result_1) {
                                const __gotots_store_20 = ((overlay ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value;
                                const __gotots_equal_operand_0 = fileBase.Hash(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "fileBase"));
                                const __gotots_store_21 = ((diskFile__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value;
                                __gotots_logical_result_1 = !Uint128__from_xxh3.$equal(__gotots_equal_operand_0, fileBase.Hash(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "fileBase")));
                            }
                            if (__gotots_logical_result_1) {
                                const __gotots_store_22 = change;
                                Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "Changed"), change.Opened);
                            }
                        }
                    }
                }
            }
        }
        const __gotots_store_23 = change;
        const __gotots_range_13 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "Closed"));
        const __gotots_range_keys_13 = __gotots_range_13.keys();
        for (const __gotots_range_value_39 of __gotots_range_keys_13) {
            const __gotots_range_value_40 = __gotots_range_13.lookupOk(__gotots_range_value_39);
            if (!__gotots_range_value_40[1]) {
                continue;
            }
            const __gotots_range_value_41 = __gotots_range_value_39;
            let uri = __gotots_range_value_41;
            let fileName = uri.FileName();
            if (IsDynamicFileName__from_tspath(fileName)) {
                continue;
            }
            const __gotots_callee_12: snapshotFSBuilder["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_14 = fileName;
            let path = (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14);
            {
                let fh: FileHandle | undefined = snapshotFSBuilder.$go$private$project$getDiskFile(s, fileName, path, true);
                if (!(fh === undefined)) {
                    const __gotots_receiver_2 = fh;
                    const __gotots_equal_operand_1 = goInterfaceNonNil<FileHandle>(__gotots_receiver_2).Hash();
                    const __gotots_store_24 = (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.prevOverlays.lookup(path) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value;
                    if (!Uint128__from_xxh3.$equal(__gotots_equal_operand_1, fileBase.Hash(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "fileBase")))) {
                        const __gotots_store_25 = change;
                        Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "Changed"), uri);
                    }
                    continue;
                }
            }
            const __gotots_store_26 = change;
            Set$Add$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "Deleted"), uri);
        }
        return FileChangeSummary.$copy(change);
    }
    static $go$private$project$expandAndFilterWatchEvents(s: {
        value: snapshotFSBuilder;
    } | undefined, change: FileChangeSummary): FileChangeSummary {
        const __gotots_store_5 = change;
        const __gotots_binary_operand_0 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Deleted"));
        const __gotots_binary_operand_1 = 0;
        if (__gotots_binary_operand_0 > __gotots_binary_operand_1) {
            let filteredDeleted = Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
                return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil();
            });
            const filteredDeleted$location = tsonicTypeScriptRuntime.boundLocation({}, () => filteredDeleted, filteredDeleted$next => filteredDeleted = filteredDeleted$next);
            const __gotots_store_6 = change;
            const __gotots_range_3 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Deleted"));
            const __gotots_range_keys_3 = __gotots_range_3.keys();
            for (const __gotots_range_value_9 of __gotots_range_keys_3) {
                const __gotots_range_value_10 = __gotots_range_3.lookupOk(__gotots_range_value_9);
                if (!__gotots_range_value_10[1]) {
                    continue;
                }
                const __gotots_range_value_11 = __gotots_range_value_9;
                let uri = __gotots_range_value_11;
                const __gotots_callee_6: snapshotFSBuilder["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
                const __gotots_argument_8 = uri.FileName();
                let path = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8);
                {
                    const __gotots_results_9 = Map$Get$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskDirectories, path);
                    let ok = __gotots_results_9[1];
                    if (ok) {
                        snapshotFSBuilder.$go$private$project$collectFilesRecursive(s, path, filteredDeleted$location);
                    }
                    else if (snapshotFSBuilder.$go$private$project$isRelevantFileName(s, uri)) {
                        Set$Add$Named_lsproto$DocumentUri(filteredDeleted$location, uri);
                    }
                }
            }
            change.Deleted = Set__from_collections.$copy<DocumentUri__from_lsproto>(filteredDeleted);
        }
        const __gotots_store_7 = change;
        const __gotots_binary_operand_2 = Set$Len$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Changed"));
        const __gotots_binary_operand_3 = 0;
        if (__gotots_binary_operand_2 > __gotots_binary_operand_3) {
            let filteredChanged = Set__from_collections.$zero<DocumentUri__from_lsproto>((): GoMapValue<DocumentUri__from_lsproto, GoEmptyStruct> => {
                return $goMap$MapOf_Named_lsproto$DocumentUri_To_Struct_void.nil();
            });
            const filteredChanged$location = tsonicTypeScriptRuntime.boundLocation({}, () => filteredChanged, filteredChanged$next => filteredChanged = filteredChanged$next);
            const __gotots_store_8 = change;
            const __gotots_range_4 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Changed"));
            const __gotots_range_keys_4 = __gotots_range_4.keys();
            for (const __gotots_range_value_12 of __gotots_range_keys_4) {
                const __gotots_range_value_13 = __gotots_range_4.lookupOk(__gotots_range_value_12);
                if (!__gotots_range_value_13[1]) {
                    continue;
                }
                const __gotots_range_value_14 = __gotots_range_value_12;
                let uri = __gotots_range_value_14;
                if (snapshotFSBuilder.$go$private$project$isRelevantFileName(s, uri)) {
                    Set$Add$Named_lsproto$DocumentUri(filteredChanged$location, uri);
                }
            }
            change.Changed = Set__from_collections.$copy<DocumentUri__from_lsproto>(filteredChanged);
        }
        return FileChangeSummary.$copy(change);
    }
    static $go$private$project$getDiskFile(s: {
        value: snapshotFSBuilder;
    } | undefined, fileName: gostring, path: Path__from_tspath, forceReload: bool): FileHandle | undefined {
        const __gotots_results_28 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_project$diskFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, path, tsonicTypeScriptRuntime.location<diskFile>(new diskFile(new fileBase(fileName, "", Uint128__from_xxh3.$zero(), named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero(), void 0), true, new Path__from_tspath(""))));
        let entry: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>> | undefined = __gotots_results_28[0];
        let loaded = __gotots_results_28[1];
        if (!(entry === undefined)) {
            if (!loaded && strings__from_gostdlib.Contains(path.$value, "/node_modules/")) {
                snapshotFSBuilder.$go$private$project$recordRealpathAlias(s, entry, fileName, path);
            }
            if (forceReload) {
                return snapshotFSBuilder.$go$private$project$reloadEntry(s, entry);
            }
            return snapshotFSBuilder.$go$private$project$reloadEntryIfNeeded(s, entry);
        }
        return void 0;
    }
    static $go$private$project$invalidateCache(s: {
        value: snapshotFSBuilder;
    } | undefined): void {
        SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$diskFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, (entry: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>> | undefined): bool => {
            SyncMapEntry$Change$Named_tspath$Path$PointerTo_Named_project$diskFile(entry, (file: tsonicTypeScriptRuntime.Location<diskFile> | undefined): void => {
                ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.needsReload = true;
            });
            return true;
        });
    }
    static $go$private$project$invalidateNodeModulesCache(s: {
        value: snapshotFSBuilder;
    } | undefined): void {
        SyncMap$Range$Named_tspath$Path$PointerTo_Named_project$diskFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, (entry: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>> | undefined): bool => {
            const __gotots_store_4 = SyncMapEntry__from_dirty.$storageOf(((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>>).value);
            const __gotots_argument_6 = mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$diskFile(new $ProjectedPropertyLocation(__gotots_store_4, "mapEntry", mapEntry__from_dirty.$fromStorage, mapEntry__from_dirty.$storageOf)).$value;
            const __gotots_argument_7 = "/node_modules/";
            if (strings__from_gostdlib.Contains(__gotots_argument_6, __gotots_argument_7)) {
                SyncMapEntry$Change$Named_tspath$Path$PointerTo_Named_project$diskFile(entry, (file: tsonicTypeScriptRuntime.Location<diskFile> | undefined): void => {
                    ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.needsReload = true;
                });
            }
            return true;
        });
    }
    static $go$private$project$isOpenFile(s: {
        value: snapshotFSBuilder;
    } | undefined, path: Path__from_tspath): bool {
        const __gotots_results_29 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays.lookupOk(path);
        let ok = __gotots_results_29[1];
        return ok;
    }
    static $go$private$project$isRelevantFileName(s: {
        value: snapshotFSBuilder;
    } | undefined, uri: DocumentUri__from_lsproto): bool {
        let fileName = uri.FileName();
        if (IsDynamicFileName__from_tspath(fileName)) {
            return true;
        }
        const __gotots_callee_17: snapshotFSBuilder["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_23 = fileName;
        let path = (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23);
        {
            const __gotots_results_27 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overlays.lookupOk(path);
            let ok = __gotots_results_27[1];
            if (ok) {
                return true;
            }
        }
        let i = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(path.$value, 46)));
        if (i < 0) {
            return false;
        }
        switch (goStringSlice(path.$value, i)) {
            case ".js":
            case ".jsx":
            case ".mjs":
            case ".cjs":
            case ".ts":
            case ".tsx":
            case ".mts":
            case ".cts":
            case ".json": {
                return true;
                break;
            }
        }
        return false;
    }
    static $go$private$project$markDirtyFiles(s: {
        value: snapshotFSBuilder;
    } | undefined, change: FileChangeSummary): void {
        const __gotots_store_15 = change;
        const __gotots_range_11 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "Changed"));
        const __gotots_range_keys_11 = __gotots_range_11.keys();
        for (const __gotots_range_value_33 of __gotots_range_keys_11) {
            const __gotots_range_value_34 = __gotots_range_11.lookupOk(__gotots_range_value_33);
            if (!__gotots_range_value_34[1]) {
                continue;
            }
            const __gotots_range_value_35 = __gotots_range_value_33;
            let uri = __gotots_range_value_35;
            const __gotots_callee_9: snapshotFSBuilder["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_11 = uri.FileName();
            let path = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_11);
            {
                const __gotots_results_12 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$diskFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, path);
                let entry: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>> | undefined = __gotots_results_12[0];
                let ok = __gotots_results_12[1];
                if (ok) {
                    SyncMapEntry$Change$Named_tspath$Path$PointerTo_Named_project$diskFile(entry, (file: tsonicTypeScriptRuntime.Location<diskFile> | undefined): void => {
                        ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.needsReload = true;
                    });
                }
            }
        }
        const __gotots_store_16 = change;
        const __gotots_range_12 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "Deleted"));
        const __gotots_range_keys_12 = __gotots_range_12.keys();
        for (const __gotots_range_value_36 of __gotots_range_keys_12) {
            const __gotots_range_value_37 = __gotots_range_12.lookupOk(__gotots_range_value_36);
            if (!__gotots_range_value_37[1]) {
                continue;
            }
            const __gotots_range_value_38 = __gotots_range_value_36;
            let uri = __gotots_range_value_38;
            const __gotots_callee_10: snapshotFSBuilder["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_12 = uri.FileName();
            let path = (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12);
            {
                const __gotots_results_13 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$diskFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, path);
                let entry: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>> | undefined = __gotots_results_13[0];
                let ok = __gotots_results_13[1];
                if (ok) {
                    SyncMapEntry$Delete$Named_tspath$Path$PointerTo_Named_project$diskFile(entry);
                }
            }
        }
    }
    static $go$private$project$recordRealpathAlias(s: {
        value: snapshotFSBuilder;
    } | undefined, diskFileEntry: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>> | undefined, symlinkFileName: gostring, symlinkPath: Path__from_tspath): void {
        const __gotots_receiver_7: snapshotFSBuilder["fs"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_24 = symlinkFileName;
        let realpath = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_7).Realpath(__gotots_argument_24);
        const __gotots_callee_18: snapshotFSBuilder["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_25 = realpath;
        let realpathPath = (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25);
        if (!(realpathPath.$value === symlinkPath.$value)) {
            SyncMapEntry$Change$Named_tspath$Path$PointerTo_Named_project$diskFile(diskFileEntry, (file: tsonicTypeScriptRuntime.Location<diskFile> | undefined): void => {
                ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.realpathPath = realpathPath;
            });
            const __gotots_results_30 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModulesRealpathAliases, realpathPath, tsonicTypeScriptRuntime.location<realpathAliasSet>(new realpathAliasSet(named_sync.SyncMutexOperations.$zero(), Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
                return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
            }))));
            let entry: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined>> | undefined = __gotots_results_30[0];
            SyncMapEntry$Change$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet(entry, (aliasSet: tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined): void => {
                realpathAliasSet.Add(aliasSet, symlinkPath);
            });
        }
    }
    static $go$private$project$reloadEntry(s: {
        value: snapshotFSBuilder;
    } | undefined, entry: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>> | undefined): FileHandle | undefined {
        let fileName = "";
        SyncMapEntry$Locked$Named_tspath$Path$PointerTo_Named_project$diskFile(entry, (e: Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined> | undefined): void => {
            const __gotots_receiver_8 = e;
            if (!(goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined>>(__gotots_receiver_8).Value() === undefined)) {
                const __gotots_receiver_9 = e;
                fileName = ((goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined>>(__gotots_receiver_9).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.fileBase.fileName;
            }
        });
        if (fileName === "") {
            return void 0;
        }
        const __gotots_receiver_10: snapshotFSBuilder["fs"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_26 = fileName;
        const __gotots_results_31 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_10).ReadFile(__gotots_argument_26);
        let content = __gotots_results_31[0];
        let ok = __gotots_results_31[1];
        SyncMapEntry$Locked$Named_tspath$Path$PointerTo_Named_project$diskFile(entry, (e: Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined> | undefined): void => {
            const __gotots_receiver_11 = e;
            if (goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined>>(__gotots_receiver_11).Value() === undefined) {
                return;
            }
            if (ok) {
                const __gotots_receiver_12 = e;
                const __gotots_argument_27 = (file: tsonicTypeScriptRuntime.Location<diskFile> | undefined): void => {
                    ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.fileBase.content = content;
                    ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.fileBase.hash = HashString128__from_xxh3(content);
                    ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.needsReload = false;
                };
                goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined>>(__gotots_receiver_12).Change(__gotots_argument_27);
            }
            else {
                const __gotots_receiver_13 = e;
                goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined>>(__gotots_receiver_13).Delete();
            }
        });
        if (SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$diskFile(entry) === undefined) {
            return void 0;
        }
        return new $goInterfaceAdapter$PointerTo_Named_project$diskFile(SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$diskFile(entry));
    }
    static $go$private$project$reloadEntryIfNeeded(s: {
        value: snapshotFSBuilder;
    } | undefined, entry: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>> | undefined): FileHandle | undefined {
        let fileName = "";
        SyncMapEntry$Locked$Named_tspath$Path$PointerTo_Named_project$diskFile(entry, (e: Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined> | undefined): void => {
            const __gotots_receiver_14 = e;
            let __gotots_logical_result_2 = !(goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined>>(__gotots_receiver_14).Value() === undefined);
            if (__gotots_logical_result_2) {
                const __gotots_receiver_15 = e;
                __gotots_logical_result_2 = !diskFile.MatchesDiskText(goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined>>(__gotots_receiver_15).Value());
            }
            if (__gotots_logical_result_2) {
                const __gotots_receiver_16 = e;
                fileName = ((goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined>>(__gotots_receiver_16).Value() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.fileBase.fileName;
            }
        });
        if (fileName !== "") {
            const __gotots_receiver_17: snapshotFSBuilder["fs"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
            const __gotots_argument_28 = fileName;
            const __gotots_results_32 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_17).ReadFile(__gotots_argument_28);
            let content = __gotots_results_32[0];
            let ok = __gotots_results_32[1];
            SyncMapEntry$Locked$Named_tspath$Path$PointerTo_Named_project$diskFile(entry, (e: Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined> | undefined): void => {
                const __gotots_receiver_18 = e;
                let __gotots_logical_result_3 = goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined>>(__gotots_receiver_18).Value() === undefined;
                if (!__gotots_logical_result_3) {
                    const __gotots_receiver_19 = e;
                    __gotots_logical_result_3 = diskFile.MatchesDiskText(goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined>>(__gotots_receiver_19).Value());
                }
                if (__gotots_logical_result_3) {
                    return;
                }
                if (ok) {
                    const __gotots_receiver_20 = e;
                    const __gotots_argument_29 = (file: tsonicTypeScriptRuntime.Location<diskFile> | undefined): void => {
                        ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.fileBase.content = content;
                        ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.fileBase.hash = HashString128__from_xxh3(content);
                        ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<diskFile>).value.needsReload = false;
                    };
                    goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined>>(__gotots_receiver_20).Change(__gotots_argument_29);
                }
                else {
                    const __gotots_receiver_21 = e;
                    goInterfaceNonNil<Value__from_dirty<tsonicTypeScriptRuntime.Location<diskFile> | undefined>>(__gotots_receiver_21).Delete();
                }
            });
        }
        if (SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$diskFile(entry) === undefined) {
            return void 0;
        }
        return new $goInterfaceAdapter$PointerTo_Named_project$diskFile(SyncMapEntry$Value$Named_tspath$Path$PointerTo_Named_project$diskFile(entry));
    }
    static $go$private$project$watchChangesOverlapCache(s: {
        value: snapshotFSBuilder;
    } | undefined, change: FileChangeSummary): bool {
        const __gotots_store_2 = change;
        const __gotots_range_1 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Changed"));
        const __gotots_range_keys_1 = __gotots_range_1.keys();
        for (const __gotots_range_value_3 of __gotots_range_keys_1) {
            const __gotots_range_value_4 = __gotots_range_1.lookupOk(__gotots_range_value_3);
            if (!__gotots_range_value_4[1]) {
                continue;
            }
            const __gotots_range_value_5 = __gotots_range_value_3;
            let uri = __gotots_range_value_5;
            const __gotots_callee_4: snapshotFSBuilder["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_4 = uri.FileName();
            let path = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
            {
                const __gotots_results_5 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$diskFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, path);
                let ok = __gotots_results_5[1];
                if (ok) {
                    return true;
                }
            }
            {
                const __gotots_results_6 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModulesRealpathAliases, path);
                let ok = __gotots_results_6[1];
                if (ok) {
                    return true;
                }
            }
        }
        const __gotots_store_3 = change;
        const __gotots_range_2 = Set$Keys$Named_lsproto$DocumentUri(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Deleted"));
        const __gotots_range_keys_2 = __gotots_range_2.keys();
        for (const __gotots_range_value_6 of __gotots_range_keys_2) {
            const __gotots_range_value_7 = __gotots_range_2.lookupOk(__gotots_range_value_6);
            if (!__gotots_range_value_7[1]) {
                continue;
            }
            const __gotots_range_value_8 = __gotots_range_value_6;
            let uri = __gotots_range_value_8;
            const __gotots_callee_5: snapshotFSBuilder["toPath"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_5 = uri.FileName();
            let path = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
            {
                const __gotots_results_7 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$diskFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diskFiles, path);
                let ok = __gotots_results_7[1];
                if (ok) {
                    return true;
                }
            }
            {
                const __gotots_results_8 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nodeModulesRealpathAliases, path);
                let ok = __gotots_results_8[1];
                if (ok) {
                    return true;
                }
            }
        }
        return false;
    }
}
export function newSnapshotFSBuilder(fs: FS__from_vfs | undefined, prevOverlays: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Overlay> | undefined>, overlays: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Overlay> | undefined>, diskFiles: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>, diskDirectories: GoMapValue<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>, nodeModulesRealpathAliases: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined>, positionEncoding: PositionEncodingKind__from_lsproto, toPath: (($0: gostring) => Path__from_tspath) | undefined): {
    value: snapshotFSBuilder;
} | undefined {
    let cachedFS: {
        value: FS__from_cachedvfs;
    } | undefined = From__from_cachedvfs(fs);
    FS__from_cachedvfs.Enable(cachedFS);
    let overlayDirectories: GoMapValue<Path__from_tspath, GoMapValue<Path__from_tspath, gostring>> = $goMap$MapOf_Named_tspath$Path_To_MapOf_Named_tspath$Path_To_string.make(0, []);
    const __gotots_range_0 = overlays;
    const __gotots_range_keys_0 = __gotots_range_0.keys();
    for (const __gotots_range_value_0 of __gotots_range_keys_0) {
        const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
        if (!__gotots_range_value_1[1]) {
            continue;
        }
        const __gotots_range_value_2 = __gotots_range_value_0;
        let path = __gotots_range_value_2;
        let childPath = path;
        const __gotots_store_1 = ((overlays.lookup(path) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Overlay>).value;
        let child = fileBase.FileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "fileBase"));
        for (;;) {
            let parentPath = childPath.GetDirectoryPath();
            let parent = GetDirectoryPath__from_tspath(child);
            if (childPath.$value === parentPath.$value) {
                break;
            }
            let baseName = GetBaseFileName__from_tspath(child);
            {
                const __gotots_results_4 = overlayDirectories.lookupOk(parentPath);
                let dir: GoMapValue<Path__from_tspath, gostring> = __gotots_results_4[0];
                let ok = __gotots_results_4[1];
                if (ok) {
                    dir.store(childPath, baseName);
                }
                else {
                    let dir__shadow_1: GoMapValue<Path__from_tspath, gostring> = GoMap.make(0, []);
                    overlayDirectories.store(parentPath, dir__shadow_1);
                    dir__shadow_1.store(childPath, baseName);
                }
            }
            childPath = parentPath;
            child = parent;
        }
    }
    return { value: new snapshotFSBuilder(new $goInterfaceAdapter$PointerTo_Named_cachedvfs$FS(cachedFS), prevOverlays, overlays, overlayDirectories, NewSyncMap__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile> | undefined>(diskFiles), NewMap$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string(diskDirectories), NewSyncMap__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet> | undefined>(nodeModulesRealpathAliases), toPath) };
}
export class sourceFS {
    declare private readonly $goType: void;
    public constructor(public tracking: bool, public toPath: (($0: gostring) => Path__from_tspath) | undefined, public missingDirectories: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined, public seenFiles: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined, public source: FileSource | undefined) {
    }
    static $copy($source: sourceFS): sourceFS {
        return new sourceFS($source.tracking, $source.toPath, $source.missingDirectories, $source.seenFiles, $source.source);
    }
    declare private readonly then?: never;
    static AppendFile(fs: {
        value: sourceFS;
    } | undefined, path: gostring, data: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_argument_53 = new $goInterfaceAdapter$string("unimplemented");
        GoPanic.raise(__gotots_argument_53 === undefined ? GoPanicNilValue.create() : __gotots_argument_53);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static Chtimes(fs: {
        value: sourceFS;
    } | undefined, path: gostring, atime: time__from_gostdlib.Time, mtime: time__from_gostdlib.Time): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_argument_54 = new $goInterfaceAdapter$string("unimplemented");
        GoPanic.raise(__gotots_argument_54 === undefined ? GoPanicNilValue.create() : __gotots_argument_54);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static DirectoryExists(fs: {
        value: sourceFS;
    } | undefined, path: gostring): bool {
        const __gotots_receiver_22: sourceFS["source"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source;
        const __gotots_receiver_23 = goInterfaceNonNil<FileSource>(__gotots_receiver_22).FS();
        const __gotots_argument_30 = path;
        let exists = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_23).DirectoryExists(__gotots_argument_30);
        if (!exists && (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracking) {
            const __gotots_receiver_24: sourceFS["missingDirectories"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.missingDirectories;
            const __gotots_callee_19: sourceFS["toPath"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
            const __gotots_argument_31 = path;
            const __gotots_argument_32 = (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_31);
            SyncSet$Add$Named_tspath$Path(__gotots_receiver_24, __gotots_argument_32);
        }
        return exists;
    }
    static DisableTracking(fs: {
        value: sourceFS;
    } | undefined): void {
        (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracking = false;
    }
    static FileExists(fs: {
        value: sourceFS;
    } | undefined, path: gostring): bool {
        sourceFS.Track(fs, path);
        const __gotots_receiver_34: sourceFS["source"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source;
        const __gotots_argument_56 = path;
        const __gotots_callee_25: sourceFS["toPath"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_55 = path;
        const __gotots_argument_57 = (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_55);
        return goInterfaceNonNil<FileSource>(__gotots_receiver_34).FileExists(__gotots_argument_56, __gotots_argument_57);
    }
    static GetAccessibleEntries(fs: {
        value: sourceFS;
    } | undefined, path: gostring): Entries__from_vfs {
        const __gotots_receiver_35: sourceFS["source"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source;
        const __gotots_argument_58 = path;
        return goInterfaceNonNil<FileSource>(__gotots_receiver_35).GetAccessibleEntries(__gotots_argument_58);
    }
    static GetFile(fs: {
        value: sourceFS;
    } | undefined, fileName: gostring): FileHandle | undefined {
        sourceFS.Track(fs, fileName);
        const __gotots_receiver_45: sourceFS["source"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source;
        const __gotots_argument_65 = fileName;
        return goInterfaceNonNil<FileSource>(__gotots_receiver_45).GetFile(__gotots_argument_65);
    }
    static GetFileByPath(fs: {
        value: sourceFS;
    } | undefined, fileName: gostring, path: Path__from_tspath): FileHandle | undefined {
        sourceFS.Track(fs, fileName);
        const __gotots_receiver_26: sourceFS["source"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source;
        const __gotots_argument_33 = fileName;
        const __gotots_argument_34 = path;
        return goInterfaceNonNil<FileSource>(__gotots_receiver_26).GetFileByPath(__gotots_argument_33, __gotots_argument_34);
    }
    static ReadFile(fs: {
        value: sourceFS;
    } | undefined, path: gostring): [
        gostring,
        bool
    ] {
        let contents: gostring = "";
        let ok: bool = false;
        {
            let fh: FileHandle | undefined = sourceFS.GetFile(fs, path);
            if (!(fh === undefined)) {
                const __gotots_receiver_36 = fh;
                const __gotots_results_43 = goInterfaceNonNil<FileHandle>(__gotots_receiver_36).Content();
                const __gotots_results_44 = true;
                return [__gotots_results_43, __gotots_results_44];
            }
        }
        return ["", false];
    }
    static Realpath(fs: {
        value: sourceFS;
    } | undefined, path: gostring): gostring {
        const __gotots_receiver_37: sourceFS["source"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source;
        const __gotots_receiver_38 = goInterfaceNonNil<FileSource>(__gotots_receiver_37).FS();
        const __gotots_argument_59 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_38).Realpath(__gotots_argument_59);
    }
    static Remove(fs: {
        value: sourceFS;
    } | undefined, path: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_argument_60 = new $goInterfaceAdapter$string("unimplemented");
        GoPanic.raise(__gotots_argument_60 === undefined ? GoPanicNilValue.create() : __gotots_argument_60);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static SeenFile(fs: {
        value: sourceFS;
    } | undefined, path: Path__from_tspath): bool {
        if ((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenFiles === undefined) {
            return false;
        }
        return SyncSet$Has$Named_tspath$Path((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenFiles, path);
    }
    static SeenFileOrMissingParentDirectory(fs: {
        value: sourceFS;
    } | undefined, path: Path__from_tspath): bool {
        if (!((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenFiles === undefined) && SyncSet$Has$Named_tspath$Path((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenFiles, path)) {
            return true;
        }
        if (!((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.missingDirectories === undefined) && !SyncSet$IsEmpty$Named_tspath$Path((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.missingDirectories)) {
            for (;;) {
                if (SyncSet$Has$Named_tspath$Path((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.missingDirectories, path)) {
                    return true;
                }
                let parent = path.GetDirectoryPath();
                if (parent.$value === path.$value) {
                    break;
                }
                path = parent;
            }
        }
        return false;
    }
    static Stat(fs: {
        value: sourceFS;
    } | undefined, path: gostring): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined {
        const __gotots_receiver_39: sourceFS["source"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source;
        const __gotots_receiver_40 = goInterfaceNonNil<FileSource>(__gotots_receiver_39).FS();
        const __gotots_argument_61 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_40).Stat(__gotots_argument_61);
    }
    static Track(fs: {
        value: sourceFS;
    } | undefined, fileName: gostring): void {
        if (!(fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracking) {
            return;
        }
        const __gotots_receiver_27: sourceFS["seenFiles"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenFiles;
        const __gotots_callee_20: sourceFS["toPath"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.toPath;
        const __gotots_argument_35 = fileName;
        const __gotots_argument_36 = (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_35);
        SyncSet$Add$Named_tspath$Path(__gotots_receiver_27, __gotots_argument_36);
    }
    static UseCaseSensitiveFileNames(fs: {
        value: sourceFS;
    } | undefined): bool {
        const __gotots_receiver_41: sourceFS["source"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source;
        const __gotots_receiver_42 = goInterfaceNonNil<FileSource>(__gotots_receiver_41).FS();
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_42).UseCaseSensitiveFileNames();
    }
    static WalkDir(fs: {
        value: sourceFS;
    } | undefined, root: gostring, walkFn: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: $goInterface$Interface_Method_Error_void_to_string | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_43: sourceFS["source"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.source;
        const __gotots_receiver_44 = goInterfaceNonNil<FileSource>(__gotots_receiver_43).FS();
        const __gotots_argument_62 = root;
        const __gotots_argument_63 = walkFn;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_44).WalkDir(__gotots_argument_62, __gotots_argument_63);
    }
    static WriteFile(fs: {
        value: sourceFS;
    } | undefined, path: gostring, data: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_argument_64 = new $goInterfaceAdapter$string("unimplemented");
        GoPanic.raise(__gotots_argument_64 === undefined ? GoPanicNilValue.create() : __gotots_argument_64);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
}
export function newSourceFS(tracking: bool, source: FileSource | undefined, toPath: (($0: gostring) => Path__from_tspath) | undefined): {
    value: sourceFS;
} | undefined {
    let fs: {
        value: sourceFS;
    } | undefined = { value: new sourceFS(tracking, toPath, void 0, void 0, source) };
    if (tracking) {
        const __gotots_struct_0 = SyncSet__from_collections.$zero<Path__from_tspath>();
        (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seenFiles =
            tsonicTypeScriptRuntime.location<SyncSet__from_collections<Path__from_tspath>>(__gotots_struct_0);
        const __gotots_struct_1 = SyncSet__from_collections.$zero<Path__from_tspath>();
        (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.missingDirectories =
            tsonicTypeScriptRuntime.location<SyncSet__from_collections<Path__from_tspath>>(__gotots_struct_1);
    }
    return fs;
}
export function readDirectoryIntoEntries$kernel<M>($go$convert$T0_to_MapOf_Named_tspath$Path_To_string: ($0: M) => GoMapValue<Path__from_tspath, gostring>, directories: M, isFile: (($0: Path__from_tspath) => bool) | undefined, entries: Entries__from_vfs | undefined): void {
    const __gotots_range_17 = $go$convert$T0_to_MapOf_Named_tspath$Path_To_string(directories);
    const __gotots_range_keys_17 = __gotots_range_17.keys();
    for (const __gotots_range_value_52 of __gotots_range_keys_17) {
        const __gotots_range_value_53 = __gotots_range_17.lookupOk(__gotots_range_value_52);
        if (!__gotots_range_value_53[1]) {
            continue;
        }
        const __gotots_range_value_54 = __gotots_range_value_52;
        const __gotots_range_value_55 = __gotots_range_value_53[0];
        let childPath = __gotots_range_value_54;
        let childName = __gotots_range_value_55;
        const __gotots_callee_23 = isFile;
        const __gotots_argument_44 = childPath;
        if ((__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_44)) {
            Entries__from_vfs.$storageOf((entries ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).Files = Entries__from_vfs.$storageOf((entries ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).Files.append("", [childName]);
        }
        else {
            Entries__from_vfs.$storageOf((entries ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).Directories = Entries__from_vfs.$storageOf((entries ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).Directories.append("", [childName]);
        }
    }
}
