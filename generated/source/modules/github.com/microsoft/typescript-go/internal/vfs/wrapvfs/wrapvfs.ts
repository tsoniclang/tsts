import type { Entries as Entries__from_vfs, FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$PointerTo_Named_wrapvfs$wrappedFS as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class Replacements {
    declare private readonly $goType: void;
    public constructor(public UseCaseSensitiveFileNames: (() => bool) | undefined, public FileExists: (($0: gostring) => bool) | undefined, public ReadFile: (($0: gostring) => [
        gostring,
        bool
    ]) | undefined, public WriteFile: (($0: gostring, $1: gostring) => GoInterface | undefined) | undefined, public AppendFile: (($0: gostring, $1: gostring) => GoInterface | undefined) | undefined, public Remove: (($0: gostring) => GoInterface | undefined) | undefined, public Chtimes: (($0: gostring, $1: time__from_gostdlib.Time, $2: time__from_gostdlib.Time) => GoInterface | undefined) | undefined, public DirectoryExists: (($0: gostring) => bool) | undefined, public GetAccessibleEntries: (($0: gostring) => Entries__from_vfs) | undefined, public Stat: (($0: gostring) => $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined) | undefined, public WalkDir: (($0: gostring, $1: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: GoInterface | undefined) => GoInterface | undefined) | undefined) => GoInterface | undefined) | undefined, public Realpath: (($0: gostring) => gostring) | undefined) {
    }
    static $copy($source: Replacements): Replacements {
        return new Replacements($source.UseCaseSensitiveFileNames, $source.FileExists, $source.ReadFile, $source.WriteFile, $source.AppendFile, $source.Remove, $source.Chtimes, $source.DirectoryExists, $source.GetAccessibleEntries, $source.Stat, $source.WalkDir, $source.Realpath);
    }
    declare private readonly then?: never;
}
export function Wrap(fs: FS__from_vfs | undefined, replacements: Replacements): FS__from_vfs | undefined {
    return new GoInterfaceAdapter({ value: new wrappedFS(fs, Replacements.$copy(replacements)) });
}
export class wrappedFS {
    declare private readonly $goType: void;
    public constructor(public fs: FS__from_vfs | undefined, public replacements: Replacements) {
    }
    static $copy($source: wrappedFS): wrappedFS {
        return new wrappedFS($source.fs, Replacements.$copy($source.replacements));
    }
    declare private readonly then?: never;
    static AppendFile(w: {
        value: wrappedFS;
    } | undefined, path: gostring, data: gostring): GoInterface | undefined {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.AppendFile === undefined)) {
            const __gotots_callee_0 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.AppendFile;
            const __gotots_argument_0 = path;
            const __gotots_argument_1 = data;
            return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
        }
        const __gotots_receiver_0 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_2 = path;
        const __gotots_argument_3 = data;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_0).AppendFile(__gotots_argument_2, __gotots_argument_3);
    }
    static Chtimes(w: {
        value: wrappedFS;
    } | undefined, path: gostring, aTime: time__from_gostdlib.Time, mTime: time__from_gostdlib.Time): GoInterface | undefined {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.Chtimes === undefined)) {
            const __gotots_callee_1 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.Chtimes;
            const __gotots_argument_4 = path;
            const __gotots_argument_5 = named_time.TimeOperations.$copy(aTime);
            const __gotots_argument_6 = named_time.TimeOperations.$copy(mTime);
            return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5, __gotots_argument_6);
        }
        const __gotots_receiver_1 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_7 = path;
        const __gotots_argument_8 = named_time.TimeOperations.$copy(aTime);
        const __gotots_argument_9 = named_time.TimeOperations.$copy(mTime);
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_1).Chtimes(__gotots_argument_7, __gotots_argument_8, __gotots_argument_9);
    }
    static DirectoryExists(w: {
        value: wrappedFS;
    } | undefined, path: gostring): bool {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.DirectoryExists === undefined)) {
            const __gotots_callee_2 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.DirectoryExists;
            const __gotots_argument_10 = path;
            return (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10);
        }
        const __gotots_receiver_2 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_11 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).DirectoryExists(__gotots_argument_11);
    }
    static FileExists(w: {
        value: wrappedFS;
    } | undefined, path: gostring): bool {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.FileExists === undefined)) {
            const __gotots_callee_3 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.FileExists;
            const __gotots_argument_12 = path;
            return (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12);
        }
        const __gotots_receiver_3 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_13 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).FileExists(__gotots_argument_13);
    }
    static GetAccessibleEntries(w: {
        value: wrappedFS;
    } | undefined, path: gostring): Entries__from_vfs {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.GetAccessibleEntries === undefined)) {
            const __gotots_callee_4 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.GetAccessibleEntries;
            const __gotots_argument_14 = path;
            return (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14);
        }
        const __gotots_receiver_4 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_15 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_4).GetAccessibleEntries(__gotots_argument_15);
    }
    static ReadFile(w: {
        value: wrappedFS;
    } | undefined, path: gostring): [
        gostring,
        bool
    ] {
        let contents: gostring = "";
        let ok: bool = false;
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.ReadFile === undefined)) {
            const __gotots_callee_5 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.ReadFile;
            const __gotots_argument_16 = path;
            return (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16);
        }
        const __gotots_receiver_5 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_17 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_5).ReadFile(__gotots_argument_17);
    }
    static Realpath(w: {
        value: wrappedFS;
    } | undefined, path: gostring): gostring {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.Realpath === undefined)) {
            const __gotots_callee_6 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.Realpath;
            const __gotots_argument_18 = path;
            return (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_18);
        }
        const __gotots_receiver_6 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_19 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_6).Realpath(__gotots_argument_19);
    }
    static Remove(w: {
        value: wrappedFS;
    } | undefined, path: gostring): GoInterface | undefined {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.Remove === undefined)) {
            const __gotots_callee_7 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.Remove;
            const __gotots_argument_20 = path;
            return (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20);
        }
        const __gotots_receiver_7 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_21 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_7).Remove(__gotots_argument_21);
    }
    static Stat(w: {
        value: wrappedFS;
    } | undefined, path: gostring): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.Stat === undefined)) {
            const __gotots_callee_8 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.Stat;
            const __gotots_argument_22 = path;
            return (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_22);
        }
        const __gotots_receiver_8 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_23 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_8).Stat(__gotots_argument_23);
    }
    static UseCaseSensitiveFileNames(w: {
        value: wrappedFS;
    } | undefined): bool {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.UseCaseSensitiveFileNames === undefined)) {
            const __gotots_callee_9 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.UseCaseSensitiveFileNames;
            return (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))();
        }
        const __gotots_receiver_9 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_9).UseCaseSensitiveFileNames();
    }
    static WalkDir(w: {
        value: wrappedFS;
    } | undefined, root: gostring, walkFn: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: GoInterface | undefined) => GoInterface | undefined) | undefined): GoInterface | undefined {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.WalkDir === undefined)) {
            const __gotots_callee_10 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.WalkDir;
            const __gotots_argument_24 = root;
            const __gotots_argument_25 = walkFn;
            return (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24, __gotots_argument_25);
        }
        const __gotots_receiver_10 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_26 = root;
        const __gotots_argument_27 = walkFn;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_10).WalkDir(__gotots_argument_26, __gotots_argument_27);
    }
    static WriteFile(w: {
        value: wrappedFS;
    } | undefined, path: gostring, data: gostring): GoInterface | undefined {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.WriteFile === undefined)) {
            const __gotots_callee_11 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.replacements.WriteFile;
            const __gotots_argument_28 = path;
            const __gotots_argument_29 = data;
            return (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_28, __gotots_argument_29);
        }
        const __gotots_receiver_11 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_30 = path;
        const __gotots_argument_31 = data;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_11).WriteFile(__gotots_argument_30, __gotots_argument_31);
    }
}
