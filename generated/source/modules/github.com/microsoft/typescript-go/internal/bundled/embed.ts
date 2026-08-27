import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { bool, gostring, int64 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/bundled/state.js";
import { Entries as Entries__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import { $goInterfaceAdapter$PointerTo_Named_bundled$fileInfo, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_bundled$wrappedFS as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as named_io_fs from "@gotots/gostdlib/internal/facets/named-io-fs.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as fs__from_gostdlib from "@gotots/gostdlib/io/fs.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export const scheme$string: gostring = "bundled:///";
export function splitPath(path: gostring): [
    gostring,
    bool
] {
    let rest: gostring = "";
    let ok: bool = false;
    return strings__from_gostdlib.CutPrefix(path, scheme$string);
}
export function libPath(): gostring {
    return "bundled:///libs";
}
export function IsBundled(path: gostring): bool {
    const __gotots_results_0 = splitPath(path);
    let ok = __gotots_results_0[1];
    return ok;
}
export class wrappedFS {
    declare private readonly $goType: void;
    public constructor(public fs: FS__from_vfs | undefined) {
    }
    static $copy($source: wrappedFS): wrappedFS {
        return new wrappedFS($source.fs);
    }
    static $equal($left: wrappedFS, $right: wrappedFS): bool {
        return goInterfaceEqual($left.fs, $right.fs);
    }
    static $hash($source: wrappedFS): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.fs === undefined ? 0 : $source.fs.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static AppendFile(vfs__shadow_1: {
        value: wrappedFS;
    } | undefined, path: gostring, data: gostring): GoInterface | undefined {
        {
            const __gotots_results_2 = splitPath(path);
            let ok = __gotots_results_2[1];
            if (ok) {
                const __gotots_argument_0 = new $goInterfaceAdapter$string("cannot write to embedded file system");
                GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
            }
        }
        const __gotots_receiver_0 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_1 = path;
        const __gotots_argument_2 = data;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_0).AppendFile(__gotots_argument_1, __gotots_argument_2);
    }
    static Chtimes(vfs__shadow_1: {
        value: wrappedFS;
    } | undefined, path: gostring, aTime: time__from_gostdlib.Time, mTime: time__from_gostdlib.Time): GoInterface | undefined {
        {
            const __gotots_results_3 = splitPath(path);
            let ok = __gotots_results_3[1];
            if (ok) {
                const __gotots_argument_3 = new $goInterfaceAdapter$string("cannot change times on embedded file system");
                GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
            }
        }
        const __gotots_receiver_1 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_4 = path;
        const __gotots_argument_5 = named_time.TimeOperations.$copy(aTime);
        const __gotots_argument_6 = named_time.TimeOperations.$copy(mTime);
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_1).Chtimes(__gotots_argument_4, __gotots_argument_5, __gotots_argument_6);
    }
    static DirectoryExists(vfs__shadow_1: {
        value: wrappedFS;
    } | undefined, path: gostring): bool {
        {
            const __gotots_results_4 = splitPath(path);
            let rest = __gotots_results_4[0];
            let ok = __gotots_results_4[1];
            if (ok) {
                return rest === "libs";
            }
        }
        const __gotots_receiver_2 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_7 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).DirectoryExists(__gotots_argument_7);
    }
    static FileExists(vfs__shadow_1: {
        value: wrappedFS;
    } | undefined, path: gostring): bool {
        {
            const __gotots_results_5 = splitPath(path);
            let rest = __gotots_results_5[0];
            let ok = __gotots_results_5[1];
            if (ok) {
                const __gotots_results_6 = $state.embeddedContents.lookupOk(rest);
                let ok__shadow_1 = __gotots_results_6[1];
                return ok__shadow_1;
            }
        }
        const __gotots_receiver_3 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_8 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).FileExists(__gotots_argument_8);
    }
    static GetAccessibleEntries(vfs__shadow_1: {
        value: wrappedFS;
    } | undefined, path: gostring): Entries__from_vfs {
        let result: Entries__from_vfs = Entries__from_vfs.$zero();
        {
            const __gotots_results_7 = splitPath(path);
            let rest = __gotots_results_7[0];
            let ok = __gotots_results_7[1];
            if (ok) {
                if (rest === "") {
                    Entries__from_vfs.$storageOf(result).Directories = RuntimeSlice.literal<gostring>(["libs"]);
                }
                else if (rest === "libs") {
                    Entries__from_vfs.$storageOf(result).Files = $state.LibNames;
                }
                return Entries__from_vfs.$copy(result);
            }
        }
        const __gotots_receiver_4 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_9 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_4).GetAccessibleEntries(__gotots_argument_9);
    }
    static ReadFile(vfs__shadow_1: {
        value: wrappedFS;
    } | undefined, path: gostring): [
        gostring,
        bool
    ] {
        let contents: gostring = "";
        let ok: bool = false;
        {
            const __gotots_results_8 = splitPath(path);
            let rest = __gotots_results_8[0];
            let ok__shadow_1 = __gotots_results_8[1];
            if (ok__shadow_1) {
                const __gotots_results_9 = $state.embeddedContents.lookupOk(rest);
                contents = __gotots_results_9[0];
                ok__shadow_1 = __gotots_results_9[1];
                return [contents, ok__shadow_1];
            }
        }
        const __gotots_receiver_5 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_10 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_5).ReadFile(__gotots_argument_10);
    }
    static Realpath(vfs__shadow_1: {
        value: wrappedFS;
    } | undefined, path: gostring): gostring {
        {
            const __gotots_results_10 = splitPath(path);
            let ok = __gotots_results_10[1];
            if (ok) {
                return path;
            }
        }
        const __gotots_receiver_6 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_11 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_6).Realpath(__gotots_argument_11);
    }
    static Remove(vfs__shadow_1: {
        value: wrappedFS;
    } | undefined, path: gostring): GoInterface | undefined {
        {
            const __gotots_results_11 = splitPath(path);
            let ok = __gotots_results_11[1];
            if (ok) {
                const __gotots_argument_12 = new $goInterfaceAdapter$string("cannot remove from embedded file system");
                GoPanic.raise(__gotots_argument_12 === undefined ? GoPanicNilValue.create() : __gotots_argument_12);
            }
        }
        const __gotots_receiver_7 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_13 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_7).Remove(__gotots_argument_13);
    }
    static Stat(vfs__shadow_1: {
        value: wrappedFS;
    } | undefined, path: gostring): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined {
        {
            const __gotots_results_12 = splitPath(path);
            let rest = __gotots_results_12[0];
            let ok = __gotots_results_12[1];
            if (ok) {
                if (rest === "" || rest === "libs") {
                    return new $goInterfaceAdapter$PointerTo_Named_bundled$fileInfo({ value: new fileInfo(fs__from_gostdlib.ModeDir, rest, 0n) });
                }
                {
                    const __gotots_results_13 = $state.embeddedContents.lookupOk(rest);
                    let lib = __gotots_results_13[0];
                    let ok__shadow_1 = __gotots_results_13[1];
                    if (ok__shadow_1) {
                        const __gotots_results_15 = strings__from_gostdlib.CutPrefix(rest, "libs/");
                        let libName = __gotots_results_15[0];
                        return new $goInterfaceAdapter$PointerTo_Named_bundled$fileInfo({ value: new fileInfo(named_io_fs.IoFsFileModeValueOperations.$wrap(0), libName, BigInt.asIntN(64, goNumberToBigInt(lib.length))) });
                    }
                }
                return void 0;
            }
        }
        const __gotots_receiver_8 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_14 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_8).Stat(__gotots_argument_14);
    }
    static UseCaseSensitiveFileNames(vfs__shadow_1: {
        value: wrappedFS;
    } | undefined): bool {
        const __gotots_receiver_9 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_9).UseCaseSensitiveFileNames();
    }
    static WalkDir(vfs__shadow_1: {
        value: wrappedFS;
    } | undefined, root: gostring, walkFn: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: GoInterface | undefined) => GoInterface | undefined) | undefined): GoInterface | undefined {
        {
            const __gotots_results_16 = splitPath(root);
            let rest = __gotots_results_16[0];
            let ok = __gotots_results_16[1];
            if (ok) {
                {
                    let err: GoInterface | undefined = wrappedFS.$go$private$bundled$walkDir(vfs__shadow_1, rest, walkFn);
                    if (!(err === undefined)) {
                        if (goInterfaceEqual(err, GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.SkipAll))) {
                            return void 0;
                        }
                        return err;
                    }
                }
                return void 0;
            }
        }
        const __gotots_receiver_10 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_15 = root;
        const __gotots_argument_16 = walkFn;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_10).WalkDir(__gotots_argument_15, __gotots_argument_16);
    }
    static WriteFile(vfs__shadow_1: {
        value: wrappedFS;
    } | undefined, path: gostring, data: gostring): GoInterface | undefined {
        {
            const __gotots_results_17 = splitPath(path);
            let ok = __gotots_results_17[1];
            if (ok) {
                const __gotots_argument_17 = new $goInterfaceAdapter$string("cannot write to embedded file system");
                GoPanic.raise(__gotots_argument_17 === undefined ? GoPanicNilValue.create() : __gotots_argument_17);
            }
        }
        const __gotots_receiver_11 = (vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
        const __gotots_argument_18 = path;
        const __gotots_argument_19 = data;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_11).WriteFile(__gotots_argument_18, __gotots_argument_19);
    }
    static $go$private$bundled$walkDir(vfs__shadow_1: {
        value: wrappedFS;
    } | undefined, rest: gostring, walkFn: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: GoInterface | undefined) => GoInterface | undefined) | undefined): GoInterface | undefined {
        let entries = RuntimeSlice.nil<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined>();
        switch (rest) {
            case "": {
                entries = $state.rootEntries;
                break;
            }
            case "libs": {
                entries = $state.libsEntries;
                break;
            }
            default: {
                return void 0;
                break;
            }
        }
        const __gotots_range_0 = entries;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let entry: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined = __gotots_range_value_0;
            const __gotots_binary_operand_0 = rest + "/";
            const __gotots_receiver_12 = entry;
            const __gotots_binary_operand_1 = goInterfaceNonNil<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode>(__gotots_receiver_12).Name();
            let name = __gotots_binary_operand_0 + __gotots_binary_operand_1;
            {
                const __gotots_callee_0 = walkFn;
                const __gotots_argument_20 = scheme$string + name;
                const __gotots_argument_21 = entry;
                const __gotots_argument_22 = void 0;
                let err: GoInterface | undefined = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20, __gotots_argument_21, __gotots_argument_22);
                if (!(err === undefined)) {
                    if (goInterfaceEqual(err, GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.SkipAll))) {
                        return GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.SkipAll);
                    }
                    if (goInterfaceEqual(err, GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.SkipDir))) {
                        continue;
                    }
                    return err;
                }
            }
            const __gotots_receiver_13 = entry;
            if (goInterfaceNonNil<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode>(__gotots_receiver_13).IsDir()) {
                {
                    let err: GoInterface | undefined = wrappedFS.$go$private$bundled$walkDir(vfs__shadow_1, strings__from_gostdlib.TrimPrefix(name, "/"), walkFn);
                    if (!(err === undefined)) {
                        return err;
                    }
                }
            }
        }
        return void 0;
    }
}
export function wrapFS(fs__shadow_1: FS__from_vfs | undefined): FS__from_vfs | undefined {
    return new GoInterfaceAdapter({ value: new wrappedFS(fs__shadow_1) });
}
export class fileInfo {
    declare private readonly $goType: void;
    public constructor(public mode: fs__from_gostdlib.FileMode, public name: gostring, public size: int64) {
    }
    static $copy($source: fileInfo): fileInfo {
        return new fileInfo($source.mode, $source.name, $source.size);
    }
    static $equal($left: fileInfo, $right: fileInfo): bool {
        return named_io_fs.IoFsFileModeValueOperations.$project($left.mode) === named_io_fs.IoFsFileModeValueOperations.$project($right.mode) && $left.name === $right.name && $left.size === $right.size;
    }
    static $hash($source: fileInfo): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number(named_io_fs.IoFsFileModeValueOperations.$project($source.mode)));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.name));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.size));
        return $hash;
    }
    declare private readonly then?: never;
    static Info(fi: {
        value: fileInfo;
    } | undefined): [
        $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
        GoInterface | undefined
    ] {
        return [new $goInterfaceAdapter$PointerTo_Named_bundled$fileInfo(fi), void 0];
    }
    static IsDir(fi: {
        value: fileInfo;
    } | undefined): bool {
        return (fi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mode.IsDir();
    }
    static ModTime(fi: {
        value: fileInfo;
    } | undefined): time__from_gostdlib.Time {
        const __gotots_struct_0 = named_time.TimeOperations.$zero();
        return __gotots_struct_0;
    }
    static Mode(fi: {
        value: fileInfo;
    } | undefined): fs__from_gostdlib.FileMode {
        return (fi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mode;
    }
    static Name(fi: {
        value: fileInfo;
    } | undefined): gostring {
        return (fi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.name;
    }
    static Size(fi: {
        value: fileInfo;
    } | undefined): int64 {
        return (fi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.size;
    }
    static Sys(fi: {
        value: fileInfo;
    } | undefined): $goInterface$Interface_void | undefined {
        return void 0;
    }
    static Type(fi: {
        value: fileInfo;
    } | undefined): fs__from_gostdlib.FileMode {
        return (fi ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mode.Type();
    }
}
