/**
 * Checker semantic pipeline support.
 *
 * TS-Go keeps source-element scheduling, deferred checks, type-resolution
 * cycle detection, diagnostics, declaration-space checks, and unused-symbol
 * reporting inside `checker.go`. TSTS splits the main checker, so this file
 * carries the corresponding reusable pipeline machinery without inventing a
 * second flow.
 */

import type { Node as AstNode, SourceFile, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { CheckDiagnostic } from "./checker.checkedtype.js";
import type { Type, Signature } from "./types.js";
import { TypeFlags } from "./types.js";

export type DeferredCheckKind =
  | "type-parameter"
  | "signature"
  | "function-body"
  | "class-members"
  | "object-literal"
  | "module-augmentation"
  | "jsdoc"
  | "decorator"
  | "unused";

export type SourceElementReachability = "reachable" | "unreachable" | "deferred" | "skipped";

export type DeclarationSpace = number;
export const DeclarationSpace = {
  None: 0 as DeclarationSpace,
  Value: 1 << 0,
  Type: 1 << 1,
  Namespace: 1 << 2,
  ExportValue: 1 << 3,
  ExportType: 1 << 4,
  ExportNamespace: 1 << 5,
  All: (1 << 6) - 1,
} as const;

export type TypeResolutionProperty =
  | "type"
  | "declared-type"
  | "resolved-return-type"
  | "resolved-base-constraint"
  | "resolved-type-arguments"
  | "resolved-base-types"
  | "write-type"
  | "alias-target";

export interface SemanticPipelineState {
  readonly deferred: DeferredCheck[];
  readonly diagnostics: CheckDiagnostic[];
  readonly suggestions: CheckDiagnostic[];
  readonly resolutionStack: TypeResolutionFrame[];
  readonly unreachableNodes: Set<AstNode>;
  readonly referencedSymbols: Set<AstSymbol>;
  readonly unusedCandidates: AstNode[];
  readonly deferredDiagnostics: Array<() => void>;
  currentSourceFile?: SourceFile;
  checkingDeferredNode?: AstNode;
}

export interface DeferredCheck {
  readonly kind: DeferredCheckKind;
  readonly node: AstNode;
  readonly reason: string;
  readonly run: () => void;
}

export interface TypeResolutionFrame {
  readonly target: Type | Signature | AstSymbol | AstNode;
  readonly property: TypeResolutionProperty;
  result: boolean;
}

export interface SourceElementPlan {
  readonly node: AstNode;
  readonly reachability: SourceElementReachability;
  readonly action: "check-now" | "defer" | "mark-unreachable" | "ignore";
  readonly deferredKind?: DeferredCheckKind;
}

export interface DeclarationConflict {
  readonly name: string;
  readonly space: DeclarationSpace;
  readonly first: AstNode;
  readonly next: AstNode;
}

export interface UnusedReport {
  readonly node: AstNode;
  readonly kind: "local" | "parameter" | "import" | "private-member" | "type-parameter";
  readonly name: string;
  readonly isError: boolean;
}

export function createSemanticPipelineState(): SemanticPipelineState {
  return {
    deferred: [],
    diagnostics: [],
    suggestions: [],
    resolutionStack: [],
    unreachableNodes: new Set(),
    referencedSymbols: new Set(),
    unusedCandidates: [],
    deferredDiagnostics: [],
  };
}

export function planSourceElements(nodes: readonly AstNode[], state: SemanticPipelineState): readonly SourceElementPlan[] {
  const plans: SourceElementPlan[] = [];
  let reachable = true;
  for (const node of nodes) {
    if (!reachable) {
      state.unreachableNodes.add(node);
      plans.push({ node, reachability: "unreachable", action: "mark-unreachable" });
      reachable = !statementDefinitelyTerminates(node);
      continue;
    }
    const deferredKind = deferredKindForSourceElement(node);
    if (deferredKind !== undefined) {
      plans.push({ node, reachability: "deferred", action: "defer", deferredKind });
    } else if (shouldIgnoreSourceElement(node)) {
      plans.push({ node, reachability: "skipped", action: "ignore" });
    } else {
      plans.push({ node, reachability: "reachable", action: "check-now" });
    }
    if (statementDefinitelyTerminates(node)) reachable = false;
  }
  return plans;
}

export function scheduleSourceElementChecks(
  nodes: readonly AstNode[],
  state: SemanticPipelineState,
  checkNow: (node: AstNode) => void,
): void {
  for (const plan of planSourceElements(nodes, state)) {
    switch (plan.action) {
      case "check-now":
        checkNow(plan.node);
        break;
      case "defer":
        state.deferred.push({
          kind: plan.deferredKind ?? "function-body",
          node: plan.node,
          reason: "source element requires declaration symbols before body checking",
          run: () => checkNow(plan.node),
        });
        break;
      case "mark-unreachable":
        state.diagnostics.push({ message: "Unreachable code detected." });
        break;
      case "ignore":
        break;
    }
  }
}

export function drainDeferredChecks(state: SemanticPipelineState): void {
  while (state.deferred.length !== 0) {
    const deferred = state.deferred.shift();
    if (deferred === undefined) break;
    const previous = state.checkingDeferredNode;
    state.checkingDeferredNode = deferred.node;
    deferred.run();
    if (previous === undefined) {
      delete state.checkingDeferredNode;
    } else {
      state.checkingDeferredNode = previous;
    }
  }
}

export function addDeferredDiagnostic(state: SemanticPipelineState, callback: () => void): void {
  state.deferredDiagnostics.push(callback);
}

export function produceDeferredDiagnostics(state: SemanticPipelineState): void {
  while (state.deferredDiagnostics.length !== 0) {
    const callback = state.deferredDiagnostics.shift();
    callback?.();
  }
}

export function pushTypeResolution(
  state: SemanticPipelineState,
  target: Type | Signature | AstSymbol | AstNode,
  property: TypeResolutionProperty,
): boolean {
  const cycleStart = findResolutionCycleStartIndex(state, target, property);
  if (cycleStart >= 0) {
    for (let index = cycleStart; index < state.resolutionStack.length; index += 1) {
      state.resolutionStack[index]!.result = false;
    }
    return false;
  }
  state.resolutionStack.push({ target, property, result: true });
  return true;
}

export function popTypeResolution(state: SemanticPipelineState): boolean {
  const frame = state.resolutionStack.pop();
  return frame?.result ?? true;
}

export function findResolutionCycleStartIndex(
  state: SemanticPipelineState,
  target: Type | Signature | AstSymbol | AstNode,
  property: TypeResolutionProperty,
): number {
  for (let index = state.resolutionStack.length - 1; index >= 0; index -= 1) {
    const frame = state.resolutionStack[index]!;
    if (frame.target === target && frame.property === property) return index;
  }
  return -1;
}

export function typeResolutionHasProperty(frame: TypeResolutionFrame, property: TypeResolutionProperty): boolean {
  return frame.property === property;
}

export function reportCircularityError(
  state: SemanticPipelineState,
  symbol: AstSymbol,
  fallbackType: Type,
): Type {
  state.diagnostics.push({
    message: `Type of '${displaySymbolName(symbol)}' circularly references itself.`,
  });
  return fallbackType;
}

export function error(state: SemanticPipelineState, location: AstNode | undefined, message: string): CheckDiagnostic {
  void location;
  const diagnostic = { message };
  state.diagnostics.push(diagnostic);
  return diagnostic;
}

export function suggestion(state: SemanticPipelineState, location: AstNode | undefined, message: string): CheckDiagnostic {
  void location;
  const diagnostic = { message };
  state.suggestions.push(diagnostic);
  return diagnostic;
}

export function errorAndMaybeSuggestAwait(
  state: SemanticPipelineState,
  location: AstNode | undefined,
  maybeMissingAwait: boolean,
  message: string,
): CheckDiagnostic {
  const diagnostic = error(state, location, message);
  if (maybeMissingAwait) {
    suggestion(state, location, `${message} Did you forget to use 'await'?`);
  }
  return diagnostic;
}

export function getDeclarationSpaces(node: AstNode): DeclarationSpace {
  switch (node.kind) {
    case Kind.VariableDeclaration:
    case Kind.Parameter:
    case Kind.BindingElement:
      return DeclarationSpace.Value;
    case Kind.FunctionDeclaration:
    case Kind.ClassDeclaration:
      return DeclarationSpace.Value | DeclarationSpace.Type;
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
      return DeclarationSpace.Type;
    case Kind.EnumDeclaration:
      return DeclarationSpace.Value | DeclarationSpace.Type | DeclarationSpace.Namespace;
    case Kind.ModuleDeclaration:
      return DeclarationSpace.Namespace;
    case Kind.ImportDeclaration:
    case Kind.ImportEqualsDeclaration:
      return DeclarationSpace.Value | DeclarationSpace.Type | DeclarationSpace.Namespace;
    case Kind.ExportDeclaration:
      return DeclarationSpace.ExportValue | DeclarationSpace.ExportType | DeclarationSpace.ExportNamespace;
    default:
      return DeclarationSpace.None;
  }
}

export function detectDeclarationConflicts(declarations: readonly AstNode[]): readonly DeclarationConflict[] {
  const seen = new Map<string, { readonly node: AstNode; readonly space: DeclarationSpace }>();
  const conflicts: DeclarationConflict[] = [];
  for (const declaration of declarations) {
    const name = declarationName(declaration);
    if (name.length === 0) continue;
    const space = getDeclarationSpaces(declaration);
    const previous = seen.get(name);
    if (previous !== undefined && (previous.space & space) !== 0) {
      conflicts.push({ name, space: previous.space & space, first: previous.node, next: declaration });
    } else {
      seen.set(name, { node: declaration, space });
    }
  }
  return conflicts;
}

export function checkTypeParametersNotReferenced(
  root: AstNode,
  typeParameters: readonly AstNode[],
  startIndex: number,
  state: SemanticPipelineState,
): void {
  const names = new Set(typeParameters.slice(startIndex).map(declarationName).filter(name => name.length !== 0));
  if (names.size === 0) return;
  walkNode(root, node => {
    const name = declarationName(node);
    if (names.has(name)) {
      state.diagnostics.push({
        message: `Type parameter '${name}' has a circular constraint.`,
      });
    }
  });
}

export function registerForUnusedIdentifiersCheck(state: SemanticPipelineState, node: AstNode): void {
  state.unusedCandidates.push(node);
}

export function symbolReferenced(state: SemanticPipelineState, symbol: AstSymbol): void {
  state.referencedSymbols.add(symbol);
}

export function isReferenced(state: SemanticPipelineState, symbol: AstSymbol): boolean {
  if (state.referencedSymbols.has(symbol)) return true;
  const exportSymbol = symbol.exportSymbol;
  return exportSymbol !== undefined && state.referencedSymbols.has(exportSymbol);
}

export function collectUnusedReports(
  state: SemanticPipelineState,
  symbolsForNode: (node: AstNode) => readonly AstSymbol[],
): readonly UnusedReport[] {
  const reports: UnusedReport[] = [];
  for (const node of state.unusedCandidates) {
    for (const symbol of symbolsForNode(node)) {
      if (isReferenced(state, symbol)) continue;
      const name = displaySymbolName(symbol);
      if (name.length === 0 || name.startsWith("_")) continue;
      reports.push({
        node,
        kind: unusedKindForNode(node),
        name,
        isError: unusedIsError(unusedKindForNode(node)),
      });
    }
  }
  return reports;
}

export function reportUnusedIdentifiers(
  state: SemanticPipelineState,
  symbolsForNode: (node: AstNode) => readonly AstSymbol[],
): void {
  for (const report of collectUnusedReports(state, symbolsForNode)) {
    state.diagnostics.push({
      message: formatUnusedMessage(report),
    });
  }
}

export function checkResolvedBlockScopedVariable(
  state: SemanticPipelineState,
  symbol: AstSymbol,
  usage: AstNode,
): void {
  const declaration = firstDeclaration(symbol);
  if (declaration === undefined) return;
  if (!isBlockScopedDeclaration(declaration)) return;
  if (isBlockScopedNameDeclaredBeforeUse(declaration, usage)) return;
  state.diagnostics.push({
    message: `Block-scoped variable '${displaySymbolName(symbol)}' used before its declaration.`,
  });
}

export function isBlockScopedNameDeclaredBeforeUse(declaration: AstNode, usage: AstNode): boolean {
  const declarationFile = sourceFileIdentity(declaration);
  const usageFile = sourceFileIdentity(usage);
  if (declarationFile !== usageFile) return true;
  const declarationStart = nodePos(declaration);
  const usageStart = nodePos(usage);
  if (declarationStart < usageStart) return true;
  if (declarationStart === usageStart) return true;
  return isImmediatelyUsedInInitializerOfBlockScopedVariable(declaration, usage);
}

export function isImmediatelyUsedInInitializerOfBlockScopedVariable(declaration: AstNode, usage: AstNode): boolean {
  const declarationParent = nodeParent(declaration);
  if (declarationParent === undefined) return false;
  let current: AstNode | undefined = usage;
  while (current !== undefined && current !== declarationParent) {
    if (current === declaration) return true;
    current = nodeParent(current);
  }
  return false;
}

export function isSameScopeDescendentOf(initial: AstNode, parent: AstNode, stopAt: AstNode): boolean {
  let current: AstNode | undefined = initial;
  while (current !== undefined && current !== stopAt) {
    if (current === parent) return true;
    if (createsNewScope(current)) return false;
    current = nodeParent(current);
  }
  return false;
}

export function isPropertyImmediatelyReferencedWithinDeclaration(
  declaration: AstNode,
  usage: AstNode,
  stopAtAnyPropertyDeclaration: boolean,
): boolean {
  let current: AstNode | undefined = usage;
  while (current !== undefined) {
    if (current === declaration) return true;
    if (stopAtAnyPropertyDeclaration && isPropertyDeclarationLike(current)) return false;
    if (current.kind === Kind.FunctionDeclaration || current.kind === Kind.FunctionExpression || current.kind === Kind.ArrowFunction) return false;
    current = nodeParent(current);
  }
  return false;
}

export function checkAndReportErrorForUsingTypeAsValue(
  state: SemanticPipelineState,
  errorLocation: AstNode,
  name: string,
  symbol: AstSymbol | undefined,
): boolean {
  if (symbol === undefined) return false;
  if (((symbol.flags ?? 0) & SymbolFlags.Type) === 0) return false;
  if (((symbol.flags ?? 0) & SymbolFlags.Value) !== 0) return false;
  state.diagnostics.push({ message: `'${name}' only refers to a type, but is being used as a value here.` });
  void errorLocation;
  return true;
}

export function checkAndReportErrorForUsingValueAsType(
  state: SemanticPipelineState,
  errorLocation: AstNode,
  name: string,
  symbol: AstSymbol | undefined,
): boolean {
  if (symbol === undefined) return false;
  if (((symbol.flags ?? 0) & SymbolFlags.Value) === 0) return false;
  if (((symbol.flags ?? 0) & SymbolFlags.Type) !== 0) return false;
  state.diagnostics.push({ message: `'${name}' refers to a value, but is being used as a type here.` });
  void errorLocation;
  return true;
}

export function checkAndReportErrorForUsingNamespaceAsTypeOrValue(
  state: SemanticPipelineState,
  errorLocation: AstNode,
  name: string,
  meaning: SymbolFlags,
  symbol: AstSymbol | undefined,
): boolean {
  if (symbol === undefined) return false;
  if (((symbol.flags ?? 0) & SymbolFlags.Namespace) === 0) return false;
  if ((meaning & (SymbolFlags.Type | SymbolFlags.Value)) === 0) return false;
  state.diagnostics.push({ message: `Cannot use namespace '${name}' as a type or value.` });
  void errorLocation;
  return true;
}

export function checkAndReportErrorForExportingPrimitiveType(
  state: SemanticPipelineState,
  errorLocation: AstNode,
  name: string,
): boolean {
  if (!isPrimitiveTypeName(name)) return false;
  state.diagnostics.push({ message: `Cannot export primitive type '${name}'.` });
  void errorLocation;
  return true;
}

export function checkAndReportErrorForInvalidInitializer(
  state: SemanticPipelineState,
  errorLocation: AstNode,
  name: string,
  propertyWithInvalidInitializer: AstNode,
  result: AstSymbol | undefined,
): boolean {
  if (result === undefined) return false;
  state.diagnostics.push({
    message: `Initializer for '${name}' references a value before it is declared.`,
  });
  void errorLocation;
  void propertyWithInvalidInitializer;
  return true;
}

export function checkAndReportErrorForMissingPrefix(
  state: SemanticPipelineState,
  errorLocation: AstNode,
  name: string,
): boolean {
  if (!name.startsWith("#")) return false;
  state.diagnostics.push({ message: `Private identifier '${name}' must be declared in an enclosing class.` });
  void errorLocation;
  return true;
}

export function getTypeOnlyAliasDeclaration(symbol: AstSymbol): AstNode | undefined {
  return (symbol as { readonly typeOnlyDeclaration?: AstNode }).typeOnlyDeclaration;
}

export function getImmediateAliasedSymbol(symbol: AstSymbol): AstSymbol | undefined {
  return (symbol as { readonly immediateTarget?: AstSymbol }).immediateTarget;
}

export function addTypeOnlyDeclarationRelatedInfo(
  state: SemanticPipelineState,
  diagnostic: CheckDiagnostic,
  typeOnlyDeclaration: AstNode | undefined,
  name: string,
): CheckDiagnostic {
  if (typeOnlyDeclaration !== undefined) {
    state.suggestions.push({ message: `'${name}' was imported using a type-only import.` });
  }
  return diagnostic;
}

export function getSymbol(symbols: ReadonlyMap<string, AstSymbol>, name: string, meaning: SymbolFlags): AstSymbol | undefined {
  const symbol = symbols.get(name);
  if (symbol === undefined) return undefined;
  return ((symbol.flags ?? 0) & meaning) === 0 ? undefined : symbol;
}

export function mergeSymbolTable(
  target: Map<string, AstSymbol>,
  source: ReadonlyMap<string, AstSymbol>,
  reportConflict: (name: string, targetSymbol: AstSymbol, sourceSymbol: AstSymbol) => void,
): Map<string, AstSymbol> {
  for (const [name, sourceSymbol] of source) {
    const targetSymbol = target.get(name);
    if (targetSymbol === undefined) {
      target.set(name, sourceSymbol);
      continue;
    }
    const merged = mergeSymbol(targetSymbol, sourceSymbol);
    if (merged === undefined) {
      reportConflict(name, targetSymbol, sourceSymbol);
    } else {
      target.set(name, merged);
    }
  }
  return target;
}

export function mergeSymbol(target: AstSymbol, source: AstSymbol): AstSymbol | undefined {
  const targetFlags = target.flags ?? 0;
  const sourceFlags = source.flags ?? 0;
  const excluded = getExcludedSymbolFlags(sourceFlags);
  if ((targetFlags & excluded) !== 0) return undefined;
  const members = mergeOptionalSymbolMaps(target.members, source.members);
  const exports = mergeOptionalSymbolMaps(target.exports, source.exports);
  return {
    ...target,
    flags: targetFlags | sourceFlags,
    declarations: [...target.declarations ?? [], ...source.declarations ?? []],
    ...(members === undefined ? {} : { members }),
    ...(exports === undefined ? {} : { exports }),
  };
}

export function getExcludedSymbolFlags(flags: SymbolFlags): SymbolFlags {
  let result = SymbolFlags.None;
  if ((flags & SymbolFlags.BlockScopedVariable) !== 0) result |= SymbolFlags.Value;
  if ((flags & SymbolFlags.Function) !== 0) result |= SymbolFlags.Value;
  if ((flags & SymbolFlags.Class) !== 0) result |= SymbolFlags.Value | SymbolFlags.Type;
  if ((flags & SymbolFlags.Interface) !== 0) result |= SymbolFlags.Type;
  if ((flags & SymbolFlags.TypeAlias) !== 0) result |= SymbolFlags.Type;
  if ((flags & SymbolFlags.Enum) !== 0) result |= SymbolFlags.Value | SymbolFlags.Type;
  if ((flags & SymbolFlags.ValueModule) !== 0) result |= SymbolFlags.Namespace | SymbolFlags.Value;
  return result;
}

export function cloneSymbol(symbol: AstSymbol): AstSymbol {
  const members = symbol.members === undefined ? undefined : new Map(symbol.members);
  const exports = symbol.exports === undefined ? undefined : new Map(symbol.exports);
  return {
    ...symbol,
    declarations: [...symbol.declarations ?? []],
    ...(members === undefined ? {} : { members }),
    ...(exports === undefined ? {} : { exports }),
  };
}

export function getExportSymbolOfValueSymbolIfExported(symbol: AstSymbol): AstSymbol {
  return symbol.exportSymbol ?? symbol;
}

export function getFirstDeclaration(symbol: AstSymbol): AstNode | undefined {
  return firstDeclaration(symbol);
}

export function declarationName(node: AstNode): string {
  const candidate = node as {
    readonly name?: { readonly text?: string; readonly escapedText?: string } | string;
    readonly text?: string;
    readonly escapedText?: string;
  };
  if (typeof candidate.name === "string") return candidate.name;
  return candidate.name?.text ?? candidate.name?.escapedText ?? candidate.text ?? candidate.escapedText ?? "";
}

export function displaySymbolName(symbol: AstSymbol): string {
  return symbol.escapedName ?? symbol.name ?? "";
}

export function nodePos(node: AstNode): number {
  return (node as { readonly pos?: number; readonly fullStart?: number }).pos
    ?? (node as { readonly fullStart?: number }).fullStart
    ?? 0;
}

export function nodeEnd(node: AstNode): number {
  return (node as { readonly end?: number }).end ?? nodePos(node);
}

export function sourceFileIdentity(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.SourceFile) return current;
    current = nodeParent(current);
  }
  return undefined;
}

