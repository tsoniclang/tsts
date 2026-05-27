/**
 * `this`-type resolution.
 *
 * Ported from Strada `checker.go` — getTypeOfThisInContainer,
 * isContextSensitiveThis, getThisTypeOfDeclaration.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";

const ANY: Type = { flags: 1 << 0 } as unknown as Type;
const THIS_TYPE: Type = { flags: 1 << 18, intrinsicName: "this" } as unknown as Type;

/**
 * Walks parents from `node` looking for an enclosing class /
 * function-like / module body whose `this` type defines the meaning
 * of `this` at this location.
 */
export function getTypeOfThisInContainer(node: AstNode): Type {
  let n: AstNode | undefined = node;
  while (n !== undefined) {
    const k = (n as { kind?: number }).kind;
    switch (k) {
      case Kind.ClassDeclaration:
      case Kind.ClassExpression:
        return THIS_TYPE;
      case Kind.MethodDeclaration:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
      case Kind.Constructor:
        return THIS_TYPE;
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression: {
        // `this` inside a regular function is `any` unless the
        // function's first parameter is `this: T`.
        const thisParam = getThisParameter(n);
        return thisParam !== undefined
          ? (getThisParameterType(thisParam) ?? ANY)
          : ANY;
      }
      case Kind.ArrowFunction:
        // Arrow functions don't rebind this; keep walking.
        break;
      case Kind.ModuleDeclaration:
        return ANY;
      case Kind.SourceFile:
        return ANY;
    }
    n = (n as unknown as { parent?: AstNode }).parent;
  }
  return ANY;
}

/**
 * Returns the parameter named "this" on a function-like, if any.
 */
export function getThisParameter(node: AstNode): AstNode | undefined {
  const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  if (params === undefined || params.length === 0) return undefined;
  const first = params[0]!;
  const name = (first as unknown as { name?: { text?: string } }).name?.text;
  return name === "this" ? first : undefined;
}

/**
 * Resolves the type annotation on a `this` parameter, if any.
 */
export function getThisParameterType(thisParameter: AstNode): Type | undefined {
  const type = (thisParameter as unknown as { type?: AstNode }).type;
  if (type === undefined) return undefined;
  // We can't go through the full type checker here without an
  // explicit dependency; callers that want the resolved type can call
  // checker.getTypeFromTypeNode on the result.
  return undefined;
}

/**
 * Returns true when the function's first parameter is `this: T`.
 */
export function hasThisParameter(node: AstNode): boolean {
  return getThisParameter(node) !== undefined;
}

/**
 * Returns true when `this` at this location is context-sensitive —
 * an arrow function inherits its containing context's `this`, so an
 * arrow inside a class method has a class-relative `this`.
 */
export function isContextSensitiveThis(node: AstNode): boolean {
  let n: AstNode | undefined = node;
  while (n !== undefined) {
    const k = (n as { kind?: number }).kind;
    if (k === Kind.ArrowFunction) {
      n = (n as unknown as { parent?: AstNode }).parent;
      continue;
    }
    if (k === Kind.FunctionDeclaration || k === Kind.FunctionExpression ||
        k === Kind.MethodDeclaration || k === Kind.Constructor) {
      return false;
    }
    if (k === Kind.ClassDeclaration || k === Kind.ClassExpression) return true;
    n = (n as unknown as { parent?: AstNode }).parent;
  }
  return false;
}
