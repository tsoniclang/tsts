/**
 * LSP generated model surface.
 *
 * Porting target for TS-Go `internal/lsp/lsproto/lsp_generated.go`. This file
 * contains the stable protocol structures used by server, tests, and language
 * service features. It intentionally keeps the generated model in TypeScript
 * data/interface form so future generator work can replace it mechanically.
 */

import type { DocumentUri, Location, Method, Position, Range, URI } from "./lsp.js";

export interface IntegerOrString {
  readonly integer?: number;
  readonly string?: string;
}

export interface TextDocumentIdentifier {
  readonly uri: DocumentUri;
}

export interface VersionedTextDocumentIdentifier extends TextDocumentIdentifier {
  readonly version: number | null;
}

export interface OptionalVersionedTextDocumentIdentifier extends TextDocumentIdentifier {
  readonly version?: number | null;
}

export interface TextDocumentItem {
  readonly uri: DocumentUri;
  readonly languageId: string;
  readonly version: number;
  readonly text: string;
}

export interface TextDocumentPositionParams {
  readonly textDocument: TextDocumentIdentifier;
  readonly position: Position;
}

export interface WorkDoneProgressParams {
  readonly workDoneToken?: IntegerOrString;
}

export interface PartialResultParams {
  readonly partialResultToken?: IntegerOrString;
}

export interface ImplementationParams extends TextDocumentPositionParams, WorkDoneProgressParams, PartialResultParams {}
export interface DefinitionParams extends TextDocumentPositionParams, WorkDoneProgressParams, PartialResultParams {}
export interface TypeDefinitionParams extends TextDocumentPositionParams, WorkDoneProgressParams, PartialResultParams {}
export interface DeclarationParams extends TextDocumentPositionParams, WorkDoneProgressParams, PartialResultParams {}
export interface ReferenceParams extends TextDocumentPositionParams, WorkDoneProgressParams, PartialResultParams {
  readonly context: ReferenceContext;
}

export interface ReferenceContext {
  readonly includeDeclaration: boolean;
}

export interface DocumentHighlightParams extends TextDocumentPositionParams, WorkDoneProgressParams, PartialResultParams {}
export interface DocumentSymbolParams extends WorkDoneProgressParams, PartialResultParams {
  readonly textDocument: TextDocumentIdentifier;
}

export interface HoverParams extends TextDocumentPositionParams, WorkDoneProgressParams {}

export interface CompletionParams extends TextDocumentPositionParams, WorkDoneProgressParams, PartialResultParams {
  readonly context?: CompletionContext;
}

export interface CompletionContext {
  readonly triggerKind: CompletionTriggerKind;
  readonly triggerCharacter?: string;
}

export const enum CompletionTriggerKind {
  Invoked = 1,
  TriggerCharacter = 2,
  TriggerForIncompleteCompletions = 3,
}

export interface SignatureHelpParams extends TextDocumentPositionParams, WorkDoneProgressParams {
  readonly context?: SignatureHelpContext;
}

export interface SignatureHelpContext {
  readonly triggerKind: SignatureHelpTriggerKind;
  readonly triggerCharacter?: string;
  readonly isRetrigger: boolean;
  readonly activeSignatureHelp?: SignatureHelp;
}

export const enum SignatureHelpTriggerKind {
  Invoked = 1,
  TriggerCharacter = 2,
  ContentChange = 3,
}

export interface SignatureHelp {
  readonly signatures: readonly SignatureInformation[];
  readonly activeSignature?: number;
  readonly activeParameter?: number;
}

export interface SignatureInformation {
  readonly label: string;
  readonly documentation?: string | MarkupContent;
  readonly parameters?: readonly ParameterInformation[];
  readonly activeParameter?: number;
}

export interface ParameterInformation {
  readonly label: string | readonly [number, number];
  readonly documentation?: string | MarkupContent;
}

export interface MarkupContent {
  readonly kind: MarkupKind;
  readonly value: string;
}

export type MarkupKind = "plaintext" | "markdown";

export interface Hover {
  readonly contents: MarkupContent | string | readonly string[];
  readonly range?: Range;
}

export interface CompletionList {
  readonly isIncomplete: boolean;
  readonly itemDefaults?: CompletionItemDefaults;
  readonly items: readonly CompletionItem[];
}

