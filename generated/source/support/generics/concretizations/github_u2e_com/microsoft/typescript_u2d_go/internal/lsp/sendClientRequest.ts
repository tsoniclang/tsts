import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Null$Storage as Null__from_lsproto$Storage, RequestInfo as RequestInfo__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { ConfigurationParams as ConfigurationParams__from_lsproto, RegistrationParams as RegistrationParams__from_lsproto, UnregistrationParams as UnregistrationParams__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Server as Server__from_lsp } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { Null as Null__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import { sendClientRequest$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import { $goInterfaceAdapter$Named_lsproto$Null, $goInterfaceAdapter$PointerTo_Named_lsproto$ConfigurationParams, $goInterfaceAdapter$PointerTo_Named_lsproto$UnregistrationParams, $goInterfaceAdapter$SliceOf_Interface_void, $goInterfaceAdapter$PointerTo_Named_lsproto$RegistrationParams as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function sendClientRequest$PointerTo_Named_lsproto$ConfigurationParams$SliceOf_Interface_void($argument0: GoInterface | undefined, $argument1: {
    value: Server__from_lsp;
} | undefined, $argument2: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<ConfigurationParams__from_lsproto> | undefined, RuntimeSlice<$goInterface$Interface_void | undefined>>, $argument3: tsonicTypeScriptRuntime.Location<ConfigurationParams__from_lsproto> | undefined): [
    RuntimeSlice<$goInterface$Interface_void | undefined>,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return sendClientRequest$kernel<tsonicTypeScriptRuntime.Location<ConfigurationParams__from_lsproto> | undefined, RuntimeSlice<$goInterface$Interface_void | undefined>>(($argument0: RuntimeSlice<$goInterface$Interface_void | undefined>): RuntimeSlice<$goInterface$Interface_void | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<ConfigurationParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ConfigurationParams($argument0);
    }, ($argument0: GoInterfaceValue | undefined): [
        RuntimeSlice<$goInterface$Interface_void | undefined>,
        bool
    ] => {
        return (($value: GoInterfaceValue | undefined): [
            RuntimeSlice<$goInterface$Interface_void | undefined>,
            boolean
        ] => {
            if (!$goInterfaceAdapter$SliceOf_Interface_void.$is($value)) {
                return [RuntimeSlice.nil<$goInterface$Interface_void | undefined>(), false];
            }
            return [$value.$go$value, true];
        })($argument0);
    }, ($argument0: GoInterfaceValue | undefined): RuntimeSlice<$goInterface$Interface_void | undefined> => {
        return (($value: GoInterfaceValue | undefined): RuntimeSlice<$goInterface$Interface_void | undefined> => {
            if (!$goInterfaceAdapter$SliceOf_Interface_void.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): RuntimeSlice<$goInterface$Interface_void | undefined> => {
        return RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
    }, $argument0, $argument1, $argument2, $argument3);
}
export function sendClientRequest$PointerTo_Named_lsproto$RegistrationParams$Named_lsproto$Null($argument0: GoInterface | undefined, $argument1: {
    value: Server__from_lsp;
} | undefined, $argument2: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<RegistrationParams__from_lsproto> | undefined, Null__from_lsproto>, $argument3: tsonicTypeScriptRuntime.Location<RegistrationParams__from_lsproto> | undefined): [
    Null__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return sendClientRequest$kernel<tsonicTypeScriptRuntime.Location<RegistrationParams__from_lsproto> | undefined, Null__from_lsproto>(($argument0: Null__from_lsproto): Null__from_lsproto => {
        return Null__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<RegistrationParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: GoInterfaceValue | undefined): [
        Null__from_lsproto,
        bool
    ] => {
        return (($value: GoInterfaceValue | undefined): [
            Null__from_lsproto,
            boolean
        ] => {
            if (!$goInterfaceAdapter$Named_lsproto$Null.$is($value)) {
                return [Null__from_lsproto.$zero(), false];
            }
            return [Null__from_lsproto.$copy($value.$go$value), true];
        })($argument0);
    }, ($argument0: GoInterfaceValue | undefined): Null__from_lsproto => {
        return (($value: GoInterfaceValue | undefined): Null__from_lsproto => {
            if (!$goInterfaceAdapter$Named_lsproto$Null.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return Null__from_lsproto.$copy($value.$go$value);
        })($argument0);
    }, (): Null__from_lsproto => {
        return Null__from_lsproto.$zero();
    }, $argument0, $argument1, $argument2, $argument3);
}
export function sendClientRequest$PointerTo_Named_lsproto$UnregistrationParams$Named_lsproto$Null($argument0: GoInterface | undefined, $argument1: {
    value: Server__from_lsp;
} | undefined, $argument2: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<UnregistrationParams__from_lsproto> | undefined, Null__from_lsproto>, $argument3: tsonicTypeScriptRuntime.Location<UnregistrationParams__from_lsproto> | undefined): [
    Null__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return sendClientRequest$kernel<tsonicTypeScriptRuntime.Location<UnregistrationParams__from_lsproto> | undefined, Null__from_lsproto>(($argument0: Null__from_lsproto): Null__from_lsproto => {
        return Null__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<UnregistrationParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$UnregistrationParams($argument0);
    }, ($argument0: GoInterfaceValue | undefined): [
        Null__from_lsproto,
        bool
    ] => {
        return (($value: GoInterfaceValue | undefined): [
            Null__from_lsproto,
            boolean
        ] => {
            if (!$goInterfaceAdapter$Named_lsproto$Null.$is($value)) {
                return [Null__from_lsproto.$zero(), false];
            }
            return [Null__from_lsproto.$copy($value.$go$value), true];
        })($argument0);
    }, ($argument0: GoInterfaceValue | undefined): Null__from_lsproto => {
        return (($value: GoInterfaceValue | undefined): Null__from_lsproto => {
            if (!$goInterfaceAdapter$Named_lsproto$Null.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return Null__from_lsproto.$copy($value.$go$value);
        })($argument0);
    }, (): Null__from_lsproto => {
        return Null__from_lsproto.$zero();
    }, $argument0, $argument1, $argument2, $argument3);
}
