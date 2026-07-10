import { posix as path } from "node:path";

import type { GoError, GoSlice } from "../compat.js";
import { EOF } from "../io.js";
import type { DirEntry, File, FileInfo, FileMode, FS, ReadDirFile } from "../io/fs.js";
import {
  ErrInvalid,
  ErrNotExist,
  FileMode_IsDir,
  FileMode_Type,
  Lstat as fs_Lstat,
  ModeDir,
  ModeSymlink,
  PathError,
  ReadDir as fs_ReadDir,
  ReadFileBytes as fs_ReadFileBytes,
  Stat as fs_Stat,
  Sub as fs_Sub,
  ValidPath,
} from "../io/fs.js";
import type { bool, byte, int } from "../scalars.js";
import { Time } from "../time.js";

export interface MapFile {
  Data?: GoSlice<byte> | Uint8Array | string;
  Mode?: FileMode;
  ModTime?: Time;
  Sys?: unknown;
}

export type MapFS = Map<string, MapFile>;

interface SeekFile extends File {
  Seek(offset: number, whence: int): [number, GoError];
  ReadAt(buffer: GoSlice<number>, offset: number): [int, GoError];
}

interface MapFileInfo extends FileInfo, DirEntry {
  readonly source: MapFile;
  readonly __tsgoMapFileInfo?: never;
}

export function MapFS_as_FS(map: MapFS): FS {
  const base: FS = {
    Open: (name: string): [File, GoError] => Open(map, name),
    ReadLink: (name: string): [string, GoError] => ReadLink(map, name),
    Lstat: (name: string): [FileInfo, GoError] => Lstat(map, name),
  };
  return {
    ...base,
    ReadFile: (name: string): [Uint8Array, GoError] => fs_ReadFileBytes(base, name),
    ReadDir: (name: string): [GoSlice<DirEntry>, GoError] => fs_ReadDir(base, name),
    Stat: (name: string): [FileInfo, GoError] => fs_Stat(base, name),
    Sub: (dir: string): [FS, GoError] => fs_Sub(base, dir),
  };
}

export function Open(map: MapFS, name: string): [File, GoError] {
  if (!ValidPath(name)) {
    return [undefined as unknown as File, new PathError("open", name, ErrNotExist)];
  }

  const [realName, resolved] = resolveSymlinks(map, name);
  if (!resolved) {
    return [undefined as unknown as File, new PathError("open", name, ErrNotExist)];
  }

  let file = map.get(realName);
  if (file !== undefined && !FileMode_IsDir(file.Mode ?? 0)) {
    return [openMapFile(name, mapFileInfo(path.basename(name), file)), undefined];
  }

  const entries: MapFileInfo[] = [];
  const needed = new Set<string>();
  if (realName === ".") {
    for (const [fileName, child] of map) {
      const slash = fileName.indexOf("/");
      if (slash < 0) {
        if (fileName !== ".") {
          entries.push(mapFileInfo(fileName, child));
        }
      } else {
        needed.add(fileName.slice(0, slash));
      }
    }
  } else {
    const prefix = `${realName}/`;
    for (const [fileName, child] of map) {
      if (!fileName.startsWith(prefix)) {
        continue;
      }
      const element = fileName.slice(prefix.length);
      const slash = element.indexOf("/");
      if (slash < 0) {
        entries.push(mapFileInfo(element, child));
      } else {
        needed.add(element.slice(0, slash));
      }
    }
    if (file === undefined && entries.length === 0 && needed.size === 0) {
      return [undefined as unknown as File, new PathError("open", name, ErrNotExist)];
    }
  }

  for (const entry of entries) {
    needed.delete(entry.Name());
  }
  for (const childName of needed) {
    entries.push(mapFileInfo(childName, { Mode: (ModeDir | 0o555) >>> 0 }));
  }
  entries.sort((left, right) => compareByteStrings(left.Name(), right.Name()));

  file ??= { Mode: (ModeDir | 0o555) >>> 0 };
  return [mapDir(name, mapFileInfo(name === "." ? "." : path.basename(name), file), entries), undefined];
}

export function ReadLink(map: MapFS, name: string): [string, GoError] {
  const [info, err] = lstat(map, name);
  if (err !== undefined) {
    return ["", new PathError("readlink", name, err)];
  }
  if (FileMode_Type(info.Mode()) !== ModeSymlink) {
    return ["", new PathError("readlink", name, ErrInvalid)];
  }
  return [dataAsString(map.get(resolveLstatName(map, name))!), undefined];
}

