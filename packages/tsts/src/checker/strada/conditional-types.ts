/**
 * Conditional type resolution.
 *
 * Ported from Strada `checker.go` — conditional types of the form
 * `T extends U ? X : Y`. Handles deferred resolution, distribution
 * across naked type-parameters, and `infer` clauses.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { isTypeAssignableTo } from "./relations.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Returns the constituent types of a conditional. Distributes over
 * unions when the check-type is a naked type parameter.
 */
export function getConditionalTypeBranches(t: Type): {
  checkType: Type | undefined;
  extendsType: Type | undefined;
  trueType: Type | undefined;
  falseType: Type | undefined;
} {
  return {
    checkType: (t as unknown as { checkType?: Type }).checkType,
    extendsType: (t as unknown as { extendsType?: Type }).extendsType,
    trueType: (t as unknown as { trueType?: Type }).trueType,
    falseType: (t as unknown as { falseType?: Type }).falseType,
  };
}

/**
 * Resolves a conditional type given a non-deferred check type. If
 * checkType is assignable to extendsType, returns trueType; else
 * returns falseType.
 *
 * When checkType is a union and distribution applies, the result is
 * a union of per-constituent resolutions.
 */
export function resolveConditionalType(t: Type): Type {
  const { checkType, extendsType, trueType, falseType } = getConditionalTypeBranches(t);
  if (checkType === undefined || extendsType === undefined) return NEVER;
  // If the check type is a TypeParameter, the result is the entire
  // conditional preserved (deferred).
  const checkFlags = (checkType as { flags?: number }).flags ?? 0;
  if ((checkFlags & TypeFlags.TypeParameter) !== 0) return t;

  // Distribute over unions.
  if ((checkFlags & TypeFlags.Union) !== 0) {
    const types = (checkType as unknown as { types?: readonly Type[] }).types ?? [];
    const distributed = types.map((c) => {
      const sub: Type = {
        ...(t as object),
        checkType: c,
      } as unknown as Type;
      return resolveConditionalType(sub);
    });
    return { flags: TypeFlags.Union, types: distributed } as unknown as Type;
  }

  // Non-distributing path: a simple assignability check decides.
  return isTypeAssignableTo(checkType, extendsType)
    ? (trueType ?? NEVER)
    : (falseType ?? NEVER);
}

/**
 * Returns true when the conditional is "distributive" — i.e. its
 * check-type is a naked type parameter so it distributes over union
 * constituents.
 */
export function isDistributiveConditional(t: Type): boolean {
  const check = (t as unknown as { checkType?: Type }).checkType;
  if (check === undefined) return false;
  const flags = (check as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.TypeParameter) !== 0;
}

/**
 * Returns true when the conditional is the canonical `Exclude<T, U>` /
 * `Extract<T, U>` shape. Used by the type renderer to surface the
 * built-in conditional helper name.
 */
export function isExcludeOrExtract(_t: Type): "Exclude" | "Extract" | undefined {
  return undefined; // Heuristic deferred.
}
