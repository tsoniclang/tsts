/**
 * TS-Go corpus impact joiner (Wave 0, tool 0E).
 *
 * Logical parity (declaration inventory + control skeleton) tells us WHERE the
 * TSTS port has structurally drifted from typescript-go. The TS-Go conformance
 * corpus tells us WHICH externally observable behaviors diverge. This tool joins
 * the two: it takes the structural gaps surfaced by the function-inventory (0B)
 * and control-skeleton (0D) tools and attributes them to the corpus baseline
 * channels they most plausibly affect, attaching concrete corpus case examples.
 *
 * It is a reporting tool. It does not prove that a structural gap caused a
 * specific corpus divergence; it produces a ranked, example-backed map so that
 * work-packet generation (0F) can prioritize the gaps with the largest observed
 * behavioral blast radius.
 *
 * Inputs (all optional; missing inputs are reported, not fatal):
 *   .temp/tsgo-report/divergence.json      (corpus baseline divergence report)
 *   .temp/tsgo-function-inventory.json      (0B output)
 *   .temp/tsgo-control-skeleton.json        (0D output)
 *
 * Outputs:
 *   .temp/tsgo-corpus-impact.json
 *   .temp/tsgo-corpus-impact.txt
 *
 * Flags:
 *   --json      print the JSON report to stdout instead of the text report
 *   --no-fail   never exit non-zero (report mode; the default for baselines)
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const TOOL_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(TOOL_DIR, "..");
const REPO_ROOT = join(PROJECT_ROOT, "..", "..");
const TEMP_DIR = join(REPO_ROOT, ".temp");

const DIVERGENCE_PATH = join(TEMP_DIR, "tsgo-report", "divergence.json");
const FUNCTION_INVENTORY_PATH = join(TEMP_DIR, "tsgo-function-inventory.json");
const CONTROL_SKELETON_PATH = join(TEMP_DIR, "tsgo-control-skeleton.json");

const MAX_EXAMPLES = 8;
const MAX_GAP_ROWS = 200;

// ---------------------------------------------------------------------------
// Channel <-> module mapping.
//
// Each corpus baseline channel is produced by a specific TSTS/TS-Go subsystem.
// A structural gap in a module is attributed to every channel that module
// feeds. This is a coarse routing table, intentionally explicit (no magic):
// when a module is not listed it is associated with no channel and reported
// under "unmapped" so the gap is never silently dropped.
// ---------------------------------------------------------------------------

const CHANNEL_MODULES: Readonly<Record<string, readonly string[]>> = {
  error: ["checker", "binder", "parser", "scanner", "diagnostics", "diagnosticwriter", "ast"],
  output: ["printer", "transformers", "emit-js", "sourcemap", "outputpaths", "checker", "binder", "parser"],
  "types-and-symbols (types)": ["checker", "binder", "nodebuilder", "ast"],
  "types-and-symbols (symbols)": ["checker", "binder", "nodebuilder", "ast"],
  "module-resolution": ["module", "modulespecifiers", "packagejson", "tsoptions", "tspath", "vfs", "symlinks"],
  sourcemap: ["sourcemap", "printer", "transformers"],
  "sourcemap-record": ["sourcemap", "printer", "transformers"],
  "parent-pointers": ["parser", "ast", "astnav", "binder"],
  "union-ordering": ["checker"],
};

interface RawArgs {
  readonly json: boolean;
  readonly fail: boolean;
}

function parseArgs(): RawArgs {
  return {
    json: process.argv.includes("--json"),
    fail: !process.argv.includes("--no-fail"),
  };
}

interface LoadResult<T> {
  readonly path: string;
  readonly present: boolean;
  readonly parsed: boolean;
  readonly value: T | undefined;
  readonly error?: string;
}

function loadJson<T>(path: string): LoadResult<T> {
  if (!existsSync(path)) {
    return { path, present: false, parsed: false, value: undefined };
  }
  try {
    const value = JSON.parse(readFileSync(path, "utf8")) as T;
    return { path, present: true, parsed: true, value };
  } catch (error) {
    return {
      path,
      present: true,
      parsed: false,
      value: undefined,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// ---------------------------------------------------------------------------
// Divergence parsing.
// ---------------------------------------------------------------------------

interface DivergenceDiff {
  readonly path?: string;
  readonly kind?: string;
  readonly actual?: string;
  readonly expected?: string;
}

interface DivergenceEntry {
  readonly caseName?: string;
  readonly kind?: string;
  readonly diff?: DivergenceDiff;
}

interface DivergenceCase {
  readonly caseName?: string;
  readonly status?: string;
  readonly entries?: readonly DivergenceEntry[];
}

interface ChannelSummaryRow {
  readonly channel: string;
  readonly implemented?: boolean;
  readonly compared?: number;
  readonly match?: number;
  readonly changed?: number;
  readonly new?: number;
  readonly missing?: number;
  readonly unimplemented?: number;
}

interface DivergenceReport {
  readonly summary?: Record<string, number>;
  readonly channelSummary?: readonly ChannelSummaryRow[];
  readonly cases?: readonly DivergenceCase[];
}

// A canonical channel name strips the parenthetical qualifier the divergence
// report appends to entry kinds (e.g. "error (compile-failed)" -> "error",
// "sourcemap (unimplemented)" -> "sourcemap"). The channelSummary rows already
// use canonical names, so this aligns entry kinds with summary rows.
function canonicalChannel(kind: string): string {
  return kind.replace(/\s*\((?:compile-failed|unimplemented)\)\s*$/u, "").trim();
}

interface ChannelObservation {
  readonly channel: string;
  readonly implemented: boolean;
  readonly compared: number;
  readonly changed: number;
  readonly new: number;
  readonly missing: number;
  readonly unimplemented: number;
  // Distinct corpus case names that diverged (changed/new/missing) on this
  // channel, in first-seen order. Used both for counts and examples.
  readonly divergedCases: readonly string[];
}

function buildChannelObservations(report: DivergenceReport): readonly ChannelObservation[] {
  const summaryByChannel = new Map<string, ChannelSummaryRow>();
  for (const row of report.channelSummary ?? []) {
    if (typeof row?.channel === "string") summaryByChannel.set(canonicalChannel(row.channel), row);
  }

  // Collect diverged case names per channel from the per-case entries.
  const divergedByChannel = new Map<string, string[]>();
  const seenByChannel = new Map<string, Set<string>>();
  for (const corpusCase of report.cases ?? []) {
    for (const entry of corpusCase.entries ?? []) {
      const kind = entry.kind;
      const diffKind = entry.diff?.kind;
      if (typeof kind !== "string") continue;
      // Only count entries that actually diverge. "equal" entries are matches.
      if (diffKind !== "changed" && diffKind !== "new" && diffKind !== "missing") continue;
      const channel = canonicalChannel(kind);
      const name = entry.caseName ?? corpusCase.caseName;
      if (typeof name !== "string") continue;
      const seen = seenByChannel.get(channel) ?? new Set<string>();
      if (seen.has(name)) continue;
      seen.add(name);
      seenByChannel.set(channel, seen);
      const list = divergedByChannel.get(channel) ?? [];
      list.push(name);
      divergedByChannel.set(channel, list);
    }
  }

  const channels = new Set<string>([...summaryByChannel.keys(), ...divergedByChannel.keys()]);
  const observations: ChannelObservation[] = [];
  for (const channel of [...channels].sort()) {
    const summary = summaryByChannel.get(channel);
    const divergedCases = divergedByChannel.get(channel) ?? [];
    observations.push({
      channel,
      implemented: summary?.implemented ?? divergedCases.length > 0,
      compared: summary?.compared ?? 0,
      changed: summary?.changed ?? 0,
      new: summary?.new ?? 0,
      missing: summary?.missing ?? 0,
      unimplemented: summary?.unimplemented ?? 0,
      divergedCases,
    });
  }
  return observations;
}

// ---------------------------------------------------------------------------
// Structural-gap parsing (function inventory + control skeleton).
//
// Both 0B and 0D are not yet built. To stay robust we accept several plausible
// top-level container shapes (array, or an object whose first array-valued
// field holds the records) and read fields defensively. A record only needs a
// module and a gap-indicating status to be usable.
// ---------------------------------------------------------------------------

function extractRecords(value: unknown): readonly Record<string, unknown>[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null);
  }
  if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;
    // Prefer well-known container keys, then fall back to the first array field.
    for (const key of ["records", "functions", "entries", "results", "inventory", "rows", "skeletons"]) {
      const candidate = obj[key];
      if (Array.isArray(candidate)) {
        return candidate.filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null);
      }
    }
    for (const candidate of Object.values(obj)) {
      if (Array.isArray(candidate)) {
        return candidate.filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null);
      }
    }
  }
  return [];
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

interface StructuralGap {
  readonly source: "function-inventory" | "control-skeleton";
  readonly module: string;
  readonly status: string;
  readonly symbol?: string;
  readonly upstreamFile?: string;
  readonly localCandidate?: string;
  readonly detail?: string;
}

// A gap is anything that is not a clean, fully-aligned match. Generated and
// deferred records are explicitly NOT treated as drift (per guardrails: keep
// generated surfaces out of hand-port drift accounting). `renamed` is an
// intentional TS casing rename (PascalCase TS-Go -> lower-camel TSTS): the
// function IS represented locally, so it is ignored like `matched` and NOT a
// corpus-impacting structural gap. `split` still warrants review (ownership
// must be confirmed), so it remains a gap.
const INVENTORY_GAP_STATUSES = new Set(["missing", "split", "split-needs-manual-review"]);
const INVENTORY_IGNORED_STATUSES = new Set(["matched", "renamed", "generated", "deferred"]);
const SKELETON_GAP_STATUSES = new Set([
  "minor-shape-drift",
  "major-shape-drift",
  "missing-local",
  "missing-upstream",
  "split-needs-manual-review",
]);
const SKELETON_IGNORED_STATUSES = new Set(["match"]);

function moduleOf(record: Record<string, unknown>): string | undefined {
  const direct = asString(record.module);
  if (direct !== undefined) return direct;
  // Derive a module from an upstream file path like "parser/parser.go".
  const upstream = asString(record.upstreamFile) ?? asString(record.upstream);
  if (upstream !== undefined) {
    const head = upstream.replace(/^internal\//u, "").split("/")[0];
    if (head !== undefined && head.length > 0) return head;
  }
  return undefined;
}

function firstLocalCandidate(record: Record<string, unknown>): string | undefined {
  const candidates = record.localCandidates;
  if (Array.isArray(candidates)) {
    for (const c of candidates) {
      const s = asString(c);
      if (s !== undefined) return s;
    }
  }
  return asString(record.localCandidate) ?? asString(record.local);
}

function parseInventoryGaps(records: readonly Record<string, unknown>[]): readonly StructuralGap[] {
  const gaps: StructuralGap[] = [];
  for (const record of records) {
    const status = (asString(record.status) ?? "").toLowerCase();
    if (status === "" || INVENTORY_IGNORED_STATUSES.has(status)) continue;
    if (!INVENTORY_GAP_STATUSES.has(status)) continue;
    const module = moduleOf(record);
    if (module === undefined) continue;
    const symbol = asString(record.upstreamSymbol) ?? asString(record.symbol);
    const upstreamFile = asString(record.upstreamFile) ?? asString(record.upstream);
    const localCandidate = firstLocalCandidate(record);
    gaps.push({
      source: "function-inventory",
      module,
      status,
      ...(symbol !== undefined ? { symbol } : {}),
      ...(upstreamFile !== undefined ? { upstreamFile } : {}),
      ...(localCandidate !== undefined ? { localCandidate } : {}),
    });
  }
  return gaps;
}

function parseSkeletonGaps(records: readonly Record<string, unknown>[]): readonly StructuralGap[] {
  const gaps: StructuralGap[] = [];
  for (const record of records) {
    const status = (asString(record.status) ?? "").toLowerCase();
    if (status === "" || SKELETON_IGNORED_STATUSES.has(status)) continue;
    if (!SKELETON_GAP_STATUSES.has(status)) continue;
    const module = moduleOf(record);
    if (module === undefined) continue;
    const symbol =
      asString(record.upstreamSymbol) ??
      asString(record.symbol) ??
      asString(record.function) ??
      asString(record.name);
    const upstreamFile = asString(record.upstreamFile) ?? asString(record.upstream);
    const localCandidate = firstLocalCandidate(record);
    const detail = asString(record.detail) ?? asString(record.note);
    gaps.push({
      source: "control-skeleton",
      module,
      status,
      ...(symbol !== undefined ? { symbol } : {}),
      ...(upstreamFile !== undefined ? { upstreamFile } : {}),
      ...(localCandidate !== undefined ? { localCandidate } : {}),
      ...(detail !== undefined ? { detail } : {}),
    });
  }
  return gaps;
}

// ---------------------------------------------------------------------------
// Join: structural gaps -> affected channels -> corpus examples.
// ---------------------------------------------------------------------------

interface ChannelImpact {
  readonly channel: string;
  readonly implemented: boolean;
  readonly changed: number;
  readonly new: number;
  readonly missing: number;
  readonly unimplemented: number;
  readonly affectedCases: number;
  readonly examples: readonly string[];
}

interface ModuleImpact {
  readonly module: string;
  readonly mapped: boolean;
  readonly inventoryGaps: number;
  readonly skeletonGaps: number;
  readonly gapStatuses: Readonly<Record<string, number>>;
  readonly sampleGaps: readonly StructuralGap[];
  readonly channels: readonly ChannelImpact[];
  // Total corpus cases observed diverging across all channels this module feeds
  // (distinct case names). This is the module's behavioral blast radius proxy.
  readonly affectedCorpusCases: number;
}

function tallyStatuses(gaps: readonly StructuralGap[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const gap of gaps) out[gap.status] = (out[gap.status] ?? 0) + 1;
  return out;
}

function joinImpacts(
  gaps: readonly StructuralGap[],
  observations: readonly ChannelObservation[],
): readonly ModuleImpact[] {
  const observationByChannel = new Map(observations.map((o) => [o.channel, o]));
  // Reverse-index: module -> channels it feeds.
  const channelsByModule = new Map<string, string[]>();
  for (const [channel, modules] of Object.entries(CHANNEL_MODULES)) {
    for (const module of modules) {
      const list = channelsByModule.get(module) ?? [];
      list.push(channel);
      channelsByModule.set(module, list);
    }
  }

  const gapsByModule = new Map<string, StructuralGap[]>();
  for (const gap of gaps) {
    const list = gapsByModule.get(gap.module) ?? [];
    list.push(gap);
    gapsByModule.set(gap.module, list);
  }

  const impacts: ModuleImpact[] = [];
  for (const [module, moduleGaps] of [...gapsByModule.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const feeds = channelsByModule.get(module) ?? [];
    const channels: ChannelImpact[] = [];
    const allAffected = new Set<string>();
    for (const channel of feeds) {
      const observed = observationByChannel.get(channel);
      if (observed === undefined) continue;
      for (const name of observed.divergedCases) allAffected.add(name);
      channels.push({
        channel,
        implemented: observed.implemented,
        changed: observed.changed,
        new: observed.new,
        missing: observed.missing,
        unimplemented: observed.unimplemented,
        affectedCases: observed.divergedCases.length,
        examples: observed.divergedCases.slice(0, MAX_EXAMPLES),
      });
    }
    channels.sort((a, b) => b.affectedCases - a.affectedCases || a.channel.localeCompare(b.channel));
    const inventoryGaps = moduleGaps.filter((g) => g.source === "function-inventory");
    const skeletonGaps = moduleGaps.filter((g) => g.source === "control-skeleton");
    impacts.push({
      module,
      mapped: feeds.length > 0,
      inventoryGaps: inventoryGaps.length,
      skeletonGaps: skeletonGaps.length,
      gapStatuses: tallyStatuses(moduleGaps),
      sampleGaps: moduleGaps.slice(0, 12),
      channels,
      affectedCorpusCases: allAffected.size,
    });
  }
  // Rank modules by behavioral blast radius, then by total gap count.
  impacts.sort(
    (a, b) =>
      b.affectedCorpusCases - a.affectedCorpusCases ||
      b.inventoryGaps + b.skeletonGaps - (a.inventoryGaps + a.skeletonGaps) ||
      a.module.localeCompare(b.module),
  );
  return impacts;
}

// ---------------------------------------------------------------------------
// Report assembly.
// ---------------------------------------------------------------------------

interface InputStatus {
  readonly name: string;
  readonly path: string;
  readonly present: boolean;
  readonly parsed: boolean;
  readonly recordCount?: number;
  readonly error?: string;
}

interface CorpusImpactReport {
  readonly generatedAt: string;
  readonly inputs: readonly InputStatus[];
  readonly channelObservations: readonly ChannelObservation[];
  readonly totalStructuralGaps: number;
  readonly moduleImpacts: readonly ModuleImpact[];
  readonly notes: readonly string[];
}

function buildReport(): CorpusImpactReport {
  const notes: string[] = [];

  const divergence = loadJson<DivergenceReport>(DIVERGENCE_PATH);
  const inventory = loadJson<unknown>(FUNCTION_INVENTORY_PATH);
  const skeleton = loadJson<unknown>(CONTROL_SKELETON_PATH);

  const observations = divergence.parsed && divergence.value ? buildChannelObservations(divergence.value) : [];
  if (!divergence.present) {
    notes.push(`divergence report absent (${DIVERGENCE_PATH}); no corpus channels available to join against`);
  } else if (!divergence.parsed) {
    notes.push(`divergence report failed to parse: ${divergence.error ?? "unknown error"}`);
  }

  const inventoryRecords = inventory.parsed ? extractRecords(inventory.value) : [];
  const skeletonRecords = skeleton.parsed ? extractRecords(skeleton.value) : [];
  if (!inventory.present) {
    notes.push(`function inventory absent (${FUNCTION_INVENTORY_PATH}); run 0B (checkTsgoFunctionInventory) to enable inventory-gap join`);
  } else if (!inventory.parsed) {
    notes.push(`function inventory failed to parse: ${inventory.error ?? "unknown error"}`);
  }
  if (!skeleton.present) {
    notes.push(`control skeleton absent (${CONTROL_SKELETON_PATH}); run 0D (checkTsgoControlSkeleton) to enable shape-drift join`);
  } else if (!skeleton.parsed) {
    notes.push(`control skeleton failed to parse: ${skeleton.error ?? "unknown error"}`);
  }

  const inventoryGaps = parseInventoryGaps(inventoryRecords);
  const skeletonGaps = parseSkeletonGaps(skeletonRecords);
  const allGaps = [...inventoryGaps, ...skeletonGaps].slice(0, MAX_GAP_ROWS * 4);

  if (allGaps.length === 0 && (inventory.parsed || skeleton.parsed)) {
    notes.push("no structural gaps detected in provided inventory/skeleton inputs (matched/generated/deferred records are excluded by design)");
  }

  const moduleImpacts = joinImpacts(allGaps, observations);

  const makeInputStatus = (
    name: string,
    path: string,
    present: boolean,
    parsed: boolean,
    recordCount: number | undefined,
    error: string | undefined,
  ): InputStatus => ({
    name,
    path,
    present,
    parsed,
    ...(recordCount !== undefined ? { recordCount } : {}),
    ...(error !== undefined ? { error } : {}),
  });

  const inputs: readonly InputStatus[] = [
    makeInputStatus(
      "divergence",
      DIVERGENCE_PATH,
      divergence.present,
      divergence.parsed,
      divergence.value?.cases?.length,
      divergence.error,
    ),
    makeInputStatus(
      "function-inventory",
      FUNCTION_INVENTORY_PATH,
      inventory.present,
      inventory.parsed,
      inventory.parsed ? inventoryRecords.length : undefined,
      inventory.error,
    ),
    makeInputStatus(
      "control-skeleton",
      CONTROL_SKELETON_PATH,
      skeleton.present,
      skeleton.parsed,
      skeleton.parsed ? skeletonRecords.length : undefined,
      skeleton.error,
    ),
  ];

  return {
    generatedAt: new Date().toISOString(),
    inputs,
    channelObservations: observations,
    totalStructuralGaps: allGaps.length,
    moduleImpacts,
    notes,
  };
}

function renderText(report: CorpusImpactReport): string {
  const lines: string[] = [];
  lines.push("TSTS / TS-Go Corpus Impact (structural gaps -> corpus channels)");
  lines.push("");
  lines.push("inputs:");
  for (const input of report.inputs) {
    const state = !input.present ? "ABSENT" : !input.parsed ? "PARSE-ERROR" : "ok";
    const count = input.recordCount === undefined ? "" : ` records=${input.recordCount}`;
    const err = input.error ? ` error=${input.error}` : "";
    lines.push(`  ${input.name}: ${state}${count}${err} (${input.path})`);
  }
  lines.push("");

  if (report.channelObservations.length > 0) {
    lines.push("corpus channels (observed divergence):");
    for (const channel of report.channelObservations) {
      lines.push(
        `  ${channel.channel}: implemented=${channel.implemented} compared=${channel.compared} ` +
          `changed=${channel.changed} new=${channel.new} missing=${channel.missing} ` +
          `unimplemented=${channel.unimplemented} diverged_cases=${channel.divergedCases.length}`,
      );
    }
    lines.push("");
  } else {
    lines.push("corpus channels: none (divergence report absent or unparsable)");
    lines.push("");
  }

  lines.push(`structural gaps joined: ${report.totalStructuralGaps}`);
  lines.push("");

  if (report.moduleImpacts.length === 0) {
    lines.push("module impacts: none (no structural gaps available to join; provide 0B/0D outputs)");
  } else {
    lines.push("module impacts (ranked by corpus blast radius):");
    for (const impact of report.moduleImpacts) {
      const statusStr = Object.entries(impact.gapStatuses)
        .map(([k, v]) => `${k}=${v}`)
        .join(" ");
      lines.push(
        `  ${impact.module}: inventory_gaps=${impact.inventoryGaps} skeleton_gaps=${impact.skeletonGaps} ` +
          `affected_corpus_cases=${impact.affectedCorpusCases} mapped=${impact.mapped} [${statusStr}]`,
      );
      for (const channel of impact.channels) {
        if (channel.affectedCases === 0) continue;
        const examples = channel.examples.join(", ");
        lines.push(`    channel ${channel.channel}: affected=${channel.affectedCases} examples: ${examples}`);
      }
      for (const gap of impact.sampleGaps.slice(0, 4)) {
        const where = gap.upstreamFile ? ` @ ${gap.upstreamFile}` : "";
        const sym = gap.symbol ? ` ${gap.symbol}` : "";
        lines.push(`    gap [${gap.source}/${gap.status}]${sym}${where}`);
      }
    }
  }

  if (report.notes.length > 0) {
    lines.push("");
    lines.push("notes:");
    for (const note of report.notes) lines.push(`  - ${note}`);
  }

  return lines.join("\n");
}

function writeOutputs(report: CorpusImpactReport, text: string): void {
  mkdirSync(TEMP_DIR, { recursive: true });
  writeFileSync(join(TEMP_DIR, "tsgo-corpus-impact.txt"), `${text}\n`);
  writeFileSync(join(TEMP_DIR, "tsgo-corpus-impact.json"), `${JSON.stringify(report, null, 2)}\n`);
}

function main(): void {
  const args = parseArgs();
  const report = buildReport();
  const text = renderText(report);
  writeOutputs(report, text);
  console.log(args.json ? JSON.stringify(report, null, 2) : text);

  // In fail mode, a missing divergence report (the only always-expected input)
  // or a parse error in any present input is a real problem. Absent 0B/0D
  // outputs are NOT a failure: this tool is designed to run before they exist.
  const divergenceInput = report.inputs.find((i) => i.name === "divergence");
  const hardFailure =
    (divergenceInput !== undefined && !divergenceInput.present) ||
    report.inputs.some((i) => i.present && !i.parsed);
  process.exit(hardFailure && args.fail ? 1 : 0);
}

main();