export function Lstat(map: MapFS, name: string): [FileInfo, GoError] {
  const [info, err] = lstat(map, name);
  return err === undefined
    ? [info, undefined]
    : [undefined as unknown as FileInfo, new PathError("lstat", name, err)];
}

export function TestFS(fsys: FS, ...expected: GoSlice<string>): GoError {
  const err = testFS(fsys, expected);
  if (err !== undefined) {
    return err;
  }
  for (const name of expected) {
    const slash = name.indexOf("/");
    if (slash < 0) {
      continue;
    }
    const dir = name.slice(0, slash);
    const prefix = `${dir}/`;
    const subExpected = expected.filter((candidate) => candidate.startsWith(prefix)).map((candidate) => candidate.slice(prefix.length));
    const [sub, subErr] = fs_Sub(fsys, dir);
    if (subErr !== undefined) {
      return subErr;
    }
    const nestedErr = testFS(sub, subExpected);
    if (nestedErr !== undefined) {
      return new contextualError(`testing fs.Sub(fsys, ${dir}): ${nestedErr.message}`, nestedErr);
    }
    break;
  }
  return undefined;
}

function testFS(fsys: FS, expected: GoSlice<string>): GoError {
  const tester = new fsTester(fsys);
  tester.checkDir(".");
  tester.checkOpen(".");

  const found = new Set([...tester.directories, ...tester.files]);
  found.delete(".");
  if (expected.length === 0 && found.size > 0) {
    const names = [...found].sort(compareByteStrings);
    const display = names.length > 15 ? [...names.slice(0, 10), "..."] : names;
    tester.error(`expected empty file system but found files:\n${display.join("\n")}`);
  }
  for (const name of expected) {
    if (!found.has(name)) {
      tester.error(`expected but not found: ${name}`);
    }
  }
  return tester.result();
}

class fsTester {
  readonly directories: string[] = [];
  readonly files: string[] = [];
  readonly errors: Error[] = [];

  constructor(private readonly fsys: FS) {}

  error(message: string, cause?: Error): void {
    this.errors.push(cause === undefined ? new globalThis.Error(message) : new contextualError(message, cause));
  }

  result(): GoError {
    return this.errors.length === 0 ? undefined : new joinedTestError(this.errors);
  }

  private openDir(dir: string): ReadDirFile | undefined {
    const [file, err] = this.fsys.Open(dir);
    if (err !== undefined) {
      this.error(`${dir}: Open: ${err.message}`, err);
      return undefined;
    }
    if (!isReadDirFile(file)) {
      file.Close();
      this.error(`${dir}: Open returned File, not a fs.ReadDirFile`);
      return undefined;
    }
    return file;
  }

