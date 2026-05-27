/**
 * Conditional expression `cond ? then : else` handling.
 *
 * Ported from Strada `checker.go` — checkConditionalExpression,
 * getTypeOfConditionalExpression.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the node is a ConditionalExpression.
 */
export function isConditionalExpression(node: AstNode): boolean {
  return node.kind === Kind.ConditionalExpression;
}

/**
 * Returns the condition expression of a ConditionalExpression.
 */
export function getConditionalCondition(node: AstNode): AstNode | undefined {
  if (!isConditionalExpression(node)) return undefined;
  return (node as unknown as { condition?: AstNode }).condition;
}

/**
 * Returns the "then" branch expression.
 */
export function getConditionalThen(node: AstNode): AstNode | undefined {
  if (!isConditionalExpression(node)) return undefined;
  return (node as unknown as { whenTrue?: AstNode }).whenTrue;
}

/**
 * Returns the "else" branch expression.
 */
export function getConditionalElse(node: AstNode): AstNode | undefined {
  if (!isConditionalExpression(node)) return undefined;
  return (node as unknown as { whenFalse?: AstNode }).whenFalse;
}

/**
 * Returns the union type combining the two branch types.
 */
export function getConditionalResultType(thenType: Type, elseType: Type): Type {
  if (thenType === elseType) return thenType;
  return { flags: TypeFlags.Union, types: [thenType, elseType] } as unknown as Type;
}

/**
 * Returns true when both branches always evaluate to the same type.
 */
export function isHomogeneousConditional(thenType: Type, elseType: Type): boolean {
  return thenType === elseType;
}

/**
 * Returns true when the conditional is a "ternary if" — the
 * condition is a literal whose value is statically known.
 */
export function isStaticConditional(node: AstNode): boolean {
  const cond = getConditionalCondition(node);
  if (cond === undefined) return false;
  return (
    cond.kind === Kind.TrueKeyword ||
    cond.kind === Kind.FalseKeyword ||
    cond.kind === Kind.NumericLiteral
  );
}

/**
 * Returns the statically-evaluated branch of a static conditional.
 */
export function getStaticBranch(node: AstNode): AstNode | undefined {
  if (!isStaticConditional(node)) return undefined;
  const cond = getConditionalCondition(node);
  if (cond === undefined) return undefined;
  if (cond.kind === Kind.TrueKeyword) return getConditionalThen(node);
  if (cond.kind === Kind.FalseKeyword) return getConditionalElse(node);
  return undefined;
}
