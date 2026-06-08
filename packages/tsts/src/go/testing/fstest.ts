import type { byte, int } from "@tsonic/core/types.js";
import type { GoError, GoSlice } from "../compat.js";
import type { File, FileInfo, FileMode, FS } from "../io/fs.js";
import { ErrNotExist, ModeDir, Stat } from "../io/fs.js";
import { Time } from "../time.js";

export interface MapFile {
  Data?: GoSlice<byte> | Uint8Array | string;
  Mode?: FileMode;
  ModTime?: Date | Time;
  Sys?: unknown;
}

export type MapFS = Map<string, MapFile>;

export function TestFS(fsys: FS, ...expected: GoSlice<string>): GoError {
  for (const path of expected) {
    if (fsys.Open === undefined) {
      const [info, statErr] = Stat(fsys, path);
      if (statErr !== undefined) {
        return statErr;
      }
      if (path.endsWith("/") && !info.IsDir()) {
        return new globalThis.Error(`fstest.TestFS: ${path} is not a directory`);
      }
      continue;
    }
    const [file, err] = fsys.Open(path);
    if (err !== undefined) {
      return err;
    }
    const [info, statErr] = file.Stat();
    if (statErr !== undefined) {
      return statErr;
    }
    if (path.endsWith("/") && !info.IsDir()) {
      return new globalThis.Error(`fstest.TestFS: ${path} is not a directory`);
    }
  }
  return undefined;
}

export function Open(map: MapFS, name: string): [File, GoError] {
  const file = map.get(name);
  if (file === undefined) {
    return [undefined as unknown as File, ErrNotExist];
  }
  const bytes = bytesForFile(file);
  let offset = 0;
  const mapFile: File = {
    Stat(): [FileInfo, GoError] {
      const mode = file.Mode ?? 0 as FileMode;
      return [{
        Name: () => name.split("/").pop() ?? name,
        IsDir: () => (((mode as number) & (ModeDir as number)) !== 0) as boolean,
        Mode: () => mode,
        Size: () => bytes.length as int,
        ModTime: () => modTimeToDate(file.ModTime),
        Sys: () => file.Sys,
      }, undefined];
    },
    Read(buffer: GoSlice<number>): [int, GoError] {
      const remaining = bytes.length - offset;
      const count = Math.max(0, Math.min(buffer.length, remaining));
      for (let index = 0; index < count; index += 1) {
        buffer[index] = bytes[offset + index]!;
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

function bytesForFile(file: MapFile): Uint8Array {
  if (file.Data === undefined) {
    return new Uint8Array();
  }
  if (typeof file.Data === "string") {
    return new TextEncoder().encode(file.Data);
  }
  if (file.Data instanceof Uint8Array) {
    return file.Data;
  }
  return Uint8Array.from(file.Data);
}

function modTimeToDate(value: Date | Time | undefined): Date {
  if (value === undefined) {
    return new Date(0);
  }
  return value instanceof Time ? value.ToDate() : value;
}
