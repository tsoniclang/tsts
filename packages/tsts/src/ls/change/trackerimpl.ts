/**
 * Change-tracker implementation helpers.
 *
 * Porting anchor for TS-Go `internal/ls/change/trackerimpl.go`.
 */

import type { Range, TextEdit } from "../../lsp/lsproto/index.js";
import { comparePositions } from "../../lsp/lsproto/index.js";
import { Kind, type Node, type SourceFile } from "../../ast/index.js";
import {
  SemicolonPreferenceIgnore,
  SemicolonPreferenceRemove,
  type FormatCodeSettings,
} from "../lsutil/index.js";
import type { TrackerEdit } from "./tracker.js";
import { TrackerEditKind, computeNewText, sortTrackerEdits } from "./tracker.js";

export function getTextChangesFromChanges(changes: ReadonlyMap<string, readonly TrackerEdit[]>): ReadonlyMap<string, readonly TextEdit[]> {
  const result = new Map<string, readonly TextEdit[]>();
  for (const [fileName, edits] of changes) {
    const textEdits = sortTrackerEdits(edits).map(edit => ({
      range: edit.range,
      newText: computeNewText(edit),
    }));
    if (textEdits.length > 0) result.set(fileName, textEdits);
  }
  return result;
}

export function filterRedundantChanges(sourceText: string, edits: readonly TextEdit[], offsetOfPosition: (position: TextEdit["range"]["start"]) => number): readonly TextEdit[] {
  return edits.filter(edit => {
    const start = offsetOfPosition(edit.range.start);
    const end = offsetOfPosition(edit.range.end);
    return sourceText.slice(start, end) !== edit.newText;
  });
}

export function applyTextEdits(sourceText: string, edits: readonly TextEdit[], offsetOfPosition: (position: TextEdit["range"]["start"]) => number): string {
  let result = sourceText;
  const sorted = [...edits].sort((left, right) => comparePositions(right.range.start, left.range.start));
  for (const edit of sorted) {
    const start = offsetOfPosition(edit.range.start);
    const end = offsetOfPosition(edit.range.end);
    result = `${result.slice(0, start)}${edit.newText}${result.slice(end)}`;
  }
  return result;
}

export function rangeIsEmpty(range: Range): boolean {
  return comparePositions(range.start, range.end) === 0;
}

export function editKindFromText(text: string): TrackerEditKind {
  return text === "" ? TrackerEditKind.Remove : TrackerEditKind.Text;
}

export function getFormatCodeSettingsForWriting(options: FormatCodeSettings, sourceFile: SourceFile): FormatCodeSettings {
  const shouldAutoDetectSemicolonPreference = options.semicolons === SemicolonPreferenceIgnore;
  const shouldRemoveSemicolons = options.semicolons === SemicolonPreferenceRemove
    || shouldAutoDetectSemicolonPreference && !probablyUsesSemicolons(sourceFile);
  if (!shouldRemoveSemicolons) return options;
  return { ...options, semicolons: SemicolonPreferenceRemove };
}

export function hasCommentsBeforeLineBreak(text: string, start: number): boolean {
  for (let index = start; index < text.length; index += 1) {
    const ch = text.charCodeAt(index);
    if (isLineBreak(ch)) return false;
    if (!isWhiteSpaceSingleLine(ch)) return text[index] === "/";
  }
  return false;
}

export function needSemicolonBetween(left: Node, right: Node): boolean {
  return (isPropertySignatureDeclaration(left) || isPropertyDeclaration(left))
    && isClassOrTypeElement(right)
    && nodeNameKind(right) === Kind.ComputedPropertyName
    || isStatementButNotDeclaration(left) && isStatementButNotDeclaration(right);
}

export function getInsertionPositionAtSourceFileTop(sourceFile: SourceFile): number {
  let lastPrologue: Node | undefined;
  for (const statement of sourceFile.statements) {
    if (isPrologueDirective(statement)) lastPrologue = statement;
    else break;
  }

  let position = 0;
  const text = sourceFile.text;
  const advancePastLineBreak = (): void => {
    if (position >= text.length) return;
    const ch = text.charCodeAt(position);
    if (!isLineBreak(ch)) return;
    position += 1;
    if (position < text.length && ch === 13 && text.charCodeAt(position) === 10) position += 1;
  };

  if (lastPrologue !== undefined) {
    position = lastPrologue.end;
    advancePastLineBreak();
    return position;
  }

  const shebang = getShebang(text);
  if (shebang !== "") {
    position = shebang.length;
    advancePastLineBreak();
  }

  const ranges = getLeadingCommentRanges(text, position);
  if (ranges.length === 0) return position;

  let lastComment: CommentRange | undefined;
  let pinnedOrTripleSlash = false;
  let firstNodeLine = -1;
  const lineMap = computeLineStarts(text);

  for (const range of ranges) {
    if (range.kind === Kind.MultiLineCommentTrivia && isPinnedComment(text, range)) {
      lastComment = range;
      pinnedOrTripleSlash = true;
      continue;
    }
    if (range.kind === Kind.SingleLineCommentTrivia && isRecognizedTripleSlashComment(text, range)) {
      lastComment = range;
      pinnedOrTripleSlash = true;
      continue;
    }

    if (lastComment !== undefined) {
      if (pinnedOrTripleSlash) break;
      const commentLine = computeLineOfPosition(lineMap, range.pos);
      const lastCommentEndLine = computeLineOfPosition(lineMap, lastComment.end);
      if (commentLine >= lastCommentEndLine + 2) break;
    }

    const firstStatement = sourceFile.statements[0];
    if (firstStatement !== undefined) {
      if (firstNodeLine === -1) firstNodeLine = computeLineOfPosition(lineMap, firstStatement.pos);
      const commentEndLine = computeLineOfPosition(lineMap, range.end);
      if (firstNodeLine < commentEndLine + 2) break;
    }
    lastComment = range;
    pinnedOrTripleSlash = false;
  }

  if (lastComment !== undefined) {
    position = lastComment.end;
    advancePastLineBreak();
  }
  return position;
}

