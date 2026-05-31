import {
  SnapshotFileEmitKind,
  getPendingEmitKind,
  type ProgramSnapshot,
  type EmitSignature,
} from "./snapshot.js";

export interface EmitResult<Diagnostic = unknown> {
  emitSkipped: boolean;
  diagnostics: readonly Diagnostic[];
  emittedFiles: readonly string[];
}

export interface EmitProgram<SourceFile = unknown, Diagnostic = unknown> {
  readonly getSourceFileByPath: (path: string) => SourceFile | undefined;
  readonly getSourceFiles?: () => readonly SourceFile[];
  readonly pathOf?: (file: SourceFile) => string;
  readonly sourceFileMayBeEmitted: (file: SourceFile, forceDtsEmit: boolean) => boolean;
  readonly emit: (file: SourceFile | undefined, emitOnly: EmitOnly, writeFile?: WriteFileCallback<Diagnostic> | undefined) => EmitResult<Diagnostic>;
  readonly getDeclarationDiagnostics: (file: SourceFile | undefined) => readonly Diagnostic[];
  readonly emitBuildInfo?: (writeFile?: WriteFileCallback<Diagnostic> | undefined) => EmitResult<Diagnostic> | undefined;
  readonly getMTime?: (path: string) => Date | undefined;
  readonly setMTime?: (path: string, date: Date) => void;
  readonly computeSignatureWithDiagnostics?: (file: SourceFile, text: string, data: WriteFileData<Diagnostic>) => string;
  readonly computeHash?: (text: string) => string;
  readonly outputPathOf?: (file: SourceFile, kind: "dts" | "js") => string | undefined;
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

export interface WriteFileData<Diagnostic = unknown> {
  readonly diagnostics: readonly Diagnostic[];
  skippedDtsWrite?: boolean | undefined;
}

export type WriteFileCallback<Diagnostic = unknown> = (fileName: string, text: string, data: WriteFileData<Diagnostic>) => void;

export interface EmitFilesState<SourceFile = unknown, Diagnostic = unknown> {
  readonly program: EmitProgram<SourceFile, Diagnostic>;
  readonly snapshot: ProgramSnapshot<Diagnostic>;
  readonly pendingEmit: Map<string, SnapshotFileEmitKind>;
  readonly deletedPendingKinds: Set<string>;
  readonly emitUpdates: Map<string, EmitUpdate<Diagnostic>>;
  readonly isForDtsErrors: boolean;
  readonly signatures?: Map<string, string> | undefined;
  readonly emitSignatures?: Map<string, EmitSignature> | undefined;
  readonly latestChangedDtsFiles?: Map<string, string> | undefined;
  readonly hasEmitDiagnostics?: { value: boolean } | undefined;
  readonly buildInfoPending?: { value: boolean } | undefined;
  readonly hasChangedDtsFile?: { value: boolean } | undefined;
  readonly writeFile?: WriteFileCallback<Diagnostic> | undefined;
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
    if (canUseIncrementalState(this.state.snapshot)) {
      const results = this.emitFilesIncremental(emitOnly);
      if (this.state.isForDtsErrors) return combineEmitResults(results);
      const result = combineEmitResults(results);
      this.emitBuildInfo(result);
      return result;
    }
    if (this.state.isForDtsErrors) {
      const result: EmitResult<Diagnostic> = {
        emitSkipped: true,
        diagnostics: this.state.program.getDeclarationDiagnostics(undefined),
        emittedFiles: [],
      };
      if (result.diagnostics.length !== 0 && this.state.hasEmitDiagnostics !== undefined) this.state.hasEmitDiagnostics.value = true;
      return result;
    }
    const result = this.state.program.emit(undefined, emitOnly, this.getEmitWriteFile(undefined));
    this.updateSnapshot();
    this.emitBuildInfo(result);
    return result;
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
      const result = this.emitOne(path, affectedFile, pendingKind);
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

  private emitOne(path: string, file: SourceFile, pendingKind: SnapshotFileEmitKind): EmitResult<Diagnostic> {
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
    return this.state.program.emit(file, emitOnly, this.getEmitWriteFile({ file, path }));
  }

  private emitBuildInfo(result: EmitResult<Diagnostic>): void {
    const buildInfoResult = this.state.program.emitBuildInfo?.(this.state.writeFile);
    if (buildInfoResult === undefined) return;
    result.diagnostics = [...result.diagnostics, ...buildInfoResult.diagnostics];
    result.emittedFiles = [...result.emittedFiles, ...buildInfoResult.emittedFiles];
    result.emitSkipped = result.emitSkipped || buildInfoResult.emitSkipped;
  }

