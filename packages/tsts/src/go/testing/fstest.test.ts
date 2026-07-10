import assert from "node:assert/strict";
import { test } from "node:test";

import { Is as errors_Is } from "../errors.js";
import { EOF } from "../io.js";
import {
  ErrInvalid,
  ErrNotExist,
  ErrPermission,
  ModeDir,
  ModeSymlink,
  PathError,
  ReadDir,
  ReadFileBytes,
  type ReadDirFile,
  Stat,
} from "../io/fs.js";
import type { File, FS } from "../io/fs.js";
import { Time } from "../time.js";
import { Lstat, MapFS_as_FS, Open, ReadLink, TestFS } from "./fstest.js";
import type { MapFS } from "./fstest.js";

test("MapFS directory entries preserve explicit file metadata", () => {
  const modTime = new Time(1234);
  const map: MapFS = new Map([
    ["src/index.ts", { Data: new TextEncoder().encode("export {};"), Mode: 0o640, ModTime: modTime, Sys: "source" }],
  ]);

  const [rootEntries, rootError] = ReadDir(MapFS_as_FS(map), ".");
  assert.equal(rootError, undefined);
  assert.equal(rootEntries.length, 1);
  assert.equal(rootEntries[0]!.Name(), "src");
  assert.equal(rootEntries[0]!.IsDir(), true);
  assert.equal(rootEntries[0]!.Type(), ModeDir);

  const [sourceEntries, sourceError] = ReadDir(MapFS_as_FS(map), "src");
  assert.equal(sourceError, undefined);
  assert.equal(sourceEntries.length, 1);
  const [sourceInfo, sourceInfoError] = sourceEntries[0]!.Info();
  assert.equal(sourceInfoError, undefined);
  assert.equal(sourceInfo.Name(), "index.ts");
  assert.equal(sourceInfo.Size(), 10);
  assert.equal(sourceInfo.Mode(), 0o640);
  assert.equal(sourceInfo.ModTime(), modTime);
  assert.equal(sourceInfo.Sys(), "source");
});

test("MapFS always synthesizes an empty root and preserves explicit empty directories", () => {
  const empty = MapFS_as_FS(new Map());
  const [root, rootErr] = empty.Open(".");
  assert.equal(rootErr, undefined);
  assert.equal(root.Stat()[0].IsDir(), true);
  assert.deepEqual((root as ReadDirFile).ReadDir(-1), [[], undefined]);
  assert.equal(TestFS(empty), undefined);

  const map: MapFS = new Map([["empty", { Mode: (ModeDir | 0o700) >>> 0, Sys: "dir" }]]);
  const [entries, entriesErr] = ReadDir(MapFS_as_FS(map), ".");
  assert.equal(entriesErr, undefined);
  const [info, infoErr] = entries[0]!.Info();
  assert.equal(infoErr, undefined);
  assert.equal(info.Mode(), (ModeDir | 0o700) >>> 0);
  assert.equal(info.Sys(), "dir");
  assert.equal(ReadDir(MapFS_as_FS(map), "empty")[0].length, 0);
});

test("MapFS regular files and directories maintain independent read offsets and EOF rules", () => {
  const map: MapFS = new Map([
    ["dir/a", { Data: "a" }],
    ["dir/b", { Data: "b" }],
    ["file", { Data: new Uint8Array([1, 2, 3]) }],
  ]);

  const [directory, directoryErr] = Open(map, "dir");
  assert.equal(directoryErr, undefined);
  const readDir = directory as ReadDirFile;
  assert.deepEqual(readDir.ReadDir(1)[0].map((entry) => entry.Name()), ["a"]);
  assert.deepEqual(readDir.ReadDir(1)[0].map((entry) => entry.Name()), ["b"]);
  assert.deepEqual(readDir.ReadDir(1), [[], EOF]);
  assert.deepEqual(readDir.ReadDir(-1), [[], undefined]);

  const [file, fileErr] = Open(map, "file");
  assert.equal(fileErr, undefined);
  const buffer = [0, 0];
  assert.deepEqual(file.Read(buffer), [2, undefined]);
  assert.deepEqual(buffer, [1, 2]);
  assert.deepEqual(file.Read(buffer), [1, undefined]);
  assert.equal(buffer[0], 3);
  assert.deepEqual(file.Read(buffer), [0, EOF]);
});

