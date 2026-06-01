/**
 * CompilerHost interface.
 *
 * Port of TS-Go `internal/compiler/host.go` (~89 LoC). The host
 * abstraction the compiler uses for all I/O: file reads, file writes,
 * directory queries, canonical-name conversion.
 */

import type { SourceFile } from "../ast/index.js";
import { parseSourceFile } from "../parser/parser.js";
import { getNormalizedAbsolutePath } from "../tspath/index.js";

export interface CompilerHost {
  fileExists(path: string): boolean;
  readFile(path: string): { content: string; ok: boolean };
  writeFile(path: string, data: string, writeByteOrderMark: boolean): boolean;
  getCurrentDirectory(): string;
  useCaseSensitiveFileNames(): boolean;
  getDefaultLibFileName(): string;
  getCanonicalFileName(path: string): string;
  getNewLine(): string;
  realpath(path: string): string;
  directoryExists(path: string): boolean;
  getDirectories(path: string): readonly string[];
  defaultLibraryPath?(): string;
  trace?(message: string, ...args: readonly unknown[]): void;
  getSourceFile?(opts: SourceFileParseOptions): SourceFile | undefined;
  getResolvedProjectReference?(fileName: string, path: string): unknown;
}

export interface SourceFileParseOptions {
  readonly fileName: string;
  readonly scriptKind?: number;
  readonly languageVersion?: number;
}

export interface CompilerHostFileSystem {
  fileExists(path: string): boolean;
  readFile(path: string): string | undefined;
  writeFile(path: string, data: string): void;
  directoryExists(path: string): boolean;
  getDirectories(path: string): readonly string[];
  realpath(path: string): string;
  useCaseSensitiveFileNames(): boolean;
}

export class DefaultCompilerHost implements CompilerHost {
  private readonly currentDirectory: string;
  private readonly fs: CompilerHostFileSystem;
  private readonly libraryPath: string;
  private readonly traceCallback: (message: string, ...args: readonly unknown[]) => void;

  constructor(
    currentDirectory: string,
    fs: CompilerHostFileSystem,
    defaultLibraryPath: string,
    trace?: (message: string, ...args: readonly unknown[]) => void,
  ) {
    this.currentDirectory = currentDirectory;
    this.fs = fs;
    this.libraryPath = defaultLibraryPath;
    this.traceCallback = trace ?? (() => undefined);
  }

  fileExists(path: string): boolean { return this.fs.fileExists(path); }
  readFile(path: string): { content: string; ok: boolean } {
    const content = this.fs.readFile(path);
    return content === undefined ? { content: "", ok: false } : { content, ok: true };
  }
  writeFile(path: string, data: string, _writeByteOrderMark: boolean): boolean {
    this.fs.writeFile(path, data);
    return true;
  }
  getCurrentDirectory(): string { return this.currentDirectory; }
  useCaseSensitiveFileNames(): boolean { return this.fs.useCaseSensitiveFileNames(); }
  getDefaultLibFileName(): string { return "lib.d.ts"; }
  defaultLibraryPath(): string { return this.libraryPath; }
  getCanonicalFileName(path: string): string { return getCanonicalFileNameFor(this.useCaseSensitiveFileNames(), path); }
  getNewLine(): string { return defaultHostNewLine(); }
  realpath(path: string): string { return this.fs.realpath(path); }
  directoryExists(path: string): boolean { return this.fs.directoryExists(path); }
  getDirectories(path: string): readonly string[] { return this.fs.getDirectories(path); }
  trace(message: string, ...args: readonly unknown[]): void { this.traceCallback(message, ...args); }
  getSourceFile(opts: SourceFileParseOptions): SourceFile | undefined {
    const read = this.readFile(opts.fileName);
    if (!read.ok) return undefined;
    return parseSourceFile(read.content, { fileName: opts.fileName });
  }
  getResolvedProjectReference(_fileName: string, _path: string): unknown {
    return undefined;
  }
}

export function defaultHostNewLine(): string {
  return "\n";
}

export function getCanonicalFileNameFor(useCaseSensitive: boolean, path: string): string {
  return useCaseSensitive ? path : path.toLowerCase();
}

export function newCompilerHost(
  currentDirectory: string,
  fs: CompilerHostFileSystem,
  defaultLibraryPath: string,
  trace?: (message: string, ...args: readonly unknown[]) => void,
): CompilerHost {
  return new DefaultCompilerHost(getNormalizedAbsolutePath(currentDirectory, currentDirectory), fs, defaultLibraryPath, trace);
}

export function newCachedFSCompilerHost(
  currentDirectory: string,
  fs: CompilerHostFileSystem,
  defaultLibraryPath: string,
  trace?: (message: string, ...args: readonly unknown[]) => void,
): CompilerHost {
  return newCompilerHost(currentDirectory, fs, defaultLibraryPath, trace);
}
