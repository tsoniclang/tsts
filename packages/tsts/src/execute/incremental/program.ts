import type { ProgramSnapshot, SnapshotFileEmitKind } from "./snapshot.js";

export interface IncrementalProgramHost {
  readonly getSourceFileVersion: (path: string) => string | undefined;
  readonly getSourceFileText: (path: string) => string | undefined;
}

export interface IncrementalProgramState<Diagnostic = unknown> {
  readonly snapshot: ProgramSnapshot<Diagnostic> | undefined;
  readonly changedFilesSet: ReadonlySet<string>;
  readonly semanticDiagnosticsPerFile: ReadonlyMap<string, readonly Diagnostic[]>;
  readonly emitDiagnosticsPerFile: ReadonlyMap<string, readonly Diagnostic[]>;
  readonly pendingEmit: ReadonlyMap<string, SnapshotFileEmitKind>;
  readonly hasChangedDtsFile: boolean;
}

export class IncrementalProgram<Diagnostic = unknown> {
  private readonly host: IncrementalProgramHost;
  private state: IncrementalProgramState<Diagnostic>;

  constructor(host: IncrementalProgramHost, state: IncrementalProgramState<Diagnostic>) {
    this.host = host;
    this.state = state;
  }

  snapshot(): ProgramSnapshot<Diagnostic> | undefined {
    return this.state.snapshot;
  }

  changedFiles(): readonly string[] {
    return [...this.state.changedFilesSet];
  }

  hasChangedDtsFile(): boolean {
    return this.state.hasChangedDtsFile;
  }

  getSemanticDiagnostics(path: string): readonly Diagnostic[] {
    return this.state.semanticDiagnosticsPerFile.get(path) ?? [];
  }

  getEmitDiagnostics(path: string): readonly Diagnostic[] {
    return this.state.emitDiagnosticsPerFile.get(path) ?? [];
  }

  getPendingEmit(path: string): SnapshotFileEmitKind | undefined {
    return this.state.pendingEmit.get(path);
  }

  update(state: IncrementalProgramState<Diagnostic>): void {
    this.state = state;
  }

  sourceVersion(path: string): string | undefined {
    return this.host.getSourceFileVersion(path);
  }

  sourceText(path: string): string | undefined {
    return this.host.getSourceFileText(path);
  }
}

export function createIncrementalProgram<Diagnostic>(
  host: IncrementalProgramHost,
  state: IncrementalProgramState<Diagnostic>,
): IncrementalProgram<Diagnostic> {
  return new IncrementalProgram(host, state);
}
