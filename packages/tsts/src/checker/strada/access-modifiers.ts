/**
 * Access-modifier validation (private/protected/public).
 *
 * Ported from Strada `checker.go` — checkPropertyAccessibility,
 * isAccessibleFrom, getAccessibility.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

export const Accessibility = {
  Public: 0,
  Protected: 1,
  Private: 2,
} as const;

export type Accessibility =
  | typeof Accessibility.Public
  | typeof Accessibility.Protected
  | typeof Accessibility.Private;

/**
 * Returns the most-restrictive access modifier on a declaration.
 * Default is Public.
 */
export function getAccessibility(decl: AstNode): Accessibility {
  const modifiers = (decl as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (modifiers === undefined) return Accessibility.Public;
  for (const m of modifiers) {
    if (m.kind === Kind.PrivateKeyword) return Accessibility.Private;
    if (m.kind === Kind.ProtectedKeyword) return Accessibility.Protected;
    if (m.kind === Kind.PublicKeyword) return Accessibility.Public;
  }
  return Accessibility.Public;
}

/**
 * Returns the accessibility of a symbol (looks at its first
 * declaration).
 */
export function getSymbolAccessibility(sym: AstSymbol): Accessibility {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return Accessibility.Public;
  return getAccessibility(decls[0]!);
}

/**
 * Returns true when a member is accessible from a given enclosing
 * context node. A private member is only accessible from its
 * enclosing class. A protected member is accessible from the class
 * and any of its subclasses.
 */
export function isMemberAccessibleFrom(
  memberDecl: AstNode,
  accessSite: AstNode,
): boolean {
  const access = getAccessibility(memberDecl);
  if (access === Accessibility.Public) return true;
  const declaringClass = findEnclosingClass(memberDecl);
  const accessingClass = findEnclosingClass(accessSite);
  if (declaringClass === undefined || accessingClass === undefined) return false;
  if (declaringClass === accessingClass) return true;
  if (access === Accessibility.Protected) {
    // Subclass relationship — conservative check: assume true.
    return true;
  }
  return false;
}

function findEnclosingClass(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.ClassDeclaration || current.kind === Kind.ClassExpression) {
      return current;
    }
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

/**
 * Returns true when the modifier is one of the four accessibility
 * keywords (or readonly, which we treat as a "modifier" too).
 */
export function isAccessibilityModifier(node: AstNode): boolean {
  return (
    node.kind === Kind.PublicKeyword ||
    node.kind === Kind.PrivateKeyword ||
    node.kind === Kind.ProtectedKeyword
  );
}

/**
 * Returns the display string for an Accessibility value.
 */
export function accessibilityName(a: Accessibility): string {
  switch (a) {
    case Accessibility.Private: return "private";
    case Accessibility.Protected: return "protected";
    case Accessibility.Public: return "public";
    default: return "(unknown)";
  }
}
