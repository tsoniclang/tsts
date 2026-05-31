import type { BuildInfo } from "./buildInfo.js";
import {
  createProgramSnapshotFromParts,
  type DiagnosticsOrBuildInfoDiagnosticsWithFileName,
  type ProgramSnapshotFileInfo,
  type ProgramSnapshot,
  type SnapshotFileEmitKind,
} from "./snapshot.js";

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
  const fileInfos = new Map<string, ProgramSnapshotFileInfo>();
  for (let index = 0; index < buildInfo.fileNames.length; index += 1) {
    const fileName = buildInfo.fileNames[index];
    const fileInfo = buildInfo.fileInfos[index];
    if (fileName === undefined || fileInfo === undefined) continue;
    fileInfos.set(fileName, buildInfoFileInfoToSnapshot(fileInfo.getFileInfo()));
  }
  const pendingEmit = new Map<string, SnapshotFileEmitKind>();
  for (const entry of buildInfo.affectedFilesPendingEmit ?? []) {
    const fileName = buildInfo.fileName(entry.fileId);
    if (fileName !== "") pendingEmit.set(fileName, entry.emitKind as unknown as SnapshotFileEmitKind);
  }
  const roots: string[] = [];
  for (const root of buildInfo.root) {
    const fileName = buildInfo.fileName(root.start);
    if (fileName !== "") roots.push(fileName);
  }
  return createProgramSnapshotFromParts(
    buildInfo.version,
    fileInfos,
    buildInfo.options,
    roots,
    new Map<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>(),
    new Map<string, DiagnosticsOrBuildInfoDiagnosticsWithFileName<Diagnostic>>(),
    pendingEmit,
    buildInfo.latestChangedDtsFile,
    [] as Diagnostic[],
    buildInfo.checkPending === true,
  );
}
