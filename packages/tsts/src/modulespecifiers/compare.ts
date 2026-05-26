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
  const start = path.startsWith("./") ? 2 : 0;
  let count = 0;
  for (let i = start; i < path.length; i += 1) {
    if (path[i] === "/") count += 1;
  }
  return count;
}
