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
