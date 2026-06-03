import type { CompilerHost } from "../program/index.js";
import type { Snapshot } from "./snapshot.js";
import type { FileHandle } from "./snapshotFs.js";

export class ProjectCompilerHost implements CompilerHost {
  private snapshot: Snapshot | undefined;
  private readonly outputs = new Map<string, string>();
  private frozen = false;

  constructor(snapshot: Snapshot) {
    this.snapshot = snapshot;
  }

  readFile(fileName: string): string | undefined {
    return this.aliveSnapshot().readFile(fileName);
  }

  writeFile(fileName: string, text: string): void {
    this.outputs.set(fileName, text);
  }

  getCurrentDirectory(): string {
    return this.aliveSnapshot().currentDirectory;
  }

  useCaseSensitiveFileNames(): boolean {
    return this.aliveSnapshot().useCaseSensitiveFileNames();
  }

  readDirectory(rootDir: string, extensions: readonly string[], excludes: readonly string[], includes: readonly string[]): readonly string[] {
    const snapshot = this.aliveSnapshot();
    return snapshot.readDirectory(snapshot.currentDirectory, rootDir, extensions, excludes, includes);
  }

  emittedOutputs(): ReadonlyMap<string, string> {
    return this.outputs;
  }

  freeze(snapshot: Snapshot): void {
    if (this.frozen) throw new Error("ProjectCompilerHost.freeze can only be called once");
    this.snapshot = snapshot;
    this.frozen = true;
  }

  defaultLibraryPath(): string {
    const currentDirectory = this.aliveSnapshot().currentDirectory.replace(/\/+$/u, "");
    return `${currentDirectory}/node_modules/typescript/lib`;
  }

  fs(): Snapshot["fs"] {
    return this.aliveSnapshot().fs;
  }

  getResolvedProjectReference(fileName: string, path: string): unknown {
    const snapshot = this.aliveSnapshot();
    const config = snapshot.configFileRegistry.getConfig(path);
    if (config !== undefined) return config;
    const normalizedPath = snapshot.toPath(fileName);
    return snapshot.configFileRegistry.getConfig(normalizedPath);
  }

  getSourceFile(fileName: string): FileHandle | undefined {
    this.ensureAlive();
    return this.aliveSnapshot().getFile(fileName);
  }

  trace(message: string): void {
    void message;
  }

  // ensureAlive panics if a method is called after the snapshot has been
  // finalized (frozen). Mirrors compilerHost.ensureAlive in TS-Go.
  ensureAlive(): void {
    if (this.snapshot === undefined || this.frozen) {
      throw new Error("method must not be called after snapshot initialization");
    }
  }

  private aliveSnapshot(): Snapshot {
    if (this.snapshot === undefined) throw new Error("ProjectCompilerHost used after disposal");
    return this.snapshot;
  }
}

export function newProjectCompilerHost(snapshot: Snapshot): ProjectCompilerHost {
  return new ProjectCompilerHost(snapshot);
}
