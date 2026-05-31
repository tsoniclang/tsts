/**
 * TypeScript-specific path utilities.
 *
 * Port of TS-Go internal/tspath/path.go. We maintain the same function names,
 * semantics, and ordering as TS-Go so callers in subsequent ports translate
 * mechanically.
 *
 * Internally, paths use '/' as the directory separator. When making system
 * calls, the host is expected to correctly handle this format.
 */

import {
  compareStringsCaseInsensitive,
  equateStringCaseInsensitive,
  getStringComparer,
  getStringEqualityComparer,
  type Comparison,
} from "../stringutil/index.js";

// ────────────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────────────

// Path is logically a "branded string" in TS-Go (`type Path string`); tsonic
// doesn't support intersection-typed brands, so we model it as a plain alias.
export type Path = string;

export const directorySeparator = "/";
const urlSchemeSeparator = "://";

// ────────────────────────────────────────────────────────────────────────────
// Options
// ────────────────────────────────────────────────────────────────────────────

export interface ComparePathsOptions {
  readonly currentDirectory: string;
  readonly useCaseSensitiveFileNames: boolean;
}

function getComparer(options: ComparePathsOptions): (a: string, b: string) => Comparison {
  return getStringComparer(!options.useCaseSensitiveFileNames);
}

function getEqualityComparer(options: ComparePathsOptions): (a: string, b: string) => boolean {
  return getStringEqualityComparer(!options.useCaseSensitiveFileNames);
}

// ────────────────────────────────────────────────────────────────────────────
// Path tests
// ────────────────────────────────────────────────────────────────────────────

/** Determines whether a character corresponds to `/` or `\`. */
function isAnyDirectorySeparator(char: string): boolean {
  return char === "/" || char === "\\";
}

/** Determines whether a path starts with a URL scheme (e.g. `http://`, `ftp://`, `file://`). */
export function isUrl(path: string): boolean {
  return getEncodedRootLength(path) < 0;
}

/** Determines whether a path is an absolute disk path (e.g. starts with `/`, or `c:`, `c:\`). */
export function isRootedDiskPath(path: string): boolean {
  return getEncodedRootLength(path) > 0;
}

/** Determines whether a path consists only of a path root. */
export function isDiskPathRoot(path: string): boolean {
  const rootLength = getEncodedRootLength(path);
  return rootLength > 0 && rootLength === path.length;
}

/** Returns true if the file name represents a dynamic/virtual file (e.g., `^/untitled/...`). */
export function isDynamicFileName(fileName: string): boolean {
  return fileName.startsWith("^/");
}

/**
 * Determines whether a path is absolute (rooted, URL, or starts with a scheme).
 *
 * ```
 * pathIsAbsolute("/path/to/file.ext") === true
 * pathIsAbsolute("c:/path/to/file.ext") === true
 * pathIsAbsolute("file:///path/to/file.ext") === true
 * pathIsAbsolute("path/to/file.ext") === false
 * pathIsAbsolute("./path/to/file.ext") === false
 * ```
 */
export function pathIsAbsolute(path: string): boolean {
  return getEncodedRootLength(path) !== 0;
}

export function hasTrailingDirectorySeparator(path: string): boolean {
  return path.length > 0 && isAnyDirectorySeparator(path[path.length - 1]!);
}

// ────────────────────────────────────────────────────────────────────────────
// Volume detection (for DOS paths)
// ────────────────────────────────────────────────────────────────────────────

export function isVolumeCharacter(char: string): boolean {
  return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
}

function getFileUrlVolumeSeparatorEnd(url: string, start: number): number {
  if (url.length <= start) return -1;
  const ch0 = url[start];
  if (ch0 === ":") return start + 1;
  if (ch0 === "%" && url.length > start + 2 && url[start + 1] === "3") {
    const ch2 = url[start + 2];
    if (ch2 === "a" || ch2 === "A") return start + 3;
  }
  return -1;
}

/**
 * Returns the length of the path root, with URL paths encoded as negative
 * (bit-flipped) values for downstream disambiguation.
 *
 * - Returns 0 for relative paths.
 * - Returns positive length for disk paths (POSIX, UNC, DOS).
 * - Returns bit-flipped negative for URL paths.
 */
