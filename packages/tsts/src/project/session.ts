import type { Client } from "./client.js";
import { newFileChangeSummary, mergeFileChangeSummary, type FileChange, type FileChangeSummary } from "./fileChange.js";
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

export class Session {
  readonly options: SessionOptions;
  readonly fs: SnapshotFS;
  readonly client: Client | undefined;
  readonly logger: LogTree;
  readonly parseCache: ParseCache;
  private snapshotId = 0;
  private snapshotValue: Snapshot;
  private readonly pendingFileChanges: FileChange[] = [];
  private scheduledUpdate: ScheduledUpdate | undefined;
  private scheduledGeneration = 0;

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

  openFile(fileName: string, content: string, version = 0): void {
    this.fs.openFile(fileName, content, version);
    this.pendingFileChanges.push({ kind: "open", uri: fileName, version, content });
    this.scheduleSnapshotUpdate(UpdateReason.DidOpenFile);
  }

  changeFile(fileName: string, content: string, version = 0): void {
    this.fs.openFile(fileName, content, version);
    this.pendingFileChanges.push({ kind: "change", uri: fileName, version, content });
    this.scheduleSnapshotUpdate(UpdateReason.RequestedLanguageServicePendingChanges);
  }

  closeFile(fileName: string): void {
    this.fs.closeFile(fileName);
    this.pendingFileChanges.push({ kind: "close", uri: fileName });
    this.scheduleSnapshotUpdate(UpdateReason.DidCloseFile);
  }

  saveFile(fileName: string): void {
    this.pendingFileChanges.push({ kind: "save", uri: fileName });
    this.scheduleSnapshotUpdate(UpdateReason.RequestedLanguageServicePendingChanges);
  }

  getFile(fileName: string): FileHandle | undefined {
    return this.snapshotValue.getFile(fileName);
  }

  scheduleSnapshotUpdate(reason: UpdateReason): ScheduledUpdate {
    const summary = this.consumePendingSummary(false);
    this.scheduledGeneration += 1;
    this.scheduledUpdate = {
      generation: this.scheduledGeneration,
      reason,
      fileChanges: summary,
    };
    return this.scheduledUpdate;
  }

  updateSnapshot(reason: UpdateReason = UpdateReason.Unknown): Snapshot {
    const changes = this.consumePendingSummary(true);
    this.snapshotId += 1;
    this.snapshotValue = this.createSnapshot(this.snapshotValue.id(), changes);
    this.scheduledUpdate = undefined;
    this.logger.log(`Snapshot ${this.snapshotValue.id()} updated for reason ${reason}`);
    return this.snapshotValue;
  }

  pendingUpdate(): ScheduledUpdate | undefined {
    return this.scheduledUpdate;
  }

  private createSnapshot(parentId = 0, fileChanges: FileChangeSummary = newFileChangeSummary()): Snapshot {
    const options: SnapshotOptions = {
      id: this.snapshotId,
      parentId,
      fs: this.fs.clone(),
      currentDirectory: this.options.currentDirectory,
      useCaseSensitiveFileNames: this.options.useCaseSensitiveFileNames ?? true,
      fileChanges,
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
    if (clear) this.pendingFileChanges.length = 0;
    return summary;
  }
}

export function newSession(init: SessionInit): Session {
  return new Session(init);
}
