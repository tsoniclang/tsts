import assert from "node:assert/strict";
import test from "node:test";

import {
  GoAppend,
  GoArrayKey,
  GoChanClose,
  GoChanReceive,
  GoChanSelect,
  GoChanSelectReceive,
  GoChanTrySend,
  GoInterfaceAdapter,
  GoInterfaceAssert,
  GoInterfaceTryAssert,
  GoDynamicValue,
  type GoDynamicComparable,
  GoInterfaceKey,
  GoMapGetExisting,
  GoMapLookup,
  GoRequireNonNilAfterSuccess,
  GoNamedKey,
  GoNumberKey,
  GoPointerKey,
  GoStringKey,
  GoStructField,
  GoStructKey,
  MakeGoChan,
  NewGoInterfaceType,
  NewGoStructMap,
} from "./compat.js";

async function flushMicrotasks(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
}

test("GoAppend appends to an undefined slice like Go append(nil, ...)", () => {
  assert.deepEqual(GoAppend<string>(undefined, "a", "b"), ["a", "b"]);
});

test("GoAppend returns an extended slice without mutating the input slice", () => {
  const source = ["a"];
  const result = GoAppend(source, "b");

  assert.deepEqual(source, ["a"]);
  assert.deepEqual(result, ["a", "b"]);
});

test("GoMapGetExisting preserves undefined values and exact structural Go keys", () => {
  const native = new Map<string, undefined>([["present", undefined]]);
  assert.equal(GoMapGetExisting(native, "present"), undefined);

  const numeric = new Map<number, string>([[Number.NaN, "nan"], [-0, "zero"]]);
  assert.equal(GoMapGetExisting(numeric, Number.NaN), "nan");
  assert.equal(GoMapGetExisting(numeric, +0), "zero");

  interface Key {
    code: number;
  }
  const keyDescriptor = GoStructKey<Key, readonly [number]>(
    [GoStructField((value: Key) => value.code, GoNumberKey)],
    ([code]) => ({ code }),
  );
  const structured = NewGoStructMap<Key, string>(keyDescriptor);
  structured.set({ code: 1 }, "one");
  assert.equal(GoMapGetExisting(structured, { code: 1 }), "one");
});

test("GoStructMap follows Go NaN and signed-zero equality", () => {
  const values = NewGoStructMap<number, string>(GoNumberKey);
  values.set(Number.NaN, "first");
  values.set(Number.NaN, "second");
  assert.equal(values.size, 2);
  assert.equal(values.has(Number.NaN), false);
  assert.equal(values.delete(Number.NaN), false);

  values.set(-0, "negative");
  values.set(+0, "positive");
  assert.equal(values.size, 3);
  assert.equal(values.get(-0), "positive");
  assert.equal(values.get(+0), "positive");
});

test("GoStructMap uses collision-free nested value and pointer semantics", () => {
  interface Nested {
    label: string;
  }
  interface Token {
    readonly id: number;
  }
  interface Key {
    left: string;
    right: string;
    nested: Nested;
    pointer: Token | undefined;
  }
  const nestedDescriptor = GoStructKey<Nested, readonly [string]>(
    [GoStructField((value: Nested) => value.label, GoStringKey)],
    ([label]) => ({ label }),
  );
  const pointerDescriptor = GoPointerKey<Token>();
  const keyDescriptor = GoStructKey<Key, readonly [string, string, Nested, Token | undefined]>(
    [
      GoStructField((value: Key) => value.left, GoStringKey),
      GoStructField((value: Key) => value.right, GoStringKey),
      GoStructField((value: Key) => value.nested, nestedDescriptor),
      GoStructField((value: Key) => value.pointer, pointerDescriptor),
    ],
    ([left, right, nested, pointer]) => ({ left, right, nested, pointer }),
  );
  const leftPointer: Token = { id: 1 };
  const rightPointer: Token = { id: 1 };
  const values = NewGoStructMap<Key, string>(keyDescriptor);
  values.set({ left: "a,b=c", right: "d", nested: { label: "x:y|z" }, pointer: leftPointer }, "left");
  values.set({ left: "a", right: "b=c,d", nested: { label: "x:y|z" }, pointer: rightPointer }, "right");

  assert.equal(values.get({ left: "a,b=c", right: "d", nested: { label: "x:y|z" }, pointer: leftPointer }), "left");
  assert.equal(values.get({ left: "a", right: "b=c,d", nested: { label: "x:y|z" }, pointer: rightPointer }), "right");
  assert.equal(values.has({ left: "a,b=c", right: "d", nested: { label: "x:y|z" }, pointer: rightPointer }), false);
});

