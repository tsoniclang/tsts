export interface BuildInfoRootLike {
  readonly start?: number;
  readonly end?: number;
  readonly nonIncremental?: string;
}

export interface BuildInfoFileInfoLike {
  readonly version?: string;
  readonly signature?: string;
  readonly affectsGlobalScope?: boolean;
  readonly impliedNodeFormat?: string | number;
}

export interface BuildInfoDiagnosticLike {
  readonly file?: number;
  readonly noFile?: boolean;
  readonly pos?: number;
  readonly end?: number;
  readonly code?: number;
  readonly category?: string | number;
  readonly messageKey?: string;
  readonly messageArgs?: readonly string[];
  readonly messageChain?: readonly BuildInfoDiagnosticLike[];
  readonly relatedInformation?: readonly BuildInfoDiagnosticLike[];
  readonly reportsUnnecessary?: boolean;
  readonly reportsDeprecated?: boolean;
  readonly skippedOnNoEmit?: boolean;
}

export interface BuildInfoDiagnosticsOfFileLike {
  readonly fileId: number;
  readonly diagnostics: readonly BuildInfoDiagnosticLike[];
}

export interface BuildInfoFilePendingEmitLike {
  readonly fileId: number;
  readonly emitKind?: string | number;
}

export interface BuildInfoEmitSignatureLike {
  readonly fileId: number;
  readonly signature: string;
  readonly differsOnlyInDtsMap?: boolean;
  readonly differsInOptions?: boolean;
}

export interface BuildInfoResolvedRootLike {
  readonly resolved: number;
  readonly root: number;
}

export interface BuildInfoLike {
  readonly version: string;
  readonly fileNames: readonly string[];
  readonly errors?: boolean;
  readonly checkPending?: boolean;
  readonly root?: readonly BuildInfoRootLike[];
  readonly fileInfos?: readonly BuildInfoFileInfoLike[];
  readonly fileIdsList?: readonly (readonly number[])[];
  readonly options?: ReadonlyMap<string, unknown> | Record<string, unknown>;
  readonly referencedMap?: readonly { readonly fileId: number; readonly fileIdListId: number }[];
  readonly semanticDiagnosticsPerFile?: readonly (number | BuildInfoDiagnosticsOfFileLike)[];
  readonly emitDiagnosticsPerFile?: readonly BuildInfoDiagnosticsOfFileLike[];
  readonly changeFileSet?: readonly number[];
  readonly affectedFilesPendingEmit?: readonly BuildInfoFilePendingEmitLike[];
  readonly latestChangedDtsFile?: string;
  readonly emitSignatures?: readonly BuildInfoEmitSignatureLike[];
  readonly resolvedRoot?: readonly BuildInfoResolvedRootLike[];
  readonly semanticErrors?: boolean;
}

export interface ReadableBuildInfoRoot {
  readonly files: readonly string[];
  readonly original: BuildInfoRootLike;
}

export interface ReadableBuildInfoFileInfo {
  readonly fileName: string;
  readonly version: string;
  readonly signature: string;
  readonly affectsGlobalScope: boolean;
  readonly impliedNodeFormat: string;
  readonly original?: BuildInfoFileInfoLike;
}

export interface ReadableBuildInfoDiagnostic {
  readonly file?: string | undefined;
  readonly noFile?: boolean | undefined;
  readonly pos?: number | undefined;
  readonly end?: number | undefined;
  readonly code?: number | undefined;
  readonly category?: string | number | undefined;
  readonly messageKey?: string | undefined;
  readonly messageArgs?: readonly string[] | undefined;
  readonly messageChain?: readonly ReadableBuildInfoDiagnostic[] | undefined;
  readonly relatedInformation?: readonly ReadableBuildInfoDiagnostic[] | undefined;
  readonly reportsUnnecessary?: boolean | undefined;
  readonly reportsDeprecated?: boolean | undefined;
  readonly skippedOnNoEmit?: boolean | undefined;
}

export interface ReadableBuildInfoDiagnosticsOfFile {
  readonly file: string;
  readonly diagnostics: readonly ReadableBuildInfoDiagnostic[];
}

