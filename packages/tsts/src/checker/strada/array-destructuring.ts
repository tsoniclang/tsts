/**
 * Array-destructuring assignment / declaration.
 *
 * Ported from Strada `checker.go` — checkArrayLiteralAssignment,
 * getTypeForBindingElementFromArray.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when the node is an array binding pattern.
 */
export function isArrayBindingPattern(node: AstNode): boolean {
  return node.kind === Kind.ArrayBindingPattern;
}

/**
 * Returns the binding elements of an ArrayBindingPattern.
 */
export function getArrayBindingElements(node: AstNode): readonly AstNode[] {
  if (!isArrayBindingPattern(node)) return [];
  const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements;
  return elements?.nodes ?? [];
}

/**
 * Returns the element type at a given binding index — for arrays
 * this is just the array's element type; for tuples it indexes in.
 */
export function getTypeAtBindingIndex(
  sourceType: Type,
  index: number,
): Type {
  // Tuple — index in.
  const elementTypes = (sourceType as unknown as { elementTypes?: readonly Type[] }).elementTypes;
  if (elementTypes !== undefined) {
    if (index < elementTypes.length) return elementTypes[index]!;
    if ((sourceType as unknown as { hasRestElement?: boolean }).hasRestElement === true) {
      return elementTypes[elementTypes.length - 1]!;
    }
    return ANY;
  }
  // Plain array — return element type.
  const elementType = (sourceType as unknown as { elementType?: Type }).elementType;
  return elementType ?? ANY;
}

/**
 * Returns the rest element index in an array binding pattern, or -1.
 */
export function getRestBindingIndex(node: AstNode): number {
  const elements = getArrayBindingElements(node);
  return elements.findIndex(
    (e) => (e as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined,
  );
}

/**
 * Returns the count of bindings in an array pattern (excluding rest).
 */
export function getArrayBindingCount(node: AstNode): number {
  const restIdx = getRestBindingIndex(node);
  const elements = getArrayBindingElements(node);
  return restIdx === -1 ? elements.length : restIdx;
}

/**
 * Returns true when the binding pattern contains a hole (`[, , x]`).
 */
export function hasOmittedElement(node: AstNode): boolean {
  return getArrayBindingElements(node).some(
    (e) => e.kind === Kind.OmittedExpression,
  );
}
