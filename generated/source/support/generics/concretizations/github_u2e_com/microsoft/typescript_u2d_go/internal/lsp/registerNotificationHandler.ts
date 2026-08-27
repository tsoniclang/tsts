import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NoParams$Storage as NoParams__from_lsproto$Storage, NotificationInfo as NotificationInfo__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { DidChangeConfigurationParams as DidChangeConfigurationParams__from_lsproto, DidChangeTextDocumentParams as DidChangeTextDocumentParams__from_lsproto, DidChangeWatchedFilesParams as DidChangeWatchedFilesParams__from_lsproto, DidCloseTextDocumentParams as DidCloseTextDocumentParams__from_lsproto, DidOpenTextDocumentParams as DidOpenTextDocumentParams__from_lsproto, DidSaveTextDocumentParams as DidSaveTextDocumentParams__from_lsproto, InitializedParams as InitializedParams__from_lsproto, SetLogVerbosityParams as SetLogVerbosityParams__from_lsproto, SetTraceParams as SetTraceParams__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Server as Server__from_lsp, handlerMap as handlerMap__from_lsp } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import { NoParams as NoParams__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import { registerNotificationHandler$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import { $goInterfaceAdapter$Named_lsproto$NoParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeConfigurationParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeTextDocumentParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeWatchedFilesParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DidOpenTextDocumentParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DidSaveTextDocumentParams, $goInterfaceAdapter$PointerTo_Named_lsproto$InitializedParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SetLogVerbosityParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SetTraceParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DidCloseTextDocumentParams as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function registerNotificationHandler$Named_lsproto$NoParams($argument0: handlerMap__from_lsp, $argument1: NotificationInfo__from_lsproto<NoParams__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: NoParams__from_lsproto) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): void {
    return registerNotificationHandler$kernel<NoParams__from_lsproto>(($argument0: NoParams__from_lsproto): NoParams__from_lsproto => {
        return NoParams__from_lsproto.$copy($argument0);
    }, ($argument0: GoInterfaceValue | undefined): NoParams__from_lsproto => {
        return (($value: GoInterfaceValue | undefined): NoParams__from_lsproto => {
            if (!$goInterfaceAdapter$Named_lsproto$NoParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return NoParams__from_lsproto.$copy($value.$go$value);
        })($argument0);
    }, (): NoParams__from_lsproto => {
        return NoParams__from_lsproto.$zero();
    }, $argument0, $argument1, $argument2);
}
export function registerNotificationHandler$PointerTo_Named_lsproto$DidChangeConfigurationParams($argument0: handlerMap__from_lsp, $argument1: NotificationInfo__from_lsproto<tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): void {
    return registerNotificationHandler$kernel<tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeConfigurationParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerNotificationHandler$PointerTo_Named_lsproto$DidChangeTextDocumentParams($argument0: handlerMap__from_lsp, $argument1: NotificationInfo__from_lsproto<tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): void {
    return registerNotificationHandler$kernel<tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeTextDocumentParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerNotificationHandler$PointerTo_Named_lsproto$DidChangeWatchedFilesParams($argument0: handlerMap__from_lsp, $argument1: NotificationInfo__from_lsproto<tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): void {
    return registerNotificationHandler$kernel<tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeWatchedFilesParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerNotificationHandler$PointerTo_Named_lsproto$DidCloseTextDocumentParams($argument0: handlerMap__from_lsp, $argument1: NotificationInfo__from_lsproto<tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): void {
    return registerNotificationHandler$kernel<tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerNotificationHandler$PointerTo_Named_lsproto$DidOpenTextDocumentParams($argument0: handlerMap__from_lsp, $argument1: NotificationInfo__from_lsproto<tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): void {
    return registerNotificationHandler$kernel<tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$DidOpenTextDocumentParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerNotificationHandler$PointerTo_Named_lsproto$DidSaveTextDocumentParams($argument0: handlerMap__from_lsp, $argument1: NotificationInfo__from_lsproto<tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): void {
    return registerNotificationHandler$kernel<tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$DidSaveTextDocumentParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerNotificationHandler$PointerTo_Named_lsproto$InitializedParams($argument0: handlerMap__from_lsp, $argument1: NotificationInfo__from_lsproto<tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): void {
    return registerNotificationHandler$kernel<tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$InitializedParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerNotificationHandler$PointerTo_Named_lsproto$SetLogVerbosityParams($argument0: handlerMap__from_lsp, $argument1: NotificationInfo__from_lsproto<tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): void {
    return registerNotificationHandler$kernel<tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$SetLogVerbosityParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerNotificationHandler$PointerTo_Named_lsproto$SetTraceParams($argument0: handlerMap__from_lsp, $argument1: NotificationInfo__from_lsproto<tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): void {
    return registerNotificationHandler$kernel<tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$SetTraceParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