export interface ReadableBuildInfoSemanticDiagnostic {
  readonly file?: string;
  readonly diagnostics?: ReadableBuildInfoDiagnosticsOfFile;
}

export interface ReadableBuildInfoFilePendingEmit {
  readonly file: string;
  readonly emitKind: string;
  readonly original: BuildInfoFilePendingEmitLike;
}

export interface ReadableBuildInfoEmitSignature {
  readonly file: string;
  readonly signature: string;
  readonly differsOnlyInDtsMap?: boolean | undefined;
  readonly differsInOptions?: boolean | undefined;
  readonly original: BuildInfoEmitSignatureLike;
}

export interface ReadableBuildInfoResolvedRoot {
  readonly resolved: string;
  readonly root: string;
}

export interface ReadableBuildInfo {
  readonly version: string;
  readonly errors?: boolean | undefined;
  readonly checkPending?: boolean | undefined;
  readonly root?: readonly ReadableBuildInfoRoot[] | undefined;
  readonly fileNames?: readonly string[] | undefined;
  readonly fileInfos?: readonly ReadableBuildInfoFileInfo[] | undefined;
  readonly fileIdsList?: readonly (readonly string[])[] | undefined;
  readonly options?: Record<string, unknown> | undefined;
  readonly referencedMap?: Record<string, readonly string[]> | undefined;
  readonly semanticDiagnosticsPerFile?: readonly ReadableBuildInfoSemanticDiagnostic[] | undefined;
  readonly emitDiagnosticsPerFile?: readonly ReadableBuildInfoDiagnosticsOfFile[] | undefined;
  readonly changeFileSet?: readonly string[] | undefined;
  readonly affectedFilesPendingEmit?: readonly ReadableBuildInfoFilePendingEmit[] | undefined;
  readonly latestChangedDtsFile?: string | undefined;
  readonly emitSignatures?: readonly ReadableBuildInfoEmitSignature[] | undefined;
  readonly resolvedRoot?: readonly ReadableBuildInfoResolvedRoot[] | undefined;
  readonly size: number;
  readonly semanticErrors?: boolean | undefined;
}

function fileName(buildInfo: BuildInfoLike, fileId: number): string {
  return buildInfo.fileNames[fileId - 1] ?? "";
}

function fileIdList(buildInfo: BuildInfoLike, fileIdListId: number): readonly string[] {
  const ids = buildInfo.fileIdsList?.[fileIdListId - 1] ?? [];
  return ids.map((id) => fileName(buildInfo, id));
}

function readableRoot(buildInfo: BuildInfoLike, root: BuildInfoRootLike): ReadableBuildInfoRoot {
  let files: readonly string[];
  if (root.nonIncremental !== undefined && root.nonIncremental !== "") {
    files = [root.nonIncremental];
  } else if (root.end === undefined || root.end === 0) {
    files = [fileName(buildInfo, root.start ?? 0)];
  } else {
    const out: string[] = [];
    for (let id = root.start ?? 0; id <= root.end; id += 1) out.push(fileName(buildInfo, id));
    files = out;
  }
  return { files, original: root };
}

function readableDiagnostic(buildInfo: BuildInfoLike, diagnostic: BuildInfoDiagnosticLike): ReadableBuildInfoDiagnostic {
  return {
    file: diagnostic.file === undefined || diagnostic.file === 0 ? undefined : fileName(buildInfo, diagnostic.file),
    noFile: diagnostic.noFile,
    pos: diagnostic.pos,
    end: diagnostic.end,
    code: diagnostic.code,
    category: diagnostic.category,
    messageKey: diagnostic.messageKey,
    messageArgs: diagnostic.messageArgs,
    messageChain: diagnostic.messageChain?.map((entry) => readableDiagnostic(buildInfo, entry)),
    relatedInformation: diagnostic.relatedInformation?.map((entry) => readableDiagnostic(buildInfo, entry)),
    reportsUnnecessary: diagnostic.reportsUnnecessary,
    reportsDeprecated: diagnostic.reportsDeprecated,
    skippedOnNoEmit: diagnostic.skippedOnNoEmit,
  };
}

