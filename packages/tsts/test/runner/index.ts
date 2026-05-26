/**
 * Test harness for byte-for-byte compatibility with TS-Go's test suite.
 *
 * Status: skeleton. Types, directive parsing, and diff categorization are
 * in place. Still missing:
 *
 *   - Test loader (walks `_testdata/tsgo/tests/cases/`, reads test files)
 *   - Baseline generators (TSTS's outputs in TS-Go's baseline formats:
 *     .js, .symbols, .types, .errors.txt, .js.map)
 *   - Compilation invocation (wire TSTS compile pipeline)
 *   - Baseline comparison (diff vs expected, with categorization)
 *   - Reporter (per-test results, pass-rate aggregation)
 *   - CLI entry (`tsx test/runner/cli.ts run --tier smoke`)
 *
 * The test data itself (`_testdata/tsgo/`) and the upstream TypeScript
 * submodule (`_submodules/TypeScript`) are not yet vendored. When they
 * arrive, this harness completes its baseline loop.
 *
 * See `.analysis/first-cut/04-test-infrastructure.md` for the full design.
 */

export type {
  BaselineDiff,
  BaselineKind,
  BaselineSpec,
  DiffCategory,
  RunSummary,
  TestCase,
  TestDirectives,
  TestFile,
  TestResult,
  TestStatus,
} from "./types.js";

export { parseTestCase } from "./directives.js";
export { DiffCategorizer } from "./diff-categorizer.js";
