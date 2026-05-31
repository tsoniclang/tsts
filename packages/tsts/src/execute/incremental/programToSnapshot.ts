import {
  buildReferencedByMap,
  computeHash,
  createProgramSnapshotFromParts,
  getFileEmitKind,
  getPendingEmitKindWithOptions,
  type DiagnosticsOrBuildInfoDiagnosticsWithFileName,
  type EmitOptions,
  type ProgramSnapshot,
  type ProgramSnapshotFileInfo,
  type SnapshotFileEmitKind,
} from "./snapshot.js";
import type { IncrementalProgram } from "./program.js";

export interface ProgramToSnapshotSourceFile {
  readonly path: string;
  readonly text: string;
  readonly affectsGlobalScope?: boolean;
  readonly impliedNodeFormat?: string;
  readonly isDeclarationFile?: boolean;
  readonly isDefaultLibrary?: boolean;
  readonly references?: readonly string[];
}

export interface ProgramToSnapshotOptions<Diagnostic = unknown> {
  readonly version: string;
  readonly hashWithText: boolean;
  readonly sourceFiles: readonly ProgramToSnapshotSourceFile[];
  readonly root: readonly string[];
  readonly options: ReadonlyMap<string, unknown>;
  readonly pendingEmit: ReadonlyMap<string, SnapshotFileEmitKind>;
  readonly oldSnapshot?: ProgramSnapshot<Diagnostic>;
  readonly emitOptions?: EmitOptions;
  readonly oldEmitOptions?: EmitOptions;
  readonly semanticOptionsChanged?: boolean;
  readonly declarationPathOptionsChanged?: boolean;
  readonly skipLibCheckChanged?: boolean;
  readonly skipDefaultLibCheckChanged?: boolean;
  readonly noCheck?: boolean;
}

interface FileChangeComputation<Diagnostic> {
  readonly fileInfos: Map<string, ProgramSnapshotFileInfo>;
  readonly references: Map<string, ReadonlySet<string>>;
  readonly semanticDiagnosticsPerFile: Map<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>;
  readonly emitDiagnosticsPerFile: Map<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>;
  readonly changedFilesSet: Set<string>;
  readonly pendingEmit: Map<string, SnapshotFileEmitKind>;
  latestChangedDtsFile: string | undefined;
}

export function fileInfoFromText(sourceFile: ProgramToSnapshotSourceFile, hashWithText: boolean): ProgramSnapshotFileInfo {
  return {
    version: computeHash(sourceFile.text, hashWithText),
    signature: computeHash(sourceFile.text, hashWithText),
    affectsGlobalScope: sourceFile.affectsGlobalScope === true,
    impliedNodeFormat: sourceFile.impliedNodeFormat,
  };
}

export function programToSnapshot<Diagnostic>(
  program: IncrementalProgram<Diagnostic> | undefined,
  options: ProgramToSnapshotOptions<Diagnostic>,
): ProgramSnapshot<Diagnostic> {
  const builder = new ProgramSnapshotBuilder(program, options);
  return builder.toSnapshot();
}

class ProgramSnapshotBuilder<Diagnostic> {
  private readonly program: IncrementalProgram<Diagnostic> | undefined;
  private readonly options: ProgramToSnapshotOptions<Diagnostic>;
  private readonly oldSnapshot: ProgramSnapshot<Diagnostic> | undefined;

  constructor(program: IncrementalProgram<Diagnostic> | undefined, options: ProgramToSnapshotOptions<Diagnostic>) {
    this.program = program;
    this.options = options;
    this.oldSnapshot = options.oldSnapshot ?? program?.snapshot();
  }

  toSnapshot(): ProgramSnapshot<Diagnostic> {
    const computation = this.computeFileChanges();
    this.handleFileDelete(computation);
    this.handlePendingEmit(computation);
    const latestChangedDtsFile = computation.latestChangedDtsFile
      ?? (this.hasChangedDtsFile(computation) ? this.firstChangedDtsFile(computation) : undefined);
    return createProgramSnapshotFromParts(
      this.options.version,
      computation.fileInfos,
      this.options.options,
      this.options.root,
      computation.semanticDiagnosticsPerFile,
      computation.emitDiagnosticsPerFile,
      computation.pendingEmit,
      latestChangedDtsFile,
      [],
      this.options.noCheck === true,
      buildReferencedByMap(computation.references),
      computation.references,
      computation.changedFilesSet,
    );
  }

