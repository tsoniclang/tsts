/**
 * Promise / async-function helpers.
 *
 * Ported from Strada `checker.go` — getAwaitedTypeOfPromise,
 * getReturnTypeOfAsyncFunction, isPromiseType.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when the type is `Promise<T>` for some T.
 */
export function isPromiseType(t: Type): boolean {
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  return sym?.name === "Promise";
}

/**
 * Returns the `T` of `Promise<T>`, or undefined when the type isn't
 * a Promise.
 */
export function getAwaitedTypeOfPromise(t: Type): Type | undefined {
  if (!isPromiseType(t)) return undefined;
  const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  return args !== undefined && args.length > 0 ? args[0] : ANY;
}

/**
 * Recursively unwraps `Promise<Promise<…<T>>>` to T. Used by
 * `await` expressions where awaiting a Promise<Promise<T>> yields T.
 */
export function getAwaitedType(t: Type): Type {
  let current = t;
  while (isPromiseType(current)) {
    const inner = getAwaitedTypeOfPromise(current);
    if (inner === undefined) break;
    current = inner;
  }
  return current;
}

/**
 * Builds a `Promise<T>` type reference. Without a global Promise
 * symbol available we surface a placeholder Object type carrying
 * the type-argument list.
 */
export function createPromiseType(awaitedType: Type): Type {
  return {
    flags: TypeFlags.Object,
    symbol: { name: "Promise" },
    typeArguments: [awaitedType],
  } as unknown as Type;
}

/**
 * Returns the return type that an async function exposes — wraps the
 * body's return type in Promise.
 */
export function getReturnTypeOfAsyncFunction(awaitedType: Type): Type {
  return createPromiseType(awaitedType);
}

/**
 * Returns true when calling `then(...)` on `t` is valid — i.e. `t`
 * is Any, Unknown, or Promise-like.
 */
export function isThenable(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & ((1 << 0) | (1 << 1))) !== 0) return true;
  return isPromiseType(t);
}
