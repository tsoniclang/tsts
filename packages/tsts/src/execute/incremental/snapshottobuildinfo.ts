import {
  BuildInfo,
  BuildInfoFileInfo,
  BuildInfoFilePendingEmit,
  BuildInfoRoot,
  BuildInfoRootInfoReader,
  FileEmitKind,
} from "./buildinfo.js";
import type { ProgramSnapshot, SnapshotFileEmitKind } from "./snapshot.js";

export interface SnapshotToBuildInfoOptions {
  readonly version: string;
  readonly currentDirectory: string;
  readonly useCaseSensitiveFileNames: boolean;
}

export function snapshotEmitKindToBuildInfo(kind: SnapshotFileEmitKind): FileEmitKind {
  return kind as unknown as FileEmitKind;
}

function snapshotFileInfoToBuildInfo(info: { readonly version: string; readonly signature: string; readonly affectsGlobalScope: boolean; readonly impliedNodeFormat: string | undefined }): BuildInfoFileInfo {
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
  const fileNames = [...snapshot.fileInfos.keys()];
  const roots = snapshot.root.map((root) => new BuildInfoRoot(fileNames.indexOf(root) + 1));
  const fileInfos = fileNames.map((fileName) => {
    const info = snapshot.fileInfos.get(fileName);
    return snapshotFileInfoToBuildInfo({
      version: info?.version ?? "",
      signature: info?.signature ?? info?.version ?? "",
      affectsGlobalScope: info?.affectsGlobalScope === true,
      impliedNodeFormat: info?.impliedNodeFormat,
    });
  });
  const pendingEmit = [...snapshot.pendingEmit].map(([fileName, kind]) => (
    new BuildInfoFilePendingEmit(fileNames.indexOf(fileName) + 1, snapshotEmitKindToBuildInfo(kind))
  ));
  const init = {
    version: options.version,
    fileNames,
    fileInfos,
    root: roots,
    resolvedRoot: [],
    options: snapshot.options instanceof Map ? snapshot.options : new Map<string, unknown>(),
    referencedMap: [],
    semanticDiagnosticsPerFile: [],
    emitDiagnosticsPerFile: [],
    changeFileSet: [],
    errors: false,
    checkPending: snapshot.checkPending,
    affectedFilesPendingEmit: pendingEmit,
    emitSignatures: [],
  };
  if (snapshot.latestChangedDtsFile !== undefined) {
    return new BuildInfo({ ...init, latestChangedDtsFile: snapshot.latestChangedDtsFile });
  }
  return new BuildInfo(init);
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
