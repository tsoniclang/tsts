import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_void, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract, $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$ProviderContract, $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../../support/provider-interface-bridges.js";
import type { bool, gostring, int, uint16, uint8 } from "@gotots/runtime/scalars.js";
import { GetEncodedRootLength as GetEncodedRootLength__from_tspath, NormalizePath as NormalizePath__from_tspath, RemoveTrailingDirectorySeparator as RemoveTrailingDirectorySeparator__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Entries as Entries__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import { $goInterfaceAdapter$Named_binary$bigEndian, $goInterfaceAdapter$Named_binary$littleEndian, $goInterfaceAdapter$PointerTo_Named_strings$Reader, $goInterfaceAdapter$PointerTo_SliceOf_uint16, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode$contract as GoInterface$contract, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode$is as GoInterface$is } from "../../../../../../../support/interface-contracts.js";
import { $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_binary$ByteOrder, $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct, $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct, $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct as GoProviderProfileBridge, $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$36616162373365393533383639383931343437393031363365313738386338393765303065323330616263343362323736626162646463323661356335376163 as GoProviderProfileBridge$Capability$36616162373365393533383639383931343437393031363365313738386338393765303065323330616263343362323736626162646463323661356335376163, $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$61323536363437313039626335663137663534326461653038626462333336343362653139393962383331386463656435326132353235343365326563333733 as GoProviderProfileBridge$Capability$61323536363437313039626335663137663534326461653038626462333336343362653139393962383331386463656435326132353235343365326563333733, $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$64323930666333653635613838653931376430336664316239616433313034303362636432643065326535626439636265393930633861333932623038373036 as GoProviderProfileBridge$Capability$64323930666333653635613838653931376430336664316239616433313034303362636432643065326535626439636265393930633861333932623038373036, $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$65393938613736623464346232343236323264663564633835386135306562343237613366303866646635393336336438663234353361633664313666643332 as GoProviderProfileBridge$Capability$65393938613736623464346232343236323264663564633835386135306562343237613366303866646635393336336438663234353361633664313666643332 } from "../../../../../../../support/provider-interface-bridges.js";
import { $goReflectType$PointerTo_SliceOf_uint16 } from "../../../../../../../support/reflection-types.js";
import "../../../../../../../support/reflection-types.js";
import * as binary__from_gostdlib from "@gotots/gostdlib/encoding/binary.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_encoding_binary from "@gotots/gostdlib/internal/facets/named-encoding-binary.js";
import * as named_io_fs from "@gotots/gostdlib/internal/facets/named-io-fs.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as provider_encoding_binary from "@gotots/gostdlib/internal/facets/provider-encoding-binary.js";
import * as provider_io_fs_direct from "@gotots/gostdlib/internal/facets/provider-io-fs-direct.js";
import * as io from "@gotots/gostdlib/io.js";
import * as fs__from_gostdlib from "@gotots/gostdlib/io/fs.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf16__from_gostdlib from "@gotots/gostdlib/unicode/utf16.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goNumberIntegerDivide } from "@gotots/runtime/integer.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, RuntimeSliceProjection } from "@gotots/runtime/slice.js";
import { goStringEncodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { goUnsafeString } from "@gotots/runtime/unsafe.js";
export class Common {
    declare private readonly $goType: void;
    public constructor(public RootFor: (($0: gostring) => GoInterface | undefined) | undefined, public IsReparsePoint: (($0: gostring) => bool) | undefined) {
    }
    static $copy($source: Common): Common {
        return new Common($source.RootFor, $source.IsReparsePoint);
    }
    declare private readonly then?: never;
    static DirectoryExists(vfs__shadow_1: tsonicTypeScriptRuntime.Location<Common> | undefined, path: gostring): bool {
        let stat: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined = Common.Stat(vfs__shadow_1, path);
        let __gotots_logical_result_0 = !(stat === undefined);
        if (__gotots_logical_result_0) {
            const __gotots_receiver_0 = stat;
            __gotots_logical_result_0 = goInterfaceNonNil<$goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void>(__gotots_receiver_0).IsDir();
        }
        return __gotots_logical_result_0;
    }
    static FileExists(vfs__shadow_1: tsonicTypeScriptRuntime.Location<Common> | undefined, path: gostring): bool {
        let stat: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined = Common.Stat(vfs__shadow_1, path);
        let __gotots_logical_result_1 = !(stat === undefined);
        if (__gotots_logical_result_1) {
            const __gotots_receiver_1 = stat;
            __gotots_logical_result_1 = !goInterfaceNonNil<$goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void>(__gotots_receiver_1).IsDir();
        }
        return __gotots_logical_result_1;
    }
    static GetAccessibleEntries(vfs__shadow_1: tsonicTypeScriptRuntime.Location<Common> | undefined, path: gostring): Entries__from_vfs {
        let result: Entries__from_vfs = Entries__from_vfs.$zero();
        Entries__from_vfs.$storageOf(result).Symlinks = GoMap.make(0, []);
        let addToResult: (($0: gostring, $1: fs__from_gostdlib.FileMode, $2: bool) => bool) | undefined = (name: gostring, mode: fs__from_gostdlib.FileMode, isLink: bool): bool => {
            let added: bool = false;
            if (mode.IsDir()) {
                Entries__from_vfs.$storageOf(result).Directories = Entries__from_vfs.$storageOf(result).Directories.append("", [name]);
            }
            else if (mode.IsRegular()) {
                Entries__from_vfs.$storageOf(result).Files = Entries__from_vfs.$storageOf(result).Files.append("", [name]);
            }
            else {
                return false;
            }
            if (isLink) {
                Entries__from_vfs.$storageOf(result).Symlinks.store(name, new GoEmptyStruct);
            }
            return true;
        };
        const __gotots_range_0 = Common.$go$private$internal__package_1$getEntries(vfs__shadow_1, path);
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let entry: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined = __gotots_range_value_0;
            const __gotots_receiver_2 = entry;
            let entryType = goInterfaceNonNil<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode>(__gotots_receiver_2).Type();
            const __gotots_callee_0 = addToResult;
            const __gotots_receiver_3 = entry;
            const __gotots_argument_0 = goInterfaceNonNil<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode>(__gotots_receiver_3).Name();
            const __gotots_argument_1 = entryType;
            const __gotots_argument_2 = false;
            if ((__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2)) {
                continue;
            }
            if (!(named_io_fs.IoFsFileModeValueOperations.$project(named_io_fs.IoFsFileModeValueOperations.$wrap((named_io_fs.IoFsFileModeValueOperations.$project(entryType) & named_io_fs.IoFsFileModeValueOperations.$project(fs__from_gostdlib.ModeSymlink)) >>> 0)) === named_io_fs.IoFsFileModeValueOperations.$project(named_io_fs.IoFsFileModeValueOperations.$wrap(0)))) {
                {
                    const __gotots_receiver_5 = vfs__shadow_1;
                    const __gotots_binary_operand_0 = path + "/";
                    const __gotots_receiver_4 = entry;
                    const __gotots_binary_operand_1 = goInterfaceNonNil<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode>(__gotots_receiver_4).Name();
                    const __gotots_argument_3 = __gotots_binary_operand_0 + __gotots_binary_operand_1;
                    let stat: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined = Common.Stat(__gotots_receiver_5, __gotots_argument_3);
                    if (!(stat === undefined)) {
                        const __gotots_callee_1 = addToResult;
                        const __gotots_receiver_6 = entry;
                        const __gotots_argument_4 = goInterfaceNonNil<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode>(__gotots_receiver_6).Name();
                        const __gotots_receiver_7 = stat;
                        const __gotots_argument_5 = goInterfaceNonNil<$goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void>(__gotots_receiver_7).Mode();
                        const __gotots_argument_6 = true;
                        (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5, __gotots_argument_6);
                    }
                }
                continue;
            }
            if (!(named_io_fs.IoFsFileModeValueOperations.$project(named_io_fs.IoFsFileModeValueOperations.$wrap((named_io_fs.IoFsFileModeValueOperations.$project(entryType) & named_io_fs.IoFsFileModeValueOperations.$project(fs__from_gostdlib.ModeIrregular)) >>> 0)) === named_io_fs.IoFsFileModeValueOperations.$project(named_io_fs.IoFsFileModeValueOperations.$wrap(0))) && !(((vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Common>).value.IsReparsePoint === undefined)) {
                const __gotots_binary_operand_2 = path + "/";
                const __gotots_receiver_8 = entry;
                const __gotots_binary_operand_3 = goInterfaceNonNil<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode>(__gotots_receiver_8).Name();
                let fullPath = __gotots_binary_operand_2 + __gotots_binary_operand_3;
                const __gotots_callee_2 = ((vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Common>).value.IsReparsePoint;
                const __gotots_argument_7 = fullPath;
                if ((__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7)) {
                    {
                        let stat: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined = Common.Stat(vfs__shadow_1, fullPath);
                        if (!(stat === undefined)) {
                            const __gotots_callee_3 = addToResult;
                            const __gotots_receiver_9 = entry;
                            const __gotots_argument_8 = goInterfaceNonNil<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode>(__gotots_receiver_9).Name();
                            const __gotots_receiver_10 = stat;
                            const __gotots_argument_9 = goInterfaceNonNil<$goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void>(__gotots_receiver_10).Mode();
                            const __gotots_argument_10 = true;
                            (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
                        }
                    }
                }
                continue;
            }
        }
        return Entries__from_vfs.$copy(result);
    }
    static ReadFile(vfs__shadow_1: tsonicTypeScriptRuntime.Location<Common> | undefined, path: gostring): [
        gostring,
        bool
    ] {
        let contents: gostring = "";
        let ok: bool = false;
        const __gotots_results_0 = Common.RootAndPath(vfs__shadow_1, path);
        let fsys: GoInterface | undefined = __gotots_results_0[0];
        let rest = __gotots_results_0[2];
        if (fsys === undefined) {
            return ["", false];
        }
        const __gotots_argument_11 = fsys;
        const __gotots_argument_12 = rest;
        const __gotots_results_1 = provider_io_fs_direct.IoFsReadFileDirect(GoProviderProfileBridge.$to(__gotots_argument_11), __gotots_argument_12, $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io.state.EOF)), GoProviderProfileBridge$Capability$65393938613736623464346232343236323264663564633835386135306562343237613366303866646635393336336438663234353361633664313666643332);
        const __gotots_results_2 = [__gotots_results_1[0], $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_1[1])] satisfies [
            RuntimeSlice<uint8>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ];
        let b = __gotots_results_2[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_2[1];
        if (!(err === undefined)) {
            return ["", false];
        }
        if (b.length === 0) {
            return ["", true];
        }
        let s = goUnsafeString<uint8>(b, 0, b.length);
        return decodeBytes(s);
    }
    static RootAndPath(vfs__shadow_1: tsonicTypeScriptRuntime.Location<Common> | undefined, path: gostring): [
        GoInterface | undefined,
        gostring,
        gostring
    ] {
        let fsys: GoInterface | undefined = void 0;
        let rootName: gostring = "";
        let rest: gostring = "";
        const __gotots_results_10 = SplitPath(path);
        rootName = __gotots_results_10[0];
        rest = __gotots_results_10[1];
        if (rest === "") {
            rest = ".";
        }
        const __gotots_callee_6 = ((vfs__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Common>).value.RootFor;
        const __gotots_argument_24 = rootName;
        const __gotots_results_11 = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24);
        const __gotots_results_12 = rootName;
        const __gotots_results_13 = rest;
        return [__gotots_results_11, __gotots_results_12, __gotots_results_13];
    }
    static Stat(vfs__shadow_1: tsonicTypeScriptRuntime.Location<Common> | undefined, path: gostring): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined {
        const __gotots_results_3 = Common.RootAndPath(vfs__shadow_1, path);
        let fsys: GoInterface | undefined = __gotots_results_3[0];
        let rest = __gotots_results_3[2];
        if (fsys === undefined) {
            return void 0;
        }
        const __gotots_argument_13 = fsys;
        const __gotots_argument_14 = rest;
        const __gotots_results_4 = provider_io_fs_direct.IoFsStatDirect(GoProviderProfileBridge.$to(__gotots_argument_13), __gotots_argument_14, GoProviderProfileBridge$Capability$36616162373365393533383639383931343437393031363365313738386338393765303065323330616263343362323736626162646463323661356335376163);
        const __gotots_results_5 = [$goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct.$from(__gotots_results_4[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_4[1])] satisfies [
            $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ];
        let stat: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined = __gotots_results_5[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_5[1];
        if (!(err === undefined)) {
            return void 0;
        }
        return stat;
    }
    static WalkDir(vfs__shadow_1: tsonicTypeScriptRuntime.Location<Common> | undefined, root: gostring, walkFn: (($0: gostring, $1: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $2: $goInterface$Interface_Method_Error_void_to_string | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_results_6 = Common.RootAndPath(vfs__shadow_1, root);
        let fsys: GoInterface | undefined = __gotots_results_6[0];
        let rootName = __gotots_results_6[1];
        let rest = __gotots_results_6[2];
        if (fsys === undefined) {
            return void 0;
        }
        const __gotots_argument_18 = fsys;
        const __gotots_argument_19 = rest;
        const __gotots_argument_20 = (path: gostring, d: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, err: $goInterface$Interface_Method_Error_void_to_string | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
            if (path === ".") {
                path = "";
            }
            const __gotots_callee_4 = walkFn;
            const __gotots_argument_15 = rootName + path;
            const __gotots_argument_16 = d;
            const __gotots_argument_17 = err;
            return (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15, __gotots_argument_16, __gotots_argument_17);
        };
        const __gotots_callee_5 = __gotots_argument_20;
        return $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(provider_io_fs_direct.IoFsWalkDirDirect(GoProviderProfileBridge.$to(__gotots_argument_18), __gotots_argument_19, __gotots_callee_5 === undefined ? undefined : ($providerArgument0, $providerArgument1, $providerArgument2) => {
            return GoProviderInterfaceBridge.$to(__gotots_callee_5($providerArgument0, $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct.$from($providerArgument1), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from($providerArgument2)));
        }, $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.SkipAll)), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.SkipDir)), GoProviderProfileBridge$Capability$64323930666333653635613838653931376430336664316239616433313034303362636432643065326535626439636265393930633861333932623038373036, GoProviderProfileBridge$Capability$61323536363437313039626335663137663534326461653038626462333336343362653139393962383331386463656435326132353235343365326563333733, GoProviderProfileBridge$Capability$36616162373365393533383639383931343437393031363365313738386338393765303065323330616263343362323736626162646463323661356335376163, GoInterface$contract));
    }
    static $go$private$internal__package_1$getEntries(vfs__shadow_1: tsonicTypeScriptRuntime.Location<Common> | undefined, path: gostring): RuntimeSlice<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined> {
        const __gotots_results_7 = Common.RootAndPath(vfs__shadow_1, path);
        let fsys: GoInterface | undefined = __gotots_results_7[0];
        let rest = __gotots_results_7[2];
        if (fsys === undefined) {
            return RuntimeSlice.nil<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined>();
        }
        const __gotots_argument_22 = fsys;
        const __gotots_argument_23 = rest;
        const __gotots_results_8 = provider_io_fs_direct.IoFsReadDirDirect(GoProviderProfileBridge.$to(__gotots_argument_22), __gotots_argument_23, GoProviderProfileBridge$Capability$64323930666333653635613838653931376430336664316239616433313034303362636432643065326535626439636265393930633861333932623038373036, GoProviderProfileBridge$Capability$61323536363437313039626335663137663534326461653038626462333336343362653139393962383331386463656435326132353235343365326563333733);
        const __gotots_results_9 = [new RuntimeSliceProjection<$goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined>(__gotots_results_8[0], ($providerElement: $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined): $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined => {
                return $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct.$from($providerElement);
            }, ($productElement: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined): $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined => {
                return $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct.$to($productElement);
            }, void 0, void 0), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_8[1])] satisfies [
            RuntimeSlice<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined>,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ];
        let entries = __gotots_results_9[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_9[1];
        if (!(err === undefined)) {
            return RuntimeSlice.nil<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined>();
        }
        return entries;
    }
}
export function RootLength(p: gostring): int {
    let l = GetEncodedRootLength__from_tspath(p);
    if (l === 0) {
        const __gotots_argument_21 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("vfs: path %q is not absolute", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(p)])));
        GoPanic.raise(__gotots_argument_21 === undefined ? GoPanicNilValue.create() : __gotots_argument_21);
    }
    else if (l < 0) {
        return ~l;
    }
    return l;
}
export function SplitPath(p: gostring): [
    gostring,
    gostring
] {
    let rootName: gostring = "";
    let rest: gostring = "";
    p = NormalizePath__from_tspath(p);
    let l = RootLength(p);
    const __gotots_assign_0 = goStringSlice(p, 0, l);
    const __gotots_assign_1 = goStringSlice(p, l);
    rootName = __gotots_assign_0;
    rest = __gotots_assign_1;
    rest = RemoveTrailingDirectorySeparator__from_tspath(rest);
    return [rootName, rest];
}
export function decodeBytes(s: gostring): [
    gostring,
    bool
] {
    let contents: gostring = "";
    let ok: bool = false;
    let bom = GoArray.zero<uint8, 2>(2, 0);
    if (s.length >= 2) {
        bom = GoArray.literal<uint8, 2>(2, 0, [0, 1], [goStringIndex(s, 0), goStringIndex(s, 1)]);
        {
            const __gotots_switch_tag_0 = bom.copy();
            let __gotots_switch_selection_0 = -1;
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_0 = false;
                if (!__gotots_switch_match_0) {
                    const __gotots_array_equal_0 = __gotots_switch_tag_0;
                    const __gotots_array_equal_1 = GoArray.literal<uint8, 2>(2, 0, [0, 1], [255, 254]);
                    let __gotots_array_equal_3 = true;
                    for (let __gotots_array_equal_2 = 0; __gotots_array_equal_2 < 2; __gotots_array_equal_2++) {
                        if (!(__gotots_array_equal_0.get(__gotots_array_equal_2) === __gotots_array_equal_1.get(__gotots_array_equal_2))) {
                            __gotots_array_equal_3 = false;
                            break;
                        }
                    }
                    __gotots_switch_match_0 = __gotots_array_equal_3;
                }
                if (__gotots_switch_match_0) {
                    __gotots_switch_selection_0 = 0;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_1 = false;
                if (!__gotots_switch_match_1) {
                    const __gotots_array_equal_4 = __gotots_switch_tag_0;
                    const __gotots_array_equal_5 = GoArray.literal<uint8, 2>(2, 0, [0, 1], [254, 255]);
                    let __gotots_array_equal_7 = true;
                    for (let __gotots_array_equal_6 = 0; __gotots_array_equal_6 < 2; __gotots_array_equal_6++) {
                        if (!(__gotots_array_equal_4.get(__gotots_array_equal_6) === __gotots_array_equal_5.get(__gotots_array_equal_6))) {
                            __gotots_array_equal_7 = false;
                            break;
                        }
                    }
                    __gotots_switch_match_1 = __gotots_array_equal_7;
                }
                if (__gotots_switch_match_1) {
                    __gotots_switch_selection_0 = 1;
                }
            }
            switch (__gotots_switch_selection_0) {
                case 0: {
                    return [decodeUtf16(goStringSlice(s, 2), new $goInterfaceAdapter$Named_binary$littleEndian(named_encoding_binary.BinaryLittleEndianOperations.$copy(binary__from_gostdlib.state.LittleEndian))), true];
                    break;
                }
                case 1: {
                    return [decodeUtf16(goStringSlice(s, 2), new $goInterfaceAdapter$Named_binary$bigEndian(named_encoding_binary.BinaryBigEndianOperations.$copy(binary__from_gostdlib.state.BigEndian))), true];
                    break;
                }
            }
        }
    }
    if (s.length >= 3 && goStringIndex(s, 0) === 239 && goStringIndex(s, 1) === 187 && goStringIndex(s, 2) === 191) {
        s = goStringSlice(s, 3);
    }
    return [s, true];
}
export function decodeUtf16(s: gostring, order: $goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64 | undefined): gostring {
    let ints = RuntimeSlice.make<uint16>(goNumberIntegerDivide(s.length, 2), null, 0);
    const ints$location = tsonicTypeScriptRuntime.boundLocation({}, () => ints, ints$next => ints = ints$next);
    {
        const __gotots_conversion_0 = strings__from_gostdlib.NewReader(s);
        const __gotots_argument_25 = new $goInterfaceAdapter$PointerTo_Named_strings$Reader(__gotots_conversion_0 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<strings__from_gostdlib.Reader>(__gotots_conversion_0, (): strings__from_gostdlib.Reader => {
                return __gotots_conversion_0;
            }, ($go$providerPointerValue: strings__from_gostdlib.Reader): void => {
                named_strings.StringsReaderOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
            }));
        const __gotots_argument_26 = order;
        const __gotots_argument_27 = new $goInterfaceAdapter$PointerTo_SliceOf_uint16(ints$location);
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(provider_encoding_binary.EncodingBinaryReadDirect($goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct.$to(__gotots_argument_25), $goProviderInterfaceBridge$Named_binary$ByteOrder.$to(__gotots_argument_26), __gotots_argument_27));
        if (!(err === undefined)) {
            return "";
        }
    }
    const __gotots_conversion_1 = utf16__from_gostdlib.Decode(ints);
    let __gotots_conversion_2 = "";
    for (let __gotots_conversion_3 = 0; __gotots_conversion_3 < __gotots_conversion_1.length; __gotots_conversion_3++) {
        __gotots_conversion_2 += goStringEncodeRune(__gotots_conversion_1.get(__gotots_conversion_3));
    }
    return __gotots_conversion_2;
}
