import { snapshotToBuildInfo, type SnapshotBuildInfoProgram } from "./snapshotToBuildInfo.js";
import {
  type DiagnosticsOrBuildInfoDiagnosticsWithFileName,
  type ProgramSnapshot,
  type SnapshotFileEmitKind,
} from "./snapshot.js";

export enum ProgramSignatureUpdateKind {
  ComputedDts = 0,
  StoredAtEmit = 1,
  UsedVersion = 2,
}

export interface IncrementalProgramSourceFile {
  readonly path: string;
  readonly fileName: string;
}

export interface IncrementalEmitOptions {
  readonly targetSourceFile?: IncrementalProgramSourceFile;
  readonly writeFile?: (fileName: string, text: string, data?: { readonly buildInfo?: unknown }) => unknown;
  readonly buildInfoFileName?: string;
}

export interface IncrementalEmitResult<Diagnostic = unknown> {
  readonly emitSkipped: boolean;
  readonly diagnostics: readonly Diagnostic[];
  readonly emittedFiles: readonly string[];
}

export interface IncrementalProgramHost<Diagnostic = unknown> {
  readonly getSourceFileVersion: (path: string) => string | undefined;
  readonly getSourceFileText: (path: string) => string | undefined;
  readonly currentDirectory?: string;
  readonly useCaseSensitiveFileNames?: boolean;
  readonly buildInfoFileName?: string;
  sourceFiles?(): readonly IncrementalProgramSourceFile[];
  getSourceFile?(path: string): IncrementalProgramSourceFile | undefined;
  getConfigFileParsingDiagnostics?(): readonly Diagnostic[];
  getSyntacticDiagnostics?(file: IncrementalProgramSourceFile | undefined): readonly Diagnostic[];
  getBindDiagnostics?(file: IncrementalProgramSourceFile | undefined): readonly Diagnostic[];
  getProgramDiagnostics?(): readonly Diagnostic[];
  getGlobalDiagnostics?(): readonly Diagnostic[];
  getSuggestionDiagnostics?(file: IncrementalProgramSourceFile): readonly Diagnostic[];
  getDeclarationDiagnostics?(file: IncrementalProgramSourceFile | undefined): readonly Diagnostic[];
  getSemanticDiagnosticsWithoutNoEmitFiltering?(files: readonly IncrementalProgramSourceFile[]): ReadonlyMap<IncrementalProgramSourceFile, readonly Diagnostic[]>;
  getIncludeProcessorDiagnostics?(file: IncrementalProgramSourceFile): readonly Diagnostic[];
  emit?(options: IncrementalEmitOptions): IncrementalEmitResult<Diagnostic> | undefined;
  writeFile?(fileName: string, text: string, data?: { readonly buildInfo?: unknown }): unknown;
  isEmitBlocked?(fileName: string): boolean;
  snapshotBuildInfoProgram?(): SnapshotBuildInfoProgram | undefined;
}

export interface IncrementalProgramState<Diagnostic = unknown> {
  readonly snapshot: ProgramSnapshot<Diagnostic> | undefined;
  readonly changedFilesSet: ReadonlySet<string>;
  readonly semanticDiagnosticsPerFile: ReadonlyMap<string, readonly Diagnostic[]>;
  readonly emitDiagnosticsPerFile: ReadonlyMap<string, readonly Diagnostic[]>;
  readonly pendingEmit: ReadonlyMap<string, SnapshotFileEmitKind>;
  readonly hasChangedDtsFile: boolean;
  readonly buildInfoEmitPending?: boolean;
  readonly hasErrors?: boolean;
  readonly hasSemanticErrors?: boolean;
}

export interface TestingData<Diagnostic = unknown> {
  readonly semanticDiagnosticsPerFile: ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>;
  readonly oldProgramSemanticDiagnosticsPerFile: ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>;
  readonly updatedSignatureKinds: ReadonlyMap<string, ProgramSignatureUpdateKind>;
}

export class IncrementalProgram<Diagnostic = unknown> {
  private readonly host: IncrementalProgramHost<Diagnostic>;
  private state: IncrementalProgramState<Diagnostic>;
  private readonly testingDataValue: TestingData<Diagnostic> | undefined;

