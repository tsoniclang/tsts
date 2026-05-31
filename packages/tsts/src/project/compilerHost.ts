import type { CompilerHost } from "../program/index.js";
import type { Snapshot } from "./snapshot.js";

export class ProjectCompilerHost implements CompilerHost {
  private readonly snapshot: Snapshot;
  private readonly outputs = new Map<string, string>();

  constructor(snapshot: Snapshot) {
    this.snapshot = snapshot;
  }

  readFile(fileName: string): string | undefined {
    return this.snapshot.readFile(fileName);
  }

  writeFile(fileName: string, text: string): void {
    this.outputs.set(fileName, text);
  }

  getCurrentDirectory(): string {
    return this.snapshot.currentDirectory;
  }

  useCaseSensitiveFileNames(): boolean {
    return this.snapshot.useCaseSensitiveFileNames();
  }

  readDirectory(rootDir: string, extensions: readonly string[], excludes: readonly string[], includes: readonly string[]): readonly string[] {
    return this.snapshot.readDirectory(this.snapshot.currentDirectory, rootDir, extensions, excludes, includes);
  }

  emittedOutputs(): ReadonlyMap<string, string> {
    return this.outputs;
  }
}

export function newProjectCompilerHost(snapshot: Snapshot): ProjectCompilerHost {
  return new ProjectCompilerHost(snapshot);
}
