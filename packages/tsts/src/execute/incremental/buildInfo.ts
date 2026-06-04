/**
 * Incremental build-info JSON model.
 *
 * Port of TS-Go `internal/execute/incremental/buildInfo.go`.
 */

import { version } from "../../core/version.js";
import { ResolutionMode, type CompilerOptions } from "../../core/compilerOptions.js";
import type { int } from "@tsonic/core/types.js";
import type { Path } from "../../tspath/index.js";
import type { EmitSignature } from "./snapshot.js";

export type BuildInfoFileId = int;
export type BuildInfoFileIdListId = int;

export interface FileInfo {
  readonly version: string;
  readonly signature: string;
  readonly affectsGlobalScope?: boolean | undefined;
  readonly impliedNodeFormat?: number | undefined;
}

export class BuildInfoRoot {
  readonly start: BuildInfoFileId;
  readonly end: BuildInfoFileId;
  readonly nonIncremental: string;

  constructor(start: BuildInfoFileId = 0, end: BuildInfoFileId = 0, nonIncremental: string = "") {
    this.start = start;
    this.end = end;
    this.nonIncremental = nonIncremental;
  }

  toJSON(): string | number | readonly number[] {
    if (this.start !== 0) {
      if (this.end !== 0) return [this.start, this.end];
      return this.start;
    }
    return this.nonIncremental;
  }

  static fromJSON(value: unknown): BuildInfoRoot {
    const array = jsonArray(value);
    if (array !== undefined && array.length === 2) {
      const start = numberAt(array, 0 as int);
      const end = numberAt(array, 1 as int);
      if (start !== undefined && end !== undefined) return new BuildInfoRoot(start as BuildInfoFileId, end as BuildInfoFileId);
    }
    if (typeof value === "number") return new BuildInfoRoot(value as BuildInfoFileId);
    if (typeof value === "string") return new BuildInfoRoot(0, 0, value);
    throw new Error("invalid BuildInfoRoot");
  }
}

interface BuildInfoFileInfoNoSignatureJson {
  readonly [key: string]: unknown;
  readonly version?: string | undefined;
  readonly noSignature?: boolean | undefined;
  readonly affectsGlobalScope?: boolean | undefined;
  readonly impliedNodeFormat?: number | undefined;
}

interface BuildInfoFileInfoWithSignatureJson {
  readonly [key: string]: unknown;
  readonly version?: string | undefined;
  readonly signature?: string | undefined;
  readonly affectsGlobalScope?: boolean | undefined;
  readonly impliedNodeFormat?: number | undefined;
}

export class BuildInfoFileInfo {
  private readonly signatureValue: string | undefined;
  private readonly noSignature: BuildInfoFileInfoNoSignatureJson | undefined;
  private readonly fileInfo: BuildInfoFileInfoWithSignatureJson | undefined;

  private constructor(
    signatureValue: string | undefined,
    noSignature: BuildInfoFileInfoNoSignatureJson | undefined,
    fileInfo: BuildInfoFileInfoWithSignatureJson | undefined,
  ) {
    this.signatureValue = signatureValue;
    this.noSignature = noSignature;
    this.fileInfo = fileInfo;
  }

  static fromFileInfo(fileInfo: FileInfo): BuildInfoFileInfo {
    const impliedNodeFormat = fileInfo.impliedNodeFormat ?? ResolutionMode.CommonJS;
    if (fileInfo.version === fileInfo.signature && fileInfo.affectsGlobalScope !== true && impliedNodeFormat === ResolutionMode.CommonJS) {
      return new BuildInfoFileInfo(fileInfo.signature, undefined, undefined);
    }
    if (fileInfo.signature === "") {
      return new BuildInfoFileInfo(undefined, {
        version: fileInfo.version,
        noSignature: true,
        affectsGlobalScope: fileInfo.affectsGlobalScope,
        impliedNodeFormat,
      }, undefined);
    }
    return new BuildInfoFileInfo(undefined, undefined, {
      version: fileInfo.version,
      signature: fileInfo.signature === fileInfo.version ? "" : fileInfo.signature,
      affectsGlobalScope: fileInfo.affectsGlobalScope,
      impliedNodeFormat,
    });
  }

