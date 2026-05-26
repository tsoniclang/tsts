/**
 * Semaphore for bounded concurrency.
 *
 * Port of TS-Go `internal/core/semaphore.go` (52 LoC).
 * `acquire` blocks (awaits) until a slot is available, returning a
 * release callback. `tryAcquire` is non-blocking and returns false
 * immediately if no slot is available.
 */

export interface Semaphore {
  acquire(): Promise<() => void>;
  tryAcquire(): { release: () => void; acquired: boolean };
}

export class UnlimitedSemaphore implements Semaphore {
  async acquire(): Promise<() => void> {
    return () => {};
  }
  tryAcquire(): { release: () => void; acquired: boolean } {
    return { release: () => {}, acquired: true };
  }
}

export class LimitedSemaphore implements Semaphore {
  private readonly maxConcurrency: number;
  private active = 0;
  private readonly waiters: Array<() => void> = [];

  constructor(maxConcurrency: number) {
    if (maxConcurrency <= 0) throw new Error("maxConcurrency must be positive");
    this.maxConcurrency = maxConcurrency;
  }

  async acquire(): Promise<() => void> {
    if (this.active < this.maxConcurrency) {
      this.active += 1;
      return () => this.release();
    }
    return new Promise<() => void>((resolve) => {
      this.waiters.push(() => {
        this.active += 1;
        resolve(() => this.release());
      });
    });
  }

  tryAcquire(): { release: () => void; acquired: boolean } {
    if (this.active < this.maxConcurrency) {
      this.active += 1;
      return { release: () => this.release(), acquired: true };
    }
    return { release: () => {}, acquired: false };
  }

  private release(): void {
    this.active -= 1;
    if (this.waiters.length > 0) {
      const next = this.waiters.shift()!;
      next();
    }
  }
}

export function newLimitedSemaphore(maxConcurrency: number): LimitedSemaphore {
  return new LimitedSemaphore(maxConcurrency);
}