export interface CompletionItemDefaults {
  readonly commitCharacters?: readonly string[];
  readonly editRange?: Range;
  readonly insertTextFormat?: InsertTextFormat;
  readonly insertTextMode?: InsertTextMode;
  readonly data?: unknown;
}

export interface CompletionItem {
  readonly label: string;
  readonly labelDetails?: CompletionItemLabelDetails;
  readonly kind?: CompletionItemKind;
  readonly tags?: readonly CompletionItemTag[];
  readonly detail?: string;
  readonly documentation?: string | MarkupContent;
  readonly deprecated?: boolean;
  readonly preselect?: boolean;
  readonly sortText?: string;
  readonly filterText?: string;
  readonly insertText?: string;
  readonly insertTextFormat?: InsertTextFormat;
  readonly insertTextMode?: InsertTextMode;
  readonly textEdit?: TextEdit | InsertReplaceEdit;
  readonly textEditText?: string;
  readonly additionalTextEdits?: readonly TextEdit[];
  readonly commitCharacters?: readonly string[];
  readonly command?: Command;
  readonly data?: unknown;
}

export interface CompletionItemLabelDetails {
  readonly detail?: string;
  readonly description?: string;
}

export const enum CompletionItemKind {
  Text = 1,
  Method = 2,
  Function = 3,
  Constructor = 4,
  Field = 5,
  Variable = 6,
  Class = 7,
  Interface = 8,
  Module = 9,
  Property = 10,
  Unit = 11,
  Value = 12,
  Enum = 13,
  Keyword = 14,
  Snippet = 15,
  Color = 16,
  File = 17,
  Reference = 18,
  Folder = 19,
  EnumMember = 20,
  Constant = 21,
  Struct = 22,
  Event = 23,
  Operator = 24,
  TypeParameter = 25,
}

export const enum CompletionItemTag {
  Deprecated = 1,
}

export const enum InsertTextFormat {
  PlainText = 1,
  Snippet = 2,
}

export const enum InsertTextMode {
  AsIs = 1,
  AdjustIndentation = 2,
}

export interface TextEdit {
  readonly range: Range;
  readonly newText: string;
}

export interface InsertReplaceEdit {
  readonly newText: string;
  readonly insert: Range;
  readonly replace: Range;
}

export interface Command {
  readonly title: string;
  readonly command: string;
  readonly arguments?: readonly unknown[];
}

export interface DocumentHighlight {
  readonly range: Range;
  readonly kind?: DocumentHighlightKind;
}

export const enum DocumentHighlightKind {
  Text = 1,
  Read = 2,
  Write = 3,
}

export interface SymbolInformation {
  readonly name: string;
  readonly kind: SymbolKind;
  readonly tags?: readonly SymbolTag[];
  readonly deprecated?: boolean;
  readonly location: Location;
  readonly containerName?: string;
}

export interface DocumentSymbol {
  readonly name: string;
  readonly detail?: string;
  readonly kind: SymbolKind;
  readonly tags?: readonly SymbolTag[];
  readonly deprecated?: boolean;
  readonly range: Range;
  readonly selectionRange: Range;
  readonly children?: readonly DocumentSymbol[];
}

export const enum SymbolKind {
  File = 1,
  Module = 2,
  Namespace = 3,
  Package = 4,
  Class = 5,
  Method = 6,
  Property = 7,
  Field = 8,
  Constructor = 9,
  Enum = 10,
  Interface = 11,
  Function = 12,
  Variable = 13,
  Constant = 14,
  String = 15,
  Number = 16,
  Boolean = 17,
  Array = 18,
  Object = 19,
  Key = 20,
  Null = 21,
  EnumMember = 22,
  Struct = 23,
  Event = 24,
  Operator = 25,
  TypeParameter = 26,
}

export const enum SymbolTag {
  Deprecated = 1,
}

export interface Diagnostic {
  readonly range: Range;
  readonly severity?: DiagnosticSeverity;
  readonly code?: number | string;
  readonly codeDescription?: CodeDescription;
  readonly source?: string;
  readonly message: string;
  readonly tags?: readonly DiagnosticTag[];
  readonly relatedInformation?: readonly DiagnosticRelatedInformation[];
  readonly data?: unknown;
}

