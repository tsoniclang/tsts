/**
 * Insertion-ordered map.
 *
 * Port of TS-Go `internal/collections/ordered_map.go` (316 LoC).
 * Native JS `Map` is already insertion-ordered, but we wrap it to
 * preserve TS-Go's explicit `keys`/`mp` separation (for `entryAt`
 * by-index lookup) and to expose the same method surface.
 */

import type { int } from "@tsonic/core/types.js";
import { marshal, unmarshal, isJsonObject, type JsonValue } from "../json/index.js";

export interface MapEntry<K, V> {
  readonly key: K;
  readonly value: V;
}

export function newOrderedMapWithSizeHint<K, V>(hint: int): OrderedMap<K, V> {
  return new OrderedMap<K, V>(hint);
}

export function newOrderedMapFromList<K, V>(items: readonly MapEntry<K, V>[]): OrderedMap<K, V> {
  return OrderedMap.fromEntries(items);
}

export class OrderedMap<K, V> {
  private keys_: K[] = [];
  private mp = new Map<K, V>();

  constructor(hint?: int) {
    if (hint !== undefined && hint > 0) {
      // No native size hint in JS Map; keep API parity.
    }
  }

  static fromEntries<K, V>(items: readonly MapEntry<K, V>[]): OrderedMap<K, V> {
    const m = new OrderedMap<K, V>(items.length as int);
    for (const item of items) m.set(item.key, item.value);
    return m;
  }

  static fromPairs<K, V>(items: Iterable<readonly [K, V]>): OrderedMap<K, V> {
    const map = new OrderedMap<K, V>();
    for (const item of items) {
      map.set(item[0], item[1]);
    }
    return map;
  }

  static cloneOf<K, V>(source: OrderedMap<K, V> | undefined): OrderedMap<K, V> | undefined {
    if (source === undefined) return undefined;
    return source.clone();
  }

  set(key: K, value: V): void {
    if (!this.mp.has(key)) this.keys_.push(key);
    this.mp.set(key, value);
  }

  get(key: K): { value: V; ok: boolean } {
    const v = this.mp.get(key);
    if (v === undefined && !this.mp.has(key)) {
      return { value: undefined as unknown as V, ok: false };
    }
    return { value: v as V, ok: true };
  }

  getOrZero(key: K): V {
    return this.mp.get(key) as V;
  }

  getOrSet(key: K, createValue: () => V): V {
    const existing = this.get(key);
    if (existing.ok) return existing.value;
    const value = createValue();
    this.set(key, value);
    return value;
  }

  entryAt(index: int): { key: K; value: V; ok: boolean } {
    if (index < 0 || index >= this.keys_.length) {
      return { key: undefined as unknown as K, value: undefined as unknown as V, ok: false };
    }
    const k = this.keys_[index]!;
    return { key: k, value: this.mp.get(k) as V, ok: true };
  }

  has(key: K): boolean {
    return this.mp.has(key);
  }

  delete(key: K): { value: V; ok: boolean } {
    const v = this.mp.get(key);
    if (v === undefined && !this.mp.has(key)) {
      return { value: undefined as unknown as V, ok: false };
    }
    this.mp.delete(key);
    const i = this.keys_.indexOf(key);
    if (i === 0) this.keys_.shift();
    else if (i === this.keys_.length - 1) this.keys_.pop();
    else this.keys_.splice(i, 1);
    return { value: v as V, ok: true };
  }

  *keys(): IterableIterator<K> {
    // Iterate using index so new items added during iteration are visible.
    for (let i = 0; i < this.keys_.length; i++) yield this.keys_[i]!;
  }

  keysArray(): readonly K[] {
    return this.keys_.slice();
  }

  *values(): IterableIterator<V> {
    for (let i = 0; i < this.keys_.length; i++) yield this.mp.get(this.keys_[i]!) as V;
  }

  valuesArray(): readonly V[] {
    const result: V[] = [];
    for (const value of this.values()) result.push(value);
    return result;
  }

  *entries(): IterableIterator<readonly [K, V]> {
    for (let i = 0; i < this.keys_.length; i++) {
      const k = this.keys_[i]!;
      yield [k, this.mp.get(k) as V];
    }
  }

  entriesArray(): readonly MapEntry<K, V>[] {
    const result: MapEntry<K, V>[] = [];
    for (const [key, value] of this.entries()) {
      result.push({ key, value });
    }
    return result;
  }

  [Symbol.iterator](): IterableIterator<readonly [K, V]> {
    return this.entries();
  }

