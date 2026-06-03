/**
 * Source Map V3 generator.
 *
 * Port of TS-Go internal/sourcemap/generator.go.
 *
 * Builds Base64 VLQ-encoded mappings according to the Source Map V3 spec.
 * Used by the emit pipeline to track which output positions correspond
 * to which source positions.
 */

import {
  type ComparePathsOptions,
  getRelativePathToDirectoryOrUrl,
} from "../tspath/index.js";
import { marshal, type JsonValue } from "../json/index.js";
import type { UTF16Offset } from "../core/core.js";

// TS-Go: `type ( SourceIndex int; NameIndex int )`. Modeled as plain numeric
// aliases (matching decoder.ts) so values flow without branding casts.
export type SourceIndex = number;
export type NameIndex = number;

// TS-Go: `const ( sourceIndexNotSet SourceIndex = -1; nameIndexNotSet NameIndex
// = -1; notSet int = -1; notSetUTF16 core.UTF16Offset = -1 )`.
const sourceIndexNotSet: SourceIndex = -1;
const nameIndexNotSet: NameIndex = -1;
const notSet = -1;
const notSetUTF16: UTF16Offset = -1;

export interface RawSourceMap {
  readonly version: 3;
  readonly file: string;
  readonly sourceRoot: string;
  readonly sources: readonly string[];
  readonly names: readonly string[];
  readonly mappings: string;
  readonly sourcesContent?: readonly (string | null)[];
}

export class Generator {
  private readonly pathOptions: ComparePathsOptions;
  private readonly file: string;
  private readonly sourceRoot: string;
  private readonly sourcesDirectoryPath: string;
  private readonly rawSources: string[] = [];
  private readonly sources: string[] = [];
  private readonly sourceToSourceIndexMap = new Map<string, SourceIndex>();
  private readonly sourcesContent: (string | null)[] = [];
  private readonly names: string[] = [];
  private readonly nameToNameIndexMap = new Map<string, NameIndex>();
  private mappings = "";

  private lastGeneratedLine = 0;
  private lastGeneratedCharacter: UTF16Offset = 0;
  private lastSourceIndex: SourceIndex = 0;
  private lastSourceLine = 0;
  private lastSourceCharacter: UTF16Offset = 0;
  private lastNameIndex: NameIndex = 0;
  private hasLast = false;

  private pendingGeneratedLine = 0;
  private pendingGeneratedCharacter: UTF16Offset = 0;
  private pendingSourceIndex: SourceIndex = 0;
  private pendingSourceLine = 0;
  private pendingSourceCharacter: UTF16Offset = 0;
  private pendingNameIndex: NameIndex = 0;
  private hasPending = false;
  private hasPendingSource = false;
  private hasPendingName = false;

  // TS-Go: `func NewGenerator(file, sourceRoot, sourcesDirectoryPath, options)`.
  constructor(
    file: string,
    sourceRoot: string,
    sourcesDirectoryPath: string,
    options: ComparePathsOptions
  ) {
    this.file = file;
    this.sourceRoot = sourceRoot;
    this.sourcesDirectoryPath = sourcesDirectoryPath;
    this.pathOptions = options;
  }

  // TS-Go: `func (gen *Generator) Sources() []string { return gen.rawSources }`.
  // Renamed `getSources` (TS): `sources` would collide with the private field.
  getSources(): readonly string[] {
    return this.rawSources;
  }

  /** Add a source file; returns its index. TS-Go: `Generator.AddSource`. */
  addSource(fileName: string): SourceIndex {
    const source = getRelativePathToDirectoryOrUrl(
      this.sourcesDirectoryPath,
      fileName,
      true,
      this.pathOptions
    );
    let sourceIndex = this.sourceToSourceIndexMap.get(source);
    if (sourceIndex === undefined) {
      sourceIndex = this.sources.length;
      this.sources.push(source);
      this.rawSources.push(fileName);
      this.sourceToSourceIndexMap.set(source, sourceIndex);
    }
    return sourceIndex;
  }

