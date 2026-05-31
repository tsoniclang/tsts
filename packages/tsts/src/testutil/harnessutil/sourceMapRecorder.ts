import { computeECMALineStarts, type TextPos } from "../../core/index.js";
import { marshal } from "../../json/index.js";
import { computePositionOfLineAndUTF16Character } from "../../scanner/index.js";
import { decodeMappings, isSourceMapping, mappingsEqual, MissingName, type Mapping } from "../../sourcemap/decoder.js";
import { type RawSourceMap } from "../../sourcemap/generator.js";
import { createECMALineInfo } from "../../sourcemap/lineInfo.js";
import { tryGetSourceMappingURL } from "../../sourcemap/util.js";
import { removeByteOrderMark } from "../../stringutil/util.js";

export interface SourceMapRecord {
  readonly generatedFile: string;
  readonly sourceMap: string;
}

export interface TestFile {
  readonly unitName: string;
  readonly content: string;
}

export class WriterAggregator {
  private text = "";

  writeString(value: string): void {
    this.text += value;
  }

  writeStringf(format: string, ...args: readonly unknown[]): void {
    this.writeString(formatMessage(format, args));
  }

  writeLine(value: string): void {
    this.writeString(value);
    this.writeString("\r\n");
  }

  writeLinef(format: string, ...args: readonly unknown[]): void {
    this.writeLine(formatMessage(format, args));
  }

  toString(): string {
    return this.text;
  }
}

export class SourceMapRecorder {
  private readonly records: SourceMapRecord[] = [];

  record(generatedFile: string, sourceMap: string): void {
    this.records.push({ generatedFile, sourceMap });
  }

  all(): readonly SourceMapRecord[] {
    return [...this.records];
  }

  toBaseline(): string {
    return this.records
      .map((record) => `//// ${record.generatedFile}\n${record.sourceMap}`)
      .join("\n\n");
  }
}

interface SourceMapSpanWithDecodeErrors {
  readonly sourceMapSpan: Mapping;
  readonly decodeErrors: readonly string[];
}

interface DecodedMapping {
  readonly sourceMapSpan: Mapping;
  readonly error: string | undefined;
}

class SourceMapDecoder {
  private readonly mappings;

  constructor(private readonly sourceMapMappings: string) {
    this.mappings = decodeMappings(sourceMapMappings);
  }

  decodeNextEncodedSourceMapSpan(): DecodedMapping {
    const value = this.mappings.next();
    if (value.done) {
      return {
        error: this.mappings.getError() ?? "No encoded entry found",
        sourceMapSpan: this.mappings.state(),
      };
    }
    return { sourceMapSpan: value.value, error: undefined };
  }

  hasCompletedDecoding(): boolean {
    return this.mappings.getPos() === this.sourceMapMappings.length;
  }

  getRemainingDecodeString(): string {
    return this.sourceMapMappings.slice(this.mappings.getPos());
  }
}

export class SourceMapSpanWriter {
  private readonly sourceMapSources: readonly string[];
  private readonly sourceMapNames: readonly string[];
  readonly jsLineMap: readonly TextPos[];
  tsCode = "";
  tsLineMap: readonly TextPos[] = [];
  spansOnSingleLine: SourceMapSpanWithDecodeErrors[] = [];
  prevWrittenSourcePos = 0;
  private nextJsLineToWrite = 0;
  spanMarkerContinues = false;
  private readonly sourceMapDecoder: SourceMapDecoder;

