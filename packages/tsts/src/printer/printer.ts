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
    void node; void sourceFile; void flags; return "";
  }
  getTextOfNode(node: AstNode, includeTrivia: boolean): string {
    void node; void includeTrivia; return "";
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
    void parentNode; void prevChildNode; void nextChildNode;
  }
  writeLinesAndIndent(lineCount: number, writeSpaceIfNotIndenting: boolean): void {
    void lineCount; void writeSpaceIfNotIndenting;
  }
  writeLineSeparatorsAndIndentBefore(node: AstNode, parent: AstNode | undefined): boolean {
    void node; void parent; return false;
  }
  writeLineSeparatorsAfter(node: AstNode, parent: AstNode | undefined): void {
    void node; void parent;
  }
  getLinesBetweenNodes(parent: AstNode | undefined, node1: AstNode, node2: AstNode): number {
    void parent; void node1; void node2; return 0;
  }
  getEffectiveLines(getLineDifference: (includeComments: boolean) => number): number {
    return getLineDifference(false);
  }
  getLeadingLineTerminatorCount(parentNode: AstNode | undefined, firstChild: AstNode | undefined, format: number): number {
    void parentNode; void firstChild; void format; return 0;
  }
  getSeparatingLineTerminatorCount(previousNode: AstNode | undefined, nextNode: AstNode | undefined, format: number): number {
    void previousNode; void nextNode; void format; return 0;
  }
  getClosingLineTerminatorCount(parentNode: AstNode | undefined, lastChild: AstNode | undefined, format: number, childrenTextRange: TextRange): number {
    void parentNode; void lastChild; void format; void childrenTextRange; return 0;
  }

  // -------------------------------------------------------------------------
  // Comment emission
  // -------------------------------------------------------------------------

  writeCommentRange(comment: CommentRange): void { void comment; }
  writeCommentRangeWorker(text: string, lineMap: readonly number[], kind: number, loc: TextRange): void {
    void text; void lineMap; void kind; void loc;
  }
  shouldEmitComments(node: AstNode): boolean { void node; return !this.options.removeComments; }
  shouldWriteComment(comment: CommentRange): boolean { void comment; return true; }

  // -------------------------------------------------------------------------
  // Emit predicates
  // -------------------------------------------------------------------------

  shouldEmitIndented(node: AstNode): boolean { void node; return false; }
  shouldElideIndentation(node: AstNode): boolean { void node; return false; }
  shouldEmitOnSingleLine(node: AstNode): boolean { void node; return false; }
  shouldEmitOnMultipleLines(node: AstNode): boolean { void node; return false; }
  shouldEmitBlockFunctionBodyOnSingleLine(body: Block): boolean { void body; return false; }
  shouldEmitOnNewLine(node: AstNode, format: number): boolean { void node; void format; return false; }
  shouldEmitSourceMaps(node: AstNode): boolean { void node; return this.options.sourceMap === true; }
  shouldEmitTokenSourceMaps(token: number, pos: number, contextNode: AstNode, flags: number): boolean {
    void token; void pos; void contextNode; void flags; return this.options.sourceMap === true;
  }
  shouldEmitLeadingComments(node: AstNode): boolean { return this.shouldEmitComments(node); }
  shouldEmitTrailingComments(node: AstNode): boolean { return this.shouldEmitComments(node); }
  shouldEmitNestedComments(node: AstNode): boolean { void node; return false; }
  shouldEmitDetachedComments(node: AstNode): boolean { return this.shouldEmitComments(node); }
  hasCommentsAtPosition(pos: number): boolean { void pos; return false; }
  shouldEmitIndirectCall(node: AstNode): boolean { void node; return false; }
  shouldAllowTrailingComma(node: AstNode, list: NodeList): boolean { void node; void list; return false; }

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
  emitTemplateExpression(node: AstNode): void { void node; }
  emitTemplateSpan(node: AstNode): void { void node; }
  emitJsxElement(node: AstNode): void { void node; }
  emitJsxSelfClosingElement(node: AstNode): void { void node; }
  emitJsxOpeningElement(node: AstNode): void { void node; }
  emitJsxClosingElement(node: AstNode): void { void node; }
  emitJsxFragment(node: AstNode): void { void node; }
  emitJsxText(node: AstNode): void { void node; }
  emitJsxAttribute(node: AstNode): void { void node; }
  emitJsxSpreadAttribute(node: AstNode): void { void node; }
  emitJsxExpression(node: AstNode): void { void node; }
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
  emitTypeNode(node: AstNode): void { void node; }
  emitTypeReference(node: AstNode): void { void node; }
  emitTypeLiteral(node: AstNode): void { void node; }
  emitTypePredicate(node: AstNode): void { void node; }
  emitFunctionType(node: AstNode): void { void node; }
  emitConstructorType(node: AstNode): void { void node; }
  emitArrayType(node: AstNode): void { void node; }
  emitTupleType(node: AstNode): void { void node; }
  emitUnionType(node: AstNode): void { void node; }
  emitIntersectionType(node: AstNode): void { void node; }
  emitConditionalType(node: AstNode): void { void node; }
  emitMappedType(node: AstNode): void { void node; }
  emitInferType(node: AstNode): void { void node; }
  emitParenthesizedType(node: AstNode): void { void node; }
  emitLiteralType(node: AstNode): void { void node; }
  emitTemplateLiteralType(node: AstNode): void { void node; }
  emitImportType(node: AstNode): void { void node; }
  emitTypeOperator(node: AstNode): void { void node; }
  emitIndexedAccessType(node: AstNode): void { void node; }
  emitTypeQuery(node: AstNode): void { void node; }
  emitTypeParameter(node: AstNode): void { void node; }

  // Helpers
  emitDecorator(node: AstNode): void { void node; }
  emitModifiers(node: AstNode, modifiers: ModifierList | undefined): void { void node; void modifiers; }
  emitParameter(node: AstNode): void { void node; }
  emitDeclarationName(node: AstNode | undefined, allowSourceMaps: boolean): void { void node; void allowSourceMaps; }
  emitName(node: AstNode | undefined): void { void node; }
  emitPropertyName(node: AstNode | undefined): void { void node; }
  emitComputedPropertyName(node: AstNode): void { void node; }
  emitHeritageClause(node: AstNode): void { void node; }
  emitSemicolon(): void { /* deferred */ }
}

// ---------------------------------------------------------------------------
// Module-level entry
// ---------------------------------------------------------------------------

export function newPrinter(options: PrinterOptions, handlers: PrintHandlers, emitContext: EmitContext): Printer {
  return new Printer(options, handlers, emitContext);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface EmitContext { readonly _ec?: unknown }
