import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  buildGeneratedSourceCoverageStatus,
  buildGlobalGeneratedArtifactStatus,
  generatedArtifactProviders,
  inspectGeneratedArtifactRegistration,
  renderGeneratedSourceCoverage,
} from "./generated-source.mjs";
import { walkGeneratedArtifactFiles } from "./generated-artifact-registry.mjs";

test("generated-source coverage becomes stale when artifact-owned declarations change", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-generated-coverage-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const config = { generatedSourceCoveragePath: "coverage.json" };
  const original = snapshotWithAstUnits([unit("A", "sig-a")]);
  writeFileSync(path.join(root, "coverage.json"), renderGeneratedSourceCoverage(original));
  assert.deepEqual(buildGeneratedSourceCoverageStatus(root, config, original).issues, []);

  const withHiddenBehavior = snapshotWithAstUnits([
    unit("A", "sig-a"),
    unit("NewDeclaration", "sig-b"),
  ]);
  assert.match(buildGeneratedSourceCoverageStatus(root, config, withHiddenBehavior).issues[0].reason, /stale/);
});

test("global generated-artifact registry reports uncovered registrations without duplicating provider defects", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-generated-artifacts-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const tsRoot = path.join(root, "src");
  mkdirSync(path.join(tsRoot, "unknown"), { recursive: true });
  mkdirSync(path.join(tsRoot, "go"), { recursive: true });
  mkdirSync(path.join(tsRoot, "internal/ast/generated"), { recursive: true });
  writeFileSync(path.join(tsRoot, "unknown", "output.ts"), [
    "// Code generated. DO NOT EDIT.",
    '// @tsgo-generated {"schemaVersion":1,"kind":"ast-generated","generator":"porter:ast","sourceRevision":"rev","path":"unknown/output.ts","contentHash":"x"}',
    "",
  ].join("\n"));
  writeFileSync(path.join(tsRoot, "go", "compat.ts"), [
    "// Code generated. DO NOT EDIT.",
    '// @tsgo-generated {"schemaVersion":1,"kind":"go-compat","generator":"wrong-generator","sourceRevision":"rev","path":"go/compat.ts","contentHash":"x"}',
    "",
    "export const hidden = undefined as never;",
  ].join("\n"));
  writeFileSync(path.join(tsRoot, "internal/ast/generated/bad.ts"), [
    "// Code generated. DO NOT EDIT.",
    "// @tsgo-generated {bad-json}",
    "",
  ].join("\n"));
  const artifactStatuses = Object.fromEntries(generatedArtifactProviders.map((provider) => [provider.statusKey, emptyArtifactStatus()]));
  const status = buildGlobalGeneratedArtifactStatus(root, { tsRoot: "src" }, artifactStatuses);
  assert.deepEqual(status.issues, [{
    path: "unknown/output.ts",
    reason: "generated artifact path has no registered provider; fix the registered generator output",
  }]);
});

test("generated artifact registration is exact and rejects duplicate ownership records", () => {
  const metadata = '// @tsgo-generated {"schemaVersion":1,"kind":"ast-generated","generator":"porter:ast","sourceRevision":"rev","path":"internal/ast/generated/types.ts","contentHash":"hash"}';
  const header = "// Code generated. DO NOT EDIT.";
  const exact = inspectGeneratedArtifactRegistration("internal/ast/generated/types.ts", `${header}\n${metadata}\nexport type Node = unknown;\n`);
  assert.equal(exact.provider.id, "porter:ast");
  assert.equal(exact.error, undefined);
  assert.match(inspectGeneratedArtifactRegistration("internal/ast/generated/types.ts", `${header}\n${metadata}\n${metadata}\n`).error, /exactly one/);
  assert.match(inspectGeneratedArtifactRegistration("internal/ast/generated/types.ts", `${metadata}\n`).error, /second line/);
  const malformed = inspectGeneratedArtifactRegistration("internal/ast/generated/types.ts", `${header}\n// @tsgo-generated {not-json}\n`);
  assert.equal(malformed.provider.id, "porter:ast");
  assert.match(malformed.error, /invalid @tsgo-generated JSON/);
  assert.match(inspectGeneratedArtifactRegistration("internal/ast/generated/other.ts", `${header}\n${metadata}\n`).error, /metadata path/);
});

test("generated artifact walker returns only TypeScript files in deterministic path order", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-generated-walker-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(path.join(root, "z/deep"), { recursive: true });
  mkdirSync(path.join(root, "a"), { recursive: true });
  writeFileSync(path.join(root, "z/deep/output.ts"), "");
  writeFileSync(path.join(root, "z/types.d.ts"), "");
  writeFileSync(path.join(root, "a/first.ts"), "");
  writeFileSync(path.join(root, "ignored.js"), "");

  assert.deepEqual(
    walkGeneratedArtifactFiles(root).map((file) => path.relative(root, file).split(path.sep).join("/")),
    ["a/first.ts", "z/deep/output.ts", "z/types.d.ts"],
  );
});

function snapshotWithAstUnits(units) {
  return {
    gitRevision: "a".repeat(40),
    files: [{
      path: "internal/ast/ast_generated.go",
      sourceHash: "source",
      generated: true,
      units,
    }],
  };
}

function unit(name, sigHash) {
  return {
    id: `m::internal/ast/ast_generated.go::func::${name}`,
    kind: "func",
    sigHash,
  };
}

function emptyArtifactStatus() {
  return { missing: [], stale: [], orphan: [], untracked: [], invalid: [] };
}
