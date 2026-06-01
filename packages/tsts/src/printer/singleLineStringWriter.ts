/**
 * Single-line string writer.
 *
 * Port of TS-Go `internal/printer/singlelinestringwriter.go` (~159 LoC).
 * EmitTextWriter that flattens output to a single line — used by
 * printType / printTypeOfNode-style API queries where multi-line
 * pretty-printing isn't needed.
 */

import type { EmitTextWriter } from "./textWriter.js";
import type { Symbol as AstSymbol } from "../ast/index.js";

export class SingleLineStringWriter implements EmitTextWriter {
  buffer = "";
  private lastWritten = "";

  write(text: string): void { this.writeText(text); }
  writeTrailingSemicolon(text: string): void { this.writeText(text); }
  writeKeyword(text: string): void { this.writeText(text); }
  writeOperator(text: string): void { this.writeText(text); }
  writePunctuation(text: string): void { this.writeText(text); }
  writeParameter(text: string): void { this.writeText(text); }
  writeSpace(text: string): void { this.writeText(text); }
  writeStringLiteral(text: string): void { this.writeText(text); }
  writeLiteral(text: string): void { this.writeText(text); }
  writeSymbol(text: string, _symbol: AstSymbol | undefined): void { this.writeText(text); }
  writeProperty(text: string): void { this.writeText(text); }
  writeComment(text: string): void { this.writeText(text); }
  writeLine(): void { this.writeText(" "); }
  writeLineRepeat(count: number): void {
    for (let index = 0; index < count; index += 1) this.writeLine();
  }
  writeLineForce(_force: boolean): void { this.writeLine(); }
  increaseIndent(): void { /* no-op */ }
  decreaseIndent(): void { /* no-op */ }
  getText(): string { return this.buffer; }
  toString(): string { return this.buffer; }
  getTextPos(): number { return this.buffer.length; }
  getLine(): number { return 0; }
  getColumn(): number { return 0; }
  getIndent(): number { return 0; }
  isAtStartOfLine(): boolean { return false; }
  rawWrite(text: string): void { this.writeText(text); }
  writeLiteralStringLiteral(text: string): void { this.writeText(text); }
  hasTrailingComment(): boolean { return false; }
  hasTrailingWhitespace(): boolean { return this.lastWritten.length > 0 && /\s$/u.test(this.lastWritten); }
  clear(): void {
    this.buffer = "";
    this.lastWritten = "";
  }
  grow(_size: number): void { /* no-op */ }

  private writeText(text: string): void {
    this.lastWritten = text;
    this.buffer += text;
  }
}

export function newSingleLineStringWriter(): EmitTextWriter {
  return new SingleLineStringWriter();
}
