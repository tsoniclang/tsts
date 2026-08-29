import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { ID as ID__from_jsonrpc, ResponseError as ResponseError__from_jsonrpc } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { IntegerOrString } from "./lsp_generated.js";
import type { bool, gostring, int32, uint8 } from "@gotots/runtime/scalars.js";
import { Marshal as Marshal__from_json__package_1, Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { JSONRPCVersion as JSONRPCVersion__from_jsonrpc, MessageKindNotification$constant as MessageKindNotification$constant__from_jsonrpc, MessageKindRequest$constant as MessageKindRequest$constant__from_jsonrpc, MessageKindResponse$constant as MessageKindResponse$constant__from_jsonrpc, MessageKind as MessageKind__from_jsonrpc, NewIDInt as NewIDInt__from_jsonrpc, NewIDString as NewIDString__from_jsonrpc } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/package.js";
import { $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22_, $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u2c_omitzero_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22__Field_Result_Named_jsontext$Value_Tag_json_u3a__u22_result_u2c_omitzero_u22__Field_Error_PointerTo_Named_jsonrpc$ResponseError_Tag_json_u3a__u22_error_u2c_omitzero_u22_ } from "../../../../../../../support/anonymous-structs.js";
import { $goInterfaceAdapter$Named_jsontext$Value, $goInterfaceAdapter$Named_lsproto$ErrorCode, $goInterfaceAdapter$PointerTo_Named_lsproto$ResponseMessage, $goInterfaceAdapter$PointerTo_Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22_, $goInterfaceAdapter$PointerTo_Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u2c_omitzero_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22__Field_Result_Named_jsontext$Value_Tag_json_u3a__u22_result_u2c_omitzero_u22__Field_Error_PointerTo_Named_jsonrpc$ResponseError_Tag_json_u3a__u22_error_u2c_omitzero_u22_, $goInterfaceAdapter$PointerTo_Named_lsproto$RequestMessage as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../../support/provider-interface-bridges.js";
import { Method } from "./lsp.js";
import { ErrorCodeInvalidParams$constant, ErrorCodeInvalidRequest$constant, unmarshalParams } from "./lsp_generated.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function NewID(rawValue: IntegerOrString): {
    value: ID__from_jsonrpc;
} | undefined {
    if (!(rawValue.String === undefined)) {
        return NewIDString__from_jsonrpc(((rawValue.String ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value);
    }
    return NewIDInt__from_jsonrpc(((rawValue.Integer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int32>).value);
}
export class Message {
    declare private readonly $goType: void;
    public constructor(public Kind: MessageKind__from_jsonrpc, public msg: GoInterface | undefined) {
    }
    static $zero(): Message {
        return new Message(new MessageKind__from_jsonrpc(0), void 0);
    }
    static $copy($source: Message): Message {
        return new Message($source.Kind, $source.msg);
    }
    static $equal($left: Message, $right: Message): bool {
        return $left.Kind.$value === $right.Kind.$value && goInterfaceEqual($left.msg, $right.msg);
    }
    static $hash($source: Message): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Kind.$value));
        $hash = GoMapHash.mix($hash, $source.msg === undefined ? 0 : $source.msg.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static AsRequest(m: {
        value: Message;
    } | undefined): {
        value: RequestMessage;
    } | undefined {
        return (($value: GoInterface | undefined): {
            value: RequestMessage;
        } | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.msg);
    }
    static AsResponse(m: {
        value: Message;
    } | undefined): tsonicTypeScriptRuntime.Location<ResponseMessage> | undefined {
        return (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<ResponseMessage> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$ResponseMessage.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.msg);
    }
    static MarshalJSON(m: {
        value: Message;
    } | undefined): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Marshal__from_json__package_1((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.msg, RuntimeSlice.nil<Options__from_jsonopts | undefined>());
    }
    static UnmarshalJSON(m: {
        value: Message;
    } | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let raw = $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u2c_omitzero_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22__Field_Result_Named_jsontext$Value_Tag_json_u3a__u22_result_u2c_omitzero_u22__Field_Error_PointerTo_Named_jsonrpc$ResponseError_Tag_json_u3a__u22_error_u2c_omitzero_u22_.$zero();
        {
            let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u2c_omitzero_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22__Field_Result_Named_jsontext$Value_Tag_json_u3a__u22_result_u2c_omitzero_u22__Field_Error_PointerTo_Named_jsonrpc$ResponseError_Tag_json_u3a__u22_error_u2c_omitzero_u22_(raw), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err__shadow_1 === undefined)) {
                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: %w", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidRequest$constant()), err__shadow_1])));
            }
        }
        if (!(raw.ID === undefined) && raw.Method.$value ===
            ((void Method,
                "") as string)) {
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind = MessageKindResponse$constant__from_jsonrpc();
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.msg = new $goInterfaceAdapter$PointerTo_Named_lsproto$ResponseMessage(tsonicTypeScriptRuntime.location<ResponseMessage>(new ResponseMessage(JSONRPCVersion__from_jsonrpc.$zero(), raw.ID, new $goInterfaceAdapter$Named_jsontext$Value(raw.Result), raw.Error)));
            return void 0;
        }
        let params: GoInterface | undefined = void 0;
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
        if (raw.Params.$value.length > 0) {
            const __gotots_results_1 = unmarshalParams(raw.Method, raw.Params.$value);
            params = __gotots_results_1[0];
            err = __gotots_results_1[1];
        }
        if (raw.ID === undefined) {
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind = MessageKindNotification$constant__from_jsonrpc();
        }
        else {
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind = MessageKindRequest$constant__from_jsonrpc();
        }
        (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.msg = new GoInterfaceAdapter({ value: new RequestMessage(JSONRPCVersion__from_jsonrpc.$zero(), raw.ID, raw.Method, params) });
        if (!(err === undefined)) {
            return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: %w", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidParams$constant()), err])));
        }
        return void 0;
    }
}
export class RequestMessage {
    declare private readonly $goType: void;
    public constructor(public JSONRPC: JSONRPCVersion__from_jsonrpc, public ID: {
        value: ID__from_jsonrpc;
    } | undefined, public Method: Method, public Params: GoInterface | undefined) {
    }
    static $copy($source: RequestMessage): RequestMessage {
        return new RequestMessage(JSONRPCVersion__from_jsonrpc.$copy($source.JSONRPC), $source.ID, $source.Method, $source.Params);
    }
    static $equal($left: RequestMessage, $right: RequestMessage): bool {
        return JSONRPCVersion__from_jsonrpc.$equal($left.JSONRPC, $right.JSONRPC) &&
            $left.ID
                ===
                    $right.ID && $left.Method.$value === $right.Method.$value && goInterfaceEqual($left.Params, $right.Params);
    }
    static $hash($source: RequestMessage): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, JSONRPCVersion__from_jsonrpc.$hash($source.JSONRPC));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.ID));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Method.$value));
        $hash = GoMapHash.mix($hash, $source.Params === undefined ? 0 : $source.Params.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static Message(r: {
        value: RequestMessage;
    } | undefined): {
        value: Message;
    } | undefined {
        let kind = MessageKindRequest$constant__from_jsonrpc();
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID === undefined) {
            kind = MessageKindNotification$constant__from_jsonrpc();
        }
        return { value: new Message(kind, new GoInterfaceAdapter(r)) };
    }
    static UnmarshalJSON(r: {
        value: RequestMessage;
    } | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let raw = $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22_.$zero();
        {
            let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22_(raw), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err__shadow_1 === undefined)) {
                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: %w", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidRequest$constant()), err__shadow_1])));
            }
        }
        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID = raw.ID;
        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method = raw.Method;
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
        const __gotots_store_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_results_0 = unmarshalParams(raw.Method, raw.Params.$value);
        __gotots_store_0.Params = __gotots_results_0[0];
        err = __gotots_results_0[1];
        if (!(err === undefined)) {
            return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: %w", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidRequest$constant()), err])));
        }
        return void 0;
    }
}
export class ResponseMessage {
    declare private readonly $goType: void;
    public constructor(public JSONRPC: JSONRPCVersion__from_jsonrpc, public ID: {
        value: ID__from_jsonrpc;
    } | undefined, public Result: GoInterface | undefined, public Error: {
        value: ResponseError__from_jsonrpc;
    } | undefined) {
    }
    static $copy($source: ResponseMessage): ResponseMessage {
        return new ResponseMessage(JSONRPCVersion__from_jsonrpc.$copy($source.JSONRPC), $source.ID, $source.Result, $source.Error);
    }
    static $equal($left: ResponseMessage, $right: ResponseMessage): bool {
        return JSONRPCVersion__from_jsonrpc.$equal($left.JSONRPC, $right.JSONRPC) &&
            $left.ID
                ===
                    $right.ID && goInterfaceEqual($left.Result, $right.Result) &&
            $left.Error
                ===
                    $right.Error;
    }
    static $hash($source: ResponseMessage): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, JSONRPCVersion__from_jsonrpc.$hash($source.JSONRPC));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.ID));
        $hash = GoMapHash.mix($hash, $source.Result === undefined ? 0 : $source.Result.$go$hash());
        $hash = GoMapHash.mix($hash, (($pointer3: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer3 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer3)))($source.Error));
        return $hash;
    }
    declare private readonly then?: never;
    static Message(r: tsonicTypeScriptRuntime.Location<ResponseMessage> | undefined): {
        value: Message;
    } | undefined {
        return { value: new Message(MessageKindResponse$constant__from_jsonrpc(), new $goInterfaceAdapter$PointerTo_Named_lsproto$ResponseMessage(r)) };
    }
}
