export type JSDocScannerState =
  | "beginning-of-line"
  | "saw-asterisk"
  | "saving-comment"
  | "saving-backticks";

export interface JSDocScannerToken {
  readonly kind: JSDocScannerTokenKind;
  readonly text: string;
  readonly pos: number;
  readonly end: number;
}

export type JSDocScannerTokenKind =
  | "at"
  | "asterisk"
  | "backtick"
  | "brace-open"
  | "brace-close"
  | "bracket-open"
  | "bracket-close"
  | "paren-open"
  | "paren-close"
  | "equals"
  | "comma"
  | "dot"
  | "ellipsis"
  | "dash"
  | "colon"
  | "pipe"
  | "newline"
  | "whitespace"
  | "identifier"
  | "text"
  | "eof";

export interface JSDocScannerSnapshot {
  readonly position: number;
  readonly token: JSDocScannerToken;
  readonly state: JSDocScannerState;
  readonly backtickCount: number;
  readonly inFencedCodeBlock: boolean;
}

export class JSDocScanner {
  readonly #text: string;
  #position = 0;
  #state: JSDocScannerState = "saw-asterisk";
  #backtickCount = 0;
  #inFencedCodeBlock = false;
  #token: JSDocScannerToken = { kind: "eof", text: "", pos: 0, end: 0 };

  constructor(text: string) {
    this.#text = stripJSDocCommentDelimiters(text);
  }

  token(): JSDocScannerToken {
    return this.#token;
  }

  state(): JSDocScannerState {
    return this.#state;
  }

  inFencedCodeBlock(): boolean {
    return this.#inFencedCodeBlock;
  }

  mark(): JSDocScannerSnapshot {
    return {
      position: this.#position,
      token: this.#token,
      state: this.#state,
      backtickCount: this.#backtickCount,
      inFencedCodeBlock: this.#inFencedCodeBlock,
    };
  }

  rewind(snapshot: JSDocScannerSnapshot): void {
    this.#position = snapshot.position;
    this.#token = snapshot.token;
    this.#state = snapshot.state;
    this.#backtickCount = snapshot.backtickCount;
    this.#inFencedCodeBlock = snapshot.inFencedCodeBlock;
  }

