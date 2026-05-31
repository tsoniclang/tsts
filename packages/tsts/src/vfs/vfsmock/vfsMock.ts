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
  readonly calls = new Map<string, readonly unknown[][]>();

  set(methodName: string, handler: MockHandler): void {
    this.handlers.set(methodName, handler);
  }

  callsFor(methodName: string): readonly unknown[][] {
    return this.calls.get(methodName) ?? [];
  }

  resetCalls(): void {
    this.calls.clear();
  }

  // The minimum FS surface — additional methods can be set via `set()`.
  readFile(path: string): string | undefined {
    this.record("readFile", path);
    const h = this.handlers.get("readFile");
    if (h === undefined) throw new Error("MockFS.readFile handler is not configured");
    return h(path) as string | undefined;
  }

  writeFile(path: string, data: string): void {
    this.record("writeFile", path, data);
    const h = this.handlers.get("writeFile");
    if (h === undefined) throw new Error("MockFS.writeFile handler is not configured");
    h(path, data);
  }

  appendFile(path: string, data: string): void {
    this.record("appendFile", path, data);
    const h = this.handlers.get("appendFile");
    if (h === undefined) throw new Error("MockFS.appendFile handler is not configured");
    h(path, data);
  }

  chtimes(path: string, accessTime: Date, modifyTime: Date): void {
    this.record("chtimes", path, accessTime, modifyTime);
    const h = this.handlers.get("chtimes");
    if (h === undefined) throw new Error("MockFS.chtimes handler is not configured");
    h(path, accessTime, modifyTime);
  }

  fileExists(path: string): boolean {
    this.record("fileExists", path);
    const h = this.handlers.get("fileExists");
    if (h === undefined) throw new Error("MockFS.fileExists handler is not configured");
    return Boolean(h(path));
  }

  directoryExists(path: string): boolean {
    this.record("directoryExists", path);
    const h = this.handlers.get("directoryExists");
    if (h === undefined) throw new Error("MockFS.directoryExists handler is not configured");
    return Boolean(h(path));
  }

  useCaseSensitiveFileNames(): boolean {
    this.record("useCaseSensitiveFileNames");
    const h = this.handlers.get("useCaseSensitiveFileNames");
    if (h === undefined) throw new Error("MockFS.useCaseSensitiveFileNames handler is not configured");
    return Boolean(h());
  }

  realpath(path: string): string {
    this.record("realpath", path);
    const h = this.handlers.get("realpath");
    if (h === undefined) throw new Error("MockFS.realpath handler is not configured");
    return String(h(path));
  }

  remove(path: string): void {
    this.record("remove", path);
    const h = this.handlers.get("remove");
    if (h === undefined) throw new Error("MockFS.remove handler is not configured");
    h(path);
  }

  walkDir(path: string, walkFn: WalkDirFunc): void {
    this.record("walkDir", path, walkFn);
    const h = this.handlers.get("walkDir");
    if (h === undefined) throw new Error("MockFS.walkDir handler is not configured");
    h(path, walkFn);
  }

  getAccessibleEntries(path: string): { files: readonly string[]; directories: readonly string[] } {
    this.record("getAccessibleEntries", path);
    const h = this.handlers.get("getAccessibleEntries");
    if (h === undefined) throw new Error("MockFS.getAccessibleEntries handler is not configured");
    return h(path) as { files: readonly string[]; directories: readonly string[] };
  }

  stat(path: string): FileInfo | undefined {
    this.record("stat", path);
    const h = this.handlers.get("stat");
    if (h === undefined) throw new Error("MockFS.stat handler is not configured");
    return h(path) as FileInfo | undefined;
  }

  private record(methodName: string, ...args: readonly unknown[]): void {
    const current = this.calls.get(methodName) ?? [];
    this.calls.set(methodName, [...current, [...args]]);
  }
}

export function newMockFS(): MockFS {
  return new MockFS();
}
