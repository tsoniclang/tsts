/**
 * Baseline sink for the TS-Go compiler runner.
 *
 * The runner emits one `CompilerBaseline` per artifact kind per case
 * (error / output / sourcemap / types-and-symbols / module-resolution / ...).
 * This sink turns each into generated baseline text and routes it through two
 * independent comparisons:
 *
 *   REGRESSION mode  — compare the generated text against the TSTS-OWNED
 *     baseline committed under `testdata/baselines/reference/<suite>/` via
 *     `BaselineStore.assert`. Comparison only; the store writes/accepts a
 *     baseline solely when an explicit update flag is set. We NEVER
 *     auto-regenerate to hide a mismatch.
 *
 *   CONFORMANCE mode — compare the SAME generated text against the TS-Go
 *     reference baseline at
 *     `tsgoReferenceRoot()/<suite>/<configuredName-with-kind-ext>` using
 *     `getBaselineDiff` + `classifyBaselineDiff`, and feed the resulting
 *     `BaselineDiff` into a `DivergenceCollector`.
 *
 * The two states are kept strictly separate: regression-green (TSTS did not
 * regress from its own accepted behavior) is not conformance-complete (TSTS
 * matches the TS-Go reference). A mismatch in either mode is recorded as data,
 * never silently dropped.
 *
 * Text production is delegated to a `BaselineTextProducer` keyed by kind. The
 * producer is backed by the real `tsbaseline` generators; the sink itself
 * never reimplements baseline formatting or compilation. An unsupported kind is
 * surfaced as an explicit gap, never treated as a pass.
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { BaselineStore, getBaselineDiff, noContent } from "../testutil/baseline/baseline.js";
import { classifyBaselineDiff, type BaselineDiff, type BaselineDiffLists } from "../testutil/baseline/diffParity.js";
import { normalizeNewlines } from "../testutil/stringtestutil/stringTestUtil.js";

import type { CompilerBaseline } from "./compilerRunner.js";
import type { BaselineSink } from "./nodeCompilerRunnerHost.js";
import { DivergenceCollector, type RegressionStatus } from "./divergenceReport.js";

/**
 * Generated baseline artifact: a logical `kind` (the runner kind plus, for
 * `types-and-symbols`, the `.types`/`.symbols` split), the file extension that
 * names it, and the text. `text === noContent` means the generator produced no
 * baseline (e.g. no diagnostics, no emit); it is still compared, never skipped.
 */
export interface GeneratedBaseline {
  readonly kind: string;
  /** Extension that replaces the case's `.ts`/`.tsx`, e.g. `.errors.txt`. */
  readonly extension: string;
  readonly text: string;
}

/**
 * Produces the generated baseline artifacts for one `CompilerBaseline`. Returns
 * an empty array only when the kind genuinely yields nothing (the runner
 * already gates emit/types/module-resolution before calling the sink).
 */
export type BaselineTextProducer = (baseline: CompilerBaseline) => readonly GeneratedBaseline[];

export interface BaselineSinkConfig {
  /** Root of the committed TSTS-owned regression baselines. */
  readonly regressionBaselineRoot: string;
  /** Root of the TS-Go reference baselines (`<corpus>/baselines/reference`). */
  readonly conformanceReferenceRoot: string;
  /** Run REGRESSION comparison against TSTS-owned baselines. */
  readonly regression: boolean;
  /** Run CONFORMANCE comparison against TS-Go reference baselines. */
  readonly conformance: boolean;
  /**
   * Write/accept TSTS-owned baselines instead of comparing. Off by default so a
   * mismatch is never silently overwritten. Only an explicit caller flag flips
   * this.
   */
  readonly update?: boolean;
  /** Explicit accepted/triaged divergence lists for conformance classification. */
  readonly diffLists: BaselineDiffLists;
  /** Collector that receives one entry per conformance comparison. */
  readonly collector: DivergenceCollector;
  /** Produces generated baseline text per kind. Backed by `tsbaseline`. */
  readonly produce: BaselineTextProducer;
}

const tsExtensionPattern = /\.tsx?$/;

/**
 * Build the `BaselineSink` callback the node host injects into the runner.
 */
