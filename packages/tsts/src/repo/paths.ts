/**
 * Repository path helpers.
 *
 * Port of TS-Go `internal/repo/paths.go`. The root discovery is adapted from
 * Go's `go.mod` walk to the TSTS workspace marker while keeping the same
 * cached path API.
 */

import { existsSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

let cachedRootPath: string | undefined;
let cachedPackageRootPath: string | undefined;
let cachedTypeScriptSubmodulePath: string | undefined;
let cachedTestDataPath: string | undefined;
let cachedTypeScriptSubmoduleExists: boolean | undefined;
let cachedTsgoTestdataRoot: string | undefined;
let cachedTsgoReferenceRoot: string | undefined;
let cachedTsgoCorpusExists: boolean | undefined;

export interface SkippableTest {
  helper(): void;
  skipf(format: string, ...args: readonly unknown[]): void;
}

export function rootPath(): string {
  cachedRootPath ??= findRepoRoot(dirname(fileURLToPath(import.meta.url)));
  return cachedRootPath;
}

/**
 * Root of the `@tsonic/tsts` package (`<workspace>/packages/tsts`). The corpus
 * and vendored testdata live under this package, not the workspace root, which
 * mirrors TS-Go where the module root and repo root coincide. `rootPath()`
 * stays the workspace root because baseline path-prefix stripping is anchored
 * there.
 */
export function packageRootPath(): string {
  cachedPackageRootPath ??= join(rootPath(), "packages", "tsts");
  return cachedPackageRootPath;
}

export function typeScriptSubmodulePath(): string {
  cachedTypeScriptSubmodulePath ??= join(packageRootPath(), "_submodules", "TypeScript");
  return cachedTypeScriptSubmodulePath;
}

export function testDataPath(): string {
  cachedTestDataPath ??= join(packageRootPath(), "testdata");
  return cachedTestDataPath;
}

export function typeScriptSubmoduleExists(): boolean {
  cachedTypeScriptSubmoduleExists ??= existsSync(join(typeScriptSubmodulePath(), "package.json"));
  return cachedTypeScriptSubmoduleExists;
}

/**
 * Root of the TS-Go conformance corpus. Resolved from `TSGO_TESTDATA_ROOT`
 * when set, otherwise the repo-relative default. No absolute machine path is
 * baked into source.
 */
export function tsgoTestdataRoot(): string {
  cachedTsgoTestdataRoot ??=
    process.env.TSGO_TESTDATA_ROOT ?? join(packageRootPath(), "_submodules", "typescript-go", "testdata");
  return cachedTsgoTestdataRoot;
}

/** Root of the TS-Go reference baseline tree (`<corpus>/baselines/reference`). */
export function tsgoReferenceRoot(): string {
  cachedTsgoReferenceRoot ??= join(tsgoTestdataRoot(), "baselines", "reference");
  return cachedTsgoReferenceRoot;
}

/** True when the TS-Go corpus is present (i.e. `<corpus>/tests/cases` exists). */
export function tsgoCorpusExists(): boolean {
  cachedTsgoCorpusExists ??= existsSync(join(tsgoTestdataRoot(), "tests", "cases"));
  return cachedTsgoCorpusExists;
}

/** Throw a clear, actionable error when the TS-Go corpus is missing. */
export function requireTsgoCorpus(): void {
  if (!tsgoCorpusExists()) {
    throw new Error(
      "TS-Go test corpus not found. Set TSGO_TESTDATA_ROOT or bootstrap _submodules/typescript-go.",
    );
  }
}

export function skipIfNoTypeScriptSubmodule(test: SkippableTest): void {
  test.helper();
  if (!typeScriptSubmoduleExists()) test.skipf("TypeScript submodule does not exist");
}

export function resetRepoPathCacheForTests(): void {
  cachedRootPath = undefined;
  cachedPackageRootPath = undefined;
  cachedTypeScriptSubmodulePath = undefined;
  cachedTestDataPath = undefined;
  cachedTypeScriptSubmoduleExists = undefined;
  cachedTsgoTestdataRoot = undefined;
  cachedTsgoReferenceRoot = undefined;
  cachedTsgoCorpusExists = undefined;
}

export function repoPathCacheSnapshot(): {
  readonly rootPath?: string;
  readonly packageRootPath?: string;
  readonly typeScriptSubmodulePath?: string;
  readonly testDataPath?: string;
  readonly typeScriptSubmoduleExists?: boolean;
  readonly tsgoTestdataRoot?: string;
  readonly tsgoReferenceRoot?: string;
  readonly tsgoCorpusExists?: boolean;
} {
  return {
    ...(cachedRootPath === undefined ? {} : { rootPath: cachedRootPath }),
    ...(cachedPackageRootPath === undefined ? {} : { packageRootPath: cachedPackageRootPath }),
    ...(cachedTypeScriptSubmodulePath === undefined ? {} : { typeScriptSubmodulePath: cachedTypeScriptSubmodulePath }),
    ...(cachedTestDataPath === undefined ? {} : { testDataPath: cachedTestDataPath }),
    ...(cachedTypeScriptSubmoduleExists === undefined ? {} : { typeScriptSubmoduleExists: cachedTypeScriptSubmoduleExists }),
    ...(cachedTsgoTestdataRoot === undefined ? {} : { tsgoTestdataRoot: cachedTsgoTestdataRoot }),
    ...(cachedTsgoReferenceRoot === undefined ? {} : { tsgoReferenceRoot: cachedTsgoReferenceRoot }),
    ...(cachedTsgoCorpusExists === undefined ? {} : { tsgoCorpusExists: cachedTsgoCorpusExists }),
  };
}

export function findAncestorContaining(start: string, marker: string): string | undefined {
  let dir = resolve(start);
  for (;;) {
    if (existsSync(join(dir, marker))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return undefined;
    dir = parent;
  }
}

export function requireAncestorContaining(start: string, marker: string): string {
  const found = findAncestorContaining(start, marker);
  if (found === undefined) throw new Error(`could not find ${marker} above ${start}`);
  return found;
}

export function repoRelativePath(...parts: readonly string[]): string {
  return join(rootPath(), ...parts);
}

export function testDataRelativePath(...parts: readonly string[]): string {
  return join(testDataPath(), ...parts);
}

function findRepoRoot(start: string): string {
  let dir = resolve(start);
  for (;;) {
    if (isRepoRoot(dir)) return dir;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error(`could not find package.json above ${start}`);
}

function isRepoRoot(dir: string): boolean {
  const packageJson = join(dir, "package.json");
  if (!existsSync(packageJson)) return false;
  const stat = statSync(packageJson);
  return stat.isFile();
}
