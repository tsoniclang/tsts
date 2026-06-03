/**
 * Glob / spec matching for tsconfig `include`/`exclude` patterns.
 *
 * Mechanical 1:1 port of TS-Go `internal/vfs/vfsmatch/vfsmatch.go`.
 * Implements the glob matching algorithm specified in MATCHING_ALGORITHM.md.
 * Same functions, same control flow, same helper decomposition.
 */

import type { FS } from "../vfs.js";
import { Set as SetCollection } from "../../collections/set.js";
import { every, flatten, lastOrNil } from "../../core/core.js";
import {
  combinePaths,
  containsPath,
  directorySeparator,
  getCanonicalFileName,
  getDirectoryPath,
  getNormalizedPathComponents,
  hasExtension,
  isRootedDiskPath,
  normalizePath,
  removeTrailingDirectorySeparator,
  type ComparePathsOptions,
} from "../../tspath/path.js";
import { getStringComparer, type Comparison } from "../../stringutil/index.js";
import { fileExtensionIsOneOf } from "../../tspath/extension.js";

// Usage is `type Usage int8` in TS-Go.
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

const UsageFiles: Usage = 0;
const UsageDirectories: Usage = 1;
const UsageExclude: Usage = 2;

// UnlimitedDepth can be passed as the depth argument to indicate there is no depth limit.
export const UnlimitedDepth: number = Number.MAX_SAFE_INTEGER;

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

// IsImplicitGlob checks if a path component is implicitly a glob.
// An "includes" path "foo" is implicitly a glob "foo/**/*" if its last component has no extension,
// and does not contain any glob characters itself.
export function isImplicitGlob(lastPathComponent: string): boolean {
  return !stringContainsAny(lastPathComponent, ".*?");
}

const wildcardCharCodes = ["*", "?"];

function getIncludeBasePath(absolute: string): string {
  const wildcardOffset = indexAny(absolute, wildcardCharCodes.join(""));
  if (wildcardOffset < 0) {
    // No "*" or "?" in the path
    if (!hasExtension(absolute)) {
      return absolute;
    } else {
      return removeTrailingDirectorySeparator(getDirectoryPath(absolute));
    }
  }
  return absolute.slice(0, Math.max(absolute.slice(0, wildcardOffset).lastIndexOf(directorySeparator), 0));
}

// getBasePaths computes the unique non-wildcard base paths amongst the provided include patterns.
function getBasePaths(path: string, includes: readonly string[], useCaseSensitiveFileNames: boolean): readonly string[] {
  // Storage for our results in the form of literal paths (e.g. the paths as written by the user).
  const basePaths: string[] = [path];

  if (includes.length > 0) {
    const comparePathsOptions: ComparePathsOptions = { currentDirectory: path, useCaseSensitiveFileNames };
    const stringComparer = comparePathsOptionsGetComparer(comparePathsOptions);

    // Storage for literal base paths amongst the include patterns.
    const includeBasePaths: string[] = [];
    for (const include of includes) {
      // We also need to check the relative paths by converting them to absolute and normalizing
      // in case they escape the base path (e.g "..\somedirectory")
      let absolute: string;
      if (isRootedDiskPath(include)) {
        absolute = include;
      } else {
        absolute = normalizePath(combinePaths(path, include));
      }
      // Append the literal and canonical candidate base paths.
      includeBasePaths.push(getIncludeBasePath(absolute));
    }

    // Sort the offsets array using either the literal or canonical path representations.
    sortStableFunc(includeBasePaths, stringComparer);

    // Iterate over each include base path and include unique base paths that are not a
    // subpath of an existing base path
    for (const includeBasePath of includeBasePaths) {
      if (every(basePaths, (basepath) => !containsPath(basepath, includeBasePath, comparePathsOptions))) {
        basePaths.push(includeBasePath);
      }
    }
  }

  return basePaths;
}

type ComponentKind = 0 | 1 | 2;
// exact match (e.g., "src")
const kindLiteral: ComponentKind = 0;
// contains * or ? (e.g., "*.ts")
const kindWildcard: ComponentKind = 1;
// ** matches zero or more directories
const kindDoubleAsterisk: ComponentKind = 2;

