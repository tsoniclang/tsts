import { SnapshotFS, type FileHandle } from "./snapshotFs.js";
import { FileChangeKind, isWatchKind, newFileChangeSummary, type FileChange, type FileChangeSummary } from "./fileChange.js";

export interface Overlay {
  readonly fileName: string;
  readonly version: number;
  readonly content: string;
  readonly kind?: string;
  readonly matchesDiskText?: boolean;
}

interface FileEvents {
  openChange: FileChange | undefined;
  closeChange: FileChange | undefined;
  watchChanged: boolean;
  changes: FileChange[];
  saved: boolean;
  created: boolean;
  deleted: boolean;
}

export class OverlayFS {
  private readonly base: SnapshotFS;
  private readonly overlays = new Map<string, Overlay>();

  constructor(base: SnapshotFS = new SnapshotFS(), overlays?: Iterable<Overlay>) {
    this.base = base;
    if (overlays !== undefined) {
      for (const overlay of overlays) this.overlays.set(normalize(overlay.fileName), cloneOverlay(overlay));
    }
  }

  open(fileName: string, content: string, version = 0): void {
    this.overlays.set(normalize(fileName), this.newOverlay(fileName, content, version));
  }

  update(fileName: string, content: string, version = 0): void {
    if (!this.overlays.has(normalize(fileName))) throw new Error(`cannot update unopened file '${fileName}'`);
    this.open(fileName, content, version);
  }

  close(fileName: string): void {
    this.overlays.delete(normalize(fileName));
  }

  overlaysByPath(): ReadonlyMap<string, Overlay> {
    return new Map(this.overlays);
  }

  overlaysSnapshot(): readonly Overlay[] {
    return [...this.overlays.values()].map(cloneOverlay).sort((left, right) => left.fileName.localeCompare(right.fileName));
  }

  getOverlay(fileName: string): Overlay | undefined {
    const overlay = this.overlays.get(normalize(fileName));
    return overlay === undefined ? undefined : cloneOverlay(overlay);
  }

  isOpenFile(fileName: string): boolean {
    return this.overlays.has(normalize(fileName));
  }

  version(fileName: string): number {
    return this.overlays.get(normalize(fileName))?.version ?? 0;
  }

  text(fileName: string): string | undefined {
    return this.overlays.get(normalize(fileName))?.content;
  }

  kind(fileName: string): string {
    return this.overlays.get(normalize(fileName))?.kind ?? scriptKindFromFileName(fileName);
  }

  matchesDiskText(fileName: string): boolean {
    const overlay = this.overlays.get(normalize(fileName));
    if (overlay === undefined) return true;
    return overlay.matchesDiskText ?? this.base.readFile(fileName) === overlay.content;
  }

  computeMatchesDiskText(fileName: string): readonly [boolean, boolean] {
    const overlay = this.overlays.get(normalize(fileName));
    if (overlay === undefined) return [true, this.base.fileExists(fileName)];
    const diskContent = this.base.readFile(fileName);
    if (diskContent === undefined) return [false, false];
    return [diskContent === overlay.content, true];
  }

  contentHash(fileName: string): string | undefined {
    const content = this.readFile(fileName);
    return content === undefined ? undefined : hashString(content);
  }

  lspLineMap(fileName: string): readonly number[] | undefined {
    const content = this.readFile(fileName);
    return content === undefined ? undefined : lineStarts(content);
  }

  ecmaLineInfo(fileName: string): readonly number[] | undefined {
    return this.lspLineMap(fileName);
  }

  closeAll(): void {
    this.overlays.clear();
  }

  getFile(fileName: string): FileHandle | undefined {
    const overlay = this.overlays.get(normalize(fileName));
    if (overlay !== undefined) {
      const fs = new SnapshotFS([[overlay.fileName, overlay.content]]);
      return fs.getFile(overlay.fileName);
    }
    return this.base.getFile(fileName);
  }