export function getEncodedRootLength(path: string): number {
  const ln = path.length;
  if (ln === 0) return 0;
  const ch0 = path[0]!;

  // POSIX or UNC
  if (ch0 === "/" || ch0 === "\\") {
    if (ln === 1 || path[1] !== ch0) {
      return 1; // POSIX: "/" (or non-normalized "\")
    }

    const offset = 2;
    const p1 = path.indexOf(ch0, offset);
    if (p1 < 0) {
      return ln; // UNC: "//server" or "\\server"
    }
    return p1 + 1; // UNC: "//server/" or "\\server\"
  }

  // DOS
  if (isVolumeCharacter(ch0) && ln > 1 && path[1] === ":") {
    if (ln === 2) return 2; // DOS: "c:"
    const ch2 = path[2];
    if (ch2 === "/" || ch2 === "\\") return 3; // DOS: "c:/" or "c:\"
  }

  // Untitled paths (e.g., "^/untitled/ts-nul-authority/Untitled-1")
  if (ch0 === "^" && ln > 1 && path[1] === "/") {
    return 2;
  }

  // URL
  const schemeEnd = path.indexOf(urlSchemeSeparator);
  if (schemeEnd !== -1) {
    const authorityStart = schemeEnd + urlSchemeSeparator.length;
    const authorityLengthIdx = path.indexOf("/", authorityStart);
    if (authorityLengthIdx !== -1) {
      const authorityEnd = authorityLengthIdx;

      const scheme = path.slice(0, schemeEnd);
      const authority = path.slice(authorityStart, authorityEnd);
      if (
        scheme === "file" &&
        (authority === "" || authority === "localhost") &&
        path.length > authorityEnd + 2 &&
        isVolumeCharacter(path[authorityEnd + 1]!)
      ) {
        const volumeSeparatorEnd = getFileUrlVolumeSeparatorEnd(path, authorityEnd + 2);
        if (volumeSeparatorEnd !== -1) {
          if (volumeSeparatorEnd === path.length) {
            // URL: "file:///c:" etc.
            return ~volumeSeparatorEnd;
          }
          if (path[volumeSeparatorEnd] === "/") {
            return ~(volumeSeparatorEnd + 1);
          }
        }
      }
      return ~(authorityEnd + 1); // URL: "file://server/", "http://server/"
    }
    return ~ln; // URL: "file://server", "http://server"
  }

  // relative
  return 0;
}

/** Returns the root length (always non-negative). */
export function getRootLength(path: string): number {
  const rootLength = getEncodedRootLength(path);
  return rootLength < 0 ? ~rootLength : rootLength;
}

// ────────────────────────────────────────────────────────────────────────────
// Slash normalization
// ────────────────────────────────────────────────────────────────────────────

const backslashRegex = /\\/g;

/** Normalizes path separators to '/'. */
export function normalizeSlashes(path: string): string {
  // Fast path: most paths don't contain '\'
  if (!path.includes("\\")) return path;
  return path.replace(backslashRegex, "/");
}

// ────────────────────────────────────────────────────────────────────────────
// Path combination
// ────────────────────────────────────────────────────────────────────────────

/**
 * Combines paths. If a path is absolute, it replaces any previous path.
 * Relative paths are not simplified.
 *
 * ```
 * combinePaths("path", "to", "file.ext") === "path/to/file.ext"
 * combinePaths("/path", "/to", "file.ext") === "/to/file.ext"
 * combinePaths("c:/path", "c:/to", "file.ext") === "c:/to/file.ext"
 * ```
 */
export function combinePaths(firstPath: string, ...paths: readonly string[]): string {
  firstPath = normalizeSlashes(firstPath);

  let result = firstPath;
  for (const path of paths) {
    if (path === "") continue;
    const trailingPath = normalizeSlashes(path);
    if (result === "" || getRootLength(trailingPath) !== 0) {
      // `trailingPath` is absolute (or result is empty).
      result = trailingPath;
    } else {
      if (!hasTrailingDirectorySeparator(result)) {
        result += directorySeparator;
      }
      result += trailingPath;
    }
  }
  return result;
}

/**
 * Resolves a path: combines and normalizes. Absolute segments reset the result.
 */
export function resolvePath(path: string, ...paths: readonly string[]): string {
  return normalizePath(paths.length > 0 ? combinePaths(path, ...paths) : normalizeSlashes(path));
}

/** Resolves a triple-slash reference relative to the containing file. */
export function resolveTripleslashReference(moduleName: string, containingFile: string): string {
  const basePath = getDirectoryPath(containingFile);
  if (isRootedDiskPath(moduleName)) {
    return normalizePath(moduleName);
  }
  return normalizePath(combinePaths(basePath, moduleName));
}

// ────────────────────────────────────────────────────────────────────────────
// Path components
// ────────────────────────────────────────────────────────────────────────────

export function getPathComponents(path: string, currentDirectory: string = ""): readonly string[] {
  path = combinePaths(currentDirectory, path);
  return pathComponents(path, getRootLength(path));
}

export function getPathFromPathComponents(pathComponents: readonly string[]): string {
  if (pathComponents.length === 0) return "";
  let root = pathComponents[0]!;
  if (root !== "") {
    root = ensureTrailingDirectorySeparator(root);
  }
  return root + pathComponents.slice(1).join(directorySeparator);
}

export function getNormalizedPathComponents(path: string, currentDirectory: string): readonly string[] {
  const combined = combinePaths(currentDirectory, path);
  return getNormalizedPathComponentsFromCombined(combined);
}

// ────────────────────────────────────────────────────────────────────────────
// Normalization
// ────────────────────────────────────────────────────────────────────────────

/**
 * Normalizes the path, collapsing `.` and `..` segments and converting `\` to `/`.
 *
 * ```
 * normalizePath("/path/to/../file.ext") === "/path/file.ext"
 * normalizePath("path//to//file.ext") === "path/to/file.ext"
 * normalizePath("c:\\path\\to\\file.ext") === "c:/path/to/file.ext"
 * ```
 */
