import { attributes as A } from "@tsonic/core/lang.js";
import type { int } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  formatDiagnostic,
  formatDiagnosticWithSource,
  type Diagnostic,
  type FileLike,
} from "./index.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";

function makeFile(text: string, fileName: string = "test.ts"): FileLike {
  const lineMap: number[] = [0];
  for (let i = 0; i < text.length; i = i + 1) {
    if (text[i] === "\n") lineMap.push(i + 1);
  }
  return {
    fileName: () => fileName,
    text: () => text,
    ecmaLineMap: () => lineMap,
  };
}

interface DiagOpts {
  readonly file?: FileLike;
  readonly pos: int;
  readonly end: int;
  readonly code: int;
  readonly category: DiagnosticCategory;
  readonly message: string;
}

class TestDiagnostic implements Diagnostic {
  readonly #opts: DiagOpts;

  constructor(opts: DiagOpts) {
    this.#opts = opts;
  }

  file(): FileLike | undefined { return this.#opts.file; }
  pos(): int { return this.#opts.pos; }
  end(): int { return this.#opts.end; }
  len(): int { return this.#opts.end - this.#opts.pos; }
  code(): int { return this.#opts.code; }
  category(): DiagnosticCategory { return this.#opts.category; }
  localize(_locale?: string): string { return this.#opts.message; }
  messageChain(): readonly Diagnostic[] { return []; }
  relatedInformation(): readonly Diagnostic[] { return []; }
}

function makeDiag(opts: DiagOpts): Diagnostic {
  return new TestDiagnostic(opts);
}

export class FormatDiagnosticTests {
  formats_single_line_with_file_location(): void {
    const file = makeFile("const x: number = 5;\nlet y = x;");
    const d = makeDiag({
      file,
      pos: 6,
      end: 7,
      code: 2304,
      category: DiagnosticCategory.Error,
      message: "Identifier expected.",
    });
    Assert.Equal("test.ts(1,7): error TS2304: Identifier expected.", formatDiagnostic(d));
  }

  formats_without_source_file(): void {
    const d = makeDiag({
      pos: 0,
      end: 0,
      code: 5023,
      category: DiagnosticCategory.Error,
      message: "Unknown option.",
    });
    Assert.Equal("error TS5023: Unknown option.", formatDiagnostic(d));
  }

  formats_different_categories(): void {
    const dWarn = makeDiag({
      pos: 0,
      end: 0,
      code: 1,
      category: DiagnosticCategory.Warning,
      message: "msg",
    });
    Assert.StartsWith("warning", formatDiagnostic(dWarn));
    const dSug = makeDiag({
      pos: 0,
      end: 0,
      code: 1,
      category: DiagnosticCategory.Suggestion,
      message: "msg",
    });
    Assert.StartsWith("suggestion", formatDiagnostic(dSug));
  }
}

export class FormatDiagnosticWithSourceTests {
  includes_source_line_and_caret(): void {
    const file = makeFile("const x = 5;\nlet y: string = x;\nconst z = 0;");
    const d = makeDiag({
      file,
      pos: 30,
      end: 31,
      code: 2322,
      category: DiagnosticCategory.Error,
      message: "Type 'number' is not assignable to type 'string'.",
    });
    const output = formatDiagnosticWithSource(d);
    Assert.Contains("test.ts(2,18)", output);
    Assert.Contains("let y: string = x;", output);
    Assert.Contains("~", output);
  }
}

A<FormatDiagnosticTests>().method((t) => t.formats_single_line_with_file_location).add(FactAttribute);
A<FormatDiagnosticTests>().method((t) => t.formats_without_source_file).add(FactAttribute);
A<FormatDiagnosticTests>().method((t) => t.formats_different_categories).add(FactAttribute);
A<FormatDiagnosticWithSourceTests>().method((t) => t.includes_source_line_and_caret).add(FactAttribute);
