/**
 * LiteralType node handling (`"foo"`, `42`, `true` in type position).
 *
 * Ported from Strada `checker.go` — getTypeFromLiteralTypeNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a LiteralType.
 */
export function isLiteralTypeNode(node: AstNode): boolean {
  return node.kind === Kind.LiteralType;
}

/**
 * Returns the literal node inside a LiteralType.
 */
export function getLiteralTypeLiteral(node: AstNode): AstNode | undefined {
  if (!isLiteralTypeNode(node)) return undefined;
  return (node as unknown as { literal?: AstNode }).literal;
}

/**
 * Returns true when the LiteralType wraps a string literal.
 */
export function isStringLiteralTypeNode(node: AstNode): boolean {
  const literal = getLiteralTypeLiteral(node);
  return literal !== undefined && literal.kind === Kind.StringLiteral;
}

/**
 * Returns true when the LiteralType wraps a numeric literal.
 */
export function isNumericLiteralTypeNode(node: AstNode): boolean {
  const literal = getLiteralTypeLiteral(node);
  return literal !== undefined && literal.kind === Kind.NumericLiteral;
}

/**
 * Returns true when the LiteralType wraps a boolean literal.
 */
export function isBooleanLiteralTypeNode(node: AstNode): boolean {
  const literal = getLiteralTypeLiteral(node);
  if (literal === undefined) return false;
  return literal.kind === Kind.TrueKeyword || literal.kind === Kind.FalseKeyword;
}

/**
 * Returns true when the LiteralType wraps a bigint literal.
 */
export function isBigIntLiteralTypeNode(node: AstNode): boolean {
  const literal = getLiteralTypeLiteral(node);
  return literal !== undefined && literal.kind === Kind.BigIntLiteral;
}

/**
 * Returns true when the LiteralType is `null`.
 */
export function isNullLiteralTypeNode(node: AstNode): boolean {
  const literal = getLiteralTypeLiteral(node);
  return literal !== undefined && literal.kind === Kind.NullKeyword;
}

/**
 * Returns true when the LiteralType wraps a prefix-unary negative
 * number (`-1`).
 */
export function isNegativeNumericLiteralTypeNode(node: AstNode): boolean {
  const literal = getLiteralTypeLiteral(node);
  if (literal === undefined || literal.kind !== Kind.PrefixUnaryExpression) return false;
  const op = (literal as unknown as { operator?: number }).operator;
  if (op !== Kind.MinusToken) return false;
  const operand = (literal as unknown as { operand?: AstNode }).operand;
  return operand !== undefined && operand.kind === Kind.NumericLiteral;
}

/**
 * Returns the literal text value of a LiteralType, if statically
 * knowable.
 */
export function getLiteralTypeText(node: AstNode): string | undefined {
  const literal = getLiteralTypeLiteral(node);
  if (literal === undefined) return undefined;
  switch (literal.kind) {
    case Kind.StringLiteral:
    case Kind.NumericLiteral:
    case Kind.BigIntLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
      return (literal as unknown as { text?: string }).text;
    case Kind.TrueKeyword: return "true";
    case Kind.FalseKeyword: return "false";
    case Kind.NullKeyword: return "null";
    default: return undefined;
  }
}
