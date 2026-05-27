/**
 * Decorator-application semantics.
 *
 * Ported from Strada `checker.go` — decorator-target validation,
 * decorator-invocation ordering, decorator-evaluation rules.
 *
 * Tsonic forbids decorators in source code, so this module supplies
 * predicates for *detecting* decorator usage (to surface diagnostic
 * errors) rather than evaluating it.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node has at least one decorator.
 */
export function hasDecoratorOnNode(node: AstNode): boolean {
  const decorators = (node as unknown as { decorators?: { nodes?: readonly AstNode[] } }).decorators;
  return decorators?.nodes !== undefined && decorators.nodes.length > 0;
}

/**
 * Returns the decorator nodes on a declaration.
 */
export function getDecorators(node: AstNode): readonly AstNode[] {
  const decorators = (node as unknown as { decorators?: { nodes?: readonly AstNode[] } }).decorators;
  return decorators?.nodes ?? [];
}

/**
 * Returns true when a decorator target kind is valid.
 */
export function isDecoratableNode(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.ClassDeclaration:
    case Kind.MethodDeclaration:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.PropertyDeclaration:
    case Kind.Parameter:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the decorator invocation has arguments (its
 * expression is a call expression rather than a plain reference).
 */
export function decoratorHasArguments(decorator: AstNode): boolean {
  if (decorator.kind !== Kind.Decorator) return false;
  const expr = (decorator as unknown as { expression?: AstNode }).expression;
  return expr !== undefined && expr.kind === Kind.CallExpression;
}

/**
 * Returns the underlying call/reference expression of a decorator.
 */
export function getDecoratorExpression(decorator: AstNode): AstNode | undefined {
  if (decorator.kind !== Kind.Decorator) return undefined;
  return (decorator as unknown as { expression?: AstNode }).expression;
}
