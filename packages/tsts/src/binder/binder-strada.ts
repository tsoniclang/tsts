/**
 * Strada-shaped binder skeleton.
 *
 * Substantive port of TS-Go `internal/binder/binder.go` (~2805 LoC).
 * The original Strada Binder runs a full ancestor-tracking visit
 * over a SourceFile, building symbol tables, flow nodes, and
 * narrowing markers. This file provides a faithful method-API skeleton
 * (state declarations, ~80 method signatures) with stubbed bodies.
 * Baseline tests against the upstream binder corpus drive incremental
 * fill-in.
 *
 * The existing `binder.ts` provides a working minimal binder used by
 * downstream code; this file is a separate Strada-modeled API that
 * will eventually subsume it.
 *
 * Cross-module deps forward-declared at file end.
 */

import type {
  Node as AstNode,
  SourceFile,
  Symbol as AstSymbol,
  SymbolTable,
  ModuleInstanceState,
  FlowNode,
  FlowLabel,
  FlowList,
  Diagnostic,
} from "../ast/index.js";

// ---------------------------------------------------------------------------
// ContainerFlags (constant-union, no enums)
// ---------------------------------------------------------------------------

export type ContainerFlags = number;
export const ContainerFlags = {
  None: 0 as ContainerFlags,
  IsContainer: (1 << 0) as ContainerFlags,
  IsBlockScopedContainer: (1 << 1) as ContainerFlags,
  IsControlFlowContainer: (1 << 2) as ContainerFlags,
  IsFunctionLike: (1 << 3) as ContainerFlags,
  IsFunctionExpression: (1 << 4) as ContainerFlags,
  HasLocals: (1 << 5) as ContainerFlags,
  IsInterface: (1 << 6) as ContainerFlags,
  IsObjectLiteralOrClassExpressionMethodOrAccessor: (1 << 7) as ContainerFlags,
} as const;

// ---------------------------------------------------------------------------
// ExpandoAssignmentInfo + ActiveLabel
// ---------------------------------------------------------------------------

export interface ExpandoAssignmentInfo {
  node: AstNode;
  symbolFlags: number;
  symbolExcludes: number;
}

export interface ActiveLabel {
  next: ActiveLabel | undefined;
  name: string;
  breakTarget: FlowNode | undefined;
  continueTarget: FlowNode | undefined;
  referenced: boolean;
}

// ---------------------------------------------------------------------------
// Binder class
// ---------------------------------------------------------------------------

export class Binder {
  file: SourceFile | undefined;
  options: CompilerOptions | undefined;
  parent: AstNode | undefined;
  container: AstNode | undefined;
  thisParentContainer: AstNode | undefined;
  blockScopeContainer: AstNode | undefined;
  lastContainer: AstNode | undefined;
  delayedTypeAliases: AstNode[] = [];
  seenThisKeyword = false;
  currentFlow: FlowNode | undefined;
  currentBreakTarget: FlowLabel | undefined;
  currentContinueTarget: FlowLabel | undefined;
  currentReturnTarget: FlowLabel | undefined;
  currentTrueTarget: FlowLabel | undefined;
  currentFalseTarget: FlowLabel | undefined;
  currentExceptionTarget: FlowLabel | undefined;
  preSwitchCaseFlow: FlowNode | undefined;
  activeLabelList: ActiveLabel | undefined;
  hasExplicitReturn = false;
  emitFlags = 0;
  inStrictMode = false;
  inAssignmentPattern = false;
  symbolCount = 0;
  classifiableNames: Map<string, boolean> = new Map();
  bind: (node: AstNode) => boolean = () => false;
  diagnostics: Diagnostic[] = [];
  expandoAssignments: ExpandoAssignmentInfo[] = [];

  constructor() {
    this.bind = (n) => this.bindNode(n);
  }

  // -------------------------------------------------------------------------
  // Symbol creation + declaration
  // -------------------------------------------------------------------------

  newSymbol(flags: number, name: string): AstSymbol {
    this.symbolCount += 1;
    return { flags, name, declarations: [] } as unknown as AstSymbol;
  }

