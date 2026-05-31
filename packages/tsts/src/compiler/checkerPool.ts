/**
 * Checker pool.
 *
 * Port of TS-Go `internal/compiler/checkerpool.go` (~167 LoC).
 * Holds N reusable checker instances for parallel diagnostics collection.
 */

import type { Program } from "./program.js";
import type { SourceFile, Diagnostic } from "../ast/index.js";
import { type Checker, newChecker } from "../checker/index.js";

export type { Checker };

export class CheckerPool {
  readonly program: Program;
  readonly poolSize: number;
  private readonly available: Checker[] = [];
  private readonly busy: Set<Checker> = new Set();
  private checkers: Checker[] | undefined;
  private fileAssociations: Map<SourceFile, Checker> | undefined;

  constructor(program: Program, poolSize?: number) {
    this.program = program;
    const requested = poolSize ?? checkerCountForProgram(program);
    this.poolSize = Math.max(1, Math.min(requested, Math.max(1, program.sourceFiles().length), 256));
  }

  acquire(): Checker {
    this.createCheckers();
    const c = this.available.pop();
    if (c !== undefined) {
      this.busy.add(c);
      return c;
    }
    const created = this.checkers![0]!;
    this.busy.add(created);
    return created;
  }

  release(c: Checker): void {
    if (!this.busy.has(c)) return;
    this.busy.delete(c);
    this.available.push(c);
  }

  forEachParallel(cb: (idx: number, checker: Checker) => void): void {
    this.createCheckers();
    const checkers = this.checkers!;
    for (let i = 0; i < checkers.length; i += 1) {
      cb(i, checkers[i]!);
    }
  }

  size(): number {
    return this.poolSize;
  }

  getChecker(_ctx: unknown, file: SourceFile | undefined): { checker: Checker; release: () => void } {
    if (file !== undefined) return this.getCheckerForFileExclusive(_ctx, file);
    this.createCheckers();
    const checker = this.checkers![0]!;
    this.busy.add(checker);
    return { checker, release: once(() => this.busy.delete(checker)) };
  }

  getCheckerForFileNonExclusive(file: SourceFile): { checker: Checker; release: () => void } {
    this.createCheckers();
    return { checker: this.fileAssociations!.get(file) ?? this.checkers![0]!, release: noop };
  }

  getCheckerForFileExclusive(_ctx: unknown, file: SourceFile): { checker: Checker; release: () => void } {
    this.createCheckers();
    const checker = this.fileAssociations!.get(file) ?? this.checkers![0]!;
    this.busy.add(checker);
    return { checker, release: once(() => this.busy.delete(checker)) };
  }

  getCheckerNonExclusive(): { checker: Checker; release: () => void } {
    this.createCheckers();
    return { checker: this.checkers![0]!, release: noop };
  }

  forEachCheckerGroupDo(
    ctx: unknown,
    files: readonly SourceFile[],
    singleThreaded: boolean,
    cb: (checker: Checker, fileIndex: number, file: SourceFile) => void,
  ): void {
    void ctx; void singleThreaded;
    this.createCheckers();
    const associations = this.fileAssociations!;
    const checkers = this.checkers!;
    for (let checkerIndex = 0; checkerIndex < checkers.length; checkerIndex += 1) {
      const checker = checkers[checkerIndex]!;
      for (let fileIndex = 0; fileIndex < files.length; fileIndex += 1) {
        const file = files[fileIndex]!;
        if ((associations.get(file) ?? checkers[0]!) === checker) {
          cb(checker, fileIndex, file);
        }
      }
    }
  }

  getGlobalDiagnostics(): readonly Diagnostic[] {
    this.createCheckers();
    const diagnostics: Diagnostic[] = [];
    for (const checker of this.checkers!) {
      diagnostics.push(...(((checker as unknown as { getGlobalDiagnostics?: () => readonly Diagnostic[] }).getGlobalDiagnostics?.()) ?? []));
    }
    return sortAndDeduplicateDiagnostics(diagnostics);
  }

  private createCheckers(): void {
    if (this.checkers !== undefined) return;
    const checkers: Checker[] = [];
    for (let index = 0; index < this.poolSize; index += 1) {
      checkers.push(newChecker());
    }
    this.checkers = checkers;
    this.available.push(...checkers);
    const associations = new Map<SourceFile, Checker>();
    const files = this.program.sourceFiles();
    for (let index = 0; index < files.length; index += 1) {
      associations.set(files[index]!, checkers[index % checkers.length]!);
    }
    this.fileAssociations = associations;
  }
}

export function newCheckerPool(program: Program, poolSize?: number): CheckerPool {
  return new CheckerPool(program, poolSize);
}

function checkerCountForProgram(program: Program): number {
  const options = program.options() as unknown as { readonly checkers?: number };
  if (program.singleThreaded()) return 1;
  if (typeof options.checkers === "number" && Number.isFinite(options.checkers)) return Math.trunc(options.checkers);
  return 4;
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

function sortAndDeduplicateDiagnostics(diagnostics: readonly Diagnostic[]): readonly Diagnostic[] {
  const seen = new Set<string>();
  const result: Diagnostic[] = [];
  for (const diagnostic of [...diagnostics].sort(compareDiagnostics)) {
    const key = `${diagnostic.file?.fileName ?? ""}:${diagnostic.start ?? -1}:${diagnostic.length ?? -1}:${diagnostic.code}:${diagnostic.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(diagnostic);
  }
  return result;
}

function compareDiagnostics(left: Diagnostic, right: Diagnostic): number {
  return (left.file?.fileName ?? "").localeCompare(right.file?.fileName ?? "")
    || (left.start ?? -1) - (right.start ?? -1)
    || left.code - right.code
    || left.text.localeCompare(right.text);
}
