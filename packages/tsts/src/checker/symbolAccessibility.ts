/**
 * Symbol accessibility.
 *
 * Substantive port of TS-Go `internal/checker/symbolaccessibility.go`
 * (~786 LoC). Determines whether a symbol is accessible from a given
 * enclosing declaration — used by declaration emit to detect leaks of
 * private types and by language services for symbol-rename safety.
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { Kind, NodeFlags, SymbolFlags } from "../ast/index.js";

// ---------------------------------------------------------------------------
// SymbolAccessibility result
// ---------------------------------------------------------------------------

export type SymbolAccessibility = 0 | 1 | 2 | 3;
export const SymbolAccessibility = {
  Accessible: 0 as SymbolAccessibility,
  NotAccessible: 1 as SymbolAccessibility,
  CannotBeNamed: 2 as SymbolAccessibility,
  NotResolved: 3 as SymbolAccessibility,
} as const;

export interface SymbolAccessibilityResult {
  accessibility: SymbolAccessibility;
  errorSymbolName?: string;
  errorModuleName?: string;
  errorNode?: AstNode;
  aliasesToMakeVisible?: readonly AstNode[];
}

export interface SymbolVisibilityResult {
  accessibility: SymbolAccessibility;
  aliasesToMakeVisible?: readonly AstNode[];
  errorSymbolName?: string;
  errorNode?: AstNode;
}

// ---------------------------------------------------------------------------
// AccessibilityResolver
// ---------------------------------------------------------------------------

export class AccessibilityResolver {
  isValueSymbolAccessible(symbol: AstSymbol, enclosingDeclaration: AstNode | undefined): boolean {
    return this.isSymbolAccessibleWorker(symbol, enclosingDeclaration, SymbolFlags.Value, false, true)
      .accessibility === SymbolAccessibility.Accessible;
  }

  isSymbolAccessibleByFlags(symbol: AstSymbol, enclosingDeclaration: AstNode | undefined, flags: number): boolean {
    return this.isSymbolAccessibleWorker(symbol, enclosingDeclaration, flags, false, false)
      .accessibility === SymbolAccessibility.Accessible;
  }

  isSymbolAccessible(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined,
    meaning: number, shouldComputeAliasesToMakeVisible: boolean,
  ): SymbolAccessibilityResult {
    return this.isSymbolAccessibleWorker(
      symbol,
      enclosingDeclaration,
      meaning,
      shouldComputeAliasesToMakeVisible,
      true,
    );
  }

  isSymbolAccessibleWorker(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined,
    meaning: number, shouldComputeAliasesToMakeVisible: boolean,
    allowModules: boolean,
  ): SymbolAccessibilityResult {
    const result = this.isAnySymbolAccessible(
      [symbol],
      enclosingDeclaration,
      symbol,
      meaning,
      shouldComputeAliasesToMakeVisible,
      allowModules,
    );
    if (result.accessibility !== SymbolAccessibility.NotResolved) return result;
    const cannotBeNamed: SymbolAccessibilityResult = {
      accessibility: SymbolAccessibility.CannotBeNamed,
      errorSymbolName: symbolToString(symbol),
    };
    const declaration = firstDeclaration(symbol);
    if (declaration !== undefined) cannotBeNamed.errorNode = declaration;
    return cannotBeNamed;
  }

  isAnySymbolAccessible(
    symbols: readonly AstSymbol[], enclosingDeclaration: AstNode | undefined,
    initialSymbol: AstSymbol, meaning: number,
    shouldComputeAliasesToMakeVisible: boolean, allowModules: boolean,
  ): SymbolAccessibilityResult {
    if (symbols.length === 0) return { accessibility: SymbolAccessibility.NotResolved };
    let hadAccessibleChain: AstSymbol | undefined;
    let earlyModuleBail = false;
    for (const symbol of symbols) {
      const chain = this.getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, false);
      if (chain !== undefined && chain.length > 0) {
        hadAccessibleChain = symbol;
        const visible = this.hasVisibleDeclarations(chain[0]!, shouldComputeAliasesToMakeVisible);
        if (visible.accessibility === SymbolAccessibility.Accessible) return visible;
      }
      if (allowModules && hasExternalModuleSymbol(symbol)) {
        if (!shouldComputeAliasesToMakeVisible) {
          return { accessibility: SymbolAccessibility.Accessible };
        }
        earlyModuleBail = true;
      }
      const containers = this.getContainersOfSymbol(symbol, enclosingDeclaration, meaning);
      const nextMeaning = initialSymbol === symbol ? getQualifiedLeftMeaning(meaning) : meaning;
      const parent = this.isAnySymbolAccessible(
        containers,
        enclosingDeclaration,
        initialSymbol,
        nextMeaning,
        shouldComputeAliasesToMakeVisible,
        allowModules,
      );
      if (parent.accessibility !== SymbolAccessibility.NotResolved) return parent;
    }
    if (earlyModuleBail) return { accessibility: SymbolAccessibility.Accessible };
    if (hadAccessibleChain !== undefined) {
      const notAccessible: SymbolAccessibilityResult = {
        accessibility: SymbolAccessibility.NotAccessible,
        errorSymbolName: symbolToString(initialSymbol),
      };
      if (hadAccessibleChain !== initialSymbol) notAccessible.errorModuleName = symbolToString(hadAccessibleChain);
      const declaration = firstDeclaration(initialSymbol);
      if (declaration !== undefined) notAccessible.errorNode = declaration;
      return notAccessible;
    }
    return { accessibility: SymbolAccessibility.NotResolved };
  }

  isTypeSymbolAccessible(symbol: AstSymbol, enclosingDeclaration: AstNode | undefined): boolean {
    return this.isSymbolAccessible(symbol, enclosingDeclaration, /* Type */ 1, false)
      .accessibility === SymbolAccessibility.Accessible;
  }

  isEntityNameVisible(entityName: AstNode, enclosingDeclaration: AstNode | undefined): SymbolVisibilityResult {
    const symbol = nodeSymbol(entityName) ?? lookupName(entityNameText(entityName), enclosingDeclaration);
    if (symbol === undefined) {
      return {
        accessibility: SymbolAccessibility.NotResolved,
        errorSymbolName: entityNameText(entityName),
        errorNode: entityName,
      };
    }
    const access = this.isSymbolAccessible(symbol, enclosingDeclaration, symbolFlags(symbol), true);
    const visible: SymbolVisibilityResult = {
      accessibility: access.accessibility,
    };
    if (access.aliasesToMakeVisible !== undefined) visible.aliasesToMakeVisible = access.aliasesToMakeVisible;
    if (access.errorSymbolName !== undefined) visible.errorSymbolName = access.errorSymbolName;
    if (access.errorNode !== undefined) visible.errorNode = access.errorNode;
    return visible;
  }

  getAccessibleSymbolChain(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined,
    meaning: number, useOnlyExternalAliasing: boolean,
  ): readonly AstSymbol[] | undefined {
    if (meaning !== 0 && (symbolFlags(symbol) & meaning) === 0) return undefined;
    const direct = lookupName(symbolToString(symbol), enclosingDeclaration);
    if (direct === symbol || (direct !== undefined && getExportSymbolOfSymbol(direct) === getExportSymbolOfSymbol(symbol))) {
      return [symbol];
    }
    if (!useOnlyExternalAliasing) {
      const alias = findVisibleAlias(symbol, enclosingDeclaration, meaning);
      if (alias !== undefined) return [alias, symbol];
    }
    for (const container of this.getContainersOfSymbol(symbol, enclosingDeclaration, meaning)) {
      const leftMeaning = getQualifiedLeftMeaning(meaning);
      const parentChain = this.getAccessibleSymbolChain(container, enclosingDeclaration, leftMeaning, useOnlyExternalAliasing);
      if (parentChain !== undefined && parentChain.length > 0) return [...parentChain, symbol];
    }
    return undefined;
  }

  hasVisibleDeclarations(symbol: AstSymbol, shouldComputeAliasToMakeVisible: boolean): {
    accessibility: SymbolAccessibility;
    aliasesToMakeVisible?: readonly AstNode[];
    errorSymbolName?: string;
    errorNode?: AstNode;
  } {
    const declarations = declarationsOf(symbol);
    if (declarations.length === 0) return { accessibility: SymbolAccessibility.CannotBeNamed };
    const visibleDeclarations = declarations.filter(isVisibleDeclaration);
    if (visibleDeclarations.length > 0) {
      return { accessibility: SymbolAccessibility.Accessible };
    }
    if (shouldComputeAliasToMakeVisible) {
      const aliasDeclarations = declarations
        .map(findImportOrExportAlias)
        .filter((node): node is AstNode => node !== undefined);
      if (aliasDeclarations.length > 0) {
        return { accessibility: SymbolAccessibility.Accessible, aliasesToMakeVisible: aliasDeclarations };
      }
    }
    const notAccessible = {
      accessibility: SymbolAccessibility.NotAccessible,
      errorSymbolName: symbolToString(symbol),
    };
    const declaration = firstDeclaration(symbol);
    return declaration === undefined ? notAccessible : { ...notAccessible, errorNode: declaration };
  }

  markEntityNameOrEntityExpressionAsReference(entityName: AstNode | undefined): void {
    if (entityName === undefined) return;
    (entityName as { isReferenced?: boolean }).isReferenced = true;
    this.markEntityNameOrEntityExpressionAsReference((entityName as { expression?: AstNode; left?: AstNode }).expression ?? (entityName as { left?: AstNode }).left);
  }

  markSymbolOfAliasDeclarationIfTypeOnly(node: AstNode | undefined): boolean {
    const symbol = nodeSymbol(node);
    if (symbol === undefined) return false;
    if (!isTypeOnlyAliasDeclaration(node)) return false;
    (symbol as { isReferencedAliasDeclaration?: boolean }).isReferencedAliasDeclaration = true;
    return true;
  }

  isAccessibleAsAlias(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined, meaning: number,
  ): boolean {
    return this.isSymbolAccessible(symbol, enclosingDeclaration, meaning, false)
      .accessibility === SymbolAccessibility.Accessible;
  }

  getContainersOfSymbol(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined, meaning: number,
  ): readonly AstSymbol[] {
    const containers: AstSymbol[] = [];
    const parent = (symbol as { parent?: AstSymbol }).parent;
    if (parent !== undefined) containers.push(...this.getWithAlternativeContainers(parent, symbol, enclosingDeclaration, meaning));
    const nonModule = getNonModuleParentOfSymbol(symbol);
    if (nonModule !== undefined && nonModule !== parent) containers.push(nonModule);
    return dedupeSymbols(containers);
  }

  getWithAlternativeContainers(
    container: AstSymbol, symbol: AstSymbol, enclosingDeclaration: AstNode | undefined, meaning: number,
  ): readonly AstSymbol[] {
    const out: AstSymbol[] = [];
    const leftMeaning = getQualifiedLeftMeaning(meaning);
    if (enclosingDeclaration !== undefined
      && (symbolFlags(container) & leftMeaning) !== 0
      && this.getAccessibleSymbolChain(container, enclosingDeclaration, SymbolFlags.Namespace, false) !== undefined) {
      out.push(container);
    }
    out.push(...fileSymbolsForExportEqualsContainer(container));
    const objectContainer = getVariableDeclarationOfObjectLiteral(container, meaning);
    if (objectContainer !== undefined) out.push(objectContainer);
    out.push(...getAlternativeContainingModules(symbol, enclosingDeclaration));
    if (!out.includes(container)) out.push(container);
    return dedupeSymbols(out);
  }

  getExternalModuleContainer(declaration: AstNode | undefined): AstSymbol | undefined {
    const node = findAncestor(declaration, hasNonGlobalAugmentationExternalModuleSymbol);
    return nodeSymbol(node);
  }

  getFileSymbolIfFileSymbolExportEqualsContainer(declaration: AstNode, container: AstSymbol): AstSymbol | undefined {
    const fileSymbol = this.getExternalModuleContainer(declaration);
    const exportEquals = exportsOf(fileSymbol)?.get("export=");
    if (fileSymbol === undefined || exportEquals === undefined) return undefined;
    return symbolsSameReference(exportEquals, container) ? fileSymbol : undefined;
  }

  getAliasForSymbolInContainer(container: AstSymbol, symbol: AstSymbol): AstSymbol | undefined {
    if (container === symbolParent(symbol)) return symbol;
    const exportEquals = exportsOf(container)?.get("export=");
    if (exportEquals !== undefined && symbolsSameReference(exportEquals, symbol)) return container;
    const exports = exportsOf(container);
    const quick = exports?.get(symbolToString(symbol));
    if (quick !== undefined && symbolsSameReference(quick, symbol)) return quick;
    if (exports === undefined) return undefined;
    const candidates: AstSymbol[] = [];
    for (const exported of exports.values()) {
      if (symbolsSameReference(exported, symbol)) candidates.push(exported);
    }
    return candidates.sort(compareSymbols)[0];
  }

  getAccessibleSymbolChainEx(ctx: AccessibleSymbolChainContext): readonly AstSymbol[] | undefined {
    if (ctx.symbol === undefined || isPropertyOrMethodDeclarationSymbol(ctx.symbol)) return undefined;
    let result: readonly AstSymbol[] | undefined;
    this.someSymbolTableInScope(ctx.enclosingDeclaration, (table, tableId, ignoreQualification, isLocalNameLookup) => {
      const candidate = this.getAccessibleSymbolChainFromSymbolTable(ctx, table, tableId, ignoreQualification, isLocalNameLookup);
      if (candidate !== undefined && candidate.length > 0) {
        result = candidate;
        return true;
      }
      return false;
    });
    return result;
  }

  getAccessibleSymbolChainFromSymbolTable(
    ctx: AccessibleSymbolChainContext,
    table: SymbolTable,
    tableId: SymbolTableID,
    ignoreQualification: boolean,
    isLocalNameLookup: boolean,
  ): readonly AstSymbol[] | undefined {
    const symbolId = getStableSymbolId(ctx.symbol);
    let visited = ctx.visitedSymbolTablesMap.get(symbolId);
    if (visited === undefined) {
      visited = new Set();
      ctx.visitedSymbolTablesMap.set(symbolId, visited);
    }
    if (visited.has(tableId)) return undefined;
    visited.add(tableId);
    const result = this.trySymbolTable(ctx, table, tableId, ignoreQualification, isLocalNameLookup);
    visited.delete(tableId);
    return result;
  }

  getSymbolTableAliases(symbols: SymbolTable, tableId: SymbolTableID): readonly AstSymbol[] {
    if (symbolTableKind(tableId) === SymbolTableKind.Members) return [];
    return [...symbols.values()].filter((symbol) => (symbolFlags(symbol) & SymbolFlags.Alias) !== 0);
  }

  trySymbolTable(
    ctx: AccessibleSymbolChainContext,
    symbols: SymbolTable,
    tableId: SymbolTableID,
    ignoreQualification: boolean,
    isLocalNameLookup: boolean,
  ): readonly AstSymbol[] | undefined {
    const direct = symbols.get(symbolToString(ctx.symbol));
    if (direct !== undefined && this.isAccessible(ctx, direct, undefined, ignoreQualification)) return [ctx.symbol];
    const candidateChains: AstSymbol[][] = [];
    if (direct?.exportSymbol !== undefined && this.isAccessible(ctx, direct.exportSymbol, undefined, ignoreQualification)) {
      candidateChains.push([ctx.symbol]);
    }
    for (const symbolFromTable of this.getSymbolTableAliases(symbols, tableId)) {
      if (symbolToString(symbolFromTable) === "export=" || symbolToString(symbolFromTable) === "default") continue;
      if (isLocalNameLookup && declarationsOf(symbolFromTable).some(isNamespaceReexportDeclaration)) continue;
      const resolvedImportedSymbol = resolveAlias(symbolFromTable);
      const candidate = this.getCandidateListForSymbol(ctx, symbolFromTable, resolvedImportedSymbol, ignoreQualification);
      if (candidate !== undefined && candidate.length > 0) candidateChains.push([...candidate]);
    }
    if (candidateChains.length > 0) return candidateChains.sort(compareSymbolChains)[0];
    if (tableId === symbolTableIDFromGlobals()) {
      const globalThis = symbols.get("globalThis");
      if (globalThis !== undefined) return this.getCandidateListForSymbol(ctx, globalThis, globalThis, ignoreQualification);
    }
    return undefined;
  }

  compareSymbolChainsWorker(left: readonly AstSymbol[], right: readonly AstSymbol[]): number {
    return compareSymbolChains(left, right);
  }

  getCandidateListForSymbol(
    ctx: AccessibleSymbolChainContext,
    symbolFromSymbolTable: AstSymbol,
    resolvedImportedSymbol: AstSymbol,
    ignoreQualification: boolean,
  ): readonly AstSymbol[] | undefined {
    if (this.isAccessible(ctx, symbolFromSymbolTable, resolvedImportedSymbol, ignoreQualification)) return [symbolFromSymbolTable];
    const exports = exportsOf(resolvedImportedSymbol);
    if (exports === undefined) return undefined;
    const chain = this.getAccessibleSymbolChainFromSymbolTable(
      ctx,
      exports,
      symbolTableIDFromResolvedExports(resolvedImportedSymbol),
      true,
      false,
    );
    if (chain === undefined || chain.length === 0) return undefined;
    if (!this.canQualifySymbol(ctx, symbolFromSymbolTable, getQualifiedLeftMeaning(ctx.meaning))) return undefined;
    return [symbolFromSymbolTable, ...chain];
  }

  isAccessible(
    ctx: AccessibleSymbolChainContext,
    symbolFromSymbolTable: AstSymbol,
    resolvedAliasSymbol: AstSymbol | undefined,
    ignoreQualification: boolean,
  ): boolean {
    const target = resolveAlias(ctx.symbol);
    const fromTable = resolveAlias(symbolFromSymbolTable);
    const aliasTarget = resolvedAliasSymbol === undefined ? undefined : resolveAlias(resolvedAliasSymbol);
    const likeSymbols = symbolsSameReference(ctx.symbol, symbolFromSymbolTable)
      || symbolsSameReference(target, fromTable)
      || aliasTarget !== undefined && symbolsSameReference(target, aliasTarget);
    if (!likeSymbols) return false;
    return !declarationsOf(symbolFromSymbolTable).some(hasNonGlobalAugmentationExternalModuleSymbol)
      && (ignoreQualification || this.canQualifySymbol(ctx, symbolFromSymbolTable, ctx.meaning));
  }

  canQualifySymbol(ctx: AccessibleSymbolChainContext, symbolFromSymbolTable: AstSymbol, meaning: number): boolean {
    if (!this.needsQualification(symbolFromSymbolTable, ctx.enclosingDeclaration, meaning)) return true;
    const parent = symbolParent(symbolFromSymbolTable);
    if (parent === undefined) return false;
    const parentCtx: AccessibleSymbolChainContext = {
      symbol: parent,
      enclosingDeclaration: ctx.enclosingDeclaration,
      meaning: getQualifiedLeftMeaning(meaning),
      useOnlyExternalAliasing: ctx.useOnlyExternalAliasing,
      visitedSymbolTablesMap: ctx.visitedSymbolTablesMap,
    };
    const chain = this.getAccessibleSymbolChainEx(parentCtx);
    return chain !== undefined && chain.length > 0;
  }

  needsQualification(symbol: AstSymbol, enclosingDeclaration: AstNode | undefined, meaning: number): boolean {
    let qualify = false;
    this.someSymbolTableInScope(enclosingDeclaration, (table) => {
      const sameName = table.get(symbolToString(symbol));
      if (sameName === undefined) return false;
      const resolved = resolveAlias(sameName);
      if (symbolsSameReference(resolved, symbol)) return true;
      if ((symbolFlags(resolved) & meaning) !== 0) {
        qualify = true;
        return true;
      }
      return false;
    });
    return qualify;
  }

  someSymbolTableInScope(
    enclosingDeclaration: AstNode | undefined,
    callback: (
      symbolTable: SymbolTable,
      tableId: SymbolTableID,
      ignoreQualification: boolean,
      isLocalNameLookup: boolean,
      scopeNode: AstNode | undefined,
    ) => boolean,
  ): boolean {
    let location = enclosingDeclaration;
    while (location !== undefined) {
      const locals = localsOf(location);
      if (locals !== undefined && !isGlobalSourceFile(location)) {
        if (callback(locals, symbolTableIDFromLocals(location), false, true, location)) return true;
      }
      if (location.kind === Kind.SourceFile || location.kind === Kind.ModuleDeclaration) {
        const symbol = nodeSymbol(location);
        const exports = exportsOf(symbol);
        if (exports !== undefined && callback(exports, symbolTableIDFromExports(symbol!), false, true, location)) return true;
      }
      if (location.kind === Kind.ClassDeclaration || location.kind === Kind.ClassExpression || location.kind === Kind.InterfaceDeclaration) {
        const symbol = nodeSymbol(location);
        const members = membersOf(symbol);
        if (members !== undefined && callback(filterTypeMembers(members), symbolTableIDFromMembers(symbol!), false, false, location)) return true;
      }
      location = parentOf(location);
    }
    return false;
  }
}

