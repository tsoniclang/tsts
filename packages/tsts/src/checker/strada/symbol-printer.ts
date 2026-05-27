/**
 * Symbol → display-string renderer.
 *
 * Ported from Strada `symbolaccessibility.go` / `printer.go` —
 * symbolToString, qualifiedNameToString.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns the canonical name of a symbol.
 */
export function getSymbolName(sym: AstSymbol): string {
  return (sym as unknown as { name?: string }).name ?? "(anonymous)";
}

/**
 * Renders a symbol as a TS-style display string, walking its parent
 * chain when present to produce a qualified name (`Foo.Bar.baz`).
 */
export function symbolToString(sym: AstSymbol): string {
  const parts: string[] = [];
  let current: AstSymbol | undefined = sym;
  while (current !== undefined) {
    parts.unshift(getSymbolName(current));
    current = (current as unknown as { parent?: AstSymbol }).parent;
  }
  return parts.join(".");
}

/**
 * Renders a qualified-name AST node (`A.B.C`) as a string.
 */
export function qualifiedNameToString(node: AstNode): string {
  switch (node.kind) {
    case Kind.Identifier:
      return (node as unknown as { escapedText?: string }).escapedText ?? "";
    case Kind.QualifiedName: {
      const left = (node as unknown as { left?: AstNode }).left;
      const right = (node as unknown as { right?: AstNode }).right;
      const lp = left !== undefined ? qualifiedNameToString(left) : "";
      const rp = right !== undefined ? qualifiedNameToString(right) : "";
      return lp + "." + rp;
    }
    case Kind.PropertyAccessExpression: {
      const expr = (node as unknown as { expression?: AstNode }).expression;
      const name = (node as unknown as { name?: AstNode }).name;
      const lp = expr !== undefined ? qualifiedNameToString(expr) : "";
      const rp = name !== undefined ? qualifiedNameToString(name) : "";
      return lp + "." + rp;
    }
    default:
      return "";
  }
}

/**
 * Returns the file path where a symbol's first declaration lives.
 */
export function getSymbolDeclarationFile(sym: AstSymbol): string | undefined {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return undefined;
  const sf = walkToSourceFile(decls[0]!);
  return sf !== undefined ? (sf as unknown as { fileName?: string }).fileName : undefined;
}

function walkToSourceFile(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.SourceFile) return current;
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

/**
 * Returns true when the symbol has a public declaration. Walks the
 * declaration list and checks for a non-private modifier.
 */
export function isPublicSymbol(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return true;
  for (const decl of decls) {
    const mods = (decl as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
    if (mods === undefined) return true;
    if (mods.some((m) => m.kind === Kind.PrivateKeyword || m.kind === Kind.ProtectedKeyword)) {
      return false;
    }
  }
  return true;
}
