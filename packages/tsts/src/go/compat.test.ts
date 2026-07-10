import assert from "node:assert/strict";
import test from "node:test";

import {
  GoAppend,
  GoChanClose,
  GoChanReceive,
  GoChanSelect,
  GoChanSelectReceive,
  GoChanTrySend,
  GoInterfaceAdapter,
  GoInterfaceAssert,
  GoInterfaceTryAssert,
  MakeGoChan,
  NewGoInterfaceType,
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
  const channel = MakeGoChan<number>(1);
  assert.equal(GoChanTrySend(channel, 1), true);
  assert.equal(GoChanTrySend(channel, 2), false);

  const received: Array<[number | undefined, boolean]> = [];
  GoChanReceive(channel, (value, ok) => received.push([value, ok]));
  await flushMicrotasks();
  assert.deepEqual(received, [[1, true]]);
});

test("Go channel receive cancellation prevents stale select arms", async () => {
  const channel = MakeGoChan<number>();
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
  const left = MakeGoChan<number>();
  const right = MakeGoChan<number>();
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