  constructor(
    readonly sourceMapRecorder: WriterAggregator,
    sourceMap: RawSourceMap,
    readonly jsFile: TestFile,
  ) {
    this.sourceMapSources = sourceMap.sources;
    this.sourceMapNames = sourceMap.names;
    this.jsLineMap = computeECMALineStarts(jsFile.content);
    this.sourceMapDecoder = new SourceMapDecoder(sourceMap.mappings);

    sourceMapRecorder.writeLine("===================================================================");
    sourceMapRecorder.writeLinef("JsFile: %s", sourceMap.file);
    sourceMapRecorder.writeLinef("mapUrl: %s", tryGetSourceMappingURL(createECMALineInfo(jsFile.content, this.jsLineMap)));
    sourceMapRecorder.writeLinef("sourceRoot: %s", sourceMap.sourceRoot);
    sourceMapRecorder.writeLinef("sources: %s", sourceMap.sources.join(","));
    if (sourceMap.sourcesContent !== undefined && sourceMap.sourcesContent.length > 0) {
      sourceMapRecorder.writeLinef("sourcesContent: %s", marshal(sourceMap.sourcesContent));
    }
    sourceMapRecorder.writeLine("===================================================================");
  }

  getSourceMapSpanString(mapEntry: Mapping, getAbsentNameIndex: boolean): string {
    const mapString = new WriterAggregator();
    mapString.writeStringf("Emitted(%d, %d)", mapEntry.generatedLine + 1, mapEntry.generatedCharacter + 1);
    if (isSourceMapping(mapEntry)) {
      mapString.writeStringf(" Source(%d, %d) + SourceIndex(%d)", mapEntry.sourceLine + 1, mapEntry.sourceCharacter + 1, mapEntry.sourceIndex);
      if (mapEntry.nameIndex >= 0 && mapEntry.nameIndex < this.sourceMapNames.length) {
        mapString.writeStringf(" name (%s)", this.sourceMapNames[mapEntry.nameIndex]!);
      } else if (mapEntry.nameIndex !== MissingName || getAbsentNameIndex) {
        mapString.writeStringf(" nameIndex (%d)", mapEntry.nameIndex);
      }
    }
    return mapString.toString();
  }

  recordSourceMapSpan(sourceMapSpan: Mapping): void {
    const decodeResult = this.sourceMapDecoder.decodeNextEncodedSourceMapSpan();
    const decodeErrors: string[] = [];
    if (decodeResult.error !== undefined || !mappingsEqual(decodeResult.sourceMapSpan, sourceMapSpan)) {
      if (decodeResult.error !== undefined) {
        decodeErrors.push(`!!^^ !!^^ There was decoding error in the sourcemap at this location: ${decodeResult.error}`);
      } else {
        decodeErrors.push("!!^^ !!^^ The decoded span from sourcemap's mapping entry does not match what was encoded for this span:");
      }
      decodeErrors.push(
        "!!^^ !!^^ Decoded span from sourcemap's mappings entry: " +
        this.getSourceMapSpanString(decodeResult.sourceMapSpan, true) +
        " Span encoded by the emitter:" +
        this.getSourceMapSpanString(sourceMapSpan, true),
      );
    }

    if (this.spansOnSingleLine.length > 0 && this.spansOnSingleLine[0]!.sourceMapSpan.generatedLine !== sourceMapSpan.generatedLine) {
      this.writeRecordedSpans();
      this.spansOnSingleLine = [];
    }
    this.spansOnSingleLine.push({ sourceMapSpan, decodeErrors });
  }

  recordNewSourceFileSpan(sourceMapSpan: Mapping, newSourceFileCode: string): void {
    let continuesLine = false;
    if (this.spansOnSingleLine.length > 0 && this.spansOnSingleLine[0]!.sourceMapSpan.generatedCharacter === sourceMapSpan.generatedLine) {
      this.writeRecordedSpans();
      this.spansOnSingleLine = [];
      this.nextJsLineToWrite--;
      continuesLine = true;
    }

    this.recordSourceMapSpan(sourceMapSpan);
    if (this.spansOnSingleLine.length !== 1) throw new Error("expected a single span");

    this.sourceMapRecorder.writeLine("-------------------------------------------------------------------");
    if (continuesLine) this.sourceMapRecorder.writeLinef("emittedFile:%s (%d, %d)", this.jsFile.unitName, sourceMapSpan.generatedLine + 1, sourceMapSpan.generatedCharacter + 1);
    else this.sourceMapRecorder.writeLinef("emittedFile:%s", this.jsFile.unitName);
    this.sourceMapRecorder.writeLinef("sourceFile:%s", this.sourceMapSources[this.spansOnSingleLine[0]!.sourceMapSpan.sourceIndex]);
    this.sourceMapRecorder.writeLine("-------------------------------------------------------------------");

    this.tsLineMap = computeECMALineStarts(newSourceFileCode);
    this.tsCode = newSourceFileCode;
    this.prevWrittenSourcePos = 0;
  }

