/**
 * Expression-precedence rules.
 *
 * Ported from Strada `printer.go` (within `checker`) — getExpressionPrecedence,
 * isLowerPrecedence, isHigherPrecedence. Distinct from
 * `parenthesization.ts` which computes when parens are needed.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

export const Precedence = {
  Comma: 0,
  Spread: 1,
  Yield: 2,
  Assignment: 2,
  Conditional: 4,
  Coalesce: 4,
  LogicalOR: 5,
  LogicalAND: 6,
  BitwiseOR: 7,
  BitwiseXOR: 8,
  BitwiseAND: 9,
  Equality: 10,
  Relational: 11,
  Shift: 12,
  Additive: 13,
  Multiplicative: 14,
  Exponentiation: 15,
  Unary: 16,
  Update: 17,
  LeftHandSide: 18,
  Member: 19,
  Primary: 20,
} as const;

export type Precedence = number;

/**
 * Returns the precedence of an expression node.
 */
export function getExpressionPrecedence(node: AstNode): Precedence {
  switch (node.kind) {
    case Kind.SpreadElement:
      return Precedence.Spread;
    case Kind.YieldExpression:
      return Precedence.Yield;
    case Kind.ConditionalExpression:
      return Precedence.Conditional;
    case Kind.BinaryExpression: {
      const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
      return getBinaryPrecedence(op ?? 0);
    }
    case Kind.PrefixUnaryExpression:
    case Kind.DeleteExpression:
    case Kind.TypeOfExpression:
    case Kind.VoidExpression:
    case Kind.AwaitExpression:
      return Precedence.Unary;
    case Kind.PostfixUnaryExpression:
      return Precedence.Update;
    case Kind.CallExpression:
    case Kind.NewExpression:
    case Kind.TaggedTemplateExpression:
    case Kind.PropertyAccessExpression:
    case Kind.ElementAccessExpression:
      return Precedence.LeftHandSide;
    default:
      return Precedence.Primary;
  }
}

/**
 * Returns the precedence of a binary operator.
 */
export function getBinaryPrecedence(operator: number): Precedence {
  switch (operator) {
    case Kind.CommaToken: return Precedence.Comma;
    case Kind.EqualsToken:
    case Kind.PlusEqualsToken:
    case Kind.MinusEqualsToken:
    case Kind.AsteriskEqualsToken:
    case Kind.SlashEqualsToken:
    case Kind.PercentEqualsToken:
      return Precedence.Assignment;
    case Kind.QuestionQuestionToken: return Precedence.Coalesce;
    case Kind.BarBarToken: return Precedence.LogicalOR;
    case Kind.AmpersandAmpersandToken: return Precedence.LogicalAND;
    case Kind.BarToken: return Precedence.BitwiseOR;
    case Kind.CaretToken: return Precedence.BitwiseXOR;
    case Kind.AmpersandToken: return Precedence.BitwiseAND;
    case Kind.EqualsEqualsToken:
    case Kind.ExclamationEqualsToken:
    case Kind.EqualsEqualsEqualsToken:
    case Kind.ExclamationEqualsEqualsToken:
      return Precedence.Equality;
    case Kind.LessThanToken:
    case Kind.GreaterThanToken:
    case Kind.LessThanEqualsToken:
    case Kind.GreaterThanEqualsToken:
    case Kind.InKeyword:
    case Kind.InstanceOfKeyword:
      return Precedence.Relational;
    case Kind.LessThanLessThanToken:
    case Kind.GreaterThanGreaterThanToken:
    case Kind.GreaterThanGreaterThanGreaterThanToken:
      return Precedence.Shift;
    case Kind.PlusToken:
    case Kind.MinusToken:
      return Precedence.Additive;
    case Kind.AsteriskToken:
    case Kind.SlashToken:
    case Kind.PercentToken:
      return Precedence.Multiplicative;
    case Kind.AsteriskAsteriskToken:
      return Precedence.Exponentiation;
    default:
      return Precedence.Primary;
  }
}

/**
 * Returns true when `a` has lower precedence than `b`.
 */
export function isLowerPrecedence(a: Precedence, b: Precedence): boolean {
  return a < b;
}

/**
 * Returns true when `a` has higher precedence than `b`.
 */
export function isHigherPrecedence(a: Precedence, b: Precedence): boolean {
  return a > b;
}
