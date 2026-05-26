/**
 * Utility helpers for specifier generation.
 *
 * Port of TS-Go `internal/modulespecifiers/util.go`. Many helpers depend
 * on `tspath` functions whose names in TSTS may differ slightly; the
 * port uses the upstream names verbatim. See TSTS `tspath/index.ts` for
 * what's currently exported.
 */

import type { SourceFile, StringLiteralLike } from "../ast/index.js";

import { countPathComponents } from "./compare.js";
import {
  type ModulePath,
  type ModuleSpecifierEnding,
  ModuleSpecifierEnding as MSE,
  type ModuleSpecifierGenerationHost,
  type ModuleSpecifierOptions,
  type UserPreferences,
} from "./types.js";

// Re-export so callers don't need to know about compare.ts.
export { countPathComponents };

/**
 * Regex pattern cache. Mirrors TS-Go's `regexPatternCache` (a
 * `sync.Map`-backed memoization keyed on pattern + case-sensitivity).
 */
const regexPatternCache = new Map<string, RegExp | null>();
const REGEX_CACHE_MAX = 1000;

interface RegexCacheKey {
  readonly pattern: string;
  readonly caseInsensitive: boolean;
}

function cacheKeyOf(k: RegexCacheKey): string {
  return (k.caseInsensitive ? "i:" : "s:") + k.pattern;
}

/**
 * Compares two `ModulePath`s, preferring non-redirects and falling back
 * to path comparison. Mirrors TS-Go `comparePathsByRedirect`.
 */
export function comparePathsByRedirect(
  a: ModulePath,
  b: ModulePath,
  useCaseSensitiveFileNames: boolean,
  comparePathsFn: (a: string, b: string, useCaseSensitive: boolean) => number,
): number {
  if (a.isRedirect === b.isRedirect) {
    return comparePathsFn(a.fileName, b.fileName, useCaseSensitiveFileNames);
  }
  return a.isRedirect ? 1 : -1;
}

/**
 * Returns true if the path is a bare module specifier (neither absolute
 * nor relative). Mirrors TS-Go `PathIsBareSpecifier`.
 */
export function pathIsBareSpecifier(
  path: string,
  pathIsAbsoluteFn: (p: string) => boolean,
  pathIsRelativeFn: (p: string) => boolean,
): boolean {
  return !pathIsAbsoluteFn(path) && !pathIsRelativeFn(path);
}

/**
 * Returns true if `moduleSpecifier` matches any of `excludes` (string
 * regex patterns, possibly with `/.../flags` form). Mirrors TS-Go
 * `IsExcludedByRegex`.
 */
export function isExcludedByRegex(moduleSpecifier: string, excludes: readonly string[]): boolean {
  for (const pattern of excludes) {
    const re = stringToRegex(pattern);
    if (re === null) continue;
    if (re.test(moduleSpecifier)) return true;
  }
  return false;
}

/**
 * Parses a possibly-wrapped regex pattern (e.g. `/foo/i`) into a
 * `RegExp`. Returns null on compile failure. Mirrors TS-Go
 * `stringToRegex` with the same caching behavior.
 */
export function stringToRegex(pattern: string): RegExp | null {
  let caseInsensitive = false;
  let body = pattern;

  if (pattern.length > 2 && pattern[0] === "/") {
    const lastSlash = pattern.lastIndexOf("/");
    if (lastSlash > 0) {
      let hasUnescapedMiddleSlash = false;
      for (let i = 1; i < lastSlash; i += 1) {
        if (pattern[i] === "/" && pattern[i - 1] !== "\\") {
          hasUnescapedMiddleSlash = true;
          break;
        }
      }
      if (!hasUnescapedMiddleSlash) {
        const flags = pattern.slice(lastSlash + 1);
        body = pattern.slice(1, lastSlash);
        for (const flag of flags) {
          if (flag === "i") caseInsensitive = true;
        }
      }
    }
  }

  const key = cacheKeyOf({ pattern: body, caseInsensitive });
  const cached = regexPatternCache.get(key);
  if (cached !== undefined) return cached;

  if (regexPatternCache.size > REGEX_CACHE_MAX) {
    regexPatternCache.clear();
  }

  try {
    const compiled = new RegExp(body, caseInsensitive ? "i" : "");
    regexPatternCache.set(key, compiled);
    return compiled;
  } catch {
    regexPatternCache.set(key, null);
    return null;
  }
}

/**
 * Ensures a path is either absolute (prefixed with `/` or `c:`) or
 * dot-relative (prefixed with `./` or `../`) so as not to be confused
 * with a bare module name. Mirrors TS-Go `ensurePathIsNonModuleName`.
 */
