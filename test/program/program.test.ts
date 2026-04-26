import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createProgram, emitProgram, type CompilerHost } from "../../src/program/index.js";

describe("program groundwork", () => {
  it("loads multiple root files through a compiler host and emits JavaScript outputs", () => {
    const files = new Map<string, string>([
      ["src/add.ts", "export function add(a: number, b: number): number { return a + b; }"],
      ["src/value.ts", "export const answer: number = 42;"],
    ]);
    const outputs = new Map<string, string>();
    const host: CompilerHost = {
      getCurrentDirectory: () => ".",
      readFile: fileName => files.get(fileName),
      writeFile: (fileName, text) => outputs.set(fileName, text),
    };

    const program = createProgram(["src/add.ts", "src/value.ts"], { outDir: "dist" }, host);
    const result = emitProgram(program, host);

    assert.equal(program.diagnostics.length, 0);
    assert.deepEqual(
      result.emittedFiles.map(file => file.outputFileName),
      ["dist/src/add.js", "dist/src/value.js"],
    );
    assert.equal(outputs.get("dist/src/value.js"), "export const answer = 42;");
  });

  it("reports missing roots without emitting partial outputs", () => {
    const outputs = new Map<string, string>();
    const host: CompilerHost = {
      readFile: () => undefined,
      writeFile: (fileName, text) => outputs.set(fileName, text),
    };

    const program = createProgram(["missing.ts"], {}, host);
    const result = emitProgram(program, host);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["File not found: missing.ts"]);
    assert.equal(outputs.size, 0);
  });

  it("promotes bind diagnostics to program diagnostics before emit", () => {
    const host: CompilerHost = {
      readFile: () => "let x; const x = 1;",
      writeFile: () => {
        throw new Error("emit should not run");
      },
    };

    const program = createProgram(["input.ts"], {}, host);
    const result = emitProgram(program, host);

    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.message), ["Duplicate identifier 'x'."]);
    assert.equal(result.emittedFiles.length, 0);
  });
});
