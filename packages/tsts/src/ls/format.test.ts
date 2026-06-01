import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { TextRange } from "../core/index.js";
import { parseSourceFile } from "../parser/index.js";
import { getDefaultFormatCodeSettings, type FormatCodeSettings } from "./lsutil/index.js";
import type { Position, Range } from "../lsp/lsproto/index.js";
import {
  getFormattingEditsAfterKeystroke,
  getRangeOfEnclosingComment,
  provideFormatDocumentRange,
  toLSProtoTextEdits,
  type FormatLanguageService,
} from "./format.js";
import type { SourceFile } from "../ast/index.js";

class TestConverters {
  fromLSPRange(_file: SourceFile, range: Range): TextRange {
    return new TextRange(range.start.character, range.end.character);
  }

  lineAndCharacterToPosition(_file: SourceFile, position: Position): number {
    return position.character;
  }

  toLSPRange(_file: SourceFile, range: TextRange): Range {
    return {
      start: { line: 0, character: range.pos },
      end: { line: 0, character: range.end },
    };
  }
}

class TestFormatService implements FormatLanguageService {
  readonly converters = new TestConverters();
  readonly file: SourceFile;
  readonly options: FormatCodeSettings;

  constructor(text: string) {
    this.file = parseSourceFile(text);
    this.options = getDefaultFormatCodeSettings();
  }

  formatOptions(): FormatCodeSettings {
    return this.options;
  }

  getProgramAndFile(_uri: string): readonly [unknown, SourceFile] {
    return [{}, this.file];
  }
}

export class FormatLanguageServiceTests {
  converts_core_and_formatter_text_changes_to_lsp_text_edits(): void {
    const service = new TestFormatService("const value = 1;");

    const edits = toLSProtoTextEdits(service, service.file, [
      { pos: 0, end: 5, newText: "let" },
      { span: { pos: 6, end: 11 }, newText: "answer" },
    ]);

    Assert.Equal(2, edits.length);
    Assert.Equal("let", edits[0]?.newText);
    Assert.Equal(0, edits[0]?.range.start.character);
    Assert.Equal(5, edits[0]?.range.end.character);
    Assert.Equal("answer", edits[1]?.newText);
    Assert.Equal(6, edits[1]?.range.start.character);
    Assert.Equal(11, edits[1]?.range.end.character);
  }

  routes_range_formatting_through_lsp_range_conversion(): void {
    const service = new TestFormatService("const value=1;");

    const response = provideFormatDocumentRange(
      service,
      "file:///input.ts",
      { tabSize: 2, insertSpaces: true },
      { start: { line: 0, character: 0 }, end: { line: 0, character: service.file.text.length } },
    );

    Assert.True(response.textEdits !== undefined);
  }

  suppresses_on_type_formatting_inside_comments(): void {
    const text = "const value = 1; // trailing\nconst next = 2;";
    const file = parseSourceFile(text);
    const position = text.indexOf("trailing") + 2;

    const edits = getFormattingEditsAfterKeystroke(file, getDefaultFormatCodeSettings(), position, ";");

    Assert.Equal(0, edits.length);
  }

  finds_trailing_comment_ranges_between_tokens(): void {
    const text = "const value = 1; // trailing\nconst next = 2;";
    const file = parseSourceFile(text);
    const firstStatement = file.statements[0]!;
    const nextStatement = file.statements[1]!;
    const insideComment = text.indexOf("trailing") + 2;
    const commentEnd = text.indexOf("\n");

    const range = getRangeOfEnclosingComment(file, insideComment, firstStatement, nextStatement);
    const rangeAtSingleLineEnd = getRangeOfEnclosingComment(file, commentEnd, firstStatement, nextStatement);
    const rangeAfterComment = getRangeOfEnclosingComment(file, commentEnd + 1, firstStatement, nextStatement);

    Assert.Equal(text.indexOf("//"), range?.pos);
    Assert.Equal(commentEnd, range?.end);
    Assert.Equal(commentEnd, rangeAtSingleLineEnd?.end);
    Assert.Equal(undefined, rangeAfterComment);
  }
}

A<FormatLanguageServiceTests>().method((t) => t.converts_core_and_formatter_text_changes_to_lsp_text_edits).add(FactAttribute);
A<FormatLanguageServiceTests>().method((t) => t.routes_range_formatting_through_lsp_range_conversion).add(FactAttribute);
A<FormatLanguageServiceTests>().method((t) => t.suppresses_on_type_formatting_inside_comments).add(FactAttribute);
A<FormatLanguageServiceTests>().method((t) => t.finds_trailing_comment_ranges_between_tokens).add(FactAttribute);
