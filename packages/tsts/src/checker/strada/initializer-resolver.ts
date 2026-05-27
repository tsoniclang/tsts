/**
 * Initializer / default-value type resolution.
 *
 * Ported from Strada `checker.go` — getTypeFromInitializer,
 * checkVariableInitializer, hasInitializer.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns the initializer expression of a declaration, or undefined.
 */
export function getInitializer(decl: AstNode): AstNode | undefined {
  return (decl as unknown as { initializer?: AstNode }).initializer;
}

/**
 * Returns true when the declaration has an initializer.
 */
export function hasInitializer(decl: AstNode): boolean {
  return getInitializer(decl) !== undefined;
}

/**
 * Returns true when the initializer is a literal expression — its
 * type can be widened/narrowed based on the declaration context.
 */
export function isLiteralInitializer(decl: AstNode): boolean {
  const init = getInitializer(decl);
  if (init === undefined) return false;
  switch (init.kind) {
    case Kind.StringLiteral:
    case Kind.NumericLiteral:
    case Kind.BigIntLiteral:
    case Kind.TrueKeyword:
    case Kind.FalseKeyword:
    case Kind.NullKeyword:
      return true;
    case Kind.PrefixUnaryExpression: {
      const op = (init as unknown as { operator?: number }).operator;
      if (op !== Kind.MinusToken && op !== Kind.PlusToken) return false;
      const operand = (init as unknown as { operand?: AstNode }).operand;
      return operand !== undefined && (
        operand.kind === Kind.NumericLiteral ||
        operand.kind === Kind.BigIntLiteral
      );
    }
    default:
      return false;
  }
}

/**
 * Returns true when the initializer is a function expression.
 */
export function isFunctionInitializer(decl: AstNode): boolean {
  const init = getInitializer(decl);
  if (init === undefined) return false;
  return (
    init.kind === Kind.FunctionExpression ||
    init.kind === Kind.ArrowFunction
  );
}

/**
 * Returns true when the initializer needs context to be type-checked
 * (e.g. an arrow function whose parameters are untyped).
 */
export function initializerNeedsContext(decl: AstNode): boolean {
  return isFunctionInitializer(decl);
}

/**
 * Returns the property-name identifier of a declaration's initializer,
 * useful for inference of `const { x } = { x: 1 }`.
 */
export function getInitializerName(decl: AstNode): AstNode | undefined {
  const init = getInitializer(decl);
  if (init === undefined) return undefined;
  return (init as unknown as { name?: AstNode }).name;
}

/**
 * Returns true when the declaration is `const` AND has a literal
 * initializer — eligible for literal-type narrowing.
 */
export function isConstLiteralDeclaration(decl: AstNode): boolean {
  if (decl.kind !== Kind.VariableDeclaration) return false;
  if (!isLiteralInitializer(decl)) return false;
  const parent = (decl as unknown as { parent?: AstNode }).parent;
  if (parent === undefined) return false;
  const flags = (parent as unknown as { flags?: number }).flags ?? 0;
  return (flags & 0x2) !== 0; // NodeFlags.Const
}