export function normalizePath(path: string): string {
  path = normalizeSlashes(path);
  const simple = simpleNormalizePath(path);
  if (simple.ok) {
    return simple.normalized;
  }
  let normalized = getNormalizedAbsolutePath(path, "");
  if (normalized !== "" && hasTrailingDirectorySeparator(path)) {
    normalized = ensureTrailingDirectorySeparator(normalized);
  }
  return normalized;
}

export function getNormalizedAbsolutePathWithoutRoot(fileName: string, currentDirectory: string): string {
  const absolutePath = getNormalizedAbsolutePath(fileName, currentDirectory);
  const rootLength = getRootLength(absolutePath);
  return absolutePath.slice(rootLength);
}

export function getNormalizedAbsolutePath(fileName: string, currentDirectory: string): string {
  let rootLength = getRootLength(fileName);
  if (rootLength === 0 && currentDirectory !== "") {
    fileName = combinePaths(currentDirectory, fileName);
  } else {
    // combinePaths normalizes slashes, so not necessary in other branch
    fileName = normalizeSlashes(fileName);
  }
  rootLength = getRootLength(fileName);

  const simple = simpleNormalizePath(fileName);
  if (simple.ok) {
    const simpleNormalized = simple.normalized;
    const length = simpleNormalized.length;
    if (length > rootLength) {
      return removeTrailingDirectorySeparator(simpleNormalized);
    }
    if (length === rootLength && rootLength !== 0) {
      return ensureTrailingDirectorySeparator(simpleNormalized);
    }
    return simpleNormalized;
  }

  const length = fileName.length;
  const root = fileName.slice(0, rootLength);
  // `normalized` is only initialized once `fileName` is determined to be non-normalized.
  // `changed` is set at the same time.
  let changed = false;
  let normalized = "";
  let segmentStart = 0;
  let index = rootLength;
  let normalizedUpTo = index;
  let seenNonDotDotSegment = rootLength !== 0;
  while (index < length) {
    // At beginning of segment
    segmentStart = index;
    let ch = fileName.charCodeAt(index);
    while (ch === 0x2f /* / */) {
      index++;
      if (index < length) {
        ch = fileName.charCodeAt(index);
      } else {
        break;
      }
    }
    if (index > segmentStart) {
      // Seen superfluous separator
      if (!changed) {
        normalized = fileName.slice(0, Math.max(rootLength, segmentStart - 1));
        changed = true;
      }
      if (index === length) {
        break;
      }
      segmentStart = index;
    }
    // Past any superfluous separators
    let segmentEnd = fileName.indexOf("/", index + 1);
    if (segmentEnd === -1) {
      segmentEnd = length;
    }
    const segmentLength = segmentEnd - segmentStart;
    if (segmentLength === 1 && fileName.charCodeAt(index) === 0x2e /* . */) {
      // "." segment (skip)
      if (!changed) {
        normalized = fileName.slice(0, normalizedUpTo);
        changed = true;
      }
    } else if (
      segmentLength === 2 &&
      fileName.charCodeAt(index) === 0x2e &&
      fileName.charCodeAt(index + 1) === 0x2e
    ) {
      // ".." segment
      if (!seenNonDotDotSegment) {
        if (changed) {
          if (normalized.length === rootLength) {
            normalized += "..";
          } else {
            normalized += "/..";
          }
        } else {
          normalizedUpTo = index + 2;
        }
      } else if (!changed) {
        if (normalizedUpTo - 1 >= 0) {
          normalized = fileName.slice(0, Math.max(rootLength, fileName.slice(0, normalizedUpTo - 1).lastIndexOf("/")));
        } else {
          normalized = fileName.slice(0, normalizedUpTo);
        }
        changed = true;
        seenNonDotDotSegment =
          (normalized.length !== rootLength || rootLength !== 0) &&
          normalized !== ".." &&
          !normalized.endsWith("/..");
      } else {
        const lastSlash = normalized.lastIndexOf("/");
        if (lastSlash !== -1) {
          normalized = normalized.slice(0, Math.max(rootLength, lastSlash));
        } else {
          normalized = root;
        }
        seenNonDotDotSegment =
          (normalized.length !== rootLength || rootLength !== 0) &&
          normalized !== ".." &&
          !normalized.endsWith("/..");
      }
    } else if (changed) {
      if (normalized.length !== rootLength) {
        normalized += "/";
      }
      seenNonDotDotSegment = true;
      normalized += fileName.slice(segmentStart, segmentEnd);
    } else {
      seenNonDotDotSegment = true;
      normalizedUpTo = segmentEnd;
    }
    index = segmentEnd + 1;
  }
  if (changed) {
    return normalized;
  }
  if (length > rootLength) {
    return removeTrailingDirectorySeparators(fileName);
  }
  if (length === rootLength) {
    return ensureTrailingDirectorySeparator(fileName);
  }
  return fileName;
}

