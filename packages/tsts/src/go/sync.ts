import type { int, bool } from "./scalars.js";
import type { GoPtr } from "./compat.js";

// Go: package sync
//
// TypeScript is single-threaded, so blocking operations fail rather than
// silently modeling a wakeup or a structurally comparable map key incorrectly.
//   - Mutex/RWMutex track synchronous ownership and reject an operation that
//     would block.
//   - Once.Do / OnceFunc / OnceValue / OnceValues run the function exactly once
//     and memoize the result.
//   - Map supports only primitive comparable keys without an exact descriptor.
//   - Pool returns values retained by Put and calls New only when the pool is
//     empty, preserving the reuse contract without modeling GC eviction.
//   - WaitGroup.Wait and Cond.Wait reject pending work because they would block.

const mutexState = new globalThis.WeakMap<Mutex, bool>();
const rwMutexState = new globalThis.WeakMap<RWMutex, { writer: bool; readers: int }>();

function rwMutexStateOf(mutex: RWMutex): { writer: bool; readers: int } {
  let state = rwMutexState.get(mutex);
  if (state === undefined) {
    state = { writer: false, readers: 0 };
    rwMutexState.set(mutex, state);
  }
  return state;
}

// Mutex is a mutual exclusion lock. Single-threaded: Lock/Unlock are no-ops.
export class Mutex {
  Lock(): void {
    if (mutexState.get(this) === true) throw new Error("sync.Mutex.Lock would block in the synchronous runtime");
    mutexState.set(this, true);
  }
  Unlock(): void {
    if (mutexState.get(this) !== true) throw new Error("sync: unlock of unlocked mutex");
    mutexState.set(this, false);
  }
  TryLock(): bool {
    if (mutexState.get(this) === true) return false;
    mutexState.set(this, true);
    return true;
  }
}

// RWMutex is a reader/writer mutual exclusion lock. Single-threaded: all no-ops.
export class RWMutex {
  Lock(): void {
    const state = rwMutexStateOf(this);
    if (state.writer || state.readers !== 0) throw new Error("sync.RWMutex.Lock would block in the synchronous runtime");
    state.writer = true;
  }
  Unlock(): void {
    const state = rwMutexStateOf(this);
    if (!state.writer) throw new Error("sync: Unlock of unlocked RWMutex");
    state.writer = false;
  }
  RLock(): void {
    const state = rwMutexStateOf(this);
    if (state.writer) throw new Error("sync.RWMutex.RLock would block in the synchronous runtime");
    state.readers++;
  }
  RUnlock(): void {
    const state = rwMutexStateOf(this);
    if (state.readers === 0) throw new Error("sync: RUnlock of unlocked RWMutex");
    state.readers--;
  }
  TryLock(): bool {
    const state = rwMutexStateOf(this);
    if (state.writer || state.readers !== 0) return false;
    state.writer = true;
    return true;
  }
  TryRLock(): bool {
    const state = rwMutexStateOf(this);
    if (state.writer) return false;
    state.readers++;
    return true;
  }
  // RLocker returns a Locker interface backed by the read lock.
  RLocker(): Locker {
    return { Lock: () => this.RLock(), Unlock: () => this.RUnlock() };
  }
}

// Locker is implemented by Mutex and RWMutex (used by Cond).
export interface Locker {
  Lock(): void;
  Unlock(): void;
}

// Once is an object that performs exactly one action.
export class Once {
  // Single-threaded mutable memo flag is the faithful model of Once's done bit.
  private done: bool = false;

  // Do calls f only the first time Do is invoked for this Once.
  Do(f: () => void): void {
    if (!this.done) {
      this.done = true;
      f();
    }
  }
}

// OnceFunc returns a function that invokes f only once. The returned function may
// be called concurrently in Go; here it is simply memoized.
export function OnceFunc(f: () => void): () => void {
  let result: GoPtr<{ success: true } | { panic: unknown }>;
  return (): void => {
    if (result === undefined) {
      try {
        f();
        result = { success: true };
      } catch (error) {
        result = { panic: error };
        throw error;
      }
    }
    if ("panic" in result) {
      throw result.panic;
    }
  };
}

