/**
 * Method-resolution for method calls.
 *
 * Ported from Strada `checker.go` — resolveMethodAccess,
 * getMethodSignatures, isMethodCall, lookupMethodOnType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Signature, Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the method symbols on a type.
 */
export function getMethodSymbols(t: Type): readonly AstSymbol[] {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return [];
  const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  if (members === undefined) return [];
  const out: AstSymbol[] = [];
  for (const sym of members.values()) {
    if (isMethodSymbol(sym)) out.push(sym);
  }
  return out;
}

/**
 * Returns true when the symbol represents a method (its first
 * declaration is a MethodDeclaration / MethodSignature).
 */
export function isMethodSymbol(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return false;
  return decls.some((d) =>
    d.kind === Kind.MethodDeclaration ||
    d.kind === Kind.MethodSignature,
  );
}

/**
 * Returns the method on a type with the given name.
 */
export function lookupMethodOnType(t: Type, methodName: string): AstSymbol | undefined {
  const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  if (members === undefined) return undefined;
  const sym = members.get(methodName);
  if (sym !== undefined && isMethodSymbol(sym)) return sym;
  return undefined;
}

/**
 * Returns the call-signatures of a method symbol.
 */
export function getMethodCallSignatures(sym: AstSymbol): readonly Signature[] {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return [];
  const out: Signature[] = [];
  for (const decl of decls) {
    if (decl.kind === Kind.MethodDeclaration || decl.kind === Kind.MethodSignature) {
      const sig = (decl as unknown as { signature?: Signature }).signature;
      if (sig !== undefined) out.push(sig);
    }
  }
  return out;
}

/**
 * Returns true when the access expression refers to a method (not a
 * regular property).
 */
export function isMethodAccess(node: AstNode, sym: AstSymbol | undefined): boolean {
  if (sym === undefined) return false;
  if (
    node.kind !== Kind.PropertyAccessExpression &&
    node.kind !== Kind.ElementAccessExpression
  ) {
    return false;
  }
  return isMethodSymbol(sym);
}

/**
 * Returns the methods of an interface or class hierarchy, deduped
 * by name. Conservative shell: returns only the direct members.
 */
export function getAllMethodsInHierarchy(t: Type): readonly AstSymbol[] {
  return getMethodSymbols(t);
}

/**
 * Returns true when the access expression is a method call —
 * `obj.method(...)`.
 */
export function isMethodCall(node: AstNode): boolean {
  if (node.kind !== Kind.CallExpression) return false;
  const expr = (node as unknown as { expression?: AstNode }).expression;
  return expr !== undefined &&
    (expr.kind === Kind.PropertyAccessExpression || expr.kind === Kind.ElementAccessExpression);
}
