import type { bool, int } from "../../go/scalars.js";
import * as syscall from "../../go/syscall.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/nativepath/symlink_windows.go::func::IsSymlinkOrReparsePoint","kind":"func","status":"implemented","sigHash":"296ae0ab197f64d4e2c052aa779106c8480671870550027a943702a803f4fdd5","bodyHash":"74a75c2b9c39f068afc56287e2fd330deefc0b50576f9f47a289a99a840591e7"}
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
  let p = path;
  if (p.length >= 248) {
    p = "\\\\?\\" + p;
  }

  const [pathUTF16, pathUTF16Err] = syscall.UTF16PtrFromString(p) as [unknown, { message: string } | undefined];
  if (pathUTF16Err !== undefined) {
    return false as bool;
  }

  const data = { FileAttributes: 0 as int };
  const getAttrErr = syscall.GetFileAttributesEx(
    pathUTF16,
    syscall.GetFileExInfoStandard,
    data,
  ) as { message: string } | undefined;
  if (getAttrErr !== undefined) {
    return false as bool;
  }

  return ((data.FileAttributes & (syscall.FILE_ATTRIBUTE_REPARSE_POINT as int)) !== 0) as bool;
}
