import type { bool, byte, int, long } from "../scalars.js";
import type { GoDefined, GoError, GoFunc, GoInterface, GoPtr, GoSlice } from "../compat.js";
import { Time } from "../time.js";
import * as nodeFs from "node:fs";
import * as nodePath from "node:path";
import { GoInterfaceValueOps, GoSliceMake } from "../compat.js";
import { GoNumberValueOps, GoSliceLoad, GoSliceStore } from "../compat.js";



export type FileMode = number;

export const ModeDir: FileMode = 0x80000000;
export const ModeSymlink: FileMode = 0x08000000;
export const ModeIrregular: FileMode = 0x00080000;
export const ModePerm: FileMode = 0o777;

export function FileMode_IsDir(mode: FileMode): bool {
  return (((mode as unknown as number) & (ModeDir as unknown as number)) !== 0) as bool;
}

export function FileMode_IsRegular(mode: FileMode): bool {
  return (((mode as unknown as number) & ((ModeDir as unknown as number) | (ModeSymlink as unknown as number) | (ModeIrregular as unknown as number))) === 0) as bool;
}

export const ErrInvalid: Error = new globalThis.Error("invalid argument");
export const ErrPermission: Error = new globalThis.Error("permission denied");
export const ErrExist: Error = new globalThis.Error("file already exists");
export const ErrNotExist: Error = new globalThis.Error("file does not exist");
export const ErrClosed: Error = new globalThis.Error("file already closed");
export const SkipDir: Error = new globalThis.Error("skip this directory");
export const SkipAll: Error = new globalThis.Error("skip everything and stop the walk");

export interface FileInfo {
  Name(): string;
  Size(): long;
  Mode(): FileMode;
  ModTime(): Time;
  IsDir(): bool;
  Sys(): GoInterface<unknown>;
}

export interface DirEntry {
  Name(): string;
  IsDir(): bool;
  Type(): FileMode;
  Info(): [GoInterface<FileInfo>, GoError];
}

export interface File {
  Stat(): [GoInterface<FileInfo>, GoError];
  Read(buffer: GoSlice<byte>): [int, GoError];
  Close(): GoError;
}

export interface ReadDirFile extends File {
  ReadDir(n: int): [GoSlice<GoInterface<DirEntry>>, GoError];
}

export interface FS {
  Open(name: string): [GoInterface<File>, GoError];
}

export type WalkDirFunc = GoDefined<GoFunc<(path: string, d: GoInterface<DirEntry>, err: GoError) => GoError>, "__goDefinedType::io/fs::type::WalkDirFunc::80e388257bb662fdc7aea4a472cd73207bb4a8a619d2b6ef001ef6043cae28a0">;

interface NodeFsRoot extends FS {
  readonly root: string;
}

export function NodeFS(root: string): FS {
  const nodeRoot = nodePath.resolve(root);
  const result: NodeFsRoot = {
    root: nodeRoot,
    Open: (name: string): [GoInterface<File>, GoError] => openNodeFile(nodeRoot, name),
  };
  return result;
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
  const [bytes, err] = ReadFileBytes(fsys, name);
  if (err !== undefined) {
    return ["", err];
  }
  return [bytesToBinaryString(bytes), undefined];
}

export function ReadFileBytes(fsys: FS, name: string): [Uint8Array, GoError] {
  const [file, openErr] = fsys.Open(name);
  if (openErr !== undefined) {
    return [new Uint8Array(), openErr];
  }
  const chunks: byte[] = [];
  const buffer: GoSlice<byte> = new globalThis.Array<byte>(8192).fill(0);
  for (;;) {
    const [count, readErr] = file!.Read(buffer);
    if (readErr !== undefined) {
      const closeErr = file!.Close();
      return [new Uint8Array(), readErr ?? closeErr];
    }
    if (count === 0) {
      break;
    }
    for (let index = 0; index < count; index += 1) {
      chunks.push(GoSliceLoad(buffer, index, GoNumberValueOps)!);
    }
    if (count < buffer.length) {
      break;
    }
  }
  const closeErr = file!.Close();
  if (closeErr !== undefined) {
    return [new Uint8Array(), closeErr];
  }
  return [Uint8Array.from(chunks), undefined];
}

export function ReadDir(fsys: FS, name: string): [GoSlice<GoInterface<DirEntry>>, GoError] {
  const [file, openErr] = fsys.Open(name);
  if (openErr !== undefined) {
    return [GoSliceMake(0, 0, GoInterfaceValueOps<DirEntry>()), openErr];
  }
  const readDirFile = file as Partial<ReadDirFile>;
  if (readDirFile.ReadDir === undefined) {
    const closeErr = file!.Close();
    return [GoSliceMake(0, 0, GoInterfaceValueOps<DirEntry>()), closeErr ?? ErrInvalid];
  }
  const [entries, readErr] = readDirFile.ReadDir(-1 as int);
  const closeErr = file!.Close();
  if (readErr !== undefined) {
    return [GoSliceMake(0, 0, GoInterfaceValueOps<DirEntry>()), readErr];
  }
  if (closeErr !== undefined) {
    return [GoSliceMake(0, 0, GoInterfaceValueOps<DirEntry>()), closeErr];
  }
  return [entries, undefined];
}

export function Stat(fsys: FS, name: string): [GoInterface<FileInfo>, GoError] {
  const [file, openErr] = fsys.Open(name);
  if (openErr !== undefined) {
    return [undefined, openErr];
  }
  const [info, statErr] = file!.Stat();
  const closeErr = file!.Close();
  if (statErr !== undefined) {
    return [undefined, statErr];
  }
  if (closeErr !== undefined) {
    return [undefined, closeErr];
  }
  return [info, undefined];
}

