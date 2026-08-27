import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { LanguageService as LanguageService__from_ls } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/languageservice.js";
import type { RequestInfo as RequestInfo__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { CallHierarchyItemsOrNull$Storage as CallHierarchyItemsOrNull__from_lsproto$Storage, CallHierarchyPrepareParams as CallHierarchyPrepareParams__from_lsproto, CodeActionParams as CodeActionParams__from_lsproto, CodeLensParams as CodeLensParams__from_lsproto, CodeLensesOrNull$Storage as CodeLensesOrNull__from_lsproto$Storage, CommandOrCodeActionArrayOrNull$Storage as CommandOrCodeActionArrayOrNull__from_lsproto$Storage, DefinitionParams as DefinitionParams__from_lsproto, DocumentDiagnosticParams as DocumentDiagnosticParams__from_lsproto, DocumentFormattingParams as DocumentFormattingParams__from_lsproto, DocumentHighlightParams as DocumentHighlightParams__from_lsproto, DocumentHighlightsOrNull$Storage as DocumentHighlightsOrNull__from_lsproto$Storage, DocumentOnTypeFormattingParams as DocumentOnTypeFormattingParams__from_lsproto, DocumentRangeFormattingParams as DocumentRangeFormattingParams__from_lsproto, DocumentSymbolParams as DocumentSymbolParams__from_lsproto, FoldingRangeParams as FoldingRangeParams__from_lsproto, FoldingRangesOrNull$Storage as FoldingRangesOrNull__from_lsproto$Storage, HoverOrNull$Storage as HoverOrNull__from_lsproto$Storage, HoverParams as HoverParams__from_lsproto, InlayHintParams as InlayHintParams__from_lsproto, InlayHintsOrNull$Storage as InlayHintsOrNull__from_lsproto$Storage, LinkedEditingRangeParams as LinkedEditingRangeParams__from_lsproto, LinkedEditingRangesOrNull$Storage as LinkedEditingRangesOrNull__from_lsproto$Storage, LocationOrLocationsOrDefinitionLinksOrNull$Storage as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto$Storage, MultiDocumentHighlightParams as MultiDocumentHighlightParams__from_lsproto, MultiDocumentHighlightsOrNull$Storage as MultiDocumentHighlightsOrNull__from_lsproto$Storage, PrepareRenameParams as PrepareRenameParams__from_lsproto, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull$Storage as RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto$Storage, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport$Storage as RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto$Storage, SelectionRangeParams as SelectionRangeParams__from_lsproto, SelectionRangesOrNull$Storage as SelectionRangesOrNull__from_lsproto$Storage, SemanticTokensOrNull$Storage as SemanticTokensOrNull__from_lsproto$Storage, SemanticTokensParams as SemanticTokensParams__from_lsproto, SemanticTokensRangeParams as SemanticTokensRangeParams__from_lsproto, SignatureHelpOrNull$Storage as SignatureHelpOrNull__from_lsproto$Storage, SignatureHelpParams as SignatureHelpParams__from_lsproto, SymbolInformationsOrDocumentSymbolsOrNull$Storage as SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto$Storage, TextDocumentPositionParams as TextDocumentPositionParams__from_lsproto, TextEditsOrNull$Storage as TextEditsOrNull__from_lsproto$Storage, TypeDefinitionParams as TypeDefinitionParams__from_lsproto, VSOnAutoInsertParams as VSOnAutoInsertParams__from_lsproto, VSOnAutoInsertResponseItemOrNull$Storage as VSOnAutoInsertResponseItemOrNull__from_lsproto$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Server as Server__from_lsp, handlerMap as handlerMap__from_lsp } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import { CallHierarchyItemsOrNull as CallHierarchyItemsOrNull__from_lsproto, CodeLensesOrNull as CodeLensesOrNull__from_lsproto, CommandOrCodeActionArrayOrNull as CommandOrCodeActionArrayOrNull__from_lsproto, DocumentHighlightsOrNull as DocumentHighlightsOrNull__from_lsproto, FoldingRangesOrNull as FoldingRangesOrNull__from_lsproto, HoverOrNull as HoverOrNull__from_lsproto, InlayHintsOrNull as InlayHintsOrNull__from_lsproto, LinkedEditingRangesOrNull as LinkedEditingRangesOrNull__from_lsproto, LocationOrLocationsOrDefinitionLinksOrNull as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto, MultiDocumentHighlightsOrNull as MultiDocumentHighlightsOrNull__from_lsproto, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull as RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport as RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto, SelectionRangesOrNull as SelectionRangesOrNull__from_lsproto, SemanticTokensOrNull as SemanticTokensOrNull__from_lsproto, SignatureHelpOrNull as SignatureHelpOrNull__from_lsproto, SymbolInformationsOrDocumentSymbolsOrNull as SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto, TextEditsOrNull as TextEditsOrNull__from_lsproto, VSOnAutoInsertResponseItemOrNull as VSOnAutoInsertResponseItemOrNull__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { registerLanguageServiceDocumentRequestHandler$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import { $goInterfaceAdapter$Named_lsproto$CallHierarchyItemsOrNull, $goInterfaceAdapter$Named_lsproto$CodeLensesOrNull, $goInterfaceAdapter$Named_lsproto$CommandOrCodeActionArrayOrNull, $goInterfaceAdapter$Named_lsproto$DocumentHighlightsOrNull, $goInterfaceAdapter$Named_lsproto$FoldingRangesOrNull, $goInterfaceAdapter$Named_lsproto$HoverOrNull, $goInterfaceAdapter$Named_lsproto$InlayHintsOrNull, $goInterfaceAdapter$Named_lsproto$LinkedEditingRangesOrNull, $goInterfaceAdapter$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull, $goInterfaceAdapter$Named_lsproto$MultiDocumentHighlightsOrNull, $goInterfaceAdapter$Named_lsproto$RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull, $goInterfaceAdapter$Named_lsproto$RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport, $goInterfaceAdapter$Named_lsproto$SelectionRangesOrNull, $goInterfaceAdapter$Named_lsproto$SemanticTokensOrNull, $goInterfaceAdapter$Named_lsproto$SignatureHelpOrNull, $goInterfaceAdapter$Named_lsproto$SymbolInformationsOrDocumentSymbolsOrNull, $goInterfaceAdapter$Named_lsproto$TextEditsOrNull, $goInterfaceAdapter$Named_lsproto$VSOnAutoInsertResponseItemOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyPrepareParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CodeActionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CodeLensParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DefinitionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentDiagnosticParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentFormattingParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentHighlightParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentOnTypeFormattingParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentRangeFormattingParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentSymbolParams, $goInterfaceAdapter$PointerTo_Named_lsproto$FoldingRangeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$HoverParams, $goInterfaceAdapter$PointerTo_Named_lsproto$InlayHintParams, $goInterfaceAdapter$PointerTo_Named_lsproto$LinkedEditingRangeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$MultiDocumentHighlightParams, $goInterfaceAdapter$PointerTo_Named_lsproto$PrepareRenameParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SelectionRangeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensRangeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SignatureHelpParams, $goInterfaceAdapter$PointerTo_Named_lsproto$TextDocumentPositionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$TypeDefinitionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$VSOnAutoInsertParams, $goInterfaceAdapter$PointerTo_Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CallHierarchyPrepareParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CodeActionParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CodeLensParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DefinitionParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentDiagnosticParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentFormattingParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentHighlightParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentOnTypeFormattingParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentRangeFormattingParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentSymbolParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$FoldingRangeParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$HoverParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$InlayHintParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$LinkedEditingRangeParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$MultiDocumentHighlightParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$PrepareRenameParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$SelectionRangeParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$SemanticTokensParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$SemanticTokensRangeParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$SignatureHelpParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$TextDocumentPositionParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$TypeDefinitionParams_to_Named_lsproto$DocumentUri, $go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$VSOnAutoInsertParams_to_Named_lsproto$DocumentUri } from "../../../../../../capabilities/constraint_method.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$CallHierarchyPrepareParams$Named_lsproto$CallHierarchyItemsOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto> | undefined, CallHierarchyItemsOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto> | undefined) => [
    CallHierarchyItemsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto> | undefined, CallHierarchyItemsOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CallHierarchyPrepareParams_to_Named_lsproto$DocumentUri, ($argument0: CallHierarchyItemsOrNull__from_lsproto): CallHierarchyItemsOrNull__from_lsproto => {
        return CallHierarchyItemsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: CallHierarchyItemsOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$CallHierarchyItemsOrNull(CallHierarchyItemsOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyPrepareParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$CodeActionParams$Named_lsproto$CommandOrCodeActionArrayOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined, CommandOrCodeActionArrayOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined) => [
    CommandOrCodeActionArrayOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined, CommandOrCodeActionArrayOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CodeActionParams_to_Named_lsproto$DocumentUri, ($argument0: CommandOrCodeActionArrayOrNull__from_lsproto): CommandOrCodeActionArrayOrNull__from_lsproto => {
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
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$CodeLensParams$Named_lsproto$CodeLensesOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto> | undefined, CodeLensesOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto> | undefined) => [
    CodeLensesOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto> | undefined, CodeLensesOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$CodeLensParams_to_Named_lsproto$DocumentUri, ($argument0: CodeLensesOrNull__from_lsproto): CodeLensesOrNull__from_lsproto => {
        return CodeLensesOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: CodeLensesOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$CodeLensesOrNull(CodeLensesOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$CodeLensParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DefinitionParams$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto> | undefined, LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto> | undefined) => [
    LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto> | undefined, LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DefinitionParams_to_Named_lsproto$DocumentUri, ($argument0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto): LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto => {
        return LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull(LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$DefinitionParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentDiagnosticParams$Named_lsproto$RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto> | undefined, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto> | undefined) => [
    RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto> | undefined, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentDiagnosticParams_to_Named_lsproto$DocumentUri, ($argument0: RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto): RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto => {
        return RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto.$copy($argument0);
    }, ($argument0: RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport(RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$DocumentDiagnosticParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentFormattingParams$Named_lsproto$TextEditsOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto> | undefined, TextEditsOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto> | undefined) => [
    TextEditsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto> | undefined, TextEditsOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentFormattingParams_to_Named_lsproto$DocumentUri, ($argument0: TextEditsOrNull__from_lsproto): TextEditsOrNull__from_lsproto => {
        return TextEditsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: TextEditsOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$TextEditsOrNull(TextEditsOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$DocumentFormattingParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentHighlightParams$Named_lsproto$DocumentHighlightsOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto> | undefined, DocumentHighlightsOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto> | undefined) => [
    DocumentHighlightsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto> | undefined, DocumentHighlightsOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentHighlightParams_to_Named_lsproto$DocumentUri, ($argument0: DocumentHighlightsOrNull__from_lsproto): DocumentHighlightsOrNull__from_lsproto => {
        return DocumentHighlightsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: DocumentHighlightsOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$DocumentHighlightsOrNull(DocumentHighlightsOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$DocumentHighlightParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentOnTypeFormattingParams$Named_lsproto$TextEditsOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto> | undefined, TextEditsOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto> | undefined) => [
    TextEditsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto> | undefined, TextEditsOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentOnTypeFormattingParams_to_Named_lsproto$DocumentUri, ($argument0: TextEditsOrNull__from_lsproto): TextEditsOrNull__from_lsproto => {
        return TextEditsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: TextEditsOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$TextEditsOrNull(TextEditsOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$DocumentOnTypeFormattingParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentRangeFormattingParams$Named_lsproto$TextEditsOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto> | undefined, TextEditsOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto> | undefined) => [
    TextEditsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto> | undefined, TextEditsOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentRangeFormattingParams_to_Named_lsproto$DocumentUri, ($argument0: TextEditsOrNull__from_lsproto): TextEditsOrNull__from_lsproto => {
        return TextEditsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: TextEditsOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$TextEditsOrNull(TextEditsOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$DocumentRangeFormattingParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentSymbolParams$Named_lsproto$SymbolInformationsOrDocumentSymbolsOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto> | undefined, SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto> | undefined) => [
    SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto> | undefined, SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$DocumentSymbolParams_to_Named_lsproto$DocumentUri, ($argument0: SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto): SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto => {
        return SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$SymbolInformationsOrDocumentSymbolsOrNull(SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$DocumentSymbolParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$FoldingRangeParams$Named_lsproto$FoldingRangesOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto> | undefined, FoldingRangesOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto> | undefined) => [
    FoldingRangesOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto> | undefined, FoldingRangesOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$FoldingRangeParams_to_Named_lsproto$DocumentUri, ($argument0: FoldingRangesOrNull__from_lsproto): FoldingRangesOrNull__from_lsproto => {
        return FoldingRangesOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: FoldingRangesOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$FoldingRangesOrNull(FoldingRangesOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$FoldingRangeParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$HoverParams$Named_lsproto$HoverOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<HoverParams__from_lsproto> | undefined, HoverOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<HoverParams__from_lsproto> | undefined) => [
    HoverOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<HoverParams__from_lsproto> | undefined, HoverOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$HoverParams_to_Named_lsproto$DocumentUri, ($argument0: HoverOrNull__from_lsproto): HoverOrNull__from_lsproto => {
        return HoverOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: HoverOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$HoverOrNull(HoverOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<HoverParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<HoverParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$HoverParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<HoverParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$InlayHintParams$Named_lsproto$InlayHintsOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<InlayHintParams__from_lsproto> | undefined, InlayHintsOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<InlayHintParams__from_lsproto> | undefined) => [
    InlayHintsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<InlayHintParams__from_lsproto> | undefined, InlayHintsOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$InlayHintParams_to_Named_lsproto$DocumentUri, ($argument0: InlayHintsOrNull__from_lsproto): InlayHintsOrNull__from_lsproto => {
        return InlayHintsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: InlayHintsOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$InlayHintsOrNull(InlayHintsOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<InlayHintParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<InlayHintParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$InlayHintParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<InlayHintParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$LinkedEditingRangeParams$Named_lsproto$LinkedEditingRangesOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams__from_lsproto> | undefined, LinkedEditingRangesOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams__from_lsproto> | undefined) => [
    LinkedEditingRangesOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams__from_lsproto> | undefined, LinkedEditingRangesOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$LinkedEditingRangeParams_to_Named_lsproto$DocumentUri, ($argument0: LinkedEditingRangesOrNull__from_lsproto): LinkedEditingRangesOrNull__from_lsproto => {
        return LinkedEditingRangesOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: LinkedEditingRangesOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$LinkedEditingRangesOrNull(LinkedEditingRangesOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$LinkedEditingRangeParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$MultiDocumentHighlightParams$Named_lsproto$MultiDocumentHighlightsOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto> | undefined, MultiDocumentHighlightsOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto> | undefined) => [
    MultiDocumentHighlightsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto> | undefined, MultiDocumentHighlightsOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$MultiDocumentHighlightParams_to_Named_lsproto$DocumentUri, ($argument0: MultiDocumentHighlightsOrNull__from_lsproto): MultiDocumentHighlightsOrNull__from_lsproto => {
        return MultiDocumentHighlightsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: MultiDocumentHighlightsOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$MultiDocumentHighlightsOrNull(MultiDocumentHighlightsOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$MultiDocumentHighlightParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$PrepareRenameParams$Named_lsproto$RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto> | undefined, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto> | undefined) => [
    RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto> | undefined, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$PrepareRenameParams_to_Named_lsproto$DocumentUri, ($argument0: RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto): RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto => {
        return RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull(RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$PrepareRenameParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$SelectionRangeParams$Named_lsproto$SelectionRangesOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<SelectionRangeParams__from_lsproto> | undefined, SelectionRangesOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<SelectionRangeParams__from_lsproto> | undefined) => [
    SelectionRangesOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<SelectionRangeParams__from_lsproto> | undefined, SelectionRangesOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$SelectionRangeParams_to_Named_lsproto$DocumentUri, ($argument0: SelectionRangesOrNull__from_lsproto): SelectionRangesOrNull__from_lsproto => {
        return SelectionRangesOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: SelectionRangesOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$SelectionRangesOrNull(SelectionRangesOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SelectionRangeParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SelectionRangeParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$SelectionRangeParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<SelectionRangeParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$SemanticTokensParams$Named_lsproto$SemanticTokensOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto> | undefined, SemanticTokensOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto> | undefined) => [
    SemanticTokensOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto> | undefined, SemanticTokensOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$SemanticTokensParams_to_Named_lsproto$DocumentUri, ($argument0: SemanticTokensOrNull__from_lsproto): SemanticTokensOrNull__from_lsproto => {
        return SemanticTokensOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: SemanticTokensOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$SemanticTokensOrNull(SemanticTokensOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$SemanticTokensRangeParams$Named_lsproto$SemanticTokensOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto> | undefined, SemanticTokensOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto> | undefined) => [
    SemanticTokensOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto> | undefined, SemanticTokensOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$SemanticTokensRangeParams_to_Named_lsproto$DocumentUri, ($argument0: SemanticTokensOrNull__from_lsproto): SemanticTokensOrNull__from_lsproto => {
        return SemanticTokensOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: SemanticTokensOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$SemanticTokensOrNull(SemanticTokensOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensRangeParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$SignatureHelpParams$Named_lsproto$SignatureHelpOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto> | undefined, SignatureHelpOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto> | undefined) => [
    SignatureHelpOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto> | undefined, SignatureHelpOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$SignatureHelpParams_to_Named_lsproto$DocumentUri, ($argument0: SignatureHelpOrNull__from_lsproto): SignatureHelpOrNull__from_lsproto => {
        return SignatureHelpOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: SignatureHelpOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$SignatureHelpOrNull(SignatureHelpOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$SignatureHelpParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$TextDocumentPositionParams$PointerTo_Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto> | undefined, tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto> | undefined) => [
    tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto> | undefined, tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$TextDocumentPositionParams_to_Named_lsproto$DocumentUri, ($argument0: tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$TextDocumentPositionParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$TypeDefinitionParams$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto> | undefined, LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto> | undefined) => [
    LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto> | undefined, LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$TypeDefinitionParams_to_Named_lsproto$DocumentUri, ($argument0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto): LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto => {
        return LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull(LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$TypeDefinitionParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$VSOnAutoInsertParams$Named_lsproto$VSOnAutoInsertResponseItemOrNull($argument0: handlerMap__from_lsp, $argument1: RequestInfo__from_lsproto<tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams__from_lsproto> | undefined, VSOnAutoInsertResponseItemOrNull__from_lsproto>, $argument2: (($0: {
    value: Server__from_lsp;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams__from_lsproto> | undefined) => [
    VSOnAutoInsertResponseItemOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    return registerLanguageServiceDocumentRequestHandler$kernel<tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams__from_lsproto> | undefined, VSOnAutoInsertResponseItemOrNull__from_lsproto>($go$constraint_method$lsproto$TextDocumentURI$PointerTo_Named_lsproto$VSOnAutoInsertParams_to_Named_lsproto$DocumentUri, ($argument0: VSOnAutoInsertResponseItemOrNull__from_lsproto): VSOnAutoInsertResponseItemOrNull__from_lsproto => {
        return VSOnAutoInsertResponseItemOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: VSOnAutoInsertResponseItemOrNull__from_lsproto): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$Named_lsproto$VSOnAutoInsertResponseItemOrNull(VSOnAutoInsertResponseItemOrNull__from_lsproto.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams__from_lsproto> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams__from_lsproto> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_lsproto$VSOnAutoInsertParams.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams__from_lsproto> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