  static fromJSON(value: unknown): BuildInfoFileInfo {
    if (typeof value === "string") return new BuildInfoFileInfo(value, undefined, undefined);
    if (isRecord(value) && value.noSignature === true) {
      return new BuildInfoFileInfo(undefined, {
        version: stringOrUndefined(value.version),
        noSignature: true,
        affectsGlobalScope: booleanOrUndefined(value.affectsGlobalScope),
        impliedNodeFormat: numberOrUndefined(value.impliedNodeFormat),
      }, undefined);
    }
    if (isRecord(value)) {
      return new BuildInfoFileInfo(undefined, undefined, {
        version: stringOrUndefined(value.version),
        signature: stringOrUndefined(value.signature),
        affectsGlobalScope: booleanOrUndefined(value.affectsGlobalScope),
        impliedNodeFormat: numberOrUndefined(value.impliedNodeFormat),
      });
    }
    throw new Error("invalid BuildInfoFileInfo");
  }

  getFileInfo(): FileInfo {
    if (this.signatureValue !== undefined) {
      return {
        version: this.signatureValue,
        signature: this.signatureValue,
        impliedNodeFormat: ResolutionMode.CommonJS,
      };
    }
    if (this.noSignature !== undefined) {
      return {
        version: this.noSignature.version ?? "",
        signature: "",
        affectsGlobalScope: this.noSignature.affectsGlobalScope,
        impliedNodeFormat: this.noSignature.impliedNodeFormat ?? ResolutionMode.CommonJS,
      };
    }
    return {
      version: this.fileInfo?.version ?? "",
      signature: this.fileInfo?.signature === "" || this.fileInfo?.signature === undefined
        ? this.fileInfo?.version ?? ""
        : this.fileInfo.signature,
      affectsGlobalScope: this.fileInfo?.affectsGlobalScope,
      impliedNodeFormat: this.fileInfo?.impliedNodeFormat ?? ResolutionMode.CommonJS,
    };
  }

  hasSignature(): boolean {
    return this.signatureValue !== undefined;
  }

  toJSON(): unknown {
    if (this.signatureValue !== undefined) return this.signatureValue;
    if (this.noSignature !== undefined) return stripUndefined(this.noSignature);
    return stripUndefined(this.fileInfo ?? {});
  }
}

export class BuildInfoReferenceMapEntry {
  readonly fileId: BuildInfoFileId;
  readonly fileIdListId: BuildInfoFileIdListId;

  constructor(fileId: BuildInfoFileId, fileIdListId: BuildInfoFileIdListId) {
    this.fileId = fileId;
    this.fileIdListId = fileIdListId;
  }

  toJSON(): readonly number[] {
    return [this.fileId, this.fileIdListId];
  }

  static fromJSON(value: unknown): BuildInfoReferenceMapEntry {
    const array = jsonArray(value);
    if (array === undefined || array.length !== 2) {
      throw new Error("invalid BuildInfoReferenceMapEntry");
    }
    const fileId = numberAt(array, 0 as int);
    const fileIdListId = numberAt(array, 1 as int);
    if (fileId === undefined || fileIdListId === undefined) throw new Error("invalid BuildInfoReferenceMapEntry");
    return new BuildInfoReferenceMapEntry(fileId as BuildInfoFileId, fileIdListId as BuildInfoFileIdListId);
  }
}

