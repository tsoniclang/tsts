import {
  SnapshotFileEmitKind,
  getPendingEmitKind,
  type ProgramSnapshot,
} from "./snapshot.js";

export interface EmitResult<Diagnostic = unknown> {
  readonly emitSkipped: boolean;
  readonly diagnostics: readonly Diagnostic[];
  readonly emittedFiles: readonly string[];
}

export interface EmitProgram<SourceFile = unknown, Diagnostic = unknown> {
  readonly getSourceFileByPath: (path: string) => SourceFile | undefined;
  readonly sourceFileMayBeEmitted: (file: SourceFile, forceDtsEmit: boolean) => boolean;
  readonly emit: (file: SourceFile, emitOnly: EmitOnly) => EmitResult<Diagnostic>;
  readonly getDeclarationDiagnostics: (file: SourceFile | undefined) => readonly Diagnostic[];
}

export enum EmitOnly {
  All = 0,
  Js = 1,
  Dts = 2,
}

export interface EmitUpdate<Diagnostic = unknown> {
  readonly pendingKind: SnapshotFileEmitKind;
  readonly result: EmitResult<Diagnostic>;
  readonly dtsErrorsFromCache: boolean;
}

export interface EmitFilesState<SourceFile = unknown, Diagnostic = unknown> {
  readonly program: EmitProgram<SourceFile, Diagnostic>;
  readonly snapshot: ProgramSnapshot<Diagnostic>;
  readonly pendingEmit: Map<string, SnapshotFileEmitKind>;
  readonly deletedPendingKinds: Set<string>;
  readonly emitUpdates: Map<string, EmitUpdate<Diagnostic>>;
  readonly isForDtsErrors: boolean;
}

export class EmitFilesHandler<SourceFile = unknown, Diagnostic = unknown> {
  private readonly state: EmitFilesState<SourceFile, Diagnostic>;

  constructor(state: EmitFilesState<SourceFile, Diagnostic>) {
    this.state = state;
  }

  getPendingEmitKindForEmitOptions(emitKind: SnapshotFileEmitKind, emitOnly: EmitOnly): SnapshotFileEmitKind {
    let pendingKind = getPendingEmitKind(emitKind, SnapshotFileEmitKind.None);
    if (emitOnly === EmitOnly.Dts) pendingKind &= SnapshotFileEmitKind.AllDts;
    if (this.state.isForDtsErrors) pendingKind &= SnapshotFileEmitKind.DtsErrors;
    return pendingKind;
  }

  emitAllAffectedFiles(emitOnly: EmitOnly): EmitResult<Diagnostic> {
    const results = this.emitFilesIncremental(emitOnly);
    return combineEmitResults(results);
  }

  emitFilesIncremental(emitOnly: EmitOnly): readonly EmitResult<Diagnostic>[] {
    const results: EmitResult<Diagnostic>[] = [];
    for (const [path, emitKind] of this.state.pendingEmit) {
      const affectedFile = this.state.program.getSourceFileByPath(path);
      if (affectedFile === undefined || !this.state.program.sourceFileMayBeEmitted(affectedFile, false)) {
        this.state.deletedPendingKinds.add(path);
        continue;
      }
      const pendingKind = this.getPendingEmitKindForEmitOptions(emitKind, emitOnly);
      if (pendingKind === SnapshotFileEmitKind.None) continue;
      const result = this.emitOne(affectedFile, pendingKind);
      const update: EmitUpdate<Diagnostic> = {
        pendingKind: getPendingEmitKind(emitKind, pendingKind),
        result,
        dtsErrorsFromCache: false,
      };
      this.state.emitUpdates.set(path, update);
      results.push(result);
    }
    this.addCachedDtsErrorsForUnemittedFiles(results);
    this.updateSnapshot();
    return results;
  }

  private emitOne(file: SourceFile, pendingKind: SnapshotFileEmitKind): EmitResult<Diagnostic> {
    if (this.state.isForDtsErrors) {
      return {
        emitSkipped: true,
        diagnostics: this.state.program.getDeclarationDiagnostics(file),
        emittedFiles: [],
      };
    }
    let emitOnly = EmitOnly.All;
    if ((pendingKind & SnapshotFileEmitKind.AllJs) !== 0 && (pendingKind & SnapshotFileEmitKind.AllDts) === 0) {
      emitOnly = EmitOnly.Js;
    } else if ((pendingKind & SnapshotFileEmitKind.AllDts) !== 0 && (pendingKind & SnapshotFileEmitKind.AllJs) === 0) {
      emitOnly = EmitOnly.Dts;
    }
    return this.state.program.emit(file, emitOnly);
  }

  private addCachedDtsErrorsForUnemittedFiles(results: EmitResult<Diagnostic>[]): void {
    for (const [path, diagnostics] of this.state.snapshot.emitDiagnosticsPerFile) {
      if (this.state.emitUpdates.has(path)) continue;
      const file = this.state.program.getSourceFileByPath(path);
      if (file === undefined || !this.state.program.sourceFileMayBeEmitted(file, false)) {
        this.state.deletedPendingKinds.add(path);
        continue;
      }
      const result: EmitResult<Diagnostic> = {
        emitSkipped: true,
        diagnostics: diagnostics.diagnostics,
        emittedFiles: [],
      };
      this.state.emitUpdates.set(path, {
        pendingKind: this.state.pendingEmit.get(path) ?? SnapshotFileEmitKind.None,
        result,
        dtsErrorsFromCache: true,
      });
      results.push(result);
    }
  }

  private updateSnapshot(): void {
    for (const path of this.state.deletedPendingKinds) this.state.pendingEmit.delete(path);
    for (const [path, update] of this.state.emitUpdates) {
      if (update.pendingKind === SnapshotFileEmitKind.None) this.state.pendingEmit.delete(path);
      else this.state.pendingEmit.set(path, update.pendingKind);
    }
  }
}

export function combineEmitResults<Diagnostic>(results: readonly EmitResult<Diagnostic>[]): EmitResult<Diagnostic> {
  const diagnostics: Diagnostic[] = [];
  const emittedFiles: string[] = [];
  let emitSkipped = false;
  for (const result of results) {
    diagnostics.push(...result.diagnostics);
    emittedFiles.push(...result.emittedFiles);
    emitSkipped = emitSkipped || result.emitSkipped;
  }
  return { emitSkipped, diagnostics, emittedFiles };
}
