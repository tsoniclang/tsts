/**
 * Binary search helper.
 *
 * Port of TS-Go `internal/core/binarysearch.go`.
 */

/**
 * Works like Go's `slices.BinarySearchFunc`, but avoids extra invocations of
 * the comparison function by assuming that only one element in the slice could
 * match the target. Also, unlike `slices.BinarySearchFunc`, the comparison
 * function is passed the current index of the element being compared, instead
 * of the target element.
 *
 * Returns `{ index, match }` where `index` is the position of a matching
 * element (when `match` is true) or the insertion point otherwise.
 */
export function binarySearchUniqueFunc<E>(
  x: readonly E[],
  cmp: (index: number, element: E) => number,
): { readonly index: number; readonly match: boolean } {
  const n = x.length;
  if (n === 0) {
    return { index: 0, match: false };
  }
  let low = 0;
  let high = n - 1;
  while (low <= high) {
    const middle = low + ((high - low) >> 1);
    const value = cmp(middle, x[middle]!);
    if (value < 0) {
      low = middle + 1;
    } else if (value > 0) {
      high = middle - 1;
    } else {
      return { index: middle, match: true };
    }
  }
  return { index: low, match: false };
}
