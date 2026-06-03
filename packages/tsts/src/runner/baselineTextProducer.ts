/**
 * Baseline text producer for the TS-Go compiler runner.
 *
 * Bridges a runner `CompilerBaseline` (which carries the full harness
 * `CompilationResult` through its opaque `program` slot) to the generated
 * baseline text the sink compares. The text itself is produced exclusively by
 * the real `tsbaseline` generators — this module never reformats or recompiles;
 * it only adapts the harness result shape into the generators' pure-text APIs.
 *
 * Coverage is explicit and honest. Only the kinds wired here produce baseline
 * text:
 *
 *   - `error`  → `.errors.txt` via `getErrorBaseline`
 *   - `output` → `.js`         via `buildJSEmitBaseline`
 *
 * Any other runner kind (`types-and-symbols`, `sourcemap`, `sourcemap-record`,
 * `module-resolution`, `union-ordering`, `parent-pointers`) is NOT yet wired
 * through a pure-text generator. Rather than silently dropping it (which would
 * hide a case) or pretending it passed, `produceBaselineText` throws
 * `UnsupportedBaselineKindError`. The conformance sink catches that and records
 * an explicit `unimplemented` divergence so the gap is visible as data; the
 * regression smoke set never asks for an unwired kind.
 */

import type { Diagnostic } from "../diagnostics/index.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";

import type { Node as AstNode, SourceFile, Symbol as AstSymbol } from "../ast/index.js";
import type { Program } from "../compiler/program.js";
import type { Checker } from "../checker/index.js";
import { getBaseFileName } from "../tspath/index.js";
import type { CompilationResult as HarnessCompilationResult, NamedSource, TestFile } from "../testutil/harnessutil/index.js";
import { noContent } from "../testutil/baseline/baseline.js";
import { getErrorBaseline, type BaselineDiagnostic } from "../testutil/tsbaseline/errorBaseline.js";
import { buildJSEmitBaseline } from "../testutil/tsbaseline/jsEmitBaseline.js";
import {
  entriesFromTypeWriterWalker,
  generateBaseline,
  newTypeWriterWalker,
  type TypeWriterProgram,
} from "../testutil/tsbaseline/typeSymbolBaseline.js";
import { lineAndCharacterOfPosition, removeTestPathPrefixes } from "../testutil/tsbaseline/util.js";

import type { CompilerBaseline } from "./compilerRunner.js";
import type { GeneratedBaseline } from "./baselineSink.js";

/** Thrown when a runner baseline kind has no wired pure-text generator yet. */
export class UnsupportedBaselineKindError extends Error {
  readonly kind: string;
  constructor(kind: string) {
    super(`baseline kind '${kind}' has no wired text producer yet`);
    this.name = "UnsupportedBaselineKindError";
    this.kind = kind;
  }
}

/**
 * Sentinel the node host stores in the runner result's `program` slot when the
 * harness throws before producing a `CompilationResult` (e.g. an unsupported
 * config option). The conformance run must surface every case — a per-case
 * compile failure becomes a recorded divergence, never an aborted suite.
 */
export interface CompileFailure {
  readonly compileFailure: true;
  readonly message: string;
}

const compileFailurePrefix = "<tsts: compile failed> ";

export function makeCompileFailure(message: string): CompileFailure {
  return { compileFailure: true, message };
}

function asCompileFailure(program: unknown): CompileFailure | undefined {
  if (program !== null && typeof program === "object" && (program as Partial<CompileFailure>).compileFailure === true) {
    return program as CompileFailure;
  }
  return undefined;
}

/**
 * Recover the full harness `CompilationResult` the node host stashed in the
 * runner result's opaque `program` slot. Throws if the result was not produced
 * by `nodeCompilerRunnerHost` (a programmer error, never a silent skip).
 */
export function harnessResultFromRunnerResult(program: unknown): HarnessCompilationResult {
  if (program === undefined || program === null || typeof program !== "object") {
    throw new Error("baseline producer expected the harness CompilationResult in the runner result's program slot");
  }
  const candidate = program as Partial<HarnessCompilationResult>;
  if (candidate.js === undefined || candidate.diagnostics === undefined || candidate.compilerOptions === undefined) {
    throw new Error("baseline producer expected a harness CompilationResult; got an unrecognized program payload");
  }
  return program as HarnessCompilationResult;
}

