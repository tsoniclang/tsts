import {
  BuildInfo,
  BuildInfoDiagnosticsOfFile,
  BuildInfoEmitSignature,
  BuildInfoFileInfo,
  BuildInfoFilePendingEmit,
  BuildInfoReferenceMapEntry,
  BuildInfoResolvedRoot,
  BuildInfoRoot,
  BuildInfoRootInfoReader,
  BuildInfoSemanticDiagnostic,
  FileEmitKind,
  type BuildInfoDiagnostic,
  type BuildInfoFileId,
  type BuildInfoFileIdListId,
} from "./buildInfo.js";
import type { DiagnosticsOrBuildInfoDiagnosticsWithFileName, ProgramSnapshot, ProgramSnapshotFileInfo, SnapshotFileEmitKind } from "./snapshot.js";
import {
  ensurePathIsNonModuleName,
  getDirectoryPath,
  getRelativePathFromDirectory,
  toPath,
} from "../../tspath/index.js";

export interface SnapshotToBuildInfoOptions {
  readonly version: string;
  readonly currentDirectory: string;
  readonly useCaseSensitiveFileNames: boolean;
  readonly buildInfoFileName?: string;
  readonly program?: SnapshotBuildInfoProgram;
}

export interface SnapshotBuildInfoSourceFile {
  readonly path: string;
  readonly fileName: string;
  readonly isJsonSourceFile?: boolean;
  readonly mayBeEmitted?: boolean;
}

export interface SnapshotBuildInfoProgram {
  readonly sourceFiles: readonly SnapshotBuildInfoSourceFile[];
  readonly rootFileNames: readonly string[];
  getDefaultLibFile?(path: string): { readonly name: string; readonly replaced?: boolean } | undefined;
  getParseFileRedirect?(fileName: string): string | undefined;
  getSourceFile?(fileName: string): SnapshotBuildInfoSourceFile | undefined;
  getSourceFileByPath?(path: string): SnapshotBuildInfoSourceFile | undefined;
  sourceFileMayBeEmitted?(file: SnapshotBuildInfoSourceFile): boolean;
}

interface FileIdSet {
  readonly fileIds: readonly BuildInfoFileId[];
  readonly key: string;
}

interface BuildInfoDiagnosticWithFileNameLike {
  readonly file: string | undefined;
  readonly noFile: boolean;
  readonly pos: number;
  readonly end: number;
  readonly code: number;
  readonly category: string;
  readonly messageKey: string;
  readonly messageArgs: readonly string[];
  readonly messageChain: readonly BuildInfoDiagnosticWithFileNameLike[];
  readonly relatedInformation: readonly BuildInfoDiagnosticWithFileNameLike[];
  readonly reportsUnnecessary: boolean;
  readonly reportsDeprecated: boolean;
  readonly skippedOnNoEmit: boolean;
}

export function snapshotEmitKindToBuildInfo(kind: SnapshotFileEmitKind): FileEmitKind {
  return kind as unknown as FileEmitKind;
}

function snapshotFileInfoToBuildInfo(info: ProgramSnapshotFileInfo): BuildInfoFileInfo {
  return BuildInfoFileInfo.fromFileInfo({
    version: info.version,
    signature: info.signature,
    affectsGlobalScope: info.affectsGlobalScope,
    impliedNodeFormat: undefined,
  });
}

export function snapshotToBuildInfo<Diagnostic>(
  snapshot: ProgramSnapshot<Diagnostic>,
  options: SnapshotToBuildInfoOptions,
): BuildInfo {
  const writer = new SnapshotBuildInfoWriter(snapshot, options);
  return writer.toBuildInfo();
}

export function snapshotRootInfoReader<Diagnostic>(
  snapshot: ProgramSnapshot<Diagnostic>,
  options: SnapshotToBuildInfoOptions,
): BuildInfoRootInfoReader {
  return snapshotToBuildInfo(snapshot, options).getBuildInfoRootInfoReader(
    options.currentDirectory,
    options.useCaseSensitiveFileNames,
  );
}

