/**
 * Polling-based file watcher designed for use by both the CLI watcher
 * and the language server.
 *
 * Mechanical 1:1 port of TS-Go `internal/vfs/vfswatch/vfswatch.go`.
 * Same functions, same control flow, same helper decomposition.
 *
 * Go-only facades, classified rather than fabricated:
 *   - `sync.Mutex` (`fw.mu`): Go concurrency primitive. TSTS runs the
 *     watcher on the single JS event loop, so the lock/unlock pairs are
 *     no-ops here and are elided.
 *   - `io.Writer` (`debugLog`): modeled as a `{ write(text) }` sink.
 *   - `github.com/zeebo/xxh3` (`xxh3.Hasher`): an external Go hashing
 *     library with no TS counterpart. `hashEntries` reproduces the same
 *     byte stream ("d:"/"f:" prefixed, NUL-separated, sorted) and folds
 *     it through a 64-bit hash; the concrete mixing function is a
 *     local stand-in for the xxh3 facade.
 */

import type { Entries, FS } from "../vfs.js";

// debounceWait = 250 * time.Millisecond
const debounceWait = 250;

// WatchEntry mirrors TS-Go `WatchEntry`.
export interface WatchEntry {
  readonly modTime: Date;
  readonly exists: boolean;
  // 0 if not tracked
  readonly childrenHash: bigint;
}

// WatchState is `map[string]WatchEntry` in TS-Go.
export type WatchState = Map<string, WatchEntry>;

// DebugLog models the `io.Writer` (`debugLog`) sink in TS-Go.
export interface DebugLog {
  write(text: string): void;
}

// FileWatcher mirrors TS-Go `FileWatcher`.
export class FileWatcher {
  private readonly fs: FS;
  private pollInterval: number;
  private readonly testing: boolean;
  private readonly callback: () => void;
  private watchState: WatchState | undefined;
  private wildcardDirectories: Map<string, boolean> | undefined;
  // nil = silent; non-nil = write timing lines here
  private debugLog: DebugLog | undefined;

  constructor(fs: FS, pollInterval: number, testing: boolean, callback: () => void) {
    this.fs = fs;
    this.pollInterval = pollInterval;
    this.testing = testing;
    this.callback = callback;
  }

  // SetDebugLog enables per-scan timing output written to w.
  // Pass undefined to disable. Safe to call at any time.
  setDebugLog(w: DebugLog | undefined): void {
    this.debugLog = w;
  }

  setPollInterval(d: number): void {
    this.pollInterval = d;
  }

  watchStateEntry(path: string): readonly [WatchEntry | undefined, boolean] {
    const e = this.watchState?.get(path);
    return [e, e !== undefined];
  }

  watchStateUninitialized(): boolean {
    return this.watchState === undefined;
  }

  updateWatchState(paths: readonly string[], wildcardDirs: Map<string, boolean>): void {
    const state = snapshotPaths(this.fs, paths, wildcardDirs);
    this.watchState = state;
    this.wildcardDirectories = wildcardDirs;
  }

  waitForSettled(now: () => Date): void {
    if (this.testing) {
      return;
    }
    const pollInterval = this.pollInterval;
    let current = this.currentState();
    let settledAt = now();
    const tick = Math.min(pollInterval, debounceWait);
    while (now().getTime() - settledAt.getTime() < debounceWait) {
      sleep(tick);
      if (this.hasChanges(current)) {
        current = this.currentState();
        settledAt = now();
      }
    }
  }

  currentState(): WatchState {
    const watchState = this.watchState;
    const wildcardDirs = this.wildcardDirectories;
    const state: WatchState = new Map<string, WatchEntry>();
    if (watchState !== undefined) {
      for (const fn of watchState.keys()) {
        const s = this.fs.stat(fn);
        if (s !== undefined) {
          state.set(fn, { modTime: s.mtime, exists: true, childrenHash: 0n });
        } else {
          state.set(fn, { modTime: new Date(0), exists: false, childrenHash: 0n });
        }
      }
    }
    if (wildcardDirs !== undefined) {
      for (const [dir, recursive] of wildcardDirs) {
        if (!recursive) {
          snapshotDirEntry(this.fs, state, dir);
          continue;
        }
        this.fs.walkDir(dir, (path, d) => {
          if (!d.isDirectory) {
            return undefined;
          }
          snapshotDirEntry(this.fs, state, path);
          return undefined;
        });
      }
    }
    return state;
  }

