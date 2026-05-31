/**
 * Strict TS-Go parity check.
 *
 * This is intentionally stricter than check-completeness.ts. The old script
 * labels a module complete at 30% LOC coverage; this script treats parity as
 * a high-water gate and fails required modules below the configured threshold.
 *
 * Default threshold: 90%.
 *
 * Usage:
 *   node packages/tsts/tools/check-parity.ts
 *   node packages/tsts/tools/check-parity.ts --threshold=0.8
 *   node packages/tsts/tools/check-parity.ts --json
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const TOOL_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(TOOL_DIR, "..");
const DEFAULT_TSGO_REPO = "/home/jeswin/temp/typescript-go";
const DEFAULT_THRESHOLD = 0.9;
const MAX_REASONABLE_SIZE_RATIO = 1.5;

type ModuleScope = "required" | "deferred";

interface ModuleSpec {
  readonly upstream: string;
  readonly local: readonly string[];
  readonly scope: ModuleScope;
  readonly notes?: string;
}

interface FileStats {
  readonly count: number;
  readonly physicalLOC: number;
  readonly sourceLOC: number;
  readonly files: readonly string[];
}

interface ModuleReport {
  readonly module: string;
  readonly local: readonly string[];
  readonly scope: ModuleScope;
  readonly upstreamFiles: number;
  readonly localFiles: number;
  readonly upstreamSourceLOC: number;
  readonly localSourceLOC: number;
  readonly sourceCoverage: number;
  readonly upstreamPhysicalLOC: number;
  readonly localPhysicalLOC: number;
  readonly physicalCoverage: number;
  readonly effectiveCoverage: number;
  readonly fileCoverage: number;
  readonly sizeRatio: number;
  readonly status: "pass" | "fail" | "deferred" | "missing-upstream";
  readonly missingFiles: readonly string[];
  readonly extraFiles: readonly string[];
  readonly notes?: string;
}

const REQUIRED_MODULES: readonly ModuleSpec[] = [
  { upstream: "api", local: ["api"], scope: "required", notes: "TSTS has TS-native API surface; Go binary IPC portions may need explicit local equivalents." },
  { upstream: "ast", local: ["ast"], scope: "required", notes: "Includes generated AST contract output." },
  { upstream: "astnav", local: ["astnav"], scope: "required" },
  { upstream: "binder", local: ["binder"], scope: "required" },
  { upstream: "bundled", local: ["bundled"], scope: "required" },
  { upstream: "checker", local: ["checker"], scope: "required" },
  { upstream: "collections", local: ["collections"], scope: "required" },
  { upstream: "compiler", local: ["compiler"], scope: "required" },
  { upstream: "core", local: ["core"], scope: "required" },
  { upstream: "debug", local: ["debug"], scope: "required" },
  { upstream: "diagnostics", local: ["diagnostics"], scope: "required" },
  { upstream: "diagnosticwriter", local: ["diagnosticwriter"], scope: "required" },
  { upstream: "evaluator", local: ["evaluator"], scope: "required" },
  { upstream: "execute", local: ["execute"], scope: "required" },
  { upstream: "format", local: ["format"], scope: "required" },
  { upstream: "glob", local: ["glob"], scope: "required" },
  { upstream: "jsnum", local: ["jsnum"], scope: "required" },
  { upstream: "json", local: ["json"], scope: "required" },
  { upstream: "module", local: ["module"], scope: "required" },
  { upstream: "modulespecifiers", local: ["modulespecifiers"], scope: "required" },
  { upstream: "nodebuilder", local: ["nodebuilder"], scope: "required" },
  { upstream: "outputpaths", local: ["outputpaths"], scope: "required" },
  { upstream: "packagejson", local: ["packagejson"], scope: "required" },
  { upstream: "parser", local: ["parser"], scope: "required" },
  { upstream: "printer", local: ["printer", "emit-js"], scope: "required", notes: "Current TSTS still has legacy emit-js alongside printer." },
  { upstream: "project", local: ["project"], scope: "required" },
  { upstream: "pseudochecker", local: ["pseudochecker"], scope: "required" },
  { upstream: "scanner", local: ["scanner"], scope: "required" },
  { upstream: "semver", local: ["semver"], scope: "required" },
  { upstream: "sourcemap", local: ["sourcemap"], scope: "required" },
  { upstream: "stringutil", local: ["stringutil"], scope: "required" },
  { upstream: "symlinks", local: ["symlinks"], scope: "required" },
  { upstream: "testrunner", local: ["runner"], scope: "required", notes: "Mapped to TSTS runner module." },
  { upstream: "testutil", local: ["testutil"], scope: "required" },
  { upstream: "transformers", local: ["transformers"], scope: "required" },
  { upstream: "tsoptions", local: ["tsoptions", "config"], scope: "required", notes: "Current TSTS still has config alongside tsoptions." },
  { upstream: "tspath", local: ["tspath"], scope: "required" },
  { upstream: "vfs", local: ["vfs"], scope: "required" },
];

const DEFERRED_MODULES: readonly ModuleSpec[] = [
  { upstream: "fourslash", local: ["fourslash"], scope: "deferred", notes: "IDE test harness; parity is useful but not compiler-runtime blocking." },
  { upstream: "jsonrpc", local: ["jsonrpc"], scope: "deferred", notes: "LSP transport." },
  { upstream: "locale", local: ["locale"], scope: "deferred", notes: "Localization data." },
  { upstream: "ls", local: ["ls"], scope: "deferred", notes: "Language service." },
  { upstream: "lsp", local: ["lsp"], scope: "deferred", notes: "LSP server." },
  { upstream: "pprof", local: ["pprof"], scope: "deferred", notes: "Go profiling adapter." },
  { upstream: "repo", local: ["repo"], scope: "deferred", notes: "Repository tooling." },
  { upstream: "tracing", local: ["tracing"], scope: "deferred", notes: "Optional tracing infrastructure." },
];

function parseThreshold(): number {
  const arg = process.argv.find((value) => value.startsWith("--threshold="));
  if (arg === undefined) return DEFAULT_THRESHOLD;
  const raw = arg.slice("--threshold=".length);
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 1) {
    throw new Error(`Invalid --threshold value: ${raw}`);
  }
  return parsed;
}

function includeDeferred(): boolean {
  return process.argv.includes("--all");
}

function useJson(): boolean {
  return process.argv.includes("--json");
}

function countPhysicalLines(filePath: string): number {
  const text = readFileSync(filePath, "utf8");
  return text.length === 0 ? 0 : text.split("\n").length;
}

function countSourceLines(filePath: string): number {
  const text = readFileSync(filePath, "utf8");
  const withoutBlockComments = text.replace(/\/\*[\s\S]*?\*\//g, "");
  return withoutBlockComments
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      return trimmed !== "" && !trimmed.startsWith("//");
    })
    .length;
}

function walk(dir: string, predicate: (path: string) => boolean): readonly string[] {
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

function isTsGoSource(path: string): boolean {
  if (!path.endsWith(".go") || path.endsWith("_test.go")) return false;
  const header = readFileSync(path, "utf8").slice(0, 256);
  return !header.includes("//go:build ignore");
}

function isTstsSource(path: string): boolean {
  if (!path.endsWith(".ts")) return false;
  if (path.endsWith(".test.ts")) return false;
  if (path.endsWith(".d.ts")) return false;
  return true;
}

function collectStats(root: string, modules: readonly string[], predicate: (path: string) => boolean): FileStats {
  const files: string[] = [];
  for (const moduleName of modules) {
    const dir = join(root, moduleName);
    files.push(...walk(dir, predicate));
  }
  const unique = [...new Set(files)].sort();
  return {
    count: unique.length,
    physicalLOC: unique.reduce((sum, file) => sum + countPhysicalLines(file), 0),
    sourceLOC: unique.reduce((sum, file) => sum + countSourceLines(file), 0),
    files: unique.map((file) => relative(root, file).replace(/\\/g, "/")),
  };
}

function comparableName(path: string): string {
  const slash = path.lastIndexOf("/");
  const base = slash === -1 ? path : path.slice(slash + 1);
  const dot = base.lastIndexOf(".");
  return dot === -1 ? base : base.slice(0, dot);
}

function missingComparableFiles(upstreamFiles: readonly string[], localFiles: readonly string[]): readonly string[] {
  const localNames = new Set(localFiles.map(comparableName));
  return upstreamFiles.filter((file) => !localNames.has(comparableName(file)));
}

function extraComparableFiles(upstreamFiles: readonly string[], localFiles: readonly string[]): readonly string[] {
  const upstreamNames = new Set(upstreamFiles.map(comparableName));
  return localFiles.filter((file) => !upstreamNames.has(comparableName(file)));
}

function buildReport(tsgoInternal: string, tstsSrc: string, threshold: number): readonly ModuleReport[] {
  const specs = includeDeferred() ? [...REQUIRED_MODULES, ...DEFERRED_MODULES] : REQUIRED_MODULES;
  return specs.map((spec) => {
    const upstream = collectStats(tsgoInternal, [spec.upstream], isTsGoSource);
    const local = collectStats(tstsSrc, spec.local, isTstsSource);
    const sourceCoverage = upstream.sourceLOC === 0 ? 0 : Math.min(local.sourceLOC / upstream.sourceLOC, 1);
    const physicalCoverage = upstream.physicalLOC === 0 ? 0 : Math.min(local.physicalLOC / upstream.physicalLOC, 1);
    const effectiveCoverage = Math.max(sourceCoverage, physicalCoverage);
    const fileCoverage = upstream.count === 0 ? 0 : Math.min(local.count / upstream.count, 1);
    const sizeRatio = upstream.sourceLOC === 0 ? 0 : local.sourceLOC / upstream.sourceLOC;
    const isPassing = spec.scope === "deferred" || (effectiveCoverage >= threshold && fileCoverage >= threshold);
    const status = upstream.count === 0
      ? "missing-upstream"
      : spec.scope === "deferred"
        ? "deferred"
        : isPassing
          ? "pass"
          : "fail";
    return {
      module: spec.upstream,
      local: spec.local,
      scope: spec.scope,
      upstreamFiles: upstream.count,
      localFiles: local.count,
      upstreamSourceLOC: upstream.sourceLOC,
      localSourceLOC: local.sourceLOC,
      sourceCoverage,
      upstreamPhysicalLOC: upstream.physicalLOC,
      localPhysicalLOC: local.physicalLOC,
      physicalCoverage,
      effectiveCoverage,
      fileCoverage,
      sizeRatio,
      status,
      missingFiles: missingComparableFiles(upstream.files, local.files).slice(0, 20),
      extraFiles: extraComparableFiles(upstream.files, local.files).slice(0, 20),
      ...(spec.notes ? { notes: spec.notes } : {}),
    };
  });
}

function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function renderText(reports: readonly ModuleReport[], threshold: number): string {
  const required = reports.filter((report) => report.scope === "required");
  const totalUpstreamSourceLoc = required.reduce((sum, report) => sum + report.upstreamSourceLOC, 0);
  const totalLocalSourceLoc = required.reduce((sum, report) => sum + report.localSourceLOC, 0);
  const totalUpstreamPhysicalLoc = required.reduce((sum, report) => sum + report.upstreamPhysicalLOC, 0);
  const totalLocalPhysicalLoc = required.reduce((sum, report) => sum + report.localPhysicalLOC, 0);
  const totalUpstreamFiles = required.reduce((sum, report) => sum + report.upstreamFiles, 0);
  const totalLocalFiles = required.reduce((sum, report) => sum + report.localFiles, 0);
  const failing = required.filter((report) => report.status === "fail");

  const lines: string[] = [];
  lines.push("TSTS / TS-Go Strict Parity");
  lines.push(`threshold=${percent(threshold)} required_modules=${required.length} failing_modules=${failing.length}`);
  lines.push(`totals source_loc=${totalLocalSourceLoc}/${totalUpstreamSourceLoc} source_coverage=${percent(Math.min(totalLocalSourceLoc / totalUpstreamSourceLoc, 1))} physical_loc=${totalLocalPhysicalLoc}/${totalUpstreamPhysicalLoc} physical_coverage=${percent(Math.min(totalLocalPhysicalLoc / totalUpstreamPhysicalLoc, 1))} files=${totalLocalFiles}/${totalUpstreamFiles} file_coverage=${percent(Math.min(totalLocalFiles / totalUpstreamFiles, 1))}`);
  lines.push("");
  lines.push("status module local_paths files local/upstream file_cov source_loc local/upstream source_cov physical_cov effective_cov size");
  for (const report of reports) {
    const status = report.status.toUpperCase();
    const paths = report.local.join("+");
    lines.push(`${status} ${report.module} ${paths} files=${report.localFiles}/${report.upstreamFiles} file_cov=${percent(report.fileCoverage)} source_loc=${report.localSourceLOC}/${report.upstreamSourceLOC} source_cov=${percent(report.sourceCoverage)} physical_cov=${percent(report.physicalCoverage)} effective_cov=${percent(report.effectiveCoverage)} size=${report.sizeRatio.toFixed(2)}x`);
    if (report.sizeRatio > MAX_REASONABLE_SIZE_RATIO && report.scope === "required") {
      lines.push(`WARN ${report.module} local LOC is ${report.sizeRatio.toFixed(2)}x upstream; audit for divergent implementation or generated verbosity.`);
    }
    if (report.missingFiles.length > 0 && report.status === "fail") {
      lines.push(`MISSING ${report.module} ${report.missingFiles.join(", ")}`);
    }
  }
  return lines.join("\n");
}

function main(): void {
  const threshold = parseThreshold();
  const tsgoRepo = process.env.TSGO_REPO ?? DEFAULT_TSGO_REPO;
  const tsgoInternal = join(tsgoRepo, "internal");
  const tstsSrc = join(PROJECT_ROOT, "src");

  if (!existsSync(tsgoInternal)) {
    console.error(`TS-Go internal directory not found: ${tsgoInternal}`);
    process.exit(2);
  }
  if (!existsSync(tstsSrc)) {
    console.error(`TSTS src directory not found: ${tstsSrc}`);
    process.exit(2);
  }

  const reports = buildReport(tsgoInternal, tstsSrc, threshold);
  if (useJson()) {
    console.log(JSON.stringify({ threshold, reports }, null, 2));
  } else {
    console.log(renderText(reports, threshold));
  }

  const hasFailure = reports.some((report) => report.scope === "required" && report.status === "fail");
  process.exit(hasFailure ? 1 : 0);
}

main();