  declareSymbol(
    symbolTable: SymbolTable, parent: AstSymbol | undefined,
    node: AstNode, includes: number, excludes: number,
  ): AstSymbol {
    return this.declareSymbolEx(symbolTable, parent, node, includes, excludes, false, false);
  }

  declareSymbolEx(
    symbolTable: SymbolTable, parent: AstSymbol | undefined,
    node: AstNode, includes: number, excludes: number,
    isReplaceableByMethod: boolean, isComputedName: boolean,
  ): AstSymbol {
    void isReplaceableByMethod; void isComputedName;
    const name = this.getDeclarationName(node);
    // Look up an existing symbol; merge declarations if compatible.
    const existing = name !== "" ? symbolTable.get(name) : undefined;
    if (existing !== undefined) {
      const existingFlags = (existing as unknown as { flags?: number }).flags ?? 0;
      if ((existingFlags & excludes) === 0) {
        // Compatible merge.
        (existing as unknown as { flags?: number }).flags = existingFlags | includes;
        (existing as unknown as { declarations?: AstNode[] }).declarations?.push(node);
        if (parent !== undefined) {
          (existing as unknown as { parent?: AstSymbol }).parent = parent;
        }
        return existing;
      }
      // Conflict — fall through to creating a new symbol; downstream
      // duplicate-identifier diagnostics handle the user-facing error.
    }
    const symbol = this.newSymbol(includes, name);
    (symbol as unknown as { declarations?: AstNode[] }).declarations = [node];
    if (parent !== undefined) {
      (symbol as unknown as { parent?: AstSymbol }).parent = parent;
    }
    if (name !== "") symbolTable.set(name, symbol);
    return symbol;
  }

  getDeclarationName(node: AstNode): string {
    const name = (node as unknown as { name?: { text?: string; kind?: number } }).name;
    if (name?.text !== undefined) return name.text;
    // For default exports, conventionally "default".
    return "";
  }
  getDisplayName(node: AstNode): string {
    return this.getDeclarationName(node);
  }

  declareModuleMember(node: AstNode, symbolFlags: number, symbolExcludes: number): AstSymbol {
    // Module members go into the current container's symbol.exports
    // when the container is a module, else into its locals.
    const container = this.container;
    if (container === undefined) return this.newSymbol(symbolFlags, this.getDeclarationName(node));
    const containerSym = (container as unknown as { symbol?: AstSymbol }).symbol;
    const table = (containerSym as unknown as { exports?: SymbolTable })?.exports
      ?? (container as unknown as { locals?: SymbolTable }).locals;
    if (table === undefined) return this.newSymbol(symbolFlags, this.getDeclarationName(node));
    return this.declareSymbol(table, containerSym, node, symbolFlags, symbolExcludes);
  }

  declareClassMember(node: AstNode, symbolFlags: number, symbolExcludes: number): AstSymbol {
    // Class members go into the class symbol's members or exports
    // (for static members), based on the static modifier.
    const container = this.container;
    if (container === undefined) return this.newSymbol(symbolFlags, this.getDeclarationName(node));
    const containerSym = (container as unknown as { symbol?: AstSymbol }).symbol;
    const modifiers = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
    const isStatic = modifiers !== undefined && modifiers.some((m) => (m as { kind?: number }).kind === 126 /* StaticKeyword */);
    const table = isStatic
      ? (containerSym as unknown as { exports?: SymbolTable })?.exports
      : (containerSym as unknown as { members?: SymbolTable })?.members;
    if (table === undefined) return this.newSymbol(symbolFlags, this.getDeclarationName(node));
    return this.declareSymbol(table, containerSym, node, symbolFlags, symbolExcludes);
  }

  declareSourceFileMember(node: AstNode, symbolFlags: number, symbolExcludes: number): AstSymbol {
    const file = this.file;
    if (file === undefined) return this.newSymbol(symbolFlags, this.getDeclarationName(node));
    const isExternalModule = (file as unknown as { externalModuleIndicator?: AstNode }).externalModuleIndicator !== undefined;
    if (isExternalModule) {
      // Export-style member.
      return this.declareModuleMember(node, symbolFlags, symbolExcludes);
    }
    const locals = (file as unknown as { locals?: SymbolTable }).locals;
    if (locals === undefined) return this.newSymbol(symbolFlags, this.getDeclarationName(node));
    return this.declareSymbol(locals, undefined, node, symbolFlags, symbolExcludes);
  }