  checkDir(dir: string): void {
    this.directories.push(dir);
    let directory = this.openDir(dir);
    if (directory === undefined) {
      return;
    }
    const [entries, readErr] = directory.ReadDir(-1 as int);
    if (readErr !== undefined) {
      directory.Close();
      this.error(`${dir}: ReadDir(-1): ${readErr.message}`, readErr);
      return;
    }

    const prefix = dir === "." ? "" : `${dir}/`;
    for (const entry of entries) {
      const name = entry.Name();
      if (name === "." || name === ".." || name === "" || name.includes("/") || name.includes("\\")) {
        this.error(`${dir}: ReadDir: child has invalid name: ${JSON.stringify(name)}`);
        continue;
      }
      const childPath = `${prefix}${name}`;
      this.checkStat(childPath, entry);
      this.checkOpen(childPath);
      const entryType = entry.Type();
      if (entryType === ModeDir) {
        this.checkDir(childPath);
      } else if ((entryType & ModeSymlink) !== 0) {
        this.files.push(childPath);
      } else {
        this.checkFile(childPath);
      }
    }

    let [atEnd, endErr] = directory.ReadDir(-1 as int);
    if (atEnd.length !== 0 || endErr !== undefined) {
      directory.Close();
      this.error(`${dir}: ReadDir(-1) at EOF = ${atEnd.length} entries, ${formatError(endErr)}, wanted 0 entries, nil`, endErr);
      return;
    }
    [atEnd, endErr] = directory.ReadDir(1 as int);
    if (atEnd.length !== 0 || endErr !== EOF) {
      directory.Close();
      this.error(`${dir}: ReadDir(1) at EOF = ${atEnd.length} entries, ${formatError(endErr)}, wanted 0 entries, EOF`, endErr);
      return;
    }
    const closeErr = directory.Close();
    if (closeErr !== undefined) {
      this.error(`${dir}: Close: ${closeErr.message}`, closeErr);
    }
    directory.Close();

    directory = this.openDir(dir);
    if (directory === undefined) {
      return;
    }
    const [second, secondErr] = directory.ReadDir(-1 as int);
    directory.Close();
    if (secondErr !== undefined) {
      this.error(`${dir}: second Open+ReadDir(-1): ${secondErr.message}`, secondErr);
      return;
    }
    this.checkDirList(dir, "first Open+ReadDir(-1) vs second Open+ReadDir(-1)", entries, second);

    directory = this.openDir(dir);
    if (directory === undefined) {
      return;
    }
    const fragmented: DirEntry[] = [];
    for (;;) {
      const count = fragmented.length === 0 ? 1 : 2;
      const [fragment, fragmentErr] = directory.ReadDir(count as int);
      if (fragment.length > count) {
        this.error(`${dir}: ReadDir(${count}) returned ${fragment.length} entries`);
        break;
      }
      fragmented.push(...fragment);
      if (fragmentErr === EOF) {
        break;
      }
      if (fragmentErr !== undefined) {
        this.error(`${dir}: fragmented ReadDir: ${fragmentErr.message}`, fragmentErr);
        break;
      }
      if (fragment.length === 0) {
        this.error(`${dir}: fragmented ReadDir returned 0 entries and nil error`);
        break;
      }
    }
    directory.Close();
    this.checkDirList(dir, "first Open+ReadDir(-1) vs fragmented ReadDir", entries, fragmented);

    const [helperEntries, helperErr] = fs_ReadDir(this.fsys, dir);
    if (helperErr !== undefined) {
      this.error(`${dir}: fs.ReadDir: ${helperErr.message}`, helperErr);
      return;
    }
    this.checkDirList(dir, "first Open+ReadDir(-1) vs fs.ReadDir", entries, helperEntries);
    for (let index = 0; index + 1 < helperEntries.length; index += 1) {
      if (compareByteStrings(helperEntries[index]!.Name(), helperEntries[index + 1]!.Name()) >= 0) {
        this.error(`${dir}: fs.ReadDir: list not sorted: ${helperEntries[index]!.Name()} before ${helperEntries[index + 1]!.Name()}`);
      }
    }
  }

  private checkStat(filePath: string, entry: DirEntry): void {
    const [file, openErr] = this.fsys.Open(filePath);
    if (openErr !== undefined) {
      this.error(`${filePath}: Open: ${openErr.message}`, openErr);
      return;
    }
    const [info, statErr] = file.Stat();
    file.Close();
    if (statErr !== undefined) {
      this.error(`${filePath}: Stat: ${statErr.message}`, statErr);
      return;
    }

    if ((entry.Type() & ModeSymlink) === 0 && formatEntry(entry) !== formatInfoEntry(info)) {
      this.error(`${filePath}: directory entry does not match file.Stat()`);
    }
    const [entryInfo, entryErr] = entry.Info();
    if (entryErr !== undefined) {
      this.error(`${filePath}: entry.Info: ${entryErr.message}`, entryErr);
      return;
    }
    if ((entry.Type() & ModeSymlink) !== 0) {
      if (formatEntry(entry) !== formatInfoEntry(entryInfo)) {
        this.error(`${filePath}: symlink entry does not match entry.Info()`);
      }
    } else if (!sameFileInfo(entryInfo, info)) {
      this.error(`${filePath}: entry.Info() does not match file.Stat()`);
    }

    const [helperInfo, helperErr] = fs_Stat(this.fsys, filePath);
    if (helperErr !== undefined) {
      this.error(`${filePath}: fs.Stat: ${helperErr.message}`, helperErr);
    } else if (!sameFileInfo(helperInfo, info)) {
      this.error(`${filePath}: fs.Stat() does not match file.Stat()`);
    }

    if (typeof this.fsys.Lstat === "function") {
      const [lstatInfo, lstatErr] = fs_Lstat(this.fsys, filePath);
      if (lstatErr !== undefined) {
        this.error(`${filePath}: fsys.Lstat: ${lstatErr.message}`, lstatErr);
      } else if (!sameFileInfo(lstatInfo, entryInfo)) {
        this.error(`${filePath}: fsys.Lstat() does not match entry.Info()`);
      }
    }
  }

