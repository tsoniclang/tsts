/**
 * TS-Go-shaped Printer.
 *
 * Substantive port of TS-Go `internal/printer/printer.go` (~6242 LoC,
 * 370 Printer methods). The Printer is the main code-emission engine
 * — given an AST and emit-context, it produces the .js/.ts text
 * output, source maps, and comment/JSDoc handling.
 *
 * Port scope: write-* / emit-* / should* / get* families mapped to the
 * upstream surface, with emission handlers filled incrementally from
 * printer and transform baselines.
 *
 * Cross-module deps forward-declared at file end.
 */

import type {
  Node as AstNode,
  SourceFile,
  Block,
  NodeList,
  ModifierList,
  CommentRange,
  TextRange,
  LiteralLikeNode,
  Symbol as AstSymbol,
} from "../ast/index.js";
import { Kind } from "../ast/index.js";
import { EmitFlags } from "./emitFlags.js";
import {
  LFAmpersandDelimited,
  LFAsteriskDelimited,
  LFBarDelimited,
  LFBracketsMask,
  LFCommaDelimited,
  LFDelimitersMask,
  LFIndented,
  LFMultiLine,
  LFNoInterveningComments,
  LFNoSpaceIfEmpty,
  LFOptionalIfEmpty,
  LFOptionalIfNil,
  LFPreferNewLine,
  LFSpaceAfterList,
  LFSpaceBetweenBraces,
  LFSpaceBetweenSiblings,
  LFAllowTrailingComma,
  getClosingBracket as getListClosingBracket,
  getOpeningBracket as getListOpeningBracket,
  type ListFormat,
} from "./listFormat.js";
import { NameGenerator } from "./nameGenerator.js";

// ---------------------------------------------------------------------------
// Public option types
// ---------------------------------------------------------------------------

export interface PrinterOptions {
  removeComments?: boolean;
  newLine?: number;
  emitTrailingNewlines?: boolean;
  sourceMap?: boolean;
  inlineSourceMap?: boolean;
  inlineSources?: boolean;
  noEmitHelpers?: boolean;
  omitTrailingSemicolon?: boolean;
  preserveConstEnums?: boolean;
  preserveSourceNewlines?: boolean;
  neverAsciiEscape?: boolean;
  terminateUnterminatedLiterals?: boolean;
  pretty?: boolean;
  stripInternal?: boolean;
  target?: number;
}

export interface PrintHandlers {
  hasGlobalName?(name: string): boolean;
  onEmitNode?(hint: number, node: AstNode, emit: (hint: number, node: AstNode) => void): void;
  onBeforeEmitNode?(node: AstNode): void;
  onAfterEmitNode?(node: AstNode): void;
  onBeforeEmitNodeArray?(nodes: readonly AstNode[]): void;
  onAfterEmitNodeArray?(nodes: readonly AstNode[]): void;
  onBeforeEmitToken?(node: AstNode): void;
  onAfterEmitToken?(node: AstNode): void;
  substituteNode?(hint: number, node: AstNode): AstNode;
}

// ---------------------------------------------------------------------------
// WriteKind constant-union
// ---------------------------------------------------------------------------

export type WriteKind = number;
export const WriteKind = {
  None: 0 as WriteKind,
  Symbol: 1 as WriteKind,
  Literal: 2 as WriteKind,
  Punctuation: 3 as WriteKind,
  Operator: 4 as WriteKind,
  Keyword: 5 as WriteKind,
  Property: 6 as WriteKind,
  Parameter: 7 as WriteKind,
  Comment: 8 as WriteKind,
  Space: 9 as WriteKind,
  Line: 10 as WriteKind,
} as const;

// ---------------------------------------------------------------------------
// Printer state interfaces
// ---------------------------------------------------------------------------

export interface DetachedCommentsInfo {
  nodePos: number;
  detachedCommentEndPos: number;
}

export interface CommentState {
  containerPos: number;
  containerEnd: number;
  declarationListContainerEnd: number;
  hasWrittenComment: boolean;
}

export interface SourceMapState {
  lastEmittedNodePos: number;
  lastEmittedNodeEnd: number;
}

export interface PrinterState {
  writer: PrinterWriter | undefined;
  ownWriter: PrinterWriter | undefined;
  comments: CommentState;
  sourceMap: SourceMapState;
  detachedComments: DetachedCommentsInfo[];
}

export interface PrinterWriter {
  write(text: string): void;
  writeLine(): void;
  increaseIndent(): void;
  decreaseIndent(): void;
}

export interface StringPrinterWriter extends PrinterWriter {
  getText(): string;
}

export interface PrinterFrameState {
  commentState: CommentState | undefined;
  sourceMapState: SourceMapState | undefined;
}

export type TokenEmitFlags = number;
export const TokenEmitFlags = {
  None: 0 as TokenEmitFlags,
  NoComments: 1 as TokenEmitFlags,
  IndentLeadingComments: 2 as TokenEmitFlags,
  NoSourceMaps: 4 as TokenEmitFlags,
} as const;

// ---------------------------------------------------------------------------
// Printer class
// ---------------------------------------------------------------------------

export class Printer {
  options: PrinterOptions;
  handlers: PrintHandlers;
  emitContext: EmitContext;
  nameGenerator: NameGenerator;
  currentSourceFile: SourceFile | undefined;
  state: PrinterState = {
    writer: undefined, ownWriter: undefined,
    comments: { containerPos: 0, containerEnd: 0, declarationListContainerEnd: 0, hasWrittenComment: false },
    sourceMap: { lastEmittedNodePos: 0, lastEmittedNodeEnd: 0 },
    detachedComments: [],
  };

  constructor(options: PrinterOptions, handlers: PrintHandlers, emitContext: EmitContext) {
    this.options = options;
    this.handlers = handlers;
    this.emitContext = emitContext;
    this.nameGenerator = new NameGenerator();
  }

  // -------------------------------------------------------------------------
  // Text extraction
  // -------------------------------------------------------------------------

  getLiteralTextOfNode(node: LiteralLikeNode, sourceFile: SourceFile | undefined, flags: number): string {
    void flags;
    // Prefer the explicit text payload on the node (the parser stores
    // the raw lexed text); fall back to a slice of the source file.
    const text = (node as unknown as { text?: string }).text;
    if (text !== undefined) return text;
    if (sourceFile !== undefined) {
      const src = (sourceFile as unknown as { text?: string }).text ?? "";
      const pos = (node as unknown as { pos?: number }).pos ?? 0;
      const end = (node as unknown as { end?: number }).end ?? 0;
      return src.slice(pos, end);
    }
    return "";
  }
  getTextOfNode(node: AstNode, includeTrivia: boolean): string {
    const text = (this.currentSourceFile as unknown as { text?: string })?.text;
    if (text === undefined) {
      // No source attached: use the node's own .text if present.
      return (node as unknown as { text?: string }).text ?? "";
    }
    const pos = includeTrivia
      ? (node as unknown as { pos?: number }).pos ?? 0
      : (node as unknown as { fullStart?: number; pos?: number }).fullStart ?? (node as unknown as { pos?: number }).pos ?? 0;
    const end = (node as unknown as { end?: number }).end ?? 0;
    return text.slice(pos, end);
  }

  // -------------------------------------------------------------------------
  // Write primitives
  // -------------------------------------------------------------------------

