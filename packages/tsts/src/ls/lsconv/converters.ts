/**
 * Language-service position converters.
 */

import type { Position, Range } from "../../lsp/lsproto/index.js";
import { isBundled } from "../../bundled/index.js";
import { isDynamicFileName, splitVolumePath } from "../../tspath/index.js";

export interface LineMapCarrier {
  readonly lineStarts: readonly number[];
}

export class Converters {
  positionToLineAndCharacter(file: LineMapCarrier, position: number): Position {
    const starts = file.lineStarts;
    let line = 0;
    for (let index = 0; index < starts.length; index += 1) {
      if ((starts[index] ?? 0) > position) break;
      line = index;
    }
    return { line, character: position - (starts[line] ?? 0) };
  }

  lineAndCharacterToPosition(file: LineMapCarrier, position: Position): number {
    return (file.lineStarts[position.line] ?? 0) + position.character;
  }

  toLSPRange(file: LineMapCarrier, range: { readonly pos: number; readonly end: number }): Range {
    return {
      start: this.positionToLineAndCharacter(file, range.pos),
      end: this.positionToLineAndCharacter(file, range.end),
    };
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

function escapeUriPathPart(value: string): string {
  return encodeURIComponent(value)
    .replaceAll("!", "%21")
    .replaceAll("'", "%27")
    .replaceAll("(", "%28")
    .replaceAll(")", "%29")
    .replaceAll("*", "%2A");
}
