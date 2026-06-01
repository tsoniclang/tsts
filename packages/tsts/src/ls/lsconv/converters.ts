/**
 * Language-service position converters.
 */

import type { Position, Range } from "../../lsp/lsproto/index.js";
import {
  LanguageKindJavaScript,
  LanguageKindJavaScriptReact,
  LanguageKindJSON,
  LanguageKindTypeScript,
  LanguageKindTypeScriptReact,
  PositionEncodingKindUTF8,
  type LanguageKind,
  type Location,
  type PositionEncodingKind,
  type TextDocumentContentChangePartial,
} from "../../lsp/lsproto/index.js";
import { isBundled } from "../../bundled/index.js";
import { ScriptKind, TextRange, type TextChange } from "../../core/index.js";
import { isDynamicFileName, splitVolumePath } from "../../tspath/index.js";
import { computeLSPLineStarts, type LSPLineMap } from "./lineMap.js";

export interface LineMapCarrier {
  readonly lineStarts: readonly number[];
}

export interface Script {
  fileName(): string;
  text(): string;
}

export type LineMapProvider = (fileName: string) => LSPLineMap;

export class Converters {
  private readonly positionEncoding: PositionEncodingKind;
  private readonly getLineMap: LineMapProvider | undefined;

  constructor(positionEncoding: PositionEncodingKind = PositionEncodingKindUTF8, getLineMap?: LineMapProvider) {
    this.positionEncoding = positionEncoding;
    this.getLineMap = getLineMap;
  }

  positionToLineAndCharacter(file: LineMapCarrier | Script, position: number): Position {
    const text = scriptText(file);
    const lineMap = this.lineMapFor(file);
    const clamped = Math.max(0, Math.min(position, text.length));
    const line = lineMap.computeIndexOfLineStart(clamped);
    const start = lineMap.lineStarts[line] ?? 0;
    const character = lineMap.asciiOnly || this.positionEncoding === PositionEncodingKindUTF8
      ? clamped - start
      : utf16Length(text.slice(start, clamped));
    return { line, character };
  }

  lineAndCharacterToPosition(file: LineMapCarrier | Script, position: Position): number {
    const text = scriptText(file);
    const lineMap = this.lineMapFor(file);
    if (position.line >= lineMap.lineStarts.length) return text.length;

    const start = lineMap.lineStarts[position.line] ?? 0;
    const lineEnd = position.line + 1 < lineMap.lineStarts.length
      ? lineMap.lineStarts[position.line + 1]!
      : text.length;
    if (lineMap.asciiOnly || this.positionEncoding === PositionEncodingKindUTF8) {
      return Math.max(start, Math.min(start + position.character, lineEnd));
    }

    let utf16Characters = 0;
    let offset = start;
    while (offset < lineEnd) {
      const codePoint = text.codePointAt(offset);
      if (codePoint === undefined) break;
      const characterLength = codePoint > 0xffff ? 2 : 1;
      const utf16LengthForCodePoint = codePoint > 0xffff ? 2 : 1;
      if (utf16Characters + utf16LengthForCodePoint > position.character) break;
      utf16Characters += utf16LengthForCodePoint;
      offset += characterLength;
    }
    return offset;
  }

  toLSPRange(file: LineMapCarrier | Script, range: { readonly pos: number; readonly end: number }): Range {
    return {
      start: this.positionToLineAndCharacter(file, range.pos),
      end: this.positionToLineAndCharacter(file, range.end),
    };
  }

  fromLSPRange(file: LineMapCarrier | Script, range: Range): TextRange {
    return new TextRange(
      this.lineAndCharacterToPosition(file, range.start),
      this.lineAndCharacterToPosition(file, range.end),
    );
  }

  fromLSPTextChange(file: LineMapCarrier | Script, change: TextDocumentContentChangePartial): TextChange {
    const range = this.fromLSPRange(file, change.range);
    return Object.assign(range, { newText: change.text });
  }