type SegmentKind = 0 | 1 | 2;
// exact text
const segLiteral: SegmentKind = 0;
// * matches any chars except /
const segStar: SegmentKind = 1;
// ? matches single char except /
const segQuestion: SegmentKind = 2;

// segment is a piece of a wildcard component.
// Example: "*.ts" becomes [segStar, segLiteral(".ts")]
interface Segment {
  readonly kind: SegmentKind;
  readonly literal: string; // only for segLiteral
}

// component is a single path segment in a glob pattern.
// Examples: "src" (literal), "*" (wildcard), "*.ts" (wildcard), "**" (recursive)
interface Component {
  readonly kind: ComponentKind;
  readonly literal: string; // for kindLiteral: the exact string to match
  readonly segments: readonly Segment[]; // for kindWildcard: parsed wildcard pattern
  // Include patterns with wildcards skip common package folders (node_modules, etc.)
  readonly skipPackageFolders: boolean;
}

// globPattern is a compiled glob pattern for matching file paths without regex.
class GlobPattern {
  readonly components: readonly Component[]; // path segments to match (e.g., ["src", "**", "*.ts"])
  readonly isExclude: boolean; // exclude patterns have different matching rules
  readonly caseSensitive: boolean;
  readonly excludeMinJs: boolean; // for "files" patterns, exclude .min.js by default

  constructor(components: readonly Component[], isExclude: boolean, caseSensitive: boolean, excludeMinJs: boolean) {
    this.components = components;
    this.isExclude = isExclude;
    this.caseSensitive = caseSensitive;
    this.excludeMinJs = excludeMinJs;
  }

  // matches returns true if path matches this pattern.
  matches(path: string): boolean {
    return this.matchPathParts(path, "", 0, 0, false);
  }

  // matchesParts returns true if prefix+suffix matches this pattern.
  // This avoids allocating a combined string for common call sites where prefix ends with '/'.
  matchesParts(prefix: string, suffix: string): boolean {
    return this.matchPathParts(prefix, suffix, 0, 0, false);
  }

  // matchesPrefixParts returns true if files under prefix+suffix could match.
  matchesPrefixParts(prefix: string, suffix: string): boolean {
    return this.matchPathParts(prefix, suffix, 0, 0, true);
  }

  // matchPathParts is like matchPath, but operates on a virtual path formed by prefix+suffix.
  // Offsets are in the combined string.
  matchPathParts(prefix: string, suffix: string, pathOffset: number, compIdx: number, prefixOnly: boolean): boolean {
    for (;;) {
      const [pathPart, nextOffset, ok] = nextPathPartParts(prefix, suffix, pathOffset);
      if (!ok) {
        if (prefixOnly) {
          return true;
        }
        return this.patternSatisfied(compIdx);
      }

      if (compIdx >= this.components.length) {
        return this.isExclude && !prefixOnly;
      }

      const comp = this.components[compIdx]!;
      switch (comp.kind) {
        case kindDoubleAsterisk:
          if (this.matchPathParts(prefix, suffix, pathOffset, compIdx + 1, prefixOnly)) {
            return true;
          }
          if (!this.isExclude && (isHiddenPath(pathPart) || isPackageFolder(pathPart))) {
            return false;
          }
          pathOffset = nextOffset;
          continue;
        case kindLiteral:
          if (comp.skipPackageFolders && isPackageFolder(pathPart)) {
            throw new Error("unreachable: literal components never have skipPackageFolders");
          }
          if (!this.stringsEqual(comp.literal, pathPart)) {
            return false;
          }
          break;
        case kindWildcard:
          if (comp.skipPackageFolders && isPackageFolder(pathPart)) {
            return false;
          }
          if (!this.matchWildcard(comp.segments, pathPart)) {
            return false;
          }
          break;
      }

      pathOffset = nextOffset;
      compIdx++;
    }
  }

