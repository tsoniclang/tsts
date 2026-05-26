import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Exception } from "@tsonic/dotnet/System.js";

import { createProgram, emitProgram, type CompilerHost } from "./index.js";

export class ProgramGroundworkTests {
  loads_multiple_root_files_through_a_compiler_host_and_emits_javascript_outputs(): void {
    const files = new Map<string, string>([
      ["src/add.ts", "export function add(a: number, b: number): number { return a + b; }"],
      ["src/value.ts", "export const answer: number = 42;"],
    ]);
    const outputs = new Map<string, string>();
    const host: CompilerHost = {
      getCurrentDirectory: () => ".",
      readFile: (fileName) => files.get(fileName),
      writeFile: (fileName, text) => outputs.set(fileName, text),
    };

    const program = createProgram(["src/add.ts", "src/value.ts"], { outDir: "dist" }, host);
    const result = emitProgram(program, host);

    Assert.Equal(0, program.diagnostics.length);
    Assert.Equal<readonly string[]>(
      ["dist/src/add.js", "dist/src/value.js"],
      result.emittedFiles.map((f) => f.outputFileName),
    );
    Assert.Equal("export const answer = 42;", outputs.get("dist/src/value.js"));
  }

  reports_missing_roots_without_emitting_partial_outputs(): void {
    const outputs = new Map<string, string>();
    const host: CompilerHost = {
      readFile: () => undefined,
      writeFile: (fileName, text) => outputs.set(fileName, text),
    };

    const program = createProgram(["missing.ts"], {}, host);
    const result = emitProgram(program, host);

    Assert.Equal<readonly string[]>(["File not found: missing.ts"], result.diagnostics.map((d) => d.message));
    Assert.Equal(0, outputs.size);
  }

  promotes_bind_diagnostics_to_program_diagnostics_before_emit(): void {
    const host: CompilerHost = {
      readFile: () => "let x; const x = 1;",
      writeFile: () => {
        throw new Exception("emit should not run");
      },
    };

    const program = createProgram(["input.ts"], {}, host);
    const result = emitProgram(program, host);

    Assert.Equal<readonly string[]>(["Duplicate identifier 'x'."], program.diagnostics.map((d) => d.message));
    Assert.Equal(0, result.emittedFiles.length);
  }

  records_parse_diagnostics_per_file_without_aborting_the_whole_program(): void {
    const files = new Map<string, string>([
      ["broken.ts", "const = ;"],
      ["ok.ts", "export const answer = 42;"],
    ]);
    const outputs = new Map<string, string>();
    const host: CompilerHost = {
      readFile: (fileName) => files.get(fileName),
      writeFile: (fileName, text) => outputs.set(fileName, text),
    };

    const program = createProgram(["broken.ts", "ok.ts"], {}, host);
    const result = emitProgram(program, host);

    Assert.Equal(1, program.sourceFiles.length);
    Assert.Equal("ok.ts", program.sourceFiles[0]!.fileName);
    Assert.Equal(1, program.diagnostics.length);
    Assert.Equal("broken.ts", program.diagnostics[0]!.fileName);
    Assert.True(program.diagnostics[0]!.message.includes("Expected token Identifier"));
    Assert.Equal(0, result.emittedFiles.length);
    Assert.Equal(0, outputs.size);
  }

  expands_relative_import_module_specifiers_into_the_program_graph(): void {
    const files = new Map<string, string>([
      ["src/index.ts", "import { value } from \"./dep\"; export const answer = value;"],
      ["src/dep.ts", "export const value = 42;"],
    ]);
    const outputs = new Map<string, string>();
    const host: CompilerHost = {
      getCurrentDirectory: () => ".",
      readFile: (fileName) => files.get(fileName),
      writeFile: (fileName, text) => outputs.set(fileName, text),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], { outDir: "dist" }, host);
    const result = emitProgram(program, host);

    Assert.Equal(0, program.diagnostics.length);
    Assert.Equal<readonly string[]>(["src/index.ts", "src/dep.ts"], program.sourceFiles.map((f) => f.fileName));
    Assert.Equal<readonly string[]>(["dist/src/index.js", "dist/src/dep.js"], result.emittedFiles.map((f) => f.outputFileName));
  }

  resolves_esm_js_specifiers_to_typescript_source_files(): void {
    const files = new Map<string, string>([
      ["src/index.ts", "import { value } from \"./dep.js\"; export const answer = value;"],
      ["src/dep.ts", "export const value = 42;"],
    ]);
    const host: CompilerHost = {
      getCurrentDirectory: () => ".",
      readFile: (fileName) => files.get(fileName),
      useCaseSensitiveFileNames: () => true,
    };

    const program = createProgram(["src/index.ts"], {}, host);

    Assert.Equal(0, program.diagnostics.length);
    Assert.Equal<readonly string[]>(["src/index.ts", "src/dep.ts"], program.sourceFiles.map((f) => f.fileName));
  }

  diagnoses_unresolved_relative_imports(): void {
    const host: CompilerHost = {
      readFile: (fileName) => fileName === "src/index.ts" ? "import { missing } from \"./missing\";" : undefined,
    };

    const program = createProgram(["src/index.ts"], {}, host);
    const result = emitProgram(program, host);

    Assert.Equal<readonly string[]>(["Cannot find module './missing'."], program.diagnostics.map((d) => d.message));
    Assert.Equal(0, result.emittedFiles.length);
  }

  does_not_emit_when_semantic_diagnostics_are_present(): void {
    const outputs = new Map<string, string>();
    const host: CompilerHost = {
      readFile: (fileName) => fileName === "src/index.ts" ? "export function f(): number { return \"x\"; }" : undefined,
      writeFile: (fileName, text) => outputs.set(fileName, text),
    };

    const program = createProgram(["src/index.ts"], {}, host);
    const result = emitProgram(program, host);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
    Assert.Equal(0, outputs.size);
  }
}

A<ProgramGroundworkTests>().method((t) => t.loads_multiple_root_files_through_a_compiler_host_and_emits_javascript_outputs).add(FactAttribute);
A<ProgramGroundworkTests>().method((t) => t.reports_missing_roots_without_emitting_partial_outputs).add(FactAttribute);
A<ProgramGroundworkTests>().method((t) => t.promotes_bind_diagnostics_to_program_diagnostics_before_emit).add(FactAttribute);
A<ProgramGroundworkTests>().method((t) => t.records_parse_diagnostics_per_file_without_aborting_the_whole_program).add(FactAttribute);
A<ProgramGroundworkTests>().method((t) => t.expands_relative_import_module_specifiers_into_the_program_graph).add(FactAttribute);
A<ProgramGroundworkTests>().method((t) => t.resolves_esm_js_specifiers_to_typescript_source_files).add(FactAttribute);
A<ProgramGroundworkTests>().method((t) => t.diagnoses_unresolved_relative_imports).add(FactAttribute);
A<ProgramGroundworkTests>().method((t) => t.does_not_emit_when_semantic_diagnostics_are_present).add(FactAttribute);
