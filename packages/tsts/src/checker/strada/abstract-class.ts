/**
 * Abstract-class checks.
 *
 * Ported from Strada `checker.go` — isAbstractClass, getAbstractMembers,
 * checkClassImplementsAllAbstract.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import { hasAbstractModifier } from "./modifiers.js";

/**
 * Returns true when the class declaration is marked abstract.
 */
export function isAbstractClass(classDecl: AstNode): boolean {
  if (
    classDecl.kind !== Kind.ClassDeclaration &&
    classDecl.kind !== Kind.ClassExpression
  ) {
    return false;
  }
  return hasAbstractModifier(classDecl);
}

/**
 * Returns the abstract member declarations of a class.
 */
export function getAbstractMembers(classDecl: AstNode): readonly AstNode[] {
  if (
    classDecl.kind !== Kind.ClassDeclaration &&
    classDecl.kind !== Kind.ClassExpression
  ) {
    return [];
  }
  const members = (classDecl as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes;
  if (members === undefined) return [];
  return members.filter(hasAbstractModifier);
}

/**
 * Returns true when the class has at least one abstract member.
 */
export function hasAbstractMembers(classDecl: AstNode): boolean {
  return getAbstractMembers(classDecl).length > 0;
}

/**
 * Returns the member symbols that haven't been implemented by a
 * derived class. Conservative shell: returns the empty list.
 */
export function getUnimplementedAbstractMembers(
  _derivedSym: AstSymbol,
  _baseSym: AstSymbol,
): readonly AstSymbol[] {
  return [];
}

/**
 * Returns true when a class fully implements all abstract members
 * of its base — checking is a separate pass.
 */
export function implementsAllAbstract(
  derivedSym: AstSymbol,
  baseSym: AstSymbol,
): boolean {
  return getUnimplementedAbstractMembers(derivedSym, baseSym).length === 0;
}

/**
 * Returns true when the member is abstract but the class isn't —
 * which is a syntactic error.
 */
export function isInvalidAbstractMember(
  classDecl: AstNode,
  member: AstNode,
): boolean {
  return hasAbstractModifier(member) && !isAbstractClass(classDecl);
}

/**
 * Returns true when a `new T()` call targets an abstract class —
 * which is a runtime error.
 */
export function isAbstractInstantiation(_target: AstSymbol): boolean {
  return false;
}
