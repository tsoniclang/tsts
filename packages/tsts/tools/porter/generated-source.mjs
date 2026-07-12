import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { compareText } from "./core/deterministic-order.mjs";
import { isSemanticPrimaryUnitKind } from "./core/unit-kinds.mjs";
import {
  generatedArtifactProviders,
  inspectGeneratedArtifactRegistration,
  walkExactRegularFiles,
} from "./generated-artifact-registry.mjs";
import { matchGlob } from "./path-policy.mjs";

export { generatedArtifactProviders, inspectGeneratedArtifactRegistration } from "./generated-artifact-registry.mjs";

export const generatedSourceMechanisms = Object.freeze([
  mechanism({
    id: "porter:ast",
    mode: "artifact",
    statusKey: "astGeneratedArtifacts",
    patterns: [
      "internal/ast/ast_generated.go",
      "internal/ast/kind_generated.go",
      "internal/ast/kind_stringer_generated.go",
    ],
    reason: "AST behavior is regenerated and byte-verified from the pinned TS-Go AST schema by porter:ast.",
  }),
  mechanism({
    id: "porter:bundled",
    mode: "artifact",
    statusKey: "bundledGeneratedArtifacts",
    patterns: ["internal/bundled/embed_generated.go", "internal/bundled/libs_generated.go"],
    reason: "Bundled indexes are regenerated and byte-verified from the pinned TS-Go bundled inputs.",
  }),
  mechanism({
    id: "porter:diagnostics",
    mode: "artifact",
    statusKey: "diagnosticsGeneratedArtifacts",
    patterns: ["internal/diagnostics/diagnostics_generated.go", "internal/diagnostics/loc_generated.go"],
    reason: "Diagnostic catalogs are regenerated and byte-verified from the pinned TS-Go diagnostic inputs.",
  }),
  mechanism({
    id: "porter:unicode",
    mode: "artifact",
    statusKey: "unicodeGeneratedArtifacts",
    patterns: ["internal/stringutil/identifier_parts_generated.go", "internal/stringutil/js_case_generated.go"],
    reason: "Unicode tables are regenerated from pinned Unicode data and deeply compared with the vendored TS-Go tables.",
  }),
  mechanism({
    id: "tracked-generated-port",
    mode: "tracked",
    patterns: [
      "internal/checker/stringer_generated.go",
      "internal/core/*_stringer_generated.go",
      "internal/diagnostics/stringer_generated.go",
      "internal/vfs/vfsmatch/stringer_generated.go",
      "internal/vfs/vfsmock/mock_generated.go",
    ],
    reason: "Generated runtime behavior remains an active mechanical port with exact @tsgo-unit ownership.",
  }),
]);

export function generatedSourceMechanismMatches(sourcePath, mechanisms = generatedSourceMechanisms) {
  return mechanisms.filter((candidate) => candidate.patterns.some((pattern) => matchGlob(pattern, sourcePath)));
}

export function generatedSourcePolicyForPath(sourcePath, mechanisms = generatedSourceMechanisms) {
  const matches = generatedSourceMechanismMatches(sourcePath, mechanisms);
  if (matches.length !== 1) {
    return {
      category: matches.length === 0 ? "unclassified-generated" : "ambiguous-generated",
      active: false,
      reason: matches.length === 0
        ? "Generated Go source has no registered mechanism."
        : "Generated Go source matches more than one registered mechanism.",
    };
  }
  const [candidate] = matches;
  return {
    category: candidate.category,
    active: candidate.active,
    mechanism: candidate.id,
    reason: candidate.reason,
  };
}

