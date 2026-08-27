import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NoParams$Storage as NoParams__from_lsproto$Storage, Null as Null__from_lsproto, Null$Storage as Null__from_lsproto$Storage, RequestInfo as RequestInfo__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { WorkDoneProgressCreateParams as WorkDoneProgressCreateParams__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Server as Server__from_lsp } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../interface-contracts.js";
import { NoParams as NoParams__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import { sendClientRequestFireAndForget$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import { $goInterfaceAdapter$Named_lsproto$NoParams, $goInterfaceAdapter$PointerTo_Named_lsproto$WorkDoneProgressCreateParams as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
export function sendClientRequestFireAndForget$Named_lsproto$NoParams$Named_lsproto$Null($argument0: {
    value: Server__from_lsp;
} | undefined, $argument1: RequestInfo__from_lsproto<NoParams__from_lsproto, Null__from_lsproto>, $argument2: NoParams__from_lsproto): GoInterface | undefined {
    return sendClientRequestFireAndForget$kernel<NoParams__from_lsproto, Null__from_lsproto>(($argument0: NoParams__from_lsproto): NoParams__from_lsproto => {
        return NoParams__from_lsproto.$copy($argument0);
    }, ($argument0: NoParams__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$NoParams(NoParams__from_lsproto.$copy($argument0));
    }, $argument0, $argument1, $argument2);
}
export function sendClientRequestFireAndForget$PointerTo_Named_lsproto$WorkDoneProgressCreateParams$Named_lsproto$Null($argument0: {
    value: Server__from_lsp;
} | undefined, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<WorkDoneProgressCreateParams__from_lsproto> | undefined, Null__from_lsproto>, $argument2: tsonicTypeScriptRuntime.Location<WorkDoneProgressCreateParams__from_lsproto> | undefined): GoInterface | undefined {
    return sendClientRequestFireAndForget$kernel<tsonicTypeScriptRuntime.Location<WorkDoneProgressCreateParams__from_lsproto> | undefined, Null__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<WorkDoneProgressCreateParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<WorkDoneProgressCreateParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<WorkDoneProgressCreateParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument0, $argument1, $argument2);
}
