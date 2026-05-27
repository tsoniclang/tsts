/**
 * Await-expression handling.
 *
 * Ported from Strada `checker.go` — checkAwaitExpression,
 * getAwaitedType, isInAsyncContext.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { awaitedType } from "./awaited-type.js";

/**
 * Returns true when the node is an await expression.
 */
export function isAwaitExpression(node: AstNode): boolean {
  return node.kind === Kind.AwaitExpression;
}

/**
 * Returns the operand expression of an await.
 */
export function getAwaitOperand(node: AstNode): AstNode | undefined {
  if (!isAwaitExpression(node)) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns true when the node is inside an async function context.
 * Async-arrow functions inherit; non-async functions break the chain.
 */
export function isInAsyncContext(node: AstNode): boolean {
  const walker = (current: AstNode | undefined): boolean => {
    if (current === undefined) return false;
    switch (current.kind) {
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.ArrowFunction:
      case Kind.MethodDeclaration: {
        const modifiers = (current as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
        return modifiers?.some((m) => m.kind === Kind.AsyncKeyword) === true;
      }
      case Kind.ClassDeclaration:
      case Kind.SourceFile:
        return false;
    }
    return walker((current as unknown as { parent?: AstNode }).parent);
  };
  return walker((node as unknown as { parent?: AstNode }).parent);
}

/**
 * Returns the type of an await expression's result.
 */
export function getAwaitResultType(operand: Type): Type {
  return awaitedType(operand);
}

/**
 * Returns true when the await is at top-level (a.k.a. top-level await
 * — legal only in modules).
 */
export function isTopLevelAwait(node: AstNode): boolean {
  if (!isAwaitExpression(node)) return false;
  return !isInAsyncContext(node);
}
