/**
 * Utility helpers for specifier generation.
 *
 * Port of TS-Go `internal/modulespecifiers/util.go`. This is a mechanical
 * 1:1 port: same functions, same control flow, same helper decomposition.
 * It imports the real `tspath`/`core` helpers (rather than receiving them
 * as injected parameters) so the call graph matches upstream.
 */

import { indexAfter } from "../core/core.js";
import type { OrderedMap } from "../collections/orderedMap.js";
import {
  comparePaths,
  getBaseFileName,
  getRelativePathToDirectoryOrUrl,
  isExternalModuleNameRelative,
  isRootedDiskPath,
  pathIsAbsolute,
  pathIsRelative,
} from "../tspath/index.js";
import {
  extensionCjs,
  extensionDcts,
  extensionDmts,
  extensionDts,
  extensionJs,
  extensionMjs,
  extensionsNotSupportingExtensionlessResolution,
  extensionTs,
  fileExtensionIsOneOf,
  hasJSFileExtension,
  hasTSFileExtension,
  isDeclarationFileName,
  removeExtension,
  tryGetExtensionFromPath,
} from "../tspath/extension.js";

import { countPathComponents } from "./compare.js";
import {
  type ModulePath,
  type ModuleSpecifierEnding,
  ModuleSpecifierEnding as MSE,
  type ModuleSpecifierGenerationHost,
  type ModuleSpecifierOptions,
  type SourceFileForSpecifierGeneration,
  type UserPreferences,
} from "./types.js";

// Re-export so callers don't need to know about compare.ts.
export { countPathComponents };

/**
 * Cache key for compiled regex patterns. Mirrors TS-Go
 * `regexPatternCacheKey`.
 */
export interface regexPatternCacheKey {
  readonly pattern: string;
  readonly caseInsensitive: boolean;
}

/**
 * Regex pattern cache, mirroring TS-Go's `regexPatternCache`
 * (`map[regexPatternCacheKey]*regexp.Regexp` guarded by
 * `regexPatternCacheMu`). The single-threaded JS runtime needs no mutex,
 * but the cache itself is preserved verbatim.
 */
const regexPatternCacheMu = { lock: false };
const regexPatternCache = new Map<string, RegExp | null>();

function cacheKeyString(key: regexPatternCacheKey): string {
  return (key.caseInsensitive ? "i:" : "s:") + key.pattern;
}

/**
 * Compares two `ModulePath`s, preferring non-redirects and falling back
 * to path comparison. Mirrors TS-Go `comparePathsByRedirect`.
 */
export function comparePathsByRedirect(
  a: ModulePath,
  b: ModulePath,
  useCaseSensitiveFileNames: boolean,
): number {
  if (a.isRedirect === b.isRedirect) {
    return comparePaths(a.fileName, b.fileName, { useCaseSensitiveFileNames, currentDirectory: "" });
  }
  if (a.isRedirect) {
    return 1;
  }
  return -1;
}

/**
 * Returns true if the path is a bare module specifier (neither absolute
 * nor relative). Mirrors TS-Go `PathIsBareSpecifier`.
 */
export function pathIsBareSpecifier(path: string): boolean {
  return !pathIsAbsolute(path) && !pathIsRelative(path);
}

/**
 * Returns true if `moduleSpecifier` matches any of `excludes` (string
 * regex patterns, possibly with `/.../flags` form). Mirrors TS-Go
 * `IsExcludedByRegex`.
 */