  // patternSatisfied checks if remaining pattern components can match empty input.
  patternSatisfied(compIdx: number): boolean {
    // A pattern is satisfied when remaining components can match empty input.
    // For both include and exclude patterns, only trailing "**" components may match nothing.
    for (let i = compIdx; i < this.components.length; i++) {
      if (this.components[i]!.kind !== kindDoubleAsterisk) {
        return false;
      }
    }
    return true;
  }

  // matchWildcard matches a path component against wildcard segments.
  matchWildcard(segs: readonly Segment[], s: string): boolean {
    // Include patterns: wildcards at start cannot match hidden files
    if (!this.isExclude && segs.length > 0 && isHiddenPath(s) && (segs[0]!.kind === segStar || segs[0]!.kind === segQuestion)) {
      return false;
    }

    // Fast path: single * followed by literal suffix (e.g., "*.ts")
    if (segs.length === 2 && segs[0]!.kind === segStar && segs[1]!.kind === segLiteral) {
      const suffix = segs[1]!.literal;
      if (s.length < suffix.length || !this.stringsEqual(suffix, s.slice(s.length - suffix.length))) {
        return false;
      }
      return this.shouldIncludeMinJs(s, segs);
    }

    return this.matchSegments(segs, s) && this.shouldIncludeMinJs(s, segs);
  }

  // matchSegments matches segments against string s using an iterative algorithm.
  // This avoids exponential backtracking by tracking only the last star position.
  // The algorithm is O(n*m) where n is the string length and m is pattern length.
  matchSegments(segs: readonly Segment[], s: string): boolean {
    let segIdx = 0;
    let sIdx = 0;
    let starSegIdx = -1;
    let starSIdx = 0;

    while (sIdx < s.length) {
      if (segIdx < segs.length) {
        const seg = segs[segIdx]!;
        switch (seg.kind) {
          case segLiteral: {
            const end = sIdx + seg.literal.length;
            if (end <= s.length && this.stringsEqual(seg.literal, s.slice(sIdx, end))) {
              sIdx = end;
              segIdx++;
              continue;
            }
            break;
          }
          case segQuestion:
            if (s[sIdx] !== "/") {
              const size = decodeRuneInStringSize(s, sIdx);
              sIdx += size;
              segIdx++;
              continue;
            }
            break;
          case segStar:
            // Record star position for backtracking, then try matching zero chars.
            starSegIdx = segIdx;
            starSIdx = sIdx;
            segIdx++;
            continue;
        }
      }

      // Current segment didn't match. Backtrack to last star if possible.
      if (starSegIdx >= 0 && starSIdx < s.length && s[starSIdx] !== "/") {
        // Star consumes one more character (rune), retry from segment after star.
        const size = decodeRuneInStringSize(s, starSIdx);
        starSIdx += size;
        sIdx = starSIdx;
        segIdx = starSegIdx + 1;
        continue;
      }

      return false;
    }

    // Consume any trailing stars.
    while (segIdx < segs.length && segs[segIdx]!.kind === segStar) {
      segIdx++;
    }
    return segIdx >= segs.length;
  }

  shouldIncludeMinJs(filename: string, segs: readonly Segment[]): boolean {
    if (!this.excludeMinJs) {
      return true;
    }

    // Preserve legacy behavior:
    // - When matching is case-sensitive, only the exact ".min.js" suffix is excluded by default.
    // - When matching is case-insensitive, any casing variant is excluded by default.
    if (!this.hasMinJsSuffix(filename)) {
      return true;
    }
    // Allow when the user's pattern explicitly references the .min. suffix.
    if (this.patternMentionsMinSuffix(segs)) {
      return true;
    }
    return false;
  }

  hasMinJsSuffix(filename: string): boolean {
    if (this.caseSensitive) {
      return filename.endsWith(".min.js");
    }
    const minJs = ".min.js";
    if (filename.length < minJs.length) {
      return false;
    }
    // Avoid allocating via strings.ToLower; compare suffix case-insensitively.
    return equalFold(filename.slice(filename.length - minJs.length), minJs);
  }

