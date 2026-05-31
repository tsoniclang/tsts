import { checkSourceFile } from "../checker/index.js";
import type { Program, ProgramDiagnostic } from "../program/index.js";

export interface CheckerPoolOptions {
  readonly maxWorkers?: number;
  readonly log?: (message: string) => void;
}

export class CheckerPool {
  readonly options: CheckerPoolOptions;
  private program: Program | undefined;
  private readonly checkers: (CheckerSlot | undefined)[];
  private readonly inUse = new Set<CheckerSlot>();
  private readonly fileAssociations = new Map<string, number>();
  private readonly requestAssociations = new Map<string, number>();
  private readonly globalDiagnostics: ProgramDiagnostic[] = [];
  private readonly globalDiagnosticCheckerCount: number[];
  private globalDiagnosticsChanged = false;

  constructor(options: CheckerPoolOptions = {}) {
    this.options = options;
    const maxWorkers = Math.max(1, Math.trunc(options.maxWorkers ?? 4));
    this.checkers = new Array(maxWorkers);
    this.globalDiagnosticCheckerCount = new Array(maxWorkers).fill(0);
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
    this.globalDiagnostics.length = 0;
    this.globalDiagnostics.push(...diagnostics);
    this.globalDiagnosticsChanged = diagnostics.length > 0;
    return diagnostics;
  }

  getChecker(requestId: string | undefined, fileName: string | undefined): { checker: CheckerSlot; release: () => void } {
    if (requestId !== undefined) {
      const requestChecker = this.getRequestChecker(requestId);
      if (requestChecker !== undefined) return requestChecker;
    }

    if (fileName !== undefined) {
      const associatedIndex = this.fileAssociations.get(fileName);
      if (associatedIndex !== undefined) {
        const checker = this.checkers[associatedIndex];
        if (checker !== undefined && !this.inUse.has(checker)) {
          return this.acquireAtIndex(checker, associatedIndex, requestId);
        }
      }
    }

    const { checker, index } = this.getAvailableOrCreateChecker();
    if (fileName !== undefined) this.fileAssociations.set(fileName, index);
    return this.acquireAtIndex(checker, index, requestId);
  }

  getGlobalDiagnostics(): readonly ProgramDiagnostic[] {
    return [...this.globalDiagnostics];
  }

  takeNewGlobalDiagnostics(): boolean {
    const changed = this.globalDiagnosticsChanged;
    this.globalDiagnosticsChanged = false;
    return changed;
  }

  close(): void {
    this.globalDiagnostics.length = 0;
    this.fileAssociations.clear();
    this.requestAssociations.clear();
    this.inUse.clear();
    this.checkers.fill(undefined);
    this.globalDiagnosticCheckerCount.fill(0);
    this.globalDiagnosticsChanged = false;
  }

  private getRequestChecker(requestId: string): { checker: CheckerSlot; release: () => void } | undefined {
    const index = this.requestAssociations.get(requestId);
    if (index === undefined) return undefined;
    const checker = this.checkers[index];
    if (checker === undefined) return undefined;
    if (this.inUse.has(checker)) return { checker, release: noop };
    return this.acquireAtIndex(checker, index, requestId);
  }

  private getAvailableOrCreateChecker(): { checker: CheckerSlot; index: number } {
    for (let index = 0; index < this.checkers.length; index += 1) {
      const checker = this.checkers[index];
      if (checker !== undefined && !this.inUse.has(checker)) return { checker, index };
    }
    for (let index = 0; index < this.checkers.length; index += 1) {
      if (this.checkers[index] !== undefined) continue;
      const checker = this.createChecker(index);
      return { checker, index };
    }
    this.options.log?.("checkerpool: all checkers are busy; reusing slot 0 in single-threaded fallback");
    return { checker: this.checkers[0]!, index: 0 };
  }

  private createChecker(index: number): CheckerSlot {
    const slot = new CheckerSlot(this.program);
    this.checkers[index] = slot;
    return slot;
  }

  private acquireAtIndex(checker: CheckerSlot, index: number, requestId: string | undefined): { checker: CheckerSlot; release: () => void } {
    this.inUse.add(checker);
    if (requestId !== undefined) this.requestAssociations.set(requestId, index);
    return {
      checker,
      release: once(() => {
        if (requestId !== undefined) this.requestAssociations.delete(requestId);
        this.mergeGlobalDiagnosticsFromChecker(index, checker);
        this.inUse.delete(checker);
      }),
    };
  }

  private mergeGlobalDiagnosticsFromChecker(index: number, checker: CheckerSlot): void {
    const globals = checker.getGlobalDiagnostics();
    if (globals.length === this.globalDiagnosticCheckerCount[index]) return;
    this.globalDiagnosticCheckerCount[index] = globals.length;
    const before = this.globalDiagnostics.length;
    const merged = sortAndDeduplicateProgramDiagnostics([...this.globalDiagnostics, ...globals]);
    this.globalDiagnostics.length = 0;
    this.globalDiagnostics.push(...merged);
    if (this.globalDiagnostics.length !== before) this.globalDiagnosticsChanged = true;
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
