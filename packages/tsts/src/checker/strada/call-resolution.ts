/**
 * Call-expression resolution.
 *
 * Ported from Strada `checker.go` — getResolvedSignature, chooseOverload,
 * inferTypeArgumentsForSignature, checkTypeArguments.
 *
 * Resolves a CallExpression / NewExpression against the candidate
 * signatures of the callable type.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Signature, Type } from "../types.js";

/**
 * Returns true when the argument list satisfies the signature's
 * arity — given variadic / optional handling.
 */
export function isArgumentCountCompatible(
  sig: Signature,
  argCount: number,
): boolean {
  const params = sig.parameters ?? [];
  const required = params.filter(
    (p) => (p as unknown as { isOptional?: boolean }).isOptional !== true,
  ).length;
  const hasRest = params.some(
    (p) => (p as unknown as { isRest?: boolean }).isRest === true,
  );
  if (argCount < required) return false;
  if (!hasRest && argCount > params.length) return false;
  return true;
}

/**
 * Returns the candidate signature that best fits the argument list.
 * Conservative: returns the first signature whose arity matches.
 */
export function chooseOverload(
  candidates: readonly Signature[],
  argCount: number,
): Signature | undefined {
  for (const sig of candidates) {
    if (isArgumentCountCompatible(sig, argCount)) return sig;
  }
  return candidates[0];
}

/**
 * Returns the argument list of a CallExpression / NewExpression.
 */
export function getArguments(node: AstNode): readonly AstNode[] {
  if (node.kind !== Kind.CallExpression && node.kind !== Kind.NewExpression) {
    return [];
  }
  const args = (node as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments;
  return args?.nodes ?? [];
}

/**
 * Returns the explicit type-arguments node list (between the callee
 * and the argument list), if present.
 */
export function getTypeArguments(node: AstNode): readonly AstNode[] {
  const ta = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments;
  return ta?.nodes ?? [];
}

/**
 * Returns true when the call has a spread argument anywhere in the
 * argument list — `f(...xs)`.
 */
export function hasSpreadArgument(node: AstNode): boolean {
  return getArguments(node).some((a) => a.kind === Kind.SpreadElement);
}

/**
 * Returns the parameter type for the i-th argument. For rest
 * parameters, returns the rest element type for any argument index
 * at or past the rest position.
 */
export function getParameterTypeAt(
  sig: Signature,
  index: number,
): Type | undefined {
  const params = sig.parameters ?? [];
  if (index >= params.length) {
    const last = params[params.length - 1];
    if (
      last !== undefined &&
      (last as unknown as { isRest?: boolean }).isRest === true
    ) {
      return (last as unknown as { type?: Type }).type;
    }
    return undefined;
  }
  return (params[index] as unknown as { type?: Type }).type;
}

/**
 * Returns true when the call is a tagged-template invocation. The
 * argument shape is non-standard: first argument is the strings
 * array; remaining are the expressions.
 */
export function isTaggedTemplateCall(node: AstNode): boolean {
  return node.kind === Kind.TaggedTemplateExpression;
}

/**
 * Returns true when the call is a constructor (`new Foo(...)`).
 */
export function isConstructorCall(node: AstNode): boolean {
  return node.kind === Kind.NewExpression;
}

/**
 * Returns the receiver of a method call (`obj.method()` → obj).
 * Returns undefined when the callee is a bare identifier.
 */
export function getCallReceiver(node: AstNode): AstNode | undefined {
  if (node.kind !== Kind.CallExpression) return undefined;
  const callee = (node as unknown as { expression?: AstNode }).expression;
  if (callee === undefined) return undefined;
  if (callee.kind === Kind.PropertyAccessExpression ||
      callee.kind === Kind.ElementAccessExpression) {
    return (callee as unknown as { expression?: AstNode }).expression;
  }
  return undefined;
}
