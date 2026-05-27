/**
 * `unknown` type handling.
 *
 * Ported from Strada `checker.go` — isUnknownType, narrowFromUnknown,
 * isAssignableToUnknown.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const UNKNOWN: Type = { flags: TypeFlags.Unknown } as unknown as Type;

/**
 * Returns true when the type is `unknown`.
 */
export function isUnknownType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.Unknown) !== 0;
}

/**
 * Returns the canonical `unknown` type instance.
 */
export function unknownType(): Type {
  return UNKNOWN;
}

/**
 * Returns true when any constituent of a union is `unknown` — which
 * absorbs the entire union.
 */
export function unionContainsUnknown(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Unknown) !== 0) return true;
  if ((flags & TypeFlags.Union) === 0) return false;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  return types.some(isUnknownType);
}

/**
 * Returns the simplified union type — if any constituent is
 * `unknown`, returns just `unknown`.
 */
export function simplifyUnionWithUnknown(t: Type): Type {
  if (unionContainsUnknown(t)) return UNKNOWN;
  return t;
}

/**
 * Returns true when narrowing from `unknown` is required to use the
 * value — requires explicit type assertion or refinement.
 */
export function requiresNarrowing(t: Type): boolean {
  return isUnknownType(t);
}

/**
 * Returns true when the type is "loosely typed" — Any, Unknown, or
 * `{}` (the empty object type).
 */
export function isLooselyTyped(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & (TypeFlags.Any | TypeFlags.Unknown)) !== 0;
}
