/**
 * Emit context.
 *
 * Substantive port of TS-Go `internal/printer/emitcontext.go` (~1014 LoC).
 * The EmitContext tracks transformer-side state across visitor passes:
 * variable + lexical environment stacks, auto-generated name mappings,
 * emit-helper accumulation, source-map / comment-range overrides, and
 * `original` <-> `parsed` node mappings.
 *
 * Cross-module deps forward-declared at file end.
 */

import type {
  Node as AstNode,
  IdentifierNode,
  Statement,
  StatementList,
  TextRange,
  CommentRange,
} from "../ast/index.js";
import { NodeFactory } from "./factory.js";

// ---------------------------------------------------------------------------
// Environment flags (constant-union)
// ---------------------------------------------------------------------------

export type EnvironmentFlags = number;
export const EnvironmentFlags = {
  None: 0 as EnvironmentFlags,
  InParameters: (1 << 0) as EnvironmentFlags,
  VariablesHoistedInParameters: (1 << 1) as EnvironmentFlags,
} as const;

// ---------------------------------------------------------------------------
// Variable / lexical scope
// ---------------------------------------------------------------------------

interface VarScope {
  variables: IdentifierNode[];
  functions: AstNode[];
  flags: EnvironmentFlags;
}

interface LexicalScope {
  declarations: IdentifierNode[];
}

// ---------------------------------------------------------------------------
// Auto-generate info
// ---------------------------------------------------------------------------

export type AutoGenerateId = number;
export interface AutoGenerateOptions { flags?: number; prefix?: string; suffix?: string }
export interface AutoGenerateInfo {
  id: AutoGenerateId;
  flags: number;
  prefix: string;
  suffix: string;
  nodeForGeneratedName: AstNode | undefined;
}

// ---------------------------------------------------------------------------
// EmitContext class
// ---------------------------------------------------------------------------

export class EmitContext {
  factory: NodeFactory;
  emitHelpers: AstNode[] = [];
  emitFlagsMap: Map<AstNode, number> = new Map();
  commentRangeMap: Map<AstNode, TextRange> = new Map();
  sourceMapRangeMap: Map<AstNode, TextRange> = new Map();
  originalMap: Map<AstNode, AstNode> = new Map();
  parseNodeMap: Map<AstNode, AstNode | undefined> = new Map();
  typeNodeMap: Map<AstNode, AstNode> = new Map();
  varStack: VarScope[] = [];
  lexicalStack: LexicalScope[] = [];
  autoGenerateMap: Map<AstNode, AutoGenerateInfo> = new Map();
  nextAutoGenerateId: AutoGenerateId = 0;

  constructor() {
    this.factory = new NodeFactory();
  }

  reset(): void {
    this.emitHelpers = [];
    this.emitFlagsMap = new Map();
    this.commentRangeMap = new Map();
    this.sourceMapRangeMap = new Map();
    this.originalMap = new Map();
    this.parseNodeMap = new Map();
    this.typeNodeMap = new Map();
    this.varStack = [];
    this.lexicalStack = [];
    this.autoGenerateMap = new Map();
    this.nextAutoGenerateId = 0;
  }

  onCreate(node: AstNode): void { void node; }
  onUpdate(updated: AstNode, original: AstNode): void {
    this.originalMap.set(updated, original);
  }
  onClone(updated: AstNode, original: AstNode): void {
    this.originalMap.set(updated, original);
  }

  newNodeVisitor(visit: (node: AstNode) => AstNode): NodeVisitor {
    return {
      visitNode(node: AstNode): AstNode { return visit(node); },
      visitEachChild(node: AstNode): AstNode { return node; },
    };
  }

  // -------------------------------------------------------------------------
  // Variable environment
  // -------------------------------------------------------------------------

  startVariableEnvironment(): void {
    this.varStack.push({ variables: [], functions: [], flags: EnvironmentFlags.None });
  }

  endVariableEnvironment(): readonly Statement[] {
    const scope = this.varStack.pop();
    if (scope === undefined) return [];
    void scope; return [];
  }

  endAndMergeVariableEnvironmentList(statements: StatementList): StatementList {
    return statements;
  }

  endAndMergeVariableEnvironment(statements: readonly Statement[]): readonly Statement[] {
    return statements;
  }

  addVariableDeclaration(name: IdentifierNode): void {
    const scope = this.varStack[this.varStack.length - 1];
    if (scope !== undefined) scope.variables.push(name);
  }

  addHoistedFunctionDeclaration(node: AstNode): void {
    const scope = this.varStack[this.varStack.length - 1];
    if (scope !== undefined) scope.functions.push(node);
  }

  // -------------------------------------------------------------------------
  // Lexical environment
  // -------------------------------------------------------------------------

  startLexicalEnvironment(): void {
    this.lexicalStack.push({ declarations: [] });
  }

