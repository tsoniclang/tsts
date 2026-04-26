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

  it("records parse diagnostics per file without aborting the whole program", () => {
    const files = new Map<string, string>([
      ["broken.ts", "const = ;"],
      ["ok.ts", "export const answer = 42;"],
    ]);
    const outputs = new Map<string, string>();
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      writeFile: (fileName, text) => outputs.set(fileName, text),
    };

    const program = createProgram(["broken.ts", "ok.ts"], {}, host);
    const result = emitProgram(program, host);

    assert.equal(program.sourceFiles.length, 1);
    assert.equal(program.sourceFiles[0]!.fileName, "ok.ts");
    assert.equal(program.diagnostics.length, 1);
    assert.equal(program.diagnostics[0]!.fileName, "broken.ts");
    assert.match(program.diagnostics[0]!.message, /Expected token Identifier/);
    assert.equal(result.emittedFiles.length, 0);
    assert.equal(outputs.size, 0);
  });

  it("expands relative import module specifiers into the program graph", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "import { value } from \"./dep\"; export const answer = value;"],
      ["src/dep.ts", "export const value = 42;"],
    ]);
    const outputs = new Map<string, string>();
    const host: CompilerHost = {
      getCurrentDirectory: () => ".",
      readFile: fileName => files.get(fileName),
      writeFile: (fileName, text) => outputs.set(fileName, text),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], { outDir: "dist" }, host);
    const result = emitProgram(program, host);

    assert.equal(program.diagnostics.length, 0);
    assert.deepEqual(program.sourceFiles.map(file => file.fileName), ["src/index.ts", "src/dep.ts"]);
    assert.deepEqual(result.emittedFiles.map(file => file.outputFileName), ["dist/src/index.js", "dist/src/dep.js"]);
  });

  it("diagnoses unresolved relative imports", () => {
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "import { missing } from \"./missing\";" : undefined,
    };

    const program = createProgram(["src/index.ts"], {}, host);
    const result = emitProgram(program, host);

    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.message), ["Cannot find module './missing'."]);
    assert.equal(result.emittedFiles.length, 0);
  });

  it("does not emit when semantic diagnostics are present", () => {
    const outputs = new Map<string, string>();
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "export function f(): number { return \"x\"; }" : undefined,
      writeFile: (fileName, text) => outputs.set(fileName, text),
    };

    const program = createProgram(["src/index.ts"], {}, host);
    const result = emitProgram(program, host);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
    assert.equal(outputs.size, 0);
  });
});