  private checkFile(filePath: string): void {
    this.files.push(filePath);
    const [file, openErr] = this.fsys.Open(filePath);
    if (openErr !== undefined) {
      this.error(`${filePath}: Open: ${openErr.message}`, openErr);
      return;
    }
    const [data, readErr] = readAll(file);
    if (readErr !== undefined) {
      file.Close();
      this.error(`${filePath}: Open+ReadAll: ${readErr.message}`, readErr);
      return;
    }
    const closeErr = file.Close();
    if (closeErr !== undefined) {
      this.error(`${filePath}: Close: ${closeErr.message}`, closeErr);
    }
    file.Close();

    if (typeof this.fsys.ReadFile === "function") {
      const [direct, directErr] = this.fsys.ReadFile(filePath);
      if (directErr !== undefined) {
        this.error(`${filePath}: fsys.ReadFile: ${directErr.message}`, directErr);
        return;
      }
      if (!sameBytes(data, direct)) {
        this.error(`${filePath}: ReadAll and fsys.ReadFile returned different data`);
      }
      if (direct.length > 0) {
        direct[0] = (direct[0]! + 1) & 0xff;
      }
      const [again, againErr] = this.fsys.ReadFile(filePath);
      if (againErr !== undefined || !sameBytes(data, again)) {
        this.error(`${filePath}: fsys.ReadFile did not return an independent copy`, againErr);
      }
      this.checkBadPath(filePath, "ReadFile", (name) => this.fsys.ReadFile!(name)[1]);
    }

    const [helper, helperErr] = fs_ReadFileBytes(this.fsys, filePath);
    if (helperErr !== undefined) {
      this.error(`${filePath}: fs.ReadFile: ${helperErr.message}`, helperErr);
    } else if (!sameBytes(data, helper)) {
      this.error(`${filePath}: ReadAll and fs.ReadFile returned different data`);
    }
  }

  checkOpen(filePath: string): void {
    this.checkBadPath(filePath, "Open", (name) => {
      const [file, err] = this.fsys.Open(name);
      if (err === undefined) {
        file.Close();
      }
      return err;
    });
  }

  private checkBadPath(filePath: string, description: string, open: (name: string) => GoError): void {
    const bad = [`/${filePath}`, `${filePath}/.`];
    if (filePath === ".") {
      bad.push("/");
    }
    const firstSlash = filePath.indexOf("/");
    if (firstSlash >= 0) {
      bad.push(
        `${filePath.slice(0, firstSlash)}//${filePath.slice(firstSlash + 1)}`,
        `${filePath.slice(0, firstSlash)}/./${filePath.slice(firstSlash + 1)}`,
        `${filePath.slice(0, firstSlash)}\\${filePath.slice(firstSlash + 1)}`,
        `${filePath.slice(0, firstSlash)}/../${filePath}`,
      );
    }
    const lastSlash = filePath.lastIndexOf("/");
    if (lastSlash >= 0) {
      bad.push(
        `${filePath.slice(0, lastSlash)}//${filePath.slice(lastSlash + 1)}`,
        `${filePath.slice(0, lastSlash)}/./${filePath.slice(lastSlash + 1)}`,
        `${filePath.slice(0, lastSlash)}\\${filePath.slice(lastSlash + 1)}`,
        `${filePath}/../${filePath.slice(lastSlash + 1)}`,
      );
    }
    for (const name of bad) {
      if (open(name) === undefined) {
        this.error(`${filePath}: ${description}(${name}) succeeded, want error`);
      }
    }
  }

  private checkDirList(dir: string, description: string, left: DirEntry[], right: DirEntry[]): void {
    const leftEntries = new Map(left.map((entry) => [entry.Name(), entry]));
    if (leftEntries.size !== left.length) {
      this.error(`${dir}: duplicate entry in ${description}`);
    }
    for (const entry of right) {
      const expected = leftEntries.get(entry.Name());
      if (expected === undefined || formatEntry(expected) !== formatEntry(entry)) {
        this.error(`${dir}: directory list differs in ${description}`);
        return;
      }
      if (entry.IsDir() !== FileMode_IsDir(entry.Type())) {
        this.error(`${dir}: ${entry.Name()} has inconsistent IsDir and Type`);
      }
      leftEntries.delete(entry.Name());
    }
    if (leftEntries.size !== 0 || right.length !== left.length) {
      this.error(`${dir}: directory list differs in ${description}`);
    }
  }
}

