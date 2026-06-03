/**
 * TS-Go work-packet generator (Wave 0, packet 0F).
 *
 * This tool is the orchestration backstop of the logical-parity toolchain. It
 * consumes the read-only analysis outputs produced by the other Wave-0 tools
 * and emits LARGE, coherent work packets (module / subsystem slices) that drive
 * TSTS back toward an exact mechanical 1:1 port of typescript-go.
 *
 * Inputs (all consumed gracefully when absent):
 *   0A module JSON      .temp/logical-parity.json
 *   0B function inv.    .temp/tsgo-function-inventory.json
 *   0D control skeleton .temp/tsgo-control-skeleton.json
 *   0E corpus impact    .temp/tsgo-corpus-impact.json
 *   raw corpus report   .temp/tsgo-report/divergence.json
 *   0C split ownership  .analysis/tsts-tsc/parity-maps/split-ownership.json
 *
 * Outputs:
 *   .analysis/tsts-tsc/work-packets/<id>/packet.json
 *   .analysis/tsts-tsc/work-packets/<id>/packet.md
 *   .analysis/tsts-tsc/work-packets/index.json
 *   .analysis/tsts-tsc/work-packets/index.md
 *
 * A packet is a module/subsystem slice, never a one-case fix. Packets that
 * share owned files are linked through blockedBy/blocks so a dynamic workflow
 * can serialize them and avoid colliding edits. The split-ownership map is the
 * authority for which local files a module owns.
 *
 * This tool only reads analysis artifacts and writes under
 * .analysis/tsts-tsc/work-packets. It never edits compiler source.
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Paths / constants
// ---------------------------------------------------------------------------

const TOOL_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(TOOL_DIR, "..");
const REPO_ROOT = join(PROJECT_ROOT, "..", "..");
const TEMP_DIR = join(REPO_ROOT, ".temp");
const ANALYSIS_DIR = join(REPO_ROOT, ".analysis", "tsts-tsc");
const PARITY_MAPS_DIR = join(ANALYSIS_DIR, "parity-maps");
const WORK_PACKETS_DIR = join(ANALYSIS_DIR, "work-packets");

const LOGICAL_PARITY_PATH = join(TEMP_DIR, "logical-parity.json");
const FUNCTION_INVENTORY_PATH = join(TEMP_DIR, "tsgo-function-inventory.json");
const CONTROL_SKELETON_PATH = join(TEMP_DIR, "tsgo-control-skeleton.json");
const CORPUS_IMPACT_PATH = join(TEMP_DIR, "tsgo-corpus-impact.json");
const DIVERGENCE_PATH = join(TEMP_DIR, "tsgo-report", "divergence.json");
const SPLIT_OWNERSHIP_PATH = join(PARITY_MAPS_DIR, "split-ownership.json");

// Maximum number of items embedded per list inside a packet, to keep packets
// readable without losing the slice signal.
const MAX_OWNED_FILES = 24;
const MAX_UPSTREAM_FILES = 24;
const MAX_CORPUS_EXAMPLES = 24;
const MAX_MISSING_SYMBOLS = 48;

const SUCCESS_GATES: readonly string[] = [
  "npm run typecheck",
  "npm run test:node",
  "TSGO_TESTDATA_ROOT=/home/jeswin/temp/typescript-go/testdata npm run test:tsgo:required",
  "npm run logical-parity:report",
];

// ---------------------------------------------------------------------------
// Input shapes (defensive: we only read the fields we need)
// ---------------------------------------------------------------------------

interface LogicalParityModule {
  readonly module: string;
  readonly local: readonly string[];
  readonly scope?: string;
  readonly status?: string;
  readonly upstreamFiles?: number;
  readonly localFiles?: number;
  readonly upstreamDeclarations?: number;
  readonly localDeclarations?: number;
  readonly matchedDeclarations?: number;
  readonly declarationCoverage?: number;
  readonly shapeScore?: number;
  readonly missingDeclarations?: readonly string[];
}

interface LogicalParityReport {
  readonly reports?: readonly LogicalParityModule[];
}

interface FunctionInventoryEntry {
  readonly module?: string;
  readonly upstreamFile?: string;
  readonly upstreamSymbol?: string;
  readonly localCandidates?: readonly string[];
  readonly status?: string;
  readonly notes?: readonly string[];
}

interface ControlSkeletonEntry {
  readonly module?: string;
  readonly upstreamFile?: string;
  readonly upstreamSymbol?: string;
  readonly localFile?: string;
  readonly localSymbol?: string;
  readonly status?: string;
}

// Corpus impact (0E) is the joinImpacts output from checkTsgoCorpusImpact: a
// per-module record of structural gaps and the corpus channels/examples they
// feed. Its on-disk top-level shape is { moduleImpacts: CorpusImpactEntry[] },
// but we also tolerate a bare array form defensively.
interface CorpusImpactChannel {
  readonly channel?: string;
  readonly affectedCases?: number;
  readonly examples?: readonly string[];
}

interface CorpusImpactSampleGap {
  readonly source?: string;
  readonly status?: string;
  readonly symbol?: string;
  readonly upstreamFile?: string;
  readonly detail?: string;
}

interface CorpusImpactEntry {
  readonly module?: string;
  readonly mapped?: boolean;
  readonly inventoryGaps?: number;
  readonly skeletonGaps?: number;
  readonly sampleGaps?: readonly CorpusImpactSampleGap[];
  readonly channels?: readonly CorpusImpactChannel[];
  readonly affectedCorpusCases?: number;
}

interface CorpusImpactReport {
  readonly moduleImpacts?: readonly CorpusImpactEntry[];
}

interface DivergenceClusterRow {
  readonly signature?: string;
  readonly count?: number;
  readonly example?: string;
}

interface DivergenceCase {
  readonly caseName?: string;
  readonly status?: string;
  readonly comparison?: string;
}

// ---------------------------------------------------------------------------
// Output shapes (exact §6 packet shape)
// ---------------------------------------------------------------------------

interface Packet {
  readonly id: string;
  readonly title: string;
  readonly ownedFiles: readonly string[];
  readonly upstreamFiles: readonly string[];
  readonly blockedBy: readonly string[];
  readonly blocks: readonly string[];
  readonly corpusExamples: readonly string[];
  readonly successGates: readonly string[];
}

// Internal enrichment carried alongside the strict packet for the markdown
// rendering and the index. Not part of the on-disk packet.json shape.
interface PacketContext {
  readonly module: string;
  readonly declarationCoverage: number;
  readonly shapeScore: number;
  readonly upstreamDeclarations: number;
  readonly matchedDeclarations: number;
  readonly missingSymbols: readonly string[];
  readonly structuralGaps: readonly string[];
  readonly corpusChannels: Readonly<Record<string, number>>;
  readonly splitDeclared: boolean;
  readonly rationale: readonly string[];
}

// ---------------------------------------------------------------------------
// CLI flags (mirrors the conventions of the other tools)
// ---------------------------------------------------------------------------

function outputJson(): boolean {
  return process.argv.includes("--json");
}

function failOnFindings(): boolean {
  return !process.argv.includes("--no-fail");
}

// ---------------------------------------------------------------------------
// Safe JSON loading
// ---------------------------------------------------------------------------

interface Loaded<T> {
  readonly present: boolean;
  readonly value: T | undefined;
  readonly note: string;
}

function loadJson<T>(path: string, label: string): Loaded<T> {
  if (!existsSync(path)) {
    return { present: false, value: undefined, note: `${label}: absent (${rel(path)})` };
  }
  try {
    const value = JSON.parse(readFileSync(path, "utf8")) as T;
    return { present: true, value, note: `${label}: loaded (${rel(path)})` };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { present: false, value: undefined, note: `${label}: unreadable (${rel(path)}): ${message}` };
  }
}

function rel(path: string): string {
  return path.startsWith(REPO_ROOT) ? path.slice(REPO_ROOT.length + 1) : path;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function uniqueSorted(values: readonly string[]): readonly string[] {
  return [...new Set(values.filter((value) => value.length > 0))].sort((a, b) => a.localeCompare(b));
}

function clampPercent(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Local source root for a module's owned files, as a repo-relative path.
function localSrcPath(localDir: string): string {
  return `packages/tsts/src/${localDir}`;
}

// Upstream TS-Go directory for a module, as a typescript-go-relative path.
function upstreamPath(module: string): string {
  return `internal/${module}`;
}

// ---------------------------------------------------------------------------
// Owned-file resolution
//
// The split-ownership map (0C) maps a TS-Go file -> the TSTS files that own it.
// When present, we use it to produce precise owned-file lists. When absent we
// fall back to module-directory ownership (the whole local dir). Either way the
// packet declares concrete file paths so dynamic workflows can isolate edits.
// ---------------------------------------------------------------------------

type SplitOwnership = Readonly<Record<string, readonly string[]>>;

// Extract the split map from a loaded 0C value. The canonical 0C shape is an
// envelope { splits: { "<go file>": ["<ts file>", ...] }, ... }. We also accept
// a bare top-level map. Only entries whose value is a string array are kept, so
// scalar metadata keys ($schema, version, ...) are ignored.
function unwrapSplitOwnership(value: unknown): SplitOwnership | undefined {
  if (value === null || typeof value !== "object") return undefined;
  const record = value as Record<string, unknown>;
  const source =
    record["splits"] !== null && typeof record["splits"] === "object"
      ? (record["splits"] as Record<string, unknown>)
      : record;
  const out: Record<string, readonly string[]> = {};
  for (const [key, raw] of Object.entries(source)) {
    if (Array.isArray(raw) && raw.every((item) => typeof item === "string")) {
      out[key] = raw as readonly string[];
    }
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function normalizeOwnedFile(file: string): string {
  const trimmed = file.replace(/\\/g, "/");
  if (trimmed.startsWith("packages/tsts/src/")) return trimmed;
  if (trimmed.startsWith("src/")) return `packages/tsts/${trimmed}`;
  return `packages/tsts/src/${trimmed}`;
}

function normalizeUpstreamFile(file: string): string {
  const trimmed = file.replace(/\\/g, "/");
  if (trimmed.startsWith("internal/")) return trimmed;
  return `internal/${trimmed}`;
}

function listLocalFiles(localDirs: readonly string[]): readonly string[] {
  const out: string[] = [];
  for (const localDir of localDirs) {
    const abs = join(PROJECT_ROOT, "src", localDir);
    if (!existsSync(abs)) continue;
    for (const file of walkTs(abs)) {
      out.push(`packages/tsts/src/${file.slice(join(PROJECT_ROOT, "src").length + 1).replace(/\\/g, "/")}`);
    }
  }
  return uniqueSorted(out);
}

function walkTs(dir: string): readonly string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkTs(full));
      continue;
    }
    if (!entry.name.endsWith(".ts")) continue;
    if (entry.name.endsWith(".test.ts") || entry.name.endsWith(".d.ts") || entry.name.endsWith(".generated.ts")) continue;
    out.push(full);
  }
  return out;
}

// Owned files for a module, preferring the split-ownership map (filtered to the
// module's local dirs) and falling back to the on-disk file list.
function resolveOwnedFiles(module: LogicalParityModule, splits: SplitOwnership | undefined): { readonly files: readonly string[]; readonly splitDeclared: boolean } {
  const localDirs = module.local.length > 0 ? module.local : [module.module];
  const declared: string[] = [];
  if (splits !== undefined) {
    for (const [upstream, locals] of Object.entries(splits)) {
      const inModule = upstream.replace(/\\/g, "/").startsWith(`${module.module}/`) || upstream.replace(/\\/g, "/") === `${module.module}.go`;
      for (const local of locals) {
        const normalized = normalizeOwnedFile(local);
        const matchesDir = localDirs.some((dir) => normalized.startsWith(`packages/tsts/src/${dir}/`) || normalized === `packages/tsts/src/${dir}.ts`);
        if (inModule || matchesDir) declared.push(normalized);
      }
    }
  }
  if (declared.length > 0) {
    return { files: uniqueSorted(declared).slice(0, MAX_OWNED_FILES), splitDeclared: true };
  }
  const onDisk = listLocalFiles(localDirs);
  if (onDisk.length > 0) {
    return { files: onDisk.slice(0, MAX_OWNED_FILES), splitDeclared: false };
  }
  // Last resort: declare the module directories themselves.
  return { files: localDirs.map((dir) => `${localSrcPath(dir)}/`), splitDeclared: false };
}

// ---------------------------------------------------------------------------
// Index the auxiliary inputs by module for fast lookup.
// ---------------------------------------------------------------------------

// Normalize a loaded analysis value into an entry array. Tolerates a bare
// array, or an object that wraps the array under one of the candidate keys.
function asEntries<T>(value: unknown, candidateKeys: readonly string[]): readonly T[] {
  if (Array.isArray(value)) return value as readonly T[];
  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    for (const key of candidateKeys) {
      if (Array.isArray(record[key])) return record[key] as readonly T[];
    }
  }
  return [];
}

// Flatten the 0D control-skeleton report into a flat list of per-function
// records. Canonical 0D shape is { reports: [{ functions: [...] }] }; we also
// accept a bare array or an object that already wraps a flat array.
function flattenSkeleton(value: unknown): readonly ControlSkeletonEntry[] {
  if (Array.isArray(value)) return value as readonly ControlSkeletonEntry[];
  if (value === null || typeof value !== "object") return [];
  const record = value as Record<string, unknown>;
  const reports = record["reports"];
  if (Array.isArray(reports)) {
    return reports.flatMap((report) => {
      const functions = (report as Record<string, unknown>)["functions"];
      return Array.isArray(functions) ? (functions as readonly ControlSkeletonEntry[]) : [];
    });
  }
  return asEntries<ControlSkeletonEntry>(value, ["functions", "entries", "skeleton"]);
}

function indexByModule<T extends { readonly module?: string }>(entries: readonly T[] | undefined): Map<string, readonly T[]> {
  const map = new Map<string, T[]>();
  for (const entry of Array.isArray(entries) ? entries : []) {
    const key = entry.module ?? "";
    if (key === "") continue;
    const existing = map.get(key);
    if (existing === undefined) map.set(key, [entry]);
    else existing.push(entry);
  }
  return new Map([...map.entries()].map(([k, v]) => [k, v as readonly T[]]));
}

// Missing upstream symbols for a module, drawn first from the function
// inventory (status=missing) and falling back to the logical-parity module's
// missingDeclarations list.
function collectMissingSymbols(
  module: LogicalParityModule,
  inventory: readonly FunctionInventoryEntry[] | undefined,
): readonly string[] {
  const fromInventory = (inventory ?? [])
    .filter((entry) => entry.module === module.module)
    .filter((entry) => entry.status === "missing" || entry.status === "deferred")
    .map((entry) => entry.upstreamSymbol ?? "")
    .filter((s) => s.length > 0);
  const fromParity = module.missingDeclarations ?? [];
  return uniqueSorted([...fromInventory, ...fromParity]).slice(0, MAX_MISSING_SYMBOLS);
}

// Upstream files for a module: prefer concrete files named by the function
// inventory / control skeleton; fall back to the module directory.
function collectUpstreamFiles(
  module: LogicalParityModule,
  inventory: readonly FunctionInventoryEntry[] | undefined,
  skeleton: readonly ControlSkeletonEntry[] | undefined,
): readonly string[] {
  const named: string[] = [];
  for (const entry of inventory ?? []) {
    if (entry.module === module.module && entry.upstreamFile) named.push(normalizeUpstreamFile(entry.upstreamFile));
  }
  for (const entry of skeleton ?? []) {
    if (entry.module === module.module && entry.upstreamFile) named.push(normalizeUpstreamFile(entry.upstreamFile));
  }
  if (named.length > 0) return uniqueSorted(named).slice(0, MAX_UPSTREAM_FILES);
  return [`${upstreamPath(module.module)}/`];
}

// Structural gaps for a module from corpus impact (0E) and major-shape-drift
// rows in the control skeleton (0D).
function collectStructuralGaps(
  module: LogicalParityModule,
  impact: readonly CorpusImpactEntry[] | undefined,
  skeleton: readonly ControlSkeletonEntry[] | undefined,
): readonly string[] {
  const gaps: string[] = [];
  for (const entry of impact ?? []) {
    if (entry.module !== module.module) continue;
    for (const sample of entry.sampleGaps ?? []) {
      const label = sample.symbol ?? sample.detail ?? "";
      if (label.length === 0) continue;
      const status = sample.status ? `${sample.status}: ` : "";
      gaps.push(`${status}${label}${sample.upstreamFile ? ` (${sample.upstreamFile})` : ""}`);
    }
  }
  for (const entry of skeleton ?? []) {
    if (entry.module !== module.module) continue;
    if (entry.status === "major-shape-drift" && entry.upstreamSymbol) {
      gaps.push(`major-shape-drift: ${entry.upstreamSymbol}`);
    }
  }
  return uniqueSorted(gaps).slice(0, 16);
}

// Corpus examples for a module from corpus impact (0E). Falls back to the
// divergence cluster examples / changed cases when impact is absent.
function collectCorpusExamples(
  module: LogicalParityModule,
  impact: readonly CorpusImpactEntry[] | undefined,
  fallbackExamples: readonly string[],
): { readonly examples: readonly string[]; readonly channels: Readonly<Record<string, number>> } {
  const examples: string[] = [];
  const channels: Record<string, number> = {};
  for (const entry of impact ?? []) {
    if (entry.module !== module.module) continue;
    for (const channel of entry.channels ?? []) {
      for (const ex of channel.examples ?? []) examples.push(ex);
      if (channel.channel !== undefined) {
        const count = channel.affectedCases ?? 0;
        channels[channel.channel] = (channels[channel.channel] ?? 0) + (Number.isFinite(count) ? count : 0);
      }
    }
  }
  const resolved = examples.length > 0 ? uniqueSorted(examples) : uniqueSorted(fallbackExamples);
  return { examples: resolved.slice(0, MAX_CORPUS_EXAMPLES), channels };
}

// ---------------------------------------------------------------------------
// Packet selection
//
// We only emit packets for modules that have a real, sizeable gap. The point is
// large coherent slices, not one-case fixes, so we require a meaningful missing
// surface (declaration coverage gap or shape drift). Modules already at parity
// are skipped.
// ---------------------------------------------------------------------------

const COVERAGE_GATE = 0.9;
const SHAPE_GATE = 0.65;
const MIN_UPSTREAM_DECLARATIONS = 8;

function shouldEmit(module: LogicalParityModule): boolean {
  const coverage = clampPercent(module.declarationCoverage);
  const shapeScore = clampPercent(module.shapeScore);
  const upstreamDeclarations = module.upstreamDeclarations ?? 0;
  if (module.scope === "deferred") return false;
  if (module.status === "missing-upstream") return false;
  if (upstreamDeclarations < MIN_UPSTREAM_DECLARATIONS) return false;
  return coverage < COVERAGE_GATE || shapeScore < SHAPE_GATE;
}

// Priority weight: bigger missing absolute surface and lower coverage first.
function priorityWeight(module: LogicalParityModule): number {
  const missing = (module.upstreamDeclarations ?? 0) - (module.matchedDeclarations ?? 0);
  const coverageDeficit = 1 - clampPercent(module.declarationCoverage);
  return missing * (0.5 + coverageDeficit);
}

function buildPacket(
  module: LogicalParityModule,
  inventory: readonly FunctionInventoryEntry[] | undefined,
  skeleton: readonly ControlSkeletonEntry[] | undefined,
  impact: readonly CorpusImpactEntry[] | undefined,
  splits: SplitOwnership | undefined,
  fallbackExamples: readonly string[],
  impactPresent: boolean,
): { readonly packet: Packet; readonly context: PacketContext } {
  const owned = resolveOwnedFiles(module, splits);
  const upstreamFiles = collectUpstreamFiles(module, inventory, skeleton);
  const missingSymbols = collectMissingSymbols(module, inventory);
  const structuralGaps = collectStructuralGaps(module, impact, skeleton);
  const corpus = collectCorpusExamples(module, impact, fallbackExamples);

  const coverage = clampPercent(module.declarationCoverage);
  const shapeScore = clampPercent(module.shapeScore);
  const upstreamDeclarations = module.upstreamDeclarations ?? 0;
  const matchedDeclarations = module.matchedDeclarations ?? 0;
  const missingCount = upstreamDeclarations - matchedDeclarations;

  const id = `tsgo-${slug(module.module)}-parity`;
  const title = `${module.module}: mechanical TS-Go parity (decl ${matchedDeclarations}/${upstreamDeclarations}, shape ${percent(shapeScore)})`;

  const rationale: string[] = [];
  rationale.push(
    `Module ${module.module} is at ${percent(coverage)} declaration coverage (${matchedDeclarations}/${upstreamDeclarations}) and ${percent(shapeScore)} control-shape parity against ${upstreamPath(module.module)}.`,
  );
  if (missingCount > 0) {
    rationale.push(`${missingCount} TS-Go declarations are missing or unmatched in TSTS. Port them as a 1:1 mechanical slice (same functions, same control flow, same helper decomposition).`);
  }
  if (shapeScore < SHAPE_GATE) {
    rationale.push(`Control-shape parity is below the ${percent(SHAPE_GATE)} gate. Investigate functions whose if/loop/switch/return structure diverges from TS-Go and restore the upstream skeleton.`);
  }
  if (!owned.splitDeclared) {
    rationale.push(`No split-ownership entry covered these files; ownership was inferred from the on-disk module layout. Declare splits in parity-maps/split-ownership.json if this module spans multiple TSTS files derived from one TS-Go file.`);
  }
  if (!impactPresent && corpus.examples.length > 0) {
    rationale.push(`Corpus-impact join (0E) was not available; corpus examples below are drawn from the raw divergence report as a fallback signal.`);
  } else if (impactPresent && (impact === undefined || impact.length === 0)) {
    rationale.push(`Corpus-impact join (0E) produced no module-level entry for ${module.module}; no observed corpus divergence is currently attributed to this module.`);
  }

  const packet: Packet = {
    id,
    title,
    ownedFiles: owned.files,
    upstreamFiles,
    blockedBy: [],
    blocks: [],
    corpusExamples: corpus.examples,
    successGates: SUCCESS_GATES,
  };

  const context: PacketContext = {
    module: module.module,
    declarationCoverage: coverage,
    shapeScore,
    upstreamDeclarations,
    matchedDeclarations,
    missingSymbols,
    structuralGaps,
    corpusChannels: corpus.channels,
    splitDeclared: owned.splitDeclared,
    rationale,
  };

  return { packet, context };
}

// ---------------------------------------------------------------------------
// Dependency linking via shared owned files.
//
// Packets that share an owned file cannot run in parallel. We deterministically
// orient the edge by priority so that the higher-priority packet "blocks" the
// lower-priority one (which is "blockedBy" it). This produces a serialization
// hint for dynamic workflows.
// ---------------------------------------------------------------------------

function linkSharedOwnership(
  packets: readonly Packet[],
  contexts: ReadonlyMap<string, PacketContext>,
  weights: ReadonlyMap<string, number>,
): readonly Packet[] {
  const blockedBy = new Map<string, Set<string>>(packets.map((p) => [p.id, new Set<string>()]));
  const blocks = new Map<string, Set<string>>(packets.map((p) => [p.id, new Set<string>()]));

  for (let i = 0; i < packets.length; i += 1) {
    for (let j = i + 1; j < packets.length; j += 1) {
      const a = packets[i];
      const b = packets[j];
      const shared = a.ownedFiles.some((file) => b.ownedFiles.includes(file));
      if (!shared) continue;
      const wa = weights.get(a.id) ?? 0;
      const wb = weights.get(b.id) ?? 0;
      // Higher weight blocks lower weight; ties broken by id for determinism.
      const aBlocksB = wa > wb || (wa === wb && a.id < b.id);
      const winner = aBlocksB ? a : b;
      const loser = aBlocksB ? b : a;
      blocks.get(winner.id)?.add(loser.id);
      blockedBy.get(loser.id)?.add(winner.id);
    }
  }

  return packets.map((packet) => ({
    ...packet,
    blockedBy: uniqueSorted([...(blockedBy.get(packet.id) ?? [])]),
    blocks: uniqueSorted([...(blocks.get(packet.id) ?? [])]),
  }));
}

// ---------------------------------------------------------------------------
// Fallback corpus examples by keyword association (used only when 0E absent).
//
// The raw divergence report does not carry a module field, so we do a light
// keyword association from cluster examples / case comparisons to module names.
// This is a best-effort fallback signal, clearly labeled as such in packets.
// ---------------------------------------------------------------------------

function buildFallbackExamples(divergence: { readonly clusters?: { readonly errorClusters?: { readonly rows?: readonly DivergenceClusterRow[] }; readonly outputClusters?: { readonly rows?: readonly DivergenceClusterRow[] } }; readonly cases?: readonly DivergenceCase[] } | undefined): ReadonlyMap<string, readonly string[]> {
  const byModule = new Map<string, string[]>();
  if (divergence === undefined) return byModule;

  // Heuristic association of corpus channels to module names.
  const channelHints: Readonly<Record<string, readonly string[]>> = {
    error: ["checker", "binder", "parser"],
    output: ["transformers", "printer", "emit-js"],
    "module-resolution": ["module", "modulespecifiers", "tsoptions"],
    sourcemap: ["sourcemap", "printer"],
  };

  const clusterRows = [
    ...(divergence.clusters?.errorClusters?.rows ?? []),
    ...(divergence.clusters?.outputClusters?.rows ?? []),
  ];

  const addExample = (module: string, example: string | undefined): void => {
    if (example === undefined || example.length === 0) return;
    const list = byModule.get(module) ?? [];
    if (!list.includes(example) && list.length < MAX_CORPUS_EXAMPLES) list.push(example);
    byModule.set(module, list);
  };

  // Error-code clusters -> checker/binder/parser depending on the TS code range.
  for (const row of clusterRows) {
    const signature = row.signature ?? "";
    if (/^TS1\d{3}/.test(signature)) {
      addExample("parser", row.example);
      addExample("scanner", row.example);
    } else if (/^TS2\d{3}/.test(signature) || /^TS0\b/.test(signature)) {
      addExample("checker", row.example);
    } else if (signature.includes("use strict")) {
      addExample("transformers", row.example);
    } else if (signature.includes("package.json") || signature.includes(".cjs") || signature.includes(".mjs")) {
      addExample("module", row.example);
    } else {
      addExample("printer", row.example);
    }
  }

  // Changed cases -> map via comparison text to channels then to modules.
  for (const kase of divergence.cases ?? []) {
    const comparison = kase.comparison ?? "";
    for (const [channel, modules] of Object.entries(channelHints)) {
      if (comparison.includes(channel)) {
        for (const module of modules) addExample(module, kase.caseName);
      }
    }
  }

  return new Map([...byModule.entries()].map(([k, v]) => [k, uniqueSorted(v)]));
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function renderPacketMarkdown(packet: Packet, context: PacketContext): string {
  const lines: string[] = [];
  lines.push(`# ${packet.title}`);
  lines.push("");
  lines.push(`Packet id: \`${packet.id}\``);
  lines.push("");
  lines.push("## Goal");
  lines.push("");
  lines.push(
    `Drive the \`${context.module}\` module back to an exact mechanical 1:1 port of typescript-go. Same functions, same control flow, same helper decomposition, same algorithm. Do NOT reimplement or write TypeScript-idiomatic rewrites that change structure.`,
  );
  lines.push("");
  lines.push("## Rationale");
  lines.push("");
  for (const item of context.rationale) lines.push(`- ${item}`);
  lines.push("");
  lines.push("## Parity snapshot");
  lines.push("");
  lines.push(`- declaration coverage: ${percent(context.declarationCoverage)} (${context.matchedDeclarations}/${context.upstreamDeclarations})`);
  lines.push(`- control-shape parity: ${percent(context.shapeScore)}`);
  lines.push(`- split-ownership declared: ${context.splitDeclared ? "yes" : "no (inferred from disk layout)"}`);
  lines.push("");
  lines.push("## Owned files (edit only these)");
  lines.push("");
  if (packet.ownedFiles.length === 0) lines.push("- (none resolved)");
  for (const file of packet.ownedFiles) lines.push(`- \`${file}\``);
  lines.push("");
  lines.push("## Upstream TS-Go files (source of truth)");
  lines.push("");
  for (const file of packet.upstreamFiles) lines.push(`- \`${file}\``);
  lines.push("");
  if (context.missingSymbols.length > 0) {
    lines.push("## Missing / unmatched TS-Go symbols to port");
    lines.push("");
    for (const symbol of context.missingSymbols) lines.push(`- \`${symbol}\``);
    lines.push("");
  }
  if (context.structuralGaps.length > 0) {
    lines.push("## Structural gaps (from corpus impact / control skeleton)");
    lines.push("");
    for (const gap of context.structuralGaps) lines.push(`- ${gap}`);
    lines.push("");
  }
  lines.push("## Corpus examples");
  lines.push("");
  if (packet.corpusExamples.length === 0) lines.push("- (no corpus examples joined)");
  for (const example of packet.corpusExamples) lines.push(`- \`${example}\``);
  if (Object.keys(context.corpusChannels).length > 0) {
    lines.push("");
    lines.push("Corpus channels affected:");
    for (const [channel, count] of Object.entries(context.corpusChannels).sort((a, b) => b[1] - a[1])) {
      lines.push(`- ${channel}: ${count}`);
    }
  }
  lines.push("");
  lines.push("## Serialization");
  lines.push("");
  lines.push(packet.blockedBy.length > 0 ? `- blockedBy: ${packet.blockedBy.map((d) => `\`${d}\``).join(", ")}` : "- blockedBy: (none)");
  lines.push(packet.blocks.length > 0 ? `- blocks: ${packet.blocks.map((d) => `\`${d}\``).join(", ")}` : "- blocks: (none)");
  lines.push("");
  lines.push("## Success gates");
  lines.push("");
  for (const gate of packet.successGates) lines.push(`- \`${gate}\``);
  lines.push("");
  return lines.join("\n");
}

function renderIndexMarkdown(packets: readonly Packet[], contexts: ReadonlyMap<string, PacketContext>, inputNotes: readonly string[]): string {
  const lines: string[] = [];
  lines.push("# TS-Go work packets");
  lines.push("");
  lines.push(`Generated ${packets.length} packet(s). Each packet is a large module/subsystem slice toward an exact mechanical TS-Go port.`);
  lines.push("");
  lines.push("## Inputs");
  lines.push("");
  for (const note of inputNotes) lines.push(`- ${note}`);
  lines.push("");
  lines.push("## Packets");
  lines.push("");
  lines.push("| id | module | decl cov | shape | owned files | blockedBy | blocks |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- |");
  for (const packet of packets) {
    const ctx = contexts.get(packet.id);
    lines.push(
      `| \`${packet.id}\` | ${ctx?.module ?? ""} | ${percent(ctx?.declarationCoverage ?? 0)} | ${percent(ctx?.shapeScore ?? 0)} | ${packet.ownedFiles.length} | ${packet.blockedBy.length} | ${packet.blocks.length} |`,
    );
  }
  lines.push("");
  lines.push("## Safe parallel set (no shared owned files)");
  lines.push("");
  const independent = packets.filter((p) => p.blockedBy.length === 0 && p.blocks.length === 0);
  if (independent.length === 0) lines.push("- (all packets share ownership with another packet; serialize via blockedBy/blocks)");
  for (const packet of independent) lines.push(`- \`${packet.id}\``);
  lines.push("");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Output writing
// ---------------------------------------------------------------------------

function writePackets(packets: readonly Packet[], contexts: ReadonlyMap<string, PacketContext>, inputNotes: readonly string[]): void {
  mkdirSync(WORK_PACKETS_DIR, { recursive: true });

  // Remove previously generated packet directories so stale packets do not
  // linger across runs. Only directories that look like generated packets
  // (have a packet.json) are removed; hand-authored files are left alone.
  for (const entry of readdirSync(WORK_PACKETS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const packetJson = join(WORK_PACKETS_DIR, entry.name, "packet.json");
    if (existsSync(packetJson)) rmSync(join(WORK_PACKETS_DIR, entry.name), { recursive: true, force: true });
  }

  for (const packet of packets) {
    const dir = join(WORK_PACKETS_DIR, packet.id);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "packet.json"), `${JSON.stringify(packet, null, 2)}\n`);
    const context = contexts.get(packet.id);
    if (context !== undefined) {
      writeFileSync(join(dir, "packet.md"), renderPacketMarkdown(packet, context));
    }
  }

  writeFileSync(join(WORK_PACKETS_DIR, "index.json"), `${JSON.stringify({ generated: packets.length, packets }, null, 2)}\n`);
  writeFileSync(join(WORK_PACKETS_DIR, "index.md"), renderIndexMarkdown(packets, contexts, inputNotes));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const parity = loadJson<LogicalParityReport>(LOGICAL_PARITY_PATH, "0A logical-parity");
  const inventory = loadJson<unknown>(FUNCTION_INVENTORY_PATH, "0B function-inventory");
  const skeleton = loadJson<unknown>(CONTROL_SKELETON_PATH, "0D control-skeleton");
  const impact = loadJson<CorpusImpactReport>(CORPUS_IMPACT_PATH, "0E corpus-impact");
  const divergence = loadJson<Parameters<typeof buildFallbackExamples>[0]>(DIVERGENCE_PATH, "raw divergence");
  const splits = loadJson<unknown>(SPLIT_OWNERSHIP_PATH, "0C split-ownership");
  // 0C is an envelope { splits: { <go file>: [<ts file>...] }, ... } per the
  // split-ownership map; tolerate a bare top-level map too.
  const splitMap = unwrapSplitOwnership(splits.value);

  // 0B/0D may be a bare array or an object-wrapped report; unwrap defensively.
  // 0B (function inventory) is per-symbol; 0D (control skeleton) nests its
  // per-function records under reports[].functions[], so flatten that.
  const inventoryEntries = asEntries<FunctionInventoryEntry>(inventory.value, ["entries", "inventory", "functions"]);
  const skeletonEntries = flattenSkeleton(skeleton.value);
  // 0E is { moduleImpacts: [...] } per checkTsgoCorpusImpact; tolerate a bare array too.
  const impactEntries = Array.isArray(impact.value)
    ? (impact.value as readonly CorpusImpactEntry[])
    : impact.value?.moduleImpacts ?? [];

  const inputNotes = [parity.note, inventory.note, skeleton.note, impact.note, divergence.note, splits.note];

  if (!parity.present || parity.value?.reports === undefined) {
    const message = `0A logical-parity report is required but unavailable. Run "npm run logical-parity:report" first.\n  ${inputNotes.join("\n  ")}`;
    if (outputJson()) {
      console.log(JSON.stringify({ generated: 0, packets: [], inputs: inputNotes, error: "missing-0A" }, null, 2));
    } else {
      console.error(message);
    }
    // Still write an empty index so downstream tooling has a stable artifact.
    mkdirSync(WORK_PACKETS_DIR, { recursive: true });
    writeFileSync(join(WORK_PACKETS_DIR, "index.json"), `${JSON.stringify({ generated: 0, packets: [], inputs: inputNotes }, null, 2)}\n`);
    process.exit(failOnFindings() ? 1 : 0);
  }

  const fallbackExamples = buildFallbackExamples(divergence.value);

  const inventoryByModule = indexByModule(inventoryEntries);
  const skeletonByModule = indexByModule(skeletonEntries);
  const impactByModule = indexByModule(impactEntries);

  const candidates = (parity.value.reports ?? []).filter(shouldEmit);
  const ordered = [...candidates].sort((a, b) => priorityWeight(b) - priorityWeight(a) || a.module.localeCompare(b.module));

  const built = ordered.map((module) =>
    buildPacket(
      module,
      inventoryByModule.get(module.module),
      skeletonByModule.get(module.module),
      impactByModule.get(module.module),
      splitMap,
      fallbackExamples.get(module.module) ?? [],
      impact.present,
    ),
  );

  const contexts = new Map(built.map((b) => [b.packet.id, b.context]));
  const weights = new Map(ordered.map((m) => [`tsgo-${slug(m.module)}-parity`, priorityWeight(m)]));
  const linked = linkSharedOwnership(built.map((b) => b.packet), contexts, weights);

  writePackets(linked, contexts, inputNotes);

  if (outputJson()) {
    console.log(JSON.stringify({ generated: linked.length, packets: linked, inputs: inputNotes }, null, 2));
  } else {
    console.log(`TSTS / TS-Go Work Packet Generator`);
    for (const note of inputNotes) console.log(`  ${note}`);
    console.log(`generated_packets=${linked.length} output=${rel(WORK_PACKETS_DIR)}`);
    for (const packet of linked) {
      const ctx = contexts.get(packet.id);
      console.log(
        `  ${packet.id} owned=${packet.ownedFiles.length} upstream=${packet.upstreamFiles.length} corpus=${packet.corpusExamples.length} blockedBy=${packet.blockedBy.length} blocks=${packet.blocks.length} decl_cov=${percent(ctx?.declarationCoverage ?? 0)} shape=${percent(ctx?.shapeScore ?? 0)}`,
      );
    }
  }

  // In strict mode, having outstanding packets is a finding (work remains).
  const hasFindings = linked.length > 0;
  process.exit(hasFindings && failOnFindings() ? 1 : 0);
}

main();