export interface BuildInfoDiagnostic {
  readonly file?: BuildInfoFileId;
  readonly noFile?: boolean;
  readonly pos?: number;
  readonly end?: number;
  readonly code?: number;
  readonly category?: number;
  readonly messageKey?: number;
  readonly messageArgs?: readonly string[];
  readonly messageChain?: readonly BuildInfoDiagnostic[];
  readonly relatedInformation?: readonly BuildInfoDiagnostic[];
  readonly reportsUnnecessary?: boolean;
  readonly reportsDeprecated?: boolean;
  readonly skippedOnNoEmit?: boolean;
  readonly repopulateInfo?: BuildInfoRepopulateInfo;
}

export interface BuildInfoRepopulateInfo {
  readonly kind: number;
  readonly moduleReference?: string;
  readonly mode?: number;
  readonly packageName?: string;
}

export class BuildInfoDiagnosticsOfFile {
  readonly fileId: BuildInfoFileId;
  readonly diagnostics: readonly BuildInfoDiagnostic[];

  constructor(fileId: BuildInfoFileId, diagnostics: readonly BuildInfoDiagnostic[]) {
    this.fileId = fileId;
    this.diagnostics = diagnostics;
  }

  toJSON(): readonly unknown[] {
    return [this.fileId, this.diagnostics];
  }

  static fromJSON(value: unknown): BuildInfoDiagnosticsOfFile {
    const array = jsonArray(value);
    if (array === undefined || array.length !== 2) {
      throw new Error("invalid BuildInfoDiagnosticsOfFile");
    }
    const fileId = numberAt(array, 0 as int);
    const diagnostics = jsonArray(valueAt(array, 1 as int));
    if (fileId === undefined || diagnostics === undefined) throw new Error("invalid BuildInfoDiagnosticsOfFile");
    return new BuildInfoDiagnosticsOfFile(fileId as BuildInfoFileId, diagnostics as readonly BuildInfoDiagnostic[]);
  }
}

export class BuildInfoSemanticDiagnostic {
  readonly fileId: BuildInfoFileId;
  readonly diagnostics: BuildInfoDiagnosticsOfFile | undefined;

  constructor(fileId: BuildInfoFileId = 0, diagnostics?: BuildInfoDiagnosticsOfFile) {
    this.fileId = fileId;
    this.diagnostics = diagnostics;
  }

  toJSON(): unknown {
    if (this.fileId !== 0) return this.fileId;
    return this.diagnostics?.toJSON();
  }

  static fromJSON(value: unknown): BuildInfoSemanticDiagnostic {
    if (typeof value === "number") return new BuildInfoSemanticDiagnostic(value);
    return new BuildInfoSemanticDiagnostic(0, BuildInfoDiagnosticsOfFile.fromJSON(value));
  }
}

export enum FileEmitKind {
  Default = 0,
  Dts = 1,
  Js = 2,
  DtsErrors = 4,
}

export class BuildInfoFilePendingEmit {
  readonly fileId: BuildInfoFileId;
  readonly emitKind: FileEmitKind;

  constructor(fileId: BuildInfoFileId, emitKind: FileEmitKind = FileEmitKind.Default) {
    this.fileId = fileId;
    this.emitKind = emitKind;
  }

  toJSON(): number | readonly number[] {
    if (this.emitKind === FileEmitKind.Default) return this.fileId;
    if (this.emitKind === FileEmitKind.Dts) return [this.fileId];
    return [this.fileId, this.emitKind];
  }

  static fromJSON(value: unknown): BuildInfoFilePendingEmit {
    if (typeof value === "number") return new BuildInfoFilePendingEmit(value as BuildInfoFileId);
    const array = jsonArray(value);
    if (array !== undefined && array.length === 1) {
      const fileId = numberAt(array, 0 as int);
      if (fileId !== undefined) return new BuildInfoFilePendingEmit(fileId as BuildInfoFileId, FileEmitKind.Dts);
    }
    if (array !== undefined && array.length === 2) {
      const fileId = numberAt(array, 0 as int);
      const emitKind = numberAt(array, 1 as int);
      if (fileId !== undefined && emitKind !== undefined) {
        return new BuildInfoFilePendingEmit(fileId as BuildInfoFileId, emitKind as FileEmitKind);
      }
    }
    throw new Error("invalid BuildInfoFilePendingEmit");
  }
}

