/**
 * TS-Go control-skeleton parity check (Wave 0, tool 0D).
 *
 * Module-level declaration counts (checkLogicalParity) prove that the *surface*
 * of TS-Go is represented. They do NOT prove that a matched function is a
 * mechanical 1:1 port of its TS-Go original. A function can exist with the right
 * name and still have a completely different body — a wrong switch, a collapsed
 * loop, a missing recursive call. That is a serious port bug even when a small
 * test happens to pass.
 *
 * This tool compares function-level *structure* between the TS-Go `.go` function
 * and the matched TSTS `.ts` function:
 *
 *   if count            (branching)
 *   loop count          (for / range / while)
 *   switch + case count (dispatch tables)
 *   return count        (exit shape)
 *   throw / panic count (error paths)
 *   recursive calls     (self-recursion count)
 *   major helper calls  (distinct callee names — the call graph fingerprint)
 *
 * TSTS must be a MECHANICAL port of typescript-go: same control flow, same
 * branching, same algorithm. Any structural drift surfaced here is a place TSTS
 * deviated from being TS-Go. This is a report-mode signal, not a pass/fail gate;
 * initial baselines may legitimately show many drifts.
 *
 * The TS-Go conformance corpus remains the semantic source of truth. Control
 * skeleton tells us *where* structure drifts; the corpus tells us whether
 * externally observable behavior matches.
 *
 * Matching:
 *   - If the 0B function inventory JSON (.temp/tsgo-function-inventory.json) is
 *     present, its upstream->local function mapping is used directly.
 *   - Otherwise a lightweight name-based matching is computed in-tool: every
 *     TS-Go function is matched against local functions by normalized name,
 *     constrained (when present) by the split-ownership map so that only the
 *     declared local files for an upstream file are considered.
 *
 * Usage:
 *   node packages/tsts/tools/checkTsgoControlSkeleton.ts            # text report (fails on drift)
 *   node packages/tsts/tools/checkTsgoControlSkeleton.ts --no-fail  # report mode (always exit 0)
 *   node packages/tsts/tools/checkTsgoControlSkeleton.ts --json     # JSON to stdout
 *
 * Inputs (all optional except the TS-Go repo and TSTS src):
 *   TSGO_REPO env var                                  (default /home/jeswin/temp/typescript-go)
 *   .temp/tsgo-function-inventory.json                 (0B output, if present)
 *   .analysis/tsts-tsc/parity-maps/split-ownership.json (0C output, if present)
 *
 * Outputs:
 *   .temp/tsgo-control-skeleton.json
 *   .temp/tsgo-control-skeleton.txt
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

type Scope = "required" | "deferred";

type FunctionStatus =
  | "match"
  | "minor-shape-drift"
  | "major-shape-drift"
  | "missing-local"
  | "missing-upstream"
  | "split-needs-manual-review";

interface ModuleSpec {
  readonly upstream: string;
  readonly local: readonly string[];
  readonly scope: Scope;
}

interface SourceFile {
  readonly path: string; // repo-relative-ish (relative to the language root), POSIX separators
  readonly text: string;
}

/** Structural fingerprint of a single function body. */
interface Skeleton {
  readonly ifCount: number;
  readonly loopCount: number;
  readonly switchCount: number;
  readonly caseCount: number;
  readonly returnCount: number;
  readonly throwLikeCount: number;
  readonly recursiveCalls: number;
  readonly majorHelperCalls: number; // distinct callee count
}

interface ExtractedFunction {
  readonly file: string; // language-root-relative path
  readonly name: string; // raw declared name (no receiver, no leading #)
  readonly normalized: string; // normalizeName(name)
  readonly skeleton: Skeleton;
  readonly callees: readonly string[]; // distinct normalized callee names
}

interface FunctionComparison {
  readonly module: string;
  readonly upstreamFile: string | undefined;
  readonly upstreamSymbol: string;
  readonly localCandidates: readonly string[];
  readonly status: FunctionStatus;
  readonly upstreamSkeleton: Skeleton | undefined;
  readonly localSkeleton: Skeleton | undefined;
  readonly drift: readonly string[]; // human-readable per-metric drift descriptions
  readonly driftScore: number; // 0 == identical, higher == more drift
}

