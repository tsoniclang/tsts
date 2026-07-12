import type { bool } from "../../go/scalars.js";
import type { GoSlice } from "../../go/compat.js";
import * as strings from "../../go/strings.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/ignoredpaths.go::varGroup::ignoredPaths","kind":"varGroup","status":"implemented","sigHash":"cbc3fa9c91a10ef0e895e56c60144ef999ac95e79d0ab2679d0631c4b8832b18"}
 *
 * Go source:
 * var ignoredPaths = []string{
 * 	"/node_modules/.",
 * 	"/.git",
 * 	".#",
 * }
 */
export let ignoredPaths: GoSlice<string> = ["/node_modules/.", "/.git", ".#"];

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
  for (const pattern of ignoredPaths) {
    if (strings.Contains(path, pattern)) {
      return true;
    }
  }
  return false;
}