  next(): JSDocScannerToken {
    if (this.#position >= this.#text.length) {
      this.#flushBackticks();
      this.#token = { kind: "eof", text: "", pos: this.#position, end: this.#position };
      return this.#token;
    }

    const start = this.#position;
    const char = this.#text[start]!;
    if (char !== "`") this.#flushBackticks();

    if (char === "\r" || char === "\n") {
      const end = char === "\r" && this.#text[start + 1] === "\n" ? start + 2 : start + 1;
      this.#position = end;
      this.#state = "beginning-of-line";
      return this.#setToken("newline", this.#text.slice(start, end), start, end);
    }

    if (isWhitespace(char)) {
      let end = start + 1;
      while (end < this.#text.length && isWhitespace(this.#text[end]!) && this.#text[end] !== "\r" && this.#text[end] !== "\n") end += 1;
      this.#position = end;
      return this.#setToken("whitespace", this.#text.slice(start, end), start, end);
    }

    if (this.#state === "beginning-of-line" && char === "*") {
      this.#position = start + 1;
      this.#state = "saw-asterisk";
      return this.#setToken("asterisk", char, start, start + 1);
    }

    if (char === "`") {
      this.#position = start + 1;
      this.#backtickCount += 1;
      this.#state = "saving-backticks";
      return this.#setToken("backtick", char, start, start + 1);
    }

    if (char === "@" && this.canFollowJSDocAt()) {
      this.#position = start + 1;
      this.#state = "saving-comment";
      return this.#setToken("at", char, start, start + 1);
    }

    const punctuation = punctuationTokenKind(char, this.#text, start);
    if (punctuation !== undefined) {
      this.#position = start + punctuation.length;
      this.#state = "saving-comment";
      return this.#setToken(punctuation.kind, punctuation.text, start, start + punctuation.length);
    }

    if (isIdentifierStart(char)) {
      let end = start + 1;
      while (end < this.#text.length && isIdentifierPart(this.#text[end]!)) end += 1;
      this.#position = end;
      this.#state = "saving-comment";
      return this.#setToken("identifier", this.#text.slice(start, end), start, end);
    }

    let end = start + 1;
    while (end < this.#text.length && !isTokenBoundary(this.#text[end]!)) end += 1;
    this.#position = end;
    this.#state = "saving-comment";
    return this.#setToken("text", this.#text.slice(start, end), start, end);
  }

  scanAll(): readonly JSDocScannerToken[] {
    const tokens: JSDocScannerToken[] = [];
    while (true) {
      const token = this.next();
      tokens.push(token);
      if (token.kind === "eof") return tokens;
    }
  }

  skipWhitespace(): JSDocScannerToken {
    let token = this.token();
    while (token.kind === "whitespace" || token.kind === "newline" || token.kind === "asterisk") {
      token = this.next();
    }
    return token;
  }

  canFollowJSDocAt(): boolean {
    if (this.#inFencedCodeBlock) return false;
    if (this.#state === "beginning-of-line" || this.#state === "saw-asterisk") return true;
    const previous = this.#text[this.#position - 1];
    return previous === undefined || previous === " " || previous === "\t" || previous === "\n" || previous === "\r" || previous === "*";
  }

  #setToken(kind: JSDocScannerTokenKind, text: string, pos: number, end: number): JSDocScannerToken {
    this.#token = { kind, text, pos, end };
    return this.#token;
  }

  #flushBackticks(): void {
    if (this.#backtickCount >= 3) {
      this.#inFencedCodeBlock = !this.#inFencedCodeBlock;
    }
    this.#backtickCount = 0;
  }
}

export function stripJSDocCommentDelimiters(text: string): string {
  let body = text;
  if (body.startsWith("/**")) body = body.slice(3);
  if (body.endsWith("*/")) body = body.slice(0, body.length - 2);
  return body;
}

export function cleanJSDocLine(line: string): string {
  let index = 0;
  while (index < line.length && (line[index] === " " || line[index] === "\t")) index += 1;
  if (line[index] === "*") {
    index += 1;
    if (line[index] === " ") index += 1;
  }
  return line.slice(index);
}

export function cleanJSDocText(text: string): string {
  return stripJSDocCommentDelimiters(text).split(/\r?\n/).map(cleanJSDocLine).join("\n");
}

export function splitJSDocLines(text: string): readonly string[] {
  return cleanJSDocText(text).split(/\r?\n/);
}

export function leadingIndentOfJSDocLine(line: string): number {
  let indent = 0;
  while (indent < line.length) {
    const char = line[indent];
    if (char === " ") indent += 1;
    else if (char === "\t") indent += 4;
    else break;
  }
  return indent;
}

export function minimumJSDocIndent(lines: readonly string[]): number {
  let minimum = Number.POSITIVE_INFINITY;
  for (const line of lines) {
    if (line.trim() === "") continue;
    minimum = Math.min(minimum, leadingIndentOfJSDocLine(line));
  }
  return minimum === Number.POSITIVE_INFINITY ? 0 : minimum;
}

export function removeJSDocIndent(lines: readonly string[], indent: number): readonly string[] {
  return lines.map((line) => {
    let remaining = indent;
    let index = 0;
    while (remaining > 0 && index < line.length) {
      if (line[index] === " ") {
        remaining -= 1;
        index += 1;
      } else if (line[index] === "\t") {
        remaining -= 4;
        index += 1;
      } else {
        break;
      }
    }
    return line.slice(index);
  });
}

export function normalizeJSDocCommentText(text: string): string {
  const lines = splitJSDocLines(text);
  return removeJSDocIndent(lines, minimumJSDocIndent(lines)).join("\n").trim();
}

export function isJSDocTagStart(line: string): boolean {
  const trimmed = line.trimStart();
  if (!trimmed.startsWith("@")) return false;
  const next = trimmed[1];
  return next !== undefined && isIdentifierStart(next);
}

export function readJSDocTagName(line: string): string {
  const trimmed = line.trimStart();
  if (!trimmed.startsWith("@")) return "";
  let index = 1;
  while (index < trimmed.length && isIdentifierPart(trimmed[index]!)) index += 1;
  return trimmed.slice(1, index);
}

export function readJSDocTagText(line: string): string {
  const trimmed = line.trimStart();
  if (!trimmed.startsWith("@")) return line;
  let index = 1;
  while (index < trimmed.length && isIdentifierPart(trimmed[index]!)) index += 1;
  return trimmed.slice(index).trimStart();
}

export function isTokenBoundary(char: string): boolean {
  return char === "@" ||
    char === "*" ||
    char === "`" ||
    char === "{" ||
    char === "}" ||
    char === "[" ||
    char === "]" ||
    char === "(" ||
    char === ")" ||
    char === "=" ||
    char === "," ||
    char === "." ||
    char === "-" ||
    char === ":" ||
    char === "|" ||
    char === "\r" ||
    char === "\n" ||
    isWhitespace(char);
}

export function isWhitespace(char: string): boolean {
  return char === " " || char === "\t" || char === "\v" || char === "\f";
}

export function isIdentifierStart(char: string): boolean {
  const code = char.codePointAt(0) ?? 0;
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || char === "_" || char === "$";
}

export function isIdentifierPart(char: string): boolean {
  const code = char.codePointAt(0) ?? 0;
  return isIdentifierStart(char) || (code >= 48 && code <= 57) || char === "-";
}

function punctuationTokenKind(char: string, text: string, index: number): { kind: JSDocScannerTokenKind; text: string; length: number } | undefined {
  if (char === "." && text[index + 1] === "." && text[index + 2] === ".") return { kind: "ellipsis", text: "...", length: 3 };
  if (char === "{") return { kind: "brace-open", text: char, length: 1 };
  if (char === "}") return { kind: "brace-close", text: char, length: 1 };
  if (char === "[") return { kind: "bracket-open", text: char, length: 1 };
  if (char === "]") return { kind: "bracket-close", text: char, length: 1 };
  if (char === "(") return { kind: "paren-open", text: char, length: 1 };
  if (char === ")") return { kind: "paren-close", text: char, length: 1 };
  if (char === "=") return { kind: "equals", text: char, length: 1 };
  if (char === ",") return { kind: "comma", text: char, length: 1 };
  if (char === ".") return { kind: "dot", text: char, length: 1 };
  if (char === "-") return { kind: "dash", text: char, length: 1 };
  if (char === ":") return { kind: "colon", text: char, length: 1 };
  if (char === "|") return { kind: "pipe", text: char, length: 1 };
  return undefined;
}
