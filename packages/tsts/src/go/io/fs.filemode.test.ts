import assert from "node:assert/strict";
import test from "node:test";

import type { GoValueOps } from "../compat.js";
import {
  FileMode_IsDir,
  FileMode_IsRegular,
  FileModeValueOps,
  ModeAppend,
  ModeCharDevice,
  ModeDevice,
  ModeDir,
  ModeExclusive,
  ModeIrregular,
  ModeNamedPipe,
  ModePerm,
  ModeSetgid,
  ModeSetuid,
  ModeSocket,
  ModeSticky,
  ModeSymlink,
  ModeTemporary,
  ModeType,
  type FileMode,
} from "./fs.js";

test("FileMode constants match the pinned Go 1.26.4 io/fs source", () => {
  assert.deepEqual({
    ModeDir,
    ModeAppend,
    ModeExclusive,
    ModeTemporary,
    ModeSymlink,
    ModeDevice,
    ModeNamedPipe,
    ModeSocket,
    ModeSetuid,
    ModeSetgid,
    ModeCharDevice,
    ModeSticky,
    ModeIrregular,
    ModeType,
    ModePerm,
  }, {
    ModeDir: 0x80000000,
    ModeAppend: 0x40000000,
    ModeExclusive: 0x20000000,
    ModeTemporary: 0x10000000,
    ModeSymlink: 0x08000000,
    ModeDevice: 0x04000000,
    ModeNamedPipe: 0x02000000,
    ModeSocket: 0x01000000,
    ModeSetuid: 0x00800000,
    ModeSetgid: 0x00400000,
    ModeCharDevice: 0x00200000,
    ModeSticky: 0x00100000,
    ModeIrregular: 0x00080000,
    ModeType: 0x8f280000,
    ModePerm: 0o777,
  });
});

test("FileMode IsDir and IsRegular use the exact Go type masks", () => {
  const typeBits: readonly FileMode[] = [
    ModeDir,
    ModeSymlink,
    ModeNamedPipe,
    ModeSocket,
    ModeDevice,
    ModeCharDevice,
    ModeIrregular,
  ];
  const nonTypeBits: readonly FileMode[] = [
    ModeAppend,
    ModeExclusive,
    ModeTemporary,
    ModeSetuid,
    ModeSetgid,
    ModeSticky,
  ];

  assert.equal(FileMode_IsDir(ModeDir), true);
  assert.equal(FileMode_IsDir(ModeDir | ModePerm), true);
  assert.equal(FileMode_IsDir(0), false);
  for (const mode of [...typeBits.slice(1), ...nonTypeBits, ModePerm]) {
    assert.equal(FileMode_IsDir(mode), false);
  }

  assert.equal(FileMode_IsRegular(0), true);
  assert.equal(FileMode_IsRegular(ModePerm), true);
  for (const mode of nonTypeBits) {
    assert.equal(FileMode_IsRegular(mode | ModePerm), true);
  }
  for (const mode of typeBits) {
    assert.equal(FileMode_IsRegular(mode), false);
    assert.equal(FileMode_IsRegular(mode | ModePerm), false);
  }
  assert.equal(FileMode_IsRegular(ModeType), false);
});

test("FileMode value operations preserve scalar zero and assignment copy", () => {
  const operations: GoValueOps<FileMode> = FileModeValueOps;
  const direct: FileMode = 0;
  const mode: FileMode = ModeDir + ModePerm;
  const copied: FileMode = operations.copy(mode);
  const scalar: number = copied;

  assert.equal(Object.isFrozen(operations), true);
  assert.equal(operations.zero(), direct);
  assert.equal(copied, mode);
  assert.equal(scalar, mode);
});