export function ensurePathIsNonModuleName(
  path: string,
  pathIsAbsoluteFn: (p: string) => boolean,
  pathIsRelativeFn: (p: string) => boolean,
): string {
  if (pathIsBareSpecifier(path, pathIsAbsoluteFn, pathIsRelativeFn)) {
    return "./" + path;
  }
  return path;
}

/**
 * Returns the JS extension corresponding to a declaration-file
 * extension: `.d.ts → .js`, `.d.mts → .mjs`, `.d.cts → .cjs`. For
 * declaration files with embedded asset extensions (e.g. `.d.json.ts`),
 * returns the embedded extension.
 *
 * Mirrors TS-Go `GetJSExtensionForDeclarationFileExtension`.
 */
export function getJSExtensionForDeclarationFileExtension(ext: string): string {
  switch (ext) {
    case ".d.ts":
      return ".js";
    case ".d.mts":
      return ".mjs";
    case ".d.cts":
      return ".cjs";
    default:
      // `.d.json.ts` → `.json`, etc.
      return ext.slice(".d".length, ext.length - ".ts".length);
  }
}

/**
 * Remaps a declaration-asset filename like `foo.d.json.ts` back to its
 * underlying non-JS asset name (`foo.json`). Returns the empty string
 * if the input is a regular `.d.ts` file.
 *
 * Mirrors TS-Go `TryGetRealFileNameForNonJSDeclarationFileName`.
 */
export function tryGetRealFileNameForNonJSDeclarationFileName(
  fileName: string,
  getBaseFileNameFn: (p: string) => string,
  removeExtensionFn: (p: string, ext: string) => string,
): string {
  const baseName = getBaseFileNameFn(fileName);
  if (!fileName.endsWith(".ts") || !baseName.includes(".d.") || baseName.endsWith(".d.ts")) {
    return "";
  }
  const noExtension = removeExtensionFn(fileName, ".ts");
  const lastDotIndex = noExtension.lastIndexOf(".");
  const ext = noExtension.slice(lastDotIndex);
  const cutIndex = noExtension.indexOf(".d.");
  const before = cutIndex === -1 ? noExtension : noExtension.slice(0, cutIndex);
  return before + ext;
}

/**
 * Identifies whether the candidate ending list prefers the `.ts`
 * extension over `.js`. Mirrors TS-Go `prefersTsExtension`.
 */
export function prefersTsExtension(allowedEndings: readonly ModuleSpecifierEnding[]): boolean {
  const jsPriority = allowedEndings.indexOf(MSE.JsExtension);
  const tsPriority = allowedEndings.indexOf(MSE.TsExtension);
  if (tsPriority > -1) {
    if (jsPriority === -1) return true;
    return tsPriority < jsPriority;
  }
  return false;
}

/**
 * Replaces the first `*` in a pattern with `replacement`. Used for
 * `paths`/`exports` field wildcard substitution. Mirrors TS-Go
 * `replaceFirstStar`.
 */
export function replaceFirstStar(s: string, replacement: string): string {
  const index = s.indexOf("*");
  if (index === -1) return s;
  return s.slice(0, index) + replacement + s.slice(index + 1);
}

/**
 * Index of a path within node_modules; supports nested
 * `node_modules/@scope/pkg/node_modules/...` shapes.
 *
 * Mirrors TS-Go `NodeModulePathParts`.
 */
export interface NodeModulePathParts {
  readonly topLevelNodeModulesIndex: number;
  readonly topLevelPackageNameIndex: number;
  readonly packageRootIndex: number;
  readonly fileNameIndex: number;
}

type NodeModulesPathParseState =
  | "before-node-modules"
  | "node-modules"
  | "scope"
  | "package-content";

/**
 * Parses a `node_modules` path into its constituent indices. Returns
 * `undefined` if the path is not inside `node_modules`. Mirrors TS-Go
 * `GetNodeModulePathParts`.
 *
 * Pattern: `/base/path/node_modules/[@scope/pkg/node_modules/]pkg/[sub/]file.js`
 */
export function getNodeModulePathParts(fullPath: string): NodeModulePathParts | undefined {
  let topLevelNodeModulesIndex = 0;
  let topLevelPackageNameIndex = 0;
  let packageRootIndex = 0;

  let partStart = 0;
  let partEnd = 0;
  let state: NodeModulesPathParseState = "before-node-modules";

  while (partEnd >= 0) {
    partStart = partEnd;
    partEnd = fullPath.indexOf("/", partStart + 1);
    switch (state) {
      case "before-node-modules": {
        if (fullPath.slice(partStart).startsWith("/node_modules/")) {
          topLevelNodeModulesIndex = partStart;
          topLevelPackageNameIndex = partEnd;
          state = "node-modules";
        }
        break;
      }
      case "node-modules":
      case "scope": {
        if (state === "node-modules" && fullPath[partStart + 1] === "@") {
          state = "scope";
        } else {
          packageRootIndex = partEnd;
          state = "package-content";
        }
        break;
      }
      case "package-content": {
        if (fullPath.slice(partStart).startsWith("/node_modules/")) {
          state = "node-modules";
        }
        break;
      }
    }
  }

  const fileNameIndex = partStart;

  if (state !== "before-node-modules" && state !== "node-modules") {
    return {
      topLevelNodeModulesIndex,
      topLevelPackageNameIndex,
      packageRootIndex,
      fileNameIndex,
    };
  }
  return undefined;
}