  patternMentionsMinSuffix(segs: readonly Segment[]): boolean {
    for (const seg of segs) {
      if (seg.kind !== segLiteral) {
        continue;
      }
      let lit = seg.literal;
      if (!this.caseSensitive) {
        lit = lit.toLowerCase();
      }
      if (lit.includes(".min.js") || lit.includes(".min.")) {
        return true;
      }
    }
    return false;
  }

  // stringsEqual compares strings with appropriate case sensitivity.
  stringsEqual(a: string, b: string): boolean {
    if (this.caseSensitive) {
      return a === b;
    }
    return equalFold(a, b);
  }
}

// compileGlobPattern compiles a glob spec (e.g., "src/**/*.ts") into a pattern.
// Returns (pattern, false) if the pattern would match nothing.
function compileGlobPattern(spec: string, basePath: string, usage: Usage, caseSensitive: boolean): readonly [GlobPattern, boolean] {
  const parts = [...getNormalizedPathComponents(spec, basePath)];

  // "src/**" without a filename matches nothing (for include patterns)
  if (usage !== UsageExclude && lastOrNil(parts) === "**") {
    return [new GlobPattern([], false, false, false), false];
  }

  // Normalize root: "/home/" -> "/home"
  parts[0] = removeTrailingDirectorySeparator(parts[0]!);

  // Directories implicitly match all files: "src" -> "src/**/*"
  if (isImplicitGlob(lastOrNil(parts) ?? "")) {
    parts.push("**", "*");
  }

  const components: Component[] = [];
  for (const part of parts) {
    components.push(parseComponent(part, usage !== UsageExclude));
  }

  const p = new GlobPattern(
    components,
    usage === UsageExclude,
    caseSensitive,
    usage === UsageFiles,
  );
  return [p, true];
}

// parseComponent converts a path segment string into a component.
function parseComponent(s: string, isInclude: boolean): Component {
  if (s === "**") {
    return { kind: kindDoubleAsterisk, literal: "", segments: [], skipPackageFolders: false };
  }
  if (!stringContainsAny(s, "*?")) {
    return { kind: kindLiteral, literal: s, segments: [], skipPackageFolders: false };
  }
  return {
    kind: kindWildcard,
    literal: "",
    segments: parseSegments(s),
    skipPackageFolders: isInclude,
  };
}

// parseSegments breaks "*.ts" into [segStar, segLiteral(".ts")]
function parseSegments(s: string): readonly Segment[] {
  const result: Segment[] = [];
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "*":
      case "?":
        if (i > start) {
          result.push({ kind: segLiteral, literal: s.slice(start, i) });
        }
        if (s[i] === "*") {
          result.push({ kind: segStar, literal: "" });
        } else {
          result.push({ kind: segQuestion, literal: "" });
        }
        start = i + 1;
    }
  }
  if (start < s.length) {
    result.push({ kind: segLiteral, literal: s.slice(start) });
  }
  return result;
}

// nextPathPart extracts the next path component from path starting at offset.
function nextPathPartSingle(s: string, offset: number): readonly [string, number, boolean] {
  if (offset >= s.length) {
    return ["", offset, false];
  }
  if (offset === 0 && s.length > 0 && s[0] === "/") {
    return ["", 1, true];
  }
  while (offset < s.length && s[offset] === "/") {
    offset++;
  }
  if (offset >= s.length) {
    return ["", offset, false];
  }
  const rest = s.slice(offset);
  const idx = rest.indexOf("/");
  if (idx >= 0) {
    return [rest.slice(0, idx), offset + idx, true];
  }
  return [rest, s.length, true];
}

