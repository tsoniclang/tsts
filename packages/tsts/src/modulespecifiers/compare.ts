/**
 * Path-component comparison helpers used by the specifier generator
 * when choosing between equally-valid specifiers.
 *
 * Port of TS-Go `internal/modulespecifiers/compare.go`.
 */

/**
 * Counts `/` separators in a path, skipping the leading `./` when
 * present. Used to rank candidate specifiers by depth.
 *
 * Mirrors TS-Go `CountPathComponents`.
 */
export function countPathComponents(path: string): number {
  let initial = 0;
  if (path.startsWith("./")) {
    initial = 2;
  }
  return stringsCount(path.slice(initial), "/");
}

/** Mirrors Go `strings.Count`: number of non-overlapping `substr` in `s`. */
function stringsCount(s: string, substr: string): number {
  if (substr.length === 0) {
    return s.length + 1;
  }
  let count = 0;
  let index = s.indexOf(substr);
  while (index !== -1) {
    count += 1;
    index = s.indexOf(substr, index + substr.length);
  }
  return count;
}
