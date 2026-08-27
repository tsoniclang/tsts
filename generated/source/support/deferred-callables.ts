import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Encoder as Encoder__from_jsontext } from "../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/encode.js";
import type { HasFileName as HasFileName__from_ast, SourceFile as SourceFile__from_ast } from "../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Diagnostic as Diagnostic__from_ast } from "../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { SourceFileParseOptions as SourceFileParseOptions__from_ast } from "../modules/github.com/microsoft/typescript-go/internal/ast/parseoptions.js";
import type { ModuleKind as ModuleKind__from_core } from "../modules/github.com/microsoft/typescript-go/internal/core/compileroptions.js";
import type { Message as Message__from_diagnostics } from "../modules/github.com/microsoft/typescript-go/internal/diagnostics/diagnostics.js";
import type { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../modules/github.com/microsoft/typescript-go/internal/tsoptions/parsedcommandline.js";
import type { Path as Path__from_tspath } from "../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { FS as FS__from_vfs } from "../modules/github.com/microsoft/typescript-go/internal/vfs/vfs.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "./interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoRecovery } from "@gotots/runtime/panic.js";
import type { bool, gostring, int, uint16, uint32, uint64, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { GoDeferredRegistry } from "@gotots/runtime/deferred-registry.js";
export const $goDeferred$Named_ast$HasFileName_to_Named_core$ModuleKind = new GoDeferredRegistry<($argument0: HasFileName__from_ast | undefined) => ModuleKind__from_core, ($go$recovery: GoRecovery, $argument0: HasFileName__from_ast | undefined) => ModuleKind__from_core, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: HasFileName__from_ast | undefined) => ModuleKind__from_core>;
export const $goDeferred$Named_ast$SourceFileParseOptions_to_PointerTo_Named_ast$SourceFile = new GoDeferredRegistry<($argument0: SourceFileParseOptions__from_ast) => tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, ($go$recovery: GoRecovery, $argument0: SourceFileParseOptions__from_ast) => tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: SourceFileParseOptions__from_ast) => tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
export const $goDeferred$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic = new GoDeferredRegistry<($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, ($go$recovery: GoRecovery, $argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>;
export const $goDeferred$Named_error_to_bool = new GoDeferredRegistry<($argument0: GoInterface | undefined) => bool, ($go$recovery: GoRecovery, $argument0: GoInterface | undefined) => bool, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: GoInterface | undefined) => bool>;
export const $goDeferred$Named_error_to_void = new GoDeferredRegistry<($argument0: GoInterface | undefined) => void, ($go$recovery: GoRecovery, $argument0: GoInterface | undefined) => void, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: GoInterface | undefined) => void>;
export const $goDeferred$Named_io$Writer_to_void = new GoDeferredRegistry<($argument0: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined) => void, ($go$recovery: GoRecovery, $argument0: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined) => void, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined) => void>;
export const $goDeferred$PointerTo_Named_diagnostics$Message_Variadic_SliceOf_Interface_void_to_void = new GoDeferredRegistry<($argument0: {
    value: Message__from_diagnostics;
} | undefined, $argument1: RuntimeSlice<$goInterface$Interface_void | undefined>) => void, ($go$recovery: GoRecovery, $argument0: {
    value: Message__from_diagnostics;
} | undefined, $argument1: RuntimeSlice<$goInterface$Interface_void | undefined>) => void, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: {
    value: Message__from_diagnostics;
} | undefined, $argument1: RuntimeSlice<$goInterface$Interface_void | undefined>) => void>;
export const $goDeferred$PointerTo_Named_jsontext$Encoder_to_Named_error = new GoDeferredRegistry<($argument0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined) => GoInterface | undefined, ($go$recovery: GoRecovery, $argument0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined) => GoInterface | undefined, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined) => GoInterface | undefined>;
export const $goDeferred$SliceOf_byte_to_SliceOf_byte_Named_error = new GoDeferredRegistry<($argument0: RuntimeSlice<uint8>) => [
    RuntimeSlice<uint8>,
    GoInterface | undefined
], ($go$recovery: GoRecovery, $argument0: RuntimeSlice<uint8>) => [
    RuntimeSlice<uint8>,
    GoInterface | undefined
], ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: RuntimeSlice<uint8>) => [
    RuntimeSlice<uint8>,
    GoInterface | undefined
]>;
export const $goDeferred$SliceOf_byte_to_int_Named_error = new GoDeferredRegistry<($argument0: RuntimeSlice<uint8>) => [
    int,
    GoInterface | undefined
], ($go$recovery: GoRecovery, $argument0: RuntimeSlice<uint8>) => [
    int,
    GoInterface | undefined
], ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: RuntimeSlice<uint8>) => [
    int,
    GoInterface | undefined
]>;
export const $goDeferred$SliceOf_byte_to_uint16 = new GoDeferredRegistry<($argument0: RuntimeSlice<uint8>) => uint16, ($go$recovery: GoRecovery, $argument0: RuntimeSlice<uint8>) => uint16, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: RuntimeSlice<uint8>) => uint16>;
export const $goDeferred$SliceOf_byte_to_uint32 = new GoDeferredRegistry<($argument0: RuntimeSlice<uint8>) => uint32, ($go$recovery: GoRecovery, $argument0: RuntimeSlice<uint8>) => uint32, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: RuntimeSlice<uint8>) => uint32>;
export const $goDeferred$SliceOf_byte_to_uint64 = new GoDeferredRegistry<($argument0: RuntimeSlice<uint8>) => uint64, ($go$recovery: GoRecovery, $argument0: RuntimeSlice<uint8>) => uint64, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: RuntimeSlice<uint8>) => uint64>;
export const $goDeferred$SliceOf_byte_uint16_to_void = new GoDeferredRegistry<($argument0: RuntimeSlice<uint8>, $argument1: uint16) => void, ($go$recovery: GoRecovery, $argument0: RuntimeSlice<uint8>, $argument1: uint16) => void, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: RuntimeSlice<uint8>, $argument1: uint16) => void>;
export const $goDeferred$SliceOf_byte_uint32_to_void = new GoDeferredRegistry<($argument0: RuntimeSlice<uint8>, $argument1: uint32) => void, ($go$recovery: GoRecovery, $argument0: RuntimeSlice<uint8>, $argument1: uint32) => void, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: RuntimeSlice<uint8>, $argument1: uint32) => void>;
export const $goDeferred$SliceOf_byte_uint64_to_void = new GoDeferredRegistry<($argument0: RuntimeSlice<uint8>, $argument1: uint64) => void, ($go$recovery: GoRecovery, $argument0: RuntimeSlice<uint8>, $argument1: uint64) => void, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: RuntimeSlice<uint8>, $argument1: uint64) => void>;
export const $goDeferred$int_SliceOf_byte_to_int = new GoDeferredRegistry<($argument0: int, $argument1: RuntimeSlice<uint8>) => int, ($go$recovery: GoRecovery, $argument0: int, $argument1: RuntimeSlice<uint8>) => int, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: int, $argument1: RuntimeSlice<uint8>) => int>;
export const $goDeferred$int_string_to_int = new GoDeferredRegistry<($argument0: int, $argument1: gostring) => int, ($go$recovery: GoRecovery, $argument0: int, $argument1: gostring) => int, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: int, $argument1: gostring) => int>;
export const $goDeferred$string_Named_tspath$Path_to_PointerTo_Named_tsoptions$ParsedCommandLine = new GoDeferredRegistry<($argument0: gostring, $argument1: Path__from_tspath) => tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, ($go$recovery: GoRecovery, $argument0: gostring, $argument1: Path__from_tspath) => tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: gostring, $argument1: Path__from_tspath) => tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>;
export const $goDeferred$string_string_to_int = new GoDeferredRegistry<($argument0: gostring, $argument1: gostring) => int, ($go$recovery: GoRecovery, $argument0: gostring, $argument1: gostring) => int, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: gostring, $argument1: gostring) => int>;
export const $goDeferred$string_to_bool = new GoDeferredRegistry<($argument0: gostring) => bool, ($go$recovery: GoRecovery, $argument0: gostring) => bool, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: gostring) => bool>;
export const $goDeferred$string_to_string = new GoDeferredRegistry<($argument0: gostring) => gostring, ($go$recovery: GoRecovery, $argument0: gostring) => gostring, ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: gostring) => gostring>;
export const $goDeferred$string_to_string_bool = new GoDeferredRegistry<($argument0: gostring) => [
    gostring,
    bool
], ($go$recovery: GoRecovery, $argument0: gostring) => [
    gostring,
    bool
], ($go$recovery: GoRecovery, receiver: GoInterfaceValue, $argument0: gostring) => [
    gostring,
    bool
]>;
export const $goDeferred$void_to_Named_error = new GoDeferredRegistry<() => GoInterface | undefined, ($go$recovery: GoRecovery) => GoInterface | undefined, ($go$recovery: GoRecovery, receiver: GoInterfaceValue) => GoInterface | undefined>;
export const $goDeferred$void_to_Named_vfs$FS = new GoDeferredRegistry<() => FS__from_vfs | undefined, ($go$recovery: GoRecovery) => FS__from_vfs | undefined, ($go$recovery: GoRecovery, receiver: GoInterfaceValue) => FS__from_vfs | undefined>;
export const $goDeferred$void_to_SliceOf_byte_Named_error = new GoDeferredRegistry<() => [
    RuntimeSlice<uint8>,
    GoInterface | undefined
], ($go$recovery: GoRecovery) => [
    RuntimeSlice<uint8>,
    GoInterface | undefined
], ($go$recovery: GoRecovery, receiver: GoInterfaceValue) => [
    RuntimeSlice<uint8>,
    GoInterface | undefined
]>;
export const $goDeferred$void_to_SliceOf_string = new GoDeferredRegistry<() => RuntimeSlice<gostring>, ($go$recovery: GoRecovery) => RuntimeSlice<gostring>, ($go$recovery: GoRecovery, receiver: GoInterfaceValue) => RuntimeSlice<gostring>>;
export const $goDeferred$void_to_bool = new GoDeferredRegistry<() => bool, ($go$recovery: GoRecovery) => bool, ($go$recovery: GoRecovery, receiver: GoInterfaceValue) => bool>;
export const $goDeferred$void_to_string = new GoDeferredRegistry<() => gostring, ($go$recovery: GoRecovery) => gostring, ($go$recovery: GoRecovery, receiver: GoInterfaceValue) => gostring>;
export const $goDeferred$void_to_uint32 = new GoDeferredRegistry<() => uint32, ($go$recovery: GoRecovery) => uint32, ($go$recovery: GoRecovery, receiver: GoInterfaceValue) => uint32>;
export const $goDeferred$void_to_void = new GoDeferredRegistry<() => void, ($go$recovery: GoRecovery) => void, ($go$recovery: GoRecovery, receiver: GoInterfaceValue) => void>;
