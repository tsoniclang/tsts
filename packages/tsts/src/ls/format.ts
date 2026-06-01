import {
  Kind,
  findAncestor,
  isJSDoc,
  type CommentRange,
  type Node,
  type SourceFile,
} from "../ast/index.js";
import {
  findPrecedingToken,
  getStartOfNode,
  getTokenAtPositionPublic,
} from "../astnav/index.js";
import {
  TextRange,
  Tristate,
  tristateIsTrue,
  type Tristate as TristateValue,
} from "../core/index.js";
import {
  formatDocument,
  formatOnClosingCurly,
  formatOnEnter,
  formatOnOpeningCurly,
  formatOnSemicolon,
  formatSelection,
  type FormatContext,
  type FormatCodeSettings as FormatterCodeSettings,
  type TextChange as FormatTextChange,
} from "../format/index.js";
import type {
  DocumentFormattingResponse,
  DocumentOnTypeFormattingResponse,
  DocumentRangeFormattingResponse,
  DocumentUri,
  FormattingOptions,
  Position,
  Range,
  TextEdit,
} from "../lsp/lsproto/index.js";
import { scanLeadingCommentRanges, scanTrailingCommentRanges } from "../printer/comments.js";
import { fromLSFormatOptions, type FormatCodeSettings } from "./lsutil/index.js";

export interface FormatConverters {
  fromLSPRange(file: SourceFile, range: Range): TextRange;
  lineAndCharacterToPosition(file: SourceFile, position: Position): number;
  toLSPRange(file: SourceFile, range: TextRange): Range;
}

export interface FormatLanguageService {
  readonly converters: FormatConverters;
  formatOptions(): FormatCodeSettings;
  getProgramAndFile(uri: DocumentUri): readonly [unknown, SourceFile];
}

type TextChangeLike = FormatTextChange | {
  readonly pos: number;
  readonly end: number;
  readonly newText: string;
};

export function toLSProtoTextEdits(
  service: Pick<FormatLanguageService, "converters">,
  file: SourceFile,
  changes: readonly TextChangeLike[],
): readonly TextEdit[] {
  return changes.map((change) => ({
    newText: change.newText,
    range: service.converters.toLSPRange(file, textChangeRange(change)),
  }));
}

export function provideFormatDocument(
  service: FormatLanguageService,
  documentURI: DocumentUri,
  options: FormattingOptions,
): DocumentFormattingResponse {
  const [, file] = service.getProgramAndFile(documentURI);
  const formatOptions = fromLSFormatOptions(service.formatOptions(), options);
  return {
    textEdits: toLSProtoTextEdits(
      service,
      file,
      getFormattingEditsForDocument(file, formatOptions),
    ),
  };
}

export function provideFormatDocumentRange(
  service: FormatLanguageService,
  documentURI: DocumentUri,
  options: FormattingOptions,
  range: Range,
): DocumentRangeFormattingResponse {
  const [, file] = service.getProgramAndFile(documentURI);
  const formatOptions = fromLSFormatOptions(service.formatOptions(), options);
  return {
    textEdits: toLSProtoTextEdits(
      service,
      file,
      getFormattingEditsForRange(file, formatOptions, service.converters.fromLSPRange(file, range)),
    ),
  };
}

export function provideFormatDocumentOnType(
  service: FormatLanguageService,
  documentURI: DocumentUri,
  options: FormattingOptions,
  position: Position,
  character: string,
): DocumentOnTypeFormattingResponse {
  const [, file] = service.getProgramAndFile(documentURI);
  const formatOptions = fromLSFormatOptions(service.formatOptions(), options);
  return {
    textEdits: toLSProtoTextEdits(
      service,
      file,
      getFormattingEditsAfterKeystroke(
        file,
        formatOptions,
        service.converters.lineAndCharacterToPosition(file, position),
        character,
      ),
    ),
  };
}

export function getFormattingEditsForRange(
  file: SourceFile,
  options: FormatCodeSettings,
  range: TextRange,
): readonly FormatTextChange[] {
  return formatSelection(formatContext(options), file, range.pos, range.end);
}

export function getFormattingEditsForDocument(
  file: SourceFile,
  options: FormatCodeSettings,
): readonly FormatTextChange[] {
  return formatDocument(formatContext(options), file);
}

export function getFormattingEditsAfterKeystroke(
  file: SourceFile,
  options: FormatCodeSettings,
  position: number,
  key: string,
): readonly FormatTextChange[] {
  const context = formatContext(options);
  const tokenAtPosition = getTokenAtPositionPublic(file, position);
  if (isInComment(file, position, tokenAtPosition) === undefined) {
    if (key === "{") return formatOnOpeningCurly(context, file, position);
    if (key === "}") return formatOnClosingCurly(context, file, position);
    if (key === ";") return formatOnSemicolon(context, file, position);
    if (key === "\n") return formatOnEnter(context, file, position);
  }
  return [];
}

export function isInComment(
  file: SourceFile,
  position: number,
  tokenAtPosition: Node | undefined,
): CommentRange | undefined {
  return getRangeOfEnclosingComment(file, position, findPrecedingToken(file, position), tokenAtPosition);
}

