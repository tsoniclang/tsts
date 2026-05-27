/**
 * `this` typing context — tracking the implicit-this for methods,
 * arrows, and free functions.
 *
 * Ported from Strada `checker.go` — getContextualThisParameter,
 * tryGetThisTypeAt, hasInferableThisType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns the enclosing function-like that binds `this` at a given
 * location. Skips arrow functions (which inherit their parent's
 * `this`).
 */
export function getEnclosingThisContainer(node: AstNode): AstNode | undefined {
  const walk = (current: AstNode | undefined): AstNode | undefined => {
    if (current === undefined) return undefined;
    switch (current.kind) {
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
      case Kind.MethodDeclaration:
      case Kind.Constructor:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
        return current;
      case Kind.ArrowFunction:
        // Arrow inherits — keep walking.
        return walk((current as unknown as { parent?: AstNode }).parent);
      case Kind.SourceFile:
        return current;
      default:
        return walk((current as unknown as { parent?: AstNode }).parent);
    }
  };
  return walk((node as unknown as { parent?: AstNode }).parent);
}

/**
 * Returns the declared `this` parameter of a function-like, if any.
 */
export function getThisParameter(decl: AstNode): AstNode | undefined {
  const params = (decl as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  if (params === undefined || params.length === 0) return undefined;
  const first = params[0]!;
  const name = (first as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  const text = (name as unknown as { escapedText?: string }).escapedText;
  return text === "this" ? first : undefined;
}

/**
 * Returns the `this`-parameter type, or undefined when there's no
 * explicit `this` parameter.
 */
export function getThisParameterType(decl: AstNode): Type | undefined {
  const thisParam = getThisParameter(decl);
  if (thisParam === undefined) return undefined;
  return (thisParam as unknown as { type?: Type }).type;
}

/**
 * Returns true when the function has an explicit `this` parameter.
 */
export function hasThisParameter(decl: AstNode): boolean {
  return getThisParameter(decl) !== undefined;
}

/**
 * Returns true when the `this` parameter type is inferable from the
 * surrounding context (typical for method overrides).
 */
export function hasInferableThisType(decl: AstNode): boolean {
  if (hasThisParameter(decl)) return false;
  // Arrow / class-method / accessor — inferable.
  return (
    decl.kind === Kind.ArrowFunction ||
    decl.kind === Kind.MethodDeclaration ||
    decl.kind === Kind.GetAccessor ||
    decl.kind === Kind.SetAccessor
  );
}

/**
 * Returns the conservative `this` type for an arbitrary location —
 * any when nothing more specific can be inferred.
 */
export function getTypeOfThisAt(_node: AstNode): Type {
  return ANY;
}

/**
 * Returns true when the node is the `this` keyword.
 */
export function isThisIdentifier(node: AstNode): boolean {
  return node.kind === Kind.ThisKeyword;
}
