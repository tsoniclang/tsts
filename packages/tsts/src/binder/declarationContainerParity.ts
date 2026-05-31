/**
 * Declaration-container parity helpers.
 *
 * TS-Go binder centralizes how declarations choose a locals container, export
 * container, and flow container. These helpers keep that decision table shared
 * by the split binder files.
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";

export interface BinderContainerState {
  readonly containerStack: AstNode[];
  readonly blockScopeStack: AstNode[];
  readonly symbolParentStack: AstSymbol[];
  readonly diagnostics: BinderContainerDiagnostic[];
}

export interface BinderContainerDiagnostic {
  readonly node: AstNode;
  readonly message: string;
}

export type DeclarationContainerKind = "none" | "locals" | "members" | "exports" | "block";

export interface DeclarationContainerDecision {
  readonly node: AstNode;
  readonly kind: DeclarationContainerKind;
  readonly symbolFlags: SymbolFlags;
  readonly excludes: SymbolFlags;
  readonly needsLateBinding: boolean;
}

export function createBinderContainerState(): BinderContainerState {
  return {
    containerStack: [],
    blockScopeStack: [],
    symbolParentStack: [],
    diagnostics: [],
  };
}

export function classifyDeclarationContainer(node: AstNode): DeclarationContainerDecision {
  switch (node.kind) {
    case Kind.SourceFile:
    case Kind.ModuleDeclaration:
      return decision(node, "exports", SymbolFlags.Module, SymbolFlags.ValueModuleExcludes, false);
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
      return decision(node, "members", SymbolFlags.Class, SymbolFlags.ClassExcludes, true);
    case Kind.InterfaceDeclaration:
      return decision(node, "members", SymbolFlags.Interface, SymbolFlags.InterfaceExcludes, false);
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
      return decision(node, "locals", SymbolFlags.Function, SymbolFlags.FunctionExcludes, false);
    case Kind.Block:
    case Kind.CaseBlock:
    case Kind.ForStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
      return decision(node, "block", SymbolFlags.BlockScopedVariable, SymbolFlags.BlockScopedVariableExcludes, false);
    case Kind.EnumDeclaration:
      return decision(node, "exports", SymbolFlags.RegularEnum, SymbolFlags.RegularEnumExcludes, false);
    default:
      return decision(node, "none", SymbolFlags.None, SymbolFlags.None, false);
  }
}

export function enterDeclarationContainer(state: BinderContainerState, node: AstNode, symbol: AstSymbol | undefined): DeclarationContainerDecision {
  const container = classifyDeclarationContainer(node);
  if (container.kind === "locals" || container.kind === "members" || container.kind === "exports") state.containerStack.push(node);
  if (container.kind === "block") state.blockScopeStack.push(node);
  if (symbol !== undefined) state.symbolParentStack.push(symbol);
  ensureContainerTables(node, container.kind);
  return container;
}

export function leaveDeclarationContainer(state: BinderContainerState, node: AstNode, symbol: AstSymbol | undefined): void {
  if (state.containerStack[state.containerStack.length - 1] === node) state.containerStack.pop();
  if (state.blockScopeStack[state.blockScopeStack.length - 1] === node) state.blockScopeStack.pop();
  if (symbol !== undefined && state.symbolParentStack[state.symbolParentStack.length - 1] === symbol) state.symbolParentStack.pop();
}

export function currentDeclarationContainer(state: BinderContainerState): AstNode | undefined {
  return state.containerStack[state.containerStack.length - 1];
}

export function currentBlockScopeContainer(state: BinderContainerState): AstNode | undefined {
  return state.blockScopeStack[state.blockScopeStack.length - 1] ?? currentDeclarationContainer(state);
}

export function declareInContainer(container: AstNode, name: string, symbol: AstSymbol): AstSymbol {
  const table = tableForContainer(container, classifyDeclarationContainer(container).kind);
  const existing = table.get(name);
  if (existing !== undefined) return mergeContainerSymbols(existing, symbol);
  table.set(name, symbol);
  return symbol;
}

export function declareBlockScopedName(state: BinderContainerState, name: string, symbol: AstSymbol): AstSymbol {
  const container = currentBlockScopeContainer(state);
  if (container === undefined) {
    state.diagnostics.push({ node: symbol.declarations[0]!, message: `No block scope available for '${name}'.` });
    return symbol;
  }
  return declareInContainer(container, name, symbol);
}

export function declareExportedName(state: BinderContainerState, name: string, symbol: AstSymbol): AstSymbol {
  const container = currentDeclarationContainer(state);
  if (container === undefined) {
    state.diagnostics.push({ node: symbol.declarations[0]!, message: `No export container available for '${name}'.` });
    return symbol;
  }
  const table = exportsOf(container);
  const existing = table.get(name);
  if (existing !== undefined) return mergeContainerSymbols(existing, symbol);
  table.set(name, symbol);
  return symbol;
}

export function containerHasLocal(container: AstNode, name: string): boolean {
  return localsOf(container).has(name) || membersOf(container).has(name) || exportsOf(container).has(name);
}

function decision(node: AstNode, kind: DeclarationContainerKind, symbolFlags: SymbolFlags, excludes: SymbolFlags, needsLateBinding: boolean): DeclarationContainerDecision {
  return { node, kind, symbolFlags, excludes, needsLateBinding };
}

function ensureContainerTables(node: AstNode, kind: DeclarationContainerKind): void {
  if (kind === "locals" || kind === "block") localsOf(node);
  if (kind === "members") membersOf(node);
  if (kind === "exports") exportsOf(node);
}

function tableForContainer(node: AstNode, kind: DeclarationContainerKind): SymbolTable {
  if (kind === "members") return membersOf(node);
  if (kind === "exports") return exportsOf(node);
  return localsOf(node);
}

function localsOf(node: AstNode): SymbolTable {
  const target = node as { locals?: SymbolTable };
  target.locals ??= new Map();
  return target.locals;
}

function membersOf(node: AstNode): SymbolTable {
  const symbol = node.symbol ?? createSyntheticSymbol("members");
  symbol.members ??= new Map();
  node.symbol ??= symbol;
  return symbol.members;
}

function exportsOf(node: AstNode): SymbolTable {
  const symbol = node.symbol ?? createSyntheticSymbol("exports");
  symbol.exports ??= new Map();
  node.symbol ??= symbol;
  return symbol.exports;
}

function mergeContainerSymbols(existing: AstSymbol, incoming: AstSymbol): AstSymbol {
  existing.flags = (existing.flags ?? SymbolFlags.None) | (incoming.flags ?? SymbolFlags.None);
  existing.declarations.push(...incoming.declarations);
  if (existing.valueDeclaration === undefined && incoming.valueDeclaration !== undefined) existing.valueDeclaration = incoming.valueDeclaration;
  if (existing.members === undefined && incoming.members !== undefined) existing.members = incoming.members;
  if (existing.exports === undefined && incoming.exports !== undefined) existing.exports = incoming.exports;
  return existing;
}

function createSyntheticSymbol(name: string): AstSymbol {
  return { name, escapedName: name, flags: SymbolFlags.None, declarations: [] };
}
