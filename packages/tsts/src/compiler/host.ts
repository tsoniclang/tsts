/**
 * CompilerHost interface.
 *
 * Port of TS-Go `internal/compiler/host.go` (~89 LoC). The host
 * abstraction the compiler uses for all I/O: file reads, file writes,
 * directory queries, canonical-name conversion.
 */

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
}

export function defaultHostNewLine(): string {
  return "\n";
}

export function getCanonicalFileNameFor(useCaseSensitive: boolean, path: string): string {
  return useCaseSensitive ? path : path.toLowerCase();
}
