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

export interface SessionResourceRequest {
  readonly documents?: readonly string[];
  readonly configuredProjectDocuments?: readonly string[];
  readonly projects?: readonly string[];
  readonly projectTree?: { isAllProjects(): boolean; isProjectReferenced(path: string): boolean };
  readonly autoImports?: string;
}

export interface SessionTelemetry {
  readonly uptimeMs: number;
  readonly heapUsed: number;
  readonly heapTotal: number;
  readonly heapExternal: number;
  readonly rss: number;
  readonly arrayBuffers: number;
  readonly userCPUSeconds: number;
  readonly systemCPUSeconds: number;
  readonly snapshots: number;
  readonly openFiles: number;
  readonly pendingFileChanges: number;
  readonly pendingAtaChanges: number;
  readonly projectCount: number;
  readonly configuredProjectCount: number;
  readonly inferredProjectCount: number;
  readonly cachedDiskFiles: number;
  readonly watchedFiles: number;
}

export interface SessionStatus {
  readonly snapshotId: number;
  readonly scheduledSnapshotUpdate: ScheduledUpdate | undefined;
  readonly pendingFileChanges: readonly FileChange[];
  readonly pendingUserConfigChanges: boolean;
  readonly pendingAtaChanges: ReadonlyMap<string, unknown>;
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

  fsHandle(): SnapshotFS {
    return this.fs;
  }

  getCurrentDirectory(): string {
    return this.options.currentDirectory;
  }

  getDefaultLibraryPath(): string {
    return this.options.defaultLibraryPath ?? "";
  }

  getTypingsLocation(): string {
    return this.options.typingsLocation ?? "";
  }

  getLogger(): LogTree {
    return this.logger;
  }