export function buildGeneratedSourcePolicyStatus(snapshot, options = {}) {
  const issues = [];
  const isInactive = options.isInactive ?? (() => false);
  const mechanisms = options.mechanisms ?? generatedSourceMechanisms;
  const artifactStatuses = options.artifactStatuses;
  const requireAllMechanisms = options.requireAllMechanisms !== false;
  const relevantFiles = (snapshot.files ?? []).filter((file) => file.generated && !isInactive(file.path));
  const relevantPaths = new Set(relevantFiles.map((file) => file.path));

  for (const file of relevantFiles) {
    const matches = generatedSourceMechanismMatches(file.path, mechanisms);
    if (matches.length === 0) issues.push({ path: file.path, reason: "generated Go file has no registered mechanism" });
    else if (matches.length > 1) issues.push({ path: file.path, reason: `generated Go file matches ${matches.length} registered mechanisms` });
  }
  for (const candidate of mechanisms) {
    const matched = relevantFiles.filter((file) => candidate.patterns.some((pattern) => matchGlob(pattern, file.path)));
    if (requireAllMechanisms && matched.length === 0) issues.push({ path: candidate.id, reason: "registered generated-source mechanism matches no in-scope generated Go file" });
    for (const file of snapshot.files ?? []) {
      if (relevantPaths.has(file.path) || isInactive(file.path)) continue;
      if (!file.generated && candidate.patterns.some((pattern) => matchGlob(pattern, file.path))) {
        issues.push({ path: file.path, reason: `generated-source mechanism '${candidate.id}' matches non-generated in-scope Go source` });
      }
    }
    if (candidate.mode === "artifact" && typeof candidate.statusKey !== "string") {
      issues.push({ path: candidate.id, reason: "artifact mechanism has no registered artifact status provider" });
    }
    if (candidate.mode === "artifact" && artifactStatuses !== undefined && artifactStatuses[candidate.statusKey] === undefined) {
      issues.push({ path: candidate.id, reason: `artifact status provider '${candidate.statusKey}' was not supplied` });
    }
    if (candidate.mode === "tracked" && (candidate.category !== "literal-port" || candidate.active !== true)) {
      issues.push({ path: candidate.id, reason: "tracked mechanism must be an active literal-port" });
    }
  }

  return { issues, relevantFileCount: relevantFiles.length, mechanismCount: mechanisms.length };
}

export function buildGeneratedSourceCoverage(snapshot) {
  const mechanisms = generatedSourceMechanisms.map((candidate) => {
    const files = (snapshot.files ?? [])
      .filter((file) => file.generated && candidate.patterns.some((pattern) => matchGlob(pattern, file.path)))
      .map((file) => {
        const units = (file.units ?? [])
          .filter((unit) => isSemanticPrimaryUnitKind(unit.kind))
          .map((unit) => ({ id: unit.id, sigHash: unit.sigHash }))
          .sort((left, right) => compareText(left.id, right.id));
        return {
          path: file.path,
          sourceHash: file.sourceHash,
          primaryUnitCount: units.length,
          unitCoverageHash: hashJson(units),
        };
      })
      .sort((left, right) => compareText(left.path, right.path));
    return {
      id: candidate.id,
      mode: candidate.mode,
      statusKey: candidate.statusKey,
      files,
      coverageHash: hashJson(files),
    };
  });
  return {
    schemaVersion: 1,
    sourceRevision: snapshot.gitRevision,
    mechanisms,
    coverageHash: hashJson(mechanisms),
  };
}

export function renderGeneratedSourceCoverage(snapshot) {
  return `${JSON.stringify(buildGeneratedSourceCoverage(snapshot), null, 2)}\n`;
}

export function buildGeneratedSourceCoverageStatus(repoRoot, config, snapshot) {
  const relativePath = config.generatedSourceCoveragePath ?? "packages/tsts/generated-source-coverage.json";
  const absolutePath = path.resolve(repoRoot, relativePath);
  const expected = renderGeneratedSourceCoverage(snapshot);
  if (!existsSync(absolutePath)) {
    return { issues: [{ path: relativePath, reason: "generated-source coverage evidence is missing" }], expected };
  }
  const actual = readFileSync(absolutePath, "utf8");
  return {
    issues: actual === expected ? [] : [{ path: relativePath, reason: "generated-source coverage evidence is stale" }],
    expected,
  };
}

export function collectGeneratedSourceCoverageFailures(status) {
  return status.issues.length === 0 ? [] : [`${status.issues.length} generated-source coverage evidence issues`];
}

export function buildGlobalGeneratedArtifactStatus(repoRoot, config) {
  const issues = [];
  const tsRoot = path.resolve(repoRoot, config.tsRoot);
  for (const file of walkExactRegularFiles(tsRoot)) {
    const text = readFileSync(file, "utf8");
    const relative = path.relative(tsRoot, file).split(path.sep).join("/");
    const registration = inspectGeneratedArtifactRegistration(relative, text);
    if (registration.error !== undefined) {
      issues.push({ path: relative, reason: `${registration.error}; fix the registered generator output` });
      continue;
    }
    if (registration.metadata !== undefined) continue;
    if (/^\/\/ Code generated[^\n\r]*(?:\r?\n|$)/.test(text)) {
      issues.push({ path: relative, reason: "generated-file header has no exact @tsgo-generated registration; fix the registered generator output" });
    }
  }
  return { issues, providerCount: generatedArtifactProviders.length };
}

export function collectGlobalGeneratedArtifactFailures(status) {
  return status.issues.length === 0 ? [] : [`${status.issues.length} global generated-artifact registry issues`];
}

function mechanism(input) {
  const tracked = input.mode === "tracked";
  return Object.freeze({
    ...input,
    category: tracked ? "literal-port" : "generated-artifact",
    active: tracked,
    patterns: Object.freeze([...input.patterns]),
  });
}

function hashJson(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}
