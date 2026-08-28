import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { Value as Value__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goStruct$Struct_Field_Files_SliceOf_string_Tag_json_u3a__u22_files_u22__Field_Directories_SliceOf_string_Tag_json_u3a__u22_directories_u22_ } from "../../../../../../support/anonymous-structs.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Conn } from "./conn.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, uint8 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { Entries as Entries__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import { $goStruct$Struct_Field_Content_PointerTo_string_Tag_json_u3a__u22_content_u22_ } from "../../../../../../support/anonymous-structs.js";
import { $goInterfaceAdapter$PointerTo_PointerTo_Struct_Field_Files_SliceOf_string_Tag_json_u3a__u22_files_u22__Field_Directories_SliceOf_string_Tag_json_u3a__u22_directories_u22_, $goInterfaceAdapter$PointerTo_Struct_Field_Content_PointerTo_string_Tag_json_u3a__u22_content_u22_, $goInterfaceAdapter$PointerTo_string, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Struct_void } from "../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class callbackFS {
    declare private readonly $goType: void;
    public constructor(public base: FS__from_vfs | undefined, public enabledCallbacks: GoMapValue<gostring, bool>, public conn: Conn | undefined, public ctx: GoInterface | undefined) {
    }
    static $copy($source: callbackFS): callbackFS {
        return new callbackFS($source.base, $source.enabledCallbacks, $source.conn, $source.ctx);
    }
    declare private readonly then?: never;
    static AppendFile(fs: {
        value: callbackFS;
    } | undefined, path: gostring, data: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_0: callbackFS["base"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        const __gotots_argument_1 = path;
        const __gotots_argument_2 = data;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_0).AppendFile(__gotots_argument_1, __gotots_argument_2);
    }
    static Chtimes(fs: {
        value: callbackFS;
    } | undefined, path: gostring, aTime: time__from_gostdlib.Time, mTime: time__from_gostdlib.Time): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_1: callbackFS["base"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        const __gotots_argument_3 = path;
        const __gotots_argument_4 = named_time.TimeOperations.$copy(aTime);
        const __gotots_argument_5 = named_time.TimeOperations.$copy(mTime);
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_1).Chtimes(__gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
    }
    static DirectoryExists(fs: {
        value: callbackFS;
    } | undefined, path: gostring): bool {
        if (callbackFS.$go$private$api$isEnabled(fs, callbackDirectoryExists$string)) {
            const __gotots_results_0 = callbackFS.$go$private$api$call(fs, callbackDirectoryExists$string, new GoInterfaceAdapter(path));
            let result = __gotots_results_0[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_0[1];
            if (!(err === undefined)) {
                const __gotots_argument_6 = err;
                GoPanic.raise(__gotots_argument_6 === undefined ? GoPanicNilValue.create() : __gotots_argument_6);
            }
            let __gotots_logical_result_0 = result.length > 0;
            if (__gotots_logical_result_0) {
                const __gotots_conversion_0 = result;
                let __gotots_conversion_1 = "";
                for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                    __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
                }
                const __gotots_binary_operand_0 = __gotots_conversion_1;
                const __gotots_binary_operand_1 = "null";
                __gotots_logical_result_0 = __gotots_binary_operand_0 !== __gotots_binary_operand_1;
            }
            if (__gotots_logical_result_0) {
                const __gotots_conversion_3 = result;
                let __gotots_conversion_4 = "";
                for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                    __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
                }
                const __gotots_binary_operand_2 = __gotots_conversion_4;
                const __gotots_binary_operand_3 = "true";
                return __gotots_binary_operand_2 === __gotots_binary_operand_3;
            }
        }
        const __gotots_receiver_2: callbackFS["base"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        const __gotots_argument_7 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).DirectoryExists(__gotots_argument_7);
    }
    static FileExists(fs: {
        value: callbackFS;
    } | undefined, path: gostring): bool {
        if (callbackFS.$go$private$api$isEnabled(fs, callbackFileExists$string)) {
            const __gotots_results_1 = callbackFS.$go$private$api$call(fs, callbackFileExists$string, new GoInterfaceAdapter(path));
            let result = __gotots_results_1[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_1[1];
            if (!(err === undefined)) {
                const __gotots_argument_8 = err;
                GoPanic.raise(__gotots_argument_8 === undefined ? GoPanicNilValue.create() : __gotots_argument_8);
            }
            let __gotots_logical_result_1 = result.length > 0;
            if (__gotots_logical_result_1) {
                const __gotots_conversion_6 = result;
                let __gotots_conversion_7 = "";
                for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
                    __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
                }
                const __gotots_binary_operand_4 = __gotots_conversion_7;
                const __gotots_binary_operand_5 = "null";
                __gotots_logical_result_1 = __gotots_binary_operand_4 !== __gotots_binary_operand_5;
            }
            if (__gotots_logical_result_1) {
                const __gotots_conversion_9 = result;
                let __gotots_conversion_10 = "";
                for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
                    __gotots_conversion_10 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_9.get(__gotots_conversion_11)));
                }
                const __gotots_binary_operand_6 = __gotots_conversion_10;
                const __gotots_binary_operand_7 = "true";
                return __gotots_binary_operand_6 === __gotots_binary_operand_7;
            }
        }
        const __gotots_receiver_3: callbackFS["base"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        const __gotots_argument_9 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).FileExists(__gotots_argument_9);
    }
    static GetAccessibleEntries(fs: {
        value: callbackFS;
    } | undefined, path: gostring): Entries__from_vfs {
        if (callbackFS.$go$private$api$isEnabled(fs, callbackGetAccessibleEntries$string)) {
            const __gotots_results_2 = callbackFS.$go$private$api$call(fs, callbackGetAccessibleEntries$string, new GoInterfaceAdapter(path));
            let result = __gotots_results_2[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_2[1];
            if (!(err === undefined)) {
                const __gotots_argument_10 = err;
                GoPanic.raise(__gotots_argument_10 === undefined ? GoPanicNilValue.create() : __gotots_argument_10);
            }
            if (result.length > 0) {
                let rawEntries: tsonicTypeScriptRuntime.Location<$goStruct$Struct_Field_Files_SliceOf_string_Tag_json_u3a__u22_files_u22__Field_Directories_SliceOf_string_Tag_json_u3a__u22_directories_u22_> | undefined = void 0;
                const rawEntries$location = tsonicTypeScriptRuntime.boundLocation({}, () => rawEntries, rawEntries$next => rawEntries = rawEntries$next);
                {
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(result, new $goInterfaceAdapter$PointerTo_PointerTo_Struct_Field_Files_SliceOf_string_Tag_json_u3a__u22_files_u22__Field_Directories_SliceOf_string_Tag_json_u3a__u22_directories_u22_(rawEntries$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                    if (!(err__shadow_1 === undefined)) {
                        const __gotots_argument_11 = err__shadow_1;
                        GoPanic.raise(__gotots_argument_11 === undefined ? GoPanicNilValue.create() : __gotots_argument_11);
                    }
                }
                if (!(rawEntries === undefined)) {
                    return Entries__from_vfs.$fromStorage({
                        Files: ((rawEntries ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<$goStruct$Struct_Field_Files_SliceOf_string_Tag_json_u3a__u22_files_u22__Field_Directories_SliceOf_string_Tag_json_u3a__u22_directories_u22_>).value.Files,
                        Directories: ((rawEntries ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<$goStruct$Struct_Field_Files_SliceOf_string_Tag_json_u3a__u22_files_u22__Field_Directories_SliceOf_string_Tag_json_u3a__u22_directories_u22_>).value.Directories,
                        Symlinks: $goMap$MapOf_string_To_Struct_void.nil()
                    });
                }
            }
        }
        const __gotots_receiver_4: callbackFS["base"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        const __gotots_argument_12 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_4).GetAccessibleEntries(__gotots_argument_12);
    }
    static ReadFile(fs: {
        value: callbackFS;
    } | undefined, path: gostring): [
        gostring,
        bool
    ] {
        let contents: gostring = "";
        let ok: bool = false;
        if (callbackFS.$go$private$api$isEnabled(fs, callbackReadFile$string)) {
            const __gotots_results_3 = callbackFS.$go$private$api$call(fs, callbackReadFile$string, new GoInterfaceAdapter(path));
            let result = __gotots_results_3[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_3[1];
            if (!(err === undefined)) {
                const __gotots_argument_13 = err;
                GoPanic.raise(__gotots_argument_13 === undefined ? GoPanicNilValue.create() : __gotots_argument_13);
            }
            let __gotots_logical_result_2 = result.length > 0;
            if (__gotots_logical_result_2) {
                const __gotots_conversion_12 = result;
                let __gotots_conversion_13 = "";
                for (let __gotots_conversion_14 = 0; __gotots_conversion_14 < __gotots_conversion_12.length; __gotots_conversion_14++) {
                    __gotots_conversion_13 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_12.get(__gotots_conversion_14)));
                }
                const __gotots_binary_operand_8 = __gotots_conversion_13;
                const __gotots_binary_operand_9 = "null";
                __gotots_logical_result_2 = __gotots_binary_operand_8 !== __gotots_binary_operand_9;
            }
            if (__gotots_logical_result_2) {
                let wrapper = $goStruct$Struct_Field_Content_PointerTo_string_Tag_json_u3a__u22_content_u22_.$zero();
                const wrapper$location = tsonicTypeScriptRuntime.boundLocation({}, () => wrapper, wrapper$next => wrapper = wrapper$next);
                {
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(result, new $goInterfaceAdapter$PointerTo_Struct_Field_Content_PointerTo_string_Tag_json_u3a__u22_content_u22_(wrapper$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                    if (!(err__shadow_1 === undefined)) {
                        const __gotots_argument_14 = err__shadow_1;
                        GoPanic.raise(__gotots_argument_14 === undefined ? GoPanicNilValue.create() : __gotots_argument_14);
                    }
                }
                if (wrapper.Content === undefined) {
                    return ["", false];
                }
                return [
                    ((wrapper.Content ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value, true];
            }
        }
        const __gotots_receiver_5: callbackFS["base"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        const __gotots_argument_15 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_5).ReadFile(__gotots_argument_15);
    }
    static Realpath(fs: {
        value: callbackFS;
    } | undefined, path: gostring): gostring {
        if (callbackFS.$go$private$api$isEnabled(fs, callbackRealpath$string)) {
            const __gotots_results_4 = callbackFS.$go$private$api$call(fs, callbackRealpath$string, new GoInterfaceAdapter(path));
            let result = __gotots_results_4[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_4[1];
            if (!(err === undefined)) {
                const __gotots_argument_16 = err;
                GoPanic.raise(__gotots_argument_16 === undefined ? GoPanicNilValue.create() : __gotots_argument_16);
            }
            let __gotots_logical_result_3 = result.length > 0;
            if (__gotots_logical_result_3) {
                const __gotots_conversion_15 = result;
                let __gotots_conversion_16 = "";
                for (let __gotots_conversion_17 = 0; __gotots_conversion_17 < __gotots_conversion_15.length; __gotots_conversion_17++) {
                    __gotots_conversion_16 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_15.get(__gotots_conversion_17)));
                }
                const __gotots_binary_operand_10 = __gotots_conversion_16;
                const __gotots_binary_operand_11 = "null";
                __gotots_logical_result_3 = __gotots_binary_operand_10 !== __gotots_binary_operand_11;
            }
            if (__gotots_logical_result_3) {
                let realpath = "";
                const realpath$location = tsonicTypeScriptRuntime.boundLocation({}, () => realpath, realpath$next => realpath = realpath$next);
                {
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(result, new $goInterfaceAdapter$PointerTo_string(realpath$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                    if (!(err__shadow_1 === undefined)) {
                        const __gotots_argument_17 = err__shadow_1;
                        GoPanic.raise(__gotots_argument_17 === undefined ? GoPanicNilValue.create() : __gotots_argument_17);
                    }
                }
                return realpath;
            }
        }
        const __gotots_receiver_6: callbackFS["base"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        const __gotots_argument_18 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_6).Realpath(__gotots_argument_18);
    }
    static Remove(fs: {
        value: callbackFS;
    } | undefined, path: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_7: callbackFS["base"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        const __gotots_argument_19 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_7).Remove(__gotots_argument_19);
    }
    static SetConnection(fs: {
        value: callbackFS;
    } | undefined, ctx: GoInterface | undefined, conn: Conn | undefined): void {
        (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx = ctx;
        (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.conn = conn;
    }
    static Stat(fs: {
        value: callbackFS;
    } | undefined, path: gostring): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined {
        const __gotots_receiver_8: callbackFS["base"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        const __gotots_argument_20 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_8).Stat(__gotots_argument_20);
    }
    static UseCaseSensitiveFileNames(fs: {
        value: callbackFS;
    } | undefined): bool {
        const __gotots_receiver_9: callbackFS["base"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_9).UseCaseSensitiveFileNames();
    }
    static WalkDir(fs: {
        value: callbackFS;
    } | undefined, root: gostring, walkFn: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: $goInterface$Interface_Method_Error_void_to_string | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_10: callbackFS["base"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        const __gotots_argument_21 = root;
        const __gotots_argument_22 = walkFn;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_10).WalkDir(__gotots_argument_21, __gotots_argument_22);
    }
    static WriteFile(fs: {
        value: callbackFS;
    } | undefined, path: gostring, data: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_11: callbackFS["base"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.base;
        const __gotots_argument_23 = path;
        const __gotots_argument_24 = data;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_11).WriteFile(__gotots_argument_23, __gotots_argument_24);
    }
    static $go$private$api$call(fs: {
        value: callbackFS;
    } | undefined, name: gostring, arg: $goInterface$Interface_void | undefined): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if ((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.conn === undefined) {
            return [RuntimeSlice.nil<uint8>(), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("CallbackFS: %s called before connection set", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(name)])))];
        }
        const __gotots_receiver_12: callbackFS["conn"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.conn;
        const __gotots_argument_25: callbackFS["ctx"] = (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx;
        const __gotots_argument_26 = name;
        const __gotots_argument_27 = arg;
        const __gotots_results_5 = goInterfaceNonNil<Conn>(__gotots_receiver_12).Call(__gotots_argument_25, __gotots_argument_26, __gotots_argument_27);
        let result: Value__from_jsontext = __gotots_results_5[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_5[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<uint8>(), err];
        }
        return [result.$value, void 0];
    }
    static $go$private$api$isEnabled(fs: {
        value: callbackFS;
    } | undefined, name: gostring): bool {
        return (fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enabledCallbacks.lookup(name);
    }
}
export const callbackReadFile$string: gostring = "readFile";
export const callbackFileExists$string: gostring = "fileExists";
export const callbackDirectoryExists$string: gostring = "directoryExists";
export const callbackGetAccessibleEntries$string: gostring = "getAccessibleEntries";
export const callbackRealpath$string: gostring = "realpath";
export function isCallbackName(name: gostring): bool {
    switch (name) {
        case callbackReadFile$string:
        case callbackFileExists$string:
        case callbackDirectoryExists$string:
        case callbackGetAccessibleEntries$string:
        case callbackRealpath$string: {
            return true;
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function newCallbackFS(base: FS__from_vfs | undefined, callbacks: RuntimeSlice<gostring>): {
    value: callbackFS;
} | undefined {
    let enabled: GoMapValue<gostring, bool> = GoMap.make<gostring, bool>(false, callbacks.length, []);
    const __gotots_range_0 = callbacks;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let cb = __gotots_range_value_0;
        if (!isCallbackName(cb)) {
            const __gotots_argument_0 = new GoInterfaceAdapter("unknown callback name: " + cb);
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        enabled.store(cb, true);
    }
    return { value: new callbackFS(base, enabled, void 0, void 0) };
}
