import type { Value as Value__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { $goInterfaceMethod$Call$Named_context$Context_string_Interface_void_to_Named_jsontext$Value_Named_error, $goInterfaceMethod$HandleNotification$Named_context$Context_string_Named_jsontext$Value_to_Named_error, $goInterfaceMethod$HandleRequest$Named_context$Context_string_Named_jsontext$Value_to_Interface_void_Named_error, $goInterfaceMethod$Notify$Named_context$Context_string_Interface_void_to_Named_error, $goInterfaceMethod$Run$Named_context$Context_to_Named_error } from "../../../../../../support/interface-methods.js";
export interface Handler extends GoInterfaceValue {
    HandleNotification($argument0: GoInterface | undefined, $argument1: gostring, $argument2: Value__from_jsontext): $goInterface$Interface_Method_Error_void_to_string | undefined;
    HandleRequest($argument0: GoInterface | undefined, $argument1: gostring, $argument2: Value__from_jsontext): [
        $goInterface$Interface_void | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const Handler$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$HandleNotification$Named_context$Context_string_Named_jsontext$Value_to_Named_error, $goInterfaceMethod$HandleRequest$Named_context$Context_string_Named_jsontext$Value_to_Interface_void_Named_error]);
export function Handler$is(value: GoInterfaceValue | undefined): value is Handler {
    return value !== undefined && value.$go$implements(Handler$contract);
}
export interface Conn extends GoInterfaceValue {
    Call($argument0: GoInterface | undefined, $argument1: gostring, $argument2: $goInterface$Interface_void | undefined): [
        Value__from_jsontext,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    Notify($argument0: GoInterface | undefined, $argument1: gostring, $argument2: $goInterface$Interface_void | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined;
    Run($argument0: GoInterface | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined;
}
export const Conn$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Call$Named_context$Context_string_Interface_void_to_Named_jsontext$Value_Named_error, $goInterfaceMethod$Notify$Named_context$Context_string_Interface_void_to_Named_error, $goInterfaceMethod$Run$Named_context$Context_to_Named_error]);
export function Conn$is(value: GoInterfaceValue | undefined): value is Conn {
    return value !== undefined && value.$go$implements(Conn$contract);
}
