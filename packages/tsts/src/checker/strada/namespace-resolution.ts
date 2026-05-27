/**
 * Namespace resolution.
 *
 * Ported from Strada `checker.go` — getSymbolOfNamespace,
 * resolveNamespaceMember, getNamespaceExports.
 */

import { Kind, SymbolFlags } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when the node is a NamespaceDeclaration
 * (ModuleDeclaration with an Identifier name).
 */
export function isNamespaceDeclaration(node: AstNode): boolean {
  if (node.kind !== Kind.ModuleDeclaration) return false;
  const name = (node as unknown as { name?: AstNode }).name;
  return name !== undefined && name.kind === Kind.Identifier;
}

/**
 * Returns the namespace name.
 */
export function getNamespaceName(node: AstNode): string | undefined {
  if (!isNamespaceDeclaration(node)) return undefined;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  return (name as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns the body of a namespace.
 */
export function getNamespaceBody(node: AstNode): AstNode | undefined {
  if (!isNamespaceDeclaration(node)) return undefined;
  return (node as unknown as { body?: AstNode }).body;
}

/**
 * Returns the statements inside a namespace.
 */
export function getNamespaceStatements(node: AstNode): readonly AstNode[] {
  const body = getNamespaceBody(node);
  if (body === undefined) return [];
  if (body.kind !== Kind.ModuleBlock) return [];
  const statements = (body as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements;
  return statements?.nodes ?? [];
}

/**
 * Returns the exports symbol table of a namespace.
 */
export function getNamespaceExports(sym: AstSymbol): Map<string, AstSymbol> | undefined {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  if ((flags & SymbolFlags.Namespace) === 0) return undefined;
  return (sym as unknown as { exports?: Map<string, AstSymbol> }).exports;
}

/**
 * Returns a member symbol of a namespace by name.
 */
export function lookupNamespaceMember(
  sym: AstSymbol,
  memberName: string,
): AstSymbol | undefined {
  const exports = getNamespaceExports(sym);
  return exports?.get(memberName);
}

/**
 * Returns true when the namespace is nested (its parent is also a
 * namespace).
 */
export function isNestedNamespace(node: AstNode): boolean {
  if (!isNamespaceDeclaration(node)) return false;
  const parent = (node as unknown as { parent?: AstNode }).parent;
  if (parent === undefined) return false;
  return parent.kind === Kind.ModuleBlock || isNamespaceDeclaration(parent);
}

/**
 * Returns the qualified path of a nested namespace
 * (`OuterA.OuterB.Inner`).
 */
export function getQualifiedNamespacePath(node: AstNode): string | undefined {
  if (!isNamespaceDeclaration(node)) return undefined;
  const parts: string[] = [];
  const walk = (current: AstNode | undefined): void => {
    if (current === undefined) return;
    if (isNamespaceDeclaration(current)) {
      const name = getNamespaceName(current);
      if (name !== undefined) parts.unshift(name);
    }
    walk((current as unknown as { parent?: AstNode }).parent);
  };
  walk(node);
  return parts.length === 0 ? undefined : parts.join(".");
}
