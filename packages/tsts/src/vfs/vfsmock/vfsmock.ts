/**
 * Test-only mock FS.
 *
 * Port skeleton of TS-Go `internal/vfs/vfsmock/wrapper.go` and
 * `mock_generated.go`. The TS-Go version uses `go.uber.org/mock`
 * generated stubs that record every method call; in TypeScript we
 * use a hand-written class with the same interface where each method
 * can be configured via a stubbed handler.
 */

import type { FS, FileInfo, WalkDirFunc } from "../vfs.js";

export type MockHandler = (...args: unknown[]) => unknown;

export class MockFS implements FS {
  readonly handlers = new Map<string, MockHandler>();

  set(methodName: string, handler: MockHandler): void {
    this.handlers.set(methodName, handler);
  }

  // The minimum FS surface — additional methods can be set via `set()`.
  readFile(path: string): string | undefined {
    const h = this.handlers.get("readFile");
    return h !== undefined ? (h(path) as string | undefined) : undefined;
  }

  writeFile(path: string, data: string): void {
    const h = this.handlers.get("writeFile");
    if (h !== undefined) h(path, data);
  }

  appendFile(path: string, data: string): void {
    const h = this.handlers.get("appendFile");
    if (h !== undefined) h(path, data);
  }

  chtimes(path: string, accessTime: Date, modifyTime: Date): void {
    const h = this.handlers.get("chtimes");
    if (h !== undefined) h(path, accessTime, modifyTime);
  }

  fileExists(path: string): boolean {
    const h = this.handlers.get("fileExists");
    return h !== undefined ? Boolean(h(path)) : false;
  }

  directoryExists(path: string): boolean {
    const h = this.handlers.get("directoryExists");
    return h !== undefined ? Boolean(h(path)) : false;
  }

  useCaseSensitiveFileNames(): boolean {
    const h = this.handlers.get("useCaseSensitiveFileNames");
    return h !== undefined ? Boolean(h()) : true;
  }

  realpath(path: string): string {
    const h = this.handlers.get("realpath");
    return h !== undefined ? String(h(path)) : path;
  }

  remove(path: string): void {
    const h = this.handlers.get("remove");
    if (h !== undefined) h(path);
  }

  walkDir(path: string, walkFn: WalkDirFunc): void {
    const h = this.handlers.get("walkDir");
    if (h !== undefined) h(path, walkFn);
  }

  getAccessibleEntries(path: string): { files: readonly string[]; directories: readonly string[] } {
    const h = this.handlers.get("getAccessibleEntries");
    if (h !== undefined) return h(path) as { files: readonly string[]; directories: readonly string[] };
    return { files: [], directories: [] };
  }

  stat(path: string): FileInfo | undefined {
    const h = this.handlers.get("stat");
    return h !== undefined ? (h(path) as FileInfo | undefined) : undefined;
  }
}

export function newMockFS(): MockFS {
  return new MockFS();
}
