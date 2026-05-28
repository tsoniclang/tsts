/**
 * Class-member typing helpers.
 *
 * Ported from Strada `checker.go` — getTypeOfClassMember,
 * checkClassMemberDeclaration, isMemberDeclarationSyntax.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when the node is one of the class-member syntactic
 * forms.
 */
export function isClassMemberSyntax(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.PropertyDeclaration:
    case Kind.MethodDeclaration:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.ClassStaticBlockDeclaration:
    case Kind.IndexSignature:
    case Kind.SemicolonClassElement:
      return true;
    default:
      return false;
  }
}

/**
 * Returns the type annotation of a class member.
 */
export function getMemberTypeAnnotation(node: AstNode): AstNode | undefined {
  if (!isClassMemberSyntax(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns the initializer of a class property.
 */
export function getPropertyInitializer(node: AstNode): AstNode | undefined {
  if (node.kind !== Kind.PropertyDeclaration) return undefined;
  return (node as unknown as { initializer?: AstNode }).initializer;
}

/**
 * Returns the resolved type of a class member.
 */
export function getMemberResolvedType(node: AstNode): Type {
  const annot = getMemberTypeAnnotation(node);
  if (annot !== undefined) {
    const resolved = (annot as unknown as { resolvedType?: Type }).resolvedType;
    if (resolved !== undefined) return resolved;
  }
  const init = getPropertyInitializer(node);
  if (init !== undefined) {
    const resolved = (init as unknown as { resolvedType?: Type }).resolvedType;
    if (resolved !== undefined) return resolved;
  }
  return ANY;
}

/**
 * Returns the symbol of a class member.
 */
export function getMemberSymbol(node: AstNode): AstSymbol | undefined {
  if (!isClassMemberSyntax(node)) return undefined;
  return (node as unknown as { symbol?: AstSymbol }).symbol;
}

/**
 * Returns true when the member has a "definite assignment assertion"
 * (`!:`).
 */
export function hasDefiniteAssignment(node: AstNode): boolean {
  if (node.kind !== Kind.PropertyDeclaration) return false;
  return (node as unknown as { exclamationToken?: AstNode }).exclamationToken !== undefined;
}

/**
 * Returns true when the member is one of the constructor-like forms.
 */
export function isConstructorMember(node: AstNode): boolean {
  return node.kind === Kind.Constructor;
}

/**
 * Returns true when the member is one of the accessor forms.
 */
export function isAccessorMember(node: AstNode): boolean {
  return node.kind === Kind.GetAccessor || node.kind === Kind.SetAccessor;
}