  // TS-Go: `func (gen *Generator) SetSourceContent`.
  setSourceContent(sourceIndex: SourceIndex, content: string): void {
    if (sourceIndex < 0 || sourceIndex >= this.sources.length) {
      throw new Error("sourceIndex is out of range");
    }
    while (this.sourcesContent.length <= sourceIndex) {
      this.sourcesContent.push(null);
    }
    this.sourcesContent[sourceIndex] = content;
  }

  // TS-Go: `func (gen *Generator) AddName`.
  addName(name: string): NameIndex {
    let nameIndex = this.nameToNameIndexMap.get(name);
    if (nameIndex === undefined) {
      nameIndex = this.names.length;
      this.names.push(name);
      this.nameToNameIndexMap.set(name, nameIndex);
    }
    return nameIndex;
  }

  private isNewGeneratedPosition(generatedLine: number, generatedCharacter: UTF16Offset): boolean {
    return !this.hasPending ||
      this.pendingGeneratedLine !== generatedLine ||
      this.pendingGeneratedCharacter !== generatedCharacter;
  }

  private isBacktrackingSourcePosition(sourceIndex: SourceIndex, sourceLine: number, sourceCharacter: UTF16Offset): boolean {
    return sourceIndex !== sourceIndexNotSet &&
      sourceLine !== notSet &&
      sourceCharacter !== notSetUTF16 &&
      this.pendingSourceIndex === sourceIndex &&
      (this.pendingSourceLine > sourceLine ||
        this.pendingSourceLine === sourceLine && this.pendingSourceCharacter > sourceCharacter);
  }

  private shouldCommitMapping(): boolean {
    return this.hasPending && (!this.hasLast ||
      this.lastGeneratedLine !== this.pendingGeneratedLine ||
      this.lastGeneratedCharacter !== this.pendingGeneratedCharacter ||
      this.lastSourceIndex !== this.pendingSourceIndex ||
      this.lastSourceLine !== this.pendingSourceLine ||
      this.lastSourceCharacter !== this.pendingSourceCharacter ||
      this.lastNameIndex !== this.pendingNameIndex);
  }

  // TS-Go: `func (gen *Generator) appendMappingCharCode(charCode rune)`.
  private appendMappingCharCode(charCode: string): void {
    this.mappings += charCode;
  }

  // TS-Go: `func (gen *Generator) appendBase64VLQ(inValue int)`.
  private appendBase64VLQ(inValue: number): void {
    // Add a new least significant bit that has the sign of the value.
    // if negative number the least significant bit that gets added to the number has value 1
    // else least significant bit value that gets added is 0
    // eg. -1 changes to binary : 01 [1] => 3
    //     +1 changes to binary : 01 [0] => 2
    if (inValue < 0) {
      inValue = ((-inValue) << 1) + 1;
    } else {
      inValue = inValue << 1;
    }

    // Encode 5 bits at a time starting from least significant bits
    for (;;) {
      let currentDigit = inValue & 31; // 11111
      inValue = inValue >> 5;
      if (inValue > 0) {
        // There are still more digits to decode, set the msb (6th bit)
        currentDigit = currentDigit | 32;
      }
      this.appendMappingCharCode(base64FormatEncode(currentDigit));
      if (inValue <= 0) {
        break;
      }
    }
  }

  private commitPendingMapping(): void {
    if (!this.shouldCommitMapping()) {
      return;
    }

    // Line/Comma delimiters
    if (this.lastGeneratedLine < this.pendingGeneratedLine) {
      // Emit line delimiters
      for (;;) {
        this.appendMappingCharCode(";");
        this.lastGeneratedLine++;
        if (this.lastGeneratedLine >= this.pendingGeneratedLine) {
          break;
        }
      }
      // Only need to set this once
      this.lastGeneratedCharacter = 0;
    } else {
      if (this.lastGeneratedLine !== this.pendingGeneratedLine) {
        // panic rather than error as an invariant has been violated
        throw new Error("generatedLine cannot backtrack");
      }
      // Emit comma to separate the entry
      if (this.hasLast) {
        this.appendMappingCharCode(",");
      }
    }

    // 1. Relative generated character
    this.appendBase64VLQ(this.pendingGeneratedCharacter - this.lastGeneratedCharacter);
    this.lastGeneratedCharacter = this.pendingGeneratedCharacter;

    if (this.hasPendingSource) {
      // 2. Relative sourceIndex
      this.appendBase64VLQ(this.pendingSourceIndex - this.lastSourceIndex);
      this.lastSourceIndex = this.pendingSourceIndex;

      // 3. Relative source line
      this.appendBase64VLQ(this.pendingSourceLine - this.lastSourceLine);
      this.lastSourceLine = this.pendingSourceLine;

      // 4. Relative source character
      this.appendBase64VLQ(this.pendingSourceCharacter - this.lastSourceCharacter);
      this.lastSourceCharacter = this.pendingSourceCharacter;

      if (this.hasPendingName) {
        // 5. Relative nameIndex
        this.appendBase64VLQ(this.pendingNameIndex - this.lastNameIndex);
        this.lastNameIndex = this.pendingNameIndex;
      }
    }

    this.hasLast = true;
  }