  toLSPLocation(file: Script, range: TextRange): Location {
    return {
      uri: fileNameToDocumentURI(file.fileName()),
      range: this.toLSPRange(file, range),
    };
  }

  private lineMapFor(file: LineMapCarrier | Script): LSPLineMap {
    if (isScript(file)) {
      return this.getLineMap?.(file.fileName()) ?? computeLSPLineStarts(file.text());
    }
    return new ScriptLineMap(file.lineStarts, true);
  }
}

export function newConverters(positionEncoding: PositionEncodingKind, getLineMap: LineMapProvider): Converters {
  return new Converters(positionEncoding, getLineMap);
}

export function languageKindToScriptKind(languageID: LanguageKind): number {
  switch (languageID) {
    case LanguageKindTypeScript:
      return ScriptKind.TS;
    case LanguageKindTypeScriptReact:
      return ScriptKind.TSX;
    case LanguageKindJavaScript:
      return ScriptKind.JS;
    case LanguageKindJavaScriptReact:
      return ScriptKind.JSX;
    case LanguageKindJSON:
      return ScriptKind.JSON;
    default:
      return ScriptKind.Unknown;
  }
}

export function fileNameToDocumentURI(fileName: string): string {
  if (isBundled(fileName)) {
    return fileName;
  }
  if (isDynamicFileName(fileName)) {
    const dynamic = fileName.slice(2);
    const schemeSeparator = dynamic.indexOf("/");
    if (schemeSeparator < 0) throw new Error(`invalid file name: ${fileName}`);
    const scheme = dynamic.slice(0, schemeSeparator);
    const rest = dynamic.slice(schemeSeparator + 1);
    const authoritySeparator = rest.indexOf("/");
    if (authoritySeparator < 0) throw new Error(`invalid file name: ${fileName}`);
    const authority = rest.slice(0, authoritySeparator);
    const path = rest.slice(authoritySeparator + 1);
    if (authority === "ts-nul-authority") {
      return `${scheme}:${path}`;
    }
    return `${scheme}://${authority}/${path}`;
  }

  const split = splitVolumePath(fileName);
  let volume = "";
  let path = fileName;
  if (split.ok) {
    volume = `/${escapeUriPathPart(split.volume)}`;
    path = split.rest;
  }

  path = path.startsWith("//") ? path.slice(2) : path;
  const escaped = path.split("/").map((part) => escapeUriPathPart(part)).join("/");
  return `file://${volume}${escaped}`;
}

class ScriptLineMap {
  readonly lineStarts: readonly number[];
  readonly asciiOnly: boolean;

  constructor(lineStarts: readonly number[], asciiOnly: boolean) {
    this.lineStarts = lineStarts;
    this.asciiOnly = asciiOnly;
  }

  computeIndexOfLineStart(targetPos: number): number {
    let low = 0;
    let high = this.lineStarts.length;
    while (low < high) {
      const middle = (low + high) >> 1;
      const value = this.lineStarts[middle]!;
      if (value < targetPos) low = middle + 1;
      else high = middle;
    }
    const exact = low < this.lineStarts.length && this.lineStarts[low] === targetPos;
    return !exact && low > 0 ? low - 1 : low;
  }
}

function isScript(file: LineMapCarrier | Script): file is Script {
  return typeof (file as { readonly fileName?: unknown }).fileName === "function"
    && typeof (file as { readonly text?: unknown }).text === "function";
}

function scriptText(file: LineMapCarrier | Script): string {
  return isScript(file) ? file.text() : "";
}

function utf16Length(text: string): number {
  let length = 0;
  for (const character of text) length += character.length;
  return length;
}

function escapeUriPathPart(value: string): string {
  return encodeURIComponent(value)
    .replaceAll("!", "%21")
    .replaceAll("'", "%27")
    .replaceAll("(", "%28")
    .replaceAll(")", "%29")
    .replaceAll("*", "%2A");
}
