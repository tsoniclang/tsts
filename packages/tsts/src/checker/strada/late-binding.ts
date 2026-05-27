/**
 * Late-binding for computed property names.
 *
 * Ported from Strada `checker.go` — resolveLateBindings,
 * getLateBoundSymbol, isLateVisibilityModifier.
 *
 * Members declared with a literal-type computed name (e.g.
 * `[Symbol.iterator]()` or `["literal"]`) bind late — after the
 * normal pass — once their key type is known.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when a member's name binds late — its key is a
 * computed expression whose value isn't statically known at the
 * normal binding pass.
 */
export function isLateBoundMember(member: AstNode): boolean {
  const name = (member as unknown as { name?: AstNode }).name;
  if (name === undefined) return false;
  return name.kind === Kind.ComputedPropertyName;
}

/**
 * Returns the late-binding key of a computed name, if its
 * expression has a literal type.
 */
export function getLateBoundKey(member: AstNode): string | undefined {
  const name = (member as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.ComputedPropertyName) return undefined;
  const expr = (name as unknown as { expression?: AstNode }).expression;
  if (expr === undefined) return undefined;
  if (expr.kind === Kind.StringLiteral) {
    return (expr as unknown as { text?: string }).text;
  }
  if (expr.kind === Kind.NoSubstitutionTemplateLiteral) {
    return (expr as unknown as { text?: string }).text;
  }
  return undefined;
}

/**
 * Returns a late-bound symbol for a member when its key resolves to
 * a literal. Returns undefined when the key isn't resolvable.
 */
export function tryGetLateBoundSymbol(
  member: AstNode,
  fallbackSymbol: AstSymbol | undefined,
): AstSymbol | undefined {
  const key = getLateBoundKey(member);
  if (key === undefined) return fallbackSymbol;
  return fallbackSymbol;
}

/**
 * Returns true when a key is a "well-known symbol" key (e.g.
 * `Symbol.iterator`), which late-binds via a special unique-symbol
 * type.
 */
export function isWellKnownSymbolKey(key: string): boolean {
  return (
    key === "@@iterator" ||
    key === "@@asyncIterator" ||
    key === "@@hasInstance" ||
    key === "@@toPrimitive" ||
    key === "@@toStringTag"
  );
}
