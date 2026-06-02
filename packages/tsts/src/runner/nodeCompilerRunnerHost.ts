/**
 * Concrete `CompilerRunnerHost` backed by the real Node corpus + harness.
 *
 * The host wires the TS-Go-style runner (`compilerRunner.ts`) to:
 *
 *   1. the on-disk TS-Go corpus (resolved via `repo/paths.tsgoTestdataRoot`),
 *   2. the real compile bridge in `testutil/harnessutil`, and
 *   3. the real varyBy configuration matrix in `harnessutil`.
 *
 * No compilation is reimplemented here: `compileFiles` delegates to
 * `harnessutil.compileFiles` and adapts its richer `CompilationResult`
 * into the runner's narrower `CompilationResult` shape.
 *
 * The baseline sink is deliberately injectable. S2 leaves it as an injected
 * callback (default: an honest placeholder that throws); S3 wires the real
 * baseline generators + `BaselineStore` sink.
 */

import { readdirSync, readFileSync, type Dirent } from "node:fs";
import { basename, isAbsolute, join } from "node:path";

import { tsgoTestdataRoot, testDataPath as repoTestDataPath } from "../repo/paths.js";
import {
  compileFiles as harnessCompileFiles,
  getFileBasedTestConfigurations as harnessGetFileBasedTestConfigurations,
  type CompilationResult as HarnessCompilationResult,
  type NamedTestConfiguration as HarnessNamedTestConfiguration,
} from "../testutil/harnessutil/index.js";
import { ParsedCommandLine } from "../tsoptions/parsedCommandLine.js";

import {
  type CompilationResult,
  type CompilerBaseline,
  type CompilerRunnerHost,
  type NamedTestConfiguration,
  type TestConfiguration,
  type TestFile,
} from "./compilerRunner.js";
import { makeCompileFailure } from "./baselineTextProducer.js";
import type { RawCompilerSettings } from "./testCaseParser.js";

/** Sink invoked once per produced baseline. */
export type BaselineSink = (baseline: CompilerBaseline) => void;

const placeholderBaselineSink: BaselineSink = () => {
  throw new Error(
    "nodeCompilerRunnerHost baseline sink not configured. Inject a sink (wired in S3) before running baselines.",
  );
};

export interface NodeCompilerRunnerHostOptions {
  /** Baseline sink. Defaults to an honest placeholder that throws. */
  readonly baselineSink?: BaselineSink;
}

/**
 * Build a concrete `CompilerRunnerHost` over the on-disk TS-Go corpus.
 */
export function newNodeCompilerRunnerHost(options: NodeCompilerRunnerHostOptions = {}): CompilerRunnerHost {
  const baselineSink = options.baselineSink ?? placeholderBaselineSink;
  return {
    enumerateFiles(root, regex, recursive) {
      return enumerateCorpusFiles(root, regex, recursive);
    },
    readFile(path) {
      return readCorpusFile(path);
    },
    testDataPath() {
      return repoTestDataPath();
    },
    compileFiles(toBeCompiled, otherFiles, harnessConfig, currentDirectory, symlinks, tsConfig) {
      return compileFilesAdapter(toBeCompiled, otherFiles, harnessConfig, currentDirectory, symlinks, tsConfig);
    },
    getFileBasedTestConfigurations(settings, varyBy) {
      return getFileBasedTestConfigurations(settings, varyBy);
    },
    skipUnsupportedCompilerOptions() {
      // Option support is enforced by the harness during compilation; there is
      // nothing to mutate here. The runner discards the (void) result.
    },
    baseline(baseline) {
      baselineSink(baseline);
    },
  };
}

/**
 * Resolve a runner-supplied root against the TS-Go corpus. The runner enumerates
 * with relative roots like `tests/cases/conformance`; corpus reads are anchored
 * at `tsgoTestdataRoot()`. Absolute roots are returned unchanged.
 */
function resolveCorpusPath(path: string): string {
  return isAbsolute(path) ? path : join(tsgoTestdataRoot(), path);
}

/**
 * Walk the corpus subtree under `root`, returning sorted file paths whose
 * basename matches `regex` (the runner passes `/\.tsx?$/`). A missing directory
 * yields an empty list so a missing corpus is surfaced (and skipped/required)
 * at the call site, never silently treated as a passing run.
 */
