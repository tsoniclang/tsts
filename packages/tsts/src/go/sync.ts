import type { bool, int } from "./scalars.js";
import type { GoComparableInterface, GoFunc, GoInterface, GoMap, GoPtr } from "./compat.js";
import { GoComparableInterfaceKey, GoMapGetExisting, GoMapIsNil, GoMapMake, GoNilMap } from "./compat.js";

// Go: package sync
//
// TypeScript is single-threaded, so the concurrency primitives degrade to
// faithful single-threaded equivalents:
//   - Mutex/RWMutex Lock/Unlock/RLock/RUnlock are no-ops (there is no other
//     goroutine that could ever hold the lock).
//   - Once.Do / OnceFunc / OnceValue / OnceValues run the function exactly once
//     and memoize the result.
//   - Map wraps a plain Map (matching sync.Map's (value, ok) and Range contract).
//   - Pool calls its New factory on Get (since nothing is ever retained across
//     goroutines, a fresh value is always valid); Put is a no-op.
//   - WaitGroup tracks a counter; Wait returns immediately because all "goroutines"
//     in this single-threaded port run synchronously before Wait is reached.
//   - Cond's Wait would block forever single-threaded (no other goroutine can
//     Signal), so we model it as a no-op wakeup paired with Signal/Broadcast,
//     which matches how the checker pool polls after each wakeup.

// Mutex is a mutual exclusion lock. Single-threaded: Lock/Unlock are no-ops.
export class Mutex {
  Lock(): void {}
  Unlock(): void {}
  TryLock(): bool {
    return true;
  }
}

// RWMutex is a reader/writer mutual exclusion lock. Single-threaded: all no-ops.
export class RWMutex {
  Lock(): void {}
  Unlock(): void {}
  RLock(): void {}
  RUnlock(): void {}
  TryLock(): bool {
    return true;
  }
  TryRLock(): bool {
    return true;
  }
  // RLocker returns a Locker interface backed by the read lock.
  RLocker(): GoInterface<Locker> {
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
  Do(f: GoFunc<() => void>): void {
    if (!this.done) {
      this.done = true;
      f!();
    }
  }
}

// OnceFunc returns a function that invokes f only once. The returned function may
// be called concurrently in Go; here it is simply memoized.
export function OnceFunc(f: GoFunc<() => void>): GoFunc<() => void> {
  const once = new Once();
  return (): void => {
    once.Do(f);
  };
}

// OnceValue returns a function that invokes f only once and returns the value
// returned by f. The returned function may be called any number of times.
export function OnceValue<T>(f: GoFunc<() => T>): GoFunc<() => T> {
  let called = false;
  let value!: T;
  return (): T => {
    if (!called) {
      called = true;
      value = f!();
    }
    return value;
  };
}

// OnceValues returns a function that invokes f only once and returns the two
// values returned by f. Modeled as a tuple return to match Go's (T1, T2).
export function OnceValues<T1, T2>(f: GoFunc<() => [T1, T2]>): GoFunc<() => [T1, T2]> {
  let called = false;
  let v1!: T1;
  let v2!: T2;
  return (): [T1, T2] => {
    if (!called) {
      called = true;
      const result = f!();
      v1 = result[0];
      v2 = result[1];
    }
    return [v1, v2];
  };
}

// Map is like a Go sync.Map: a concurrent map of any/any. Single-threaded, it is
// a thin wrapper over a plain Map preserving the (value, ok) and Range contracts.
export class Map {
  private entries: GoMap<GoComparableInterface, GoInterface<unknown>> = GoNilMap();

  // Load returns the value stored for key, and whether it was present.
  Load(key: GoInterface<unknown>): [GoInterface<unknown>, bool] {
    const comparableKey = key as GoComparableInterface;
    return this.entries.has(comparableKey)
      ? [GoMapGetExisting(this.entries, comparableKey), true]
      : [undefined, false];
  }

