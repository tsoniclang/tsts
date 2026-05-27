/**
 * Unary operator type computations.
 *
 * Ported from Strada `checker.go` — getTypeOfPrefixUnaryExpression,
 * getTypeOfPostfixUnaryExpression, checkTypeOfExpression,
 * checkVoidExpression, checkDeleteExpression.
 */

import { Kind } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NUMBER: Type = { flags: TypeFlags.Number } as unknown as Type;
const STRING: Type = { flags: TypeFlags.String } as unknown as Type;
const BOOLEAN: Type = { flags: TypeFlags.Boolean } as unknown as Type;
const BIGINT: Type = { flags: TypeFlags.BigInt } as unknown as Type;
const UNDEFINED: Type = { flags: TypeFlags.Undefined } as unknown as Type;

/**
 * Returns the result type for `+x` / `-x`. Preserves bigint when
 * the operand is bigint.
 */
export function getNumericNegationType(operand: Type): Type {
  const f = (operand as { flags?: number }).flags ?? 0;
  if ((f & TypeFlags.BigInt) !== 0) return BIGINT;
  return NUMBER;
}

/**
 * Returns the result type for `~x` (bitwise NOT). Numeric or bigint.
 */
export function getBitwiseNotType(operand: Type): Type {
  return getNumericNegationType(operand);
}

/**
 * Returns the result type for `!x` (logical NOT). Always boolean.
 */
export function getLogicalNotType(): Type {
  return BOOLEAN;
}

/**
 * Returns the result type for `typeof x`. Returns the union of all
 * canonical typeof strings.
 */
export function getTypeOfExpressionType(): Type {
  const types: Type[] = [
    "string", "number", "boolean", "undefined", "object", "function", "symbol", "bigint",
  ].map((s) => ({ flags: TypeFlags.StringLiteral, value: s } as unknown as Type));
  return { flags: TypeFlags.Union, types } as unknown as Type;
}

/**
 * Returns the result type for `void x`. Always undefined.
 */
export function getVoidExpressionType(): Type {
  return UNDEFINED;
}

/**
 * Returns the result type for `delete x`. Always boolean.
 */
export function getDeleteExpressionType(): Type {
  return BOOLEAN;
}

/**
 * Returns the result type for `await x`. Conservative shell —
 * promises.ts handles the actual Promise<T> → T unwrap.
 */
export function getAwaitExpressionType(operand: Type): Type {
  return operand;
}

/**
 * Returns the result type for `yield x`. Conservative shell.
 */
export function getYieldExpressionType(operand: Type): Type {
  return operand;
}

/**
 * Returns the result type for `++x` / `--x` / `x++` / `x--`. The
 * operand and result are both numeric (or bigint).
 */
export function getIncrementDecrementType(operand: Type): Type {
  return getNumericNegationType(operand);
}

/**
 * Returns the result type for any prefix-unary operator.
 */
export function getPrefixUnaryResultType(
  operator: number,
  operand: Type,
): Type {
  switch (operator) {
    case Kind.PlusToken:
    case Kind.MinusToken:
      return getNumericNegationType(operand);
    case Kind.TildeToken:
      return getBitwiseNotType(operand);
    case Kind.ExclamationToken:
      return getLogicalNotType();
    case Kind.PlusPlusToken:
    case Kind.MinusMinusToken:
      return getIncrementDecrementType(operand);
    default:
      return operand;
  }
}

/**
 * Returns the result type for any postfix-unary operator. Only
 * `++` and `--` are postfix in TS/JS.
 */
export function getPostfixUnaryResultType(
  _operator: number,
  operand: Type,
): Type {
  return getIncrementDecrementType(operand);
}

void STRING; // referenced by other modules at runtime; keep import live
