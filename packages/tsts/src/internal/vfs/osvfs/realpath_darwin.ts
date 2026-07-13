import type { bool, byte, int, nuint } from "../../../go/scalars.js";
import type { GoArray, GoError, GoPtr } from "../../../go/compat.js";
import { OnceValue } from "../../../go/sync.js";
import * as nodeFs from "node:fs";

// On macOS, we use open + fcntl(F_GETPATH) to resolve the canonical path in
// O(1) syscalls instead of Go's filepath.EvalSymlinks which does an lstat per
// path component — O(depth).
//
// How it works:
//   - open(path, O_EVTONLY|O_NONBLOCK|O_CLOEXEC) follows all symlinks and gives
//     us a lightweight fd. O_EVTONLY is macOS's event-only descriptor — it
//     doesn't require read permission (similar to Linux's O_PATH) but still
//     references the vnode. O_NONBLOCK prevents blocking on FIFOs.
//   - fcntl(fd, F_GETPATH, buf) asks the kernel for the canonical path of the
//     open file descriptor, written into a MAXPATHLEN buffer.
//
// unix.FcntlInt takes an int arg, so call it through a uintptr-escaping wrapper
// to keep the buffer pointer valid until fcntl returns.

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/realpath_darwin.go::varGroup::hasFGetPath","kind":"varGroup","status":"implemented","sigHash":"f4e17646e1758a2d23a07ea132bb3f55306c277449040f55e927305c55ac339d"}
 *
 * Go source:
 * var hasFGetPath = sync.OnceValue(func() bool {
 * 	// Verify that F_GETPATH is supported by this kernel version.
 * 	var buf [unix.PathMax]byte
 * 	fd, err := unix.Open(".", unix.O_EVTONLY|unix.O_NONBLOCK|unix.O_CLOEXEC, 0)
 * 	if err != nil {
 * 		return false
 * 	}
 * 	defer unix.Close(fd)
 * 	_, err = fcntlGetPath(fd, &buf)
 * 	return err == nil
 * })
 */
export let hasFGetPath: () => bool = OnceValue<bool>((): bool => {
  return (process.platform === "darwin") as bool;
});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/realpath_darwin.go::func::fcntlGetPath","kind":"func","status":"implemented","sigHash":"c3d32af16bd092e200e33ccc3925ac84d2a44b88d463d453c5e3698e86c508ad"}
 *
 * Go source:
 * func fcntlGetPath(fd int, buf *[unix.PathMax]byte) (int, error) {
 * 	return ignoringEINTR(func() (int, error) {
 * 		return fcntlGetPathPtr(uintptr(fd), uintptr(unsafe.Pointer(&buf[0])))
 * 	})
 * }
 */
export function fcntlGetPath(fd: int, buf: GoPtr<GoArray<byte, "1024">>): [int, GoError] {
  try {
    const resolved = new TextEncoder().encode(nodeFs.realpathSync.native(`/dev/fd/${fd}`));
    if (buf === undefined || resolved.length >= buf.length) {
      return [0 as int, new globalThis.Error("resolved path does not fit in F_GETPATH buffer")];
    }
    for (let index = 0; index < resolved.length; index++) buf[index] = resolved[index] as byte;
    buf[resolved.length] = 0 as byte;
    return [0 as int, undefined];
  } catch (error) {
    return [0 as int, error instanceof globalThis.Error ? error : new globalThis.Error(String(error))];
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/realpath_darwin.go::func::fcntlGetPathPtr","kind":"func","status":"implemented","sigHash":"6f0ed32d566aee9ecfefe783c459dee2ef92415c70ef92a26ee2287c93d56894"}
 *
 * Go source:
 * //go:uintptrescapes
 * func fcntlGetPathPtr(fd uintptr, buf uintptr) (int, error) {
 * 	return unix.FcntlInt(fd, unix.F_GETPATH, int(buf))
 * }
 */
export function fcntlGetPathPtr(fd: nuint, buf: nuint): [int, GoError] {
  void fd;
  void buf;
  return [0 as int, new globalThis.Error("raw F_GETPATH pointers are unavailable on the Node host")];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/realpath_darwin.go::func::realpath","kind":"func","status":"implemented","sigHash":"508722058bcc5fa76607b13bc59e8f966d9f9163f69d336a8e1b7975a4fdb721"}
 *
 * Go source:
 * func realpath(path string) (string, error) {
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
export function realpath(path: string): [string, GoError] {
  try {
    return [nodeFs.realpathSync.native(path), undefined];
  } catch (error) {
    return ["", error instanceof globalThis.Error ? error : new globalThis.Error(String(error))];
  }
}
