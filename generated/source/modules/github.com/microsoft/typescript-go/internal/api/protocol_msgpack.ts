import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { bool, gostring, int, uint16, uint32, uint8 } from "@gotots/runtime/scalars.js";
import { Value as Value__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/api/state.js";
import { Marshal as Marshal__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { CodeInternalError as CodeInternalError__from_jsonrpc, ID as ID__from_jsonrpc, JSONRPCVersion as JSONRPCVersion__from_jsonrpc, Message as Message__from_jsonrpc, NewIDString as NewIDString__from_jsonrpc, ResponseError as ResponseError__from_jsonrpc } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/package.js";
import { $goInterfaceAdapter$Named_api$RawBinary, $goInterfaceAdapter$Named_binary$bigEndian, $goInterfaceAdapter$PointerTo_Named_bufio$Reader, $goInterfaceAdapter$PointerTo_Named_bufio$Writer, $goInterfaceAdapter$PointerTo_uint16, $goInterfaceAdapter$PointerTo_uint32, $goInterfaceAdapter$PointerTo_uint8, $goInterfaceAdapter$byte, $goInterfaceAdapter$uint16, $goInterfaceAdapter$uint32, $goInterfaceAdapter$Named_api$MessageType as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_binary$ByteOrder, $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { $goProviderState$Named_bufio$Writer, $goProviderState$Named_bufio$Reader as GoProviderState } from "../../../../../../support/provider-stateful-representations.js";
import { $goReflectType$PointerTo_uint16, $goReflectType$PointerTo_uint32, $goReflectType$PointerTo_uint8, $goReflectType$uint16, $goReflectType$uint32 } from "../../../../../../support/reflection-types.js";
import "../../../../../../support/reflection-types.js";
import { _MessageType_name$string } from "./stringer_generated.js";
import * as binary__from_gostdlib from "@gotots/gostdlib/encoding/binary.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_encoding_binary from "@gotots/gostdlib/internal/facets/named-encoding-binary.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as provider_bufio_reader from "@gotots/gostdlib/internal/facets/provider-bufio-reader.js";
import * as provider_bufio_writer from "@gotots/gostdlib/internal/facets/provider-bufio-writer.js";
import * as provider_encoding_binary from "@gotots/gostdlib/internal/facets/provider-encoding-binary.js";
import * as provider_io_read from "@gotots/gostdlib/internal/facets/provider-io-read.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export type MessageType = uint8;
export function MessageTypeRequest$constant(): MessageType {
    return 1;
}
export function MessageTypeCallResponse$constant(): MessageType {
    return 2;
}
export function MessageTypeCallError$constant(): MessageType {
    return 3;
}
export function MessageTypeResponse$constant(): MessageType {
    return 4;
}
export function MessageTypeError$constant(): MessageType {
    return 5;
}
export function MessageTypeCall$constant(): MessageType {
    return 6;
}
export function MessageType_IsValid(m: MessageType): bool {
    return m >= MessageTypeRequest$constant() && m <= MessageTypeCall$constant();
}
export const msgpackFixedArray3: uint8 = 147;
export const msgpackBin8: uint8 = 196;
export const msgpackBin16: uint8 = 197;
export const msgpackBin32: uint8 = 198;
export const msgpackU8: uint8 = 204;
export class MessagePackProtocol {
    declare private readonly $goType: void;
    public constructor(public r: tsonicTypeScriptRuntime.Location<GoProviderState> | undefined, public w: tsonicTypeScriptRuntime.Location<$goProviderState$Named_bufio$Writer> | undefined) {
    }
    static $copy($source: MessagePackProtocol): MessagePackProtocol {
        return new MessagePackProtocol($source.r, $source.w);
    }
    static $equal($left: MessagePackProtocol, $right: MessagePackProtocol): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.r, $right.r)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.w, $right.w);
    }
    static $hash($source: MessagePackProtocol): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.r));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.w));
        return $hash;
    }
    declare private readonly then?: never;
    static ReadMessage(p: {
        value: MessagePackProtocol;
    } | undefined): [
        tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_0 = MessagePackProtocol.$go$private$api$readTuple(p);
        let msgType = __gotots_results_0[0];
        let method = __gotots_results_0[1];
        let payload = __gotots_results_0[2];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_0[3];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        let msg: tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined = tsonicTypeScriptRuntime.location<Message__from_jsonrpc>(new Message__from_jsonrpc(JSONRPCVersion__from_jsonrpc.$zero(), void 0, "", new Value__from_jsontext(RuntimeSlice.nil<uint8>()), new Value__from_jsontext(RuntimeSlice.nil<uint8>()), void 0));
        switch (msgType) {
            case MessageTypeRequest$constant(): {
                let id: {
                    value: ID__from_jsonrpc;
                } | undefined = NewIDString__from_jsonrpc(method);
                ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.ID = id;
                ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.Method = method;
                ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.Params = new Value__from_jsontext(payload);
                break;
            }
            case MessageTypeCallResponse$constant(): {
                let id: {
                    value: ID__from_jsonrpc;
                } | undefined = NewIDString__from_jsonrpc(method);
                ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.ID = id;
                ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.Result = new Value__from_jsontext(payload);
                break;
            }
            case MessageTypeCallError$constant(): {
                let id: {
                    value: ID__from_jsonrpc;
                } | undefined = NewIDString__from_jsonrpc(method);
                ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.ID = id;
                const __gotots_field_2 = CodeInternalError__from_jsonrpc;
                const __gotots_conversion_2 = payload;
                let __gotots_conversion_3 = "";
                for (let __gotots_conversion_4 = 0; __gotots_conversion_4 < __gotots_conversion_2.length; __gotots_conversion_4++) {
                    __gotots_conversion_3 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_2.get(__gotots_conversion_4)));
                }
                const __gotots_field_3 = __gotots_conversion_3;
                ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message__from_jsonrpc>).value.Error =
                    { value: new ResponseError__from_jsonrpc(__gotots_field_2, __gotots_field_3, void 0) };
                break;
            }
            default: {
                return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("unexpected message type: %d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(msgType)])))];
                break;
            }
        }
        return [msg, void 0];
    }
    static WriteError(p: {
        value: MessagePackProtocol;
    } | undefined, id: {
        value: ID__from_jsonrpc;
    } | undefined, respErr: {
        value: ResponseError__from_jsonrpc;
    } | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let method = "";
        if (!(id === undefined)) {
            method = ID__from_jsonrpc.String(id);
        }
        const __gotots_receiver_0 = p;
        const __gotots_argument_2 = MessageTypeError$constant();
        const __gotots_argument_3 = method;
        const __gotots_conversion_5: ResponseError__from_jsonrpc["Message"] = (respErr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Message;
        const __gotots_conversion_6 = RuntimeSlice.make<uint8>(__gotots_conversion_5.length, null, 0);
        for (let __gotots_conversion_7 = 0; __gotots_conversion_7 < __gotots_conversion_5.length; __gotots_conversion_7++) {
            __gotots_conversion_6.set(__gotots_conversion_7, __gotots_conversion_5.charCodeAt(__gotots_conversion_7));
        }
        const __gotots_argument_4 = __gotots_conversion_6;
        return MessagePackProtocol.$go$private$api$writeTuple(__gotots_receiver_0, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
    }
    static WriteNotification(p: {
        value: MessagePackProtocol;
    } | undefined, method: gostring, params: $goInterface$Interface_void | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        return MessagePackProtocol.WriteRequest(p, void 0, method, params);
    }
    static WriteRequest(p: {
        value: MessagePackProtocol;
    } | undefined, id: {
        value: ID__from_jsonrpc;
    } | undefined, method: gostring, params: $goInterface$Interface_void | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_results_1 = Marshal__from_json__package_1(params, RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        let payload = __gotots_results_1[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_1[1];
        if (!(err === undefined)) {
            return err;
        }
        return MessagePackProtocol.$go$private$api$writeTuple(p, MessageTypeCall$constant(), method, payload);
    }
    static WriteResponse(p: {
        value: MessagePackProtocol;
    } | undefined, id: {
        value: ID__from_jsonrpc;
    } | undefined, result: $goInterface$Interface_void | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let method = "";
        if (!(id === undefined)) {
            method = ID__from_jsonrpc.String(id);
        }
        let payload = RuntimeSlice.nil<uint8>();
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
        {
            const __gotots_results_2 = (($value: $goInterface$Interface_void | undefined): [
                RawBinary,
                boolean
            ] => {
                if (!$goInterfaceAdapter$Named_api$RawBinary.$is($value)) {
                    return [new RawBinary(RuntimeSlice.nil<uint8>()), false];
                }
                return [$value.$go$value, true];
            })(result);
            let raw: RawBinary = __gotots_results_2[0];
            let ok = __gotots_results_2[1];
            if (ok) {
                payload = raw.$value;
            }
            else {
                const __gotots_results_3 = Marshal__from_json__package_1(result, RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                payload = __gotots_results_3[0];
                err = __gotots_results_3[1];
                if (!(err === undefined)) {
                    return err;
                }
            }
        }
        return MessagePackProtocol.$go$private$api$writeTuple(p, MessageTypeResponse$constant(), method, payload);
    }
    static $go$private$api$readBin(p: {
        value: MessagePackProtocol;
    } | undefined): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_receiver_8: MessagePackProtocol["r"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.r;
        const __gotots_results_12 = GoProviderState.ReadByte(__gotots_receiver_8 === void 0 ? void 0 :
            (__gotots_receiver_8 as tsonicTypeScriptRuntime.Location<GoProviderState>).value);
        const __gotots_results_13 = [__gotots_results_12[0], $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_12[1])] satisfies [
            uint8,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ];
        let t = __gotots_results_13[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_13[1];
        if (!(err === undefined)) {
            return [RuntimeSlice.nil<uint8>(), err];
        }
        let size = 0;
        switch (t) {
            case msgpackBin8: {
                let size8 = 0;
                const size8$location = tsonicTypeScriptRuntime.boundLocation({}, () => size8, size8$next => size8 = size8$next);
                {
                    const __gotots_argument_6 = new $goInterfaceAdapter$PointerTo_Named_bufio$Reader((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.r);
                    const __gotots_argument_7 = new $goInterfaceAdapter$Named_binary$bigEndian(named_encoding_binary.BinaryBigEndianOperations.$copy(binary__from_gostdlib.state.BigEndian));
                    const __gotots_argument_8 = new $goInterfaceAdapter$PointerTo_uint8(size8$location);
                    err = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(provider_encoding_binary.EncodingBinaryReadDirect(GoProviderProfileBridge.$to(__gotots_argument_6), $goProviderInterfaceBridge$Named_binary$ByteOrder.$to(__gotots_argument_7), __gotots_argument_8));
                    if (!(err === undefined)) {
                        return [RuntimeSlice.nil<uint8>(), err];
                    }
                }
                size = size8;
                break;
            }
            case msgpackBin16: {
                let size16 = 0;
                const size16$location = tsonicTypeScriptRuntime.boundLocation({}, () => size16, size16$next => size16 = size16$next);
                {
                    const __gotots_argument_9 = new $goInterfaceAdapter$PointerTo_Named_bufio$Reader((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.r);
                    const __gotots_argument_10 = new $goInterfaceAdapter$Named_binary$bigEndian(named_encoding_binary.BinaryBigEndianOperations.$copy(binary__from_gostdlib.state.BigEndian));
                    const __gotots_argument_11 = new $goInterfaceAdapter$PointerTo_uint16(size16$location);
                    err = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(provider_encoding_binary.EncodingBinaryReadDirect(GoProviderProfileBridge.$to(__gotots_argument_9), $goProviderInterfaceBridge$Named_binary$ByteOrder.$to(__gotots_argument_10), __gotots_argument_11));
                    if (!(err === undefined)) {
                        return [RuntimeSlice.nil<uint8>(), err];
                    }
                }
                size = size16;
                break;
            }
            case msgpackBin32: {
                let size32 = 0;
                const size32$location = tsonicTypeScriptRuntime.boundLocation({}, () => size32, size32$next => size32 = size32$next);
                {
                    const __gotots_argument_12 = new $goInterfaceAdapter$PointerTo_Named_bufio$Reader((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.r);
                    const __gotots_argument_13 = new $goInterfaceAdapter$Named_binary$bigEndian(named_encoding_binary.BinaryBigEndianOperations.$copy(binary__from_gostdlib.state.BigEndian));
                    const __gotots_argument_14 = new $goInterfaceAdapter$PointerTo_uint32(size32$location);
                    err = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(provider_encoding_binary.EncodingBinaryReadDirect(GoProviderProfileBridge.$to(__gotots_argument_12), $goProviderInterfaceBridge$Named_binary$ByteOrder.$to(__gotots_argument_13), __gotots_argument_14));
                    if (!(err === undefined)) {
                        return [RuntimeSlice.nil<uint8>(), err];
                    }
                }
                size = size32;
                break;
            }
            default: {
                return [RuntimeSlice.nil<uint8>(), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: expected binary data (0xc4-0xc6), received: 0x%02x", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([$state.ErrInvalidRequest, new $goInterfaceAdapter$byte(t)])))];
                break;
            }
        }
        let payload = RuntimeSlice.make<uint8>(size, null, 0);
        {
            const __gotots_argument_15 = new $goInterfaceAdapter$PointerTo_Named_bufio$Reader((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.r);
            const __gotots_argument_16 = payload;
            const __gotots_results_14 = provider_io_read.IoReadFullDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_15), __gotots_argument_16, $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF)), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)));
            const __gotots_results_15 = [globalThis.Number(BigInt.asIntN(64, __gotots_results_14[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_14[1])] satisfies [
                int,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
            let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_15[1];
            if (!(err__shadow_1 === undefined)) {
                return [RuntimeSlice.nil<uint8>(), err__shadow_1];
            }
        }
        return [payload, void 0];
    }
    static $go$private$api$readTuple(p: {
        value: MessagePackProtocol;
    } | undefined): [
        MessageType,
        gostring,
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_receiver_1: MessagePackProtocol["r"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.r;
        const __gotots_results_4 = GoProviderState.ReadByte(__gotots_receiver_1 === void 0 ? void 0 :
            (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<GoProviderState>).value);
        const __gotots_results_5 = [__gotots_results_4[0], $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_4[1])] satisfies [
            uint8,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ];
        let t = __gotots_results_5[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_5[1];
        if (!(err === undefined)) {
            return [0, "", RuntimeSlice.nil<uint8>(), err];
        }
        if (t !== msgpackFixedArray3) {
            return [0, "", RuntimeSlice.nil<uint8>(), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: expected fixed 3-element array (0x93), received: 0x%02x", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([$state.ErrInvalidRequest, new $goInterfaceAdapter$byte(t)])))];
        }
        const __gotots_receiver_2: MessagePackProtocol["r"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.r;
        const __gotots_results_6 = GoProviderState.ReadByte(__gotots_receiver_2 === void 0 ? void 0 :
            (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<GoProviderState>).value);
        const __gotots_results_7 = [__gotots_results_6[0], $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_6[1])] satisfies [
            uint8,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ];
        t = __gotots_results_7[0];
        err = __gotots_results_7[1];
        if (!(err === undefined)) {
            return [0, "", RuntimeSlice.nil<uint8>(), err];
        }
        let rawType = 0;
        if (t <= 127) {
            rawType = t;
        }
        else if (t === msgpackU8) {
            const __gotots_receiver_3: MessagePackProtocol["r"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.r;
            const __gotots_results_8 = GoProviderState.ReadByte(__gotots_receiver_3 === void 0 ? void 0 :
                (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<GoProviderState>).value);
            const __gotots_results_9 = [__gotots_results_8[0], $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_8[1])] satisfies [
                uint8,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
            rawType = __gotots_results_9[0];
            err = __gotots_results_9[1];
            if (!(err === undefined)) {
                return [0, "", RuntimeSlice.nil<uint8>(), err];
            }
        }
        else {
            return [0, "", RuntimeSlice.nil<uint8>(), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: expected positive fixint or uint8 marker, received: 0x%02x", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([$state.ErrInvalidRequest, new $goInterfaceAdapter$byte(t)])))];
        }
        let msgType = rawType;
        if (!MessageType_IsValid(msgType)) {
            return [0, "", RuntimeSlice.nil<uint8>(), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: unknown message type: %d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([$state.ErrInvalidRequest, new GoInterfaceAdapter(msgType)])))];
        }
        const __gotots_results_10 = MessagePackProtocol.$go$private$api$readBin(p);
        let methodBytes = __gotots_results_10[0];
        err = __gotots_results_10[1];
        if (!(err === undefined)) {
            return [0, "", RuntimeSlice.nil<uint8>(), err];
        }
        const __gotots_conversion_8 = methodBytes;
        let __gotots_conversion_9 = "";
        for (let __gotots_conversion_10 = 0; __gotots_conversion_10 < __gotots_conversion_8.length; __gotots_conversion_10++) {
            __gotots_conversion_9 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_8.get(__gotots_conversion_10)));
        }
        let method = __gotots_conversion_9;
        const __gotots_results_11 = MessagePackProtocol.$go$private$api$readBin(p);
        let payload = __gotots_results_11[0];
        err = __gotots_results_11[1];
        if (!(err === undefined)) {
            return [0, "", RuntimeSlice.nil<uint8>(), err];
        }
        return [msgType, method, payload, void 0];
    }
    static $go$private$api$writeBin(p: {
        value: MessagePackProtocol;
    } | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let length = data.length;
        if (length < 256) {
            {
                const __gotots_receiver_9: MessagePackProtocol["w"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w;
                let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from($goProviderState$Named_bufio$Writer.WriteByte(__gotots_receiver_9 === void 0 ? void 0 :
                    (__gotots_receiver_9 as tsonicTypeScriptRuntime.Location<$goProviderState$Named_bufio$Writer>).value, msgpackBin8));
                if (!(err__shadow_1 === undefined)) {
                    return err__shadow_1;
                }
            }
            {
                const __gotots_receiver_10: MessagePackProtocol["w"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w;
                let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from($goProviderState$Named_bufio$Writer.WriteByte(__gotots_receiver_10 === void 0 ? void 0 :
                    (__gotots_receiver_10 as tsonicTypeScriptRuntime.Location<$goProviderState$Named_bufio$Writer>).value, length & 255));
                if (!(err__shadow_1 === undefined)) {
                    return err__shadow_1;
                }
            }
        }
        else if (length < 65536) {
            {
                const __gotots_receiver_11: MessagePackProtocol["w"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w;
                let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from($goProviderState$Named_bufio$Writer.WriteByte(__gotots_receiver_11 === void 0 ? void 0 :
                    (__gotots_receiver_11 as tsonicTypeScriptRuntime.Location<$goProviderState$Named_bufio$Writer>).value, msgpackBin16));
                if (!(err__shadow_1 === undefined)) {
                    return err__shadow_1;
                }
            }
            {
                const __gotots_argument_17 = new $goInterfaceAdapter$PointerTo_Named_bufio$Writer((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w);
                const __gotots_argument_18 = new $goInterfaceAdapter$Named_binary$bigEndian(named_encoding_binary.BinaryBigEndianOperations.$copy(binary__from_gostdlib.state.BigEndian));
                const __gotots_argument_19 = new $goInterfaceAdapter$uint16(length & 65535);
                let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(provider_encoding_binary.EncodingBinaryWriteDirect($goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct.$to(__gotots_argument_17), $goProviderInterfaceBridge$Named_binary$ByteOrder.$to(__gotots_argument_18), __gotots_argument_19));
                if (!(err__shadow_1 === undefined)) {
                    return err__shadow_1;
                }
            }
        }
        else {
            {
                const __gotots_receiver_12: MessagePackProtocol["w"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w;
                let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from($goProviderState$Named_bufio$Writer.WriteByte(__gotots_receiver_12 === void 0 ? void 0 :
                    (__gotots_receiver_12 as tsonicTypeScriptRuntime.Location<$goProviderState$Named_bufio$Writer>).value, msgpackBin32));
                if (!(err__shadow_1 === undefined)) {
                    return err__shadow_1;
                }
            }
            {
                const __gotots_argument_20 = new $goInterfaceAdapter$PointerTo_Named_bufio$Writer((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w);
                const __gotots_argument_21 = new $goInterfaceAdapter$Named_binary$bigEndian(named_encoding_binary.BinaryBigEndianOperations.$copy(binary__from_gostdlib.state.BigEndian));
                const __gotots_argument_22 = new $goInterfaceAdapter$uint32(length >>> 0);
                let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(provider_encoding_binary.EncodingBinaryWriteDirect($goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct.$to(__gotots_argument_20), $goProviderInterfaceBridge$Named_binary$ByteOrder.$to(__gotots_argument_21), __gotots_argument_22));
                if (!(err__shadow_1 === undefined)) {
                    return err__shadow_1;
                }
            }
        }
        const __gotots_receiver_13: MessagePackProtocol["w"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w;
        const __gotots_results_16 = $goProviderState$Named_bufio$Writer.Write(__gotots_receiver_13 === void 0 ? void 0 :
            (__gotots_receiver_13 as tsonicTypeScriptRuntime.Location<$goProviderState$Named_bufio$Writer>).value, data);
        const __gotots_results_17 = [globalThis.Number(BigInt.asIntN(64, __gotots_results_16[0])), $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(__gotots_results_16[1])] satisfies [
            int,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_17[1];
        return err;
    }
    static $go$private$api$writeTuple(p: {
        value: MessagePackProtocol;
    } | undefined, msgType: MessageType, method: gostring, payload: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        {
            const __gotots_receiver_4: MessagePackProtocol["w"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w;
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from($goProviderState$Named_bufio$Writer.WriteByte(__gotots_receiver_4 === void 0 ? void 0 :
                (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<$goProviderState$Named_bufio$Writer>).value, msgpackFixedArray3));
            if (!(err === undefined)) {
                return err;
            }
        }
        {
            const __gotots_receiver_5: MessagePackProtocol["w"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w;
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from($goProviderState$Named_bufio$Writer.WriteByte(__gotots_receiver_5 === void 0 ? void 0 :
                (__gotots_receiver_5 as tsonicTypeScriptRuntime.Location<$goProviderState$Named_bufio$Writer>).value, msgType));
            if (!(err === undefined)) {
                return err;
            }
        }
        {
            const __gotots_receiver_6 = p;
            const __gotots_conversion_11 = method;
            const __gotots_conversion_12 = RuntimeSlice.make<uint8>(__gotots_conversion_11.length, null, 0);
            for (let __gotots_conversion_13 = 0; __gotots_conversion_13 < __gotots_conversion_11.length; __gotots_conversion_13++) {
                __gotots_conversion_12.set(__gotots_conversion_13, __gotots_conversion_11.charCodeAt(__gotots_conversion_13));
            }
            const __gotots_argument_5 = __gotots_conversion_12;
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = MessagePackProtocol.$go$private$api$writeBin(__gotots_receiver_6, __gotots_argument_5);
            if (!(err === undefined)) {
                return err;
            }
        }
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = MessagePackProtocol.$go$private$api$writeBin(p, payload);
            if (!(err === undefined)) {
                return err;
            }
        }
        const __gotots_receiver_7: MessagePackProtocol["w"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w;
        return $goProviderProfileBridge$Named_error$Using$Error$Direct.$from($goProviderState$Named_bufio$Writer.Flush(__gotots_receiver_7 === void 0 ? void 0 :
            (__gotots_receiver_7 as tsonicTypeScriptRuntime.Location<$goProviderState$Named_bufio$Writer>).value));
    }
}
export function NewMessagePackProtocol(rw: GoInterface | undefined): {
    value: MessagePackProtocol;
} | undefined {
    const __gotots_argument_0 = rw;
    const __gotots_conversion_0 = provider_bufio_reader.NewReaderDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_0), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrNoProgress)));
    const __gotots_field_0 = __gotots_conversion_0 === undefined ? undefined :
        tsonicTypeScriptRuntime.boundLocation<GoProviderState>(__gotots_conversion_0, (): GoProviderState => {
            return __gotots_conversion_0;
        }, ($go$providerPointerValue: GoProviderState): void => {
            GoProviderState.$assign(__gotots_conversion_0, $go$providerPointerValue);
        });
    const __gotots_argument_1 = rw;
    const __gotots_conversion_1 = provider_bufio_writer.NewWriterDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract>($goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct.$to(__gotots_argument_1), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrShortWrite)));
    const __gotots_field_1 = __gotots_conversion_1 === undefined ? undefined :
        tsonicTypeScriptRuntime.boundLocation<$goProviderState$Named_bufio$Writer>(__gotots_conversion_1, (): $goProviderState$Named_bufio$Writer => {
            return __gotots_conversion_1;
        }, ($go$providerPointerValue: $goProviderState$Named_bufio$Writer): void => {
            $goProviderState$Named_bufio$Writer.$assign(__gotots_conversion_1, $go$providerPointerValue);
        });
    return { value: new MessagePackProtocol(__gotots_field_0, __gotots_field_1) };
}
export class RawBinary {
    declare private readonly $goType: void;
    constructor(public readonly $value: RuntimeSlice<uint8>) {
    }
    declare private readonly then?: never;
}
export function MessageType_String(i: MessageType): gostring {
    let idx = i - 0;
    if (i < 0 || idx >= 7) {
        return "MessageType(" + strconv__from_gostdlib.FormatInt(BigInt.asIntN(64, goNumberToBigInt(i)), BigInt.asIntN(64, goNumberToBigInt(10))) + ")";
    }
    return goStringSlice(_MessageType_name$string, $state._MessageType_index.get(idx), $state._MessageType_index.get(idx + 1));
}
