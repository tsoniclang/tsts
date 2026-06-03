/**
 * TS-Go divergence report.
 *
 * The conformance run compares TSTS-generated baseline text against TS-Go's
 * reference baselines and records, per case + kind, whether they match. This
 * module aggregates those per-comparison `BaselineDiff`s into the report shape
 * the maintainer answer file prescribes:
 *
 * ```txt
 * tests/cases/compiler/foo.ts
 *   TSTS baseline:      pass, output unchanged
 *   TS-Go comparison:   mismatch, diagnostic ordering differs
 *   Status:             known divergence
 *   Tracking:           checker-diagnostics-ordering
 * ```
 *
 * Honesty bar (non-negotiable): the report never hides a case and never marks a
 * divergence as success without a recorded reason. Accepted/triaged status is
 * sourced exclusively from an explicit divergence list via `DiffCategorizer`;
 * everything else is reported as `new` or `changed`. Regression status (did
 * TSTS regress from its own accepted baseline) is kept strictly separate from
 * conformance status (does TSTS match the TS-Go reference).
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import type { BaselineDiff, BaselineDiffKind } from "../testutil/baseline/diffParity.js";
import { DiffCategorizer } from "./testCaseParser.js";

/**
 * Status of the TSTS-owned (regression) baseline comparison for one artifact.
 *
 * - `pass` — generated text matched the committed TSTS baseline.
 * - `updated` — baseline was (re)written because an explicit update flag was
 *   set, or no committed baseline existed yet. Surfaced so a green run that
 *   only happened to write fresh baselines is never mistaken for a match.
 * - `mismatch` — generated text differed from the committed TSTS baseline.
 * - `absent` — regression mode was not exercised for this artifact.
 */
export type RegressionStatus = "pass" | "updated" | "mismatch" | "absent";

/** Final conformance classification for a case, after folding its diffs. */
export type DivergenceStatus = "match" | "accepted" | "triaged" | "new" | "changed";

/** One artifact comparison feeding the per-case roll-up. */
export interface DivergenceEntry {
  /** Test case path relative to the corpus (e.g. `tests/cases/compiler/foo.ts`). */
  readonly caseName: string;
  /** Baseline kind that produced this comparison (e.g. `error`, `output`). */
  readonly kind: string;
  /** Regression (TSTS-owned baseline) status for this artifact. */
  readonly regression: RegressionStatus;
  /** TS-Go reference comparison result for this artifact. */
  readonly diff: BaselineDiff;
}

/** Per-case roll-up in the maintainer answer-file shape. */
export interface DivergenceCaseReport {
  readonly caseName: string;
  /** Worst regression status across the case's artifacts. */
  readonly regression: RegressionStatus;
  /** Worst conformance status across the case's artifacts. */
  readonly status: DivergenceStatus;
  /** Explicit tracking id for an accepted/triaged divergence, when listed. */
  readonly tracking?: string;
  /** Human-readable reason for the TS-Go comparison outcome. */
  readonly comparison: string;
  /** The individual artifact comparisons that produced this roll-up. */
  readonly entries: readonly DivergenceEntry[];
}

export interface DivergenceSummary {
  readonly cases: number;
  readonly match: number;
  readonly accepted: number;
  readonly triaged: number;
  readonly new: number;
  readonly changed: number;
  readonly regressed: number;
}

export interface DivergenceReport {
  readonly summary: DivergenceSummary;
  readonly cases: readonly DivergenceCaseReport[];
}

/**
 * Accumulates artifact comparisons during a conformance run.
 *
 * Pure data sink: callers `record` one entry per generated baseline artifact;
 * `build` folds them into the per-case report. No I/O happens here.
 */
export class DivergenceCollector {
  readonly #categorizer: DiffCategorizer;
  readonly #entries: DivergenceEntry[] = [];

  constructor(categorizer: DiffCategorizer) {
    this.#categorizer = categorizer;
  }

  record(entry: DivergenceEntry): void {
    this.#entries.push(entry);
  }

