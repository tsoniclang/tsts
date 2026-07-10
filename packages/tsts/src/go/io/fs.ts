import * as nodeFs from "node:fs";
import * as nodePath from "node:path";

import type { GoError, GoPtr, GoSlice } from "../compat.js";
import { GoRequireNonNilAfterSuccess } from "../compat.js";
import { EOF } from "../io.js";
import type { bool, int, long } from "../scalars.js";
import type { Time } from "../time.js";
import { UnixMilli } from "../time.js";

export type FileMode = number;

export const ModeDir: FileMode = 0x80000000;
export const ModeAppend: FileMode = 0x40000000;
export const ModeExclusive: FileMode = 0x20000000;
export const ModeTemporary: FileMode = 0x10000000;
export const ModeSymlink: FileMode = 0x08000000;
export const ModeDevice: FileMode = 0x04000000;
export const ModeNamedPipe: FileMode = 0x02000000;
export const ModeSocket: FileMode = 0x01000000;
export const ModeSetuid: FileMode = 0x00800000;
export const ModeSetgid: FileMode = 0x00400000;
export const ModeCharDevice: FileMode = 0x00200000;
export const ModeSticky: FileMode = 0x00100000;
export const ModeIrregular: FileMode = 0x00080000;
export const ModeType: FileMode = (
  ModeDir
  | ModeSymlink
  | ModeNamedPipe
  | ModeSocket
  | ModeDevice
  | ModeCharDevice
  | ModeIrregular
) >>> 0;
export const ModePerm: FileMode = 0o777;

export function FileMode_Type(mode: FileMode): FileMode {
  return ((mode as number) & (ModeType as number)) >>> 0;
}

export function FileMode_IsDir(mode: FileMode): bool {
  return (((mode as number) & (ModeDir as number)) !== 0) as bool;
}

export function FileMode_IsRegular(mode: FileMode): bool {
  return (FileMode_Type(mode) === 0) as bool;
}

export const ErrInvalid: Error = new globalThis.Error("invalid argument");
export const ErrPermission: Error = new globalThis.Error("permission denied");
export const ErrExist: Error = new globalThis.Error("file already exists");
export const ErrNotExist: Error = new globalThis.Error("file does not exist");
export const ErrClosed: Error = new globalThis.Error("file already closed");
export const SkipDir: Error = new globalThis.Error("skip this directory");
export const SkipAll: Error = new globalThis.Error("skip everything and stop the walk");

export class PathError extends globalThis.Error {
  readonly Op: string;
  Path: string;
  readonly Err: Error;

  constructor(op: string, path: string, err: Error) {
    super(`${op} ${path}: ${err.message}`);
    this.name = "PathError";
    this.Op = op;
    this.Path = path;
    this.Err = err;
  }

  Unwrap(): GoError {
    return this.Err;
  }
}

export interface FileInfo {
  Name(): string;
  Size(): int;
  Mode(): FileMode;
  ModTime(): Time;
  IsDir(): bool;
  Sys(): unknown;
}

export interface DirEntry {
  Name(): string;
  IsDir(): bool;
  Type(): FileMode;
  Info(): [GoPtr<FileInfo>, GoError];
}

export interface File {
  Stat(): [GoPtr<FileInfo>, GoError];
  Read(buffer: GoSlice<number>): [int, GoError];
  Close(): GoError;
}

export interface ReadDirFile extends File {
  ReadDir(n: int): [GoSlice<DirEntry>, GoError];
}

export interface FS {
  Open(name: string): [GoPtr<File>, GoError];
  ReadFile?(name: string): [Uint8Array, GoError];
  ReadDir?(name: string): [GoSlice<DirEntry>, GoError];
  Stat?(name: string): [GoPtr<FileInfo>, GoError];
  Sub?(dir: string): [GoPtr<FS>, GoError];
  ReadLink?(name: string): [string, GoError];
  Lstat?(name: string): [GoPtr<FileInfo>, GoError];
  readonly root?: string;
}