// ────────────────────────────────────────────────────────────────────────────
// Directory operations
// ────────────────────────────────────────────────────────────────────────────

export function getDirectoryPath(path: string): string {
  path = normalizeSlashes(path);

  // If the path provided is itself a root, then return it.
  const rootLength = getRootLength(path);
  if (rootLength === path.length) return path;

  // return the leading portion of the path up to the last (non-terminal) directory separator
  // but not including any trailing directory separator.
  path = removeTrailingDirectorySeparator(path);
  return path.slice(0, Math.max(rootLength, path.lastIndexOf("/")));
}

export function getBaseFileName(path: string): string {
  path = normalizeSlashes(path);

  // if the path provided is itself the root, then it has no file name.
  const rootLength = getRootLength(path);
  if (rootLength === path.length) return "";

  // return the trailing portion of the path starting after the last (non-terminal) directory
  // separator but not including any trailing directory separator.
  path = removeTrailingDirectorySeparator(path);
  return path.slice(Math.max(getRootLength(path), path.lastIndexOf("/") + 1));
}

// ────────────────────────────────────────────────────────────────────────────
// Trailing separators
// ────────────────────────────────────────────────────────────────────────────

export function removeTrailingDirectorySeparator(path: string): string {
  if (hasTrailingDirectorySeparator(path)) {
    return path.slice(0, -1);
  }
  return path;
}

export function removeTrailingDirectorySeparators(path: string): string {
  while (hasTrailingDirectorySeparator(path)) {
    path = path.slice(0, -1);
  }
  return path;
}

export function ensureTrailingDirectorySeparator(path: string): string {
  if (!hasTrailingDirectorySeparator(path)) {
    return path + directorySeparator;
  }
  return path;
}

// ────────────────────────────────────────────────────────────────────────────
// Relative paths
// ────────────────────────────────────────────────────────────────────────────

export function getPathComponentsRelativeTo(
  from: string,
  to: string,
  options: ComparePathsOptions
): readonly string[] {
  const fromComponents = reducePathComponents(getPathComponents(from, options.currentDirectory));
  const toComponents = reducePathComponents(getPathComponents(to, options.currentDirectory));

  let start = 0;
  const maxCommonComponents = Math.min(fromComponents.length, toComponents.length);
  const stringEqualer = getEqualityComparer(options);
  for (; start < maxCommonComponents; start++) {
    const fromComponent = fromComponents[start]!;
    const toComponent = toComponents[start]!;
    if (start === 0) {
      if (!equateStringCaseInsensitive(fromComponent, toComponent)) {
        break;
      }
    } else {
      if (!stringEqualer(fromComponent, toComponent)) {
        break;
      }
    }
  }

  if (start === 0) {
    return toComponents;
  }

  const numDotDotSlashes = fromComponents.length - start;
  const result: string[] = [""];
  // Add all the relative components until we hit a common directory.
  for (let i = 0; i < numDotDotSlashes; i++) {
    result.push("..");
  }
  // Now add all the remaining components of the "to" path.
  for (let i = start; i < toComponents.length; i++) {
    result.push(toComponents[i]!);
  }

  return result;
}

export function getRelativePathFromDirectory(
  fromDirectory: string,
  to: string,
  options: ComparePathsOptions
): string {
  if ((getRootLength(fromDirectory) > 0) !== (getRootLength(to) > 0)) {
    throw new Error("paths must either both be absolute or both be relative");
  }
  const pathComponents = getPathComponentsRelativeTo(fromDirectory, to, options);
  return getPathFromPathComponents(pathComponents);
}

export function getRelativePathFromFile(
  from: string,
  to: string,
  options: ComparePathsOptions
): string {
  return ensurePathIsNonModuleName(getRelativePathFromDirectory(getDirectoryPath(from), to, options));
}

export function ensurePathIsNonModuleName(path: string): string {
  if (path.length > 0 && !pathIsAbsolute(path) && !pathIsRelative(path)) {
    return "./" + path;
  }
  return path;
}

// ────────────────────────────────────────────────────────────────────────────
// Predicates
// ────────────────────────────────────────────────────────────────────────────

export function pathIsRelative(path: string): boolean {
  return /^\.\.?($|[\\/])/.test(path);
}

export function isExternalModuleNameRelative(moduleName: string): boolean {
  return pathIsRelative(moduleName) || pathIsAbsolute(moduleName);
}

// ────────────────────────────────────────────────────────────────────────────
// Comparison
// ────────────────────────────────────────────────────────────────────────────

