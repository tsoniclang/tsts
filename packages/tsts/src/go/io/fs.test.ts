import assert from "node:assert/strict";
import { test } from "node:test";

import { Is as errors_Is } from "../errors.js";
import { EOF } from "../io.js";
import type { GoError } from "../compat.js";
import { MapFS_as_FS } from "../testing/fstest.js";
import type { MapFS } from "../testing/fstest.js";
import {
  ErrInvalid,
  ModeDir,
  ModeSymlink,
  PathError,
  ReadDir,
  ReadFileBytes,
  SkipDir,
  Sub,
  ValidPath,
  WalkDir,
} from "./fs.js";
import type { DirEntry, File, FileInfo, FS, ReadDirFile } from "./fs.js";
import { Time } from "../time.js";

function fileInfo(name: string, mode = 0): FileInfo {
  return {
    Name: () => name,
    Size: () => 0,
    Mode: () => mode,
    ModTime: () => new Time(),
    IsDir: () => (mode & ModeDir) !== 0,
    Sys: () => undefined,
  };
}

test("ReadFileBytes continues after short reads and accepts data with EOF", () => {
  let reads = 0;
  let closes = 0;
  const fsys: FS = {
    Open: (): [File, GoError] => [{
      Stat: () => [fileInfo("file"), undefined],
      Read(buffer): [number, GoError] {
        reads += 1;
        if (reads === 1) {
          buffer[0] = 1;
          buffer[1] = 2;
          return [2, undefined];
        }
        buffer[0] = 3;
        buffer[1] = 4;
        buffer[2] = 5;
        return [3, EOF];
      },
      Close(): GoError {
        closes += 1;
        return new Error("ignored close error");
      },
    }, undefined],
  };

  const [data, err] = ReadFileBytes(fsys, "file");
  assert.deepEqual([...data], [1, 2, 3, 4, 5]);
  assert.equal(err, undefined);
  assert.equal(reads, 2);
  assert.equal(closes, 1);
});

test("ReadFileBytes preserves bytes returned with a non-EOF error", () => {
  const failure = new Error("read failed");
  const fsys: FS = {
    Open: (): [File, GoError] => [{
      Stat: () => [fileInfo("file"), undefined],
      Read(buffer): [number, GoError] {
        buffer[0] = 7;
        return [1, failure];
      },
      Close: () => undefined,
    }, undefined],
  };
  const [data, err] = ReadFileBytes(fsys, "file");
  assert.deepEqual([...data], [7]);
  assert.equal(err, failure);
});

test("ReadDir fallback sorts names by UTF-8 bytes", () => {
  const names = ["é", "z", "a", "Z"];
  const entries = names.map((name): DirEntry => ({
    Name: () => name,
    IsDir: () => false,
    Type: () => 0,
    Info: () => [fileInfo(name), undefined],
  }));
  const fsys: FS = {
    Open: (): [File, GoError] => [{
      Stat: () => [fileInfo(".", ModeDir), undefined],
      Read: () => [0, ErrInvalid],
      ReadDir: () => [entries, undefined],
      Close: () => undefined,
    } as ReadDirFile, undefined],
  };
  const [sorted, err] = ReadDir(fsys, ".");
  assert.equal(err, undefined);
  assert.deepEqual(sorted.map((entry) => entry.Name()), ["Z", "a", "z", "é"]);
});

test("WalkDir follows a symlink root but not descendant symlinks", () => {
  const map: MapFS = new Map([
    ["link", { Data: "dir", Mode: ModeSymlink }],
    ["dir/a", { Data: "a" }],
    ["dir/child", { Data: "../other", Mode: ModeSymlink }],
    ["other/x", { Data: "x" }],
  ]);
  const visited: Array<[string, number]> = [];
  const err = WalkDir(MapFS_as_FS(map), "link", (name, entry, walkErr) => {
    assert.equal(walkErr, undefined);
    visited.push([name, entry!.Type()]);
    return undefined;
  });
  assert.equal(err, undefined);
  assert.deepEqual(visited, [
    ["link", ModeDir],
    ["link/a", 0],
    ["link/child", ModeSymlink],
  ]);
});

test("WalkDir SkipDir on a file skips the remaining siblings", () => {
  const map: MapFS = new Map([
    ["a", { Data: "a" }],
    ["b", { Data: "b" }],
    ["c", { Data: "c" }],
  ]);
  const visited: string[] = [];
  const err = WalkDir(MapFS_as_FS(map), ".", (name) => {
    visited.push(name);
    return name === "a" ? SkipDir : undefined;
  });
  assert.equal(err, undefined);
  assert.deepEqual(visited, [".", "a"]);
});

test("Sub validates paths, preserves root identity, and shortens PathError paths", () => {
  const fsys = MapFS_as_FS(new Map([["dir/file", { Data: "ok" }]]));
  const [same, sameErr] = Sub(fsys, ".");
  assert.equal(sameErr, undefined);
  assert.equal(same, fsys);

  const [, invalidErr] = Sub(fsys, "/dir");
  assert.ok(invalidErr instanceof PathError);
  assert.equal(invalidErr.Op, "sub");
  assert.equal(invalidErr.Path, "/dir");
  assert.equal(errors_Is(invalidErr, ErrInvalid), true);

  const [sub, subErr] = Sub(fsys, "dir");
  assert.equal(subErr, undefined);
  assert.ok(sub !== undefined);
  const [, missingErr] = sub.Open("missing");
  assert.ok(missingErr instanceof PathError);
  assert.equal(missingErr.Path, "missing");
  const [, childInvalidErr] = sub.Open("./");
  assert.ok(childInvalidErr instanceof PathError);
  assert.equal(childInvalidErr.Path, "./");
  assert.equal(errors_Is(childInvalidErr, ErrInvalid), true);
});

test("ValidPath matches Go path-element and UTF-8 rules", () => {
  assert.equal(ValidPath("."), true);
  assert.equal(ValidPath("a/b"), true);
  assert.equal(ValidPath("a\\b:c"), true);
  assert.equal(ValidPath(""), false);
  assert.equal(ValidPath("/a"), false);
  assert.equal(ValidPath("a/"), false);
  assert.equal(ValidPath("a//b"), false);
  assert.equal(ValidPath("a/./b"), false);
  assert.equal(ValidPath("a/../b"), false);
  assert.equal(ValidPath("\ud800"), false);
  assert.equal(ValidPath("\ud834\udd1e"), true);
});
