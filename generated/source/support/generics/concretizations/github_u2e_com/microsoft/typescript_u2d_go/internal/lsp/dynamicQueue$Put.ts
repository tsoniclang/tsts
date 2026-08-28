import type { Message as Message__from_lsproto, RequestMessage as RequestMessage__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/jsonrpc.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import { dynamicQueue as dynamicQueue__from_lsp } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/dynamic_queue.js";
export function dynamicQueue$Put$PointerTo_Named_lsproto$Message($argument0: {
    value: dynamicQueue__from_lsp<{
        value: Message__from_lsproto;
    } | undefined>;
} | undefined, $argument1: GoInterface | undefined, $argument2: {
    value: Message__from_lsproto;
} | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return dynamicQueue__from_lsp.Put$kernel<{
        value: Message__from_lsproto;
    } | undefined>($argument0, ($argument0: {
        value: Message__from_lsproto;
    } | undefined): {
        value: Message__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Message__from_lsproto;
    } | undefined): {
        value: Message__from_lsproto;
    } | undefined => {
        return $argument0;
    }, (): {
        value: Message__from_lsproto;
    } | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function dynamicQueue$Put$PointerTo_Named_lsproto$RequestMessage($argument0: {
    value: dynamicQueue__from_lsp<{
        value: RequestMessage__from_lsproto;
    } | undefined>;
} | undefined, $argument1: GoInterface | undefined, $argument2: {
    value: RequestMessage__from_lsproto;
} | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return dynamicQueue__from_lsp.Put$kernel<{
        value: RequestMessage__from_lsproto;
    } | undefined>($argument0, ($argument0: {
        value: RequestMessage__from_lsproto;
    } | undefined): {
        value: RequestMessage__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: RequestMessage__from_lsproto;
    } | undefined): {
        value: RequestMessage__from_lsproto;
    } | undefined => {
        return $argument0;
    }, (): {
        value: RequestMessage__from_lsproto;
    } | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
