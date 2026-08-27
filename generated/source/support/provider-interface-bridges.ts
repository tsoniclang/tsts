import type { $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error, $goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error, $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error, $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string, $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string, $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "./interface-contracts.js";
import type * as flate from "@gotots/gostdlib/compress/flate.js";
import type * as context from "@gotots/gostdlib/context.js";
import type * as binary from "@gotots/gostdlib/encoding/binary.js";
import type * as scalars from "@gotots/gostdlib/internal/scalars.js";
import type * as io from "@gotots/gostdlib/io.js";
import type * as fs from "@gotots/gostdlib/io/fs.js";
import type * as net from "@gotots/gostdlib/net.js";
import type * as os from "@gotots/gostdlib/os.js";
import type * as sort from "@gotots/gostdlib/sort.js";
import type * as time from "@gotots/gostdlib/time.js";
import type { GoReceiveChannel } from "@gotots/runtime/channel.js";
import type { GoError, GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int, int64, uint16, uint32, uint64, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { $goInterface$Interface_Method_Is_Named_error_to_bool$contract, $goInterface$Interface_Method_Is_Named_error_to_bool$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is, $goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64$contract, $goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64$is, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void$contract, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void$is, $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$contract, $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$is, $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$contract, $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$is, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode$contract, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode$is, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void$contract, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void$is, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error$contract, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error$is, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error$contract, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error$is, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error$contract, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error$is, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error$contract, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error$is, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$contract, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$is, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$contract, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$is, $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$contract, $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$is, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error$contract, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error$is, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error$contract, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error$is, $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error$contract, $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error$is, $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error$contract, $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error$is, $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string$contract, $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string$is, $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string$contract, $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string$is, $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void$contract, $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void$is, $goInterface$Interface_Method_Error_void_to_string$contract as GoInterface$contract, $goInterface$Interface_Method_Error_void_to_string$is as GoInterface$is } from "./interface-contracts.js";
import * as provider_error from "@gotots/gostdlib/internal/facets/provider-error.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoProviderInterfaceBridge } from "@gotots/runtime/interface-value.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSliceProjection } from "@gotots/runtime/slice.js";
export class $goProviderInterfaceBridge$Named_binary$ByteOrder extends GoProviderInterfaceBridge<binary.ByteOrder> implements $goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64 {
    private constructor(value: binary.ByteOrder) {
        super(value, $goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64$contract);
    }
    static $from(value: binary.ByteOrder | undefined): $goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64 | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_binary$ByteOrder ? value : new $goProviderInterfaceBridge$Named_binary$ByteOrder(value);
    }
    static $to(value: $goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64 | undefined): binary.ByteOrder | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_binary$ByteOrder) {
            return value.$go$value;
        }
        return value;
    }
    PutUint16($argument0: RuntimeSlice<uint8>, $argument1: uint16): void {
        this.$go$value.PutUint16($argument0, $argument1);
    }
    PutUint32($argument0: RuntimeSlice<uint8>, $argument1: uint32): void {
        this.$go$value.PutUint32($argument0, $argument1);
    }
    PutUint64($argument0: RuntimeSlice<uint8>, $argument1: uint64): void {
        this.$go$value.PutUint64($argument0, $argument1);
    }
    String(): gostring {
        return this.$go$value.String();
    }
    Uint16($argument0: RuntimeSlice<uint8>): uint16 {
        return this.$go$value.Uint16($argument0);
    }
    Uint32($argument0: RuntimeSlice<uint8>): uint32 {
        return this.$go$value.Uint32($argument0);
    }
    Uint64($argument0: RuntimeSlice<uint8>): uint64 {
        return this.$go$value.Uint64($argument0);
    }
}
export class $goProviderInterfaceBridge$Named_context$Context extends GoProviderInterfaceBridge<context.Context> implements $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void {
    private constructor(value: context.Context) {
        super(value, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void$contract);
    }
    static $from(value: context.Context | undefined): $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_context$Context ? value : new $goProviderInterfaceBridge$Named_context$Context(value);
    }
    static $to(value: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined): context.Context | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_context$Context) {
            return value.$go$value;
        }
        return GoPanic.raiseRuntime("provider interface received a foreign implementation");
    }
    Deadline(): [
        time.Time,
        bool
    ] {
        return this.$go$value.Deadline();
    }
    Done(): GoReceiveChannel<GoEmptyStruct> | undefined {
        return this.$go$value.Done();
    }
    Err(): GoInterface | undefined {
        return $goProviderInterfaceBridge$Named_error.$from(this.$go$value.Err());
    }
    Value($argument0: $goInterface$Interface_void | undefined): $goInterface$Interface_void | undefined {
        return this.$go$value.Value($argument0);
    }
}
export class $goProviderInterfaceBridge$Named_error extends GoProviderInterfaceBridge<GoError> implements GoInterface, $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error {
    private readonly $go$capability_0: provider_error.ProviderErrorIsDirect | undefined;
    private readonly $go$capability_1: provider_error.ProviderErrorUnwrapDirect | undefined;
    private readonly $go$capability_2: provider_error.ProviderErrorUnwrapManyDirect | undefined;
    private constructor(value: GoError) {
        const $go$capability_0 = provider_error.AsProviderErrorIsDirect(value);
        const $go$capability_1 = provider_error.AsProviderErrorUnwrapDirect(value);
        const $go$capability_2 = provider_error.AsProviderErrorUnwrapManyDirect(value);
        if ($go$capability_1 !== undefined && $go$capability_2 !== undefined) {
            GoPanic.raiseRuntime("provider exposed incompatible Go interface capabilities");
        }
        super(value, [...GoInterface$contract, ...$go$capability_0 !== undefined ? $goInterface$Interface_Method_Is_Named_error_to_bool$contract : [], ...$go$capability_1 !== undefined ? $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract : [], ...$go$capability_2 !== undefined ? $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract : []]);
        this.$go$capability_0 = $go$capability_0;
        this.$go$capability_1 = $go$capability_1;
        this.$go$capability_2 = $go$capability_2;
    }
    static $from(value: GoError | undefined): GoInterface | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_error ? value : new $goProviderInterfaceBridge$Named_error(value);
    }
    static $to(value: GoInterface | undefined): GoError | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_error) {
            return value.$go$value;
        }
        return value;
    }
    Error(): gostring {
        return this.$go$value.Error();
    }
    Is($argument0: GoInterface | undefined): bool {
        const $go$capability_0 = this.$go$capability_0;
        if ($go$capability_0 !== undefined) {
            return $go$capability_0.Is($goProviderInterfaceBridge$Named_error.$to($argument0));
        }
        return GoPanic.raiseRuntime("provider interface capability is absent");
    }
    Unwrap(): GoInterface | undefined;
    Unwrap(): RuntimeSlice<GoInterface | undefined>;
    Unwrap(): (GoInterface | undefined) | RuntimeSlice<GoInterface | undefined> {
        const $go$capability_1 = this.$go$capability_1;
        if ($go$capability_1 !== undefined) {
            return $goProviderInterfaceBridge$Named_error.$from($go$capability_1.Unwrap());
        }
        const $go$capability_2 = this.$go$capability_2;
        if ($go$capability_2 !== undefined) {
            return new RuntimeSliceProjection<GoInterface | undefined, GoInterface | undefined>($go$capability_2.Unwrap(), ($providerElement: GoInterface | undefined): GoInterface | undefined => {
                return $goProviderInterfaceBridge$Named_error.$from($providerElement);
            }, ($productElement: GoInterface | undefined): GoInterface | undefined => {
                return $goProviderInterfaceBridge$Named_error.$to($productElement);
            }, void 0, void 0);
        }
        return GoPanic.raiseRuntime("provider interface capability is absent");
    }
}
export class $goProviderInterfaceBridge$Named_flate$Reader extends GoProviderInterfaceBridge<flate.Reader> implements $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error {
    private constructor(value: flate.Reader) {
        super(value, $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$contract);
    }
    static $from(value: flate.Reader | undefined): $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_flate$Reader ? value : new $goProviderInterfaceBridge$Named_flate$Reader(value);
    }
    static $to(value: $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): flate.Reader | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_flate$Reader) {
            return value.$go$value;
        }
        return GoPanic.raiseRuntime("provider interface received a foreign implementation");
    }
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_19 = this.$go$value.Read($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_19[0])), $goProviderInterfaceBridge$Named_error.$from(__gotots_results_19[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
    ReadByte(): [
        uint8,
        GoInterface | undefined
    ] {
        const __gotots_results_20 = this.$go$value.ReadByte();
        return [__gotots_results_20[0], $goProviderInterfaceBridge$Named_error.$from(__gotots_results_20[1])] satisfies [
            uint8,
            GoInterface | undefined
        ];
    }
}
export class $goProviderInterfaceBridge$Named_fs$DirEntry extends GoProviderInterfaceBridge<fs.DirEntry> implements $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode {
    private constructor(value: fs.DirEntry) {
        super(value, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode$contract);
    }
    static $from(value: fs.DirEntry | undefined): $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_fs$DirEntry ? value : new $goProviderInterfaceBridge$Named_fs$DirEntry(value);
    }
    static $to(value: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined): fs.DirEntry | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_fs$DirEntry) {
            return value.$go$value;
        }
        return GoPanic.raiseRuntime("provider interface received a foreign implementation");
    }
    Info(): [
        $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
        GoInterface | undefined
    ] {
        const __gotots_results_26 = this.$go$value.Info();
        return [$goProviderInterfaceBridge$Named_fs$FileInfo.$from(__gotots_results_26[0]), $goProviderInterfaceBridge$Named_error.$from(__gotots_results_26[1])] satisfies [
            $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
            GoInterface | undefined
        ];
    }
    IsDir(): bool {
        return this.$go$value.IsDir();
    }
    Name(): gostring {
        return this.$go$value.Name();
    }
    Type(): fs.FileMode {
        return this.$go$value.Type();
    }
}
export class $goProviderInterfaceBridge$Named_fs$FS extends GoProviderInterfaceBridge<fs.FS> implements $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error {
    private constructor(value: fs.FS) {
        super(value, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error$contract);
    }
    static $from(value: fs.FS | undefined): $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_fs$FS ? value : new $goProviderInterfaceBridge$Named_fs$FS(value);
    }
    static $to(value: $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error | undefined): fs.FS | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_fs$FS) {
            return value.$go$value;
        }
        return GoPanic.raiseRuntime("provider interface received a foreign implementation");
    }
    Open($argument0: gostring): [
        $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
        GoInterface | undefined
    ] {
        const __gotots_results_29 = this.$go$value.Open($argument0);
        return [$goProviderInterfaceBridge$Named_fs$File.$from(__gotots_results_29[0]), $goProviderInterfaceBridge$Named_error.$from(__gotots_results_29[1])] satisfies [
            $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
            GoInterface | undefined
        ];
    }
}
export class $goProviderInterfaceBridge$Named_fs$File extends GoProviderInterfaceBridge<fs.File> implements $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error {
    private constructor(value: fs.File) {
        super(value, $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$contract);
    }
    static $from(value: fs.File | undefined): $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_fs$File ? value : new $goProviderInterfaceBridge$Named_fs$File(value);
    }
    static $to(value: $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined): fs.File | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_fs$File) {
            return value.$go$value;
        }
        return GoPanic.raiseRuntime("provider interface received a foreign implementation");
    }
    Close(): GoInterface | undefined {
        return $goProviderInterfaceBridge$Named_error.$from(this.$go$value.Close());
    }
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_30 = this.$go$value.Read($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_30[0])), $goProviderInterfaceBridge$Named_error.$from(__gotots_results_30[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
    Stat(): [
        $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
        GoInterface | undefined
    ] {
        const __gotots_results_31 = this.$go$value.Stat();
        return [$goProviderInterfaceBridge$Named_fs$FileInfo.$from(__gotots_results_31[0]), $goProviderInterfaceBridge$Named_error.$from(__gotots_results_31[1])] satisfies [
            $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
            GoInterface | undefined
        ];
    }
}
export class $goProviderInterfaceBridge$Named_fs$FileInfo extends GoProviderInterfaceBridge<fs.FileInfo> implements $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void {
    private constructor(value: fs.FileInfo) {
        super(value, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void$contract);
    }
    static $from(value: fs.FileInfo | undefined): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_fs$FileInfo ? value : new $goProviderInterfaceBridge$Named_fs$FileInfo(value);
    }
    static $to(value: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined): fs.FileInfo | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_fs$FileInfo) {
            return value.$go$value;
        }
        return GoPanic.raiseRuntime("provider interface received a foreign implementation");
    }
    IsDir(): bool {
        return this.$go$value.IsDir();
    }
    ModTime(): time.Time {
        return this.$go$value.ModTime();
    }
    Mode(): fs.FileMode {
        return this.$go$value.Mode();
    }
    Name(): gostring {
        return this.$go$value.Name();
    }
    Size(): int64 {
        return this.$go$value.Size();
    }
    Sys(): $goInterface$Interface_void | undefined {
        return this.$go$value.Sys();
    }
}
export class $goProviderInterfaceBridge$Named_io$ReadCloser extends GoProviderInterfaceBridge<io.ReadCloser> implements $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error {
    private constructor(value: io.ReadCloser) {
        super(value, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$contract);
    }
    static $from(value: io.ReadCloser | undefined): $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_io$ReadCloser ? value : new $goProviderInterfaceBridge$Named_io$ReadCloser(value);
    }
    static $to(value: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): io.ReadCloser | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_io$ReadCloser) {
            return value.$go$value;
        }
        return GoPanic.raiseRuntime("provider interface received a foreign implementation");
    }
    Close(): GoInterface | undefined {
        return $goProviderInterfaceBridge$Named_error.$from(this.$go$value.Close());
    }
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_23 = this.$go$value.Read($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_23[0])), $goProviderInterfaceBridge$Named_error.$from(__gotots_results_23[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
}
export class $goProviderInterfaceBridge$Named_io$Reader extends GoProviderInterfaceBridge<io.Reader> implements $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error {
    private constructor(value: io.Reader) {
        super(value, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error$contract);
    }
    static $from(value: io.Reader | undefined): $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_io$Reader ? value : new $goProviderInterfaceBridge$Named_io$Reader(value);
    }
    static $to(value: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): io.Reader | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_io$Reader) {
            return value.$go$value;
        }
        return GoPanic.raiseRuntime("provider interface received a foreign implementation");
    }
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_14 = this.$go$value.Read($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_14[0])), $goProviderInterfaceBridge$Named_error.$from(__gotots_results_14[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
}
export class $goProviderInterfaceBridge$Named_io$WriteCloser extends GoProviderInterfaceBridge<io.WriteCloser> implements $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error {
    private constructor(value: io.WriteCloser) {
        super(value, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$contract);
    }
    static $from(value: io.WriteCloser | undefined): $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_io$WriteCloser ? value : new $goProviderInterfaceBridge$Named_io$WriteCloser(value);
    }
    static $to(value: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined): io.WriteCloser | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_io$WriteCloser) {
            return value.$go$value;
        }
        return GoPanic.raiseRuntime("provider interface received a foreign implementation");
    }
    Close(): GoInterface | undefined {
        return $goProviderInterfaceBridge$Named_error.$from(this.$go$value.Close());
    }
    Write($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_4 = this.$go$value.Write($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_4[0])), $goProviderInterfaceBridge$Named_error.$from(__gotots_results_4[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
}
export class $goProviderInterfaceBridge$Named_io$Writer extends GoProviderInterfaceBridge<io.Writer> implements $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error {
    private constructor(value: io.Writer) {
        super(value, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error$contract);
    }
    static $from(value: io.Writer | undefined): $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_io$Writer ? value : new $goProviderInterfaceBridge$Named_io$Writer(value);
    }
    static $to(value: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined): io.Writer | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_io$Writer) {
            return value.$go$value;
        }
        return GoPanic.raiseRuntime("provider interface received a foreign implementation");
    }
    Write($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_0 = this.$go$value.Write($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_0[0])), $goProviderInterfaceBridge$Named_error.$from(__gotots_results_0[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
}
export class $goProviderInterfaceBridge$Named_net$Addr extends GoProviderInterfaceBridge<net.Addr> implements $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string {
    private constructor(value: net.Addr) {
        super(value, $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string$contract);
    }
    static $from(value: net.Addr | undefined): $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_net$Addr ? value : new $goProviderInterfaceBridge$Named_net$Addr(value);
    }
    static $to(value: $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string | undefined): net.Addr | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_net$Addr) {
            return value.$go$value;
        }
        return value;
    }
    Network(): gostring {
        return this.$go$value.Network();
    }
    String(): gostring {
        return this.$go$value.String();
    }
}
export class $goProviderInterfaceBridge$Named_net$Conn extends GoProviderInterfaceBridge<net.Conn> implements $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error {
    private constructor(value: net.Conn) {
        super(value, $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error$contract);
    }
    static $from(value: net.Conn | undefined): $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_net$Conn ? value : new $goProviderInterfaceBridge$Named_net$Conn(value);
    }
    static $to(value: $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error | undefined): net.Conn | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_net$Conn) {
            return value.$go$value;
        }
        return GoPanic.raiseRuntime("provider interface received a foreign implementation");
    }
    Close(): GoInterface | undefined {
        return $goProviderInterfaceBridge$Named_error.$from(this.$go$value.Close());
    }
    LocalAddr(): $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string | undefined {
        return $goProviderInterfaceBridge$Named_net$Addr.$from(this.$go$value.LocalAddr());
    }
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_12 = this.$go$value.Read($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_12[0])), $goProviderInterfaceBridge$Named_error.$from(__gotots_results_12[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
    RemoteAddr(): $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string | undefined {
        return $goProviderInterfaceBridge$Named_net$Addr.$from(this.$go$value.RemoteAddr());
    }
    SetDeadline($argument0: time.Time): GoInterface | undefined {
        return $goProviderInterfaceBridge$Named_error.$from(this.$go$value.SetDeadline($argument0));
    }
    SetReadDeadline($argument0: time.Time): GoInterface | undefined {
        return $goProviderInterfaceBridge$Named_error.$from(this.$go$value.SetReadDeadline($argument0));
    }
    SetWriteDeadline($argument0: time.Time): GoInterface | undefined {
        return $goProviderInterfaceBridge$Named_error.$from(this.$go$value.SetWriteDeadline($argument0));
    }
    Write($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_13 = this.$go$value.Write($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_13[0])), $goProviderInterfaceBridge$Named_error.$from(__gotots_results_13[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
}
export class $goProviderInterfaceBridge$Named_net$Listener extends GoProviderInterfaceBridge<net.Listener> implements $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error {
    private constructor(value: net.Listener) {
        super(value, $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error$contract);
    }
    static $from(value: net.Listener | undefined): $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_net$Listener ? value : new $goProviderInterfaceBridge$Named_net$Listener(value);
    }
    static $to(value: $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error | undefined): net.Listener | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_net$Listener) {
            return value.$go$value;
        }
        return GoPanic.raiseRuntime("provider interface received a foreign implementation");
    }
    Accept(): [
        $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error | undefined,
        GoInterface | undefined
    ] {
        const __gotots_results_9 = this.$go$value.Accept();
        return [$goProviderInterfaceBridge$Named_net$Conn.$from(__gotots_results_9[0]), $goProviderInterfaceBridge$Named_error.$from(__gotots_results_9[1])] satisfies [
            $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error | undefined,
            GoInterface | undefined
        ];
    }
    Addr(): $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string | undefined {
        return $goProviderInterfaceBridge$Named_net$Addr.$from(this.$go$value.Addr());
    }
    Close(): GoInterface | undefined {
        return $goProviderInterfaceBridge$Named_error.$from(this.$go$value.Close());
    }
}
export class $goProviderInterfaceBridge$Named_os$Signal extends GoProviderInterfaceBridge<os.Signal> implements $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string {
    private constructor(value: os.Signal) {
        super(value, $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string$contract);
    }
    static $from(value: os.Signal | undefined): $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_os$Signal ? value : new $goProviderInterfaceBridge$Named_os$Signal(value);
    }
    static $to(value: $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined): os.Signal | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_os$Signal) {
            return value.$go$value;
        }
        return value;
    }
    Signal(): void {
        this.$go$value.Signal();
    }
    String(): gostring {
        return this.$go$value.String();
    }
}
export class $goProviderInterfaceBridge$Named_sort$Interface extends GoProviderInterfaceBridge<sort.Interface> implements $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void {
    private constructor(value: sort.Interface) {
        super(value, $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void$contract);
    }
    static $from(value: sort.Interface | undefined): $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void | undefined {
        return value === undefined ? undefined : value instanceof $goProviderInterfaceBridge$Named_sort$Interface ? value : new $goProviderInterfaceBridge$Named_sort$Interface(value);
    }
    static $to(value: $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void | undefined): sort.Interface | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_sort$Interface) {
            return value.$go$value;
        }
        return GoPanic.raiseRuntime("provider interface received a foreign implementation");
    }
    Len(): int {
        return globalThis.Number(BigInt.asIntN(64, this.$go$value.Len()));
    }
    Less($argument0: int, $argument1: int): bool {
        return this.$go$value.Less(BigInt.asIntN(64, goNumberToBigInt($argument0)), BigInt.asIntN(64, goNumberToBigInt($argument1)));
    }
    Swap($argument0: int, $argument1: int): void {
        this.$go$value.Swap(BigInt.asIntN(64, goNumberToBigInt($argument0)), BigInt.asIntN(64, goNumberToBigInt($argument1)));
    }
}
export interface $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract extends GoInterfaceValue {
    Deadline(): [
        time.Time,
        scalars.bool
    ];
    Done(): GoReceiveChannel<GoEmptyStruct> | undefined;
    Err(): $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined;
    Value($argument0: $goInterface$Interface_void | undefined): $goInterface$Interface_void | undefined;
}
class $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void> implements $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void) {
        super(value, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void$contract);
    }
    $go$generated(): $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void {
        return this.$go$value;
    }
    Deadline(): [
        time.Time,
        scalars.bool
    ] {
        return this.$go$value.Deadline();
    }
    Done(): GoReceiveChannel<GoEmptyStruct> | undefined {
        return this.$go$value.Done();
    }
    Err(): $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined {
        return $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(this.$go$value.Err());
    }
    Value($argument0: $goInterface$Interface_void | undefined): $goInterface$Interface_void | undefined {
        return this.$go$value.Value($argument0);
    }
}
export class $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract> implements $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void {
    private constructor(value: $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract | undefined): $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct ? value : new $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined): $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct) {
            return value.$go$value;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_context$Context) {
            return $goProviderInterfaceBridge$Named_context$Context.$to(value);
        }
        return new $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$Generated(value);
    }
    Deadline(): [
        time.Time,
        bool
    ] {
        return this.$go$value.Deadline();
    }
    Done(): GoReceiveChannel<GoEmptyStruct> | undefined {
        return this.$go$value.Done();
    }
    Err(): GoInterface | undefined {
        return $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(this.$go$value.Err());
    }
    Value($argument0: $goInterface$Interface_void | undefined): $goInterface$Interface_void | undefined {
        return this.$go$value.Value($argument0);
    }
}
export interface $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract extends GoInterfaceValue {
    Error(): scalars.gostring;
}
class $goProviderProfileBridge$Named_error$Using$Error$Direct$Generated extends GoProviderInterfaceBridge<GoInterface> implements $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract {
    constructor(value: GoInterface) {
        const $go$capability_0 = $goInterface$Interface_Method_Is_Named_error_to_bool$is(value) ? value : undefined;
        const $go$capability_1 = $goInterface$Interface_Method_Unwrap_void_to_Named_error$is(value) ? value : undefined;
        const $go$capability_2 = $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is(value) ? value : undefined;
        if ($go$capability_1 !== undefined && $go$capability_2 !== undefined) {
            GoPanic.raiseRuntime("provider exposed incompatible Go interface capabilities");
        }
        super(value, [...GoInterface$contract, ...$go$capability_0 !== undefined ? $goInterface$Interface_Method_Is_Named_error_to_bool$contract : [], ...$go$capability_1 !== undefined ? $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract : [], ...$go$capability_2 !== undefined ? $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract : []]);
        this.$go$capability_0 = $go$capability_0;
        this.$go$capability_1 = $go$capability_1;
        this.$go$capability_2 = $go$capability_2;
    }
    $go$generated(): GoInterface {
        return this.$go$value;
    }
    private readonly $go$capability_0: $goInterface$Interface_Method_Is_Named_error_to_bool | undefined;
    private readonly $go$capability_1: $goInterface$Interface_Method_Unwrap_void_to_Named_error | undefined;
    private readonly $go$capability_2: $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error | undefined;
    Error(): scalars.gostring {
        return this.$go$value.Error();
    }
    Is($argument0: $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined): scalars.bool {
        const $go$capability_0 = this.$go$capability_0;
        if ($go$capability_0 !== undefined) {
            return $go$capability_0.Is($goProviderProfileBridge$Named_error$Using$Error$Direct.$from($argument0));
        }
        return GoPanic.raiseRuntime("provider interface capability is absent");
    }
    Unwrap(): $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined;
    Unwrap(): RuntimeSlice<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined>;
    Unwrap(): ($goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined) | RuntimeSlice<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined> {
        const $go$capability_1 = this.$go$capability_1;
        if ($go$capability_1 !== undefined) {
            return $goProviderProfileBridge$Named_error$Using$Error$Direct.$to($go$capability_1.Unwrap());
        }
        const $go$capability_2 = this.$go$capability_2;
        if ($go$capability_2 !== undefined) {
            return new RuntimeSliceProjection<GoInterface | undefined, $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined>($go$capability_2.Unwrap(), ($productElement: GoInterface | undefined): $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined => {
                return $goProviderProfileBridge$Named_error$Using$Error$Direct.$to($productElement);
            }, ($providerElement: $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined): GoInterface | undefined => {
                return $goProviderProfileBridge$Named_error$Using$Error$Direct.$from($providerElement);
            }, void 0, void 0);
        }
        return GoPanic.raiseRuntime("provider interface capability is absent");
    }
}
export class $goProviderProfileBridge$Named_error$Using$Error$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract> implements GoInterface, $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error {
    private constructor(value: $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract) {
        const $go$capability_0 = provider_error.AsProviderErrorIsDirect(value);
        const $go$capability_1 = provider_error.AsProviderErrorUnwrapDirect(value);
        const $go$capability_2 = provider_error.AsProviderErrorUnwrapManyDirect(value);
        if ($go$capability_1 !== undefined && $go$capability_2 !== undefined) {
            GoPanic.raiseRuntime("provider exposed incompatible Go interface capabilities");
        }
        super(value, [...GoInterface$contract, ...$go$capability_0 !== undefined ? $goInterface$Interface_Method_Is_Named_error_to_bool$contract : [], ...$go$capability_1 !== undefined ? $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract : [], ...$go$capability_2 !== undefined ? $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract : []]);
        this.$go$capability_0 = $go$capability_0;
        this.$go$capability_1 = $go$capability_1;
        this.$go$capability_2 = $go$capability_2;
    }
    static $from(value: $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined): GoInterface | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_error$Using$Error$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_error$Using$Error$Direct ? value : new $goProviderProfileBridge$Named_error$Using$Error$Direct(value);
    }
    static $to(value: GoInterface | undefined): $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_error$Using$Error$Direct) {
            return value.$go$value;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_error) {
            return $goProviderInterfaceBridge$Named_error.$to(value);
        }
        return new $goProviderProfileBridge$Named_error$Using$Error$Direct$Generated(value);
    }
    private readonly $go$capability_0: provider_error.ProviderErrorIsDirect | undefined;
    private readonly $go$capability_1: provider_error.ProviderErrorUnwrapDirect | undefined;
    private readonly $go$capability_2: provider_error.ProviderErrorUnwrapManyDirect | undefined;
    Error(): gostring {
        return this.$go$value.Error();
    }
    Is($argument0: GoInterface | undefined): bool {
        const $go$capability_0 = this.$go$capability_0;
        if ($go$capability_0 !== undefined) {
            return $go$capability_0.Is($goProviderProfileBridge$Named_error$Using$Error$Direct.$to($argument0));
        }
        return GoPanic.raiseRuntime("provider interface capability is absent");
    }
    Unwrap(): GoInterface | undefined;
    Unwrap(): RuntimeSlice<GoInterface | undefined>;
    Unwrap(): (GoInterface | undefined) | RuntimeSlice<GoInterface | undefined> {
        const $go$capability_1 = this.$go$capability_1;
        if ($go$capability_1 !== undefined) {
            return $goProviderProfileBridge$Named_error$Using$Error$Direct.$from($go$capability_1.Unwrap());
        }
        const $go$capability_2 = this.$go$capability_2;
        if ($go$capability_2 !== undefined) {
            return new RuntimeSliceProjection<GoInterface | undefined, GoInterface | undefined>($go$capability_2.Unwrap(), ($providerElement: GoInterface | undefined): GoInterface | undefined => {
                return $goProviderProfileBridge$Named_error$Using$Error$Direct.$from($providerElement);
            }, ($productElement: GoInterface | undefined): GoInterface | undefined => {
                return $goProviderProfileBridge$Named_error$Using$Error$Direct.$to($productElement);
            }, void 0, void 0);
        }
        return GoPanic.raiseRuntime("provider interface capability is absent");
    }
}
export interface $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct$ProviderContract extends GoInterfaceValue {
    Read($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
    ReadByte(): [
        scalars.uint8,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
}
class $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error> implements $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error) {
        super(value, $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$contract);
    }
    $go$generated(): $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error {
        return this.$go$value;
    }
    Read($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_16 = this.$go$value.Read($argument0);
        return [BigInt.asIntN(64, goNumberToBigInt(__gotots_results_16[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_16[1])] satisfies [
            scalars.int,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
    ReadByte(): [
        scalars.uint8,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_18 = this.$go$value.ReadByte();
        return [__gotots_results_18[0], $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_18[1])] satisfies [
            scalars.uint8,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
}
export class $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct$ProviderContract> implements $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error {
    private constructor(value: $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct$ProviderContract | undefined): $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct ? value : new $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct) {
            return value.$go$value;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_flate$Reader) {
            return $goProviderInterfaceBridge$Named_flate$Reader.$to(value);
        }
        return new $goProviderProfileBridge$Named_flate$Reader$Using$compress_u2f_flate_Reader$Direct$And$Error$Direct$Generated(value);
    }
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_15 = this.$go$value.Read($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_15[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_15[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
    ReadByte(): [
        uint8,
        GoInterface | undefined
    ] {
        const __gotots_results_17 = this.$go$value.ReadByte();
        return [__gotots_results_17[0], $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_17[1])] satisfies [
            uint8,
            GoInterface | undefined
        ];
    }
}
export interface $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract extends GoInterfaceValue {
    Info(): [
        $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
    IsDir(): scalars.bool;
    Name(): scalars.gostring;
    Type(): fs.FileMode;
}
class $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode> implements $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode) {
        super(value, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode$contract);
    }
    $go$generated(): $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode {
        return this.$go$value;
    }
    Info(): [
        $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_25 = this.$go$value.Info();
        return [$goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct.$to(__gotots_results_25[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_25[1])] satisfies [
            $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
    IsDir(): scalars.bool {
        return this.$go$value.IsDir();
    }
    Name(): scalars.gostring {
        return this.$go$value.Name();
    }
    Type(): fs.FileMode {
        return this.$go$value.Type();
    }
}
export class $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract> implements $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode {
    private constructor(value: $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined): $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct ? value : new $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined): $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct) {
            return value.$go$value;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_fs$DirEntry) {
            return $goProviderInterfaceBridge$Named_fs$DirEntry.$to(value);
        }
        return new $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$Generated(value);
    }
    Info(): [
        $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
        GoInterface | undefined
    ] {
        const __gotots_results_24 = this.$go$value.Info();
        return [$goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct.$from(__gotots_results_24[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_24[1])] satisfies [
            $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
            GoInterface | undefined
        ];
    }
    IsDir(): bool {
        return this.$go$value.IsDir();
    }
    Name(): gostring {
        return this.$go$value.Name();
    }
    Type(): fs.FileMode {
        return this.$go$value.Type();
    }
}
export interface $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract extends GoInterfaceValue {
    Open($argument0: scalars.gostring): [
        $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
}
class $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error> implements $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error) {
        super(value, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error$contract);
    }
    $go$generated(): $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error {
        return this.$go$value;
    }
    Open($argument0: scalars.gostring): [
        $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_28 = this.$go$value.Open($argument0);
        return [$goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct.$to(__gotots_results_28[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_28[1])] satisfies [
            $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
}
export class $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract> implements $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error {
    private constructor(value: $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined): $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct ? value : new $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error | undefined): $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct) {
            return value.$go$value;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_fs$FS) {
            return $goProviderInterfaceBridge$Named_fs$FS.$to(value);
        }
        return new $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Generated(value);
    }
    Open($argument0: gostring): [
        $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
        GoInterface | undefined
    ] {
        const __gotots_results_27 = this.$go$value.Open($argument0);
        return [$goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct.$from(__gotots_results_27[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_27[1])] satisfies [
            $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
            GoInterface | undefined
        ];
    }
}
function $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$36616162373365393533383639383931343437393031363365313738386338393765303065323330616263343362323736626162646463323661356335376163$raw(value: $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract): value is $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct$ProviderContract {
    return !(value instanceof GoProviderInterfaceBridge) && value.$go$implements($goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error$contract);
}
export function $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$36616162373365393533383639383931343437393031363365313738386338393765303065323330616263343362323736626162646463323661356335376163(value: $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined): $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct$ProviderContract | undefined {
    if (value === undefined) {
        return undefined;
    }
    if (value instanceof $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Generated) {
        const generated = value.$go$generated();
        return $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error$is(generated) ? $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct.$to(generated) : undefined;
    }
    return $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$36616162373365393533383639383931343437393031363365313738386338393765303065323330616263343362323736626162646463323661356335376163$raw(value) ? value : undefined;
}
function $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$64323930666333653635613838653931376430336664316239616433313034303362636432643065326535626439636265393930633861333932623038373036$raw(value: $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract): value is $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct$ProviderContract {
    return !(value instanceof GoProviderInterfaceBridge) && value.$go$implements($goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error$contract);
}
export function $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$64323930666333653635613838653931376430336664316239616433313034303362636432643065326535626439636265393930633861333932623038373036(value: $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined): $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct$ProviderContract | undefined {
    if (value === undefined) {
        return undefined;
    }
    if (value instanceof $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Generated) {
        const generated = value.$go$generated();
        return $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error$is(generated) ? $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct.$to(generated) : undefined;
    }
    return $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$64323930666333653635613838653931376430336664316239616433313034303362636432643065326535626439636265393930633861333932623038373036$raw(value) ? value : undefined;
}
function $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$65393938613736623464346232343236323264663564633835386135306562343237613366303866646635393336336438663234353361633664313666643332$raw(value: $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract): value is $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct$ProviderContract {
    return !(value instanceof GoProviderInterfaceBridge) && value.$go$implements($goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error$contract);
}
export function $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$65393938613736623464346232343236323264663564633835386135306562343237613366303866646635393336336438663234353361633664313666643332(value: $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined): $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct$ProviderContract | undefined {
    if (value === undefined) {
        return undefined;
    }
    if (value instanceof $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Generated) {
        const generated = value.$go$generated();
        return $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error$is(generated) ? $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct.$to(generated) : undefined;
    }
    return $goProviderProfileBridge$Named_fs$FS$Using$Error$Direct$And$io_u2f_fs_FS$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$65393938613736623464346232343236323264663564633835386135306562343237613366303866646635393336336438663234353361633664313666643332$raw(value) ? value : undefined;
}
export interface $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract extends GoInterfaceValue {
    Close(): $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined;
    Read($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
    Stat(): [
        $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
}
class $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error> implements $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error) {
        super(value, $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$contract);
    }
    $go$generated(): $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error {
        return this.$go$value;
    }
    Close(): $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined {
        return $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(this.$go$value.Close());
    }
    Read($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_37 = this.$go$value.Read($argument0);
        return [BigInt.asIntN(64, goNumberToBigInt(__gotots_results_37[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_37[1])] satisfies [
            scalars.int,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
    Stat(): [
        $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_39 = this.$go$value.Stat();
        return [$goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct.$to(__gotots_results_39[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_39[1])] satisfies [
            $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
}
export class $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract> implements $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error {
    private constructor(value: $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined): $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct ? value : new $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined): $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct) {
            return value.$go$value;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_fs$File) {
            return $goProviderInterfaceBridge$Named_fs$File.$to(value);
        }
        return new $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Generated(value);
    }
    Close(): GoInterface | undefined {
        return $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(this.$go$value.Close());
    }
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_36 = this.$go$value.Read($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_36[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_36[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
    Stat(): [
        $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
        GoInterface | undefined
    ] {
        const __gotots_results_38 = this.$go$value.Stat();
        return [$goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct.$from(__gotots_results_38[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_38[1])] satisfies [
            $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
            GoInterface | undefined
        ];
    }
}
function $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$61323536363437313039626335663137663534326461653038626462333336343362653139393962383331386463656435326132353235343365326563333733$raw(value: $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract): value is $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct$ProviderContract {
    return !(value instanceof GoProviderInterfaceBridge) && value.$go$implements($goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$contract);
}
export function $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$61323536363437313039626335663137663534326461653038626462333336343362653139393962383331386463656435326132353235343365326563333733(value: $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined): $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct$ProviderContract | undefined {
    if (value === undefined) {
        return undefined;
    }
    if (value instanceof $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Generated) {
        const generated = value.$go$generated();
        return $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$is(generated) ? $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct.$to(generated) : undefined;
    }
    return $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$Capability$61323536363437313039626335663137663534326461653038626462333336343362653139393962383331386463656435326132353235343365326563333733$raw(value) ? value : undefined;
}
export interface $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract extends GoInterfaceValue {
    IsDir(): scalars.bool;
    ModTime(): time.Time;
    Mode(): fs.FileMode;
    Name(): scalars.gostring;
    Size(): scalars.int64;
    Sys(): $goInterface$Interface_void | undefined;
}
class $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void> implements $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void) {
        super(value, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void$contract);
    }
    $go$generated(): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void {
        return this.$go$value;
    }
    IsDir(): scalars.bool {
        return this.$go$value.IsDir();
    }
    ModTime(): time.Time {
        return this.$go$value.ModTime();
    }
    Mode(): fs.FileMode {
        return this.$go$value.Mode();
    }
    Name(): scalars.gostring {
        return this.$go$value.Name();
    }
    Size(): scalars.int64 {
        return this.$go$value.Size();
    }
    Sys(): $goInterface$Interface_void | undefined {
        return this.$go$value.Sys();
    }
}
export class $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract> implements $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void {
    private constructor(value: $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined): $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct ? value : new $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined): $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct) {
            return value.$go$value;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_fs$FileInfo) {
            return $goProviderInterfaceBridge$Named_fs$FileInfo.$to(value);
        }
        return new $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$Generated(value);
    }
    IsDir(): bool {
        return this.$go$value.IsDir();
    }
    ModTime(): time.Time {
        return this.$go$value.ModTime();
    }
    Mode(): fs.FileMode {
        return this.$go$value.Mode();
    }
    Name(): gostring {
        return this.$go$value.Name();
    }
    Size(): int64 {
        return this.$go$value.Size();
    }
    Sys(): $goInterface$Interface_void | undefined {
        return this.$go$value.Sys();
    }
}
export interface $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct$ProviderContract extends GoInterfaceValue {
    Open($argument0: scalars.gostring): [
        $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
    ReadDir($argument0: scalars.gostring): [
        RuntimeSlice<$goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined>,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
}
class $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error> implements $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error) {
        super(value, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error$contract);
    }
    $go$generated(): $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error {
        return this.$go$value;
    }
    Open($argument0: scalars.gostring): [
        $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_47 = this.$go$value.Open($argument0);
        return [$goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct.$to(__gotots_results_47[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_47[1])] satisfies [
            $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
    ReadDir($argument0: scalars.gostring): [
        RuntimeSlice<$goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined>,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_49 = this.$go$value.ReadDir($argument0);
        return [new RuntimeSliceProjection<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined>(__gotots_results_49[0], ($productElement: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined): $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined => {
                return $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct.$to($productElement);
            }, ($providerElement: $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined): $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined => {
                return $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct.$from($providerElement);
            }, void 0, void 0), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_49[1])] satisfies [
            RuntimeSlice<$goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined>,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
}
export class $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct$ProviderContract> implements $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error {
    private constructor(value: $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct$ProviderContract | undefined): $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct ? value : new $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error | undefined): $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct) {
            return value.$go$value;
        }
        return new $goProviderProfileBridge$Named_fs$ReadDirFS$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFS$Direct$Generated(value);
    }
    Open($argument0: gostring): [
        $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
        GoInterface | undefined
    ] {
        const __gotots_results_46 = this.$go$value.Open($argument0);
        return [$goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct.$from(__gotots_results_46[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_46[1])] satisfies [
            $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
            GoInterface | undefined
        ];
    }
    ReadDir($argument0: gostring): [
        RuntimeSlice<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined>,
        GoInterface | undefined
    ] {
        const __gotots_results_48 = this.$go$value.ReadDir($argument0);
        return [new RuntimeSliceProjection<$goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined>(__gotots_results_48[0], ($providerElement: $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined): $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined => {
                return $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct.$from($providerElement);
            }, ($productElement: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined): $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined => {
                return $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct.$to($productElement);
            }, void 0, void 0), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_48[1])] satisfies [
            RuntimeSlice<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined>,
            GoInterface | undefined
        ];
    }
}
export interface $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct$ProviderContract extends GoInterfaceValue {
    Close(): $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined;
    Read($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
    ReadDir($argument0: scalars.int): [
        RuntimeSlice<$goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined>,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
    Stat(): [
        $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
}
class $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error> implements $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error) {
        super(value, $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$contract);
    }
    $go$generated(): $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error {
        return this.$go$value;
    }
    Close(): $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined {
        return $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(this.$go$value.Close());
    }
    Read($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_41 = this.$go$value.Read($argument0);
        return [BigInt.asIntN(64, goNumberToBigInt(__gotots_results_41[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_41[1])] satisfies [
            scalars.int,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
    ReadDir($argument0: scalars.int): [
        RuntimeSlice<$goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined>,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_43 = this.$go$value.ReadDir(globalThis.Number(BigInt.asIntN(64, $argument0)));
        return [new RuntimeSliceProjection<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined, $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined>(__gotots_results_43[0], ($productElement: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined): $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined => {
                return $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct.$to($productElement);
            }, ($providerElement: $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined): $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined => {
                return $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct.$from($providerElement);
            }, void 0, void 0), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_43[1])] satisfies [
            RuntimeSlice<$goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined>,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
    Stat(): [
        $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_45 = this.$go$value.Stat();
        return [$goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct.$to(__gotots_results_45[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_45[1])] satisfies [
            $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
}
export class $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct$ProviderContract> implements $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error {
    private constructor(value: $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct$ProviderContract | undefined): $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct ? value : new $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined): $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct) {
            return value.$go$value;
        }
        return new $goProviderProfileBridge$Named_fs$ReadDirFile$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadDirFile$Direct$Generated(value);
    }
    Close(): GoInterface | undefined {
        return $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(this.$go$value.Close());
    }
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_40 = this.$go$value.Read($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_40[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_40[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
    ReadDir($argument0: int): [
        RuntimeSlice<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined>,
        GoInterface | undefined
    ] {
        const __gotots_results_42 = this.$go$value.ReadDir(BigInt.asIntN(64, goNumberToBigInt($argument0)));
        return [new RuntimeSliceProjection<$goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined, $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined>(__gotots_results_42[0], ($providerElement: $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined): $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined => {
                return $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct.$from($providerElement);
            }, ($productElement: $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined): $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined => {
                return $goProviderProfileBridge$Named_fs$DirEntry$Using$Error$Direct$And$io_u2f_fs_DirEntry$Direct$And$io_u2f_fs_FileInfo$Direct.$to($productElement);
            }, void 0, void 0), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_42[1])] satisfies [
            RuntimeSlice<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined>,
            GoInterface | undefined
        ];
    }
    Stat(): [
        $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
        GoInterface | undefined
    ] {
        const __gotots_results_44 = this.$go$value.Stat();
        return [$goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct.$from(__gotots_results_44[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_44[1])] satisfies [
            $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
            GoInterface | undefined
        ];
    }
}
export interface $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct$ProviderContract extends GoInterfaceValue {
    Open($argument0: scalars.gostring): [
        $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
    ReadFile($argument0: scalars.gostring): [
        RuntimeSlice<scalars.uint8>,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
}
class $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error> implements $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error) {
        super(value, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error$contract);
    }
    $go$generated(): $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error {
        return this.$go$value;
    }
    Open($argument0: scalars.gostring): [
        $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_51 = this.$go$value.Open($argument0);
        return [$goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct.$to(__gotots_results_51[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_51[1])] satisfies [
            $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
    ReadFile($argument0: scalars.gostring): [
        RuntimeSlice<scalars.uint8>,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_53 = this.$go$value.ReadFile($argument0);
        return [__gotots_results_53[0], $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_53[1])] satisfies [
            RuntimeSlice<scalars.uint8>,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
}
export class $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct$ProviderContract> implements $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error {
    private constructor(value: $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct$ProviderContract | undefined): $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct ? value : new $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error | undefined): $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct) {
            return value.$go$value;
        }
        return new $goProviderProfileBridge$Named_fs$ReadFileFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_ReadFileFS$Direct$Generated(value);
    }
    Open($argument0: gostring): [
        $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
        GoInterface | undefined
    ] {
        const __gotots_results_50 = this.$go$value.Open($argument0);
        return [$goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct.$from(__gotots_results_50[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_50[1])] satisfies [
            $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
            GoInterface | undefined
        ];
    }
    ReadFile($argument0: gostring): [
        RuntimeSlice<uint8>,
        GoInterface | undefined
    ] {
        const __gotots_results_52 = this.$go$value.ReadFile($argument0);
        return [__gotots_results_52[0], $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_52[1])] satisfies [
            RuntimeSlice<uint8>,
            GoInterface | undefined
        ];
    }
}
export interface $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct$ProviderContract extends GoInterfaceValue {
    Open($argument0: scalars.gostring): [
        $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
    Stat($argument0: scalars.gostring): [
        $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
}
class $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error> implements $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error) {
        super(value, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error$contract);
    }
    $go$generated(): $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error {
        return this.$go$value;
    }
    Open($argument0: scalars.gostring): [
        $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_33 = this.$go$value.Open($argument0);
        return [$goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct.$to(__gotots_results_33[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_33[1])] satisfies [
            $goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
    Stat($argument0: scalars.gostring): [
        $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_35 = this.$go$value.Stat($argument0);
        return [$goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct.$to(__gotots_results_35[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_35[1])] satisfies [
            $goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct$ProviderContract | undefined,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
}
export class $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct$ProviderContract> implements $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error {
    private constructor(value: $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct$ProviderContract | undefined): $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct ? value : new $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error | undefined): $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct) {
            return value.$go$value;
        }
        return new $goProviderProfileBridge$Named_fs$StatFS$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct$And$io_u2f_fs_StatFS$Direct$Generated(value);
    }
    Open($argument0: gostring): [
        $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
        GoInterface | undefined
    ] {
        const __gotots_results_32 = this.$go$value.Open($argument0);
        return [$goProviderProfileBridge$Named_fs$File$Using$Error$Direct$And$io_u2f_fs_File$Direct$And$io_u2f_fs_FileInfo$Direct.$from(__gotots_results_32[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_32[1])] satisfies [
            $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
            GoInterface | undefined
        ];
    }
    Stat($argument0: gostring): [
        $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
        GoInterface | undefined
    ] {
        const __gotots_results_34 = this.$go$value.Stat($argument0);
        return [$goProviderProfileBridge$Named_fs$FileInfo$Using$io_u2f_fs_FileInfo$Direct.$from(__gotots_results_34[0]), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_34[1])] satisfies [
            $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
            GoInterface | undefined
        ];
    }
}
export interface $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct$ProviderContract extends GoInterfaceValue {
    Close(): $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined;
    Read($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
}
class $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error> implements $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error) {
        super(value, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$contract);
    }
    $go$generated(): $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error {
        return this.$go$value;
    }
    Close(): $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined {
        return $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(this.$go$value.Close());
    }
    Read($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_22 = this.$go$value.Read($argument0);
        return [BigInt.asIntN(64, goNumberToBigInt(__gotots_results_22[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_22[1])] satisfies [
            scalars.int,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
}
export class $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct$ProviderContract> implements $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error {
    private constructor(value: $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct$ProviderContract | undefined): $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct ? value : new $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct) {
            return value.$go$value;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_io$ReadCloser) {
            return $goProviderInterfaceBridge$Named_io$ReadCloser.$to(value);
        }
        return new $goProviderProfileBridge$Named_io$ReadCloser$Using$Error$Direct$And$io_ReadCloser$Direct$Generated(value);
    }
    Close(): GoInterface | undefined {
        return $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(this.$go$value.Close());
    }
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_21 = this.$go$value.Read($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_21[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_21[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
}
export interface $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$ProviderContract extends GoInterfaceValue {
    Read($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
}
class $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error> implements $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error) {
        super(value, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error$contract);
    }
    $go$generated(): $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error {
        return this.$go$value;
    }
    Read($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_11 = this.$go$value.Read($argument0);
        return [BigInt.asIntN(64, goNumberToBigInt(__gotots_results_11[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_11[1])] satisfies [
            scalars.int,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
}
export class $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$ProviderContract> implements $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error {
    private constructor(value: $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$ProviderContract | undefined): $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct ? value : new $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct) {
            return value.$go$value;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_io$Reader) {
            return $goProviderInterfaceBridge$Named_io$Reader.$to(value);
        }
        return new $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$Generated(value);
    }
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_10 = this.$go$value.Read($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_10[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_10[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
}
export interface $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct$ProviderContract extends GoInterfaceValue {
    Close(): $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined;
    Write($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
}
class $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error> implements $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error) {
        super(value, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$contract);
    }
    $go$generated(): $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error {
        return this.$go$value;
    }
    Close(): $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined {
        return $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(this.$go$value.Close());
    }
    Write($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_3 = this.$go$value.Write($argument0);
        return [BigInt.asIntN(64, goNumberToBigInt(__gotots_results_3[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_3[1])] satisfies [
            scalars.int,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
}
export class $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct$ProviderContract> implements $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error {
    private constructor(value: $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct$ProviderContract | undefined): $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct ? value : new $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined): $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct) {
            return value.$go$value;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_io$WriteCloser) {
            return $goProviderInterfaceBridge$Named_io$WriteCloser.$to(value);
        }
        return new $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct$Generated(value);
    }
    Close(): GoInterface | undefined {
        return $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(this.$go$value.Close());
    }
    Write($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_2 = this.$go$value.Write($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_2[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_2[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
}
export interface $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract extends GoInterfaceValue {
    Write($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ];
}
class $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error> implements $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error) {
        super(value, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error$contract);
    }
    $go$generated(): $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error {
        return this.$go$value;
    }
    Write($argument0: RuntimeSlice<scalars.uint8>): [
        scalars.int,
        $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
    ] {
        const __gotots_results_6 = this.$go$value.Write($argument0);
        return [BigInt.asIntN(64, goNumberToBigInt(__gotots_results_6[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(__gotots_results_6[1])] satisfies [
            scalars.int,
            $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract | undefined
        ];
    }
}
export class $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract> implements $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error {
    private constructor(value: $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract | undefined): $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct ? value : new $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined): $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct) {
            return value.$go$value;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_io$Writer) {
            return $goProviderInterfaceBridge$Named_io$Writer.$to(value);
        }
        return new $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$Generated(value);
    }
    Write($argument0: RuntimeSlice<uint8>): [
        int,
        GoInterface | undefined
    ] {
        const __gotots_results_5 = this.$go$value.Write($argument0);
        return [globalThis.Number(BigInt.asIntN(64, __gotots_results_5[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_5[1])] satisfies [
            int,
            GoInterface | undefined
        ];
    }
}
export interface $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct$ProviderContract extends GoInterfaceValue {
    Len(): scalars.int;
    Less($argument0: scalars.int, $argument1: scalars.int): scalars.bool;
    Swap($argument0: scalars.int, $argument1: scalars.int): void;
}
class $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct$Generated extends GoProviderInterfaceBridge<$goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void> implements $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct$ProviderContract {
    constructor(value: $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void) {
        super(value, $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void$contract);
    }
    $go$generated(): $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void {
        return this.$go$value;
    }
    Len(): scalars.int {
        return BigInt.asIntN(64, goNumberToBigInt(this.$go$value.Len()));
    }
    Less($argument0: scalars.int, $argument1: scalars.int): scalars.bool {
        return this.$go$value.Less(globalThis.Number(BigInt.asIntN(64, $argument0)), globalThis.Number(BigInt.asIntN(64, $argument1)));
    }
    Swap($argument0: scalars.int, $argument1: scalars.int): void {
        this.$go$value.Swap(globalThis.Number(BigInt.asIntN(64, $argument0)), globalThis.Number(BigInt.asIntN(64, $argument1)));
    }
}
export class $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct extends GoProviderInterfaceBridge<$goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct$ProviderContract> implements $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void {
    private constructor(value: $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct$ProviderContract) {
        super(value, $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void$contract);
    }
    static $from(value: $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct$ProviderContract | undefined): $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct$Generated) {
            return value.$go$generated();
        }
        return value instanceof $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct ? value : new $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct(value);
    }
    static $to(value: $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void | undefined): $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct$ProviderContract | undefined {
        if (value === undefined) {
            return undefined;
        }
        if (value instanceof $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct) {
            return value.$go$value;
        }
        if (value instanceof $goProviderInterfaceBridge$Named_sort$Interface) {
            return $goProviderInterfaceBridge$Named_sort$Interface.$to(value);
        }
        return new $goProviderProfileBridge$Named_sort$Interface$Using$sort_Interface$Direct$Generated(value);
    }
    Len(): int {
        return globalThis.Number(BigInt.asIntN(64, this.$go$value.Len()));
    }
    Less($argument0: int, $argument1: int): bool {
        return this.$go$value.Less(BigInt.asIntN(64, goNumberToBigInt($argument0)), BigInt.asIntN(64, goNumberToBigInt($argument1)));
    }
    Swap($argument0: int, $argument1: int): void {
        this.$go$value.Swap(BigInt.asIntN(64, goNumberToBigInt($argument0)), BigInt.asIntN(64, goNumberToBigInt($argument1)));
    }
}
