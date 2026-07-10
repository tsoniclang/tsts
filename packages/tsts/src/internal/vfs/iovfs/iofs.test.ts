import { test } from "node:test";
import assert from "node:assert/strict";
import type { bool } from "../../../go/scalars.js";
import type { FileMode, FS as GoFS } from "../../../go/io/fs.js";
import { MapFS_as_FS } from "../../../go/testing/fstest.js";
import type { MapFS } from "../../../go/testing/fstest.js";
import { Time } from "../../../go/time.js";
import { SkipDir } from "../vfs.js";
import type { WalkDirFunc } from "../vfs.js";
import { From } from "./iofs.js";

function createTestFS(): MapFS {
  return new Map([
    ["foo.ts", { Data: "hello, world" }],
    ["dir1/file1.ts", { Data: "export const foo = 42;" }],
    ["dir1/file2.ts", { Data: "export const foo = 42;" }],
    ["dir2/file1.ts", { Data: "export const foo = 42;" }],
  ]);
}

test("IOFS mirrors TS-Go ReadFile, existence, directory entries, walking, and realpath", () => {
  const fs = From(MapFS_as_FS(createTestFS()), true as bool);

  assert.deepEqual(fs.ReadFile("/foo.ts"), ["hello, world", true]);
  assert.deepEqual(fs.ReadFile("/does/not/exist.ts"), ["", false]);
  assert.throws(() => fs.ReadFile("bar"), /vfs: path "bar" is not absolute/);

  assert.equal(fs.FileExists("/foo.ts"), true);
  assert.equal(fs.FileExists("/bar"), false);

  assert.equal(fs.DirectoryExists("/"), true);
  assert.equal(fs.DirectoryExists("/dir1"), true);
  assert.equal(fs.DirectoryExists("/dir1/"), true);
  assert.equal(fs.DirectoryExists("/dir1/./"), true);
  assert.equal(fs.DirectoryExists("/bar"), false);

  assert.deepEqual(fs.GetAccessibleEntries("/").Directories, ["dir1", "dir2"]);
  assert.deepEqual(fs.GetAccessibleEntries("/").Files, ["foo.ts"]);

  const files: string[] = [];
  const walkFn: WalkDirFunc = (path, d, err) => {
    if (err !== undefined) {
      return err;
    }
    if (!d!.IsDir()) {
      files.push(path);
    }
    return undefined;
  };
  assert.equal(fs.WalkDir("/", walkFn), undefined);
  assert.deepEqual(files.sort(), ["/dir1/file1.ts", "/dir1/file2.ts", "/dir2/file1.ts", "/foo.ts"]);

  const skippedFiles: string[] = [];
  const skipWalkFn: WalkDirFunc = (path, d, err) => {
    if (err !== undefined) {
      return err;
    }
    if (!d!.IsDir()) {
      skippedFiles.push(path);
    }
    return path === "/" ? undefined : SkipDir;
  };
  assert.equal(fs.WalkDir("/", skipWalkFn), undefined);
  assert.deepEqual(skippedFiles.sort(), ["/foo.ts"]);

  assert.equal(fs.Realpath("/foo.ts"), "/foo.ts");
  assert.equal(fs.UseCaseSensitiveFileNames(), true);
});

test("From requires the complete WritableFS method set", () => {
  const base = MapFS_as_FS(createTestFS());
  let partialWriteCalls = 0;
  const partial: GoFS = {
    ...base,
    WriteFile: () => {
      partialWriteCalls += 1;
      return undefined;
    },
  } as GoFS;

  const fs = From(partial, true as bool);
  assert.throws(() => fs.WriteFile("/file.ts", "text"), /writeFile not supported/);
  assert.throws(() => fs.AppendFile("/file.ts", "text"), /appendFile not supported/);
  assert.equal(partialWriteCalls, 0);
});

test("From forwards every WritableFS operation with Go permissions and rooted-path stripping", () => {
  const base = MapFS_as_FS(createTestFS());
  const calls: Array<[string, ...unknown[]]> = [];
  const writable: GoFS & {
    WriteFile(path: string, data: string, perm: FileMode): Error | undefined;
    AppendFile(path: string, data: string, perm: FileMode): Error | undefined;
    MkdirAll(path: string, perm: FileMode): Error | undefined;
    Remove(path: string): Error | undefined;
    Chtimes(path: string, aTime: Time, mTime: Time): Error | undefined;
  } = {
    ...base,
    WriteFile: (path, data, perm) => { calls.push(["write", path, data, perm]); return undefined; },
    AppendFile: (path, data, perm) => { calls.push(["append", path, data, perm]); return undefined; },
    MkdirAll: (path, perm) => { calls.push(["mkdir", path, perm]); return undefined; },
    Remove: (path) => { calls.push(["remove", path]); return undefined; },
    Chtimes: (path, aTime, mTime) => { calls.push(["chtimes", path, aTime, mTime]); return undefined; },
  };
  const fs = From(writable, true as bool);
  const accessTime = new Time(1000);
  const modificationTime = new Time(2000);

  assert.equal(fs.WriteFile("/new/file.ts", "text"), undefined);
  assert.equal(fs.AppendFile("/new/file.ts", "more"), undefined);
  assert.equal(fs.Remove("/new/file.ts"), undefined);
  assert.equal(fs.Chtimes("/new/file.ts", accessTime, modificationTime), undefined);

  assert.deepEqual(calls, [
    ["write", "new/file.ts", "text", 0o666],
    ["append", "new/file.ts", "more", 0o666],
    ["remove", "new/file.ts"],
    ["chtimes", "new/file.ts", accessTime, modificationTime],
  ]);
});