export type WalkDirFunc = (path: string, d: GoPtr<DirEntry>, err: GoError) => GoError;

interface NodeFsRoot extends FS {
  readonly root: string;
}

export function NodeFS(root: string): FS {
  const resolvedRoot = nodePath.resolve(root);
  const open = (name: string): [GoPtr<File>, GoError] => openNodeFile(resolvedRoot, name);
  return {
    root: resolvedRoot,
    Open: open,
    ReadFile(name: string): [Uint8Array, GoError] {
      if (!ValidPath(name)) {
        return [new Uint8Array(), new PathError("readfile", name, ErrInvalid)];
      }
      try {
        return [new Uint8Array(nodeFs.readFileSync(resolveNodePath(resolvedRoot, name))), undefined];
      } catch (error) {
        return [new Uint8Array(), normalizeFsError(error, "readfile", name)];
      }
    },
    ReadDir(name: string): [GoSlice<DirEntry>, GoError] {
      return readDirFromOpen(open, name);
    },
    Stat(name: string): [GoPtr<FileInfo>, GoError] {
      return nodeStat(resolvedRoot, name, false, "stat");
    },
    ReadLink(name: string): [string, GoError] {
      if (!ValidPath(name)) {
        return ["", new PathError("readlink", name, ErrInvalid)];
      }
      try {
        return [nodeFs.readlinkSync(resolveNodePath(resolvedRoot, name)), undefined];
      } catch (error) {
        return ["", normalizeFsError(error, "readlink", name)];
      }
    },
    Lstat(name: string): [GoPtr<FileInfo>, GoError] {
      return nodeStat(resolvedRoot, name, true, "lstat");
    },
  };
}

export function ValidPath(name: string): bool {
  if (!hasValidUnicode(name)) {
    return false;
  }
  if (name === ".") {
    return true;
  }
  if (name.length === 0 || name.startsWith("/") || name.endsWith("/")) {
    return false;
  }
  for (const element of name.split("/")) {
    if (element === "" || element === "." || element === "..") {
      return false;
    }
  }
  return true;
}

export function FileExists(fsys: FS, name: string): bool {
  const [info, err] = Stat(fsys, name);
  return (err === undefined && info !== undefined && !info.IsDir()) as bool;
}

export function DirectoryExists(fsys: FS, name: string): bool {
  const [info, err] = Stat(fsys, name);
  return (err === undefined && info !== undefined && info.IsDir()) as bool;
}

export function GetAccessibleEntries(fsys: FS, name: string): [GoSlice<DirEntry>, GoError] {
  return ReadDir(fsys, name);
}

export function ReadFile(fsys: FS, name: string): [string, GoError] {
  const [bytes, err] = ReadFileBytes(fsys, name);
  return err === undefined ? [bytesToBinaryString(bytes), undefined] : [bytesToBinaryString(bytes), err];
}

export function ReadFileBytes(fsys: FS, name: string): [Uint8Array, GoError] {
  if (typeof fsys.ReadFile === "function") {
    return fsys.ReadFile(name);
  }

  const [file, openErr] = fsys.Open(name);
  if (openErr !== undefined) {
    return [new Uint8Array(), openErr];
  }
  const openedFile = GoRequireNonNilAfterSuccess(file, "fs.Open");

  const data: number[] = [];
  const buffer = new globalThis.Array<number>(8192).fill(0);
  try {
    for (;;) {
      const [count, readErr] = openedFile.Read(buffer);
      const boundedCount = Math.max(0, Math.min(count as number, buffer.length));
      for (let index = 0; index < boundedCount; index += 1) {
        data.push(buffer[index]!);
      }
      if (readErr !== undefined) {
        return [Uint8Array.from(data), readErr === EOF ? undefined : readErr];
      }
    }
  } finally {
    openedFile.Close();
  }
}

export function ReadDir(fsys: FS, name: string): [GoSlice<DirEntry>, GoError] {
  if (typeof fsys.ReadDir === "function") {
    return fsys.ReadDir(name);
  }
  return readDirFromOpen((path) => fsys.Open(path), name);
}

