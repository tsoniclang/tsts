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
import { normalizeBaselineText } from "../testutil/baseline/diffParity.js";
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
  /**
   * Final truth metric: a case counts here only if EVERY channel matches.
   * Unimplemented and compile-failed channels count as NOT-match, so this may
   * remain `0` until every required channel is implemented. Out of `cases`.
   */
  readonly strictCaseMatch: number;
  /**
   * Progress metric: a case counts here if every IMPLEMENTED channel matches,
   * EXCLUDING unimplemented channels from the judgement. Not final parity. Out
   * of `cases`.
   */
  readonly implementedCaseMatch: number;
}

/**
 * Per-channel aggregation across every case. The base channel is derived by
 * stripping the ` (unimplemented)`/` (compile-failed)` suffix from each entry's
 * kind; `implemented` is `false` only when at least one of the channel's entries
 * carried the ` (unimplemented)` suffix. Unimplemented channels stay visible in
 * the table — they are never silently dropped.
 */
export interface ChannelSummary {
  readonly channel: string;
  readonly implemented: boolean;
  /** Entries on this channel that were actually compared (implemented). */
  readonly compared: number;
  readonly match: number;
  readonly changed: number;
  readonly new: number;
  readonly missing: number;
  /** Entries on this channel marked ` (unimplemented)` (not compared). */
  readonly unimplemented: number;
}

/**
 * One row of a top-N cluster table: a stable signature shared by `count`
 * diverging entries, with an `example` case name so the cluster is greppable.
 */
export interface ClusterRow {
  /** Stable signature the diverging entries were grouped by. */
  readonly signature: string;
  /** Number of diverging entries that share this signature. */
  readonly count: number;
  /** One example case name carrying this signature, for navigation. */
  readonly example: string;
}

/**
 * A top-N cluster table for one channel. `available` is `false` when no
 * diverging entry on the channel carried enough diff text to derive a
 * signature; in that case `rows` is empty and the report renders an explicit
 * "clustering not available" note rather than faking clusters.
 */
export interface ClusterTable {
  /** Whether any signature could be derived from the diverging entries. */
  readonly available: boolean;
  readonly rows: readonly ClusterRow[];
}

/**
 * Top-cluster view of the report: the channels with the most `changed` entries,
 * plus per-channel signature clusters for the two implemented text channels we
 * can cluster from diff text (`output` → `.js`, `error` → `.errors`).
 */
export interface ClusterReport {
  /** Channels with the most `changed` entries (top 5), highest first. */
  readonly topChangedChannels: readonly ChannelSummary[];
  /** Top `.js` (output channel) divergence clusters. */
  readonly outputClusters: ClusterTable;
  /** Top `.errors` (error channel) divergence clusters. */
  readonly errorClusters: ClusterTable;
}

