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

  it("reports semantic duplicate block-scoped declarations before emit", () => {
    const host: CompilerHost = {
      readFile: () => "let x; const x = 1;",
      writeFile: () => {
        throw new Error("emit should not run");
      },
    };

    const program = createProgram(["input.ts"], {}, host);
    const result = emitProgram(program, host);

    assert.deepEqual(program.diagnostics, []);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot redeclare block-scoped variable 'x'.",
      "Cannot redeclare block-scoped variable 'x'.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2451, 2451]);
    assert.equal(result.emittedFiles.length, 0);
  });

  it("reports global script block-scoped duplicates across root files", () => {
    const files = new Map<string, string>([
      ["file1.ts", "let shared = 1;"],
      ["file2.ts", "const shared = 2;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["file1.ts", "file2.ts"], {}, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => [diagnostic.fileName, diagnostic.code, diagnostic.message]), [
      ["file1.ts", 2451, "Cannot redeclare block-scoped variable 'shared'."],
      ["file2.ts", 2451, "Cannot redeclare block-scoped variable 'shared'."],
    ]);
  });

  it("reports outFile global script use before later file lexical declarations", () => {
    const files = new Map<string, string>([
      ["file1.ts", "later; Future;"],
      ["file2.ts", "let later = 1; class Future {}"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["file1.ts", "file2.ts"], { outFile: "out.js", ignoreDeprecations: "6.0" }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => [diagnostic.fileName, diagnostic.code, diagnostic.message]), [
      ["file1.ts", 2448, "Block-scoped variable 'later' used before its declaration."],
      ["file1.ts", 2449, "Class 'Future' used before its declaration."],
    ]);
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

  it("distinguishes missing imports from non-exported local declarations", () => {
    const files = new Map<string, string>([
      ["src/a.ts", "declare function foo(): any;\ndeclare function bar(): any;\nexport { foo };"],
      ["src/b.ts", "import { bar, baz } from \"./a\";"],
    ]);
    const host: CompilerHost = {
      getCurrentDirectory: () => ".",
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/b.ts"], { module: "commonjs", target: "es2015" }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [2459, 2305]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Module '\"./a\"' declares 'bar' locally, but it is not exported.",
      "Module '\"./a\"' has no exported member 'baz'.",
    ]);
  });

  it("reports the exported alias for missing imports of renamed local exports", () => {
    const files = new Map<string, string>([
      ["src/a.ts", "declare function foo(): any;\ndeclare function bar(): any;\nexport { foo, bar as baz };"],
      ["src/b.ts", "import { foo, bar } from \"./a\";"],
    ]);
    const host: CompilerHost = {
      getCurrentDirectory: () => ".",
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/b.ts"], { module: "commonjs", target: "es2015" }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [2460]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Module '\"./a\"' declares 'bar' locally, but it is exported as 'baz'.",
    ]);
  });

  it("uses export-assignment interop diagnostics for named imports from export-equals modules", () => {
    const files = new Map<string, string>([
      ["src/a.ts", "class Foo {}\nexport = Foo;"],
      ["src/b.ts", "import { Foo } from \"./a\";"],
    ]);
    const host: CompilerHost = {
      getCurrentDirectory: () => ".",
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/b.ts"], { module: "commonjs", target: "es2015", esModuleInterop: false, ignoreDeprecations: "6.0" }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [2497, 2617]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "This module can only be referenced with ECMAScript imports/exports by turning on the 'esModuleInterop' flag and referencing its default export.",
      "'Foo' can only be imported by using 'import Foo = require(\"./a\")' or by turning on the 'esModuleInterop' flag and using a default import.",
    ]);
  });

  it("reports export-equals declarations in ECMAScript module output", () => {
    const files = new Map<string, string>([
      ["src/a.ts", "class Foo {}\nexport = Foo;"],
      ["src/b.ts", "import { Foo } from \"./a\";"],
    ]);
    const host: CompilerHost = {
      getCurrentDirectory: () => ".",
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/a.ts", "src/b.ts"], { module: "es2015", target: "es2015", esModuleInterop: false, ignoreDeprecations: "6.0" }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [1203, 2497, 2596]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Export assignment cannot be used when targeting ECMAScript modules. Consider using 'export default' or another module format instead.",
      "This module can only be referenced with ECMAScript imports/exports by turning on the 'allowSyntheticDefaultImports' flag and referencing its default export.",
      "'Foo' can only be imported by turning on the 'esModuleInterop' flag and using a default import.",
    ]);
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

  it("resolves JavaScript dependencies as untyped modules when JavaScript input is disabled", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "import { value } from \"./dep\"; export const answer = value;"],
      ["src/dep.js", "export const value = 42;"],
    ]);
    const host: CompilerHost = {
      getCurrentDirectory: () => ".",
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], {}, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics, []);
    assert.deepEqual(program.sourceFiles.map(file => file.fileName), ["src/index.ts"]);
    assert.deepEqual(program.sourceFiles[0]!.resolvedModules, [{ specifier: "./dep", fileName: "src/dep.js", untyped: true }]);
  });

  it("reports noImplicitAny for JavaScript dependencies without declaration files", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "import * as dep from \"./dep\"; export const answer = dep.value;"],
      ["src/dep.js", "export const value = 42;"],
    ]);
    const host: CompilerHost = {
      getCurrentDirectory: () => ".",
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], { noImplicitAny: true }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [7016]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Could not find a declaration file for module './dep'. 'src/dep.js' implicitly has an 'any' type.",
    ]);
    assert.deepEqual(program.sourceFiles.map(file => file.fileName), ["src/index.ts"]);
  });

  it("resolves JavaScript package entrypoints as untyped modules without named-export diagnostics", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "import { value } from \"pkg\"; export const answer = value;"],
      ["node_modules/pkg/package.json", "{\"name\":\"pkg\",\"exports\":\"./index.js\"}"],
      ["node_modules/pkg/index.js", "export const value = 42;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], {}, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics, []);
    assert.deepEqual(program.sourceFiles.map(file => file.fileName), ["src/index.ts"]);
    assert.deepEqual(program.sourceFiles[0]!.resolvedModules, [{ specifier: "pkg", fileName: "node_modules/pkg/index.js", untyped: true }]);
  });

  it("provides CommonJS require as a JavaScript commonjs binding", () => {
    const files = new Map<string, string>([
      ["src/a.js", "export const A = require(\"pkg\");"],
      ["src/b.ts", "import { A } from \"./a\"; A;"],
      ["node_modules/pkg/package.json", "{\"name\":\"pkg\",\"exports\":\"./index.js\"}"],
      ["node_modules/pkg/index.js", "module.exports = 1;"],
    ]);
    const host: CompilerHost = {
      getCurrentDirectory: () => ".",
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/b.ts"], { module: "es2015", moduleResolution: "bundler", allowJs: true, checkJs: true, noEmit: true }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics, []);
  });

  it("resolves absolute JS imports with allowJs and reports JSX option diagnostics without blocking checks", () => {
    const files = new Map<string, string>([
      ["/foo.jsx", "const Foo = () => (<div>foo</div>); export default Foo;"],
      ["/bar.jsx", "import Foo from \"/foo\"; const a = <Foo />;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["/bar.jsx"], { allowJs: true, checkJs: true }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(program.sourceFiles.map(file => file.fileName), ["/bar.jsx", "/foo.jsx"]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [6142, 17004, 17004]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Module '/foo' was resolved to '/foo.jsx', but '--jsx' is not set.",
      "Cannot use JSX unless the '--jsx' flag is provided.",
      "Cannot use JSX unless the '--jsx' flag is provided.",
    ]);
  });

  it("does not cascade import-shape diagnostics from JSX-disabled module resolutions", () => {
    const files = new Map<string, string>([
      ["/view.tsx", ""],
      ["/index.ts", "import View from \"./view\"; export const current = View;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["/index.ts"], {}, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [6142]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Module './view' was resolved to '/view.tsx', but '--jsx' is not set.",
    ]);
    assert.deepEqual(program.sourceFiles[0]!.resolvedModules, [{ specifier: "./view", fileName: "/view.tsx", blockedByResolutionDiagnostic: true }]);
  });

  it("reports missing noLib core global types from the program global environment", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "declare const values: Array<number>;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
    };

    const program = createProgram(["src/index.ts"], { noLib: true }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.filter(diagnostic => diagnostic.code === 2318).map(diagnostic => diagnostic.message), [
      "Cannot find global type 'Array'.",
      "Cannot find global type 'Boolean'.",
      "Cannot find global type 'CallableFunction'.",
      "Cannot find global type 'Function'.",
      "Cannot find global type 'IArguments'.",
      "Cannot find global type 'NewableFunction'.",
      "Cannot find global type 'Number'.",
      "Cannot find global type 'Object'.",
      "Cannot find global type 'RegExp'.",
      "Cannot find global type 'String'.",
    ]);
    assert.equal(diagnostics.some(diagnostic => diagnostic.code === 2304 && diagnostic.message.includes("'Array'")), false);
  });

  it("continues noLib global diagnostics after lib/noLib option conflicts", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "declare const value: number;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
    };

    const program = createProgram(["src/index.ts"], { lib: ["es5"], noLib: true }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.equal(diagnostics.some(diagnostic => diagnostic.code === 5053), true);
    assert.equal(diagnostics.some(diagnostic => diagnostic.code === 2318 && diagnostic.message.includes("'Array'")), true);
  });

  it("reports strict option dependencies from explicit strict-family options", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "class C { value: number; }"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
    };

    const program = createProgram(["src/index.ts"], {
      strict: false,
      strictPropertyInitialization: true,
      exactOptionalPropertyTypes: true,
    }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [5052, 5052]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Option 'strictPropertyInitialization' cannot be specified without specifying option 'strictNullChecks'.",
      "Option 'exactOptionalPropertyTypes' cannot be specified without specifying option 'strictNullChecks'.",
    ]);
  });

  it("reports decorator metadata dependency on legacy decorators", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "class C {}"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
    };

    const program = createProgram(["src/index.ts"], { emitDecoratorMetadata: true }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [5052]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Option 'emitDecoratorMetadata' cannot be specified without specifying option 'experimentalDecorators'.",
    ]);
  });

  it("uses source-owned noLib global type declarations before reporting TS2318", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "interface Array<T> { length: number }"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
    };

    const program = createProgram(["src/index.ts"], { noLib: true }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.equal(diagnostics.some(diagnostic => diagnostic.code === 2318 && diagnostic.message.includes("'Array'")), false);
    assert.equal(diagnostics.some(diagnostic => diagnostic.code === 2318 && diagnostic.message.includes("'Boolean'")), true);
  });

  it("does not inject host library globals when lib is explicit core-only", () => {
    const files = new Map<string, string>([
      ["src/index.ts", "setTimeout(() => undefined, 0); window; self;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
    };

    const program = createProgram(["src/index.ts"], { lib: ["es5"] }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [2304, 2304, 2304]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot find name 'setTimeout'.",
      "Cannot find name 'window'.",
      "Cannot find name 'self'.",
    ]);
  });

  it("lets imports shadow standard global type names", () => {
    const files = new Map<string, string>([
      [
        "src/types.d.ts",
        [
          "declare module \"Boolean/Boolean\" {",
          "  export type Boolean = 1 | 0;",
          "}",
        ].join("\n"),
      ],
      [
        "src/index.ts",
        [
          "import { Boolean } from \"Boolean/Boolean\";",
          "type At<strict extends Boolean = 1> = { 1: string; 0: number }[strict];",
          "declare const value: At;",
          "value;",
        ].join("\n"),
      ],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/types.d.ts", "src/index.ts"], {}, host);

    assert.deepEqual(getProgramDiagnostics(program), []);
  });

  it("preserves namespace and type meanings on imported namespace-interface merges", () => {
    const files = new Map<string, string>([
      [
        "src/translation.ts",
        [
          "export interface Translation {",
          "  translationKey: Translation.TranslationKeyEnum;",
          "}",
          "export namespace Translation {",
          "  export type TranslationKeyEnum = \"translation1\" | \"translation2\";",
          "  export const TranslationKeyEnum = { Translation1: \"translation1\" as TranslationKeyEnum };",
          "}",
        ].join("\n"),
      ],
      [
        "src/index.ts",
        [
          "import { Translation } from \"./translation\";",
          "import TranslationKeyEnum = Translation.TranslationKeyEnum;",
          "const value: TranslationKeyEnum = TranslationKeyEnum.Translation1;",
          "value;",
        ].join("\n"),
      ],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], { module: "commonjs" }, host);

    assert.deepEqual(getProgramDiagnostics(program), []);
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

  it("merges declare-global augmentations from external modules into program globals", () => {
    const files = new Map<string, string>([
      [
        "index.tsx",
        [
          "declare global {",
          "  function __make(params: object): any;",
          "}",
          "declare var __foot: any;",
          "const thing = <__foot />;",
          "export {};",
        ].join("\n"),
      ],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["index.tsx"], { jsx: "react", jsxFactory: "__make", module: "commonjs" }, host);

    assert.deepEqual(getProgramDiagnostics(program), []);
  });

  it("resolves automatic JSX runtime modules as implicit dependencies without import diagnostics", () => {
    const files = new Map<string, string>([
      ["src/file.tsx", "export const view = <div />;"],
      ["src/node_modules/@types/react/jsx-runtime.d.ts", "import './';"],
      ["src/node_modules/@types/react/index.d.ts", "declare namespace JSX { interface IntrinsicElements { [x: string]: any; } }"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/file.tsx"], { jsx: "react-jsx" }, host);

    assert.equal(program.diagnostics.length, 0);
    assert.deepEqual(program.sourceFiles.map(file => file.fileName), [
      "src/file.tsx",
      "src/node_modules/@types/react/jsx-runtime.d.ts",
      "src/node_modules/@types/react/index.d.ts",
    ]);
    assert.deepEqual(getProgramDiagnostics(program), []);
  });

  it("reports invalid JSX compiler option diagnostics without blocking semantic checks", () => {
    const files = new Map<string, string>([
      ["src/file.tsx", "const view = <div />;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/file.tsx"], { jsx: "react", reactNamespace: "not-valid", noImplicitAny: true }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [5059, 2874, 7026]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.fileName), [undefined, "src/file.tsx", "src/file.tsx"]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Invalid value for '--reactNamespace'. 'not-valid' is not a valid identifier.",
      "This JSX tag requires 'not-valid' to be in scope, but it could not be found.",
      "JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.",
    ]);
  });

  it("treats conflicting JSX compiler options as blocking option diagnostics", () => {
    const files = new Map<string, string>([
      ["src/file.tsx", "const view = <div />;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/file.tsx"], { jsx: "react", jsxFactory: "h", reactNamespace: "React" }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [5053]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.fileName), [undefined]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Option 'reactNamespace' cannot be specified with option 'jsxFactory'.",
    ]);
  });

  it("suppresses dependent fragment factory diagnostics when the fragment factory option is invalid", () => {
    const files = new Map<string, string>([
      ["src/file.tsx", "declare var h: any; const view = <></>;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/file.tsx"], { jsx: "react", jsxFactory: "h", jsxFragmentFactory: "not valid" }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [18035]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.fileName), [undefined]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Invalid value for 'jsxFragmentFactory'. 'not valid' is not a valid identifier or qualified-name.",
    ]);
  });

  it("reports deprecated compiler options without blocking semantic checks", () => {
    const files = new Map<string, string>([
      ["src/file.ts", "const value = missing;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/file.ts"], {
      outFile: "bundle.js",
      downlevelIteration: true,
      baseUrl: "src",
      module: "amd",
      target: "es5",
      moduleResolution: "classic",
      esModuleInterop: false,
      allowSyntheticDefaultImports: false,
    }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [5101, 5101, 5101, 5107, 5107, 5107, 5107, 5107, 2304]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.fileName), [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "src/file.ts"]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Option 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '\"ignoreDeprecations\": \"6.0\"' to silence this error.",
      "Option 'downlevelIteration' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '\"ignoreDeprecations\": \"6.0\"' to silence this error.",
      "Option 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '\"ignoreDeprecations\": \"6.0\"' to silence this error.",
      "Option 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '\"ignoreDeprecations\": \"6.0\"' to silence this error.",
      "Option 'target=ES5' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '\"ignoreDeprecations\": \"6.0\"' to silence this error.",
      "Option 'moduleResolution=classic' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '\"ignoreDeprecations\": \"6.0\"' to silence this error.",
      "Option 'esModuleInterop=false' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '\"ignoreDeprecations\": \"6.0\"' to silence this error.",
      "Option 'allowSyntheticDefaultImports=false' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '\"ignoreDeprecations\": \"6.0\"' to silence this error.",
      "Cannot find name 'missing'.",
    ]);
  });

  it("honors ignoreDeprecations for current TypeScript 6 deprecations", () => {
    const files = new Map<string, string>([
      ["src/file.ts", "const value = missing;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/file.ts"], {
      outFile: "bundle.js",
      module: "system",
      target: "es5",
      ignoreDeprecations: "6.0",
    }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [2304]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), ["Cannot find name 'missing'."]);
  });

  it("reports removed compiler options without blocking semantic checks", () => {
    const files = new Map<string, string>([
      ["src/file.ts", "const value = missing;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/file.ts"], {
      removedOptions: ["noImplicitUseStrict", "preserveValueImports", "out"],
    }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [5102, 5102, 5102, 2304]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.fileName), [undefined, undefined, undefined, "src/file.ts"]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Option 'noImplicitUseStrict' has been removed. Please remove it from your configuration.",
      "Option 'preserveValueImports' has been removed. Please remove it from your configuration.",
      "Option 'out' has been removed. Please remove it from your configuration.",
      "Cannot find name 'missing'.",
    ]);
  });

  it("reports JavaScript root files when allowJs is not enabled", () => {
    const files = new Map<string, string>([
      ["src/file.js", "const value = missing;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/file.js"], { allowJs: false, checkJs: true }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(program.sourceFiles, []);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [5052, 6504]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.fileName), [undefined, undefined]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Option 'checkJs' cannot be specified without specifying option 'allowJs'.",
      "File 'src/file.js' is a JavaScript file. Did you mean to enable the 'allowJs' option?",
    ]);
  });

  it("uses checkJs as an explicit JavaScript input enablement", () => {
    const files = new Map<string, string>([
      ["src/file.js", "const value = missing;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/file.js"], { checkJs: true, noEmit: true }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(program.sourceFiles.map(file => file.fileName), ["src/file.js"]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [2304]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), ["Cannot find name 'missing'."]);
  });

  it("reports module option constraints without blocking semantic checks", () => {
    const files = new Map<string, string>([
      ["src/file.ts", "const value = missing;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/file.ts"], {
      outFile: "bundle.js",
      module: "commonjs",
      moduleResolution: "nodenext",
      ignoreDeprecations: "6.0",
    }, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [6082, 5110, 2304]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.fileName), [undefined, undefined, "src/file.ts"]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Only 'amd' and 'system' modules are supported alongside --outFile.",
      "Option 'module' must be set to 'NodeNext' when option 'moduleResolution' is set to 'NodeNext'.",
      "Cannot find name 'missing'.",
    ]);
  });

  it("does not report outFile module restrictions when emit is disabled", () => {
    const files = new Map<string, string>([
      ["src/file.ts", "export const value = 1;"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/file.ts"], {
      outFile: "bundle.js",
      module: "commonjs",
      noEmit: true,
      ignoreDeprecations: "6.0",
    }, host);

    assert.deepEqual(getProgramDiagnostics(program), []);
  });

  it("prebinds ambient namespaces for self references and function namespace merges", () => {
    const files = new Map<string, string>([
      ["src/db.d.ts", "declare namespace Db { export import Types = Db; } export = Db;"],
      ["src/moment.d.ts", "declare function moment(): moment.Moment; declare namespace moment { interface Moment { valueOf(): number; } } export = moment;"],
      ["src/app.ts", "import * as Db from './db'; import moment = require('./moment'); const value = moment().valueOf();"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/app.ts"], { module: "commonjs" }, host);

    assert.deepEqual(program.sourceFiles.map(file => file.fileName), ["src/app.ts", "src/db.d.ts", "src/moment.d.ts"]);
    assert.deepEqual(getProgramDiagnostics(program), []);
  });

  it("exposes export-equals namespace members through namespace imports", () => {
    const files = new Map<string, string>([
      ["src/api.d.ts", [
        "declare namespace api {",
        "  export const version: string;",
        "  export interface Node { text: string; }",
        "  export namespace nested {",
        "    export const value: number;",
        "    export interface Item { ok: boolean; }",
        "  }",
        "}",
        "export = api;",
      ].join("\n")],
      ["src/app.ts", [
        "import * as api from './api';",
        "const version: string = api.version;",
        "const nestedValue: number = api.nested.value;",
        "const node: api.Node = { text: version };",
        "const item: api.nested.Item = { ok: true };",
      ].join("\n")],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/app.ts"], { module: "commonjs" }, host);

    assert.deepEqual(getProgramDiagnostics(program), []);
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

    const program = createProgram(["/proj/component/file.ts"], { baseUrl: "/proj", ignoreDeprecations: "6.0" }, host);

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

  it("resolves package dependencies from the realpath of symlinked declaration files", () => {
    const files = new Map<string, string>([
      ["/repo/app/src/index.ts", "import { MetadataAccessor } from \"@scope/pkg2\"; const value: MetadataAccessor = new MetadataAccessor();"],
      ["/repo/app/node_modules/@scope/pkg2/index.d.ts", "export { MetadataAccessor } from \"@scope/pkg1\";"],
      ["/repo/pkg2/node_modules/@scope/pkg1/index.d.ts", "export declare class MetadataAccessor {}"],
    ]);
    const realpaths = new Map<string, string>([
      ["/repo/app/node_modules/@scope/pkg2/index.d.ts", "/repo/pkg2/index.d.ts"],
    ]);
    const host: CompilerHost = {
      readFile: fileName => files.get(fileName),
      realpath: fileName => realpaths.get(fileName) ?? fileName,
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["/repo/app/src/index.ts"], {}, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(program.sourceFiles.map(file => file.fileName), [
      "/repo/app/src/index.ts",
      "/repo/app/node_modules/@scope/pkg2/index.d.ts",
      "/repo/pkg2/node_modules/@scope/pkg1/index.d.ts",
    ]);
    assert.deepEqual(diagnostics, []);
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

    const program = createProgram(["src/index.ts"], { module: "system", ignoreDeprecations: "6.0" }, host);

    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.message), ["Cannot find module 'missing-pkg'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?"]);
    assert.deepEqual(program.diagnostics.map(diagnostic => diagnostic.code), [2792]);
  });

  it("uses the AMD-module unresolved import diagnostic for relative and package specifiers", () => {
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "import { local } from \"./missing\"; import { pkg } from \"missing-pkg\";" : undefined,
    };

    const program = createProgram(["src/index.ts"], { module: "amd", ignoreDeprecations: "6.0" }, host);

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

  it("continues semantic checking after empty element access syntax diagnostics", () => {
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "var results = number[];" : undefined,
    };

    const program = createProgram(["src/index.ts"], {}, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [1011, 2693]);
  });

  it("continues semantic checking after recovered type-argument and numeric literal diagnostics", () => {
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "Foo<a,,b>(); 1e; missing;" : undefined,
    };

    const program = createProgram(["src/index.ts"], {}, host);
    const diagnostics = getProgramDiagnostics(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [1124, 1110, 2304, 2304, 2304, 2304]);
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

    const program = createProgram(["src/index.ts"], { module: "system", ignoreDeprecations: "6.0" }, host);

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

    const program = createProgram(["src/index.ts"], { module: "system", allowSyntheticDefaultImports: false, ignoreDeprecations: "6.0", strictNullChecks: true, strictPropertyInitialization: true }, host);
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
