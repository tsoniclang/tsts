/**
 * TypeReferenceNode resolution.
 *
 * Ported from Strada `checker.go` — getTypeFromTypeReference,
 * resolveTypeReferenceName.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a TypeReference.
 */
export function isTypeReferenceNode(node: AstNode): boolean {
  return node.kind === Kind.TypeReference;
}

/**
 * Returns the typeName node of a TypeReference (Identifier or
 * QualifiedName).
 */
export function getTypeReferenceName(node: AstNode): AstNode | undefined {
  if (!isTypeReferenceNode(node)) return undefined;
  return (node as unknown as { typeName?: AstNode }).typeName;
}

/**
 * Returns the type-arguments of a TypeReference.
 */
export function getTypeReferenceTypeArguments(node: AstNode): readonly AstNode[] {
  if (!isTypeReferenceNode(node)) return [];
  const ta = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments;
  return ta?.nodes ?? [];
}

/**
 * Returns the leftmost identifier of a QualifiedName chain.
 */
export function getQualifiedNameRoot(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.Identifier) return current;
    if (current.kind === Kind.QualifiedName) {
      current = (current as unknown as { left?: AstNode }).left;
      continue;
    }
    return undefined;
  }
  return undefined;
}

/**
 * Returns the rightmost identifier of a QualifiedName (the actual
 * name being looked up).
 */
export function getQualifiedNameTail(node: AstNode): AstNode | undefined {
  if (node.kind === Kind.Identifier) return node;
  if (node.kind === Kind.QualifiedName) {
    return (node as unknown as { right?: AstNode }).right;
  }
  return undefined;
}

/**
 * Returns the full dotted path of a TypeReference name
 * (`A.B.C` → ["A", "B", "C"]).
 */
export function getTypeReferenceNamePath(node: AstNode): readonly string[] {
  const out: string[] = [];
  const walker = (n: AstNode | undefined): void => {
    if (n === undefined) return;
    if (n.kind === Kind.QualifiedName) {
      const left = (n as unknown as { left?: AstNode }).left;
      const right = (n as unknown as { right?: AstNode }).right;
      walker(left);
      if (right !== undefined && right.kind === Kind.Identifier) {
        const text = (right as unknown as { escapedText?: string }).escapedText;
        if (text !== undefined) out.push(text);
      }
      return;
    }
    if (n.kind === Kind.Identifier) {
      const text = (n as unknown as { escapedText?: string }).escapedText;
      if (text !== undefined) out.push(text);
    }
  };
  walker(getTypeReferenceName(node));
  return out;
}

/**
 * Returns the count of type-arguments on a TypeReference.
 */
export function getTypeReferenceArity(node: AstNode): number {
  return getTypeReferenceTypeArguments(node).length;
}
