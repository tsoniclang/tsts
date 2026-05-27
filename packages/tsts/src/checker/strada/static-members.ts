/**
 * Static-member resolution.
 *
 * Ported from Strada `checker.go` — getStaticMembers, getStaticSymbol,
 * isStaticContext, lookupStaticMemberOnClass.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import { hasStaticModifier } from "./modifiers.js";

/**
 * Returns true when the member declaration has the `static` keyword.
 */
export function isStaticMember(member: AstNode): boolean {
  return hasStaticModifier(member);
}

/**
 * Returns the static-side members of a class declaration.
 */
export function getStaticMembers(classDecl: AstNode): readonly AstNode[] {
  if (
    classDecl.kind !== Kind.ClassDeclaration &&
    classDecl.kind !== Kind.ClassExpression
  ) {
    return [];
  }
  const members = (classDecl as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes;
  if (members === undefined) return [];
  return members.filter(isStaticMember);
}

/**
 * Returns the instance-side members of a class declaration.
 */
export function getInstanceMembers(classDecl: AstNode): readonly AstNode[] {
  if (
    classDecl.kind !== Kind.ClassDeclaration &&
    classDecl.kind !== Kind.ClassExpression
  ) {
    return [];
  }
  const members = (classDecl as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes;
  if (members === undefined) return [];
  return members.filter((m) => !isStaticMember(m));
}

/**
 * Returns true when the context is the static side of a class —
 * `this` references the constructor function, not an instance.
 */
export function isInStaticContext(node: AstNode): boolean {
  const walker = (current: AstNode | undefined): boolean => {
    if (current === undefined) return false;
    if (
      current.kind === Kind.MethodDeclaration ||
      current.kind === Kind.PropertyDeclaration ||
      current.kind === Kind.GetAccessor ||
      current.kind === Kind.SetAccessor
    ) {
      return isStaticMember(current);
    }
    if (
      current.kind === Kind.ClassDeclaration ||
      current.kind === Kind.ClassExpression
    ) {
      return false;
    }
    return walker((current as unknown as { parent?: AstNode }).parent);
  };
  return walker(node);
}

/**
 * Returns the symbol's static-side symbol — the constructor symbol
 * that owns static members.
 */
export function getStaticSymbol(sym: AstSymbol): AstSymbol | undefined {
  return (sym as unknown as { staticSymbol?: AstSymbol }).staticSymbol;
}

/**
 * Returns the symbol for a static member by name.
 */
export function lookupStaticMember(
  classSym: AstSymbol,
  memberName: string,
): AstSymbol | undefined {
  const staticSide = getStaticSymbol(classSym);
  const members = (staticSide as unknown as { members?: Map<string, AstSymbol> })?.members;
  return members?.get(memberName);
}

/**
 * Returns true when the symbol is a static method.
 */
export function isStaticMethodSymbol(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return false;
  return decls.some((d) => d.kind === Kind.MethodDeclaration && hasStaticModifier(d));
}

/**
 * Returns true when the symbol is a static property.
 */
export function isStaticPropertySymbol(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return false;
  return decls.some((d) => d.kind === Kind.PropertyDeclaration && hasStaticModifier(d));
}