export function newAccessibilityResolver(): AccessibilityResolver {
  return new AccessibilityResolver();
}

// ---------------------------------------------------------------------------
// Module-level helpers
// ---------------------------------------------------------------------------

export interface AccessibleSymbolChainContext {
  readonly symbol: AstSymbol;
  readonly enclosingDeclaration: AstNode | undefined;
  readonly meaning: number;
  readonly useOnlyExternalAliasing: boolean;
  readonly visitedSymbolTablesMap: Map<number, Set<SymbolTableID>>;
}

export type SymbolTableID = number;

export const SymbolTableKind = {
  Locals: 0,
  Exports: 1,
  Members: 2,
  Globals: 3,
  ResolvedExports: 4,
} as const;

const symbolTableIdKindMultiplier = 1_000_000_000;
const symbolIds = new WeakMap<AstSymbol, number>();
const nodeIds = new WeakMap<AstNode, number>();
let nextSymbolId = 1;
let nextNodeId = 1;

export function symbolTableIDFromLocals(node: AstNode): SymbolTableID {
  return SymbolTableKind.Locals * symbolTableIdKindMultiplier + getStableNodeId(node);
}

export function symbolTableIDFromExports(symbol: AstSymbol): SymbolTableID {
  return SymbolTableKind.Exports * symbolTableIdKindMultiplier + getStableSymbolId(symbol);
}

