import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  buildGeneratedSourceCoverageStatus,
  buildGlobalGeneratedArtifactStatus,
  renderGeneratedSourceCoverage,
} from "./generated-source.mjs";

test("generated-source coverage becomes stale when artifact-owned behavior changes", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-generated-coverage-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const config = { generatedSourceCoveragePath: "coverage.json", primaryUnitKinds: ["func"] };
  const original = snapshotWithAstUnits([unit("A", "sig-a", "body-a")]);
  writeFileSync(path.join(root, "coverage.json"), renderGeneratedSourceCoverage(original, config.primaryUnitKinds));
  assert.deepEqual(buildGeneratedSourceCoverageStatus(root, config, original).issues, []);

  const withHiddenBehavior = snapshotWithAstUnits([
    unit("A", "sig-a", "body-a"),
    unit("NewHiddenBehavior", "sig-b", "body-b"),
  ]);
  assert.match(buildGeneratedSourceCoverageStatus(root, config, withHiddenBehavior).issues[0].reason, /stale/);
});

test("global generated-artifact registry rejects unknown paths and provider metadata", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "tsts-generated-artifacts-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const tsRoot = path.join(root, "src");
  mkdirSync(path.join(tsRoot, "unknown"), { recursive: true });
  writeFileSync(path.join(tsRoot, "unknown", "output.ts"), [
    "// Code generated. DO NOT EDIT.",
    '// @tsgo-generated {"schemaVersion":1,"kind":"ast-generated","generator":"porter:ast","path":"unknown/output.ts","contentHash":"x"}',
    "",
  ].join("\n"));
  const status = buildGlobalGeneratedArtifactStatus(root, { tsRoot: "src" });
  assert.ok(status.issues.some((issue) => issue.reason.includes("no registered provider")));
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

function unit(name, sigHash, bodyHash) {
  return {
    id: `m::internal/ast/ast_generated.go::func::${name}`,
    kind: "func",
    sigHash,
    bodyHash,
  };
}
