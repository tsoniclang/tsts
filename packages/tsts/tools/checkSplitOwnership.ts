/**
 * Split-ownership map validator (Wave 0, 0C).
 *
 * Validates `.analysis/tsts-tsc/parity-maps/split-ownership.json`:
 *
 *   1. The JSON parses and has the expected top-level shape.
 *   2. Every upstream `.go` key resolves to a real file under TS-Go `internal/`.
 *   3. Every listed TSTS `.ts` file resolves to a real file under `packages/tsts/src/`.
 *   4. Every declared split actually maps to TWO OR MORE local files (a split, by definition).
 *   5. Reports TSTS source files that decompose a split-keyed module but are NOT
 *      declared anywhere in the map (undeclared decomposition — "suspicious" per
 *      workplan §3 rule 3). Barrels and generated files are excluded.
 *
 * This is a data-deliverable validator, not a compiler change. It runs in report
 * mode by default (`--no-fail` is the default posture); pass `--strict` to make a
 * structural inconsistency fail the process. Missing inputs are reported gracefully.
 *
 *   node packages/tsts/tools/checkSplitOwnership.ts          # human report
 *   node packages/tsts/tools/checkSplitOwnership.ts --json    # machine report
 *   node packages/tsts/tools/checkSplitOwnership.ts --strict  # exit 1 on inconsistency
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

interface SplitOwnership {
  readonly tsgoRoot?: string;
  readonly tstsRoot?: string;
  readonly splits: Readonly<Record<string, readonly string[]>>;
  readonly barrels?: { readonly files?: readonly string[] };
  // Confirmed 1:1 file ports (one upstream .go -> exactly one TSTS .ts). These
  // are NOT splits, but recording them lets the undeclared-local scan recognize
  // a file in a split-hosting dir as a verified 1:1 port rather than perpetually
  // re-flagging it. Each value is the single upstream .go path (relative to
  // tsgoRoot) the file ports; the validator confirms it resolves upstream.
  readonly oneToOne?: { readonly mappings?: Readonly<Record<string, string>> };
  // Enum-definition surface: hand-authored / codegen enum pairs under src/enums
  // (e.g. `scriptKind.enum.ts` + `scriptKind.ts`) that mirror an upstream enum
  // .go file. They are enum surface, not hand-port algorithm splits, so they are
  // declared here and excluded from undeclared-split detection.
  readonly enumSurface?: { readonly files?: readonly string[] };
  // TSTS files that port from MORE THAN ONE upstream .go file. Documented as
  // explicit cross-references; their `local` is treated as declared.
  readonly multiUpstreamLocals?: {
    readonly entries?: readonly { readonly local: string; readonly upstream: readonly string[] }[];
  };
}

interface Finding {
  readonly kind:
    | "missing-upstream"
    | "missing-local"
    | "not-a-split"
    | "undeclared-local"
    | "duplicate-local-in-key";
  readonly detail: string;
}

interface Report {
  readonly mapPath: string;
  readonly tsgoRoot: string;
  readonly tstsRoot: string;
  readonly upstreamKeys: number;
  readonly localFiles: number;
  readonly findings: readonly Finding[];
}

const TOOL_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(TOOL_DIR, "..");
const REPO_ROOT = join(PROJECT_ROOT, "..", "..");
const MAP_PATH = join(REPO_ROOT, ".analysis", "tsts-tsc", "parity-maps", "split-ownership.json");
const DEFAULT_TSGO_ROOT = "/home/jeswin/temp/typescript-go/internal";
const DEFAULT_TSTS_ROOT = "packages/tsts/src";

function outputJson(): boolean {
  return process.argv.includes("--json");
}

function strict(): boolean {
  return process.argv.includes("--strict");
}

function isTstsSource(path: string): boolean {
  if (!path.endsWith(".ts")) return false;
  if (path.endsWith(".test.ts") || path.endsWith(".d.ts")) return false;
  if (path.endsWith(".generated.ts")) return false;
  return true;
}

// Canonical "Code generated ... DO NOT EDIT." marker emitted by both TS-Go and
// TSTS generators (e.g. the Herebyfile generate:enums output under src/enums).
// Generated surfaces are the job of checkGenerated.ts / checkSchema.ts, NOT the
// hand-port split map, so they must be excluded from undeclared-split detection
// on the same terms as the README and checkLogicalParity. Detecting them by
// header (not just by `.generated.ts` suffix) closes the gap where generated
// files use a plain `.ts` / `.enum.ts` name.
function hasGeneratedHeader(text: string): boolean {
  const head = text.slice(0, 512);
  return /Code generated\b[\s\S]*?DO NOT EDIT\./.test(head);
}

function walk(dir: string): readonly string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function validate(map: SplitOwnership, tsgoRoot: string, tstsSrc: string): readonly Finding[] {
  const barrels = new Set(map.barrels?.files ?? []);
  const declaredLocals = new Set<string>();
  const findings: Finding[] = [];

  // Confirmed 1:1 ports: validate each side resolves, and register the local as
  // declared (a recognized 1:1 port is not an undeclared split).
  const oneToOne = map.oneToOne?.mappings ?? {};
  for (const [local, upstream] of Object.entries(oneToOne)) {
    if (!existsSync(join(tstsSrc, local))) {
      findings.push({ kind: "missing-local", detail: `${local} (oneToOne -> ${upstream}) not found in ${tstsSrc}` });
    }
    if (!existsSync(join(tsgoRoot, upstream))) {
      findings.push({ kind: "missing-upstream", detail: `${upstream} (oneToOne <- ${local}) not found under ${tsgoRoot}` });
    }
    declaredLocals.add(local);
  }

  // Enum-definition surface files (src/enums pairs): register as declared.
  const enumSurface = new Set(map.enumSurface?.files ?? []);
  for (const local of enumSurface) {
    if (!existsSync(join(tstsSrc, local))) {
      findings.push({ kind: "missing-local", detail: `${local} (enumSurface) not found in ${tstsSrc}` });
    }
    declaredLocals.add(local);
  }

  // Multi-upstream locals: a documented file that ports from >=2 upstream .go
  // files. Validate each upstream resolves and register the local as declared.
  for (const entry of map.multiUpstreamLocals?.entries ?? []) {
    if (!existsSync(join(tstsSrc, entry.local))) {
      findings.push({ kind: "missing-local", detail: `${entry.local} (multiUpstreamLocals) not found in ${tstsSrc}` });
    }
    for (const upstream of entry.upstream) {
      if (!existsSync(join(tsgoRoot, upstream))) {
        findings.push({ kind: "missing-upstream", detail: `${upstream} (multiUpstreamLocals <- ${entry.local}) not found under ${tsgoRoot}` });
      }
    }
    declaredLocals.add(entry.local);
  }

  for (const [upstream, locals] of Object.entries(map.splits)) {
    if (!existsSync(join(tsgoRoot, upstream))) {
      findings.push({ kind: "missing-upstream", detail: `${upstream} (key) not found under ${tsgoRoot}` });
    }
    if (locals.length < 2) {
      findings.push({ kind: "not-a-split", detail: `${upstream} declares ${locals.length} local file(s); a split needs >= 2` });
    }
    const seen = new Set<string>();
    for (const local of locals) {
      if (seen.has(local)) {
        findings.push({ kind: "duplicate-local-in-key", detail: `${local} listed twice under ${upstream}` });
      }
      seen.add(local);
      declaredLocals.add(local);
      if (!existsSync(join(tstsSrc, local))) {
        findings.push({ kind: "missing-local", detail: `${local} (under ${upstream}) not found in ${tstsSrc}` });
      }
    }
  }

  // Undeclared-decomposition scan: any TSTS source file inside a directory that
  // is the home of at least one split, but is neither declared nor a barrel/1:1.
  const declaredDirs = new Set(
    [...declaredLocals].map((local) => local.split("/")[0]),
  );
  for (const full of walk(tstsSrc)) {
    const rel = relative(tstsSrc, full).replace(/\\/g, "/");
    if (!isTstsSource(rel)) continue;
    if (rel.endsWith("/index.ts") || rel === "index.ts") continue;
    if (barrels.has(rel)) continue;
    // Skip generated and nested test fixtures: not hand-port splits.
    if (rel.includes("/generated/") || /(?:^|\/)[a-z]+tests?\//.test(rel)) continue;
    // Skip header-marked generated files (e.g. src/enums/*.ts from
    // generate:enums): generated-surface parity is checked elsewhere.
    if (hasGeneratedHeader(readFileSync(full, "utf8"))) continue;
    // Only audit the immediate split-hosting directory, not deeper sub-packages
    // (e.g. transformers/estransforms/*) which are their own port surfaces.
    if (rel.split("/").length > 2) continue;
    const dir = rel.split("/")[0];
    if (!declaredDirs.has(dir)) continue; // only audit dirs that host a split
    if (declaredLocals.has(rel)) continue;
    // A non-declared file in a split dir may legitimately be a 1:1 port; flag as
    // informational so a human can decide. We classify it as undeclared-local.
    findings.push({ kind: "undeclared-local", detail: `${rel} lives in a split-hosting dir but is not declared (verify it is a 1:1 port, not an undeclared split)` });
  }

  return findings;
}

function main(): void {
  if (!existsSync(MAP_PATH)) {
    console.error(`split-ownership map not found: ${MAP_PATH}`);
    process.exit(strict() ? 2 : 0);
  }
  const raw = readFileSync(MAP_PATH, "utf8");
  const map = JSON.parse(raw) as SplitOwnership;
  if (map.splits === undefined || typeof map.splits !== "object") {
    console.error("split-ownership map missing `splits` object");
    process.exit(strict() ? 2 : 0);
  }
  const tsgoRoot = process.env.TSGO_REPO !== undefined ? join(process.env.TSGO_REPO, "internal") : (map.tsgoRoot ?? DEFAULT_TSGO_ROOT);
  const tstsSrc = join(REPO_ROOT, map.tstsRoot ?? DEFAULT_TSTS_ROOT);

  const findings = existsSync(tsgoRoot) && existsSync(tstsSrc)
    ? validate(map, tsgoRoot, tstsSrc)
    : [];
  const localFiles = new Set([
    ...Object.values(map.splits).flat(),
    ...Object.keys(map.oneToOne?.mappings ?? {}),
    ...(map.enumSurface?.files ?? []),
  ]).size;
  const report: Report = {
    mapPath: relative(REPO_ROOT, MAP_PATH),
    tsgoRoot,
    tstsRoot: tstsSrc,
    upstreamKeys: Object.keys(map.splits).length,
    localFiles,
    findings,
  };

  if (outputJson()) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    const lines: string[] = [];
    lines.push("TSTS split-ownership map validation");
    lines.push(`map=${report.mapPath}`);
    lines.push(`tsgo_root=${report.tsgoRoot}${existsSync(tsgoRoot) ? "" : " (ABSENT — skipped upstream checks)"}`);
    lines.push(`upstream_split_keys=${report.upstreamKeys} declared_local_files=${report.localFiles} findings=${report.findings.length}`);
    const byKind = report.findings.reduce<Record<string, number>>((acc, f) => ({ ...acc, [f.kind]: (acc[f.kind] ?? 0) + 1 }), {});
    for (const [kind, count] of Object.entries(byKind)) lines.push(`  ${kind}=${count}`);
    for (const f of report.findings) lines.push(`  [${f.kind}] ${f.detail}`);
    console.log(lines.join("\n"));
  }

  const blocking = findings.filter((f) => f.kind !== "undeclared-local");
  process.exit(blocking.length > 0 && strict() ? 1 : 0);
}

main();
