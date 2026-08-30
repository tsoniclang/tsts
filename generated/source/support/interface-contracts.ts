import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Struct as Struct__from_jsonopts } from "../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/options.js";
import type { Diagnostic as Diagnostic__from_ast } from "../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { Message as Message__from_diagnostics } from "../modules/github.com/microsoft/typescript-go/internal/diagnostics/diagnostics.js";
import type { RegistryBucket as RegistryBucket__from_autoimport, directory as directory__from_autoimport } from "../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { DocumentUri as DocumentUri__from_lsproto } from "../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { Location as Location__from_lsproto, Location$Storage as Location__from_lsproto$Storage, Position as Position__from_lsproto } from "../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { configFileEntry as configFileEntry__from_project, configFileNames as configFileNames__from_project } from "../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { CloneableMap as CloneableMap__from_dirty } from "../modules/github.com/microsoft/typescript-go/internal/project/dirty/cloneablemap.js";
import type { diskFile as diskFile__from_project } from "../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import type { Project as Project__from_project } from "../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { realpathAliasSet as realpathAliasSet__from_project } from "../modules/github.com/microsoft/typescript-go/internal/project/snapshotfs.js";
import type { Path as Path__from_tspath } from "../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type * as abi from "@gotots/gostdlib/internal/abi.js";
import type * as fs from "@gotots/gostdlib/io/fs.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type * as reflect from "@gotots/gostdlib/reflect.js";
import type * as time from "@gotots/gostdlib/time.js";
import type { GoReceiveChannel } from "@gotots/runtime/channel.js";
import type { GoComplex128 } from "@gotots/runtime/complex.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, float64, gostring, int, int64, uint16, uint32, uint64, uint8, uintptr } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { $goInterfaceMethod$Accept$void_to_Named_net$Conn_Named_error, $goInterfaceMethod$Addr$void_to_Named_net$Addr, $goInterfaceMethod$Align$void_to_int, $goInterfaceMethod$AppendStackPointer$SliceOf_byte_int_to_SliceOf_byte, $goInterfaceMethod$AppendText$SliceOf_byte_to_SliceOf_byte_Named_error, $goInterfaceMethod$AssignableTo$Named_reflect$Type_to_bool, $goInterfaceMethod$Bits$void_to_int, $goInterfaceMethod$CanSeq$void_to_bool, $goInterfaceMethod$CanSeq2$void_to_bool, $goInterfaceMethod$ChanDir$void_to_Named_reflect$ChanDir, $goInterfaceMethod$Clone$void_to_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string, $goInterfaceMethod$Clone$void_to_PointerTo_Named_autoimport$RegistryBucket, $goInterfaceMethod$Clone$void_to_PointerTo_Named_autoimport$directory, $goInterfaceMethod$Clone$void_to_PointerTo_Named_project$Project, $goInterfaceMethod$Clone$void_to_PointerTo_Named_project$configFileEntry, $goInterfaceMethod$Clone$void_to_PointerTo_Named_project$configFileNames, $goInterfaceMethod$Clone$void_to_PointerTo_Named_project$diskFile, $goInterfaceMethod$Clone$void_to_PointerTo_Named_project$realpathAliasSet, $goInterfaceMethod$Close$void_to_Named_error, $goInterfaceMethod$Comparable$void_to_bool, $goInterfaceMethod$ConvertibleTo$Named_reflect$Type_to_bool, $goInterfaceMethod$Deadline$void_to_Named_time$Time_bool, $goInterfaceMethod$Done$void_to_ReceiveChannelOf_Struct_void, $goInterfaceMethod$Elem$void_to_Named_reflect$Type, $goInterfaceMethod$End$void_to_int, $goInterfaceMethod$Err$void_to_Named_error, $goInterfaceMethod$Error$void_to_string, $goInterfaceMethod$Field$int_to_Named_reflect$StructField, $goInterfaceMethod$FieldAlign$void_to_int, $goInterfaceMethod$FieldByIndex$SliceOf_int_to_Named_reflect$StructField, $goInterfaceMethod$FieldByName$string_to_Named_reflect$StructField_bool, $goInterfaceMethod$FieldByNameFunc$string_to_bool_to_Named_reflect$StructField_bool, $goInterfaceMethod$Fields$void_to_Named_iter$SeqOf_Named_reflect$StructField, $goInterfaceMethod$GetLocation$void_to_Named_lsproto$Location, $goInterfaceMethod$GetLocations$void_to_PointerTo_SliceOf_Named_lsproto$Location, $goInterfaceMethod$Grow$int_to_void, $goInterfaceMethod$Implements$Named_reflect$Type_to_bool, $goInterfaceMethod$In$int_to_Named_reflect$Type, $goInterfaceMethod$Info$void_to_Named_fs$FileInfo_Named_error, $goInterfaceMethod$Ins$void_to_Named_iter$SeqOf_Named_reflect$Type, $goInterfaceMethod$Is$Named_error_to_bool, $goInterfaceMethod$IsDir$void_to_bool, $goInterfaceMethod$IsVariadic$void_to_bool, $goInterfaceMethod$Key$void_to_Named_reflect$Type, $goInterfaceMethod$Kind$void_to_Named_reflect$Kind, $goInterfaceMethod$KindString$void_to_string, $goInterfaceMethod$Len$void_to_int, $goInterfaceMethod$Less$int_int_to_bool, $goInterfaceMethod$LocalAddr$void_to_Named_net$Addr, $goInterfaceMethod$MarshalText$void_to_SliceOf_byte_Named_error, $goInterfaceMethod$Method$int_to_Named_reflect$Method, $goInterfaceMethod$MethodByName$string_to_Named_reflect$Method_bool, $goInterfaceMethod$Methods$void_to_Named_iter$SeqOf_Named_reflect$Method, $goInterfaceMethod$ModTime$void_to_Named_time$Time, $goInterfaceMethod$Mode$void_to_Named_fs$FileMode, $goInterfaceMethod$Name$void_to_string, $goInterfaceMethod$Network$void_to_string, $goInterfaceMethod$NumField$void_to_int, $goInterfaceMethod$NumIn$void_to_int, $goInterfaceMethod$NumMethod$void_to_int, $goInterfaceMethod$NumOut$void_to_int, $goInterfaceMethod$Open$string_to_Named_fs$File_Named_error, $goInterfaceMethod$Out$int_to_Named_reflect$Type, $goInterfaceMethod$Outs$void_to_Named_iter$SeqOf_Named_reflect$Type, $goInterfaceMethod$OverflowComplex$complex128_to_bool, $goInterfaceMethod$OverflowFloat$float64_to_bool, $goInterfaceMethod$OverflowInt$int64_to_bool, $goInterfaceMethod$OverflowUint$uint64_to_bool, $goInterfaceMethod$ParseOption$string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$PkgPath$void_to_string, $goInterfaceMethod$PutUint16$SliceOf_byte_uint16_to_void, $goInterfaceMethod$PutUint32$SliceOf_byte_uint32_to_void, $goInterfaceMethod$PutUint64$SliceOf_byte_uint64_to_void, $goInterfaceMethod$Read$SliceOf_byte_to_int_Named_error, $goInterfaceMethod$ReadByte$void_to_byte_Named_error, $goInterfaceMethod$ReadDir$int_to_SliceOf_Named_fs$DirEntry_Named_error, $goInterfaceMethod$ReadDir$string_to_SliceOf_Named_fs$DirEntry_Named_error, $goInterfaceMethod$ReadFile$string_to_SliceOf_byte_Named_error, $goInterfaceMethod$RemoteAddr$void_to_Named_net$Addr, $goInterfaceMethod$SetDeadline$Named_time$Time_to_Named_error, $goInterfaceMethod$SetReadDeadline$Named_time$Time_to_Named_error, $goInterfaceMethod$SetWriteDeadline$Named_time$Time_to_Named_error, $goInterfaceMethod$Signal$void_to_void, $goInterfaceMethod$Size$void_to_int64, $goInterfaceMethod$Size$void_to_uintptr, $goInterfaceMethod$Stat$string_to_Named_fs$FileInfo_Named_error, $goInterfaceMethod$Stat$void_to_Named_fs$FileInfo_Named_error, $goInterfaceMethod$String$void_to_string, $goInterfaceMethod$Swap$int_int_to_void, $goInterfaceMethod$Sys$void_to_Interface_void, $goInterfaceMethod$TextDocumentPosition$void_to_Named_lsproto$Position, $goInterfaceMethod$TextDocumentURI$void_to_Named_lsproto$DocumentUri, $goInterfaceMethod$Type$void_to_Named_fs$FileMode, $goInterfaceMethod$Uint16$SliceOf_byte_to_uint16, $goInterfaceMethod$Uint32$SliceOf_byte_to_uint32, $goInterfaceMethod$Uint64$SliceOf_byte_to_uint64, $goInterfaceMethod$UnknownDidYouMeanDiagnostic$void_to_PointerTo_Named_diagnostics$Message, $goInterfaceMethod$UnknownOptionDiagnostic$void_to_PointerTo_Named_diagnostics$Message, $goInterfaceMethod$UnmarshalText$SliceOf_byte_to_Named_error, $goInterfaceMethod$Unwrap$void_to_Named_error, $goInterfaceMethod$Unwrap$void_to_SliceOf_Named_error, $goInterfaceMethod$Value$Interface_void_to_Interface_void, $goInterfaceMethod$Write$SliceOf_byte_to_int_Named_error, $goInterfaceMethod$jsontext$offsetAt$int_to_int64, $goInterfaceMethod$jsontext$options$void_to_PointerTo_Named_jsonopts$Struct, $goInterfaceMethod$reflect$common$void_to_PointerTo_Named_abi$Type, $goInterfaceMethod$reflect$uncommon$void_to_PointerTo_Named_abi$UncommonType } from "./interface-methods.js";
export interface $goInterface$Interface_Method_Error_void_to_string extends GoInterfaceValue {
    Error(): gostring;
}
export const $goInterface$Interface_Method_Error_void_to_string$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Error$void_to_string]);
export function $goInterface$Interface_Method_Error_void_to_string$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_Error_void_to_string {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_Error_void_to_string$contract);
}
export interface $goInterface$Interface_Method_Is_Named_error_to_bool extends GoInterfaceValue {
    Is($argument0: $goInterface$Interface_Method_Error_void_to_string | undefined): bool;
}
export const $goInterface$Interface_Method_Is_Named_error_to_bool$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Is$Named_error_to_bool]);
export function $goInterface$Interface_Method_Is_Named_error_to_bool$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_Is_Named_error_to_bool {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_Is_Named_error_to_bool$contract);
}
export interface $goInterface$Interface_Method_Unwrap_void_to_Named_error extends GoInterfaceValue {
    Unwrap(): $goInterface$Interface_Method_Error_void_to_string | undefined;
}
export const $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Unwrap$void_to_Named_error]);
export function $goInterface$Interface_Method_Unwrap_void_to_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_Unwrap_void_to_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_Unwrap_void_to_Named_error$contract);
}
export interface $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error extends GoInterfaceValue {
    Unwrap(): RuntimeSlice<$goInterface$Interface_Method_Error_void_to_string | undefined>;
}
export const $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Unwrap$void_to_SliceOf_Named_error]);
export function $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract);
}
export interface $goInterface$Interface_Method_autoimport$Name_void_to_string extends GoInterfaceValue {
    Name(): gostring;
}
export const $goInterface$Interface_Method_autoimport$Name_void_to_string$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Name$void_to_string]);
export function $goInterface$Interface_Method_autoimport$Name_void_to_string$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_autoimport$Name_void_to_string {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_autoimport$Name_void_to_string$contract);
}
export interface $goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64 extends GoInterfaceValue {
    PutUint16($argument0: RuntimeSlice<uint8>, $argument1: uint16): void;
    PutUint32($argument0: RuntimeSlice<uint8>, $argument1: uint32): void;
    PutUint64($argument0: RuntimeSlice<uint8>, $argument1: uint64): void;
    String(): gostring;
    Uint16($argument0: RuntimeSlice<uint8>): uint16;
    Uint32($argument0: RuntimeSlice<uint8>): uint32;
    Uint64($argument0: RuntimeSlice<uint8>): uint64;
}
export const $goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64$contract: readonly object[] = Object.freeze([$goInterfaceMethod$PutUint16$SliceOf_byte_uint16_to_void, $goInterfaceMethod$PutUint32$SliceOf_byte_uint32_to_void, $goInterfaceMethod$PutUint64$SliceOf_byte_uint64_to_void, $goInterfaceMethod$String$void_to_string, $goInterfaceMethod$Uint16$SliceOf_byte_to_uint16, $goInterfaceMethod$Uint32$SliceOf_byte_to_uint32, $goInterfaceMethod$Uint64$SliceOf_byte_to_uint64]);
export function $goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64 {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_binary$PutUint16_SliceOf_byte_uint16_to_void_Method_binary$PutUint32_SliceOf_byte_uint32_to_void_Method_binary$PutUint64_SliceOf_byte_uint64_to_void_Method_binary$String_void_to_string_Method_binary$Uint16_SliceOf_byte_to_uint16_Method_binary$Uint32_SliceOf_byte_to_uint32_Method_binary$Uint64_SliceOf_byte_to_uint64$contract);
}
export interface $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void extends GoInterfaceValue {
    Deadline(): [
        time.Time,
        bool
    ];
    Done(): GoReceiveChannel<GoEmptyStruct> | undefined;
    Err(): $goInterface$Interface_Method_Error_void_to_string | undefined;
    Value($argument0: $goInterface$Interface_void | undefined): $goInterface$Interface_void | undefined;
}
export const $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Deadline$void_to_Named_time$Time_bool, $goInterfaceMethod$Done$void_to_ReceiveChannelOf_Struct_void, $goInterfaceMethod$Err$void_to_Named_error, $goInterfaceMethod$Value$Interface_void_to_Interface_void]);
export function $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void$contract);
}
export interface $goInterface$Interface_Method_debug$KindString_void_to_string extends GoInterfaceValue {
    KindString(): gostring;
}
export const $goInterface$Interface_Method_debug$KindString_void_to_string$contract: readonly object[] = Object.freeze([$goInterfaceMethod$KindString$void_to_string]);
export function $goInterface$Interface_Method_debug$KindString_void_to_string$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_debug$KindString_void_to_string {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_debug$KindString_void_to_string$contract);
}
export interface $goInterface$Interface_Method_dirty$Clone_void_to_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string extends GoInterfaceValue {
    Clone(): CloneableMap__from_dirty<Path__from_tspath, gostring>;
}
export const $goInterface$Interface_Method_dirty$Clone_void_to_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Clone$void_to_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string]);
export function $goInterface$Interface_Method_dirty$Clone_void_to_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_dirty$Clone_void_to_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_dirty$Clone_void_to_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string$contract);
}
export interface $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$RegistryBucket extends GoInterfaceValue {
    Clone(): tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined;
}
export const $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$RegistryBucket$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Clone$void_to_PointerTo_Named_autoimport$RegistryBucket]);
export function $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$RegistryBucket$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$RegistryBucket {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$RegistryBucket$contract);
}
export interface $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$directory extends GoInterfaceValue {
    Clone(): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined;
}
export const $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$directory$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Clone$void_to_PointerTo_Named_autoimport$directory]);
export function $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$directory$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$directory {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_autoimport$directory$contract);
}
export interface $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$Project extends GoInterfaceValue {
    Clone(): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined;
}
export const $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$Project$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Clone$void_to_PointerTo_Named_project$Project]);
export function $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$Project$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$Project {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$Project$contract);
}
export interface $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileEntry extends GoInterfaceValue {
    Clone(): tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined;
}
export const $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileEntry$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Clone$void_to_PointerTo_Named_project$configFileEntry]);
export function $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileEntry$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileEntry {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileEntry$contract);
}
export interface $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileNames extends GoInterfaceValue {
    Clone(): tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined;
}
export const $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileNames$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Clone$void_to_PointerTo_Named_project$configFileNames]);
export function $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileNames$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileNames {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$configFileNames$contract);
}
export interface $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$diskFile extends GoInterfaceValue {
    Clone(): tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined;
}
export const $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$diskFile$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Clone$void_to_PointerTo_Named_project$diskFile]);
export function $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$diskFile$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$diskFile {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$diskFile$contract);
}
export interface $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$realpathAliasSet extends GoInterfaceValue {
    Clone(): tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined;
}
export const $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$realpathAliasSet$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Clone$void_to_PointerTo_Named_project$realpathAliasSet]);
export function $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$realpathAliasSet$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$realpathAliasSet {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_dirty$Clone_void_to_PointerTo_Named_project$realpathAliasSet$contract);
}
export interface $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error extends GoInterfaceValue {
    AppendText($argument0: RuntimeSlice<uint8>): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$AppendText$SliceOf_byte_to_SliceOf_byte_Named_error]);
