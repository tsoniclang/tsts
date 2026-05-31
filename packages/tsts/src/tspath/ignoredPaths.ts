/**
 * Port of TS-Go internal/tspath/ignoredpaths.go.
 *
 * Paths containing any of these patterns are ignored by directory walkers
 * to skip vendor dirs, VCS internals, and editor temp files.
 */

const ignoredPaths: readonly string[] = ["/node_modules/.", "/.git", ".#"];

export function containsIgnoredPath(path: string): boolean {
  for (const pattern of ignoredPaths) {
    if (path.includes(pattern)) return true;
  }
  return false;
}
