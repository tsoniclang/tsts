/**
 * `Awaited<T>` builtin type computation.
 *
 * Ported from Strada `checker.go` — getAwaitedType (the deep
 * recursive unwrap that handles thenable + union + intersection).
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { isPromiseType } from "./promises.js";

/**
 * Recursively unwraps `Promise<T>` chains, distributes through
 * unions and intersections.
 */
export function awaitedType(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  // Any / Unknown / Never pass through.
  if ((flags & (TypeFlags.Any | TypeFlags.Unknown | TypeFlags.Never)) !== 0) {
    return t;
  }
  // Union — distribute.
  if ((flags & TypeFlags.Union) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    const awaited = types.map(awaitedType);
    return { flags: TypeFlags.Union, types: awaited } as unknown as Type;
  }
  // Intersection — distribute.
  if ((flags & TypeFlags.Intersection) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    const awaited = types.map(awaitedType);
    return { flags: TypeFlags.Intersection, types: awaited } as unknown as Type;
  }
  // Promise — unwrap one level and recurse.
  if (isPromiseType(t)) {
    const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
    if (args !== undefined && args.length > 0) {
      return awaitedType(args[0]!);
    }
  }
  return t;
}

/**
 * Returns true when the type is a thenable — has a `then` method
 * that takes a callback.
 */
export function isThenableType(t: Type): boolean {
  if (isPromiseType(t)) return true;
  const members = (t as unknown as { symbol?: { members?: Map<string, unknown> } }).symbol?.members;
  return members?.has("then") === true;
}

/**
 * Returns true when awaiting `t` would produce a different type
 * (i.e. there's a wrapper to unwrap).
 */
export function hasAwaitableEffect(t: Type): boolean {
  if (isPromiseType(t)) return true;
  if (isThenableType(t)) return true;
  return false;
}

/**
 * Returns the depth of nested `Promise<Promise<...>>` wrapping.
 */
export function getPromiseDepth(t: Type): number {
  if (!isPromiseType(t)) return 0;
  const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  if (args === undefined || args.length === 0) return 1;
  return 1 + getPromiseDepth(args[0]!);
}