export function newBaselineSink(config: BaselineSinkConfig): BaselineSink {
  const regressionStore = new BaselineStore({
    baselineRoot: config.regressionBaselineRoot,
    update: config.update === true,
  });
  return (baseline) => {
    for (const generated of config.produce(baseline)) {
      const regression = config.regression
        ? compareRegression(regressionStore, baseline, generated)
        : "absent";
      if (config.conformance) {
        const diff = compareConformance(config.conformanceReferenceRoot, baseline, generated);
        config.collector.record({ caseName: baseline.testName, kind: generated.kind, regression, diff });
      }
    }
  };
}

/**
 * Compare generated text against the committed TSTS-owned baseline. The store
 * only writes when `update` is set; otherwise it asserts equality and throws on
 * mismatch (surfaced by the test runner as a real regression failure).
 */
function compareRegression(store: BaselineStore, baseline: CompilerBaseline, generated: GeneratedBaseline): RegressionStatus {
  const relativePath = regressionRelativePath(baseline, generated);
  const result = store.assert(relativePath, generated.text);
  // `changed` means the store wrote (update flag set or no committed baseline);
  // otherwise the generated text matched the committed TSTS baseline.
  return result.changed ? "updated" : "pass";
}

/**
 * Compare generated text against the TS-Go reference baseline and classify the
 * resulting diff. A missing reference file is `noContent`, so a TSTS artifact
 * that TS-Go does not have is reported as `new`, and an artifact TS-Go has but
 * TSTS lacks is reported as `missing` — neither is hidden.
 */
function compareConformance(referenceRoot: string, baseline: CompilerBaseline, generated: GeneratedBaseline): BaselineDiff {
  const referencePath = conformanceReferencePath(referenceRoot, baseline, generated);
  const expected = readReference(referencePath);
  const actual = generated.text;
  const diffPath = conformanceDiffPath(baseline, generated);
  const kind = classifyBaselineDiff(diffPath, normalizeForCompare(expected), normalizeForCompare(actual), { accepted: new Set(), triaged: new Set() });
  const diff: BaselineDiff = {
    path: diffPath,
    kind,
    ...(expected === undefined ? {} : { expected }),
    ...(actual === noContent ? {} : { actual }),
  };
  return diff;
}

/**
 * Reference baselines are flat: case basename + config-variation suffix + kind
 * extension, under `<referenceRoot>/<suite>/`. Conformance subdirectories in
 * the corpus are flattened, matching TS-Go reference filenames.
 */
function conformanceReferencePath(referenceRoot: string, baseline: CompilerBaseline, generated: GeneratedBaseline): string {
  return join(referenceRoot, baseline.suiteName, baselineFileName(baseline, generated));
}

function conformanceDiffPath(baseline: CompilerBaseline, generated: GeneratedBaseline): string {
  return `${baseline.suiteName}/${baselineFileName(baseline, generated)}`.replace(/\\/g, "/");
}

function regressionRelativePath(baseline: CompilerBaseline, generated: GeneratedBaseline): string {
  return join(baseline.suiteName, baselineFileName(baseline, generated));
}

function baselineFileName(baseline: CompilerBaseline, generated: GeneratedBaseline): string {
  return baseline.testName.replace(tsExtensionPattern, generated.extension);
}

function readReference(path: string): string | undefined {
  if (!existsSync(path)) return undefined;
  return normalizeNewlines(readFileSync(path, "utf8"));
}

/**
 * Normalize text for the conformance comparison. `noContent` (the generator's
 * "no baseline" sentinel) maps to `undefined` so it lines up with a missing
 * reference file rather than producing a spurious diff.
 */
function normalizeForCompare(text: string | undefined): string | undefined {
  if (text === undefined) return undefined;
  if (text === noContent) return undefined;
  return text;
}

/**
 * Build the TS-Go reference diff text for a generated artifact. Exposed so a
 * conformance run can persist the actual unified diff alongside the report.
 */
export function conformanceDiffText(referenceRoot: string, baseline: CompilerBaseline, generated: GeneratedBaseline): string {
  const expected = readReference(conformanceReferencePath(referenceRoot, baseline, generated)) ?? noContent;
  return getBaselineDiff(generated.text, expected, baselineFileName(baseline, generated));
}