function readableDiagnosticsOfFile(buildInfo: BuildInfoLike, diagnostics: BuildInfoDiagnosticsOfFileLike): ReadableBuildInfoDiagnosticsOfFile {
  return {
    file: fileName(buildInfo, diagnostics.fileId),
    diagnostics: diagnostics.diagnostics.map((entry) => readableDiagnostic(buildInfo, entry)),
  };
}

function readableOptions(options: BuildInfoLike["options"]): Record<string, unknown> | undefined {
  if (options === undefined) return undefined;
  if (options instanceof Map) return Object.fromEntries(options.entries());
  return { ...options };
}

function readableEmitKind(kind: string | number | undefined): string {
  if (kind === undefined || kind === 0) return "None";
  if (typeof kind === "string") return kind;
  const names: string[] = [];
  if ((kind & 1) !== 0) names.push("Js");
  if ((kind & 2) !== 0) names.push("JsMap");
  if ((kind & 4) !== 0) names.push("JsInlineMap");
  if ((kind & 8) !== 0) names.push("Dts");
  if ((kind & 16) !== 0) names.push("DtsEmit");
  if ((kind & 32) !== 0) names.push("DtsErrors");
  if ((kind & 64) !== 0) names.push("DtsMap");
  return names.length === 0 ? "None" : names.join("|");
}

export function toReadableBuildInfo(buildInfo: BuildInfoLike, buildInfoText: string): string {
  const readable: ReadableBuildInfo = {
    version: buildInfo.version,
    errors: buildInfo.errors,
    checkPending: buildInfo.checkPending,
    root: buildInfo.root?.map((entry) => readableRoot(buildInfo, entry)),
    fileNames: buildInfo.fileNames,
    fileInfos: buildInfo.fileInfos?.map((info, index) => ({
      fileName: fileName(buildInfo, index + 1),
      version: info.version ?? "",
      signature: info.signature ?? "",
      affectsGlobalScope: info.affectsGlobalScope === true,
      impliedNodeFormat: String(info.impliedNodeFormat ?? ""),
      original: info,
    })),
    fileIdsList: buildInfo.fileIdsList?.map((ids) => ids.map((id) => fileName(buildInfo, id))),
    options: readableOptions(buildInfo.options),
    referencedMap: buildInfo.referencedMap === undefined
      ? undefined
      : Object.fromEntries(buildInfo.referencedMap.map((entry) => [fileName(buildInfo, entry.fileId), fileIdList(buildInfo, entry.fileIdListId)])),
    semanticDiagnosticsPerFile: buildInfo.semanticDiagnosticsPerFile?.map((entry) => typeof entry === "number"
      ? { file: fileName(buildInfo, entry) }
      : { diagnostics: readableDiagnosticsOfFile(buildInfo, entry) }),
    emitDiagnosticsPerFile: buildInfo.emitDiagnosticsPerFile?.map((entry) => readableDiagnosticsOfFile(buildInfo, entry)),
    changeFileSet: buildInfo.changeFileSet?.map((id) => fileName(buildInfo, id)),
    affectedFilesPendingEmit: buildInfo.affectedFilesPendingEmit?.map((entry) => ({
      file: fileName(buildInfo, entry.fileId),
      emitKind: readableEmitKind(entry.emitKind),
      original: entry,
    })),
    latestChangedDtsFile: buildInfo.latestChangedDtsFile,
    emitSignatures: buildInfo.emitSignatures?.map((entry) => ({
      file: fileName(buildInfo, entry.fileId),
      signature: entry.signature,
      differsOnlyInDtsMap: entry.differsOnlyInDtsMap,
      differsInOptions: entry.differsInOptions,
      original: entry,
    })),
    resolvedRoot: buildInfo.resolvedRoot?.map((entry) => ({
      resolved: fileName(buildInfo, entry.resolved),
      root: fileName(buildInfo, entry.root),
    })),
    size: buildInfoText.length,
    semanticErrors: buildInfo.semanticErrors,
  };
  return JSON.stringify(readable, undefined, 2);
}