  constructor(host: IncrementalProgramHost<Diagnostic>, state: IncrementalProgramState<Diagnostic>, oldProgram?: IncrementalProgram<Diagnostic>, testing = false) {
    this.host = host;
    this.state = state;
    this.testingDataValue = testing
      ? {
        semanticDiagnosticsPerFile: state.snapshot?.semanticDiagnosticsPerFile ?? new Map<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>(),
        oldProgramSemanticDiagnosticsPerFile: oldProgram?.snapshot()?.semanticDiagnosticsPerFile ?? new Map<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>(),
        updatedSignatureKinds: new Map<string, ProgramSignatureUpdateKind>(),
      }
      : undefined;
  }

  snapshot(): ProgramSnapshot<Diagnostic> | undefined {
    return this.state.snapshot;
  }

  getTestingData(): TestingData<Diagnostic> | undefined {
    return this.testingDataValue;
  }

  changedFiles(): readonly string[] {
    return [...this.state.changedFilesSet];
  }

  hasChangedDtsFile(): boolean {
    return this.state.hasChangedDtsFile;
  }

  options(): ReadonlyMap<string, unknown> {
    return this.state.snapshot?.options ?? new Map<string, unknown>();
  }

  sourceFiles(): readonly IncrementalProgramSourceFile[] {
    return this.host.sourceFiles?.() ?? [];
  }

  getSourceFile(path: string): IncrementalProgramSourceFile | undefined {
    return this.host.getSourceFile?.(path) ?? this.sourceFiles().find((file) => file.path === path || file.fileName === path);
  }

  getConfigFileParsingDiagnostics(): readonly Diagnostic[] {
    return this.host.getConfigFileParsingDiagnostics?.() ?? [];
  }

  getSyntacticDiagnostics(file: IncrementalProgramSourceFile | undefined = undefined): readonly Diagnostic[] {
    return this.host.getSyntacticDiagnostics?.(file) ?? [];
  }

  getBindDiagnostics(file: IncrementalProgramSourceFile | undefined = undefined): readonly Diagnostic[] {
    return this.host.getBindDiagnostics?.(file) ?? [];
  }

  getProgramDiagnostics(): readonly Diagnostic[] {
    return this.host.getProgramDiagnostics?.() ?? [];
  }

  getGlobalDiagnostics(): readonly Diagnostic[] {
    return this.host.getGlobalDiagnostics?.() ?? [];
  }

  getSuggestionDiagnostics(file: IncrementalProgramSourceFile): readonly Diagnostic[] {
    return this.host.getSuggestionDiagnostics?.(file) ?? [];
  }

  getDeclarationDiagnostics(file: IncrementalProgramSourceFile | undefined = undefined): readonly Diagnostic[] {
    return this.host.getDeclarationDiagnostics?.(file) ?? [];
  }

  getSemanticDiagnostics(path: string): readonly Diagnostic[] {
    const cached = this.state.semanticDiagnosticsPerFile.get(path);
    if (cached !== undefined) return cached;
    const file = this.getSourceFile(path);
    if (file === undefined) return [];
    this.collectSemanticDiagnosticsOfAffectedFiles(file);
    return this.state.semanticDiagnosticsPerFile.get(path) ?? [];
  }

