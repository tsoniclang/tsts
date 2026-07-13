import type { bool } from "../../../go/scalars.js";
import * as nodeFs from "node:fs";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/reparsepoint_windows.go::func::isReparsePoint","kind":"func","status":"implemented","sigHash":"d4bef745351fcd4ddf809d58eb14bebafb475ab0154b95d6c3969a6ec92e71bf"}
 *
 * Go source:
 * func isReparsePoint(path string) bool {
 * 	if len(path) >= 248 {
 * 		path = `\\?\` + path
 * 	}
 *
 * 	pathUTF16, err := syscall.UTF16PtrFromString(path)
 * 	if err != nil {
 * 		return false
 * 	}
 *
 * 	var data syscall.Win32FileAttributeData
 * 	err = syscall.GetFileAttributesEx(
 * 		pathUTF16,
 * 		syscall.GetFileExInfoStandard,
 * 		(*byte)(unsafe.Pointer(&data)),
 * 	)
 * 	if err != nil {
 * 		return false
 * 	}
 *
 * 	return data.FileAttributes&syscall.FILE_ATTRIBUTE_REPARSE_POINT != 0
 * }
 */
export function isReparsePoint(path: string): bool {
  try {
    return nodeFs.lstatSync(path).isSymbolicLink() as bool;
  } catch {
    return false as bool;
  }
}
