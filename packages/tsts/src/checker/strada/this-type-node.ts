/**
 * ThisType node handling (`this` in type position).
 *
 * Ported from Strada `checker.go` — getTypeFromThisTypeNode,
 * getThisTypeOfDeclaration.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a ThisType.
 */
export function isThisTypeNode(node: AstNode): boolean {
  return node.kind === Kind.ThisType;
}

/**
 * Returns the enclosing class/interface declaration of a `this`
 * type reference.
 */
export function getEnclosingClassOrInterface(node: AstNode): AstNode | undefined {
  const walker = (current: AstNode | undefined): AstNode | undefined => {
    if (current === undefined) return undefined;
    switch (current.kind) {
      case Kind.ClassDeclaration:
      case Kind.ClassExpression:
      case Kind.InterfaceDeclaration:
        return current;
    }
    return walker((current as unknown as { parent?: AstNode }).parent);
  };
  return walker((node as unknown as { parent?: AstNode }).parent);
}

/**
 * Returns true when the `this` type reference is legal — appears
 * inside a class or interface.
 */
export function isThisTypeLegal(node: AstNode): boolean {
  return getEnclosingClassOrInterface(node) !== undefined;
}

/**
 * Returns true when the node contains a `this` type reference
 * anywhere within it.
 */
export function containsThisType(node: AstNode): boolean {
  if (isThisTypeNode(node)) return true;
  const children = (node as unknown as { children?: () => readonly AstNode[] }).children;
  if (typeof children !== "function") return false;
  for (const c of children.call(node)) {
    if (containsThisType(c)) return true;
  }
  return false;
}

/**
 * Returns true when a method's return type is `this` (fluent /
 * polymorphic-this pattern).
 */
export function returnsThis(decl: AstNode): boolean {
  const type = (decl as unknown as { type?: AstNode }).type;
  return type !== undefined && isThisTypeNode(type);
}