function readDirFromOpen(open: (name: string) => [GoPtr<File>, GoError], name: string): [GoSlice<DirEntry>, GoError] {
  const [file, openErr] = open(name);
  if (openErr !== undefined) {
    return [[], openErr];
  }
  const openedFile = GoRequireNonNilAfterSuccess(file, "fs.Open");
  try {
    if (!isReadDirFile(openedFile)) {
      return [[], new PathError("readdir", name, new globalThis.Error("not implemented"))];
    }
    const [entries, readErr] = openedFile.ReadDir(-1 as int);
    entries.sort((left, right) => compareByteStrings(left.Name(), right.Name()));
    return [entries, readErr];
  } finally {
    openedFile.Close();
  }
}

export function Stat(fsys: FS, name: string): [GoPtr<FileInfo>, GoError] {
  if (typeof fsys.Stat === "function") {
    return fsys.Stat(name);
  }
  const [file, openErr] = fsys.Open(name);
  if (openErr !== undefined) {
    return [undefined, openErr];
  }
  const openedFile = GoRequireNonNilAfterSuccess(file, "fs.Open");
  try {
    return openedFile.Stat();
  } finally {
    openedFile.Close();
  }
}

export function ReadLink(fsys: FS, name: string): [string, GoError] {
  if (typeof fsys.ReadLink !== "function") {
    return ["", new PathError("readlink", name, ErrInvalid)];
  }
  return fsys.ReadLink(name);
}

export function Lstat(fsys: FS, name: string): [GoPtr<FileInfo>, GoError] {
  if (typeof fsys.Lstat !== "function") {
    return Stat(fsys, name);
  }
  return fsys.Lstat(name);
}

export function WalkDir(fsys: FS, root: string, walkFn: WalkDirFunc): GoError {
  const [info, statErr] = Stat(fsys, root);
  let err: GoError;
  if (statErr !== undefined) {
    err = walkFn(root, undefined, statErr);
  } else {
    const statInfo = GoRequireNonNilAfterSuccess(info, "fs.Stat");
    const entry = GoRequireNonNilAfterSuccess(FileInfoToDirEntry(statInfo), "fs.FileInfoToDirEntry");
    err = walkDir(fsys, root, entry, walkFn);
  }
  return err === SkipDir || err === SkipAll ? undefined : err;
}

function walkDir(fsys: FS, name: string, entry: DirEntry, walkFn: WalkDirFunc): GoError {
  let err = walkFn(name, entry, undefined);
  if (err !== undefined || !entry.IsDir()) {
    if (err === SkipDir && entry.IsDir()) {
      err = undefined;
    }
    return err;
  }

  const [entries, readErr] = ReadDir(fsys, name);
  if (readErr !== undefined) {
    err = walkFn(name, entry, readErr);
    if (err !== undefined) {
      return err === SkipDir && entry.IsDir() ? undefined : err;
    }
  }

  for (const child of entries) {
    const childName = joinPath(name, child.Name());
    const childErr = walkDir(fsys, childName, child, walkFn);
    if (childErr === SkipDir) {
      break;
    }
    if (childErr !== undefined) {
      return childErr;
    }
  }
  return undefined;
}

export function FileInfoToDirEntry(info: GoPtr<FileInfo>): GoPtr<DirEntry> {
  if (info === undefined) {
    return undefined;
  }
  return {
    Name: () => info.Name(),
    IsDir: () => info.IsDir(),
    Type: () => FileMode_Type(info.Mode()),
    Info: () => [info, undefined],
  };
}

