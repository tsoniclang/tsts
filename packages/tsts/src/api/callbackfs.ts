/**
 * Callback-based virtual file system.
 *
 * Port of TS-Go `internal/api/callbackfs.go` (~226 LoC). Wraps a
 * client-side callback set (readFile, exists, walkDir, etc.) as a
 * server-side FS so the session can issue file lookups against the
 * remote client filesystem.
 */

import type { FS, FileInfo, Entries, WalkDirFunc } from "../vfs/vfs.js";

export interface FSCallback {
  readFile(path: string): string | undefined;
  fileExists(path: string): boolean;
  directoryExists(path: string): boolean;
  realpath(path: string): string;
  getAccessibleEntries(path: string): Entries;
  walkDir(path: string, walkFn: WalkDirFunc): void;
  stat(path: string): FileInfo | undefined;
  writeFile(path: string, data: string): void;
  appendFile(path: string, data: string): void;
  remove(path: string): void;
  chtimes(path: string, accessTime: Date, modifyTime: Date): void;
}

export class CallbackFS implements FS {
  readonly #callbacks: FSCallback;
  readonly #useCaseSensitive: boolean;

  constructor(callbacks: FSCallback, useCaseSensitive: boolean) {
    this.#callbacks = callbacks;
    this.#useCaseSensitive = useCaseSensitive;
  }

  useCaseSensitiveFileNames(): boolean { return this.#useCaseSensitive; }
  fileExists(path: string): boolean { return this.#callbacks.fileExists(path); }
  readFile(path: string): string | undefined { return this.#callbacks.readFile(path); }
  writeFile(path: string, data: string): void { this.#callbacks.writeFile(path, data); }
  appendFile(path: string, data: string): void { this.#callbacks.appendFile(path, data); }
  remove(path: string): void { this.#callbacks.remove(path); }
  chtimes(path: string, accessTime: Date, modifyTime: Date): void {
    this.#callbacks.chtimes(path, accessTime, modifyTime);
  }
  directoryExists(path: string): boolean { return this.#callbacks.directoryExists(path); }
  getAccessibleEntries(path: string): Entries { return this.#callbacks.getAccessibleEntries(path); }
  realpath(path: string): string { return this.#callbacks.realpath(path); }
  stat(path: string): FileInfo | undefined { return this.#callbacks.stat(path); }
  walkDir(root: string, walkFn: WalkDirFunc): void { this.#callbacks.walkDir(root, walkFn); }
}

export function newCallbackFS(callbacks: FSCallback, useCaseSensitive: boolean): CallbackFS {
  return new CallbackFS(callbacks, useCaseSensitive);
}