// OnceValue returns a function that invokes f only once and returns the value
// returned by f. The returned function may be called any number of times.
export function OnceValue<T>(f: () => T): () => T {
  let result: GoPtr<{ value: T } | { panic: unknown }>;
  return (): T => {
    if (result === undefined) {
      try {
        result = { value: f() };
      } catch (error) {
        result = { panic: error };
        throw error;
      }
    }
    if ("panic" in result) {
      throw result.panic;
    }
    return result.value;
  };
}

// OnceValues returns a function that invokes f only once and returns the two
// values returned by f. Modeled as a tuple return to match Go's (T1, T2).
export function OnceValues<T1, T2>(f: () => [T1, T2]): () => [T1, T2] {
  let result: GoPtr<{ first: T1; second: T2 } | { panic: unknown }>;
  return (): [T1, T2] => {
    if (result === undefined) {
      try {
        const values = f();
        result = { first: values[0], second: values[1] };
      } catch (error) {
        result = { panic: error };
        throw error;
      }
    }
    if ("panic" in result) {
      throw result.panic;
    }
    return [result.first, result.second];
  };
}

// Map is like a Go sync.Map: a concurrent map of any/any. Single-threaded, it is
// a thin wrapper over a plain Map preserving the (value, ok) and Range contracts.
export class Map<K = unknown, V = unknown> {
  private readonly primitive = new globalThis.Map<K, { value: V }>();
  private readonly nanNumberEntries: [K, V][] = [];

  // Load returns the value stored for key, and whether it was present.
  Load(key: K): [GoPtr<V>, bool] {
    const bucket = mapKeyBucket(key);
    if (bucket === mapKeyBucketPrimitive) {
      const entry = this.primitive.get(key);
      return entry === undefined ? [undefined, false] : [entry.value, true];
    }
    if (bucket === mapKeyBucketNanNumber) {
      return [undefined, false];
    }
    throwUnsupportedSyncMapKey(key);
  }

  // Store sets the value for a key.
  Store(key: K, value: V): void {
    const bucket = mapKeyBucket(key);
    if (bucket === mapKeyBucketPrimitive) {
      this.primitive.set(key, { value });
      return;
    }
    if (bucket === mapKeyBucketNanNumber) {
      this.nanNumberEntries.push([key, value]);
      return;
    }
    throwUnsupportedSyncMapKey(key);
  }

  // LoadOrStore returns the existing value if present; otherwise stores and returns
  // the given value. loaded is true if the value was already present.
  LoadOrStore(key: K, value: V): [V, bool] {
    const bucket = mapKeyBucket(key);
    if (bucket === mapKeyBucketPrimitive) {
      const existing = this.primitive.get(key);
      if (existing !== undefined) {
        return [existing.value, true];
      }
      this.primitive.set(key, { value });
      return [value, false];
    }
    if (bucket === mapKeyBucketNanNumber) {
      this.nanNumberEntries.push([key, value]);
      return [value, false];
    }
    throwUnsupportedSyncMapKey(key);
  }

  // LoadAndDelete deletes the value for a key, returning the previous value if any.
  LoadAndDelete(key: K): [GoPtr<V>, bool] {
    const bucket = mapKeyBucket(key);
    if (bucket === mapKeyBucketPrimitive) {
      const existing = this.primitive.get(key);
      this.primitive.delete(key);
      return existing === undefined ? [undefined, false] : [existing.value, true];
    }
    if (bucket === mapKeyBucketNanNumber) {
      return [undefined, false];
    }
    throwUnsupportedSyncMapKey(key);
  }

  // Delete deletes the value for a key.
  Delete(key: K): void {
    const bucket = mapKeyBucket(key);
    if (bucket === mapKeyBucketPrimitive) {
      this.primitive.delete(key);
      return;
    }
    if (bucket === mapKeyBucketNanNumber) {
      return;
    }
    throwUnsupportedSyncMapKey(key);
  }

