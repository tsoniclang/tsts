/**
 * `Iterator` / `Iterable` resolution.
 *
 * Ported from Strada `checker.go` — getIteratorTypeOfIterable,
 * resolveIterableTo, getYieldedTypeOfGenerator.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when the type's symbol is one of the iterator/iterable
 * symbols defined by the runtime.
 */
export function isIteratorOrIterable(t: Type): boolean {
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  const name = sym?.name ?? "";
  return (
    name === "Iterator" || name === "AsyncIterator" ||
    name === "Iterable" || name === "AsyncIterable" ||
    name === "IterableIterator" || name === "AsyncIterableIterator" ||
    name === "Generator" || name === "AsyncGenerator"
  );
}

/**
 * Returns the iterator of an iterable — the result of calling
 * `[Symbol.iterator]()`.
 */
export function getIteratorFromIterable(t: Type): Type {
  if (!isIteratorOrIterable(t)) return ANY;
  const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  if (args === undefined || args.length === 0) return ANY;
  return {
    flags: TypeFlags.Object,
    symbol: { name: "Iterator" },
    typeArguments: args,
  } as unknown as Type;
}

/**
 * Returns the type of `Symbol.iterator` method's return — the
 * iterator's element type.
 */
export function getElementTypeFromIterator(t: Type): Type {
  if (!isIteratorOrIterable(t)) return ANY;
  const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  if (args === undefined || args.length === 0) return ANY;
  return args[0]!;
}

/**
 * Returns true when the type has a `Symbol.iterator` member.
 */
export function hasIteratorSymbol(t: Type): boolean {
  if (isIteratorOrIterable(t)) return true;
  const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  return members?.has("@@iterator") === true;
}

/**
 * Returns true when the type has a `Symbol.asyncIterator` member.
 */
export function hasAsyncIteratorSymbol(t: Type): boolean {
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  if (sym?.name === "AsyncIterator" || sym?.name === "AsyncIterable") return true;
  const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  return members?.has("@@asyncIterator") === true;
}
