import assert from "node:assert/strict";
import test from "node:test";

import { GoChanAsReceive, GoChanClose, GoChanReceive, MakeGoChan } from "./compat.js";
import type { Context } from "./context.js";
import { Background, Canceled, NewContextKeyType, WithCancel, WithValue } from "./context.js";

async function flushMicrotasks(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
}

test("WithCancel closes Done exactly once and records context cancellation", async () => {
  const [context, cancel] = WithCancel(Background());
  const notifications: boolean[] = [];
  GoChanReceive(context.Done()!, (_value, ok) => notifications.push(ok));

  cancel();
  cancel();
  await flushMicrotasks();

  assert.equal(context.Err(), Canceled);
  assert.deepEqual(notifications, [false]);
});

test("WithCancel propagates parent cancellation through Done", async () => {
  const [parent, cancelParent] = WithCancel(Background());
  const [child] = WithCancel(WithValue(parent, "key", "value"));

  cancelParent();
  assert.equal(child.Err(), Canceled);
  await flushMicrotasks();

  assert.equal(child.Err(), Canceled);
  assert.equal(child.Value("key"), "value");
});

test("named context key types preserve type identity and payload value equality", () => {
  const firstKeyType = NewContextKeyType<number>();
  const secondKeyType = NewContextKeyType<number>();
  const context = WithValue(
    WithValue(
      WithValue(Background(), firstKeyType(0), "first"),
      secondKeyType(0),
      "second",
    ),
    0,
    "unnamed",
  );

  assert.equal(context.Value(firstKeyType(0)), "first");
  assert.equal(context.Value(secondKeyType(0)), "second");
  assert.equal(context.Value(0), "unnamed");
  assert.equal(context.Value(firstKeyType(1)), undefined);
});

test("WithValue validates supported comparable key representations", () => {
  const pointerKey = {};
  const context = WithValue(
    WithValue(
      WithValue(
        WithValue(Background(), "name", "value"),
        42,
        "number",
      ),
      42n,
      "bigint",
    ),
    pointerKey,
    "pointer",
  );

  assert.equal(context.Value("name"), "value");
  assert.equal(context.Value(42), "number");
  assert.equal(context.Value(42n), "bigint");
  assert.equal(context.Value(pointerKey), "pointer");
  assert.equal(context.Value({}), undefined);
  assert.throws(() => WithValue(Background(), undefined, "value"), /nil key/);
  for (const key of [
    null,
    [],
    new Map(),
    new Set(),
    new WeakMap(),
    new WeakSet(),
    new ArrayBuffer(1),
    new DataView(new ArrayBuffer(1)),
    new Uint8Array(),
    (): void => {},
  ]) {
    assert.throws(() => WithValue(Background(), key, "value"), /key is not comparable/);
  }
});

test("WithCancel does not bypass a wrapper with a different Done channel", async () => {
  const [hiddenParent, cancelHiddenParent] = WithCancel(Background());
  const wrapperDone = MakeGoChan<{}>(0, () => ({}));
  let wrapperCanceled = false;
  const wrapper: Context = {
    Deadline: () => hiddenParent.Deadline(),
    Done: () => GoChanAsReceive(wrapperDone),
    Err: () => wrapperCanceled ? Canceled : undefined,
    Value: (key: unknown) => hiddenParent.Value(key),
  };
  const [child] = WithCancel(wrapper);

  cancelHiddenParent();
  await flushMicrotasks();
  assert.equal(child.Err(), undefined);

  wrapperCanceled = true;
  GoChanClose(wrapperDone);
  await flushMicrotasks();
  assert.equal(child.Err(), Canceled);
});
