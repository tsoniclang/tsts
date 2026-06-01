/**
 * Text writer.
 *
 * Port of TS-Go `internal/printer/textwriter.go` (~227 LoC). Concrete
 * EmitTextWriter that buffers output lines, tracks indentation, line
 * count, and column position. Used by the printer for normal multi-line
 * output (with a single-line variant in singlelinestringwriter.ts).
 */

import type { Symbol as AstSymbol } from "../ast/index.js";

export interface EmitTextWriter {
  write(s: string): void;
  writeTrailingSemicolon(text: string): void;
  writeKeyword(text: string): void;
  writeOperator(text: string): void;
  writePunctuation(text: string): void;
  writeParameter(text: string): void;
  writeSpace(text: string): void;
  writeStringLiteral(text: string): void;
  writeLiteral(text: string): void;
  writeSymbol(text: string, symbol: AstSymbol | undefined): void;
  writeProperty(text: string): void;
  writeComment(text: string): void;
  writeLine(): void;
  writeLineForce(force: boolean): void;
  writeLineRepeat(count: number): void;
  increaseIndent(): void;
  decreaseIndent(): void;
  getText(): string;
  toString(): string;
  getTextPos(): number;
  getLine(): number;
  getColumn(): number;
  getIndent(): number;
  isAtStartOfLine(): boolean;
  rawWrite(s: string): void;
  writeLiteralStringLiteral(text: string): void;
  hasTrailingComment(): boolean;
  hasTrailingWhitespace(): boolean;
  grow(size: number): void;
  clear(): void;
}

export class TextWriter implements EmitTextWriter {
  buffer = "";
  private readonly newLine: string;
  indentSize: number;
  indentLevel = 0;
  private lineCount = 0;
  private linePosition = 0;
  lineStart = true;
  trailingComment = false;
  private lastWritten = "";

  constructor(newLine = "\n", indentSize = defaultIndentSize) {
    this.newLine = newLine;
    this.indentSize = indentSize > 0 ? indentSize : defaultIndentSize;
  }

  private writeText(text: string): void {
    if (text.length === 0) return;
    if (this.lineStart) {
      this.buffer += " ".repeat(this.indentSize * this.indentLevel);
      this.lineStart = false;
    }
    this.buffer += text;
    this.lastWritten = text;
    this.updateLineCountAndPosition(text);
  }

  write(s: string): void {
    if (s.length > 0) this.trailingComment = false;
    this.writeText(s);
  }
  writeTrailingSemicolon(text: string): void { this.writeText(text); }
  writeKeyword(text: string): void { this.writeText(text); }
  writeOperator(text: string): void { this.writeText(text); }
  writePunctuation(text: string): void { this.writeText(text); }
  writeParameter(text: string): void { this.writeText(text); }
  writeSpace(text: string): void { this.writeText(text); }
  writeStringLiteral(text: string): void { this.writeText(text); }
  writeLiteral(text: string): void { this.write(text); }
  writeSymbol(text: string, _symbol: AstSymbol | undefined): void { this.writeText(text); }
  writeProperty(text: string): void { this.writeText(text); }
  writeComment(text: string): void {
    if (text.length > 0) this.trailingComment = true;
    this.writeText(text);
  }
  writeLine(): void {
    this.writeLineForce(false);
  }
  writeLineForce(force: boolean): void {
    if (!this.lineStart || force) this.writeLineRaw();
  }
  writeLineRepeat(count: number): void {
    for (let index = 0; index < count; index += 1) this.writeLineForce(true);
  }
  increaseIndent(): void { this.indentLevel += 1; }
  decreaseIndent(): void { this.indentLevel = Math.max(0, this.indentLevel - 1); }
  getText(): string { return this.buffer; }
  toString(): string { return this.buffer; }
  getTextPos(): number { return this.buffer.length; }
  getLine(): number { return this.lineCount; }
  getColumn(): number { return this.lineStart ? this.indentSize * this.indentLevel : this.buffer.length - this.linePosition; }
  getIndent(): number { return this.indentLevel; }
  isAtStartOfLine(): boolean { return this.lineStart; }
  rawWrite(text: string): void {
    if (text.length === 0) return;
    this.buffer += text;
    this.lastWritten = text;
    this.trailingComment = false;
    this.updateLineCountAndPosition(text);
  }
  writeLiteralStringLiteral(text: string): void { this.write(text); }
  hasTrailingComment(): boolean { return this.trailingComment; }
  hasTrailingWhitespace(): boolean { return this.lastWritten.length > 0 && /\s$/u.test(this.lastWritten); }
  grow(_size: number): void { /* no-op */ }
  clear(): void {
    this.buffer = "";
    this.lastWritten = "";
    this.indentLevel = 0;
    this.lineCount = 0;
    this.linePosition = 0;
    this.lineStart = true;
    this.trailingComment = false;
  }

  private writeLineRaw(): void {
    this.buffer += this.newLine;
    this.lastWritten = this.newLine;
    this.lineCount += 1;
    this.linePosition = this.buffer.length;
    this.lineStart = true;
    this.trailingComment = false;
  }

  private updateLineCountAndPosition(text: string): void {
    let lineStart = -1;
    for (let index = 0; index < text.length; index += 1) {
      const char = text.charCodeAt(index);
      if (char === 13) {
        if (text.charCodeAt(index + 1) === 10) index += 1;
      } else if (char !== 10 && char !== 0x2028 && char !== 0x2029) {
        continue;
      }
      this.lineCount += 1;
      lineStart = index + 1;
    }
    if (lineStart >= 0) {
      this.linePosition = this.buffer.length - text.length + lineStart;
      this.lineStart = this.linePosition === this.buffer.length;
    } else {
      this.lineStart = false;
    }
  }
}

const defaultIndentSize = 4;

export function getDefaultIndentSize(): number {
  return defaultIndentSize;
}

export function getIndentString(indent: number, indentSize: number): string {
  return indent === 0 ? "" : " ".repeat(indent * indentSize);
}

export function newTextWriter(indentSize: number): EmitTextWriter;
export function newTextWriter(newLine: string, indentSize?: number): EmitTextWriter;
export function newTextWriter(newLineOrIndentSize: string | number = "\n", indentSize = defaultIndentSize): EmitTextWriter {
  if (typeof newLineOrIndentSize === "number") return new TextWriter("\n", newLineOrIndentSize);
  return new TextWriter(newLineOrIndentSize, indentSize);
}
