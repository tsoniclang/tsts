/**
 * Shared TS-Go parity parsing infrastructure.
 *
 * Extracted so the container/member inventory (checkTsgoContainerMemberInventory.ts)
 * reuses the SAME parsing/classification primitives as the function inventory
 * (checkTsgoFunctionInventory.ts) and logical-parity (checkLogicalParity.ts)
 * tools rather than re-implementing them. Keeping a single copy of the comment/
 * string stripper, the file walkers, the generated/excluded detectors, the
 * module list, and the renames / split-ownership loaders guarantees the
 * container tool classifies containers and members consistently with how the
 * sibling tools classify files and functions.
 *
 * Pure functions only; the only I/O is reading the on-disk maps and source
 * trees, which every parity tool needs.
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Paths / constants
// ---------------------------------------------------------------------------

const SHARED_DIR = dirname(fileURLToPath(import.meta.url));
export const PROJECT_ROOT = join(SHARED_DIR, "..");
export const REPO_ROOT = join(PROJECT_ROOT, "..", "..");
export const DEFAULT_TSGO_REPO = "/home/jeswin/temp/typescript-go";
export const PARITY_MAPS_DIR = join(REPO_ROOT, ".analysis", "tsts-tsc", "parity-maps");
export const RENAMES_PATH = join(PARITY_MAPS_DIR, "renames.json");
export const SPLIT_OWNERSHIP_PATH = join(PARITY_MAPS_DIR, "split-ownership.json");

export type Scope = "required" | "deferred";

export interface ModuleSpec {
  readonly upstream: string;
  readonly local: readonly string[];
  readonly scope: Scope;
}

export interface SourceFile {
  readonly path: string;
  readonly text: string;
}

// Keep the module list aligned with checkLogicalParity.ts / checkTsgoFunctionInventory.ts
// so the parity tools report on the same surface. Drift between the lists would
// make the inventory misleading.
export const MODULES: readonly ModuleSpec[] = [
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

// Hand-port-incomplete TS files that the sibling tools exclude (generated AST,
// native-preview scanner, etc). Excluded identically here so the two surfaces
// match.
export const EXCLUDED_TSTS_FILES: ReadonlySet<string> = new Set([
  "ast/ast.ts",
  "ast/clone.ts",
  "ast/is.ts",
  "ast/utils.ts",
  "astnav/astnav.ts",
  "scanner/scanner.nativePreview.ts",
]);

export const EXCLUDED_TSGO_FILES: ReadonlySet<string> = new Set([
  "testutil/lsptestutil/lspclient.go",
]);

// ---------------------------------------------------------------------------
// File walking + classification (mirrors checkLogicalParity.ts / function inv.)
// ---------------------------------------------------------------------------

export function walk(dir: string, predicate: (path: string) => boolean): readonly string[] {
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
// TSTS generators (shared with checkLogicalParity.ts).
export function hasGeneratedHeader(text: string): boolean {
  const head = text.slice(0, 512);
  return /Code generated\b[\s\S]*?DO NOT EDIT\./.test(head);
}

function isGoBuildIgnore(text: string): boolean {
  return text.slice(0, 256).includes("//go:build ignore");
}

export function isGeneratedGoPath(path: string): boolean {
  return (
    path.endsWith("_generated.go") ||
    path.endsWith("_stringer.go") ||
    path.endsWith("stringer_generated.go") ||
    /\/generatedidentifierflags\.go$/.test(path) ||
    path.endsWith("/generate.go")
  );
}

export function isGeneratedTsPath(path: string): boolean {
  return path.endsWith(".generated.ts") || path.includes("/generated/");
}

// A candidate TS-Go source. Excludes tests and go:build-ignore tool scripts but
// INCLUDES generated files (tagged separately so they can be classified as
// `generated-*` rather than `missing-*`).
export function isTsGoCandidate(path: string): boolean {
  if (!path.endsWith(".go") || path.endsWith("_test.go")) return false;
  if (path.endsWith("/generate.go")) return false;
  return !isGoBuildIgnore(readFileSync(path, "utf8"));
}

export function isTstsCandidate(path: string): boolean {
  if (!path.endsWith(".ts")) return false;
  if (path.endsWith(".test.ts") || path.endsWith(".d.ts")) return false;
  return true;
}

export function classifyGenerated(language: "go" | "ts", path: string, text: string): boolean {
  if (hasGeneratedHeader(text)) return true;
  return language === "go" ? isGeneratedGoPath(path) : isGeneratedTsPath(path);
}

export interface ClassifiedFile extends SourceFile {
  readonly generated: boolean;
}

export function collectFiles(
  root: string,
  modules: readonly string[],
  candidate: (path: string) => boolean,
  language: "go" | "ts",
  excluded: ReadonlySet<string>,
): readonly ClassifiedFile[] {
  const files = modules.flatMap((moduleName) => walk(join(root, moduleName), candidate));
  return [...new Set(files)]
    .sort()
    .map((file) => ({ full: file, rel: relative(root, file).replace(/\\/g, "/") }))
    .filter((file) => !excluded.has(file.rel))
    .map((file) => {
      const text = readFileSync(file.full, "utf8");
      return { path: file.rel, text, generated: classifyGenerated(language, file.rel, text) };
    });
}

// ---------------------------------------------------------------------------
// Comment / string stripping (proven state machine shared across the tools).
//
// Single-pass strip of line/block comments and the CONTENTS of string / char /
// template (backtick / Go raw-string) literals, preserving delimiters and all
// newlines so line-numbering of subsequent line-by-line scanning is unchanged.
// A backtick inside a string or comment has no close on the same line; naive
// backtick tracking would then treat every following line as inside a template
// literal and hide every later declaration (defect 1). Blanking literal
// interiors makes the scanner template-literal aware on BOTH sides.
// ---------------------------------------------------------------------------

export function stripCommentsAndStrings(text: string): string {
  const out: string[] = [];
  const n = text.length;
  let i = 0;
  type State = "code" | "line" | "block" | "dquote" | "squote" | "backtick";
  let state: State = "code";
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
      if (c === "`") { state = "backtick"; out.push("`"); i += 1; continue; }
      if (c === "{") { braceDepth += 1; out.push(c); i += 1; continue; }
      if (c === "}") {
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

export function stripLineComment(line: string): string {
  const index = line.indexOf("//");
  return index < 0 ? line : line.slice(0, index);
}

// Member-name normalization shared with checkTsgoFunctionInventory.ts: drop a
// leading `#` private marker and leading underscores, then lowercase. This folds
// the PascalCase->camelCase / `#private` casing convention so a Go member and
// its TSTS twin compare equal by normalized name.
export function normalizeName(name: string): string {
  return name.replace(/^#/, "").replace(/^_+/, "").toLowerCase();
}

// ---------------------------------------------------------------------------
// Renames map (parity-maps/renames.json) — shared loader.
// ---------------------------------------------------------------------------

export interface RenameEntry {
  readonly localName?: string;
  readonly localNames?: readonly string[];
  readonly reason?: string;
}

export interface RenameMap {
  readonly path: string | null;
  readonly casingConventionEnabled: boolean;
  readonly entries: Record<string, RenameEntry>;
}

interface RenamesFile {
  readonly casingConvention?: { readonly enabled?: boolean };
  readonly renames?: { readonly entries?: Record<string, RenameEntry> };
}

export function loadRenameMap(): RenameMap {
  if (!existsSync(RENAMES_PATH)) return { path: null, casingConventionEnabled: false, entries: {} };
  try {
    const parsed = JSON.parse(readFileSync(RENAMES_PATH, "utf8")) as RenamesFile;
    return {
      path: relative(REPO_ROOT, RENAMES_PATH).replace(/\\/g, "/"),
      casingConventionEnabled: parsed.casingConvention?.enabled ?? false,
      entries: parsed.renames?.entries ?? {},
    };
  } catch (error) {
    console.error(`Failed to parse rename map ${RENAMES_PATH}: ${(error as Error).message}`);
    return { path: null, casingConventionEnabled: false, entries: {} };
  }
}

// ---------------------------------------------------------------------------
// Split-ownership map (parity-maps/split-ownership.json) — shared loader.
//
// The canonical shape is an envelope { splits: { "<go file>": ["<ts file>"...] },
// barrels: { files: [...] }, enumSurface: { files: [...] }, ... }. We expose the
// split map (go file -> ts files) plus the barrel / enum-surface file sets so
// the container tool can attribute split containers and treat barrel/enum-surface
// files consistently with how the work-packet generator treats them.
// ---------------------------------------------------------------------------

export interface SplitOwnershipMap {
  readonly path: string | null;
  // Go file (relative to internal/) -> TSTS files (relative to src/) that
  // together decompose it.
  readonly splits: Record<string, readonly string[]>;
  // TSTS barrel/index files (re-export scaffolding, no Go counterpart).
  readonly barrelFiles: ReadonlySet<string>;
  // TSTS enum-definition-surface files under src/enums.
  readonly enumSurfaceFiles: ReadonlySet<string>;
}

interface SplitOwnershipFile {
  readonly splits?: Record<string, readonly string[]>;
  readonly barrels?: { readonly files?: readonly string[] };
  readonly enumSurface?: { readonly files?: readonly string[] };
}

export function loadSplitOwnership(): SplitOwnershipMap {
  if (!existsSync(SPLIT_OWNERSHIP_PATH)) {
    return { path: null, splits: {}, barrelFiles: new Set(), enumSurfaceFiles: new Set() };
  }
  try {
    const parsed = JSON.parse(readFileSync(SPLIT_OWNERSHIP_PATH, "utf8")) as SplitOwnershipFile;
    const splits: Record<string, readonly string[]> = {};
    for (const [key, value] of Object.entries(parsed.splits ?? {})) {
      if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
        splits[key] = value;
      }
    }
    return {
      path: relative(REPO_ROOT, SPLIT_OWNERSHIP_PATH).replace(/\\/g, "/"),
      splits,
      barrelFiles: new Set(parsed.barrels?.files ?? []),
      enumSurfaceFiles: new Set(parsed.enumSurface?.files ?? []),
    };
  } catch (error) {
    console.error(`Failed to parse split-ownership map ${SPLIT_OWNERSHIP_PATH}: ${(error as Error).message}`);
    return { path: null, splits: {}, barrelFiles: new Set(), enumSurfaceFiles: new Set() };
  }
}

// Local TSTS files (relative to src/) that the split-ownership map associates
// with a given upstream Go file. Used to attribute receiver methods modeled as
// free functions to the file(s) that decompose the receiver's home .go file.
export function splitLocalsForUpstream(splits: SplitOwnershipMap, upstreamGoFile: string): readonly string[] {
  const key = upstreamGoFile.replace(/\\/g, "/");
  return splits.splits[key] ?? [];
}
