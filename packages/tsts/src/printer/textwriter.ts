/**
 * Text writer.
 *
 * Port of TS-Go `internal/printer/textwriter.go` (~227 LoC). Concrete
 * EmitTextWriter that buffers output lines, tracks indentation, line
 * count, and column position. Used by the printer for normal multi-line
 * output (with a single-line variant in singlelinestringwriter.ts).
 */

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
  writeSymbol(text: string, symbol: unknown): void;
  writeProperty(text: string): void;
  writeComment(text: string): void;
  writeLine(): void;
  writeLineRepeat(count: number): void;
  increaseIndent(): void;
  decreaseIndent(): void;
  getText(): string;
  getTextPos(): number;
  getLine(): number;
  getColumn(): number;
  getIndent(): number;
  isAtStartOfLine(): boolean;
  rawWrite(s: string): void;
  writeLiteralStringLiteral(text: string): void;
  hasTrailingComment(): boolean;
  hasTrailingWhitespace(): boolean;
  clear(): void;
}

export class TextWriter implements EmitTextWriter {
  buffer = "";
  indentSize: number;
  indentLevel = 0;
  line = 0;
  column = 0;
  lineStart = true;
  trailingComment = false;

  constructor(indentSize: number) {
    this.indentSize = indentSize;
  }

  private writeText(s: string): void {
    if (this.lineStart) {
      this.buffer += " ".repeat(this.indentSize * this.indentLevel);
      this.column = this.indentSize * this.indentLevel;
      this.lineStart = false;
    }
    this.buffer += s;
    this.column += s.length;
  }

  write(s: string): void { this.writeText(s); }
  writeTrailingSemicolon(text: string): void { this.writeText(text); }
  writeKeyword(text: string): void { this.writeText(text); }
  writeOperator(text: string): void { this.writeText(text); }
  writePunctuation(text: string): void { this.writeText(text); }
  writeParameter(text: string): void { this.writeText(text); }
  writeSpace(text: string): void { this.writeText(text); }
  writeStringLiteral(text: string): void { this.writeText(text); }
  writeLiteral(text: string): void { this.writeText(text); }
  writeSymbol(text: string, _symbol: unknown): void { this.writeText(text); }
  writeProperty(text: string): void { this.writeText(text); }
  writeComment(text: string): void { this.writeText(text); this.trailingComment = true; }
  writeLine(): void {
    this.buffer += "\n"; this.line += 1; this.column = 0; this.lineStart = true; this.trailingComment = false;
  }
  writeLineRepeat(count: number): void {
    for (let i = 0; i < count; i += 1) this.writeLine();
  }
  increaseIndent(): void { this.indentLevel += 1; }
  decreaseIndent(): void { this.indentLevel = Math.max(0, this.indentLevel - 1); }
  getText(): string { return this.buffer; }
  getTextPos(): number { return this.buffer.length; }
  getLine(): number { return this.line; }
  getColumn(): number { return this.column; }
  getIndent(): number { return this.indentLevel; }
  isAtStartOfLine(): boolean { return this.lineStart; }
  rawWrite(s: string): void { this.buffer += s; }
  writeLiteralStringLiteral(text: string): void { this.writeText(text); }
  hasTrailingComment(): boolean { return this.trailingComment; }
  hasTrailingWhitespace(): boolean { return this.buffer.endsWith(" "); }
  clear(): void {
    this.buffer = ""; this.indentLevel = 0; this.line = 0;
    this.column = 0; this.lineStart = true; this.trailingComment = false;
  }
}

export function newTextWriter(indentSize: number): EmitTextWriter {
  return new TextWriter(indentSize);
}