export function comparePaths(a: string, b: string, options: ComparePathsOptions): Comparison {
  a = combinePaths(options.currentDirectory, a);
  b = combinePaths(options.currentDirectory, b);

  if (a === b) return 0;
  if (a === "") return -1;
  if (b === "") return 1;

  // NOTE: Performance optimization - shortcut if the root segments differ as there would be no
  //       need to perform path reduction.
  const aRoot = a.slice(0, getRootLength(a));
  const bRoot = b.slice(0, getRootLength(b));
  const rootResult = compareStringsCaseInsensitive(aRoot, bRoot);
  if (rootResult !== 0) {
    return rootResult;
  }

  // NOTE: Performance optimization - shortcut if there are no relative path segments in
  //       the non-root portion of the path
  const aRest = a.slice(aRoot.length);
  const bRest = b.slice(bRoot.length);
  if (!hasRelativePathSegment(aRest) && !hasRelativePathSegment(bRest)) {
    return getComparer(options)(aRest, bRest);
  }

  // The path contains a relative path segment. Normalize the paths and perform a slower component
  // by component comparison.
  const aComponents = reducePathComponents(getPathComponents(a, ""));
  const bComponents = reducePathComponents(getPathComponents(b, ""));
  const sharedLength = Math.min(aComponents.length, bComponents.length);
  const comparer = getComparer(options);
  for (let i = 1; i < sharedLength; i++) {
    const result = comparer(aComponents[i]!, bComponents[i]!);
    if (result !== 0) {
      return result;
    }
  }
  return aComponents.length < bComponents.length ? -1 : aComponents.length > bComponents.length ? 1 : 0;
}

export function comparePathsCaseSensitive(a: string, b: string, currentDirectory: string): Comparison {
  return comparePaths(a, b, { currentDirectory, useCaseSensitiveFileNames: true });
}

export function comparePathsCaseInsensitive(a: string, b: string, currentDirectory: string): Comparison {
  return comparePaths(a, b, { currentDirectory, useCaseSensitiveFileNames: false });
}

export function containsPath(parent: string, child: string, options: ComparePathsOptions): boolean {
  parent = combinePaths(options.currentDirectory, parent);
  child = combinePaths(options.currentDirectory, child);
  if (parent === "" || child === "") return false;
  if (parent === child) return true;
  const parentComponents = reducePathComponents(getPathComponents(parent, ""));
  const childComponents = reducePathComponents(getPathComponents(child, ""));
  if (childComponents.length < parentComponents.length) return false;

  const componentComparer = getEqualityComparer(options);
  for (let i = 0; i < parentComponents.length; i++) {
    const comparer = i === 0 ? equateStringCaseInsensitive : componentComparer;
    if (!comparer(parentComponents[i]!, childComponents[i]!)) {
      return false;
    }
  }

  return true;
}

/**
 * Checks whether `child` is contained within or equal to `p`.
 * Since `Path` values are already rooted, reduced, and case-canonicalized,
 * this is a simple string prefix check. Mirrors TS-Go `Path.ContainsPath`.
 */
