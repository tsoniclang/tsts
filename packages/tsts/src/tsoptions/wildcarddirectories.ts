/**
 * Wildcard-directory analysis used for `include`/`exclude` driven file
 * discovery and for `--watch` mode directory-recursion decisions.
 *
 * Port of TS-Go `internal/tsoptions/wildcarddirectories.go`. Returns
 * a map from directory paths to a recursive flag, reflecting whether
 * each matched directory should be watched recursively.
 *
 * Watch rules (from TS-Go), using `D` for `/`:
 *   D a D b D star star D d  ==>  /a/b watched recursively (wildcard in dir segment)
 *   D a D b D star D d        ==>  /a/b watched recursively
 *   D a D b                   ==>  /a/b watched recursively (implicit-glob folder)
 *   D a D b D star            ==>  /a/b watched directly (wildcard only in file segment)
 *   D a D b D a?z             ==>  /a/b watched directly
 */

import type { ComparePathsOptions } from "../tspath/index.js";

/**
 * Forward-declared tspath helpers. The full implementations live in
 * `tspath/index.ts`; this captures the surface used here.
 */
interface TspathHelpers {
  normalizeSlashes(p: string): string;
  combinePaths(...parts: string[]): string;
  containsPath(parent: string, child: string, opts: ComparePathsOptions): boolean;
  removeTrailingDirectorySeparator(p: string): string;
  readonly directorySeparator: string;
}

/**
 * Forward-declared `vfsmatch` helpers. The glob/spec matcher lands
 * with the `vfs/vfsmatch` port.
 */
interface VfsMatchHelpers {
  newSpecMatcher(specs: readonly string[], cwd: string, usage: "include" | "exclude", caseSensitive: boolean): SpecMatcher | undefined;
  isImplicitGlob(spec: string): boolean;
}

interface SpecMatcher {
  matchString(s: string): boolean;
}

/**
 * Result of `getWildcardDirectoryFromSpec`.
 */
interface WildcardDirectoryMatch {
  readonly key: string;
  readonly path: string;
  readonly recursive: boolean;
}

/**
 * Returns a map from directory paths to a recursive flag. Mirrors
 * TS-Go `getWildcardDirectories`.
 */
export function getWildcardDirectories(
  include: readonly string[],
  exclude: readonly string[],
  comparePathsOptions: ComparePathsOptions,
  tspath: TspathHelpers,
  vfsmatch: VfsMatchHelpers,
): Map<string, boolean> | undefined {
  if (include.length === 0) return undefined;

  const excludeMatcher = vfsmatch.newSpecMatcher(
    exclude,
    comparePathsOptions.currentDirectory,
    "exclude",
    comparePathsOptions.useCaseSensitiveFileNames,
  );

  const wildcardDirectories = new Map<string, boolean>();
  const wildCardKeyToPath = new Map<string, string>();
  const recursiveKeys: string[] = [];

  for (const file of include) {
    const spec = tspath.normalizeSlashes(tspath.combinePaths(comparePathsOptions.currentDirectory, file));
    if (excludeMatcher !== undefined && excludeMatcher.matchString(spec)) continue;

    const match = getWildcardDirectoryFromSpec(spec, comparePathsOptions.useCaseSensitiveFileNames, tspath, vfsmatch);
    if (match !== undefined) {
      const { key, path, recursive } = match;
      const existingPath = wildCardKeyToPath.get(key);
      const existsPath = existingPath !== undefined;
      const existingRecursive = existsPath ? wildcardDirectories.get(existingPath) === true : false;

      if (!existsPath || (!existingRecursive && recursive)) {
        const pathToUse = existsPath ? existingPath : path;
        wildcardDirectories.set(pathToUse, recursive);
        if (!existsPath) {
          wildCardKeyToPath.set(key, path);
        }
        if (recursive) {
          recursiveKeys.push(key);
        }
      }
    }

    // Remove any subpaths under an existing recursively-watched directory.
    for (const path of [...wildcardDirectories.keys()]) {
      for (const recursiveKey of recursiveKeys) {
        const key = toCanonicalKey(path, comparePathsOptions.useCaseSensitiveFileNames);
        if (key !== recursiveKey && tspath.containsPath(recursiveKey, key, comparePathsOptions)) {
          wildcardDirectories.delete(path);
        }
      }
    }
  }

  return wildcardDirectories;
}

function toCanonicalKey(path: string, useCaseSensitiveFileNames: boolean): string {
  return useCaseSensitiveFileNames ? path : path.toLowerCase();
}

/**
 * Decomposes a glob spec into a (path, recursive) match for watching.
 * Mirrors TS-Go `getWildcardDirectoryFromSpec`.
 */
function getWildcardDirectoryFromSpec(
  spec: string,
  useCaseSensitiveFileNames: boolean,
  tspath: TspathHelpers,
  vfsmatch: VfsMatchHelpers,
): WildcardDirectoryMatch | undefined {
  const firstWildcard = indexOfAny(spec, ["*", "?"]);
  if (firstWildcard !== -1) {
    const lastSepBeforeWildcard = spec.slice(0, firstWildcard).lastIndexOf(tspath.directorySeparator);
    if (lastSepBeforeWildcard !== -1) {
      const path = spec.slice(0, lastSepBeforeWildcard);
      const lastDirectorySeparatorIndex = spec.lastIndexOf(tspath.directorySeparator);
      // Recursive if the wildcard appears in a directory segment
      // (i.e. before the final separator, so not just the file segment).
      const recursive = firstWildcard < lastDirectorySeparatorIndex;
      return {
        key: toCanonicalKey(path, useCaseSensitiveFileNames),
        path,
        recursive,
      };
    }
  }

  const lastSepIndex = spec.lastIndexOf(tspath.directorySeparator);
  if (lastSepIndex !== -1) {
    const lastSegment = spec.slice(lastSepIndex + 1);
    if (vfsmatch.isImplicitGlob(lastSegment)) {
      const path = tspath.removeTrailingDirectorySeparator(spec);
      return {
        key: toCanonicalKey(path, useCaseSensitiveFileNames),
        path,
        recursive: true,
      };
    }
  }
  return undefined;
}

/** Returns the first index of any of `chars` in `s`, or -1. */
function indexOfAny(s: string, chars: readonly string[]): number {
  let best = -1;
  for (const ch of chars) {
    const idx = s.indexOf(ch);
    if (idx !== -1 && (best === -1 || idx < best)) best = idx;
  }
  return best;
}