export function nodeParent(node: AstNode): AstNode | undefined {
  return node.parent;
}

export function statementDefinitelyTerminates(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.ReturnStatement:
    case Kind.ThrowStatement:
    case Kind.ContinueStatement:
    case Kind.BreakStatement:
      return true;
    case Kind.Block:
      return childrenOf(node).some(statementDefinitelyTerminates);
    case Kind.IfStatement:
      return childrenOf(node).filter(child => child.kind === Kind.Block || child.kind === Kind.ReturnStatement || child.kind === Kind.ThrowStatement).length >= 2;
    default:
      return false;
  }
}

export function deferredKindForSourceElement(node: AstNode): DeferredCheckKind | undefined {
  switch (node.kind) {
    case Kind.FunctionDeclaration:
    case Kind.MethodDeclaration:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
      return "function-body";
    case Kind.ClassDeclaration:
      return "class-members";
    case Kind.TypeParameter:
      return "type-parameter";
    case Kind.ModuleDeclaration:
      return "module-augmentation";
    case Kind.JSDoc:
      return "jsdoc";
    default:
      return undefined;
  }
}

export function shouldIgnoreSourceElement(node: AstNode): boolean {
  return node.kind === Kind.EmptyStatement || node.kind === Kind.NotEmittedStatement;
}

