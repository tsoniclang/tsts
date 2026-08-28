import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Entries$Storage as Entries__from_vfs$Storage, FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Entries as Entries__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import { SyncMap$Load$string$Named_fs$FileInfo, SyncMap$Load$string$Named_vfs$Entries, SyncMap$Load$string$bool, SyncMap$Load$string$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Store$string$Named_fs$FileInfo, SyncMap$Store$string$Named_vfs$Entries, SyncMap$Store$string$bool, SyncMap$Store$string$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class FS {
    declare private readonly $goType: void;
    public constructor(public fs: FS__from_vfs | undefined, public enabled: atomic__from_gostdlib.Bool, public directoryExistsCache: SyncMap__from_collections<gostring, bool>, public fileExistsCache: SyncMap__from_collections<gostring, bool>, public getAccessibleEntriesCache: SyncMap__from_collections<gostring, Entries__from_vfs>, public realpathCache: SyncMap__from_collections<gostring, gostring>, public statCache: SyncMap__from_collections<gostring, GoInterface | undefined>) {
    }
    static $copy($source: FS): FS {
        return new FS($source.fs, named_sync_atomic.SyncAtomicBoolOperations.$copy($source.enabled), SyncMap__from_collections.$copy<gostring, bool>($source.directoryExistsCache), SyncMap__from_collections.$copy<gostring, bool>($source.fileExistsCache), SyncMap__from_collections.$copy<gostring, Entries__from_vfs>($source.getAccessibleEntriesCache), SyncMap__from_collections.$copy<gostring, gostring>($source.realpathCache), SyncMap__from_collections.$copy<gostring, GoInterface | undefined>($source.statCache));
    }
    declare private readonly then?: never;
    static AppendFile(fsys: {
        value: FS;
    } | undefined, path: gostring, data: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_0: FS["fs"] = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_0 = path;
        const __gotots_argument_1 = data;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_0).AppendFile(__gotots_argument_0, __gotots_argument_1);
    }
    static Chtimes(fsys: {
        value: FS;
    } | undefined, path: gostring, aTime: time__from_gostdlib.Time, mTime: time__from_gostdlib.Time): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_1: FS["fs"] = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_2 = path;
        const __gotots_argument_3 = named_time.TimeOperations.$copy(aTime);
        const __gotots_argument_4 = named_time.TimeOperations.$copy(mTime);
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_1).Chtimes(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
    }
    static ClearCache(fsys: {
        value: FS;
    } | undefined): void {
        const __gotots_store_0 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncMap__from_collections.Clear<gostring, bool>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "directoryExistsCache"));
        const __gotots_store_1 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncMap__from_collections.Clear<gostring, bool>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "fileExistsCache"));
        const __gotots_store_2 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncMap__from_collections.Clear<gostring, Entries__from_vfs>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "getAccessibleEntriesCache"));
        const __gotots_store_3 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncMap__from_collections.Clear<gostring, gostring>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "realpathCache"));
        const __gotots_store_4 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncMap__from_collections.Clear<gostring, GoInterface | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "statCache"));
    }
    static DirectoryExists(fsys: {
        value: FS;
    } | undefined, path: gostring): bool {
        if (atomic__from_gostdlib.Bool.Load((fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabled)) {
            {
                const __gotots_store_5 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_results_0 = SyncMap$Load$string$bool(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "directoryExistsCache"), path);
                let ret__shadow_1 = __gotots_results_0[0];
                let ok = __gotots_results_0[1];
                if (ok) {
                    return ret__shadow_1;
                }
            }
        }
        const __gotots_receiver_2: FS["fs"] = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_5 = path;
        let ret = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).DirectoryExists(__gotots_argument_5);
        if (atomic__from_gostdlib.Bool.Load((fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabled)) {
            const __gotots_store_6 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            SyncMap$Store$string$bool(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "directoryExistsCache"), path, ret);
        }
        return ret;
    }
    static DisableAndClearCache(fsys: {
        value: FS;
    } | undefined): void {
        if (atomic__from_gostdlib.Bool.CompareAndSwap((fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabled, true, false)) {
            FS.ClearCache(fsys);
        }
    }
    static Enable(fsys: {
        value: FS;
    } | undefined): void {
        atomic__from_gostdlib.Bool.Store((fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabled, true);
    }
    static FileExists(fsys: {
        value: FS;
    } | undefined, path: gostring): bool {
        if (atomic__from_gostdlib.Bool.Load((fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabled)) {
            {
                const __gotots_store_7 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_results_1 = SyncMap$Load$string$bool(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "fileExistsCache"), path);
                let ret__shadow_1 = __gotots_results_1[0];
                let ok = __gotots_results_1[1];
                if (ok) {
                    return ret__shadow_1;
                }
            }
        }
        const __gotots_receiver_3: FS["fs"] = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_6 = path;
        let ret = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).FileExists(__gotots_argument_6);
        if (atomic__from_gostdlib.Bool.Load((fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabled)) {
            const __gotots_store_8 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            SyncMap$Store$string$bool(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "fileExistsCache"), path, ret);
        }
        return ret;
    }
    static GetAccessibleEntries(fsys: {
        value: FS;
    } | undefined, path: gostring): Entries__from_vfs {
        if (atomic__from_gostdlib.Bool.Load((fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabled)) {
            {
                const __gotots_store_9 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_results_2 = SyncMap$Load$string$Named_vfs$Entries(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "getAccessibleEntriesCache"), path);
                let ret__shadow_1 = __gotots_results_2[0];
                let ok = __gotots_results_2[1];
                if (ok) {
                    return Entries__from_vfs.$copy(ret__shadow_1);
                }
            }
        }
        const __gotots_receiver_4: FS["fs"] = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_7 = path;
        let ret = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_4).GetAccessibleEntries(__gotots_argument_7);
        if (atomic__from_gostdlib.Bool.Load((fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabled)) {
            const __gotots_store_10 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            SyncMap$Store$string$Named_vfs$Entries(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "getAccessibleEntriesCache"), path, Entries__from_vfs.$copy(ret));
        }
        return Entries__from_vfs.$copy(ret);
    }
    static ReadFile(fsys: {
        value: FS;
    } | undefined, path: gostring): [
        gostring,
        bool
    ] {
        let contents: gostring = "";
        let ok: bool = false;
        const __gotots_receiver_5: FS["fs"] = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_8 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_5).ReadFile(__gotots_argument_8);
    }
    static Realpath(fsys: {
        value: FS;
    } | undefined, path: gostring): gostring {
        if (atomic__from_gostdlib.Bool.Load((fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabled)) {
            {
                const __gotots_store_11 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_results_3 = SyncMap$Load$string$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "realpathCache"), path);
                let ret__shadow_1 = __gotots_results_3[0];
                let ok = __gotots_results_3[1];
                if (ok) {
                    return ret__shadow_1;
                }
            }
        }
        const __gotots_receiver_6: FS["fs"] = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_9 = path;
        let ret = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_6).Realpath(__gotots_argument_9);
        if (atomic__from_gostdlib.Bool.Load((fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabled)) {
            const __gotots_store_12 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            SyncMap$Store$string$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "realpathCache"), path, ret);
        }
        return ret;
    }
    static Remove(fsys: {
        value: FS;
    } | undefined, path: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_7: FS["fs"] = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_10 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_7).Remove(__gotots_argument_10);
    }
    static Stat(fsys: {
        value: FS;
    } | undefined, path: gostring): GoInterface | undefined {
        if (atomic__from_gostdlib.Bool.Load((fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabled)) {
            {
                const __gotots_store_13 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_results_4 = SyncMap$Load$string$Named_fs$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "statCache"), path);
                let ret__shadow_1: GoInterface | undefined = __gotots_results_4[0];
                let ok = __gotots_results_4[1];
                if (ok) {
                    return ret__shadow_1;
                }
            }
        }
        const __gotots_receiver_8: FS["fs"] = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_11 = path;
        let ret: GoInterface | undefined = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_8).Stat(__gotots_argument_11);
        if (atomic__from_gostdlib.Bool.Load((fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabled)) {
            const __gotots_store_14 = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            SyncMap$Store$string$Named_fs$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "statCache"), path, ret);
        }
        return ret;
    }
    static UseCaseSensitiveFileNames(fsys: {
        value: FS;
    } | undefined): bool {
        const __gotots_receiver_9: FS["fs"] = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_9).UseCaseSensitiveFileNames();
    }
    static WalkDir(fsys: {
        value: FS;
    } | undefined, root: gostring, walkFn: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: $goInterface$Interface_Method_Error_void_to_string | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_10: FS["fs"] = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_12 = root;
        const __gotots_argument_13 = walkFn;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_10).WalkDir(__gotots_argument_12, __gotots_argument_13);
    }
    static WriteFile(fsys: {
        value: FS;
    } | undefined, path: gostring, data: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_11: FS["fs"] = (fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_14 = path;
        const __gotots_argument_15 = data;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_11).WriteFile(__gotots_argument_14, __gotots_argument_15);
    }
}
export function From(fs: FS__from_vfs | undefined): {
    value: FS;
} | undefined {
    let fsys: {
        value: FS;
    } | undefined = { value: new FS(fs, named_sync_atomic.SyncAtomicBoolOperations.$zero(), SyncMap__from_collections.$zero<gostring, bool>(), SyncMap__from_collections.$zero<gostring, bool>(), SyncMap__from_collections.$zero<gostring, Entries__from_vfs>(), SyncMap__from_collections.$zero<gostring, gostring>(), SyncMap__from_collections.$zero<gostring, GoInterface | undefined>()) };
    atomic__from_gostdlib.Bool.Store((fsys ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabled, true);
    return fsys;
}
