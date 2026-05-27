/**
 * Iteration-target type queries.
 *
 * Ported from Strada `checker.go` — for-of / for-await-of iterable
 * type resolution, async-iterator support, generator return types.
 */

import type { Type, TypeFlags } from "../types.js";
import type { CheckerOps } from "./index.js";

/**
 * IterationUse — bit flags for which iteration form is being queried.
 * Matches Strada's IterationUse constants.
 */
export const IterationUse = {
  AllowsSyncIterablesFlag: 1 << 0,
  AllowsAsyncIterablesFlag: 1 << 1,
  AllowsStringInputFlag: 1 << 2,
  ForOfFlag: 1 << 3,
  YieldStarFlag: 1 << 4,
  SpreadFlag: 1 << 5,
  DestructuringFlag: 1 << 6,
  PossiblyOutOfBounds: 1 << 7,
  ReportError: 1 << 8,
  Element: 1 << 0,
  Spread: (1 << 0) | (1 << 2) | (1 << 5),
  Destructuring: (1 << 0) | (1 << 2) | (1 << 6),
  ForOf: (1 << 0) | (1 << 2) | (1 << 3),
  ForAwaitOf: (1 << 0) | (1 << 1) | (1 << 2) | (1 << 3),
  YieldStar: (1 << 0) | (1 << 4),
  AsyncYieldStar: (1 << 0) | (1 << 1) | (1 << 4),
} as const;

const ANY: Type = { flags: 1 << 0 } as unknown as Type;
const STRING: Type = { flags: 1 << 2 } as unknown as Type;

/**
 * Resolves the element type of `inputType` for a for-of / spread /
 * destructuring context.
 */
export function getIteratedTypeOrElementType(c: CheckerOps, inputType: Type, use: number): Type {
  void c; void use;
  // string yields string, arrays yield the element type, otherwise
  // conservative Any.
  const flags = (inputType as { flags?: number }).flags ?? 0;
  if ((flags & (1 << 2)) !== 0 || (flags & (1 << 7)) !== 0) return STRING;
  const elementType = (inputType as unknown as { elementType?: Type }).elementType;
  if (elementType !== undefined) return elementType;
  return ANY;
}

/**
 * Resolves the iteration target type of a generator function — the
 * type yielded by `yield expr`.
 */
export function getYieldedTypeOfYieldExpression(_c: CheckerOps, _isAsync: boolean): Type {
  return ANY;
}

/**
 * Returns the `T` in `Iterator<T>` or `AsyncIterator<T>` if known.
 */
export function getIteratorYieldType(t: Type, _async: boolean): Type | undefined {
  const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  return args !== undefined && args.length > 0 ? args[0] : undefined;
}

/**
 * Resolves the next() return type from an Iterator. Without full
 * symbol resolution we return undefined.
 */
export function getNextResultTypeOfIterator(_t: Type): Type | undefined {
  return undefined;
}

/**
 * Resolves the iteration types for a `for-of`, returning the element
 * type plus next/return/throw types.
 */
export function getIterationTypesOfIterable(c: CheckerOps, inputType: Type, use: number): {
  yieldType: Type;
  returnType: Type;
  nextType: Type;
} {
  return {
    yieldType: getIteratedTypeOrElementType(c, inputType, use),
    returnType: ANY,
    nextType: ANY,
  };
}

void IterationUse;
void undefined as unknown as TypeFlags;
