import type { Client } from "./client.js";
import type { CompilerOptions } from "../program/index.js";
import {
  fileChangeSummaryIsEmpty,
  newFileChangeSummary,
  mergeFileChangeSummary,
  type FileChange,
  type FileChangeSummary,
} from "./fileChange.js";
import { newLogTree, type LogTree } from "./logging/logtree.js";
import { newParseCache, type ParseCache } from "./parseCache.js";
import { Snapshot, type SnapshotOptions } from "./snapshot.js";
import { SnapshotFS, type FileHandle } from "./snapshotFs.js";

export type UpdateReason = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export const UpdateReason = {
  Unknown: 0 as UpdateReason,
  DidOpenFile: 1 as UpdateReason,
  DidCloseFile: 2 as UpdateReason,
  DidChangeCompilerOptionsForInferredProjects: 3 as UpdateReason,
  RequestedLanguageServicePendingChanges: 4 as UpdateReason,
  RequestedLanguageServiceProjectNotLoaded: 5 as UpdateReason,
  RequestedLanguageServiceForFileNotOpen: 6 as UpdateReason,
  RequestedLanguageServiceProjectDirty: 7 as UpdateReason,
  RequestedLoadProjectTree: 8 as UpdateReason,
  RequestedLanguageServiceWithAutoImports: 9 as UpdateReason,
  IdleCleanDiskCache: 10 as UpdateReason,
} as const;

export interface SessionOptions {
  readonly currentDirectory: string;
  readonly defaultLibraryPath?: string;
  readonly typingsLocation?: string;
  readonly watchEnabled?: boolean;
  readonly loggingEnabled?: boolean;
  readonly telemetryEnabled?: boolean;
  readonly pushDiagnosticsEnabled?: boolean;
  readonly debounceDelayMs?: number;
  readonly useCaseSensitiveFileNames?: boolean;
  readonly locale?: string;
  readonly positionEncoding?: string;
}

export interface SessionInit {
  readonly options: SessionOptions;
  readonly fs?: SnapshotFS;
  readonly client?: Client;
  readonly logger?: LogTree;
  readonly parseCache?: ParseCache;
}

export interface ScheduledUpdate {
  readonly generation: number;
  readonly reason: UpdateReason;
  readonly fileChanges: FileChangeSummary;
}

export interface SnapshotChange {
  readonly reason: UpdateReason;
  readonly fileChanges?: FileChangeSummary;
  readonly compilerOptionsForInferredProjects?: CompilerOptions;
  readonly userPreferences?: ReadonlyMap<string, unknown>;
  readonly cleanDiskCache?: boolean;
}

export interface SessionTelemetry {
  readonly uptimeMs: number;
  readonly heapUsed: number;
  readonly heapTotal: number;
  readonly snapshots: number;
  readonly openFiles: number;
}

export class Session {
  readonly options: SessionOptions;
  readonly fs: SnapshotFS;
  readonly client: Client | undefined;
  readonly logger: LogTree;
  readonly parseCache: ParseCache;
  private snapshotId = 0;
  private snapshotValue: Snapshot;
  private readonly pendingFileChanges: FileChange[] = [];
  private pendingUserConfigChanges = false;
  private readonly pendingAtaChanges = new Map<string, unknown>();
  private scheduledUpdate: ScheduledUpdate | undefined;
  private scheduledGeneration = 0;
  private diagnosticsGeneration = 0;
  private diagnosticsTimer: ReturnType<typeof setTimeout> | undefined;
  private snapshotTimer: ReturnType<typeof setTimeout> | undefined;
  private idleCacheCleanTimer: ReturnType<typeof setTimeout> | undefined;
  private performanceTelemetryTimer: ReturnType<typeof setInterval> | undefined;
  private readonly startTime = Date.now();
  private initialUserPreferences: ReadonlyMap<string, unknown> = new Map();
  private workspaceUserPreferences: ReadonlyMap<string, unknown> = new Map();
  private compilerOptionsForInferredProjects: CompilerOptions | undefined;

