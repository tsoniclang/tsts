/**
 * TypePredicate node handling (`x is T`, `asserts x`).
 *
 * Ported from Strada `checker.go` — getTypePredicateFromTypeNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a TypePredicate.
 */
export function isTypePredicateNode(node: AstNode): boolean {
  return node.kind === Kind.TypePredicate;
}

/**
 * Returns the parameter-name node of a TypePredicate.
 */
export function getTypePredicateParameterName(node: AstNode): AstNode | undefined {
  if (!isTypePredicateNode(node)) return undefined;
  return (node as unknown as { parameterName?: AstNode }).parameterName;
}

/**
 * Returns the type-node of a TypePredicate (the `T` in `x is T`).
 */
export function getTypePredicateType(node: AstNode): AstNode | undefined {
  if (!isTypePredicateNode(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns true when the predicate has an `asserts` modifier.
 */
export function hasAssertsModifier(node: AstNode): boolean {
  if (!isTypePredicateNode(node)) return false;
  return (node as unknown as { assertsModifier?: AstNode }).assertsModifier !== undefined;
}

/**
 * Returns true when the predicate refers to `this`
 * (`this is T`).
 */
export function isThisTypePredicate(node: AstNode): boolean {
  const param = getTypePredicateParameterName(node);
  return param !== undefined && param.kind === Kind.ThisType;
}

/**
 * Returns the predicate parameter-name text.
 */
export function getTypePredicateParameterText(node: AstNode): string | undefined {
  const param = getTypePredicateParameterName(node);
  if (param === undefined) return undefined;
  if (param.kind === Kind.Identifier) {
    return (param as unknown as { escapedText?: string }).escapedText;
  }
  if (param.kind === Kind.ThisType) return "this";
  return undefined;
}

/**
 * Returns true when the predicate is a pure assertion (`asserts x`
 * without a type).
 */
export function isPureAssertion(node: AstNode): boolean {
  return hasAssertsModifier(node) && getTypePredicateType(node) === undefined;
}

/**
 * Returns true when the predicate is `asserts x is T`.
 */
export function isAssertsIsPredicate(node: AstNode): boolean {
  return hasAssertsModifier(node) && getTypePredicateType(node) !== undefined;
}
