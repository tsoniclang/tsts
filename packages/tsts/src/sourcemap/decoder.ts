/**
 * Sourcemap mappings VLQ decoder.
 *
 * Port of TS-Go `internal/sourcemap/decoder.go` (253 LoC).
 * Decodes the `mappings` field of a V3 source map into a stream of
 * Mapping records.
 */

export type SourceIndex = number;
export type NameIndex = number;
export type UTF16Offset = number;

export const MissingSource: SourceIndex = -1;
export const MissingName: NameIndex = -1;
export const MissingLineOrColumn = -1;
export const MissingUTF16Column: UTF16Offset = -1;

export interface Mapping {
  generatedLine: number;
  generatedCharacter: UTF16Offset;
  sourceIndex: SourceIndex;
  sourceLine: number;
  sourceCharacter: UTF16Offset;
  nameIndex: NameIndex;
}

export function mappingsEqual(a: Mapping, b: Mapping): boolean {
  return (
    a.generatedLine === b.generatedLine &&
    a.generatedCharacter === b.generatedCharacter &&
    a.sourceIndex === b.sourceIndex &&
    a.sourceLine === b.sourceLine &&
    a.sourceCharacter === b.sourceCharacter &&
    a.nameIndex === b.nameIndex
  );
}

export function isSourceMapping(m: Mapping): boolean {
  return (
    m.sourceIndex !== MissingSource &&
    m.sourceLine !== MissingLineOrColumn &&
    m.sourceCharacter !== MissingUTF16Column
  );
}

export class MappingsDecoder {
  private readonly mappings: string;
  private done = false;
  private pos = 0;
  private generatedLine = 0;
  private generatedCharacter: UTF16Offset = 0;
  private sourceIndex: SourceIndex = 0;
  private sourceLine = 0;
  private sourceCharacter: UTF16Offset = 0;
  private nameIndex: NameIndex = 0;
  private errorMessage: string | undefined;

  constructor(mappings: string) {
    this.mappings = mappings;
  }

  mappingsString(): string {
    return this.mappings;
  }

  getPos(): number {
    return this.pos;
  }

  getError(): string | undefined {
    return this.errorMessage;
  }

  /** Snapshot the current state into a fresh Mapping. */
  state(): Mapping {
    return this.captureMapping(true, true);
  }

  /**
   * Iterate all mappings. Returns an iterable; use for-of to consume.
   */
  *values(): IterableIterator<Mapping> {
    for (;;) {
      const next = this.next();
      if (next.done) break;
      yield next.value;
    }
  }

  next(): { value: Mapping; done: false } | { value: undefined; done: true } {
    while (!this.done && this.pos < this.mappings.length) {
      const ch = this.mappings[this.pos]!;
      if (ch === ";") {
        this.generatedLine += 1;
        this.generatedCharacter = 0;
        this.pos += 1;
        continue;
      }
      if (ch === ",") {
        this.pos += 1;
        continue;
      }

      let hasSource = false;
      let hasName = false;

      const delta = this.base64VLQFormatDecode();
      if (this.hasReportedError()) return this.stopIterating();
      this.generatedCharacter += delta;
      if (this.generatedCharacter < 0) {
        return this.setErrorAndStopIterating("Invalid generatedCharacter found");
      }

      if (!this.isSegmentEnd()) {
        hasSource = true;
        this.sourceIndex += this.base64VLQFormatDecode();
        if (this.hasReportedError()) return this.stopIterating();
        if (this.sourceIndex < 0) return this.setErrorAndStopIterating("Invalid sourceIndex found");
        if (this.isSegmentEnd()) return this.setErrorAndStopIterating("Unsupported Format: No entries after sourceIndex");

        this.sourceLine += this.base64VLQFormatDecode();
        if (this.hasReportedError()) return this.stopIterating();
        if (this.sourceLine < 0) return this.setErrorAndStopIterating("Invalid sourceLine found");
        if (this.isSegmentEnd()) return this.setErrorAndStopIterating("Unsupported Format: No entries after sourceLine");

        this.sourceCharacter += this.base64VLQFormatDecode();
        if (this.hasReportedError()) return this.stopIterating();
        if (this.sourceCharacter < 0) return this.setErrorAndStopIterating("Invalid sourceCharacter found");

        if (!this.isSegmentEnd()) {
          hasName = true;
          this.nameIndex += this.base64VLQFormatDecode();
          if (this.hasReportedError()) return this.stopIterating();
          if (this.nameIndex < 0) return this.setErrorAndStopIterating("Invalid nameIndex found");
          if (!this.isSegmentEnd()) {
            return this.setErrorAndStopIterating("Unsupported Error Format: Entries after nameIndex");
          }
        }
      }

      return { value: this.captureMapping(hasSource, hasName), done: false };
    }
    return this.stopIterating();
  }

  private captureMapping(hasSource: boolean, hasName: boolean): Mapping {
    return {
      generatedLine: this.generatedLine,
      generatedCharacter: this.generatedCharacter,
      sourceIndex: hasSource ? this.sourceIndex : MissingSource,
      sourceLine: hasSource ? this.sourceLine : MissingLineOrColumn,
      sourceCharacter: hasSource ? this.sourceCharacter : MissingUTF16Column,
      nameIndex: hasName ? this.nameIndex : MissingName,
    };
  }

  private stopIterating(): { value: undefined; done: true } {
    this.done = true;
    return { value: undefined, done: true };
  }

  private setError(message: string): void {
    this.errorMessage = message;
  }

  private setErrorAndStopIterating(message: string): { value: undefined; done: true } {
    this.setError(message);
    return this.stopIterating();
  }

  private hasReportedError(): boolean {
    return this.errorMessage !== undefined;
  }

  private isSegmentEnd(): boolean {
    if (this.pos >= this.mappings.length) return true;
    const c = this.mappings[this.pos];
    return c === "," || c === ";";
  }

  private base64VLQFormatDecode(): number {
    let moreDigits = true;
    let shiftCount = 0;
    let value = 0;
    while (moreDigits) {
      if (this.pos >= this.mappings.length) {
        this.setError("Error in decoding base64VLQFormatDecode, past the mapping string");
        return -1;
      }
      const currentByte = base64FormatDecode(this.mappings.charCodeAt(this.pos));
      this.pos += 1;
      if (currentByte === -1) {
        this.setError("Invalid character in VLQ");
        return -1;
      }
      moreDigits = (currentByte & 32) !== 0;
      value |= (currentByte & 31) << shiftCount;
      shiftCount += 5;
    }
    if ((value & 1) === 0) return value >> 1;
    return -(value >> 1);
  }
}

export function decodeMappings(mappings: string): MappingsDecoder {
  return new MappingsDecoder(mappings);
}

function base64FormatDecode(charCode: number): number {
  if (charCode >= 0x41 && charCode <= 0x5a) return charCode - 0x41; // A-Z
  if (charCode >= 0x61 && charCode <= 0x7a) return charCode - 0x61 + 26; // a-z
  if (charCode >= 0x30 && charCode <= 0x39) return charCode - 0x30 + 52; // 0-9
  if (charCode === 0x2b) return 62; // +
  if (charCode === 0x2f) return 63; // /
  return -1;
}