export function symbolTableIDFromResolvedExports(symbol: AstSymbol): SymbolTableID {
  return SymbolTableKind.ResolvedExports * symbolTableIdKindMultiplier + getStableSymbolId(symbol);
}

export function symbolTableIDFromMembers(symbol: AstSymbol): SymbolTableID {
  return SymbolTableKind.Members * symbolTableIdKindMultiplier + getStableSymbolId(symbol);
}

export function symbolTableIDFromGlobals(): SymbolTableID {
  return SymbolTableKind.Globals * symbolTableIdKindMultiplier;
}

export function hasNonGlobalAugmentationExternalModuleSymbol(declaration: AstNode | undefined): boolean {
  if (declaration === undefined) return false;
  if (declaration.kind === Kind.ModuleDeclaration && ((declaration as { readonly name?: AstNode }).name?.kind === Kind.StringLiteral)) return true;
  return declaration.kind === Kind.SourceFile && isExternalModule(declaration);
}

export function isUMDExportSymbol(symbol: AstSymbol | undefined): boolean {
  const declaration = firstDeclaration(symbol);
  return declaration?.kind === Kind.NamespaceExportDeclaration;
}

export function isNamespaceReexportDeclaration(node: AstNode | undefined): boolean {
  return node?.kind === Kind.NamespaceExport && (parentOf(node) as { readonly moduleSpecifier?: AstNode } | undefined)?.moduleSpecifier !== undefined;
}