export const enum DiagnosticSeverity {
  Error = 1,
  Warning = 2,
  Information = 3,
  Hint = 4,
}

export const enum DiagnosticTag {
  Unnecessary = 1,
  Deprecated = 2,
}

export interface CodeDescription {
  readonly href: URI;
}

export interface DiagnosticRelatedInformation {
  readonly location: Location;
  readonly message: string;
}

export interface PublishDiagnosticsParams {
  readonly uri: DocumentUri;
  readonly version?: number;
  readonly diagnostics: readonly Diagnostic[];
}

export interface ProgressParams {
  readonly token: IntegerOrString;
  readonly value: WorkDoneProgressBeginOrReportOrEnd;
}

export interface WorkDoneProgressCreateParams {
  readonly token: IntegerOrString;
}

export interface WorkDoneProgressBegin {
  readonly kind: "begin";
  readonly title: string;
  readonly cancellable?: boolean;
  readonly message?: string;
  readonly percentage?: number;
}

export interface WorkDoneProgressReport {
  readonly kind: "report";
  readonly cancellable?: boolean;
  readonly message?: string;
  readonly percentage?: number;
}

export interface WorkDoneProgressEnd {
  readonly kind: "end";
  readonly message?: string;
}

export interface WorkDoneProgressBeginOrReportOrEnd {
  readonly begin?: WorkDoneProgressBegin;
  readonly report?: WorkDoneProgressReport;
  readonly end?: WorkDoneProgressEnd;
}

export interface InitializeParams extends WorkDoneProgressParams {
  readonly processId?: number | null;
  readonly clientInfo?: { readonly name: string; readonly version?: string };
  readonly locale?: string;
  readonly rootPath?: string | null;
  readonly rootUri?: DocumentUri | null;
  readonly initializationOptions?: InitializationOptions;
  readonly capabilities: ClientCapabilities;
  readonly trace?: TraceValue;
  readonly workspaceFolders?: readonly WorkspaceFolder[] | null;
}

export interface InitializationOptions {
  readonly disablePushDiagnostics?: boolean;
  readonly codeLensShowLocationsCommandName?: string;
  readonly userPreferences?: unknown;
  readonly enableTelemetry?: boolean;
}

export type TraceValue = "off" | "messages" | "verbose";

export interface WorkspaceFolder {
  readonly uri: DocumentUri;
  readonly name: string;
}

export interface ClientCapabilities {
  readonly workspace?: WorkspaceClientCapabilities;
  readonly textDocument?: TextDocumentClientCapabilities;
  readonly window?: WindowClientCapabilities;
  readonly general?: GeneralClientCapabilities;
  readonly experimental?: unknown;
}

export interface WorkspaceClientCapabilities {
  readonly applyEdit?: boolean;
  readonly workspaceEdit?: WorkspaceEditClientCapabilities;
  readonly didChangeConfiguration?: DynamicRegistrationCapability;
  readonly didChangeWatchedFiles?: DynamicRegistrationCapability;
  readonly symbol?: unknown;
  readonly executeCommand?: DynamicRegistrationCapability;
  readonly workspaceFolders?: boolean;
  readonly configuration?: boolean;
}

export interface WorkspaceEditClientCapabilities {
  readonly documentChanges?: boolean;
  readonly resourceOperations?: readonly ResourceOperationKind[];
  readonly failureHandling?: FailureHandlingKind;
}

export type ResourceOperationKind = "create" | "rename" | "delete";
export type FailureHandlingKind = "abort" | "transactional" | "textOnlyTransactional" | "undo";

export interface DynamicRegistrationCapability {
  readonly dynamicRegistration?: boolean;
}

export interface TextDocumentClientCapabilities {
  readonly synchronization?: unknown;
  readonly completion?: unknown;
  readonly hover?: unknown;
  readonly signatureHelp?: unknown;
  readonly declaration?: DynamicRegistrationCapability;
  readonly definition?: DynamicRegistrationCapability;
  readonly typeDefinition?: DynamicRegistrationCapability;
  readonly implementation?: DynamicRegistrationCapability;
  readonly references?: DynamicRegistrationCapability;
  readonly documentHighlight?: DynamicRegistrationCapability;
  readonly documentSymbol?: DynamicRegistrationCapability;
  readonly codeAction?: unknown;
  readonly codeLens?: DynamicRegistrationCapability;
  readonly formatting?: DynamicRegistrationCapability;
  readonly rangeFormatting?: DynamicRegistrationCapability;
  readonly rename?: DynamicRegistrationCapability;
  readonly publishDiagnostics?: unknown;
}

