/**
 * Run-set harness for the TS-Go conformance corpus.
 *
 * The conformance runner can target one of three named corpora ("run-sets"),
 * selected by the `TSGO_RUNSET` env var:
 *
 *   - `native`            — TS-Go's own `tests/cases` testdata (always present).
 *   - `accepted-submodule`— the upstream TypeScript cases that TS-Go has accepted
 *                           (the curated subset listed in `submoduleAccepted.txt`).
 *   - `full-submodule`    — the entire upstream TypeScript `tests/cases` corpus.
 *
 * The two submodule run-sets read from `_submodules/TypeScript/tests/cases`,
 * which is a git submodule that may not be checked out. When it is absent the
 * harness reports an explicit `blocked` status (with the missing path + the
 * accepted-entry count) rather than silently passing with zero cases.
 *
 * This module is pure (no I/O): callers pass in file lists + list text. That
 * keeps run-set selection, accepted-case filtering, and count reporting
 * unit-testable without the submodule present.
 */

import { basename } from "node:path";

export type Runset = "native" | "accepted-submodule" | "full-submodule";

const RUNSETS: readonly Runset[] = ["native", "accepted-submodule", "full-submodule"];

/** Resolve `TSGO_RUNSET` to a run-set; defaults to `native`, throws on garbage. */
export function resolveRunset(value: string | undefined): Runset {
  if (value === undefined || value === "") return "native";
  if ((RUNSETS as readonly string[]).includes(value)) return value as Runset;
  throw new Error(`invalid TSGO_RUNSET=${value} (expected one of: ${RUNSETS.join(", ")})`);
}

/** True for the run-sets sourced from the upstream TypeScript submodule. */
export function isSubmoduleRunset(runset: Runset): boolean {
  return runset === "accepted-submodule" || runset === "full-submodule";
}

/** One enumerated corpus case file, tagged with its suite (`conformance`/`compiler`). */
export interface DiscoveredCase {
  readonly suite: string;
  readonly fileName: string;
}

/**
 * Parse a TS-Go diff acceptance list (`submoduleAccepted.txt` /
 * `submoduleTriaged.txt`). Entries are baseline diff paths
 * `<suite>/<baselineName>.diff`; `#`-prefixed comment/header lines and blanks
 * are ignored. Returns the raw entry lines in file order.
 */
export function parseDiffListEntries(text: string): readonly string[] {
  const entries: string[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (line === "" || line.startsWith("#")) continue;
    entries.push(line);
  }
  return entries;
}

/**
 * Reduce diff-list entries to the set of accepted case keys `<suite>/<caseStem>`.
 * A baseline diff `<suite>/<name>.<channel>.diff` is channel-agnostic at the
 * case level: `foo.types.diff` and `foo.errors.diff` both belong to case
 * `<suite>/foo`. The channel is the final dotted segment, removed via the last
 * `.` so case names that themselves contain dots (`a.b`) survive intact.
 */
export function acceptedCaseKeys(entries: readonly string[]): ReadonlySet<string> {
  const keys = new Set<string>();
  for (const entry of entries) {
    const withoutDiff = entry.endsWith(".diff") ? entry.slice(0, -".diff".length) : entry;
    const slash = withoutDiff.indexOf("/");
    if (slash < 0) continue;
    const suite = withoutDiff.slice(0, slash);
    const baselineName = withoutDiff.slice(slash + 1);
    const lastDot = baselineName.lastIndexOf(".");
    const caseStem = lastDot < 0 ? baselineName : baselineName.slice(0, lastDot);
    if (caseStem !== "") keys.add(`${suite}/${caseStem}`);
  }
  return keys;
}

/** The `<suite>/<caseStem>` key for an enumerated case file. */
export function caseKey(suite: string, fileName: string): string {
  const base = basename(fileName);
  const stem = base.endsWith(".tsx") ? base.slice(0, -".tsx".length)
    : base.endsWith(".ts") ? base.slice(0, -".ts".length)
    : base;
  return `${suite}/${stem}`;
}

export interface SelectionCounts {
  readonly discovered: number;
  readonly selected: number;
  readonly skipped: number;
  /** Skip reason → count (e.g. `skipped-list`, `not-in-accepted-list`). */
  readonly skippedReasons: ReadonlyMap<string, number>;
}

export interface SelectionInput {
  readonly runset: Runset;
  readonly cases: readonly DiscoveredCase[];
  /** TS-Go's case-level skip list membership (skippedTests). */
  readonly isSkipped: (fileName: string) => boolean;
  /** Accepted case keys; required for `accepted-submodule`, ignored otherwise. */
  readonly acceptedKeys?: ReadonlySet<string> | undefined;
}

/**
 * Classify every discovered case into selected vs skipped, recording per-reason
 * skip counts. A case is skipped if it is on TS-Go's skip list, or (for
 * `accepted-submodule`) if it is not in the accepted set. Selection precedence
 * matches the runner: the skip list is checked first.
 */
export function selectionCounts(input: SelectionInput): SelectionCounts {
  const reasons = new Map<string, number>();
  let selected = 0;
  for (const discovered of input.cases) {
    if (input.isSkipped(discovered.fileName)) {
      bump(reasons, "skipped-list");
      continue;
    }
    if (input.runset === "accepted-submodule" && input.acceptedKeys !== undefined
      && !input.acceptedKeys.has(caseKey(discovered.suite, discovered.fileName))) {
      bump(reasons, "not-in-accepted-list");
      continue;
    }
    selected += 1;
  }
  const skipped = input.cases.length - selected;
  return { discovered: input.cases.length, selected, skipped, skippedReasons: reasons };
}

function bump(map: Map<string, number>, key: string): void {
  map.set(key, (map.get(key) ?? 0) + 1);
}

/** Render `skipped_reasons` as a stable `reason:count,reason:count` string. */
export function formatSkippedReasons(reasons: ReadonlyMap<string, number>): string {
  if (reasons.size === 0) return "none";
  return [...reasons.entries()]
    .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
    .map(([reason, count]) => `${reason}:${count}`)
    .join(",");
}

/** The run-status line emitted before the divergence summary. */
export function formatRunsetLine(runset: Runset, counts: SelectionCounts): string {
  return [
    `runset=${runset}`,
    `discovered=${counts.discovered}`,
    `selected=${counts.selected}`,
    `skipped=${counts.skipped}`,
    `skipped_reasons=${formatSkippedReasons(counts.skippedReasons)}`,
  ].join(" ");
}

export interface BlockedStatus {
  readonly runset: Runset;
  readonly reason: string;
  readonly expectedPath: string;
  readonly acceptedEntries: number;
}

/**
 * Render the explicit `blocked` report for a submodule run-set whose corpus is
 * absent. Zero runnable cases due to a missing corpus is a blocked status, never
 * a silent pass.
 */
export function formatBlocked(status: BlockedStatus): string {
  return [
    `runset=${status.runset}`,
    `status=blocked`,
    `reason=${status.reason}`,
    `expected_path=${status.expectedPath}`,
    `accepted_entries=${status.acceptedEntries}`,
    `runnable=0`,
  ].join(" ");
}