export class BuildInfoEmitSignature {
  readonly fileId: BuildInfoFileId;
  readonly signature: string;
  readonly differsOnlyInDtsMap: boolean;
  readonly differsInOptions: boolean;

  constructor(fileId: BuildInfoFileId, signature: string = "", differsOnlyInDtsMap: boolean = false, differsInOptions: boolean = false) {
    this.fileId = fileId;
    this.signature = signature;
    this.differsOnlyInDtsMap = differsOnlyInDtsMap;
    this.differsInOptions = differsInOptions;
  }

  noEmitSignature(): boolean {
    return this.signature === "" && !this.differsOnlyInDtsMap && !this.differsInOptions;
  }

  toEmitSignature(path: string, emitSignatures: ReadonlyMap<string, EmitSignature>): EmitSignature {
    if (this.differsOnlyInDtsMap) {
      const info = emitSignatures.get(path);
      return { signature: undefined, signatureWithDifferentOptions: [info?.signature ?? ""] };
    }
    if (this.differsInOptions) {
      return { signature: undefined, signatureWithDifferentOptions: [this.signature] };
    }
    return { signature: this.signature, signatureWithDifferentOptions: undefined };
  }

  toJSON(): number | readonly unknown[] {
    if (this.noEmitSignature()) return this.fileId;
    if (this.differsOnlyInDtsMap) return [this.fileId, []];
    if (this.differsInOptions) return [this.fileId, [this.signature]];
    return [this.fileId, this.signature];
  }

  static fromJSON(value: unknown): BuildInfoEmitSignature {
    if (typeof value === "number") return new BuildInfoEmitSignature(value as BuildInfoFileId);
    const array = jsonArray(value);
    if (array === undefined || array.length !== 2) {
      throw new Error("invalid BuildInfoEmitSignature");
    }
    const fileId = numberAt(array, 0 as int);
    if (fileId === undefined) throw new Error("invalid BuildInfoEmitSignature");
    const payload = valueAt(array, 1 as int);
    if (typeof payload === "string") return new BuildInfoEmitSignature(fileId as BuildInfoFileId, payload);
    const payloadArray = jsonArray(payload);
    if (payloadArray !== undefined && payloadArray.length === 0) return new BuildInfoEmitSignature(fileId as BuildInfoFileId, "", true, false);
    if (payloadArray !== undefined && payloadArray.length === 1) {
      const signature = stringAt(payloadArray, 0 as int);
      if (signature !== undefined) return new BuildInfoEmitSignature(fileId as BuildInfoFileId, signature, false, true);
    }
    throw new Error("invalid BuildInfoEmitSignature");
  }
}

export class BuildInfoResolvedRoot {
  readonly resolved: BuildInfoFileId;
  readonly root: BuildInfoFileId;

  constructor(resolved: BuildInfoFileId, root: BuildInfoFileId) {
    this.resolved = resolved;
    this.root = root;
  }

  toJSON(): readonly number[] {
    return [this.resolved, this.root];
  }

  static fromJSON(value: unknown): BuildInfoResolvedRoot {
    const array = jsonArray(value);
    if (array === undefined || array.length !== 2) {
      throw new Error("invalid BuildInfoResolvedRoot");
    }
    const resolved = numberAt(array, 0 as int);
    const root = numberAt(array, 1 as int);
    if (resolved === undefined || root === undefined) throw new Error("invalid BuildInfoResolvedRoot");
    return new BuildInfoResolvedRoot(resolved as BuildInfoFileId, root as BuildInfoFileId);
  }
}

