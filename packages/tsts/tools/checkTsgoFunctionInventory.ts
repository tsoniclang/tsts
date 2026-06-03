/**
 * TS-Go function inventory.
 *
 * Wave-0 tool 0B from the logical-parity parallel workplan
 * (.analysis/tsts-tsc/tsgo-logical-parity-parallel-workplan.md §2).
 *
 * TSTS must be a MECHANICAL 1:1 port of typescript-go: the same functions and
 * methods, named the same where practical. This tool maps every TS-Go
 * function/method (parsed from /home/jeswin/temp/typescript-go/internal) to a
 * TSTS function/method (parsed from packages/tsts/src) or to an explicit
 * deferral, and emits a per-symbol inventory so drift from the upstream
 * function surface becomes a measurable, work-packetable signal.
 *
 * This is structural, not semantic. It proves only whether a same-named
 * function/method exists locally; the TS-Go conformance corpus remains the
 * semantic source of truth. Initial baselines are expected to show large gaps
 * (that is the signal). Run with --no-fail to surface gaps without failing.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

type Scope = "required" | "deferred";
type Status = "matched" | "missing" | "split" | "renamed" | "generated" | "deferred";
type Confidence = "exact" | "case-insensitive" | "alias" | "manual";

interface ModuleSpec {
  readonly upstream: string;
  readonly local: readonly string[];
  readonly scope: Scope;
}

interface SourceFile {
  readonly path: string;
  readonly text: string;
}

interface GoSymbol {
  readonly file: string;
  readonly symbol: string;
  readonly receiver: string | undefined;
  readonly name: string;
}

interface LocalSymbol {
  readonly file: string;
  readonly name: string;
  readonly kind: "function" | "method" | "arrow";
}

interface InventoryEntry {
  readonly module: string;
  readonly upstreamFile: string;
  readonly upstreamSymbol: string;
  readonly localCandidates: readonly string[];
  readonly status: Status;
  readonly confidence: Confidence | null;
  readonly notes: readonly string[];
}

interface ModuleSummary {
  readonly module: string;
  readonly scope: Scope;
  readonly upstreamSymbols: number;
  readonly matched: number;
  readonly missing: number;
  readonly renamed: number;
  readonly split: number;
  readonly generated: number;
  readonly deferred: number;
  readonly coverage: number;
}

interface FunctionInventoryReport {
  readonly tsgoRepo: string;
  readonly mappingFile: string | null;
  readonly totals: {
    readonly upstreamSymbols: number;
    readonly matched: number;
    readonly missing: number;
    readonly renamed: number;
    readonly split: number;
    readonly generated: number;
    readonly deferred: number;
    readonly coverage: number;
  };
  readonly modules: readonly ModuleSummary[];
  readonly entries: readonly InventoryEntry[];
}

/**
 * Optional manual mapping file shape (under .analysis/tsts-tsc/parity-maps/).
 * Keys are upstream symbols as `module:Symbol` or fully qualified
 * `upstreamFile#Symbol`; values describe the intended local mapping. This lets
 * maintainers record renamed/split/deferred/generated facts that the mechanical
 * matcher cannot infer on its own.
 */
interface MappingEntry {
  readonly localCandidates?: readonly string[];
  readonly status?: Status;
  readonly notes?: readonly string[];
}

interface MappingFile {
  readonly functions?: Record<string, MappingEntry>;
}

const TOOL_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(TOOL_DIR, "..");
const REPO_ROOT = join(PROJECT_ROOT, "..", "..");
const DEFAULT_TSGO_REPO = "/home/jeswin/temp/typescript-go";
const MAPPING_PATH = join(REPO_ROOT, ".analysis", "tsts-tsc", "parity-maps", "function-inventory-map.json");

