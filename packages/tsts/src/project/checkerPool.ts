import { checkSourceFile } from "../checker/index.js";
import type { Program, ProgramDiagnostic } from "../program/index.js";

export interface CheckerPoolOptions {
  readonly maxWorkers?: number;
  readonly log?: (message: string) => void;
}

export interface CheckerLease {
  readonly checker: CheckerSlot;
  readonly release: () => void;
}

export class CheckerPool {
  readonly options: CheckerPoolOptions;
  private readonly maxCheckers: number;
  private program: Program | undefined;
  private readonly checkers: (CheckerSlot | undefined)[];
  private readonly inUse = new Set<CheckerSlot>();
  private fileAssociations = new Map<string, number>();
  private readonly requestAssociations = new Map<string, number>();
  private readonly log: (message: string) => void;
  private readonly globalDiagAccumulated: ProgramDiagnostic[] = [];
  private globalDiagChanged = false;
  private readonly globalDiagCheckerCount: number[];

  constructor(options: CheckerPoolOptions = {}) {
    this.options = options;
    this.maxCheckers = Math.max(1, Math.trunc(options.maxWorkers ?? 4));
    this.checkers = new Array(this.maxCheckers);
    this.log = options.log ?? ((): void => {});
    this.globalDiagCheckerCount = new Array(this.maxCheckers).fill(0);
  }

  checkProgram(program: Program): readonly ProgramDiagnostic[] {
    this.program = program;
    const diagnostics: ProgramDiagnostic[] = [];
    for (const sourceFile of program.sourceFiles) {
      const { checker, release } = this.getChecker(undefined, sourceFile.fileName);
      try {
        const result = checker.check(sourceFile.sourceFile);
        diagnostics.push(...result);
      } finally {
        release();
      }
    }
    this.globalDiagAccumulated.length = 0;
    this.globalDiagAccumulated.push(...diagnostics);
    this.globalDiagChanged = diagnostics.length > 0;
    return diagnostics;
  }

  // GetChecker acquires a checker for the given request/file, creating one if the
  // pool is not yet full and reusing an existing one otherwise. The returned
  // release callback must be invoked when the caller is done with the checker.
  getChecker(requestId: string | undefined, fileName: string | undefined): CheckerLease {
    if (requestId !== undefined && requestId !== "") {
      const [requestChecker, requestRelease] = this.getRequestCheckerLocked(requestId);
      if (requestChecker !== undefined) {
        return { checker: requestChecker, release: requestRelease };
      }
    }

    if (fileName !== undefined) {
      const index = this.fileAssociations.get(fileName);
      if (index !== undefined) {
        const checker = this.checkers[index];
        if (checker !== undefined) {
          if (!this.inUse.has(checker)) {
            this.inUse.add(checker);
            if (requestId !== undefined && requestId !== "") this.requestAssociations.set(requestId, index);
            return { checker, release: this.createRelease(requestId, index, checker) };
          }
        }
      }
    }

    const [checker, index] = this.getCheckerLocked(requestId);
    if (fileName !== undefined) this.fileAssociations.set(fileName, index);
    return { checker, release: this.createRelease(requestId, index, checker) };
  }

  getGlobalDiagnostics(): readonly ProgramDiagnostic[] {
    return [...this.globalDiagAccumulated];
  }

  takeNewGlobalDiagnostics(): boolean {
    const changed = this.globalDiagChanged;
    this.globalDiagChanged = false;
    return changed;
  }

  close(): void {
    this.globalDiagAccumulated.length = 0;
    this.fileAssociations = new Map();
    this.requestAssociations.clear();
    this.inUse.clear();
    this.checkers.fill(undefined);
    this.globalDiagCheckerCount.fill(0);
    this.globalDiagChanged = false;
  }

  private getCheckerLocked(requestId: string | undefined): readonly [CheckerSlot, number] {
    const [available, availableIndex] = this.getImmediatelyAvailableChecker();
    if (available !== undefined) {
      this.inUse.add(available);
      if (requestId !== undefined && requestId !== "") this.requestAssociations.set(requestId, availableIndex);
      return [available, availableIndex];
    }

    if (!this.isFullLocked()) {
      const [created, createdIndex] = this.createCheckerLocked();
      this.inUse.add(created);
      if (requestId !== undefined && requestId !== "") this.requestAssociations.set(requestId, createdIndex);
      return [created, createdIndex];
    }

    const [waited, waitedIndex] = this.waitForAvailableChecker();
    this.inUse.add(waited);
    if (requestId !== undefined && requestId !== "") this.requestAssociations.set(requestId, waitedIndex);
    return [waited, waitedIndex];
  }

  private getRequestCheckerLocked(requestId: string): readonly [CheckerSlot | undefined, () => void] {
    const index = this.requestAssociations.get(requestId);
    if (index !== undefined) {
      const checker = this.checkers[index];
      if (checker !== undefined) {
        if (!this.inUse.has(checker)) {
          this.inUse.add(checker);
          return [checker, this.createRelease(requestId, index, checker)];
        }
        // Checker is in use, but by the same request - assume it's the
        // same goroutine or is managing its own synchronization
        return [checker, noop];
      }
    }
    return [undefined, noop];
  }

