/**
 * Literal-key property resolution.
 *
 * Ported from Strada `checker.go` — getPropertyByLiteralName,
 * tryGetPropertyForKey, isLiteralKey.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the node is a literal that can serve as a
 * property key.
 */
export function isLiteralPropertyKey(node: AstNode): boolean {
  return (
    node.kind === Kind.Identifier ||
    node.kind === Kind.StringLiteral ||
    node.kind === Kind.NumericLiteral ||
    node.kind === Kind.NoSubstitutionTemplateLiteral
  );
}

/**
 * Returns the text of a literal property key node.
 */
export function getLiteralKeyText(node: AstNode): string | undefined {
  switch (node.kind) {
    case Kind.Identifier:
      return (node as unknown as { escapedText?: string }).escapedText;
    case Kind.StringLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
      return (node as unknown as { text?: string }).text;
    case Kind.NumericLiteral: {
      const t = (node as unknown as { text?: string }).text;
      return t;
    }
    default:
      return undefined;
  }
}

/**
 * Returns the property symbol on a type for a literal-key text.
 */
export function getPropertyByLiteralKey(
  t: Type,
  key: string,
): AstSymbol | undefined {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return undefined;
  const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  return members?.get(key);
}

/**
 * Returns the keyed property when the key is a known literal type.
 */
export function getPropertyForLiteralType(
  t: Type,
  keyType: Type,
): AstSymbol | undefined {
  const kf = (keyType as { flags?: number }).flags ?? 0;
  let key: string | undefined;
  if ((kf & TypeFlags.StringLiteral) !== 0) {
    key = (keyType as unknown as { value?: string }).value;
  } else if ((kf & TypeFlags.NumberLiteral) !== 0) {
    const v = (keyType as unknown as { value?: number }).value;
    key = v !== undefined ? String(v) : undefined;
  }
  if (key === undefined) return undefined;
  return getPropertyByLiteralKey(t, key);
}

/**
 * Returns true when a literal key would match a property name on
 * any constituent of a union.
 */
export function literalKeyMatchesUnion(t: Type, key: string): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return getPropertyByLiteralKey(t, key) !== undefined;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  return types.some((c) => getPropertyByLiteralKey(c, key) !== undefined);
}
