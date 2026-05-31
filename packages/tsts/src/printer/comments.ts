import { Kind, type CommentRange, type Node as AstNode, type SourceFile, type TextRange } from "../ast/index.js";
import { EmitFlags } from "./emitFlags.js";

export interface CommentWriter {
  write(text: string): void;
  writeLine(): void;
  increaseIndent(): void;
  decreaseIndent(): void;
}

export interface CommentEmitOptions {
  readonly removeComments?: boolean;
  readonly preserveSourceNewlines?: boolean;
}

export interface CommentEmitContext {
  readonly sourceFile: SourceFile | undefined;
  readonly options: CommentEmitOptions;
  readonly emitFlags: (node: AstNode) => EmitFlags;
  readonly hasCommentsAtPosition?: (pos: number) => boolean;
}

export interface DetachedCommentsInfo {
  readonly nodePos: number;
  readonly detachedCommentEndPos: number;
}

export interface CommentState {
  containerPos: number;
  containerEnd: number;
  declarationListContainerEnd: number;
  hasWrittenComment: boolean;
  readonly detachedComments: DetachedCommentsInfo[];
}

export function shouldEmitComments(context: CommentEmitContext, node: AstNode): boolean {
  if (context.options.removeComments === true) return false;
  return (context.emitFlags(node) & EmitFlags.NoComments) === 0;
}

export function shouldEmitLeadingComments(context: CommentEmitContext, node: AstNode): boolean {
  return shouldEmitComments(context, node) && (context.emitFlags(node) & EmitFlags.NoLeadingComments) === 0;
}

export function shouldEmitTrailingComments(context: CommentEmitContext, node: AstNode): boolean {
  return shouldEmitComments(context, node) && (context.emitFlags(node) & EmitFlags.NoTrailingComments) === 0;
}

export function shouldEmitNestedComments(context: CommentEmitContext, node: AstNode): boolean {
  return shouldEmitComments(context, node) && (context.emitFlags(node) & EmitFlags.NoNestedComments) === 0;
}

export function shouldWriteComment(comment: CommentRange): boolean {
  const text = commentText(comment);
  return text.length > 0 && !isTripleSlashReferenceComment(text);
}

export function emitLeadingComments(
  context: CommentEmitContext,
  writer: CommentWriter,
  node: AstNode,
  state: CommentState,
): void {
  if (!shouldEmitLeadingComments(context, node)) return;
  const comments = getLeadingCommentRanges(context.sourceFile, node);
  emitCommentRanges(context, writer, comments, state);
}

export function emitTrailingComments(
  context: CommentEmitContext,
  writer: CommentWriter,
  node: AstNode,
  state: CommentState,
): void {
  if (!shouldEmitTrailingComments(context, node)) return;
  const comments = getTrailingCommentRanges(context.sourceFile, node);
  emitCommentRanges(context, writer, comments, state);
}

export function emitDetachedComments(
  context: CommentEmitContext,
  writer: CommentWriter,
  node: AstNode,
  state: CommentState,
): DetachedCommentsInfo | undefined {
  if (!shouldEmitLeadingComments(context, node)) return undefined;
  const comments = getLeadingCommentRanges(context.sourceFile, node);
  if (comments.length === 0) return undefined;
  const detached = comments.filter(comment => commentHasBlankLineBefore(context.sourceFile, comment, nodeStart(node)));
  if (detached.length === 0) return undefined;
  emitCommentRanges(context, writer, detached, state);
  const end = Math.max(...detached.map(comment => rangeEnd(comment)));
  const info = { nodePos: nodeStart(node), detachedCommentEndPos: end };
  state.detachedComments.push(info);
  return info;
}

export function emitCommentRanges(
  context: CommentEmitContext,
  writer: CommentWriter,
  comments: readonly CommentRange[],
  state: CommentState,
): void {
  for (const comment of comments) {
    if (!shouldWriteComment(comment)) continue;
    writeCommentRange(context, writer, comment);
    state.hasWrittenComment = true;
  }
}

export function writeCommentRange(context: CommentEmitContext, writer: CommentWriter, comment: CommentRange): void {
  const text = commentText(comment);
  if (commentKind(comment) === Kind.SingleLineCommentTrivia) {
    writer.write("//");
    writer.write(trimSingleLineCommentText(text));
    writer.writeLine();
    return;
  }
  writer.write("/*");
  writeBlockCommentText(context, writer, trimBlockCommentText(text));
  writer.write("*/");
  if (hasTrailingNewLine(comment)) writer.writeLine();
}

export function writeBlockCommentText(context: CommentEmitContext, writer: CommentWriter, text: string): void {
  const lines = text.split(/\r\n?|\n/g);
  for (let index = 0; index < lines.length; index++) {
    if (index > 0) writer.writeLine();
    writer.write(context.options.preserveSourceNewlines === true ? lines[index]! : lines[index]!.trimEnd());
  }
}

export function getLeadingCommentRanges(sourceFile: SourceFile | undefined, node: AstNode): readonly CommentRange[] {
  const comments = explicitLeadingComments(node);
  if (comments.length > 0) return comments;
  const text = sourceText(sourceFile);
  if (text.length === 0) return [];
  return scanLeadingCommentRanges(text, nodeFullStart(node), nodeStart(node));
}

