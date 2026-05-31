/**
 * TS-Go structural parity check.
 *
 * This gate is intentionally separate from LOC parity. A module can have
 * enough local code and still be structurally wrong if an upstream file concept
 * is absent. Large upstream files may be split into multiple TypeScript files,
 * and local TypeScript filenames may use the project-local TS convention
 * instead of byte-for-byte Go names. The gate therefore checks concepts, not
 * literal casing.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const TOOL_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(TOOL_DIR, "..");
const DEFAULT_TSGO_REPO = "/home/jeswin/temp/typescript-go";

interface ModuleSpec {
  readonly upstream: string;
  readonly local: readonly string[];
}

interface ModuleStructureReport {
  readonly module: string;
  readonly upstreamFiles: number;
  readonly localFiles: number;
  readonly matchedFiles: number;
  readonly pathCoverage: number;
  readonly missingFiles: readonly string[];
  readonly extraFiles: readonly string[];
  readonly aliasMatches: readonly ConceptAliasMatch[];
}

interface ConceptAliasMatch {
  readonly upstream: string;
  readonly local: readonly string[];
}

const REQUIRED_MODULES: readonly ModuleSpec[] = [
  { upstream: "api", local: ["api"] },
  { upstream: "ast", local: ["ast"] },
  { upstream: "astnav", local: ["astnav"] },
  { upstream: "binder", local: ["binder"] },
  { upstream: "bundled", local: ["bundled"] },
  { upstream: "checker", local: ["checker"] },
  { upstream: "collections", local: ["collections"] },
  { upstream: "compiler", local: ["compiler"] },
  { upstream: "core", local: ["core"] },
  { upstream: "debug", local: ["debug"] },
  { upstream: "diagnostics", local: ["diagnostics"] },
  { upstream: "diagnosticwriter", local: ["diagnosticwriter"] },
  { upstream: "evaluator", local: ["evaluator"] },
  { upstream: "execute", local: ["execute"] },
  { upstream: "format", local: ["format"] },
  { upstream: "glob", local: ["glob"] },
  { upstream: "jsnum", local: ["jsnum"] },
  { upstream: "json", local: ["json"] },
  { upstream: "module", local: ["module"] },
  { upstream: "modulespecifiers", local: ["modulespecifiers"] },
  { upstream: "nodebuilder", local: ["nodebuilder"] },
  { upstream: "outputpaths", local: ["outputpaths"] },
  { upstream: "packagejson", local: ["packagejson"] },
  { upstream: "parser", local: ["parser"] },
  { upstream: "printer", local: ["printer", "emit-js"] },
  { upstream: "project", local: ["project"] },
  { upstream: "pseudochecker", local: ["pseudochecker"] },
  { upstream: "scanner", local: ["scanner"] },
  { upstream: "semver", local: ["semver"] },
  { upstream: "sourcemap", local: ["sourcemap"] },
  { upstream: "stringutil", local: ["stringutil"] },
  { upstream: "symlinks", local: ["symlinks"] },
  { upstream: "testrunner", local: ["runner"] },
  { upstream: "testutil", local: ["testutil"] },
  { upstream: "transformers", local: ["transformers"] },
  { upstream: "tsoptions", local: ["tsoptions", "config"] },
  { upstream: "tspath", local: ["tspath"] },
  { upstream: "vfs", local: ["vfs"] },
];

const IGNORED_UPSTREAM_CONCEPTS = new Set<string>([
  "compiler:pkg",
]);

const CONCEPT_ALIASES = new Map<string, readonly string[]>([
  ["ast:ast", ["index", "aliases", "generated/types", "generated/nodes"]],
  ["ast:ast_generated", ["generated/kind", "generated/types", "generated/nodes", "generated/factory", "generated/visitor", "generated/is", "generated/metadata"]],
  ["ast:checkflags", ["generated/nodes", "flags"]],
  ["ast:diagnostic", ["aliases", "../diagnostics/types"]],
  ["ast:flow", ["flowflags", "aliases", "generated/types"]],
  ["ast:functionflags", ["accessors", "utilities"]],
  ["ast:kind_generated", ["generated/kind"]],
  ["ast:modifierflags", ["../enums/modifierFlags.enum"]],
  ["ast:nodeflags", ["flags"]],
  ["ast:positionmap", ["aliases"]],
  ["ast:symbol", ["generated/types", "aliases"]],
  ["ast:symbolflags", ["flags"]],
  ["ast:tokenflags", ["../enums/tokenFlags.enum"]],
  ["ast:visitor", ["generated/visitor"]],
  ["checker:nodebuilder_hover", ["nodebuilder"]],
  ["checker:nodebuilderimpl", ["nodebuilder"]],
  ["checker:nodebuilderscopes", ["nodebuilder"]],
  ["checker:pseudotypenodebuilder", ["nodebuilder"]],
  ["diagnosticwriter:diagnosticwriter", ["format", "types"]],
  ["execute:build/compilerHost", ["build/host"]],
  ["printer:utilities", ["printer-utilities"]],
]);

const EXCLUDED_TSTS_SOURCE_FILES = new Set<string>([
  "ast/ast.ts",
  "ast/ast.generated.ts",
  "ast/factory.generated.ts",
  "ast/is.generated.ts",
  "ast/is.ts",
  "ast/visitor.generated.ts",
  "ast/clone.ts",
  "ast/utils.ts",
  "astnav/astnav.ts",
  "scanner/scanner.native-preview.ts",
]);

function useJson(): boolean {
  return process.argv.includes("--json");
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
  if (path.endsWith(".test.ts") || path.endsWith(".d.ts")) return false;
  return true;
}

function normalizedConceptPath(path: string): string {
  return path
    .split("/")
    .map((segment) => segment.toLowerCase().replace(/[-_]/g, ""))
    .join("/");
}

function conceptKey(moduleName: string, file: string): string {
  return `${moduleName}:${file}`;
}

function aliasExists(tstsSrc: string, localModules: readonly string[], localConcepts: ReadonlySet<string>, alias: string): boolean {
  if (localConcepts.has(normalizedConceptPath(alias))) return true;
  return localModules.some((moduleName) => existsSync(join(tstsSrc, moduleName, `${alias}.ts`)));
}

function withoutExtension(path: string): string {
  return path.replace(/\.(go|ts)$/, "");
}

function collectUpstreamFiles(tsgoInternal: string, moduleName: string): readonly string[] {
  const root = join(tsgoInternal, moduleName);
  return walk(root, isTsGoSource)
    .map((file) => withoutExtension(relative(root, file).replace(/\\/g, "/")))
    .sort();
}

function collectLocalFiles(tstsSrc: string, localModules: readonly string[]): readonly string[] {
  const files = new Set<string>();
  for (const moduleName of localModules) {
    const root = join(tstsSrc, moduleName);
    for (const file of walk(root, isTstsSource)) {
      const srcRelative = relative(tstsSrc, file).replace(/\\/g, "/");
      if (EXCLUDED_TSTS_SOURCE_FILES.has(srcRelative)) continue;
      files.add(withoutExtension(relative(root, file).replace(/\\/g, "/")));
    }
  }
  return [...files].sort();
}

function buildReports(tsgoInternal: string, tstsSrc: string): readonly ModuleStructureReport[] {
  return REQUIRED_MODULES.map((spec) => {
    const upstream = collectUpstreamFiles(tsgoInternal, spec.upstream);
    const local = collectLocalFiles(tstsSrc, spec.local);
    const localConcepts = new Set(local.map(normalizedConceptPath));
    const upstreamConcepts = new Set(upstream.map(normalizedConceptPath));
    const aliasMatches: ConceptAliasMatch[] = [];
    const missingFiles = upstream.filter((file) => {
      if (localConcepts.has(normalizedConceptPath(file))) return false;
      const key = conceptKey(spec.upstream, file);
      if (IGNORED_UPSTREAM_CONCEPTS.has(key)) return false;
      const aliases = CONCEPT_ALIASES.get(key);
      if (aliases === undefined) return true;
      const matchedAliases = aliases.filter((alias) => aliasExists(tstsSrc, spec.local, localConcepts, alias));
      if (matchedAliases.length === 0) return true;
      aliasMatches.push({ upstream: file, local: matchedAliases });
      return false;
    });
    const extraFiles = local.filter((file) => !upstreamConcepts.has(normalizedConceptPath(file)));
    const matchedFiles = upstream.length - missingFiles.length;
    return {
      module: spec.upstream,
      upstreamFiles: upstream.length,
      localFiles: local.length,
      matchedFiles,
      pathCoverage: upstream.length === 0 ? 1 : matchedFiles / upstream.length,
      missingFiles,
      extraFiles,
      aliasMatches,
    };
  });
}

function renderText(reports: readonly ModuleStructureReport[]): string {
  const totalUpstream = reports.reduce((sum, report) => sum + report.upstreamFiles, 0);
  const totalMatched = reports.reduce((sum, report) => sum + report.matchedFiles, 0);
  const totalExtra = reports.reduce((sum, report) => sum + report.extraFiles.length, 0);
  const failing = reports.filter((report) => report.missingFiles.length > 0);
  const lines: string[] = [];
  lines.push("TSTS / TS-Go Structural Parity");
  const aliasCount = reports.reduce((sum, report) => sum + report.aliasMatches.length, 0);
  lines.push(`upstream_concepts=${totalUpstream} matched_concepts=${totalMatched} concept_coverage=${((totalMatched / totalUpstream) * 100).toFixed(1)}% modules_with_missing=${failing.length} extra_local_files=${totalExtra} alias_matches=${aliasCount}`);
  lines.push("");
  lines.push("module upstream local matched concept% missing extra");
  for (const report of reports) {
    if (report.missingFiles.length === 0 && report.extraFiles.length === 0) continue;
    lines.push([
      report.module,
      report.upstreamFiles,
      report.localFiles,
      report.matchedFiles,
      `${(report.pathCoverage * 100).toFixed(1)}%`,
      report.missingFiles.slice(0, 12).join(",") || "-",
      report.extraFiles.slice(0, 12).join(",") || "-",
    ].join(" "));
  }
  return lines.join("\n");
}

function main(): void {
  const tsgoRepo = process.env.TSGO_REPO ?? DEFAULT_TSGO_REPO;
  const tsgoInternal = join(tsgoRepo, "internal");
  const tstsSrc = join(PROJECT_ROOT, "src");
  const reports = buildReports(tsgoInternal, tstsSrc);
  if (useJson()) {
    console.log(JSON.stringify({ reports }, null, 2));
  } else {
    console.log(renderText(reports));
  }
  process.exit(reports.some((report) => report.missingFiles.length > 0) ? 1 : 0);
}

main();
