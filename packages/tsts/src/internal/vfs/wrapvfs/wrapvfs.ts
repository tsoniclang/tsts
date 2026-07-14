import type { bool } from "../../../go/scalars.js";
import type { GoError, GoPtr } from "../../../go/compat.js";
import type { Time } from "../../../go/time.js";
import type { Entries, FileInfo, FS, WalkDirFunc } from "../vfs.js";

import type { GoFunc, GoInterface } from "../../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::type::Replacements","kind":"type","status":"implemented","sigHash":"38f6b3682164b5d419adb0f02146de4e16cc857e03bb44d66a66e059c0aa3cb9"}
 *
 * Go source:
 * Replacements struct {
 * 	UseCaseSensitiveFileNames func() bool
 * 	FileExists                func(string) bool
 * 	ReadFile                  func(string) (string, bool)
 * 	WriteFile                 func(string, string) error
 * 	AppendFile                func(string, string) error
 * 	Remove                    func(string) error
 * 	Chtimes                   func(string, time.Time, time.Time) error
 * 	DirectoryExists           func(string) bool
 * 	GetAccessibleEntries      func(string) vfs.Entries
 * 	Stat                      func(string) vfs.FileInfo
 * 	WalkDir                   func(string, vfs.WalkDirFunc) error
 * 	Realpath                  func(string) string
 * }
 */