  /** Snapshot of every recorded artifact comparison, in record order. */
  entries(): readonly DivergenceEntry[] {
    return [...this.#entries];
  }

  build(): DivergenceReport {
    return buildDivergenceReport(this.#entries, this.#categorizer);
  }
}

/**
 * Map a TS-Go reference comparison kind, possibly overridden by the explicit
 * accepted/triaged divergence list, to a conformance status. `equal` and
 * `missing` are folded conservatively: an equal artifact contributes `match`,
 * a missing TSTS output is a real `changed` divergence (TS-Go emitted a
 * baseline that TSTS did not), never silently dropped.
 */
function statusForDiff(diff: BaselineDiff, categorizer: DiffCategorizer): DivergenceStatus {
  const categorized = categorizer.categorize(diff.path, diff.kind);
  if (categorized === "accepted") return "accepted";
  if (categorized === "triaged") return "triaged";
  return statusForKind(diff.kind);
}

function statusForKind(kind: BaselineDiffKind): DivergenceStatus {
  if (kind === "equal") return "match";
  if (kind === "accepted") return "accepted";
  if (kind === "triaged") return "triaged";
  if (kind === "new") return "new";
  // `missing` (TS-Go has a baseline, TSTS produced none) is a real divergence.
  return "changed";
}

const statusSeverity: Record<DivergenceStatus, number> = {
  match: 0,
  accepted: 1,
  triaged: 2,
  new: 3,
  changed: 4,
};

const regressionSeverity: Record<RegressionStatus, number> = {
  pass: 0,
  absent: 0,
  updated: 1,
  mismatch: 2,
};

function worstStatus(left: DivergenceStatus, right: DivergenceStatus): DivergenceStatus {
  return statusSeverity[right] > statusSeverity[left] ? right : left;
}

function worstRegression(left: RegressionStatus, right: RegressionStatus): RegressionStatus {
  return regressionSeverity[right] > regressionSeverity[left] ? right : left;
}

function buildDivergenceReport(entries: readonly DivergenceEntry[], categorizer: DiffCategorizer): DivergenceReport {
  const byCase = new Map<string, DivergenceEntry[]>();
  for (const entry of entries) {
    const list = byCase.get(entry.caseName);
    if (list === undefined) byCase.set(entry.caseName, [entry]);
    else list.push(entry);
  }

  const cases = [...byCase.keys()].sort().map((caseName) => buildCaseReport(caseName, byCase.get(caseName)!, categorizer));
  return { summary: summarize(cases), cases };
}

function buildCaseReport(caseName: string, entries: readonly DivergenceEntry[], categorizer: DiffCategorizer): DivergenceCaseReport {
  const status = entries.reduce<DivergenceStatus>((acc, entry) => worstStatus(acc, statusForDiff(entry.diff, categorizer)), "match");
  const regression = entries.reduce<RegressionStatus>((acc, entry) => worstRegression(acc, entry.regression), "absent");
  const tracking = findTracking(entries, categorizer);
  return {
    caseName,
    regression,
    status,
    ...(tracking === undefined ? {} : { tracking }),
    comparison: comparisonReason(entries, categorizer),
    entries,
  };
}

/**
 * Resolve the tracking id from the accepted/triaged divergence list. The list
 * keys on the baseline diff path; the categorizer only returns the bucket, so
 * the tracking id is the listed path itself (stable, greppable). When no entry
 * is listed there is no tracking id, which is correct: an unlisted divergence
 * must not be presented as accepted.
 */
function findTracking(entries: readonly DivergenceEntry[], categorizer: DiffCategorizer): string | undefined {
  for (const entry of entries) {
    const bucket = categorizer.categorize(entry.diff.path, entry.diff.kind);
    if (bucket === "accepted" || bucket === "triaged") return entry.diff.path;
  }
  return undefined;
}

function comparisonReason(entries: readonly DivergenceEntry[], categorizer: DiffCategorizer): string {
  const diverging = entries.filter((entry) => statusForDiff(entry.diff, categorizer) !== "match");
  if (diverging.length === 0) return "match, output unchanged";
  const kinds = [...new Set(diverging.map((entry) => entry.kind))].sort();
  return `mismatch in ${kinds.join(", ")}`;
}

function summarize(cases: readonly DivergenceCaseReport[]): DivergenceSummary {
  const summary = { cases: cases.length, match: 0, accepted: 0, triaged: 0, new: 0, changed: 0, regressed: 0 };
  for (const report of cases) {
    summary[report.status] += 1;
    if (report.regression === "mismatch") summary.regressed += 1;
  }
  return summary;
}

/** Render the per-case answer-file text plus a summary header. */
export function formatDivergenceReport(report: DivergenceReport): string {
  const lines: string[] = [];
  lines.push("# TS-Go divergence report");
  lines.push("");
  lines.push(formatSummaryLine(report.summary));
  lines.push("");
  for (const caseReport of report.cases) {
    lines.push(...formatCaseLines(caseReport));
    lines.push("");
  }
  return lines.join("\n").replace(/\n+$/, "\n");
}

function formatSummaryLine(summary: DivergenceSummary): string {
  return [
    `cases=${summary.cases}`,
    `match=${summary.match}`,
    `accepted=${summary.accepted}`,
    `triaged=${summary.triaged}`,
    `new=${summary.new}`,
    `changed=${summary.changed}`,
    `regressed=${summary.regressed}`,
  ].join(" ");
}

function formatCaseLines(report: DivergenceCaseReport): readonly string[] {
  const lines = [
    report.caseName,
    `  TSTS baseline:      ${regressionText(report.regression)}`,
    `  TS-Go comparison:   ${report.comparison}`,
    `  Status:             ${statusText(report.status)}`,
  ];
  if (report.tracking !== undefined) lines.push(`  Tracking:           ${report.tracking}`);
  return lines;
}

function regressionText(status: RegressionStatus): string {
  if (status === "pass") return "pass, output unchanged";
  if (status === "updated") return "updated, baseline (re)written";
  if (status === "mismatch") return "mismatch, regressed from accepted baseline";
  return "not compared";
}

function statusText(status: DivergenceStatus): string {
  if (status === "match") return "matches TS-Go reference";
  if (status === "accepted") return "accepted divergence";
  if (status === "triaged") return "triaged divergence";
  if (status === "new") return "new divergence (not in TS-Go reference)";
  return "known divergence";
}

export interface DivergenceReportFiles {
  /** Human-readable report path (gitignored scratch). */
  readonly humanPath: string;
  /** Machine-readable JSON report path. */
  readonly machinePath: string;
}

/** Write both the human and machine forms of the report. */
export function writeDivergenceReport(report: DivergenceReport, files: DivergenceReportFiles): void {
  writeFileEnsuringDir(files.humanPath, formatDivergenceReport(report));
  writeFileEnsuringDir(files.machinePath, `${JSON.stringify(report, undefined, 2)}\n`);
}

function writeFileEnsuringDir(path: string, text: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
}
