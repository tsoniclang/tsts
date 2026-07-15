import type { byte, int, long } from "../scalars.js";
import type { GoDefined, GoError, GoInterface, GoMap, GoPtr, GoSlice } from "../compat.js";
import type { DirEntry, File, FileInfo, FileMode, FS, ReadDirFile } from "../io/fs.js";
import { ErrInvalid, ErrNotExist, ModeDir } from "../io/fs.js";
import { EOF } from "../io.js";
import { Time, TimeValueOps } from "../time.js";
import { GoInterfaceValueOps, GoNilSlice, GoNumberValueOps, GoSliceCopy, GoSliceLoad, GoSliceMake, GoSliceReslice, GoSliceStore, GoStringValueOps } from "../compat.js";

const utf8Encoder: TextEncoder = new TextEncoder();

export interface MapFile {
  Data: GoSlice<byte>;
  Mode: FileMode;
  ModTime: Time;
  Sys: GoInterface<unknown>;
}

export type MapFS = GoDefined<GoMap<string, GoPtr<MapFile>>, "__goDefinedType::testing/fstest::type::MapFS::b8627aef32496cc43ea7bbb8279fe3e2485fa65a78cf2ec23843ec88742066cb">;

export function MapFS_as_FS(map: MapFS): FS {
  return {
    Open: (name: string): [GoInterface<File>, GoError] => Open(map, name),
  };
}

export function TestFS(fsys: FS, expected: GoSlice<string>): GoError {
  for (
    let __goRangeSlice = expected,
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoStringValueOps,
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const path = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    const [file, err] = fsys.Open(path);
    if (err !== undefined) {
      return err;
    }
    const [info, statErr] = file!.Stat();
    if (statErr !== undefined) {
      return statErr;
    }
    if (path.endsWith("/") && !info!.IsDir()) {
      return new globalThis.Error(`fstest.TestFS: ${path} is not a directory`);
    }
  }
  return undefined;
}

export function Open(map: MapFS, name: string): [GoInterface<File>, GoError] {
  if (!validPath(name)) {
    return [undefined, ErrNotExist];
  }

  const file = map.get(name);
  if (file !== undefined && !isDirectory(file)) {
    return [openRegularFile(name, file), undefined];
  }

  const entries = directoryEntries(map, name);
  if (name !== "." && file === undefined && entries.length === 0) {
    return [undefined, ErrNotExist];
  }

  const directory = file ?? syntheticDirectory();
  return [openDirectory(name, directory, entries), undefined];
}

function openRegularFile(path: string, file: MapFile): File {
  let offset = 0;
  const info = mapFileInfo(baseName(path), file);
  return {
    Stat(): [GoInterface<FileInfo>, GoError] {
      return [info, undefined];
    },
    Read(buffer: GoSlice<byte>): [int, GoError] {
      const data = file.Data;
      if (offset >= data.length) {
        return [0, EOF];
      }
      const remaining = GoSliceReslice(data, offset, data.length);
      const count = GoSliceCopy(buffer, remaining, GoNumberValueOps);
      offset += count;
      return [count, undefined];
    },
    Close(): GoError {
      return undefined;
    },
  };
}

function openDirectory(path: string, file: MapFile, entries: GoSlice<GoInterface<DirEntry>>): ReadDirFile {
  let offset = 0;
  const info = mapFileInfo(baseName(path), file);
  return {
    Stat(): [GoInterface<FileInfo>, GoError] {
      return [info, undefined];
    },
    Read(buffer: GoSlice<byte>): [int, GoError] {
      void buffer;
      return [0, ErrInvalid];
    },
    ReadDir(count: int): [GoSlice<GoInterface<DirEntry>>, GoError] {
      let length = entries.length - offset;
      if (length === 0 && count > 0) {
        return [GoNilSlice(), EOF];
      }
      if (count > 0 && length > count) {
        length = count;
      }
      const result = GoSliceMake(length, length, GoInterfaceValueOps<DirEntry>());
      const remaining = GoSliceReslice(entries, offset, offset + length);
      GoSliceCopy(result, remaining, GoInterfaceValueOps<DirEntry>());
      offset += length;
      return [result, undefined];
    },
    Close(): GoError {
      return undefined;
    },
  };
}

