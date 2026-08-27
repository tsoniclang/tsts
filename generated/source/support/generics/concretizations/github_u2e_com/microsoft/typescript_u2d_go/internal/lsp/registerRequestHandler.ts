import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { RequestMessage as RequestMessage__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/jsonrpc.js";
import type { NoParams$Storage as NoParams__from_lsproto$Storage, Null$Storage as Null__from_lsproto$Storage, RequestInfo as RequestInfo__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { CallHierarchyIncomingCallsOrNull$Storage as CallHierarchyIncomingCallsOrNull__from_lsproto$Storage, CallHierarchyIncomingCallsParams as CallHierarchyIncomingCallsParams__from_lsproto, CallHierarchyOutgoingCallsOrNull$Storage as CallHierarchyOutgoingCallsOrNull__from_lsproto$Storage, CallHierarchyOutgoingCallsParams as CallHierarchyOutgoingCallsParams__from_lsproto, CodeLens as CodeLens__from_lsproto, CompletionItem as CompletionItem__from_lsproto, InitializeAPISessionParams as InitializeAPISessionParams__from_lsproto, InitializeAPISessionResult as InitializeAPISessionResult__from_lsproto, InitializeParams as InitializeParams__from_lsproto, InitializeResult as InitializeResult__from_lsproto, ProfileParams as ProfileParams__from_lsproto, ProfileResult as ProfileResult__from_lsproto, ProjectInfoParams as ProjectInfoParams__from_lsproto, ProjectInfoResult as ProjectInfoResult__from_lsproto, RenameFilesParams as RenameFilesParams__from_lsproto, RenameParams as RenameParams__from_lsproto, SymbolInformationsOrWorkspaceSymbolsOrNull$Storage as SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto$Storage, WorkspaceEditOrNull$Storage as WorkspaceEditOrNull__from_lsproto$Storage, WorkspaceSymbolParams as WorkspaceSymbolParams__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Server as Server__from_lsp, handlerMap as handlerMap__from_lsp } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import { NoParams as NoParams__from_lsproto, Null as Null__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import { CallHierarchyIncomingCallsOrNull as CallHierarchyIncomingCallsOrNull__from_lsproto, CallHierarchyOutgoingCallsOrNull as CallHierarchyOutgoingCallsOrNull__from_lsproto, SymbolInformationsOrWorkspaceSymbolsOrNull as SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto, WorkspaceEditOrNull as WorkspaceEditOrNull__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { registerRequestHandler$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import { $goInterfaceAdapter$Named_lsproto$CallHierarchyIncomingCallsOrNull, $goInterfaceAdapter$Named_lsproto$CallHierarchyOutgoingCallsOrNull, $goInterfaceAdapter$Named_lsproto$NoParams, $goInterfaceAdapter$Named_lsproto$Null, $goInterfaceAdapter$Named_lsproto$SymbolInformationsOrWorkspaceSymbolsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyIncomingCallsParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyOutgoingCallsParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CodeLens, $goInterfaceAdapter$PointerTo_Named_lsproto$CompletionItem, $goInterfaceAdapter$PointerTo_Named_lsproto$InitializeAPISessionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$InitializeAPISessionResult, $goInterfaceAdapter$PointerTo_Named_lsproto$InitializeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$InitializeResult, $goInterfaceAdapter$PointerTo_Named_lsproto$ProfileParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ProfileResult, $goInterfaceAdapter$PointerTo_Named_lsproto$ProjectInfoParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ProjectInfoResult, $goInterfaceAdapter$PointerTo_Named_lsproto$RenameFilesParams, $goInterfaceAdapter$PointerTo_Named_lsproto$RenameParams, $goInterfaceAdapter$PointerTo_Named_lsproto$WorkspaceSymbolParams, $goInterfaceAdapter$Named_lsproto$WorkspaceEditOrNull as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function registerRequestHandler$Named_lsproto$NoParams$Named_lsproto$Null($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<NoParams__from_lsproto, Null__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: NoParams__from_lsproto, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    Null__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<NoParams__from_lsproto, Null__from_lsproto>(($argument0: NoParams__from_lsproto): NoParams__from_lsproto => {
        return NoParams__from_lsproto.$copy($argument0);
    }, ($argument0: Null__from_lsproto): Null__from_lsproto => {
        return Null__from_lsproto.$copy($argument0);
    }, ($argument0: Null__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$Null(Null__from_lsproto.$copy($argument0));
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
export function registerRequestHandler$Named_lsproto$NoParams$PointerTo_Named_lsproto$ProfileResult($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<NoParams__from_lsproto, {
    value: ProfileResult__from_lsproto;
} | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: NoParams__from_lsproto, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    {
        value: ProfileResult__from_lsproto;
    } | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<NoParams__from_lsproto, {
        value: ProfileResult__from_lsproto;
    } | undefined>(($argument0: NoParams__from_lsproto): NoParams__from_lsproto => {
        return NoParams__from_lsproto.$copy($argument0);
    }, ($argument0: {
        value: ProfileResult__from_lsproto;
    } | undefined): {
        value: ProfileResult__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: ProfileResult__from_lsproto;
    } | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ProfileResult($argument0);
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
export function registerRequestHandler$PointerTo_Named_lsproto$CallHierarchyIncomingCallsParams$Named_lsproto$CallHierarchyIncomingCallsOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined, CallHierarchyIncomingCallsOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    CallHierarchyIncomingCallsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined, CallHierarchyIncomingCallsOrNull__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: CallHierarchyIncomingCallsOrNull__from_lsproto): CallHierarchyIncomingCallsOrNull__from_lsproto => {
        return CallHierarchyIncomingCallsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: CallHierarchyIncomingCallsOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$CallHierarchyIncomingCallsOrNull(CallHierarchyIncomingCallsOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyIncomingCallsParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerRequestHandler$PointerTo_Named_lsproto$CallHierarchyOutgoingCallsParams$Named_lsproto$CallHierarchyOutgoingCallsOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined, CallHierarchyOutgoingCallsOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    CallHierarchyOutgoingCallsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined, CallHierarchyOutgoingCallsOrNull__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: CallHierarchyOutgoingCallsOrNull__from_lsproto): CallHierarchyOutgoingCallsOrNull__from_lsproto => {
        return CallHierarchyOutgoingCallsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: CallHierarchyOutgoingCallsOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$CallHierarchyOutgoingCallsOrNull(CallHierarchyOutgoingCallsOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyOutgoingCallsParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerRequestHandler$PointerTo_Named_lsproto$CodeLens$PointerTo_Named_lsproto$CodeLens($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined, tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined, tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CodeLens($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$CodeLens.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerRequestHandler$PointerTo_Named_lsproto$CompletionItem$PointerTo_Named_lsproto$CompletionItem($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined, tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined, tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CompletionItem($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$CompletionItem.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerRequestHandler$PointerTo_Named_lsproto$InitializeAPISessionParams$PointerTo_Named_lsproto$InitializeAPISessionResult($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined, {
    value: InitializeAPISessionResult__from_lsproto;
} | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    {
        value: InitializeAPISessionResult__from_lsproto;
    } | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined, {
        value: InitializeAPISessionResult__from_lsproto;
    } | undefined>(($argument0: tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: InitializeAPISessionResult__from_lsproto;
    } | undefined): {
        value: InitializeAPISessionResult__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: InitializeAPISessionResult__from_lsproto;
    } | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$InitializeAPISessionResult($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$InitializeAPISessionParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerRequestHandler$PointerTo_Named_lsproto$InitializeParams$PointerTo_Named_lsproto$InitializeResult($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined, {
    value: InitializeResult__from_lsproto;
} | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    {
        value: InitializeResult__from_lsproto;
    } | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined, {
        value: InitializeResult__from_lsproto;
    } | undefined>(($argument0: tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: InitializeResult__from_lsproto;
    } | undefined): {
        value: InitializeResult__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: InitializeResult__from_lsproto;
    } | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$InitializeResult($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$InitializeParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerRequestHandler$PointerTo_Named_lsproto$ProfileParams$Named_lsproto$Null($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, Null__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    Null__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, Null__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: Null__from_lsproto): Null__from_lsproto => {
        return Null__from_lsproto.$copy($argument0);
    }, ($argument0: Null__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$Null(Null__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$ProfileParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerRequestHandler$PointerTo_Named_lsproto$ProfileParams$PointerTo_Named_lsproto$ProfileResult($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, {
    value: ProfileResult__from_lsproto;
} | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    {
        value: ProfileResult__from_lsproto;
    } | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, {
        value: ProfileResult__from_lsproto;
    } | undefined>(($argument0: tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: ProfileResult__from_lsproto;
    } | undefined): {
        value: ProfileResult__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: ProfileResult__from_lsproto;
    } | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ProfileResult($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$ProfileParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerRequestHandler$PointerTo_Named_lsproto$ProjectInfoParams$PointerTo_Named_lsproto$ProjectInfoResult($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined, {
    value: ProjectInfoResult__from_lsproto;
} | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    {
        value: ProjectInfoResult__from_lsproto;
    } | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined, {
        value: ProjectInfoResult__from_lsproto;
    } | undefined>(($argument0: tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: {
        value: ProjectInfoResult__from_lsproto;
    } | undefined): {
        value: ProjectInfoResult__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: ProjectInfoResult__from_lsproto;
    } | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ProjectInfoResult($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$ProjectInfoParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerRequestHandler$PointerTo_Named_lsproto$RenameFilesParams$Named_lsproto$WorkspaceEditOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined, WorkspaceEditOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    WorkspaceEditOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined, WorkspaceEditOrNull__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: WorkspaceEditOrNull__from_lsproto): WorkspaceEditOrNull__from_lsproto => {
        return WorkspaceEditOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: WorkspaceEditOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter(WorkspaceEditOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$RenameFilesParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerRequestHandler$PointerTo_Named_lsproto$RenameParams$Named_lsproto$WorkspaceEditOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined, WorkspaceEditOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    WorkspaceEditOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined, WorkspaceEditOrNull__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: WorkspaceEditOrNull__from_lsproto): WorkspaceEditOrNull__from_lsproto => {
        return WorkspaceEditOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: WorkspaceEditOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter(WorkspaceEditOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$RenameParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerRequestHandler$PointerTo_Named_lsproto$WorkspaceSymbolParams$Named_lsproto$SymbolInformationsOrWorkspaceSymbolsOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined, SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerRequestHandler$kernel<tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined, SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto): SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto => {
        return SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$SymbolInformationsOrWorkspaceSymbolsOrNull(SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$WorkspaceSymbolParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
