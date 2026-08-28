import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Entries as Entries__from_vfs, FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SyncSet as SyncSet__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { SyncSet$Add$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Add.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class FS {
    declare private readonly $goType: void;
    public constructor(public Inner: FS__from_vfs | undefined, public SeenFiles: SyncSet__from_collections<gostring>) {
    }
    static $copy($source: FS): FS {
        return new FS($source.Inner, SyncSet__from_collections.$copy<gostring>($source.SeenFiles));
    }
    declare private readonly then?: never;
    static AppendFile(fs: {
        value: FS;
    } | undefined, path: gostring, data: gostring): GoInterface | undefined {
        const __gotots_receiver_0: FS["Inner"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Inner;
        const __gotots_argument_0 = path;
        const __gotots_argument_1 = data;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_0).AppendFile(__gotots_argument_0, __gotots_argument_1);
    }
    static Chtimes(fs: {
        value: FS;
    } | undefined, path: gostring, aTime: time__from_gostdlib.Time, mTime: time__from_gostdlib.Time): GoInterface | undefined {
        const __gotots_receiver_1: FS["Inner"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Inner;
        const __gotots_argument_2 = path;
        const __gotots_argument_3 = named_time.TimeOperations.$copy(aTime);
        const __gotots_argument_4 = named_time.TimeOperations.$copy(mTime);
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_1).Chtimes(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
    }
    static DirectoryExists(fs: {
        value: FS;
    } | undefined, path: gostring): bool {
        const __gotots_store_0 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncSet$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "SeenFiles"), path);
        const __gotots_receiver_2: FS["Inner"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Inner;
        const __gotots_argument_5 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).DirectoryExists(__gotots_argument_5);
    }
    static FileExists(fs: {
        value: FS;
    } | undefined, path: gostring): bool {
        const __gotots_store_1 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncSet$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "SeenFiles"), path);
        const __gotots_receiver_3: FS["Inner"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Inner;
        const __gotots_argument_6 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).FileExists(__gotots_argument_6);
    }
    static GetAccessibleEntries(fs: {
        value: FS;
    } | undefined, path: gostring): Entries__from_vfs {
        const __gotots_store_2 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncSet$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "SeenFiles"), path);
        const __gotots_receiver_4: FS["Inner"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Inner;
        const __gotots_argument_7 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_4).GetAccessibleEntries(__gotots_argument_7);
    }
    static ReadFile(fs: {
        value: FS;
    } | undefined, path: gostring): [
        gostring,
        bool
    ] {
        const __gotots_store_3 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncSet$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "SeenFiles"), path);
        const __gotots_receiver_5: FS["Inner"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Inner;
        const __gotots_argument_8 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_5).ReadFile(__gotots_argument_8);
    }
    static Realpath(fs: {
        value: FS;
    } | undefined, path: gostring): gostring {
        const __gotots_store_4 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncSet$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "SeenFiles"), path);
        const __gotots_receiver_6: FS["Inner"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Inner;
        const __gotots_argument_9 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_6).Realpath(__gotots_argument_9);
    }
    static Remove(fs: {
        value: FS;
    } | undefined, path: gostring): GoInterface | undefined {
        const __gotots_receiver_7: FS["Inner"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Inner;
        const __gotots_argument_10 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_7).Remove(__gotots_argument_10);
    }
    static Stat(fs: {
        value: FS;
    } | undefined, path: gostring): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined {
        const __gotots_store_5 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncSet$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "SeenFiles"), path);
        const __gotots_receiver_8: FS["Inner"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Inner;
        const __gotots_argument_11 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_8).Stat(__gotots_argument_11);
    }
    static UseCaseSensitiveFileNames(fs: {
        value: FS;
    } | undefined): bool {
        const __gotots_receiver_9: FS["Inner"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Inner;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_9).UseCaseSensitiveFileNames();
    }
    static WalkDir(fs: {
        value: FS;
    } | undefined, root: gostring, walkFn: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: GoInterface | undefined) => GoInterface | undefined) | undefined): GoInterface | undefined {
        const __gotots_store_6 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncSet$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "SeenFiles"), root);
        const __gotots_receiver_10: FS["Inner"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Inner;
        const __gotots_argument_15 = root;
        const __gotots_argument_16 = (path: gostring, d: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, err: GoInterface | undefined): GoInterface | undefined => {
            const __gotots_store_7 = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            SyncSet$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "SeenFiles"), path);
            const __gotots_callee_0 = walkFn;
            const __gotots_argument_12 = path;
            const __gotots_argument_13 = d;
            const __gotots_argument_14 = err;
            return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12, __gotots_argument_13, __gotots_argument_14);
        };
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_10).WalkDir(__gotots_argument_15, __gotots_argument_16);
    }
    static WriteFile(fs: {
        value: FS;
    } | undefined, path: gostring, data: gostring): GoInterface | undefined {
        const __gotots_receiver_11: FS["Inner"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Inner;
        const __gotots_argument_17 = path;
        const __gotots_argument_18 = data;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_11).WriteFile(__gotots_argument_17, __gotots_argument_18);
    }
}