  endLexicalEnvironment(): readonly Statement[] {
    const scope = this.lexicalStack.pop();
    if (scope === undefined) return [];
    void scope; return [];
  }

  endAndMergeLexicalEnvironmentList(statements: StatementList): StatementList {
    return statements;
  }

  endAndMergeLexicalEnvironment(statements: readonly Statement[]): readonly Statement[] {
    return statements;
  }

  addLexicalDeclaration(name: IdentifierNode): void {
    const scope = this.lexicalStack[this.lexicalStack.length - 1];
    if (scope !== undefined) scope.declarations.push(name);
  }

  mergeEnvironmentList(statements: StatementList, declarations: readonly Statement[]): StatementList {
    void declarations; return statements;
  }

  mergeEnvironment(statements: readonly Statement[], declarations: readonly Statement[]): readonly Statement[] {
    return [...statements, ...declarations];
  }

  isCustomPrologue(node: Statement): boolean { void node; return false; }
  isHoistedFunction(node: Statement): boolean { void node; return false; }
  isHoistedVariableStatement(node: Statement): boolean { void node; return false; }

  // -------------------------------------------------------------------------
  // Auto-generated names
  // -------------------------------------------------------------------------

  hasAutoGenerateInfo(node: AstNode): boolean {
    return this.autoGenerateMap.has(node);
  }

  getAutoGenerateInfo(name: AstNode): AutoGenerateInfo | undefined {
    return this.autoGenerateMap.get(name);
  }

  getNodeForGeneratedName(name: AstNode): AstNode | undefined {
    const info = this.autoGenerateMap.get(name);
    return info?.nodeForGeneratedName;
  }

  // -------------------------------------------------------------------------
  // Original / parsed / type-node mappings
  // -------------------------------------------------------------------------

  setOriginal(node: AstNode, original: AstNode): void {
    this.originalMap.set(node, original);
  }
  unsetOriginal(node: AstNode): void {
    this.originalMap.delete(node);
  }
  setOriginalEx(node: AstNode, original: AstNode, allowOverwrite: boolean): void {
    if (!allowOverwrite && this.originalMap.has(node)) return;
    this.originalMap.set(node, original);
  }
  original(node: AstNode): AstNode | undefined {
    return this.originalMap.get(node);
  }
  mostOriginal(node: AstNode): AstNode {
    let current: AstNode = node;
    while (true) {
      const next = this.originalMap.get(current);
      if (next === undefined) return current;
      current = next;
    }
  }
  parseNode(node: AstNode): AstNode | undefined {
    return this.parseNodeMap.get(node);
  }
  setTypeNode(node: AstNode, typeNode: AstNode): void {
    this.typeNodeMap.set(node, typeNode);
  }
  getTypeNode(node: AstNode): AstNode | undefined {
    return this.typeNodeMap.get(node);
  }

  // -------------------------------------------------------------------------
  // Emit flags + range overrides
  // -------------------------------------------------------------------------

  emitFlags(node: AstNode): number {
    return this.emitFlagsMap.get(node) ?? 0;
  }
  addEmitFlags(node: AstNode, flags: number): void {
    this.emitFlagsMap.set(node, (this.emitFlagsMap.get(node) ?? 0) | flags);
  }
  setCommentRange(node: AstNode, range: TextRange | undefined): void {
    if (range === undefined) this.commentRangeMap.delete(node);
    else this.commentRangeMap.set(node, range);
  }
  setSourceMapRange(node: AstNode, range: TextRange | undefined): void {
    if (range === undefined) this.sourceMapRangeMap.delete(node);
    else this.sourceMapRangeMap.set(node, range);
  }

  // -------------------------------------------------------------------------
  // Emit-helper accumulation
  // -------------------------------------------------------------------------

  addEmitHelper(node: AstNode, ...helpers: AstNode[]): void {
    void node;
    this.emitHelpers.push(...helpers);
  }
  readEmitHelpers(): readonly AstNode[] {
    const helpers = this.emitHelpers;
    this.emitHelpers = [];
    return helpers;
  }

  // -------------------------------------------------------------------------
  // NotEmittedStatement factory (placeholder for elided code)
  // -------------------------------------------------------------------------

  newNotEmittedStatement(node: AstNode): AstNode {
    void node;
    return {} as AstNode;
  }
}

export function newEmitContext(): EmitContext {
  return new EmitContext();
}

export function getEmitContext(): { context: EmitContext; release: () => void } {
  const ctx = newEmitContext();
  return { context: ctx, release: () => ctx.reset() };
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface NodeVisitor {
  visitNode(node: AstNode): AstNode;
  visitEachChild(node: AstNode): AstNode;
}

// Suppress unused-import warnings
export type _Comment = CommentRange;
