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
  SourceFile,
  Statement,
  StatementList,
  TextRange,
  CommentRange,
} from "../ast/index.js";
import {
  Kind,
  NodeFlags,
  cloneNode,
  createBlock,
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

export interface SynthesizedComment {
  kind: Kind;
  text: string;
  hasTrailingNewLine: boolean;
  hasLeadingNewLine?: boolean;
  loc?: TextRange;
}

// ---------------------------------------------------------------------------
// EmitContext class
// ---------------------------------------------------------------------------

export class EmitContext {
  readonly nodeFactory: NodeFactory;
  emitHelpers: AstNode[] = [];
  emitHelpersMap: Map<AstNode, AstNode[]> = new Map();
  emitFlagsMap: Map<AstNode, number> = new Map();
  commentRangeMap: Map<AstNode, TextRange> = new Map();
  sourceMapRangeMap: Map<AstNode, TextRange> = new Map();
  tokenSourceMapRangeMap: Map<AstNode, Map<Kind, TextRange>> = new Map();
  originalMap: Map<AstNode, AstNode> = new Map();
  parseNodeMap: Map<AstNode, AstNode | undefined> = new Map();
  typeNodeMap: Map<AstNode, AstNode> = new Map();
  assignedNameMap: Map<AstNode, AstNode> = new Map();
  textSourceMap: Map<AstNode, AstNode> = new Map();
  classThisMap: Map<AstNode, AstNode> = new Map();
  externalHelpersModuleNameMap: Map<AstNode, IdentifierNode> = new Map();
  recordedExternalHelpers: Set<AstNode> = new Set();
  syntheticLeadingCommentsMap: Map<AstNode, readonly SynthesizedComment[]> = new Map();
  syntheticTrailingCommentsMap: Map<AstNode, readonly SynthesizedComment[]> = new Map();
  varStack: VarScope[] = [];
  lexicalStack: LexicalScope[] = [];
  autoGenerateMap: Map<AstNode, AutoGenerateInfo> = new Map();
  nextAutoGenerateId: AutoGenerateId = 0;

  constructor() {
    this.nodeFactory = new NodeFactory();
  }

  reset(): void {
    this.emitHelpers = [];
    this.emitHelpersMap = new Map();
    this.emitFlagsMap = new Map();
    this.commentRangeMap = new Map();
    this.sourceMapRangeMap = new Map();
    this.tokenSourceMapRangeMap = new Map();
    this.originalMap = new Map();
    this.parseNodeMap = new Map();
    this.typeNodeMap = new Map();
    this.assignedNameMap = new Map();
    this.textSourceMap = new Map();
    this.classThisMap = new Map();
    this.externalHelpersModuleNameMap = new Map();
    this.recordedExternalHelpers = new Set();
    this.syntheticLeadingCommentsMap = new Map();
    this.syntheticTrailingCommentsMap = new Map();
    this.varStack = [];
    this.lexicalStack = [];
    this.autoGenerateMap = new Map();
    this.nextAutoGenerateId = 0;
  }

  factory(): NodeFactory {
    return this.nodeFactory;
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
    if (scope !== undefined) {
      scope.variables.push(name);
      if ((scope.flags & EnvironmentFlags.InParameters) !== 0) {
        scope.flags |= EnvironmentFlags.VariablesHoistedInParameters;
      }
    }
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

  mergeEnvironmentList(statements: StatementList | readonly Statement[], declarations: readonly Statement[]): StatementList {
    const elements = statementListElements(statements);
    const merged = this.mergeEnvironment(elements, declarations);
    if (merged === elements && !Array.isArray(statements)) return statements as StatementList;
    return createNodeArray(merged as readonly Statement[]) as unknown as StatementList;
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
    if (this.parseNodeMap.has(node)) return this.parseNodeMap.get(node);
    return this.mostOriginal(node);
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
  commentRange(node: AstNode): TextRange {
    return this.commentRangeMap.get(node) ?? node;
  }
  assignCommentRange(to: AstNode, from: AstNode): void {
    this.commentRangeMap.set(to, this.commentRange(from));
  }
  setSourceMapRange(node: AstNode, range: TextRange | undefined): void {
    if (range === undefined) this.sourceMapRangeMap.delete(node);
    else this.sourceMapRangeMap.set(node, range);
  }
  sourceMapRange(node: AstNode): TextRange {
    return this.sourceMapRangeMap.get(node) ?? node;
  }
  assignSourceMapRange(to: AstNode, from: AstNode): void {
    this.sourceMapRangeMap.set(to, this.sourceMapRange(from));
  }
  assignCommentAndSourceMapRanges(to: AstNode, from: AstNode): void {
    this.assignCommentRange(to, from);
    this.assignSourceMapRange(to, from);
  }
  tokenSourceMapRange(node: AstNode, kind: Kind): readonly [TextRange | undefined, boolean] {
    const range = this.tokenSourceMapRangeMap.get(node)?.get(kind);
    return [range, range !== undefined];
  }
  setTokenSourceMapRange(node: AstNode, kind: Kind, range: TextRange): void {
    let ranges = this.tokenSourceMapRangeMap.get(node);
    if (ranges === undefined) {
      ranges = new Map();
      this.tokenSourceMapRangeMap.set(node, ranges);
    }
    ranges.set(kind, range);
  }

  assignedName(node: AstNode): AstNode | undefined {
    return this.assignedNameMap.get(node);
  }
  setAssignedName(node: AstNode, name: AstNode): void {
    this.assignedNameMap.set(node, name);
  }
  textSource(node: AstNode): AstNode | undefined {
    return this.textSourceMap.get(node);
  }
  setTextSource(node: AstNode, source: AstNode): void {
    this.textSourceMap.set(node, source);
  }
  classThis(node: AstNode): AstNode | undefined {
    return this.classThisMap.get(node);
  }
  setClassThis(node: AstNode, classThis: IdentifierNode): void {
    this.classThisMap.set(node, classThis);
  }

  // -------------------------------------------------------------------------
  // Emit-helper accumulation
  // -------------------------------------------------------------------------

  requestEmitHelper(helper: AstNode): void {
    if ((helper as unknown as { readonly scoped?: boolean }).scoped === true) {
      throw new Error("Cannot request a scoped emit helper");
    }
    const dependencies = (helper as unknown as { readonly dependencies?: readonly AstNode[] }).dependencies ?? [];
    for (const dependency of dependencies) {
      this.requestEmitHelper(dependency);
    }
    appendUnique(this.emitHelpers, helper);
  }
  addEmitHelper(node: AstNode, ...helpers: AstNode[]): void {
    if (helpers.length === 0) return;
    let current = this.emitHelpersMap.get(node);
    if (current === undefined) {
      current = [];
      this.emitHelpersMap.set(node, current);
    }
    for (const helper of helpers) {
      appendUnique(current, helper);
    }
  }
  addEmitHelpers(node: AstNode, helpers: readonly AstNode[] | undefined): void {
    if (helpers === undefined) return;
    this.addEmitHelper(node, ...helpers);
  }
  moveEmitHelpers(source: AstNode, target: AstNode, predicate: (helper: AstNode) => boolean = () => true): void {
    const sourceHelpers = this.emitHelpersMap.get(source);
    if (sourceHelpers === undefined || sourceHelpers.length === 0) return;
    const kept: AstNode[] = [];
    let targetHelpers = this.emitHelpersMap.get(target);
    for (const helper of sourceHelpers) {
      if (predicate(helper)) {
        if (targetHelpers === undefined) {
          targetHelpers = [];
          this.emitHelpersMap.set(target, targetHelpers);
        }
        appendUnique(targetHelpers, helper);
      } else {
        kept.push(helper);
      }
    }
    if (kept.length === 0) this.emitHelpersMap.delete(source);
    else this.emitHelpersMap.set(source, kept);
  }
  getEmitHelpers(node: AstNode): readonly AstNode[] {
    return this.emitHelpersMap.get(node) ?? [];
  }
  readEmitHelpers(): readonly AstNode[] {
    const helpers = this.emitHelpers;
    this.emitHelpers = [];
    return helpers;
  }

  getExternalHelpersModuleName(node: SourceFile): IdentifierNode | undefined {
    const parseNode = this.parseNode(node as unknown as AstNode);
    return parseNode === undefined ? undefined : this.externalHelpersModuleNameMap.get(parseNode);
  }
  setExternalHelpersModuleName(node: SourceFile, name: IdentifierNode): void {
    const parseNode = this.parseNode(node as unknown as AstNode);
    if (parseNode === undefined) {
      throw new Error("Node must be a parse tree node or have an Original pointer to a parse tree node.");
    }
    this.externalHelpersModuleNameMap.set(parseNode, name);
    this.recordedExternalHelpers.add(parseNode);
  }
  hasRecordedExternalHelpers(node: SourceFile): boolean {
    const parseNode = this.parseNode(node as unknown as AstNode);
    return parseNode !== undefined
      && (this.recordedExternalHelpers.has(parseNode)
        || this.externalHelpersModuleNameMap.has(parseNode)
        || (this.emitFlags(parseNode) & EmitFlags.ExternalHelpers) !== 0);
  }
  isCallToHelper(firstSegment: AstNode, helperName: string): boolean {
    if (firstSegment.kind !== Kind.CallExpression) return false;
    const expression = (firstSegment as unknown as { readonly expression?: AstNode }).expression;
    return expression !== undefined
      && expression.kind === Kind.Identifier
      && (this.emitFlags(expression) & EmitFlags.HelperName) !== 0
      && nodeText(expression) === helperName;
  }

  // -------------------------------------------------------------------------
  // Visitor hooks
  // -------------------------------------------------------------------------

  visitVariableEnvironment(nodes: StatementList, visitor: NodeVisitor): StatementList {
    this.startVariableEnvironment();
    return this.endAndMergeVariableEnvironmentList(visitNodes(visitor, nodes) as StatementList);
  }

  visitParameters(nodes: StatementList, visitor: NodeVisitor): StatementList {
    this.startVariableEnvironment();
    const scope = this.varStack[this.varStack.length - 1];
    const oldFlags = scope?.flags ?? EnvironmentFlags.None;
    if (scope !== undefined) scope.flags |= EnvironmentFlags.InParameters;
    let visited = visitNodes(visitor, nodes) as StatementList;
    if (scope !== undefined && (scope.flags & EnvironmentFlags.VariablesHoistedInParameters) !== 0) {
      visited = this.addDefaultValueAssignmentsIfNeeded(visited);
    }
    if (scope !== undefined) scope.flags = oldFlags;
    return visited;
  }

  addDefaultValueAssignmentsIfNeeded(nodes: StatementList): StatementList {
    const elements = statementListElements(nodes);
    let result: Statement[] | undefined;
    for (let index = 0; index < elements.length; index += 1) {
      const parameter = elements[index]!;
      const updated = this.addDefaultValueAssignmentIfNeeded(parameter as unknown as AstNode) as unknown as Statement;
      if (updated !== parameter) {
        result ??= elements.slice() as Statement[];
        result[index] = updated;
      }
    }
    return result === undefined ? nodes : createNodeArray(result) as unknown as StatementList;
  }

  addDefaultValueAssignmentIfNeeded(parameter: AstNode): AstNode {
    const fields = parameter as unknown as {
      readonly dotDotDotToken?: AstNode;
      readonly name?: AstNode;
      readonly initializer?: AstNode;
    };
    if (fields.dotDotDotToken !== undefined) return parameter;
    if (fields.name !== undefined && isBindingPattern(fields.name)) {
      return this.addDefaultValueAssignmentForBindingPattern(parameter);
    }
    if (fields.initializer !== undefined && fields.name !== undefined) {
      return this.addDefaultValueAssignmentForInitializer(parameter, fields.name, fields.initializer);
    }
    return parameter;
  }

  addDefaultValueAssignmentForBindingPattern(parameter: AstNode): AstNode {
    const fields = parameter as unknown as {
      readonly modifiers?: unknown;
      readonly dotDotDotToken?: AstNode;
      readonly name: AstNode;
      readonly questionToken?: AstNode;
      readonly type?: AstNode;
      readonly initializer?: AstNode;
    };
    const generatedName = this.nodeFactory.newGeneratedNameForNode(parameter) as unknown as AstNode;
    const initNode = fields.initializer === undefined
      ? generatedName
      : this.nodeFactory.newConditionalExpression(
        this.nodeFactory.newStrictEqualityExpression(
          generatedName as never,
          this.nodeFactory.newVoidZeroExpression(),
        ),
        this.nodeFactory.newToken(Kind.QuestionToken),
        fields.initializer,
        this.nodeFactory.newToken(Kind.ColonToken),
        generatedName,
      );
    const declaration = this.nodeFactory.newVariableDeclaration(fields.name, undefined, fields.type, initNode);
    this.addInitializationStatement(this.nodeFactory.newVariableStatement(
      undefined,
      this.nodeFactory.newVariableDeclarationList(createNodeArray([declaration]) as never, NodeFlags.None),
    ));
    return this.nodeFactory.updateParameterDeclaration(
      parameter,
      fields.modifiers,
      fields.dotDotDotToken,
      generatedName,
      fields.questionToken,
      fields.type,
      undefined,
    );
  }

  addDefaultValueAssignmentForInitializer(parameter: AstNode, name: AstNode, initializer: AstNode): AstNode {
    this.addEmitFlags(initializer, EmitFlags.NoSourceMap | EmitFlags.NoComments);
    const nameClone = cloneNode(name);
    this.addEmitFlags(nameClone, EmitFlags.NoSourceMap);
    const initAssignment = this.nodeFactory.newAssignmentExpression(nameClone as never, initializer as never) as unknown as AstNode;
    initAssignment.pos = parameter.pos;
    initAssignment.end = parameter.end;
    this.addEmitFlags(initAssignment, EmitFlags.NoComments);
    const initBlock = this.nodeFactory.newBlock([this.nodeFactory.newExpressionStatement(initAssignment as never) as unknown as Statement]);
    initBlock.pos = parameter.pos;
    initBlock.end = parameter.end;
    this.addEmitFlags(initBlock, EmitFlags.SingleLine | EmitFlags.NoTrailingSourceMap | EmitFlags.NoTokenSourceMaps | EmitFlags.NoComments);
    this.addInitializationStatement(this.nodeFactory.newIfStatement(
      this.nodeFactory.newTypeCheck(cloneNode(name), "undefined"),
      initBlock,
      undefined,
    ));
    const fields = parameter as unknown as {
      readonly modifiers?: unknown;
      readonly dotDotDotToken?: AstNode;
      readonly questionToken?: AstNode;
      readonly type?: AstNode;
    };
    return this.nodeFactory.updateParameterDeclaration(
      parameter,
      fields.modifiers,
      fields.dotDotDotToken,
      name,
      fields.questionToken,
      fields.type,
      undefined,
    );
  }

  addInitializationStatement(node: AstNode): void {
    const scope = this.varStack[this.varStack.length - 1];
    if (scope === undefined) {
      throw new Error("Tried to add an initialization statement without a surrounding variable scope");
    }
    this.addEmitFlags(node, EmitFlags.CustomPrologue);
    scope.initializationStatements.push(node);
  }

  visitFunctionBody(node: AstNode | undefined, visitor: NodeVisitor): AstNode | undefined {
    const updated = node === undefined ? undefined : visitor.visitNode(node);
    const declarations = this.endVariableEnvironment() as readonly AstNode[];
    if (declarations.length === 0) return updated;
    if (updated === undefined) {
      return this.nodeFactory.newBlock(declarations as readonly Statement[]);
    }
    if (updated.kind !== Kind.Block) {
      const statements = this.mergeEnvironment([this.nodeFactory.newReturnStatement(updated) as unknown as Statement], declarations as readonly Statement[]);
      return this.nodeFactory.newBlock(statements);
    }
    const statementList = (updated as unknown as { readonly statements?: StatementList }).statements;
    const merged = this.mergeEnvironmentList(statementList ?? [], declarations as readonly Statement[]);
    return createBlock(merged as never, (updated as unknown as { readonly multiLine?: boolean }).multiLine ?? true) as unknown as AstNode;
  }

  visitIterationBody(body: Statement | undefined, visitor: NodeVisitor): Statement | undefined {
    if (body === undefined) return undefined;
    this.startLexicalEnvironment();
    const updated = this.visitEmbeddedStatement(body, visitor);
    if (updated === undefined) throw new Error("Expected visitor to return a statement.");
    const statements = this.endLexicalEnvironment() as readonly Statement[];
    if (statements.length === 0) return updated;
    if (updated.kind === Kind.Block) {
      const blockStatements = statementListElements((updated as unknown as { readonly statements?: StatementList }).statements ?? []);
      return createBlock(
        createNodeArray([...statements, ...blockStatements]) as unknown as StatementList,
        (updated as unknown as { readonly multiLine?: boolean }).multiLine ?? true,
      ) as unknown as Statement;
    }
    return this.nodeFactory.newBlock([...statements, updated]) as unknown as Statement;
  }

  visitEmbeddedStatement(node: Statement | undefined, visitor: NodeVisitor): Statement | undefined {
    if (node === undefined) return undefined;
    const embeddedStatement = visitor.visitEmbeddedStatement?.(node) ?? visitor.visitNode(node);
    if (embeddedStatement === undefined || embeddedStatement.kind === Kind.NotEmittedStatement) {
      const emptyStatement = this.nodeFactory.newEmptyStatement() as unknown as Statement;
      emptyStatement.pos = node.pos;
      emptyStatement.end = node.end;
      this.setOriginal(emptyStatement as unknown as AstNode, node as unknown as AstNode);
      this.assignCommentRange(emptyStatement as unknown as AstNode, node as unknown as AstNode);
      return emptyStatement;
    }
    return embeddedStatement as unknown as Statement;
  }

  setSyntheticLeadingComments(node: AstNode, comments: readonly SynthesizedComment[]): AstNode {
    this.syntheticLeadingCommentsMap.set(node, comments);
    return node;
  }
  addSyntheticLeadingComment(node: AstNode, kind: Kind, text: string, hasTrailingNewLine = false): AstNode {
    this.syntheticLeadingCommentsMap.set(node, [
      ...this.getSyntheticLeadingComments(node),
      { kind, text, hasTrailingNewLine, loc: { pos: -1, end: -1 } as TextRange },
    ]);
    return node;
  }
  getSyntheticLeadingComments(node: AstNode): readonly SynthesizedComment[] {
    return this.syntheticLeadingCommentsMap.get(node) ?? [];
  }
  setSyntheticTrailingComments(node: AstNode, comments: readonly SynthesizedComment[]): AstNode {
    this.syntheticTrailingCommentsMap.set(node, comments);
    return node;
  }
  addSyntheticTrailingComment(node: AstNode, kind: Kind, text: string, hasTrailingNewLine = false): AstNode {
    this.syntheticTrailingCommentsMap.set(node, [
      ...this.getSyntheticTrailingComments(node),
      { kind, text, hasTrailingNewLine, loc: { pos: -1, end: -1 } as TextRange },
    ]);
    return node;
  }
  getSyntheticTrailingComments(node: AstNode): readonly SynthesizedComment[] {
    return this.syntheticTrailingCommentsMap.get(node) ?? [];
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
    this.assignCommentRange(ns, node);
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
  visitNodes?(nodes: StatementList): StatementList;
  visitEmbeddedStatement?(node: Statement): Statement | undefined;
}

function statementListElements(statements: StatementList | readonly Statement[]): readonly Statement[] {
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

function appendUnique<T>(target: T[], item: T): void {
  if (!target.includes(item)) target.push(item);
}

function nodeText(node: AstNode): string {
  return (node as unknown as { readonly text?: string }).text ?? "";
}

function visitNodes(visitor: NodeVisitor, nodes: StatementList): StatementList {
  if (visitor.visitNodes !== undefined) return visitor.visitNodes(nodes);
  const elements = statementListElements(nodes);
  let changed = false;
  const visited = elements.map((node) => {
    const next = visitor.visitNode(node as unknown as AstNode) as unknown as Statement;
    if (next !== node) changed = true;
    return next;
  });
  return changed ? createNodeArray(visited) as unknown as StatementList : nodes;
}

function isBindingPattern(node: AstNode): boolean {
  return node.kind === Kind.ObjectBindingPattern || node.kind === Kind.ArrayBindingPattern;
}

// Suppress unused-import warnings
export type _Comment = CommentRange;
