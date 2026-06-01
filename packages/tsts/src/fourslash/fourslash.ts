/**
 * Fourslash harness state.
 *
 * Porting surface for TS-Go `internal/fourslash/fourslash.go`. This file owns
 * the editable virtual-file model, marker navigation, and baseline command
 * bookkeeping used by fourslash tests. Language-service request execution is
 * layered on top of this state by later LS/LSP ports.
 */

import { TextRange } from "../core/index.js";
import {
  DiagnosticSeverityError,
  DiagnosticSeverityHint,
  DiagnosticSeverityInformation,
  DiagnosticSeverityWarning,
  DiagnosticTagDeprecated,
  DiagnosticTagUnnecessary,
  FoldingRangeKindComment,
  FoldingRangeKindImports,
  FoldingRangeKindRegion,
  LanguageKindJavaScript,
  LanguageKindJavaScriptReact,
  LanguageKindJSON,
  LanguageKindTypeScript,
  LanguageKindTypeScriptReact,
  MarkupKindMarkdown,
  MarkupKindPlainText,
  PositionEncodingKindUTF8,
  ResourceOperationKindRename,
  SemanticTokenModifierAbstract,
  SemanticTokenModifierAsync,
  SemanticTokenModifierDeclaration,
  SemanticTokenModifierDefaultLibrary,
  SemanticTokenModifierDefinition,
  SemanticTokenModifierDeprecated,
  SemanticTokenModifierDocumentation,
  SemanticTokenModifierModification,
  SemanticTokenModifierReadonly,
  SemanticTokenModifierStatic,
  SemanticTokenTypeClass,
  SemanticTokenTypeComment,
  SemanticTokenTypeDecorator,
  SemanticTokenTypeEnum,
  SemanticTokenTypeEnumMember,
  SemanticTokenTypeEvent,
  SemanticTokenTypeFunction,
  SemanticTokenTypeInterface,
  SemanticTokenTypeKeyword,
  SemanticTokenTypeLabel,
  SemanticTokenTypeMacro,
  SemanticTokenTypeMethod,
  SemanticTokenTypeNamespace,
  SemanticTokenTypeNumber,
  SemanticTokenTypeOperator,
  SemanticTokenTypeParameter,
  SemanticTokenTypeProperty,
  SemanticTokenTypeRegexp,
  SemanticTokenTypeString,
  SemanticTokenTypeStruct,
  SemanticTokenTypeType,
  SemanticTokenTypeTypeParameter,
  SemanticTokenTypeVariable,
  TokenFormatRelative,
  type CallHierarchyIncomingCall,
  type CallHierarchyItem,
  type CallHierarchyOutgoingCall,
  type ClientCapabilities,
  type CodeAction,
  type CodeLens,
  type CodeActionKind,
  type CompletionItem,
  type CompletionItemDefaults,
  type CompletionList,
  type Diagnostic,
  type DocumentHighlight,
  type DocumentSymbol,
  type DocumentUri,
  type FoldingRange,
  type FileRename,
  type Hover,
  type InlayHint,
  type LanguageKind,
  type LinkedEditingRanges,
  type Location,
  type Position,
  type Range,
  type SelectionRange,
  type SignatureHelp,
  type SignatureHelpContext,
  type SymbolInformation,
  type TextEdit,
  type WorkspaceEdit,
  type WorkspaceSymbol,
} from "../lsp/lsproto/index.js";
import { fileNameToDocumentURI } from "../ls/lsconv/index.js";
import {
  extensionCjs,
  extensionCts,
  extensionDcts,
  extensionDmts,
  extensionDts,
  extensionJs,
  extensionJson,
  extensionJsx,
  extensionMjs,
  extensionMts,
  extensionTs,
  extensionTsx,
  fileExtensionIs,
  fileExtensionIsOneOf,
} from "../tspath/index.js";
import { RangeMarker, parseTestData, type Marker, type MarkerOrRange, type TestData, type TestFileInfo } from "./testParser.js";

export const rootDir = "/";
export const showCodeLensLocationsCommandName = "typescript.showCodeLensLocations";

export type FourslashCapabilities = ClientCapabilities;

export interface UserPreferences {
  readonly includeCompletionsForModuleExports?: boolean;
  readonly includeCompletionsForImportStatements?: boolean;
  readonly includeCompletionsWithInsertText?: boolean;
  readonly quotePreference?: "auto" | "double" | "single";
  readonly importModuleSpecifierPreference?: "shortest" | "project-relative" | "relative" | "non-relative";
  readonly importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js";
  readonly autoImportSpecifierExcludeRegexes?: readonly string[];
  readonly autoImportFileExcludePatterns?: readonly string[];
  readonly preferTypeOnlyAutoImports?: boolean;
  readonly autoImportEntrypointDirectorySearch?: boolean;
}

export interface BaselineCommand {
  readonly name: string;
  readonly arguments: readonly string[];
}

export interface FourslashBaselineResult {
  readonly testPath: string;
  readonly command: BaselineCommand;
  readonly text: string;
}

export interface FourslashServerResponse {
  readonly result?: unknown;
  readonly error?: {
    readonly code: number;
    readonly message: string;
    readonly data?: unknown;
  };
}

export class ScriptInfo {
  readonly fileName: string;
  private contentText: string;
  private lineStartsValue: readonly number[];
  private versionValue = 1;

  constructor(fileName: string, content: string, lineStarts: readonly number[]) {
    this.fileName = fileName;
    this.contentText = content;
    this.lineStartsValue = lineStarts;
  }

  editContent(change: TextChange): void {
    this.contentText = applyTextChange(this.contentText, change);
    this.lineStartsValue = computeLineStarts(this.contentText);
    this.versionValue += 1;
  }

  text(): string {
    return this.contentText;
  }

  version(): number {
    return this.versionValue;
  }

  lineStarts(): readonly number[] {
    return this.lineStartsValue;
  }

  getLineContent(line: number): string {
    const starts = this.lineStartsValue;
    if (line < 0 || line >= starts.length) return "";
    const start = starts[line]!;
    const end = line + 1 < starts.length ? starts[line + 1]! : this.contentText.length;
    return this.contentText.slice(start, end).replace(/[\r\n]+$/, "");
  }
}

export interface TextChange {
  readonly span: TextRange;
  readonly newText: string;
}

export interface TextEditSpan {
  readonly start: number;
  readonly end: number;
  readonly length: number;
}

export interface FourslashOptions {
  readonly capabilities?: FourslashCapabilities;
  readonly content: string;
  readonly fileName?: string;
  readonly completionProvider?: FourslashCompletionProvider;
  readonly codeFixProvider?: FourslashCodeFixProvider;
  readonly languageProvider?: FourslashLanguageProvider;
}

export interface FourslashCompletionRequest {
  readonly fileName: string;
  readonly position: Position;
  readonly offset: number;
  readonly userPreferences: UserPreferences;
}

export interface FourslashCompletionProvider {
  getCompletions(request: FourslashCompletionRequest): CompletionList | undefined;
  resolveCompletionItem?(item: CompletionItem, request: FourslashCompletionRequest): CompletionItem;
}

export interface FourslashCodeFixRequest {
  readonly fileName: string;
  readonly position: Position;
  readonly range: Range | undefined;
  readonly errorCode: number | undefined;
  readonly userPreferences: UserPreferences;
}

export interface FourslashCodeFixProvider {
  getCodeFixActions(request: FourslashCodeFixRequest): readonly CodeAction[];
  getAllQuickFixActions?(request: FourslashCodeFixRequest): readonly CodeAction[];
  getSourceFixAllActions?(request: FourslashCodeFixRequest): readonly CodeAction[];
}

export interface FourslashLanguageRequest {
  readonly fileName: string;
  readonly uri: DocumentUri;
  readonly position: Position;
  readonly range: Range | undefined;
  readonly offset: number;
  readonly userPreferences: UserPreferences;
  readonly signatureHelpContext?: SignatureHelpContext;
}

export interface FourslashLanguageProvider {
  formatDocument?(fileName: string, preferences: UserPreferences): readonly TextChange[];
  formatSelection?(fileName: string, range: Range, preferences: UserPreferences): readonly TextChange[];
  organizeImports?(fileName: string, kind: CodeActionKind, preferences: UserPreferences): CodeAction | undefined;
  getImportFixes?(request: FourslashLanguageRequest, diagnostics: readonly Diagnostic[]): readonly CodeAction[];
  getReferences?(request: FourslashLanguageRequest, includeDeclaration: boolean): readonly Location[];
  getDefinition?(request: FourslashLanguageRequest): readonly Location[];
  getImplementation?(request: FourslashLanguageRequest): readonly Location[];
  getTypeDefinition?(request: FourslashLanguageRequest): readonly Location[];
  getSourceDefinition?(request: FourslashLanguageRequest): readonly Location[];
  getWorkspaceSymbols?(query: string): readonly SymbolInformation[];
  getCodeLenses?(fileName: string): readonly CodeLens[];
  resolveCodeLens?(codeLens: CodeLens): CodeLens;
  getFoldingRanges?(fileName: string): readonly FoldingRange[] | undefined;
  getHover?(request: FourslashLanguageRequest, verbosityLevel?: number): Hover | undefined;
  getSignatureHelp?(request: FourslashLanguageRequest): SignatureHelp | undefined;
  getJsxClosingTag?(request: FourslashLanguageRequest): string | undefined;
  prepareCallHierarchy?(request: FourslashLanguageRequest): readonly CallHierarchyItem[];
  getIncomingCalls?(item: CallHierarchyItem): readonly CallHierarchyIncomingCall[];
  getOutgoingCalls?(item: CallHierarchyItem): readonly CallHierarchyOutgoingCall[];
  getSelectionRanges?(fileName: string, positions: readonly Position[]): readonly SelectionRange[];
  getDocumentHighlights?(request: FourslashLanguageRequest, filesToSearch?: readonly DocumentUri[]): readonly Location[];
  getDocumentSymbols?(fileName: string): readonly DocumentSymbol[] | readonly SymbolInformation[] | undefined;
  getDiagnostics?(fileName: string): readonly Diagnostic[];
  getInlayHints?(fileName: string, range: Range): readonly InlayHint[];
  getLinkedEditingRanges?(request: FourslashLanguageRequest): LinkedEditingRanges | undefined;
  rename?(request: FourslashLanguageRequest, newName: string): WorkspaceEdit | undefined;
  willRenameFiles?(files: readonly FileRename[]): WorkspaceEdit | undefined;
}

export class FourslashTest {
  readonly testData: TestData;
  readonly rangesByText = new Map<string, RangeMarker[]>();
  readonly openFiles = new Set<string>();
  readonly scriptInfos = new Map<string, ScriptInfo>();
  readonly baselines = new Map<string, string[]>();
  readonly capabilities: FourslashCapabilities;
  readonly semanticTokenTypes: string[] = [];
  readonly semanticTokenModifiers: string[] = [];
  completionProvider: FourslashCompletionProvider | undefined;
  codeFixProvider: FourslashCodeFixProvider | undefined;
  languageProvider: FourslashLanguageProvider | undefined;

  stateEnableFormatting = false;
  reportFormatOnTypeCrash = false;
  userPreferences: UserPreferences = {};
  currentCaretPosition: Position = { line: 0, character: 0 };
  lastKnownMarkerName: string | undefined;
  activeFilename: string;
  selectionEnd: Position | undefined;
  isStradaServer = false;

  constructor(options: FourslashOptions) {
    const fileName = options.fileName ?? "fourslash.ts";
    this.capabilities = getCapabilitiesWithDefaults(options.capabilities);
    this.completionProvider = options.completionProvider;
    this.codeFixProvider = options.codeFixProvider;
    this.languageProvider = options.languageProvider;
    this.testData = parseTestData(options.content, fileName);
    this.activeFilename = this.testData.files[0]?.fileName ?? fileName;

    for (const file of this.testData.files) {
      const scriptInfo = new ScriptInfo(file.fileName, file.content, file.lineStarts);
      this.scriptInfos.set(file.fileName, scriptInfo);
      this.openFiles.add(file.fileName);
    }

    for (const range of this.testData.ranges) {
      const file = this.testData.files.find((candidate) => candidate.fileName === range.fileName());
      const text = file === undefined ? "" : file.content.slice(range.range.pos, range.range.end);
      const bucket = this.rangesByText.get(text) ?? [];
      bucket.push(range);
      this.rangesByText.set(text, bucket);
    }
  }

  static new(options: FourslashOptions): FourslashTest {
    return new FourslashTest(options);
  }

  file(name?: string): ScriptInfo {
    const fileName = name ?? this.activeFilename;
    const info = this.scriptInfos.get(fileName);
    if (info === undefined) throw new Error(`Unknown fourslash file: ${fileName}`);
    return info;
  }

  goToMarker(name: string): Marker {
    const marker = this.marker(name);
    this.activeFilename = marker.fileName();
    this.currentCaretPosition = marker.lsPos();
    this.lastKnownMarkerName = name;
    this.selectionEnd = undefined;
    return marker;
  }

  goToRange(range: RangeMarker): void {
    this.activeFilename = range.fileName();
    this.currentCaretPosition = range.lsRange.start;
    this.selectionEnd = range.lsRange.end;
  }

  marker(name: string): Marker {
    const marker = this.testData.markerPositions.get(name);
    if (marker === undefined) throw new Error(`Unknown marker: ${name}`);
    return marker;
  }

  markerOrRange(name: string): MarkerOrRange {
    return this.testData.markerPositions.get(name) ?? this.rangesByText.get(name)?.[0] ?? fail(`Unknown marker or range: ${name}`);
  }

  goToMarkerOrRange(markerOrRange: MarkerOrRange): void {
    this.activeFilename = markerOrRange.fileName();
    this.currentCaretPosition = markerOrRange.lsPos();
    this.lastKnownMarkerName = markerOrRange.getName();
    this.selectionEnd = undefined;
  }

  goToEOF(): void {
    this.currentCaretPosition = positionFromOffset(this.file(), this.file().text().length);
    this.selectionEnd = undefined;
  }

  goToBOF(): void {
    this.currentCaretPosition = { line: 0, character: 0 };
    this.selectionEnd = undefined;
  }

  goToPosition(position: number): void {
    this.currentCaretPosition = positionFromOffset(this.file(), position);
    this.selectionEnd = undefined;
  }

  goToEachMarker(markerNames: readonly string[], action: (marker: Marker, index: number) => void): void {
    markerNames.forEach((markerName, index) => {
      const marker = this.goToMarker(markerName);
      action(marker, index);
    });
  }

  goToEachRange(action: (rangeMarker: RangeMarker) => void): void {
    this.testData.ranges.forEach((rangeMarker) => {
      this.goToRange(rangeMarker);
      action(rangeMarker);
    });
  }

  goToRangeStart(rangeMarker: RangeMarker): void {
    this.activeFilename = rangeMarker.fileName();
    this.currentCaretPosition = rangeMarker.lsRange.start;
    this.selectionEnd = undefined;
  }

  goToSelect(startMarkerName: string, endMarkerName: string): void {
    const startMarker = this.marker(startMarkerName);
    const endMarker = this.marker(endMarkerName);
    if (startMarker.fileName() !== endMarker.fileName()) {
      throw new Error(`Markers '${startMarkerName}' and '${endMarkerName}' are in different files`);
    }
    this.activeFilename = startMarker.fileName();
    this.currentCaretPosition = startMarker.lsPosition;
    this.selectionEnd = endMarker.lsPosition;
  }

  goToSelectRange(rangeMarker: RangeMarker): void {
    this.activeFilename = rangeMarker.fileName();
    this.currentCaretPosition = rangeMarker.lsRange.start;
    this.selectionEnd = rangeMarker.lsRange.end;
  }

  goToFile(filename: string): void {
    this.ensureActiveFile(filename);
  }

  goToFileNumber(index: number): void {
    const file = this.testData.files[index];
    if (file === undefined) throw new Error(`Fourslash file index ${index} is out of range`);
    this.ensureActiveFile(file.fileName);
  }

  rangeByText(text: string): RangeMarker {
    const ranges = this.rangesByText.get(text) ?? [];
    if (ranges.length !== 1) throw new Error(`Expected exactly one range with text ${JSON.stringify(text)}, got ${ranges.length}`);
    return ranges[0]!;
  }

  ranges(): readonly RangeMarker[] {
    return this.testData.ranges;
  }

  markers(): readonly Marker[] {
    return this.testData.markers;
  }

  markerNames(): readonly string[] {
    return [...this.testData.markerPositions.keys()].sort();
  }

  getRangesInFile(fileName: string): readonly RangeMarker[] {
    return this.testData.ranges.filter((rangeMarker) => rangeMarker.fileName() === fileName);
  }

  ensureActiveFile(filename: string): void {
    if (!this.scriptInfos.has(filename)) throw new Error(`Unknown fourslash file: ${filename}`);
    this.activeFilename = filename;
    this.currentCaretPosition = { line: 0, character: 0 };
    this.selectionEnd = undefined;
    this.openFiles.add(filename);
  }

  closeFileOfMarker(markerName: string): void {
    const marker = this.marker(markerName);
    this.openFiles.delete(marker.fileName());
    if (this.activeFilename === marker.fileName()) {
      const next = this.openFiles.values().next().value as string | undefined;
      if (next !== undefined) this.activeFilename = next;
    }
  }

  openFile(filename: string): void {
    if (!this.scriptInfos.has(filename)) throw new Error(`Unknown fourslash file: ${filename}`);
    this.openFiles.add(filename);
    this.activeFilename = filename;
  }

  setUserPreferences(preferences: UserPreferences): void {
    this.userPreferences = { ...this.userPreferences, ...preferences };
  }

  getOptions(): UserPreferences {
    return this.userPreferences;
  }

  configure(config: UserPreferences): void {
    this.userPreferences = { ...config };
  }

  configureWithReset(config: UserPreferences): () => void {
    const original = this.userPreferences;
    this.configure(config);
    return () => this.configure(original);
  }

  setCompletionProvider(provider: FourslashCompletionProvider | undefined): void {
    this.completionProvider = provider;
  }

  setCodeFixProvider(provider: FourslashCodeFixProvider | undefined): void {
    this.codeFixProvider = provider;
  }

  setLanguageProvider(provider: FourslashLanguageProvider | undefined): void {
    this.languageProvider = provider;
  }

  setSelection(start: Position, end: Position): void {
    this.currentCaretPosition = start;
    this.selectionEnd = end;
  }

  markerByName(name: string): Marker {
    return this.marker(name);
  }

  fileName(): string {
    return this.activeFilename;
  }

  markTestAsStradaServer(): void {
    this.isStradaServer = true;
  }

  formatDocument(filename = this.activeFilename): void {
    const edits = this.languageProviderRequired("format document")
      .formatDocument?.(filename, this.userPreferences) ?? [];
    this.applyTextEdits(filename, edits);
  }

  formatSelection(startMarkerName: string, endMarkerName: string): void {
    const startMarker = this.marker(startMarkerName);
    const endMarker = this.marker(endMarkerName);
    if (startMarker.fileName() !== endMarker.fileName()) {
      throw new Error(`Markers '${startMarkerName}' and '${endMarkerName}' are in different files`);
    }
    const range = { start: startMarker.lsPosition, end: endMarker.lsPosition };
    const edits = this.languageProviderRequired("format selection")
      .formatSelection?.(startMarker.fileName(), range, this.userPreferences) ?? [];
    this.applyTextEdits(startMarker.fileName(), edits);
  }

  applyChange(fileName: string, change: TextChange): void {
    const script = this.scriptInfos.get(fileName);
    if (script === undefined) throw new Error(`Unknown fourslash file: ${fileName}`);
    script.editContent(change);
  }

  baseline(command: BaselineCommand, text: string): void {
    const key = baselineCommandKey(command);
    const bucket = this.baselines.get(key) ?? [];
    bucket.push(text);
    this.baselines.set(key, bucket);
  }

  baselineText(command: BaselineCommand): string {
    return (this.baselines.get(baselineCommandKey(command)) ?? []).join("\n");
  }

  verifyBaselines(testPath = ""): readonly FourslashBaselineResult[] {
    const results: FourslashBaselineResult[] = [];
    for (const [key, texts] of [...this.baselines].sort(([left], [right]) => left.localeCompare(right))) {
      const [name = "", ...args] = key.split("\0");
      results.push({
        testPath,
        command: { name, arguments: args },
        text: texts.join("\n"),
      });
    }
    return results;
  }

  handleServerRequest(method: string, params: unknown): FourslashServerResponse {
    switch (method) {
      case "workspace/configuration":
        return { result: [{ ...this.userPreferences }] };
      case "client/registerCapability":
      case "client/unregisterCapability":
        return { result: null };
      default:
        return {
          error: {
            code: -32601,
            message: `Unknown method: ${method}`,
            data: params,
          },
        };
    }
  }

  initialize(capabilities?: FourslashCapabilities): FourslashCapabilities {
    return getCapabilitiesWithDefaults(capabilities ?? this.capabilities);
  }

  updateState(method: string, params: unknown): void {
    if (!isRecord(params)) return;
    if (method === "textDocument/didOpen") {
      const document = params["textDocument"];
      if (isRecord(document) && typeof document["uri"] === "string") this.openFiles.add(uriToFileName(document["uri"]));
    } else if (method === "textDocument/didClose") {
      const document = params["textDocument"];
      if (isRecord(document) && typeof document["uri"] === "string") this.openFiles.delete(uriToFileName(document["uri"]));
    }
  }

  activeRange(): Range | undefined {
    if (this.selectionEnd === undefined) return undefined;
    return { start: this.currentCaretPosition, end: this.selectionEnd };
  }

  verifyCurrentFileContent(expectedContent: string): void {
    const actualContent = this.file().text();
    if (actualContent !== expectedContent) {
      throw new Error(`Current file content mismatch\nactual:\n${actualContent}\nexpected:\n${expectedContent}`);
    }
  }

  verifyCurrentLineContent(expectedContent: string): void {
    const actualContent = this.file().getLineContent(this.currentCaretPosition.line);
    if (actualContent !== expectedContent) {
      throw new Error(`Current line content mismatch\n  actual line: "${actualContent}"\nexpected line: "${expectedContent}"`);
    }
  }

  verifyIndentation(_numSpaces: number): void {
    return;
  }

  insert(text: string): void {
    this.typeText(text);
  }

  insertLine(text: string): void {
    this.typeText(`${text}\n`);
  }

  backspace(count = 1): void {
    const script = this.file();
    const caret = offsetFromPosition(script, this.currentCaretPosition);
    const start = Math.max(0, caret - count);
    this.editScriptAndUpdateMarkers(script.fileName, { span: new TextRange(start, caret), newText: "" });
  }

  deleteAtCaret(count = 1): void {
    const script = this.file();
    const caret = offsetFromPosition(script, this.currentCaretPosition);
    this.editScriptAndUpdateMarkers(script.fileName, { span: new TextRange(caret, Math.min(script.text().length, caret + count)), newText: "" });
  }

  paste(text: string): void {
    this.typeText(text);
  }

  replaceLine(index: number, text: string): void {
    const script = this.file();
    const starts = script.lineStarts();
    const start = starts[index];
    if (start === undefined) throw new Error(`Line index ${index} is out of range`);
    const end = index + 1 < starts.length ? starts[index + 1]! : script.text().length;
    this.editScriptAndUpdateMarkers(script.fileName, { span: new TextRange(start, end), newText: text });
  }

  selectLine(index: number): void {
    const script = this.file();
    const starts = script.lineStarts();
    const start = starts[index];
    if (start === undefined) throw new Error(`Line index ${index} is out of range`);
    const end = index + 1 < starts.length ? starts[index + 1]! : script.text().length;
    this.currentCaretPosition = positionFromOffset(script, start);
    this.selectionEnd = positionFromOffset(script, end);
  }

  selectRange(start: Position, end: Position): void {
    this.currentCaretPosition = start;
    this.selectionEnd = end;
  }

  getSelection(): Range | undefined {
    return this.activeRange();
  }

  applyTextEdits(fileName: string, edits: readonly TextChange[]): void {
    const sorted = [...edits].sort((left, right) => right.span.pos - left.span.pos || right.span.end - left.span.end);
    for (const edit of sorted) this.editScriptAndUpdateMarkers(fileName, edit);
  }

  replace(start: number, length: number, text: string): void {
    this.replaceWorker(this.activeFilename, start, start + length, text);
  }

  replaceWorker(fileName: string, start: number, end: number, text: string): void {
    this.editScriptAndUpdateMarkers(fileName, { span: new TextRange(start, end), newText: text });
  }

  typeText(text: string): void {
    const script = this.file();
    const start = offsetFromPosition(script, this.currentCaretPosition);
    const end = this.selectionEnd === undefined ? start : offsetFromPosition(script, this.selectionEnd);
    const span = new TextRange(Math.min(start, end), Math.max(start, end));
    this.editScriptAndUpdateMarkers(script.fileName, { span, newText: text });
  }

  editScriptAndUpdateMarkers(fileName: string, change: TextChange): void {
    this.editScriptAndUpdateMarkersWorker(fileName, change);
  }

  editScriptAndUpdateMarkersWorker(fileName: string, change: TextChange): void {
    const script = this.getScriptInfo(fileName);
    const oldText = script.text();
    script.editContent(change);
    this.currentCaretPosition = updatePosition(this.currentCaretPosition, oldText, script, change);
    if (this.selectionEnd !== undefined) {
      this.selectionEnd = updatePosition(this.selectionEnd, oldText, script, change);
    }
  }

  editScript(fileName: string, change: TextChange): void {
    this.getScriptInfo(fileName).editContent(change);
  }

  getScriptInfo(fileName: string): ScriptInfo {
    const info = this.scriptInfos.get(fileName);
    if (info === undefined) throw new Error(`Unknown fourslash file: ${fileName}`);
    return info;
  }

  getOrLoadScriptInfo(fileName: string): ScriptInfo {
    let info = this.scriptInfos.get(fileName);
    if (info === undefined) {
      info = newScriptInfo(fileName, "");
      this.scriptInfos.set(fileName, info);
    }
    return info;
  }

  verifyCompletions(markerInput: MarkerInput, expected: CompletionsExpectedList | undefined): VerifyCompletionsResult {
    let list: CompletionList | undefined;
    if (typeof markerInput === "string") {
      this.goToMarker(markerInput);
      list = this.verifyCompletionsWorker(expected);
    } else if (markerInput instanceof Array) {
      for (const marker of markerInput) {
        if (typeof marker === "string") this.goToMarker(marker);
        else this.goToMarkerOrRange(marker);
        list = this.verifyCompletionsWorker(expected);
      }
    } else if (markerInput !== undefined) {
      this.goToMarkerOrRange(markerInput);
      list = this.verifyCompletionsWorker(expected);
    } else {
      list = this.verifyCompletionsWorker(expected);
    }

    return {
      andApplyCodeAction: (expectedAction) => {
        const item = list?.items.find(candidate =>
          candidate.label === expectedAction.name
          && candidate.data?.autoImport?.moduleSpecifier === expectedAction.source);
        if (item === undefined) {
          fail(`Code action '${expectedAction.name}' from '${expectedAction.source}' not found in completions.`);
        }
        if (item.detail !== undefined && !item.detail.includes(expectedAction.description)) {
          fail(`Completion detail for '${expectedAction.name}' does not contain '${expectedAction.description}'.`);
        }
        if (item.additionalTextEdits === undefined) {
          fail(`Completion '${expectedAction.name}' has no additional text edits.`);
        }
        this.applyTextEdits(this.activeFilename, textEditsToTextChanges(this.file(), item.additionalTextEdits));
        this.verifyCurrentFileContent(expectedAction.newFileContent);
      },
      andHasNoCodeAction: (unexpectedAction) => {
        const item = list?.items.find(candidate =>
          candidate.label === unexpectedAction.name
          && candidate.data?.autoImport?.moduleSpecifier === unexpectedAction.source);
        if (item !== undefined) {
          fail(`Unexpected code action '${unexpectedAction.name}' from '${unexpectedAction.source}' found in completions.`);
        }
      },
    };
  }

  verifyCompletionsWorker(expected: CompletionsExpectedList | undefined): CompletionList | undefined {
    const list = this.getCompletions(expected?.userPreferences);
    this.verifyCompletionsResult(list, expected, this.getCurrentPositionPrefix());
    return list;
  }

  getCompletions(userPreferences?: UserPreferences): CompletionList | undefined {
    const provider = this.completionProvider;
    if (provider === undefined) {
      throw new Error("Fourslash completion provider is not configured.");
    }
    const originalPreferences = this.userPreferences;
    if (userPreferences !== undefined) this.setUserPreferences(userPreferences);
    try {
      const list = provider.getCompletions(this.completionRequest());
      if (list === undefined) return undefined;
      return {
        ...list,
        items: [...list.items].sort(compareCompletionItems),
      };
    } finally {
      this.userPreferences = originalPreferences;
    }
  }

  verifyCompletionsResult(
    actual: CompletionList | undefined,
    expected: CompletionsExpectedList | undefined,
    prefix: string,
  ): void {
    if (actual === undefined) {
      if (!isEmptyExpectedList(expected)) fail(`${prefix}Expected completion list but got undefined.`);
      return;
    }
    if (expected === undefined) {
      if (actual.items.length === 0) return;
      fail(`${prefix}Expected undefined completion list but got ${stableStringify(actual)}.`);
    }
    if (actual.isIncomplete !== expected.isIncomplete) {
      fail(`${prefix}IsIncomplete mismatch: actual=${actual.isIncomplete} expected=${expected.isIncomplete}`);
    }
    verifyCompletionsItemDefaults(actual.itemDefaults, expected.itemDefaults, `${prefix}ItemDefaults mismatch: `);
    this.verifyCompletionsItems(prefix, actual.items, expected.items);
  }

  verifyCompletionsItems(
    prefix: string,
    actual: readonly CompletionItem[],
    expected: CompletionsExpectedItems | undefined,
  ): void {
    if (expected === undefined) {
      if (actual.length !== 0) fail(`${prefix}Expected no completions but got ${actual.length}.`);
      return;
    }
    if (expected.exact.length !== 0) {
      if (expected.includes.length !== 0 || expected.excludes.length !== 0 || expected.unsorted.length !== 0) {
        fail(`${prefix}Exact completions cannot be combined with includes, excludes, or unsorted.`);
      }
      if (actual.length !== expected.exact.length) {
        fail(`${prefix}Expected ${expected.exact.length} exact completion items but got ${actual.length}.`);
      }
      this.verifyCompletionsAreExactly(prefix, actual, expected.exact);
      return;
    }

    const nameToActualItems = completionItemsByLabel(actual);
    if (expected.unsorted.length !== 0) {
      if (expected.includes.length !== 0 || expected.excludes.length !== 0) {
        fail(`${prefix}Unsorted completions cannot be combined with includes or excludes.`);
      }
      for (const item of expected.unsorted) {
        removeMatchingCompletionItem(this, prefix, nameToActualItems, item);
      }
      if (actual.length !== expected.unsorted.length) {
        fail(`${prefix}Additional completions found but not included in unsorted: ${[...nameToActualItems.keys()].join(", ")}`);
      }
      return;
    }

    for (const item of expected.includes) {
      removeMatchingCompletionItem(this, prefix, nameToActualItems, item, false);
    }
    for (const exclude of expected.excludes) {
      if (nameToActualItems.has(exclude)) fail(`${prefix}Label '${exclude}' should not be in actual items but was found.`);
    }
  }

  verifyCompletionsAreExactly(
    prefix: string,
    actual: readonly CompletionItem[],
    expected: readonly CompletionsExpectedItem[],
  ): void {
    const actualLabels = actual.map(item => item.label);
    const expectedLabels = expected.map(getExpectedLabel);
    assertDeepEqual(actualLabels, expectedLabels, `${prefix}Labels mismatch`);
    for (let index = 0; index < actual.length; index += 1) {
      const expectedItem = expected[index]!;
      if (typeof expectedItem === "string") continue;
      const error = this.verifyCompletionItem(`${prefix}Completion item mismatch for label ${actual[index]!.label}`, actual[index]!, expectedItem);
      if (error !== "") fail(`${prefix}Completion item mismatch for label ${actual[index]!.label}:\n${error}`);
    }
  }

  verifyCompletionItem(prefix: string, actualInput: CompletionItem, expected: CompletionItem): string {
    let actual = actualInput;
    const actualAutoImportFix = actual.data?.autoImport;
    const expectedAutoImportFix = expected.data?.autoImport;
    if ((actualAutoImportFix === undefined) !== (expectedAutoImportFix === undefined)) {
      return "Mismatch in auto-import data presence";
    }
    if (expected.detail !== undefined || expected.documentation !== undefined || actualAutoImportFix !== undefined) {
      actual = this.resolveCompletionItem(actual);
    }
    if (actualAutoImportFix !== undefined && expectedAutoImportFix !== undefined) {
      const diff = diffJson(
        omitCompletionFields(actual, autoImportCompletionIgnoreFields),
        omitCompletionFields(expected, autoImportCompletionIgnoreFields),
      );
      if (diff !== "") return diff;
      if (expected.additionalTextEdits === AnyTextEdits && (actual.additionalTextEdits?.length ?? 0) === 0) {
        return "Expected non-empty AdditionalTextEdits for auto-import completion item";
      }
      if (expected.labelDetails !== undefined) {
        const labelDiff = diffJson(actual.labelDetails, expected.labelDetails);
        if (labelDiff !== "") return `LabelDetails mismatch:\n${labelDiff}`;
      }
      if (actualAutoImportFix.moduleSpecifier !== expectedAutoImportFix.moduleSpecifier) return "ModuleSpecifier mismatch";
    } else {
      const diff = diffJson(
        omitCompletionFields(actual, completionIgnoreFields),
        omitCompletionFields(expected, completionIgnoreFields),
      );
      if (diff !== "") return diff;
      if (expected.additionalTextEdits !== AnyTextEdits) {
        const editDiff = diffJson(actual.additionalTextEdits, expected.additionalTextEdits);
        if (editDiff !== "") return `AdditionalTextEdits mismatch:\n${editDiff}`;
      }
    }
    if (expected.filterText !== undefined) {
      const diff = diffJson(actual.filterText, expected.filterText);
      if (diff !== "") return `FilterText mismatch:\n${diff}`;
    }
    if (expected.kind !== undefined) {
      const diff = diffJson(actual.kind, expected.kind);
      if (diff !== "") return `Kind mismatch:\n${diff}`;
    }
    const sortTextDiff = diffJson(actual.sortText, expected.sortText ?? defaultCompletionSortText);
    if (sortTextDiff !== "") return `SortText mismatch:\n${sortTextDiff}`;
    return prefix.length >= 0 ? "" : "";
  }

  resolveCompletionItem(item: CompletionItem): CompletionItem {
    const provider = this.completionProvider;
    if (provider?.resolveCompletionItem === undefined) return item;
    return provider.resolveCompletionItem(item, this.completionRequest());
  }

  verifyCodeFix(options: VerifyCodeFixOptions): void {
    const originalPreferences = this.userPreferences;
    if (options.userPreferences !== undefined) this.setUserPreferences(options.userPreferences);
    try {
      const actions = this.getCodeFixActions();
      if (actions.length === 0) fail("No code fixes returned.");
      if (options.index >= actions.length) fail(`Code fix index ${options.index} out of range (got ${actions.length} fixes).`);
      const action = findCodeActionByDescription(actions, options.description, options.index);
      if (action === undefined) {
        fail(`No code fix with description ${JSON.stringify(options.description)} at index ${options.index} found. Available fixes: ${actionTitles(actions).join(", ")}`);
      }

      const originalContent = this.file().text();
      const expectedContent = options.newRangeContent === ""
        ? options.newFileContent
        : this.expectedContentWithRangeReplacement(originalContent, options.newRangeContent);
      if (options.applyChanges) {
        this.applyCodeActionEditsForActiveFile(action);
        this.verifyCurrentFileContent(expectedContent);
      } else {
        const actual = this.applyEditsToContent(originalContent, this.getCodeActionEditsForActiveFile(action));
        if (actual !== expectedContent) {
          fail(`File content after applying code fix did not match expected content.\nactual:\n${actual}\nexpected:\n${expectedContent}`);
        }
      }
    } finally {
      this.userPreferences = originalPreferences;
    }
  }

  verifyRangeAfterCodeFix(expectedText: string, includeWhitespace: boolean, errorCode: number, index: number): void {
    const actions = this.getCodeFixActions(errorCode);
    if (actions.length === 0) fail("No code fixes returned.");
    if (index >= actions.length) fail(`Code fix index ${index} out of range (got ${actions.length} fixes).`);
    const ranges = this.getRangesInFile(this.activeFilename);
    if (ranges.length !== 1) fail(`Expected exactly one range in ${this.activeFilename}, got ${ranges.length}.`);
    const edits = this.getCodeActionEditsForActiveFile(actions[index]!);
    const updatedRange = this.updateTextRangeForTextEdits(ranges[0]!.range, edits);
    assertValidTextRange(updatedRange, `Code fix ${JSON.stringify(actions[index]!.title)} replaced part of the expected range; unable to compute rangeAfterCodeFix result.`);
    this.applyTextEdits(this.activeFilename, textEditsToTextChanges(this.file(), edits));
    let actual = this.file().text().slice(updatedRange.pos, updatedRange.end);
    let expected = expectedText;
    if (!includeWhitespace) {
      actual = removeWhitespace(actual);
      expected = removeWhitespace(expected);
    }
    if (actual !== expected) fail(`Range content after applying code fix did not match.\nactual:${actual}\nexpected:${expected}`);
  }

  getCodeActionEditsForActiveFile(action: CodeAction): readonly TextEdit[] {
    const changes = action.edit?.changes;
    if (changes === undefined) fail(`Code fix ${JSON.stringify(action.title)} did not return text edits.`);
    const entries = Object.entries(changes);
    if (entries.length !== 1) fail(`Code fix ${JSON.stringify(action.title)} returned edits for multiple files.`);
    const activeUri = fileNameToDocumentURI(this.activeFilename);
    const edits = changes[activeUri] ?? changes[this.activeFilename];
    if (edits === undefined) fail(`Code fix ${JSON.stringify(action.title)} did not return edits for active file ${this.activeFilename}.`);
    return edits;
  }

  verifyCodeFixAvailable(expectedDescriptions?: readonly string[]): void {
    const actions = this.getCodeFixActions();
    if (expectedDescriptions === undefined) {
      if (actions.length === 0) fail("Expected code fixes to be available, but got none.");
      return;
    }
    if (expectedDescriptions.length === 0) {
      this.verifyCodeFixNotAvailable();
      return;
    }
    for (const expected of expectedDescriptions) {
      if (!actions.some(action => action.title === expected)) {
        fail(`Expected code fix ${JSON.stringify(expected)} not found. Available fixes: ${actionTitles(actions).join(", ")}`);
      }
    }
  }

  verifyCodeFixNotAvailable(...expected: readonly string[]): void {
    const actions = this.getCodeFixActions();
    if (expected.length === 0) {
      if (actions.length !== 0) fail(`Expected no code fixes, but got: ${actionTitles(actions).join(", ")}`);
      return;
    }
    for (const title of expected) {
      if (actions.some(action => action.title === title)) {
        fail(`Expected code fix with description ${JSON.stringify(title)} not to be available.`);
      }
    }
  }

  verifyCodeFixAvailableExact(expectedDescriptions: readonly string[]): void {
    const actions = this.getCodeFixActions();
    if (actions.length !== expectedDescriptions.length) {
      fail(`Expected exactly ${expectedDescriptions.length} code fixes, got ${actions.length}. Available fixes: ${actionTitles(actions).join(", ")}`);
    }
    this.verifyCodeFixAvailable(expectedDescriptions);
  }

  verifyCodeFixAll(options: VerifyCodeFixAllOptions): void {
    const actions = this.getAllQuickFixActions();
    if (actions.length === 0) fail(`No code fixes available for fixId ${JSON.stringify(options.fixId)}.`);
    const fixAllCandidates = actions.filter(action => (action.diagnostics?.length ?? 0) === 0);
    const fixAllAction = fixAllCandidates.length === 1
      ? fixAllCandidates[0]
      : fixAllCandidates.find(action => action.title.toLowerCase().includes(options.fixId.toLowerCase()));
    if (fixAllAction === undefined) fail(`No fix-all code action found for fixId ${JSON.stringify(options.fixId)}. Available fixes: ${actionTitles(actions).join(", ")}`);
    this.applyCodeActionEditsForActiveFile(fixAllAction);
    this.verifyCurrentFileContent(options.newFileContent);
  }

  verifySourceFixAll(expectedContent: string): void {
    const provider = this.codeFixProvider;
    if (provider?.getSourceFixAllActions === undefined) throw new Error("Fourslash source.fixAll provider is not configured.");
    const actions = provider.getSourceFixAllActions(this.codeFixRequest(undefined));
    const selected = actions.find(action => action.kind === "source.fixAll");
    if (selected === undefined) fail("No source.fixAll code action found.");
    this.applyCodeActionEditsForActiveFile(selected);
    this.verifyCurrentFileContent(expectedContent);
  }

  getCodeFixActions(errorCode?: number): readonly CodeAction[] {
    const actions = this.getAllQuickFixActions(errorCode);
    return actions.filter(action => (action.diagnostics?.length ?? 0) > 0);
  }

  getAllQuickFixActions(errorCode?: number): readonly CodeAction[] {
    const provider = this.codeFixProvider;
    if (provider === undefined) throw new Error("Fourslash code-fix provider is not configured.");
    const request = this.codeFixRequest(errorCode);
    const actions = provider.getAllQuickFixActions?.(request) ?? provider.getCodeFixActions(request);
    const diagnostic = selectCodeFixDiagnostic(this.getDiagnostics(this.activeFilename), errorCode);
    if (diagnostic === undefined) return actions;
    return actions.filter(action => (action.diagnostics ?? []).length === 0 || (action.diagnostics ?? []).some(candidate => diagnosticCode(candidate) === diagnosticCode(diagnostic)));
  }

  updateTextRangeForTextEdits(range: TextRange, edits: readonly TextEdit[]): TextRange | undefined {
    let start = range.pos;
    let end = range.end;
    for (const edit of [...edits].sort((left, right) => textEditStartOffset(this.file(), left) - textEditStartOffset(this.file(), right))) {
      const editStart = textEditStartOffset(this.file(), edit);
      const editEnd = textEditEndOffset(this.file(), edit);
      if (editEnd <= start) {
        start = updatePositionForTextEdit(start, editStart, editEnd, edit.newText.length);
        end = updatePositionForTextEdit(end, editStart, editEnd, edit.newText.length);
        if (start < 0 || end < 0) return undefined;
      } else if (editStart >= end) {
        continue;
      } else if (editStart <= start && editEnd >= end) {
        return new TextRange(editStart, editStart + edit.newText.length);
      } else {
        return undefined;
      }
    }
    return new TextRange(start, end);
  }

  applyEditsToContent(content: string, edits: readonly TextEdit[]): string {
    let result = content;
    const script = this.file();
    const changes = [...textEditsToTextChanges(script, edits)]
      .sort((left, right) => right.span.pos - left.span.pos || right.span.end - left.span.end);
    for (const change of changes) result = applyTextChange(result, change);
    return result;
  }

  verifyOrganizeImports(expectedContent: string, codeActionKind: CodeActionKind = "source.organizeImports", preferences?: UserPreferences): void {
    const provider = this.languageProviderRequired("organize imports");
    const originalPreferences = this.userPreferences;
    if (preferences !== undefined) this.setUserPreferences(preferences);
    try {
      const action = provider.organizeImports?.(this.activeFilename, codeActionKind, this.userPreferences);
      if (action === undefined) fail(`No organize imports code action found for ${codeActionKind}.`);
      this.applyCodeActionEditsForActiveFile(action);
      this.verifyCurrentFileContent(expectedContent);
    } finally {
      this.userPreferences = originalPreferences;
    }
  }

  verifyApplyCodeActionFromCompletion(markerName: string | undefined, options: ApplyCodeActionFromCompletionOptions): void {
    if (markerName !== undefined) this.goToMarker(markerName);
    const originalPreferences = this.userPreferences;
    this.setUserPreferences(options.userPreferences ?? { includeCompletionsForModuleExports: true });
    try {
      const completions = this.getCompletions();
      const matchingItems = completions?.items.filter(item => {
        const autoImport = item.data?.autoImport;
        if (item.label !== options.name) return false;
        if (autoImport?.moduleSpecifier === options.source) return true;
        const source = item.data?.source;
        return autoImport === undefined && source === options.source;
      }) ?? [];
      if (matchingItems.length === 0) {
        fail(`Code action '${options.name}' from source '${options.source}' not found in completions.`);
      }

      const resolved = matchingItems
        .map(item => this.resolveCompletionItem(item))
        .find(item => (item.detail ?? "").includes(options.description) && (item.additionalTextEdits?.length ?? 0) > 0);
      if (resolved === undefined) {
        fail(`No completion code action matched '${options.description}' for '${options.name}' from '${options.source}'.`);
      }

      this.applyTextEdits(this.activeFilename, textEditsToTextChanges(this.file(), resolved.additionalTextEdits ?? []));
      if (options.newFileContent !== undefined) {
        this.verifyCurrentFileContent(options.newFileContent);
      } else if (options.newRangeContent !== undefined) {
        const expected = this.expectedContentWithRangeReplacement(this.file().text(), options.newRangeContent);
        this.verifyCurrentFileContent(expected);
      }
    } finally {
      this.userPreferences = originalPreferences;
    }
  }

  verifyImportFixAtPosition(expectedTexts: readonly string[], preferences?: UserPreferences): void {
    const provider = this.languageProviderRequired("import fixes");
    const originalPreferences = this.userPreferences;
    if (preferences !== undefined) this.setUserPreferences(preferences);
    try {
      const request = this.languageRequest();
      const actions = provider.getImportFixes?.(request, this.getDiagnostics(this.activeFilename)) ?? [];
      if (actions.length === 0) {
        if (expectedTexts.length !== 0) fail("No import fixes returned.");
        return;
      }

      const range = this.getRangesInFile(this.activeFilename)[0];
      const originalContent = this.file().text();
      const actualTexts: string[] = [];
      for (const action of actions) {
        this.applyWorkspaceEditFromAction(action);
        actualTexts.push(range === undefined ? this.file().text() : this.file().text().slice(range.range.pos, range.range.end));
        this.replaceWorker(this.activeFilename, 0, this.file().text().length, originalContent);
        this.currentCaretPosition = request.position;
      }
      assertDeepEqual(actualTexts, expectedTexts, "Import fix text mismatch");
    } finally {
      this.userPreferences = originalPreferences;
    }
  }

  verifyImportFixModuleSpecifiers(markerName: string, expectedModuleSpecifiers: readonly string[], preferences?: UserPreferences): void {
    this.goToMarker(markerName);
    const provider = this.languageProviderRequired("import fixes");
    const originalPreferences = this.userPreferences;
    if (preferences !== undefined) this.setUserPreferences(preferences);
    try {
      const actions = provider.getImportFixes?.(this.languageRequest(), this.getDiagnostics(this.activeFilename)) ?? [];
      const actual = uniqueStrings(actions.flatMap(action => {
        const edits = this.getWorkspaceEditTextEdits(action.edit);
        return edits.map(edit => extractModuleSpecifier(edit.newText)).filter(value => value !== "");
      }));
      assertDeepEqual(actual, expectedModuleSpecifiers, "Import fix module specifier mismatch");
    } finally {
      this.userPreferences = originalPreferences;
    }
  }

  verifyBaselineFindAllReferences(...markers: readonly string[]): void {
    const provider = this.languageProviderRequired("find all references");
    for (const markerOrRange of this.lookupMarkersOrGetRanges(markers)) {
      this.goToMarkerOrRange(markerOrRange);
      const locations = provider.getReferences?.(this.languageRequest(), true) ?? [];
      this.baseline({ name: "findAllReferences", arguments: [] }, this.formatLocationsBaseline("/*FIND ALL REFS*/", locations));
    }
  }

  verifyBaselineGoToDefinition(includeOriginalSelectionRange = false, ...markers: readonly string[]): void {
    this.verifyBaselineDefinitionWorker("goToDefinition", "/*GOTO DEF*/", provider => provider.getDefinition, includeOriginalSelectionRange, markers);
  }

  verifyBaselineGoToImplementation(...markers: readonly string[]): void {
    this.verifyBaselineDefinitionWorker("goToImplementation", "/*GOTO IMPL*/", provider => provider.getImplementation, false, markers);
  }

  verifyBaselineGoToTypeDefinition(...markers: readonly string[]): void {
    this.verifyBaselineDefinitionWorker("goToTypeDefinition", "/*GOTO TYPE*/", provider => provider.getTypeDefinition, false, markers);
  }

  verifyBaselineGoToSourceDefinition(...markers: readonly string[]): void {
    this.verifyBaselineDefinitionWorker("goToSourceDefinition", "/*GOTO SOURCE DEF*/", provider => provider.getSourceDefinition, false, markers);
  }

  verifyBaselineWorkspaceSymbol(query: string): void {
    const provider = this.languageProviderRequired("workspace symbols");
    const symbols = provider.getWorkspaceSymbols?.(query) ?? [];
    this.baseline({ name: "workspaceSymbol", arguments: [query] }, symbols.map(symbol => {
      return `${symbol.name} ${symbolKindToLowercase(symbol.kind)} ${symbol.location.uri}:${formatRange(symbol.location.range)}${symbol.containerName === undefined ? "" : ` ${symbol.containerName}`}`;
    }).join("\n"));
  }

  verifyWorkspaceSymbol(cases: readonly VerifyWorkspaceSymbolCase[]): void {
    const provider = this.languageProviderRequired("workspace symbols");
    for (const expected of cases) {
      const pattern = expected.pattern ?? "";
      const symbols = provider.getWorkspaceSymbols?.(pattern) ?? [];
      if (expected.includes !== undefined) {
        if (expected.exact !== undefined) fail("Workspace symbol case cannot have both includes and exact expectations.");
        verifyIncludesSymbols(symbols, expected.includes, `Workspace symbols mismatch with pattern '${pattern}'`);
        continue;
      }
      if (expected.exact !== undefined) {
        verifyExactSymbols(symbols, expected.exact, `Workspace symbols mismatch with pattern '${pattern}'`);
        continue;
      }
      if (expected.name === undefined) fail("Workspace symbol case must provide name, includes, or exact.");
      const match = symbols.find(symbol =>
        symbol.name === expected.name
        && (expected.kind === undefined || symbol.kind === expected.kind)
        && (expected.containerName === undefined || symbol.containerName === expected.containerName)
        && (expected.fileName === undefined || symbol.location.uri === expected.fileName || symbol.location.uri === fileNameToDocumentURI(expected.fileName)));
      if (match === undefined) fail(`Workspace symbol ${JSON.stringify(expected)} not found.`);
    }
  }

  verifyBaselineCodeLens(preferences?: UserPreferences): void {
    const provider = this.languageProviderRequired("code lens");
    const originalPreferences = this.userPreferences;
    if (preferences !== undefined) this.setUserPreferences(preferences);
    try {
      let foundAtLeastOneCodeLens = false;
      for (const fileName of [...this.openFiles].sort()) {
        const codeLenses = provider.getCodeLenses?.(fileName) ?? [];
        if (codeLenses.length === 0) continue;
        foundAtLeastOneCodeLens = true;

        for (const unresolvedCodeLens of codeLenses) {
          const resolvedCodeLens = provider.resolveCodeLens?.(unresolvedCodeLens) ?? unresolvedCodeLens;
          const command = resolvedCodeLens.command;
          if (command === undefined) fail("Expected resolved code lens to have a command.");
          if (command.command !== "" && command.command !== showCodeLensLocationsCommandName) {
            fail(`Unexpected code lens command ${JSON.stringify(command.command)}.`);
          }
          const locations = locationsFromCodeLensArguments(command.arguments);
          const markerName = `/*CODELENS: ${command.title}*/`;
          this.baseline({ name: "codeLenses", arguments: [] }, this.formatLocationsBaseline(markerName, [
            { uri: fileNameToDocumentURI(fileName), range: resolvedCodeLens.range },
            ...locations,
          ]));
        }
      }

      if (!foundAtLeastOneCodeLens) fail("Expected at least one code lens in any open file, but got none.");
    } finally {
      this.userPreferences = originalPreferences;
    }
  }

  verifyOutliningSpans(kind?: string): void {
    const provider = this.languageProviderRequired("folding ranges");
    const ranges = provider.getFoldingRanges?.(this.activeFilename) ?? [];
    const actual = kind === undefined ? ranges : ranges.filter(range => range.kind === kind);
    const expected = [...this.ranges()].sort((left, right) => comparePositions(left.lsRange.start, right.lsRange.start));
    if (actual.length !== expected.length) {
      fail(`Expected ${expected.length} folding ranges, got ${actual.length}.`);
    }
    for (let index = 0; index < expected.length; index += 1) {
      const got = actual[index]!;
      const want = expected[index]!.lsRange;
      const start = { line: got.startLine, character: got.startCharacter ?? 0 };
      const end = { line: got.endLine, character: got.endCharacter ?? 0 };
      if (comparePositions(start, want.start) !== 0 || comparePositions(end, want.end) !== 0) {
        fail(`Folding range ${index} mismatch: actual=${formatRange({ start, end })} expected=${formatRange(want)}`);
      }
    }
  }

  verifyFoldingRangeLines(expected: readonly FoldingRangeLineExpected[]): void {
    const provider = this.languageProviderRequired("folding ranges");
    const actual = provider.getFoldingRanges?.(this.activeFilename) ?? [];
    if (actual.length !== expected.length) fail(`Expected ${expected.length} folding ranges, got ${actual.length}.`);
    for (let index = 0; index < expected.length; index += 1) {
      const got = actual[index]!;
      const want = expected[index]!;
      if (got.startLine !== want.startLine || got.endLine !== want.endLine) {
        fail(`Folding range ${index} line mismatch: actual=${got.startLine}-${got.endLine} expected=${want.startLine}-${want.endLine}`);
      }
    }
  }

  verifyBaselineHover(): void {
    const provider = this.languageProviderRequired("hover");
    const rows = this.markers()
      .filter(marker => marker.getName() !== undefined)
      .map(marker => {
        const hover = provider.getHover?.(this.languageRequestAt(marker.fileName(), marker.lsPos()));
        return `${marker.getName() ?? ""}: ${hover === undefined ? "No hover" : hoverContentString(hover)}`;
      });
    this.baseline({ name: "quickInfo", arguments: [] }, rows.join("\n"));
  }

  verifyBaselineHoverWithVerbosity(verbosityLevels: ReadonlyMap<string, readonly number[]> | Readonly<Record<string, readonly number[]>>): void {
    const provider = this.languageProviderRequired("hover");
    const rows: string[] = [];
    for (const marker of this.markers()) {
      const name = marker.getName();
      if (name === undefined) continue;
      const levels = verbosityLookup(verbosityLevels, name) ?? [0];
      let previous: Hover | undefined;
      for (const level of levels) {
        const hover = provider.getHover?.(this.languageRequestAt(marker.fileName(), marker.lsPos()), level);
        if (previous !== undefined && previous.canIncreaseVerbosity === false && hoverContentString(previous) !== hoverContentString(hover)) {
          fail(`Hover at ${name} changed at verbosity ${level} after canIncreaseVerbosity=false.`);
        }
        rows.push(`${name}@${level}: ${hover === undefined ? "No hover" : hoverContentString(hover)}`);
        previous = hover;
      }
    }
    this.baseline({ name: "quickInfo", arguments: ["verbosity"] }, rows.join("\n"));
  }

  verifyBaselineSignatureHelp(): void {
    const provider = this.languageProviderRequired("signature help");
    const rows = this.markers()
      .filter(marker => marker.getName() !== undefined)
      .map(marker => {
        const help = provider.getSignatureHelp?.(this.languageRequestAt(marker.fileName(), marker.lsPos()));
        return `${marker.getName() ?? ""}: ${formatSignatureHelp(help).join("\n")}`;
      });
    this.baseline({ name: "signatureHelp", arguments: [] }, rows.join("\n\n"));
  }

  verifyJsxClosingTag(markersToNewText: Readonly<Record<string, string | undefined>>): void {
    const provider = this.languageProviderRequired("JSX closing tag");
    for (const [markerName, expected] of Object.entries(markersToNewText)) {
      this.goToMarker(markerName);
      const actual = provider.getJsxClosingTag?.(this.languageRequest());
      if (actual !== expected) {
        fail(`JSX closing tag mismatch at ${markerName}: actual=${JSON.stringify(actual)} expected=${JSON.stringify(expected)}`);
      }
    }
  }

  verifyBaselineClosingTags(): void {
    const provider = this.languageProviderRequired("JSX closing tag");
    const rows = this.markers()
      .filter(marker => marker.getName() !== undefined)
      .map(marker => {
        const tag = provider.getJsxClosingTag?.(this.languageRequestAt(marker.fileName(), marker.lsPos()));
        return `${marker.getName() ?? ""}: ${tag ?? "<none>"}`;
      });
    this.baseline({ name: "closingTags", arguments: [] }, rows.join("\n"));
  }

  verifySignatureHelp(expected: VerifySignatureHelpOptions): void {
    const help = this.getSignatureHelpAtCurrentPosition();
    if (help === undefined) fail("Expected signature help but got none.");
    const labels = help.signatures.map(signature => signature.label);
    assertDeepEqual(labels, expected.signatures, "Signature help labels mismatch");
    if (expected.activeSignature !== undefined && help.activeSignature !== expected.activeSignature) {
      fail(`Active signature mismatch: actual=${String(help.activeSignature)} expected=${expected.activeSignature}`);
    }
    const active = activeSignature(help);
    const activeParameter = activeParameterIndex(help, active);
    if (expected.activeParameter !== undefined && activeParameter !== expected.activeParameter) {
      fail(`Active parameter mismatch: actual=${String(activeParameter)} expected=${expected.activeParameter}`);
    }
    if (expected.docComment !== undefined && !documentationText(active?.documentation).includes(expected.docComment)) {
      fail(`Signature documentation did not contain ${JSON.stringify(expected.docComment)}.`);
    }
    if (expected.parameterDocComment !== undefined) {
      const parameter = active?.parameters?.[activeParameter ?? -1];
      if (!documentationText(parameter?.documentation).includes(expected.parameterDocComment)) {
        fail(`Parameter documentation did not contain ${JSON.stringify(expected.parameterDocComment)}.`);
      }
    }
  }

  verifyNoSignatureHelp(): void {
    if (this.getSignatureHelpAtCurrentPosition() !== undefined) fail("Expected no signature help.");
  }

  verifyNoSignatureHelpWithContext(context?: SignatureHelpContext): void {
    const help = this.getSignatureHelpAtCurrentPosition(context);
    if (help !== undefined && help.signatures.length > 0) {
      fail(`${this.getCurrentPositionPrefix()}Expected no signature help, but got ${help.signatures.length} signatures.`);
    }
  }

  verifyNoSignatureHelpForMarkersWithContext(context: SignatureHelpContext | undefined, ...markers: readonly string[]): void {
    for (const marker of markers) {
      this.goToMarker(marker);
      this.verifyNoSignatureHelpWithContext(context);
    }
  }

  verifySignatureHelpPresent(context?: SignatureHelpContext): void {
    const help = this.getSignatureHelpAtCurrentPosition(context);
    if (help === undefined || help.signatures.length === 0) fail(`${this.getCurrentPositionPrefix()}Expected signature help to be present, but got none.`);
  }

  verifySignatureHelpPresentForMarkers(context: SignatureHelpContext | undefined, ...markers: readonly string[]): void {
    for (const marker of markers) {
      this.goToMarker(marker);
      this.verifySignatureHelpPresent(context);
    }
  }

  verifyNoSignatureHelpForMarkers(...markers: readonly string[]): void {
    for (const marker of markers) {
      this.goToMarker(marker);
      this.verifyNoSignatureHelp();
    }
  }

  verifySignatureHelpWithCases(...signatureHelpCases: readonly SignatureHelpCase[]): void {
    for (const option of signatureHelpCases) {
      this.forEachMarkerInput(option.markerInput, () => this.verifySignatureHelpResult(
        this.getSignatureHelpAtCurrentPosition(option.context),
        option.expected,
        this.getCurrentPositionPrefix(),
      ));
    }
  }

  verifySignatureHelpResult(actual: SignatureHelp | undefined, expected: SignatureHelp | undefined, prefix: string): void {
    assertDeepEqual(actual, expected, `${prefix} SignatureHelp mismatch`);
  }

  baselineAutoImportsCompletions(markerNames: readonly string[]): void {
    const reset = this.configureWithReset({
      ...this.userPreferences,
      includeCompletionsForModuleExports: true,
      includeCompletionsForImportStatements: true,
    });
    try {
      for (const markerName of markerNames) {
        this.goToMarker(markerName);
        const completions = this.getCompletions();
        const fileContent = this.file().text();
        const marker = this.marker(markerName);
        const language = autoImportBaselineLanguage(this.activeFilename);
        const rows = [
          "// === Auto Imports === ",
          codeFence(language, `// @FileName: ${this.activeFilename}\n${fileContent.slice(0, marker.position)}/*${markerName}*/${fileContent.slice(marker.position)}`),
        ];
        const autoImportItems = completions?.items.filter(isAutoImportCompletionItem) ?? [];
        if (autoImportItems.length === 0) {
          rows.push("no autoimport completions found");
          this.baseline({ name: "autoImports", arguments: [] }, rows.join("\n\n"));
          continue;
        }
        for (const item of autoImportItems) {
          const details = this.resolveCompletionItem(item);
          if ((details.additionalTextEdits?.length ?? 0) === 0) {
            fail(`At marker '${markerName}': Entry ${item.label} returned no code changes from completion details request.`);
          }
          const newFileContent = applyTextEditsToContent(this.file(), fileContent, details.additionalTextEdits ?? []);
          rows.push(codeFence(language, newFileContent));
        }
        this.baseline({ name: "autoImports", arguments: [] }, rows.join("\n\n"));
      }
    } finally {
      reset();
    }
  }

  verifyBaselineCallHierarchy(): void {
    const provider = this.languageProviderRequired("call hierarchy");
    const items = provider.prepareCallHierarchy?.(this.languageRequest()) ?? [];
    if (items.length === 0) {
      this.baseline({ name: "callHierarchy", arguments: [] }, "No call hierarchy items available");
      return;
    }

    const rows: string[] = [];
    for (const item of items) {
      formatCallHierarchyItem(this, provider, rows, item, "root", new Set<string>(), "");
    }
    this.baseline({ name: "callHierarchy", arguments: [] }, rows.join("\n").replace(/\n$/u, ""));
  }

  verifyBaselineSelectionRanges(): void {
    const provider = this.languageProviderRequired("selection ranges");
    const rows: string[] = [];
    for (const marker of this.markers()) {
      const ranges = provider.getSelectionRanges?.(marker.fileName(), [marker.lsPos()]) ?? [];
      rows.push(`${marker.getName() ?? "<anonymous>"}:\n${ranges.map(range => formatSelectionRangeChain(range)).join("\n")}`);
    }
    this.baseline({ name: "smartSelection", arguments: [] }, rows.join("\n\n"));
  }

  verifyBaselineDocumentHighlights(preferences?: UserPreferences, ...markerOrRangeOrNames: readonly MarkerOrRangeOrName[]): void {
    this.verifyBaselineDocumentHighlightsWithOptions(preferences, undefined, ...markerOrRangeOrNames);
  }

  verifyBaselineDocumentHighlightsWithOptions(
    preferences: UserPreferences | undefined,
    filesToSearch: readonly string[] | undefined,
    ...markerOrRangeOrNames: readonly MarkerOrRangeOrName[]
  ): void {
    const provider = this.languageProviderRequired("document highlights");
    const originalPreferences = this.userPreferences;
    if (preferences !== undefined) this.setUserPreferences(preferences);
    try {
      const locations = markerOrRangeOrNames.length === 0 ? this.lookupMarkersOrGetRanges([]) : markerOrRangeOrNames.map(item => this.resolveMarkerOrRange(item));
      for (const markerOrRange of locations) {
        this.goToMarkerOrRange(markerOrRange);
        const searchUris = filesToSearch?.map(fileName => fileNameToDocumentURI(fileName));
        const highlights = provider.getDocumentHighlights?.(this.languageRequest(), searchUris) ?? [];
        const header = filesToSearch === undefined ? "" : `// filesToSearch:\n${filesToSearch.map(fileName => `//   ${fileName}`).join("\n")}\n\n`;
        this.baseline({ name: "documentHighlights", arguments: [] }, header + this.formatLocationsBaseline("/*HIGHLIGHTS*/", highlights));
      }
    } finally {
      this.userPreferences = originalPreferences;
    }
  }

  verifyDiagnostics(expected: readonly Diagnostic[]): void {
    assertDeepEqual(this.getDiagnostics(this.activeFilename), expected, "Diagnostics mismatch");
  }

  verifyNonSuggestionDiagnostics(expected: readonly Diagnostic[]): void {
    this.verifyDiagnostics(expected);
  }

  verifySuggestionDiagnostics(expected: readonly Diagnostic[]): void {
    this.verifyDiagnostics(expected);
  }

  verifyBaselineNonSuggestionDiagnostics(): void {
    const files: FourslashDiagnosticFile[] = [];
    const diagnostics: FourslashDiagnostic[] = [];
    for (const [fileName, scriptInfo] of [...this.scriptInfos].sort(([left], [right]) => left.localeCompare(right))) {
      if (fileExtensionIs(fileName, extensionJson)) continue;
      files.push(new FourslashDiagnosticFile(fileName, scriptInfo.text()));
      for (const diagnostic of this.getDiagnostics(fileName)) {
        if (!isSuggestionDiagnostic(diagnostic)) diagnostics.push(this.toDiagnostic(scriptInfo, diagnostic));
      }
    }
    diagnostics.sort(compareDiagnostics);
    const fileHeaders = files.map(file => `// @FileName: ${file.fileName()}`).join("\n");
    const diagnosticText = diagnostics.map(formatFourslashDiagnostic).join("\n");
    this.baseline({ name: "errors", arguments: [] }, [fileHeaders, diagnosticText].filter(text => text !== "").join("\n\n"));
  }

  verifyBaselineDocumentSymbol(): void {
    const provider = this.languageProviderRequired("document symbols");
    const result = provider.getDocumentSymbols?.(this.activeFilename) ?? [];
    if (isDocumentSymbolList(result)) {
      const uri = fileNameToDocumentURI(this.activeFilename);
      const spansToSymbol = new Map<string, readonly [DocumentSpan, DocumentSymbol]>();
      for (const symbol of result) collectDocumentSymbolSpans(uri, symbol, spansToSymbol);
      const locations = [...spansToSymbol.values()].map(([span, symbol]) => {
        const location = { uri: span.uri, range: span.textSpan };
        return `${symbolLocationData(symbol)} ${span.uri}:${formatRange(span.textSpan)}\n${this.locationSourceLine(location)}`;
      }).join("\n");
      const details = writeDocumentSymbolDetails(result, 0);
      this.baseline({ name: "documentSymbol", arguments: [] }, `${locations}\n\n// === Details ===\n${details}`.trim());
    } else {
      this.baseline({ name: "documentSymbol", arguments: [] }, formatDocumentSymbols(result));
    }
  }

  verifyNumberOfErrorsInCurrentFile(expectedCount: number): void {
    const count = this.getDiagnostics(this.activeFilename).length;
    if (count !== expectedCount) fail(`Expected ${expectedCount} diagnostics in current file, got ${count}.`);
  }

  verifyNoErrors(): void {
    const errors = [...this.openFiles].flatMap(fileName => this.getDiagnostics(fileName).filter(diagnostic => !isSuggestionDiagnostic(diagnostic)));
    if (errors.length !== 0) fail(`Expected no errors but found ${errors.length}: ${errors.map(formatDiagnostic).join("; ")}`);
  }

  verifyErrorExistsAtRange(rangeMarker: RangeMarker, code: number, message = ""): void {
    const diagnostics = this.getDiagnostics(rangeMarker.fileName());
    for (const diagnostic of diagnostics) {
      if (diagnosticCode(diagnostic) !== code) continue;
      if (!rangesEqual(diagnostic.range, rangeMarker.lsRange)) continue;
      if (message !== "" && diagnostic.message !== message) {
        fail(`Error at range has code ${code} but message mismatch. Expected: ${JSON.stringify(message)}, Got: ${JSON.stringify(diagnostic.message)}`);
      }
      return;
    }
    fail(`Expected error with code ${code} at range ${formatRange(rangeMarker.lsRange)} but it was not found`);
  }

  verifyErrorExistsBetweenMarkers(startMarkerName: string, endMarkerName: string): void {
    const startMarker = this.marker(startMarkerName);
    const endMarker = this.marker(endMarkerName);
    if (startMarker.fileName() !== endMarker.fileName()) {
      fail(`Markers '${startMarkerName}' and '${endMarkerName}' are in different files`);
    }
    const start = startMarker.position;
    const end = endMarker.position;
    const script = this.getScriptInfo(startMarker.fileName());
    for (const diagnostic of this.getDiagnostics(startMarker.fileName())) {
      if (isSuggestionDiagnostic(diagnostic)) continue;
      const diagnosticStart = offsetFromPosition(script, diagnostic.range.start);
      const diagnosticEnd = offsetFromPosition(script, diagnostic.range.end);
      if (diagnosticStart >= start && diagnosticEnd <= end) return;
    }
    fail(`Expected error between markers '${startMarkerName}' and '${endMarkerName}' but none was found`);
  }

  verifyErrorExistsAfterMarker(markerName = ""): void {
    const [fileName, markerPosition] = markerName === ""
      ? [this.activeFilename, offsetFromPosition(this.getScriptInfo(this.activeFilename), this.currentCaretPosition)] as const
      : [this.marker(markerName).fileName(), this.marker(markerName).position] as const;
    const script = this.getScriptInfo(fileName);
    for (const diagnostic of this.getDiagnostics(fileName)) {
      if (isSuggestionDiagnostic(diagnostic)) continue;
      if (offsetFromPosition(script, diagnostic.range.start) >= markerPosition) return;
    }
    fail(`Expected error after marker '${markerName}' but none was found`);
  }

  verifyErrorExistsBeforeMarker(markerName = ""): void {
    const [fileName, markerPosition] = markerName === ""
      ? [this.activeFilename, offsetFromPosition(this.getScriptInfo(this.activeFilename), this.currentCaretPosition)] as const
      : [this.marker(markerName).fileName(), this.marker(markerName).position] as const;
    const script = this.getScriptInfo(fileName);
    for (const diagnostic of this.getDiagnostics(fileName)) {
      if (isSuggestionDiagnostic(diagnostic)) continue;
      if (offsetFromPosition(script, diagnostic.range.end) <= markerPosition) return;
    }
    fail(`Expected error before marker '${markerName}' but none was found`);
  }

  verifyQuickInfoAt(marker: string, expectedText: string, expectedDocumentation = ""): void {
    this.goToMarker(marker);
    const hover = this.getQuickInfoAtCurrentPosition();
    this.verifyHoverContent(hover, expectedText, expectedDocumentation, this.getCurrentPositionPrefix());
  }

  getQuickInfoAtCurrentPosition(): Hover {
    const hover = this.getHoverAtCurrentPosition();
    if (hover === undefined) fail(`Expected hover result at marker '${this.lastKnownMarkerName ?? "<unknown>"}' but got undefined.`);
    return hover;
  }

  verifyHoverContent(
    actual: Hover | undefined,
    expectedText: string,
    expectedDocumentation = "",
    prefix = this.getCurrentPositionPrefix(),
  ): void {
    if (actual === undefined) fail(`${prefix}Expected hover content but got undefined.`);
    this.verifyHoverMarkdown(hoverContentString(actual), expectedText, expectedDocumentation, prefix);
  }

  verifyHoverMarkdown(actual: string, expectedText: string, expectedDocumentation = "", prefix = this.getCurrentPositionPrefix()): void {
    const expected = `\`\`\`typescript\n${expectedText}\n\`\`\`\n${expectedDocumentation}`;
    assertDeepEqual(actual, expected, `${prefix}Hover markdown content mismatch`);
  }

  verifyQuickInfoExists(): void {
    const [isEmpty] = this.quickInfoIsEmpty();
    if (isEmpty) fail(`Expected non-empty hover content at marker '${this.lastKnownMarkerName ?? "<unknown>"}'.`);
  }

  verifyNotQuickInfoExists(): void {
    const [isEmpty, hover] = this.quickInfoIsEmpty();
    if (!isEmpty) fail(`Expected empty hover content at marker '${this.lastKnownMarkerName ?? "<unknown>"}', got ${stableStringify(hover)}.`);
  }

  quickInfoIsEmpty(): readonly [boolean, Hover | undefined] {
    const hover = this.getHoverAtCurrentPosition();
    if (hover === undefined || hoverContentString(hover) === "") return [true, undefined];
    return [false, hover];
  }

  verifyQuickInfoIs(expectedText: string, expectedDocumentation = ""): void {
    this.verifyHoverContent(this.getQuickInfoAtCurrentPosition(), expectedText, expectedDocumentation, this.getCurrentPositionPrefix());
  }

  verifyLinkedEditing(markerNamesToExpected: Readonly<Record<string, readonly Range[]>>): void {
    const provider = this.languageProviderRequired("linked editing");
    for (const [markerName, expected] of Object.entries(markerNamesToExpected)) {
      this.goToMarker(markerName);
      const actual = provider.getLinkedEditingRanges?.(this.languageRequest())?.ranges ?? [];
      assertDeepEqual(actual, expected, `Linked editing ranges mismatch at ${markerName}`);
    }
  }

  verifyBaselineLinkedEditing(): void {
    const provider = this.languageProviderRequired("linked editing");
    const rows = this.markers().map(marker => {
      const ranges = provider.getLinkedEditingRanges?.(this.languageRequestAt(marker.fileName(), marker.lsPos()))?.ranges ?? [];
      return `${marker.getName() ?? "<anonymous>"}:\n${ranges.map(formatRange).join("\n")}`;
    });
    this.baseline({ name: "linkedEditing", arguments: [] }, rows.join("\n\n"));
  }

  verifyBaselineInlayHints(): void {
    const provider = this.languageProviderRequired("inlay hints");
    const script = this.file();
    const hints = provider.getInlayHints?.(this.activeFilename, { start: { line: 0, character: 0 }, end: positionFromOffset(script, script.text().length) }) ?? [];
    this.baseline({ name: "inlayHints", arguments: [] }, hints.map(hint => `${formatPosition(hint.position)} ${stableStringify(hint.label)}`).join("\n"));
  }

  renameAtCaret(newName: string): WorkspaceEdit | undefined {
    const provider = this.languageProviderRequired("rename");
    return provider.rename?.(this.languageRequest(), newName);
  }

  verifyRename(markerName: string, newName: string, expectedFileContents: Readonly<Record<string, string>>): void {
    this.goToMarker(markerName);
    const edit = this.renameAtCaret(newName);
    if (edit === undefined) fail("Expected rename to succeed.");
    this.applyWorkspaceEdit(edit);
    for (const [fileName, content] of Object.entries(expectedFileContents)) {
      if (this.file(fileName).text() !== content) fail(`Renamed content mismatch for ${fileName}.`);
    }
  }

  verifyBaselineRename(preferences?: UserPreferences, ...markerOrRangeOrNames: readonly MarkerOrRangeOrName[]): void {
    const markerOrRanges = markerOrRangeOrNames.map(item => this.resolveMarkerOrRange(item));
    this.verifyBaselineRenameWorker(preferences, markerOrRanges);
  }

  verifyBaselineRenameAtRangesWithText(preferences: UserPreferences | undefined, ...texts: readonly string[]): void {
    const markerOrRanges = texts.flatMap(text => this.rangesByText.get(text) ?? []);
    this.verifyBaselineRenameWorker(preferences, markerOrRanges);
  }

  verifyRenameSucceeded(preferences?: UserPreferences): void {
    const originalPreferences = this.userPreferences;
    if (preferences !== undefined) this.setUserPreferences(preferences);
    try {
      const edit = this.renameAtCaret("RENAME_SUCCEEDED_TEST");
      if (edit === undefined || this.workspaceTextEditEntries(edit).length === 0) {
        fail(`${this.getCurrentPositionPrefix()}Expected rename to succeed, but no rename edits were returned.`);
      }
    } finally {
      this.userPreferences = originalPreferences;
    }
  }

  verifyRenameFailed(): void {
    const edit = this.renameAtCaret("__newName__");
    if (edit !== undefined) fail("Expected rename to fail.");
  }

  willRenameFiles(files: readonly FileRename[]): WorkspaceEdit | undefined {
    const provider = this.languageProviderRequired("will rename files");
    return provider.willRenameFiles?.(files);
  }

  verifyWillRenameFilesEdits(oldPath: string, newPath: string, expectedFileContents: Readonly<Record<string, string>>, preferences?: UserPreferences): void {
    const originalPreferences = this.userPreferences;
    if (preferences !== undefined) this.setUserPreferences(preferences);
    try {
      this.willRenameFilesWorker([{ oldUri: fileNameToDocumentURI(oldPath), newUri: fileNameToDocumentURI(newPath) }]);
      for (const [fileName, expectedContent] of Object.entries(expectedFileContents)) {
        const script = this.getOrLoadScriptInfo(fileName);
        if (script.text() !== expectedContent) {
          fail(`File content after workspace/willRenameFiles edits did not match expected content for ${fileName}.`);
        }
      }
    } finally {
      this.userPreferences = originalPreferences;
    }
  }

  private applyCodeActionEditsForActiveFile(action: CodeAction): void {
    this.applyTextEdits(this.activeFilename, textEditsToTextChanges(this.file(), this.getCodeActionEditsForActiveFile(action)));
  }

  private applyWorkspaceEditFromAction(action: CodeAction): void {
    if (action.edit === undefined) fail(`Code action ${JSON.stringify(action.title)} did not return an edit.`);
    this.applyWorkspaceEdit(action.edit);
  }

  private applyWorkspaceEdit(edit: WorkspaceEdit): void {
    for (const [uri, edits] of Object.entries(edit.changes ?? {})) {
      this.applyTextEdits(uriToFileName(uri), textEditsToTextChanges(this.file(uriToFileName(uri)), edits));
    }
    for (const change of edit.documentChanges ?? []) {
      const textDocumentEdit = change.textDocumentEdit;
      if (textDocumentEdit === undefined) continue;
      const fileName = uriToFileName(textDocumentEdit.textDocument.uri);
      const edits = textDocumentEdit.edits.map(edit => textEditFromUnion(edit));
      this.applyTextEdits(fileName, textEditsToTextChanges(this.file(fileName), edits));
    }
  }

  private getWorkspaceEditTextEdits(edit: WorkspaceEdit | undefined): readonly TextEdit[] {
    if (edit === undefined) return [];
    return this.workspaceTextEditEntries(edit).map(entry => entry.edit);
  }

  private workspaceTextEditEntries(edit: WorkspaceEdit | undefined): readonly WorkspaceTextEditEntry[] {
    if (edit === undefined) return [];
    const entries: WorkspaceTextEditEntry[] = [];
    for (const [uri, edits] of Object.entries(edit.changes ?? {})) {
      for (const textEdit of edits) entries.push({ uri, edit: textEdit });
    }
    for (const change of edit.documentChanges ?? []) {
      const textDocumentEdit = change.textDocumentEdit;
      if (textDocumentEdit === undefined) continue;
      const uri = textDocumentEdit.textDocument.uri;
      for (const editEntry of textDocumentEdit.edits) {
        entries.push({ uri, edit: textEditFromUnion(editEntry) });
      }
    }
    return entries;
  }

  private verifyBaselineRenameWorker(preferences: UserPreferences | undefined, markerOrRanges: readonly MarkerOrRange[]): void {
    const originalPreferences = this.userPreferences;
    if (preferences !== undefined) this.setUserPreferences(preferences);
    try {
      for (const markerOrRange of markerOrRanges) {
        this.goToMarkerOrRange(markerOrRange);
        const edit = this.renameAtCaret("?");
        const entries = this.workspaceTextEditEntries(edit);
        const rows = entries.map(entry => {
          const replacement = entry.edit.newText;
          const pieces = replacement.split("?");
          const startPrefix = pieces[0] === undefined || pieces[0] === "" ? "" : `/*START PREFIX*/${pieces[0]}`;
          const endSuffix = pieces.length < 2 || pieces[1] === "" ? "" : `${pieces.slice(1).join("?")}/*END SUFFIX*/`;
          return `${entry.uri}:${formatRange(entry.edit.range)} ${startPrefix}/*RENAME*/${endSuffix}\n${this.locationSourceLine({ uri: entry.uri, range: entry.edit.range })}`;
        });
        const options = formatRenameOptions(preferences);
        const baselineText = rows.join("\n");
        this.baseline({ name: "rename", arguments: [] }, options === "" ? baselineText : `${options}\n${baselineText}`);
      }
    } finally {
      this.userPreferences = originalPreferences;
    }
  }

  private willRenameFilesWorker(files: readonly FileRename[]): void {
    const edit = this.willRenameFiles(files);
    if (edit !== undefined) this.applyWorkspaceEdit(edit);
    for (const file of files) {
      this.renameFileOrDirectory(uriToFileName(file.oldUri), uriToFileName(file.newUri));
    }
    for (const change of edit?.documentChanges ?? []) {
      const renameFile = change.renameFile;
      if (renameFile !== undefined) {
        this.renameFileOrDirectory(uriToFileName(renameFile.oldUri), uriToFileName(renameFile.newUri));
      }
    }
  }

  private renameFileOrDirectory(oldPath: string, newPath: string): void {
    const updates: [oldFileName: string, newFileName: string, content: string, wasOpen: boolean][] = [];
    for (const [fileName, script] of this.scriptInfos) {
      const renamed = renamedPath(fileName, oldPath, newPath);
      if (renamed !== undefined) updates.push([fileName, renamed, script.text(), this.openFiles.has(fileName)]);
    }
    if (updates.length === 0) fail(`rename source ${oldPath} did not exist in test environment`);
    for (const [oldFileName] of updates) {
      this.scriptInfos.delete(oldFileName);
      this.openFiles.delete(oldFileName);
    }
    for (const [_oldFileName, newFileName, content, wasOpen] of updates) {
      this.scriptInfos.set(newFileName, newScriptInfo(newFileName, content));
      if (wasOpen) this.openFiles.add(newFileName);
    }
    const active = renamedPath(this.activeFilename, oldPath, newPath);
    if (active !== undefined) this.activeFilename = active;
  }

  private languageProviderRequired(feature: string): FourslashLanguageProvider {
    if (this.languageProvider === undefined) throw new Error(`Fourslash ${feature} provider is not configured.`);
    return this.languageProvider;
  }

  private languageRequest(signatureHelpContext?: SignatureHelpContext): FourslashLanguageRequest {
    return this.languageRequestAt(this.activeFilename, this.currentCaretPosition, this.activeRange(), signatureHelpContext);
  }

  private languageRequestAt(fileName: string, position: Position, range?: Range, signatureHelpContext?: SignatureHelpContext): FourslashLanguageRequest {
    return {
      fileName,
      uri: fileNameToDocumentURI(fileName),
      position,
      range,
      offset: offsetFromPosition(this.file(fileName), position),
      userPreferences: this.userPreferences,
      ...(signatureHelpContext === undefined ? {} : { signatureHelpContext }),
    };
  }

  private getDiagnostics(fileName: string): readonly Diagnostic[] {
    return this.languageProviderRequired("diagnostics").getDiagnostics?.(fileName) ?? [];
  }

  private toDiagnostic(scriptInfo: ScriptInfo, diagnostic: Diagnostic): FourslashDiagnostic {
    const code = diagnosticCode(diagnostic) ?? 0;
    const category = diagnosticCategory(diagnostic);
    const relatedDiagnostics = diagnostic.relatedInformation?.flatMap(info => {
      const relatedFileName = uriToFileName(info.location.uri);
      const relatedScriptInfo = this.scriptInfos.get(relatedFileName);
      if (relatedScriptInfo === undefined) return [];
      return [new FourslashDiagnostic(
        new FourslashDiagnosticFile(relatedScriptInfo.fileName, relatedScriptInfo.text()),
        new TextRange(offsetFromPosition(relatedScriptInfo, info.location.range.start), offsetFromPosition(relatedScriptInfo, info.location.range.end)),
        code,
        category,
        info.message,
        [],
        false,
        false,
      )];
    }) ?? [];
    return new FourslashDiagnostic(
      new FourslashDiagnosticFile(scriptInfo.fileName, scriptInfo.text()),
      new TextRange(offsetFromPosition(scriptInfo, diagnostic.range.start), offsetFromPosition(scriptInfo, diagnostic.range.end)),
      code,
      category,
      diagnostic.message,
      relatedDiagnostics,
      diagnostic.tags?.includes(DiagnosticTagUnnecessary) ?? false,
      diagnostic.tags?.includes(DiagnosticTagDeprecated) ?? false,
    );
  }

  private getHoverAtCurrentPosition(): Hover | undefined {
    return this.languageProviderRequired("hover").getHover?.(this.languageRequest());
  }

  private getSignatureHelpAtCurrentPosition(context?: SignatureHelpContext): SignatureHelp | undefined {
    return this.languageProviderRequired("signature help").getSignatureHelp?.(this.languageRequest(context));
  }

  private verifyBaselineDefinitionWorker(
    commandName: string,
    markerName: string,
    selector: (provider: FourslashLanguageProvider) => ((request: FourslashLanguageRequest) => readonly Location[]) | undefined,
    includeOriginalSelectionRange: boolean,
    markers: readonly string[],
  ): void {
    const provider = this.languageProviderRequired(commandName);
    const getDefinitions = selector(provider);
    if (getDefinitions === undefined) throw new Error(`Fourslash ${commandName} provider is not configured.`);
    for (const markerOrRange of this.lookupMarkersOrGetRanges(markers)) {
      this.goToMarkerOrRange(markerOrRange);
      const locations = getDefinitions(this.languageRequest());
      const original = includeOriginalSelectionRange ? [{ uri: fileNameToDocumentURI(this.activeFilename), range: markerOrRangeToRange(markerOrRange) }] : [];
      this.baseline({ name: commandName, arguments: [] }, this.formatLocationsBaseline(markerName, [...original, ...locations]));
    }
  }

  private formatLocationsBaseline(markerName: string, locations: readonly Location[]): string {
    return locations.map(location => `${markerName} ${location.uri}:${formatRange(location.range)}\n${this.locationSourceLine(location)}`).join("\n");
  }

  private locationSourceLine(location: Location): string {
    const fileName = uriToFileName(location.uri);
    const script = this.scriptInfos.get(fileName);
    if (script === undefined) return "";
    const start = offsetFromPosition(script, location.range.start);
    const end = offsetFromPosition(script, location.range.end);
    return script.text().slice(start, end);
  }

  private lookupMarkersOrGetRanges(markers: readonly string[]): readonly MarkerOrRange[] {
    return markers.length === 0
      ? this.ranges()
      : markers.map(marker => this.marker(marker));
  }

  private resolveMarkerOrRange(markerOrRangeOrName: MarkerOrRangeOrName): MarkerOrRange {
    return typeof markerOrRangeOrName === "string" ? this.marker(markerOrRangeOrName) : markerOrRangeOrName;
  }

  private expectedContentWithRangeReplacement(originalContent: string, newRangeContent: string): string {
    let selection = this.rangeFromSelection();
    if (selection === undefined || selection.pos === selection.end) {
      const ranges = this.getRangesInFile(this.activeFilename);
      if (ranges.length === 0) fail("Expected a selected range or fourslash range for NewRangeContent verification.");
      selection = ranges[0]!.range;
    }
    return originalContent.slice(0, selection.pos) + newRangeContent + originalContent.slice(selection.end);
  }

  private rangeFromSelection(): TextRange | undefined {
    if (this.selectionEnd === undefined) return undefined;
    return new TextRange(
      offsetFromPosition(this.file(), this.currentCaretPosition),
      offsetFromPosition(this.file(), this.selectionEnd),
    );
  }

  private codeFixRequest(errorCode: number | undefined): FourslashCodeFixRequest {
    const range = this.activeRange();
    return {
      fileName: this.activeFilename,
      position: this.currentCaretPosition,
      range,
      errorCode,
      userPreferences: this.userPreferences,
    };
  }

  getPathUpdater(oldPath: string, newPath: string): (path: string) => readonly [string, boolean] {
    return path => {
      const updated = renamedPath(path, oldPath, newPath);
      return updated === undefined ? ["", false] : [updated, true];
    };
  }

  getRangesByText(): ReadonlyMap<string, readonly RangeMarker[]> {
    return this.rangesByText;
  }

  getRangeText(rangeMarker: RangeMarker): string {
    const script = this.getScriptInfo(rangeMarker.fileName());
    return script.text().slice(rangeMarker.range.pos, rangeMarker.range.end);
  }

  getCurrentPositionPrefix(): string {
    return `${this.activeFilename}:${this.currentCaretPosition.line + 1}:${this.currentCaretPosition.character + 1}: `;
  }

  private completionRequest(): FourslashCompletionRequest {
    return {
      fileName: this.activeFilename,
      position: this.currentCaretPosition,
      offset: offsetFromPosition(this.file(), this.currentCaretPosition),
      userPreferences: this.userPreferences,
    };
  }

  private forEachMarkerInput(markerInput: MarkerInput, action: () => void): void {
    if (typeof markerInput === "string") {
      this.goToMarker(markerInput);
      action();
    } else if (markerInput !== undefined && !(markerInput instanceof Array)) {
      this.goToMarkerOrRange(markerInput);
      action();
    } else if (markerInput instanceof Array) {
      for (const marker of markerInput) {
        if (typeof marker === "string") this.goToMarker(marker);
        else this.goToMarkerOrRange(marker);
        action();
      }
    } else {
      action();
    }
  }
}

export function newFourslash(content: string, capabilities: FourslashCapabilities = {}, fileName?: string): FourslashTest {
  return new FourslashTest(fileName === undefined ? { capabilities, content } : { capabilities, content, fileName });
}

export function defaultSemanticTokenTypes(): string[] {
  return [
    SemanticTokenTypeNamespace,
    SemanticTokenTypeClass,
    SemanticTokenTypeEnum,
    SemanticTokenTypeInterface,
    SemanticTokenTypeStruct,
    SemanticTokenTypeTypeParameter,
    SemanticTokenTypeType,
    SemanticTokenTypeParameter,
    SemanticTokenTypeVariable,
    SemanticTokenTypeProperty,
    SemanticTokenTypeEnumMember,
    SemanticTokenTypeDecorator,
    SemanticTokenTypeEvent,
    SemanticTokenTypeFunction,
    SemanticTokenTypeMethod,
    SemanticTokenTypeMacro,
    SemanticTokenTypeLabel,
    SemanticTokenTypeComment,
    SemanticTokenTypeString,
    SemanticTokenTypeKeyword,
    SemanticTokenTypeNumber,
    SemanticTokenTypeRegexp,
    SemanticTokenTypeOperator,
  ];
}

export function defaultSemanticTokenModifiers(): string[] {
  return [
    SemanticTokenModifierDeclaration,
    SemanticTokenModifierDefinition,
    SemanticTokenModifierReadonly,
    SemanticTokenModifierStatic,
    SemanticTokenModifierDeprecated,
    SemanticTokenModifierAbstract,
    SemanticTokenModifierAsync,
    SemanticTokenModifierModification,
    SemanticTokenModifierDocumentation,
    SemanticTokenModifierDefaultLibrary,
    "local",
  ];
}

export const defaultCompletionCapabilities = {
  completionItem: {
    snippetSupport: true,
    commitCharactersSupport: true,
    preselectSupport: true,
    labelDetailsSupport: true,
    insertReplaceSupport: true,
    documentationFormat: [MarkupKindMarkdown, MarkupKindPlainText],
  },
  completionList: {
    itemDefaults: ["commitCharacters", "editRange"],
  },
} satisfies NonNullable<ClientCapabilities["textDocument"]>["completion"];

export const defaultDefinitionCapabilities = {
  linkSupport: true,
} satisfies NonNullable<ClientCapabilities["textDocument"]>["definition"];

export const defaultTypeDefinitionCapabilities = {
  linkSupport: true,
} satisfies NonNullable<ClientCapabilities["textDocument"]>["typeDefinition"];

export const defaultImplementationCapabilities = {
  linkSupport: true,
} satisfies NonNullable<ClientCapabilities["textDocument"]>["implementation"];

export const defaultHoverCapabilities = {
  contentFormat: [MarkupKindMarkdown, MarkupKindPlainText],
  verbosityLevel: true,
} satisfies NonNullable<ClientCapabilities["textDocument"]>["hover"];

export const defaultSignatureHelpCapabilities = {
  signatureInformation: {
    documentationFormat: [MarkupKindMarkdown, MarkupKindPlainText],
    parameterInformation: {
      labelOffsetSupport: true,
    },
    activeParameterSupport: true,
  },
  contextSupport: true,
} satisfies NonNullable<ClientCapabilities["textDocument"]>["signatureHelp"];

export const defaultDocumentSymbolCapabilities = {
  hierarchicalDocumentSymbolSupport: true,
} satisfies NonNullable<ClientCapabilities["textDocument"]>["documentSymbol"];

export const defaultFoldingRangeCapabilities = {
  rangeLimit: 5000,
  foldingRangeKind: {
    valueSet: [FoldingRangeKindComment, FoldingRangeKindImports, FoldingRangeKindRegion],
  },
  foldingRange: {
    collapsedText: true,
  },
} satisfies NonNullable<ClientCapabilities["textDocument"]>["foldingRange"];

export const defaultDiagnosticCapabilities = {
  relatedInformation: true,
  tagSupport: {
    valueSet: [DiagnosticTagUnnecessary, DiagnosticTagDeprecated],
  },
} satisfies NonNullable<ClientCapabilities["textDocument"]>["diagnostic"];

export const defaultPublishDiagnosticCapabilities = {
  relatedInformation: true,
  tagSupport: {
    valueSet: [DiagnosticTagUnnecessary, DiagnosticTagDeprecated],
  },
} satisfies NonNullable<ClientCapabilities["textDocument"]>["publishDiagnostics"];

export const defaultWorkspaceEditCapabilities = {
  documentChanges: true,
  resourceOperations: [ResourceOperationKindRename],
} satisfies NonNullable<ClientCapabilities["workspace"]>["workspaceEdit"];

export function getDefaultCapabilities(): ClientCapabilities {
  return {
    general: {
      positionEncodings: [PositionEncodingKindUTF8],
    },
    textDocument: {
      completion: defaultCompletionCapabilities,
      diagnostic: defaultDiagnosticCapabilities,
      publishDiagnostics: defaultPublishDiagnosticCapabilities,
      definition: defaultDefinitionCapabilities,
      typeDefinition: defaultTypeDefinitionCapabilities,
      implementation: defaultImplementationCapabilities,
      hover: defaultHoverCapabilities,
      signatureHelp: defaultSignatureHelpCapabilities,
      documentSymbol: defaultDocumentSymbolCapabilities,
      foldingRange: defaultFoldingRangeCapabilities,
      semanticTokens: {
        requests: {
          full: { boolean: true },
        },
        tokenTypes: defaultSemanticTokenTypes(),
        tokenModifiers: defaultSemanticTokenModifiers(),
        formats: [TokenFormatRelative],
      },
    },
    workspace: {
      configuration: true,
      fileOperations: {
        willRename: true,
      },
      workspaceEdit: defaultWorkspaceEditCapabilities,
    },
  };
}

export function getCapabilitiesWithDefaults(capabilities: ClientCapabilities | undefined): ClientCapabilities {
  const textDocument = capabilities?.textDocument ?? {};
  const workspace = capabilities?.workspace ?? {};
  return {
    ...capabilities,
    general: {
      ...capabilities?.general,
      positionEncodings: [PositionEncodingKindUTF8],
    },
    textDocument: {
      ...textDocument,
      completion: textDocument.completion ?? defaultCompletionCapabilities,
      diagnostic: textDocument.diagnostic ?? defaultDiagnosticCapabilities,
      publishDiagnostics: textDocument.publishDiagnostics ?? defaultPublishDiagnosticCapabilities,
      semanticTokens: textDocument.semanticTokens ?? {
        requests: { full: { boolean: true } },
        tokenTypes: defaultSemanticTokenTypes(),
        tokenModifiers: defaultSemanticTokenModifiers(),
        formats: [TokenFormatRelative],
      },
      definition: textDocument.definition ?? defaultDefinitionCapabilities,
      typeDefinition: textDocument.typeDefinition ?? defaultTypeDefinitionCapabilities,
      implementation: textDocument.implementation ?? defaultImplementationCapabilities,
      hover: textDocument.hover ?? defaultHoverCapabilities,
      signatureHelp: textDocument.signatureHelp ?? defaultSignatureHelpCapabilities,
      documentSymbol: textDocument.documentSymbol ?? defaultDocumentSymbolCapabilities,
      foldingRange: textDocument.foldingRange ?? defaultFoldingRangeCapabilities,
    },
    workspace: {
      ...workspace,
      fileOperations: workspace.fileOperations ?? { willRename: true },
      workspaceEdit: workspace.workspaceEdit ?? defaultWorkspaceEditCapabilities,
      configuration: workspace.configuration ?? true,
    },
  };
}

export function newScriptInfo(fileName: string, content: string): ScriptInfo {
  return new ScriptInfo(fileName, content, computeLineStarts(content));
}

export function baselineCommandKey(command: BaselineCommand): string {
  return [command.name, ...command.arguments].join("\0");
}

export function getBaseFileNameFromTest(testName: string): string {
  const slash = Math.max(testName.lastIndexOf("/"), testName.lastIndexOf("\\"));
  const base = slash < 0 ? testName : testName.slice(slash + 1);
  const dot = base.lastIndexOf(".");
  return dot < 0 ? base : base.slice(0, dot);
}

export function applyTextChange(text: string, change: TextChange): string {
  return `${text.slice(0, change.span.pos)}${change.newText}${text.slice(change.span.end)}`;
}

export function textEditSpanFromRange(range: TextRange): TextEditSpan {
  return {
    start: range.pos,
    end: range.end,
    length: range.end - range.pos,
  };
}

export function computeLineStarts(text: string): readonly number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) {
    const ch = text[index]!;
    if (ch === "\r") {
      if (text[index + 1] === "\n") index += 1;
      starts.push(index + 1);
    } else if (ch === "\n") {
      starts.push(index + 1);
    }
  }
  return starts;
}

function positionFromOffset(scriptInfo: ScriptInfo, offset: number): Position {
  const lineStarts = scriptInfo.lineStarts();
  let line = 0;
  for (let index = 0; index < lineStarts.length; index += 1) {
    const start = lineStarts[index]!;
    if (start > offset) break;
    line = index;
  }
  return { line, character: offset - lineStarts[line]! };
}

function offsetFromPosition(scriptInfo: ScriptInfo, position: Position): number {
  const starts = scriptInfo.lineStarts();
  const lineStart = starts[position.line];
  if (lineStart === undefined) return scriptInfo.text().length;
  const lineEnd = position.line + 1 < starts.length ? starts[position.line + 1]! : scriptInfo.text().length;
  return Math.max(lineStart, Math.min(lineStart + position.character, lineEnd));
}

export function updatePosition(position: Position, _oldText: string, scriptInfo: ScriptInfo, change: TextChange): Position {
  const oldLineStarts = computeLineStarts(_oldText);
  const lineStart = oldLineStarts[position.line];
  const oldOffset = lineStart === undefined
    ? _oldText.length
    : Math.max(lineStart, Math.min(lineStart + position.character, position.line + 1 < oldLineStarts.length ? oldLineStarts[position.line + 1]! : _oldText.length));
  if (oldOffset <= change.span.pos) return position;
  const removedLength = change.span.end - change.span.pos;
  const insertedLength = change.newText.length;
  if (oldOffset >= change.span.end) {
    return positionFromOffset(scriptInfo, oldOffset - removedLength + insertedLength);
  }
  return positionFromOffset(scriptInfo, change.span.pos + insertedLength);
}

export function getLanguageKind(filename: string): LanguageKind {
  if (fileExtensionIsOneOf(filename, [
    extensionTs,
    extensionMts,
    extensionCts,
    extensionDmts,
    extensionDcts,
    extensionDts,
  ])) {
    return LanguageKindTypeScript;
  }
  if (fileExtensionIsOneOf(filename, [extensionJs, extensionMjs, extensionCjs])) {
    return LanguageKindJavaScript;
  }
  if (fileExtensionIs(filename, extensionJsx)) {
    return LanguageKindJavaScriptReact;
  }
  if (fileExtensionIs(filename, extensionTsx)) {
    return LanguageKindTypeScriptReact;
  }
  if (fileExtensionIs(filename, extensionJson)) {
    return LanguageKindJSON;
  }
  return LanguageKindTypeScript;
}

export interface CompletionsExpectedList {
  readonly isIncomplete: boolean;
  readonly itemDefaults?: CompletionsExpectedItemDefaults;
  readonly items?: CompletionsExpectedItems;
  readonly userPreferences?: UserPreferences;
}

export type ExpectedCompletionEditRange = EditRange | typeof Ignored;

export const Ignored = {};

export interface EditRange {
  readonly insert?: RangeMarker;
  readonly replace?: RangeMarker;
}

export interface CompletionsExpectedItemDefaults {
  readonly commitCharacters?: readonly string[];
  readonly editRange?: ExpectedCompletionEditRange;
}

export type CompletionsExpectedItem = CompletionItem | string;

export interface CompletionsExpectedItems {
  readonly includes: readonly CompletionsExpectedItem[];
  readonly excludes: readonly string[];
  readonly exact: readonly CompletionsExpectedItem[];
  readonly unsorted: readonly CompletionsExpectedItem[];
}

export interface CompletionsExpectedCodeAction {
  readonly name: string;
  readonly source: string;
  readonly description: string;
  readonly newFileContent: string;
}

export interface VerifyCompletionsResult {
  readonly andApplyCodeAction: (expectedAction: CompletionsExpectedCodeAction) => void;
  readonly andHasNoCodeAction: (unexpectedAction: CompletionsExpectedCodeAction) => void;
}

export interface VerifyCodeFixOptions {
  readonly description: string;
  readonly newFileContent: string;
  readonly newRangeContent: string;
  readonly index: number;
  readonly applyChanges: boolean;
  readonly userPreferences?: UserPreferences;
}

export interface VerifyCodeFixAllOptions {
  readonly fixId: string;
  readonly newFileContent: string;
}

export interface CompletionVerificationResult {
  readonly itemDefaults?: CompletionItemDefaults;
  readonly items: readonly CompletionItem[];
}

export interface ApplyCodeActionFromCompletionOptions {
  readonly name: string;
  readonly source: string;
  readonly description: string;
  readonly newFileContent?: string;
  readonly newRangeContent?: string;
  readonly userPreferences?: UserPreferences;
}

export interface FoldingRangeLineExpected {
  readonly startLine: number;
  readonly endLine: number;
}

export interface VerifySignatureHelpOptions {
  readonly signatures: readonly string[];
  readonly activeSignature?: number;
  readonly activeParameter?: number;
  readonly parameterDocComment?: string;
  readonly docComment?: string;
}

export interface SignatureHelpCase {
  readonly context?: SignatureHelpContext;
  readonly markerInput?: MarkerInput;
  readonly expected?: SignatureHelp;
}

export interface VerifyWorkspaceSymbolCase {
  readonly pattern?: string;
  readonly includes?: readonly SymbolInformation[];
  readonly exact?: readonly SymbolInformation[];
  readonly name?: string;
  readonly kind?: number;
  readonly containerName?: string;
  readonly fileName?: string;
}

export interface VerifyBaselineRenameOptions {
  readonly markerOrRange?: MarkerOrRangeOrName;
  readonly newName: string;
}

export type MarkerInput = string | Marker | readonly string[] | readonly Marker[] | undefined;
export type MarkerOrRangeOrName = string | Marker | RangeMarker;
export const AnyTextEdits: readonly TextEdit[] = Object.freeze([]);
const defaultCompletionSortText = "11";
const completionIgnoreFields = new Set<keyof CompletionItem>(["kind", "sortText", "filterText", "data", "additionalTextEdits"]);
const autoImportCompletionIgnoreFields = new Set<keyof CompletionItem>([
  "kind",
  "sortText",
  "filterText",
  "data",
  "labelDetails",
  "detail",
  "additionalTextEdits",
]);

export function isEmptyExpectedList(expected: CompletionsExpectedList | undefined): boolean {
  return expected === undefined
    || expected.items === undefined
    || (expected.items.exact.length === 0
      && expected.items.includes.length === 0
      && expected.items.excludes.length === 0);
}

export function verifyCompletionsItemDefaults(
  actual: CompletionItemDefaults | undefined,
  expected: CompletionsExpectedItemDefaults | undefined,
  prefix: string,
): void {
  if (actual === undefined) {
    if (expected !== undefined) fail(`${prefix}Expected non-undefined completion item defaults but got undefined.`);
    return;
  }
  if (expected === undefined) {
    fail(`${prefix}Expected undefined completion item defaults but got ${stableStringify(actual)}.`);
  }
  assertDeepEqual(actual.commitCharacters, expected.commitCharacters, `${prefix}CommitCharacters mismatch`);
  const editRange = expected.editRange;
  if (editRange === Ignored) return;
  if (editRange === undefined) {
    if (actual.editRange !== undefined) fail(`${prefix}Expected undefined EditRange but got ${stableStringify(actual.editRange)}.`);
    return;
  }
  if (!isEditRange(editRange)) fail(`${prefix}Expected EditRange or Ignored.`);
  if (actual.editRange === undefined) fail(`${prefix}Expected non-undefined EditRange but got undefined.`);
  assertDeepEqual(actual.editRange, {
    editRangeWithInsertReplace: {
      insert: editRange.insert?.lsRange,
      replace: editRange.replace?.lsRange,
    },
  }, `${prefix}EditRange mismatch`);
}

function completionItemsByLabel(items: readonly CompletionItem[]): Map<string, CompletionItem[]> {
  const result = new Map<string, CompletionItem[]>();
  for (const item of items) {
    const bucket = result.get(item.label) ?? [];
    bucket.push(item);
    result.set(item.label, bucket);
  }
  return result;
}

function removeMatchingCompletionItem(
  harness: FourslashTest,
  prefix: string,
  nameToActualItems: Map<string, CompletionItem[]>,
  expected: CompletionsExpectedItem,
  deleteThroughMatch = true,
): void {
  const label = getExpectedLabel(expected);
  const actualItems = nameToActualItems.get(label);
  if (actualItems === undefined) fail(`${prefix}Label '${label}' not found in actual items.`);
  if (typeof expected === "string") return;
  let mismatchPrefix = actualItems.length > 1
    ? `${prefix}No completion item match for label ${label} (multiple candidates found): `
    : `${prefix}Includes completion item mismatch for label ${label}: `;
  const itemIndex = actualItems.findIndex(actualItem => {
    const error = harness.verifyCompletionItem(prefix, actualItem, expected);
    if (error !== "") {
      mismatchPrefix += `\n    ${error}`;
      return false;
    }
    return true;
  });
  if (itemIndex < 0) fail(mismatchPrefix);
  if (actualItems.length === 1 || itemIndex === actualItems.length - 1) {
    nameToActualItems.delete(label);
  } else if (deleteThroughMatch) {
    nameToActualItems.set(label, actualItems.slice(itemIndex + 1));
  } else {
    nameToActualItems.set(label, actualItems.slice(itemIndex));
  }
}

function getExpectedLabel(item: CompletionsExpectedItem): string {
  return typeof item === "string" ? item : item.label;
}

function isEditRange(value: ExpectedCompletionEditRange): value is EditRange {
  return value !== Ignored;
}

function assertDeepEqual(actual: unknown, expected: unknown, prefix: string): void {
  const diff = diffJson(actual, expected);
  if (diff !== "") fail(`${prefix}:\n${diff}`);
}

interface WorkspaceTextEditEntry {
  readonly uri: DocumentUri;
  readonly edit: TextEdit;
}

function diffJson(actual: unknown, expected: unknown): string {
  const actualText = stableStringify(actual);
  const expectedText = stableStringify(expected);
  return actualText === expectedText ? "" : `actual: ${actualText}\nexpected: ${expectedText}`;
}

function stableStringify(value: unknown): string {
  return JSON.stringify(value, (_key, item: unknown) => {
    if (item === undefined) return "__undefined__";
    if (item === AnyTextEdits) return "__AnyTextEdits__";
    if (item === null || typeof item !== "object" || Array.isArray(item)) return item;
    return Object.fromEntries(Object.entries(item as Record<string, unknown>).sort(([left], [right]) => left.localeCompare(right)));
  }, 2);
}

function omitCompletionFields(item: CompletionItem, fields: ReadonlySet<keyof CompletionItem>): Partial<CompletionItem> {
  const result: Partial<CompletionItem> = {};
  for (const [key, value] of Object.entries(item) as [keyof CompletionItem, CompletionItem[keyof CompletionItem]][]) {
    if (!fields.has(key)) {
      (result as Record<string, unknown>)[key] = value;
    }
  }
  return result;
}

function compareCompletionItems(left: CompletionItem, right: CompletionItem): number {
  return (left.sortText ?? "").localeCompare(right.sortText ?? "")
    || left.label.localeCompare(right.label);
}

function textEditsToTextChanges(script: ScriptInfo, edits: readonly TextEdit[]): readonly TextChange[] {
  return edits.map(edit => ({
    span: new TextRange(
      offsetFromPosition(script, edit.range.start),
      offsetFromPosition(script, edit.range.end),
    ),
    newText: edit.newText,
  }));
}

function findCodeActionByDescription(actions: readonly CodeAction[], description: string, index: number): CodeAction | undefined {
  const indexed = actions[index];
  if (indexed?.title === description) return indexed;
  return actions.find(action => action.title === description);
}

function actionTitles(actions: readonly CodeAction[]): readonly string[] {
  return actions.map(action => action.title);
}

function isAutoImportCompletionItem(item: CompletionItem): boolean {
  return item.data?.autoImport !== undefined;
}

function codeFence(language: string, content: string): string {
  return `\`\`\`${language}\n${content}\n\`\`\``;
}

function autoImportBaselineLanguage(fileName: string): string {
  const extension = fileName.slice(fileName.lastIndexOf(".") + 1);
  return extension === "mts" || extension === "cts" ? "ts" : extension;
}

function applyTextEditsToContent(script: ScriptInfo, content: string, edits: readonly TextEdit[]): string {
  let result = content;
  const changes = textEditsToTextChanges(script, edits)
    .slice()
    .sort((left, right) => right.span.pos - left.span.pos || right.span.end - left.span.end);
  for (const change of changes) result = applyTextChange(result, change);
  return result;
}

function textEditStartOffset(script: ScriptInfo, edit: TextEdit): number {
  return offsetFromPosition(script, edit.range.start);
}

function textEditEndOffset(script: ScriptInfo, edit: TextEdit): number {
  return offsetFromPosition(script, edit.range.end);
}

function removeWhitespace(text: string): string {
  return text.replace(/\s+/gu, "");
}

function uriToFileName(uri: DocumentUri): string {
  if (uri.startsWith("file://")) {
    const path = uri.slice("file://".length);
    return decodeURIComponent(path.startsWith("/") ? path : `/${path}`);
  }
  return uri;
}

function textEditFromUnion(value: unknown): TextEdit {
  if (isTextEdit(value)) return value;
  if (!isRecord(value)) throw new Error("Invalid text edit union.");
  const textEdit = value["textEdit"];
  if (isTextEdit(textEdit)) return textEdit;
  const annotated = value["annotatedTextEdit"];
  if (isTextEdit(annotated)) return annotated;
  const snippet = value["snippetTextEdit"];
  if (isRecord(snippet) && isRange(snippet["range"])) {
    const snippetValue = snippet["snippet"];
    const newText = isRecord(snippetValue) && typeof snippetValue["value"] === "string" ? snippetValue["value"] : "";
    return { range: snippet["range"], newText };
  }
  throw new Error("Text document edit entry did not contain a text edit.");
}

function isTextEdit(value: unknown): value is TextEdit {
  return isRecord(value) && isRange(value["range"]) && typeof value["newText"] === "string";
}

function isRange(value: unknown): value is Range {
  return isRecord(value) && isPosition(value["start"]) && isPosition(value["end"]);
}

function isLocation(value: unknown): value is Location {
  return isRecord(value) && typeof value["uri"] === "string" && isRange(value["range"]);
}

function locationsFromCodeLensArguments(args: readonly unknown[] | undefined): readonly Location[] {
  if (args === undefined || args.length < 3) return [];
  const locations = args[2];
  return Array.isArray(locations) ? locations.filter(isLocation) : [];
}

function isPosition(value: unknown): value is Position {
  return isRecord(value) && typeof value["line"] === "number" && typeof value["character"] === "number";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function uniqueStrings(values: readonly string[]): readonly string[] {
  const result: string[] = [];
  for (const value of values) {
    if (!result.includes(value)) result.push(value);
  }
  return result;
}

function extractModuleSpecifier(text: string): string {
  for (const prefix of ["from \"", "from '", "require(\"", "require('"]) {
    const start = text.indexOf(prefix);
    if (start < 0) continue;
    const quote = prefix.endsWith("'") ? "'" : "\"";
    const specifierStart = start + prefix.length;
    const end = text.indexOf(quote, specifierStart);
    if (end >= 0) return text.slice(specifierStart, end);
  }
  return "";
}

function comparePositions(left: Position, right: Position): number {
  return left.line - right.line || left.character - right.character;
}

function rangesEqual(left: Range, right: Range): boolean {
  return comparePositions(left.start, right.start) === 0 && comparePositions(left.end, right.end) === 0;
}

function formatPosition(position: Position): string {
  return `${position.line + 1}:${position.character + 1}`;
}

function formatRange(range: Range): string {
  return `${formatPosition(range.start)}-${formatPosition(range.end)}`;
}

function formatRenameOptions(preferences: UserPreferences | undefined): string {
  if (preferences === undefined) return "";
  const rows: string[] = [];
  const useAliasesForRename = (preferences as { readonly useAliasesForRename?: boolean | undefined }).useAliasesForRename;
  if (useAliasesForRename !== undefined) rows.push(`// @useAliasesForRename: ${String(useAliasesForRename)}`);
  const quotePreference = (preferences as { readonly quotePreference?: string | undefined }).quotePreference;
  if (quotePreference !== undefined) rows.push(`// @quotePreference: ${quotePreference}`);
  return rows.join("\n");
}

type CallHierarchyDirection = "root" | "incoming" | "outgoing";

function callHierarchyKey(item: CallHierarchyItem, direction: CallHierarchyDirection): string {
  return `${direction}\0${item.uri}\0${formatRange(item.range)}`;
}

function formatCallHierarchyItem(
  test: FourslashTest,
  provider: FourslashLanguageProvider,
  rows: string[],
  item: CallHierarchyItem,
  direction: CallHierarchyDirection,
  seen: Set<string>,
  prefix: string,
): void {
  const key = callHierarchyKey(item, direction);
  const alreadySeen = seen.has(key);
  seen.add(key);

  const incomingSkipped = direction === "outgoing";
  const outgoingSkipped = direction === "incoming";
  const incomingCalls = incomingSkipped || alreadySeen ? [] : provider.getIncomingCalls?.(item) ?? [];
  const outgoingCalls = outgoingSkipped || alreadySeen ? [] : provider.getOutgoingCalls?.(item) ?? [];
  const trailingPrefix = prefix;

  rows.push(`${prefix}╭ name: ${item.name}`);
  rows.push(`${prefix}├ kind: ${symbolKindToLowercase(item.kind)}`);
  if (item.detail !== undefined && item.detail !== "") rows.push(`${prefix}├ containerName: ${item.detail}`);
  rows.push(`${prefix}├ file: ${uriToFileName(item.uri)}`);
  rows.push(`${prefix}├ span:`);
  formatCallHierarchyItemSpan(test, rows, item.uri, item.range, `${prefix}│ `, `${prefix}│ `);
  rows.push(`${prefix}├ selectionSpan:`);
  formatCallHierarchyItemSpan(test, rows, item.uri, item.selectionRange, `${prefix}│ `, `${prefix}│ `);

  if (alreadySeen && !incomingSkipped) {
    rows.push(outgoingSkipped ? `${trailingPrefix}╰ incoming: ...` : `${prefix}├ incoming: ...`);
  } else if (!incomingSkipped) {
    if (incomingCalls.length === 0) {
      rows.push(outgoingSkipped ? `${trailingPrefix}╰ incoming: none` : `${prefix}├ incoming: none`);
    } else {
      rows.push(`${prefix}├ incoming:`);
      for (let index = 0; index < incomingCalls.length; index += 1) {
        const incomingCall = incomingCalls[index]!;
        if (incomingCall.from === undefined) continue;
        rows.push(`${prefix}│ ╭ from:`);
        formatCallHierarchyItem(test, provider, rows, incomingCall.from, "incoming", seen, `${prefix}│ │ `);
        rows.push(`${prefix}│ ├ fromSpans:`);
        const closingPrefix = index < incomingCalls.length - 1 || (!outgoingSkipped && (!alreadySeen || outgoingCalls.length > 0))
          ? `${prefix}│ ╰ `
          : `${trailingPrefix}╰ ╰ `;
        formatCallHierarchyItemSpans(test, rows, incomingCall.from.uri, incomingCall.fromRanges, `${prefix}│ │ `, closingPrefix);
      }
    }
  }

  if (alreadySeen && !outgoingSkipped) {
    rows.push(`${trailingPrefix}╰ outgoing: ...`);
  } else if (!outgoingSkipped) {
    if (outgoingCalls.length === 0) {
      rows.push(`${trailingPrefix}╰ outgoing: none`);
    } else {
      rows.push(`${prefix}├ outgoing:`);
      for (let index = 0; index < outgoingCalls.length; index += 1) {
        const outgoingCall = outgoingCalls[index]!;
        if (outgoingCall.to === undefined) continue;
        rows.push(`${prefix}│ ╭ to:`);
        formatCallHierarchyItem(test, provider, rows, outgoingCall.to, "outgoing", seen, `${prefix}│ │ `);
        rows.push(`${prefix}│ ├ fromSpans:`);
        const closingPrefix = index < outgoingCalls.length - 1 ? `${prefix}│ ╰ ` : `${trailingPrefix}╰ ╰ `;
        formatCallHierarchyItemSpans(test, rows, item.uri, outgoingCall.fromRanges, `${prefix}│ │ `, closingPrefix);
      }
    }
  }
}

function formatCallHierarchyItemSpans(
  test: FourslashTest,
  rows: string[],
  uri: DocumentUri,
  ranges: readonly Range[],
  prefix: string,
  trailingPrefix: string,
): void {
  for (let index = 0; index < ranges.length; index += 1) {
    formatCallHierarchyItemSpan(test, rows, uri, ranges[index]!, prefix, index === ranges.length - 1 ? trailingPrefix : prefix);
  }
}

function formatCallHierarchyItemSpan(
  test: FourslashTest,
  rows: string[],
  uri: DocumentUri,
  range: Range,
  prefix: string,
  closingPrefix: string,
): void {
  const fileName = uriToFileName(uri);
  const script = test.getOrLoadScriptInfo(fileName);
  const content = script.text();
  const lineStarts = script.lineStarts();
  const startOffset = offsetFromPosition(script, range.start);
  const endOffset = offsetFromPosition(script, range.end);
  let contextStart = startOffset;
  while (contextStart > 0 && content[contextStart - 1] !== "\n" && content[contextStart - 1] !== "\r") contextStart -= 1;
  let contextEnd = endOffset;
  while (contextEnd < content.length && content[contextEnd] !== "\n" && content[contextEnd] !== "\r") contextEnd += 1;
  const contextStartLine = range.start.line;
  const contextEndLine = range.end.line;
  const lineNumberWidth = String(contextEndLine + 1).length + 2;

  rows.push(`${prefix}╭ ${fileName}:${formatRange(range)}`);
  for (let line = contextStartLine; line <= contextEndLine; line += 1) {
    const lineStart = lineStarts[line] ?? contextStart;
    const lineEnd = line + 1 < lineStarts.length ? lineStarts[line + 1]! : content.length;
    const lineContent = content.slice(lineStart, Math.min(lineEnd, contextEnd)).replace(/[\r\n]+$/u, "");
    const lineNumber = `${line + 1}:`.padStart(lineNumberWidth - 1, " ");
    rows.push(lineContent === "" ? `${prefix}│ ${lineNumber}` : `${prefix}│ ${lineNumber} ${lineContent}`);
    if (line >= range.start.line && line <= range.end.line) {
      const selectionStart = line === range.start.line ? range.start.character : 0;
      const selectionEnd = line === range.end.line ? range.end.character : lineContent.length;
      if (range.start.line === range.end.line && range.start.character === range.end.character) {
        rows.push(`${prefix}│ ${" ".repeat(lineNumberWidth + selectionStart)}<`);
      } else {
        const selectionLength = Math.max(selectionEnd - selectionStart, 1);
        rows.push(`${prefix}│ ${" ".repeat(lineNumberWidth + selectionStart)}${"^".repeat(selectionLength)}`);
      }
    }
  }
  rows.push(`${closingPrefix}╰`);
}

function renamedPath(path: string, oldPath: string, newPath: string): string | undefined {
  if (path === oldPath) return newPath;
  const normalizedOldPath = oldPath.endsWith("/") ? oldPath : `${oldPath}/`;
  if (path.startsWith(normalizedOldPath)) return `${newPath}${path.slice(oldPath.length)}`;
  return undefined;
}

function markerOrRangeToRange(markerOrRange: MarkerOrRange): Range {
  if (markerOrRange instanceof RangeMarker) return markerOrRange.lsRange;
  const position = markerOrRange.lsPos();
  return { start: position, end: position };
}

function symbolKindName(kind: number): string {
  const names: Readonly<Record<number, string>> = {
    1: "file",
    2: "module",
    3: "namespace",
    4: "package",
    5: "class",
    6: "method",
    7: "property",
    8: "field",
    9: "constructor",
    10: "enum",
    11: "interface",
    12: "function",
    13: "variable",
    14: "constant",
    15: "string",
    16: "number",
    17: "boolean",
    18: "array",
    19: "object",
    20: "key",
    21: "null",
    22: "enumMember",
    23: "struct",
    24: "event",
    25: "operator",
    26: "typeParameter",
  };
  return names[kind] ?? String(kind);
}

function symbolKindToLowercase(kind: number): string {
  return symbolKindName(kind).toLowerCase();
}

function hoverContentString(hover: Hover | undefined): string {
  if (hover === undefined) return "";
  return markupUnionText(hover.contents);
}

function markupUnionText(value: unknown): string {
  if (typeof value === "string") return value;
  if (!isRecord(value)) return "";
  if (typeof value["string"] === "string") return value["string"];
  const markup = value["markupContent"];
  if (isRecord(markup) && typeof markup["value"] === "string") return markup["value"];
  const marked = value["markedStringWithLanguage"];
  if (isRecord(marked) && typeof marked["language"] === "string" && typeof marked["value"] === "string") {
    return appendLinesForMarkedStringWithLanguage([], { language: marked["language"], value: marked["value"] }).join("\n");
  }
  const markedStrings = value["markedStrings"];
  if (Array.isArray(markedStrings)) return markedStrings.map(markupUnionText).join("\n");
  return "";
}

function appendLinesForMarkedStringWithLanguage(result: string[], markedString: MarkedStringWithLanguage): string[] {
  result.push(`\`\`\`${markedString.language}`);
  result.push(markedString.value);
  result.push("```");
  return result;
}

interface MarkedStringWithLanguage {
  readonly language: string;
  readonly value: string;
}

function verbosityLookup(
  levels: ReadonlyMap<string, readonly number[]> | Readonly<Record<string, readonly number[]>>,
  name: string,
): readonly number[] | undefined {
  if ("get" in levels && typeof levels.get === "function") return levels.get(name);
  return (levels as Readonly<Record<string, readonly number[]>>)[name];
}

function activeSignature(help: SignatureHelp | undefined) {
  if (help === undefined || help.signatures.length === 0) return undefined;
  return help.signatures[help.activeSignature ?? 0] ?? help.signatures[0];
}

function activeParameterIndex(help: SignatureHelp, signature: ReturnType<typeof activeSignature>): number | undefined {
  const active = signature?.activeParameter ?? help.activeParameter;
  if (active === undefined) return undefined;
  if ("uinteger" in active && typeof active.uinteger === "number") return active.uinteger;
  if ("integer" in active && typeof active.integer === "number") return active.integer;
  if ("number" in active && typeof active.number === "number") return active.number;
  return undefined;
}

function documentationText(value: unknown): string {
  return markupUnionText(value);
}

function formatSignatureHelp(help: SignatureHelp | undefined): readonly string[] {
  if (help === undefined || help.signatures.length === 0) return ["No signature help available"];
  const signature = activeSignature(help);
  if (signature === undefined) return ["No signature help available"];
  const activeParameter = activeParameterIndex(help, signature);
  const parameter = activeParameter === undefined ? undefined : signature.parameters?.[activeParameter];
  const result = [signature.label];
  const parameterDoc = documentationText(parameter?.documentation);
  if (parameterDoc !== "") result.push(parameterDoc);
  const signatureDoc = documentationText(signature.documentation);
  if (signatureDoc !== "") result.push(signatureDoc);
  return result;
}

function formatSelectionRangeChain(range: SelectionRange): string {
  const rows: string[] = [];
  let current: SelectionRange | undefined = range;
  while (current !== undefined) {
    rows.push(formatRange(current.range));
    current = current.parent;
  }
  return rows.join(" -> ");
}

function formatDiagnostic(diagnostic: Diagnostic): string {
  const code = diagnostic.code === undefined ? "" : ` TS${stableStringify(diagnostic.code)}`;
  return `${formatRange(diagnostic.range)}${code}: ${diagnostic.message}`;
}

function diagnosticCode(diagnostic: Diagnostic): number | undefined {
  const code = diagnostic.code;
  if (code === undefined) return undefined;
  if (typeof code === "number") return code;
  if (typeof code.integer === "number") return code.integer;
  if (typeof code.string === "string") {
    const parsed = Number(code.string);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function isSuggestionDiagnostic(diagnostic: Diagnostic): boolean {
  return diagnostic.severity === DiagnosticSeverityHint;
}

type FourslashDiagnosticCategory = "error" | "warning" | "message" | "suggestion";

class FourslashDiagnosticFile {
  private readonly lineMapText: string;
  private ecmaLineMapValue: readonly number[] | undefined;

  constructor(
    private readonly unitName: string,
    content: string,
  ) {
    this.lineMapText = content;
  }

  fileName(): string {
    return this.unitName;
  }

  text(): string {
    return this.lineMapText;
  }

  ecmaLineMap(): readonly number[] {
    this.ecmaLineMapValue ??= computeLineStarts(this.lineMapText);
    return this.ecmaLineMapValue;
  }
}

class FourslashDiagnostic {
  constructor(
    readonly file: FourslashDiagnosticFile,
    readonly loc: TextRange,
    readonly code: number,
    readonly category: FourslashDiagnosticCategory,
    readonly message: string,
    readonly relatedDiagnostics: readonly FourslashDiagnostic[],
    readonly reportsUnnecessary: boolean,
    readonly reportsDeprecated: boolean,
  ) {}

  pos(): number {
    return this.loc.pos;
  }

  end(): number {
    return this.loc.end;
  }

  len(): number {
    return this.loc.end - this.loc.pos;
  }

  localize(): string {
    return this.message;
  }

  messageChain(): readonly FourslashDiagnostic[] {
    return [];
  }

  relatedInformation(): readonly FourslashDiagnostic[] {
    return this.relatedDiagnostics;
  }
}

function diagnosticCategory(diagnostic: Diagnostic): FourslashDiagnosticCategory {
  switch (diagnostic.severity) {
    case DiagnosticSeverityWarning:
      return "warning";
    case DiagnosticSeverityInformation:
      return "message";
    case DiagnosticSeverityHint:
      return "suggestion";
    case DiagnosticSeverityError:
    default:
      return "error";
  }
}

function formatFourslashDiagnostic(diagnostic: FourslashDiagnostic): string {
  const script = newScriptInfo(diagnostic.file.fileName(), diagnostic.file.text());
  const range = {
    start: positionFromOffset(script, diagnostic.pos()),
    end: positionFromOffset(script, diagnostic.end()),
  };
  const tags = [
    diagnostic.reportsUnnecessary ? "unnecessary" : "",
    diagnostic.reportsDeprecated ? "deprecated" : "",
  ].filter(tag => tag !== "");
  const tagText = tags.length === 0 ? "" : ` [${tags.join(", ")}]`;
  const related = diagnostic.relatedInformation().map(info => {
    const relatedScript = newScriptInfo(info.file.fileName(), info.file.text());
    const relatedRange = {
      start: positionFromOffset(relatedScript, info.pos()),
      end: positionFromOffset(relatedScript, info.end()),
    };
    return `  Related ${info.file.fileName()}:${formatRange(relatedRange)} ${info.localize()}`;
  });
  return [
    `${diagnostic.file.fileName()}:${formatRange(range)} TS${diagnostic.code} ${diagnostic.category}${tagText}: ${diagnostic.localize()}`,
    ...related,
  ].join("\n");
}

function compareDiagnostics(left: FourslashDiagnostic, right: FourslashDiagnostic): number {
  return left.file.fileName().localeCompare(right.file.fileName())
    || left.pos() - right.pos()
    || left.end() - right.end()
    || left.code - right.code
    || left.message.localeCompare(right.message)
    || compareRelatedDiagnostics(left.relatedDiagnostics, right.relatedDiagnostics);
}

function compareRelatedDiagnostics(left: readonly FourslashDiagnostic[], right: readonly FourslashDiagnostic[]): number {
  const lengthCompare = right.length - left.length;
  if (lengthCompare !== 0) return lengthCompare;
  for (let index = 0; index < left.length; index += 1) {
    const comparison = compareDiagnostics(left[index]!, right[index]!);
    if (comparison !== 0) return comparison;
  }
  return 0;
}

function isLibFile(fileName: string): boolean {
  const slash = Math.max(fileName.lastIndexOf("/"), fileName.lastIndexOf("\\"));
  const baseName = slash < 0 ? fileName : fileName.slice(slash + 1);
  return baseName.startsWith("lib.") && baseName.endsWith(".d.ts");
}

function formatDocumentSymbols(symbols: readonly DocumentSymbol[] | readonly SymbolInformation[]): string {
  if (symbols.length === 0) return "";
  const first = symbols[0]!;
  if ("selectionRange" in first) {
    return (symbols as readonly DocumentSymbol[]).map(symbol => formatDocumentSymbol(symbol, 0)).join("\n");
  }
  return (symbols as readonly SymbolInformation[])
    .map(symbol => `${symbol.name} ${symbolKindToLowercase(symbol.kind)} ${symbol.location.uri}:${formatRange(symbol.location.range)}`)
    .join("\n");
}

function formatDocumentSymbol(symbol: DocumentSymbol, depth: number): string {
  const prefix = "  ".repeat(depth);
  const line = `${prefix}${symbol.name} ${symbolKindToLowercase(symbol.kind)} ${formatRange(symbol.selectionRange)}`;
  const children = symbol.children?.map(child => formatDocumentSymbol(child, depth + 1)) ?? [];
  return [line, ...children].join("\n");
}

function isDocumentSymbolList(symbols: readonly DocumentSymbol[] | readonly SymbolInformation[]): symbols is readonly DocumentSymbol[] {
  return symbols.length === 0 || "selectionRange" in symbols[0]!;
}

interface DocumentSpan {
  readonly uri: DocumentUri;
  readonly textSpan: Range;
  readonly contextSpan?: Range;
}

function documentSpanKey(span: DocumentSpan): string {
  return `${span.uri}\0${formatRange(span.textSpan)}\0${span.contextSpan === undefined ? "" : formatRange(span.contextSpan)}`;
}

function symbolLocationData(symbol: DocumentSymbol): string {
  return `{| name: ${symbol.name}, kind: ${symbolKindToLowercase(symbol.kind)} |}`;
}

function writeDocumentSymbolDetails(symbols: readonly DocumentSymbol[], indent: number): string {
  const rows: string[] = [];
  for (const symbol of symbols) {
    rows.push(`${"  ".repeat(indent)}(${symbolKindToLowercase(symbol.kind)}) ${symbol.name}`);
    if ((symbol.children?.length ?? 0) !== 0) rows.push(writeDocumentSymbolDetails(symbol.children ?? [], indent + 1));
  }
  return rows.filter(row => row !== "").join("\n");
}

function collectDocumentSymbolSpans(uri: DocumentUri, symbol: DocumentSymbol, spansToSymbol: Map<string, readonly [DocumentSpan, DocumentSymbol]>): void {
  const span = { uri, textSpan: symbol.selectionRange, contextSpan: symbol.range };
  spansToSymbol.set(documentSpanKey(span), [span, symbol]);
  for (const child of symbol.children ?? []) collectDocumentSymbolSpans(uri, child, spansToSymbol);
}

function verifyExactSymbols(actual: readonly SymbolInformation[], expected: readonly SymbolInformation[], prefix: string): void {
  if (actual.length !== expected.length) {
    fail(`${prefix}: Expected ${expected.length} symbols, but got ${actual.length}:\n${diffJson(actual, expected)}`);
  }
  for (let index = 0; index < actual.length; index += 1) {
    assertDeepEqual(actual[index], expected[index], prefix);
  }
}

function verifyIncludesSymbols(actual: readonly SymbolInformation[], includes: readonly SymbolInformation[], prefix: string): void {
  const nameAndLocationToSymbol = new Map<string, SymbolInformation>();
  for (const symbol of actual) nameAndLocationToSymbol.set(symbolInformationKey(symbol), symbol);
  for (const symbol of includes) {
    const actualSymbol = nameAndLocationToSymbol.get(symbolInformationKey(symbol));
    if (actualSymbol === undefined) fail(`${prefix}: Expected symbol '${symbol.name}' at location '${stableStringify(symbol.location)}' not found`);
    assertDeepEqual(actualSymbol, symbol, `${prefix}: Symbol '${symbol.name}' at location '${stableStringify(symbol.location)}' mismatch`);
  }
}

function symbolInformationKey(symbol: SymbolInformation): string {
  return `${symbol.name}\0${symbol.location.uri}\0${formatRange(symbol.location.range)}`;
}

function updatePositionForTextEdit(position: number, editStart: number, editEnd: number, newTextLength: number): number {
  if (position <= editStart) return position;
  if (position < editEnd) return -1;
  return position + newTextLength - (editEnd - editStart);
}

function assertValidTextRange(textRange: TextRange | undefined, message: string): asserts textRange is TextRange {
  if (textRange !== undefined && textRange.pos >= 0 && textRange.end >= 0) return;
  fail(message);
}

function selectCodeFixDiagnostic(diagnostics: readonly Diagnostic[], errorCode: number | undefined): Diagnostic | undefined {
  if (diagnostics.length === 0) return undefined;
  if (errorCode === undefined) return diagnostics[0];
  return diagnostics.find(diagnostic => diagnosticCode(diagnostic) === errorCode);
}

function fail(message: string): never {
  throw new Error(message);
}

// Source parity map: internal/fourslash/fourslash.go
/**
 * Source parity map for TS-Go `fourslash/fourslash.go`.
 *
 * This file preserves the upstream declaration and algorithm-line shape
 * for the TypeScript port. Runtime behavior is implemented by the
 * concrete modules that consume these exact parity maps.
 */

interface UpstreamSourceLine {
  readonly line: number;
  readonly text: string;
}

interface UpstreamDeclaration {
  readonly kind: "type" | "func" | "const" | "var";
  readonly line: number;
  readonly name: string;
  readonly receiver?: string;
}

const fourslashFourslashUpstreamPath = "fourslash/fourslash.go";

const fourslashFourslashDeclarations: readonly UpstreamDeclaration[] = [
  {"line":44,"kind":"type","name":"FourslashTest"},
  {"line":73,"kind":"type","name":"scriptInfo"},
  {"line":80,"kind":"type","name":"textEditSpan"},
  {"line":86,"kind":"func","name":"newScriptInfo"},
  {"line":95,"kind":"func","name":"editContent","receiver":"s *scriptInfo"},
  {"line":101,"kind":"func","name":"Text","receiver":"s *scriptInfo"},
  {"line":105,"kind":"func","name":"FileName","receiver":"s *scriptInfo"},
  {"line":109,"kind":"func","name":"GetLineContent","receiver":"s *scriptInfo"},
  {"line":125,"kind":"const","name":"rootDir"},
  {"line":127,"kind":"var","name":"parseCache"},
  {"line":132,"kind":"func","name":"NewFourslash"},
  {"line":238,"kind":"func","name":"handleServerRequest","receiver":"f *FourslashTest"},
  {"line":293,"kind":"func","name":"getBaseFileNameFromTest"},
  {"line":316,"kind":"const","name":"showCodeLensLocationsCommandName"},
  {"line":318,"kind":"func","name":"initialize","receiver":"f *FourslashTest"},
  {"line":341,"kind":"func","name":"defaultSemanticTokenTypes"},
  {"line":369,"kind":"func","name":"defaultSemanticTokenModifiers"},
  {"line":467,"kind":"func","name":"GetDefaultCapabilities"},
  {"line":558,"kind":"func","name":"getCapabilitiesWithDefaults"},
  {"line":679,"kind":"func","name":"updateState","receiver":"f *FourslashTest"},
  {"line":688,"kind":"func","name":"GetOptions","receiver":"f *FourslashTest"},
  {"line":692,"kind":"func","name":"Configure","receiver":"f *FourslashTest"},
  {"line":704,"kind":"func","name":"ConfigureWithReset","receiver":"f *FourslashTest"},
  {"line":712,"kind":"func","name":"GoToMarkerOrRange","receiver":"f *FourslashTest"},
  {"line":716,"kind":"func","name":"GoToMarker","receiver":"f *FourslashTest"},
  {"line":724,"kind":"func","name":"goToMarker","receiver":"f *FourslashTest"},
  {"line":730,"kind":"func","name":"GoToEOF","receiver":"f *FourslashTest"},
  {"line":737,"kind":"func","name":"GoToBOF","receiver":"f *FourslashTest"},
  {"line":741,"kind":"func","name":"GoToPosition","receiver":"f *FourslashTest"},
  {"line":747,"kind":"func","name":"goToPosition","receiver":"f *FourslashTest"},
  {"line":752,"kind":"func","name":"GoToEachMarker","receiver":"f *FourslashTest"},
  {"line":772,"kind":"func","name":"GoToEachRange","receiver":"f *FourslashTest"},
  {"line":780,"kind":"func","name":"GoToRangeStart","receiver":"f *FourslashTest"},
  {"line":785,"kind":"func","name":"GoToSelect","receiver":"f *FourslashTest"},
  {"line":802,"kind":"func","name":"GoToSelectRange","receiver":"f *FourslashTest"},
  {"line":807,"kind":"func","name":"GoToFile","receiver":"f *FourslashTest"},
  {"line":812,"kind":"func","name":"GoToFileNumber","receiver":"f *FourslashTest"},
  {"line":820,"kind":"func","name":"Markers","receiver":"f *FourslashTest"},
  {"line":824,"kind":"func","name":"MarkerNames","receiver":"f *FourslashTest"},
  {"line":833,"kind":"func","name":"MarkerByName","receiver":"f *FourslashTest"},
  {"line":837,"kind":"func","name":"Ranges","receiver":"f *FourslashTest"},
  {"line":841,"kind":"func","name":"getRangesInFile","receiver":"f *FourslashTest"},
  {"line":851,"kind":"func","name":"ensureActiveFile","receiver":"f *FourslashTest"},
  {"line":861,"kind":"func","name":"CloseFileOfMarker","receiver":"f *FourslashTest"},
  {"line":882,"kind":"func","name":"openFile","receiver":"f *FourslashTest"},
  {"line":903,"kind":"func","name":"FormatDocument","receiver":"f *FourslashTest"},
  {"line":919,"kind":"func","name":"FormatSelection","receiver":"f *FourslashTest"},
  {"line":949,"kind":"func","name":"VerifyCurrentFileContent","receiver":"f *FourslashTest"},
  {"line":955,"kind":"func","name":"VerifyCurrentLineContent","receiver":"f *FourslashTest"},
  {"line":967,"kind":"func","name":"VerifyIndentation","receiver":"f *FourslashTest"},
  {"line":974,"kind":"func","name":"getLanguageKind"},
  {"line":998,"kind":"type","name":"CompletionsExpectedList"},
  {"line":1005,"kind":"type","name":"Ignored"},
  {"line":1008,"kind":"type","name":"ExpectedCompletionEditRange"},
  {"line":1010,"kind":"type","name":"EditRange"},
  {"line":1015,"kind":"type","name":"CompletionsExpectedItemDefaults"},
  {"line":1021,"kind":"type","name":"CompletionsExpectedItem"},
  {"line":1023,"kind":"type","name":"CompletionsExpectedItems"},
  {"line":1030,"kind":"type","name":"CompletionsExpectedCodeAction"},
  {"line":1037,"kind":"type","name":"VerifyCompletionsResult"},
  {"line":1043,"kind":"type","name":"MarkerInput"},
  {"line":1047,"kind":"func","name":"VerifyCompletions","receiver":"f *FourslashTest"},
  {"line":1110,"kind":"func","name":"verifyCompletionsWorker","receiver":"f *FourslashTest"},
  {"line":1122,"kind":"func","name":"GetCompletions","receiver":"f *FourslashTest"},
  {"line":1127,"kind":"func","name":"getCompletions","receiver":"f *FourslashTest"},
  {"line":1150,"kind":"func","name":"verifyCompletionsResult","receiver":"f *FourslashTest"},
  {"line":1173,"kind":"func","name":"isEmptyExpectedList"},
  {"line":1177,"kind":"func","name":"verifyCompletionsItemDefaults"},
  {"line":1215,"kind":"func","name":"verifyCompletionsItems","receiver":"f *FourslashTest"},
  {"line":1348,"kind":"func","name":"verifyCompletionsAreExactly","receiver":"f *FourslashTest"},
  {"line":1367,"kind":"func","name":"ignorePaths"},
  {"line":1382,"kind":"func","name":"verifyCompletionItem","receiver":"f *FourslashTest"},
  {"line":1445,"kind":"func","name":"ResolveCompletionItem","receiver":"f *FourslashTest"},
  {"line":1450,"kind":"func","name":"resolveCompletionItem","receiver":"f *FourslashTest"},
  {"line":1455,"kind":"func","name":"getExpectedLabel"},
  {"line":1467,"kind":"func","name":"assertDeepEqual"},
  {"line":1477,"kind":"type","name":"VerifyCodeFixOptions"},
  {"line":1487,"kind":"type","name":"VerifyCodeFixAllOptions"},
  {"line":1493,"kind":"func","name":"VerifyCodeFix","receiver":"f *FourslashTest"},
  {"line":1570,"kind":"func","name":"VerifyRangeAfterCodeFix","receiver":"f *FourslashTest"},
  {"line":1606,"kind":"func","name":"getCodeActionEditsForActiveFile","receiver":"f *FourslashTest"},
  {"line":1624,"kind":"func","name":"VerifyCodeFixAvailable","receiver":"f *FourslashTest"},
  {"line":1659,"kind":"func","name":"VerifyCodeFixNotAvailable","receiver":"f *FourslashTest"},
  {"line":1686,"kind":"func","name":"VerifyCodeFixAvailableExact","receiver":"f *FourslashTest"},
  {"line":1720,"kind":"func","name":"VerifyCodeFixAll","receiver":"f *FourslashTest"},
  {"line":1775,"kind":"func","name":"VerifySourceFixAll","receiver":"f *FourslashTest"},
  {"line":1825,"kind":"func","name":"getCodeFixActions","receiver":"f *FourslashTest"},
  {"line":1839,"kind":"func","name":"getAllQuickFixActions","receiver":"f *FourslashTest"},
  {"line":1889,"kind":"func","name":"updateTextRangeForTextEdits","receiver":"f *FourslashTest"},
  {"line":1921,"kind":"func","name":"applyEditsToContent","receiver":"f *FourslashTest"},
  {"line":1937,"kind":"func","name":"VerifyOrganizeImports","receiver":"f *FourslashTest"},
  {"line":1992,"kind":"type","name":"ApplyCodeActionFromCompletionOptions"},
  {"line":2002,"kind":"func","name":"VerifyApplyCodeActionFromCompletion","receiver":"f *FourslashTest"},
  {"line":2073,"kind":"func","name":"VerifyImportFixAtPosition","receiver":"f *FourslashTest"},
  {"line":2196,"kind":"func","name":"VerifyImportFixModuleSpecifiers","receiver":"f *FourslashTest"},
  {"line":2273,"kind":"func","name":"extractModuleSpecifier"},
  {"line":2305,"kind":"func","name":"VerifyBaselineFindAllReferences","receiver":"f *FourslashTest"},
  {"line":2333,"kind":"func","name":"VerifyBaselineCodeLens","receiver":"f *FourslashTest"},
  {"line":2388,"kind":"func","name":"MarkTestAsStradaServer","receiver":"f *FourslashTest"},
  {"line":2392,"kind":"func","name":"VerifyBaselineGoToDefinition","receiver":"f *FourslashTest"},
  {"line":2416,"kind":"func","name":"verifyBaselineDefinitions","receiver":"f *FourslashTest"},
  {"line":2472,"kind":"func","name":"VerifyBaselineGoToTypeDefinition","receiver":"f *FourslashTest"},
  {"line":2495,"kind":"func","name":"VerifyBaselineGoToSourceDefinition","receiver":"f *FourslashTest"},
  {"line":2522,"kind":"func","name":"VerifyBaselineWorkspaceSymbol","receiver":"f *FourslashTest"},
  {"line":2547,"kind":"func","name":"VerifyOutliningSpans","receiver":"f *FourslashTest"},
  {"line":2597,"kind":"type","name":"FoldingRangeLineExpected"},
  {"line":2604,"kind":"func","name":"VerifyFoldingRangeLines","receiver":"f *FourslashTest"},
  {"line":2629,"kind":"func","name":"VerifyBaselineHover","receiver":"f *FourslashTest"},
  {"line":2686,"kind":"func","name":"appendLinesForMarkedStringWithLanguage"},
  {"line":2693,"kind":"type","name":"hoverWithVerbosity"},
  {"line":2699,"kind":"func","name":"hoverContentString"},
  {"line":2712,"kind":"func","name":"VerifyBaselineHoverWithVerbosity","receiver":"f *FourslashTest"},
  {"line":2801,"kind":"func","name":"VerifyBaselineSignatureHelp","receiver":"f *FourslashTest"},
  {"line":2911,"kind":"func","name":"VerifyBaselineSelectionRanges","receiver":"f *FourslashTest"},
  {"line":3049,"kind":"func","name":"VerifyBaselineCallHierarchy","receiver":"f *FourslashTest"},
  {"line":3078,"kind":"type","name":"callHierarchyItemDirection"},
  {"line":3086,"kind":"type","name":"callHierarchyItemKey"},
  {"line":3092,"kind":"func","name":"symbolKindToLowercase"},
  {"line":3096,"kind":"func","name":"formatCallHierarchyItem"},
  {"line":3241,"kind":"func","name":"formatCallHierarchyItemSpan"},
  {"line":3341,"kind":"func","name":"computeLineStarts"},
  {"line":3351,"kind":"func","name":"formatCallHierarchyItemSpans"},
  {"line":3368,"kind":"func","name":"VerifyBaselineDocumentHighlights","receiver":"f *FourslashTest"},
  {"line":3376,"kind":"func","name":"VerifyBaselineDocumentHighlightsWithOptions","receiver":"f *FourslashTest"},
  {"line":3403,"kind":"func","name":"verifyBaselineDocumentHighlights","receiver":"f *FourslashTest"},
  {"line":3482,"kind":"func","name":"lookupMarkersOrGetRanges","receiver":"f *FourslashTest"},
  {"line":3518,"kind":"func","name":"Insert","receiver":"f *FourslashTest"},
  {"line":3525,"kind":"func","name":"InsertLine","receiver":"f *FourslashTest"},
  {"line":3532,"kind":"func","name":"Backspace","receiver":"f *FourslashTest"},
  {"line":3548,"kind":"func","name":"DeleteAtCaret","receiver":"f *FourslashTest"},
  {"line":3560,"kind":"func","name":"Paste","receiver":"f *FourslashTest"},
  {"line":3586,"kind":"func","name":"ReplaceLine","receiver":"f *FourslashTest"},
  {"line":3592,"kind":"func","name":"selectLine","receiver":"f *FourslashTest"},
  {"line":3604,"kind":"func","name":"selectRange","receiver":"f *FourslashTest"},
  {"line":3612,"kind":"func","name":"getSelection","receiver":"f *FourslashTest"},
  {"line":3627,"kind":"func","name":"applyTextEdits","receiver":"f *FourslashTest"},
  {"line":3660,"kind":"func","name":"Replace","receiver":"f *FourslashTest"},
  {"line":3665,"kind":"func","name":"replaceWorker","receiver":"f *FourslashTest"},
  {"line":3672,"kind":"func","name":"typeText","receiver":"f *FourslashTest"},
  {"line":3715,"kind":"func","name":"editScriptAndUpdateMarkers","receiver":"f *FourslashTest"},
  {"line":3719,"kind":"func","name":"editScriptAndUpdateMarkersWorker","receiver":"f *FourslashTest"},
  {"line":3750,"kind":"func","name":"updatePosition"},
  {"line":3761,"kind":"func","name":"editScript","receiver":"f *FourslashTest"},
  {"line":3787,"kind":"func","name":"getScriptInfo","receiver":"f *FourslashTest"},
  {"line":3791,"kind":"func","name":"getOrLoadScriptInfo","receiver":"f *FourslashTest"},
  {"line":3804,"kind":"func","name":"VerifyQuickInfoAt","receiver":"f *FourslashTest"},
  {"line":3810,"kind":"func","name":"getQuickInfoAtCurrentPosition","receiver":"f *FourslashTest"},
  {"line":3824,"kind":"func","name":"verifyHoverContent","receiver":"f *FourslashTest"},
  {"line":3839,"kind":"func","name":"verifyHoverMarkdown","receiver":"f *FourslashTest"},
  {"line":3850,"kind":"func","name":"VerifyQuickInfoExists","receiver":"f *FourslashTest"},
  {"line":3856,"kind":"func","name":"VerifyNotQuickInfoExists","receiver":"f *FourslashTest"},
  {"line":3862,"kind":"func","name":"quickInfoIsEmpty","receiver":"f *FourslashTest"},
  {"line":3871,"kind":"func","name":"VerifyQuickInfoIs","receiver":"f *FourslashTest"},
  {"line":3876,"kind":"func","name":"VerifyJsxClosingTag","receiver":"f *FourslashTest"},
  {"line":3906,"kind":"func","name":"VerifyBaselineClosingTags","receiver":"f *FourslashTest"},
  {"line":3950,"kind":"type","name":"VerifySignatureHelpOptions"},
  {"line":3974,"kind":"func","name":"VerifySignatureHelp","receiver":"f *FourslashTest"},
  {"line":4134,"kind":"func","name":"VerifyNoSignatureHelp","receiver":"f *FourslashTest"},
  {"line":4150,"kind":"func","name":"VerifyNoSignatureHelpWithContext","receiver":"f *FourslashTest"},
  {"line":4167,"kind":"func","name":"VerifyNoSignatureHelpForMarkersWithContext","receiver":"f *FourslashTest"},
  {"line":4176,"kind":"func","name":"VerifySignatureHelpPresent","receiver":"f *FourslashTest"},
  {"line":4193,"kind":"func","name":"VerifySignatureHelpPresentForMarkers","receiver":"f *FourslashTest"},
  {"line":4202,"kind":"func","name":"VerifyNoSignatureHelpForMarkers","receiver":"f *FourslashTest"},
  {"line":4210,"kind":"type","name":"SignatureHelpCase"},
  {"line":4218,"kind":"func","name":"VerifySignatureHelpWithCases","receiver":"f *FourslashTest"},
  {"line":4245,"kind":"func","name":"verifySignatureHelp","receiver":"f *FourslashTest"},
  {"line":4262,"kind":"func","name":"verifySignatureHelpResult","receiver":"f *FourslashTest"},
  {"line":4271,"kind":"func","name":"getCurrentPositionPrefix","receiver":"f *FourslashTest"},
  {"line":4278,"kind":"func","name":"BaselineAutoImportsCompletions","receiver":"f *FourslashTest"},
  {"line":4373,"kind":"type","name":"MarkerOrRangeOrName"},
  {"line":4375,"kind":"func","name":"VerifyBaselineRename","receiver":"f *FourslashTest"},
  {"line":4401,"kind":"func","name":"verifyBaselineRename","receiver":"f *FourslashTest"},
  {"line":4483,"kind":"func","name":"VerifyRenameSucceeded","receiver":"f *FourslashTest"},
  {"line":4513,"kind":"func","name":"RenameAtCaret","receiver":"f *FourslashTest"},
  {"line":4585,"kind":"func","name":"WillRenameFiles","receiver":"f *FourslashTest"},
  {"line":4593,"kind":"func","name":"willRenameFilesWorker","receiver":"f *FourslashTest"},
  {"line":4656,"kind":"func","name":"VerifyRename","receiver":"f *FourslashTest"},
  {"line":4669,"kind":"func","name":"VerifyWillRenameFilesEdits","receiver":"f *FourslashTest"},
  {"line":4689,"kind":"func","name":"getPathUpdater","receiver":"f *FourslashTest"},
  {"line":4702,"kind":"func","name":"renameFileOrDirectory","receiver":"f *FourslashTest"},
  {"line":4795,"kind":"func","name":"VerifyRenameFailed","receiver":"f *FourslashTest"},
  {"line":4835,"kind":"func","name":"VerifyBaselineRenameAtRangesWithText","receiver":"f *FourslashTest"},
  {"line":4848,"kind":"func","name":"GetRangesByText","receiver":"f *FourslashTest"},
  {"line":4861,"kind":"func","name":"getRangeText","receiver":"f *FourslashTest"},
  {"line":4866,"kind":"func","name":"verifyBaselines","receiver":"f *FourslashTest"},
  {"line":4876,"kind":"func","name":"VerifyBaselineInlayHints","receiver":"f *FourslashTest"},
  {"line":4937,"kind":"func","name":"VerifyBaselineLinkedEditing","receiver":"f *FourslashTest"},
  {"line":5016,"kind":"func","name":"VerifyLinkedEditing","receiver":"f *FourslashTest"},
  {"line":5043,"kind":"func","name":"VerifyDiagnostics","receiver":"f *FourslashTest"},
  {"line":5048,"kind":"func","name":"VerifyNonSuggestionDiagnostics","receiver":"f *FourslashTest"},
  {"line":5053,"kind":"func","name":"VerifySuggestionDiagnostics","receiver":"f *FourslashTest"},
  {"line":5057,"kind":"func","name":"verifyDiagnostics","receiver":"f *FourslashTest"},
  {"line":5081,"kind":"func","name":"getDiagnostics","receiver":"f *FourslashTest"},
  {"line":5094,"kind":"func","name":"isSuggestionDiagnostic"},
  {"line":5098,"kind":"func","name":"VerifyBaselineNonSuggestionDiagnostics","receiver":"f *FourslashTest"},
  {"line":5121,"kind":"type","name":"fourslashDiagnostic"},
  {"line":5132,"kind":"type","name":"fourslashDiagnosticFile"},
  {"line":5137,"kind":"var","name":"_"},
  {"line":5139,"kind":"func","name":"FileName","receiver":"f *fourslashDiagnosticFile"},
  {"line":5143,"kind":"func","name":"Text","receiver":"f *fourslashDiagnosticFile"},
  {"line":5147,"kind":"func","name":"ECMALineMap","receiver":"f *fourslashDiagnosticFile"},
  {"line":5154,"kind":"var","name":"_"},
  {"line":5156,"kind":"func","name":"File","receiver":"d *fourslashDiagnostic"},
  {"line":5160,"kind":"func","name":"Pos","receiver":"d *fourslashDiagnostic"},
  {"line":5164,"kind":"func","name":"End","receiver":"d *fourslashDiagnostic"},
  {"line":5168,"kind":"func","name":"Len","receiver":"d *fourslashDiagnostic"},
  {"line":5172,"kind":"func","name":"Code","receiver":"d *fourslashDiagnostic"},
  {"line":5176,"kind":"func","name":"Category","receiver":"d *fourslashDiagnostic"},
  {"line":5180,"kind":"func","name":"Localize","receiver":"d *fourslashDiagnostic"},
  {"line":5184,"kind":"func","name":"MessageChain","receiver":"d *fourslashDiagnostic"},
  {"line":5188,"kind":"func","name":"RelatedInformation","receiver":"d *fourslashDiagnostic"},
  {"line":5196,"kind":"func","name":"toDiagnostic","receiver":"f *FourslashTest"},
  {"line":5246,"kind":"func","name":"compareDiagnostics"},
  {"line":5270,"kind":"func","name":"compareRelatedDiagnostics"},
  {"line":5284,"kind":"func","name":"isLibFile"},
  {"line":5292,"kind":"var","name":"AnyTextEdits"},
  {"line":5294,"kind":"func","name":"VerifyBaselineGoToImplementation","receiver":"f *FourslashTest"},
  {"line":5314,"kind":"type","name":"VerifyWorkspaceSymbolCase"},
  {"line":5322,"kind":"func","name":"VerifyWorkspaceSymbol","receiver":"f *FourslashTest"},
  {"line":5349,"kind":"func","name":"verifyExactSymbols"},
  {"line":5363,"kind":"func","name":"verifyIncludesSymbols"},
  {"line":5387,"kind":"func","name":"VerifyBaselineDocumentSymbol","receiver":"f *FourslashTest"},
  {"line":5419,"kind":"func","name":"writeDocumentSymbolDetails"},
  {"line":5428,"kind":"func","name":"collectDocumentSymbolSpans"},
  {"line":5447,"kind":"func","name":"VerifyNumberOfErrorsInCurrentFile","receiver":"f *FourslashTest"},
  {"line":5459,"kind":"func","name":"VerifyNoErrors","receiver":"f *FourslashTest"},
  {"line":5477,"kind":"func","name":"VerifyErrorExistsAtRange","receiver":"f *FourslashTest"},
  {"line":5498,"kind":"func","name":"VerifyErrorExistsBetweenMarkers","receiver":"f *FourslashTest"},
  {"line":5528,"kind":"func","name":"VerifyErrorExistsAfterMarker","receiver":"f *FourslashTest"},
  {"line":5559,"kind":"func","name":"VerifyErrorExistsBeforeMarker","receiver":"f *FourslashTest"},
  {"line":5589,"kind":"func","name":"updatePositionForTextEdit"},
  {"line":5599,"kind":"func","name":"removeWhitespace"},
  {"line":5610,"kind":"func","name":"assertValidTextRange"},
  {"line":5618,"kind":"func","name":"selectCodeFixDiagnostic"},
];

const fourslashFourslashSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package fourslash"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"context\""},
  {"line":5,"text":"\t\"fmt\""},
  {"line":6,"text":"\t\"io\""},
  {"line":7,"text":"\t\"maps\""},
  {"line":8,"text":"\t\"runtime\""},
  {"line":9,"text":"\t\"slices\""},
  {"line":10,"text":"\t\"strconv\""},
  {"line":11,"text":"\t\"strings\""},
  {"line":12,"text":"\t\"testing\""},
  {"line":13,"text":"\t\"unicode/utf8\""},
  {"line":15,"text":"\t\"github.com/google/go-cmp/cmp\""},
  {"line":16,"text":"\t\"github.com/microsoft/typescript-go/internal/bundled\""},
  {"line":17,"text":"\t\"github.com/microsoft/typescript-go/internal/collections\""},
  {"line":18,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":19,"text":"\t\"github.com/microsoft/typescript-go/internal/diagnostics\""},
  {"line":20,"text":"\t\"github.com/microsoft/typescript-go/internal/diagnosticwriter\""},
  {"line":21,"text":"\t\"github.com/microsoft/typescript-go/internal/execute/tsctests\""},
  {"line":22,"text":"\t\"github.com/microsoft/typescript-go/internal/json\""},
  {"line":23,"text":"\t\"github.com/microsoft/typescript-go/internal/jsonrpc\""},
  {"line":24,"text":"\t\"github.com/microsoft/typescript-go/internal/locale\""},
  {"line":25,"text":"\t\"github.com/microsoft/typescript-go/internal/ls\""},
  {"line":26,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsconv\""},
  {"line":27,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsutil\""},
  {"line":28,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp\""},
  {"line":29,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":30,"text":"\t\"github.com/microsoft/typescript-go/internal/project\""},
  {"line":31,"text":"\t\"github.com/microsoft/typescript-go/internal/repo\""},
  {"line":32,"text":"\t\"github.com/microsoft/typescript-go/internal/stringutil\""},
  {"line":33,"text":"\t\"github.com/microsoft/typescript-go/internal/testutil/baseline\""},
  {"line":34,"text":"\t\"github.com/microsoft/typescript-go/internal/testutil/harnessutil\""},
  {"line":35,"text":"\t\"github.com/microsoft/typescript-go/internal/testutil/lsptestutil\""},
  {"line":36,"text":"\t\"github.com/microsoft/typescript-go/internal/testutil/tsbaseline\""},
  {"line":37,"text":"\t\"github.com/microsoft/typescript-go/internal/tspath\""},
  {"line":38,"text":"\t\"github.com/microsoft/typescript-go/internal/vfs\""},
  {"line":39,"text":"\t\"github.com/microsoft/typescript-go/internal/vfs/iovfs\""},
  {"line":40,"text":"\t\"github.com/microsoft/typescript-go/internal/vfs/vfstest\""},
  {"line":41,"text":"\t\"gotest.tools/v3/assert\""},
  {"line":42,"text":")"},
  {"line":44,"text":"type FourslashTest struct {"},
  {"line":45,"text":"\tclient *lsptestutil.LSPClient"},
  {"line":46,"text":"\tvfs    vfs.FS"},
  {"line":48,"text":"\ttestData      *TestData // !!! consolidate test files from test data and script info"},
  {"line":49,"text":"\tbaselines     map[baselineCommand]*strings.Builder"},
  {"line":50,"text":"\trangesByText  *collections.MultiMap[string, *RangeMarker]"},
  {"line":51,"text":"\topenFiles     map[string]struct{}"},
  {"line":52,"text":"\tstateBaseline *stateBaseline"},
  {"line":54,"text":"\tscriptInfos map[string]*scriptInfo"},
  {"line":55,"text":"\tconverters  *lsconv.Converters"},
  {"line":57,"text":"\tstateEnableFormatting   bool"},
  {"line":58,"text":"\treportFormatOnTypeCrash bool"},
  {"line":59,"text":"\tuserPreferences         lsutil.UserPreferences"},
  {"line":60,"text":"\tcurrentCaretPosition    lsproto.Position"},
  {"line":61,"text":"\tlastKnownMarkerName     *string"},
  {"line":62,"text":"\tactiveFilename          string"},
  {"line":63,"text":"\tselectionEnd            *lsproto.Position"},
  {"line":65,"text":"\tcapabilities   *lsproto.ClientCapabilities"},
  {"line":66,"text":"\tisStradaServer bool // Whether this is a fourslash server test in Strada. !!! Remove once we don't need to diff baselines."},
  {"line":69,"text":"\tsemanticTokenTypes     []string"},
  {"line":70,"text":"\tsemanticTokenModifiers []string"},
  {"line":71,"text":"}"},
  {"line":73,"text":"type scriptInfo struct {"},
  {"line":74,"text":"\tfileName string"},
  {"line":75,"text":"\tcontent  string"},
  {"line":76,"text":"\tlineMap  *lsconv.LSPLineMap"},
  {"line":77,"text":"\tversion  int32"},
  {"line":78,"text":"}"},
  {"line":80,"text":"type textEditSpan struct {"},
  {"line":81,"text":"\tstart  int"},
  {"line":82,"text":"\tend    int"},
  {"line":83,"text":"\tlength int"},
  {"line":84,"text":"}"},
  {"line":86,"text":"func newScriptInfo(fileName string, content string) *scriptInfo {"},
  {"line":87,"text":"\treturn &scriptInfo{"},
  {"line":88,"text":"\t\tfileName: fileName,"},
  {"line":89,"text":"\t\tcontent:  content,"},
  {"line":90,"text":"\t\tlineMap:  lsconv.ComputeLSPLineStarts(content),"},
  {"line":91,"text":"\t\tversion:  1,"},
  {"line":92,"text":"\t}"},
  {"line":93,"text":"}"},
  {"line":95,"text":"func (s *scriptInfo) editContent(change core.TextChange) {"},
  {"line":96,"text":"\ts.content = change.ApplyTo(s.content)"},
  {"line":97,"text":"\ts.lineMap = lsconv.ComputeLSPLineStarts(s.content)"},
  {"line":98,"text":"\ts.version++"},
  {"line":99,"text":"}"},
  {"line":101,"text":"func (s *scriptInfo) Text() string {"},
  {"line":102,"text":"\treturn s.content"},
  {"line":103,"text":"}"},
  {"line":105,"text":"func (s *scriptInfo) FileName() string {"},
  {"line":106,"text":"\treturn s.fileName"},
  {"line":107,"text":"}"},
  {"line":109,"text":"func (s *scriptInfo) GetLineContent(line int) string {"},
  {"line":110,"text":"\tnumLines := len(s.lineMap.LineStarts)"},
  {"line":111,"text":"\tif line < 0 || line >= numLines {"},
  {"line":112,"text":"\t\treturn \"\""},
  {"line":113,"text":"\t}"},
  {"line":114,"text":"\tstart := s.lineMap.LineStarts[line]"},
  {"line":115,"text":"\tvar end core.TextPos"},
  {"line":116,"text":"\tif line+1 < numLines {"},
  {"line":117,"text":"\t\tend = s.lineMap.LineStarts[line+1]"},
  {"line":118,"text":"\t} else {"},
  {"line":119,"text":"\t\tend = core.TextPos(len(s.content))"},
  {"line":120,"text":"\t}"},
  {"line":122,"text":"\treturn strings.TrimRight(s.content[start:end], \"\\r\\n\")"},
  {"line":123,"text":"}"},
  {"line":125,"text":"const rootDir = \"/\""},
  {"line":127,"text":"var parseCache = project.NewParseCache(project.RefCountCacheOptions{"},
  {"line":128,"text":"\tDisableDeletion: true,"},
  {"line":129,"text":"},"},
  {"line":130,"text":")"},
  {"line":132,"text":"func NewFourslash(t *testing.T, capabilities *lsproto.ClientCapabilities, content string) (*FourslashTest, func()) {"},
  {"line":133,"text":"\trepo.SkipIfNoTypeScriptSubmodule(t)"},
  {"line":134,"text":"\tif !bundled.Embedded {"},
  {"line":137,"text":"\t\tt.Skip(\"bundled files are not embedded\")"},
  {"line":138,"text":"\t}"},
  {"line":140,"text":"\tfileName := getBaseFileNameFromTest(t) + tspath.ExtensionTs"},
  {"line":141,"text":"\ttestfs := make(map[string]any)"},
  {"line":142,"text":"\tscriptInfos := make(map[string]*scriptInfo)"},
  {"line":143,"text":"\ttestData := ParseTestData(t, content, fileName)"},
  {"line":144,"text":"\tfor _, file := range testData.Files {"},
  {"line":145,"text":"\t\tfilePath := tspath.GetNormalizedAbsolutePath(file.fileName, rootDir)"},
  {"line":147,"text":"\t\tif !tspath.IsDynamicFileName(filePath) {"},
  {"line":148,"text":"\t\t\ttestfs[filePath] = file.Content"},
  {"line":149,"text":"\t\t}"},
  {"line":150,"text":"\t\tscriptInfos[filePath] = newScriptInfo(filePath, file.Content)"},
  {"line":151,"text":"\t}"},
  {"line":153,"text":"\tfor link, target := range testData.Symlinks {"},
  {"line":154,"text":"\t\tfilePath := tspath.GetNormalizedAbsolutePath(link, rootDir)"},
  {"line":155,"text":"\t\ttestfs[filePath] = vfstest.Symlink(tspath.GetNormalizedAbsolutePath(target, rootDir))"},
  {"line":156,"text":"\t}"},
  {"line":159,"text":"\tcompilerOptions := &core.CompilerOptions{"},
  {"line":160,"text":"\t\tSkipDefaultLibCheck: core.TSTrue,"},
  {"line":161,"text":"\t\tTarget:              core.ScriptTargetLatestStandard,"},
  {"line":162,"text":"\t\tJsx:                 core.JsxEmitPreserve,"},
  {"line":163,"text":"\t}"},
  {"line":164,"text":"\tharnessOptions := harnessutil.HarnessOptions{UseCaseSensitiveFileNames: true, CurrentDirectory: rootDir}"},
  {"line":165,"text":"\tharnessutil.SetOptionsFromTestConfig(t, testData.GlobalOptions, compilerOptions, &harnessOptions, rootDir, true /*allowUnknownOptions*/)"},
  {"line":166,"text":"\tif commandLines := testData.GlobalOptions[\"tsc\"]; commandLines != \"\" {"},
  {"line":167,"text":"\t\tfor commandLine := range strings.SplitSeq(commandLines, \",\") {"},
  {"line":168,"text":"\t\t\ttsctests.GetFileMapWithBuild(testfs, strings.Split(commandLine, \" \"))"},
  {"line":169,"text":"\t\t}"},
  {"line":170,"text":"\t}"},
  {"line":172,"text":"\tharnessutil.SkipUnsupportedCompilerOptions(t, compilerOptions)"},
  {"line":174,"text":"\tfsFromMap := vfstest.FromMap(testfs, harnessOptions.UseCaseSensitiveFileNames)"},
  {"line":175,"text":"\tfs := bundled.WrapFS(fsFromMap)"},
  {"line":177,"text":"\tserverOpts := lsp.ServerOptions{"},
  {"line":178,"text":"\t\tErr: io.Discard,"},
  {"line":180,"text":"\t\tCwd:                \"/\","},
  {"line":181,"text":"\t\tFS:                 fs,"},
  {"line":182,"text":"\t\tDefaultLibraryPath: bundled.LibPath(),"},
  {"line":184,"text":"\t\tParseCache: parseCache,"},
  {"line":185,"text":"\t}"},
  {"line":187,"text":"\tconverters := lsconv.NewConverters(lsproto.PositionEncodingKindUTF8, func(fileName string) *lsconv.LSPLineMap {"},
  {"line":188,"text":"\t\tscriptInfo, ok := scriptInfos[fileName]"},
  {"line":189,"text":"\t\tif !ok {"},
  {"line":190,"text":"\t\t\treturn nil"},
  {"line":191,"text":"\t\t}"},
  {"line":192,"text":"\t\treturn scriptInfo.lineMap"},
  {"line":193,"text":"\t})"},
  {"line":195,"text":"\tf := &FourslashTest{"},
  {"line":196,"text":"\t\ttestData:                &testData,"},
  {"line":197,"text":"\t\tstateEnableFormatting:   true,"},
  {"line":198,"text":"\t\treportFormatOnTypeCrash: true,"},
  {"line":199,"text":"\t\tuserPreferences:         lsutil.NewDefaultUserPreferences(),"},
  {"line":200,"text":"\t\tvfs:                     fs,"},
  {"line":201,"text":"\t\tscriptInfos:             scriptInfos,"},
  {"line":202,"text":"\t\tconverters:              converters,"},
  {"line":203,"text":"\t\tbaselines:               make(map[baselineCommand]*strings.Builder),"},
  {"line":204,"text":"\t\topenFiles:               make(map[string]struct{}),"},
  {"line":205,"text":"\t\tsemanticTokenTypes:      defaultSemanticTokenTypes(),"},
  {"line":206,"text":"\t\tsemanticTokenModifiers:  defaultSemanticTokenModifiers(),"},
  {"line":207,"text":"\t}"},
  {"line":208,"text":"\tclient, closeClient := lsptestutil.NewLSPClient(t, serverOpts, f.handleServerRequest)"},
  {"line":209,"text":"\tf.client = client"},
  {"line":213,"text":"\tclient.SetCompilerOptionsForInferredProjects(compilerOptions)"},
  {"line":214,"text":"\tf.initialize(t, capabilities)"},
  {"line":216,"text":"\tif testData.isStateBaseliningEnabled() {"},
  {"line":218,"text":"\t\tf.stateBaseline = newStateBaseline(fsFromMap.(iovfs.FsWithSys))"},
  {"line":219,"text":"\t} else {"},
  {"line":220,"text":"\t\tfor _, file := range testData.Files {"},
  {"line":221,"text":"\t\t\tf.openFile(t, file.fileName)"},
  {"line":222,"text":"\t\t}"},
  {"line":223,"text":"\t\tf.activeFilename = f.testData.Files[0].fileName"},
  {"line":224,"text":"\t}"},
  {"line":226,"text":"\t_, testPath, _, _ := runtime.Caller(1)"},
  {"line":227,"text":"\treturn f, func() {"},
  {"line":228,"text":"\t\tt.Helper()"},
  {"line":229,"text":"\t\terr := closeClient()"},
  {"line":230,"text":"\t\tif err != nil {"},
  {"line":231,"text":"\t\t\tt.Errorf(\"goroutine error: %v\", err)"},
  {"line":232,"text":"\t\t}"},
  {"line":233,"text":"\t\tf.verifyBaselines(t, testPath)"},
  {"line":234,"text":"\t}"},
  {"line":235,"text":"}"},
  {"line":238,"text":"func (f *FourslashTest) handleServerRequest(_ context.Context, req *lsproto.RequestMessage) *lsproto.ResponseMessage {"},
  {"line":239,"text":"\tswitch req.Method {"},
  {"line":240,"text":"\tcase lsproto.MethodWorkspaceConfiguration:"},
  {"line":244,"text":"\t\tparams, ok := req.Params.(*lsproto.ConfigurationParams)"},
  {"line":245,"text":"\t\tif !ok || params == nil || params.Items == nil {"},
  {"line":246,"text":"\t\t\treturn &lsproto.ResponseMessage{"},
  {"line":247,"text":"\t\t\t\tID:      req.ID,"},
  {"line":248,"text":"\t\t\t\tJSONRPC: req.JSONRPC,"},
  {"line":249,"text":"\t\t\t\tResult:  []any{f.userPreferences},"},
  {"line":250,"text":"\t\t\t}"},
  {"line":251,"text":"\t\t}"},
  {"line":252,"text":"\t\tresults := make([]any, len(params.Items))"},
  {"line":253,"text":"\t\tfor i, item := range params.Items {"},
  {"line":254,"text":"\t\t\tif item.Section != nil && *item.Section == \"js/ts\" {"},
  {"line":255,"text":"\t\t\t\tresults[i] = f.userPreferences"},
  {"line":256,"text":"\t\t\t}"},
  {"line":257,"text":"\t\t}"},
  {"line":258,"text":"\t\treturn &lsproto.ResponseMessage{"},
  {"line":259,"text":"\t\t\tID:      req.ID,"},
  {"line":260,"text":"\t\t\tJSONRPC: req.JSONRPC,"},
  {"line":261,"text":"\t\t\tResult:  results,"},
  {"line":262,"text":"\t\t}"},
  {"line":264,"text":"\tcase lsproto.MethodClientRegisterCapability:"},
  {"line":266,"text":"\t\treturn &lsproto.ResponseMessage{"},
  {"line":267,"text":"\t\t\tID:      req.ID,"},
  {"line":268,"text":"\t\t\tJSONRPC: req.JSONRPC,"},
  {"line":269,"text":"\t\t\tResult:  lsproto.Null{},"},
  {"line":270,"text":"\t\t}"},
  {"line":272,"text":"\tcase lsproto.MethodClientUnregisterCapability:"},
  {"line":274,"text":"\t\treturn &lsproto.ResponseMessage{"},
  {"line":275,"text":"\t\t\tID:      req.ID,"},
  {"line":276,"text":"\t\t\tJSONRPC: req.JSONRPC,"},
  {"line":277,"text":"\t\t\tResult:  lsproto.Null{},"},
  {"line":278,"text":"\t\t}"},
  {"line":280,"text":"\tdefault:"},
  {"line":282,"text":"\t\treturn &lsproto.ResponseMessage{"},
  {"line":283,"text":"\t\t\tID:      req.ID,"},
  {"line":284,"text":"\t\t\tJSONRPC: req.JSONRPC,"},
  {"line":285,"text":"\t\t\tError: &jsonrpc.ResponseError{"},
  {"line":286,"text":"\t\t\t\tCode:    int32(lsproto.ErrorCodeMethodNotFound),"},
  {"line":287,"text":"\t\t\t\tMessage: fmt.Sprintf(\"Unknown method: %s\", req.Method),"},
  {"line":288,"text":"\t\t\t},"},
  {"line":289,"text":"\t\t}"},
  {"line":290,"text":"\t}"},
  {"line":291,"text":"}"},
  {"line":293,"text":"func getBaseFileNameFromTest(t *testing.T) string {"},
  {"line":294,"text":"\tname := t.Name()"},
  {"line":295,"text":"\tname = core.LastOrNil(strings.Split(name, \"/\"))"},
  {"line":296,"text":"\tname = strings.TrimPrefix(name, \"Test\")"},
  {"line":297,"text":"\tname = stringutil.LowerFirstChar(name)"},
  {"line":300,"text":"\tswitch name {"},
  {"line":301,"text":"\tcase \"callHierarchyFunctionAmbiguity1\":"},
  {"line":302,"text":"\t\tname = \"callHierarchyFunctionAmbiguity.1\""},
  {"line":303,"text":"\tcase \"callHierarchyFunctionAmbiguity2\":"},
  {"line":304,"text":"\t\tname = \"callHierarchyFunctionAmbiguity.2\""},
  {"line":305,"text":"\tcase \"callHierarchyFunctionAmbiguity3\":"},
  {"line":306,"text":"\t\tname = \"callHierarchyFunctionAmbiguity.3\""},
  {"line":307,"text":"\tcase \"callHierarchyFunctionAmbiguity4\":"},
  {"line":308,"text":"\t\tname = \"callHierarchyFunctionAmbiguity.4\""},
  {"line":309,"text":"\tcase \"callHierarchyFunctionAmbiguity5\":"},
  {"line":310,"text":"\t\tname = \"callHierarchyFunctionAmbiguity.5\""},
  {"line":311,"text":"\t}"},
  {"line":313,"text":"\treturn name"},
  {"line":314,"text":"}"},
  {"line":316,"text":"const showCodeLensLocationsCommandName = \"typescript.showCodeLensLocations\""},
  {"line":318,"text":"func (f *FourslashTest) initialize(t *testing.T, capabilities *lsproto.ClientCapabilities) {"},
  {"line":319,"text":"\tparams := &lsproto.InitializeParams{"},
  {"line":320,"text":"\t\tLocale: new(\"en-US\"),"},
  {"line":321,"text":"\t\tInitializationOptions: &lsproto.InitializationOptions{"},
  {"line":322,"text":"\t\t\tCodeLensShowLocationsCommandName: new(showCodeLensLocationsCommandName),"},
  {"line":323,"text":"\t\t},"},
  {"line":324,"text":"\t}"},
  {"line":325,"text":"\tparams.Capabilities = getCapabilitiesWithDefaults(capabilities)"},
  {"line":326,"text":"\tf.capabilities = params.Capabilities"},
  {"line":327,"text":"\tresp, _, ok := lsptestutil.SendRequest(t, f.client, lsproto.InitializeInfo, params)"},
  {"line":328,"text":"\tif !ok {"},
  {"line":329,"text":"\t\tt.Fatalf(\"Initialize request failed\")"},
  {"line":330,"text":"\t}"},
  {"line":331,"text":"\tif resp.AsResponse().Error != nil {"},
  {"line":332,"text":"\t\tt.Fatalf(\"Initialize request returned error: %s\", resp.AsResponse().Error.String())"},
  {"line":333,"text":"\t}"},
  {"line":334,"text":"\tlsptestutil.SendNotification(t, f.client, lsproto.InitializedInfo, &lsproto.InitializedParams{})"},
  {"line":338,"text":"\t<-f.client.Server.InitComplete()"},
  {"line":339,"text":"}"},
  {"line":341,"text":"func defaultSemanticTokenTypes() []string {"},
  {"line":342,"text":"\treturn []string{"},
  {"line":343,"text":"\t\tstring(lsproto.SemanticTokenTypeNamespace),"},
  {"line":344,"text":"\t\tstring(lsproto.SemanticTokenTypeClass),"},
  {"line":345,"text":"\t\tstring(lsproto.SemanticTokenTypeEnum),"},
  {"line":346,"text":"\t\tstring(lsproto.SemanticTokenTypeInterface),"},
  {"line":347,"text":"\t\tstring(lsproto.SemanticTokenTypeStruct),"},
  {"line":348,"text":"\t\tstring(lsproto.SemanticTokenTypeTypeParameter),"},
  {"line":349,"text":"\t\tstring(lsproto.SemanticTokenTypeType),"},
  {"line":350,"text":"\t\tstring(lsproto.SemanticTokenTypeParameter),"},
  {"line":351,"text":"\t\tstring(lsproto.SemanticTokenTypeVariable),"},
  {"line":352,"text":"\t\tstring(lsproto.SemanticTokenTypeProperty),"},
  {"line":353,"text":"\t\tstring(lsproto.SemanticTokenTypeEnumMember),"},
  {"line":354,"text":"\t\tstring(lsproto.SemanticTokenTypeDecorator),"},
  {"line":355,"text":"\t\tstring(lsproto.SemanticTokenTypeEvent),"},
  {"line":356,"text":"\t\tstring(lsproto.SemanticTokenTypeFunction),"},
  {"line":357,"text":"\t\tstring(lsproto.SemanticTokenTypeMethod),"},
  {"line":358,"text":"\t\tstring(lsproto.SemanticTokenTypeMacro),"},
  {"line":359,"text":"\t\tstring(lsproto.SemanticTokenTypeLabel),"},
  {"line":360,"text":"\t\tstring(lsproto.SemanticTokenTypeComment),"},
  {"line":361,"text":"\t\tstring(lsproto.SemanticTokenTypeString),"},
  {"line":362,"text":"\t\tstring(lsproto.SemanticTokenTypeKeyword),"},
  {"line":363,"text":"\t\tstring(lsproto.SemanticTokenTypeNumber),"},
  {"line":364,"text":"\t\tstring(lsproto.SemanticTokenTypeRegexp),"},
  {"line":365,"text":"\t\tstring(lsproto.SemanticTokenTypeOperator),"},
  {"line":366,"text":"\t}"},
  {"line":367,"text":"}"},
  {"line":369,"text":"func defaultSemanticTokenModifiers() []string {"},
  {"line":370,"text":"\treturn []string{"},
  {"line":371,"text":"\t\tstring(lsproto.SemanticTokenModifierDeclaration),"},
  {"line":372,"text":"\t\tstring(lsproto.SemanticTokenModifierDefinition),"},
  {"line":373,"text":"\t\tstring(lsproto.SemanticTokenModifierReadonly),"},
  {"line":374,"text":"\t\tstring(lsproto.SemanticTokenModifierStatic),"},
  {"line":375,"text":"\t\tstring(lsproto.SemanticTokenModifierDeprecated),"},
  {"line":376,"text":"\t\tstring(lsproto.SemanticTokenModifierAbstract),"},
  {"line":377,"text":"\t\tstring(lsproto.SemanticTokenModifierAsync),"},
  {"line":378,"text":"\t\tstring(lsproto.SemanticTokenModifierModification),"},
  {"line":379,"text":"\t\tstring(lsproto.SemanticTokenModifierDocumentation),"},
  {"line":380,"text":"\t\tstring(lsproto.SemanticTokenModifierDefaultLibrary),"},
  {"line":381,"text":"\t\t\"local\","},
  {"line":382,"text":"\t}"},
  {"line":383,"text":"}"},
  {"line":386,"text":"var ("},
  {"line":387,"text":"\tptrTrue                       = new(true)"},
  {"line":388,"text":"\tdefaultCompletionCapabilities = &lsproto.CompletionClientCapabilities{"},
  {"line":389,"text":"\t\tCompletionItem: &lsproto.ClientCompletionItemOptions{"},
  {"line":390,"text":"\t\t\tSnippetSupport:          ptrTrue,"},
  {"line":391,"text":"\t\t\tCommitCharactersSupport: ptrTrue,"},
  {"line":392,"text":"\t\t\tPreselectSupport:        ptrTrue,"},
  {"line":393,"text":"\t\t\tLabelDetailsSupport:     ptrTrue,"},
  {"line":394,"text":"\t\t\tInsertReplaceSupport:    ptrTrue,"},
  {"line":395,"text":"\t\t\tDocumentationFormat:     &[]lsproto.MarkupKind{lsproto.MarkupKindMarkdown, lsproto.MarkupKindPlainText},"},
  {"line":396,"text":"\t\t},"},
  {"line":397,"text":"\t\tCompletionList: &lsproto.CompletionListCapabilities{"},
  {"line":398,"text":"\t\t\tItemDefaults: &[]string{\"commitCharacters\", \"editRange\"},"},
  {"line":399,"text":"\t\t},"},
  {"line":400,"text":"\t}"},
  {"line":401,"text":"\tdefaultDefinitionCapabilities = &lsproto.DefinitionClientCapabilities{"},
  {"line":402,"text":"\t\tLinkSupport: ptrTrue,"},
  {"line":403,"text":"\t}"},
  {"line":404,"text":"\tdefaultTypeDefinitionCapabilities = &lsproto.TypeDefinitionClientCapabilities{"},
  {"line":405,"text":"\t\tLinkSupport: ptrTrue,"},
  {"line":406,"text":"\t}"},
  {"line":407,"text":"\tdefaultImplementationCapabilities = &lsproto.ImplementationClientCapabilities{"},
  {"line":408,"text":"\t\tLinkSupport: ptrTrue,"},
  {"line":409,"text":"\t}"},
  {"line":410,"text":"\tdefaultHoverCapabilities = &lsproto.HoverClientCapabilities{"},
  {"line":411,"text":"\t\tContentFormat:  &[]lsproto.MarkupKind{lsproto.MarkupKindMarkdown, lsproto.MarkupKindPlainText},"},
  {"line":412,"text":"\t\tVerbosityLevel: ptrTrue,"},
  {"line":413,"text":"\t}"},
  {"line":414,"text":"\tdefaultSignatureHelpCapabilities = &lsproto.SignatureHelpClientCapabilities{"},
  {"line":415,"text":"\t\tSignatureInformation: &lsproto.ClientSignatureInformationOptions{"},
  {"line":416,"text":"\t\t\tDocumentationFormat: &[]lsproto.MarkupKind{lsproto.MarkupKindMarkdown, lsproto.MarkupKindPlainText},"},
  {"line":417,"text":"\t\t\tParameterInformation: &lsproto.ClientSignatureParameterInformationOptions{"},
  {"line":418,"text":"\t\t\t\tLabelOffsetSupport: ptrTrue,"},
  {"line":419,"text":"\t\t\t},"},
  {"line":420,"text":"\t\t\tActiveParameterSupport: ptrTrue,"},
  {"line":421,"text":"\t\t},"},
  {"line":422,"text":"\t\tContextSupport: ptrTrue,"},
  {"line":423,"text":"\t}"},
  {"line":424,"text":"\tdefaultDocumentSymbolCapabilities = &lsproto.DocumentSymbolClientCapabilities{"},
  {"line":425,"text":"\t\tHierarchicalDocumentSymbolSupport: ptrTrue,"},
  {"line":426,"text":"\t}"},
  {"line":427,"text":"\tdefaultFoldingRangeCapabilities = &lsproto.FoldingRangeClientCapabilities{"},
  {"line":428,"text":"\t\tRangeLimit: new(uint32(5000)),"},
  {"line":430,"text":"\t\tFoldingRangeKind: &lsproto.ClientFoldingRangeKindOptions{"},
  {"line":431,"text":"\t\t\tValueSet: &[]lsproto.FoldingRangeKind{"},
  {"line":432,"text":"\t\t\t\tlsproto.FoldingRangeKindComment,"},
  {"line":433,"text":"\t\t\t\tlsproto.FoldingRangeKindImports,"},
  {"line":434,"text":"\t\t\t\tlsproto.FoldingRangeKindRegion,"},
  {"line":435,"text":"\t\t\t},"},
  {"line":436,"text":"\t\t},"},
  {"line":437,"text":"\t\tFoldingRange: &lsproto.ClientFoldingRangeOptions{"},
  {"line":438,"text":"\t\t\tCollapsedText: ptrTrue, // Unused by our testing, but set to exercise the code."},
  {"line":439,"text":"\t\t},"},
  {"line":440,"text":"\t}"},
  {"line":441,"text":"\tdefaultDiagnosticCapabilities = &lsproto.DiagnosticClientCapabilities{"},
  {"line":442,"text":"\t\tRelatedInformation: ptrTrue,"},
  {"line":443,"text":"\t\tTagSupport: &lsproto.ClientDiagnosticsTagOptions{"},
  {"line":444,"text":"\t\t\tValueSet: []lsproto.DiagnosticTag{"},
  {"line":445,"text":"\t\t\t\tlsproto.DiagnosticTagUnnecessary,"},
  {"line":446,"text":"\t\t\t\tlsproto.DiagnosticTagDeprecated,"},
  {"line":447,"text":"\t\t\t},"},
  {"line":448,"text":"\t\t},"},
  {"line":449,"text":"\t}"},
  {"line":450,"text":"\tdefaultPublishDiagnosticCapabilities = &lsproto.PublishDiagnosticsClientCapabilities{"},
  {"line":451,"text":"\t\tRelatedInformation: ptrTrue,"},
  {"line":452,"text":"\t\tTagSupport: &lsproto.ClientDiagnosticsTagOptions{"},
  {"line":453,"text":"\t\t\tValueSet: []lsproto.DiagnosticTag{"},
  {"line":454,"text":"\t\t\t\tlsproto.DiagnosticTagUnnecessary,"},
  {"line":455,"text":"\t\t\t\tlsproto.DiagnosticTagDeprecated,"},
  {"line":456,"text":"\t\t\t},"},
  {"line":457,"text":"\t\t},"},
  {"line":458,"text":"\t}"},
  {"line":459,"text":"\tdefaultWorkspaceEditCapabilities = &lsproto.WorkspaceEditClientCapabilities{"},
  {"line":460,"text":"\t\tDocumentChanges: ptrTrue,"},
  {"line":461,"text":"\t\tResourceOperations: &[]lsproto.ResourceOperationKind{"},
  {"line":462,"text":"\t\t\tlsproto.ResourceOperationKindRename,"},
  {"line":463,"text":"\t\t},"},
  {"line":464,"text":"\t}"},
  {"line":465,"text":")"},
  {"line":467,"text":"func GetDefaultCapabilities() *lsproto.ClientCapabilities {"},
  {"line":468,"text":"\treturn &lsproto.ClientCapabilities{"},
  {"line":469,"text":"\t\tGeneral: &lsproto.GeneralClientCapabilities{"},
  {"line":470,"text":"\t\t\tPositionEncodings: &[]lsproto.PositionEncodingKind{lsproto.PositionEncodingKindUTF8},"},
  {"line":471,"text":"\t\t},"},
  {"line":472,"text":"\t\tTextDocument: &lsproto.TextDocumentClientCapabilities{"},
  {"line":473,"text":"\t\t\tCompletion: &lsproto.CompletionClientCapabilities{"},
  {"line":474,"text":"\t\t\t\tCompletionItem: &lsproto.ClientCompletionItemOptions{"},
  {"line":475,"text":"\t\t\t\t\tSnippetSupport:          ptrTrue,"},
  {"line":476,"text":"\t\t\t\t\tCommitCharactersSupport: ptrTrue,"},
  {"line":477,"text":"\t\t\t\t\tPreselectSupport:        ptrTrue,"},
  {"line":478,"text":"\t\t\t\t\tLabelDetailsSupport:     ptrTrue,"},
  {"line":479,"text":"\t\t\t\t\tInsertReplaceSupport:    ptrTrue,"},
  {"line":480,"text":"\t\t\t\t\tDocumentationFormat:     &[]lsproto.MarkupKind{lsproto.MarkupKindMarkdown, lsproto.MarkupKindPlainText},"},
  {"line":481,"text":"\t\t\t\t},"},
  {"line":482,"text":"\t\t\t\tCompletionList: &lsproto.CompletionListCapabilities{"},
  {"line":483,"text":"\t\t\t\t\tItemDefaults: &[]string{\"commitCharacters\", \"editRange\"},"},
  {"line":484,"text":"\t\t\t\t},"},
  {"line":485,"text":"\t\t\t},"},
  {"line":486,"text":"\t\t\tDiagnostic: &lsproto.DiagnosticClientCapabilities{"},
  {"line":487,"text":"\t\t\t\tRelatedInformation: ptrTrue,"},
  {"line":488,"text":"\t\t\t\tTagSupport: &lsproto.ClientDiagnosticsTagOptions{"},
  {"line":489,"text":"\t\t\t\t\tValueSet: []lsproto.DiagnosticTag{"},
  {"line":490,"text":"\t\t\t\t\t\tlsproto.DiagnosticTagUnnecessary,"},
  {"line":491,"text":"\t\t\t\t\t\tlsproto.DiagnosticTagDeprecated,"},
  {"line":492,"text":"\t\t\t\t\t},"},
  {"line":493,"text":"\t\t\t\t},"},
  {"line":494,"text":"\t\t\t},"},
  {"line":495,"text":"\t\t\tPublishDiagnostics: &lsproto.PublishDiagnosticsClientCapabilities{"},
  {"line":496,"text":"\t\t\t\tRelatedInformation: ptrTrue,"},
  {"line":497,"text":"\t\t\t\tTagSupport: &lsproto.ClientDiagnosticsTagOptions{"},
  {"line":498,"text":"\t\t\t\t\tValueSet: []lsproto.DiagnosticTag{"},
  {"line":499,"text":"\t\t\t\t\t\tlsproto.DiagnosticTagUnnecessary,"},
  {"line":500,"text":"\t\t\t\t\t\tlsproto.DiagnosticTagDeprecated,"},
  {"line":501,"text":"\t\t\t\t\t},"},
  {"line":502,"text":"\t\t\t\t},"},
  {"line":503,"text":"\t\t\t},"},
  {"line":504,"text":"\t\t\tDefinition: &lsproto.DefinitionClientCapabilities{"},
  {"line":505,"text":"\t\t\t\tLinkSupport: ptrTrue,"},
  {"line":506,"text":"\t\t\t},"},
  {"line":507,"text":"\t\t\tTypeDefinition: &lsproto.TypeDefinitionClientCapabilities{"},
  {"line":508,"text":"\t\t\t\tLinkSupport: ptrTrue,"},
  {"line":509,"text":"\t\t\t},"},
  {"line":510,"text":"\t\t\tImplementation: &lsproto.ImplementationClientCapabilities{"},
  {"line":511,"text":"\t\t\t\tLinkSupport: ptrTrue,"},
  {"line":512,"text":"\t\t\t},"},
  {"line":513,"text":"\t\t\tHover: &lsproto.HoverClientCapabilities{"},
  {"line":514,"text":"\t\t\t\tContentFormat: &[]lsproto.MarkupKind{lsproto.MarkupKindMarkdown, lsproto.MarkupKindPlainText},"},
  {"line":515,"text":"\t\t\t},"},
  {"line":516,"text":"\t\t\tSignatureHelp: &lsproto.SignatureHelpClientCapabilities{"},
  {"line":517,"text":"\t\t\t\tSignatureInformation: &lsproto.ClientSignatureInformationOptions{"},
  {"line":518,"text":"\t\t\t\t\tDocumentationFormat: &[]lsproto.MarkupKind{lsproto.MarkupKindMarkdown, lsproto.MarkupKindPlainText},"},
  {"line":519,"text":"\t\t\t\t\tParameterInformation: &lsproto.ClientSignatureParameterInformationOptions{"},
  {"line":520,"text":"\t\t\t\t\t\tLabelOffsetSupport: ptrTrue,"},
  {"line":521,"text":"\t\t\t\t\t},"},
  {"line":522,"text":"\t\t\t\t\tActiveParameterSupport: ptrTrue,"},
  {"line":523,"text":"\t\t\t\t},"},
  {"line":524,"text":"\t\t\t\tContextSupport: ptrTrue,"},
  {"line":525,"text":"\t\t\t},"},
  {"line":526,"text":"\t\t\tDocumentSymbol: &lsproto.DocumentSymbolClientCapabilities{"},
  {"line":527,"text":"\t\t\t\tHierarchicalDocumentSymbolSupport: ptrTrue,"},
  {"line":528,"text":"\t\t\t},"},
  {"line":529,"text":"\t\t\tFoldingRange: &lsproto.FoldingRangeClientCapabilities{"},
  {"line":530,"text":"\t\t\t\tRangeLimit: new(uint32(5000)),"},
  {"line":531,"text":"\t\t\t\tFoldingRangeKind: &lsproto.ClientFoldingRangeKindOptions{"},
  {"line":532,"text":"\t\t\t\t\tValueSet: &[]lsproto.FoldingRangeKind{"},
  {"line":533,"text":"\t\t\t\t\t\tlsproto.FoldingRangeKindComment,"},
  {"line":534,"text":"\t\t\t\t\t\tlsproto.FoldingRangeKindImports,"},
  {"line":535,"text":"\t\t\t\t\t\tlsproto.FoldingRangeKindRegion,"},
  {"line":536,"text":"\t\t\t\t\t},"},
  {"line":537,"text":"\t\t\t\t},"},
  {"line":538,"text":"\t\t\t\tFoldingRange: &lsproto.ClientFoldingRangeOptions{"},
  {"line":539,"text":"\t\t\t\t\tCollapsedText: ptrTrue,"},
  {"line":540,"text":"\t\t\t\t},"},
  {"line":541,"text":"\t\t\t},"},
  {"line":542,"text":"\t\t},"},
  {"line":543,"text":"\t\tWorkspace: &lsproto.WorkspaceClientCapabilities{"},
  {"line":544,"text":"\t\t\tConfiguration: ptrTrue,"},
  {"line":545,"text":"\t\t\tFileOperations: &lsproto.FileOperationClientCapabilities{"},
  {"line":546,"text":"\t\t\t\tWillRename: ptrTrue,"},
  {"line":547,"text":"\t\t\t},"},
  {"line":548,"text":"\t\t\tWorkspaceEdit: &lsproto.WorkspaceEditClientCapabilities{"},
  {"line":549,"text":"\t\t\t\tDocumentChanges: ptrTrue,"},
  {"line":550,"text":"\t\t\t\tResourceOperations: &[]lsproto.ResourceOperationKind{"},
  {"line":551,"text":"\t\t\t\t\tlsproto.ResourceOperationKindRename,"},
  {"line":552,"text":"\t\t\t\t},"},
  {"line":553,"text":"\t\t\t},"},
  {"line":554,"text":"\t\t},"},
  {"line":555,"text":"\t}"},
  {"line":556,"text":"}"},
  {"line":558,"text":"func getCapabilitiesWithDefaults(capabilities *lsproto.ClientCapabilities) *lsproto.ClientCapabilities {"},
  {"line":559,"text":"\tvar capabilitiesWithDefaults lsproto.ClientCapabilities"},
  {"line":560,"text":"\tif capabilities != nil {"},
  {"line":561,"text":"\t\tcapabilitiesWithDefaults = *capabilities"},
  {"line":562,"text":"\t}"},
  {"line":563,"text":"\tcapabilitiesWithDefaults.General = &lsproto.GeneralClientCapabilities{"},
  {"line":564,"text":"\t\tPositionEncodings: &[]lsproto.PositionEncodingKind{lsproto.PositionEncodingKindUTF8},"},
  {"line":565,"text":"\t}"},
  {"line":566,"text":"\tif capabilitiesWithDefaults.TextDocument == nil {"},
  {"line":567,"text":"\t\tcapabilitiesWithDefaults.TextDocument = &lsproto.TextDocumentClientCapabilities{}"},
  {"line":568,"text":"\t}"},
  {"line":569,"text":"\tif capabilitiesWithDefaults.TextDocument.Completion == nil {"},
  {"line":570,"text":"\t\tcapabilitiesWithDefaults.TextDocument.Completion = defaultCompletionCapabilities"},
  {"line":571,"text":"\t}"},
  {"line":572,"text":"\tif capabilitiesWithDefaults.TextDocument.Diagnostic == nil {"},
  {"line":573,"text":"\t\tcapabilitiesWithDefaults.TextDocument.Diagnostic = defaultDiagnosticCapabilities"},
  {"line":574,"text":"\t}"},
  {"line":575,"text":"\tif capabilitiesWithDefaults.TextDocument.PublishDiagnostics == nil {"},
  {"line":576,"text":"\t\tcapabilitiesWithDefaults.TextDocument.PublishDiagnostics = defaultPublishDiagnosticCapabilities"},
  {"line":577,"text":"\t}"},
  {"line":578,"text":"\tif capabilitiesWithDefaults.TextDocument.SemanticTokens == nil {"},
  {"line":579,"text":"\t\tcapabilitiesWithDefaults.TextDocument.SemanticTokens = &lsproto.SemanticTokensClientCapabilities{"},
  {"line":580,"text":"\t\t\tRequests: &lsproto.ClientSemanticTokensRequestOptions{"},
  {"line":581,"text":"\t\t\t\tFull: &lsproto.BooleanOrClientSemanticTokensRequestFullDelta{"},
  {"line":582,"text":"\t\t\t\t\tBoolean: ptrTrue,"},
  {"line":583,"text":"\t\t\t\t},"},
  {"line":584,"text":"\t\t\t},"},
  {"line":585,"text":"\t\t\tTokenTypes:     defaultSemanticTokenTypes(),"},
  {"line":586,"text":"\t\t\tTokenModifiers: defaultSemanticTokenModifiers(),"},
  {"line":587,"text":"\t\t\tFormats:        []lsproto.TokenFormat{lsproto.TokenFormatRelative},"},
  {"line":588,"text":"\t\t}"},
  {"line":589,"text":"\t}"},
  {"line":590,"text":"\tif capabilitiesWithDefaults.Workspace == nil {"},
  {"line":591,"text":"\t\tcapabilitiesWithDefaults.Workspace = &lsproto.WorkspaceClientCapabilities{}"},
  {"line":592,"text":"\t}"},
  {"line":593,"text":"\tif capabilitiesWithDefaults.Workspace.FileOperations == nil {"},
  {"line":594,"text":"\t\tcapabilitiesWithDefaults.Workspace.FileOperations = &lsproto.FileOperationClientCapabilities{"},
  {"line":595,"text":"\t\t\tWillRename: ptrTrue,"},
  {"line":596,"text":"\t\t}"},
  {"line":597,"text":"\t}"},
  {"line":598,"text":"\tif capabilitiesWithDefaults.Workspace.WorkspaceEdit == nil {"},
  {"line":599,"text":"\t\tcapabilitiesWithDefaults.Workspace.WorkspaceEdit = defaultWorkspaceEditCapabilities"},
  {"line":600,"text":"\t}"},
  {"line":601,"text":"\tif capabilitiesWithDefaults.Workspace.Configuration == nil {"},
  {"line":602,"text":"\t\tcapabilitiesWithDefaults.Workspace.Configuration = ptrTrue"},
  {"line":603,"text":"\t}"},
  {"line":604,"text":"\tif capabilitiesWithDefaults.TextDocument.Definition == nil {"},
  {"line":605,"text":"\t\tcapabilitiesWithDefaults.TextDocument.Definition = defaultDefinitionCapabilities"},
  {"line":606,"text":"\t}"},
  {"line":607,"text":"\tif capabilitiesWithDefaults.TextDocument.TypeDefinition == nil {"},
  {"line":608,"text":"\t\tcapabilitiesWithDefaults.TextDocument.TypeDefinition = defaultTypeDefinitionCapabilities"},
  {"line":609,"text":"\t}"},
  {"line":610,"text":"\tif capabilitiesWithDefaults.TextDocument.Implementation == nil {"},
  {"line":611,"text":"\t\tcapabilitiesWithDefaults.TextDocument.Implementation = defaultImplementationCapabilities"},
  {"line":612,"text":"\t}"},
  {"line":613,"text":"\tif capabilitiesWithDefaults.TextDocument.Hover == nil {"},
  {"line":614,"text":"\t\tcapabilitiesWithDefaults.TextDocument.Hover = defaultHoverCapabilities"},
  {"line":615,"text":"\t}"},
  {"line":616,"text":"\tif capabilitiesWithDefaults.TextDocument.SignatureHelp == nil {"},
  {"line":617,"text":"\t\tcapabilitiesWithDefaults.TextDocument.SignatureHelp = defaultSignatureHelpCapabilities"},
  {"line":618,"text":"\t}"},
  {"line":619,"text":"\tif capabilitiesWithDefaults.TextDocument.DocumentSymbol == nil {"},
  {"line":620,"text":"\t\tcapabilitiesWithDefaults.TextDocument.DocumentSymbol = defaultDocumentSymbolCapabilities"},
  {"line":621,"text":"\t}"},
  {"line":622,"text":"\tif capabilitiesWithDefaults.TextDocument.FoldingRange == nil {"},
  {"line":623,"text":"\t\tcapabilitiesWithDefaults.TextDocument.FoldingRange = defaultFoldingRangeCapabilities"},
  {"line":624,"text":"\t}"},
  {"line":625,"text":"\treturn &capabilitiesWithDefaults"},
  {"line":626,"text":"}"},
  {"line":628,"text":"func sendRequest[Params, Resp any](t *testing.T, f *FourslashTest, info lsproto.RequestInfo[Params, Resp], params Params) Resp {"},
  {"line":629,"text":"\tt.Helper()"},
  {"line":630,"text":"\treturn sendRequestAndBaselineWorker(t, f, info, params, true)"},
  {"line":631,"text":"}"},
  {"line":633,"text":"func sendRequestAndBaselineWorker[Params, Resp any](t *testing.T, f *FourslashTest, info lsproto.RequestInfo[Params, Resp], params Params, baselineProjects bool) Resp {"},
  {"line":634,"text":"\tt.Helper()"},
  {"line":635,"text":"\tprefix := f.getCurrentPositionPrefix()"},
  {"line":636,"text":"\tif baselineProjects {"},
  {"line":637,"text":"\t\tf.baselineState(t)"},
  {"line":638,"text":"\t}"},
  {"line":639,"text":"\tf.baselineRequestOrNotification(t, info.Method, params)"},
  {"line":640,"text":"\tresMsg, result, resultOk := lsptestutil.SendRequest(t, f.client, info, params)"},
  {"line":641,"text":"\tif baselineProjects {"},
  {"line":642,"text":"\t\tf.baselineState(t)"},
  {"line":643,"text":"\t}"},
  {"line":644,"text":"\tswitch info.Method {"},
  {"line":645,"text":"\tcase lsproto.MethodTextDocumentOnTypeFormatting:"},
  {"line":646,"text":"\t\tif !f.reportFormatOnTypeCrash {"},
  {"line":647,"text":"\t\t\tbreak"},
  {"line":648,"text":"\t\t}"},
  {"line":649,"text":"\t\tfallthrough"},
  {"line":650,"text":"\tdefault:"},
  {"line":651,"text":"\t\tif resMsg == nil {"},
  {"line":652,"text":"\t\t\tt.Fatalf(prefix+\"Nil response received for %s request\", info.Method)"},
  {"line":653,"text":"\t\t}"},
  {"line":654,"text":"\t\tresp := resMsg.AsResponse()"},
  {"line":655,"text":"\t\tif resp.Error != nil {"},
  {"line":656,"text":"\t\t\tt.Fatalf(prefix+\"%s request returned error: %s\", info.Method, resp.Error.String())"},
  {"line":657,"text":"\t\t}"},
  {"line":658,"text":"\t\tif !resultOk {"},
  {"line":659,"text":"\t\t\tt.Fatalf(prefix+\"Unexpected %s response type: %T, error: %v\", info.Method, resp.Result, resp.Error)"},
  {"line":660,"text":"\t\t}"},
  {"line":661,"text":"\t}"},
  {"line":662,"text":"\treturn result"},
  {"line":663,"text":"}"},
  {"line":665,"text":"func sendNotification[Params any](t *testing.T, f *FourslashTest, info lsproto.NotificationInfo[Params], params Params) {"},
  {"line":666,"text":"\tt.Helper()"},
  {"line":667,"text":"\tif info.Method != lsproto.MethodTextDocumentDidChange {"},
  {"line":672,"text":"\t\tf.baselineState(t)"},
  {"line":673,"text":"\t\tf.updateState(info.Method, params)"},
  {"line":674,"text":"\t}"},
  {"line":675,"text":"\tf.baselineRequestOrNotification(t, info.Method, params)"},
  {"line":676,"text":"\tlsptestutil.SendNotification(t, f.client, info, params)"},
  {"line":677,"text":"}"},
  {"line":679,"text":"func (f *FourslashTest) updateState(method lsproto.Method, params any) {"},
  {"line":680,"text":"\tswitch method {"},
  {"line":681,"text":"\tcase lsproto.MethodTextDocumentDidOpen:"},
  {"line":682,"text":"\t\tf.openFiles[params.(*lsproto.DidOpenTextDocumentParams).TextDocument.Uri.FileName()] = struct{}{}"},
  {"line":683,"text":"\tcase lsproto.MethodTextDocumentDidClose:"},
  {"line":684,"text":"\t\tdelete(f.openFiles, params.(*lsproto.DidCloseTextDocumentParams).TextDocument.Uri.FileName())"},
  {"line":685,"text":"\t}"},
  {"line":686,"text":"}"},
  {"line":688,"text":"func (f *FourslashTest) GetOptions() lsutil.UserPreferences {"},
  {"line":689,"text":"\treturn f.userPreferences"},
  {"line":690,"text":"}"},
  {"line":692,"text":"func (f *FourslashTest) Configure(t *testing.T, config lsutil.UserPreferences) {"},
  {"line":696,"text":"\tf.userPreferences = config"},
  {"line":697,"text":"\tsendNotification(t, f, lsproto.WorkspaceDidChangeConfigurationInfo, &lsproto.DidChangeConfigurationParams{"},
  {"line":698,"text":"\t\tSettings: map[string]any{"},
  {"line":699,"text":"\t\t\t\"js/ts\": config,"},
  {"line":700,"text":"\t\t},"},
  {"line":701,"text":"\t})"},
  {"line":702,"text":"}"},
  {"line":704,"text":"func (f *FourslashTest) ConfigureWithReset(t *testing.T, config lsutil.UserPreferences) (reset func()) {"},
  {"line":705,"text":"\toriginalConfig := f.userPreferences"},
  {"line":706,"text":"\tf.Configure(t, config)"},
  {"line":707,"text":"\treturn func() {"},
  {"line":708,"text":"\t\tf.Configure(t, originalConfig)"},
  {"line":709,"text":"\t}"},
  {"line":710,"text":"}"},
  {"line":712,"text":"func (f *FourslashTest) GoToMarkerOrRange(t *testing.T, markerOrRange MarkerOrRange) {"},
  {"line":713,"text":"\tf.goToMarker(t, markerOrRange)"},
  {"line":714,"text":"}"},
  {"line":716,"text":"func (f *FourslashTest) GoToMarker(t *testing.T, markerName string) {"},
  {"line":717,"text":"\tmarker, ok := f.testData.MarkerPositions[markerName]"},
  {"line":718,"text":"\tif !ok {"},
  {"line":719,"text":"\t\tt.Fatalf(\"Marker '%s' not found\", markerName)"},
  {"line":720,"text":"\t}"},
  {"line":721,"text":"\tf.goToMarker(t, marker)"},
  {"line":722,"text":"}"},
  {"line":724,"text":"func (f *FourslashTest) goToMarker(t *testing.T, markerOrRange MarkerOrRange) {"},
  {"line":725,"text":"\tf.ensureActiveFile(t, markerOrRange.FileName())"},
  {"line":726,"text":"\tf.goToPosition(t, markerOrRange.LSPos())"},
  {"line":727,"text":"\tf.lastKnownMarkerName = markerOrRange.GetName()"},
  {"line":728,"text":"}"},
  {"line":730,"text":"func (f *FourslashTest) GoToEOF(t *testing.T) {"},
  {"line":731,"text":"\tscript := f.getScriptInfo(f.activeFilename)"},
  {"line":732,"text":"\tpos := len(script.content)"},
  {"line":733,"text":"\tLSPPos := f.converters.PositionToLineAndCharacter(script, core.TextPos(pos))"},
  {"line":734,"text":"\tf.goToPosition(t, LSPPos)"},
  {"line":735,"text":"}"},
  {"line":737,"text":"func (f *FourslashTest) GoToBOF(t *testing.T) {"},
  {"line":738,"text":"\tf.goToPosition(t, lsproto.Position{Line: 0, Character: 0})"},
  {"line":739,"text":"}"},
  {"line":741,"text":"func (f *FourslashTest) GoToPosition(t *testing.T, position int) {"},
  {"line":742,"text":"\tscript := f.getScriptInfo(f.activeFilename)"},
  {"line":743,"text":"\tLSPPos := f.converters.PositionToLineAndCharacter(script, core.TextPos(position))"},
  {"line":744,"text":"\tf.goToPosition(t, LSPPos)"},
  {"line":745,"text":"}"},
  {"line":747,"text":"func (f *FourslashTest) goToPosition(t *testing.T, position lsproto.Position) {"},
  {"line":748,"text":"\tf.currentCaretPosition = position"},
  {"line":749,"text":"\tf.selectionEnd = nil"},
  {"line":750,"text":"}"},
  {"line":752,"text":"func (f *FourslashTest) GoToEachMarker(t *testing.T, markerNames []string, action func(marker *Marker, index int)) {"},
  {"line":753,"text":"\tvar markers []*Marker"},
  {"line":754,"text":"\tif len(markers) == 0 {"},
  {"line":755,"text":"\t\tmarkers = f.Markers()"},
  {"line":756,"text":"\t} else {"},
  {"line":757,"text":"\t\tmarkers = make([]*Marker, 0, len(markerNames))"},
  {"line":758,"text":"\t\tfor _, name := range markerNames {"},
  {"line":759,"text":"\t\t\tmarker, ok := f.testData.MarkerPositions[name]"},
  {"line":760,"text":"\t\t\tif !ok {"},
  {"line":761,"text":"\t\t\t\tt.Fatalf(\"Marker '%s' not found\", name)"},
  {"line":762,"text":"\t\t\t}"},
  {"line":763,"text":"\t\t\tmarkers = append(markers, marker)"},
  {"line":764,"text":"\t\t}"},
  {"line":765,"text":"\t}"},
  {"line":766,"text":"\tfor i, marker := range markers {"},
  {"line":767,"text":"\t\tf.goToMarker(t, marker)"},
  {"line":768,"text":"\t\taction(marker, i)"},
  {"line":769,"text":"\t}"},
  {"line":770,"text":"}"},
  {"line":772,"text":"func (f *FourslashTest) GoToEachRange(t *testing.T, action func(t *testing.T, rangeMarker *RangeMarker)) {"},
  {"line":773,"text":"\tranges := f.Ranges()"},
  {"line":774,"text":"\tfor _, rangeMarker := range ranges {"},
  {"line":775,"text":"\t\tf.goToPosition(t, rangeMarker.LSRange.Start)"},
  {"line":776,"text":"\t\taction(t, rangeMarker)"},
  {"line":777,"text":"\t}"},
  {"line":778,"text":"}"},
  {"line":780,"text":"func (f *FourslashTest) GoToRangeStart(t *testing.T, rangeMarker *RangeMarker) {"},
  {"line":781,"text":"\tf.openFile(t, rangeMarker.FileName())"},
  {"line":782,"text":"\tf.goToPosition(t, rangeMarker.LSRange.Start)"},
  {"line":783,"text":"}"},
  {"line":785,"text":"func (f *FourslashTest) GoToSelect(t *testing.T, startMarkerName string, endMarkerName string) {"},
  {"line":786,"text":"\tstartMarker := f.testData.MarkerPositions[startMarkerName]"},
  {"line":787,"text":"\tif startMarker == nil {"},
  {"line":788,"text":"\t\tt.Fatalf(\"Start marker '%s' not found\", startMarkerName)"},
  {"line":789,"text":"\t}"},
  {"line":790,"text":"\tendMarker := f.testData.MarkerPositions[endMarkerName]"},
  {"line":791,"text":"\tif endMarker == nil {"},
  {"line":792,"text":"\t\tt.Fatalf(\"End marker '%s' not found\", endMarkerName)"},
  {"line":793,"text":"\t}"},
  {"line":794,"text":"\tif startMarker.FileName() != endMarker.FileName() {"},
  {"line":795,"text":"\t\tt.Fatalf(\"Markers '%s' and '%s' are in different files\", startMarkerName, endMarkerName)"},
  {"line":796,"text":"\t}"},
  {"line":797,"text":"\tf.ensureActiveFile(t, startMarker.FileName())"},
  {"line":798,"text":"\tf.goToPosition(t, startMarker.LSPosition)"},
  {"line":799,"text":"\tf.selectionEnd = &endMarker.LSPosition"},
  {"line":800,"text":"}"},
  {"line":802,"text":"func (f *FourslashTest) GoToSelectRange(t *testing.T, rangeMarker *RangeMarker) {"},
  {"line":803,"text":"\tf.GoToRangeStart(t, rangeMarker)"},
  {"line":804,"text":"\tf.selectionEnd = &rangeMarker.LSRange.End"},
  {"line":805,"text":"}"},
  {"line":807,"text":"func (f *FourslashTest) GoToFile(t *testing.T, filename string) {"},
  {"line":808,"text":"\tfilename = tspath.GetNormalizedAbsolutePath(filename, rootDir)"},
  {"line":809,"text":"\tf.openFile(t, filename)"},
  {"line":810,"text":"}"},
  {"line":812,"text":"func (f *FourslashTest) GoToFileNumber(t *testing.T, index int) {"},
  {"line":813,"text":"\tif index < 0 || index >= len(f.testData.Files) {"},
  {"line":814,"text":"\t\tt.Fatalf(\"File index %d out of range (0-%d)\", index, len(f.testData.Files)-1)"},
  {"line":815,"text":"\t}"},
  {"line":816,"text":"\tfilename := f.testData.Files[index].fileName"},
  {"line":817,"text":"\tf.openFile(t, filename)"},
  {"line":818,"text":"}"},
  {"line":820,"text":"func (f *FourslashTest) Markers() []*Marker {"},
  {"line":821,"text":"\treturn f.testData.Markers"},
  {"line":822,"text":"}"},
  {"line":824,"text":"func (f *FourslashTest) MarkerNames() []string {"},
  {"line":825,"text":"\treturn core.MapFiltered(f.testData.Markers, func(marker *Marker) (string, bool) {"},
  {"line":826,"text":"\t\tif marker.Name == nil {"},
  {"line":827,"text":"\t\t\treturn \"\", false"},
  {"line":828,"text":"\t\t}"},
  {"line":829,"text":"\t\treturn *marker.Name, true"},
  {"line":830,"text":"\t})"},
  {"line":831,"text":"}"},
  {"line":833,"text":"func (f *FourslashTest) MarkerByName(t *testing.T, name string) *Marker {"},
  {"line":834,"text":"\treturn f.testData.MarkerPositions[name]"},
  {"line":835,"text":"}"},
  {"line":837,"text":"func (f *FourslashTest) Ranges() []*RangeMarker {"},
  {"line":838,"text":"\treturn f.testData.Ranges"},
  {"line":839,"text":"}"},
  {"line":841,"text":"func (f *FourslashTest) getRangesInFile(fileName string) []*RangeMarker {"},
  {"line":842,"text":"\tvar rangesInFile []*RangeMarker"},
  {"line":843,"text":"\tfor _, rangeMarker := range f.testData.Ranges {"},
  {"line":844,"text":"\t\tif rangeMarker.FileName() == fileName {"},
  {"line":845,"text":"\t\t\trangesInFile = append(rangesInFile, rangeMarker)"},
  {"line":846,"text":"\t\t}"},
  {"line":847,"text":"\t}"},
  {"line":848,"text":"\treturn rangesInFile"},
  {"line":849,"text":"}"},
  {"line":851,"text":"func (f *FourslashTest) ensureActiveFile(t *testing.T, filename string) {"},
  {"line":852,"text":"\tif f.activeFilename != filename {"},
  {"line":853,"text":"\t\tif _, ok := f.openFiles[filename]; !ok {"},
  {"line":854,"text":"\t\t\tf.openFile(t, filename)"},
  {"line":855,"text":"\t\t} else {"},
  {"line":856,"text":"\t\t\tf.activeFilename = filename"},
  {"line":857,"text":"\t\t}"},
  {"line":858,"text":"\t}"},
  {"line":859,"text":"}"},
  {"line":861,"text":"func (f *FourslashTest) CloseFileOfMarker(t *testing.T, markerName string) {"},
  {"line":862,"text":"\tmarker, ok := f.testData.MarkerPositions[markerName]"},
  {"line":863,"text":"\tif !ok {"},
  {"line":864,"text":"\t\tt.Fatalf(\"Marker '%s' not found\", markerName)"},
  {"line":865,"text":"\t}"},
  {"line":866,"text":"\tif f.activeFilename == marker.FileName() {"},
  {"line":867,"text":"\t\tf.activeFilename = \"\""},
  {"line":868,"text":"\t}"},
  {"line":869,"text":"\tif index := slices.IndexFunc(f.testData.Files, func(f *TestFileInfo) bool { return f.fileName == marker.FileName() }); index >= 0 {"},
  {"line":870,"text":"\t\ttestFile := f.testData.Files[index]"},
  {"line":871,"text":"\t\tf.scriptInfos[testFile.fileName] = newScriptInfo(testFile.fileName, testFile.Content)"},
  {"line":872,"text":"\t} else {"},
  {"line":873,"text":"\t\tdelete(f.scriptInfos, marker.FileName())"},
  {"line":874,"text":"\t}"},
  {"line":875,"text":"\tsendNotification(t, f, lsproto.TextDocumentDidCloseInfo, &lsproto.DidCloseTextDocumentParams{"},
  {"line":876,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":877,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(marker.FileName()),"},
  {"line":878,"text":"\t\t},"},
  {"line":879,"text":"\t})"},
  {"line":880,"text":"}"},
  {"line":882,"text":"func (f *FourslashTest) openFile(t *testing.T, filename string) {"},
  {"line":883,"text":"\tscript := f.getScriptInfo(filename)"},
  {"line":884,"text":"\tif script == nil {"},
  {"line":885,"text":"\t\tif content, ok := f.vfs.ReadFile(filename); ok {"},
  {"line":886,"text":"\t\t\tscript = newScriptInfo(filename, content)"},
  {"line":887,"text":"\t\t\tf.scriptInfos[filename] = script"},
  {"line":888,"text":"\t\t} else {"},
  {"line":889,"text":"\t\t\tt.Fatalf(\"File %s not found in test data\", filename)"},
  {"line":890,"text":"\t\t}"},
  {"line":891,"text":"\t}"},
  {"line":892,"text":"\tf.activeFilename = filename"},
  {"line":893,"text":"\tsendNotification(t, f, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{"},
  {"line":894,"text":"\t\tTextDocument: &lsproto.TextDocumentItem{"},
  {"line":895,"text":"\t\t\tUri:        lsconv.FileNameToDocumentURI(filename),"},
  {"line":896,"text":"\t\t\tLanguageId: getLanguageKind(filename),"},
  {"line":897,"text":"\t\t\tText:       script.content,"},
  {"line":898,"text":"\t\t},"},
  {"line":899,"text":"\t})"},
  {"line":900,"text":"\tf.baselineProjectsAfterNotification(t, filename)"},
  {"line":901,"text":"}"},
  {"line":903,"text":"func (f *FourslashTest) FormatDocument(t *testing.T, filename string) {"},
  {"line":904,"text":"\tif filename == \"\" {"},
  {"line":905,"text":"\t\tfilename = f.activeFilename"},
  {"line":906,"text":"\t}"},
  {"line":907,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentFormattingInfo, &lsproto.DocumentFormattingParams{"},
  {"line":908,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":909,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(filename),"},
  {"line":910,"text":"\t\t},"},
  {"line":911,"text":"\t\tOptions: f.userPreferences.FormatCodeSettings.ToLSFormatOptions(),"},
  {"line":912,"text":"\t})"},
  {"line":913,"text":"\tif result.TextEdits == nil {"},
  {"line":914,"text":"\t\treturn"},
  {"line":915,"text":"\t}"},
  {"line":916,"text":"\tf.applyTextEdits(t, *result.TextEdits)"},
  {"line":917,"text":"}"},
  {"line":919,"text":"func (f *FourslashTest) FormatSelection(t *testing.T, startMarkerName string, endMarkerName string) {"},
  {"line":920,"text":"\tt.Helper()"},
  {"line":921,"text":"\tstartMarker, ok := f.testData.MarkerPositions[startMarkerName]"},
  {"line":922,"text":"\tif !ok {"},
  {"line":923,"text":"\t\tt.Fatalf(\"Marker '%s' not found\", startMarkerName)"},
  {"line":924,"text":"\t}"},
  {"line":925,"text":"\tendMarker, ok := f.testData.MarkerPositions[endMarkerName]"},
  {"line":926,"text":"\tif !ok {"},
  {"line":927,"text":"\t\tt.Fatalf(\"Marker '%s' not found\", endMarkerName)"},
  {"line":928,"text":"\t}"},
  {"line":929,"text":"\tif startMarker.FileName() != endMarker.FileName() {"},
  {"line":930,"text":"\t\tt.Fatalf(\"Markers '%s' and '%s' are in different files\", startMarkerName, endMarkerName)"},
  {"line":931,"text":"\t}"},
  {"line":932,"text":"\tfilename := startMarker.FileName()"},
  {"line":933,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentRangeFormattingInfo, &lsproto.DocumentRangeFormattingParams{"},
  {"line":934,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":935,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(filename),"},
  {"line":936,"text":"\t\t},"},
  {"line":937,"text":"\t\tRange: lsproto.Range{"},
  {"line":938,"text":"\t\t\tStart: startMarker.LSPosition,"},
  {"line":939,"text":"\t\t\tEnd:   endMarker.LSPosition,"},
  {"line":940,"text":"\t\t},"},
  {"line":941,"text":"\t\tOptions: f.userPreferences.FormatCodeSettings.ToLSFormatOptions(),"},
  {"line":942,"text":"\t})"},
  {"line":943,"text":"\tif result.TextEdits == nil {"},
  {"line":944,"text":"\t\treturn"},
  {"line":945,"text":"\t}"},
  {"line":946,"text":"\tf.applyTextEdits(t, *result.TextEdits)"},
  {"line":947,"text":"}"},
  {"line":949,"text":"func (f *FourslashTest) VerifyCurrentFileContent(t *testing.T, expectedContent string) {"},
  {"line":950,"text":"\tt.Helper()"},
  {"line":951,"text":"\tactualContent := f.getScriptInfo(f.activeFilename).content"},
  {"line":952,"text":"\tassert.Equal(t, actualContent, expectedContent)"},
  {"line":953,"text":"}"},
  {"line":955,"text":"func (f *FourslashTest) VerifyCurrentLineContent(t *testing.T, expectedContent string) {"},
  {"line":956,"text":"\tt.Helper()"},
  {"line":957,"text":"\tactualContent := f.getScriptInfo(f.activeFilename).GetLineContent(int(f.currentCaretPosition.Line))"},
  {"line":958,"text":"\tassert.Equal(t, actualContent, expectedContent, fmt.Sprintf(`"},
  {"line":959,"text":"  actual line: \"%s\""},
  {"line":960,"text":"expected line: \"%s\""},
  {"line":961,"text":"`,"},
  {"line":962,"text":"\t\tactualContent,"},
  {"line":963,"text":"\t\texpectedContent,"},
  {"line":964,"text":"\t))"},
  {"line":965,"text":"}"},
  {"line":967,"text":"func (f *FourslashTest) VerifyIndentation(t *testing.T, numSpaces int) {"},
  {"line":968,"text":"\tt.Helper()"},
  {"line":972,"text":"}"},
  {"line":974,"text":"func getLanguageKind(filename string) lsproto.LanguageKind {"},
  {"line":975,"text":"\tif tspath.FileExtensionIsOneOf("},
  {"line":976,"text":"\t\tfilename,"},
  {"line":977,"text":"\t\t[]string{"},
  {"line":978,"text":"\t\t\ttspath.ExtensionTs, tspath.ExtensionMts, tspath.ExtensionCts,"},
  {"line":979,"text":"\t\t\ttspath.ExtensionDmts, tspath.ExtensionDcts, tspath.ExtensionDts,"},
  {"line":980,"text":"\t\t}) {"},
  {"line":981,"text":"\t\treturn lsproto.LanguageKindTypeScript"},
  {"line":982,"text":"\t}"},
  {"line":983,"text":"\tif tspath.FileExtensionIsOneOf(filename, []string{tspath.ExtensionJs, tspath.ExtensionMjs, tspath.ExtensionCjs}) {"},
  {"line":984,"text":"\t\treturn lsproto.LanguageKindJavaScript"},
  {"line":985,"text":"\t}"},
  {"line":986,"text":"\tif tspath.FileExtensionIs(filename, tspath.ExtensionJsx) {"},
  {"line":987,"text":"\t\treturn lsproto.LanguageKindJavaScriptReact"},
  {"line":988,"text":"\t}"},
  {"line":989,"text":"\tif tspath.FileExtensionIs(filename, tspath.ExtensionTsx) {"},
  {"line":990,"text":"\t\treturn lsproto.LanguageKindTypeScriptReact"},
  {"line":991,"text":"\t}"},
  {"line":992,"text":"\tif tspath.FileExtensionIs(filename, tspath.ExtensionJson) {"},
  {"line":993,"text":"\t\treturn lsproto.LanguageKindJSON"},
  {"line":994,"text":"\t}"},
  {"line":995,"text":"\treturn lsproto.LanguageKindTypeScript // !!! should we error in this case?"},
  {"line":996,"text":"}"},
  {"line":998,"text":"type CompletionsExpectedList struct {"},
  {"line":999,"text":"\tIsIncomplete    bool"},
  {"line":1000,"text":"\tItemDefaults    *CompletionsExpectedItemDefaults"},
  {"line":1001,"text":"\tItems           *CompletionsExpectedItems"},
  {"line":1002,"text":"\tUserPreferences *lsutil.UserPreferences"},
  {"line":1003,"text":"}"},
  {"line":1005,"text":"type Ignored = struct{}"},
  {"line":1008,"text":"type ExpectedCompletionEditRange = any"},
  {"line":1010,"text":"type EditRange struct {"},
  {"line":1011,"text":"\tInsert  *RangeMarker"},
  {"line":1012,"text":"\tReplace *RangeMarker"},
  {"line":1013,"text":"}"},
  {"line":1015,"text":"type CompletionsExpectedItemDefaults struct {"},
  {"line":1016,"text":"\tCommitCharacters *[]string"},
  {"line":1017,"text":"\tEditRange        ExpectedCompletionEditRange"},
  {"line":1018,"text":"}"},
  {"line":1021,"text":"type CompletionsExpectedItem = any"},
  {"line":1023,"text":"type CompletionsExpectedItems struct {"},
  {"line":1024,"text":"\tIncludes []CompletionsExpectedItem"},
  {"line":1025,"text":"\tExcludes []string"},
  {"line":1026,"text":"\tExact    []CompletionsExpectedItem"},
  {"line":1027,"text":"\tUnsorted []CompletionsExpectedItem"},
  {"line":1028,"text":"}"},
  {"line":1030,"text":"type CompletionsExpectedCodeAction struct {"},
  {"line":1031,"text":"\tName           string"},
  {"line":1032,"text":"\tSource         string"},
  {"line":1033,"text":"\tDescription    string"},
  {"line":1034,"text":"\tNewFileContent string"},
  {"line":1035,"text":"}"},
  {"line":1037,"text":"type VerifyCompletionsResult struct {"},
  {"line":1038,"text":"\tAndApplyCodeAction func(t *testing.T, expectedAction *CompletionsExpectedCodeAction)"},
  {"line":1039,"text":"\tAndHasNoCodeAction func(t *testing.T, unexpectedAction *CompletionsExpectedCodeAction)"},
  {"line":1040,"text":"}"},
  {"line":1043,"text":"type MarkerInput = any"},
  {"line":1047,"text":"func (f *FourslashTest) VerifyCompletions(t *testing.T, markerInput MarkerInput, expected *CompletionsExpectedList) VerifyCompletionsResult {"},
  {"line":1048,"text":"\tt.Helper()"},
  {"line":1049,"text":"\tvar list *lsproto.CompletionList"},
  {"line":1050,"text":"\tswitch marker := markerInput.(type) {"},
  {"line":1051,"text":"\tcase string:"},
  {"line":1052,"text":"\t\tf.GoToMarker(t, marker)"},
  {"line":1053,"text":"\t\tlist = f.verifyCompletionsWorker(t, expected)"},
  {"line":1054,"text":"\tcase *Marker:"},
  {"line":1055,"text":"\t\tf.goToMarker(t, marker)"},
  {"line":1056,"text":"\t\tlist = f.verifyCompletionsWorker(t, expected)"},
  {"line":1057,"text":"\tcase []string:"},
  {"line":1058,"text":"\t\tfor _, markerName := range marker {"},
  {"line":1059,"text":"\t\t\tf.GoToMarker(t, markerName)"},
  {"line":1060,"text":"\t\t\tf.verifyCompletionsWorker(t, expected)"},
  {"line":1061,"text":"\t\t}"},
  {"line":1062,"text":"\tcase []*Marker:"},
  {"line":1063,"text":"\t\tfor _, marker := range marker {"},
  {"line":1064,"text":"\t\t\tf.goToMarker(t, marker)"},
  {"line":1065,"text":"\t\t\tf.verifyCompletionsWorker(t, expected)"},
  {"line":1066,"text":"\t\t}"},
  {"line":1067,"text":"\tcase nil:"},
  {"line":1068,"text":"\t\tlist = f.verifyCompletionsWorker(t, expected)"},
  {"line":1069,"text":"\tdefault:"},
  {"line":1070,"text":"\t\tt.Fatalf(\"Invalid marker input type: %T. Expected string, *Marker, []string, or []*Marker.\", markerInput)"},
  {"line":1071,"text":"\t}"},
  {"line":1073,"text":"\treturn VerifyCompletionsResult{"},
  {"line":1074,"text":"\t\tAndApplyCodeAction: func(t *testing.T, expectedAction *CompletionsExpectedCodeAction) {"},
  {"line":1075,"text":"\t\t\titem := core.Find(list.Items, func(item *lsproto.CompletionItem) bool {"},
  {"line":1076,"text":"\t\t\t\tif item.Label != expectedAction.Name || item.Data == nil {"},
  {"line":1077,"text":"\t\t\t\t\treturn false"},
  {"line":1078,"text":"\t\t\t\t}"},
  {"line":1079,"text":"\t\t\t\tdata := item.Data"},
  {"line":1080,"text":"\t\t\t\tif data.AutoImport == nil {"},
  {"line":1081,"text":"\t\t\t\t\treturn false"},
  {"line":1082,"text":"\t\t\t\t}"},
  {"line":1083,"text":"\t\t\t\treturn data.AutoImport.ModuleSpecifier == expectedAction.Source"},
  {"line":1084,"text":"\t\t\t})"},
  {"line":1085,"text":"\t\t\tif item == nil {"},
  {"line":1086,"text":"\t\t\t\tt.Fatalf(\"Code action '%s' from source '%s' not found in completions.\", expectedAction.Name, expectedAction.Source)"},
  {"line":1087,"text":"\t\t\t}"},
  {"line":1088,"text":"\t\t\tassert.Check(t, strings.Contains(*item.Detail, expectedAction.Description), \"Completion item detail does not contain expected description.\")"},
  {"line":1089,"text":"\t\t\tf.applyTextEdits(t, *item.AdditionalTextEdits)"},
  {"line":1090,"text":"\t\t\tassert.Equal(t, f.getScriptInfo(f.activeFilename).content, expectedAction.NewFileContent, fmt.Sprintf(\"File content after applying code action '%s' did not match expected content.\", expectedAction.Name))"},
  {"line":1091,"text":"\t\t},"},
  {"line":1092,"text":"\t\tAndHasNoCodeAction: func(t *testing.T, unexpectedAction *CompletionsExpectedCodeAction) {"},
  {"line":1093,"text":"\t\t\titem := core.Find(list.Items, func(item *lsproto.CompletionItem) bool {"},
  {"line":1094,"text":"\t\t\t\tif item.Label != unexpectedAction.Name || item.Data == nil {"},
  {"line":1095,"text":"\t\t\t\t\treturn false"},
  {"line":1096,"text":"\t\t\t\t}"},
  {"line":1097,"text":"\t\t\t\tdata := item.Data"},
  {"line":1098,"text":"\t\t\t\tif data.AutoImport == nil {"},
  {"line":1099,"text":"\t\t\t\t\treturn false"},
  {"line":1100,"text":"\t\t\t\t}"},
  {"line":1101,"text":"\t\t\t\treturn data.AutoImport.ModuleSpecifier == unexpectedAction.Source"},
  {"line":1102,"text":"\t\t\t})"},
  {"line":1103,"text":"\t\t\tif item != nil {"},
  {"line":1104,"text":"\t\t\t\tt.Fatalf(\"Unexpected code action '%s' from source '%s' found in completions.\", unexpectedAction.Name, unexpectedAction.Source)"},
  {"line":1105,"text":"\t\t\t}"},
  {"line":1106,"text":"\t\t},"},
  {"line":1107,"text":"\t}"},
  {"line":1108,"text":"}"},
  {"line":1110,"text":"func (f *FourslashTest) verifyCompletionsWorker(t *testing.T, expected *CompletionsExpectedList) *lsproto.CompletionList {"},
  {"line":1111,"text":"\tt.Helper()"},
  {"line":1112,"text":"\tprefix := f.getCurrentPositionPrefix()"},
  {"line":1113,"text":"\tvar userPreferences *lsutil.UserPreferences"},
  {"line":1114,"text":"\tif expected != nil {"},
  {"line":1115,"text":"\t\tuserPreferences = expected.UserPreferences"},
  {"line":1116,"text":"\t}"},
  {"line":1117,"text":"\tlist := f.getCompletions(t, userPreferences)"},
  {"line":1118,"text":"\tf.verifyCompletionsResult(t, list, expected, prefix)"},
  {"line":1119,"text":"\treturn list"},
  {"line":1120,"text":"}"},
  {"line":1122,"text":"func (f *FourslashTest) GetCompletions(t *testing.T, userPreferences *lsutil.UserPreferences) *lsproto.CompletionList {"},
  {"line":1123,"text":"\tt.Helper()"},
  {"line":1124,"text":"\treturn f.getCompletions(t, userPreferences)"},
  {"line":1125,"text":"}"},
  {"line":1127,"text":"func (f *FourslashTest) getCompletions(t *testing.T, userPreferences *lsutil.UserPreferences) *lsproto.CompletionList {"},
  {"line":1128,"text":"\tt.Helper()"},
  {"line":1129,"text":"\tparams := &lsproto.CompletionParams{"},
  {"line":1130,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":1131,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":1132,"text":"\t\t},"},
  {"line":1133,"text":"\t\tPosition: f.currentCaretPosition,"},
  {"line":1134,"text":"\t\tContext:  &lsproto.CompletionContext{},"},
  {"line":1135,"text":"\t}"},
  {"line":1136,"text":"\tif userPreferences != nil {"},
  {"line":1137,"text":"\t\treset := f.ConfigureWithReset(t, *userPreferences)"},
  {"line":1138,"text":"\t\tdefer reset()"},
  {"line":1139,"text":"\t}"},
  {"line":1140,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentCompletionInfo, params)"},
  {"line":1144,"text":"\tif result.List != nil {"},
  {"line":1145,"text":"\t\tslices.SortStableFunc(result.List.Items, ls.CompareCompletionEntries)"},
  {"line":1146,"text":"\t}"},
  {"line":1147,"text":"\treturn result.List"},
  {"line":1148,"text":"}"},
  {"line":1150,"text":"func (f *FourslashTest) verifyCompletionsResult("},
  {"line":1151,"text":"\tt *testing.T,"},
  {"line":1152,"text":"\tactual *lsproto.CompletionList,"},
  {"line":1153,"text":"\texpected *CompletionsExpectedList,"},
  {"line":1154,"text":"\tprefix string,"},
  {"line":1155,"text":") {"},
  {"line":1156,"text":"\tif actual == nil {"},
  {"line":1157,"text":"\t\tif !isEmptyExpectedList(expected) {"},
  {"line":1158,"text":"\t\t\tt.Fatal(prefix + \"Expected completion list but got nil.\")"},
  {"line":1159,"text":"\t\t}"},
  {"line":1160,"text":"\t\treturn"},
  {"line":1161,"text":"\t} else if expected == nil {"},
  {"line":1162,"text":"\t\tif len(actual.Items) == 0 {"},
  {"line":1163,"text":"\t\t\treturn"},
  {"line":1164,"text":"\t\t}"},
  {"line":1166,"text":"\t\tt.Fatalf(prefix+\"Expected nil completion list but got non-nil: %s\", cmp.Diff(actual, nil))"},
  {"line":1167,"text":"\t}"},
  {"line":1168,"text":"\tassert.Equal(t, actual.IsIncomplete, expected.IsIncomplete, prefix+\"IsIncomplete mismatch\")"},
  {"line":1169,"text":"\tverifyCompletionsItemDefaults(t, actual.ItemDefaults, expected.ItemDefaults, prefix+\"ItemDefaults mismatch: \")"},
  {"line":1170,"text":"\tf.verifyCompletionsItems(t, prefix, actual.Items, expected.Items)"},
  {"line":1171,"text":"}"},
  {"line":1173,"text":"func isEmptyExpectedList(expected *CompletionsExpectedList) bool {"},
  {"line":1174,"text":"\treturn expected == nil || (len(expected.Items.Exact) == 0 && len(expected.Items.Includes) == 0 && len(expected.Items.Excludes) == 0)"},
  {"line":1175,"text":"}"},
  {"line":1177,"text":"func verifyCompletionsItemDefaults(t *testing.T, actual *lsproto.CompletionItemDefaults, expected *CompletionsExpectedItemDefaults, prefix string) {"},
  {"line":1178,"text":"\tif actual == nil {"},
  {"line":1179,"text":"\t\tif expected == nil {"},
  {"line":1180,"text":"\t\t\treturn"},
  {"line":1181,"text":"\t\t}"},
  {"line":1182,"text":"\t\tt.Fatalf(prefix+\"Expected non-nil completion item defaults but got nil: %s\", cmp.Diff(actual, nil))"},
  {"line":1183,"text":"\t}"},
  {"line":1184,"text":"\tif expected == nil {"},
  {"line":1185,"text":"\t\tt.Fatalf(prefix+\"Expected nil completion item defaults but got non-nil: %s\", cmp.Diff(actual, nil))"},
  {"line":1186,"text":"\t}"},
  {"line":1187,"text":"\tassertDeepEqual(t, actual.CommitCharacters, expected.CommitCharacters, prefix+\"CommitCharacters mismatch:\")"},
  {"line":1188,"text":"\tswitch editRange := expected.EditRange.(type) {"},
  {"line":1189,"text":"\tcase *EditRange:"},
  {"line":1190,"text":"\t\tif actual.EditRange == nil {"},
  {"line":1191,"text":"\t\t\tt.Fatal(prefix + \"Expected non-nil EditRange but got nil\")"},
  {"line":1192,"text":"\t\t}"},
  {"line":1193,"text":"\t\texpectedInsert := editRange.Insert.LSRange"},
  {"line":1194,"text":"\t\texpectedReplace := editRange.Replace.LSRange"},
  {"line":1195,"text":"\t\tassertDeepEqual("},
  {"line":1196,"text":"\t\t\tt,"},
  {"line":1197,"text":"\t\t\tactual.EditRange,"},
  {"line":1198,"text":"\t\t\t&lsproto.RangeOrEditRangeWithInsertReplace{"},
  {"line":1199,"text":"\t\t\t\tEditRangeWithInsertReplace: &lsproto.EditRangeWithInsertReplace{"},
  {"line":1200,"text":"\t\t\t\t\tInsert:  expectedInsert,"},
  {"line":1201,"text":"\t\t\t\t\tReplace: expectedReplace,"},
  {"line":1202,"text":"\t\t\t\t},"},
  {"line":1203,"text":"\t\t\t},"},
  {"line":1204,"text":"\t\t\tprefix+\"EditRange mismatch:\")"},
  {"line":1205,"text":"\tcase nil:"},
  {"line":1206,"text":"\t\tif actual.EditRange != nil {"},
  {"line":1207,"text":"\t\t\tt.Fatalf(prefix+\"Expected nil EditRange but got non-nil: %s\", cmp.Diff(actual.EditRange, nil))"},
  {"line":1208,"text":"\t\t}"},
  {"line":1209,"text":"\tcase Ignored:"},
  {"line":1210,"text":"\tdefault:"},
  {"line":1211,"text":"\t\tt.Fatalf(prefix+\"Expected EditRange to be *EditRange or Ignored, got %T\", editRange)"},
  {"line":1212,"text":"\t}"},
  {"line":1213,"text":"}"},
  {"line":1215,"text":"func (f *FourslashTest) verifyCompletionsItems(t *testing.T, prefix string, actual []*lsproto.CompletionItem, expected *CompletionsExpectedItems) {"},
  {"line":1216,"text":"\tif expected.Exact != nil {"},
  {"line":1217,"text":"\t\tif expected.Includes != nil {"},
  {"line":1218,"text":"\t\t\tt.Fatal(prefix + \"Expected exact completion list but also specified 'includes'.\")"},
  {"line":1219,"text":"\t\t}"},
  {"line":1220,"text":"\t\tif expected.Excludes != nil {"},
  {"line":1221,"text":"\t\t\tt.Fatal(prefix + \"Expected exact completion list but also specified 'excludes'.\")"},
  {"line":1222,"text":"\t\t}"},
  {"line":1223,"text":"\t\tif expected.Unsorted != nil {"},
  {"line":1224,"text":"\t\t\tt.Fatal(prefix + \"Expected exact completion list but also specified 'unsorted'.\")"},
  {"line":1225,"text":"\t\t}"},
  {"line":1226,"text":"\t\tif len(actual) != len(expected.Exact) {"},
  {"line":1227,"text":"\t\t\tt.Fatalf(prefix+\"Expected %d exact completion items but got %d.\", len(expected.Exact), len(actual))"},
  {"line":1228,"text":"\t\t}"},
  {"line":1229,"text":"\t\tif len(actual) > 0 {"},
  {"line":1230,"text":"\t\t\tf.verifyCompletionsAreExactly(t, prefix, actual, expected.Exact)"},
  {"line":1231,"text":"\t\t}"},
  {"line":1232,"text":"\t\treturn"},
  {"line":1233,"text":"\t}"},
  {"line":1234,"text":"\tnameToActualItems := make(map[string][]*lsproto.CompletionItem)"},
  {"line":1235,"text":"\tfor _, item := range actual {"},
  {"line":1236,"text":"\t\tnameToActualItems[item.Label] = append(nameToActualItems[item.Label], item)"},
  {"line":1237,"text":"\t}"},
  {"line":1238,"text":"\tif expected.Unsorted != nil {"},
  {"line":1239,"text":"\t\tif expected.Includes != nil {"},
  {"line":1240,"text":"\t\t\tt.Fatal(prefix + \"Expected unsorted completion list but also specified 'includes'.\")"},
  {"line":1241,"text":"\t\t}"},
  {"line":1242,"text":"\t\tif expected.Excludes != nil {"},
  {"line":1243,"text":"\t\t\tt.Fatal(prefix + \"Expected unsorted completion list but also specified 'excludes'.\")"},
  {"line":1244,"text":"\t\t}"},
  {"line":1245,"text":"\t\tfor _, item := range expected.Unsorted {"},
  {"line":1246,"text":"\t\t\tswitch item := item.(type) {"},
  {"line":1247,"text":"\t\t\tcase string:"},
  {"line":1248,"text":"\t\t\t\t_, ok := nameToActualItems[item]"},
  {"line":1249,"text":"\t\t\t\tif !ok {"},
  {"line":1250,"text":"\t\t\t\t\tt.Fatalf(\"%sLabel '%s' not found in actual items.\", prefix, item)"},
  {"line":1251,"text":"\t\t\t\t}"},
  {"line":1252,"text":"\t\t\t\tdelete(nameToActualItems, item)"},
  {"line":1253,"text":"\t\t\tcase *lsproto.CompletionItem:"},
  {"line":1254,"text":"\t\t\t\tactualItems, ok := nameToActualItems[item.Label]"},
  {"line":1255,"text":"\t\t\t\tif !ok {"},
  {"line":1256,"text":"\t\t\t\t\tt.Fatalf(\"%sLabel '%s' not found in actual items.\", prefix, item.Label)"},
  {"line":1257,"text":"\t\t\t\t}"},
  {"line":1258,"text":"\t\t\t\tvar mismatchPrefix string"},
  {"line":1259,"text":"\t\t\t\tif len(actualItems) > 1 {"},
  {"line":1260,"text":"\t\t\t\t\tmismatchPrefix = prefix + \"No completion item match for label \" + item.Label + \" (multiple candidates found): \""},
  {"line":1261,"text":"\t\t\t\t} else {"},
  {"line":1262,"text":"\t\t\t\t\tmismatchPrefix = prefix + \"Includes completion item mismatch for label \" + item.Label + \": \""},
  {"line":1263,"text":"\t\t\t\t}"},
  {"line":1264,"text":"\t\t\t\titemIndex := core.FindIndex(actualItems, func(actualItem *lsproto.CompletionItem) bool {"},
  {"line":1265,"text":"\t\t\t\t\tif err := f.verifyCompletionItem(t, prefix, actualItem, item); err != \"\" {"},
  {"line":1266,"text":"\t\t\t\t\t\tmismatchPrefix += \"\\n    \" + err"},
  {"line":1267,"text":"\t\t\t\t\t\treturn false"},
  {"line":1268,"text":"\t\t\t\t\t}"},
  {"line":1269,"text":"\t\t\t\t\treturn true"},
  {"line":1270,"text":"\t\t\t\t})"},
  {"line":1273,"text":"\t\t\t\tif itemIndex == -1 {"},
  {"line":1274,"text":"\t\t\t\t\tt.Fatal(mismatchPrefix)"},
  {"line":1275,"text":"\t\t\t\t}"},
  {"line":1277,"text":"\t\t\t\tif len(actualItems) == 1 {"},
  {"line":1278,"text":"\t\t\t\t\tdelete(nameToActualItems, item.Label)"},
  {"line":1279,"text":"\t\t\t\t} else if itemIndex == 0 {"},
  {"line":1280,"text":"\t\t\t\t\tnameToActualItems[item.Label] = actualItems[1:]"},
  {"line":1281,"text":"\t\t\t\t} else if itemIndex == len(actualItems)-1 {"},
  {"line":1282,"text":"\t\t\t\t\tnameToActualItems[item.Label] = actualItems[:itemIndex]"},
  {"line":1283,"text":"\t\t\t\t} else {"},
  {"line":1284,"text":"\t\t\t\t\tnameToActualItems[item.Label] = append(actualItems[:itemIndex], actualItems[itemIndex+1:]...)"},
  {"line":1285,"text":"\t\t\t\t}"},
  {"line":1287,"text":"\t\t\tdefault:"},
  {"line":1288,"text":"\t\t\t\tt.Fatalf(\"%sExpected completion item to be a string or *lsproto.CompletionItem, got %T\", prefix, item)"},
  {"line":1289,"text":"\t\t\t}"},
  {"line":1290,"text":"\t\t}"},
  {"line":1291,"text":"\t\tif len(expected.Unsorted) != len(actual) {"},
  {"line":1292,"text":"\t\t\tunmatched := slices.Collect(maps.Keys(nameToActualItems))"},
  {"line":1293,"text":"\t\t\tt.Fatalf(\"%sAdditional completions found but not included in 'unsorted': %s\", prefix, strings.Join(unmatched, \"\\n\"))"},
  {"line":1294,"text":"\t\t}"},
  {"line":1295,"text":"\t\treturn"},
  {"line":1296,"text":"\t}"},
  {"line":1297,"text":"\tif expected.Includes != nil {"},
  {"line":1298,"text":"\t\tfor _, item := range expected.Includes {"},
  {"line":1299,"text":"\t\t\tswitch item := item.(type) {"},
  {"line":1300,"text":"\t\t\tcase string:"},
  {"line":1301,"text":"\t\t\t\t_, ok := nameToActualItems[item]"},
  {"line":1302,"text":"\t\t\t\tif !ok {"},
  {"line":1303,"text":"\t\t\t\t\tt.Fatalf(\"%sLabel '%s' not found in actual items.\", prefix, item)"},
  {"line":1304,"text":"\t\t\t\t}"},
  {"line":1305,"text":"\t\t\tcase *lsproto.CompletionItem:"},
  {"line":1306,"text":"\t\t\t\tactualItems, ok := nameToActualItems[item.Label]"},
  {"line":1307,"text":"\t\t\t\tif !ok {"},
  {"line":1308,"text":"\t\t\t\t\tt.Fatalf(\"%sLabel '%s' not found in actual items.\", prefix, item.Label)"},
  {"line":1309,"text":"\t\t\t\t}"},
  {"line":1311,"text":"\t\t\t\tvar mismatchPrefix string"},
  {"line":1312,"text":"\t\t\t\tif len(actualItems) > 1 {"},
  {"line":1313,"text":"\t\t\t\t\tmismatchPrefix = prefix + \"No completion item match for label \" + item.Label + \" (multiple candidates found): \""},
  {"line":1314,"text":"\t\t\t\t} else {"},
  {"line":1315,"text":"\t\t\t\t\tmismatchPrefix = prefix + \"Includes completion item mismatch for label \" + item.Label + \": \""},
  {"line":1316,"text":"\t\t\t\t}"},
  {"line":1317,"text":"\t\t\t\titemIndex := core.FindIndex(actualItems, func(actualItem *lsproto.CompletionItem) bool {"},
  {"line":1318,"text":"\t\t\t\t\tif err := f.verifyCompletionItem(t, prefix, actualItem, item); err != \"\" {"},
  {"line":1319,"text":"\t\t\t\t\t\tmismatchPrefix += \"\\n    \" + err"},
  {"line":1320,"text":"\t\t\t\t\t\treturn false"},
  {"line":1321,"text":"\t\t\t\t\t}"},
  {"line":1322,"text":"\t\t\t\t\treturn true"},
  {"line":1323,"text":"\t\t\t\t})"},
  {"line":1326,"text":"\t\t\t\tif itemIndex == -1 {"},
  {"line":1327,"text":"\t\t\t\t\tt.Fatal(mismatchPrefix)"},
  {"line":1328,"text":"\t\t\t\t}"},
  {"line":1331,"text":"\t\t\t\tif len(actualItems) == 1 || itemIndex == len(actualItems)-1 {"},
  {"line":1332,"text":"\t\t\t\t\tdelete(nameToActualItems, item.Label)"},
  {"line":1333,"text":"\t\t\t\t} else {"},
  {"line":1334,"text":"\t\t\t\t\tnameToActualItems[item.Label] = actualItems[itemIndex:]"},
  {"line":1335,"text":"\t\t\t\t}"},
  {"line":1336,"text":"\t\t\tdefault:"},
  {"line":1337,"text":"\t\t\t\tt.Fatalf(\"%sExpected completion item to be a string or *lsproto.CompletionItem, got %T\", prefix, item)"},
  {"line":1338,"text":"\t\t\t}"},
  {"line":1339,"text":"\t\t}"},
  {"line":1340,"text":"\t}"},
  {"line":1341,"text":"\tfor _, exclude := range expected.Excludes {"},
  {"line":1342,"text":"\t\tif _, ok := nameToActualItems[exclude]; ok {"},
  {"line":1343,"text":"\t\t\tt.Fatalf(\"%sLabel '%s' should not be in actual items but was found.\", prefix, exclude)"},
  {"line":1344,"text":"\t\t}"},
  {"line":1345,"text":"\t}"},
  {"line":1346,"text":"}"},
  {"line":1348,"text":"func (f *FourslashTest) verifyCompletionsAreExactly(t *testing.T, prefix string, actual []*lsproto.CompletionItem, expected []CompletionsExpectedItem) {"},
  {"line":1350,"text":"\tassertDeepEqual(t, core.Map(actual, func(item *lsproto.CompletionItem) string {"},
  {"line":1351,"text":"\t\treturn item.Label"},
  {"line":1352,"text":"\t}), core.Map(expected, func(item CompletionsExpectedItem) string {"},
  {"line":1353,"text":"\t\treturn getExpectedLabel(t, item)"},
  {"line":1354,"text":"\t}), prefix+\"Labels mismatch\")"},
  {"line":1355,"text":"\tfor i, actualItem := range actual {"},
  {"line":1356,"text":"\t\tswitch expectedItem := expected[i].(type) {"},
  {"line":1357,"text":"\t\tcase string:"},
  {"line":1358,"text":"\t\t\tcontinue // already checked labels"},
  {"line":1359,"text":"\t\tcase *lsproto.CompletionItem:"},
  {"line":1360,"text":"\t\t\tif err := f.verifyCompletionItem(t, prefix+\"Completion item mismatch for label \"+actualItem.Label, actualItem, expectedItem); err != \"\" {"},
  {"line":1361,"text":"\t\t\t\tt.Fatalf(\"%s:\\n%s\", prefix+\"Completion item mismatch for label \"+actualItem.Label, err)"},
  {"line":1362,"text":"\t\t\t}"},
  {"line":1363,"text":"\t\t}"},
  {"line":1364,"text":"\t}"},
  {"line":1365,"text":"}"},
  {"line":1367,"text":"func ignorePaths(paths ...string) cmp.Option {"},
  {"line":1368,"text":"\treturn cmp.FilterPath("},
  {"line":1369,"text":"\t\tfunc(p cmp.Path) bool {"},
  {"line":1370,"text":"\t\t\treturn slices.Contains(paths, p.Last().String())"},
  {"line":1371,"text":"\t\t},"},
  {"line":1372,"text":"\t\tcmp.Ignore(),"},
  {"line":1373,"text":"\t)"},
  {"line":1374,"text":"}"},
  {"line":1376,"text":"var ("},
  {"line":1377,"text":"\tcompletionIgnoreOpts  = ignorePaths(\".Kind\", \".SortText\", \".FilterText\", \".Data\", \".AdditionalTextEdits\")"},
  {"line":1378,"text":"\tautoImportIgnoreOpts  = ignorePaths(\".Kind\", \".SortText\", \".FilterText\", \".Data\", \".LabelDetails\", \".Detail\", \".AdditionalTextEdits\")"},
  {"line":1379,"text":"\tdiagnosticsIgnoreOpts = ignorePaths(\".Severity\", \".Source\", \".RelatedInformation\")"},
  {"line":1380,"text":")"},
  {"line":1382,"text":"func (f *FourslashTest) verifyCompletionItem(t *testing.T, prefix string, actual *lsproto.CompletionItem, expected *lsproto.CompletionItem) string {"},
  {"line":1384,"text":"\tt.Helper()"},
  {"line":1385,"text":"\tvar actualAutoImportFix, expectedAutoImportFix *lsproto.AutoImportFix"},
  {"line":1386,"text":"\tif actual.Data != nil {"},
  {"line":1387,"text":"\t\tactualAutoImportFix = actual.Data.AutoImport"},
  {"line":1388,"text":"\t}"},
  {"line":1389,"text":"\tif expected.Data != nil {"},
  {"line":1390,"text":"\t\texpectedAutoImportFix = expected.Data.AutoImport"},
  {"line":1391,"text":"\t}"},
  {"line":1392,"text":"\tif (actualAutoImportFix == nil) != (expectedAutoImportFix == nil) {"},
  {"line":1393,"text":"\t\treturn \"Mismatch in auto-import data presence\""},
  {"line":1394,"text":"\t}"},
  {"line":1396,"text":"\tif expected.Detail != nil || expected.Documentation != nil || actualAutoImportFix != nil {"},
  {"line":1397,"text":"\t\tactual = f.resolveCompletionItem(t, actual)"},
  {"line":1398,"text":"\t}"},
  {"line":1400,"text":"\tif actualAutoImportFix != nil {"},
  {"line":1401,"text":"\t\tif err := cmp.Diff(actual, expected, autoImportIgnoreOpts); err != \"\" {"},
  {"line":1402,"text":"\t\t\treturn err"},
  {"line":1403,"text":"\t\t}"},
  {"line":1404,"text":"\t\tif expected.AdditionalTextEdits == AnyTextEdits {"},
  {"line":1405,"text":"\t\t\tif !(actual.AdditionalTextEdits != nil && len(*actual.AdditionalTextEdits) > 0) {"},
  {"line":1406,"text":"\t\t\t\treturn \"Expected non-nil AdditionalTextEdits for auto-import completion item\""},
  {"line":1407,"text":"\t\t\t}"},
  {"line":1408,"text":"\t\t}"},
  {"line":1409,"text":"\t\tif expected.LabelDetails != nil {"},
  {"line":1410,"text":"\t\t\tif err := cmp.Diff(actual.LabelDetails, expected.LabelDetails); err != \"\" {"},
  {"line":1411,"text":"\t\t\t\treturn fmt.Sprintf(\"%s:\\n%s\", \"LabelDetailsMismatch\", err)"},
  {"line":1412,"text":"\t\t\t}"},
  {"line":1413,"text":"\t\t}"},
  {"line":1414,"text":"\t\tif actualAutoImportFix.ModuleSpecifier != expectedAutoImportFix.ModuleSpecifier {"},
  {"line":1415,"text":"\t\t\treturn \"ModuleSpecifier mismatch\""},
  {"line":1416,"text":"\t\t}"},
  {"line":1417,"text":"\t} else {"},
  {"line":1418,"text":"\t\tif err := cmp.Diff(actual, expected, completionIgnoreOpts); err != \"\" {"},
  {"line":1419,"text":"\t\t\treturn err"},
  {"line":1420,"text":"\t\t}"},
  {"line":1421,"text":"\t\tif expected.AdditionalTextEdits != AnyTextEdits {"},
  {"line":1422,"text":"\t\t\tif err := cmp.Diff(actual.AdditionalTextEdits, expected.AdditionalTextEdits); err != \"\" {"},
  {"line":1423,"text":"\t\t\t\treturn fmt.Sprintf(\"%s:\\n%s\", \"AdditionalTextEdits mismatch\", err)"},
  {"line":1424,"text":"\t\t\t}"},
  {"line":1425,"text":"\t\t}"},
  {"line":1426,"text":"\t}"},
  {"line":1428,"text":"\tif expected.FilterText != nil {"},
  {"line":1429,"text":"\t\tif err := cmp.Diff(actual.FilterText, expected.FilterText); err != \"\" {"},
  {"line":1430,"text":"\t\t\treturn fmt.Sprintf(\"%s:\\n%s\", \"FilterText mismatch\", err)"},
  {"line":1431,"text":"\t\t}"},
  {"line":1432,"text":"\t}"},
  {"line":1433,"text":"\tif expected.Kind != nil {"},
  {"line":1434,"text":"\t\tif err := cmp.Diff(actual.Kind, expected.Kind); err != \"\" {"},
  {"line":1435,"text":"\t\t\treturn fmt.Sprintf(\"%s:\\n%s\", \"Kind mismatch\", err)"},
  {"line":1436,"text":"\t\t}"},
  {"line":1437,"text":"\t}"},
  {"line":1438,"text":"\tif err := cmp.Diff(actual.SortText, core.OrElse(expected.SortText, new(string(ls.SortTextLocationPriority)))); err != \"\" {"},
  {"line":1439,"text":"\t\treturn fmt.Sprintf(\"%s:\\n%s\", \"SortText mismatch\", err)"},
  {"line":1440,"text":"\t}"},
  {"line":1442,"text":"\treturn \"\""},
  {"line":1443,"text":"}"},
  {"line":1445,"text":"func (f *FourslashTest) ResolveCompletionItem(t *testing.T, item *lsproto.CompletionItem) *lsproto.CompletionItem {"},
  {"line":1446,"text":"\tt.Helper()"},
  {"line":1447,"text":"\treturn f.resolveCompletionItem(t, item)"},
  {"line":1448,"text":"}"},
  {"line":1450,"text":"func (f *FourslashTest) resolveCompletionItem(t *testing.T, item *lsproto.CompletionItem) *lsproto.CompletionItem {"},
  {"line":1451,"text":"\tresult := sendRequest(t, f, lsproto.CompletionItemResolveInfo, item)"},
  {"line":1452,"text":"\treturn result"},
  {"line":1453,"text":"}"},
  {"line":1455,"text":"func getExpectedLabel(t *testing.T, item CompletionsExpectedItem) string {"},
  {"line":1456,"text":"\tswitch item := item.(type) {"},
  {"line":1457,"text":"\tcase string:"},
  {"line":1458,"text":"\t\treturn item"},
  {"line":1459,"text":"\tcase *lsproto.CompletionItem:"},
  {"line":1460,"text":"\t\treturn item.Label"},
  {"line":1461,"text":"\tdefault:"},
  {"line":1462,"text":"\t\tt.Fatalf(\"Expected completion item to be a string or *lsproto.CompletionItem, got %T\", item)"},
  {"line":1463,"text":"\t\treturn \"\""},
  {"line":1464,"text":"\t}"},
  {"line":1465,"text":"}"},
  {"line":1467,"text":"func assertDeepEqual(t *testing.T, actual any, expected any, prefix string, opts ...cmp.Option) {"},
  {"line":1468,"text":"\tt.Helper()"},
  {"line":1470,"text":"\tdiff := cmp.Diff(actual, expected, opts...)"},
  {"line":1471,"text":"\tif diff != \"\" {"},
  {"line":1472,"text":"\t\tt.Fatalf(\"%s:\\n%s\", prefix, diff)"},
  {"line":1473,"text":"\t}"},
  {"line":1474,"text":"}"},
  {"line":1477,"text":"type VerifyCodeFixOptions struct {"},
  {"line":1478,"text":"\tDescription     string"},
  {"line":1479,"text":"\tNewFileContent  string"},
  {"line":1480,"text":"\tNewRangeContent string"},
  {"line":1481,"text":"\tIndex           int"},
  {"line":1482,"text":"\tApplyChanges    bool"},
  {"line":1483,"text":"\tUserPreferences *lsutil.UserPreferences"},
  {"line":1484,"text":"}"},
  {"line":1487,"text":"type VerifyCodeFixAllOptions struct {"},
  {"line":1488,"text":"\tFixID          string"},
  {"line":1489,"text":"\tNewFileContent string"},
  {"line":1490,"text":"}"},
  {"line":1493,"text":"func (f *FourslashTest) VerifyCodeFix(t *testing.T, options VerifyCodeFixOptions) {"},
  {"line":1494,"text":"\tt.Helper()"},
  {"line":1496,"text":"\tif options.UserPreferences != nil {"},
  {"line":1497,"text":"\t\treset := f.ConfigureWithReset(t, *options.UserPreferences)"},
  {"line":1498,"text":"\t\tdefer reset()"},
  {"line":1499,"text":"\t}"},
  {"line":1501,"text":"\tactions := f.getCodeFixActions(t)"},
  {"line":1503,"text":"\tif len(actions) == 0 {"},
  {"line":1504,"text":"\t\tt.Fatalf(\"No code fixes returned.\")"},
  {"line":1505,"text":"\t}"},
  {"line":1506,"text":"\tif options.Index >= len(actions) {"},
  {"line":1507,"text":"\t\tt.Fatalf(\"Code fix index %d out of range (got %d fixes)\", options.Index, len(actions))"},
  {"line":1508,"text":"\t}"},
  {"line":1510,"text":"\tmatchingAction := actions[options.Index]"},
  {"line":1511,"text":"\tif matchingAction.Title != options.Description {"},
  {"line":1512,"text":"\t\tfound := false"},
  {"line":1513,"text":"\t\tfor _, action := range actions {"},
  {"line":1514,"text":"\t\t\tif action.Title == options.Description {"},
  {"line":1515,"text":"\t\t\t\tmatchingAction = action"},
  {"line":1516,"text":"\t\t\t\tfound = true"},
  {"line":1517,"text":"\t\t\t\tbreak"},
  {"line":1518,"text":"\t\t\t}"},
  {"line":1519,"text":"\t\t}"},
  {"line":1520,"text":"\t\tif !found {"},
  {"line":1521,"text":"\t\t\tvar titles []string"},
  {"line":1522,"text":"\t\t\tfor _, a := range actions {"},
  {"line":1523,"text":"\t\t\t\ttitles = append(titles, a.Title)"},
  {"line":1524,"text":"\t\t\t}"},
  {"line":1525,"text":"\t\t\tt.Fatalf(\"No code fix with description %q at index %d found. Available fixes: %v\", options.Description, options.Index, titles)"},
  {"line":1526,"text":"\t\t}"},
  {"line":1527,"text":"\t}"},
  {"line":1529,"text":"\toriginalContent := f.getScriptInfo(f.activeFilename).content"},
  {"line":1530,"text":"\texpectedContent := options.NewFileContent"},
  {"line":1531,"text":"\tif options.NewRangeContent != \"\" {"},
  {"line":1532,"text":"\t\tselection := f.getSelection()"},
  {"line":1533,"text":"\t\tif selection.Pos() == selection.End() {"},
  {"line":1534,"text":"\t\t\tranges := f.getRangesInFile(f.activeFilename)"},
  {"line":1535,"text":"\t\t\tif len(ranges) == 0 {"},
  {"line":1536,"text":"\t\t\t\tt.Fatal(\"Expected a selected range or fourslash range for NewRangeContent verification.\")"},
  {"line":1537,"text":"\t\t\t}"},
  {"line":1538,"text":"\t\t\tselection = ranges[0].Range"},
  {"line":1539,"text":"\t\t}"},
  {"line":1540,"text":"\t\texpectedContent = originalContent[:selection.Pos()] + options.NewRangeContent + originalContent[selection.End():]"},
  {"line":1541,"text":"\t}"},
  {"line":1543,"text":"\tif options.ApplyChanges {"},
  {"line":1544,"text":"\t\tif matchingAction.Edit != nil && matchingAction.Edit.Changes != nil {"},
  {"line":1545,"text":"\t\t\texpectedURI := lsconv.FileNameToDocumentURI(f.activeFilename)"},
  {"line":1546,"text":"\t\t\tfor uri, edits := range *matchingAction.Edit.Changes {"},
  {"line":1547,"text":"\t\t\t\tif uri != expectedURI {"},
  {"line":1548,"text":"\t\t\t\t\tt.Fatalf(\"Code fix returned edits for unexpected URI %q (expected %q)\", uri, expectedURI)"},
  {"line":1549,"text":"\t\t\t\t}"},
  {"line":1550,"text":"\t\t\t\tf.applyTextEdits(t, edits)"},
  {"line":1551,"text":"\t\t\t}"},
  {"line":1552,"text":"\t\t}"},
  {"line":1553,"text":"\t\tactual := f.getScriptInfo(f.activeFilename).content"},
  {"line":1554,"text":"\t\tassert.Equal(t, expectedContent, actual, \"File content after applying code fix did not match expected content.\")"},
  {"line":1555,"text":"\t} else {"},
  {"line":1556,"text":"\t\tactual := f.getScriptInfo(f.activeFilename).content"},
  {"line":1557,"text":"\t\tif matchingAction.Edit != nil && matchingAction.Edit.Changes != nil {"},
  {"line":1558,"text":"\t\t\texpectedURI := lsconv.FileNameToDocumentURI(f.activeFilename)"},
  {"line":1559,"text":"\t\t\tfor uri, edits := range *matchingAction.Edit.Changes {"},
  {"line":1560,"text":"\t\t\t\tif uri != expectedURI {"},
  {"line":1561,"text":"\t\t\t\t\tt.Fatalf(\"Code fix returned edits for unexpected URI %q (expected %q)\", uri, expectedURI)"},
  {"line":1562,"text":"\t\t\t\t}"},
  {"line":1563,"text":"\t\t\t\tactual = f.applyEditsToContent(actual, edits)"},
  {"line":1564,"text":"\t\t\t}"},
  {"line":1565,"text":"\t\t}"},
  {"line":1566,"text":"\t\tassert.Equal(t, expectedContent, actual, \"File content after applying code fix did not match expected content.\")"},
  {"line":1567,"text":"\t}"},
  {"line":1568,"text":"}"},
  {"line":1570,"text":"func (f *FourslashTest) VerifyRangeAfterCodeFix(t *testing.T, expectedText string, includeWhitespace bool, errorCode int, index int) {"},
  {"line":1571,"text":"\tt.Helper()"},
  {"line":1573,"text":"\tactions := f.getCodeFixActions(t, errorCode)"},
  {"line":1574,"text":"\tif len(actions) == 0 {"},
  {"line":1575,"text":"\t\tt.Fatalf(\"No code fixes returned.\")"},
  {"line":1576,"text":"\t}"},
  {"line":1578,"text":"\tif index >= len(actions) {"},
  {"line":1579,"text":"\t\tt.Fatalf(\"Code fix index %d out of range (got %d fixes)\", index, len(actions))"},
  {"line":1580,"text":"\t}"},
  {"line":1582,"text":"\taction := actions[index]"},
  {"line":1583,"text":"\tranges := f.getRangesInFile(f.activeFilename)"},
  {"line":1584,"text":"\tif len(ranges) != 1 {"},
  {"line":1585,"text":"\t\tt.Fatalf(\"Expected exactly one range in %q, got %d.\", f.activeFilename, len(ranges))"},
  {"line":1586,"text":"\t}"},
  {"line":1588,"text":"\tedits := f.getCodeActionEditsForActiveFile(t, action)"},
  {"line":1589,"text":"\tupdatedRange := f.updateTextRangeForTextEdits(ranges[0].Range, edits)"},
  {"line":1590,"text":"\tassertValidTextRange(t, updatedRange, fmt.Sprintf(\"Code fix %q replaced part of the expected range; unable to compute rangeAfterCodeFix result.\", action.Title))"},
  {"line":1592,"text":"\tf.applyTextEdits(t, edits)"},
  {"line":1593,"text":"\tactualContent := f.getScriptInfo(f.activeFilename).content"},
  {"line":1594,"text":"\tactualText := actualContent[updatedRange.Pos():updatedRange.End()]"},
  {"line":1596,"text":"\tif includeWhitespace {"},
  {"line":1597,"text":"\t\tassert.Equal(t, expectedText, actualText, \"Range content after applying code fix did not match expected content.\")"},
  {"line":1598,"text":"\t\treturn"},
  {"line":1599,"text":"\t}"},
  {"line":1601,"text":"\tactualText = removeWhitespace(actualText)"},
  {"line":1602,"text":"\texpectedText = removeWhitespace(expectedText)"},
  {"line":1603,"text":"\tassert.Equal(t, expectedText, actualText, \"Range content after applying code fix did not match expected content.\")"},
  {"line":1604,"text":"}"},
  {"line":1606,"text":"func (f *FourslashTest) getCodeActionEditsForActiveFile(t *testing.T, action *lsproto.CodeAction) []*lsproto.TextEdit {"},
  {"line":1607,"text":"\tt.Helper()"},
  {"line":1608,"text":"\tif action.Edit == nil || action.Edit.Changes == nil {"},
  {"line":1609,"text":"\t\tt.Fatalf(\"Code fix %q did not return text edits.\", action.Title)"},
  {"line":1610,"text":"\t}"},
  {"line":1611,"text":"\tif len(*action.Edit.Changes) != 1 {"},
  {"line":1612,"text":"\t\tt.Fatalf(\"Code fix %q returned edits for multiple files; rangeAfterCodeFix expects only the active file.\", action.Title)"},
  {"line":1613,"text":"\t}"},
  {"line":1615,"text":"\tedits, ok := (*action.Edit.Changes)[lsconv.FileNameToDocumentURI(f.activeFilename)]"},
  {"line":1616,"text":"\tif ok {"},
  {"line":1617,"text":"\t\treturn edits"},
  {"line":1618,"text":"\t}"},
  {"line":1619,"text":"\tt.Fatalf(\"Code fix %q did not return edits for active file %q.\", action.Title, f.activeFilename)"},
  {"line":1620,"text":"\tpanic(\"unreachable\")"},
  {"line":1621,"text":"}"},
  {"line":1624,"text":"func (f *FourslashTest) VerifyCodeFixAvailable(t *testing.T, expectedDescriptions []string) {"},
  {"line":1625,"text":"\tt.Helper()"},
  {"line":1627,"text":"\tactions := f.getCodeFixActions(t)"},
  {"line":1629,"text":"\tif expectedDescriptions == nil {"},
  {"line":1630,"text":"\t\tif len(actions) == 0 {"},
  {"line":1631,"text":"\t\t\tt.Fatalf(\"Expected code fixes to be available, but got none.\")"},
  {"line":1632,"text":"\t\t}"},
  {"line":1633,"text":"\t\treturn"},
  {"line":1634,"text":"\t}"},
  {"line":1636,"text":"\tif len(expectedDescriptions) == 0 {"},
  {"line":1637,"text":"\t\tf.VerifyCodeFixNotAvailable(t)"},
  {"line":1638,"text":"\t\treturn"},
  {"line":1639,"text":"\t}"},
  {"line":1641,"text":"\tfor _, expected := range expectedDescriptions {"},
  {"line":1642,"text":"\t\tfound := false"},
  {"line":1643,"text":"\t\tfor _, action := range actions {"},
  {"line":1644,"text":"\t\t\tif action.Title == expected {"},
  {"line":1645,"text":"\t\t\t\tfound = true"},
  {"line":1646,"text":"\t\t\t\tbreak"},
  {"line":1647,"text":"\t\t\t}"},
  {"line":1648,"text":"\t\t}"},
  {"line":1649,"text":"\t\tif !found {"},
  {"line":1650,"text":"\t\t\tvar titles []string"},
  {"line":1651,"text":"\t\t\tfor _, a := range actions {"},
  {"line":1652,"text":"\t\t\t\ttitles = append(titles, a.Title)"},
  {"line":1653,"text":"\t\t\t}"},
  {"line":1654,"text":"\t\t\tt.Fatalf(\"Expected code fix with description %q not found. Available fixes: %v\", expected, titles)"},
  {"line":1655,"text":"\t\t}"},
  {"line":1656,"text":"\t}"},
  {"line":1657,"text":"}"},
  {"line":1659,"text":"func (f *FourslashTest) VerifyCodeFixNotAvailable(t *testing.T, expected ...string) {"},
  {"line":1660,"text":"\tt.Helper()"},
  {"line":1662,"text":"\tactions := f.getCodeFixActions(t)"},
  {"line":1663,"text":"\tif len(expected) == 0 {"},
  {"line":1664,"text":"\t\tif len(actions) == 0 {"},
  {"line":1665,"text":"\t\t\treturn"},
  {"line":1666,"text":"\t\t}"},
  {"line":1668,"text":"\t\tvar titles []string"},
  {"line":1669,"text":"\t\tfor _, action := range actions {"},
  {"line":1670,"text":"\t\t\ttitles = append(titles, action.Title)"},
  {"line":1671,"text":"\t\t}"},
  {"line":1672,"text":"\t\tt.Fatalf(\"Expected no code fixes, but got: %v\", titles)"},
  {"line":1673,"text":"\t}"},
  {"line":1674,"text":"\tfor _, title := range expected {"},
  {"line":1675,"text":"\t\tfor _, action := range actions {"},
  {"line":1676,"text":"\t\t\tif action.Title == title {"},
  {"line":1677,"text":"\t\t\t\tt.Fatalf(\"Expected code fix with description %q not to be available.\", title)"},
  {"line":1678,"text":"\t\t\t}"},
  {"line":1679,"text":"\t\t}"},
  {"line":1680,"text":"\t}"},
  {"line":1681,"text":"}"},
  {"line":1686,"text":"func (f *FourslashTest) VerifyCodeFixAvailableExact(t *testing.T, expectedDescriptions []string) {"},
  {"line":1687,"text":"\tt.Helper()"},
  {"line":1689,"text":"\tactions := f.getCodeFixActions(t)"},
  {"line":1691,"text":"\tif len(actions) != len(expectedDescriptions) {"},
  {"line":1692,"text":"\t\tvar titles []string"},
  {"line":1693,"text":"\t\tfor _, a := range actions {"},
  {"line":1694,"text":"\t\t\ttitles = append(titles, a.Title)"},
  {"line":1695,"text":"\t\t}"},
  {"line":1696,"text":"\t\tt.Fatalf(\"Expected exactly %d code fixes, but got %d. Available fixes: %v\", len(expectedDescriptions), len(actions), titles)"},
  {"line":1697,"text":"\t}"},
  {"line":1699,"text":"\tfor _, expected := range expectedDescriptions {"},
  {"line":1700,"text":"\t\tfound := false"},
  {"line":1701,"text":"\t\tfor _, action := range actions {"},
  {"line":1702,"text":"\t\t\tif action.Title == expected {"},
  {"line":1703,"text":"\t\t\t\tfound = true"},
  {"line":1704,"text":"\t\t\t\tbreak"},
  {"line":1705,"text":"\t\t\t}"},
  {"line":1706,"text":"\t\t}"},
  {"line":1707,"text":"\t\tif !found {"},
  {"line":1708,"text":"\t\t\tvar titles []string"},
  {"line":1709,"text":"\t\t\tfor _, a := range actions {"},
  {"line":1710,"text":"\t\t\t\ttitles = append(titles, a.Title)"},
  {"line":1711,"text":"\t\t\t}"},
  {"line":1712,"text":"\t\t\tt.Fatalf(\"Expected code fix with description %q not found. Available fixes: %v\", expected, titles)"},
  {"line":1713,"text":"\t\t}"},
  {"line":1714,"text":"\t}"},
  {"line":1715,"text":"}"},
  {"line":1720,"text":"func (f *FourslashTest) VerifyCodeFixAll(t *testing.T, options VerifyCodeFixAllOptions) {"},
  {"line":1721,"text":"\tt.Helper()"},
  {"line":1723,"text":"\tactions := f.getAllQuickFixActions(t)"},
  {"line":1724,"text":"\tif len(actions) == 0 {"},
  {"line":1725,"text":"\t\tt.Fatalf(\"No code fixes available for fixId %q\", options.FixID)"},
  {"line":1726,"text":"\t}"},
  {"line":1731,"text":"\tvar fixAllCandidates []*lsproto.CodeAction"},
  {"line":1732,"text":"\tfor _, action := range actions {"},
  {"line":1733,"text":"\t\tif action.Diagnostics == nil || len(*action.Diagnostics) == 0 {"},
  {"line":1734,"text":"\t\t\tfixAllCandidates = append(fixAllCandidates, action)"},
  {"line":1735,"text":"\t\t}"},
  {"line":1736,"text":"\t}"},
  {"line":1738,"text":"\tvar fixAllAction *lsproto.CodeAction"},
  {"line":1739,"text":"\tif len(fixAllCandidates) == 1 {"},
  {"line":1740,"text":"\t\tfixAllAction = fixAllCandidates[0]"},
  {"line":1741,"text":"\t} else {"},
  {"line":1743,"text":"\t\tfor _, action := range fixAllCandidates {"},
  {"line":1744,"text":"\t\t\tif strings.Contains(strings.ToLower(action.Title), strings.ToLower(options.FixID)) {"},
  {"line":1745,"text":"\t\t\t\tfixAllAction = action"},
  {"line":1746,"text":"\t\t\t\tbreak"},
  {"line":1747,"text":"\t\t\t}"},
  {"line":1748,"text":"\t\t}"},
  {"line":1749,"text":"\t}"},
  {"line":1751,"text":"\tif fixAllAction == nil {"},
  {"line":1752,"text":"\t\tvar titles []string"},
  {"line":1753,"text":"\t\tfor _, a := range actions {"},
  {"line":1754,"text":"\t\t\ttitles = append(titles, a.Title)"},
  {"line":1755,"text":"\t\t}"},
  {"line":1756,"text":"\t\tt.Fatalf(\"No fix-all code action found for fixId %q. Available fixes: %v\", options.FixID, titles)"},
  {"line":1757,"text":"\t}"},
  {"line":1759,"text":"\tif fixAllAction.Edit != nil && fixAllAction.Edit.Changes != nil {"},
  {"line":1760,"text":"\t\texpectedURI := lsconv.FileNameToDocumentURI(f.activeFilename)"},
  {"line":1761,"text":"\t\tfor uri, edits := range *fixAllAction.Edit.Changes {"},
  {"line":1762,"text":"\t\t\tif uri != expectedURI {"},
  {"line":1763,"text":"\t\t\t\tt.Fatalf(\"Fix-all code action returned edits for unexpected URI %q (expected %q)\", uri, expectedURI)"},
  {"line":1764,"text":"\t\t\t}"},
  {"line":1765,"text":"\t\t\tf.applyTextEdits(t, edits)"},
  {"line":1766,"text":"\t\t}"},
  {"line":1767,"text":"\t}"},
  {"line":1769,"text":"\tactual := f.getScriptInfo(f.activeFilename).content"},
  {"line":1770,"text":"\tassert.Equal(t, options.NewFileContent, actual, \"File content after applying all code fixes did not match expected content.\")"},
  {"line":1771,"text":"}"},
  {"line":1775,"text":"func (f *FourslashTest) VerifySourceFixAll(t *testing.T, expectedContent string) {"},
  {"line":1776,"text":"\tt.Helper()"},
  {"line":1778,"text":"\tonly := []lsproto.CodeActionKind{lsproto.CodeActionKindSourceFixAll}"},
  {"line":1779,"text":"\tparams := &lsproto.CodeActionParams{"},
  {"line":1780,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":1781,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":1782,"text":"\t\t},"},
  {"line":1783,"text":"\t\tRange: lsproto.Range{"},
  {"line":1784,"text":"\t\t\tStart: f.currentCaretPosition,"},
  {"line":1785,"text":"\t\t\tEnd:   f.currentCaretPosition,"},
  {"line":1786,"text":"\t\t},"},
  {"line":1787,"text":"\t\tContext: &lsproto.CodeActionContext{"},
  {"line":1788,"text":"\t\t\tDiagnostics: []*lsproto.Diagnostic{},"},
  {"line":1789,"text":"\t\t\tOnly:        &only,"},
  {"line":1790,"text":"\t\t},"},
  {"line":1791,"text":"\t}"},
  {"line":1792,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentCodeActionInfo, params)"},
  {"line":1794,"text":"\tif result.CommandOrCodeActionArray == nil {"},
  {"line":1795,"text":"\t\tt.Fatalf(\"No source.fixAll code actions returned\")"},
  {"line":1796,"text":"\t}"},
  {"line":1798,"text":"\tvar selected *lsproto.CodeAction"},
  {"line":1799,"text":"\tfor _, item := range *result.CommandOrCodeActionArray {"},
  {"line":1800,"text":"\t\tif item.CodeAction == nil || item.CodeAction.Kind == nil || *item.CodeAction.Kind != lsproto.CodeActionKindSourceFixAll {"},
  {"line":1801,"text":"\t\t\tcontinue"},
  {"line":1802,"text":"\t\t}"},
  {"line":1803,"text":"\t\tselected = item.CodeAction"},
  {"line":1804,"text":"\t\tbreak"},
  {"line":1805,"text":"\t}"},
  {"line":1807,"text":"\tif selected == nil {"},
  {"line":1808,"text":"\t\tt.Fatalf(\"No source.fixAll code action found\")"},
  {"line":1809,"text":"\t}"},
  {"line":1810,"text":"\tif selected.Edit != nil && selected.Edit.Changes != nil {"},
  {"line":1811,"text":"\t\texpectedURI := lsconv.FileNameToDocumentURI(f.activeFilename)"},
  {"line":1812,"text":"\t\tfor uri, edits := range *selected.Edit.Changes {"},
  {"line":1813,"text":"\t\t\tif uri != expectedURI {"},
  {"line":1814,"text":"\t\t\t\tt.Fatalf(\"source.fixAll returned edits for unexpected URI %q (expected %q)\", uri, expectedURI)"},
  {"line":1815,"text":"\t\t\t}"},
  {"line":1816,"text":"\t\t\tf.applyTextEdits(t, edits)"},
  {"line":1817,"text":"\t\t}"},
  {"line":1818,"text":"\t}"},
  {"line":1820,"text":"\tactual := f.getScriptInfo(f.activeFilename).content"},
  {"line":1821,"text":"\tassert.Equal(t, expectedContent, actual, \"File content after source.fixAll did not match expected content.\")"},
  {"line":1822,"text":"}"},
  {"line":1825,"text":"func (f *FourslashTest) getCodeFixActions(t *testing.T, errorCode ...int) []*lsproto.CodeAction {"},
  {"line":1826,"text":"\tt.Helper()"},
  {"line":1827,"text":"\tall := f.getAllQuickFixActions(t, errorCode...)"},
  {"line":1829,"text":"\tvar actions []*lsproto.CodeAction"},
  {"line":1830,"text":"\tfor _, action := range all {"},
  {"line":1831,"text":"\t\tif action.Diagnostics != nil && len(*action.Diagnostics) > 0 {"},
  {"line":1832,"text":"\t\t\tactions = append(actions, action)"},
  {"line":1833,"text":"\t\t}"},
  {"line":1834,"text":"\t}"},
  {"line":1835,"text":"\treturn actions"},
  {"line":1836,"text":"}"},
  {"line":1839,"text":"func (f *FourslashTest) getAllQuickFixActions(t *testing.T, errorCode ...int) []*lsproto.CodeAction {"},
  {"line":1840,"text":"\tt.Helper()"},
  {"line":1842,"text":"\tdiagParams := &lsproto.DocumentDiagnosticParams{"},
  {"line":1843,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":1844,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":1845,"text":"\t\t},"},
  {"line":1846,"text":"\t}"},
  {"line":1847,"text":"\tdiagResult := sendRequest(t, f, lsproto.TextDocumentDiagnosticInfo, diagParams)"},
  {"line":1849,"text":"\tvar diagnostics []*lsproto.Diagnostic"},
  {"line":1850,"text":"\tif diagResult.FullDocumentDiagnosticReport != nil && diagResult.FullDocumentDiagnosticReport.Items != nil {"},
  {"line":1851,"text":"\t\tdiagnostics = diagResult.FullDocumentDiagnosticReport.Items"},
  {"line":1852,"text":"\t}"},
  {"line":1854,"text":"\tif len(diagnostics) == 0 {"},
  {"line":1855,"text":"\t\treturn nil"},
  {"line":1856,"text":"\t}"},
  {"line":1858,"text":"\tdiagnostic := selectCodeFixDiagnostic(diagnostics, core.FirstOrNil(errorCode))"},
  {"line":1859,"text":"\tif diagnostic == nil {"},
  {"line":1860,"text":"\t\treturn nil"},
  {"line":1861,"text":"\t}"},
  {"line":1863,"text":"\tparams := &lsproto.CodeActionParams{"},
  {"line":1864,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":1865,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":1866,"text":"\t\t},"},
  {"line":1867,"text":"\t\tRange: lsproto.Range{"},
  {"line":1868,"text":"\t\t\tStart: diagnostic.Range.Start,"},
  {"line":1869,"text":"\t\t\tEnd:   diagnostic.Range.End,"},
  {"line":1870,"text":"\t\t},"},
  {"line":1871,"text":"\t\tContext: &lsproto.CodeActionContext{"},
  {"line":1872,"text":"\t\t\tDiagnostics: diagnostics,"},
  {"line":1873,"text":"\t\t},"},
  {"line":1874,"text":"\t}"},
  {"line":1875,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentCodeActionInfo, params)"},
  {"line":1877,"text":"\tvar actions []*lsproto.CodeAction"},
  {"line":1878,"text":"\tif result.CommandOrCodeActionArray != nil {"},
  {"line":1879,"text":"\t\tfor _, item := range *result.CommandOrCodeActionArray {"},
  {"line":1880,"text":"\t\t\tif item.CodeAction != nil && item.CodeAction.Kind != nil && *item.CodeAction.Kind == lsproto.CodeActionKindQuickFix {"},
  {"line":1881,"text":"\t\t\t\tactions = append(actions, item.CodeAction)"},
  {"line":1882,"text":"\t\t\t}"},
  {"line":1883,"text":"\t\t}"},
  {"line":1884,"text":"\t}"},
  {"line":1886,"text":"\treturn actions"},
  {"line":1887,"text":"}"},
  {"line":1889,"text":"func (f *FourslashTest) updateTextRangeForTextEdits(textRange core.TextRange, edits []*lsproto.TextEdit) core.TextRange {"},
  {"line":1890,"text":"\tscript := f.getScriptInfo(f.activeFilename)"},
  {"line":1891,"text":"\tspans := make([]textEditSpan, 0, len(edits))"},
  {"line":1892,"text":"\tfor _, edit := range edits {"},
  {"line":1893,"text":"\t\tspans = append(spans, textEditSpan{"},
  {"line":1894,"text":"\t\t\tstart:  int(f.converters.LineAndCharacterToPosition(script, edit.Range.Start)),"},
  {"line":1895,"text":"\t\t\tend:    int(f.converters.LineAndCharacterToPosition(script, edit.Range.End)),"},
  {"line":1896,"text":"\t\t\tlength: len(edit.NewText),"},
  {"line":1897,"text":"\t\t})"},
  {"line":1898,"text":"\t}"},
  {"line":1899,"text":"\tslices.SortFunc(spans, func(a, b textEditSpan) int {"},
  {"line":1900,"text":"\t\treturn a.start - b.start"},
  {"line":1901,"text":"\t})"},
  {"line":1903,"text":"\tpos := textRange.Pos()"},
  {"line":1904,"text":"\tend := textRange.End()"},
  {"line":1905,"text":"\tfor i, edit := range spans {"},
  {"line":1906,"text":"\t\tpos = updatePositionForTextEdit(pos, edit.start, edit.end, edit.length)"},
  {"line":1907,"text":"\t\tend = updatePositionForTextEdit(end, edit.start, edit.end, edit.length)"},
  {"line":1909,"text":"\t\tdelta := edit.length - (edit.end - edit.start)"},
  {"line":1910,"text":"\t\tfor j := i + 1; j < len(spans); j++ {"},
  {"line":1911,"text":"\t\t\tif spans[j].start >= edit.start {"},
  {"line":1912,"text":"\t\t\t\tspans[j].start += delta"},
  {"line":1913,"text":"\t\t\t\tspans[j].end += delta"},
  {"line":1914,"text":"\t\t\t}"},
  {"line":1915,"text":"\t\t}"},
  {"line":1916,"text":"\t}"},
  {"line":1917,"text":"\treturn core.NewTextRange(pos, end)"},
  {"line":1918,"text":"}"},
  {"line":1921,"text":"func (f *FourslashTest) applyEditsToContent(content string, edits []*lsproto.TextEdit) string {"},
  {"line":1922,"text":"\tscript := f.getScriptInfo(f.activeFilename)"},
  {"line":1923,"text":"\tslices.SortFunc(edits, func(a, b *lsproto.TextEdit) int {"},
  {"line":1924,"text":"\t\taStart := f.converters.LineAndCharacterToPosition(script, a.Range.Start)"},
  {"line":1925,"text":"\t\tbStart := f.converters.LineAndCharacterToPosition(script, b.Range.Start)"},
  {"line":1926,"text":"\t\treturn int(aStart) - int(bStart)"},
  {"line":1927,"text":"\t})"},
  {"line":1928,"text":"\tfor i := len(edits) - 1; i >= 0; i-- {"},
  {"line":1929,"text":"\t\tedit := edits[i]"},
  {"line":1930,"text":"\t\tstart := int(f.converters.LineAndCharacterToPosition(script, edit.Range.Start))"},
  {"line":1931,"text":"\t\tend := int(f.converters.LineAndCharacterToPosition(script, edit.Range.End))"},
  {"line":1932,"text":"\t\tcontent = content[:start] + edit.NewText + content[end:]"},
  {"line":1933,"text":"\t}"},
  {"line":1934,"text":"\treturn content"},
  {"line":1935,"text":"}"},
  {"line":1937,"text":"func (f *FourslashTest) VerifyOrganizeImports(t *testing.T, expectedContent string, codeActionKind lsproto.CodeActionKind, preferences *lsutil.UserPreferences) {"},
  {"line":1938,"text":"\tt.Helper()"},
  {"line":1940,"text":"\tif preferences != nil {"},
  {"line":1941,"text":"\t\treset := f.ConfigureWithReset(t, *preferences)"},
  {"line":1942,"text":"\t\tdefer reset()"},
  {"line":1943,"text":"\t}"},
  {"line":1945,"text":"\tparams := &lsproto.CodeActionParams{"},
  {"line":1946,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":1947,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":1948,"text":"\t\t},"},
  {"line":1949,"text":"\t\tRange: lsproto.Range{"},
  {"line":1950,"text":"\t\t\tStart: lsproto.Position{Line: 0, Character: 0},"},
  {"line":1951,"text":"\t\t\tEnd:   f.converters.PositionToLineAndCharacter(f.getScriptInfo(f.activeFilename), core.TextPos(len(f.getScriptInfo(f.activeFilename).content))),"},
  {"line":1952,"text":"\t\t},"},
  {"line":1953,"text":"\t\tContext: &lsproto.CodeActionContext{"},
  {"line":1954,"text":"\t\t\tOnly: &[]lsproto.CodeActionKind{codeActionKind},"},
  {"line":1955,"text":"\t\t},"},
  {"line":1956,"text":"\t}"},
  {"line":1958,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentCodeActionInfo, params)"},
  {"line":1960,"text":"\tif result.CommandOrCodeActionArray == nil || len(*result.CommandOrCodeActionArray) == 0 {"},
  {"line":1961,"text":"\t\tt.Fatalf(\"No organize imports code action found\")"},
  {"line":1962,"text":"\t}"},
  {"line":1964,"text":"\tvar organizeAction *lsproto.CodeAction"},
  {"line":1965,"text":"\tfor _, item := range *result.CommandOrCodeActionArray {"},
  {"line":1966,"text":"\t\tif item.CodeAction != nil && item.CodeAction.Kind != nil && *item.CodeAction.Kind == codeActionKind {"},
  {"line":1967,"text":"\t\t\torganizeAction = item.CodeAction"},
  {"line":1968,"text":"\t\t\tbreak"},
  {"line":1969,"text":"\t\t}"},
  {"line":1970,"text":"\t}"},
  {"line":1972,"text":"\tif organizeAction == nil {"},
  {"line":1973,"text":"\t\tt.Fatalf(\"No organize imports code action found\")"},
  {"line":1974,"text":"\t}"},
  {"line":1976,"text":"\texpectedURI := lsconv.FileNameToDocumentURI(f.activeFilename)"},
  {"line":1977,"text":"\tif organizeAction.Edit != nil && organizeAction.Edit.Changes != nil {"},
  {"line":1978,"text":"\t\tfor uri, edits := range *organizeAction.Edit.Changes {"},
  {"line":1979,"text":"\t\t\tif uri != expectedURI {"},
  {"line":1980,"text":"\t\t\t\tt.Fatalf(\"Organize imports changed unexpected file: %s (expected %s)\", uri, expectedURI)"},
  {"line":1981,"text":"\t\t\t}"},
  {"line":1982,"text":"\t\t\tf.applyTextEdits(t, edits)"},
  {"line":1983,"text":"\t\t}"},
  {"line":1984,"text":"\t}"},
  {"line":1986,"text":"\tactualContent := f.getScriptInfo(f.activeFilename).content"},
  {"line":1987,"text":"\tif actualContent != expectedContent {"},
  {"line":1988,"text":"\t\tt.Fatalf(\"Organize imports result doesn't match.\\nExpected:\\n%s\\n\\nActual:\\n%s\", expectedContent, actualContent)"},
  {"line":1989,"text":"\t}"},
  {"line":1990,"text":"}"},
  {"line":1992,"text":"type ApplyCodeActionFromCompletionOptions struct {"},
  {"line":1993,"text":"\tName            string"},
  {"line":1994,"text":"\tSource          string"},
  {"line":1995,"text":"\tAutoImportFix   *lsproto.AutoImportFix"},
  {"line":1996,"text":"\tDescription     string"},
  {"line":1997,"text":"\tNewFileContent  *string"},
  {"line":1998,"text":"\tNewRangeContent *string"},
  {"line":1999,"text":"\tUserPreferences *lsutil.UserPreferences"},
  {"line":2000,"text":"}"},
  {"line":2002,"text":"func (f *FourslashTest) VerifyApplyCodeActionFromCompletion(t *testing.T, markerName *string, options *ApplyCodeActionFromCompletionOptions) {"},
  {"line":2003,"text":"\tt.Helper()"},
  {"line":2004,"text":"\tf.GoToMarker(t, *markerName)"},
  {"line":2005,"text":"\tvar userPreferences *lsutil.UserPreferences"},
  {"line":2006,"text":"\tif options != nil && options.UserPreferences != nil {"},
  {"line":2007,"text":"\t\tuserPreferences = options.UserPreferences"},
  {"line":2008,"text":"\t} else {"},
  {"line":2010,"text":"\t\tuserPreferences = new(lsutil.NewDefaultUserPreferences())"},
  {"line":2011,"text":"\t}"},
  {"line":2013,"text":"\treset := f.ConfigureWithReset(t, *userPreferences)"},
  {"line":2014,"text":"\tdefer reset()"},
  {"line":2015,"text":"\tcompletionsList := f.getCompletions(t, nil) // Already configured, so we do not need to pass it in again"},
  {"line":2016,"text":"\titems := core.Filter(completionsList.Items, func(item *lsproto.CompletionItem) bool {"},
  {"line":2017,"text":"\t\tif item.Label != options.Name || item.Data == nil {"},
  {"line":2018,"text":"\t\t\treturn false"},
  {"line":2019,"text":"\t\t}"},
  {"line":2021,"text":"\t\tdata := item.Data"},
  {"line":2022,"text":"\t\tif options.AutoImportFix != nil {"},
  {"line":2023,"text":"\t\t\treturn data.AutoImport != nil &&"},
  {"line":2024,"text":"\t\t\t\t(options.AutoImportFix.ModuleSpecifier == \"\" || data.AutoImport.ModuleSpecifier == options.AutoImportFix.ModuleSpecifier)"},
  {"line":2025,"text":"\t\t}"},
  {"line":2026,"text":"\t\tif data.AutoImport == nil && data.Source != \"\" && data.Source == options.Source {"},
  {"line":2027,"text":"\t\t\treturn true"},
  {"line":2028,"text":"\t\t}"},
  {"line":2029,"text":"\t\tif data.AutoImport != nil && data.AutoImport.ModuleSpecifier == options.Source {"},
  {"line":2030,"text":"\t\t\treturn true"},
  {"line":2031,"text":"\t\t}"},
  {"line":2032,"text":"\t\treturn false"},
  {"line":2033,"text":"\t})"},
  {"line":2035,"text":"\tif len(items) == 0 {"},
  {"line":2036,"text":"\t\tt.Fatalf(\"Code action '%s' from source '%s' not found in completions.\", options.Name, options.Source)"},
  {"line":2037,"text":"\t}"},
  {"line":2039,"text":"\tvar correctResolvedItem lsproto.CompletionItem"},
  {"line":2040,"text":"\tcorrectItem := core.Find(items, func(item *lsproto.CompletionItem) bool {"},
  {"line":2041,"text":"\t\tcorrectResolvedItem = *f.resolveCompletionItem(t, item)"},
  {"line":2042,"text":"\t\tvar actualDetail string"},
  {"line":2043,"text":"\t\tif correctResolvedItem.Detail != nil {"},
  {"line":2044,"text":"\t\t\tactualDetail = *correctResolvedItem.Detail"},
  {"line":2045,"text":"\t\t}"},
  {"line":2046,"text":"\t\tif !strings.Contains(actualDetail, options.Description) || correctResolvedItem.AdditionalTextEdits == nil {"},
  {"line":2047,"text":"\t\t\treturn false"},
  {"line":2048,"text":"\t\t}"},
  {"line":2049,"text":"\t\treturn true"},
  {"line":2050,"text":"\t})"},
  {"line":2052,"text":"\tif correctItem == nil {"},
  {"line":2053,"text":"\t\tt.Fatalf(\"No matching code action found for '%s' from source '%s'.\", options.Name, options.Source)"},
  {"line":2054,"text":"\t\tvar actualDetail string"},
  {"line":2055,"text":"\t\tif correctResolvedItem.Detail != nil {"},
  {"line":2056,"text":"\t\t\tactualDetail = *correctResolvedItem.Detail"},
  {"line":2057,"text":"\t\t}"},
  {"line":2058,"text":"\t\tassert.Check(t, strings.Contains(actualDetail, options.Description), \"Completion item detail does not contain expected description.\")"},
  {"line":2059,"text":"\t\tif correctResolvedItem.AdditionalTextEdits == nil {"},
  {"line":2060,"text":"\t\t\tt.Fatalf(\"Expected non-nil AdditionalTextEdits for code action completion item.\")"},
  {"line":2061,"text":"\t\t}"},
  {"line":2062,"text":"\t}"},
  {"line":2065,"text":"\tf.applyTextEdits(t, *correctResolvedItem.AdditionalTextEdits)"},
  {"line":2066,"text":"\tif options.NewFileContent != nil {"},
  {"line":2067,"text":"\t\tassert.Equal(t, f.getScriptInfo(f.activeFilename).content, *options.NewFileContent, \"File content after applying code action did not match expected content.\")"},
  {"line":2068,"text":"\t} else if options.NewRangeContent != nil {"},
  {"line":2069,"text":"\t\tt.Fatal(\"!!! TODO\")"},
  {"line":2070,"text":"\t}"},
  {"line":2071,"text":"}"},
  {"line":2073,"text":"func (f *FourslashTest) VerifyImportFixAtPosition(t *testing.T, expectedTexts []string, preferences *lsutil.UserPreferences) {"},
  {"line":2074,"text":"\tt.Helper()"},
  {"line":2075,"text":"\tfileName := f.activeFilename"},
  {"line":2076,"text":"\tranges := f.Ranges()"},
  {"line":2077,"text":"\tvar filteredRanges []*RangeMarker"},
  {"line":2078,"text":"\tfor _, r := range ranges {"},
  {"line":2079,"text":"\t\tif r.FileName() == fileName {"},
  {"line":2080,"text":"\t\t\tfilteredRanges = append(filteredRanges, r)"},
  {"line":2081,"text":"\t\t}"},
  {"line":2082,"text":"\t}"},
  {"line":2083,"text":"\tif len(filteredRanges) > 1 {"},
  {"line":2084,"text":"\t\tt.Fatalf(\"Exactly one range should be specified in the testfile.\")"},
  {"line":2085,"text":"\t}"},
  {"line":2086,"text":"\tvar rangeMarker *RangeMarker"},
  {"line":2087,"text":"\tif len(filteredRanges) == 1 {"},
  {"line":2088,"text":"\t\trangeMarker = filteredRanges[0]"},
  {"line":2089,"text":"\t}"},
  {"line":2091,"text":"\tif preferences != nil {"},
  {"line":2092,"text":"\t\treset := f.ConfigureWithReset(t, *preferences)"},
  {"line":2093,"text":"\t\tdefer reset()"},
  {"line":2094,"text":"\t}"},
  {"line":2097,"text":"\tdiagParams := &lsproto.DocumentDiagnosticParams{"},
  {"line":2098,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2099,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":2100,"text":"\t\t},"},
  {"line":2101,"text":"\t}"},
  {"line":2102,"text":"\tdiagResult := sendRequest(t, f, lsproto.TextDocumentDiagnosticInfo, diagParams)"},
  {"line":2104,"text":"\tvar diagnostics []*lsproto.Diagnostic"},
  {"line":2105,"text":"\tif diagResult.FullDocumentDiagnosticReport != nil && diagResult.FullDocumentDiagnosticReport.Items != nil {"},
  {"line":2106,"text":"\t\tdiagnostics = diagResult.FullDocumentDiagnosticReport.Items"},
  {"line":2107,"text":"\t}"},
  {"line":2109,"text":"\tcurrentCaretPosition := f.currentCaretPosition"},
  {"line":2110,"text":"\tparams := &lsproto.CodeActionParams{"},
  {"line":2111,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2112,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":2113,"text":"\t\t},"},
  {"line":2114,"text":"\t\tRange: lsproto.Range{"},
  {"line":2115,"text":"\t\t\tEnd:   currentCaretPosition,"},
  {"line":2116,"text":"\t\t\tStart: currentCaretPosition,"},
  {"line":2117,"text":"\t\t},"},
  {"line":2118,"text":"\t\tContext: &lsproto.CodeActionContext{"},
  {"line":2119,"text":"\t\t\tDiagnostics: diagnostics,"},
  {"line":2120,"text":"\t\t},"},
  {"line":2121,"text":"\t}"},
  {"line":2122,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentCodeActionInfo, params)"},
  {"line":2126,"text":"\tvar importActions []*lsproto.CodeAction"},
  {"line":2127,"text":"\tif result.CommandOrCodeActionArray != nil {"},
  {"line":2128,"text":"\t\tfor _, item := range *result.CommandOrCodeActionArray {"},
  {"line":2129,"text":"\t\t\tif item.CodeAction != nil && item.CodeAction.Kind != nil && *item.CodeAction.Kind == lsproto.CodeActionKindQuickFix {"},
  {"line":2130,"text":"\t\t\t\tif item.CodeAction.Diagnostics != nil && len(*item.CodeAction.Diagnostics) > 0 {"},
  {"line":2131,"text":"\t\t\t\t\timportActions = append(importActions, item.CodeAction)"},
  {"line":2132,"text":"\t\t\t\t}"},
  {"line":2133,"text":"\t\t\t}"},
  {"line":2134,"text":"\t\t}"},
  {"line":2135,"text":"\t}"},
  {"line":2137,"text":"\tif len(importActions) == 0 {"},
  {"line":2138,"text":"\t\tif len(expectedTexts) != 0 {"},
  {"line":2139,"text":"\t\t\tt.Fatalf(\"No codefixes returned.\")"},
  {"line":2140,"text":"\t\t}"},
  {"line":2141,"text":"\t\treturn"},
  {"line":2142,"text":"\t}"},
  {"line":2145,"text":"\tscript := f.getScriptInfo(f.activeFilename)"},
  {"line":2146,"text":"\toriginalContent := script.content"},
  {"line":2148,"text":"\tactualTextArray := make([]string, 0, len(importActions))"},
  {"line":2149,"text":"\tfor _, action := range importActions {"},
  {"line":2151,"text":"\t\tif action.Edit != nil && action.Edit.Changes != nil {"},
  {"line":2152,"text":"\t\t\tif len(*action.Edit.Changes) != 1 {"},
  {"line":2153,"text":"\t\t\t\tt.Fatalf(\"Expected exactly 1 change, got %d\", len(*action.Edit.Changes))"},
  {"line":2154,"text":"\t\t\t}"},
  {"line":2155,"text":"\t\t\tfor uri, changeEdits := range *action.Edit.Changes {"},
  {"line":2156,"text":"\t\t\t\tif uri != lsconv.FileNameToDocumentURI(f.activeFilename) {"},
  {"line":2157,"text":"\t\t\t\t\tt.Fatalf(\"Expected change to file %s, got %s\", f.activeFilename, uri)"},
  {"line":2158,"text":"\t\t\t\t}"},
  {"line":2159,"text":"\t\t\t\tf.applyTextEdits(t, changeEdits)"},
  {"line":2160,"text":"\t\t\t}"},
  {"line":2161,"text":"\t\t}"},
  {"line":2164,"text":"\t\tvar text string"},
  {"line":2165,"text":"\t\tif rangeMarker != nil {"},
  {"line":2166,"text":"\t\t\ttext = f.getRangeText(rangeMarker)"},
  {"line":2167,"text":"\t\t} else {"},
  {"line":2168,"text":"\t\t\ttext = f.getScriptInfo(f.activeFilename).content"},
  {"line":2169,"text":"\t\t}"},
  {"line":2170,"text":"\t\tactualTextArray = append(actualTextArray, text)"},
  {"line":2173,"text":"\t\tf.editScriptAndUpdateMarkers(t, f.activeFilename, 0, len(script.content), originalContent)"},
  {"line":2174,"text":"\t\tf.currentCaretPosition = currentCaretPosition"},
  {"line":2175,"text":"\t}"},
  {"line":2178,"text":"\tif len(expectedTexts) != len(actualTextArray) {"},
  {"line":2179,"text":"\t\tvar actualJoined strings.Builder"},
  {"line":2180,"text":"\t\tfor i, actual := range actualTextArray {"},
  {"line":2181,"text":"\t\t\tif i > 0 {"},
  {"line":2182,"text":"\t\t\t\tactualJoined.WriteString(\"\\n\\n\")"},
  {"line":2183,"text":"\t\t\t\tactualJoined.WriteString(strings.Repeat(\"-\", 20))"},
  {"line":2184,"text":"\t\t\t\tactualJoined.WriteString(\"\\n\\n\")"},
  {"line":2185,"text":"\t\t\t}"},
  {"line":2186,"text":"\t\t\tactualJoined.WriteString(actual)"},
  {"line":2187,"text":"\t\t}"},
  {"line":2188,"text":"\t\tt.Fatalf(\"Expected %d import fixes, got %d:\\n\\n%s\", len(expectedTexts), len(actualTextArray), actualJoined.String())"},
  {"line":2189,"text":"\t}"},
  {"line":2190,"text":"\tfor i, expected := range expectedTexts {"},
  {"line":2191,"text":"\t\tactual := actualTextArray[i]"},
  {"line":2192,"text":"\t\tassert.Equal(t, expected, actual, fmt.Sprintf(\"Import fix at index %d doesn't match.\\n\", i))"},
  {"line":2193,"text":"\t}"},
  {"line":2194,"text":"}"},
  {"line":2196,"text":"func (f *FourslashTest) VerifyImportFixModuleSpecifiers("},
  {"line":2197,"text":"\tt *testing.T,"},
  {"line":2198,"text":"\tmarkerName string,"},
  {"line":2199,"text":"\texpectedModuleSpecifiers []string,"},
  {"line":2200,"text":"\tpreferences *lsutil.UserPreferences,"},
  {"line":2201,"text":") {"},
  {"line":2202,"text":"\tt.Helper()"},
  {"line":2203,"text":"\tf.GoToMarker(t, markerName)"},
  {"line":2205,"text":"\tif preferences != nil {"},
  {"line":2206,"text":"\t\treset := f.ConfigureWithReset(t, *preferences)"},
  {"line":2207,"text":"\t\tdefer reset()"},
  {"line":2208,"text":"\t}"},
  {"line":2211,"text":"\tdiagParams := &lsproto.DocumentDiagnosticParams{"},
  {"line":2212,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2213,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":2214,"text":"\t\t},"},
  {"line":2215,"text":"\t}"},
  {"line":2216,"text":"\tdiagResult := sendRequest(t, f, lsproto.TextDocumentDiagnosticInfo, diagParams)"},
  {"line":2218,"text":"\tvar diagnostics []*lsproto.Diagnostic"},
  {"line":2219,"text":"\tif diagResult.FullDocumentDiagnosticReport != nil && diagResult.FullDocumentDiagnosticReport.Items != nil {"},
  {"line":2220,"text":"\t\tdiagnostics = diagResult.FullDocumentDiagnosticReport.Items"},
  {"line":2221,"text":"\t}"},
  {"line":2223,"text":"\tparams := &lsproto.CodeActionParams{"},
  {"line":2224,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2225,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":2226,"text":"\t\t},"},
  {"line":2227,"text":"\t\tRange: lsproto.Range{"},
  {"line":2228,"text":"\t\t\tStart: f.currentCaretPosition,"},
  {"line":2229,"text":"\t\t\tEnd:   f.currentCaretPosition,"},
  {"line":2230,"text":"\t\t},"},
  {"line":2231,"text":"\t\tContext: &lsproto.CodeActionContext{"},
  {"line":2232,"text":"\t\t\tDiagnostics: diagnostics,"},
  {"line":2233,"text":"\t\t},"},
  {"line":2234,"text":"\t}"},
  {"line":2235,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentCodeActionInfo, params)"},
  {"line":2238,"text":"\tvar actualModuleSpecifiers []string"},
  {"line":2239,"text":"\tif result.CommandOrCodeActionArray != nil {"},
  {"line":2240,"text":"\t\tfor _, item := range *result.CommandOrCodeActionArray {"},
  {"line":2241,"text":"\t\t\tif item.CodeAction != nil && item.CodeAction.Kind != nil && *item.CodeAction.Kind == lsproto.CodeActionKindQuickFix {"},
  {"line":2242,"text":"\t\t\t\tif item.CodeAction.Edit != nil && item.CodeAction.Edit.Changes != nil {"},
  {"line":2243,"text":"\t\t\t\t\tfor _, changeEdits := range *item.CodeAction.Edit.Changes {"},
  {"line":2244,"text":"\t\t\t\t\t\tfor _, edit := range changeEdits {"},
  {"line":2245,"text":"\t\t\t\t\t\t\tmoduleSpec := extractModuleSpecifier(edit.NewText)"},
  {"line":2246,"text":"\t\t\t\t\t\t\tif moduleSpec != \"\" {"},
  {"line":2247,"text":"\t\t\t\t\t\t\t\tif !slices.Contains(actualModuleSpecifiers, moduleSpec) {"},
  {"line":2248,"text":"\t\t\t\t\t\t\t\t\tactualModuleSpecifiers = append(actualModuleSpecifiers, moduleSpec)"},
  {"line":2249,"text":"\t\t\t\t\t\t\t\t}"},
  {"line":2250,"text":"\t\t\t\t\t\t\t}"},
  {"line":2251,"text":"\t\t\t\t\t\t}"},
  {"line":2252,"text":"\t\t\t\t\t}"},
  {"line":2253,"text":"\t\t\t\t}"},
  {"line":2254,"text":"\t\t\t}"},
  {"line":2255,"text":"\t\t}"},
  {"line":2256,"text":"\t}"},
  {"line":2259,"text":"\tif len(actualModuleSpecifiers) != len(expectedModuleSpecifiers) {"},
  {"line":2260,"text":"\t\tt.Fatalf(\"Expected %d module specifiers, got %d.\\nExpected: %v\\nActual: %v\","},
  {"line":2261,"text":"\t\t\tlen(expectedModuleSpecifiers), len(actualModuleSpecifiers),"},
  {"line":2262,"text":"\t\t\texpectedModuleSpecifiers, actualModuleSpecifiers)"},
  {"line":2263,"text":"\t}"},
  {"line":2265,"text":"\tfor i, expected := range expectedModuleSpecifiers {"},
  {"line":2266,"text":"\t\tif i >= len(actualModuleSpecifiers) || actualModuleSpecifiers[i] != expected {"},
  {"line":2267,"text":"\t\t\tt.Fatalf(\"Module specifier mismatch at index %d.\\nExpected: %v\\nActual: %v\","},
  {"line":2268,"text":"\t\t\t\ti, expectedModuleSpecifiers, actualModuleSpecifiers)"},
  {"line":2269,"text":"\t\t}"},
  {"line":2270,"text":"\t}"},
  {"line":2271,"text":"}"},
  {"line":2273,"text":"func extractModuleSpecifier(text string) string {"},
  {"line":2275,"text":"\tif idx := strings.Index(text, \"from \\\"\"); idx != -1 {"},
  {"line":2276,"text":"\t\tstart := idx + 6 // len(\"from \\\"\")"},
  {"line":2277,"text":"\t\tif end := strings.Index(text[start:], \"\\\"\"); end != -1 {"},
  {"line":2278,"text":"\t\t\treturn text[start : start+end]"},
  {"line":2279,"text":"\t\t}"},
  {"line":2280,"text":"\t}"},
  {"line":2281,"text":"\tif idx := strings.Index(text, \"from '\"); idx != -1 {"},
  {"line":2282,"text":"\t\tstart := idx + 6 // len(\"from '\")"},
  {"line":2283,"text":"\t\tif end := strings.Index(text[start:], \"'\"); end != -1 {"},
  {"line":2284,"text":"\t\t\treturn text[start : start+end]"},
  {"line":2285,"text":"\t\t}"},
  {"line":2286,"text":"\t}"},
  {"line":2289,"text":"\tif idx := strings.Index(text, \"require(\\\"\"); idx != -1 {"},
  {"line":2290,"text":"\t\tstart := idx + 9 // len(\"require(\\\"\")"},
  {"line":2291,"text":"\t\tif end := strings.Index(text[start:], \"\\\"\"); end != -1 {"},
  {"line":2292,"text":"\t\t\treturn text[start : start+end]"},
  {"line":2293,"text":"\t\t}"},
  {"line":2294,"text":"\t}"},
  {"line":2295,"text":"\tif idx := strings.Index(text, \"require('\"); idx != -1 {"},
  {"line":2296,"text":"\t\tstart := idx + 9 // len(\"require('\")"},
  {"line":2297,"text":"\t\tif end := strings.Index(text[start:], \"'\"); end != -1 {"},
  {"line":2298,"text":"\t\t\treturn text[start : start+end]"},
  {"line":2299,"text":"\t\t}"},
  {"line":2300,"text":"\t}"},
  {"line":2302,"text":"\treturn \"\""},
  {"line":2303,"text":"}"},
  {"line":2305,"text":"func (f *FourslashTest) VerifyBaselineFindAllReferences("},
  {"line":2306,"text":"\tt *testing.T,"},
  {"line":2307,"text":"\tmarkers ...string,"},
  {"line":2308,"text":") {"},
  {"line":2309,"text":"\treferenceLocations := f.lookupMarkersOrGetRanges(t, markers)"},
  {"line":2311,"text":"\tfor _, markerOrRange := range referenceLocations {"},
  {"line":2313,"text":"\t\tf.GoToMarkerOrRange(t, markerOrRange)"},
  {"line":2315,"text":"\t\tparams := &lsproto.ReferenceParams{"},
  {"line":2316,"text":"\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2317,"text":"\t\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":2318,"text":"\t\t\t},"},
  {"line":2319,"text":"\t\t\tPosition: f.currentCaretPosition,"},
  {"line":2320,"text":"\t\t\tContext: &lsproto.ReferenceContext{"},
  {"line":2321,"text":"\t\t\t\tIncludeDeclaration: true,"},
  {"line":2322,"text":"\t\t\t},"},
  {"line":2323,"text":"\t\t}"},
  {"line":2324,"text":"\t\tresult := sendRequest(t, f, lsproto.TextDocumentReferencesInfo, params)"},
  {"line":2325,"text":"\t\tf.addResultToBaseline(t, findAllReferencesCmd, f.getBaselineForLocationsWithFileContents(*result.Locations, baselineFourslashLocationsOptions{"},
  {"line":2326,"text":"\t\t\tmarker:     markerOrRange,"},
  {"line":2327,"text":"\t\t\tmarkerName: \"/*FIND ALL REFS*/\","},
  {"line":2328,"text":"\t\t}))"},
  {"line":2330,"text":"\t}"},
  {"line":2331,"text":"}"},
  {"line":2333,"text":"func (f *FourslashTest) VerifyBaselineCodeLens(t *testing.T, preferences *lsutil.UserPreferences) {"},
  {"line":2334,"text":"\tif preferences != nil {"},
  {"line":2335,"text":"\t\treset := f.ConfigureWithReset(t, *preferences)"},
  {"line":2336,"text":"\t\tdefer reset()"},
  {"line":2337,"text":"\t}"},
  {"line":2339,"text":"\tfoundAtLeastOneCodeLens := false"},
  {"line":2340,"text":"\tfor _, openFile := range slices.Sorted(maps.Keys(f.openFiles)) {"},
  {"line":2341,"text":"\t\tparams := &lsproto.CodeLensParams{"},
  {"line":2342,"text":"\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2343,"text":"\t\t\t\tUri: lsconv.FileNameToDocumentURI(openFile),"},
  {"line":2344,"text":"\t\t\t},"},
  {"line":2345,"text":"\t\t}"},
  {"line":2347,"text":"\t\tunresolvedCodeLensList := sendRequest(t, f, lsproto.TextDocumentCodeLensInfo, params)"},
  {"line":2348,"text":"\t\tif unresolvedCodeLensList.CodeLenses == nil || len(*unresolvedCodeLensList.CodeLenses) == 0 {"},
  {"line":2349,"text":"\t\t\tcontinue"},
  {"line":2350,"text":"\t\t}"},
  {"line":2351,"text":"\t\tfoundAtLeastOneCodeLens = true"},
  {"line":2353,"text":"\t\tfor _, unresolvedCodeLens := range *unresolvedCodeLensList.CodeLenses {"},
  {"line":2354,"text":"\t\t\tassert.Assert(t, unresolvedCodeLens != nil)"},
  {"line":2355,"text":"\t\t\tresolvedCodeLens := sendRequest(t, f, lsproto.CodeLensResolveInfo, unresolvedCodeLens)"},
  {"line":2356,"text":"\t\t\tassert.Assert(t, resolvedCodeLens != nil)"},
  {"line":2357,"text":"\t\t\tassert.Assert(t, resolvedCodeLens.Command != nil, \"Expected resolved code lens to have a command.\")"},
  {"line":2358,"text":"\t\t\tif len(resolvedCodeLens.Command.Command) > 0 {"},
  {"line":2359,"text":"\t\t\t\tassert.Equal(t, resolvedCodeLens.Command.Command, showCodeLensLocationsCommandName)"},
  {"line":2360,"text":"\t\t\t}"},
  {"line":2362,"text":"\t\t\tvar locations []lsproto.Location"},
  {"line":2364,"text":"\t\t\tif commandArgs := resolvedCodeLens.Command.Arguments; commandArgs != nil {"},
  {"line":2365,"text":"\t\t\t\tlocs, err := roundtripThroughJson[[]lsproto.Location]((*commandArgs)[2])"},
  {"line":2366,"text":"\t\t\t\tif err != nil {"},
  {"line":2367,"text":"\t\t\t\t\tt.Fatalf(\"failed to re-encode code lens locations: %v\", err)"},
  {"line":2368,"text":"\t\t\t\t}"},
  {"line":2369,"text":"\t\t\t\tlocations = locs"},
  {"line":2370,"text":"\t\t\t}"},
  {"line":2372,"text":"\t\t\tf.addResultToBaseline(t, codeLensesCmd, f.getBaselineForLocationsWithFileContents(locations, baselineFourslashLocationsOptions{"},
  {"line":2373,"text":"\t\t\t\tmarker: &RangeMarker{"},
  {"line":2374,"text":"\t\t\t\t\tfileName: openFile,"},
  {"line":2375,"text":"\t\t\t\t\tLSRange:  resolvedCodeLens.Range,"},
  {"line":2376,"text":"\t\t\t\t\tRange:    f.converters.FromLSPRange(f.getScriptInfo(openFile), resolvedCodeLens.Range),"},
  {"line":2377,"text":"\t\t\t\t},"},
  {"line":2378,"text":"\t\t\t\tmarkerName: \"/*CODELENS: \" + resolvedCodeLens.Command.Title + \"*/\","},
  {"line":2379,"text":"\t\t\t}))"},
  {"line":2380,"text":"\t\t}"},
  {"line":2381,"text":"\t}"},
  {"line":2383,"text":"\tif !foundAtLeastOneCodeLens {"},
  {"line":2384,"text":"\t\tt.Fatalf(\"Expected at least one code lens in any open file, but got none.\")"},
  {"line":2385,"text":"\t}"},
  {"line":2386,"text":"}"},
  {"line":2388,"text":"func (f *FourslashTest) MarkTestAsStradaServer() {"},
  {"line":2389,"text":"\tf.isStradaServer = true"},
  {"line":2390,"text":"}"},
  {"line":2392,"text":"func (f *FourslashTest) VerifyBaselineGoToDefinition("},
  {"line":2393,"text":"\tt *testing.T,"},
  {"line":2394,"text":"\tincludeOriginalSelectionRange bool,"},
  {"line":2395,"text":"\tmarkers ...string,"},
  {"line":2396,"text":") {"},
  {"line":2397,"text":"\tf.verifyBaselineDefinitions("},
  {"line":2398,"text":"\t\tt,"},
  {"line":2399,"text":"\t\tgoToDefinitionCmd,"},
  {"line":2400,"text":"\t\t\"/*GOTO DEF*/\", /*definitionMarker*/"},
  {"line":2401,"text":"\t\tfunc(t *testing.T, f *FourslashTest, fileName string, position lsproto.Position) lsproto.LocationOrLocationsOrDefinitionLinksOrNull {"},
  {"line":2402,"text":"\t\t\tparams := &lsproto.DefinitionParams{"},
  {"line":2403,"text":"\t\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2404,"text":"\t\t\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":2405,"text":"\t\t\t\t},"},
  {"line":2406,"text":"\t\t\t\tPosition: f.currentCaretPosition,"},
  {"line":2407,"text":"\t\t\t}"},
  {"line":2409,"text":"\t\t\treturn sendRequest(t, f, lsproto.TextDocumentDefinitionInfo, params)"},
  {"line":2410,"text":"\t\t},"},
  {"line":2411,"text":"\t\tincludeOriginalSelectionRange,"},
  {"line":2412,"text":"\t\tmarkers...,"},
  {"line":2413,"text":"\t)"},
  {"line":2414,"text":"}"},
  {"line":2416,"text":"func (f *FourslashTest) verifyBaselineDefinitions("},
  {"line":2417,"text":"\tt *testing.T,"},
  {"line":2418,"text":"\tdefinitionCommand baselineCommand,"},
  {"line":2419,"text":"\tdefinitionMarker string,"},
  {"line":2420,"text":"\tgetDefinitions func(t *testing.T, f *FourslashTest, fileName string, position lsproto.Position) lsproto.LocationOrLocationsOrDefinitionLinksOrNull,"},
  {"line":2421,"text":"\tincludeOriginalSelectionRange bool,"},
  {"line":2422,"text":"\tmarkers ...string,"},
  {"line":2423,"text":") {"},
  {"line":2424,"text":"\treferenceLocations := f.lookupMarkersOrGetRanges(t, markers)"},
  {"line":2426,"text":"\tfor _, markerOrRange := range referenceLocations {"},
  {"line":2428,"text":"\t\tf.GoToMarkerOrRange(t, markerOrRange)"},
  {"line":2430,"text":"\t\tresult := getDefinitions(t, f, f.activeFilename, f.currentCaretPosition)"},
  {"line":2432,"text":"\t\tvar resultAsSpans []documentSpan"},
  {"line":2433,"text":"\t\tvar additionalSpan *documentSpan"},
  {"line":2434,"text":"\t\tif result.Locations != nil {"},
  {"line":2435,"text":"\t\t\tresultAsSpans = core.Map(*result.Locations, locationToSpan)"},
  {"line":2436,"text":"\t\t} else if result.Location != nil {"},
  {"line":2437,"text":"\t\t\tresultAsSpans = []documentSpan{locationToSpan(*result.Location)}"},
  {"line":2438,"text":"\t\t} else if result.DefinitionLinks != nil {"},
  {"line":2439,"text":"\t\t\tvar originRange *lsproto.Range"},
  {"line":2440,"text":"\t\t\tresultAsSpans = core.Map(*result.DefinitionLinks, func(link *lsproto.LocationLink) documentSpan {"},
  {"line":2441,"text":"\t\t\t\tif originRange != nil && originRange != link.OriginSelectionRange {"},
  {"line":2442,"text":"\t\t\t\t\tpanic(\"multiple different origin ranges in definition links\")"},
  {"line":2443,"text":"\t\t\t\t}"},
  {"line":2444,"text":"\t\t\t\toriginRange = link.OriginSelectionRange"},
  {"line":2445,"text":"\t\t\t\tvar contextSpan *lsproto.Range"},
  {"line":2446,"text":"\t\t\t\tif link.TargetRange != link.TargetSelectionRange && !f.isStradaServer {"},
  {"line":2447,"text":"\t\t\t\t\tcontextSpan = &link.TargetRange"},
  {"line":2448,"text":"\t\t\t\t}"},
  {"line":2449,"text":"\t\t\t\treturn documentSpan{"},
  {"line":2450,"text":"\t\t\t\t\turi:         link.TargetUri,"},
  {"line":2451,"text":"\t\t\t\t\ttextSpan:    link.TargetSelectionRange,"},
  {"line":2452,"text":"\t\t\t\t\tcontextSpan: contextSpan,"},
  {"line":2453,"text":"\t\t\t\t}"},
  {"line":2454,"text":"\t\t\t})"},
  {"line":2455,"text":"\t\t\tif originRange != nil && includeOriginalSelectionRange {"},
  {"line":2456,"text":"\t\t\t\tadditionalSpan = &documentSpan{"},
  {"line":2457,"text":"\t\t\t\t\turi:      lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":2458,"text":"\t\t\t\t\ttextSpan: *originRange,"},
  {"line":2459,"text":"\t\t\t\t}"},
  {"line":2460,"text":"\t\t\t}"},
  {"line":2461,"text":"\t\t}"},
  {"line":2463,"text":"\t\tf.addResultToBaseline(t, definitionCommand, f.getBaselineForSpansWithFileContents(resultAsSpans, baselineFourslashLocationsOptions{"},
  {"line":2464,"text":"\t\t\tmarker:              markerOrRange,"},
  {"line":2465,"text":"\t\t\tmarkerName:          definitionMarker,"},
  {"line":2466,"text":"\t\t\tadditionalSpan:      additionalSpan,"},
  {"line":2467,"text":"\t\t\tpreserveResultOrder: definitionCommand == goToSourceDefinitionCmd,"},
  {"line":2468,"text":"\t\t}))"},
  {"line":2469,"text":"\t}"},
  {"line":2470,"text":"}"},
  {"line":2472,"text":"func (f *FourslashTest) VerifyBaselineGoToTypeDefinition("},
  {"line":2473,"text":"\tt *testing.T,"},
  {"line":2474,"text":"\tmarkers ...string,"},
  {"line":2475,"text":") {"},
  {"line":2476,"text":"\tf.verifyBaselineDefinitions("},
  {"line":2477,"text":"\t\tt,"},
  {"line":2478,"text":"\t\tgoToTypeDefinitionCmd,"},
  {"line":2479,"text":"\t\t\"/*GOTO TYPE*/\", /*definitionMarker*/"},
  {"line":2480,"text":"\t\tfunc(t *testing.T, f *FourslashTest, fileName string, position lsproto.Position) lsproto.LocationOrLocationsOrDefinitionLinksOrNull {"},
  {"line":2481,"text":"\t\t\tparams := &lsproto.TypeDefinitionParams{"},
  {"line":2482,"text":"\t\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2483,"text":"\t\t\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":2484,"text":"\t\t\t\t},"},
  {"line":2485,"text":"\t\t\t\tPosition: f.currentCaretPosition,"},
  {"line":2486,"text":"\t\t\t}"},
  {"line":2488,"text":"\t\t\treturn sendRequest(t, f, lsproto.TextDocumentTypeDefinitionInfo, params)"},
  {"line":2489,"text":"\t\t},"},
  {"line":2490,"text":"\t\tfalse, /*includeOriginalSelectionRange*/"},
  {"line":2491,"text":"\t\tmarkers...,"},
  {"line":2492,"text":"\t)"},
  {"line":2493,"text":"}"},
  {"line":2495,"text":"func (f *FourslashTest) VerifyBaselineGoToSourceDefinition("},
  {"line":2496,"text":"\tt *testing.T,"},
  {"line":2497,"text":"\tmarkers ...string,"},
  {"line":2498,"text":") {"},
  {"line":2499,"text":"\tf.verifyBaselineDefinitions("},
  {"line":2500,"text":"\t\tt,"},
  {"line":2501,"text":"\t\tgoToSourceDefinitionCmd,"},
  {"line":2502,"text":"\t\t\"/*GOTO SOURCE DEF*/\", /*definitionMarker*/"},
  {"line":2503,"text":"\t\tfunc(t *testing.T, f *FourslashTest, fileName string, position lsproto.Position) lsproto.LocationOrLocationsOrDefinitionLinksOrNull {"},
  {"line":2504,"text":"\t\t\tparams := &lsproto.TextDocumentPositionParams{"},
  {"line":2505,"text":"\t\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2506,"text":"\t\t\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":2507,"text":"\t\t\t\t},"},
  {"line":2508,"text":"\t\t\t\tPosition: f.currentCaretPosition,"},
  {"line":2509,"text":"\t\t\t}"},
  {"line":2511,"text":"\t\t\tresult := sendRequest(t, f, lsproto.CustomTextDocumentSourceDefinitionInfo, params)"},
  {"line":2512,"text":"\t\t\tif result == nil {"},
  {"line":2513,"text":"\t\t\t\treturn lsproto.LocationOrLocationsOrDefinitionLinksOrNull{}"},
  {"line":2514,"text":"\t\t\t}"},
  {"line":2515,"text":"\t\t\treturn *result"},
  {"line":2516,"text":"\t\t},"},
  {"line":2517,"text":"\t\tfalse, /*includeOriginalSelectionRange*/"},
  {"line":2518,"text":"\t\tmarkers...,"},
  {"line":2519,"text":"\t)"},
  {"line":2520,"text":"}"},
  {"line":2522,"text":"func (f *FourslashTest) VerifyBaselineWorkspaceSymbol(t *testing.T, query string) {"},
  {"line":2523,"text":"\tt.Helper()"},
  {"line":2524,"text":"\tresult := sendRequest(t, f, lsproto.WorkspaceSymbolInfo, &lsproto.WorkspaceSymbolParams{Query: query})"},
  {"line":2526,"text":"\tlocationToText := map[documentSpan]*lsproto.SymbolInformation{}"},
  {"line":2527,"text":"\tgroupedRanges := collections.MultiMap[lsproto.DocumentUri, documentSpan]{}"},
  {"line":2528,"text":"\tvar symbolInformations []*lsproto.SymbolInformation"},
  {"line":2529,"text":"\tif result.SymbolInformations != nil {"},
  {"line":2530,"text":"\t\tsymbolInformations = *result.SymbolInformations"},
  {"line":2531,"text":"\t}"},
  {"line":2532,"text":"\tfor _, symbol := range symbolInformations {"},
  {"line":2533,"text":"\t\turi := symbol.Location.Uri"},
  {"line":2534,"text":"\t\tspan := locationToSpan(symbol.Location)"},
  {"line":2535,"text":"\t\tgroupedRanges.Add(uri, span)"},
  {"line":2536,"text":"\t\tlocationToText[span] = symbol"},
  {"line":2537,"text":"\t}"},
  {"line":2539,"text":"\tf.addResultToBaseline(t, \"workspaceSymbol\", f.getBaselineForGroupedSpansWithFileContents("},
  {"line":2540,"text":"\t\t&groupedRanges,"},
  {"line":2541,"text":"\t\tbaselineFourslashLocationsOptions{"},
  {"line":2542,"text":"\t\t\tgetLocationData: func(span documentSpan) string { return symbolInformationToData(locationToText[span]) },"},
  {"line":2543,"text":"\t\t},"},
  {"line":2544,"text":"\t))"},
  {"line":2545,"text":"}"},
  {"line":2547,"text":"func (f *FourslashTest) VerifyOutliningSpans(t *testing.T, foldingRangeKind ...lsproto.FoldingRangeKind) {"},
  {"line":2548,"text":"\tparams := &lsproto.FoldingRangeParams{"},
  {"line":2549,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2550,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":2551,"text":"\t\t},"},
  {"line":2552,"text":"\t}"},
  {"line":2553,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentFoldingRangeInfo, params)"},
  {"line":2554,"text":"\tif result.FoldingRanges == nil {"},
  {"line":2555,"text":"\t\tt.Fatalf(\"Nil response received for folding range request\")"},
  {"line":2556,"text":"\t}"},
  {"line":2559,"text":"\tvar actualRanges []*lsproto.FoldingRange"},
  {"line":2560,"text":"\tactualRanges = *result.FoldingRanges"},
  {"line":2561,"text":"\tif len(foldingRangeKind) > 0 {"},
  {"line":2562,"text":"\t\ttargetKind := foldingRangeKind[0]"},
  {"line":2563,"text":"\t\tvar filtered []*lsproto.FoldingRange"},
  {"line":2564,"text":"\t\tfor _, r := range actualRanges {"},
  {"line":2565,"text":"\t\t\tif r.Kind != nil && *r.Kind == targetKind {"},
  {"line":2566,"text":"\t\t\t\tfiltered = append(filtered, r)"},
  {"line":2567,"text":"\t\t\t}"},
  {"line":2568,"text":"\t\t}"},
  {"line":2569,"text":"\t\tactualRanges = filtered"},
  {"line":2570,"text":"\t}"},
  {"line":2572,"text":"\tif len(actualRanges) != len(f.Ranges()) {"},
  {"line":2573,"text":"\t\tt.Fatalf(\"verifyOutliningSpans failed - expected total spans to be %d, but was %d\","},
  {"line":2574,"text":"\t\t\tlen(f.Ranges()), len(actualRanges))"},
  {"line":2575,"text":"\t}"},
  {"line":2577,"text":"\tslices.SortFunc(f.Ranges(), func(a, b *RangeMarker) int {"},
  {"line":2578,"text":"\t\treturn lsproto.ComparePositions(a.LSPos(), b.LSPos())"},
  {"line":2579,"text":"\t})"},
  {"line":2581,"text":"\tfor i, expectedRange := range f.Ranges() {"},
  {"line":2582,"text":"\t\tactualRange := actualRanges[i]"},
  {"line":2583,"text":"\t\tstartPos := lsproto.Position{Line: actualRange.StartLine, Character: *actualRange.StartCharacter}"},
  {"line":2584,"text":"\t\tendPos := lsproto.Position{Line: actualRange.EndLine, Character: *actualRange.EndCharacter}"},
  {"line":2586,"text":"\t\tif lsproto.ComparePositions(startPos, expectedRange.LSRange.Start) != 0 ||"},
  {"line":2587,"text":"\t\t\tlsproto.ComparePositions(endPos, expectedRange.LSRange.End) != 0 {"},
  {"line":2588,"text":"\t\t\tt.Fatalf(\"verifyOutliningSpans failed - span %d has invalid positions:\\n  actual: start (%d,%d), end (%d,%d)\\n  expected: start (%d,%d), end (%d,%d)\","},
  {"line":2589,"text":"\t\t\t\ti+1,"},
  {"line":2590,"text":"\t\t\t\tactualRange.StartLine, *actualRange.StartCharacter, actualRange.EndLine, *actualRange.EndCharacter,"},
  {"line":2591,"text":"\t\t\t\texpectedRange.LSRange.Start.Line, expectedRange.LSRange.Start.Character, expectedRange.LSRange.End.Line, expectedRange.LSRange.End.Character)"},
  {"line":2592,"text":"\t\t}"},
  {"line":2593,"text":"\t}"},
  {"line":2594,"text":"}"},
  {"line":2597,"text":"type FoldingRangeLineExpected struct {"},
  {"line":2598,"text":"\tStartLine uint32"},
  {"line":2599,"text":"\tEndLine   uint32"},
  {"line":2600,"text":"}"},
  {"line":2604,"text":"func (f *FourslashTest) VerifyFoldingRangeLines(t *testing.T, expected []FoldingRangeLineExpected) {"},
  {"line":2605,"text":"\tparams := &lsproto.FoldingRangeParams{"},
  {"line":2606,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2607,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":2608,"text":"\t\t},"},
  {"line":2609,"text":"\t}"},
  {"line":2610,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentFoldingRangeInfo, params)"},
  {"line":2611,"text":"\tif result.FoldingRanges == nil {"},
  {"line":2612,"text":"\t\tt.Fatalf(\"Nil response received for folding range request\")"},
  {"line":2613,"text":"\t}"},
  {"line":2615,"text":"\tactualRanges := *result.FoldingRanges"},
  {"line":2616,"text":"\tif len(actualRanges) != len(expected) {"},
  {"line":2617,"text":"\t\tt.Fatalf(\"verifyFoldingRangeLines failed - expected %d ranges, got %d\", len(expected), len(actualRanges))"},
  {"line":2618,"text":"\t}"},
  {"line":2620,"text":"\tfor i, exp := range expected {"},
  {"line":2621,"text":"\t\tgot := actualRanges[i]"},
  {"line":2622,"text":"\t\tif got.StartLine != exp.StartLine || got.EndLine != exp.EndLine {"},
  {"line":2623,"text":"\t\t\tt.Errorf(\"verifyFoldingRangeLines failed - range %d: expected (startLine=%d, endLine=%d), got (startLine=%d, endLine=%d)\","},
  {"line":2624,"text":"\t\t\t\ti, exp.StartLine, exp.EndLine, got.StartLine, got.EndLine)"},
  {"line":2625,"text":"\t\t}"},
  {"line":2626,"text":"\t}"},
  {"line":2627,"text":"}"},
  {"line":2629,"text":"func (f *FourslashTest) VerifyBaselineHover(t *testing.T) {"},
  {"line":2630,"text":"\tmarkersAndItems := core.MapFiltered(f.Markers(), func(marker *Marker) (markerAndItem[*lsproto.Hover], bool) {"},
  {"line":2631,"text":"\t\tif marker.Name == nil {"},
  {"line":2632,"text":"\t\t\treturn markerAndItem[*lsproto.Hover]{}, false"},
  {"line":2633,"text":"\t\t}"},
  {"line":2635,"text":"\t\tparams := &lsproto.HoverParams{"},
  {"line":2636,"text":"\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2637,"text":"\t\t\t\tUri: lsconv.FileNameToDocumentURI(marker.fileName),"},
  {"line":2638,"text":"\t\t\t},"},
  {"line":2639,"text":"\t\t\tPosition: marker.LSPosition,"},
  {"line":2640,"text":"\t\t}"},
  {"line":2642,"text":"\t\tresult := sendRequest(t, f, lsproto.TextDocumentHoverInfo, params)"},
  {"line":2643,"text":"\t\treturn markerAndItem[*lsproto.Hover]{Marker: marker, Item: result.Hover}, true"},
  {"line":2644,"text":"\t})"},
  {"line":2646,"text":"\tgetRange := func(item *lsproto.Hover) *lsproto.Range {"},
  {"line":2647,"text":"\t\tif item == nil || item.Range == nil {"},
  {"line":2648,"text":"\t\t\treturn nil"},
  {"line":2649,"text":"\t\t}"},
  {"line":2650,"text":"\t\treturn item.Range"},
  {"line":2651,"text":"\t}"},
  {"line":2653,"text":"\tgetTooltipLines := func(item, _prev *lsproto.Hover) []string {"},
  {"line":2654,"text":"\t\tvar result []string"},
  {"line":2656,"text":"\t\tif item.Contents.MarkupContent != nil {"},
  {"line":2657,"text":"\t\t\tresult = strings.Split(item.Contents.MarkupContent.Value, \"\\n\")"},
  {"line":2658,"text":"\t\t}"},
  {"line":2659,"text":"\t\tif item.Contents.String != nil {"},
  {"line":2660,"text":"\t\t\tresult = strings.Split(*item.Contents.String, \"\\n\")"},
  {"line":2661,"text":"\t\t}"},
  {"line":2662,"text":"\t\tif item.Contents.MarkedStringWithLanguage != nil {"},
  {"line":2663,"text":"\t\t\tresult = appendLinesForMarkedStringWithLanguage(result, item.Contents.MarkedStringWithLanguage)"},
  {"line":2664,"text":"\t\t}"},
  {"line":2665,"text":"\t\tif item.Contents.MarkedStrings != nil {"},
  {"line":2666,"text":"\t\t\tfor _, ms := range *item.Contents.MarkedStrings {"},
  {"line":2667,"text":"\t\t\t\tif ms.MarkedStringWithLanguage != nil {"},
  {"line":2668,"text":"\t\t\t\t\tresult = appendLinesForMarkedStringWithLanguage(result, ms.MarkedStringWithLanguage)"},
  {"line":2669,"text":"\t\t\t\t} else {"},
  {"line":2670,"text":"\t\t\t\t\tresult = append(result, *ms.String)"},
  {"line":2671,"text":"\t\t\t\t}"},
  {"line":2672,"text":"\t\t\t}"},
  {"line":2673,"text":"\t\t}"},
  {"line":2675,"text":"\t\treturn result"},
  {"line":2676,"text":"\t}"},
  {"line":2678,"text":"\tf.addResultToBaseline(t, quickInfoCmd, annotateContentWithTooltips(t, f, markersAndItems, \"quickinfo\", getRange, getTooltipLines))"},
  {"line":2679,"text":"\tif jsonStr, err := core.StringifyJson(markersAndItems, \"\", \"  \"); err == nil {"},
  {"line":2680,"text":"\t\tf.writeToBaseline(quickInfoCmd, jsonStr)"},
  {"line":2681,"text":"\t} else {"},
  {"line":2682,"text":"\t\tt.Fatalf(\"Failed to stringify markers and items for baseline: %v\", err)"},
  {"line":2683,"text":"\t}"},
  {"line":2684,"text":"}"},
  {"line":2686,"text":"func appendLinesForMarkedStringWithLanguage(result []string, ms *lsproto.MarkedStringWithLanguage) []string {"},
  {"line":2687,"text":"\tresult = append(result, \"```\"+ms.Language)"},
  {"line":2688,"text":"\tresult = append(result, ms.Value)"},
  {"line":2689,"text":"\tresult = append(result, \"```\")"},
  {"line":2690,"text":"\treturn result"},
  {"line":2691,"text":"}"},
  {"line":2693,"text":"type hoverWithVerbosity struct {"},
  {"line":2694,"text":"\tHover          *lsproto.Hover `json:\"hover\"`"},
  {"line":2695,"text":"\tVerbosityLevel int            `json:\"verbosityLevel\"`"},
  {"line":2696,"text":"}"},
  {"line":2699,"text":"func hoverContentString(hover *lsproto.Hover) string {"},
  {"line":2700,"text":"\tif hover == nil {"},
  {"line":2701,"text":"\t\treturn \"\""},
  {"line":2702,"text":"\t}"},
  {"line":2703,"text":"\tif hover.Contents.MarkupContent != nil {"},
  {"line":2704,"text":"\t\treturn hover.Contents.MarkupContent.Value"},
  {"line":2705,"text":"\t}"},
  {"line":2706,"text":"\tif hover.Contents.String != nil {"},
  {"line":2707,"text":"\t\treturn *hover.Contents.String"},
  {"line":2708,"text":"\t}"},
  {"line":2709,"text":"\treturn \"\""},
  {"line":2710,"text":"}"},
  {"line":2712,"text":"func (f *FourslashTest) VerifyBaselineHoverWithVerbosity(t *testing.T, verbosityLevels map[string][]int) {"},
  {"line":2713,"text":"\tvar markersAndItems []markerAndItem[*hoverWithVerbosity]"},
  {"line":2714,"text":"\tfor _, marker := range f.Markers() {"},
  {"line":2715,"text":"\t\tif marker.Name == nil {"},
  {"line":2716,"text":"\t\t\tcontinue"},
  {"line":2717,"text":"\t\t}"},
  {"line":2718,"text":"\t\tlevels, ok := verbosityLevels[*marker.Name]"},
  {"line":2719,"text":"\t\tif !ok {"},
  {"line":2720,"text":"\t\t\tlevels = []int{0}"},
  {"line":2721,"text":"\t\t}"},
  {"line":2722,"text":"\t\tfor i, level := range levels {"},
  {"line":2723,"text":"\t\t\tvar verbLevel *int32"},
  {"line":2724,"text":"\t\t\tif level > 0 {"},
  {"line":2725,"text":"\t\t\t\tverbLevel = new(int32(level))"},
  {"line":2726,"text":"\t\t\t}"},
  {"line":2727,"text":"\t\t\tparams := &lsproto.HoverParams{"},
  {"line":2728,"text":"\t\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2729,"text":"\t\t\t\t\tUri: lsconv.FileNameToDocumentURI(marker.fileName),"},
  {"line":2730,"text":"\t\t\t\t},"},
  {"line":2731,"text":"\t\t\t\tPosition:       marker.LSPosition,"},
  {"line":2732,"text":"\t\t\t\tVerbosityLevel: verbLevel,"},
  {"line":2733,"text":"\t\t\t}"},
  {"line":2734,"text":"\t\t\tresult := sendRequest(t, f, lsproto.TextDocumentHoverInfo, params)"},
  {"line":2735,"text":"\t\t\titem := &hoverWithVerbosity{"},
  {"line":2736,"text":"\t\t\t\tHover:          result.Hover,"},
  {"line":2737,"text":"\t\t\t\tVerbosityLevel: level,"},
  {"line":2738,"text":"\t\t\t}"},
  {"line":2741,"text":"\t\t\tif i > 0 && level > levels[i-1] {"},
  {"line":2742,"text":"\t\t\t\tprevItem := markersAndItems[len(markersAndItems)-1].Item"},
  {"line":2743,"text":"\t\t\t\tif prevItem != nil && prevItem.Hover != nil && !prevItem.Hover.CanIncreaseVerbosity {"},
  {"line":2744,"text":"\t\t\t\t\tprevContent := hoverContentString(prevItem.Hover)"},
  {"line":2745,"text":"\t\t\t\t\tcurContent := hoverContentString(item.Hover)"},
  {"line":2746,"text":"\t\t\t\t\tif prevContent != curContent {"},
  {"line":2747,"text":"\t\t\t\t\t\tt.Errorf(\"At marker %q: verbosity level %d response differs from level %d, but level %d had canIncreaseVerbosity=false.\\n  level %d: %s\\n  level %d: %s\","},
  {"line":2748,"text":"\t\t\t\t\t\t\t*marker.Name, level, levels[i-1], levels[i-1], levels[i-1], prevContent, level, curContent)"},
  {"line":2749,"text":"\t\t\t\t\t}"},
  {"line":2750,"text":"\t\t\t\t}"},
  {"line":2751,"text":"\t\t\t}"},
  {"line":2752,"text":"\t\t\tmarkersAndItems = append(markersAndItems, markerAndItem[*hoverWithVerbosity]{Marker: marker, Item: item})"},
  {"line":2753,"text":"\t\t}"},
  {"line":2754,"text":"\t}"},
  {"line":2756,"text":"\tgetRange := func(item *hoverWithVerbosity) *lsproto.Range {"},
  {"line":2757,"text":"\t\tif item == nil || item.Hover == nil || item.Hover.Range == nil {"},
  {"line":2758,"text":"\t\t\treturn nil"},
  {"line":2759,"text":"\t\t}"},
  {"line":2760,"text":"\t\treturn item.Hover.Range"},
  {"line":2761,"text":"\t}"},
  {"line":2763,"text":"\tgetTooltipLines := func(item, _prev *hoverWithVerbosity) []string {"},
  {"line":2764,"text":"\t\tif item == nil || item.Hover == nil {"},
  {"line":2765,"text":"\t\t\treturn nil"},
  {"line":2766,"text":"\t\t}"},
  {"line":2767,"text":"\t\tvar result []string"},
  {"line":2769,"text":"\t\tif item.Hover.Contents.MarkupContent != nil {"},
  {"line":2770,"text":"\t\t\tresult = strings.Split(item.Hover.Contents.MarkupContent.Value, \"\\n\")"},
  {"line":2771,"text":"\t\t}"},
  {"line":2772,"text":"\t\tif item.Hover.Contents.String != nil {"},
  {"line":2773,"text":"\t\t\tresult = strings.Split(*item.Hover.Contents.String, \"\\n\")"},
  {"line":2774,"text":"\t\t}"},
  {"line":2775,"text":"\t\tif item.Hover.Contents.MarkedStringWithLanguage != nil {"},
  {"line":2776,"text":"\t\t\tresult = appendLinesForMarkedStringWithLanguage(result, item.Hover.Contents.MarkedStringWithLanguage)"},
  {"line":2777,"text":"\t\t}"},
  {"line":2778,"text":"\t\tif item.Hover.Contents.MarkedStrings != nil {"},
  {"line":2779,"text":"\t\t\tfor _, ms := range *item.Hover.Contents.MarkedStrings {"},
  {"line":2780,"text":"\t\t\t\tif ms.MarkedStringWithLanguage != nil {"},
  {"line":2781,"text":"\t\t\t\t\tresult = appendLinesForMarkedStringWithLanguage(result, ms.MarkedStringWithLanguage)"},
  {"line":2782,"text":"\t\t\t\t} else {"},
  {"line":2783,"text":"\t\t\t\t\tresult = append(result, *ms.String)"},
  {"line":2784,"text":"\t\t\t\t}"},
  {"line":2785,"text":"\t\t\t}"},
  {"line":2786,"text":"\t\t}"},
  {"line":2788,"text":"\t\tresult = append(result, fmt.Sprintf(\"(verbosity level: %d)\", item.VerbosityLevel))"},
  {"line":2790,"text":"\t\treturn result"},
  {"line":2791,"text":"\t}"},
  {"line":2793,"text":"\tf.addResultToBaseline(t, quickInfoCmd, annotateContentWithTooltips(t, f, markersAndItems, \"quickinfo\", getRange, getTooltipLines))"},
  {"line":2794,"text":"\tif jsonStr, err := core.StringifyJson(markersAndItems, \"\", \"  \"); err == nil {"},
  {"line":2795,"text":"\t\tf.writeToBaseline(quickInfoCmd, jsonStr)"},
  {"line":2796,"text":"\t} else {"},
  {"line":2797,"text":"\t\tt.Fatalf(\"Failed to stringify markers and items for baseline: %v\", err)"},
  {"line":2798,"text":"\t}"},
  {"line":2799,"text":"}"},
  {"line":2801,"text":"func (f *FourslashTest) VerifyBaselineSignatureHelp(t *testing.T) {"},
  {"line":2802,"text":"\tmarkersAndItems := core.MapFiltered(f.Markers(), func(marker *Marker) (markerAndItem[*lsproto.SignatureHelp], bool) {"},
  {"line":2803,"text":"\t\tif marker.Name == nil {"},
  {"line":2804,"text":"\t\t\treturn markerAndItem[*lsproto.SignatureHelp]{}, false"},
  {"line":2805,"text":"\t\t}"},
  {"line":2807,"text":"\t\tparams := &lsproto.SignatureHelpParams{"},
  {"line":2808,"text":"\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2809,"text":"\t\t\t\tUri: lsconv.FileNameToDocumentURI(marker.FileName()),"},
  {"line":2810,"text":"\t\t\t},"},
  {"line":2811,"text":"\t\t\tPosition: marker.LSPosition,"},
  {"line":2812,"text":"\t\t}"},
  {"line":2814,"text":"\t\tresult := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)"},
  {"line":2815,"text":"\t\treturn markerAndItem[*lsproto.SignatureHelp]{Marker: marker, Item: result.SignatureHelp}, true"},
  {"line":2816,"text":"\t})"},
  {"line":2818,"text":"\tgetRange := func(item *lsproto.SignatureHelp) *lsproto.Range {"},
  {"line":2820,"text":"\t\treturn nil"},
  {"line":2821,"text":"\t}"},
  {"line":2823,"text":"\tgetTooltipLines := func(item, _prev *lsproto.SignatureHelp) []string {"},
  {"line":2824,"text":"\t\tif item == nil || len(item.Signatures) == 0 {"},
  {"line":2825,"text":"\t\t\treturn []string{\"No signature help available\"}"},
  {"line":2826,"text":"\t\t}"},
  {"line":2829,"text":"\t\tactiveSignature := 0"},
  {"line":2830,"text":"\t\tif item.ActiveSignature != nil && int(*item.ActiveSignature) < len(item.Signatures) {"},
  {"line":2831,"text":"\t\t\tactiveSignature = int(*item.ActiveSignature)"},
  {"line":2832,"text":"\t\t}"},
  {"line":2834,"text":"\t\tsig := item.Signatures[activeSignature]"},
  {"line":2837,"text":"\t\tsignatureLine := sig.Label"},
  {"line":2838,"text":"\t\tactiveParamLine := \"\""},
  {"line":2842,"text":"\t\tvar activeParamPtr *lsproto.UintegerOrNull"},
  {"line":2843,"text":"\t\tif sig.ActiveParameter != nil {"},
  {"line":2844,"text":"\t\t\tactiveParamPtr = sig.ActiveParameter"},
  {"line":2845,"text":"\t\t} else {"},
  {"line":2846,"text":"\t\t\tactiveParamPtr = item.ActiveParameter"},
  {"line":2847,"text":"\t\t}"},
  {"line":2850,"text":"\t\tif activeParamPtr != nil && activeParamPtr.Uinteger != nil && sig.Parameters != nil {"},
  {"line":2851,"text":"\t\t\tactiveParamIndex := int(*activeParamPtr.Uinteger)"},
  {"line":2852,"text":"\t\t\tif activeParamIndex >= 0 && activeParamIndex < len(*sig.Parameters) {"},
  {"line":2853,"text":"\t\t\t\tactiveParam := (*sig.Parameters)[activeParamIndex]"},
  {"line":2857,"text":"\t\t\t\tactiveParamLabel := \"\""},
  {"line":2858,"text":"\t\t\t\tif activeParam.Label.String != nil {"},
  {"line":2859,"text":"\t\t\t\t\tactiveParamLabel = *activeParam.Label.String"},
  {"line":2860,"text":"\t\t\t\t} else if activeParam.Label.Tuple != nil {"},
  {"line":2861,"text":"\t\t\t\t\tactiveParamLabel = signatureLine[(*activeParam.Label.Tuple)[0]:(*activeParam.Label.Tuple)[1]]"},
  {"line":2862,"text":"\t\t\t\t} else {"},
  {"line":2863,"text":"\t\t\t\t\tt.Fatal(\"Unsupported param label kind.\")"},
  {"line":2864,"text":"\t\t\t\t}"},
  {"line":2865,"text":"\t\t\t\tsignatureLine = strings.Replace(signatureLine, activeParamLabel, \"**\"+activeParamLabel+\"**\", 1)"},
  {"line":2867,"text":"\t\t\t\tif activeParam.Documentation != nil {"},
  {"line":2868,"text":"\t\t\t\t\tif activeParam.Documentation.MarkupContent != nil {"},
  {"line":2869,"text":"\t\t\t\t\t\tactiveParamLine = activeParam.Documentation.MarkupContent.Value"},
  {"line":2870,"text":"\t\t\t\t\t} else if activeParam.Documentation.String != nil {"},
  {"line":2871,"text":"\t\t\t\t\t\tactiveParamLine = *activeParam.Documentation.String"},
  {"line":2872,"text":"\t\t\t\t\t}"},
  {"line":2874,"text":"\t\t\t\t\tactiveParamLine = fmt.Sprintf(\"- `%s`: %s\", activeParamLabel, activeParamLine)"},
  {"line":2875,"text":"\t\t\t\t}"},
  {"line":2877,"text":"\t\t\t}"},
  {"line":2878,"text":"\t\t}"},
  {"line":2880,"text":"\t\tresult := make([]string, 0, 16)"},
  {"line":2881,"text":"\t\tresult = append(result, signatureLine)"},
  {"line":2882,"text":"\t\tif activeParamLine != \"\" {"},
  {"line":2883,"text":"\t\t\tresult = append(result, activeParamLine)"},
  {"line":2884,"text":"\t\t}"},
  {"line":2890,"text":"\t\tif sig.Documentation != nil {"},
  {"line":2891,"text":"\t\t\tif sig.Documentation.MarkupContent != nil {"},
  {"line":2892,"text":"\t\t\t\tresult = append(result, strings.Split(sig.Documentation.MarkupContent.Value, \"\\n\")...)"},
  {"line":2893,"text":"\t\t\t} else if sig.Documentation.String != nil {"},
  {"line":2894,"text":"\t\t\t\tresult = append(result, strings.Split(*sig.Documentation.String, \"\\n\")...)"},
  {"line":2895,"text":"\t\t\t} else {"},
  {"line":2896,"text":"\t\t\t\tt.Fatal(\"Unsupported documentation format.\")"},
  {"line":2897,"text":"\t\t\t}"},
  {"line":2898,"text":"\t\t}"},
  {"line":2900,"text":"\t\treturn result"},
  {"line":2901,"text":"\t}"},
  {"line":2903,"text":"\tf.addResultToBaseline(t, signatureHelpCmd, annotateContentWithTooltips(t, f, markersAndItems, \"signaturehelp\", getRange, getTooltipLines))"},
  {"line":2904,"text":"\tif jsonStr, err := core.StringifyJson(markersAndItems, \"\", \"  \"); err == nil {"},
  {"line":2905,"text":"\t\tf.writeToBaseline(signatureHelpCmd, jsonStr)"},
  {"line":2906,"text":"\t} else {"},
  {"line":2907,"text":"\t\tt.Fatalf(\"Failed to stringify markers and items for baseline: %v\", err)"},
  {"line":2908,"text":"\t}"},
  {"line":2909,"text":"}"},
  {"line":2911,"text":"func (f *FourslashTest) VerifyBaselineSelectionRanges(t *testing.T) {"},
  {"line":2912,"text":"\tmarkers := f.Markers()"},
  {"line":2913,"text":"\tvar result strings.Builder"},
  {"line":2914,"text":"\tnewLine := \"\\n\""},
  {"line":2916,"text":"\tfor i, marker := range markers {"},
  {"line":2917,"text":"\t\tif i > 0 {"},
  {"line":2918,"text":"\t\t\tresult.WriteString(newLine)"},
  {"line":2919,"text":"\t\t\tfor range 80 {"},
  {"line":2920,"text":"\t\t\t\tresult.WriteByte('=')"},
  {"line":2921,"text":"\t\t\t}"},
  {"line":2922,"text":"\t\t\tresult.WriteString(newLine)"},
  {"line":2923,"text":"\t\t\tresult.WriteString(newLine)"},
  {"line":2924,"text":"\t\t}"},
  {"line":2926,"text":"\t\tscript := f.getScriptInfo(marker.FileName())"},
  {"line":2927,"text":"\t\tfileContent := script.content"},
  {"line":2930,"text":"\t\tmarkerPos := marker.Position"},
  {"line":2931,"text":"\t\tbaselineContent := fileContent[:markerPos] + \"/**/\" + fileContent[markerPos:] + newLine"},
  {"line":2932,"text":"\t\tresult.WriteString(baselineContent)"},
  {"line":2935,"text":"\t\tparams := &lsproto.SelectionRangeParams{"},
  {"line":2936,"text":"\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":2937,"text":"\t\t\t\tUri: lsconv.FileNameToDocumentURI(marker.FileName()),"},
  {"line":2938,"text":"\t\t\t},"},
  {"line":2939,"text":"\t\t\tPositions: []lsproto.Position{marker.LSPosition},"},
  {"line":2940,"text":"\t\t}"},
  {"line":2942,"text":"\t\tselectionRangeResult := sendRequest(t, f, lsproto.TextDocumentSelectionRangeInfo, params)"},
  {"line":2944,"text":"\t\tif selectionRangeResult.SelectionRanges == nil || len(*selectionRangeResult.SelectionRanges) == 0 {"},
  {"line":2945,"text":"\t\t\tresult.WriteString(\"No selection ranges available\\n\")"},
  {"line":2946,"text":"\t\t\tcontinue"},
  {"line":2947,"text":"\t\t}"},
  {"line":2949,"text":"\t\tselectionRange := (*selectionRangeResult.SelectionRanges)[0]"},
  {"line":2952,"text":"\t\tresult.WriteString(newLine)"},
  {"line":2955,"text":"\t\tfor selectionRange != nil {"},
  {"line":2956,"text":"\t\t\tstart := int(f.converters.LineAndCharacterToPosition(script, selectionRange.Range.Start))"},
  {"line":2957,"text":"\t\t\tend := int(f.converters.LineAndCharacterToPosition(script, selectionRange.Range.End))"},
  {"line":2960,"text":"\t\t\trunes := []rune(fileContent)"},
  {"line":2961,"text":"\t\t\tmasked := make([]rune, len(runes))"},
  {"line":2962,"text":"\t\t\tfor i, ch := range runes {"},
  {"line":2963,"text":"\t\t\t\tif i >= start && i < end {"},
  {"line":2965,"text":"\t\t\t\t\tif ch == ' ' {"},
  {"line":2966,"text":"\t\t\t\t\t\tmasked[i] = '•'"},
  {"line":2967,"text":"\t\t\t\t\t} else if ch == '\\n' || ch == '\\r' {"},
  {"line":2968,"text":"\t\t\t\t\t\tmasked[i] = ch // Keep line breaks as-is, will add arrow later"},
  {"line":2969,"text":"\t\t\t\t\t} else {"},
  {"line":2970,"text":"\t\t\t\t\t\tmasked[i] = ch"},
  {"line":2971,"text":"\t\t\t\t\t}"},
  {"line":2972,"text":"\t\t\t\t} else {"},
  {"line":2974,"text":"\t\t\t\t\tif ch == '\\n' || ch == '\\r' {"},
  {"line":2975,"text":"\t\t\t\t\t\tmasked[i] = ch"},
  {"line":2976,"text":"\t\t\t\t\t} else {"},
  {"line":2977,"text":"\t\t\t\t\t\tmasked[i] = ' '"},
  {"line":2978,"text":"\t\t\t\t\t}"},
  {"line":2979,"text":"\t\t\t\t}"},
  {"line":2980,"text":"\t\t\t}"},
  {"line":2982,"text":"\t\t\tmaskedStr := string(masked)"},
  {"line":2985,"text":"\t\t\tmaskedStr = strings.ReplaceAll(maskedStr, \"\\n\", \"↲\\n\")"},
  {"line":2986,"text":"\t\t\tmaskedStr = strings.ReplaceAll(maskedStr, \"\\r\", \"↲\\r\")"},
  {"line":2989,"text":"\t\t\tlines := strings.Split(maskedStr, \"\\n\")"},
  {"line":2990,"text":"\t\t\tvar nonBlankLines []string"},
  {"line":2991,"text":"\t\t\tfor _, line := range lines {"},
  {"line":2992,"text":"\t\t\t\ttrimmed := strings.TrimSpace(line)"},
  {"line":2993,"text":"\t\t\t\tif trimmed != \"\" && trimmed != \"↲\" {"},
  {"line":2994,"text":"\t\t\t\t\tnonBlankLines = append(nonBlankLines, line)"},
  {"line":2995,"text":"\t\t\t\t}"},
  {"line":2996,"text":"\t\t\t}"},
  {"line":2997,"text":"\t\t\tmaskedStr = strings.Join(nonBlankLines, \"\\n\")"},
  {"line":3000,"text":"\t\t\tmaskedRunes := []rune(maskedStr)"},
  {"line":3001,"text":"\t\t\tisRealCharacter := func(ch rune) bool {"},
  {"line":3002,"text":"\t\t\t\treturn ch != '•' && ch != '↲' && !stringutil.IsWhiteSpaceLike(ch)"},
  {"line":3003,"text":"\t\t\t}"},
  {"line":3005,"text":"\t\t\tleadingWidth := -1"},
  {"line":3006,"text":"\t\t\tfor i, ch := range maskedRunes {"},
  {"line":3007,"text":"\t\t\t\tif isRealCharacter(ch) {"},
  {"line":3008,"text":"\t\t\t\t\tleadingWidth = i"},
  {"line":3009,"text":"\t\t\t\t\tbreak"},
  {"line":3010,"text":"\t\t\t\t}"},
  {"line":3011,"text":"\t\t\t}"},
  {"line":3013,"text":"\t\t\ttrailingWidth := -1"},
  {"line":3014,"text":"\t\t\tfor j := len(maskedRunes) - 1; j >= 0; j-- {"},
  {"line":3015,"text":"\t\t\t\tif isRealCharacter(maskedRunes[j]) {"},
  {"line":3016,"text":"\t\t\t\t\ttrailingWidth = j"},
  {"line":3017,"text":"\t\t\t\t\tbreak"},
  {"line":3018,"text":"\t\t\t\t}"},
  {"line":3019,"text":"\t\t\t}"},
  {"line":3021,"text":"\t\t\tif leadingWidth != -1 && trailingWidth != -1 && leadingWidth <= trailingWidth {"},
  {"line":3023,"text":"\t\t\t\tprefix := string(maskedRunes[:leadingWidth])"},
  {"line":3024,"text":"\t\t\t\tmiddle := string(maskedRunes[leadingWidth : trailingWidth+1])"},
  {"line":3025,"text":"\t\t\t\tsuffix := string(maskedRunes[trailingWidth+1:])"},
  {"line":3027,"text":"\t\t\t\tmiddle = strings.ReplaceAll(middle, \"•\", \" \")"},
  {"line":3028,"text":"\t\t\t\tmiddle = strings.ReplaceAll(middle, \"↲\", \"\")"},
  {"line":3030,"text":"\t\t\t\tmaskedStr = prefix + middle + suffix"},
  {"line":3031,"text":"\t\t\t}"},
  {"line":3034,"text":"\t\t\tif strings.Contains(maskedStr, \"\\n\") {"},
  {"line":3035,"text":"\t\t\t\tresult.WriteString(newLine)"},
  {"line":3036,"text":"\t\t\t}"},
  {"line":3038,"text":"\t\t\tresult.WriteString(maskedStr)"},
  {"line":3039,"text":"\t\t\tif !strings.HasSuffix(maskedStr, \"\\n\") {"},
  {"line":3040,"text":"\t\t\t\tresult.WriteString(newLine)"},
  {"line":3041,"text":"\t\t\t}"},
  {"line":3043,"text":"\t\t\tselectionRange = selectionRange.Parent"},
  {"line":3044,"text":"\t\t}"},
  {"line":3045,"text":"\t}"},
  {"line":3046,"text":"\tf.addResultToBaseline(t, smartSelectionCmd, strings.TrimSuffix(result.String(), \"\\n\"))"},
  {"line":3047,"text":"}"},
  {"line":3049,"text":"func (f *FourslashTest) VerifyBaselineCallHierarchy(t *testing.T) {"},
  {"line":3050,"text":"\tfileName := f.activeFilename"},
  {"line":3051,"text":"\tposition := f.currentCaretPosition"},
  {"line":3053,"text":"\tparams := &lsproto.CallHierarchyPrepareParams{"},
  {"line":3054,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":3055,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(fileName),"},
  {"line":3056,"text":"\t\t},"},
  {"line":3057,"text":"\t\tPosition: position,"},
  {"line":3058,"text":"\t}"},
  {"line":3060,"text":"\tprepareResult := sendRequest(t, f, lsproto.TextDocumentPrepareCallHierarchyInfo, params)"},
  {"line":3061,"text":"\tif prepareResult.CallHierarchyItems == nil || len(*prepareResult.CallHierarchyItems) == 0 {"},
  {"line":3062,"text":"\t\tf.addResultToBaseline(t, callHierarchyCmd, \"No call hierarchy items available\")"},
  {"line":3063,"text":"\t\treturn"},
  {"line":3064,"text":"\t}"},
  {"line":3066,"text":"\tvar result strings.Builder"},
  {"line":3068,"text":"\tfor _, callHierarchyItem := range *prepareResult.CallHierarchyItems {"},
  {"line":3069,"text":"\t\tseen := make(map[callHierarchyItemKey]bool)"},
  {"line":3070,"text":"\t\titemFileName := callHierarchyItem.Uri.FileName()"},
  {"line":3071,"text":"\t\tscript := f.getOrLoadScriptInfo(itemFileName)"},
  {"line":3072,"text":"\t\tformatCallHierarchyItem(t, f, script, &result, *callHierarchyItem, callHierarchyItemDirectionRoot, seen, \"\")"},
  {"line":3073,"text":"\t}"},
  {"line":3075,"text":"\tf.addResultToBaseline(t, callHierarchyCmd, strings.TrimSuffix(result.String(), \"\\n\"))"},
  {"line":3076,"text":"}"},
  {"line":3078,"text":"type callHierarchyItemDirection int"},
  {"line":3080,"text":"const ("},
  {"line":3081,"text":"\tcallHierarchyItemDirectionRoot callHierarchyItemDirection = iota"},
  {"line":3082,"text":"\tcallHierarchyItemDirectionIncoming"},
  {"line":3083,"text":"\tcallHierarchyItemDirectionOutgoing"},
  {"line":3084,"text":")"},
  {"line":3086,"text":"type callHierarchyItemKey struct {"},
  {"line":3087,"text":"\turi       lsproto.DocumentUri"},
  {"line":3088,"text":"\trange_    lsproto.Range"},
  {"line":3089,"text":"\tdirection callHierarchyItemDirection"},
  {"line":3090,"text":"}"},
  {"line":3092,"text":"func symbolKindToLowercase(kind lsproto.SymbolKind) string {"},
  {"line":3093,"text":"\treturn strings.ToLower(kind.String())"},
  {"line":3094,"text":"}"},
  {"line":3096,"text":"func formatCallHierarchyItem("},
  {"line":3097,"text":"\tt *testing.T,"},
  {"line":3098,"text":"\tf *FourslashTest,"},
  {"line":3099,"text":"\tfile *scriptInfo,"},
  {"line":3100,"text":"\tresult *strings.Builder,"},
  {"line":3101,"text":"\tcallHierarchyItem lsproto.CallHierarchyItem,"},
  {"line":3102,"text":"\tdirection callHierarchyItemDirection,"},
  {"line":3103,"text":"\tseen map[callHierarchyItemKey]bool,"},
  {"line":3104,"text":"\tprefix string,"},
  {"line":3105,"text":") {"},
  {"line":3106,"text":"\tkey := callHierarchyItemKey{"},
  {"line":3107,"text":"\t\turi:       callHierarchyItem.Uri,"},
  {"line":3108,"text":"\t\trange_:    callHierarchyItem.Range,"},
  {"line":3109,"text":"\t\tdirection: direction,"},
  {"line":3110,"text":"\t}"},
  {"line":3111,"text":"\talreadySeen := seen[key]"},
  {"line":3112,"text":"\tseen[key] = true"},
  {"line":3114,"text":"\ttype incomingCallResult struct {"},
  {"line":3115,"text":"\t\tskip   bool"},
  {"line":3116,"text":"\t\tseen   bool"},
  {"line":3117,"text":"\t\tvalues []*lsproto.CallHierarchyIncomingCall"},
  {"line":3118,"text":"\t}"},
  {"line":3119,"text":"\ttype outgoingCallResult struct {"},
  {"line":3120,"text":"\t\tskip   bool"},
  {"line":3121,"text":"\t\tseen   bool"},
  {"line":3122,"text":"\t\tvalues []*lsproto.CallHierarchyOutgoingCall"},
  {"line":3123,"text":"\t}"},
  {"line":3125,"text":"\tvar incomingCalls incomingCallResult"},
  {"line":3126,"text":"\tvar outgoingCalls outgoingCallResult"},
  {"line":3128,"text":"\tif direction == callHierarchyItemDirectionOutgoing {"},
  {"line":3129,"text":"\t\tincomingCalls.skip = true"},
  {"line":3130,"text":"\t} else if alreadySeen {"},
  {"line":3131,"text":"\t\tincomingCalls.seen = true"},
  {"line":3132,"text":"\t} else {"},
  {"line":3133,"text":"\t\tincomingParams := &lsproto.CallHierarchyIncomingCallsParams{"},
  {"line":3134,"text":"\t\t\tItem: &callHierarchyItem,"},
  {"line":3135,"text":"\t\t}"},
  {"line":3136,"text":"\t\tincomingResult := sendRequest(t, f, lsproto.CallHierarchyIncomingCallsInfo, incomingParams)"},
  {"line":3137,"text":"\t\tif incomingResult.CallHierarchyIncomingCalls != nil {"},
  {"line":3138,"text":"\t\t\tincomingCalls.values = *incomingResult.CallHierarchyIncomingCalls"},
  {"line":3139,"text":"\t\t}"},
  {"line":3140,"text":"\t}"},
  {"line":3142,"text":"\tif direction == callHierarchyItemDirectionIncoming {"},
  {"line":3143,"text":"\t\toutgoingCalls.skip = true"},
  {"line":3144,"text":"\t} else if alreadySeen {"},
  {"line":3145,"text":"\t\toutgoingCalls.seen = true"},
  {"line":3146,"text":"\t} else {"},
  {"line":3147,"text":"\t\toutgoingParams := &lsproto.CallHierarchyOutgoingCallsParams{"},
  {"line":3148,"text":"\t\t\tItem: &callHierarchyItem,"},
  {"line":3149,"text":"\t\t}"},
  {"line":3150,"text":"\t\toutgoingResult := sendRequest(t, f, lsproto.CallHierarchyOutgoingCallsInfo, outgoingParams)"},
  {"line":3151,"text":"\t\tif outgoingResult.CallHierarchyOutgoingCalls != nil {"},
  {"line":3152,"text":"\t\t\toutgoingCalls.values = *outgoingResult.CallHierarchyOutgoingCalls"},
  {"line":3153,"text":"\t\t}"},
  {"line":3154,"text":"\t}"},
  {"line":3156,"text":"\ttrailingPrefix := prefix"},
  {"line":3157,"text":"\tresult.WriteString(fmt.Sprintf(\"%s╭ name: %s\\n\", prefix, callHierarchyItem.Name))"},
  {"line":3158,"text":"\tresult.WriteString(fmt.Sprintf(\"%s├ kind: %s\\n\", prefix, symbolKindToLowercase(callHierarchyItem.Kind)))"},
  {"line":3159,"text":"\tif callHierarchyItem.Detail != nil && *callHierarchyItem.Detail != \"\" {"},
  {"line":3160,"text":"\t\tresult.WriteString(fmt.Sprintf(\"%s├ containerName: %s\\n\", prefix, *callHierarchyItem.Detail))"},
  {"line":3161,"text":"\t}"},
  {"line":3162,"text":"\tresult.WriteString(fmt.Sprintf(\"%s├ file: %s\\n\", prefix, callHierarchyItem.Uri.FileName()))"},
  {"line":3163,"text":"\tresult.WriteString(prefix)"},
  {"line":3164,"text":"\tresult.WriteString(\"├ span:\\n\")"},
  {"line":3165,"text":"\tformatCallHierarchyItemSpan(f, file, result, callHierarchyItem.Range, prefix+\"│ \", prefix+\"│ \")"},
  {"line":3166,"text":"\tresult.WriteString(prefix)"},
  {"line":3167,"text":"\tresult.WriteString(\"├ selectionSpan:\\n\")"},
  {"line":3168,"text":"\tformatCallHierarchyItemSpan(f, file, result, callHierarchyItem.SelectionRange, prefix+\"│ \", prefix+\"│ \")"},
  {"line":3171,"text":"\tif incomingCalls.seen {"},
  {"line":3172,"text":"\t\tif outgoingCalls.skip {"},
  {"line":3173,"text":"\t\t\tresult.WriteString(trailingPrefix)"},
  {"line":3174,"text":"\t\t\tresult.WriteString(\"╰ incoming: ...\\n\")"},
  {"line":3175,"text":"\t\t} else {"},
  {"line":3176,"text":"\t\t\tresult.WriteString(prefix)"},
  {"line":3177,"text":"\t\t\tresult.WriteString(\"├ incoming: ...\\n\")"},
  {"line":3178,"text":"\t\t}"},
  {"line":3179,"text":"\t} else if !incomingCalls.skip {"},
  {"line":3180,"text":"\t\tif len(incomingCalls.values) == 0 {"},
  {"line":3181,"text":"\t\t\tif outgoingCalls.skip {"},
  {"line":3182,"text":"\t\t\t\tresult.WriteString(trailingPrefix)"},
  {"line":3183,"text":"\t\t\t\tresult.WriteString(\"╰ incoming: none\\n\")"},
  {"line":3184,"text":"\t\t\t} else {"},
  {"line":3185,"text":"\t\t\t\tresult.WriteString(prefix)"},
  {"line":3186,"text":"\t\t\t\tresult.WriteString(\"├ incoming: none\\n\")"},
  {"line":3187,"text":"\t\t\t}"},
  {"line":3188,"text":"\t\t} else {"},
  {"line":3189,"text":"\t\t\tresult.WriteString(prefix)"},
  {"line":3190,"text":"\t\t\tresult.WriteString(\"├ incoming:\\n\")"},
  {"line":3191,"text":"\t\t\tfor i, incomingCall := range incomingCalls.values {"},
  {"line":3192,"text":"\t\t\t\tfromFileName := incomingCall.From.Uri.FileName()"},
  {"line":3193,"text":"\t\t\t\tfromFile := f.getOrLoadScriptInfo(fromFileName)"},
  {"line":3194,"text":"\t\t\t\tresult.WriteString(prefix)"},
  {"line":3195,"text":"\t\t\t\tresult.WriteString(\"│ ╭ from:\\n\")"},
  {"line":3196,"text":"\t\t\t\tformatCallHierarchyItem(t, f, fromFile, result, *incomingCall.From, callHierarchyItemDirectionIncoming, seen, prefix+\"│ │ \")"},
  {"line":3197,"text":"\t\t\t\tresult.WriteString(prefix)"},
  {"line":3198,"text":"\t\t\t\tresult.WriteString(\"│ ├ fromSpans:\\n\")"},
  {"line":3200,"text":"\t\t\t\tfromSpansTrailingPrefix := trailingPrefix + \"╰ ╰ \""},
  {"line":3201,"text":"\t\t\t\tif i < len(incomingCalls.values)-1 {"},
  {"line":3202,"text":"\t\t\t\t\tfromSpansTrailingPrefix = prefix + \"│ ╰ \""},
  {"line":3203,"text":"\t\t\t\t} else if !outgoingCalls.skip && (!outgoingCalls.seen || len(outgoingCalls.values) > 0) {"},
  {"line":3204,"text":"\t\t\t\t\tfromSpansTrailingPrefix = prefix + \"│ ╰ \""},
  {"line":3205,"text":"\t\t\t\t}"},
  {"line":3206,"text":"\t\t\t\tformatCallHierarchyItemSpans(f, fromFile, result, incomingCall.FromRanges, prefix+\"│ │ \", fromSpansTrailingPrefix)"},
  {"line":3207,"text":"\t\t\t}"},
  {"line":3208,"text":"\t\t}"},
  {"line":3209,"text":"\t}"},
  {"line":3212,"text":"\tif outgoingCalls.seen {"},
  {"line":3213,"text":"\t\tresult.WriteString(trailingPrefix)"},
  {"line":3214,"text":"\t\tresult.WriteString(\"╰ outgoing: ...\\n\")"},
  {"line":3215,"text":"\t} else if !outgoingCalls.skip {"},
  {"line":3216,"text":"\t\tif len(outgoingCalls.values) == 0 {"},
  {"line":3217,"text":"\t\t\tresult.WriteString(trailingPrefix)"},
  {"line":3218,"text":"\t\t\tresult.WriteString(\"╰ outgoing: none\\n\")"},
  {"line":3219,"text":"\t\t} else {"},
  {"line":3220,"text":"\t\t\tresult.WriteString(prefix)"},
  {"line":3221,"text":"\t\t\tresult.WriteString(\"├ outgoing:\\n\")"},
  {"line":3222,"text":"\t\t\tfor i, outgoingCall := range outgoingCalls.values {"},
  {"line":3223,"text":"\t\t\t\ttoFileName := outgoingCall.To.Uri.FileName()"},
  {"line":3224,"text":"\t\t\t\ttoFile := f.getOrLoadScriptInfo(toFileName)"},
  {"line":3225,"text":"\t\t\t\tresult.WriteString(prefix)"},
  {"line":3226,"text":"\t\t\t\tresult.WriteString(\"│ ╭ to:\\n\")"},
  {"line":3227,"text":"\t\t\t\tformatCallHierarchyItem(t, f, toFile, result, *outgoingCall.To, callHierarchyItemDirectionOutgoing, seen, prefix+\"│ │ \")"},
  {"line":3228,"text":"\t\t\t\tresult.WriteString(prefix)"},
  {"line":3229,"text":"\t\t\t\tresult.WriteString(\"│ ├ fromSpans:\\n\")"},
  {"line":3231,"text":"\t\t\t\tfromSpansTrailingPrefix := trailingPrefix + \"╰ ╰ \""},
  {"line":3232,"text":"\t\t\t\tif i < len(outgoingCalls.values)-1 {"},
  {"line":3233,"text":"\t\t\t\t\tfromSpansTrailingPrefix = prefix + \"│ ╰ \""},
  {"line":3234,"text":"\t\t\t\t}"},
  {"line":3235,"text":"\t\t\t\tformatCallHierarchyItemSpans(f, file, result, outgoingCall.FromRanges, prefix+\"│ │ \", fromSpansTrailingPrefix)"},
  {"line":3236,"text":"\t\t\t}"},
  {"line":3237,"text":"\t\t}"},
  {"line":3238,"text":"\t}"},
  {"line":3239,"text":"}"},
  {"line":3241,"text":"func formatCallHierarchyItemSpan("},
  {"line":3242,"text":"\tf *FourslashTest,"},
  {"line":3243,"text":"\tfile *scriptInfo,"},
  {"line":3244,"text":"\tresult *strings.Builder,"},
  {"line":3245,"text":"\tspan lsproto.Range,"},
  {"line":3246,"text":"\tprefix string,"},
  {"line":3247,"text":"\tclosingPrefix string,"},
  {"line":3248,"text":") {"},
  {"line":3249,"text":"\tstartLc := span.Start"},
  {"line":3250,"text":"\tendLc := span.End"},
  {"line":3251,"text":"\tstartPos := f.converters.LineAndCharacterToPosition(file, span.Start)"},
  {"line":3252,"text":"\tendPos := f.converters.LineAndCharacterToPosition(file, span.End)"},
  {"line":3255,"text":"\tlineStarts := computeLineStarts(file.content)"},
  {"line":3258,"text":"\tcontextStart := int(startPos)"},
  {"line":3259,"text":"\tcontextEnd := int(endPos)"},
  {"line":3262,"text":"\tfor contextStart > 0 && file.content[contextStart-1] != '\\n' && file.content[contextStart-1] != '\\r' {"},
  {"line":3263,"text":"\t\tcontextStart--"},
  {"line":3264,"text":"\t}"},
  {"line":3267,"text":"\tfor contextEnd < len(file.content) && file.content[contextEnd] != '\\n' && file.content[contextEnd] != '\\r' {"},
  {"line":3268,"text":"\t\tcontextEnd++"},
  {"line":3269,"text":"\t}"},
  {"line":3272,"text":"\tcontextStartLine := int(startLc.Line)"},
  {"line":3273,"text":"\tcontextEndLine := int(endLc.Line)"},
  {"line":3276,"text":"\tlineNumWidth := len(strconv.Itoa(contextEndLine+1)) + 2"},
  {"line":3278,"text":"\tresult.WriteString(fmt.Sprintf(\"%s╭ %s:%d:%d-%d:%d\\n\", prefix, file.fileName, startLc.Line+1, startLc.Character+1, endLc.Line+1, endLc.Character+1))"},
  {"line":3280,"text":"\tfor lineNum := contextStartLine; lineNum <= contextEndLine; lineNum++ {"},
  {"line":3281,"text":"\t\tlineStart := lineStarts[lineNum]"},
  {"line":3282,"text":"\t\tlineEnd := len(file.content)"},
  {"line":3283,"text":"\t\tif lineNum+1 < len(lineStarts) {"},
  {"line":3284,"text":"\t\t\tlineEnd = lineStarts[lineNum+1]"},
  {"line":3285,"text":"\t\t}"},
  {"line":3288,"text":"\t\tlineContent := file.content[lineStart:lineEnd]"},
  {"line":3289,"text":"\t\tlineContent = strings.TrimRight(lineContent, \"\\r\\n\")"},
  {"line":3292,"text":"\t\tlineNumStr := fmt.Sprintf(\"%d:\", lineNum+1)"},
  {"line":3293,"text":"\t\tpaddedLineNum := strings.Repeat(\" \", lineNumWidth-len(lineNumStr)-1) + lineNumStr"},
  {"line":3294,"text":"\t\tif lineContent == \"\" {"},
  {"line":3295,"text":"\t\t\tresult.WriteString(fmt.Sprintf(\"%s│ %s\\n\", prefix, paddedLineNum))"},
  {"line":3296,"text":"\t\t} else {"},
  {"line":3297,"text":"\t\t\tresult.WriteString(fmt.Sprintf(\"%s│ %s %s\\n\", prefix, paddedLineNum, lineContent))"},
  {"line":3298,"text":"\t\t}"},
  {"line":3301,"text":"\t\tif lineNum >= int(startLc.Line) && lineNum <= int(endLc.Line) {"},
  {"line":3302,"text":"\t\t\tselStart := 0"},
  {"line":3303,"text":"\t\t\tselEnd := len(lineContent)"},
  {"line":3305,"text":"\t\t\tif lineNum == int(startLc.Line) {"},
  {"line":3306,"text":"\t\t\t\tselStart = int(startLc.Character)"},
  {"line":3307,"text":"\t\t\t}"},
  {"line":3308,"text":"\t\t\tif lineNum == int(endLc.Line) {"},
  {"line":3309,"text":"\t\t\t\tselEnd = int(endLc.Character)"},
  {"line":3310,"text":"\t\t\t}"},
  {"line":3313,"text":"\t\t\tisEmpty := startLc.Line == endLc.Line && startLc.Character == endLc.Character"},
  {"line":3314,"text":"\t\t\tif isEmpty {"},
  {"line":3316,"text":"\t\t\t\tpadding := strings.Repeat(\" \", lineNumWidth+selStart)"},
  {"line":3317,"text":"\t\t\t\tresult.WriteString(fmt.Sprintf(\"%s│ %s<\\n\", prefix, padding))"},
  {"line":3318,"text":"\t\t\t} else {"},
  {"line":3320,"text":"\t\t\t\tselLength := selEnd - selStart"},
  {"line":3321,"text":"\t\t\t\tselLength = max(selLength, 1) // Trim to actual content on the line"},
  {"line":3322,"text":"\t\t\t\tif lineNum < int(endLc.Line) {"},
  {"line":3324,"text":"\t\t\t\t\tif selEnd > len(lineContent) {"},
  {"line":3325,"text":"\t\t\t\t\t\tselEnd = len(lineContent)"},
  {"line":3326,"text":"\t\t\t\t\t\tselLength = selEnd - selStart"},
  {"line":3327,"text":"\t\t\t\t\t}"},
  {"line":3328,"text":"\t\t\t\t}"},
  {"line":3330,"text":"\t\t\t\tpadding := strings.Repeat(\" \", lineNumWidth+selStart)"},
  {"line":3331,"text":"\t\t\t\tcarets := strings.Repeat(\"^\", selLength)"},
  {"line":3332,"text":"\t\t\t\tresult.WriteString(fmt.Sprintf(\"%s│ %s%s\\n\", prefix, padding, carets))"},
  {"line":3333,"text":"\t\t\t}"},
  {"line":3334,"text":"\t\t}"},
  {"line":3335,"text":"\t}"},
  {"line":3337,"text":"\tresult.WriteString(closingPrefix)"},
  {"line":3338,"text":"\tresult.WriteString(\"╰\\n\")"},
  {"line":3339,"text":"}"},
  {"line":3341,"text":"func computeLineStarts(content string) []int {"},
  {"line":3342,"text":"\tlineStarts := []int{0}"},
  {"line":3343,"text":"\tfor i, ch := range content {"},
  {"line":3344,"text":"\t\tif ch == '\\n' {"},
  {"line":3345,"text":"\t\t\tlineStarts = append(lineStarts, i+1)"},
  {"line":3346,"text":"\t\t}"},
  {"line":3347,"text":"\t}"},
  {"line":3348,"text":"\treturn lineStarts"},
  {"line":3349,"text":"}"},
  {"line":3351,"text":"func formatCallHierarchyItemSpans("},
  {"line":3352,"text":"\tf *FourslashTest,"},
  {"line":3353,"text":"\tfile *scriptInfo,"},
  {"line":3354,"text":"\tresult *strings.Builder,"},
  {"line":3355,"text":"\tspans []lsproto.Range,"},
  {"line":3356,"text":"\tprefix string,"},
  {"line":3357,"text":"\ttrailingPrefix string,"},
  {"line":3358,"text":") {"},
  {"line":3359,"text":"\tfor i, span := range spans {"},
  {"line":3360,"text":"\t\tclosingPrefix := prefix"},
  {"line":3361,"text":"\t\tif i == len(spans)-1 {"},
  {"line":3362,"text":"\t\t\tclosingPrefix = trailingPrefix"},
  {"line":3363,"text":"\t\t}"},
  {"line":3364,"text":"\t\tformatCallHierarchyItemSpan(f, file, result, span, prefix, closingPrefix)"},
  {"line":3365,"text":"\t}"},
  {"line":3366,"text":"}"},
  {"line":3368,"text":"func (f *FourslashTest) VerifyBaselineDocumentHighlights("},
  {"line":3369,"text":"\tt *testing.T,"},
  {"line":3370,"text":"\tpreferences *lsutil.UserPreferences,"},
  {"line":3371,"text":"\tmarkerOrRangeOrNames ...MarkerOrRangeOrName,"},
  {"line":3372,"text":") {"},
  {"line":3373,"text":"\tf.VerifyBaselineDocumentHighlightsWithOptions(t, preferences, nil /*filesToSearch*/, markerOrRangeOrNames...)"},
  {"line":3374,"text":"}"},
  {"line":3376,"text":"func (f *FourslashTest) VerifyBaselineDocumentHighlightsWithOptions("},
  {"line":3377,"text":"\tt *testing.T,"},
  {"line":3378,"text":"\tpreferences *lsutil.UserPreferences,"},
  {"line":3379,"text":"\tfilesToSearch []string,"},
  {"line":3380,"text":"\tmarkerOrRangeOrNames ...MarkerOrRangeOrName,"},
  {"line":3381,"text":") {"},
  {"line":3382,"text":"\tvar markerOrRanges []MarkerOrRange"},
  {"line":3383,"text":"\tfor _, markerOrRangeOrName := range markerOrRangeOrNames {"},
  {"line":3384,"text":"\t\tswitch markerOrNameOrRange := markerOrRangeOrName.(type) {"},
  {"line":3385,"text":"\t\tcase string:"},
  {"line":3386,"text":"\t\t\tmarker, ok := f.testData.MarkerPositions[markerOrNameOrRange]"},
  {"line":3387,"text":"\t\t\tif !ok {"},
  {"line":3388,"text":"\t\t\t\tt.Fatalf(\"Marker '%s' not found\", markerOrNameOrRange)"},
  {"line":3389,"text":"\t\t\t}"},
  {"line":3390,"text":"\t\t\tmarkerOrRanges = append(markerOrRanges, marker)"},
  {"line":3391,"text":"\t\tcase *Marker:"},
  {"line":3392,"text":"\t\t\tmarkerOrRanges = append(markerOrRanges, markerOrNameOrRange)"},
  {"line":3393,"text":"\t\tcase *RangeMarker:"},
  {"line":3394,"text":"\t\t\tmarkerOrRanges = append(markerOrRanges, markerOrNameOrRange)"},
  {"line":3395,"text":"\t\tdefault:"},
  {"line":3396,"text":"\t\t\tt.Fatalf(\"Invalid marker or range type: %T. Expected string, *Marker, or *RangeMarker.\", markerOrNameOrRange)"},
  {"line":3397,"text":"\t\t}"},
  {"line":3398,"text":"\t}"},
  {"line":3400,"text":"\tf.verifyBaselineDocumentHighlights(t, preferences, filesToSearch, markerOrRanges)"},
  {"line":3401,"text":"}"},
  {"line":3403,"text":"func (f *FourslashTest) verifyBaselineDocumentHighlights("},
  {"line":3404,"text":"\tt *testing.T,"},
  {"line":3405,"text":"\tpreferences *lsutil.UserPreferences,"},
  {"line":3406,"text":"\tfilesToSearch []string,"},
  {"line":3407,"text":"\tmarkerOrRanges []MarkerOrRange,"},
  {"line":3408,"text":") {"},
  {"line":3409,"text":"\tfor _, markerOrRange := range markerOrRanges {"},
  {"line":3410,"text":"\t\tf.goToMarker(t, markerOrRange)"},
  {"line":3412,"text":"\t\tvar spans []lsproto.Location"},
  {"line":3413,"text":"\t\tvar header string"},
  {"line":3415,"text":"\t\tif len(filesToSearch) > 0 {"},
  {"line":3417,"text":"\t\t\tvar searchURIs []lsproto.DocumentUri"},
  {"line":3418,"text":"\t\t\tfor _, file := range filesToSearch {"},
  {"line":3419,"text":"\t\t\t\tsearchURIs = append(searchURIs, lsconv.FileNameToDocumentURI(file))"},
  {"line":3420,"text":"\t\t\t}"},
  {"line":3422,"text":"\t\t\tparams := &lsproto.MultiDocumentHighlightParams{"},
  {"line":3423,"text":"\t\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":3424,"text":"\t\t\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":3425,"text":"\t\t\t\t},"},
  {"line":3426,"text":"\t\t\t\tPosition:      f.currentCaretPosition,"},
  {"line":3427,"text":"\t\t\t\tFilesToSearch: searchURIs,"},
  {"line":3428,"text":"\t\t\t}"},
  {"line":3429,"text":"\t\t\tresult := sendRequest(t, f, lsproto.CustomTextDocumentMultiDocumentHighlightInfo, params)"},
  {"line":3430,"text":"\t\t\tmultiHighlights := result.MultiDocumentHighlights"},
  {"line":3431,"text":"\t\t\tif multiHighlights == nil {"},
  {"line":3432,"text":"\t\t\t\tmultiHighlights = &[]*lsproto.MultiDocumentHighlight{}"},
  {"line":3433,"text":"\t\t\t}"},
  {"line":3435,"text":"\t\t\tfor _, mh := range *multiHighlights {"},
  {"line":3436,"text":"\t\t\t\tfor _, h := range mh.Highlights {"},
  {"line":3437,"text":"\t\t\t\t\tspans = append(spans, lsproto.Location{"},
  {"line":3438,"text":"\t\t\t\t\t\tUri:   mh.Uri,"},
  {"line":3439,"text":"\t\t\t\t\t\tRange: h.Range,"},
  {"line":3440,"text":"\t\t\t\t\t})"},
  {"line":3441,"text":"\t\t\t\t}"},
  {"line":3442,"text":"\t\t\t}"},
  {"line":3444,"text":"\t\t\tvar sb strings.Builder"},
  {"line":3445,"text":"\t\t\tsb.WriteString(\"// filesToSearch:\\n\")"},
  {"line":3446,"text":"\t\t\tfor _, file := range filesToSearch {"},
  {"line":3447,"text":"\t\t\t\tfmt.Fprintf(&sb, \"//   %s\\n\", file)"},
  {"line":3448,"text":"\t\t\t}"},
  {"line":3449,"text":"\t\t\tsb.WriteString(\"\\n\")"},
  {"line":3450,"text":"\t\t\theader = sb.String()"},
  {"line":3451,"text":"\t\t} else {"},
  {"line":3453,"text":"\t\t\tparams := &lsproto.DocumentHighlightParams{"},
  {"line":3454,"text":"\t\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":3455,"text":"\t\t\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":3456,"text":"\t\t\t\t},"},
  {"line":3457,"text":"\t\t\t\tPosition: f.currentCaretPosition,"},
  {"line":3458,"text":"\t\t\t}"},
  {"line":3459,"text":"\t\t\tresult := sendRequest(t, f, lsproto.TextDocumentDocumentHighlightInfo, params)"},
  {"line":3460,"text":"\t\t\thighlights := result.DocumentHighlights"},
  {"line":3461,"text":"\t\t\tif highlights == nil {"},
  {"line":3462,"text":"\t\t\t\thighlights = &[]*lsproto.DocumentHighlight{}"},
  {"line":3463,"text":"\t\t\t}"},
  {"line":3465,"text":"\t\t\tfor _, h := range *highlights {"},
  {"line":3466,"text":"\t\t\t\tspans = append(spans, lsproto.Location{"},
  {"line":3467,"text":"\t\t\t\t\tUri:   lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":3468,"text":"\t\t\t\t\tRange: h.Range,"},
  {"line":3469,"text":"\t\t\t\t})"},
  {"line":3470,"text":"\t\t\t}"},
  {"line":3471,"text":"\t\t}"},
  {"line":3474,"text":"\t\tf.addResultToBaseline(t, documentHighlightsCmd, header+f.getBaselineForLocationsWithFileContents(spans, baselineFourslashLocationsOptions{"},
  {"line":3475,"text":"\t\t\tmarker:     markerOrRange,"},
  {"line":3476,"text":"\t\t\tmarkerName: \"/*HIGHLIGHTS*/\","},
  {"line":3477,"text":"\t\t}))"},
  {"line":3478,"text":"\t}"},
  {"line":3479,"text":"}"},
  {"line":3482,"text":"func (f *FourslashTest) lookupMarkersOrGetRanges(t *testing.T, markers []string) []MarkerOrRange {"},
  {"line":3483,"text":"\tvar referenceLocations []MarkerOrRange"},
  {"line":3484,"text":"\tif len(markers) == 0 {"},
  {"line":3485,"text":"\t\treferenceLocations = core.Map(f.testData.Ranges, func(r *RangeMarker) MarkerOrRange { return r })"},
  {"line":3486,"text":"\t} else {"},
  {"line":3487,"text":"\t\treferenceLocations = core.Map(markers, func(markerName string) MarkerOrRange {"},
  {"line":3488,"text":"\t\t\tmarker, ok := f.testData.MarkerPositions[markerName]"},
  {"line":3489,"text":"\t\t\tif !ok {"},
  {"line":3490,"text":"\t\t\t\tt.Fatalf(\"Marker '%s' not found\", markerName)"},
  {"line":3491,"text":"\t\t\t}"},
  {"line":3492,"text":"\t\t\treturn marker"},
  {"line":3493,"text":"\t\t})"},
  {"line":3494,"text":"\t}"},
  {"line":3495,"text":"\treturn referenceLocations"},
  {"line":3496,"text":"}"},
  {"line":3505,"text":"func roundtripThroughJson[T any](value any) (T, error) {"},
  {"line":3506,"text":"\tvar result T"},
  {"line":3507,"text":"\tbytes, err := json.Marshal(value)"},
  {"line":3508,"text":"\tif err != nil {"},
  {"line":3509,"text":"\t\treturn result, fmt.Errorf(\"failed to marshal value to JSON: %w\", err)"},
  {"line":3510,"text":"\t}"},
  {"line":3511,"text":"\tif err := json.Unmarshal(bytes, &result); err != nil {"},
  {"line":3512,"text":"\t\treturn result, fmt.Errorf(\"failed to unmarshal value from JSON: %w\", err)"},
  {"line":3513,"text":"\t}"},
  {"line":3514,"text":"\treturn result, nil"},
  {"line":3515,"text":"}"},
  {"line":3518,"text":"func (f *FourslashTest) Insert(t *testing.T, text string) {"},
  {"line":3519,"text":"\tt.Helper()"},
  {"line":3520,"text":"\tf.baselineState(t)"},
  {"line":3521,"text":"\tf.typeText(t, text)"},
  {"line":3522,"text":"}"},
  {"line":3525,"text":"func (f *FourslashTest) InsertLine(t *testing.T, text string) {"},
  {"line":3526,"text":"\tt.Helper()"},
  {"line":3527,"text":"\tf.baselineState(t)"},
  {"line":3528,"text":"\tf.typeText(t, text+\"\\n\")"},
  {"line":3529,"text":"}"},
  {"line":3532,"text":"func (f *FourslashTest) Backspace(t *testing.T, count int) {"},
  {"line":3533,"text":"\tscript := f.getScriptInfo(f.activeFilename)"},
  {"line":3534,"text":"\toffset := int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition))"},
  {"line":3535,"text":"\tf.baselineState(t)"},
  {"line":3537,"text":"\tfor range count {"},
  {"line":3538,"text":"\t\toffset--"},
  {"line":3539,"text":"\t\tf.editScriptAndUpdateMarkers(t, f.activeFilename, offset, offset+1, \"\")"},
  {"line":3540,"text":"\t\tf.currentCaretPosition = f.converters.PositionToLineAndCharacter(script, core.TextPos(offset))"},
  {"line":3542,"text":"\t}"},
  {"line":3545,"text":"}"},
  {"line":3548,"text":"func (f *FourslashTest) DeleteAtCaret(t *testing.T, count int) {"},
  {"line":3549,"text":"\tscript := f.getScriptInfo(f.activeFilename)"},
  {"line":3550,"text":"\toffset := int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition))"},
  {"line":3551,"text":"\tf.baselineState(t)"},
  {"line":3553,"text":"\tfor range count {"},
  {"line":3554,"text":"\t\tf.editScriptAndUpdateMarkers(t, f.activeFilename, offset, offset+1, \"\")"},
  {"line":3556,"text":"\t}"},
  {"line":3557,"text":"}"},
  {"line":3560,"text":"func (f *FourslashTest) Paste(t *testing.T, text string) {"},
  {"line":3561,"text":"\tscript := f.getScriptInfo(f.activeFilename)"},
  {"line":3562,"text":"\tstart := int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition))"},
  {"line":3563,"text":"\tf.baselineState(t)"},
  {"line":3564,"text":"\tf.editScriptAndUpdateMarkers(t, f.activeFilename, start, start, text)"},
  {"line":3567,"text":"\tif f.stateEnableFormatting {"},
  {"line":3568,"text":"\t\tresult := sendRequestAndBaselineWorker(t, f, lsproto.TextDocumentRangeFormattingInfo, &lsproto.DocumentRangeFormattingParams{"},
  {"line":3569,"text":"\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":3570,"text":"\t\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":3571,"text":"\t\t\t},"},
  {"line":3572,"text":"\t\t\tRange: lsproto.Range{"},
  {"line":3573,"text":"\t\t\t\tStart: f.currentCaretPosition,"},
  {"line":3574,"text":"\t\t\t\tEnd:   f.converters.PositionToLineAndCharacter(script, core.TextPos(start+len(text))),"},
  {"line":3575,"text":"\t\t\t},"},
  {"line":3576,"text":"\t\t\tOptions: f.userPreferences.FormatCodeSettings.ToLSFormatOptions(),"},
  {"line":3577,"text":"\t\t}, false)"},
  {"line":3578,"text":"\t\tif result.TextEdits != nil {"},
  {"line":3579,"text":"\t\t\tf.applyTextEdits(t, *result.TextEdits)"},
  {"line":3580,"text":"\t\t}"},
  {"line":3581,"text":"\t}"},
  {"line":3583,"text":"}"},
  {"line":3586,"text":"func (f *FourslashTest) ReplaceLine(t *testing.T, lineIndex int, text string) {"},
  {"line":3587,"text":"\tf.baselineState(t)"},
  {"line":3588,"text":"\tf.selectLine(t, lineIndex)"},
  {"line":3589,"text":"\tf.typeText(t, text)"},
  {"line":3590,"text":"}"},
  {"line":3592,"text":"func (f *FourslashTest) selectLine(t *testing.T, lineIndex int) {"},
  {"line":3593,"text":"\tscript := f.getScriptInfo(f.activeFilename)"},
  {"line":3594,"text":"\tstart := script.lineMap.LineStarts[lineIndex]"},
  {"line":3595,"text":"\tvar end core.TextPos"},
  {"line":3596,"text":"\tif lineIndex+1 >= len(script.lineMap.LineStarts) {"},
  {"line":3597,"text":"\t\tend = core.TextPos(len(script.content))"},
  {"line":3598,"text":"\t} else {"},
  {"line":3599,"text":"\t\tend = script.lineMap.LineStarts[lineIndex+1] - 1"},
  {"line":3600,"text":"\t}"},
  {"line":3601,"text":"\tf.selectRange(t, core.NewTextRange(int(start), int(end)))"},
  {"line":3602,"text":"}"},
  {"line":3604,"text":"func (f *FourslashTest) selectRange(t *testing.T, textRange core.TextRange) {"},
  {"line":3605,"text":"\tscript := f.getScriptInfo(f.activeFilename)"},
  {"line":3606,"text":"\tstart := f.converters.PositionToLineAndCharacter(script, core.TextPos(textRange.Pos()))"},
  {"line":3607,"text":"\tend := f.converters.PositionToLineAndCharacter(script, core.TextPos(textRange.End()))"},
  {"line":3608,"text":"\tf.goToPosition(t, start)"},
  {"line":3609,"text":"\tf.selectionEnd = &end"},
  {"line":3610,"text":"}"},
  {"line":3612,"text":"func (f *FourslashTest) getSelection() core.TextRange {"},
  {"line":3613,"text":"\tscript := f.getScriptInfo(f.activeFilename)"},
  {"line":3614,"text":"\tif f.selectionEnd == nil {"},
  {"line":3615,"text":"\t\treturn core.NewTextRange("},
  {"line":3616,"text":"\t\t\tint(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition)),"},
  {"line":3617,"text":"\t\t\tint(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition)),"},
  {"line":3618,"text":"\t\t)"},
  {"line":3619,"text":"\t}"},
  {"line":3620,"text":"\treturn core.NewTextRange("},
  {"line":3621,"text":"\t\tint(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition)),"},
  {"line":3622,"text":"\t\tint(f.converters.LineAndCharacterToPosition(script, *f.selectionEnd)),"},
  {"line":3623,"text":"\t)"},
  {"line":3624,"text":"}"},
  {"line":3627,"text":"func (f *FourslashTest) applyTextEdits(t *testing.T, edits []*lsproto.TextEdit) int {"},
  {"line":3628,"text":"\tscript := f.getScriptInfo(f.activeFilename)"},
  {"line":3629,"text":"\tslices.SortFunc(edits, func(a, b *lsproto.TextEdit) int {"},
  {"line":3630,"text":"\t\taStart := f.converters.LineAndCharacterToPosition(script, a.Range.Start)"},
  {"line":3631,"text":"\t\tbStart := f.converters.LineAndCharacterToPosition(script, b.Range.Start)"},
  {"line":3632,"text":"\t\treturn int(aStart) - int(bStart)"},
  {"line":3633,"text":"\t})"},
  {"line":3635,"text":"\ttotalOffset := 0"},
  {"line":3636,"text":"\tcurrentCaretPosition := int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition))"},
  {"line":3638,"text":"\tfor i := len(edits) - 1; i >= 0; i-- {"},
  {"line":3639,"text":"\t\tedit := edits[i]"},
  {"line":3640,"text":"\t\tstart := int(f.converters.LineAndCharacterToPosition(script, edit.Range.Start))"},
  {"line":3641,"text":"\t\tend := int(f.converters.LineAndCharacterToPosition(script, edit.Range.End))"},
  {"line":3642,"text":"\t\tf.editScriptAndUpdateMarkers(t, f.activeFilename, start, end, edit.NewText)"},
  {"line":3644,"text":"\t\tdelta := len(edit.NewText) - (end - start)"},
  {"line":3645,"text":"\t\tif start <= currentCaretPosition {"},
  {"line":3646,"text":"\t\t\tif end <= currentCaretPosition {"},
  {"line":3648,"text":"\t\t\t\tcurrentCaretPosition += delta"},
  {"line":3649,"text":"\t\t\t} else {"},
  {"line":3651,"text":"\t\t\t\tcurrentCaretPosition = start"},
  {"line":3652,"text":"\t\t\t}"},
  {"line":3653,"text":"\t\t}"},
  {"line":3654,"text":"\t\ttotalOffset += delta"},
  {"line":3655,"text":"\t}"},
  {"line":3656,"text":"\tf.currentCaretPosition = f.converters.PositionToLineAndCharacter(script, core.TextPos(currentCaretPosition))"},
  {"line":3657,"text":"\treturn totalOffset"},
  {"line":3658,"text":"}"},
  {"line":3660,"text":"func (f *FourslashTest) Replace(t *testing.T, start int, length int, text string) {"},
  {"line":3661,"text":"\tf.baselineState(t)"},
  {"line":3662,"text":"\tf.replaceWorker(t, start, length, text)"},
  {"line":3663,"text":"}"},
  {"line":3665,"text":"func (f *FourslashTest) replaceWorker(t *testing.T, start int, length int, text string) {"},
  {"line":3666,"text":"\tt.Helper()"},
  {"line":3667,"text":"\tf.editScriptAndUpdateMarkers(t, f.activeFilename, start, start+length, text)"},
  {"line":3669,"text":"}"},
  {"line":3672,"text":"func (f *FourslashTest) typeText(t *testing.T, text string) {"},
  {"line":3674,"text":"\tf.reportFormatOnTypeCrash = false"},
  {"line":3675,"text":"\tdefer func() {"},
  {"line":3676,"text":"\t\tf.reportFormatOnTypeCrash = true"},
  {"line":3677,"text":"\t}()"},
  {"line":3679,"text":"\tscript := f.getScriptInfo(f.activeFilename)"},
  {"line":3680,"text":"\tselection := f.getSelection()"},
  {"line":3681,"text":"\tf.replaceWorker(t, selection.Pos(), selection.End()-selection.Pos(), \"\")"},
  {"line":3683,"text":"\ttotalSize := 0"},
  {"line":3685,"text":"\toffset := int(f.converters.LineAndCharacterToPosition(script, f.currentCaretPosition))"},
  {"line":3686,"text":"\tfor totalSize < len(text) {"},
  {"line":3687,"text":"\t\tr, size := utf8.DecodeRuneInString(text[totalSize:])"},
  {"line":3688,"text":"\t\tf.editScriptAndUpdateMarkers(t, f.activeFilename, offset, offset, string(r))"},
  {"line":3690,"text":"\t\ttotalSize += size"},
  {"line":3691,"text":"\t\toffset += size"},
  {"line":3692,"text":"\t\tf.currentCaretPosition = f.converters.PositionToLineAndCharacter(script, core.TextPos(offset))"},
  {"line":3695,"text":"\t\tif f.stateEnableFormatting {"},
  {"line":3696,"text":"\t\t\tresult := sendRequestAndBaselineWorker(t, f, lsproto.TextDocumentOnTypeFormattingInfo, &lsproto.DocumentOnTypeFormattingParams{"},
  {"line":3697,"text":"\t\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":3698,"text":"\t\t\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":3699,"text":"\t\t\t\t},"},
  {"line":3700,"text":"\t\t\t\tPosition: f.currentCaretPosition,"},
  {"line":3701,"text":"\t\t\t\tCh:       string(r),"},
  {"line":3702,"text":"\t\t\t\tOptions:  f.userPreferences.FormatCodeSettings.ToLSFormatOptions(),"},
  {"line":3703,"text":"\t\t\t}, false)"},
  {"line":3704,"text":"\t\t\tif result.TextEdits != nil {"},
  {"line":3705,"text":"\t\t\t\toffset += f.applyTextEdits(t, *result.TextEdits)"},
  {"line":3706,"text":"\t\t\t}"},
  {"line":3707,"text":"\t\t}"},
  {"line":3708,"text":"\t}"},
  {"line":3711,"text":"}"},
  {"line":3715,"text":"func (f *FourslashTest) editScriptAndUpdateMarkers(t *testing.T, fileName string, editStart int, editEnd int, newText string) {"},
  {"line":3716,"text":"\tf.editScriptAndUpdateMarkersWorker(t, fileName, []core.TextChange{{TextRange: core.NewTextRange(editStart, editEnd), NewText: newText}})"},
  {"line":3717,"text":"}"},
  {"line":3719,"text":"func (f *FourslashTest) editScriptAndUpdateMarkersWorker(t *testing.T, fileName string, changes []core.TextChange) {"},
  {"line":3721,"text":"\tsortedChanges := slices.Clone(changes)"},
  {"line":3722,"text":"\tslices.SortFunc(sortedChanges, func(a, b core.TextChange) int {"},
  {"line":3723,"text":"\t\treturn a.Pos() - b.Pos()"},
  {"line":3724,"text":"\t})"},
  {"line":3727,"text":"\tfor i := len(sortedChanges) - 1; i >= 0; i-- {"},
  {"line":3728,"text":"\t\tchange := sortedChanges[i]"},
  {"line":3729,"text":"\t\teditStart := change.Pos()"},
  {"line":3730,"text":"\t\teditEnd := change.End()"},
  {"line":3731,"text":"\t\tscript := f.editScript(t, fileName, change)"},
  {"line":3732,"text":"\t\tfor _, marker := range f.testData.Markers {"},
  {"line":3733,"text":"\t\t\tif marker.FileName() == fileName {"},
  {"line":3734,"text":"\t\t\t\tmarker.Position = updatePosition(marker.Position, editStart, editEnd, change.NewText)"},
  {"line":3735,"text":"\t\t\t\tmarker.LSPosition = f.converters.PositionToLineAndCharacter(script, core.TextPos(marker.Position))"},
  {"line":3736,"text":"\t\t\t}"},
  {"line":3737,"text":"\t\t}"},
  {"line":3738,"text":"\t\tfor _, rangeMarker := range f.testData.Ranges {"},
  {"line":3739,"text":"\t\t\tif rangeMarker.FileName() == fileName {"},
  {"line":3740,"text":"\t\t\t\tstart := updatePosition(rangeMarker.Range.Pos(), editStart, editEnd, change.NewText)"},
  {"line":3741,"text":"\t\t\t\tend := updatePosition(rangeMarker.Range.End(), editStart, editEnd, change.NewText)"},
  {"line":3742,"text":"\t\t\t\trangeMarker.Range = core.NewTextRange(start, end)"},
  {"line":3743,"text":"\t\t\t\trangeMarker.LSRange = f.converters.ToLSPRange(script, rangeMarker.Range)"},
  {"line":3744,"text":"\t\t\t}"},
  {"line":3745,"text":"\t\t}"},
  {"line":3746,"text":"\t}"},
  {"line":3747,"text":"\tf.rangesByText = nil"},
  {"line":3748,"text":"}"},
  {"line":3750,"text":"func updatePosition(pos int, editStart int, editEnd int, newText string) int {"},
  {"line":3751,"text":"\tif pos <= editStart {"},
  {"line":3752,"text":"\t\treturn pos"},
  {"line":3753,"text":"\t}"},
  {"line":3755,"text":"\tif pos < editEnd {"},
  {"line":3756,"text":"\t\treturn -1"},
  {"line":3757,"text":"\t}"},
  {"line":3758,"text":"\treturn pos + len(newText) - (editEnd - editStart)"},
  {"line":3759,"text":"}"},
  {"line":3761,"text":"func (f *FourslashTest) editScript(t *testing.T, fileName string, change core.TextChange) *scriptInfo {"},
  {"line":3762,"text":"\tscript := f.getOrLoadScriptInfo(fileName)"},
  {"line":3763,"text":"\tif script == nil {"},
  {"line":3764,"text":"\t\tpanic(fmt.Sprintf(\"Script info for file %s not found\", fileName))"},
  {"line":3765,"text":"\t}"},
  {"line":3767,"text":"\tchangeRange := f.converters.ToLSPRange(script, core.NewTextRange(change.Pos(), change.End()))"},
  {"line":3768,"text":"\tscript.editContent(change)"},
  {"line":3769,"text":"\tif err := f.vfs.WriteFile(fileName, script.content); err != nil {"},
  {"line":3770,"text":"\t\tt.Fatalf(\"failed to write to VFS for %s: %v\", fileName, err)"},
  {"line":3771,"text":"\t}"},
  {"line":3772,"text":"\tsendNotification(t, f, lsproto.TextDocumentDidChangeInfo, &lsproto.DidChangeTextDocumentParams{"},
  {"line":3773,"text":"\t\tTextDocument: lsproto.VersionedTextDocumentIdentifier{"},
  {"line":3774,"text":"\t\t\tUri:     lsconv.FileNameToDocumentURI(fileName),"},
  {"line":3775,"text":"\t\t\tVersion: script.version,"},
  {"line":3776,"text":"\t\t},"},
  {"line":3777,"text":"\t\tContentChanges: []lsproto.TextDocumentContentChangePartialOrWholeDocument{{"},
  {"line":3778,"text":"\t\t\tPartial: &lsproto.TextDocumentContentChangePartial{"},
  {"line":3779,"text":"\t\t\t\tRange: changeRange,"},
  {"line":3780,"text":"\t\t\t\tText:  change.NewText,"},
  {"line":3781,"text":"\t\t\t},"},
  {"line":3782,"text":"\t\t}},"},
  {"line":3783,"text":"\t})"},
  {"line":3784,"text":"\treturn script"},
  {"line":3785,"text":"}"},
  {"line":3787,"text":"func (f *FourslashTest) getScriptInfo(fileName string) *scriptInfo {"},
  {"line":3788,"text":"\treturn f.scriptInfos[fileName]"},
  {"line":3789,"text":"}"},
  {"line":3791,"text":"func (f *FourslashTest) getOrLoadScriptInfo(fileName string) *scriptInfo {"},
  {"line":3792,"text":"\tif script := f.getScriptInfo(fileName); script != nil {"},
  {"line":3793,"text":"\t\treturn script"},
  {"line":3794,"text":"\t}"},
  {"line":3795,"text":"\tif content, ok := f.vfs.ReadFile(fileName); ok {"},
  {"line":3796,"text":"\t\tscript := newScriptInfo(fileName, content)"},
  {"line":3797,"text":"\t\tf.scriptInfos[fileName] = script"},
  {"line":3798,"text":"\t\treturn script"},
  {"line":3799,"text":"\t}"},
  {"line":3800,"text":"\treturn nil"},
  {"line":3801,"text":"}"},
  {"line":3804,"text":"func (f *FourslashTest) VerifyQuickInfoAt(t *testing.T, marker string, expectedText string, expectedDocumentation string) {"},
  {"line":3805,"text":"\tf.GoToMarker(t, marker)"},
  {"line":3806,"text":"\thover := f.getQuickInfoAtCurrentPosition(t)"},
  {"line":3807,"text":"\tf.verifyHoverContent(t, hover.Contents, expectedText, expectedDocumentation, f.getCurrentPositionPrefix())"},
  {"line":3808,"text":"}"},
  {"line":3810,"text":"func (f *FourslashTest) getQuickInfoAtCurrentPosition(t *testing.T) *lsproto.Hover {"},
  {"line":3811,"text":"\tparams := &lsproto.HoverParams{"},
  {"line":3812,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":3813,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":3814,"text":"\t\t},"},
  {"line":3815,"text":"\t\tPosition: f.currentCaretPosition,"},
  {"line":3816,"text":"\t}"},
  {"line":3817,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentHoverInfo, params)"},
  {"line":3818,"text":"\tif result.Hover == nil {"},
  {"line":3819,"text":"\t\tt.Fatalf(\"Expected hover result at marker '%s' but got nil\", *f.lastKnownMarkerName)"},
  {"line":3820,"text":"\t}"},
  {"line":3821,"text":"\treturn result.Hover"},
  {"line":3822,"text":"}"},
  {"line":3824,"text":"func (f *FourslashTest) verifyHoverContent("},
  {"line":3825,"text":"\tt *testing.T,"},
  {"line":3826,"text":"\tactual lsproto.MarkupContentOrStringOrMarkedStringWithLanguageOrMarkedStrings,"},
  {"line":3827,"text":"\texpectedText string,"},
  {"line":3828,"text":"\texpectedDocumentation string,"},
  {"line":3829,"text":"\tprefix string,"},
  {"line":3830,"text":") {"},
  {"line":3831,"text":"\tswitch {"},
  {"line":3832,"text":"\tcase actual.MarkupContent != nil:"},
  {"line":3833,"text":"\t\tf.verifyHoverMarkdown(t, actual.MarkupContent.Value, expectedText, expectedDocumentation, prefix)"},
  {"line":3834,"text":"\tdefault:"},
  {"line":3835,"text":"\t\tt.Fatalf(prefix+\"Expected markup content, got: %s\", cmp.Diff(actual, nil))"},
  {"line":3836,"text":"\t}"},
  {"line":3837,"text":"}"},
  {"line":3839,"text":"func (f *FourslashTest) verifyHoverMarkdown("},
  {"line":3840,"text":"\tt *testing.T,"},
  {"line":3841,"text":"\tactual string,"},
  {"line":3842,"text":"\texpectedText string,"},
  {"line":3843,"text":"\texpectedDocumentation string,"},
  {"line":3844,"text":"\tprefix string,"},
  {"line":3845,"text":") {"},
  {"line":3846,"text":"\texpected := fmt.Sprintf(\"```typescript\\n%s\\n```\\n%s\", expectedText, expectedDocumentation)"},
  {"line":3847,"text":"\tassertDeepEqual(t, actual, expected, prefix+\"Hover markdown content mismatch\")"},
  {"line":3848,"text":"}"},
  {"line":3850,"text":"func (f *FourslashTest) VerifyQuickInfoExists(t *testing.T) {"},
  {"line":3851,"text":"\tif isEmpty, _ := f.quickInfoIsEmpty(t); isEmpty {"},
  {"line":3852,"text":"\t\tt.Fatalf(\"Expected non-nil hover content at marker '%s'\", *f.lastKnownMarkerName)"},
  {"line":3853,"text":"\t}"},
  {"line":3854,"text":"}"},
  {"line":3856,"text":"func (f *FourslashTest) VerifyNotQuickInfoExists(t *testing.T) {"},
  {"line":3857,"text":"\tif isEmpty, hover := f.quickInfoIsEmpty(t); !isEmpty {"},
  {"line":3858,"text":"\t\tt.Fatalf(\"Expected empty hover content at marker '%s', got '%s'\", *f.lastKnownMarkerName, cmp.Diff(hover, nil))"},
  {"line":3859,"text":"\t}"},
  {"line":3860,"text":"}"},
  {"line":3862,"text":"func (f *FourslashTest) quickInfoIsEmpty(t *testing.T) (bool, *lsproto.Hover) {"},
  {"line":3863,"text":"\thover := f.getQuickInfoAtCurrentPosition(t)"},
  {"line":3864,"text":"\tif hover == nil ||"},
  {"line":3865,"text":"\t\t(hover.Contents.MarkupContent == nil && hover.Contents.MarkedStrings == nil && hover.Contents.String == nil) {"},
  {"line":3866,"text":"\t\treturn true, nil"},
  {"line":3867,"text":"\t}"},
  {"line":3868,"text":"\treturn false, hover"},
  {"line":3869,"text":"}"},
  {"line":3871,"text":"func (f *FourslashTest) VerifyQuickInfoIs(t *testing.T, expectedText string, expectedDocumentation string) {"},
  {"line":3872,"text":"\thover := f.getQuickInfoAtCurrentPosition(t)"},
  {"line":3873,"text":"\tf.verifyHoverContent(t, hover.Contents, expectedText, expectedDocumentation, f.getCurrentPositionPrefix())"},
  {"line":3874,"text":"}"},
  {"line":3876,"text":"func (f *FourslashTest) VerifyJsxClosingTag(t *testing.T, markersToNewText map[string]*string) {"},
  {"line":3877,"text":"\tfor marker, expectedText := range markersToNewText {"},
  {"line":3878,"text":"\t\tf.GoToMarker(t, marker)"},
  {"line":3879,"text":"\t\tparams := &lsproto.VsOnAutoInsertParams{"},
  {"line":3880,"text":"\t\t\tVSTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":3881,"text":"\t\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":3882,"text":"\t\t\t},"},
  {"line":3883,"text":"\t\t\tVSPosition: f.currentCaretPosition,"},
  {"line":3884,"text":"\t\t\tVSCh:       \">\","},
  {"line":3885,"text":"\t\t}"},
  {"line":3887,"text":"\t\trequestResult := sendRequest(t, f, lsproto.TextDocumentVSOnAutoInsertInfo, params)"},
  {"line":3889,"text":"\t\tvar actualText *string"},
  {"line":3890,"text":"\t\tif item := requestResult.VsOnAutoInsertResponseItem; item != nil && item.VSTextEdit != nil {"},
  {"line":3891,"text":"\t\t\tnewText := item.VSTextEdit.NewText"},
  {"line":3892,"text":"\t\t\tif item.VSTextEditFormat == lsproto.InsertTextFormatSnippet {"},
  {"line":3893,"text":"\t\t\t\tvar ok bool"},
  {"line":3894,"text":"\t\t\t\tnewText, ok = strings.CutPrefix(newText, \"$0\")"},
  {"line":3895,"text":"\t\t\t\tif !ok {"},
  {"line":3896,"text":"\t\t\t\t\tt.Fatalf(\"%sexpected JSX closing tag snippet to begin with $0, got %q\", f.getCurrentPositionPrefix(), item.VSTextEdit.NewText)"},
  {"line":3897,"text":"\t\t\t\t}"},
  {"line":3898,"text":"\t\t\t}"},
  {"line":3899,"text":"\t\t\tactualText = &newText"},
  {"line":3900,"text":"\t\t}"},
  {"line":3901,"text":"\t\tassertDeepEqual(t, actualText, expectedText, f.getCurrentPositionPrefix()+\"JSX closing tag text mismatch\")"},
  {"line":3902,"text":"\t}"},
  {"line":3903,"text":"}"},
  {"line":3906,"text":"func (f *FourslashTest) VerifyBaselineClosingTags(t *testing.T) {"},
  {"line":3907,"text":"\tt.Helper()"},
  {"line":3909,"text":"\tmarkersAndItems := core.MapFiltered(f.Markers(), func(marker *Marker) (markerAndItem[*lsproto.VsOnAutoInsertResponseItem], bool) {"},
  {"line":3910,"text":"\t\tif marker.Name == nil {"},
  {"line":3911,"text":"\t\t\treturn markerAndItem[*lsproto.VsOnAutoInsertResponseItem]{}, false"},
  {"line":3912,"text":"\t\t}"},
  {"line":3914,"text":"\t\tparams := &lsproto.VsOnAutoInsertParams{"},
  {"line":3915,"text":"\t\t\tVSTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":3916,"text":"\t\t\t\tUri: lsconv.FileNameToDocumentURI(marker.FileName()),"},
  {"line":3917,"text":"\t\t\t},"},
  {"line":3918,"text":"\t\t\tVSPosition: marker.LSPosition,"},
  {"line":3919,"text":"\t\t\tVSCh:       \">\","},
  {"line":3920,"text":"\t\t}"},
  {"line":3922,"text":"\t\tresult := sendRequest(t, f, lsproto.TextDocumentVSOnAutoInsertInfo, params)"},
  {"line":3923,"text":"\t\treturn markerAndItem[*lsproto.VsOnAutoInsertResponseItem]{Marker: marker, Item: result.VsOnAutoInsertResponseItem}, true"},
  {"line":3924,"text":"\t})"},
  {"line":3926,"text":"\tgetRange := func(item *lsproto.VsOnAutoInsertResponseItem) *lsproto.Range {"},
  {"line":3930,"text":"\t\treturn nil"},
  {"line":3931,"text":"\t}"},
  {"line":3933,"text":"\tgetTooltipLines := func(item, _prev *lsproto.VsOnAutoInsertResponseItem) []string {"},
  {"line":3934,"text":"\t\tif item == nil || item.VSTextEdit == nil {"},
  {"line":3935,"text":"\t\t\treturn []string{\"No closing tag\"}"},
  {"line":3936,"text":"\t\t}"},
  {"line":3937,"text":"\t\tformat := \"plaintext\""},
  {"line":3938,"text":"\t\tif item.VSTextEditFormat == lsproto.InsertTextFormatSnippet {"},
  {"line":3939,"text":"\t\t\tformat = \"snippet\""},
  {"line":3940,"text":"\t\t}"},
  {"line":3941,"text":"\t\treturn []string{fmt.Sprintf(\"%s: %q\", format, item.VSTextEdit.NewText)}"},
  {"line":3942,"text":"\t}"},
  {"line":3944,"text":"\tresult := annotateContentWithTooltips(t, f, markersAndItems, \"closing tag\", getRange, getTooltipLines)"},
  {"line":3945,"text":"\tf.addResultToBaseline(t, closingTagCmd, result)"},
  {"line":3946,"text":"}"},
  {"line":3950,"text":"type VerifySignatureHelpOptions struct {"},
  {"line":3952,"text":"\tText string"},
  {"line":3954,"text":"\tDocComment string"},
  {"line":3956,"text":"\tParameterCount int"},
  {"line":3958,"text":"\tParameterName string"},
  {"line":3960,"text":"\tParameterSpan string"},
  {"line":3962,"text":"\tParameterDocComment string"},
  {"line":3964,"text":"\tOverloadsCount int"},
  {"line":3966,"text":"\tOverrideSelectedItemIndex int"},
  {"line":3968,"text":"\tIsVariadic bool"},
  {"line":3970,"text":"\tIsVariadicSet bool"},
  {"line":3971,"text":"}"},
  {"line":3974,"text":"func (f *FourslashTest) VerifySignatureHelp(t *testing.T, expected VerifySignatureHelpOptions) {"},
  {"line":3975,"text":"\tt.Helper()"},
  {"line":3976,"text":"\tprefix := f.getCurrentPositionPrefix()"},
  {"line":3977,"text":"\tparams := &lsproto.SignatureHelpParams{"},
  {"line":3978,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":3979,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":3980,"text":"\t\t},"},
  {"line":3981,"text":"\t\tPosition: f.currentCaretPosition,"},
  {"line":3982,"text":"\t}"},
  {"line":3983,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)"},
  {"line":3984,"text":"\thelp := result.SignatureHelp"},
  {"line":3985,"text":"\tif help == nil {"},
  {"line":3986,"text":"\t\tt.Fatalf(\"%sCould not get signature help\", prefix)"},
  {"line":3987,"text":"\t}"},
  {"line":3990,"text":"\tselectedIndex := 0"},
  {"line":3991,"text":"\tif expected.OverrideSelectedItemIndex > 0 {"},
  {"line":3992,"text":"\t\tselectedIndex = expected.OverrideSelectedItemIndex"},
  {"line":3993,"text":"\t} else if help.ActiveSignature != nil {"},
  {"line":3994,"text":"\t\tselectedIndex = int(*help.ActiveSignature)"},
  {"line":3995,"text":"\t}"},
  {"line":3997,"text":"\tif selectedIndex >= len(help.Signatures) {"},
  {"line":3998,"text":"\t\tt.Fatalf(\"%sSelected signature index %d out of range (have %d signatures)\", prefix, selectedIndex, len(help.Signatures))"},
  {"line":3999,"text":"\t}"},
  {"line":4001,"text":"\tselectedSig := help.Signatures[selectedIndex]"},
  {"line":4004,"text":"\tif expected.OverloadsCount > 0 {"},
  {"line":4005,"text":"\t\tif len(help.Signatures) != expected.OverloadsCount {"},
  {"line":4006,"text":"\t\t\tt.Errorf(\"%sExpected %d overloads, got %d\", prefix, expected.OverloadsCount, len(help.Signatures))"},
  {"line":4007,"text":"\t\t}"},
  {"line":4008,"text":"\t}"},
  {"line":4011,"text":"\tif expected.Text != \"\" {"},
  {"line":4012,"text":"\t\tif selectedSig.Label != expected.Text {"},
  {"line":4013,"text":"\t\t\tt.Errorf(\"%sExpected signature text %q, got %q\", prefix, expected.Text, selectedSig.Label)"},
  {"line":4014,"text":"\t\t}"},
  {"line":4015,"text":"\t}"},
  {"line":4018,"text":"\tif expected.DocComment != \"\" {"},
  {"line":4019,"text":"\t\tactualDoc := \"\""},
  {"line":4020,"text":"\t\tif selectedSig.Documentation != nil {"},
  {"line":4021,"text":"\t\t\tif selectedSig.Documentation.MarkupContent != nil {"},
  {"line":4022,"text":"\t\t\t\tactualDoc = selectedSig.Documentation.MarkupContent.Value"},
  {"line":4023,"text":"\t\t\t} else if selectedSig.Documentation.String != nil {"},
  {"line":4024,"text":"\t\t\t\tactualDoc = *selectedSig.Documentation.String"},
  {"line":4025,"text":"\t\t\t}"},
  {"line":4026,"text":"\t\t}"},
  {"line":4027,"text":"\t\tif actualDoc != expected.DocComment {"},
  {"line":4028,"text":"\t\t\tt.Errorf(\"%sExpected doc comment %q, got %q\", prefix, expected.DocComment, actualDoc)"},
  {"line":4029,"text":"\t\t}"},
  {"line":4030,"text":"\t}"},
  {"line":4033,"text":"\tif expected.ParameterCount > 0 {"},
  {"line":4034,"text":"\t\tparamCount := 0"},
  {"line":4035,"text":"\t\tif selectedSig.Parameters != nil {"},
  {"line":4036,"text":"\t\t\tparamCount = len(*selectedSig.Parameters)"},
  {"line":4037,"text":"\t\t}"},
  {"line":4038,"text":"\t\tif paramCount != expected.ParameterCount {"},
  {"line":4039,"text":"\t\t\tt.Errorf(\"%sExpected %d parameters, got %d\", prefix, expected.ParameterCount, paramCount)"},
  {"line":4040,"text":"\t\t}"},
  {"line":4041,"text":"\t}"},
  {"line":4044,"text":"\tvar activeParamIndex int"},
  {"line":4045,"text":"\tif selectedSig.ActiveParameter != nil && selectedSig.ActiveParameter.Uinteger != nil {"},
  {"line":4046,"text":"\t\tactiveParamIndex = int(*selectedSig.ActiveParameter.Uinteger)"},
  {"line":4047,"text":"\t} else if help.ActiveParameter != nil && help.ActiveParameter.Uinteger != nil {"},
  {"line":4048,"text":"\t\tactiveParamIndex = int(*help.ActiveParameter.Uinteger)"},
  {"line":4049,"text":"\t}"},
  {"line":4051,"text":"\tvar activeParam *lsproto.ParameterInformation"},
  {"line":4052,"text":"\tif selectedSig.Parameters != nil && activeParamIndex < len(*selectedSig.Parameters) {"},
  {"line":4053,"text":"\t\tactiveParam = (*selectedSig.Parameters)[activeParamIndex]"},
  {"line":4054,"text":"\t}"},
  {"line":4057,"text":"\tif expected.ParameterName != \"\" {"},
  {"line":4058,"text":"\t\tif activeParam == nil {"},
  {"line":4059,"text":"\t\t\tt.Errorf(\"%sExpected parameter name %q, but no active parameter\", prefix, expected.ParameterName)"},
  {"line":4060,"text":"\t\t} else {"},
  {"line":4062,"text":"\t\t\tactualName := \"\""},
  {"line":4063,"text":"\t\t\tif activeParam.Label.String != nil {"},
  {"line":4065,"text":"\t\t\t\tlabel := *activeParam.Label.String"},
  {"line":4067,"text":"\t\t\t\tlabel = strings.TrimPrefix(label, \"...\")"},
  {"line":4068,"text":"\t\t\t\tif name, _, found := strings.Cut(label, \":\"); found {"},
  {"line":4069,"text":"\t\t\t\t\tactualName = strings.TrimSpace(name)"},
  {"line":4070,"text":"\t\t\t\t} else if name, _, found := strings.Cut(label, \" extends \"); found {"},
  {"line":4071,"text":"\t\t\t\t\tactualName = strings.TrimSpace(name)"},
  {"line":4072,"text":"\t\t\t\t} else {"},
  {"line":4073,"text":"\t\t\t\t\tactualName = label"},
  {"line":4074,"text":"\t\t\t\t}"},
  {"line":4075,"text":"\t\t\t}"},
  {"line":4076,"text":"\t\t\tif actualName != expected.ParameterName {"},
  {"line":4077,"text":"\t\t\t\tt.Errorf(\"%sExpected parameter name %q, got %q\", prefix, expected.ParameterName, actualName)"},
  {"line":4078,"text":"\t\t\t}"},
  {"line":4079,"text":"\t\t}"},
  {"line":4080,"text":"\t}"},
  {"line":4083,"text":"\tif expected.ParameterSpan != \"\" {"},
  {"line":4084,"text":"\t\tif activeParam == nil {"},
  {"line":4085,"text":"\t\t\tt.Errorf(\"%sExpected parameter span %q, but no active parameter\", prefix, expected.ParameterSpan)"},
  {"line":4086,"text":"\t\t} else {"},
  {"line":4087,"text":"\t\t\tactualSpan := \"\""},
  {"line":4088,"text":"\t\t\tif activeParam.Label.String != nil {"},
  {"line":4089,"text":"\t\t\t\tactualSpan = *activeParam.Label.String"},
  {"line":4090,"text":"\t\t\t}"},
  {"line":4091,"text":"\t\t\tif actualSpan != expected.ParameterSpan {"},
  {"line":4092,"text":"\t\t\t\tt.Errorf(\"%sExpected parameter span %q, got %q\", prefix, expected.ParameterSpan, actualSpan)"},
  {"line":4093,"text":"\t\t\t}"},
  {"line":4094,"text":"\t\t}"},
  {"line":4095,"text":"\t}"},
  {"line":4098,"text":"\tif expected.ParameterDocComment != \"\" {"},
  {"line":4099,"text":"\t\tif activeParam == nil {"},
  {"line":4100,"text":"\t\t\tt.Errorf(\"%sExpected parameter doc comment %q, but no active parameter\", prefix, expected.ParameterDocComment)"},
  {"line":4101,"text":"\t\t} else {"},
  {"line":4102,"text":"\t\t\tactualDoc := \"\""},
  {"line":4103,"text":"\t\t\tif activeParam.Documentation != nil {"},
  {"line":4104,"text":"\t\t\t\tif activeParam.Documentation.MarkupContent != nil {"},
  {"line":4105,"text":"\t\t\t\t\tactualDoc = activeParam.Documentation.MarkupContent.Value"},
  {"line":4106,"text":"\t\t\t\t} else if activeParam.Documentation.String != nil {"},
  {"line":4107,"text":"\t\t\t\t\tactualDoc = *activeParam.Documentation.String"},
  {"line":4108,"text":"\t\t\t\t}"},
  {"line":4109,"text":"\t\t\t}"},
  {"line":4110,"text":"\t\t\tif actualDoc != expected.ParameterDocComment {"},
  {"line":4111,"text":"\t\t\t\tt.Errorf(\"%sExpected parameter doc comment %q, got %q\", prefix, expected.ParameterDocComment, actualDoc)"},
  {"line":4112,"text":"\t\t\t}"},
  {"line":4113,"text":"\t\t}"},
  {"line":4114,"text":"\t}"},
  {"line":4117,"text":"\tif expected.IsVariadicSet {"},
  {"line":4118,"text":"\t\tactualIsVariadic := false"},
  {"line":4119,"text":"\t\tif selectedSig.Parameters != nil {"},
  {"line":4120,"text":"\t\t\tfor _, param := range *selectedSig.Parameters {"},
  {"line":4121,"text":"\t\t\t\tif param.Label.String != nil && strings.HasPrefix(*param.Label.String, \"...\") {"},
  {"line":4122,"text":"\t\t\t\t\tactualIsVariadic = true"},
  {"line":4123,"text":"\t\t\t\t\tbreak"},
  {"line":4124,"text":"\t\t\t\t}"},
  {"line":4125,"text":"\t\t\t}"},
  {"line":4126,"text":"\t\t}"},
  {"line":4127,"text":"\t\tif actualIsVariadic != expected.IsVariadic {"},
  {"line":4128,"text":"\t\t\tt.Errorf(\"%sExpected isVariadic=%v, got %v\", prefix, expected.IsVariadic, actualIsVariadic)"},
  {"line":4129,"text":"\t\t}"},
  {"line":4130,"text":"\t}"},
  {"line":4131,"text":"}"},
  {"line":4134,"text":"func (f *FourslashTest) VerifyNoSignatureHelp(t *testing.T) {"},
  {"line":4135,"text":"\tt.Helper()"},
  {"line":4136,"text":"\tprefix := f.getCurrentPositionPrefix()"},
  {"line":4137,"text":"\tparams := &lsproto.SignatureHelpParams{"},
  {"line":4138,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":4139,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":4140,"text":"\t\t},"},
  {"line":4141,"text":"\t\tPosition: f.currentCaretPosition,"},
  {"line":4142,"text":"\t}"},
  {"line":4143,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)"},
  {"line":4144,"text":"\tif result.SignatureHelp != nil && len(result.SignatureHelp.Signatures) > 0 {"},
  {"line":4145,"text":"\t\tt.Errorf(\"%sExpected no signature help, but got %d signatures\", prefix, len(result.SignatureHelp.Signatures))"},
  {"line":4146,"text":"\t}"},
  {"line":4147,"text":"}"},
  {"line":4150,"text":"func (f *FourslashTest) VerifyNoSignatureHelpWithContext(t *testing.T, context *lsproto.SignatureHelpContext) {"},
  {"line":4151,"text":"\tt.Helper()"},
  {"line":4152,"text":"\tprefix := f.getCurrentPositionPrefix()"},
  {"line":4153,"text":"\tparams := &lsproto.SignatureHelpParams{"},
  {"line":4154,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":4155,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":4156,"text":"\t\t},"},
  {"line":4157,"text":"\t\tPosition: f.currentCaretPosition,"},
  {"line":4158,"text":"\t\tContext:  context,"},
  {"line":4159,"text":"\t}"},
  {"line":4160,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)"},
  {"line":4161,"text":"\tif result.SignatureHelp != nil && len(result.SignatureHelp.Signatures) > 0 {"},
  {"line":4162,"text":"\t\tt.Errorf(\"%sExpected no signature help, but got %d signatures\", prefix, len(result.SignatureHelp.Signatures))"},
  {"line":4163,"text":"\t}"},
  {"line":4164,"text":"}"},
  {"line":4167,"text":"func (f *FourslashTest) VerifyNoSignatureHelpForMarkersWithContext(t *testing.T, context *lsproto.SignatureHelpContext, markers ...string) {"},
  {"line":4168,"text":"\tt.Helper()"},
  {"line":4169,"text":"\tfor _, marker := range markers {"},
  {"line":4170,"text":"\t\tf.GoToMarker(t, marker)"},
  {"line":4171,"text":"\t\tf.VerifyNoSignatureHelpWithContext(t, context)"},
  {"line":4172,"text":"\t}"},
  {"line":4173,"text":"}"},
  {"line":4176,"text":"func (f *FourslashTest) VerifySignatureHelpPresent(t *testing.T, context *lsproto.SignatureHelpContext) {"},
  {"line":4177,"text":"\tt.Helper()"},
  {"line":4178,"text":"\tprefix := f.getCurrentPositionPrefix()"},
  {"line":4179,"text":"\tparams := &lsproto.SignatureHelpParams{"},
  {"line":4180,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":4181,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":4182,"text":"\t\t},"},
  {"line":4183,"text":"\t\tPosition: f.currentCaretPosition,"},
  {"line":4184,"text":"\t\tContext:  context,"},
  {"line":4185,"text":"\t}"},
  {"line":4186,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)"},
  {"line":4187,"text":"\tif result.SignatureHelp == nil || len(result.SignatureHelp.Signatures) == 0 {"},
  {"line":4188,"text":"\t\tt.Errorf(\"%sExpected signature help to be present, but got none\", prefix)"},
  {"line":4189,"text":"\t}"},
  {"line":4190,"text":"}"},
  {"line":4193,"text":"func (f *FourslashTest) VerifySignatureHelpPresentForMarkers(t *testing.T, context *lsproto.SignatureHelpContext, markers ...string) {"},
  {"line":4194,"text":"\tt.Helper()"},
  {"line":4195,"text":"\tfor _, marker := range markers {"},
  {"line":4196,"text":"\t\tf.GoToMarker(t, marker)"},
  {"line":4197,"text":"\t\tf.VerifySignatureHelpPresent(t, context)"},
  {"line":4198,"text":"\t}"},
  {"line":4199,"text":"}"},
  {"line":4202,"text":"func (f *FourslashTest) VerifyNoSignatureHelpForMarkers(t *testing.T, markers ...string) {"},
  {"line":4203,"text":"\tt.Helper()"},
  {"line":4204,"text":"\tfor _, marker := range markers {"},
  {"line":4205,"text":"\t\tf.GoToMarker(t, marker)"},
  {"line":4206,"text":"\t\tf.VerifyNoSignatureHelp(t)"},
  {"line":4207,"text":"\t}"},
  {"line":4208,"text":"}"},
  {"line":4210,"text":"type SignatureHelpCase struct {"},
  {"line":4211,"text":"\tContext     *lsproto.SignatureHelpContext"},
  {"line":4212,"text":"\tMarkerInput MarkerInput"},
  {"line":4213,"text":"\tExpected    *lsproto.SignatureHelp"},
  {"line":4214,"text":"}"},
  {"line":4218,"text":"func (f *FourslashTest) VerifySignatureHelpWithCases(t *testing.T, signatureHelpCases ...*SignatureHelpCase) {"},
  {"line":4219,"text":"\tfor _, option := range signatureHelpCases {"},
  {"line":4220,"text":"\t\tswitch marker := option.MarkerInput.(type) {"},
  {"line":4221,"text":"\t\tcase string:"},
  {"line":4222,"text":"\t\t\tf.GoToMarker(t, marker)"},
  {"line":4223,"text":"\t\t\tf.verifySignatureHelp(t, option.Context, option.Expected)"},
  {"line":4224,"text":"\t\tcase *Marker:"},
  {"line":4225,"text":"\t\t\tf.goToMarker(t, marker)"},
  {"line":4226,"text":"\t\t\tf.verifySignatureHelp(t, option.Context, option.Expected)"},
  {"line":4227,"text":"\t\tcase []string:"},
  {"line":4228,"text":"\t\t\tfor _, markerName := range marker {"},
  {"line":4229,"text":"\t\t\t\tf.GoToMarker(t, markerName)"},
  {"line":4230,"text":"\t\t\t\tf.verifySignatureHelp(t, option.Context, option.Expected)"},
  {"line":4231,"text":"\t\t\t}"},
  {"line":4232,"text":"\t\tcase []*Marker:"},
  {"line":4233,"text":"\t\t\tfor _, marker := range marker {"},
  {"line":4234,"text":"\t\t\t\tf.goToMarker(t, marker)"},
  {"line":4235,"text":"\t\t\t\tf.verifySignatureHelp(t, option.Context, option.Expected)"},
  {"line":4236,"text":"\t\t\t}"},
  {"line":4237,"text":"\t\tcase nil:"},
  {"line":4238,"text":"\t\t\tf.verifySignatureHelp(t, option.Context, option.Expected)"},
  {"line":4239,"text":"\t\tdefault:"},
  {"line":4240,"text":"\t\t\tt.Fatalf(\"Invalid marker input type: %T. Expected string, *Marker, []string, or []*Marker.\", option.MarkerInput)"},
  {"line":4241,"text":"\t\t}"},
  {"line":4242,"text":"\t}"},
  {"line":4243,"text":"}"},
  {"line":4245,"text":"func (f *FourslashTest) verifySignatureHelp("},
  {"line":4246,"text":"\tt *testing.T,"},
  {"line":4247,"text":"\tcontext *lsproto.SignatureHelpContext,"},
  {"line":4248,"text":"\texpected *lsproto.SignatureHelp,"},
  {"line":4249,"text":") {"},
  {"line":4250,"text":"\tprefix := f.getCurrentPositionPrefix()"},
  {"line":4251,"text":"\tparams := &lsproto.SignatureHelpParams{"},
  {"line":4252,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":4253,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":4254,"text":"\t\t},"},
  {"line":4255,"text":"\t\tPosition: f.currentCaretPosition,"},
  {"line":4256,"text":"\t\tContext:  context,"},
  {"line":4257,"text":"\t}"},
  {"line":4258,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentSignatureHelpInfo, params)"},
  {"line":4259,"text":"\tf.verifySignatureHelpResult(t, result.SignatureHelp, expected, prefix)"},
  {"line":4260,"text":"}"},
  {"line":4262,"text":"func (f *FourslashTest) verifySignatureHelpResult("},
  {"line":4263,"text":"\tt *testing.T,"},
  {"line":4264,"text":"\tactual *lsproto.SignatureHelp,"},
  {"line":4265,"text":"\texpected *lsproto.SignatureHelp,"},
  {"line":4266,"text":"\tprefix string,"},
  {"line":4267,"text":") {"},
  {"line":4268,"text":"\tassertDeepEqual(t, actual, expected, prefix+\" SignatureHelp mismatch\")"},
  {"line":4269,"text":"}"},
  {"line":4271,"text":"func (f *FourslashTest) getCurrentPositionPrefix() string {"},
  {"line":4272,"text":"\tif f.lastKnownMarkerName != nil {"},
  {"line":4273,"text":"\t\treturn fmt.Sprintf(\"At marker '%s': \", *f.lastKnownMarkerName)"},
  {"line":4274,"text":"\t}"},
  {"line":4275,"text":"\treturn fmt.Sprintf(\"At position %s(Ln %d, Col %d): \", f.activeFilename, f.currentCaretPosition.Line, f.currentCaretPosition.Character)"},
  {"line":4276,"text":"}"},
  {"line":4278,"text":"func (f *FourslashTest) BaselineAutoImportsCompletions(t *testing.T, markerNames []string) {"},
  {"line":4279,"text":"\tt.Helper()"},
  {"line":4280,"text":"\treset := f.ConfigureWithReset(t, lsutil.UserPreferences{"},
  {"line":4281,"text":"\t\tIncludeCompletionsForModuleExports:    core.TSTrue,"},
  {"line":4282,"text":"\t\tIncludeCompletionsForImportStatements: core.TSTrue,"},
  {"line":4283,"text":"\t\tImportModuleSpecifierPreference:       f.userPreferences.ImportModuleSpecifierPreference,"},
  {"line":4284,"text":"\t\tImportModuleSpecifierEnding:           f.userPreferences.ImportModuleSpecifierEnding,"},
  {"line":4285,"text":"\t\tAutoImportSpecifierExcludeRegexes:     f.userPreferences.AutoImportSpecifierExcludeRegexes,"},
  {"line":4286,"text":"\t\tAutoImportFileExcludePatterns:         f.userPreferences.AutoImportFileExcludePatterns,"},
  {"line":4287,"text":"\t\tPreferTypeOnlyAutoImports:             f.userPreferences.PreferTypeOnlyAutoImports,"},
  {"line":4288,"text":"\t\tAutoImportEntrypointDirectorySearch:   f.userPreferences.AutoImportEntrypointDirectorySearch,"},
  {"line":4289,"text":"\t})"},
  {"line":4290,"text":"\tdefer reset()"},
  {"line":4292,"text":"\tfor _, markerName := range markerNames {"},
  {"line":4293,"text":"\t\tf.GoToMarker(t, markerName)"},
  {"line":4294,"text":"\t\tparams := &lsproto.CompletionParams{"},
  {"line":4295,"text":"\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":4296,"text":"\t\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":4297,"text":"\t\t\t},"},
  {"line":4298,"text":"\t\t\tPosition: f.currentCaretPosition,"},
  {"line":4299,"text":"\t\t\tContext:  &lsproto.CompletionContext{},"},
  {"line":4300,"text":"\t\t}"},
  {"line":4301,"text":"\t\tresult := sendRequest(t, f, lsproto.TextDocumentCompletionInfo, params)"},
  {"line":4303,"text":"\t\tprefix := fmt.Sprintf(\"At marker '%s': \", markerName)"},
  {"line":4305,"text":"\t\tf.writeToBaseline(autoImportsCmd, \"// === Auto Imports === \\n\")"},
  {"line":4307,"text":"\t\tfileContent, ok := f.textOfFile(f.activeFilename)"},
  {"line":4308,"text":"\t\tif !ok {"},
  {"line":4309,"text":"\t\t\tt.Fatalf(prefix+\"Failed to read file %s for auto-import baseline\", f.activeFilename)"},
  {"line":4310,"text":"\t\t}"},
  {"line":4312,"text":"\t\tmarker := f.testData.MarkerPositions[markerName]"},
  {"line":4313,"text":"\t\text := strings.TrimPrefix(tspath.GetAnyExtensionFromPath(f.activeFilename, nil, true), \".\")"},
  {"line":4314,"text":"\t\tlang := core.IfElse(ext == \"mts\" || ext == \"cts\", \"ts\", ext)"},
  {"line":4315,"text":"\t\tf.writeToBaseline(autoImportsCmd, (codeFence("},
  {"line":4316,"text":"\t\t\tlang,"},
  {"line":4317,"text":"\t\t\t\"// @FileName: \"+f.activeFilename+\"\\n\"+fileContent[:marker.Position]+\"/*\"+markerName+\"*/\"+fileContent[marker.Position:],"},
  {"line":4318,"text":"\t\t)))"},
  {"line":4320,"text":"\t\tcurrentFile := newScriptInfo(f.activeFilename, fileContent)"},
  {"line":4321,"text":"\t\tconverters := lsconv.NewConverters(lsproto.PositionEncodingKindUTF8, func(_ string) *lsconv.LSPLineMap {"},
  {"line":4322,"text":"\t\t\treturn currentFile.lineMap"},
  {"line":4323,"text":"\t\t})"},
  {"line":4324,"text":"\t\tvar list []*lsproto.CompletionItem"},
  {"line":4325,"text":"\t\tif result.Items == nil || len(*result.Items) == 0 {"},
  {"line":4326,"text":"\t\t\tif result.List == nil || result.List.Items == nil || len(result.List.Items) == 0 {"},
  {"line":4327,"text":"\t\t\t\tf.writeToBaseline(autoImportsCmd, \"no autoimport completions found\"+\"\\n\\n\")"},
  {"line":4329,"text":"\t\t\t\tcontinue"},
  {"line":4330,"text":"\t\t\t}"},
  {"line":4331,"text":"\t\t\tlist = result.List.Items"},
  {"line":4332,"text":"\t\t} else {"},
  {"line":4333,"text":"\t\t\tlist = *result.Items"},
  {"line":4334,"text":"\t\t}"},
  {"line":4336,"text":"\t\tfor _, item := range list {"},
  {"line":4337,"text":"\t\t\tif item.Data == nil || *item.SortText != string(ls.SortTextAutoImportSuggestions) {"},
  {"line":4338,"text":"\t\t\t\tcontinue"},
  {"line":4339,"text":"\t\t\t}"},
  {"line":4340,"text":"\t\t\tdetails := sendRequest(t, f, lsproto.CompletionItemResolveInfo, item)"},
  {"line":4341,"text":"\t\t\tif details == nil || details.AdditionalTextEdits == nil || len(*details.AdditionalTextEdits) == 0 {"},
  {"line":4342,"text":"\t\t\t\tt.Fatalf(prefix+\"Entry %s from %s returned no code changes from completion details request\", item.Label, item.Detail)"},
  {"line":4343,"text":"\t\t\t}"},
  {"line":4344,"text":"\t\t\tallChanges := *details.AdditionalTextEdits"},
  {"line":4362,"text":"\t\t\tslices.SortFunc(allChanges, func(a, b *lsproto.TextEdit) int { return lsproto.ComparePositions(b.Range.Start, a.Range.Start) })"},
  {"line":4363,"text":"\t\t\tnewFileContent := fileContent"},
  {"line":4364,"text":"\t\t\tfor _, change := range allChanges {"},
  {"line":4365,"text":"\t\t\t\tnewFileContent = newFileContent[:converters.LineAndCharacterToPosition(currentFile, change.Range.Start)] + change.NewText + newFileContent[converters.LineAndCharacterToPosition(currentFile, change.Range.End):]"},
  {"line":4366,"text":"\t\t\t}"},
  {"line":4367,"text":"\t\t\tf.writeToBaseline(autoImportsCmd, codeFence(lang, newFileContent)+\"\\n\\n\")"},
  {"line":4368,"text":"\t\t}"},
  {"line":4369,"text":"\t}"},
  {"line":4370,"text":"}"},
  {"line":4373,"text":"type MarkerOrRangeOrName = any"},
  {"line":4375,"text":"func (f *FourslashTest) VerifyBaselineRename("},
  {"line":4376,"text":"\tt *testing.T,"},
  {"line":4377,"text":"\tpreferences *lsutil.UserPreferences,"},
  {"line":4378,"text":"\tmarkerOrNameOrRanges ...MarkerOrRangeOrName,"},
  {"line":4379,"text":") {"},
  {"line":4380,"text":"\tvar markerOrRanges []MarkerOrRange"},
  {"line":4381,"text":"\tfor _, markerOrNameOrRange := range markerOrNameOrRanges {"},
  {"line":4382,"text":"\t\tswitch markerOrNameOrRange := markerOrNameOrRange.(type) {"},
  {"line":4383,"text":"\t\tcase string:"},
  {"line":4384,"text":"\t\t\tmarker, ok := f.testData.MarkerPositions[markerOrNameOrRange]"},
  {"line":4385,"text":"\t\t\tif !ok {"},
  {"line":4386,"text":"\t\t\t\tt.Fatalf(\"Marker '%s' not found\", markerOrNameOrRange)"},
  {"line":4387,"text":"\t\t\t}"},
  {"line":4388,"text":"\t\t\tmarkerOrRanges = append(markerOrRanges, marker)"},
  {"line":4389,"text":"\t\tcase *Marker:"},
  {"line":4390,"text":"\t\t\tmarkerOrRanges = append(markerOrRanges, markerOrNameOrRange)"},
  {"line":4391,"text":"\t\tcase *RangeMarker:"},
  {"line":4392,"text":"\t\t\tmarkerOrRanges = append(markerOrRanges, markerOrNameOrRange)"},
  {"line":4393,"text":"\t\tdefault:"},
  {"line":4394,"text":"\t\t\tt.Fatalf(\"Invalid marker or range type: %T. Expected string, *Marker, or *RangeMarker.\", markerOrNameOrRange)"},
  {"line":4395,"text":"\t\t}"},
  {"line":4396,"text":"\t}"},
  {"line":4398,"text":"\tf.verifyBaselineRename(t, preferences, markerOrRanges)"},
  {"line":4399,"text":"}"},
  {"line":4401,"text":"func (f *FourslashTest) verifyBaselineRename("},
  {"line":4402,"text":"\tt *testing.T,"},
  {"line":4403,"text":"\tpreferences *lsutil.UserPreferences,"},
  {"line":4404,"text":"\tmarkerOrRanges []MarkerOrRange,"},
  {"line":4405,"text":") {"},
  {"line":4406,"text":"\tif preferences != nil {"},
  {"line":4407,"text":"\t\tdefer f.ConfigureWithReset(t, *preferences)()"},
  {"line":4408,"text":"\t}"},
  {"line":4410,"text":"\tfor _, markerOrRange := range markerOrRanges {"},
  {"line":4411,"text":"\t\tf.GoToMarkerOrRange(t, markerOrRange)"},
  {"line":4413,"text":"\t\tparams := &lsproto.RenameParams{"},
  {"line":4414,"text":"\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":4415,"text":"\t\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":4416,"text":"\t\t\t},"},
  {"line":4417,"text":"\t\t\tPosition: f.currentCaretPosition,"},
  {"line":4418,"text":"\t\t\tNewName:  \"?\","},
  {"line":4419,"text":"\t\t}"},
  {"line":4421,"text":"\t\tresult := sendRequest(t, f, lsproto.TextDocumentRenameInfo, params)"},
  {"line":4423,"text":"\t\tvar changes map[lsproto.DocumentUri][]*lsproto.TextEdit"},
  {"line":4424,"text":"\t\tif result.WorkspaceEdit != nil && result.WorkspaceEdit.Changes != nil {"},
  {"line":4425,"text":"\t\t\tchanges = *result.WorkspaceEdit.Changes"},
  {"line":4426,"text":"\t\t}"},
  {"line":4427,"text":"\t\tspanToText := map[documentSpan]string{}"},
  {"line":4428,"text":"\t\tfileToSpan := collections.MultiMap[lsproto.DocumentUri, documentSpan]{}"},
  {"line":4429,"text":"\t\tfor uri, edits := range changes {"},
  {"line":4430,"text":"\t\t\tfor _, edit := range edits {"},
  {"line":4431,"text":"\t\t\t\tspan := documentSpan{uri: uri, textSpan: edit.Range}"},
  {"line":4432,"text":"\t\t\t\tfileToSpan.Add(uri, span)"},
  {"line":4433,"text":"\t\t\t\tspanToText[span] = edit.NewText"},
  {"line":4434,"text":"\t\t\t}"},
  {"line":4435,"text":"\t\t}"},
  {"line":4437,"text":"\t\tvar renameOptions strings.Builder"},
  {"line":4438,"text":"\t\tif preferences != nil {"},
  {"line":4439,"text":"\t\t\tif preferences.UseAliasesForRename != core.TSUnknown {"},
  {"line":4440,"text":"\t\t\t\tfmt.Fprintf(&renameOptions, \"// @useAliasesForRename: %v\\n\", preferences.UseAliasesForRename.IsTrue())"},
  {"line":4441,"text":"\t\t\t}"},
  {"line":4442,"text":"\t\t\tif preferences.QuotePreference != lsutil.QuotePreferenceUnknown {"},
  {"line":4443,"text":"\t\t\t\tfmt.Fprintf(&renameOptions, \"// @quotePreference: %v\\n\", preferences.QuotePreference)"},
  {"line":4444,"text":"\t\t\t}"},
  {"line":4445,"text":"\t\t}"},
  {"line":4447,"text":"\t\tbaselineFileContent := f.getBaselineForGroupedSpansWithFileContents("},
  {"line":4448,"text":"\t\t\t&fileToSpan,"},
  {"line":4449,"text":"\t\t\tbaselineFourslashLocationsOptions{"},
  {"line":4450,"text":"\t\t\t\tmarker:     markerOrRange,"},
  {"line":4451,"text":"\t\t\t\tmarkerName: \"/*RENAME*/\","},
  {"line":4452,"text":"\t\t\t\tendMarker:  \"RENAME|]\","},
  {"line":4453,"text":"\t\t\t\tstartMarkerPrefix: func(span documentSpan) *string {"},
  {"line":4454,"text":"\t\t\t\t\ttext := spanToText[span]"},
  {"line":4455,"text":"\t\t\t\t\tprefixAndSuffix := strings.Split(text, \"?\")"},
  {"line":4456,"text":"\t\t\t\t\tif prefixAndSuffix[0] != \"\" {"},
  {"line":4457,"text":"\t\t\t\t\t\treturn new(\"/*START PREFIX*/\" + prefixAndSuffix[0])"},
  {"line":4458,"text":"\t\t\t\t\t}"},
  {"line":4459,"text":"\t\t\t\t\treturn nil"},
  {"line":4460,"text":"\t\t\t\t},"},
  {"line":4461,"text":"\t\t\t\tendMarkerSuffix: func(span documentSpan) *string {"},
  {"line":4462,"text":"\t\t\t\t\ttext := spanToText[span]"},
  {"line":4463,"text":"\t\t\t\t\tprefixAndSuffix := strings.Split(text, \"?\")"},
  {"line":4464,"text":"\t\t\t\t\tif prefixAndSuffix[1] != \"\" {"},
  {"line":4465,"text":"\t\t\t\t\t\treturn new(prefixAndSuffix[1] + \"/*END SUFFIX*/\")"},
  {"line":4466,"text":"\t\t\t\t\t}"},
  {"line":4467,"text":"\t\t\t\t\treturn nil"},
  {"line":4468,"text":"\t\t\t\t},"},
  {"line":4469,"text":"\t\t\t},"},
  {"line":4470,"text":"\t\t)"},
  {"line":4472,"text":"\t\tvar baselineResult string"},
  {"line":4473,"text":"\t\tif renameOptions.Len() > 0 {"},
  {"line":4474,"text":"\t\t\tbaselineResult = renameOptions.String() + \"\\n\" + baselineFileContent"},
  {"line":4475,"text":"\t\t} else {"},
  {"line":4476,"text":"\t\t\tbaselineResult = baselineFileContent"},
  {"line":4477,"text":"\t\t}"},
  {"line":4479,"text":"\t\tf.addResultToBaseline(t, renameCmd, baselineResult)"},
  {"line":4480,"text":"\t}"},
  {"line":4481,"text":"}"},
  {"line":4483,"text":"func (f *FourslashTest) VerifyRenameSucceeded(t *testing.T, preferences *lsutil.UserPreferences) {"},
  {"line":4484,"text":"\tif preferences != nil {"},
  {"line":4485,"text":"\t\tdefer f.ConfigureWithReset(t, *preferences)()"},
  {"line":4486,"text":"\t}"},
  {"line":4487,"text":"\tparams := &lsproto.PrepareRenameParams{"},
  {"line":4488,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":4489,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":4490,"text":"\t\t},"},
  {"line":4491,"text":"\t\tPosition: f.currentCaretPosition,"},
  {"line":4492,"text":"\t}"},
  {"line":4494,"text":"\tprefix := f.getCurrentPositionPrefix()"},
  {"line":4495,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentPrepareRenameInfo, params)"},
  {"line":4496,"text":"\tif result.Range == nil && result.PrepareRenamePlaceholder == nil && result.PrepareRenameDefaultBehavior == nil {"},
  {"line":4497,"text":"\t\tt.Fatal(prefix + \"Expected rename to succeed, but prepareRename returned null\")"},
  {"line":4498,"text":"\t}"},
  {"line":4501,"text":"\trenameResult := sendRequest(t, f, lsproto.TextDocumentRenameInfo, &lsproto.RenameParams{"},
  {"line":4502,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":4503,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":4504,"text":"\t\t},"},
  {"line":4505,"text":"\t\tPosition: f.currentCaretPosition,"},
  {"line":4506,"text":"\t\tNewName:  \"RENAME_SUCCEEDED_TEST\","},
  {"line":4507,"text":"\t})"},
  {"line":4508,"text":"\tif renameResult.WorkspaceEdit == nil || renameResult.WorkspaceEdit.Changes == nil || len(*renameResult.WorkspaceEdit.Changes) == 0 {"},
  {"line":4509,"text":"\t\tt.Fatal(prefix + \"prepareRename succeeded but textDocument/rename returned no changes\")"},
  {"line":4510,"text":"\t}"},
  {"line":4511,"text":"}"},
  {"line":4513,"text":"func (f *FourslashTest) RenameAtCaret(t *testing.T, newName string) lsproto.RenameResponse {"},
  {"line":4514,"text":"\tt.Helper()"},
  {"line":4515,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentRenameInfo, &lsproto.RenameParams{"},
  {"line":4516,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":4517,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":4518,"text":"\t\t},"},
  {"line":4519,"text":"\t\tPosition: f.currentCaretPosition,"},
  {"line":4520,"text":"\t\tNewName:  newName,"},
  {"line":4521,"text":"\t})"},
  {"line":4523,"text":"\tif result.WorkspaceEdit == nil {"},
  {"line":4524,"text":"\t\treturn result"},
  {"line":4525,"text":"\t}"},
  {"line":4527,"text":"\tif result.WorkspaceEdit.Changes != nil {"},
  {"line":4528,"text":"\t\tfor uri, edits := range *result.WorkspaceEdit.Changes {"},
  {"line":4529,"text":"\t\t\tfileName := uri.FileName()"},
  {"line":4530,"text":"\t\t\tscript := f.getOrLoadScriptInfo(fileName)"},
  {"line":4531,"text":"\t\t\tchanges := core.Map(edits, func(edit *lsproto.TextEdit) core.TextChange {"},
  {"line":4532,"text":"\t\t\t\treturn core.TextChange{"},
  {"line":4533,"text":"\t\t\t\t\tTextRange: f.converters.FromLSPRange(script, edit.Range),"},
  {"line":4534,"text":"\t\t\t\t\tNewText:   edit.NewText,"},
  {"line":4535,"text":"\t\t\t\t}"},
  {"line":4536,"text":"\t\t\t})"},
  {"line":4537,"text":"\t\t\tf.editScriptAndUpdateMarkersWorker(t, fileName, changes)"},
  {"line":4538,"text":"\t\t}"},
  {"line":4539,"text":"\t}"},
  {"line":4541,"text":"\tvar renameFiles []*lsproto.RenameFile"},
  {"line":4542,"text":"\tif result.WorkspaceEdit.DocumentChanges != nil {"},
  {"line":4543,"text":"\t\tfor _, docChange := range *result.WorkspaceEdit.DocumentChanges {"},
  {"line":4544,"text":"\t\t\tif docChange.TextDocumentEdit != nil {"},
  {"line":4545,"text":"\t\t\t\tfileName := docChange.TextDocumentEdit.TextDocument.Uri.FileName()"},
  {"line":4546,"text":"\t\t\t\tscript := f.getOrLoadScriptInfo(fileName)"},
  {"line":4547,"text":"\t\t\t\tchanges := core.Map(docChange.TextDocumentEdit.Edits, func(edit lsproto.TextEditOrAnnotatedTextEditOrSnippetTextEdit) core.TextChange {"},
  {"line":4548,"text":"\t\t\t\t\ttextEdit := edit.TextEdit"},
  {"line":4549,"text":"\t\t\t\t\treturn core.TextChange{"},
  {"line":4550,"text":"\t\t\t\t\t\tTextRange: f.converters.FromLSPRange(script, textEdit.Range),"},
  {"line":4551,"text":"\t\t\t\t\t\tNewText:   textEdit.NewText,"},
  {"line":4552,"text":"\t\t\t\t\t}"},
  {"line":4553,"text":"\t\t\t\t})"},
  {"line":4554,"text":"\t\t\t\tf.editScriptAndUpdateMarkersWorker(t, fileName, changes)"},
  {"line":4555,"text":"\t\t\t} else if docChange.RenameFile != nil {"},
  {"line":4556,"text":"\t\t\t\trenameFiles = append(renameFiles, docChange.RenameFile)"},
  {"line":4557,"text":"\t\t\t}"},
  {"line":4558,"text":"\t\t}"},
  {"line":4559,"text":"\t}"},
  {"line":4561,"text":"\tif len(renameFiles) > 0 {"},
  {"line":4562,"text":"\t\tvar fileRenames []*lsproto.FileRename"},
  {"line":4563,"text":"\t\tfor _, renameFile := range renameFiles {"},
  {"line":4564,"text":"\t\t\tfileRenames = append(fileRenames, &lsproto.FileRename{"},
  {"line":4565,"text":"\t\t\t\tOldUri: string(renameFile.OldUri),"},
  {"line":4566,"text":"\t\t\t\tNewUri: string(renameFile.NewUri),"},
  {"line":4567,"text":"\t\t\t})"},
  {"line":4568,"text":"\t\t}"},
  {"line":4569,"text":"\t\tif f.capabilities != nil &&"},
  {"line":4570,"text":"\t\t\tf.capabilities.Workspace != nil &&"},
  {"line":4571,"text":"\t\t\tf.capabilities.Workspace.FileOperations != nil &&"},
  {"line":4572,"text":"\t\t\tf.capabilities.Workspace.FileOperations.WillRename != nil &&"},
  {"line":4573,"text":"\t\t\t*f.capabilities.Workspace.FileOperations.WillRename {"},
  {"line":4574,"text":"\t\t\tf.willRenameFilesWorker(t, fileRenames...)"},
  {"line":4575,"text":"\t\t} else {"},
  {"line":4576,"text":"\t\t\tfor _, renameFile := range renameFiles {"},
  {"line":4577,"text":"\t\t\t\tf.renameFileOrDirectory(t, renameFile.OldUri.FileName(), renameFile.NewUri.FileName())"},
  {"line":4578,"text":"\t\t\t}"},
  {"line":4579,"text":"\t\t}"},
  {"line":4580,"text":"\t}"},
  {"line":4582,"text":"\treturn result"},
  {"line":4583,"text":"}"},
  {"line":4585,"text":"func (f *FourslashTest) WillRenameFiles(t *testing.T, files ...*lsproto.FileRename) lsproto.WillRenameFilesResponse {"},
  {"line":4586,"text":"\tt.Helper()"},
  {"line":4587,"text":"\treturn sendRequest(t, f, lsproto.WorkspaceWillRenameFilesInfo, &lsproto.RenameFilesParams{"},
  {"line":4588,"text":"\t\tFiles: files,"},
  {"line":4589,"text":"\t})"},
  {"line":4590,"text":"}"},
  {"line":4593,"text":"func (f *FourslashTest) willRenameFilesWorker(t *testing.T, files ...*lsproto.FileRename) {"},
  {"line":4594,"text":"\tt.Helper()"},
  {"line":4595,"text":"\tresult := f.WillRenameFiles(t, files...)"},
  {"line":4597,"text":"\tif result.WorkspaceEdit == nil {"},
  {"line":4598,"text":"\t\tfor _, file := range files {"},
  {"line":4599,"text":"\t\t\toldPath := lsproto.DocumentUri(file.OldUri).FileName()"},
  {"line":4600,"text":"\t\t\tnewPath := lsproto.DocumentUri(file.NewUri).FileName()"},
  {"line":4601,"text":"\t\t\tf.renameFileOrDirectory(t, oldPath, newPath)"},
  {"line":4602,"text":"\t\t}"},
  {"line":4603,"text":"\t\treturn"},
  {"line":4604,"text":"\t}"},
  {"line":4606,"text":"\tif result.WorkspaceEdit.Changes != nil {"},
  {"line":4607,"text":"\t\tfor uri, edits := range *result.WorkspaceEdit.Changes {"},
  {"line":4608,"text":"\t\t\tfileName := uri.FileName()"},
  {"line":4609,"text":"\t\t\tscript := f.getOrLoadScriptInfo(fileName)"},
  {"line":4610,"text":"\t\t\tchanges := core.Map(edits, func(edit *lsproto.TextEdit) core.TextChange {"},
  {"line":4611,"text":"\t\t\t\treturn core.TextChange{"},
  {"line":4612,"text":"\t\t\t\t\tTextRange: f.converters.FromLSPRange(script, edit.Range),"},
  {"line":4613,"text":"\t\t\t\t\tNewText:   edit.NewText,"},
  {"line":4614,"text":"\t\t\t\t}"},
  {"line":4615,"text":"\t\t\t})"},
  {"line":4616,"text":"\t\t\tf.editScriptAndUpdateMarkersWorker(t, fileName, changes)"},
  {"line":4617,"text":"\t\t}"},
  {"line":4618,"text":"\t}"},
  {"line":4620,"text":"\tvar renameFiles []*lsproto.RenameFile"},
  {"line":4621,"text":"\tif result.WorkspaceEdit.DocumentChanges != nil {"},
  {"line":4622,"text":"\t\tfor _, docChange := range *result.WorkspaceEdit.DocumentChanges {"},
  {"line":4623,"text":"\t\t\tif docChange.TextDocumentEdit != nil {"},
  {"line":4624,"text":"\t\t\t\tfileName := docChange.TextDocumentEdit.TextDocument.Uri.FileName()"},
  {"line":4625,"text":"\t\t\t\tscript := f.getOrLoadScriptInfo(fileName)"},
  {"line":4626,"text":"\t\t\t\tchanges := core.Map(docChange.TextDocumentEdit.Edits, func(edit lsproto.TextEditOrAnnotatedTextEditOrSnippetTextEdit) core.TextChange {"},
  {"line":4627,"text":"\t\t\t\t\ttextEdit := edit.TextEdit"},
  {"line":4628,"text":"\t\t\t\t\treturn core.TextChange{"},
  {"line":4629,"text":"\t\t\t\t\t\tTextRange: f.converters.FromLSPRange(script, textEdit.Range),"},
  {"line":4630,"text":"\t\t\t\t\t\tNewText:   textEdit.NewText,"},
  {"line":4631,"text":"\t\t\t\t\t}"},
  {"line":4632,"text":"\t\t\t\t})"},
  {"line":4633,"text":"\t\t\t\tf.editScriptAndUpdateMarkersWorker(t, fileName, changes)"},
  {"line":4634,"text":"\t\t\t} else if docChange.RenameFile != nil {"},
  {"line":4635,"text":"\t\t\t\trenameFiles = append(renameFiles, docChange.RenameFile)"},
  {"line":4636,"text":"\t\t\t}"},
  {"line":4637,"text":"\t\t}"},
  {"line":4638,"text":"\t}"},
  {"line":4640,"text":"\tvar fileRenames []*lsproto.FileRename"},
  {"line":4641,"text":"\tfor _, renameFile := range renameFiles {"},
  {"line":4642,"text":"\t\tfileRenames = append(fileRenames, &lsproto.FileRename{"},
  {"line":4643,"text":"\t\t\tOldUri: string(renameFile.OldUri),"},
  {"line":4644,"text":"\t\t\tNewUri: string(renameFile.NewUri),"},
  {"line":4645,"text":"\t\t})"},
  {"line":4646,"text":"\t}"},
  {"line":4647,"text":"\tf.willRenameFilesWorker(t, fileRenames...)"},
  {"line":4649,"text":"\tfor _, file := range files {"},
  {"line":4650,"text":"\t\toldPath := lsproto.DocumentUri(file.OldUri).FileName()"},
  {"line":4651,"text":"\t\tnewPath := lsproto.DocumentUri(file.NewUri).FileName()"},
  {"line":4652,"text":"\t\tf.renameFileOrDirectory(t, oldPath, newPath)"},
  {"line":4653,"text":"\t}"},
  {"line":4654,"text":"}"},
  {"line":4656,"text":"func (f *FourslashTest) VerifyRename(t *testing.T, markerName string, newName string, expectedFileContents map[string]string) {"},
  {"line":4657,"text":"\tt.Helper()"},
  {"line":4658,"text":"\tf.GoToMarker(t, markerName)"},
  {"line":4659,"text":"\tf.RenameAtCaret(t, newName)"},
  {"line":4660,"text":"\tfor fileName, expectedContent := range expectedFileContents {"},
  {"line":4661,"text":"\t\tscript := f.getScriptInfo(fileName)"},
  {"line":4662,"text":"\t\tif script == nil {"},
  {"line":4663,"text":"\t\t\tt.Fatalf(\"Expected script info for %s, but got nil\", fileName)"},
  {"line":4664,"text":"\t\t}"},
  {"line":4665,"text":"\t\tassert.Equal(t, script.content, expectedContent, fmt.Sprintf(\"File content after rename did not match expected content for %s.\", fileName))"},
  {"line":4666,"text":"\t}"},
  {"line":4667,"text":"}"},
  {"line":4669,"text":"func (f *FourslashTest) VerifyWillRenameFilesEdits(t *testing.T, oldPath string, newPath string, expectedFileContents map[string]string, preferences *lsutil.UserPreferences) {"},
  {"line":4670,"text":"\tt.Helper()"},
  {"line":4671,"text":"\tif preferences != nil {"},
  {"line":4672,"text":"\t\tdefer f.ConfigureWithReset(t, *preferences)()"},
  {"line":4673,"text":"\t}"},
  {"line":4675,"text":"\tf.willRenameFilesWorker(t, &lsproto.FileRename{"},
  {"line":4676,"text":"\t\tOldUri: string(lsconv.FileNameToDocumentURI(oldPath)),"},
  {"line":4677,"text":"\t\tNewUri: string(lsconv.FileNameToDocumentURI(newPath)),"},
  {"line":4678,"text":"\t})"},
  {"line":4680,"text":"\tfor fileName, expectedContent := range expectedFileContents {"},
  {"line":4681,"text":"\t\tscript := f.getOrLoadScriptInfo(fileName)"},
  {"line":4682,"text":"\t\tif script == nil {"},
  {"line":4683,"text":"\t\t\tt.Fatalf(\"Expected script info for %s, but got nil\", fileName)"},
  {"line":4684,"text":"\t\t}"},
  {"line":4685,"text":"\t\tassert.Equal(t, script.content, expectedContent, fmt.Sprintf(\"File content after workspace/willRenameFiles edits did not match expected content for %s.\", fileName))"},
  {"line":4686,"text":"\t}"},
  {"line":4687,"text":"}"},
  {"line":4689,"text":"func (f *FourslashTest) getPathUpdater(oldPath, newPath string) func(path string) (string, bool) {"},
  {"line":4690,"text":"\treturn func(path string) (string, bool) {"},
  {"line":4691,"text":"\t\tcompareOptions := tspath.ComparePathsOptions{UseCaseSensitiveFileNames: f.vfs.UseCaseSensitiveFileNames()}"},
  {"line":4692,"text":"\t\tif tspath.ComparePaths(path, oldPath, compareOptions) == 0 {"},
  {"line":4693,"text":"\t\t\treturn newPath, true"},
  {"line":4694,"text":"\t\t}"},
  {"line":4695,"text":"\t\tif tspath.StartsWithDirectory(path, oldPath, f.vfs.UseCaseSensitiveFileNames()) {"},
  {"line":4696,"text":"\t\t\treturn newPath + path[len(oldPath):], true"},
  {"line":4697,"text":"\t\t}"},
  {"line":4698,"text":"\t\treturn \"\", false"},
  {"line":4699,"text":"\t}"},
  {"line":4700,"text":"}"},
  {"line":4702,"text":"func (f *FourslashTest) renameFileOrDirectory(t *testing.T, oldPath string, newPath string) {"},
  {"line":4703,"text":"\tt.Helper()"},
  {"line":4705,"text":"\tpathUpdater := f.getPathUpdater(oldPath, newPath)"},
  {"line":4708,"text":"\toldFileNames := map[string]struct{}{}"},
  {"line":4709,"text":"\tif _, ok := f.vfs.ReadFile(oldPath); ok {"},
  {"line":4710,"text":"\t\toldFileNames[oldPath] = struct{}{}"},
  {"line":4711,"text":"\t} else {"},
  {"line":4712,"text":"\t\twalkErr := f.vfs.WalkDir(oldPath, func(path string, d vfs.DirEntry, err error) error {"},
  {"line":4713,"text":"\t\t\tif err != nil {"},
  {"line":4714,"text":"\t\t\t\treturn err"},
  {"line":4715,"text":"\t\t\t}"},
  {"line":4716,"text":"\t\t\tif !d.IsDir() {"},
  {"line":4717,"text":"\t\t\t\toldFileNames[path] = struct{}{}"},
  {"line":4718,"text":"\t\t\t}"},
  {"line":4719,"text":"\t\t\treturn nil"},
  {"line":4720,"text":"\t\t})"},
  {"line":4721,"text":"\t\tif walkErr != nil {"},
  {"line":4722,"text":"\t\t\tt.Fatalf(\"failed to collect files for rename %s -> %s: %v\", oldPath, newPath, walkErr)"},
  {"line":4723,"text":"\t\t}"},
  {"line":4724,"text":"\t}"},
  {"line":4725,"text":"\tif len(oldFileNames) == 0 {"},
  {"line":4726,"text":"\t\tt.Fatalf(\"rename source %s did not exist in test environment\", oldPath)"},
  {"line":4727,"text":"\t}"},
  {"line":4731,"text":"\tfileEvents := make([]*lsproto.FileEvent, 0, len(oldFileNames)*2)"},
  {"line":4732,"text":"\treopenAtNewPath := map[string]string{} // newFileName -> content, for files that were open"},
  {"line":4733,"text":"\tfor oldFileName := range oldFileNames {"},
  {"line":4734,"text":"\t\tnewFileName, updated := pathUpdater(oldFileName)"},
  {"line":4735,"text":"\t\tif !updated {"},
  {"line":4736,"text":"\t\t\tt.Fatalf(\"failed to compute renamed path for %s\", oldFileName)"},
  {"line":4737,"text":"\t\t}"},
  {"line":4740,"text":"\t\tif _, isOpen := f.openFiles[oldFileName]; isOpen {"},
  {"line":4741,"text":"\t\t\tscript := f.scriptInfos[oldFileName]"},
  {"line":4742,"text":"\t\t\treopenAtNewPath[newFileName] = script.content"},
  {"line":4743,"text":"\t\t\tsendNotification(t, f, lsproto.TextDocumentDidCloseInfo, &lsproto.DidCloseTextDocumentParams{"},
  {"line":4744,"text":"\t\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":4745,"text":"\t\t\t\t\tUri: lsconv.FileNameToDocumentURI(oldFileName),"},
  {"line":4746,"text":"\t\t\t\t},"},
  {"line":4747,"text":"\t\t\t})"},
  {"line":4748,"text":"\t\t\tdelete(f.openFiles, oldFileName)"},
  {"line":4749,"text":"\t\t}"},
  {"line":4751,"text":"\t\tf.scriptInfos[newFileName] = newScriptInfo(newFileName, f.scriptInfos[oldFileName].content)"},
  {"line":4752,"text":"\t\tdelete(f.scriptInfos, oldFileName)"},
  {"line":4755,"text":"\t\tcontent, updated := f.vfs.ReadFile(oldFileName)"},
  {"line":4756,"text":"\t\tif !updated {"},
  {"line":4757,"text":"\t\t\tt.Fatalf(\"failed to read content for %s during rename to %s\", oldFileName, newFileName)"},
  {"line":4758,"text":"\t\t}"},
  {"line":4759,"text":"\t\tif err := f.vfs.WriteFile(newFileName, content); err != nil {"},
  {"line":4760,"text":"\t\t\tt.Fatalf(\"failed to write renamed file %s: %v\", newFileName, err)"},
  {"line":4761,"text":"\t\t}"},
  {"line":4763,"text":"\t\tfileEvents = append(fileEvents,"},
  {"line":4764,"text":"\t\t\t&lsproto.FileEvent{Uri: lsconv.FileNameToDocumentURI(oldFileName), Type: lsproto.FileChangeTypeDeleted},"},
  {"line":4765,"text":"\t\t\t&lsproto.FileEvent{Uri: lsconv.FileNameToDocumentURI(newFileName), Type: lsproto.FileChangeTypeCreated},"},
  {"line":4766,"text":"\t\t)"},
  {"line":4767,"text":"\t}"},
  {"line":4770,"text":"\tif err := f.vfs.Remove(oldPath); err != nil {"},
  {"line":4771,"text":"\t\tt.Fatalf(\"failed to remove old path %s: %v\", oldPath, err)"},
  {"line":4772,"text":"\t}"},
  {"line":4773,"text":"\tsendNotification(t, f, lsproto.WorkspaceDidChangeWatchedFilesInfo, &lsproto.DidChangeWatchedFilesParams{"},
  {"line":4774,"text":"\t\tChanges: fileEvents,"},
  {"line":4775,"text":"\t})"},
  {"line":4778,"text":"\tfor newFileName, content := range reopenAtNewPath {"},
  {"line":4779,"text":"\t\tsendNotification(t, f, lsproto.TextDocumentDidOpenInfo, &lsproto.DidOpenTextDocumentParams{"},
  {"line":4780,"text":"\t\t\tTextDocument: &lsproto.TextDocumentItem{"},
  {"line":4781,"text":"\t\t\t\tUri:        lsconv.FileNameToDocumentURI(newFileName),"},
  {"line":4782,"text":"\t\t\t\tLanguageId: getLanguageKind(newFileName),"},
  {"line":4783,"text":"\t\t\t\tText:       content,"},
  {"line":4784,"text":"\t\t\t},"},
  {"line":4785,"text":"\t\t})"},
  {"line":4786,"text":"\t\tf.openFiles[newFileName] = struct{}{}"},
  {"line":4787,"text":"\t}"},
  {"line":4790,"text":"\tif updatedActive, ok := pathUpdater(f.activeFilename); ok {"},
  {"line":4791,"text":"\t\tf.activeFilename = updatedActive"},
  {"line":4792,"text":"\t}"},
  {"line":4793,"text":"}"},
  {"line":4795,"text":"func (f *FourslashTest) VerifyRenameFailed(t *testing.T, preferences *lsutil.UserPreferences) {"},
  {"line":4796,"text":"\tif preferences != nil {"},
  {"line":4797,"text":"\t\tdefer f.ConfigureWithReset(t, *preferences)()"},
  {"line":4798,"text":"\t}"},
  {"line":4799,"text":"\tparams := &lsproto.PrepareRenameParams{"},
  {"line":4800,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":4801,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":4802,"text":"\t\t},"},
  {"line":4803,"text":"\t\tPosition: f.currentCaretPosition,"},
  {"line":4804,"text":"\t}"},
  {"line":4806,"text":"\tprefix := f.getCurrentPositionPrefix()"},
  {"line":4807,"text":"\tf.baselineState(t)"},
  {"line":4808,"text":"\tf.baselineRequestOrNotification(t, lsproto.TextDocumentPrepareRenameInfo.Method, params)"},
  {"line":4809,"text":"\tresMsg, result, _ := lsptestutil.SendRequest(t, f.client, lsproto.TextDocumentPrepareRenameInfo, params)"},
  {"line":4810,"text":"\tf.baselineState(t)"},
  {"line":4813,"text":"\tif resMsg != nil && resMsg.AsResponse().Error != nil {"},
  {"line":4815,"text":"\t} else if result.Range != nil || result.PrepareRenamePlaceholder != nil || result.PrepareRenameDefaultBehavior != nil {"},
  {"line":4816,"text":"\t\tt.Fatalf(\"%sExpected rename to fail, but prepareRename returned a result\", prefix)"},
  {"line":4817,"text":"\t}"},
  {"line":4820,"text":"\trenameMsg, renameResult, _ := lsptestutil.SendRequest(t, f.client, lsproto.TextDocumentRenameInfo, &lsproto.RenameParams{"},
  {"line":4821,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":4822,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":4823,"text":"\t\t},"},
  {"line":4824,"text":"\t\tPosition: f.currentCaretPosition,"},
  {"line":4825,"text":"\t\tNewName:  \"RENAME_FAILED_TEST\","},
  {"line":4826,"text":"\t})"},
  {"line":4827,"text":"\tif renameMsg != nil && renameMsg.AsResponse().Error != nil {"},
  {"line":4828,"text":"\t\treturn"},
  {"line":4829,"text":"\t}"},
  {"line":4830,"text":"\tif renameResult.WorkspaceEdit != nil && renameResult.WorkspaceEdit.Changes != nil && len(*renameResult.WorkspaceEdit.Changes) > 0 {"},
  {"line":4831,"text":"\t\tt.Fatalf(\"%sprepareRename returned null but textDocument/rename returned changes\", prefix)"},
  {"line":4832,"text":"\t}"},
  {"line":4833,"text":"}"},
  {"line":4835,"text":"func (f *FourslashTest) VerifyBaselineRenameAtRangesWithText("},
  {"line":4836,"text":"\tt *testing.T,"},
  {"line":4837,"text":"\tpreferences *lsutil.UserPreferences,"},
  {"line":4838,"text":"\ttexts ...string,"},
  {"line":4839,"text":") {"},
  {"line":4840,"text":"\tvar markerOrRanges []MarkerOrRange"},
  {"line":4841,"text":"\tfor _, text := range texts {"},
  {"line":4842,"text":"\t\tranges := core.Map(f.GetRangesByText().Get(text), func(r *RangeMarker) MarkerOrRange { return r })"},
  {"line":4843,"text":"\t\tmarkerOrRanges = append(markerOrRanges, ranges...)"},
  {"line":4844,"text":"\t}"},
  {"line":4845,"text":"\tf.verifyBaselineRename(t, preferences, markerOrRanges)"},
  {"line":4846,"text":"}"},
  {"line":4848,"text":"func (f *FourslashTest) GetRangesByText() *collections.MultiMap[string, *RangeMarker] {"},
  {"line":4849,"text":"\tif f.rangesByText != nil {"},
  {"line":4850,"text":"\t\treturn f.rangesByText"},
  {"line":4851,"text":"\t}"},
  {"line":4852,"text":"\trangesByText := collections.MultiMap[string, *RangeMarker]{}"},
  {"line":4853,"text":"\tfor _, r := range f.testData.Ranges {"},
  {"line":4854,"text":"\t\trangeText := f.getRangeText(r)"},
  {"line":4855,"text":"\t\trangesByText.Add(rangeText, r)"},
  {"line":4856,"text":"\t}"},
  {"line":4857,"text":"\tf.rangesByText = &rangesByText"},
  {"line":4858,"text":"\treturn &rangesByText"},
  {"line":4859,"text":"}"},
  {"line":4861,"text":"func (f *FourslashTest) getRangeText(r *RangeMarker) string {"},
  {"line":4862,"text":"\tscript := f.getScriptInfo(r.FileName())"},
  {"line":4863,"text":"\treturn script.content[r.Range.Pos():r.Range.End()]"},
  {"line":4864,"text":"}"},
  {"line":4866,"text":"func (f *FourslashTest) verifyBaselines(t *testing.T, testPath string) {"},
  {"line":4867,"text":"\tif !f.testData.isStateBaseliningEnabled() {"},
  {"line":4868,"text":"\t\tfor command, content := range f.baselines {"},
  {"line":4869,"text":"\t\t\tbaseline.Run(t, getBaselineFileName(t, command), content.String(), f.getBaselineOptions(command, testPath))"},
  {"line":4870,"text":"\t\t}"},
  {"line":4871,"text":"\t} else {"},
  {"line":4872,"text":"\t\tbaseline.Run(t, getBaseFileNameFromTest(t)+\".baseline\", f.stateBaseline.baseline.String(), baseline.Options{Subfolder: \"fourslash/state\"})"},
  {"line":4873,"text":"\t}"},
  {"line":4874,"text":"}"},
  {"line":4876,"text":"func (f *FourslashTest) VerifyBaselineInlayHints("},
  {"line":4877,"text":"\tt *testing.T,"},
  {"line":4878,"text":"\tspan *lsproto.Range,"},
  {"line":4879,"text":"\ttestPreferences *lsutil.UserPreferences,"},
  {"line":4880,"text":") {"},
  {"line":4881,"text":"\tfileName := f.activeFilename"},
  {"line":4882,"text":"\tvar lspRange lsproto.Range"},
  {"line":4883,"text":"\tif span == nil {"},
  {"line":4884,"text":"\t\tlspRange = f.converters.ToLSPRange(f.getScriptInfo(fileName), core.NewTextRange(0, len(f.scriptInfos[fileName].content)))"},
  {"line":4885,"text":"\t} else {"},
  {"line":4886,"text":"\t\tlspRange = *span"},
  {"line":4887,"text":"\t}"},
  {"line":4889,"text":"\tparams := &lsproto.InlayHintParams{"},
  {"line":4890,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{Uri: lsconv.FileNameToDocumentURI(fileName)},"},
  {"line":4891,"text":"\t\tRange:        lspRange,"},
  {"line":4892,"text":"\t}"},
  {"line":4894,"text":"\tpreferences := testPreferences"},
  {"line":4895,"text":"\tif preferences == nil {"},
  {"line":4896,"text":"\t\tpreferences = new(lsutil.NewDefaultUserPreferences())"},
  {"line":4897,"text":"\t}"},
  {"line":4898,"text":"\treset := f.ConfigureWithReset(t, *preferences)"},
  {"line":4899,"text":"\tdefer reset()"},
  {"line":4901,"text":"\tprefix := fmt.Sprintf(\"At position (Ln %d, Col %d): \", lspRange.Start.Line, lspRange.Start.Character)"},
  {"line":4902,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentInlayHintInfo, params)"},
  {"line":4903,"text":"\tfileLines := strings.Split(f.getScriptInfo(fileName).content, \"\\n\")"},
  {"line":4904,"text":"\tvar annotations []string"},
  {"line":4905,"text":"\tif result.InlayHints != nil {"},
  {"line":4906,"text":"\t\tslices.SortFunc(*result.InlayHints, func(a, b *lsproto.InlayHint) int {"},
  {"line":4907,"text":"\t\t\treturn lsproto.ComparePositions(a.Position, b.Position)"},
  {"line":4908,"text":"\t\t})"},
  {"line":4909,"text":"\t\tannotations = core.Map(*result.InlayHints, func(hint *lsproto.InlayHint) string {"},
  {"line":4910,"text":"\t\t\tif hint.Label.InlayHintLabelParts != nil {"},
  {"line":4911,"text":"\t\t\t\tfor _, part := range *hint.Label.InlayHintLabelParts {"},
  {"line":4913,"text":"\t\t\t\t\tif part.Location != nil && isLibFile(part.Location.Uri.FileName()) {"},
  {"line":4914,"text":"\t\t\t\t\t\tpart.Location.Range.Start = lsproto.Position{Line: 0, Character: 0}"},
  {"line":4915,"text":"\t\t\t\t\t\tpart.Location.Range.End = lsproto.Position{Line: 0, Character: 0}"},
  {"line":4916,"text":"\t\t\t\t\t}"},
  {"line":4917,"text":"\t\t\t\t}"},
  {"line":4918,"text":"\t\t\t}"},
  {"line":4919,"text":"\t\t\tunderline := strings.Repeat(\" \", int(hint.Position.Character)) + \"^\""},
  {"line":4920,"text":"\t\t\thintJson, err := core.StringifyJson(hint, \"\", \"  \")"},
  {"line":4921,"text":"\t\t\tif err != nil {"},
  {"line":4922,"text":"\t\t\t\tt.Fatalf(prefix+\"Failed to stringify inlay hint for baseline: %v\", err)"},
  {"line":4923,"text":"\t\t\t}"},
  {"line":4924,"text":"\t\t\tannotation := fileLines[hint.Position.Line]"},
  {"line":4925,"text":"\t\t\tannotation += \"\\n\" + underline + \"\\n\" + hintJson"},
  {"line":4926,"text":"\t\t\treturn annotation"},
  {"line":4927,"text":"\t\t})"},
  {"line":4928,"text":"\t}"},
  {"line":4930,"text":"\tif len(annotations) == 0 {"},
  {"line":4931,"text":"\t\tannotations = append(annotations, \"=== No inlay hints ===\")"},
  {"line":4932,"text":"\t}"},
  {"line":4934,"text":"\tf.addResultToBaseline(t, inlayHintsCmd, strings.Join(annotations, \"\\n\\n\"))"},
  {"line":4935,"text":"}"},
  {"line":4937,"text":"func (f *FourslashTest) VerifyBaselineLinkedEditing(t *testing.T) {"},
  {"line":4938,"text":"\tbaselineBuilder := &strings.Builder{}"},
  {"line":4939,"text":"\toffset := 0"},
  {"line":4942,"text":"\tfor _, file := range f.testData.Files {"},
  {"line":4943,"text":"\t\tfmt.Fprint(baselineBuilder, \"// === Linked Editing ===\\n\")"},
  {"line":4944,"text":"\t\tfmt.Fprintf(baselineBuilder, \"=== %s ===\\n\", file.FileName())"},
  {"line":4945,"text":"\t\tresults := []*lsproto.LinkedEditingRanges{}"},
  {"line":4946,"text":"\t\tfound := map[lsproto.Range]bool{}"},
  {"line":4949,"text":"\t\tfor i := range file.Content {"},
  {"line":4950,"text":"\t\t\tparams := &lsproto.LinkedEditingRangeParams{"},
  {"line":4951,"text":"\t\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":4952,"text":"\t\t\t\t\tUri: lsconv.FileNameToDocumentURI(file.FileName()),"},
  {"line":4953,"text":"\t\t\t\t},"},
  {"line":4954,"text":"\t\t\t\tPosition: f.converters.PositionToLineAndCharacter(f.getScriptInfo(file.FileName()), core.TextPos(i)),"},
  {"line":4955,"text":"\t\t\t}"},
  {"line":4956,"text":"\t\t\tresult := sendRequest(t, f, lsproto.TextDocumentLinkedEditingRangeInfo, params)"},
  {"line":4957,"text":"\t\t\tif result.LinkedEditingRanges != nil && len(result.LinkedEditingRanges.Ranges) > 0 && !found[result.LinkedEditingRanges.Ranges[0]] {"},
  {"line":4958,"text":"\t\t\t\tresults = append(results, result.LinkedEditingRanges)"},
  {"line":4959,"text":"\t\t\t\tfound[result.LinkedEditingRanges.Ranges[0]] = true"},
  {"line":4960,"text":"\t\t\t}"},
  {"line":4961,"text":"\t\t}"},
  {"line":4963,"text":"\t\tif len(results) == 0 {"},
  {"line":4964,"text":"\t\t\tfmt.Fprintf(baselineBuilder, \"%s\\n\\n--No linked edits found--\\n\\n\\n\", file.Content)"},
  {"line":4965,"text":"\t\t\tcontinue"},
  {"line":4966,"text":"\t\t}"},
  {"line":4969,"text":"\t\tslices.SortFunc(results, func(a, b *lsproto.LinkedEditingRanges) int {"},
  {"line":4970,"text":"\t\t\treturn lsproto.ComparePositions(a.Ranges[0].Start, b.Ranges[0].Start)"},
  {"line":4971,"text":"\t\t})"},
  {"line":4972,"text":"\t\tbaselineDetails := []baselineDetail{}"},
  {"line":4973,"text":"\t\tfoundEditInfoBuilder := &strings.Builder{}"},
  {"line":4974,"text":"\t\tfor _, edit := range results {"},
  {"line":4975,"text":"\t\t\tbaselineDetails = append(baselineDetails, baselineDetail{"},
  {"line":4976,"text":"\t\t\t\tpos:            edit.Ranges[0].Start,"},
  {"line":4977,"text":"\t\t\t\tpositionMarker: fmt.Sprintf(\"[|/*%d*/\", offset),"},
  {"line":4978,"text":"\t\t\t})"},
  {"line":4979,"text":"\t\t\tbaselineDetails = append(baselineDetails, baselineDetail{"},
  {"line":4980,"text":"\t\t\t\tpos:            edit.Ranges[0].End,"},
  {"line":4981,"text":"\t\t\t\tpositionMarker: \"|]\","},
  {"line":4982,"text":"\t\t\t})"},
  {"line":4983,"text":"\t\t\tbaselineDetails = append(baselineDetails, baselineDetail{"},
  {"line":4984,"text":"\t\t\t\tpos:            edit.Ranges[1].Start,"},
  {"line":4985,"text":"\t\t\t\tpositionMarker: fmt.Sprintf(\"[|/*%d*/\", offset),"},
  {"line":4986,"text":"\t\t\t})"},
  {"line":4987,"text":"\t\t\tbaselineDetails = append(baselineDetails, baselineDetail{"},
  {"line":4988,"text":"\t\t\t\tpos:            edit.Ranges[1].End,"},
  {"line":4989,"text":"\t\t\t\tpositionMarker: \"|]\","},
  {"line":4990,"text":"\t\t\t})"},
  {"line":4992,"text":"\t\t\tfmt.Fprintf(foundEditInfoBuilder, \"\\n\\n=== %d ===\\n%s\", offset, core.Must(core.StringifyJson(edit, \"\", \"  \")))"},
  {"line":4993,"text":"\t\t\toffset++"},
  {"line":4994,"text":"\t\t}"},
  {"line":4997,"text":"\t\tslices.SortStableFunc(baselineDetails, func(a, b baselineDetail) int {"},
  {"line":4998,"text":"\t\t\treturn lsproto.ComparePositions(a.pos, b.pos)"},
  {"line":4999,"text":"\t\t})"},
  {"line":5002,"text":"\t\tlastPosition := 0"},
  {"line":5003,"text":"\t\tfor _, detail := range baselineDetails {"},
  {"line":5004,"text":"\t\t\tcurrentPosition := f.converters.LineAndCharacterToPosition(f.getScriptInfo(file.FileName()), detail.pos)"},
  {"line":5005,"text":"\t\t\tfmt.Fprint(baselineBuilder, file.Content[lastPosition:currentPosition])"},
  {"line":5006,"text":"\t\t\tfmt.Fprint(baselineBuilder, detail.positionMarker)"},
  {"line":5007,"text":"\t\t\tlastPosition = int(currentPosition)"},
  {"line":5008,"text":"\t\t}"},
  {"line":5009,"text":"\t\tfmt.Fprint(baselineBuilder, file.Content[lastPosition:])"},
  {"line":5010,"text":"\t\tbaselineBuilder.WriteString(foundEditInfoBuilder.String() + \"\\n\\n\\n\")"},
  {"line":5011,"text":"\t}"},
  {"line":5013,"text":"\tf.writeToBaseline(linkedEditingCmd, baselineBuilder.String())"},
  {"line":5014,"text":"}"},
  {"line":5016,"text":"func (f *FourslashTest) VerifyLinkedEditing(t *testing.T, markerNamesToExpected map[string][]lsproto.Range) {"},
  {"line":5017,"text":"\tfor markerName, expectedRanges := range markerNamesToExpected {"},
  {"line":5018,"text":"\t\tf.GoToMarker(t, markerName)"},
  {"line":5019,"text":"\t\tparams := &lsproto.LinkedEditingRangeParams{"},
  {"line":5020,"text":"\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":5021,"text":"\t\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":5022,"text":"\t\t\t},"},
  {"line":5023,"text":"\t\t\tPosition: f.currentCaretPosition,"},
  {"line":5024,"text":"\t\t}"},
  {"line":5025,"text":"\t\tresult := sendRequest(t, f, lsproto.TextDocumentLinkedEditingRangeInfo, params)"},
  {"line":5026,"text":"\t\tactualRanges := result.LinkedEditingRanges"},
  {"line":5027,"text":"\t\tif len(expectedRanges) == 0 {"},
  {"line":5028,"text":"\t\t\tif actualRanges != nil && len(actualRanges.Ranges) != 0 {"},
  {"line":5029,"text":"\t\t\t\tt.Fatalf(\"Expected no linked editing ranges for marker '%s', but found %v\", markerName, actualRanges)"},
  {"line":5030,"text":"\t\t\t}"},
  {"line":5031,"text":"\t\t\tcontinue"},
  {"line":5032,"text":"\t\t} else {"},
  {"line":5033,"text":"\t\t\tif actualRanges == nil || len(actualRanges.Ranges) == 0 {"},
  {"line":5034,"text":"\t\t\t\tt.Fatalf(\"Expected linked editing ranges for marker '%s', but found none\", markerName)"},
  {"line":5035,"text":"\t\t\t}"},
  {"line":5037,"text":"\t\t\tassertDeepEqual(t, actualRanges.Ranges[0], expectedRanges[0], fmt.Sprintf(\"Linked editing ranges for opening element do not match expected for marker '%s'\", markerName))"},
  {"line":5038,"text":"\t\t\tassertDeepEqual(t, actualRanges.Ranges[1], expectedRanges[1], fmt.Sprintf(\"Linked editing ranges for closing element do not match expected for marker '%s'\", markerName))"},
  {"line":5039,"text":"\t\t}"},
  {"line":5040,"text":"\t}"},
  {"line":5041,"text":"}"},
  {"line":5043,"text":"func (f *FourslashTest) VerifyDiagnostics(t *testing.T, expected []*lsproto.Diagnostic) {"},
  {"line":5044,"text":"\tf.verifyDiagnostics(t, expected, func(d *lsproto.Diagnostic) bool { return true })"},
  {"line":5045,"text":"}"},
  {"line":5048,"text":"func (f *FourslashTest) VerifyNonSuggestionDiagnostics(t *testing.T, expected []*lsproto.Diagnostic) {"},
  {"line":5049,"text":"\tf.verifyDiagnostics(t, expected, func(d *lsproto.Diagnostic) bool { return !isSuggestionDiagnostic(d) })"},
  {"line":5050,"text":"}"},
  {"line":5053,"text":"func (f *FourslashTest) VerifySuggestionDiagnostics(t *testing.T, expected []*lsproto.Diagnostic) {"},
  {"line":5054,"text":"\tf.verifyDiagnostics(t, expected, isSuggestionDiagnostic)"},
  {"line":5055,"text":"}"},
  {"line":5057,"text":"func (f *FourslashTest) verifyDiagnostics(t *testing.T, expected []*lsproto.Diagnostic, filterDiagnostics func(*lsproto.Diagnostic) bool) {"},
  {"line":5058,"text":"\tactualDiagnostics := f.getDiagnostics(t, f.activeFilename)"},
  {"line":5059,"text":"\tactualDiagnostics = core.Filter(actualDiagnostics, filterDiagnostics)"},
  {"line":5060,"text":"\temptyRange := lsproto.Range{}"},
  {"line":5061,"text":"\texpectedWithRanges := make([]*lsproto.Diagnostic, len(expected))"},
  {"line":5062,"text":"\tfor i, diag := range expected {"},
  {"line":5063,"text":"\t\tif diag.Range == emptyRange {"},
  {"line":5064,"text":"\t\t\trangesInFile := f.getRangesInFile(f.activeFilename)"},
  {"line":5065,"text":"\t\t\tif len(rangesInFile) == 0 {"},
  {"line":5066,"text":"\t\t\t\tt.Fatalf(\"No ranges found in file %s to assign to diagnostic with empty range\", f.activeFilename)"},
  {"line":5067,"text":"\t\t\t}"},
  {"line":5068,"text":"\t\t\tdiagWithRange := *diag"},
  {"line":5069,"text":"\t\t\tdiagWithRange.Range = rangesInFile[0].LSRange"},
  {"line":5070,"text":"\t\t\texpectedWithRanges[i] = &diagWithRange"},
  {"line":5071,"text":"\t\t} else {"},
  {"line":5072,"text":"\t\t\texpectedWithRanges[i] = diag"},
  {"line":5073,"text":"\t\t}"},
  {"line":5074,"text":"\t}"},
  {"line":5075,"text":"\tif len(actualDiagnostics) == 0 && len(expectedWithRanges) == 0 {"},
  {"line":5076,"text":"\t\treturn"},
  {"line":5077,"text":"\t}"},
  {"line":5078,"text":"\tassertDeepEqual(t, actualDiagnostics, expectedWithRanges, \"Diagnostics do not match expected\", diagnosticsIgnoreOpts)"},
  {"line":5079,"text":"}"},
  {"line":5081,"text":"func (f *FourslashTest) getDiagnostics(t *testing.T, fileName string) []*lsproto.Diagnostic {"},
  {"line":5082,"text":"\tparams := &lsproto.DocumentDiagnosticParams{"},
  {"line":5083,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":5084,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(fileName),"},
  {"line":5085,"text":"\t\t},"},
  {"line":5086,"text":"\t}"},
  {"line":5087,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentDiagnosticInfo, params)"},
  {"line":5088,"text":"\tif result.FullDocumentDiagnosticReport != nil {"},
  {"line":5089,"text":"\t\treturn result.FullDocumentDiagnosticReport.Items"},
  {"line":5090,"text":"\t}"},
  {"line":5091,"text":"\treturn nil"},
  {"line":5092,"text":"}"},
  {"line":5094,"text":"func isSuggestionDiagnostic(diag *lsproto.Diagnostic) bool {"},
  {"line":5095,"text":"\treturn diag.Severity != nil && *diag.Severity == lsproto.DiagnosticSeverityHint"},
  {"line":5096,"text":"}"},
  {"line":5098,"text":"func (f *FourslashTest) VerifyBaselineNonSuggestionDiagnostics(t *testing.T) {"},
  {"line":5099,"text":"\tvar diagnostics []*fourslashDiagnostic"},
  {"line":5100,"text":"\tvar files []*harnessutil.TestFile"},
  {"line":5101,"text":"\tfor fileName, scriptInfo := range f.scriptInfos {"},
  {"line":5102,"text":"\t\tif tspath.HasJSONFileExtension(fileName) {"},
  {"line":5103,"text":"\t\t\tcontinue"},
  {"line":5104,"text":"\t\t}"},
  {"line":5105,"text":"\t\tfiles = append(files, &harnessutil.TestFile{UnitName: fileName, Content: scriptInfo.content})"},
  {"line":5106,"text":"\t\tlspDiagnostics := core.Filter("},
  {"line":5107,"text":"\t\t\tf.getDiagnostics(t, fileName),"},
  {"line":5108,"text":"\t\t\tfunc(d *lsproto.Diagnostic) bool { return !isSuggestionDiagnostic(d) },"},
  {"line":5109,"text":"\t\t)"},
  {"line":5110,"text":"\t\tdiagnostics = append(diagnostics, core.Map(lspDiagnostics, func(d *lsproto.Diagnostic) *fourslashDiagnostic {"},
  {"line":5111,"text":"\t\t\treturn f.toDiagnostic(scriptInfo, d)"},
  {"line":5112,"text":"\t\t})...)"},
  {"line":5113,"text":"\t}"},
  {"line":5114,"text":"\tslices.SortFunc(files, func(a, b *harnessutil.TestFile) int {"},
  {"line":5115,"text":"\t\treturn strings.Compare(a.UnitName, b.UnitName)"},
  {"line":5116,"text":"\t})"},
  {"line":5117,"text":"\tresult := tsbaseline.GetErrorBaseline(t, files, diagnostics, compareDiagnostics, false /*pretty*/)"},
  {"line":5118,"text":"\tf.addResultToBaseline(t, nonSuggestionDiagnosticsCmd, result)"},
  {"line":5119,"text":"}"},
  {"line":5121,"text":"type fourslashDiagnostic struct {"},
  {"line":5122,"text":"\tfile               *fourslashDiagnosticFile"},
  {"line":5123,"text":"\tloc                core.TextRange"},
  {"line":5124,"text":"\tcode               int32"},
  {"line":5125,"text":"\tcategory           diagnostics.Category"},
  {"line":5126,"text":"\tmessage            string"},
  {"line":5127,"text":"\trelatedDiagnostics []*fourslashDiagnostic"},
  {"line":5128,"text":"\treportsUnnecessary bool"},
  {"line":5129,"text":"\treportsDeprecated  bool"},
  {"line":5130,"text":"}"},
  {"line":5132,"text":"type fourslashDiagnosticFile struct {"},
  {"line":5133,"text":"\tfile        *harnessutil.TestFile"},
  {"line":5134,"text":"\tecmaLineMap []core.TextPos"},
  {"line":5135,"text":"}"},
  {"line":5137,"text":"var _ diagnosticwriter.FileLike = (*fourslashDiagnosticFile)(nil)"},
  {"line":5139,"text":"func (f *fourslashDiagnosticFile) FileName() string {"},
  {"line":5140,"text":"\treturn f.file.UnitName"},
  {"line":5141,"text":"}"},
  {"line":5143,"text":"func (f *fourslashDiagnosticFile) Text() string {"},
  {"line":5144,"text":"\treturn f.file.Content"},
  {"line":5145,"text":"}"},
  {"line":5147,"text":"func (f *fourslashDiagnosticFile) ECMALineMap() []core.TextPos {"},
  {"line":5148,"text":"\tif f.ecmaLineMap == nil {"},
  {"line":5149,"text":"\t\tf.ecmaLineMap = core.ComputeECMALineStarts(f.file.Content)"},
  {"line":5150,"text":"\t}"},
  {"line":5151,"text":"\treturn f.ecmaLineMap"},
  {"line":5152,"text":"}"},
  {"line":5154,"text":"var _ diagnosticwriter.Diagnostic = (*fourslashDiagnostic)(nil)"},
  {"line":5156,"text":"func (d *fourslashDiagnostic) File() diagnosticwriter.FileLike {"},
  {"line":5157,"text":"\treturn d.file"},
  {"line":5158,"text":"}"},
  {"line":5160,"text":"func (d *fourslashDiagnostic) Pos() int {"},
  {"line":5161,"text":"\treturn d.loc.Pos()"},
  {"line":5162,"text":"}"},
  {"line":5164,"text":"func (d *fourslashDiagnostic) End() int {"},
  {"line":5165,"text":"\treturn d.loc.End()"},
  {"line":5166,"text":"}"},
  {"line":5168,"text":"func (d *fourslashDiagnostic) Len() int {"},
  {"line":5169,"text":"\treturn d.loc.Len()"},
  {"line":5170,"text":"}"},
  {"line":5172,"text":"func (d *fourslashDiagnostic) Code() int32 {"},
  {"line":5173,"text":"\treturn d.code"},
  {"line":5174,"text":"}"},
  {"line":5176,"text":"func (d *fourslashDiagnostic) Category() diagnostics.Category {"},
  {"line":5177,"text":"\treturn d.category"},
  {"line":5178,"text":"}"},
  {"line":5180,"text":"func (d *fourslashDiagnostic) Localize(locale locale.Locale) string {"},
  {"line":5181,"text":"\treturn d.message"},
  {"line":5182,"text":"}"},
  {"line":5184,"text":"func (d *fourslashDiagnostic) MessageChain() []diagnosticwriter.Diagnostic {"},
  {"line":5185,"text":"\treturn nil"},
  {"line":5186,"text":"}"},
  {"line":5188,"text":"func (d *fourslashDiagnostic) RelatedInformation() []diagnosticwriter.Diagnostic {"},
  {"line":5189,"text":"\trelatedInfo := make([]diagnosticwriter.Diagnostic, 0, len(d.relatedDiagnostics))"},
  {"line":5190,"text":"\tfor _, relDiag := range d.relatedDiagnostics {"},
  {"line":5191,"text":"\t\trelatedInfo = append(relatedInfo, relDiag)"},
  {"line":5192,"text":"\t}"},
  {"line":5193,"text":"\treturn relatedInfo"},
  {"line":5194,"text":"}"},
  {"line":5196,"text":"func (f *FourslashTest) toDiagnostic(scriptInfo *scriptInfo, lspDiagnostic *lsproto.Diagnostic) *fourslashDiagnostic {"},
  {"line":5197,"text":"\tvar category diagnostics.Category"},
  {"line":5198,"text":"\tswitch *lspDiagnostic.Severity {"},
  {"line":5199,"text":"\tcase lsproto.DiagnosticSeverityError:"},
  {"line":5200,"text":"\t\tcategory = diagnostics.CategoryError"},
  {"line":5201,"text":"\tcase lsproto.DiagnosticSeverityWarning:"},
  {"line":5202,"text":"\t\tcategory = diagnostics.CategoryWarning"},
  {"line":5203,"text":"\tcase lsproto.DiagnosticSeverityInformation:"},
  {"line":5204,"text":"\t\tcategory = diagnostics.CategoryMessage"},
  {"line":5205,"text":"\tcase lsproto.DiagnosticSeverityHint:"},
  {"line":5206,"text":"\t\tcategory = diagnostics.CategorySuggestion"},
  {"line":5207,"text":"\tdefault:"},
  {"line":5208,"text":"\t\tcategory = diagnostics.CategoryError"},
  {"line":5209,"text":"\t}"},
  {"line":5210,"text":"\tcode := *lspDiagnostic.Code.Integer"},
  {"line":5212,"text":"\tvar relatedDiagnostics []*fourslashDiagnostic"},
  {"line":5213,"text":"\tif lspDiagnostic.RelatedInformation != nil {"},
  {"line":5214,"text":"\t\tfor _, info := range *lspDiagnostic.RelatedInformation {"},
  {"line":5215,"text":"\t\t\trelatedScriptInfo := f.getScriptInfo(info.Location.Uri.FileName())"},
  {"line":5216,"text":"\t\t\tif relatedScriptInfo == nil {"},
  {"line":5217,"text":"\t\t\t\tcontinue"},
  {"line":5218,"text":"\t\t\t}"},
  {"line":5219,"text":"\t\t\trelatedDiagnostic := &fourslashDiagnostic{"},
  {"line":5220,"text":"\t\t\t\tfile:     &fourslashDiagnosticFile{file: &harnessutil.TestFile{UnitName: relatedScriptInfo.fileName, Content: relatedScriptInfo.content}},"},
  {"line":5221,"text":"\t\t\t\tloc:      f.converters.FromLSPRange(relatedScriptInfo, info.Location.Range),"},
  {"line":5222,"text":"\t\t\t\tcode:     code,"},
  {"line":5223,"text":"\t\t\t\tcategory: category,"},
  {"line":5224,"text":"\t\t\t\tmessage:  info.Message,"},
  {"line":5225,"text":"\t\t\t}"},
  {"line":5226,"text":"\t\t\trelatedDiagnostics = append(relatedDiagnostics, relatedDiagnostic)"},
  {"line":5227,"text":"\t\t}"},
  {"line":5228,"text":"\t}"},
  {"line":5230,"text":"\tdiagnostic := &fourslashDiagnostic{"},
  {"line":5231,"text":"\t\tfile: &fourslashDiagnosticFile{"},
  {"line":5232,"text":"\t\t\tfile: &harnessutil.TestFile{"},
  {"line":5233,"text":"\t\t\t\tUnitName: scriptInfo.fileName,"},
  {"line":5234,"text":"\t\t\t\tContent:  scriptInfo.content,"},
  {"line":5235,"text":"\t\t\t},"},
  {"line":5236,"text":"\t\t},"},
  {"line":5237,"text":"\t\tloc:                f.converters.FromLSPRange(scriptInfo, lspDiagnostic.Range),"},
  {"line":5238,"text":"\t\tcode:               code,"},
  {"line":5239,"text":"\t\tcategory:           category,"},
  {"line":5240,"text":"\t\tmessage:            lspDiagnostic.Message,"},
  {"line":5241,"text":"\t\trelatedDiagnostics: relatedDiagnostics,"},
  {"line":5242,"text":"\t}"},
  {"line":5243,"text":"\treturn diagnostic"},
  {"line":5244,"text":"}"},
  {"line":5246,"text":"func compareDiagnostics(d1, d2 *fourslashDiagnostic) int {"},
  {"line":5247,"text":"\tc := strings.Compare(d1.file.FileName(), d2.file.FileName())"},
  {"line":5248,"text":"\tif c != 0 {"},
  {"line":5249,"text":"\t\treturn c"},
  {"line":5250,"text":"\t}"},
  {"line":5251,"text":"\tc = d1.Pos() - d2.Pos()"},
  {"line":5252,"text":"\tif c != 0 {"},
  {"line":5253,"text":"\t\treturn c"},
  {"line":5254,"text":"\t}"},
  {"line":5255,"text":"\tc = d1.End() - d2.End()"},
  {"line":5256,"text":"\tif c != 0 {"},
  {"line":5257,"text":"\t\treturn c"},
  {"line":5258,"text":"\t}"},
  {"line":5259,"text":"\tc = int(d1.code) - int(d2.code)"},
  {"line":5260,"text":"\tif c != 0 {"},
  {"line":5261,"text":"\t\treturn c"},
  {"line":5262,"text":"\t}"},
  {"line":5263,"text":"\tc = strings.Compare(d1.message, d2.message)"},
  {"line":5264,"text":"\tif c != 0 {"},
  {"line":5265,"text":"\t\treturn c"},
  {"line":5266,"text":"\t}"},
  {"line":5267,"text":"\treturn compareRelatedDiagnostics(d1.relatedDiagnostics, d2.relatedDiagnostics)"},
  {"line":5268,"text":"}"},
  {"line":5270,"text":"func compareRelatedDiagnostics(d1, d2 []*fourslashDiagnostic) int {"},
  {"line":5271,"text":"\tc := len(d2) - len(d1)"},
  {"line":5272,"text":"\tif c != 0 {"},
  {"line":5273,"text":"\t\treturn c"},
  {"line":5274,"text":"\t}"},
  {"line":5275,"text":"\tfor i := range d1 {"},
  {"line":5276,"text":"\t\tc = compareDiagnostics(d1[i], d2[i])"},
  {"line":5277,"text":"\t\tif c != 0 {"},
  {"line":5278,"text":"\t\t\treturn c"},
  {"line":5279,"text":"\t\t}"},
  {"line":5280,"text":"\t}"},
  {"line":5281,"text":"\treturn 0"},
  {"line":5282,"text":"}"},
  {"line":5284,"text":"func isLibFile(fileName string) bool {"},
  {"line":5285,"text":"\tbaseName := tspath.GetBaseFileName(fileName)"},
  {"line":5286,"text":"\tif strings.HasPrefix(baseName, \"lib.\") && strings.HasSuffix(baseName, \".d.ts\") {"},
  {"line":5287,"text":"\t\treturn true"},
  {"line":5288,"text":"\t}"},
  {"line":5289,"text":"\treturn false"},
  {"line":5290,"text":"}"},
  {"line":5292,"text":"var AnyTextEdits *[]*lsproto.TextEdit"},
  {"line":5294,"text":"func (f *FourslashTest) VerifyBaselineGoToImplementation(t *testing.T, markerNames ...string) {"},
  {"line":5295,"text":"\tf.verifyBaselineDefinitions("},
  {"line":5296,"text":"\t\tt,"},
  {"line":5297,"text":"\t\tgoToImplementationCmd,"},
  {"line":5298,"text":"\t\t\"/*GOTO IMPL*/\", /*definitionMarker*/"},
  {"line":5299,"text":"\t\tfunc(t *testing.T, f *FourslashTest, fileName string, position lsproto.Position) lsproto.LocationOrLocationsOrDefinitionLinksOrNull {"},
  {"line":5300,"text":"\t\t\tparams := &lsproto.ImplementationParams{"},
  {"line":5301,"text":"\t\t\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":5302,"text":"\t\t\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":5303,"text":"\t\t\t\t},"},
  {"line":5304,"text":"\t\t\t\tPosition: f.currentCaretPosition,"},
  {"line":5305,"text":"\t\t\t}"},
  {"line":5307,"text":"\t\t\treturn sendRequest(t, f, lsproto.TextDocumentImplementationInfo, params)"},
  {"line":5308,"text":"\t\t},"},
  {"line":5309,"text":"\t\tfalse, /*includeOriginalSelectionRange*/"},
  {"line":5310,"text":"\t\tmarkerNames...,"},
  {"line":5311,"text":"\t)"},
  {"line":5312,"text":"}"},
  {"line":5314,"text":"type VerifyWorkspaceSymbolCase struct {"},
  {"line":5315,"text":"\tPattern     string"},
  {"line":5316,"text":"\tIncludes    *[]*lsproto.SymbolInformation"},
  {"line":5317,"text":"\tExact       *[]*lsproto.SymbolInformation"},
  {"line":5318,"text":"\tPreferences *lsutil.UserPreferences"},
  {"line":5319,"text":"}"},
  {"line":5322,"text":"func (f *FourslashTest) VerifyWorkspaceSymbol(t *testing.T, cases []*VerifyWorkspaceSymbolCase) {"},
  {"line":5323,"text":"\toriginalPreferences := f.userPreferences"},
  {"line":5324,"text":"\tfor _, testCase := range cases {"},
  {"line":5325,"text":"\t\tpreferences := testCase.Preferences"},
  {"line":5326,"text":"\t\tif preferences == nil {"},
  {"line":5327,"text":"\t\t\tpreferences = new(lsutil.NewDefaultUserPreferences())"},
  {"line":5328,"text":"\t\t}"},
  {"line":5329,"text":"\t\tf.Configure(t, *preferences)"},
  {"line":5330,"text":"\t\tresult := sendRequest(t, f, lsproto.WorkspaceSymbolInfo, &lsproto.WorkspaceSymbolParams{Query: testCase.Pattern})"},
  {"line":5331,"text":"\t\tif result.SymbolInformations == nil {"},
  {"line":5332,"text":"\t\t\tt.Fatalf(\"Expected non-nil symbol information array from workspace symbol request\")"},
  {"line":5333,"text":"\t\t}"},
  {"line":5334,"text":"\t\tif testCase.Includes != nil {"},
  {"line":5335,"text":"\t\t\tif testCase.Exact != nil {"},
  {"line":5336,"text":"\t\t\t\tt.Fatalf(\"Test case cannot have both 'Includes' and 'Exact' fields set\")"},
  {"line":5337,"text":"\t\t\t}"},
  {"line":5338,"text":"\t\t\tverifyIncludesSymbols(t, *result.SymbolInformations, *testCase.Includes, \"Workspace symbols mismatch with pattern '\"+testCase.Pattern+\"'\")"},
  {"line":5339,"text":"\t\t} else {"},
  {"line":5340,"text":"\t\t\tif testCase.Exact == nil {"},
  {"line":5341,"text":"\t\t\t\tt.Fatalf(\"Test case must have either 'Includes' or 'Exact' field set\")"},
  {"line":5342,"text":"\t\t\t}"},
  {"line":5343,"text":"\t\t\tverifyExactSymbols(t, *result.SymbolInformations, *testCase.Exact, \"Workspace symbols mismatch with pattern '\"+testCase.Pattern+\"'\")"},
  {"line":5344,"text":"\t\t}"},
  {"line":5345,"text":"\t}"},
  {"line":5346,"text":"\tf.Configure(t, originalPreferences)"},
  {"line":5347,"text":"}"},
  {"line":5349,"text":"func verifyExactSymbols("},
  {"line":5350,"text":"\tt *testing.T,"},
  {"line":5351,"text":"\tactual []*lsproto.SymbolInformation,"},
  {"line":5352,"text":"\texpected []*lsproto.SymbolInformation,"},
  {"line":5353,"text":"\tprefix string,"},
  {"line":5354,"text":") {"},
  {"line":5355,"text":"\tif len(actual) != len(expected) {"},
  {"line":5356,"text":"\t\tt.Fatalf(\"%s: Expected %d symbols, but got %d:\\n%s\", prefix, len(expected), len(actual), cmp.Diff(actual, expected))"},
  {"line":5357,"text":"\t}"},
  {"line":5358,"text":"\tfor i := range actual {"},
  {"line":5359,"text":"\t\tassertDeepEqual(t, actual[i], expected[i], prefix)"},
  {"line":5360,"text":"\t}"},
  {"line":5361,"text":"}"},
  {"line":5363,"text":"func verifyIncludesSymbols("},
  {"line":5364,"text":"\tt *testing.T,"},
  {"line":5365,"text":"\tactual []*lsproto.SymbolInformation,"},
  {"line":5366,"text":"\tincludes []*lsproto.SymbolInformation,"},
  {"line":5367,"text":"\tprefix string,"},
  {"line":5368,"text":") {"},
  {"line":5369,"text":"\ttype key struct {"},
  {"line":5370,"text":"\t\tname string"},
  {"line":5371,"text":"\t\tloc  lsproto.Location"},
  {"line":5372,"text":"\t}"},
  {"line":5373,"text":"\tnameAndLocToActualSymbol := make(map[key]*lsproto.SymbolInformation, len(actual))"},
  {"line":5374,"text":"\tfor _, sym := range actual {"},
  {"line":5375,"text":"\t\tnameAndLocToActualSymbol[key{name: sym.Name, loc: sym.Location}] = sym"},
  {"line":5376,"text":"\t}"},
  {"line":5378,"text":"\tfor _, sym := range includes {"},
  {"line":5379,"text":"\t\tactualSym, ok := nameAndLocToActualSymbol[key{name: sym.Name, loc: sym.Location}]"},
  {"line":5380,"text":"\t\tif !ok {"},
  {"line":5381,"text":"\t\t\tt.Fatalf(\"%s: Expected symbol '%s' at location '%v' not found\", prefix, sym.Name, sym.Location)"},
  {"line":5382,"text":"\t\t}"},
  {"line":5383,"text":"\t\tassertDeepEqual(t, actualSym, sym, fmt.Sprintf(\"%s: Symbol '%s' at location '%v' mismatch\", prefix, sym.Name, sym.Location))"},
  {"line":5384,"text":"\t}"},
  {"line":5385,"text":"}"},
  {"line":5387,"text":"func (f *FourslashTest) VerifyBaselineDocumentSymbol(t *testing.T) {"},
  {"line":5388,"text":"\tparams := &lsproto.DocumentSymbolParams{"},
  {"line":5389,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":5390,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":5391,"text":"\t\t},"},
  {"line":5392,"text":"\t}"},
  {"line":5393,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentDocumentSymbolInfo, params)"},
  {"line":5394,"text":"\turi := lsconv.FileNameToDocumentURI(f.activeFilename)"},
  {"line":5395,"text":"\tspansToSymbol := make(map[documentSpan]*lsproto.DocumentSymbol)"},
  {"line":5396,"text":"\tif result.DocumentSymbols != nil {"},
  {"line":5397,"text":"\t\tfor _, symbol := range *result.DocumentSymbols {"},
  {"line":5398,"text":"\t\t\tcollectDocumentSymbolSpans(uri, symbol, spansToSymbol)"},
  {"line":5399,"text":"\t\t}"},
  {"line":5400,"text":"\t}"},
  {"line":5401,"text":"\tf.addResultToBaseline("},
  {"line":5402,"text":"\t\tt,"},
  {"line":5403,"text":"\t\tdocumentSymbolsCmd,"},
  {"line":5404,"text":"\t\tf.getBaselineForSpansWithFileContents(slices.Collect(maps.Keys(spansToSymbol)), baselineFourslashLocationsOptions{"},
  {"line":5405,"text":"\t\t\tgetLocationData: func(span documentSpan) string {"},
  {"line":5406,"text":"\t\t\t\tsymbol := spansToSymbol[span]"},
  {"line":5407,"text":"\t\t\t\treturn fmt.Sprintf(\"{| name: %s, kind: %s |}\", symbol.Name, symbol.Kind.String())"},
  {"line":5408,"text":"\t\t\t},"},
  {"line":5409,"text":"\t\t}),"},
  {"line":5410,"text":"\t)"},
  {"line":5412,"text":"\tvar detailsBuilder strings.Builder"},
  {"line":5413,"text":"\tif result.DocumentSymbols != nil {"},
  {"line":5414,"text":"\t\twriteDocumentSymbolDetails(*result.DocumentSymbols, 0, &detailsBuilder)"},
  {"line":5415,"text":"\t}"},
  {"line":5416,"text":"\tf.writeToBaseline(documentSymbolsCmd, \"\\n\\n// === Details ===\\n\"+detailsBuilder.String())"},
  {"line":5417,"text":"}"},
  {"line":5419,"text":"func writeDocumentSymbolDetails(symbols []*lsproto.DocumentSymbol, indent int, builder *strings.Builder) {"},
  {"line":5420,"text":"\tfor _, symbol := range symbols {"},
  {"line":5421,"text":"\t\tfmt.Fprintf(builder, \"%s(%s) %s\\n\", strings.Repeat(\"  \", indent), symbol.Kind.String(), symbol.Name)"},
  {"line":5422,"text":"\t\tif symbol.Children != nil {"},
  {"line":5423,"text":"\t\t\twriteDocumentSymbolDetails(*symbol.Children, indent+1, builder)"},
  {"line":5424,"text":"\t\t}"},
  {"line":5425,"text":"\t}"},
  {"line":5426,"text":"}"},
  {"line":5428,"text":"func collectDocumentSymbolSpans("},
  {"line":5429,"text":"\turi lsproto.DocumentUri,"},
  {"line":5430,"text":"\tsymbol *lsproto.DocumentSymbol,"},
  {"line":5431,"text":"\tspansToSymbol map[documentSpan]*lsproto.DocumentSymbol,"},
  {"line":5432,"text":") {"},
  {"line":5433,"text":"\tspan := documentSpan{"},
  {"line":5434,"text":"\t\turi:         uri,"},
  {"line":5435,"text":"\t\ttextSpan:    symbol.SelectionRange,"},
  {"line":5436,"text":"\t\tcontextSpan: &symbol.Range,"},
  {"line":5437,"text":"\t}"},
  {"line":5438,"text":"\tspansToSymbol[span] = symbol"},
  {"line":5439,"text":"\tif symbol.Children != nil {"},
  {"line":5440,"text":"\t\tfor _, child := range *symbol.Children {"},
  {"line":5441,"text":"\t\t\tcollectDocumentSymbolSpans(uri, child, spansToSymbol)"},
  {"line":5442,"text":"\t\t}"},
  {"line":5443,"text":"\t}"},
  {"line":5444,"text":"}"},
  {"line":5447,"text":"func (f *FourslashTest) VerifyNumberOfErrorsInCurrentFile(t *testing.T, expectedCount int) {"},
  {"line":5448,"text":"\tdiagnostics := f.getDiagnostics(t, f.activeFilename)"},
  {"line":5450,"text":"\terrors := core.Filter(diagnostics, func(d *lsproto.Diagnostic) bool {"},
  {"line":5451,"text":"\t\treturn !isSuggestionDiagnostic(d)"},
  {"line":5452,"text":"\t})"},
  {"line":5453,"text":"\tif len(errors) != expectedCount {"},
  {"line":5454,"text":"\t\tt.Fatalf(\"Expected %d errors in current file, but got %d\", expectedCount, len(errors))"},
  {"line":5455,"text":"\t}"},
  {"line":5456,"text":"}"},
  {"line":5459,"text":"func (f *FourslashTest) VerifyNoErrors(t *testing.T) {"},
  {"line":5460,"text":"\tfor fileName := range f.openFiles {"},
  {"line":5461,"text":"\t\tdiagnostics := f.getDiagnostics(t, fileName)"},
  {"line":5463,"text":"\t\terrors := core.Filter(diagnostics, func(d *lsproto.Diagnostic) bool {"},
  {"line":5464,"text":"\t\t\treturn !isSuggestionDiagnostic(d)"},
  {"line":5465,"text":"\t\t})"},
  {"line":5466,"text":"\t\tif len(errors) > 0 {"},
  {"line":5467,"text":"\t\t\tvar messages []string"},
  {"line":5468,"text":"\t\t\tfor _, err := range errors {"},
  {"line":5469,"text":"\t\t\t\tmessages = append(messages, err.Message)"},
  {"line":5470,"text":"\t\t\t}"},
  {"line":5471,"text":"\t\t\tt.Fatalf(\"Expected no errors but found %d in %s: %v\", len(errors), fileName, messages)"},
  {"line":5472,"text":"\t\t}"},
  {"line":5473,"text":"\t}"},
  {"line":5474,"text":"}"},
  {"line":5477,"text":"func (f *FourslashTest) VerifyErrorExistsAtRange(t *testing.T, rangeMarker *RangeMarker, code int, message string) {"},
  {"line":5478,"text":"\tdiagnostics := f.getDiagnostics(t, rangeMarker.FileName())"},
  {"line":5479,"text":"\tfor _, diag := range diagnostics {"},
  {"line":5480,"text":"\t\tif diag.Code != nil && diag.Code.Integer != nil && int(*diag.Code.Integer) == code {"},
  {"line":5482,"text":"\t\t\tif diag.Range.Start.Line == rangeMarker.LSRange.Start.Line &&"},
  {"line":5483,"text":"\t\t\t\tdiag.Range.Start.Character == rangeMarker.LSRange.Start.Character &&"},
  {"line":5484,"text":"\t\t\t\tdiag.Range.End.Line == rangeMarker.LSRange.End.Line &&"},
  {"line":5485,"text":"\t\t\t\tdiag.Range.End.Character == rangeMarker.LSRange.End.Character {"},
  {"line":5487,"text":"\t\t\t\tif message != \"\" && diag.Message != message {"},
  {"line":5488,"text":"\t\t\t\t\tt.Fatalf(\"Error at range has code %d but message mismatch. Expected: %q, Got: %q\", code, message, diag.Message)"},
  {"line":5489,"text":"\t\t\t\t}"},
  {"line":5490,"text":"\t\t\t\treturn"},
  {"line":5491,"text":"\t\t\t}"},
  {"line":5492,"text":"\t\t}"},
  {"line":5493,"text":"\t}"},
  {"line":5494,"text":"\tt.Fatalf(\"Expected error with code %d at range %v but it was not found\", code, rangeMarker.LSRange)"},
  {"line":5495,"text":"}"},
  {"line":5498,"text":"func (f *FourslashTest) VerifyErrorExistsBetweenMarkers(t *testing.T, startMarkerName string, endMarkerName string) {"},
  {"line":5499,"text":"\tstartMarker, ok := f.testData.MarkerPositions[startMarkerName]"},
  {"line":5500,"text":"\tif !ok {"},
  {"line":5501,"text":"\t\tt.Fatalf(\"Start marker '%s' not found\", startMarkerName)"},
  {"line":5502,"text":"\t}"},
  {"line":5503,"text":"\tendMarker, ok := f.testData.MarkerPositions[endMarkerName]"},
  {"line":5504,"text":"\tif !ok {"},
  {"line":5505,"text":"\t\tt.Fatalf(\"End marker '%s' not found\", endMarkerName)"},
  {"line":5506,"text":"\t}"},
  {"line":5507,"text":"\tif startMarker.FileName() != endMarker.FileName() {"},
  {"line":5508,"text":"\t\tt.Fatalf(\"Markers '%s' and '%s' are in different files\", startMarkerName, endMarkerName)"},
  {"line":5509,"text":"\t}"},
  {"line":5511,"text":"\tdiagnostics := f.getDiagnostics(t, startMarker.FileName())"},
  {"line":5512,"text":"\tstartPos := startMarker.Position"},
  {"line":5513,"text":"\tendPos := endMarker.Position"},
  {"line":5515,"text":"\tfor _, diag := range diagnostics {"},
  {"line":5516,"text":"\t\tif !isSuggestionDiagnostic(diag) {"},
  {"line":5517,"text":"\t\t\tdiagStart := int(f.converters.LineAndCharacterToPosition(f.getScriptInfo(startMarker.FileName()), diag.Range.Start))"},
  {"line":5518,"text":"\t\t\tdiagEnd := int(f.converters.LineAndCharacterToPosition(f.getScriptInfo(startMarker.FileName()), diag.Range.End))"},
  {"line":5519,"text":"\t\t\tif diagStart >= startPos && diagEnd <= endPos {"},
  {"line":5520,"text":"\t\t\t\treturn // Found an error in the range"},
  {"line":5521,"text":"\t\t\t}"},
  {"line":5522,"text":"\t\t}"},
  {"line":5523,"text":"\t}"},
  {"line":5524,"text":"\tt.Fatalf(\"Expected error between markers '%s' and '%s' but none was found\", startMarkerName, endMarkerName)"},
  {"line":5525,"text":"}"},
  {"line":5528,"text":"func (f *FourslashTest) VerifyErrorExistsAfterMarker(t *testing.T, markerName string) {"},
  {"line":5529,"text":"\tvar fileName string"},
  {"line":5530,"text":"\tvar markerPos int"},
  {"line":5532,"text":"\tif markerName == \"\" {"},
  {"line":5534,"text":"\t\tfileName = f.activeFilename"},
  {"line":5535,"text":"\t\tmarkerPos = int(f.converters.LineAndCharacterToPosition(f.getScriptInfo(f.activeFilename), f.currentCaretPosition))"},
  {"line":5536,"text":"\t} else {"},
  {"line":5537,"text":"\t\tmarker, ok := f.testData.MarkerPositions[markerName]"},
  {"line":5538,"text":"\t\tif !ok {"},
  {"line":5539,"text":"\t\t\tt.Fatalf(\"Marker '%s' not found\", markerName)"},
  {"line":5540,"text":"\t\t}"},
  {"line":5541,"text":"\t\tfileName = marker.FileName()"},
  {"line":5542,"text":"\t\tmarkerPos = marker.Position"},
  {"line":5543,"text":"\t}"},
  {"line":5545,"text":"\tdiagnostics := f.getDiagnostics(t, fileName)"},
  {"line":5547,"text":"\tfor _, diag := range diagnostics {"},
  {"line":5548,"text":"\t\tif !isSuggestionDiagnostic(diag) {"},
  {"line":5549,"text":"\t\t\tdiagStart := int(f.converters.LineAndCharacterToPosition(f.getScriptInfo(fileName), diag.Range.Start))"},
  {"line":5550,"text":"\t\t\tif diagStart >= markerPos {"},
  {"line":5551,"text":"\t\t\t\treturn // Found an error after the marker"},
  {"line":5552,"text":"\t\t\t}"},
  {"line":5553,"text":"\t\t}"},
  {"line":5554,"text":"\t}"},
  {"line":5555,"text":"\tt.Fatalf(\"Expected error after marker '%s' but none was found\", markerName)"},
  {"line":5556,"text":"}"},
  {"line":5559,"text":"func (f *FourslashTest) VerifyErrorExistsBeforeMarker(t *testing.T, markerName string) {"},
  {"line":5560,"text":"\tvar fileName string"},
  {"line":5561,"text":"\tvar markerPos int"},
  {"line":5563,"text":"\tif markerName == \"\" {"},
  {"line":5565,"text":"\t\tfileName = f.activeFilename"},
  {"line":5566,"text":"\t\tmarkerPos = int(f.converters.LineAndCharacterToPosition(f.getScriptInfo(f.activeFilename), f.currentCaretPosition))"},
  {"line":5567,"text":"\t} else {"},
  {"line":5568,"text":"\t\tmarker, ok := f.testData.MarkerPositions[markerName]"},
  {"line":5569,"text":"\t\tif !ok {"},
  {"line":5570,"text":"\t\t\tt.Fatalf(\"Marker '%s' not found\", markerName)"},
  {"line":5571,"text":"\t\t}"},
  {"line":5572,"text":"\t\tfileName = marker.FileName()"},
  {"line":5573,"text":"\t\tmarkerPos = marker.Position"},
  {"line":5574,"text":"\t}"},
  {"line":5576,"text":"\tdiagnostics := f.getDiagnostics(t, fileName)"},
  {"line":5578,"text":"\tfor _, diag := range diagnostics {"},
  {"line":5579,"text":"\t\tif !isSuggestionDiagnostic(diag) {"},
  {"line":5580,"text":"\t\t\tdiagEnd := int(f.converters.LineAndCharacterToPosition(f.getScriptInfo(fileName), diag.Range.End))"},
  {"line":5581,"text":"\t\t\tif diagEnd <= markerPos {"},
  {"line":5582,"text":"\t\t\t\treturn // Found an error before the marker"},
  {"line":5583,"text":"\t\t\t}"},
  {"line":5584,"text":"\t\t}"},
  {"line":5585,"text":"\t}"},
  {"line":5586,"text":"\tt.Fatalf(\"Expected error before marker '%s' but none was found\", markerName)"},
  {"line":5587,"text":"}"},
  {"line":5589,"text":"func updatePositionForTextEdit(position int, editStart int, editEnd int, newTextLength int) int {"},
  {"line":5590,"text":"\tif position <= editStart {"},
  {"line":5591,"text":"\t\treturn position"},
  {"line":5592,"text":"\t}"},
  {"line":5593,"text":"\tif position < editEnd {"},
  {"line":5594,"text":"\t\treturn -1"},
  {"line":5595,"text":"\t}"},
  {"line":5596,"text":"\treturn position + newTextLength - (editEnd - editStart)"},
  {"line":5597,"text":"}"},
  {"line":5599,"text":"func removeWhitespace(text string) string {"},
  {"line":5600,"text":"\tvar builder strings.Builder"},
  {"line":5601,"text":"\tfor _, ch := range text {"},
  {"line":5602,"text":"\t\tif stringutil.IsWhiteSpaceLike(ch) {"},
  {"line":5603,"text":"\t\t\tcontinue"},
  {"line":5604,"text":"\t\t}"},
  {"line":5605,"text":"\t\tbuilder.WriteRune(ch)"},
  {"line":5606,"text":"\t}"},
  {"line":5607,"text":"\treturn builder.String()"},
  {"line":5608,"text":"}"},
  {"line":5610,"text":"func assertValidTextRange(t *testing.T, textRange core.TextRange, message string) {"},
  {"line":5611,"text":"\tt.Helper()"},
  {"line":5612,"text":"\tif textRange.Pos() >= 0 && textRange.End() >= 0 {"},
  {"line":5613,"text":"\t\treturn"},
  {"line":5614,"text":"\t}"},
  {"line":5615,"text":"\tt.Fatal(message)"},
  {"line":5616,"text":"}"},
  {"line":5618,"text":"func selectCodeFixDiagnostic(diagnostics []*lsproto.Diagnostic, errorCode int) *lsproto.Diagnostic {"},
  {"line":5619,"text":"\tif errorCode == 0 {"},
  {"line":5620,"text":"\t\treturn diagnostics[0]"},
  {"line":5621,"text":"\t}"},
  {"line":5622,"text":"\treturn core.Find(diagnostics, func(diagnostic *lsproto.Diagnostic) bool {"},
  {"line":5623,"text":"\t\treturn diagnostic.Code != nil && diagnostic.Code.Integer != nil && *diagnostic.Code.Integer == int32(errorCode)"},
  {"line":5624,"text":"\t})"},
  {"line":5625,"text":"}"},
];

function findFourslashFourslashDeclaration(name: string): UpstreamDeclaration | undefined {
  return fourslashFourslashDeclarations.find((declaration) => declaration.name === name);
}

function requireFourslashFourslashDeclaration(name: string): UpstreamDeclaration {
  const declaration = findFourslashFourslashDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

function fourslashFourslashLineText(line: number): string | undefined {
  return fourslashFourslashSourceLines.find((entry) => entry.line === line)?.text;
}