function resolveSymlinks(map: MapFS, name: string): [string, bool] {
  const direct = map.get(name);
  if (direct !== undefined && FileMode_Type(direct.Mode ?? 0) === ModeSymlink) {
    const target = dataAsString(direct);
    if (path.isAbsolute(target)) {
      return ["", false];
    }
    return resolveSymlinks(map, path.join(path.dirname(name), target));
  }

  const elements = name.split("/");
  for (let count = 1; count < elements.length; count += 1) {
    const directory = elements.slice(0, count).join("/");
    const file = map.get(directory);
    if (file === undefined || FileMode_Type(file.Mode ?? 0) !== ModeSymlink) {
      continue;
    }
    const target = dataAsString(file);
    if (path.isAbsolute(target)) {
      return ["", false];
    }
    const resolved = path.join(path.dirname(directory), target, ...elements.slice(count));
    return resolveSymlinks(map, resolved);
  }
  return [name, ValidPath(name)];
}

function resolveLstatName(map: MapFS, name: string): string {
  const [realDirectory] = resolveSymlinks(map, path.dirname(name));
  return path.join(realDirectory, path.basename(name));
}

function lstat(map: MapFS, name: string): [MapFileInfo, GoError] {
  if (!ValidPath(name)) {
    return [undefined as unknown as MapFileInfo, ErrNotExist];
  }
  const [realDirectory, resolved] = resolveSymlinks(map, path.dirname(name));
  if (!resolved) {
    return [undefined as unknown as MapFileInfo, ErrNotExist];
  }
  const element = path.basename(name);
  const realName = path.join(realDirectory, element);
  const file = map.get(realName);
  if (file !== undefined) {
    return [mapFileInfo(element, file), undefined];
  }
  if (realName === ".") {
    return [mapFileInfo(element, { Mode: (ModeDir | 0o555) >>> 0 }), undefined];
  }
  const prefix = `${realName}/`;
  for (const fileName of map.keys()) {
    if (fileName.startsWith(prefix)) {
      return [mapFileInfo(element, { Mode: (ModeDir | 0o555) >>> 0 }), undefined];
    }
  }
  return [undefined as unknown as MapFileInfo, ErrNotExist];
}

function mapFileInfo(name: string, file: MapFile): MapFileInfo {
  const info: MapFileInfo = {
    source: file,
    Name: () => path.basename(name),
    Size: () => bytesForFile(file).length as int,
    Mode: () => (file.Mode ?? 0) >>> 0,
    Type: () => FileMode_Type((file.Mode ?? 0) >>> 0),
    ModTime: () => file.ModTime ?? new Time(),
    IsDir: () => FileMode_IsDir((file.Mode ?? 0) >>> 0),
    Sys: () => file.Sys,
    Info: () => [info, undefined],
  };
  return info;
}

function openMapFile(filePath: string, info: MapFileInfo): SeekFile {
  let offset = 0;
  return {
    Stat: () => [info, undefined],
    Close: () => undefined,
    Read(buffer: GoSlice<number>): [int, GoError] {
      const data = bytesForFileInfo(info);
      if (offset >= data.length) {
        return [0 as int, EOF];
      }
      if (offset < 0) {
        return [0 as int, new PathError("read", filePath, ErrInvalid)];
      }
      const count = Math.min(buffer.length, data.length - offset);
      for (let index = 0; index < count; index += 1) {
        buffer[index] = data[offset + index]!;
      }
      offset += count;
      return [count as int, undefined];
    },
    Seek(nextOffset: number, whence: int): [number, GoError] {
      const dataLength = bytesForFileInfo(info).length;
      if (whence === 1) {
        nextOffset += offset;
      } else if (whence === 2) {
        nextOffset += dataLength;
      }
      if (nextOffset < 0 || nextOffset > dataLength) {
        return [0, new PathError("seek", filePath, ErrInvalid)];
      }
      offset = nextOffset;
      return [offset, undefined];
    },
    ReadAt(buffer: GoSlice<number>, readOffset: number): [int, GoError] {
      const data = bytesForFileInfo(info);
      if (readOffset < 0 || readOffset > data.length) {
        return [0 as int, new PathError("read", filePath, ErrInvalid)];
      }
      const count = Math.min(buffer.length, data.length - readOffset);
      for (let index = 0; index < count; index += 1) {
        buffer[index] = data[readOffset + index]!;
      }
      return [count as int, count < buffer.length ? EOF : undefined];
    },
  };
}

