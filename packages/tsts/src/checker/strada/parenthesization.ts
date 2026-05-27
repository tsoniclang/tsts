/**
 * Parenthesization rules for emit.
 *
 * Ported from Strada `parenthesizer.go` (within `transformers`) —
 * decides when an expression needs surrounding parentheses given its
 * parent operator's precedence.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns the precedence rank of a binary operator (TC39 levels).
 * Higher number means tighter binding.
 */
export function getBinaryOperatorPrecedence(operator: number): number {
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
    case Kind.CaretEqualsToken:
    case Kind.BarEqualsToken:
    case Kind.AmpersandAmpersandEqualsToken:
    case Kind.BarBarEqualsToken:
    case Kind.QuestionQuestionEqualsToken:
      return 2;
    case Kind.QuestionQuestionToken: return 4;
    case Kind.BarBarToken: return 5;
    case Kind.AmpersandAmpersandToken: return 6;
    case Kind.BarToken: return 7;
    case Kind.CaretToken: return 8;
    case Kind.AmpersandToken: return 9;
    case Kind.EqualsEqualsToken:
    case Kind.ExclamationEqualsToken:
    case Kind.EqualsEqualsEqualsToken:
    case Kind.ExclamationEqualsEqualsToken:
      return 10;
    case Kind.LessThanToken:
    case Kind.GreaterThanToken:
    case Kind.LessThanEqualsToken:
    case Kind.GreaterThanEqualsToken:
    case Kind.InKeyword:
    case Kind.InstanceOfKeyword:
      return 11;
    case Kind.LessThanLessThanToken:
    case Kind.GreaterThanGreaterThanToken:
    case Kind.GreaterThanGreaterThanGreaterThanToken:
      return 12;
    case Kind.PlusToken:
    case Kind.MinusToken:
      return 13;
    case Kind.AsteriskToken:
    case Kind.SlashToken:
    case Kind.PercentToken:
      return 14;
    case Kind.AsteriskAsteriskToken: return 15;
    default: return 0;
  }
}

/**
 * Returns the unary operator precedence rank.
 */
export function getUnaryOperatorPrecedence(): number {
  return 16;
}

/**
 * Returns the call/member-access precedence rank.
 */
export function getCallOrMemberPrecedence(): number {
  return 18;
}

/**
 * Returns true when the operator is right-associative.
 */
export function isRightAssociative(operator: number): boolean {
  return operator === Kind.AsteriskAsteriskToken || isAssignmentOperator(operator);
}

/**
 * Returns true when the operator is an assignment.
 */
export function isAssignmentOperator(operator: number): boolean {
  switch (operator) {
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
    case Kind.CaretEqualsToken:
    case Kind.BarEqualsToken:
    case Kind.AmpersandAmpersandEqualsToken:
    case Kind.BarBarEqualsToken:
    case Kind.QuestionQuestionEqualsToken:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the operand needs parens given its parent
 * operator's precedence and position (left/right).
 */
export function needsParensForBinaryOperand(
  parentOp: number,
  operandPrecedence: number,
  isLeft: boolean,
): boolean {
  const parentPrec = getBinaryOperatorPrecedence(parentOp);
  if (operandPrecedence < parentPrec) return true;
  if (operandPrecedence > parentPrec) return false;
  // Equal precedence — check associativity.
  if (isRightAssociative(parentOp)) {
    return isLeft;
  }
  return !isLeft;
}

/**
 * Returns true when an expression needs parens in an array-literal
 * spread position.
 */
export function needsParensInSpreadPosition(node: AstNode): boolean {
  // Comma expressions and yields need parens.
  if (node.kind === Kind.BinaryExpression) {
    const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
    if (op === Kind.CommaToken) return true;
  }
  if (node.kind === Kind.YieldExpression) return true;
  return false;
}