function validPath(name: string): boolean {
  if (name === ".") {
    return true;
  }
  if (name.length === 0 || name.startsWith("/") || name.endsWith("/")) {
    return false;
  }
  let elementStart = 0;
  for (let index = 0; index <= name.length; index += 1) {
    if (index === name.length || name[index] === "/") {
      const element = name.slice(elementStart, index);
      if (element === "" || element === "." || element === "..") {
        return false;
      }
      elementStart = index + 1;
    }
  }
  return true;
}

function directoryEntries(map: MapFS, name: string): GoSlice<GoInterface<DirEntry>> {
  const prefix = name === "." ? "" : `${name}/`;
  const children = new Map<string, GoPtr<MapFile>>();
  for (const [path, file] of map) {
    if (name === "." && path === ".") {
      continue;
    }
    if (!path.startsWith(prefix)) {
      continue;
    }
    const remainder = path.slice(prefix.length);
    if (remainder === "") {
      continue;
    }
    const slash = remainder.indexOf("/");
    if (slash < 0) {
      children.set(remainder, file);
    } else if (!children.has(remainder.slice(0, slash))) {
      children.set(remainder.slice(0, slash), syntheticDirectory());
    }
  }

  const valueOps = GoInterfaceValueOps<DirEntry>();
  const result = GoSliceMake(children.size, children.size, valueOps);
  let index = 0;
  for (const [childName, child] of children) {
    GoSliceStore(result, index, mapDirEntry(childName, requireMapFile(child)), valueOps);
    index += 1;
  }
  sortDirEntries(result);
  return result;
}

function baseName(name: string): string {
  if (name === ".") {
    return ".";
  }
  return name.split("/").pop() ?? name;
}

function syntheticDirectory(): MapFile {
  return {
    Data: GoNilSlice(),
    Mode: ModeDir + 0o555,
    ModTime: new Time(),
    Sys: undefined,
  };
}

function requireMapFile(file: GoPtr<MapFile>): MapFile {
  if (file === undefined) {
    throw new TypeError("fstest.MapFS contains a nil MapFile entry");
  }
  return file;
}

function isDirectory(file: MapFile): boolean {
  return (file.Mode & ModeDir) !== 0;
}

function mapFileInfo(name: string, file: MapFile): FileInfo {
  return {
    Name: () => baseName(name),
    Size: (): long => file.Data.length,
    Mode: () => file.Mode,
    ModTime: () => TimeValueOps.copy(file.ModTime),
    IsDir: () => isDirectory(file),
    Sys: () => file.Sys,
  };
}

function mapDirEntry(name: string, file: MapFile): DirEntry {
  const info = mapFileInfo(name, file);
  return {
    Name: () => baseName(name),
    IsDir: () => isDirectory(file),
    Type: () => file.Mode,
    Info: (): [GoInterface<FileInfo>, GoError] => [info, undefined],
  };
}

function sortDirEntries(entries: GoSlice<GoInterface<DirEntry>>): void {
  const valueOps = GoInterfaceValueOps<DirEntry>();
  for (let index = 1; index < entries.length; index += 1) {
    const entry = requireDirEntry(GoSliceLoad(entries, index, valueOps));
    let insertion = index;
    while (insertion > 0) {
      const previous = requireDirEntry(GoSliceLoad(entries, insertion - 1, valueOps));
      if (compareGoStrings(previous.Name(), entry.Name()) <= 0) {
        break;
      }
      GoSliceStore(entries, insertion, previous, valueOps);
      insertion -= 1;
    }
    GoSliceStore(entries, insertion, entry, valueOps);
  }
}

function compareGoStrings(left: string, right: string): number {
  const leftBytes = utf8Encoder.encode(left);
  const rightBytes = utf8Encoder.encode(right);
  const length = Math.min(leftBytes.length, rightBytes.length);
  for (let index = 0; index < length; index += 1) {
    const difference = leftBytes[index]! - rightBytes[index]!;
    if (difference !== 0) return difference;
  }
  return leftBytes.length - rightBytes.length;
}

function requireDirEntry(entry: GoInterface<DirEntry>): DirEntry {
  if (entry === undefined) {
    throw new TypeError("fstest.MapFS directory entry is nil");
  }
  return entry;
}
