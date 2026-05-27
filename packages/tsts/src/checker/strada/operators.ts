/**
 * Operator classification + result-type rules.
 *
 * Ported from Strada `checker.go` — checkBinaryLikeExpression's
 * operator-specific result type computation, plus the
 * operator-grouping predicates used by the printer's
 * parenthesization rules.
 */

import { Kind } from "../../ast/index.js";

/**
 * Arithmetic operators that produce a number / bigint result.
 */
export const ArithmeticOperators = new Set<number>([
  Kind.PlusToken,
  Kind.MinusToken,
  Kind.AsteriskToken,
  Kind.AsteriskAsteriskToken,
  Kind.SlashToken,
  Kind.PercentToken,
  Kind.LessThanLessThanToken,
  Kind.GreaterThanGreaterThanToken,
  Kind.GreaterThanGreaterThanGreaterThanToken,
  Kind.AmpersandToken,
  Kind.BarToken,
  Kind.CaretToken,
]);

/**
 * Comparison + relational operators that produce a boolean result.
 */
export const RelationalOperators = new Set<number>([
  Kind.LessThanToken,
  Kind.GreaterThanToken,
  Kind.LessThanEqualsToken,
  Kind.GreaterThanEqualsToken,
  Kind.EqualsEqualsToken,
  Kind.ExclamationEqualsToken,
  Kind.EqualsEqualsEqualsToken,
  Kind.ExclamationEqualsEqualsToken,
  Kind.InKeyword,
  Kind.InstanceOfKeyword,
]);

/**
 * Logical operators that produce a boolean (or unioned operand
 * types when short-circuiting).
 */
export const LogicalOperators = new Set<number>([
  Kind.AmpersandAmpersandToken,
  Kind.BarBarToken,
  Kind.QuestionQuestionToken,
]);

/**
 * Assignment operators (single = + compound op-equals).
 */
export const AssignmentOperators = new Set<number>([
  Kind.EqualsToken,
  Kind.PlusEqualsToken,
  Kind.MinusEqualsToken,
  Kind.AsteriskEqualsToken,
  Kind.AsteriskAsteriskEqualsToken,
  Kind.SlashEqualsToken,
  Kind.PercentEqualsToken,
  Kind.LessThanLessThanEqualsToken,
  Kind.GreaterThanGreaterThanEqualsToken,
  Kind.GreaterThanGreaterThanGreaterThanEqualsToken,
  Kind.AmpersandEqualsToken,
  Kind.BarEqualsToken,
  Kind.CaretEqualsToken,
  Kind.BarBarEqualsToken,
  Kind.AmpersandAmpersandEqualsToken,
  Kind.QuestionQuestionEqualsToken,
]);

export function isArithmeticOperator(token: number): boolean {
  return ArithmeticOperators.has(token);
}

export function isRelationalOperator(token: number): boolean {
  return RelationalOperators.has(token);
}

export function isLogicalOperator(token: number): boolean {
  return LogicalOperators.has(token);
}

export function isAssignmentOperator(token: number): boolean {
  return AssignmentOperators.has(token);
}

export function isCompoundAssignment(token: number): boolean {
  return AssignmentOperators.has(token) && token !== Kind.EqualsToken;
}

/**
 * Returns the result Kind of a unary operator on a number operand.
 * Used as a precedence-aware hint by the printer.
 */
export function unaryOperatorPrecedence(operator: number): number {
  switch (operator) {
    case Kind.ExclamationToken:
    case Kind.TildeToken:
    case Kind.PlusToken:
    case Kind.MinusToken:
    case Kind.PlusPlusToken:
    case Kind.MinusMinusToken:
      return 16; // Unary precedence (TC39)
    default:
      return -1;
  }
}

/**
 * Returns the precedence level of a binary operator (TC39).
 */
export function binaryOperatorPrecedence(operator: number): number {
  switch (operator) {
    case Kind.CommaToken: return 0;
    case Kind.EqualsToken:
    case Kind.PlusEqualsToken:
    case Kind.MinusEqualsToken:
    case Kind.AsteriskEqualsToken:
    case Kind.AsteriskAsteriskEqualsToken:
    case Kind.SlashEqualsToken:
    case Kind.PercentEqualsToken:
    case Kind.LessThanLessThanEqualsToken:
    case Kind.GreaterThanGreaterThanEqualsToken:
    case Kind.GreaterThanGreaterThanGreaterThanEqualsToken:
    case Kind.AmpersandEqualsToken:
    case Kind.BarEqualsToken:
    case Kind.CaretEqualsToken:
    case Kind.BarBarEqualsToken:
    case Kind.AmpersandAmpersandEqualsToken:
    case Kind.QuestionQuestionEqualsToken:
      return 2; // Assignment
    case Kind.QuestionQuestionToken: return 3;
    case Kind.BarBarToken: return 4;
    case Kind.AmpersandAmpersandToken: return 5;
    case Kind.BarToken: return 6;
    case Kind.CaretToken: return 7;
    case Kind.AmpersandToken: return 8;
    case Kind.EqualsEqualsToken:
    case Kind.ExclamationEqualsToken:
    case Kind.EqualsEqualsEqualsToken:
    case Kind.ExclamationEqualsEqualsToken:
      return 9;
    case Kind.LessThanToken:
    case Kind.GreaterThanToken:
    case Kind.LessThanEqualsToken:
    case Kind.GreaterThanEqualsToken:
    case Kind.InKeyword:
    case Kind.InstanceOfKeyword:
      return 10;
    case Kind.LessThanLessThanToken:
    case Kind.GreaterThanGreaterThanToken:
    case Kind.GreaterThanGreaterThanGreaterThanToken:
      return 11;
    case Kind.PlusToken:
    case Kind.MinusToken:
      return 12;
    case Kind.AsteriskToken:
    case Kind.SlashToken:
    case Kind.PercentToken:
      return 13;
    case Kind.AsteriskAsteriskToken: return 14;
    default: return -1;
  }
}
