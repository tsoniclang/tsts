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
  const lastIndex = containingFile.lastIndexOf("/");
  const basePath = lastIndex < 0 ? containingFile : containingFile.slice(0, lastIndex);
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
  const root = ensureTrailingDirectorySeparator(pathComponents[0]!);
  return root + pathComponents.slice(1).join(directorySeparator);
}

export function getNormalizedPathComponents(path: string, currentDirectory: string): readonly string[] {
  return reducePathComponents(getPathComponents(path, currentDirectory));
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
  const normalized = getNormalizedPathComponents(path, "");
  return getPathFromPathComponents(normalized);
}

export function getNormalizedAbsolutePath(fileName: string, currentDirectory: string): string {
  return getPathFromPathComponents(getNormalizedPathComponents(fileName, currentDirectory));
}

export function getNormalizedAbsolutePathWithoutRoot(fileName: string, currentDirectory: string): string {
  const components = getNormalizedPathComponents(fileName, currentDirectory);
  return components.slice(1).join(directorySeparator);
}

// ────────────────────────────────────────────────────────────────────────────
// Directory operations
// ────────────────────────────────────────────────────────────────────────────

export function getDirectoryPath(path: string): string {
  path = normalizeSlashes(path);
  const rootLength = getRootLength(path);
  if (rootLength === path.length) return path;
  path = removeTrailingDirectorySeparator(path);
  const idx = path.lastIndexOf(directorySeparator);
  const cutoff = Math.max(idx, rootLength);
  return cutoff <= 0 ? path : path.slice(0, cutoff);
}

export function getBaseFileName(path: string): string {
  path = normalizeSlashes(path);
  const rootLength = getRootLength(path);
  if (rootLength === path.length) return "";
  path = removeTrailingDirectorySeparator(path);
  const idx = path.lastIndexOf(directorySeparator);
  return path.slice(Math.max(idx + 1, rootLength));
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
  while (start < fromComponents.length && start < toComponents.length) {
    const a = options.useCaseSensitiveFileNames ? fromComponents[start]! : fromComponents[start]!.toLowerCase();
    const b = options.useCaseSensitiveFileNames ? toComponents[start]! : toComponents[start]!.toLowerCase();
    if (a !== b) break;
    start += 1;
  }

  if (start === 0) {
    return toComponents;
  }

  const components = toComponents.slice(start);
  const relative: string[] = [];
  for (let i = start; i < fromComponents.length; i += 1) {
    relative.push("..");
  }
  return ["", ...relative, ...components];
}