export function $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error$contract);
}
export interface $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error extends GoInterfaceValue {
    MarshalText(): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$MarshalText$void_to_SliceOf_byte_Named_error]);
export function $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error$contract);
}
export interface $goInterface$Interface_Method_encoding$UnmarshalText_SliceOf_byte_to_Named_error extends GoInterfaceValue {
    UnmarshalText($argument0: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined;
}
export const $goInterface$Interface_Method_encoding$UnmarshalText_SliceOf_byte_to_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$UnmarshalText$SliceOf_byte_to_Named_error]);
export function $goInterface$Interface_Method_encoding$UnmarshalText_SliceOf_byte_to_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_encoding$UnmarshalText_SliceOf_byte_to_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_encoding$UnmarshalText_SliceOf_byte_to_Named_error$contract);
}
export interface $goInterface$Interface_Method_fmt$String_void_to_string extends GoInterfaceValue {
    String(): gostring;
}
export const $goInterface$Interface_Method_fmt$String_void_to_string$contract: readonly object[] = Object.freeze([$goInterfaceMethod$String$void_to_string]);
export function $goInterface$Interface_Method_fmt$String_void_to_string$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_fmt$String_void_to_string {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_fmt$String_void_to_string$contract);
}
export interface $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error extends GoInterfaceValue {
    Close(): $goInterface$Interface_Method_Error_void_to_string | undefined;
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    ReadDir($argument0: int): [
        RuntimeSlice<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    Stat(): [
        $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Close$void_to_Named_error, $goInterfaceMethod$Read$SliceOf_byte_to_int_Named_error, $goInterfaceMethod$ReadDir$int_to_SliceOf_Named_fs$DirEntry_Named_error, $goInterfaceMethod$Stat$void_to_Named_fs$FileInfo_Named_error]);
export function $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$ReadDir_int_to_SliceOf_Named_fs$DirEntry_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$contract);
}
export interface $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error extends GoInterfaceValue {
    Close(): $goInterface$Interface_Method_Error_void_to_string | undefined;
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    Stat(): [
        $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Close$void_to_Named_error, $goInterfaceMethod$Read$SliceOf_byte_to_int_Named_error, $goInterfaceMethod$Stat$void_to_Named_fs$FileInfo_Named_error]);