class SnapshotBuildInfoWriter<Diagnostic> {
  private readonly snapshot: ProgramSnapshot<Diagnostic>;
  private readonly options: SnapshotToBuildInfoOptions;
  private readonly buildInfoDirectory: string;
  private readonly fileNameToFileId = new Map<string, BuildInfoFileId>();
  private readonly fileNamesToFileIdListId = new Map<string, BuildInfoFileIdListId>();
  private readonly fileNames: string[] = [];
  private readonly fileIdsList: (readonly BuildInfoFileId[])[];
  private readonly roots = new Map<string, string>();

  constructor(snapshot: ProgramSnapshot<Diagnostic>, options: SnapshotToBuildInfoOptions) {
    this.snapshot = snapshot;
    this.options = options;
    this.buildInfoDirectory = getDirectoryPath(options.buildInfoFileName ?? "");
    this.fileIdsList = [];
  }

  toBuildInfo(): BuildInfo {
    if (this.isIncrementalSnapshot()) {
      this.collectRootFiles();
      const fileInfos = this.setFileInfoAndEmitSignatures();
      const root = this.setRootOfIncrementalProgram();
      const init = this.commonInit(root, fileInfos);
      const latestChangedDtsFile = this.snapshot.latestChangedDtsFile === undefined
        ? {}
        : { latestChangedDtsFile: this.relativeToBuildInfo(this.snapshot.latestChangedDtsFile) };
      return new BuildInfo({
        ...init,
        fileIdsList: this.fileIdsList,
        referencedMap: this.setReferencedMap(),
        semanticDiagnosticsPerFile: this.setSemanticDiagnostics(),
        emitDiagnosticsPerFile: this.setEmitDiagnostics(),
        changeFileSet: this.setChangeFileSet(),
        affectedFilesPendingEmit: this.setAffectedFilesPendingEmit(),
        emitSignatures: this.setEmitSignatures(),
        resolvedRoot: this.setResolvedRoots(),
        ...latestChangedDtsFile,
      });
    }
    return new BuildInfo({
      ...this.commonInit(this.setRootOfNonIncrementalProgram(), []),
      fileIdsList: this.fileIdsList,
    });
  }

  private commonInit(root: readonly BuildInfoRoot[], fileInfos: readonly BuildInfoFileInfo[]): {
    readonly version: string;
    readonly fileNames: readonly string[];
    readonly fileInfos: readonly BuildInfoFileInfo[];
    readonly root: readonly BuildInfoRoot[];
    readonly options: ReadonlyMap<string, unknown>;
    readonly errors: boolean;
    readonly checkPending: boolean;
    readonly semanticErrors: boolean;
  } {
    return {
      version: this.options.version,
      fileNames: this.fileNames,
      fileInfos,
      root,
      options: new Map(this.snapshot.options),
      errors: this.snapshot.errors.length > 0,
      checkPending: this.snapshot.checkPending,
      semanticErrors: this.hasSemanticErrors(),
    };
  }

  private isIncrementalSnapshot(): boolean {
    return this.snapshot.fileInfos.size > 0;
  }

  private comparePathsOptions(): { readonly currentDirectory: string; readonly useCaseSensitiveFileNames: boolean } {
    return {
      currentDirectory: this.options.currentDirectory,
      useCaseSensitiveFileNames: this.options.useCaseSensitiveFileNames,
    };
  }

  private relativeToBuildInfo(path: string): string {
    if (this.buildInfoDirectory === "") return path;
    return ensurePathIsNonModuleName(getRelativePathFromDirectory(this.buildInfoDirectory, path, this.comparePathsOptions()));
  }

  private toFileId(path: string): BuildInfoFileId {
    const existing = this.fileNameToFileId.get(path);
    if (existing !== undefined) return existing;
    const libFile = this.options.program?.getDefaultLibFile?.(path);
    const fileName = libFile !== undefined && libFile.replaced !== true
      ? libFile.name
      : this.relativeToBuildInfo(path);
    this.fileNames.push(fileName);
    const fileId = this.fileNames.length as BuildInfoFileId;
    this.fileNameToFileId.set(path, fileId);
    return fileId;
  }