test("MapFS resolves file and parent symlinks while Lstat and ReadLink preserve link metadata", () => {
  const map: MapFS = new Map([
    ["target/file", { Data: "contents", Mode: 0o644 }],
    ["dirlink", { Data: "target", Mode: (ModeSymlink | 0o777) >>> 0 }],
    ["filelink", { Data: "dirlink/file", Mode: ModeSymlink }],
  ]);
  const fsys = MapFS_as_FS(map);

  assert.equal(new TextDecoder().decode(ReadFileBytes(fsys, "filelink")[0]), "contents");
  assert.equal(new TextDecoder().decode(ReadFileBytes(fsys, "dirlink/file")[0]), "contents");
  assert.deepEqual(ReadLink(map, "dirlink"), ["target", undefined]);
  assert.equal(Lstat(map, "dirlink")[0].Mode(), (ModeSymlink | 0o777) >>> 0);
  assert.equal(Stat(fsys, "dirlink")[0].Mode(), (ModeDir | 0o555) >>> 0);

  const [walkEntries, walkErr] = ReadDir(fsys, ".");
  assert.equal(walkErr, undefined);
  assert.equal(walkEntries.find((entry) => entry.Name() === "dirlink")!.Type(), ModeSymlink);
});

test("MapFS rejects invalid, absolute, broken, and escaping symlink paths with PathError", () => {
  const map: MapFS = new Map([
    ["absolute", { Data: "/target", Mode: ModeSymlink }],
    ["broken", { Data: "missing", Mode: ModeSymlink }],
  ]);
  for (const name of ["", "./file", "/file", "absolute", "broken"]) {
    const [, err] = Open(map, name);
    assert.ok(err instanceof PathError);
    assert.equal(err.Op, "open");
    assert.equal(err.Path, name);
    assert.equal(errors_Is(err, ErrNotExist), true);
  }
  const [, readLinkErr] = ReadLink(map, "missing");
  assert.ok(readLinkErr instanceof PathError);
  assert.equal(readLinkErr.Op, "readlink");
  assert.equal(errors_Is(readLinkErr, ErrNotExist), true);
  const [, nonLinkErr] = ReadLink(new Map([["file", { Data: "x" }]]), "file");
  assert.equal(errors_Is(nonLinkErr, ErrInvalid), true);
});

test("MapFS open files observe MapFile mutations and ReadFile returns independent copies", () => {
  const source = { Data: new Uint8Array([1, 2]) };
  const map: MapFS = new Map([["file", source]]);
  const [file] = Open(map, "file");
  source.Data = new Uint8Array([9, 8, 7]);
  const buffer = [0, 0, 0];
  assert.deepEqual(file.Read(buffer), [3, undefined]);
  assert.deepEqual(buffer, [9, 8, 7]);

  const fsys = MapFS_as_FS(map);
  const [first] = fsys.ReadFile!("file");
  first[0] = 0;
  const [second] = fsys.ReadFile!("file");
  assert.deepEqual([...second], [9, 8, 7]);
});

test("TestFS validates complete trees, empty expectations, missing files, and sub-filesystems", () => {
  const map: MapFS = new Map([
    ["hello", { Data: "hello" }],
    ["fortune/k/ken.txt", { Data: "loop" }],
    ["empty", { Mode: ModeDir }],
  ]);
  const fsys = MapFS_as_FS(map);
  assert.equal(TestFS(fsys, "hello", "fortune", "fortune/k", "fortune/k/ken.txt", "empty"), undefined);

  const missing = TestFS(fsys, "missing");
  assert.ok(missing instanceof Error);
  assert.match(missing.message, /expected but not found: missing/);

  const nonEmpty = TestFS(fsys);
  assert.ok(nonEmpty instanceof Error);
  assert.match(nonEmpty.message, /expected empty file system/);
});

test("TestFS preserves wrapped filesystem errors for errors.Is", () => {
  const permissionFS: FS = {
    Open: (name) => [undefined as unknown as File, new PathError("open", name, ErrPermission)],
  };
  const err = TestFS(permissionFS);
  assert.ok(err instanceof Error);
  assert.equal(errors_Is(err, ErrPermission), true);
});
