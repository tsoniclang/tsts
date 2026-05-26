/**
 * Work-group abstraction for parallel/sequential task fan-out.
 *
 * Port of TS-Go `internal/core/workgroup.go` (123 LoC). Single-thread
 * JS runtime makes the "parallel" vs "single-threaded" distinction
 * minor here — both modes execute synchronously, but the parallel
 * variant uses `Promise.all` of `Promise.resolve().then(fn)` so the
 * tasks interleave with microtask scheduling when their bodies are
 * async, while the single-threaded variant drains the queue
 * synchronously.
 *
 * `ThrottleGroup` maps to a bounded-concurrency promise scheduler.
 */

export interface WorkGroup {
  /** Queue a function to run. May execute immediately or be deferred until runAndWait. */
  queue(fn: () => void | Promise<void>): void;
  /** Run all queued functions, blocking until they complete. */
  runAndWait(): Promise<void>;
}

export function newWorkGroup(singleThreaded: boolean): WorkGroup {
  return singleThreaded ? new SingleThreadedWorkGroup() : new ParallelWorkGroup();
}

class ParallelWorkGroup implements WorkGroup {
  private done = false;
  private readonly pending: Array<Promise<void>> = [];

  queue(fn: () => void | Promise<void>): void {
    if (this.done) throw new Error("queue called after runAndWait returned");
    this.pending.push(Promise.resolve().then(fn));
  }

  async runAndWait(): Promise<void> {
    try {
      await Promise.all(this.pending);
    } finally {
      this.done = true;
    }
  }
}

class SingleThreadedWorkGroup implements WorkGroup {
  private done = false;
  private readonly fns: Array<() => void | Promise<void>> = [];

  queue(fn: () => void | Promise<void>): void {
    if (this.done) throw new Error("queue called after runAndWait returned");
    this.fns.push(fn);
  }

  async runAndWait(): Promise<void> {
    try {
      // Upstream pops from the end (LIFO). Preserve that order so any
      // dependencies on Go's iteration order remain identical.
      while (this.fns.length > 0) {
        const fn = this.fns.pop()!;
        await fn();
      }
    } finally {
      this.done = true;
    }
  }
}

// ---------------------------------------------------------------------------
// ThrottleGroup — bounded-concurrency `Promise.all` runner
// ---------------------------------------------------------------------------

/**
 * Schedules async tasks with a maximum concurrency. `concurrency`
 * mirrors the Go `chan struct{}` semaphore size — at most this many
 * `go(fn)` calls execute simultaneously.
 *
 * `wait()` returns the first error thrown by any task, or undefined.
 */
export class ThrottleGroup {
  private readonly concurrency: number;
  private active = 0;
  private readonly queue: Array<() => void> = [];
  private readonly tasks: Array<Promise<void>> = [];
  private firstError: unknown;

  constructor(concurrency: number) {
    this.concurrency = Math.max(1, concurrency);
  }

  go(fn: () => Promise<void>): void {
    const slot = new Promise<void>((resolve) => {
      const run = async () => {
        this.active += 1;
        try {
          await fn();
        } catch (err) {
          if (this.firstError === undefined) this.firstError = err;
        } finally {
          this.active -= 1;
          resolve();
          this.drain();
        }
      };
      if (this.active < this.concurrency) {
        run();
      } else {
        this.queue.push(run);
      }
    });
    this.tasks.push(slot);
  }

  private drain(): void {
    while (this.active < this.concurrency && this.queue.length > 0) {
      const next = this.queue.shift()!;
      next();
    }
  }

  async wait(): Promise<unknown> {
    await Promise.all(this.tasks);
    return this.firstError;
  }
}

export function newThrottleGroup(concurrency: number): ThrottleGroup {
  return new ThrottleGroup(concurrency);
}
