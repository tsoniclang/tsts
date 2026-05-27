/**
 * `any` type handling.
 *
 * Ported from Strada `checker.go` — isAnyType, isImplicitAny,
 * checkImplicitAnyDiagnostics.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when the type is `any`.
 */
export function isAnyType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.Any) !== 0;
}

/**
 * Returns the canonical `any` type instance.
 */
export function anyType(): Type {
  return ANY;
}

/**
 * Returns true when the type is "implicit any" — Any with an
 * isImplicit marker set by the inference pass.
 */
export function isImplicitAny(t: Type): boolean {
  if (!isAnyType(t)) return false;
  return (t as unknown as { isImplicit?: boolean }).isImplicit === true;
}

/**
 * Returns the canonical implicit-any type.
 */
export function implicitAnyType(): Type {
  return { flags: TypeFlags.Any, isImplicit: true } as unknown as Type;
}

/**
 * Returns true when any constituent of a union is `any` — which
 * absorbs the entire union.
 */
export function unionContainsAny(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Any) !== 0) return true;
  if ((flags & TypeFlags.Union) === 0) return false;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  return types.some(isAnyType);
}

/**
 * Returns the simplified union — if any constituent is `any`,
 * returns `any`.
 */
export function simplifyUnionWithAny(t: Type): Type {
  if (unionContainsAny(t)) return ANY;
  return t;
}

/**
 * Returns true when the type is "implicitly any" — would trigger a
 * noImplicitAny diagnostic.
 */
export function wouldTriggerNoImplicitAny(t: Type): boolean {
  return isImplicitAny(t);
}