  // hasChanges compares the current filesystem state against baseline.
  //
  // Tracked entries fall into two categories:
  //
  //   - Explicit paths (files the compiler depends on, plus directory paths
  //     accessed via DirectoryExists/Stat/etc. during compilation). For these
  //     we only need to know whether the path exists and, if it does, whether
  //     its mtime has changed.
  //
  //   - Wildcard tree directories. snapshotPaths walks every directory under
  //     each recursive wildcard root and stores it with a ChildrenHash that
  //     covers the directory's listing. Re-hashing here detects any new,
  //     deleted, or renamed file or subdirectory in those trees.
  hasChanges(baseline: Map<string, WatchEntry>): boolean {
    for (const [path, old] of baseline) {
      const s = this.fs.stat(path);
      if (!old.exists) {
        if (s !== undefined) {
          return true;
        }
      } else {
        if (s === undefined || s.mtime.getTime() !== old.modTime.getTime()) {
          return true;
        }
        if (old.childrenHash !== 0n) {
          const entries = this.fs.getAccessibleEntries(path);
          if (hashEntries(entries) !== old.childrenHash) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // HasChangesFromWatchState compares the current filesystem against the
  // stored watch state.
  hasChangesFromWatchState(): boolean {
    const ws = this.watchState;
    if (ws === undefined) {
      return false;
    }
    return this.hasChanges(ws);
  }

  run(now: () => Date): void {
    for (;;) {
      const interval = this.pollInterval;
      const ws = this.watchState;
      const log = this.debugLog;
      sleep(interval);
      const start = now();
      const changed = ws === undefined || this.hasChanges(ws);
      if (log !== undefined) {
        const elapsed = now().getTime() - start.getTime();
        let files = 0;
        let dirs = 0;
        let missing = 0;
        if (ws !== undefined) {
          for (const e of ws.values()) {
            if (!e.exists) {
              missing++;
            } else if (e.childrenHash !== 0n) {
              dirs++;
            } else {
              files++;
            }
          }
        }
        log.write(
          `[vfswatch] scan: ${ws?.size ?? 0} paths (${files} files, ${dirs} dirs, ${missing} missing), `
            + `${elapsed.toFixed(1)}ms, changed=${changed}\n`,
        );
      }
      if (changed) {
        this.waitForSettled(now);
        this.callback();
      }
    }
  }
}

export function newFileWatcher(fs: FS, pollInterval: number, testing: boolean, callback: () => void): FileWatcher {
  return new FileWatcher(fs, pollInterval, testing, callback);
}

function snapshotPaths(fs: FS, paths: readonly string[], wildcardDirs: Map<string, boolean>): Map<string, WatchEntry> {
  const state = new Map<string, WatchEntry>();
  for (const fn of paths) {
    const s = fs.stat(fn);
    if (s !== undefined) {
      state.set(fn, { modTime: s.mtime, exists: true, childrenHash: 0n });
    } else {
      state.set(fn, { modTime: new Date(0), exists: false, childrenHash: 0n });
    }
  }
  for (const [dir, recursive] of wildcardDirs) {
    if (!recursive) {
      snapshotDirEntry(fs, state, dir);
      continue;
    }
    fs.walkDir(dir, (path, d) => {
      if (!d.isDirectory) {
        return undefined;
      }
      snapshotDirEntry(fs, state, path);
      return undefined;
    });
  }
  return state;
}

function snapshotDirEntry(fs: FS, state: Map<string, WatchEntry>, dir: string): void {
  const entries = fs.getAccessibleEntries(dir);
  const h = hashEntries(entries);
  const existing = state.get(dir);
  if (existing !== undefined) {
    state.set(dir, { ...existing, childrenHash: h });
  } else {
    const s = fs.stat(dir);
    if (s !== undefined) {
      state.set(dir, { modTime: s.mtime, exists: true, childrenHash: h });
    }
  }
}

function hashEntries(entries: Entries): bigint {
  const dirs = [...entries.directories];
  const files = [...entries.files];
  dirs.sort();
  files.sort();
  const h = new Hasher();
  for (const name of dirs) {
    h.writeString("d:");
    h.writeString(name);
    h.writeByte(0);
  }
  for (const name of files) {
    h.writeString("f:");
    h.writeString(name);
    h.writeByte(0);
  }
  return h.sum64();
}

// Hasher is a local stand-in for the `github.com/zeebo/xxh3` Go-only
// facade. It folds the same byte stream as upstream through a 64-bit
// FNV-1a accumulator; only intra-run hash stability is required.
class Hasher {
  private hash = 1469598103934665603n;

  writeString(text: string): void {
    for (let i = 0; i < text.length; i++) {
      this.writeByte(text.charCodeAt(i) & 0xff);
    }
  }

  writeByte(b: number): void {
    this.hash ^= BigInt(b);
    this.hash = (this.hash * 1099511628211n) & 0xffffffffffffffffn;
  }

  sum64(): bigint {
    return this.hash;
  }
}

// time.Sleep is a Go-runtime facade with no synchronous TS counterpart.
// The CLI watcher and language server drive the poll cadence on the event
// loop (setInterval/await) rather than blocking a thread, so this stand-in
// is intentionally a no-op: `run` and `waitForSettled` preserve the upstream
// control skeleton but are not meant to be invoked as blocking loops in TSTS.
function sleep(_ms: number): void {
  // no-op: blocking sleep has no single-threaded TS equivalent
}
