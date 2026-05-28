/**
 * Decorator-context detection.
 *
 * Ported from Strada `checker.go` — getDecoratorContext,
 * isLegalDecoratorContext.
 *
 * Tsonic forbids decorators in source code. These helpers detect
 * decorator usage so diagnostics can flag it.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

export const DecoratorContext = {
  Class: 0,
  Method: 1,
  Property: 2,
  Accessor: 3,
  Parameter: 4,
  None: 5,
} as const;

export type DecoratorContext =
  | typeof DecoratorContext.Class
  | typeof DecoratorContext.Method
  | typeof DecoratorContext.Property
  | typeof DecoratorContext.Accessor
  | typeof DecoratorContext.Parameter
  | typeof DecoratorContext.None;

/**
 * Returns the decorator-context for the parent of a decorator node.
 */
export function getDecoratorContext(decorator: AstNode): DecoratorContext {
  const parent = (decorator as unknown as { parent?: AstNode }).parent;
  if (parent === undefined) return DecoratorContext.None;
  switch (parent.kind) {
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
      return DecoratorContext.Class;
    case Kind.MethodDeclaration:
      return DecoratorContext.Method;
    case Kind.PropertyDeclaration:
      return DecoratorContext.Property;
    case Kind.GetAccessor:
    case Kind.SetAccessor:
      return DecoratorContext.Accessor;
    case Kind.Parameter:
      return DecoratorContext.Parameter;
    default:
      return DecoratorContext.None;
  }
}

/**
 * Returns true when the decorator-context is legal for decorator
 * application (per TC39 spec).
 */
export function isLegalDecoratorContext(context: DecoratorContext): boolean {
  return context !== DecoratorContext.None;
}

/**
 * Returns the canonical name of a decorator context.
 */
export function decoratorContextName(context: DecoratorContext): string {
  switch (context) {
    case DecoratorContext.Class: return "class";
    case DecoratorContext.Method: return "method";
    case DecoratorContext.Property: return "property";
    case DecoratorContext.Accessor: return "accessor";
    case DecoratorContext.Parameter: return "parameter";
    case DecoratorContext.None: return "none";
    default: return "unknown";
  }
}

/**
 * Returns true when the node has any decorator attached.
 */
export function hasAnyDecorator(node: AstNode): boolean {
  const decorators = (node as unknown as { decorators?: { nodes?: readonly AstNode[] } }).decorators;
  return decorators?.nodes !== undefined && decorators.nodes.length > 0;
}
