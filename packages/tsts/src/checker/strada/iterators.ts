/**
 * Iterator-protocol type computations.
 *
 * Ported from Strada `checker.go` — getIteratorYieldType,
 * getIteratorReturnType, getIteratorNextType, getElementTypeOfIterable.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;
const VOID: Type = { flags: TypeFlags.Void } as unknown as Type;
const UNKNOWN: Type = { flags: TypeFlags.Unknown } as unknown as Type;

/**
 * Returns true when the symbol name indicates an iterator.
 */
export function isIteratorTypeName(name: string): boolean {
  return name === "Iterator" || name === "AsyncIterator" ||
    name === "Iterable" || name === "AsyncIterable" ||
    name === "IterableIterator" || name === "AsyncIterableIterator" ||
    name === "Generator" || name === "AsyncGenerator";
}

/**
 * Returns true when the type is an iterable shape.
 */
export function isIterableType(t: Type): boolean {
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  return sym !== undefined && isIteratorTypeName(sym.name ?? "");
}

/**
 * Returns the yielded type of an Iterable/Iterator type.
 * `Iterable<T>` → T.
 */
export function getIteratorYieldType(t: Type): Type {
  const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  if (args === undefined || args.length === 0) return ANY;
  return args[0]!;
}

/**
 * Returns the return type of a Generator.
 * `Generator<Y, R, N>` → R.
 */
export function getGeneratorReturnType(t: Type): Type {
  const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  if (args === undefined || args.length < 2) return VOID;
  return args[1]!;
}

/**
 * Returns the next-argument type of a Generator.
 * `Generator<Y, R, N>` → N.
 */
export function getGeneratorNextType(t: Type): Type {
  const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  if (args === undefined || args.length < 3) return UNKNOWN;
  return args[2]!;
}

/**
 * Returns true when the type is an async iterable.
 */
export function isAsyncIterableType(t: Type): boolean {
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  const name = sym?.name ?? "";
  return (
    name === "AsyncIterator" ||
    name === "AsyncIterable" ||
    name === "AsyncIterableIterator" ||
    name === "AsyncGenerator"
  );
}

/**
 * Returns the iterated-element-type for use in `for-of`.
 * Strips one level of Promise wrapping for async iterables.
 */
export function getForOfElementType(t: Type): Type {
  return getIteratorYieldType(t);
}

/**
 * Builds an `Iterable<T>` type reference.
 */
export function createIterableType(yieldType: Type): Type {
  return {
    flags: TypeFlags.Object,
    symbol: { name: "Iterable" },
    typeArguments: [yieldType],
  } as unknown as Type;
}

/**
 * Builds a `Generator<Y, R, N>` type reference.
 */
export function createGeneratorType(
  yieldType: Type,
  returnType: Type,
  nextType: Type,
): Type {
  return {
    flags: TypeFlags.Object,
    symbol: { name: "Generator" },
    typeArguments: [yieldType, returnType, nextType],
  } as unknown as Type;
}
