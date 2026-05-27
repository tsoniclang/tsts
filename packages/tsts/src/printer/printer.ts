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
  emitBlock(node: AstNode): void { void node; }
  emitModuleBlock(node: AstNode): void { void node; }
  emitVariableStatement(node: AstNode): void { void node; }
  emitExpressionStatement(node: AstNode): void { void node; }
  emitIfStatement(node: AstNode): void { void node; }
  emitDoStatement(node: AstNode): void { void node; }
  emitWhileStatement(node: AstNode): void { void node; }
  emitForStatement(node: AstNode): void { void node; }
  emitForInStatement(node: AstNode): void { void node; }
  emitForOfStatement(node: AstNode): void { void node; }
  emitContinueStatement(node: AstNode): void { void node; }
  emitBreakStatement(node: AstNode): void { void node; }
  emitReturnStatement(node: AstNode): void { void node; }
  emitWithStatement(node: AstNode): void { void node; }
  emitSwitchStatement(node: AstNode): void { void node; }
  emitLabeledStatement(node: AstNode): void { void node; }
  emitThrowStatement(node: AstNode): void { void node; }
  emitTryStatement(node: AstNode): void { void node; }
  emitDebuggerStatement(node: AstNode): void { void node; }
  emitClassDeclaration(node: AstNode): void { void node; }
  emitClassExpression(node: AstNode): void { void node; }
  emitFunctionDeclaration(node: AstNode): void { void node; }
  emitFunctionExpression(node: AstNode): void { void node; }
  emitArrowFunction(node: AstNode): void { void node; }
  emitConstructorDeclaration(node: AstNode): void { void node; }
  emitMethodDeclaration(node: AstNode): void { void node; }
  emitPropertyDeclaration(node: AstNode): void { void node; }
  emitGetAccessor(node: AstNode): void { void node; }
  emitSetAccessor(node: AstNode): void { void node; }
  emitInterfaceDeclaration(node: AstNode): void { void node; }
  emitTypeAliasDeclaration(node: AstNode): void { void node; }
  emitEnumDeclaration(node: AstNode): void { void node; }
  emitModuleDeclaration(node: AstNode): void { void node; }
  emitImportDeclaration(node: AstNode): void { void node; }
  emitImportClause(node: AstNode): void { void node; }
  emitNamedImports(node: AstNode): void { void node; }
  emitImportSpecifier(node: AstNode): void { void node; }
  emitImportEqualsDeclaration(node: AstNode): void { void node; }
  emitExportDeclaration(node: AstNode): void { void node; }
  emitExportAssignment(node: AstNode): void { void node; }
  emitNamedExports(node: AstNode): void { void node; }
  emitExportSpecifier(node: AstNode): void { void node; }
  emitCallExpression(node: AstNode): void { void node; }
  emitNewExpression(node: AstNode): void { void node; }
  emitTaggedTemplateExpression(node: AstNode): void { void node; }
  emitObjectLiteralExpression(node: AstNode): void { void node; }
  emitArrayLiteralExpression(node: AstNode): void { void node; }
  emitPropertyAccessExpression(node: AstNode): void { void node; }
  emitElementAccessExpression(node: AstNode): void { void node; }
  emitBinaryExpression(node: AstNode): void { void node; }
  emitConditionalExpression(node: AstNode): void { void node; }
  emitPrefixUnaryExpression(node: AstNode): void { void node; }
  emitPostfixUnaryExpression(node: AstNode): void { void node; }
  emitYieldExpression(node: AstNode): void { void node; }
  emitAwaitExpression(node: AstNode): void { void node; }
  emitVoidExpression(node: AstNode): void { void node; }
  emitDeleteExpression(node: AstNode): void { void node; }
  emitTypeOfExpression(node: AstNode): void { void node; }
  emitParenthesizedExpression(node: AstNode): void { void node; }
  emitSpreadElement(node: AstNode): void { void node; }
  emitAsExpression(node: AstNode): void { void node; }
  emitSatisfiesExpression(node: AstNode): void { void node; }
  emitNonNullExpression(node: AstNode): void { void node; }
  emitTypeAssertionExpression(node: AstNode): void { void node; }

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
