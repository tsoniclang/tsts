export const excessiveChangeThreshold = 1000;

// Port of TS-Go `FileChangeKind int` (`iota` constants in
// internal/project/filechange.go). The numeric ordering mirrors the upstream
// iota sequence: Open, Close, Change, Save, WatchCreate, WatchChange,
// WatchDelete.
export enum FileChangeKind {
  Open,
  Close,
  Change,
  Save,
  WatchCreate,
  WatchChange,
  WatchDelete,
}

// Port of TS-Go `(k FileChangeKind) IsWatchKind()`.
export function isWatchKind(kind: FileChangeKind): boolean {
  return kind === FileChangeKind.WatchCreate || kind === FileChangeKind.WatchChange || kind === FileChangeKind.WatchDelete;
}

export interface FileChange {
  readonly kind: FileChangeKind;
  readonly uri: string;
  readonly version?: number;
  readonly content?: string;
  readonly languageKind?: string;
  readonly changes?: readonly unknown[];
}

export interface FileChangeSummary {
  opened?: string;
  reopened?: string;
  readonly closed: Set<string>;
  readonly changed: Set<string>;
  readonly created: Set<string>;
  readonly deleted: Set<string>;
  includesWatchChangeOutsideNodeModules: boolean;
  invalidateAll: boolean;
}

export function newFileChangeSummary(): FileChangeSummary {
  return {
    closed: new Set(),
    changed: new Set(),
    created: new Set(),
    deleted: new Set(),
    includesWatchChangeOutsideNodeModules: false,
    invalidateAll: false,
  };
}

export function fileChangeSummaryIsEmpty(summary: FileChangeSummary): boolean {
  return summary.invalidateAll !== true
    && summary.opened === undefined
    && summary.reopened === undefined
    && summary.closed.size === 0
    && summary.changed.size === 0
    && summary.created.size === 0
    && summary.deleted.size === 0;
}

export function hasExcessiveWatchEvents(summary: FileChangeSummary): boolean {
  return summary.invalidateAll === true
    || summary.created.size + summary.deleted.size + summary.changed.size > excessiveChangeThreshold;
}

export function hasExcessiveNonCreateWatchEvents(summary: FileChangeSummary): boolean {
  return summary.invalidateAll === true || summary.deleted.size + summary.changed.size > excessiveChangeThreshold;
}

export function mergeFileChangeSummary(dst: FileChangeSummary, src: FileChangeSummary): void {
  if (fileChangeSummaryIsEmpty(src)) return;
  if (src.invalidateAll) dst.invalidateAll = true;
  for (const uri of src.changed) dst.changed.add(uri);
  for (const uri of src.created) dst.created.add(uri);
  for (const uri of src.deleted) dst.deleted.add(uri);
  if (src.opened !== undefined) dst.opened = src.opened;
  if (src.reopened !== undefined) dst.reopened = src.reopened;
  if (src.includesWatchChangeOutsideNodeModules) dst.includesWatchChangeOutsideNodeModules = true;
}