  // TS-Go: `func (gen *Generator) addMapping(...)`.
  private addMapping(generatedLine: number, generatedCharacter: UTF16Offset, sourceIndex: SourceIndex, sourceLine: number, sourceCharacter: UTF16Offset, nameIndex: NameIndex): void {
    if (
      this.isNewGeneratedPosition(generatedLine, generatedCharacter) ||
      this.isBacktrackingSourcePosition(sourceIndex, sourceLine, sourceCharacter)
    ) {
      this.commitPendingMapping();
      this.pendingGeneratedLine = generatedLine;
      this.pendingGeneratedCharacter = generatedCharacter;
      this.hasPendingSource = false;
      this.hasPendingName = false;
      this.hasPending = true;
    }

    if (sourceIndex !== sourceIndexNotSet && sourceLine !== notSet && sourceCharacter !== notSetUTF16) {
      this.pendingSourceIndex = sourceIndex;
      this.pendingSourceLine = sourceLine;
      this.pendingSourceCharacter = sourceCharacter;
      this.hasPendingSource = true;
      if (nameIndex !== nameIndexNotSet) {
        this.pendingNameIndex = nameIndex;
        this.hasPendingName = true;
      }
    }
  }

  /** Adds a mapping without source information. TS-Go: `Generator.AddGeneratedMapping`. */
  addGeneratedMapping(generatedLine: number, generatedCharacter: UTF16Offset): void {
    if (generatedLine < this.pendingGeneratedLine) {
      throw new Error("generatedLine cannot backtrack");
    }
    if (generatedCharacter < 0) {
      throw new Error("generatedCharacter cannot be negative");
    }
    this.addMapping(generatedLine, generatedCharacter, sourceIndexNotSet, notSet /*sourceLine*/, notSetUTF16 /*sourceCharacter*/, nameIndexNotSet);
  }

  /** Adds a mapping with source information. TS-Go: `Generator.AddSourceMapping`. */
  addSourceMapping(generatedLine: number, generatedCharacter: UTF16Offset, sourceIndex: SourceIndex, sourceLine: number, sourceCharacter: UTF16Offset): void {
    if (generatedLine < this.pendingGeneratedLine) {
      throw new Error("generatedLine cannot backtrack");
    }
    if (generatedCharacter < 0) {
      throw new Error("generatedCharacter cannot be negative");
    }
    if (sourceIndex < 0 || sourceIndex >= this.sources.length) {
      throw new Error("sourceIndex is out of range");
    }
    if (sourceLine < 0) {
      throw new Error("sourceLine cannot be negative");
    }
    if (sourceCharacter < 0) {
      throw new Error("sourceCharacter cannot be negative");
    }
    this.addMapping(generatedLine, generatedCharacter, sourceIndex, sourceLine, sourceCharacter, nameIndexNotSet);
  }

