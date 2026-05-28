/**
 * ArrayType / TupleType node handling.
 *
 * Ported from Strada `checker.go` — getTypeFromArrayTypeNode,
 * getTypeFromTupleTypeNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is an ArrayType (`T[]`).
 */
export function isArrayTypeNode(node: AstNode): boolean {
  return node.kind === Kind.ArrayType;
}

/**
 * Returns true when the node is a TupleType (`[T, U]`).
 */
export function isTupleTypeNode(node: AstNode): boolean {
  return node.kind === Kind.TupleType;
}

/**
 * Returns the element type-node of an ArrayType.
 */
export function getArrayElementTypeNode(node: AstNode): AstNode | undefined {
  if (!isArrayTypeNode(node)) return undefined;
  return (node as unknown as { elementType?: AstNode }).elementType;
}

/**
 * Returns the element type-nodes of a TupleType.
 */
export function getTupleElementTypeNodes(node: AstNode): readonly AstNode[] {
  if (!isTupleTypeNode(node)) return [];
  const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements;
  return elements?.nodes ?? [];
}

/**
 * Returns true when a tuple element is a NamedTupleMember
 * (`[x: number]`).
 */
export function isNamedTupleMember(node: AstNode): boolean {
  return node.kind === Kind.NamedTupleMember;
}

/**
 * Returns true when a tuple element is optional (`[T?]`).
 */
export function isOptionalTupleElement(node: AstNode): boolean {
  return node.kind === Kind.OptionalType;
}

/**
 * Returns true when a tuple element is a rest element (`[...T[]]`).
 */
export function isRestTupleElement(node: AstNode): boolean {
  return node.kind === Kind.RestType;
}

/**
 * Returns the inner type of an optional / rest tuple element.
 */
export function getTupleElementInnerType(node: AstNode): AstNode | undefined {
  if (node.kind === Kind.OptionalType || node.kind === Kind.RestType) {
    return (node as unknown as { type?: AstNode }).type;
  }
  if (node.kind === Kind.NamedTupleMember) {
    return (node as unknown as { type?: AstNode }).type;
  }
  return node;
}

/**
 * Returns the arity (element count) of a tuple type node.
 */
export function getTupleTypeNodeArity(node: AstNode): number {
  return getTupleElementTypeNodes(node).length;
}

/**
 * Returns true when the tuple has a rest element anywhere.
 */
export function tupleHasRestElement(node: AstNode): boolean {
  return getTupleElementTypeNodes(node).some(isRestTupleElement);
}

/**
 * Returns the index of the first optional element, or -1.
 */
export function getFirstOptionalIndex(node: AstNode): number {
  return getTupleElementTypeNodes(node).findIndex(isOptionalTupleElement);
}
