/**
 * Callback-based virtual file system.
 *
 * Port of TS-Go `internal/api/callbackfs.go` (~226 LoC). Wraps a
 * client-side callback set (readFile, exists, walkDir, etc.) as a
 * server-side FS so the session can issue file lookups against the
 * remote client filesystem.
 */

import type { FS, FileInfo, Entries, WalkDirFunc } from "../vfs/vfs.js";

export const callbackReadFile = "readFile";
export const callbackFileExists = "fileExists";
export const callbackDirectoryExists = "directoryExists";
export const callbackGetAccessibleEntries = "getAccessibleEntries";
export const callbackRealpath = "realpath";
export type CallbackName =
  | typeof callbackReadFile
  | typeof callbackFileExists
  | typeof callbackDirectoryExists
  | typeof callbackGetAccessibleEntries
  | typeof callbackRealpath;

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

export interface Conn {
  call(ctx: unknown, name: string, arg: unknown): Uint8Array | string | undefined;
}

export class CallbackFS implements FS {
  readonly #base: FS;
  readonly #enabledCallbacks: ReadonlyMap<string, boolean>;
  #conn: Conn | undefined;
  #ctx: unknown;

  constructor(base: FS, callbacks: readonly string[] = []) {
    this.#base = base;
    const enabled = new Map<string, boolean>();
    for (const callback of callbacks) {
      if (!isCallbackName(callback)) throw new Error("unknown callback name: " + callback);
      enabled.set(callback, true);
    }
    this.#enabledCallbacks = enabled;
  }

  setConnection(ctx: unknown, conn: Conn): void {
    this.#ctx = ctx;
    this.#conn = conn;
  }

  isEnabled(name: string): boolean {
    return this.#enabledCallbacks.get(name) === true;
  }

  call(name: string, arg: unknown): Uint8Array | string | undefined {
    if (this.#conn === undefined) throw new Error(`CallbackFS: ${name} called before connection set`);
    return this.#conn.call(this.#ctx, name, arg);
  }

  useCaseSensitiveFileNames(): boolean { return this.#base.useCaseSensitiveFileNames(); }
  fileExists(path: string): boolean {
    if (this.isEnabled(callbackFileExists)) {
      const result = this.call(callbackFileExists, path);
      if (callbackResultHasValue(result)) return callbackBytesToString(result) === "true";
    }
    return this.#base.fileExists(path);
  }
  readFile(path: string): string | undefined {
    if (this.isEnabled(callbackReadFile)) {
      const result = this.call(callbackReadFile, path);
      if (callbackResultHasValue(result)) {
        const wrapper = JSON.parse(callbackBytesToString(result)) as { content?: string | null };
        return typeof wrapper.content === "string" ? wrapper.content : undefined;
      }
    }
    return this.#base.readFile(path);
  }
  writeFile(path: string, data: string): void { this.#base.writeFile(path, data); }
  appendFile(path: string, data: string): void { this.#base.appendFile(path, data); }
  remove(path: string): void { this.#base.remove(path); }
  chtimes(path: string, accessTime: Date, modifyTime: Date): void {
    this.#base.chtimes(path, accessTime, modifyTime);
  }
  directoryExists(path: string): boolean {
    if (this.isEnabled(callbackDirectoryExists)) {
      const result = this.call(callbackDirectoryExists, path);
      if (callbackResultHasValue(result)) return callbackBytesToString(result) === "true";
    }
    return this.#base.directoryExists(path);
  }
  getAccessibleEntries(path: string): Entries {
    if (this.isEnabled(callbackGetAccessibleEntries)) {
      const result = this.call(callbackGetAccessibleEntries, path);
      if (callbackResultHasValue(result)) {
        const parsed = JSON.parse(callbackBytesToString(result)) as { files?: readonly string[]; directories?: readonly string[] } | null;
        if (parsed !== null) return { files: [...(parsed.files ?? [])], directories: [...(parsed.directories ?? [])] };
      }
    }
    return this.#base.getAccessibleEntries(path);
  }
  realpath(path: string): string {
    if (this.isEnabled(callbackRealpath)) {
      const result = this.call(callbackRealpath, path);
      if (callbackResultHasValue(result)) return JSON.parse(callbackBytesToString(result)) as string;
    }
    return this.#base.realpath(path);
  }
  stat(path: string): FileInfo | undefined { return this.#base.stat(path); }
  walkDir(root: string, walkFn: WalkDirFunc): void { this.#base.walkDir(root, walkFn); }
}

export function isCallbackName(name: string): name is CallbackName {
  return name === callbackReadFile
    || name === callbackFileExists
    || name === callbackDirectoryExists
    || name === callbackGetAccessibleEntries
    || name === callbackRealpath;
}

export function newCallbackFS(base: FS, callbacks: readonly string[] = []): CallbackFS {
  return new CallbackFS(base, callbacks);
}

export function callbackFSFromCallbacks(callbacks: FSCallback, useCaseSensitive: boolean): CallbackFS {
  return new CallbackFS(new CallbackObjectFS(callbacks, useCaseSensitive));
}

class CallbackObjectFS implements FS {
  private readonly callbacks: FSCallback;
  private readonly useCaseSensitive: boolean;

  constructor(callbacks: FSCallback, useCaseSensitive: boolean) {
    this.callbacks = callbacks;
    this.useCaseSensitive = useCaseSensitive;
  }

  useCaseSensitiveFileNames(): boolean { return this.useCaseSensitive; }
  fileExists(path: string): boolean { return this.callbacks.fileExists(path); }
  readFile(path: string): string | undefined { return this.callbacks.readFile(path); }
  writeFile(path: string, data: string): void { this.callbacks.writeFile(path, data); }
  appendFile(path: string, data: string): void { this.callbacks.appendFile(path, data); }
  remove(path: string): void { this.callbacks.remove(path); }
  chtimes(path: string, accessTime: Date, modifyTime: Date): void { this.callbacks.chtimes(path, accessTime, modifyTime); }
  directoryExists(path: string): boolean { return this.callbacks.directoryExists(path); }
  getAccessibleEntries(path: string): Entries { return this.callbacks.getAccessibleEntries(path); }
  realpath(path: string): string { return this.callbacks.realpath(path); }
  stat(path: string): FileInfo | undefined { return this.callbacks.stat(path); }
  walkDir(root: string, walkFn: WalkDirFunc): void { this.callbacks.walkDir(root, walkFn); }
}

function callbackResultHasValue(result: Uint8Array | string | undefined): result is Uint8Array | string {
  if (result === undefined) return false;
  const text = callbackBytesToString(result);
  return text !== "" && text !== "null";
}

function callbackBytesToString(result: Uint8Array | string): string {
  return typeof result === "string" ? result : new TextDecoder().decode(result);
}
