/**
 * Static expression evaluation.
 *
 * Ported from Strada `checker.go` — evaluateConstantExpression,
 * isStaticallyEvaluable, foldBinaryExpression.
 *
 * Used for enum-member values, parameter defaults, conditional type
 * branches.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the expression can be evaluated statically.
 */
export function isStaticallyEvaluable(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.NumericLiteral:
    case Kind.StringLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.TrueKeyword:
    case Kind.FalseKeyword:
    case Kind.NullKeyword:
      return true;
    case Kind.PrefixUnaryExpression: {
      const operand = (node as unknown as { operand?: AstNode }).operand;
      return operand !== undefined && isStaticallyEvaluable(operand);
    }
    case Kind.BinaryExpression: {
      const left = (node as unknown as { left?: AstNode }).left;
      const right = (node as unknown as { right?: AstNode }).right;
      return left !== undefined && right !== undefined &&
        isStaticallyEvaluable(left) && isStaticallyEvaluable(right);
    }
    case Kind.ParenthesizedExpression: {
      const expr = (node as unknown as { expression?: AstNode }).expression;
      return expr !== undefined && isStaticallyEvaluable(expr);
    }
    default:
      return false;
  }
}

/**
 * Evaluates a literal-only expression to its primitive value, or
 * returns undefined when not evaluable.
 */
export function evaluate(node: AstNode): number | string | boolean | null | undefined {
  switch (node.kind) {
    case Kind.NumericLiteral: {
      const text = (node as unknown as { text?: string }).text;
      return text === undefined ? undefined : Number(text);
    }
    case Kind.StringLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
      return (node as unknown as { text?: string }).text;
    case Kind.TrueKeyword: return true;
    case Kind.FalseKeyword: return false;
    case Kind.NullKeyword: return null;
    case Kind.PrefixUnaryExpression: {
      const op = (node as unknown as { operator?: number }).operator;
      const operand = (node as unknown as { operand?: AstNode }).operand;
      if (operand === undefined) return undefined;
      const v = evaluate(operand);
      if (typeof v === "number") {
        if (op === Kind.MinusToken) return -v;
        if (op === Kind.PlusToken) return v;
        if (op === Kind.TildeToken) return ~v;
      }
      if (typeof v === "boolean" && op === Kind.ExclamationToken) return !v;
      return undefined;
    }
    case Kind.BinaryExpression: {
      const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
      const left = (node as unknown as { left?: AstNode }).left;
      const right = (node as unknown as { right?: AstNode }).right;
      if (left === undefined || right === undefined) return undefined;
      const l = evaluate(left);
      const r = evaluate(right);
      if (l === undefined || r === undefined) return undefined;
      if (typeof l === "number" && typeof r === "number") {
        switch (op) {
          case Kind.PlusToken: return l + r;
          case Kind.MinusToken: return l - r;
          case Kind.AsteriskToken: return l * r;
          case Kind.SlashToken: return l / r;
          case Kind.PercentToken: return l % r;
          case Kind.AsteriskAsteriskToken: return l ** r;
          case Kind.AmpersandToken: return l & r;
          case Kind.BarToken: return l | r;
          case Kind.CaretToken: return l ^ r;
          case Kind.LessThanLessThanToken: return l << r;
          case Kind.GreaterThanGreaterThanToken: return l >> r;
          case Kind.GreaterThanGreaterThanGreaterThanToken: return l >>> r;
        }
      }
      if (typeof l === "string" && typeof r === "string") {
        if (op === Kind.PlusToken) return l + r;
      }
      return undefined;
    }
    case Kind.ParenthesizedExpression: {
      const expr = (node as unknown as { expression?: AstNode }).expression;
      return expr === undefined ? undefined : evaluate(expr);
    }
    default:
      return undefined;
  }
}

/**
 * Returns true when the expression evaluates to a truthy value.
 */
export function evaluatesToTruthy(node: AstNode): boolean {
  const v = evaluate(node);
  if (v === undefined) return false;
  return Boolean(v);
}

/**
 * Returns true when the expression evaluates to a falsy value.
 */
export function evaluatesToFalsy(node: AstNode): boolean {
  const v = evaluate(node);
  if (v === undefined) return false;
  return !v;
}