function nextPathPartParts(prefix: string, suffix: string, offset: number): readonly [string, number, boolean] {
  // Fast paths: keep the hot single-string scan tight.
  if (suffix.length === 0) {
    return nextPathPartSingle(prefix, offset);
  }
  if (prefix.length === 0) {
    return nextPathPartSingle(suffix, offset);
  }

  // For matchFilesNoRegex call sites, prefix is a directory path ending in '/',
  // and suffix is a single entry name (no '/'). That makes this significantly
  // simpler than a general-purpose "virtual concatenation" scanner.

  const totalLen = prefix.length + suffix.length;
  if (offset >= totalLen) {
    return ["", offset, false];
  }

  // Handle leading slash (root of absolute path)
  if (offset === 0 && prefix[0] === "/") {
    return ["", 1, true];
  }

  // Scan within prefix.
  if (offset < prefix.length) {
    while (offset < prefix.length && prefix[offset] === "/") {
      offset++;
    }
    if (offset < prefix.length) {
      const rest = prefix.slice(offset);
      const idx = rest.indexOf("/");
      // idx is guaranteed >= 0 for the call sites we care about because prefix ends in '/'.
      return [rest.slice(0, idx), offset + idx, true];
    }
    // Fall through into suffix region.
  }

  // Scan suffix: it's a single component.
  const sOff = offset - prefix.length;
  if (sOff >= suffix.length) {
    return ["", offset, false];
  }
  return [suffix.slice(sOff), totalLen, true];
}

// isHiddenPath checks if a path component is hidden (starts with dot).
function isHiddenPath(name: string): boolean {
  return name.length > 0 && name[0] === ".";
}

// isPackageFolder checks if name is a common package folder (node_modules, etc.)
function isPackageFolder(name: string): boolean {
  switch (name.length) {
    case "node_modules".length:
      return equalFold(name, "node_modules");
    case "jspm_packages".length:
      return equalFold(name, "jspm_packages");
    case "bower_components".length:
      return equalFold(name, "bower_components");
  }
  return false;
}

function ensureTrailingSlash(s: string): string {
  if (s.length > 0 && s[s.length - 1] !== "/") {
    return s + "/";
  }
  return s;
}

// globMatcher combines include and exclude patterns for file matching.
class GlobMatcher {
  readonly includes: GlobPattern[];
  readonly excludes: GlobPattern[];
  readonly hadIncludes: boolean; // true if include specs were provided (even if none compiled)

  constructor(includes: GlobPattern[], excludes: GlobPattern[], hadIncludes: boolean) {
    this.includes = includes;
    this.excludes = excludes;
    this.hadIncludes = hadIncludes;
  }

  // matchesFileParts checks if prefix+suffix matches against the glob patterns.
  // Returns the index of the matching include pattern and true if matched, or (0, false) if not.
  matchesFileParts(prefix: string, suffix: string): readonly [number, boolean] {
    for (let i = 0; i < this.excludes.length; i++) {
      if (this.excludes[i]!.matchesParts(prefix, suffix)) {
        return [0, false];
      }
    }
    if (this.includes.length === 0) {
      if (this.hadIncludes) {
        return [0, false];
      }
      return [0, true];
    }
    for (let i = 0; i < this.includes.length; i++) {
      if (this.includes[i]!.matchesParts(prefix, suffix)) {
        return [i, true];
      }
    }
    return [0, false];
  }

  // matchesDirectoryParts checks if files under the directory prefix+suffix could match any pattern.
  matchesDirectoryParts(prefix: string, suffix: string): boolean {
    for (let i = 0; i < this.excludes.length; i++) {
      if (this.excludes[i]!.matchesParts(prefix, suffix)) {
        return false;
      }
    }
    if (this.includes.length === 0) {
      return !this.hadIncludes;
    }
    for (let i = 0; i < this.includes.length; i++) {
      if (this.includes[i]!.matchesPrefixParts(prefix, suffix)) {
        return true;
      }
    }
    return false;
  }
}

function newGlobMatcher(
  includeSpecs: readonly string[],
  excludeSpecs: readonly string[],
  basePath: string,
  caseSensitive: boolean,
  usage: Usage,
): GlobMatcher {
  const includes: GlobPattern[] = [];
  const excludes: GlobPattern[] = [];

  for (const spec of includeSpecs) {
    const [p, ok] = compileGlobPattern(spec, basePath, usage, caseSensitive);
    if (ok) {
      includes.push(p);
    }
  }
  for (const spec of excludeSpecs) {
    const [p, ok] = compileGlobPattern(spec, basePath, UsageExclude, caseSensitive);
    if (ok) {
      excludes.push(p);
    }
  }
  return new GlobMatcher(includes, excludes, includeSpecs.length > 0);
}