/**
 * Extracts the package name from a path under `node_modules`. Handles
 * scoped packages (`@scope/pkg`). Returns the empty string if the path
 * is not under `node_modules`.
 *
 * Mirrors TS-Go `GetPackageNameFromDirectory`.
 */
export function getPackageNameFromDirectory(fileOrDirectoryPath: string): string {
  const idx = fileOrDirectoryPath.lastIndexOf("/node_modules/");
  if (idx === -1) return "";

  const basename = fileOrDirectoryPath.slice(idx + "/node_modules/".length);
  if (basename[0] === ".") return "";

  const nextSlash = basename.indexOf("/");
  if (nextSlash === -1) return basename;

  if (basename[0] !== "@" || nextSlash === basename.length - 1) {
    return basename.slice(0, nextSlash);
  }

  const secondSlash = basename.indexOf("/", nextSlash + 1);
  if (secondSlash === -1) return basename;

  return basename.slice(0, secondSlash);
}

/**
 * Returns true if `path` starts with `..` (i.e. escapes the parent
 * directory). Mirrors TS-Go `isPathRelativeToParent`.
 */
export function isPathRelativeToParent(path: string): boolean {
  return path.startsWith("..");
}

/**
 * Returns true if two paths are equal under the given comparison
 * options. Mirrors TS-Go `packageJsonPathsAreEqual`.
 */
export function packageJsonPathsAreEqual(
  a: string,
  b: string,
  comparePathsFn: (a: string, b: string) => number,
): boolean {
  if (a === b) return true;
  if (a.length === 0 || b.length === 0) return false;
  return comparePathsFn(a, b) === 0;
}

/**
 * For each root, returns the path-relative form if the file is inside
 * that root and not in an ancestor. Mirrors TS-Go
 * `getPathsRelativeToRootDirs`.
 */
export function getPathsRelativeToRootDirs(
  path: string,
  rootDirs: readonly string[],
  useCaseSensitiveFileNames: boolean,
  getRelativeFn: (root: string, p: string, useCaseSensitive: boolean) => string,
  isRootedFn: (p: string) => boolean,
): readonly string[] {
  const results: string[] = [];
  for (const rootDir of rootDirs) {
    const relativePath = getRelativeIfInSameVolume(path, rootDir, useCaseSensitiveFileNames, getRelativeFn, isRootedFn);
    if (relativePath !== "" && !isPathRelativeToParent(relativePath)) {
      results.push(relativePath);
    }
  }
  return results;
}

function getRelativeIfInSameVolume(
  path: string,
  directoryPath: string,
  useCaseSensitiveFileNames: boolean,
  getRelativeFn: (root: string, p: string, useCaseSensitive: boolean) => string,
  isRootedFn: (p: string) => boolean,
): string {
  const relativePath = getRelativeFn(directoryPath, path, useCaseSensitiveFileNames);
  if (isRootedFn(relativePath)) return "";
  return relativePath;
}

// ---------------------------------------------------------------------------
// Forward-declarations for cross-module callers that this file references
// indirectly via the specifier-generation pipeline. The implementations
// arrive when the corresponding TS-Go subsystems land in TSTS.
// ---------------------------------------------------------------------------

/**
 * Forward declaration: `module.ResolvedEntrypoint` shape, used by
 * `ProcessEntrypointEnding` (see specifiers.ts). The full shape lands
 * with the `module` port; this captures the surface needed here.
 */
export interface ResolvedEntrypoint {
  readonly moduleSpecifier: string;
  readonly ending: "fixed" | "changeable" | "extension-changeable";
}

/**
 * Forward declaration: minimal source-file shape passed to entry-point
 * processing. The full shape is the AST `SourceFile`; this captures
 * only the surface needed here.
 */
export type EntrypointSourceFile = SourceFile;

/**
 * Forward declaration: an `import "..."` literal that the generator
 * inspects to infer extension preferences.
 */
export type EntrypointSpecifier = StringLiteralLike;

/**
 * Forward declaration: parametrize ProcessEntrypointEnding etc. with
 * `host`, `preferences`, `options` parameters that satisfy the broader
 * generator contract.
 */
export type GenerationContext = {
  readonly host: ModuleSpecifierGenerationHost;
  readonly preferences: UserPreferences;
  readonly options: ModuleSpecifierOptions;
};
