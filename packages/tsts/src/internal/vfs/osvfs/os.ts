import type { bool, int } from "../../../go/scalars.js";
import type { GoError, GoPtr } from "../../../go/compat.js";
import { Pool } from "../../../go/sync.js";
import type { DirEntry } from "../../../go/io/fs.js";
import type { Time } from "../../../go/time.js";
import * as goOs from "../../../go/os.js";
import * as runtime from "../../../go/runtime.js";
import { Abs as import_filepath_Abs } from "../../../go/path/filepath.js";
import { NormalizePath as tspathNormalizePath, GetDirectoryPath, NormalizeSlashes } from "../../tspath/path.js";
import { NewLimitedSemaphore } from "../../core/semaphore.js";
import type { LimitedSemaphore } from "../../core/semaphore.js";
import { Common_ReadFile, Common_DirectoryExists, Common_FileExists, Common_GetAccessibleEntries, Common_Stat, Common_WalkDir, RootLength } from "../internal/internal.js";
import type { Common } from "../internal/internal.js";
import { realpath } from "./realpath_other.js";
import { isReparsePoint } from "./reparsepoint_other.js";
import { VersionMajorMinor } from "../../core/version.js";
import { CombinePaths } from "../../tspath/path.js";
import type { Entries, FileInfo, FS as FS_a37200a9, WalkDirFunc } from "../vfs.js";

import type { GoInterface } from "../../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::varGroup::blockingOpSema+readSema+writeSema","kind":"varGroup","status":"implemented","sigHash":"0c5faa8953370a50d7ec6102bec9ee2012915304da6e4181be647e240a7fae83"}
 *
 * Go source:
 * var (
 * 	// Semaphore for operations that are effectively blocking syscalls.
 * 	blockingOpSema = core.NewLimitedSemaphore(128)
 * 	// Semaphore for file reads.
 * 	readSema = core.NewLimitedSemaphore(128)
 * 	// Semaphore for file writes.
 * 	writeSema = core.NewLimitedSemaphore(32)
 * )
 */
export let blockingOpSema: GoPtr<LimitedSemaphore> = NewLimitedSemaphore(128 as int);
export let readSema: GoPtr<LimitedSemaphore> = NewLimitedSemaphore(128 as int);
export let writeSema: GoPtr<LimitedSemaphore> = NewLimitedSemaphore(32 as int);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::func::FS","kind":"func","status":"implemented","sigHash":"df91e68c1f5edd8c68ed32c14ae401de5c838e7f516f8e209a2afe9d77ad1aa0"}
 *
 * Go source:
 * func FS() vfs.FS {
 * 	return osVFS
 * }
 */
export function FS(): GoInterface<FS_a37200a9> {
  return osVFS;
}

