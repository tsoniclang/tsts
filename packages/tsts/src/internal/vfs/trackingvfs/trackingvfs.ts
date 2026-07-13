import type { bool } from "../../../go/scalars.js";
import type { GoError, GoPtr } from "../../../go/compat.js";
import type { Time } from "../../../go/time.js";
import type { SyncSet } from "../../collections/syncset.js";
import { SyncSet_Add } from "../../collections/syncset.js";
import type { Entries, FileInfo, FS as FS_2329d319, WalkDirFunc } from "../vfs.js";

import type { GoInterface } from "../../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::type::FS","kind":"type","status":"implemented","sigHash":"4ab1e95f0000b741e0a1207c003511f4aa44319f6dc8e9c634f57d33c3b0afa4"}
 *
 * Go source:
 * FS struct {
 * 	Inner     vfs.FS
 * 	SeenFiles collections.SyncSet[string]
 * }
 */
export interface FS {
  Inner: GoInterface<FS_2329d319>;
  SeenFiles: SyncSet<string>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e"}
 *
 * Go source:
 * var _ vfs.FS = (*FS)(nil)
 */
export let __325b3fb8_0: GoInterface<FS_2329d319> = FS_as_vfs_FS(undefined);

export function FS_as_vfs_FS(receiver: GoPtr<FS>): FS_2329d319 {
  return {
    UseCaseSensitiveFileNames: (): bool => FS_UseCaseSensitiveFileNames(receiver),
    FileExists: (path: string): bool => FS_FileExists(receiver, path),
    ReadFile: (path: string): [string, bool] => FS_ReadFile(receiver, path),
    WriteFile: (path: string, data: string): GoError => FS_WriteFile(receiver, path, data),
    AppendFile: (path: string, data: string): GoError => FS_AppendFile(receiver, path, data),
    Remove: (path: string): GoError => FS_Remove(receiver, path),
    Chtimes: (path: string, aTime: Time, mTime: Time): GoError => FS_Chtimes(receiver, path, aTime, mTime),
    DirectoryExists: (path: string): bool => FS_DirectoryExists(receiver, path),
    GetAccessibleEntries: (path: string): Entries => FS_GetAccessibleEntries(receiver, path),
    Stat: (path: string): GoPtr<FileInfo> => FS_Stat(receiver, path),
    WalkDir: (root: string, walkFn: WalkDirFunc): GoError => FS_WalkDir(receiver, root, walkFn),
    Realpath: (path: string): string => FS_Realpath(receiver, path),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::method::FS.ReadFile","kind":"method","status":"implemented","sigHash":"0fc65c4feba146a08be237f67aa3407d02685a8b5ce626ef8567c64d2dd24daf"}
 *
 * Go source:
 * func (fs *FS) ReadFile(path string) (string, bool) {
 * 	fs.SeenFiles.Add(path)
 * 	return fs.Inner.ReadFile(path)
 * }
 */
export function FS_ReadFile(receiver: GoPtr<FS>, path: string): [string, bool] {
  SyncSet_Add(receiver!.SeenFiles, path);
  return receiver!.Inner!.ReadFile(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::method::FS.FileExists","kind":"method","status":"implemented","sigHash":"4022b97f73395261aafa72b8154213d8a0664c2bf2d7aeda4e51f6f2f198121b"}
 *
 * Go source:
 * func (fs *FS) FileExists(path string) bool {
 * 	fs.SeenFiles.Add(path)
 * 	return fs.Inner.FileExists(path)
 * }
 */
export function FS_FileExists(receiver: GoPtr<FS>, path: string): bool {
  SyncSet_Add(receiver!.SeenFiles, path);
  return receiver!.Inner!.FileExists(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::method::FS.UseCaseSensitiveFileNames","kind":"method","status":"implemented","sigHash":"3e6b7f37ac13432bcd08bf9336cfc069ebe66e9cd0c57541a812464b21178863"}
 *
 * Go source:
 * func (fs *FS) UseCaseSensitiveFileNames() bool { return fs.Inner.UseCaseSensitiveFileNames() }
 */
export function FS_UseCaseSensitiveFileNames(receiver: GoPtr<FS>): bool {
  return receiver!.Inner!.UseCaseSensitiveFileNames();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::method::FS.WriteFile","kind":"method","status":"implemented","sigHash":"ff6bdaaa6e7de5e996257800bed27ae1cd16b8ba95fbffb9327771be9fd9f49b"}
 *
 * Go source:
 * func (fs *FS) WriteFile(path string, data string) error {
 * 	return fs.Inner.WriteFile(path, data)
 * }
 */
export function FS_WriteFile(receiver: GoPtr<FS>, path: string, data: string): GoError {
  return receiver!.Inner!.WriteFile(path, data);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::method::FS.AppendFile","kind":"method","status":"implemented","sigHash":"96a8577216fce4419e4ffa6cf48f6c27c9dbe45f40c77ea3b13c4e37ce89f315"}
 *
 * Go source:
 * func (fs *FS) AppendFile(path string, data string) error {
 * 	return fs.Inner.AppendFile(path, data)
 * }
 */
export function FS_AppendFile(receiver: GoPtr<FS>, path: string, data: string): GoError {
  return receiver!.Inner!.AppendFile(path, data);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::method::FS.Remove","kind":"method","status":"implemented","sigHash":"beb2e4ec7a10333fcc76cb1088e8cc2c876a49229f487a8c1cc3cea62389bcde"}
 *
 * Go source:
 * func (fs *FS) Remove(path string) error { return fs.Inner.Remove(path) }
 */
export function FS_Remove(receiver: GoPtr<FS>, path: string): GoError {
  return receiver!.Inner!.Remove(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::method::FS.Chtimes","kind":"method","status":"implemented","sigHash":"a5b9b4a1995ff25b5ca57243527b590e986925f49c6217c7bc5db5285cd2bc9d"}
 *
 * Go source:
 * func (fs *FS) Chtimes(path string, aTime time.Time, mTime time.Time) error {
 * 	return fs.Inner.Chtimes(path, aTime, mTime)
 * }
 */
export function FS_Chtimes(receiver: GoPtr<FS>, path: string, aTime: Time, mTime: Time): GoError {
  return receiver!.Inner!.Chtimes(path, aTime, mTime);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::method::FS.DirectoryExists","kind":"method","status":"implemented","sigHash":"29417d9d9599bd399b156e6488a9401e2257d9cc45889c707bad1c23b192d099"}
 *
 * Go source:
 * func (fs *FS) DirectoryExists(path string) bool {
 * 	fs.SeenFiles.Add(path)
 * 	return fs.Inner.DirectoryExists(path)
 * }
 */
export function FS_DirectoryExists(receiver: GoPtr<FS>, path: string): bool {
  SyncSet_Add(receiver!.SeenFiles, path);
  return receiver!.Inner!.DirectoryExists(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::method::FS.GetAccessibleEntries","kind":"method","status":"implemented","sigHash":"cc54219e570f4c7a2928f279202d9588463e9007f2ab24e5c5245eb33d00039e"}
 *
 * Go source:
 * func (fs *FS) GetAccessibleEntries(path string) vfs.Entries {
 * 	fs.SeenFiles.Add(path)
 * 	return fs.Inner.GetAccessibleEntries(path)
 * }
 */
export function FS_GetAccessibleEntries(receiver: GoPtr<FS>, path: string): Entries {
  SyncSet_Add(receiver!.SeenFiles, path);
  return receiver!.Inner!.GetAccessibleEntries(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::method::FS.Stat","kind":"method","status":"implemented","sigHash":"729186fb2718f26a75c0b4d37d399045bdae9c1b1dffe909c66f4dc2d2670821"}
 *
 * Go source:
 * func (fs *FS) Stat(path string) vfs.FileInfo {
 * 	fs.SeenFiles.Add(path)
 * 	return fs.Inner.Stat(path)
 * }
 */
export function FS_Stat(receiver: GoPtr<FS>, path: string): GoPtr<FileInfo> {
  SyncSet_Add(receiver!.SeenFiles, path);
  return receiver!.Inner!.Stat(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::method::FS.WalkDir","kind":"method","status":"implemented","sigHash":"1f36a47e0b58d1e515c8371bec0b0594669d1f19089ad8f4fa57d1f725ad5ea7"}
 *
 * Go source:
 * func (fs *FS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
 * 	fs.SeenFiles.Add(root)
 * 	return fs.Inner.WalkDir(root, func(path string, d vfs.DirEntry, err error) error {
 * 		fs.SeenFiles.Add(path)
 * 		return walkFn(path, d, err)
 * 	})
 * }
 */
export function FS_WalkDir(receiver: GoPtr<FS>, root: string, walkFn: WalkDirFunc): GoError {
  SyncSet_Add(receiver!.SeenFiles, root);
  return receiver!.Inner!.WalkDir(root, ((path: string, d: unknown, err: unknown): GoError => {
    SyncSet_Add(receiver!.SeenFiles, path);
    return (walkFn as unknown as (path: string, d: unknown, err: unknown) => GoError)(path, d, err);
  }) as unknown as WalkDirFunc);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/trackingvfs/trackingvfs.go::method::FS.Realpath","kind":"method","status":"implemented","sigHash":"38ebf96e7dddd630abbd257354fcdf836352bbd9e9c028ed12f428a2df8969c7"}
 *
 * Go source:
 * func (fs *FS) Realpath(path string) string {
 * 	fs.SeenFiles.Add(path)
 * 	return fs.Inner.Realpath(path)
 * }
 */
export function FS_Realpath(receiver: GoPtr<FS>, path: string): string {
  SyncSet_Add(receiver!.SeenFiles, path);
  return receiver!.Inner!.Realpath(path);
}