function mapDir(directoryPath: string, info: MapFileInfo, entries: MapFileInfo[]): ReadDirFile {
  let offset = 0;
  return {
    Stat: () => [info, undefined],
    Close: () => undefined,
    Read: () => [0 as int, new PathError("read", directoryPath, ErrInvalid)],
    ReadDir(count: int): [GoSlice<DirEntry>, GoError] {
      const remaining = entries.length - offset;
      if (remaining === 0 && count > 0) {
        return [[], EOF];
      }
      const length = count > 0 ? Math.min(remaining, count as number) : remaining;
      const result: DirEntry[] = entries.slice(offset, offset + length);
      offset += length;
      return [result, undefined];
    },
  };
}

function bytesForFileInfo(info: MapFileInfo): Uint8Array {
  return bytesForFile(info.source);
}

function bytesForFile(file: MapFile): Uint8Array {
  if (file.Data === undefined) {
    return new Uint8Array();
  }
  if (typeof file.Data === "string") {
    return new TextEncoder().encode(file.Data);
  }
  return file.Data instanceof Uint8Array ? file.Data : Uint8Array.from(file.Data);
}

function dataAsString(file: MapFile): string {
  if (typeof file.Data === "string") {
    return file.Data;
  }
  const data = bytesForFile(file);
  let result = "";
  for (const value of data) {
    result += String.fromCharCode(value);
  }
  return result;
}

function isReadDirFile(file: File): file is ReadDirFile {
  return typeof (file as Partial<ReadDirFile>).ReadDir === "function";
}

function readAll(file: File): [Uint8Array, GoError] {
  const result: number[] = [];
  const buffer = new Array<number>(3).fill(0);
  let emptyReads = 0;
  for (;;) {
    const [count, err] = file.Read(buffer);
    for (let index = 0; index < count; index += 1) {
      result.push(buffer[index]!);
    }
    if (err !== undefined) {
      return [Uint8Array.from(result), err === EOF ? undefined : err];
    }
    if (count === 0) {
      emptyReads += 1;
      if (emptyReads >= 100) {
        return [Uint8Array.from(result), new globalThis.Error("multiple Read calls return no data or error")];
      }
    } else {
      emptyReads = 0;
    }
  }
}

function formatEntry(entry: DirEntry): string {
  return `${entry.Name()} IsDir=${entry.IsDir()} Type=${entry.Type()}`;
}

function formatInfoEntry(info: FileInfo): string {
  return `${info.Name()} IsDir=${info.IsDir()} Type=${FileMode_Type(info.Mode())}`;
}

function sameFileInfo(left: FileInfo, right: FileInfo): boolean {
  return left.Name() === right.Name()
    && left.Size() === right.Size()
    && left.Mode() === right.Mode()
    && left.IsDir() === right.IsDir()
    && sameTime(left.ModTime(), right.ModTime());
}

function sameTime(left: Time, right: Time): boolean {
  return left.Equal(right);
}

function sameBytes(left: Uint8Array, right: Uint8Array): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function formatError(error: GoError): string {
  return error?.message ?? "nil";
}

class contextualError extends globalThis.Error {
  constructor(message: string, private readonly causeError: Error) {
    super(message);
  }

  Unwrap(): GoError {
    return this.causeError;
  }
}

class joinedTestError extends globalThis.Error {
  constructor(private readonly errors: Error[]) {
    super(`TestFS found errors:\n${errors.map((error) => error.message).join("\n")}`);
  }

  Unwrap(): GoError[] {
    return this.errors;
  }
}

const utf8Encoder = new TextEncoder();

function compareByteStrings(left: string, right: string): number {
  const leftBytes = utf8Encoder.encode(left);
  const rightBytes = utf8Encoder.encode(right);
  const count = Math.min(leftBytes.length, rightBytes.length);
  for (let index = 0; index < count; index += 1) {
    if (leftBytes[index] !== rightBytes[index]) {
      return leftBytes[index]! < rightBytes[index]! ? -1 : 1;
    }
  }
  return leftBytes.length - rightBytes.length;
}