  getAllSemanticDiagnostics(): readonly Diagnostic[] {
    this.collectSemanticDiagnosticsOfAffectedFiles(undefined);
    const diagnostics: Diagnostic[] = [];
    for (const file of this.sourceFiles()) diagnostics.push(...(this.state.semanticDiagnosticsPerFile.get(file.path) ?? []));
    return diagnostics;
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

  emit(options: IncrementalEmitOptions = {}): IncrementalEmitResult<Diagnostic> {
    const direct = this.host.emit?.(options);
    if (direct !== undefined) {
      if (options.targetSourceFile === undefined) return combineEmitResults(direct, this.emitBuildInfo(options));
      return direct;
    }
    return this.emitBuildInfo(options) ?? { emitSkipped: false, diagnostics: [], emittedFiles: [] };
  }

  collectSemanticDiagnosticsOfAffectedFiles(file: IncrementalProgramSourceFile | undefined): void {
    const sourceFiles = file === undefined
      ? this.sourceFiles().filter((sourceFile) => !this.state.semanticDiagnosticsPerFile.has(sourceFile.path))
      : this.state.semanticDiagnosticsPerFile.has(file.path)
        ? []
        : [file];
    if (sourceFiles.length === 0) return;

    const diagnosticsPerFile = this.host.getSemanticDiagnosticsWithoutNoEmitFiltering?.(sourceFiles)
      ?? new Map(sourceFiles.map((sourceFile) => [sourceFile, [] as readonly Diagnostic[]]));
    const semanticDiagnosticsPerFile = new Map(this.state.semanticDiagnosticsPerFile);
    for (const [sourceFile, diagnostics] of diagnosticsPerFile) {
      semanticDiagnosticsPerFile.set(sourceFile.path, diagnostics);
    }
    this.state = {
      ...this.state,
      semanticDiagnosticsPerFile,
      buildInfoEmitPending: true,
    };
  }

  emitBuildInfo(options: IncrementalEmitOptions): IncrementalEmitResult<Diagnostic> | undefined {
    const snapshot = this.state.snapshot;
    if (snapshot === undefined) return undefined;
    const buildInfoFileName = options.buildInfoFileName ?? this.host.buildInfoFileName;
    if (buildInfoFileName === undefined || buildInfoFileName === "" || this.host.isEmitBlocked?.(buildInfoFileName) === true) {
      return undefined;
    }
    if (this.state.buildInfoEmitPending === false) return undefined;
    const snapshotBuildInfoProgram = this.host.snapshotBuildInfoProgram?.();
    const buildInfo = snapshotToBuildInfo(snapshot, {
      version: snapshot.version,
      currentDirectory: this.host.currentDirectory ?? "",
      useCaseSensitiveFileNames: this.host.useCaseSensitiveFileNames ?? true,
      buildInfoFileName,
      ...(snapshotBuildInfoProgram === undefined ? {} : { program: snapshotBuildInfoProgram }),
    });
    const text = JSON.stringify(buildInfo);
    const writeResult = options.writeFile?.(buildInfoFileName, text, { buildInfo })
      ?? this.host.writeFile?.(buildInfoFileName, text, { buildInfo });
    if (writeResult instanceof Error) {
      return {
        emitSkipped: true,
        diagnostics: [writeResult as Diagnostic],
        emittedFiles: [],
      };
    }
    this.state = { ...this.state, buildInfoEmitPending: false };
    return {
      emitSkipped: false,
      diagnostics: [],
      emittedFiles: [buildInfoFileName],
    };
  }

  ensureHasErrorsForState(): void {
    let hasEmitDiagnostics = false;
    for (const value of this.state.emitDiagnosticsPerFile.values()) {
      if (value.length > 0) {
        hasEmitDiagnostics = true;
        break;
      }
    }
    if (hasEmitDiagnostics) {
      this.state = { ...this.state, hasErrors: true, hasSemanticErrors: false };
      return;
    }
    const hasProgramErrors = this.getConfigFileParsingDiagnostics().length > 0 ||
      this.getSyntacticDiagnostics().length > 0 ||
      this.getProgramDiagnostics().length > 0 ||
      this.getGlobalDiagnostics().length > 0;
    if (hasProgramErrors) {
      this.state = { ...this.state, hasErrors: true, hasSemanticErrors: false };
      return;
    }
    let hasSemanticErrors = false;
    for (const diagnostics of this.state.semanticDiagnosticsPerFile.values()) {
      if (diagnostics.length > 0) {
        hasSemanticErrors = true;
        break;
      }
    }
    this.state = { ...this.state, hasErrors: hasSemanticErrors, hasSemanticErrors };
  }
}

export function createIncrementalProgram<Diagnostic>(
  host: IncrementalProgramHost<Diagnostic>,
  state: IncrementalProgramState<Diagnostic>,
  oldProgram?: IncrementalProgram<Diagnostic>,
  testing = false,
): IncrementalProgram<Diagnostic> {
  return new IncrementalProgram(host, state, oldProgram, testing);
}

function combineEmitResults<Diagnostic>(
  first: IncrementalEmitResult<Diagnostic>,
  second: IncrementalEmitResult<Diagnostic> | undefined,
): IncrementalEmitResult<Diagnostic> {
  if (second === undefined) return first;
  return {
    emitSkipped: first.emitSkipped || second.emitSkipped,
    diagnostics: [...first.diagnostics, ...second.diagnostics],
    emittedFiles: [...first.emittedFiles, ...second.emittedFiles],
  };
}
