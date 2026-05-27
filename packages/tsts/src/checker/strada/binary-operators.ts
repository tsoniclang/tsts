/**
 * Binary operator type computations.
 *
 * Ported from Strada `checker.go` — getTypeOfBinaryExpression,
 * checkBinaryLikeExpressionWorker, getLogicalAndOperationType,
 * getNullishCoalescingResultType.
 */

import { Kind } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NUMBER: Type = { flags: TypeFlags.Number } as unknown as Type;
const STRING: Type = { flags: TypeFlags.String } as unknown as Type;
const BOOLEAN: Type = { flags: TypeFlags.Boolean } as unknown as Type;
const BIGINT: Type = { flags: TypeFlags.BigInt } as unknown as Type;

/**
 * Returns the canonical result type for an arithmetic operator
 * (`+ - * / % **`). Returns number unless both operands are bigint.
 */
export function getArithmeticOperatorType(left: Type, right: Type): Type {
  const lf = (left as { flags?: number }).flags ?? 0;
  const rf = (right as { flags?: number }).flags ?? 0;
  if ((lf & TypeFlags.BigInt) !== 0 && (rf & TypeFlags.BigInt) !== 0) return BIGINT;
  return NUMBER;
}

/**
 * Returns the result type for `+` — string if either operand is a
 * string; otherwise arithmetic.
 */
export function getPlusOperatorType(left: Type, right: Type): Type {
  const lf = (left as { flags?: number }).flags ?? 0;
  const rf = (right as { flags?: number }).flags ?? 0;
  if ((lf & TypeFlags.String) !== 0 || (rf & TypeFlags.String) !== 0) return STRING;
  if ((lf & TypeFlags.StringLiteral) !== 0 || (rf & TypeFlags.StringLiteral) !== 0) return STRING;
  return getArithmeticOperatorType(left, right);
}

/**
 * Returns the result type for bitwise operators (`& | ^ << >> >>>`).
 * Always number unless both operands are bigint.
 */
export function getBitwiseOperatorType(left: Type, right: Type): Type {
  return getArithmeticOperatorType(left, right);
}

/**
 * Returns the result type for relational operators (`< > <= >=`).
 * Always boolean.
 */
export function getRelationalOperatorType(): Type {
  return BOOLEAN;
}

/**
 * Returns the result type for equality operators (`== != === !==`).
 * Always boolean.
 */
export function getEqualityOperatorType(): Type {
  return BOOLEAN;
}

/**
 * Returns the result type for `&&` — narrower of the two operands.
 * If left is truthy, returns right; if left is falsy, returns left.
 */
export function getLogicalAndOperationType(left: Type, right: Type): Type {
  // Conservative: return the union.
  return { flags: TypeFlags.Union, types: [left, right] } as unknown as Type;
}

/**
 * Returns the result type for `||` — left or right.
 */
export function getLogicalOrOperationType(left: Type, right: Type): Type {
  return { flags: TypeFlags.Union, types: [left, right] } as unknown as Type;
}

/**
 * Returns the result type for `??` — left's non-null/non-undefined
 * type, unioned with right.
 */
export function getNullishCoalescingResultType(left: Type, right: Type): Type {
  const lf = (left as { flags?: number }).flags ?? 0;
  if ((lf & (TypeFlags.Null | TypeFlags.Undefined)) === 0) {
    return left;
  }
  return { flags: TypeFlags.Union, types: [left, right] } as unknown as Type;
}

/**
 * Returns the result type for any binary operator. Dispatches by
 * the operator-token kind.
 */
export function getBinaryOperationResultType(
  operator: number,
  left: Type,
  right: Type,
): Type {
  switch (operator) {
    case Kind.PlusToken: return getPlusOperatorType(left, right);
    case Kind.MinusToken:
    case Kind.AsteriskToken:
    case Kind.SlashToken:
    case Kind.PercentToken:
    case Kind.AsteriskAsteriskToken:
      return getArithmeticOperatorType(left, right);
    case Kind.AmpersandToken:
    case Kind.BarToken:
    case Kind.CaretToken:
    case Kind.LessThanLessThanToken:
    case Kind.GreaterThanGreaterThanToken:
    case Kind.GreaterThanGreaterThanGreaterThanToken:
      return getBitwiseOperatorType(left, right);
    case Kind.LessThanToken:
    case Kind.GreaterThanToken:
    case Kind.LessThanEqualsToken:
    case Kind.GreaterThanEqualsToken:
    case Kind.InKeyword:
    case Kind.InstanceOfKeyword:
      return getRelationalOperatorType();
    case Kind.EqualsEqualsToken:
    case Kind.ExclamationEqualsToken:
    case Kind.EqualsEqualsEqualsToken:
    case Kind.ExclamationEqualsEqualsToken:
      return getEqualityOperatorType();
    case Kind.AmpersandAmpersandToken:
      return getLogicalAndOperationType(left, right);
    case Kind.BarBarToken:
      return getLogicalOrOperationType(left, right);
    case Kind.QuestionQuestionToken:
      return getNullishCoalescingResultType(left, right);
    case Kind.CommaToken:
      return right;
    default:
      return right;
  }
}