export interface DivergenceReport {
  readonly summary: DivergenceSummary;
  readonly channelSummary: readonly ChannelSummary[];
  readonly clusters: ClusterReport;
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

const unimplementedSuffix = " (unimplemented)";
const compileFailedSuffix = " (compile-failed)";

/**
 * Decompose an entry `kind` into the base channel name and an `implemented`
 * flag. The conformance producer suffixes a kind with ` (unimplemented)` when no
 * text generator is wired (the channel is not implemented) and with
 * ` (compile-failed)` when the harness could not compile the case (the channel
 * IS implemented; the case is a real divergence). Anything else is a bare,
 * implemented channel name.
 */
function parseChannel(kind: string): { readonly channel: string; readonly implemented: boolean } {
  if (kind.endsWith(unimplementedSuffix)) {
    return { channel: kind.slice(0, -unimplementedSuffix.length), implemented: false };
  }
  if (kind.endsWith(compileFailedSuffix)) {
    return { channel: kind.slice(0, -compileFailedSuffix.length), implemented: true };
  }
  return { channel: kind, implemented: true };
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
  const channelSummary = summarizeChannels(entries);
  const caseMetrics = caseMatchMetrics([...byCase.values()]);
  const clusters = buildClusterReport(entries, channelSummary);
  return { summary: summarize(cases, caseMetrics), channelSummary, clusters, cases };
}

const topClusterLimit = 5;

/**
 * Cluster signatures of the diverging entries on the two implemented text
 * channels we can derive a signature from, plus the top changed channels.
 *
 * An entry "diverges" for clustering when it is on an implemented channel and
 * its diff kind is `changed` (a real text difference against the reference).
 * `new`/`missing`/`equal` are excluded: a missing/extra artifact has no diff
 * text to cluster, and an equal one is not a divergence.
 */
function buildClusterReport(entries: readonly DivergenceEntry[], channelSummary: readonly ChannelSummary[]): ClusterReport {
  const topChangedChannels = [...channelSummary]
    .filter((channel) => channel.changed > 0)
    .sort((left, right) => right.changed - left.changed || (left.channel < right.channel ? -1 : 1))
    .slice(0, topClusterLimit);
  return {
    topChangedChannels,
    outputClusters: clusterChannel(entries, "output", outputSignature),
    errorClusters: clusterChannel(entries, "error", errorSignature),
  };
}

/**
 * Group the diverging entries on `channel` by `signature` and return the top
 * clusters. `available` is `false` when no diverging entry yielded a signature
 * (the entries lacked usable diff text), so the renderer can be explicit
 * instead of inventing clusters.
 */
function clusterChannel(
  entries: readonly DivergenceEntry[],
  channel: string,
  signature: (diff: BaselineDiff) => string | undefined,
): ClusterTable {
  const diverging = entries.filter((entry) => {
    const parsed = parseChannel(entry.kind);
    return parsed.channel === channel && parsed.implemented && entry.diff.kind === "changed";
  });
  const counts = new Map<string, { count: number; example: string }>();
  for (const entry of diverging) {
    const signatureText = signature(entry.diff);
    if (signatureText === undefined) continue;
    const current = counts.get(signatureText);
    if (current === undefined) counts.set(signatureText, { count: 1, example: entry.caseName });
    else current.count += 1;
  }
  if (counts.size === 0) {
    // No diverging entry carried diff text we could cluster. Distinguish "no
    // divergences at all" (available, empty) from "divergences exist but lack
    // diff text" (not available) so the note is only shown when honest.
    return { available: diverging.length === 0, rows: [] };
  }
  const rows = [...counts.entries()]
    .map(([signatureText, value]) => ({ signature: signatureText, count: value.count, example: value.example }))
    .sort((left, right) => right.count - left.count || (left.signature < right.signature ? -1 : 1))
    .slice(0, topClusterLimit);
  return { available: true, rows };
}

const errorCodePattern = /error (TS\d+)/;

/**
 * Signature for an `.errors` divergence: the leading TS error code of the
 * actual text (e.g. `TS2322`). Falls back to the first non-empty actual line
 * when no `error TS####` code is present, and is `undefined` when there is no
 * actual text to read.
 */
function errorSignature(diff: BaselineDiff): string | undefined {
  const actual = diff.actual;
  if (actual === undefined) return undefined;
  const match = errorCodePattern.exec(actual);
  if (match !== null) return match[1]!;
  return firstNonEmptyLine(actual);
}

/**
 * Signature for a `.js` (output) divergence: a short normalized signature built
 * from the first differing line between expected and actual. `undefined` when
 * neither side carries text (nothing to cluster on).
 */
function outputSignature(diff: BaselineDiff): string | undefined {
  const expected = diff.expected;
  const actual = diff.actual;
  if (expected === undefined && actual === undefined) return undefined;
  const firstDiff = firstDifferingLine(expected ?? "", actual ?? "");
  if (firstDiff !== undefined) return firstDiff;
  // Identical after normalization but still recorded as `changed` upstream:
  // fall back to the first non-empty actual line so the cluster is non-empty.
  return firstNonEmptyLine(actual ?? "") ?? firstNonEmptyLine(expected ?? "");
}

function firstNonEmptyLine(text: string): string | undefined {
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed !== "") return trimmed;
  }
  return undefined;
}

