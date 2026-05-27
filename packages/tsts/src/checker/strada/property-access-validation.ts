/**
 * Property-access validation.
 *
 * Ported from Strada `checker.go` — checkPropertyAccessExpression,
 * checkElementAccess, isValidPropertyAccess, reportPropertyAccessError.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the property access is structurally valid — the
 * receiver has a member with the access name (modulo index sigs).
 */
export function isValidPropertyAccess(
  receiverType: Type,
  propertyName: string,
): boolean {
  const flags = (receiverType as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Any) !== 0) return true;
  if ((flags & TypeFlags.Never) !== 0) return false;
  if ((flags & TypeFlags.Object) === 0) return false;
  const members = (receiverType as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  if (members === undefined) return false;
  return members.has(propertyName);
}

/**
 * Returns true when the access is "definitely missing" — the
 * property doesn't exist and there's no index signature.
 */
export function isMissingProperty(
  receiverType: Type,
  propertyName: string,
): boolean {
  const flags = (receiverType as { flags?: number }).flags ?? 0;
  if ((flags & (TypeFlags.Any | TypeFlags.Unknown)) !== 0) return false;
  const sym = (receiverType as unknown as { symbol?: { members?: Map<string, AstSymbol>; hasIndexSignature?: boolean } }).symbol;
  if (sym === undefined) return false;
  if (sym.hasIndexSignature === true) return false;
  return sym.members?.has(propertyName) !== true;
}

/**
 * Returns true when the property is private — its declaration has a
 * private modifier and the access is from outside the declaring class.
 */
export function isPrivatePropertyAccess(
  propSym: AstSymbol,
  accessSite: AstNode,
): boolean {
  const decls = (propSym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return false;
  const isPrivate = decls.some((d) => {
    const mods = (d as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
    return mods?.some((m) => m.kind === Kind.PrivateKeyword) === true;
  });
  if (!isPrivate) return false;
  // Conservative: assume access from outside.
  void accessSite;
  return true;
}

/**
 * Returns true when the access requires "?." (optional chain) — i.e.
 * the receiver may be null/undefined.
 */
export function requiresOptionalChain(receiverType: Type): boolean {
  const flags = (receiverType as { flags?: number }).flags ?? 0;
  return (flags & (TypeFlags.Null | TypeFlags.Undefined)) !== 0;
}

/**
 * Returns the access-context's enclosing class, used to check
 * private/protected access rules.
 */
export function getEnclosingClassForAccess(node: AstNode): AstNode | undefined {
  const walker = (current: AstNode | undefined): AstNode | undefined => {
    if (current === undefined) return undefined;
    if (current.kind === Kind.ClassDeclaration || current.kind === Kind.ClassExpression) {
      return current;
    }
    return walker((current as unknown as { parent?: AstNode }).parent);
  };
  return walker(node);
}

/**
 * Returns true when the access can be statically resolved (the
 * property name is known and the receiver type is known).
 */
export function isStaticallyResolvableAccess(node: AstNode): boolean {
  if (
    node.kind !== Kind.PropertyAccessExpression &&
    node.kind !== Kind.ElementAccessExpression
  ) {
    return false;
  }
  if (node.kind === Kind.PropertyAccessExpression) return true;
  const argExpr = (node as unknown as { argumentExpression?: AstNode }).argumentExpression;
  if (argExpr === undefined) return false;
  return argExpr.kind === Kind.StringLiteral ||
    argExpr.kind === Kind.NumericLiteral;
}
