import { FileEmitKind, type BuildInfo, type BuildInfoDiagnostic, type BuildInfoDiagnosticsOfFile, type BuildInfoFileId, type BuildInfoFileIdListId } from "./buildInfo.js";
import {
  createProgramSnapshotFromParts,
  type DiagnosticsOrBuildInfoDiagnosticsWithFileName,
  type BuildInfoDiagnosticWithFileName,
  type EmitSignature,
  type ProgramSnapshotFileInfo,
  type ProgramSnapshot,
  type SnapshotFileEmitKind,
} from "./snapshot.js";
import { SnapshotFileEmitKind as SnapshotEmitKind } from "./snapshot.js";

export function buildInfoFileInfoToSnapshot(info: {
  readonly version: string;
  readonly signature?: string | undefined;
  readonly affectsGlobalScope?: boolean | undefined;
  readonly impliedNodeFormat?: string | number | undefined;
}): ProgramSnapshotFileInfo {
  return {
    version: info.version,
    signature: info.signature ?? info.version,
    affectsGlobalScope: info.affectsGlobalScope === true,
    impliedNodeFormat: info.impliedNodeFormat === undefined ? undefined : String(info.impliedNodeFormat),
  };
}

export function buildInfoToSnapshot<Diagnostic = unknown>(buildInfo: BuildInfo): ProgramSnapshot<Diagnostic> {
  const converter = new BuildInfoSnapshotConverter<Diagnostic>(buildInfo);
  return converter.convert();
}

class BuildInfoSnapshotConverter<Diagnostic> {
  private readonly buildInfo: BuildInfo;
  private readonly filePaths: readonly string[];
  private readonly filePathSets: readonly ReadonlySet<string>[];

  constructor(buildInfo: BuildInfo) {
    this.buildInfo = buildInfo;
    this.filePaths = buildInfo.fileNames.map((fileName) => normalizeBuildInfoFileName(fileName));
    this.filePathSets = buildInfo.fileIdsList.map((ids) => new Set(ids.map((id) => this.toFilePath(id))));
  }

  convert(): ProgramSnapshot<Diagnostic> {
    const fileInfos = this.fileInfos();
    const references = this.referencedMap();
    return createProgramSnapshotFromParts(
      this.buildInfo.version,
      fileInfos,
      this.buildInfo.options,
      this.roots(),
      this.semanticDiagnostics(fileInfos, this.changedFiles()),
      this.emitDiagnostics(),
      this.affectedFilesPendingEmit(),
      this.emitSignatures(fileInfos),
      this.buildInfo.latestChangedDtsFile === "" ? undefined : normalizeBuildInfoFileName(this.buildInfo.latestChangedDtsFile),
      [] as Diagnostic[],
      this.buildInfo.checkPending === true,
      undefined,
      references,
      this.changedFiles(),
    );
  }

  private toFilePath(fileId: BuildInfoFileId): string {
    return this.filePaths[fileId - 1] ?? "";
  }

  private toFilePathSet(fileIdListId: BuildInfoFileIdListId): ReadonlySet<string> {
    return this.filePathSets[fileIdListId - 1] ?? new Set<string>();
  }

  private fileInfos(): Map<string, ProgramSnapshotFileInfo> {
    const fileInfos = new Map<string, ProgramSnapshotFileInfo>();
    for (let index = 0; index < this.buildInfo.fileInfos.length; index += 1) {
      const fileName = this.toFilePath((index + 1) as BuildInfoFileId);
      const fileInfo = this.buildInfo.fileInfos[index];
      if (fileName === "" || fileInfo === undefined) continue;
      fileInfos.set(fileName, buildInfoFileInfoToSnapshot(fileInfo.getFileInfo()));
    }
    return fileInfos;
  }

  private roots(): readonly string[] {
    const roots: string[] = [];
    for (const root of this.buildInfo.root) {
      if (root.nonIncremental !== "") {
        roots.push(normalizeBuildInfoFileName(root.nonIncremental));
      } else if (root.end === 0) {
        const fileName = this.toFilePath(root.start);
        if (fileName !== "") roots.push(fileName);
      } else {
        for (let fileId = root.start; fileId <= root.end; fileId += 1) {
          const fileName = this.toFilePath(fileId as BuildInfoFileId);
          if (fileName !== "") roots.push(fileName);
        }
      }
    }
    return roots;
  }

  private referencedMap(): ReadonlyMap<string, ReadonlySet<string>> {
    const references = new Map<string, ReadonlySet<string>>();
    for (const entry of this.buildInfo.referencedMap) {
      const filePath = this.toFilePath(entry.fileId);
      if (filePath !== "") references.set(filePath, new Set(this.toFilePathSet(entry.fileIdListId)));
    }
    return references;
  }

