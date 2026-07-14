import assert from "node:assert/strict";
import test from "node:test";

import type { byte } from "../scalars.js";
import type { GoSlice } from "../compat.js";
import { GoInterfaceValueOps, GoMapIsNil, GoMapMake, GoNilMap, GoNumberValueOps, GoSliceBuild, GoSliceIsNil, GoSliceLoad, GoSliceMake, GoSliceReslice, GoSliceStore, GoStringKey } from "../compat.js";
import type { DirEntry } from "../io/fs.js";
import { ModeDir, ReadDir } from "../io/fs.js";
import { EOF } from "../io.js";
import { TimeValueEqual, UnixMilli } from "../time.js";
import { MapFS_as_FS, Open, type MapFile, type MapFS } from "./fstest.js";

function byteSlice(values: readonly number[], capacity = values.length): GoSlice<byte> {
  return GoSliceBuild(values.length, capacity, GoNumberValueOps, (slice) => {
    for (let index = 0; index < values.length; index += 1) {
      const value = values[index];
      if (value === undefined) throw new TypeError("missing byte fixture");
      GoSliceStore(slice, index, value, GoNumberValueOps);
    }
  });
}

function sliceValues<T>(slice: GoSlice<T>, load: (index: number) => T): T[] {
  const values: T[] = [];
  for (let index = 0; index < slice.length; index += 1) values.push(load(index));
  return values;
}

function mapFile(data: GoSlice<byte>, mode = 0, milliseconds = 0): MapFile {
  return { Data: data, Mode: mode, ModTime: UnixMilli(milliseconds), Sys: undefined };
}

test("MapFS nil and empty roots match the pinned Go 1.26.4 source oracle", () => {
  const nilMap: MapFS = GoNilMap();
  const copiedNil: MapFS = nilMap;
  const emptyMap: MapFS = GoMapMake(GoStringKey);

  assert.equal(GoMapIsNil(nilMap), true);
  assert.equal(GoMapIsNil(copiedNil), true);
  assert.equal(GoMapIsNil(emptyMap), false);
  assert.throws(() => copiedNil.set("file", mapFile(byteSlice([]))), /assignment to entry in nil map/);

  const assertRoot = (map: MapFS): void => {
    const [root, openError] = Open(map, ".");
    assert.equal(openError, undefined);
    const [info, statError] = root?.Stat() ?? [undefined, new Error("missing root")];
    assert.equal(statError, undefined);
    assert.equal(info?.Name(), ".");
    assert.equal(info?.Mode(), ModeDir + 0o555);
    assert.equal(info?.IsDir(), true);
    assert.equal(info?.Size(), 0);
    assert.equal(info?.ModTime().IsZero(), true);
  };
  assertRoot(nilMap);
  assertRoot(emptyMap);
});

test("MapFS assignment copies its Go map handle", () => {
  const original: MapFS = GoMapMake(GoStringKey);
  const copied: MapFS = original;
  const fs = MapFS_as_FS(original);
  const file = mapFile(byteSlice([1]));

  copied.set("shared", file);
  assert.equal(original.get("shared"), file);
  assert.equal(fs.Open("shared")[1], undefined);

  original.delete("shared");
  assert.equal(copied.has("shared"), false);
});

test("MapFile data, mode, time, and slice reads match the pinned Go oracle", () => {
  const backing = byteSlice([9, 10, 20, 30, 40], 7);
  const data = GoSliceReslice(backing, 1, 5);
  const modTime = UnixMilli(1_234_567);
  const sys = { source: "oracle" };
  const file: MapFile = { Data: data, Mode: 0o640, ModTime: modTime, Sys: sys };
  const map: MapFS = GoMapMake(GoStringKey);
  map.set("dir/file.txt", file);

  const [opened, openError] = Open(map, "dir/file.txt");
  assert.equal(openError, undefined);
  const [info, statError] = opened?.Stat() ?? [undefined, new Error("missing file")];
  assert.equal(statError, undefined);
  assert.equal(info?.Name(), "file.txt");
  assert.equal(info?.Size(), 4);
  assert.equal(info?.Mode(), 0o640);
  assert.equal(info?.IsDir(), false);
  assert.equal(info?.Sys(), sys);
  assert.equal(TimeValueEqual(info?.ModTime() ?? UnixMilli(0), modTime), true);
  assert.notEqual(info?.ModTime(), modTime);

  const first = GoSliceMake<byte>(2, 2, GoNumberValueOps);
  assert.deepEqual(opened?.Read(first), [2, undefined]);
  assert.deepEqual(sliceValues(first, (index) => GoSliceLoad(first, index, GoNumberValueOps)), [10, 20]);

  GoSliceStore(data, 2, 99, GoNumberValueOps);
  const second = GoSliceMake<byte>(3, 3, GoNumberValueOps);
  assert.deepEqual(opened?.Read(second), [2, undefined]);
  assert.deepEqual(sliceValues(second, (index) => GoSliceLoad(second, index, GoNumberValueOps)), [99, 40, 0]);
  assert.deepEqual(opened?.Read(second), [0, EOF]);
});

test("MapFS directory reads return ordered opaque Go slices", () => {
  const map: MapFS = GoMapMake(GoStringKey);
  map.set("dir/z", mapFile(byteSlice([1])));
  map.set("dir/a", mapFile(byteSlice([2])));
  map.set("dir/\u{10000}", mapFile(byteSlice([3])));
  map.set("dir/\ue000", mapFile(byteSlice([4])));
  const [entries, readError] = ReadDir(MapFS_as_FS(map), "dir");
  const entryOps = GoInterfaceValueOps<DirEntry>();

  assert.equal(readError, undefined);
  assert.equal(GoSliceLoad(entries, 0, entryOps)?.Name(), "a");
  assert.equal(GoSliceLoad(entries, 1, entryOps)?.Name(), "z");
  assert.equal(GoSliceLoad(entries, 2, entryOps)?.Name(), "\ue000");
  assert.equal(GoSliceLoad(entries, 3, entryOps)?.Name(), "\u{10000}");
  assert.equal(GoSliceIsNil(entries), false);
});
