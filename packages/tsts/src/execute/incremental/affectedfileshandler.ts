import {
  SnapshotFileEmitKind,
  buildReferencedByMap,
  type FileInfo,
  type ProgramSnapshot,
} from "./snapshot.js";

export type DtsMayChange = Map<string, SnapshotFileEmitKind>;

export enum SignatureUpdateKind {
  None = 0,
  UsedVersion = 1,
  ComputedDts = 2,
}

export interface UpdatedSignature {
  readonly signature: string;
  readonly kind: SignatureUpdateKind;
}

export interface AffectedFilesProgram<SourceFile = unknown> {
  readonly getSourceFileByPath: (path: string) => SourceFile | undefined;
  readonly getSourceFiles: () => readonly SourceFile[];
  readonly pathOf: (file: SourceFile) => string;
  readonly isDefaultLibrary: (file: SourceFile) => boolean;
  readonly skipTypeChecking: (file: SourceFile, ignoreNoCheck: boolean) => boolean;
  readonly computeDtsSignature: (file: SourceFile) => string | undefined;
  readonly affectsGlobalScope: (file: SourceFile) => boolean;
}

export interface AffectedFilesState<SourceFile = unknown, Diagnostic = unknown> {
  readonly program: AffectedFilesProgram<SourceFile>;
  readonly snapshot: ProgramSnapshot<Diagnostic>;
  readonly references: ReadonlyMap<string, ReadonlySet<string>>;
  readonly changedFiles: ReadonlySet<string>;
  readonly pendingEmit: Map<string, SnapshotFileEmitKind>;
  readonly diagnosticsToRemove: Set<string>;
}

export class AffectedFilesHandler<SourceFile = unknown, Diagnostic = unknown> {
  private readonly state: AffectedFilesState<SourceFile, Diagnostic>;
  private readonly referencedBy: ReadonlyMap<string, ReadonlySet<string>>;
  private readonly updatedSignatures = new Map<string, UpdatedSignature>();
  private hasAllFilesExcludingDefaultLibraryFile = false;

  constructor(state: AffectedFilesState<SourceFile, Diagnostic>) {
    this.state = state;
    this.referencedBy = state.snapshot.referencedBy ?? buildReferencedByMap(state.references);
  }

  getDtsMayChange(affectedFilePath: string, affectedFileEmitKind: SnapshotFileEmitKind): DtsMayChange {
    return new Map([[affectedFilePath, affectedFileEmitKind]]);
  }

  isChangedSignature(path: string): boolean {
    const updated = this.updatedSignatures.get(path);
    const oldInfo = this.state.snapshot.fileInfos.get(path);
    return updated !== undefined && oldInfo !== undefined && updated.signature !== oldInfo.signature;
  }

  removeSemanticDiagnosticsOf(path: string): void {
    this.state.diagnosticsToRemove.add(path);
  }

  removeDiagnosticsOfLibraryFiles(): void {
    for (const file of this.state.program.getSourceFiles()) {
      if (this.state.program.isDefaultLibrary(file) && !this.state.program.skipTypeChecking(file, true)) {
        this.removeSemanticDiagnosticsOf(this.state.program.pathOf(file));
      }
    }
  }

  updateShapeSignature(file: SourceFile, useFileVersionAsSignature: boolean): boolean {
    const path = this.state.program.pathOf(file);
    if (this.updatedSignatures.has(path)) return false;
    const oldInfo = this.state.snapshot.fileInfos.get(path);
    const signature = this.computeSignature(file, oldInfo, useFileVersionAsSignature);
    this.updatedSignatures.set(path, {
      signature,
      kind: signature === oldInfo?.version ? SignatureUpdateKind.UsedVersion : SignatureUpdateKind.ComputedDts,
    });
    return oldInfo === undefined || signature !== oldInfo.signature;
  }

  getFilesAffectedBy(path: string): readonly SourceFile[] {
    const file = this.state.program.getSourceFileByPath(path);
    if (file === undefined) return [];
    if (!this.updateShapeSignature(file, false)) return [file];
    if (this.state.program.affectsGlobalScope(file)) {
      this.hasAllFilesExcludingDefaultLibraryFile = true;
      return this.allFilesExcludingDefaultLibrary(file);
    }
    return this.forEachFileReferencedBy(file, (currentFile) => {
      if (currentFile !== undefined && this.updateShapeSignature(currentFile, false)) return true;
      return false;
    });
  }

