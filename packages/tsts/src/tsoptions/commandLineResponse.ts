/**
 * Response-file tokenization for command-line parsing.
 *
 * TS-Go supports `@file` response files in the command-line parser. The
 * scanner here is intentionally independent of Node shell parsing: it treats
 * whitespace, double-quoted strings, backslash escapes, and line comments in
 * the same deterministic pass that commandlineparser can call recursively.
 */

export interface ResponseFileToken {
  readonly text: string;
  readonly pos: number;
  readonly end: number;
}

export interface ResponseFileDiagnostic {
  readonly pos: number;
  readonly message: string;
}

export interface ResponseFileScanResult {
  readonly tokens: readonly ResponseFileToken[];
  readonly diagnostics: readonly ResponseFileDiagnostic[];
}

export function scanResponseFileText(text: string): ResponseFileScanResult {
  const tokens: ResponseFileToken[] = [];
  const diagnostics: ResponseFileDiagnostic[] = [];
  let pos = 0;
  while (pos < text.length) {
    pos = skipResponseWhitespace(text, pos);
    if (pos >= text.length) break;
    if (isLineCommentStart(text, pos)) {
      pos = skipLineComment(text, pos);
      continue;
    }
    const start = pos;
    const scanned = text[pos] === "\""
      ? scanQuotedResponseToken(text, pos, diagnostics)
      : scanUnquotedResponseToken(text, pos);
    pos = scanned.end;
    if (scanned.text.length > 0) tokens.push({ text: scanned.text, pos: start, end: scanned.end });
  }
  return { tokens, diagnostics };
}

function skipResponseWhitespace(text: string, pos: number): number {
  while (pos < text.length) {
    const ch = text.charCodeAt(pos);
    if (ch !== 0x20 && ch !== 0x09 && ch !== 0x0d && ch !== 0x0a) break;
    pos += 1;
  }
  return pos;
}

function isLineCommentStart(text: string, pos: number): boolean {
  return text[pos] === "/" && text[pos + 1] === "/";
}

function skipLineComment(text: string, pos: number): number {
  while (pos < text.length && text[pos] !== "\n" && text[pos] !== "\r") pos += 1;
  return pos;
}

function scanUnquotedResponseToken(text: string, pos: number): { readonly text: string; readonly end: number } {
  let end = pos;
  while (end < text.length) {
    const ch = text.charCodeAt(end);
    if (ch === 0x20 || ch === 0x09 || ch === 0x0d || ch === 0x0a) break;
    if (isLineCommentStart(text, end)) break;
    end += 1;
  }
  return { text: text.slice(pos, end), end };
}

function scanQuotedResponseToken(
  text: string,
  pos: number,
  diagnostics: ResponseFileDiagnostic[],
): { readonly text: string; readonly end: number } {
  let cursor = pos + 1;
  let value = "";
  while (cursor < text.length) {
    const ch = text[cursor]!;
    if (ch === "\"") return { text: value, end: cursor + 1 };
    if (ch === "\\") {
      const escaped = text[cursor + 1];
      if (escaped === undefined) {
        diagnostics.push({ pos: cursor, message: "Trailing escape in response file." });
        return { text: value, end: cursor + 1 };
      }
      value += responseEscapeValue(escaped);
      cursor += 2;
      continue;
    }
    value += ch;
    cursor += 1;
  }
  diagnostics.push({ pos, message: "Unterminated quoted string in response file." });
  return { text: value, end: cursor };
}

function responseEscapeValue(ch: string): string {
  if (ch === "n") return "\n";
  if (ch === "r") return "\r";
  if (ch === "t") return "\t";
  return ch;
}

export function scanResponseFileArguments(text: string): readonly string[] {
  return scanResponseFileText(text).tokens.map((token) => token.text);
}

export function expandResponseFileArguments(
  args: readonly string[],
  readFile: (path: string) => string | undefined,
): { readonly args: readonly string[]; readonly diagnostics: readonly ResponseFileDiagnostic[] } {
  const expanded: string[] = [];
  const diagnostics: ResponseFileDiagnostic[] = [];
  for (const arg of args) {
    if (!arg.startsWith("@")) {
      expanded.push(arg);
      continue;
    }
    const fileName = arg.slice(1);
    const text = readFile(fileName);
    if (text === undefined) {
      diagnostics.push({ pos: 0, message: `Cannot read response file '${fileName}'.` });
      continue;
    }
    const scanned = scanResponseFileText(text);
    expanded.push(...scanned.tokens.map((token) => token.text));
    diagnostics.push(...scanned.diagnostics);
  }
  return { args: expanded, diagnostics };
}
