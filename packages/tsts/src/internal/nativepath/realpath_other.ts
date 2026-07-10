import type { GoError } from "../../go/compat.js";
import { nodeRealpath } from "./node_host.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/nativepath/realpath_other.go::func::Realpath","kind":"func","status":"implemented","sigHash":"d3268f3d2d02bd7a7b7bb6ec7a50b67fd2d89738798baed9229942884b3db182","bodyHash":"b88c74c86ec53c2632a7e3f160ad1879aa3e696eebe81a97b93e86ca6586fc15"}
 * @tsgo-override {"category":"host-native","allow":["body"],"reason":"The Node host terminates the platform-specific nativepath implementations at fs.realpathSync.native, which supplies the OS canonical-path operation without routing through generated syscall facades."}
 *
 * Go source:
 * func Realpath(path string) (string, error) {
 * 	return filepath.EvalSymlinks(path)
 * }
 */
export function Realpath(path: string): [string, GoError] {
  return nodeRealpath(path);
}
