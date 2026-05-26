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
  _currentDirectory: string,
  _usage: Usage,
  _caseSensitive: boolean,
): SpecMatcher | undefined {
  if (specs.length === 0) return undefined;
  // TODO: port the full algorithm from MATCHING_ALGORITHM.md
  // (component decomposition + segment compilation + recursive walk).
  // For now we return a placeholder that never matches; this is the
  // safe-by-default behavior — once the full matcher is in, the
  // upstream MATCHING_ALGORITHM.md governs.
  return {
    matchString: (_s: string): boolean => false,
  };
}

/**
 * Top-level directory walker entry point. Mirrors TS-Go
 * `ReadDirectory`. Full implementation lands with the matcher.
 */
export function readDirectory(
  _host: FS,
  _currentDir: string,
  _path: string,
  _extensions: readonly string[],
  _excludes: readonly string[],
  _includes: readonly string[],
  _depth: number,
): readonly string[] {
  // TODO: implement using matchFiles + the host's WalkDir.
  return [];
}
