/**
 * Bundled `lib.d.ts` access.
 *
 * Port of TS-Go `internal/bundled/bundled.go` + `embed.go`/`noembed.go`.
 *
 * TS-Go has two modes:
 *   - **embedded** (default): lib files are embedded into the binary via
 *     Go's `//go:embed`. Compiler code accesses them through a
 *     `bundled:///` URL scheme that the wrapped FS knows how to resolve.
 *   - **noembed**: lib files live on disk next to the executable, and
 *     `WrapFS` returns the underlying FS unmodified.
 *
 * TSTS targets .NET/NativeAOT, so the natural analogue of `//go:embed` is
 * a build-time embedding into the .NET assembly. Until that pipeline
 * lands, this module exposes the noembed-equivalent surface: `LibPath`
 * resolves to an on-disk path, and `wrapFS` is a passthrough.
 */

import { dirname, join } from "node:path";

import type { FS } from "../vfs/index.js";

import { LibNames } from "./lib-names.js";

/**
 * True if bundled files come from an embedded FS. When false, `LibPath`
 * returns a real on-disk path.
 *
 * TS-Go embeds via `//go:embed` by default; TSTS will eventually embed
 * via the .NET resource pipeline. For now, mirrors TS-Go's `noembed`
 * build tag (default false until embedding is implemented).
 */
export const Embedded: boolean = false;

/**
 * Path scheme used by the embedded virtual filesystem when `Embedded`
 * is true. Mirrors TS-Go's `scheme = "bundled:///"`.
 */
export const Scheme = "bundled:///";

/**
 * Splits a bundled-scheme path into the rest after the scheme. Returns
 * `{ rest: "", ok: false }` if the path is not bundled-scheme.
 *
 * Mirrors TS-Go `splitPath`.
 */
export function splitPath(path: string): { readonly rest: string; readonly ok: boolean } {
  if (path.startsWith(Scheme)) {
    return { rest: path.slice(Scheme.length), ok: true };
  }
  return { rest: "", ok: false };
}

/**
 * Returns true if the given path uses the bundled-scheme.
 *
 * Mirrors TS-Go `IsBundled`.
 */
export function isBundled(path: string): boolean {
  return path.startsWith(Scheme);
}

/**
 * Returns the path to the directory containing bundled lib.d.ts files.
 * If embedding is enabled, returns the bundled-scheme URL. Otherwise,
 * returns the on-disk path next to the executable.
 *
 * Mirrors TS-Go `LibPath()`.
 */
export function libPath(): string {
  if (Embedded) {
    return Scheme + "libs";
  }
  return executableLibsDir();
}

/**
 * Wraps an FS so paths under the bundled scheme resolve to embedded
 * files. If embedding is disabled, returns the underlying FS unchanged.
 *
 * Mirrors TS-Go `WrapFS`.
 */
export function wrapFS(fs: FS): FS {
  if (!Embedded) return fs;
  // Embedded path: when the .NET resource pipeline lands, this will
  // return an overlay FS that intercepts paths starting with `Scheme`.
  // For now, the parameter validates the contract and we fall back to
  // the noembed behavior.
  return fs;
}

/**
 * Returns the on-disk directory containing the bundled lib files,
 * computed from `process.argv[1]` (the entry script). This mirrors
 * TS-Go's `executableDir()` which uses `os.Executable()` + Realpath.
 *
 * On TSTS in dev mode, lib files live at `packages/tsts/src/bundled/libs/`.
 * In a packaged build, they live next to the entry script.
 */
let cachedExecutableLibsDir: string | undefined;
function executableLibsDir(): string {
  if (cachedExecutableLibsDir !== undefined) return cachedExecutableLibsDir;
  const exe = process.argv[1];
  if (exe === undefined || exe === "") {
    throw new Error("bundled: could not determine executable path");
  }
  cachedExecutableLibsDir = join(dirname(exe), "libs");
  return cachedExecutableLibsDir;
}

/**
 * Returns the path to the source-tree bundled libs directory. Only valid
 * to call during tests, where the source code is available on disk.
 *
 * Mirrors TS-Go `TestingLibPath()`.
 */
let cachedTestingLibPath: string | undefined;
export function testingLibPath(): string {
  if (cachedTestingLibPath !== undefined) return cachedTestingLibPath;
  // Resolve via this module's URL (the moral equivalent of
  // `runtime.Caller(0)` returning the package source file).
  const here = new URL("./libs", import.meta.url);
  cachedTestingLibPath = here.pathname.replace(/\\/g, "/");
  return cachedTestingLibPath;
}

export { LibNames };
