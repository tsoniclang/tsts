import type { bool } from "../../go/scalars.js";
import { GoStringKey, GoZeroPointer, GoZeroString, type GoError, type GoPtr } from "../../go/compat.js";
import { Map as sync_Map } from "../../go/sync.js";
import type { Time } from "../../go/time.js";
import * as strings from "../../go/strings.js";
import type { Set } from "../collections/set.js";
import { IfElse } from "../core/core.js";
import { TSTrue, TSFalse, TSUnknown } from "../core/tristate.js";
import type { Tristate } from "../core/tristate.js";
import type { ResolutionHost } from "../module/types.js";
import { KnownSymlinks_Directories, KnownSymlinks_Files, KnownSymlinks_SetDirectory, KnownSymlinks_SetFile } from "../symlinks/knownsymlinks.js";
import type { KnownSymlinks, KnownDirectoryLink } from "../symlinks/knownsymlinks.js";
import type { SyncMap } from "../collections/syncmap.js";
import { SyncMap_Load, SyncMap_Range, SyncMap_Size } from "../collections/syncmap.js";
import {
  ContainsIgnoredPath,
} from "../tspath/ignoredpaths.js";
import {
  EnsureTrailingDirectorySeparator,
  GetNormalizedAbsolutePath,
  ToPath,
} from "../tspath/path.js";
import { IsDeclarationFileName } from "../tspath/extension.js";
import type { Path } from "../tspath/path.js";
import { From as cachedvfs_From, FS_as_vfs_FS as cachedvfsAsVfsFS } from "../vfs/cachedvfs/cachedvfs.js";
import type { FS as FS_2ed33005 } from "../vfs/cachedvfs/cachedvfs.js";
import type { Entries, FileInfo, FS as FS_c26bca9d, WalkDirFunc } from "../vfs/vfs.js";
import type { fileLoader } from "./fileloader.js";
import type { CompilerHost } from "./host.js";
import type { projectReferenceFileMapper } from "./projectreferencefilemapper.js";
import {
  projectReferenceFileMapper_getProjectReferenceFromOutputDts,
} from "./projectreferencefilemapper.js";

