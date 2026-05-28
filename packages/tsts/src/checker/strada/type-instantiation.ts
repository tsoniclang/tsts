/**
 * Type-instantiation cache + dispatch.
 *
 * Ported from Strada `checker.go` — instantiateType,
 * instantiateGenericClass, getTypeArgumentsForInstantiation.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import type { SubstitutionMap } from "./type-substitution.js";
import { applySubstitution } from "./type-substitution.js";

/**
 * Instantiates a type with a substitution map.
 */
export function instantiate(t: Type, sub: SubstitutionMap): Type {
  return applySubstitution(sub, t);
}

/**
 * Instantiates a list of types in parallel.
 */
export function instantiateMany(
  types: readonly Type[],
  sub: SubstitutionMap,
): readonly Type[] {
  return types.map((t) => instantiate(t, sub));
}

/**
 * Returns true when a type "could contain type variables" — needs
 * potential instantiation when used.
 */
export function couldContainTypeVariables(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & (
    TypeFlags.TypeParameter |
      TypeFlags.IndexedAccess |
      TypeFlags.Conditional |
      TypeFlags.Index
  )) !== 0) return true;
  if ((flags & (TypeFlags.Union | TypeFlags.Intersection)) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    return types.some(couldContainTypeVariables);
  }
  if ((flags & TypeFlags.Object) !== 0) {
    const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
    if (args !== undefined && args.some(couldContainTypeVariables)) return true;
  }
  return false;
}

/**
 * Returns the canonical instantiation key for caching purposes.
 */
export function getInstantiationKey(
  baseSymbol: AstSymbol,
  typeArguments: readonly Type[],
): string {
  const baseName = (baseSymbol as unknown as { name?: string }).name ?? "?";
  const baseId = (baseSymbol as unknown as { id?: number }).id ?? 0;
  const argKeys = typeArguments.map((t) => {
    const flags = (t as { flags?: number }).flags ?? 0;
    const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
    return `${flags}:${sym?.name ?? ""}`;
  });
  return `${baseName}#${baseId}<${argKeys.join(",")}>`;
}

/**
 * Returns true when a type has been instantiated (carries an
 * isInstantiated marker).
 */
export function isInstantiated(t: Type): boolean {
  return (t as unknown as { isInstantiated?: boolean }).isInstantiated === true;
}

/**
 * Marks a type as instantiated. Returns a new Type record.
 */
export function markInstantiated(t: Type): Type {
  return { ...(t as object), isInstantiated: true } as unknown as Type;
}
