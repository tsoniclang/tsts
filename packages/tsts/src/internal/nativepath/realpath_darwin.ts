import type { GoError } from "../../go/compat.js";
import { nodeRealpath } from "./node_host.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/nativepath/realpath_darwin.go::func::Realpath","kind":"func","status":"implemented","sigHash":"d3268f3d2d02bd7a7b7bb6ec7a50b67fd2d89738798baed9229942884b3db182","bodyHash":"4e79e803fb81762f2be094b5108136d18025d78539b812711945d9367825992f"}
 * @tsgo-override {"category":"host-native","allow":["body"],"reason":"Node fs.realpathSync.native owns the Darwin canonical-path syscall boundary and preserves the path-or-error contract without exposing F_GETPATH or generated syscall facades."}
 *
 * Go source:
 * func Realpath(path string) (string, error) {
 * 	if !hasFGetPath() {
 * 		return filepath.EvalSymlinks(path)
 * 	}
 *
 * 	fd, err := unix.Open(path, unix.O_EVTONLY|unix.O_NONBLOCK|unix.O_CLOEXEC, 0)
 * 	if err != nil {
 * 		return "", err
 * 	}
 * 	defer unix.Close(fd)
 *
 * 	var buf [unix.PathMax]byte
 * 	if _, err := fcntlGetPath(fd, &buf); err != nil {
 * 		return "", err
 * 	}
 *
 * 	return unix.ByteSliceToString(buf[:]), nil
 * }
 */
export function Realpath(path: string): [string, GoError] {
  return nodeRealpath(path);
}