/**
 * Produce the generated baseline artifacts for one `CompilerBaseline`. Wired as
 * the sink's `BaselineTextProducer`.
 */
export function produceBaselineText(baseline: CompilerBaseline): readonly GeneratedBaseline[] {
  const failure = asCompileFailure(baseline.result.program);
  if (failure !== undefined) {
    // The harness could not compile this case. Surface the failure as the
    // artifact text for the requested kind so it is recorded as a divergence
    // against the TS-Go reference rather than aborting the whole run.
    const text = `${compileFailurePrefix}${failure.message}`;
    if (baseline.kind === "types-and-symbols") {
      // Keep the `.types`/`.symbols` split consistent with the success path so
      // the channel names line up and each failure compares against its own
      // reference extension instead of a spurious `.errors.txt`.
      return [
        { kind: "types-and-symbols (types) (compile-failed)", extension: ".types", text },
        { kind: "types-and-symbols (symbols) (compile-failed)", extension: ".symbols", text },
      ];
    }
    const extension = baseline.kind === "output" ? ".js" : ".errors.txt";
    return [{ kind: `${baseline.kind} (compile-failed)`, extension, text }];
  }
  const result = harnessResultFromRunnerResult(baseline.result.program);
  switch (baseline.kind) {
    case "error":
      return [produceErrorBaseline(baseline, result)];
    case "output":
      return [produceOutputBaseline(baseline, result)];
    case "types-and-symbols":
      return produceTypesAndSymbolsBaseline(baseline, result);
    default:
      throw new UnsupportedBaselineKindError(baseline.kind);
  }
}

function produceErrorBaseline(baseline: CompilerBaseline, result: HarnessCompilationResult): GeneratedBaseline {
  const diagnostics = result.diagnostics.map(toBaselineDiagnostic);
  const text = diagnostics.length === 0
    ? noContent
    : getErrorBaseline(toNamedSources(baseline.files), diagnostics, false);
  return { kind: "error", extension: ".errors.txt", text };
}

function produceOutputBaseline(baseline: CompilerBaseline, result: HarnessCompilationResult): GeneratedBaseline {
  // JS emit is attempted separately from the checker (see `compileFilesEx`). When
  // it throws (e.g. an unsupported statement kind the JS printer does not yet
  // handle), only this js/output channel records the failure; the errors/types/
  // symbols channels above still produce real comparisons. We mark it with the
  // ` (compile-failed)` channel suffix so the divergence report attributes the
  // failure to the js channel honestly instead of fabricating emit output.
  if (result.emitFailure !== undefined) {
    return {
      kind: "output (compile-failed)",
      extension: ".js",
      text: `${compileFailurePrefix}${result.emitFailure}`,
    };
  }
  const js = mapToNamedSources(result.js);
  const dts = mapToNamedSources(result.dts);
  const diagnostics = result.diagnostics.map(toBaselineDiagnostic);
  const text = js.length === 0 && dts.length === 0 && diagnostics.length === 0
    ? noContent
    : buildJSEmitBaseline(
      {
        baselinePath: baseline.testName,
        header: baseline.testName,
        result: { js, dts, diagnostics },
        toBeCompiled: toNamedSources(baseline.files),
        options: { baselineRoot: "" },
      },
      diagnostics,
    );
  return { kind: "output", extension: ".js", text };
}

/**
 * Produce the `.types` and `.symbols` baseline artifacts for one case.
 *
 * The real `TypeWriterWalker` (the producer that already exists in
 * `tsbaseline/typeSymbolBaseline`) walks each source file's expression /
 * identifier nodes and asks a `TypeWriterProgram` for the type/symbol string at
 * each node. We back that `TypeWriterProgram` with the REAL checker from the
 * harness `Program`: type strings come from
 * `checker.typeToString(checker.getTypeAtLocation(node))` and symbols from
 * `checker.getSymbolAtLocation(node)`. No placeholder text is invented — when
 * the checker yields no type/symbol for a node, the walker simply omits it (the
 * same shape TS-Go uses for an unresolved node), so the conformance diff is an
 * honest match/changed count.
 */
