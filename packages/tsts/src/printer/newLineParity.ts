/**
 * Newline policy parity helpers.
 */

export type NewLineKind = "lf" | "crlf";

export function newLineText(kind: NewLineKind): string {
  return kind === "crlf" ? "\r\n" : "\n";
}

export function normalizeNewLines(text: string, kind: NewLineKind): string {
  return text.replace(/\r\n|\r|\n/g, newLineText(kind));
}
