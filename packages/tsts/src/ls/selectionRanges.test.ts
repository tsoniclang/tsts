import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { TextRange } from "../core/index.js";
import { parseSourceFile } from "../parser/index.js";
import type { Position, Range } from "../lsp/lsproto/index.js";
import {
  getSmartSelectionRange,
  provideSelectionRanges,
  type SelectionRangeLanguageService,
} from "./selectionRanges.js";
import type { SourceFile } from "../ast/index.js";

class SelectionConverters {
  readonly lineStarts: readonly number[];

  constructor(text: string) {
    const starts: number[] = [0];
    for (let index = 0; index < text.length; index += 1) {
      if (text[index] === "\n") starts.push(index + 1);
    }
    this.lineStarts = starts;
  }

  lineAndCharacterToPosition(_file: SourceFile, position: Position): number {
    return (this.lineStarts[position.line] ?? 0) + position.character;
  }

  positionToLineAndCharacter(_file: SourceFile, position: number): Position {
    let line = 0;
    for (let index = 0; index < this.lineStarts.length; index += 1) {
      if (this.lineStarts[index]! <= position) line = index;
    }
    return { line, character: position - this.lineStarts[line]! };
  }

  toLSPRange(file: SourceFile, range: TextRange): Range {
    return {
      start: this.positionToLineAndCharacter(file, range.pos),
      end: this.positionToLineAndCharacter(file, range.end),
    };
  }
}

class SelectionService implements SelectionRangeLanguageService {
  readonly file: SourceFile;
  readonly converters: SelectionConverters;

  constructor(text: string) {
    this.file = parseSourceFile(text);
    this.converters = new SelectionConverters(text);
  }

  getProgramAndFile(_uri: string): readonly [unknown, SourceFile] {
    return [{}, this.file];
  }
}

class MissingFileSelectionService implements SelectionRangeLanguageService {
  readonly converters = new SelectionConverters("");

  getProgramAndFile(_uri: string): readonly [unknown, undefined] {
    return [{}, undefined];
  }
}

function flattenRanges(range: ReturnType<typeof getSmartSelectionRange>): readonly Range[] {
  const ranges: Range[] = [];
  let current = range;
  while (current !== undefined) {
    ranges.push(current.range);
    current = current.parent;
  }
  return ranges;
}

function rangeText(file: SourceFile, range: Range, converters: SelectionConverters): string {
  const start = converters.lineAndCharacterToPosition(file, range.start);
  const end = converters.lineAndCharacterToPosition(file, range.end);
  return file.text.slice(start, end);
}

export class SelectionRangeTests {
  returns_empty_response_when_source_file_is_missing(): void {
    const service = new MissingFileSelectionService();

    const response = provideSelectionRanges(service, {
      textDocument: { uri: "file:///missing.ts" },
      positions: [{ line: 0, character: 0 }],
    });

    Assert.Equal(undefined, response.selectionRanges);
  }

  returns_selection_ranges_for_each_requested_position(): void {
    const service = new SelectionService("const first = 1;\nconst second = 2;");

    const response = provideSelectionRanges(service, {
      textDocument: { uri: "file:///input.ts" },
      positions: [
        { line: 0, character: 6 },
        { line: 1, character: 6 },
      ],
    });

    Assert.Equal(2, response.selectionRanges?.length);
  }

  adds_inner_and_outer_string_literal_ranges(): void {
    const service = new SelectionService("const value = \"hello\";");
    const position = service.file.text.indexOf("ell");

    const ranges = flattenRanges(getSmartSelectionRange(service, service.file, position));
    const texts = ranges.map((range) => rangeText(service.file, range, service.converters));

    Assert.True(texts.includes("hello"));
    Assert.True(texts.includes("\"hello\""));
  }

  adds_comment_range_and_comment_text_range(): void {
    const service = new SelectionService("const value = 1; // trailing\nconst next = 2;");
    const position = service.file.text.indexOf("trail");

    const ranges = flattenRanges(getSmartSelectionRange(service, service.file, position));
    const texts = ranges.map((range) => rangeText(service.file, range, service.converters));

    Assert.True(texts.includes("// trailing"));
    Assert.True(texts.includes(" trailing"));
  }

  skips_single_variable_declaration_inside_variable_statement(): void {
    const service = new SelectionService("const value = 1;");
    const position = service.file.text.indexOf("value");

    const ranges = flattenRanges(getSmartSelectionRange(service, service.file, position));
    const texts = ranges.map((range) => rangeText(service.file, range, service.converters));

    Assert.False(texts.includes("value = 1"));
    Assert.True(texts.includes("const value = 1;"));
  }

  adds_argument_list_range_before_identifier_range(): void {
    const service = new SelectionService("call(first, second);");
    const position = service.file.text.indexOf("second");

    const ranges = flattenRanges(getSmartSelectionRange(service, service.file, position));
    const texts = ranges.map((range) => rangeText(service.file, range, service.converters));

    Assert.True(texts.includes("first, second"));
    Assert.True(texts.includes("second"));
  }

  keeps_multiline_function_body_range_even_while_skipping_block_nodes(): void {
    const service = new SelectionService("function fn() {\n  return 1;\n}");
    const position = service.file.text.indexOf("return");

    const ranges = flattenRanges(getSmartSelectionRange(service, service.file, position));
    const texts = ranges.map((range) => rangeText(service.file, range, service.converters));

    Assert.True(texts.includes("{\n  return 1;\n}"));
    Assert.True(texts.includes("return 1;"));
  }

  synthesizes_template_expression_placeholder_range(): void {
    const service = new SelectionService("const text = `a ${value} b`;");
    const position = service.file.text.indexOf("value");

    const ranges = flattenRanges(getSmartSelectionRange(service, service.file, position));
    const texts = ranges.map((range) => rangeText(service.file, range, service.converters));

    Assert.True(texts.includes("${value}"));
    Assert.True(texts.includes("value"));
  }
}

A<SelectionRangeTests>().method((t) => t.returns_empty_response_when_source_file_is_missing).add(FactAttribute);
A<SelectionRangeTests>().method((t) => t.returns_selection_ranges_for_each_requested_position).add(FactAttribute);
A<SelectionRangeTests>().method((t) => t.adds_inner_and_outer_string_literal_ranges).add(FactAttribute);
A<SelectionRangeTests>().method((t) => t.adds_comment_range_and_comment_text_range).add(FactAttribute);
A<SelectionRangeTests>().method((t) => t.skips_single_variable_declaration_inside_variable_statement).add(FactAttribute);
A<SelectionRangeTests>().method((t) => t.adds_argument_list_range_before_identifier_range).add(FactAttribute);
A<SelectionRangeTests>().method((t) => t.keeps_multiline_function_body_range_even_while_skipping_block_nodes).add(FactAttribute);
A<SelectionRangeTests>().method((t) => t.synthesizes_template_expression_placeholder_range).add(FactAttribute);
