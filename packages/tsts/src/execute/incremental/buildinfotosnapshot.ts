import type { BuildInfo } from "./buildinfo.js";
import { createProgramSnapshot, type FileInfo, type ProgramSnapshot, type SnapshotFileEmitKind } from "./snapshot.js";

export function buildInfoFileInfoToSnapshot(info: {
  readonly version: string;
  readonly signature?: string | undefined;
  readonly affectsGlobalScope?: boolean | undefined;
  readonly impliedNodeFormat?: string | number | undefined;
}): FileInfo {
  return {
    version: info.version,
    signature: info.signature ?? info.version,
    affectsGlobalScope: info.affectsGlobalScope === true,
    impliedNodeFormat: info.impliedNodeFormat === undefined ? undefined : String(info.impliedNodeFormat),
  };
}

export function buildInfoToSnapshot<Diagnostic = unknown>(buildInfo: BuildInfo): ProgramSnapshot<Diagnostic> {
  const fileInfos = new Map<string, FileInfo>();
  for (let index = 0; index < buildInfo.fileNames.length; index += 1) {
    const fileName = buildInfo.fileNames[index];
    const fileInfo = buildInfo.fileInfos[index];
    if (fileName === undefined || fileInfo === undefined) continue;
    fileInfos.set(fileName, buildInfoFileInfoToSnapshot(fileInfo.getFileInfo()));
  }
  const pendingEmit = new Map<string, SnapshotFileEmitKind>();
  for (const entry of buildInfo.affectedFilesPendingEmit ?? []) {
    const fileName = buildInfo.fileNames[entry.fileId - 1];
    if (fileName !== undefined) pendingEmit.set(fileName, entry.emitKind as unknown as SnapshotFileEmitKind);
  }
  return createProgramSnapshot({
    version: buildInfo.version,
    fileInfos,
    options: buildInfo.options,
    root: buildInfo.root.map((root) => buildInfo.fileNames[root.start - 1]).filter((fileName): fileName is string => fileName !== undefined),
    semanticDiagnosticsPerFile: new Map(),
    emitDiagnosticsPerFile: new Map(),
    pendingEmit,
    latestChangedDtsFile: buildInfo.latestChangedDtsFile,
    errors: [] as Diagnostic[],
    checkPending: buildInfo.checkPending === true,
  });
}