function enumerateCorpusFiles(root: string, regex: RegExp, recursive: boolean): readonly string[] {
  const resolved = resolveCorpusPath(root);
  const out: string[] = [];
  walkCorpus(resolved, regex, recursive, out);
  return out.sort();
}

function walkCorpus(dir: string, regex: RegExp, recursive: boolean, out: string[]): void {
  const entries = readCorpusDir(dir);
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (recursive) walkCorpus(full, regex, recursive, out);
      continue;
    }
    if (regex.test(basename(full))) out.push(full);
  }
}

function readCorpusDir(dir: string): readonly Dirent[] {
  try {
    return readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

/**
 * Read a corpus file. The runner enumerates absolute corpus paths, so reads go
 * straight to disk; missing files return `undefined` so the runner can surface
 * a clear error rather than silently skipping the case.
 */
function readCorpusFile(path: string): string | undefined {
  try {
    return readFileSync(resolveCorpusPath(path), "utf8");
  } catch {
    return undefined;
  }
}

/**
 * Port of the varyBy config matrix. Delegates to the real implementation in
 * `harnessutil` and adapts its `ReadonlyMap`-valued configs to the runner's
 * `Record<string, string>` shape.
 */
function getFileBasedTestConfigurations(
  settings: RawCompilerSettings,
  varyBy: ReadonlySet<string>,
): readonly NamedTestConfiguration[] {
  const harnessConfigurations = harnessGetFileBasedTestConfigurations(settings, varyBy);
  return harnessConfigurations.map(toRunnerNamedConfiguration);
}

function toRunnerNamedConfiguration(named: HarnessNamedTestConfiguration): NamedTestConfiguration {
  return { name: named.name, config: mapToRecord(named.config) };
}

/**
 * Delegate compilation to `harnessutil.compileFiles` and adapt the result to
 * the runner's `CompilationResult`. Compilation itself is never reimplemented.
 */
function compileFilesAdapter(
  toBeCompiled: readonly TestFile[],
  otherFiles: readonly TestFile[],
  harnessConfig: TestConfiguration,
  currentDirectory: string,
  symlinks: ReadonlyMap<string, string>,
  tsConfig: unknown,
): CompilationResult {
  try {
    const result = harnessCompileFiles({
      inputFiles: toBeCompiled,
      otherFiles,
      testConfig: recordToMap(harnessConfig),
      currentDirectory,
      symlinks,
      // The runner does its own file selection from the parsed file names; only a
      // real ParsedCommandLine is meaningful to the harness. The runner's
      // lightweight tsConfig ({ fileNames }) is intentionally not forwarded.
      ...(tsConfig instanceof ParsedCommandLine ? { tsconfig: tsConfig } : {}),
    });
    return adaptCompilationResult(result);
  } catch (error) {
    // A per-case compile failure (e.g. an unsupported config option or a
    // compiler crash) must not abort the whole conformance run. Carry the
    // failure through so it is recorded as a divergence for this case.
    return failedCompilationResult(error);
  }
}

function failedCompilationResult(error: unknown): CompilationResult {
  const message = error instanceof Error ? error.message : String(error);
  return {
    options: {},
    harnessOptions: {},
    diagnostics: [],
    trace: [],
    program: makeCompileFailure(message),
  };
}

function adaptCompilationResult(result: HarnessCompilationResult): CompilationResult {
  return {
    options: result.compilerOptions as Record<string, unknown>,
    harnessOptions: { noTypesAndSymbols: result.harnessOptions.noTypesAndSymbols },
    diagnostics: result.diagnostics,
    trace: splitTrace(result.trace),
    // The runner only declares `program` as opaque `unknown`. We carry the full
    // harness result through it so the baseline producer can read the real
    // diagnostics + emit outputs without re-running compilation. Recovered via
    // `harnessResultFromRunnerResult` in `baselineTextProducer`.
    program: result,
  };
}

function splitTrace(trace: string): readonly string[] {
  if (trace.length === 0) return [];
  return trace.split("\n").filter((line) => line.length > 0);
}

function mapToRecord(map: ReadonlyMap<string, string>): Record<string, string> {
  const record: Record<string, string> = {};
  for (const [key, value] of map) record[key] = value;
  return record;
}

function recordToMap(record: TestConfiguration): ReadonlyMap<string, string> {
  return new Map(Object.entries(record));
}
