/**
 * `new X(...)` expression handling.
 *
 * Ported from Strada `checker.go` — checkNewExpression,
 * resolveConstructSignature, getConstructorReturnType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Signature, Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when the node is a NewExpression.
 */
export function isNewExpression(node: AstNode): boolean {
  return node.kind === Kind.NewExpression;
}

/**
 * Returns the constructor expression of a NewExpression.
 */
export function getNewExpressionCallee(node: AstNode): AstNode | undefined {
  if (!isNewExpression(node)) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns the type-arguments of a NewExpression.
 */
export function getNewExpressionTypeArguments(node: AstNode): readonly AstNode[] {
  if (!isNewExpression(node)) return [];
  const ta = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments;
  return ta?.nodes ?? [];
}

/**
 * Returns the argument list of a NewExpression.
 */
export function getNewExpressionArguments(node: AstNode): readonly AstNode[] {
  if (!isNewExpression(node)) return [];
  const args = (node as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments;
  return args?.nodes ?? [];
}

/**
 * Returns true when the NewExpression has no arguments (legal in
 * TS for parameterless constructors).
 */
export function isParameterlessNew(node: AstNode): boolean {
  if (!isNewExpression(node)) return false;
  const args = (node as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments;
  return args === undefined || args.nodes === undefined || args.nodes.length === 0;
}

/**
 * Returns the construct-signature of a target type, if any.
 */
export function getFirstConstructSignature(targetType: Type): Signature | undefined {
  const sigs = (targetType as unknown as { constructSignatures?: readonly Signature[] }).constructSignatures;
  return sigs !== undefined && sigs.length > 0 ? sigs[0] : undefined;
}

/**
 * Returns the canonical return-type of a constructor — the instance
 * type of the class.
 */
export function getConstructorReturnType(targetType: Type): Type {
  const sigs = (targetType as unknown as { constructSignatures?: readonly Signature[] }).constructSignatures;
  if (sigs === undefined || sigs.length === 0) return ANY;
  return (sigs[0] as unknown as { returnType?: Type }).returnType ?? ANY;
}

/**
 * Returns true when the target type is "newable" — has at least one
 * construct signature.
 */
export function isNewable(targetType: Type): boolean {
  const sigs = (targetType as unknown as { constructSignatures?: readonly Signature[] }).constructSignatures;
  return sigs !== undefined && sigs.length > 0;
}
