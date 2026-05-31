import {
  SnapshotFileEmitKind,
  buildReferencedByMap,
  type ProgramSnapshotFileInfo,
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
  readonly hasExportedConstEnum?: (file: SourceFile) => boolean;
}

export interface AffectedFilesState<SourceFile = unknown, Diagnostic = unknown> {
  readonly program: AffectedFilesProgram<SourceFile>;
  readonly snapshot: ProgramSnapshot<Diagnostic>;
  readonly references: ReadonlyMap<string, ReadonlySet<string>>;
  readonly changedFiles: ReadonlySet<string>;
  readonly pendingEmit: Map<string, SnapshotFileEmitKind>;
  readonly diagnosticsToRemove: Set<string>;
  readonly updatedSignatureKinds?: Map<string, SignatureUpdateKind> | undefined;
  readonly buildInfoPending?: { value: boolean } | undefined;
  readonly hasChangedDtsFile?: { value: boolean } | undefined;
}

export class AffectedFilesHandler<SourceFile = unknown, Diagnostic = unknown> {
  private readonly state: AffectedFilesState<SourceFile, Diagnostic>;
  private readonly referencedBy: ReadonlyMap<string, ReadonlySet<string>>;
  private readonly updatedSignatures = new Map<string, UpdatedSignature>();
  private readonly dtsMayChange: DtsMayChange[] = [];
  private readonly seenFileAndReferences = new Map<string, boolean>();
  private hasAllFilesExcludingDefaultLibraryFile = false;
  private cleanedDiagnosticsOfLibFiles = false;

  constructor(state: AffectedFilesState<SourceFile, Diagnostic>) {
    this.state = state;
    this.referencedBy = state.snapshot.referencedBy ?? buildReferencedByMap(state.references);
  }

  getDtsMayChange(affectedFilePath: string, affectedFileEmitKind: SnapshotFileEmitKind): DtsMayChange {
    const result = new Map([[affectedFilePath, affectedFileEmitKind]]);
    this.dtsMayChange.push(result);
    return result;
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
    if (this.cleanedDiagnosticsOfLibFiles) return;
    this.cleanedDiagnosticsOfLibFiles = true;
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
    if (optionBool(this.state.snapshot.options, "isolatedModules")) return [file];
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
    if (optionBool(this.state.snapshot.options, "assumeChangesOnlyAffectDirectDependencies")) return;
    if (!this.state.changedFiles.has(path) || !this.isChangedSignature(path)) return;

    if (optionBool(this.state.snapshot.options, "isolatedModules")) {
      this.forEachFileReferencedBy(affectedFile, (_currentFile, currentPath) => {
        if (this.handleDtsMayChangeOfGlobalScope(dtsMayChange, currentPath, false)) return false;
        this.handleDtsMayChangeOf(dtsMayChange, currentPath, false);
        return this.isChangedSignature(currentPath);
      });
      return;
    }

    const invalidateJsFiles = this.state.program.hasExportedConstEnum?.(affectedFile) === true;
    for (const referencingPath of this.referencedBy.get(path) ?? []) {
      if (this.handleDtsMayChangeOfGlobalScope(dtsMayChange, referencingPath, invalidateJsFiles)) return;
      for (const nestedPath of this.referencedBy.get(referencingPath) ?? []) {
        if (this.handleDtsMayChangeOfFileAndReferences(dtsMayChange, nestedPath, invalidateJsFiles)) return;
      }
    }
  }

  handleDtsMayChangeOf(dtsMayChange: DtsMayChange, path: string, invalidateJsFiles: boolean): void {
    if (this.state.changedFiles.has(path)) return;
    const file = this.state.program.getSourceFileByPath(path);
    if (file === undefined) return;
    this.removeSemanticDiagnosticsOf(path);
    this.updateShapeSignature(file, true);
    let emitKind = dtsMayChange.get(path) ?? SnapshotFileEmitKind.None;
    if (invalidateJsFiles) {
      emitKind |= getSnapshotEmitKindFromOptions(this.state.snapshot.options);
    } else if (optionBool(this.state.snapshot.options, "declaration") || optionBool(this.state.snapshot.options, "composite")) {
      emitKind |= optionBool(this.state.snapshot.options, "declarationMap")
        ? SnapshotFileEmitKind.AllDts
        : SnapshotFileEmitKind.Dts;
    }
    if (emitKind === SnapshotFileEmitKind.None) return;
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

  handleDtsMayChangeOfFileAndReferences(dtsMayChange: DtsMayChange, filePath: string, invalidateJsFiles: boolean): boolean {
    const existing = this.seenFileAndReferences.get(filePath);
    if (existing !== undefined && (existing || !invalidateJsFiles)) return false;
    if (existing !== undefined && invalidateJsFiles) this.seenFileAndReferences.set(filePath, true);
    else this.seenFileAndReferences.set(filePath, invalidateJsFiles);

    if (this.handleDtsMayChangeOfGlobalScope(dtsMayChange, filePath, invalidateJsFiles)) return true;
    this.handleDtsMayChangeOf(dtsMayChange, filePath, invalidateJsFiles);
    for (const referencingFilePath of this.referencedBy.get(filePath) ?? []) {
      if (this.handleDtsMayChangeOfFileAndReferences(dtsMayChange, referencingFilePath, invalidateJsFiles)) return true;
    }
    return false;
  }

  updateSnapshot(): void {
    for (const [filePath, update] of this.updatedSignatures) {
      this.state.updatedSignatureKinds?.set(filePath, update.kind);
    }
    for (const path of this.state.diagnosticsToRemove) {
      if (this.state.snapshot.semanticDiagnosticsPerFile instanceof Map) {
        this.state.snapshot.semanticDiagnosticsPerFile.delete(path);
      }
    }
    for (const change of this.dtsMayChange) {
      for (const [filePath, emitKind] of change) {
        this.state.pendingEmit.set(filePath, emitKind);
      }
    }
    if (this.state.buildInfoPending !== undefined) this.state.buildInfoPending.value = true;
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

  private computeSignature(file: SourceFile, oldInfo: ProgramSnapshotFileInfo | undefined, useFileVersionAsSignature: boolean): string {
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
  const emitKind = getSnapshotEmitKindFromOptions(state.snapshot.options);
  for (const file of affected.values()) {
    const dtsMayChange = handler.getDtsMayChange(state.program.pathOf(file), emitKind);
    handler.handleDtsMayChangeOfAffectedFile(dtsMayChange, file);
  }
  handler.updateSnapshot();
  return [...affected.values()];
}

function optionBool(options: ReadonlyMap<string, unknown>, key: string): boolean {
  return options.get(key) === true;
}

function getSnapshotEmitKindFromOptions(options: ReadonlyMap<string, unknown>): SnapshotFileEmitKind {
  let result = SnapshotFileEmitKind.Js;
  if (optionBool(options, "sourceMap")) result |= SnapshotFileEmitKind.JsMap;
  if (optionBool(options, "inlineSourceMap")) result |= SnapshotFileEmitKind.JsInlineMap;
  if (optionBool(options, "declaration") || optionBool(options, "composite")) result |= SnapshotFileEmitKind.Dts;
  if (optionBool(options, "declarationMap")) result |= SnapshotFileEmitKind.DtsMap;
  if (optionBool(options, "emitDeclarationOnly")) result &= SnapshotFileEmitKind.AllDts;
  return result;
}
