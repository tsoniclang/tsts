/**
 * Type-emit helpers for declaration emit.
 *
 * Ported from Strada `transformers/declarations/transform.go` —
 * helpers that produce the simplified `.d.ts`-friendly form of a
 * type.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when a type is "portable" — fully expressible in a
 * `.d.ts` declaration without compiler-internal markers.
 */
export function isPortableType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  // Indexed-access and conditional types are deferred; if their
  // operands aren't ready, they're not portable.
  if ((flags & (TypeFlags.IndexedAccess | TypeFlags.Conditional)) !== 0) {
    return false;
  }
  if ((flags & TypeFlags.Union) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    return types.every(isPortableType);
  }
  if ((flags & TypeFlags.Intersection) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    return types.every(isPortableType);
  }
  return true;
}

/**
 * Returns true when the type is an "anonymous" object literal type
 * — would be rendered inline rather than as a named reference.
 */
export function isAnonymousObjectType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return false;
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  if (sym?.name === undefined) return false;
  return sym.name.startsWith("__");
}

/**
 * Returns true when the type would emit as a generic reference
 * (has type arguments).
 */
export function isGenericTypeReference(t: Type): boolean {
  const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  return args !== undefined && args.length > 0;
}

/**
 * Returns the type-argument count.
 */
export function getTypeArgumentCount(t: Type): number {
  const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  return args?.length ?? 0;
}

/**
 * Returns true when the type should be emitted with explicit
 * type-arguments (vs. inferred).
 */
export function needsExplicitTypeArguments(t: Type): boolean {
  return isGenericTypeReference(t);
}

/**
 * Returns the "emit-friendly" name of a type — strips synthetic
 * markers.
 */
export function getEmitName(t: Type): string {
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  const name = sym?.name ?? "";
  if (name.startsWith("__")) return "/* anonymous */";
  return name;
}
