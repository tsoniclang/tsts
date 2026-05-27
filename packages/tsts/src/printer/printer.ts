/**
 * Strada-shaped Printer.
 *
 * Substantive port of TS-Go `internal/printer/printer.go` (~6242 LoC,
 * 370 Printer methods). The Printer is the main code-emission engine
 * — given an AST and emit-context, it produces the .js/.ts text
 * output, source maps, and comment/JSDoc handling.
 *
 * Port scope: ~140 method signatures across the major write-* / emit-*
 * / should* / get* families mapped to the upstream surface. Bodies
 * are stubbed; emission integration tests drive incremental fill-in.
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

// ---------------------------------------------------------------------------
// Printer class
// ---------------------------------------------------------------------------

export class Printer {
  options: PrinterOptions;
  handlers: PrintHandlers;
  emitContext: EmitContext;
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
    return k === 242 /* Block */ || k === 210 /* ObjectLiteralExpression */ ||
      k === 209 /* ArrayLiteralExpression */;
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
    return k === 209 /* ArrayLiteralExpression */ ||
      k === 210 /* ObjectLiteralExpression */ ||
      k === 213 /* CallExpression */ ||
      k === 214 /* NewExpression */;
  }

  // -------------------------------------------------------------------------
  // Token emission
  // -------------------------------------------------------------------------

  writeTokenText(token: number, writeKind: WriteKind, pos: number): number {
    void token; void writeKind; return pos;
  }
  emitToken(token: number, pos: number, writeKind: WriteKind, contextNode: AstNode | undefined): number {
    void token; void writeKind; void contextNode; return pos;
  }

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
  emitNodeList(parentNode: AstNode | undefined, nodes: NodeList | undefined, format: number): void {
    void parentNode; void format;
    if (nodes === undefined) return;
    const inner = (nodes as unknown as { nodes?: readonly AstNode[] }).nodes ?? [];
    this.emitList(parentNode, nodes, format, 0, inner.length);
  }
  emitList(parentNode: AstNode | undefined, nodes: NodeList | undefined, format: number, start: number, count: number): void {
    void parentNode; void format;
    if (nodes === undefined) return;
    const inner = (nodes as unknown as { nodes?: readonly AstNode[] }).nodes ?? [];
    for (let i = 0; i < count; i++) {
      const idx = start + i;
      if (idx >= inner.length) break;
      if (i > 0) this.writePunctuation(", ");
      this.emit(0, inner[idx]);
    }
  }
  emitWorker(hint: number, node: AstNode): void {
    // Dispatch by node.kind. This is the giant switch in Strada.
    // For the basic cases we delegate to the per-kind emit method.
    const k = (node as { kind?: number }).kind ?? 0;
    switch (k) {
      case Kind.Identifier: return this.emitIdentifier(node);
      case Kind.StringLiteral: return this.emitStringLiteral(node);
      case Kind.NumericLiteral: return this.emitNumericLiteral(node);
      case Kind.BigIntLiteral: return this.emitBigIntLiteral(node);
      case Kind.RegularExpressionLiteral: return this.emitRegularExpressionLiteral(node);
      case Kind.NoSubstitutionTemplateLiteral: return this.emitTemplateLiteral(node);
      case Kind.TemplateExpression: return this.emitTemplateExpression(node);
      case Kind.Block: return this.emitBlock(node);
      case Kind.VariableStatement: return this.emitVariableStatement(node);
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
      case Kind.FunctionDeclaration: return this.emitFunctionDeclaration(node);
      case Kind.FunctionExpression: return this.emitFunctionExpression(node);
      case Kind.ArrowFunction: return this.emitArrowFunction(node);
      case Kind.InterfaceDeclaration: return this.emitInterfaceDeclaration(node);
      case Kind.TypeAliasDeclaration: return this.emitTypeAliasDeclaration(node);
      case Kind.EnumDeclaration: return this.emitEnumDeclaration(node);
      case Kind.ModuleDeclaration: return this.emitModuleDeclaration(node);
      case Kind.ImportDeclaration: return this.emitImportDeclaration(node);
      case Kind.ImportEqualsDeclaration: return this.emitImportEqualsDeclaration(node);
      case Kind.ExportDeclaration: return this.emitExportDeclaration(node);
      case Kind.ExportAssignment: return this.emitExportAssignment(node);
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
      this.writeKeyword("catch ");
      const varDecl = (catchClause as unknown as { variableDeclaration?: AstNode }).variableDeclaration;
      if (varDecl !== undefined) {
        this.writePunctuation("(");
        const name = (varDecl as unknown as { name?: AstNode }).name;
        if (name !== undefined) this.emit(0, name);
        this.writePunctuation(") ");
      }
      this.emit(0, (catchClause as unknown as { block?: AstNode }).block);
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
  emitNamedImports(node: AstNode): void {
    this.writePunctuation("{ ");
    const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes ?? [];
    for (let i = 0; i < elements.length; i++) {
      if (i > 0) this.writePunctuation(", ");
      this.emit(0, elements[i]);
    }
    this.writePunctuation(" }");
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
  emitExportSpecifier(node: AstNode): void {
    const propertyName = (node as unknown as { propertyName?: AstNode }).propertyName;
    if (propertyName !== undefined) {
      this.emit(0, propertyName);
      this.writeKeyword(" as ");
    }
    this.emit(0, (node as unknown as { name?: AstNode }).name);
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
    const writer = this.state.writer ?? this.ensureOwnWriter();
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
    const text = (writer as unknown as { getText?(): string }).getText?.() ?? "";
    return text;
  }

  private ensureOwnWriter(): PrinterWriter {
    if (this.state.ownWriter !== undefined) return this.state.ownWriter;
    // Minimal text writer fallback so printFile can be called without
    // explicit writer wiring. Mirrors EmitTextWriter (TextWriter)
    // semantics: indent + line tracking + buffer.
    const w: PrinterWriter & { getText(): string } = (() => {
      let buf = "";
      let indent = 0;
      let lineStart = true;
      const indentSize = 4;
      return {
        write(text: string): void {
          if (lineStart) { buf += " ".repeat(indent * indentSize); lineStart = false; }
          buf += text;
        },
        writeLine(): void { buf += "\n"; lineStart = true; },
        increaseIndent(): void { indent += 1; },
        decreaseIndent(): void { indent = Math.max(0, indent - 1); },
        getText(): string { return buf; },
      };
    })();
    this.state.ownWriter = w;
    return w;
  }
}

// ---------------------------------------------------------------------------
// Module-level entry
// ---------------------------------------------------------------------------

export function newPrinter(options: PrinterOptions, handlers: PrintHandlers, emitContext: EmitContext): Printer {
  return new Printer(options, handlers, emitContext);
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

interface EmitContext { readonly _ec?: unknown }
