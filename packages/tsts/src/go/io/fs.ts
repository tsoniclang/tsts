import type { bool, int } from "@tsonic/core/types.js";
import type { GoError, GoPtr, GoSlice } from "../compat.js";
import * as nodeFs from "node:fs";
import * as nodePath from "node:path";

export type FileMode = number;

export const ModeDir: FileMode = 0x80000000;
export const ModeSymlink: FileMode = 0x08000000;
export const ModeIrregular: FileMode = 0x00080000;
export const ModePerm: FileMode = 0o777;

export const ErrInvalid: Error = new globalThis.Error("invalid argument");
export const ErrPermission: Error = new globalThis.Error("permission denied");
export const ErrExist: Error = new globalThis.Error("file already exists");
export const ErrNotExist: Error = new globalThis.Error("file does not exist");
export const ErrClosed: Error = new globalThis.Error("file already closed");
export const SkipDir: Error = new globalThis.Error("skip this directory");
export const SkipAll: Error = new globalThis.Error("skip everything and stop the walk");

export interface FileInfo {
  Name(): string;
  Size(): int;
  Mode(): FileMode;
  ModTime(): Date;
  IsDir(): bool;
  Sys(): unknown;
}

export interface DirEntry {
  Name(): string;
  IsDir(): bool;
  Type(): FileMode;
  Info(): [FileInfo, GoError];
}

export interface File {
  Stat(): [FileInfo, GoError];
  Read(buffer: GoSlice<number>): [int, GoError];
  Close(): GoError;
}

export interface ReadDirFile extends File {
  ReadDir(n: int): [GoSlice<DirEntry>, GoError];
}

export interface FS {
  readonly root?: string;
  Open?(name: string): [File, GoError];
}

export type WalkDirFunc = (path: string, d: DirEntry, err: GoError) => GoError;

interface NodeFsRoot extends FS {
  readonly root: string;
}

export function NodeFS(root: string): FS {
  return { root: nodePath.resolve(root) };
}

export function FileExists(fsys: FS, name: string): bool {
  const [info, err] = Stat(fsys, name);
  return err === undefined && info !== undefined && !info.IsDir();
}

export function DirectoryExists(fsys: FS, name: string): bool {
  const [info, err] = Stat(fsys, name);
  return err === undefined && info !== undefined && info.IsDir();
}

export function GetAccessibleEntries(fsys: FS, name: string): unknown {
  return ReadDir(fsys, name);
}

export function ReadFile(fsys: FS, name: string): [string, GoError] {
  try {
    return [nodeFs.readFileSync(resolveFsPath(fsys, name), "utf8"), undefined];
  } catch (error) {
    return ["", normalizeFsError(error)];
  }
}

export function ReadDir(fsys: FS, name: string): [GoSlice<DirEntry>, GoError] {
  try {
    const dirents = nodeFs.readdirSync(resolveFsPath(fsys, name), { withFileTypes: true });
    return [dirents.map(dirEntryFromNodeDirent), undefined];
  } catch (error) {
    return [[], normalizeFsError(error)];
  }
}

export function Stat(fsys: FS, name: string): [FileInfo, GoError] {
  try {
    const fullPath = resolveFsPath(fsys, name);
    return [fileInfoFromStats(nodePath.basename(fullPath), nodeFs.statSync(fullPath)), undefined];
  } catch (error) {
    return [undefined as unknown as FileInfo, normalizeFsError(error)];
  }
}

export function WalkDir(fsys: FS, root: string, walkFn: WalkDirFunc): GoError {
  const walkPath = (relativePath: string): GoError => {
    const [info, statErr] = Stat(fsys, relativePath);
    if (statErr !== undefined) {
      return walkFn(relativePath, undefined as unknown as DirEntry, statErr);
    }
    const entry = FileInfoToDirEntry(info);
    const visitErr = walkFn(relativePath, entry, undefined);
    if (visitErr === SkipAll) {
      return SkipAll;
    }
    if (visitErr === SkipDir) {
      return undefined;
    }
    if (visitErr !== undefined) {
      return visitErr;
    }
    if (!info.IsDir()) {
      return undefined;
    }
    const [entries, readErr] = ReadDir(fsys, relativePath);
    if (readErr !== undefined) {
      return walkFn(relativePath, entry, readErr);
    }
    for (const child of entries) {
      const childPath = relativePath === "." || relativePath === "" ? child.Name() : `${relativePath}/${child.Name()}`;
      const childErr = walkPath(childPath);
      if (childErr === SkipAll) {
        return SkipAll;
      }
      if (childErr !== undefined) {
        return childErr;
      }
    }
    return undefined;
  };
  const err = walkPath(root === "" ? "." : root);
  return err === SkipAll ? undefined : err;
}