  close(): void {
    this.writeRecordedSpans();
    if (!this.sourceMapDecoder.hasCompletedDecoding()) {
      this.sourceMapRecorder.writeLine("!!!! **** There are more source map entries in the sourceMap's mapping than what was encoded");
      this.sourceMapRecorder.writeLinef("!!!! **** Remaining decoded string: %s", this.sourceMapDecoder.getRemainingDecodeString());
    }
    this.writeJsFileLines(this.jsLineMap.length);
  }

  getTextOfLine(line: number, lineMap: readonly TextPos[], code: string): string {
    const startPos = lineMap[line] as number;
    const endPos = line + 1 < lineMap.length ? lineMap[line + 1] as number : code.length;
    const text = code.slice(startPos, endPos);
    return line === 0 ? removeByteOrderMark(text) : text;
  }

  writeJsFileLines(endJsLine: number): void {
    for (; this.nextJsLineToWrite < endJsLine; this.nextJsLineToWrite++) {
      this.sourceMapRecorder.writeStringf(">>>%s", this.getTextOfLine(this.nextJsLineToWrite, this.jsLineMap, this.jsFile.content));
    }
  }

  writeRecordedSpans(): void {
    new RecordedSpanWriter(this).writeRecordedSpans();
  }
}

class RecordedSpanWriter {
  private readonly markerIds: string[] = [];
  private prevEmittedCol = 0;

  constructor(private readonly writer: SourceMapSpanWriter) {}

  writeRecordedSpans(): void {
    const spans = this.getSpans();
    if (spans.length === 0) return;
    const currentJsLine = spans[0]!.sourceMapSpan.generatedLine;
    this.writer.writeJsFileLines(currentJsLine + 1);

    this.iterateSpans((currentSpan, index) => this.writeSourceMapMarker(currentSpan, index));

    const jsFileText = this.writer.getTextOfLine(currentJsLine + 1, this.getJsLineMap(), this.getJsFileContent());
    if (this.prevEmittedCol < jsFileText.length - 1) {
      this.writeSourceMapMarkerEx(spans[spans.length - 1]!, spans.length, jsFileText.length - 1, true);
    }

    this.iterateSpans((currentSpan, index) => this.writeSourceMapSourceText(currentSpan, index));
    this.iterateSpans((currentSpan, index) => this.writeSpanDetails(currentSpan, index));
    this.getRecorder().writeLine("---");
    this.clearSpans();
  }

  private getMarkerId(markerIndex: number): string {
    if (this.getSpanMarkerContinues()) {
      if (markerIndex !== 0) throw new Error("expected markerIndex to be 0");
      return "1->";
    }
    let markerId = String(markerIndex + 1);
    if (markerId.length < 2) markerId += " ";
    return `${markerId}>`;
  }

  private iterateSpans(fn: (currentSpan: SourceMapSpanWithDecodeErrors, index: number) => void): void {
    this.prevEmittedCol = 0;
    const spans = this.getSpans();
    for (let index = 0; index < spans.length; index++) {
      fn(spans[index]!, index);
      this.prevEmittedCol = spans[index]!.sourceMapSpan.generatedCharacter;
    }
  }

  private writeSourceMapIndent(indentLength: number, indentPrefix: string): void {
    this.getRecorder().writeString(indentPrefix);
    for (let index = 0; index < indentLength; index++) this.getRecorder().writeString(" ");
  }

