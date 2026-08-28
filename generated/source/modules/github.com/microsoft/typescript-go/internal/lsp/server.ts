import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { Watcher as Watcher__from_fswatch } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/fswatch/package.js";
import type { CrossProjectOrchestrator as CrossProjectOrchestrator__from_ls, Project as Project__from_ls } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/package.js";
import type { BaseReader as BaseReader__from_lsproto, BaseWriter as BaseWriter__from_lsproto, CallHierarchyIncomingCall as CallHierarchyIncomingCall__from_lsproto, CallHierarchyIncomingCallsParams as CallHierarchyIncomingCallsParams__from_lsproto, CallHierarchyItem as CallHierarchyItem__from_lsproto, CallHierarchyItemsOrNull as CallHierarchyItemsOrNull__from_lsproto, CallHierarchyOutgoingCall as CallHierarchyOutgoingCall__from_lsproto, CallHierarchyOutgoingCallsParams as CallHierarchyOutgoingCallsParams__from_lsproto, CallHierarchyPrepareParams as CallHierarchyPrepareParams__from_lsproto, CancelParams as CancelParams__from_lsproto, CodeActionParams as CodeActionParams__from_lsproto, CodeLensData as CodeLensData__from_lsproto, CodeLensParams as CodeLensParams__from_lsproto, CodeLens as CodeLens__from_lsproto, CodeLensesOrNull as CodeLensesOrNull__from_lsproto, CommandOrCodeActionArrayOrNull as CommandOrCodeActionArrayOrNull__from_lsproto, CompletionItemData as CompletionItemData__from_lsproto, CompletionItem as CompletionItem__from_lsproto, CompletionItemsOrListOrNull as CompletionItemsOrListOrNull__from_lsproto, CompletionParams as CompletionParams__from_lsproto, CreateFile as CreateFile__from_lsproto, DefinitionParams as DefinitionParams__from_lsproto, DeleteFile as DeleteFile__from_lsproto, DidChangeConfigurationParams as DidChangeConfigurationParams__from_lsproto, DidChangeTextDocumentParams as DidChangeTextDocumentParams__from_lsproto, DidChangeWatchedFilesParams as DidChangeWatchedFilesParams__from_lsproto, DidCloseTextDocumentParams as DidCloseTextDocumentParams__from_lsproto, DidOpenTextDocumentParams as DidOpenTextDocumentParams__from_lsproto, DidSaveTextDocumentParams as DidSaveTextDocumentParams__from_lsproto, DocumentDiagnosticParams as DocumentDiagnosticParams__from_lsproto, DocumentFormattingParams as DocumentFormattingParams__from_lsproto, DocumentHighlightParams as DocumentHighlightParams__from_lsproto, DocumentHighlightsOrNull as DocumentHighlightsOrNull__from_lsproto, DocumentOnTypeFormattingParams as DocumentOnTypeFormattingParams__from_lsproto, DocumentRangeFormattingParams as DocumentRangeFormattingParams__from_lsproto, DocumentSymbolParams as DocumentSymbolParams__from_lsproto, FileEvent as FileEvent__from_lsproto, FileSystemWatcher as FileSystemWatcher__from_lsproto, FoldingRangeParams as FoldingRangeParams__from_lsproto, FoldingRangesOrNull as FoldingRangesOrNull__from_lsproto, HoverOrNull as HoverOrNull__from_lsproto, HoverParams as HoverParams__from_lsproto, InitializationOptionsOrNull as InitializationOptionsOrNull__from_lsproto, InitializeAPISessionParams as InitializeAPISessionParams__from_lsproto, InitializeParams as InitializeParams__from_lsproto, InitializedParams as InitializedParams__from_lsproto, InlayHintParams as InlayHintParams__from_lsproto, InlayHintsOrNull as InlayHintsOrNull__from_lsproto, LinkedEditingRangeParams as LinkedEditingRangeParams__from_lsproto, LinkedEditingRangesOrNull as LinkedEditingRangesOrNull__from_lsproto, LocationOrLocationsOrDefinitionLinksOrNull as LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto, LogVerbosity as LogVerbosity__from_lsproto, MultiDocumentHighlightParams as MultiDocumentHighlightParams__from_lsproto, MultiDocumentHighlightsOrNull as MultiDocumentHighlightsOrNull__from_lsproto, NoParams$Storage as NoParams__from_lsproto$Storage, Null$Storage as Null__from_lsproto$Storage, PerformanceStatsTelemetryEvent as PerformanceStatsTelemetryEvent__from_lsproto, PrepareRenameDefaultBehavior as PrepareRenameDefaultBehavior__from_lsproto, PrepareRenameParams as PrepareRenameParams__from_lsproto, ProfileParams as ProfileParams__from_lsproto, ProjectInfoParams as ProjectInfoParams__from_lsproto, ProjectInfoTelemetryEvent as ProjectInfoTelemetryEvent__from_lsproto, PublishDiagnosticsParams as PublishDiagnosticsParams__from_lsproto, RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport as RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto, RenameParams as RenameParams__from_lsproto, RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull$Storage as RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto$Storage, SelectionRangeParams as SelectionRangeParams__from_lsproto, SelectionRangesOrNull as SelectionRangesOrNull__from_lsproto, SemanticTokensOrNull as SemanticTokensOrNull__from_lsproto, SemanticTokensParams as SemanticTokensParams__from_lsproto, SemanticTokensRangeParams as SemanticTokensRangeParams__from_lsproto, SetLogVerbosityParams as SetLogVerbosityParams__from_lsproto, SetTraceParams as SetTraceParams__from_lsproto, SignatureHelpOrNull as SignatureHelpOrNull__from_lsproto, SignatureHelpParams as SignatureHelpParams__from_lsproto, StringOrNull as StringOrNull__from_lsproto, SymbolInformationsOrDocumentSymbolsOrNull as SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile$Storage as TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto$Storage, TextDocumentItem as TextDocumentItem__from_lsproto, TextDocumentPositionParams as TextDocumentPositionParams__from_lsproto, TextDocumentSyncKind as TextDocumentSyncKind__from_lsproto, TextEditOrAnnotatedTextEditOrSnippetTextEdit$Storage as TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto$Storage, TextEdit as TextEdit__from_lsproto, TextEditsOrNull as TextEditsOrNull__from_lsproto, TypeDefinitionParams as TypeDefinitionParams__from_lsproto, VSOnAutoInsertParams as VSOnAutoInsertParams__from_lsproto, VSOnAutoInsertResponseItemOrNull as VSOnAutoInsertResponseItemOrNull__from_lsproto, WorkspaceFolder as WorkspaceFolder__from_lsproto, WorkspaceSymbolParams as WorkspaceSymbolParams__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { Client as Client__from_project, FileHandle as FileHandle__from_project, ParseCacheKey as ParseCacheKey__from_project, ParseCacheKey$Storage as ParseCacheKey__from_project$Storage, RefCountCache as RefCountCache__from_project, WatcherID as WatcherID__from_project } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { dynamicQueue } from "./dynamic_queue.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import { AsyncConn as AsyncConn__from_api, GeneratePipePath as GeneratePipePath__from_api, NewAsyncConn as NewAsyncConn__from_api, NewPipeTransport as NewPipeTransport__from_api, NewSession as NewSession__from_api, PipeTransport as PipeTransport__from_api, Session as Session__from_api } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/api/package.js";
import { SyncSet as SyncSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CheckerLifetimeDiagnostics$constant as CheckerLifetimeDiagnostics$constant__from_core, Version as Version__from_core, WithCheckerLifetime as WithCheckerLifetime__from_core, WithRequestID as WithRequestID__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Default as Default__from_fswatch } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/fswatch/package.js";
import { MarshalIndent as MarshalIndent__from_json__package_1, Marshal as Marshal__from_json__package_1, Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { ID as ID__from_jsonrpc, JSONRPCVersion as JSONRPCVersion__from_jsonrpc, MessageKindRequest$constant as MessageKindRequest$constant__from_jsonrpc, MessageKindResponse$constant as MessageKindResponse$constant__from_jsonrpc, NewIDString as NewIDString__from_jsonrpc, Reader as Reader__from_jsonrpc, ResponseError as ResponseError__from_jsonrpc, Writer as Writer__from_jsonrpc } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/package.js";
import { Locale as Locale__from_locale, Parse as Parse__from_locale, WithLocale as WithLocale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { FileNameToDocumentURI as FileNameToDocumentURI__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { CodeLensUserPreferences as CodeLensUserPreferences__from_lsutil, FormatCodeSettings as FormatCodeSettings__from_lsutil, InlayHintsPreferences as InlayHintsPreferences__from_lsutil, JsxAttributeCompletionStyle as JsxAttributeCompletionStyle__from_lsutil, NewDefaultUserPreferences as NewDefaultUserPreferences__from_lsutil, OrganizeImportsCaseFirst as OrganizeImportsCaseFirst__from_lsutil, OrganizeImportsCollation as OrganizeImportsCollation__from_lsutil, OrganizeImportsTypeOrder as OrganizeImportsTypeOrder__from_lsutil, ParseUserPreferences as ParseUserPreferences__from_lsutil, QuotePreference as QuotePreference__from_lsutil, UserPreferences as UserPreferences__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { $state as $state__ls, ClientSupportsDocumentChanges as ClientSupportsDocumentChanges__from_ls, ClientSupportsWillRenameFiles as ClientSupportsWillRenameFiles__from_ls, LanguageService as LanguageService__from_ls, ProvideWorkspaceSymbols as ProvideWorkspaceSymbols__from_ls, SemanticTokensLegend as SemanticTokensLegend__from_ls } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/package.js";
import { $state as $state__lsproto, BooleanOrCallHierarchyOptionsOrCallHierarchyRegistrationOptions as BooleanOrCallHierarchyOptionsOrCallHierarchyRegistrationOptions__from_lsproto, BooleanOrCodeActionOptions as BooleanOrCodeActionOptions__from_lsproto, BooleanOrDefinitionOptions as BooleanOrDefinitionOptions__from_lsproto, BooleanOrDocumentFormattingOptions as BooleanOrDocumentFormattingOptions__from_lsproto, BooleanOrDocumentHighlightOptions as BooleanOrDocumentHighlightOptions__from_lsproto, BooleanOrDocumentRangeFormattingOptions as BooleanOrDocumentRangeFormattingOptions__from_lsproto, BooleanOrDocumentSymbolOptions as BooleanOrDocumentSymbolOptions__from_lsproto, BooleanOrEmptyObject as BooleanOrEmptyObject__from_lsproto, BooleanOrFoldingRangeOptionsOrFoldingRangeRegistrationOptions as BooleanOrFoldingRangeOptionsOrFoldingRangeRegistrationOptions__from_lsproto, BooleanOrHoverOptions as BooleanOrHoverOptions__from_lsproto, BooleanOrImplementationOptionsOrImplementationRegistrationOptions as BooleanOrImplementationOptionsOrImplementationRegistrationOptions__from_lsproto, BooleanOrInlayHintOptionsOrInlayHintRegistrationOptions as BooleanOrInlayHintOptionsOrInlayHintRegistrationOptions__from_lsproto, BooleanOrLinkedEditingRangeOptionsOrLinkedEditingRangeRegistrationOptions as BooleanOrLinkedEditingRangeOptionsOrLinkedEditingRangeRegistrationOptions__from_lsproto, BooleanOrReferenceOptions as BooleanOrReferenceOptions__from_lsproto, BooleanOrRenameOptions as BooleanOrRenameOptions__from_lsproto, BooleanOrSaveOptions as BooleanOrSaveOptions__from_lsproto, BooleanOrSelectionRangeOptionsOrSelectionRangeRegistrationOptions as BooleanOrSelectionRangeOptionsOrSelectionRangeRegistrationOptions__from_lsproto, BooleanOrSemanticTokensFullDelta as BooleanOrSemanticTokensFullDelta__from_lsproto, BooleanOrTypeDefinitionOptionsOrTypeDefinitionRegistrationOptions as BooleanOrTypeDefinitionOptionsOrTypeDefinitionRegistrationOptions__from_lsproto, BooleanOrWorkspaceSymbolOptions as BooleanOrWorkspaceSymbolOptions__from_lsproto, CallHierarchyIncomingCallsOrNull as CallHierarchyIncomingCallsOrNull__from_lsproto, CallHierarchyOutgoingCallsOrNull as CallHierarchyOutgoingCallsOrNull__from_lsproto, ClientCapabilities as ClientCapabilities__from_lsproto, CodeActionKindQuickFix$constant as CodeActionKindQuickFix$constant__from_lsproto, CodeActionKindSourceFixAll$constant as CodeActionKindSourceFixAll$constant__from_lsproto, CodeActionKindSourceOrganizeImports$constant as CodeActionKindSourceOrganizeImports$constant__from_lsproto, CodeActionKindSourceRemoveUnusedImports$constant as CodeActionKindSourceRemoveUnusedImports$constant__from_lsproto, CodeActionKindSourceSortImports$constant as CodeActionKindSourceSortImports$constant__from_lsproto, CodeActionOptions as CodeActionOptions__from_lsproto, CodeLensOptions as CodeLensOptions__from_lsproto, CompletionOptions as CompletionOptions__from_lsproto, ConfigurationItem as ConfigurationItem__from_lsproto, ConfigurationParams as ConfigurationParams__from_lsproto, DiagnosticOptionsOrRegistrationOptions as DiagnosticOptionsOrRegistrationOptions__from_lsproto, DiagnosticOptions as DiagnosticOptions__from_lsproto, DidChangeConfigurationRegistrationOptions as DidChangeConfigurationRegistrationOptions__from_lsproto, DidChangeWatchedFilesRegistrationOptions as DidChangeWatchedFilesRegistrationOptions__from_lsproto, DocumentOnTypeFormattingOptions as DocumentOnTypeFormattingOptions__from_lsproto, DocumentUri as DocumentUri__from_lsproto, ErrorCodeContentModified$constant as ErrorCodeContentModified$constant__from_lsproto, ErrorCodeInternalError$constant as ErrorCodeInternalError$constant__from_lsproto, ErrorCodeInvalidParams$constant as ErrorCodeInvalidParams$constant__from_lsproto, ErrorCodeInvalidRequest$constant as ErrorCodeInvalidRequest$constant__from_lsproto, ErrorCodeRequestCancelled$constant as ErrorCodeRequestCancelled$constant__from_lsproto, ErrorCodeRequestFailed$constant as ErrorCodeRequestFailed$constant__from_lsproto, ErrorCodeServerNotInitialized$constant as ErrorCodeServerNotInitialized$constant__from_lsproto, ErrorCode_String as ErrorCode_String__from_lsproto, ExperimentalServerCapabilities as ExperimentalServerCapabilities__from_lsproto, FileOperationOptions as FileOperationOptions__from_lsproto, FileOperationRegistrationOptions as FileOperationRegistrationOptions__from_lsproto, FileRename as FileRename__from_lsproto, GetClientCapabilities as GetClientCapabilities__from_lsproto, InitializationOptions as InitializationOptions__from_lsproto, InitializeAPISessionResult as InitializeAPISessionResult__from_lsproto, InitializeResult as InitializeResult__from_lsproto, IntegerOrString as IntegerOrString__from_lsproto, Message as Message__from_lsproto, MethodCancelRequest$constant as MethodCancelRequest$constant__from_lsproto, MethodInitialize$constant as MethodInitialize$constant__from_lsproto, MethodInitialized$constant as MethodInitialized$constant__from_lsproto, Method as Method__from_lsproto, NewBaseReader as NewBaseReader__from_lsproto, NewBaseWriter as NewBaseWriter__from_lsproto, NewID as NewID__from_lsproto, NoParams as NoParams__from_lsproto, NotificationInfo as NotificationInfo__from_lsproto, Null as Null__from_lsproto, OptionalVersionedTextDocumentIdentifier as OptionalVersionedTextDocumentIdentifier__from_lsproto, PositionEncodingKindUTF16$constant as PositionEncodingKindUTF16$constant__from_lsproto, PositionEncodingKindUTF8$constant as PositionEncodingKindUTF8$constant__from_lsproto, PositionEncodingKind as PositionEncodingKind__from_lsproto, Position as Position__from_lsproto, PrepareRenamePlaceholder as PrepareRenamePlaceholder__from_lsproto, ProfileResult as ProfileResult__from_lsproto, ProjectInfoResult as ProjectInfoResult__from_lsproto, RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull as RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto, Range as Range__from_lsproto, RegisterOptions as RegisterOptions__from_lsproto, RegistrationParams as RegistrationParams__from_lsproto, Registration as Registration__from_lsproto, RenameFile as RenameFile__from_lsproto, RenameFilesParams as RenameFilesParams__from_lsproto, RenameOptions as RenameOptions__from_lsproto, RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull as RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto, RequestFailureTelemetryEvent as RequestFailureTelemetryEvent__from_lsproto, RequestFailureTelemetryProperties as RequestFailureTelemetryProperties__from_lsproto, RequestInfo as RequestInfo__from_lsproto, RequestMessage as RequestMessage__from_lsproto, ResolvedClientCapabilities as ResolvedClientCapabilities__from_lsproto, ResolvedSemanticTokensClientCapabilities as ResolvedSemanticTokensClientCapabilities__from_lsproto, ResponseMessage as ResponseMessage__from_lsproto, SemanticTokensOptionsOrRegistrationOptions as SemanticTokensOptionsOrRegistrationOptions__from_lsproto, SemanticTokensOptions as SemanticTokensOptions__from_lsproto, ServerCapabilities as ServerCapabilities__from_lsproto, ServerInfo as ServerInfo__from_lsproto, SignatureHelpOptions as SignatureHelpOptions__from_lsproto, StringLiteralError as StringLiteralError__from_lsproto, StringLiteralLanguageServerErrorResponse as StringLiteralLanguageServerErrorResponse__from_lsproto, StringLiteralRename as StringLiteralRename__from_lsproto, StringOrStrings as StringOrStrings__from_lsproto, SymbolInformationsOrWorkspaceSymbolsOrNull as SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile as TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto, TextDocumentEdit as TextDocumentEdit__from_lsproto, TextDocumentSyncKindIncremental$constant as TextDocumentSyncKindIncremental$constant__from_lsproto, TextDocumentSyncOptionsOrKind as TextDocumentSyncOptionsOrKind__from_lsproto, TextDocumentSyncOptions as TextDocumentSyncOptions__from_lsproto, TextEditOrAnnotatedTextEditOrSnippetTextEdit as TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto, UnregistrationParams as UnregistrationParams__from_lsproto, Unregistration as Unregistration__from_lsproto, VSOnAutoInsertOptions as VSOnAutoInsertOptions__from_lsproto, WithClientCapabilities as WithClientCapabilities__from_lsproto, WorkspaceEditOrNull as WorkspaceEditOrNull__from_lsproto, WorkspaceEdit as WorkspaceEdit__from_lsproto, WorkspaceFoldersOrNull as WorkspaceFoldersOrNull__from_lsproto, WorkspaceOptions as WorkspaceOptions__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { New as New__from_lspwatcher, Watcher as Watcher__from_lspwatcher } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lspwatcher/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/state.js";
import { ImportModuleSpecifierEndingPreference as ImportModuleSpecifierEndingPreference__from_modulespecifiers, ImportModuleSpecifierPreference as ImportModuleSpecifierPreference__from_modulespecifiers } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import { CPUProfiler as CPUProfiler__from_pprof, RunGC as RunGC__from_pprof, SaveAllocProfile as SaveAllocProfile__from_pprof, SaveHeapProfile as SaveHeapProfile__from_pprof } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/pprof/package.js";
import { CheckerPoolOptions as CheckerPoolOptions__from_project, KindConfigured$constant as KindConfigured$constant__from_project, NewSession as NewSession__from_project, ProjectCollection as ProjectCollection__from_project, Project as Project__from_project, SessionInit as SessionInit__from_project, SessionOptions as SessionOptions__from_project, Session as Session__from_project, Snapshot as Snapshot__from_project } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/package.js";
import { PathIsAbsolute as PathIsAbsolute__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Group as Group__from_errgroup, WithContext as WithContext__from_errgroup } from "../../../../../../packages/golang.org/x/sync@v0.21.0/errgroup/package.js";
import { $goDeferred$void_to_void, $goDeferred$Named_error_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { AsType$Named_lsp$userFacingRequestFailedError, AsType$Named_lsproto$ErrorCode } from "../../../../../../support/generics/concretizations/errors/AsType.js";
import { SyncSet$Add$Named_project$WatcherID } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Add.js";
import { SyncSet$Delete$Named_project$WatcherID } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Delete.js";
import { SyncSet$Has$Named_project$WatcherID } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Has.js";
import { Map$PointerTo_Named_project$Project$PointerTo_Named_compiler$Program } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { dynamicQueue$Get$PointerTo_Named_lsproto$Message, dynamicQueue$Get$PointerTo_Named_lsproto$RequestMessage } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/dynamicQueue$Get.js";
import { dynamicQueue$Put$PointerTo_Named_lsproto$Message, dynamicQueue$Put$PointerTo_Named_lsproto$RequestMessage } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/dynamicQueue$Put.js";
import { sendClientRequest$PointerTo_Named_lsproto$ConfigurationParams$SliceOf_Interface_void, sendClientRequest$PointerTo_Named_lsproto$RegistrationParams$Named_lsproto$Null, sendClientRequest$PointerTo_Named_lsproto$UnregistrationParams$Named_lsproto$Null } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/sendClientRequest.js";
import { sendClientRequestFireAndForget$Named_lsproto$NoParams$Named_lsproto$Null } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/sendClientRequestFireAndForget.js";
import { sendNotification$Named_lsproto$RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull, sendNotification$PointerTo_Named_lsproto$PublishDiagnosticsParams } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/sendNotification.js";
import { Contains$SliceOf_Named_lsproto$PositionEncodingKind$Named_lsproto$PositionEncodingKind } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$MapOf_string_To_Interface_void, $goInterfaceAdapter$Named_lsp$userFacingRequestFailedError, $goInterfaceAdapter$Named_lsproto$ErrorCode, $goInterfaceAdapter$Named_lsproto$LogVerbosity, $goInterfaceAdapter$Named_lsproto$Method, $goInterfaceAdapter$Named_project$WatcherID, $goInterfaceAdapter$Named_time$Duration, $goInterfaceAdapter$PointerTo_Named_api$Session, $goInterfaceAdapter$PointerTo_Named_lsp$Server, $goInterfaceAdapter$PointerTo_Named_lsp$crossProjectOrchestrator, $goInterfaceAdapter$PointerTo_Named_lsp$logger, $goInterfaceAdapter$PointerTo_Named_lsp$lspReader, $goInterfaceAdapter$PointerTo_Named_lsp$lspWriter, $goInterfaceAdapter$PointerTo_Named_lsproto$CancelParams, $goInterfaceAdapter$PointerTo_Named_lsproto$InitializeParams, $goInterfaceAdapter$PointerTo_Named_lsproto$InitializeResult, $goInterfaceAdapter$PointerTo_Named_lsproto$Message, $goInterfaceAdapter$PointerTo_Named_lsproto$ResolvedClientCapabilities, $goInterfaceAdapter$PointerTo_Named_project$Project, $goInterfaceAdapter$int32, $goInterfaceAdapter$int64, $goInterfaceAdapter$uint64, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is, $goInterface$Interface_Method_Is_Named_error_to_bool$contract as GoInterface$contract, $goInterface$Interface_Method_Is_Named_error_to_bool$is as GoInterface$is } from "../../../../../../support/interface-contracts.js";
import { $goInterfaceMethod$Read$void_to_PointerTo_Named_lsproto$Message_Named_error, $goInterfaceMethod$Write$PointerTo_Named_lsproto$Message_to_Named_error } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_jsonrpc$ID_To_ChannelOf_PointerTo_Named_lsproto$ResponseMessage, $goMap$MapOf_Named_lsproto$DocumentUri_To_SliceOf_PointerTo_Named_lsproto$TextEdit, $goMap$MapOf_Named_lsproto$DocumentUri_To_bool, $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_string_To_PointerTo_Named_api$Session, $goMap$MapOf_Named_jsonrpc$ID_To_Named_lsp$pendingClientRequest as GoMap } from "../../../../../../support/maps.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { newDynamicQueue } from "./dynamic_queue.js";
import { isValidLogVerbosity, logger, newLogger } from "./logger.js";
import { newProjectLoadingProgress, projectLoadingProgress } from "./progress.js";
import { sanitizeStackTrace } from "./stack_sanitizer.js";
import * as context__from_gostdlib from "@gotots/gostdlib/context.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as provider_context from "@gotots/gostdlib/internal/facets/provider-context.js";
import * as provider_error from "@gotots/gostdlib/internal/facets/provider-error.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as v2 from "@gotots/gostdlib/math/rand/v2.js";
import * as debug__from_gostdlib from "@gotots/gostdlib/runtime/debug.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { GoChannel, goSelect } from "@gotots/runtime/channel.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash, GoMapValue } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export class ServerOptions {
    declare private readonly $goType: void;
    public constructor(public In: Reader | undefined, public Out: Writer | undefined, public Err: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined, public Cwd: gostring, public FS: FS__from_vfs | undefined, public DefaultLibraryPath: gostring, public TypingsLocation: gostring, public ParseCache: {
        value: RefCountCache__from_project<ParseCacheKey__from_project, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, FileHandle__from_project | undefined>;
    } | undefined, public NpmInstall: (($0: gostring, $1: RuntimeSlice<gostring>) => [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ]) | undefined, public ProgressDelay: time__from_gostdlib.Duration, public SetParentProcessID: (($0: int) => void) | undefined) {
    }
    declare private readonly then?: never;
}
export function NewServer(opts: ServerOptions | undefined): {
    value: Server;
} | undefined {
    if ((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Cwd === "") {
        const __gotots_argument_0 = new GoInterfaceAdapter("Cwd is required");
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    }
    let s: {
        value: Server;
    } | undefined = { value: new Server((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).In, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Out, void 0, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Err, void 0, named_sync_atomic.SyncAtomicBoolOperations.$zero(), named_sync_atomic.SyncAtomicInt32Operations.$zero(), newDynamicQueue<{
            value: RequestMessage__from_lsproto;
        } | undefined>(), newDynamicQueue<{
            value: Message__from_lsproto;
        } | undefined>(), GoMap.make(0, []), named_sync.SyncMutexOperations.$zero(), $goMap$MapOf_Named_jsonrpc$ID_To_ChannelOf_PointerTo_Named_lsproto$ResponseMessage.make(0, []), named_sync.SyncMutexOperations.$zero(), (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Cwd, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FS, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).DefaultLibraryPath, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypingsLocation, void 0, void 0, ResolvedClientCapabilities__from_lsproto.$zero(), new PositionEncodingKind__from_lsproto(""), Locale__from_locale.$zero(), false, false, named_sync_atomic.SyncAtomicUint32Operations.$zero(), SyncSet__from_collections.$zero<WatcherID__from_project>(), void 0, named_sync_atomic.SyncAtomicInt64Operations.$zero(), void 0, $goMap$MapOf_string_To_PointerTo_Named_api$Session.nil(), named_sync.SyncMutexOperations.$zero(), void 0, GoChannel.make<GoEmptyStruct>(0, (): GoEmptyStruct => {
            return GoEmptyStruct.$zero();
        }, (value: GoEmptyStruct): GoEmptyStruct => {
            return (void GoEmptyStruct.$copy,
                value);
        }), void 0, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ParseCache, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NpmInstall, CPUProfiler__from_pprof.$zero(), (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProgressDelay, void 0, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SetParentProcessID) };
    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger = newLogger(s);
    return s;
}
export class pendingClientRequest {
    declare private readonly $goType: void;
    public constructor(public req: {
        value: RequestMessage__from_lsproto;
    } | undefined, public cancel: (() => void) | undefined) {
    }
    static $zero(): pendingClientRequest {
        return new pendingClientRequest(void 0, void 0);
    }
    static $copy($source: pendingClientRequest): pendingClientRequest {
        return new pendingClientRequest($source.req, $source.cancel);
    }
    declare private readonly then?: never;
}
export interface Reader extends GoInterfaceValue {
    Read(): [
        {
            value: Message__from_lsproto;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const Reader$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Read$void_to_PointerTo_Named_lsproto$Message_Named_error]);
export function Reader$is(value: GoInterfaceValue | undefined): value is Reader {
    return value !== undefined && value.$go$implements(Reader$contract);
}
export interface Writer extends GoInterfaceValue {
    Write($argument0: {
        value: Message__from_lsproto;
    } | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined;
}
export const Writer$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Write$PointerTo_Named_lsproto$Message_to_Named_error]);
export function Writer$is(value: GoInterfaceValue | undefined): value is Writer {
    return value !== undefined && value.$go$implements(Writer$contract);
}
export class lspReader {
    declare private readonly $goType: void;
    public constructor(public r: {
        value: BaseReader__from_lsproto;
    } | undefined) {
    }
    static $copy($source: lspReader): lspReader {
        return new lspReader($source.r);
    }
    static $equal($left: lspReader, $right: lspReader): bool {
        return $left.r
            ===
                $right.r;
    }
    static $hash($source: lspReader): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.r));
        return $hash;
    }
    declare private readonly then?: never;
    static Read(r: {
        value: lspReader;
    } | undefined): [
        {
            value: Message__from_lsproto;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_19 = Reader__from_jsonrpc.Read(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Reader);
        let data = __gotots_results_19[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_19[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        const __gotots_struct_0 = Message__from_lsproto.$zero();
        let req: {
            value: Message__from_lsproto;
        } | undefined = { value: __gotots_struct_0 };
        {
            let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_Named_lsproto$Message(req), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err__shadow_1 === undefined)) {
                const __gotots_argument_35 = err__shadow_1;
                const __gotots_argument_36 = new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidParams$constant__from_lsproto());
                if (provider_error.ErrorsIsDirect(__gotots_argument_35, __gotots_argument_36, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                    return [req, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidParams$constant__from_lsproto()), err__shadow_1])))];
                }
                return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidRequest$constant__from_lsproto()), err__shadow_1])))];
            }
        }
        return [req, void 0];
    }
}
export class lspWriter {
    declare private readonly $goType: void;
    public constructor(public w: {
        value: BaseWriter__from_lsproto;
    } | undefined) {
    }
    static $copy($source: lspWriter): lspWriter {
        return new lspWriter($source.w);
    }
    static $equal($left: lspWriter, $right: lspWriter): bool {
        return $left.w
            ===
                $right.w;
    }
    static $hash($source: lspWriter): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.w));
        return $hash;
    }
    declare private readonly then?: never;
    static Write(w: {
        value: lspWriter;
    } | undefined, msg: {
        value: Message__from_lsproto;
    } | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_results_18 = Marshal__from_json__package_1(new $goInterfaceAdapter$PointerTo_Named_lsproto$Message(msg), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        let data = __gotots_results_18[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_18[1];
        if (!(err === undefined)) {
            return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to marshal message: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
        }
        return Writer__from_jsonrpc.Write(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Writer, data);
    }
}
export function ToReader(r: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): Reader | undefined {
    return new $goInterfaceAdapter$PointerTo_Named_lsp$lspReader({ value: new lspReader(NewBaseReader__from_lsproto(r)) });
}
export function ToWriter(w: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined): Writer | undefined {
    return new $goInterfaceAdapter$PointerTo_Named_lsp$lspWriter({ value: new lspWriter(NewBaseWriter__from_lsproto(w)) });
}
export class Server {
    declare private readonly $goType: void;
    public constructor(public r: Reader | undefined, public w: Writer | undefined, public backgroundCtx: GoInterface | undefined, public stderr: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined, public logger: {
        value: logger;
    } | undefined, public initStarted: atomic__from_gostdlib.Bool, public clientSeq: atomic__from_gostdlib.Int32, public requestQueue: {
        value: dynamicQueue<{
            value: RequestMessage__from_lsproto;
        } | undefined>;
    } | undefined, public outgoingQueue: {
        value: dynamicQueue<{
            value: Message__from_lsproto;
        } | undefined>;
    } | undefined, public pendingClientRequests: GoMapValue<ID__from_jsonrpc, pendingClientRequest>, public pendingClientRequestsMu: sync__from_gostdlib.Mutex, public pendingServerRequests: GoMapValue<ID__from_jsonrpc, GoChannel<tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto> | undefined> | undefined>, public pendingServerRequestsMu: sync__from_gostdlib.Mutex, public cwd: gostring, public fs: FS__from_vfs | undefined, public defaultLibraryPath: gostring, public typingsLocation: gostring, public initializeParams: tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined, public initializationOptions: {
        value: InitializationOptions__from_lsproto;
    } | undefined, public clientCapabilities: ResolvedClientCapabilities__from_lsproto, public positionEncoding: PositionEncodingKind__from_lsproto, public locale: Locale__from_locale, public watchEnabled: bool, public telemetryEnabled: bool, public watcherID: atomic__from_gostdlib.Uint32, public watchers: SyncSet__from_collections<WatcherID__from_project>, public builtinWatcher: {
        value: Watcher__from_lspwatcher;
    } | undefined, public lastRequestTimeMs: atomic__from_gostdlib.Int64, public session: {
        value: Session__from_project;
    } | undefined, public apiSessions: GoMapValue<gostring, {
        value: Session__from_api;
    } | undefined>, public apiSessionsMu: sync__from_gostdlib.Mutex, public client: Client__from_project | undefined, public initComplete: GoChannel<GoEmptyStruct> | undefined, public compilerOptionsForInferredProjects: {
        value: CompilerOptions__from_core;
    } | undefined, public parseCache: {
        value: RefCountCache__from_project<ParseCacheKey__from_project, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, FileHandle__from_project | undefined>;
    } | undefined, public npmInstall: (($0: gostring, $1: RuntimeSlice<gostring>) => [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ]) | undefined, public cpuProfiler: CPUProfiler__from_pprof, public progressDelay: time__from_gostdlib.Duration, public projectProgress: {
        value: projectLoadingProgress;
    } | undefined, public startWatchdog: (($0: int) => void) | undefined) {
    }
    static $copy($source: Server): Server {
        return new Server($source.r, $source.w, $source.backgroundCtx, $source.stderr, $source.logger, named_sync_atomic.SyncAtomicBoolOperations.$copy($source.initStarted), named_sync_atomic.SyncAtomicInt32Operations.$copy($source.clientSeq), $source.requestQueue, $source.outgoingQueue, $source.pendingClientRequests, named_sync.SyncMutexOperations.$copy($source.pendingClientRequestsMu), $source.pendingServerRequests, named_sync.SyncMutexOperations.$copy($source.pendingServerRequestsMu), $source.cwd, $source.fs, $source.defaultLibraryPath, $source.typingsLocation, $source.initializeParams, $source.initializationOptions, ResolvedClientCapabilities__from_lsproto.$copy($source.clientCapabilities), $source.positionEncoding, Locale__from_locale.$copy($source.locale), $source.watchEnabled, $source.telemetryEnabled, named_sync_atomic.SyncAtomicUint32Operations.$copy($source.watcherID), SyncSet__from_collections.$copy<WatcherID__from_project>($source.watchers), $source.builtinWatcher, named_sync_atomic.SyncAtomicInt64Operations.$copy($source.lastRequestTimeMs), $source.session, $source.apiSessions, named_sync.SyncMutexOperations.$copy($source.apiSessionsMu), $source.client, $source.initComplete, $source.compilerOptionsForInferredProjects, $source.parseCache, $source.npmInstall, CPUProfiler__from_pprof.$copy($source.cpuProfiler), $source.progressDelay, $source.projectProgress, $source.startWatchdog);
    }
    declare private readonly then?: never;
    static IsActive(s: {
        value: Server;
    } | undefined): bool {
        let last = atomic__from_gostdlib.Int64.Load((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastRequestTimeMs);
        return last === 0n || named_time.TimeDurationValueOperations.$project(time__from_gostdlib.Since(time__from_gostdlib.UnixMilli(last))) <= named_time.TimeDurationValueOperations.$project(time__from_gostdlib.Minute);
    }
    static NpmInstall(s: {
        value: Server;
    } | undefined, cwd: gostring, args: RuntimeSlice<gostring>): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_callee_29: Server["npmInstall"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.npmInstall;
        const __gotots_argument_88 = cwd;
        const __gotots_argument_89 = args;
        return (__gotots_callee_29 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_88, __gotots_argument_89);
    }
    static ProgressFinish(s: {
        value: Server;
    } | undefined, message: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<$goInterface$Interface_void | undefined>): void {
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectProgress === undefined)) {
            projectLoadingProgress.$go$private$lsp$finish((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectProgress, message, args);
        }
    }
    static ProgressStart(s: {
        value: Server;
    } | undefined, message: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<$goInterface$Interface_void | undefined>): void {
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectProgress === undefined)) {
            projectLoadingProgress.$go$private$lsp$start((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectProgress, message, args);
        }
    }
    static PublishDiagnostics(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        return sendNotification$PointerTo_Named_lsproto$PublishDiagnosticsParams(s, NotificationInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams__from_lsproto> | undefined>(NotificationInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<PublishDiagnosticsParams__from_lsproto> | undefined>($state__lsproto.TextDocumentPublishDiagnosticsInfo)), params);
    }
    static RefreshCodeLens(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        if (!(s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.clientCapabilities.Workspace.CodeLens.RefreshSupport) {
            return void 0;
        }
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = sendClientRequestFireAndForget$Named_lsproto$NoParams$Named_lsproto$Null(s, RequestInfo__from_lsproto.$copy<NoParams__from_lsproto, Null__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<NoParams__from_lsproto, Null__from_lsproto>($state__lsproto.WorkspaceCodeLensRefreshInfo)), NoParams__from_lsproto.$fromStorage({}));
            if (!(err === undefined)) {
                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to refresh code lens: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
            }
        }
        return void 0;
    }
    static RefreshDiagnostics(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        if (!(s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.clientCapabilities.Workspace.Diagnostics.RefreshSupport) {
            return void 0;
        }
        {
            const __gotots_receiver_30 = ctx;
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<GoInterface>(__gotots_receiver_30).Err();
            if (!(err === undefined)) {
                return err;
            }
        }
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = sendClientRequestFireAndForget$Named_lsproto$NoParams$Named_lsproto$Null(s, RequestInfo__from_lsproto.$copy<NoParams__from_lsproto, Null__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<NoParams__from_lsproto, Null__from_lsproto>($state__lsproto.WorkspaceDiagnosticRefreshInfo)), NoParams__from_lsproto.$fromStorage({}));
            if (!(err === undefined)) {
                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to refresh diagnostics: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
            }
        }
        return void 0;
    }
    static RefreshInlayHints(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        if (!(s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.clientCapabilities.Workspace.InlayHint.RefreshSupport) {
            return void 0;
        }
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = sendClientRequestFireAndForget$Named_lsproto$NoParams$Named_lsproto$Null(s, RequestInfo__from_lsproto.$copy<NoParams__from_lsproto, Null__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<NoParams__from_lsproto, Null__from_lsproto>($state__lsproto.WorkspaceInlayHintRefreshInfo)), NoParams__from_lsproto.$fromStorage({}));
            if (!(err === undefined)) {
                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to refresh inlay hints: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
            }
        }
        return void 0;
    }
    static RequestConfiguration(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined): [
        UserPreferences__from_lsutil,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let caps: tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto> | undefined = GetClientCapabilities__from_lsproto(ctx);
        if (!((caps ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.Workspace.Configuration) {
            {
                let opts: {
                    value: InitializationOptions__from_lsproto;
                } | undefined = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationOptions;
                if (!((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UserPreferences === undefined)) {
                    let userPrefs: $goInterface$Interface_void | undefined = (((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UserPreferences ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<$goInterface$Interface_void | undefined>).value;
                    logger.Logf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, "received formatting options from initialization: %T\n%+v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([userPrefs, userPrefs]));
                    {
                        const __gotots_results_55 = (($value: $goInterface$Interface_void | undefined): [
                            GoMapValue<gostring, $goInterface$Interface_void | undefined>,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$MapOf_string_To_Interface_void.$is($value)) {
                                return [$goMap$MapOf_string_To_Interface_void.nil(), false];
                            }
                            return [$value.$go$value, true];
                        })(userPrefs);
                        let config: GoMapValue<gostring, $goInterface$Interface_void | undefined> = __gotots_results_55[0];
                        let ok = __gotots_results_55[1];
                        if (ok) {
                            return [ParseUserPreferences__from_lsutil($goMap$MapOf_string_To_Interface_void.make(1, [["js/ts", new $goInterfaceAdapter$MapOf_string_To_Interface_void(config)]])), void 0];
                        }
                    }
                }
            }
            return [NewDefaultUserPreferences__from_lsutil(), void 0];
        }
        const __gotots_results_56 = sendClientRequest$PointerTo_Named_lsproto$ConfigurationParams$SliceOf_Interface_void(ctx, s, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<ConfigurationParams__from_lsproto> | undefined, RuntimeSlice<$goInterface$Interface_void | undefined>>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<ConfigurationParams__from_lsproto> | undefined, RuntimeSlice<$goInterface$Interface_void | undefined>>($state__lsproto.WorkspaceConfigurationInfo)), tsonicTypeScriptRuntime.location<ConfigurationParams__from_lsproto>(new ConfigurationParams__from_lsproto(RuntimeSlice.literal<{
            value: ConfigurationItem__from_lsproto;
        } | undefined>([
            { value: new ConfigurationItem__from_lsproto(void 0, tsonicTypeScriptRuntime.location<gostring>("js/ts")) }, { value: new ConfigurationItem__from_lsproto(void 0, tsonicTypeScriptRuntime.location<gostring>("typescript")) }, { value: new ConfigurationItem__from_lsproto(void 0, tsonicTypeScriptRuntime.location<gostring>("javascript")) }, { value: new ConfigurationItem__from_lsproto(void 0, tsonicTypeScriptRuntime.location<gostring>("editor")) },
        ]))));
        let configs = __gotots_results_56[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_56[1];
        if (!(err === undefined)) {
            return [new UserPreferences__from_lsutil(FormatCodeSettings__from_lsutil.$zero(), new QuotePreference__from_lsutil(""), 0, 0, 0, 0, 0, 0, 0, new JsxAttributeCompletionStyle__from_lsutil(""), new ImportModuleSpecifierPreference__from_modulespecifiers(""), new ImportModuleSpecifierEndingPreference__from_modulespecifiers(""), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), 0, 0, 0, new OrganizeImportsCollation__from_lsutil(false), "", 0, 0, new OrganizeImportsCaseFirst__from_lsutil(0), new OrganizeImportsTypeOrder__from_lsutil(0), 0, 0, 0, 0, InlayHintsPreferences__from_lsutil.$zero(), CodeLensUserPreferences__from_lsutil.$zero(), false, 0, 0, 0, 0, 0, 0, 0, ""), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("configure request failed: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])))];
        }
        let configMap: GoMapValue<gostring, $goInterface$Interface_void | undefined> = $goMap$MapOf_string_To_Interface_void.make(0, []);
        const __gotots_range_0 = configs;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
            let i = __gotots_range_value_0;
            let config: $goInterface$Interface_void | undefined = __gotots_range_value_1;
            switch (i) {
                case 0: {
                    configMap.store("js/ts", config);
                    break;
                }
                case 1: {
                    configMap.store("typescript", config);
                    break;
                }
                case 2: {
                    configMap.store("javascript", config);
                    break;
                }
                case 3: {
                    configMap.store("editor", config);
                    break;
                }
            }
        }
        logger.Logf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, "received options from workspace/configuration request:\njs/ts: %+v\n\ntypescript: %+v\n\njavascript: %+v\n\neditor: %+v\n", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([configMap.lookup("js/ts"), configMap.lookup("typescript"), configMap.lookup("javascript"), configMap.lookup("editor")]));
        return [ParseUserPreferences__from_lsutil(configMap), void 0];
    }
    static Run(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_results_0 = WithContext__from_errgroup(ctx);
        let g: Group__from_errgroup | undefined = __gotots_results_0[0];
        ctx = __gotots_results_0[1];
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx = ctx;
        Group__from_errgroup.Go(g, (): $goInterface$Interface_Method_Error_void_to_string | undefined => {
            return Server.$go$private$lsp$dispatchLoop(s, ctx);
        });
        Group__from_errgroup.Go(g, (): $goInterface$Interface_Method_Error_void_to_string | undefined => {
            return Server.$go$private$lsp$writeLoop(s, ctx);
        });
        let readLoopErr: GoChannel<$goInterface$Interface_Method_Error_void_to_string | undefined> | undefined = GoChannel.make<$goInterface$Interface_Method_Error_void_to_string | undefined>(1, (): $goInterface$Interface_Method_Error_void_to_string | undefined => {
            return void 0;
        }, (value: $goInterface$Interface_Method_Error_void_to_string | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
            return value;
        });
        Group__from_errgroup.Go(g, (): $goInterface$Interface_Method_Error_void_to_string | undefined => {
            const __gotots_receiver_0 = ctx;
            const __gotots_channel_0 = goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Done();
            const __gotots_channel_1 = (value: GoEmptyStruct, ok: boolean): void => {
                __gotots_receive_0 = [value, ok];
            };
            let __gotots_receive_0: [
                GoEmptyStruct,
                boolean
            ] | undefined = undefined;
            const __gotots_select_0 = GoChannel.$selectReceive(__gotots_channel_0, __gotots_channel_1);
            let __gotots_receive_1: [
                $goInterface$Interface_Method_Error_void_to_string | undefined,
                boolean
            ] | undefined = undefined;
            const __gotots_select_1 = GoChannel.$selectReceive(readLoopErr, (value: $goInterface$Interface_Method_Error_void_to_string | undefined, ok: boolean): void => {
                __gotots_receive_1 = [value, ok];
            });
            const __gotots_switch_selection_0 = goSelect([__gotots_select_0, __gotots_select_1]);
            switch (__gotots_switch_selection_0) {
                case 0: {
                    const __gotots_receiver_1 = ctx;
                    return goInterfaceNonNil<GoInterface>(__gotots_receiver_1).Err();
                    break;
                }
                case 1: {
                    if (__gotots_receive_1 === undefined) {
                        GoPanic.raiseRuntime("selected receive has no result");
                    }
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_receive_1[0];
                    return err;
                    break;
                }
                default: GoPanic.raiseRuntime("select returned an invalid case");
            }
        });
        ((): void => {
            GoChannel.send(readLoopErr, Server.$go$private$lsp$readLoop(s, ctx));
        })();
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Group__from_errgroup.Wait(g);
            let __gotots_logical_result_0 = !(err === undefined);
            if (__gotots_logical_result_0) {
                const __gotots_argument_1 = err;
                const __gotots_argument_2 = GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF);
                __gotots_logical_result_0 = !provider_error.ErrorsIsDirect(__gotots_argument_1, __gotots_argument_2, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is);
            }
            let __gotots_logical_result_1 = __gotots_logical_result_0;
            if (__gotots_logical_result_1) {
                const __gotots_receiver_2 = ctx;
                __gotots_logical_result_1 = !(goInterfaceNonNil<GoInterface>(__gotots_receiver_2).Err() === undefined);
            }
            if (__gotots_logical_result_1) {
                return err;
            }
        }
        return void 0;
    }
    static SendTelemetry(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, telemetry: RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto): $goInterface$Interface_Method_Error_void_to_string | undefined {
        if (!(s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.telemetryEnabled) {
            const __gotots_argument_90 = new GoInterfaceAdapter("SendTelemetry called with telemetry disabled");
            GoPanic.raise(__gotots_argument_90 === undefined ? GoPanicNilValue.create() : __gotots_argument_90);
        }
        return sendNotification$Named_lsproto$RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull(s, NotificationInfo__from_lsproto.$copy<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto>(NotificationInfo__from_lsproto.$fromStorage<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto>($state__lsproto.TelemetryEventInfo)), RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto.$copy(telemetry));
    }
    static UnwatchFiles(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, id: WatcherID__from_project): $goInterface$Interface_Method_Error_void_to_string | undefined {
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builtinWatcher === undefined)) {
            const __gotots_store_6 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            if (!SyncSet$Has$Named_project$WatcherID(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "watchers"), id)) {
                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("no file watcher exists with ID %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_project$WatcherID(id)])));
            }
            {
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Watcher__from_lspwatcher.UnwatchFiles((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builtinWatcher, id.$value);
                if (!(err === undefined)) {
                    return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to unregister file watcher: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
                }
            }
            const __gotots_store_7 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            SyncSet$Delete$Named_project$WatcherID(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "watchers"), id);
            return void 0;
        }
        const __gotots_store_8 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        if (SyncSet$Has$Named_project$WatcherID(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "watchers"), id)) {
            const __gotots_results_58 = sendClientRequest$PointerTo_Named_lsproto$UnregistrationParams$Named_lsproto$Null(ctx, s, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<UnregistrationParams__from_lsproto> | undefined, Null__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<UnregistrationParams__from_lsproto> | undefined, Null__from_lsproto>($state__lsproto.ClientUnregisterCapabilityInfo)), tsonicTypeScriptRuntime.location<UnregistrationParams__from_lsproto>(new UnregistrationParams__from_lsproto(RuntimeSlice.literal<{
                value: Unregistration__from_lsproto;
            } | undefined>([
                { value: new Unregistration__from_lsproto(id.$value, "workspace/didChangeWatchedFiles") },
            ]))));
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_58[1];
            if (!(err === undefined)) {
                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to unregister file watcher: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
            }
            const __gotots_store_9 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            SyncSet$Delete$Named_project$WatcherID(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "watchers"), id);
            return void 0;
        }
        return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("no file watcher exists with ID %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_project$WatcherID(id)])));
    }
    static WatchFiles(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, id: WatcherID__from_project, watchers: RuntimeSlice<{
        value: FileSystemWatcher__from_lsproto;
    } | undefined>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builtinWatcher === undefined)) {
            {
                let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Watcher__from_lspwatcher.WatchFiles((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builtinWatcher, id.$value, watchers);
                if (!(err__shadow_1 === undefined)) {
                    return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to register file watcher: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err__shadow_1])));
                }
            }
            const __gotots_store_10 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            SyncSet$Add$Named_project$WatcherID(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "watchers"), id);
            return void 0;
        }
        const __gotots_results_59 = sendClientRequest$PointerTo_Named_lsproto$RegistrationParams$Named_lsproto$Null(ctx, s, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<RegistrationParams__from_lsproto> | undefined, Null__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<RegistrationParams__from_lsproto> | undefined, Null__from_lsproto>($state__lsproto.ClientRegisterCapabilityInfo)), tsonicTypeScriptRuntime.location<RegistrationParams__from_lsproto>(new RegistrationParams__from_lsproto(RuntimeSlice.literal<{
            value: Registration__from_lsproto;
        } | undefined>([
            { value: new Registration__from_lsproto(id.$value, { value: new RegisterOptions__from_lsproto(void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, tsonicTypeScriptRuntime.location<DidChangeWatchedFilesRegistrationOptions__from_lsproto>(new DidChangeWatchedFilesRegistrationOptions__from_lsproto(watchers))) }) },
        ]))));
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_59[1];
        if (!(err === undefined)) {
            return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to register file watcher: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
        }
        const __gotots_store_11 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        SyncSet$Add$Named_project$WatcherID(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "watchers"), id);
        return void 0;
    }
    static $go$private$lsp$cancelRequest(s: {
        value: Server;
    } | undefined, rawID: IntegerOrString__from_lsproto): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    let id: {
                        value: ID__from_jsonrpc;
                    } | undefined = NewID__from_lsproto(IntegerOrString__from_lsproto.$copy(rawID));
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingClientRequestsMu);
                    const __gotots_receiver_9: Server["pendingClientRequestsMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingClientRequestsMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_9, $go$recovery);
                    };
                    {
                        const __gotots_results_17 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingClientRequests.lookupOk(ID__from_jsonrpc.$copy((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value));
                        let pendingReq = __gotots_results_17[0];
                        let ok = __gotots_results_17[1];
                        if (ok) {
                            const __gotots_callee_15 = pendingReq.cancel;
                            (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))();
                            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingClientRequests.delete(ID__from_jsonrpc.$copy((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value));
                        }
                    }
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
    }
    static $go$private$lsp$dispatchLoop(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_argument_3 = ctx;
                    const __gotots_results_1 = provider_context.ContextWithCancelCauseDirect(GoProviderProfileBridge.$to(__gotots_argument_3));
                    const __gotots_callee_0 = __gotots_results_1[1];
                    const __gotots_results_2 = [GoProviderProfileBridge.$from(__gotots_results_1[0]), __gotots_callee_0 === undefined ? undefined : ($argument0: $goInterface$Interface_Method_Error_void_to_string | undefined): void => {
                            __gotots_callee_0($goProviderProfileBridge$Named_error$Using$Error$Direct.$to($argument0));
                        }] satisfies [
                        GoInterface | undefined,
                        (($0: $goInterface$Interface_Method_Error_void_to_string | undefined) => void) | undefined
                    ];
                    ctx = __gotots_results_2[0];
                    let lspExit: (($0: $goInterface$Interface_Method_Error_void_to_string | undefined) => void) | undefined = __gotots_results_2[1];
                    const __gotots_callee_1: (($0: $goInterface$Interface_Method_Error_void_to_string | undefined) => void) | undefined = lspExit;
                    const __gotots_argument_4 = void 0;
                    const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_1);
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_1 === undefined ? (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4) : __gotots_deferred_1($go$recovery, __gotots_argument_4);
                    };
                    for (;;) {
                        const __gotots_results_3 = dynamicQueue$Get$PointerTo_Named_lsproto$RequestMessage((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestQueue, ctx);
                        let req: {
                            value: RequestMessage__from_lsproto;
                        } | undefined = __gotots_results_3[0];
                        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_3[1];
                        if (!(err === undefined)) {
                            __gotots_return_0 = err;
                            break __gotots_return_block_0;
                        }
                        atomic__from_gostdlib.Int64.Store((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastRequestTimeMs, time__from_gostdlib.Now().UnixMilli());
                        let requestCtx: GoInterface | undefined = WithLocale__from_locale(ctx, Locale__from_locale.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.locale));
                        let cancel: (() => void) | undefined = void 0;
                        if (!((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID === undefined)) {
                            const __gotots_argument_5 = WithRequestID__from_core(requestCtx, ID__from_jsonrpc.String((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID));
                            const __gotots_results_4 = provider_context.ContextWithCancelDirect(GoProviderProfileBridge.$to(__gotots_argument_5));
                            const __gotots_results_5 = [GoProviderProfileBridge.$from(__gotots_results_4[0]), __gotots_results_4[1]] satisfies [
                                GoInterface | undefined,
                                (() => void) | undefined
                            ];
                            requestCtx = __gotots_results_5[0];
                            cancel = __gotots_results_5[1];
                            sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingClientRequestsMu);
                            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingClientRequests.store(ID__from_jsonrpc.$copy(((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value), new pendingClientRequest(req, cancel));
                            sync__from_gostdlib.Mutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingClientRequestsMu);
                        }
                        let handleError: (($0: $goInterface$Interface_Method_Error_void_to_string | undefined) => void) | undefined = (err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined): void => {
                            const __gotots_argument_6 = err__shadow_1;
                            const __gotots_argument_7 = GoProviderInterfaceBridge.$from(context__from_gostdlib.state.Canceled);
                            if (provider_error.ErrorsIsDirect(__gotots_argument_6, __gotots_argument_7, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                                {
                                    let err__shadow_2: $goInterface$Interface_Method_Error_void_to_string | undefined = Server.$go$private$lsp$sendError(s, (req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID, new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeRequestCancelled$constant__from_lsproto()));
                                    if (!(err__shadow_2 === undefined)) {
                                        const __gotots_callee_3 = lspExit;
                                        const __gotots_argument_8 = err__shadow_2;
                                        (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8);
                                    }
                                }
                            }
                            else {
                                const __gotots_argument_9 = err__shadow_1;
                                const __gotots_argument_10 = GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF);
                                if (provider_error.ErrorsIsDirect(__gotots_argument_9, __gotots_argument_10, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                                    const __gotots_callee_4 = lspExit;
                                    const __gotots_argument_11 = void 0;
                                    (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_11);
                                }
                                else {
                                    {
                                        let err__shadow_2: $goInterface$Interface_Method_Error_void_to_string | undefined = Server.$go$private$lsp$sendError(s, (req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID, err__shadow_1);
                                        if (!(err__shadow_2 === undefined)) {
                                            const __gotots_callee_5 = lspExit;
                                            const __gotots_argument_12 = err__shadow_2;
                                            (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12);
                                        }
                                    }
                                }
                            }
                        };
                        let removeRequest: (() => void) | undefined = (): void => {
                            const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
                            let __gotots_panic_1: GoPanic | undefined = undefined;
                            try {
                                try {
                                    __gotots_return_block_1: {
                                        if (!((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID === undefined)) {
                                            const __gotots_callee_6: (() => void) | undefined = cancel;
                                            const __gotots_deferred_3 = $goDeferred$void_to_void.resolve(__gotots_callee_6);
                                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                                __gotots_deferred_3 === undefined ? (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_3($go$recovery);
                                            });
                                            sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingClientRequestsMu);
                                            const __gotots_receiver_3: Server["pendingClientRequestsMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingClientRequestsMu;
                                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                                recovery_sync.SyncMutexUnlock(__gotots_receiver_3, $go$recovery);
                                            });
                                            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingClientRequests.delete(ID__from_jsonrpc.$copy(((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value));
                                        }
                                    }
                                }
                                catch (__gotots_caught_2) {
                                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                                        throw __gotots_caught_2;
                                    }
                                    __gotots_panic_1 = __gotots_caught_2;
                                }
                            }
                            finally {
                                while (__gotots_defers_0.length !== 0) {
                                    const __gotots_deferred_2 = goDeferPop(__gotots_defers_0);
                                    const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                                    try {
                                        __gotots_deferred_2(__gotots_recovery_1);
                                        if (__gotots_recovery_1.recovered()) {
                                            __gotots_panic_1 = undefined;
                                        }
                                    }
                                    catch (__gotots_caught_3) {
                                        if (!(__gotots_caught_3 instanceof GoPanic)) {
                                            throw __gotots_caught_3;
                                        }
                                        __gotots_panic_1 = __gotots_caught_3;
                                    }
                                }
                            }
                            if (__gotots_panic_1 !== undefined) {
                                throw __gotots_panic_1;
                            }
                        };
                        {
                            const __gotots_results_6 = Server.$go$private$lsp$handleRequestOrNotification(s, requestCtx, req);
                            let doAsyncWork: (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined = __gotots_results_6[0];
                            let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_6[1];
                            if (!(err__shadow_1 === undefined)) {
                                const __gotots_callee_7 = handleError;
                                const __gotots_argument_13 = err__shadow_1;
                                (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13);
                                const __gotots_callee_8 = removeRequest;
                                (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))();
                            }
                            else if (!(doAsyncWork === undefined)) {
                                ((): void => {
                                    {
                                        const __gotots_callee_9 = doAsyncWork;
                                        let lsError: $goInterface$Interface_Method_Error_void_to_string | undefined = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))();
                                        if (!(lsError === undefined)) {
                                            const __gotots_callee_10 = handleError;
                                            const __gotots_argument_14 = lsError;
                                            (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14);
                                        }
                                    }
                                    const __gotots_callee_11 = removeRequest;
                                    (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))();
                                })();
                            }
                            else {
                                const __gotots_callee_12 = removeRequest;
                                (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))();
                            }
                        }
                    }
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$lsp$generateAPIPipePath(s: {
        value: Server;
    } | undefined): gostring {
        let now = time__from_gostdlib.Now().UnixNano();
        let rnd = v2.Uint64();
        return GeneratePipePath__from_api(fmt__from_gostdlib.Sprintf("tsgo-api-%x-%x", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int64(now), new $goInterfaceAdapter$uint64(rnd)])));
    }
    static $go$private$lsp$getLanguageServiceAndCrossProjectOrchestrator(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, uri: DocumentUri__from_lsproto, req: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        LanguageService__from_ls | undefined,
        CrossProjectOrchestrator__from_ls | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_52 = Session__from_project.GetLanguageServiceAndProjectsForFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, uri);
        let defaultProject: {
            value: Project__from_project;
        } | undefined = __gotots_results_52[0];
        let defaultLs: LanguageService__from_ls | undefined = __gotots_results_52[1];
        let allProjects = __gotots_results_52[2];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_52[3];
        let orchestrator: CrossProjectOrchestrator__from_ls | undefined = void 0;
        if (err === undefined) {
            orchestrator = new $goInterfaceAdapter$PointerTo_Named_lsp$crossProjectOrchestrator(new crossProjectOrchestrator(s, req, defaultProject, allProjects));
        }
        return [defaultLs, orchestrator, err];
    }
    static $go$private$lsp$handleCallHierarchyIncomingCalls(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto> | undefined, reqMsg: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        CallHierarchyIncomingCallsOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_37 = Server.$go$private$lsp$getLanguageServiceAndCrossProjectOrchestrator(s, ctx, (((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto>).value.Item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Uri, reqMsg);
        let defaultLs: LanguageService__from_ls | undefined = __gotots_results_37[0];
        let orchestrator: CrossProjectOrchestrator__from_ls | undefined = __gotots_results_37[1];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_37[2];
        if (!(err === undefined)) {
            return [CallHierarchyIncomingCallsOrNull__from_lsproto.$fromStorage({
                    CallHierarchyIncomingCalls: void 0
                }), err];
        }
        return LanguageService__from_ls.ProvideCallHierarchyIncomingCalls(defaultLs, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallHierarchyIncomingCallsParams__from_lsproto>).value.Item, orchestrator);
    }
    static $go$private$lsp$handleCallHierarchyOutgoingCalls(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto> | undefined, $2: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        CallHierarchyOutgoingCallsOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_38 = Session__from_project.GetLanguageService((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, (((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto>).value.Item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Uri);
        let languageService: LanguageService__from_ls | undefined = __gotots_results_38[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_38[1];
        if (!(err === undefined)) {
            return [CallHierarchyOutgoingCallsOrNull__from_lsproto.$fromStorage({
                    CallHierarchyOutgoingCalls: void 0
                }), err];
        }
        return LanguageService__from_ls.ProvideCallHierarchyOutgoingCalls(languageService, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallHierarchyOutgoingCallsParams__from_lsproto>).value.Item);
    }
    static $go$private$lsp$handleCodeAction(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<CodeActionParams__from_lsproto> | undefined): [
        CommandOrCodeActionArrayOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideCodeActions(ls__shadow_1, ctx, params);
    }
    static $go$private$lsp$handleCodeLens(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto> | undefined): [
        CodeLensesOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideCodeLenses(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CodeLensParams__from_lsproto>).value.TextDocument.Uri);
    }
    static $go$private$lsp$handleCodeLensResolve(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, codeLens: tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined, reqMsg: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_4: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        let __gotots_return_1: [
            tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_2: {
                    const __gotots_results_41 = Server.$go$private$lsp$getLanguageServiceAndCrossProjectOrchestrator(s, ctx, (((codeLens ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CodeLens__from_lsproto>).value.Data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Uri, reqMsg);
                    let defaultLs: LanguageService__from_ls | undefined = __gotots_results_41[0];
                    let orchestrator: CrossProjectOrchestrator__from_ls | undefined = __gotots_results_41[1];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_41[2];
                    const __gotots_receiver_22 = ctx;
                    if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_22).Err() === undefined)) {
                        const __gotots_results_42 = void 0;
                        const __gotots_receiver_23 = ctx;
                        const __gotots_results_43 = goInterfaceNonNil<GoInterface>(__gotots_receiver_23).Err();
                        __gotots_return_1 = [__gotots_results_42, __gotots_results_43];
                        break __gotots_return_block_2;
                    }
                    if (!(err === undefined)) {
                        __gotots_return_1 = [codeLens, new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeContentModified$constant__from_lsproto())];
                        break __gotots_return_block_2;
                    }
                    const __gotots_receiver_24 = s;
                    const __gotots_argument_68 = reqMsg;
                    __gotots_deferred_4 = ($go$recovery: GoRecovery): void => {
                        Server_recover$deferred($go$recovery, __gotots_receiver_24, __gotots_argument_68);
                    };
                    __gotots_return_1 = LanguageService__from_ls.ResolveCodeLens(defaultLs, ctx, codeLens, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CodeLensShowLocationsCommandName, orchestrator);
                    break __gotots_return_block_2;
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_4 !== undefined) {
                const __gotots_recovery_2 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_4(__gotots_recovery_2);
                    if (__gotots_recovery_2.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
        return __gotots_return_1;
    }
    static $go$private$lsp$handleCompletion(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, languageService: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto> | undefined): [
        CompletionItemsOrListOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideCompletion(languageService, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto>).value.TextDocument.Uri, Position__from_lsproto.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto>).value.Position), ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionParams__from_lsproto>).value.Context);
    }
    static $go$private$lsp$handleCompletionItemResolve(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined, reqMsg: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_4: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        let __gotots_return_1: [
            tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_2: {
                    let data: {
                        value: CompletionItemData__from_lsproto;
                    } | undefined = ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.Data;
                    const __gotots_results_40 = Session__from_project.GetLanguageService((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, FileNameToDocumentURI__from_lsconv((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName));
                    let languageService: LanguageService__from_ls | undefined = __gotots_results_40[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_40[1];
                    if (!(err === undefined)) {
                        __gotots_return_1 = [void 0, err];
                        break __gotots_return_block_2;
                    }
                    const __gotots_receiver_22 = s;
                    const __gotots_argument_68 = reqMsg;
                    __gotots_deferred_4 = ($go$recovery: GoRecovery): void => {
                        Server_recover$deferred($go$recovery, __gotots_receiver_22, __gotots_argument_68);
                    };
                    __gotots_return_1 = LanguageService__from_ls.ResolveCompletionItem(languageService, ctx, params, data);
                    break __gotots_return_block_2;
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_4 !== undefined) {
                const __gotots_recovery_2 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_4(__gotots_recovery_2);
                    if (__gotots_recovery_2.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
        return __gotots_return_1;
    }
    static $go$private$lsp$handleDefinition(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto> | undefined): [
        LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideDefinition(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto>).value.TextDocument.Uri, Position__from_lsproto.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DefinitionParams__from_lsproto>).value.Position));
    }
    static $go$private$lsp$handleDidChange(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        Session__from_project.DidChangeFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto>).value.TextDocument.Uri, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto>).value.TextDocument.Version, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DidChangeTextDocumentParams__from_lsproto>).value.ContentChanges);
        return void 0;
    }
    static $go$private$lsp$handleDidChangeWatchedFiles(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        Session__from_project.DidChangeWatchedFiles((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DidChangeWatchedFilesParams__from_lsproto>).value.Changes);
        return void 0;
    }
    static $go$private$lsp$handleDidChangeWorkspaceConfiguration(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        if (((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto>).value.Settings === undefined) {
            return void 0;
        }
        else {
            const __gotots_results_34 = (($value: $goInterface$Interface_void | undefined): [
                GoMapValue<gostring, $goInterface$Interface_void | undefined>,
                boolean
            ] => {
                if (!$goInterfaceAdapter$MapOf_string_To_Interface_void.$is($value)) {
                    return [$goMap$MapOf_string_To_Interface_void.nil(), false];
                }
                return [$value.$go$value, true];
            })(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DidChangeConfigurationParams__from_lsproto>).value.Settings);
            let settings: GoMapValue<gostring, $goInterface$Interface_void | undefined> = __gotots_results_34[0];
            let ok = __gotots_results_34[1];
            if (ok) {
                Session__from_project.Configure((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ParseUserPreferences__from_lsutil(settings));
            }
        }
        return void 0;
    }
    static $go$private$lsp$handleDidClose(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        Session__from_project.DidCloseFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DidCloseTextDocumentParams__from_lsproto>).value.TextDocument.Uri);
        return void 0;
    }
    static $go$private$lsp$handleDidOpen(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        Session__from_project.DidOpenFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, ((((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto>).value.TextDocument ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextDocumentItem__from_lsproto>).value.Uri, ((((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto>).value.TextDocument ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextDocumentItem__from_lsproto>).value.Version, ((((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto>).value.TextDocument ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextDocumentItem__from_lsproto>).value.Text, ((((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DidOpenTextDocumentParams__from_lsproto>).value.TextDocument ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextDocumentItem__from_lsproto>).value.LanguageId);
        return void 0;
    }
    static $go$private$lsp$handleDidSave(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        Session__from_project.DidSaveFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DidSaveTextDocumentParams__from_lsproto>).value.TextDocument.Uri);
        return void 0;
    }
    static $go$private$lsp$handleDocumentDiagnostic(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto> | undefined): [
        RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        ctx = WithCheckerLifetime__from_core(ctx, CheckerLifetimeDiagnostics$constant__from_core());
        return LanguageService__from_ls.ProvideDiagnostics(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentDiagnosticParams__from_lsproto>).value.TextDocument.Uri);
    }
    static $go$private$lsp$handleDocumentFormat(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto> | undefined): [
        TextEditsOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideFormatDocument(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto>).value.TextDocument.Uri, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentFormattingParams__from_lsproto>).value.Options);
    }
    static $go$private$lsp$handleDocumentHighlight(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto> | undefined): [
        DocumentHighlightsOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideDocumentHighlights(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto>).value.TextDocument.Uri, Position__from_lsproto.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentHighlightParams__from_lsproto>).value.Position));
    }
    static $go$private$lsp$handleDocumentOnTypeFormat(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto> | undefined): [
        TextEditsOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideFormatDocumentOnType(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto>).value.TextDocument.Uri, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto>).value.Options, Position__from_lsproto.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto>).value.Position), ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentOnTypeFormattingParams__from_lsproto>).value.Ch);
    }
    static $go$private$lsp$handleDocumentRangeFormat(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto> | undefined): [
        TextEditsOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideFormatDocumentRange(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto>).value.TextDocument.Uri, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto>).value.Options, Range__from_lsproto.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentRangeFormattingParams__from_lsproto>).value.Range));
    }
    static $go$private$lsp$handleDocumentSymbol(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto> | undefined): [
        SymbolInformationsOrDocumentSymbolsOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideDocumentSymbols(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentSymbolParams__from_lsproto>).value.TextDocument.Uri);
    }
    static $go$private$lsp$handleExit(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, $1: NoParams__from_lsproto): $goInterface$Interface_Method_Error_void_to_string | undefined {
        return GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF);
    }
    static $go$private$lsp$handleFoldingRange(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto> | undefined): [
        FoldingRangesOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideFoldingRange(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FoldingRangeParams__from_lsproto>).value.TextDocument.Uri);
    }
    static $go$private$lsp$handleHover(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<HoverParams__from_lsproto> | undefined): [
        HoverOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideHover(ls__shadow_1, ctx, params);
    }
    static $go$private$lsp$handleInitialize(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined, $2: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        {
            value: InitializeResult__from_lsproto;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams === undefined)) {
            return [void 0, new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidRequest$constant__from_lsproto())];
        }
        atomic__from_gostdlib.Bool.Store((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initStarted, true);
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams = params;
        if (!(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.InitializationOptions === undefined) && !(((((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.InitializationOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializationOptionsOrNull__from_lsproto>).value.InitializationOptions === undefined)) {
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationOptions = ((((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.InitializationOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializationOptionsOrNull__from_lsproto>).value.InitializationOptions;
        }
        else {
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationOptions =
                { value: new InitializationOptions__from_lsproto(void 0, void 0, void 0, void 0, void 0) };
        }
        if (!(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LogVerbosity === undefined)) {
            {
                let v = ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LogVerbosity ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LogVerbosity__from_lsproto>).value;
                if (isValidLogVerbosity(v)) {
                    logger.SetVerbosity((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, v);
                }
            }
        }
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.clientCapabilities = ClientCapabilities__from_lsproto.Resolve(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.Capabilities);
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.clientCapabilities.Window.WorkDoneProgress) {
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.projectProgress = newProjectLoadingProgress(s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.progressDelay);
        }
        const __gotots_store_1 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_29 = new $goInterfaceAdapter$PointerTo_Named_lsproto$ResolvedClientCapabilities(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "clientCapabilities"));
        const __gotots_argument_30 = "";
        const __gotots_argument_31 = "\t";
        const __gotots_results_15 = MarshalIndent__from_json__package_1(__gotots_argument_29, __gotots_argument_30, __gotots_argument_31);
        let capabilitiesJSON = __gotots_results_15[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_15[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        const __gotots_receiver_8: Server["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
        const __gotots_binary_operand_0 = "Resolved client capabilities: ";
        const __gotots_conversion_0 = capabilitiesJSON;
        let __gotots_conversion_1 = "";
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
        }
        const __gotots_binary_operand_1 = __gotots_conversion_1;
        const __gotots_argument_32 = new GoInterfaceAdapter(__gotots_binary_operand_0 + __gotots_binary_operand_1);
        const __gotots_argument_33 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_32]);
        logger.Info(__gotots_receiver_8, __gotots_argument_33);
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.positionEncoding = PositionEncodingKindUTF16$constant__from_lsproto();
        if (Contains$SliceOf_Named_lsproto$PositionEncodingKind$Named_lsproto$PositionEncodingKind((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.clientCapabilities.General.PositionEncodings, PositionEncodingKindUTF8$constant__from_lsproto())) {
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.positionEncoding = PositionEncodingKindUTF8$constant__from_lsproto();
        }
        if (!((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.Locale === undefined)) {
            const __gotots_store_2 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_results_16 = Parse__from_locale((((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.Locale ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value);
            __gotots_store_2.locale = __gotots_results_16[0];
        }
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.startWatchdog === undefined) && !(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.ProcessId.Integer === undefined)) {
            const __gotots_callee_14: Server["startWatchdog"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.startWatchdog;
            const __gotots_argument_34 = ((((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.ProcessId.Integer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int32>).value;
            (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_34);
        }
        let response: {
            value: InitializeResult__from_lsproto;
        } | undefined = { value: new InitializeResult__from_lsproto({ value: new ServerCapabilities__from_lsproto(tsonicTypeScriptRuntime.location<PositionEncodingKind__from_lsproto>((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.positionEncoding), { value: new TextDocumentSyncOptionsOrKind__from_lsproto({ value: new TextDocumentSyncOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), tsonicTypeScriptRuntime.location<TextDocumentSyncKind__from_lsproto>(TextDocumentSyncKindIncremental$constant__from_lsproto()), void 0, void 0, { value: new BooleanOrSaveOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0) }) }, void 0) }, { value: new CompletionOptions__from_lsproto(void 0, tsonicTypeScriptRuntime.propertyLocation($state__ls, "TriggerCharacters"), void 0, tsonicTypeScriptRuntime.location<bool>(true), void 0) }, { value: new BooleanOrHoverOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0) }, { value: new SignatureHelpOptions__from_lsproto(void 0, tsonicTypeScriptRuntime.location<RuntimeSlice<gostring>>(RuntimeSlice.literal<gostring>(["(", ",", "<"])), tsonicTypeScriptRuntime.location<RuntimeSlice<gostring>>(RuntimeSlice.literal<gostring>([")"]))) }, void 0, { value: new BooleanOrDefinitionOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0) }, { value: new BooleanOrTypeDefinitionOptionsOrTypeDefinitionRegistrationOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0, void 0) }, { value: new BooleanOrImplementationOptionsOrImplementationRegistrationOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0, void 0) }, { value: new BooleanOrReferenceOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0) }, { value: new BooleanOrDocumentHighlightOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0) }, { value: new BooleanOrDocumentSymbolOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0) }, { value: new BooleanOrCodeActionOptions__from_lsproto(void 0, { value: new CodeActionOptions__from_lsproto(void 0, tsonicTypeScriptRuntime.location<RuntimeSlice<gostring>>(RuntimeSlice.literal<gostring>([CodeActionKindQuickFix$constant__from_lsproto().$value, CodeActionKindSourceOrganizeImports$constant__from_lsproto().$value, CodeActionKindSourceRemoveUnusedImports$constant__from_lsproto().$value, CodeActionKindSourceSortImports$constant__from_lsproto().$value, CodeActionKindSourceFixAll$constant__from_lsproto().$value])), void 0, void 0) }) }, { value: new CodeLensOptions__from_lsproto(void 0, tsonicTypeScriptRuntime.location<bool>(true)) }, void 0, void 0, { value: new BooleanOrWorkspaceSymbolOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0) }, { value: new BooleanOrDocumentFormattingOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0) }, { value: new BooleanOrDocumentRangeFormattingOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0) }, { value: new DocumentOnTypeFormattingOptions__from_lsproto("{", tsonicTypeScriptRuntime.location<RuntimeSlice<gostring>>(RuntimeSlice.literal<gostring>(["}", ";", "\n"]))) }, { value: new BooleanOrRenameOptions__from_lsproto(void 0, { value: new RenameOptions__from_lsproto(void 0, tsonicTypeScriptRuntime.location<bool>(true)) }) }, { value: new BooleanOrFoldingRangeOptionsOrFoldingRangeRegistrationOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0, void 0) }, { value: new BooleanOrSelectionRangeOptionsOrSelectionRangeRegistrationOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0, void 0) }, void 0, { value: new BooleanOrCallHierarchyOptionsOrCallHierarchyRegistrationOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0, void 0) }, { value: new BooleanOrLinkedEditingRangeOptionsOrLinkedEditingRangeRegistrationOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0, void 0) }, { value: new SemanticTokensOptionsOrRegistrationOptions__from_lsproto({ value: new SemanticTokensOptions__from_lsproto(void 0, SemanticTokensLegend__from_ls(ResolvedSemanticTokensClientCapabilities__from_lsproto.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.clientCapabilities.TextDocument.SemanticTokens)), tsonicTypeScriptRuntime.location<BooleanOrEmptyObject__from_lsproto>(new BooleanOrEmptyObject__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0)), { value: new BooleanOrSemanticTokensFullDelta__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0) }) }, void 0) }, void 0, void 0, void 0, { value: new BooleanOrInlayHintOptionsOrInlayHintRegistrationOptions__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), void 0, void 0) }, { value: new DiagnosticOptionsOrRegistrationOptions__from_lsproto({ value: new DiagnosticOptions__from_lsproto(void 0, void 0, true, false) }, void 0) }, void 0, { value: new WorkspaceOptions__from_lsproto(void 0, { value: new FileOperationOptions__from_lsproto(void 0, void 0, void 0, tsonicTypeScriptRuntime.location<FileOperationRegistrationOptions__from_lsproto>(new FileOperationRegistrationOptions__from_lsproto($state.fileRenameFilters)), void 0, void 0) }, void 0) }, { value: new ExperimentalServerCapabilities__from_lsproto(tsonicTypeScriptRuntime.location<bool>(true), tsonicTypeScriptRuntime.location<bool>(true)) }, { value: new VSOnAutoInsertOptions__from_lsproto(RuntimeSlice.literal<gostring>([">"])) }, tsonicTypeScriptRuntime.location<bool>(true)) }, { value: new ServerInfo__from_lsproto("typescript-go", tsonicTypeScriptRuntime.location<gostring>(Version__from_core())) }) };
        return [response, void 0];
    }
    static $go$private$lsp$handleInitializeAPISession(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto> | undefined, $2: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        {
            value: InitializeAPISessionResult__from_lsproto;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_4: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        let __gotots_return_1: [
            {
                value: InitializeAPISessionResult__from_lsproto;
            } | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_2: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiSessionsMu);
                    const __gotots_receiver_24: Server["apiSessionsMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiSessionsMu;
                    __gotots_deferred_4 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_24, $go$recovery);
                    };
                    if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiSessions.isNil()) {
                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiSessions = $goMap$MapOf_string_To_PointerTo_Named_api$Session.make(0, []);
                    }
                    let apiSession: {
                        value: Session__from_api;
                    } | undefined = void 0;
                    apiSession = NewSession__from_api((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, void 0);
                    let pipePath = "";
                    if (!(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto>).value.Pipe === undefined) && ((((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto>).value.Pipe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value
                        !== "") {
                        pipePath =
                            ((((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeAPISessionParams__from_lsproto>).value.Pipe ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value;
                    }
                    else {
                        pipePath = Server.$go$private$lsp$generateAPIPipePath(s);
                    }
                    const __gotots_results_47 = NewPipeTransport__from_api(pipePath);
                    let transport: PipeTransport__from_api | undefined = __gotots_results_47[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_47[1];
                    if (!(err === undefined)) {
                        __gotots_return_1 = [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to create API transport: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])))];
                        break __gotots_return_block_2;
                    }
                    ((): void => {
                        let __gotots_deferred_5: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                        let __gotots_deferred_6: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                        let __gotots_deferred_7: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                        let __gotots_panic_3: GoPanic | undefined = undefined;
                        try {
                            try {
                                __gotots_return_block_3: {
                                    const __gotots_callee_22 = (): void => {
                                        Session__from_api.Close(apiSession);
                                        Server.$go$private$lsp$removeAPISession(s, Session__from_api.ID(apiSession));
                                    };
                                    __gotots_deferred_5 = ($go$recovery: GoRecovery): void => {
                                        __gotots_callee_22();
                                    };
                                    const __gotots_results_48 = PipeTransport__from_api.Accept(transport);
                                    let rwc: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined = __gotots_results_48[0];
                                    let acceptErr: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_48[1];
                                    PipeTransport__from_api.Close(transport);
                                    if (!(acceptErr === undefined)) {
                                        logger.Errorf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, "API session %s: failed to accept connection: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(Session__from_api.ID(apiSession)), acceptErr]));
                                        break __gotots_return_block_3;
                                    }
                                    const __gotots_argument_68: Server["backgroundCtx"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
                                    const __gotots_results_49 = provider_context.ContextWithCancelDirect(GoProviderProfileBridge.$to(__gotots_argument_68));
                                    const __gotots_results_50 = [GoProviderProfileBridge.$from(__gotots_results_49[0]), __gotots_results_49[1]] satisfies [
                                        GoInterface | undefined,
                                        (() => void) | undefined
                                    ];
                                    let apiCtx: GoInterface | undefined = __gotots_results_50[0];
                                    let apiCancel: (() => void) | undefined = __gotots_results_50[1];
                                    const __gotots_callee_24: (() => void) | undefined = apiCancel;
                                    const __gotots_deferred_8 = $goDeferred$void_to_void.resolve(__gotots_callee_24);
                                    __gotots_deferred_6 = ($go$recovery: GoRecovery): void => {
                                        __gotots_deferred_8 === undefined ? (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_8($go$recovery);
                                    };
                                    const __gotots_callee_27 = ($go$recovery: GoRecovery): void => {
                                        {
                                            let r: $goInterface$Interface_void | undefined = $go$recovery === undefined ? undefined : $go$recovery.take();
                                            if (!(r === undefined)) {
                                                let stack = debug__from_gostdlib.Stack();
                                                const __gotots_receiver_27: Server["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                                                const __gotots_argument_77 = "API session %s: panic: %v\n%s";
                                                const __gotots_argument_74 = new GoInterfaceAdapter(Session__from_api.ID(apiSession));
                                                const __gotots_argument_75 = r;
                                                const __gotots_conversion_6 = stack;
                                                let __gotots_conversion_7 = "";
                                                for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
                                                    __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
                                                }
                                                const __gotots_argument_76 = new GoInterfaceAdapter(__gotots_conversion_7);
                                                const __gotots_argument_78 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_74, __gotots_argument_75, __gotots_argument_76]);
                                                logger.Errorf(__gotots_receiver_27, __gotots_argument_77, __gotots_argument_78);
                                                const __gotots_callee_26 = apiCancel;
                                                (__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))();
                                                const __gotots_receiver_28 = rwc;
                                                goInterfaceNonNil<$goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error>(__gotots_receiver_28).Close();
                                            }
                                        }
                                    };
                                    __gotots_deferred_7 = ($go$recovery: GoRecovery): void => {
                                        __gotots_callee_27($go$recovery);
                                    };
                                    let conn: {
                                        value: AsyncConn__from_api;
                                    } | undefined = NewAsyncConn__from_api(rwc, new $goInterfaceAdapter$PointerTo_Named_api$Session(apiSession));
                                    {
                                        let apiErr: $goInterface$Interface_Method_Error_void_to_string | undefined = AsyncConn__from_api.Run(conn, apiCtx);
                                        if (!(apiErr === undefined)) {
                                            logger.Errorf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, "API session %s: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(Session__from_api.ID(apiSession)), apiErr]));
                                        }
                                    }
                                }
                            }
                            catch (__gotots_caught_9) {
                                if (!(__gotots_caught_9 instanceof GoPanic)) {
                                    throw __gotots_caught_9;
                                }
                                __gotots_panic_3 = __gotots_caught_9;
                            }
                        }
                        finally {
                            if (__gotots_deferred_7 !== undefined) {
                                const __gotots_recovery_5 = new GoRecovery(__gotots_panic_3);
                                try {
                                    __gotots_deferred_7(__gotots_recovery_5);
                                    if (__gotots_recovery_5.recovered()) {
                                        __gotots_panic_3 = undefined;
                                    }
                                }
                                catch (__gotots_caught_8) {
                                    if (!(__gotots_caught_8 instanceof GoPanic)) {
                                        throw __gotots_caught_8;
                                    }
                                    __gotots_panic_3 = __gotots_caught_8;
                                }
                            }
                            if (__gotots_deferred_6 !== undefined) {
                                const __gotots_recovery_4 = new GoRecovery(__gotots_panic_3);
                                try {
                                    __gotots_deferred_6(__gotots_recovery_4);
                                    if (__gotots_recovery_4.recovered()) {
                                        __gotots_panic_3 = undefined;
                                    }
                                }
                                catch (__gotots_caught_7) {
                                    if (!(__gotots_caught_7 instanceof GoPanic)) {
                                        throw __gotots_caught_7;
                                    }
                                    __gotots_panic_3 = __gotots_caught_7;
                                }
                            }
                            if (__gotots_deferred_5 !== undefined) {
                                const __gotots_recovery_3 = new GoRecovery(__gotots_panic_3);
                                try {
                                    __gotots_deferred_5(__gotots_recovery_3);
                                    if (__gotots_recovery_3.recovered()) {
                                        __gotots_panic_3 = undefined;
                                    }
                                }
                                catch (__gotots_caught_6) {
                                    if (!(__gotots_caught_6 instanceof GoPanic)) {
                                        throw __gotots_caught_6;
                                    }
                                    __gotots_panic_3 = __gotots_caught_6;
                                }
                            }
                        }
                        if (__gotots_panic_3 !== undefined) {
                            throw __gotots_panic_3;
                        }
                    })();
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiSessions.store(Session__from_api.ID(apiSession), apiSession);
                    __gotots_return_1 = [
                        { value: new InitializeAPISessionResult__from_lsproto(Session__from_api.ID(apiSession), pipePath) }, void 0];
                    break __gotots_return_block_2;
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_4 !== undefined) {
                const __gotots_recovery_2 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_4(__gotots_recovery_2);
                    if (__gotots_recovery_2.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
        return __gotots_return_1;
    }
    static $go$private$lsp$handleInitialized(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<InitializedParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let disablePushDiagnostics = false;
        let enableTelemetry = false;
        if (!(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisablePushDiagnostics === undefined)) {
            disablePushDiagnostics =
                ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisablePushDiagnostics ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<bool>).value;
        }
        if (!(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EnableTelemetry === undefined)) {
            enableTelemetry =
                ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializationOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EnableTelemetry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<bool>).value;
        }
        let hasDynamicWatchRegistration = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.clientCapabilities.Workspace.DidChangeWatchedFiles.DynamicRegistration;
        if (hasDynamicWatchRegistration) {
            logger.Logf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, "file watching: using LSP client-side watching (client supports dynamic registration)", RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watchEnabled = true;
        }
        else {
            const __gotots_receiver_21 = Default__from_fswatch();
            if (goInterfaceNonNil<Watcher__from_fswatch>(__gotots_receiver_21).HasFastRecursiveBackend()) {
                logger.Logf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, "file watching: using builtin in-process watcher (client lacks dynamic watch registration)", RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watchEnabled = true;
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builtinWatcher = New__from_lspwatcher((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, (changes: RuntimeSlice<{
                    value: FileEvent__from_lsproto;
                } | undefined>): void => {
                    if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session === undefined)) {
                        Session__from_project.DidChangeWatchedFiles((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx, changes);
                    }
                }, new $goInterfaceAdapter$PointerTo_Named_lsp$logger((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger));
            }
            else {
                logger.Logf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, "file watching: disabled (client lacks dynamic watch registration and builtin watcher backend is not fast-recursive)", RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
            }
        }
        let cwd: Server["cwd"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cwd;
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.clientCapabilities.Workspace.WorkspaceFolders && !((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.WorkspaceFolders === undefined) && !(WorkspaceFoldersOrNull__from_lsproto.$storageOf((((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.WorkspaceFolders ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<WorkspaceFoldersOrNull__from_lsproto>).value).WorkspaceFolders === undefined) && ((WorkspaceFoldersOrNull__from_lsproto.$storageOf((((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.WorkspaceFolders ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<WorkspaceFoldersOrNull__from_lsproto>).value).WorkspaceFolders ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
            value: WorkspaceFolder__from_lsproto;
        } | undefined>>).value.length === 1) {
            cwd = new DocumentUri__from_lsproto(((((WorkspaceFoldersOrNull__from_lsproto.$storageOf((((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.WorkspaceFolders ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<WorkspaceFoldersOrNull__from_lsproto>).value).WorkspaceFolders ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                value: WorkspaceFolder__from_lsproto;
            } | undefined>>).value).get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Uri.$value).FileName();
        }
        else if (!((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.RootUri.DocumentUri === undefined)) {
            cwd = (((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.RootUri.DocumentUri ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentUri__from_lsproto>).value.FileName();
        }
        else if (!((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.RootPath === undefined) && !((((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.RootPath ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringOrNull__from_lsproto>).value.String === undefined)) {
            cwd =
                (((((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto>).value.RootPath ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringOrNull__from_lsproto>).value.String ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value;
        }
        if (!PathIsAbsolute__from_tspath(cwd)) {
            cwd = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cwd;
        }
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.telemetryEnabled = enableTelemetry;
        const __gotots_argument_65: Server["backgroundCtx"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
        const __gotots_store_3 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_66 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "clientCapabilities");
        const __gotots_field_4 = WithClientCapabilities__from_lsproto(__gotots_argument_65, __gotots_argument_66);
        const __gotots_argument_67 = new SessionInit__from_project(__gotots_field_4, { value: new SessionOptions__from_project(cwd, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.defaultLibraryPath, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typingsLocation, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.positionEncoding, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watchEnabled, true, enableTelemetry, !disablePushDiagnostics, named_time.TimeDurationValueOperations.$wrap(500000000n), Locale__from_locale.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.locale), CheckerPoolOptions__from_project.$zero()) }, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs, new $goInterfaceAdapter$PointerTo_Named_lsp$Server(s), new $goInterfaceAdapter$PointerTo_Named_lsp$logger((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger), new $goInterfaceAdapter$PointerTo_Named_lsp$Server(s), (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parseCache);
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session = NewSession__from_project(__gotots_argument_67);
        const __gotots_results_32 = Server.RequestConfiguration(s, ctx);
        let userPreferences = __gotots_results_32[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_32[1];
        if (!(err === undefined)) {
            return err;
        }
        Session__from_project.InitializeWithUserConfig((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, UserPreferences__from_lsutil.$copy(userPreferences));
        const __gotots_results_33 = sendClientRequest$PointerTo_Named_lsproto$RegistrationParams$Named_lsproto$Null(ctx, s, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<RegistrationParams__from_lsproto> | undefined, Null__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<RegistrationParams__from_lsproto> | undefined, Null__from_lsproto>($state__lsproto.ClientRegisterCapabilityInfo)), tsonicTypeScriptRuntime.location<RegistrationParams__from_lsproto>(new RegistrationParams__from_lsproto(RuntimeSlice.literal<{
            value: Registration__from_lsproto;
        } | undefined>([
            { value: new Registration__from_lsproto("typescript-config-watch-id", { value: new RegisterOptions__from_lsproto(void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, tsonicTypeScriptRuntime.location<DidChangeConfigurationRegistrationOptions__from_lsproto>(new DidChangeConfigurationRegistrationOptions__from_lsproto({ value: new StringOrStrings__from_lsproto(void 0, tsonicTypeScriptRuntime.location<RuntimeSlice<gostring>>(RuntimeSlice.literal<gostring>(["js/ts", "typescript", "javascript", "editor"]))) })), void 0, void 0, void 0, void 0, void 0, void 0) }) },
        ]))));
        err = __gotots_results_33[1];
        if (!(err === undefined)) {
            return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to register configuration change watcher: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
        }
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptionsForInferredProjects === undefined)) {
            Session__from_project.DidChangeCompilerOptionsForInferredProjects((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptionsForInferredProjects);
        }
        Session__from_project.StartPerformanceTelemetry((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session);
        GoChannel.close((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initComplete);
        return void 0;
    }
    static $go$private$lsp$handleInlayHint(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, languageService: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<InlayHintParams__from_lsproto> | undefined): [
        InlayHintsOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideInlayHint(languageService, ctx, params);
    }
    static $go$private$lsp$handleLinkedEditingRange(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<LinkedEditingRangeParams__from_lsproto> | undefined): [
        LinkedEditingRangesOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideLinkedEditingRange(ls__shadow_1, ctx, params);
    }
    static $go$private$lsp$handleMultiDocumentHighlight(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto> | undefined): [
        MultiDocumentHighlightsOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideMultiDocumentHighlights(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto>).value.TextDocument.Uri, Position__from_lsproto.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto>).value.Position), ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MultiDocumentHighlightParams__from_lsproto>).value.FilesToSearch);
    }
    static $go$private$lsp$handlePrepareCallHierarchy(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, languageService: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto> | undefined): [
        CallHierarchyItemsOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvidePrepareCallHierarchy(languageService, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto>).value.TextDocument.Uri, Position__from_lsproto.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallHierarchyPrepareParams__from_lsproto>).value.Position));
    }
    static $go$private$lsp$handlePrepareRename(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, languageService: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto> | undefined): [
        RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let info = LanguageService__from_ls.GetRenameInfo(languageService, ctx, "", ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto>).value.TextDocument.Uri, Position__from_lsproto.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrepareRenameParams__from_lsproto>).value.Position));
        if (!info.CanRename) {
            return [RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto.$fromStorage({
                    Range: void 0,
                    PrepareRenamePlaceholder: void 0,
                    PrepareRenameDefaultBehavior: void 0
                }), new $goInterfaceAdapter$Named_lsp$userFacingRequestFailedError(new userFacingRequestFailedError(info.LocalizedErrorMessage))];
        }
        return [RangeOrPrepareRenamePlaceholderOrPrepareRenameDefaultBehaviorOrNull__from_lsproto.$fromStorage({
                PrepareRenamePlaceholder: { value: new PrepareRenamePlaceholder__from_lsproto(Range__from_lsproto.$copy(info.TriggerSpan), info.DisplayName) },
                Range: void 0,
                PrepareRenameDefaultBehavior: void 0
            }), void 0];
    }
    static $go$private$lsp$handleProjectInfo(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto> | undefined, $2: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        {
            value: ProjectInfoResult__from_lsproto;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let uri = ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProjectInfoParams__from_lsproto>).value.TextDocument.Uri;
        const __gotots_results_51 = Session__from_project.GetLanguageServiceAndProjectsForFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, uri);
        let defaultProject: {
            value: Project__from_project;
        } | undefined = __gotots_results_51[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_51[3];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        let configFilePath = "";
        if (!(defaultProject === undefined) && (defaultProject ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === KindConfigured$constant__from_project().$value) {
            configFilePath = Project__from_project.Name(defaultProject);
        }
        return [
            { value: new ProjectInfoResult__from_lsproto(configFilePath) }, void 0];
    }
    static $go$private$lsp$handleRename(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto> | undefined, req: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        WorkspaceEditOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_36 = Server.$go$private$lsp$getLanguageServiceAndCrossProjectOrchestrator(s, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto>).value.TextDocument.Uri, req);
        let defaultLs: LanguageService__from_ls | undefined = __gotots_results_36[0];
        let orchestrator: CrossProjectOrchestrator__from_ls | undefined = __gotots_results_36[1];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_36[2];
        if (!(err === undefined)) {
            return [WorkspaceEditOrNull__from_lsproto.$fromStorage({
                    WorkspaceEdit: void 0
                }), err];
        }
        let info = LanguageService__from_ls.GetRenameInfo(defaultLs, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto>).value.NewName, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto>).value.TextDocument.Uri, Position__from_lsproto.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RenameParams__from_lsproto>).value.Position));
        if (info.CanRename && info.FileToRename !== "") {
            if (ClientSupportsWillRenameFiles__from_ls(ctx)) {
                let documentChanges = RuntimeSlice.literal<TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto$Storage>([
                    (void TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf, (void TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$fromStorage,
                        {
                            RenameFile: { value: new RenameFile__from_lsproto(new StringLiteralRename__from_lsproto, void 0, FileNameToDocumentURI__from_lsconv(info.FileToRename), FileNameToDocumentURI__from_lsconv(info.NewFileName), void 0) },
                            TextDocumentEdit: void 0,
                            CreateFile: void 0,
                            DeleteFile: void 0
                        })),
                ]);
                const documentChanges$location = tsonicTypeScriptRuntime.boundLocation({}, () => documentChanges, documentChanges$next => documentChanges = documentChanges$next);
                return [WorkspaceEditOrNull__from_lsproto.$fromStorage({
                        WorkspaceEdit: { value: new WorkspaceEdit__from_lsproto(void 0, documentChanges$location, void 0) }
                    }), void 0];
            }
            let renameFilesParams: tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined = tsonicTypeScriptRuntime.location<RenameFilesParams__from_lsproto>(new RenameFilesParams__from_lsproto(RuntimeSlice.literal<{
                value: FileRename__from_lsproto;
            } | undefined>([
                { value: new FileRename__from_lsproto(FileNameToDocumentURI__from_lsconv(info.FileToRename).$value, FileNameToDocumentURI__from_lsconv(info.NewFileName).$value) },
            ])));
            return Server.$go$private$lsp$handleWillRenameFilesWorker(s, ctx, renameFilesParams, req, true);
        }
        return LanguageService__from_ls.ProvideRename(defaultLs, ctx, params, orchestrator);
    }
    static $go$private$lsp$handleRequestOrNotification(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, req: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_argument_24 = ctx;
        const __gotots_store_0 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_25 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "clientCapabilities");
        ctx = WithClientCapabilities__from_lsproto(__gotots_argument_24, __gotots_argument_25);
        {
            const __gotots_callee_11 = $state.handlers;
            const __gotots_map_0 = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))().$value;
            const __gotots_map_1: RequestMessage__from_lsproto["Method"] = (req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method;
            let handler: (($0: {
                value: Server;
            } | undefined, $1: GoInterface | undefined, $2: {
                value: RequestMessage__from_lsproto;
            } | undefined) => [
                (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ]) | undefined = __gotots_map_0.lookup(__gotots_map_1);
            if (!(handler === undefined)) {
                let start = time__from_gostdlib.Now();
                const __gotots_callee_12 = handler;
                const __gotots_argument_26 = s;
                const __gotots_argument_27 = ctx;
                const __gotots_argument_28 = req;
                const __gotots_results_12 = (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_26, __gotots_argument_27, __gotots_argument_28);
                let doAsyncWork: (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined = __gotots_results_12[0];
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_12[1];
                let idStr = "";
                if (!((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID === undefined)) {
                    idStr = " (" + ID__from_jsonrpc.String((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID) + ")";
                }
                if (!(err === undefined)) {
                    {
                        const __gotots_results_13 = AsType$Named_lsp$userFacingRequestFailedError(err);
                        let ok = __gotots_results_13[1];
                        if (!ok) {
                            logger.Error((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("error handling method '"), new $goInterfaceAdapter$Named_lsproto$Method((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method), new GoInterfaceAdapter("'"), new GoInterfaceAdapter(idStr), new GoInterfaceAdapter(": "), err]));
                        }
                        else if (!logger.IsTracing((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger)) {
                            logger.Info((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("handled method '"), new $goInterfaceAdapter$Named_lsproto$Method((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method), new GoInterfaceAdapter("'"), new GoInterfaceAdapter(idStr), new GoInterfaceAdapter(" in "), new $goInterfaceAdapter$Named_time$Duration(time__from_gostdlib.Since(named_time.TimeOperations.$copy(start)))]));
                        }
                    }
                    return [void 0, err];
                }
                if (!(doAsyncWork === undefined)) {
                    return [(): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                            const __gotots_callee_13 = doAsyncWork;
                            let asyncWorkErr: $goInterface$Interface_Method_Error_void_to_string | undefined = (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))();
                            const __gotots_results_14 = AsType$Named_lsp$userFacingRequestFailedError(asyncWorkErr);
                            let isUserFacing = __gotots_results_14[1];
                            let isRealError = !(asyncWorkErr === undefined) && !isUserFacing;
                            if (isRealError) {
                                logger.Info((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("error handling method '"), new $goInterfaceAdapter$Named_lsproto$Method((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method), new GoInterfaceAdapter("'"), new GoInterfaceAdapter(idStr), new GoInterfaceAdapter(" in "), new $goInterfaceAdapter$Named_time$Duration(time__from_gostdlib.Since(named_time.TimeOperations.$copy(start)))]));
                            }
                            else if (!logger.IsTracing((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger)) {
                                logger.Info((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("handled method '"), new $goInterfaceAdapter$Named_lsproto$Method((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method), new GoInterfaceAdapter("'"), new GoInterfaceAdapter(idStr), new GoInterfaceAdapter(" in "), new $goInterfaceAdapter$Named_time$Duration(time__from_gostdlib.Since(named_time.TimeOperations.$copy(start)))]));
                            }
                            return asyncWorkErr;
                        }, void 0];
                }
                if (!logger.IsTracing((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger)) {
                    logger.Info((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("handled method '"), new $goInterfaceAdapter$Named_lsproto$Method((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method), new GoInterfaceAdapter("'"), new GoInterfaceAdapter(idStr), new GoInterfaceAdapter(" in "), new $goInterfaceAdapter$Named_time$Duration(time__from_gostdlib.Since(named_time.TimeOperations.$copy(start)))]));
                }
                return [void 0, void 0];
            }
        }
        logger.Warn((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("unknown method '"), new $goInterfaceAdapter$Named_lsproto$Method((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method), new GoInterfaceAdapter("'")]));
        if (!((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID === undefined)) {
            return [void 0, Server.$go$private$lsp$sendError(s, (req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID, new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidRequest$constant__from_lsproto()))];
        }
        return [void 0, void 0];
    }
    static $go$private$lsp$handleRunGC(s: {
        value: Server;
    } | undefined, $0: GoInterface | undefined, $1: NoParams__from_lsproto, $2: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        Null__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        RunGC__from_pprof();
        logger.Info((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("GC triggered")]));
        return [Null__from_lsproto.$fromStorage({}), void 0];
    }
    static $go$private$lsp$handleSaveAllocProfile(s: {
        value: Server;
    } | undefined, $0: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, $2: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        {
            value: ProfileResult__from_lsproto;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_45 = SaveAllocProfile__from_pprof(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto>).value.Dir);
        let filePath = __gotots_results_45[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_45[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        logger.Info((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("Allocation profile saved to: "), new GoInterfaceAdapter(filePath)]));
        return [
            { value: new ProfileResult__from_lsproto(filePath) }, void 0];
    }
    static $go$private$lsp$handleSaveHeapProfile(s: {
        value: Server;
    } | undefined, $0: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, $2: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        {
            value: ProfileResult__from_lsproto;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_44 = SaveHeapProfile__from_pprof(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto>).value.Dir);
        let filePath = __gotots_results_44[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_44[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        logger.Info((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("Heap profile saved to: "), new GoInterfaceAdapter(filePath)]));
        return [
            { value: new ProfileResult__from_lsproto(filePath) }, void 0];
    }
    static $go$private$lsp$handleSelectionRange(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<SelectionRangeParams__from_lsproto> | undefined): [
        SelectionRangesOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideSelectionRanges(ls__shadow_1, ctx, params);
    }
    static $go$private$lsp$handleSemanticTokensFull(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto> | undefined): [
        SemanticTokensOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideSemanticTokens(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SemanticTokensParams__from_lsproto>).value.TextDocument.Uri);
    }
    static $go$private$lsp$handleSemanticTokensRange(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto> | undefined): [
        SemanticTokensOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideSemanticTokensRange(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto>).value.TextDocument.Uri, Range__from_lsproto.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SemanticTokensRangeParams__from_lsproto>).value.Range));
    }
    static $go$private$lsp$handleSetLogVerbosity(s: {
        value: Server;
    } | undefined, $0: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        if (!isValidLogVerbosity(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto>).value.Verbosity)) {
            return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: invalid log verbosity %d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidParams$constant__from_lsproto()), new $goInterfaceAdapter$Named_lsproto$LogVerbosity(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto>).value.Verbosity)])));
        }
        logger.SetVerbosity((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SetLogVerbosityParams__from_lsproto>).value.Verbosity);
        return void 0;
    }
    static $go$private$lsp$handleSetTrace(s: {
        value: Server;
    } | undefined, $0: GoInterface | undefined, $1: tsonicTypeScriptRuntime.Location<SetTraceParams__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        return void 0;
    }
    static $go$private$lsp$handleShutdown(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, $1: NoParams__from_lsproto, $2: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        Null__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builtinWatcher === undefined)) {
            Watcher__from_lspwatcher.Close((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builtinWatcher);
        }
        Session__from_project.Close((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session);
        return [Null__from_lsproto.$fromStorage({}), void 0];
    }
    static $go$private$lsp$handleSignatureHelp(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, languageService: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto> | undefined): [
        SignatureHelpOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideSignatureHelp(languageService, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto>).value.TextDocument.Uri, Position__from_lsproto.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto>).value.Position), ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SignatureHelpParams__from_lsproto>).value.Context);
    }
    static $go$private$lsp$handleSourceDefinition(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto> | undefined): [
        tsonicTypeScriptRuntime.Location<LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_results_35 = LanguageService__from_ls.ProvideSourceDefinition(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto>).value.TextDocument.Uri, Position__from_lsproto.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextDocumentPositionParams__from_lsproto>).value.Position));
        let resp = __gotots_results_35[0];
        const resp$location = tsonicTypeScriptRuntime.boundLocation({}, () => resp, resp$next => resp = resp$next);
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_35[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        return [
            resp$location, void 0];
    }
    static $go$private$lsp$handleStartCPUProfile(s: {
        value: Server;
    } | undefined, $0: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto> | undefined, $2: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        Null__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_store_4 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = CPUProfiler__from_pprof.StartCPUProfile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "cpuProfiler"), ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto>).value.Dir);
        if (!(err === undefined)) {
            return [Null__from_lsproto.$fromStorage({}), err];
        }
        logger.Info((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("CPU profiling started, will save to: "), new GoInterfaceAdapter(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProfileParams__from_lsproto>).value.Dir)]));
        return [Null__from_lsproto.$fromStorage({}), void 0];
    }
    static $go$private$lsp$handleStopCPUProfile(s: {
        value: Server;
    } | undefined, $0: GoInterface | undefined, $1: NoParams__from_lsproto, $2: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        {
            value: ProfileResult__from_lsproto;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_store_5 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_results_46 = CPUProfiler__from_pprof.StopCPUProfile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "cpuProfiler"));
        let filePath = __gotots_results_46[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_46[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        logger.Info((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("CPU profile saved to: "), new GoInterfaceAdapter(filePath)]));
        return [
            { value: new ProfileResult__from_lsproto(filePath) }, void 0];
    }
    static $go$private$lsp$handleTypeDefinition(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto> | undefined): [
        LocationOrLocationsOrDefinitionLinksOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideTypeDefinition(ls__shadow_1, ctx, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto>).value.TextDocument.Uri, Position__from_lsproto.$copy(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeDefinitionParams__from_lsproto>).value.Position));
    }
    static $go$private$lsp$handleVSOnAutoInsert(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, ls__shadow_1: LanguageService__from_ls | undefined, params: tsonicTypeScriptRuntime.Location<VSOnAutoInsertParams__from_lsproto> | undefined): [
        VSOnAutoInsertResponseItemOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return LanguageService__from_ls.ProvideOnAutoInsert(ls__shadow_1, ctx, params);
    }
    static $go$private$lsp$handleWillRenameFiles(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined, msg: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        WorkspaceEditOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Server.$go$private$lsp$handleWillRenameFilesWorker(s, ctx, params, msg, false);
    }
    static $go$private$lsp$handleWillRenameFilesWorker(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto> | undefined, $2: {
        value: RequestMessage__from_lsproto;
    } | undefined, sendRenameFile: bool): [
        WorkspaceEditOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto>).value.Files.length === 0) {
            return [WorkspaceEditOrNull__from_lsproto.$fromStorage({
                    WorkspaceEdit: void 0
                }), void 0];
        }
        let uris = RuntimeSlice.make<gostring>(0, ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto>).value.Files.length, ((void DocumentUri__from_lsproto,
            "") as string));
        const __gotots_range_1 = ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto>).value.Files;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
            let file: {
                value: FileRename__from_lsproto;
            } | undefined = __gotots_range_value_2;
            uris = uris.append(((void DocumentUri__from_lsproto,
                "") as string), [
                ((void DocumentUri__from_lsproto,
                    (file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OldUri) as string),
            ]);
        }
        if (uris.length === 0) {
            return [WorkspaceEditOrNull__from_lsproto.$fromStorage({
                    WorkspaceEdit: void 0
                }), void 0];
        }
        let services = Session__from_project.GetLanguageServicesForDocuments((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, uris);
        class editKey {
            declare private readonly $goType: void;
            public constructor(public uri: DocumentUri__from_lsproto, public range_: Range__from_lsproto) {
            }
            static $copy($source: editKey): editKey {
                return new editKey($source.uri, Range__from_lsproto.$copy($source.range_));
            }
            static $equal($left: editKey, $right: editKey): bool {
                return $left.uri.$value === $right.uri.$value && Range__from_lsproto.$equal($left.range_, $right.range_);
            }
            static $hash($source: editKey): number {
                let $hash = 2166136261;
                $hash = GoMapHash.mix($hash, GoMapHash.string($source.uri.$value));
                $hash = GoMapHash.mix($hash, Range__from_lsproto.$hash($source.range_));
                return $hash;
            }
            declare private readonly then?: never;
        }
        class $goMap$MapOf_Named_editKey_To_string extends GoMapValue<editKey, gostring> {
            private constructor(private readonly zeroValue: gostring, private readonly buckets: Map<number, [
                editKey,
                gostring
            ][]> | undefined, private count: number) {
                super();
            }
            private static $zeroValue(): gostring {
                return "";
            }
            private static $hash($key: editKey): number {
                return editKey.$hash($key);
            }
            private static $equal($left: editKey, $right: editKey): boolean {
                return editKey.$equal($left, $right);
            }
            private static $copyKey($key: editKey): editKey {
                return editKey.$copy($key);
            }
            private static $copyValue($value: gostring): gostring {
                return $value;
            }
            static nil(): $goMap$MapOf_Named_editKey_To_string {
                return new $goMap$MapOf_Named_editKey_To_string($goMap$MapOf_Named_editKey_To_string.$zeroValue(), undefined, 0);
            }
            static make(size: number | bigint, entries: [
                editKey,
                gostring
            ][]): $goMap$MapOf_Named_editKey_To_string {
                const result: $goMap$MapOf_Named_editKey_To_string = new $goMap$MapOf_Named_editKey_To_string($goMap$MapOf_Named_editKey_To_string.$zeroValue(), new Map<number, [
                    editKey,
                    gostring
                ][]>, 0);
                for (const entry of entries) {
                    result.store(entry[0], entry[1]);
                }
                return result;
            }
            private $find(key: editKey): [
                [
                    editKey,
                    gostring
                ],
                [
                    editKey,
                    gostring
                ][],
                number
            ] | undefined {
                const buckets = this.buckets;
                if (buckets === undefined) {
                    return undefined;
                }
                const bucket = buckets.get($goMap$MapOf_Named_editKey_To_string.$hash(key));
                if (bucket === undefined) {
                    return undefined;
                }
                let index = 0;
                for (const entry of bucket) {
                    if ($goMap$MapOf_Named_editKey_To_string.$equal(entry[0], key)) {
                        return [entry, bucket, index];
                    }
                    index++;
                }
                return undefined;
            }
            lookup(key: editKey): gostring {
                const found: [
                    [
                        editKey,
                        gostring
                    ],
                    [
                        editKey,
                        gostring
                    ][],
                    number
                ] | undefined = this.$find(key);
                return $goMap$MapOf_Named_editKey_To_string.$copyValue(found === undefined ? this.zeroValue : found[0][1]);
            }
            lookupOk(key: editKey): [
                gostring,
                boolean
            ] {
                const found: [
                    [
                        editKey,
                        gostring
                    ],
                    [
                        editKey,
                        gostring
                    ][],
                    number
                ] | undefined = this.$find(key);
                if (found === undefined) {
                    return [$goMap$MapOf_Named_editKey_To_string.$copyValue(this.zeroValue), false];
                }
                return [$goMap$MapOf_Named_editKey_To_string.$copyValue(found[0][1]), true];
            }
            store(key: editKey, value: gostring): void {
                const buckets: Map<number, [
                    editKey,
                    gostring
                ][]> | undefined = this.buckets;
                if (buckets === undefined) {
                    GoPanic.raiseRuntime("assignment to entry in nil map");
                }
                const hash: number = $goMap$MapOf_Named_editKey_To_string.$hash(key);
                let bucket: [
                    editKey,
                    gostring
                ][] | undefined = buckets.get(hash);
                if (bucket === undefined) {
                    bucket = [];
                    buckets.set(hash, bucket);
                }
                for (const entry of bucket) {
                    if ($goMap$MapOf_Named_editKey_To_string.$equal(entry[0], key)) {
                        entry[1] = $goMap$MapOf_Named_editKey_To_string.$copyValue(value);
                        return;
                    }
                }
                bucket.push([$goMap$MapOf_Named_editKey_To_string.$copyKey(key), $goMap$MapOf_Named_editKey_To_string.$copyValue(value)]);
                this.count++;
            }
            delete(key: editKey): void {
                const found: [
                    [
                        editKey,
                        gostring
                    ],
                    [
                        editKey,
                        gostring
                    ][],
                    number
                ] | undefined = this.$find(key);
                if (found === undefined) {
                    return;
                }
                found[1].splice(found[2], 1);
                if (found[1].length === 0) {
                    if (!(this.buckets === undefined)) {
                        this.buckets.delete($goMap$MapOf_Named_editKey_To_string.$hash(key));
                    }
                }
                this.count--;
            }
            length(): number {
                return this.count;
            }
            isNil(): boolean {
                return this.buckets === undefined;
            }
            clear(): void {
                if (this.buckets === undefined) {
                    return;
                }
                this.buckets.clear();
                this.count = 0;
            }
            keys(): editKey[] {
                const result: editKey[] = [];
                const buckets: Map<number, [
                    editKey,
                    gostring
                ][]> | undefined = this.buckets;
                if (buckets === undefined) {
                    return result;
                }
                for (const bucket of buckets.values()) {
                    for (const entry of bucket) {
                        result.push(entry[0]);
                    }
                }
                return result;
            }
        }
        let seenEdits: GoMapValue<editKey, gostring> = $goMap$MapOf_Named_editKey_To_string.make(0, []);
        let seenRenames: GoMapValue<DocumentUri__from_lsproto, bool> = $goMap$MapOf_Named_lsproto$DocumentUri_To_bool.make(0, []);
        let documentChanges = RuntimeSlice.nil<TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto$Storage>();
        const documentChanges$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => documentChanges, documentChanges$next2 => documentChanges = documentChanges$next2);
        const __gotots_range_2 = services;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
            let languageService: LanguageService__from_ls | undefined = __gotots_range_value_3;
            const __gotots_range_3 = ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto>).value.Files;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
                let file: {
                    value: FileRename__from_lsproto;
                } | undefined = __gotots_range_value_4;
                let changes__shadow_1 = LanguageService__from_ls.GetEditsForFileRename(languageService, ctx, new DocumentUri__from_lsproto((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OldUri), new DocumentUri__from_lsproto((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewUri));
                const __gotots_range_4 = changes__shadow_1;
                for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                    const __gotots_range_value_5 = TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$fromStorage(__gotots_range_4.get(__gotots_range_index_4)));
                    let change = __gotots_range_value_5;
                    if (!(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).RenameFile === undefined)) {
                        if (!seenRenames.lookup((TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).RenameFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OldUri)) {
                            seenRenames.store((TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).RenameFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OldUri, true);
                            const __gotots_slice_build_0 = documentChanges;
                            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                            let __gotots_slice_build_1 = __gotots_slice_build_0;
                            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(change)));
                            }
                            else {
                                __gotots_slice_build_1 = goSliceAllocate<TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                                    __gotots_slice_build_1.set(__gotots_slice_build_3, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                                }
                                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(change)));
                                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$zero()));
                                }
                            }
                            documentChanges = __gotots_slice_build_1;
                        }
                    }
                    else if (!(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).TextDocumentEdit === undefined)) {
                        let uri = (TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).TextDocumentEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TextDocument.Uri;
                        let deduped = RuntimeSlice.nil<TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto$Storage>();
                        const __gotots_range_5: TextDocumentEdit__from_lsproto["Edits"] = (TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).TextDocumentEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Edits;
                        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
                            const __gotots_range_value_6 = TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$copy(TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$fromStorage(__gotots_range_5.get(__gotots_range_index_5)));
                            let edit = __gotots_range_value_6;
                            if (!(TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$storageOf(edit).TextEdit === undefined)) {
                                let key = new editKey(uri, Range__from_lsproto.$copy((TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$storageOf(edit).TextEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Range));
                                {
                                    const __gotots_results_57 = seenEdits.lookupOk(key);
                                    let prev = __gotots_results_57[0];
                                    let ok = __gotots_results_57[1];
                                    if (ok && prev === (TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$storageOf(edit).TextEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewText) {
                                        continue;
                                    }
                                }
                                seenEdits.store(key, (TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$storageOf(edit).TextEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewText);
                            }
                            const __gotots_slice_build_4 = deduped;
                            const __gotots_slice_build_6 = __gotots_slice_build_4.length + 1;
                            let __gotots_slice_build_5 = __gotots_slice_build_4;
                            if (__gotots_slice_build_6 <= __gotots_slice_build_4.capacity) {
                                __gotots_slice_build_5 = __gotots_slice_build_4.$withLength(__gotots_slice_build_6);
                                __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$storageOf(TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$copy(edit)));
                            }
                            else {
                                __gotots_slice_build_5 = goSliceAllocate<TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_6));
                                for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                                    __gotots_slice_build_5.set(__gotots_slice_build_7, TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$storageOf(TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$copy(TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_7)))));
                                }
                                __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$storageOf(TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$copy(edit)));
                                for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                                    __gotots_slice_build_5.$initialize(__gotots_slice_build_7, TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$storageOf(TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$zero()));
                                }
                            }
                            deduped = __gotots_slice_build_5;
                        }
                        if (deduped.length > 0) {
                            const __gotots_slice_build_8 = documentChanges;
                            const __gotots_slice_build_10 = __gotots_slice_build_8.length + 1;
                            let __gotots_slice_build_9 = __gotots_slice_build_8;
                            if (__gotots_slice_build_10 <= __gotots_slice_build_8.capacity) {
                                __gotots_slice_build_9 = __gotots_slice_build_8.$withLength(__gotots_slice_build_10);
                                __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, (void TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf, (void TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$fromStorage,
                                    {
                                        TextDocumentEdit: { value: new TextDocumentEdit__from_lsproto(OptionalVersionedTextDocumentIdentifier__from_lsproto.$copy((TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).TextDocumentEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TextDocument), deduped) },
                                        CreateFile: void 0,
                                        RenameFile: void 0,
                                        DeleteFile: void 0
                                    })));
                            }
                            else {
                                __gotots_slice_build_9 = goSliceAllocate<TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto$Storage>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_8.capacity, __gotots_slice_build_10));
                                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                                    __gotots_slice_build_9.set(__gotots_slice_build_11, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$fromStorage(__gotots_slice_build_8.get(__gotots_slice_build_11)))));
                                }
                                __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, (void TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf, (void TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$fromStorage,
                                    {
                                        TextDocumentEdit: { value: new TextDocumentEdit__from_lsproto(OptionalVersionedTextDocumentIdentifier__from_lsproto.$copy((TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).TextDocumentEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TextDocument), deduped) },
                                        CreateFile: void 0,
                                        RenameFile: void 0,
                                        DeleteFile: void 0
                                    })));
                                for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                                    __gotots_slice_build_9.$initialize(__gotots_slice_build_11, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$zero()));
                                }
                            }
                            documentChanges = __gotots_slice_build_9;
                        }
                    }
                }
            }
        }
        if (sendRenameFile) {
            const __gotots_range_6 = ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RenameFilesParams__from_lsproto>).value.Files;
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                const __gotots_range_value_7 = __gotots_range_6.get(__gotots_range_index_6);
                let file: {
                    value: FileRename__from_lsproto;
                } | undefined = __gotots_range_value_7;
                const __gotots_slice_build_12 = documentChanges;
                const __gotots_slice_build_14 = __gotots_slice_build_12.length + 1;
                let __gotots_slice_build_13 = __gotots_slice_build_12;
                if (__gotots_slice_build_14 <= __gotots_slice_build_12.capacity) {
                    __gotots_slice_build_13 = __gotots_slice_build_12.$withLength(__gotots_slice_build_14);
                    __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, (void TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf, (void TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$fromStorage,
                        {
                            RenameFile: { value: new RenameFile__from_lsproto(new StringLiteralRename__from_lsproto, void 0, new DocumentUri__from_lsproto((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OldUri), new DocumentUri__from_lsproto((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewUri), void 0) },
                            TextDocumentEdit: void 0,
                            CreateFile: void 0,
                            DeleteFile: void 0
                        })));
                }
                else {
                    __gotots_slice_build_13 = goSliceAllocate<TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto$Storage>(__gotots_slice_build_14, RuntimeSlice.$grownCapacity(__gotots_slice_build_12.capacity, __gotots_slice_build_14));
                    for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_12.length; __gotots_slice_build_15++) {
                        __gotots_slice_build_13.set(__gotots_slice_build_15, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$fromStorage(__gotots_slice_build_12.get(__gotots_slice_build_15)))));
                    }
                    __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, (void TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf, (void TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$fromStorage,
                        {
                            RenameFile: { value: new RenameFile__from_lsproto(new StringLiteralRename__from_lsproto, void 0, new DocumentUri__from_lsproto((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OldUri), new DocumentUri__from_lsproto((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewUri), void 0) },
                            TextDocumentEdit: void 0,
                            CreateFile: void 0,
                            DeleteFile: void 0
                        })));
                    for (let __gotots_slice_build_15 = __gotots_slice_build_14; __gotots_slice_build_15 < __gotots_slice_build_13.capacity; __gotots_slice_build_15++) {
                        __gotots_slice_build_13.$initialize(__gotots_slice_build_15, TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$zero()));
                    }
                }
                documentChanges = __gotots_slice_build_13;
            }
        }
        if (documentChanges.length === 0) {
            return [WorkspaceEditOrNull__from_lsproto.$fromStorage({
                    WorkspaceEdit: void 0
                }), void 0];
        }
        if (ClientSupportsDocumentChanges__from_ls(ctx)) {
            return [WorkspaceEditOrNull__from_lsproto.$fromStorage({
                    WorkspaceEdit: { value: new WorkspaceEdit__from_lsproto(void 0, documentChanges$location2, void 0) }
                }), void 0];
        }
        let changes: GoMapValue<DocumentUri__from_lsproto, RuntimeSlice<{
            value: TextEdit__from_lsproto;
        } | undefined>> = $goMap$MapOf_Named_lsproto$DocumentUri_To_SliceOf_PointerTo_Named_lsproto$TextEdit.make(0, []);
        const __gotots_range_7 = documentChanges;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
            const __gotots_range_value_8 = TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$copy(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$fromStorage(__gotots_range_7.get(__gotots_range_index_7)));
            let change = __gotots_range_value_8;
            if (!(TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).TextDocumentEdit === undefined)) {
                let uri = (TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).TextDocumentEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TextDocument.Uri;
                const __gotots_range_8: TextDocumentEdit__from_lsproto["Edits"] = (TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile__from_lsproto.$storageOf(change).TextDocumentEdit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Edits;
                for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
                    const __gotots_range_value_9 = TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$copy(TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$fromStorage(__gotots_range_8.get(__gotots_range_index_8)));
                    let edit = __gotots_range_value_9;
                    if (!(TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$storageOf(edit).TextEdit === undefined)) {
                        changes.store(uri, changes.lookup(uri).append(void 0, [TextEditOrAnnotatedTextEditOrSnippetTextEdit__from_lsproto.$storageOf(edit).TextEdit]));
                    }
                }
            }
        }
        return [WorkspaceEditOrNull__from_lsproto.$fromStorage({
                WorkspaceEdit: { value: new WorkspaceEdit__from_lsproto(tsonicTypeScriptRuntime.location<GoMapValue<DocumentUri__from_lsproto, RuntimeSlice<{
                        value: TextEdit__from_lsproto;
                    } | undefined>>>(changes), void 0, void 0) }
            }), void 0];
    }
    static $go$private$lsp$handleWorkspaceSymbol(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, params: tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto> | undefined, reqMsg: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let resp = SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto.$zero();
        let lsErr: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
        Session__from_project.WithSnapshotLoadingProjectTree((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, void 0, (snapshot: {
            value: Snapshot__from_project;
        } | undefined): void => {
            let __gotots_deferred_4: (($go$recovery: GoRecovery) => void) | undefined = undefined;
            let __gotots_panic_2: GoPanic | undefined = undefined;
            try {
                try {
                    __gotots_return_block_2: {
                        const __gotots_receiver_22 = s;
                        const __gotots_argument_68 = reqMsg;
                        __gotots_deferred_4 = ($go$recovery: GoRecovery): void => {
                            Server_recover$deferred($go$recovery, __gotots_receiver_22, __gotots_argument_68);
                        };
                        let programs = Map$PointerTo_Named_project$Project$PointerTo_Named_compiler$Program(ProjectCollection__from_project.Projects((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection), ($argument0: {
                            value: Project__from_project;
                        } | undefined): {
                            value: Program__from_compiler;
                        } | undefined => {
                            return Project__from_project.GetProgram($argument0);
                        });
                        const __gotots_results_39 = ProvideWorkspaceSymbols__from_ls(ctx, programs, Snapshot__from_project.Converters(snapshot), Snapshot__from_project.UserPreferences(snapshot), ((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<WorkspaceSymbolParams__from_lsproto>).value.Query);
                        resp = __gotots_results_39[0];
                        lsErr = __gotots_results_39[1];
                    }
                }
                catch (__gotots_caught_5) {
                    if (!(__gotots_caught_5 instanceof GoPanic)) {
                        throw __gotots_caught_5;
                    }
                    __gotots_panic_2 = __gotots_caught_5;
                }
            }
            finally {
                if (__gotots_deferred_4 !== undefined) {
                    const __gotots_recovery_2 = new GoRecovery(__gotots_panic_2);
                    try {
                        __gotots_deferred_4(__gotots_recovery_2);
                        if (__gotots_recovery_2.recovered()) {
                            __gotots_panic_2 = undefined;
                        }
                    }
                    catch (__gotots_caught_4) {
                        if (!(__gotots_caught_4 instanceof GoPanic)) {
                            throw __gotots_caught_4;
                        }
                        __gotots_panic_2 = __gotots_caught_4;
                    }
                }
            }
            if (__gotots_panic_2 !== undefined) {
                throw __gotots_panic_2;
            }
        });
        return [SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto.$copy(resp), lsErr];
    }
    static $go$private$lsp$read(s: {
        value: Server;
    } | undefined): [
        {
            value: Message__from_lsproto;
        } | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_receiver_7: Server["r"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.r;
        return goInterfaceNonNil<Reader>(__gotots_receiver_7).Read();
    }
    static $go$private$lsp$readLoop(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        for (;;) {
            {
                const __gotots_receiver_4 = ctx;
                let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<GoInterface>(__gotots_receiver_4).Err();
                if (!(err__shadow_1 === undefined)) {
                    return err__shadow_1;
                }
            }
            const __gotots_results_8 = Server.$go$private$lsp$read(s);
            let msg: {
                value: Message__from_lsproto;
            } | undefined = __gotots_results_8[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_8[1];
            if (!(err === undefined)) {
                const __gotots_argument_15 = err;
                const __gotots_argument_16 = new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidRequest$constant__from_lsproto());
                let __gotots_logical_result_2 = provider_error.ErrorsIsDirect(__gotots_argument_15, __gotots_argument_16, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is);
                if (!__gotots_logical_result_2) {
                    const __gotots_argument_17 = err;
                    const __gotots_argument_18 = new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidParams$constant__from_lsproto());
                    __gotots_logical_result_2 = provider_error.ErrorsIsDirect(__gotots_argument_17, __gotots_argument_18, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is);
                }
                if (__gotots_logical_result_2) {
                    let id: {
                        value: ID__from_jsonrpc;
                    } | undefined = void 0;
                    const __gotots_argument_19 = err;
                    const __gotots_argument_20 = new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidParams$constant__from_lsproto());
                    if (provider_error.ErrorsIsDirect(__gotots_argument_19, __gotots_argument_20, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                        if (!(msg === undefined) && (msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === MessageKindRequest$constant__from_jsonrpc().$value) {
                            id = (Message__from_lsproto.AsRequest(msg) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID;
                        }
                    }
                    {
                        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Server.$go$private$lsp$sendError(s, id, err);
                        if (!(err__shadow_1 === undefined)) {
                            return err__shadow_1;
                        }
                    }
                    continue;
                }
                return err;
            }
            if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initializeParams === undefined && (msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === MessageKindRequest$constant__from_jsonrpc().$value) {
                let req: {
                    value: RequestMessage__from_lsproto;
                } | undefined = Message__from_lsproto.AsRequest(msg);
                if ((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method.$value === MethodInitialize$constant__from_lsproto().$value) {
                    const __gotots_results_9 = Server.$go$private$lsp$handleInitialize(s, ctx, (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<InitializeParams__from_lsproto> | undefined => {
                        if (!$goInterfaceAdapter$PointerTo_Named_lsproto$InitializeParams.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Params), req);
                    let resp: {
                        value: InitializeResult__from_lsproto;
                    } | undefined = __gotots_results_9[0];
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_9[1];
                    if (!(err__shadow_1 === undefined)) {
                        return err__shadow_1;
                    }
                    {
                        let err__shadow_2: $goInterface$Interface_Method_Error_void_to_string | undefined = Server.$go$private$lsp$sendResult(s, (req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID, new $goInterfaceAdapter$PointerTo_Named_lsproto$InitializeResult(resp));
                        if (!(err__shadow_2 === undefined)) {
                            return err__shadow_2;
                        }
                    }
                }
                else {
                    {
                        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Server.$go$private$lsp$sendError(s, (req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID, new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeServerNotInitialized$constant__from_lsproto()));
                        if (!(err__shadow_1 === undefined)) {
                            return err__shadow_1;
                        }
                    }
                }
                continue;
            }
            if ((msg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind.$value === MessageKindResponse$constant__from_jsonrpc().$value) {
                let resp: tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto> | undefined = Message__from_lsproto.AsResponse(msg);
                sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingServerRequestsMu);
                {
                    const __gotots_results_10 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingServerRequests.lookupOk(ID__from_jsonrpc.$copy((((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto>).value.ID ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value));
                    let respChan: GoChannel<tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto> | undefined> | undefined = __gotots_results_10[0];
                    let ok = __gotots_results_10[1];
                    if (ok) {
                        GoChannel.send(respChan, resp);
                        GoChannel.close(respChan);
                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingServerRequests.delete(ID__from_jsonrpc.$copy((((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto>).value.ID ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value));
                    }
                }
                sync__from_gostdlib.Mutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingServerRequestsMu);
            }
            else {
                let req: {
                    value: RequestMessage__from_lsproto;
                } | undefined = Message__from_lsproto.AsRequest(msg);
                if ((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method.$value === MethodCancelRequest$constant__from_lsproto().$value) {
                    Server.$go$private$lsp$cancelRequest(s, IntegerOrString__from_lsproto.$copy((((($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<CancelParams__from_lsproto> | undefined => {
                        if (!$goInterfaceAdapter$PointerTo_Named_lsproto$CancelParams.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Params) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CancelParams__from_lsproto>).value.Id));
                }
                else {
                    {
                        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = dynamicQueue$Put$PointerTo_Named_lsproto$RequestMessage((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestQueue, ctx, req);
                        if (!(err__shadow_1 === undefined)) {
                            return err__shadow_1;
                        }
                    }
                }
            }
        }
    }
    static $go$private$lsp$recover(s: {
        value: Server;
    } | undefined, req: {
        value: RequestMessage__from_lsproto;
    } | undefined): void {
        {
            let r: $goInterface$Interface_void | undefined = undefined;
            if (!(r === undefined)) {
                let stack = debug__from_gostdlib.Stack();
                const __gotots_receiver_27: Server["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
                const __gotots_argument_72 = "panic handling request %s: %v\n%s";
                const __gotots_argument_69 = new $goInterfaceAdapter$Named_lsproto$Method((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method);
                const __gotots_argument_70 = r;
                const __gotots_conversion_3 = stack;
                let __gotots_conversion_4 = "";
                for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                    __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
                }
                const __gotots_argument_71 = new GoInterfaceAdapter(__gotots_conversion_4);
                const __gotots_argument_73 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_69, __gotots_argument_70, __gotots_argument_71]);
                logger.Errorf(__gotots_receiver_27, __gotots_argument_72, __gotots_argument_73);
                if (!((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID === undefined)) {
                    Server.$go$private$lsp$sendError(s, (req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: panic handling request %s: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInternalError$constant__from_lsproto()), new $goInterfaceAdapter$Named_lsproto$Method((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method), r]))));
                }
                else {
                    logger.Error((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("unhandled panic in notification"), new $goInterfaceAdapter$Named_lsproto$Method((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method), r]));
                }
                if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.telemetryEnabled) {
                    const __gotots_argument_75 = s;
                    const __gotots_argument_76 = NotificationInfo__from_lsproto.$copy<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto>(NotificationInfo__from_lsproto.$fromStorage<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto>($state__lsproto.TelemetryEventInfo));
                    const __gotots_field_5 = ErrorCode_String__from_lsproto(ErrorCodeInternalError$constant__from_lsproto());
                    const __gotots_field_6 = strings__from_gostdlib.ReplaceAll((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method.$value, "/", ".");
                    const __gotots_conversion_6 = stack;
                    let __gotots_conversion_7 = "";
                    for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
                        __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
                    }
                    const __gotots_argument_74 = __gotots_conversion_7;
                    const __gotots_field_7 = sanitizeStackTrace(__gotots_argument_74);
                    const __gotots_field_8 = { value: new RequestFailureTelemetryProperties__from_lsproto(__gotots_field_5, __gotots_field_6, __gotots_field_7) };
                    const __gotots_field_9 = { value: new RequestFailureTelemetryEvent__from_lsproto(StringLiteralLanguageServerErrorResponse__from_lsproto.$zero(), StringLiteralError__from_lsproto.$zero(), __gotots_field_8) };
                    const __gotots_argument_77 = RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto.$fromStorage({
                        RequestFailureTelemetryEvent: __gotots_field_9,
                        PerformanceStatsTelemetryEvent: void 0,
                        ProjectInfoTelemetryEvent: void 0
                    });
                    sendNotification$Named_lsproto$RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull(__gotots_argument_75, __gotots_argument_76, __gotots_argument_77);
                }
            }
        }
    }
    static $go$private$lsp$removeAPISession(s: {
        value: Server;
    } | undefined, id: gostring): void {
        let __gotots_deferred_9: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_4: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_4: {
                    sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiSessionsMu);
                    const __gotots_receiver_29: Server["apiSessionsMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiSessionsMu;
                    __gotots_deferred_9 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_29, $go$recovery);
                    };
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.apiSessions.delete(id);
                }
            }
            catch (__gotots_caught_11) {
                if (!(__gotots_caught_11 instanceof GoPanic)) {
                    throw __gotots_caught_11;
                }
                __gotots_panic_4 = __gotots_caught_11;
            }
        }
        finally {
            if (__gotots_deferred_9 !== undefined) {
                const __gotots_recovery_6 = new GoRecovery(__gotots_panic_4);
                try {
                    __gotots_deferred_9(__gotots_recovery_6);
                    if (__gotots_recovery_6.recovered()) {
                        __gotots_panic_4 = undefined;
                    }
                }
                catch (__gotots_caught_10) {
                    if (!(__gotots_caught_10 instanceof GoPanic)) {
                        throw __gotots_caught_10;
                    }
                    __gotots_panic_4 = __gotots_caught_10;
                }
            }
        }
        if (__gotots_panic_4 !== undefined) {
            throw __gotots_panic_4;
        }
    }
    static $go$private$lsp$send(s: {
        value: Server;
    } | undefined, msg: {
        value: Message__from_lsproto;
    } | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        return dynamicQueue$Put$PointerTo_Named_lsproto$Message((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.outgoingQueue, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx, msg);
    }
    static $go$private$lsp$sendError(s: {
        value: Server;
    } | undefined, id: {
        value: ID__from_jsonrpc;
    } | undefined, err: $goInterface$Interface_Method_Error_void_to_string | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let __gotots_logical_result_3 = id === undefined;
        if (__gotots_logical_result_3) {
            const __gotots_argument_21 = err;
            const __gotots_argument_22 = new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInvalidRequest$constant__from_lsproto());
            __gotots_logical_result_3 = !provider_error.ErrorsIsDirect(__gotots_argument_21, __gotots_argument_22, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is);
        }
        if (__gotots_logical_result_3) {
            logger.Errorf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, "error handling notification: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err]));
            return void 0;
        }
        let code = ErrorCodeInternalError$constant__from_lsproto();
        {
            const __gotots_results_11 = AsType$Named_lsproto$ErrorCode(err);
            let errCode = __gotots_results_11[0];
            let ok = __gotots_results_11[1];
            if (ok) {
                code = errCode;
            }
        }
        const __gotots_receiver_6 = s;
        const __gotots_field_2 = id;
        const __gotots_field_0 = code;
        const __gotots_receiver_5 = err;
        const __gotots_field_1 = goInterfaceNonNil<$goInterface$Interface_Method_Error_void_to_string>(__gotots_receiver_5).Error();
        const __gotots_field_3 = { value: new ResponseError__from_jsonrpc(__gotots_field_0, __gotots_field_1, void 0) };
        const __gotots_argument_23 = tsonicTypeScriptRuntime.location<ResponseMessage__from_lsproto>(new ResponseMessage__from_lsproto(JSONRPCVersion__from_jsonrpc.$zero(), __gotots_field_2, void 0, __gotots_field_3));
        return Server.$go$private$lsp$sendResponse(__gotots_receiver_6, __gotots_argument_23);
    }
    static $go$private$lsp$sendResponse(s: {
        value: Server;
    } | undefined, resp: tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        return Server.$go$private$lsp$send(s, ResponseMessage__from_lsproto.Message(resp));
    }
    static $go$private$lsp$sendResult(s: {
        value: Server;
    } | undefined, id: {
        value: ID__from_jsonrpc;
    } | undefined, result: $goInterface$Interface_void | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        return Server.$go$private$lsp$sendResponse(s, tsonicTypeScriptRuntime.location<ResponseMessage__from_lsproto>(new ResponseMessage__from_lsproto(JSONRPCVersion__from_jsonrpc.$zero(), id, result, void 0)));
    }
    static $go$private$lsp$writeLoop(s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        for (;;) {
            const __gotots_results_7 = dynamicQueue$Get$PointerTo_Named_lsproto$Message((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.outgoingQueue, ctx);
            let msg: {
                value: Message__from_lsproto;
            } | undefined = __gotots_results_7[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_7[1];
            if (!(err === undefined)) {
                return err;
            }
            {
                const __gotots_receiver_3: Server["w"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.w;
                const __gotots_argument_14 = msg;
                let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<Writer>(__gotots_receiver_3).Write(__gotots_argument_14);
                if (!(err__shadow_1 === undefined)) {
                    return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to write message: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err__shadow_1])));
                }
            }
        }
    }
}
export function sendClientRequest$kernel<Req, Resp>($go$copy$T1_to_T1: ($0: Resp) => Resp, $go$interface_adapt$T0_to_Interface_void: ($0: Req) => $goInterface$Interface_void | undefined, $go$interface_assert_ok$Interface_void_to_T1_bool: ($0: $goInterface$Interface_void | undefined) => [
    Resp,
    bool
], $go$interface_assert$Interface_void_to_T1: ($0: $goInterface$Interface_void | undefined) => Resp, $go$zero$void_to_T1: () => Resp, ctx: GoInterface | undefined, s: {
    value: Server;
} | undefined, info: RequestInfo__from_lsproto<Req, Resp>, params: Req): [
    Resp,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let __gotots_deferred_4: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_2: GoPanic | undefined = undefined;
    let __gotots_return_1: [
        Resp,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] = [$go$zero$void_to_T1(), void 0];
    try {
        try {
            __gotots_return_block_2: {
                let id: {
                    value: ID__from_jsonrpc;
                } | undefined = NewIDString__from_jsonrpc(fmt__from_gostdlib.Sprintf("ts%d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int32(atomic__from_gostdlib.Int32.Add((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.clientSeq, 1))])));
                let req: {
                    value: RequestMessage__from_lsproto;
                } | undefined = info.NewRequestMessage$kernel($go$interface_adapt$T0_to_Interface_void, id, params);
                let responseChan: GoChannel<tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto> | undefined> | undefined = GoChannel.make<tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto> | undefined>(1, (): tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto> | undefined => {
                    return void 0;
                }, (value: tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto> | undefined): tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto> | undefined => {
                    return value;
                });
                sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingServerRequestsMu);
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingServerRequests.store(ID__from_jsonrpc.$copy((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value), responseChan);
                sync__from_gostdlib.Mutex.Unlock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingServerRequestsMu);
                const __gotots_callee_23 = (): void => {
                    let __gotots_deferred_5: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                    let __gotots_panic_3: GoPanic | undefined = undefined;
                    try {
                        try {
                            __gotots_return_block_3: {
                                sync__from_gostdlib.Mutex.Lock((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingServerRequestsMu);
                                const __gotots_receiver_24: Server["pendingServerRequestsMu"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingServerRequestsMu;
                                __gotots_deferred_5 = ($go$recovery: GoRecovery): void => {
                                    recovery_sync.SyncMutexUnlock(__gotots_receiver_24, $go$recovery);
                                };
                                {
                                    const __gotots_results_53 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingServerRequests.lookupOk(ID__from_jsonrpc.$copy((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value));
                                    let respChan: GoChannel<tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto> | undefined> | undefined = __gotots_results_53[0];
                                    let ok = __gotots_results_53[1];
                                    if (ok) {
                                        GoChannel.close(respChan);
                                        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingServerRequests.delete(ID__from_jsonrpc.$copy((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value));
                                    }
                                }
                            }
                        }
                        catch (__gotots_caught_7) {
                            if (!(__gotots_caught_7 instanceof GoPanic)) {
                                throw __gotots_caught_7;
                            }
                            __gotots_panic_3 = __gotots_caught_7;
                        }
                    }
                    finally {
                        if (__gotots_deferred_5 !== undefined) {
                            const __gotots_recovery_3 = new GoRecovery(__gotots_panic_3);
                            try {
                                __gotots_deferred_5(__gotots_recovery_3);
                                if (__gotots_recovery_3.recovered()) {
                                    __gotots_panic_3 = undefined;
                                }
                            }
                            catch (__gotots_caught_6) {
                                if (!(__gotots_caught_6 instanceof GoPanic)) {
                                    throw __gotots_caught_6;
                                }
                                __gotots_panic_3 = __gotots_caught_6;
                            }
                        }
                    }
                    if (__gotots_panic_3 !== undefined) {
                        throw __gotots_panic_3;
                    }
                };
                __gotots_deferred_4 = ($go$recovery: GoRecovery): void => {
                    __gotots_callee_23();
                };
                {
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Server.$go$private$lsp$send(s, RequestMessage__from_lsproto.Message(req));
                    if (!(err === undefined)) {
                        __gotots_return_1 = [$go$copy$T1_to_T1($go$zero$void_to_T1()), err];
                        break __gotots_return_block_2;
                    }
                }
                const __gotots_receiver_25 = ctx;
                const __gotots_channel_2 = goInterfaceNonNil<GoInterface>(__gotots_receiver_25).Done();
                const __gotots_channel_3 = (value: GoEmptyStruct, ok: boolean): void => {
                    __gotots_receive_2 = [value, ok];
                };
                let __gotots_receive_2: [
                    GoEmptyStruct,
                    boolean
                ] | undefined = undefined;
                const __gotots_select_2 = GoChannel.$selectReceive(__gotots_channel_2, __gotots_channel_3);
                let __gotots_receive_3: [
                    tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto> | undefined,
                    boolean
                ] | undefined = undefined;
                const __gotots_select_3 = GoChannel.$selectReceive(responseChan, (value: tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto> | undefined, ok: boolean): void => {
                    __gotots_receive_3 = [value, ok];
                });
                const __gotots_switch_selection_1 = goSelect([__gotots_select_2, __gotots_select_3]);
                switch (__gotots_switch_selection_1) {
                    case 0: {
                        const __gotots_results_54 = $go$copy$T1_to_T1($go$zero$void_to_T1());
                        const __gotots_receiver_26 = ctx;
                        const __gotots_results_55 = goInterfaceNonNil<GoInterface>(__gotots_receiver_26).Err();
                        __gotots_return_1 = [__gotots_results_54, __gotots_results_55];
                        break __gotots_return_block_2;
                        break;
                    }
                    case 1: {
                        if (__gotots_receive_3 === undefined) {
                            GoPanic.raiseRuntime("selected receive has no result");
                        }
                        let resp: tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto> | undefined = __gotots_receive_3[0];
                        if (!(((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto>).value.Error === undefined)) {
                            __gotots_return_1 = [$go$copy$T1_to_T1($go$zero$void_to_T1()), GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("request failed: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(ResponseError__from_jsonrpc.String(((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto>).value.Error))])))];
                            break __gotots_return_block_2;
                        }
                        __gotots_return_1 = info.UnmarshalResult$kernel($go$copy$T1_to_T1, $go$interface_assert_ok$Interface_void_to_T1_bool, $go$interface_assert$Interface_void_to_T1, $go$zero$void_to_T1, ((resp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResponseMessage__from_lsproto>).value.Result);
                        break __gotots_return_block_2;
                        break;
                    }
                    default: GoPanic.raiseRuntime("select returned an invalid case");
                }
            }
        }
        catch (__gotots_caught_5) {
            if (!(__gotots_caught_5 instanceof GoPanic)) {
                throw __gotots_caught_5;
            }
            __gotots_panic_2 = __gotots_caught_5;
        }
    }
    finally {
        if (__gotots_deferred_4 !== undefined) {
            const __gotots_recovery_2 = new GoRecovery(__gotots_panic_2);
            try {
                __gotots_deferred_4(__gotots_recovery_2);
                if (__gotots_recovery_2.recovered()) {
                    __gotots_panic_2 = undefined;
                }
            }
            catch (__gotots_caught_4) {
                if (!(__gotots_caught_4 instanceof GoPanic)) {
                    throw __gotots_caught_4;
                }
                __gotots_panic_2 = __gotots_caught_4;
            }
        }
    }
    if (__gotots_panic_2 !== undefined) {
        throw __gotots_panic_2;
    }
    return __gotots_return_1;
}
export function sendClientRequestFireAndForget$kernel<Req, Resp>($go$copy$T0_to_T0: ($0: Req) => Req, $go$interface_adapt$T0_to_Interface_void: ($0: Req) => $goInterface$Interface_void | undefined, s: {
    value: Server;
} | undefined, info: RequestInfo__from_lsproto<Req, Resp>, params: Req): $goInterface$Interface_Method_Error_void_to_string | undefined {
    let id: {
        value: ID__from_jsonrpc;
    } | undefined = NewIDString__from_jsonrpc(fmt__from_gostdlib.Sprintf("ts%d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int32(atomic__from_gostdlib.Int32.Add((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.clientSeq, 1))])));
    let req: {
        value: RequestMessage__from_lsproto;
    } | undefined = info.NewRequestMessage$kernel($go$interface_adapt$T0_to_Interface_void, id, $go$copy$T0_to_T0(params));
    return Server.$go$private$lsp$send(s, RequestMessage__from_lsproto.Message(req));
}
export class userFacingRequestFailedError {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
    Error(): gostring {
        return this.$value;
    }
    Unwrap(): $goInterface$Interface_Method_Error_void_to_string | undefined {
        return new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeRequestFailed$constant__from_lsproto());
    }
}
export function sendNotification$kernel<Params>($go$copy$T0_to_T0: ($0: Params) => Params, $go$interface_adapt$T0_to_Interface_void: ($0: Params) => $goInterface$Interface_void | undefined, s: {
    value: Server;
} | undefined, info: NotificationInfo__from_lsproto<Params>, params: Params): $goInterface$Interface_Method_Error_void_to_string | undefined {
    return Server.$go$private$lsp$send(s, RequestMessage__from_lsproto.Message(info.NewNotificationMessage$kernel($go$interface_adapt$T0_to_Interface_void, $go$copy$T0_to_T0(params))));
}
export class handlerMap {
    declare private readonly $goType: void;
    constructor(public readonly $value: GoMapValue<Method__from_lsproto, (($0: {
        value: Server;
    } | undefined, $1: GoInterface | undefined, $2: {
        value: RequestMessage__from_lsproto;
    } | undefined) => [
        (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ]) | undefined>) {
    }
    declare private readonly then?: never;
}
export function registerNotificationHandler$kernel<Req>($go$copy$T0_to_T0: ($0: Req) => Req, $go$interface_assert$Interface_void_to_T0: ($0: $goInterface$Interface_void | undefined) => Req, $go$zero$void_to_T0: () => Req, handlers__shadow_1: handlerMap, info: NotificationInfo__from_lsproto<Req>, fn: (($0: {
    value: Server;
} | undefined, $1: GoInterface | undefined, $2: Req) => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): void {
    handlers__shadow_1.$value.store(new Method__from_lsproto(NotificationInfo__from_lsproto.$storageOf(info).Method), (s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, req: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] => {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session === undefined && !((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method.$value === MethodInitialized$constant__from_lsproto().$value)) {
            return [void 0, new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeServerNotInitialized$constant__from_lsproto())];
        }
        let params: Req = $go$zero$void_to_T0();
        if (!((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Params === undefined)) {
            params = $go$copy$T0_to_T0($go$interface_assert$Interface_void_to_T0((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Params));
        }
        {
            const __gotots_callee_17 = fn;
            const __gotots_argument_41 = s;
            const __gotots_argument_42 = ctx;
            const __gotots_argument_43 = $go$copy$T0_to_T0(params);
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_41, __gotots_argument_42, __gotots_argument_43);
            if (!(err === undefined)) {
                return [void 0, err];
            }
        }
        const __gotots_results_23 = void 0;
        const __gotots_receiver_12 = ctx;
        const __gotots_results_24 = goInterfaceNonNil<GoInterface>(__gotots_receiver_12).Err();
        return [__gotots_results_23, __gotots_results_24];
    });
}
export function registerRequestHandler$kernel<Req, Resp>($go$copy$T0_to_T0: ($0: Req) => Req, $go$copy$T1_to_T1: ($0: Resp) => Resp, $go$interface_adapt$T1_to_Interface_void: ($0: Resp) => $goInterface$Interface_void | undefined, $go$interface_assert$Interface_void_to_T0: ($0: $goInterface$Interface_void | undefined) => Req, $go$zero$void_to_T0: () => Req, handlers__shadow_1: handlerMap, info: RequestInfo__from_lsproto<Req, Resp>, fn: (($0: {
    value: Server;
} | undefined, $1: GoInterface | undefined, $2: Req, $3: {
    value: RequestMessage__from_lsproto;
} | undefined) => [
    Resp,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    handlers__shadow_1.$value.store(new Method__from_lsproto(RequestInfo__from_lsproto.$storageOf(info).Method), (s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, req: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] => {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session === undefined && !((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method.$value === MethodInitialize$constant__from_lsproto().$value)) {
            return [void 0, new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeServerNotInitialized$constant__from_lsproto())];
        }
        let params: Req = $go$zero$void_to_T0();
        if (!((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Params === undefined)) {
            params = $go$copy$T0_to_T0($go$interface_assert$Interface_void_to_T0((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Params));
        }
        const __gotots_callee_16 = fn;
        const __gotots_argument_37 = s;
        const __gotots_argument_38 = ctx;
        const __gotots_argument_39 = $go$copy$T0_to_T0(params);
        const __gotots_argument_40 = req;
        const __gotots_results_20 = (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_37, __gotots_argument_38, __gotots_argument_39, __gotots_argument_40);
        let resp: Resp = $go$copy$T1_to_T1(__gotots_results_20[0]);
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_20[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        const __gotots_receiver_10 = ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_10).Err() === undefined)) {
            const __gotots_results_21 = void 0;
            const __gotots_receiver_11 = ctx;
            const __gotots_results_22 = goInterfaceNonNil<GoInterface>(__gotots_receiver_11).Err();
            return [__gotots_results_21, __gotots_results_22];
        }
        return [void 0, Server.$go$private$lsp$sendResult(s, (req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID, $go$interface_adapt$T1_to_Interface_void(resp))];
    });
}
export function registerLanguageServiceDocumentRequestHandler$kernel<Req, Resp>($go$constraint_method$lsproto$TextDocumentURI$T0_to_Named_lsproto$DocumentUri: ($0: Req) => DocumentUri__from_lsproto, $go$copy$T1_to_T1: ($0: Resp) => Resp, $go$interface_adapt$T1_to_Interface_void: ($0: Resp) => $goInterface$Interface_void | undefined, $go$interface_assert$Interface_void_to_T0: ($0: $goInterface$Interface_void | undefined) => Req, $go$zero$void_to_T0: () => Req, handlers__shadow_1: handlerMap, info: RequestInfo__from_lsproto<Req, Resp>, fn: (($0: {
    value: Server;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: Req) => [
    Resp,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    handlers__shadow_1.$value.store(new Method__from_lsproto(RequestInfo__from_lsproto.$storageOf(info).Method), (s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, req: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] => {
        let params: Req = $go$zero$void_to_T0();
        if (!((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Params === undefined)) {
            params = $go$interface_assert$Interface_void_to_T0((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Params);
        }
        const __gotots_results_25 = Session__from_project.GetLanguageService((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, $go$constraint_method$lsproto$TextDocumentURI$T0_to_Named_lsproto$DocumentUri(params));
        let ls__shadow_1: LanguageService__from_ls | undefined = __gotots_results_25[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_25[1];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        return [(): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                let __gotots_deferred_4: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                let __gotots_panic_2: GoPanic | undefined = undefined;
                let __gotots_return_1: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
                try {
                    try {
                        __gotots_return_block_2: {
                            const __gotots_receiver_13 = s;
                            const __gotots_argument_44 = req;
                            __gotots_deferred_4 = ($go$recovery: GoRecovery): void => {
                                Server_recover$deferred($go$recovery, __gotots_receiver_13, __gotots_argument_44);
                            };
                            const __gotots_callee_18 = fn;
                            const __gotots_argument_45 = s;
                            const __gotots_argument_46 = ctx;
                            const __gotots_argument_47 = ls__shadow_1;
                            const __gotots_argument_48 = params;
                            const __gotots_results_26 = (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_45, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48);
                            let resp: Resp = $go$copy$T1_to_T1(__gotots_results_26[0]);
                            let lsErr: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_26[1];
                            Session__from_project.EnqueuePublishGlobalDiagnostics((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session);
                            if (!(lsErr === undefined)) {
                                __gotots_return_1 = lsErr;
                                break __gotots_return_block_2;
                            }
                            const __gotots_receiver_14 = ctx;
                            if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_14).Err() === undefined)) {
                                const __gotots_receiver_15 = ctx;
                                __gotots_return_1 = goInterfaceNonNil<GoInterface>(__gotots_receiver_15).Err();
                                break __gotots_return_block_2;
                            }
                            __gotots_return_1 = Server.$go$private$lsp$sendResult(s, (req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID, $go$interface_adapt$T1_to_Interface_void(resp));
                            break __gotots_return_block_2;
                        }
                    }
                    catch (__gotots_caught_5) {
                        if (!(__gotots_caught_5 instanceof GoPanic)) {
                            throw __gotots_caught_5;
                        }
                        __gotots_panic_2 = __gotots_caught_5;
                    }
                }
                finally {
                    if (__gotots_deferred_4 !== undefined) {
                        const __gotots_recovery_2 = new GoRecovery(__gotots_panic_2);
                        try {
                            __gotots_deferred_4(__gotots_recovery_2);
                            if (__gotots_recovery_2.recovered()) {
                                __gotots_panic_2 = undefined;
                            }
                        }
                        catch (__gotots_caught_4) {
                            if (!(__gotots_caught_4 instanceof GoPanic)) {
                                throw __gotots_caught_4;
                            }
                            __gotots_panic_2 = __gotots_caught_4;
                        }
                    }
                }
                if (__gotots_panic_2 !== undefined) {
                    throw __gotots_panic_2;
                }
                return __gotots_return_1;
            }, void 0];
    });
}
export function registerLanguageServiceWithAutoImportsRequestHandler$kernel<Req, Resp>($go$constraint_method$lsproto$TextDocumentURI$T0_to_Named_lsproto$DocumentUri: ($0: Req) => DocumentUri__from_lsproto, $go$copy$T1_to_T1: ($0: Resp) => Resp, $go$interface_adapt$T1_to_Interface_void: ($0: Resp) => $goInterface$Interface_void | undefined, $go$interface_assert$Interface_void_to_T0: ($0: $goInterface$Interface_void | undefined) => Req, $go$zero$void_to_T0: () => Req, handlers__shadow_1: handlerMap, info: RequestInfo__from_lsproto<Req, Resp>, fn: (($0: {
    value: Server;
} | undefined, $1: GoInterface | undefined, $2: LanguageService__from_ls | undefined, $3: Req) => [
    Resp,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    handlers__shadow_1.$value.store(new Method__from_lsproto(RequestInfo__from_lsproto.$storageOf(info).Method), (s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, req: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] => {
        let params: Req = $go$zero$void_to_T0();
        if (!((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Params === undefined)) {
            params = $go$interface_assert$Interface_void_to_T0((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Params);
        }
        return Session__from_project.WithLanguageServiceAndSnapshot((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, $go$constraint_method$lsproto$TextDocumentURI$T0_to_Named_lsproto$DocumentUri(params), (languageService: LanguageService__from_ls | undefined, snapshot: {
            value: Snapshot__from_project;
        } | undefined): [
            (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] => {
            return [(): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                    let __gotots_deferred_4: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                    let __gotots_panic_2: GoPanic | undefined = undefined;
                    let __gotots_return_1: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
                    try {
                        try {
                            __gotots_return_block_2: {
                                const __gotots_receiver_15 = s;
                                const __gotots_argument_48 = req;
                                __gotots_deferred_4 = ($go$recovery: GoRecovery): void => {
                                    Server_recover$deferred($go$recovery, __gotots_receiver_15, __gotots_argument_48);
                                };
                                const __gotots_callee_19 = fn;
                                const __gotots_argument_49 = s;
                                const __gotots_argument_50 = ctx;
                                const __gotots_argument_51 = languageService;
                                const __gotots_argument_52 = params;
                                const __gotots_results_27 = (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_49, __gotots_argument_50, __gotots_argument_51, __gotots_argument_52);
                                let resp: Resp = $go$copy$T1_to_T1(__gotots_results_27[0]);
                                let lsErr: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_27[1];
                                const __gotots_argument_53 = lsErr;
                                const __gotots_argument_54 = $state__ls.ErrNeedsAutoImports;
                                if (provider_error.ErrorsIsDirect(__gotots_argument_53, __gotots_argument_54, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                                    const __gotots_results_28 = Session__from_project.GetLanguageServiceWithAutoImports((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, snapshot, $go$constraint_method$lsproto$TextDocumentURI$T0_to_Named_lsproto$DocumentUri(params));
                                    languageService = __gotots_results_28[0];
                                    lsErr = __gotots_results_28[1];
                                    if (!(lsErr === undefined)) {
                                        __gotots_return_1 = lsErr;
                                        break __gotots_return_block_2;
                                    }
                                    const __gotots_receiver_16 = ctx;
                                    if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_16).Err() === undefined)) {
                                        const __gotots_receiver_17 = ctx;
                                        __gotots_return_1 = goInterfaceNonNil<GoInterface>(__gotots_receiver_17).Err();
                                        break __gotots_return_block_2;
                                    }
                                    const __gotots_callee_20 = fn;
                                    const __gotots_argument_55 = s;
                                    const __gotots_argument_56 = ctx;
                                    const __gotots_argument_57 = languageService;
                                    const __gotots_argument_58 = params;
                                    const __gotots_results_29 = (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_55, __gotots_argument_56, __gotots_argument_57, __gotots_argument_58);
                                    resp = $go$copy$T1_to_T1(__gotots_results_29[0]);
                                    lsErr = __gotots_results_29[1];
                                    const __gotots_argument_59 = lsErr;
                                    const __gotots_argument_60 = $state__ls.ErrNeedsAutoImports;
                                    if (provider_error.ErrorsIsDirect(__gotots_argument_59, __gotots_argument_60, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                                        const __gotots_argument_61 = new $goInterfaceAdapter$Named_lsproto$Method(new Method__from_lsproto(((void Method__from_lsproto,
                                            RequestInfo__from_lsproto.$storageOf(info).Method) as string)
                                            + " returned ErrNeedsAutoImports even after enabling auto imports"));
                                        GoPanic.raise(__gotots_argument_61 === undefined ? GoPanicNilValue.create() : __gotots_argument_61);
                                    }
                                }
                                if (!(lsErr === undefined)) {
                                    __gotots_return_1 = lsErr;
                                    break __gotots_return_block_2;
                                }
                                const __gotots_receiver_18 = ctx;
                                if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_18).Err() === undefined)) {
                                    const __gotots_receiver_19 = ctx;
                                    __gotots_return_1 = goInterfaceNonNil<GoInterface>(__gotots_receiver_19).Err();
                                    break __gotots_return_block_2;
                                }
                                __gotots_return_1 = Server.$go$private$lsp$sendResult(s, (req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID, $go$interface_adapt$T1_to_Interface_void(resp));
                                break __gotots_return_block_2;
                            }
                        }
                        catch (__gotots_caught_5) {
                            if (!(__gotots_caught_5 instanceof GoPanic)) {
                                throw __gotots_caught_5;
                            }
                            __gotots_panic_2 = __gotots_caught_5;
                        }
                    }
                    finally {
                        if (__gotots_deferred_4 !== undefined) {
                            const __gotots_recovery_2 = new GoRecovery(__gotots_panic_2);
                            try {
                                __gotots_deferred_4(__gotots_recovery_2);
                                if (__gotots_recovery_2.recovered()) {
                                    __gotots_panic_2 = undefined;
                                }
                            }
                            catch (__gotots_caught_4) {
                                if (!(__gotots_caught_4 instanceof GoPanic)) {
                                    throw __gotots_caught_4;
                                }
                                __gotots_panic_2 = __gotots_caught_4;
                            }
                        }
                    }
                    if (__gotots_panic_2 !== undefined) {
                        throw __gotots_panic_2;
                    }
                    return __gotots_return_1;
                }, void 0];
        });
    });
}
export function registerMultiProjectReferenceRequestHandler$kernel<Req, Resp>($go$constraint_method$lsproto$TextDocumentURI$T0_to_Named_lsproto$DocumentUri: ($0: Req) => DocumentUri__from_lsproto, $go$copy$T1_to_T1: ($0: Resp) => Resp, $go$interface_adapt$T1_to_Interface_void: ($0: Resp) => $goInterface$Interface_void | undefined, $go$interface_assert$Interface_void_to_T0: ($0: $goInterface$Interface_void | undefined) => Req, $go$zero$void_to_T0: () => Req, handlers__shadow_1: handlerMap, info: RequestInfo__from_lsproto<Req, Resp>, fn: (($0: LanguageService__from_ls | undefined, $1: GoInterface | undefined, $2: Req, $3: CrossProjectOrchestrator__from_ls | undefined) => [
    Resp,
    $goInterface$Interface_Method_Error_void_to_string | undefined
]) | undefined): void {
    handlers__shadow_1.$value.store(new Method__from_lsproto(RequestInfo__from_lsproto.$storageOf(info).Method), (s: {
        value: Server;
    } | undefined, ctx: GoInterface | undefined, req: {
        value: RequestMessage__from_lsproto;
    } | undefined): [
        (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] => {
        let params: Req = $go$zero$void_to_T0();
        if (!((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Params === undefined)) {
            params = $go$interface_assert$Interface_void_to_T0((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Params);
        }
        const __gotots_results_30 = Server.$go$private$lsp$getLanguageServiceAndCrossProjectOrchestrator(s, ctx, $go$constraint_method$lsproto$TextDocumentURI$T0_to_Named_lsproto$DocumentUri(params), req);
        let defaultLs: LanguageService__from_ls | undefined = __gotots_results_30[0];
        let orchestrator: CrossProjectOrchestrator__from_ls | undefined = __gotots_results_30[1];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_30[2];
        if (!(err === undefined)) {
            return [void 0, err];
        }
        return [(): $goInterface$Interface_Method_Error_void_to_string | undefined => {
                let __gotots_deferred_4: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                let __gotots_panic_2: GoPanic | undefined = undefined;
                let __gotots_return_1: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
                try {
                    try {
                        __gotots_return_block_2: {
                            const __gotots_receiver_19 = s;
                            const __gotots_argument_61 = req;
                            __gotots_deferred_4 = ($go$recovery: GoRecovery): void => {
                                Server_recover$deferred($go$recovery, __gotots_receiver_19, __gotots_argument_61);
                            };
                            const __gotots_callee_21 = fn;
                            const __gotots_argument_62 = defaultLs;
                            const __gotots_argument_63 = ctx;
                            const __gotots_argument_64 = params;
                            const __gotots_argument_65 = orchestrator;
                            const __gotots_results_31 = (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_62, __gotots_argument_63, __gotots_argument_64, __gotots_argument_65);
                            let resp: Resp = $go$copy$T1_to_T1(__gotots_results_31[0]);
                            let lsErr: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_31[1];
                            if (!(lsErr === undefined)) {
                                __gotots_return_1 = lsErr;
                                break __gotots_return_block_2;
                            }
                            const __gotots_receiver_20 = ctx;
                            if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_20).Err() === undefined)) {
                                const __gotots_receiver_21 = ctx;
                                __gotots_return_1 = goInterfaceNonNil<GoInterface>(__gotots_receiver_21).Err();
                                break __gotots_return_block_2;
                            }
                            __gotots_return_1 = Server.$go$private$lsp$sendResult(s, (req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID, $go$interface_adapt$T1_to_Interface_void(resp));
                            break __gotots_return_block_2;
                        }
                    }
                    catch (__gotots_caught_5) {
                        if (!(__gotots_caught_5 instanceof GoPanic)) {
                            throw __gotots_caught_5;
                        }
                        __gotots_panic_2 = __gotots_caught_5;
                    }
                }
                finally {
                    if (__gotots_deferred_4 !== undefined) {
                        const __gotots_recovery_2 = new GoRecovery(__gotots_panic_2);
                        try {
                            __gotots_deferred_4(__gotots_recovery_2);
                            if (__gotots_recovery_2.recovered()) {
                                __gotots_panic_2 = undefined;
                            }
                        }
                        catch (__gotots_caught_4) {
                            if (!(__gotots_caught_4 instanceof GoPanic)) {
                                throw __gotots_caught_4;
                            }
                            __gotots_panic_2 = __gotots_caught_4;
                        }
                    }
                }
                if (__gotots_panic_2 !== undefined) {
                    throw __gotots_panic_2;
                }
                return __gotots_return_1;
            }, void 0];
    });
}
export class crossProjectOrchestrator {
    declare private readonly $goType: void;
    public constructor(public server: {
        value: Server;
    } | undefined, public req: {
        value: RequestMessage__from_lsproto;
    } | undefined, public defaultProject: {
        value: Project__from_project;
    } | undefined, public allProjects: RuntimeSlice<Project__from_ls | undefined>) {
    }
    declare private readonly then?: never;
    static GetAllProjectsForInitialRequest(c: crossProjectOrchestrator | undefined): RuntimeSlice<Project__from_ls | undefined> {
        return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).allProjects;
    }
    static GetDefaultProject(c: crossProjectOrchestrator | undefined): Project__from_ls | undefined {
        return new $goInterfaceAdapter$PointerTo_Named_project$Project((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).defaultProject);
    }
    static GetLanguageServiceForProjectWithFile(c: crossProjectOrchestrator | undefined, ctx: GoInterface | undefined, p: Project__from_ls | undefined, uri: DocumentUri__from_lsproto): LanguageService__from_ls | undefined {
        return Session__from_project.GetLanguageServiceForProjectWithFile(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).server ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, (($value: Project__from_ls | undefined): {
            value: Project__from_project;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_project$Project.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(p), uri);
    }
    static GetProjectsForFile(c: crossProjectOrchestrator | undefined, ctx: GoInterface | undefined, uri: DocumentUri__from_lsproto): [
        RuntimeSlice<Project__from_ls | undefined>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Session__from_project.GetProjectsForFile(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).server ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, uri);
    }
    static GetProjectsLoadingProjectTree(c: crossProjectOrchestrator | undefined, ctx: GoInterface | undefined, requestedProjectTrees: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): iter__from_gostdlib.Seq<Project__from_ls | undefined> {
        return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: Project__from_ls | undefined) => bool) | undefined): void => {
            Session__from_project.WithSnapshotLoadingProjectTree(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).server ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.session, ctx, requestedProjectTrees, (snapshot: {
                value: Snapshot__from_project;
            } | undefined): void => {
                const __gotots_range_9 = ProjectCollection__from_project.Projects((snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ProjectCollection);
                for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
                    const __gotots_range_value_10 = __gotots_range_9.get(__gotots_range_index_9);
                    let p: {
                        value: Project__from_project;
                    } | undefined = __gotots_range_value_10;
                    const __gotots_callee_28 = __go_yield;
                    const __gotots_argument_87 = new $goInterfaceAdapter$PointerTo_Named_project$Project(p);
                    if (!(__gotots_callee_28 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_87)) {
                        return;
                    }
                }
            });
        });
    }
}
export function Server_recover$deferred($go$recovery: GoRecovery, s: {
    value: Server;
} | undefined, req: {
    value: RequestMessage__from_lsproto;
} | undefined): void {
    {
        let r: $goInterface$Interface_void | undefined = $go$recovery === undefined ? undefined : $go$recovery.take();
        if (!(r === undefined)) {
            let stack = debug__from_gostdlib.Stack();
            const __gotots_receiver_28: Server["logger"] = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger;
            const __gotots_argument_81 = "panic handling request %s: %v\n%s";
            const __gotots_argument_78 = new $goInterfaceAdapter$Named_lsproto$Method((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method);
            const __gotots_argument_79 = r;
            const __gotots_conversion_9 = stack;
            let __gotots_conversion_10 = "";
            for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
                __gotots_conversion_10 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_9.get(__gotots_conversion_11)));
            }
            const __gotots_argument_80 = new GoInterfaceAdapter(__gotots_conversion_10);
            const __gotots_argument_82 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_78, __gotots_argument_79, __gotots_argument_80]);
            logger.Errorf(__gotots_receiver_28, __gotots_argument_81, __gotots_argument_82);
            if (!((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID === undefined)) {
                Server.$go$private$lsp$sendError(s, (req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ID, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("%w: panic handling request %s: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_lsproto$ErrorCode(ErrorCodeInternalError$constant__from_lsproto()), new $goInterfaceAdapter$Named_lsproto$Method((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method), r]))));
            }
            else {
                logger.Error((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logger, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("unhandled panic in notification"), new $goInterfaceAdapter$Named_lsproto$Method((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method), r]));
            }
            if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.telemetryEnabled) {
                const __gotots_argument_84 = s;
                const __gotots_argument_85 = NotificationInfo__from_lsproto.$copy<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto>(NotificationInfo__from_lsproto.$fromStorage<RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto>($state__lsproto.TelemetryEventInfo));
                const __gotots_field_10 = ErrorCode_String__from_lsproto(ErrorCodeInternalError$constant__from_lsproto());
                const __gotots_field_11 = strings__from_gostdlib.ReplaceAll((req ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Method.$value, "/", ".");
                const __gotots_conversion_12 = stack;
                let __gotots_conversion_13 = "";
                for (let __gotots_conversion_14 = 0; __gotots_conversion_14 < __gotots_conversion_12.length; __gotots_conversion_14++) {
                    __gotots_conversion_13 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_12.get(__gotots_conversion_14)));
                }
                const __gotots_argument_83 = __gotots_conversion_13;
                const __gotots_field_12 = sanitizeStackTrace(__gotots_argument_83);
                const __gotots_field_13 = { value: new RequestFailureTelemetryProperties__from_lsproto(__gotots_field_10, __gotots_field_11, __gotots_field_12) };
                const __gotots_field_14 = { value: new RequestFailureTelemetryEvent__from_lsproto(StringLiteralLanguageServerErrorResponse__from_lsproto.$zero(), StringLiteralError__from_lsproto.$zero(), __gotots_field_13) };
                const __gotots_argument_86 = RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull__from_lsproto.$fromStorage({
                    RequestFailureTelemetryEvent: __gotots_field_14,
                    PerformanceStatsTelemetryEvent: void 0,
                    ProjectInfoTelemetryEvent: void 0
                });
                sendNotification$Named_lsproto$RequestFailureTelemetryEventOrPerformanceStatsTelemetryEventOrProjectInfoTelemetryEventOrNull(__gotots_argument_84, __gotots_argument_85, __gotots_argument_86);
            }
        }
    }
}
