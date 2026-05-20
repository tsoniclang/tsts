/**
 * Simple wildcard pattern matching with a single '*' character.
 *
 * Port of TS-Go internal/core/pattern.go.
 *
 * Used for module name patterns in `paths`, `typesVersions`, and similar
 * tsconfig fields where exactly one wildcard is allowed.
 */

export interface Pattern {
  readonly text: string;
  /** Position of '*' in `text`, or -1 for exact-match patterns. */
  readonly starIndex: number;
}

/**
 * Parse a pattern with at most one '*'. Returns an invalid Pattern
 * (empty text, starIndex=0) if the pattern has more than one '*'.
 */
export function tryParsePattern(pattern: string): Pattern {
  const starIndex = pattern.indexOf("*");
  if (starIndex === -1 || pattern.indexOf("*", starIndex + 1) === -1) {
    return { text: pattern, starIndex };
  }
  return { text: "", starIndex: 0 };
}

export function patternIsValid(p: Pattern): boolean {
  return p.starIndex === -1 || p.starIndex < p.text.length;
}

export function patternMatches(p: Pattern, candidate: string): boolean {
  if (p.starIndex === -1) return p.text === candidate;
  return (
    candidate.length >= p.starIndex &&
    candidate.startsWith(p.text.slice(0, p.starIndex)) &&
    candidate.endsWith(p.text.slice(p.starIndex + 1))
  );
}

export function patternMatchedText(p: Pattern, candidate: string): string {
  if (!patternMatches(p, candidate)) {
    throw new Error("candidate does not match pattern");
  }
  if (p.starIndex === -1) return "";
  return candidate.slice(p.starIndex, candidate.length - p.text.length + p.starIndex + 1);
}

/**
 * Find the longest-prefix match in a list of values. Useful for path-mapping
 * resolution where multiple patterns could match and the most specific wins.
 *
 * If no value matches, returns undefined.
 */
export function findBestPatternMatch<T>(
  values: readonly T[],
  getPattern: (v: T) => Pattern,
  candidate: string
): T | undefined {
  let best: T | undefined;
  let longestPrefix = -1;
  for (const value of values) {
    const pattern = getPattern(value);
    if (
      (pattern.starIndex === -1 || pattern.starIndex > longestPrefix) &&
      patternMatches(pattern, candidate)
    ) {
      best = value;
      longestPrefix = pattern.starIndex;
    }
  }
  return best;
}