export function isPropertyOrMethodDeclarationSymbol(symbol: AstSymbol | undefined): boolean {
  const declarations = declarationsOf(symbol);
  return declarations.length > 0 && declarations.every((declaration) =>
    declaration.kind === Kind.PropertyDeclaration
    || declaration.kind === Kind.MethodDeclaration
    || declaration.kind === Kind.GetAccessor
    || declaration.kind === Kind.SetAccessor);
}

export function getNonModuleParentOfSymbol(symbol: AstSymbol): AstSymbol | undefined {
  // Walk parent-of-symbol chain until we find a non-module parent.
  // SymbolFlags: ValueModule(512), NamespaceModule(1024) — bit-mask
  // for "is a module".
  let s: AstSymbol | undefined = symbol;
  while (s !== undefined) {
    const p: AstSymbol | undefined = (s as unknown as { parent?: AstSymbol }).parent;
    if (p === undefined) return undefined;
    const pf = (p as unknown as { flags?: number }).flags ?? 0;
    if ((pf & 0x600) === 0) return p; // 512 | 1024 = 1536
    s = p;
  }
  return undefined;
}

export function isAccessibleFromEnclosingClass(symbol: AstSymbol, enclosing: AstNode | undefined): boolean {
  // Check whether walking parents of `enclosing` reaches the symbol's
  // declaring class.
  const decls = (symbol as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return true;
  let n: AstNode | undefined = enclosing;
  const declaringClass = decls[0];
  while (n !== undefined) {
    if (n === declaringClass) return true;
    const k = (n as { kind?: number }).kind;
    // Kind 263 = ClassDeclaration, 231 = ClassExpression.
    if (k === 263 || k === 231) {
      // Is this the declaring class?
      let d: AstNode | undefined = declaringClass;
      while (d !== undefined) {
        if (d === n) return true;
        d = (d as unknown as { parent?: AstNode }).parent;
      }
    }
    n = (n as unknown as { parent?: AstNode }).parent;
  }
  return false;
}

function symbolFlags(symbol: AstSymbol | undefined): number {
  return (symbol as { flags?: number } | undefined)?.flags ?? 0;
}

function symbolToString(symbol: AstSymbol | undefined): string {
  return (symbol as { name?: string; escapedName?: string } | undefined)?.name
    ?? (symbol as { name?: string; escapedName?: string } | undefined)?.escapedName
    ?? "<anonymous>";
}

function symbolParent(symbol: AstSymbol | undefined): AstSymbol | undefined {
  return (symbol as { parent?: AstSymbol } | undefined)?.parent;
}

function getStableSymbolId(symbol: AstSymbol): number {
  const existing = symbolIds.get(symbol);
  if (existing !== undefined) return existing;
  const id = nextSymbolId;
  nextSymbolId += 1;
  symbolIds.set(symbol, id);
  return id;
}

function getStableNodeId(node: AstNode): number {
  const id = (node as { readonly id?: number }).id;
  if (id !== undefined) return id;
  const existing = nodeIds.get(node);
  if (existing !== undefined) return existing;
  const next = nextNodeId;
  nextNodeId += 1;
  nodeIds.set(node, next);
  return next;
}

function symbolTableKind(tableId: SymbolTableID): number {
  return Math.floor(tableId / symbolTableIdKindMultiplier);
}

function nodeSymbol(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { symbol?: AstSymbol } | undefined)?.symbol;
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { parent?: AstNode } | undefined)?.parent;
}