  forEach(callback: (value: V, key: K) => void): void {
    for (const [key, value] of this.entries()) {
      callback(value, key);
    }
  }

  clear(): void {
    this.keys_ = [];
    this.mp.clear();
  }

  get size(): int {
    return this.keys_.length as int;
  }

  clone(): OrderedMap<K, V> {
    const m = new OrderedMap<K, V>();
    m.keys_ = this.keys_.slice();
    m.mp = new Map(this.mp);
    return m;
  }

  assignFrom(source: OrderedMap<K, V>): void {
    this.clear();
    for (const [key, value] of source.entries()) {
      this.set(key, value);
    }
  }

  toJsonValue(valueToJson: (value: V) => JsonValue): JsonValue {
    const result: { [key: string]: JsonValue } = {};
    for (const key of this.keys_) {
      result[resolveKeyName(key)] = valueToJson(this.mp.get(key) as V);
    }
    return result;
  }

  toJsonString(valueToJson: (value: V) => JsonValue): string {
    return marshal(this.toJsonValue(valueToJson));
  }

  static fromJsonObject<V>(
    value: JsonValue,
    valueFromJson: (value: JsonValue) => V,
  ): OrderedMap<string, V> {
    if (value === null) return new OrderedMap<string, V>();
    if (!isJsonObject(value)) {
      throw new Error("cannot unmarshal non-object JSON value into OrderedMap");
    }
    const map = new OrderedMap<string, V>();
    for (const key of Object.keys(value)) {
      map.set(key, valueFromJson(value[key]!));
    }
    return map;
  }

  static fromJsonString<V>(
    text: string,
    valueFromJson: (value: JsonValue) => V,
  ): OrderedMap<string, V> {
    return OrderedMap.fromJsonObject(unmarshal(text), valueFromJson);
  }

  replaceFromJsonObject(
    value: JsonValue,
    keyFromJson: (key: string) => K,
    valueFromJson: (value: JsonValue) => V,
  ): void {
    if (value === null) return;
    if (!isJsonObject(value)) {
      throw new Error("cannot unmarshal non-object JSON value into OrderedMap");
    }
    this.clear();
    for (const key of Object.keys(value)) {
      this.set(keyFromJson(key), valueFromJson(value[key]!));
    }
  }

  replaceFromJsonString(
    text: string,
    keyFromJson: (key: string) => K,
    valueFromJson: (value: JsonValue) => V,
  ): void {
    this.replaceFromJsonObject(unmarshal(text), keyFromJson, valueFromJson);
  }
}

function resolveKeyName(key: unknown): string {
  if (typeof key === "string") return key;
  if (typeof key === "number" && Number.isFinite(key)) return String(Math.trunc(key));
  if (typeof key === "bigint") return key.toString();
  if (key === null || key === undefined) return "";
  const textMarshaler = key as { marshalText?: () => string; toString?: () => string };
  if (typeof textMarshaler.marshalText === "function") return textMarshaler.marshalText();
  if (typeof textMarshaler.toString === "function" && textMarshaler.toString !== Object.prototype.toString) {
    return textMarshaler.toString();
  }
  throw new Error("unexpected map key type");
}

// ---------------------------------------------------------------------------
// Diff helpers
// ---------------------------------------------------------------------------

export function diffOrderedMaps<K, V>(
  m1: OrderedMap<K, V>,
  m2: OrderedMap<K, V>,
  onAdded: (k: K, v: V) => void,
  onRemoved: (k: K, v: V) => void,
  onModified: (k: K, oldValue: V, newValue: V) => void,
): void {
  diffOrderedMapsFunc(m1, m2, (a, b) => a === b, onAdded, onRemoved, onModified);
}

export function diffOrderedMapsFunc<K, V>(
  m1: OrderedMap<K, V>,
  m2: OrderedMap<K, V>,
  equalValues: (a: V, b: V) => boolean,
  onAdded: (k: K, v: V) => void,
  onRemoved: (k: K, v: V) => void,
  onModified: (k: K, oldValue: V, newValue: V) => void,
): void {
  for (const [k, v2] of m2.entries()) {
    if (!m1.has(k)) onAdded(k, v2);
  }
  for (const [k, v1] of m1.entries()) {
    const r = m2.get(k);
    if (r.ok) {
      if (!equalValues(v1, r.value)) onModified(k, v1, r.value);
    } else {
      onRemoved(k, v1);
    }
  }
}