  readFile(fileName: string): string | undefined {
    const overlay = this.overlays.get(normalize(fileName));
    return overlay?.content ?? this.base.readFile(fileName);
  }

  fileExists(fileName: string): boolean {
    return this.overlays.has(normalize(fileName)) || this.base.fileExists(fileName);
  }

  openFiles(): readonly string[] {
    return [...this.overlays.values()].map(overlay => overlay.fileName).sort();
  }

  processChanges(changes: readonly FileChange[]): readonly [FileChangeSummary, ReadonlyMap<string, Overlay>] {
    const result = newFileChangeSummary();
    const nextOverlays = new Map(this.overlays);
    const fileEventMap = new Map<string, FileEvents>();
    for (const change of changes) {
      const uri = change.uri;
      let events = fileEventMap.get(uri);
      if (events === undefined) {
        events = { openChange: undefined, closeChange: undefined, watchChanged: false, changes: [], saved: false, created: false, deleted: false };
        fileEventMap.set(uri, events);
      } else if (events.openChange !== undefined) {
        throw new Error("changes after open are not a valid overlay event sequence");
      }
      if (!result.includesWatchChangeOutsideNodeModules && isWatchKind(change.kind) && !uri.includes("/node_modules/")) {
        result.includesWatchChangeOutsideNodeModules = true;
      }
      switch (change.kind) {
        case FileChangeKind.Open:
          events.closeChange = undefined;
          events.openChange = change;
          events.watchChanged = false;
          events.changes = [];
          events.saved = false;
          events.created = false;
          events.deleted = false;
          break;
        case FileChangeKind.Close:
          events.closeChange = change;
          events.changes = [];
          events.saved = false;
          events.watchChanged = false;
          break;
        case FileChangeKind.Change:
          if (events.closeChange !== undefined) throw new Error("changes after close are not a valid overlay event sequence");
          events.changes.push(change);
          events.saved = false;
          events.watchChanged = false;
          break;
        case FileChangeKind.Save:
          events.saved = true;
          break;
        case FileChangeKind.WatchCreate:
          if (events.deleted) {
            events.deleted = false;
            events.watchChanged = true;
          } else {
            events.created = true;
          }
          break;
        case FileChangeKind.WatchChange:
          if (!events.created) {
            events.watchChanged = true;
            events.saved = false;
          }
          break;
        case FileChangeKind.WatchDelete:
          events.watchChanged = false;
          events.saved = false;
          if (events.created) events.created = false;
          else events.deleted = true;
          break;
      }
    }
    for (const [uri, events] of fileEventMap) {
      const path = normalize(uri);
      let overlay = nextOverlays.get(path);
      if (events.openChange !== undefined) {
        if (result.opened !== undefined || result.reopened !== undefined) throw new Error("can only process one file open event at a time");
        if (overlay !== undefined && overlay.content !== events.openChange.content) result.changed.add(uri);
        else if (overlay === undefined) result.opened = uri;
        else result.reopened = uri;
        nextOverlays.set(path, this.newOverlay(uri, events.openChange.content ?? "", events.openChange.version ?? 0, events.openChange.languageKind));
        continue;
      }
      if (events.closeChange !== undefined) {
        if (overlay === undefined) throw new Error(`overlay not found for closed file: ${uri}`);
        result.closed.add(uri);
        nextOverlays.delete(path);
        overlay = undefined;
      }
      if (events.watchChanged) {
        if (overlay === undefined) {
          result.changed.add(uri);
        } else if (!events.saved) {
          const matchesDiskText = this.base.readFile(uri) === overlay.content;
          if (matchesDiskText !== overlay.matchesDiskText) {
            overlay = { ...overlay, matchesDiskText };
            nextOverlays.set(path, overlay);
          }
        }
      }
      if (events.changes.length > 0) {
        result.changed.add(uri);
        if (overlay === undefined) throw new Error(`overlay not found for changed file: ${uri}`);
        for (const change of events.changes) {
          const nextContent = contentAfterChange(overlay.content, change);
          overlay = this.newOverlay(overlay.fileName, nextContent, change.version ?? overlay.version, overlay.kind);
          nextOverlays.set(path, overlay);
        }
      }
      if (events.saved) {
        if (overlay !== undefined) {
          overlay = { ...overlay, matchesDiskText: true };
          nextOverlays.set(path, overlay);
        } else if (!events.watchChanged) {
          result.changed.add(uri);
        }
      }
      if (events.created && overlay === undefined) result.created.add(uri);
      if (events.deleted && overlay === undefined) result.deleted.add(uri);
    }
    this.overlays.clear();
    for (const [path, overlay] of nextOverlays) this.overlays.set(path, overlay);
    return [result, new Map(nextOverlays)];
  }