/**
 * The first line that differs between two normalized texts, rendered as a
 * compact `-expected/+actual` signature. `undefined` when the normalized texts
 * are identical (no differing line to report).
 */
function firstDifferingLine(expected: string, actual: string): string | undefined {
  const expectedLines = normalizeBaselineText(expected).split("\n");
  const actualLines = normalizeBaselineText(actual).split("\n");
  const count = Math.max(expectedLines.length, actualLines.length);
  const firstDiffIndex = [...Array(count).keys()].find((index) => expectedLines[index] !== actualLines[index]);
  if (firstDiffIndex === undefined) return undefined;
  return `-${expectedLines[firstDiffIndex] ?? ""}/+${actualLines[firstDiffIndex] ?? ""}`.trim();
}

/**
 * Counts accumulated per base channel while folding entries. Kept as a plain
 * mutable accumulator local to `summarizeChannels`; never escapes.
 */
interface ChannelCounts {
  implemented: boolean;
  compared: number;
  match: number;
  changed: number;
  new: number;
  missing: number;
  unimplemented: number;
}

/**
 * Roll every entry up into one row per base channel. Implemented entries are
 * counted by their diff kind (`equal`→match, `new`→new, `missing`→missing,
 * else changed); unimplemented entries are counted only as `unimplemented` and
 * flip the channel's `implemented` flag to `false`. The table is sorted by
 * channel name for stable output.
 */
function summarizeChannels(entries: readonly DivergenceEntry[]): readonly ChannelSummary[] {
  const byChannel = new Map<string, ChannelCounts>();
  for (const entry of entries) {
    const { channel, implemented } = parseChannel(entry.kind);
    const counts = byChannel.get(channel) ?? { implemented: true, compared: 0, match: 0, changed: 0, new: 0, missing: 0, unimplemented: 0 };
    if (!implemented) {
      counts.implemented = false;
      counts.unimplemented += 1;
    } else {
      counts.compared += 1;
      countDiffKind(counts, entry.diff.kind);
    }
    byChannel.set(channel, counts);
  }
  return [...byChannel.entries()]
    .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
    .map(([channel, counts]) => ({ channel, ...counts }));
}

function countDiffKind(counts: ChannelCounts, kind: BaselineDiffKind): void {
  if (kind === "equal") counts.match += 1;
  else if (kind === "new") counts.new += 1;
  else if (kind === "missing") counts.missing += 1;
  // `changed`, plus the explicit `accepted`/`triaged` buckets, are real text
  // differences against the reference: fold them into `changed` for the channel
  // table (which has no accepted/triaged column).
  else counts.changed += 1;
}

interface CaseMatchMetrics {
  readonly strictCaseMatch: number;
  readonly implementedCaseMatch: number;
}

/**
 * Compute the two case-level metrics in one pass over the grouped entries.
 *
 * - `strictCaseMatch`: every channel of the case matches. Unimplemented and
 *   compile-failed channels count as NOT-match (compile-failed naturally fails
 *   its text comparison; unimplemented is treated as a non-match here).
 * - `implementedCaseMatch`: every IMPLEMENTED channel matches, with
 *   unimplemented channels excluded from the judgement.
 */
function caseMatchMetrics(caseEntryLists: readonly (readonly DivergenceEntry[])[]): CaseMatchMetrics {
  const strictCaseMatch = caseEntryLists.filter(isStrictCaseMatch).length;
  const implementedCaseMatch = caseEntryLists.filter(isImplementedCaseMatch).length;
  return { strictCaseMatch, implementedCaseMatch };
}

/** Every channel of the case matches; unimplemented channels count as NOT-match. */
function isStrictCaseMatch(caseEntries: readonly DivergenceEntry[]): boolean {
  return caseEntries.every((entry) => parseChannel(entry.kind).implemented && entry.diff.kind === "equal");
}