export function unusedKindForNode(node: AstNode): UnusedReport["kind"] {
  switch (node.kind) {
    case Kind.Parameter:
      return "parameter";
    case Kind.ImportDeclaration:
    case Kind.ImportEqualsDeclaration:
    case Kind.ImportSpecifier:
      return "import";
    case Kind.PropertyDeclaration:
    case Kind.MethodDeclaration:
      return "private-member";
    case Kind.TypeParameter:
      return "type-parameter";
    default:
      return "local";
  }
}

export function unusedIsError(kind: UnusedReport["kind"]): boolean {
  return kind === "local" || kind === "parameter";
}

export function formatUnusedMessage(report: UnusedReport): string {
  switch (report.kind) {
    case "local":
      return `'${report.name}' is declared but its value is never read.`;
    case "parameter":
      return `'${report.name}' is declared but its value is never read.`;
    case "import":
      return `'${report.name}' is declared but its import is never used.`;
    case "private-member":
      return `Private member '${report.name}' is declared but never used.`;
    case "type-parameter":
      return `Type parameter '${report.name}' is declared but never used.`;
  }
}

function firstDeclaration(symbol: AstSymbol): AstNode | undefined {
  return symbol.declarations?.[0];
}

function isBlockScopedDeclaration(node: AstNode): boolean {
  return node.kind === Kind.VariableDeclaration
    || node.kind === Kind.Parameter
    || node.kind === Kind.ClassDeclaration
    || node.kind === Kind.EnumDeclaration
    || node.kind === Kind.ImportDeclaration;
}

