import type { bool } from "../../go/scalars.js";
import { nodeIsSymlinkOrReparsePoint } from "./node_host.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/nativepath/symlink_windows.go::func::IsSymlinkOrReparsePoint","kind":"func","status":"implemented","sigHash":"296ae0ab197f64d4e2c052aa779106c8480671870550027a943702a803f4fdd5","bodyHash":"74a75c2b9c39f068afc56287e2fd330deefc0b50576f9f47a289a99a840591e7"}
 * @tsgo-override {"category":"host-native","allow":["body"],"reason":"Node fs.lstatSync owns Windows reparse-point classification and preserves the false-on-error boolean contract without exposing Win32 buffers or generated syscall facades."}
 *
 * Go source:
 * func IsSymlinkOrReparsePoint(path string) bool {
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
export function IsSymlinkOrReparsePoint(path: string): bool {
  return nodeIsSymlinkOrReparsePoint(path);
}