export function Sub(fsys: FS, dir: string): [GoPtr<FS>, GoError] {
  if (!ValidPath(dir)) {
    return [undefined, new PathError("sub", dir, ErrInvalid)];
  }
  if (dir === ".") {
    return [fsys, undefined];
  }
  if (typeof fsys.Sub === "function") {
    return fsys.Sub(dir);
  }

  const fullName = (op: string, name: string): [string, GoError] => {
    if (!ValidPath(name)) {
      return ["", new PathError(op, name, ErrInvalid)];
    }
    return [joinPath(dir, name), undefined];
  };
  const fixErr = (err: GoError): GoError => {
    if (err instanceof PathError) {
      const shortened = shortenSubPath(dir, err.Path);
      if (shortened !== undefined) {
        err.Path = shortened;
        err.message = `${err.Op} ${err.Path}: ${err.Err.message}`;
      }
    }
    return err;
  };

  const result: FS = {
    Open(name: string): [GoPtr<File>, GoError] {
      const [full, nameErr] = fullName("open", name);
      if (nameErr !== undefined) {
        return [undefined, nameErr];
      }
      const [file, err] = fsys.Open(full);
      return [file, fixErr(err)];
    },
    ReadDir(name: string): [GoSlice<DirEntry>, GoError] {
      const [full, nameErr] = fullName("read", name);
      if (nameErr !== undefined) {
        return [[], nameErr];
      }
      const [entries, err] = ReadDir(fsys, full);
      return [entries, fixErr(err)];
    },
    ReadFile(name: string): [Uint8Array, GoError] {
      const [full, nameErr] = fullName("read", name);
      if (nameErr !== undefined) {
        return [new Uint8Array(), nameErr];
      }
      const [data, err] = ReadFileBytes(fsys, full);
      return [data, fixErr(err)];
    },
    ReadLink(name: string): [string, GoError] {
      const [full, nameErr] = fullName("readlink", name);
      if (nameErr !== undefined) {
        return ["", nameErr];
      }
      const [target, err] = ReadLink(fsys, full);
      return [target, fixErr(err)];
    },
    Lstat(name: string): [GoPtr<FileInfo>, GoError] {
      const [full, nameErr] = fullName("lstat", name);
      if (nameErr !== undefined) {
        return [undefined, nameErr];
      }
      const [info, err] = Lstat(fsys, full);
      return [info, fixErr(err)];
    },
    Sub(name: string): [GoPtr<FS>, GoError] {
      if (name === ".") {
        return [result, undefined];
      }
      const [full, nameErr] = fullName("sub", name);
      if (nameErr !== undefined) {
        return [undefined, nameErr];
      }
      return Sub(fsys, full);
    },
  };
  return [result, undefined];
}

export function UseCaseSensitiveFileNames(_fsys: FS): bool {
  return (process.platform !== "win32") as bool;
}

export function Realpath(fsys: FS, name: string): [string, GoError] {
  if (!ValidPath(name)) {
    return ["", new PathError("realpath", name, ErrInvalid)];
  }
  try {
    return [nodeFs.realpathSync(resolveFsPath(fsys, name)), undefined];
  } catch (error) {
    return ["", normalizeFsError(error, "realpath", name)];
  }
}

export function WriteFile(fsys: FS, name: string, data: string, _perm?: FileMode): GoError {
  if (!ValidPath(name)) {
    return new PathError("write", name, ErrInvalid);
  }
  try {
    const fullPath = resolveFsPath(fsys, name);
    nodeFs.mkdirSync(nodePath.dirname(fullPath), { recursive: true });
    nodeFs.writeFileSync(fullPath, data, "utf8");
    return undefined;
  } catch (error) {
    return normalizeFsError(error, "write", name);
  }
}

export function Remove(fsys: FS, name: string): GoError {
  if (!ValidPath(name)) {
    return new PathError("remove", name, ErrInvalid);
  }
  try {
    nodeFs.rmSync(resolveFsPath(fsys, name), { force: true, recursive: true });
    return undefined;
  } catch (error) {
    return normalizeFsError(error, "remove", name);
  }
}

export function Outputs(..._args: Array<unknown>): unknown {
  return undefined;
}

