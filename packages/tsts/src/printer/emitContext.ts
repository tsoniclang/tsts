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
import {
  Kind,
  NodeFlags,
  createNodeArray,
  createNotEmittedStatement,
  createVariableDeclaration,
  createVariableDeclarationList,
  createVariableStatement,
  isPrologueDirective,
} from "../ast/index.js";
import { EmitFlags } from "./emitFlags.js";
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
  initializationStatements: AstNode[];
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
    this.varStack.push({ variables: [], functions: [], flags: EnvironmentFlags.None, initializationStatements: [] });
    this.startLexicalEnvironment();
  }

  endVariableEnvironment(): readonly Statement[] {
    const scope = this.varStack.pop();
    if (scope === undefined) return [];
    const results: Statement[] = [];
    for (const fn of scope.functions) {
      results.push(fn as unknown as Statement);
    }
    if (scope.variables.length > 0) {
      const declarations = scope.variables.map((name) => {
        const declaration = createVariableDeclaration(name as never, undefined, undefined, undefined);
        this.addEmitFlags(declaration as unknown as AstNode, EmitFlags.NoNestedSourceMaps);
        return declaration;
      });
      const declarationList = createVariableDeclarationList(createNodeArray(declarations) as never, NodeFlags.None);
      const variableStatement = createVariableStatement(undefined, declarationList) as unknown as Statement;
      this.setEmitFlags(variableStatement as unknown as AstNode, EmitFlags.CustomPrologue);
      results.push(variableStatement);
    }
    results.push(...scope.initializationStatements as Statement[]);
    results.push(...this.endLexicalEnvironment());
    return results;
  }

  endAndMergeVariableEnvironmentList(statements: StatementList): StatementList {
    const hoisted = this.endVariableEnvironment();
    if (hoisted.length === 0) return statements;
    return createNodeArray(this.mergeEnvironment(statementListElements(statements), hoisted) as readonly Statement[]) as unknown as StatementList;
  }

  endAndMergeVariableEnvironment(statements: readonly Statement[]): readonly Statement[] {
    const hoisted = this.endVariableEnvironment();
    if (hoisted.length === 0) return statements;
    return this.mergeEnvironment(statements, hoisted);
  }

  addVariableDeclaration(name: IdentifierNode): void {
    const scope = this.varStack[this.varStack.length - 1];
    if (scope !== undefined) scope.variables.push(name);
  }

  addHoistedFunctionDeclaration(node: AstNode): void {
    this.setEmitFlags(node, EmitFlags.CustomPrologue);
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
    if (scope.declarations.length === 0) return [];
    const declarations = scope.declarations.map((name) => {
      const declaration = createVariableDeclaration(name as never, undefined, undefined, undefined);
      this.addEmitFlags(declaration as unknown as AstNode, EmitFlags.NoNestedSourceMaps);
      return declaration;
    });
    const declarationList = createVariableDeclarationList(createNodeArray(declarations) as never, NodeFlags.Let);
    const variableStatement = createVariableStatement(undefined, declarationList) as unknown as Statement;
    this.setEmitFlags(variableStatement as unknown as AstNode, EmitFlags.CustomPrologue);
    return [variableStatement];
  }

  endAndMergeLexicalEnvironmentList(statements: StatementList): StatementList {
    const lexical = this.endLexicalEnvironment();
    if (lexical.length === 0) return statements;
    return createNodeArray(this.mergeEnvironment(statementListElements(statements), lexical) as readonly Statement[]) as unknown as StatementList;
  }

  endAndMergeLexicalEnvironment(statements: readonly Statement[]): readonly Statement[] {
    const lexical = this.endLexicalEnvironment();
    if (lexical.length === 0) return statements;
    return this.mergeEnvironment(statements, lexical);
  }

  addLexicalDeclaration(name: IdentifierNode): void {
    const scope = this.lexicalStack[this.lexicalStack.length - 1];
    if (scope !== undefined) scope.declarations.push(name);
  }

  mergeEnvironmentList(statements: StatementList, declarations: readonly Statement[]): StatementList {
    const merged = this.mergeEnvironment(statementListElements(statements), declarations);
    return merged === statementListElements(statements) ? statements : createNodeArray(merged as readonly Statement[]) as unknown as StatementList;
  }

  mergeEnvironment(statements: readonly Statement[], declarations: readonly Statement[]): readonly Statement[] {
    if (declarations.length === 0) return statements;
    const leftStandardPrologueEnd = findSpanEnd(statements, isPrologueDirectiveStatement, 0);
    const leftHoistedFunctionsEnd = findSpanEnd(statements, statement => this.isHoistedFunction(statement), leftStandardPrologueEnd);
    const leftHoistedVariablesEnd = findSpanEnd(statements, statement => this.isHoistedVariableStatement(statement), leftHoistedFunctionsEnd);
    const rightStandardPrologueEnd = findSpanEnd(declarations, isPrologueDirectiveStatement, 0);
    const rightHoistedFunctionsEnd = findSpanEnd(declarations, statement => this.isHoistedFunction(statement), rightStandardPrologueEnd);
    const rightHoistedVariablesEnd = findSpanEnd(declarations, statement => this.isHoistedVariableStatement(statement), rightHoistedFunctionsEnd);
    const rightCustomPrologueEnd = findSpanEnd(declarations, statement => this.isCustomPrologue(statement), rightHoistedVariablesEnd);
    if (rightCustomPrologueEnd !== declarations.length) {
      throw new Error("Expected declarations to be valid standard or custom prologues");
    }

    let left = statements.slice();
    let changed = false;
    if (rightCustomPrologueEnd > rightHoistedVariablesEnd) {
      left.splice(leftHoistedVariablesEnd, 0, ...declarations.slice(rightHoistedVariablesEnd, rightCustomPrologueEnd));
      changed = true;
    }
    if (rightHoistedVariablesEnd > rightHoistedFunctionsEnd) {
      left.splice(leftHoistedFunctionsEnd, 0, ...declarations.slice(rightHoistedFunctionsEnd, rightHoistedVariablesEnd));
      changed = true;
    }
    if (rightHoistedFunctionsEnd > rightStandardPrologueEnd) {
      left.splice(leftStandardPrologueEnd, 0, ...declarations.slice(rightStandardPrologueEnd, rightHoistedFunctionsEnd));
      changed = true;
    }
    if (rightStandardPrologueEnd > 0) {
      if (leftStandardPrologueEnd === 0) {
        left.unshift(...declarations.slice(0, rightStandardPrologueEnd));
        changed = true;
      } else {
        const leftPrologues = new Set(statements.slice(0, leftStandardPrologueEnd).map(prologueText));
        for (let index = rightStandardPrologueEnd - 1; index >= 0; index -= 1) {
          const rightPrologue = declarations[index]!;
          if (!leftPrologues.has(prologueText(rightPrologue))) {
            left.unshift(rightPrologue);
            changed = true;
          }
        }
      }
    }
    return changed ? left : statements;
  }

  isCustomPrologue(node: Statement): boolean {
    return (this.emitFlags(node as unknown as AstNode) & EmitFlags.CustomPrologue) !== 0;
  }
  isHoistedFunction(node: Statement): boolean {
    return this.isCustomPrologue(node) && node.kind === Kind.FunctionDeclaration;
  }
  isHoistedVariableStatement(node: Statement): boolean {
    if (!this.isCustomPrologue(node) || node.kind !== Kind.VariableStatement) return false;
    const declarations = variableStatementDeclarations(node);
    return declarations.length > 0 && declarations.every(isHoistedVariable);
  }

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
    const existing = this.originalMap.get(node);
    if (existing === undefined || allowOverwrite) {
      this.originalMap.set(node, original);
      return;
    }
    if (existing !== original) throw new Error("Original node already set.");
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
  setEmitFlags(node: AstNode, flags: number): void {
    this.emitFlagsMap.set(node, flags);
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
  // NotEmittedStatement factory
  // -------------------------------------------------------------------------

  newNotEmittedStatement(node: AstNode): AstNode {
    const ns = createNotEmittedStatement() as unknown as AstNode;
    ns.pos = node.pos;
    ns.end = node.end;
    ns.flags = node.flags;
    this.originalMap.set(ns, node);
    return ns;
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

function statementListElements(statements: StatementList): readonly Statement[] {
  return Array.isArray(statements) ? statements as readonly Statement[] : (statements as unknown as { readonly nodes?: readonly Statement[] }).nodes ?? [];
}

function findSpanEnd(statements: readonly Statement[], predicate: (statement: Statement) => boolean, start: number): number {
  let index = start;
  while (index < statements.length && predicate(statements[index]!)) index += 1;
  return index;
}

function isPrologueDirectiveStatement(statement: Statement): boolean {
  return isPrologueDirective(statement as unknown as AstNode);
}

function prologueText(statement: Statement): string {
  const expression = (statement as unknown as { readonly expression?: { readonly text?: unknown } }).expression;
  return typeof expression?.text === "string" ? expression.text : "";
}

function variableStatementDeclarations(statement: Statement): readonly AstNode[] {
  const declarationList = (statement as unknown as { readonly declarationList?: { readonly declarations?: readonly AstNode[] } }).declarationList;
  return declarationList?.declarations ?? [];
}

function isHoistedVariable(node: AstNode): boolean {
  return node.kind === Kind.VariableDeclaration
    && (node as unknown as { readonly name?: AstNode }).name?.kind === Kind.Identifier
    && (node as unknown as { readonly initializer?: AstNode }).initializer === undefined;
}

// Suppress unused-import warnings
export type _Comment = CommentRange;