  // Clear deletes all the entries.
  Clear(): void {
    this.primitive.clear();
    this.nanNumberEntries.length = 0;
  }

  // Range calls f sequentially for each key and value present in the map.
  // If f returns false, Range stops the iteration.
  Range(f: (key: K, value: V) => bool): void {
    // Snapshot keys so the callback may safely Store/Delete during iteration,
    // matching sync.Map's "Range does not necessarily correspond to any
    // consistent snapshot" but allowing concurrent mutation.
    for (const [key, entry] of globalThis.Array.from(this.primitive.entries())) {
      if (!f(key, entry.value)) {
        return;
      }
    }
    for (const [key, value] of globalThis.Array.from(this.nanNumberEntries)) {
      if (!f(key, value)) {
        return;
      }
    }
  }
}

const mapKeyBucketPrimitive: int = 1;
const mapKeyBucketNanNumber: int = 2;

function mapKeyBucket(key: unknown): int {
  const keyType = typeof key;
  if (keyType === "number") {
    return globalThis.Number.isNaN(key) ? mapKeyBucketNanNumber : mapKeyBucketPrimitive;
  }
  if (keyType === "string" || keyType === "boolean" || keyType === "bigint") {
    return mapKeyBucketPrimitive;
  }
  return 0;
}

function throwUnsupportedSyncMapKey(key: unknown): never {
  throw new TypeError(`sync.Map key requires an explicit Go map-key descriptor; unsupported synchronous key type ${typeof key}`);
}

export class Pool<T = unknown> {
  New?: () => T;
  private readonly items: T[] = [];

  Get(): T | undefined {
    const item = this.items.pop();
    if (item !== undefined) {
      return item;
    }
    if (this.New !== undefined) {
      return this.New();
    }
    return undefined;
  }

  Put(x: GoPtr<T>): void {
    if (x !== undefined && x !== null) {
      this.items.push(x);
    }
  }
}

// Cond implements a condition variable. Single-threaded, no other goroutine can
// Signal a blocked Wait, so callers always poll their predicate after Wait. We
// model Wait as a non-blocking yield point and Signal/Broadcast as no-ops.
export class Cond {
  // L is held while observing or changing the condition.
  readonly L: Locker;

  constructor(l: Locker) {
    this.L = l;
  }

  // Wait atomically unlocks L and suspends; on wakeup it re-locks L. Single-threaded
  // there is nothing to wait for, so it returns immediately with L re-locked.
  Wait(): void {
    throw new Error("sync.Cond.Wait would block in the synchronous runtime");
  }

  // Signal wakes one goroutine waiting on c, if there is any. No-op single-threaded.
  Signal(): void {}

  // Broadcast wakes all goroutines waiting on c. No-op single-threaded.
  Broadcast(): void {}
}

// NewCond returns a new Cond with Locker l.
export function NewCond(l: Locker): Cond {
  return new Cond(l);
}

// WaitGroup waits for a collection of goroutines to finish. Single-threaded, all
// spawned work has already completed synchronously by the time Wait is called, so
// the counter is tracked for fidelity but Wait never blocks.
export class WaitGroup {
  private counter: int = 0;

  // Add adds delta, which may be negative, to the WaitGroup counter.
  Add(delta: int): void {
    this.counter = this.counter + delta;
    if (this.counter < 0) {
      throw new globalThis.Error("sync: negative WaitGroup counter");
    }
  }

  // Done decrements the WaitGroup counter by one.
  Done(): void {
    this.Add(-1);
  }

  // Wait blocks until the WaitGroup counter is zero. Single-threaded it returns
  // immediately (any goroutines ran synchronously before Wait was reached).
  Wait(): void {
    if (this.counter !== 0) throw new Error("sync.WaitGroup.Wait would block in the synchronous runtime");
  }

  // Go runs f in a new goroutine and tracks it. Single-threaded, f runs synchronously.
  Go(f: () => void): void {
    this.Add(1);
    try {
      f();
    } finally {
      this.Done();
    }
  }
}