export function isExcludedByRegex(moduleSpecifier: string, excludes: readonly string[]): boolean {
  for (const pattern of excludes) {
    const re = stringToRegex(pattern);
    if (re === null) {
      continue;
    }
    if (re.test(moduleSpecifier)) {
      return true;
    }
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

  if (pattern.length > 2 && pattern[0] === "/") {
    const lastSlash = pattern.lastIndexOf("/");
    if (lastSlash > 0) {
      let hasUnescapedMiddleSlash = false;
      for (let i = 1; i < lastSlash; i += 1) {
        if (pattern[i] === "/" && (i === 0 || pattern[i - 1] !== "\\")) {
          hasUnescapedMiddleSlash = true;
          break;
        }
      }

      if (!hasUnescapedMiddleSlash) {
        const flags = pattern.slice(lastSlash + 1);
        pattern = pattern.slice(1, lastSlash);

        for (const flag of flags) {
          switch (flag) {
            case "i":
              caseInsensitive = true;
              break;
          }
        }
      }
    }
  }
  const key: regexPatternCacheKey = { pattern, caseInsensitive };

  regexPatternCacheMu.lock = false;
  const cached = regexPatternCache.get(cacheKeyString(key));
  if (cached !== undefined) {
    return cached;
  }

  regexPatternCacheMu.lock = true;

  if (regexPatternCache.size > 1000) {
    regexPatternCache.clear();
  }

  const compilePattern = caseInsensitive ? "(?i:" + pattern + ")" : pattern;

  try {
    const compiled = new RegExp(jsRegexFromGo(compilePattern, caseInsensitive));
    regexPatternCache.set(cacheKeyString(key), compiled);
    return compiled;
  } catch {
    regexPatternCache.set(cacheKeyString(key), null);
    return null;
  }
}

// Go's regexp uses `(?i:...)` inline case-insensitive groups; JS expresses
// case insensitivity with the `i` flag. Translate the compile string back to
// the JS surface while preserving the cache key shape above.
function jsRegexFromGo(compilePattern: string, caseInsensitive: boolean): RegExp {
  if (caseInsensitive && compilePattern.startsWith("(?i:") && compilePattern.endsWith(")")) {
    return new RegExp(compilePattern.slice("(?i:".length, compilePattern.length - 1), "i");
  }
  return new RegExp(compilePattern);
}

/**
 * Ensures a path is either absolute (prefixed with `/` or `c:`) or
 * dot-relative (prefixed with `./` or `../`) so as not to be confused
 * with an unprefixed module name. Mirrors TS-Go
 * `ensurePathIsNonModuleName`.
 *
 * ```ts
 * ensurePathIsNonModuleName("/path/to/file.ext") === "/path/to/file.ext"
 * ensurePathIsNonModuleName("./path/to/file.ext") === "./path/to/file.ext"
 * ensurePathIsNonModuleName("../path/to/file.ext") === "../path/to/file.ext"
 * ensurePathIsNonModuleName("path/to/file.ext") === "./path/to/file.ext"
 * ```
 */
export function ensurePathIsNonModuleName(path: string): string {
  if (pathIsBareSpecifier(path)) {
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
    case extensionDts:
      return extensionJs;
    case extensionDmts:
      return extensionMjs;
    case extensionDcts:
      return extensionCjs;
    default:
      // .d.json.ts and the like
      return ext.slice(".d".length, ext.length - extensionTs.length);
  }
}

/**
 * Remaps files like `foo.d.json.ts` or `foo.module.d.css.ts` back to
 * their real non-JS names. Mirrors TS-Go
 * `TryGetRealFileNameForNonJSDeclarationFileName`.
 *
 * The `getBaseFileNameFn`/`removeExtensionFn` parameters default to the
 * real `tspath` helpers (which is what the upstream Go body calls); they
 * remain overridable so unit tests can supply minimal stand-ins.
 */
export function tryGetRealFileNameForNonJSDeclarationFileName(
  fileName: string,
  getBaseFileNameFn: (p: string) => string = getBaseFileName,
  removeExtensionFn: (p: string, ext: string) => string = removeExtension,
): string {
  const baseName = getBaseFileNameFn(fileName);
  // Ends with .ts, contains ".d.", and is NOT a standard .d.ts file
  if (
    !fileName.endsWith(extensionTs) ||
    !baseName.includes(".d.") ||
    baseName.endsWith(extensionDts)
  ) {
    return "";
  }
  const noExtension = removeExtensionFn(fileName, extensionTs);
  const lastDotIndex = noExtension.lastIndexOf(".");
  const ext = noExtension.slice(lastDotIndex);
  const cutIndex = noExtension.indexOf(".d.");
  const before = cutIndex === -1 ? noExtension : noExtension.slice(0, cutIndex);
  return before + ext;
}

/**
 * Gets the extension from a path. Path must have a valid extension.
 * Mirrors TS-Go `extensionFromPath`.
 */
export function extensionFromPath(path: string): string {
  const ext = tryGetExtensionFromPath(path);
  if (ext.length === 0) {
    throw new Error("File " + path + " has unknown extension.");
  }
  return ext;
}

/**
 * Identifies whether the candidate ending list prefers the `.ts`
 * extension over `.js`. Mirrors TS-Go `prefersTsExtension`.
 */
export function prefersTsExtension(allowedEndings: readonly ModuleSpecifierEnding[]): boolean {
  const jsPriority = allowedEndings.indexOf(MSE.JsExtension);
  const tsPriority = allowedEndings.indexOf(MSE.TsExtension);
  if (tsPriority > -1) {
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
  return s.replace("*", replacement);
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

/**
 * Parse states for `getNodeModulePathParts`. Mirrors TS-Go
 * `nodeModulesPathParseState` iota constants.
 */
export type nodeModulesPathParseState = 0 | 1 | 2 | 3;
export const nodeModulesPathParseState: {
  readonly BeforeNodeModules: nodeModulesPathParseState;
  readonly NodeModules: nodeModulesPathParseState;
  readonly Scope: nodeModulesPathParseState;
  readonly PackageContent: nodeModulesPathParseState;
} = {
  BeforeNodeModules: 0 as nodeModulesPathParseState,
  NodeModules: 1 as nodeModulesPathParseState,
  Scope: 2 as nodeModulesPathParseState,
  PackageContent: 3 as nodeModulesPathParseState,
};

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
  let fileNameIndex = 0;

  let partStart = 0;
  let partEnd = 0;
  let state: nodeModulesPathParseState = nodeModulesPathParseState.BeforeNodeModules;

  while (partEnd >= 0) {
    partStart = partEnd;
    partEnd = indexAfter(fullPath, "/", partStart + 1);
    switch (state) {
      case nodeModulesPathParseState.BeforeNodeModules:
        if (fullPath.slice(partStart).indexOf("/node_modules/") === 0) {
          topLevelNodeModulesIndex = partStart;
          topLevelPackageNameIndex = partEnd;
          state = nodeModulesPathParseState.NodeModules;
        }
        break;
      case nodeModulesPathParseState.NodeModules:
      case nodeModulesPathParseState.Scope:
        if (state === nodeModulesPathParseState.NodeModules && fullPath[partStart + 1] === "@") {
          state = nodeModulesPathParseState.Scope;
        } else {
          packageRootIndex = partEnd;
          state = nodeModulesPathParseState.PackageContent;
        }
        break;
      case nodeModulesPathParseState.PackageContent:
        if (fullPath.slice(partStart).indexOf("/node_modules/") === 0) {
          state = nodeModulesPathParseState.NodeModules;
        } else {
          state = nodeModulesPathParseState.PackageContent;
        }
        break;
    }
  }

  fileNameIndex = partStart;

  if (state > nodeModulesPathParseState.NodeModules) {
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
 * Public API: returns the bare node-modules package name a file can be
 * imported as, or "" if none. Mirrors TS-Go `GetNodeModulesPackageName`.
 */
export function getNodeModulesPackageName(
  compilerOptions: CompilerOptionsForUtil,
  importingSourceFile: SourceFileForSpecifierGeneration,
  nodeModulesFileName: string,
  host: ModuleSpecifierGenerationHost,
  preferences: UserPreferences,
  options: ModuleSpecifierOptions,
): string {
  const info = getInfo(importingSourceFile.fileName(), host);
  const modulePaths = getAllModulePaths(
    info,
    nodeModulesFileName,
    host,
    compilerOptions,
    preferences,
    options,
    tspathHelpers,
  );
  for (const modulePath of modulePaths) {
    const result = tryGetModuleNameAsNodeModule(
      modulePath,
      info,
      importingSourceFile,
      host,
      compilerOptions,
      preferences,
      true /*packageNameOnly*/,
      options.overrideImportMode,
      tspathHelpers,
    );
    if (result.length > 0) {
      return result;
    }
  }
  return "";
}

/**
 * Returns true when every key of the exports/imports object begins with
 * `.`. Mirrors TS-Go `allKeysStartWithDot`.
 */
export function allKeysStartWithDot(obj: OrderedMap<string, ExportsOrImportsForUtil>): boolean {
  for (const k of obj.keys()) {
    if (!k.startsWith(".")) {
      return false;
    }
  }
  return true;
}

/**
 * Extracts the package name from a path under `node_modules`. Handles
 * scoped packages (`@scope/pkg`). Returns the empty string if the path
 * is not under `node_modules`. Mirrors TS-Go `GetPackageNameFromDirectory`.
 */
export function getPackageNameFromDirectory(fileOrDirectoryPath: string): string {
  const idx = fileOrDirectoryPath.lastIndexOf("/node_modules/");
  if (idx === -1) {
    return "";
  }

  const basename = fileOrDirectoryPath.slice(idx + "/node_modules/".length);
  if (basename[0] === ".") {
    return "";
  }

  const nextSlash = basename.indexOf("/");
  if (nextSlash === -1) {
    return basename;
  }

  if (basename[0] !== "@" || nextSlash === basename.length - 1) {
    return basename.slice(0, nextSlash);
  }

  const secondSlash = basename.slice(nextSlash + 1).indexOf("/");
  if (secondSlash === -1) {
    return basename;
  }

  return basename.slice(0, nextSlash + 1 + secondSlash);
}

/**
 * Returns true if `path` starts with `..` (i.e. escapes the parent
 * directory). Mirrors TS-Go `isPathRelativeToParent`.
 */
export function isPathRelativeToParent(path: string): boolean {
  return path.startsWith("..");
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
): readonly string[] {
  const results: string[] = [];
  for (const rootDir of rootDirs) {
    const relativePath = getRelativePathIfInSameVolume(path, rootDir, useCaseSensitiveFileNames);
    if (!isPathRelativeToParent(relativePath)) {
      results.push(relativePath);
    }
  }
  return results;
}

/**
 * Returns the path relative to `directoryPath`, or "" if it crosses a
 * volume boundary. Mirrors TS-Go `getRelativePathIfInSameVolume`.
 */
export function getRelativePathIfInSameVolume(
  path: string,
  directoryPath: string,
  useCaseSensitiveFileNames: boolean,
): string {
  const relativePath = getRelativePathToDirectoryOrUrl(directoryPath, path, false, {
    useCaseSensitiveFileNames,
    currentDirectory: directoryPath,
  });
  if (isRootedDiskPath(relativePath)) {
    return "";
  }
  return relativePath;
}

/**
 * Returns true if two paths are equal under the given comparison
 * options. Mirrors TS-Go `packageJsonPathsAreEqual`.
 */
export function packageJsonPathsAreEqual(
  a: string,
  b: string,
  options: ComparePathsOptionsForUtil,
): boolean {
  if (a === b) {
    return true;
  }
  if (a.length === 0 || b.length === 0) {
    return false;
  }
  return comparePaths(a, b, options) === 0;
}

// ---------------------------------------------------------------------------
// Cross-module surface used by util.ts. These mirror the
// `internal/modulespecifiers` package members that live in specifiers.ts and
// the broader `core`/`packagejson` ports; util.go references them directly as
// same-package symbols.
// ---------------------------------------------------------------------------

import {
  getAllModulePaths,
  getInfo,
  tryGetModuleNameAsNodeModule,
  type CompilerOptions as CompilerOptionsForUtil,
  type ExportsOrImports as ExportsOrImportsForUtil,
} from "./specifiers.js";
import type { TspathHelpers } from "./preferences.js";

interface ComparePathsOptionsForUtil {
  readonly useCaseSensitiveFileNames: boolean;
  readonly currentDirectory: string;
}

// Real `tspath` surface bound to the upstream helpers. The specifier
// generator still threads `TspathHelpers` through its call graph (a
// pre-existing shape); `getNodeModulesPackageName` supplies the genuine
// implementations rather than stubs.
const tspathHelpers: TspathHelpers = {
  isDeclarationFileName,
  pathIsRelative,
  pathIsAbsolute,
  hasTSFileExtension,
  hasJSFileExtension,
  fileExtensionIsOneOf,
  extensionsNotSupportingExtensionlessResolution,
  isExternalModuleNameRelative,
};

// Forward declaration: `module.ResolvedEntrypoint` shape, used by
// `processEntrypointEnding` (see specifiers.ts).
export interface ResolvedEntrypoint {
  readonly moduleSpecifier: string;
  readonly ending: "fixed" | "changeable" | "extension-changeable";
}