function declarationsOf(symbol: AstSymbol | undefined): readonly AstNode[] {
  return (symbol as { declarations?: readonly AstNode[] } | undefined)?.declarations ?? [];
}

function firstDeclaration(symbol: AstSymbol | undefined): AstNode | undefined {
  return declarationsOf(symbol)[0];
}

function membersOf(symbol: AstSymbol | undefined): SymbolTable | undefined {
  return (symbol as { members?: SymbolTable } | undefined)?.members;
}

function exportsOf(symbol: AstSymbol | undefined): SymbolTable | undefined {
  return (symbol as { exports?: SymbolTable } | undefined)?.exports;
}

function localsOf(node: AstNode | undefined): SymbolTable | undefined {
  return (node as { locals?: SymbolTable } | undefined)?.locals;
}

function findAncestor(node: AstNode | undefined, predicate: (node: AstNode) => boolean): AstNode | undefined {
  let current = node;
  while (current !== undefined) {
    if (predicate(current)) return current;
    current = parentOf(current);
  }
  return undefined;
}

function lookupName(name: string, enclosingDeclaration: AstNode | undefined): AstSymbol | undefined {
  let current = enclosingDeclaration;
  while (current !== undefined) {
    const local = localsOf(current)?.get(name);
    if (local !== undefined) return local;
    const symbol = nodeSymbol(current);
    const member = membersOf(symbol)?.get(name) ?? exportsOf(symbol)?.get(name);
    if (member !== undefined) return member;
    current = parentOf(current);
  }
  return undefined;
}

