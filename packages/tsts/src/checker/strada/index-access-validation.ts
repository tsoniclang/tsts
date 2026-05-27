/**
 * Index-access expression validation.
 *
 * Ported from Strada `checker.go` — checkElementAccessExpression,
 * getElementAccessType, isValidIndexAccess.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the node is an ElementAccessExpression.
 */
export function isElementAccessExpression(node: AstNode): boolean {
  return node.kind === Kind.ElementAccessExpression;
}

/**
 * Returns the receiver expression of an ElementAccessExpression.
 */
export function getElementAccessReceiver(node: AstNode): AstNode | undefined {
  if (!isElementAccessExpression(node)) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns the index/argument expression.
 */
export function getElementAccessIndex(node: AstNode): AstNode | undefined {
  if (!isElementAccessExpression(node)) return undefined;
  return (node as unknown as { argumentExpression?: AstNode }).argumentExpression;
}

/**
 * Returns true when the index is a literal (string/number).
 */
export function isLiteralIndex(node: AstNode): boolean {
  const index = getElementAccessIndex(node);
  if (index === undefined) return false;
  return (
    index.kind === Kind.StringLiteral ||
    index.kind === Kind.NumericLiteral ||
    index.kind === Kind.NoSubstitutionTemplateLiteral
  );
}

/**
 * Returns true when the index type is a valid key type for the
 * receiver (string, number, symbol, or a literal of those).
 */
export function isValidIndexType(indexType: Type): boolean {
  const flags = (indexType as { flags?: number }).flags ?? 0;
  return (flags & (
    TypeFlags.String |
    TypeFlags.Number |
    TypeFlags.ESSymbol |
    TypeFlags.UniqueESSymbol |
    TypeFlags.StringLiteral |
    TypeFlags.NumberLiteral |
    TypeFlags.Any |
    TypeFlags.Unknown
  )) !== 0;
}

/**
 * Returns true when the index access requires an `unknown` cast
 * (the receiver type is `unknown`).
 */
export function requiresCastFromUnknown(receiverType: Type): boolean {
  const flags = (receiverType as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.Unknown) !== 0;
}

/**
 * Returns true when the index is part of an optional chain.
 */
export function isOptionalElementAccess(node: AstNode): boolean {
  if (!isElementAccessExpression(node)) return false;
  return (node as unknown as { questionDotToken?: AstNode }).questionDotToken !== undefined;
}
