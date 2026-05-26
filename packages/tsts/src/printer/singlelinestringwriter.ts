/**
 * Single-line string writer.
 *
 * Port of TS-Go `internal/printer/singlelinestringwriter.go` (~159 LoC).
 * EmitTextWriter that flattens output to a single line — used by
 * printType / printTypeOfNode-style API queries where multi-line
 * pretty-printing isn't needed.
 */

import type { EmitTextWriter } from "./textwriter.js";

export class SingleLineStringWriter implements EmitTextWriter {
  buffer = "";

  write(s: string): void { this.buffer += s; }
  writeTrailingSemicolon(text: string): void { this.buffer += text; }
  writeKeyword(text: string): void { this.buffer += text; }
  writeOperator(text: string): void { this.buffer += text; }
  writePunctuation(text: string): void { this.buffer += text; }
  writeParameter(text: string): void { this.buffer += text; }
  writeSpace(text: string): void { this.buffer += text; }
  writeStringLiteral(text: string): void { this.buffer += text; }
  writeLiteral(text: string): void { this.buffer += text; }
  writeSymbol(text: string, _symbol: unknown): void { this.buffer += text; }
  writeProperty(text: string): void { this.buffer += text; }
  writeComment(text: string): void { this.buffer += text; }
  writeLine(): void { this.buffer += " "; }
  writeLineRepeat(_count: number): void { this.buffer += " "; }
  increaseIndent(): void { /* no-op */ }
  decreaseIndent(): void { /* no-op */ }
  getText(): string { return this.buffer; }
  getTextPos(): number { return this.buffer.length; }
  getLine(): number { return 0; }
  getColumn(): number { return this.buffer.length; }
  getIndent(): number { return 0; }
  isAtStartOfLine(): boolean { return this.buffer.length === 0; }
  rawWrite(s: string): void { this.buffer += s; }
  writeLiteralStringLiteral(text: string): void { this.buffer += text; }
  hasTrailingComment(): boolean { return false; }
  hasTrailingWhitespace(): boolean { return this.buffer.endsWith(" "); }
  clear(): void { this.buffer = ""; }
}

export function newSingleLineStringWriter(): EmitTextWriter {
  return new SingleLineStringWriter();
}
