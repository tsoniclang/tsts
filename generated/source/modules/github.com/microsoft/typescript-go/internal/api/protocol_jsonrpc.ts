import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { ID as ID__from_jsonrpc, ResponseError as ResponseError__from_jsonrpc } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring, uint8 } from "@gotots/runtime/scalars.js";
import { Value as Value__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { Marshal as Marshal__from_json__package_1, Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { JSONRPCVersion as JSONRPCVersion__from_jsonrpc, Message as Message__from_jsonrpc, NewReader as NewReader__from_jsonrpc, NewWriter as NewWriter__from_jsonrpc, Reader as Reader__from_jsonrpc, RequestMessage as RequestMessage__from_jsonrpc, ResponseMessage as ResponseMessage__from_jsonrpc, Writer as Writer__from_jsonrpc } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/package.js";
import { $goInterfaceAdapter$Named_jsonrpc$RequestMessage, $goInterfaceAdapter$Named_jsonrpc$ResponseMessage, $goInterfaceAdapter$Named_jsontext$Value, $goInterfaceAdapter$PointerTo_Named_jsonrpc$Message as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class JSONRPCProtocol {
    declare private readonly $goType: void;
    public constructor(public reader: {
        value: Reader__from_jsonrpc;
    } | undefined, public writer: {
        value: Writer__from_jsonrpc;
    } | undefined) {
    }
    static $copy($source: JSONRPCProtocol): JSONRPCProtocol {
        return new JSONRPCProtocol($source.reader, $source.writer);
    }
    static $equal($left: JSONRPCProtocol, $right: JSONRPCProtocol): bool {
        return $left.reader
            ===
                $right.reader
            &&
                $left.writer
                    ===
                        $right.writer;
    }
    static $hash($source: JSONRPCProtocol): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.reader));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.writer));
        return $hash;
    }
    declare private readonly then?: never;
    static ReadMessage(p: {
        value: JSONRPCProtocol;
    } | undefined): [
        tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_0 = Reader__from_jsonrpc.Read((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reader);
        let data = __gotots_results_0[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_0[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        let msg = Message__from_jsonrpc.$zero();
        const msg$location = tsonicTypeScriptRuntime.boundLocation({}, () => msg, msg$next => msg = msg$next);
        {
            let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new GoInterfaceAdapter(msg$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err__shadow_1 === undefined)) {
                return [void 0, err__shadow_1];
            }
        }
        return [
            msg$location, void 0];
    }
    static WriteError(p: {
        value: JSONRPCProtocol;
    } | undefined, id: {
        value: ID__from_jsonrpc;
    } | undefined, respErr: {
        value: ResponseError__from_jsonrpc;
    } | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let msg = new ResponseMessage__from_jsonrpc(JSONRPCVersion__from_jsonrpc.$zero(), id, void 0, respErr);
        const __gotots_results_1 = Marshal__from_json__package_1(new $goInterfaceAdapter$Named_jsonrpc$ResponseMessage(ResponseMessage__from_jsonrpc.$copy(msg)), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        let data = __gotots_results_1[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_1[1];
        if (!(err === undefined)) {
            return err;
        }
        return Writer__from_jsonrpc.Write((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.writer, data);
    }
    static WriteNotification(p: {
        value: JSONRPCProtocol;
    } | undefined, method: gostring, params: $goInterface$Interface_void | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let msg = new RequestMessage__from_jsonrpc(JSONRPCVersion__from_jsonrpc.$zero(), void 0, method, params);
        const __gotots_results_2 = Marshal__from_json__package_1(new $goInterfaceAdapter$Named_jsonrpc$RequestMessage(RequestMessage__from_jsonrpc.$copy(msg)), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        let data = __gotots_results_2[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_2[1];
        if (!(err === undefined)) {
            return err;
        }
        return Writer__from_jsonrpc.Write((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.writer, data);
    }
    static WriteRequest(p: {
        value: JSONRPCProtocol;
    } | undefined, id: {
        value: ID__from_jsonrpc;
    } | undefined, method: gostring, params: $goInterface$Interface_void | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let msg = new RequestMessage__from_jsonrpc(JSONRPCVersion__from_jsonrpc.$zero(), id, method, params);
        const __gotots_results_3 = Marshal__from_json__package_1(new $goInterfaceAdapter$Named_jsonrpc$RequestMessage(RequestMessage__from_jsonrpc.$copy(msg)), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        let data = __gotots_results_3[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_3[1];
        if (!(err === undefined)) {
            return err;
        }
        return Writer__from_jsonrpc.Write((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.writer, data);
    }
    static WriteResponse(p: {
        value: JSONRPCProtocol;
    } | undefined, id: {
        value: ID__from_jsonrpc;
    } | undefined, result: $goInterface$Interface_void | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        if (result === undefined) {
            const __gotots_conversion_0 = "null";
            const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
            for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
            }
            result = new $goInterfaceAdapter$Named_jsontext$Value(new Value__from_jsontext(__gotots_conversion_1));
        }
        let msg = new ResponseMessage__from_jsonrpc(JSONRPCVersion__from_jsonrpc.$zero(), id, result, void 0);
        const __gotots_results_4 = Marshal__from_json__package_1(new $goInterfaceAdapter$Named_jsonrpc$ResponseMessage(ResponseMessage__from_jsonrpc.$copy(msg)), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        let data = __gotots_results_4[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_4[1];
        if (!(err === undefined)) {
            return err;
        }
        return Writer__from_jsonrpc.Write((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.writer, data);
    }
}
export function NewJSONRPCProtocol(rw: GoInterface | undefined): {
    value: JSONRPCProtocol;
} | undefined {
    return { value: new JSONRPCProtocol(NewReader__from_jsonrpc(rw), NewWriter__from_jsonrpc(rw)) };
}
