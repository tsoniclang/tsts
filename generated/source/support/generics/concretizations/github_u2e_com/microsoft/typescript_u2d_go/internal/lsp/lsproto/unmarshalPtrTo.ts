import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../../interface-contracts.js";
import type { uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { unmarshalPtrTo$kernel } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import { ApplyWorkspaceEditParams as ApplyWorkspaceEditParams__from_lsproto, CallHierarchyIncomingCallsParams as CallHierarchyIncomingCallsParams__from_lsproto, CallHierarchyOutgoingCallsParams as CallHierarchyOutgoingCallsParams__from_lsproto, CallHierarchyPrepareParams as CallHierarchyPrepareParams__from_lsproto, CancelParams as CancelParams__from_lsproto, CodeActionParams as CodeActionParams__from_lsproto, CodeAction as CodeAction__from_lsproto, CodeLensParams as CodeLensParams__from_lsproto, CodeLens as CodeLens__from_lsproto, ColorPresentationParams as ColorPresentationParams__from_lsproto, CompletionItem as CompletionItem__from_lsproto, CompletionParams as CompletionParams__from_lsproto, ConfigurationParams as ConfigurationParams__from_lsproto, CreateFilesParams as CreateFilesParams__from_lsproto, DeclarationParams as DeclarationParams__from_lsproto, DefinitionParams as DefinitionParams__from_lsproto, DeleteFilesParams as DeleteFilesParams__from_lsproto, DidChangeConfigurationParams as DidChangeConfigurationParams__from_lsproto, DidChangeTextDocumentParams as DidChangeTextDocumentParams__from_lsproto, DidChangeWatchedFilesParams as DidChangeWatchedFilesParams__from_lsproto, DidChangeWorkspaceFoldersParams as DidChangeWorkspaceFoldersParams__from_lsproto, DidCloseTextDocumentParams as DidCloseTextDocumentParams__from_lsproto, DidOpenTextDocumentParams as DidOpenTextDocumentParams__from_lsproto, DidSaveTextDocumentParams as DidSaveTextDocumentParams__from_lsproto, DocumentColorParams as DocumentColorParams__from_lsproto, DocumentDiagnosticParams as DocumentDiagnosticParams__from_lsproto, DocumentFormattingParams as DocumentFormattingParams__from_lsproto, DocumentHighlightParams as DocumentHighlightParams__from_lsproto, DocumentLinkParams as DocumentLinkParams__from_lsproto, DocumentLink as DocumentLink__from_lsproto, DocumentOnTypeFormattingParams as DocumentOnTypeFormattingParams__from_lsproto, DocumentRangeFormattingParams as DocumentRangeFormattingParams__from_lsproto, DocumentRangesFormattingParams as DocumentRangesFormattingParams__from_lsproto, DocumentSymbolParams as DocumentSymbolParams__from_lsproto, ExecuteCommandParams as ExecuteCommandParams__from_lsproto, FoldingRangeParams as FoldingRangeParams__from_lsproto, HoverParams as HoverParams__from_lsproto, ImplementationParams as ImplementationParams__from_lsproto, InitializeAPISessionParams as InitializeAPISessionParams__from_lsproto, InitializeParams as InitializeParams__from_lsproto, InitializedParams as InitializedParams__from_lsproto, InlayHintParams as InlayHintParams__from_lsproto, InlayHint as InlayHint__from_lsproto, InlineCompletionParams as InlineCompletionParams__from_lsproto, InlineValueParams as InlineValueParams__from_lsproto, LinkedEditingRangeParams as LinkedEditingRangeParams__from_lsproto, LogMessageParams as LogMessageParams__from_lsproto, LogTraceParams as LogTraceParams__from_lsproto, MonikerParams as MonikerParams__from_lsproto, MultiDocumentHighlightParams as MultiDocumentHighlightParams__from_lsproto, PrepareRenameParams as PrepareRenameParams__from_lsproto, ProfileParams as ProfileParams__from_lsproto, ProgressParams as ProgressParams__from_lsproto, ProjectInfoParams as ProjectInfoParams__from_lsproto, PublishDiagnosticsParams as PublishDiagnosticsParams__from_lsproto, ReferenceParams as ReferenceParams__from_lsproto, RegistrationParams as RegistrationParams__from_lsproto, RenameFilesParams as RenameFilesParams__from_lsproto, RenameParams as RenameParams__from_lsproto, RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull as RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto, SelectionRangeParams as SelectionRangeParams__from_lsproto, SemanticTokensDeltaParams as SemanticTokensDeltaParams__from_lsproto, SemanticTokensParams as SemanticTokensParams__from_lsproto, SemanticTokensRangeParams as SemanticTokensRangeParams__from_lsproto, SetLogVerbosityParams as SetLogVerbosityParams__from_lsproto, SetTraceParams as SetTraceParams__from_lsproto, ShowDocumentParams as ShowDocumentParams__from_lsproto, ShowMessageParams as ShowMessageParams__from_lsproto, ShowMessageRequestParams as ShowMessageRequestParams__from_lsproto, SignatureHelpParams as SignatureHelpParams__from_lsproto, TextDocumentContentParams as TextDocumentContentParams__from_lsproto, TextDocumentContentRefreshParams as TextDocumentContentRefreshParams__from_lsproto, TextDocumentPositionParams as TextDocumentPositionParams__from_lsproto, TypeDefinitionParams as TypeDefinitionParams__from_lsproto, TypeHierarchyPrepareParams as TypeHierarchyPrepareParams__from_lsproto, TypeHierarchySubtypesParams as TypeHierarchySubtypesParams__from_lsproto, TypeHierarchySupertypesParams as TypeHierarchySupertypesParams__from_lsproto, UnregistrationParams as UnregistrationParams__from_lsproto, VSOnAutoInsertParams as VSOnAutoInsertParams__from_lsproto, WillSaveTextDocumentParams as WillSaveTextDocumentParams__from_lsproto, WorkDoneProgressCancelParams as WorkDoneProgressCancelParams__from_lsproto, WorkDoneProgressCreateParams as WorkDoneProgressCreateParams__from_lsproto, WorkspaceDiagnosticParams as WorkspaceDiagnosticParams__from_lsproto, WorkspaceSymbolParams as WorkspaceSymbolParams__from_lsproto, WorkspaceSymbol as WorkspaceSymbol__from_lsproto } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { $goInterfaceAdapter$PointerTo_Named_lsproto$ApplyWorkspaceEditParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyIncomingCallsParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyOutgoingCallsParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyPrepareParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CancelParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CodeAction, $goInterfaceAdapter$PointerTo_Named_lsproto$CodeActionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CodeLens, $goInterfaceAdapter$PointerTo_Named_lsproto$CodeLensParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ColorPresentationParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CompletionItem, $goInterfaceAdapter$PointerTo_Named_lsproto$CompletionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ConfigurationParams, $goInterfaceAdapter$PointerTo_Named_lsproto$CreateFilesParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DeclarationParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DefinitionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DeleteFilesParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeConfigurationParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeTextDocumentParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeWatchedFilesParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeWorkspaceFoldersParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DidCloseTextDocumentParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DidOpenTextDocumentParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DidSaveTextDocumentParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentColorParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentDiagnosticParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentHighlightParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentLink, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentLinkParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentOnTypeFormattingParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentRangeFormattingParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentRangesFormattingParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentSymbolParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ExecuteCommandParams, $goInterfaceAdapter$PointerTo_Named_lsproto$FoldingRangeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$HoverParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ImplementationParams, $goInterfaceAdapter$PointerTo_Named_lsproto$InitializeAPISessionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$InitializeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$InitializedParams, $goInterfaceAdapter$PointerTo_Named_lsproto$InlayHint, $goInterfaceAdapter$PointerTo_Named_lsproto$InlayHintParams, $goInterfaceAdapter$PointerTo_Named_lsproto$InlineCompletionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$InlineValueParams, $goInterfaceAdapter$PointerTo_Named_lsproto$LinkedEditingRangeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$LogMessageParams, $goInterfaceAdapter$PointerTo_Named_lsproto$LogTraceParams, $goInterfaceAdapter$PointerTo_Named_lsproto$MonikerParams, $goInterfaceAdapter$PointerTo_Named_lsproto$MultiDocumentHighlightParams, $goInterfaceAdapter$PointerTo_Named_lsproto$PrepareRenameParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ProfileParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ProgressParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ProjectInfoParams, $goInterfaceAdapter$PointerTo_Named_lsproto$PublishDiagnosticsParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ReferenceParams, $goInterfaceAdapter$PointerTo_Named_lsproto$RegistrationParams, $goInterfaceAdapter$PointerTo_Named_lsproto$RenameFilesParams, $goInterfaceAdapter$PointerTo_Named_lsproto$RenameParams, $goInterfaceAdapter$PointerTo_Named_lsproto$RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull, $goInterfaceAdapter$PointerTo_Named_lsproto$SelectionRangeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensDeltaParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensRangeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SetLogVerbosityParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SetTraceParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ShowDocumentParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ShowMessageParams, $goInterfaceAdapter$PointerTo_Named_lsproto$ShowMessageRequestParams, $goInterfaceAdapter$PointerTo_Named_lsproto$SignatureHelpParams, $goInterfaceAdapter$PointerTo_Named_lsproto$TextDocumentContentParams, $goInterfaceAdapter$PointerTo_Named_lsproto$TextDocumentContentRefreshParams, $goInterfaceAdapter$PointerTo_Named_lsproto$TextDocumentPositionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$TypeDefinitionParams, $goInterfaceAdapter$PointerTo_Named_lsproto$TypeHierarchyPrepareParams, $goInterfaceAdapter$PointerTo_Named_lsproto$TypeHierarchySubtypesParams, $goInterfaceAdapter$PointerTo_Named_lsproto$TypeHierarchySupertypesParams, $goInterfaceAdapter$PointerTo_Named_lsproto$UnregistrationParams, $goInterfaceAdapter$PointerTo_Named_lsproto$VSOnAutoInsertParams, $goInterfaceAdapter$PointerTo_Named_lsproto$WillSaveTextDocumentParams, $goInterfaceAdapter$PointerTo_Named_lsproto$WorkDoneProgressCancelParams, $goInterfaceAdapter$PointerTo_Named_lsproto$WorkDoneProgressCreateParams, $goInterfaceAdapter$PointerTo_Named_lsproto$WorkspaceDiagnosticParams, $goInterfaceAdapter$PointerTo_Named_lsproto$WorkspaceSymbol, $goInterfaceAdapter$PointerTo_Named_lsproto$WorkspaceSymbolParams, $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentFormattingParams as GoInterfaceAdapter } from "../../../../../../../../interface-adapters.js";
export function unmarshalPtrTo$Named_lsproto$ApplyWorkspaceEditParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<ApplyWorkspaceEditParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ApplyWorkspaceEditParams($argument0);
    }, (): ApplyWorkspaceEditParams__from_lsproto => {
        return ApplyWorkspaceEditParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$CallHierarchyIncomingCallsParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<CallHierarchyIncomingCallsParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyIncomingCallsParams($argument0);
    }, (): CallHierarchyIncomingCallsParams__from_lsproto => {
        return CallHierarchyIncomingCallsParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$CallHierarchyOutgoingCallsParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<CallHierarchyOutgoingCallsParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyOutgoingCallsParams($argument0);
    }, (): CallHierarchyOutgoingCallsParams__from_lsproto => {
        return CallHierarchyOutgoingCallsParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$CallHierarchyPrepareParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<CallHierarchyPrepareParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CallHierarchyPrepareParams($argument0);
    }, (): CallHierarchyPrepareParams__from_lsproto => {
        return CallHierarchyPrepareParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$CancelParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CancelParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<CancelParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<CancelParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CancelParams($argument0);
    }, (): CancelParams__from_lsproto => {
        return CancelParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$CodeAction($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CodeAction__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<CodeAction__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<CodeAction__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CodeAction($argument0);
    }, (): CodeAction__from_lsproto => {
        return CodeAction__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$CodeActionParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<CodeActionParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CodeActionParams($argument0);
    }, (): CodeActionParams__from_lsproto => {
        return CodeActionParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$CodeLens($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<CodeLens__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CodeLens($argument0);
    }, (): CodeLens__from_lsproto => {
        return CodeLens__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$CodeLensParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<CodeLensParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CodeLensParams($argument0);
    }, (): CodeLensParams__from_lsproto => {
        return CodeLensParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$ColorPresentationParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ColorPresentationParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<ColorPresentationParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<ColorPresentationParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ColorPresentationParams($argument0);
    }, (): ColorPresentationParams__from_lsproto => {
        return ColorPresentationParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$CompletionItem($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<CompletionItem__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CompletionItem($argument0);
    }, (): CompletionItem__from_lsproto => {
        return CompletionItem__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$CompletionParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<CompletionParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CompletionParams($argument0);
    }, (): CompletionParams__from_lsproto => {
        return CompletionParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$ConfigurationParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ConfigurationParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<ConfigurationParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<ConfigurationParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ConfigurationParams($argument0);
    }, (): ConfigurationParams__from_lsproto => {
        return ConfigurationParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$CreateFilesParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<CreateFilesParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<CreateFilesParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<CreateFilesParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$CreateFilesParams($argument0);
    }, (): CreateFilesParams__from_lsproto => {
        return CreateFilesParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DeclarationParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DeclarationParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DeclarationParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DeclarationParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DeclarationParams($argument0);
    }, (): DeclarationParams__from_lsproto => {
        return DeclarationParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DefinitionParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DefinitionParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DefinitionParams($argument0);
    }, (): DefinitionParams__from_lsproto => {
        return DefinitionParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DeleteFilesParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DeleteFilesParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DeleteFilesParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DeleteFilesParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DeleteFilesParams($argument0);
    }, (): DeleteFilesParams__from_lsproto => {
        return DeleteFilesParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DidChangeConfigurationParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DidChangeConfigurationParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeConfigurationParams($argument0);
    }, (): DidChangeConfigurationParams__from_lsproto => {
        return DidChangeConfigurationParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DidChangeTextDocumentParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DidChangeTextDocumentParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeTextDocumentParams($argument0);
    }, (): DidChangeTextDocumentParams__from_lsproto => {
        return DidChangeTextDocumentParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DidChangeWatchedFilesParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DidChangeWatchedFilesParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeWatchedFilesParams($argument0);
    }, (): DidChangeWatchedFilesParams__from_lsproto => {
        return DidChangeWatchedFilesParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DidChangeWorkspaceFoldersParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DidChangeWorkspaceFoldersParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DidChangeWorkspaceFoldersParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DidChangeWorkspaceFoldersParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DidChangeWorkspaceFoldersParams($argument0);
    }, (): DidChangeWorkspaceFoldersParams__from_lsproto => {
        return DidChangeWorkspaceFoldersParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DidCloseTextDocumentParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DidCloseTextDocumentParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DidCloseTextDocumentParams($argument0);
    }, (): DidCloseTextDocumentParams__from_lsproto => {
        return DidCloseTextDocumentParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DidOpenTextDocumentParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DidOpenTextDocumentParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DidOpenTextDocumentParams($argument0);
    }, (): DidOpenTextDocumentParams__from_lsproto => {
        return DidOpenTextDocumentParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DidSaveTextDocumentParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DidSaveTextDocumentParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DidSaveTextDocumentParams($argument0);
    }, (): DidSaveTextDocumentParams__from_lsproto => {
        return DidSaveTextDocumentParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DocumentColorParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DocumentColorParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DocumentColorParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DocumentColorParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentColorParams($argument0);
    }, (): DocumentColorParams__from_lsproto => {
        return DocumentColorParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DocumentDiagnosticParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DocumentDiagnosticParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentDiagnosticParams($argument0);
    }, (): DocumentDiagnosticParams__from_lsproto => {
        return DocumentDiagnosticParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DocumentFormattingParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DocumentFormattingParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, (): DocumentFormattingParams__from_lsproto => {
        return DocumentFormattingParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DocumentHighlightParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DocumentHighlightParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentHighlightParams($argument0);
    }, (): DocumentHighlightParams__from_lsproto => {
        return DocumentHighlightParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DocumentLink($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DocumentLink__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DocumentLink__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DocumentLink__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentLink($argument0);
    }, (): DocumentLink__from_lsproto => {
        return DocumentLink__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DocumentLinkParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DocumentLinkParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DocumentLinkParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DocumentLinkParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentLinkParams($argument0);
    }, (): DocumentLinkParams__from_lsproto => {
        return DocumentLinkParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DocumentOnTypeFormattingParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DocumentOnTypeFormattingParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentOnTypeFormattingParams($argument0);
    }, (): DocumentOnTypeFormattingParams__from_lsproto => {
        return DocumentOnTypeFormattingParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DocumentRangeFormattingParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DocumentRangeFormattingParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentRangeFormattingParams($argument0);
    }, (): DocumentRangeFormattingParams__from_lsproto => {
        return DocumentRangeFormattingParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DocumentRangesFormattingParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DocumentRangesFormattingParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DocumentRangesFormattingParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DocumentRangesFormattingParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentRangesFormattingParams($argument0);
    }, (): DocumentRangesFormattingParams__from_lsproto => {
        return DocumentRangesFormattingParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$DocumentSymbolParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<DocumentSymbolParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$DocumentSymbolParams($argument0);
    }, (): DocumentSymbolParams__from_lsproto => {
        return DocumentSymbolParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$ExecuteCommandParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ExecuteCommandParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<ExecuteCommandParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<ExecuteCommandParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ExecuteCommandParams($argument0);
    }, (): ExecuteCommandParams__from_lsproto => {
        return ExecuteCommandParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$FoldingRangeParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<FoldingRangeParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$FoldingRangeParams($argument0);
    }, (): FoldingRangeParams__from_lsproto => {
        return FoldingRangeParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$HoverParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<HoverParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<HoverParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<HoverParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$HoverParams($argument0);
    }, (): HoverParams__from_lsproto => {
        return HoverParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$ImplementationParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<ImplementationParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ImplementationParams($argument0);
    }, (): ImplementationParams__from_lsproto => {
        return ImplementationParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$InitializeAPISessionParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<InitializeAPISessionParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$InitializeAPISessionParams($argument0);
    }, (): InitializeAPISessionParams__from_lsproto => {
        return InitializeAPISessionParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$InitializeParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<InitializeParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$InitializeParams($argument0);
    }, (): InitializeParams__from_lsproto => {
        return InitializeParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$InitializedParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<InitializedParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$InitializedParams($argument0);
    }, (): InitializedParams__from_lsproto => {
        return InitializedParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$InlayHint($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<InlayHint__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<InlayHint__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<InlayHint__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$InlayHint($argument0);
    }, (): InlayHint__from_lsproto => {
        return InlayHint__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$InlayHintParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<InlayHintParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<InlayHintParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<InlayHintParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$InlayHintParams($argument0);
    }, (): InlayHintParams__from_lsproto => {
        return InlayHintParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$InlineCompletionParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<InlineCompletionParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<InlineCompletionParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<InlineCompletionParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$InlineCompletionParams($argument0);
    }, (): InlineCompletionParams__from_lsproto => {
        return InlineCompletionParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$InlineValueParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<InlineValueParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<InlineValueParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<InlineValueParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$InlineValueParams($argument0);
    }, (): InlineValueParams__from_lsproto => {
        return InlineValueParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$LinkedEditingRangeParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<LinkedEditingRangeParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$LinkedEditingRangeParams($argument0);
    }, (): LinkedEditingRangeParams__from_lsproto => {
        return LinkedEditingRangeParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$LogMessageParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<LogMessageParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<LogMessageParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<LogMessageParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$LogMessageParams($argument0);
    }, (): LogMessageParams__from_lsproto => {
        return LogMessageParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$LogTraceParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<LogTraceParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<LogTraceParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<LogTraceParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$LogTraceParams($argument0);
    }, (): LogTraceParams__from_lsproto => {
        return LogTraceParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$MonikerParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<MonikerParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<MonikerParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<MonikerParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$MonikerParams($argument0);
    }, (): MonikerParams__from_lsproto => {
        return MonikerParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$MultiDocumentHighlightParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<MultiDocumentHighlightParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$MultiDocumentHighlightParams($argument0);
    }, (): MultiDocumentHighlightParams__from_lsproto => {
        return MultiDocumentHighlightParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$PrepareRenameParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<PrepareRenameParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$PrepareRenameParams($argument0);
    }, (): PrepareRenameParams__from_lsproto => {
        return PrepareRenameParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$ProfileParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<ProfileParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ProfileParams($argument0);
    }, (): ProfileParams__from_lsproto => {
        return ProfileParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$ProgressParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ProgressParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<ProgressParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<ProgressParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ProgressParams($argument0);
    }, (): ProgressParams__from_lsproto => {
        return ProgressParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$ProjectInfoParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<ProjectInfoParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ProjectInfoParams($argument0);
    }, (): ProjectInfoParams__from_lsproto => {
        return ProjectInfoParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$PublishDiagnosticsParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<PublishDiagnosticsParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$PublishDiagnosticsParams($argument0);
    }, (): PublishDiagnosticsParams__from_lsproto => {
        return PublishDiagnosticsParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$ReferenceParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<ReferenceParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ReferenceParams($argument0);
    }, (): ReferenceParams__from_lsproto => {
        return ReferenceParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$RegistrationParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<RegistrationParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<RegistrationParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<RegistrationParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$RegistrationParams($argument0);
    }, (): RegistrationParams__from_lsproto => {
        return RegistrationParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$RenameFilesParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<RenameFilesParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$RenameFilesParams($argument0);
    }, (): RenameFilesParams__from_lsproto => {
        return RenameFilesParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$RenameParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<RenameParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$RenameParams($argument0);
    }, (): RenameParams__from_lsproto => {
        return RenameParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull($argument0);
    }, (): RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto => {
        return RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$SelectionRangeParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<SelectionRangeParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<SelectionRangeParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<SelectionRangeParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$SelectionRangeParams($argument0);
    }, (): SelectionRangeParams__from_lsproto => {
        return SelectionRangeParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$SemanticTokensDeltaParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<SemanticTokensDeltaParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<SemanticTokensDeltaParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<SemanticTokensDeltaParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensDeltaParams($argument0);
    }, (): SemanticTokensDeltaParams__from_lsproto => {
        return SemanticTokensDeltaParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$SemanticTokensParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<SemanticTokensParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensParams($argument0);
    }, (): SemanticTokensParams__from_lsproto => {
        return SemanticTokensParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$SemanticTokensRangeParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<SemanticTokensRangeParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$SemanticTokensRangeParams($argument0);
    }, (): SemanticTokensRangeParams__from_lsproto => {
        return SemanticTokensRangeParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$SetLogVerbosityParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<SetLogVerbosityParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$SetLogVerbosityParams($argument0);
    }, (): SetLogVerbosityParams__from_lsproto => {
        return SetLogVerbosityParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$SetTraceParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<SetTraceParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$SetTraceParams($argument0);
    }, (): SetTraceParams__from_lsproto => {
        return SetTraceParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$ShowDocumentParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ShowDocumentParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<ShowDocumentParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<ShowDocumentParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ShowDocumentParams($argument0);
    }, (): ShowDocumentParams__from_lsproto => {
        return ShowDocumentParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$ShowMessageParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ShowMessageParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<ShowMessageParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<ShowMessageParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ShowMessageParams($argument0);
    }, (): ShowMessageParams__from_lsproto => {
        return ShowMessageParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$ShowMessageRequestParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<ShowMessageRequestParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<ShowMessageRequestParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<ShowMessageRequestParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$ShowMessageRequestParams($argument0);
    }, (): ShowMessageRequestParams__from_lsproto => {
        return ShowMessageRequestParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$SignatureHelpParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<SignatureHelpParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$SignatureHelpParams($argument0);
    }, (): SignatureHelpParams__from_lsproto => {
        return SignatureHelpParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$TextDocumentContentParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<TextDocumentContentParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<TextDocumentContentParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<TextDocumentContentParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$TextDocumentContentParams($argument0);
    }, (): TextDocumentContentParams__from_lsproto => {
        return TextDocumentContentParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$TextDocumentContentRefreshParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<TextDocumentContentRefreshParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<TextDocumentContentRefreshParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<TextDocumentContentRefreshParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$TextDocumentContentRefreshParams($argument0);
    }, (): TextDocumentContentRefreshParams__from_lsproto => {
        return TextDocumentContentRefreshParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$TextDocumentPositionParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<TextDocumentPositionParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$TextDocumentPositionParams($argument0);
    }, (): TextDocumentPositionParams__from_lsproto => {
        return TextDocumentPositionParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$TypeDefinitionParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<TypeDefinitionParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$TypeDefinitionParams($argument0);
    }, (): TypeDefinitionParams__from_lsproto => {
        return TypeDefinitionParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$TypeHierarchyPrepareParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<TypeHierarchyPrepareParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<TypeHierarchyPrepareParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<TypeHierarchyPrepareParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$TypeHierarchyPrepareParams($argument0);
    }, (): TypeHierarchyPrepareParams__from_lsproto => {
        return TypeHierarchyPrepareParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$TypeHierarchySubtypesParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<TypeHierarchySubtypesParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<TypeHierarchySubtypesParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<TypeHierarchySubtypesParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$TypeHierarchySubtypesParams($argument0);
    }, (): TypeHierarchySubtypesParams__from_lsproto => {
        return TypeHierarchySubtypesParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$TypeHierarchySupertypesParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<TypeHierarchySupertypesParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<TypeHierarchySupertypesParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<TypeHierarchySupertypesParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$TypeHierarchySupertypesParams($argument0);
    }, (): TypeHierarchySupertypesParams__from_lsproto => {
        return TypeHierarchySupertypesParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$UnregistrationParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<UnregistrationParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<UnregistrationParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<UnregistrationParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$UnregistrationParams($argument0);
    }, (): UnregistrationParams__from_lsproto => {
        return UnregistrationParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$VSOnAutoInsertParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<VSOnAutoInsertParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$VSOnAutoInsertParams($argument0);
    }, (): VSOnAutoInsertParams__from_lsproto => {
        return VSOnAutoInsertParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$WillSaveTextDocumentParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<WillSaveTextDocumentParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<WillSaveTextDocumentParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<WillSaveTextDocumentParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$WillSaveTextDocumentParams($argument0);
    }, (): WillSaveTextDocumentParams__from_lsproto => {
        return WillSaveTextDocumentParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$WorkDoneProgressCancelParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<WorkDoneProgressCancelParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<WorkDoneProgressCancelParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<WorkDoneProgressCancelParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$WorkDoneProgressCancelParams($argument0);
    }, (): WorkDoneProgressCancelParams__from_lsproto => {
        return WorkDoneProgressCancelParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$WorkDoneProgressCreateParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<WorkDoneProgressCreateParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<WorkDoneProgressCreateParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<WorkDoneProgressCreateParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$WorkDoneProgressCreateParams($argument0);
    }, (): WorkDoneProgressCreateParams__from_lsproto => {
        return WorkDoneProgressCreateParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$WorkspaceDiagnosticParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<WorkspaceDiagnosticParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$WorkspaceDiagnosticParams($argument0);
    }, (): WorkspaceDiagnosticParams__from_lsproto => {
        return WorkspaceDiagnosticParams__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$WorkspaceSymbol($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<WorkspaceSymbol__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<WorkspaceSymbol__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<WorkspaceSymbol__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$WorkspaceSymbol($argument0);
    }, (): WorkspaceSymbol__from_lsproto => {
        return WorkspaceSymbol__from_lsproto.$zero();
    }, $argument0);
}
export function unmarshalPtrTo$Named_lsproto$WorkspaceSymbolParams($argument0: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined,
    GoInterface | undefined
] {
    return unmarshalPtrTo$kernel<WorkspaceSymbolParams__from_lsproto>(($argument0: tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined): $goInterface$Interface_void | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_lsproto$WorkspaceSymbolParams($argument0);
    }, (): WorkspaceSymbolParams__from_lsproto => {
        return WorkspaceSymbolParams__from_lsproto.$zero();
    }, $argument0);
}