function produceTypesAndSymbolsBaseline(baseline: CompilerBaseline, result: HarnessCompilationResult): readonly GeneratedBaseline[] {
  const files = toNamedSources(baseline.files);
  const header = typesAndSymbolsHeader(baseline, result);
  const hadErrorBaseline = result.diagnostics.length > 0;
  const writerProgram = newTypeWriterProgram(result.program);
  const walker = newTypeWriterWalker(writerProgram, hadErrorBaseline);
  const typeEntries = entriesFromTypeWriterWalker(files, walker, false);
  const symbolEntries = entriesFromTypeWriterWalker(files, walker, true);
  return [
    { kind: "types-and-symbols (types)", extension: ".types", text: generateBaseline(files, typeEntries, header, false) },
    { kind: "types-and-symbols (symbols)", extension: ".symbols", text: generateBaseline(files, symbolEntries, header, true) },
  ];
}

/**
 * The baseline header is the corpus test path made portable, matching the
 * `//// [<path>] ////` line TS-Go writes at the top of a `.types`/`.symbols`
 * baseline (e.g. `tests/cases/conformance/simpleTest.ts`). TS-Go uses the test
 * file path here — NOT the per-config test name and NOT the virtual `/.src/`
 * unit name — so we render `baseline.testPath` through `removeTestPathPrefixes`.
 * Falls back to the configured test name when no test path is available.
 */
function typesAndSymbolsHeader(baseline: CompilerBaseline, result: HarnessCompilationResult): string {
  void result;
  if (baseline.testPath.length > 0) return removeTestPathPrefixes(baseline.testPath, false);
  return baseline.testName;
}

/**
 * Adapt the harness `Program` (and its real checker) to the narrow
 * `TypeWriterProgram` surface the walker consumes. The checker is acquired once
 * and held for the life of the walk; queries are guarded so a node the checker
 * cannot resolve yields `undefined` (omitted) rather than crashing the run.
 */
function newTypeWriterProgram(program: Program): TypeWriterProgram {
  const { checker } = program.getTypeChecker({});
  return {
    getSourceFile(fileName: string): SourceFile | undefined {
      return program.getSourceFile(fileName);
    },
    getTypeAtLocation(node: AstNode): string | undefined {
      try {
        const type = checker.getTypeAtLocation(node);
        if (type === undefined) return undefined;
        const text = checker.typeToString(type);
        return text.length === 0 ? undefined : text;
      } catch {
        return undefined;
      }
    },
    getSymbolAtLocation(node: AstNode): AstSymbol | undefined {
      try {
        return checker.getSymbolAtLocation(node);
      } catch {
        return undefined;
      }
    },
    symbolToString(symbol: AstSymbol): string {
      return (symbol as { name?: string }).name ?? "";
    },
  };
}

function toNamedSources(files: readonly TestFile[]): readonly NamedSource[] {
  return files.map((file) => ({ name: file.unitName, content: file.content }));
}

function mapToNamedSources(files: ReadonlyMap<string, TestFile>): readonly NamedSource[] {
  return [...files.values()]
    .map((file) => ({ name: getBaseFileName(file.unitName), content: file.content }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

/**
 * Map a compiler `Diagnostic` to the `BaselineDiagnostic` shape the error
 * generator consumes. Line/character are derived from the diagnostic's source
 * file via the same `lineAndCharacterOfPosition` helper the generators use, so
 * locations line up with the reference baselines.
 */
function toBaselineDiagnostic(diagnostic: Diagnostic): BaselineDiagnostic {
  const fileName = diagnostic.file?.fileName;
  const start = diagnostic.start;
  const lineCharacter = diagnostic.file !== undefined && start !== undefined
    ? lineAndCharacterOfPosition(diagnostic.file.text, start)
    : undefined;
  return {
    ...(fileName === undefined ? {} : { fileName }),
    message: diagnostic.text,
    code: diagnostic.code,
    category: categoryName(diagnostic.category),
    ...(start === undefined ? {} : { start }),
    ...(diagnostic.length === undefined ? {} : { length: diagnostic.length }),
    ...(lineCharacter === undefined ? {} : { line: lineCharacter[0], character: lineCharacter[1] }),
    ...(diagnostic.relatedInformation === undefined
      ? {}
      : { relatedInformation: diagnostic.relatedInformation.map(toBaselineDiagnostic) }),
  };
}

function categoryName(category: DiagnosticCategory): string {
  if (category === DiagnosticCategory.Warning) return "warning";
  if (category === DiagnosticCategory.Suggestion) return "suggestion";
  if (category === DiagnosticCategory.Message) return "message";
  return "error";
}
