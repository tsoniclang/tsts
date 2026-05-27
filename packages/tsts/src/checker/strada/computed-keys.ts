/**
 * Computed property-key evaluation.
 *
 * Ported from Strada `checker.go` — getEffectiveKeyOfComputedPropertyName,
 * isStaticallyResolvableKey.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the node is a ComputedPropertyName.
 */
export function isComputedKey(node: AstNode): boolean {
  return node.kind === Kind.ComputedPropertyName;
}

/**
 * Returns the inner expression of a computed key.
 */
export function getComputedKeyExpression(node: AstNode): AstNode | undefined {
  if (!isComputedKey(node)) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns true when the computed-key expression is a literal that
 * resolves to a static string/number key.
 */
export function isStaticKey(node: AstNode): boolean {
  const expr = getComputedKeyExpression(node);
  if (expr === undefined) return false;
  return (
    expr.kind === Kind.StringLiteral ||
    expr.kind === Kind.NumericLiteral ||
    expr.kind === Kind.NoSubstitutionTemplateLiteral
  );
}

/**
 * Returns the static key as a string, or undefined.
 */
export function getStaticKey(node: AstNode): string | undefined {
  const expr = getComputedKeyExpression(node);
  if (expr === undefined) return undefined;
  if (expr.kind === Kind.StringLiteral || expr.kind === Kind.NoSubstitutionTemplateLiteral) {
    return (expr as unknown as { text?: string }).text;
  }
  if (expr.kind === Kind.NumericLiteral) {
    return (expr as unknown as { text?: string }).text;
  }
  return undefined;
}

/**
 * Returns the key type for a computed key — string-literal /
 * number-literal / unique-symbol when known, else `string|number|symbol`.
 */
export function getComputedKeyType(t: Type | undefined): Type {
  if (t === undefined) {
    return {
      flags: TypeFlags.Union,
      types: [
        { flags: TypeFlags.String } as unknown as Type,
        { flags: TypeFlags.Number } as unknown as Type,
        { flags: TypeFlags.ESSymbol } as unknown as Type,
      ],
    } as unknown as Type;
  }
  return t;
}

/**
 * Returns true when the key is a unique-symbol reference.
 */
export function isUniqueSymbolKey(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.UniqueESSymbol) !== 0;
}

/**
 * Returns true when the computed key is "late-bound" — its value
 * isn't fully known until inference.
 */
export function isLateBoundKey(node: AstNode): boolean {
  return isComputedKey(node) && !isStaticKey(node);
}