// globVisitor traverses directories matching files against glob patterns.
class GlobVisitor {
  readonly host: FS;
  readonly fileMatcher: GlobMatcher;
  readonly directoryMatcher: GlobMatcher;
  readonly extensions: readonly string[];
  readonly useCaseSensitiveFileNames: boolean;
  readonly visited: SetCollection<string>;
  readonly results: string[][];

  constructor(
    host: FS,
    fileMatcher: GlobMatcher,
    directoryMatcher: GlobMatcher,
    extensions: readonly string[],
    useCaseSensitiveFileNames: boolean,
    results: string[][],
  ) {
    this.host = host;
    this.fileMatcher = fileMatcher;
    this.directoryMatcher = directoryMatcher;
    this.extensions = extensions;
    this.useCaseSensitiveFileNames = useCaseSensitiveFileNames;
    this.visited = new SetCollection<string>();
    this.results = results;
  }

  // visit walks a directory tree, collecting files that match the glob patterns.
  // resolvedRealPath, when non-empty, is the already-resolved real path for this
  // directory (computed incrementally from the parent). When empty, Realpath is
  // called to resolve symlinks.
  visit(path: string, absolutePath: string, depth: number, resolvedRealPath: string): void {
    // Detect symlink cycles
    let realPath: string;
    if (resolvedRealPath !== "") {
      realPath = resolvedRealPath;
    } else {
      realPath = this.host.realpath(absolutePath);
    }
    const canonicalPath = getCanonicalFileName(realPath, this.useCaseSensitiveFileNames);
    if (this.visited.has(canonicalPath)) {
      return;
    }
    this.visited.add(canonicalPath);

    const entries = this.host.getAccessibleEntries(absolutePath);

    const pathPrefix = ensureTrailingSlash(path);
    const absPrefix = ensureTrailingSlash(absolutePath);

    for (const file of entries.files) {
      if (this.extensions.length > 0 && !fileExtensionIsOneOf(file, this.extensions)) {
        continue;
      }
      const [idx, ok] = this.fileMatcher.matchesFileParts(absPrefix, file);
      if (ok) {
        this.results[idx]!.push(pathPrefix + file);
      }
    }

    if (depth !== UnlimitedDepth) {
      depth--;
      if (depth === 0) {
        return;
      }
    }

    for (const dir of entries.directories) {
      if (!this.directoryMatcher.matchesDirectoryParts(absPrefix, dir)) {
        continue;
      }
      const absDir = absPrefix + dir;
      let childRealPath = "";
      if (entries.symlinks !== undefined) {
        if (!entries.symlinks.has(dir)) {
          // Non-symlink directory: compute realpath incrementally.
          childRealPath = combinePaths(realPath, dir);
        }
        // else: symlink directory; leave childRealPath empty to force Realpath call.
      }
      // If Symlinks is nil, the FS doesn't track symlinks;
      // leave childRealPath empty to call Realpath (preserving old behavior).
      this.visit(pathPrefix + dir, absDir, depth, childRealPath);
    }
  }
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
  path = normalizePath(path);
  currentDirectory = normalizePath(currentDirectory);
  const absolutePath = combinePaths(currentDirectory, path);

  const fileMatcher = newGlobMatcher(includes, excludes, absolutePath, useCaseSensitiveFileNames, UsageFiles);
  const directoryMatcher = newGlobMatcher(includes, excludes, absolutePath, useCaseSensitiveFileNames, UsageDirectories);

  const results: string[][] = [];
  for (let i = 0; i < Math.max(fileMatcher.includes.length, 1); i++) {
    results.push([]);
  }

  const v = new GlobVisitor(host, fileMatcher, directoryMatcher, extensions, useCaseSensitiveFileNames, results);

  for (const basePath of getBasePaths(path, includes, useCaseSensitiveFileNames)) {
    v.visit(basePath, combinePaths(currentDirectory, basePath), depth, "");
  }

