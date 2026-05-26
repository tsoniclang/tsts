/**
 * Callback-based virtual file system.
 *
 * Port of TS-Go `internal/api/callbackfs.go` (~226 LoC). Wraps a
 * client-side callback set (readFile, exists, walkDir, etc.) as a
 * server-side FS so the session can issue file lookups against the
 * remote client filesystem.
 */

import type { FS, WalkDirCallback, FsStat } from "../vfs/vfs.js";

export interface FSCallback {
  readFile(path: string): { content: string; ok: boolean };
  fileExists(path: string): boolean;
  directoryExists(path: string): boolean;
  realpath(path: string): string;
  getDirectories(path: string): readonly string[];
  walkDir(path: string, cb: WalkDirCallback): void;
  stat(path: string): FsStat | undefined;
  writeFile(path: string, data: string, writeByteOrderMark: boolean): boolean;
  removeFile(path: string): boolean;
}

export class CallbackFS implements FS {
  readonly callbacks: FSCallback;
  readonly useCaseSensitive: boolean;

  constructor(callbacks: FSCallback, useCaseSensitive: boolean) {
    this.callbacks = callbacks;
    this.useCaseSensitive = useCaseSensitive;
  }

  useCaseSensitiveFileNames(): boolean { return this.useCaseSensitive; }

  fileExists(path: string): boolean {
    return this.callbacks.fileExists(path);
  }

  readFile(path: string): { content: string; ok: boolean } {
    return this.callbacks.readFile(path);
  }

  writeFile(path: string, data: string, writeByteOrderMark: boolean): boolean {
    return this.callbacks.writeFile(path, data, writeByteOrderMark);
  }

  removeFile(path: string): boolean {
    return this.callbacks.removeFile(path);
  }

  directoryExists(path: string): boolean {
    return this.callbacks.directoryExists(path);
  }

  getDirectories(path: string): readonly string[] {
    return this.callbacks.getDirectories(path);
  }

  realpath(path: string): string {
    return this.callbacks.realpath(path);
  }

  stat(path: string): FsStat | undefined {
    return this.callbacks.stat(path);
  }

  walkDir(path: string, cb: WalkDirCallback): void {
    this.callbacks.walkDir(path, cb);
  }
}

export function newCallbackFS(callbacks: FSCallback, useCaseSensitive: boolean): CallbackFS {
  return new CallbackFS(callbacks, useCaseSensitive);
}