export function getRelativePathFromDirectory(
  fromDirectory: string,
  to: string,
  options: ComparePathsOptions
): string {
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

function comparePathsWorker(a: string, b: string, useCaseSensitiveFileNames: boolean): number {
  if (a === b) return 0;
  if (!useCaseSensitiveFileNames) {
    a = a.toLowerCase();
    b = b.toLowerCase();
  }
  return a < b ? -1 : a > b ? 1 : 0;
}

export function comparePaths(a: string, b: string, options: ComparePathsOptions): number {
  a = getNormalizedAbsolutePath(a, options.currentDirectory);
  b = getNormalizedAbsolutePath(b, options.currentDirectory);
  return comparePathsWorker(a, b, options.useCaseSensitiveFileNames);
}

export function comparePathsCaseSensitive(a: string, b: string, currentDirectory: string): number {
  return comparePaths(a, b, { currentDirectory, useCaseSensitiveFileNames: true });
}

export function comparePathsCaseInsensitive(a: string, b: string, currentDirectory: string): number {
  return comparePaths(a, b, { currentDirectory, useCaseSensitiveFileNames: false });
}

export function containsPath(parent: string, child: string, options: ComparePathsOptions): boolean {
  parent = getNormalizedAbsolutePath(parent, options.currentDirectory);
  child = getNormalizedAbsolutePath(child, options.currentDirectory);
  if (parent === child) return true;
  const parentComponents = getPathComponents(parent);
  const childComponents = getPathComponents(child);
  if (childComponents.length < parentComponents.length) return false;
  const compareKey = options.useCaseSensitiveFileNames
    ? (s: string): string => s
    : (s: string): string => s.toLowerCase();
  for (let i = 0; i < parentComponents.length; i += 1) {
    const equal = (i === 0)
      ? compareKey(parentComponents[i]!) === compareKey(childComponents[i]!)
      : parentComponents[i]! === childComponents[i]!;
    const equalCI = (i === 0) ? equal : compareKey(parentComponents[i]!) === compareKey(childComponents[i]!);
    if (!equalCI) return false;
  }
  return true;
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
  return getAnyExtensionFromPath(fileName, undefined, false) !== "";
}

export function getAnyExtensionFromPath(
  path: string,
  extensions: readonly string[] | undefined,
  ignoreCase: boolean
): string {
  if (extensions !== undefined) {
    const target = ignoreCase ? path.toLowerCase() : path;
    for (const ext of extensions) {
      const candidate = ext.startsWith(".") ? ext : "." + ext;
      const cmpExt = ignoreCase ? candidate.toLowerCase() : candidate;
      if (target.endsWith(cmpExt) && target.length > cmpExt.length) {
        return path.slice(path.length - cmpExt.length);
      }
    }
    return "";
  }
  const baseFileName = getBaseFileName(path);
  const idx = baseFileName.lastIndexOf(".");
  if (idx >= 0) return baseFileName.slice(idx);
  return "";
}

// ────────────────────────────────────────────────────────────────────────────
// Volume detection (UNC vs DOS)
// ────────────────────────────────────────────────────────────────────────────

/** Splits a path into a volume prefix and the remaining path; returns `ok=false` if there is no volume. */
export function splitVolumePath(path: string): { volume: string; rest: string; ok: boolean } {
  const rootLength = getRootLength(path);
  if (rootLength === 0) return { volume: "", rest: path, ok: false };
  return { volume: path.slice(0, rootLength), rest: path.slice(rootLength), ok: true };
}

export function startsWithDirectory(
  fileName: string,
  directoryName: string,
  useCaseSensitiveFileNames: boolean
): boolean {
  const canonicalFileName = getCanonicalFileName(normalizeSlashes(fileName), useCaseSensitiveFileNames);
  const canonicalDirectoryName = ensureTrailingDirectorySeparator(
    getCanonicalFileName(normalizeSlashes(directoryName), useCaseSensitiveFileNames)
  );
  return canonicalFileName.startsWith(canonicalDirectoryName);
}

export function compareNumberOfDirectorySeparators(path1: string, path2: string): number {
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

// Strada-style variants below (returning { result, ok }) supersede the
// historical T|undefined shape.

// ────────────────────────────────────────────────────────────────────────────
// Convert to relative path
// ────────────────────────────────────────────────────────────────────────────

export function convertToRelativePath(
  absoluteOrRelativePath: string,
  options: ComparePathsOptions
): string {
  if (!isRootedDiskPath(absoluteOrRelativePath)) return absoluteOrRelativePath;
  return getRelativePathFromDirectory(options.currentDirectory, absoluteOrRelativePath, options);
}

export function getRelativePathToDirectoryOrUrl(
  directoryPathOrUrl: string,
  relativeOrAbsolutePath: string,
  isAbsolutePathAnUrl: boolean,
  options: ComparePathsOptions
): string {
  const pathComponents = getPathComponentsRelativeTo(
    directoryPathOrUrl,
    relativeOrAbsolutePath,
    options
  );
  const firstComponent = pathComponents[0];
  if (isAbsolutePathAnUrl && firstComponent !== undefined && isRootedDiskPath(firstComponent)) {
    return getPathFromPathComponents(["file:///", ...pathComponents.slice(1)]);
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
export function forEachAncestorDirectory<T>(
  directory: string,
  callback: (directory: string) => { result: T; stop: boolean },
): { result: T | undefined; ok: boolean } {
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
  callback: (directory: string) => { result: T; stop: boolean },
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
  callback: (directory: Path) => { result: T; stop: boolean },
): { result: T | undefined; ok: boolean } {
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
    const result = tryGetExtensionFromPath(path, extension, stringEqualityComparer);
    if (result !== "") return result;
  }
  return "";
}

/** Mirrors TS-Go `tryGetExtensionFromPath`. */
export function tryGetExtensionFromPath(
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
    ? (a: string, b: string) => a === b
    : (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

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
  const rest = path.slice(rootLength).split("/").filter((s) => s.length > 0);
  return [root, ...rest];
}

/**
 * Mirrors TS-Go `getNormalizedPathComponentsFromCombined`. Internal
 * helper used by `getNormalizedPathComponents`.
 */
export function getNormalizedPathComponentsFromCombined(path: string): readonly string[] {
  return reducePathComponents(getPathComponents(path, ""));
}

// (Duplicate implementations of startsWithDirectory,
// compareNumberOfDirectorySeparators, and splitVolumePath were
// removed — the canonical versions live above at lines 546-568.)