test("GoStructMap snapshots array and nested struct value keys", () => {
  interface Key {
    values: readonly number[];
    nested: { text: string };
  }
  const nestedDescriptor = GoStructKey<{ text: string }, readonly [string]>(
    [GoStructField((value: { text: string }) => value.text, GoStringKey)],
    ([text]) => ({ text }),
  );
  const descriptor = GoStructKey<Key, readonly [readonly number[], { text: string }]>(
    [
      GoStructField((value: Key) => value.values, GoArrayKey(2, GoNumberKey)),
      GoStructField((value: Key) => value.nested, nestedDescriptor),
    ],
    ([values, nested]) => ({ values, nested }),
  );
  const source = { values: [1, 2], nested: { text: "before" } };
  const map = NewGoStructMap<Key, string>(descriptor);
  map.set(source, "value");
  source.values[0] = 9;
  source.nested.text = "after";

  assert.equal(map.get({ values: [1, 2], nested: { text: "before" } }), "value");
  assert.deepEqual([...map.keys()], [{ values: [1, 2], nested: { text: "before" } }]);
});

test("Go interface keys distinguish dynamic named types, nil interfaces, and typed nil pointers", () => {
  interface Token {
    readonly id: number;
  }
  interface InterfaceKey {
    dynamic: GoDynamicComparable | undefined;
  }
  const firstNumberType = GoNamedKey(GoNumberKey);
  const secondNumberType = GoNamedKey(GoNumberKey);
  const tokenPointerType = GoPointerKey<Token>();
  const descriptor = GoInterfaceKey<InterfaceKey>(
    (value) => value.dynamic,
    (dynamic) => ({ dynamic }),
  );
  const map = NewGoStructMap<InterfaceKey, string>(descriptor);
  map.set({ dynamic: GoDynamicValue(firstNumberType, 1) }, "first-number");
  map.set({ dynamic: undefined }, "nil-interface");
  map.set({ dynamic: GoDynamicValue(tokenPointerType, undefined) }, "typed-nil");

  assert.equal(map.get({ dynamic: GoDynamicValue(firstNumberType, 1) }), "first-number");
  assert.equal(map.has({ dynamic: GoDynamicValue(secondNumberType, 1) }), false);
  assert.equal(map.get({ dynamic: undefined }), "nil-interface");
  assert.equal(map.get({ dynamic: GoDynamicValue(tokenPointerType, undefined) }), "typed-nil");
  assert.equal(map.size, 3);
});

test("GoMapLookup distinguishes a present nil value from a missing generic value", () => {
  const map = new Map<string, string | undefined>([["present", undefined]]);

  assert.deepEqual(GoMapLookup(map, "present", () => "zero"), [undefined, true]);
  assert.deepEqual(GoMapLookup(map, "missing", () => "zero"), ["zero", false]);
  assert.deepEqual(GoMapLookup(undefined, "missing", () => "zero"), ["zero", false]);
});

test("GoRequireNonNilAfterSuccess enforces the Go result invariant", () => {
  const value = { name: "value" };
  assert.equal(GoRequireNonNilAfterSuccess(value, "example.Open"), value);
  assert.throws(() => GoRequireNonNilAfterSuccess(undefined, "example.Open"), /example\.Open returned nil after success/);
});

test("Go interface adapters preserve and validate concrete receiver identity", () => {
  interface Receiver {
    readonly value: number;
  }
  const receiverType = NewGoInterfaceType<Receiver>("example.Receiver");
  const otherType = NewGoInterfaceType<Receiver>("example.Other");
  const receiver: Receiver = { value: 42 };
  const adapter = GoInterfaceAdapter(receiverType, receiver, {
    Value: (): number => receiver.value,
  });

  assert.deepEqual(globalThis.Object.keys(adapter), ["Value"]);
  assert.equal(adapter.Value(), 42);
  assert.equal(GoInterfaceAssert(adapter, receiverType), receiver);
  assert.deepEqual(GoInterfaceTryAssert(adapter, receiverType), [receiver, true]);
  assert.deepEqual(GoInterfaceTryAssert(adapter, otherType), [undefined, false]);
  assert.throws(() => GoInterfaceAssert(adapter, otherType), /does not contain example\.Other/);
  assert.throws(() => GoInterfaceAssert({ Value: adapter.Value }, receiverType), /does not contain example\.Receiver/);
});

