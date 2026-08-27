import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NotificationInfo as NotificationInfo__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { ProgressParams as ProgressParams__from_lsproto, PublishDiagnosticsParams as PublishDiagnosticsParams__from_lsproto, RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull$Storage as RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Server as Server__from_lsp } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../interface-contracts.js";
import { RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull as RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { sendNotification$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import { $goInterfaceAdapter$Named_lsproto$RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$PublishDiagnosticsParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ProgressParams as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
export function sendNotification$Named_lsproto$RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull($argument0: {
    value: Server__from_lsp;
} | undefined, $argument1: NotificationInfo__from_lsproto<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto>, $argument2: RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto): GoInterface | undefined {
    return sendNotification$kernel<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto>(($argument0: RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto): RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto => {
        return RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull(RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto.$copy($argument0));
    }, $argument0, $argument1, $argument2);
}
export function sendNotification$PointerTo_Named_lsproto$ProgressParams($argument0: {
    value: Server__from_lsp;
} | undefined, $argument1: NotificationInfo__from_lsproto<tsonicTypeScriptRuntime.Location<ProgressParams__from_lsproto> | undefined>, $argument2: tsonicTypeScriptRuntime.Location<ProgressParams__from_lsproto> | undefined): GoInterface | undefined {
    return sendNotification$kernel<tsonicTypeScriptRuntime.Location<ProgressParams__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<ProgressParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<ProgressParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<ProgressParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument0, $argument1, $argument2);
}
export function sendNotification$PointerTo_Named_lsproto$PublishDiagnosticsParams($argument0: {
    value: Server__from_lsp;
} | undefined, $argument1: NotificationInfo__from_lsproto<tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams__from_lsproto> | undefined>, $argument2: tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams__from_lsproto> | undefined): GoInterface | undefined {
    return sendNotification$kernel<tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$PublishDiagnosticsParams($argument0);
    }, $argument0, $argument1, $argument2);
}
