import { FACADE_POINTER_METHOD_SET_SYMBOL } from "../pointer-method-facades.mjs";
import { channelRuntime } from "./compatibility/channels.mjs";
import { comparableInterfaceRuntime } from "./compatibility/comparable-interfaces.mjs";

export function renderGoCompatModule() {
  const pointerMethodSetSymbol = FACADE_POINTER_METHOD_SET_SYMBOL;
  return `import type { bool, int } from "./scalars.js";

declare global {
  const ${pointerMethodSetSymbol}: unique symbol;
}

declare const __goBrand: unique symbol;
declare const __goDefinedTypeBrand: unique symbol;
const goRefStorage: unique symbol = Symbol("GoRef.storage");

export type GoNilable<T> = T | undefined;
export type GoDefined<T, Identity extends string> = T extends undefined
  ? T
  : T & { readonly [__goDefinedTypeBrand]?: Identity };
export type GoPointerMethodSet<Methods extends object> = Methods;
type GoPointerMethods<T> = typeof ${pointerMethodSetSymbol} extends keyof T
  ? T extends { readonly [${pointerMethodSetSymbol}]?: infer Methods }
    ? NonNullable<Methods>
    : unknown
  : unknown;
export type GoPtr<T> = GoNilable<T & GoPointerMethods<T>>;
export type GoRef<T> = GoNilable<{ v: T; readonly [goRefStorage]: true } & GoPointerMethods<T>>;
export type GoPointerConstraint<T> = GoPtr<T> | GoRef<T>;
export type GoSlice<T> = T[];
export type GoArray<T, Length extends string> = T[] & { readonly [__goBrand]?: { readonly length: Length } };
export type GoMap<K, V> = Map<K, V>;
export type GoChan<T, Direction extends string = "bidirectional"> = {
  readonly [__goBrand]?: { readonly element: T; readonly direction: Direction };
  readonly [goChannelState]?: GoChannelState<T>;
};
export type GoFunc<F> = GoNilable<F>;
export type GoInterface<I> = GoNilable<I>;
export type GoError = GoInterface<Error>;
export type GoComparable = unknown;
export type GoOrdered = string | number | bigint | bool;
export type GoConstraint<Text extends string> = unknown;
export type GoUnsupported<Text extends string> = { readonly [__goBrand]: { readonly unsupported: Text } };
export type GoComplex64 = { readonly real: number; readonly imag: number };
export type GoComplex128 = { readonly real: number; readonly imag: number };
declare const goUnsafePointerBrand: unique symbol;
export type GoUnsafePointer = GoNilable<{ readonly [goUnsafePointerBrand]: never }>;
export type GoRune = int;
export type GoZeroFactory<T> = () => T;
export type GoCopy<T> = (value: T) => T;
export interface GoValueOps<T> {
  readonly zero: GoZeroFactory<T>;
  readonly copy: GoCopy<T>;
}
export type GoEquality<T> = (left: T, right: T) => bool;

export function GoEqualStrict<T extends GoComparable>(left: T, right: T): bool {
  return left === right;
}

export function GoEqualEmptyStruct(_left: { readonly __tsgoEmpty?: never }, _right: { readonly __tsgoEmpty?: never }): bool {
  return true;
}

export function GoZeroBoolean(): bool {
  return false;
}

export function GoZeroNumber(): number {
  return 0;
}

export function GoZeroBigInt(): bigint {
  return 0n;
}

export function GoZeroString(): string {
  return "";
}

export function GoZeroPointer<T>(): GoPtr<T> {
  return undefined;
}

export function GoZeroRef<T>(): GoRef<T> {
  return undefined;
}

export function GoZeroFunction<F>(): GoFunc<F> {
  return undefined;
}

export function GoZeroInterface<I>(): GoInterface<I> {
  return undefined;
}

export function GoZeroComparableInterface<T>(): GoComparableInterface<T> {
  return undefined;
}

export function GoZeroSlice<T>(): GoSlice<T> {
  return GoNilSlice();
}

export function GoZeroMap<K, V>(): GoMap<K, V> {
  return GoNilMap();
}

export function GoZeroChannel<T, Direction extends string = "bidirectional">(): GoChan<T, Direction> {
  return GoNilChan();
}

export function GoZeroEmptyStruct(): { readonly __tsgoEmpty?: never } {
  return {};
}

export function GoValueRef<T>(value: T): NonNullable<GoRef<T>> {
  return { v: value, [goRefStorage]: true } as NonNullable<GoRef<T>>;
}

export function GoSliceElementRef<T>(slice: GoSlice<T>, index: int): NonNullable<GoRef<T>> {
  if (!Number.isSafeInteger(index) || index < 0 || index >= slice.length) {
    throw new RangeError("index out of range");
  }
  return {
    [goRefStorage]: true,
    get v(): T { return slice[index]!; },
    set v(value: T) { slice[index] = value; },
  } as NonNullable<GoRef<T>>;
}

export function GoFieldRef<T>(read: () => T, write: (value: T) => void): NonNullable<GoRef<T>> {
  return {
    [goRefStorage]: true,
    get v(): T { return read(); },
    set v(value: T) { write(value); },
  } as NonNullable<GoRef<T>>;
}

export function GoIsRef(value: unknown): value is NonNullable<GoRef<unknown>> {
  return typeof value === "object" && value !== null && (value as { readonly [goRefStorage]?: unknown })[goRefStorage] === true;
}

export function GoRequireNonNilAfterSuccess<T>(value: GoPtr<T>, operation: string): T {
  if (value === undefined) {
    throw new TypeError(\`\${operation} returned nil after success\`);
  }
  return value;
}

const goNilSlice: readonly unknown[] = Object.freeze([]);

export function GoNilSlice<T>(): GoSlice<T> {
  return goNilSlice as GoSlice<T>;
}

export function GoSliceIsNil<T>(slice: GoSlice<T>): bool {
  return (slice === goNilSlice) as bool;
}

export function GoSliceToZeroLength<T>(slice: GoSlice<T>): GoSlice<T> {
  if (GoSliceIsNil(slice)) {
    return slice;
  }
  return [];
}

const goNilMap: Map<unknown, unknown> = new class extends Map<unknown, unknown> {
  override clear(): void {}
  override delete(_key: unknown): boolean { return false; }
  override set(_key: unknown, _value: unknown): this { throw new Error("assignment to entry in nil map"); }
}();

export function GoNilMap<K, V>(): GoMap<K, V> {
  return goNilMap as GoMap<K, V>;
}

export function GoMapIsNil<K, V>(map: GoMap<K, V>): bool {
  return (map === goNilMap) as bool;
}

export interface GoInterfaceValue<T> {
  __tsgoGoReceiver(): GoPtr<T>;
}

${channelRuntime}

export interface GoMapKeyDescriptor<K> {
  readonly identity: symbol;
  appendHashParts(parts: unknown[], value: K): void;
  snapshot(value: K): K;
  makeMap<V>(): GoMap<K, V>;
}

export interface GoStructKeyField<K, V> {
  appendHashParts(parts: unknown[], value: K): void;
  snapshot(value: K): V;
}

export interface GoDynamicComparable<T = unknown> {
  readonly typeIdentity: symbol;
  readonly value: T;
  appendHashParts(parts: unknown[]): void;
  snapshot(): GoDynamicComparable<T>;
}

export type GoComparableInterface<T = unknown> = GoDynamicComparable<T> | undefined;

const goNilPointerKey = Symbol("GoKey.nilPointer");
const goNilInterfaceKey = Symbol("GoKey.nilInterface");

function createGoMapKeyDescriptor<K>(
  appendHashParts: (parts: unknown[], value: K) => void,
  snapshot: (value: K) => K,
  makeMap: <V>(descriptor: GoMapKeyDescriptor<K>) => GoMap<K, V>,
): GoMapKeyDescriptor<K> {
  const descriptor: GoMapKeyDescriptor<K> = {
    identity: Symbol("GoKey.type"),
    appendHashParts,
    snapshot,
    makeMap<V>(): GoMap<K, V> {
      return makeMap<V>(descriptor);
    },
  };
  return globalThis.Object.freeze(descriptor);
}

function newNativeGoMap<K, V>(_descriptor: GoMapKeyDescriptor<K>): GoMap<K, V> {
  return new globalThis.Map<K, V>();
}

function newNumberGoMap<K extends number, V>(_descriptor: GoMapKeyDescriptor<K>): GoMap<K, V> {
  return new GoNumberMap<K, V>();
}

function newStructuredGoMap<K, V>(descriptor: GoMapKeyDescriptor<K>): GoMap<K, V> {
  return new GoStructMap<K, V>(descriptor);
}

function appendGoMapKey<K>(parts: unknown[], descriptor: GoMapKeyDescriptor<K>, value: K): void {
  parts.push(descriptor.identity);
  descriptor.appendHashParts(parts, value);
}

function requireGoKeyType(value: unknown, expected: string): void {
  if (typeof value !== expected) throw new TypeError("Go map key descriptor expected " + expected + ", got " + typeof value);
}

export const GoBooleanKey: GoMapKeyDescriptor<boolean> = createGoMapKeyDescriptor<boolean>((parts, value) => {
  requireGoKeyType(value, "boolean");
  parts.push(value);
}, (value) => {
  requireGoKeyType(value, "boolean");
  return value;
}, newNativeGoMap);

export const GoNumberKey: GoMapKeyDescriptor<number> = createGoMapKeyDescriptor<number>((parts, value) => {
  requireGoKeyType(value, "number");
  parts.push(Number.isNaN(value) ? Symbol("GoKey.NaN") : value);
}, (value) => {
  requireGoKeyType(value, "number");
  return value;
}, newNumberGoMap);

export const GoBigIntKey: GoMapKeyDescriptor<bigint> = createGoMapKeyDescriptor<bigint>((parts, value) => {
  requireGoKeyType(value, "bigint");
  parts.push(value);
}, (value) => {
  requireGoKeyType(value, "bigint");
  return value;
}, newNativeGoMap);

export const GoStringKey: GoMapKeyDescriptor<string> = createGoMapKeyDescriptor<string>((parts, value) => {
  requireGoKeyType(value, "string");
  parts.push(value);
}, (value) => {
  requireGoKeyType(value, "string");
  return value;
}, newNativeGoMap);

export function GoPointerKey<T extends object>(): GoMapKeyDescriptor<GoPtr<T>> {
  const exact = (value: GoPtr<T>): GoPtr<T> => {
    if (value === undefined) return undefined;
    if ((typeof value !== "object" || value === null) && typeof value !== "function") {
      throw new TypeError("Go pointer map key must retain object identity");
    }
    return value;
  };
  return createGoMapKeyDescriptor<GoPtr<T>>((parts, value) => {
    if (exact(value) === undefined) {
      parts.push(goNilPointerKey);
      return;
    }
    parts.push(value);
  }, exact, newNativeGoMap);
}

export function GoArrayKey<T>(length: number, element: GoMapKeyDescriptor<T>): GoMapKeyDescriptor<readonly T[]> {
  if (!Number.isSafeInteger(length) || length < 0) throw new RangeError("Go array key length must be a non-negative safe integer");
  const requireArray = (value: readonly T[]): void => {
    if (!globalThis.Array.isArray(value) || value.length !== length) {
      throw new TypeError("Go array map key expected length " + length);
    }
  };
  return createGoMapKeyDescriptor<readonly T[]>((parts, value) => {
    requireArray(value);
    for (const item of value) appendGoMapKey(parts, element, item);
  }, (value) => {
    requireArray(value);
    return value.map((item) => element.snapshot(item));
  }, newStructuredGoMap);
}

export function GoStructField<K, V>(read: (value: K) => V, descriptor: GoMapKeyDescriptor<V>): GoStructKeyField<K, V> {
  return {
    appendHashParts: (parts, value) => appendGoMapKey(parts, descriptor, read(value)),
    snapshot: (value) => descriptor.snapshot(read(value)),
  };
}

export function GoStructKey<K, const Values extends readonly unknown[]>(
  fields: { readonly [Index in keyof Values]: GoStructKeyField<K, Values[Index]> },
  construct: (values: Values, source: K) => K,
): GoMapKeyDescriptor<K> {
  return createGoMapKeyDescriptor<K>((parts, value) => {
    if (typeof value !== "object" || value === null) throw new TypeError("Go struct map key must be an object value");
    for (const field of fields) field.appendHashParts(parts, value);
  }, (value) => {
    if (typeof value !== "object" || value === null) throw new TypeError("Go struct map key must be an object value");
    const snapshots = fields.map((field) => field.snapshot(value)) as unknown as Values;
    return construct(snapshots, value);
  }, newStructuredGoMap);
}

export function GoNamedStringKey<K extends string>(): GoMapKeyDescriptor<K> {
  return createGoMapKeyDescriptor<K>((parts, value) => {
    requireGoKeyType(value, "string");
    parts.push(value);
  }, (value) => {
    requireGoKeyType(value, "string");
    return value;
  }, newNativeGoMap);
}

export function GoNamedNumberKey<K extends number>(): GoMapKeyDescriptor<K> {
  return createGoMapKeyDescriptor<K>((parts, value) => {
    requireGoKeyType(value, "number");
    parts.push(Number.isNaN(value) ? Symbol("GoKey.NaN") : value);
  }, (value) => {
    requireGoKeyType(value, "number");
    return value;
  }, newNumberGoMap);
}

${comparableInterfaceRuntime}

interface GoNumberMapEntry<K extends number, V> {
  readonly key: K;
  value: V;
  active: boolean;
}

export class GoNumberMap<K extends number = number, V = unknown> implements Map<K, V> {
  readonly [Symbol.toStringTag] = "Map";
  private readonly indexedEntries = new globalThis.Map<number, GoNumberMapEntry<K, V>>();
  private readonly orderedEntries: Array<GoNumberMapEntry<K, V>> = [];
  private activeSize = 0;

  get size(): number { return this.activeSize; }

  clear(): void {
    this.indexedEntries.clear();
    this.orderedEntries.length = 0;
    this.activeSize = 0;
  }

  delete(key: K): boolean {
    requireGoKeyType(key, "number");
    if (Number.isNaN(key)) return false;
    const entry = this.indexedEntries.get(key);
    if (entry === undefined) return false;
    entry.active = false;
    this.indexedEntries.delete(key);
    this.activeSize--;
    return true;
  }

  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: unknown): void {
    for (const entry of this.orderedEntries) if (entry.active) callbackfn.call(thisArg, entry.value, entry.key, this);
  }

  get(key: K): V | undefined {
    requireGoKeyType(key, "number");
    return Number.isNaN(key) ? undefined : this.indexedEntries.get(key)?.value;
  }

  has(key: K): boolean {
    requireGoKeyType(key, "number");
    return !Number.isNaN(key) && this.indexedEntries.has(key);
  }

  set(key: K, value: V): this {
    requireGoKeyType(key, "number");
    if (!Number.isNaN(key)) {
      const existing = this.indexedEntries.get(key);
      if (existing !== undefined) {
        existing.value = value;
        return this;
      }
    }
    const entry: GoNumberMapEntry<K, V> = { key, value, active: true };
    if (!Number.isNaN(key)) this.indexedEntries.set(key, entry);
    this.orderedEntries.push(entry);
    this.activeSize++;
    return this;
  }

  *entries(): MapIterator<[K, V]> {
    for (const entry of this.orderedEntries) if (entry.active) yield [entry.key, entry.value];
  }

  *keys(): MapIterator<K> {
    for (const entry of this.orderedEntries) if (entry.active) yield entry.key;
  }

  *values(): MapIterator<V> {
    for (const entry of this.orderedEntries) if (entry.active) yield entry.value;
  }

  [Symbol.iterator](): MapIterator<[K, V]> { return this.entries(); }
}

interface GoStructMapEntry<K, V> {
  readonly key: K;
  value: V;
  active: boolean;
}

interface GoStructMapTrieNode<K, V> {
  readonly children: Map<unknown, GoStructMapTrieNode<K, V>>;
  entry?: GoStructMapEntry<K, V>;
}

function newGoStructMapTrieNode<K, V>(): GoStructMapTrieNode<K, V> {
  return { children: new globalThis.Map() };
}

export class GoStructMap<K, V> implements Map<K, V> {
  readonly [Symbol.toStringTag] = "Map";
  private root = newGoStructMapTrieNode<K, V>();
  private readonly orderedEntries: Array<GoStructMapEntry<K, V>> = [];
  private activeSize = 0;

  constructor(private readonly keyDescriptor: GoMapKeyDescriptor<K>) {}

  get size(): number { return this.activeSize; }

  clear(): void {
    this.root = newGoStructMapTrieNode<K, V>();
    this.orderedEntries.length = 0;
    this.activeSize = 0;
  }

  delete(key: K): boolean {
    const entry = this.findEntry(key);
    if (entry === undefined) return false;
    entry.active = false;
    delete this.leafForHashParts(this.hashParts(key), false)!.entry;
    this.activeSize--;
    return true;
  }

  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: unknown): void {
    for (const entry of this.orderedEntries) if (entry.active) callbackfn.call(thisArg, entry.value, entry.key, this);
  }

  get(key: K): V | undefined { return this.findEntry(key)?.value; }

  getOrInsert(key: K, value: V): V {
    const existing = this.findEntry(key);
    if (existing !== undefined) return existing.value;
    this.insert(key, value);
    return value;
  }

  getOrInsertComputed(key: K, callbackfn: (key: K) => V): V {
    const existing = this.findEntry(key);
    if (existing !== undefined) return existing.value;
    const value = callbackfn(key);
    this.insert(key, value);
    return value;
  }

  has(key: K): boolean { return this.findEntry(key) !== undefined; }

  set(key: K, value: V): this {
    const existing = this.findEntry(key);
    if (existing !== undefined) existing.value = value;
    else this.insert(key, value);
    return this;
  }

  load(key: K): [V | undefined, boolean] {
    const entry = this.findEntry(key);
    return entry === undefined ? [undefined, false] : [entry.value, true];
  }

  lookup(key: K): { value: V } | undefined {
    const entry = this.findEntry(key);
    return entry === undefined ? undefined : { value: entry.value };
  }

  loadOrStore(key: K, value: V): [V, boolean] {
    const existing = this.findEntry(key);
    if (existing !== undefined) return [existing.value, true];
    this.insert(key, value);
    return [value, false];
  }

  loadAndDelete(key: K): [V | undefined, boolean] {
    const entry = this.findEntry(key);
    if (entry === undefined) return [undefined, false];
    const value = entry.value;
    this.delete(key);
    return [value, true];
  }

  *entries(): MapIterator<[K, V]> { for (const entry of this.orderedEntries) if (entry.active) yield [entry.key, entry.value]; }
  *keys(): MapIterator<K> { for (const entry of this.orderedEntries) if (entry.active) yield entry.key; }
  *values(): MapIterator<V> { for (const entry of this.orderedEntries) if (entry.active) yield entry.value; }
  [Symbol.iterator](): MapIterator<[K, V]> { return this.entries(); }

  private findEntry(key: K): GoStructMapEntry<K, V> | undefined {
    return this.leafForHashParts(this.hashParts(key), false)?.entry;
  }

  private insert(key: K, value: V): void {
    const keySnapshot = this.keyDescriptor.snapshot(key);
    const entry = { key: keySnapshot, value, active: true };
    this.leafForHashParts(this.hashParts(keySnapshot), true)!.entry = entry;
    this.orderedEntries.push(entry);
    this.activeSize++;
  }

  private hashParts(key: K): unknown[] {
    const parts: unknown[] = [];
    appendGoMapKey(parts, this.keyDescriptor, key);
    return parts;
  }

  private leafForHashParts(parts: readonly unknown[], create: boolean): GoStructMapTrieNode<K, V> | undefined {
    let node = this.root;
    for (const part of parts) {
      let child = node.children.get(part);
      if (child === undefined) {
        if (!create) return undefined;
        child = newGoStructMapTrieNode<K, V>();
        node.children.set(part, child);
      }
      node = child;
    }
    return node;
  }
}

export function NewGoStructMap<K, V>(keyDescriptor: GoMapKeyDescriptor<K>): GoStructMap<K, V> {
  return new GoStructMap<K, V>(keyDescriptor);
}

export function GoMapMake<K, V>(keyDescriptor: GoMapKeyDescriptor<K>): GoMap<K, V> {
  return keyDescriptor.makeMap<V>();
}

export function GoMapClone<K, V>(map: GoMap<K, V>, keyDescriptor: GoMapKeyDescriptor<K>): GoMap<K, V> {
  if (GoMapIsNil(map)) return GoNilMap();
  const clone = GoMapMake<K, V>(keyDescriptor);
  for (const [key, value] of map) clone.set(key, value);
  return clone;
}

export function GoMapGetExisting<K, V>(map: NonNullable<GoMap<K, V>>, key: K): V {
  if (map.has(key)) return map.get(key)!;
  throw new TypeError("map key lookup is inconsistent with its entries");
}

export function GoMapLookup<K, V>(map: GoMap<K, V>, key: K, zeroValue: GoZeroFactory<V>): [V, bool] {
  if (!map.has(key)) {
    return [zeroValue(), false];
  }
  return [GoMapGetExisting(map, key), true];
}

export function GoAppend<T>(slice: GoSlice<T>, ...items: T[]): NonNullable<GoSlice<T>> {
  return GoAppendSlice(slice, items);
}

export function GoAppendSlice<T>(slice: GoSlice<T>, items: GoSlice<T>): NonNullable<GoSlice<T>> {
  if (items.length === 0) return slice;
  const result = new Array<T>(slice.length + items.length);
  for (let index = 0; index < slice.length; index++) result[index] = slice[index]!;
  for (let index = 0; index < items.length; index++) result[slice.length + index] = items[index]!;
  return result;
}

`;
}
