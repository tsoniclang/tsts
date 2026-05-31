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
import type { JsonValue } from "../json/index.js";

export type SourceIndex = number & { readonly __sourceIndex: unique symbol };
export type NameIndex = number & { readonly __nameIndex: unique symbol };

const SOURCE_INDEX_NOT_SET = -1 as unknown as SourceIndex;
const NAME_INDEX_NOT_SET = -1 as unknown as NameIndex;
const NOT_SET = -1;

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
  private readonly sourceToIndex = new Map<string, SourceIndex>();
  private readonly sourcesContent: (string | null)[] = [];
  private readonly names: string[] = [];
  private readonly nameToIndex = new Map<string, NameIndex>();
  private mappings = "";

  private lastGeneratedLine = 0;
  private lastGeneratedCharacter = 0;
  private lastSourceIndex: SourceIndex = 0 as SourceIndex;
  private lastSourceLine = 0;
  private lastSourceCharacter = 0;
  private lastNameIndex: NameIndex = 0 as NameIndex;
  private hasLast = false;

  private pendingGeneratedLine = 0;
  private pendingGeneratedCharacter = 0;
  private pendingSourceIndex: SourceIndex = 0 as SourceIndex;
  private pendingSourceLine = 0;
  private pendingSourceCharacter = 0;
  private pendingNameIndex: NameIndex = 0 as NameIndex;
  private hasPending = false;
  private hasPendingSource = false;
  private hasPendingName = false;

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

  getSources(): readonly string[] {
    return this.rawSources;
  }

  /** Add a source file; returns its index. */
  addSource(fileName: string): SourceIndex {
    const source = getRelativePathToDirectoryOrUrl(
      this.sourcesDirectoryPath,
      fileName,
      true,
      this.pathOptions
    );
    let sourceIndex = this.sourceToIndex.get(source);
    if (sourceIndex === undefined) {
      sourceIndex = this.sources.length as SourceIndex;
      this.sources.push(source);
      this.rawSources.push(fileName);
      this.sourceToIndex.set(source, sourceIndex);
    }
    return sourceIndex;
  }

  setSourceContent(sourceIndex: SourceIndex, content: string): void {
    if (sourceIndex < 0 || sourceIndex >= this.sources.length) {
      throw new Error("sourceIndex is out of range");
    }
    while (this.sourcesContent.length <= sourceIndex) {
      this.sourcesContent.push(null);
    }
    this.sourcesContent[sourceIndex] = content;
  }

  addName(name: string): NameIndex {
    let nameIndex = this.nameToIndex.get(name);
    if (nameIndex === undefined) {
      nameIndex = this.names.length as NameIndex;
      this.names.push(name);
      this.nameToIndex.set(name, nameIndex);
    }
    return nameIndex;
  }

  /** Add a mapping with no source info (filler entry). */
  addGeneratedMapping(generatedLine: number, generatedCharacter: number): void {
    if (generatedLine < this.pendingGeneratedLine) {
      throw new Error("generatedLine cannot backtrack");
    }
    if (generatedCharacter < 0) {
      throw new Error("generatedCharacter cannot be negative");
    }
    this.addMapping(
      generatedLine,
      generatedCharacter,
      SOURCE_INDEX_NOT_SET,
      NOT_SET,
      NOT_SET,
      NAME_INDEX_NOT_SET
    );
  }

  /** Add a mapping with source info. */
  addSourceMapping(
    generatedLine: number,
    generatedCharacter: number,
    sourceIndex: SourceIndex,
    sourceLine: number,
    sourceCharacter: number
  ): void {
    if (generatedLine < this.pendingGeneratedLine) {
      throw new Error("generatedLine cannot backtrack");
    }
    if (generatedCharacter < 0) throw new Error("generatedCharacter cannot be negative");
    if (sourceIndex < 0 || sourceIndex >= this.sources.length) {
      throw new Error("sourceIndex is out of range");
    }
    if (sourceLine < 0) throw new Error("sourceLine cannot be negative");
    if (sourceCharacter < 0) throw new Error("sourceCharacter cannot be negative");
    this.addMapping(generatedLine, generatedCharacter, sourceIndex, sourceLine, sourceCharacter, NAME_INDEX_NOT_SET);
  }

  /** Add a mapping with both source and name info. */
  addNamedSourceMapping(
    generatedLine: number,
    generatedCharacter: number,
    sourceIndex: SourceIndex,
    sourceLine: number,
    sourceCharacter: number,
    nameIndex: NameIndex
  ): void {
    if (generatedLine < this.pendingGeneratedLine) {
      throw new Error("generatedLine cannot backtrack");
    }
    if (generatedCharacter < 0) throw new Error("generatedCharacter cannot be negative");
    if (sourceIndex < 0 || sourceIndex >= this.sources.length) {
      throw new Error("sourceIndex is out of range");
    }
    if (sourceLine < 0) throw new Error("sourceLine cannot be negative");
    if (sourceCharacter < 0) throw new Error("sourceCharacter cannot be negative");
    if (nameIndex < 0 || nameIndex >= this.names.length) {
      throw new Error("nameIndex is out of range");
    }
    this.addMapping(generatedLine, generatedCharacter, sourceIndex, sourceLine, sourceCharacter, nameIndex);
  }

  private addMapping(
    generatedLine: number,
    generatedCharacter: number,
    sourceIndex: SourceIndex,
    sourceLine: number,
    sourceCharacter: number,
    nameIndex: NameIndex
  ): void {
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
    if (sourceIndex !== SOURCE_INDEX_NOT_SET && sourceLine !== NOT_SET && sourceCharacter !== NOT_SET) {
      this.pendingSourceIndex = sourceIndex;
      this.pendingSourceLine = sourceLine;
      this.pendingSourceCharacter = sourceCharacter;
      this.hasPendingSource = true;
      if (nameIndex !== NAME_INDEX_NOT_SET) {
        this.pendingNameIndex = nameIndex;
        this.hasPendingName = true;
      }
    }
  }

  private isNewGeneratedPosition(generatedLine: number, generatedCharacter: number): boolean {
    return (
      !this.hasPending ||
      this.pendingGeneratedLine !== generatedLine ||
      this.pendingGeneratedCharacter !== generatedCharacter
    );
  }

  private isBacktrackingSourcePosition(sourceIndex: SourceIndex, sourceLine: number, sourceCharacter: number): boolean {
    return (
      sourceIndex !== SOURCE_INDEX_NOT_SET &&
      sourceLine !== NOT_SET &&
      sourceCharacter !== NOT_SET &&
      this.pendingSourceIndex === sourceIndex &&
      (this.pendingSourceLine > sourceLine ||
        (this.pendingSourceLine === sourceLine && this.pendingSourceCharacter > sourceCharacter))
    );
  }

  private shouldCommitMapping(): boolean {
    return (
      this.hasPending &&
      (!this.hasLast ||
        this.lastGeneratedLine !== this.pendingGeneratedLine ||
        this.lastGeneratedCharacter !== this.pendingGeneratedCharacter ||
        this.lastSourceIndex !== this.pendingSourceIndex ||
        this.lastSourceLine !== this.pendingSourceLine ||
        this.lastSourceCharacter !== this.pendingSourceCharacter ||
        this.lastNameIndex !== this.pendingNameIndex)
    );
  }

  private commitPendingMapping(): void {
    if (!this.shouldCommitMapping()) return;

    if (this.lastGeneratedLine < this.pendingGeneratedLine) {
      while (this.lastGeneratedLine < this.pendingGeneratedLine) {
        this.mappings += ";";
        this.lastGeneratedLine += 1;
      }
      this.lastGeneratedCharacter = 0;
    } else {
      if (this.lastGeneratedLine !== this.pendingGeneratedLine) {
        throw new Error("generatedLine cannot backtrack");
      }
      if (this.hasLast) this.mappings += ",";
    }

    // 1. Relative generated character
    this.mappings += encodeVLQ(this.pendingGeneratedCharacter - this.lastGeneratedCharacter);
    this.lastGeneratedCharacter = this.pendingGeneratedCharacter;

    if (this.hasPendingSource) {
      // 2. Relative sourceIndex
      this.mappings += encodeVLQ(this.pendingSourceIndex - this.lastSourceIndex);
      this.lastSourceIndex = this.pendingSourceIndex;

      // 3. Relative source line
      this.mappings += encodeVLQ(this.pendingSourceLine - this.lastSourceLine);
      this.lastSourceLine = this.pendingSourceLine;

      // 4. Relative source character
      this.mappings += encodeVLQ(this.pendingSourceCharacter - this.lastSourceCharacter);
      this.lastSourceCharacter = this.pendingSourceCharacter;

      if (this.hasPendingName) {
        // 5. Relative nameIndex
        this.mappings += encodeVLQ(this.pendingNameIndex - this.lastNameIndex);
        this.lastNameIndex = this.pendingNameIndex;
      }
    }

    this.hasLast = true;
  }

  rawSourceMap(): RawSourceMap {
    this.commitPendingMapping();
    return {
      version: 3,
      file: this.file,
      sourceRoot: this.sourceRoot,
      sources: [...this.sources],
      names: [...this.names],
      mappings: this.mappings,
      ...(this.sourcesContent.length > 0 ? { sourcesContent: [...this.sourcesContent] } : {}),
    };
  }

  toString(): string {
    return JSON.stringify(rawSourceMapJson(this.rawSourceMap()));
  }

  toBase64DataURL(): string {
    const json = this.toString();
    const base64 = uint8ArrayToBase64(new TextEncoder().encode(json));
    return "data:application/json;base64," + base64;
  }
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

function uint8ArrayToBase64(data: Uint8Array): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let out = "";
  for (let index = 0; index < data.length; index += 3) {
    const byte1 = data[index]!;
    const byte2 = index + 1 < data.length ? data[index + 1]! : 0;
    const byte3 = index + 2 < data.length ? data[index + 2]! : 0;
    const triple = (byte1 << 16) | (byte2 << 8) | byte3;
    out += chars[(triple >> 18) & 63];
    out += chars[(triple >> 12) & 63];
    out += index + 1 < data.length ? chars[(triple >> 6) & 63] : "=";
    out += index + 2 < data.length ? chars[triple & 63] : "=";
  }
  return out;
}

const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 * Encode a single integer as Base64 VLQ per Source Map V3.
 * https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit
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