  // Fast path: a single include bucket (or no includes) doesn't need flattening.
  if (v.results.length === 1) {
    return v.results[0]!;
  }
  return flatten(v.results);
}

// SpecMatcher wraps multiple glob patterns for matching paths.
export interface SpecMatcher {
  // matchString returns true if any pattern matches the path.
  matchString(path: string): boolean;
  // matchIndex returns the index of the first matching pattern, or -1.
  matchIndex(path: string): number;
}

class SpecMatcherImpl implements SpecMatcher {
  readonly patterns: readonly GlobPattern[];

  constructor(patterns: readonly GlobPattern[]) {
    this.patterns = patterns;
  }

  // MatchString returns true if any pattern matches the path.
  matchString(path: string): boolean {
    for (let i = 0; i < this.patterns.length; i++) {
      if (this.patterns[i]!.matches(path)) {
        return true;
      }
    }
    return false;
  }

  // MatchIndex returns the index of the first matching pattern, or -1.
  matchIndex(path: string): number {
    for (let i = 0; i < this.patterns.length; i++) {
      if (this.patterns[i]!.matches(path)) {
        return i;
      }
    }
    return -1;
  }
}

// NewSpecMatcher creates a matcher for one or more glob specs.
// It returns a matcher that can test if paths match any of the patterns.
export function newSpecMatcher(
  specs: readonly string[],
  basePath: string,
  usage: Usage,
  useCaseSensitiveFileNames: boolean,
): SpecMatcher | undefined {
  if (specs.length === 0) {
    return undefined;
  }
  const patterns: GlobPattern[] = [];
  for (const spec of specs) {
    const [p, ok] = compileGlobPattern(spec, basePath, usage, useCaseSensitiveFileNames);
    if (ok) {
      patterns.push(p);
    }
  }
  if (patterns.length === 0) {
    return undefined;
  }
  return new SpecMatcherImpl(patterns);
}

// ────────────────────────────────────────────────────────────────────────────
// Go stdlib helpers with no TS counterpart, ported inline
// ────────────────────────────────────────────────────────────────────────────

// strings.ContainsAny: reports whether any of the chars in `chars` are in `s`.
function stringContainsAny(s: string, chars: string): boolean {
  for (let i = 0; i < s.length; i++) {
    if (chars.includes(s[i]!)) {
      return true;
    }
  }
  return false;
}

// strings.IndexAny: index of the first char in `s` that is in `chars`, or -1.
function indexAny(s: string, chars: string): number {
  for (let i = 0; i < s.length; i++) {
    if (chars.includes(s[i]!)) {
      return i;
    }
  }
  return -1;
}

// strings.EqualFold: case-insensitive comparison.
function equalFold(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

// utf8.DecodeRuneInString: returns the byte-size of the rune at the given index.
// JS strings are UTF-16; advancing by one code unit (or two for a surrogate pair)
// is the closest equivalent of advancing past one rune.
function decodeRuneInStringSize(s: string, index: number): number {
  const code = s.charCodeAt(index);
  if (code >= 0xd800 && code <= 0xdbff && index + 1 < s.length) {
    const next = s.charCodeAt(index + 1);
    if (next >= 0xdc00 && next <= 0xdfff) {
      return 2;
    }
  }
  return 1;
}

// ComparePathsOptions.GetComparer (tspath): the string comparer used for path sorting.
function comparePathsOptionsGetComparer(options: ComparePathsOptions): (a: string, b: string) => Comparison {
  return getStringComparer(!options.useCaseSensitiveFileNames);
}

// slices.SortStableFunc: stable sort using the supplied comparer.
function sortStableFunc(values: string[], cmp: (a: string, b: string) => Comparison): void {
  const indexed = values.map((value, index) => ({ value, index }));
  indexed.sort((a, b) => {
    const c = cmp(a.value, b.value);
    if (c !== 0) {
      return c;
    }
    return a.index - b.index;
  });
  for (let i = 0; i < indexed.length; i++) {
    values[i] = indexed[i]!.value;
  }
}
