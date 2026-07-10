import type { GoError } from "../../go/compat.js";
import { nodeRealpath } from "./node_host.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/nativepath/realpath_linux.go::func::Realpath","kind":"func","status":"implemented","sigHash":"d3268f3d2d02bd7a7b7bb6ec7a50b67fd2d89738798baed9229942884b3db182","bodyHash":"d092d3948623cbf2130a60e40a6c34a898c5515219dfdbf7933f01b044077e63"}
 * @tsgo-override {"category":"host-native","allow":["body"],"reason":"Node fs.realpathSync.native owns the Linux canonical-path syscall boundary and preserves the path-or-error contract without exposing procfs file descriptors or generated syscall facades."}
 *
 * Go source:
 * func Realpath(path string) (string, error) {
 * 	if !hasProcSelfFD() {
 * 		return filepath.EvalSymlinks(path)
 * 	}
 *
 * 	fd, err := ignoringEINTR(func() (int, error) {
 * 		return unix.Open(path, unix.O_CLOEXEC|unix.O_PATH, 0)
 * 	})
 * 	if err != nil {
 * 		return "", &os.PathError{Op: "open", Path: path, Err: err}
 * 	}
 * 	defer unix.Close(fd)
 *
 * 	var procBuf [len(_procSelfFD) + 20]byte // 20 digits is enough for any int64 fd
 * 	n := copy(procBuf[:], _procSelfFD)
 * 	n += copy(procBuf[n:], strconv.Itoa(fd))
 * 	procPath := string(procBuf[:n])
 *
 * 	buf := make([]byte, 256)
 * 	for {
 * 		nn, err := ignoringEINTR(func() (int, error) {
 * 			return unix.Readlink(procPath, buf)
 * 		})
 * 		if err != nil {
 * 			return "", &os.PathError{Op: "readlink", Path: path, Err: err}
 * 		}
 * 		if nn < len(buf) {
 * 			return string(buf[:nn]), nil
 * 		}
 * 		buf = make([]byte, len(buf)*2)
 * 	}
 * }
 */
export function Realpath(path: string): [string, GoError] {
  return nodeRealpath(path);
}
