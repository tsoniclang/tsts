import type { byte, int, long } from "../scalars.js";
import type { GoDefined, GoError, GoInterface, GoMap, GoPtr, GoSlice } from "../compat.js";
import type { DirEntry, File, FileInfo, FileMode, FS, ReadDirFile } from "../io/fs.js";
import { ErrNotExist, ModeDir } from "../io/fs.js";
import { Time } from "../time.js";
import { GoInterfaceValueOps, GoSliceMake } from "../compat.js";
import { GoNumberValueOps, GoSliceStore } from "../compat.js";



export interface MapFile {
  Data: GoSlice<byte>;
  Mode: FileMode;
  ModTime: Time;
  Sys: GoInterface<unknown>;
}

export type MapFS = GoDefined<GoMap<string, GoPtr<MapFile>>, "__goDefinedType::testing/fstest::type::MapFS::cf85c84c3e20711899a136abf73c8b60a8eb8a5a4904fd17de1c9813fa0be8f4">;

export function MapFS_as_FS(map: MapFS): FS {
  return {
    Open: (name: string): [GoInterface<File>, GoError] => Open(map, name),
  };
}

export function TestFS(fsys: FS, ...expected: GoSlice<string>): GoError {
  for (const path of expected) {
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
  const normalizedName = normalizeName(name);
  const file = map.get(normalizedName);
  if (file === undefined && !hasDirectory(map, normalizedName)) {
    return [undefined, ErrNotExist];
  }
  const isSyntheticDirectory = file === undefined;
  const mode = isSyntheticDirectory ? ModeDir : file.Mode;
  const bytes = isSyntheticDirectory ? new Uint8Array() : bytesForFile(file);
  let offset = 0;
  const mapFile: ReadDirFile = {
    Stat(): [GoInterface<FileInfo>, GoError] {
      return [{
        Name: () => baseName(normalizedName),
        IsDir: () => (((mode as number) & (ModeDir as number)) !== 0) as boolean,
        Mode: () => mode,
        Size: () => bytes.length as long,
        ModTime: () => file?.ModTime ?? new Time(0),
        Sys: () => file?.Sys,
      }, undefined];
    },
    ReadDir(n: int): [GoSlice<GoInterface<DirEntry>>, GoError] {
      if (((mode as number) & (ModeDir as number)) === 0) {
        return [GoSliceMake(0, 0, GoInterfaceValueOps<DirEntry>()), ErrNotExist];
      }
      const entries = directoryEntries(map, normalizedName);
      return [n >= 0 ? entries.slice(0, n) : entries, undefined];
    },
    Read(buffer: GoSlice<byte>): [int, GoError] {
      const remaining = bytes.length - offset;
      const count = Math.max(0, Math.min(buffer.length, remaining));
      for (let index = 0; index < count; index += 1) {
        GoSliceStore(buffer, index, bytes[offset + index]!, GoNumberValueOps);
      }
      offset += count;
      return [count as int, undefined];
    },
    Close(): GoError {
      return undefined;
    },
  };
  return [mapFile, undefined];
}

function normalizeName(name: string): string {
  if (name === "." || name === "") {
    return ".";
  }
  return name.replace(/^\.\/+/, "").replace(/\/+$/, "");
}

function hasDirectory(map: MapFS, name: string): boolean {
  if (name === ".") {
    return map.size > 0;
  }
  const prefix = `${name}/`;
  for (const path of map.keys()) {
    if (path.startsWith(prefix)) {
      return true;
    }
  }
  return false;
}

function directoryEntries(map: MapFS, name: string): GoSlice<GoInterface<DirEntry>> {
  const prefix = name === "." ? "" : `${name}/`;
  const childNames = new Map<string, FileMode>();
  for (const [path, file] of map.entries()) {
    if (!path.startsWith(prefix)) {
      continue;
    }
    const remainder = path.slice(prefix.length);
    if (remainder === "") {
      continue;
    }
    const slash = remainder.indexOf("/");
    if (slash < 0) {
      childNames.set(remainder, file?.Mode ?? 0 as FileMode);
    } else {
      childNames.set(remainder.slice(0, slash), ModeDir);
    }
  }
  return Array.from(childNames.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([childName, mode]) => {
      const isDir = (((mode as number) & (ModeDir as number)) !== 0) as boolean;
      const info: FileInfo = {
        Name: () => childName,
        IsDir: () => isDir,
        Mode: () => mode,
        Size: () => 0 as long,
        ModTime: () => new Time(0),
        Sys: () => undefined,
      };
      return {
        Name: () => childName,
        IsDir: () => isDir,
        Type: () => mode,
        Info: (): [GoInterface<FileInfo>, GoError] => [info, undefined],
      };
    });
}

function baseName(name: string): string {
  if (name === ".") {
    return ".";
  }
  return name.split("/").pop() ?? name;
}

function bytesForFile(file: MapFile): Uint8Array {
  return Uint8Array.from(file.Data);
}