function createsNewScope(node: AstNode): boolean {
  return node.kind === Kind.SourceFile
    || node.kind === Kind.ModuleBlock
    || node.kind === Kind.FunctionDeclaration
    || node.kind === Kind.FunctionExpression
    || node.kind === Kind.ArrowFunction
    || node.kind === Kind.ClassDeclaration
    || node.kind === Kind.Block;
}

function isPropertyDeclarationLike(node: AstNode): boolean {
  return node.kind === Kind.PropertyDeclaration
    || node.kind === Kind.PropertySignature
    || node.kind === Kind.MethodDeclaration
    || node.kind === Kind.MethodSignature
    || node.kind === Kind.GetAccessor
    || node.kind === Kind.SetAccessor;
}

function isPrimitiveTypeName(name: string): boolean {
  return name === "string"
    || name === "number"
    || name === "boolean"
    || name === "bigint"
    || name === "symbol"
    || name === "undefined"
    || name === "null"
    || name === "object"
    || name === "void"
    || name === "never"
    || name === "unknown"
    || name === "any";
}

function mergeOptionalSymbolMaps(
  left: Map<string, AstSymbol> | undefined,
  right: Map<string, AstSymbol> | undefined,
): Map<string, AstSymbol> | undefined {
  if (left === undefined && right === undefined) return undefined;
  const merged = new Map(left ?? []);
  for (const [name, symbol] of right ?? []) merged.set(name, symbol);
  return merged;
}

function childrenOf(node: AstNode): readonly AstNode[] {
  const candidate = node as {
    readonly statements?: readonly AstNode[];
    readonly children?: readonly AstNode[];
    readonly members?: readonly AstNode[];
    readonly elements?: readonly AstNode[];
  };
  return candidate.statements ?? candidate.children ?? candidate.members ?? candidate.elements ?? [];
}

function walkNode(node: AstNode, visit: (node: AstNode) => void): void {
  visit(node);
  for (const child of childrenOf(node)) walkNode(child, visit);
}

export function typeHasUsablePropertyType(type: Type): boolean {
  return (type.flags & TypeFlags.Any) !== 0
    || (type.flags & TypeFlags.Unknown) !== 0
    || (type.flags & TypeFlags.Object) !== 0
    || (type.flags & TypeFlags.UnionOrIntersection) !== 0;
}
