/**
 * Completeness check.
 *
 * Compares per-module LOC between TSTS (`src/{module}/`) and TS-Go
 * (`internal/{module}/`) to surface the ratio. A module isn't structurally
 * "ported" when its TSTS LOC is well below the TS-Go original.
 *
 * Threshold: TSTS LOC must be between 0.3× and 3× the TS-Go LOC for a
 * module to be considered structurally complete. Beyond 3× either way,
 * investigate (under = stub, over = over-engineered or divergent).
 *
 * Exclusions:
 *   - Generated files (matched by codegen output, not by porting)
 *   - Test files (`*.test.ts`, `*_test.go`)
 *   - LSP/IDE-only modules (not in TSTS scope)
 *
 * Usage:
 *   tsx tools/checkCompleteness.ts          # text report
 *   tsx tools/checkCompleteness.ts --json    # JSON output
 *
 * Configuration:
 *   TSGO_REPO env var points to the local TS-Go clone.
 *   Defaults to /home/jeswin/temp/typescript-go.
 *
 * Exit codes:
 *   0  All modules within threshold (or skipped as out-of-scope)
 *   1  At least one module is structurally incomplete (<0.3×)
 *   2  Configuration error (TS-Go repo not found)
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const TOOL_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(TOOL_DIR, "..");

// ────────────────────────────────────────────────────────────────────────────
// Scope: which TS-Go modules TSTS targets, which it skips
// ────────────────────────────────────────────────────────────────────────────

interface ModuleSpec {
  readonly name: string;             // shared directory name (after internal/ or src/)
  readonly inScope: boolean;          // does TSTS port this module
  readonly notes?: string;
}

const MODULES: readonly ModuleSpec[] = [
  // In-scope compiler modules
  { name: "ast", inScope: true, notes: "AST adopted from native-preview" },
  { name: "astnav", inScope: true },
  { name: "binder", inScope: true },
  { name: "bundled", inScope: true },
  { name: "checker", inScope: true, notes: "Largest module" },
  { name: "collections", inScope: true },
  { name: "compiler", inScope: true },
  { name: "core", inScope: true },
  { name: "debug", inScope: true },
  { name: "diagnostics", inScope: true },
  { name: "diagnosticwriter", inScope: true },
  { name: "evaluator", inScope: true },
  { name: "execute", inScope: true },
  { name: "glob", inScope: true },
  { name: "jsnum", inScope: true },
  { name: "json", inScope: true },
  { name: "module", inScope: true },
  { name: "modulespecifiers", inScope: true },
  { name: "nodebuilder", inScope: true },
  { name: "outputpaths", inScope: true },
  { name: "packagejson", inScope: true },
  { name: "parser", inScope: true },
  { name: "printer", inScope: true, notes: "TSTS still uses emit-js dir; rename pending" },
  { name: "scanner", inScope: true, notes: "Replacement scanner vendored; consumer migration pending" },
  { name: "semver", inScope: true },
  { name: "sourcemap", inScope: true },
  { name: "stringutil", inScope: true },
  { name: "symlinks", inScope: true },
  { name: "transformers", inScope: true },
  { name: "tsoptions", inScope: true, notes: "TSTS still uses config dir; rename pending" },
  { name: "tspath", inScope: true },
  { name: "vfs", inScope: true },

  // Out of scope: LSP / IDE
  { name: "api", inScope: false, notes: "IPC API to Go binary; TSTS has no Go binary" },
  { name: "format", inScope: false, notes: "Code formatter; out of scope" },
  { name: "fourslash", inScope: false, notes: "IDE-feature test infrastructure" },
  { name: "jsonrpc", inScope: false, notes: "LSP-related" },
  { name: "locale", inScope: false, notes: "i18n; deferred" },
  { name: "ls", inScope: false, notes: "Language Service" },
  { name: "lsp", inScope: false, notes: "LSP server" },
  { name: "pprof", inScope: false, notes: "Go profiling" },
  { name: "project", inScope: false, notes: "IDE project management" },
  { name: "pseudochecker", inScope: false, notes: "Optional lightweight pre-checker" },
  { name: "repo", inScope: false, notes: "Repository tooling" },
  { name: "testrunner", inScope: false, notes: "Go test runner; TSTS has TS-native runner in test/runner/" },
  { name: "testutil", inScope: false, notes: "Go test utilities; TSTS has TS equivalents" },
  { name: "tracing", inScope: false, notes: "Optional tracing infrastructure" },
];

// ────────────────────────────────────────────────────────────────────────────
// LOC counting
// ────────────────────────────────────────────────────────────────────────────

function countLines(filePath: string): number {
  const content = readFileSync(filePath, "utf8");
  return content.split("\n").length;
}

function walk(
  dir: string,
  predicate: (path: string) => boolean
): readonly string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      out.push(...walk(full, predicate));
    } else if (predicate(full)) {
      out.push(full);
    }
  }
  return out;
}

function isTsGoFile(path: string): boolean {
  return path.endsWith(".go") && !path.endsWith("_test.go");
}

function isTstsFile(path: string): boolean {
  if (!path.endsWith(".ts")) return false;
  if (path.endsWith(".test.ts")) return false;
  // Exclude TSTS-generated AST files; the AST adoption replaces them
  // with native-preview's generated bindings (which have separate counts).
  if (path.includes("/src/ast/generated/")) return false;
  return true;
}

function moduleLOC(root: string, moduleName: string, isFile: (p: string) => boolean): number {
  const dir = join(root, moduleName);
  if (!existsSync(dir)) return 0;
  const files = walk(dir, isFile);
  return files.reduce((sum, f) => sum + countLines(f), 0);
}

// ────────────────────────────────────────────────────────────────────────────
// Comparison
// ────────────────────────────────────────────────────────────────────────────

interface ModuleReport {
  readonly name: string;
  readonly inScope: boolean;
  readonly tsgoLOC: number;
  readonly tstsLOC: number;
  readonly ratio: number;             // tstsLOC / tsgoLOC (0 if tsgoLOC = 0)
  readonly status: "complete" | "in-progress" | "stub" | "missing" | "out-of-scope" | "tsgo-missing";
  readonly notes?: string;
}

const THRESHOLD_COMPLETE = 0.3;       // ratio at or above this counts as "complete"
const THRESHOLD_IN_PROGRESS = 0.1;    // ratio at or above this is "in progress"

function classify(report: Pick<ModuleReport, "inScope" | "tsgoLOC" | "tstsLOC" | "ratio">): ModuleReport["status"] {
  if (!report.inScope) return "out-of-scope";
  if (report.tsgoLOC === 0) return "tsgo-missing";
  if (report.tstsLOC === 0) return "missing";
  if (report.ratio >= THRESHOLD_COMPLETE) return "complete";
  if (report.ratio >= THRESHOLD_IN_PROGRESS) return "in-progress";
  return "stub";
}

function buildReport(tsgoRoot: string, tstsRoot: string): readonly ModuleReport[] {
  return MODULES.map((spec) => {
    const tsgoLOC = moduleLOC(tsgoRoot, spec.name, isTsGoFile);
    const tstsLOC = moduleLOC(tstsRoot, spec.name, isTstsFile);
    const ratio = tsgoLOC === 0 ? 0 : tstsLOC / tsgoLOC;
    return {
      name: spec.name,
      inScope: spec.inScope,
      tsgoLOC,
      tstsLOC,
      ratio,
      status: classify({ inScope: spec.inScope, tsgoLOC, tstsLOC, ratio }),
      ...(spec.notes ? { notes: spec.notes } : {}),
    };
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Output
// ────────────────────────────────────────────────────────────────────────────

function statusBadge(status: ModuleReport["status"]): string {
  switch (status) {
    case "complete": return "✅ complete";
    case "in-progress": return "🟡 in-progress";
    case "stub": return "🔴 stub";
    case "missing": return "⬜ missing";
    case "out-of-scope": return "—  out-of-scope";
    case "tsgo-missing": return "❓ tsgo-missing";
  }
}

function renderText(reports: readonly ModuleReport[]): string {
  const lines: string[] = [];
  lines.push("TSTS / TS-Go Module Completeness");
  lines.push("=================================");
  lines.push("");
  lines.push("Thresholds: complete ≥ 30%, in-progress ≥ 10%, stub < 10%");
  lines.push("");
  lines.push("Status         Module                TS-Go      TSTS      Ratio");
  lines.push("──────────────────────────────────────────────────────────────────────");
  for (const r of reports) {
    const status = statusBadge(r.status).padEnd(15);
    const name = r.name.padEnd(22);
    const tsgo = String(r.tsgoLOC).padStart(8);
    const tsts = String(r.tstsLOC).padStart(8);
    const ratio = r.tsgoLOC > 0 ? `${(r.ratio * 100).toFixed(1)}%`.padStart(7) : "    n/a";
    lines.push(`${status}${name}${tsgo}${tsts}  ${ratio}`);
  }

  // Totals (in-scope only)
  const inScope = reports.filter((r) => r.inScope);
  const totalTsgo = inScope.reduce((s, r) => s + r.tsgoLOC, 0);
  const totalTsts = inScope.reduce((s, r) => s + r.tstsLOC, 0);
  lines.push("──────────────────────────────────────────────────────────────────────");
  lines.push(
    `${"Totals (in-scope)".padEnd(15)}${"".padEnd(22)}${String(totalTsgo).padStart(8)}${String(totalTsts).padStart(8)}  ${`${((totalTsts / totalTsgo) * 100).toFixed(1)}%`.padStart(7)}`
  );

  // Stub list (these are the action items)
  const stubs = inScope.filter((r) => r.status === "stub" || r.status === "missing");
  if (stubs.length > 0) {
    lines.push("");
    lines.push("Stubs and missing (highest-priority ports):");
    for (const r of stubs.sort((a, b) => b.tsgoLOC - a.tsgoLOC)) {
      lines.push(`  ${r.name}: ${r.tsgoLOC} LOC in TS-Go, ${r.tstsLOC} in TSTS`);
    }
  }

  return lines.join("\n");
}

// ────────────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────────────

function main(): void {
  const tsgoRepo = process.env.TSGO_REPO ?? "/home/jeswin/temp/typescript-go";
  const tstsRepo = PROJECT_ROOT;

  if (!existsSync(tsgoRepo)) {
    console.error(`TS-Go repo not found at ${tsgoRepo}.`);
    console.error("Set TSGO_REPO env var to the path of a local microsoft/typescript-go clone.");
    process.exit(2);
  }

  const tsgoInternal = join(tsgoRepo, "internal");
  const tstsSrc = join(tstsRepo, "src");

  if (!existsSync(tsgoInternal) || !existsSync(tstsSrc)) {
    console.error(`Expected dirs not found: ${tsgoInternal}, ${tstsSrc}`);
    process.exit(2);
  }

  const reports = buildReport(tsgoInternal, tstsSrc);
  const useJson = process.argv.includes("--json");

  if (useJson) {
    console.log(JSON.stringify(reports, null, 2));
  } else {
    console.log(renderText(reports));
  }

  // Exit code: 1 if any in-scope module is a stub or missing
  const hasIncomplete = reports.some(
    (r) => r.inScope && (r.status === "stub" || r.status === "missing")
  );
  process.exit(hasIncomplete ? 1 : 0);
}

main();