  private writeSourceMapMarker(currentSpan: SourceMapSpanWithDecodeErrors, index: number): void {
    this.writeSourceMapMarkerEx(currentSpan, index, currentSpan.sourceMapSpan.generatedCharacter, false);
  }

  private writeSourceMapMarkerEx(currentSpan: SourceMapSpanWithDecodeErrors, index: number, endColumn: number, endContinues: boolean): void {
    void currentSpan;
    const markerId = this.getMarkerId(index);
    this.markerIds.push(markerId);
    this.writeSourceMapIndent(this.prevEmittedCol, markerId);
    for (let col = this.prevEmittedCol; col < endColumn; col++) this.getRecorder().writeString("^");
    if (endContinues) this.getRecorder().writeString("->");
    this.getRecorder().writeLine("");
    this.setSpanMarkerContinues(endContinues);
  }

  private writeSourceMapSourceText(currentSpan: SourceMapSpanWithDecodeErrors, index: number): void {
    const sourcePos = computePositionOfLineAndUTF16Character(
      this.getTsLineMap(),
      currentSpan.sourceMapSpan.sourceLine,
      currentSpan.sourceMapSpan.sourceCharacter,
      this.getTsCode(),
      true,
    );
    const previousSourcePos = this.getPrevWrittenSourcePos();
    const sourceText = previousSourcePos < sourcePos ? this.getTsCode().slice(previousSourcePos, sourcePos) : "";

    for (const decodeError of currentSpan.decodeErrors) {
      this.writeSourceMapIndent(this.prevEmittedCol, this.markerIds[index]!);
      this.getRecorder().writeLine(decodeError);
    }

    const sourceLineMap = computeECMALineStarts(sourceText);
    for (let line = 0; line < sourceLineMap.length; line++) {
      this.writeSourceMapIndent(this.prevEmittedCol, line === 0 ? this.markerIds[index]! : "  >");
      this.getRecorder().writeString(this.writer.getTextOfLine(line, sourceLineMap, sourceText));
      if (line === sourceLineMap.length - 1) this.getRecorder().writeLine("");
    }
    this.setPrevWrittenSourcePos(sourcePos);
  }

  private writeSpanDetails(currentSpan: SourceMapSpanWithDecodeErrors, index: number): void {
    this.getRecorder().writeLinef("%s%s", this.markerIds[index], this.writer.getSourceMapSpanString(currentSpan.sourceMapSpan, false));
  }

  private getRecorder(): WriterAggregator {
    return this.writer.sourceMapRecorder;
  }

  private getSpans(): SourceMapSpanWithDecodeErrors[] {
    return this.writer.spansOnSingleLine;
  }

  private clearSpans(): void {
    this.writer.spansOnSingleLine = [];
  }

  private getJsLineMap(): readonly TextPos[] {
    return this.writer.jsLineMap;
  }

  private getJsFileContent(): string {
    return this.writer.jsFile.content;
  }

  private getTsLineMap(): readonly TextPos[] {
    return this.writer.tsLineMap;
  }

  private getTsCode(): string {
    return this.writer.tsCode;
  }

  private getPrevWrittenSourcePos(): number {
    return this.writer.prevWrittenSourcePos;
  }

  private setPrevWrittenSourcePos(pos: number): void {
    this.writer.prevWrittenSourcePos = pos;
  }

  private getSpanMarkerContinues(): boolean {
    return this.writer.spanMarkerContinues;
  }

  private setSpanMarkerContinues(value: boolean): void {
    this.writer.spanMarkerContinues = value;
  }
}

export function newSourceMapSpanWriter(sourceMapRecorder: WriterAggregator, sourceMap: RawSourceMap, jsFile: TestFile): SourceMapSpanWriter {
  return new SourceMapSpanWriter(sourceMapRecorder, sourceMap, jsFile);
}

function formatMessage(format: string, args: readonly unknown[]): string {
  let argIndex = 0;
  return format.replace(/%[sdv]/g, () => String(args[argIndex++]));
}
