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

function pathComponents(path: string, rootLength: number): readonly string[] {
  const root = path.slice(0, rootLength);
  let rest = path.slice(rootLength).split("/");
  if (rest.length > 0 && rest[rest.length - 1] === "") {
    rest = rest.slice(0, -1);
  }
  return [root, ...rest];
}

export function getPathFromPathComponents(pathComponents: readonly string[]): string {
  if (pathComponents.length === 0) return "";
  const root = ensureTrailingDirectorySeparator(pathComponents[0]!);
  return root + pathComponents.slice(1).join(directorySeparator);
}

export function getNormalizedPathComponents(path: string, currentDirectory: string): readonly string[] {
  return reducePathComponents(getPathComponents(path, currentDirectory));
}

function reducePathComponents(components: readonly string[]): readonly string[] {
  if (components.length === 0) return [];
  const reduced = [components[0]!];
  for (let i = 1; i < components.length; i += 1) {
    const component = components[i]!;
    if (component === "" || component === ".") continue;
    if (component === "..") {
      if (reduced.length > 1) {
        if (reduced[reduced.length - 1] !== "..") {
          reduced.pop();
          continue;
        }
      } else if (reduced[0] !== "") {
        // Don't reduce above the first non-empty component
        reduced.push(component);
        continue;
      }
    }
    reduced.push(component);
  }
  return reduced;
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

export function forEachAncestorDirectory<T>(
  directory: string,
  callback: (directory: string) => T | undefined
): T | undefined {
  while (true) {
    const result = callback(directory);
    if (result !== undefined) return result;
    const parent = getDirectoryPath(directory);
    if (parent === directory) return undefined;
    directory = parent;
  }
}

export function forEachAncestorDirectoryPath<T>(
  directory: Path,
  callback: (directory: Path) => T | undefined
): T | undefined {
  while (true) {
    const result = callback(directory);
    if (result !== undefined) return result;
    const parent = getDirectoryPath(directory) as Path;
    if (parent === directory) return undefined;
    directory = parent;
  }
}

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