  declareSymbolAndAddToSymbolTable(node: AstNode, symbolFlags: number, symbolExcludes: number): AstSymbol {
    return this.declareSourceFileMember(node, symbolFlags, symbolExcludes);
  }

  // -------------------------------------------------------------------------
  // Flow node factories
  // -------------------------------------------------------------------------

  newFlowNode(flags: number): FlowNode { return { flags } as unknown as FlowNode; }
  newFlowNodeEx(flags: number, node: AstNode, antecedent: FlowNode | undefined): FlowNode {
    void node; void antecedent;
    return { flags } as unknown as FlowNode;
  }
  createLoopLabel(): FlowLabel { return { antecedents: undefined } as unknown as FlowLabel; }
  createBranchLabel(): FlowLabel { return { antecedents: undefined } as unknown as FlowLabel; }
  createReduceLabel(target: FlowLabel, antecedents: FlowList | undefined, antecedent: FlowNode): FlowNode {
    void target; void antecedents; void antecedent;
    return this.newFlowNode(0);
  }
  createFlowCondition(flags: number, antecedent: FlowNode, expression: AstNode): FlowNode {
    void expression; void antecedent;
    return this.newFlowNode(flags);
  }
  createFlowMutation(flags: number, antecedent: FlowNode, node: AstNode): FlowNode {
    void node; void antecedent;
    return this.newFlowNode(flags);
  }
  createFlowSwitchClause(
    antecedent: FlowNode, switchStatement: AstNode, clauseStart: number, clauseEnd: number,
  ): FlowNode {
    void antecedent; void switchStatement; void clauseStart; void clauseEnd;
    return this.newFlowNode(0);
  }
  createFlowCall(antecedent: FlowNode, node: AstNode): FlowNode {
    void antecedent; void node;
    return this.newFlowNode(0);
  }

  newFlowList(head: FlowNode, tail: FlowList | undefined): FlowList {
    return { head, tail } as unknown as FlowList;
  }
  combineFlowLists(head: FlowList | undefined, tail: FlowList | undefined): FlowList | undefined {
    if (head === undefined) return tail;
    return head;
  }

  newSingleDeclaration(declaration: AstNode): AstNode[] { return [declaration]; }

  addAntecedent(label: FlowLabel, antecedent: FlowNode): void { void label; void antecedent; }
  finishFlowLabel(label: FlowLabel): FlowNode { return label as unknown as FlowNode; }

  // -------------------------------------------------------------------------
  // Main bind dispatch
  // -------------------------------------------------------------------------

  bindNode(node: AstNode): boolean {
    void node;
    return true;
  }

  bindPropertyWorker(node: AstNode): void { void node; }
  bindSourceFileIfExternalModule(): void { /* deferred */ }
  bindSourceFileAsExternalModule(): void { /* deferred */ }

  bindModuleDeclaration(node: AstNode): void { void node; }
  declareModuleSymbol(node: AstNode): ModuleInstanceState { void node; return 0 as ModuleInstanceState; }
  bindNamespaceExportDeclaration(node: AstNode): void { void node; }
  bindImportClause(node: AstNode): void { void node; }
  bindExportDeclaration(node: AstNode): void { void node; }
  bindExportAssignment(node: AstNode): void { void node; }
  trackNestedCJSExport(node: AstNode): void { void node; }
  bindJsxAttributes(node: AstNode): void { void node; }
  bindJsxAttribute(node: AstNode, symbolFlags: number, symbolExcludes: number): void {
    void node; void symbolFlags; void symbolExcludes;
  }
  setExportContextFlag(node: AstNode): void { void node; }
  hasExportDeclarations(node: AstNode): boolean { void node; return false; }

