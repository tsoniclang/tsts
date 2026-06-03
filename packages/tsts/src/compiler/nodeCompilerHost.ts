/**
 * Real-disk host adapters for the canonical compiler pipeline.
 *
 * These are thin pass-throughs over the singleton OS filesystem
 * (`vfs/osvfs/osvfs.ts` `fs()`); they contain no resolution logic of
 * their own. Two adapters are provided because the two consumer
 * interfaces disagree on one member's shape:
 *
 *   - `CompilerHost` (compiler/program.ts) exposes
 *     `useCaseSensitiveFileNames()` as a METHOD.
 *   - `ParseConfigHost` (tsoptions/tsconfigParsing.ts) exposes
 *     `useCaseSensitiveFileNames` as a boolean PROPERTY.
 *
 * A single object cannot satisfy both, so we expose one factory per
 * interface over the same backing `FS`. `getCurrentDirectory()` /
 * `currentDirectory` resolve to `process.cwd()`.
 *
 * The `ParseConfigHost` adapter routes directory discovery through
 * `vfsmatch.readDirectory` by handing the canonical config parser the
 * backing `FS` via its optional `fs` field, rather than re-implementing
 * `readDirectory` here.
 */

import { fs } from "../vfs/osvfs/osvfs.js";
import type { FS } from "../vfs/vfs.js";
import type { ParseConfigHost } from "../tsoptions/tsconfigParsing.js";
import type { CompilerHost } from "./program.js";

/**
 * Build a `CompilerHost` backed by the real disk. Used to construct a
 * `Program` via `newProgram`.
 */
export function newNodeCompilerHost(backingFs: FS = fs()): CompilerHost {
  return {
    fileExists: (path) => backingFs.fileExists(path),
    readFile: (path) => backingFs.readFile(path),
    writeFile: (path, data) => backingFs.writeFile(path, data),
    directoryExists: (path) => backingFs.directoryExists(path),
    getAccessibleEntries: (path) => backingFs.getAccessibleEntries(path),
    realpath: (path) => backingFs.realpath(path),
    getCurrentDirectory: () => process.cwd(),
    useCaseSensitiveFileNames: () => backingFs.useCaseSensitiveFileNames(),
  };
}

/**
 * Build a `ParseConfigHost` backed by the real disk. Used to parse a
 * `tsconfig.json` via `getParsedCommandLineOfConfigFile`. Directory
 * discovery is delegated to `vfsmatch.readDirectory` through the `fs`
 * field; `useCaseSensitiveFileNames` is a property here (not a method).
 */
export function newNodeParseConfigHost(backingFs: FS = fs()): ParseConfigHost {
  return {
    useCaseSensitiveFileNames: backingFs.useCaseSensitiveFileNames(),
    fileExists: (path) => backingFs.fileExists(path),
    readFile: (path) => backingFs.readFile(path),
    fs: backingFs,
    currentDirectory: process.cwd(),
  };
}
