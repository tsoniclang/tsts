/**
 * Glob / spec matching for tsconfig `include`/`exclude` patterns.
 *
 * Port surface of TS-Go `internal/vfs/vfsmatch/vfsmatch.go` (1100+ LoC).
 * Current scope:
 *   - `Usage` enum, `UnlimitedDepth`
 *   - `IsImplicitGlob` (sufficient for wildcarddirectories.ts)
 *   - `NewSpecMatcher` signature
 *
 * The full matching algorithm (component, segment, charClass, NFA-style
 * compilation, recursive directory walk) lands in a follow-up commit
 * with `vfsmatch.test.ts`. See TS-Go's MATCHING_ALGORITHM.md for the
 * specification.
 */

import type { FS } from "../vfs.js";
import {
  hasExtension, getDirectoryPath, removeTrailingDirectorySeparator,
  isRootedDiskPath, normalizePath, combinePaths,
  containsPath as _containsPath,
} from "../../tspath/path.js";

function containsPath(parent: string, child: string, useCaseSensitiveFileNames: boolean): boolean {
  return _containsPath(parent, child, { useCaseSensitiveFileNames, currentDirectory: "" });
}

export type Usage = 0 | 1 | 2;
export const Usage: {
  readonly Files: Usage;
  readonly Directories: Usage;
  readonly Exclude: Usage;
} = {
  Files: 0,
  Directories: 1,
  Exclude: 2,
};

/** Sentinel meaning "no depth limit" for `readDirectory`. */
export const UnlimitedDepth: number = Number.MAX_SAFE_INTEGER;

/**
 * Returns true if a path component is implicitly a glob. An includes
 * path "foo" is implicitly "foo/** /*" if its last component has no
 * extension and contains no glob characters.
 *
 * Mirrors TS-Go `IsImplicitGlob`.
 */
export function isImplicitGlob(lastPathComponent: string): boolean {
  for (let i = 0; i < lastPathComponent.length; i += 1) {
    const ch = lastPathComponent[i]!;
    if (ch === "." || ch === "*" || ch === "?") return false;
  }
  return true;
}

/**
 * A compiled multi-spec matcher. Mirrors TS-Go `SpecMatcher`.
 */
export interface SpecMatcher {
  matchString(s: string): boolean;
}

/**
 * Compiles a list of spec strings into a `SpecMatcher`. The full
 * compiler lands in a follow-up commit; for now this returns `undefined`
 * when the list is empty, matching the upstream "nothing to match"
 * behavior.
 *
 * Mirrors TS-Go `NewSpecMatcher`.
 */
export function newSpecMatcher(
  specs: readonly string[],
  currentDirectory: string,
  usage: Usage,
  caseSensitive: boolean,
): SpecMatcher | undefined {
  if (specs.length === 0) return undefined;
  const globs = specs
    .map((spec) => compileGlobForUsage(spec, currentDirectory, usage))
    .filter((glob): glob is CompiledGlob => glob !== undefined);
  if (globs.length === 0) return undefined;
  return {
    matchString: (s: string): boolean => globs.some((glob) => matchesGlob(s, glob, caseSensitive)),
  };
}

/**
 * Top-level directory walker entry point. Mirrors TS-Go
 * `ReadDirectory`. Walks `path` collecting files matching `includes`
 * (and not in `excludes`) whose extension is in `extensions`.
 */
export function readDirectory(
  host: FS,
  currentDir: string,
  path: string,
  extensions: readonly string[],
  excludes: readonly string[],
  includes: readonly string[],
  depth: number,
): readonly string[] {
  return matchFiles(path, extensions, excludes, includes, host.useCaseSensitiveFileNames(), currentDir, depth, host);
}

// ---------------------------------------------------------------------------
// Glob compilation + base-path detection
// ---------------------------------------------------------------------------

interface GlobComponent {
  /** Raw text of this component, e.g. "src", "**", "*.ts". */
  readonly text: string;
  /** True for `**` recursive wildcard. */
  readonly isRecursive: boolean;
}

interface CompiledGlob {
  readonly basePath: string;
  readonly components: readonly GlobComponent[];
}

const WILDCARD_RE = /[*?]/;

function getIncludeBasePath(absolute: string): string {
  const wildcardOffset = absolute.search(WILDCARD_RE);
  if (wildcardOffset < 0) {
    if (!hasExtension(absolute)) return absolute;
    return removeTrailingDirectorySeparator(getDirectoryPath(absolute));
  }
  const lastSeparator = absolute.lastIndexOf("/", wildcardOffset);
  return absolute.slice(0, Math.max(lastSeparator, 0));
}

/**
 * Mirrors TS-Go `getBasePaths`. Returns the unique non-wildcard base
 * paths derived from the include patterns.
 */
export function getBasePaths(
  path: string,
  includes: readonly string[],
  useCaseSensitiveFileNames: boolean,
): readonly string[] {
  const basePaths: string[] = [path];
  if (includes.length === 0) return basePaths;

  const includeBasePaths: string[] = [];
  for (const include of includes) {
    const absolute = isRootedDiskPath(include)
      ? include
      : normalizePath(combinePaths(path, include));
    includeBasePaths.push(getIncludeBasePath(absolute));
  }
  includeBasePaths.sort();

  for (const includeBasePath of includeBasePaths) {
    if (basePaths.every((basepath) => !containsPath(basepath, includeBasePath, useCaseSensitiveFileNames))) {
      basePaths.push(includeBasePath);
    }
  }
  return basePaths;
}

