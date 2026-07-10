import type { bool } from "../../go/scalars.js";
import * as nodeFs from "node:fs";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/nativepath/symlink_other.go::func::IsSymlinkOrReparsePoint","kind":"func","status":"implemented","sigHash":"296ae0ab197f64d4e2c052aa779106c8480671870550027a943702a803f4fdd5","bodyHash":"129fa451d885396871d1b75d628691664befb9a07fffda454eef1fd549908583"}
 * @tsgo-override {"category":"runtime-representation","allow":["body"],"reason":"Go os.Lstat returns an error value while Node lstatSync throws; the catch maps that throw to the same false result and the successful path tests the same symbolic-link mode."}
 *
 * Go source:
 * func IsSymlinkOrReparsePoint(path string) bool {
 * 	info, err := os.Lstat(path)
 * 	return err == nil && info.Mode()&os.ModeSymlink != 0
 * }
 */
export function IsSymlinkOrReparsePoint(path: string): bool {
  try {
    return nodeFs.lstatSync(path).isSymbolicLink() as bool;
  } catch {
    return false as bool;
  }
}