  /** Adds a mapping with source and name information. TS-Go: `Generator.AddNamedSourceMapping`. */
  addNamedSourceMapping(generatedLine: number, generatedCharacter: UTF16Offset, sourceIndex: SourceIndex, sourceLine: number, sourceCharacter: UTF16Offset, nameIndex: NameIndex): void {
    if (generatedLine < this.pendingGeneratedLine) {
      throw new Error("generatedLine cannot backtrack");
    }
    if (generatedCharacter < 0) {
      throw new Error("generatedCharacter cannot be negative");
    }
    if (sourceIndex < 0 || sourceIndex >= this.sources.length) {
      throw new Error("sourceIndex is out of range");
    }
    if (sourceLine < 0) {
      throw new Error("sourceLine cannot be negative");
    }
    if (sourceCharacter < 0) {
      throw new Error("sourceCharacter cannot be negative");
    }
    if (nameIndex < 0 || nameIndex >= this.names.length) {
      throw new Error("nameIndex is out of range");
    }
    this.addMapping(generatedLine, generatedCharacter, sourceIndex, sourceLine, sourceCharacter, nameIndex);
  }

  /** Gets the source map as a `RawSourceMap` object. TS-Go: `Generator.RawSourceMap`. */
  rawSourceMap(): RawSourceMap {
    this.commitPendingMapping();
    const sources = [...this.sources];
    const names = [...this.names];
    return {
      version: 3,
      file: this.file,
      sourceRoot: this.sourceRoot,
      sources,
      names,
      mappings: this.mappings,
      ...(this.sourcesContent.length > 0 ? { sourcesContent: [...this.sourcesContent] } : {}),
    };
  }

  // TS-Go: `func (gen *Generator) bytes() []byte`.
  private bytes(): string {
    return marshal(rawSourceMapJson(this.rawSourceMap()));
  }

  /** Gets the string representation of the source map. TS-Go: `Generator.String`. */
  toString(): string {
    return this.bytes();
  }

  // TS-Go: `func (gen *Generator) Base64DataURL() string`.
  base64DataURL(): string {
    const prefix = "data:application/json;base64,";
    const data = this.bytes();
    const base64 = Buffer.from(data, "utf8").toString("base64");
    return prefix + base64;
  }

  /** TS-friendly alias for {@link base64DataURL}. */
  toBase64DataURL(): string {
    return this.base64DataURL();
  }
}

/**
 * Constructs a {@link Generator}. Port of TS-Go `func NewGenerator(file,
 * sourceRoot, sourcesDirectoryPath, options) *Generator`.
 */
export function newGenerator(file: string, sourceRoot: string, sourcesDirectoryPath: string, options: ComparePathsOptions): Generator {
  return new Generator(file, sourceRoot, sourcesDirectoryPath, options);
}

function rawSourceMapJson(sourceMap: RawSourceMap): JsonValue {
  const result: { [key: string]: JsonValue } = {
    version: sourceMap.version,
    file: sourceMap.file,
    sourceRoot: sourceMap.sourceRoot,
    sources: sourceMap.sources,
    names: sourceMap.names,
    mappings: sourceMap.mappings,
  };
  if (sourceMap.sourcesContent !== undefined) {
    result["sourcesContent"] = sourceMap.sourcesContent;
  }
  return result;
}

// TS-Go: `func base64FormatEncode(value int) rune`.
function base64FormatEncode(value: number): string {
  switch (true) {
    case value >= 0 && value < 26:
      return String.fromCharCode(/* 'A' */ 0x41 + value);
    case value >= 26 && value < 52:
      return String.fromCharCode(/* 'a' */ 0x61 + value - 26);
    case value >= 52 && value < 62:
      return String.fromCharCode(/* '0' */ 0x30 + value - 52);
    case value === 62:
      return "+";
    case value === 63:
      return "/";
    default:
      throw new Error("not a base64 value");
  }
}

const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 * Encode a single integer as Base64 VLQ per Source Map V3.
 * https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit
 *
 * Free-function form of `Generator.appendBase64VLQ` that returns the encoded
 * string rather than appending to the in-progress builder. Retained for direct
 * callers/tests; the Generator itself uses `appendBase64VLQ`.
 */
export function encodeVLQ(value: number): string {
  // Sign-flag the LSB
  let v = value < 0 ? ((-value) << 1) + 1 : value << 1;

  let out = "";
  do {
    let digit = v & 31;
    v >>>= 5;
    if (v > 0) digit |= 32;
    out += BASE64_CHARS[digit];
  } while (v > 0);
  return out;
}
