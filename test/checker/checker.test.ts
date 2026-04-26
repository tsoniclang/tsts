import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkProgram, checkSourceFile } from "../../src/checker/index.js";
import { parseSourceFile } from "../../src/parser/index.js";
import { createProgram, type CompilerHost } from "../../src/program/index.js";

describe("checker groundwork", () => {
  it("accepts numeric toFixed calls that flow into string returns", () => {
    const sourceFile = parseSourceFile("function f(x: number): string { return x.toFixed(2); }");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("reports invalid property access on primitive receivers", () => {
    const sourceFile = parseSourceFile("function f(x: string): string { return x.toFixed(); }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Property 'toFixed' does not exist on type 'string'."]);
  });

  it("reports return type assignability failures", () => {
    const sourceFile = parseSourceFile("function f(): number { return \"not a number\"; }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
  });

  it("checks every source file in a program", () => {
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "export function f(): number { return \"x\"; }" : undefined,
    };
    const program = createProgram(["src/index.ts"], {}, host);
    const diagnostics = checkProgram(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
  });

  it("checks method and constructor bodies inside classes", () => {
    const sourceFile = parseSourceFile("class Box { getValue(): number { return \"x\"; } }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
  });

  it("checks declared arrow function return types", () => {
    const sourceFile = parseSourceFile("const f = (x: string): number => x;");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
  });

  it("checks loop initializer declarations and loop bodies", () => {
    const sourceFile = parseSourceFile("function f(): number { for (const item: string of items) { return item; } return 1; }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
  });

  it("checks conditional branches after assertion expressions", () => {
    const sourceFile = parseSourceFile("function f(flag: boolean): number { return flag ? \"x\" as string : 1; }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'unknown' is not assignable to type 'number'."]);
  });
});
