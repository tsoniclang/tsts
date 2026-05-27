/**
 * Literal-type widening.
 *
 * Ported from Strada `checker.go` — widening rules that convert
 * literal types to their base primitive when context warrants.
 * E.g. in `const x: string = "foo"`, the `"foo"` literal widens to
 * `string` to match the annotation; in `let x = "foo"`, it widens.
 *
 * Returns the widened type or the original when no widening applies.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import {
  stringType,
  numberType,
  booleanType,
  bigintType,
} from "./intrinsics.js";

export function getWidenedLiteralType(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.StringLiteral) !== 0) return stringType;
  if ((flags & TypeFlags.NumberLiteral) !== 0) return numberType;
  if ((flags & TypeFlags.BooleanLiteral) !== 0) return booleanType;
  if ((flags & TypeFlags.BigIntLiteral) !== 0) return bigintType;
  return t;
}

export function getWidenedType(t: Type): Type {
  // Walk union constituents widening each; if any constituent
  // widens, return a new union with the widened types. Otherwise
  // return the type itself.
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    const widened = types.map(getWidenedLiteralType);
    if (widened.some((w, i) => w !== types[i])) {
      return { ...(t as object), types: widened } as unknown as Type;
    }
    return t;
  }
  return getWidenedLiteralType(t);
}

export function isFreshLiteralType(t: Type): boolean {
  return (t as unknown as { isFresh?: boolean }).isFresh === true;
}

/**
 * Removes literal-fresh marker so the type behaves like a regular
 * (non-literal) for subsequent inference. Used when assigning a fresh
 * literal into an annotated location.
 */
export function getRegularLiteralType(t: Type): Type {
  if (!isFreshLiteralType(t)) return t;
  return { ...(t as object), isFresh: false } as unknown as Type;
}
