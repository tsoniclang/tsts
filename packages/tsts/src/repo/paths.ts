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
let cachedTypeScriptSubmodulePath: string | undefined;
let cachedTestDataPath: string | undefined;
let cachedTypeScriptSubmoduleExists: boolean | undefined;

export interface SkippableTest {
  helper(): void;
  skipf(format: string, ...args: readonly unknown[]): void;
}

export function rootPath(): string {
  cachedRootPath ??= findRepoRoot(dirname(fileURLToPath(import.meta.url)));
  return cachedRootPath;
}

export function typeScriptSubmodulePath(): string {
  cachedTypeScriptSubmodulePath ??= join(rootPath(), "_submodules", "TypeScript");
  return cachedTypeScriptSubmodulePath;
}

export function testDataPath(): string {
  cachedTestDataPath ??= join(rootPath(), "testdata");
  return cachedTestDataPath;
}

export function typeScriptSubmoduleExists(): boolean {
  cachedTypeScriptSubmoduleExists ??= existsSync(join(typeScriptSubmodulePath(), "package.json"));
  return cachedTypeScriptSubmoduleExists;
}

export function skipIfNoTypeScriptSubmodule(test: SkippableTest): void {
  test.helper();
  if (!typeScriptSubmoduleExists()) test.skipf("TypeScript submodule does not exist");
}

export function resetRepoPathCacheForTests(): void {
  cachedRootPath = undefined;
  cachedTypeScriptSubmodulePath = undefined;
  cachedTestDataPath = undefined;
  cachedTypeScriptSubmoduleExists = undefined;
}

export function repoPathCacheSnapshot(): {
  readonly rootPath?: string;
  readonly typeScriptSubmodulePath?: string;
  readonly testDataPath?: string;
  readonly typeScriptSubmoduleExists?: boolean;
} {
  return {
    ...(cachedRootPath === undefined ? {} : { rootPath: cachedRootPath }),
    ...(cachedTypeScriptSubmodulePath === undefined ? {} : { typeScriptSubmodulePath: cachedTypeScriptSubmodulePath }),
    ...(cachedTestDataPath === undefined ? {} : { testDataPath: cachedTestDataPath }),
    ...(cachedTypeScriptSubmoduleExists === undefined ? {} : { typeScriptSubmoduleExists: cachedTypeScriptSubmoduleExists }),
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
