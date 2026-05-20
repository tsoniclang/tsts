/**
 * Module-resolution utilities.
 *
 * Port of TS-Go internal/module/util.go.
 *
 * Pure-function helpers used by the resolver and downstream consumers.
 * The CompilerOptions-dependent helpers (getResolutionDiagnostic,
 * tryGetJSExtensionForFile) are forthcoming; the standalone string-
 * manipulation utilities are here.
 */

import {
  extensionCjs,
  extensionDcts,
  extensionDmts,
  extensionDts,
  extensionCts,
  extensionJs,
  extensionJsx,
  extensionJson,
  extensionMjs,
  extensionMts,
  extensionTs,
  extensionTsx,
  normalizePath,
  tryGetExtensionFromPath,
} from "../tspath/index.js";
import { JsxEmit } from "../outputpaths/outputpaths.js";

export const inferredTypesContainingFile = "__inferred type names__.ts";

/**
 * Returns true if `key` is a `types@<range>` pattern that includes the
 * given TypeScript version.
 *
 * NOTE: This requires VersionRange parsing which isn't yet ported.
 * Returns false for unknown ranges until version_range.ts arrives.
 */
export function isApplicableVersionedTypesKey(key: string, _tsVersion: string): boolean {
  if (!key.startsWith("types@")) return false;
  // TODO: parse range and test against tsVersion once semver/version_range
  // is ported. For now, return false (safe default).
  return false;
}

/**
 * Given a path within node_modules, returns the package root (everything
 * up to and including the package name).
 *
 * Examples:
 *   "/a/node_modules/foo/bar.ts"           → "/a/node_modules/foo"
 *   "/a/node_modules/@scope/pkg/bar.ts"    → "/a/node_modules/@scope/pkg"
 *   "/a/something/bar.ts"                  → "" (no node_modules)
 */
export function parseNodeModuleFromPath(resolved: string, isFolder: boolean): string {
  const path = normalizePath(resolved);
  const idx = path.lastIndexOf("/node_modules/");
  if (idx === -1) return "";

  const indexAfterNodeModules = idx + "/node_modules/".length;
  let indexAfterPackageName = moveToNextDirectorySeparatorIfAvailable(
    path,
    indexAfterNodeModules,
    isFolder
  );
  if (path[indexAfterNodeModules] === "@") {
    indexAfterPackageName = moveToNextDirectorySeparatorIfAvailable(
      path,
      indexAfterPackageName,
      isFolder
    );
  }
  return path.slice(0, indexAfterPackageName);
}

function moveToNextDirectorySeparatorIfAvailable(
  path: string,
  prevSeparatorIndex: number,
  isFolder: boolean
): number {
  const offset = prevSeparatorIndex + 1;
  const next = path.indexOf("/", offset);
  if (next === -1) return isFolder ? path.length : prevSeparatorIndex;
  return next;
}

/**
 * Split a module specifier into a package name and the rest.
 *
 * Examples:
 *   "foo/bar"        → ["foo", "bar"]
 *   "@scope/pkg/x"   → ["@scope/pkg", "x"]
 *   "foo"            → ["foo", ""]
 */
export function parsePackageName(moduleName: string): readonly [string, string] {
  let idx = moduleName.indexOf("/");
  if (moduleName.length > 0 && moduleName[0] === "@") {
    const offset = idx + 1;
    idx = moduleName.indexOf("/", offset);
  }
  if (idx === -1) return [moduleName, ""];
  return [moduleName.slice(0, idx), moduleName.slice(idx + 1)];
}

/**
 * Mangle a scoped package name into a single segment for use in `@types/`.
 *
 *   "@types/foo"      → "foo"
 *   "@scope/pkg"      → "scope__pkg"
 */
export function mangleScopedPackageName(packageName: string): string {
  if (packageName.length > 0 && packageName[0] === "@") {
    const idx = packageName.indexOf("/");
    if (idx === -1) return packageName;
    return packageName.slice(1, idx) + "__" + packageName.slice(idx + 1);
  }
  return packageName;
}

/**
 * Inverse of mangleScopedPackageName.
 *
 *   "scope__pkg"  → "@scope/pkg"
 *   "foo"         → "foo"
 */
export function unmangleScopedPackageName(packageName: string): string {
  const idx = packageName.indexOf("__");
  if (idx !== -1) {
    return "@" + packageName.slice(0, idx) + "/" + packageName.slice(idx + 2);
  }
  return packageName;
}

/**
 * `@types/<mangled>` is the corresponding `@types` package name.
 *
 *   "foo"            → "@types/foo"
 *   "@scope/pkg"     → "@types/scope__pkg"
 */
export function getTypesPackageName(packageName: string): string {
  return "@types/" + mangleScopedPackageName(packageName);
}

/**
 * Inverse of getTypesPackageName.
 *
 *   "@types/scope__pkg"  → "@scope/pkg"
 *   "@types/foo"         → "foo"
 *   "foo"                → "foo"  (already unwrapped)
 */
export function getPackageNameFromTypesPackageName(mangledName: string): string {
  const withoutPrefix = mangledName.startsWith("@types/")
    ? mangledName.slice("@types/".length)
    : undefined;
  if (withoutPrefix !== undefined) {
    return unmangleScopedPackageName(withoutPrefix);
  }
  return mangledName;
}

/**
 * Compare two pattern keys (containing at most one `*`) by specificity.
 * The longer prefix wins; literal patterns rank above wildcard ones
 * at the same prefix length.
 *
 * Used to sort `paths` patterns from most-specific to least-specific.
 */
export function comparePatternKeys(a: string, b: string): number {
  const aIdx = a.indexOf("*");
  const bIdx = b.indexOf("*");
  const baseLenA = aIdx !== -1 ? aIdx + 1 : a.length;
  const baseLenB = bIdx !== -1 ? bIdx + 1 : b.length;

  if (baseLenA > baseLenB) return -1;
  if (baseLenB > baseLenA) return 1;
  if (aIdx === -1) return 1;
  if (bIdx === -1) return -1;
  if (a.length > b.length) return -1;
  if (b.length > a.length) return 1;
  return 0;
}

/**
 * Maps TS/JS/DTS extensions to the output JS-side extension.
 *
 * Returns empty string for unsupported.
 */
export function tryGetJSExtensionForFile(fileName: string, jsx: JsxEmit | undefined): string {
  const ext = tryGetExtensionFromPath(fileName);
  switch (ext) {
    case extensionTs:
    case extensionDts:
      return extensionJs;
    case extensionTsx:
      return jsx === JsxEmit.Preserve ? extensionJsx : extensionJs;
    case extensionJs:
    case extensionJsx:
    case extensionJson:
      return ext;
    case extensionDmts:
    case extensionMts:
    case extensionMjs:
      return extensionMjs;
    case extensionDcts:
    case extensionCts:
    case extensionCjs:
      return extensionCjs;
    default:
      return "";
  }
}
