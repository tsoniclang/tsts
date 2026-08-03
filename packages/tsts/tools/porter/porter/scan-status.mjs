import { spawnSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
} from "node:fs";
import path from "node:path";
import {
  assertDirectory,
  countsByModule,
  fail,
  increment,
  moduleNameFor,
  repoRoot,
  resolveRepo,
  walk,
} from "./common.mjs";
import {
  expectedTsPath,
  isActivePortPolicy,
  policyFor,
  policyForUnit,
  tsFilePolicyFor,
} from "./policy.mjs";
import { emptyGeneratedArtifactStatus } from "./generated-status.mjs";
import { buildLargeFileSplitStatus } from "./large-file-splits.mjs";
import { emptyAstGeneratedArtifactStatus } from "../ast-generator.mjs";
import { emptyDiagnosticsGeneratedArtifactStatus } from "../diagnostics-generator.mjs";
import { emptyBundledGeneratedArtifactStatus } from "../../bundled/generate-bundled.mjs";
import { emptyUnicodeGeneratedArtifactStatus } from "../../unicode/generate-unicode-data.mjs";

export function runScan(config) {
  const sourceRoot = resolveRepo(config.sourceRoot);
  const helperDir = resolveRepo("packages/tsts/tools/porter/go-extractor");
  assertDirectory(sourceRoot, "TS-Go source root");
  assertDirectory(helperDir, "Go extractor");

  const result = spawnSync(
    "go",
    ["run", ".", "-root", sourceRoot, "-module", config.goModulePath],
    { cwd: helperDir, encoding: "utf8", maxBuffer: 1024 * 1024 * 512 },
  );
  if (result.error) {
    fail(`failed to execute go extractor: ${result.error.message}`);
  }
  if (result.status !== 0) {
    fail(`go extractor failed with exit ${result.status}\n${result.stderr}`);
  }
  try {
    return JSON.parse(result.stdout);
  } catch (error) {
    fail(`go extractor produced invalid JSON: ${error.message}`);
  }
}

export function emptySchemaSourceSyncStatus() {
  return { mismatches: [] };
}

// Some vendored-schema inputs (packages/tsts/schema/tsgo/*) are verbatim copies
// of TS-Go source files. The AST generator validates artifacts against those
// COPIES, never against live source, so a real upstream change that wasn't
// mirrored into the schema dir would sit behind a green `verify`. This check
// asserts each declared copy is byte-identical (CRLF-normalized) to its live
// source file under config.sourceRoot, so the schema pin cannot silently lag
// the source pin. Bias is toward over-reporting: any byte difference fails.
export function buildSchemaSourceSyncStatus(config) {
  const checks = config.schemaSourceSyncChecks ?? [];
  const sourceRoot = resolveRepo(config.sourceRoot);
  const mismatches = [];
  const normalize = (text) => text.replace(/\r\n/g, "\n");
  for (const check of checks) {
    const schemaPath = resolveRepo(check.schema);
    const sourcePath = path.join(sourceRoot, check.source);
    if (!existsSync(schemaPath)) {
      mismatches.push({ schema: check.schema, source: check.source, reason: "schema-dir copy is missing" });
      continue;
    }
    if (!existsSync(sourcePath)) {
      mismatches.push({ schema: check.schema, source: check.source, reason: "live source file is missing (upstream moved/removed it; refresh the schema pin)" });
      continue;
    }
    if (normalize(readFileSync(schemaPath, "utf8")) !== normalize(readFileSync(sourcePath, "utf8"))) {
      mismatches.push({ schema: check.schema, source: check.source, reason: "schema-dir copy differs from live source; refresh the AST schema pin and regenerate" });
    }
  }
  return { mismatches };
}

export function collectSchemaSourceSyncFailures(status) {
  if (status.mismatches.length === 0) return [];
  return [`${status.mismatches.length} schema/source sync mismatches (${status.mismatches.map((m) => m.schema.split("/").pop()).join(", ")})`];
}