function entityNameText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  const text = (node as { text?: string }).text;
  if (text !== undefined) return text;
  const left = entityNameText((node as { left?: AstNode; expression?: AstNode }).left ?? (node as { expression?: AstNode }).expression);
  const right = entityNameText((node as { right?: AstNode; name?: AstNode }).right ?? (node as { name?: AstNode }).name);
  return left.length === 0 ? right : right.length === 0 ? left : `${left}.${right}`;
}

function getQualifiedLeftMeaning(rightMeaning: number): number {
  return rightMeaning === SymbolFlags.Value ? SymbolFlags.Value : SymbolFlags.Namespace;
}

function getExportSymbolOfSymbol(symbol: AstSymbol): AstSymbol {
  return (symbol as { exportSymbol?: AstSymbol }).exportSymbol ?? symbol;
}

function hasExternalModuleSymbol(symbol: AstSymbol): boolean {
  return declarationsOf(symbol).some((declaration) => {
    if (((declaration as { flags?: number }).flags ?? 0) & NodeFlags.Ambient) return true;
    return (declaration as { externalModuleIndicator?: AstNode; moduleSpecifier?: AstNode }).externalModuleIndicator !== undefined
      || (declaration as { externalModuleIndicator?: AstNode; moduleSpecifier?: AstNode }).moduleSpecifier !== undefined;
  });
}

