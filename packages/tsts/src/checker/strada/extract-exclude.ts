/**
 * `Extract<T, U>` and `Exclude<T, U>` resolution.
 *
 * Ported from Strada `checker.go` — getExtractType, getExcludeType.
 * Both are conditional types that distribute over unions.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { isTypeAssignableTo } from "./relations.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Returns `Extract<T, U>` — the constituents of T that are
 * assignable to U.
 */
export function extractTypes(source: Type, target: Type): Type {
  const flags = (source as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return isTypeAssignableTo(source, target) ? source : NEVER;
  }
  const types = (source as unknown as { types?: readonly Type[] }).types ?? [];
  const matching = types.filter((c) => isTypeAssignableTo(c, target));
  if (matching.length === 0) return NEVER;
  if (matching.length === 1) return matching[0]!;
  return { flags: TypeFlags.Union, types: matching } as unknown as Type;
}

/**
 * Returns `Exclude<T, U>` — the constituents of T not assignable to U.
 */
export function excludeTypes(source: Type, target: Type): Type {
  const flags = (source as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return isTypeAssignableTo(source, target) ? NEVER : source;
  }
  const types = (source as unknown as { types?: readonly Type[] }).types ?? [];
  const remaining = types.filter((c) => !isTypeAssignableTo(c, target));
  if (remaining.length === 0) return NEVER;
  if (remaining.length === 1) return remaining[0]!;
  return { flags: TypeFlags.Union, types: remaining } as unknown as Type;
}

/**
 * Returns true when Extract<T, U> is non-empty (some constituent of
 * T is in U).
 */
export function hasExtractedConstituents(source: Type, target: Type): boolean {
  const flags = (extractTypes(source, target) as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.Never) === 0;
}

/**
 * Returns true when Exclude<T, U> equals T (no constituents are
 * removed).
 */
export function isExcludeIdentity(source: Type, target: Type): boolean {
  const result = excludeTypes(source, target);
  // Result type-references the same union when nothing is excluded.
  return result === source;
}