function hasValidUnicode(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const codeUnit = value.charCodeAt(index);
    if (codeUnit >= 0xd800 && codeUnit <= 0xdbff) {
      if (index + 1 >= value.length) {
        return false;
      }
      const next = value.charCodeAt(index + 1);
      if (next < 0xdc00 || next > 0xdfff) {
        return false;
      }
      index += 1;
    } else if (codeUnit >= 0xdc00 && codeUnit <= 0xdfff) {
      return false;
    }
  }
  return true;
}

function isReadDirFile(file: File): file is ReadDirFile {
  return "ReadDir" in file && typeof file.ReadDir === "function";
}

function joinPath(parent: string, child: string): string {
  if (child === ".") {
    return parent;
  }
  if (parent === "." || parent === "") {
    return child;
  }
  return `${parent}/${child}`;
}

function shortenSubPath(dir: string, name: string): string | undefined {
  if (name === dir) {
    return ".";
  }
  const prefix = `${dir}/`;
  return name.startsWith(prefix) ? name.slice(prefix.length) : undefined;
}

const utf8Encoder = new TextEncoder();

function compareByteStrings(left: string, right: string): number {
  const leftBytes = utf8Encoder.encode(left);
  const rightBytes = utf8Encoder.encode(right);
  const length = Math.min(leftBytes.length, rightBytes.length);
  for (let index = 0; index < length; index += 1) {
    if (leftBytes[index] !== rightBytes[index]) {
      return leftBytes[index]! < rightBytes[index]! ? -1 : 1;
    }
  }
  return leftBytes.length - rightBytes.length;
}

function openNodeFile(root: string, name: string): [GoPtr<File>, GoError] {
  if (!ValidPath(name)) {
    return [undefined, new PathError("open", name, ErrInvalid)];
  }
  const fullPath = resolveNodePath(root, name);
  try {
    const stats = nodeFs.statSync(fullPath);
    const info = fileInfoFromStats(name === "." ? "." : nodePath.posix.basename(name), stats);
    if (stats.isDirectory()) {
      return [nodeDirectoryFile(name, fullPath, info), undefined];
    }
    const descriptor = nodeFs.openSync(fullPath, "r");
    return [nodeRegularFile(name, descriptor, info), undefined];
  } catch (error) {
    return [undefined, normalizeFsError(error, "open", name)];
  }
}

function nodeRegularFile(path: string, descriptor: number, info: FileInfo): File {
  let closed = false;
  return {
    Stat(): [GoPtr<FileInfo>, GoError] {
      return closed ? [undefined, new PathError("stat", path, ErrClosed)] : [info, undefined];
    },
    Read(buffer: GoSlice<number>): [int, GoError] {
      if (closed) {
        return [0 as int, new PathError("read", path, ErrClosed)];
      }
      try {
        const bytes = new Uint8Array(buffer.length);
        const count = nodeFs.readSync(descriptor, bytes, 0, bytes.length, null);
        for (let index = 0; index < count; index += 1) {
          buffer[index] = bytes[index]!;
        }
        return count === 0 ? [0 as int, EOF] : [count as int, undefined];
      } catch (error) {
        return [0 as int, normalizeFsError(error, "read", path)];
      }
    },
    Close(): GoError {
      if (closed) {
        return ErrClosed;
      }
      closed = true;
      try {
        nodeFs.closeSync(descriptor);
        return undefined;
      } catch (error) {
        return normalizeFsError(error, "close", path);
      }
    },
  };
}

function nodeDirectoryFile(path: string, fullPath: string, info: FileInfo): ReadDirFile {
  let closed = false;
  let offset = 0;
  let entries: DirEntry[] | undefined;
  return {
    Stat(): [GoPtr<FileInfo>, GoError] {
      return closed ? [undefined, new PathError("stat", path, ErrClosed)] : [info, undefined];
    },
    Read(_buffer: GoSlice<number>): [int, GoError] {
      return [0 as int, new PathError("read", path, closed ? ErrClosed : ErrInvalid)];
    },
    ReadDir(count: int): [GoSlice<DirEntry>, GoError] {
      if (closed) {
        return [[], new PathError("readdir", path, ErrClosed)];
      }
      try {
        entries ??= nodeFs.readdirSync(fullPath, { withFileTypes: true }).map((dirent) => nodeDirEntry(fullPath, dirent));
        const remaining = entries.length - offset;
        if (remaining === 0 && count > 0) {
          return [[], EOF];
        }
        const length = count > 0 ? Math.min(remaining, count as number) : remaining;
        const result = entries.slice(offset, offset + length);
        offset += length;
        return [result, undefined];
      } catch (error) {
        return [[], normalizeFsError(error, "readdir", path)];
      }
    },
    Close(): GoError {
      if (closed) {
        return ErrClosed;
      }
      closed = true;
      return undefined;
    },
  };
}

