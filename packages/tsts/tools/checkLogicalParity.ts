/**
 * Logical TS-Go parity check (hardened).
 *
 * Structural parity proves that TS-Go files/modules are represented. This
 * check adds a stricter drift detector: declaration inventory (by kind),
 * control-flow skeleton, and explicit stub markers. It does not prove semantic
 * correctness; the TS-Go conformance corpus remains the semantic source of
 * truth.
 *
 * Hardening (workplan §1):
 *   1. Exclude generated artifacts consistently on BOTH sides. Generated files
 *      are detected by the canonical "Code generated ... DO NOT EDIT." header
 *      plus the language-specific suffix/dir conventions. Their declarations
 *      are counted in a separate `generated` bucket, never as hand-port drift.
 *   2. Classify Go-only scaffolding (sync primitives, stringer String(),
 *      Marshal/Unmarshal, init, blank `_`, single-letter receiver locals)
 *      separately from compiler logic.
 *   3. Separate declaration coverage BY KIND:
 *        - functions/methods
 *        - types/interfaces/classes/enums
 *        - constants/vars
 *   4. Separate MISSING from renamed/moved/split:
 *        - renamed: Go flat-prefix enum member (e.g. AccessFlagsNone) whose
 *          enum container + member both exist locally (AccessFlags + None).
 *        - moved: present in some OTHER local module (split across modules).
 *      Only genuinely-absent names are reported as `missing`.
 *   5. Emit module-level JSON (`.temp/logical-parity.json`) suitable for
 *      work-packet generation, including by-kind missing lists.
 *   6. Emit false-positive candidates explicitly (Go-only scaffolding,
 *      generated-only names, renamed enum members, moved-to-other-module).
 *   7. Stop treating honest error strings as implementation stubs unless they
 *      are FINAL unsupported paths (e.g. throw/panic in a non-comment line).
 *      Comments, doc strings, and diagnostics text are not stubs.
 *
 * Modes preserved: `--json`, `--no-fail` (report mode), threshold flags,
 * `--all`/`--full` (include deferred modules).
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

type Scope = "required" | "deferred";
type Status = "pass" | "fail" | "deferred" | "missing-upstream";
type Kind = "function" | "type" | "value";

interface ModuleSpec {
  readonly upstream: string;
  readonly local: readonly string[];
  readonly scope: Scope;
}

interface SourceFile {
  readonly path: string;
  readonly text: string;
  readonly generated: boolean;
}

interface Declaration {
  readonly name: string;
  readonly kind: Kind;
}

interface Shape {
  readonly ifCount: number;
  readonly forCount: number;
  readonly switchCount: number;
  readonly caseCount: number;
  readonly returnCount: number;
  readonly throwLikeCount: number;
  readonly functionCount: number;
  readonly typeCount: number;
}

interface StubMarker {
  readonly file: string;
  readonly line: number;
  readonly text: string;
}

interface KindCoverage {
  readonly upstream: number;
  readonly matched: number;
  readonly coverage: number;
  readonly missing: readonly string[];
}

interface FalsePositives {
  // Go-only scaffolding names that should not count as missing compiler logic.
  readonly goOnlyScaffolding: readonly string[];
  // Upstream names that only ever appear in generated TS-Go files.
  readonly generatedOnly: readonly string[];
  // Go flat-prefix enum members whose container+member exist locally.
  readonly renamedEnumMembers: readonly string[];
  // Names absent from this module but present in another local module.
  readonly movedToOtherModule: readonly string[];
  // Upstream names matched locally only after a case difference: the intentional
  // TS casing rename (PascalCase TS-Go -> lower-camel TSTS). Recorded so the
  // classification distinguishes intentional-casing-rename from exact matches.
  readonly intentionalCasingRenames: readonly string[];
}

interface ModuleReport {
  readonly module: string;
  readonly local: readonly string[];
  readonly scope: Scope;
  readonly status: Status;
  readonly upstreamFiles: number;
  readonly localFiles: number;
  readonly upstreamGeneratedFiles: number;
  readonly localGeneratedFiles: number;
  // Hand-port declaration counts (generated + Go-only scaffolding excluded).
  readonly upstreamDeclarations: number;
  readonly localDeclarations: number;
  readonly matchedDeclarations: number;
  // Subset of matchedDeclarations found by direct local name match (no
  // false-positive accounting). Reveals genuine local presence.
  readonly directlyMatchedDeclarations: number;
  readonly genuinelyMissingDeclarations: number;
  readonly declarationCoverage: number;
  // Generated-surface declaration counts (informational, separate bucket).
  readonly upstreamGeneratedDeclarations: number;
  readonly localGeneratedDeclarations: number;
  readonly generatedDeclarationCoverage: number;
  readonly byKind: Readonly<Record<Kind, KindCoverage>>;
  readonly shapeScore: number;
  readonly stubMarkers: readonly StubMarker[];
  // Genuinely-absent upstream declarations (the real signal).
  readonly missingDeclarations: readonly string[];
  readonly extraDeclarations: readonly string[];
  readonly falsePositives: FalsePositives;
}

interface LogicalParityReport {
  readonly tsgoRepo: string;
  readonly declarationThreshold: number;
  readonly shapeThreshold: number;
  readonly reports: readonly ModuleReport[];
}

const TOOL_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(TOOL_DIR, "..");
const REPO_ROOT = join(PROJECT_ROOT, "..", "..");
const DEFAULT_TSGO_REPO = "/home/jeswin/temp/typescript-go";
const DEFAULT_DECLARATION_THRESHOLD = 0.9;
const DEFAULT_SHAPE_THRESHOLD = 0.65;
const RENAMES_PATH = join(REPO_ROOT, ".analysis", "tsts-tsc", "parity-maps", "renames.json");

interface RenamesFile {
  readonly casingConvention?: { readonly enabled?: boolean };
}

// True when the rename map enables the casing convention (PascalCase TS-Go ->
// lower-camel TSTS, unexported Go method -> `#private`). Consulted so a
// declaration matched only by a case difference is classified as an intentional
// casing rename rather than silently folded into the exact-match count.
function loadCasingConventionEnabled(): boolean {
  if (!existsSync(RENAMES_PATH)) return false;
  try {
    const parsed = JSON.parse(readFileSync(RENAMES_PATH, "utf8")) as RenamesFile;
    return parsed.casingConvention?.enabled ?? false;
  } catch (error) {
    console.error(`Failed to parse rename map ${RENAMES_PATH}: ${(error as Error).message}`);
    return false;
  }
}

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

// Enum-bearing TSTS modules whose members live in the shared `src/enums` and
// `src/checker/types.ts` const-object enums (Herebyfile generate:enums). These
// supply the namespaced enum members (AccessFlags.None) that correspond to the
// Go flat-prefix members (AccessFlagsNone).
const SHARED_ENUM_LOCALS: readonly string[] = ["enums"];

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

// Go-only scaffolding: names that exist because of Go's runtime/idioms and have
// no hand-port compiler-logic counterpart. These must NOT count as missing.
const GO_SCAFFOLDING_NAMES = new Set([
  "noCopy",
  "Lock",
  "Unlock",
  "RLock",
  "RUnlock",
  "String", // fmt.Stringer; covered by *_stringer_generated.go
  "Error", // error interface method
  "MarshalJSON",
  "UnmarshalJSON",
  "MarshalJSONTo",
  "UnmarshalJSONFrom",
  "init", // Go package init()
  "Read",
  "Write",
  "Close",
  "Seek",
  "Sys",
  "Clone", // value-semantics helpers; TS uses references
]);

// Go interface-satisfaction / io / fs method names commonly emitted to satisfy
// stdlib interfaces. Treated as scaffolding when they are receiver methods.
const GO_INTERFACE_METHODS = new Set([
  "Accept",
  "Acquire",
  "Release",
  "ModTime",
  "Mode",
  "IsDir",
  "Name",
  "Size",
  "Type",
  "Stat",
  "Chtimes",
  "AppendFile",
]);

function parseThreshold(name: string, fallback: number): number {
  const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
  if (arg === undefined) return fallback;
  const parsed = Number(arg.slice(name.length + 3));
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1) {
    throw new Error(`Invalid --${name}: ${arg}`);
  }
  return parsed;
}

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

// Canonical "Code generated ... DO NOT EDIT." marker used by both TS-Go and
// TSTS generators. This is the robust cross-language generated-file detector.
function hasGeneratedHeader(text: string): boolean {
  const head = text.slice(0, 512);
  return /Code generated\b[\s\S]*?DO NOT EDIT\./.test(head);
}

function isGoBuildIgnore(text: string): boolean {
  return text.slice(0, 256).includes("//go:build ignore");
}

function isGeneratedGoPath(path: string): boolean {
  return (
    path.endsWith("_generated.go") ||
    path.endsWith("_stringer.go") ||
    path.endsWith("stringer_generated.go") ||
    /\/generatedidentifierflags\.go$/.test(path) ||
    path.endsWith("/generate.go")
  );
}

function isGeneratedTsPath(path: string): boolean {
  return path.endsWith(".generated.ts") || path.includes("/generated/");
}

// A candidate TS-Go source. Excludes tests and go:build-ignore tool scripts,
// but INCLUDES generated files (they are tagged separately so they can be
// excluded from hand-port comparison while still being inventoried).
function isTsGoCandidate(path: string): boolean {
  if (!path.endsWith(".go") || path.endsWith("_test.go")) return false;
  if (path.endsWith("/generate.go")) return false;
  return !isGoBuildIgnore(readFileSync(path, "utf8"));
}

function isTstsCandidate(path: string): boolean {
  if (!path.endsWith(".ts")) return false;
  if (path.endsWith(".test.ts") || path.endsWith(".d.ts")) return false;
  return true;
}

function classifyGenerated(language: "go" | "ts", path: string, text: string): boolean {
  if (hasGeneratedHeader(text)) return true;
  return language === "go" ? isGeneratedGoPath(path) : isGeneratedTsPath(path);
}

function collectFiles(
  root: string,
  modules: readonly string[],
  candidate: (path: string) => boolean,
  language: "go" | "ts",
  excluded: ReadonlySet<string>,
): readonly SourceFile[] {
  const files = modules.flatMap((moduleName) => walk(join(root, moduleName), candidate));
  return [...new Set(files)]
    .sort()
    .map((file) => ({ full: file, relative: relative(root, file).replace(/\\/g, "/") }))
    .filter((file) => !excluded.has(file.relative))
    .map((file) => {
      const text = readFileSync(file.full, "utf8");
      return { path: file.relative, text, generated: classifyGenerated(language, file.relative, text) };
    });
}

function stripLineComment(line: string): string {
  const index = line.indexOf("//");
  return index < 0 ? line : line.slice(0, index);
}

// Single-pass strip of line comments, block comments, and the CONTENTS of
// string / char / template (backtick / Go raw-string) literals, preserving the
// delimiters and all newlines so that subsequent line-by-line declaration
// scanning sees the same line numbering.
//
// Why this matters (defect 1): the declaration scanners run per line and have no
// cross-line string state. A backtick that appears INSIDE a double/single-quoted
// string or a comment (e.g. `"\`"`, or a doc comment mentioning a `template`)
// has no matching close on the same line. Any naive backtick tracking would then
// treat every following line as "inside a template literal" and HIDE every
// declaration after it. Equally, a genuine MULTI-LINE template literal whose
// interior happens to begin with `function`/`const`/`type` would be mis-scanned
// as a declaration. Blanking literal interiors with this proven state machine
// (shared with checkTsgoControlSkeleton.ts) makes the scanner template-literal
// aware on BOTH the Go and TS sides, so functions after a template literal are
// still counted and template interiors never produce phantom declarations.
function stripCommentsAndStrings(text: string): string {
  const out: string[] = [];
  const n = text.length;
  let i = 0;
  type State = "code" | "line" | "block" | "dquote" | "squote" | "backtick";
  let state: State = "code";
  // Stack of template-literal contexts we are nested in via `${ ... }`
  // interpolations. Each frame holds the code-brace depth at which the
  // interpolation began; when depth returns to it on a `}` we pop back into the
  // enclosing template (backtick) literal. Tracking this precisely is essential:
  // a naive "re-enter code at ${" approximation flips backtick parity, so the
  // template's CLOSING backtick is mistaken for an OPENING one and every
  // declaration after the template is blanked (defect 1 regression).
  const templateStack: number[] = [];
  let braceDepth = 0;
  while (i < n) {
    const c = text[i];
    if (c === undefined) break;
    const next = i + 1 < n ? text[i + 1] ?? "" : "";
    if (state === "code") {
      if (c === "/" && next === "/") { state = "line"; out.push("  "); i += 2; continue; }
      if (c === "/" && next === "*") { state = "block"; out.push("  "); i += 2; continue; }
      if (c === '"') { state = "dquote"; out.push('"'); i += 1; continue; }
      if (c === "'") { state = "squote"; out.push("'"); i += 1; continue; }
      // Backtick covers JS/TS template literals and Go raw string literals.
      if (c === "`") { state = "backtick"; out.push("`"); i += 1; continue; }
      if (c === "{") { braceDepth += 1; out.push(c); i += 1; continue; }
      if (c === "}") {
        // Closing the innermost `${ ... }` interpolation returns to its template.
        // The matching `${` incremented braceDepth, so decrement it here too;
        // otherwise braceDepth accumulates and later interpolation closes (and
        // nested-template ternaries like `${a ? `=${b}` : ""}`) desync.
        if (templateStack.length > 0 && braceDepth === templateStack[templateStack.length - 1]) {
          templateStack.pop();
          braceDepth = Math.max(0, braceDepth - 1);
          state = "backtick";
          out.push("}");
          i += 1;
          continue;
        }
        braceDepth = Math.max(0, braceDepth - 1);
        out.push(c);
        i += 1;
        continue;
      }
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
    // state === "backtick"
    if (c === "\\") { out.push("  "); i += 2; continue; }
    if (c === "$" && next === "{") {
      // Enter the interpolation as real code, remembering the brace depth so the
      // matching `}` pops us back into this template literal.
      braceDepth += 1;
      templateStack.push(braceDepth);
      out.push("${");
      state = "code";
      i += 2;
      continue;
    }
    if (c === "`") { state = "code"; out.push("`"); i += 1; continue; }
    out.push(c === "\n" ? "\n" : " ");
    i += 1;
  }
  return out.join("");
}

function normalizeName(name: string): string {
  return name.replace(/^_+/, "").toLowerCase();
}

function isNoiseName(name: string): boolean {
  return name === "_" || /^_.*_(?:index|name)(?:_\d+)?$/i.test(name);
}

// Single lowercase letters and ultra-short locals are Go receiver/loop names,
// not hand-port declarations worth tracking at module granularity.
function isShortLocal(name: string): boolean {
  return /^[a-z]$/.test(name) || /^[a-z]{1,2}$/.test(name);
}

function uniqueSorted(values: readonly string[]): readonly string[] {
  return [...new Set(values.filter((value) => !isNoiseName(value)))].sort((a, b) => a.localeCompare(b));
}

function uniqueSortedDeclarations(values: readonly Declaration[]): readonly Declaration[] {
  const seen = new Map<string, Declaration>();
  for (const decl of values) {
    if (isNoiseName(decl.name)) continue;
    if (!seen.has(decl.name)) seen.set(decl.name, decl);
  }
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function extractGoDeclarations(files: readonly SourceFile[]): readonly Declaration[] {
  const decls: Declaration[] = [];
  for (const file of files) {
    let block: "const" | "var" | "type" | undefined;
    // Blank string/comment/raw-string interiors first so a backtick inside a
    // literal/comment cannot derail later-line scanning (defect 1).
    for (const rawLine of stripCommentsAndStrings(file.text).split("\n")) {
      const line = stripLineComment(rawLine).trim();
      if (line === "" || line.startsWith("/*") || line.startsWith("*")) continue;
      if (block !== undefined) {
        if (line.startsWith(")")) {
          block = undefined;
          continue;
        }
        const blockName = /^([A-Za-z_]\w*)\b/.exec(line)?.[1];
        if (blockName !== undefined) {
          decls.push({ name: blockName, kind: block === "type" ? "type" : "value" });
        }
        continue;
      }
      const funcName = /^func\s+(?:\([^)]*\)\s*)?([A-Za-z_]\w*)\s*(?:\[|\()/.exec(line)?.[1];
      if (funcName !== undefined) decls.push({ name: funcName, kind: "function" });
      for (const keyword of ["const", "var", "type"] as const) {
        if (new RegExp(`^${keyword}\\s*\\(`).test(line)) block = keyword;
        const direct = new RegExp(`^${keyword}\\s+([A-Za-z_]\\w*)\\b`).exec(line)?.[1];
        if (direct !== undefined) {
          decls.push({ name: direct, kind: keyword === "type" ? "type" : "value" });
        }
      }
    }
  }
  return uniqueSortedDeclarations(decls);
}

function extractTsDeclarations(files: readonly SourceFile[]): readonly Declaration[] {
  const decls: Declaration[] = [];
  for (const file of files) {
    // Two views of each line, line-numbers aligned (the strip preserves
    // newlines): the STRIPPED view blanks template-literal/string/comment
    // interiors so a stray backtick can never hide later declarations (defect
    // 1); the ORIGINAL view keeps string content for the generate:enums enum
    // members, whose names live INSIDE string literals (e.g. `["Member"]`).
    // Enum members are single-line patterns, immune to the function-hiding bug,
    // so reading them from the original line is safe and necessary.
    const strippedLines = stripCommentsAndStrings(file.text).split("\n");
    const originalLines = file.text.split("\n");
    for (let index = 0; index < strippedLines.length; index += 1) {
      const line = stripLineComment(strippedLines[index] ?? "");
      const originalLine = originalLines[index] ?? "";
      const functionName = /^\s*(?:export\s+)?(?:declare\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\b/.exec(line)?.[1];
      if (functionName !== undefined) decls.push({ name: functionName, kind: "function" });
      const typeName = /^\s*(?:export\s+)?(?:declare\s+)?(?:abstract\s+)?(?:class|interface|type|enum)\s+([A-Za-z_$][\w$]*)\b/.exec(line)?.[1];
      if (typeName !== undefined) decls.push({ name: typeName, kind: "type" });
      const valueName = /^\s*(?:export\s+)?(?:declare\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\b/.exec(line)?.[1];
      if (valueName !== undefined) decls.push({ name: valueName, kind: "value" });
      // Members of const-object enums: `  None: 0 as AccessFlags,` /
      // `  None: (1 << 0) as Foo,` — these correspond to Go flat-prefix enum
      // members. Capture them as values so renamed-enum detection works.
      const enumMember = /^\s{2,}([A-Za-z_$][\w$]*)\s*:\s*[^,;{}()]*\bas\s+[A-Za-z_$][\w$]*\s*,?\s*$/.exec(line)?.[1];
      if (enumMember !== undefined) decls.push({ name: enumMember, kind: "value" });
      // Members of TS-emitted enums (Herebyfile generate:enums output):
      // `  Foo[Foo["Member"] = 0] = "Member";`. The member name lives inside a
      // string literal, so this MUST read the original (un-blanked) line.
      const jsEnumMember = /^\s*[A-Za-z_$][\w$]*\[[A-Za-z_$][\w$]*\["([A-Za-z_$][\w$]*)"\]\s*=/.exec(originalLine)?.[1];
      if (jsEnumMember !== undefined) decls.push({ name: jsEnumMember, kind: "value" });
      // `export var NodeBuilderFlags: any;` — the enum container declared by
      // generate:enums output. Capture as a type container.
      const jsEnumContainer = /^\s*(?:export\s+)?var\s+([A-Za-z_$][\w$]*)\s*:\s*any\s*;\s*$/.exec(line)?.[1];
      if (jsEnumContainer !== undefined) decls.push({ name: jsEnumContainer, kind: "type" });
      const methodName = /^\s*(?:public\s+|private\s+|protected\s+|static\s+|override\s+|abstract\s+|async\s+|readonly\s+|get\s+|set\s+)*([A-Za-z_$][\w$]*)\s*(?:<[^>{}]*>)?\([^;{}]*\)\s*(?::[^=>{}]*)?\{/.exec(line)?.[1];
      if (methodName !== undefined && !["if", "for", "switch", "while", "catch", "return", "throw", "new", "function"].includes(methodName)) {
        decls.push({ name: methodName, kind: "function" });
      }
    }
  }
  return uniqueSortedDeclarations(decls);
}

function countWord(lines: readonly string[], word: string): number {
  const pattern = new RegExp(`\\b${word}\\b`, "g");
  return lines.reduce((sum, line) => sum + (stripLineComment(line).match(pattern)?.length ?? 0), 0);
}

function shape(files: readonly SourceFile[], decls: readonly Declaration[], language: "go" | "ts"): Shape {
  // Blank string/comment/template interiors so keywords quoted inside literals
  // (e.g. a diagnostics message containing "return") never inflate the shape.
  const lines = files.flatMap((file) => stripCommentsAndStrings(file.text).split("\n"));
  if (language === "go") {
    return {
      ifCount: countWord(lines, "if"),
      // Defect 2: a Go `for ... := range x` loop is ONE loop that uses TWO
      // keywords (`for` + `range`). `range` only ever appears inside a `for`
      // clause, so `for` alone already counts every Go loop. Adding `range`
      // double-counts every range loop and inflates loop drift versus a TS
      // `for...of`, which is a single `for`. Count Go loops by `for` only.
      forCount: countWord(lines, "for"),
      switchCount: countWord(lines, "switch") + countWord(lines, "select"),
      caseCount: countWord(lines, "case") + countWord(lines, "default"),
      returnCount: countWord(lines, "return"),
      throwLikeCount: countWord(lines, "panic"),
      functionCount: decls.filter((d) => d.kind === "function").length,
      typeCount: countWord(lines, "type"),
    };
  }
  return {
    ifCount: countWord(lines, "if"),
    // TS loops: `for` (covers for/for-of/for-in) plus `while`. This mirrors the
    // Go side, which counts every loop via its single `for` keyword.
    forCount: countWord(lines, "for") + countWord(lines, "while"),
    switchCount: countWord(lines, "switch"),
    caseCount: countWord(lines, "case") + countWord(lines, "default"),
    returnCount: countWord(lines, "return"),
    throwLikeCount: countWord(lines, "throw"),
    functionCount: decls.filter((d) => d.kind === "function").length,
    typeCount: countWord(lines, "type") + countWord(lines, "interface") + countWord(lines, "class") + countWord(lines, "enum"),
  };
}

function shapeScore(upstream: Shape, local: Shape): number {
  const keys: readonly (keyof Shape)[] = ["ifCount", "forCount", "switchCount", "caseCount", "returnCount", "throwLikeCount", "functionCount", "typeCount"];
  const scores = keys.map((key) => {
    const left = upstream[key];
    const right = local[key];
    if (left === 0 && right === 0) return undefined;
    if (left === 0 || right === 0) return 0;
    return Math.min(left, right) / Math.max(left, right);
  }).filter((value): value is number => value !== undefined);
  return scores.length === 0 ? 1 : scores.reduce((sum, value) => sum + value, 0) / scores.length;
}

// Stub markers are FINAL unsupported paths only. An honest error string in a
// comment, doc block, or diagnostics message is NOT a stub. We require a
// throw/panic statement (a real terminating unsupported path) on a code line.
function findStubMarkers(files: readonly SourceFile[]): readonly StubMarker[] {
  const markers: StubMarker[] = [];
  for (const file of files) {
    if (file.generated) continue;
    // NB: scan the ORIGINAL text here, not the string-blanked text. A stub
    // marker is a single-line `throw new Error("... not supported ...")`; the
    // unsupported-path keyword we key on lives INSIDE that thrown string, so
    // blanking string interiors would hide real stubs. Comment lines are still
    // skipped below, and `stripLineComment` drops trailing `//` comments.
    file.text.split("\n").forEach((rawLine, index) => {
      const code = stripLineComment(rawLine);
      const trimmed = code.trim();
      // Skip comment-only and doc lines entirely.
      if (trimmed === "" || trimmed.startsWith("*") || trimmed.startsWith("/*") || trimmed.startsWith("//")) return;
      const isThrow = /\bthrow\s+new\s+\w*Error\s*\(/.test(code) || /\bpanic\s*\(/.test(code);
      if (!isThrow) return;
      // Only count as a stub if the thrown message names a final unsupported
      // path (not implemented / unsupported / TODO). Ordinary defensive errors
      // (invariant violations) are correct ports, not stubs.
      if (!/not implemented|unimplemented|not supported|unsupported|TODO/i.test(code)) return;
      markers.push({ file: file.path, line: index + 1, text: trimmed.slice(0, 160) });
    });
  }
  return markers;
}

// Strip a known enum-container prefix from a Go flat-prefix enum member and
// return all member candidates. Go flattens enum members as
// `<TypeName><Member>` (e.g. `type Flags` -> `FlagsAllowEmptyTuple`), while
// TSTS uses a namespaced container with bare members (`NodeBuilderFlags` ->
// `AllowEmptyTuple`). The container may be renamed across the port, so we try
// stripping BOTH local container names (e.g. `AccessFlags`) AND upstream Go
// type names (e.g. `Flags`), then check the remainder against local members.
function stripEnumPrefixCandidates(name: string, prefixes: ReadonlySet<string>): readonly string[] {
  const members: string[] = [];
  for (const prefix of prefixes) {
    if (name.length > prefix.length && name.startsWith(prefix)) {
      const member = name.slice(prefix.length);
      if (/^[A-Z]/.test(member)) members.push(member);
    }
  }
  return members;
}

interface ComparisonInput {
  readonly upstreamHand: readonly Declaration[];
  readonly localHand: readonly Declaration[];
  readonly upstreamGeneratedNames: ReadonlySet<string>;
  readonly localTypeContainers: ReadonlySet<string>;
  readonly upstreamTypeNames: ReadonlySet<string>;
  readonly localEnumMemberNames: ReadonlySet<string>;
  readonly globalLocalNames: ReadonlySet<string>;
  // Local declaration names with their exact case preserved (only a leading `#`
  // private marker stripped). Used to tell an EXACT-name match apart from a
  // case-only (intentional rename) match.
  readonly localExactNames: ReadonlySet<string>;
  // True when the rename map enables the PascalCase->camelCase casing convention.
  readonly casingConventionEnabled: boolean;
}

interface ComparisonResult {
  readonly matched: number;
  // Upstream names found by direct name match locally (no false-positive
  // accounting). Exposed so reviewers can see how much coverage is genuine
  // local presence vs explained-away by classification.
  readonly directlyMatched: number;
  readonly missing: readonly Declaration[];
  readonly extra: readonly string[];
  readonly falsePositives: FalsePositives;
}

function isGoScaffolding(decl: Declaration): boolean {
  if (decl.kind !== "function") return GO_SCAFFOLDING_NAMES.has(decl.name);
  return GO_SCAFFOLDING_NAMES.has(decl.name) || GO_INTERFACE_METHODS.has(decl.name) || isShortLocal(decl.name);
}

function declarationComparison(input: ComparisonInput): ComparisonResult {
  const localNames = new Set(input.localHand.map((d) => normalizeName(d.name)));
  const upstreamNames = new Set(input.upstreamHand.map((d) => normalizeName(d.name)));

  const goOnlyScaffolding: string[] = [];
  const generatedOnly: string[] = [];
  const renamedEnumMembers: string[] = [];
  const movedToOtherModule: string[] = [];
  const intentionalCasingRenames: string[] = [];
  const trulyMissing: Declaration[] = [];
  const directlyMatchedNames: string[] = [];

  for (const decl of input.upstreamHand) {
    if (localNames.has(normalizeName(decl.name))) {
      directlyMatchedNames.push(decl.name);
      // Distinguish an exact-name match from a case-only (intentional rename)
      // match: if the convention is enabled and the upstream name is NOT present
      // locally with identical case, it was matched only by the casing rename.
      if (input.casingConventionEnabled && !input.localExactNames.has(decl.name)) {
        intentionalCasingRenames.push(decl.name);
      }
      continue;
    }

    if (isGoScaffolding(decl)) {
      goOnlyScaffolding.push(decl.name);
      continue;
    }
    if (input.upstreamGeneratedNames.has(decl.name)) {
      generatedOnly.push(decl.name);
      continue;
    }
    const enumPrefixes = new Set([...input.localTypeContainers, ...input.upstreamTypeNames]);
    const memberCandidates = stripEnumPrefixCandidates(decl.name, enumPrefixes);
    if (decl.kind === "value" && memberCandidates.some((m) => input.localEnumMemberNames.has(m.toLowerCase()))) {
      renamedEnumMembers.push(decl.name);
      continue;
    }
    if (input.globalLocalNames.has(normalizeName(decl.name))) {
      movedToOtherModule.push(decl.name);
      continue;
    }
    trulyMissing.push(decl);
  }

  // An upstream declaration is "accounted for" when it is either directly
  // matched locally OR explained as a false positive (renamed/moved/
  // scaffolding/generated). Only `trulyMissing` are genuine gaps, so:
  //   matched = upstreamHand - trulyMissing
  // This keeps the module total consistent with by-kind coverage (which also
  // only subtracts trulyMissing) and makes coverage reflect REAL gaps.
  const matched = input.upstreamHand.length - trulyMissing.length;

  const extra = input.localHand
    .map((d) => d.name)
    .filter((name) => !upstreamNames.has(normalizeName(name)));

  return {
    matched,
    directlyMatched: new Set(directlyMatchedNames.map(normalizeName)).size,
    missing: trulyMissing,
    extra: uniqueSorted(extra).slice(0, 32),
    falsePositives: {
      goOnlyScaffolding: uniqueSorted(goOnlyScaffolding).slice(0, 24),
      generatedOnly: uniqueSorted(generatedOnly).slice(0, 24),
      renamedEnumMembers: uniqueSorted(renamedEnumMembers).slice(0, 24),
      movedToOtherModule: uniqueSorted(movedToOtherModule).slice(0, 24),
      intentionalCasingRenames: uniqueSorted(intentionalCasingRenames).slice(0, 24),
    },
  };
}

function kindCoverage(
  kind: Kind,
  upstream: readonly Declaration[],
  trulyMissing: readonly Declaration[],
): KindCoverage {
  const upstreamOfKind = upstream.filter((d) => d.kind === kind);
  const missingOfKind = trulyMissing.filter((d) => d.kind === kind);
  const matched = upstreamOfKind.length - missingOfKind.length;
  return {
    upstream: upstreamOfKind.length,
    matched,
    coverage: upstreamOfKind.length === 0 ? 1 : matched / upstreamOfKind.length,
    missing: uniqueSorted(missingOfKind.map((d) => d.name)).slice(0, 32),
  };
}

function partitionGenerated(files: readonly SourceFile[]): { readonly hand: readonly SourceFile[]; readonly generated: readonly SourceFile[] } {
  return {
    hand: files.filter((f) => !f.generated),
    generated: files.filter((f) => f.generated),
  };
}

function moduleReport(
  spec: ModuleSpec,
  upstreamFiles: readonly SourceFile[],
  localFiles: readonly SourceFile[],
  globalLocalNames: ReadonlySet<string>,
  globalLocalEnumMembers: ReadonlySet<string>,
  globalLocalTypeContainers: ReadonlySet<string>,
  globalLocalExactNames: ReadonlySet<string>,
  casingConventionEnabled: boolean,
  declarationThreshold: number,
  shapeThreshold: number,
): ModuleReport {
  const upstream = partitionGenerated(upstreamFiles);
  const local = partitionGenerated(localFiles);

  const upstreamHand = extractGoDeclarations(upstream.hand);
  const localHand = extractTsDeclarations(local.hand);
  const upstreamGenerated = extractGoDeclarations(upstream.generated);
  const localGenerated = extractTsDeclarations(local.generated);

  // Local enum containers/members come from this module AND shared enums
  // (src/enums + checker/types.ts const-object enums are global).
  const localTypeContainers = new Set([
    ...localHand.filter((d) => d.kind === "type").map((d) => d.name),
    ...localGenerated.filter((d) => d.kind === "type").map((d) => d.name),
    ...globalLocalTypeContainers,
  ]);
  const localEnumMemberNames = new Set([
    ...localHand.filter((d) => d.kind === "value").map((d) => d.name.toLowerCase()),
    ...localGenerated.filter((d) => d.kind === "value").map((d) => d.name.toLowerCase()),
    ...globalLocalEnumMembers,
  ]);

  // Upstream Go enum type names act as flat-prefix sources (e.g. `type Flags`
  // -> `FlagsAllowEmptyTuple`). Used to recover renamed enum containers.
  const upstreamTypeNames = new Set([
    ...upstreamHand.filter((d) => d.kind === "type").map((d) => d.name),
    ...upstreamGenerated.filter((d) => d.kind === "type").map((d) => d.name),
  ]);

  // Exact-case local declaration names (leading `#` stripped) for this module
  // and globally. A directly-matched upstream name absent from this set was
  // matched only by a case difference — the intentional TS casing rename.
  const localExactNames = new Set<string>([
    ...localHand.map((d) => d.name.replace(/^#/, "")),
    ...localGenerated.map((d) => d.name.replace(/^#/, "")),
    ...globalLocalExactNames,
  ]);

  const comparison = declarationComparison({
    upstreamHand,
    localHand,
    upstreamGeneratedNames: new Set(upstreamGenerated.map((d) => d.name)),
    localTypeContainers,
    upstreamTypeNames,
    localEnumMemberNames,
    globalLocalNames,
    localExactNames,
    casingConventionEnabled,
  });

  const declarationCoverage = upstreamHand.length === 0 ? 1 : comparison.matched / upstreamHand.length;
  const generatedDeclarationCoverage = upstreamGenerated.length === 0
    ? 1
    : Math.min(localGenerated.length, upstreamGenerated.length) / upstreamGenerated.length;

  const moduleShapeScore = shapeScore(shape(upstream.hand, upstreamHand, "go"), shape(local.hand, localHand, "ts"));
  const stubMarkers = findStubMarkers(local.hand);
  const scope = includeDeferred() ? "required" : spec.scope;
  const failed = scope === "required" && (
    upstreamFiles.length === 0 ||
    declarationCoverage < declarationThreshold ||
    moduleShapeScore < shapeThreshold ||
    stubMarkers.length > 0
  );

  const byKind: Record<Kind, KindCoverage> = {
    function: kindCoverage("function", upstreamHand, comparison.missing),
    type: kindCoverage("type", upstreamHand, comparison.missing),
    value: kindCoverage("value", upstreamHand, comparison.missing),
  };

  return {
    module: spec.upstream,
    local: spec.local,
    scope,
    status: upstreamFiles.length === 0 ? "missing-upstream" : scope === "deferred" ? "deferred" : failed ? "fail" : "pass",
    upstreamFiles: upstream.hand.length,
    localFiles: local.hand.length,
    upstreamGeneratedFiles: upstream.generated.length,
    localGeneratedFiles: local.generated.length,
    upstreamDeclarations: upstreamHand.length,
    localDeclarations: localHand.length,
    matchedDeclarations: comparison.matched,
    directlyMatchedDeclarations: comparison.directlyMatched,
    genuinelyMissingDeclarations: comparison.missing.length,
    declarationCoverage,
    upstreamGeneratedDeclarations: upstreamGenerated.length,
    localGeneratedDeclarations: localGenerated.length,
    generatedDeclarationCoverage,
    byKind,
    shapeScore: moduleShapeScore,
    stubMarkers: stubMarkers.slice(0, 12),
    missingDeclarations: uniqueSorted(comparison.missing.map((d) => d.name)).slice(0, 32),
    extraDeclarations: comparison.extra,
    falsePositives: comparison.falsePositives,
  };
}

function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function renderText(report: LogicalParityReport): string {
  const required = report.reports.filter((item) => item.scope === "required");
  const failing = required.filter((item) => item.status === "fail" || item.status === "missing-upstream");
  const upstreamDeclarations = required.reduce((sum, item) => sum + item.upstreamDeclarations, 0);
  const matchedDeclarations = required.reduce((sum, item) => sum + item.matchedDeclarations, 0);
  const weightedShape = required.reduce((sum, item) => sum + item.shapeScore * Math.max(item.upstreamDeclarations, 1), 0);
  const weightedShapeWeight = required.reduce((sum, item) => sum + Math.max(item.upstreamDeclarations, 1), 0);
  const stubs = required.reduce((sum, item) => sum + item.stubMarkers.length, 0);
  const totalFalsePositives = required.reduce((sum, item) => sum
    + item.falsePositives.goOnlyScaffolding.length
    + item.falsePositives.generatedOnly.length
    + item.falsePositives.renamedEnumMembers.length
    + item.falsePositives.movedToOtherModule.length, 0);
  const totalCasingRenames = required.reduce((sum, item) => sum + item.falsePositives.intentionalCasingRenames.length, 0);
  const lines: string[] = [];
  lines.push("TSTS / TS-Go Logical Parity (hardened)");
  lines.push(`tsgo_repo=${report.tsgoRepo}`);
  lines.push(`thresholds declaration_coverage>=${percent(report.declarationThreshold)} shape_score>=${percent(report.shapeThreshold)} stubs=0`);
  lines.push(`required_modules=${required.length} failing_modules=${failing.length}`);
  lines.push(`hand_declarations=${matchedDeclarations}/${upstreamDeclarations} coverage=${percent(upstreamDeclarations === 0 ? 1 : matchedDeclarations / upstreamDeclarations)}`);
  lines.push(`weighted_shape_score=${percent(weightedShapeWeight === 0 ? 1 : weightedShape / weightedShapeWeight)} stub_markers=${stubs} false_positive_candidates=${totalFalsePositives} intentional_casing_renames=${totalCasingRenames}`);
  lines.push("");
  lines.push("status module hand_decl=matched/upstream cov fn/type/val shape stubs gen=local/upstream local");
  for (const item of report.reports) {
    const fk = item.byKind.function;
    const tk = item.byKind.type;
    const vk = item.byKind.value;
    lines.push(
      `${item.status.toUpperCase()} ${item.module} hand_decl=${item.matchedDeclarations}/${item.upstreamDeclarations} cov=${percent(item.declarationCoverage)} ` +
      `fn=${fk.matched}/${fk.upstream} type=${tk.matched}/${tk.upstream} val=${vk.matched}/${vk.upstream} ` +
      `shape=${percent(item.shapeScore)} stubs=${item.stubMarkers.length} gen=${item.localGeneratedDeclarations}/${item.upstreamGeneratedDeclarations} local=${item.local.join("+")}`,
    );
    if (item.status === "fail" && item.missingDeclarations.length > 0) {
      lines.push(`  missing_declarations ${item.missingDeclarations.slice(0, 12).join(", ")}`);
    }
    if (item.status === "fail") {
      const fp = item.falsePositives;
      const fpParts: string[] = [];
      if (fp.goOnlyScaffolding.length > 0) fpParts.push(`go_scaffolding=${fp.goOnlyScaffolding.length}`);
      if (fp.generatedOnly.length > 0) fpParts.push(`generated_only=${fp.generatedOnly.length}`);
      if (fp.renamedEnumMembers.length > 0) fpParts.push(`renamed_enum=${fp.renamedEnumMembers.length}`);
      if (fp.movedToOtherModule.length > 0) fpParts.push(`moved=${fp.movedToOtherModule.length}`);
      if (fp.intentionalCasingRenames.length > 0) fpParts.push(`casing_renames=${fp.intentionalCasingRenames.length}`);
      if (fpParts.length > 0) lines.push(`  false_positives ${fpParts.join(" ")}`);
    }
    if (item.status === "fail" && item.stubMarkers.length > 0) {
      for (const marker of item.stubMarkers.slice(0, 3)) {
        lines.push(`  stub ${marker.file}:${marker.line} ${marker.text}`);
      }
    }
  }
  return lines.join("\n");
}

function writeOutputs(report: LogicalParityReport, text: string): void {
  const tempDir = join(REPO_ROOT, ".temp");
  mkdirSync(tempDir, { recursive: true });
  writeFileSync(join(tempDir, "logical-parity.txt"), `${text}\n`);
  writeFileSync(join(tempDir, "logical-parity.json"), `${JSON.stringify(report, null, 2)}\n`);
}

function main(): void {
  const declarationThreshold = parseThreshold("declaration-threshold", DEFAULT_DECLARATION_THRESHOLD);
  const shapeThreshold = parseThreshold("shape-threshold", DEFAULT_SHAPE_THRESHOLD);
  const tsgoRepo = process.env.TSGO_REPO ?? DEFAULT_TSGO_REPO;
  const tsgoInternal = join(tsgoRepo, "internal");
  const tstsSrc = join(PROJECT_ROOT, "src");
  if (!existsSync(tsgoInternal)) {
    console.error(`TS-Go internal directory not found: ${tsgoInternal}`);
    process.exit(2);
  }
  const specs = includeDeferred() ? MODULES : MODULES.filter((spec) => spec.scope === "required");

  // Collect per-module file sets once so we can build a global local-name index
  // for moved-to-other-module detection and a shared enum index.
  const collected = specs.map((spec) => ({
    spec,
    upstreamFiles: collectFiles(tsgoInternal, [spec.upstream], isTsGoCandidate, "go", EXCLUDED_TSGO_FILES),
    localFiles: collectFiles(tstsSrc, spec.local, isTstsCandidate, "ts", EXCLUDED_TSTS_FILES),
  }));

  // Shared enum index: src/enums (Herebyfile generate:enums) and any
  // const-object enums referenced cross-module.
  const sharedEnumFiles = collectFiles(tstsSrc, SHARED_ENUM_LOCALS, isTstsCandidate, "ts", EXCLUDED_TSTS_FILES);
  const sharedEnumDecls = extractTsDeclarations(sharedEnumFiles);
  const sharedEnumMembers = new Set(sharedEnumDecls.filter((d) => d.kind === "value").map((d) => d.name.toLowerCase()));
  const sharedEnumContainers = new Set(sharedEnumDecls.filter((d) => d.kind === "type").map((d) => d.name));

  // Global local-name index across all required modules (for moved detection).
  const allLocalFiles = collected.flatMap((c) => c.localFiles).concat(sharedEnumFiles);
  const allLocalDecls = extractTsDeclarations(allLocalFiles.filter((f) => !f.generated));
  const globalLocalNames = new Set(allLocalDecls.map((d) => normalizeName(d.name)));
  // Exact-case global local names (leading `#` stripped) for casing-rename
  // detection on moved-to-other-module matches.
  const globalLocalExactNames = new Set(allLocalDecls.map((d) => d.name.replace(/^#/, "")));
  const globalLocalEnumMembers = new Set([
    ...sharedEnumMembers,
    ...extractTsDeclarations(allLocalFiles).filter((d) => d.kind === "value").map((d) => d.name.toLowerCase()),
  ]);
  const globalLocalTypeContainers = new Set([
    ...sharedEnumContainers,
    ...extractTsDeclarations(allLocalFiles).filter((d) => d.kind === "type").map((d) => d.name),
  ]);
  const casingConventionEnabled = loadCasingConventionEnabled();

  const reports = collected.map((c) =>
    moduleReport(
      c.spec,
      c.upstreamFiles,
      c.localFiles,
      globalLocalNames,
      globalLocalEnumMembers,
      globalLocalTypeContainers,
      globalLocalExactNames,
      casingConventionEnabled,
      declarationThreshold,
      shapeThreshold,
    ),
  );
  const report: LogicalParityReport = { tsgoRepo, declarationThreshold, shapeThreshold, reports };
  const text = renderText(report);
  writeOutputs(report, text);
  console.log(outputJson() ? JSON.stringify(report, null, 2) : text);
  const hasFailure = reports.some((item) => item.scope === "required" && item.status !== "pass");
  process.exit(hasFailure && failOnFindings() ? 1 : 0);
}

main();
