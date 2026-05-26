/**
 * Polling-based file watcher.
 *
 * Port surface of TS-Go `internal/vfs/vfswatch/vfswatch.go`. The full
 * polling loop, debounce, and children-hash semantics land alongside
 * the watch-mode CLI; this file ports the type surface and basic
 * `FileWatcher` shape so other modules can declare against it.
 *
 * Node has `fs.watch` and `chokidar`-style libraries; the TSTS port
 * preserves the polling model for consistency with TS-Go and
 * cross-platform reliability.
 */

import type { FS } from "../vfs.js";

/**
 * Debounce interval after a change. Mirrors TS-Go
 * `debounceWait = 250 * time.Millisecond`.
 */
export const DEBOUNCE_WAIT_MS = 250;

/**
 * Per-path watcher state. Mirrors TS-Go `WatchEntry`.
 */
export interface WatchEntry {
  readonly modTime: Date;
  readonly exists: boolean;
  /** Hash of immediate children for tracked directories; 0 if not tracked. */
  readonly childrenHash: bigint;
}

/**
 * Polling file watcher. Mirrors TS-Go `FileWatcher`.
 */
export class FileWatcher {
  private readonly fs: FS;
  private pollIntervalMs: number;
  private readonly testing: boolean;
  private readonly callback: () => void;
  private watchState?: Map<string, WatchEntry>;
  private wildcardDirectories?: Map<string, boolean>;

  constructor(fs: FS, pollIntervalMs: number, testing: boolean, callback: () => void) {
    this.fs = fs;
    this.pollIntervalMs = pollIntervalMs;
    this.testing = testing;
    this.callback = callback;
  }

  setPollInterval(ms: number): void {
    this.pollIntervalMs = ms;
  }

  watchStateEntry(path: string): WatchEntry | undefined {
    return this.watchState?.get(path);
  }

  watchStateUninitialized(): boolean {
    return this.watchState === undefined;
  }

  /**
   * Snapshots `paths` and `wildcardDirs` and stores the result as the
   * baseline state. Subsequent ticks compare against this baseline.
   */
  updateWatchState(paths: readonly string[], wildcardDirs: Map<string, boolean>): void {
    const state = snapshotPaths(this.fs, paths, wildcardDirs);
    this.watchState = state;
    this.wildcardDirectories = wildcardDirs;
  }

  /**
   * Waits for the file system to settle (no changes for `debounceWait`).
   * In testing mode, returns immediately. Mirrors TS-Go `WaitForSettled`.
   */
  async waitForSettled(now: () => number): Promise<void> {
    if (this.testing) return;
    let current = this.currentState();
    let settledAt = now();
    const tick = Math.min(this.pollIntervalMs, DEBOUNCE_WAIT_MS);
    while (now() - settledAt < DEBOUNCE_WAIT_MS) {
      await sleep(tick);
      if (this.hasChanges(current)) {
        current = this.currentState();
        settledAt = now();
      }
    }
  }

  private currentState(): Map<string, WatchEntry> {
    const out = new Map<string, WatchEntry>();
    if (this.watchState === undefined) return out;
    for (const fn of this.watchState.keys()) {
      const s = this.fs.stat(fn);
      if (s !== undefined) {
        out.set(fn, { modTime: s.mtime, exists: true, childrenHash: 0n });
      } else {
        out.set(fn, { modTime: new Date(0), exists: false, childrenHash: 0n });
      }
    }
    return out;
  }

  private hasChanges(prior: Map<string, WatchEntry>): boolean {
    // TODO: also consult `this.wildcardDirectories` for child-set changes.
    if (this.watchState === undefined) return false;
    for (const [path, entry] of prior) {
      const cur = this.watchState.get(path);
      if (cur === undefined) return true;
      if (cur.exists !== entry.exists) return true;
      if (cur.exists && cur.modTime.getTime() !== entry.modTime.getTime()) return true;
    }
    return false;
  }
}

function snapshotPaths(fs: FS, paths: readonly string[], _wildcardDirs: Map<string, boolean>): Map<string, WatchEntry> {
  const state = new Map<string, WatchEntry>();
  for (const path of paths) {
    const s = fs.stat(path);
    if (s !== undefined) {
      state.set(path, { modTime: s.mtime, exists: true, childrenHash: 0n });
    } else {
      state.set(path, { modTime: new Date(0), exists: false, childrenHash: 0n });
    }
  }
  return state;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