export function buildStatus(
  config,
  snapshot,
  tsUnits,
  generatedArtifacts = emptyGeneratedArtifactStatus(),
  astGeneratedArtifacts = emptyAstGeneratedArtifactStatus(),
  diagnosticsGeneratedArtifacts = emptyDiagnosticsGeneratedArtifactStatus(),
  bundledGeneratedArtifacts = emptyBundledGeneratedArtifactStatus(),
  unicodeGeneratedArtifacts = emptyUnicodeGeneratedArtifactStatus(),
  schemaSourceSync = emptySchemaSourceSyncStatus(),
  localOverrides = emptyLocalOverrideStatus(),
) {
  const primaryKinds = new Set(config.primaryUnitKinds);
  const largeFileSplits = buildLargeFileSplitStatus(config, snapshot);
  const goUnits = [];
  const goByID = new Map();
  const duplicateGoIDs = [];

  for (const file of snapshot.files) {
    const filePolicy = policyFor(config, file.path, file.generated);
    for (const unit of file.units ?? []) {
      const policy = policyForUnit(config, unit, file);
      const record = {
        ...unit,
        file: {
          path: file.path,
          importPath: file.importPath,
          packageName: file.packageName,
          lineCount: file.lineCount,
          generated: file.generated,
          policy: filePolicy,
        },
        portable: primaryKinds.has(unit.kind),
        policy,
        expectedTsPath: expectedTsPath(config, unit, largeFileSplits),
      };
      if (goByID.has(record.id)) duplicateGoIDs.push(record.id);
      goByID.set(record.id, record);
      goUnits.push(record);
    }
  }

  const tsByID = new Map();
  const duplicateTsIDs = [];
  for (const unit of tsUnits.units) {
    if (tsByID.has(unit.id)) duplicateTsIDs.push(unit.id);
    tsByID.set(unit.id, unit);
  }

  const rows = [];
  const categoryCounts = new Map();
  const moduleCounts = new Map();
  const missing = [];
  const stale = [];
  const implemented = [];
  const stubbed = [];
  const excluded = [];

  for (const unit of goUnits) {
    if (!unit.portable) continue;

    const tsUnit = tsByID.get(unit.id);
    const category = unit.policy.category;
    const moduleName = moduleNameFor(unit.file.path);
    increment(categoryCounts, category);
    increment(moduleCounts, moduleName);

    const row = {
      id: unit.id,
      kind: unit.kind,
      goPath: unit.file.path,
      name: unit.qualifiedName,
      category,
      expectedTsPath: unit.expectedTsPath,
      status: "missing",
      reason: unit.policy.reason,
      sigHash: unit.sigHash,
      bodyHash: unit.bodyHash,
      tsPath: "",
      tsStatus: "",
    };

    if (!isActivePortPolicy(unit.policy)) {
      row.status = "excluded";
      excluded.push(row);
      rows.push(row);
      continue;
    }

    if (!tsUnit) {
      missing.push(row);
      rows.push(row);
      continue;
    }

    row.tsPath = tsUnit.path;
    row.tsStatus = tsUnit.status;
    row.hasUnimplThrow = tsUnit.hasUnimplThrow ?? false;
    row.kind = tsUnit.kind;
    const sigMatches = !tsUnit.sigHash || tsUnit.sigHash === unit.sigHash;
    const bodyMatches = !tsUnit.bodyHash || tsUnit.bodyHash === unit.bodyHash;
    if (!sigMatches || !bodyMatches) {
      row.status = "stale";
      row.reason = `metadata hash drift: sig=${sigMatches ? "ok" : "changed"} body=${bodyMatches ? "ok" : "changed"}`;
      stale.push(row);
    } else if (tsUnit.status === "implemented") {
      row.status = "implemented";
      implemented.push(row);
    } else if (tsUnit.status === "stub") {
      row.status = "stub";
      stubbed.push(row);
    } else {
      row.status = tsUnit.status || "present";
    }
    rows.push(row);
  }

  const orphanTsUnits = tsUnits.units
    .filter((unit) => !goByID.has(unit.id))
    .map((unit) => ({ id: unit.id, path: unit.path, status: unit.status }));
  const untrackedTsFiles = tsUnits.files
    .filter((file) => file.metadataCount === 0 && tsFilePolicyFor(config, file.path).category === "requires-tsgo-unit")
    .map((file) => ({
      path: file.path,
      reason: tsFilePolicyFor(config, file.path).reason,
    }));
  const forbiddenTsFiles = tsUnits.files
    .filter((file) => tsFilePolicyFor(config, file.path).category === "forbidden-source")
    .map((file) => ({
      path: file.path,
      reason: tsFilePolicyFor(config, file.path).reason,
    }));
  const parseErrors = snapshot.files
    .filter((file) => file.parseError)
    .map((file) => ({ path: file.path, error: file.parseError }));
  const unitlessGoFiles = snapshot.files
    .filter((file) => !file.parseError && (file.units ?? []).length === 0)
    .map((file) => ({
      path: file.path,
      lineCount: file.lineCount,
      reason: "No top-level declarations; package docs/comment-only files are valid but reported.",
    }));

  const featureCounts = {};
  for (const file of snapshot.files) {
    for (const [name, count] of Object.entries(file.featureCounts ?? {})) {
      featureCounts[name] = (featureCounts[name] ?? 0) + count;
    }
  }

  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    source: {
      root: snapshot.sourceRoot,
      gitRevision: snapshot.gitRevision,
      fileCount: snapshot.summary.goFileCount,
      lineCount: snapshot.summary.lineCount,
      unitCount: snapshot.summary.unitCount,
    },
    ts: {
      root: resolveRepo(config.tsRoot),
      metadataUnitCount: tsUnits.units.length,
      scannedFileCount: tsUnits.fileCount,
    },
    counts: {
      portable: rows.length - excluded.length,
      excluded: excluded.length,
      implemented: implemented.length,
      stubbed: stubbed.length,
      missing: missing.length,
      stale: stale.length,
      orphan: orphanTsUnits.length,
      duplicateGoIDs: duplicateGoIDs.length,
      duplicateTsIDs: duplicateTsIDs.length,
      parseErrors: parseErrors.length,
      unitlessGoFiles: unitlessGoFiles.length,
      untrackedTsFiles: untrackedTsFiles.length,
      forbiddenTsFiles: forbiddenTsFiles.length,
      missingGeneratedArtifacts: generatedArtifacts.missing.length,
      staleGeneratedArtifacts: generatedArtifacts.stale.length,
      orphanGeneratedArtifacts: generatedArtifacts.orphan.length,
      untrackedGeneratedArtifacts: generatedArtifacts.untracked.length,
      invalidGeneratedArtifacts: generatedArtifacts.invalid.length,
      missingAstArtifacts: astGeneratedArtifacts.missing.length,
      staleAstArtifacts: astGeneratedArtifacts.stale.length,
      orphanAstArtifacts: astGeneratedArtifacts.orphan.length,
      untrackedAstArtifacts: astGeneratedArtifacts.untracked.length,
      invalidAstArtifacts: astGeneratedArtifacts.invalid.length,
      missingDiagnosticsArtifacts: diagnosticsGeneratedArtifacts.missing.length,
      staleDiagnosticsArtifacts: diagnosticsGeneratedArtifacts.stale.length,
      orphanDiagnosticsArtifacts: diagnosticsGeneratedArtifacts.orphan.length,
      untrackedDiagnosticsArtifacts: diagnosticsGeneratedArtifacts.untracked.length,
      invalidDiagnosticsArtifacts: diagnosticsGeneratedArtifacts.invalid.length,
      missingBundledArtifacts: bundledGeneratedArtifacts.missing.length,
      staleBundledArtifacts: bundledGeneratedArtifacts.stale.length,
      orphanBundledArtifacts: bundledGeneratedArtifacts.orphan.length,
      untrackedBundledArtifacts: bundledGeneratedArtifacts.untracked.length,
      invalidBundledArtifacts: bundledGeneratedArtifacts.invalid.length,
      missingUnicodeArtifacts: unicodeGeneratedArtifacts.missing.length,
      staleUnicodeArtifacts: unicodeGeneratedArtifacts.stale.length,
      orphanUnicodeArtifacts: unicodeGeneratedArtifacts.orphan.length,
      untrackedUnicodeArtifacts: unicodeGeneratedArtifacts.untracked.length,
      invalidUnicodeArtifacts: unicodeGeneratedArtifacts.invalid.length,
      largeFileSplitFailures: largeFileSplits.failureCount,
      schemaSourceMismatches: schemaSourceSync.mismatches.length,
      localOverrideIssues: localOverrides.failureCount,
    },
    categories: Object.fromEntries([...categoryCounts.entries()].sort()),
    modules: Object.fromEntries([...moduleCounts.entries()].sort()),
    missingModules: countsByModule(missing),
    featureCounts,
    duplicateGoIDs,
    duplicateTsIDs,
    orphanTsUnits,
    parseErrors,
    unitlessGoFiles,
    untrackedTsFiles,
    forbiddenTsFiles,
    generatedArtifacts,
    astGeneratedArtifacts,
    diagnosticsGeneratedArtifacts,
    bundledGeneratedArtifacts,
    unicodeGeneratedArtifacts,
    schemaSourceSync,
    localOverrides,
    largeFileSplits,
    missing: missing.slice(0, 500),
    stale: stale.slice(0, 500),
    excluded: excluded.slice(0, 500),
    rows,
  };
}