export interface Replacements {
  UseCaseSensitiveFileNames: GoFunc<() => bool>;
  FileExists: GoFunc<(arg0: string) => bool>;
  ReadFile: GoFunc<(arg0: string) => [string, bool]>;
  WriteFile: GoFunc<(arg0: string, arg1: string) => GoError>;
  AppendFile: GoFunc<(arg0: string, arg1: string) => GoError>;
  Remove: GoFunc<(arg0: string) => GoError>;
  Chtimes: GoFunc<(arg0: string, arg1: Time, arg2: Time) => GoError>;
  DirectoryExists: GoFunc<(arg0: string) => bool>;
  GetAccessibleEntries: GoFunc<(arg0: string) => Entries>;
  Stat: GoFunc<(arg0: string) => GoInterface<FileInfo>>;
  WalkDir: GoFunc<(arg0: string, arg1: WalkDirFunc) => GoError>;
  Realpath: GoFunc<(arg0: string) => string>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::func::Wrap","kind":"func","status":"implemented","sigHash":"f7080c63bde43ead409ae534899aa90352977d432e1ca320a8ed6dc053fed746"}
 *
 * Go source:
 * func Wrap(fs vfs.FS, replacements Replacements) vfs.FS {
 * 	return &wrappedFS{
 * 		fs:           fs,
 * 		replacements: replacements,
 * 	}
 * }
 */
export function Wrap(fs: GoInterface<FS>, replacements: Replacements): GoInterface<FS> {
  const w: wrappedFS = { fs, replacements };
  return wrappedFS_as_vfs_FS(w);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::type::wrappedFS","kind":"type","status":"implemented","sigHash":"cc3c5df3b97c93352813c694b8314865647cc6350ea3a9adf832c7d033bc82c0"}
 *
 * Go source:
 * wrappedFS struct {
 * 	fs           vfs.FS
 * 	replacements Replacements
 * }
 */
export interface wrappedFS {
  fs: GoInterface<FS>;
  replacements: Replacements;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::method::wrappedFS.UseCaseSensitiveFileNames","kind":"method","status":"implemented","sigHash":"30b1ef7bc0ecb432ca4d58a4058a83be47995173273bd972127e918c8400d7f9"}
 *
 * Go source:
 * func (w *wrappedFS) UseCaseSensitiveFileNames() bool {
 * 	if w.replacements.UseCaseSensitiveFileNames != nil {
 * 		return w.replacements.UseCaseSensitiveFileNames()
 * 	}
 * 	return w.fs.UseCaseSensitiveFileNames()
 * }
 */
export function wrappedFS_UseCaseSensitiveFileNames(receiver: GoPtr<wrappedFS>): bool {
  if (receiver!.replacements.UseCaseSensitiveFileNames !== undefined) {
    return receiver!.replacements.UseCaseSensitiveFileNames();
  }
  return receiver!.fs!.UseCaseSensitiveFileNames();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::method::wrappedFS.FileExists","kind":"method","status":"implemented","sigHash":"d6c44db352687d51b3a2d3f929c52991681f90e358269edb409238158085fde5"}
 *
 * Go source:
 * func (w *wrappedFS) FileExists(path string) bool {
 * 	if w.replacements.FileExists != nil {
 * 		return w.replacements.FileExists(path)
 * 	}
 * 	return w.fs.FileExists(path)
 * }
 */
export function wrappedFS_FileExists(receiver: GoPtr<wrappedFS>, path: string): bool {
  if (receiver!.replacements.FileExists !== undefined) {
    return receiver!.replacements.FileExists(path);
  }
  return receiver!.fs!.FileExists(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::method::wrappedFS.ReadFile","kind":"method","status":"implemented","sigHash":"d290ad08854a1d5194b33ce45827e835e5a19f18461e8186da4dbf72c62ba845"}
 *
 * Go source:
 * func (w *wrappedFS) ReadFile(path string) (contents string, ok bool) {
 * 	if w.replacements.ReadFile != nil {
 * 		return w.replacements.ReadFile(path)
 * 	}
 * 	return w.fs.ReadFile(path)
 * }
 */
export function wrappedFS_ReadFile(receiver: GoPtr<wrappedFS>, path: string): [contents: string, ok: bool] {
  if (receiver!.replacements.ReadFile !== undefined) {
    return receiver!.replacements.ReadFile(path);
  }
  return receiver!.fs!.ReadFile(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::method::wrappedFS.WriteFile","kind":"method","status":"implemented","sigHash":"055d697530bdb36182d49f823332a0ce07448b991a9353eac8571f49187661cb"}
 *
 * Go source:
 * func (w *wrappedFS) WriteFile(path string, data string) error {
 * 	if w.replacements.WriteFile != nil {
 * 		return w.replacements.WriteFile(path, data)
 * 	}
 * 	return w.fs.WriteFile(path, data)
 * }
 */
export function wrappedFS_WriteFile(receiver: GoPtr<wrappedFS>, path: string, data: string): GoError {
  if (receiver!.replacements.WriteFile !== undefined) {
    return receiver!.replacements.WriteFile(path, data);
  }
  return receiver!.fs!.WriteFile(path, data);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::method::wrappedFS.AppendFile","kind":"method","status":"implemented","sigHash":"e9986d661049321d1b498acb3b587f1a8d30d3392ca90b3359828de8f9fd3406"}
 *
 * Go source:
 * func (w *wrappedFS) AppendFile(path string, data string) error {
 * 	if w.replacements.AppendFile != nil {
 * 		return w.replacements.AppendFile(path, data)
 * 	}
 * 	return w.fs.AppendFile(path, data)
 * }
 */
export function wrappedFS_AppendFile(receiver: GoPtr<wrappedFS>, path: string, data: string): GoError {
  if (receiver!.replacements.AppendFile !== undefined) {
    return receiver!.replacements.AppendFile(path, data);
  }
  return receiver!.fs!.AppendFile(path, data);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::method::wrappedFS.Remove","kind":"method","status":"implemented","sigHash":"0bf343da665768d0799f41e2fe023f1212af624720103e8546c8d1f2b8bd93b9"}
 *
 * Go source:
 * func (w *wrappedFS) Remove(path string) error {
 * 	if w.replacements.Remove != nil {
 * 		return w.replacements.Remove(path)
 * 	}
 * 	return w.fs.Remove(path)
 * }
 */
export function wrappedFS_Remove(receiver: GoPtr<wrappedFS>, path: string): GoError {
  if (receiver!.replacements.Remove !== undefined) {
    return receiver!.replacements.Remove(path);
  }
  return receiver!.fs!.Remove(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::method::wrappedFS.Chtimes","kind":"method","status":"implemented","sigHash":"8bd275718c8f8d71d8509bbae46c8952aa8210b6458bb76c756a26d95e349fbe"}
 *
 * Go source:
 * func (w *wrappedFS) Chtimes(path string, aTime time.Time, mTime time.Time) error {
 * 	if w.replacements.Chtimes != nil {
 * 		return w.replacements.Chtimes(path, aTime, mTime)
 * 	}
 * 	return w.fs.Chtimes(path, aTime, mTime)
 * }
 */
export function wrappedFS_Chtimes(receiver: GoPtr<wrappedFS>, path: string, aTime: Time, mTime: Time): GoError {
  if (receiver!.replacements.Chtimes !== undefined) {
    return receiver!.replacements.Chtimes(path, aTime, mTime);
  }
  return receiver!.fs!.Chtimes(path, aTime, mTime);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::method::wrappedFS.DirectoryExists","kind":"method","status":"implemented","sigHash":"0052ce77f95ffb1bc42198bba6c74b02a1a8d67404981f036701a3004ade31a7"}
 *
 * Go source:
 * func (w *wrappedFS) DirectoryExists(path string) bool {
 * 	if w.replacements.DirectoryExists != nil {
 * 		return w.replacements.DirectoryExists(path)
 * 	}
 * 	return w.fs.DirectoryExists(path)
 * }
 */
export function wrappedFS_DirectoryExists(receiver: GoPtr<wrappedFS>, path: string): bool {
  if (receiver!.replacements.DirectoryExists !== undefined) {
    return receiver!.replacements.DirectoryExists(path);
  }
  return receiver!.fs!.DirectoryExists(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::method::wrappedFS.GetAccessibleEntries","kind":"method","status":"implemented","sigHash":"c6aeb16e5201586670d65137475922f33da53ec77cab4b3fa6c0b5b92af752e0"}
 *
 * Go source:
 * func (w *wrappedFS) GetAccessibleEntries(path string) vfs.Entries {
 * 	if w.replacements.GetAccessibleEntries != nil {
 * 		return w.replacements.GetAccessibleEntries(path)
 * 	}
 * 	return w.fs.GetAccessibleEntries(path)
 * }
 */
export function wrappedFS_GetAccessibleEntries(receiver: GoPtr<wrappedFS>, path: string): Entries {
  if (receiver!.replacements.GetAccessibleEntries !== undefined) {
    return receiver!.replacements.GetAccessibleEntries(path);
  }
  return receiver!.fs!.GetAccessibleEntries(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::method::wrappedFS.Stat","kind":"method","status":"implemented","sigHash":"764d53b6b07929d966b957da9b3a4315c61c13da336ac799dca257b2cde4b119"}
 *
 * Go source:
 * func (w *wrappedFS) Stat(path string) vfs.FileInfo {
 * 	if w.replacements.Stat != nil {
 * 		return w.replacements.Stat(path)
 * 	}
 * 	return w.fs.Stat(path)
 * }
 */
export function wrappedFS_Stat(receiver: GoPtr<wrappedFS>, path: string): GoInterface<FileInfo> {
  if (receiver!.replacements.Stat !== undefined) {
    return receiver!.replacements.Stat(path);
  }
  return receiver!.fs!.Stat(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::method::wrappedFS.WalkDir","kind":"method","status":"implemented","sigHash":"8e92328a7cff6994a6965e96314300db718ac16429e2e5d3ed2851fa4159e4ac"}
 *
 * Go source:
 * func (w *wrappedFS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
 * 	if w.replacements.WalkDir != nil {
 * 		return w.replacements.WalkDir(root, walkFn)
 * 	}
 * 	return w.fs.WalkDir(root, walkFn)
 * }
 */
export function wrappedFS_WalkDir(receiver: GoPtr<wrappedFS>, root: string, walkFn: WalkDirFunc): GoError {
  if (receiver!.replacements.WalkDir !== undefined) {
    return receiver!.replacements.WalkDir(root, walkFn);
  }
  return receiver!.fs!.WalkDir(root, walkFn);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::method::wrappedFS.Realpath","kind":"method","status":"implemented","sigHash":"78f2b8e6348e8b9e2fdcee5765cc999b4c779128e9db12f932ee4c814a1d1884"}
 *
 * Go source:
 * func (w *wrappedFS) Realpath(path string) string {
 * 	if w.replacements.Realpath != nil {
 * 		return w.replacements.Realpath(path)
 * 	}
 * 	return w.fs.Realpath(path)
 * }
 */
export function wrappedFS_Realpath(receiver: GoPtr<wrappedFS>, path: string): string {
  if (receiver!.replacements.Realpath !== undefined) {
    return receiver!.replacements.Realpath(path);
  }
  return receiver!.fs!.Realpath(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/wrapvfs/wrapvfs.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"bf43051dbf5443359d945ee6f538cadaf617e6c30585a226b391502e8ff2cb44"}
 *
 * Go source:
 * var _ vfs.FS = (*wrappedFS)(nil)
 */
export let __f805346f_0: GoInterface<FS> = wrappedFS_as_vfs_FS(undefined);

export function wrappedFS_as_vfs_FS(receiver: GoPtr<wrappedFS>): FS {
  return {
    UseCaseSensitiveFileNames: (): bool => wrappedFS_UseCaseSensitiveFileNames(receiver),
    FileExists: (path: string): bool => wrappedFS_FileExists(receiver, path),
    ReadFile: (path: string): [string, bool] => wrappedFS_ReadFile(receiver, path),
    WriteFile: (path: string, data: string): GoError => wrappedFS_WriteFile(receiver, path, data),
    AppendFile: (path: string, data: string): GoError => wrappedFS_AppendFile(receiver, path, data),
    Remove: (path: string): GoError => wrappedFS_Remove(receiver, path),
    Chtimes: (path: string, aTime: Time, mTime: Time): GoError => wrappedFS_Chtimes(receiver, path, aTime, mTime),
    DirectoryExists: (path: string): bool => wrappedFS_DirectoryExists(receiver, path),
    GetAccessibleEntries: (path: string): Entries => wrappedFS_GetAccessibleEntries(receiver, path),
    Stat: (path: string): GoInterface<FileInfo> => wrappedFS_Stat(receiver, path),
    WalkDir: (root: string, walkFn: WalkDirFunc): GoError => wrappedFS_WalkDir(receiver, root, walkFn),
    Realpath: (path: string): string => wrappedFS_Realpath(receiver, path),
  };
}
