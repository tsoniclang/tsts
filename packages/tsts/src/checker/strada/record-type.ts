/**
 * `Record<K, V>` resolution.
 *
 * Ported from Strada `checker.go` — getRecordType, expandRecordKeys.
 * A Record creates an object type with one property per key.
 */

import { SymbolFlags } from "../../ast/index.js";
import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { getLiteralValuesInUnion } from "./literal-narrowing.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns `Record<K, V>` — an object type with one property per
 * literal in K, each having type V.
 */
export function recordOf(keys: Type, valueType: Type): Type {
  const keyFlags = (keys as { flags?: number }).flags ?? 0;
  // K = string → index signature; K = number → numeric index sig.
  if ((keyFlags & TypeFlags.String) !== 0) {
    return {
      flags: TypeFlags.Object,
      symbol: { name: "__record_string", hasIndexSignature: true },
      stringIndexInfo: { keyType: keys, valueType, isReadonly: false },
    } as unknown as Type;
  }
  if ((keyFlags & TypeFlags.Number) !== 0) {
    return {
      flags: TypeFlags.Object,
      symbol: { name: "__record_number", hasIndexSignature: true },
      numberIndexInfo: { keyType: keys, valueType, isReadonly: false },
    } as unknown as Type;
  }
  // K = literal union → one property per literal.
  const literalValues = getLiteralValuesInUnion(keys);
  if (literalValues.length === 0) return ANY;
  const members = new Map<string, AstSymbol>();
  for (const v of literalValues) {
    const name = String(v);
    members.set(name, {
      flags: SymbolFlags.Property,
      name,
      type: valueType,
    } as unknown as AstSymbol);
  }
  return {
    flags: TypeFlags.Object,
    symbol: { name: "__record", members },
  } as unknown as Type;
}

/**
 * Returns true when the type is `Record<K, V>` shaped.
 */
export function isRecordType(t: Type): boolean {
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  const name = sym?.name ?? "";
  return name === "__record" || name === "__record_string" || name === "__record_number";
}

/**
 * Returns the value type of a Record — V from Record<K, V>.
 */
export function getRecordValueType(t: Type): Type | undefined {
  if (!isRecordType(t)) return undefined;
  const indexInfo = (t as unknown as { stringIndexInfo?: { valueType?: Type }; numberIndexInfo?: { valueType?: Type } });
  return indexInfo.stringIndexInfo?.valueType ?? indexInfo.numberIndexInfo?.valueType;
}
