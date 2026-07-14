import type { bool } from "../../go/scalars.js";
import type { GoError, GoInterface, GoMap, GoPtr, GoSlice } from "../../go/compat.js";
import type { DirEntry as DirEntry_697d4ab0, FileInfo as FileInfo_d0619f84, WalkDirFunc as WalkDirFunc_40040532 } from "../../go/io/fs.js";
import { ErrInvalid as fs_ErrInvalid, ErrPermission as fs_ErrPermission, ErrExist as fs_ErrExist, ErrNotExist as fs_ErrNotExist, ErrClosed as fs_ErrClosed, SkipAll as fs_SkipAll, SkipDir as fs_SkipDir } from "../../go/io/fs.js";
import type { Time } from "../../go/time.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfs.go::type::FS","kind":"type","status":"implemented","sigHash":"9f61340eb4bc66d02f7244288b5e177cce4c7f226f831463f931cab632d8504c"}
 *
 * Go source:
 * FS interface {
 * 	// UseCaseSensitiveFileNames returns true if the file system is case-sensitive.
 * 	UseCaseSensitiveFileNames() bool
 * 
 * 	// FileExists returns true if the file exists.
 * 	FileExists(path string) bool
 * 
 * 	// ReadFile reads the file specified by path and returns the content.
 * 	// If the file fails to be read, ok will be false.
 * 	ReadFile(path string) (contents string, ok bool)
 * 
 * 	WriteFile(path string, data string) error
 * 
 * 	// AppendFile appends data to the file at path, creating it if it does not exist.
 * 	AppendFile(path string, data string) error
 * 
 * 	// Removes `path` and all its contents. Will return the first error it encounters.
 * 	Remove(path string) error
 * 
 * 	// Chtimes changes the access and modification times of the named
 * 	Chtimes(path string, aTime time.Time, mTime time.Time) error
 * 
 * 	// DirectoryExists returns true if the path is a directory.
 * 	DirectoryExists(path string) bool
 * 
 * 	// GetAccessibleEntries returns the files/directories in the specified directory.
 * 	// If any entry is a symlink, it will be followed.
 * 	GetAccessibleEntries(path string) Entries
 * 
 * 	Stat(path string) FileInfo
 * 
 * 	// WalkDir walks the file tree rooted at root, calling walkFn for each file or directory in the tree.
 * 	// It is has the same behavior as [fs.WalkDir], but with paths as [string].
 * 	WalkDir(root string, walkFn WalkDirFunc) error
 * 
 * 	// Realpath returns the "real path" of the specified path,
 * 	// following symlinks and correcting filename casing.
 * 	Realpath(path string) string
 * }
 */
export interface FS {
  UseCaseSensitiveFileNames(): bool;
  FileExists(path: string): bool;
  ReadFile(path: string): [contents: string, ok: bool];
  WriteFile(path: string, data: string): GoError;
  AppendFile(path: string, data: string): GoError;
  Remove(path: string): GoError;
  Chtimes(path: string, aTime: Time, mTime: Time): GoError;
  DirectoryExists(path: string): bool;
  GetAccessibleEntries(path: string): Entries;
  Stat(path: string): GoInterface<FileInfo>;
  WalkDir(root: string, walkFn: WalkDirFunc): GoError;
  Realpath(path: string): string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfs.go::type::Entries","kind":"type","status":"implemented","sigHash":"370d83d54e45af72c9318f741d1517899e306581ae43cf20deb2bc52fab73202"}
 *
 * Go source:
 * Entries struct {
 * 	Files       []string
 * 	Directories []string
 * 	// Symlinks contains the names of entries in Files or Directories that were
 * 	// originally symbolic links (or reparse points) on disk. The names are the
 * 	// same as those in Files/Directories (i.e., the link name, not the target).
 * 	// nil means symlink information is not available and the entries may need
 * 	// to be re-checked for symlinks.
 * 	Symlinks map[string]struct{}
 * }
 */
export interface Entries {
  Files: GoSlice<string>;
  Directories: GoSlice<string>;
  Symlinks: GoMap<string, { readonly __tsgoEmpty?: never }>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfs.go::type::DirEntry","kind":"type","status":"implemented","sigHash":"1264cd7083639180f1852c94aa25982e7ea723d986d48e124b610992bc96dc84"}
 *
 * Go source:
 * DirEntry = fs.DirEntry
 */
export type DirEntry = DirEntry_697d4ab0;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfs.go::type::FileInfo","kind":"type","status":"implemented","sigHash":"aa46cadfb01a433357fcb8d84cffd2cd6a73a60bd305e096a5f84eeadb312bc2"}
 *
 * Go source:
 * FileInfo = fs.FileInfo
 */
export type FileInfo = FileInfo_d0619f84;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfs.go::varGroup::ErrInvalid+ErrPermission+ErrExist+ErrNotExist+ErrClosed","kind":"varGroup","status":"implemented","sigHash":"39885a560d7e12b831b49ea63301b4bc1b1065025377c76bfc8a5a5f878a7b80"}
 *
 * Go source:
 * var (
 * 	ErrInvalid    = fs.ErrInvalid    // "invalid argument"
 * 	ErrPermission = fs.ErrPermission // "permission denied"
 * 	ErrExist      = fs.ErrExist      // "file already exists"
 * 	ErrNotExist   = fs.ErrNotExist   // "file does not exist"
 * 	ErrClosed     = fs.ErrClosed     // "file already closed"
 * )
 */
export let ErrInvalid: GoError = fs_ErrInvalid;
export let ErrPermission: GoError = fs_ErrPermission;
export let ErrExist: GoError = fs_ErrExist;
export let ErrNotExist: GoError = fs_ErrNotExist;
export let ErrClosed: GoError = fs_ErrClosed;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfs.go::type::WalkDirFunc","kind":"type","status":"implemented","sigHash":"301672f78484847fa673dfaecd15ffeff4359409ae960949fe1be7b744fa8046"}
 *
 * Go source:
 * WalkDirFunc = fs.WalkDirFunc
 */
export type WalkDirFunc = WalkDirFunc_40040532;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfs.go::varGroup::SkipAll+SkipDir","kind":"varGroup","status":"implemented","sigHash":"05e0bbcf69c858c7143117e24999e70f197b61a4029af67280fccffb43a623a6"}
 *
 * Go source:
 * var (
 * 	// SkipAll is [fs.SkipAll].
 * 	SkipAll = fs.SkipAll //nolint:errname
 * 
 * 	// SkipDir is [fs.SkipDir].
 * 	SkipDir = fs.SkipDir //nolint:errname
 * )
 */
export let SkipAll: GoError = fs_SkipAll;
export let SkipDir: GoError = fs_SkipDir;
