/**
 * Project-reference .d.ts faking host.
 *
 * Port of TS-Go `internal/compiler/projectreferencedtsfakinghost.go`
 * (~233 LoC). Wraps a CompilerHost to redirect .ts file reads to the
 * corresponding .d.ts when project-reference source-of-output is
 * enabled. Used during incremental builds.
 */

import type { CompilerHost } from "./host.js";
import type { ParsedCommandLine } from "./types.js";

export class ProjectReferenceDTSFakingHost implements CompilerHost {
  readonly underlying: CompilerHost;
  readonly redirects: ReadonlyMap<string, string>;

  constructor(underlying: CompilerHost, redirects: ReadonlyMap<string, string>) {
    this.underlying = underlying;
    this.redirects = redirects;
  }

  fileExists(path: string): boolean { return this.underlying.fileExists(this.redirect(path)); }
  readFile(path: string): { content: string; ok: boolean } { return this.underlying.readFile(this.redirect(path)); }
  writeFile(path: string, data: string, writeByteOrderMark: boolean): boolean {
    return this.underlying.writeFile(path, data, writeByteOrderMark);
  }
  getCurrentDirectory(): string { return this.underlying.getCurrentDirectory(); }
  useCaseSensitiveFileNames(): boolean { return this.underlying.useCaseSensitiveFileNames(); }
  getDefaultLibFileName(): string { return this.underlying.getDefaultLibFileName(); }
  getCanonicalFileName(path: string): string { return this.underlying.getCanonicalFileName(path); }
  getNewLine(): string { return this.underlying.getNewLine(); }
  realpath(path: string): string { return this.underlying.realpath(path); }
  directoryExists(path: string): boolean { return this.underlying.directoryExists(path); }
  getDirectories(path: string): readonly string[] { return this.underlying.getDirectories(path); }

  private redirect(path: string): string {
    return this.redirects.get(path) ?? path;
  }
}

export function newProjectReferenceDTSFakingHost(
  underlying: CompilerHost, projectReferences: readonly ParsedCommandLine[],
): ProjectReferenceDTSFakingHost {
  // Build the redirect map: for each project reference's input files,
  // map the .ts path to its corresponding .d.ts output path. Real
  // computation requires per-reference outDir/declarationDir resolution;
  // here we emit the convention-based mapping (file.ts → file.d.ts).
  const redirects = new Map<string, string>();
  for (const ref of projectReferences) {
    const files = (ref as unknown as { fileNames?: readonly string[] }).fileNames;
    if (files === undefined) continue;
    for (const file of files) {
      if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
        redirects.set(file, file.slice(0, -3) + ".d.ts");
      }
    }
  }
  return new ProjectReferenceDTSFakingHost(underlying, redirects);
}
