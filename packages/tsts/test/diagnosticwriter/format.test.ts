import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import {
  formatDiagnostic,
  formatDiagnosticWithSource,
  type Diagnostic,
  type FileLike,
} from "../../src/diagnosticwriter/index.js";

function makeFile(text: string, fileName = "test.ts"): FileLike {
  const lineMap: number[] = [0];
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === "\n") lineMap.push(i + 1);
  }
  return {
    fileName: () => fileName,
    text: () => text,
    ecmaLineMap: () => lineMap,
  };
}

function makeDiag(opts: {
  file?: FileLike;
  pos: number;
  end: number;
  code: number;
  category: number;
  message: string;
}): Diagnostic {
  return {
    file: () => opts.file,
    pos: () => opts.pos,
    end: () => opts.end,
    len: () => opts.end - opts.pos,
    code: () => opts.code,
    category: () => opts.category as 0 | 1 | 2 | 3,
    localize: () => opts.message,
    messageChain: () => [],
    relatedInformation: () => [],
  };
}

describe("diagnosticwriter — formatDiagnostic", () => {
  it("formats single line with file location", () => {
    const file = makeFile("const x: number = 5;\nlet y = x;");
    const d = makeDiag({
      file,
      pos: 6,
      end: 7,
      code: 2304,
      category: 1,
      message: "Identifier expected.",
    });
    assert.equal(
      formatDiagnostic(d),
      "test.ts(1,7): error TS2304: Identifier expected."
    );
  });

  it("formats without a source file", () => {
    const d = makeDiag({
      pos: 0,
      end: 0,
      code: 5023,
      category: 1,
      message: "Unknown option.",
    });
    assert.equal(formatDiagnostic(d), "error TS5023: Unknown option.");
  });

  it("formats different categories", () => {
    const d = makeDiag({ pos: 0, end: 0, code: 1, category: 0, message: "msg" });
    assert.ok(formatDiagnostic(d).startsWith("warning"));
    const d2 = makeDiag({ pos: 0, end: 0, code: 1, category: 2, message: "msg" });
    assert.ok(formatDiagnostic(d2).startsWith("suggestion"));
  });
});

describe("diagnosticwriter — formatDiagnosticWithSource", () => {
  it("includes source line and caret", () => {
    const file = makeFile("const x = 5;\nlet y: string = x;\nconst z = 0;");
    const d = makeDiag({
      file,
      pos: 30,   // Start of "x" on line 2
      end: 31,
      code: 2322,
      category: 1,
      message: "Type 'number' is not assignable to type 'string'.",
    });
    const output = formatDiagnosticWithSource(d);
    assert.ok(output.includes("test.ts(2,18)"));
    assert.ok(output.includes("let y: string = x;"));
    assert.ok(output.includes("~"));
  });
});