export function scanTsUnits(root) {
  if (!existsSync(root)) return { fileCount: 0, files: [], units: [] };

  const files = walk(root).filter((file) => file.endsWith(".ts"));
  const fileReports = [];
  const units = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const regex = /@tsgo-unit\s+({[^\n\r]+})/g;
    let match;
    let metadataCount = 0;
    while ((match = regex.exec(text)) !== null) {
      metadataCount++;
      try {
        const metadata = JSON.parse(match[1]);
        units.push({
          id: metadata.id,
          kind: metadata.kind,
          status: metadata.status,
          sigHash: metadata.sigHash,
          bodyHash: metadata.bodyHash,
          path: path.relative(repoRoot, file).split(path.sep).join("/"),
          metadata,
        });
        const overrideDocStart = text.lastIndexOf("/**", match.index);
        const overrideDocEnd = text.indexOf("*/", regex.lastIndex);
        if (overrideDocStart >= 0 && overrideDocEnd >= regex.lastIndex) {
          const doc = text.slice(overrideDocStart, overrideDocEnd);
          const overrideJson = extractTsgoOverrideJson(doc);
          if (overrideJson !== undefined) {
            try {
              units[units.length - 1].override = JSON.parse(overrideJson);
            } catch (error) {
              fail(`invalid @tsgo-override JSON in ${path.relative(repoRoot, file)}: ${error.message}`);
            }
          }
        }
        // Check if the first TS export after the JSDoc block throws TSGO_UNIMPLEMENTED.
        // We skip the JSDoc body (Go source) and only inspect the first export declaration's body.
        const afterPos = regex.lastIndex;
        const bigSnippet = text.slice(afterPos, afterPos + 50000);
        // Skip JSDoc: find */ then the next "export " keyword
        const docEnd = bigSnippet.indexOf('*/');
        const exportStart = docEnd >= 0 ? bigSnippet.indexOf('\nexport ', docEnd) : bigSnippet.indexOf('\nexport ');
        let hasUnimplThrow = false;
        if (exportStart >= 0) {
          // Find the first { that opens the body of this export
          const afterExport = bigSnippet.slice(exportStart, exportStart + 3000);
          const braceIdx = afterExport.indexOf('{');
          if (braceIdx >= 0) {
            let depth = 0, bodyEnd = -1;
            for (let j = braceIdx; j < Math.min(braceIdx + 2500, afterExport.length); j++) {
              if (afterExport[j] === '{') depth++;
              else if (afterExport[j] === '}') { depth--; if (depth === 0) { bodyEnd = j; break; } }
            }
            const body = bodyEnd >= 0 ? afterExport.slice(braceIdx, bodyEnd + 1) : afterExport.slice(braceIdx, braceIdx + 2500);
            hasUnimplThrow = body.includes('TSGO_UNIMPLEMENTED');
          }
        }
        units[units.length - 1].hasUnimplThrow = hasUnimplThrow;
      } catch (error) {
        fail(`invalid @tsgo-unit JSON in ${path.relative(repoRoot, file)}: ${error.message}`);
      }
    }
    fileReports.push({
      path: path.relative(repoRoot, file).split(path.sep).join("/"),
      metadataCount,
    });
  }
  return { fileCount: files.length, files: fileReports, units };
}