  // Store sets the value for a key.
  Store(key: GoInterface<unknown>, value: GoInterface<unknown>): void {
    const comparableKey = key as GoComparableInterface;
    if (GoMapIsNil(this.entries)) this.entries = GoMapMake<GoComparableInterface, GoInterface<unknown>>(GoComparableInterfaceKey);
    this.entries.set(comparableKey, value);
  }

  // LoadOrStore returns the existing value if present; otherwise stores and returns
  // the given value. loaded is true if the value was already present.
  LoadOrStore(key: GoInterface<unknown>, value: GoInterface<unknown>): [GoInterface<unknown>, bool] {
    const comparableKey = key as GoComparableInterface;
    if (this.entries.has(comparableKey)) return [GoMapGetExisting(this.entries, comparableKey), true];
    if (GoMapIsNil(this.entries)) this.entries = GoMapMake<GoComparableInterface, GoInterface<unknown>>(GoComparableInterfaceKey);
    this.entries.set(comparableKey, value);
    return [value, false];
  }

  // LoadAndDelete deletes the value for a key, returning the previous value if any.
  LoadAndDelete(key: GoInterface<unknown>): [GoInterface<unknown>, bool] {
    const comparableKey = key as GoComparableInterface;
    if (!this.entries.has(comparableKey)) return [undefined, false];
    const existing = GoMapGetExisting(this.entries, comparableKey);
    this.entries.delete(comparableKey);
    return [existing, true];
  }

  // Delete deletes the value for a key.
  Delete(key: GoInterface<unknown>): void {
    this.entries.delete(key as GoComparableInterface);
  }

  // Clear deletes all the entries.
  Clear(): void {
    this.entries.clear();
  }

  // Range calls f sequentially for each key and value present in the map.
  // If f returns false, Range stops the iteration.
  Range(f: GoFunc<(key: GoInterface<unknown>, value: GoInterface<unknown>) => bool>): void {
    // Snapshot keys so the callback may safely Store/Delete during iteration,
    // matching sync.Map's "Range does not necessarily correspond to any
    // consistent snapshot" but allowing concurrent mutation.
    for (const [key, value] of globalThis.Array.from(this.entries)) {
      if (!f!(key, value)) {
        return;
      }
    }
  }
}

export class Pool {
  New!: GoFunc<() => GoInterface<unknown>>;
  private readonly items: Array<GoInterface<unknown>> = [];

  Get(): GoInterface<unknown> {
    const item = this.items.pop();
    if (item !== undefined) {
      return item;
    }
    if (this.New !== undefined) {
      return this.New();
    }
    return undefined;
  }

  Put(x: GoInterface<unknown>): void {
    if (x !== undefined) {
      this.items.push(x);
    }
  }
}

// Cond implements a condition variable. Single-threaded, no other goroutine can
// Signal a blocked Wait, so callers always poll their predicate after Wait. We
// model Wait as a non-blocking yield point and Signal/Broadcast as no-ops.
export class Cond {
  // L is held while observing or changing the condition.
  L!: GoInterface<Locker>;

  constructor(l: GoInterface<Locker>) {
    this.L = l;
  }

  // Wait atomically unlocks L and suspends; on wakeup it re-locks L. Single-threaded
  // there is nothing to wait for, so it returns immediately with L re-locked.
  Wait(): void {
    this.L!.Unlock();
    this.L!.Lock();
  }

  // Signal wakes one goroutine waiting on c, if there is any. No-op single-threaded.
  Signal(): void {}

  // Broadcast wakes all goroutines waiting on c. No-op single-threaded.
  Broadcast(): void {}
}

// NewCond returns a new Cond with Locker l.
export function NewCond(l: GoInterface<Locker>): GoPtr<Cond> {
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
  Wait(): void {}

  // Go runs f in a new goroutine and tracks it. Single-threaded, f runs synchronously.
  Go(f: GoFunc<() => void>): void {
    this.Add(1);
    try {
      f!();
    } finally {
      this.Done();
    }
  }
}
