/**
 * `super` access validation and resolution.
 *
 * Ported from Strada `checker.go` — checkSuperExpression, isLegalSuperUsage,
 * getSuperContainer.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns the enclosing function/constructor that owns the `super`
 * reference. Returns undefined when `super` is used illegally
 * outside any function-like context.
 */
export function getSuperContainer(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
  while (current !== undefined) {
    switch (current.kind) {
      case Kind.Constructor:
      case Kind.MethodDeclaration:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
        return current;
      case Kind.ArrowFunction:
        // Arrow functions inherit `super` binding from enclosing.
        break;
      case Kind.FunctionDeclaration:
      case Kind.FunctionExpression:
        // Regular functions have their own `super`, so reaching one
        // means no enclosing class-method binds the reference.
        return undefined;
      case Kind.ClassDeclaration:
      case Kind.ClassExpression:
        // Reached the class without binding to a method — invalid.
        return undefined;
    }
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

/**
 * Returns true when `super` is used inside a constructor body — the
 * only place a constructor call is legal.
 */
export function isSuperCallContainer(node: AstNode): boolean {
  const container = getSuperContainer(node);
  return container !== undefined && container.kind === Kind.Constructor;
}

/**
 * Returns true when `super` is used inside a method or accessor —
 * the only places a property access is legal.
 */
export function isSuperPropertyContainer(node: AstNode): boolean {
  const container = getSuperContainer(node);
  if (container === undefined) return false;
  return (
    container.kind === Kind.MethodDeclaration ||
    container.kind === Kind.GetAccessor ||
    container.kind === Kind.SetAccessor ||
    container.kind === Kind.Constructor
  );
}

/**
 * Returns true when the node is a `super(...)` call — i.e. its
 * expression is the `super` keyword.
 */
export function isSuperCall(node: AstNode): boolean {
  if (node.kind !== Kind.CallExpression) return false;
  const expr = (node as unknown as { expression?: AstNode }).expression;
  return expr !== undefined && expr.kind === Kind.SuperKeyword;
}

/**
 * Returns true when the node is `super.foo` or `super[foo]`.
 */
export function isSuperPropertyAccess(node: AstNode): boolean {
  if (
    node.kind !== Kind.PropertyAccessExpression &&
    node.kind !== Kind.ElementAccessExpression
  ) {
    return false;
  }
  const expr = (node as unknown as { expression?: AstNode }).expression;
  return expr !== undefined && expr.kind === Kind.SuperKeyword;
}
