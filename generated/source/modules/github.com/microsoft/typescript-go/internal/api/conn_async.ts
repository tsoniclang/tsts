import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_void, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Handler } from "./conn.js";
import type { Protocol } from "./protocol.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, uint8 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Value as Value__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { CodeInternalError as CodeInternalError__from_jsonrpc, ID as ID__from_jsonrpc, Message as Message__from_jsonrpc, NewIDString as NewIDString__from_jsonrpc, ResponseError as ResponseError__from_jsonrpc } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/package.js";
import { $goInterfaceAdapter$PointerTo_Named_api$JSONRPCProtocol, $goInterfaceAdapter$int32, $goInterfaceAdapter$string, $goInterfaceAdapter$int64 as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is, $goInterface$Interface_Method_Is_Named_error_to_bool$contract as GoInterface$contract, $goInterface$Interface_Method_Is_Named_error_to_bool$is as GoInterface$is } from "../../../../../../support/interface-contracts.js";
import { $goMap$MapOf_Named_jsonrpc$ID_To_ChannelOf_PointerTo_Named_jsonrpc$Message as GoMap } from "../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { NewJSONRPCProtocol } from "./protocol_jsonrpc.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as provider_error from "@gotots/gostdlib/internal/facets/provider-error.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as debug__from_gostdlib from "@gotots/gostdlib/runtime/debug.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { GoChannel, goSelect } from "@gotots/runtime/channel.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class AsyncConn {
    declare private readonly $goType: void;
    public constructor(public rwc: GoInterface | undefined, public protocol: Protocol | undefined, public handler: Handler | undefined, public seq: atomic__from_gostdlib.Int64, public pending: GoMapValue<ID__from_jsonrpc, GoChannel<tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined> | undefined>, public pendingMu: sync__from_gostdlib.Mutex, public writeMu: sync__from_gostdlib.Mutex) {
    }
    static $copy($source: AsyncConn): AsyncConn {
        return new AsyncConn($source.rwc, $source.protocol, $source.handler, named_sync_atomic.SyncAtomicInt64Operations.$copy($source.seq), $source.pending, named_sync.SyncMutexOperations.$copy($source.pendingMu), named_sync.SyncMutexOperations.$copy($source.writeMu));
    }
    declare private readonly then?: never;
    static Call(c: {
        value: AsyncConn;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, method: gostring, params: $goInterface$Interface_void | undefined): [
        Value__from_jsontext,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            Value__from_jsontext,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [new Value__from_jsontext(RuntimeSlice.nil<uint8>()), void 0];
        try {
            try {
                __gotots_return_block_0: {
                    let id: {
                        value: ID__from_jsonrpc;
                    } | undefined = NewIDString__from_jsonrpc(fmt__from_gostdlib.Sprintf("api%d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(atomic__from_gostdlib.Int64.Add((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.seq, 1n))])));
                    let responseChan: GoChannel<tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined> | undefined = GoChannel.make<tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined>(1, (): tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined => {
                        return void 0;
                    }, (value: tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined): tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined => {
                        return value;
                    });
                    sync__from_gostdlib.Mutex.Lock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingMu);
                    (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending.store(ID__from_jsonrpc.$copy((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value), responseChan);
                    sync__from_gostdlib.Mutex.Unlock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingMu);
                    const __gotots_callee_0 = (): void => {
                        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                        let __gotots_panic_1: GoPanic | undefined = undefined;
                        try {
                            try {
                                __gotots_return_block_1: {
                                    sync__from_gostdlib.Mutex.Lock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingMu);
                                    const __gotots_receiver_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingMu;
                                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                                    };
                                    {
                                        const __gotots_results_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending.lookupOk(ID__from_jsonrpc.$copy((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value));
                                        let ch: GoChannel<tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined> | undefined = __gotots_results_0[0];
                                        let ok = __gotots_results_0[1];
                                        if (ok) {
                                            GoChannel.close(ch);
                                            (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending.delete(ID__from_jsonrpc.$copy((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value));
                                        }
                                    }
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
                    };
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        __gotots_callee_0();
                    };
                    sync__from_gostdlib.Mutex.Lock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.writeMu);
                    const __gotots_receiver_1 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.protocol;
                    const __gotots_argument_0 = id;
                    const __gotots_argument_1 = method;
                    const __gotots_argument_2 = params;
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<Protocol>(__gotots_receiver_1).WriteRequest(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
                    sync__from_gostdlib.Mutex.Unlock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.writeMu);
                    if (!(err === undefined)) {
                        __gotots_return_0 = [new Value__from_jsontext(RuntimeSlice.nil<uint8>()), err];
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_2 = ctx;
                    const __gotots_channel_0 = goInterfaceNonNil<$goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void>(__gotots_receiver_2).Done();
                    const __gotots_channel_1 = (value: GoEmptyStruct, ok: boolean): void => {
                        __gotots_receive_0 = [value, ok];
                    };
                    let __gotots_receive_0: [
                        GoEmptyStruct,
                        boolean
                    ] | undefined = undefined;
                    const __gotots_select_0 = GoChannel.$selectReceive(__gotots_channel_0, __gotots_channel_1);
                    let __gotots_receive_1: [
                        tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined,
                        boolean
                    ] | undefined = undefined;
                    const __gotots_select_1 = GoChannel.$selectReceive(responseChan, (value: tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined, ok: boolean): void => {
                        __gotots_receive_1 = [value, ok];
                    });
                    const __gotots_switch_selection_0 = goSelect([__gotots_select_0, __gotots_select_1]);
                    switch (__gotots_switch_selection_0) {
                        case 0: {
                            const __gotots_results_1 = new Value__from_jsontext(RuntimeSlice.nil<uint8>());
                            const __gotots_receiver_3 = ctx;
                            const __gotots_results_2 = goInterfaceNonNil<$goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void>(__gotots_receiver_3).Err();
                            __gotots_return_0 = [__gotots_results_1, __gotots_results_2];
                            break __gotots_return_block_0;
                            break;
                        }
                        case 1: {
                            if (__gotots_receive_1 === undefined) {
                                GoPanic.raiseRuntime("selected receive has no result");
                            }
                            let resp: tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined = __gotots_receive_1[0];
                            if (!(((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.Error === undefined)) {
                                __gotots_return_0 = [new Value__from_jsontext(RuntimeSlice.nil<uint8>()), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("api: remote error [%d]: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int32((((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.Error ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Code), new $goInterfaceAdapter$string((((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.Error ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Message)])))];
                                break __gotots_return_block_0;
                            }
                            __gotots_return_0 = [((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.Result, void 0];
                            break __gotots_return_block_0;
                            break;
                        }
                        default: GoPanic.raiseRuntime("select returned an invalid case");
                    }
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
        return __gotots_return_0;
    }
    static Notify(c: {
        value: AsyncConn;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, method: gostring, params: $goInterface$Interface_void | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.writeMu);
                    const __gotots_receiver_3 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.writeMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_3, $go$recovery);
                    };
                    const __gotots_receiver_4 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.protocol;
                    const __gotots_argument_3 = method;
                    const __gotots_argument_4 = params;
                    __gotots_return_0 = goInterfaceNonNil<Protocol>(__gotots_receiver_4).WriteNotification(__gotots_argument_3, __gotots_argument_4);
                    break __gotots_return_block_0;
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
        return __gotots_return_0;
    }
    static Run(c: {
        value: AsyncConn;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        for (;;) {
            const __gotots_receiver_4 = ctx;
            if (!(goInterfaceNonNil<$goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void>(__gotots_receiver_4).Err() === undefined)) {
                const __gotots_receiver_5 = ctx;
                return goInterfaceNonNil<$goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void>(__gotots_receiver_5).Err();
            }
            const __gotots_receiver_6 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.protocol;
            const __gotots_results_2 = goInterfaceNonNil<Protocol>(__gotots_receiver_6).ReadMessage();
            let msg: tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined = __gotots_results_2[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_2[1];
            if (!(err === undefined)) {
                const __gotots_argument_5 = err;
                const __gotots_argument_6 = GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF);
                if (provider_error.ErrorsIsDirect(__gotots_argument_5, __gotots_argument_6, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                    return void 0;
                }
                return err;
            }
            if (Message__from_jsonrpc.IsResponse(msg)) {
                AsyncConn.$go$private$api$handleResponse(c, msg);
            }
            else if (Message__from_jsonrpc.IsRequest(msg)) {
                AsyncConn.$go$private$api$handleRequest(c, ctx, msg);
            }
            else if (Message__from_jsonrpc.IsNotification(msg)) {
                AsyncConn.$go$private$api$handleNotification(c, ctx, msg);
            }
        }
    }
    static $go$private$api$handleNotification(c: {
        value: AsyncConn;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, msg: tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined): void {
        const __gotots_receiver_11 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.handler;
        const __gotots_argument_15 = ctx;
        const __gotots_argument_16 = ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.Method;
        const __gotots_argument_17 = ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.Params;
        goInterfaceNonNil<Handler>(__gotots_receiver_11).HandleNotification(__gotots_argument_15, __gotots_argument_16, __gotots_argument_17);
    }
    static $go$private$api$handleRequest(c: {
        value: AsyncConn;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, msg: tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    let result: $goInterface$Interface_void | undefined = void 0;
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
                    const __gotots_callee_0 = ($go$recovery: GoRecovery): void => {
                        {
                            let r: $goInterface$Interface_void | undefined = $go$recovery === undefined ? undefined : $go$recovery.take();
                            if (!(r === undefined)) {
                                const __gotots_conversion_3 = debug__from_gostdlib.Stack();
                                let __gotots_conversion_4 = "";
                                for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                                    __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
                                }
                                let stack = __gotots_conversion_4;
                                err = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("panic: %v\n%s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([r, new $goInterfaceAdapter$string(stack)])));
                                sync__from_gostdlib.Mutex.Lock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.writeMu);
                                const __gotots_receiver_10 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.protocol;
                                const __gotots_argument_10 = ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.ID;
                                const __gotots_field_2 = CodeInternalError__from_jsonrpc;
                                const __gotots_receiver_9 = err;
                                const __gotots_field_3 = goInterfaceNonNil<$goInterface$Interface_Method_Error_void_to_string>(__gotots_receiver_9).Error();
                                const __gotots_argument_11 = { value: new ResponseError__from_jsonrpc(__gotots_field_2, __gotots_field_3, void 0) };
                                let writeErr__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<Protocol>(__gotots_receiver_10).WriteError(__gotots_argument_10, __gotots_argument_11);
                                sync__from_gostdlib.Mutex.Unlock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.writeMu);
                                if (!(writeErr__shadow_1 === undefined)) {
                                    const __gotots_argument_12 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("api: failed to write panic error response: %v (original panic: %v)", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([writeErr__shadow_1, r])));
                                    GoPanic.raise(__gotots_argument_12 === undefined ? GoPanicNilValue.create() : __gotots_argument_12);
                                }
                            }
                        }
                    };
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        __gotots_callee_0($go$recovery);
                    };
                    const __gotots_receiver_11 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.handler;
                    const __gotots_argument_13 = ctx;
                    const __gotots_argument_14 = ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.Method;
                    const __gotots_argument_15 = ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.Params;
                    const __gotots_results_4 = goInterfaceNonNil<Handler>(__gotots_receiver_11).HandleRequest(__gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
                    result = __gotots_results_4[0];
                    err = __gotots_results_4[1];
                    sync__from_gostdlib.Mutex.Lock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.writeMu);
                    const __gotots_receiver_12 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.writeMu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_12, $go$recovery);
                    };
                    let writeErr: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
                    if (!(err === undefined)) {
                        const __gotots_receiver_14 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.protocol;
                        const __gotots_argument_16 = ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.ID;
                        const __gotots_field_4 = CodeInternalError__from_jsonrpc;
                        const __gotots_receiver_13 = err;
                        const __gotots_field_5 = goInterfaceNonNil<$goInterface$Interface_Method_Error_void_to_string>(__gotots_receiver_13).Error();
                        const __gotots_argument_17 = { value: new ResponseError__from_jsonrpc(__gotots_field_4, __gotots_field_5, void 0) };
                        writeErr = goInterfaceNonNil<Protocol>(__gotots_receiver_14).WriteError(__gotots_argument_16, __gotots_argument_17);
                    }
                    else {
                        const __gotots_receiver_15 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.protocol;
                        const __gotots_argument_18 = ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.ID;
                        const __gotots_argument_19 = result;
                        writeErr = goInterfaceNonNil<Protocol>(__gotots_receiver_15).WriteResponse(__gotots_argument_18, __gotots_argument_19);
                    }
                    if (!(writeErr === undefined)) {
                        const __gotots_argument_20 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("api: failed to write response: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([writeErr])));
                        GoPanic.raise(__gotots_argument_20 === undefined ? GoPanicNilValue.create() : __gotots_argument_20);
                    }
                }
            }
            catch (__gotots_caught_2) {
                if (!(__gotots_caught_2 instanceof GoPanic)) {
                    throw __gotots_caught_2;
                }
                __gotots_panic_0 = __gotots_caught_2;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
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
    static $go$private$api$handleResponse(c: {
        value: AsyncConn;
    } | undefined, msg: tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined): void {
        sync__from_gostdlib.Mutex.Lock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingMu);
        const __gotots_results_3 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending.lookupOk(ID__from_jsonrpc.$copy((((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.ID ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value));
        let ch: GoChannel<tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined> | undefined = __gotots_results_3[0];
        let ok = __gotots_results_3[1];
        if (ok) {
            (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending.delete(ID__from_jsonrpc.$copy((((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.ID ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value));
        }
        sync__from_gostdlib.Mutex.Unlock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingMu);
        if (ok) {
            GoChannel.send(ch, msg);
            GoChannel.close(ch);
        }
    }
}
export function NewAsyncConn(rwc: GoInterface | undefined, handler: Handler | undefined): {
    value: AsyncConn;
} | undefined {
    return NewAsyncConnWithProtocol(rwc, new $goInterfaceAdapter$PointerTo_Named_api$JSONRPCProtocol(NewJSONRPCProtocol(rwc)), handler);
}
export function NewAsyncConnWithProtocol(rwc: GoInterface | undefined, protocol: Protocol | undefined, handler: Handler | undefined): {
    value: AsyncConn;
} | undefined {
    return { value: new AsyncConn(rwc, protocol, handler, named_sync_atomic.SyncAtomicInt64Operations.$zero(), GoMap.make(0, []), named_sync.SyncMutexOperations.$zero(), named_sync.SyncMutexOperations.$zero()) };
}
