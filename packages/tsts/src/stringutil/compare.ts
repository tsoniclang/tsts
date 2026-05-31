/**
 * String comparison utilities.
 *
 * Port of TS-Go internal/stringutil/compare.go.
 */

/** Comparison result type: -1 (less), 0 (equal), 1 (greater). */
export type Comparison = -1 | 0 | 1;

export const ComparisonLessThan: Comparison = -1;
export const ComparisonEqual: Comparison = 0;
export const ComparisonGreaterThan: Comparison = 1;

export function equateStringCaseInsensitive(a: string, b: string): boolean {
  return compareStringsCaseInsensitive(a, b) === ComparisonEqual;
}

export function equateStringCaseSensitive(a: string, b: string): boolean {
  return a === b;
}

export function getStringEqualityComparer(
  ignoreCase: boolean
): (a: string, b: string) => boolean {
  return ignoreCase ? equateStringCaseInsensitive : equateStringCaseSensitive;
}

export function compareStringsCaseInsensitive(a: string, b: string): Comparison {
  if (a === b) return ComparisonEqual;
  let aIndex = 0;
  let bIndex = 0;
  while (aIndex < a.length || bIndex < b.length) {
    if (aIndex >= a.length) return ComparisonLessThan;
    if (bIndex >= b.length) return ComparisonGreaterThan;
    const aCodePoint = a.codePointAt(aIndex)!;
    const bCodePoint = b.codePointAt(bIndex)!;
    const aLower = String.fromCodePoint(aCodePoint).toLowerCase();
    const bLower = String.fromCodePoint(bCodePoint).toLowerCase();
    if (aLower < bLower) return ComparisonLessThan;
    if (aLower > bLower) return ComparisonGreaterThan;
    aIndex += aCodePoint > 0xffff ? 2 : 1;
    bIndex += bCodePoint > 0xffff ? 2 : 1;
  }
  return ComparisonEqual;
}

export function compareStringsCaseSensitive(a: string, b: string): Comparison {
  if (a < b) return ComparisonLessThan;
  if (a > b) return ComparisonGreaterThan;
  return ComparisonEqual;
}

export function getStringComparer(
  ignoreCase: boolean
): (a: string, b: string) => Comparison {
  return ignoreCase ? compareStringsCaseInsensitive : compareStringsCaseSensitive;
}

export function hasPrefix(s: string, prefix: string, caseSensitive: boolean): boolean {
  if (caseSensitive) return s.startsWith(prefix);
  if (prefix.length > s.length) return false;
  return s.slice(0, prefix.length).toLowerCase() === prefix.toLowerCase();
}

export function hasSuffix(s: string, suffix: string, caseSensitive: boolean): boolean {
  if (caseSensitive) return s.endsWith(suffix);
  if (suffix.length > s.length) return false;
  return s.slice(s.length - suffix.length).toLowerCase() === suffix.toLowerCase();
}

export function hasPrefixAndSuffixWithoutOverlap(
  s: string,
  prefix: string,
  suffix: string,
  caseSensitive: boolean
): boolean {
  if (prefix.length + suffix.length > s.length) return false;
  return hasPrefix(s, prefix, caseSensitive) && hasSuffix(s, suffix, caseSensitive);
}

export function compareStringsCaseInsensitiveThenSensitive(
  a: string,
  b: string
): Comparison {
  const cmp = compareStringsCaseInsensitive(a, b);
  if (cmp !== ComparisonEqual) return cmp;
  return compareStringsCaseSensitive(a, b);
}

/**
 * Case-insensitive comparison using toLowerCase() for ESLint compatibility.
 * Differs from `compareStringsCaseInsensitive` (which uses toUpperCase via Go's
 * unicode.ToUpper) for characters where upper/lower-case order diverges,
 * notably around `_` (ASCII 0x5F).
 */
export function compareStringsCaseInsensitiveEslintCompatible(
  a: string,
  b: string
): Comparison {
  if (a === b) return ComparisonEqual;
  const la = a.toLowerCase();
  const lb = b.toLowerCase();
  if (la < lb) return ComparisonLessThan;
  if (la > lb) return ComparisonGreaterThan;
  return ComparisonEqual;
}