function compileGlob(spec: string, basePath: string): CompiledGlob {
  return compileGlobForUsage(spec, basePath, Usage.Files) ?? { basePath, components: [] };
}

function compileGlobForUsage(spec: string, basePath: string, usage: Usage): CompiledGlob | undefined {
  const absolute = isRootedDiskPath(spec) ? spec : normalizePath(combinePaths(basePath, spec));
  const components: GlobComponent[] = [];
  const parts = absolute.split("/").filter((segment) => segment.length > 0);
  if (usage !== Usage.Exclude && parts[parts.length - 1] === "**") return undefined;
  if (parts.length > 0 && isImplicitGlob(parts[parts.length - 1]!)) {
    parts.push("**", "*");
  }
  for (const segment of parts) {
    if (segment === "") continue;
    components.push({ text: segment, isRecursive: segment === "**" });
  }
  return { basePath: getIncludeBasePath(absolute), components };
}

function matchesGlob(filePath: string, glob: CompiledGlob, caseSensitive: boolean): boolean {
  const cmp = (a: string, b: string) => caseSensitive ? a === b : a.toLowerCase() === b.toLowerCase();
  const matchSegment = (segment: string, component: GlobComponent): boolean => {
    if (component.isRecursive) return true;
    // Convert simple-glob (* ? . literal) to regex
    const re = new RegExp(
      "^" +
        component.text
          .replace(/[.+^${}()|[\]\\]/g, "\\$&")
          .replace(/\*/g, ".*")
          .replace(/\?/g, ".") +
        "$",
      caseSensitive ? "" : "i",
    );
    void cmp;
    return re.test(segment);
  };

  const segments = filePath.split("/").filter((s) => s.length > 0);
  // Two-pointer match with recursive ** handling.
  let i = 0;
  let j = 0;
  while (i < segments.length && j < glob.components.length) {
    const c = glob.components[j]!;
    if (c.isRecursive) {
      // ** matches zero or more path segments.
      if (j === glob.components.length - 1) return true;
      const next = glob.components[j + 1]!;
      while (i < segments.length && (shouldSkipRecursiveSegment(segments[i]!, c) || !matchSegment(segments[i]!, next))) i += 1;
      if (i >= segments.length) return false;
      j += 1;
      continue;
    }
    if (!matchSegment(segments[i]!, c)) return false;
    i += 1;
    j += 1;
  }
  return j >= glob.components.length;
}

function shouldSkipRecursiveSegment(segment: string, component: GlobComponent): boolean {
  return component.isRecursive && (segment === "node_modules" || segment === "bower_components" || segment === "jspm_packages" || segment.startsWith("."));
}

function matchFiles(
  path: string,
  extensions: readonly string[],
  excludes: readonly string[],
  includes: readonly string[],
  useCaseSensitiveFileNames: boolean,
  currentDirectory: string,
  depth: number,
  host: FS,
): readonly string[] {
  const includeGlobs = includes.map((i) => compileGlob(i, currentDirectory));
  const excludeGlobs = excludes.map((e) => compileGlob(e, currentDirectory));
  const matchedFiles: string[] = [];
  const basePaths = getBasePaths(path, includes, useCaseSensitiveFileNames);

  for (const basePath of basePaths) {
    host.walkDir(basePath, (filePath, entry) => {
      if (depth !== UnlimitedDepth && relativeDepth(basePath, filePath) > depth) return "skip-dir";
      if (entry.isDirectory) return undefined;
      if (extensions.length > 0 && !extensions.some((ext) => filePath.endsWith(ext))) return undefined;
      if (excludeGlobs.some((g) => matchesGlob(filePath, g, useCaseSensitiveFileNames))) return undefined;
      if (includeGlobs.length === 0 || includeGlobs.some((g) => matchesGlob(filePath, g, useCaseSensitiveFileNames))) {
        matchedFiles.push(filePath);
      }
      return undefined;
    });
  }
  return matchedFiles.sort((a, b) => comparePathsByParts(a, b));
}

function relativeDepth(basePath: string, filePath: string): number {
  const base = removeTrailingDirectorySeparator(normalizePath(basePath));
  const path = normalizePath(filePath);
  if (path === base) return 0;
  const prefix = base.endsWith("/") ? base : base + "/";
  if (!path.startsWith(prefix)) return 0;
  return path.slice(prefix.length).split("/").filter((part) => part.length > 0).length;
}

function comparePathsByParts(a: string, b: string): number {
  const aParts = a.split("/");
  const bParts = b.split("/");
  const count = Math.min(aParts.length, bParts.length);
  for (let index = 0; index < count; index += 1) {
    const aPart = aParts[index]!;
    const bPart = bParts[index]!;
    if (aPart < bPart) return -1;
    if (aPart > bPart) return 1;
  }
  return aParts.length - bParts.length;
}

// ---------------------------------------------------------------------------
// Forward-declared tspath surface
// ---------------------------------------------------------------------------
