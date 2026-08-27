import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { RequestMessage as RequestMessage__from_lsproto } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/jsonrpc.js";
import type { NotificationInfo as NotificationInfo__from_lsproto } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { LogMessageParams as LogMessageParams__from_lsproto } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../../interface-contracts.js";
import { $goInterfaceAdapter$PointerTo_Named_lsproto$LogMessageParams as GoInterfaceAdapter } from "../../../../../../../../interface-adapters.js";
export function NotificationInfo$NewNotificationMessage$PointerTo_Named_lsproto$LogMessageParams($argument0: NotificationInfo__from_lsproto<tsonicTypeScriptRuntime.Location<LogMessageParams__from_lsproto> | undefined>, $argument1: tsonicTypeScriptRuntime.Location<LogMessageParams__from_lsproto> | undefined): {
    value: RequestMessage__from_lsproto;
} | undefined {
    return $argument0.NewNotificationMessage$kernel(($argument0: tsonicTypeScriptRuntime.Location<LogMessageParams__from_lsproto> | undefined): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument1);
}
