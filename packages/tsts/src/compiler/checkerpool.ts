/**
 * Checker pool.
 *
 * Port of TS-Go `internal/compiler/checkerpool.go` (~167 LoC).
 * Holds N reusable checker instances for parallel diagnostics collection.
 */

import type { Program } from "./program.js";
import { type Checker, newChecker } from "../checker/index.js";

export type { Checker };

export class CheckerPool {
  readonly program: Program;
  readonly poolSize: number;
  checkers: Checker[] = [];
  busy: Set<Checker> = new Set();

  constructor(program: Program, poolSize: number) {
    this.program = program;
    this.poolSize = poolSize;
  }

  acquire(): Checker {
    const c = this.checkers.pop();
    if (c !== undefined) {
      this.busy.add(c);
      return c;
    }
    const created = newChecker();
    this.busy.add(created);
    return created;
  }

  release(c: Checker): void {
    if (!this.busy.has(c)) return;
    this.busy.delete(c);
    this.checkers.push(c);
  }

  forEachParallel(cb: (idx: number, checker: Checker) => void): void {
    for (let i = 0; i < this.poolSize; i += 1) {
      const c = this.acquire();
      try {
        cb(i, c);
      } finally {
        this.release(c);
      }
    }
  }

  size(): number {
    return this.poolSize;
  }
}

export function newCheckerPool(program: Program, poolSize: number): CheckerPool {
  return new CheckerPool(program, poolSize);
}