interface ModuleSkeletonReport {
  readonly module: string;
  readonly local: readonly string[];
  readonly scope: Scope;
  readonly upstreamFunctions: number;
  readonly matchedFunctions: number;
  readonly counts: Readonly<Record<FunctionStatus, number>>;
  readonly functions: readonly FunctionComparison[];
}

interface ControlSkeletonReport {
  readonly tool: "control-skeleton";
  readonly tsgoRepo: string;
  readonly inventoryUsed: boolean;
  readonly splitOwnershipUsed: boolean;
  readonly minorDriftThreshold: number;
  readonly majorDriftThreshold: number;
  readonly totals: Readonly<Record<FunctionStatus, number>>;
  readonly reports: readonly ModuleSkeletonReport[];
}

const TOOL_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(TOOL_DIR, "..");
const REPO_ROOT = join(PROJECT_ROOT, "..", "..");
const DEFAULT_TSGO_REPO = "/home/jeswin/temp/typescript-go";
const INVENTORY_PATH = join(REPO_ROOT, ".temp", "tsgo-function-inventory.json");
const SPLIT_OWNERSHIP_PATH = join(REPO_ROOT, ".analysis", "tsts-tsc", "parity-maps", "split-ownership.json");

// A function is "minor-shape-drift" when its drift score is small (one or two
// metrics off by a little). It becomes "major-shape-drift" once the structure
// diverges enough that it is almost certainly not a mechanical port.
const DEFAULT_MINOR_DRIFT_THRESHOLD = 0.5;
const DEFAULT_MAJOR_DRIFT_THRESHOLD = 2.0;

// Mirrors checkLogicalParity.ts MODULES so the two tools agree on scope/mapping.
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

// Callee names that are structural noise rather than algorithm fingerprint:
// language keywords, control words, and trivial constructors. Excluded from the
// "major helper calls" / call-graph comparison so the metric tracks real helper
// dispatch, not boilerplate.
const NOISE_CALLEES = new Set([
  "if", "for", "while", "switch", "case", "return", "throw", "new", "function",
  "len", "cap", "append", "make", "panic", "recover", "go", "defer", "range",
  "string", "number", "boolean", "int", "true", "false", "nil", "undefined",
]);

// ────────────────────────────────────────────────────────────────────────────
// CLI / config
// ────────────────────────────────────────────────────────────────────────────

function includeDeferred(): boolean {
  return process.argv.includes("--all") || process.argv.includes("--full");
}

function outputJson(): boolean {
  return process.argv.includes("--json");
}

function failOnFindings(): boolean {
  return !process.argv.includes("--no-fail");
}

function parseThreshold(name: string, fallback: number): number {
  const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
  if (arg === undefined) return fallback;
  const parsed = Number(arg.slice(name.length + 3));
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`Invalid --${name}: ${arg}`);
  }
  return parsed;
}

// ────────────────────────────────────────────────────────────────────────────
// File collection (mirrors checkLogicalParity.ts so scope agrees)
// ────────────────────────────────────────────────────────────────────────────

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

function isTsGoSource(path: string): boolean {
  if (!path.endsWith(".go") || path.endsWith("_test.go")) return false;
  if (path.endsWith("_generated.go") || path.endsWith("_stringer.go") || path.endsWith("stringer_generated.go")) return false;
  if (path.endsWith("/generate.go")) return false;
  return !readFileSync(path, "utf8").slice(0, 256).includes("//go:build ignore");
}

function isTstsSource(path: string): boolean {
  if (!path.endsWith(".ts")) return false;
  if (path.endsWith(".test.ts") || path.endsWith(".d.ts")) return false;
  if (path.endsWith(".generated.ts")) return false;
  return true;
}

function collectFiles(root: string, modules: readonly string[], predicate: (path: string) => boolean, excluded: ReadonlySet<string>): readonly SourceFile[] {
  const files = modules.flatMap((moduleName) => walk(join(root, moduleName), predicate));
  return [...new Set(files)]
    .sort()
    .map((file) => ({ full: file, rel: relative(root, file).replace(/\\/g, "/") }))
    .filter((file) => !excluded.has(file.rel))
    .map((file) => ({ path: file.rel, text: readFileSync(file.full, "utf8") }));
}

// ────────────────────────────────────────────────────────────────────────────
// Comment / string stripping
//
// Metric counts must not be polluted by keywords inside comments or string
// literals. We do a single-pass strip per file that removes line comments,
// block comments, and the *contents* of string/template literals (preserving
// the delimiters so brace balancing for body extraction stays correct).
// ────────────────────────────────────────────────────────────────────────────

