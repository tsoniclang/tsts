/**
 * Computed property name handling.
 *
 * Ported from Strada `checker.go` — checkComputedPropertyName,
 * getLateBoundSymbol, computeLateBoundPropertyKeys.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the node is a ComputedPropertyName.
 */
export function isComputedPropertyName(node: AstNode): boolean {
  return node.kind === Kind.ComputedPropertyName;
}

/**
 * Returns the inner expression of a ComputedPropertyName.
 */
export function getComputedPropertyExpression(node: AstNode): AstNode | undefined {
  if (!isComputedPropertyName(node)) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns true when a computed property name evaluates to a literal
 * type — its key becomes statically known.
 */
export function isComputedPropertyNameLiteral(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & (TypeFlags.StringLiteral | TypeFlags.NumberLiteral | TypeFlags.UniqueESSymbol)) !== 0;
}

/**
 * Returns the static property key from a literal computed-name type,
 * or undefined when the expression isn't a literal.
 */
export function getStaticKeyFromLiteralType(t: Type): string | number | undefined {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & (TypeFlags.StringLiteral | TypeFlags.NumberLiteral)) === 0) return undefined;
  return (t as unknown as { value?: string | number }).value;
}

/**
 * Returns true when the computed name expression is a well-known
 * symbol (`Symbol.iterator`, `Symbol.asyncIterator`, etc.).
 */
export function isWellKnownSymbolReference(node: AstNode): boolean {
  if (node.kind !== Kind.PropertyAccessExpression) return false;
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr === undefined || expr.kind !== Kind.Identifier) return false;
  const text = (expr as unknown as { escapedText?: string }).escapedText;
  return text === "Symbol";
}

/**
 * Returns true when a computed property name can serve as a "late-
 * bound" member — its key is computable statically (literal or
 * well-known symbol).
 */
export function isLateBoundComputedName(t: Type, expressionNode: AstNode): boolean {
  if (isComputedPropertyNameLiteral(t)) return true;
  return isWellKnownSymbolReference(expressionNode);
}