const _osFS: osFS = {
  common: {
    RootFor: goOs.DirFS,
    IsReparsePoint: isReparsePoint,
  },
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::varGroup::osVFS","kind":"varGroup","status":"implemented","sigHash":"0db9418b1a1698e977c6d2c8d21a5d6a7ea74625c1a6b644536cac0a7b98f78e"}
 *
 * Go source:
 * var osVFS vfs.FS = &osFS{
 * 	common: internal.Common{
 * 		RootFor:        os.DirFS,
 * 		IsReparsePoint: isReparsePoint,
 * 	},
 * }
 */
export let osVFS: GoInterface<FS_a37200a9> = {
  UseCaseSensitiveFileNames: () => osFS_UseCaseSensitiveFileNames(_osFS),
  ReadFile: (path: string) => osFS_ReadFile(_osFS, path),
  DirectoryExists: (path: string) => osFS_DirectoryExists(_osFS, path),
  FileExists: (path: string) => osFS_FileExists(_osFS, path),
  GetAccessibleEntries: (path: string) => osFS_GetAccessibleEntries(_osFS, path),
  Stat: (path: string) => osFS_Stat(_osFS, path),
  WalkDir: (root: string, walkFn: WalkDirFunc) => osFS_WalkDir(_osFS, root, walkFn),
  Realpath: (path: string) => osFS_Realpath(_osFS, path),
  WriteFile: (path: string, content: string) => osFS_WriteFile(_osFS, path, content),
  AppendFile: (path: string, content: string) => osFS_AppendFile(_osFS, path, content),
  Remove: (path: string) => osFS_Remove(_osFS, path),
  Chtimes: (path: string, aTime: Time, mTime: Time) => osFS_Chtimes(_osFS, path, aTime, mTime),
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::type::osFS","kind":"type","status":"implemented","sigHash":"f1d294754444f3c78597e1f4859fe1c1fd7653733695d28c9f96cc99068accff"}
 *
 * Go source:
 * osFS struct {
 * 	common internal.Common
 * }
 */
export interface osFS {
  common: Common;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::varGroup::isFileSystemCaseSensitive","kind":"varGroup","status":"implemented","sigHash":"d419045f49b010152c63cdd191cd84a3906cabfe575e2b036182c44bcf5100ed"}
 *
 * Go source:
 * var isFileSystemCaseSensitive = func() bool {
 * 	// win32/win64 are case insensitive platforms
 * 	if runtime.GOOS == "windows" {
 * 		return false
 * 	}
 * 
 * 	if runtime.GOARCH == "wasm" {
 * 		// !!! Who knows; this depends on the host implementation.
 * 		return true
 * 	}
 * 
 * 	// As a proxy for case-insensitivity, we check if the current executable exists under a different case.
 * 	// This is not entirely correct, since different OSs can have differing case sensitivity in different paths,
 * 	// but this is largely good enough for our purposes (and what sys.ts used to do with __filename).
 * 	exe, err := os.Executable()
 * 	if err != nil {
 * 		panic(fmt.Sprintf("vfs: failed to get executable path: %v", err))
 * 	}
 * 
 * 	// If the current executable exists under a different case, we must be case-insensitive.
 * 	swapped := swapCase(exe)
 * 	if _, err := os.Stat(swapped); err != nil {
 * 		if os.IsNotExist(err) {
 * 			return true
 * 		}
 * 		panic(fmt.Sprintf("vfs: failed to stat %q: %v", swapped, err))
 * 	}
 * 	return false
 * }()
 */
export let isFileSystemCaseSensitive: bool = (process.platform !== "win32" && process.platform !== "darwin") as bool;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::func::swapCase","kind":"func","status":"implemented","sigHash":"c2221c249631c179cca674ae987f513adaaf7a3d2d942dce0470cfca2d93f0ce"}
 *
 * Go source:
 * func swapCase(str string) string {
 * 	return strings.Map(func(r rune) rune {
 * 		upper := unicode.ToUpper(r)
 * 		if upper == r {
 * 			return unicode.ToLower(r)
 * 		} else {
 * 			return upper
 * 		}
 * 	}, str)
 * }
 */
export function swapCase(str: string): string {
  return [...str].map((c) => {
    const upper = c.toUpperCase();
    if (upper === c) {
      return c.toLowerCase();
    } else {
      return upper;
    }
  }).join("");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.UseCaseSensitiveFileNames","kind":"method","status":"implemented","sigHash":"69a0c1b3de97d53ef5b9c73c2e07896a75c800f138f61b25f9764a11799a0f1a"}
 *
 * Go source:
 * func (vfs *osFS) UseCaseSensitiveFileNames() bool {
 * 	return isFileSystemCaseSensitive
 * }
 */
export function osFS_UseCaseSensitiveFileNames(receiver: GoPtr<osFS>): bool {
  return isFileSystemCaseSensitive;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.ReadFile","kind":"method","status":"implemented","sigHash":"d2ad2fa3510ab051870506efe620ef75b63919eb58978bf10b6a18a4601099ab"}
 *
 * Go source:
 * func (vfs *osFS) ReadFile(path string) (contents string, ok bool) {
 * 	defer readSema.Acquire()()
 * 	return vfs.common.ReadFile(path)
 * }
 */
export function osFS_ReadFile(receiver: GoPtr<osFS>, path: string): [contents: string, ok: bool] {
  // defer readSema.Acquire()() — no-op in single-threaded TS
  return Common_ReadFile(receiver!.common, path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.DirectoryExists","kind":"method","status":"implemented","sigHash":"4df07d8e8ab53b7b87443aa87b48b4672831e4448427f200f6cba70739d7b2cd"}
 *
 * Go source:
 * func (vfs *osFS) DirectoryExists(path string) bool {
 * 	defer blockingOpSema.Acquire()()
 * 	return vfs.common.DirectoryExists(path)
 * }
 */
export function osFS_DirectoryExists(receiver: GoPtr<osFS>, path: string): bool {
  // defer blockingOpSema.Acquire()() — no-op in single-threaded TS
  return Common_DirectoryExists(receiver!.common, path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.FileExists","kind":"method","status":"implemented","sigHash":"5fcc1cc93022bcd84e1d8a93c90e3413b987ef4415c6d9762c1786a179dbfa3f"}
 *
 * Go source:
 * func (vfs *osFS) FileExists(path string) bool {
 * 	defer blockingOpSema.Acquire()()
 * 	return vfs.common.FileExists(path)
 * }
 */
export function osFS_FileExists(receiver: GoPtr<osFS>, path: string): bool {
  // defer blockingOpSema.Acquire()() — no-op in single-threaded TS
  return Common_FileExists(receiver!.common, path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.GetAccessibleEntries","kind":"method","status":"implemented","sigHash":"4e06ddfe3daee54de4072d4d1df59cd675a068aee6b34088cd6f1f69a764029d"}
 *
 * Go source:
 * func (vfs *osFS) GetAccessibleEntries(path string) vfs.Entries {
 * 	defer blockingOpSema.Acquire()()
 * 	return vfs.common.GetAccessibleEntries(path)
 * }
 */
export function osFS_GetAccessibleEntries(receiver: GoPtr<osFS>, path: string): Entries {
  // defer blockingOpSema.Acquire()() — no-op in single-threaded TS
  return Common_GetAccessibleEntries(receiver!.common, path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.Stat","kind":"method","status":"implemented","sigHash":"39207f3817d8a8813d536d228c51775f21c18d54cb213f3944e3f3f0fd31a6c7"}
 *
 * Go source:
 * func (vfs *osFS) Stat(path string) vfs.FileInfo {
 * 	defer blockingOpSema.Acquire()()
 * 	return vfs.common.Stat(path)
 * }
 */
export function osFS_Stat(receiver: GoPtr<osFS>, path: string): GoInterface<FileInfo> {
  // defer blockingOpSema.Acquire()() — no-op in single-threaded TS
  return Common_Stat(receiver!.common, path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::varGroup::limitedWalkDirFuncPool","kind":"varGroup","status":"implemented","sigHash":"9fcc4a6c0429cfd15f6d576c7a83ad0536e8acf7b0432f2d8118c8e6f95d59b9"}
 *
 * Go source:
 * var limitedWalkDirFuncPool = sync.Pool{
 * 	New: func() any {
 * 		w := &limitedWalkDirFunc{}
 * 		w.walk = w.walker
 * 		return w
 * 	},
 * }
 */
export let limitedWalkDirFuncPool: Pool = new Pool();
limitedWalkDirFuncPool.New = () => {
  const w: limitedWalkDirFunc = { inner: undefined as never, walk: undefined as never };
  w.walk = ((path: string, d: DirEntry, err: GoError) => limitedWalkDirFunc_walker(w, path, d, err)) as unknown as WalkDirFunc;
  return w;
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::func::getLimitedWalkDirFunc","kind":"func","status":"implemented","sigHash":"d3129e0420e85b5a1fba19e882acf61f6c6c0bac7a5daf17abb331b520fcc24d"}
 *
 * Go source:
 * func getLimitedWalkDirFunc(walkFn vfs.WalkDirFunc) *limitedWalkDirFunc {
 * 	w := limitedWalkDirFuncPool.Get().(*limitedWalkDirFunc)
 * 	w.inner = walkFn
 * 	return w
 * }
 */
export function getLimitedWalkDirFunc(walkFn: WalkDirFunc): GoPtr<limitedWalkDirFunc> {
  const w = limitedWalkDirFuncPool.Get() as limitedWalkDirFunc;
  w.inner = walkFn;
  return w;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::func::putLimitedWalkDirFunc","kind":"func","status":"implemented","sigHash":"dce6b27ffb42990cf05140727aca1e8969818433395e438a85c7e6ebed6c95c9"}
 *
 * Go source:
 * func putLimitedWalkDirFunc(w *limitedWalkDirFunc) {
 * 	w.inner = nil
 * 	limitedWalkDirFuncPool.Put(w)
 * }
 */
export function putLimitedWalkDirFunc(w: GoPtr<limitedWalkDirFunc>): void {
  w!.inner = undefined as never;
  limitedWalkDirFuncPool.Put(w!);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::type::limitedWalkDirFunc","kind":"type","status":"implemented","sigHash":"78f1411d878844de94436beb425f56c11bf504c8a3e0ddcaaa576a5e82caa2f8"}
 *
 * Go source:
 * limitedWalkDirFunc struct {
 * 	inner vfs.WalkDirFunc
 * 	walk  vfs.WalkDirFunc
 * }
 */
export interface limitedWalkDirFunc {
  inner: WalkDirFunc;
  walk: WalkDirFunc;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::limitedWalkDirFunc.walker","kind":"method","status":"implemented","sigHash":"a95013a36876cac9fefdc79eee32ebe2236522abf21fc9b85529d2de92656a8a"}
 *
 * Go source:
 * func (w *limitedWalkDirFunc) walker(path string, d fs.DirEntry, err error) error {
 * 	defer blockingOpSema.Acquire()()
 * 	return w.inner(path, d, err)
 * }
 */
export function limitedWalkDirFunc_walker(receiver: GoPtr<limitedWalkDirFunc>, path: string, d: GoInterface<DirEntry>, err: GoError): GoError {
  // defer blockingOpSema.Acquire()() — no-op in single-threaded TS
  return (receiver!.inner as unknown as (path: string, d: DirEntry, err: GoError) => GoError)(path, d!, err);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.WalkDir","kind":"method","status":"implemented","sigHash":"c0f84899a8b41406e32a86d414d4f8cc57cef3cdcfac7155986529d6231f1dda"}
 *
 * Go source:
 * func (vfs *osFS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
 * 	walker := getLimitedWalkDirFunc(walkFn)
 * 	defer putLimitedWalkDirFunc(walker)
 * 	return vfs.common.WalkDir(root, walker.walk)
 * }
 */
export function osFS_WalkDir(receiver: GoPtr<osFS>, root: string, walkFn: WalkDirFunc): GoError {
  const walker = getLimitedWalkDirFunc(walkFn);
  try {
    return Common_WalkDir(receiver!.common, root, walker!.walk);
  } finally {
    putLimitedWalkDirFunc(walker);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.Realpath","kind":"method","status":"implemented","sigHash":"c28e3f0f5a4bdacf10c178488bc5f1bd10021f1a65a68eb10e614c97fb5964a6"}
 *
 * Go source:
 * func (vfs *osFS) Realpath(path string) string {
 * 	defer blockingOpSema.Acquire()()
 * 	return osFSRealpath(path)
 * }
 */
export function osFS_Realpath(receiver: GoPtr<osFS>, path: string): string {
  // defer blockingOpSema.Acquire()() — no-op in single-threaded TS
  return osFSRealpath(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::func::osFSRealpath","kind":"func","status":"implemented","sigHash":"b19f8c1d4ab8776f6232e1d3e138f311d85bf95f118333df579cdff837e1be6a"}
 *
 * Go source:
 * func osFSRealpath(path string) string {
 * 	_ = internal.RootLength(path) // Assert path is rooted
 *
 * 	orig := path
 * 	path = filepath.FromSlash(path)
 * 	path, err := realpath(path)
 * 	if err != nil {
 * 		return orig
 * 	}
 * 	path, err = filepath.Abs(path)
 * 	if err != nil {
 * 		return orig
 * 	}
 * 	return tspath.NormalizeSlashes(path)
 * }
 */
export function osFSRealpath(path: string): string {
  void RootLength(path); // Assert path is rooted
  const orig = path;
  // filepath.FromSlash is identity for forward-slash paths
  const [resolved, realpathErr] = realpath(path);
  if (realpathErr !== undefined) {
    return orig;
  }
  const [absPath, absErr] = import_filepath_Abs(resolved);
  if (absErr !== undefined) {
    return orig;
  }
  return NormalizeSlashes(absPath);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.writeFileWithFlag","kind":"method","status":"implemented","sigHash":"0ced6a54217320edfb02202d0179c6671d293870a5c13897d036bd06fa501811"}
 *
 * Go source:
 * func (vfs *osFS) writeFileWithFlag(path string, content string, flag int) error {
 * 	defer writeSema.Acquire()()
 *
 * 	file, err := os.OpenFile(path, flag, 0o666)
 * 	if err != nil {
 * 		return err
 * 	}
 * 	defer file.Close()
 *
 * 	if _, err := file.WriteString(content); err != nil {
 * 		return err
 * 	}
 *
 * 	return nil
 * }
 */
export function osFS_writeFileWithFlag(receiver: GoPtr<osFS>, path: string, content: string, flag: int): GoError {
  // defer writeSema.Acquire()() — no-op in single-threaded TS
  const [file, openErr] = goOs.OpenFile(path, flag, 0o666) as [goOs.File, GoError];
  if (openErr !== undefined) {
    return openErr;
  }
  try {
    const [, writeErr] = (file as unknown as { WriteString: (s: string) => [number, GoError] }).WriteString(content);
    if (writeErr !== undefined) {
      return writeErr;
    }
    return undefined;
  } finally {
    (file as unknown as { Close: () => GoError }).Close();
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.ensureDirectoryExists","kind":"method","status":"implemented","sigHash":"67bbf1b19d8a4930756f29083f3c83c0f435310ab2635a19579dadb133c400c1"}
 *
 * Go source:
 * func (vfs *osFS) ensureDirectoryExists(directoryPath string) error {
 * 	defer blockingOpSema.Acquire()()
 * 	return os.MkdirAll(directoryPath, 0o777)
 * }
 */
export function osFS_ensureDirectoryExists(receiver: GoPtr<osFS>, directoryPath: string): GoError {
  // defer blockingOpSema.Acquire()() — no-op in single-threaded TS
  return goOs.MkdirAll(directoryPath, 0o777) as GoError;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.writeFileEnsuringDir","kind":"method","status":"implemented","sigHash":"75af3a003611cb6aadb123b6e3f0a8525a28ffbff30aa5baa8627347ac9ec9fe"}
 *
 * Go source:
 * func (vfs *osFS) writeFileEnsuringDir(path string, content string, flag int) error {
 * 	_ = internal.RootLength(path) // Assert path is rooted
 * 	if err := vfs.writeFileWithFlag(path, content, flag); err == nil {
 * 		return nil
 * 	}
 * 	if err := vfs.ensureDirectoryExists(tspath.GetDirectoryPath(tspath.NormalizePath(path))); err != nil {
 * 		return err
 * 	}
 * 	return vfs.writeFileWithFlag(path, content, flag)
 * }
 */
export function osFS_writeFileEnsuringDir(receiver: GoPtr<osFS>, path: string, content: string, flag: int): GoError {
  void RootLength(path); // Assert path is rooted
  const firstErr = osFS_writeFileWithFlag(receiver, path, content, flag);
  if (firstErr === undefined) {
    return undefined;
  }
  const dirErr = osFS_ensureDirectoryExists(receiver, GetDirectoryPath(tspathNormalizePath(path)));
  if (dirErr !== undefined) {
    return dirErr;
  }
  return osFS_writeFileWithFlag(receiver, path, content, flag);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.WriteFile","kind":"method","status":"implemented","sigHash":"8615e091845ff8a0e91f1dd3d20ac7e5acbb62cc4cd5730937ff6c34cb82a110"}
 *
 * Go source:
 * func (vfs *osFS) WriteFile(path string, content string) error {
 * 	return vfs.writeFileEnsuringDir(path, content, os.O_WRONLY|os.O_CREATE|os.O_TRUNC)
 * }
 */
export function osFS_WriteFile(receiver: GoPtr<osFS>, path: string, content: string): GoError {
  return osFS_writeFileEnsuringDir(receiver, path, content, ((goOs.O_WRONLY as int) | (goOs.O_CREATE as int) | (goOs.O_TRUNC as int)) as int);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.AppendFile","kind":"method","status":"implemented","sigHash":"9b0d17873207a631646dce470b6968d252cd76b56a3e90ab82cb52596779973d"}
 *
 * Go source:
 * func (vfs *osFS) AppendFile(path string, content string) error {
 * 	return vfs.writeFileEnsuringDir(path, content, os.O_WRONLY|os.O_CREATE|os.O_APPEND)
 * }
 */
export function osFS_AppendFile(receiver: GoPtr<osFS>, path: string, content: string): GoError {
  return osFS_writeFileEnsuringDir(receiver, path, content, ((goOs.O_WRONLY as int) | (goOs.O_CREATE as int) | (goOs.O_APPEND as int)) as int);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.Remove","kind":"method","status":"implemented","sigHash":"f79339638aa9d6f80e930a151b88fcdc6fbf78b4e334f5764c138d0f69682250"}
 *
 * Go source:
 * func (vfs *osFS) Remove(path string) error {
 * 	defer blockingOpSema.Acquire()()
 * 	// todo: #701 add retry mechanism?
 * 	return os.RemoveAll(path)
 * }
 */
export function osFS_Remove(receiver: GoPtr<osFS>, path: string): GoError {
  // defer blockingOpSema.Acquire()() — no-op in single-threaded TS
  return goOs.RemoveAll(path) as GoError;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::method::osFS.Chtimes","kind":"method","status":"implemented","sigHash":"343c6a2f4958833e29b78799b4b0148494b862eee464df510ad56b27768cefce"}
 *
 * Go source:
 * func (vfs *osFS) Chtimes(path string, aTime time.Time, mTime time.Time) error {
 * 	defer blockingOpSema.Acquire()()
 * 	return os.Chtimes(path, aTime, mTime)
 * }
 */
export function osFS_Chtimes(receiver: GoPtr<osFS>, path: string, aTime: Time, mTime: Time): GoError {
  // defer blockingOpSema.Acquire()() — no-op in single-threaded TS
  return goOs.Chtimes(path, aTime, mTime) as GoError;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/os.go::func::GetGlobalTypingsCacheLocation","kind":"func","status":"implemented","sigHash":"2a04d017bbef349d30fce607216fea793fe789c0241ce9b578c65858067f52bb"}
 *
 * Go source:
 * func GetGlobalTypingsCacheLocation() string {
 * 	cacheDir, err := os.UserCacheDir()
 * 	if err != nil {
 * 		cacheDir = os.TempDir()
 * 	}
 *
 * 	var subdir string
 * 	if runtime.GOOS == "windows" {
 * 		subdir = "Microsoft/TypeScript"
 * 	} else {
 * 		subdir = "typescript"
 * 	}
 * 	return tspath.CombinePaths(cacheDir, subdir, core.VersionMajorMinor())
 * }
 */
export function GetGlobalTypingsCacheLocation(): string {
  const [userCacheDir, userCacheDirErr] = goOs.UserCacheDir() as [string, GoError];
  const cacheDir = userCacheDirErr !== undefined ? (goOs.TempDir() as string) : userCacheDir;
  const subdir = (runtime.GOOS as string) === "windows" ? "Microsoft/TypeScript" : "typescript";
  return CombinePaths(cacheDir, subdir, VersionMajorMinor());
}