/** Every IMPLEMENTED channel matches; unimplemented channels are excluded. */
function isImplementedCaseMatch(caseEntries: readonly DivergenceEntry[]): boolean {
  return caseEntries
    .filter((entry) => parseChannel(entry.kind).implemented)
    .every((entry) => entry.diff.kind === "equal");
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

function summarize(cases: readonly DivergenceCaseReport[], caseMetrics: CaseMatchMetrics): DivergenceSummary {
  const summary = { cases: cases.length, match: 0, accepted: 0, triaged: 0, new: 0, changed: 0, regressed: 0 };
  for (const report of cases) {
    summary[report.status] += 1;
    if (report.regression === "mismatch") summary.regressed += 1;
  }
  return { ...summary, strictCaseMatch: caseMetrics.strictCaseMatch, implementedCaseMatch: caseMetrics.implementedCaseMatch };
}

/** Render the per-case answer-file text plus a summary header. */
export function formatDivergenceReport(report: DivergenceReport): string {
  const lines: string[] = [];
  lines.push("# TS-Go divergence report");
  lines.push("");
  lines.push(formatSummaryLine(report.summary));
  lines.push(`strictCaseMatch=${report.summary.strictCaseMatch}/${report.summary.cases}`);
  lines.push(`implementedCaseMatch=${report.summary.implementedCaseMatch}/${report.summary.cases}`);
  lines.push("");
  lines.push(...formatChannelSummary(report.channelSummary));
  lines.push("");
  lines.push(...formatClusterReport(report.clusters));
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

const channelColumns: readonly { readonly header: string; readonly value: (row: ChannelSummary) => string }[] = [
  { header: "channel", value: (row) => row.channel },
  { header: "implemented", value: (row) => (row.implemented ? "yes" : "no") },
  { header: "compared", value: (row) => String(row.compared) },
  { header: "match", value: (row) => String(row.match) },
  { header: "changed", value: (row) => String(row.changed) },
  { header: "new", value: (row) => String(row.new) },
  { header: "missing", value: (row) => String(row.missing) },
  { header: "unimplemented", value: (row) => String(row.unimplemented) },
];

/**
 * Render the per-channel table as fixed-width columns. Unimplemented channels
 * remain visible rows (`implemented=no`) so the report never hides a channel.
 */
function formatChannelSummary(channels: readonly ChannelSummary[]): readonly string[] {
  const rows = channels.map((channel) => channelColumns.map((column) => column.value(channel)));
  const widths = channelColumns.map((column, index) =>
    Math.max(column.header.length, ...rows.map((row) => row[index]!.length)),
  );
  const pad = (cells: readonly string[]): string =>
    cells.map((cell, index) => cell.padEnd(widths[index]!)).join("  ").trimEnd();
  return [
    "## channel summary",
    "",
    pad(channelColumns.map((column) => column.header)),
    ...rows.map(pad),
  ];
}

/**
 * Render the top-cluster section: the channels with the most `changed` entries,
 * then the `.js` and `.errors` signature clusters. Each cluster table either
 * lists its rows or prints an explicit "clustering not available" note when the
 * diverging entries lacked diff text — never an empty/faked table.
 */
function formatClusterReport(clusters: ClusterReport): readonly string[] {
  return [
    "## top clusters",
    "",
    "top changed channels (by changed count):",
    ...formatTopChangedChannels(clusters.topChangedChannels),
    "",
    "top .js (output) clusters:",
    ...formatClusterTable(clusters.outputClusters),
    "",
    "top .errors (error) clusters:",
    ...formatClusterTable(clusters.errorClusters),
  ];
}

function formatTopChangedChannels(channels: readonly ChannelSummary[]): readonly string[] {
  if (channels.length === 0) return ["  (none — no channel has changed entries)"];
  return channels.map((channel) => `  ${channel.channel}: ${channel.changed}`);
}

function formatClusterTable(table: ClusterTable): readonly string[] {
  if (table.rows.length === 0) {
    if (table.available) return ["  (none — no divergences on this channel)"];
    return ["  clustering not available (entries lack diff text)"];
  }
  return table.rows.map((row) => `  ${row.count}  ${row.signature}  (e.g. ${row.example})`);
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