  private fileIdSet(set: ReadonlySet<string>): FileIdSet {
    const fileIds = [...set].map((path) => this.toFileId(path)).sort((left, right) => left - right);
    return { fileIds, key: fileIds.join(",") };
  }

  private toFileIdListId(set: ReadonlySet<string>): BuildInfoFileIdListId {
    const fileIdSet = this.fileIdSet(set);
    const existing = this.fileNamesToFileIdListId.get(fileIdSet.key);
    if (existing !== undefined) return existing;
    this.fileIdsList.push(fileIdSet.fileIds);
    const fileIdListId = this.fileIdsList.length as BuildInfoFileIdListId;
    this.fileNamesToFileIdListId.set(fileIdSet.key, fileIdListId);
    return fileIdListId;
  }

  private collectRootFiles(): void {
    const program = this.options.program;
    if (program === undefined) {
      for (const root of this.snapshot.root) this.roots.set(root, root);
      return;
    }
    for (const fileName of program.rootFileNames) {
      const redirect = program.getParseFileRedirect?.(fileName);
      const file = redirect !== undefined && redirect !== ""
        ? program.getSourceFile?.(redirect)
        : program.getSourceFile?.(fileName);
      if (file !== undefined) {
        this.roots.set(
          file.path,
          toPath(fileName, this.options.currentDirectory, this.options.useCaseSensitiveFileNames),
        );
      }
    }
  }

  private sourceFiles(): readonly SnapshotBuildInfoSourceFile[] {
    if (this.options.program !== undefined) return this.options.program.sourceFiles;
    return [...this.snapshot.fileInfos.keys()].map((path) => ({ path, fileName: path }));
  }

  private setFileInfoAndEmitSignatures(): readonly BuildInfoFileInfo[] {
    const result: BuildInfoFileInfo[] = [];
    for (const file of this.sourceFiles()) {
      const info = this.snapshot.fileInfos.get(file.path);
      if (info === undefined) continue;
      this.toFileId(file.path);
      result.push(snapshotFileInfoToBuildInfo(info));
    }
    return result;
  }

  private setEmitSignatures(): readonly BuildInfoEmitSignature[] {
    if (this.snapshot.options.get("composite") !== true) return [];
    const result: BuildInfoEmitSignature[] = [];
    for (const file of this.sourceFiles()) {
      const info = this.snapshot.fileInfos.get(file.path);
      if (info === undefined || !this.shouldEmitSignature(file)) continue;
      const fileId = this.toFileId(file.path);
      const emitSignature = this.snapshot.emitSignatures.get(file.path);
      if (emitSignature === undefined) {
        result.push(new BuildInfoEmitSignature(fileId));
      } else if ((emitSignature.signature ?? "") !== info.signature) {
        if (emitSignature.signature !== undefined && emitSignature.signature !== "") {
          result.push(new BuildInfoEmitSignature(fileId, emitSignature.signature));
        } else if (emitSignature.signatureWithDifferentOptions?.[0] === info.signature) {
          result.push(new BuildInfoEmitSignature(fileId, "", true, false));
        } else {
          result.push(new BuildInfoEmitSignature(fileId, emitSignature.signatureWithDifferentOptions?.[0] ?? "", false, true));
        }
      }
    }
    return result;
  }

  private shouldEmitSignature(file: SnapshotBuildInfoSourceFile): boolean {
    if (file.isJsonSourceFile === true) return false;
    return this.options.program?.sourceFileMayBeEmitted?.(file) ?? file.mayBeEmitted ?? true;
  }

  private setRootOfIncrementalProgram(): readonly BuildInfoRoot[] {
    const roots: BuildInfoRoot[] = [];
    const sortedRoots = [...this.roots].sort((left, right) => this.toFileId(left[0]) - this.toFileId(right[0]));
    for (const [resolvedPath] of sortedRoots) {
      const resolved = this.toFileId(resolvedPath);
      const last = roots[roots.length - 1];
      if (last === undefined) {
        roots.push(new BuildInfoRoot(resolved));
      } else if (last.end === resolved - 1) {
        roots[roots.length - 1] = new BuildInfoRoot(last.start, resolved);
      } else if (last.end === 0 && last.start === resolved - 1) {
        roots[roots.length - 1] = new BuildInfoRoot(last.start, resolved);
      } else {
        roots.push(new BuildInfoRoot(resolved));
      }
    }
    return roots;
  }

