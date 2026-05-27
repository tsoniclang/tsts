/**
 * Global-type lookups — for `Array`, `Promise`, `Map`, etc.
 *
 * Ported from Strada `checker.go` — getGlobalType, getGlobalTypeOrUndefined,
 * getGlobalSymbol.
 *
 * Tsonic targets .NET, so the "global" lookup queries the Tsonic
 * type registry rather than TypeScript's lib.d.ts.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the registry-known global type with the given name.
 *
 * Conservative shell: returns a placeholder Type carrying the name.
 * The real lookup goes through the TypeRegistry (per CLAUDE.md, the
 * checker MUST use the TypeRegistry rather than TS's checker).
 */
export function getGlobalType(name: string): Type {
  return {
    flags: TypeFlags.Object,
    symbol: { name },
  } as unknown as Type;
}

/**
 * Returns the global type instantiated with type arguments.
 */
export function getGlobalTypeInstantiation(
  name: string,
  typeArguments: readonly Type[],
): Type {
  return {
    flags: TypeFlags.Object,
    symbol: { name },
    typeArguments,
  } as unknown as Type;
}

/**
 * Returns the canonical Array<T> reference.
 */
export function getArrayType(elementType: Type): Type {
  return getGlobalTypeInstantiation("Array", [elementType]);
}

/**
 * Returns the canonical Promise<T> reference.
 */
export function getPromiseType(awaitedType: Type): Type {
  return getGlobalTypeInstantiation("Promise", [awaitedType]);
}

/**
 * Returns the canonical Map<K, V> reference.
 */
export function getMapType(keyType: Type, valueType: Type): Type {
  return getGlobalTypeInstantiation("Map", [keyType, valueType]);
}

/**
 * Returns the canonical Set<T> reference.
 */
export function getSetType(elementType: Type): Type {
  return getGlobalTypeInstantiation("Set", [elementType]);
}

/**
 * Returns the canonical ReadonlyMap<K, V> reference.
 */
export function getReadonlyMapType(keyType: Type, valueType: Type): Type {
  return getGlobalTypeInstantiation("ReadonlyMap", [keyType, valueType]);
}

/**
 * Returns the canonical ReadonlySet<T> reference.
 */
export function getReadonlySetType(elementType: Type): Type {
  return getGlobalTypeInstantiation("ReadonlySet", [elementType]);
}

/**
 * Returns the canonical WeakMap<K, V> reference.
 */
export function getWeakMapType(keyType: Type, valueType: Type): Type {
  return getGlobalTypeInstantiation("WeakMap", [keyType, valueType]);
}

/**
 * Returns the canonical WeakSet<T> reference.
 */
export function getWeakSetType(elementType: Type): Type {
  return getGlobalTypeInstantiation("WeakSet", [elementType]);
}

/**
 * Returns the global symbol with the given name. Returns undefined
 * when the symbol is not in the registry.
 */
export function getGlobalSymbol(_name: string): AstSymbol | undefined {
  return undefined;
}
