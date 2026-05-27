/**
 * Yield-expression handling for generators.
 *
 * Ported from Strada `checker.go` — checkYieldExpression,
 * getYieldedTypeOfYieldExpression, isInGeneratorContext.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when the node is a yield expression.
 */
export function isYieldExpression(node: AstNode): boolean {
  return node.kind === Kind.YieldExpression;
}

/**
 * Returns true when the yield expression has `*` delegation
 * (`yield*`).
 */
export function isYieldStarExpression(node: AstNode): boolean {
  if (!isYieldExpression(node)) return false;
  return (node as unknown as { asteriskToken?: AstNode }).asteriskToken !== undefined;
}

/**
 * Returns the operand expression of a yield.
 */
export function getYieldOperand(node: AstNode): AstNode | undefined {
  if (!isYieldExpression(node)) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns true when the node is inside a generator function context.
 */
export function isInGeneratorContext(node: AstNode): boolean {
  const walker = (current: AstNode | undefined): boolean => {
    if (current === undefined) return false;
    switch (current.kind) {
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.MethodDeclaration: {
        const asterisk = (current as unknown as { asteriskToken?: AstNode }).asteriskToken;
        return asterisk !== undefined;
      }
      case Kind.ArrowFunction:
        // Arrow functions can't be generators.
        return false;
      case Kind.ClassDeclaration:
      case Kind.SourceFile:
        return false;
    }
    return walker((current as unknown as { parent?: AstNode }).parent);
  };
  return walker((node as unknown as { parent?: AstNode }).parent);
}

/**
 * Returns the yielded-type for a yield expression — bare `yield x`
 * yields the type of x; `yield* xs` yields the element type of xs.
 */
export function getYieldedType(operand: Type | undefined, isDelegating: boolean): Type {
  if (operand === undefined) return ANY;
  if (!isDelegating) return operand;
  // Delegating yield yields the iterator element type.
  const args = (operand as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  if (args !== undefined && args.length > 0) return args[0]!;
  return operand;
}

/**
 * Returns the yield expression's return value — what `yield ...`
 * itself evaluates to (the value passed to `next()`).
 */
export function getYieldReturnType(_node: AstNode): Type {
  return ANY;
}