  private setResolvedRoots(): readonly BuildInfoResolvedRoot[] {
    const result: BuildInfoResolvedRoot[] = [];
    for (const [resolvedPath, rootPath] of this.roots) {
      const resolved = this.toFileId(resolvedPath);
      const root = this.toFileId(rootPath);
      if (root !== resolved) result.push(new BuildInfoResolvedRoot(resolved, root));
    }
    return result.sort((left, right) => left.resolved - right.resolved);
  }

  private setRootOfNonIncrementalProgram(): readonly BuildInfoRoot[] {
    const roots = this.options.program?.rootFileNames ?? this.snapshot.root;
    return roots.map((fileName) => new BuildInfoRoot(
      0 as BuildInfoFileId,
      0 as BuildInfoFileId,
      this.relativeToBuildInfo(toPath(fileName, this.options.currentDirectory, this.options.useCaseSensitiveFileNames)),
    ));
  }

  private setReferencedMap(): readonly BuildInfoReferenceMapEntry[] {
    const references = this.snapshot.references;
    if (references === undefined) return [];
    return [...references]
      .filter((entry): entry is [string, ReadonlySet<string>] => entry[1].size > 0)
      .sort((left, right) => left[0].localeCompare(right[0]))
      .map(([filePath, refs]) => new BuildInfoReferenceMapEntry(this.toFileId(filePath), this.toFileIdListId(refs)));
  }

  private setChangeFileSet(): readonly BuildInfoFileId[] {
    return [...(this.snapshot.changedFilesSet ?? new Set<string>())]
      .sort()
      .map((filePath) => this.toFileId(filePath));
  }

  private setSemanticDiagnostics(): readonly BuildInfoSemanticDiagnostic[] {
    const result: BuildInfoSemanticDiagnostic[] = [];
    for (const file of this.sourceFiles()) {
      const value = this.snapshot.semanticDiagnosticsPerFile.get(file.path);
      if (value === undefined) {
        if (this.snapshot.changedFilesSet?.has(file.path) !== true) {
          result.push(new BuildInfoSemanticDiagnostic(this.toFileId(file.path)));
        }
      } else {
        const diagnostics = this.toBuildInfoDiagnosticsOfFile(file.path, value);
        if (diagnostics !== undefined) result.push(new BuildInfoSemanticDiagnostic(0 as BuildInfoFileId, diagnostics));
      }
    }
    return result;
  }

  private setEmitDiagnostics(): readonly BuildInfoDiagnosticsOfFile[] {
    return [...this.snapshot.emitDiagnosticsPerFile]
      .sort((left, right) => left[0].localeCompare(right[0]))
      .map(([filePath, value]) => this.toBuildInfoDiagnosticsOfFile(filePath, value))
      .filter((value): value is BuildInfoDiagnosticsOfFile => value !== undefined);
  }

  private setAffectedFilesPendingEmit(): readonly BuildInfoFilePendingEmit[] {
    const result: BuildInfoFilePendingEmit[] = [];
    for (const [filePath, pendingEmit] of [...this.snapshot.pendingEmit].sort((left, right) => left[0].localeCompare(right[0]))) {
      const file = this.options.program?.getSourceFileByPath?.(filePath) ?? this.sourceFiles().find((sourceFile) => sourceFile.path === filePath);
      if (file !== undefined && !this.shouldEmitSignature(file)) continue;
      result.push(new BuildInfoFilePendingEmit(this.toFileId(filePath), snapshotEmitKindToBuildInfo(pendingEmit)));
    }
    return result;
  }