export interface BuildInfoInit {
  readonly version?: string;
  readonly errors?: boolean;
  readonly checkPending?: boolean;
  readonly root?: readonly BuildInfoRoot[];
  readonly fileNames?: readonly string[];
  readonly fileInfos?: readonly BuildInfoFileInfo[];
  readonly fileIdsList?: readonly (readonly BuildInfoFileId[])[];
  readonly options?: ReadonlyMap<string, unknown>;
  readonly referencedMap?: readonly BuildInfoReferenceMapEntry[];
  readonly semanticDiagnosticsPerFile?: readonly BuildInfoSemanticDiagnostic[];
  readonly emitDiagnosticsPerFile?: readonly BuildInfoDiagnosticsOfFile[];
  readonly changeFileSet?: readonly BuildInfoFileId[];
  readonly affectedFilesPendingEmit?: readonly BuildInfoFilePendingEmit[];
  readonly latestChangedDtsFile?: string;
  readonly emitSignatures?: readonly BuildInfoEmitSignature[];
  readonly resolvedRoot?: readonly BuildInfoResolvedRoot[];
  readonly semanticErrors?: boolean;
}

export class BuildInfo {
  readonly version: string;
  readonly errors: boolean;
  readonly checkPending: boolean;
  readonly root: readonly BuildInfoRoot[];
  readonly fileNames: readonly string[];
  readonly fileInfos: readonly BuildInfoFileInfo[];
  readonly fileIdsList: readonly (readonly BuildInfoFileId[])[];
  readonly options: ReadonlyMap<string, unknown>;
  readonly referencedMap: readonly BuildInfoReferenceMapEntry[];
  readonly semanticDiagnosticsPerFile: readonly BuildInfoSemanticDiagnostic[];
  readonly emitDiagnosticsPerFile: readonly BuildInfoDiagnosticsOfFile[];
  readonly changeFileSet: readonly BuildInfoFileId[];
  readonly affectedFilesPendingEmit: readonly BuildInfoFilePendingEmit[];
  readonly latestChangedDtsFile: string;
  readonly emitSignatures: readonly BuildInfoEmitSignature[];
  readonly resolvedRoot: readonly BuildInfoResolvedRoot[];
  readonly semanticErrors: boolean;

  constructor(init: BuildInfoInit = {}) {
    this.version = init.version ?? "";
    this.errors = init.errors ?? false;
    this.checkPending = init.checkPending ?? false;
    this.root = init.root ?? [];
    this.fileNames = init.fileNames ?? [];
    this.fileInfos = init.fileInfos ?? [];
    this.fileIdsList = init.fileIdsList ?? [];
    this.options = init.options ?? new Map<string, unknown>();
    this.referencedMap = init.referencedMap ?? [];
    this.semanticDiagnosticsPerFile = init.semanticDiagnosticsPerFile ?? [];
    this.emitDiagnosticsPerFile = init.emitDiagnosticsPerFile ?? [];
    this.changeFileSet = init.changeFileSet ?? [];
    this.affectedFilesPendingEmit = init.affectedFilesPendingEmit ?? [];
    this.latestChangedDtsFile = init.latestChangedDtsFile ?? "";
    this.emitSignatures = init.emitSignatures ?? [];
    this.resolvedRoot = init.resolvedRoot ?? [];
    this.semanticErrors = init.semanticErrors ?? false;
  }

  isValidVersion(): boolean {
    return this.version === version();
  }

  isIncremental(): boolean {
    return this.fileNames.length !== 0;
  }

  fileName(fileId: BuildInfoFileId): string {
    const index = (fileId - 1) as int;
    return this.fileNames[index] ?? "";
  }

  fileInfo(fileId: BuildInfoFileId): BuildInfoFileInfo | undefined {
    const index = (fileId - 1) as int;
    return this.fileInfos[index];
  }

  getCompilerOptions(_buildInfoDirectory: string): CompilerOptions {
    const result: Record<string, unknown> = {};
    for (const [key, value] of this.options) {
      result[key] = value;
    }
    return result as CompilerOptions;
  }