// Keep the module list aligned with checkLogicalParity.ts so the two Wave-0
// tools report on the same surface. Drift between the two lists would make the
// inventory misleading.
const MODULES: readonly ModuleSpec[] = [
  { upstream: "api", local: ["api"], scope: "required" },
  { upstream: "ast", local: ["ast"], scope: "required" },
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
  { upstream: "printer", local: ["printer", "emit-js"], scope: "required" },
  { upstream: "project", local: ["project"], scope: "required" },
  { upstream: "pseudochecker", local: ["pseudochecker"], scope: "required" },
  { upstream: "scanner", local: ["scanner"], scope: "required" },
  { upstream: "semver", local: ["semver"], scope: "required" },
  { upstream: "sourcemap", local: ["sourcemap"], scope: "required" },
  { upstream: "stringutil", local: ["stringutil"], scope: "required" },
  { upstream: "symlinks", local: ["symlinks"], scope: "required" },
  { upstream: "testrunner", local: ["runner"], scope: "required" },
  { upstream: "testutil", local: ["testutil"], scope: "required" },
  { upstream: "transformers", local: ["transformers"], scope: "required" },
  { upstream: "tsoptions", local: ["tsoptions", "config"], scope: "required" },
  { upstream: "tspath", local: ["tspath"], scope: "required" },
  { upstream: "vfs", local: ["vfs"], scope: "required" },
  { upstream: "locale", local: ["locale"], scope: "deferred" },
  { upstream: "pprof", local: ["pprof"], scope: "deferred" },
  { upstream: "repo", local: ["repo"], scope: "deferred" },
  { upstream: "tracing", local: ["tracing"], scope: "deferred" },
];

const EXCLUDED_TSTS_FILES = new Set([
  "ast/ast.ts",
  "ast/clone.ts",
  "ast/is.ts",
  "ast/utils.ts",
  "astnav/astnav.ts",
  "scanner/scanner.nativePreview.ts",
]);

const EXCLUDED_TSGO_FILES = new Set([
  "testutil/lsptestutil/lspclient.go",
]);

// Go keywords / control words that must never be treated as method names when
// scanning TSTS for method-shaped lines.
const TS_NON_METHOD_WORDS = new Set([
  "if", "for", "switch", "while", "catch", "return", "throw", "new", "function",
  "do", "else", "case", "default", "typeof", "await", "yield", "in", "of",
  "constructor",
]);

function includeDeferred(): boolean {
  return process.argv.includes("--all") || process.argv.includes("--full");
}

function outputJson(): boolean {
  return process.argv.includes("--json");
}

function failOnFindings(): boolean {
  return !process.argv.includes("--no-fail");
}

function walk(dir: string, predicate: (path: string) => boolean): readonly string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...walk(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
}

/**
 * A Go file is "generated scaffolding" when its on-disk name marks it as
 * generated. These surfaces must be checked by schema/generated parity tools,
 * not counted as hand-port algorithm drift, so we classify their symbols as
 * `generated` rather than `missing`.
 */
function isGeneratedGoFile(path: string): boolean {
  return path.endsWith("_generated.go")
    || path.endsWith("_stringer.go")
    || path.endsWith("stringer_generated.go")
    || path.endsWith("/generate.go");
}

function isGoSource(path: string): boolean {
  if (!path.endsWith(".go") || path.endsWith("_test.go")) return false;
  if (path.endsWith("/generate.go")) return false;
  return !readFileSync(path, "utf8").slice(0, 256).includes("//go:build ignore");
}

function isTstsSource(path: string): boolean {
  if (!path.endsWith(".ts")) return false;
  if (path.endsWith(".test.ts") || path.endsWith(".d.ts")) return false;
  if (path.endsWith(".generated.ts")) return false;
  return true;
}

function collectFiles(
  root: string,
  modules: readonly string[],
  predicate: (path: string) => boolean,
  excluded: ReadonlySet<string>,
): readonly SourceFile[] {
  const files = modules.flatMap((moduleName) => walk(join(root, moduleName), predicate));
  return [...new Set(files)]
    .sort()
    .map((file) => ({ full: file, rel: relative(root, file).replace(/\\/g, "/") }))
    .filter((file) => !excluded.has(file.rel))
    .map((file) => ({ path: file.rel, text: readFileSync(file.full, "utf8") }));
}

function stripLineComment(line: string): string {
  const index = line.indexOf("//");
  return index < 0 ? line : line.slice(0, index);
}

