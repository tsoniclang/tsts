import { test } from "node:test";
import assert from "node:assert/strict";
import { GoDynamicValue, GoNumberKey, GoStringKey, GoStructField, GoStructKey, type GoDynamicComparable } from "./compat.js";
import {
  Mutex,
  MutexValueOps,
  RWMutex,
  RWMutexValueOps,
  Once,
  OnceValueOps,
  OnceFunc,
  OnceValue,
  OnceValues,
  Map as SyncMap,
  MapValueOps,
  Pool,
  Cond,
  NewCond,
  WaitGroup,
  WaitGroupValueOps,
} from "./sync.js";

test("sync.Mutex Lock/Unlock are no-ops", () => {
  const m = new Mutex();
  m.Lock();
  m.Unlock();
  assert.equal(m.TryLock(), true);
});

test("sync.RWMutex no-ops + RLocker", () => {
  const rw = new RWMutex();
  rw.Lock();
  rw.Unlock();
  rw.RLock();
  rw.RUnlock();
  assert.equal(rw.TryLock(), true);
  assert.equal(rw.TryRLock(), true);
  const locker = rw.RLocker();
  locker!.Lock();
  locker!.Unlock();
});

test("sync.Once.Do runs exactly once", () => {
  const once = new Once();
  let count = 0;
  once.Do(() => {
    count = count + 1;
  });
  once.Do(() => {
    count = count + 1;
  });
  assert.equal(count, 1);
});

test("sync.OnceFunc runs once", () => {
  let count = 0;
  const f = OnceFunc(() => {
    count = count + 1;
  });
  f!();
  f!();
  f!();
  assert.equal(count, 1);
});

test("sync.OnceValue memoizes the result", () => {
  let calls = 0;
  const get = OnceValue<string>(() => {
    calls = calls + 1;
    return "value";
  });
  assert.equal(get!(), "value");
  assert.equal(get!(), "value");
  assert.equal(calls, 1);
});

test("sync.OnceValues memoizes a tuple", () => {
  let calls = 0;
  const get = OnceValues<string, number>(() => {
    calls = calls + 1;
    return ["s", 42];
  });
  assert.deepEqual(get!(), ["s", 42]);
  assert.deepEqual(get!(), ["s", 42]);
  assert.equal(calls, 1);
});

test("sync.Once helpers replay a panic without invoking the function again", () => {
  const panicValue = new globalThis.Error("once panic");

  let onceFuncCalls = 0;
  const onceFunc = OnceFunc(() => {
    onceFuncCalls = onceFuncCalls + 1;
    throw panicValue;
  });
  assert.throws(() => onceFunc!(), (error: unknown): boolean => error === panicValue);
  assert.throws(() => onceFunc!(), (error: unknown): boolean => error === panicValue);
  assert.equal(onceFuncCalls, 1);

  let onceValueCalls = 0;
  const onceValue = OnceValue((): number => {
    onceValueCalls = onceValueCalls + 1;
    throw panicValue;
  });
  assert.throws(() => onceValue!(), (error: unknown): boolean => error === panicValue);
  assert.throws(() => onceValue!(), (error: unknown): boolean => error === panicValue);
  assert.equal(onceValueCalls, 1);

  let onceValuesCalls = 0;
  const onceValues = OnceValues((): [number, number] => {
    onceValuesCalls = onceValuesCalls + 1;
    throw panicValue;
  });
  assert.throws(() => onceValues!(), (error: unknown): boolean => error === panicValue);
  assert.throws(() => onceValues!(), (error: unknown): boolean => error === panicValue);
  assert.equal(onceValuesCalls, 1);
});

test("sync noCopy ValueOps create fresh zero values", () => {
  assert.notEqual(MutexValueOps.zero(), MutexValueOps.zero());
  assert.notEqual(RWMutexValueOps.zero(), RWMutexValueOps.zero());
  assert.notEqual(OnceValueOps.zero(), OnceValueOps.zero());
  assert.notEqual(MapValueOps.zero(), MapValueOps.zero());
  assert.notEqual(WaitGroupValueOps.zero(), WaitGroupValueOps.zero());
});

test("sync noCopy ValueOps copy valid pre-use values into independent zero values", () => {
  const mutex = new Mutex();
  const copiedMutex = MutexValueOps.copy(mutex);
  assert.notEqual(copiedMutex, mutex);

  const rwMutex = new RWMutex();
  const copiedRWMutex = RWMutexValueOps.copy(rwMutex);
  assert.notEqual(copiedRWMutex, rwMutex);

  const once = new Once();
  const copiedOnce = OnceValueOps.copy(once);
  let onceCalls = 0;
  once.Do(() => { onceCalls = onceCalls + 1; });
  copiedOnce.Do(() => { onceCalls = onceCalls + 1; });
  assert.equal(onceCalls, 2);

  const syncMap = new SyncMap();
  const copiedMap = MapValueOps.copy(syncMap);
  const mapKey = GoDynamicValue(GoStringKey, "key");
  syncMap.Store(mapKey, "source");
  assert.deepEqual(copiedMap.Load(mapKey), [undefined, false]);
  copiedMap.Store(mapKey, "copy");
  assert.deepEqual(syncMap.Load(mapKey), ["source", true]);
  assert.deepEqual(copiedMap.Load(mapKey), ["copy", true]);

  const waitGroup = new WaitGroup();
  const copiedWaitGroup = WaitGroupValueOps.copy(waitGroup);
  waitGroup.Add(1);
  assert.throws(() => copiedWaitGroup.Done(), /negative WaitGroup counter/);
  waitGroup.Done();
});

