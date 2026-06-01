/**
 * Language-service host contract.
 *
 * Port of TS-Go `internal/ls/host.go`.
 */

import type { Registry as AutoImportRegistry } from "./autoimport/registry.js";
import type { Converters } from "./lsconv/converters.js";
import type { UserPreferences } from "./lsutil/userpreferences.js";

export interface ECMALineInfo {
  readonly lineStarts: readonly number[];
}

export interface Host {
  useCaseSensitiveFileNames(): boolean;
  readFile(path: string): { readonly contents: string; readonly ok: boolean };
  converters(): Converters;
  getPreferences(activeFile: string): UserPreferences;
  getECMALineInfo(fileName: string): ECMALineInfo | undefined;
  autoImportRegistry(): AutoImportRegistry;
  readDirectory(currentDir: string, path: string, extensions: readonly string[], excludes: readonly string[], includes: readonly string[], depth: number): readonly string[];
  getDirectories(path: string): readonly string[];
  directoryExists(path: string): boolean;
  fileExists(path: string): boolean;
}