  constructor(init: SessionInit) {
    this.options = init.options;
    this.fs = init.fs ?? new SnapshotFS();
    this.client = init.client;
    this.logger = init.logger ?? newLogTree("session");
    this.parseCache = init.parseCache ?? newParseCache({});
    this.snapshotValue = this.createSnapshot();
  }

  snapshot(): Snapshot {
    return this.snapshotValue;
  }

  config(): ReadonlyMap<string, unknown> {
    return this.workspaceUserPreferences;
  }

  configure(config: ReadonlyMap<string, unknown>): void {
    const oldConfig = this.workspaceUserPreferences;
    this.workspaceUserPreferences = new Map(config);
    this.pendingUserConfigChanges = true;
    this.refreshInlayHintsIfNeeded(oldConfig, config);
    this.refreshCodeLensIfNeeded(oldConfig, config);
    this.refreshDiagnosticsIfNeeded(oldConfig, config);
    this.refreshAtaIfNeeded(oldConfig, config);
  }

  initializeWithUserConfig(config: ReadonlyMap<string, unknown>): void {
    this.initialUserPreferences = new Map(config);
    this.configure(config);
  }

  openFile(fileName: string, content: string, version = 0): void {
    this.cancelWarmAutoImportCache();
    this.scheduleIdleCacheClean();
    this.cancelScheduledSnapshotUpdate();
    this.fs.openFile(fileName, content, version);
    this.pendingFileChanges.push({ kind: "open", uri: fileName, version, content });
    this.updateSnapshot(UpdateReason.DidOpenFile);
  }

  changeFile(fileName: string, content: string, version = 0): void {
    this.cancelDiagnosticsRefresh();
    this.cancelWarmAutoImportCache();
    this.scheduleIdleCacheClean();
    this.fs.openFile(fileName, content, version);
    this.pendingFileChanges.push({ kind: "change", uri: fileName, version, content });
    this.scheduleSnapshotUpdate(UpdateReason.RequestedLanguageServicePendingChanges);
  }

  closeFile(fileName: string): void {
    this.cancelWarmAutoImportCache();
    this.scheduleIdleCacheClean();
    this.fs.closeFile(fileName);
    this.pendingFileChanges.push({ kind: "close", uri: fileName });
    this.scheduleSnapshotUpdate(UpdateReason.DidCloseFile);
  }

  saveFile(fileName: string): void {
    this.scheduleIdleCacheClean();
    this.pendingFileChanges.push({ kind: "save", uri: fileName });
    this.scheduleSnapshotUpdate(UpdateReason.RequestedLanguageServicePendingChanges);
  }

  didChangeWatchedFiles(changes: readonly { uri: string; type: "created" | "changed" | "deleted" }[]): void {
    for (const change of changes) {
      switch (change.type) {
        case "created":
          this.pendingFileChanges.push({ kind: "watch-create", uri: change.uri });
          break;
        case "changed":
          this.pendingFileChanges.push({ kind: "watch-change", uri: change.uri });
          break;
        case "deleted":
          this.pendingFileChanges.push({ kind: "watch-delete", uri: change.uri });
          break;
      }
    }
    this.scheduleDiagnosticsRefresh();
    this.cancelWarmAutoImportCache();
    this.scheduleIdleCacheClean();
  }

  didChangeCompilerOptionsForInferredProjects(options: CompilerOptions): Snapshot {
    this.compilerOptionsForInferredProjects = options;
    return this.updateSnapshotWithChange({
      reason: UpdateReason.DidChangeCompilerOptionsForInferredProjects,
      compilerOptionsForInferredProjects: options,
    });
  }

  getFile(fileName: string): FileHandle | undefined {
    return this.snapshotValue.getFile(fileName);
  }

