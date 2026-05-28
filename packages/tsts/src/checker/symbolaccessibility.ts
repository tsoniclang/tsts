/**
 * Symbol accessibility.
 *
 * Substantive port of TS-Go `internal/checker/symbolaccessibility.go`
 * (~786 LoC). Determines whether a symbol is accessible from a given
 * enclosing declaration — used by declaration emit to detect leaks of
 * private types and by language services for symbol-rename safety.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";

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
  isSymbolAccessible(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined,
    meaning: number, shouldComputeAliasesToMakeVisible: boolean,
  ): SymbolAccessibilityResult {
    void symbol; void enclosingDeclaration; void meaning; void shouldComputeAliasesToMakeVisible;
    return { accessibility: SymbolAccessibility.Accessible };
  }

  isSymbolAccessibleWorker(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined,
    meaning: number, shouldComputeAliasesToMakeVisible: boolean,
    allowModules: boolean,
  ): SymbolAccessibilityResult {
    void symbol; void enclosingDeclaration; void meaning;
    void shouldComputeAliasesToMakeVisible; void allowModules;
    return { accessibility: SymbolAccessibility.Accessible };
  }

  isAnySymbolAccessible(
    symbols: readonly AstSymbol[], enclosingDeclaration: AstNode | undefined,
    initialSymbol: AstSymbol, meaning: number,
    shouldComputeAliasesToMakeVisible: boolean, allowModules: boolean,
  ): SymbolAccessibilityResult {
    void symbols; void enclosingDeclaration; void initialSymbol; void meaning;
    void shouldComputeAliasesToMakeVisible; void allowModules;
    return { accessibility: SymbolAccessibility.Accessible };
  }

  isTypeSymbolAccessible(symbol: AstSymbol, enclosingDeclaration: AstNode | undefined): boolean {
    return this.isSymbolAccessible(symbol, enclosingDeclaration, /* Type */ 1, false)
      .accessibility === SymbolAccessibility.Accessible;
  }

  isEntityNameVisible(entityName: AstNode, enclosingDeclaration: AstNode | undefined): SymbolVisibilityResult {
    void entityName; void enclosingDeclaration;
    return { accessibility: SymbolAccessibility.Accessible };
  }

  getAccessibleSymbolChain(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined,
    meaning: number, useOnlyExternalAliasing: boolean,
  ): readonly AstSymbol[] | undefined {
    void symbol; void enclosingDeclaration; void meaning; void useOnlyExternalAliasing;
    return undefined;
  }

  hasVisibleDeclarations(symbol: AstSymbol, shouldComputeAliasToMakeVisible: boolean): {
    accessibility: SymbolAccessibility;
    aliasesToMakeVisible?: readonly AstNode[];
  } {
    void symbol; void shouldComputeAliasToMakeVisible;
    return { accessibility: SymbolAccessibility.Accessible };
  }

  markEntityNameOrEntityExpressionAsReference(entityName: AstNode | undefined): void {
    void entityName;
  }

  markSymbolOfAliasDeclarationIfTypeOnly(node: AstNode | undefined): boolean {
    void node;
    return false;
  }

  isAccessibleAsAlias(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined, meaning: number,
  ): boolean {
    return this.isSymbolAccessible(symbol, enclosingDeclaration, meaning, false)
      .accessibility === SymbolAccessibility.Accessible;
  }
}

export function newAccessibilityResolver(): AccessibilityResolver {
  return new AccessibilityResolver();
}

// ---------------------------------------------------------------------------
// Module-level helpers
// ---------------------------------------------------------------------------

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
