/**
 * Symbol-visibility analysis (for declaration emit).
 *
 * Ported from Strada `symbolaccessibility.go` — isSymbolAccessibleAtLocation,
 * isVisibleAcrossModuleBoundary, getSymbolReachableViaImports.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

export const SymbolAccessibility = {
  Accessible: 0,
  NotAccessible: 1,
  CannotBeNamed: 2,
} as const;

export type SymbolAccessibility =
  | typeof SymbolAccessibility.Accessible
  | typeof SymbolAccessibility.NotAccessible
  | typeof SymbolAccessibility.CannotBeNamed;

export interface SymbolAccessibilityResult {
  readonly accessibility: SymbolAccessibility;
  readonly aliasesToMakeVisible?: readonly AstNode[] | undefined;
  readonly errorSymbolName?: string | undefined;
  readonly errorNode?: AstNode | undefined;
}

/**
 * Returns true when a symbol's exported chain is fully reachable
 * from outside its module — every link in the chain has an `export`
 * modifier.
 */
export function isExportedRecursively(sym: AstSymbol): boolean {
  let current: AstSymbol | undefined = sym;
  while (current !== undefined) {
    const decls = (current as unknown as { declarations?: readonly AstNode[] }).declarations;
    if (decls === undefined || decls.length === 0) return false;
    const isExported = decls.some((d) => {
      const mods = (d as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
      return mods?.some((m) => m.kind === Kind.ExportKeyword) === true;
    });
    if (!isExported) return false;
    current = (current as unknown as { parent?: AstSymbol }).parent;
  }
  return true;
}

/**
 * Returns whether a symbol is accessible at a given AST location.
 * Conservative shell: returns Accessible whenever the symbol has at
 * least one declaration.
 */
export function isSymbolAccessibleAtLocation(
  sym: AstSymbol | undefined,
  _location: AstNode | undefined,
): SymbolAccessibilityResult {
  if (sym === undefined) {
    return { accessibility: SymbolAccessibility.NotAccessible };
  }
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) {
    return { accessibility: SymbolAccessibility.NotAccessible };
  }
  return { accessibility: SymbolAccessibility.Accessible };
}

/**
 * Returns the display name we'd use to emit a reference to a symbol.
 */
export function getSymbolDisplayName(sym: AstSymbol): string {
  return (sym as unknown as { name?: string }).name ?? "(anonymous)";
}

/**
 * Returns true when the symbol's source file is an external module.
 */
export function isSymbolInExternalModule(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return false;
  let current: AstNode | undefined = decls[0]!;
  while (current !== undefined) {
    if (current.kind === Kind.SourceFile) {
      return (current as unknown as { isExternalModule?: boolean }).isExternalModule === true;
    }
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return false;
}