  scheduleSnapshotUpdate(reason: UpdateReason): ScheduledUpdate {
    this.cancelScheduledSnapshotUpdate();
    const summary = this.consumePendingSummary(false);
    this.scheduledGeneration += 1;
    this.scheduledUpdate = {
      generation: this.scheduledGeneration,
      reason,
      fileChanges: summary,
    };
    const delay = this.options.debounceDelayMs ?? 0;
    this.snapshotTimer = setTimeout(() => {
      if (this.scheduledUpdate?.generation !== this.scheduledGeneration) return;
      const pending = this.scheduledUpdate;
      this.scheduledUpdate = undefined;
      if (pending !== undefined && !fileChangeSummaryIsEmpty(pending.fileChanges)) {
        this.updateSnapshotWithChange({ reason, fileChanges: pending.fileChanges });
      }
    }, delay);
    return this.scheduledUpdate;
  }

  updateSnapshot(reason: UpdateReason = UpdateReason.Unknown): Snapshot {
    const changes = this.consumePendingSummary(true);
    return this.updateSnapshotWithChange({ reason, fileChanges: changes });
  }

  pendingUpdate(): ScheduledUpdate | undefined {
    return this.scheduledUpdate;
  }

  scheduleDiagnosticsRefresh(): void {
    this.cancelDiagnosticsRefresh();
    this.diagnosticsGeneration += 1;
    const generation = this.diagnosticsGeneration;
    const delay = this.options.debounceDelayMs ?? 0;
    this.diagnosticsTimer = setTimeout(() => {
      if (generation !== this.diagnosticsGeneration) return;
      this.diagnosticsTimer = undefined;
      void this.client?.refreshDiagnostics(undefined);
    }, delay);
  }

  cancelDiagnosticsRefresh(): void {
    if (this.diagnosticsTimer !== undefined) {
      clearTimeout(this.diagnosticsTimer);
      this.diagnosticsTimer = undefined;
      this.diagnosticsGeneration += 1;
    }
  }

  cancelScheduledSnapshotUpdate(): void {
    if (this.snapshotTimer !== undefined) {
      clearTimeout(this.snapshotTimer);
      this.snapshotTimer = undefined;
      this.scheduledGeneration += 1;
    }
    this.scheduledUpdate = undefined;
  }

  startPerformanceTelemetry(intervalMs = 5 * 60 * 1000): void {
    if (this.options.telemetryEnabled !== true) return;
    this.stopPerformanceTelemetry();
    this.performanceTelemetryTimer = setInterval(() => {
      if (this.client?.isActive() !== true) return;
      void this.client.sendTelemetry(undefined, this.collectPerformanceTelemetry());
    }, intervalMs);
  }

  stopPerformanceTelemetry(): void {
    if (this.performanceTelemetryTimer !== undefined) {
      clearInterval(this.performanceTelemetryTimer);
      this.performanceTelemetryTimer = undefined;
    }
  }

  dispose(): void {
    this.cancelDiagnosticsRefresh();
    this.cancelScheduledSnapshotUpdate();
    this.cancelIdleCacheClean();
    this.stopPerformanceTelemetry();
  }

  private updateSnapshotWithChange(change: SnapshotChange): Snapshot {
    const fileChanges = change.fileChanges ?? newFileChangeSummary();
    const parentId = this.snapshotValue.id();
    this.snapshotId += 1;
    this.snapshotValue = this.createSnapshot(parentId, fileChanges);
    this.scheduledUpdate = undefined;
    this.pendingUserConfigChanges = false;
    this.pendingAtaChanges.clear();
    this.logger.log(`Snapshot ${this.snapshotValue.id()} updated for reason ${change.reason}`);
    return this.snapshotValue;
  }

  private createSnapshot(parentId = 0, fileChanges: FileChangeSummary = newFileChangeSummary()): Snapshot {
    const options: SnapshotOptions = {
      id: this.snapshotId,
      parentId,
      fs: this.fs.clone(),
      currentDirectory: this.options.currentDirectory,
      useCaseSensitiveFileNames: this.options.useCaseSensitiveFileNames ?? true,
      fileChanges,
      userPreferences: this.workspaceUserPreferences,
      ...(this.compilerOptionsForInferredProjects !== undefined
        ? { compilerOptionsForInferredProjects: this.compilerOptionsForInferredProjects }
        : {}),
    };
    return new Snapshot(options);
  }

