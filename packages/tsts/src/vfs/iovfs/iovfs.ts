/**
 * Node.js fs-backed VFS implementation (alternative to osvfs).
 *
 * Port skeleton of TS-Go `internal/vfs/iovfs/iofs.go` (~222 LoC).
 * Wraps a standard Node.js `fs` namespace into a `FS` adapter. The
 * difference vs `osvfs` is that `iovfs` is constructed with an
 * explicit fs implementation (useful for jail-rooted tests or
 * stubbed-out filesystems).
 */

import type { FS } from "../vfs.js";

export interface NodeFSLike {
  readFileSync(path: string, encoding: "utf-8" | "utf8"): string;
  writeFileSync(path: string, data: string): void;
  existsSync(path: string): boolean;
  statSync(path: string): { isFile(): boolean; isDirectory(): boolean; mtimeMs: number; size: number };
  readdirSync(path: string): readonly string[];
  rmSync(path: string, options: { recursive?: boolean; force?: boolean }): void;
}

export function newIOFS(fs: NodeFSLike, caseSensitive: boolean): FS {
  return adaptToFS(fs, caseSensitive);
}

declare function adaptToFS(fs: NodeFSLike, caseSensitive: boolean): FS;
