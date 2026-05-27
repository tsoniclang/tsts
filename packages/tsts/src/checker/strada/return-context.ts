/**
 * `return` statement context.
 *
 * Ported from Strada `checker.go` — checkReturnStatement,
 * getEnclosingFunctionForReturn, validateReturnType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const VOID: Type = { flags: TypeFlags.Void } as unknown as Type;
const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Returns the enclosing function-like declaration for a return
 * statement, or undefined when illegal.
 */
export function getEnclosingFunctionForReturn(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
  while (current !== undefined) {
    switch (current.kind) {
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.ArrowFunction:
      case Kind.MethodDeclaration:
      case Kind.Constructor:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
        return current;
      case Kind.SourceFile:
      case Kind.ClassDeclaration:
      case Kind.ClassExpression:
        return undefined;
    }
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

/**
 * Returns true when `return` is legal at the given location.
 */
export function isReturnLegal(node: AstNode): boolean {
  return getEnclosingFunctionForReturn(node) !== undefined;
}

/**
 * Returns the return-statement's value expression, or undefined.
 */
export function getReturnValue(node: AstNode): AstNode | undefined {
  if (node.kind !== Kind.ReturnStatement) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns true when the return statement has a value expression.
 */
export function returnHasValue(node: AstNode): boolean {
  return getReturnValue(node) !== undefined;
}

/**
 * Returns the canonical type for a bare `return;` — void.
 */
export function getBareReturnType(): Type {
  return VOID;
}

/**
 * Returns the canonical type for a function that always throws —
 * never.
 */
export function getThrowingReturnType(): Type {
  return NEVER;
}
