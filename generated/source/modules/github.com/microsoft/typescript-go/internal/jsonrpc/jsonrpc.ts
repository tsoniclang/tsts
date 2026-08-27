import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring, int32, int as int__from_gotots_support, uint8 } from "@gotots/runtime/scalars.js";
import { Value as Value__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { Marshal as Marshal__from_json__package_1, Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/state.js";
import { $goInterfaceAdapter$PointerTo_int32, $goInterfaceAdapter$PointerTo_string, $goInterfaceAdapter$SliceOf_byte, $goInterfaceAdapter$int32, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class JSONRPCVersion {
    declare private readonly $goType: void;
    public constructor() {
    }
    static $zero(): JSONRPCVersion {
        return new JSONRPCVersion();
    }
    static $copy($source: JSONRPCVersion): JSONRPCVersion {
        return new JSONRPCVersion();
    }
    static $equal($left: JSONRPCVersion, $right: JSONRPCVersion): bool {
        return true;
    }
    static $hash($source: JSONRPCVersion): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
    static UnmarshalJSON($1: tsonicTypeScriptRuntime.Location<JSONRPCVersion> | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_conversion_3 = data;
        let __gotots_conversion_4 = "";
        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
            __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
        }
        const __gotots_binary_operand_0 = __gotots_conversion_4;
        const __gotots_binary_operand_1 = jsonRPCVersion$string;
        if (__gotots_binary_operand_0 !== __gotots_binary_operand_1) {
            return $state.ErrInvalidJSONRPCVersion;
        }
        return void 0;
    }
    MarshalJSON(): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_conversion_0 = jsonRPCVersion$string;
        const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
        }
        const __gotots_results_0 = __gotots_conversion_1;
        const __gotots_results_1 = void 0;
        return [__gotots_results_0, __gotots_results_1];
    }
}
export const jsonRPCVersion$string: gostring = "\"2.0\"";
export class ID {
    declare private readonly $goType: void;
    public constructor(public str: gostring, public int: int32) {
    }
    static $copy($source: ID): ID {
        return new ID($source.str, $source.int);
    }
    static $equal($left: ID, $right: ID): bool {
        return $left.str === $right.str && $left.int === $right.int;
    }
    static $hash($source: ID): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.str));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.int));
        return $hash;
    }
    declare private readonly then?: never;
    static MarshalJSON(id: {
        value: ID;
    } | undefined): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if ((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.str !== "") {
            return Marshal__from_json__package_1(new GoInterfaceAdapter((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.str), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        }
        return Marshal__from_json__package_1(new $goInterfaceAdapter$int32((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.int), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
    }
    static String(id: {
        value: ID;
    } | undefined): gostring {
        if ((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.str !== "") {
            return (id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.str;
        }
        return strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.int)));
    }
    static UnmarshalJSON(id: {
        value: ID;
    } | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        void ((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new ID("", 0));
        if (data.length > 0 && data.get(0) === 34) {
            const __gotots_argument_0 = data;
            const __gotots_store_0 = (id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_1 = new $goInterfaceAdapter$PointerTo_string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "str"));
            const __gotots_argument_2 = RuntimeSlice.nil<Options__from_jsonopts | undefined>();
            return Unmarshal__from_json__package_1(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
        }
        const __gotots_argument_3 = data;
        const __gotots_store_1 = (id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_4 = new $goInterfaceAdapter$PointerTo_int32(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "int"));
        const __gotots_argument_5 = RuntimeSlice.nil<Options__from_jsonopts | undefined>();
        return Unmarshal__from_json__package_1(__gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
    }
}
export function NewIDString(str: gostring): {
    value: ID;
} | undefined {
    return { value: new ID(str, 0) };
}
export function NewIDInt(i: int32): {
    value: ID;
} | undefined {
    return { value: new ID("", i) };
}
export class ResponseError {
    declare private readonly $goType: void;
    public constructor(public Code: int32, public Message: gostring, public Data: GoInterface | undefined) {
    }
    static $copy($source: ResponseError): ResponseError {
        return new ResponseError($source.Code, $source.Message, $source.Data);
    }
    static $equal($left: ResponseError, $right: ResponseError): bool {
        return $left.Code === $right.Code && $left.Message === $right.Message && goInterfaceEqual($left.Data, $right.Data);
    }
    static $hash($source: ResponseError): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Code));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Message));
        $hash = GoMapHash.mix($hash, $source.Data === undefined ? 0 : $source.Data.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static Error(r: {
        value: ResponseError;
    } | undefined): gostring {
        return ResponseError.String(r);
    }
    static String(r: {
        value: ResponseError;
    } | undefined): gostring {
        if (r === undefined) {
            return "";
        }
        const __gotots_results_2 = Marshal__from_json__package_1((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Data, RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        let data = __gotots_results_2[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_2[1];
        if (!(err === undefined)) {
            return fmt__from_gostdlib.Sprintf("[%d]: %s\n%v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int32((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Code), new GoInterfaceAdapter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Message), new $goInterfaceAdapter$SliceOf_byte(data)]));
        }
        return fmt__from_gostdlib.Sprintf("[%d]: %s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int32((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Code), new GoInterfaceAdapter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Message)]));
    }
}
export const CodeInternalError: int32 = -32603;
export class MessageKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int__from_gotots_support) {
    }
    declare private readonly then?: never;
}
export function MessageKindNotification$constant(): MessageKind {
    return new MessageKind(0);
}
export function MessageKindRequest$constant(): MessageKind {
    return new MessageKind(1);
}
export function MessageKindResponse$constant(): MessageKind {
    return new MessageKind(2);
}
export class Message {
    declare private readonly $goType: void;
    public constructor(public JSONRPC: JSONRPCVersion, public ID: {
        value: ID;
    } | undefined, public Method: gostring, public Params: Value__from_jsontext, public Result: Value__from_jsontext, public Error: {
        value: ResponseError;
    } | undefined) {
    }
    static $zero(): Message {
        return new Message(JSONRPCVersion.$zero(), void 0, "", new Value__from_jsontext(RuntimeSlice.nil<uint8>()), new Value__from_jsontext(RuntimeSlice.nil<uint8>()), void 0);
    }
    static $copy($source: Message): Message {
        return new Message(JSONRPCVersion.$copy($source.JSONRPC), $source.ID, $source.Method, $source.Params, $source.Result, $source.Error);
    }
    declare private readonly then?: never;
    static IsNotification(m: tsonicTypeScriptRuntime.Location<Message> | undefined): bool {
        return ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message>).value.ID === undefined && ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message>).value.Method !== "";
    }
    static IsRequest(m: tsonicTypeScriptRuntime.Location<Message> | undefined): bool {
        return !(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message>).value.ID === undefined) && ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message>).value.Method !== "";
    }
    static IsResponse(m: tsonicTypeScriptRuntime.Location<Message> | undefined): bool {
        return !(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message>).value.ID === undefined) && ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Message>).value.Method === "";
    }
}
export class RequestMessage {
    declare private readonly $goType: void;
    public constructor(public JSONRPC: JSONRPCVersion, public ID: {
        value: ID;
    } | undefined, public Method: gostring, public Params: GoInterface | undefined) {
    }
    static $copy($source: RequestMessage): RequestMessage {
        return new RequestMessage(JSONRPCVersion.$copy($source.JSONRPC), $source.ID, $source.Method, $source.Params);
    }
    static $equal($left: RequestMessage, $right: RequestMessage): bool {
        return JSONRPCVersion.$equal($left.JSONRPC, $right.JSONRPC) &&
            $left.ID
                ===
                    $right.ID && $left.Method === $right.Method && goInterfaceEqual($left.Params, $right.Params);
    }
    static $hash($source: RequestMessage): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, JSONRPCVersion.$hash($source.JSONRPC));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.ID));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Method));
        $hash = GoMapHash.mix($hash, $source.Params === undefined ? 0 : $source.Params.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
}
export class ResponseMessage {
    declare private readonly $goType: void;
    public constructor(public JSONRPC: JSONRPCVersion, public ID: {
        value: ID;
    } | undefined, public Result: GoInterface | undefined, public Error: {
        value: ResponseError;
    } | undefined) {
    }
    static $copy($source: ResponseMessage): ResponseMessage {
        return new ResponseMessage(JSONRPCVersion.$copy($source.JSONRPC), $source.ID, $source.Result, $source.Error);
    }
    static $equal($left: ResponseMessage, $right: ResponseMessage): bool {
        return JSONRPCVersion.$equal($left.JSONRPC, $right.JSONRPC) &&
            $left.ID
                ===
                    $right.ID && goInterfaceEqual($left.Result, $right.Result) &&
            $left.Error
                ===
                    $right.Error;
    }
    static $hash($source: ResponseMessage): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, JSONRPCVersion.$hash($source.JSONRPC));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.ID));
        $hash = GoMapHash.mix($hash, $source.Result === undefined ? 0 : $source.Result.$go$hash());
        $hash = GoMapHash.mix($hash, (($pointer3: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer3 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer3)))($source.Error));
        return $hash;
    }
    declare private readonly then?: never;
}
