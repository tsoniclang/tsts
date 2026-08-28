import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NoParams, NoParams$Storage as NoParams__from_lsproto$Storage, Null, Null$Storage as Null__from_lsproto$Storage } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import type { ApplyWorkspaceEditParams, ApplyWorkspaceEditResult, CallHierarchyIncomingCallsOrNull, CallHierarchyIncomingCallsOrNull$Storage as CallHierarchyIncomingCallsOrNull__from_lsproto$Storage, CallHierarchyIncomingCallsParams, CallHierarchyItemsOrNull, CallHierarchyItemsOrNull$Storage as CallHierarchyItemsOrNull__from_lsproto$Storage, CallHierarchyOutgoingCallsOrNull, CallHierarchyOutgoingCallsOrNull$Storage as CallHierarchyOutgoingCallsOrNull__from_lsproto$Storage, CallHierarchyOutgoingCallsParams, CallHierarchyPrepareParams, CancelParams, CodeAction, CodeActionParams, CodeLens, CodeLensParams, CodeLensesOrNull, CodeLensesOrNull$Storage as CodeLensesOrNull__from_lsproto$Storage, ColorInformation, ColorPresentation, ColorPresentationParams, CommandOrCodeActionArrayOrNull, CommandOrCodeActionArrayOrNull$Storage as CommandOrCodeActionArrayOrNull__from_lsproto$Storage, CompletionItem, CompletionItemsOrListOrNull, CompletionItemsOrListOrNull$Storage as CompletionItemsOrListOrNull__from_lsproto$Storage, CompletionParams, ConfigurationParams, CreateFilesParams, DeclarationParams, DefinitionParams, DeleteFilesParams, DidChangeConfigurationParams, DidChangeTextDocumentParams, DidChangeWatchedFilesParams, DidChangeWorkspaceFoldersParams, DidCloseTextDocumentParams, DidOpenTextDocumentParams, DidSaveTextDocumentParams, DocumentColorParams, DocumentDiagnosticParams, DocumentFormattingParams, DocumentHighlightParams, DocumentHighlightsOrNull, DocumentHighlightsOrNull$Storage as DocumentHighlightsOrNull__from_lsproto$Storage, DocumentLink, DocumentLinkParams, DocumentLinksOrNull, DocumentLinksOrNull$Storage as DocumentLinksOrNull__from_lsproto$Storage, DocumentOnTypeFormattingParams, DocumentRangeFormattingParams, DocumentRangesFormattingParams, DocumentSymbolParams, ExecuteCommandParams, FoldingRangeParams, FoldingRangesOrNull, FoldingRangesOrNull$Storage as FoldingRangesOrNull__from_lsproto$Storage, HoverOrNull, HoverOrNull$Storage as HoverOrNull__from_lsproto$Storage, HoverParams, ImplementationParams, InitializeAPISessionParams, InitializeAPISessionResult, InitializeParams, InitializeResult, InitializedParams, InlayHint, InlayHintParams, InlayHintsOrNull, InlayHintsOrNull$Storage as InlayHintsOrNull__from_lsproto$Storage, InlineCompletionListOrItemsOrNull, InlineCompletionListOrItemsOrNull$Storage as InlineCompletionListOrItemsOrNull__from_lsproto$Storage, InlineCompletionParams, InlineValueParams, InlineValuesOrNull, InlineValuesOrNull$Storage as InlineValuesOrNull__from_lsproto$Storage, LSPAnyOrNull, LSPAnyOrNull$Storage as LSPAnyOrNull__from_lsproto$Storage, LinkedEditingRangeParams, LinkedEditingRangesOrNull, LinkedEditingRangesOrNull$Storage as LinkedEditingRangesOrNull__from_lsproto$Storage, LocationOrLocationsOrDeclarationLinksOrNull, LocationOrLocationsOrDeclarationLinksOrNull$Storage as LocationOrLocationsOrDeclarationLinksOrNull__from_lsproto$Storage, LocationOrLocationsOrDefinitionLinksOrNull, LocationOrLocationsOrDefinitionLinksOrNull$Storage as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto$Storage, LocationsOrNull, LocationsOrNull$Storage as LocationsOrNull__from_lsproto$Storage, LogMessageParams, LogTraceParams, MessageActionItemOrNull, MessageActionItemOrNull$Storage as MessageActionItemOrNull__from_lsproto$Storage, MonikerParams, MonikersOrNull, MonikersOrNull$Storage as MonikersOrNull__from_lsproto$Storage, MultiDocumentHighlightParams, MultiDocumentHighlightsOrNull, MultiDocumentHighlightsOrNull$Storage as MultiDocumentHighlightsOrNull__from_lsproto$Storage, PrepareRenameParams, ProfileParams, ProfileResult, ProgressParams, ProjectInfoParams, ProjectInfoResult, PublishDiagnosticsParams, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull$Storage as RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto$Storage, ReferenceParams, RegistrationParams, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport$Storage as RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto$Storage, RenameFilesParams, RenameParams, RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull, RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull$Storage as RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto$Storage, SelectionRangeParams, SelectionRangesOrNull, SelectionRangesOrNull$Storage as SelectionRangesOrNull__from_lsproto$Storage, SemanticTokensDeltaParams, SemanticTokensOrNull, SemanticTokensOrNull$Storage as SemanticTokensOrNull__from_lsproto$Storage, SemanticTokensOrSemanticTokensDeltaOrNull, SemanticTokensOrSemanticTokensDeltaOrNull$Storage as SemanticTokensOrSemanticTokensDeltaOrNull__from_lsproto$Storage, SemanticTokensParams, SemanticTokensRangeParams, SetLogVerbosityParams, SetTraceParams, ShowDocumentParams, ShowDocumentResult, ShowMessageParams, ShowMessageRequestParams, SignatureHelpOrNull, SignatureHelpOrNull$Storage as SignatureHelpOrNull__from_lsproto$Storage, SignatureHelpParams, SymbolInformationsOrDocumentSymbolsOrNull, SymbolInformationsOrDocumentSymbolsOrNull$Storage as SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto$Storage, SymbolInformationsOrWorkspaceSymbolsOrNull, SymbolInformationsOrWorkspaceSymbolsOrNull$Storage as SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto$Storage, TextDocumentContentParams, TextDocumentContentRefreshParams, TextDocumentContentResult, TextDocumentPositionParams, TextEditsOrNull, TextEditsOrNull$Storage as TextEditsOrNull__from_lsproto$Storage, TypeDefinitionParams, TypeHierarchyItemsOrNull, TypeHierarchyItemsOrNull$Storage as TypeHierarchyItemsOrNull__from_lsproto$Storage, TypeHierarchyPrepareParams, TypeHierarchySubtypesParams, TypeHierarchySupertypesParams, UnregistrationParams, VSOnAutoInsertParams, VSOnAutoInsertResponseItemOrNull, VSOnAutoInsertResponseItemOrNull$Storage as VSOnAutoInsertResponseItemOrNull__from_lsproto$Storage, VSReferenceItemsOrNull, VSReferenceItemsOrNull$Storage as VSReferenceItemsOrNull__from_lsproto$Storage, WillSaveTextDocumentParams, WorkDoneProgressCancelParams, WorkDoneProgressCreateParams, WorkspaceDiagnosticParams, WorkspaceDiagnosticReport, WorkspaceEditOrNull, WorkspaceEditOrNull$Storage as WorkspaceEditOrNull__from_lsproto$Storage, WorkspaceFoldersOrNull, WorkspaceFoldersOrNull$Storage as WorkspaceFoldersOrNull__from_lsproto$Storage, WorkspaceSymbol, WorkspaceSymbolParams } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { gostring, uint16 } from "@gotots/runtime/scalars.js";
import { CodeActionKindSourceRemoveUnusedImports$constant, CodeActionKindSourceSortImports$constant, NotificationInfo, RequestInfo } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import { AddAsTypeOnlyAllowed$constant, AddAsTypeOnlyNotAllowed$constant, AddAsTypeOnlyRequired$constant, AutoImportFixKindAddNew$constant, AutoImportFixKindAddToExisting$constant, AutoImportFixKindJsdocTypeImport$constant, AutoImportFixKindPromoteTypeOnly$constant, AutoImportFixKindUseNamespace$constant, ClassificationTypeNameClassName$constant, ClassificationTypeNameEnumName$constant, ClassificationTypeNameFieldName$constant, ClassificationTypeNameIdentifier$constant, ClassificationTypeNameInterfaceName$constant, ClassificationTypeNameKeyword$constant, ClassificationTypeNameLocalName$constant, ClassificationTypeNameMethodName$constant, ClassificationTypeNameModuleName$constant, ClassificationTypeNameOperator$constant, ClassificationTypeNameParameterName$constant, ClassificationTypeNamePropertyName$constant, ClassificationTypeNamePunctuation$constant, ClassificationTypeNameString$constant, ClassificationTypeNameText$constant, ClassificationTypeNameTypeParameterName$constant, ClassificationTypeNameWhiteSpace$constant, CodeActionKindQuickFix$constant, CodeActionKindSourceFixAll$constant, CodeActionKindSourceOrganizeImports$constant, CodeLensKindImplementations$constant, CodeLensKindReferences$constant, CompletionItemKindClass$constant, CompletionItemKindConstant$constant, CompletionItemKindEnum$constant, CompletionItemKindEnumMember$constant, CompletionItemKindField$constant, CompletionItemKindFile$constant, CompletionItemKindFolder$constant, CompletionItemKindFunction$constant, CompletionItemKindInterface$constant, CompletionItemKindKeyword$constant, CompletionItemKindMethod$constant, CompletionItemKindModule$constant, CompletionItemKindProperty$constant, CompletionItemKindSnippet$constant, CompletionItemKindText$constant, CompletionItemKindVariable$constant, CompletionItemTagDeprecated$constant, DiagnosticSeverityError$constant, DiagnosticSeverityHint$constant, DiagnosticSeverityInformation$constant, DiagnosticSeverityWarning$constant, DiagnosticTagDeprecated$constant, DiagnosticTagUnnecessary$constant, DocumentHighlightKindRead$constant, DocumentHighlightKindWrite$constant, ErrorCodeContentModified$constant, ErrorCodeInternalError$constant, ErrorCodeInvalidParams$constant, ErrorCodeInvalidRequest$constant, ErrorCodeRequestCancelled$constant, ErrorCodeRequestFailed$constant, ErrorCodeServerNotInitialized$constant, FileChangeTypeChanged$constant, FileChangeTypeCreated$constant, FileChangeTypeDeleted$constant, FoldingRangeKindComment$constant, FoldingRangeKindImports$constant, FoldingRangeKindRegion$constant, ImportKindCommonJS$constant, ImportKindDefault$constant, ImportKindNamed$constant, ImportKindNamespace$constant, InlayHintKindParameter$constant, InlayHintKindType$constant, InsertTextFormatSnippet$constant, LogVerbosityDebug$constant, LogVerbosityError$constant, LogVerbosityInfo$constant, LogVerbosityOff$constant, LogVerbosityTrace$constant, LogVerbosityWarning$constant, MarkupKindMarkdown$constant, MarkupKindPlainText$constant, MessageTypeDebug$constant, MessageTypeError$constant, MessageTypeInfo$constant, MessageTypeWarning$constant, MethodCallHierarchyIncomingCalls$constant, MethodCallHierarchyOutgoingCalls$constant, MethodCancelRequest$constant, MethodClientRegisterCapability$constant, MethodClientUnregisterCapability$constant, MethodCodeActionResolve$constant, MethodCodeLensResolve$constant, MethodCompletionItemResolve$constant, MethodCustomInitializeAPISession$constant, MethodCustomProjectInfo$constant, MethodCustomRunGC$constant, MethodCustomSaveAllocProfile$constant, MethodCustomSaveHeapProfile$constant, MethodCustomSetLogVerbosity$constant, MethodCustomStartCPUProfile$constant, MethodCustomStopCPUProfile$constant, MethodCustomTextDocumentMultiDocumentHighlight$constant, MethodCustomTextDocumentSourceDefinition$constant, MethodDocumentLinkResolve$constant, MethodExit$constant, MethodInitialize$constant, MethodInitialized$constant, MethodInlayHintResolve$constant, MethodLogTrace$constant, MethodProgress$constant, MethodSetTrace$constant, MethodShutdown$constant, MethodTelemetryEvent$constant, MethodTextDocumentCodeAction$constant, MethodTextDocumentCodeLens$constant, MethodTextDocumentColorPresentation$constant, MethodTextDocumentCompletion$constant, MethodTextDocumentDeclaration$constant, MethodTextDocumentDefinition$constant, MethodTextDocumentDiagnostic$constant, MethodTextDocumentDidChange$constant, MethodTextDocumentDidClose$constant, MethodTextDocumentDidOpen$constant, MethodTextDocumentDidSave$constant, MethodTextDocumentDocumentColor$constant, MethodTextDocumentDocumentHighlight$constant, MethodTextDocumentDocumentLink$constant, MethodTextDocumentDocumentSymbol$constant, MethodTextDocumentFoldingRange$constant, MethodTextDocumentFormatting$constant, MethodTextDocumentHover$constant, MethodTextDocumentImplementation$constant, MethodTextDocumentInlayHint$constant, MethodTextDocumentInlineCompletion$constant, MethodTextDocumentInlineValue$constant, MethodTextDocumentLinkedEditingRange$constant, MethodTextDocumentMoniker$constant, MethodTextDocumentOnTypeFormatting$constant, MethodTextDocumentPrepareCallHierarchy$constant, MethodTextDocumentPrepareRename$constant, MethodTextDocumentPrepareTypeHierarchy$constant, MethodTextDocumentPublishDiagnostics$constant, MethodTextDocumentRangeFormatting$constant, MethodTextDocumentRangesFormatting$constant, MethodTextDocumentReferences$constant, MethodTextDocumentRename$constant, MethodTextDocumentSelectionRange$constant, MethodTextDocumentSemanticTokens$constant, MethodTextDocumentSemanticTokensFull$constant, MethodTextDocumentSemanticTokensFullDelta$constant, MethodTextDocumentSemanticTokensRange$constant, MethodTextDocumentSignatureHelp$constant, MethodTextDocumentTypeDefinition$constant, MethodTextDocumentVSOnAutoInsert$constant, MethodTextDocumentVSReferences$constant, MethodTextDocumentWillSave$constant, MethodTextDocumentWillSaveWaitUntil$constant, MethodTypeHierarchySubtypes$constant, MethodTypeHierarchySupertypes$constant, MethodWindowLogMessage$constant, MethodWindowShowDocument$constant, MethodWindowShowMessage$constant, MethodWindowShowMessageRequest$constant, MethodWindowWorkDoneProgressCancel$constant, MethodWindowWorkDoneProgressCreate$constant, MethodWorkspaceApplyEdit$constant, MethodWorkspaceCodeLensRefresh$constant, MethodWorkspaceConfiguration$constant, MethodWorkspaceDiagnostic$constant, MethodWorkspaceDiagnosticRefresh$constant, MethodWorkspaceDidChangeConfiguration$constant, MethodWorkspaceDidChangeWatchedFiles$constant, MethodWorkspaceDidChangeWorkspaceFolders$constant, MethodWorkspaceDidCreateFiles$constant, MethodWorkspaceDidDeleteFiles$constant, MethodWorkspaceDidRenameFiles$constant, MethodWorkspaceExecuteCommand$constant, MethodWorkspaceFoldingRangeRefresh$constant, MethodWorkspaceInlayHintRefresh$constant, MethodWorkspaceInlineValueRefresh$constant, MethodWorkspaceSemanticTokensRefresh$constant, MethodWorkspaceSymbol$constant, MethodWorkspaceSymbolResolve$constant, MethodWorkspaceTextDocumentContent$constant, MethodWorkspaceTextDocumentContentRefresh$constant, MethodWorkspaceWillCreateFiles$constant, MethodWorkspaceWillDeleteFiles$constant, MethodWorkspaceWillRenameFiles$constant, MethodWorkspaceWorkspaceFolders$constant, PositionEncodingKindUTF16$constant, PositionEncodingKindUTF8$constant, ResourceOperationKindRename$constant, SemanticTokenModifierAbstract$constant, SemanticTokenModifierAsync$constant, SemanticTokenModifierDeclaration$constant, SemanticTokenModifierDefaultLibrary$constant, SemanticTokenModifierDefinition$constant, SemanticTokenModifierDeprecated$constant, SemanticTokenModifierDocumentation$constant, SemanticTokenModifierModification$constant, SemanticTokenModifierReadonly$constant, SemanticTokenModifierStatic$constant, SemanticTokenTypeClass$constant, SemanticTokenTypeComment$constant, SemanticTokenTypeDecorator$constant, SemanticTokenTypeEnum$constant, SemanticTokenTypeEnumMember$constant, SemanticTokenTypeEvent$constant, SemanticTokenTypeFunction$constant, SemanticTokenTypeInterface$constant, SemanticTokenTypeKeyword$constant, SemanticTokenTypeLabel$constant, SemanticTokenTypeMacro$constant, SemanticTokenTypeMethod$constant, SemanticTokenTypeNamespace$constant, SemanticTokenTypeNumber$constant, SemanticTokenTypeOperator$constant, SemanticTokenTypeParameter$constant, SemanticTokenTypeProperty$constant, SemanticTokenTypeRegexp$constant, SemanticTokenTypeString$constant, SemanticTokenTypeStruct$constant, SemanticTokenTypeType$constant, SemanticTokenTypeTypeParameter$constant, SemanticTokenTypeVariable$constant, SignatureHelpTriggerKindContentChange$constant, SignatureHelpTriggerKindInvoked$constant, SignatureHelpTriggerKindTriggerCharacter$constant, StringLiteralBegin, StringLiteralClassifiedTextElement, StringLiteralClassifiedTextRun, StringLiteralCreate, StringLiteralDelete, StringLiteralEnd, StringLiteralError, StringLiteralFull, StringLiteralLanguageServerErrorResponse, StringLiteralLanguageServerPerformanceStats, StringLiteralLanguageServerProjectInfo, StringLiteralRename, StringLiteralReport, StringLiteralSnippet, StringLiteralUnchanged, StringLiteralUsage, SymbolKindClass$constant, SymbolKindConstructor$constant, SymbolKindEnum$constant, SymbolKindEnumMember$constant, SymbolKindFile$constant, SymbolKindFunction$constant, SymbolKindInterface$constant, SymbolKindMethod$constant, SymbolKindModule$constant, SymbolKindNamespace$constant, SymbolKindProperty$constant, SymbolKindTypeParameter$constant, SymbolKindVariable$constant, TextDocumentSyncKindIncremental$constant, VSReferenceKindRead$constant, VSReferenceKindUnknown$constant, VSReferenceKindWrite$constant, WatchKindCreate$constant, WatchKindDelete$constant } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import { $state } from "./state.js";
import { GoArray, goArrayAllocate } from "@gotots/runtime/array.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    AddAsTypeOnlyAllowed = AddAsTypeOnlyAllowed$constant();
    AddAsTypeOnlyNotAllowed = AddAsTypeOnlyNotAllowed$constant();
    AddAsTypeOnlyRequired = AddAsTypeOnlyRequired$constant();
    AutoImportFixKindAddNew = AutoImportFixKindAddNew$constant();
    AutoImportFixKindAddToExisting = AutoImportFixKindAddToExisting$constant();
    AutoImportFixKindJsdocTypeImport = AutoImportFixKindJsdocTypeImport$constant();
    AutoImportFixKindPromoteTypeOnly = AutoImportFixKindPromoteTypeOnly$constant();
    AutoImportFixKindUseNamespace = AutoImportFixKindUseNamespace$constant();
    ClassificationTypeNameClassName = ClassificationTypeNameClassName$constant();
    ClassificationTypeNameEnumName = ClassificationTypeNameEnumName$constant();
    ClassificationTypeNameFieldName = ClassificationTypeNameFieldName$constant();
    ClassificationTypeNameIdentifier = ClassificationTypeNameIdentifier$constant();
    ClassificationTypeNameInterfaceName = ClassificationTypeNameInterfaceName$constant();
    ClassificationTypeNameKeyword = ClassificationTypeNameKeyword$constant();
    ClassificationTypeNameLocalName = ClassificationTypeNameLocalName$constant();
    ClassificationTypeNameMethodName = ClassificationTypeNameMethodName$constant();
    ClassificationTypeNameModuleName = ClassificationTypeNameModuleName$constant();
    ClassificationTypeNameOperator = ClassificationTypeNameOperator$constant();
    ClassificationTypeNameParameterName = ClassificationTypeNameParameterName$constant();
    ClassificationTypeNamePropertyName = ClassificationTypeNamePropertyName$constant();
    ClassificationTypeNamePunctuation = ClassificationTypeNamePunctuation$constant();
    ClassificationTypeNameString = ClassificationTypeNameString$constant();
    ClassificationTypeNameText = ClassificationTypeNameText$constant();
    ClassificationTypeNameTypeParameterName = ClassificationTypeNameTypeParameterName$constant();
    ClassificationTypeNameWhiteSpace = ClassificationTypeNameWhiteSpace$constant();
    CodeActionKindQuickFix = CodeActionKindQuickFix$constant();
    CodeActionKindSourceFixAll = CodeActionKindSourceFixAll$constant();
    CodeActionKindSourceOrganizeImports = CodeActionKindSourceOrganizeImports$constant();
    CodeActionKindSourceRemoveUnusedImports = CodeActionKindSourceRemoveUnusedImports$constant();
    CodeActionKindSourceSortImports = CodeActionKindSourceSortImports$constant();
    CodeLensKindImplementations = CodeLensKindImplementations$constant();
    CodeLensKindReferences = CodeLensKindReferences$constant();
    CompletionItemKindClass = CompletionItemKindClass$constant();
    CompletionItemKindConstant = CompletionItemKindConstant$constant();
    CompletionItemKindEnum = CompletionItemKindEnum$constant();
    CompletionItemKindEnumMember = CompletionItemKindEnumMember$constant();
    CompletionItemKindField = CompletionItemKindField$constant();
    CompletionItemKindFile = CompletionItemKindFile$constant();
    CompletionItemKindFolder = CompletionItemKindFolder$constant();
    CompletionItemKindFunction = CompletionItemKindFunction$constant();
    CompletionItemKindInterface = CompletionItemKindInterface$constant();
    CompletionItemKindKeyword = CompletionItemKindKeyword$constant();
    CompletionItemKindMethod = CompletionItemKindMethod$constant();
    CompletionItemKindModule = CompletionItemKindModule$constant();
    CompletionItemKindProperty = CompletionItemKindProperty$constant();
    CompletionItemKindSnippet = CompletionItemKindSnippet$constant();
    CompletionItemKindText = CompletionItemKindText$constant();
    CompletionItemKindVariable = CompletionItemKindVariable$constant();
    CompletionItemTagDeprecated = CompletionItemTagDeprecated$constant();
    DiagnosticSeverityError = DiagnosticSeverityError$constant();
    DiagnosticSeverityHint = DiagnosticSeverityHint$constant();
    DiagnosticSeverityInformation = DiagnosticSeverityInformation$constant();
    DiagnosticSeverityWarning = DiagnosticSeverityWarning$constant();
    DiagnosticTagDeprecated = DiagnosticTagDeprecated$constant();
    DiagnosticTagUnnecessary = DiagnosticTagUnnecessary$constant();
    DocumentHighlightKindRead = DocumentHighlightKindRead$constant();
    DocumentHighlightKindWrite = DocumentHighlightKindWrite$constant();
    ErrorCodeContentModified = ErrorCodeContentModified$constant();
    ErrorCodeInternalError = ErrorCodeInternalError$constant();
    ErrorCodeInvalidParams = ErrorCodeInvalidParams$constant();
    ErrorCodeInvalidRequest = ErrorCodeInvalidRequest$constant();
    ErrorCodeRequestCancelled = ErrorCodeRequestCancelled$constant();
    ErrorCodeRequestFailed = ErrorCodeRequestFailed$constant();
    ErrorCodeServerNotInitialized = ErrorCodeServerNotInitialized$constant();
    FileChangeTypeChanged = FileChangeTypeChanged$constant();
    FileChangeTypeCreated = FileChangeTypeCreated$constant();
    FileChangeTypeDeleted = FileChangeTypeDeleted$constant();
    FoldingRangeKindComment = FoldingRangeKindComment$constant();
    FoldingRangeKindImports = FoldingRangeKindImports$constant();
    FoldingRangeKindRegion = FoldingRangeKindRegion$constant();
    ImportKindCommonJS = ImportKindCommonJS$constant();
    ImportKindDefault = ImportKindDefault$constant();
    ImportKindNamed = ImportKindNamed$constant();
    ImportKindNamespace = ImportKindNamespace$constant();
    InlayHintKindParameter = InlayHintKindParameter$constant();
    InlayHintKindType = InlayHintKindType$constant();
    InsertTextFormatSnippet = InsertTextFormatSnippet$constant();
    LogVerbosityDebug = LogVerbosityDebug$constant();
    LogVerbosityError = LogVerbosityError$constant();
    LogVerbosityInfo = LogVerbosityInfo$constant();
    LogVerbosityOff = LogVerbosityOff$constant();
    LogVerbosityTrace = LogVerbosityTrace$constant();
    LogVerbosityWarning = LogVerbosityWarning$constant();
    MarkupKindMarkdown = MarkupKindMarkdown$constant();
    MarkupKindPlainText = MarkupKindPlainText$constant();
    MessageTypeDebug = MessageTypeDebug$constant();
    MessageTypeError = MessageTypeError$constant();
    MessageTypeInfo = MessageTypeInfo$constant();
    MessageTypeWarning = MessageTypeWarning$constant();
    MethodCallHierarchyIncomingCalls = MethodCallHierarchyIncomingCalls$constant();
    MethodCallHierarchyOutgoingCalls = MethodCallHierarchyOutgoingCalls$constant();
    MethodCancelRequest = MethodCancelRequest$constant();
    MethodClientRegisterCapability = MethodClientRegisterCapability$constant();
    MethodClientUnregisterCapability = MethodClientUnregisterCapability$constant();
    MethodCodeActionResolve = MethodCodeActionResolve$constant();
    MethodCodeLensResolve = MethodCodeLensResolve$constant();
    MethodCompletionItemResolve = MethodCompletionItemResolve$constant();
    MethodCustomInitializeAPISession = MethodCustomInitializeAPISession$constant();
    MethodCustomProjectInfo = MethodCustomProjectInfo$constant();
    MethodCustomRunGC = MethodCustomRunGC$constant();
    MethodCustomSaveAllocProfile = MethodCustomSaveAllocProfile$constant();
    MethodCustomSaveHeapProfile = MethodCustomSaveHeapProfile$constant();
    MethodCustomSetLogVerbosity = MethodCustomSetLogVerbosity$constant();
    MethodCustomStartCPUProfile = MethodCustomStartCPUProfile$constant();
    MethodCustomStopCPUProfile = MethodCustomStopCPUProfile$constant();
    MethodCustomTextDocumentMultiDocumentHighlight = MethodCustomTextDocumentMultiDocumentHighlight$constant();
    MethodCustomTextDocumentSourceDefinition = MethodCustomTextDocumentSourceDefinition$constant();
    MethodDocumentLinkResolve = MethodDocumentLinkResolve$constant();
    MethodExit = MethodExit$constant();
    MethodInitialize = MethodInitialize$constant();
    MethodInitialized = MethodInitialized$constant();
    MethodInlayHintResolve = MethodInlayHintResolve$constant();
    MethodLogTrace = MethodLogTrace$constant();
    MethodProgress = MethodProgress$constant();
    MethodSetTrace = MethodSetTrace$constant();
    MethodShutdown = MethodShutdown$constant();
    MethodTelemetryEvent = MethodTelemetryEvent$constant();
    MethodTextDocumentCodeAction = MethodTextDocumentCodeAction$constant();
    MethodTextDocumentCodeLens = MethodTextDocumentCodeLens$constant();
    MethodTextDocumentColorPresentation = MethodTextDocumentColorPresentation$constant();
    MethodTextDocumentCompletion = MethodTextDocumentCompletion$constant();
    MethodTextDocumentDeclaration = MethodTextDocumentDeclaration$constant();
    MethodTextDocumentDefinition = MethodTextDocumentDefinition$constant();
    MethodTextDocumentDiagnostic = MethodTextDocumentDiagnostic$constant();
    MethodTextDocumentDidChange = MethodTextDocumentDidChange$constant();
    MethodTextDocumentDidClose = MethodTextDocumentDidClose$constant();
    MethodTextDocumentDidOpen = MethodTextDocumentDidOpen$constant();
    MethodTextDocumentDidSave = MethodTextDocumentDidSave$constant();
    MethodTextDocumentDocumentColor = MethodTextDocumentDocumentColor$constant();
    MethodTextDocumentDocumentHighlight = MethodTextDocumentDocumentHighlight$constant();
    MethodTextDocumentDocumentLink = MethodTextDocumentDocumentLink$constant();
    MethodTextDocumentDocumentSymbol = MethodTextDocumentDocumentSymbol$constant();
    MethodTextDocumentFoldingRange = MethodTextDocumentFoldingRange$constant();
    MethodTextDocumentFormatting = MethodTextDocumentFormatting$constant();
    MethodTextDocumentHover = MethodTextDocumentHover$constant();
    MethodTextDocumentImplementation = MethodTextDocumentImplementation$constant();
    MethodTextDocumentInlayHint = MethodTextDocumentInlayHint$constant();
    MethodTextDocumentInlineCompletion = MethodTextDocumentInlineCompletion$constant();
    MethodTextDocumentInlineValue = MethodTextDocumentInlineValue$constant();
    MethodTextDocumentLinkedEditingRange = MethodTextDocumentLinkedEditingRange$constant();
    MethodTextDocumentMoniker = MethodTextDocumentMoniker$constant();
    MethodTextDocumentOnTypeFormatting = MethodTextDocumentOnTypeFormatting$constant();
    MethodTextDocumentPrepareCallHierarchy = MethodTextDocumentPrepareCallHierarchy$constant();
    MethodTextDocumentPrepareRename = MethodTextDocumentPrepareRename$constant();
    MethodTextDocumentPrepareTypeHierarchy = MethodTextDocumentPrepareTypeHierarchy$constant();
    MethodTextDocumentPublishDiagnostics = MethodTextDocumentPublishDiagnostics$constant();
    MethodTextDocumentRangeFormatting = MethodTextDocumentRangeFormatting$constant();
    MethodTextDocumentRangesFormatting = MethodTextDocumentRangesFormatting$constant();
    MethodTextDocumentReferences = MethodTextDocumentReferences$constant();
    MethodTextDocumentRename = MethodTextDocumentRename$constant();
    MethodTextDocumentSelectionRange = MethodTextDocumentSelectionRange$constant();
    MethodTextDocumentSemanticTokens = MethodTextDocumentSemanticTokens$constant();
    MethodTextDocumentSemanticTokensFull = MethodTextDocumentSemanticTokensFull$constant();
    MethodTextDocumentSemanticTokensFullDelta = MethodTextDocumentSemanticTokensFullDelta$constant();
    MethodTextDocumentSemanticTokensRange = MethodTextDocumentSemanticTokensRange$constant();
    MethodTextDocumentSignatureHelp = MethodTextDocumentSignatureHelp$constant();
    MethodTextDocumentTypeDefinition = MethodTextDocumentTypeDefinition$constant();
    MethodTextDocumentVSOnAutoInsert = MethodTextDocumentVSOnAutoInsert$constant();
    MethodTextDocumentVSReferences = MethodTextDocumentVSReferences$constant();
    MethodTextDocumentWillSave = MethodTextDocumentWillSave$constant();
    MethodTextDocumentWillSaveWaitUntil = MethodTextDocumentWillSaveWaitUntil$constant();
    MethodTypeHierarchySubtypes = MethodTypeHierarchySubtypes$constant();
    MethodTypeHierarchySupertypes = MethodTypeHierarchySupertypes$constant();
    MethodWindowLogMessage = MethodWindowLogMessage$constant();
    MethodWindowShowDocument = MethodWindowShowDocument$constant();
    MethodWindowShowMessage = MethodWindowShowMessage$constant();
    MethodWindowShowMessageRequest = MethodWindowShowMessageRequest$constant();
    MethodWindowWorkDoneProgressCancel = MethodWindowWorkDoneProgressCancel$constant();
    MethodWindowWorkDoneProgressCreate = MethodWindowWorkDoneProgressCreate$constant();
    MethodWorkspaceApplyEdit = MethodWorkspaceApplyEdit$constant();
    MethodWorkspaceCodeLensRefresh = MethodWorkspaceCodeLensRefresh$constant();
    MethodWorkspaceConfiguration = MethodWorkspaceConfiguration$constant();
    MethodWorkspaceDiagnostic = MethodWorkspaceDiagnostic$constant();
    MethodWorkspaceDiagnosticRefresh = MethodWorkspaceDiagnosticRefresh$constant();
    MethodWorkspaceDidChangeConfiguration = MethodWorkspaceDidChangeConfiguration$constant();
    MethodWorkspaceDidChangeWatchedFiles = MethodWorkspaceDidChangeWatchedFiles$constant();
    MethodWorkspaceDidChangeWorkspaceFolders = MethodWorkspaceDidChangeWorkspaceFolders$constant();
    MethodWorkspaceDidCreateFiles = MethodWorkspaceDidCreateFiles$constant();
    MethodWorkspaceDidDeleteFiles = MethodWorkspaceDidDeleteFiles$constant();
    MethodWorkspaceDidRenameFiles = MethodWorkspaceDidRenameFiles$constant();
    MethodWorkspaceExecuteCommand = MethodWorkspaceExecuteCommand$constant();
    MethodWorkspaceFoldingRangeRefresh = MethodWorkspaceFoldingRangeRefresh$constant();
    MethodWorkspaceInlayHintRefresh = MethodWorkspaceInlayHintRefresh$constant();
    MethodWorkspaceInlineValueRefresh = MethodWorkspaceInlineValueRefresh$constant();
    MethodWorkspaceSemanticTokensRefresh = MethodWorkspaceSemanticTokensRefresh$constant();
    MethodWorkspaceSymbol = MethodWorkspaceSymbol$constant();
    MethodWorkspaceSymbolResolve = MethodWorkspaceSymbolResolve$constant();
    MethodWorkspaceTextDocumentContent = MethodWorkspaceTextDocumentContent$constant();
    MethodWorkspaceTextDocumentContentRefresh = MethodWorkspaceTextDocumentContentRefresh$constant();
    MethodWorkspaceWillCreateFiles = MethodWorkspaceWillCreateFiles$constant();
    MethodWorkspaceWillDeleteFiles = MethodWorkspaceWillDeleteFiles$constant();
    MethodWorkspaceWillRenameFiles = MethodWorkspaceWillRenameFiles$constant();
    MethodWorkspaceWorkspaceFolders = MethodWorkspaceWorkspaceFolders$constant();
    PositionEncodingKindUTF16 = PositionEncodingKindUTF16$constant();
    PositionEncodingKindUTF8 = PositionEncodingKindUTF8$constant();
    ResourceOperationKindRename = ResourceOperationKindRename$constant();
    SemanticTokenModifierAbstract = SemanticTokenModifierAbstract$constant();
    SemanticTokenModifierAsync = SemanticTokenModifierAsync$constant();
    SemanticTokenModifierDeclaration = SemanticTokenModifierDeclaration$constant();
    SemanticTokenModifierDefaultLibrary = SemanticTokenModifierDefaultLibrary$constant();
    SemanticTokenModifierDefinition = SemanticTokenModifierDefinition$constant();
    SemanticTokenModifierDeprecated = SemanticTokenModifierDeprecated$constant();
    SemanticTokenModifierDocumentation = SemanticTokenModifierDocumentation$constant();
    SemanticTokenModifierModification = SemanticTokenModifierModification$constant();
    SemanticTokenModifierReadonly = SemanticTokenModifierReadonly$constant();
    SemanticTokenModifierStatic = SemanticTokenModifierStatic$constant();
    SemanticTokenTypeClass = SemanticTokenTypeClass$constant();
    SemanticTokenTypeComment = SemanticTokenTypeComment$constant();
    SemanticTokenTypeDecorator = SemanticTokenTypeDecorator$constant();
    SemanticTokenTypeEnum = SemanticTokenTypeEnum$constant();
    SemanticTokenTypeEnumMember = SemanticTokenTypeEnumMember$constant();
    SemanticTokenTypeEvent = SemanticTokenTypeEvent$constant();
    SemanticTokenTypeFunction = SemanticTokenTypeFunction$constant();
    SemanticTokenTypeInterface = SemanticTokenTypeInterface$constant();
    SemanticTokenTypeKeyword = SemanticTokenTypeKeyword$constant();
    SemanticTokenTypeLabel = SemanticTokenTypeLabel$constant();
    SemanticTokenTypeMacro = SemanticTokenTypeMacro$constant();
    SemanticTokenTypeMethod = SemanticTokenTypeMethod$constant();
    SemanticTokenTypeNamespace = SemanticTokenTypeNamespace$constant();
    SemanticTokenTypeNumber = SemanticTokenTypeNumber$constant();
    SemanticTokenTypeOperator = SemanticTokenTypeOperator$constant();
    SemanticTokenTypeParameter = SemanticTokenTypeParameter$constant();
    SemanticTokenTypeProperty = SemanticTokenTypeProperty$constant();
    SemanticTokenTypeRegexp = SemanticTokenTypeRegexp$constant();
    SemanticTokenTypeString = SemanticTokenTypeString$constant();
    SemanticTokenTypeStruct = SemanticTokenTypeStruct$constant();
    SemanticTokenTypeType = SemanticTokenTypeType$constant();
    SemanticTokenTypeTypeParameter = SemanticTokenTypeTypeParameter$constant();
    SemanticTokenTypeVariable = SemanticTokenTypeVariable$constant();
    SignatureHelpTriggerKindContentChange = SignatureHelpTriggerKindContentChange$constant();
    SignatureHelpTriggerKindInvoked = SignatureHelpTriggerKindInvoked$constant();
    SignatureHelpTriggerKindTriggerCharacter = SignatureHelpTriggerKindTriggerCharacter$constant();
    SymbolKindClass = SymbolKindClass$constant();
    SymbolKindConstructor = SymbolKindConstructor$constant();
    SymbolKindEnum = SymbolKindEnum$constant();
    SymbolKindEnumMember = SymbolKindEnumMember$constant();
    SymbolKindFile = SymbolKindFile$constant();
    SymbolKindFunction = SymbolKindFunction$constant();
    SymbolKindInterface = SymbolKindInterface$constant();
    SymbolKindMethod = SymbolKindMethod$constant();
    SymbolKindModule = SymbolKindModule$constant();
    SymbolKindNamespace = SymbolKindNamespace$constant();
    SymbolKindProperty = SymbolKindProperty$constant();
    SymbolKindTypeParameter = SymbolKindTypeParameter$constant();
    SymbolKindVariable = SymbolKindVariable$constant();
    TextDocumentSyncKindIncremental = TextDocumentSyncKindIncremental$constant();
    VSReferenceKindRead = VSReferenceKindRead$constant();
    VSReferenceKindUnknown = VSReferenceKindUnknown$constant();
    VSReferenceKindWrite = VSReferenceKindWrite$constant();
    WatchKindCreate = WatchKindCreate$constant();
    WatchKindDelete = WatchKindDelete$constant();
    $state.CallHierarchyIncomingCallsInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams> | undefined, CallHierarchyIncomingCallsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams> | undefined, CallHierarchyIncomingCallsOrNull>());
    $state.CallHierarchyOutgoingCallsInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams> | undefined, CallHierarchyOutgoingCallsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams> | undefined, CallHierarchyOutgoingCallsOrNull>());
    $state.CancelRequestInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<CancelParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<CancelParams> | undefined>());
    $state.ClientRegisterCapabilityInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<RegistrationParams> | undefined, Null>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<RegistrationParams> | undefined, Null>());
    $state.ClientUnregisterCapabilityInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<UnregistrationParams> | undefined, Null>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<UnregistrationParams> | undefined, Null>());
    $state.CodeActionResolveInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<CodeAction> | undefined, tsonicTypeScriptRuntime.Location<CodeAction> | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<CodeAction> | undefined, tsonicTypeScriptRuntime.Location<CodeAction> | undefined>());
    $state.CodeLensResolveInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<CodeLens> | undefined, tsonicTypeScriptRuntime.Location<CodeLens> | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<CodeLens> | undefined, tsonicTypeScriptRuntime.Location<CodeLens> | undefined>());
    $state.CompletionItemResolveInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<CompletionItem> | undefined, tsonicTypeScriptRuntime.Location<CompletionItem> | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<CompletionItem> | undefined, tsonicTypeScriptRuntime.Location<CompletionItem> | undefined>());
    $state.CustomInitializeAPISessionInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<InitializeAPISessionParams> | undefined, {
        value: InitializeAPISessionResult;
    } | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<InitializeAPISessionParams> | undefined, {
        value: InitializeAPISessionResult;
    } | undefined>());
    $state.CustomProjectInfoInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<ProjectInfoParams> | undefined, {
        value: ProjectInfoResult;
    } | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<ProjectInfoParams> | undefined, {
        value: ProjectInfoResult;
    } | undefined>());
    $state.CustomRunGCInfo = RequestInfo.$storageOf<NoParams, Null>(RequestInfo.$zero<NoParams, Null>());
    $state.CustomSaveAllocProfileInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<ProfileParams> | undefined, {
        value: ProfileResult;
    } | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<ProfileParams> | undefined, {
        value: ProfileResult;
    } | undefined>());
    $state.CustomSaveHeapProfileInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<ProfileParams> | undefined, {
        value: ProfileResult;
    } | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<ProfileParams> | undefined, {
        value: ProfileResult;
    } | undefined>());
    $state.CustomSetLogVerbosityInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<SetLogVerbosityParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<SetLogVerbosityParams> | undefined>());
    $state.CustomStartCPUProfileInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<ProfileParams> | undefined, Null>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<ProfileParams> | undefined, Null>());
    $state.CustomStopCPUProfileInfo = RequestInfo.$storageOf<NoParams, {
        value: ProfileResult;
    } | undefined>(RequestInfo.$zero<NoParams, {
        value: ProfileResult;
    } | undefined>());
    $state.CustomTextDocumentMultiDocumentHighlightInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams> | undefined, MultiDocumentHighlightsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams> | undefined, MultiDocumentHighlightsOrNull>());
    $state.CustomTextDocumentSourceDefinitionInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<TextDocumentPositionParams> | undefined, tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull> | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<TextDocumentPositionParams> | undefined, tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull> | undefined>());
    $state.DocumentLinkResolveInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<DocumentLink> | undefined, tsonicTypeScriptRuntime.Location<DocumentLink> | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<DocumentLink> | undefined, tsonicTypeScriptRuntime.Location<DocumentLink> | undefined>());
    $state.ExitInfo = NotificationInfo.$storageOf<NoParams>(NotificationInfo.$zero<NoParams>());
    $state.InitializeInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<InitializeParams> | undefined, {
        value: InitializeResult;
    } | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<InitializeParams> | undefined, {
        value: InitializeResult;
    } | undefined>());
    $state.InitializedInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<InitializedParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<InitializedParams> | undefined>());
    $state.InlayHintResolveInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<InlayHint> | undefined, tsonicTypeScriptRuntime.Location<InlayHint> | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<InlayHint> | undefined, tsonicTypeScriptRuntime.Location<InlayHint> | undefined>());
    $state.LogTraceInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<LogTraceParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<LogTraceParams> | undefined>());
    $state.ProgressInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<ProgressParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<ProgressParams> | undefined>());
    $state.SetTraceInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<SetTraceParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<SetTraceParams> | undefined>());
    $state.ShutdownInfo = RequestInfo.$storageOf<NoParams, Null>(RequestInfo.$zero<NoParams, Null>());
    $state.TelemetryEventInfo = NotificationInfo.$storageOf<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull>(NotificationInfo.$zero<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull>());
    $state.TextDocumentCodeActionInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<CodeActionParams> | undefined, CommandOrCodeActionArrayOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<CodeActionParams> | undefined, CommandOrCodeActionArrayOrNull>());
    $state.TextDocumentCodeLensInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<CodeLensParams> | undefined, CodeLensesOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<CodeLensParams> | undefined, CodeLensesOrNull>());
    $state.TextDocumentColorPresentationInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<ColorPresentationParams> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorPresentation> | undefined>>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<ColorPresentationParams> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorPresentation> | undefined>>());
    $state.TextDocumentCompletionInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<CompletionParams> | undefined, CompletionItemsOrListOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<CompletionParams> | undefined, CompletionItemsOrListOrNull>());
    $state.TextDocumentDeclarationInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<DeclarationParams> | undefined, LocationOrLocationsOrDeclarationLinksOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<DeclarationParams> | undefined, LocationOrLocationsOrDeclarationLinksOrNull>());
    $state.TextDocumentDefinitionInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<DefinitionParams> | undefined, LocationOrLocationsOrDefinitionLinksOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<DefinitionParams> | undefined, LocationOrLocationsOrDefinitionLinksOrNull>());
    $state.TextDocumentDiagnosticInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams> | undefined, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams> | undefined, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport>());
    $state.TextDocumentDidChangeInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams> | undefined>());
    $state.TextDocumentDidCloseInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams> | undefined>());
    $state.TextDocumentDidOpenInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams> | undefined>());
    $state.TextDocumentDidSaveInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams> | undefined>());
    $state.TextDocumentDocumentColorInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<DocumentColorParams> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorInformation> | undefined>>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<DocumentColorParams> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorInformation> | undefined>>());
    $state.TextDocumentDocumentHighlightInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<DocumentHighlightParams> | undefined, DocumentHighlightsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<DocumentHighlightParams> | undefined, DocumentHighlightsOrNull>());
    $state.TextDocumentDocumentLinkInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<DocumentLinkParams> | undefined, DocumentLinksOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<DocumentLinkParams> | undefined, DocumentLinksOrNull>());
    $state.TextDocumentDocumentSymbolInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<DocumentSymbolParams> | undefined, SymbolInformationsOrDocumentSymbolsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<DocumentSymbolParams> | undefined, SymbolInformationsOrDocumentSymbolsOrNull>());
    $state.TextDocumentFoldingRangeInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<FoldingRangeParams> | undefined, FoldingRangesOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<FoldingRangeParams> | undefined, FoldingRangesOrNull>());
    $state.TextDocumentFormattingInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<DocumentFormattingParams> | undefined, TextEditsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<DocumentFormattingParams> | undefined, TextEditsOrNull>());
    $state.TextDocumentHoverInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<HoverParams> | undefined, HoverOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<HoverParams> | undefined, HoverOrNull>());
    $state.TextDocumentImplementationInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<ImplementationParams> | undefined, LocationOrLocationsOrDefinitionLinksOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<ImplementationParams> | undefined, LocationOrLocationsOrDefinitionLinksOrNull>());
    $state.TextDocumentInlayHintInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<InlayHintParams> | undefined, InlayHintsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<InlayHintParams> | undefined, InlayHintsOrNull>());
    $state.TextDocumentInlineCompletionInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<InlineCompletionParams> | undefined, InlineCompletionListOrItemsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<InlineCompletionParams> | undefined, InlineCompletionListOrItemsOrNull>());
    $state.TextDocumentInlineValueInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<InlineValueParams> | undefined, InlineValuesOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<InlineValueParams> | undefined, InlineValuesOrNull>());
    $state.TextDocumentLinkedEditingRangeInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams> | undefined, LinkedEditingRangesOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams> | undefined, LinkedEditingRangesOrNull>());
    $state.TextDocumentMonikerInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<MonikerParams> | undefined, MonikersOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<MonikerParams> | undefined, MonikersOrNull>());
    $state.TextDocumentOnTypeFormattingInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams> | undefined, TextEditsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams> | undefined, TextEditsOrNull>());
    $state.TextDocumentPrepareCallHierarchyInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams> | undefined, CallHierarchyItemsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams> | undefined, CallHierarchyItemsOrNull>());
    $state.TextDocumentPrepareRenameInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<PrepareRenameParams> | undefined, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<PrepareRenameParams> | undefined, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull>());
    $state.TextDocumentPrepareTypeHierarchyInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<TypeHierarchyPrepareParams> | undefined, TypeHierarchyItemsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<TypeHierarchyPrepareParams> | undefined, TypeHierarchyItemsOrNull>());
    $state.TextDocumentPublishDiagnosticsInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams> | undefined>());
    $state.TextDocumentRangeFormattingInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams> | undefined, TextEditsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams> | undefined, TextEditsOrNull>());
    $state.TextDocumentRangesFormattingInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<DocumentRangesFormattingParams> | undefined, TextEditsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<DocumentRangesFormattingParams> | undefined, TextEditsOrNull>());
    $state.TextDocumentReferencesInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<ReferenceParams> | undefined, LocationsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<ReferenceParams> | undefined, LocationsOrNull>());
    $state.TextDocumentRenameInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<RenameParams> | undefined, WorkspaceEditOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<RenameParams> | undefined, WorkspaceEditOrNull>());
    $state.TextDocumentSelectionRangeInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<SelectionRangeParams> | undefined, SelectionRangesOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<SelectionRangeParams> | undefined, SelectionRangesOrNull>());
    $state.TextDocumentSemanticTokensFullDeltaInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<SemanticTokensDeltaParams> | undefined, SemanticTokensOrSemanticTokensDeltaOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<SemanticTokensDeltaParams> | undefined, SemanticTokensOrSemanticTokensDeltaOrNull>());
    $state.TextDocumentSemanticTokensFullInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<SemanticTokensParams> | undefined, SemanticTokensOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<SemanticTokensParams> | undefined, SemanticTokensOrNull>());
    $state.TextDocumentSemanticTokensRangeInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams> | undefined, SemanticTokensOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams> | undefined, SemanticTokensOrNull>());
    $state.TextDocumentSignatureHelpInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<SignatureHelpParams> | undefined, SignatureHelpOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<SignatureHelpParams> | undefined, SignatureHelpOrNull>());
    $state.TextDocumentTypeDefinitionInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<TypeDefinitionParams> | undefined, LocationOrLocationsOrDefinitionLinksOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<TypeDefinitionParams> | undefined, LocationOrLocationsOrDefinitionLinksOrNull>());
    $state.TextDocumentVSOnAutoInsertInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams> | undefined, VSOnAutoInsertResponseItemOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams> | undefined, VSOnAutoInsertResponseItemOrNull>());
    $state.TextDocumentVSReferencesInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<ReferenceParams> | undefined, VSReferenceItemsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<ReferenceParams> | undefined, VSReferenceItemsOrNull>());
    $state.TextDocumentWillSaveInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<WillSaveTextDocumentParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<WillSaveTextDocumentParams> | undefined>());
    $state.TextDocumentWillSaveWaitUntilInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<WillSaveTextDocumentParams> | undefined, TextEditsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<WillSaveTextDocumentParams> | undefined, TextEditsOrNull>());
    $state.TypeHierarchySubtypesInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<TypeHierarchySubtypesParams> | undefined, TypeHierarchyItemsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<TypeHierarchySubtypesParams> | undefined, TypeHierarchyItemsOrNull>());
    $state.TypeHierarchySupertypesInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<TypeHierarchySupertypesParams> | undefined, TypeHierarchyItemsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<TypeHierarchySupertypesParams> | undefined, TypeHierarchyItemsOrNull>());
    $state.WindowLogMessageInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<LogMessageParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<LogMessageParams> | undefined>());
    $state.WindowShowDocumentInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<ShowDocumentParams> | undefined, tsonicTypeScriptRuntime.Location<ShowDocumentResult> | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<ShowDocumentParams> | undefined, tsonicTypeScriptRuntime.Location<ShowDocumentResult> | undefined>());
    $state.WindowShowMessageInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<ShowMessageParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<ShowMessageParams> | undefined>());
    $state.WindowShowMessageRequestInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<ShowMessageRequestParams> | undefined, MessageActionItemOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<ShowMessageRequestParams> | undefined, MessageActionItemOrNull>());
    $state.WindowWorkDoneProgressCancelInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<WorkDoneProgressCancelParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<WorkDoneProgressCancelParams> | undefined>());
    $state.WindowWorkDoneProgressCreateInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<WorkDoneProgressCreateParams> | undefined, Null>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<WorkDoneProgressCreateParams> | undefined, Null>());
    $state.WorkspaceApplyEditInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditParams> | undefined, tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditResult> | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditParams> | undefined, tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditResult> | undefined>());
    $state.WorkspaceCodeLensRefreshInfo = RequestInfo.$storageOf<NoParams, Null>(RequestInfo.$zero<NoParams, Null>());
    $state.WorkspaceConfigurationInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<ConfigurationParams> | undefined, RuntimeSlice<GoInterface | undefined>>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<ConfigurationParams> | undefined, RuntimeSlice<GoInterface | undefined>>());
    $state.WorkspaceDiagnosticInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticParams> | undefined, tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticReport> | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticParams> | undefined, tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticReport> | undefined>());
    $state.WorkspaceDiagnosticRefreshInfo = RequestInfo.$storageOf<NoParams, Null>(RequestInfo.$zero<NoParams, Null>());
    $state.WorkspaceDidChangeConfigurationInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams> | undefined>());
    $state.WorkspaceDidChangeWatchedFilesInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams> | undefined>());
    $state.WorkspaceDidChangeWorkspaceFoldersInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<DidChangeWorkspaceFoldersParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<DidChangeWorkspaceFoldersParams> | undefined>());
    $state.WorkspaceDidCreateFilesInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<CreateFilesParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<CreateFilesParams> | undefined>());
    $state.WorkspaceDidDeleteFilesInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<DeleteFilesParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<DeleteFilesParams> | undefined>());
    $state.WorkspaceDidRenameFilesInfo = NotificationInfo.$storageOf<tsonicTypeScriptRuntime.Location<RenameFilesParams> | undefined>(NotificationInfo.$zero<tsonicTypeScriptRuntime.Location<RenameFilesParams> | undefined>());
    $state.WorkspaceExecuteCommandInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<ExecuteCommandParams> | undefined, LSPAnyOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<ExecuteCommandParams> | undefined, LSPAnyOrNull>());
    $state.WorkspaceFoldingRangeRefreshInfo = RequestInfo.$storageOf<NoParams, Null>(RequestInfo.$zero<NoParams, Null>());
    $state.WorkspaceInlayHintRefreshInfo = RequestInfo.$storageOf<NoParams, Null>(RequestInfo.$zero<NoParams, Null>());
    $state.WorkspaceInlineValueRefreshInfo = RequestInfo.$storageOf<NoParams, Null>(RequestInfo.$zero<NoParams, Null>());
    $state.WorkspaceSemanticTokensRefreshInfo = RequestInfo.$storageOf<NoParams, Null>(RequestInfo.$zero<NoParams, Null>());
    $state.WorkspaceSymbolInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams> | undefined, SymbolInformationsOrWorkspaceSymbolsOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams> | undefined, SymbolInformationsOrWorkspaceSymbolsOrNull>());
    $state.WorkspaceSymbolResolveInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<WorkspaceSymbol> | undefined, tsonicTypeScriptRuntime.Location<WorkspaceSymbol> | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<WorkspaceSymbol> | undefined, tsonicTypeScriptRuntime.Location<WorkspaceSymbol> | undefined>());
    $state.WorkspaceTextDocumentContentInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<TextDocumentContentParams> | undefined, tsonicTypeScriptRuntime.Location<TextDocumentContentResult> | undefined>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<TextDocumentContentParams> | undefined, tsonicTypeScriptRuntime.Location<TextDocumentContentResult> | undefined>());
    $state.WorkspaceTextDocumentContentRefreshInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<TextDocumentContentRefreshParams> | undefined, Null>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<TextDocumentContentRefreshParams> | undefined, Null>());
    $state.WorkspaceWillCreateFilesInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<CreateFilesParams> | undefined, WorkspaceEditOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<CreateFilesParams> | undefined, WorkspaceEditOrNull>());
    $state.WorkspaceWillDeleteFilesInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<DeleteFilesParams> | undefined, WorkspaceEditOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<DeleteFilesParams> | undefined, WorkspaceEditOrNull>());
    $state.WorkspaceWillRenameFilesInfo = RequestInfo.$storageOf<tsonicTypeScriptRuntime.Location<RenameFilesParams> | undefined, WorkspaceEditOrNull>(RequestInfo.$zero<tsonicTypeScriptRuntime.Location<RenameFilesParams> | undefined, WorkspaceEditOrNull>());
    $state.WorkspaceWorkspaceFoldersInfo = RequestInfo.$storageOf<NoParams, WorkspaceFoldersOrNull>(RequestInfo.$zero<NoParams, WorkspaceFoldersOrNull>());
    $state._AddAsTypeOnly_index_0 = GoArray.zero<uint16, 3>(3, 0);
    $state._AddAsTypeOnly_index_1 = GoArray.zero<uint16, 2>(2, 0);
    $state._ApplyKind_index = GoArray.zero<uint16, 3>(3, 0);
    $state._AutoImportFixKind_index = GoArray.zero<uint16, 6>(6, 0);
    $state._CodeActionTag_index = GoArray.zero<uint16, 2>(2, 0);
    $state._CodeActionTriggerKind_index = GoArray.zero<uint16, 3>(3, 0);
    $state._CompletionItemKind_index = GoArray.zero<uint16, 26>(26, 0);
    $state._CompletionItemTag_index = GoArray.zero<uint16, 2>(2, 0);
    $state._CompletionTriggerKind_index = GoArray.zero<uint16, 4>(4, 0);
    $state._DiagnosticSeverity_index = GoArray.zero<uint16, 5>(5, 0);
    $state._DiagnosticTag_index = GoArray.zero<uint16, 3>(3, 0);
    $state._DocumentHighlightKind_index = GoArray.zero<uint16, 4>(4, 0);
    $state._ErrorCode_index_0 = GoArray.zero<uint16, 5>(5, 0);
    $state._ErrorCode_index_1 = GoArray.zero<uint16, 2>(2, 0);
    $state._ErrorCode_index_2 = GoArray.zero<uint16, 5>(5, 0);
    $state._ErrorCode_index_3 = GoArray.zero<uint16, 3>(3, 0);
    $state._FileChangeType_index = GoArray.zero<uint16, 4>(4, 0);
    $state._ImportKind_index = GoArray.zero<uint16, 5>(5, 0);
    $state._InlayHintKind_index = GoArray.zero<uint16, 3>(3, 0);
    $state._InlineCompletionTriggerKind_index = GoArray.zero<uint16, 3>(3, 0);
    $state._InsertTextFormat_index = GoArray.zero<uint16, 3>(3, 0);
    $state._InsertTextMode_index = GoArray.zero<uint16, 3>(3, 0);
    $state._LogVerbosity_index = GoArray.zero<uint16, 7>(7, 0);
    $state._MessageType_index = GoArray.zero<uint16, 6>(6, 0);
    $state._PrepareSupportDefaultBehavior_index = GoArray.zero<uint16, 2>(2, 0);
    $state._SignatureHelpTriggerKind_index = GoArray.zero<uint16, 4>(4, 0);
    $state._SymbolKind_index = GoArray.zero<uint16, 27>(27, 0);
    $state._SymbolTag_index = GoArray.zero<uint16, 2>(2, 0);
    $state._TextDocumentSaveReason_index = GoArray.zero<uint16, 4>(4, 0);
    $state._TextDocumentSyncKind_index = GoArray.zero<uint16, 4>(4, 0);
    $state._VSReferenceKind_index = GoArray.zero<uint16, 19>(19, 0);
    $state._WatchKind_index = GoArray.zero<uint16, 4>(4, 0);
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
        void 0;
    }
    {
        $state._ErrorCode_index_0 = GoArray.literal<uint16, 5>(5, 0, [0, 1, 2, 3, 4], [0, 13, 28, 43, 59]);
    }
    {
        $state._ErrorCode_index_1 = GoArray.literal<uint16, 2>(2, 0, [0, 1], [0, 10]);
    }
    {
        $state._ErrorCode_index_2 = GoArray.literal<uint16, 5>(5, 0, [0, 1, 2, 3, 4], [0, 13, 26, 40, 54]);
    }
    {
        $state._ErrorCode_index_3 = GoArray.literal<uint16, 3>(3, 0, [0, 1, 2], [0, 20, 36]);
    }
    {
        $state._SymbolKind_index = GoArray.literal<uint16, 27>(27, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], [0, 4, 10, 19, 26, 31, 37, 45, 50, 61, 65, 74, 82, 90, 98, 104, 110, 117, 122, 128, 131, 135, 145, 151, 156, 164, 177]);
    }
    {
        $state._SymbolTag_index = GoArray.literal<uint16, 2>(2, 0, [0, 1], [0, 10]);
    }
    {
        $state._InlayHintKind_index = GoArray.literal<uint16, 3>(3, 0, [0, 1, 2], [0, 4, 13]);
    }
    {
        $state._MessageType_index = GoArray.literal<uint16, 6>(6, 0, [0, 1, 2, 3, 4, 5], [0, 5, 12, 16, 19, 24]);
    }
    {
        $state._TextDocumentSyncKind_index = GoArray.literal<uint16, 4>(4, 0, [0, 1, 2, 3], [0, 4, 8, 19]);
    }
    {
        $state._TextDocumentSaveReason_index = GoArray.literal<uint16, 4>(4, 0, [0, 1, 2, 3], [0, 6, 16, 24]);
    }
    {
        $state._CompletionItemKind_index = GoArray.literal<uint16, 26>(26, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], [0, 4, 10, 18, 29, 34, 42, 47, 56, 62, 70, 74, 79, 83, 90, 97, 102, 106, 115, 121, 131, 139, 145, 150, 158, 171]);
    }
    {
        $state._CompletionItemTag_index = GoArray.literal<uint16, 2>(2, 0, [0, 1], [0, 10]);
    }
    {
        $state._InsertTextFormat_index = GoArray.literal<uint16, 3>(3, 0, [0, 1, 2], [0, 9, 16]);
    }
    {
        $state._InsertTextMode_index = GoArray.literal<uint16, 3>(3, 0, [0, 1, 2], [0, 4, 21]);
    }
    {
        $state._DocumentHighlightKind_index = GoArray.literal<uint16, 4>(4, 0, [0, 1, 2, 3], [0, 4, 8, 13]);
    }
    {
        $state._CodeActionTag_index = GoArray.literal<uint16, 2>(2, 0, [0, 1], [0, 12]);
    }
    {
        $state._InlineCompletionTriggerKind_index = GoArray.literal<uint16, 3>(3, 0, [0, 1, 2], [0, 7, 16]);
    }
    {
        $state._FileChangeType_index = GoArray.literal<uint16, 4>(4, 0, [0, 1, 2, 3], [0, 7, 14, 21]);
    }
    {
        $state._WatchKind_index = GoArray.literal<uint16, 4>(4, 0, [0, 1, 2, 3], [0, 6, 12, 18]);
    }
    {
        $state._DiagnosticSeverity_index = GoArray.literal<uint16, 5>(5, 0, [0, 1, 2, 3, 4], [0, 5, 12, 23, 27]);
    }
    {
        $state._DiagnosticTag_index = GoArray.literal<uint16, 3>(3, 0, [0, 1, 2], [0, 11, 21]);
    }
    {
        $state._CompletionTriggerKind_index = GoArray.literal<uint16, 4>(4, 0, [0, 1, 2, 3], [0, 7, 23, 54]);
    }
    {
        $state._ApplyKind_index = GoArray.literal<uint16, 3>(3, 0, [0, 1, 2], [0, 7, 12]);
    }
    {
        $state._SignatureHelpTriggerKind_index = GoArray.literal<uint16, 4>(4, 0, [0, 1, 2, 3], [0, 7, 23, 36]);
    }
    {
        $state._CodeActionTriggerKind_index = GoArray.literal<uint16, 3>(3, 0, [0, 1, 2], [0, 7, 16]);
    }
    {
        $state._PrepareSupportDefaultBehavior_index = GoArray.literal<uint16, 2>(2, 0, [0, 1], [0, 10]);
    }
    {
        $state._LogVerbosity_index = GoArray.literal<uint16, 7>(7, 0, [0, 1, 2, 3, 4, 5, 6], [0, 3, 8, 13, 17, 24, 29]);
    }
    {
        $state._VSReferenceKind_index = GoArray.literal<uint16, 19>(19, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], [0, 8, 15, 21, 25, 30, 39, 43, 52, 64, 78, 86, 97, 107, 113, 124, 133, 145, 152]);
    }
    {
        $state._AutoImportFixKind_index = GoArray.literal<uint16, 6>(6, 0, [0, 1, 2, 3, 4, 5], [0, 12, 27, 40, 46, 61]);
    }
    {
        $state._ImportKind_index = GoArray.literal<uint16, 5>(5, 0, [0, 1, 2, 3, 4], [0, 5, 12, 21, 29]);
    }
    {
        $state._AddAsTypeOnly_index_0 = GoArray.literal<uint16, 3>(3, 0, [0, 1, 2], [0, 7, 15]);
    }
    {
        $state._AddAsTypeOnly_index_1 = GoArray.literal<uint16, 2>(2, 0, [0, 1], [0, 10]);
    }
    {
        $state.TextDocumentImplementationInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentImplementation$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ImplementationParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentTypeDefinitionInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentTypeDefinition$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<TypeDefinitionParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceWorkspaceFoldersInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceWorkspaceFolders$constant().$value,
                    $blank0: goArrayAllocate<NoParams__from_lsproto$Storage, 0>(0),
                    $blank1: goArrayAllocate<WorkspaceFoldersOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceConfigurationInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceConfiguration$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ConfigurationParams> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<RuntimeSlice<GoInterface | undefined>, 0>(0, RuntimeSlice.nil<GoInterface | undefined>())
                }));
    }
    {
        $state.TextDocumentDocumentColorInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentDocumentColor$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DocumentColorParams> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorInformation> | undefined>, 0>(0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<ColorInformation> | undefined>())
                }));
    }
    {
        $state.TextDocumentColorPresentationInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentColorPresentation$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ColorPresentationParams> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<RuntimeSlice<tsonicTypeScriptRuntime.Location<ColorPresentation> | undefined>, 0>(0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<ColorPresentation> | undefined>())
                }));
    }
    {
        $state.TextDocumentFoldingRangeInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentFoldingRange$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<FoldingRangeParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<FoldingRangesOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceFoldingRangeRefreshInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceFoldingRangeRefresh$constant().$value,
                    $blank0: goArrayAllocate<NoParams__from_lsproto$Storage, 0>(0),
                    $blank1: goArrayAllocate<Null__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentDeclarationInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentDeclaration$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DeclarationParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<LocationOrLocationsOrDeclarationLinksOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentSelectionRangeInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentSelectionRange$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<SelectionRangeParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<SelectionRangesOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WindowWorkDoneProgressCreateInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWindowWorkDoneProgressCreate$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<WorkDoneProgressCreateParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<Null__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentPrepareCallHierarchyInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentPrepareCallHierarchy$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<CallHierarchyItemsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.CallHierarchyIncomingCallsInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCallHierarchyIncomingCalls$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<CallHierarchyIncomingCallsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.CallHierarchyOutgoingCallsInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCallHierarchyOutgoingCalls$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<CallHierarchyOutgoingCallsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentSemanticTokensFullInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentSemanticTokensFull$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<SemanticTokensParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<SemanticTokensOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentSemanticTokensFullDeltaInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentSemanticTokensFullDelta$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<SemanticTokensDeltaParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<SemanticTokensOrSemanticTokensDeltaOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentSemanticTokensRangeInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentSemanticTokensRange$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<SemanticTokensOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceSemanticTokensRefreshInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceSemanticTokensRefresh$constant().$value,
                    $blank0: goArrayAllocate<NoParams__from_lsproto$Storage, 0>(0),
                    $blank1: goArrayAllocate<Null__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WindowShowDocumentInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWindowShowDocument$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ShowDocumentParams> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<tsonicTypeScriptRuntime.Location<ShowDocumentResult> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.TextDocumentLinkedEditingRangeInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentLinkedEditingRange$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<LinkedEditingRangesOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceWillCreateFilesInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceWillCreateFiles$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<CreateFilesParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<WorkspaceEditOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceWillRenameFilesInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceWillRenameFiles$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<RenameFilesParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<WorkspaceEditOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceWillDeleteFilesInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceWillDeleteFiles$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DeleteFilesParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<WorkspaceEditOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentMonikerInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentMoniker$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<MonikerParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<MonikersOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentPrepareTypeHierarchyInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentPrepareTypeHierarchy$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<TypeHierarchyPrepareParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<TypeHierarchyItemsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TypeHierarchySupertypesInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTypeHierarchySupertypes$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<TypeHierarchySupertypesParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<TypeHierarchyItemsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TypeHierarchySubtypesInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTypeHierarchySubtypes$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<TypeHierarchySubtypesParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<TypeHierarchyItemsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentInlineValueInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentInlineValue$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<InlineValueParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<InlineValuesOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceInlineValueRefreshInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceInlineValueRefresh$constant().$value,
                    $blank0: goArrayAllocate<NoParams__from_lsproto$Storage, 0>(0),
                    $blank1: goArrayAllocate<Null__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentInlayHintInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentInlayHint$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<InlayHintParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<InlayHintsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.InlayHintResolveInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodInlayHintResolve$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<InlayHint> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<tsonicTypeScriptRuntime.Location<InlayHint> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.WorkspaceInlayHintRefreshInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceInlayHintRefresh$constant().$value,
                    $blank0: goArrayAllocate<NoParams__from_lsproto$Storage, 0>(0),
                    $blank1: goArrayAllocate<Null__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentDiagnosticInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentDiagnostic$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceDiagnosticInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceDiagnostic$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticParams> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<tsonicTypeScriptRuntime.Location<WorkspaceDiagnosticReport> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.WorkspaceDiagnosticRefreshInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceDiagnosticRefresh$constant().$value,
                    $blank0: goArrayAllocate<NoParams__from_lsproto$Storage, 0>(0),
                    $blank1: goArrayAllocate<Null__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentInlineCompletionInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentInlineCompletion$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<InlineCompletionParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<InlineCompletionListOrItemsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceTextDocumentContentInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceTextDocumentContent$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<TextDocumentContentParams> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<tsonicTypeScriptRuntime.Location<TextDocumentContentResult> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.WorkspaceTextDocumentContentRefreshInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceTextDocumentContentRefresh$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<TextDocumentContentRefreshParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<Null__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.ClientRegisterCapabilityInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodClientRegisterCapability$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<RegistrationParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<Null__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.ClientUnregisterCapabilityInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodClientUnregisterCapability$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<UnregistrationParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<Null__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.InitializeInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodInitialize$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<InitializeParams> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<{
                        value: InitializeResult;
                    } | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.ShutdownInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodShutdown$constant().$value,
                    $blank0: goArrayAllocate<NoParams__from_lsproto$Storage, 0>(0),
                    $blank1: goArrayAllocate<Null__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WindowShowMessageRequestInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWindowShowMessageRequest$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ShowMessageRequestParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<MessageActionItemOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentWillSaveWaitUntilInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentWillSaveWaitUntil$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<WillSaveTextDocumentParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<TextEditsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentCompletionInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentCompletion$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<CompletionParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<CompletionItemsOrListOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.CompletionItemResolveInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCompletionItemResolve$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<CompletionItem> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<tsonicTypeScriptRuntime.Location<CompletionItem> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.TextDocumentHoverInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentHover$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<HoverParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<HoverOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentSignatureHelpInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentSignatureHelp$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<SignatureHelpParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<SignatureHelpOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentDefinitionInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentDefinition$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DefinitionParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentReferencesInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentReferences$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ReferenceParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<LocationsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentDocumentHighlightInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentDocumentHighlight$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DocumentHighlightParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<DocumentHighlightsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentDocumentSymbolInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentDocumentSymbol$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DocumentSymbolParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentCodeActionInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentCodeAction$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<CodeActionParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<CommandOrCodeActionArrayOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.CodeActionResolveInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCodeActionResolve$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<CodeAction> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<tsonicTypeScriptRuntime.Location<CodeAction> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.WorkspaceSymbolInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceSymbol$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceSymbolResolveInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceSymbolResolve$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<WorkspaceSymbol> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<tsonicTypeScriptRuntime.Location<WorkspaceSymbol> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.TextDocumentCodeLensInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentCodeLens$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<CodeLensParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<CodeLensesOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.CodeLensResolveInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCodeLensResolve$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<CodeLens> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<tsonicTypeScriptRuntime.Location<CodeLens> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.WorkspaceCodeLensRefreshInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceCodeLensRefresh$constant().$value,
                    $blank0: goArrayAllocate<NoParams__from_lsproto$Storage, 0>(0),
                    $blank1: goArrayAllocate<Null__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentDocumentLinkInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentDocumentLink$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DocumentLinkParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<DocumentLinksOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.DocumentLinkResolveInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodDocumentLinkResolve$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DocumentLink> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<tsonicTypeScriptRuntime.Location<DocumentLink> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.TextDocumentFormattingInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentFormatting$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DocumentFormattingParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<TextEditsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentRangeFormattingInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentRangeFormatting$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<TextEditsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentRangesFormattingInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentRangesFormatting$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DocumentRangesFormattingParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<TextEditsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentOnTypeFormattingInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentOnTypeFormatting$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<TextEditsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentRenameInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentRename$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<RenameParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<WorkspaceEditOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentPrepareRenameInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentPrepareRename$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<PrepareRenameParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceExecuteCommandInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceExecuteCommand$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ExecuteCommandParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<LSPAnyOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceApplyEditInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodWorkspaceApplyEdit$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditParams> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<tsonicTypeScriptRuntime.Location<ApplyWorkspaceEditResult> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.CustomRunGCInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCustomRunGC$constant().$value,
                    $blank0: goArrayAllocate<NoParams__from_lsproto$Storage, 0>(0),
                    $blank1: goArrayAllocate<Null__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.CustomSaveHeapProfileInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCustomSaveHeapProfile$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ProfileParams> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<{
                        value: ProfileResult;
                    } | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.CustomSaveAllocProfileInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCustomSaveAllocProfile$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ProfileParams> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<{
                        value: ProfileResult;
                    } | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.CustomStartCPUProfileInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCustomStartCPUProfile$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ProfileParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<Null__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.CustomStopCPUProfileInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCustomStopCPUProfile$constant().$value,
                    $blank0: goArrayAllocate<NoParams__from_lsproto$Storage, 0>(0),
                    $blank1: GoArray.zero<{
                        value: ProfileResult;
                    } | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.CustomInitializeAPISessionInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCustomInitializeAPISession$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<InitializeAPISessionParams> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<{
                        value: InitializeAPISessionResult;
                    } | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.CustomProjectInfoInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCustomProjectInfo$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ProjectInfoParams> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<{
                        value: ProjectInfoResult;
                    } | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.CustomTextDocumentSourceDefinitionInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCustomTextDocumentSourceDefinition$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<TextDocumentPositionParams> | undefined, 0>(0, void 0),
                    $blank1: GoArray.zero<tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.CustomTextDocumentMultiDocumentHighlightInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodCustomTextDocumentMultiDocumentHighlight$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<MultiDocumentHighlightsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentVSOnAutoInsertInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentVSOnAutoInsert$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<VSOnAutoInsertResponseItemOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentVSReferencesInfo =
            (void RequestInfo.$storageOf, (void RequestInfo.$fromStorage,
                {
                    Method: MethodTextDocumentVSReferences$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ReferenceParams> | undefined, 0>(0, void 0),
                    $blank1: goArrayAllocate<VSReferenceItemsOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceDidChangeWorkspaceFoldersInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodWorkspaceDidChangeWorkspaceFolders$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DidChangeWorkspaceFoldersParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.WindowWorkDoneProgressCancelInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodWindowWorkDoneProgressCancel$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<WorkDoneProgressCancelParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.WorkspaceDidCreateFilesInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodWorkspaceDidCreateFiles$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<CreateFilesParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.WorkspaceDidRenameFilesInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodWorkspaceDidRenameFiles$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<RenameFilesParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.WorkspaceDidDeleteFilesInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodWorkspaceDidDeleteFiles$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DeleteFilesParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.InitializedInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodInitialized$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<InitializedParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.ExitInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodExit$constant().$value,
                    $blank0: goArrayAllocate<NoParams__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.WorkspaceDidChangeConfigurationInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodWorkspaceDidChangeConfiguration$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.WindowShowMessageInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodWindowShowMessage$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ShowMessageParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.WindowLogMessageInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodWindowLogMessage$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<LogMessageParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.TelemetryEventInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodTelemetryEvent$constant().$value,
                    $blank0: goArrayAllocate<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto$Storage, 0>(0)
                }));
    }
    {
        $state.TextDocumentDidOpenInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodTextDocumentDidOpen$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.TextDocumentDidChangeInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodTextDocumentDidChange$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.TextDocumentDidCloseInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodTextDocumentDidClose$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.TextDocumentDidSaveInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodTextDocumentDidSave$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.TextDocumentWillSaveInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodTextDocumentWillSave$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<WillSaveTextDocumentParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.WorkspaceDidChangeWatchedFilesInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodWorkspaceDidChangeWatchedFiles$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.TextDocumentPublishDiagnosticsInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodTextDocumentPublishDiagnostics$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.SetTraceInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodSetTrace$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<SetTraceParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.LogTraceInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodLogTrace$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<LogTraceParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.CancelRequestInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodCancelRequest$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<CancelParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.ProgressInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodProgress$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<ProgressParams> | undefined, 0>(0, void 0)
                }));
    }
    {
        $state.CustomSetLogVerbosityInfo =
            (void NotificationInfo.$storageOf, (void NotificationInfo.$fromStorage,
                {
                    Method: MethodCustomSetLogVerbosity$constant().$value,
                    $blank0: GoArray.zero<tsonicTypeScriptRuntime.Location<SetLogVerbosityParams> | undefined, 0>(0, void 0)
                }));
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
        void 0;
    }
    {
        void 0;
    }
    {
        new StringLiteralBegin;
    }
    {
        new StringLiteralBegin;
    }
    {
        new StringLiteralReport;
    }
    {
        new StringLiteralReport;
    }
    {
        new StringLiteralEnd;
    }
    {
        new StringLiteralEnd;
    }
    {
        new StringLiteralCreate;
    }
    {
        new StringLiteralCreate;
    }
    {
        new StringLiteralRename;
    }
    {
        new StringLiteralRename;
    }
    {
        new StringLiteralDelete;
    }
    {
        new StringLiteralDelete;
    }
    {
        new StringLiteralFull;
    }
    {
        new StringLiteralFull;
    }
    {
        new StringLiteralUnchanged;
    }
    {
        new StringLiteralUnchanged;
    }
    {
        new StringLiteralSnippet;
    }
    {
        new StringLiteralSnippet;
    }
    {
        new StringLiteralLanguageServerErrorResponse;
    }
    {
        new StringLiteralLanguageServerErrorResponse;
    }
    {
        new StringLiteralError;
    }
    {
        new StringLiteralError;
    }
    {
        new StringLiteralLanguageServerPerformanceStats;
    }
    {
        new StringLiteralLanguageServerPerformanceStats;
    }
    {
        new StringLiteralUsage;
    }
    {
        new StringLiteralUsage;
    }
    {
        new StringLiteralLanguageServerProjectInfo;
    }
    {
        new StringLiteralLanguageServerProjectInfo;
    }
    {
        new StringLiteralClassifiedTextRun;
    }
    {
        new StringLiteralClassifiedTextRun;
    }
    {
        new StringLiteralClassifiedTextElement;
    }
    {
        new StringLiteralClassifiedTextElement;
    }
}
export { BaseReader, BaseWriter, NewBaseReader, NewBaseWriter } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/baseproto.js";
export { Message, NewID, RequestMessage, ResponseMessage } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/jsonrpc.js";
export { CodeActionKindSourceRemoveUnusedImports$constant, CodeActionKindSourceSortImports$constant, DocumentUri, GetClientCapabilities, HasTextDocumentPosition, HasTextDocumentPosition$contract, HasTextDocumentPosition$is, Method, NoParams, NoParams$Storage, NotificationInfo, NotificationInfo$Storage, Null, Null$Storage, PreferredMarkupKind, RequestInfo, RequestInfo$Storage, URI, WithClientCapabilities } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
export { AddAsTypeOnly, AddAsTypeOnlyAllowed$constant, AddAsTypeOnlyNotAllowed$constant, AddAsTypeOnlyRequired$constant, AddAsTypeOnly_String, AnnotatedTextEdit, ApplyKind, ApplyKind_String, ApplyWorkspaceEditParams, ApplyWorkspaceEditResult, AutoImportFix, AutoImportFixKind, AutoImportFixKindAddNew$constant, AutoImportFixKindAddToExisting$constant, AutoImportFixKindJsdocTypeImport$constant, AutoImportFixKindPromoteTypeOnly$constant, AutoImportFixKindUseNamespace$constant, AutoImportFixKind_String, BooleanOrCallHierarchyOptionsOrCallHierarchyRegistrationOptions, BooleanOrClientSemanticTokensRequestFullDelta, BooleanOrCodeActionOptions, BooleanOrDeclarationOptionsOrDeclarationRegistrationOptions, BooleanOrDefinitionOptions, BooleanOrDocumentColorOptionsOrDocumentColorRegistrationOptions, BooleanOrDocumentFormattingOptions, BooleanOrDocumentHighlightOptions, BooleanOrDocumentRangeFormattingOptions, BooleanOrDocumentSymbolOptions, BooleanOrEmptyObject, BooleanOrFoldingRangeOptionsOrFoldingRangeRegistrationOptions, BooleanOrHoverOptions, BooleanOrImplementationOptionsOrImplementationRegistrationOptions, BooleanOrInlayHintOptionsOrInlayHintRegistrationOptions, BooleanOrInlineCompletionOptions, BooleanOrInlineValueOptionsOrInlineValueRegistrationOptions, BooleanOrLinkedEditingRangeOptionsOrLinkedEditingRangeRegistrationOptions, BooleanOrMonikerOptionsOrMonikerRegistrationOptions, BooleanOrReferenceOptions, BooleanOrRenameOptions, BooleanOrSaveOptions, BooleanOrSelectionRangeOptionsOrSelectionRangeRegistrationOptions, BooleanOrSemanticTokensFullDelta, BooleanOrTypeDefinitionOptionsOrTypeDefinitionRegistrationOptions, BooleanOrTypeHierarchyOptionsOrTypeHierarchyRegistrationOptions, BooleanOrWorkspaceSymbolOptions, CallHierarchyClientCapabilities, CallHierarchyIncomingCall, CallHierarchyIncomingCallsOrNull, CallHierarchyIncomingCallsOrNull$Storage, CallHierarchyIncomingCallsParams, CallHierarchyItem, CallHierarchyItemData, CallHierarchyItemsOrNull, CallHierarchyItemsOrNull$Storage, CallHierarchyOptions, CallHierarchyOutgoingCall, CallHierarchyOutgoingCallsOrNull, CallHierarchyOutgoingCallsOrNull$Storage, CallHierarchyOutgoingCallsParams, CallHierarchyPrepareParams, CallHierarchyRegistrationOptions, CancelParams, ChangeAnnotation, ChangeAnnotationsSupportOptions, ClassificationTypeName, ClassificationTypeNameClassName$constant, ClassificationTypeNameEnumName$constant, ClassificationTypeNameFieldName$constant, ClassificationTypeNameIdentifier$constant, ClassificationTypeNameInterfaceName$constant, ClassificationTypeNameKeyword$constant, ClassificationTypeNameLocalName$constant, ClassificationTypeNameMethodName$constant, ClassificationTypeNameModuleName$constant, ClassificationTypeNameOperator$constant, ClassificationTypeNameParameterName$constant, ClassificationTypeNamePropertyName$constant, ClassificationTypeNamePunctuation$constant, ClassificationTypeNameString$constant, ClassificationTypeNameText$constant, ClassificationTypeNameTypeParameterName$constant, ClassificationTypeNameWhiteSpace$constant, ClientCapabilities, ClientCodeActionKindOptions, ClientCodeActionLiteralOptions, ClientCodeActionResolveOptions, ClientCodeLensResolveOptions, ClientCompletionItemInsertTextModeOptions, ClientCompletionItemOptions, ClientCompletionItemOptionsKind, ClientCompletionItemResolveOptions, ClientDiagnosticsTagOptions, ClientFoldingRangeKindOptions, ClientFoldingRangeOptions, ClientInfo, ClientInlayHintResolveOptions, ClientSemanticTokensRequestFullDelta, ClientSemanticTokensRequestOptions, ClientShowMessageActionItemOptions, ClientSignatureInformationOptions, ClientSignatureParameterInformationOptions, ClientSymbolKindOptions, ClientSymbolResolveOptions, ClientSymbolTagOptions, CodeAction, CodeActionClientCapabilities, CodeActionContext, CodeActionData, CodeActionDisabled, CodeActionKind, CodeActionKindDocumentation, CodeActionKindQuickFix$constant, CodeActionKindSourceFixAll$constant, CodeActionKindSourceOrganizeImports$constant, CodeActionOptions, CodeActionParams, CodeActionRegistrationOptions, CodeActionTag, CodeActionTagOptions, CodeActionTag_String, CodeActionTriggerKind, CodeActionTriggerKind_String, CodeDescription, CodeLens, CodeLensClientCapabilities, CodeLensData, CodeLensKind, CodeLensKindImplementations$constant, CodeLensKindReferences$constant, CodeLensOptions, CodeLensParams, CodeLensRegistrationOptions, CodeLensWorkspaceClientCapabilities, CodeLensesOrNull, CodeLensesOrNull$Storage, Color, ColorInformation, ColorPresentation, ColorPresentationParams, ColorPresentationRegistrationOptions, Command, CommandOrCodeAction, CommandOrCodeAction$Storage, CommandOrCodeActionArrayOrNull, CommandOrCodeActionArrayOrNull$Storage, CompletionClientCapabilities, CompletionContext, CompletionItem, CompletionItemApplyKinds, CompletionItemData, CompletionItemDefaults, CompletionItemDefaultsData, CompletionItemKind, CompletionItemKindClass$constant, CompletionItemKindConstant$constant, CompletionItemKindEnum$constant, CompletionItemKindEnumMember$constant, CompletionItemKindField$constant, CompletionItemKindFile$constant, CompletionItemKindFolder$constant, CompletionItemKindFunction$constant, CompletionItemKindInterface$constant, CompletionItemKindKeyword$constant, CompletionItemKindMethod$constant, CompletionItemKindModule$constant, CompletionItemKindProperty$constant, CompletionItemKindSnippet$constant, CompletionItemKindText$constant, CompletionItemKindVariable$constant, CompletionItemKind_String, CompletionItemLabelDetails, CompletionItemTag, CompletionItemTagDeprecated$constant, CompletionItemTagOptions, CompletionItemTag_String, CompletionItemsOrListOrNull, CompletionItemsOrListOrNull$Storage, CompletionList, CompletionListCapabilities, CompletionOptions, CompletionParams, CompletionRegistrationOptions, CompletionTriggerKind, CompletionTriggerKind_String, ConfigurationItem, ConfigurationParams, CreateFile, CreateFileOptions, CreateFilesParams, DeclarationClientCapabilities, DeclarationOptions, DeclarationParams, DeclarationRegistrationOptions, DefinitionClientCapabilities, DefinitionOptions, DefinitionParams, DefinitionRegistrationOptions, DeleteFile, DeleteFileOptions, DeleteFilesParams, Diagnostic, DiagnosticClientCapabilities, DiagnosticData, DiagnosticOptions, DiagnosticOptionsOrRegistrationOptions, DiagnosticRegistrationOptions, DiagnosticRelatedInformation, DiagnosticSeverity, DiagnosticSeverityError$constant, DiagnosticSeverityHint$constant, DiagnosticSeverityInformation$constant, DiagnosticSeverityWarning$constant, DiagnosticSeverity_String, DiagnosticTag, DiagnosticTagDeprecated$constant, DiagnosticTagUnnecessary$constant, DiagnosticTag_String, DiagnosticWorkspaceClientCapabilities, DidChangeConfigurationClientCapabilities, DidChangeConfigurationParams, DidChangeConfigurationRegistrationOptions, DidChangeTextDocumentParams, DidChangeWatchedFilesClientCapabilities, DidChangeWatchedFilesParams, DidChangeWatchedFilesRegistrationOptions, DidChangeWorkspaceFoldersParams, DidCloseTextDocumentParams, DidOpenTextDocumentParams, DidSaveTextDocumentParams, DocumentColorClientCapabilities, DocumentColorOptions, DocumentColorParams, DocumentColorRegistrationOptions, DocumentDiagnosticParams, DocumentFormattingClientCapabilities, DocumentFormattingOptions, DocumentFormattingParams, DocumentFormattingRegistrationOptions, DocumentHighlight, DocumentHighlightClientCapabilities, DocumentHighlightKind, DocumentHighlightKindRead$constant, DocumentHighlightKindWrite$constant, DocumentHighlightKind_String, DocumentHighlightOptions, DocumentHighlightParams, DocumentHighlightRegistrationOptions, DocumentHighlightsOrNull, DocumentHighlightsOrNull$Storage, DocumentLink, DocumentLinkClientCapabilities, DocumentLinkData, DocumentLinkOptions, DocumentLinkParams, DocumentLinkRegistrationOptions, DocumentLinksOrNull, DocumentLinksOrNull$Storage, DocumentOnTypeFormattingClientCapabilities, DocumentOnTypeFormattingOptions, DocumentOnTypeFormattingParams, DocumentOnTypeFormattingRegistrationOptions, DocumentRangeFormattingClientCapabilities, DocumentRangeFormattingOptions, DocumentRangeFormattingParams, DocumentRangeFormattingRegistrationOptions, DocumentRangesFormattingParams, DocumentSelectorOrNull, DocumentSymbol, DocumentSymbolClientCapabilities, DocumentSymbolOptions, DocumentSymbolParams, DocumentSymbolRegistrationOptions, DocumentUriOrNull, EditRangeWithInsertReplace, ErrorCode, ErrorCodeContentModified$constant, ErrorCodeInternalError$constant, ErrorCodeInvalidParams$constant, ErrorCodeInvalidRequest$constant, ErrorCodeRequestCancelled$constant, ErrorCodeRequestFailed$constant, ErrorCodeServerNotInitialized$constant, ErrorCode_Error, ErrorCode_String, ExecuteCommandClientCapabilities, ExecuteCommandOptions, ExecuteCommandParams, ExecuteCommandRegistrationOptions, ExperimentalClientCapabilities, ExperimentalServerCapabilities, FailureHandlingKind, FileChangeType, FileChangeTypeChanged$constant, FileChangeTypeCreated$constant, FileChangeTypeDeleted$constant, FileChangeType_String, FileCreate, FileDelete, FileEvent, FileOperationClientCapabilities, FileOperationFilter, FileOperationOptions, FileOperationPattern, FileOperationPatternKind, FileOperationPatternOptions, FileOperationRegistrationOptions, FileRename, FileSystemWatcher, FoldingRange, FoldingRangeClientCapabilities, FoldingRangeKind, FoldingRangeKindComment$constant, FoldingRangeKindImports$constant, FoldingRangeKindRegion$constant, FoldingRangeOptions, FoldingRangeParams, FoldingRangeRegistrationOptions, FoldingRangeWorkspaceClientCapabilities, FoldingRangesOrNull, FoldingRangesOrNull$Storage, FormattingOptions, FullDocumentDiagnosticReport, FullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport, GeneralClientCapabilities, Hover, HoverClientCapabilities, HoverOptions, HoverOrNull, HoverOrNull$Storage, HoverParams, HoverRegistrationOptions, ImplementationClientCapabilities, ImplementationOptions, ImplementationParams, ImplementationRegistrationOptions, ImportKind, ImportKindCommonJS$constant, ImportKindDefault$constant, ImportKindNamed$constant, ImportKindNamespace$constant, ImportKind_String, InitializationOptions, InitializationOptionsOrNull, InitializeAPISessionParams, InitializeAPISessionResult, InitializeParams, InitializeResult, InitializedParams, InlayHint, InlayHintClientCapabilities, InlayHintData, InlayHintKind, InlayHintKindParameter$constant, InlayHintKindType$constant, InlayHintKind_String, InlayHintLabelPart, InlayHintOptions, InlayHintParams, InlayHintRegistrationOptions, InlayHintWorkspaceClientCapabilities, InlayHintsOrNull, InlayHintsOrNull$Storage, InlineCompletionClientCapabilities, InlineCompletionContext, InlineCompletionItem, InlineCompletionList, InlineCompletionListOrItemsOrNull, InlineCompletionListOrItemsOrNull$Storage, InlineCompletionOptions, InlineCompletionParams, InlineCompletionRegistrationOptions, InlineCompletionTriggerKind, InlineCompletionTriggerKind_String, InlineValueClientCapabilities, InlineValueContext, InlineValueEvaluatableExpression, InlineValueOptions, InlineValueParams, InlineValueRegistrationOptions, InlineValueText, InlineValueTextOrVariableLookupOrEvaluatableExpression, InlineValueTextOrVariableLookupOrEvaluatableExpression$Storage, InlineValueVariableLookup, InlineValueWorkspaceClientCapabilities, InlineValuesOrNull, InlineValuesOrNull$Storage, InsertReplaceEdit, InsertTextFormat, InsertTextFormatSnippet$constant, InsertTextFormat_String, InsertTextMode, InsertTextMode_String, IntegerOrNull, IntegerOrString, LSPAnyOrNull, LSPAnyOrNull$Storage, LanguageKind, LinkedEditingRangeClientCapabilities, LinkedEditingRangeOptions, LinkedEditingRangeParams, LinkedEditingRangeRegistrationOptions, LinkedEditingRanges, LinkedEditingRangesOrNull, LinkedEditingRangesOrNull$Storage, Location, Location$Storage, LocationLink, LocationOrLocationUriOnly, LocationOrLocationsOrDeclarationLinksOrNull, LocationOrLocationsOrDeclarationLinksOrNull$Storage, LocationOrLocationsOrDefinitionLinksOrNull, LocationOrLocationsOrDefinitionLinksOrNull$Storage, LocationUriOnly, LocationsOrNull, LocationsOrNull$Storage, LogMessageParams, LogTraceParams, LogVerbosity, LogVerbosityDebug$constant, LogVerbosityError$constant, LogVerbosityInfo$constant, LogVerbosityOff$constant, LogVerbosityTrace$constant, LogVerbosityWarning$constant, LogVerbosity_String, MarkdownClientCapabilities, MarkedStringWithLanguage, MarkupContent, MarkupContentOrStringOrMarkedStringWithLanguageOrMarkedStrings, MarkupKind, MarkupKindMarkdown$constant, MarkupKindPlainText$constant, MessageActionItem, MessageActionItemOrNull, MessageActionItemOrNull$Storage, MessageType, MessageTypeDebug$constant, MessageTypeError$constant, MessageTypeInfo$constant, MessageTypeWarning$constant, MessageType_String, MethodCallHierarchyIncomingCalls$constant, MethodCallHierarchyOutgoingCalls$constant, MethodCancelRequest$constant, MethodClientRegisterCapability$constant, MethodClientUnregisterCapability$constant, MethodCodeActionResolve$constant, MethodCodeLensResolve$constant, MethodCompletionItemResolve$constant, MethodCustomInitializeAPISession$constant, MethodCustomProjectInfo$constant, MethodCustomRunGC$constant, MethodCustomSaveAllocProfile$constant, MethodCustomSaveHeapProfile$constant, MethodCustomSetLogVerbosity$constant, MethodCustomStartCPUProfile$constant, MethodCustomStopCPUProfile$constant, MethodCustomTextDocumentMultiDocumentHighlight$constant, MethodCustomTextDocumentSourceDefinition$constant, MethodDocumentLinkResolve$constant, MethodExit$constant, MethodInitialize$constant, MethodInitialized$constant, MethodInlayHintResolve$constant, MethodLogTrace$constant, MethodProgress$constant, MethodSetTrace$constant, MethodShutdown$constant, MethodTelemetryEvent$constant, MethodTextDocumentCodeAction$constant, MethodTextDocumentCodeLens$constant, MethodTextDocumentColorPresentation$constant, MethodTextDocumentCompletion$constant, MethodTextDocumentDeclaration$constant, MethodTextDocumentDefinition$constant, MethodTextDocumentDiagnostic$constant, MethodTextDocumentDidChange$constant, MethodTextDocumentDidClose$constant, MethodTextDocumentDidOpen$constant, MethodTextDocumentDidSave$constant, MethodTextDocumentDocumentColor$constant, MethodTextDocumentDocumentHighlight$constant, MethodTextDocumentDocumentLink$constant, MethodTextDocumentDocumentSymbol$constant, MethodTextDocumentFoldingRange$constant, MethodTextDocumentFormatting$constant, MethodTextDocumentHover$constant, MethodTextDocumentImplementation$constant, MethodTextDocumentInlayHint$constant, MethodTextDocumentInlineCompletion$constant, MethodTextDocumentInlineValue$constant, MethodTextDocumentLinkedEditingRange$constant, MethodTextDocumentMoniker$constant, MethodTextDocumentOnTypeFormatting$constant, MethodTextDocumentPrepareCallHierarchy$constant, MethodTextDocumentPrepareRename$constant, MethodTextDocumentPrepareTypeHierarchy$constant, MethodTextDocumentPublishDiagnostics$constant, MethodTextDocumentRangeFormatting$constant, MethodTextDocumentRangesFormatting$constant, MethodTextDocumentReferences$constant, MethodTextDocumentRename$constant, MethodTextDocumentSelectionRange$constant, MethodTextDocumentSemanticTokens$constant, MethodTextDocumentSemanticTokensFull$constant, MethodTextDocumentSemanticTokensFullDelta$constant, MethodTextDocumentSemanticTokensRange$constant, MethodTextDocumentSignatureHelp$constant, MethodTextDocumentTypeDefinition$constant, MethodTextDocumentVSOnAutoInsert$constant, MethodTextDocumentVSReferences$constant, MethodTextDocumentWillSave$constant, MethodTextDocumentWillSaveWaitUntil$constant, MethodTypeHierarchySubtypes$constant, MethodTypeHierarchySupertypes$constant, MethodWindowLogMessage$constant, MethodWindowShowDocument$constant, MethodWindowShowMessage$constant, MethodWindowShowMessageRequest$constant, MethodWindowWorkDoneProgressCancel$constant, MethodWindowWorkDoneProgressCreate$constant, MethodWorkspaceApplyEdit$constant, MethodWorkspaceCodeLensRefresh$constant, MethodWorkspaceConfiguration$constant, MethodWorkspaceDiagnostic$constant, MethodWorkspaceDiagnosticRefresh$constant, MethodWorkspaceDidChangeConfiguration$constant, MethodWorkspaceDidChangeWatchedFiles$constant, MethodWorkspaceDidChangeWorkspaceFolders$constant, MethodWorkspaceDidCreateFiles$constant, MethodWorkspaceDidDeleteFiles$constant, MethodWorkspaceDidRenameFiles$constant, MethodWorkspaceExecuteCommand$constant, MethodWorkspaceFoldingRangeRefresh$constant, MethodWorkspaceInlayHintRefresh$constant, MethodWorkspaceInlineValueRefresh$constant, MethodWorkspaceSemanticTokensRefresh$constant, MethodWorkspaceSymbol$constant, MethodWorkspaceSymbolResolve$constant, MethodWorkspaceTextDocumentContent$constant, MethodWorkspaceTextDocumentContentRefresh$constant, MethodWorkspaceWillCreateFiles$constant, MethodWorkspaceWillDeleteFiles$constant, MethodWorkspaceWillRenameFiles$constant, MethodWorkspaceWorkspaceFolders$constant, Moniker, MonikerClientCapabilities, MonikerKind, MonikerOptions, MonikerParams, MonikerRegistrationOptions, MonikersOrNull, MonikersOrNull$Storage, MultiDocumentHighlight, MultiDocumentHighlightParams, MultiDocumentHighlightsOrNull, MultiDocumentHighlightsOrNull$Storage, OptionalVersionedTextDocumentIdentifier, ParameterInformation, PatternOrRelativePattern, PerformanceStatsTelemetryEvent, PerformanceStatsTelemetryMeasurements, Position, Position$Storage, PositionEncodingKind, PositionEncodingKindUTF16$constant, PositionEncodingKindUTF8$constant, PrepareRenameDefaultBehavior, PrepareRenameParams, PrepareRenamePlaceholder, PrepareSupportDefaultBehavior, PrepareSupportDefaultBehavior_String, PreviousResultId, PreviousResultId$Storage, ProfileParams, ProfileResult, ProgressParams, ProjectInfoParams, ProjectInfoResult, ProjectInfoTelemetryEvent, ProjectInfoTelemetryMeasurements, PublishDiagnosticsClientCapabilities, PublishDiagnosticsParams, Range, Range$Storage, RangeOrEditRangeWithInsertReplace, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull$Storage, ReferenceClientCapabilities, ReferenceContext, ReferenceOptions, ReferenceParams, ReferenceRegistrationOptions, RegisterOptions, Registration, RegistrationParams, RegularExpressionsClientCapabilities, RelatedFullDocumentDiagnosticReport, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport$Storage, RelatedUnchangedDocumentDiagnosticReport, RelativePattern, RenameClientCapabilities, RenameFile, RenameFileOptions, RenameFilesParams, RenameOptions, RenameParams, RenameRegistrationOptions, RequestFailureTelemetryEvent, RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull, RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull$Storage, RequestFailureTelemetryProperties, ResolvedCallHierarchyClientCapabilities, ResolvedChangeAnnotationsSupportOptions, ResolvedClientCapabilities, ResolvedClientCodeActionKindOptions, ResolvedClientCodeActionLiteralOptions, ResolvedClientCodeActionResolveOptions, ResolvedClientCodeLensResolveOptions, ResolvedClientCompletionItemInsertTextModeOptions, ResolvedClientCompletionItemOptions, ResolvedClientCompletionItemOptionsKind, ResolvedClientCompletionItemResolveOptions, ResolvedClientDiagnosticsTagOptions, ResolvedClientFoldingRangeKindOptions, ResolvedClientFoldingRangeOptions, ResolvedClientInlayHintResolveOptions, ResolvedClientSemanticTokensRequestOptions, ResolvedClientShowMessageActionItemOptions, ResolvedClientSignatureInformationOptions, ResolvedClientSignatureParameterInformationOptions, ResolvedClientSymbolKindOptions, ResolvedClientSymbolResolveOptions, ResolvedClientSymbolTagOptions, ResolvedCodeActionClientCapabilities, ResolvedCodeActionTagOptions, ResolvedCodeLensClientCapabilities, ResolvedCodeLensWorkspaceClientCapabilities, ResolvedCompletionClientCapabilities, ResolvedCompletionItemTagOptions, ResolvedCompletionListCapabilities, ResolvedDeclarationClientCapabilities, ResolvedDefinitionClientCapabilities, ResolvedDiagnosticClientCapabilities, ResolvedDiagnosticWorkspaceClientCapabilities, ResolvedDidChangeConfigurationClientCapabilities, ResolvedDidChangeWatchedFilesClientCapabilities, ResolvedDocumentColorClientCapabilities, ResolvedDocumentFormattingClientCapabilities, ResolvedDocumentHighlightClientCapabilities, ResolvedDocumentLinkClientCapabilities, ResolvedDocumentOnTypeFormattingClientCapabilities, ResolvedDocumentRangeFormattingClientCapabilities, ResolvedDocumentSymbolClientCapabilities, ResolvedExecuteCommandClientCapabilities, ResolvedExperimentalClientCapabilities, ResolvedFileOperationClientCapabilities, ResolvedFoldingRangeClientCapabilities, ResolvedFoldingRangeWorkspaceClientCapabilities, ResolvedGeneralClientCapabilities, ResolvedHoverClientCapabilities, ResolvedImplementationClientCapabilities, ResolvedInlayHintClientCapabilities, ResolvedInlayHintWorkspaceClientCapabilities, ResolvedInlineCompletionClientCapabilities, ResolvedInlineValueClientCapabilities, ResolvedInlineValueWorkspaceClientCapabilities, ResolvedLinkedEditingRangeClientCapabilities, ResolvedMarkdownClientCapabilities, ResolvedMonikerClientCapabilities, ResolvedPublishDiagnosticsClientCapabilities, ResolvedReferenceClientCapabilities, ResolvedRegularExpressionsClientCapabilities, ResolvedRenameClientCapabilities, ResolvedSelectionRangeClientCapabilities, ResolvedSemanticTokensClientCapabilities, ResolvedSemanticTokensWorkspaceClientCapabilities, ResolvedShowDocumentClientCapabilities, ResolvedShowMessageRequestClientCapabilities, ResolvedSignatureHelpClientCapabilities, ResolvedStaleRequestSupportOptions, ResolvedTextDocumentClientCapabilities, ResolvedTextDocumentContentClientCapabilities, ResolvedTextDocumentFilterClientCapabilities, ResolvedTextDocumentSyncClientCapabilities, ResolvedTypeDefinitionClientCapabilities, ResolvedTypeHierarchyClientCapabilities, ResolvedWindowClientCapabilities, ResolvedWorkspaceClientCapabilities, ResolvedWorkspaceEditClientCapabilities, ResolvedWorkspaceSymbolClientCapabilities, ResourceOperationKind, ResourceOperationKindRename$constant, SaveOptions, SelectedCompletionInfo, SelectionRange, SelectionRangeClientCapabilities, SelectionRangeOptions, SelectionRangeParams, SelectionRangeRegistrationOptions, SelectionRangesOrNull, SelectionRangesOrNull$Storage, SemanticTokenModifier, SemanticTokenModifierAbstract$constant, SemanticTokenModifierAsync$constant, SemanticTokenModifierDeclaration$constant, SemanticTokenModifierDefaultLibrary$constant, SemanticTokenModifierDefinition$constant, SemanticTokenModifierDeprecated$constant, SemanticTokenModifierDocumentation$constant, SemanticTokenModifierModification$constant, SemanticTokenModifierReadonly$constant, SemanticTokenModifierStatic$constant, SemanticTokenType, SemanticTokenTypeClass$constant, SemanticTokenTypeComment$constant, SemanticTokenTypeDecorator$constant, SemanticTokenTypeEnum$constant, SemanticTokenTypeEnumMember$constant, SemanticTokenTypeEvent$constant, SemanticTokenTypeFunction$constant, SemanticTokenTypeInterface$constant, SemanticTokenTypeKeyword$constant, SemanticTokenTypeLabel$constant, SemanticTokenTypeMacro$constant, SemanticTokenTypeMethod$constant, SemanticTokenTypeNamespace$constant, SemanticTokenTypeNumber$constant, SemanticTokenTypeOperator$constant, SemanticTokenTypeParameter$constant, SemanticTokenTypeProperty$constant, SemanticTokenTypeRegexp$constant, SemanticTokenTypeString$constant, SemanticTokenTypeStruct$constant, SemanticTokenTypeType$constant, SemanticTokenTypeTypeParameter$constant, SemanticTokenTypeVariable$constant, SemanticTokens, SemanticTokensClientCapabilities, SemanticTokensDelta, SemanticTokensDeltaParams, SemanticTokensEdit, SemanticTokensFullDelta, SemanticTokensLegend, SemanticTokensOptions, SemanticTokensOptionsOrRegistrationOptions, SemanticTokensOrNull, SemanticTokensOrNull$Storage, SemanticTokensOrSemanticTokensDeltaOrNull, SemanticTokensOrSemanticTokensDeltaOrNull$Storage, SemanticTokensParams, SemanticTokensRangeParams, SemanticTokensRegistrationOptions, SemanticTokensWorkspaceClientCapabilities, ServerCapabilities, ServerCompletionItemOptions, ServerInfo, SetLogVerbosityParams, SetTraceParams, ShowDocumentClientCapabilities, ShowDocumentParams, ShowDocumentResult, ShowMessageParams, ShowMessageRequestClientCapabilities, ShowMessageRequestParams, SignatureHelp, SignatureHelpClientCapabilities, SignatureHelpContext, SignatureHelpOptions, SignatureHelpOrNull, SignatureHelpOrNull$Storage, SignatureHelpParams, SignatureHelpRegistrationOptions, SignatureHelpTriggerKind, SignatureHelpTriggerKindContentChange$constant, SignatureHelpTriggerKindInvoked$constant, SignatureHelpTriggerKindTriggerCharacter$constant, SignatureHelpTriggerKind_String, SignatureInformation, SnippetTextEdit, StaleRequestSupportOptions, StringLiteralBegin, StringLiteralClassifiedTextElement, StringLiteralClassifiedTextRun, StringLiteralCreate, StringLiteralDelete, StringLiteralEnd, StringLiteralError, StringLiteralFull, StringLiteralLanguageServerErrorResponse, StringLiteralLanguageServerPerformanceStats, StringLiteralLanguageServerProjectInfo, StringLiteralRename, StringLiteralReport, StringLiteralSnippet, StringLiteralUnchanged, StringLiteralUsage, StringOrBoolean, StringOrInlayHintLabelParts, StringOrMarkedStringWithLanguage, StringOrMarkedStringWithLanguage$Storage, StringOrMarkupContent, StringOrNull, StringOrStringValue, StringOrStrings, StringOrTuple, StringValue, SymbolInformation, SymbolInformation$Storage, SymbolInformationsOrDocumentSymbolsOrNull, SymbolInformationsOrDocumentSymbolsOrNull$Storage, SymbolInformationsOrWorkspaceSymbolsOrNull, SymbolInformationsOrWorkspaceSymbolsOrNull$Storage, SymbolKind, SymbolKindClass$constant, SymbolKindConstructor$constant, SymbolKindEnum$constant, SymbolKindEnumMember$constant, SymbolKindFile$constant, SymbolKindFunction$constant, SymbolKindInterface$constant, SymbolKindMethod$constant, SymbolKindModule$constant, SymbolKindNamespace$constant, SymbolKindProperty$constant, SymbolKindTypeParameter$constant, SymbolKindVariable$constant, SymbolKind_String, SymbolTag, SymbolTag_String, TextDocumentChangeRegistrationOptions, TextDocumentClientCapabilities, TextDocumentContentChangePartial, TextDocumentContentChangePartialOrWholeDocument, TextDocumentContentChangePartialOrWholeDocument$Storage, TextDocumentContentChangeWholeDocument, TextDocumentContentClientCapabilities, TextDocumentContentOptions, TextDocumentContentOptionsOrRegistrationOptions, TextDocumentContentParams, TextDocumentContentRefreshParams, TextDocumentContentRegistrationOptions, TextDocumentContentResult, TextDocumentEdit, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile$Storage, TextDocumentFilterClientCapabilities, TextDocumentFilterLanguage, TextDocumentFilterLanguageOrSchemeOrPattern, TextDocumentFilterLanguageOrSchemeOrPattern$Storage, TextDocumentFilterPattern, TextDocumentFilterScheme, TextDocumentIdentifier, TextDocumentItem, TextDocumentPositionParams, TextDocumentRegistrationOptions, TextDocumentSaveReason, TextDocumentSaveReason_String, TextDocumentSaveRegistrationOptions, TextDocumentSyncClientCapabilities, TextDocumentSyncKind, TextDocumentSyncKindIncremental$constant, TextDocumentSyncKind_String, TextDocumentSyncOptions, TextDocumentSyncOptionsOrKind, TextEdit, TextEditOrAnnotatedTextEditOrSnippetTextEdit, TextEditOrAnnotatedTextEditOrSnippetTextEdit$Storage, TextEditOrInsertReplaceEdit, TextEditsOrNull, TextEditsOrNull$Storage, TokenFormat, TraceValue, TypeDefinitionClientCapabilities, TypeDefinitionOptions, TypeDefinitionParams, TypeDefinitionRegistrationOptions, TypeHierarchyClientCapabilities, TypeHierarchyItem, TypeHierarchyItemData, TypeHierarchyItemsOrNull, TypeHierarchyItemsOrNull$Storage, TypeHierarchyOptions, TypeHierarchyPrepareParams, TypeHierarchyRegistrationOptions, TypeHierarchySubtypesParams, TypeHierarchySupertypesParams, UintegerOrNull, UnchangedDocumentDiagnosticReport, UniquenessLevel, Unregistration, UnregistrationParams, VSClassifiedTextElement, VSClassifiedTextRun, VSOnAutoInsertOptions, VSOnAutoInsertParams, VSOnAutoInsertResponseItem, VSOnAutoInsertResponseItemOrNull, VSOnAutoInsertResponseItemOrNull$Storage, VSReferenceItem, VSReferenceItemsOrNull, VSReferenceItemsOrNull$Storage, VSReferenceKind, VSReferenceKindRead$constant, VSReferenceKindUnknown$constant, VSReferenceKindWrite$constant, VSReferenceKind_String, VersionedTextDocumentIdentifier, WatchKind, WatchKindCreate$constant, WatchKindDelete$constant, WatchKind_String, WillSaveTextDocumentParams, WindowClientCapabilities, WorkDoneProgressBegin, WorkDoneProgressBeginOrReportOrEnd, WorkDoneProgressCancelParams, WorkDoneProgressCreateParams, WorkDoneProgressEnd, WorkDoneProgressReport, WorkspaceClientCapabilities, WorkspaceDiagnosticParams, WorkspaceDiagnosticReport, WorkspaceEdit, WorkspaceEditClientCapabilities, WorkspaceEditMetadata, WorkspaceEditOrNull, WorkspaceEditOrNull$Storage, WorkspaceFolder, WorkspaceFolderOrURI, WorkspaceFoldersChangeEvent, WorkspaceFoldersOrNull, WorkspaceFoldersOrNull$Storage, WorkspaceFoldersServerCapabilities, WorkspaceFullDocumentDiagnosticReport, WorkspaceFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport, WorkspaceFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport$Storage, WorkspaceOptions, WorkspaceSymbol, WorkspaceSymbolClientCapabilities, WorkspaceSymbolData, WorkspaceSymbolOptions, WorkspaceSymbolParams, WorkspaceSymbolRegistrationOptions, WorkspaceUnchangedDocumentDiagnosticReport } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
export { ComparePositions, CompareRanges } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/util.js";
export let AddAsTypeOnlyAllowed: ReturnType<typeof AddAsTypeOnlyAllowed$constant>;
export let AddAsTypeOnlyNotAllowed: ReturnType<typeof AddAsTypeOnlyNotAllowed$constant>;
export let AddAsTypeOnlyRequired: ReturnType<typeof AddAsTypeOnlyRequired$constant>;
export let AutoImportFixKindAddNew: ReturnType<typeof AutoImportFixKindAddNew$constant>;
export let AutoImportFixKindAddToExisting: ReturnType<typeof AutoImportFixKindAddToExisting$constant>;
export let AutoImportFixKindJsdocTypeImport: ReturnType<typeof AutoImportFixKindJsdocTypeImport$constant>;
export let AutoImportFixKindPromoteTypeOnly: ReturnType<typeof AutoImportFixKindPromoteTypeOnly$constant>;
export let AutoImportFixKindUseNamespace: ReturnType<typeof AutoImportFixKindUseNamespace$constant>;
export let ClassificationTypeNameClassName: ReturnType<typeof ClassificationTypeNameClassName$constant>;
export let ClassificationTypeNameEnumName: ReturnType<typeof ClassificationTypeNameEnumName$constant>;
export let ClassificationTypeNameFieldName: ReturnType<typeof ClassificationTypeNameFieldName$constant>;
export let ClassificationTypeNameIdentifier: ReturnType<typeof ClassificationTypeNameIdentifier$constant>;
export let ClassificationTypeNameInterfaceName: ReturnType<typeof ClassificationTypeNameInterfaceName$constant>;
export let ClassificationTypeNameKeyword: ReturnType<typeof ClassificationTypeNameKeyword$constant>;
export let ClassificationTypeNameLocalName: ReturnType<typeof ClassificationTypeNameLocalName$constant>;
export let ClassificationTypeNameMethodName: ReturnType<typeof ClassificationTypeNameMethodName$constant>;
export let ClassificationTypeNameModuleName: ReturnType<typeof ClassificationTypeNameModuleName$constant>;
export let ClassificationTypeNameOperator: ReturnType<typeof ClassificationTypeNameOperator$constant>;
export let ClassificationTypeNameParameterName: ReturnType<typeof ClassificationTypeNameParameterName$constant>;
export let ClassificationTypeNamePropertyName: ReturnType<typeof ClassificationTypeNamePropertyName$constant>;
export let ClassificationTypeNamePunctuation: ReturnType<typeof ClassificationTypeNamePunctuation$constant>;
export let ClassificationTypeNameString: ReturnType<typeof ClassificationTypeNameString$constant>;
export let ClassificationTypeNameText: ReturnType<typeof ClassificationTypeNameText$constant>;
export let ClassificationTypeNameTypeParameterName: ReturnType<typeof ClassificationTypeNameTypeParameterName$constant>;
export let ClassificationTypeNameWhiteSpace: ReturnType<typeof ClassificationTypeNameWhiteSpace$constant>;
export let CodeActionKindQuickFix: ReturnType<typeof CodeActionKindQuickFix$constant>;
export let CodeActionKindSourceFixAll: ReturnType<typeof CodeActionKindSourceFixAll$constant>;
export let CodeActionKindSourceOrganizeImports: ReturnType<typeof CodeActionKindSourceOrganizeImports$constant>;
export let CodeActionKindSourceRemoveUnusedImports: ReturnType<typeof CodeActionKindSourceRemoveUnusedImports$constant>;
export let CodeActionKindSourceSortImports: ReturnType<typeof CodeActionKindSourceSortImports$constant>;
export let CodeLensKindImplementations: ReturnType<typeof CodeLensKindImplementations$constant>;
export let CodeLensKindReferences: ReturnType<typeof CodeLensKindReferences$constant>;
export let CompletionItemKindClass: ReturnType<typeof CompletionItemKindClass$constant>;
export let CompletionItemKindConstant: ReturnType<typeof CompletionItemKindConstant$constant>;
export let CompletionItemKindEnum: ReturnType<typeof CompletionItemKindEnum$constant>;
export let CompletionItemKindEnumMember: ReturnType<typeof CompletionItemKindEnumMember$constant>;
export let CompletionItemKindField: ReturnType<typeof CompletionItemKindField$constant>;
export let CompletionItemKindFile: ReturnType<typeof CompletionItemKindFile$constant>;
export let CompletionItemKindFolder: ReturnType<typeof CompletionItemKindFolder$constant>;
export let CompletionItemKindFunction: ReturnType<typeof CompletionItemKindFunction$constant>;
export let CompletionItemKindInterface: ReturnType<typeof CompletionItemKindInterface$constant>;
export let CompletionItemKindKeyword: ReturnType<typeof CompletionItemKindKeyword$constant>;
export let CompletionItemKindMethod: ReturnType<typeof CompletionItemKindMethod$constant>;
export let CompletionItemKindModule: ReturnType<typeof CompletionItemKindModule$constant>;
export let CompletionItemKindProperty: ReturnType<typeof CompletionItemKindProperty$constant>;
export let CompletionItemKindSnippet: ReturnType<typeof CompletionItemKindSnippet$constant>;
export let CompletionItemKindText: ReturnType<typeof CompletionItemKindText$constant>;
export let CompletionItemKindVariable: ReturnType<typeof CompletionItemKindVariable$constant>;
export let CompletionItemTagDeprecated: ReturnType<typeof CompletionItemTagDeprecated$constant>;
export let DiagnosticSeverityError: ReturnType<typeof DiagnosticSeverityError$constant>;
export let DiagnosticSeverityHint: ReturnType<typeof DiagnosticSeverityHint$constant>;
export let DiagnosticSeverityInformation: ReturnType<typeof DiagnosticSeverityInformation$constant>;
export let DiagnosticSeverityWarning: ReturnType<typeof DiagnosticSeverityWarning$constant>;
export let DiagnosticTagDeprecated: ReturnType<typeof DiagnosticTagDeprecated$constant>;
export let DiagnosticTagUnnecessary: ReturnType<typeof DiagnosticTagUnnecessary$constant>;
export let DocumentHighlightKindRead: ReturnType<typeof DocumentHighlightKindRead$constant>;
export let DocumentHighlightKindWrite: ReturnType<typeof DocumentHighlightKindWrite$constant>;
export let ErrorCodeContentModified: ReturnType<typeof ErrorCodeContentModified$constant>;
export let ErrorCodeInternalError: ReturnType<typeof ErrorCodeInternalError$constant>;
export let ErrorCodeInvalidParams: ReturnType<typeof ErrorCodeInvalidParams$constant>;
export let ErrorCodeInvalidRequest: ReturnType<typeof ErrorCodeInvalidRequest$constant>;
export let ErrorCodeRequestCancelled: ReturnType<typeof ErrorCodeRequestCancelled$constant>;
export let ErrorCodeRequestFailed: ReturnType<typeof ErrorCodeRequestFailed$constant>;
export let ErrorCodeServerNotInitialized: ReturnType<typeof ErrorCodeServerNotInitialized$constant>;
export let FileChangeTypeChanged: ReturnType<typeof FileChangeTypeChanged$constant>;
export let FileChangeTypeCreated: ReturnType<typeof FileChangeTypeCreated$constant>;
export let FileChangeTypeDeleted: ReturnType<typeof FileChangeTypeDeleted$constant>;
export let FoldingRangeKindComment: ReturnType<typeof FoldingRangeKindComment$constant>;
export let FoldingRangeKindImports: ReturnType<typeof FoldingRangeKindImports$constant>;
export let FoldingRangeKindRegion: ReturnType<typeof FoldingRangeKindRegion$constant>;
export let ImportKindCommonJS: ReturnType<typeof ImportKindCommonJS$constant>;
export let ImportKindDefault: ReturnType<typeof ImportKindDefault$constant>;
export let ImportKindNamed: ReturnType<typeof ImportKindNamed$constant>;
export let ImportKindNamespace: ReturnType<typeof ImportKindNamespace$constant>;
export let InlayHintKindParameter: ReturnType<typeof InlayHintKindParameter$constant>;
export let InlayHintKindType: ReturnType<typeof InlayHintKindType$constant>;
export let InsertTextFormatSnippet: ReturnType<typeof InsertTextFormatSnippet$constant>;
export let LogVerbosityDebug: ReturnType<typeof LogVerbosityDebug$constant>;
export let LogVerbosityError: ReturnType<typeof LogVerbosityError$constant>;
export let LogVerbosityInfo: ReturnType<typeof LogVerbosityInfo$constant>;
export let LogVerbosityOff: ReturnType<typeof LogVerbosityOff$constant>;
export let LogVerbosityTrace: ReturnType<typeof LogVerbosityTrace$constant>;
export let LogVerbosityWarning: ReturnType<typeof LogVerbosityWarning$constant>;
export let MarkupKindMarkdown: ReturnType<typeof MarkupKindMarkdown$constant>;
export let MarkupKindPlainText: ReturnType<typeof MarkupKindPlainText$constant>;
export let MessageTypeDebug: ReturnType<typeof MessageTypeDebug$constant>;
export let MessageTypeError: ReturnType<typeof MessageTypeError$constant>;
export let MessageTypeInfo: ReturnType<typeof MessageTypeInfo$constant>;
export let MessageTypeWarning: ReturnType<typeof MessageTypeWarning$constant>;
export let MethodCallHierarchyIncomingCalls: ReturnType<typeof MethodCallHierarchyIncomingCalls$constant>;
export let MethodCallHierarchyOutgoingCalls: ReturnType<typeof MethodCallHierarchyOutgoingCalls$constant>;
export let MethodCancelRequest: ReturnType<typeof MethodCancelRequest$constant>;
export let MethodClientRegisterCapability: ReturnType<typeof MethodClientRegisterCapability$constant>;
export let MethodClientUnregisterCapability: ReturnType<typeof MethodClientUnregisterCapability$constant>;
export let MethodCodeActionResolve: ReturnType<typeof MethodCodeActionResolve$constant>;
export let MethodCodeLensResolve: ReturnType<typeof MethodCodeLensResolve$constant>;
export let MethodCompletionItemResolve: ReturnType<typeof MethodCompletionItemResolve$constant>;
export let MethodCustomInitializeAPISession: ReturnType<typeof MethodCustomInitializeAPISession$constant>;
export let MethodCustomProjectInfo: ReturnType<typeof MethodCustomProjectInfo$constant>;
export let MethodCustomRunGC: ReturnType<typeof MethodCustomRunGC$constant>;
export let MethodCustomSaveAllocProfile: ReturnType<typeof MethodCustomSaveAllocProfile$constant>;
export let MethodCustomSaveHeapProfile: ReturnType<typeof MethodCustomSaveHeapProfile$constant>;
export let MethodCustomSetLogVerbosity: ReturnType<typeof MethodCustomSetLogVerbosity$constant>;
export let MethodCustomStartCPUProfile: ReturnType<typeof MethodCustomStartCPUProfile$constant>;
export let MethodCustomStopCPUProfile: ReturnType<typeof MethodCustomStopCPUProfile$constant>;
export let MethodCustomTextDocumentMultiDocumentHighlight: ReturnType<typeof MethodCustomTextDocumentMultiDocumentHighlight$constant>;
export let MethodCustomTextDocumentSourceDefinition: ReturnType<typeof MethodCustomTextDocumentSourceDefinition$constant>;
export let MethodDocumentLinkResolve: ReturnType<typeof MethodDocumentLinkResolve$constant>;
export let MethodExit: ReturnType<typeof MethodExit$constant>;
export let MethodInitialize: ReturnType<typeof MethodInitialize$constant>;
export let MethodInitialized: ReturnType<typeof MethodInitialized$constant>;
export let MethodInlayHintResolve: ReturnType<typeof MethodInlayHintResolve$constant>;
export let MethodLogTrace: ReturnType<typeof MethodLogTrace$constant>;
export let MethodProgress: ReturnType<typeof MethodProgress$constant>;
export let MethodSetTrace: ReturnType<typeof MethodSetTrace$constant>;
export let MethodShutdown: ReturnType<typeof MethodShutdown$constant>;
export let MethodTelemetryEvent: ReturnType<typeof MethodTelemetryEvent$constant>;
export let MethodTextDocumentCodeAction: ReturnType<typeof MethodTextDocumentCodeAction$constant>;
export let MethodTextDocumentCodeLens: ReturnType<typeof MethodTextDocumentCodeLens$constant>;
export let MethodTextDocumentColorPresentation: ReturnType<typeof MethodTextDocumentColorPresentation$constant>;
export let MethodTextDocumentCompletion: ReturnType<typeof MethodTextDocumentCompletion$constant>;
export let MethodTextDocumentDeclaration: ReturnType<typeof MethodTextDocumentDeclaration$constant>;
export let MethodTextDocumentDefinition: ReturnType<typeof MethodTextDocumentDefinition$constant>;
export let MethodTextDocumentDiagnostic: ReturnType<typeof MethodTextDocumentDiagnostic$constant>;
export let MethodTextDocumentDidChange: ReturnType<typeof MethodTextDocumentDidChange$constant>;
export let MethodTextDocumentDidClose: ReturnType<typeof MethodTextDocumentDidClose$constant>;
export let MethodTextDocumentDidOpen: ReturnType<typeof MethodTextDocumentDidOpen$constant>;
export let MethodTextDocumentDidSave: ReturnType<typeof MethodTextDocumentDidSave$constant>;
export let MethodTextDocumentDocumentColor: ReturnType<typeof MethodTextDocumentDocumentColor$constant>;
export let MethodTextDocumentDocumentHighlight: ReturnType<typeof MethodTextDocumentDocumentHighlight$constant>;
export let MethodTextDocumentDocumentLink: ReturnType<typeof MethodTextDocumentDocumentLink$constant>;
export let MethodTextDocumentDocumentSymbol: ReturnType<typeof MethodTextDocumentDocumentSymbol$constant>;
export let MethodTextDocumentFoldingRange: ReturnType<typeof MethodTextDocumentFoldingRange$constant>;
export let MethodTextDocumentFormatting: ReturnType<typeof MethodTextDocumentFormatting$constant>;
export let MethodTextDocumentHover: ReturnType<typeof MethodTextDocumentHover$constant>;
export let MethodTextDocumentImplementation: ReturnType<typeof MethodTextDocumentImplementation$constant>;
export let MethodTextDocumentInlayHint: ReturnType<typeof MethodTextDocumentInlayHint$constant>;
export let MethodTextDocumentInlineCompletion: ReturnType<typeof MethodTextDocumentInlineCompletion$constant>;
export let MethodTextDocumentInlineValue: ReturnType<typeof MethodTextDocumentInlineValue$constant>;
export let MethodTextDocumentLinkedEditingRange: ReturnType<typeof MethodTextDocumentLinkedEditingRange$constant>;
export let MethodTextDocumentMoniker: ReturnType<typeof MethodTextDocumentMoniker$constant>;
export let MethodTextDocumentOnTypeFormatting: ReturnType<typeof MethodTextDocumentOnTypeFormatting$constant>;
export let MethodTextDocumentPrepareCallHierarchy: ReturnType<typeof MethodTextDocumentPrepareCallHierarchy$constant>;
export let MethodTextDocumentPrepareRename: ReturnType<typeof MethodTextDocumentPrepareRename$constant>;
export let MethodTextDocumentPrepareTypeHierarchy: ReturnType<typeof MethodTextDocumentPrepareTypeHierarchy$constant>;
export let MethodTextDocumentPublishDiagnostics: ReturnType<typeof MethodTextDocumentPublishDiagnostics$constant>;
export let MethodTextDocumentRangeFormatting: ReturnType<typeof MethodTextDocumentRangeFormatting$constant>;
export let MethodTextDocumentRangesFormatting: ReturnType<typeof MethodTextDocumentRangesFormatting$constant>;
export let MethodTextDocumentReferences: ReturnType<typeof MethodTextDocumentReferences$constant>;
export let MethodTextDocumentRename: ReturnType<typeof MethodTextDocumentRename$constant>;
export let MethodTextDocumentSelectionRange: ReturnType<typeof MethodTextDocumentSelectionRange$constant>;
export let MethodTextDocumentSemanticTokens: ReturnType<typeof MethodTextDocumentSemanticTokens$constant>;
export let MethodTextDocumentSemanticTokensFull: ReturnType<typeof MethodTextDocumentSemanticTokensFull$constant>;
export let MethodTextDocumentSemanticTokensFullDelta: ReturnType<typeof MethodTextDocumentSemanticTokensFullDelta$constant>;
export let MethodTextDocumentSemanticTokensRange: ReturnType<typeof MethodTextDocumentSemanticTokensRange$constant>;
export let MethodTextDocumentSignatureHelp: ReturnType<typeof MethodTextDocumentSignatureHelp$constant>;
export let MethodTextDocumentTypeDefinition: ReturnType<typeof MethodTextDocumentTypeDefinition$constant>;
export let MethodTextDocumentVSOnAutoInsert: ReturnType<typeof MethodTextDocumentVSOnAutoInsert$constant>;
export let MethodTextDocumentVSReferences: ReturnType<typeof MethodTextDocumentVSReferences$constant>;
export let MethodTextDocumentWillSave: ReturnType<typeof MethodTextDocumentWillSave$constant>;
export let MethodTextDocumentWillSaveWaitUntil: ReturnType<typeof MethodTextDocumentWillSaveWaitUntil$constant>;
export let MethodTypeHierarchySubtypes: ReturnType<typeof MethodTypeHierarchySubtypes$constant>;
export let MethodTypeHierarchySupertypes: ReturnType<typeof MethodTypeHierarchySupertypes$constant>;
export let MethodWindowLogMessage: ReturnType<typeof MethodWindowLogMessage$constant>;
export let MethodWindowShowDocument: ReturnType<typeof MethodWindowShowDocument$constant>;
export let MethodWindowShowMessage: ReturnType<typeof MethodWindowShowMessage$constant>;
export let MethodWindowShowMessageRequest: ReturnType<typeof MethodWindowShowMessageRequest$constant>;
export let MethodWindowWorkDoneProgressCancel: ReturnType<typeof MethodWindowWorkDoneProgressCancel$constant>;
export let MethodWindowWorkDoneProgressCreate: ReturnType<typeof MethodWindowWorkDoneProgressCreate$constant>;
export let MethodWorkspaceApplyEdit: ReturnType<typeof MethodWorkspaceApplyEdit$constant>;
export let MethodWorkspaceCodeLensRefresh: ReturnType<typeof MethodWorkspaceCodeLensRefresh$constant>;
export let MethodWorkspaceConfiguration: ReturnType<typeof MethodWorkspaceConfiguration$constant>;
export let MethodWorkspaceDiagnostic: ReturnType<typeof MethodWorkspaceDiagnostic$constant>;
export let MethodWorkspaceDiagnosticRefresh: ReturnType<typeof MethodWorkspaceDiagnosticRefresh$constant>;
export let MethodWorkspaceDidChangeConfiguration: ReturnType<typeof MethodWorkspaceDidChangeConfiguration$constant>;
export let MethodWorkspaceDidChangeWatchedFiles: ReturnType<typeof MethodWorkspaceDidChangeWatchedFiles$constant>;
export let MethodWorkspaceDidChangeWorkspaceFolders: ReturnType<typeof MethodWorkspaceDidChangeWorkspaceFolders$constant>;
export let MethodWorkspaceDidCreateFiles: ReturnType<typeof MethodWorkspaceDidCreateFiles$constant>;
export let MethodWorkspaceDidDeleteFiles: ReturnType<typeof MethodWorkspaceDidDeleteFiles$constant>;
export let MethodWorkspaceDidRenameFiles: ReturnType<typeof MethodWorkspaceDidRenameFiles$constant>;
export let MethodWorkspaceExecuteCommand: ReturnType<typeof MethodWorkspaceExecuteCommand$constant>;
export let MethodWorkspaceFoldingRangeRefresh: ReturnType<typeof MethodWorkspaceFoldingRangeRefresh$constant>;
export let MethodWorkspaceInlayHintRefresh: ReturnType<typeof MethodWorkspaceInlayHintRefresh$constant>;
export let MethodWorkspaceInlineValueRefresh: ReturnType<typeof MethodWorkspaceInlineValueRefresh$constant>;
export let MethodWorkspaceSemanticTokensRefresh: ReturnType<typeof MethodWorkspaceSemanticTokensRefresh$constant>;
export let MethodWorkspaceSymbol: ReturnType<typeof MethodWorkspaceSymbol$constant>;
export let MethodWorkspaceSymbolResolve: ReturnType<typeof MethodWorkspaceSymbolResolve$constant>;
export let MethodWorkspaceTextDocumentContent: ReturnType<typeof MethodWorkspaceTextDocumentContent$constant>;
export let MethodWorkspaceTextDocumentContentRefresh: ReturnType<typeof MethodWorkspaceTextDocumentContentRefresh$constant>;
export let MethodWorkspaceWillCreateFiles: ReturnType<typeof MethodWorkspaceWillCreateFiles$constant>;
export let MethodWorkspaceWillDeleteFiles: ReturnType<typeof MethodWorkspaceWillDeleteFiles$constant>;
export let MethodWorkspaceWillRenameFiles: ReturnType<typeof MethodWorkspaceWillRenameFiles$constant>;
export let MethodWorkspaceWorkspaceFolders: ReturnType<typeof MethodWorkspaceWorkspaceFolders$constant>;
export let PositionEncodingKindUTF16: ReturnType<typeof PositionEncodingKindUTF16$constant>;
export let PositionEncodingKindUTF8: ReturnType<typeof PositionEncodingKindUTF8$constant>;
export let ResourceOperationKindRename: ReturnType<typeof ResourceOperationKindRename$constant>;
export let SemanticTokenModifierAbstract: ReturnType<typeof SemanticTokenModifierAbstract$constant>;
export let SemanticTokenModifierAsync: ReturnType<typeof SemanticTokenModifierAsync$constant>;
export let SemanticTokenModifierDeclaration: ReturnType<typeof SemanticTokenModifierDeclaration$constant>;
export let SemanticTokenModifierDefaultLibrary: ReturnType<typeof SemanticTokenModifierDefaultLibrary$constant>;
export let SemanticTokenModifierDefinition: ReturnType<typeof SemanticTokenModifierDefinition$constant>;
export let SemanticTokenModifierDeprecated: ReturnType<typeof SemanticTokenModifierDeprecated$constant>;
export let SemanticTokenModifierDocumentation: ReturnType<typeof SemanticTokenModifierDocumentation$constant>;
export let SemanticTokenModifierModification: ReturnType<typeof SemanticTokenModifierModification$constant>;
export let SemanticTokenModifierReadonly: ReturnType<typeof SemanticTokenModifierReadonly$constant>;
export let SemanticTokenModifierStatic: ReturnType<typeof SemanticTokenModifierStatic$constant>;
export let SemanticTokenTypeClass: ReturnType<typeof SemanticTokenTypeClass$constant>;
export let SemanticTokenTypeComment: ReturnType<typeof SemanticTokenTypeComment$constant>;
export let SemanticTokenTypeDecorator: ReturnType<typeof SemanticTokenTypeDecorator$constant>;
export let SemanticTokenTypeEnum: ReturnType<typeof SemanticTokenTypeEnum$constant>;
export let SemanticTokenTypeEnumMember: ReturnType<typeof SemanticTokenTypeEnumMember$constant>;
export let SemanticTokenTypeEvent: ReturnType<typeof SemanticTokenTypeEvent$constant>;
export let SemanticTokenTypeFunction: ReturnType<typeof SemanticTokenTypeFunction$constant>;
export let SemanticTokenTypeInterface: ReturnType<typeof SemanticTokenTypeInterface$constant>;
export let SemanticTokenTypeKeyword: ReturnType<typeof SemanticTokenTypeKeyword$constant>;
export let SemanticTokenTypeLabel: ReturnType<typeof SemanticTokenTypeLabel$constant>;
export let SemanticTokenTypeMacro: ReturnType<typeof SemanticTokenTypeMacro$constant>;
export let SemanticTokenTypeMethod: ReturnType<typeof SemanticTokenTypeMethod$constant>;
export let SemanticTokenTypeNamespace: ReturnType<typeof SemanticTokenTypeNamespace$constant>;
export let SemanticTokenTypeNumber: ReturnType<typeof SemanticTokenTypeNumber$constant>;
export let SemanticTokenTypeOperator: ReturnType<typeof SemanticTokenTypeOperator$constant>;
export let SemanticTokenTypeParameter: ReturnType<typeof SemanticTokenTypeParameter$constant>;
export let SemanticTokenTypeProperty: ReturnType<typeof SemanticTokenTypeProperty$constant>;
export let SemanticTokenTypeRegexp: ReturnType<typeof SemanticTokenTypeRegexp$constant>;
export let SemanticTokenTypeString: ReturnType<typeof SemanticTokenTypeString$constant>;
export let SemanticTokenTypeStruct: ReturnType<typeof SemanticTokenTypeStruct$constant>;
export let SemanticTokenTypeType: ReturnType<typeof SemanticTokenTypeType$constant>;
export let SemanticTokenTypeTypeParameter: ReturnType<typeof SemanticTokenTypeTypeParameter$constant>;
export let SemanticTokenTypeVariable: ReturnType<typeof SemanticTokenTypeVariable$constant>;
export let SignatureHelpTriggerKindContentChange: ReturnType<typeof SignatureHelpTriggerKindContentChange$constant>;
export let SignatureHelpTriggerKindInvoked: ReturnType<typeof SignatureHelpTriggerKindInvoked$constant>;
export let SignatureHelpTriggerKindTriggerCharacter: ReturnType<typeof SignatureHelpTriggerKindTriggerCharacter$constant>;
export let SymbolKindClass: ReturnType<typeof SymbolKindClass$constant>;
export let SymbolKindConstructor: ReturnType<typeof SymbolKindConstructor$constant>;
export let SymbolKindEnum: ReturnType<typeof SymbolKindEnum$constant>;
export let SymbolKindEnumMember: ReturnType<typeof SymbolKindEnumMember$constant>;
export let SymbolKindFile: ReturnType<typeof SymbolKindFile$constant>;
export let SymbolKindFunction: ReturnType<typeof SymbolKindFunction$constant>;
export let SymbolKindInterface: ReturnType<typeof SymbolKindInterface$constant>;
export let SymbolKindMethod: ReturnType<typeof SymbolKindMethod$constant>;
export let SymbolKindModule: ReturnType<typeof SymbolKindModule$constant>;
export let SymbolKindNamespace: ReturnType<typeof SymbolKindNamespace$constant>;
export let SymbolKindProperty: ReturnType<typeof SymbolKindProperty$constant>;
export let SymbolKindTypeParameter: ReturnType<typeof SymbolKindTypeParameter$constant>;
export let SymbolKindVariable: ReturnType<typeof SymbolKindVariable$constant>;
export let TextDocumentSyncKindIncremental: ReturnType<typeof TextDocumentSyncKindIncremental$constant>;
export let VSReferenceKindRead: ReturnType<typeof VSReferenceKindRead$constant>;
export let VSReferenceKindUnknown: ReturnType<typeof VSReferenceKindUnknown$constant>;
export let VSReferenceKindWrite: ReturnType<typeof VSReferenceKindWrite$constant>;
export let WatchKindCreate: ReturnType<typeof WatchKindCreate$constant>;
export let WatchKindDelete: ReturnType<typeof WatchKindDelete$constant>;
export { $state };
