/**
 * Type narrowing operations — the high-level dispatchers for the
 * specific narrowing files (typeof, instanceof, equality, etc.).
 *
 * Ported from Strada `checker.go` — narrowType (the master dispatch),
 * narrowTypeByAssertion, narrowTypeByOptionalChainContainment.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Narrows a type by removing constituents that match a flag mask.
 */
export function narrowByExcludingFlags(t: Type, mask: number): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return (flags & mask) !== 0 ? NEVER : t;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const remaining = types.filter((c) => {
    const cf = (c as { flags?: number }).flags ?? 0;
    return (cf & mask) === 0;
  });
  if (remaining.length === 0) return NEVER;
  if (remaining.length === 1) return remaining[0]!;
  return { flags: TypeFlags.Union, types: remaining } as unknown as Type;
}

/**
 * Narrows a type by keeping only constituents that match a flag mask.
 */
export function narrowByIncludingFlags(t: Type, mask: number): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return (flags & mask) !== 0 ? t : NEVER;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const matching = types.filter((c) => {
    const cf = (c as { flags?: number }).flags ?? 0;
    return (cf & mask) !== 0;
  });
  if (matching.length === 0) return NEVER;
  if (matching.length === 1) return matching[0]!;
  return { flags: TypeFlags.Union, types: matching } as unknown as Type;
}

/**
 * Returns the assertion-narrowed type from an `as T` cast.
 */
export function narrowByTypeAssertion(_source: Type, target: Type): Type {
  // The asserted type takes precedence — TS treats it as the new type.
  return target;
}

/**
 * Narrows a type by an optional-chain containment — if the access is
 * inside an optional chain, the receiver is narrowed to its
 * non-null/non-undefined form.
 */
export function narrowByOptionalChain(t: Type): Type {
  return narrowByExcludingFlags(t, TypeFlags.Null | TypeFlags.Undefined);
}

/**
 * Returns true when the assertion expression is a `!` non-null
 * assertion.
 */
export function isNonNullAssertion(node: AstNode): boolean {
  return node.kind === Kind.NonNullExpression;
}

/**
 * Narrows a type by stripping null+undefined — the effect of `x!`.
 */
export function narrowByNonNullAssertion(t: Type): Type {
  return narrowByOptionalChain(t);
}

/**
 * Narrows a type from a `if (x)` truthy check.
 */
export function narrowByTruthy(t: Type): Type {
  return narrowByExcludingFlags(
    t,
    TypeFlags.Null | TypeFlags.Undefined | TypeFlags.Void,
  );
}

/**
 * Narrows a type from a `if (!x)` falsy check.
 */
export function narrowByFalsy(t: Type): Type {
  return narrowByIncludingFlags(
    t,
    TypeFlags.Null | TypeFlags.Undefined | TypeFlags.Void,
  );
}