export function getTrailingCommentRanges(sourceFile: SourceFile | undefined, node: AstNode): readonly CommentRange[] {
  const comments = explicitTrailingComments(node);
  if (comments.length > 0) return comments;
  const text = sourceText(sourceFile);
  if (text.length === 0) return [];
  return scanTrailingCommentRanges(text, nodeEnd(node));
}

export function scanLeadingCommentRanges(text: string, start: number, end: number): readonly CommentRange[] {
  const ranges: CommentRange[] = [];
  let pos = Math.max(0, start);
  while (pos < end) {
    const ch = text.charCodeAt(pos);
    if (isWhitespace(ch) || isLineBreak(ch)) {
      pos++;
      continue;
    }
    const comment = scanCommentAt(text, pos);
    if (comment === undefined || rangeEnd(comment) > end) break;
    ranges.push(comment);
    pos = rangeEnd(comment);
  }
  return ranges;
}

export function scanTrailingCommentRanges(text: string, start: number): readonly CommentRange[] {
  const ranges: CommentRange[] = [];
  let pos = start;
  while (pos < text.length) {
    const ch = text.charCodeAt(pos);
    if (ch === 0x20 || ch === 0x09) {
      pos++;
      continue;
    }
    const comment = scanCommentAt(text, pos);
    if (comment === undefined) break;
    ranges.push(comment);
    pos = rangeEnd(comment);
    if (hasTrailingNewLine(comment)) break;
  }
  return ranges;
}

export function scanCommentAt(text: string, pos: number): CommentRange | undefined {
  if (text.charCodeAt(pos) !== 0x2f) return undefined;
  const next = text.charCodeAt(pos + 1);
  if (next === 0x2f) {
    let end = pos + 2;
    while (end < text.length && !isLineBreak(text.charCodeAt(end))) end++;
    return { pos, end, kind: Kind.SingleLineCommentTrivia, hasTrailingNewLine: end < text.length } as CommentRange;
  }
  if (next === 0x2a) {
    const close = text.indexOf("*/", pos + 2);
    const end = close < 0 ? text.length : close + 2;
    return { pos, end, kind: Kind.MultiLineCommentTrivia, hasTrailingNewLine: end < text.length && isLineBreak(text.charCodeAt(end)) } as CommentRange;
  }
  return undefined;
}

export function hasCommentsAtPosition(sourceFile: SourceFile | undefined, pos: number): boolean {
  const text = sourceText(sourceFile);
  return scanCommentAt(text, pos) !== undefined;
}

export function commentHasBlankLineBefore(sourceFile: SourceFile | undefined, comment: CommentRange, nodePos: number): boolean {
  const text = sourceText(sourceFile);
  if (text.length === 0) return false;
  let lineBreaks = 0;
  for (let index = rangeEnd(comment); index < nodePos && index < text.length; index++) {
    if (isLineBreak(text.charCodeAt(index))) lineBreaks++;
    if (lineBreaks >= 2) return true;
  }
  return false;
}

export function isPinnedOrTripleSlashComment(comment: CommentRange): boolean {
  const text = commentText(comment).trim();
  return text.startsWith("/*!") || text.startsWith("///");
}

export function isTripleSlashReferenceComment(text: string): boolean {
  return /^\/\/\/\s*<reference\b/.test(text.trim());
}

export function preserveTripleSlashReferenceComment(comment: CommentRange): boolean {
  return isTripleSlashReferenceComment(commentText(comment));
}

function explicitLeadingComments(node: AstNode): readonly CommentRange[] {
  return (node as { readonly leadingComments?: readonly CommentRange[] }).leadingComments ?? [];
}

function explicitTrailingComments(node: AstNode): readonly CommentRange[] {
  return (node as { readonly trailingComments?: readonly CommentRange[] }).trailingComments ?? [];
}

function commentText(comment: CommentRange): string {
  return (comment as { readonly text?: string }).text ?? "";
}

function commentKind(comment: CommentRange): Kind {
  return (comment as { readonly kind?: Kind }).kind ?? Kind.MultiLineCommentTrivia;
}

function trimSingleLineCommentText(text: string): string {
  return text.startsWith("//") ? text.slice(2) : text;
}

function trimBlockCommentText(text: string): string {
  return text.startsWith("/*") && text.endsWith("*/") ? text.slice(2, -2) : text;
}

function hasTrailingNewLine(comment: CommentRange): boolean {
  return (comment as { readonly hasTrailingNewLine?: boolean }).hasTrailingNewLine === true;
}

function sourceText(sourceFile: SourceFile | undefined): string {
  return (sourceFile as { readonly text?: string } | undefined)?.text ?? "";
}

function nodeFullStart(node: AstNode): number {
  return (node as { readonly fullStart?: number; readonly pos?: number }).fullStart ?? (node as { readonly pos?: number }).pos ?? 0;
}

function nodeStart(node: AstNode): number {
  return (node as { readonly pos?: number }).pos ?? 0;
}

function nodeEnd(node: AstNode): number {
  return (node as { readonly end?: number }).end ?? nodeStart(node);
}

function rangeEnd(range: TextRange): number {
  return (range as { readonly end?: number }).end ?? 0;
}

function isWhitespace(ch: number): boolean {
  return ch === 0x20 || ch === 0x09 || ch === 0x0b || ch === 0x0c;
}

function isLineBreak(ch: number): boolean {
  return ch === 0x0a || ch === 0x0d;
}
