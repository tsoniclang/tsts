import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ApplyWorkspaceEditResult as ApplyWorkspaceEditResult__from_lsproto, CodeAction as CodeAction__from_lsproto, CodeLens as CodeLens__from_lsproto, ColorInformation as ColorInformation__from_lsproto, ColorPresentation as ColorPresentation__from_lsproto, CompletionItem as CompletionItem__from_lsproto, DocumentLink as DocumentLink__from_lsproto, InitializeAPISessionResult as InitializeAPISessionResult__from_lsproto, InitializeResult as InitializeResult__from_lsproto, InlayHint as InlayHint__from_lsproto, ProfileResult as ProfileResult__from_lsproto, ProjectInfoResult as ProjectInfoResult__from_lsproto, ShowDocumentResult as ShowDocumentResult__from_lsproto, TextDocumentContentResult as TextDocumentContentResult__from_lsproto, WorkspaceDiagnosticReport as WorkspaceDiagnosticReport__from_lsproto, WorkspaceSymbol as WorkspaceSymbol__from_lsproto } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../../interface-contracts.js";
import type { uint8 } from "@gotots/runtime/scalars.js";
import { Null as Null__from_lsproto, unmarshalValue$kernel } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import { CallHierarchyIncomingCallsOrNull as CallHierarchyIncomingCallsOrNull__from_lsproto, CallHierarchyItemsOrNull as CallHierarchyItemsOrNull__from_lsproto, CallHierarchyOutgoingCallsOrNull as CallHierarchyOutgoingCallsOrNull__from_lsproto, CodeLensesOrNull as CodeLensesOrNull__from_lsproto, CommandOrCodeActionArrayOrNull as CommandOrCodeActionArrayOrNull__from_lsproto, CompletionItemsOrListOrNull as CompletionItemsOrListOrNull__from_lsproto, DocumentHighlightsOrNull as DocumentHighlightsOrNull__from_lsproto, DocumentLinksOrNull as DocumentLinksOrNull__from_lsproto, FoldingRangesOrNull as FoldingRangesOrNull__from_lsproto, HoverOrNull as HoverOrNull__from_lsproto, InlayHintsOrNull as InlayHintsOrNull__from_lsproto, InlineCompletionListOrItemsOrNull as InlineCompletionListOrItemsOrNull__from_lsproto, InlineValuesOrNull as InlineValuesOrNull__from_lsproto, LSPAnyOrNull as LSPAnyOrNull__from_lsproto, LinkedEditingRangesOrNull as LinkedEditingRangesOrNull__from_lsproto, LocationOrLocationsOrDeclarationLinksOrNull as LocationOrLocationsOrDeclarationLinksOrNull__from_lsproto, LocationOrLocationsOrDefinitionLinksOrNull as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto, LocationsOrNull as LocationsOrNull__from_lsproto, MessageActionItemOrNull as MessageActionItemOrNull__from_lsproto, MonikersOrNull as MonikersOrNull__from_lsproto, MultiDocumentHighlightsOrNull as MultiDocumentHighlightsOrNull__from_lsproto, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull as RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport as RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto, SelectionRangesOrNull as SelectionRangesOrNull__from_lsproto, SemanticTokensOrNull as SemanticTokensOrNull__from_lsproto, SemanticTokensOrSemanticTokensDeltaOrNull as SemanticTokensOrSemanticTokensDeltaOrNull__from_lsproto, SignatureHelpOrNull as SignatureHelpOrNull__from_lsproto, SymbolInformationsOrDocumentSymbolsOrNull as SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto, SymbolInformationsOrWorkspaceSymbolsOrNull as SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto, TextEditsOrNull as TextEditsOrNull__from_lsproto, TypeHierarchyItemsOrNull as TypeHierarchyItemsOrNull__from_lsproto, VSOnAutoInsertResponseItemOrNull as VSOnAutoInsertResponseItemOrNull__from_lsproto, VSReferenceItemsOrNull as VSReferenceItemsOrNull__from_lsproto, WorkspaceEditOrNull as WorkspaceEditOrNull__from_lsproto, WorkspaceFoldersOrNull as WorkspaceFoldersOrNull__from_lsproto } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyIncomingCallsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyItemsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyOutgoingCallsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$CodeLensesOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$CommandOrCodeActionArrayOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$CompletionItemsOrListOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentHighlightsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentLinksOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$FoldingRangesOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$HoverOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$InlayHintsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$InlineCompletionListOrItemsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$InlineValuesOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$LSPAnyOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$LinkedEditingRangesOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$LocationOrLocationsOrDeclarationLinksOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$LocationsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$MessageActionItemOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$MonikersOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$MultiDocumentHighlightsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$Null, $goInterfaceAdapter$PointerTo_Named_lsproto$RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport, $goInterfaceAdapter$PointerTo_Named_lsproto$SelectionRangesOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensOrSemanticTokensDeltaOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$SignatureHelpOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$SymbolInformationsOrDocumentSymbolsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$TextEditsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$TypeHierarchyItemsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$VSOnAutoInsertResponseItemOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$VSReferenceItemsOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$WorkspaceEditOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$WorkspaceFoldersOrNull, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$ApplyWorkspaceEditResult, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$CodeAction, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$CodeLens, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$CompletionItem, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$DocumentLink, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$InitializeAPISessionResult, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$InitializeResult, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$InlayHint, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$ProfileResult, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$ProjectInfoResult, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$ShowDocumentResult, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$TextDocumentContentResult, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$WorkspaceDiagnosticReport, $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$WorkspaceSymbol, $goInterfaceAdapter$PointerTo_SliceOf_Interface_void, $goInterfaceAdapter$PointerTo_SliceOf_PointerTo_Named_lsproto$ColorInformation, $goInterfaceAdapter$PointerTo_SliceOf_PointerTo_Named_lsproto$ColorPresentation, $goInterfaceAdapter$PointerTo_Named_lsproto$SymbolInformationsOrWorkspaceSymbolsOrNull as GoInterfaceAdapter } from "../../../../../../../../interface-adapters.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function unmarshalValue$Named_lsproto$CallHierarchyIncomingCallsOrNull($argument0: RuntimeSlice<uint8>): [
    CallHierarchyIncomingCallsOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<CallHierarchyIncomingCallsOrNull__from_lsproto>(($argument0: CallHierarchyIncomingCallsOrNull__from_lsproto): CallHierarchyIncomingCallsOrNull__from_lsproto => {
        return CallHierarchyIncomingCallsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyIncomingCallsOrNull($argument0);
    }, (): CallHierarchyIncomingCallsOrNull__from_lsproto => {
        return CallHierarchyIncomingCallsOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$CallHierarchyItemsOrNull($argument0: RuntimeSlice<uint8>): [
    CallHierarchyItemsOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<CallHierarchyItemsOrNull__from_lsproto>(($argument0: CallHierarchyItemsOrNull__from_lsproto): CallHierarchyItemsOrNull__from_lsproto => {
        return CallHierarchyItemsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<CallHierarchyItemsOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyItemsOrNull($argument0);
    }, (): CallHierarchyItemsOrNull__from_lsproto => {
        return CallHierarchyItemsOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$CallHierarchyOutgoingCallsOrNull($argument0: RuntimeSlice<uint8>): [
    CallHierarchyOutgoingCallsOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<CallHierarchyOutgoingCallsOrNull__from_lsproto>(($argument0: CallHierarchyOutgoingCallsOrNull__from_lsproto): CallHierarchyOutgoingCallsOrNull__from_lsproto => {
        return CallHierarchyOutgoingCallsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyOutgoingCallsOrNull($argument0);
    }, (): CallHierarchyOutgoingCallsOrNull__from_lsproto => {
        return CallHierarchyOutgoingCallsOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$CodeLensesOrNull($argument0: RuntimeSlice<uint8>): [
    CodeLensesOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<CodeLensesOrNull__from_lsproto>(($argument0: CodeLensesOrNull__from_lsproto): CodeLensesOrNull__from_lsproto => {
        return CodeLensesOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<CodeLensesOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CodeLensesOrNull($argument0);
    }, (): CodeLensesOrNull__from_lsproto => {
        return CodeLensesOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$CommandOrCodeActionArrayOrNull($argument0: RuntimeSlice<uint8>): [
    CommandOrCodeActionArrayOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<CommandOrCodeActionArrayOrNull__from_lsproto>(($argument0: CommandOrCodeActionArrayOrNull__from_lsproto): CommandOrCodeActionArrayOrNull__from_lsproto => {
        return CommandOrCodeActionArrayOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<CommandOrCodeActionArrayOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CommandOrCodeActionArrayOrNull($argument0);
    }, (): CommandOrCodeActionArrayOrNull__from_lsproto => {
        return CommandOrCodeActionArrayOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$CompletionItemsOrListOrNull($argument0: RuntimeSlice<uint8>): [
    CompletionItemsOrListOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<CompletionItemsOrListOrNull__from_lsproto>(($argument0: CompletionItemsOrListOrNull__from_lsproto): CompletionItemsOrListOrNull__from_lsproto => {
        return CompletionItemsOrListOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<CompletionItemsOrListOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CompletionItemsOrListOrNull($argument0);
    }, (): CompletionItemsOrListOrNull__from_lsproto => {
        return CompletionItemsOrListOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$DocumentHighlightsOrNull($argument0: RuntimeSlice<uint8>): [
    DocumentHighlightsOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<DocumentHighlightsOrNull__from_lsproto>(($argument0: DocumentHighlightsOrNull__from_lsproto): DocumentHighlightsOrNull__from_lsproto => {
        return DocumentHighlightsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<DocumentHighlightsOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentHighlightsOrNull($argument0);
    }, (): DocumentHighlightsOrNull__from_lsproto => {
        return DocumentHighlightsOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$DocumentLinksOrNull($argument0: RuntimeSlice<uint8>): [
    DocumentLinksOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<DocumentLinksOrNull__from_lsproto>(($argument0: DocumentLinksOrNull__from_lsproto): DocumentLinksOrNull__from_lsproto => {
        return DocumentLinksOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<DocumentLinksOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentLinksOrNull($argument0);
    }, (): DocumentLinksOrNull__from_lsproto => {
        return DocumentLinksOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$FoldingRangesOrNull($argument0: RuntimeSlice<uint8>): [
    FoldingRangesOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<FoldingRangesOrNull__from_lsproto>(($argument0: FoldingRangesOrNull__from_lsproto): FoldingRangesOrNull__from_lsproto => {
        return FoldingRangesOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<FoldingRangesOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$FoldingRangesOrNull($argument0);
    }, (): FoldingRangesOrNull__from_lsproto => {
        return FoldingRangesOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$HoverOrNull($argument0: RuntimeSlice<uint8>): [
    HoverOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<HoverOrNull__from_lsproto>(($argument0: HoverOrNull__from_lsproto): HoverOrNull__from_lsproto => {
        return HoverOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<HoverOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$HoverOrNull($argument0);
    }, (): HoverOrNull__from_lsproto => {
        return HoverOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$InlayHintsOrNull($argument0: RuntimeSlice<uint8>): [
    InlayHintsOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<InlayHintsOrNull__from_lsproto>(($argument0: InlayHintsOrNull__from_lsproto): InlayHintsOrNull__from_lsproto => {
        return InlayHintsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<InlayHintsOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$InlayHintsOrNull($argument0);
    }, (): InlayHintsOrNull__from_lsproto => {
        return InlayHintsOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$InlineCompletionListOrItemsOrNull($argument0: RuntimeSlice<uint8>): [
    InlineCompletionListOrItemsOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<InlineCompletionListOrItemsOrNull__from_lsproto>(($argument0: InlineCompletionListOrItemsOrNull__from_lsproto): InlineCompletionListOrItemsOrNull__from_lsproto => {
        return InlineCompletionListOrItemsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<InlineCompletionListOrItemsOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$InlineCompletionListOrItemsOrNull($argument0);
    }, (): InlineCompletionListOrItemsOrNull__from_lsproto => {
        return InlineCompletionListOrItemsOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$InlineValuesOrNull($argument0: RuntimeSlice<uint8>): [
    InlineValuesOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<InlineValuesOrNull__from_lsproto>(($argument0: InlineValuesOrNull__from_lsproto): InlineValuesOrNull__from_lsproto => {
        return InlineValuesOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<InlineValuesOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$InlineValuesOrNull($argument0);
    }, (): InlineValuesOrNull__from_lsproto => {
        return InlineValuesOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$LSPAnyOrNull($argument0: RuntimeSlice<uint8>): [
    LSPAnyOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<LSPAnyOrNull__from_lsproto>(($argument0: LSPAnyOrNull__from_lsproto): LSPAnyOrNull__from_lsproto => {
        return LSPAnyOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<LSPAnyOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$LSPAnyOrNull($argument0);
    }, (): LSPAnyOrNull__from_lsproto => {
        return LSPAnyOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$LinkedEditingRangesOrNull($argument0: RuntimeSlice<uint8>): [
    LinkedEditingRangesOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<LinkedEditingRangesOrNull__from_lsproto>(($argument0: LinkedEditingRangesOrNull__from_lsproto): LinkedEditingRangesOrNull__from_lsproto => {
        return LinkedEditingRangesOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<LinkedEditingRangesOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$LinkedEditingRangesOrNull($argument0);
    }, (): LinkedEditingRangesOrNull__from_lsproto => {
        return LinkedEditingRangesOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$LocationOrLocationsOrDeclarationLinksOrNull($argument0: RuntimeSlice<uint8>): [
    LocationOrLocationsOrDeclarationLinksOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<LocationOrLocationsOrDeclarationLinksOrNull__from_lsproto>(($argument0: LocationOrLocationsOrDeclarationLinksOrNull__from_lsproto): LocationOrLocationsOrDeclarationLinksOrNull__from_lsproto => {
        return LocationOrLocationsOrDeclarationLinksOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDeclarationLinksOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$LocationOrLocationsOrDeclarationLinksOrNull($argument0);
    }, (): LocationOrLocationsOrDeclarationLinksOrNull__from_lsproto => {
        return LocationOrLocationsOrDeclarationLinksOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull($argument0: RuntimeSlice<uint8>): [
    LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>(($argument0: LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto): LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto => {
        return LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull($argument0);
    }, (): LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto => {
        return LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$LocationsOrNull($argument0: RuntimeSlice<uint8>): [
    LocationsOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<LocationsOrNull__from_lsproto>(($argument0: LocationsOrNull__from_lsproto): LocationsOrNull__from_lsproto => {
        return LocationsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<LocationsOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$LocationsOrNull($argument0);
    }, (): LocationsOrNull__from_lsproto => {
        return LocationsOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$MessageActionItemOrNull($argument0: RuntimeSlice<uint8>): [
    MessageActionItemOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<MessageActionItemOrNull__from_lsproto>(($argument0: MessageActionItemOrNull__from_lsproto): MessageActionItemOrNull__from_lsproto => {
        return MessageActionItemOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<MessageActionItemOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$MessageActionItemOrNull($argument0);
    }, (): MessageActionItemOrNull__from_lsproto => {
        return MessageActionItemOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$MonikersOrNull($argument0: RuntimeSlice<uint8>): [
    MonikersOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<MonikersOrNull__from_lsproto>(($argument0: MonikersOrNull__from_lsproto): MonikersOrNull__from_lsproto => {
        return MonikersOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<MonikersOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$MonikersOrNull($argument0);
    }, (): MonikersOrNull__from_lsproto => {
        return MonikersOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$MultiDocumentHighlightsOrNull($argument0: RuntimeSlice<uint8>): [
    MultiDocumentHighlightsOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<MultiDocumentHighlightsOrNull__from_lsproto>(($argument0: MultiDocumentHighlightsOrNull__from_lsproto): MultiDocumentHighlightsOrNull__from_lsproto => {
        return MultiDocumentHighlightsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<MultiDocumentHighlightsOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$MultiDocumentHighlightsOrNull($argument0);
    }, (): MultiDocumentHighlightsOrNull__from_lsproto => {
        return MultiDocumentHighlightsOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$Null($argument0: RuntimeSlice<uint8>): [
    Null__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<Null__from_lsproto>(($argument0: Null__from_lsproto): Null__from_lsproto => {
        return Null__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Null__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$Null($argument0);
    }, (): Null__from_lsproto => {
        return Null__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull($argument0: RuntimeSlice<uint8>): [
    RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto>(($argument0: RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto): RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto => {
        return RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull($argument0);
    }, (): RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto => {
        return RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport($argument0: RuntimeSlice<uint8>): [
    RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto>(($argument0: RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto): RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto => {
        return RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport($argument0);
    }, (): RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto => {
        return RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$SelectionRangesOrNull($argument0: RuntimeSlice<uint8>): [
    SelectionRangesOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<SelectionRangesOrNull__from_lsproto>(($argument0: SelectionRangesOrNull__from_lsproto): SelectionRangesOrNull__from_lsproto => {
        return SelectionRangesOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SelectionRangesOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$SelectionRangesOrNull($argument0);
    }, (): SelectionRangesOrNull__from_lsproto => {
        return SelectionRangesOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$SemanticTokensOrNull($argument0: RuntimeSlice<uint8>): [
    SemanticTokensOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<SemanticTokensOrNull__from_lsproto>(($argument0: SemanticTokensOrNull__from_lsproto): SemanticTokensOrNull__from_lsproto => {
        return SemanticTokensOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SemanticTokensOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensOrNull($argument0);
    }, (): SemanticTokensOrNull__from_lsproto => {
        return SemanticTokensOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$SemanticTokensOrSemanticTokensDeltaOrNull($argument0: RuntimeSlice<uint8>): [
    SemanticTokensOrSemanticTokensDeltaOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<SemanticTokensOrSemanticTokensDeltaOrNull__from_lsproto>(($argument0: SemanticTokensOrSemanticTokensDeltaOrNull__from_lsproto): SemanticTokensOrSemanticTokensDeltaOrNull__from_lsproto => {
        return SemanticTokensOrSemanticTokensDeltaOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SemanticTokensOrSemanticTokensDeltaOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensOrSemanticTokensDeltaOrNull($argument0);
    }, (): SemanticTokensOrSemanticTokensDeltaOrNull__from_lsproto => {
        return SemanticTokensOrSemanticTokensDeltaOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$SignatureHelpOrNull($argument0: RuntimeSlice<uint8>): [
    SignatureHelpOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<SignatureHelpOrNull__from_lsproto>(($argument0: SignatureHelpOrNull__from_lsproto): SignatureHelpOrNull__from_lsproto => {
        return SignatureHelpOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SignatureHelpOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$SignatureHelpOrNull($argument0);
    }, (): SignatureHelpOrNull__from_lsproto => {
        return SignatureHelpOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$SymbolInformationsOrDocumentSymbolsOrNull($argument0: RuntimeSlice<uint8>): [
    SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto>(($argument0: SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto): SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto => {
        return SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$SymbolInformationsOrDocumentSymbolsOrNull($argument0);
    }, (): SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto => {
        return SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$SymbolInformationsOrWorkspaceSymbolsOrNull($argument0: RuntimeSlice<uint8>): [
    SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto>(($argument0: SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto): SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto => {
        return SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, (): SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto => {
        return SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$TextEditsOrNull($argument0: RuntimeSlice<uint8>): [
    TextEditsOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<TextEditsOrNull__from_lsproto>(($argument0: TextEditsOrNull__from_lsproto): TextEditsOrNull__from_lsproto => {
        return TextEditsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<TextEditsOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$TextEditsOrNull($argument0);
    }, (): TextEditsOrNull__from_lsproto => {
        return TextEditsOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$TypeHierarchyItemsOrNull($argument0: RuntimeSlice<uint8>): [
    TypeHierarchyItemsOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<TypeHierarchyItemsOrNull__from_lsproto>(($argument0: TypeHierarchyItemsOrNull__from_lsproto): TypeHierarchyItemsOrNull__from_lsproto => {
        return TypeHierarchyItemsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<TypeHierarchyItemsOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$TypeHierarchyItemsOrNull($argument0);
    }, (): TypeHierarchyItemsOrNull__from_lsproto => {
        return TypeHierarchyItemsOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$VSOnAutoInsertResponseItemOrNull($argument0: RuntimeSlice<uint8>): [
    VSOnAutoInsertResponseItemOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<VSOnAutoInsertResponseItemOrNull__from_lsproto>(($argument0: VSOnAutoInsertResponseItemOrNull__from_lsproto): VSOnAutoInsertResponseItemOrNull__from_lsproto => {
        return VSOnAutoInsertResponseItemOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<VSOnAutoInsertResponseItemOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$VSOnAutoInsertResponseItemOrNull($argument0);
    }, (): VSOnAutoInsertResponseItemOrNull__from_lsproto => {
        return VSOnAutoInsertResponseItemOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$VSReferenceItemsOrNull($argument0: RuntimeSlice<uint8>): [
    VSReferenceItemsOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<VSReferenceItemsOrNull__from_lsproto>(($argument0: VSReferenceItemsOrNull__from_lsproto): VSReferenceItemsOrNull__from_lsproto => {
        return VSReferenceItemsOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<VSReferenceItemsOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$VSReferenceItemsOrNull($argument0);
    }, (): VSReferenceItemsOrNull__from_lsproto => {
        return VSReferenceItemsOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$WorkspaceEditOrNull($argument0: RuntimeSlice<uint8>): [
    WorkspaceEditOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<WorkspaceEditOrNull__from_lsproto>(($argument0: WorkspaceEditOrNull__from_lsproto): WorkspaceEditOrNull__from_lsproto => {
        return WorkspaceEditOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<WorkspaceEditOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$WorkspaceEditOrNull($argument0);
    }, (): WorkspaceEditOrNull__from_lsproto => {
        return WorkspaceEditOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$Named_lsproto$WorkspaceFoldersOrNull($argument0: RuntimeSlice<uint8>): [
    WorkspaceFoldersOrNull__from_lsproto,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<WorkspaceFoldersOrNull__from_lsproto>(($argument0: WorkspaceFoldersOrNull__from_lsproto): WorkspaceFoldersOrNull__from_lsproto => {
        return WorkspaceFoldersOrNull__from_lsproto.$copy($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<WorkspaceFoldersOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$WorkspaceFoldersOrNull($argument0);
    }, (): WorkspaceFoldersOrNull__from_lsproto => {
        return WorkspaceFoldersOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$ApplyWorkspaceEditResult($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditResult__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditResult__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditResult__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditResult__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditResult__from_lsproto> | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$ApplyWorkspaceEditResult($argument0);
    }, (): tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditResult__from_lsproto> | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$CodeAction($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CodeAction__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<tsonicTypeScriptRuntime.Location<CodeAction__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<CodeAction__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CodeAction__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<CodeAction__from_lsproto> | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$CodeAction($argument0);
    }, (): tsonicTypeScriptRuntime.Location<CodeAction__from_lsproto> | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$CodeLens($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$CodeLens($argument0);
    }, (): tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$CompletionItem($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$CompletionItem($argument0);
    }, (): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$DocumentLink($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DocumentLink__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<tsonicTypeScriptRuntime.Location<DocumentLink__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<DocumentLink__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<DocumentLink__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<DocumentLink__from_lsproto> | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$DocumentLink($argument0);
    }, (): tsonicTypeScriptRuntime.Location<DocumentLink__from_lsproto> | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$InitializeAPISessionResult($argument0: RuntimeSlice<uint8>): [
    {
        value: InitializeAPISessionResult__from_lsproto;
    } | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<{
        value: InitializeAPISessionResult__from_lsproto;
    } | undefined>(($argument0: {
        value: InitializeAPISessionResult__from_lsproto;
    } | undefined): {
        value: InitializeAPISessionResult__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<{
        value: InitializeAPISessionResult__from_lsproto;
    } | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$InitializeAPISessionResult($argument0);
    }, (): {
        value: InitializeAPISessionResult__from_lsproto;
    } | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$InitializeResult($argument0: RuntimeSlice<uint8>): [
    {
        value: InitializeResult__from_lsproto;
    } | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<{
        value: InitializeResult__from_lsproto;
    } | undefined>(($argument0: {
        value: InitializeResult__from_lsproto;
    } | undefined): {
        value: InitializeResult__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<{
        value: InitializeResult__from_lsproto;
    } | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$InitializeResult($argument0);
    }, (): {
        value: InitializeResult__from_lsproto;
    } | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$InlayHint($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<InlayHint__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<tsonicTypeScriptRuntime.Location<InlayHint__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<InlayHint__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<InlayHint__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<InlayHint__from_lsproto> | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$InlayHint($argument0);
    }, (): tsonicTypeScriptRuntime.Location<InlayHint__from_lsproto> | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull($argument0);
    }, (): tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$ProfileResult($argument0: RuntimeSlice<uint8>): [
    {
        value: ProfileResult__from_lsproto;
    } | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<{
        value: ProfileResult__from_lsproto;
    } | undefined>(($argument0: {
        value: ProfileResult__from_lsproto;
    } | undefined): {
        value: ProfileResult__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<{
        value: ProfileResult__from_lsproto;
    } | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$ProfileResult($argument0);
    }, (): {
        value: ProfileResult__from_lsproto;
    } | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$ProjectInfoResult($argument0: RuntimeSlice<uint8>): [
    {
        value: ProjectInfoResult__from_lsproto;
    } | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<{
        value: ProjectInfoResult__from_lsproto;
    } | undefined>(($argument0: {
        value: ProjectInfoResult__from_lsproto;
    } | undefined): {
        value: ProjectInfoResult__from_lsproto;
    } | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<{
        value: ProjectInfoResult__from_lsproto;
    } | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$ProjectInfoResult($argument0);
    }, (): {
        value: ProjectInfoResult__from_lsproto;
    } | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$ShowDocumentResult($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ShowDocumentResult__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<tsonicTypeScriptRuntime.Location<ShowDocumentResult__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<ShowDocumentResult__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<ShowDocumentResult__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<ShowDocumentResult__from_lsproto> | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$ShowDocumentResult($argument0);
    }, (): tsonicTypeScriptRuntime.Location<ShowDocumentResult__from_lsproto> | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$TextDocumentContentResult($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<TextDocumentContentResult__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<tsonicTypeScriptRuntime.Location<TextDocumentContentResult__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<TextDocumentContentResult__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<TextDocumentContentResult__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<TextDocumentContentResult__from_lsproto> | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$TextDocumentContentResult($argument0);
    }, (): tsonicTypeScriptRuntime.Location<TextDocumentContentResult__from_lsproto> | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$WorkspaceDiagnosticReport($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticReport__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticReport__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticReport__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticReport__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticReport__from_lsproto> | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$WorkspaceDiagnosticReport($argument0);
    }, (): tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticReport__from_lsproto> | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$PointerTo_Named_lsproto$WorkspaceSymbol($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<WorkspaceSymbol__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<tsonicTypeScriptRuntime.Location<WorkspaceSymbol__from_lsproto> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<WorkspaceSymbol__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<WorkspaceSymbol__from_lsproto> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<tsonicTypeScriptRuntime.Location<WorkspaceSymbol__from_lsproto> | undefined> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_PointerTo_Named_lsproto$WorkspaceSymbol($argument0);
    }, (): tsonicTypeScriptRuntime.Location<WorkspaceSymbol__from_lsproto> | undefined => {
        return void 0;
    }, $argument0);
}
export function unmarshalValue$SliceOf_Interface_void($argument0: RuntimeSlice<uint8>): [
    RuntimeSlice<$goInterface$Interface_void | undefined>,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<RuntimeSlice<$goInterface$Interface_void | undefined>>(($argument0: RuntimeSlice<$goInterface$Interface_void | undefined>): RuntimeSlice<$goInterface$Interface_void | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<RuntimeSlice<$goInterface$Interface_void | undefined>> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_SliceOf_Interface_void($argument0);
    }, (): RuntimeSlice<$goInterface$Interface_void | undefined> => {
        return RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
    }, $argument0);
}
export function unmarshalValue$SliceOf_PointerTo_Named_lsproto$ColorInformation($argument0: RuntimeSlice<uint8>): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorInformation__from_lsproto> | undefined>,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorInformation__from_lsproto> | undefined>>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorInformation__from_lsproto> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorInformation__from_lsproto> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorInformation__from_lsproto> | undefined>> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_SliceOf_PointerTo_Named_lsproto$ColorInformation($argument0);
    }, (): RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorInformation__from_lsproto> | undefined> => {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<ColorInformation__from_lsproto> | undefined>();
    }, $argument0);
}
export function unmarshalValue$SliceOf_PointerTo_Named_lsproto$ColorPresentation($argument0: RuntimeSlice<uint8>): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorPresentation__from_lsproto> | undefined>,
    GoInterface | undefined
] {
    return unmarshalValue$kernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorPresentation__from_lsproto> | undefined>>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorPresentation__from_lsproto> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorPresentation__from_lsproto> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorPresentation__from_lsproto> | undefined>> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_SliceOf_PointerTo_Named_lsproto$ColorPresentation($argument0);
    }, (): RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorPresentation__from_lsproto> | undefined> => {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<ColorPresentation__from_lsproto> | undefined>();
    }, $argument0);
}
