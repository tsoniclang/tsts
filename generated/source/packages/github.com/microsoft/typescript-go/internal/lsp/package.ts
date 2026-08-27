import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { CrossProjectOrchestrator as CrossProjectOrchestrator__from_ls } from "../ls/package.js";
import type { CallHierarchyIncomingCallsOrNull as CallHierarchyIncomingCallsOrNull__from_lsproto, CallHierarchyIncomingCallsOrNull$Storage as CallHierarchyIncomingCallsOrNull__from_lsproto$Storage, CallHierarchyIncomingCallsParams as CallHierarchyIncomingCallsParams__from_lsproto, CallHierarchyItemsOrNull as CallHierarchyItemsOrNull__from_lsproto, CallHierarchyItemsOrNull$Storage as CallHierarchyItemsOrNull__from_lsproto$Storage, CallHierarchyOutgoingCallsOrNull as CallHierarchyOutgoingCallsOrNull__from_lsproto, CallHierarchyOutgoingCallsOrNull$Storage as CallHierarchyOutgoingCallsOrNull__from_lsproto$Storage, CallHierarchyOutgoingCallsParams as CallHierarchyOutgoingCallsParams__from_lsproto, CallHierarchyPrepareParams as CallHierarchyPrepareParams__from_lsproto, CodeActionParams as CodeActionParams__from_lsproto, CodeLensParams as CodeLensParams__from_lsproto, CodeLens as CodeLens__from_lsproto, CodeLensesOrNull as CodeLensesOrNull__from_lsproto, CodeLensesOrNull$Storage as CodeLensesOrNull__from_lsproto$Storage, CommandOrCodeActionArrayOrNull as CommandOrCodeActionArrayOrNull__from_lsproto, CommandOrCodeActionArrayOrNull$Storage as CommandOrCodeActionArrayOrNull__from_lsproto$Storage, CompletionItem as CompletionItem__from_lsproto, CompletionItemsOrListOrNull as CompletionItemsOrListOrNull__from_lsproto, CompletionItemsOrListOrNull$Storage as CompletionItemsOrListOrNull__from_lsproto$Storage, CompletionParams as CompletionParams__from_lsproto, DefinitionParams as DefinitionParams__from_lsproto, DidChangeConfigurationParams as DidChangeConfigurationParams__from_lsproto, DidChangeTextDocumentParams as DidChangeTextDocumentParams__from_lsproto, DidChangeWatchedFilesParams as DidChangeWatchedFilesParams__from_lsproto, DidCloseTextDocumentParams as DidCloseTextDocumentParams__from_lsproto, DidOpenTextDocumentParams as DidOpenTextDocumentParams__from_lsproto, DidSaveTextDocumentParams as DidSaveTextDocumentParams__from_lsproto, DocumentDiagnosticParams as DocumentDiagnosticParams__from_lsproto, DocumentFormattingParams as DocumentFormattingParams__from_lsproto, DocumentHighlightParams as DocumentHighlightParams__from_lsproto, DocumentHighlightsOrNull as DocumentHighlightsOrNull__from_lsproto, DocumentHighlightsOrNull$Storage as DocumentHighlightsOrNull__from_lsproto$Storage, DocumentOnTypeFormattingParams as DocumentOnTypeFormattingParams__from_lsproto, DocumentRangeFormattingParams as DocumentRangeFormattingParams__from_lsproto, DocumentSymbolParams as DocumentSymbolParams__from_lsproto, FoldingRangeParams as FoldingRangeParams__from_lsproto, FoldingRangesOrNull as FoldingRangesOrNull__from_lsproto, FoldingRangesOrNull$Storage as FoldingRangesOrNull__from_lsproto$Storage, HoverOrNull as HoverOrNull__from_lsproto, HoverOrNull$Storage as HoverOrNull__from_lsproto$Storage, HoverParams as HoverParams__from_lsproto, ImplementationParams as ImplementationParams__from_lsproto, InitializeAPISessionParams as InitializeAPISessionParams__from_lsproto, InitializeAPISessionResult as InitializeAPISessionResult__from_lsproto, InitializeParams as InitializeParams__from_lsproto, InitializeResult as InitializeResult__from_lsproto, InitializedParams as InitializedParams__from_lsproto, InlayHintParams as InlayHintParams__from_lsproto, InlayHintsOrNull as InlayHintsOrNull__from_lsproto, InlayHintsOrNull$Storage as InlayHintsOrNull__from_lsproto$Storage, LinkedEditingRangeParams as LinkedEditingRangeParams__from_lsproto, LinkedEditingRangesOrNull as LinkedEditingRangesOrNull__from_lsproto, LinkedEditingRangesOrNull$Storage as LinkedEditingRangesOrNull__from_lsproto$Storage, LocationOrLocationsOrDefinitionLinksOrNull as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto, LocationOrLocationsOrDefinitionLinksOrNull$Storage as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto$Storage, LocationsOrNull as LocationsOrNull__from_lsproto, LocationsOrNull$Storage as LocationsOrNull__from_lsproto$Storage, MultiDocumentHighlightParams as MultiDocumentHighlightParams__from_lsproto, MultiDocumentHighlightsOrNull as MultiDocumentHighlightsOrNull__from_lsproto, MultiDocumentHighlightsOrNull$Storage as MultiDocumentHighlightsOrNull__from_lsproto$Storage, NoParams as NoParams__from_lsproto, NoParams$Storage as NoParams__from_lsproto$Storage, Null as Null__from_lsproto, Null$Storage as Null__from_lsproto$Storage, PrepareRenameParams as PrepareRenameParams__from_lsproto, ProfileParams as ProfileParams__from_lsproto, ProfileResult as ProfileResult__from_lsproto, ProjectInfoParams as ProjectInfoParams__from_lsproto, ProjectInfoResult as ProjectInfoResult__from_lsproto, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull as RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull$Storage as RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto$Storage, ReferenceParams as ReferenceParams__from_lsproto, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport as RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport$Storage as RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto$Storage, RenameFilesParams as RenameFilesParams__from_lsproto, RenameParams as RenameParams__from_lsproto, RequestMessage as RequestMessage__from_lsproto, SelectionRangeParams as SelectionRangeParams__from_lsproto, SelectionRangesOrNull as SelectionRangesOrNull__from_lsproto, SelectionRangesOrNull$Storage as SelectionRangesOrNull__from_lsproto$Storage, SemanticTokensOrNull as SemanticTokensOrNull__from_lsproto, SemanticTokensOrNull$Storage as SemanticTokensOrNull__from_lsproto$Storage, SemanticTokensParams as SemanticTokensParams__from_lsproto, SemanticTokensRangeParams as SemanticTokensRangeParams__from_lsproto, SetLogVerbosityParams as SetLogVerbosityParams__from_lsproto, SetTraceParams as SetTraceParams__from_lsproto, SignatureHelpOrNull as SignatureHelpOrNull__from_lsproto, SignatureHelpOrNull$Storage as SignatureHelpOrNull__from_lsproto$Storage, SignatureHelpParams as SignatureHelpParams__from_lsproto, SymbolInformationsOrDocumentSymbolsOrNull as SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto, SymbolInformationsOrDocumentSymbolsOrNull$Storage as SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto$Storage, SymbolInformationsOrWorkspaceSymbolsOrNull as SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto, SymbolInformationsOrWorkspaceSymbolsOrNull$Storage as SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto$Storage, TextDocumentPositionParams as TextDocumentPositionParams__from_lsproto, TextEditsOrNull as TextEditsOrNull__from_lsproto, TextEditsOrNull$Storage as TextEditsOrNull__from_lsproto$Storage, TypeDefinitionParams as TypeDefinitionParams__from_lsproto, VSOnAutoInsertParams as VSOnAutoInsertParams__from_lsproto, VSOnAutoInsertResponseItemOrNull as VSOnAutoInsertResponseItemOrNull__from_lsproto, VSOnAutoInsertResponseItemOrNull$Storage as VSOnAutoInsertResponseItemOrNull__from_lsproto$Storage, VSReferenceItemsOrNull as VSReferenceItemsOrNull__from_lsproto, VSReferenceItemsOrNull$Storage as VSReferenceItemsOrNull__from_lsproto$Storage, WorkspaceEditOrNull as WorkspaceEditOrNull__from_lsproto, WorkspaceEditOrNull$Storage as WorkspaceEditOrNull__from_lsproto$Storage, WorkspaceSymbolParams as WorkspaceSymbolParams__from_lsproto } from "./lsproto/package.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { Server, handlerMap } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import { registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$CallHierarchyPrepareParams$Named_lsproto$CallHierarchyItemsOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$CodeActionParams$Named_lsproto$CommandOrCodeActionArrayOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$CodeLensParams$Named_lsproto$CodeLensesOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DefinitionParams$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentDiagnosticParams$Named_lsproto$RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentFormattingParams$Named_lsproto$TextEditsOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentHighlightParams$Named_lsproto$DocumentHighlightsOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentOnTypeFormattingParams$Named_lsproto$TextEditsOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentRangeFormattingParams$Named_lsproto$TextEditsOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentSymbolParams$Named_lsproto$SymbolInformationsOrDocumentSymbolsOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$FoldingRangeParams$Named_lsproto$FoldingRangesOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$HoverParams$Named_lsproto$HoverOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$InlayHintParams$Named_lsproto$InlayHintsOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$LinkedEditingRangeParams$Named_lsproto$LinkedEditingRangesOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$MultiDocumentHighlightParams$Named_lsproto$MultiDocumentHighlightsOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$PrepareRenameParams$Named_lsproto$RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$SelectionRangeParams$Named_lsproto$SelectionRangesOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$SemanticTokensParams$Named_lsproto$SemanticTokensOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$SemanticTokensRangeParams$Named_lsproto$SemanticTokensOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$SignatureHelpParams$Named_lsproto$SignatureHelpOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$TextDocumentPositionParams$PointerTo_Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$TypeDefinitionParams$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull, registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$VSOnAutoInsertParams$Named_lsproto$VSOnAutoInsertResponseItemOrNull } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/registerLanguageServiceDocumentRequestHandler.js";
import { registerLanguageServiceWithAutoImportsRequestHandler$PointerTo_Named_lsproto$CodeActionParams$Named_lsproto$CommandOrCodeActionArrayOrNull, registerLanguageServiceWithAutoImportsRequestHandler$PointerTo_Named_lsproto$CompletionParams$Named_lsproto$CompletionItemsOrListOrNull } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/registerLanguageServiceWithAutoImportsRequestHandler.js";
import { registerMultiProjectReferenceRequestHandler$PointerTo_Named_lsproto$ImplementationParams$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull, registerMultiProjectReferenceRequestHandler$PointerTo_Named_lsproto$ReferenceParams$Named_lsproto$LocationsOrNull, registerMultiProjectReferenceRequestHandler$PointerTo_Named_lsproto$ReferenceParams$Named_lsproto$VSReferenceItemsOrNull } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/registerMultiProjectReferenceRequestHandler.js";
import { registerNotificationHandler$Named_lsproto$NoParams, registerNotificationHandler$PointerTo_Named_lsproto$DidChangeConfigurationParams, registerNotificationHandler$PointerTo_Named_lsproto$DidChangeTextDocumentParams, registerNotificationHandler$PointerTo_Named_lsproto$DidChangeWatchedFilesParams, registerNotificationHandler$PointerTo_Named_lsproto$DidCloseTextDocumentParams, registerNotificationHandler$PointerTo_Named_lsproto$DidOpenTextDocumentParams, registerNotificationHandler$PointerTo_Named_lsproto$DidSaveTextDocumentParams, registerNotificationHandler$PointerTo_Named_lsproto$InitializedParams, registerNotificationHandler$PointerTo_Named_lsproto$SetLogVerbosityParams, registerNotificationHandler$PointerTo_Named_lsproto$SetTraceParams } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/registerNotificationHandler.js";
import { registerRequestHandler$Named_lsproto$NoParams$Named_lsproto$Null, registerRequestHandler$Named_lsproto$NoParams$PointerTo_Named_lsproto$ProfileResult, registerRequestHandler$PointerTo_Named_lsproto$CallHierarchyIncomingCallsParams$Named_lsproto$CallHierarchyIncomingCallsOrNull, registerRequestHandler$PointerTo_Named_lsproto$CallHierarchyOutgoingCallsParams$Named_lsproto$CallHierarchyOutgoingCallsOrNull, registerRequestHandler$PointerTo_Named_lsproto$CodeLens$PointerTo_Named_lsproto$CodeLens, registerRequestHandler$PointerTo_Named_lsproto$CompletionItem$PointerTo_Named_lsproto$CompletionItem, registerRequestHandler$PointerTo_Named_lsproto$InitializeAPISessionParams$PointerTo_Named_lsproto$InitializeAPISessionResult, registerRequestHandler$PointerTo_Named_lsproto$InitializeParams$PointerTo_Named_lsproto$InitializeResult, registerRequestHandler$PointerTo_Named_lsproto$ProfileParams$Named_lsproto$Null, registerRequestHandler$PointerTo_Named_lsproto$ProfileParams$PointerTo_Named_lsproto$ProfileResult, registerRequestHandler$PointerTo_Named_lsproto$ProjectInfoParams$PointerTo_Named_lsproto$ProjectInfoResult, registerRequestHandler$PointerTo_Named_lsproto$RenameFilesParams$Named_lsproto$WorkspaceEditOrNull, registerRequestHandler$PointerTo_Named_lsproto$RenameParams$Named_lsproto$WorkspaceEditOrNull, registerRequestHandler$PointerTo_Named_lsproto$WorkspaceSymbolParams$Named_lsproto$SymbolInformationsOrWorkspaceSymbolsOrNull } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/registerRequestHandler.js";
import { $goMap$MapOf_Named_lsproto$Method_To_PointerTo_Named_lsp$Server_Named_context$Context_PointerTo_Named_lsproto$RequestMessage_to_void_to_Named_error_Named_error as GoMap } from "../../../../../../support/maps.js";
import { LanguageService as LanguageService__from_ls } from "../ls/package.js";
import { $state as $state__lsproto, FileOperationFilter as FileOperationFilter__from_lsproto, FileOperationPattern as FileOperationPattern__from_lsproto, NotificationInfo as NotificationInfo__from_lsproto, RequestInfo as RequestInfo__from_lsproto } from "./lsproto/package.js";
import { $state } from "./state.js";
import * as provider_regexp from "@gotots/gostdlib/internal/facets/provider-regexp.js";
import * as regexp__from_gostdlib from "@gotots/gostdlib/regexp.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    $state.fileRenameFilters = RuntimeSlice.nil<{
        value: FileOperationFilter__from_lsproto;
    } | undefined>();
    $state.genericSecretKeywordRegex = void 0;
    $state.handlers = void 0;
    {
        void 0;
    }
    {
        $state.fileRenameFilters = RuntimeSlice.literal<{
            value: FileOperationFilter__from_lsproto;
        } | undefined>([
            { value: new FileOperationFilter__from_lsproto(tsonicTypeScriptRuntime.location<gostring>("file"), { value: new FileOperationPattern__from_lsproto("**/*.{ts,tsx,js,jsx,cts,cjs,mts,mjs,json}", void 0, void 0) }) },
        ]);
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        const __gotots_conversion_0 = regexp__from_gostdlib.MustCompile("(?i)(key|token|signature|sig|pwd)([(\\[.|])");
        $state.genericSecretKeywordRegex = __gotots_conversion_0 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<regexp__from_gostdlib.Regexp>(__gotots_conversion_0, (): regexp__from_gostdlib.Regexp => {
                return __gotots_conversion_0;
            }, ($go$providerPointerValue: regexp__from_gostdlib.Regexp): void => {
                provider_regexp.RegexpValueOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
            });
    }
    {
        $state.handlers = sync__from_gostdlib.OnceValue<handlerMap>((): handlerMap => {
            let handlers__shadow_1: handlerMap = new handlerMap(GoMap.make(0, []));
            registerRequestHandler$PointerTo_Named_lsproto$InitializeParams$PointerTo_Named_lsproto$InitializeResult(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined, {
                value: InitializeResult__from_lsproto;
            } | undefined>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined, {
                value: InitializeResult__from_lsproto;
            } | undefined>($state__lsproto.InitializeInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                {
                    value: InitializeResult__from_lsproto;
                } | undefined,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleInitialize($argument0, $argument1, $argument2, $argument3);
            });
            registerNotificationHandler$PointerTo_Named_lsproto$InitializedParams(handlers__shadow_1, NotificationInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined>(NotificationInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined>($state__lsproto.InitializedInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                return Server.$go$private$lsp$handleInitialized($argument0, $argument1, $argument2);
            });
            registerRequestHandler$Named_lsproto$NoParams$Named_lsproto$Null(handlers__shadow_1, RequestInfo__from_lsproto.$copy<NoParams__from_lsproto, Null__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<NoParams__from_lsproto, Null__from_lsproto>($state__lsproto.ShutdownInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: NoParams__from_lsproto, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                Null__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleShutdown($argument0, $argument1, $argument2, $argument3);
            });
            registerNotificationHandler$Named_lsproto$NoParams(handlers__shadow_1, NotificationInfo__from_lsproto.$copy<NoParams__from_lsproto>(NotificationInfo__from_lsproto.$fromStorage<NoParams__from_lsproto>($state__lsproto.ExitInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: NoParams__from_lsproto): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                return Server.$go$private$lsp$handleExit($argument0, $argument1, $argument2);
            });
            registerNotificationHandler$PointerTo_Named_lsproto$DidChangeConfigurationParams(handlers__shadow_1, NotificationInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined>(NotificationInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined>($state__lsproto.WorkspaceDidChangeConfigurationInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                return Server.$go$private$lsp$handleDidChangeWorkspaceConfiguration($argument0, $argument1, $argument2);
            });
            registerNotificationHandler$PointerTo_Named_lsproto$DidOpenTextDocumentParams(handlers__shadow_1, NotificationInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined>(NotificationInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined>($state__lsproto.TextDocumentDidOpenInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                return Server.$go$private$lsp$handleDidOpen($argument0, $argument1, $argument2);
            });
            registerNotificationHandler$PointerTo_Named_lsproto$DidChangeTextDocumentParams(handlers__shadow_1, NotificationInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined>(NotificationInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined>($state__lsproto.TextDocumentDidChangeInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                return Server.$go$private$lsp$handleDidChange($argument0, $argument1, $argument2);
            });
            registerNotificationHandler$PointerTo_Named_lsproto$DidSaveTextDocumentParams(handlers__shadow_1, NotificationInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined>(NotificationInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined>($state__lsproto.TextDocumentDidSaveInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                return Server.$go$private$lsp$handleDidSave($argument0, $argument1, $argument2);
            });
            registerNotificationHandler$PointerTo_Named_lsproto$DidCloseTextDocumentParams(handlers__shadow_1, NotificationInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined>(NotificationInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined>($state__lsproto.TextDocumentDidCloseInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                return Server.$go$private$lsp$handleDidClose($argument0, $argument1, $argument2);
            });
            registerNotificationHandler$PointerTo_Named_lsproto$DidChangeWatchedFilesParams(handlers__shadow_1, NotificationInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined>(NotificationInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined>($state__lsproto.WorkspaceDidChangeWatchedFilesInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                return Server.$go$private$lsp$handleDidChangeWatchedFiles($argument0, $argument1, $argument2);
            });
            registerNotificationHandler$PointerTo_Named_lsproto$SetTraceParams(handlers__shadow_1, NotificationInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined>(NotificationInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined>($state__lsproto.SetTraceInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                return Server.$go$private$lsp$handleSetTrace($argument0, $argument1, $argument2);
            });
            registerNotificationHandler$PointerTo_Named_lsproto$SetLogVerbosityParams(handlers__shadow_1, NotificationInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined>(NotificationInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined>($state__lsproto.CustomSetLogVerbosityInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                return Server.$go$private$lsp$handleSetLogVerbosity($argument0, $argument1, $argument2);
            });
            registerRequestHandler$PointerTo_Named_lsproto$RenameFilesParams$Named_lsproto$WorkspaceEditOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined, WorkspaceEditOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined, WorkspaceEditOrNull__from_lsproto>($state__lsproto.WorkspaceWillRenameFilesInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                WorkspaceEditOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleWillRenameFiles($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentDiagnosticParams$Named_lsproto$RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto> | undefined, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto> | undefined, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto>($state__lsproto.TextDocumentDiagnosticInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto> | undefined): [
                RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleDocumentDiagnostic($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$HoverParams$Named_lsproto$HoverOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<HoverParams__from_lsproto> | undefined, HoverOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<HoverParams__from_lsproto> | undefined, HoverOrNull__from_lsproto>($state__lsproto.TextDocumentHoverInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<HoverParams__from_lsproto> | undefined): [
                HoverOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleHover($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DefinitionParams$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto> | undefined, LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto> | undefined, LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>($state__lsproto.TextDocumentDefinitionInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto> | undefined): [
                LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleDefinition($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$TextDocumentPositionParams$PointerTo_Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto> | undefined, tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto> | undefined, tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined>($state__lsproto.CustomTextDocumentSourceDefinitionInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto> | undefined): [
                tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleSourceDefinition($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$TypeDefinitionParams$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto> | undefined, LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto> | undefined, LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>($state__lsproto.TextDocumentTypeDefinitionInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto> | undefined): [
                LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleTypeDefinition($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$SignatureHelpParams$Named_lsproto$SignatureHelpOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto> | undefined, SignatureHelpOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto> | undefined, SignatureHelpOrNull__from_lsproto>($state__lsproto.TextDocumentSignatureHelpInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto> | undefined): [
                SignatureHelpOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleSignatureHelp($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentFormattingParams$Named_lsproto$TextEditsOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto> | undefined, TextEditsOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto> | undefined, TextEditsOrNull__from_lsproto>($state__lsproto.TextDocumentFormattingInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto> | undefined): [
                TextEditsOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleDocumentFormat($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentRangeFormattingParams$Named_lsproto$TextEditsOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto> | undefined, TextEditsOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto> | undefined, TextEditsOrNull__from_lsproto>($state__lsproto.TextDocumentRangeFormattingInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto> | undefined): [
                TextEditsOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleDocumentRangeFormat($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentOnTypeFormattingParams$Named_lsproto$TextEditsOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto> | undefined, TextEditsOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto> | undefined, TextEditsOrNull__from_lsproto>($state__lsproto.TextDocumentOnTypeFormattingInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto> | undefined): [
                TextEditsOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleDocumentOnTypeFormat($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentSymbolParams$Named_lsproto$SymbolInformationsOrDocumentSymbolsOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto> | undefined, SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto> | undefined, SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto>($state__lsproto.TextDocumentDocumentSymbolInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto> | undefined): [
                SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleDocumentSymbol($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$DocumentHighlightParams$Named_lsproto$DocumentHighlightsOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto> | undefined, DocumentHighlightsOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto> | undefined, DocumentHighlightsOrNull__from_lsproto>($state__lsproto.TextDocumentDocumentHighlightInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto> | undefined): [
                DocumentHighlightsOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleDocumentHighlight($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$MultiDocumentHighlightParams$Named_lsproto$MultiDocumentHighlightsOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto> | undefined, MultiDocumentHighlightsOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto> | undefined, MultiDocumentHighlightsOrNull__from_lsproto>($state__lsproto.CustomTextDocumentMultiDocumentHighlightInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto> | undefined): [
                MultiDocumentHighlightsOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleMultiDocumentHighlight($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$SelectionRangeParams$Named_lsproto$SelectionRangesOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<SelectionRangeParams__from_lsproto> | undefined, SelectionRangesOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<SelectionRangeParams__from_lsproto> | undefined, SelectionRangesOrNull__from_lsproto>($state__lsproto.TextDocumentSelectionRangeInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<SelectionRangeParams__from_lsproto> | undefined): [
                SelectionRangesOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleSelectionRange($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$InlayHintParams$Named_lsproto$InlayHintsOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<InlayHintParams__from_lsproto> | undefined, InlayHintsOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<InlayHintParams__from_lsproto> | undefined, InlayHintsOrNull__from_lsproto>($state__lsproto.TextDocumentInlayHintInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<InlayHintParams__from_lsproto> | undefined): [
                InlayHintsOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleInlayHint($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$CodeLensParams$Named_lsproto$CodeLensesOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto> | undefined, CodeLensesOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto> | undefined, CodeLensesOrNull__from_lsproto>($state__lsproto.TextDocumentCodeLensInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto> | undefined): [
                CodeLensesOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleCodeLens($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$CodeActionParams$Named_lsproto$CommandOrCodeActionArrayOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined, CommandOrCodeActionArrayOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined, CommandOrCodeActionArrayOrNull__from_lsproto>($state__lsproto.TextDocumentCodeActionInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined): [
                CommandOrCodeActionArrayOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleCodeAction($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$CallHierarchyPrepareParams$Named_lsproto$CallHierarchyItemsOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto> | undefined, CallHierarchyItemsOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto> | undefined, CallHierarchyItemsOrNull__from_lsproto>($state__lsproto.TextDocumentPrepareCallHierarchyInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto> | undefined): [
                CallHierarchyItemsOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handlePrepareCallHierarchy($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$FoldingRangeParams$Named_lsproto$FoldingRangesOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto> | undefined, FoldingRangesOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto> | undefined, FoldingRangesOrNull__from_lsproto>($state__lsproto.TextDocumentFoldingRangeInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto> | undefined): [
                FoldingRangesOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleFoldingRange($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$PrepareRenameParams$Named_lsproto$RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto> | undefined, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto> | undefined, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto>($state__lsproto.TextDocumentPrepareRenameInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto> | undefined): [
                RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handlePrepareRename($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$LinkedEditingRangeParams$Named_lsproto$LinkedEditingRangesOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams__from_lsproto> | undefined, LinkedEditingRangesOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams__from_lsproto> | undefined, LinkedEditingRangesOrNull__from_lsproto>($state__lsproto.TextDocumentLinkedEditingRangeInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams__from_lsproto> | undefined): [
                LinkedEditingRangesOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleLinkedEditingRange($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceWithAutoImportsRequestHandler$PointerTo_Named_lsproto$CompletionParams$Named_lsproto$CompletionItemsOrListOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto> | undefined, CompletionItemsOrListOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto> | undefined, CompletionItemsOrListOrNull__from_lsproto>($state__lsproto.TextDocumentCompletionInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto> | undefined): [
                CompletionItemsOrListOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleCompletion($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceWithAutoImportsRequestHandler$PointerTo_Named_lsproto$CodeActionParams$Named_lsproto$CommandOrCodeActionArrayOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined, CommandOrCodeActionArrayOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined, CommandOrCodeActionArrayOrNull__from_lsproto>($state__lsproto.TextDocumentCodeActionInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined): [
                CommandOrCodeActionArrayOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleCodeAction($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$VSOnAutoInsertParams$Named_lsproto$VSOnAutoInsertResponseItemOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams__from_lsproto> | undefined, VSOnAutoInsertResponseItemOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams__from_lsproto> | undefined, VSOnAutoInsertResponseItemOrNull__from_lsproto>($state__lsproto.TextDocumentVSOnAutoInsertInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams__from_lsproto> | undefined): [
                VSOnAutoInsertResponseItemOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleVSOnAutoInsert($argument0, $argument1, $argument2, $argument3);
            });
            registerMultiProjectReferenceRequestHandler$PointerTo_Named_lsproto$ReferenceParams$Named_lsproto$LocationsOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, LocationsOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, LocationsOrNull__from_lsproto>($state__lsproto.TextDocumentReferencesInfo)), ($argument0: LanguageService__from_ls | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, $argument3: CrossProjectOrchestrator__from_ls | undefined): [
                LocationsOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return LanguageService__from_ls.ProvideReferences($argument0, $argument1, $argument2, $argument3);
            });
            registerMultiProjectReferenceRequestHandler$PointerTo_Named_lsproto$ReferenceParams$Named_lsproto$VSReferenceItemsOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, VSReferenceItemsOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, VSReferenceItemsOrNull__from_lsproto>($state__lsproto.TextDocumentVSReferencesInfo)), ($argument0: LanguageService__from_ls | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<ReferenceParams__from_lsproto> | undefined, $argument3: CrossProjectOrchestrator__from_ls | undefined): [
                VSReferenceItemsOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return LanguageService__from_ls.ProvideVSReferences($argument0, $argument1, $argument2, $argument3);
            });
            registerRequestHandler$PointerTo_Named_lsproto$RenameParams$Named_lsproto$WorkspaceEditOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined, WorkspaceEditOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined, WorkspaceEditOrNull__from_lsproto>($state__lsproto.TextDocumentRenameInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                WorkspaceEditOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleRename($argument0, $argument1, $argument2, $argument3);
            });
            registerMultiProjectReferenceRequestHandler$PointerTo_Named_lsproto$ImplementationParams$Named_lsproto$LocationOrLocationsOrDefinitionLinksOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined, LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined, LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto>($state__lsproto.TextDocumentImplementationInfo)), ($argument0: LanguageService__from_ls | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<ImplementationParams__from_lsproto> | undefined, $argument3: CrossProjectOrchestrator__from_ls | undefined): [
                LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return LanguageService__from_ls.ProvideImplementations($argument0, $argument1, $argument2, $argument3);
            });
            registerRequestHandler$PointerTo_Named_lsproto$CallHierarchyIncomingCallsParams$Named_lsproto$CallHierarchyIncomingCallsOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined, CallHierarchyIncomingCallsOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined, CallHierarchyIncomingCallsOrNull__from_lsproto>($state__lsproto.CallHierarchyIncomingCallsInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                CallHierarchyIncomingCallsOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleCallHierarchyIncomingCalls($argument0, $argument1, $argument2, $argument3);
            });
            registerRequestHandler$PointerTo_Named_lsproto$CallHierarchyOutgoingCallsParams$Named_lsproto$CallHierarchyOutgoingCallsOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined, CallHierarchyOutgoingCallsOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined, CallHierarchyOutgoingCallsOrNull__from_lsproto>($state__lsproto.CallHierarchyOutgoingCallsInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                CallHierarchyOutgoingCallsOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleCallHierarchyOutgoingCalls($argument0, $argument1, $argument2, $argument3);
            });
            registerRequestHandler$PointerTo_Named_lsproto$WorkspaceSymbolParams$Named_lsproto$SymbolInformationsOrWorkspaceSymbolsOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined, SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined, SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto>($state__lsproto.WorkspaceSymbolInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleWorkspaceSymbol($argument0, $argument1, $argument2, $argument3);
            });
            registerRequestHandler$PointerTo_Named_lsproto$CompletionItem$PointerTo_Named_lsproto$CompletionItem(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined, tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined, tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>($state__lsproto.CompletionItemResolveInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleCompletionItemResolve($argument0, $argument1, $argument2, $argument3);
            });
            registerRequestHandler$PointerTo_Named_lsproto$CodeLens$PointerTo_Named_lsproto$CodeLens(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined, tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined, tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined>($state__lsproto.CodeLensResolveInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleCodeLensResolve($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$SemanticTokensParams$Named_lsproto$SemanticTokensOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto> | undefined, SemanticTokensOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto> | undefined, SemanticTokensOrNull__from_lsproto>($state__lsproto.TextDocumentSemanticTokensFullInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto> | undefined): [
                SemanticTokensOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleSemanticTokensFull($argument0, $argument1, $argument2, $argument3);
            });
            registerLanguageServiceDocumentRequestHandler$PointerTo_Named_lsproto$SemanticTokensRangeParams$Named_lsproto$SemanticTokensOrNull(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto> | undefined, SemanticTokensOrNull__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto> | undefined, SemanticTokensOrNull__from_lsproto>($state__lsproto.TextDocumentSemanticTokensRangeInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: LanguageService__from_ls | undefined, $argument3: tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto> | undefined): [
                SemanticTokensOrNull__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleSemanticTokensRange($argument0, $argument1, $argument2, $argument3);
            });
            registerRequestHandler$Named_lsproto$NoParams$Named_lsproto$Null(handlers__shadow_1, RequestInfo__from_lsproto.$copy<NoParams__from_lsproto, Null__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<NoParams__from_lsproto, Null__from_lsproto>($state__lsproto.CustomRunGCInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: NoParams__from_lsproto, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                Null__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleRunGC($argument0, $argument1, $argument2, $argument3);
            });
            registerRequestHandler$PointerTo_Named_lsproto$ProfileParams$PointerTo_Named_lsproto$ProfileResult(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, {
                value: ProfileResult__from_lsproto;
            } | undefined>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, {
                value: ProfileResult__from_lsproto;
            } | undefined>($state__lsproto.CustomSaveHeapProfileInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                {
                    value: ProfileResult__from_lsproto;
                } | undefined,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleSaveHeapProfile($argument0, $argument1, $argument2, $argument3);
            });
            registerRequestHandler$PointerTo_Named_lsproto$ProfileParams$PointerTo_Named_lsproto$ProfileResult(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, {
                value: ProfileResult__from_lsproto;
            } | undefined>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, {
                value: ProfileResult__from_lsproto;
            } | undefined>($state__lsproto.CustomSaveAllocProfileInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                {
                    value: ProfileResult__from_lsproto;
                } | undefined,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleSaveAllocProfile($argument0, $argument1, $argument2, $argument3);
            });
            registerRequestHandler$PointerTo_Named_lsproto$ProfileParams$Named_lsproto$Null(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, Null__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, Null__from_lsproto>($state__lsproto.CustomStartCPUProfileInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                Null__from_lsproto,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleStartCPUProfile($argument0, $argument1, $argument2, $argument3);
            });
            registerRequestHandler$Named_lsproto$NoParams$PointerTo_Named_lsproto$ProfileResult(handlers__shadow_1, RequestInfo__from_lsproto.$copy<NoParams__from_lsproto, {
                value: ProfileResult__from_lsproto;
            } | undefined>(RequestInfo__from_lsproto.$fromStorage<NoParams__from_lsproto, {
                value: ProfileResult__from_lsproto;
            } | undefined>($state__lsproto.CustomStopCPUProfileInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: NoParams__from_lsproto, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                {
                    value: ProfileResult__from_lsproto;
                } | undefined,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleStopCPUProfile($argument0, $argument1, $argument2, $argument3);
            });
            registerRequestHandler$PointerTo_Named_lsproto$InitializeAPISessionParams$PointerTo_Named_lsproto$InitializeAPISessionResult(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined, {
                value: InitializeAPISessionResult__from_lsproto;
            } | undefined>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined, {
                value: InitializeAPISessionResult__from_lsproto;
            } | undefined>($state__lsproto.CustomInitializeAPISessionInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                {
                    value: InitializeAPISessionResult__from_lsproto;
                } | undefined,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleInitializeAPISession($argument0, $argument1, $argument2, $argument3);
            });
            registerRequestHandler$PointerTo_Named_lsproto$ProjectInfoParams$PointerTo_Named_lsproto$ProjectInfoResult(handlers__shadow_1, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined, {
                value: ProjectInfoResult__from_lsproto;
            } | undefined>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined, {
                value: ProjectInfoResult__from_lsproto;
            } | undefined>($state__lsproto.CustomProjectInfoInfo)), ($argument0: {
                value: Server;
            } | undefined, $argument1: GoInterface | undefined, $argument2: tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined, $argument3: {
                value: RequestMessage__from_lsproto;
            } | undefined): [
                {
                    value: ProjectInfoResult__from_lsproto;
                } | undefined,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ] => {
                return Server.$go$private$lsp$handleProjectInfo($argument0, $argument1, $argument2, $argument3);
            });
            return handlers__shadow_1;
        });
    }
}
export { NewServer, Reader, Reader$contract, Reader$is, Server, ServerOptions, ToReader, ToWriter, Writer, Writer$contract, Writer$is } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
