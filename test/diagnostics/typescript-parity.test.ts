import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as ts from "typescript";
import { checkSourceFile } from "../../src/checker/index.js";
import { parseSourceFile } from "../../src/parser/index.js";

interface ComparableDiagnostic {
  readonly code: number | undefined;
  readonly category: string | undefined;
  readonly message: string;
}

const compilerOptions: ts.CompilerOptions = {
  module: ts.ModuleKind.ESNext,
  noEmit: true,
  noLib: true,
  strict: true,
  target: ts.ScriptTarget.ES2024,
};

function upstreamTypeScriptDiagnostics(sourceText: string): readonly ComparableDiagnostic[] {
  const fileName = "case.ts";
  const host = ts.createCompilerHost(compilerOptions);
  host.fileExists = name => name === fileName;
  host.readFile = name => name === fileName ? sourceText : undefined;
  host.getSourceFile = (name, languageVersion) => name === fileName
    ? ts.createSourceFile(name, sourceText, languageVersion, true)
    : undefined;

  const program = ts.createProgram([fileName], compilerOptions, host);
  return ts.getPreEmitDiagnostics(program)
    .filter(diagnostic => diagnostic.file?.fileName === fileName)
    .map(diagnostic => ({
      code: diagnostic.code,
      category: ts.DiagnosticCategory[diagnostic.category],
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
    }));
}

function tstsDiagnostics(sourceText: string): readonly ComparableDiagnostic[] {
  return checkSourceFile(parseSourceFile(sourceText, { fileName: "case.ts" })).diagnostics.map(diagnostic => ({
    code: diagnostic.code,
    category: diagnostic.category,
    message: diagnostic.message,
  }));
}

describe("differential TypeScript diagnostic parity", () => {
  it("matches upstream TypeScript assignment diagnostics for implemented checker slices", () => {
    const sourceText = "function f(): number { return \"x\"; }";

    assert.deepEqual(tstsDiagnostics(sourceText), upstreamTypeScriptDiagnostics(sourceText));
  });

  it("matches upstream TypeScript property diagnostics for implemented checker slices", () => {
    const sourceText = "function f(x: string): string { return x.toFixed(); }";

    assert.deepEqual(tstsDiagnostics(sourceText), upstreamTypeScriptDiagnostics(sourceText));
  });

  it("matches upstream TypeScript diagnostics for explicit generic function instantiation", () => {
    const sourceText = "function identity<T>(item: T): T { return item; } const n: number = identity<string>(\"x\");";

    assert.deepEqual(tstsDiagnostics(sourceText), upstreamTypeScriptDiagnostics(sourceText));
  });
});