  private changedFiles(): ReadonlySet<string> {
    const changed = new Set<string>();
    for (const fileId of this.buildInfo.changeFileSet) {
      const filePath = this.toFilePath(fileId);
      if (filePath !== "") changed.add(filePath);
    }
    return changed;
  }

  private semanticDiagnostics(
    fileInfos: ReadonlyMap<string, ProgramSnapshotFileInfo>,
    changedFiles: ReadonlySet<string>,
  ): ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>> {
    const diagnostics = new Map<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>();
    for (const path of fileInfos.keys()) {
      if (!changedFiles.has(path)) {
        diagnostics.set(path, { diagnostics: [], buildInfoDiagnostics: [] });
      }
    }
    for (const entry of this.buildInfo.semanticDiagnosticsPerFile) {
      if (entry.fileId !== 0) {
        diagnostics.delete(this.toFilePath(entry.fileId));
        continue;
      }
      if (entry.diagnostics !== undefined) {
        diagnostics.set(this.toFilePath(entry.diagnostics.fileId), this.diagnosticsOfFile(entry.diagnostics));
      }
    }
    return diagnostics;
  }

  private emitDiagnostics(): ReadonlyMap<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>> {
    const diagnostics = new Map<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>();
    for (const entry of this.buildInfo.emitDiagnosticsPerFile) {
      diagnostics.set(this.toFilePath(entry.fileId), this.diagnosticsOfFile(entry));
    }
    return diagnostics;
  }

  private affectedFilesPendingEmit(): ReadonlyMap<string, SnapshotFileEmitKind> {
    const pendingEmit = new Map<string, SnapshotFileEmitKind>();
    for (const entry of this.buildInfo.affectedFilesPendingEmit) {
      const fileName = this.toFilePath(entry.fileId);
      if (fileName === "") continue;
      pendingEmit.set(fileName, buildInfoFileEmitKindToSnapshot(entry.emitKind));
    }
    return pendingEmit;
  }

  private emitSignatures(fileInfos: ReadonlyMap<string, ProgramSnapshotFileInfo>): ReadonlyMap<string, EmitSignature> {
    const emitSignatures = new Map<string, EmitSignature>();
    const isComposite = this.buildInfo.options.get("composite") === true;
    if (isComposite) {
      for (const [path, info] of fileInfos) {
        if (info.signature !== "") {
          emitSignatures.set(path, { signature: info.signature, signatureWithDifferentOptions: undefined });
        }
      }
    }
    for (const value of this.buildInfo.emitSignatures) {
      const path = this.toFilePath(value.fileId);
      if (path === "") continue;
      if (value.noEmitSignature()) {
        emitSignatures.delete(path);
      } else {
        emitSignatures.set(path, value.toEmitSignature(path, emitSignatures));
      }
    }
    return emitSignatures;
  }

  private diagnosticsOfFile(diagnostics: BuildInfoDiagnosticsOfFile): DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic> {
    return {
      diagnostics: [],
      buildInfoDiagnostics: this.buildInfoDiagnostics(diagnostics.diagnostics),
    };
  }

  private buildInfoDiagnostics(diagnostics: readonly BuildInfoDiagnostic[]): readonly BuildInfoDiagnosticWithFileName[] {
    return diagnostics.map((diagnostic) => {
      const file = diagnostic.file === undefined || diagnostic.file === 0 ? undefined : this.toFilePath(diagnostic.file);
      return {
        file,
        noFile: diagnostic.noFile === true,
        pos: diagnostic.pos ?? 0,
        end: diagnostic.end ?? 0,
        code: diagnostic.code ?? 0,
        category: String(diagnostic.category ?? ""),
        messageKey: String(diagnostic.messageKey ?? ""),
        messageArgs: diagnostic.messageArgs ?? [],
        messageChain: this.buildInfoDiagnostics(diagnostic.messageChain ?? []),
        relatedInformation: this.buildInfoDiagnostics(diagnostic.relatedInformation ?? []),
        reportsUnnecessary: diagnostic.reportsUnnecessary === true,
        reportsDeprecated: diagnostic.reportsDeprecated === true,
        skippedOnNoEmit: diagnostic.skippedOnNoEmit === true,
        repopulateInfo: diagnostic.repopulateInfo,
      };
    });
  }
}

function buildInfoFileEmitKindToSnapshot(emitKind: FileEmitKind): SnapshotFileEmitKind {
  if (emitKind === FileEmitKind.Default) return SnapshotEmitKind.All;
  let result = SnapshotEmitKind.None;
  if ((emitKind & FileEmitKind.Js) !== 0) result |= SnapshotEmitKind.AllJs;
  if ((emitKind & FileEmitKind.Dts) !== 0) result |= SnapshotEmitKind.Dts;
  if ((emitKind & FileEmitKind.DtsErrors) !== 0) result |= SnapshotEmitKind.DtsErrors;
  return result;
}

function normalizeBuildInfoFileName(fileName: string): string {
  return fileName.replace(/\\/g, "/");
}