function probablyUsesSemicolons(sourceFile: SourceFile): boolean {
  const text = sourceFile.text;
  let semicolons = 0;
  let statementEnds = 0;
  for (const statement of sourceFile.statements) {
    statementEnds += 1;
    if (text.charCodeAt(Math.max(0, statement.end - 1)) === 59) semicolons += 1;
  }
  return statementEnds === 0 || semicolons * 2 >= statementEnds;
}

function isPropertySignatureDeclaration(node: Node): boolean {
  return node.kind === Kind.PropertySignature;
}

function isPropertyDeclaration(node: Node): boolean {
  return node.kind === Kind.PropertyDeclaration;
}

function isClassOrTypeElement(node: Node): boolean {
  return node.kind >= Kind.Constructor && node.kind <= Kind.IndexSignature
    || node.kind >= Kind.PropertySignature && node.kind <= Kind.MethodDeclaration;
}

function isStatementButNotDeclaration(node: Node): boolean {
  return node.kind >= Kind.EmptyStatement && node.kind <= Kind.DebuggerStatement;
}

function nodeNameKind(node: Node): Kind | undefined {
  return (node as unknown as { readonly name?: Node }).name?.kind;
}

function isPrologueDirective(node: Node): boolean {
  if (node.kind !== Kind.ExpressionStatement) return false;
  const expression = (node as unknown as { readonly expression?: Node }).expression;
  return expression?.kind === Kind.StringLiteral;
}

function getShebang(text: string): string {
  return text.startsWith("#!") ? text.slice(0, firstLineEnd(text)) : "";
}

function firstLineEnd(text: string): number {
  for (let index = 0; index < text.length; index += 1) {
    if (isLineBreak(text.charCodeAt(index))) return index;
  }
  return text.length;
}

interface CommentRange {
  readonly pos: number;
  readonly end: number;
  readonly kind: Kind.SingleLineCommentTrivia | Kind.MultiLineCommentTrivia;
}

function getLeadingCommentRanges(text: string, start: number): readonly CommentRange[] {
  const ranges: CommentRange[] = [];
  let position = skipTrivia(text, start);
  while (position < text.length) {
    if (text.startsWith("//", position)) {
      const end = firstLineEndFrom(text, position + 2);
      ranges.push({ pos: position, end, kind: Kind.SingleLineCommentTrivia });
      position = skipTrivia(text, end);
      continue;
    }
    if (text.startsWith("/*", position)) {
      const close = text.indexOf("*/", position + 2);
      const end = close < 0 ? text.length : close + 2;
      ranges.push({ pos: position, end, kind: Kind.MultiLineCommentTrivia });
      position = skipTrivia(text, end);
      continue;
    }
    break;
  }
  return ranges;
}

function firstLineEndFrom(text: string, start: number): number {
  for (let index = start; index < text.length; index += 1) {
    if (isLineBreak(text.charCodeAt(index))) return index;
  }
  return text.length;
}

function skipTrivia(text: string, start: number): number {
  let position = start;
  while (position < text.length) {
    const ch = text.charCodeAt(position);
    if (!isWhiteSpaceSingleLine(ch) && !isLineBreak(ch)) break;
    position += 1;
  }
  return position;
}

function isPinnedComment(text: string, range: CommentRange): boolean {
  return text.charCodeAt(range.pos + 2) === 33;
}

function isRecognizedTripleSlashComment(text: string, range: CommentRange): boolean {
  return text.slice(range.pos, range.end).startsWith("///");
}

function computeLineStarts(text: string): readonly number[] {
  const lineStarts = [0];
  for (let index = 0; index < text.length; index += 1) {
    const ch = text.charCodeAt(index);
    if (ch === 13 || ch === 10) {
      if (ch === 13 && text.charCodeAt(index + 1) === 10) index += 1;
      lineStarts.push(index + 1);
    }
  }
  return lineStarts;
}

function computeLineOfPosition(lineStarts: readonly number[], position: number): number {
  let line = 0;
  for (let index = 0; index < lineStarts.length; index += 1) {
    if (lineStarts[index]! > position) break;
    line = index;
  }
  return line;
}

function isWhiteSpaceSingleLine(code: number): boolean {
  return code === 32 || code === 9 || code === 11 || code === 12 || code === 160;
}

function isLineBreak(code: number): boolean {
  return code === 10 || code === 13 || code === 0x2028 || code === 0x2029;
}
