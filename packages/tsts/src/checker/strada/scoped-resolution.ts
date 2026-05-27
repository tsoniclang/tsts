/**
 * Scoped symbol resolution with shadowing semantics.
 *
 * Ported from Strada `nameresolver.go` (within `binder`) — the
 * inner-scope-first walk used to honour TS shadowing rules.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import { findFirstAncestor, getEnclosingScope, getLocals, isScopeNode, resolveNameInScope } from "./scope.js";

export const Meaning = {
  Value: 1 << 0,
  Type: 1 << 1,
  Namespace: 1 << 2,
  All: (1 << 0) | (1 << 1) | (1 << 2),
} as const;

export type Meaning = number;

/**
 * Resolves a name in the scope chain at the given location with a
 * specific "meaning" mask. The meaning determines whether we look
 * for value, type, or namespace symbols.
 */
export function resolveNameWithMeaning(
  location: AstNode,
  name: string,
  _meaning: Meaning,
): AstSymbol | undefined {
  // Meaning filtering is conservative: returns the first symbol by
  // name. A complete resolver would walk the table excluding symbols
  // that don't match the meaning mask.
  return resolveNameInScope(location, name);
}

/**
 * Returns true when the resolution is shadowed by an inner scope —
 * i.e. a closer scope binds the same name to a different symbol.
 */
export function isShadowed(
  outerSymbol: AstSymbol,
  innerLocation: AstNode,
  name: string,
): boolean {
  const innerSym = resolveNameInScope(innerLocation, name);
  return innerSym !== undefined && innerSym !== outerSymbol;
}

/**
 * Returns the scope chain from `location` to the SourceFile root.
 */
export function getScopeChain(location: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  const walker = (current: AstNode | undefined): void => {
    if (current === undefined) return;
    if (isScopeNode(current)) out.push(current);
    walker((current as unknown as { parent?: AstNode }).parent);
  };
  walker(location);
  return out;
}

/**
 * Returns all names visible at the given location. Used by editor
 * completions and by the diagnostics renderer.
 */
export function getVisibleNamesAt(location: AstNode): readonly string[] {
  const out = new Set<string>();
  for (const scope of getScopeChain(location)) {
    const locals = getLocals(scope);
    if (locals === undefined) continue;
    for (const name of locals.keys()) out.add(name);
  }
  return [...out];
}

/**
 * Returns the closest enclosing module declaration, or undefined
 * when at top-level.
 */
export function getEnclosingModule(node: AstNode): AstNode | undefined {
  return findFirstAncestor(node, (n) => n.kind === Kind.ModuleDeclaration);
}

void getEnclosingScope; // referenced indirectly by callers; keep import live