import type { GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::type::projectReferenceDtsFakingHost","kind":"type","status":"implemented","sigHash":"0a74f14d6611f9a4617321f7aa2f3e0eed6b114afb055660222a8547f1901867"}
 *
 * Go source:
 * projectReferenceDtsFakingHost struct {
 * 	host CompilerHost
 * 	fs   *cachedvfs.FS
 * }
 */
export interface projectReferenceDtsFakingHost {
  host: GoInterface<CompilerHost>;
  fs: GoPtr<FS_2ed33005>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"ac7b662335e1beed189fcdbe3e2103c395460ed8cf0d3c270e5794805e3ad2cc"}
 *
 * Go source:
 * var _ module.ResolutionHost = (*projectReferenceDtsFakingHost)(nil)
 */
export let __1046bc8a_0: GoInterface<ResolutionHost> = projectReferenceDtsFakingHost_as_module_ResolutionHost(undefined);

export function projectReferenceDtsFakingHost_as_module_ResolutionHost(receiver: GoPtr<projectReferenceDtsFakingHost>): ResolutionHost {
  return {
    FS: (): FS_c26bca9d => projectReferenceDtsFakingHost_FS(receiver)!,
    GetCurrentDirectory: (): string => projectReferenceDtsFakingHost_GetCurrentDirectory(receiver),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::func::newProjectReferenceDtsFakingHost","kind":"func","status":"implemented","sigHash":"4729644a2e27a6113e16ed92d375b4bb743e69147d5a180f71446f8e22512ce6"}
 *
 * Go source:
 * func newProjectReferenceDtsFakingHost(loader *fileLoader) module.ResolutionHost {
 * 	// Create a new host that will fake the dts files
 * 	host := &projectReferenceDtsFakingHost{
 * 		host: loader.opts.Host,
 * 		fs: cachedvfs.From(&projectReferenceDtsFakingVfs{
 * 			projectReferenceFileMapper: loader.projectReferenceFileMapper,
 * 			dtsDirectories:             loader.dtsDirectories,
 * 			knownSymlinks:              symlinks.KnownSymlinks{},
 * 		}),
 * 	}
 * 	return host
 * }
 */
export function newProjectReferenceDtsFakingHost(loader: GoPtr<fileLoader>): GoInterface<ResolutionHost> {
  const vfsObj: projectReferenceDtsFakingVfs = {
    projectReferenceFileMapper: loader!.projectReferenceFileMapper,
    dtsDirectories: loader!.dtsDirectories,
    knownSymlinks: {
      directories: { __tsgoBlank0: [], __tsgoBlank1: [], m: new sync_Map() } as unknown as import("../collections/syncmap.js").SyncMap<import("../tspath/path.js").Path, GoPtr<import("../symlinks/knownsymlinks.js").KnownDirectoryLink>>,
      directoriesByRealpath: { __tsgoBlank0: [], __tsgoBlank1: [], m: new sync_Map() } as unknown as import("../collections/syncmap.js").SyncMap<import("../tspath/path.js").Path, GoPtr<import("../collections/syncset.js").SyncSet<string>>>,
      files: { __tsgoBlank0: [], __tsgoBlank1: [], m: new sync_Map() } as unknown as import("../collections/syncmap.js").SyncMap<import("../tspath/path.js").Path, string>,
      filesByRealpath: { __tsgoBlank0: [], __tsgoBlank1: [], m: new sync_Map() } as unknown as import("../collections/syncmap.js").SyncMap<import("../tspath/path.js").Path, GoPtr<import("../collections/syncset.js").SyncSet<string>>>,
      cwd: "",
      useCaseSensitiveFileNames: false,
    },
  };
  const host: projectReferenceDtsFakingHost = {
    host: loader!.opts.Host,
    fs: cachedvfs_From(projectReferenceDtsFakingVfs_as_vfs_FS(vfsObj)),
  };
  return projectReferenceDtsFakingHost_as_module_ResolutionHost(host);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingHost.FS","kind":"method","status":"implemented","sigHash":"b6d25c86b9c6a990cec59c54601bf138cecd4992510b45215c758ab3d9f7d441"}
 *
 * Go source:
 * func (h *projectReferenceDtsFakingHost) FS() vfs.FS {
 * 	return h.fs
 * }
 */
export function projectReferenceDtsFakingHost_FS(receiver: GoPtr<projectReferenceDtsFakingHost>): GoInterface<FS_c26bca9d> {
  return cachedvfsAsVfsFS(receiver!.fs);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingHost.GetCurrentDirectory","kind":"method","status":"implemented","sigHash":"6649cf4429cd795ad8cad4952884156b1e7e401fdbba4e67c241233be351884b"}
 *
 * Go source:
 * func (h *projectReferenceDtsFakingHost) GetCurrentDirectory() string {
 * 	return h.host.GetCurrentDirectory()
 * }
 */
export function projectReferenceDtsFakingHost_GetCurrentDirectory(receiver: GoPtr<projectReferenceDtsFakingHost>): string {
  return receiver!.host!.GetCurrentDirectory();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::type::projectReferenceDtsFakingVfs","kind":"type","status":"implemented","sigHash":"89a8f4525d10411227ce22b5aa444b49bab73cec93a68f4d7d3a4252a71148f1"}
 *
 * Go source:
 * projectReferenceDtsFakingVfs struct {
 * 	projectReferenceFileMapper *projectReferenceFileMapper
 * 	dtsDirectories             collections.Set[tspath.Path]
 * 	knownSymlinks              symlinks.KnownSymlinks
 * }
 */
export interface projectReferenceDtsFakingVfs {
  projectReferenceFileMapper: GoPtr<projectReferenceFileMapper>;
  dtsDirectories: Set<Path>;
  knownSymlinks: KnownSymlinks;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::varGroup::_::#2","kind":"varGroup","status":"implemented","sigHash":"bf43051dbf5443359d945ee6f538cadaf617e6c30585a226b391502e8ff2cb44"}
 *
 * Go source:
 * var _ vfs.FS = (*projectReferenceDtsFakingVfs)(nil)
 */
export let ___2_fca3b3b1_0: GoInterface<FS_c26bca9d> = projectReferenceDtsFakingVfs_as_vfs_FS(undefined);

export function projectReferenceDtsFakingVfs_as_vfs_FS(receiver: GoPtr<projectReferenceDtsFakingVfs>): FS_c26bca9d {
  return {
    UseCaseSensitiveFileNames: (): bool => projectReferenceDtsFakingVfs_UseCaseSensitiveFileNames(receiver),
    FileExists: (path: string): bool => projectReferenceDtsFakingVfs_FileExists(receiver, path),
    ReadFile: (path: string): [string, bool] => projectReferenceDtsFakingVfs_ReadFile(receiver, path),
    WriteFile: (path: string, data: string): GoError => projectReferenceDtsFakingVfs_WriteFile(receiver, path, data),
    AppendFile: (path: string, data: string): GoError => projectReferenceDtsFakingVfs_AppendFile(receiver, path, data),
    Remove: (path: string): GoError => projectReferenceDtsFakingVfs_Remove(receiver, path),
    Chtimes: (path: string, aTime: Time, mTime: Time): GoError => projectReferenceDtsFakingVfs_Chtimes(receiver, path, aTime, mTime),
    DirectoryExists: (path: string): bool => projectReferenceDtsFakingVfs_DirectoryExists(receiver, path),
    GetAccessibleEntries: (path: string): Entries => projectReferenceDtsFakingVfs_GetAccessibleEntries(receiver, path),
    Stat: (path: string): GoInterface<FileInfo> => projectReferenceDtsFakingVfs_Stat(receiver, path),
    WalkDir: (root: string, walkFn: WalkDirFunc): GoError => projectReferenceDtsFakingVfs_WalkDir(receiver, root, walkFn),
    Realpath: (path: string): string => projectReferenceDtsFakingVfs_Realpath(receiver, path),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.UseCaseSensitiveFileNames","kind":"method","status":"implemented","sigHash":"25ff26a47313726bb2ca481ad3e3c3a99fb6c45af73985cb2ffff47b204a1d5f"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) UseCaseSensitiveFileNames() bool {
 * 	return fs.projectReferenceFileMapper.opts.Host.FS().UseCaseSensitiveFileNames()
 * }
 */
export function projectReferenceDtsFakingVfs_UseCaseSensitiveFileNames(receiver: GoPtr<projectReferenceDtsFakingVfs>): bool {
  return receiver!.projectReferenceFileMapper!.opts.Host!.FS()!.UseCaseSensitiveFileNames();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.FileExists","kind":"method","status":"implemented","sigHash":"a9beb7d15fea5746e7e71eeee916df47455f94f479d494c167ecf1e3d227d13d"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) FileExists(path string) bool {
 * 	if fs.projectReferenceFileMapper.opts.Host.FS().FileExists(path) {
 * 		return true
 * 	}
 * 	if !tspath.IsDeclarationFileName(path) {
 * 		return false
 * 	}
 * 	// Project references go to source file instead of .d.ts file
 * 	return fs.fileOrDirectoryExistsUsingSource(path /*isFile* /, true)
 * }
 */
export function projectReferenceDtsFakingVfs_FileExists(receiver: GoPtr<projectReferenceDtsFakingVfs>, path: string): bool {
  if (receiver!.projectReferenceFileMapper!.opts.Host!.FS()!.FileExists(path)) {
    return true;
  }
  if (!IsDeclarationFileName(path)) {
    return false;
  }
  // Project references go to source file instead of .d.ts file
  return projectReferenceDtsFakingVfs_fileOrDirectoryExistsUsingSource(receiver, path, true);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.ReadFile","kind":"method","status":"implemented","sigHash":"4e01b58d590cfbfbae14592dda402ba0347cb4a35d65c38e9560804b9c046929"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) ReadFile(path string) (contents string, ok bool) {
 * 	// Dont need to override as we cannot mimick read file
 * 	return fs.projectReferenceFileMapper.opts.Host.FS().ReadFile(path)
 * }
 */
export function projectReferenceDtsFakingVfs_ReadFile(receiver: GoPtr<projectReferenceDtsFakingVfs>, path: string): [contents: string, ok: bool] {
  // Dont need to override as we cannot mimick read file
  return receiver!.projectReferenceFileMapper!.opts.Host!.FS()!.ReadFile(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.WriteFile","kind":"method","status":"implemented","sigHash":"879e056a967138959d23acef777e491bddd4331640197b486458b26e94a80b27"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) WriteFile(path string, data string) error {
 * 	panic("should not be called by resolver")
 * }
 */
export function projectReferenceDtsFakingVfs_WriteFile(receiver: GoPtr<projectReferenceDtsFakingVfs>, path: string, data: string): GoError {
  throw new globalThis.Error("should not be called by resolver");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.AppendFile","kind":"method","status":"implemented","sigHash":"cc062da52aa191fb51161878f6356518e3e0b05d58f2239bc52213686651c14a"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) AppendFile(path string, data string) error {
 * 	panic("should not be called by resolver")
 * }
 */
export function projectReferenceDtsFakingVfs_AppendFile(receiver: GoPtr<projectReferenceDtsFakingVfs>, path: string, data: string): GoError {
  throw new globalThis.Error("should not be called by resolver");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.Remove","kind":"method","status":"implemented","sigHash":"e4252ee96dbdac8d7f8c27b87c544546534155961254a5d89966fee31574dd6f"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) Remove(path string) error {
 * 	panic("should not be called by resolver")
 * }
 */
export function projectReferenceDtsFakingVfs_Remove(receiver: GoPtr<projectReferenceDtsFakingVfs>, path: string): GoError {
  throw new globalThis.Error("should not be called by resolver");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.Chtimes","kind":"method","status":"implemented","sigHash":"dd2fa01eb8fc7dee4f413dff790f3782baf01bb5f9f126a0dc83b53cd3893119"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) Chtimes(path string, aTime time.Time, mTime time.Time) error {
 * 	panic("should not be called by resolver")
 * }
 */
export function projectReferenceDtsFakingVfs_Chtimes(receiver: GoPtr<projectReferenceDtsFakingVfs>, path: string, aTime: Time, mTime: Time): GoError {
  throw new globalThis.Error("should not be called by resolver");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.DirectoryExists","kind":"method","status":"implemented","sigHash":"39036f3790162b30cac1c47af1babbc3517abdb0d6e0f2438d4ac7150e4db540"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) DirectoryExists(path string) bool {
 * 	if fs.projectReferenceFileMapper.opts.Host.FS().DirectoryExists(path) {
 * 		fs.handleDirectoryCouldBeSymlink(path)
 * 		return true
 * 	}
 * 	return fs.fileOrDirectoryExistsUsingSource(path /*isFile* /, false)
 * }
 */
export function projectReferenceDtsFakingVfs_DirectoryExists(receiver: GoPtr<projectReferenceDtsFakingVfs>, path: string): bool {
  if (receiver!.projectReferenceFileMapper!.opts.Host!.FS()!.DirectoryExists(path)) {
    projectReferenceDtsFakingVfs_handleDirectoryCouldBeSymlink(receiver, path);
    return true;
  }
  return projectReferenceDtsFakingVfs_fileOrDirectoryExistsUsingSource(receiver, path, false);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.GetAccessibleEntries","kind":"method","status":"implemented","sigHash":"ec88657b427a1930f9fc4cd8f1ef15cb9801e23ea502f689e2908574177c0c65"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) GetAccessibleEntries(path string) vfs.Entries {
 * 	panic("should not be called by resolver")
 * }
 */
export function projectReferenceDtsFakingVfs_GetAccessibleEntries(receiver: GoPtr<projectReferenceDtsFakingVfs>, path: string): Entries {
  throw new globalThis.Error("should not be called by resolver");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.Stat","kind":"method","status":"implemented","sigHash":"c7ce971cedd4e6f32dc9677448b7ab5754e2d375446d97a0a2000c008c280732"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) Stat(path string) vfs.FileInfo {
 * 	panic("should not be called by resolver")
 * }
 */
export function projectReferenceDtsFakingVfs_Stat(receiver: GoPtr<projectReferenceDtsFakingVfs>, path: string): GoInterface<FileInfo> {
  throw new globalThis.Error("should not be called by resolver");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.WalkDir","kind":"method","status":"implemented","sigHash":"95c3af5cdd03eec086a666de61a52e82bc64edef449f14e5c0306328d22c0d28"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
 * 	panic("should not be called by resolver")
 * }
 */
export function projectReferenceDtsFakingVfs_WalkDir(receiver: GoPtr<projectReferenceDtsFakingVfs>, root: string, walkFn: WalkDirFunc): GoError {
  throw new globalThis.Error("should not be called by resolver");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.Realpath","kind":"method","status":"implemented","sigHash":"faba83b07d9c05b23bce3d8730aab237885436820ccb5040cbd2ad9749afff3c"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) Realpath(path string) string {
 * 	result, ok := fs.knownSymlinks.Files().Load(fs.toPath(path))
 * 	if ok {
 * 		return result
 * 	}
 * 	return fs.projectReferenceFileMapper.opts.Host.FS().Realpath(path)
 * }
 */
export function projectReferenceDtsFakingVfs_Realpath(receiver: GoPtr<projectReferenceDtsFakingVfs>, path: string): string {
  const files = KnownSymlinks_Files(receiver!.knownSymlinks);
  const [result, ok] = SyncMap_Load(files, projectReferenceDtsFakingVfs_toPath(receiver, path), GoZeroString, GoStringKey);
  if (ok) {
    return result;
  }
  return receiver!.projectReferenceFileMapper!.opts.Host!.FS()!.Realpath(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.toPath","kind":"method","status":"implemented","sigHash":"485b44d12ff16c1f0db96cce95a6a54ce823efb644ac83869aab47d762a804be"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) toPath(path string) tspath.Path {
 * 	return tspath.ToPath(path, fs.projectReferenceFileMapper.opts.Host.GetCurrentDirectory(), fs.UseCaseSensitiveFileNames())
 * }
 */
export function projectReferenceDtsFakingVfs_toPath(receiver: GoPtr<projectReferenceDtsFakingVfs>, path: string): Path {
  return ToPath(path, receiver!.projectReferenceFileMapper!.opts.Host!.GetCurrentDirectory(), projectReferenceDtsFakingVfs_UseCaseSensitiveFileNames(receiver));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.handleDirectoryCouldBeSymlink","kind":"method","status":"implemented","sigHash":"a733ee074a3635cfbc7951db675ce52ff5fa0386086af122eb5cf2e19c1d222a"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) handleDirectoryCouldBeSymlink(directory string) {
 * 	if tspath.ContainsIgnoredPath(directory) {
 * 		return
 * 	}
 * 
 * 	// Because we already watch node_modules, handle symlinks in there
 * 	if !strings.Contains(directory, "/node_modules/") {
 * 		return
 * 	}
 * 
 * 	directoryPath := tspath.Path(tspath.EnsureTrailingDirectorySeparator(string(fs.toPath(directory))))
 * 	if _, ok := fs.knownSymlinks.Directories().Load(directoryPath); ok {
 * 		return
 * 	}
 * 
 * 	realDirectory := fs.Realpath(directory)
 * 	var realPath tspath.Path
 * 	if realDirectory == directory {
 * 		// not symlinked
 * 		return
 * 	}
 * 	if realPath = tspath.Path(tspath.EnsureTrailingDirectorySeparator(string(fs.toPath(realDirectory)))); realPath == directoryPath {
 * 		// not symlinked
 * 		return
 * 	}
 * 	fs.knownSymlinks.SetDirectory(directory, directoryPath, &symlinks.KnownDirectoryLink{
 * 		Real:     tspath.EnsureTrailingDirectorySeparator(realDirectory),
 * 		RealPath: realPath,
 * 	})
 * }
 */
export function projectReferenceDtsFakingVfs_handleDirectoryCouldBeSymlink(receiver: GoPtr<projectReferenceDtsFakingVfs>, directory: string): void {
  if (ContainsIgnoredPath(directory)) {
    return;
  }

  // Because we already watch node_modules, handle symlinks in there
  if (!strings.Contains(directory, "/node_modules/")) {
    return;
  }

  const directoryPath = EnsureTrailingDirectorySeparator(projectReferenceDtsFakingVfs_toPath(receiver, directory) as string) as Path;
  const directories = KnownSymlinks_Directories(receiver!.knownSymlinks);
  const [, ok] = SyncMap_Load(directories, directoryPath, GoZeroPointer<KnownDirectoryLink>, GoStringKey);
  if (ok) {
    return;
  }

  const realDirectory = projectReferenceDtsFakingVfs_Realpath(receiver, directory);
  if (realDirectory === directory) {
    // not symlinked
    return;
  }
  const realPath = EnsureTrailingDirectorySeparator(projectReferenceDtsFakingVfs_toPath(receiver, realDirectory) as string) as Path;
  if (realPath === directoryPath) {
    // not symlinked
    return;
  }
  KnownSymlinks_SetDirectory(receiver!.knownSymlinks, directory, directoryPath, {
    Real: EnsureTrailingDirectorySeparator(realDirectory),
    RealPath: realPath,
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.fileOrDirectoryExistsUsingSource","kind":"method","status":"implemented","sigHash":"1bf711f3786a780f72535cded662a9497e16a8b70f0cf9ec20baf52f3a4c8449"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) fileOrDirectoryExistsUsingSource(fileOrDirectory string, isFile bool) bool {
 * 	fileOrDirectoryExistsUsingSource := core.IfElse(isFile, fs.fileExistsIfProjectReferenceDts, fs.directoryExistsIfProjectReferenceDeclDir)
 * 	// Check current directory or file
 * 	result := fileOrDirectoryExistsUsingSource(fileOrDirectory)
 * 	if result != core.TSUnknown {
 * 		return result == core.TSTrue
 * 	}
 * 
 * 	knownDirectoryLinks := fs.knownSymlinks.Directories()
 * 	if knownDirectoryLinks.Size() == 0 {
 * 		return false
 * 	}
 * 	fileOrDirectoryPath := fs.toPath(fileOrDirectory)
 * 	if !strings.Contains(string(fileOrDirectoryPath), "/node_modules/") {
 * 		return false
 * 	}
 * 	if isFile {
 * 		_, ok := fs.knownSymlinks.Files().Load(fileOrDirectoryPath)
 * 		if ok {
 * 			return true
 * 		}
 * 	}
 * 
 * 	// If it contains node_modules check if its one of the symlinked path we know of
 * 	var exists bool
 * 	knownDirectoryLinks.Range(func(directoryPath tspath.Path, knownDirectoryLink *symlinks.KnownDirectoryLink) bool {
 * 		relative, hasPrefix := strings.CutPrefix(string(fileOrDirectoryPath), string(directoryPath))
 * 		if !hasPrefix {
 * 			return true
 * 		}
 * 		if exists = fileOrDirectoryExistsUsingSource(string(knownDirectoryLink.RealPath) + relative).IsTrue(); exists {
 * 			if isFile {
 * 				// Store the real path for the file
 * 				absolutePath := tspath.GetNormalizedAbsolutePath(fileOrDirectory, fs.projectReferenceFileMapper.opts.Host.GetCurrentDirectory())
 * 				fs.knownSymlinks.SetFile(
 * 					absolutePath,
 * 					fileOrDirectoryPath,
 * 					knownDirectoryLink.Real+absolutePath[len(directoryPath):],
 * 				)
 * 			}
 * 			return false
 * 		}
 * 		return true
 * 	})
 * 	return exists
 * }
 */
export function projectReferenceDtsFakingVfs_fileOrDirectoryExistsUsingSource(receiver: GoPtr<projectReferenceDtsFakingVfs>, fileOrDirectory: string, isFile: bool): bool {
  const fileOrDirectoryExistsUsingSource = IfElse(isFile, projectReferenceDtsFakingVfs_fileExistsIfProjectReferenceDts, projectReferenceDtsFakingVfs_directoryExistsIfProjectReferenceDeclDir);
  // Check current directory or file
  const result = fileOrDirectoryExistsUsingSource(receiver, fileOrDirectory);
  if (result !== TSUnknown) {
    return result === TSTrue;
  }

  const knownDirectoryLinks = KnownSymlinks_Directories(receiver!.knownSymlinks);
  if (SyncMap_Size<Path, GoPtr<KnownDirectoryLink>>(knownDirectoryLinks as SyncMap<Path, GoPtr<KnownDirectoryLink>>) === 0) {
    return false;
  }
  const fileOrDirectoryPath = projectReferenceDtsFakingVfs_toPath(receiver, fileOrDirectory);
  if (!strings.Contains(fileOrDirectoryPath as string, "/node_modules/")) {
    return false;
  }
  if (isFile) {
    const files = KnownSymlinks_Files(receiver!.knownSymlinks);
    const [, okFile] = SyncMap_Load(files, fileOrDirectoryPath, GoZeroString, GoStringKey);
    if (okFile) {
      return true;
    }
  }

  // If it contains node_modules check if its one of the symlinked path we know of
  let exists = false;
  SyncMap_Range<Path, GoPtr<KnownDirectoryLink>>(knownDirectoryLinks as SyncMap<Path, GoPtr<KnownDirectoryLink>>, (directoryPath: Path, knownDirectoryLink: GoPtr<KnownDirectoryLink>): bool => {
    const fileOrDirectoryPathStr = fileOrDirectoryPath as string;
    const directoryPathStr = directoryPath as string;
    if (!fileOrDirectoryPathStr.startsWith(directoryPathStr)) {
      return true;
    }
    const relative = fileOrDirectoryPathStr.slice(directoryPathStr.length);
    const checkResult = fileOrDirectoryExistsUsingSource(receiver, (knownDirectoryLink!.RealPath as string) + relative);
    if (checkResult === TSTrue) {
      exists = true;
      if (isFile) {
        // Store the real path for the file
        const absolutePath = GetNormalizedAbsolutePath(fileOrDirectory, receiver!.projectReferenceFileMapper!.opts.Host!.GetCurrentDirectory());
        KnownSymlinks_SetFile(
          receiver!.knownSymlinks,
          absolutePath,
          fileOrDirectoryPath,
          knownDirectoryLink!.Real + absolutePath.slice(directoryPathStr.length),
        );
      }
      return false;
    }
    return true;
  });
  return exists;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.fileExistsIfProjectReferenceDts","kind":"method","status":"implemented","sigHash":"fe737e70a5ca94667b7177ca80a4a9fae2ab8882bf8563df6ab06ffa19b1d1ae"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) fileExistsIfProjectReferenceDts(file string) core.Tristate {
 * 	source := fs.projectReferenceFileMapper.getProjectReferenceFromOutputDts(fs.toPath(file))
 * 	if source != nil {
 * 		return core.IfElse(fs.projectReferenceFileMapper.opts.Host.FS().FileExists(source.Source), core.TSTrue, core.TSFalse)
 * 	}
 * 	return core.TSUnknown
 * }
 */
export function projectReferenceDtsFakingVfs_fileExistsIfProjectReferenceDts(receiver: GoPtr<projectReferenceDtsFakingVfs>, file: string): Tristate {
  const source = projectReferenceFileMapper_getProjectReferenceFromOutputDts(receiver!.projectReferenceFileMapper, projectReferenceDtsFakingVfs_toPath(receiver, file));
  if (source !== undefined) {
    return IfElse(receiver!.projectReferenceFileMapper!.opts.Host!.FS()!.FileExists(source!.Source), TSTrue, TSFalse);
  }
  return TSUnknown;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencedtsfakinghost.go::method::projectReferenceDtsFakingVfs.directoryExistsIfProjectReferenceDeclDir","kind":"method","status":"implemented","sigHash":"f32d392dae9d3de1c29669b38b65b363fa4617e62232a635e3f08e61a1035496"}
 *
 * Go source:
 * func (fs *projectReferenceDtsFakingVfs) directoryExistsIfProjectReferenceDeclDir(dir string) core.Tristate {
 * 	dirPath := fs.toPath(dir)
 * 	dirPathWithTrailingDirectorySeparator := dirPath + "/"
 * 	for declDirPath := range fs.dtsDirectories.Keys() {
 * 		if dirPath == declDirPath ||
 * 			// Any parent directory of declaration dir
 * 			strings.HasPrefix(string(declDirPath), string(dirPathWithTrailingDirectorySeparator)) ||
 * 			// Any directory inside declaration dir
 * 			strings.HasPrefix(string(dirPath), string(declDirPath)+"/") {
 * 			return core.TSTrue
 * 		}
 * 	}
 * 	return core.TSUnknown
 * }
 */
export function projectReferenceDtsFakingVfs_directoryExistsIfProjectReferenceDeclDir(receiver: GoPtr<projectReferenceDtsFakingVfs>, dir: string): Tristate {
  const dirPath = projectReferenceDtsFakingVfs_toPath(receiver, dir);
  const dirPathWithTrailingDirectorySeparator = (dirPath as string) + "/";
  for (const [declDirPath] of receiver!.dtsDirectories.M) {
    if (dirPath === declDirPath ||
      // Any parent directory of declaration dir
      strings.HasPrefix(declDirPath as string, dirPathWithTrailingDirectorySeparator) ||
      // Any directory inside declaration dir
      strings.HasPrefix(dirPath as string, (declDirPath as string) + "/")) {
      return TSTrue;
    }
  }
  return TSUnknown;
}
