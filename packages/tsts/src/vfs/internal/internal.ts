/**
 * VFS internal helpers (BOM handling, path key normalization).
 *
 * Port skeleton of TS-Go `internal/vfs/internal/internal.go` (~191 LoC).
 * Provides UTF-8/UTF-16 BOM detection and stripping for files read
 * through the VFS, plus path-key canonicalization for case-insensitive
 * filesystems.
 */

const BOM_UTF8 = "﻿";
const BOM_UTF16_BE = "þÿ";
const BOM_UTF16_LE = "ÿþ";

export function stripBOM(text: string): string {
  if (text.length >= 1 && text.charCodeAt(0) === 0xfeff) return text.slice(1);
  if (text.length >= 2 && (
    (text.charCodeAt(0) === 0xfe && text.charCodeAt(1) === 0xff) ||
    (text.charCodeAt(0) === 0xff && text.charCodeAt(1) === 0xfe)
  )) {
    return text.slice(2);
  }
  return text;
}

export function hasBOM(text: string): boolean {
  return text !== stripBOM(text);
}

export function getBOM(text: string): string {
  if (text.length >= 1 && text.charCodeAt(0) === 0xfeff) return BOM_UTF8;
  if (text.length >= 2 && text.charCodeAt(0) === 0xfe && text.charCodeAt(1) === 0xff) return BOM_UTF16_BE;
  if (text.length >= 2 && text.charCodeAt(0) === 0xff && text.charCodeAt(1) === 0xfe) return BOM_UTF16_LE;
  return "";
}

/**
 * Decodes a freshly-read byte string, stripping any leading BOM and
 * transcoding UTF-16LE/BE content to a JS string. Mirrors TS-Go
 * `decodeBytes`: returns `[contents, ok]` where `ok` is false only when
 * a declared UTF-16 stream fails to decode.
 *
 * `s` carries one byte per code unit (charCodeAt 0..255), matching the
 * raw bytes Go reads from the underlying filesystem.
 */
export function decodeBytes(s: string): readonly [contents: string, ok: boolean] {
  if (s.length >= 2) {
    const b0 = s.charCodeAt(0);
    const b1 = s.charCodeAt(1);
    if (b0 === 0xff && b1 === 0xfe) {
      return [decodeUtf16Bytes(s.slice(2), true), true];
    }
    if (b0 === 0xfe && b1 === 0xff) {
      return [decodeUtf16Bytes(s.slice(2), false), true];
    }
  }
  if (s.length >= 3 && s.charCodeAt(0) === 0xef && s.charCodeAt(1) === 0xbb && s.charCodeAt(2) === 0xbf) {
    return [s.slice(3), true];
  }
  return [s, true];
}

/**
 * Mirrors TS-Go `decodeUtf16`: reads `s` (one byte per code unit) as a
 * sequence of UTF-16 units in the given byte order and decodes to a JS
 * string. Returns "" if the byte count is odd (binary.Read failure).
 */
function decodeUtf16Bytes(s: string, littleEndian: boolean): string {
  if (s.length % 2 !== 0) return "";
  let result = "";
  for (let i = 0; i + 1 < s.length; i += 2) {
    const a = s.charCodeAt(i);
    const b = s.charCodeAt(i + 1);
    result += String.fromCharCode(littleEndian ? a | (b << 8) : (a << 8) | b);
  }
  return result;
}

/**
 * Decodes UTF-16-encoded text from a byte buffer. Used when a file
 * read returns raw bytes rather than a string.
 */
export function decodeUTF16(bytes: Uint8Array, littleEndian: boolean): string {
  if (bytes.length < 2) return "";
  let start = 0;
  // Skip BOM
  if ((bytes[0] === 0xfe && bytes[1] === 0xff) || (bytes[0] === 0xff && bytes[1] === 0xfe)) start = 2;
  const codeUnits: number[] = [];
  for (let i = start; i + 1 < bytes.length; i += 2) {
    const a = bytes[i]!;
    const b = bytes[i + 1]!;
    codeUnits.push(littleEndian ? a | (b << 8) : (a << 8) | b);
  }
  return String.fromCharCode(...codeUnits);
}

export function toPathKey(path: string, caseSensitive: boolean): string {
  if (caseSensitive) return path;
  return path.toLowerCase();
}

export function rootLength(path: string): number {
  if (path.startsWith("/")) return 1;
  if (/^[A-Za-z]:[\\/]/.test(path)) return 3;
  if (path.startsWith("\\\\")) {
    const normalized = path.replace(/\\/g, "/");
    const first = normalized.indexOf("/", 2);
    if (first < 0) return normalized.length;
    const second = normalized.indexOf("/", first + 1);
    return second < 0 ? normalized.length : second + 1;
  }
  throw new Error(`vfs: path ${JSON.stringify(path)} is not absolute`);
}

export function splitPath(path: string): readonly [rootName: string, rest: string] {
  const normalized = normalizePath(path);
  const length = rootLength(normalized);
  const rootName = normalized.slice(0, length);
  const rest = removeTrailingDirectorySeparator(normalized.slice(length));
  return [rootName, rest];
}

export function normalizePath(path: string): string {
  const slash = path.replace(/\\/g, "/");
  const length = rootLengthOrZero(slash);
  const root = slash.slice(0, length);
  const parts: string[] = [];
  for (const part of slash.slice(length).split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return root + parts.join("/");
}

export function rootAndPath(path: string): readonly [rootName: string, rest: string] {
  const [rootName, rest] = splitPath(path);
  return [rootName, rest === "" ? "." : rest];
}

export function removeTrailingDirectorySeparator(path: string): string {
  if (path === "/" || /^[A-Za-z]:\/$/.test(path)) return path;
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function rootLengthOrZero(path: string): number {
  if (path.startsWith("/")) return 1;
  if (/^[A-Za-z]:\//.test(path)) return 3;
  if (path.startsWith("//")) {
    const first = path.indexOf("/", 2);
    if (first < 0) return path.length;
    const second = path.indexOf("/", first + 1);
    return second < 0 ? path.length : second + 1;
  }
  return 0;
}