export function $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error$contract);
}
export interface $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode extends GoInterfaceValue {
    Info(): [
        $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    IsDir(): bool;
    Name(): gostring;
    Type(): fs.FileMode;
}
export const $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Info$void_to_Named_fs$FileInfo_Named_error, $goInterfaceMethod$IsDir$void_to_bool, $goInterfaceMethod$Name$void_to_string, $goInterfaceMethod$Type$void_to_Named_fs$FileMode]);
export function $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode$contract);
}
export interface $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void extends GoInterfaceValue {
    IsDir(): bool;
    ModTime(): time.Time;
    Mode(): fs.FileMode;
    Name(): gostring;
    Size(): int64;
    Sys(): $goInterface$Interface_void | undefined;
}
export const $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void$contract: readonly object[] = Object.freeze([$goInterfaceMethod$IsDir$void_to_bool, $goInterfaceMethod$ModTime$void_to_Named_time$Time, $goInterfaceMethod$Mode$void_to_Named_fs$FileMode, $goInterfaceMethod$Name$void_to_string, $goInterfaceMethod$Size$void_to_int64, $goInterfaceMethod$Sys$void_to_Interface_void]);
export function $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void$contract);
}
export interface $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error extends GoInterfaceValue {
    Open($argument0: gostring): [
        $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Open$string_to_Named_fs$File_Named_error]);