  snapshot(): SnapshotFS {
    const snapshot = this.base.clone();
    for (const overlay of this.overlays.values()) snapshot.openFile(overlay.fileName, overlay.content, overlay.version);
    return snapshot;
  }

  private newOverlay(fileName: string, content: string, version: number, kind?: string): Overlay {
    const overlay: Overlay = {
      fileName,
      content,
      version,
      matchesDiskText: this.base.readFile(fileName) === content,
    };
    return kind === undefined ? overlay : { ...overlay, kind };
  }
}

export function newOverlayFS(base?: SnapshotFS, overlays?: Iterable<Overlay>): OverlayFS {
  return new OverlayFS(base, overlays);
}

function normalize(path: string): string {
  return path.replaceAll("\\", "/").replace(/\/+/g, "/");
}

function cloneOverlay(overlay: Overlay): Overlay {
  const clone: Overlay = {
    fileName: overlay.fileName,
    content: overlay.content,
    version: overlay.version,
    ...(overlay.matchesDiskText === undefined ? {} : { matchesDiskText: overlay.matchesDiskText }),
  };
  return overlay.kind === undefined ? clone : { ...clone, kind: overlay.kind };
}

function scriptKindFromFileName(fileName: string): string {
  const extension = /\.[^.\\/]+$/u.exec(fileName)?.[0].toLowerCase();
  switch (extension) {
    case ".js":
    case ".jsx":
    case ".mjs":
    case ".cjs":
    case ".json":
    case ".ts":
    case ".tsx":
    case ".mts":
    case ".cts":
      return extension.slice(1);
    default:
      return "unknown";
  }
}

function lineStarts(text: string): readonly number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) {
    const ch = text.charCodeAt(index);
    if (ch === 13) {
      if (text.charCodeAt(index + 1) === 10) index += 1;
      starts.push(index + 1);
    } else if (ch === 10) {
      starts.push(index + 1);
    }
  }
  return starts;
}

function hashString(text: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function contentAfterChange(current: string, change: FileChange): string {
  if (change.content !== undefined) return change.content;
  let text = current;
  for (const item of change.changes ?? []) {
    const next = applyTextChange(text, item);
    if (next !== undefined) text = next;
  }
  return text;
}

function applyTextChange(current: string, change: unknown): string | undefined {
  if (typeof change === "string") return change;
  if (change === null || typeof change !== "object") return undefined;
  const record = change as {
    readonly text?: unknown;
    readonly span?: { readonly start?: unknown; readonly length?: unknown };
    readonly range?: { readonly start?: unknown; readonly end?: unknown };
  };
  if (typeof record.text !== "string") return undefined;
  if (record.span !== undefined && typeof record.span.start === "number" && typeof record.span.length === "number") {
    return current.slice(0, record.span.start) + record.text + current.slice(record.span.start + record.span.length);
  }
  if (record.range !== undefined && typeof record.range.start === "number" && typeof record.range.end === "number") {
    return current.slice(0, record.range.start) + record.text + current.slice(record.range.end);
  }
  return record.text;
}
