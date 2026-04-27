import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createProgram, emitProgram, getProgramDiagnostics, type CompilerHost } from "../../src/program/index.js";

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

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["File 'missing.ts' not found."]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [6053]);
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
    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.code), [2300]);
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

    assert.deepEqual(program.sourceFiles.map(sourceFile => sourceFile.fileName), ["broken.ts", "ok.ts"]);
    assert.equal(program.diagnostics.length, 1);
    assert.equal(program.diagnostics[0]!.fileName, "broken.ts");
    assert.equal(program.diagnostics[0]!.code, 1128);
    assert.equal(program.diagnostics[0]!.message, "Declaration or statement expected.");
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

  it("resolves ESM .js specifiers to TypeScript source files", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "import { value } from \"./dep.js\"; export const answer = value;"],
      ["src/dep.ts", "export const value = 42;"],
    ]);
    const host: CompilerHost = {
      getCurrentDirectory: () => ".",
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], {}, host);

    assert.equal(program.diagnostics.length, 0);
    assert.deepEqual(program.sourceFiles.map(file => file.fileName), ["src/index.ts", "src/dep.ts"]);
  });

  it("diagnoses unresolved relative imports", () => {
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "import { missing } from \"./missing\";" : undefined,
    };

    const program = createProgram(["src/index.ts"], {}, host);
    const result = emitProgram(program, host);

    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.message), ["Cannot find module './missing' or its corresponding type declarations."]);
    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.code), [2307]);
    assert.equal(result.emittedFiles.length, 0);
  });

  it("resolves package module specifiers through node_modules declaration entrypoints and metadata", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "import { value } from \"pkg\"; import { named } from \"typed-pkg\"; export const answer = value + named;"],
      ["node_modules/pkg/index.d.ts", "export const value: number;"],
      ["node_modules/typed-pkg/package.json", "{\"name\":\"typed-pkg\",\"typings\":\"./types/main.d.ts\"}"],
      ["node_modules/typed-pkg/types/main.d.ts", "export const named: number;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], {}, host);

    assert.equal(program.diagnostics.length, 0);
    assert.deepEqual(program.sourceFiles.map(file => file.fileName), [
      "src/index.ts",
      "node_modules/pkg/index.d.ts",
      "node_modules/typed-pkg/types/main.d.ts",
    ]);
  });

  it("resolves non-relative modules through baseUrl before package lookup", () => {
    const files = new Map<string, string>([
      ["/proj/component/file.ts", "import { CharCode } from \"defs/cc\"; export const value = CharCode.A;"],
      ["/proj/defs/cc.ts", "export const enum CharCode { A, B }"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      getCurrentDirectory: () => "/proj",
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["/proj/component/file.ts"], { baseUrl: "/proj" }, host);

    assert.equal(program.diagnostics.length, 0);
    assert.deepEqual(program.sourceFiles.map(file => file.fileName), ["/proj/component/file.ts", "/proj/defs/cc.ts"]);
    assert.equal(getProgramDiagnostics(program).length, 0);
  });

  it("resolves package exports from the containing file and suppresses disabled unchecked side-effect imports", () => {
    const files = new Map<string, string>([
      ["packages/app/src/index.ts", "import { value } from \"pkg\"; import \"missing-side-effect\"; export const answer = value;"],
      ["packages/app/node_modules/pkg/package.json", "{\"name\":\"pkg\",\"exports\":{\".\":{\"types\":\"./dist/index.d.ts\",\"default\":\"./dist/index.js\"}}}"],
      ["packages/app/node_modules/pkg/dist/index.d.ts", "export const value: number;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["packages/app/src/index.ts"], { noUncheckedSideEffectImports: false }, host);

    assert.equal(program.diagnostics.length, 0);
    assert.deepEqual(program.sourceFiles.map(file => file.fileName), [
      "packages/app/src/index.ts",
      "packages/app/node_modules/pkg/dist/index.d.ts",
    ]);
  });

  it("uses the side-effect import diagnostic by default for TypeScript 6", () => {
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "import \"missing-side-effect\";" : undefined,
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], {}, host);

    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.code), [2882]);
    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.message), ["Cannot find module or type declarations for side-effect import of 'missing-side-effect'."]);
  });

  it("resolves external import-equals module references through the program graph", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "import pkg = require(\"pkg\"); export const answer = pkg.value;"],
      ["node_modules/pkg/index.d.ts", "export const value: number;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], {}, host);

    assert.equal(program.diagnostics.length, 0);
    assert.deepEqual(program.sourceFiles.map(file => file.fileName), ["src/index.ts", "node_modules/pkg/index.d.ts"]);
  });

  it("does not treat package metadata without a resolvable entrypoint as a module", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "import { missing } from \"metadata-only\";"],
      ["node_modules/metadata-only/package.json", "{\"name\":\"metadata-only\",\"types\":\"./missing.d.ts\"}"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], {}, host);

    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.message), ["Cannot find module 'metadata-only' or its corresponding type declarations."]);
    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.code), [2307]);
  });

  it("diagnoses unresolved package module specifiers", () => {
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "import { missing } from \"missing-pkg\";" : undefined,
    };

    const program = createProgram(["src/index.ts"], {}, host);

    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.message), ["Cannot find module 'missing-pkg' or its corresponding type declarations."]);
    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.code), [2307]);
  });

  it("diagnoses unresolved external module augmentations without treating them as ambient modules", () => {
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "export {}; declare module \"missing\" { export interface Shape { value: string; } }" : undefined,
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], {}, host);

    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.code), [2664]);
    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.message), ["Invalid module name in augmentation, module 'missing' cannot be found."]);
  });

  it("uses the System-module unresolved package diagnostic", () => {
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "import { missing } from \"missing-pkg\";" : undefined,
    };

    const program = createProgram(["src/index.ts"], { module: "system" }, host);

    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.message), ["Cannot find module 'missing-pkg'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?"]);
    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.code), [2792]);
  });

  it("uses the AMD-module unresolved import diagnostic for relative and package specifiers", () => {
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "import { local } from \"./missing\"; import { pkg } from \"missing-pkg\";" : undefined,
    };

    const program = createProgram(["src/index.ts"], { module: "amd" }, host);

    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.code), [2792, 2792]);
    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot find module './missing'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?",
      "Cannot find module 'missing-pkg'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?",
    ]);
  });

  it("continues semantic checking after syntax diagnostics from recoverable parse errors", () => {
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "G@\uFFFD" : undefined,
    };

    const program = createProgram(["src/index.ts"], {}, host);
    const diagnostics = emitProgram(program, host).diagnostics;

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [1490, 1434, 1127, 1128, 2304]);
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
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.equal(outputs.size, 0);
  });

  it("uses ambient declaration-file exports for synthetic default imports", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "import { default as pkg } from \"./pkg\"; pkg.foo();"],
      ["src/pkg.d.ts", "export function foo(): void;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], { module: "system" }, host);

    assert.equal(program.diagnostics.length, 0);
    assert.deepEqual(emitProgram(program, host).diagnostics, []);
  });

  it("diagnoses default imports when synthetic defaults are explicitly disabled", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "import Foo from \"./pkg\";"],
      ["src/pkg.ts", "export class Foo { member: string; }"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], { module: "system", allowSyntheticDefaultImports: false }, host);
    const diagnostics = emitProgram(program, host).diagnostics;

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [1192, 2564]);
  });

  it("diagnoses relative ambient module names and nested relative ambient imports", () => {
    const files = new Map<string, string>([
      [
        "ambient.d.ts",
        [
          "declare module \"./relative\" { var forward: string; }",
          "declare module \".\\\\relative\" { var backslash: string; }",
          "declare module \"Outer\" { import sub = require(\"./SubModule\"); }",
        ].join("\n"),
      ],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["ambient.d.ts"], {}, host);

    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.code), [2436, 2436, 2439, 2307]);
    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.message), [
      "Ambient module declaration cannot specify relative module name.",
      "Ambient module declaration cannot specify relative module name.",
      "Import or export declaration in an ambient module declaration cannot reference module through relative module name.",
      "Cannot find module './SubModule' or its corresponding type declarations.",
    ]);
  });
});
