import assert from "node:assert/strict";
import test from "node:test";

import {
  GoAppend,
  GoChanClose,
  GoChanReceive,
  GoChanSelect,
  GoChanSelectReceive,
  GoChanTrySend,
  MakeGoChan,
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
