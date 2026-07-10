export function renderGoScalarsModule() {
  return `export type bool = boolean;
export type byte = number;
export type double = number;
export type float = number;
export type int = number;
export type long = number;
export type nint = number;
export type nuint = number;
export type sbyte = number;
export type short = number;
export type uint = number;
export type ulong = bigint;
export type ushort = number;
`;
}

export function renderGoCompatModule() {
  return `import type { bool, int } from "./scalars.js";

declare const __goBrand: unique symbol;

export const goReceiverKey: unique symbol = Symbol("GoInterface.receiver");
const goInterfaceTypeKey: unique symbol = Symbol("GoInterface.type");

export type GoPtr<T> = T | undefined;
export type GoRef<T> = { v: T };
export type GoSlice<T> = T[];
export type GoArray<T, Length extends string> = T[] & { readonly [__goBrand]?: { readonly length: Length } };
export type GoMap<K, V> = Map<K, V>;
export type GoChan<T, Direction extends string = "bidirectional"> = {
  readonly [__goBrand]?: { readonly element: T; readonly direction: Direction };
  readonly [goChannelState]?: GoChannelState<T>;
};
export type GoSeq<T> = (yieldValue: (value: T) => bool) => void;
export type GoSeq2<K, V> = (yieldValue: (key: K, value: V) => bool) => void;
export type GoError = Error | undefined;
export type GoComparable = unknown;
export type GoOrdered = string | number | bigint | bool;
export type GoConstraint<Text extends string> = unknown;
export type GoUnresolved<Name extends string> = { readonly [__goBrand]: { readonly unresolved: Name } };
export type GoUnsupported<Text extends string> = { readonly [__goBrand]: { readonly unsupported: Text } };
export type GoComplex64 = { readonly real: number; readonly imag: number };
export type GoComplex128 = { readonly real: number; readonly imag: number };
export type GoUnsafePointer = GoPtr<unknown>;
export type GoRune = int;

export function GoRequireNonNilAfterSuccess<T>(value: GoPtr<T>, operation: string): T {
  if (value === undefined) {
    throw new TypeError(\`\${operation} returned nil after success\`);
  }
  return value;
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

type GoChannelReceiver<T> = (value: T, ok: bool) => void;

interface GoChannelWaiter<T> {
  active: bool;
  deliver(value: T, ok: bool): bool;
}

interface GoChannelState<T> {
  capacity: number;
  queue: T[];
  waiters: GoChannelWaiter<T>[];
  closed: bool;
  zeroValue(): T;
}

export interface GoChanSelectCase {
  readonly channel: GoChan<unknown, string>;
  readonly receiver: GoChannelReceiver<unknown>;
}

const goChannelState: unique symbol = Symbol("GoChannel.state");

export function MakeGoChan<T>(capacity: number, zeroValue: () => T): GoChan<T> {
  if (!Number.isSafeInteger(capacity) || capacity < 0) {
    throw new RangeError("makechan: size out of range");
  }
  return {
    [goChannelState]: {
      capacity,
      queue: [],
      waiters: [],
      closed: false,
      zeroValue,
    },
  };
}

export function GoChanAsReceive<T>(channel: GoChan<T>): GoChan<T, "receive"> {
  return channel as unknown as GoChan<T, "receive">;
}

export function GoChanAsSend<T>(channel: GoChan<T>): GoChan<T, "send"> {
  return channel as unknown as GoChan<T, "send">;
}

export function GoChanTrySend<T>(channel: GoChan<T, string>, value: T): bool {
  const state = requireGoChannelState(channel);
  if (state.closed) {
    throw new Error("send on closed channel");
  }
  const waiter = takeGoChannelWaiter(state);
  if (waiter !== undefined) {
    return waiter.deliver(value, true as bool);
  }
  if (state.queue.length < state.capacity) {
    state.queue.push(value);
    return true as bool;
  }
  return false as bool;
}

export function GoChanReceive<T>(channel: GoChan<T, string>, receiver: GoChannelReceiver<T>): () => void {
  const state = requireGoChannelState(channel);
  if (goChannelReceiveReady(state)) {
    const [value, ok] = takeGoChannelReadyValue(state);
    queueMicrotask(() => receiver(value, ok));
    return () => {};
  }
  const waiter: GoChannelWaiter<T> = {
    active: true,
    deliver(value, ok) {
      queueMicrotask(() => receiver(value, ok));
      return true as bool;
    },
  };
  state.waiters.push(waiter);
  return () => {
    waiter.active = false;
  };
}

export function GoChanSelectReceive<T>(channel: GoChan<T, string>, receiver: GoChannelReceiver<T>): GoChanSelectCase {
  return {
    channel: channel as GoChan<unknown, string>,
    receiver: receiver as GoChannelReceiver<unknown>,
  };
}

export function GoChanSelect(cases: readonly GoChanSelectCase[]): () => void {
  const ready = [] as number[];
  for (let index = 0; index < cases.length; index++) {
    if (goChannelReceiveReady(requireGoChannelState(cases[index]!.channel))) ready.push(index);
  }
  if (ready.length > 0) {
    const selectedIndex = ready.length === 1 ? ready[0]! : ready[Math.floor(Math.random() * ready.length)]!;
    const selected = cases[selectedIndex]!;
    const [value, ok] = takeGoChannelReadyValue(requireGoChannelState(selected.channel));
    queueMicrotask(() => selected.receiver(value, ok));
    return () => {};
  }

  let active = true;
  const waiters: Array<GoChannelWaiter<unknown>> = [];
  const cancel = (): void => {
    if (!active) return;
    active = false;
    for (const waiter of waiters) waiter.active = false;
  };
  for (const selectCase of cases) {
    const waiter: GoChannelWaiter<unknown> = {
      active: true,
      deliver(value, ok) {
        if (!active) return false as bool;
        active = false;
        for (const other of waiters) other.active = false;
        queueMicrotask(() => selectCase.receiver(value, ok));
        return true as bool;
      },
    };
    waiters.push(waiter);
    requireGoChannelState(selectCase.channel).waiters.push(waiter);
  }
  return cancel;
}

export function GoChanClose<T>(channel: GoChan<T, string>): void {
  const state = requireGoChannelState(channel);
  if (state.closed) {
    throw new Error("close of closed channel");
  }
  state.closed = true;
  while (state.queue.length > 0) {
    const waiter = takeGoChannelWaiter(state);
    if (waiter === undefined) {
      break;
    }
    const value = state.queue.shift()!;
    waiter.deliver(value, true as bool);
  }
  let waiter: GoChannelWaiter<T> | undefined;
  while ((waiter = takeGoChannelWaiter(state)) !== undefined) {
    waiter.deliver(state.zeroValue(), false as bool);
  }
}

function requireGoChannelState<T>(channel: GoChan<T, string>): GoChannelState<T> {
  const state = channel[goChannelState];
  if (state === undefined) {
    throw new Error("channel has no runtime state");
  }
  return state;
}

function takeGoChannelWaiter<T>(state: GoChannelState<T>): GoChannelWaiter<T> | undefined {
  while (state.waiters.length > 0) {
    const waiter = state.waiters.shift()!;
    if (waiter.active) {
      waiter.active = false;
      return waiter;
    }
  }
  return undefined;
}

function goChannelReceiveReady<T>(state: GoChannelState<T>): bool {
  return (state.queue.length > 0 || state.closed) as bool;
}

function takeGoChannelReadyValue<T>(state: GoChannelState<T>): [T, bool] {
  if (state.queue.length > 0) return [state.queue.shift()!, true as bool];
  if (state.closed) return [state.zeroValue(), false as bool];
  throw new Error("receive from channel that is not ready");
}

export interface GoMapKeyDescriptor<K> {
  readonly identity: symbol;
  append(parts: unknown[], value: K): void;
}

export interface GoStructKeyField<K> {
  append(parts: unknown[], value: K): void;
}

export interface GoDynamicComparable {
  readonly descriptor: GoMapKeyDescriptor<unknown>;
  readonly value: unknown;
}

const goNilPointerKey = Symbol("GoKey.nilPointer");
const goNilInterfaceKey = Symbol("GoKey.nilInterface");

function createGoMapKeyDescriptor<K>(append: (parts: unknown[], value: K) => void): GoMapKeyDescriptor<K> {
  return globalThis.Object.freeze({ identity: Symbol("GoKey.type"), append });
}

function appendGoMapKey<K>(parts: unknown[], descriptor: GoMapKeyDescriptor<K>, value: K): void {
  parts.push(descriptor.identity);
  descriptor.append(parts, value);
}

function requireGoKeyType(value: unknown, expected: string): void {
  if (typeof value !== expected) throw new TypeError(`Go map key descriptor expected ${expected}, got ${typeof value}`);
}

export const GoBooleanKey: GoMapKeyDescriptor<boolean> = createGoMapKeyDescriptor((parts, value) => {
  requireGoKeyType(value, "boolean");
  parts.push(value);
});

export const GoNumberKey: GoMapKeyDescriptor<number> = createGoMapKeyDescriptor((parts, value) => {
  requireGoKeyType(value, "number");
  parts.push(Number.isNaN(value) ? Symbol("GoKey.NaN") : value);
});

export const GoBigIntKey: GoMapKeyDescriptor<bigint> = createGoMapKeyDescriptor((parts, value) => {
  requireGoKeyType(value, "bigint");
  parts.push(value);
});

export const GoStringKey: GoMapKeyDescriptor<string> = createGoMapKeyDescriptor((parts, value) => {
  requireGoKeyType(value, "string");
  parts.push(value);
});

export function GoPointerKey<T extends object>(): GoMapKeyDescriptor<GoPtr<T>> {
  return createGoMapKeyDescriptor((parts, value) => {
    if (value === undefined) {
      parts.push(goNilPointerKey);
      return;
    }
    if ((typeof value !== "object" || value === null) && typeof value !== "function") {
      throw new TypeError("Go pointer map key must retain object identity");
    }
    parts.push(value);
  });
}

export function GoArrayKey<T>(length: number, element: GoMapKeyDescriptor<T>): GoMapKeyDescriptor<readonly T[]> {
  if (!Number.isSafeInteger(length) || length < 0) throw new RangeError("Go array key length must be a non-negative safe integer");
  return createGoMapKeyDescriptor((parts, value) => {
    if (!globalThis.Array.isArray(value) || value.length !== length) {
      throw new TypeError(`Go array map key expected length ${length}`);
    }
    for (const item of value) appendGoMapKey(parts, element, item);
  });
}

export function GoStructField<K, V>(read: (value: K) => V, descriptor: GoMapKeyDescriptor<V>): GoStructKeyField<K> {
  return { append: (parts, value) => appendGoMapKey(parts, descriptor, read(value)) };
}

export function GoStructKey<K>(fields: readonly GoStructKeyField<K>[]): GoMapKeyDescriptor<K> {
  return createGoMapKeyDescriptor((parts, value) => {
    if (typeof value !== "object" || value === null) throw new TypeError("Go struct map key must be an object value");
    for (const field of fields) field.append(parts, value);
  });
}

export function GoNamedKey<K>(underlying: GoMapKeyDescriptor<K>): GoMapKeyDescriptor<K> {
  return createGoMapKeyDescriptor((parts, value) => appendGoMapKey(parts, underlying, value));
}

export function GoInterfaceKey<K>(dynamic: (value: K) => GoDynamicComparable | undefined): GoMapKeyDescriptor<K> {
  return createGoMapKeyDescriptor((parts, value) => {
    const selected = dynamic(value);
    if (selected === undefined) {
      parts.push(goNilInterfaceKey);
      return;
    }
    appendGoMapKey(parts, selected.descriptor, selected.value);
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
    this.leafFor(key, false)!.entry = undefined;
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
    return this.leafFor(key, false)?.entry;
  }

  private insert(key: K, value: V): void {
    const entry = { key, value, active: true };
    this.leafFor(key, true)!.entry = entry;
    this.orderedEntries.push(entry);
    this.activeSize++;
  }

  private leafFor(key: K, create: boolean): GoStructMapTrieNode<K, V> | undefined {
    const parts: unknown[] = [];
    appendGoMapKey(parts, this.keyDescriptor, key);
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

export function GoMapGetExisting<K, V>(map: GoMap<K, V>, key: K): V {
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

export function GoMapLookup<K, V>(map: GoPtr<GoMap<K, V>>, key: K, zeroValue: () => V): [V, bool] {
  if (map === undefined || !map.has(key)) {
    return [zeroValue(), false];
  }
  return [GoMapGetExisting(map, key), true];
}

export function GoAppend<T>(slice: GoPtr<GoSlice<T>>, ...items: GoSlice<T>): GoSlice<T> {
  return [...(slice ?? []), ...items];
}

`;
}
