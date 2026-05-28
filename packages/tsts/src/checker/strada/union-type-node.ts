/**
 * UnionType / IntersectionType node handling.
 *
 * Ported from Strada `checker.go` — getTypeFromUnionTypeNode,
 * getTypeFromIntersectionTypeNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a UnionType.
 */
export function isUnionTypeNode(node: AstNode): boolean {
  return node.kind === Kind.UnionType;
}

/**
 * Returns true when the node is an IntersectionType.
 */
export function isIntersectionTypeNode(node: AstNode): boolean {
  return node.kind === Kind.IntersectionType;
}

/**
 * Returns the member type-nodes of a UnionType.
 */
export function getUnionTypeMembers(node: AstNode): readonly AstNode[] {
  if (!isUnionTypeNode(node)) return [];
  const types = (node as unknown as { types?: { nodes?: readonly AstNode[] } }).types;
  return types?.nodes ?? [];
}

/**
 * Returns the member type-nodes of an IntersectionType.
 */
export function getIntersectionTypeMembers(node: AstNode): readonly AstNode[] {
  if (!isIntersectionTypeNode(node)) return [];
  const types = (node as unknown as { types?: { nodes?: readonly AstNode[] } }).types;
  return types?.nodes ?? [];
}

/**
 * Returns the member count of a union/intersection type node.
 */
export function getCompositeTypeNodeArity(node: AstNode): number {
  if (isUnionTypeNode(node)) return getUnionTypeMembers(node).length;
  if (isIntersectionTypeNode(node)) return getIntersectionTypeMembers(node).length;
  return 0;
}

/**
 * Flattens nested union members — `A | (B | C)` → [A, B, C].
 */
export function flattenUnionMembers(node: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  const walker = (n: AstNode): void => {
    if (isUnionTypeNode(n)) {
      for (const m of getUnionTypeMembers(n)) walker(m);
      return;
    }
    if (n.kind === Kind.ParenthesizedType) {
      const inner = (n as unknown as { type?: AstNode }).type;
      if (inner !== undefined) {
        walker(inner);
        return;
      }
    }
    out.push(n);
  };
  walker(node);
  return out;
}

/**
 * Flattens nested intersection members.
 */
export function flattenIntersectionMembers(node: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  const walker = (n: AstNode): void => {
    if (isIntersectionTypeNode(n)) {
      for (const m of getIntersectionTypeMembers(n)) walker(m);
      return;
    }
    if (n.kind === Kind.ParenthesizedType) {
      const inner = (n as unknown as { type?: AstNode }).type;
      if (inner !== undefined) {
        walker(inner);
        return;
      }
    }
    out.push(n);
  };
  walker(node);
  return out;
}

/**
 * Returns true when the union type-node contains a `null` or
 * `undefined` member.
 */
export function unionTypeNodeHasNullable(node: AstNode): boolean {
  return getUnionTypeMembers(node).some((m) =>
    m.kind === Kind.NullKeyword ||
    m.kind === Kind.UndefinedKeyword,
  );
}