function isVisibleDeclaration(declaration: AstNode): boolean {
  if ((((declaration as { flags?: number }).flags ?? 0) & NodeFlags.Ambient) !== 0) return true;
  if (isExportedDeclaration(declaration)) return true;
  const file = sourceFileOf(declaration);
  return file === undefined || !isExternalModule(file);
}

function isExportedDeclaration(declaration: AstNode): boolean {
  return (((declaration as { modifierFlags?: number }).modifierFlags ?? 0) & ModifierFlagsExport) !== 0
    || (nodeSymbol(declaration) as { exportSymbol?: AstSymbol } | undefined)?.exportSymbol !== undefined;
}

function sourceFileOf(node: AstNode | undefined): AstNode | undefined {
  let current = node;
  while (current !== undefined) {
    if ((current as { fileName?: string; path?: string }).fileName !== undefined
      || (current as { fileName?: string; path?: string }).path !== undefined) {
      return current;
    }
    current = parentOf(current);
  }
  return undefined;
}

function isExternalModule(file: AstNode): boolean {
  return (file as { externalModuleIndicator?: AstNode }).externalModuleIndicator !== undefined
    || ((file as { imports?: readonly AstNode[] }).imports?.length ?? 0) > 0
    || ((file as { exports?: readonly AstNode[] }).exports?.length ?? 0) > 0;
}

function isGlobalSourceFile(node: AstNode): boolean {
  return node.kind === Kind.SourceFile && !isExternalModule(node);
}

function resolveAlias(symbol: AstSymbol): AstSymbol {
  return (symbol as { readonly aliasTarget?: AstSymbol; readonly target?: AstSymbol }).aliasTarget
    ?? (symbol as { readonly aliasTarget?: AstSymbol; readonly target?: AstSymbol }).target
    ?? symbol.exportSymbol
    ?? symbol;
}

function symbolsSameReference(left: AstSymbol | undefined, right: AstSymbol | undefined): boolean {
  if (left === undefined || right === undefined) return false;
  const resolvedLeft = resolveAlias(left);
  const resolvedRight = resolveAlias(right);
  return left === right
    || resolvedLeft === resolvedRight
    || left.exportSymbol === right
    || right.exportSymbol === left
    || left.exportSymbol !== undefined && left.exportSymbol === right.exportSymbol;
}

