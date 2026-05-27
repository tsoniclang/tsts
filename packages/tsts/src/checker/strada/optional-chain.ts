/**
 * Optional chain (`?.`) helpers.
 *
 * Ported from Strada `checker.go` — getTypeOfOptionalChain,
 * isOptionalChain, getOptionalExpression.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NodeFlags_OptionalChain = 1 << 5;

/**
 * Returns true when the access / call node is part of an optional
 * chain — the `?.` form.
 */
export function isOptionalChain(node: AstNode): boolean {
  if (
    node.kind !== Kind.PropertyAccessExpression &&
    node.kind !== Kind.ElementAccessExpression &&
    node.kind !== Kind.CallExpression &&
    node.kind !== Kind.NonNullExpression
  ) {
    return false;
  }
  const flags = (node as unknown as { flags?: number }).flags ?? 0;
  return (flags & NodeFlags_OptionalChain) !== 0;
}

/**
 * Returns true when the node is the root of an optional chain. Roots
 * carry the `?.` token; sub-expressions in the same chain don't.
 */
export function isOptionalChainRoot(node: AstNode): boolean {
  if (!isOptionalChain(node)) return false;
  const questionDot = (node as unknown as { questionDotToken?: AstNode }).questionDotToken;
  return questionDot !== undefined;
}

/**
 * Walks down an optional-chain to its head expression.
 */
export function getOptionalChainHead(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined && isOptionalChain(current) && !isOptionalChainRoot(current)) {
    current = (current as unknown as { expression?: AstNode }).expression;
  }
  return current;
}

/**
 * Wraps a type with `| undefined` when the access is optional. Used
 * to propagate the "may be undefined" contract through the chain.
 */
export function addUndefinedTypeToOptionalChain(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  // If type already includes undefined, return as-is.
  if ((flags & TypeFlags.Undefined) !== 0) return t;
  if ((flags & TypeFlags.Union) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    return {
      flags: TypeFlags.Union,
      types: [...types, { flags: TypeFlags.Undefined } as unknown as Type],
    } as unknown as Type;
  }
  return {
    flags: TypeFlags.Union,
    types: [t, { flags: TypeFlags.Undefined } as unknown as Type],
  } as unknown as Type;
}

/**
 * Returns true when any node in the optional-chain has `?.` (i.e.
 * the whole expression may short-circuit).
 */
export function chainMayShortCircuit(node: AstNode): boolean {
  let current: AstNode | undefined = node;
  while (current !== undefined && isOptionalChain(current)) {
    if (isOptionalChainRoot(current)) return true;
    current = (current as unknown as { expression?: AstNode }).expression;
  }
  return false;
}
