/**
 * Baseline diff parity helpers.
 *
 * TS-Go testutil/baseline classifies local baseline output as accepted,
 * triaged, new, missing, or changed. TSTS uses the same classification before
 * reporting file-system diffs to the runner.
 */

export type BaselineDiffKind = "equal" | "new" | "missing" | "changed" | "accepted" | "triaged";

export interface BaselineFile {
  readonly path: string;
  readonly text: string;
}

export interface BaselineDiff {
  readonly path: string;
  readonly kind: BaselineDiffKind;
  readonly expected?: string;
  readonly actual?: string;
}

export interface BaselineDiffLists {
  readonly accepted: ReadonlySet<string>;
  readonly triaged: ReadonlySet<string>;
}

export function compareBaselineMaps(expected: ReadonlyMap<string, string>, actual: ReadonlyMap<string, string>, lists: BaselineDiffLists): readonly BaselineDiff[] {
  const paths = new Set([...expected.keys(), ...actual.keys()]);
  const diffs: BaselineDiff[] = [];
  for (const path of [...paths].sort()) {
    const expectedText = expected.get(path);
    const actualText = actual.get(path);
    const kind = classifyBaselineDiff(path, expectedText, actualText, lists);
    if (kind === "equal") continue;
    diffs.push({
      path,
      kind,
      ...(expectedText === undefined ? {} : { expected: expectedText }),
      ...(actualText === undefined ? {} : { actual: actualText }),
    });
  }
  return diffs;
}

export function classifyBaselineDiff(path: string, expected: string | undefined, actual: string | undefined, lists: BaselineDiffLists): BaselineDiffKind {
  if (lists.accepted.has(path)) return "accepted";
  if (lists.triaged.has(path)) return "triaged";
  if (expected === undefined && actual !== undefined) return "new";
  if (expected !== undefined && actual === undefined) return "missing";
  if (normalizeBaselineText(expected ?? "") === normalizeBaselineText(actual ?? "")) return "equal";
  return "changed";
}

export function summarizeBaselineDiffs(diffs: readonly BaselineDiff[]): BaselineDiffSummary {
  const summary: BaselineDiffSummary = { new: 0, missing: 0, changed: 0, accepted: 0, triaged: 0 };
  for (const diff of diffs) {
    if (diff.kind === "equal") continue;
    summary[diff.kind] += 1;
  }
  return summary;
}

export interface BaselineDiffSummary {
  new: number;
  missing: number;
  changed: number;
  accepted: number;
  triaged: number;
}

export function formatBaselineDiff(diff: BaselineDiff): string {
  const header = `${diff.kind.toUpperCase()} ${diff.path}`;
  if (diff.kind === "new") return `${header}\n${diff.actual ?? ""}`;
  if (diff.kind === "missing") return `${header}\n${diff.expected ?? ""}`;
  if (diff.kind === "accepted" || diff.kind === "triaged") return header;
  return `${header}\n${formatChangedText(diff.expected ?? "", diff.actual ?? "")}`;
}

/**
 * Single text-normalization point for the diff layer. Every text channel's
 * equal check (`classifyBaselineDiff`) and unified diff (`formatChangedText`)
 * runs both sides through here first, so CRLF/LF and trailing-whitespace
 * differences are folded uniformly for ALL channels — there is no per-channel
 * branch that could skip normalization. This is reporting/diff-layer only; it
 * never rewrites baselines or alters compiler output. See `diffParity.test.ts`
 * for the CRLF/LF audit that pins this across the text channels.
 */
export function normalizeBaselineText(text: string): string {
  return text.replace(/\r\n/g, "\n").replace(/[ \t]+$/gm, "").trimEnd();
}

function formatChangedText(expected: string, actual: string): string {
  const expectedLines = normalizeBaselineText(expected).split("\n");
  const actualLines = normalizeBaselineText(actual).split("\n");
  const lines: string[] = [];
  const count = Math.max(expectedLines.length, actualLines.length);
  for (let index = 0; index < count; index += 1) {
    const expectedLine = expectedLines[index];
    const actualLine = actualLines[index];
    if (expectedLine === actualLine) continue;
    if (expectedLine !== undefined) lines.push(`- ${expectedLine}`);
    if (actualLine !== undefined) lines.push(`+ ${actualLine}`);
  }
  return lines.join("\n");
}