function compareSymbols(left: AstSymbol, right: AstSymbol): number {
  const byName = symbolToString(left).localeCompare(symbolToString(right));
  if (byName !== 0) return byName;
  return getStableSymbolId(left) - getStableSymbolId(right);
}

function compareSymbolChains(left: readonly AstSymbol[], right: readonly AstSymbol[]): number {
  const byLength = left.length - right.length;
  if (byLength !== 0) return byLength;
  for (let index = 0; index < left.length; index += 1) {
    const comparison = compareSymbols(left[index]!, right[index]!);
    if (comparison !== 0) return comparison;
  }
  return 0;
}

function filterTypeMembers(members: SymbolTable): SymbolTable {
  const table: SymbolTable = new Map();
  const assignmentFlag = (SymbolFlags as unknown as { readonly Assignment?: number }).Assignment ?? 0;
  for (const [key, symbol] of members) {
    if ((symbolFlags(symbol) & (SymbolFlags.Type & ~assignmentFlag)) !== 0) table.set(key, symbol);
  }
  return table;
}

function findVisibleAlias(symbol: AstSymbol, enclosingDeclaration: AstNode | undefined, meaning: number): AstSymbol | undefined {
  let current = enclosingDeclaration;
  while (current !== undefined) {
    for (const table of [localsOf(current), membersOf(nodeSymbol(current)), exportsOf(nodeSymbol(current))]) {
      if (table === undefined) continue;
      for (const candidate of table.values()) {
        if ((symbolFlags(candidate) & SymbolFlags.Alias) === 0) continue;
        if (meaning !== 0 && (symbolFlags(candidate) & meaning) === 0) continue;
        const target = (candidate as { target?: AstSymbol; aliasTarget?: AstSymbol }).target
          ?? (candidate as { target?: AstSymbol; aliasTarget?: AstSymbol }).aliasTarget;
        if (target === symbol) return candidate;
      }
    }
    current = parentOf(current);
  }
  return undefined;
}

function findImportOrExportAlias(node: AstNode | undefined): AstNode | undefined {
  let current = node;
  while (current !== undefined) {
    const kind = (current as { kind?: number }).kind ?? 0;
    if (kind === 274 || kind === 278 || kind === 279 || kind === 281) return current;
    current = parentOf(current);
  }
  return undefined;
}

function isTypeOnlyAliasDeclaration(node: AstNode | undefined): boolean {
  return (node as { isTypeOnly?: boolean } | undefined)?.isTypeOnly === true
    || (parentOf(node) as { isTypeOnly?: boolean } | undefined)?.isTypeOnly === true;
}

function fileSymbolsForExportEqualsContainer(container: AstSymbol): readonly AstSymbol[] {
  return declarationsOf(container)
    .map(sourceFileOf)
    .map(nodeSymbol)
    .filter((symbol): symbol is AstSymbol => symbol !== undefined);
}

function getVariableDeclarationOfObjectLiteral(symbol: AstSymbol, meaning: number): AstSymbol | undefined {
  if ((meaning & SymbolFlags.Value) === 0) return undefined;
  const declaration = firstDeclaration(symbol);
  const parent = parentOf(declaration);
  if (declaration === undefined || parent === undefined) return undefined;
  const initializer = (parent as { initializer?: AstNode }).initializer;
  const type = (parent as { type?: AstNode }).type;
  if (initializer !== declaration && type !== declaration) return undefined;
  return nodeSymbol(parent);
}

function getAlternativeContainingModules(symbol: AstSymbol, enclosingDeclaration: AstNode | undefined): readonly AstSymbol[] {
  if (enclosingDeclaration === undefined) return [];
  const containingFile = sourceFileOf(enclosingDeclaration);
  const imports = (containingFile as { imports?: readonly AstNode[] } | undefined)?.imports ?? [];
  const out: AstSymbol[] = [];
  for (const importNode of imports) {
    const moduleSymbol = nodeSymbol(importNode);
    if (moduleSymbol !== undefined && exportsOf(moduleSymbol)?.get(symbolToString(symbol)) === symbol) {
      out.push(moduleSymbol);
    }
  }
  return dedupeSymbols(out);
}

function dedupeSymbols(symbols: readonly AstSymbol[]): readonly AstSymbol[] {
  const out: AstSymbol[] = [];
  const seen = new Set<AstSymbol>();
  for (const symbol of symbols) {
    if (seen.has(symbol)) continue;
    seen.add(symbol);
    out.push(symbol);
  }
  return out;
}

const ModifierFlagsExport = 1 << 0;
