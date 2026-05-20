/**
 * Test harness types.
 *
 * The harness reads TS-Go-style test files (`.ts` files with `// @directive`
 * comments), runs TSTS against them, and compares emitted baselines against
 * expected baselines in `_testdata/tsgo/baselines/reference/`.
 *
 * Pass-rate against TS-Go's baseline set is the project's truth-meter for
 * compatibility. See `.analysis/first-cut/04-test-infrastructure.md` for
 * full design.
 */

/**
 * Compiler-affecting directive recognized in test files. Mirrors TS-Go's
 * set; TSTS supports a growing subset.
 */
export interface TestDirectives {
  readonly target?: string;
  readonly module?: string;
  readonly strict?: boolean;
  readonly strictNullChecks?: boolean;
  readonly strictFunctionTypes?: boolean;
  readonly strictBindCallApply?: boolean;
  readonly strictPropertyInitialization?: boolean;
  readonly noImplicitAny?: boolean;
  readonly noImplicitThis?: boolean;
  readonly alwaysStrict?: boolean;
  readonly useUnknownInCatchVariables?: boolean;
  readonly noEmit?: boolean;
  readonly noTypesAndSymbols?: boolean;
  readonly declaration?: boolean;
  readonly sourceMap?: boolean;
  readonly declarationMap?: boolean;
  readonly emitDeclarationOnly?: boolean;
  readonly experimentalDecorators?: boolean;
  readonly emitDecoratorMetadata?: boolean;
  readonly esModuleInterop?: boolean;
  readonly allowSyntheticDefaultImports?: boolean;
  readonly isolatedModules?: boolean;
  readonly jsx?: string;
  readonly lib?: readonly string[];
  readonly noEmitOnError?: boolean;
  readonly moduleResolution?: string;
  readonly verbatimModuleSyntax?: boolean;
  readonly skipDefaultLibCheck?: boolean;
  readonly skipLibCheck?: boolean;
  /** Unknown directives the harness encountered; useful for debugging untracked options. */
  readonly unknown?: ReadonlyMap<string, string>;
}

/**
 * One file slice within a multi-file test.
 *
 * Tests use `// @Filename: foo.ts` to switch the active output file.
 */
export interface TestFile {
  readonly fileName: string;
  readonly content: string;
}

/**
 * Parsed test input.
 */
export interface TestCase {
  /** Path to the .ts test file on disk. */
  readonly testPath: string;
  /** Canonical test name (e.g., "compiler/invalidGlobalAugmentation"). */
  readonly testName: string;
  /** Directives extracted from `// @...` comments. */
  readonly directives: TestDirectives;
  /** All file slices in the test (one or more). */
  readonly files: readonly TestFile[];
}

/**
 * One baseline file expected from running the test.
 */
export interface BaselineSpec {
  /** Baseline kind: js, dts, symbols, types, errors, source-map. */
  readonly kind: BaselineKind;
  /** Name of the baseline file (e.g., "foo.js", "foo.symbols"). */
  readonly name: string;
  /** Expected content; undefined if no baseline exists (test produces no such output). */
  readonly expected: string | undefined;
}

export type BaselineKind =
  | "js"           // .js output
  | "dts"          // .d.ts output
  | "jsMap"        // .js.map
  | "dtsMap"       // .d.ts.map
  | "symbols"      // .symbols (symbol table dump)
  | "types"        // .types (inferred-type dump)
  | "errors"       // .errors.txt (diagnostic output)
  | "sourceMap";   // .sourcemap.txt (human-readable source map)

/**
 * Result of running one test.
 */
export interface TestResult {
  readonly testName: string;
  readonly status: TestStatus;
  readonly diffs: readonly BaselineDiff[];
  readonly elapsedMs: number;
  readonly error?: string;
}

export type TestStatus =
  | "pass"        // all baselines match
  | "fail"        // at least one baseline diffs
  | "skip"        // test skipped (filter, opt-out)
  | "error";      // harness error (couldn't load test, internal error)

/**
 * One baseline diff.
 */
export interface BaselineDiff {
  readonly baselineName: string;
  readonly category: DiffCategory;
  readonly diff: string;
}

export type DiffCategory =
  | "accepted"     // appears in submoduleAccepted.txt — intentional difference
  | "triaged"      // appears in submoduleTriaged.txt — known bug, tracked
  | "new";         // not categorized — a regression

/**
 * Overall harness run summary.
 */
export interface RunSummary {
  readonly totalTests: number;
  readonly passed: number;
  readonly failed: number;
  readonly skipped: number;
  readonly errored: number;
  readonly elapsedMs: number;
  readonly results: readonly TestResult[];
}