function extractTsgoOverrideJson(doc) {
  const marker = "@tsgo-override";
  const markerIndex = doc.indexOf(marker);
  if (markerIndex < 0) return undefined;

  const raw = doc.slice(markerIndex + marker.length);
  const cleaned = raw
    .split(/\r?\n/)
    .map((line, index) => (index === 0 ? line : line.replace(/^\s*\*\s?/, "")))
    .join("\n")
    .trimStart();
  const start = cleaned.indexOf("{");
  if (start < 0) return undefined;

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < cleaned.length; index++) {
    const ch = cleaned[index];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === "{") {
      depth++;
      continue;
    }
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        return cleaned.slice(start, index + 1);
      }
    }
  }
  return cleaned.slice(start);
}

export function emptyLocalOverrideStatus() {
  return {
    inline: 0,
    failureCount: 0,
    invalidInline: [],
    byCategory: {},
    byAllow: {},
    signatureUnits: [],
  };
}

export function buildLocalOverrideStatus(config, tsUnits) {
  if ((config.implementationOverrides ?? []).length > 0) {
    return {
      ...emptyLocalOverrideStatus(),
      failureCount: config.implementationOverrides.length,
      invalidInline: config.implementationOverrides.map((entry, index) => ({
        id: entry.id ?? "",
        path: "",
        reason: `central implementationOverrides[${index}] is banned; move the full metadata to local @tsgo-override`,
      })),
    };
  }
  const units = tsUnits.units ?? [];
  const invalidInline = [];
  const byCategory = new Map();
  const byAllow = new Map();
  const signatureUnits = [];
  const inlineUnits = units.filter((unit) => unit.override !== undefined);
  for (const unit of inlineUnits) {
    const issues = validateOverrideShape(unit.override);
    if (issues.length > 0) {
      invalidInline.push({
        id: unit.id,
        path: unit.path,
        reason: issues.join("; "),
      });
      continue;
    }
    increment(byCategory, unit.override.category);
    for (const allow of unit.override.allow) increment(byAllow, allow);
    if (unit.override.allow.includes("signature")) {
      signatureUnits.push({ id: unit.id, path: unit.path, category: unit.override.category, reason: unit.override.reason });
    }
  }
  return {
    inline: inlineUnits.length,
    failureCount: invalidInline.length,
    invalidInline,
    byCategory: Object.fromEntries([...byCategory.entries()].sort()),
    byAllow: Object.fromEntries([...byAllow.entries()].sort()),
    signatureUnits,
  };
}