  /**
   * Routes a single text write through the configured writer, applying
   * the current WriteKind. All higher-level emit helpers reduce to
   * `writeAs`. Mirrors ts-go `(*Printer).writeAs`.
   */
  writeAs(text: string, writeKind: WriteKind): void {
    void writeKind;
    this.state.writer?.write(text);
  }
  write(text: string): void {
    this.state.writer?.write(text);
  }
  setWriteKind(kind: WriteKind): WriteKind {
    const prev = this.currentWriteKind;
    this.currentWriteKind = kind;
    return prev;
  }
  writeSymbol(text: string, optSymbol: AstSymbol | undefined): void {
    void optSymbol;
    this.state.writer?.write(text);
  }
  writeLiteral(text: string): void { this.state.writer?.write(text); }
  writePunctuation(text: string): void { this.state.writer?.write(text); }
  writeOperator(text: string): void { this.state.writer?.write(text); }
  writeKeyword(text: string): void { this.state.writer?.write(text); }
  writeProperty(text: string): void { this.state.writer?.write(text); }
  writeParameter(text: string): void { this.state.writer?.write(text); }
  writeComment(text: string): void { this.state.writer?.write(text); }
  writeSpace(): void { this.state.writer?.write(" "); }
  writeLine(): void { this.state.writer?.writeLine(); }
  writeLineRepeat(count: number): void {
    for (let i = 0; i < count; i++) this.state.writer?.writeLine();
  }
  writeLines(text: string): void {
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (i > 0) this.state.writer?.writeLine();
      this.state.writer?.write(lines[i] ?? "");
    }
  }
  writeTrailingSemicolon(): void {
    if (this.options.omitTrailingSemicolon !== true) {
      this.state.writer?.write(";");
    }
  }
  increaseIndent(): void { this.state.writer?.increaseIndent(); }
  decreaseIndent(): void { this.state.writer?.decreaseIndent(); }
  increaseIndentIf(indentRequested: boolean): void {
    if (indentRequested) this.increaseIndent();
  }
  decreaseIndentIf(indentRequested: boolean): void {
    if (indentRequested) this.decreaseIndent();
  }

  private currentWriteKind: WriteKind = WriteKind.None;

  // -------------------------------------------------------------------------
  // Line/indent helpers
  // -------------------------------------------------------------------------

  writeLineOrSpace(parentNode: AstNode, prevChildNode: AstNode | undefined, nextChildNode: AstNode | undefined): void {
    void parentNode;
    // If the two siblings are on the same source line, emit a single
    // space; otherwise emit a newline.
    if (prevChildNode === undefined || nextChildNode === undefined) {
      this.writeSpace();
      return;
    }
    const prevEnd = (prevChildNode as unknown as { end?: number }).end ?? 0;
    const nextPos = (nextChildNode as unknown as { pos?: number }).pos ?? 0;
    const text = (this.currentSourceFile as unknown as { text?: string })?.text;
    if (text === undefined) {
      this.writeSpace();
      return;
    }
    for (let i = prevEnd; i < nextPos; i++) {
      if (text.charCodeAt(i) === 0x0a) {
        this.writeLine();
        return;
      }
    }
    this.writeSpace();
  }
  writeLinesAndIndent(lineCount: number, writeSpaceIfNotIndenting: boolean): void {
    if (lineCount > 0) {
      for (let i = 0; i < lineCount; i++) this.writeLine();
    } else if (writeSpaceIfNotIndenting) {
      this.writeSpace();
    }
  }
  writeLineSeparatorsAndIndentBefore(node: AstNode, parent: AstNode | undefined): boolean {
    const count = this.getLeadingLineTerminatorCount(parent, node, 0);
    if (count > 0) {
      this.writeLinesAndIndent(count, false);
      return true;
    }
    return false;
  }
  writeLineSeparatorsAfter(node: AstNode, parent: AstNode | undefined): void {
    const count = this.getClosingLineTerminatorCount(parent, node, 0, { pos: 0, end: 0 });
    if (count > 0) this.writeLinesAndIndent(count, false);
  }
  getLinesBetweenNodes(parent: AstNode | undefined, node1: AstNode, node2: AstNode): number {
    void parent;
    const end1 = (node1 as unknown as { end?: number }).end ?? 0;
    const pos2 = (node2 as unknown as { pos?: number }).pos ?? 0;
    const text = (this.currentSourceFile as unknown as { text?: string })?.text;
    if (text === undefined) return 0;
    let lines = 0;
    for (let i = end1; i < pos2; i++) {
      if (text.charCodeAt(i) === 0x0a) lines += 1;
    }
    return lines;
  }
  getEffectiveLines(getLineDifference: (includeComments: boolean) => number): number {
    return getLineDifference(false);
  }
  getLeadingLineTerminatorCount(parentNode: AstNode | undefined, firstChild: AstNode | undefined, format: number): number {
    void format;
    if (parentNode === undefined || firstChild === undefined) return 0;
    return this.getLinesBetweenNodes(undefined, parentNode, firstChild);
  }
  getSeparatingLineTerminatorCount(previousNode: AstNode | undefined, nextNode: AstNode | undefined, format: number): number {
    void format;
    if (previousNode === undefined || nextNode === undefined) return 0;
    return this.getLinesBetweenNodes(undefined, previousNode, nextNode);
  }
  getClosingLineTerminatorCount(parentNode: AstNode | undefined, lastChild: AstNode | undefined, format: number, childrenTextRange: TextRange): number {
    void format; void childrenTextRange;
    if (parentNode === undefined || lastChild === undefined) return 0;
    return this.getLinesBetweenNodes(undefined, lastChild, parentNode);
  }

  // -------------------------------------------------------------------------
  // Comment emission
  // -------------------------------------------------------------------------

  writeCommentRange(comment: CommentRange): void {
    // Render a comment span from the source file's text.
    const sf = this.currentSourceFile as unknown as { text?: string };
    if (sf.text === undefined) return;
    const text = sf.text.slice(comment.pos, comment.end);
    this.writeComment(text);
  }
  writeCommentRangeWorker(text: string, lineMap: readonly number[], kind: number, loc: TextRange): void {
    void lineMap; void kind;
    // Slice and emit the comment span. SingleLineCommentTrivia is one
    // line; MultiLineCommentTrivia may span several.
    this.writeComment(text.slice(loc.pos, loc.end));
  }
  shouldEmitComments(node: AstNode): boolean { void node; return !this.options.removeComments; }
  shouldWriteComment(comment: CommentRange): boolean { void comment; return true; }

  // -------------------------------------------------------------------------
  // Emit predicates
  // -------------------------------------------------------------------------

  shouldEmitIndented(node: AstNode): boolean {
    // Block / object literal / array literal contents always get an
    // indent step. (Caller is responsible for the single-line case.)
    const k = (node as { kind?: number }).kind;
    return k === Kind.Block || k === Kind.ModuleBlock || k === Kind.ObjectLiteralExpression ||
      k === Kind.ArrayLiteralExpression;
  }
  shouldElideIndentation(node: AstNode): boolean {
    void node; return false;
  }
  shouldEmitOnSingleLine(node: AstNode): boolean {
    // A node is single-line when its end is on the same line as its
    // start. We use a position-based heuristic via .pos / .end on the
    // currentSourceFile.
    const start = (node as unknown as { pos?: number }).pos;
    const end = (node as unknown as { end?: number }).end;
    const text = (this.currentSourceFile as unknown as { text?: string })?.text;
    if (text === undefined || start === undefined || end === undefined) return false;
    for (let i = start; i < end; i++) {
      if (text.charCodeAt(i) === 0x0a) return false;
    }
    return true;
  }
  shouldEmitOnMultipleLines(node: AstNode): boolean {
    return !this.shouldEmitOnSingleLine(node);
  }
  shouldEmitBlockFunctionBodyOnSingleLine(body: Block): boolean {
    return this.shouldEmitOnSingleLine(body as unknown as AstNode);
  }
  shouldEmitOnNewLine(node: AstNode, format: number): boolean {
    void format;
    return this.shouldEmitOnMultipleLines(node);
  }
  shouldEmitSourceMaps(node: AstNode): boolean { void node; return this.options.sourceMap === true; }
  shouldEmitTokenSourceMaps(token: number, pos: number, contextNode: AstNode, flags: number): boolean {
    void token; void pos; void contextNode; void flags; return this.options.sourceMap === true;
  }
  shouldEmitLeadingComments(node: AstNode): boolean { return this.shouldEmitComments(node); }
  shouldEmitTrailingComments(node: AstNode): boolean { return this.shouldEmitComments(node); }
  shouldEmitNestedComments(node: AstNode): boolean { void node; return false; }
  shouldEmitDetachedComments(node: AstNode): boolean { return this.shouldEmitComments(node); }
  hasCommentsAtPosition(pos: number): boolean { void pos; return false; }
  shouldEmitIndirectCall(node: AstNode): boolean {
    // An indirect call is one wrapped to preserve `this`-isolation —
    // we use this for `0, expr()` style emit. Not needed for default
    // emit; conservative false.
    void node; return false;
  }
  shouldAllowTrailingComma(node: AstNode, list: NodeList): boolean {
    void list;
    // Trailing commas are allowed in array literals, object literals,
    // call expression arguments, parameters, and function body.
    const k = (node as { kind?: number }).kind;
    return k === Kind.ArrayLiteralExpression ||
      k === Kind.ObjectLiteralExpression ||
      k === Kind.CallExpression ||
      k === Kind.NewExpression;
  }

  // -------------------------------------------------------------------------
  // Token emission
  // -------------------------------------------------------------------------

  writeTokenText(token: number, writeKind: WriteKind, pos: number): number {
    void token; void writeKind; return pos;
  }
  emitToken(token: number, pos: number, writeKind: WriteKind, contextNode: AstNode | undefined): number {
    void writeKind; void contextNode;
    // Look up the token text and write it. Returns the new position
    // after the token.
    const text = printerTokenToString(token);
    if (text !== undefined) {
      this.write(text);
      return pos + text.length;
    }
    return pos;
  }
  emitTokenEx(token: number, pos: number, writeKind: WriteKind, contextNode: AstNode | undefined, emitFlags: number): number {
    void emitFlags;
    return this.emitToken(token, pos, writeKind, contextNode);
  }
  emitKeywordNode(node: AstNode): void { this.emitKeywordNodeEx(node, WriteKind.Keyword); }
  emitKeywordNodeEx(node: AstNode, writeKind: WriteKind): void {
    const text = printerTokenToString((node as { kind?: number }).kind ?? 0);
    if (text !== undefined) this.writeAs(text, writeKind);
  }
  emitPunctuationNode(node: AstNode): void { this.emitPunctuationNodeEx(node, WriteKind.Punctuation); }
  emitPunctuationNodeEx(node: AstNode, writeKind: WriteKind): void {
    const text = printerTokenToString((node as { kind?: number }).kind ?? 0);
    if (text !== undefined) this.writeAs(text, writeKind);
  }
  emitTokenNode(node: AstNode): void { this.emitTokenNodeEx(node, WriteKind.Punctuation); }
  emitTokenNodeEx(node: AstNode, writeKind: WriteKind): void {
    const text = printerTokenToString((node as { kind?: number }).kind ?? 0);
    if (text !== undefined) this.writeAs(text, writeKind);
  }
  emitLiteral(node: AstNode): void {
    switch ((node as { kind?: number }).kind) {
      case Kind.StringLiteral:
        this.emitStringLiteral(node);
        break;
      case Kind.NumericLiteral:
        this.emitNumericLiteral(node);
        break;
      case Kind.BigIntLiteral:
        this.emitBigIntLiteral(node);
        break;
      case Kind.RegularExpressionLiteral:
        this.emitRegularExpressionLiteral(node);
        break;
      case Kind.NoSubstitutionTemplateLiteral:
        this.emitNoSubstitutionTemplateLiteral(node);
        break;
      default:
        this.write((node as { text?: string }).text ?? "");
        break;
    }
  }
  emitNoSubstitutionTemplateLiteral(node: AstNode): void { this.emitTemplateLiteral(node); }
  emitTemplateHead(node: AstNode): void { this.write((node as { text?: string }).text ?? ""); }
  emitTemplateMiddle(node: AstNode): void { this.write((node as { text?: string }).text ?? ""); }
  emitTemplateTail(node: AstNode): void { this.write((node as { text?: string }).text ?? ""); }
  emitTemplateMiddleTail(node: AstNode): void { this.write((node as { text?: string }).text ?? ""); }
  emitIdentifierText(text: string): void { this.writeSymbol(text, undefined); }
  emitIdentifierName(text: string): void { this.emitIdentifierText(text); }
  emitIdentifierNameNode(node: AstNode): void { this.emitIdentifierText((node as { text?: string }).text ?? ""); }
  getUniqueHelperName(name: string): string {
    return this.handlers.hasGlobalName?.(name) === true ? `_${name}` : name;
  }
  emitIdentifierReference(node: AstNode): void { this.emitIdentifierNameNode(node); }
  emitBindingIdentifier(node: AstNode): void { this.emitIdentifierNameNode(node); }
  emitLabelIdentifier(node: AstNode): void { this.emitIdentifierNameNode(node); }
  emitPrivateIdentifier(node: AstNode): void { this.emitIdentifierNameNode(node); }
  emitQualifiedName(node: AstNode): void {
    const qualified = node as { left?: AstNode; right?: AstNode };
    if (qualified.left !== undefined) this.emitEntityName(qualified.left);
    this.writePunctuation(".");
    if (qualified.right !== undefined) this.emitIdentifierNameNode(qualified.right);
  }
  emitEntityName(node: AstNode): void {
    if ((node as { kind?: number }).kind === Kind.QualifiedName) this.emitQualifiedName(node);
    else this.emitIdentifierNameNode(node);
  }
  emitBindingName(node: AstNode): void {
    switch ((node as { kind?: number }).kind) {
      case Kind.ObjectBindingPattern:
        this.emitObjectBindingPattern(node);
        break;
      case Kind.ArrayBindingPattern:
        this.emitArrayBindingPattern(node);
        break;
      default:
        this.emitBindingIdentifier(node);
        break;
    }
  }
  emitMemberName(node: AstNode): void {
    if ((node as { kind?: number }).kind === Kind.ComputedPropertyName) this.emitComputedPropertyName(node);
    else this.emitEntityName(node);
  }
  emitModuleName(node: AstNode): void {
    if ((node as { kind?: number }).kind === Kind.StringLiteral) this.emitStringLiteral(node);
    else this.emitEntityName(node);
  }
  emitModuleExportName(node: AstNode): void { this.emitModuleName(node); }
  emitImportAttributeName(node: AstNode): void { this.emitModuleName(node); }
  emitNestedModuleName(node: AstNode): void { this.emitModuleName(node); }
  emitModifierList(node: AstNode | undefined): void {
    const modifiers = getNodeArray((node as { modifiers?: unknown } | undefined)?.modifiers);
    for (const modifier of modifiers) this.emitModifierLike(modifier);
  }
  emitModifierLike(node: AstNode): void {
    this.emit(0, node);
    this.writeSpace();
  }
  emitTypeParameters(node: AstNode): void {
    const params = getNodeArray((node as { typeParameters?: unknown }).typeParameters);
    if (params.length === 0) return;
    this.writePunctuation("<");
    this.emitCommaList(params);
    this.writePunctuation(">");
  }
  emitTypeParameterDeclarationNode(node: AstNode): void { this.emitTypeParameter(node); }
  emitTypeAnnotation(node: AstNode | undefined): void {
    if (node === undefined) return;
    this.writePunctuation(": ");
    this.emit(0, node);
  }
  emitInitializer(node: AstNode | undefined): void {
    if (node === undefined) return;
    this.writeOperator(" = ");
    this.emit(0, node);
  }
  emitParameterName(node: AstNode): void {
    const name = (node as { name?: AstNode }).name;
    if (name !== undefined) this.emitBindingName(name);
  }
  emitParameterDeclarationNode(node: AstNode): void { this.emitParameter(node); }
  emitParameters(node: AstNode): void { this.emitParameterList(node); }
  emitParametersForArrow(node: AstNode): void { this.emitParameterList(node); }
  emitParametersForIndexSignature(node: AstNode): void { this.emitParameterList(node); }
  emitSignature(node: AstNode): void {
    this.emitTypeParameters(node);
    this.emitParameterList(node);
    this.emitTypeAnnotation((node as { type?: AstNode }).type);
  }
  emitFunctionBody(node: AstNode): void {
    const body = (node as { body?: AstNode }).body;
    if (body !== undefined) {
      this.writeSpace();
      this.emit(0, body);
    } else {
      this.writeTrailingSemicolon();
    }
  }
  emitFunctionBodyNode(node: AstNode): void { this.emitFunctionBody(node); }
  emitPropertySignature(node: AstNode): void { this.emitPropertyDeclaration(node); }
  emitMethodSignature(node: AstNode): void { this.emitMethodDeclaration(node); }
  emitClassStaticBlockDeclaration(node: AstNode): void { this.emitBlock((node as { body?: AstNode }).body ?? node); }
  emitConstructor(node: AstNode): void { this.emitConstructorDeclaration(node); }
  emitAccessorDeclaration(node: AstNode): void {
    if ((node as { kind?: number }).kind === Kind.GetAccessor) this.emitGetAccessorDeclaration(node);
    else this.emitSetAccessorDeclaration(node);
  }
  emitGetAccessorDeclaration(node: AstNode): void { this.emitGetAccessor(node); }
  emitSetAccessorDeclaration(node: AstNode): void { this.emitSetAccessor(node); }
  emitCallSignature(node: AstNode): void { this.emitSignature(node); this.writeTrailingSemicolon(); }
  emitConstructSignature(node: AstNode): void {
    this.writeKeyword("new ");
    this.emitSignature(node);
    this.writeTrailingSemicolon();
  }
  emitIndexSignature(node: AstNode): void {
    this.writePunctuation("[");
    this.emitCommaList(getNodeArray((node as { parameters?: unknown }).parameters));
    this.writePunctuation("]");
    this.emitTypeAnnotation((node as { type?: AstNode }).type);
    this.writeTrailingSemicolon();
  }
  emitClassElement(node: AstNode): void { this.emit(0, node); }
  emitTypeElement(node: AstNode): void { this.emit(0, node); }
  emitObjectLiteralElement(node: AstNode): void { this.emit(0, node); }

  // -------------------------------------------------------------------------
  // Public entry points
  // -------------------------------------------------------------------------

  emit(hint: number, node: AstNode | undefined): void {
    if (node === undefined) return;
    this.emitNode(hint, node);
  }
  emitNode(hint: number, node: AstNode | undefined): void {
    void hint;
    if (node === undefined) return;
    this.emitWorker(hint, node);
  }
  emitNodeList(parentNode: AstNode | undefined, nodes: NodeList | undefined, format: ListFormat): void {
    if (nodes === undefined) return;
    const inner = (nodes as unknown as { nodes?: readonly AstNode[] }).nodes ?? [];
    this.emitList(parentNode, nodes, format, 0, inner.length);
  }
  emitList(parentNode: AstNode | undefined, nodes: NodeList | undefined, format: ListFormat, start: number, count: number): void {
    let nextFormat = format;
    if (parentNode !== undefined && this.shouldEmitOnMultipleLines(parentNode)) nextFormat |= LFPreferNewLine | LFIndented;
    this.emitListRange(parentNode, nodes, nextFormat, start, count);
  }
  emitListRange(parentNode: AstNode | undefined, nodes: NodeList | undefined, format: ListFormat, start: number, count: number): void {
    const isNil = nodes === undefined;
    const inner = getNodeArray(nodes);
    const actualStart = start < 0 ? 0 : start;
    const actualCount = count < 0 ? inner.length - actualStart : count;
    if (isNil && (format & LFOptionalIfNil) !== 0) return;
    const isEmpty = isNil || actualStart >= inner.length || actualCount <= 0;
    if (isEmpty && (format & LFOptionalIfEmpty) !== 0) return;
    if ((format & LFBracketsMask) !== 0) {
      this.writePunctuation(getListOpeningBracket(format));
      if (isEmpty && (format & LFSpaceBetweenBraces) !== 0 && (format & LFNoSpaceIfEmpty) === 0) this.writeSpace();
    }
    if (isEmpty) {
      if ((format & LFMultiLine) !== 0) this.writeLine();
      else if ((format & LFSpaceBetweenBraces) !== 0 && (format & LFNoSpaceIfEmpty) === 0) this.writeSpace();
    } else {
      this.emitListItems(
        (printer, child) => printer.emit(0, child),
        parentNode,
        { nodes: inner.slice(actualStart, Math.min(actualStart + actualCount, inner.length)) } as unknown as NodeList,
        format,
        0,
        Math.min(actualCount, inner.length - actualStart),
      );
    }
    if ((format & LFBracketsMask) !== 0) this.writePunctuation(getListClosingBracket(format));
  }
  emitListItems(
    emit: (printer: Printer, node: AstNode) => void,
    parentNode: AstNode | undefined,
    nodes: NodeList | undefined,
    format: ListFormat,
    start = 0,
    count = getNodeArray(nodes).length - start,
  ): void {
    const inner = getNodeArray(nodes);
    let shouldEmitInterveningComments = (format & LFNoInterveningComments) === 0;
    const firstChild = inner[start];
    const leadingLineTerminatorCount = firstChild === undefined ? 0 : this.getLeadingLineTerminatorCount(parentNode, firstChild, format);
    if (leadingLineTerminatorCount > 0) {
      this.writeLineRepeat(leadingLineTerminatorCount);
      shouldEmitInterveningComments = false;
    } else if ((format & LFSpaceBetweenBraces) !== 0) {
      this.writeSpace();
    }
    if ((format & LFIndented) !== 0) this.increaseIndent();
    let previousSibling: AstNode | undefined;
    let decreasedIndentAfterEmit = false;
    for (let index = 0; index < count; index += 1) {
      const child = inner[start + index];
      if (child === undefined) break;
      if ((format & LFAsteriskDelimited) !== 0) {
        this.writeLine();
        this.writeDelimiter(format);
      } else if (previousSibling !== undefined) {
        this.writeDelimiter(format);
        const separatingLineTerminatorCount = this.getSeparatingLineTerminatorCount(previousSibling, child, format);
        if (separatingLineTerminatorCount > 0) {
          if ((format & (LFMultiLine | LFIndented)) === 0) {
            this.increaseIndent();
            decreasedIndentAfterEmit = true;
          }
          this.writeLineRepeat(separatingLineTerminatorCount);
          shouldEmitInterveningComments = false;
        } else if ((format & LFSpaceBetweenSiblings) !== 0) {
          this.writeSpace();
        }
      }
      void shouldEmitInterveningComments;
      emit(this, child);
      if (decreasedIndentAfterEmit) {
        this.decreaseIndent();
        decreasedIndentAfterEmit = false;
      }
      previousSibling = child;
    }
    if (this.hasTrailingComma(parentNode, nodes) && (format & LFAllowTrailingComma) !== 0 && (format & LFCommaDelimited) !== 0) {
      this.writePunctuation(",");
    }
    if ((format & LFIndented) !== 0) this.decreaseIndent();
    const lastChild = previousSibling;
    const closingLineTerminatorCount = lastChild === undefined ? 0 : this.getClosingLineTerminatorCount(parentNode, lastChild, format, textRangeOf(nodes));
    if (closingLineTerminatorCount > 0) this.writeLineRepeat(closingLineTerminatorCount);
    else if ((format & (LFSpaceAfterList | LFSpaceBetweenBraces)) !== 0) this.writeSpace();
  }
  hasTrailingComma(parentNode: AstNode | undefined, children: NodeList | undefined): boolean {
    void parentNode;
    return (children as unknown as { readonly hasTrailingComma?: boolean } | undefined)?.hasTrailingComma === true;
  }
  writeDelimiter(format: ListFormat): void {
    switch (format & LFDelimitersMask) {
      case 0:
        return;
      case LFCommaDelimited:
        this.writePunctuation(",");
        return;
      case LFBarDelimited:
        this.writeSpace();
        this.writePunctuation("|");
        return;
      case LFAsteriskDelimited:
        this.writeSpace();
        this.writePunctuation("*");
        this.writeSpace();
        return;
      case LFAmpersandDelimited:
        this.writeSpace();
        this.writePunctuation("&");
        return;
      default:
        return;
    }
  }
  private emitCommaList(nodes: readonly AstNode[]): void {
    if (nodes === undefined) return;
    for (let index = 0; index < nodes.length; index += 1) {
      if (index > 0) this.writePunctuation(", ");
      this.emit(0, nodes[index]);
    }
  }
  emitWorker(hint: number, node: AstNode): void {
    // Dispatch by node.kind. This is the giant switch in TS-Go.
    // For the basic cases we delegate to the per-kind emit method.
    const k = (node as { kind?: number }).kind ?? 0;
    switch (k) {
      case Kind.SourceFile: return this.emitSourceFile(node);
      case Kind.Identifier: return this.emitIdentifier(node);
      case Kind.PrivateIdentifier: return this.emitIdentifier(node);
      case Kind.StringLiteral: return this.emitStringLiteral(node);
      case Kind.NumericLiteral: return this.emitNumericLiteral(node);
      case Kind.BigIntLiteral: return this.emitBigIntLiteral(node);
      case Kind.RegularExpressionLiteral: return this.emitRegularExpressionLiteral(node);
      case Kind.NoSubstitutionTemplateLiteral: return this.emitTemplateLiteral(node);
      case Kind.TemplateExpression: return this.emitTemplateExpression(node);
      case Kind.Block: return this.emitBlock(node);
      case Kind.ModuleBlock: return this.emitModuleBlock(node);
      case Kind.VariableStatement: return this.emitVariableStatement(node);
      case Kind.VariableDeclaration: return this.emitVariableDeclaration(node);
      case Kind.ObjectBindingPattern: return this.emitObjectBindingPattern(node);
      case Kind.ArrayBindingPattern: return this.emitArrayBindingPattern(node);
      case Kind.BindingElement: return this.emitBindingElement(node);
      case Kind.ExpressionStatement: return this.emitExpressionStatement(node);
      case Kind.IfStatement: return this.emitIfStatement(node);
      case Kind.DoStatement: return this.emitDoStatement(node);
      case Kind.WhileStatement: return this.emitWhileStatement(node);
      case Kind.ForStatement: return this.emitForStatement(node);
      case Kind.ForInStatement: return this.emitForInStatement(node);
      case Kind.ForOfStatement: return this.emitForOfStatement(node);
      case Kind.BreakStatement: return this.emitBreakStatement(node);
      case Kind.ContinueStatement: return this.emitContinueStatement(node);
      case Kind.ReturnStatement: return this.emitReturnStatement(node);
      case Kind.ThrowStatement: return this.emitThrowStatement(node);
      case Kind.TryStatement: return this.emitTryStatement(node);
      case Kind.SwitchStatement: return this.emitSwitchStatement(node);
      case Kind.LabeledStatement: return this.emitLabeledStatement(node);
      case Kind.DebuggerStatement: return this.emitDebuggerStatement(node);
      case Kind.WithStatement: return this.emitWithStatement(node);
      case Kind.ClassDeclaration: return this.emitClassDeclaration(node);
      case Kind.ClassExpression: return this.emitClassExpression(node);
      case Kind.Constructor: return this.emitConstructorDeclaration(node);
      case Kind.MethodDeclaration:
      case Kind.MethodSignature: return this.emitMethodDeclaration(node);
      case Kind.PropertyDeclaration:
      case Kind.PropertySignature: return this.emitPropertyDeclaration(node);
      case Kind.GetAccessor: return this.emitGetAccessor(node);
      case Kind.SetAccessor: return this.emitSetAccessor(node);
      case Kind.FunctionDeclaration: return this.emitFunctionDeclaration(node);
      case Kind.FunctionExpression: return this.emitFunctionExpression(node);
      case Kind.ArrowFunction: return this.emitArrowFunction(node);
      case Kind.Parameter: return this.emitParameter(node);
      case Kind.InterfaceDeclaration: return this.emitInterfaceDeclaration(node);
      case Kind.TypeAliasDeclaration: return this.emitTypeAliasDeclaration(node);
      case Kind.EnumDeclaration: return this.emitEnumDeclaration(node);
      case Kind.EnumMember: return this.emitEnumMember(node);
      case Kind.ModuleDeclaration: return this.emitModuleDeclaration(node);
      case Kind.ImportDeclaration: return this.emitImportDeclaration(node);
      case Kind.ImportClause: return this.emitImportClause(node);
      case Kind.NamespaceImport: return this.emitNamespaceImport(node);
      case Kind.NamedImports: return this.emitNamedImports(node);
      case Kind.ImportSpecifier: return this.emitImportSpecifier(node);
      case Kind.ImportAttributes: return this.emitImportAttributes(node);
      case Kind.ImportAttribute: return this.emitImportAttribute(node);
      case Kind.ImportEqualsDeclaration: return this.emitImportEqualsDeclaration(node);
      case Kind.ExternalModuleReference: return this.emitExternalModuleReference(node);
      case Kind.ExportDeclaration: return this.emitExportDeclaration(node);
      case Kind.NamedExports: return this.emitNamedExports(node);
      case Kind.ExportSpecifier: return this.emitExportSpecifier(node);
      case Kind.NamespaceExport: return this.emitNamespaceExport(node);
      case Kind.NamespaceExportDeclaration: return this.emitNamespaceExportDeclaration(node);
      case Kind.ExportAssignment: return this.emitExportAssignment(node);
      case Kind.NotEmittedStatement: return this.emitNotEmittedStatement(node);
      case Kind.NotEmittedTypeElement: return this.emitNotEmittedTypeElement(node);
      case Kind.CallExpression: return this.emitCallExpression(node);
      case Kind.NewExpression: return this.emitNewExpression(node);
      case Kind.PropertyAccessExpression: return this.emitPropertyAccessExpression(node);
      case Kind.ElementAccessExpression: return this.emitElementAccessExpression(node);
      case Kind.BinaryExpression: return this.emitBinaryExpression(node);
      case Kind.ConditionalExpression: return this.emitConditionalExpression(node);
      case Kind.PrefixUnaryExpression: return this.emitPrefixUnaryExpression(node);
      case Kind.PostfixUnaryExpression: return this.emitPostfixUnaryExpression(node);
      case Kind.YieldExpression: return this.emitYieldExpression(node);
      case Kind.AwaitExpression: return this.emitAwaitExpression(node);
      case Kind.VoidExpression: return this.emitVoidExpression(node);
      case Kind.DeleteExpression: return this.emitDeleteExpression(node);
      case Kind.TypeOfExpression: return this.emitTypeOfExpression(node);
      case Kind.ParenthesizedExpression: return this.emitParenthesizedExpression(node);
      case Kind.SpreadElement: return this.emitSpreadElement(node);
      case Kind.AsExpression: return this.emitAsExpression(node);
      case Kind.SatisfiesExpression: return this.emitSatisfiesExpression(node);
      case Kind.NonNullExpression: return this.emitNonNullExpression(node);
      case Kind.TypeAssertionExpression: return this.emitTypeAssertionExpression(node);
      case Kind.ObjectLiteralExpression: return this.emitObjectLiteralExpression(node);
      case Kind.ArrayLiteralExpression: return this.emitArrayLiteralExpression(node);
      case Kind.PropertyAssignment: return this.emitPropertyAssignment(node);
      case Kind.ShorthandPropertyAssignment: return this.emitShorthandPropertyAssignment(node);
      case Kind.SpreadAssignment: return this.emitSpreadAssignment(node);
      case Kind.ComputedPropertyName: return this.emitComputedPropertyName(node);
      case Kind.Decorator: return this.emitDecorator(node);
      case Kind.HeritageClause: return this.emitHeritageClause(node);
      case Kind.CaseClause: return this.emitCaseClause(node);
      case Kind.DefaultClause: return this.emitDefaultClause(node);
      case Kind.CatchClause: return this.emitCatchClause(node);
      case Kind.JsxElement: return this.emitJsxElement(node);
      case Kind.JsxSelfClosingElement: return this.emitJsxSelfClosingElement(node);
      case Kind.JsxOpeningElement: return this.emitJsxOpeningElement(node);
      case Kind.JsxClosingElement: return this.emitJsxClosingElement(node);
      case Kind.JsxOpeningFragment: return this.emitJsxOpeningFragment(node);
      case Kind.JsxClosingFragment: return this.emitJsxClosingFragment(node);
      case Kind.JsxFragment: return this.emitJsxFragment(node);
      case Kind.JsxText: return this.emitJsxText(node);
      case Kind.JsxExpression: return this.emitJsxExpression(node);
      case Kind.JsxAttribute: return this.emitJsxAttribute(node);
      case Kind.JsxSpreadAttribute: return this.emitJsxSpreadAttribute(node);
    }
    if (isTypeNodeKind(k)) return this.emitTypeNode(node);
  }
  emitSourceFile(node: AstNode): void {
    this.emitShebangIfNeeded(node as SourceFile);
    this.emitTripleSlashDirectives(node as SourceFile);
    this.emitHelpers(node);
    const statements = (node as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes ?? [];
    const prologueEnd = this.emitPrologueDirectives((node as unknown as { statements?: NodeList }).statements);
    for (let i = prologueEnd; i < statements.length; i++) {
      if (i > 0) this.writeLine();
      this.emit(0, statements[i]);
    }
  }
  emitIdentifier(node: AstNode): void {
    const text = (node as unknown as { text?: string }).text ?? "";
    this.write(text);
  }
  emitStringLiteral(node: AstNode): void {
    const text = (node as unknown as { text?: string }).text ?? "";
    this.write(`"${text.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`);
  }
  emitNumericLiteral(node: AstNode): void {
    this.write((node as unknown as { text?: string }).text ?? "");
  }
  emitBigIntLiteral(node: AstNode): void {
    this.write((node as unknown as { text?: string }).text ?? "");
  }
  emitRegularExpressionLiteral(node: AstNode): void {
    this.write((node as unknown as { text?: string }).text ?? "");
  }
  emitTemplateLiteral(node: AstNode): void {
    const text = (node as unknown as { text?: string }).text ?? "";
    this.write(`\`${text}\``);
  }
  emitTemplateExpression(node: AstNode): void {
    // `head${a}middle${b}tail`
    this.writePunctuation("`");
    const head = (node as unknown as { head?: AstNode }).head;
    if (head !== undefined) this.write((head as unknown as { text?: string }).text ?? "");
    const spans = (node as unknown as { templateSpans?: { nodes?: readonly AstNode[] } }).templateSpans?.nodes;
    if (spans !== undefined) {
      for (const span of spans) this.emitTemplateSpan(span);
    }
    this.writePunctuation("`");
  }
  emitTemplateSpan(node: AstNode): void {
    this.writePunctuation("${");
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) this.emit(0, expr);
    this.writePunctuation("}");
    const literal = (node as unknown as { literal?: AstNode }).literal;
    if (literal !== undefined) this.write((literal as unknown as { text?: string }).text ?? "");
  }
  emitObjectBindingPattern(node: AstNode): void {
    this.writePunctuation("{");
    this.emitCommaList(getNodeArray((node as { elements?: unknown }).elements));
    this.writePunctuation("}");
  }
  emitArrayBindingPattern(node: AstNode): void {
    this.writePunctuation("[");
    this.emitCommaList(getNodeArray((node as { elements?: unknown }).elements));
    this.writePunctuation("]");
  }
  emitBindingElement(node: AstNode): void {
    const dotDotDot = (node as { dotDotDotToken?: AstNode }).dotDotDotToken;
    if (dotDotDot !== undefined) this.writePunctuation("...");
    const propertyName = (node as { propertyName?: AstNode }).propertyName;
    if (propertyName !== undefined) {
      this.emit(0, propertyName);
      this.writePunctuation(": ");
    }
    const name = (node as { name?: AstNode }).name;
    if (name !== undefined) this.emitBindingName(name);
    this.emitInitializer((node as { initializer?: AstNode }).initializer);
  }
  emitBindingElementNode(node: AstNode): void { this.emitBindingElement(node); }
  emitJsxElement(node: AstNode): void {
    const opening = (node as unknown as { openingElement?: AstNode }).openingElement;
    if (opening !== undefined) this.emit(0, opening);
    const children = (node as unknown as { children?: { nodes?: readonly AstNode[] } }).children?.nodes;
    if (children !== undefined) for (const c of children) this.emit(0, c);
    const closing = (node as unknown as { closingElement?: AstNode }).closingElement;
    if (closing !== undefined) this.emit(0, closing);
  }
  emitJsxSelfClosingElement(node: AstNode): void {
    this.writePunctuation("<");
    const tagName = (node as unknown as { tagName?: AstNode }).tagName;
    if (tagName !== undefined) this.emit(0, tagName);
    const attrs = (node as unknown as { attributes?: AstNode }).attributes;
    if (attrs !== undefined) this.emit(0, attrs);
    this.writePunctuation(" />");
  }
  emitJsxOpeningElement(node: AstNode): void {
    this.writePunctuation("<");
    const tagName = (node as unknown as { tagName?: AstNode }).tagName;
    if (tagName !== undefined) this.emit(0, tagName);
    const attrs = (node as unknown as { attributes?: AstNode }).attributes;
    if (attrs !== undefined) this.emit(0, attrs);
    this.writePunctuation(">");
  }
  emitJsxClosingElement(node: AstNode): void {
    this.writePunctuation("</");
    const tagName = (node as unknown as { tagName?: AstNode }).tagName;
    if (tagName !== undefined) this.emit(0, tagName);
    this.writePunctuation(">");
  }
  emitJsxFragment(node: AstNode): void {
    this.writePunctuation("<>");
    const children = (node as unknown as { children?: { nodes?: readonly AstNode[] } }).children?.nodes;
    if (children !== undefined) for (const c of children) this.emit(0, c);
    this.writePunctuation("</>");
  }
  emitJsxOpeningFragment(_node: AstNode): void {
    this.writePunctuation("<>");
  }
  emitJsxClosingFragment(_node: AstNode): void {
    this.writePunctuation("</>");
  }
  emitJsxText(node: AstNode): void {
    this.write((node as unknown as { text?: string }).text ?? "");
  }
  emitJsxAttribute(node: AstNode): void {
    const name = (node as unknown as { name?: AstNode }).name;
    if (name !== undefined) this.emit(0, name);
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) {
      this.writePunctuation("=");
      this.emit(0, init);
    }
  }
  emitJsxSpreadAttribute(node: AstNode): void {
    this.writePunctuation("{...");
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) this.emit(0, expr);
    this.writePunctuation("}");
  }
  emitJsxExpression(node: AstNode): void {
    this.writePunctuation("{");
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) this.emit(0, expr);
    this.writePunctuation("}");
  }
  emitJsxAttributeLike(node: AstNode): void {
    this.emit(0, node);
  }
  emitJsxNamespacedName(node: AstNode): void {
    this.emit(0, (node as unknown as { namespace?: AstNode }).namespace);
    this.writePunctuation(":");
    this.emit(0, (node as unknown as { name?: AstNode }).name);
  }
  emitJsxChild(node: AstNode): void {
    this.emit(0, node);
  }
  emitJsxTagName(node: AstNode): void {
    this.emit(0, node);
  }
  emitJsxAttributeName(node: AstNode): void {
    this.emit(0, node);
  }
  emitJsxAttributeValue(node: AstNode): void {
    this.emit(0, node);
  }
  emitBlock(node: AstNode): void {
    this.writePunctuation("{");
    this.increaseIndent();
    const statements = (node as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
    if (statements !== undefined) {
      for (const s of statements) {
        this.writeLine();
        this.emit(0, s);
      }
    }
    this.decreaseIndent();
    this.writeLine();
    this.writePunctuation("}");
  }
  emitModuleBlock(node: AstNode): void {
    this.emitBlock(node);
  }
  emitVariableStatement(node: AstNode): void {
    const decls = (node as unknown as { declarationList?: AstNode }).declarationList;
    if (decls !== undefined) {
      const flags = (decls as unknown as { flags?: number }).flags ?? 0;
      const keyword = (flags & 2) !== 0 ? "const " : (flags & 1) !== 0 ? "let " : "var ";
      this.writeKeyword(keyword);
      const list = (decls as unknown as { declarations?: { nodes?: readonly AstNode[] } }).declarations?.nodes ?? [];
      for (let i = 0; i < list.length; i++) {
        if (i > 0) this.writePunctuation(", ");
        const d = list[i];
        if (d === undefined) continue;
        const name = (d as unknown as { name?: AstNode }).name;
        if (name !== undefined) this.emit(0, name);
        const initializer = (d as unknown as { initializer?: AstNode }).initializer;
        if (initializer !== undefined) {
          this.writeOperator(" = ");
          this.emit(0, initializer);
        }
      }
    }
    this.writeTrailingSemicolon();
  }
  emitVariableDeclaration(node: AstNode): void {
    const name = (node as unknown as { name?: AstNode }).name;
    if (name !== undefined) this.emit(0, name);
    const type = (node as unknown as { type?: AstNode }).type;
    if (type !== undefined) {
      this.writePunctuation(": ");
      this.emit(0, type);
    }
    const initializer = (node as unknown as { initializer?: AstNode }).initializer;
    if (initializer !== undefined) {
      this.writeOperator(" = ");
      this.emit(0, initializer);
    }
  }
  emitExpressionStatement(node: AstNode): void {
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) this.emit(0, expr);
    this.writeTrailingSemicolon();
  }
  emitIfStatement(node: AstNode): void {
    this.writeKeyword("if ");
    this.writePunctuation("(");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writePunctuation(") ");
    this.emit(0, (node as unknown as { thenStatement?: AstNode }).thenStatement);
    const elseStmt = (node as unknown as { elseStatement?: AstNode }).elseStatement;
    if (elseStmt !== undefined) {
      this.writeSpace();
      this.writeKeyword("else ");
      this.emit(0, elseStmt);
    }
  }
  emitDoStatement(node: AstNode): void {
    this.writeKeyword("do ");
    this.emit(0, (node as unknown as { statement?: AstNode }).statement);
    this.writeSpace();
    this.writeKeyword("while ");
    this.writePunctuation("(");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writePunctuation(")");
    this.writeTrailingSemicolon();
  }
  emitWhileStatement(node: AstNode): void {
    this.writeKeyword("while ");
    this.writePunctuation("(");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writePunctuation(") ");
    this.emit(0, (node as unknown as { statement?: AstNode }).statement);
  }
  emitForStatement(node: AstNode): void {
    this.writeKeyword("for ");
    this.writePunctuation("(");
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) this.emit(0, init);
    this.writePunctuation("; ");
    const cond = (node as unknown as { condition?: AstNode }).condition;
    if (cond !== undefined) this.emit(0, cond);
    this.writePunctuation("; ");
    const incr = (node as unknown as { incrementor?: AstNode }).incrementor;
    if (incr !== undefined) this.emit(0, incr);
    this.writePunctuation(") ");
    this.emit(0, (node as unknown as { statement?: AstNode }).statement);
  }
  emitForInStatement(node: AstNode): void {
    this.writeKeyword("for ");
    this.writePunctuation("(");
    this.emit(0, (node as unknown as { initializer?: AstNode }).initializer);
    this.writeSpace();
    this.writeKeyword("in ");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writePunctuation(") ");
    this.emit(0, (node as unknown as { statement?: AstNode }).statement);
  }
  emitForOfStatement(node: AstNode): void {
    this.writeKeyword("for ");
    const awaitMod = (node as unknown as { awaitModifier?: AstNode }).awaitModifier;
    if (awaitMod !== undefined) this.writeKeyword("await ");
    this.writePunctuation("(");
    this.emit(0, (node as unknown as { initializer?: AstNode }).initializer);
    this.writeSpace();
    this.writeKeyword("of ");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writePunctuation(") ");
    this.emit(0, (node as unknown as { statement?: AstNode }).statement);
  }
  emitContinueStatement(node: AstNode): void {
    this.writeKeyword("continue");
    const label = (node as unknown as { label?: AstNode }).label;
    if (label !== undefined) {
      this.writeSpace();
      this.emit(0, label);
    }
    this.writeTrailingSemicolon();
  }
  emitBreakStatement(node: AstNode): void {
    this.writeKeyword("break");
    const label = (node as unknown as { label?: AstNode }).label;
    if (label !== undefined) {
      this.writeSpace();
      this.emit(0, label);
    }
    this.writeTrailingSemicolon();
  }
  emitReturnStatement(node: AstNode): void {
    this.writeKeyword("return");
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) {
      this.writeSpace();
      this.emit(0, expr);
    }
    this.writeTrailingSemicolon();
  }
  emitWithStatement(node: AstNode): void {
    this.writeKeyword("with ");
    this.writePunctuation("(");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writePunctuation(") ");
    this.emit(0, (node as unknown as { statement?: AstNode }).statement);
  }
  emitSwitchStatement(node: AstNode): void {
    this.writeKeyword("switch ");
    this.writePunctuation("(");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writePunctuation(") ");
    this.emit(0, (node as unknown as { caseBlock?: AstNode }).caseBlock);
  }
  emitLabeledStatement(node: AstNode): void {
    this.emit(0, (node as unknown as { label?: AstNode }).label);
    this.writePunctuation(": ");
    this.emit(0, (node as unknown as { statement?: AstNode }).statement);
  }
  emitThrowStatement(node: AstNode): void {
    this.writeKeyword("throw ");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writeTrailingSemicolon();
  }
  emitTryStatement(node: AstNode): void {
    this.writeKeyword("try ");
    this.emit(0, (node as unknown as { tryBlock?: AstNode }).tryBlock);
    const catchClause = (node as unknown as { catchClause?: AstNode }).catchClause;
    if (catchClause !== undefined) {
      this.writeSpace();
      this.emitCatchClause(catchClause);
    }
    const finallyBlock = (node as unknown as { finallyBlock?: AstNode }).finallyBlock;
    if (finallyBlock !== undefined) {
      this.writeSpace();
      this.writeKeyword("finally ");
      this.emit(0, finallyBlock);
    }
  }
  emitDebuggerStatement(_node: AstNode): void {
    this.writeKeyword("debugger");
    this.writeTrailingSemicolon();
  }
  emitNotEmittedStatement(_node: AstNode): void {}
  emitNotEmittedTypeElement(_node: AstNode): void {}
  emitClassDeclaration(node: AstNode): void {
    this.emitClassLike(node, /*isExpression*/ false);
  }
  emitClassExpression(node: AstNode): void {
    this.emitClassLike(node, /*isExpression*/ true);
  }
  private emitClassLike(node: AstNode, isExpression: boolean): void {
    void isExpression;
    this.writeKeyword("class");
    const name = (node as unknown as { name?: AstNode }).name;
    if (name !== undefined) {
      this.writeSpace();
      this.emit(0, name);
    }
    const heritageClauses = (node as unknown as { heritageClauses?: { nodes?: readonly AstNode[] } }).heritageClauses?.nodes ?? [];
    for (const hc of heritageClauses) {
      this.writeSpace();
      this.emit(0, hc);
    }
    this.writeSpace();
    this.writePunctuation("{");
    this.increaseIndent();
    const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes ?? [];
    for (const m of members) {
      this.writeLine();
      this.emit(0, m);
    }
    this.decreaseIndent();
    this.writeLine();
    this.writePunctuation("}");
  }
  emitFunctionDeclaration(node: AstNode): void {
    this.emitFunctionLike(node, "function ");
  }
  emitFunctionExpression(node: AstNode): void {
    this.emitFunctionLike(node, "function");
  }
  private emitFunctionLike(node: AstNode, keyword: string): void {
    this.writeKeyword(keyword);
    const asteriskToken = (node as unknown as { asteriskToken?: AstNode }).asteriskToken;
    if (asteriskToken !== undefined) this.writeOperator("*");
    const name = (node as unknown as { name?: AstNode }).name;
    if (name !== undefined) {
      if (keyword === "function") this.writeSpace();
      this.emit(0, name);
    }
    this.emitParameterList(node);
    const body = (node as unknown as { body?: AstNode }).body;
    if (body !== undefined) {
      this.writeSpace();
      this.emit(0, body);
    } else {
      this.writeTrailingSemicolon();
    }
  }
  emitArrowFunction(node: AstNode): void {
    this.emitParameterList(node);
    this.writePunctuation(" => ");
    const body = (node as unknown as { body?: AstNode }).body;
    if (body !== undefined) this.emit(0, body);
  }
  private emitParameterList(node: AstNode): void {
    this.writePunctuation("(");
    const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes ?? [];
    for (let i = 0; i < params.length; i++) {
      if (i > 0) this.writePunctuation(", ");
      this.emit(0, params[i]);
    }
    this.writePunctuation(")");
  }
  emitConstructorDeclaration(node: AstNode): void {
    this.writeKeyword("constructor");
    this.emitParameterList(node);
    const body = (node as unknown as { body?: AstNode }).body;
    if (body !== undefined) {
      this.writeSpace();
      this.emit(0, body);
    } else {
      this.writeTrailingSemicolon();
    }
  }
  emitMethodDeclaration(node: AstNode): void {
    const asteriskToken = (node as unknown as { asteriskToken?: AstNode }).asteriskToken;
    if (asteriskToken !== undefined) this.writeOperator("*");
    const name = (node as unknown as { name?: AstNode }).name;
    if (name !== undefined) this.emit(0, name);
    this.emitParameterList(node);
    const body = (node as unknown as { body?: AstNode }).body;
    if (body !== undefined) {
      this.writeSpace();
      this.emit(0, body);
    } else {
      this.writeTrailingSemicolon();
    }
  }
  emitPropertyDeclaration(node: AstNode): void {
    const name = (node as unknown as { name?: AstNode }).name;
    if (name !== undefined) this.emit(0, name);
    const initializer = (node as unknown as { initializer?: AstNode }).initializer;
    if (initializer !== undefined) {
      this.writeOperator(" = ");
      this.emit(0, initializer);
    }
    this.writeTrailingSemicolon();
  }
  emitGetAccessor(node: AstNode): void {
    this.writeKeyword("get ");
    this.emit(0, (node as unknown as { name?: AstNode }).name);
    this.emitParameterList(node);
    const body = (node as unknown as { body?: AstNode }).body;
    if (body !== undefined) {
      this.writeSpace();
      this.emit(0, body);
    }
  }
  emitSetAccessor(node: AstNode): void {
    this.writeKeyword("set ");
    this.emit(0, (node as unknown as { name?: AstNode }).name);
    this.emitParameterList(node);
    const body = (node as unknown as { body?: AstNode }).body;
    if (body !== undefined) {
      this.writeSpace();
      this.emit(0, body);
    }
  }
  emitInterfaceDeclaration(node: AstNode): void {
    this.writeKeyword("interface ");
    this.emit(0, (node as unknown as { name?: AstNode }).name);
    this.writeSpace();
    this.writePunctuation("{");
    this.increaseIndent();
    const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes ?? [];
    for (const m of members) {
      this.writeLine();
      this.emit(0, m);
    }
    this.decreaseIndent();
    this.writeLine();
    this.writePunctuation("}");
  }
  emitTypeAliasDeclaration(node: AstNode): void {
    this.writeKeyword("type ");
    this.emit(0, (node as unknown as { name?: AstNode }).name);
    this.writeOperator(" = ");
    this.emit(0, (node as unknown as { type?: AstNode }).type);
    this.writeTrailingSemicolon();
  }
  emitEnumDeclaration(node: AstNode): void {
    this.writeKeyword("enum ");
    this.emit(0, (node as unknown as { name?: AstNode }).name);
    this.writeSpace();
    this.writePunctuation("{");
    this.increaseIndent();
    const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes ?? [];
    for (let i = 0; i < members.length; i++) {
      this.writeLine();
      this.emit(0, members[i]);
      if (i < members.length - 1) this.writePunctuation(",");
    }
    this.decreaseIndent();
    this.writeLine();
    this.writePunctuation("}");
  }
  emitEnumMember(node: AstNode): void {
    this.emit(0, (node as unknown as { name?: AstNode }).name);
    const initializer = (node as unknown as { initializer?: AstNode }).initializer;
    if (initializer !== undefined) {
      this.writeOperator(" = ");
      this.emit(0, initializer);
    }
  }
  emitModuleDeclaration(node: AstNode): void {
    this.writeKeyword("namespace ");
    this.emit(0, (node as unknown as { name?: AstNode }).name);
    const body = (node as unknown as { body?: AstNode }).body;
    if (body !== undefined) {
      this.writeSpace();
      this.emit(0, body);
    }
  }
  emitImportDeclaration(node: AstNode): void {
    this.writeKeyword("import ");
    const importClause = (node as unknown as { importClause?: AstNode }).importClause;
    if (importClause !== undefined) {
      this.emit(0, importClause);
      this.writeKeyword(" from ");
    }
    this.emit(0, (node as unknown as { moduleSpecifier?: AstNode }).moduleSpecifier);
    this.emitImportTypeNodeAttributes((node as unknown as { attributes?: AstNode }).attributes);
    this.writeTrailingSemicolon();
  }
  emitImportClause(node: AstNode): void {
    const name = (node as unknown as { name?: AstNode }).name;
    if (name !== undefined) this.emit(0, name);
    const namedBindings = (node as unknown as { namedBindings?: AstNode }).namedBindings;
    if (namedBindings !== undefined) {
      if (name !== undefined) this.writePunctuation(", ");
      this.emit(0, namedBindings);
    }
  }
  emitNamespaceImport(node: AstNode): void {
    this.writeOperator("*");
    this.writeKeyword(" as ");
    this.emit(0, (node as unknown as { name?: AstNode }).name);
  }
  emitNamedImports(node: AstNode): void {
    this.writePunctuation("{ ");
    const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes ?? [];
    for (let i = 0; i < elements.length; i++) {
      if (i > 0) this.writePunctuation(", ");
      this.emit(0, elements[i]);
    }
    this.writePunctuation(" }");
  }
  emitNamedImportBindings(node: AstNode): void {
    this.emit(0, node);
  }
  emitImportSpecifier(node: AstNode): void {
    const propertyName = (node as unknown as { propertyName?: AstNode }).propertyName;
    if (propertyName !== undefined) {
      this.emit(0, propertyName);
      this.writeKeyword(" as ");
    }
    this.emit(0, (node as unknown as { name?: AstNode }).name);
  }
  emitImportEqualsDeclaration(node: AstNode): void {
    this.writeKeyword("import ");
    this.emit(0, (node as unknown as { name?: AstNode }).name);
    this.writeOperator(" = ");
    this.emit(0, (node as unknown as { moduleReference?: AstNode }).moduleReference);
    this.writeTrailingSemicolon();
  }
  emitExternalModuleReference(node: AstNode): void {
    this.writeKeyword("require");
    this.writePunctuation("(");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writePunctuation(")");
  }
  emitExportDeclaration(node: AstNode): void {
    this.writeKeyword("export ");
    const exportClause = (node as unknown as { exportClause?: AstNode }).exportClause;
    if (exportClause !== undefined) this.emit(0, exportClause);
    else this.writePunctuation("*");
    const moduleSpecifier = (node as unknown as { moduleSpecifier?: AstNode }).moduleSpecifier;
    if (moduleSpecifier !== undefined) {
      this.writeKeyword(" from ");
      this.emit(0, moduleSpecifier);
    }
    this.emitImportTypeNodeAttributes((node as unknown as { attributes?: AstNode }).attributes);
    this.writeTrailingSemicolon();
  }
  emitExportAssignment(node: AstNode): void {
    this.writeKeyword("export ");
    const isExportEquals = (node as unknown as { isExportEquals?: boolean }).isExportEquals;
    this.writeOperator(isExportEquals === true ? "= " : "default ");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writeTrailingSemicolon();
  }
  emitNamedExports(node: AstNode): void {
    this.writePunctuation("{ ");
    const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes ?? [];
    for (let i = 0; i < elements.length; i++) {
      if (i > 0) this.writePunctuation(", ");
      this.emit(0, elements[i]);
    }
    this.writePunctuation(" }");
  }
  emitNamedExportBindings(node: AstNode): void {
    this.emit(0, node);
  }
  emitExportSpecifier(node: AstNode): void {
    const propertyName = (node as unknown as { propertyName?: AstNode }).propertyName;
    if (propertyName !== undefined) {
      this.emit(0, propertyName);
      this.writeKeyword(" as ");
    }
    this.emit(0, (node as unknown as { name?: AstNode }).name);
  }
  emitNamespaceExport(node: AstNode): void {
    this.writeOperator("*");
    this.writeKeyword(" as ");
    this.emit(0, (node as unknown as { name?: AstNode }).name);
  }
  emitNamespaceExportDeclaration(node: AstNode): void {
    this.writeKeyword("export as namespace ");
    this.emit(0, (node as unknown as { name?: AstNode }).name);
    this.writeTrailingSemicolon();
  }
  emitImportAttributes(node: AstNode): void {
    const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes ?? [];
    if (elements.length === 0) return;
    this.writeKeyword(" with ");
    this.writePunctuation("{ ");
    for (let index = 0; index < elements.length; index += 1) {
      if (index > 0) this.writePunctuation(", ");
      this.emit(0, elements[index]);
    }
    this.writePunctuation(" }");
  }
  emitImportAttribute(node: AstNode): void {
    this.emitImportAttributeName((node as unknown as { name?: AstNode }).name ?? node);
    this.writePunctuation(": ");
    this.emit(0, (node as unknown as { value?: AstNode }).value);
  }
  emitImportAttributeNode(node: AstNode): void {
    this.emitImportAttribute(node);
  }
  emitCallExpression(node: AstNode): void {
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    const qd = (node as unknown as { questionDotToken?: AstNode }).questionDotToken;
    if (qd !== undefined) this.writePunctuation("?.");
    this.writePunctuation("(");
    const args = (node as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments?.nodes ?? [];
    for (let i = 0; i < args.length; i++) {
      if (i > 0) this.writePunctuation(", ");
      this.emit(0, args[i]);
    }
    this.writePunctuation(")");
  }
  emitNewExpression(node: AstNode): void {
    this.writeKeyword("new ");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    const args = (node as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments?.nodes;
    if (args !== undefined) {
      this.writePunctuation("(");
      for (let i = 0; i < args.length; i++) {
        if (i > 0) this.writePunctuation(", ");
        this.emit(0, args[i]);
      }
      this.writePunctuation(")");
    }
  }
  emitTaggedTemplateExpression(node: AstNode): void {
    this.emit(0, (node as unknown as { tag?: AstNode }).tag);
    this.emit(0, (node as unknown as { template?: AstNode }).template);
  }
  emitObjectLiteralExpression(node: AstNode): void {
    this.writePunctuation("{");
    const props = (node as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes ?? [];
    for (let i = 0; i < props.length; i++) {
      if (i > 0) this.writePunctuation(", ");
      else this.writeSpace();
      this.emit(0, props[i]);
    }
    if (props.length > 0) this.writeSpace();
    this.writePunctuation("}");
  }
  emitPropertyAssignment(node: AstNode): void {
    this.emit(0, (node as unknown as { name?: AstNode }).name);
    const type = (node as unknown as { type?: AstNode }).type;
    if (type !== undefined) {
      this.writePunctuation(": ");
      this.emit(0, type);
    }
    this.writePunctuation(": ");
    this.emit(0, (node as unknown as { initializer?: AstNode }).initializer);
  }
  emitShorthandPropertyAssignment(node: AstNode): void {
    this.emit(0, (node as unknown as { name?: AstNode }).name);
    const initializer = (node as unknown as { objectAssignmentInitializer?: AstNode }).objectAssignmentInitializer;
    if (initializer !== undefined) {
      this.writeOperator(" = ");
      this.emit(0, initializer);
    }
  }
  emitSpreadAssignment(node: AstNode): void {
    this.writePunctuation("...");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
  }
  emitArrayLiteralExpression(node: AstNode): void {
    this.writePunctuation("[");
    const els = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes ?? [];
    for (let i = 0; i < els.length; i++) {
      if (i > 0) this.writePunctuation(", ");
      this.emit(0, els[i]);
    }
    this.writePunctuation("]");
  }
  emitPropertyAccessExpression(node: AstNode): void {
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    const qd = (node as unknown as { questionDotToken?: AstNode }).questionDotToken;
    this.writePunctuation(qd !== undefined ? "?." : ".");
    this.emit(0, (node as unknown as { name?: AstNode }).name);
  }
  emitElementAccessExpression(node: AstNode): void {
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    const qd = (node as unknown as { questionDotToken?: AstNode }).questionDotToken;
    if (qd !== undefined) this.writePunctuation("?.");
    this.writePunctuation("[");
    this.emit(0, (node as unknown as { argumentExpression?: AstNode }).argumentExpression);
    this.writePunctuation("]");
  }
  emitBinaryExpression(node: AstNode): void {
    this.emit(0, (node as unknown as { left?: AstNode }).left);
    this.writeSpace();
    const opText = (node as unknown as { operatorToken?: { text?: string } }).operatorToken?.text;
    this.writeOperator(opText ?? "=");
    this.writeSpace();
    this.emit(0, (node as unknown as { right?: AstNode }).right);
  }
  emitConditionalExpression(node: AstNode): void {
    this.emit(0, (node as unknown as { condition?: AstNode }).condition);
    this.writePunctuation(" ? ");
    this.emit(0, (node as unknown as { whenTrue?: AstNode }).whenTrue);
    this.writePunctuation(" : ");
    this.emit(0, (node as unknown as { whenFalse?: AstNode }).whenFalse);
  }
  emitPrefixUnaryExpression(node: AstNode): void {
    const opText = (node as unknown as { operatorText?: string }).operatorText;
    if (opText !== undefined) this.writeOperator(opText);
    else {
      // operator stored as Kind — render typical prefix tokens.
      const op = (node as unknown as { operator?: number }).operator;
      switch (op) {
        case Kind.PlusToken: this.writeOperator("+"); break;
        case Kind.MinusToken: this.writeOperator("-"); break;
        case Kind.TildeToken: this.writeOperator("~"); break;
        case Kind.ExclamationToken: this.writeOperator("!"); break;
        case Kind.PlusPlusToken: this.writeOperator("++"); break;
        case Kind.MinusMinusToken: this.writeOperator("--"); break;
        default: this.writeOperator("");
      }
    }
    this.emit(0, (node as unknown as { operand?: AstNode }).operand);
  }
  emitPostfixUnaryExpression(node: AstNode): void {
    this.emit(0, (node as unknown as { operand?: AstNode }).operand);
    const op = (node as unknown as { operator?: number }).operator;
    switch (op) {
      case Kind.PlusPlusToken: this.writeOperator("++"); break;
      case Kind.MinusMinusToken: this.writeOperator("--"); break;
    }
  }
  emitYieldExpression(node: AstNode): void {
    this.writeKeyword("yield");
    const asterisk = (node as unknown as { asteriskToken?: AstNode }).asteriskToken;
    if (asterisk !== undefined) this.writeOperator("*");
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) {
      this.writeSpace();
      this.emit(0, expr);
    }
  }
  emitAwaitExpression(node: AstNode): void {
    this.writeKeyword("await ");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
  }
  emitVoidExpression(node: AstNode): void {
    this.writeKeyword("void ");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
  }
  emitDeleteExpression(node: AstNode): void {
    this.writeKeyword("delete ");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
  }
  emitTypeOfExpression(node: AstNode): void {
    this.writeKeyword("typeof ");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
  }
  emitParenthesizedExpression(node: AstNode): void {
    this.writePunctuation("(");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writePunctuation(")");
  }
  emitSpreadElement(node: AstNode): void {
    this.writePunctuation("...");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
  }
  emitAsExpression(node: AstNode): void {
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writeKeyword(" as ");
    this.emit(0, (node as unknown as { type?: AstNode }).type);
  }
  emitSatisfiesExpression(node: AstNode): void {
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writeKeyword(" satisfies ");
    this.emit(0, (node as unknown as { type?: AstNode }).type);
  }
  emitNonNullExpression(node: AstNode): void {
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writePunctuation("!");
  }
  emitTypeAssertionExpression(node: AstNode): void {
    this.writePunctuation("<");
    this.emit(0, (node as unknown as { type?: AstNode }).type);
    this.writePunctuation(">");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
  }

  // Type emission
  emitTypeNode(node: AstNode): void {
    const k = (node as { kind?: number }).kind ?? 0;
    switch (k) {
      case Kind.TypeReference: return this.emitTypeReference(node);
      case Kind.TypeLiteral: return this.emitTypeLiteral(node);
      case Kind.TypePredicate: return this.emitTypePredicate(node);
      case Kind.FunctionType: return this.emitFunctionType(node);
      case Kind.ConstructorType: return this.emitConstructorType(node);
      case Kind.ArrayType: return this.emitArrayType(node);
      case Kind.TupleType: return this.emitTupleType(node);
      case Kind.UnionType: return this.emitUnionType(node);
      case Kind.IntersectionType: return this.emitIntersectionType(node);
      case Kind.ConditionalType: return this.emitConditionalType(node);
      case Kind.MappedType: return this.emitMappedType(node);
      case Kind.InferType: return this.emitInferType(node);
      case Kind.ParenthesizedType: return this.emitParenthesizedType(node);
      case Kind.LiteralType: return this.emitLiteralType(node);
      case Kind.TemplateLiteralType: return this.emitTemplateLiteralType(node);
      case Kind.ImportType: return this.emitImportType(node);
      case Kind.TypeOperator: return this.emitTypeOperator(node);
      case Kind.IndexedAccessType: return this.emitIndexedAccessType(node);
      case Kind.TypeQuery: return this.emitTypeQuery(node);
      case Kind.TypeParameter: return this.emitTypeParameter(node);
      case Kind.AnyKeyword: return this.writeKeyword("any");
      case Kind.UnknownKeyword: return this.writeKeyword("unknown");
      case Kind.NumberKeyword: return this.writeKeyword("number");
      case Kind.StringKeyword: return this.writeKeyword("string");
      case Kind.BooleanKeyword: return this.writeKeyword("boolean");
      case Kind.VoidKeyword: return this.writeKeyword("void");
      case Kind.NeverKeyword: return this.writeKeyword("never");
      case Kind.UndefinedKeyword: return this.writeKeyword("undefined");
      case Kind.NullKeyword: return this.writeKeyword("null");
      case Kind.ObjectKeyword: return this.writeKeyword("object");
      case Kind.BigIntKeyword: return this.writeKeyword("bigint");
      case Kind.SymbolKeyword: return this.writeKeyword("symbol");
      case Kind.ThisType: return this.writeKeyword("this");
    }
  }
  emitTypeReference(node: AstNode): void {
    this.emit(0, (node as unknown as { typeName?: AstNode }).typeName);
    this.emitTypeArguments(node);
  }
  private emitTypeArguments(node: AstNode): void {
    const args = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments?.nodes;
    if (args === undefined || args.length === 0) return;
    this.writePunctuation("<");
    for (let i = 0; i < args.length; i++) {
      if (i > 0) this.writePunctuation(", ");
      this.emit(0, args[i]);
    }
    this.writePunctuation(">");
  }
  emitTypeLiteral(node: AstNode): void {
    this.writePunctuation("{ ");
    const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes ?? [];
    for (let i = 0; i < members.length; i++) {
      if (i > 0) this.writePunctuation("; ");
      this.emit(0, members[i]);
    }
    this.writePunctuation(" }");
  }
  emitTypePredicate(node: AstNode): void {
    const assertsModifier = (node as unknown as { assertsModifier?: AstNode }).assertsModifier;
    if (assertsModifier !== undefined) this.writeKeyword("asserts ");
    this.emit(0, (node as unknown as { parameterName?: AstNode }).parameterName);
    const type = (node as unknown as { type?: AstNode }).type;
    if (type !== undefined) {
      this.writeKeyword(" is ");
      this.emit(0, type);
    }
  }
  emitFunctionType(node: AstNode): void {
    this.emitParameterList(node);
    this.writePunctuation(" => ");
    this.emit(0, (node as unknown as { type?: AstNode }).type);
  }
  emitConstructorType(node: AstNode): void {
    this.writeKeyword("new ");
    this.emitParameterList(node);
    this.writePunctuation(" => ");
    this.emit(0, (node as unknown as { type?: AstNode }).type);
  }
  emitArrayType(node: AstNode): void {
    this.emit(0, (node as unknown as { elementType?: AstNode }).elementType);
    this.writePunctuation("[]");
  }
  emitTupleType(node: AstNode): void {
    this.writePunctuation("[");
    const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes ?? [];
    for (let i = 0; i < elements.length; i++) {
      if (i > 0) this.writePunctuation(", ");
      this.emit(0, elements[i]);
    }
    this.writePunctuation("]");
  }
  emitUnionType(node: AstNode): void {
    const types = (node as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes ?? [];
    for (let i = 0; i < types.length; i++) {
      if (i > 0) this.writePunctuation(" | ");
      this.emit(0, types[i]);
    }
  }
  emitIntersectionType(node: AstNode): void {
    const types = (node as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes ?? [];
    for (let i = 0; i < types.length; i++) {
      if (i > 0) this.writePunctuation(" & ");
      this.emit(0, types[i]);
    }
  }
  emitConditionalType(node: AstNode): void {
    this.emit(0, (node as unknown as { checkType?: AstNode }).checkType);
    this.writeKeyword(" extends ");
    this.emit(0, (node as unknown as { extendsType?: AstNode }).extendsType);
    this.writePunctuation(" ? ");
    this.emit(0, (node as unknown as { trueType?: AstNode }).trueType);
    this.writePunctuation(" : ");
    this.emit(0, (node as unknown as { falseType?: AstNode }).falseType);
  }
  emitMappedType(node: AstNode): void {
    this.writePunctuation("{ [");
    this.emit(0, (node as unknown as { typeParameter?: AstNode }).typeParameter);
    this.writePunctuation("]");
    const questionToken = (node as unknown as { questionToken?: AstNode }).questionToken;
    if (questionToken !== undefined) this.writePunctuation("?");
    this.writePunctuation(": ");
    this.emit(0, (node as unknown as { type?: AstNode }).type);
    this.writePunctuation(" }");
  }
  emitInferType(node: AstNode): void {
    this.writeKeyword("infer ");
    this.emit(0, (node as unknown as { typeParameter?: AstNode }).typeParameter);
  }
  emitParenthesizedType(node: AstNode): void {
    this.writePunctuation("(");
    this.emit(0, (node as unknown as { type?: AstNode }).type);
    this.writePunctuation(")");
  }
  emitLiteralType(node: AstNode): void {
    this.emit(0, (node as unknown as { literal?: AstNode }).literal);
  }
  emitTemplateLiteralType(node: AstNode): void {
    const text = (node as unknown as { text?: string }).text ?? "";
    this.write(`\`${text}\``);
  }
  emitImportType(node: AstNode): void {
    this.writeKeyword("import");
    this.writePunctuation("(");
    this.emit(0, (node as unknown as { argument?: AstNode }).argument);
    this.writePunctuation(")");
    this.emitImportTypeNodeAttributes((node as unknown as { attributes?: AstNode }).attributes);
    const qualifier = (node as unknown as { qualifier?: AstNode }).qualifier;
    if (qualifier !== undefined) {
      this.writePunctuation(".");
      this.emit(0, qualifier);
    }
  }
  emitTypeOperator(node: AstNode): void {
    const op = (node as unknown as { operator?: number }).operator;
    switch (op) {
      case Kind.KeyOfKeyword: this.writeKeyword("keyof "); break;
      case Kind.UniqueKeyword: this.writeKeyword("unique "); break;
      case Kind.ReadonlyKeyword: this.writeKeyword("readonly "); break;
    }
    this.emit(0, (node as unknown as { type?: AstNode }).type);
  }
  emitIndexedAccessType(node: AstNode): void {
    this.emit(0, (node as unknown as { objectType?: AstNode }).objectType);
    this.writePunctuation("[");
    this.emit(0, (node as unknown as { indexType?: AstNode }).indexType);
    this.writePunctuation("]");
  }
  emitTypeQuery(node: AstNode): void {
    this.writeKeyword("typeof ");
    this.emit(0, (node as unknown as { exprName?: AstNode }).exprName);
  }
  emitTypeParameter(node: AstNode): void {
    this.emit(0, (node as unknown as { name?: AstNode }).name);
    const constraint = (node as unknown as { constraint?: AstNode }).constraint;
    if (constraint !== undefined) {
      this.writeKeyword(" extends ");
      this.emit(0, constraint);
    }
    const defaultType = (node as unknown as { default?: AstNode }).default;
    if (defaultType !== undefined) {
      this.writeOperator(" = ");
      this.emit(0, defaultType);
    }
  }

  // Helpers
  emitDecorator(node: AstNode): void {
    this.writePunctuation("@");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
  }
  emitModifiers(node: AstNode, modifiers: ModifierList | undefined): void {
    void node;
    if (modifiers === undefined) return;
    const list = (modifiers as unknown as { nodes?: readonly AstNode[] }).nodes ?? [];
    for (const m of list) {
      this.emit(0, m);
      this.writeSpace();
    }
  }
  emitParameter(node: AstNode): void {
    const dotDotDot = (node as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken;
    if (dotDotDot !== undefined) this.writePunctuation("...");
    this.emit(0, (node as unknown as { name?: AstNode }).name);
    const questionToken = (node as unknown as { questionToken?: AstNode }).questionToken;
    if (questionToken !== undefined) this.writePunctuation("?");
    const type = (node as unknown as { type?: AstNode }).type;
    if (type !== undefined) {
      this.writePunctuation(": ");
      this.emit(0, type);
    }
    const initializer = (node as unknown as { initializer?: AstNode }).initializer;
    if (initializer !== undefined) {
      this.writeOperator(" = ");
      this.emit(0, initializer);
    }
  }
  emitDeclarationName(node: AstNode | undefined, allowSourceMaps: boolean): void {
    void allowSourceMaps;
    if (node !== undefined) this.emit(0, node);
  }
  emitName(node: AstNode | undefined): void {
    if (node !== undefined) this.emit(0, node);
  }
  emitPropertyName(node: AstNode | undefined): void {
    if (node !== undefined) this.emit(0, node);
  }
  emitComputedPropertyName(node: AstNode): void {
    this.writePunctuation("[");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writePunctuation("]");
  }
  emitHeritageClause(node: AstNode): void {
    const token = (node as unknown as { token?: number }).token;
    this.writeKeyword(token === Kind.ExtendsKeyword ? "extends " : "implements ");
    const types = (node as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes ?? [];
    for (let i = 0; i < types.length; i++) {
      if (i > 0) this.writePunctuation(", ");
      this.emit(0, types[i]);
    }
  }
  emitSemicolon(): void {
    this.writeTrailingSemicolon();
  }
  emitStatement(node: AstNode): void {
    this.emit(0, node);
  }
  emitEmbeddedStatement(_parentNode: AstNode, node: AstNode): void {
    if (node.kind === Kind.Block) {
      this.emitBlock(node);
      return;
    }
    this.writeLine();
    this.increaseIndent();
    this.emitStatement(node);
    this.decreaseIndent();
  }
  emitHeritageClauseNode(node: AstNode): void {
    this.emitHeritageClause(node);
  }
  emitCaseOrDefaultClauseStatements(node: AstNode, colonPos = node.pos): void {
    void colonPos;
    const statements = getNodeArray((node as unknown as { statements?: unknown }).statements);
    if (statements.length === 0) return;
    this.writeLine();
    this.increaseIndent();
    for (const statement of statements) {
      this.emitStatement(statement);
      this.writeLine();
    }
    this.decreaseIndent();
  }
  emitCaseClause(node: AstNode): void {
    this.writeKeyword("case ");
    this.emit(0, (node as unknown as { expression?: AstNode }).expression);
    this.writePunctuation(":");
    this.emitCaseOrDefaultClauseStatements(node);
  }
  emitDefaultClause(node: AstNode): void {
    this.writeKeyword("default");
    this.writePunctuation(":");
    this.emitCaseOrDefaultClauseStatements(node);
  }
  emitCaseOrDefaultClauseNode(node: AstNode): void {
    if (node.kind === Kind.CaseClause) this.emitCaseClause(node);
    else this.emitDefaultClause(node);
  }
  emitCatchClause(node: AstNode): void {
    this.writeKeyword("catch");
    const variable = (node as unknown as { variableDeclaration?: AstNode }).variableDeclaration;
    if (variable !== undefined) {
      this.writeSpace();
      this.writePunctuation("(");
      this.emit(0, variable);
      this.writePunctuation(")");
    }
    this.writeSpace();
    this.emitBlock((node as unknown as { block?: AstNode }).block ?? node);
  }
  emitShebangIfNeeded(node: SourceFile): void {
    const text = (node as unknown as { text?: string }).text ?? "";
    if (!text.startsWith("#!")) return;
    const end = text.indexOf("\n");
    this.writeComment(end === -1 ? text : text.slice(0, end));
    this.writeLine();
  }
  emitPrologueDirectives(statements: NodeList | undefined): number {
    const nodes = getNodeArray(statements);
    let index = 0;
    for (; index < nodes.length; index += 1) {
      const statement = nodes[index]!;
      const expression = (statement as unknown as { expression?: AstNode }).expression;
      if (statement.kind !== Kind.ExpressionStatement || expression?.kind !== Kind.StringLiteral) break;
      if (index > 0) this.writeLine();
      this.emitExpressionStatement(statement);
    }
    return index;
  }
  emitHelpers(node: AstNode): boolean {
    const helpers = this.emitContext.getEmitHelpers?.(node) ?? [];
    for (const helper of helpers) {
      const text = (helper as unknown as { readonly text?: string; readonly name?: string }).text
        ?? (helper as unknown as { readonly name?: string }).name;
      if (text !== undefined && text.length > 0) {
        this.write(text);
        this.writeLine();
      }
    }
    return helpers.length > 0;
  }
  emitTripleSlashDirectives(node: SourceFile): void {
    for (const directive of (node as unknown as { readonly referencedFiles?: readonly FileReference[] }).referencedFiles ?? []) {
      this.emitDirective("reference", [directive]);
    }
    for (const directive of (node as unknown as { readonly typeReferenceDirectives?: readonly FileReference[] }).typeReferenceDirectives ?? []) {
      this.emitDirective("types", [directive]);
    }
    for (const directive of (node as unknown as { readonly libReferenceDirectives?: readonly FileReference[] }).libReferenceDirectives ?? []) {
      this.emitDirective("lib", [directive]);
    }
  }
  emitDirective(kind: string, refs: readonly FileReference[]): void {
    for (const ref of refs) {
      const fileName = ref.fileName ?? ref.path;
      if (fileName === undefined) continue;
      const attribute = kind === "reference" ? "path" : kind;
      this.writeComment(`/// <reference ${attribute}="${fileName}" />`);
      this.writeLine();
    }
  }
  emitImportTypeNodeAttributes(node: AstNode | undefined): void {
    if (node !== undefined) this.emitImportAttributes(node);
  }
  emitJSDocNode(node: AstNode): void {
    throw new Error(`JSDoc emit is not implemented for node kind ${node.kind}`);
  }
  emitCommentsBeforeNode(node: AstNode): CommentState {
    const state = { ...this.state.comments };
    this.emitLeadingSyntheticCommentsOfNode(node, this.emitContext.emitFlags?.(node) ?? EmitFlags.None);
    return state;
  }
  emitCommentsAfterNode(node: AstNode, state: CommentState): void {
    void state;
    this.emitTrailingSyntheticCommentsOfNode(node, this.emitContext.emitFlags?.(node) ?? EmitFlags.None);
  }
  emitLeadingSyntheticCommentsOfNode(node: AstNode, emitFlags: number): void {
    if ((emitFlags & (EmitFlags.NoLeadingComments | EmitFlags.NoComments)) !== 0) return;
    for (const comment of this.emitContext.getSyntheticLeadingComments?.(node) ?? []) {
      this.emitLeadingSynthesizedComment(comment);
    }
  }
  emitLeadingSynthesizedComment(comment: SynthesizedComment): void {
    this.writeSynthesizedComment(comment);
    if (this.syntheticCommentWillEmitNewLine(comment)) this.writeLine();
  }
  emitTrailingSyntheticCommentsOfNode(node: AstNode, emitFlags: number): void {
    if ((emitFlags & (EmitFlags.NoTrailingComments | EmitFlags.NoComments)) !== 0) return;
    for (const comment of this.emitContext.getSyntheticTrailingComments?.(node) ?? []) {
      this.emitTrailingSynthesizedComment(comment);
    }
  }
  emitTrailingSynthesizedComment(comment: SynthesizedComment): void {
    this.writeSynthesizedComment(comment);
    if (this.syntheticCommentWillEmitNewLine(comment)) this.writeLine();
  }
  writeSynthesizedComment(comment: SynthesizedComment): void {
    this.writeComment(formatSynthesizedComment(comment));
  }
  syntheticCommentWillEmitNewLine(comment: SynthesizedComment): boolean {
    return comment.hasTrailingNewLine === true || comment.text.includes("\n");
  }
  emitSourceMapsBeforeNode(node: AstNode): SourceMapState {
    const previous = { ...this.state.sourceMap };
    if (this.shouldEmitSourceMaps(node)) {
      this.state.sourceMap.lastEmittedNodePos = node.pos;
      this.state.sourceMap.lastEmittedNodeEnd = node.end;
    }
    return previous;
  }
  emitSourceMapsAfterNode(node: AstNode, previousState: SourceMapState): void {
    void node;
    this.state.sourceMap = previousState;
  }
  emitSourceMapsBeforeToken(token: number, pos: number, contextNode: AstNode, flags: number): SourceMapState {
    void token; void flags;
    const previous = { ...this.state.sourceMap };
    if (this.shouldEmitSourceMaps(contextNode)) {
      this.state.sourceMap.lastEmittedNodePos = pos;
      this.state.sourceMap.lastEmittedNodeEnd = pos;
    }
    return previous;
  }
  emitSourceMapsAfterToken(token: number, pos: number, contextNode: AstNode, previousState: SourceMapState): void {
    void token; void pos; void contextNode;
    this.state.sourceMap = previousState;
  }
  shouldReuseTempVariableScope(node: AstNode): boolean {
    return ((this.emitContext.emitFlags?.(node) ?? 0) & EmitFlags.ReuseTempVariableScope) !== 0;
  }
  pushNameGenerationScope(node: AstNode): void {
    this.nameGenerator.pushScope(this.shouldReuseTempVariableScope(node));
  }
  popNameGenerationScope(node: AstNode): void {
    this.nameGenerator.popScope(this.shouldReuseTempVariableScope(node));
  }
  generateAllNames(nodes: NodeList | undefined): void {
    for (const node of getNodeArray(nodes)) this.generateNames(node);
  }
  generateNames(node: AstNode): void {
    const name = (node as unknown as { readonly name?: AstNode }).name;
    if (name !== undefined) this.generateNameIfNeeded(name);
  }
  generateAllMemberNames(nodes: NodeList | undefined): void {
    for (const node of getNodeArray(nodes)) this.generateMemberNames(node);
  }
  generateMemberNames(node: AstNode): void {
    const name = (node as unknown as { readonly name?: AstNode }).name;
    if (name !== undefined) this.generateName(name);
  }
  generateNameIfNeeded(name: AstNode): void {
    this.generateName(name);
  }
  generateName(name: AstNode): void {
    const info = this.emitContext.getAutoGenerateInfo?.(name) as AutoGenerateInfo | undefined;
    if (info === undefined) return;
    const generated = info.nodeForGeneratedName === undefined
      ? this.nameGenerator.generateName(info.flags, info.prefix, info.suffix)
      : this.nameGenerator.generateNameForNode(info.nodeForGeneratedName, info.flags, info.prefix, info.suffix);
    (name as unknown as { text?: string }).text = generated;
  }
  isFileLevelUniqueNameInCurrentFile(name: string, optimistic: boolean): boolean {
    void optimistic;
    return this.handlers.hasGlobalName?.(name) !== true;
  }

  // -------------------------------------------------------------------------
  // High-level entry: print a whole SourceFile to a text writer.
  // Mirrors ts-go `(*Printer).printFile`.
  // -------------------------------------------------------------------------

  /**
   * Renders the given SourceFile through the emit pipeline and returns
   * the accumulated text. Allocates an internal TextWriter if no
   * writer has been attached. The result includes a trailing newline
   * when `emitTrailingNewlines` is enabled.
   */
  printFile(sourceFile: SourceFile): string {
    const previousWriter = this.state.writer;
    const previousSourceFile = this.currentSourceFile;
    const writer = previousWriter ?? createStringPrinterWriter();
    this.state.writer = writer;
    this.currentSourceFile = sourceFile;
    const statements = (sourceFile as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes ?? [];
    for (let i = 0; i < statements.length; i++) {
      if (i > 0) this.writeLine();
      this.emit(0, statements[i]);
    }
    if (this.options.emitTrailingNewlines !== false) {
      this.writeLine();
    }
    const text = getStringPrinterText(writer);
    this.state.writer = previousWriter;
    this.currentSourceFile = previousSourceFile;
    return text;
  }

  printNode(node: AstNode, sourceFile: SourceFile | undefined = undefined): string {
    const previousWriter = this.state.writer;
    const previousSourceFile = this.currentSourceFile;
    const writer = createStringPrinterWriter();
    this.state.writer = writer;
    this.currentSourceFile = sourceFile;
    this.emit(0, node);
    const text = writer.getText();
    this.state.writer = previousWriter;
    this.currentSourceFile = previousSourceFile;
    return text;
  }

  enterNode(node: AstNode): PrinterFrameState {
    this.handlers.onBeforeEmitNode?.(node);
    return {
      commentState: this.emitCommentsBeforeNode(node),
      sourceMapState: this.emitSourceMapsBeforeNode(node),
    };
  }
  exitNode(node: AstNode, previousState: PrinterFrameState): void {
    if (previousState.sourceMapState !== undefined) this.emitSourceMapsAfterNode(node, previousState.sourceMapState);
    if (previousState.commentState !== undefined) this.emitCommentsAfterNode(node, previousState.commentState);
    this.handlers.onAfterEmitNode?.(node);
  }
  enterTokenNode(node: AstNode, flags: TokenEmitFlags = TokenEmitFlags.None): PrinterFrameState {
    this.handlers.onBeforeEmitToken?.(node);
    return {
      commentState: (flags & TokenEmitFlags.NoComments) === 0 ? this.emitCommentsBeforeNode(node) : undefined,
      sourceMapState: (flags & TokenEmitFlags.NoSourceMaps) === 0 ? this.emitSourceMapsBeforeNode(node) : undefined,
    };
  }
  exitTokenNode(node: AstNode, previousState: PrinterFrameState): void {
    this.exitNode(node, previousState);
    this.handlers.onAfterEmitToken?.(node);
  }
  enterToken(token: number, pos: number, contextNode: AstNode, flags: TokenEmitFlags = TokenEmitFlags.None): { state: PrinterFrameState; pos: number } {
    const commentResult = this.emitCommentsBeforeToken(token, pos, contextNode, flags);
    return {
      state: {
        commentState: commentResult.state,
        sourceMapState: (flags & TokenEmitFlags.NoSourceMaps) === 0 ? this.emitSourceMapsBeforeToken(token, commentResult.pos, contextNode, flags) : undefined,
      },
      pos: commentResult.pos,
    };
  }
  exitToken(token: number, pos: number, contextNode: AstNode, previousState: PrinterFrameState): void {
    if (previousState.sourceMapState !== undefined) this.emitSourceMapsAfterToken(token, pos, contextNode, previousState.sourceMapState);
    if (previousState.commentState !== undefined) this.emitCommentsAfterToken(token, pos, contextNode, previousState.commentState);
  }
  emitCommentsBeforeToken(token: number, pos: number, contextNode: AstNode, flags: TokenEmitFlags = TokenEmitFlags.None): { state: CommentState | undefined; pos: number } {
    void token;
    if ((flags & TokenEmitFlags.NoComments) !== 0 || this.options.removeComments === true) {
      return { state: undefined, pos: this.skipTriviaAt(pos) };
    }
    return { state: this.emitCommentsBeforeNode(contextNode), pos: this.skipTriviaAt(pos) };
  }
  emitCommentsAfterToken(token: number, pos: number, contextNode: AstNode, state: CommentState): void {
    void token; void pos;
    this.emitCommentsAfterNode(contextNode, state);
  }
  emitDetachedCommentsBeforeStatementList(node: AstNode, detachedRange: TextRange): CommentState | undefined {
    void detachedRange;
    if (!this.shouldEmitDetachedComments(node)) return undefined;
    return this.emitCommentsBeforeNode(node);
  }
  emitDetachedCommentsAfterStatementList(node: AstNode, detachedRange: TextRange, state: CommentState | undefined): void {
    void detachedRange;
    if (state !== undefined) this.emitCommentsAfterNode(node, state);
  }
  emitLeadingCommentsOfNode(node: AstNode, emitFlags: number): void {
    this.emitLeadingSyntheticCommentsOfNode(node, emitFlags);
  }
  emitTrailingCommentsOfNode(node: AstNode, emitFlags: number): void {
    this.emitTrailingSyntheticCommentsOfNode(node, emitFlags);
  }
  shouldEmitCommentIfTripleSlash(comment: CommentRange, tripleSlash: boolean | undefined): boolean {
    if (tripleSlash === undefined) return true;
    return this.isTripleSlashComment(comment) === tripleSlash;
  }
  shouldEmitNewLineBeforeLeadingCommentOfPosition(pos: number, commentPos: number): boolean {
    const text = (this.currentSourceFile as unknown as { text?: string })?.text;
    if (text === undefined || pos === commentPos) return false;
    return lineOfPosition(text, pos) !== lineOfPosition(text, commentPos);
  }
  emitLeadingCommentsOfPosition(pos: number): void {
    if (this.options.removeComments === true || pos < 0) return;
    this.emitSourceCommentAt(pos, true);
  }
  emitTrailingCommentsOfPosition(pos: number, prefixSpace: boolean, forceNoNewline: boolean): void {
    if (this.options.removeComments === true || pos < 0) return;
    if (prefixSpace) this.writeSpace();
    this.emitSourceCommentAt(pos, forceNoNewline);
  }
  emitDetachedCommentsAndUpdateCommentsInfo(textRange: TextRange): void {
    this.state.detachedComments.push({ nodePos: textRange.pos, detachedCommentEndPos: textRange.end });
  }
  emitComments(comments: readonly CommentRange[], commentSeparator: number): boolean {
    if (comments.length === 0) return false;
    if (commentSeparator === 1) this.writeSpace();
    for (let index = 0; index < comments.length; index += 1) {
      const comment = comments[index];
      if (comment === undefined) continue;
      if (index > 0) this.writeSpace();
      this.emitComment(comment);
      if (comment.kind === Kind.SingleLineCommentTrivia || comment.hasTrailingNewLine === true) this.writeLine();
    }
    if (commentSeparator === 2) this.writeSpace();
    return true;
  }
  emitComment(comment: CommentRange): void {
    this.emitPos(comment.pos);
    this.writeCommentRange(comment);
    this.emitPos(comment.end);
  }
  isTripleSlashComment(comment: CommentRange): boolean {
    const text = (this.currentSourceFile as unknown as { text?: string })?.text;
    return text?.startsWith("///", comment.pos) === true;
  }
  setSourceMapSource(source: SourceFile | undefined): void {
    this.currentSourceFile = source;
  }
  emitPos(pos: number): void {
    if (this.options.sourceMap !== true || pos < 0) return;
    this.state.sourceMap.lastEmittedNodePos = pos;
    this.state.sourceMap.lastEmittedNodeEnd = pos;
  }
  emitPosName(pos: number, name: string): void {
    void name;
    this.emitPos(pos);
  }
  emitSourcePos(source: SourceFile | undefined, pos: number): void {
    const previousSourceFile = this.currentSourceFile;
    this.setSourceMapSource(source);
    this.emitPos(pos);
    this.currentSourceFile = previousSourceFile;
  }
  emitSourcePosName(source: SourceFile | undefined, pos: number, name: string): void {
    void name;
    this.emitSourcePos(source, pos);
  }
  private skipTriviaAt(pos: number): number {
    const text = (this.currentSourceFile as unknown as { text?: string })?.text;
    if (text === undefined || pos < 0) return pos;
    let current = pos;
    while (current < text.length) {
      const code = text.charCodeAt(current);
      if (code !== 0x20 && code !== 0x09 && code !== 0x0a && code !== 0x0d) break;
      current += 1;
    }
    return current;
  }
  private emitSourceCommentAt(pos: number, forceNoNewline: boolean): void {
    const text = (this.currentSourceFile as unknown as { text?: string })?.text;
    if (text === undefined) return;
    if (text.startsWith("//", pos)) {
      const end = text.indexOf("\n", pos);
      this.writeComment(text.slice(pos, end < 0 ? text.length : end));
      if (forceNoNewline || end >= 0) this.writeLine();
      return;
    }
    if (text.startsWith("/*", pos)) {
      const close = text.indexOf("*/", pos + 2);
      const end = close < 0 ? text.length : close + 2;
      this.writeComment(text.slice(pos, end));
      if (forceNoNewline || /\r|\n/u.test(text.slice(pos, end))) this.writeLine();
    }
  }
}

function createStringPrinterWriter(): StringPrinterWriter {
  let buffer = "";
  let indent = 0;
  let lineStart = true;
  const indentSize = 4;
  return {
    write(text: string): void {
      if (lineStart) {
        buffer += " ".repeat(indent * indentSize);
        lineStart = false;
      }
      buffer += text;
    },
    writeLine(): void {
      buffer += "\n";
      lineStart = true;
    },
    increaseIndent(): void {
      indent += 1;
    },
    decreaseIndent(): void {
      indent = Math.max(0, indent - 1);
    },
    getText(): string {
      return buffer;
    },
  };
}

function getStringPrinterText(writer: PrinterWriter): string {
  const stringWriter = writer as Partial<StringPrinterWriter>;
  return typeof stringWriter.getText === "function" ? stringWriter.getText() : "";
}

function lineOfPosition(text: string, position: number): number {
  let line = 0;
  for (let index = 0; index < Math.min(position, text.length); index += 1) {
    if (text.charCodeAt(index) === 0x0a) line += 1;
  }
  return line;
}

// ---------------------------------------------------------------------------
// Module-level entry
// ---------------------------------------------------------------------------

export function newPrinter(options: PrinterOptions, handlers: PrintHandlers, emitContext: EmitContext): Printer {
  return new Printer(options, handlers, emitContext);
}

export function NewPrinter(options: PrinterOptions, handlers: PrintHandlers = {}, emitContext: EmitContext = {}): Printer {
  return newPrinter(options, handlers, emitContext);
}

export function nodeToInlineStr(node: AstNode): string {
  return nodeToStr(node, { removeComments: true, emitTrailingNewlines: false });
}

export function nodeToStr(node: AstNode, options: PrinterOptions = {}): string {
  const printer = NewPrinter(options);
  const sourceFile = node.kind === Kind.SourceFile ? node as SourceFile : undefined;
  if (sourceFile !== undefined) return printer.printFile(sourceFile);
  return printer.printNode(node);
}

export function emitKeywordTypeNode(printer: Printer, node: AstNode): void { printer.writeKeyword(keywordText(node.kind) ?? "unknown"); }
export function emitTypePredicateParameterName(printer: Printer, node: AstNode): void { printer.emit(0, (node as { parameterName?: AstNode }).parameterName); }
export function emitTypeArgument(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitReturnType(printer: Printer, node: AstNode | undefined): void { if (node !== undefined) { printer.writePunctuation(":"); printer.writeSpace(); printer.emit(0, node); } }
export function emitPostfixTypeOperand(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitTupleElementType(printer: Printer, node: AstNode): void { printer.emit(0, (node as { type?: AstNode }).type ?? node); }
export function emitRestType(printer: Printer, node: AstNode): void { printer.writePunctuation("..."); printer.emit(0, (node as { type?: AstNode }).type ?? node); }
export function emitOptionalType(printer: Printer, node: AstNode): void { printer.emit(0, (node as { type?: AstNode }).type ?? node); printer.writePunctuation("?"); }
export function emitNamedTupleMember(printer: Printer, node: AstNode): void { printer.emit(0, (node as { name?: AstNode }).name); if ((node as { questionToken?: AstNode }).questionToken !== undefined) printer.writePunctuation("?"); emitReturnType(printer, (node as { type?: AstNode }).type); }
export function emitUnionTypeConstituent(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitIntersectionTypeConstituent(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitInferTypeParameter(printer: Printer, node: AstNode): void { printer.writeKeyword("infer"); printer.writeSpace(); printer.emit(0, node); }
export function emitThisType(printer: Printer): void { printer.writeKeyword("this"); }
export function emitMappedTypeParameter(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitTemplateTypeSpan(printer: Printer, node: AstNode): void { printer.writePunctuation("${"); printer.emit(0, (node as { type?: AstNode }).type); printer.writePunctuation("}"); printer.emit(0, (node as { literal?: AstNode }).literal); }
export function emitTemplateTypeSpanNode(printer: Printer, node: AstNode): void { emitTemplateTypeSpan(printer, node); }
export function emitTemplateType(printer: Printer, node: AstNode): void { printer.emit(0, (node as { head?: AstNode }).head); for (const span of getNodeArray((node as { templateSpans?: unknown }).templateSpans)) emitTemplateTypeSpan(printer, span); }
export function emitImportTypeNode(printer: Printer, node: AstNode): void { printer.writeKeyword("import"); printer.writePunctuation("("); printer.emit(0, (node as { argument?: AstNode }).argument); printer.writePunctuation(")"); }
export function emitTypeNodeInExtends(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitTypeNodeOutsideExtends(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitTypeNodePreservingExtends(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitJSDocAllType(printer: Printer): void { printer.writePunctuation("*"); }
export function emitJSDocNonNullableType(printer: Printer, node: AstNode): void { printer.writePunctuation("!"); printer.emit(0, (node as { type?: AstNode }).type); }
export function emitJSDocNullableType(printer: Printer, node: AstNode): void { printer.writePunctuation("?"); printer.emit(0, (node as { type?: AstNode }).type); }
export function emitJSDocOptionalType(printer: Printer, node: AstNode): void { printer.emit(0, (node as { type?: AstNode }).type); printer.writePunctuation("="); }
export function emitJSDocVariadicType(printer: Printer, node: AstNode): void { printer.writePunctuation("..."); printer.emit(0, (node as { type?: AstNode }).type); }
export function emitKeywordExpression(printer: Printer, node: AstNode): void { printer.writeKeyword(keywordText(node.kind) ?? "undefined"); }
export function emitArrayLiteralExpressionElement(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function mayNeedDotDotForPropertyAccess(node: AstNode): boolean { return node.kind === Kind.NumericLiteral; }
export function emitArgument(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitCallee(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitConciseBody(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function getLiteralKindOfBinaryPlusOperand(node: AstNode): Kind | undefined { return node.kind === Kind.StringLiteral || node.kind === Kind.NumericLiteral ? node.kind : undefined; }
export function getBinaryExpressionPrecedence(node: AstNode): number { return binaryPrecedence((node as { operatorToken?: { kind?: Kind } }).operatorToken?.kind); }
export function emitShortCircuitExpression(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitOmittedExpression(_printer: Printer): void { /* omitted expressions intentionally write nothing */ }
export function emitExpressionWithTypeArguments(printer: Printer, node: AstNode): void { printer.emit(0, (node as { expression?: AstNode }).expression); const typeArguments = getNodeArray((node as { typeArguments?: unknown }).typeArguments); if (typeArguments.length > 0) { printer.writePunctuation("<"); typeArguments.forEach((arg, index) => { if (index > 0) printer.writePunctuation(","); printer.emit(0, arg); }); printer.writePunctuation(">"); } }
export function emitExpressionWithTypeArgumentsNode(printer: Printer, node: AstNode): void { emitExpressionWithTypeArguments(printer, node); }
export function emitMetaProperty(printer: Printer, node: AstNode): void { printer.emit(0, (node as { keywordToken?: AstNode }).keywordToken); printer.writePunctuation("."); printer.emit(0, (node as { name?: AstNode }).name); }
export function emitPartiallyEmittedExpression(printer: Printer, node: AstNode): void { printer.emit(0, (node as { expression?: AstNode }).expression); }
export function commentWillEmitNewLine(comment: CommentRange): boolean { return /\r|\n/u.test((comment as { text?: string }).text ?? ""); }
export function willEmitLeadingNewLine(node: AstNode): boolean { return ((node as { pos?: number }).pos ?? 0) >= 0; }
export function parenthesizeExpressionForNoAsi(node: AstNode): AstNode { return node; }
export function emitExpressionNoASI(printer: Printer, node: AstNode): void { printer.emit(0, parenthesizeExpressionForNoAsi(node)); }
export function emitExpression(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitTemplateSpanNode(printer: Printer, node: AstNode): void { printer.emit(0, (node as { expression?: AstNode }).expression); printer.emit(0, (node as { literal?: AstNode }).literal); }
export function emitSemicolonClassElement(printer: Printer): void { printer.writeTrailingSemicolon(); }
export function isEmptyBlock(node: AstNode): boolean { return getNodeArray((node as { statements?: unknown }).statements).length === 0; }
export function emitEmptyStatement(printer: Printer): void { printer.writeTrailingSemicolon(); }
export function emitIIFEWithParenthesizedCallee(printer: Printer, node: AstNode): void { printer.writePunctuation("("); printer.emit(0, (node as { expression?: AstNode }).expression); printer.writePunctuation(")"); }
export function emitWhileClause(printer: Printer, node: AstNode): void { printer.writeKeyword("while"); printer.writeSpace(); printer.writePunctuation("("); printer.emit(0, (node as { expression?: AstNode }).expression); printer.writePunctuation(")"); }
export function emitForInitializer(printer: Printer, node: AstNode | undefined): void { printer.emit(0, node); }
export function emitVariableDeclarationNode(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitVariableDeclarationList(printer: Printer, node: AstNode): void { getNodeArray((node as { declarations?: unknown }).declarations).forEach((decl, index) => { if (index > 0) printer.writePunctuation(","); printer.emit(0, decl); }); }
export function emitCaseBlock(printer: Printer, node: AstNode): void { printer.writePunctuation("{"); printer.writeLine(); printer.increaseIndent(); getNodeArray((node as { clauses?: unknown }).clauses).forEach(clause => printer.emit(0, clause)); printer.decreaseIndent(); printer.writePunctuation("}"); }
export function emitModuleReference(printer: Printer, node: AstNode): void { printer.emit(0, node); }
export function emitImportSpecifierNode(printer: Printer, node: AstNode): void { printer.emit(0, (node as { propertyName?: AstNode }).propertyName); if ((node as { propertyName?: AstNode }).propertyName !== undefined) { printer.writeSpace(); printer.writeKeyword("as"); printer.writeSpace(); } printer.emit(0, (node as { name?: AstNode }).name); }
export function emitExportSpecifierNode(printer: Printer, node: AstNode): void { emitImportSpecifierNode(printer, node); }
export function emitJsxAttributes(printer: Printer, node: AstNode): void { getNodeArray((node as { properties?: unknown }).properties).forEach(attr => { printer.writeSpace(); printer.emit(0, attr); }); }
export function emitEnumMemberNode(printer: Printer, node: AstNode): void { printer.emit(0, (node as { name?: AstNode }).name); const initializer = (node as { initializer?: AstNode }).initializer; if (initializer !== undefined) { printer.writeSpace(); printer.writeOperator("="); printer.writeSpace(); printer.emit(0, initializer); } }
export function EmitSourceFile(printer: Printer, sourceFile: SourceFile): string { return printer.printFile(sourceFile); }
export function setSourceFile(printer: Printer, sourceFile: SourceFile | undefined): void { printer.currentSourceFile = sourceFile; }
export function emitCommentsBeforeToken(printer: Printer, token: number, pos: number, contextNode: AstNode, flags: TokenEmitFlags = TokenEmitFlags.None): { state: CommentState | undefined; pos: number } { return printer.emitCommentsBeforeToken(token, pos, contextNode, flags); }
export function emitCommentsAfterToken(printer: Printer, token: number, pos: number, contextNode: AstNode, state: CommentState): void { printer.emitCommentsAfterToken(token, pos, contextNode, state); }
export function emitDetachedCommentsBeforeStatementList(printer: Printer, node: AstNode, detachedRange: TextRange): CommentState | undefined { return printer.emitDetachedCommentsBeforeStatementList(node, detachedRange); }
export function emitDetachedCommentsAfterStatementList(printer: Printer, node: AstNode, detachedRange: TextRange, state: CommentState | undefined): void { printer.emitDetachedCommentsAfterStatementList(node, detachedRange, state); }
export function emitLeadingCommentsOfNode(printer: Printer, node: AstNode, emitFlags: number): void { printer.emitLeadingCommentsOfNode(node, emitFlags); }
export function emitTrailingCommentsOfNode(printer: Printer, node: AstNode, emitFlags: number): void { printer.emitTrailingCommentsOfNode(node, emitFlags); }
export function shouldEmitCommentIfTripleSlash(printer: Printer, comment: CommentRange, tripleSlash: boolean | undefined): boolean { return printer.shouldEmitCommentIfTripleSlash(comment, tripleSlash); }
export function shouldEmitNewLineBeforeLeadingCommentOfPosition(printer: Printer, pos: number, commentPos: number): boolean { return printer.shouldEmitNewLineBeforeLeadingCommentOfPosition(pos, commentPos); }
export function emitLeadingCommentsOfPosition(printer: Printer, pos: number): void { printer.emitLeadingCommentsOfPosition(pos); }
export function emitTrailingCommentsOfPosition(printer: Printer, pos: number, prefixSpace = false, forceNoNewline = false): void { printer.emitTrailingCommentsOfPosition(pos, prefixSpace, forceNoNewline); }
export function emitDetachedCommentsAndUpdateCommentsInfo(printer: Printer, textRange: TextRange): void { printer.emitDetachedCommentsAndUpdateCommentsInfo(textRange); }
export function emitComments(printer: Printer, comments: readonly CommentRange[], commentSeparator: number): boolean { return printer.emitComments(comments, commentSeparator); }
export function emitComment(printer: Printer, comment: CommentRange): void { printer.emitComment(comment); }
export function isTripleSlashComment(printer: Printer, comment: CommentRange): boolean { return printer.isTripleSlashComment(comment); }
export function setSourceMapSource(printer: Printer, source: SourceFile | undefined): void { printer.setSourceMapSource(source); }
export function emitPos(printer: Printer, pos: number): void { printer.emitPos(pos); }
export function emitPosName(printer: Printer, pos: number, name: string): void { printer.emitPosName(pos, name); }
export function emitSourcePos(printer: Printer, source: SourceFile | undefined, pos: number): void { printer.emitSourcePos(source, pos); }
export function emitSourcePosName(printer: Printer, source: SourceFile | undefined, pos: number, name: string): void { printer.emitSourcePosName(source, pos, name); }
export function enterNode(printer: Printer, node: AstNode): PrinterFrameState { return printer.enterNode(node); }
export function exitNode(printer: Printer, node: AstNode, previousState: PrinterFrameState): void { printer.exitNode(node, previousState); }
export function enterTokenNode(printer: Printer, node: AstNode, flags: TokenEmitFlags = TokenEmitFlags.None): PrinterFrameState { return printer.enterTokenNode(node, flags); }
export function exitTokenNode(printer: Printer, node: AstNode, previousState: PrinterFrameState): void { printer.exitTokenNode(node, previousState); }
export function enterToken(printer: Printer, token: number, pos: number, contextNode: AstNode, flags: TokenEmitFlags = TokenEmitFlags.None): { state: PrinterFrameState; pos: number } { return printer.enterToken(token, pos, contextNode, flags); }
export function exitToken(printer: Printer, token: number, pos: number, contextNode: AstNode, previousState: PrinterFrameState): void { printer.exitToken(token, pos, contextNode, previousState); }

function keywordText(kind: Kind): string | undefined {
  return kind >= Kind.FirstKeyword && kind <= Kind.LastKeyword ? Kind[kind]?.replace(/Keyword$/u, "").toLowerCase() : undefined;
}

function binaryPrecedence(kind: Kind | undefined): number {
  switch (kind) {
    case Kind.AsteriskToken:
    case Kind.SlashToken:
    case Kind.PercentToken:
      return 13;
    case Kind.PlusToken:
    case Kind.MinusToken:
      return 12;
    case Kind.LessThanToken:
    case Kind.GreaterThanToken:
      return 10;
    case Kind.EqualsEqualsToken:
    case Kind.EqualsEqualsEqualsToken:
    case Kind.ExclamationEqualsToken:
    case Kind.ExclamationEqualsEqualsToken:
      return 9;
    case Kind.AmpersandAmpersandToken:
      return 5;
    case Kind.BarBarToken:
    case Kind.QuestionQuestionToken:
      return 4;
    default:
      return 0;
  }
}

/**
 * Module-level convenience: instantiate a Printer with default options
 * and render the SourceFile to a string. Used by the compiler emitter.
 */
export function printFile(
  sourceFile: SourceFile,
  options: PrinterOptions = {},
  handlers: PrintHandlers = {},
  emitContext: EmitContext = {} as EmitContext,
): string {
  const printer = new Printer(options, handlers, emitContext);
  return printer.printFile(sourceFile);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface EmitContext {
  readonly _ec?: unknown;
  getEmitHelpers?(node: AstNode): readonly AstNode[];
  emitFlags?(node: AstNode): number;
  getAutoGenerateInfo?(node: AstNode): unknown;
  getSyntheticLeadingComments?(node: AstNode): readonly SynthesizedComment[];
  getSyntheticTrailingComments?(node: AstNode): readonly SynthesizedComment[];
}

interface SynthesizedComment {
  readonly kind?: number;
  readonly text: string;
  readonly hasTrailingNewLine?: boolean;
}

interface FileReference {
  readonly fileName?: string;
  readonly path?: string;
}

interface AutoGenerateInfo {
  readonly flags: number;
  readonly prefix: string;
  readonly suffix: string;
  readonly nodeForGeneratedName?: AstNode;
}

/**
 * Maps a Kind value to its canonical source-text representation.
 * Returns undefined for tokens whose text is content-bearing (identifier,
 * numeric literal, etc.) — callers should slice the source text in
 * those cases.
 */
function printerTokenToString(token: number): string | undefined {
  switch (token) {
    case Kind.OpenBraceToken: return "{";
    case Kind.CloseBraceToken: return "}";
    case Kind.OpenParenToken: return "(";
    case Kind.CloseParenToken: return ")";
    case Kind.OpenBracketToken: return "[";
    case Kind.CloseBracketToken: return "]";
    case Kind.DotToken: return ".";
    case Kind.DotDotDotToken: return "...";
    case Kind.SemicolonToken: return ";";
    case Kind.CommaToken: return ",";
    case Kind.QuestionDotToken: return "?.";
    case Kind.LessThanToken: return "<";
    case Kind.LessThanSlashToken: return "</";
    case Kind.GreaterThanToken: return ">";
    case Kind.LessThanEqualsToken: return "<=";
    case Kind.GreaterThanEqualsToken: return ">=";
    case Kind.EqualsEqualsToken: return "==";
    case Kind.ExclamationEqualsToken: return "!=";
    case Kind.EqualsEqualsEqualsToken: return "===";
    case Kind.ExclamationEqualsEqualsToken: return "!==";
    case Kind.EqualsGreaterThanToken: return "=>";
    case Kind.PlusToken: return "+";
    case Kind.MinusToken: return "-";
    case Kind.AsteriskToken: return "*";
    case Kind.AsteriskAsteriskToken: return "**";
    case Kind.SlashToken: return "/";
    case Kind.PercentToken: return "%";
    case Kind.PlusPlusToken: return "++";
    case Kind.MinusMinusToken: return "--";
    case Kind.LessThanLessThanToken: return "<<";
    case Kind.GreaterThanGreaterThanToken: return ">>";
    case Kind.GreaterThanGreaterThanGreaterThanToken: return ">>>";
    case Kind.AmpersandToken: return "&";
    case Kind.BarToken: return "|";
    case Kind.CaretToken: return "^";
    case Kind.ExclamationToken: return "!";
    case Kind.TildeToken: return "~";
    case Kind.AmpersandAmpersandToken: return "&&";
    case Kind.BarBarToken: return "||";
    case Kind.QuestionToken: return "?";
    case Kind.ColonToken: return ":";
    case Kind.AtToken: return "@";
    case Kind.QuestionQuestionToken: return "??";
    case Kind.EqualsToken: return "=";
    case Kind.PlusEqualsToken: return "+=";
    case Kind.MinusEqualsToken: return "-=";
    case Kind.AsteriskEqualsToken: return "*=";
    case Kind.AsteriskAsteriskEqualsToken: return "**=";
    case Kind.SlashEqualsToken: return "/=";
    case Kind.PercentEqualsToken: return "%=";
    case Kind.LessThanLessThanEqualsToken: return "<<=";
    case Kind.GreaterThanGreaterThanEqualsToken: return ">>=";
    case Kind.GreaterThanGreaterThanGreaterThanEqualsToken: return ">>>=";
    case Kind.AmpersandEqualsToken: return "&=";
    case Kind.BarEqualsToken: return "|=";
    case Kind.BarBarEqualsToken: return "||=";
    case Kind.AmpersandAmpersandEqualsToken: return "&&=";
    case Kind.QuestionQuestionEqualsToken: return "??=";
    case Kind.CaretEqualsToken: return "^=";
    default: return undefined;
  }
}

function getNodeArray(nodes: unknown): readonly AstNode[] {
  if (nodes === undefined) return [];
  if (Array.isArray(nodes)) return nodes as readonly AstNode[];
  return (nodes as { readonly nodes?: readonly AstNode[] }).nodes ?? [];
}

function textRangeOf(nodes: unknown): TextRange {
  const range = nodes as { readonly pos?: number; readonly end?: number } | undefined;
  return { pos: range?.pos ?? 0, end: range?.end ?? 0 } as TextRange;
}

export function canEmitSimpleArrowHead(node: AstNode): boolean {
  const parameters = getNodeArray((node as { parameters?: unknown }).parameters);
  if (parameters.length !== 1) return false;
  const parameter = parameters[0] as { name?: AstNode; type?: AstNode; initializer?: AstNode; dotDotDotToken?: AstNode };
  return parameter.type === undefined
    && parameter.initializer === undefined
    && parameter.dotDotDotToken === undefined
    && (parameter.name as { kind?: number } | undefined)?.kind === Kind.Identifier;
}

export function formatSynthesizedComment(comment: string | SynthesizedComment): string {
  const text = typeof comment === "string" ? comment : comment.text;
  return text.includes("\n") ? `/*${text}*/` : `//${text}`;
}

export function getOpeningBracket(kind: number): string {
  switch (kind) {
    case Kind.OpenParenToken:
    case Kind.CloseParenToken:
      return "(";
    case Kind.OpenBracketToken:
    case Kind.CloseBracketToken:
      return "[";
    case Kind.OpenBraceToken:
    case Kind.CloseBraceToken:
      return "{";
    case Kind.LessThanToken:
    case Kind.GreaterThanToken:
      return "<";
    default:
      return "";
  }
}

export function getClosingBracket(kind: number): string {
  switch (kind) {
    case Kind.OpenParenToken:
    case Kind.CloseParenToken:
      return ")";
    case Kind.OpenBracketToken:
    case Kind.CloseBracketToken:
      return "]";
    case Kind.OpenBraceToken:
    case Kind.CloseBraceToken:
      return "}";
    case Kind.LessThanToken:
    case Kind.GreaterThanToken:
      return ">";
    default:
      return "";
  }
}

function isTypeNodeKind(kind: number): boolean {
  return kind === Kind.TypeReference
    || kind === Kind.TypeLiteral
    || kind === Kind.TypePredicate
    || kind === Kind.FunctionType
    || kind === Kind.ConstructorType
    || kind === Kind.ArrayType
    || kind === Kind.TupleType
    || kind === Kind.UnionType
    || kind === Kind.IntersectionType
    || kind === Kind.ConditionalType
    || kind === Kind.MappedType
    || kind === Kind.InferType
    || kind === Kind.ParenthesizedType
    || kind === Kind.LiteralType
    || kind === Kind.TemplateLiteralType
    || kind === Kind.ImportType
    || kind === Kind.TypeOperator
    || kind === Kind.IndexedAccessType
    || kind === Kind.TypeQuery
    || kind === Kind.TypeParameter
    || kind === Kind.AnyKeyword
    || kind === Kind.UnknownKeyword
    || kind === Kind.NumberKeyword
    || kind === Kind.StringKeyword
    || kind === Kind.BooleanKeyword
    || kind === Kind.VoidKeyword
    || kind === Kind.NeverKeyword
    || kind === Kind.UndefinedKeyword
    || kind === Kind.NullKeyword
    || kind === Kind.ObjectKeyword
    || kind === Kind.BigIntKeyword
    || kind === Kind.SymbolKeyword
    || kind === Kind.ThisType;
}
