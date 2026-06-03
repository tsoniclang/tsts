/**
 * VFS internal helpers.
 *
 * Mechanical 1:1 port of TS-Go `internal/vfs/internal/internal.go`.
 *
 * Pure-logic functions (`RootLength`, `SplitPath`, `RootAndPath`,
 * `decodeBytes`, `decodeUtf16`) are ported faithfully, delegating to
 * `tspath` exactly as upstream does.
 *
 * The `Common` struct and its filesystem methods (`Stat`, `FileExists`,
 * `DirectoryExists`, `GetAccessibleEntries`, `getEntries`, `WalkDir`,
 * `ReadFile`) are built on Go's `io/fs` abstraction (`fs.FS`, `fs.Stat`,
 * `fs.ReadDir`, `fs.WalkDir`, `unsafe.String`) which has no TS counterpart;
 * TSTS instead implements the equivalent behavior directly in the
 * class-based `osvfs`/`iovfs` adapters over Node `fs`. Those methods are
 * therefore Go-only scaffolding and are not reified here.
 */

import {
  getEncodedRootLength,
  normalizePath,
  removeTrailingDirectorySeparator,
} from "../../tspath/path.js";

// RootLength mirrors TS-Go `RootLength`: the length of the rooted prefix of
// an absolute path. Panics if `p` is not absolute.
export function rootLength(p: string): number {
  const l = getEncodedRootLength(p);
  if (l === 0) {
    throw new Error(`vfs: path ${JSON.stringify(p)} is not absolute`);
  } else if (l < 0) {
    return ~l;
  }
  return l;
}

// SplitPath mirrors TS-Go `SplitPath`: normalizes `p`, then splits into the
// rooted prefix and the (trailing-separator-trimmed) remainder.
export function splitPath(p: string): readonly [rootName: string, rest: string] {
  p = normalizePath(p);
  const l = rootLength(p);
  const rootName = p.slice(0, l);
  let rest = p.slice(l);
  rest = removeTrailingDirectorySeparator(rest);
  return [rootName, rest];
}

// rootAndPath mirrors TS-Go `(vfs *Common) RootAndPath` for the portion that
// is not tied to the `fs.FS` lookup: it returns the root name and the rest,
// substituting "." for an empty remainder.
export function rootAndPath(path: string): readonly [rootName: string, rest: string] {
  let [rootName, rest] = splitPath(path);
  if (rest === "") {
    rest = ".";
  }
  return [rootName, rest];
}

// decodeBytes mirrors TS-Go `decodeBytes`: detects a leading UTF-16 LE/BE BOM
// and transcodes accordingly, strips a leading UTF-8 BOM, and otherwise
// returns the input unchanged. Returns `[contents, ok]`.
//
// `s` carries one byte per code unit (charCodeAt 0..255), matching the raw
// bytes Go reads from the underlying filesystem.
export function decodeBytes(s: string): readonly [contents: string, ok: boolean] {
  if (s.length >= 2) {
    // bom is the two leading bytes packed as `[2]byte` (b0 high, b1 low).
    const bom = (s.charCodeAt(0) << 8) | s.charCodeAt(1);
    switch (bom) {
      case (0xff << 8) | 0xfe:
        return [decodeUtf16(s.slice(2), true), true];
      case (0xfe << 8) | 0xff:
        return [decodeUtf16(s.slice(2), false), true];
    }
  }
  if (s.length >= 3 && s.charCodeAt(0) === 0xef && s.charCodeAt(1) === 0xbb && s.charCodeAt(2) === 0xbf) {
    s = s.slice(3);
  }

  return [s, true];
}

// decodeUtf16 mirrors TS-Go `decodeUtf16`: reads `s` (one byte per code unit)
// as a sequence of UTF-16 units in the given byte order and decodes to a
// string. Returns "" if the byte count is odd (binary.Read failure).
export function decodeUtf16(s: string, littleEndian: boolean): string {
  if (s.length % 2 !== 0) {
    return "";
  }
  const ints: number[] = [];
  for (let i = 0; i + 1 < s.length; i += 2) {
    const a = s.charCodeAt(i);
    const b = s.charCodeAt(i + 1);
    ints.push(littleEndian ? a | (b << 8) : (a << 8) | b);
  }
  return String.fromCharCode(...ints);
}
