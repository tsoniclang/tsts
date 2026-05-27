/**
 * Contextual typing for call arguments.
 *
 * Ported from Strada `checker.go` — getContextualTypeForArgument,
 * getContextualTypeForArgumentAtIndex, getContextualTypeForCall.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Signature, Type } from "../types.js";
import { getParameterTypeAt } from "./call-resolution.js";

/**
 * Returns the parameter type that an argument at `index` would be
 * checked against in a call to `signature`.
 */
export function getContextualTypeForArgumentAtIndex(
  signature: Signature,
  index: number,
): Type | undefined {
  return getParameterTypeAt(signature, index);
}

/**
 * Returns the type at the index of a tuple type — used for spread
 * arguments where the parameter is a rest of a tuple.
 */
export function getContextualTypeForSpreadArgument(
  signature: Signature,
  startIndex: number,
): readonly Type[] {
  const params = signature.parameters ?? [];
  const out: Type[] = [];
  for (let i = startIndex; i < params.length; i++) {
    const t = (params[i] as unknown as { type?: Type }).type;
    if (t !== undefined) out.push(t);
  }
  return out;
}

/**
 * Returns the contextual return type of a call. Used when the call
 * is part of an assignment / return statement that expects a
 * specific shape.
 */
export function getContextualReturnTypeForCall(
  signature: Signature,
): Type | undefined {
  return (signature as unknown as { returnType?: Type }).returnType;
}

/**
 * Returns the contextual parameter type for an arrow / function
 * expression nested inside a call. Used so callbacks pick up the
 * correct parameter types from their parent call signature.
 */
export function getContextualParameterTypeFromCall(
  outerSignature: Signature,
  argIndex: number,
  paramIndex: number,
): Type | undefined {
  const argType = getParameterTypeAt(outerSignature, argIndex);
  if (argType === undefined) return undefined;
  const innerSigs = (argType as unknown as { callSignatures?: readonly Signature[] }).callSignatures;
  if (innerSigs === undefined || innerSigs.length === 0) return undefined;
  return getParameterTypeAt(innerSigs[0]!, paramIndex);
}

/**
 * Returns the contextual `this` type for a callback parameter. When
 * the outer signature declares a `this` parameter, the callback's
 * `this` type matches it.
 */
export function getContextualThisForCallback(
  outerSignature: Signature,
): Type | undefined {
  const thisParam = (outerSignature as unknown as { thisParameter?: { type?: Type } }).thisParameter;
  return thisParam?.type;
}

/**
 * Returns true when the call expression is in a contextual position
 * — i.e. has an outer call/new context that contributes to the
 * argument's inferred type.
 */
export function isInContextualCallPosition(node: AstNode): boolean {
  const parent = (node as unknown as { parent?: AstNode }).parent;
  if (parent === undefined) return false;
  return parent.kind === Kind.CallExpression || parent.kind === Kind.NewExpression;
}