  private getEmitWriteFile(target: { readonly file: SourceFile; readonly path: string } | undefined): WriteFileCallback<Diagnostic> | undefined {
    const outerWriteFile = this.state.writeFile;
    if (target === undefined) return outerWriteFile;
    if (this.state.program.computeSignatureWithDiagnostics === undefined) return outerWriteFile;
    return (fileName, text, data) => {
      let differsOnlyInMap = false;
      if (isDeclarationFileName(fileName) && canUseIncrementalState(this.state.snapshot)) {
        const info = this.state.snapshot.fileInfos.get(target.path);
        let emitSignature = "";
        if (info !== undefined && info.signature === info.version) {
          const signature = this.state.program.computeSignatureWithDiagnostics?.(target.file, text, data) ?? "";
          if (data.diagnostics.length === 0) emitSignature = signature;
          if (signature !== info.version && signature !== "") this.state.signatures?.set(target.path, signature);
        }
        if (this.skipDtsOutputOfComposite(target.path, fileName, text, data, emitSignature, (value) => { differsOnlyInMap = value; })) {
          return;
        }
      } else if (isDeclarationFileName(fileName) && data.diagnostics.length !== 0 && this.state.hasEmitDiagnostics !== undefined) {
        this.state.hasEmitDiagnostics.value = true;
      }

      const oldTime = differsOnlyInMap ? this.state.program.getMTime?.(fileName) : undefined;
      outerWriteFile?.(fileName, text, data);
      if (differsOnlyInMap && oldTime !== undefined) this.state.program.setMTime?.(fileName, oldTime);
    };
  }

  private skipDtsOutputOfComposite(
    filePath: string,
    outputFileName: string,
    text: string,
    data: WriteFileData<Diagnostic>,
    newSignature: string,
    setDiffersOnlyInMap: (value: boolean) => void,
  ): boolean {
    if (this.state.snapshot.options.get("composite") !== true) return false;
    const oldSignatureFormat = this.state.emitSignatures?.get(filePath);
    const oldSignature = oldSignatureFormat?.signature ?? oldSignatureFormat?.signatureWithDifferentOptions?.[0] ?? "";
    const signature = newSignature === "" ? this.computeDtsSignatureText(text, data) : newSignature;
    if (signature === oldSignature) {
      if (oldSignatureFormat?.signature === oldSignature) {
        data.skippedDtsWrite = true;
        return true;
      }
      setDiffersOnlyInMap(this.state.snapshot.options.get("build") === true);
    } else {
      this.state.latestChangedDtsFiles?.set(filePath, outputFileName);
    }
    this.state.emitSignatures?.set(filePath, { signature, signatureWithDifferentOptions: undefined });
    return false;
  }

  private computeDtsSignatureText(text: string, data: WriteFileData<Diagnostic>): string {
    const textForSignature = data.diagnostics.length === 0 ? text : `${text}\n${JSON.stringify(data.diagnostics)}`;
    return this.state.program.computeHash?.(textForSignature) ?? textForSignature;
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
    for (const [file, signature] of this.state.signatures ?? []) {
      const info = this.state.snapshot.fileInfos.get(file);
      if (info !== undefined && isMutableProgramSnapshotFileInfo(info)) {
        const mutableInfo = info as { signature: string };
        mutableInfo.signature = signature;
        this.state.buildInfoPending && (this.state.buildInfoPending.value = true);
      }
    }
    for (const [file, signature] of this.state.emitSignatures ?? []) {
      if (isMutableMap(this.state.snapshot, "emitSignatures")) {
        this.state.snapshot.emitSignatures.set(file, signature);
        this.state.buildInfoPending && (this.state.buildInfoPending.value = true);
      }
    }
    for (const path of this.state.deletedPendingKinds) this.state.pendingEmit.delete(path);
    for (const [path, update] of this.state.emitUpdates) {
      if (update.pendingKind === SnapshotFileEmitKind.None) this.state.pendingEmit.delete(path);
      else this.state.pendingEmit.set(path, update.pendingKind);
    }
    const files = this.state.program.getSourceFiles?.() ?? [];
    for (const file of files) {
      const path = this.state.program.pathOf?.(file);
      if (path === undefined) continue;
      const latestChangedDtsFile = this.state.latestChangedDtsFiles?.get(path);
      if (latestChangedDtsFile !== undefined) {
        setSnapshotLatestChangedDtsFile(this.state.snapshot, latestChangedDtsFile);
        if (this.state.hasChangedDtsFile !== undefined) this.state.hasChangedDtsFile.value = true;
        if (this.state.buildInfoPending !== undefined) this.state.buildInfoPending.value = true;
      }
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

function canUseIncrementalState<Diagnostic>(snapshot: ProgramSnapshot<Diagnostic>): boolean {
  return snapshot.fileInfos.size !== 0;
}

function isDeclarationFileName(fileName: string): boolean {
  return fileName.endsWith(".d.ts") || fileName.endsWith(".d.mts") || fileName.endsWith(".d.cts");
}

function isMutableProgramSnapshotFileInfo(info: unknown): info is { signature: string } {
  return typeof info === "object" && info !== null && "signature" in info;
}

function isMutableMap<T extends object, K extends PropertyKey>(value: T, key: K): value is T & Record<K, Map<string, EmitSignature>> {
  const record = value as Record<PropertyKey, unknown>;
  return record[key] instanceof Map;
}

function setSnapshotLatestChangedDtsFile<Diagnostic>(snapshot: ProgramSnapshot<Diagnostic>, latestChangedDtsFile: string): void {
  const mutable = snapshot as { latestChangedDtsFile?: string };
  mutable.latestChangedDtsFile = latestChangedDtsFile;
}
