/**
 * Identifier symbol resolution.
 *
 * Ported from Strada `checker.go` — resolveEntityName, checkIdentifier,
 * getResolvedSymbol, getReferencedExportContainer.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import { Meaning, resolveNameWithMeaning } from "./scoped-resolution.js";

/**
 * Resolves an Identifier to its symbol.
 */
export function resolveIdentifier(node: AstNode): AstSymbol | undefined {
  if (node.kind !== Kind.Identifier) return undefined;
  const text = (node as unknown as { escapedText?: string }).escapedText;
  if (text === undefined) return undefined;
  return resolveNameWithMeaning(node, text, Meaning.All);
}

/**
 * Resolves an entity name (Identifier or QualifiedName) to a symbol.
 */
export function resolveEntityName(node: AstNode): AstSymbol | undefined {
  switch (node.kind) {
    case Kind.Identifier:
      return resolveIdentifier(node);
    case Kind.QualifiedName: {
      const left = (node as unknown as { left?: AstNode }).left;
      const right = (node as unknown as { right?: AstNode }).right;
      if (left === undefined || right === undefined) return undefined;
      const leftSym = resolveEntityName(left);
      if (leftSym === undefined) return undefined;
      const rightName = (right as unknown as { escapedText?: string }).escapedText;
      if (rightName === undefined) return undefined;
      const members = (leftSym as unknown as { exports?: Map<string, AstSymbol> }).exports
        ?? (leftSym as unknown as { members?: Map<string, AstSymbol> }).members;
      return members?.get(rightName);
    }
    default:
      return undefined;
  }
}

/**
 * Resolves a property-access expression's `.name` to a member symbol
 * on the receiver type.
 */
export function resolvePropertyAccess(node: AstNode): AstSymbol | undefined {
  if (node.kind !== Kind.PropertyAccessExpression) return undefined;
  const expr = (node as unknown as { expression?: AstNode }).expression;
  const name = (node as unknown as { name?: AstNode }).name;
  if (expr === undefined || name === undefined) return undefined;
  const receiverSym = resolveEntityName(expr);
  if (receiverSym === undefined) return undefined;
  const nameText = (name as unknown as { escapedText?: string }).escapedText;
  if (nameText === undefined) return undefined;
  const members = (receiverSym as unknown as { members?: Map<string, AstSymbol> }).members
    ?? (receiverSym as unknown as { exports?: Map<string, AstSymbol> }).exports;
  return members?.get(nameText);
}

/**
 * Returns the export container of a symbol — the module/namespace
 * that owns its top-level visibility.
 */
export function getExportContainer(sym: AstSymbol): AstSymbol | undefined {
  return (sym as unknown as { exportContainer?: AstSymbol }).exportContainer;
}

/**
 * Returns true when an identifier reference is unresolved.
 */
export function isUnresolvedIdentifier(node: AstNode): boolean {
  return resolveIdentifier(node) === undefined;
}

/**
 * Returns the original symbol that an alias chain resolves to.
 * Walks `alias.target` references.
 */
export function resolveAliasChain(sym: AstSymbol): AstSymbol {
  const visited = new Set<AstSymbol>();
  const walk = (s: AstSymbol): AstSymbol => {
    if (visited.has(s)) return s;
    visited.add(s);
    const target = (s as unknown as { target?: AstSymbol }).target;
    if (target === undefined) return s;
    return walk(target);
  };
  return walk(sym);
}

/**
 * Returns true when the identifier appears in a position where its
 * symbol resolution is meaningful (i.e. not in a comment or in a
 * declaration name).
 */
export function isMeaningfulIdentifierReference(node: AstNode): boolean {
  if (node.kind !== Kind.Identifier) return false;
  const parent = (node as unknown as { parent?: AstNode }).parent;
  if (parent === undefined) return true;
  // Declaration-name positions don't resolve to an existing symbol;
  // they create one.
  switch (parent.kind) {
    case Kind.VariableDeclaration:
    case Kind.Parameter:
    case Kind.FunctionDeclaration:
    case Kind.ClassDeclaration:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.EnumDeclaration:
    case Kind.ModuleDeclaration:
    case Kind.PropertyDeclaration:
    case Kind.MethodDeclaration: {
      const name = (parent as unknown as { name?: AstNode }).name;
      return name !== node;
    }
    default:
      return true;
  }
}
