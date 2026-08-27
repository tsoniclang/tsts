import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { LanguageService as LanguageService__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/languageservice.js";
import type { RequestInfo as RequestInfo__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { CodeActionParams as CodeActionParams__from_lsproto, CommandOrCodeActionArrayOrNull$Storage as CommandOrCodeActionArrayOrNull__from_lsproto$Storage, CompletionItemsOrListOrNull$Storage as CompletionItemsOrListOrNull__from_lsproto$Storage, CompletionParams as CompletionParams__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Server as Server__from_lsp, handlerMap as handlerMap__from_lsp } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import { CommandOrCodeActionArrayOrNull as CommandOrCodeActionArrayOrNull__from_lsproto, CompletionItemsOrListOrNull as CompletionItemsOrListOrNull__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { registerLanguageServiceWithAutoImportsRequestHandler$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import { $goInterfaceAdapter$Named_lsproto$CommandOrCodeActionArrayOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$CodeActionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CompletionParams, $goInterfaceAdapter$Named_lsproto$CompletionItemsOrListOrNull as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CodeActionParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CompletionParams_to_Named_lsproto$DocumentUri } from "../../../../../../capabilities/constraint_method.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function registerLanguageServiceWithAutoImportsRequestHandler$PointerTo_Named_lsproto$CodeActionParams$Named_lsproto$CommandOrCodeActionArrayOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined, CommandOrCodeActionArrayOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined) => [
    CommandOrCodeActionArrayOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceWithAutoImportsRequestHandler$kernel<tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined, CommandOrCodeActionArrayOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CodeActionParams_to_Named_lsproto$DocumentUri, ($argument0: CommandOrCodeActionArrayOrNull__from_lsproto): CommandOrCodeActionArrayOrNull__from_lsproto => {
        return CommandOrCodeActionArrayOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: CommandOrCodeActionArrayOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$CommandOrCodeActionArrayOrNull(CommandOrCodeActionArrayOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$CodeActionParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceWithAutoImportsRequestHandler$PointerTo_Named_lsproto$CompletionParams$Named_lsproto$CompletionItemsOrListOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto> | undefined, CompletionItemsOrListOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto> | undefined) => [
    CompletionItemsOrListOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceWithAutoImportsRequestHandler$kernel<tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto> | undefined, CompletionItemsOrListOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CompletionParams_to_Named_lsproto$DocumentUri, ($argument0: CompletionItemsOrListOrNull__from_lsproto): CompletionItemsOrListOrNull__from_lsproto => {
        return CompletionItemsOrListOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: CompletionItemsOrListOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter(CompletionItemsOrListOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$CompletionParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
