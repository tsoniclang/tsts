import test from "node:test";
import assert from "node:assert/strict";

import type { int } from "@tsonic/core/types.js";

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

test("formats single line with file location", () => {
  const file = makeFile("const x: number = 5;\nlet y = x;");
  const d = makeDiag({
    file,
    pos: 6,
    end: 7,
    code: 2304,
    category: DiagnosticCategory.Error,
    message: "Identifier expected.",
  });
  assert.strictEqual(formatDiagnostic(d), "test.ts(1,7): error TS2304: Identifier expected.");
});

test("formats without source file", () => {
  const d = makeDiag({
    pos: 0,
    end: 0,
    code: 5023,
    category: DiagnosticCategory.Error,
    message: "Unknown option.",
  });
  assert.strictEqual(formatDiagnostic(d), "error TS5023: Unknown option.");
});

test("formats different categories", () => {
  const dWarn = makeDiag({
    pos: 0,
    end: 0,
    code: 1,
    category: DiagnosticCategory.Warning,
    message: "msg",
  });
  assert.ok(formatDiagnostic(dWarn).startsWith("warning"));
  const dSug = makeDiag({
    pos: 0,
    end: 0,
    code: 1,
    category: DiagnosticCategory.Suggestion,
    message: "msg",
  });
  assert.ok(formatDiagnostic(dSug).startsWith("suggestion"));
});

test("includes source line and caret", () => {
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
  assert.ok(output.includes("test.ts(2,18)"));
  assert.ok(output.includes("let y: string = x;"));
  assert.ok(output.includes("~"));
});