  getBuildInfoRootInfoReader(buildInfoDirectory: string, useCaseSensitiveFileNames: boolean): BuildInfoRootInfoReader {
    const resolvedRootFileInfos = new Map<Path, BuildInfoFileInfo>();
    const rootToResolved = new Map<Path, Path>();
    const resolvedToRoot = new Map<Path, Path>();
    const toPath = (fileName: string): Path => normalizeBuildInfoPath(fileName, buildInfoDirectory, useCaseSensitiveFileNames);

    for (const resolved of this.resolvedRoot) {
      resolvedToRoot.set(toPath(this.fileName(resolved.resolved)), toPath(this.fileName(resolved.root)));
    }

    const addRoot = (resolvedRoot: string, fileInfo: BuildInfoFileInfo | undefined): void => {
      const resolvedRootPath = toPath(resolvedRoot);
      const rootPath = resolvedToRoot.get(resolvedRootPath);
      rootToResolved.set(rootPath ?? resolvedRootPath, resolvedRootPath);
      if (fileInfo !== undefined) resolvedRootFileInfos.set(resolvedRootPath, fileInfo);
    };

    for (const root of this.root) {
      if (root.nonIncremental !== "") {
        addRoot(root.nonIncremental, undefined);
      } else if (root.end === 0) {
        addRoot(this.fileName(root.start), this.fileInfo(root.start));
      } else {
        for (let fileId = root.start; fileId <= root.end; fileId += 1) {
          addRoot(this.fileName(fileId), this.fileInfo(fileId));
        }
      }
    }

    return new BuildInfoRootInfoReader(resolvedRootFileInfos, rootToResolved);
  }
}

export class BuildInfoRootInfoReader {
  private readonly resolvedRootFileInfos: ReadonlyMap<Path, BuildInfoFileInfo>;
  private readonly rootToResolved: ReadonlyMap<Path, Path>;

  constructor(resolvedRootFileInfos: ReadonlyMap<Path, BuildInfoFileInfo>, rootToResolved: ReadonlyMap<Path, Path>) {
    this.resolvedRootFileInfos = resolvedRootFileInfos;
    this.rootToResolved = rootToResolved;
  }

  getBuildInfoFileInfo(inputFilePath: Path): { info: BuildInfoFileInfo | undefined; resolved: Path } {
    const direct = this.resolvedRootFileInfos.get(inputFilePath);
    if (direct !== undefined) return { info: direct, resolved: inputFilePath };
    const resolved = this.rootToResolved.get(inputFilePath);
    if (resolved !== undefined) return { info: this.resolvedRootFileInfos.get(resolved), resolved };
    return { info: undefined, resolved: "" };
  }

  *roots(): IterableIterator<Path> {
    yield* this.rootToResolved.keys();
  }
}

function normalizeBuildInfoPath(fileName: string, directory: string, useCaseSensitiveFileNames: boolean): Path {
  const joined = fileName.startsWith("/") || directory === "" ? fileName : directory.replace(/\/$/, "") + "/" + fileName;
  const normalized = joined.replace(/\\/g, "/");
  return useCaseSensitiveFileNames ? normalized : normalized.toLowerCase();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringOrUndefined(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function numberOrUndefined(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined;
}

function booleanOrUndefined(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function jsonArray(value: unknown): readonly unknown[] | undefined {
  return Array.isArray(value) ? value as readonly unknown[] : undefined;
}

function valueAt(array: readonly unknown[], index: int): unknown {
  return array[index];
}

function numberAt(array: readonly unknown[], index: int): number | undefined {
  const value = valueAt(array, index);
  return typeof value === "number" ? value : undefined;
}

function stringAt(array: readonly unknown[], index: int): string | undefined {
  const value = valueAt(array, index);
  return typeof value === "string" ? value : undefined;
}

function stripUndefined(record: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(record)) {
    const value = record[key];
    if (value !== undefined) out[key] = value;
  }
  return out;
}
