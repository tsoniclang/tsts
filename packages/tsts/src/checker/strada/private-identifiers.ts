/**
 * Private-identifier (`#name`) helpers.
 *
 * Ported from Strada `checker.go` — getPrivateIdentifier,
 * checkPrivateIdentifierExpression, lookupSymbolForPrivateIdentifierDeclaration.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when the identifier text starts with `#`.
 */
export function isPrivateIdentifier(node: AstNode): boolean {
  return node.kind === Kind.PrivateIdentifier;
}

/**
 * Returns the raw text of a private identifier (with the leading `#`).
 */
export function getPrivateIdentifierText(node: AstNode): string {
  if (!isPrivateIdentifier(node)) return "";
  return (node as unknown as { escapedText?: string }).escapedText ?? "";
}

/**
 * Returns the text without the leading `#` — useful for symbol-name
 * disambiguation.
 */
export function getPrivateIdentifierName(node: AstNode): string {
  const t = getPrivateIdentifierText(node);
  return t.startsWith("#") ? t.slice(1) : t;
}

/**
 * Walks the symbol's enclosing-class declarations to find the
 * private-identifier declaration that matches the given name.
 */
export function lookupSymbolForPrivateIdentifierDeclaration(
  classSymbol: AstSymbol | undefined,
  name: string,
): AstSymbol | undefined {
  if (classSymbol === undefined) return undefined;
  const members = (classSymbol as unknown as { members?: Map<string, AstSymbol> }).members;
  if (members === undefined) return undefined;
  // Private identifiers are stored with their full `#name` key.
  const key = name.startsWith("#") ? name : "#" + name;
  return members.get(key);
}

/**
 * Returns the enclosing class (or class-like) that owns a private
 * identifier reference. Walks up the parent chain.
 */
export function getContainingClassForPrivateIdentifier(
  node: AstNode,
): AstNode | undefined {
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
 * Returns true when a private-identifier reference is statically
 * legal (within the class that declares it).
 */
export function isPrivateIdentifierAccessAllowed(
  node: AstNode,
  declaringClass: AstNode | undefined,
): boolean {
  if (declaringClass === undefined) return false;
  const enclosing = getContainingClassForPrivateIdentifier(node);
  // Same class instance — allowed.
  return enclosing === declaringClass;
}
