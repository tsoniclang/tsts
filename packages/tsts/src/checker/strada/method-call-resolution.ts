/**
 * Method-call resolution helpers.
 *
 * Ported from Strada `checker.go` — resolveMethodCall,
 * pickMethodOverload, isMethodCallExpression.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Signature, Type } from "../types.js";

/**
 * Returns true when the node is a method-call expression
 * (`obj.method(...)`).
 */
export function isMethodCallExpression(node: AstNode): boolean {
  if (node.kind !== Kind.CallExpression) return false;
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr === undefined) return false;
  return (
    expr.kind === Kind.PropertyAccessExpression ||
    expr.kind === Kind.ElementAccessExpression
  );
}

/**
 * Returns the receiver expression of a method call.
 */
export function getMethodCallReceiver(node: AstNode): AstNode | undefined {
  if (!isMethodCallExpression(node)) return undefined;
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr === undefined) return undefined;
  return (expr as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns the method-name node of a method call.
 */
export function getMethodCallName(node: AstNode): AstNode | undefined {
  if (!isMethodCallExpression(node)) return undefined;
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr === undefined) return undefined;
  if (expr.kind === Kind.PropertyAccessExpression) {
    return (expr as unknown as { name?: AstNode }).name;
  }
  if (expr.kind === Kind.ElementAccessExpression) {
    return (expr as unknown as { argumentExpression?: AstNode }).argumentExpression;
  }
  return undefined;
}

/**
 * Returns the method-name text, when statically known.
 */
export function getMethodNameText(node: AstNode): string | undefined {
  const name = getMethodCallName(node);
  if (name === undefined) return undefined;
  if (name.kind === Kind.Identifier) {
    return (name as unknown as { escapedText?: string }).escapedText;
  }
  if (name.kind === Kind.StringLiteral) {
    return (name as unknown as { text?: string }).text;
  }
  return undefined;
}

/**
 * Returns the call-signatures of a method symbol.
 */
export function getMethodCallSignatures(methodSym: AstSymbol): readonly Signature[] {
  return (methodSym as unknown as { callSignatures?: readonly Signature[] }).callSignatures ?? [];
}

/**
 * Picks the best method overload by arity.
 */
export function pickMethodOverloadByArity(
  signatures: readonly Signature[],
  argCount: number,
): Signature | undefined {
  for (const sig of signatures) {
    const params = sig.parameters ?? [];
    if (params.length === argCount) return sig;
  }
  // Fall back to most-arity-compatible.
  return signatures[0];
}

/**
 * Returns true when the method call is on a `super` receiver.
 */
export function isSuperMethodCall(node: AstNode): boolean {
  if (!isMethodCallExpression(node)) return false;
  const receiver = getMethodCallReceiver(node);
  return receiver !== undefined && receiver.kind === Kind.SuperKeyword;
}

/**
 * Returns true when the method call is on `this`.
 */
export function isThisMethodCall(node: AstNode): boolean {
  if (!isMethodCallExpression(node)) return false;
  const receiver = getMethodCallReceiver(node);
  return receiver !== undefined && receiver.kind === Kind.ThisKeyword;
}

void (undefined as Type | undefined);
