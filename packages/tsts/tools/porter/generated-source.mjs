import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { compareText } from "./core/deterministic-order.mjs";
import { matchGlob } from "./path-policy.mjs";

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

export const generatedArtifactProviders = Object.freeze([
  artifactProvider("porter:facades", "generatedArtifacts", ["go/**"], ["go-scalars", "go-compat", "go-facade"]),
  artifactProvider("porter:ast", "astGeneratedArtifacts", ["internal/ast/generated/**"], ["ast-generated"]),
  artifactProvider("porter:diagnostics", "diagnosticsGeneratedArtifacts", ["internal/diagnostics/generated/**"], ["diagnostics-generated"]),
  artifactProvider("porter:bundled", "bundledGeneratedArtifacts", ["internal/bundled/*_generated.ts", "internal/bundled/libs/**"], ["bundled-generated"]),
  artifactProvider("porter:unicode", "unicodeGeneratedArtifacts", ["internal/stringutil/generated/**"], ["unicode-generated"]),
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

export function buildGeneratedSourceCoverage(snapshot, primaryUnitKinds) {
  const primaryKinds = new Set(primaryUnitKinds);
  const mechanisms = generatedSourceMechanisms.map((candidate) => {
    const files = (snapshot.files ?? [])
      .filter((file) => file.generated && candidate.patterns.some((pattern) => matchGlob(pattern, file.path)))
      .map((file) => {
        const units = (file.units ?? [])
          .filter((unit) => primaryKinds.has(unit.kind))
          .map((unit) => ({ id: unit.id, sigHash: unit.sigHash, bodyHash: unit.bodyHash }))
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

export function renderGeneratedSourceCoverage(snapshot, primaryUnitKinds) {
  return `${JSON.stringify(buildGeneratedSourceCoverage(snapshot, primaryUnitKinds), null, 2)}\n`;
}

export function buildGeneratedSourceCoverageStatus(repoRoot, config, snapshot) {
  const relativePath = config.generatedSourceCoveragePath ?? "packages/tsts/generated-source-coverage.json";
  const absolutePath = path.resolve(repoRoot, relativePath);
  const expected = renderGeneratedSourceCoverage(snapshot, config.primaryUnitKinds);
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

export function buildGlobalGeneratedArtifactStatus(repoRoot, config, artifactStatuses = undefined) {
  const issues = [];
  const tsRoot = path.resolve(repoRoot, config.tsRoot);
  for (const provider of generatedArtifactProviders) {
    if (artifactStatuses !== undefined && artifactStatuses[provider.statusKey] === undefined) {
      issues.push({ path: provider.id, reason: `artifact status provider '${provider.statusKey}' was not supplied` });
    }
  }
  for (const file of walkTypeScriptFiles(tsRoot)) {
    const text = readFileSync(file, "utf8");
    const matches = [...text.matchAll(/^\/\/ @tsgo-generated\s+({[^\n\r]+})/gm)];
    if (matches.length === 0) continue;
    const relative = path.relative(tsRoot, file).split(path.sep).join("/");
    if (matches.length !== 1) {
      issues.push({ path: relative, reason: `generated artifact must carry exactly one @tsgo-generated record, found ${matches.length}` });
      continue;
    }
    let metadata;
    try {
      metadata = JSON.parse(matches[0][1]);
    } catch (error) {
      issues.push({ path: relative, reason: `invalid @tsgo-generated JSON: ${error.message}` });
      continue;
    }
    const providers = generatedArtifactProviders.filter((provider) => provider.patterns.some((pattern) => matchGlob(pattern, relative)));
    if (providers.length !== 1) {
      issues.push({ path: relative, reason: providers.length === 0 ? "generated artifact path has no registered provider" : `generated artifact path matches ${providers.length} providers` });
      continue;
    }
    const [provider] = providers;
    if (metadata.generator !== provider.id) issues.push({ path: relative, provider: provider.id, reason: `metadata generator '${metadata.generator}' does not match provider '${provider.id}'; fix the registered generator output` });
    if (!provider.kinds.includes(metadata.kind)) issues.push({ path: relative, provider: provider.id, reason: `metadata kind '${metadata.kind}' is not registered for '${provider.id}'; fix the registered generator output` });
    if (metadata.path !== relative) issues.push({ path: relative, provider: provider.id, reason: `metadata path '${metadata.path}' does not match '${relative}'; fix the registered generator output` });
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

function artifactProvider(id, statusKey, patterns, kinds) {
  return Object.freeze({ id, statusKey, patterns: Object.freeze(patterns), kinds: Object.freeze(kinds) });
}

function walkTypeScriptFiles(root) {
  if (!existsSync(root)) return [];
  const files = [];
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.isFile() && entry.name.endsWith(".ts")) files.push(full);
    }
  }
  return files.sort();
}

function hashJson(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}