export function $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error$contract);
}
export interface $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error extends GoInterfaceValue {
    Open($argument0: gostring): [
        $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    ReadDir($argument0: gostring): [
        RuntimeSlice<$goInterface$Interface_Method_fs$Info_void_to_Named_fs$FileInfo_Named_error_Method_fs$IsDir_void_to_bool_Method_fs$Name_void_to_string_Method_fs$Type_void_to_Named_fs$FileMode | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Open$string_to_Named_fs$File_Named_error, $goInterfaceMethod$ReadDir$string_to_SliceOf_Named_fs$DirEntry_Named_error]);
export function $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadDir_string_to_SliceOf_Named_fs$DirEntry_Named_error$contract);
}
export interface $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error extends GoInterfaceValue {
    Open($argument0: gostring): [
        $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    ReadFile($argument0: gostring): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Open$string_to_Named_fs$File_Named_error, $goInterfaceMethod$ReadFile$string_to_SliceOf_byte_Named_error]);
export function $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$ReadFile_string_to_SliceOf_byte_Named_error$contract);
}
export interface $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error extends GoInterfaceValue {
    Open($argument0: gostring): [
        $goInterface$Interface_Method_fs$Close_void_to_Named_error_Method_fs$Read_SliceOf_byte_to_int_Named_error_Method_fs$Stat_void_to_Named_fs$FileInfo_Named_error | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    Stat($argument0: gostring): [
        $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Open$string_to_Named_fs$File_Named_error, $goInterfaceMethod$Stat$string_to_Named_fs$FileInfo_Named_error]);
export function $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_fs$Open_string_to_Named_fs$File_Named_error_Method_fs$Stat_string_to_Named_fs$FileInfo_Named_error$contract);
}
export interface $goInterface$Interface_Method_io$Close_void_to_Named_error extends GoInterfaceValue {
    Close(): $goInterface$Interface_Method_Error_void_to_string | undefined;
}
export const $goInterface$Interface_Method_io$Close_void_to_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Close$void_to_Named_error]);
export function $goInterface$Interface_Method_io$Close_void_to_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_io$Close_void_to_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_io$Close_void_to_Named_error$contract);
}
export interface $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error extends GoInterfaceValue {
    Close(): $goInterface$Interface_Method_Error_void_to_string | undefined;
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Close$void_to_Named_error, $goInterfaceMethod$Read$SliceOf_byte_to_int_Named_error]);
export function $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$contract);
}
export interface $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error extends GoInterfaceValue {
    Close(): $goInterface$Interface_Method_Error_void_to_string | undefined;
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    Write($argument0: RuntimeSlice<uint8>): [
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Close$void_to_Named_error, $goInterfaceMethod$Read$SliceOf_byte_to_int_Named_error, $goInterfaceMethod$Write$SliceOf_byte_to_int_Named_error]);
export function $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$contract);
}
export interface $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error extends GoInterfaceValue {
    Close(): $goInterface$Interface_Method_Error_void_to_string | undefined;
    Write($argument0: RuntimeSlice<uint8>): [
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Close$void_to_Named_error, $goInterfaceMethod$Write$SliceOf_byte_to_int_Named_error]);
export function $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$contract);
}
export interface $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error extends GoInterfaceValue {
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    ReadByte(): [
        uint8,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Read$SliceOf_byte_to_int_Named_error, $goInterfaceMethod$ReadByte$void_to_byte_Named_error]);
