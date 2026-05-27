/**
 * `instanceof` narrowing.
 *
 * Ported from Strada `checker.go` — narrowTypeByInstanceof,
 * checkInstanceofExpression.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Returns the instance type for a constructor — the prototype's
 * declared instance shape.
 */
export function getInstanceTypeOfConstructor(constructor: Type): Type {
  const flags = (constructor as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return constructor;
  const sym = (constructor as unknown as { symbol?: AstSymbol }).symbol;
  if (sym === undefined) return constructor;
  const instType = (sym as unknown as { instanceType?: Type }).instanceType;
  return instType ?? constructor;
}

/**
 * Narrows a type via `x instanceof Foo` — keeps only constituents
 * compatible with Foo's instance type.
 */
export function narrowByInstanceof(t: Type, constructor: Type): Type {
  const instType = getInstanceTypeOfConstructor(constructor);
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return t;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const matching = types.filter((c) => {
    const cSym = (c as unknown as { symbol?: AstSymbol }).symbol;
    const iSym = (instType as unknown as { symbol?: AstSymbol }).symbol;
    return cSym === iSym;
  });
  if (matching.length === 0) return NEVER;
  if (matching.length === 1) return matching[0]!;
  return { flags: TypeFlags.Union, types: matching } as unknown as Type;
}

/**
 * Narrows a type to exclude the given constructor — used for the
 * "else" branch of an instanceof check.
 */
export function narrowByExcludingInstanceof(t: Type, constructor: Type): Type {
  const instType = getInstanceTypeOfConstructor(constructor);
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return t;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const remaining = types.filter((c) => {
    const cSym = (c as unknown as { symbol?: AstSymbol }).symbol;
    const iSym = (instType as unknown as { symbol?: AstSymbol }).symbol;
    return cSym !== iSym;
  });
  if (remaining.length === 0) return NEVER;
  if (remaining.length === 1) return remaining[0]!;
  return { flags: TypeFlags.Union, types: remaining } as unknown as Type;
}
