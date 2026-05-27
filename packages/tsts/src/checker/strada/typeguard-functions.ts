/**
 * User-defined type guards.
 *
 * Ported from Strada `checker.go` — getTypePredicateOfSignature,
 * checkTypeGuardReturnType, narrowByTypePredicate.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Signature, Type } from "../types.js";
import { TypeFlags } from "../types.js";

const BOOLEAN: Type = { flags: TypeFlags.Boolean } as unknown as Type;

/**
 * Returns true when the signature has a type-predicate return type
 * (`x is T`).
 */
export function isTypeGuardSignature(sig: Signature): boolean {
  const decl = (sig as unknown as { declaration?: AstNode }).declaration;
  if (decl === undefined) return false;
  const type = (decl as unknown as { type?: AstNode }).type;
  return type !== undefined && type.kind === Kind.TypePredicate;
}

/**
 * Returns the parameter name of the type-predicate.
 */
export function getTypeGuardParameter(sig: Signature): string | undefined {
  const decl = (sig as unknown as { declaration?: AstNode }).declaration;
  if (decl === undefined) return undefined;
  const type = (decl as unknown as { type?: AstNode }).type;
  if (type === undefined || type.kind !== Kind.TypePredicate) return undefined;
  const param = (type as unknown as { parameterName?: AstNode }).parameterName;
  if (param === undefined) return undefined;
  if (param.kind === Kind.Identifier) {
    return (param as unknown as { escapedText?: string }).escapedText;
  }
  if (param.kind === Kind.ThisType) return "this";
  return undefined;
}

/**
 * Returns the predicate type — the `T` in `x is T`.
 */
export function getTypeGuardType(sig: Signature): AstNode | undefined {
  const decl = (sig as unknown as { declaration?: AstNode }).declaration;
  if (decl === undefined) return undefined;
  const type = (decl as unknown as { type?: AstNode }).type;
  if (type === undefined || type.kind !== Kind.TypePredicate) return undefined;
  return (type as unknown as { type?: AstNode }).type;
}

/**
 * Returns the runtime return type of a type-guard — always boolean.
 */
export function getTypeGuardRuntimeReturnType(): Type {
  return BOOLEAN;
}

/**
 * Returns true when the call is to a user-defined type guard.
 */
export function isCallToTypeGuard(node: AstNode, sig: Signature): boolean {
  if (node.kind !== Kind.CallExpression) return false;
  return isTypeGuardSignature(sig);
}

/**
 * Returns true when the type-predicate is an "asserts" predicate
 * (`asserts x is T` or `asserts x`).
 */
export function isAssertsPredicate(sig: Signature): boolean {
  const decl = (sig as unknown as { declaration?: AstNode }).declaration;
  if (decl === undefined) return false;
  const type = (decl as unknown as { type?: AstNode }).type;
  if (type === undefined || type.kind !== Kind.TypePredicate) return false;
  return (type as unknown as { assertsModifier?: AstNode }).assertsModifier !== undefined;
}

/**
 * Returns the predicate parameter index in a function signature
 * (-1 when the predicate refers to `this`).
 */
export function getTypeGuardParameterIndex(sig: Signature): number {
  const paramName = getTypeGuardParameter(sig);
  if (paramName === undefined) return -1;
  if (paramName === "this") return -1;
  const params = sig.parameters ?? [];
  return params.findIndex((p) => {
    const name = (p as unknown as { name?: string }).name;
    return name === paramName;
  });
}