  private computeFileChanges(): FileChangeComputation<Diagnostic> {
    const fileInfos = new Map<string, ProgramSnapshotFileInfo>();
    const references = new Map<string, ReadonlySet<string>>();
    const semanticDiagnosticsPerFile = new Map<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>();
    const emitDiagnosticsPerFile = new Map<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>();
    const changedFilesSet = new Set<string>();
    const pendingEmit = new Map(this.options.pendingEmit);
    const canCopySemanticDiagnostics = this.oldSnapshot !== undefined && this.options.semanticOptionsChanged !== true;
    const canCopyEmitDiagnostics = this.oldSnapshot !== undefined;

    for (const sourceFile of this.options.sourceFiles) {
      const info = fileInfoFromText(sourceFile, this.options.hashWithText);
      const newReferences = referencedFilesOfSourceFile(sourceFile);
      fileInfos.set(sourceFile.path, info);
      if (newReferences.size > 0) references.set(sourceFile.path, newReferences);

      const oldInfo = this.oldSnapshot?.fileInfos.get(sourceFile.path);
      const oldReferences = this.oldSnapshot?.references?.get(sourceFile.path) ?? new Set<string>();
      const changed = oldInfo === undefined ||
        oldInfo.version !== info.version ||
        oldInfo.affectsGlobalScope !== info.affectsGlobalScope ||
        oldInfo.impliedNodeFormat !== info.impliedNodeFormat ||
        !sameSet(newReferences, oldReferences);

      if (changed) changedFilesSet.add(sourceFile.path);
      else {
        if (canCopyEmitDiagnostics) {
          copyMapEntry(this.oldSnapshot!.emitDiagnosticsPerFile, emitDiagnosticsPerFile, sourceFile.path);
        }
        if (canCopySemanticDiagnostics && canCopyDeclarationDiagnostics(sourceFile, this.options)) {
          copyMapEntry(this.oldSnapshot!.semanticDiagnosticsPerFile, semanticDiagnosticsPerFile, sourceFile.path);
        }
      }
    }

    return {
      fileInfos,
      references,
      semanticDiagnosticsPerFile,
      emitDiagnosticsPerFile,
      changedFilesSet,
      pendingEmit,
      latestChangedDtsFile: this.oldSnapshot?.latestChangedDtsFile,
    };
  }

  private handleFileDelete(computation: FileChangeComputation<Diagnostic>): void {
    if (this.oldSnapshot === undefined) return;
    for (const [oldPath, oldInfo] of this.oldSnapshot.fileInfos) {
      if (computation.fileInfos.has(oldPath)) continue;
      if (oldInfo.affectsGlobalScope) {
        for (const sourceFile of this.options.sourceFiles) computation.changedFilesSet.add(sourceFile.path);
      } else {
        computation.pendingEmit.set(oldPath, this.defaultEmitKind());
      }
    }
  }

  private handlePendingEmit(computation: FileChangeComputation<Diagnostic>): void {
    if (this.oldSnapshot === undefined) {
      for (const sourceFile of this.options.sourceFiles) {
        computation.pendingEmit.set(sourceFile.path, this.defaultEmitKind());
      }
      return;
    }
    const pendingEmitKind = this.pendingEmitKindFromOptions();
    if (pendingEmitKind === 0) return;
    for (const sourceFile of this.options.sourceFiles) {
      if (!computation.changedFilesSet.has(sourceFile.path)) {
        computation.pendingEmit.set(sourceFile.path, pendingEmitKind);
      }
    }
  }

  private defaultEmitKind(): SnapshotFileEmitKind {
    return this.options.emitOptions === undefined ? 0 as SnapshotFileEmitKind : getFileEmitKind(this.options.emitOptions);
  }

  private pendingEmitKindFromOptions(): SnapshotFileEmitKind {
    if (this.options.emitOptions === undefined || this.options.oldEmitOptions === undefined) return 0 as SnapshotFileEmitKind;
    if (this.options.declarationPathOptionsChanged === true) return getFileEmitKind(this.options.emitOptions);
    return getPendingEmitKindWithOptions(this.options.emitOptions, this.options.oldEmitOptions);
  }

  private hasChangedDtsFile(computation: FileChangeComputation<Diagnostic>): boolean {
    if (this.program?.hasChangedDtsFile() === true) return true;
    for (const file of computation.changedFilesSet) {
      if (file.endsWith(".d.ts")) return true;
    }
    return false;
  }

  private firstChangedDtsFile(computation: FileChangeComputation<Diagnostic>): string | undefined {
    return this.program?.changedFiles().find((file) => file.endsWith(".d.ts"))
      ?? [...computation.changedFilesSet].find((file) => file.endsWith(".d.ts"));
  }
}

function referencedFilesOfSourceFile(sourceFile: ProgramToSnapshotSourceFile): ReadonlySet<string> {
  return new Set(sourceFile.references ?? []);
}

function sameSet(left: ReadonlySet<string>, right: ReadonlySet<string>): boolean {
  if (left.size !== right.size) return false;
  for (const value of left) {
    if (!right.has(value)) return false;
  }
  return true;
}

function copyMapEntry<Diagnostic>(
  from: ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>,
  to: Map<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>,
  path: string,
): void {
  const value = from.get(path);
  if (value !== undefined) to.set(path, value);
}

function canCopyDeclarationDiagnostics(sourceFile: ProgramToSnapshotSourceFile, options: ProgramToSnapshotOptions): boolean {
  if (sourceFile.isDeclarationFile === true && options.skipLibCheckChanged === true) return false;
  if (sourceFile.isDefaultLibrary === true && options.skipDefaultLibCheckChanged === true) return false;
  return true;
}