export function $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_io$ReadByte_void_to_byte_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error$contract);
}
export interface $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error extends GoInterfaceValue {
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Read$SliceOf_byte_to_int_Named_error]);
export function $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error$contract);
}
export interface $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error extends GoInterfaceValue {
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    Write($argument0: RuntimeSlice<uint8>): [
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Read$SliceOf_byte_to_int_Named_error, $goInterfaceMethod$Write$SliceOf_byte_to_int_Named_error]);
export function $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$contract);
}
export interface $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error extends GoInterfaceValue {
    Write($argument0: RuntimeSlice<uint8>): [
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Write$SliceOf_byte_to_int_Named_error]);
export function $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error$contract);
}
export interface $goInterface$Interface_Method_json$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte extends GoInterfaceValue {
    AppendStackPointer($argument0: RuntimeSlice<uint8>, $argument1: int): RuntimeSlice<uint8>;
}
export const $goInterface$Interface_Method_json$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte$contract: readonly object[] = Object.freeze([$goInterfaceMethod$AppendStackPointer$SliceOf_byte_int_to_SliceOf_byte]);
export function $goInterface$Interface_Method_json$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_json$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_json$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte$contract);
}
export interface $goInterface$Interface_Method_jsontext$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte_Method_jsontext$offsetAt_int_to_int64_Method_jsontext$options_void_to_PointerTo_Named_jsonopts$Struct extends GoInterfaceValue {
    AppendStackPointer($argument0: RuntimeSlice<uint8>, $argument1: int): RuntimeSlice<uint8>;
    $go$private$jsontext$offsetAt($argument0: int): int64;
    $go$private$jsontext$options(): tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined;
}
export const $goInterface$Interface_Method_jsontext$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte_Method_jsontext$offsetAt_int_to_int64_Method_jsontext$options_void_to_PointerTo_Named_jsonopts$Struct$contract: readonly object[] = Object.freeze([$goInterfaceMethod$AppendStackPointer$SliceOf_byte_int_to_SliceOf_byte, $goInterfaceMethod$jsontext$offsetAt$int_to_int64, $goInterfaceMethod$jsontext$options$void_to_PointerTo_Named_jsonopts$Struct]);
export function $goInterface$Interface_Method_jsontext$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte_Method_jsontext$offsetAt_int_to_int64_Method_jsontext$options_void_to_PointerTo_Named_jsonopts$Struct$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_jsontext$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte_Method_jsontext$offsetAt_int_to_int64_Method_jsontext$options_void_to_PointerTo_Named_jsonopts$Struct {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_jsontext$AppendStackPointer_SliceOf_byte_int_to_SliceOf_byte_Method_jsontext$offsetAt_int_to_int64_Method_jsontext$options_void_to_PointerTo_Named_jsonopts$Struct$contract);
}
export interface $goInterface$Interface_Method_lsproto$GetLocation_void_to_Named_lsproto$Location extends GoInterfaceValue {
    GetLocation(): Location__from_lsproto;
}
export const $goInterface$Interface_Method_lsproto$GetLocation_void_to_Named_lsproto$Location$contract: readonly object[] = Object.freeze([$goInterfaceMethod$GetLocation$void_to_Named_lsproto$Location]);
export function $goInterface$Interface_Method_lsproto$GetLocation_void_to_Named_lsproto$Location$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_lsproto$GetLocation_void_to_Named_lsproto$Location {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_lsproto$GetLocation_void_to_Named_lsproto$Location$contract);
}
export interface $goInterface$Interface_Method_lsproto$GetLocations_void_to_PointerTo_SliceOf_Named_lsproto$Location extends GoInterfaceValue {
    GetLocations(): tsonicTypeScriptRuntime.Location<RuntimeSlice<Location__from_lsproto$Storage>> | undefined;
}
export const $goInterface$Interface_Method_lsproto$GetLocations_void_to_PointerTo_SliceOf_Named_lsproto$Location$contract: readonly object[] = Object.freeze([$goInterfaceMethod$GetLocations$void_to_PointerTo_SliceOf_Named_lsproto$Location]);
export function $goInterface$Interface_Method_lsproto$GetLocations_void_to_PointerTo_SliceOf_Named_lsproto$Location$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_lsproto$GetLocations_void_to_PointerTo_SliceOf_Named_lsproto$Location {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_lsproto$GetLocations_void_to_PointerTo_SliceOf_Named_lsproto$Location$contract);
}
export interface $goInterface$Interface_Method_lsproto$TextDocumentPosition_void_to_Named_lsproto$Position extends GoInterfaceValue {
    TextDocumentPosition(): Position__from_lsproto;
}
export const $goInterface$Interface_Method_lsproto$TextDocumentPosition_void_to_Named_lsproto$Position$contract: readonly object[] = Object.freeze([$goInterfaceMethod$TextDocumentPosition$void_to_Named_lsproto$Position]);
export function $goInterface$Interface_Method_lsproto$TextDocumentPosition_void_to_Named_lsproto$Position$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_lsproto$TextDocumentPosition_void_to_Named_lsproto$Position {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_lsproto$TextDocumentPosition_void_to_Named_lsproto$Position$contract);
}
export interface $goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri extends GoInterfaceValue {
    TextDocumentURI(): DocumentUri__from_lsproto;
}
export const $goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri$contract: readonly object[] = Object.freeze([$goInterfaceMethod$TextDocumentURI$void_to_Named_lsproto$DocumentUri]);
export function $goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_lsproto$TextDocumentURI_void_to_Named_lsproto$DocumentUri$contract);
}
export interface $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error extends GoInterfaceValue {
    Accept(): [
        $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    Addr(): $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string | undefined;
    Close(): $goInterface$Interface_Method_Error_void_to_string | undefined;
}
export const $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Accept$void_to_Named_net$Conn_Named_error, $goInterfaceMethod$Addr$void_to_Named_net$Addr, $goInterfaceMethod$Close$void_to_Named_error]);
export function $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error$contract);
}
export interface $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error extends GoInterfaceValue {
    Close(): $goInterface$Interface_Method_Error_void_to_string | undefined;
    LocalAddr(): $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string | undefined;
    Read($argument0: RuntimeSlice<uint8>): [
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    RemoteAddr(): $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string | undefined;
    SetDeadline($argument0: time.Time): $goInterface$Interface_Method_Error_void_to_string | undefined;
    SetReadDeadline($argument0: time.Time): $goInterface$Interface_Method_Error_void_to_string | undefined;
    SetWriteDeadline($argument0: time.Time): $goInterface$Interface_Method_Error_void_to_string | undefined;
    Write($argument0: RuntimeSlice<uint8>): [
        int,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Close$void_to_Named_error, $goInterfaceMethod$LocalAddr$void_to_Named_net$Addr, $goInterfaceMethod$Read$SliceOf_byte_to_int_Named_error, $goInterfaceMethod$RemoteAddr$void_to_Named_net$Addr, $goInterfaceMethod$SetDeadline$Named_time$Time_to_Named_error, $goInterfaceMethod$SetReadDeadline$Named_time$Time_to_Named_error, $goInterfaceMethod$SetWriteDeadline$Named_time$Time_to_Named_error, $goInterfaceMethod$Write$SliceOf_byte_to_int_Named_error]);
export function $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_net$Close_void_to_Named_error_Method_net$LocalAddr_void_to_Named_net$Addr_Method_net$Read_SliceOf_byte_to_int_Named_error_Method_net$RemoteAddr_void_to_Named_net$Addr_Method_net$SetDeadline_Named_time$Time_to_Named_error_Method_net$SetReadDeadline_Named_time$Time_to_Named_error_Method_net$SetWriteDeadline_Named_time$Time_to_Named_error_Method_net$Write_SliceOf_byte_to_int_Named_error$contract);
}
export interface $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string extends GoInterfaceValue {
    Network(): gostring;
    String(): gostring;
}
export const $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Network$void_to_string, $goInterfaceMethod$String$void_to_string]);
export function $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_net$Network_void_to_string_Method_net$String_void_to_string$contract);
}
export interface $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string extends GoInterfaceValue {
    Signal(): void;
    String(): gostring;
}
export const $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Signal$void_to_void, $goInterfaceMethod$String$void_to_string]);
export function $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string$contract);
}
export interface $goInterface$Interface_Method_printer$End_void_to_int extends GoInterfaceValue {
    End(): int;
}
export const $goInterface$Interface_Method_printer$End_void_to_int$contract: readonly object[] = Object.freeze([$goInterfaceMethod$End$void_to_int]);
export function $goInterface$Interface_Method_printer$End_void_to_int$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_printer$End_void_to_int {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_printer$End_void_to_int$contract);
}
export interface $goInterface$Interface_Method_printer$Grow_int_to_void extends GoInterfaceValue {
    Grow($argument0: int): void;
}
export const $goInterface$Interface_Method_printer$Grow_int_to_void$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Grow$int_to_void]);
export function $goInterface$Interface_Method_printer$Grow_int_to_void$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_printer$Grow_int_to_void {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_printer$Grow_int_to_void$contract);
}
export interface $goInterface$Interface_Method_reflect$Align_void_to_int_Method_reflect$AssignableTo_Named_reflect$Type_to_bool_Method_reflect$Bits_void_to_int_Method_reflect$CanSeq2_void_to_bool_Method_reflect$CanSeq_void_to_bool_Method_reflect$ChanDir_void_to_Named_reflect$ChanDir_Method_reflect$Comparable_void_to_bool_Method_reflect$ConvertibleTo_Named_reflect$Type_to_bool_Method_reflect$Elem_void_to_Named_reflect$Type_Method_reflect$FieldAlign_void_to_int_Method_reflect$FieldByIndex_SliceOf_int_to_Named_reflect$StructField_Method_reflect$FieldByNameFunc_string_to_bool_to_Named_reflect$StructField_bool_Method_reflect$FieldByName_string_to_Named_reflect$StructField_bool_Method_reflect$Field_int_to_Named_reflect$StructField_Method_reflect$Fields_void_to_Named_iter$SeqOf_Named_reflect$StructField_Method_reflect$Implements_Named_reflect$Type_to_bool_Method_reflect$In_int_to_Named_reflect$Type_Method_reflect$Ins_void_to_Named_iter$SeqOf_Named_reflect$Type_Method_reflect$IsVariadic_void_to_bool_Method_reflect$Key_void_to_Named_reflect$Type_Method_reflect$Kind_void_to_Named_reflect$Kind_Method_reflect$Len_void_to_int_Method_reflect$MethodByName_string_to_Named_reflect$Method_bool_Method_reflect$Method_int_to_Named_reflect$Method_Method_reflect$Methods_void_to_Named_iter$SeqOf_Named_reflect$Method_Method_reflect$Name_void_to_string_Method_reflect$NumField_void_to_int_Method_reflect$NumIn_void_to_int_Method_reflect$NumMethod_void_to_int_Method_reflect$NumOut_void_to_int_Method_reflect$Out_int_to_Named_reflect$Type_Method_reflect$Outs_void_to_Named_iter$SeqOf_Named_reflect$Type_Method_reflect$OverflowComplex_complex128_to_bool_Method_reflect$OverflowFloat_float64_to_bool_Method_reflect$OverflowInt_int64_to_bool_Method_reflect$OverflowUint_uint64_to_bool_Method_reflect$PkgPath_void_to_string_Method_reflect$Size_void_to_uintptr_Method_reflect$String_void_to_string_Method_reflect$common_void_to_PointerTo_Named_abi$Type_Method_reflect$uncommon_void_to_PointerTo_Named_abi$UncommonType extends GoInterfaceValue {
    Align(): int;
    AssignableTo($argument0: reflect.Type | undefined): bool;
    Bits(): int;
    CanSeq(): bool;
    CanSeq2(): bool;
    ChanDir(): reflect.ChanDir;
    Comparable(): bool;
    ConvertibleTo($argument0: reflect.Type | undefined): bool;
    Elem(): reflect.Type | undefined;
    Field($argument0: int): reflect.StructField;
    FieldAlign(): int;
    FieldByIndex($argument0: RuntimeSlice<int>): reflect.StructField;
    FieldByName($argument0: gostring): [
        reflect.StructField,
        bool
    ];
    FieldByNameFunc($argument0: (($0: gostring) => bool) | undefined): [
        reflect.StructField,
        bool
    ];
    Fields(): iter.Seq<reflect.StructField>;
    Implements($argument0: reflect.Type | undefined): bool;
    In($argument0: int): reflect.Type | undefined;
    Ins(): iter.Seq<reflect.Type | undefined>;
    IsVariadic(): bool;
    Key(): reflect.Type | undefined;
    Kind(): reflect.Kind;
    Len(): int;
    Method($argument0: int): reflect.Method;
    MethodByName($argument0: gostring): [
        reflect.Method,
        bool
    ];
    Methods(): iter.Seq<reflect.Method>;
    Name(): gostring;
    NumField(): int;
    NumIn(): int;
    NumMethod(): int;
    NumOut(): int;
    Out($argument0: int): reflect.Type | undefined;
    Outs(): iter.Seq<reflect.Type | undefined>;
    OverflowComplex($argument0: GoComplex128): bool;
    OverflowFloat($argument0: float64): bool;
    OverflowInt($argument0: int64): bool;
    OverflowUint($argument0: uint64): bool;
    PkgPath(): gostring;
    Size(): uintptr;
    String(): gostring;
    $go$private$reflect$common(): tsonicTypeScriptRuntime.Location<abi.Type> | undefined;
    $go$private$reflect$uncommon(): tsonicTypeScriptRuntime.Location<abi.UncommonType> | undefined;
}
export const $goInterface$Interface_Method_reflect$Align_void_to_int_Method_reflect$AssignableTo_Named_reflect$Type_to_bool_Method_reflect$Bits_void_to_int_Method_reflect$CanSeq2_void_to_bool_Method_reflect$CanSeq_void_to_bool_Method_reflect$ChanDir_void_to_Named_reflect$ChanDir_Method_reflect$Comparable_void_to_bool_Method_reflect$ConvertibleTo_Named_reflect$Type_to_bool_Method_reflect$Elem_void_to_Named_reflect$Type_Method_reflect$FieldAlign_void_to_int_Method_reflect$FieldByIndex_SliceOf_int_to_Named_reflect$StructField_Method_reflect$FieldByNameFunc_string_to_bool_to_Named_reflect$StructField_bool_Method_reflect$FieldByName_string_to_Named_reflect$StructField_bool_Method_reflect$Field_int_to_Named_reflect$StructField_Method_reflect$Fields_void_to_Named_iter$SeqOf_Named_reflect$StructField_Method_reflect$Implements_Named_reflect$Type_to_bool_Method_reflect$In_int_to_Named_reflect$Type_Method_reflect$Ins_void_to_Named_iter$SeqOf_Named_reflect$Type_Method_reflect$IsVariadic_void_to_bool_Method_reflect$Key_void_to_Named_reflect$Type_Method_reflect$Kind_void_to_Named_reflect$Kind_Method_reflect$Len_void_to_int_Method_reflect$MethodByName_string_to_Named_reflect$Method_bool_Method_reflect$Method_int_to_Named_reflect$Method_Method_reflect$Methods_void_to_Named_iter$SeqOf_Named_reflect$Method_Method_reflect$Name_void_to_string_Method_reflect$NumField_void_to_int_Method_reflect$NumIn_void_to_int_Method_reflect$NumMethod_void_to_int_Method_reflect$NumOut_void_to_int_Method_reflect$Out_int_to_Named_reflect$Type_Method_reflect$Outs_void_to_Named_iter$SeqOf_Named_reflect$Type_Method_reflect$OverflowComplex_complex128_to_bool_Method_reflect$OverflowFloat_float64_to_bool_Method_reflect$OverflowInt_int64_to_bool_Method_reflect$OverflowUint_uint64_to_bool_Method_reflect$PkgPath_void_to_string_Method_reflect$Size_void_to_uintptr_Method_reflect$String_void_to_string_Method_reflect$common_void_to_PointerTo_Named_abi$Type_Method_reflect$uncommon_void_to_PointerTo_Named_abi$UncommonType$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Align$void_to_int, $goInterfaceMethod$AssignableTo$Named_reflect$Type_to_bool, $goInterfaceMethod$Bits$void_to_int, $goInterfaceMethod$CanSeq$void_to_bool, $goInterfaceMethod$CanSeq2$void_to_bool, $goInterfaceMethod$ChanDir$void_to_Named_reflect$ChanDir, $goInterfaceMethod$Comparable$void_to_bool, $goInterfaceMethod$ConvertibleTo$Named_reflect$Type_to_bool, $goInterfaceMethod$Elem$void_to_Named_reflect$Type, $goInterfaceMethod$Field$int_to_Named_reflect$StructField, $goInterfaceMethod$FieldAlign$void_to_int, $goInterfaceMethod$FieldByIndex$SliceOf_int_to_Named_reflect$StructField, $goInterfaceMethod$FieldByName$string_to_Named_reflect$StructField_bool, $goInterfaceMethod$FieldByNameFunc$string_to_bool_to_Named_reflect$StructField_bool, $goInterfaceMethod$Fields$void_to_Named_iter$SeqOf_Named_reflect$StructField, $goInterfaceMethod$Implements$Named_reflect$Type_to_bool, $goInterfaceMethod$In$int_to_Named_reflect$Type, $goInterfaceMethod$Ins$void_to_Named_iter$SeqOf_Named_reflect$Type, $goInterfaceMethod$IsVariadic$void_to_bool, $goInterfaceMethod$Key$void_to_Named_reflect$Type, $goInterfaceMethod$Kind$void_to_Named_reflect$Kind, $goInterfaceMethod$Len$void_to_int, $goInterfaceMethod$Method$int_to_Named_reflect$Method, $goInterfaceMethod$MethodByName$string_to_Named_reflect$Method_bool, $goInterfaceMethod$Methods$void_to_Named_iter$SeqOf_Named_reflect$Method, $goInterfaceMethod$Name$void_to_string, $goInterfaceMethod$NumField$void_to_int, $goInterfaceMethod$NumIn$void_to_int, $goInterfaceMethod$NumMethod$void_to_int, $goInterfaceMethod$NumOut$void_to_int, $goInterfaceMethod$Out$int_to_Named_reflect$Type, $goInterfaceMethod$Outs$void_to_Named_iter$SeqOf_Named_reflect$Type, $goInterfaceMethod$OverflowComplex$complex128_to_bool, $goInterfaceMethod$OverflowFloat$float64_to_bool, $goInterfaceMethod$OverflowInt$int64_to_bool, $goInterfaceMethod$OverflowUint$uint64_to_bool, $goInterfaceMethod$PkgPath$void_to_string, $goInterfaceMethod$Size$void_to_uintptr, $goInterfaceMethod$String$void_to_string, $goInterfaceMethod$reflect$common$void_to_PointerTo_Named_abi$Type, $goInterfaceMethod$reflect$uncommon$void_to_PointerTo_Named_abi$UncommonType]);
export function $goInterface$Interface_Method_reflect$Align_void_to_int_Method_reflect$AssignableTo_Named_reflect$Type_to_bool_Method_reflect$Bits_void_to_int_Method_reflect$CanSeq2_void_to_bool_Method_reflect$CanSeq_void_to_bool_Method_reflect$ChanDir_void_to_Named_reflect$ChanDir_Method_reflect$Comparable_void_to_bool_Method_reflect$ConvertibleTo_Named_reflect$Type_to_bool_Method_reflect$Elem_void_to_Named_reflect$Type_Method_reflect$FieldAlign_void_to_int_Method_reflect$FieldByIndex_SliceOf_int_to_Named_reflect$StructField_Method_reflect$FieldByNameFunc_string_to_bool_to_Named_reflect$StructField_bool_Method_reflect$FieldByName_string_to_Named_reflect$StructField_bool_Method_reflect$Field_int_to_Named_reflect$StructField_Method_reflect$Fields_void_to_Named_iter$SeqOf_Named_reflect$StructField_Method_reflect$Implements_Named_reflect$Type_to_bool_Method_reflect$In_int_to_Named_reflect$Type_Method_reflect$Ins_void_to_Named_iter$SeqOf_Named_reflect$Type_Method_reflect$IsVariadic_void_to_bool_Method_reflect$Key_void_to_Named_reflect$Type_Method_reflect$Kind_void_to_Named_reflect$Kind_Method_reflect$Len_void_to_int_Method_reflect$MethodByName_string_to_Named_reflect$Method_bool_Method_reflect$Method_int_to_Named_reflect$Method_Method_reflect$Methods_void_to_Named_iter$SeqOf_Named_reflect$Method_Method_reflect$Name_void_to_string_Method_reflect$NumField_void_to_int_Method_reflect$NumIn_void_to_int_Method_reflect$NumMethod_void_to_int_Method_reflect$NumOut_void_to_int_Method_reflect$Out_int_to_Named_reflect$Type_Method_reflect$Outs_void_to_Named_iter$SeqOf_Named_reflect$Type_Method_reflect$OverflowComplex_complex128_to_bool_Method_reflect$OverflowFloat_float64_to_bool_Method_reflect$OverflowInt_int64_to_bool_Method_reflect$OverflowUint_uint64_to_bool_Method_reflect$PkgPath_void_to_string_Method_reflect$Size_void_to_uintptr_Method_reflect$String_void_to_string_Method_reflect$common_void_to_PointerTo_Named_abi$Type_Method_reflect$uncommon_void_to_PointerTo_Named_abi$UncommonType$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_reflect$Align_void_to_int_Method_reflect$AssignableTo_Named_reflect$Type_to_bool_Method_reflect$Bits_void_to_int_Method_reflect$CanSeq2_void_to_bool_Method_reflect$CanSeq_void_to_bool_Method_reflect$ChanDir_void_to_Named_reflect$ChanDir_Method_reflect$Comparable_void_to_bool_Method_reflect$ConvertibleTo_Named_reflect$Type_to_bool_Method_reflect$Elem_void_to_Named_reflect$Type_Method_reflect$FieldAlign_void_to_int_Method_reflect$FieldByIndex_SliceOf_int_to_Named_reflect$StructField_Method_reflect$FieldByNameFunc_string_to_bool_to_Named_reflect$StructField_bool_Method_reflect$FieldByName_string_to_Named_reflect$StructField_bool_Method_reflect$Field_int_to_Named_reflect$StructField_Method_reflect$Fields_void_to_Named_iter$SeqOf_Named_reflect$StructField_Method_reflect$Implements_Named_reflect$Type_to_bool_Method_reflect$In_int_to_Named_reflect$Type_Method_reflect$Ins_void_to_Named_iter$SeqOf_Named_reflect$Type_Method_reflect$IsVariadic_void_to_bool_Method_reflect$Key_void_to_Named_reflect$Type_Method_reflect$Kind_void_to_Named_reflect$Kind_Method_reflect$Len_void_to_int_Method_reflect$MethodByName_string_to_Named_reflect$Method_bool_Method_reflect$Method_int_to_Named_reflect$Method_Method_reflect$Methods_void_to_Named_iter$SeqOf_Named_reflect$Method_Method_reflect$Name_void_to_string_Method_reflect$NumField_void_to_int_Method_reflect$NumIn_void_to_int_Method_reflect$NumMethod_void_to_int_Method_reflect$NumOut_void_to_int_Method_reflect$Out_int_to_Named_reflect$Type_Method_reflect$Outs_void_to_Named_iter$SeqOf_Named_reflect$Type_Method_reflect$OverflowComplex_complex128_to_bool_Method_reflect$OverflowFloat_float64_to_bool_Method_reflect$OverflowInt_int64_to_bool_Method_reflect$OverflowUint_uint64_to_bool_Method_reflect$PkgPath_void_to_string_Method_reflect$Size_void_to_uintptr_Method_reflect$String_void_to_string_Method_reflect$common_void_to_PointerTo_Named_abi$Type_Method_reflect$uncommon_void_to_PointerTo_Named_abi$UncommonType {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_reflect$Align_void_to_int_Method_reflect$AssignableTo_Named_reflect$Type_to_bool_Method_reflect$Bits_void_to_int_Method_reflect$CanSeq2_void_to_bool_Method_reflect$CanSeq_void_to_bool_Method_reflect$ChanDir_void_to_Named_reflect$ChanDir_Method_reflect$Comparable_void_to_bool_Method_reflect$ConvertibleTo_Named_reflect$Type_to_bool_Method_reflect$Elem_void_to_Named_reflect$Type_Method_reflect$FieldAlign_void_to_int_Method_reflect$FieldByIndex_SliceOf_int_to_Named_reflect$StructField_Method_reflect$FieldByNameFunc_string_to_bool_to_Named_reflect$StructField_bool_Method_reflect$FieldByName_string_to_Named_reflect$StructField_bool_Method_reflect$Field_int_to_Named_reflect$StructField_Method_reflect$Fields_void_to_Named_iter$SeqOf_Named_reflect$StructField_Method_reflect$Implements_Named_reflect$Type_to_bool_Method_reflect$In_int_to_Named_reflect$Type_Method_reflect$Ins_void_to_Named_iter$SeqOf_Named_reflect$Type_Method_reflect$IsVariadic_void_to_bool_Method_reflect$Key_void_to_Named_reflect$Type_Method_reflect$Kind_void_to_Named_reflect$Kind_Method_reflect$Len_void_to_int_Method_reflect$MethodByName_string_to_Named_reflect$Method_bool_Method_reflect$Method_int_to_Named_reflect$Method_Method_reflect$Methods_void_to_Named_iter$SeqOf_Named_reflect$Method_Method_reflect$Name_void_to_string_Method_reflect$NumField_void_to_int_Method_reflect$NumIn_void_to_int_Method_reflect$NumMethod_void_to_int_Method_reflect$NumOut_void_to_int_Method_reflect$Out_int_to_Named_reflect$Type_Method_reflect$Outs_void_to_Named_iter$SeqOf_Named_reflect$Type_Method_reflect$OverflowComplex_complex128_to_bool_Method_reflect$OverflowFloat_float64_to_bool_Method_reflect$OverflowInt_int64_to_bool_Method_reflect$OverflowUint_uint64_to_bool_Method_reflect$PkgPath_void_to_string_Method_reflect$Size_void_to_uintptr_Method_reflect$String_void_to_string_Method_reflect$common_void_to_PointerTo_Named_abi$Type_Method_reflect$uncommon_void_to_PointerTo_Named_abi$UncommonType$contract);
}
export interface $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void extends GoInterfaceValue {
    Len(): int;
    Less($argument0: int, $argument1: int): bool;
    Swap($argument0: int, $argument1: int): void;
}
export const $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void$contract: readonly object[] = Object.freeze([$goInterfaceMethod$Len$void_to_int, $goInterfaceMethod$Less$int_int_to_bool, $goInterfaceMethod$Swap$int_int_to_void]);
export function $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_sort$Len_void_to_int_Method_sort$Less_int_int_to_bool_Method_sort$Swap_int_int_to_void$contract);
}
export interface $goInterface$Interface_Method_tsoptions$ParseOption_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic extends GoInterfaceValue {
    ParseOption($argument0: gostring, $argument1: $goInterface$Interface_void | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>;
}
export const $goInterface$Interface_Method_tsoptions$ParseOption_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic$contract: readonly object[] = Object.freeze([$goInterfaceMethod$ParseOption$string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic]);
export function $goInterface$Interface_Method_tsoptions$ParseOption_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_tsoptions$ParseOption_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_tsoptions$ParseOption_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic$contract);
}
export interface $goInterface$Interface_Method_tsoptions$UnknownDidYouMeanDiagnostic_void_to_PointerTo_Named_diagnostics$Message extends GoInterfaceValue {
    UnknownDidYouMeanDiagnostic(): {
        value: Message__from_diagnostics;
    } | undefined;
}
export const $goInterface$Interface_Method_tsoptions$UnknownDidYouMeanDiagnostic_void_to_PointerTo_Named_diagnostics$Message$contract: readonly object[] = Object.freeze([$goInterfaceMethod$UnknownDidYouMeanDiagnostic$void_to_PointerTo_Named_diagnostics$Message]);
export function $goInterface$Interface_Method_tsoptions$UnknownDidYouMeanDiagnostic_void_to_PointerTo_Named_diagnostics$Message$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_tsoptions$UnknownDidYouMeanDiagnostic_void_to_PointerTo_Named_diagnostics$Message {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_tsoptions$UnknownDidYouMeanDiagnostic_void_to_PointerTo_Named_diagnostics$Message$contract);
}
export interface $goInterface$Interface_Method_tsoptions$UnknownOptionDiagnostic_void_to_PointerTo_Named_diagnostics$Message extends GoInterfaceValue {
    UnknownOptionDiagnostic(): {
        value: Message__from_diagnostics;
    } | undefined;
}
export const $goInterface$Interface_Method_tsoptions$UnknownOptionDiagnostic_void_to_PointerTo_Named_diagnostics$Message$contract: readonly object[] = Object.freeze([$goInterfaceMethod$UnknownOptionDiagnostic$void_to_PointerTo_Named_diagnostics$Message]);
export function $goInterface$Interface_Method_tsoptions$UnknownOptionDiagnostic_void_to_PointerTo_Named_diagnostics$Message$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_Method_tsoptions$UnknownOptionDiagnostic_void_to_PointerTo_Named_diagnostics$Message {
    return value !== undefined && value.$go$implements($goInterface$Interface_Method_tsoptions$UnknownOptionDiagnostic_void_to_PointerTo_Named_diagnostics$Message$contract);
}
export interface $goInterface$Interface_void extends GoInterfaceValue {
}
export const $goInterface$Interface_void$contract: readonly object[] = Object.freeze([]);
export function $goInterface$Interface_void$is(value: GoInterfaceValue | undefined): value is $goInterface$Interface_void {
    return value !== undefined && value.$go$implements($goInterface$Interface_void$contract);
}
