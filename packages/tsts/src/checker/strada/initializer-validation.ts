/**
 * Initializer expression validation.
 *
 * Ported from Strada `checker.go` — checkInitializer,
 * checkPropertyInitializer, isStaticInitializer.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the initializer expression is statically
 * computable (literal or a small set of safe operations).
 */
export function isStaticInitializer(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.StringLiteral:
    case Kind.NumericLiteral:
    case Kind.BigIntLiteral:
    case Kind.TrueKeyword:
    case Kind.FalseKeyword:
    case Kind.NullKeyword:
    case Kind.NoSubstitutionTemplateLiteral:
      return true;
    case Kind.PrefixUnaryExpression: {
      const op = (node as unknown as { operator?: number }).operator;
      if (op === Kind.MinusToken || op === Kind.PlusToken || op === Kind.TildeToken) {
        const operand = (node as unknown as { operand?: AstNode }).operand;
        return operand !== undefined && isStaticInitializer(operand);
      }
      return false;
    }
    case Kind.ParenthesizedExpression: {
      const expr = (node as unknown as { expression?: AstNode }).expression;
      return expr !== undefined && isStaticInitializer(expr);
    }
    default:
      return false;
  }
}

/**
 * Returns true when the initializer is a "safe" runtime expression
 * — has no side effects (no calls, no assignments).
 */
export function isSideEffectFreeInitializer(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.CallExpression:
    case Kind.NewExpression:
      return false;
    case Kind.BinaryExpression: {
      const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
      if (op === undefined) return true;
      // Assignment operators have side effects.
      if (
        op === Kind.EqualsToken ||
        op === Kind.PlusEqualsToken ||
        op === Kind.MinusEqualsToken ||
        op === Kind.AsteriskEqualsToken ||
        op === Kind.SlashEqualsToken
      ) return false;
      return true;
    }
    case Kind.PostfixUnaryExpression: {
      const op = (node as unknown as { operator?: number }).operator;
      return op !== Kind.PlusPlusToken && op !== Kind.MinusMinusToken;
    }
    case Kind.PrefixUnaryExpression: {
      const op = (node as unknown as { operator?: number }).operator;
      return op !== Kind.PlusPlusToken && op !== Kind.MinusMinusToken;
    }
    default:
      return true;
  }
}

/**
 * Returns true when the initializer requires runtime evaluation
 * (not statically computable).
 */
export function requiresRuntimeEvaluation(node: AstNode): boolean {
  return !isStaticInitializer(node);
}