export function getRangeOfEnclosingComment(
  file: SourceFile,
  position: number,
  precedingToken: Node | undefined,
  tokenAtPosition: Node | undefined,
): CommentRange | undefined {
  if (tokenAtPosition === undefined) {
    return undefined;
  }

  const jsdoc = findAncestor(tokenAtPosition, isJSDoc);
  const nextToken = jsdoc?.parent ?? tokenAtPosition;
  const tokenStart = getStartOfNode(nextToken, file, false);
  if (tokenStart <= position && position < nextToken.end) {
    return undefined;
  }

  const comments = [
    ...(precedingToken === undefined ? [] : scanTrailingCommentRanges(file.text, precedingToken.end)),
    ...getLeadingCommentRangesOfNode(nextToken, file),
  ];
  for (const commentRange of comments) {
    if (
      commentRange.pos < position && position < commentRange.end ||
      position === commentRange.end &&
        (commentRange.kind === Kind.SingleLineCommentTrivia || position === file.text.length)
    ) {
      return commentRange;
    }
  }
  return undefined;
}

export function getLeadingCommentRangesOfNode(node: Node, file: SourceFile): readonly CommentRange[] {
  return scanLeadingCommentRanges(file.text, node.pos, getStartOfNode(node, file, false));
}

function formatContext(settings: FormatCodeSettings): FormatContext {
  return {
    settings: toFormatterSettings(settings),
    newLine: settings.newLineCharacter,
  };
}

function textChangeRange(change: TextChangeLike): TextRange {
  if ("span" in change) {
    return new TextRange(change.span.pos, change.span.end);
  }
  return new TextRange(change.pos, change.end);
}

function toFormatterSettings(settings: FormatCodeSettings): FormatterCodeSettings {
  const result: MutableFormatterSettings = {
    newLineCharacter: settings.newLineCharacter,
    indentSize: settings.indentSize,
    tabSize: settings.tabSize,
    baseIndentSize: settings.baseIndentSize,
    semicolons: settings.semicolons,
    indentStyle: settings.indentStyle,
  };
  setTristateBoolean(result, "convertTabsToSpaces", settings.convertTabsToSpaces);
  setTristateBoolean(result, "insertSpaceAfterCommaDelimiter", settings.insertSpaceAfterCommaDelimiter);
  setTristateBoolean(result, "insertSpaceAfterSemicolonInForStatements", settings.insertSpaceAfterSemicolonInForStatements);
  setTristateBoolean(result, "insertSpaceBeforeAndAfterBinaryOperators", settings.insertSpaceBeforeAndAfterBinaryOperators);
  setTristateBoolean(result, "insertSpaceAfterConstructor", settings.insertSpaceAfterConstructor);
  setTristateBoolean(result, "insertSpaceAfterKeywordsInControlFlowStatements", settings.insertSpaceAfterKeywordsInControlFlowStatements);
  setTristateBoolean(result, "insertSpaceAfterFunctionKeywordForAnonymousFunctions", settings.insertSpaceAfterFunctionKeywordForAnonymousFunctions);
  setTristateBoolean(result, "insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis", settings.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis);
  setTristateBoolean(result, "insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets", settings.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets);
  setTristateBoolean(result, "insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces", settings.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces);
  setTristateBoolean(result, "insertSpaceAfterOpeningAndBeforeClosingEmptyBraces", settings.insertSpaceAfterOpeningAndBeforeClosingEmptyBraces);
  setTristateBoolean(result, "insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces", settings.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces);
  setTristateBoolean(result, "insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces", settings.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces);
  setTristateBoolean(result, "insertSpaceAfterTypeAssertion", settings.insertSpaceAfterTypeAssertion);
  setTristateBoolean(result, "insertSpaceBeforeFunctionParenthesis", settings.insertSpaceBeforeFunctionParenthesis);
  setTristateBoolean(result, "placeOpenBraceOnNewLineForFunctions", settings.placeOpenBraceOnNewLineForFunctions);
  setTristateBoolean(result, "placeOpenBraceOnNewLineForControlBlocks", settings.placeOpenBraceOnNewLineForControlBlocks);
  setTristateBoolean(result, "insertSpaceBeforeTypeAnnotation", settings.insertSpaceBeforeTypeAnnotation);
  setTristateBoolean(result, "indentMultiLineObjectLiteralBeginningOnBlankLine", settings.indentMultiLineObjectLiteralBeginningOnBlankLine);
  setTristateBoolean(result, "indentSwitchCase", settings.indentSwitchCase);
  setTristateBoolean(result, "trimTrailingWhitespace", settings.trimTrailingWhitespace);
  return result;
}

function tristateToBoolean(value: TristateValue): boolean | undefined {
  if (value === Tristate.Unknown) {
    return undefined;
  }
  return tristateIsTrue(value);
}

type MutableFormatterSettings = {
  -readonly [P in keyof FormatterCodeSettings]: FormatterCodeSettings[P];
};

function setTristateBoolean(
  target: MutableFormatterSettings,
  key: keyof FormatterCodeSettings,
  value: TristateValue,
): void {
  const converted = tristateToBoolean(value);
  if (converted !== undefined) {
    (target as Record<string, unknown>)[key] = converted;
  }
}