test("Go interface adapters preserve a typed nil concrete pointer", () => {
  interface Receiver {
    readonly value: number;
  }
  const receiverType = NewGoInterfaceType<Receiver>("example.NilReceiver");
  const adapter = GoInterfaceAdapter(receiverType, undefined, {
    Value: (): number => 0,
  });

  assert.deepEqual(GoInterfaceTryAssert(adapter, receiverType), [undefined, true]);
  assert.equal(GoInterfaceAssert(adapter, receiverType), undefined);
});

test("Go interface adaptation preserves the adapter object and its prototype", () => {
  interface Receiver {
    readonly value: number;
  }
  class Adapter {
    Value(): number {
      return 7;
    }
  }
  const receiverType = NewGoInterfaceType<Receiver>("example.PrototypeReceiver");
  const adapter = new Adapter();
  const adapted = GoInterfaceAdapter(receiverType, { value: 7 }, adapter);

  assert.equal(adapted, adapter);
  assert.equal(adapted instanceof Adapter, true);
  assert.equal(adapted.Value(), 7);
});

test("bounded Go channels coalesce nonblocking sends and deliver queued values", async () => {
  const channel = MakeGoChan<number>(1, () => 0);
  assert.equal(GoChanTrySend(channel, 1), true);
  assert.equal(GoChanTrySend(channel, 2), false);

  const received: Array<[number | undefined, boolean]> = [];
  GoChanReceive(channel, (value, ok) => received.push([value, ok]));
  await flushMicrotasks();
  assert.deepEqual(received, [[1, true]]);
});

test("Go channel receive cancellation prevents stale select arms", async () => {
  const channel = MakeGoChan<number>(0, () => 0);
  const received: number[] = [];
  const cancel = GoChanReceive(channel, (value) => received.push(value!));
  cancel();

  assert.equal(GoChanTrySend(channel, 1), false);
  await flushMicrotasks();
  assert.deepEqual(received, []);
});

test("closing a Go channel wakes every receiver and rejects later sends", async () => {
  const channel = MakeGoChan<number>(0, () => 0);
  const received: Array<[number, boolean]> = [];
  GoChanReceive(channel, (value, ok) => received.push([value, ok]));
  GoChanReceive(channel, (value, ok) => received.push([value, ok]));

  GoChanClose(channel);
  await flushMicrotasks();
  assert.deepEqual(received, [[0, false], [0, false]]);
  assert.throws(() => GoChanTrySend(channel, 1), /send on closed channel/);
  assert.throws(() => GoChanClose(channel), /close of closed channel/);
});

test("Go channel select commits exactly one already-ready receive", async () => {
  const left = MakeGoChan<number>(1, () => 0);
  const right = MakeGoChan<number>(1, () => 0);
  assert.equal(GoChanTrySend(left, 11), true);
  assert.equal(GoChanTrySend(right, 22), true);

  const selected: number[] = [];
  GoChanSelect([
    GoChanSelectReceive(left, (value) => selected.push(value)),
    GoChanSelectReceive(right, (value) => selected.push(value)),
  ]);
  await flushMicrotasks();
  assert.equal(selected.length, 1);

  const remaining: number[] = [];
  GoChanReceive(left, (value) => remaining.push(value));
  GoChanReceive(right, (value) => remaining.push(value));
  await flushMicrotasks();
  assert.deepEqual([...selected, ...remaining].sort((a, b) => a - b), [11, 22]);
});

test("canceling a pending Go channel select leaves both channels available", async () => {
  const left = MakeGoChan<number>(0, () => 0);
  const right = MakeGoChan<number>(0, () => 0);
  const received: number[] = [];
  const cancel = GoChanSelect([
    GoChanSelectReceive(left, (value) => received.push(value)),
    GoChanSelectReceive(right, (value) => received.push(value)),
  ]);
  cancel();

  assert.equal(GoChanTrySend(left, 1), false);
  assert.equal(GoChanTrySend(right, 2), false);
  await flushMicrotasks();
  assert.deepEqual(received, []);
});
