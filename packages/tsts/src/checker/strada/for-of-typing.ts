/**
 * For/for-of/for-in statement type checks.
 *
 * Ported from Strada `checker.go` — checkForStatement, checkForInStatement,
 * checkForOfStatement, getForInVariableType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { getIteratorYieldType, isAsyncIterableType } from "./iterators.js";

const STRING: Type = { flags: TypeFlags.String } as unknown as Type;

/**
 * Returns true when the node is a `for-of` loop.
 */
export function isForOfStatement(node: AstNode): boolean {
  return node.kind === Kind.ForOfStatement;
}

/**
 * Returns true when the node is a `for-in` loop.
 */
export function isForInStatement(node: AstNode): boolean {
  return node.kind === Kind.ForInStatement;
}

/**
 * Returns the initializer node of a for-of / for-in loop (`for (X of ...)`).
 */
export function getForLoopInitializer(node: AstNode): AstNode | undefined {
  if (!isForOfStatement(node) && !isForInStatement(node)) return undefined;
  return (node as unknown as { initializer?: AstNode }).initializer;
}

/**
 * Returns the iterated expression — the right-hand side of `for-of`
 * / `for-in`.
 */
export function getForLoopExpression(node: AstNode): AstNode | undefined {
  if (!isForOfStatement(node) && !isForInStatement(node)) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns the variable type for the for-of binding given the iterable
 * type.
 */
export function getForOfVariableType(iterableType: Type): Type {
  return getIteratorYieldType(iterableType);
}

/**
 * Returns the variable type for the for-in binding — always `string`.
 */
export function getForInVariableType(): Type {
  return STRING;
}

/**
 * Returns true when the for-of loop is async (`for await (... of ...)`).
 */
export function isAsyncForOf(node: AstNode): boolean {
  if (!isForOfStatement(node)) return false;
  return (node as unknown as { awaitModifier?: AstNode }).awaitModifier !== undefined;
}

/**
 * Returns the element type for an async for-of. The iterable is
 * expected to be AsyncIterable<T>; the element is T.
 */
export function getAsyncForOfVariableType(iterableType: Type): Type {
  if (!isAsyncIterableType(iterableType)) {
    return getForOfVariableType(iterableType);
  }
  return getIteratorYieldType(iterableType);
}