function validateOverrideShape(value) {
  const issues = [];
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return ["override must be an object"];
  }
  if (typeof value.category !== "string" || value.category.trim() === "") {
    issues.push("category is required");
  }
  if (typeof value.reason !== "string" || value.reason.trim() === "") {
    issues.push("reason is required");
  }
  const allowed = new Set(["body", "signature"]);
  if (!Array.isArray(value.allow) || value.allow.length === 0 || value.allow.some((item) => !allowed.has(item))) {
    issues.push("allow must be a non-empty array containing only 'body' or 'signature'");
  }
  if (Array.isArray(value.allow) && value.allow.includes("signature")) {
    const hasFullSnapshots = value.goSignature !== undefined || value.tsSignature !== undefined;
    const hasHashSnapshots = value.goSignatureHash !== undefined || value.tsSignatureHash !== undefined;
    if (hasFullSnapshots && hasHashSnapshots) {
      issues.push("signature overrides must use either full snapshots or hash snapshots, never both");
    } else if (hasHashSnapshots) {
      const hashPattern = /^sha256:[0-9a-f]{64}$/;
      if (typeof value.goSignatureHash !== "string" || !hashPattern.test(value.goSignatureHash)) {
        issues.push("hashed signature overrides require an exact sha256 goSignatureHash");
      }
      if (typeof value.tsSignatureHash !== "string" || !hashPattern.test(value.tsSignatureHash)) {
        issues.push("hashed signature overrides require an exact sha256 tsSignatureHash");
      }
    } else {
      if (typeof value.goSignature !== "string" || value.goSignature.trim() === "") {
        issues.push("signature overrides require goSignature");
      }
      if (typeof value.tsSignature !== "string" || value.tsSignature.trim() === "") {
        issues.push("signature overrides require tsSignature");
      }
    }
  }
  return issues;
}
