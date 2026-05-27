/**
 * `await` context resolution.
 *
 * Ported from Strada `checker.go` — getEnclosingAsyncFunction,
 * checkAwaitedExpression, isInValidAwaitContext.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns the enclosing async function-like, or undefined.
 */
export function getEnclosingAsyncFunction(node: AstNode): AstNode | undefined {
  const walker = (current: AstNode | undefined): AstNode | undefined => {
    if (current === undefined) return undefined;
    switch (current.kind) {
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.ArrowFunction:
      case Kind.MethodDeclaration: {
        const mods = (current as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
        if (mods?.some((m) => m.kind === Kind.AsyncKeyword) === true) {
          return current;
        }
        return undefined;
      }
      case Kind.ClassDeclaration:
      case Kind.ClassExpression:
      case Kind.SourceFile:
        return undefined;
    }
    return walker((current as unknown as { parent?: AstNode }).parent);
  };
  return walker((node as unknown as { parent?: AstNode }).parent);
}

/**
 * Returns true when an `await` is legal at the given location.
 */
export function isAwaitContextValid(node: AstNode): boolean {
  return getEnclosingAsyncFunction(node) !== undefined;
}

/**
 * Returns true when an `await` is at module top-level (legal only in
 * ESM modules with top-level await target).
 */
export function isModuleTopLevelAwait(node: AstNode): boolean {
  if (isAwaitContextValid(node)) return false;
  const walker = (current: AstNode | undefined): boolean => {
    if (current === undefined) return false;
    if (current.kind === Kind.SourceFile) return true;
    if (
      current.kind === Kind.FunctionDeclaration ||
      current.kind === Kind.FunctionExpression ||
      current.kind === Kind.MethodDeclaration ||
      current.kind === Kind.ArrowFunction
    ) {
      return false;
    }
    return walker((current as unknown as { parent?: AstNode }).parent);
  };
  return walker((node as unknown as { parent?: AstNode }).parent);
}

/**
 * Returns true when the for-of loop is `for await (... of ...)`.
 */
export function isForAwaitLoop(node: AstNode): boolean {
  if (node.kind !== Kind.ForOfStatement) return false;
  return (node as unknown as { awaitModifier?: AstNode }).awaitModifier !== undefined;
}