function nodeDirEntry(parent: string, dirent: nodeFs.Dirent): DirEntry {
  const mode = modeFromDirent(dirent);
  return {
    Name: () => dirent.name,
    IsDir: () => dirent.isDirectory() as bool,
    Type: () => FileMode_Type(mode),
    Info: (): [GoPtr<FileInfo>, GoError] => {
      try {
        return [fileInfoFromStats(dirent.name, nodeFs.lstatSync(nodePath.join(parent, dirent.name))), undefined];
      } catch (error) {
        return [undefined, normalizeFsError(error, "lstat", dirent.name)];
      }
    },
  };
}

function nodeStat(root: string, name: string, lstat: boolean, op: string): [GoPtr<FileInfo>, GoError] {
  if (!ValidPath(name)) {
    return [undefined, new PathError(op, name, ErrInvalid)];
  }
  try {
    const stats = lstat ? nodeFs.lstatSync(resolveNodePath(root, name)) : nodeFs.statSync(resolveNodePath(root, name));
    return [fileInfoFromStats(name === "." ? "." : nodePath.posix.basename(name), stats), undefined];
  } catch (error) {
    return [undefined, normalizeFsError(error, op, name)];
  }
}

function resolveFsPath(fsys: FS, name: string): string {
  const root = (fsys as NodeFsRoot).root ?? "/";
  return resolveNodePath(root, name);
}

function resolveNodePath(root: string, name: string): string {
  return name === "." ? root : nodePath.join(root, ...name.split("/"));
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

function fileInfoFromStats(name: string, stats: nodeFs.Stats): FileInfo {
  const mode = modeFromStats(stats);
  return {
    Name: () => name,
    Size: () => stats.size as int,
    Mode: () => mode,
    ModTime: () => UnixMilli(Math.trunc(stats.mtimeMs) as long),
    IsDir: () => FileMode_IsDir(mode),
    Sys: () => stats,
  };
}

function modeFromStats(stats: nodeFs.Stats): FileMode {
  const permissions = stats.mode & ModePerm;
  if (stats.isDirectory()) {
    return (ModeDir | permissions) >>> 0;
  }
  if (stats.isSymbolicLink()) {
    return (ModeSymlink | permissions) >>> 0;
  }
  if (stats.isFile()) {
    return permissions;
  }
  return (ModeIrregular | permissions) >>> 0;
}

function normalizeFsError(error: unknown, op: string, path: string): Error {
  if (error instanceof PathError) {
    return error;
  }
  const candidate = error as NodeJS.ErrnoException;
  let cause: Error;
  switch (candidate?.code) {
    case "ENOENT":
    case "ENOTDIR":
      cause = ErrNotExist;
      break;
    case "EEXIST":
      cause = ErrExist;
      break;
    case "EACCES":
    case "EPERM":
      cause = ErrPermission;
      break;
    case "EBADF":
      cause = ErrClosed;
      break;
    case "EINVAL":
    case "EISDIR":
      cause = ErrInvalid;
      break;
    default:
      cause = error instanceof globalThis.Error ? error : new globalThis.Error(String(error));
      break;
  }
  return new PathError(op, path, cause);
}

function bytesToBinaryString(bytes: Uint8Array): string {
  let result = "";
  const chunkSize = 8192;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    result += globalThis.String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return result;
}