  bindFunctionExpression(node: AstNode): void { void node; }
  bindCallExpression(node: AstNode): void { void node; }
  setCommonJSModuleIndicator(node: AstNode): boolean { void node; return false; }
  bindClassLikeDeclaration(node: AstNode): void { void node; }
  bindPropertyOrMethodOrAccessor(node: AstNode, symbolFlags: number, symbolExcludes: number): void {
    void node; void symbolFlags; void symbolExcludes;
  }
  bindFunctionOrConstructorType(node: AstNode): void { void node; }

  // -------------------------------------------------------------------------
  // Expando + CommonJS handling
  // -------------------------------------------------------------------------

  addLateBoundAssignmentDeclarationToSymbol(node: AstNode, symbol: AstSymbol): void {
    void node; void symbol;
  }
  bindModuleExportsAssignment(node: AstNode): void { void node; }
  bindExpandoPropertyAssignment(node: AstNode): void { void node; }
  bindDeferredExpandoAssignments(): void { /* deferred */ }
  bindCommonJSTypeExports(moduleSymbol: AstSymbol): void { void moduleSymbol; }
  bindDeferredExpandoAssignment(node: AstNode): void { void node; }
  bindExportsOrObjectDefineProperty(node: AstNode): void { void node; }
  bindThisPropertyAssignment(node: AstNode): void { void node; }
  getThisClassAndSymbolTable(): { classSymbol: AstSymbol | undefined; symbolTable: SymbolTable | undefined } {
    return { classSymbol: undefined, symbolTable: undefined };
  }

  // -------------------------------------------------------------------------
  // Per-kind binders
  // -------------------------------------------------------------------------

  bindEnumDeclaration(node: AstNode): void { void node; }
  bindVariableDeclarationOrBindingElement(node: AstNode): void { void node; }
  bindParameter(node: AstNode): void { void node; }
  bindFunctionDeclaration(node: AstNode): void { void node; }
  getInferTypeContainer(node: AstNode): AstNode | undefined { void node; return undefined; }
  bindAnonymousDeclaration(node: AstNode, symbolFlags: number, name: string): void {
    void node; void symbolFlags; void name;
  }
  bindBlockScopedDeclaration(node: AstNode, symbolFlags: number, symbolExcludes: number): void {
    void node; void symbolFlags; void symbolExcludes;
  }
  bindTypeParameter(node: AstNode): void { void node; }

  // -------------------------------------------------------------------------
  // Name lookup
  // -------------------------------------------------------------------------

  lookupEntity(node: AstNode, container: AstNode): AstSymbol | undefined {
    void node; void container;
    return undefined;
  }

  lookupName(name: string, container: AstNode): AstSymbol | undefined {
    void name; void container;
    return undefined;
  }

  // -------------------------------------------------------------------------
  // Identifier checks
  // -------------------------------------------------------------------------

  checkContextualIdentifier(node: AstNode): void { void node; }
  checkPrivateIdentifier(node: AstNode): void { void node; }

  getStrictModeIdentifierMessage(node: AstNode): unknown {
    void node;
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Module-level entry points
// ---------------------------------------------------------------------------

const binderPool: Binder[] = [];

function getBinder(): Binder {
  const b = binderPool.pop();
  if (b !== undefined) return b;
  return new Binder();
}

function putBinder(b: Binder): void {
  binderPool.push(b);
}

export function BindSourceFile(file: SourceFile): void {
  const b = getBinder();
  b.file = file;
  try {
    bindSourceFileImpl(b, file);
  } finally {
    putBinder(b);
  }
}

function bindSourceFileImpl(b: Binder, file: SourceFile): void {
  void b; void file;
  // Full visit pass deferred — drives bindNode through the entire AST.
}

export function getSymbolNameForPrivateIdentifier(containingClassSymbol: AstSymbol, description: string): string {
  void containingClassSymbol;
  return `__#${description}`;
}

export function setFlowNodeReferenced(flow: FlowNode): void { void flow; }

export function getParentOfPropertyAssignment(node: AstNode): AstNode | undefined {
  void node;
  return undefined;
}

export function getInitializerSymbol(symbol: AstSymbol): AstSymbol | undefined {
  void symbol;
  return undefined;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface CompilerOptions { readonly _opts?: unknown }
