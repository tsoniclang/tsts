import type { GoError } from "../../go/compat.js";
import { nodeRealpath } from "./node_host.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/nativepath/realpath_windows.go::func::Realpath","kind":"func","status":"implemented","sigHash":"d3268f3d2d02bd7a7b7bb6ec7a50b67fd2d89738798baed9229942884b3db182","bodyHash":"2f0a968e51eeb011c24f2c606d8a014d68a0fb15b86410d6679069ecf148c10d"}
 * @tsgo-override {"category":"host-native","allow":["body"],"reason":"Node fs.realpathSync.native uses the native Windows path implementation and preserves the path-or-error contract without exposing Win32 handles or generated syscall facades."}
 *
 * Go source:
 * func Realpath(path string) (string, error) {
 * 	var h windows.Handle
 * 	if len(path) < 248 {
 * 		var err error
 * 		h, err = openMetadata(path)
 * 		if err != nil {
 * 			return "", err
 * 		}
 * 		defer windows.CloseHandle(h) //nolint:errcheck
 * 	} else {
 * 		// For long paths, defer to os.Open to run the path through fixLongPath.
 * 		f, err := os.Open(path)
 * 		if err != nil {
 * 			return "", err
 * 		}
 * 		defer f.Close()
 *
 * 		// Works on directories too since https://go.dev/cl/405275.
 * 		h = windows.Handle(f.Fd())
 * 	}
 *
 * 	// based on https://github.com/golang/go/blob/f4e3ec3dbe3b8e04a058d266adf8e048bab563f2/src/os/file_windows.go#L389
 *
 * 	const _VOLUME_NAME_DOS = 0
 *
 * 	buf := make([]uint16, 310) // https://github.com/microsoft/go-winio/blob/3c9576c9346a1892dee136329e7e15309e82fb4f/internal/stringbuffer/wstring.go#L13
 * 	for {
 * 		n, err := windows.GetFinalPathNameByHandle(h, &buf[0], uint32(len(buf)), _VOLUME_NAME_DOS)
 * 		if err != nil {
 * 			return "", err
 * 		}
 * 		if n < uint32(len(buf)) {
 * 			break
 * 		}
 * 		buf = make([]uint16, n)
 * 	}
 *
 * 	s := syscall.UTF16ToString(buf)
 * 	if len(s) > 4 && s[:4] == `\\?\` {
 * 		s = s[4:]
 * 		if len(s) > 3 && s[:3] == `UNC` {
 * 			// return path like \\server\share\...
 * 			return `\` + s[3:], nil
 * 		}
 * 		return s, nil
 * 	}
 *
 * 	return "", errors.New("GetFinalPathNameByHandle returned unexpected path: " + s)
 * }
 */
export function Realpath(path: string): [string, GoError] {
  return nodeRealpath(path);
}
