/**
 * String table for binary AST encoding.
 *
 * Port of TS-Go `internal/api/encoder/stringtable.go` (~68 LoC).
 * Tracks string identifiers used in the encoded AST. Strings that
 * appear verbatim in the source file are referenced by (pos, end);
 * synthesized strings are appended to a side buffer.
 */

export class StringTable {
  readonly fileText: string;
  otherStrings = "";
  offsets: number[] = [];

  constructor(fileText: string, stringCount: number) {
    this.fileText = fileText;
    this.offsets = [];
    void stringCount;
  }

  add(text: string, kind: number, pos: number, end: number): number {
    const index = Math.floor(this.offsets.length / 2);
    if (kind === Kind.SourceFile) {
      this.offsets.push(pos, end);
      return index;
    }
    const length = text.length;
    if (end - pos > 0 && end <= this.fileText.length) {
      let endOffset = 0;
      if (kind === Kind.StringLiteral
        || kind === Kind.TemplateTail
        || kind === Kind.NoSubstitutionTemplateLiteral) {
        endOffset = 1;
      }
      const newEnd = end - endOffset;
      const start = newEnd - length;
      if (start >= 0 && this.fileText.slice(start, newEnd) === text) {
        this.offsets.push(start, newEnd);
        return index;
      }
    }
    const offset = this.fileText.length + this.otherStrings.length;
    this.otherStrings += text;
    this.offsets.push(offset, offset + length);
    return index;
  }

  encode(): number[] {
    const result: number[] = [];
    for (const v of this.offsets) {
      result.push(v & 0xff, (v >>> 8) & 0xff, (v >>> 16) & 0xff, (v >>> 24) & 0xff);
    }
    const fileBytes = new TextEncoder().encode(this.fileText);
    const otherBytes = new TextEncoder().encode(this.otherStrings);
    for (const b of fileBytes) result.push(b);
    for (const b of otherBytes) result.push(b);
    return result;
  }

  stringLength(): number {
    return this.fileText.length + this.otherStrings.length;
  }

  encodedLength(): number {
    return this.offsets.length * 4 + this.fileText.length + this.otherStrings.length;
  }
}

export function newStringTable(fileText: string, stringCount: number): StringTable {
  return new StringTable(fileText, stringCount);
}

declare const Kind: {
  SourceFile: number;
  StringLiteral: number;
  TemplateTail: number;
  NoSubstitutionTemplateLiteral: number;
};