  handleDtsMayChangeOfAffectedFile(dtsMayChange: DtsMayChange, affectedFile: SourceFile): void {
    const path = this.state.program.pathOf(affectedFile);
    this.removeSemanticDiagnosticsOf(path);
    if (this.hasAllFilesExcludingDefaultLibraryFile) {
      this.removeDiagnosticsOfLibraryFiles();
      this.updateShapeSignature(affectedFile, false);
      return;
    }
    if (!this.state.changedFiles.has(path) || !this.isChangedSignature(path)) return;
    for (const file of this.forEachFileReferencedBy(affectedFile, () => true)) {
      const currentPath = this.state.program.pathOf(file);
      this.handleDtsMayChangeOf(dtsMayChange, currentPath, false);
    }
  }

  handleDtsMayChangeOf(dtsMayChange: DtsMayChange, path: string, invalidateJsFiles: boolean): void {
    this.removeSemanticDiagnosticsOf(path);
    let emitKind = dtsMayChange.get(path) ?? SnapshotFileEmitKind.Dts;
    if (invalidateJsFiles) emitKind |= SnapshotFileEmitKind.AllJs;
    dtsMayChange.set(path, emitKind);
    this.state.pendingEmit.set(path, emitKind);
  }

  handleDtsMayChangeOfGlobalScope(dtsMayChange: DtsMayChange, path: string, invalidateJsFiles: boolean): boolean {
    const info = this.state.snapshot.fileInfos.get(path);
    if (info?.affectsGlobalScope !== true) return false;
    for (const file of this.allFilesExcludingDefaultLibrary(undefined)) {
      this.handleDtsMayChangeOf(dtsMayChange, this.state.program.pathOf(file), invalidateJsFiles);
    }
    this.hasAllFilesExcludingDefaultLibraryFile = true;
    return true;
  }

  private forEachFileReferencedBy(file: SourceFile, shouldQueue: (file: SourceFile | undefined, path: string) => boolean): readonly SourceFile[] {
    const seen = new Map<string, SourceFile | undefined>();
    const startPath = this.state.program.pathOf(file);
    seen.set(startPath, file);
    const queue = [...(this.referencedBy.get(startPath) ?? [])];
    while (queue.length > 0) {
      const currentPath = queue.pop();
      if (currentPath === undefined || seen.has(currentPath)) continue;
      const currentFile = this.state.program.getSourceFileByPath(currentPath);
      seen.set(currentPath, currentFile);
      if (shouldQueue(currentFile, currentPath) && currentFile !== undefined) {
        queue.push(...(this.referencedBy.get(this.state.program.pathOf(currentFile)) ?? []));
      }
    }
    return [...seen.values()].filter((value): value is SourceFile => value !== undefined);
  }

  private allFilesExcludingDefaultLibrary(changedFile: SourceFile | undefined): readonly SourceFile[] {
    return this.state.program.getSourceFiles().filter((file) => {
      if (changedFile !== undefined && file === changedFile) return true;
      return !this.state.program.isDefaultLibrary(file);
    });
  }

  private computeSignature(file: SourceFile, oldInfo: FileInfo | undefined, useFileVersionAsSignature: boolean): string {
    if (!useFileVersionAsSignature) {
      const signature = this.state.program.computeDtsSignature(file);
      if (signature !== undefined && signature !== "") return signature;
    }
    return oldInfo?.version ?? "";
  }
}

export function collectAffectedFiles<SourceFile, Diagnostic>(
  state: AffectedFilesState<SourceFile, Diagnostic>,
): readonly SourceFile[] {
  const handler = new AffectedFilesHandler(state);
  const affected = new Map<string, SourceFile>();
  for (const path of state.changedFiles) {
    for (const file of handler.getFilesAffectedBy(path)) {
      affected.set(state.program.pathOf(file), file);
    }
  }
  return [...affected.values()];
}
