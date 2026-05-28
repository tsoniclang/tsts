/**
 * TypeOperator node handling (`keyof`, `readonly`, `unique`).
 *
 * Ported from Strada `checker.go` — getTypeFromTypeOperatorNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a TypeOperator.
 */
export function isTypeOperatorNode(node: AstNode): boolean {
  return node.kind === Kind.TypeOperator;
}

/**
 * Returns the operator-kind of a TypeOperator
 * (KeyOfKeyword / ReadonlyKeyword / UniqueKeyword).
 */
export function getTypeOperatorKind(node: AstNode): number | undefined {
  if (!isTypeOperatorNode(node)) return undefined;
  return (node as unknown as { operator?: number }).operator;
}

/**
 * Returns the operand type-node of a TypeOperator.
 */
export function getTypeOperatorOperand(node: AstNode): AstNode | undefined {
  if (!isTypeOperatorNode(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns true when the operator is `keyof`.
 */
export function isKeyofOperator(node: AstNode): boolean {
  return getTypeOperatorKind(node) === Kind.KeyOfKeyword;
}

/**
 * Returns true when the operator is `readonly`.
 */
export function isReadonlyOperator(node: AstNode): boolean {
  return getTypeOperatorKind(node) === Kind.ReadonlyKeyword;
}

/**
 * Returns true when the operator is `unique`.
 */
export function isUniqueOperator(node: AstNode): boolean {
  return getTypeOperatorKind(node) === Kind.UniqueKeyword;
}

/**
 * Returns true when the readonly operator applies to an array /
 * tuple type (`readonly T[]`).
 */
export function isReadonlyArrayOrTuple(node: AstNode): boolean {
  if (!isReadonlyOperator(node)) return false;
  const operand = getTypeOperatorOperand(node);
  if (operand === undefined) return false;
  return operand.kind === Kind.ArrayType || operand.kind === Kind.TupleType;
}

/**
 * Returns true when the unique operator applies to `symbol`
 * (`unique symbol`).
 */
export function isUniqueSymbol(node: AstNode): boolean {
  if (!isUniqueOperator(node)) return false;
  const operand = getTypeOperatorOperand(node);
  if (operand === undefined) return false;
  return operand.kind === Kind.SymbolKeyword;
}

/**
 * Returns the operator name as a string.
 */
export function getTypeOperatorName(node: AstNode): string {
  const op = getTypeOperatorKind(node);
  switch (op) {
    case Kind.KeyOfKeyword: return "keyof";
    case Kind.ReadonlyKeyword: return "readonly";
    case Kind.UniqueKeyword: return "unique";
    default: return "(unknown)";
  }
}