export function pathContainsPath(p: Path, child: Path): boolean {
  if (p.length === 0) {
    return false;
  }
  return (
    p === child ||
    (child.length > p.length &&
      child.startsWith(p) &&
      (p[p.length - 1] === "/" || child[p.length] === "/"))
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Case handling
// ────────────────────────────────────────────────────────────────────────────

export function getCanonicalFileName(fileName: string, useCaseSensitiveFileNames: boolean): string {
  return useCaseSensitiveFileNames ? fileName : toFileNameLowerCase(fileName);
}

export function toFileNameLowerCase(fileName: string): string {
  return fileName.toLowerCase();
}

// ────────────────────────────────────────────────────────────────────────────
// Path conversion
// ────────────────────────────────────────────────────────────────────────────

export function toPath(fileName: string, basePath: string, useCaseSensitiveFileNames: boolean): Path {
  const nonCanonicalizedPath = pathIsAbsolute(fileName)
    ? normalizePath(fileName)
    : getNormalizedAbsolutePath(fileName, basePath);
  return getCanonicalFileName(nonCanonicalizedPath, useCaseSensitiveFileNames) as Path;
}

// ────────────────────────────────────────────────────────────────────────────
// File extensions
// ────────────────────────────────────────────────────────────────────────────

export function fileExtensionIs(path: string, extension: string): boolean {
  return path.length > extension.length && path.endsWith(extension);
}

export function hasExtension(fileName: string): boolean {
  return getBaseFileName(fileName).includes(".");
}

export function getAnyExtensionFromPath(
  path: string,
  extensions: readonly string[] | undefined,
  ignoreCase: boolean
): string {
  // Retrieves any string from the final "." onwards from a base file name.
  // Unlike extensionFromPath, which throws an exception on unrecognized extensions.
  if (extensions !== undefined && extensions.length > 0) {
    return getAnyExtensionFromPathWorker(
      removeTrailingDirectorySeparator(path),
      extensions,
      getStringEqualityComparer(ignoreCase)
    );
  }

  const baseFileName = getBaseFileName(path);
  const extensionIndex = baseFileName.lastIndexOf(".");
  if (extensionIndex >= 0) {
    return baseFileName.slice(extensionIndex);
  }
  return "";
}

// ────────────────────────────────────────────────────────────────────────────
// Volume detection (UNC vs DOS)
// ────────────────────────────────────────────────────────────────────────────

/** Splits a path into a volume prefix and the remaining path; returns `ok=false` if there is no volume. */
export function splitVolumePath(path: string): { volume: string; rest: string; ok: boolean } {
  if (path.length >= 2 && isVolumeCharacter(path[0]!) && path[1] === ":") {
    return { volume: path.slice(0, 2).toLowerCase(), rest: path.slice(2), ok: true };
  }
  return { volume: "", rest: path, ok: false };
}

export function startsWithDirectory(
  fileName: string,
  directoryName: string,
  useCaseSensitiveFileNames: boolean
): boolean {
  if (directoryName === "") {
    return false;
  }

  const canonicalFileName = getCanonicalFileName(fileName, useCaseSensitiveFileNames);
  let canonicalDirectoryName = getCanonicalFileName(directoryName, useCaseSensitiveFileNames);
  if (canonicalDirectoryName.endsWith("/")) {
    canonicalDirectoryName = canonicalDirectoryName.slice(0, -1);
  }
  if (canonicalDirectoryName.endsWith("\\")) {
    canonicalDirectoryName = canonicalDirectoryName.slice(0, -1);
  }

  return (
    canonicalFileName.startsWith(canonicalDirectoryName + "/") ||
    canonicalFileName.startsWith(canonicalDirectoryName + "\\")
  );
}

export function compareNumberOfDirectorySeparators(path1: string, path2: string): Comparison {
  const a = countSeparators(path1);
  const b = countSeparators(path2);
  return a < b ? -1 : a > b ? 1 : 0;
}

function countSeparators(path: string): number {
  let count = 0;
  for (let i = 0; i < path.length; i += 1) {
    if (path[i] === directorySeparator) count += 1;
  }
  return count;
}

// ────────────────────────────────────────────────────────────────────────────
// Ancestor iteration
// ────────────────────────────────────────────────────────────────────────────

export interface ForEachResult<T> {
  readonly value?: T;
  readonly stop: boolean;
}

// TS-Go-style variants below (returning { result, ok }) supersede the
// historical T|undefined shape.

// ────────────────────────────────────────────────────────────────────────────
// Convert to relative path
// ────────────────────────────────────────────────────────────────────────────

export function convertToRelativePath(
  absoluteOrRelativePath: string,
  options: ComparePathsOptions
): string {
  if (!isRootedDiskPath(absoluteOrRelativePath)) return absoluteOrRelativePath;
  return getRelativePathToDirectoryOrUrl(
    options.currentDirectory,
    absoluteOrRelativePath,
    false /*isAbsolutePathAnUrl*/,
    options
  );
}

export function getRelativePathToDirectoryOrUrl(
  directoryPathOrUrl: string,
  relativeOrAbsolutePath: string,
  isAbsolutePathAnUrl: boolean,
  options: ComparePathsOptions
): string {
  const pathComponents = [...getPathComponentsRelativeTo(
    directoryPathOrUrl,
    relativeOrAbsolutePath,
    options
  )];

  const firstComponent = pathComponents[0]!;
  if (isAbsolutePathAnUrl && isRootedDiskPath(firstComponent)) {
    const prefix = firstComponent.charCodeAt(0) === 0x2f /* / */ ? "file://" : "file:///";
    pathComponents[0] = prefix + firstComponent;
  }

  return getPathFromPathComponents(pathComponents);
}

// ────────────────────────────────────────────────────────────────────────────
// Ancestor-directory traversal
// ────────────────────────────────────────────────────────────────────────────

/**
 * Walks ancestor directories from `directory` outward, invoking
 * `callback` for each. Stops when `callback` returns `[result, true]`.
 * Returns `{ result, ok }` where `ok` indicates whether `callback`
 * signaled a stop. Mirrors TS-Go `ForEachAncestorDirectory`.
 */
export interface AncestorDirectoryCallbackResult<T> {
  readonly result: T;
  readonly stop: boolean;
}

export interface AncestorDirectoryResult<T> {
  readonly result: T | undefined;
  readonly ok: boolean;
}

export function forEachAncestorDirectory<T>(
  directory: string,
  callback: (directory: string) => AncestorDirectoryCallbackResult<T>,
): AncestorDirectoryResult<T> {
  let dir = directory;
  for (;;) {
    const { result, stop } = callback(dir);
    if (stop) return { result, ok: true };
    const parent = getDirectoryPath(dir);
    if (parent === dir) return { result: undefined, ok: false };
    dir = parent;
  }
}

/**
 * Variant that stops walking past the global cache location.
 * Mirrors TS-Go `ForEachAncestorDirectoryStoppingAtGlobalCache`.
 */
export function forEachAncestorDirectoryStoppingAtGlobalCache<T>(
  globalCacheLocation: string,
  directory: string,
  callback: (directory: string) => AncestorDirectoryCallbackResult<T>,
): T | undefined {
  const { result } = forEachAncestorDirectory<T>(directory, (ancestor) => {
    const r = callback(ancestor);
    if (r.stop || ancestor === globalCacheLocation) {
      return { result: r.result, stop: true };
    }
    return { result: r.result, stop: false };
  });
  return result;
}

/** Path-typed variant; mirrors TS-Go `ForEachAncestorDirectoryPath`. */
export function forEachAncestorDirectoryPath<T>(
  directory: Path,
  callback: (directory: Path) => AncestorDirectoryCallbackResult<T>,
): AncestorDirectoryResult<T> {
  return forEachAncestorDirectory(directory, (d) => callback(d as Path));
}

// ────────────────────────────────────────────────────────────────────────────
// Extension helpers (workers + try variants)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Worker for `getAnyExtensionFromPath`. Mirrors TS-Go
 * `getAnyExtensionFromPathWorker`.
 */
export function getAnyExtensionFromPathWorker(
  path: string,
  extensions: readonly string[],
  stringEqualityComparer: (a: string, b: string) => boolean,
): string {
  for (const extension of extensions) {
    const result = tryGetExtensionFromPathWithComparer(path, extension, stringEqualityComparer);
    if (result !== "") return result;
  }
  return "";
}

/** Mirrors TS-Go `tryGetExtensionFromPath` (extension+comparer variant). */
export function tryGetExtensionFromPathWithComparer(
  path: string,
  extension: string,
  stringEqualityComparer: (a: string, b: string) => boolean,
): string {
  let ext = extension;
  if (!ext.startsWith(".")) ext = "." + ext;
  if (path.length >= ext.length && path[path.length - ext.length] === ".") {
    const pathExtension = path.slice(path.length - ext.length);
    if (stringEqualityComparer(pathExtension, ext)) return pathExtension;
  }
  return "";
}

// ────────────────────────────────────────────────────────────────────────────
// hasRelativePathSegment / simpleNormalizePath
// ────────────────────────────────────────────────────────────────────────────

/**
 * Reports whether `p` contains `.`, `..`, `./`, `../`, `/.`, `/..`,
 * `//`, `/./`, or `/../`. Mirrors TS-Go `hasRelativePathSegment`.
 */
export function hasRelativePathSegment(p: string): boolean {
  const n = p.length;
  if (n === 0) return false;
  if (p === "." || p === "..") return true;
  if (p.charCodeAt(0) === 0x2E) {
    if (n >= 2 && p.charCodeAt(1) === 0x2F) return true;
    if (n >= 3 && p.charCodeAt(1) === 0x2E && p.charCodeAt(2) === 0x2F) return true;
  }
  if (p.charCodeAt(n - 1) === 0x2E) {
    if (n >= 2 && p.charCodeAt(n - 2) === 0x2F) return true;
    if (n >= 3 && p.charCodeAt(n - 2) === 0x2E && p.charCodeAt(n - 3) === 0x2F) return true;
  }
  let prevSlash = false;
  let segLen = 0;
  let dotCount = 0; // -1 means "not all dots"
  for (let i = 0; i < n; i++) {
    const c = p.charCodeAt(i);
    if (c === 0x2F) {
      if (prevSlash) return true;
      if ((segLen === 1 && dotCount === 1) || (segLen === 2 && dotCount === 2)) return true;
      prevSlash = true;
      segLen = 0;
      dotCount = 0;
      continue;
    }
    if (c === 0x2E) {
      if (dotCount >= 0) dotCount += 1;
    } else {
      dotCount = -1;
    }
    segLen += 1;
    prevSlash = false;
  }
  return (segLen === 1 && dotCount === 1) || (segLen === 2 && dotCount === 2);
}

/**
 * Fast path for paths that need no normalization or only trivial
 * `./`/`/./` cleanup. Returns `{ normalized, ok }` where ok=false
 * means the caller must fall back to the full normalizer.
 *
 * Mirrors TS-Go `simpleNormalizePath`.
 */
export function simpleNormalizePath(path: string): { normalized: string; ok: boolean } {
  if (!hasRelativePathSegment(path)) return { normalized: path, ok: true };
  const simplified = path.split("/./").join("/");
  const trimmed = simplified.startsWith("./") ? simplified.slice(2) : simplified;
  if (
    trimmed !== path &&
    !hasRelativePathSegment(trimmed) &&
    !(trimmed !== simplified && trimmed.startsWith("/"))
  ) {
    return { normalized: trimmed, ok: true };
  }
  return { normalized: "", ok: false };
}

// ────────────────────────────────────────────────────────────────────────────
// Common-parent computation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Returns the smallest set of directories that are parents of all
 * given paths with at least `minComponents` directory components.
 * Paths with fewer components are returned in the second tuple value.
 *
 * Mirrors TS-Go `GetCommonParents`.
 */
export function getCommonParents(
  paths: readonly string[],
  minComponents: number,
  getPathComponentsFn: (path: string, currentDirectory: string) => readonly string[],
  options: ComparePathsOptions,
): { parents: readonly string[]; ignored: ReadonlySet<string> } {
  if (minComponents < 1) throw new Error("minComponents must be at least 1");
  if (paths.length === 0) return { parents: [], ignored: new Set() };
  if (paths.length === 1) {
    const components = reducePathComponents(getPathComponentsFn(paths[0]!, options.currentDirectory));
    if (components.length < minComponents) return { parents: [], ignored: new Set([paths[0]!]) };
    return { parents: paths, ignored: new Set() };
  }

  const ignored = new Set<string>();
  const pathComponents: string[][] = [];
  for (const path of paths) {
    const components = reducePathComponents(getPathComponentsFn(path, options.currentDirectory));
    if (components.length < minComponents) ignored.add(path);
    else pathComponents.push([...components]);
  }

  const results = getCommonParentsWorker(pathComponents, minComponents, options);
  return { parents: results.map((c) => getPathFromPathComponents(c)), ignored };
}

function getCommonParentsWorker(
  componentGroups: string[][],
  minComponents: number,
  options: ComparePathsOptions,
): string[][] {
  if (componentGroups.length === 0) return [];

  let maxDepth = componentGroups[0]!.length;
  for (let i = 1; i < componentGroups.length; i++) {
    const l = componentGroups[i]!.length;
    if (l < maxDepth) maxDepth = l;
  }

  const equality = options.useCaseSensitiveFileNames
    ? (a: string, b: string): boolean => a === b
    : (a: string, b: string): boolean => a.toLowerCase() === b.toLowerCase();

  for (let lastCommonIndex = 0; lastCommonIndex < maxDepth; lastCommonIndex++) {
    const candidate = componentGroups[0]![lastCommonIndex]!;
    for (let j = 1; j < componentGroups.length; j++) {
      const comps = componentGroups[j]!;
      if (!equality(candidate, comps[lastCommonIndex]!)) {
        if (lastCommonIndex < minComponents) {
          const orderedGroups: string[] = [];
          const newGroups = new Map<string, { head: readonly string[]; tails: string[][] }>();
          for (const g of componentGroups) {
            const key = toPath(g[lastCommonIndex]!, options.currentDirectory, options.useCaseSensitiveFileNames);
            const existing = newGroups.get(key);
            if (existing === undefined) orderedGroups.push(key);
            const tails = existing?.tails ?? [];
            tails.push(g.slice(lastCommonIndex + 1));
            newGroups.set(key, { head: g.slice(0, lastCommonIndex + 1), tails });
          }
          orderedGroups.sort();
          const result: string[][] = [];
          for (const key of orderedGroups) {
            const group = newGroups.get(key)!;
            const subResults = getCommonParentsWorker(group.tails, minComponents - (lastCommonIndex + 1), options);
            for (const sr of subResults) result.push([...group.head, ...sr]);
          }
          return result;
        }
        return [componentGroups[0]!.slice(0, lastCommonIndex)];
      }
    }
  }
  return [componentGroups[0]!.slice(0, maxDepth)];
}

// ────────────────────────────────────────────────────────────────────────────
// reducePathComponents
// ────────────────────────────────────────────────────────────────────────────

/**
 * Reduces path components by collapsing `.` and `..` entries.
 * Mirrors TS-Go `reducePathComponents`.
 */
export function reducePathComponents(components: readonly string[]): readonly string[] {
  if (components.length === 0) return [];
  const reduced: string[] = [components[0]!];
  for (let i = 1; i < components.length; i++) {
    const component = components[i]!;
    if (component === "") continue;
    if (component === ".") continue;
    if (component === "..") {
      if (reduced.length > 1) {
        if (reduced[reduced.length - 1] !== "..") {
          reduced.pop();
          continue;
        }
      } else if (reduced[0] !== "") continue;
    }
    reduced.push(component);
  }
  return reduced;
}

// ────────────────────────────────────────────────────────────────────────────
// pathComponents / getNormalizedPathComponentsFromCombined
// ────────────────────────────────────────────────────────────────────────────

/**
 * Splits a path into root + segments, mirroring TS-Go `pathComponents`.
 */
export function pathComponents(path: string, rootLength: number): string[] {
  const root = path.slice(0, rootLength);
  const rest = path.slice(rootLength).split("/");
  if (rest.length > 0 && rest[rest.length - 1] === "") {
    rest.pop();
  }
  return [root, ...rest];
}

/**
 * Mirrors TS-Go `getNormalizedPathComponentsFromCombined`. Internal
 * helper used by `getNormalizedPathComponents`.
 */
function getNormalizedPathComponentsFromCombined(path: string): readonly string[] {
  const rootLength = getRootLength(path);
  // Always include the root component (empty string for relative paths).
  const components: string[] = [path.slice(0, rootLength)];

  let i = rootLength;
  while (i < path.length) {
    // Skip directory separators (handles consecutive separators and trailing '/').
    while (i < path.length && path.charCodeAt(i) === 0x2f /* / */) {
      i++;
    }
    if (i >= path.length) {
      break;
    }

    const start = i;
    while (i < path.length && path.charCodeAt(i) !== 0x2f /* / */) {
      i++;
    }
    const component = path.slice(start, i);

    if (component === "" || component === ".") {
      continue;
    }
    if (component === "..") {
      if (components.length > 1) {
        if (components[components.length - 1] !== "..") {
          components.pop();
          continue;
        }
      } else if (components[0] !== "") {
        // If this is an absolute path, we can't go above the root.
        continue;
      }
    }

    components.push(component);
  }

  return components;
}