export interface WindowClientCapabilities {
  readonly workDoneProgress?: boolean;
  readonly showMessage?: unknown;
  readonly showDocument?: unknown;
}

export interface GeneralClientCapabilities {
  readonly staleRequestSupport?: unknown;
  readonly regularExpressions?: unknown;
  readonly markdown?: unknown;
  readonly positionEncodings?: readonly PositionEncodingKind[];
}

export type PositionEncodingKind = "utf-8" | "utf-16" | "utf-32";

export interface InitializeResult {
  readonly capabilities: ServerCapabilities;
  readonly serverInfo?: { readonly name: string; readonly version?: string };
}

export interface ServerCapabilities {
  readonly positionEncoding?: PositionEncodingKind;
  readonly textDocumentSync?: TextDocumentSyncOptions | TextDocumentSyncKind;
  readonly completionProvider?: CompletionOptions;
  readonly hoverProvider?: boolean;
  readonly signatureHelpProvider?: SignatureHelpOptions;
  readonly declarationProvider?: boolean;
  readonly definitionProvider?: boolean;
  readonly typeDefinitionProvider?: boolean;
  readonly implementationProvider?: boolean;
  readonly referencesProvider?: boolean;
  readonly documentHighlightProvider?: boolean;
  readonly documentSymbolProvider?: boolean;
  readonly codeActionProvider?: boolean | CodeActionOptions;
  readonly codeLensProvider?: CodeLensOptions;
  readonly documentFormattingProvider?: boolean;
  readonly documentRangeFormattingProvider?: boolean;
  readonly renameProvider?: boolean | RenameOptions;
  readonly executeCommandProvider?: ExecuteCommandOptions;
  readonly workspace?: WorkspaceServerCapabilities;
  readonly experimental?: unknown;
}

export const enum TextDocumentSyncKind {
  None = 0,
  Full = 1,
  Incremental = 2,
}

export interface TextDocumentSyncOptions {
  readonly openClose?: boolean;
  readonly change?: TextDocumentSyncKind;
  readonly willSave?: boolean;
  readonly willSaveWaitUntil?: boolean;
  readonly save?: boolean | SaveOptions;
}

export interface SaveOptions {
  readonly includeText?: boolean;
}

export interface CompletionOptions {
  readonly triggerCharacters?: readonly string[];
  readonly allCommitCharacters?: readonly string[];
  readonly resolveProvider?: boolean;
  readonly completionItem?: unknown;
}

export interface SignatureHelpOptions {
  readonly triggerCharacters?: readonly string[];
  readonly retriggerCharacters?: readonly string[];
}

export interface CodeActionOptions {
  readonly codeActionKinds?: readonly CodeActionKind[];
  readonly resolveProvider?: boolean;
}

export type CodeActionKind = string;

export interface CodeLensOptions {
  readonly resolveProvider?: boolean;
}

export interface RenameOptions {
  readonly prepareProvider?: boolean;
}

export interface ExecuteCommandOptions {
  readonly commands: readonly string[];
}

export interface WorkspaceServerCapabilities {
  readonly workspaceFolders?: WorkspaceFoldersServerCapabilities;
  readonly fileOperations?: unknown;
}

export interface WorkspaceFoldersServerCapabilities {
  readonly supported?: boolean;
  readonly changeNotifications?: string | boolean;
}

export const InitializeInfo = { method: "initialize" as Method };
export const InitializedInfo = { method: "initialized" as Method };
export const ShutdownInfo = { method: "shutdown" as Method };
export const ExitInfo = { method: "exit" as Method };
export const ProgressInfo = { method: "$/progress" as Method };
export const WindowWorkDoneProgressCreateInfo = { method: "window/workDoneProgress/create" as Method };
export const TextDocumentPublishDiagnosticsInfo = { method: "textDocument/publishDiagnostics" as Method };
