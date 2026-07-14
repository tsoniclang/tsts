import type { bool } from "../../go/scalars.js";
import type { GoSlice } from "../../go/compat.js";
import * as strings from "../../go/strings.js";
import { GoSliceBuild, GoSliceStore, GoStringValueOps } from "../../go/compat.js";
import { GoSliceLoad } from "../../go/compat.js";



/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/ignoredpaths.go::varGroup::ignoredPaths","kind":"varGroup","status":"implemented","sigHash":"7c9207728c2eb7199e5aa5d51da935cd70befa9435473967f349ec3a24aaca49"}
 *
 * Go source:
 * var ignoredPaths = []string{
 * 	"/node_modules/.",
 * 	"/.git",
 * 	".#",
 * }
 */
export let ignoredPaths: GoSlice<string> = GoSliceBuild(3, 3, GoStringValueOps, (__goSliceLiteral) => {
  GoSliceStore(__goSliceLiteral, 0, "/node_modules/.", GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 1, "/.git", GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 2, ".#", GoStringValueOps);
});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/ignoredpaths.go::func::ContainsIgnoredPath","kind":"func","status":"implemented","sigHash":"0ab7ac9a02a1bf077778f62fc167cb887d2b5bb911c5896f0b12b231c7a449fa"}
 *
 * Go source:
 * func ContainsIgnoredPath(path string) bool {
 * 	for _, pattern := range ignoredPaths {
 * 		if strings.Contains(path, pattern) {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function ContainsIgnoredPath(path: string): bool {
  for (
    let __goRangeSlice = ignoredPaths,
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoStringValueOps,
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const pattern = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    if (strings.Contains(path, pattern)) {
      return true;
    }
  }
  return false;
}