export function WalkDir(fsys: FS, root: string, walkFn: WalkDirFunc): GoError {
  const walkPath = (relativePath: string): GoError => {
    const [info, statErr] = Stat(fsys, relativePath);
    if (statErr !== undefined) {
      return walkFn!(relativePath, undefined, statErr);
    }
    const entry = FileInfoToDirEntry(info);
    const visitErr = walkFn!(relativePath, entry, undefined);
    if (visitErr === SkipAll) {
      return SkipAll;
    }
    if (visitErr === SkipDir) {
      return undefined;
    }
    if (visitErr !== undefined) {
      return visitErr;
    }
    if (!info!.IsDir()) {
      return undefined;
    }
    const [entries, readErr] = ReadDir(fsys, relativePath);
    if (readErr !== undefined) {
      return walkFn!(relativePath, entry, readErr);
    }
    for (const child of entries) {
      const childPath = relativePath === "." || relativePath === "" ? child!.Name() : `${relativePath}/${child!.Name()}`;
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

export function FileInfoToDirEntry(info: GoInterface<FileInfo>): GoInterface<DirEntry> {
  if (info === undefined) {
    throw ErrInvalid;
  }
  const fileInfo = info;
  return {
    Name: () => fileInfo.Name(),
    IsDir: () => fileInfo.IsDir(),
    Type: () => fileInfo.Mode(),
    Info: (): [GoInterface<FileInfo>, GoError] => [fileInfo, undefined],
  };
}

export function Sub(fsys: FS, dir: string): [GoInterface<FS>, GoError] {
  const prefix = dir.replace(/\/+$/, "");
  return [{
    Open(name: string): [GoInterface<File>, GoError] {
      const childName = name === "." || name === "" ? prefix : `${prefix}/${name}`;
      return fsys.Open(childName);
    },
  }, undefined];
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

function openNodeFile(root: string, name: string): [GoInterface<File>, GoError] {
  const fullPath = name === "." ? root : nodePath.resolve(root, name);
  try {
    const stats = nodeFs.statSync(fullPath);
    const info = fileInfoFromStats(nodePath.basename(fullPath), stats);
    const descriptor = stats.isDirectory() ? undefined : nodeFs.openSync(fullPath, "r");
    let closed = false;
    let offset = 0;
    let directoryOffset = 0;
    let directoryEntries: GoSlice<GoInterface<DirEntry>> | undefined;
    const file: File & Partial<ReadDirFile> = {
      Stat: (): [GoInterface<FileInfo>, GoError] => closed ? [undefined, ErrClosed] : [info, undefined],
      Read: (buffer: GoSlice<byte>): [int, GoError] => {
        if (closed) return [0, ErrClosed];
        if (descriptor === undefined) return [0, ErrInvalid];
        try {
          const bytes = Buffer.alloc(buffer.length);
          const count = nodeFs.readSync(descriptor, bytes, 0, bytes.length, offset);
          offset += count;
          for (let index = 0; index < count; index += 1) GoSliceStore(buffer, index, bytes[index]!, GoNumberValueOps);
          return [count as int, undefined];
        } catch (error) {
          return [0, normalizeFsError(error)];
        }
      },
      Close: (): GoError => {
        if (closed) return ErrClosed;
        closed = true;
        if (descriptor === undefined) return undefined;
        try {
          nodeFs.closeSync(descriptor);
          return undefined;
        } catch (error) {
          return normalizeFsError(error);
        }
      },
    };
    if (stats.isDirectory()) {
      file.ReadDir = (n: int): [GoSlice<GoInterface<DirEntry>>, GoError] => {
        if (closed) return [GoSliceMake(0, 0, GoInterfaceValueOps<DirEntry>()), ErrClosed];
        try {
          directoryEntries ??= nodeFs.readdirSync(fullPath, { withFileTypes: true }).map(dirEntryFromNodeDirent);
          const end = n <= 0 ? directoryEntries.length : Math.min(directoryEntries.length, directoryOffset + n);
          const entries = directoryEntries.slice(directoryOffset, end) as GoSlice<GoInterface<DirEntry>>;
          directoryOffset = end;
          return [entries, undefined];
        } catch (error) {
          return [GoSliceMake(0, 0, GoInterfaceValueOps<DirEntry>()), normalizeFsError(error)];
        }
      };
    }
    return [file, undefined];
  } catch (error) {
    return [undefined, normalizeFsError(error)];
  }
}

function resolveFsPath(fsys: FS, name: string): string {
  const root = (fsys as Partial<NodeFsRoot>).root;
  if (root === undefined) {
    throw new TypeError("filesystem operation requires NodeFS storage");
  }
  return name === "." ? root : nodePath.resolve(root, name);
}

function dirEntryFromNodeDirent(dirent: nodeFs.Dirent): DirEntry {
  const mode = modeFromDirent(dirent);
  return {
    Name: () => dirent.name,
    IsDir: () => dirent.isDirectory(),
    Type: () => mode,
    Info: (): [GoInterface<FileInfo>, GoError] => {
      const parentlessInfo: FileInfo = {
        Name: () => dirent.name,
        Size: () => 0 as long,
        Mode: () => mode,
        ModTime: () => new Time(0),
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
    Size: () => stats.size as long,
    Mode: () => mode,
    ModTime: () => new Time(stats.mtime),
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

function bytesToBinaryString(bytes: Uint8Array): string {
  let result = "";
  const chunkSize = 8192;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    result += globalThis.String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return result;
}