  getParseCache(): ParseCache {
    return this.parseCache;
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

  status(): SessionStatus {
    return {
      snapshotId: this.snapshotId,
      scheduledSnapshotUpdate: this.scheduledUpdate,
      pendingFileChanges: [...this.pendingFileChanges],
      pendingUserConfigChanges: this.pendingUserConfigChanges,
      pendingAtaChanges: new Map(this.pendingAtaChanges),
    };
  }

  apiOpenProject(configFileName: string, apiFileChanges: FileChangeSummary): readonly [unknown, Snapshot] {
    this.cancelScheduledSnapshotUpdate();
    const fileChanges = this.consumePendingSummary(true);
    mergeFileChangeSummary(fileChanges, apiFileChanges);
    const newSnapshot = this.updateSnapshotWithChange({
      reason: UpdateReason.RequestedLoadProjectTree,
      fileChanges,
    });
    newSnapshot.ref();
    if (newSnapshot.apiError !== undefined) throw newSnapshot.apiError;
    const project = newSnapshot.projectCollection.getProjectByPath(this.toPath(configFileName))
      ?? newSnapshot.projectCollection.getProjectByPath(configFileName);
    if (project === undefined) {
      newSnapshot.deref();
      throw new Error(`OpenProject request returned no error but project not present in snapshot: ${configFileName}`);
    }
    return [project, newSnapshot];
  }

  apiUpdateWithFileChanges(apiFileChanges: FileChangeSummary): Snapshot {
    this.cancelScheduledSnapshotUpdate();
    const fileChanges = this.consumePendingSummary(true);
    mergeFileChangeSummary(fileChanges, apiFileChanges);
    const newSnapshot = this.updateSnapshotWithChange({
      reason: UpdateReason.RequestedLanguageServicePendingChanges,
      fileChanges,
    });
    newSnapshot.ref();
    return newSnapshot;
  }

  requestLanguageService(fileName: string, withAutoImports = false): Snapshot {
    const file = this.snapshotValue.getFile(fileName);
    if (file === undefined) {
      return this.updateSnapshot(UpdateReason.RequestedLanguageServiceForFileNotOpen);
    }
    if (withAutoImports) {
      this.cancelWarmAutoImportCache();
      return this.updateSnapshot(UpdateReason.RequestedLanguageServiceWithAutoImports);
    }
    return this.updateSnapshot(UpdateReason.RequestedLanguageServicePendingChanges);
  }

  getSnapshotForRequest(request: SessionResourceRequest, callerRef = false): Snapshot {
    this.cancelScheduledSnapshotUpdate();
    const fileChanges = this.consumePendingSummary(true);
    if (!fileChangeSummaryIsEmpty(fileChanges)) {
      const snapshot = this.updateSnapshotWithChange({
        reason: UpdateReason.RequestedLanguageServicePendingChanges,
        fileChanges,
      });
      if (callerRef) snapshot.ref();
      return snapshot;
    }
    const reason = this.resolveUpdateReasonForRequest(request);
    if (reason === UpdateReason.Unknown) {
      if (callerRef) this.snapshotValue.ref();
      return this.snapshotValue;
    }
    const snapshot = this.updateSnapshotWithChange({ reason, fileChanges });
    if (callerRef) snapshot.ref();
    return snapshot;
  }

  private resolveUpdateReasonForRequest(request: SessionResourceRequest): UpdateReason {
    if ((request.projects?.length ?? 0) > 0) return UpdateReason.RequestedLanguageServiceProjectDirty;
    if (request.projectTree !== undefined) return UpdateReason.RequestedLoadProjectTree;
    if (request.autoImports !== undefined && request.autoImports !== "") return UpdateReason.RequestedLanguageServiceWithAutoImports;
    for (const document of request.documents ?? []) {
      const project = this.snapshotValue.projectCollection.getDefaultProject(document);
      if (project === undefined) return UpdateReason.RequestedLanguageServiceProjectNotLoaded;
      if (project.dirty) return UpdateReason.RequestedLanguageServiceProjectDirty;
    }
    for (const document of request.configuredProjectDocuments ?? []) {
      if (this.snapshotValue.fs.getFile(document) === undefined) return UpdateReason.RequestedLanguageServiceForFileNotOpen;
      const project = this.snapshotValue.projectCollection.getDefaultProject(document);
      if (project === undefined) return UpdateReason.RequestedLanguageServiceProjectNotLoaded;
      if (project.dirty) return UpdateReason.RequestedLanguageServiceProjectDirty;
    }
    return UpdateReason.Unknown;
  }

  requestProjectTree(): Snapshot {
    return this.updateSnapshot(UpdateReason.RequestedLoadProjectTree);
  }

  requestProjectNotLoaded(): Snapshot {
    return this.updateSnapshot(UpdateReason.RequestedLanguageServiceProjectNotLoaded);
  }

  requestProjectDirty(): Snapshot {
    return this.updateSnapshot(UpdateReason.RequestedLanguageServiceProjectDirty);
  }

  applyAtaChanges(changes: ReadonlyMap<string, unknown>): Snapshot {
    for (const [path, change] of changes) this.pendingAtaChanges.set(path, change);
    this.scheduleDiagnosticsRefresh();
    return this.updateSnapshotWithChange({
      reason: UpdateReason.RequestedLanguageServicePendingChanges,
      fileChanges: this.consumePendingSummary(true),
    });
  }

  takePendingAtaChanges(): ReadonlyMap<string, unknown> {
    const changes = new Map(this.pendingAtaChanges);
    this.pendingAtaChanges.clear();
    return changes;
  }

  updateUserPreferences(config: ReadonlyMap<string, unknown>): Snapshot {
    this.configure(config);
    return this.updateSnapshot(UpdateReason.RequestedLanguageServicePendingChanges);
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

  fileSystem(): SnapshotFS {
    return this.fs;
  }

  trace(message: string): void {
    if (this.options.loggingEnabled === true) this.logger.log(message);
  }

  didOpenFile(fileName: string, content: string, version = 0): Snapshot {
    this.openFile(fileName, content, version);
    return this.snapshotValue;
  }

  didCloseFile(fileName: string): Snapshot {
    this.closeFile(fileName);
    return this.snapshotValue;
  }

  didChangeFile(fileName: string, content: string, version = 0): ScheduledUpdate {
    this.changeFile(fileName, content, version);
    return this.scheduledUpdate ?? this.scheduleSnapshotUpdate(UpdateReason.RequestedLanguageServicePendingChanges);
  }

  didSaveFile(fileName: string): ScheduledUpdate {
    this.saveFile(fileName);
    return this.scheduledUpdate ?? this.scheduleSnapshotUpdate(UpdateReason.RequestedLanguageServicePendingChanges);
  }

  sendPerformanceTelemetry(): void {
    if (this.options.telemetryEnabled === true) void this.client?.sendTelemetry(undefined, this.collectPerformanceTelemetry());
  }

  sendProjectInfoTelemetryForNewProjects(projects: readonly unknown[]): void {
    if (this.options.telemetryEnabled !== true) return;
    for (const project of projects) this.sendProjectInfoTelemetry(project);
  }

  sendProjectInfoTelemetry(project: unknown): void {
    if (this.options.telemetryEnabled === true) void this.client?.sendTelemetry(undefined, this.collectProjectInfoTelemetry(project));
  }

  collectProjectInfoTelemetry(project: unknown): ReadonlyMap<string, unknown> {
    return new Map<string, unknown>([
      ["project", project],
      ["snapshotId", this.snapshotValue.id()],
      ["openFiles", this.fs.openFiles().length],
    ]);
  }

  setTristate(value: boolean | undefined): "true" | "false" | "unset" {
    return value === undefined ? "unset" : value ? "true" : "false";
  }

  boolTelemetry(value: boolean | undefined): 0 | 1 | 2 {
    return value === undefined ? 0 : value ? 1 : 2;
  }

  countFileStats(): ReadonlyMap<string, number> {
    const openFiles = this.fs.openFiles();
    return new Map<string, number>([
      ["openFiles", openFiles.length],
      ["pendingChanges", this.pendingFileChanges.length],
      ["pendingAtaChanges", this.pendingAtaChanges.size],
      ["snapshotId", this.snapshotValue.id()],
    ]);
  }

  getSnapshot(): Snapshot {
    return this.snapshotValue;
  }

  getSnapshotAndDefaultProject(): readonly [Snapshot, unknown | undefined] {
    return [this.snapshotValue, this.defaultProject()];
  }

  getLanguageService(fileName: string): Snapshot {
    return this.requestLanguageService(fileName);
  }

  getLanguageServiceAndProjectsForFile(fileName: string): readonly [Snapshot, readonly unknown[]] {
    const snapshot = this.requestLanguageService(fileName);
    return [snapshot, this.getProjectsForFile(fileName)];
  }

  getProjectsForFile(fileName: string): readonly unknown[] {
    const file = this.snapshotValue.getFile(fileName);
    return file === undefined ? [] : [this.defaultProject()];
  }

  getLanguageServicesForDocuments(fileNames: readonly string[]): readonly Snapshot[] {
    return fileNames.map((fileName) => this.requestLanguageService(fileName));
  }

  getLanguageServiceForProjectWithFile(fileName: string): Snapshot {
    return this.requestLanguageService(fileName);
  }

  withSnapshotLoadingProjectTree<T>(callback: (snapshot: Snapshot) => T): T {
    return callback(this.requestProjectTree());
  }

  getCurrentLanguageServiceWithAutoImports(fileName: string): Snapshot {
    return this.getLanguageServiceWithAutoImports(fileName);
  }

  withLanguageServiceAndSnapshot<T>(fileName: string, callback: (snapshot: Snapshot) => T): T {
    return callback(this.requestLanguageService(fileName));
  }

  getLanguageServiceWithAutoImports(fileName: string): Snapshot {
    return this.requestLanguageService(fileName, true);
  }

  adoptSnapshotChange(change: SnapshotChange): Snapshot {
    return this.updateSnapshotWithChange(change);
  }

  updateSnapshotRef(snapshot: Snapshot): void {
    this.snapshotValue = snapshot;
    this.snapshotId = snapshot.id();
  }

  waitForBackgroundTasks(): Promise<void> {
    return Promise.resolve();
  }

  updateWatches(): void {
    if (this.options.watchEnabled !== true) return;
    const errors = this.updateProjectWatches(this.snapshotValue);
    if (errors.length > 0) {
      this.logger.log(`Errors updating watches: ${errors.map(error => error.message).join("; ")}`);
    } else {
      this.trace("Updated file watches");
    }
  }

  close(): void {
    this.dispose();
  }

  flushChanges(): Snapshot {
    return this.flushChangesLocked();
  }

  flushChangesLocked(): Snapshot {
    this.cancelScheduledSnapshotUpdate();
    return this.updateSnapshot(UpdateReason.RequestedLanguageServicePendingChanges);
  }

  logProjectChanges(previous: Snapshot, next: Snapshot): void {
    this.logger.log(`Project snapshot changed ${previous.id()} -> ${next.id()}`);
  }

  logRuntimeMetrics(): void {
    const telemetry = this.collectPerformanceTelemetry();
    this.logger.log([
      "======== Runtime Metrics ========",
      `uptimeMs = ${telemetry.uptimeMs}`,
      `rss = ${telemetry.rss}`,
      `heapUsed = ${telemetry.heapUsed}`,
      `heapTotal = ${telemetry.heapTotal}`,
      `heapExternal = ${telemetry.heapExternal}`,
      `arrayBuffers = ${telemetry.arrayBuffers}`,
      `userCPUSeconds = ${telemetry.userCPUSeconds}`,
      `systemCPUSeconds = ${telemetry.systemCPUSeconds}`,
      `snapshots = ${telemetry.snapshots}`,
      `openFiles = ${telemetry.openFiles}`,
      `projectCount = ${telemetry.projectCount}`,
      `configuredProjectCount = ${telemetry.configuredProjectCount}`,
      `inferredProjectCount = ${telemetry.inferredProjectCount}`,
      `cachedDiskFiles = ${telemetry.cachedDiskFiles}`,
      `watchedFiles = ${telemetry.watchedFiles}`,
    ].join("\n"));
  }

  logCacheStats(): void {
    const stats = this.countFileStats();
    this.logger.log([
      "======== Cache Statistics ========",
      `Open file count:   ${stats.get("openFiles") ?? 0}`,
      `Pending changes:   ${stats.get("pendingChanges") ?? 0}`,
      `Pending ATA:       ${stats.get("pendingAtaChanges") ?? 0}`,
      `Snapshot ID:       ${stats.get("snapshotId") ?? 0}`,
      `Configured count:  ${this.snapshotValue.projectCollection.configuredProjects().length}`,
      `Inferred count:    ${this.snapshotValue.projectCollection.inferredProjects().length}`,
      `API-open count:    ${this.snapshotValue.projectCollection.apiOpenedProjectPaths().length}`,
    ].join("\n"));
  }

  npmInstall(packageNames: readonly string[]): Promise<readonly string[]> {
    this.trace(`npm install ${packageNames.join(" ")}`);
    return Promise.resolve(packageNames);
  }

  refreshAtaIfNeededPublic(oldConfig: ReadonlyMap<string, unknown>, newConfig: ReadonlyMap<string, unknown>): void {
    this.refreshAtaIfNeeded(oldConfig, newConfig);
  }

  publishProgramDiagnostics(): void {
    if (!this.shouldPublishProgramDiagnostics()) return;
    for (const project of this.snapshotValue.projectCollection.configuredProjects()) {
      if (this.shouldPublishProgramDiagnosticsForProject(project, this.snapshotValue.id())) {
        this.publishProjectDiagnostics(project);
      }
    }
  }

  shouldPublishProgramDiagnostics(): boolean {
    return this.options.pushDiagnosticsEnabled === true && this.client !== undefined;
  }

  publishProjectDiagnostics(project: unknown): void {
    if (!this.shouldPublishProgramDiagnostics()) return;
    const diagnostics = this.projectDiagnosticsForPublish(project);
    void this.client?.publishDiagnostics(undefined, {
      uri: this.projectDiagnosticsUri(project),
      diagnostics,
    });
  }

  enqueuePublishGlobalDiagnostics(): void {
    this.scheduleDiagnosticsRefresh();
  }

  publishGlobalDiagnostics(): void {
    void this.client?.refreshDiagnostics(undefined);
  }

  triggerAtaForUpdatedProjects(projects: readonly unknown[]): void {
    for (const [index, project] of projects.entries()) this.pendingAtaChanges.set(`project:${index}`, project);
  }

  warmAutoImportCache(): void {
    this.trace("Warming auto-import cache");
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
    this.pendingFileChanges.length = 0;
    this.pendingAtaChanges.clear();
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

  private defaultProject(): unknown {
    return {
      snapshotId: this.snapshotValue.id(),
      currentDirectory: this.options.currentDirectory,
    };
  }

  private toPath(fileName: string): string {
    const normalized = fileName.replaceAll("\\", "/");
    if (normalized.startsWith("/")) return normalizePathSegments(normalized);
    return normalizePathSegments(`${this.options.currentDirectory}/${normalized}`);
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
    const processLike = (globalThis as unknown as {
      process?: {
        memoryUsage?: () => {
          heapUsed: number;
          heapTotal: number;
          external?: number;
          rss?: number;
          arrayBuffers?: number;
        };
        cpuUsage?: () => { user: number; system: number };
      };
    }).process;
    const memory = processLike?.memoryUsage?.()
      ?? { heapUsed: 0, heapTotal: 0, external: 0, rss: 0, arrayBuffers: 0 };
    const cpu = processLike?.cpuUsage?.() ?? { user: 0, system: 0 };
    const collection = this.snapshotValue.projectCollection;
    return {
      uptimeMs: Date.now() - this.startTime,
      heapUsed: memory.heapUsed,
      heapTotal: memory.heapTotal,
      heapExternal: memory.external ?? 0,
      rss: memory.rss ?? 0,
      arrayBuffers: memory.arrayBuffers ?? 0,
      userCPUSeconds: cpu.user / 1_000_000,
      systemCPUSeconds: cpu.system / 1_000_000,
      snapshots: this.snapshotId,
      openFiles: this.fs.openFiles().length,
      pendingFileChanges: this.pendingFileChanges.length,
      pendingAtaChanges: this.pendingAtaChanges.size,
      projectCount: collection.projects().length,
      configuredProjectCount: collection.configuredProjects().length,
      inferredProjectCount: collection.inferredProjects().length,
      cachedDiskFiles: this.countFileStats().get("openFiles") ?? 0,
      watchedFiles: (this.scheduledUpdate?.fileChanges.changed.size ?? 0)
        + (this.scheduledUpdate?.fileChanges.created.size ?? 0)
        + (this.scheduledUpdate?.fileChanges.deleted.size ?? 0),
    };
  }

  private updateProjectWatches(snapshot: Snapshot): readonly Error[] {
    const errors: Error[] = [];
    for (const project of snapshot.projectCollection.configuredProjects()) {
      const projectErrors = this.updateWatch(project.name(), project.programFilesWatch.value);
      errors.push(...projectErrors);
      if (project.typingsWatch !== undefined) {
        errors.push(...this.updateWatch(project.typingsWatch.description, project.typingsWatch.value));
      }
    }
    return errors;
  }

  private updateWatch(ownerId: string, patterns: unknown): readonly Error[] {
    if (this.client === undefined) return [];
    const watchers = this.fileSystemWatchersFromPatterns(ownerId, patterns);
    const errors: Error[] = [];
    for (const watcher of watchers) {
      try {
        void this.client.watchFiles(undefined, watcher.id, [watcher]);
      } catch (error) {
        errors.push(error instanceof Error ? error : new Error(String(error)));
      }
    }
    return errors;
  }

  private fileSystemWatchersFromPatterns(ownerId: string, patterns: unknown): readonly FileSystemWatcherSpec[] {
    if (patterns === undefined || patterns === null || typeof patterns !== "object") return [];
    const record = patterns as {
      readonly patternsInsideWorkspace?: readonly string[];
      readonly patternsOutsideWorkspace?: readonly string[];
      readonly ignored?: readonly string[] | Readonly<Record<string, unknown>>;
    };
    const ignored = Array.isArray(record.ignored)
      ? record.ignored
      : record.ignored === undefined ? [] : Object.keys(record.ignored);
    const watchers: FileSystemWatcherSpec[] = [];
    for (const [scope, values] of [
      ["workspace", record.patternsInsideWorkspace ?? []],
      ["external", record.patternsOutsideWorkspace ?? []],
    ] as const) {
      for (const [index, glob] of values.entries()) {
        watchers.push({
          id: `${ownerId}:${scope}:${index}`,
          globPattern: glob,
          watchKind: "create-change-delete",
          ignored,
        });
      }
    }
    return watchers;
  }

  private shouldPublishProgramDiagnosticsForProject(project: { readonly kind: number; readonly program?: unknown; readonly programLastUpdate?: number; readonly programUpdateKind?: number }, snapshotId: number): boolean {
    return project.kind === 1
      && project.program !== undefined
      && project.programLastUpdate === snapshotId
      && (project.programUpdateKind ?? 0) > 1;
  }

  private projectDiagnosticsForPublish(project: unknown): readonly unknown[] {
    const candidate = project as { getProjectDiagnostics?: () => readonly unknown[]; program?: { diagnostics?: readonly unknown[] } };
    return candidate.getProjectDiagnostics?.() ?? candidate.program?.diagnostics ?? [];
  }

  private projectDiagnosticsUri(project: unknown): string {
    const candidate = project as { id?: () => string; name?: () => string };
    const path = candidate.id?.() ?? candidate.name?.() ?? "";
    return path.startsWith("file://") ? path : `file://${path}`;
  }
}

export function newSession(init: SessionInit): Session {
  return new Session(init);
}

interface FileSystemWatcherSpec {
  readonly id: string;
  readonly globPattern: string;
  readonly watchKind: "create-change-delete";
  readonly ignored: readonly string[];
}

function normalizePathSegments(path: string): string {
  const parts: string[] = [];
  for (const part of path.split("/")) {
    if (part.length === 0 || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return path.startsWith("/") ? `/${parts.join("/")}` : parts.join("/");
}