function normalizeName(name: string): string {
  return name.replace(/^#/, "").replace(/^_+/, "").toLowerCase();
}

/**
 * Extract every Go function and method declaration.
 *
 * - `func Name(...)`                       -> symbol `Name`
 * - `func Name[T any](...)`                -> symbol `Name`
 * - `func (r *Recv) Name(...)`             -> symbol `Recv.Name`
 * - `func (r *Recv[K, N]) Name(...)`       -> symbol `Recv.Name`
 *
 * The receiver type strips the pointer marker and any generic type-parameter
 * list, matching how the upstream method would be ported onto a TSTS class /
 * standalone function of the same base name.
 */
function extractGoSymbols(files: readonly SourceFile[]): readonly GoSymbol[] {
  const symbols: GoSymbol[] = [];
  const seen = new Set<string>();
  for (const file of files) {
    for (const rawLine of file.text.split("\n")) {
      const line = stripLineComment(rawLine);
      if (!line.startsWith("func ")) continue;

      const method = /^func\s+\(\s*[A-Za-z_]\w*\s+\*?([A-Za-z_]\w*)(?:\[[^\]]*\])?\s*\)\s*([A-Za-z_]\w*)\s*(?:\[|\()/.exec(line);
      if (method !== null) {
        const receiver = method[1];
        const name = method[2];
        if (receiver !== undefined && name !== undefined) {
          const symbol = `${receiver}.${name}`;
          const key = `${file.path}#${symbol}`;
          if (!seen.has(key)) {
            seen.add(key);
            symbols.push({ file: file.path, symbol, receiver, name });
          }
        }
        continue;
      }

      const free = /^func\s+([A-Za-z_]\w*)\s*(?:\[|\()/.exec(line);
      if (free !== null) {
        const name = free[1];
        if (name !== undefined) {
          const key = `${file.path}#${name}`;
          if (!seen.has(key)) {
            seen.add(key);
            symbols.push({ file: file.path, symbol: name, receiver: undefined, name });
          }
        }
      }
    }
  }
  return symbols;
}

/**
 * Extract every TSTS function, arrow-bound const, and class/object method.
 *
 * Names are recorded with their owning file so candidate references read
 * `file:name`. Private (`#name`) methods are recorded under their bare name so
 * they can match an upstream lowercase method.
 */
function extractLocalSymbols(files: readonly SourceFile[]): readonly LocalSymbol[] {
  const symbols: LocalSymbol[] = [];
  for (const file of files) {
    for (const rawLine of file.text.split("\n")) {
      const line = stripLineComment(rawLine);

      const fn = /^\s*(?:export\s+)?(?:declare\s+)?(?:async\s+)?function\s*\*?\s*([A-Za-z_$][\w$]*)\b/.exec(line);
      if (fn !== null) {
        const name = fn[1];
        if (name !== undefined) {
          symbols.push({ file: file.path, name, kind: "function" });
        }
        continue;
      }

      const arrow = /^\s*(?:export\s+)?(?:declare\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*(?:async\s+)?(?:<[^>]*>\s*)?\([^)]*\)\s*(?::[^=]+)?=>/.exec(line);
      if (arrow !== null) {
        const name = arrow[1];
        if (name !== undefined) {
          symbols.push({ file: file.path, name, kind: "arrow" });
        }
        continue;
      }

      const method = /^\s*(?:public\s+|private\s+|protected\s+|static\s+|override\s+|abstract\s+|async\s+|readonly\s+)*(?:get\s+|set\s+)?(#?[A-Za-z_$][\w$]*)\s*(?:<[^>{}]*>)?\([^;{}]*\)\s*(?::[^=>{}]*)?\{/.exec(line);
      if (method !== null) {
        const raw = method[1];
        if (raw !== undefined) {
          const name = raw.replace(/^#/, "");
          if (!TS_NON_METHOD_WORDS.has(name)) {
            symbols.push({ file: file.path, name: raw, kind: "method" });
          }
        }
      }
    }
  }
  return symbols;
}

function loadMappingFile(): { readonly path: string | null; readonly functions: Record<string, MappingEntry> } {
  if (!existsSync(MAPPING_PATH)) return { path: null, functions: {} };
  try {
    const parsed = JSON.parse(readFileSync(MAPPING_PATH, "utf8")) as MappingFile;
    return { path: relative(REPO_ROOT, MAPPING_PATH).replace(/\\/g, "/"), functions: parsed.functions ?? {} };
  } catch (error) {
    console.error(`Failed to parse mapping file ${MAPPING_PATH}: ${(error as Error).message}`);
    return { path: null, functions: {} };
  }
}

function mappingLookup(
  functions: Record<string, MappingEntry>,
  module: string,
  upstreamFile: string,
  symbol: string,
): MappingEntry | undefined {
  return functions[`${upstreamFile}#${symbol}`]
    ?? functions[`${module}:${symbol}`]
    ?? functions[symbol];
}

/**
 * Build the per-symbol inventory entry for a single upstream Go function/method
 * by matching it against the local symbol index.
 *
 * Matching tiers, highest confidence first:
 *   exact            - same bare name (case-sensitive)
 *   case-insensitive - same name ignoring case (likely an exported/private
 *                      casing split)
 *   alias            - the mapping file records local candidates
 *   manual           - the mapping file records a status with no candidate
 */
function inventoryEntry(
  module: string,
  scope: Scope,
  go: GoSymbol,
  isGenerated: boolean,
  byName: ReadonlyMap<string, readonly LocalSymbol[]>,
  byLowerName: ReadonlyMap<string, readonly LocalSymbol[]>,
  mapping: Record<string, MappingEntry>,
): InventoryEntry {
  const override = mappingLookup(mapping, module, go.file, go.symbol);

  if (override?.status !== undefined && (override.localCandidates === undefined || override.localCandidates.length === 0)) {
    return {
      module,
      upstreamFile: go.file,
      upstreamSymbol: go.symbol,
      localCandidates: [],
      status: override.status,
      confidence: "manual",
      notes: [...(override.notes ?? []), "manual mapping override"],
    };
  }

  if (override?.localCandidates !== undefined && override.localCandidates.length > 0) {
    return {
      module,
      upstreamFile: go.file,
      upstreamSymbol: go.symbol,
      localCandidates: override.localCandidates,
      status: override.status ?? "matched",
      confidence: "alias",
      notes: [...(override.notes ?? []), "mapped via parity-maps/function-inventory-map.json"],
    };
  }

  const exact = byName.get(go.name) ?? [];
  if (exact.length > 0) {
    const candidates = [...new Set(exact.map((s) => `${s.file}:${s.name}`))];
    const split = candidates.length > 1;
    return {
      module,
      upstreamFile: go.file,
      upstreamSymbol: go.symbol,
      localCandidates: candidates,
      status: split ? "split" : "matched",
      confidence: "exact",
      notes: split ? [`${candidates.length} local files define this name; confirm split ownership`] : [],
    };
  }

  const fuzzy = byLowerName.get(go.name.toLowerCase()) ?? [];
  if (fuzzy.length > 0) {
    const candidates = [...new Set(fuzzy.map((s) => `${s.file}:${s.name}`))];
    return {
      module,
      upstreamFile: go.file,
      upstreamSymbol: go.symbol,
      localCandidates: candidates,
      status: candidates.length > 1 ? "split" : "matched",
      confidence: "case-insensitive",
      notes: ["matched by case-insensitive name; verify this is the same function"],
    };
  }

  if (isGenerated) {
    return {
      module,
      upstreamFile: go.file,
      upstreamSymbol: go.symbol,
      localCandidates: [],
      status: "generated",
      confidence: null,
      notes: ["declared in a generated TS-Go file; check via generated/schema parity tools, not hand-port drift"],
    };
  }

  if (scope === "deferred") {
    return {
      module,
      upstreamFile: go.file,
      upstreamSymbol: go.symbol,
      localCandidates: [],
      status: "deferred",
      confidence: null,
      notes: ["module is marked deferred in the parity scope"],
    };
  }

  return {
    module,
    upstreamFile: go.file,
    upstreamSymbol: go.symbol,
    localCandidates: [],
    status: "missing",
    confidence: null,
    notes: [],
  };
}

function indexByName(symbols: readonly LocalSymbol[]): ReadonlyMap<string, readonly LocalSymbol[]> {
  const map = new Map<string, LocalSymbol[]>();
  for (const symbol of symbols) {
    const existing = map.get(symbol.name);
    if (existing === undefined) map.set(symbol.name, [symbol]);
    else existing.push(symbol);
  }
  return map;
}

function indexByLowerName(symbols: readonly LocalSymbol[]): ReadonlyMap<string, readonly LocalSymbol[]> {
  const map = new Map<string, LocalSymbol[]>();
  for (const symbol of symbols) {
    const key = normalizeName(symbol.name);
    const existing = map.get(key);
    if (existing === undefined) map.set(key, [symbol]);
    else existing.push(symbol);
  }
  return map;
}

function moduleEntries(
  tsgoInternal: string,
  tstsSrc: string,
  spec: ModuleSpec,
  mapping: Record<string, MappingEntry>,
): readonly InventoryEntry[] {
  const scope = includeDeferred() ? "required" : spec.scope;
  const upstreamFiles = collectFiles(tsgoInternal, [spec.upstream], isGoSource, EXCLUDED_TSGO_FILES);
  const localFiles = collectFiles(tstsSrc, spec.local, isTstsSource, EXCLUDED_TSTS_FILES);
  const localSymbols = extractLocalSymbols(localFiles);
  const byName = indexByName(localSymbols);
  const byLowerName = indexByLowerName(localSymbols);
  const goSymbols = extractGoSymbols(upstreamFiles);
  return goSymbols.map((go) =>
    inventoryEntry(spec.upstream, scope, go, isGeneratedGoFile(join(tsgoInternal, go.file)), byName, byLowerName, mapping),
  );
}

function summarize(module: string, scope: Scope, entries: readonly InventoryEntry[]): ModuleSummary {
  const count = (status: Status): number => entries.filter((entry) => entry.status === status).length;
  const matched = count("matched");
  const split = count("split");
  const upstreamSymbols = entries.length;
  // Coverage credits matched + split (a split is still represented locally).
  const coverage = upstreamSymbols === 0 ? 1 : (matched + split) / upstreamSymbols;
  return {
    module,
    scope,
    upstreamSymbols,
    matched,
    missing: count("missing"),
    renamed: count("renamed"),
    split,
    generated: count("generated"),
    deferred: count("deferred"),
    coverage,
  };
}

function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function renderText(report: FunctionInventoryReport): string {
  const lines: string[] = [];
  lines.push("TSTS / TS-Go Function Inventory");
  lines.push(`tsgo_repo=${report.tsgoRepo}`);
  lines.push(`mapping_file=${report.mappingFile ?? "(none)"}`);
  lines.push(
    `upstream_symbols=${report.totals.upstreamSymbols} matched=${report.totals.matched} split=${report.totals.split} `
    + `missing=${report.totals.missing} renamed=${report.totals.renamed} generated=${report.totals.generated} `
    + `deferred=${report.totals.deferred} coverage=${percent(report.totals.coverage)}`,
  );
  lines.push("");
  lines.push("module coverage matched/upstream missing split renamed generated deferred scope");
  for (const summary of report.modules) {
    lines.push(
      `${summary.module} cov=${percent(summary.coverage)} matched=${summary.matched}/${summary.upstreamSymbols} `
      + `missing=${summary.missing} split=${summary.split} renamed=${summary.renamed} `
      + `generated=${summary.generated} deferred=${summary.deferred} scope=${summary.scope}`,
    );
  }
  lines.push("");
  lines.push("Top missing upstream symbols (required modules):");
  const missing = report.entries
    .filter((entry) => entry.status === "missing")
    .slice(0, 50);
  for (const entry of missing) {
    lines.push(`  MISSING ${entry.module} ${entry.upstreamFile}#${entry.upstreamSymbol}`);
  }
  return lines.join("\n");
}

function writeOutputs(report: FunctionInventoryReport, text: string): void {
  const tempDir = join(REPO_ROOT, ".temp");
  mkdirSync(tempDir, { recursive: true });
  writeFileSync(join(tempDir, "tsgo-function-inventory.json"), `${JSON.stringify(report, null, 2)}\n`);
  writeFileSync(join(tempDir, "tsgo-function-inventory.txt"), `${text}\n`);
}

function main(): void {
  const tsgoRepo = process.env.TSGO_REPO ?? DEFAULT_TSGO_REPO;
  const tsgoInternal = join(tsgoRepo, "internal");
  const tstsSrc = join(PROJECT_ROOT, "src");
  if (!existsSync(tsgoInternal)) {
    console.error(`TS-Go internal directory not found: ${tsgoInternal}`);
    process.exit(2);
  }

  const mapping = loadMappingFile();
  const specs = includeDeferred() ? MODULES : MODULES.filter((spec) => spec.scope === "required");
  const moduleResults = specs.map((spec) => ({
    spec,
    scope: includeDeferred() ? ("required" as Scope) : spec.scope,
    entries: moduleEntries(tsgoInternal, tstsSrc, spec, mapping.functions),
  }));

  const entries = moduleResults.flatMap((result) => result.entries);
  const modules = moduleResults.map((result) => summarize(result.spec.upstream, result.scope, result.entries));

  const countStatus = (status: Status): number => entries.filter((entry) => entry.status === status).length;
  const matched = countStatus("matched");
  const split = countStatus("split");
  const upstreamSymbols = entries.length;
  const totals = {
    upstreamSymbols,
    matched,
    missing: countStatus("missing"),
    renamed: countStatus("renamed"),
    split,
    generated: countStatus("generated"),
    deferred: countStatus("deferred"),
    coverage: upstreamSymbols === 0 ? 1 : (matched + split) / upstreamSymbols,
  };

  const report: FunctionInventoryReport = {
    tsgoRepo,
    mappingFile: mapping.path,
    totals,
    modules,
    entries,
  };

  const text = renderText(report);
  writeOutputs(report, text);
  console.log(outputJson() ? JSON.stringify(report, null, 2) : text);

  const hasFailure = modules.some((summary) => summary.scope === "required" && summary.missing > 0);
  process.exit(hasFailure && failOnFindings() ? 1 : 0);
}

main();