function stripCommentsAndStrings(text: string): string {
  const out: string[] = [];
  const n = text.length;
  let i = 0;
  let state: "code" | "line" | "block" | "dquote" | "squote" | "backtick" = "code";
  while (i < n) {
    const c = text[i];
    if (c === undefined) break;
    const next = i + 1 < n ? text[i + 1] ?? "" : "";
    if (state === "code") {
      if (c === "/" && next === "/") { state = "line"; out.push("  "); i += 2; continue; }
      if (c === "/" && next === "*") { state = "block"; out.push("  "); i += 2; continue; }
      if (c === '"') { state = "dquote"; out.push('"'); i += 1; continue; }
      if (c === "'") { state = "squote"; out.push("'"); i += 1; continue; }
      // Backtick covers both JS/TS template literals and Go raw string literals.
      if (c === "`") { state = "backtick"; out.push("`"); i += 1; continue; }
      out.push(c);
      i += 1;
      continue;
    }
    if (state === "line") {
      if (c === "\n") { state = "code"; out.push("\n"); }
      else out.push(" ");
      i += 1;
      continue;
    }
    if (state === "block") {
      if (c === "*" && next === "/") { state = "code"; out.push("  "); i += 2; continue; }
      out.push(c === "\n" ? "\n" : " ");
      i += 1;
      continue;
    }
    if (state === "dquote" || state === "squote") {
      const quote = state === "dquote" ? '"' : "'";
      if (c === "\\") { out.push("  "); i += 2; continue; }
      if (c === quote) { state = "code"; out.push(quote); i += 1; continue; }
      if (c === "\n") { state = "code"; out.push("\n"); i += 1; continue; } // unterminated; recover
      out.push(" ");
      i += 1;
      continue;
    }
    if (state === "backtick") {
      // JS/TS template literal. We keep ${...} interpolations as code because
      // they can contain real calls; but to keep the strip simple and robust we
      // blank the literal text and treat ${ } as code boundaries.
      if (c === "\\") { out.push("  "); i += 2; continue; }
      if (c === "$" && next === "{") { out.push("${"); state = "code"; i += 2; continue; } // re-enter code (approx)
      if (c === "`") { state = "code"; out.push("`"); i += 1; continue; }
      out.push(c === "\n" ? "\n" : " ");
      i += 1;
      continue;
    }
    out.push(c);
    i += 1;
  }
  return out.join("");
}

// ────────────────────────────────────────────────────────────────────────────
// Naming
// ────────────────────────────────────────────────────────────────────────────

