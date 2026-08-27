import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ID as ID__from_jsonrpc, Message as Message__from_jsonrpc, ResponseError as ResponseError__from_jsonrpc } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { $goInterfaceMethod$ReadMessage$void_to_PointerTo_Named_jsonrpc$Message_Named_error, $goInterfaceMethod$WriteError$PointerTo_Named_jsonrpc$ID_PointerTo_Named_jsonrpc$ResponseError_to_Named_error, $goInterfaceMethod$WriteNotification$string_Interface_void_to_Named_error, $goInterfaceMethod$WriteRequest$PointerTo_Named_jsonrpc$ID_string_Interface_void_to_Named_error, $goInterfaceMethod$WriteResponse$PointerTo_Named_jsonrpc$ID_Interface_void_to_Named_error } from "../../../../../../support/interface-methods.js";
export interface Protocol extends GoInterfaceValue {
    ReadMessage(): [
        tsonicTypeScriptRuntime.Location<Message__from_jsonrpc> | undefined,
        GoInterface | undefined
    ];
    WriteError($argument0: {
        value: ID__from_jsonrpc;
    } | undefined, $argument1: {
        value: ResponseError__from_jsonrpc;
    } | undefined): GoInterface | undefined;
    WriteNotification($argument0: gostring, $argument1: $goInterface$Interface_void | undefined): GoInterface | undefined;
    WriteRequest($argument0: {
        value: ID__from_jsonrpc;
    } | undefined, $argument1: gostring, $argument2: $goInterface$Interface_void | undefined): GoInterface | undefined;
    WriteResponse($argument0: {
        value: ID__from_jsonrpc;
    } | undefined, $argument1: $goInterface$Interface_void | undefined): GoInterface | undefined;
}
export const Protocol$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$ReadMessage$void_to_PointerTo_Named_jsonrpc$Message_Named_error, $goInterfaceMethod$WriteError$PointerTo_Named_jsonrpc$ID_PointerTo_Named_jsonrpc$ResponseError_to_Named_error, $goInterfaceMethod$WriteNotification$string_Interface_void_to_Named_error, $goInterfaceMethod$WriteRequest$PointerTo_Named_jsonrpc$ID_string_Interface_void_to_Named_error, $goInterfaceMethod$WriteResponse$PointerTo_Named_jsonrpc$ID_Interface_void_to_Named_error]);
export function Protocol$is(value: GoInterfaceValue | undefined): value is Protocol {
    return value !== undefined && value.$go$implements(Protocol$contract);
}
