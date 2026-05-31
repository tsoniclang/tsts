/**
 * Change-tracker writer.
 *
 * Port of TS-Go `internal/printer/changetrackerwriter.go` (~238 LoC).
 * EmitTextWriter wrapper that records text-edit operations to be
 * applied to an existing file (used by refactor / quickfix actions).
 */

import type { EmitTextWriter } from "./textWriter.js";

export interface TextChange {
  span: { start: number; length: number };
  newText: string;
}

export class ChangeTrackerWriter implements EmitTextWriter {
  inner: EmitTextWriter;
  changes: TextChange[] = [];
  currentChange: TextChange | undefined;

  constructor(inner: EmitTextWriter) {
    this.inner = inner;
  }

  write(s: string): void { this.inner.write(s); }
  writeTrailingSemicolon(text: string): void { this.inner.writeTrailingSemicolon(text); }
  writeKeyword(text: string): void { this.inner.writeKeyword(text); }
  writeOperator(text: string): void { this.inner.writeOperator(text); }
  writePunctuation(text: string): void { this.inner.writePunctuation(text); }
  writeParameter(text: string): void { this.inner.writeParameter(text); }
  writeSpace(text: string): void { this.inner.writeSpace(text); }
  writeStringLiteral(text: string): void { this.inner.writeStringLiteral(text); }
  writeLiteral(text: string): void { this.inner.writeLiteral(text); }
  writeSymbol(text: string, symbol: unknown): void { this.inner.writeSymbol(text, symbol); }
  writeProperty(text: string): void { this.inner.writeProperty(text); }
  writeComment(text: string): void { this.inner.writeComment(text); }
  writeLine(): void { this.inner.writeLine(); }
  writeLineForce(force: boolean): void { this.inner.writeLineForce(force); }
  writeLineRepeat(count: number): void { this.inner.writeLineRepeat(count); }
  increaseIndent(): void { this.inner.increaseIndent(); }
  decreaseIndent(): void { this.inner.decreaseIndent(); }
  getText(): string { return this.inner.getText(); }
  toString(): string { return this.inner.toString(); }
  getTextPos(): number { return this.inner.getTextPos(); }
  getLine(): number { return this.inner.getLine(); }
  getColumn(): number { return this.inner.getColumn(); }
  getIndent(): number { return this.inner.getIndent(); }
  isAtStartOfLine(): boolean { return this.inner.isAtStartOfLine(); }
  rawWrite(s: string): void { this.inner.rawWrite(s); }
  writeLiteralStringLiteral(text: string): void { this.inner.writeLiteralStringLiteral(text); }
  hasTrailingComment(): boolean { return this.inner.hasTrailingComment(); }
  hasTrailingWhitespace(): boolean { return this.inner.hasTrailingWhitespace(); }
  grow(size: number): void { this.inner.grow(size); }
  clear(): void { this.inner.clear(); this.changes = []; this.currentChange = undefined; }

  startChange(start: number, length: number): void {
    this.currentChange = { span: { start, length }, newText: "" };
  }

  endChange(): void {
    if (this.currentChange !== undefined) {
      this.changes.push(this.currentChange);
      this.currentChange = undefined;
    }
  }

  getChanges(): readonly TextChange[] {
    return this.changes;
  }
}

export function newChangeTrackerWriter(inner: EmitTextWriter): ChangeTrackerWriter {
  return new ChangeTrackerWriter(inner);
}
