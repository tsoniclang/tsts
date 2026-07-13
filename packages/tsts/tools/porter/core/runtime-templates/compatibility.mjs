import { FACADE_POINTER_METHOD_SET_SYMBOL } from "../pointer-method-facades.mjs";
import { channelRuntime } from "./compatibility/channels.mjs";

export function renderGoCompatModule() {
  const pointerMethodSetSymbol = FACADE_POINTER_METHOD_SET_SYMBOL;
  return `import type { bool, int } from "./scalars.js";

declare global {
  const ${pointerMethodSetSymbol}: unique symbol;
}

declare const __goBrand: unique symbol;

export const goReceiverKey: unique symbol = Symbol("GoInterface.receiver");
const goInterfaceTypeKey: unique symbol = Symbol("GoInterface.type");

export type GoNilable<T> = T | undefined;
export type GoPointerMethodSet<Methods extends object> = Methods;
type GoPointerMethods<T> = typeof ${pointerMethodSetSymbol} extends keyof T
  ? T extends { readonly [${pointerMethodSetSymbol}]?: infer Methods }
    ? NonNullable<Methods>
    : unknown
  : unknown;
export type GoPtr<T> = GoNilable<T & GoPointerMethods<T>>;
export type GoRef<T> = GoNilable<{ v: T } & GoPointerMethods<T>>;
export type GoSlice<T> = T[];
export type GoArray<T, Length extends string> = T[] & { readonly [__goBrand]?: { readonly length: Length } };
export type GoMap<K, V> = Map<K, V>;
export type GoChan<T, Direction extends string = "bidirectional"> = {
  readonly [__goBrand]?: { readonly element: T; readonly direction: Direction };
  readonly [goChannelState]?: GoChannelState<T>;
};
export type GoFunc<F> = GoNilable<F>;
export type GoInterface<I> = GoNilable<I>;
export type GoSeq<T> = GoFunc<(yieldValue: (value: T) => bool) => void>;
export type GoSeq2<K, V> = GoFunc<(yieldValue: (key: K, value: V) => bool) => void>;
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

export function GoValueRef<T>(value: T): NonNullable<GoRef<T>> {
  return { v: value } as NonNullable<GoRef<T>>;
}

export function GoSliceElementRef<T>(slice: GoSlice<T>, index: int): NonNullable<GoRef<T>> {
  if (!Number.isSafeInteger(index) || index < 0 || index >= slice.length) {
    throw new RangeError("index out of range");
  }
  return {
    get v(): T { return slice[index]!; },
    set v(value: T) { slice[index] = value; },
  } as NonNullable<GoRef<T>>;
}

export function GoRequireNonNilAfterSuccess<T>(value: GoPtr<T>, operation: string): T {
  if (value === undefined) {
    throw new TypeError(\`\${operation} returned nil after success\`);
  }
  return value;
}

const goNilSlices = new WeakSet<readonly unknown[]>();

export function GoNilSlice<T>(): GoSlice<T> {
  const slice: T[] = [];
  goNilSlices.add(slice);
  return slice;
}

export function GoSliceIsNil<T>(slice: GoSlice<T>): bool {
  return goNilSlices.has(slice) as bool;
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

export interface GoInterfaceType<T> {
  readonly name: string;
  readonly identity: symbol;
  readonly __receiverType?: (receiver: T) => T;
}

export type GoInterfaceValue<T> = {
  readonly [goReceiverKey]?: GoPtr<T>;
  readonly [goInterfaceTypeKey]?: GoInterfaceType<T>;
};

export function NewGoInterfaceType<T>(name: string): GoInterfaceType<T> {
  if (name.length === 0) {
    throw new Error("Go interface concrete type name must not be empty");
  }
  return Object.freeze({ name, identity: Symbol(name) });
}

export function GoInterfaceAdapter<T, I extends object>(type: GoInterfaceType<T>, receiver: GoPtr<T>, adapter: I): I & GoInterfaceValue<T> {
  globalThis.Object.defineProperties(adapter, {
    [goReceiverKey]: { value: receiver },
    [goInterfaceTypeKey]: { value: type },
  });
  return adapter;
}

export function GoInterfaceTryAssert<T>(value: unknown, type: GoInterfaceType<T>): [GoPtr<T>, bool] {
  if (!isGoInterfaceObject(value) || value[goInterfaceTypeKey] !== type) {
    return [undefined, false as bool];
  }
  return [value[goReceiverKey] as GoPtr<T>, true as bool];
}

export function GoInterfaceAssert<T>(value: unknown, type: GoInterfaceType<T>): GoPtr<T> {
  const [receiver, ok] = GoInterfaceTryAssert(value, type);
  if (!ok) {
    throw new TypeError("Go interface conversion: value does not contain " + type.name);
  }
  return receiver;
}

function isGoInterfaceObject(value: unknown): value is GoInterfaceValue<unknown> {
  return (typeof value === "object" && value !== null) || typeof value === "function";
}

${channelRuntime}

export interface GoMapKeyDescriptor<K> {
  readonly identity: symbol;
  appendHashParts(parts: unknown[], value: K): void;
  snapshot(value: K): K;
}

export interface GoStructKeyField<K, V> {
  appendHashParts(parts: unknown[], value: K): void;
  snapshot(value: K): V;
}

export interface GoDynamicComparable<T = unknown> {
  readonly descriptor: GoMapKeyDescriptor<T>;
  readonly value: T;
}

const goNilPointerKey = Symbol("GoKey.nilPointer");
const goNilInterfaceKey = Symbol("GoKey.nilInterface");

function createGoMapKeyDescriptor<K>(
  appendHashParts: (parts: unknown[], value: K) => void,
  snapshot: (value: K) => K,
): GoMapKeyDescriptor<K> {
  return globalThis.Object.freeze({ identity: Symbol("GoKey.type"), appendHashParts, snapshot });
}

function appendGoMapKey<K>(parts: unknown[], descriptor: GoMapKeyDescriptor<K>, value: K): void {
  parts.push(descriptor.identity);
  descriptor.appendHashParts(parts, value);
}

function requireGoKeyType(value: unknown, expected: string): void {
  if (typeof value !== expected) throw new TypeError("Go map key descriptor expected " + expected + ", got " + typeof value);
}

export const GoBooleanKey: GoMapKeyDescriptor<boolean> = createGoMapKeyDescriptor((parts, value) => {
  requireGoKeyType(value, "boolean");
  parts.push(value);
}, (value) => {
  requireGoKeyType(value, "boolean");
  return value;
});

export const GoNumberKey: GoMapKeyDescriptor<number> = createGoMapKeyDescriptor((parts, value) => {
  requireGoKeyType(value, "number");
  parts.push(Number.isNaN(value) ? Symbol("GoKey.NaN") : value);
}, (value) => {
  requireGoKeyType(value, "number");
  return value;
});

export const GoBigIntKey: GoMapKeyDescriptor<bigint> = createGoMapKeyDescriptor((parts, value) => {
  requireGoKeyType(value, "bigint");
  parts.push(value);
}, (value) => {
  requireGoKeyType(value, "bigint");
  return value;
});

export const GoStringKey: GoMapKeyDescriptor<string> = createGoMapKeyDescriptor((parts, value) => {
  requireGoKeyType(value, "string");
  parts.push(value);
}, (value) => {
  requireGoKeyType(value, "string");
  return value;
});

export function GoPointerKey<T extends object>(): GoMapKeyDescriptor<GoPtr<T>> {
  const exact = (value: GoPtr<T>): GoPtr<T> => {
    if (value === undefined) return undefined;
    if ((typeof value !== "object" || value === null) && typeof value !== "function") {
      throw new TypeError("Go pointer map key must retain object identity");
    }
    return value;
  };
  return createGoMapKeyDescriptor((parts, value) => {
    if (exact(value) === undefined) {
      parts.push(goNilPointerKey);
      return;
    }
    parts.push(value);
  }, exact);
}

export function GoArrayKey<T>(length: number, element: GoMapKeyDescriptor<T>): GoMapKeyDescriptor<readonly T[]> {
  if (!Number.isSafeInteger(length) || length < 0) throw new RangeError("Go array key length must be a non-negative safe integer");
  const requireArray = (value: readonly T[]): void => {
    if (!globalThis.Array.isArray(value) || value.length !== length) {
      throw new TypeError("Go array map key expected length " + length);
    }
  };
  return createGoMapKeyDescriptor((parts, value) => {
    requireArray(value);
    for (const item of value) appendGoMapKey(parts, element, item);
  }, (value) => {
    requireArray(value);
    return value.map((item) => element.snapshot(item));
  });
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
  return createGoMapKeyDescriptor((parts, value) => {
    if (typeof value !== "object" || value === null) throw new TypeError("Go struct map key must be an object value");
    for (const field of fields) field.appendHashParts(parts, value);
  }, (value) => {
    if (typeof value !== "object" || value === null) throw new TypeError("Go struct map key must be an object value");
    const snapshots = fields.map((field) => field.snapshot(value)) as unknown as Values;
    return construct(snapshots, value);
  });
}

export function GoNamedKey<K>(underlying: GoMapKeyDescriptor<K>): GoMapKeyDescriptor<K> {
  return createGoMapKeyDescriptor(
    (parts, value) => appendGoMapKey(parts, underlying, value),
    (value) => underlying.snapshot(value),
  );
}

export function GoDynamicValue<T>(descriptor: GoMapKeyDescriptor<T>, value: T): GoDynamicComparable<T> {
  return { descriptor, value };
}

export function GoInterfaceKey<K>(
  dynamic: (value: K) => GoDynamicComparable | undefined,
  construct: (dynamic: GoDynamicComparable | undefined) => K,
): GoMapKeyDescriptor<K> {
  return createGoMapKeyDescriptor((parts, value) => {
    const selected = dynamic(value);
    if (selected === undefined) {
      parts.push(goNilInterfaceKey);
      return;
    }
    appendGoMapKey(parts, selected.descriptor, selected.value);
  }, (value) => {
    const selected = dynamic(value);
    return selected === undefined
      ? construct(undefined)
      : construct(GoDynamicValue(selected.descriptor, selected.descriptor.snapshot(selected.value)));
  });
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

export function GoMapGetExisting<K, V>(map: NonNullable<GoMap<K, V>>, key: K): V {
  if (map instanceof GoStructMap) {
    const entry = map.lookup(key);
    if (entry !== undefined) {
      return entry.value;
    }
  } else if (map.has(key)) {
    return map.get(key)!;
  }
  throw new TypeError("map key lookup is inconsistent with its entries");
}

export function GoMapLookup<K, V>(map: GoMap<K, V>, key: K, zeroValue: () => V): [V, bool] {
  if (!map.has(key)) {
    return [zeroValue(), false];
  }
  return [GoMapGetExisting(map, key), true];
}

export function GoAppend<T>(slice: GoSlice<T>, ...items: T[]): NonNullable<GoSlice<T>> {
  return items.length === 0 ? slice : [...slice, ...items];
}

`;
}
