/**
 * Type predicates + assertion functions.
 *
 * Ported from Strada `checker.go` — getTypePredicateOfSignature,
 * isAssertionFunction, narrowTypeByTypePredicate.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";

export const TypePredicateKind = {
  This: 0,
  Identifier: 1,
  AssertsThis: 2,
  AssertsIdentifier: 3,
} as const;

export type TypePredicateKind =
  | typeof TypePredicateKind.This
  | typeof TypePredicateKind.Identifier
  | typeof TypePredicateKind.AssertsThis
  | typeof TypePredicateKind.AssertsIdentifier;

export interface TypePredicate {
  readonly kind: TypePredicateKind;
  readonly parameterName?: string | undefined;
  readonly parameterIndex?: number | undefined;
  readonly type?: Type | undefined;
}

/**
 * Builds an identifier-style predicate (`x is T`).
 */
export function createIdentifierTypePredicate(
  parameterName: string,
  parameterIndex: number,
  type: Type,
): TypePredicate {
  return {
    kind: TypePredicateKind.Identifier,
    parameterName,
    parameterIndex,
    type,
  };
}

/**
 * Builds a `this is T` predicate.
 */
export function createThisTypePredicate(type: Type): TypePredicate {
  return { kind: TypePredicateKind.This, type };
}

/**
 * Builds an `asserts x is T` predicate.
 */
export function createAssertsIdentifierTypePredicate(
  parameterName: string,
  parameterIndex: number,
  type: Type | undefined,
): TypePredicate {
  return {
    kind: TypePredicateKind.AssertsIdentifier,
    parameterName,
    parameterIndex,
    type,
  };
}

/**
 * Builds an `asserts this is T` predicate.
 */
export function createAssertsThisTypePredicate(
  type: Type | undefined,
): TypePredicate {
  return { kind: TypePredicateKind.AssertsThis, type };
}

/**
 * Returns true when the signature is an assertion function — its
 * return-type annotation starts with the `asserts` keyword.
 */
export function isAssertionSignature(decl: AstNode): boolean {
  const type = (decl as unknown as { type?: AstNode }).type;
  if (type === undefined) return false;
  if (type.kind === Kind.TypePredicate) {
    const assertsModifier = (type as unknown as { assertsModifier?: AstNode }).assertsModifier;
    return assertsModifier !== undefined;
  }
  return false;
}

/**
 * Returns true when the predicate is one of the `asserts …` shapes.
 */
export function isAssertsPredicate(p: TypePredicate): boolean {
  return p.kind === TypePredicateKind.AssertsThis ||
    p.kind === TypePredicateKind.AssertsIdentifier;
}

/**
 * Returns true when the predicate refers to `this` (vs. a named
 * parameter).
 */
export function isThisPredicate(p: TypePredicate): boolean {
  return p.kind === TypePredicateKind.This ||
    p.kind === TypePredicateKind.AssertsThis;
}

/**
 * Returns true when the predicate has a guarded type (every shape
 * except `asserts x` without a type).
 */
export function hasGuardedType(p: TypePredicate): boolean {
  return p.type !== undefined;
}