  private toBuildInfoDiagnosticsOfFile(
    filePath: string,
    diagnostics: DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>,
  ): BuildInfoDiagnosticsOfFile | undefined {
    const convertedDiagnostics = diagnostics.diagnostics.map((diagnostic) => this.toBuildInfoDiagnostic(filePath, diagnostic));
    const convertedBuildInfoDiagnostics = diagnostics.buildInfoDiagnostics.map((diagnostic) => this.toBuildInfoDiagnosticWithFileName(diagnostic));
    const allDiagnostics = [...convertedDiagnostics, ...convertedBuildInfoDiagnostics];
    if (allDiagnostics.length === 0) return undefined;
    return new BuildInfoDiagnosticsOfFile(this.toFileId(filePath), allDiagnostics);
  }

  private toBuildInfoDiagnostic(filePath: string, diagnostic: Diagnostic): BuildInfoDiagnostic {
    if (isDiagnosticRecord(diagnostic)) {
      return stripUndefinedDiagnostic({
        file: diagnostic.file === undefined || diagnostic.file === filePath ? undefined : this.toFileId(diagnostic.file),
        noFile: diagnostic.noFile,
        pos: diagnostic.pos,
        end: diagnostic.end,
        code: diagnostic.code,
        category: diagnostic.category,
        messageKey: diagnostic.messageKey,
        messageArgs: diagnostic.messageArgs,
        messageChain: diagnostic.messageChain?.map((entry) => this.toBuildInfoDiagnostic(filePath, entry as Diagnostic)),
        relatedInformation: diagnostic.relatedInformation?.map((entry) => this.toBuildInfoDiagnostic(filePath, entry as Diagnostic)),
        reportsUnnecessary: diagnostic.reportsUnnecessary,
        reportsDeprecated: diagnostic.reportsDeprecated,
        skippedOnNoEmit: diagnostic.skippedOnNoEmit,
      });
    }
    return {};
  }

  private toBuildInfoDiagnosticWithFileName(diagnostic: BuildInfoDiagnosticWithFileNameLike): BuildInfoDiagnostic {
    return stripUndefinedDiagnostic({
      file: diagnostic.file === undefined ? undefined : this.toFileId(diagnostic.file),
      noFile: diagnostic.noFile,
      pos: diagnostic.pos,
      end: diagnostic.end,
      code: diagnostic.code,
      category: numericDiagnosticField(diagnostic.category),
      messageKey: numericDiagnosticField(diagnostic.messageKey),
      messageArgs: diagnostic.messageArgs,
      messageChain: diagnostic.messageChain.map((entry) => this.toBuildInfoDiagnosticWithFileName(entry)),
      relatedInformation: diagnostic.relatedInformation.map((entry) => this.toBuildInfoDiagnosticWithFileName(entry)),
      reportsUnnecessary: diagnostic.reportsUnnecessary,
      reportsDeprecated: diagnostic.reportsDeprecated,
      skippedOnNoEmit: diagnostic.skippedOnNoEmit,
    });
  }

  private hasSemanticErrors(): boolean {
    for (const value of this.snapshot.semanticDiagnosticsPerFile.values()) {
      if (value.diagnostics.length > 0 || value.buildInfoDiagnostics.length > 0) return true;
    }
    return false;
  }
}

function isDiagnosticRecord(value: unknown): value is {
  readonly file?: string;
  readonly noFile?: boolean;
  readonly pos?: number;
  readonly end?: number;
  readonly code?: number;
  readonly category?: number;
  readonly messageKey?: number;
  readonly messageArgs?: readonly string[];
  readonly messageChain?: readonly unknown[];
  readonly relatedInformation?: readonly unknown[];
  readonly reportsUnnecessary?: boolean;
  readonly reportsDeprecated?: boolean;
  readonly skippedOnNoEmit?: boolean;
} {
  return typeof value === "object" && value !== null;
}

function stripUndefinedDiagnostic(diagnostic: Record<string, unknown>): BuildInfoDiagnostic {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(diagnostic)) {
    if (value !== undefined) result[key] = value;
  }
  return result as BuildInfoDiagnostic;
}

function numericDiagnosticField(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