export function FileInfoToDirEntry(info: unknown): DirEntry {
  if (info === undefined) {
    throw ErrInvalid;
  }
  const fileInfo = info as FileInfo;
  return {
    Name: () => fileInfo.Name(),
    IsDir: () => fileInfo.IsDir(),
    Type: () => fileInfo.Mode(),
    Info: () => [fileInfo, undefined],
  };
}

export function Sub(fsys: FS, dir: string): [FS, GoError] {
  try {
    return [NodeFS(resolveFsPath(fsys, dir)), undefined];
  } catch (error) {
    return [undefined as unknown as FS, normalizeFsError(error)];
  }
}

export function UseCaseSensitiveFileNames(_fsys: FS): bool {
  return process.platform !== "win32";
}

export function Realpath(fsys: FS, name: string): [string, GoError] {
  try {
    return [nodeFs.realpathSync(resolveFsPath(fsys, name)), undefined];
  } catch (error) {
    return ["", normalizeFsError(error)];
  }
}

export function WriteFile(fsys: FS, name: string, data: string, _perm?: FileMode): GoError {
  try {
    const fullPath = resolveFsPath(fsys, name);
    nodeFs.mkdirSync(nodePath.dirname(fullPath), { recursive: true });
    nodeFs.writeFileSync(fullPath, data, "utf8");
    return undefined;
  } catch (error) {
    return normalizeFsError(error);
  }
}

export function Remove(fsys: FS, name: string): GoError {
  try {
    nodeFs.rmSync(resolveFsPath(fsys, name), { force: true, recursive: true });
    return undefined;
  } catch (error) {
    return normalizeFsError(error);
  }
}

export function Outputs(..._args: Array<unknown>): unknown {
  return undefined;
}

function resolveFsPath(fsys: FS, name: string): string {
  const root = (fsys as NodeFsRoot).root ?? "/";
  return name === "." ? root : nodePath.resolve(root, name);
}

function dirEntryFromNodeDirent(dirent: nodeFs.Dirent): DirEntry {
  const mode = modeFromDirent(dirent);
  return {
    Name: () => dirent.name,
    IsDir: () => dirent.isDirectory(),
    Type: () => mode,
    Info: () => {
      const parentlessInfo: FileInfo = {
        Name: () => dirent.name,
        Size: () => 0 as int,
        Mode: () => mode,
        ModTime: () => new Date(0),
        IsDir: () => dirent.isDirectory(),
        Sys: () => dirent,
      };
      return [parentlessInfo, undefined];
    },
  };
}

function fileInfoFromStats(name: string, stats: nodeFs.Stats): FileInfo {
  const mode = modeFromStats(stats);
  return {
    Name: () => name,
    Size: () => stats.size as int,
    Mode: () => mode,
    ModTime: () => stats.mtime,
    IsDir: () => stats.isDirectory(),
    Sys: () => stats,
  };
}

function modeFromDirent(dirent: nodeFs.Dirent): FileMode {
  if (dirent.isDirectory()) {
    return ModeDir;
  }
  if (dirent.isSymbolicLink()) {
    return ModeSymlink;
  }
  if (dirent.isFile()) {
    return 0;
  }
  return ModeIrregular;
}

function modeFromStats(stats: nodeFs.Stats): FileMode {
  if (stats.isDirectory()) {
    return ModeDir;
  }
  if (stats.isSymbolicLink()) {
    return ModeSymlink;
  }
  if (stats.isFile()) {
    return (stats.mode & ModePerm) as FileMode;
  }
  return ModeIrregular;
}

function normalizeFsError(error: unknown): GoError {
  if (error instanceof globalThis.Error) {
    return error;
  }
  return new globalThis.Error(String(error));
}