function normalizeName(name: string): string {
  return name.replace(/^[_#]+/, "").toLowerCase();
}

// ────────────────────────────────────────────────────────────────────────────
// Function body extraction
//
// A function is the declared name plus the balanced `{ ... }` body following the
// signature. We scan the comment/string-stripped source so braces inside strings
// or comments never throw off balancing.
// ────────────────────────────────────────────────────────────────────────────

interface RawFunction {
  readonly file: string;
  readonly name: string;
  readonly body: string;
}

/** Find the index of the first `{` at or after `from` in stripped text. */
function findBodyOpen(stripped: string, from: number): number {
  // The signature may contain `{` only inside type literals like `Record<string, { a: 1 }>`;
  // those are balanced too, but the *body* open is the first `{` that begins a
  // block at the top brace level after the parameter list. We approximate by
  // tracking paren/angle/bracket depth and taking the first `{` seen at depth 0.
  let parenDepth = 0;
  let bracketDepth = 0;
  let angleDepth = 0;
  for (let i = from; i < stripped.length; i++) {
    const c = stripped[i];
    if (c === "(") parenDepth++;
    else if (c === ")") parenDepth = Math.max(0, parenDepth - 1);
    else if (c === "[") bracketDepth++;
    else if (c === "]") bracketDepth = Math.max(0, bracketDepth - 1);
    else if (c === "<") angleDepth++;
    else if (c === ">") angleDepth = Math.max(0, angleDepth - 1);
    else if (c === "{" && parenDepth === 0 && bracketDepth === 0) return i;
    else if (c === ";" && parenDepth === 0) return -1; // forward decl / no body
    else if ((c === "\n") && angleDepth > 0) angleDepth = 0; // generics never span many lines in sigs we care about
  }
  return -1;
}

/** Extract the balanced body starting at `open` (which must point at `{`). */
function extractBalancedBody(stripped: string, open: number): { readonly body: string; readonly end: number } {
  let depth = 0;
  for (let i = open; i < stripped.length; i++) {
    const c = stripped[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return { body: stripped.slice(open + 1, i), end: i };
    }
  }
  return { body: stripped.slice(open + 1), end: stripped.length };
}

const GO_FUNC = /^func\s+(?:\(\s*[A-Za-z_]\w*\s+\*?[A-Za-z_][\w.]*\s*\)\s*)?([A-Za-z_]\w*)\s*(?:\[[^\]]*\])?\s*\(/;
function extractGoFunctions(files: readonly SourceFile[]): readonly RawFunction[] {
  const out: RawFunction[] = [];
  for (const file of files) {
    const stripped = stripCommentsAndStrings(file.text);
    const lines = stripped.split("\n");
    // Track absolute offsets so we can extract bodies from the full stripped text.
    let offset = 0;
    for (const line of lines) {
      const match = GO_FUNC.exec(line);
      if (match !== undefined && match !== null) {
        const name = match[1];
        // Find the body open at-or-after the start of this declaration line.
        const open = findBodyOpen(stripped, offset);
        if (name !== undefined && open >= 0) {
          const { body } = extractBalancedBody(stripped, open);
          out.push({ file: file.path, name, body });
        }
      }
      offset += line.length + 1; // +1 for the consumed "\n"
    }
  }
  return out;
}

// TS function/method declarations: free functions and class methods (including
// `#private` and accessor/modifier-prefixed methods). We deliberately skip
// arrow-function assignments (they are not part of the TS-Go method surface this
// tool maps), matching checkLogicalParity's declaration extraction intent.
const TS_FUNC = /^\s*(?:export\s+)?(?:declare\s+)?(?:default\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*(?:<[^>]*>)?\s*\(/;
const TS_METHOD = /^\s*(?:public\s+|private\s+|protected\s+|static\s+|override\s+|abstract\s+|async\s+|readonly\s+|get\s+|set\s+)*(#?[A-Za-z_$][\w$]*)\s*(?:<[^>{}]*>)?\s*\(/;
const TS_METHOD_BANNED = new Set(["if", "for", "switch", "while", "catch", "return", "throw", "new", "function", "do", "else", "constructor"]);

function extractTsFunctions(files: readonly SourceFile[]): readonly RawFunction[] {
  const out: RawFunction[] = [];
  for (const file of files) {
    const stripped = stripCommentsAndStrings(file.text);
    const lines = stripped.split("\n");
    let offset = 0;
    for (const line of lines) {
      const fnMatch = TS_FUNC.exec(line);
      const name = fnMatch !== null
        ? fnMatch[1]
        : (() => {
            const m = TS_METHOD.exec(line);
            if (m === null) return undefined;
            const candidate = m[1];
            if (candidate === undefined) return undefined;
            const bare = candidate.replace(/^#/, "");
            if (TS_METHOD_BANNED.has(bare)) return undefined;
            // Require the line to actually open a body block (ends with `{` after
            // a parameter list / return type) to avoid matching call expressions.
            return candidate;
          })();
      if (name !== undefined) {
        const open = findBodyOpen(stripped, offset);
        if (open >= 0) {
          // Guard: the body open must be reasonably close to this declaration
          // (on the same or an immediately-following line region), otherwise the
          // regex matched a non-declaration call. We accept the first block-open
          // returned by findBodyOpen which already respects paren/bracket depth.
          const { body } = extractBalancedBody(stripped, open);
          out.push({ file: file.path, name: name.replace(/^#/, ""), body });
        }
      }
      offset += line.length + 1;
    }
  }
  return out;
}

// ────────────────────────────────────────────────────────────────────────────
// Skeleton metrics (computed over already comment/string-stripped bodies)
// ────────────────────────────────────────────────────────────────────────────

function countWord(body: string, word: string): number {
  const pattern = new RegExp(`\\b${word}\\b`, "g");
  return body.match(pattern)?.length ?? 0;
}

/** Distinct callee names invoked in a body, minus structural noise. */
function extractCallees(body: string): readonly string[] {
  // Match `name(` and `recv.name(` / `recv?.name(` call sites. We take the final
  // segment (the method/function name) so `p.parseIfStatement()` -> parseifstatement.
  const callPattern = /(?:[A-Za-z_$][\w$]*\s*[.?]?\.?\s*)?([A-Za-z_$][\w$]*)\s*(?:<[^>;{}()]*>)?\s*\(/g;
  const names = new Set<string>();
  for (const m of body.matchAll(callPattern)) {
    const captured = m[1];
    if (captured === undefined) continue;
    const normalized = normalizeName(captured);
    if (normalized === "" || NOISE_CALLEES.has(normalized)) continue;
    names.add(normalized);
  }
  return [...names].sort();
}

function computeSkeleton(name: string, body: string, language: "go" | "ts"): { readonly skeleton: Skeleton; readonly callees: readonly string[] } {
  const callees = extractCallees(body);
  const self = normalizeName(name);
  const recursiveCalls = callees.includes(self) ? countWord(body, escapeWord(self)) : 0;
  if (language === "go") {
    const skeleton: Skeleton = {
      ifCount: countWord(body, "if"),
      loopCount: countWord(body, "for") + countWord(body, "range"),
      switchCount: countWord(body, "switch") + countWord(body, "select"),
      caseCount: countWord(body, "case") + countWord(body, "default"),
      returnCount: countWord(body, "return"),
      throwLikeCount: countWord(body, "panic"),
      recursiveCalls,
      majorHelperCalls: callees.length,
    };
    return { skeleton, callees };
  }
  const skeleton: Skeleton = {
    ifCount: countWord(body, "if"),
    loopCount: countWord(body, "for") + countWord(body, "while"),
    switchCount: countWord(body, "switch"),
    caseCount: countWord(body, "case") + countWord(body, "default"),
    returnCount: countWord(body, "return"),
    throwLikeCount: countWord(body, "throw"),
    recursiveCalls,
    majorHelperCalls: callees.length,
  };
  return { skeleton, callees };
}

function escapeWord(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ────────────────────────────────────────────────────────────────────────────
// Drift scoring
//
// For each metric we compute a relative drift contribution. Counts are noisy, so
// a difference of 1 on a small count matters less than a proportional swing. We
// use |a-b| / (max(a,b)+1) summed across metrics, plus a call-graph overlap
// penalty (Jaccard distance of distinct callee sets, weighted).
// ────────────────────────────────────────────────────────────────────────────

function metricDrift(a: number, b: number): number {
  if (a === 0 && b === 0) return 0;
  return Math.abs(a - b) / (Math.max(a, b) + 1);
}

function jaccardDistance(a: readonly string[], b: readonly string[]): number {
  const setA = new Set(a);
  const setB = new Set(b);
  if (setA.size === 0 && setB.size === 0) return 0;
  const intersection = [...setA].filter((value) => setB.has(value)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : 1 - intersection / union;
}

interface DriftResult {
  readonly score: number;
  readonly notes: readonly string[];
}

function computeDrift(up: Skeleton, local: Skeleton, upCallees: readonly string[], localCallees: readonly string[]): DriftResult {
  const metrics: readonly (readonly [string, keyof Skeleton])[] = [
    ["if", "ifCount"],
    ["loop", "loopCount"],
    ["switch", "switchCount"],
    ["case", "caseCount"],
    ["return", "returnCount"],
    ["throw/panic", "throwLikeCount"],
    ["recursive", "recursiveCalls"],
    ["helpers", "majorHelperCalls"],
  ];
  const notes: string[] = [];
  const metricScore = metrics.reduce((sum, [label, key]) => {
    const a = up[key];
    const b = local[key];
    const d = metricDrift(a, b);
    if (a !== b) notes.push(`${label} ${a}->${b}`);
    return sum + d;
  }, 0);
  const callGraphDistance = jaccardDistance(upCallees, localCallees);
  if (callGraphDistance > 0) {
    notes.push(`call-graph-overlap ${(100 * (1 - callGraphDistance)).toFixed(0)}%`);
  }
  // Call-graph distance is weighted heavier than a single metric tick because a
  // diverging call graph is the strongest signal of a non-mechanical port.
  return { score: metricScore + callGraphDistance * 2, notes };
}

// ────────────────────────────────────────────────────────────────────────────
// Optional inputs: 0B inventory + 0C split-ownership map
// ────────────────────────────────────────────────────────────────────────────

interface InventoryEntry {
  readonly module?: string;
  readonly upstreamFile?: string;
  readonly upstreamSymbol: string;
  readonly localCandidates?: readonly string[];
  readonly status?: string;
}

function readInventory(): readonly InventoryEntry[] | undefined {
  if (!existsSync(INVENTORY_PATH)) return undefined;
  try {
    const parsed = JSON.parse(readFileSync(INVENTORY_PATH, "utf8"));
    const entries: unknown = Array.isArray(parsed) ? parsed : parsed?.entries ?? parsed?.functions ?? parsed?.reports;
    if (!Array.isArray(entries)) return undefined;
    return entries.filter((entry): entry is InventoryEntry => typeof entry?.upstreamSymbol === "string");
  } catch {
    return undefined;
  }
}

function readSplitOwnership(): ReadonlyMap<string, readonly string[]> | undefined {
  if (!existsSync(SPLIT_OWNERSHIP_PATH)) return undefined;
  try {
    const parsed = JSON.parse(readFileSync(SPLIT_OWNERSHIP_PATH, "utf8"));
    const map = new Map<string, readonly string[]>();
    for (const [upstream, local] of Object.entries(parsed)) {
      if (Array.isArray(local)) map.set(upstream, local.map(String));
    }
    return map.size === 0 ? undefined : map;
  } catch {
    return undefined;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Matching
// ────────────────────────────────────────────────────────────────────────────

/** Build a normalized-name -> local functions index for a module. */
function indexByNormalized(functions: readonly ExtractedFunction[]): ReadonlyMap<string, readonly ExtractedFunction[]> {
  const map = new Map<string, ExtractedFunction[]>();
  for (const fn of functions) {
    const existing = map.get(fn.normalized);
    if (existing === undefined) map.set(fn.normalized, [fn]);
    else existing.push(fn);
  }
  return map;
}

function toExtracted(raw: RawFunction, language: "go" | "ts"): ExtractedFunction {
  const { skeleton, callees } = computeSkeleton(raw.name, raw.body, language);
  return { file: raw.file, name: raw.name, normalized: normalizeName(raw.name), skeleton, callees };
}

function classify(upstream: ExtractedFunction, candidates: readonly ExtractedFunction[], minor: number, major: number): FunctionComparison {
  if (candidates.length === 0) {
    return {
      module: "",
      upstreamFile: upstream.file,
      upstreamSymbol: upstream.name,
      localCandidates: [],
      status: "missing-local",
      upstreamSkeleton: upstream.skeleton,
      localSkeleton: undefined,
      drift: [],
      driftScore: Number.POSITIVE_INFINITY,
    };
  }
  // Pick the lowest-drift candidate as the matched local function.
  const scored = candidates
    .map((candidate) => ({ candidate, drift: computeDrift(upstream.skeleton, candidate.skeleton, upstream.callees, candidate.callees) }))
    .sort((a, b) => a.drift.score - b.drift.score);
  const best = scored[0];
  if (best === undefined) {
    return {
      module: "",
      upstreamFile: upstream.file,
      upstreamSymbol: upstream.name,
      localCandidates: [],
      status: "missing-local",
      upstreamSkeleton: upstream.skeleton,
      localSkeleton: undefined,
      drift: [],
      driftScore: Number.POSITIVE_INFINITY,
    };
  }
  const status: FunctionStatus =
    best.drift.score <= minor ? "match"
      : best.drift.score <= major ? "minor-shape-drift"
        : "major-shape-drift";
  // When several local candidates share the name and live in different files, the
  // port was likely split: flag for manual review (the split-ownership map should
  // declare and disambiguate it).
  const distinctFiles = new Set(candidates.map((candidate) => candidate.file));
  const finalStatus: FunctionStatus =
    distinctFiles.size > 1 && status !== "match" ? "split-needs-manual-review" : status;
  return {
    module: "",
    upstreamFile: upstream.file,
    upstreamSymbol: upstream.name,
    localCandidates: candidates.map((candidate) => `${candidate.file}:${candidate.name}`),
    status: finalStatus,
    upstreamSkeleton: upstream.skeleton,
    localSkeleton: best.candidate.skeleton,
    drift: best.drift.notes,
    driftScore: Number.isFinite(best.drift.score) ? Number(best.drift.score.toFixed(3)) : best.drift.score,
  };
}

function emptyCounts(): Record<FunctionStatus, number> {
  return {
    "match": 0,
    "minor-shape-drift": 0,
    "major-shape-drift": 0,
    "missing-local": 0,
    "missing-upstream": 0,
    "split-needs-manual-review": 0,
  };
}

function moduleReport(
  tsgoInternal: string,
  tstsSrc: string,
  spec: ModuleSpec,
  inventory: readonly InventoryEntry[] | undefined,
  splitOwnership: ReadonlyMap<string, readonly string[]> | undefined,
  minor: number,
  major: number,
): ModuleSkeletonReport {
  const upstreamFiles = collectFiles(tsgoInternal, [spec.upstream], isTsGoSource, EXCLUDED_TSGO_FILES);
  const localFiles = collectFiles(tstsSrc, spec.local, isTstsSource, EXCLUDED_TSTS_FILES);
  const upstream = extractGoFunctions(upstreamFiles).map((raw) => toExtracted(raw, "go"));
  const local = extractTsFunctions(localFiles).map((raw) => toExtracted(raw, "ts"));
  const localByName = indexByNormalized(local);
  const localByFileAndName = new Map<string, ExtractedFunction>();
  for (const fn of local) localByFileAndName.set(`${fn.file}:${fn.normalized}`, fn);

  // Restrict module to its prefix in inventory entries when inventory is present.
  const inventoryForModule = inventory?.filter((entry) => entry.module === spec.upstream || (entry.upstreamFile ?? "").startsWith(`${spec.upstream}/`));

  const comparisons: FunctionComparison[] = upstream.map((up) => {
    // Inventory takes precedence: it knows the explicit upstream->local mapping.
    const inv = inventoryForModule?.find((entry) => {
      const symbolTail = entry.upstreamSymbol.split(".").pop() ?? entry.upstreamSymbol;
      return normalizeName(symbolTail) === up.normalized && (entry.upstreamFile === undefined || entry.upstreamFile.endsWith(up.file) || up.file.endsWith(entry.upstreamFile));
    });
    if (inv !== undefined && inv.localCandidates !== undefined && inv.localCandidates.length > 0) {
      const resolved = inv.localCandidates
        .map((candidate) => {
          const [file, sym] = candidate.includes(":") ? [candidate.slice(0, candidate.lastIndexOf(":")), candidate.slice(candidate.lastIndexOf(":") + 1)] : [candidate, up.name];
          const key = `${file}:${normalizeName(sym)}`;
          return localByFileAndName.get(key) ?? local.find((fn) => fn.file.endsWith(file) && fn.normalized === normalizeName(sym));
        })
        .filter((fn): fn is ExtractedFunction => fn !== undefined);
      if (resolved.length > 0) return { ...classify(up, resolved, minor, major), module: spec.upstream };
    }

    // Split-ownership constrains which local files are eligible for an upstream file.
    const declaredLocal = splitOwnership?.get(up.file) ?? splitOwnership?.get(`${spec.upstream}/${up.file.split("/").pop()}`);
    const byName = localByName.get(up.normalized) ?? [];
    const candidates = declaredLocal !== undefined
      ? byName.filter((fn) => declaredLocal.some((declared) => fn.file.endsWith(declared) || declared.endsWith(fn.file)))
      : byName;
    return { ...classify(up, candidates.length > 0 ? candidates : byName, minor, major), module: spec.upstream };
  });

  // Local functions whose normalized name never appears upstream are
  // "missing-upstream" candidates (TSTS invented structure not in TS-Go). We
  // report the count via the module counts but keep the per-function detail to
  // matched comparisons to bound output size.
  const upstreamNames = new Set(upstream.map((fn) => fn.normalized));
  const missingUpstream = local.filter((fn) => !upstreamNames.has(fn.normalized)).length;

  const counts = emptyCounts();
  for (const comparison of comparisons) counts[comparison.status] += 1;
  counts["missing-upstream"] = missingUpstream;

  const matched = comparisons.filter((comparison) => comparison.status !== "missing-local").length;
  return {
    module: spec.upstream,
    local: spec.local,
    scope: includeDeferred() ? "required" : spec.scope,
    upstreamFunctions: upstream.length,
    matchedFunctions: matched,
    counts,
    functions: comparisons,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Rendering
// ────────────────────────────────────────────────────────────────────────────

function renderText(report: ControlSkeletonReport): string {
  const lines: string[] = [];
  lines.push("TSTS / TS-Go Control Skeleton");
  lines.push(`tsgo_repo=${report.tsgoRepo}`);
  lines.push(`inventory=${report.inventoryUsed ? "used" : "absent (lightweight name match)"} split_ownership=${report.splitOwnershipUsed ? "used" : "absent"}`);
  lines.push(`drift_thresholds minor<=${report.minorDriftThreshold} major<=${report.majorDriftThreshold}`);
  const t = report.totals;
  lines.push(`totals match=${t.match} minor=${t["minor-shape-drift"]} major=${t["major-shape-drift"]} missing_local=${t["missing-local"]} missing_upstream=${t["missing-upstream"]} split_review=${t["split-needs-manual-review"]}`);
  lines.push("");
  lines.push("module up_fns matched match minor major missing_local split_review");
  for (const item of report.reports) {
    const c = item.counts;
    lines.push(`${item.module} up=${item.upstreamFunctions} matched=${item.matchedFunctions} match=${c.match} minor=${c["minor-shape-drift"]} major=${c["major-shape-drift"]} missing_local=${c["missing-local"]} split=${c["split-needs-manual-review"]} local=${item.local.join("+")}`);
    // Show the worst drifters (top by drift score) for actionable signal.
    const worst = item.functions
      .filter((fn) => fn.status === "major-shape-drift" || fn.status === "split-needs-manual-review")
      .sort((a, b) => (b.driftScore === a.driftScore ? 0 : b.driftScore - a.driftScore))
      .slice(0, 5);
    for (const fn of worst) {
      lines.push(`  ${fn.status} ${fn.upstreamFile}:${fn.upstreamSymbol} score=${fn.driftScore} [${fn.drift.slice(0, 6).join(", ")}]`);
    }
    const missing = item.functions.filter((fn) => fn.status === "missing-local").slice(0, 8);
    if (missing.length > 0) {
      lines.push(`  missing-local ${missing.map((fn) => `${fn.upstreamFile}:${fn.upstreamSymbol}`).join(", ")}`);
    }
  }
  return lines.join("\n");
}

function writeOutputs(report: ControlSkeletonReport, text: string): void {
  const tempDir = join(REPO_ROOT, ".temp");
  mkdirSync(tempDir, { recursive: true });
  writeFileSync(join(tempDir, "tsgo-control-skeleton.txt"), `${text}\n`);
  writeFileSync(join(tempDir, "tsgo-control-skeleton.json"), `${JSON.stringify(report, null, 2)}\n`);
}

function main(): void {
  const minor = parseThreshold("minor-drift", DEFAULT_MINOR_DRIFT_THRESHOLD);
  const major = parseThreshold("major-drift", DEFAULT_MAJOR_DRIFT_THRESHOLD);
  const tsgoRepo = process.env.TSGO_REPO ?? DEFAULT_TSGO_REPO;
  const tsgoInternal = join(tsgoRepo, "internal");
  const tstsSrc = join(PROJECT_ROOT, "src");
  if (!existsSync(tsgoInternal)) {
    console.error(`TS-Go internal directory not found: ${tsgoInternal}`);
    process.exit(2);
  }
  const inventory = readInventory();
  const splitOwnership = readSplitOwnership();
  const specs = includeDeferred() ? MODULES : MODULES.filter((spec) => spec.scope === "required");
  const reports = specs.map((spec) => moduleReport(tsgoInternal, tstsSrc, spec, inventory, splitOwnership, minor, major));
  const totals = emptyCounts();
  for (const item of reports) {
    for (const key of Object.keys(totals) as FunctionStatus[]) totals[key] += item.counts[key];
  }
  const report: ControlSkeletonReport = {
    tool: "control-skeleton",
    tsgoRepo,
    inventoryUsed: inventory !== undefined,
    splitOwnershipUsed: splitOwnership !== undefined,
    minorDriftThreshold: minor,
    majorDriftThreshold: major,
    totals,
    reports,
  };
  const text = renderText(report);
  writeOutputs(report, text);
  console.log(outputJson() ? JSON.stringify(report, null, 2) : text);
  // Drift is a signal, not a hard failure surface: any major drift or
  // missing-local function fails the default gate, but --no-fail (report mode)
  // always exits 0 so baselines can surface large gaps without blocking.
  const hasFindings = totals["major-shape-drift"] > 0 || totals["missing-local"] > 0 || totals["split-needs-manual-review"] > 0;
  process.exit(hasFindings && failOnFindings() ? 1 : 0);
}

main();
