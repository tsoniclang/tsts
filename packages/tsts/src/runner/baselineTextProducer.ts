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

import { getBaseFileName } from "../tspath/index.js";
import type { CompilationResult as HarnessCompilationResult, NamedSource, TestFile } from "../testutil/harnessutil/index.js";
import { noContent } from "../testutil/baseline/baseline.js";
import { getErrorBaseline, type BaselineDiagnostic } from "../testutil/tsbaseline/errorBaseline.js";
import { buildJSEmitBaseline } from "../testutil/tsbaseline/jsEmitBaseline.js";
import { lineAndCharacterOfPosition } from "../testutil/tsbaseline/util.js";

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
    const extension = baseline.kind === "output" ? ".js" : ".errors.txt";
    return [{ kind: `${baseline.kind} (compile-failed)`, extension, text: `${compileFailurePrefix}${failure.message}` }];
  }
  const result = harnessResultFromRunnerResult(baseline.result.program);
  switch (baseline.kind) {
    case "error":
      return [produceErrorBaseline(baseline, result)];
    case "output":
      return [produceOutputBaseline(baseline, result)];
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