test("sync.Map Load/Store/LoadOrStore/Delete/Range", () => {
  const m = new SyncMap();
  const key = (value: string) => GoDynamicValue(GoStringKey, value);
  // Missing key -> (undefined, false).
  assert.deepEqual(m.Load(key("a")), [undefined, false]);

  m.Store(key("a"), 1);
  assert.deepEqual(m.Load(key("a")), [1, true]);

  // LoadOrStore returns existing without overwriting.
  assert.deepEqual(m.LoadOrStore(key("a"), 99), [1, true]);
  assert.deepEqual(m.LoadOrStore(key("b"), 2), [2, false]);
  assert.deepEqual(m.Load(key("b")), [2, true]);

  // LoadAndDelete.
  assert.deepEqual(m.LoadAndDelete(key("b")), [2, true]);
  assert.deepEqual(m.Load(key("b")), [undefined, false]);

  // Range over all entries.
  m.Store(key("c"), 3);
  const seen = new globalThis.Map<string, number>();
  m.Range((k, v) => {
    seen.set((k as GoDynamicComparable<string>).value, v as number);
    return true;
  });
  assert.equal(seen.get("a"), 1);
  assert.equal(seen.get("c"), 3);

  // Range early-stops when callback returns false.
  let count = 0;
  m.Range(() => {
    count = count + 1;
    return false;
  });
  assert.equal(count, 1);

  m.Delete(key("a"));
  assert.deepEqual(m.Load(key("a")), [undefined, false]);

  m.Clear();
  let any = false;
  m.Range(() => {
    any = true;
    return true;
  });
  assert.equal(any, false);
});

test("sync.Map keeps Go NaN key lookup semantics", () => {
  const m = new SyncMap();
  const key = globalThis.Number.NaN;
  m.Store(GoDynamicValue(GoNumberKey, key), "value");
  assert.deepEqual(m.Load(GoDynamicValue(GoNumberKey, key)), [undefined, false]);
  assert.deepEqual(m.LoadAndDelete(GoDynamicValue(GoNumberKey, key)), [undefined, false]);
});

test("sync.Map uses an explicit descriptor for Go struct value keys", () => {
  interface Key { value: number }
  const keyDescriptor = GoStructKey<Key, readonly [number]>(
    [GoStructField((key) => key.value, GoNumberKey)],
    ([value]) => ({ value }),
  );
  const map = new SyncMap();
  const source = { value: 1 };
  map.Store(GoDynamicValue(keyDescriptor, source), "stored");
  source.value = 2;
  assert.deepEqual(map.Load(GoDynamicValue(keyDescriptor, { value: 1 })), ["stored", true]);
  assert.deepEqual(map.Load(GoDynamicValue(keyDescriptor, { value: 2 })), [undefined, false]);
});

test("sync.Pool reuses values and falls back to New", () => {
  let constructed = 0;
  const p = new Pool();
  p.New = () => {
    constructed = constructed + 1;
    return { id: constructed };
  };
  const a = p.Get();
  const b = p.Get();
  assert.deepEqual(a, { id: 1 });
  assert.deepEqual(b, { id: 2 });
  p.Put(a as { id: number });
  assert.equal(p.Get(), a);

  // Without New, Get returns undefined (Go: nil).
  const empty = new Pool();
  assert.equal(empty.Get(), undefined);
});

test("sync.Cond / NewCond no-op wakeups", () => {
  const m = new Mutex();
  const c = new Cond(m);
  assert.equal(c.L, m);
  c.Signal();
  c.Broadcast();
  // Wait re-locks and returns immediately single-threaded.
  c.Wait();

  const c2 = NewCond(m);
  assert.ok(c2 instanceof Cond);
});

test("sync.WaitGroup counter + Wait", () => {
  const wg = new WaitGroup();
  wg.Add(2);
  wg.Done();
  wg.Done();
  wg.Wait(); // returns immediately

  // Negative counter panics (throws).
  const wg2 = new WaitGroup();
  assert.throws(() => wg2.Done(), /negative WaitGroup counter/);
});

test("sync.WaitGroup.Go runs synchronously and balances the counter", () => {
  const wg = new WaitGroup();
  let ran = false;
  wg.Go(() => {
    ran = true;
  });
  assert.equal(ran, true);
  // Counter is back to zero, so a subsequent Done would underflow.
  assert.throws(() => wg.Done(), /negative WaitGroup counter/);
});

test("sync.WaitGroup uses Go's signed 32-bit task counter", () => {
  const waitGroup = new WaitGroup();
  assert.throws(() => waitGroup.Add(0x8000_0000), /negative WaitGroup counter/);
});

test("sync.WaitGroup.Go does not decrement the counter when its function panics", () => {
  const waitGroup = new WaitGroup();
  const panicValue = new globalThis.Error("task panic");
  assert.throws(
    () => waitGroup.Go(() => { throw panicValue; }),
    (error: unknown): boolean => error === panicValue,
  );
  waitGroup.Done();
  assert.throws(() => waitGroup.Done(), /negative WaitGroup counter/);
});