  private consumePendingSummary(clear: boolean): FileChangeSummary {
    const summary = newFileChangeSummary();
    for (const change of this.pendingFileChanges) {
      switch (change.kind) {
        case "open":
          summary.opened = change.uri;
          summary.changed.add(change.uri);
          break;
        case "close":
          summary.closed.add(change.uri);
          break;
        case "change":
        case "save":
          summary.changed.add(change.uri);
          break;
        case "watch-create":
          summary.created.add(change.uri);
          break;
        case "watch-change":
          summary.changed.add(change.uri);
          break;
        case "watch-delete":
          summary.deleted.add(change.uri);
          break;
      }
    }
    if (this.scheduledUpdate !== undefined) mergeFileChangeSummary(summary, this.scheduledUpdate.fileChanges);
    if (clear) {
      this.pendingFileChanges.length = 0;
      this.pendingUserConfigChanges = false;
    }
    return summary;
  }

  private scheduleIdleCacheClean(): void {
    this.cancelIdleCacheClean();
    this.idleCacheCleanTimer = setTimeout(() => {
      this.idleCacheCleanTimer = undefined;
      const changes = this.consumePendingSummary(true);
      this.updateSnapshotWithChange({
        reason: UpdateReason.IdleCleanDiskCache,
        fileChanges: changes,
        cleanDiskCache: true,
      });
    }, 30_000);
  }

  private cancelIdleCacheClean(): void {
    if (this.idleCacheCleanTimer !== undefined) {
      clearTimeout(this.idleCacheCleanTimer);
      this.idleCacheCleanTimer = undefined;
    }
  }

  private cancelWarmAutoImportCache(): void {
    this.logger.log("Canceled auto-import cache warming");
  }

  private refreshInlayHintsIfNeeded(oldConfig: ReadonlyMap<string, unknown>, newConfig: ReadonlyMap<string, unknown>): void {
    if (oldConfig.get("inlayHints") !== newConfig.get("inlayHints")) void this.client?.refreshInlayHints(undefined);
  }

  private refreshCodeLensIfNeeded(oldConfig: ReadonlyMap<string, unknown>, newConfig: ReadonlyMap<string, unknown>): void {
    if (oldConfig.get("codeLens") !== newConfig.get("codeLens")) void this.client?.refreshCodeLens(undefined);
  }

  private refreshDiagnosticsIfNeeded(oldConfig: ReadonlyMap<string, unknown>, newConfig: ReadonlyMap<string, unknown>): void {
    if (oldConfig.get("diagnostics") !== newConfig.get("diagnostics")) this.scheduleDiagnosticsRefresh();
  }

  private refreshAtaIfNeeded(oldConfig: ReadonlyMap<string, unknown>, newConfig: ReadonlyMap<string, unknown>): void {
    if (oldConfig.get("typeAcquisition") !== newConfig.get("typeAcquisition")) {
      this.pendingAtaChanges.set("preferences", newConfig.get("typeAcquisition"));
    }
  }

  private collectPerformanceTelemetry(): SessionTelemetry {
    const memory = (globalThis as unknown as { process?: { memoryUsage?: () => { heapUsed: number; heapTotal: number } } }).process?.memoryUsage?.()
      ?? { heapUsed: 0, heapTotal: 0 };
    return {
      uptimeMs: Date.now() - this.startTime,
      heapUsed: memory.heapUsed,
      heapTotal: memory.heapTotal,
      snapshots: this.snapshotId,
      openFiles: this.fs.openFiles().length,
    };
  }
}

export function newSession(init: SessionInit): Session {
  return new Session(init);
}
