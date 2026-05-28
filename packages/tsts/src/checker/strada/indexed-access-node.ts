/**
 * IndexedAccessType node handling (`T[K]`).
 *
 * Ported from Strada `checker.go` — getTypeFromIndexedAccessTypeNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is an IndexedAccessType.
 */
export function isIndexedAccessTypeNode(node: AstNode): boolean {
  return node.kind === Kind.IndexedAccessType;
}

/**
 * Returns the object type-node of an IndexedAccessType.
 */
export function getIndexedAccessObjectTypeNode(node: AstNode): AstNode | undefined {
  if (!isIndexedAccessTypeNode(node)) return undefined;
  return (node as unknown as { objectType?: AstNode }).objectType;
}

/**
 * Returns the index type-node of an IndexedAccessType.
 */
export function getIndexedAccessIndexTypeNode(node: AstNode): AstNode | undefined {
  if (!isIndexedAccessTypeNode(node)) return undefined;
  return (node as unknown as { indexType?: AstNode }).indexType;
}

/**
 * Returns true when the index is a literal type (`T["foo"]`).
 */
export function isLiteralIndexAccess(node: AstNode): boolean {
  const indexType = getIndexedAccessIndexTypeNode(node);
  if (indexType === undefined) return false;
  if (indexType.kind !== Kind.LiteralType) return false;
  const literal = (indexType as unknown as { literal?: AstNode }).literal;
  if (literal === undefined) return false;
  return (
    literal.kind === Kind.StringLiteral ||
    literal.kind === Kind.NumericLiteral
  );
}

/**
 * Returns the literal-key string of an indexed access, if the index
 * is a string literal.
 */
export function getIndexedAccessLiteralKey(node: AstNode): string | undefined {
  if (!isLiteralIndexAccess(node)) return undefined;
  const indexType = getIndexedAccessIndexTypeNode(node);
  if (indexType === undefined) return undefined;
  const literal = (indexType as unknown as { literal?: AstNode }).literal;
  if (literal === undefined) return undefined;
  return (literal as unknown as { text?: string }).text;
}

/**
 * Returns true when the index is `keyof` of the object — `T[keyof T]`.
 */
export function isKeyofIndexAccess(node: AstNode): boolean {
  const indexType = getIndexedAccessIndexTypeNode(node);
  if (indexType === undefined) return false;
  if (indexType.kind !== Kind.TypeOperator) return false;
  return (indexType as unknown as { operator?: number }).operator === Kind.KeyOfKeyword;
}

/**
 * Returns true when the index is `number` (`T[number]`).
 */
export function isNumberIndexAccess(node: AstNode): boolean {
  const indexType = getIndexedAccessIndexTypeNode(node);
  return indexType !== undefined && indexType.kind === Kind.NumberKeyword;
}