  private getImmediatelyAvailableChecker(): readonly [CheckerSlot | undefined, number] {
    for (let i = 0; i < this.checkers.length; i += 1) {
      const checker = this.checkers[i];
      if (checker === undefined) {
        continue;
      }
      if (!this.inUse.has(checker)) {
        return [checker, i];
      }
    }

    return [undefined, -1];
  }

  private waitForAvailableChecker(): readonly [CheckerSlot, number] {
    this.log("checkerpool: Waiting for an available checker");
    // TS-Go blocks on p.cond.Wait() until another goroutine releases a checker, then
    // loops calling getImmediatelyAvailableChecker until one is free. TSTS runs
    // single-threaded, so a full pool with nothing available cannot be unblocked by
    // waiting; the loop instead reuses slot 0 (the single-threaded equivalent of being
    // handed the next freed checker).
    for (;;) {
      const [checker, index] = this.getImmediatelyAvailableChecker();
      if (checker !== undefined) {
        return [checker, index];
      }
      const slot0 = this.checkers[0];
      if (slot0 !== undefined) {
        return [slot0, 0];
      }
      return [this.createCheckerLocked()[0], 0];
    }
  }

  private createRelease(requestId: string | undefined, index: number, checker: CheckerSlot): () => void {
    return once(() => {
      if (requestId !== undefined && requestId !== "") this.requestAssociations.delete(requestId);
      if (checker.wasCanceled()) {
        // Canceled checkers must be disposed
        this.log(`checkerpool: Checker for request ${requestId ?? ""} was canceled, disposing it`);
        this.checkers[index] = undefined;
        this.inUse.delete(checker);
        this.globalDiagCheckerCount[index] = 0;
      } else {
        this.mergeGlobalDiagnosticsFromCheckerLocked(index, checker);
        this.inUse.delete(checker);
      }
    });
  }

  // mergeGlobalDiagnosticsFromCheckerLocked checks if the given checker has produced new
  // global diagnostics since the last time we looked, and if so merges them into the
  // accumulated set.
  private mergeGlobalDiagnosticsFromCheckerLocked(index: number, checker: CheckerSlot): void {
    const globals = checker.getGlobalDiagnostics();
    if (globals.length === this.globalDiagCheckerCount[index]) {
      return;
    }
    this.globalDiagCheckerCount[index] = globals.length;
    const before = this.globalDiagAccumulated.length;
    const merged = sortAndDeduplicateProgramDiagnostics([...this.globalDiagAccumulated, ...globals]);
    this.globalDiagAccumulated.length = 0;
    this.globalDiagAccumulated.push(...merged);
    if (this.globalDiagAccumulated.length !== before) {
      this.globalDiagChanged = true;
    }
  }

  private isFullLocked(): boolean {
    for (const checker of this.checkers) {
      if (checker === undefined) {
        return false;
      }
    }
    return true;
  }

  private createCheckerLocked(): readonly [CheckerSlot, number] {
    for (let i = 0; i < this.checkers.length; i += 1) {
      const existing = this.checkers[i];
      if (existing === undefined) {
        const checker = new CheckerSlot(this.program);
        this.checkers[i] = checker;
        return [checker, i];
      }
    }
    throw new Error("called createCheckerLocked when pool is full");
  }
}

export function newCheckerPool(options?: CheckerPoolOptions): CheckerPool {
  return new CheckerPool(options);
}

export class CheckerSlot {
  readonly program: Program | undefined;
  private readonly globalDiagnostics: ProgramDiagnostic[] = [];
  private canceled = false;

  constructor(program: Program | undefined) {
    this.program = program;
  }

  check(sourceFile: Program["sourceFiles"][number]["sourceFile"]): readonly ProgramDiagnostic[] {
    if (this.canceled) return [];
    const result = checkSourceFile(sourceFile);
    const diagnostics = result.diagnostics.map(diagnostic => ({
      fileName: sourceFile.fileName,
      message: diagnostic.message,
    }));
    this.globalDiagnostics.push(...diagnostics.filter(diagnostic => diagnostic.fileName === ""));
    return diagnostics;
  }

  getGlobalDiagnostics(): readonly ProgramDiagnostic[] {
    return this.globalDiagnostics;
  }

  wasCanceled(): boolean {
    return this.canceled;
  }

  cancel(): void {
    this.canceled = true;
  }
}

function once(action: () => void): () => void {
  let done = false;
  return () => {
    if (done) return;
    done = true;
    action();
  };
}

function noop(): void {
}

function sortAndDeduplicateProgramDiagnostics(diagnostics: readonly ProgramDiagnostic[]): readonly ProgramDiagnostic[] {
  const seen = new Set<string>();
  const result: ProgramDiagnostic[] = [];
  for (const diagnostic of [...diagnostics].sort(compareProgramDiagnostics)) {
    const key = `${diagnostic.fileName}:${diagnostic.message}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(diagnostic);
  }
  return result;
}

function compareProgramDiagnostics(left: ProgramDiagnostic, right: ProgramDiagnostic): number {
  return left.fileName.localeCompare(right.fileName) || left.message.localeCompare(right.message);
}
