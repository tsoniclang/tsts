import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  authoredFacadePathSet,
  buildGeneratedArtifactStatus,
  buildGeneratedSourcePolicyStatus,
  buildEmbeddedGoSourceUpdates,
  buildLocalOverrideStatus,
  buildExternalFacadeMap,
  buildLargeFileSplitStatus,
  buildSchemaSourceSyncStatus,
  buildStatus,
  collectSchemaSourceSyncFailures,
  collectLocalOverrideFailures,
  collectMechanicalPortRisks,
  collectVerifyFailures,
  expectedTsPath,
  matchGlob,
  policyFor,
  renderExpectedGeneratedArtifacts,
  renderExternalFacadeModules,
  renderStub,
  renderUnitGroup,
  renderStatusMarkdown,
  localTsName,
  repoRoot,
  resolveRepo,
  scanTsUnits,
  verifyStatus,
  validateTsgoUnitMetadata,
  validatePorterSnapshot,
  writeTextSafely,
} from "../porter.mjs";
import {
  buildAstGeneratedArtifactStatus,
  buildAstGeneratedFiles,
  buildGeneratedAstSkips,
  emitKinds,
  parseGoNodeDataMethods,
  parseGoFlagFile,
  writeAstGenerated,
} from "../ast-generator.mjs";
import { AstSchema } from "../ast-schema-model.mjs";
import {
  buildDiagnosticsGeneratedArtifactStatus,
  buildDiagnosticsGeneratedFiles,
  collectDiagnosticsArtifactFailures,
  emitLocalizedMessages,
  emitMessages,
  parseCatalog,
  writeDiagnosticsGenerated,
} from "../diagnostics-generator.mjs";
import {
  buildBundledGeneratedArtifactStatus,
  buildExpectedBundledArtifacts,
  collectBundledArtifactFailures,
  writeBundledGenerated,
} from "../../bundled/generate-bundled.mjs";
import { schemaPoliciesFromSourcePin } from "../source-pin.mjs";

import {
  baseConfig,
  channelType,
  emptyCounts,
  emptyGeneratedArtifacts,
  fileRecord,
  funcType,
  identType,
  instantiationType,
  interfaceType,
  mapType,
  pointerType,
  selectorType,
  sliceType,
  snapshotWith,
  testBodyHash,
  testSigHash,
  unitRecord,
} from "./helpers.mjs";

test("buildSchemaSourceSyncStatus flags schema-dir copies that drift from live source", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "porter-schemasync-"));
  try {
    // Fake source root + schema dir.
    const sourceRoot = path.join(dir, "src");
    const schemaDir = path.join(dir, "schema");
    mkdirSync(path.join(sourceRoot, "internal", "ast"), { recursive: true });
    mkdirSync(schemaDir, { recursive: true });
    writeFileSync(path.join(sourceRoot, "internal/ast/nodeflags.go"), "package ast\nconst A = 1\n");
    writeFileSync(path.join(sourceRoot, "internal/ast/symbolflags.go"), "package ast\nconst B = 2\n");
    // nodeflags copy matches; symbolflags copy drifts.
    writeFileSync(path.join(schemaDir, "nodeflags.go"), "package ast\nconst A = 1\n");
    writeFileSync(path.join(schemaDir, "symbolflags.go"), "package ast\nconst B = 999\n");

    const relSource = path.relative(repoRoot, sourceRoot).split(path.sep).join("/");
    const relSchema = path.relative(repoRoot, schemaDir).split(path.sep).join("/");
    const config = {
      sourceRoot: relSource,
      astSchemaDir: relSchema,
      schemaFilePolicies: [
        { path: `${relSchema}/nodeflags.go`, kind: "upstream-copy", source: "internal/ast/nodeflags.go" },
        { path: `${relSchema}/symbolflags.go`, kind: "upstream-copy", source: "internal/ast/symbolflags.go" },
      ],
    };
    const status = buildSchemaSourceSyncStatus(config);
    assert.equal(status.mismatches.length, 1, "only the drifted copy is flagged");
    assert.equal(status.mismatches[0].schema.endsWith("symbolflags.go"), true);
    assert.equal(collectSchemaSourceSyncFailures(status).length, 1);
    assert.match(collectSchemaSourceSyncFailures(status)[0], /symbolflags\.go/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("real porter config classifies every schema file and checks every upstream copy", () => {
  const config = JSON.parse(readFileSync(resolveRepo("packages/tsts/porter.config.json"), "utf8"));
  const policies = schemaPoliciesFromSourcePin(repoRoot, config);
  assert.deepEqual(
    policies.map((policy) => [policy.path, policy.kind, policy.source]).sort(),
    [
      ["packages/tsts/schema/tsgo/VERSION.md", "local-metadata", undefined],
      ["packages/tsts/schema/tsgo/source-pin.json", "local-metadata", undefined],
      ["packages/tsts/schema/tsgo/ast.json", "upstream-copy", "_scripts/ast.json"],
      ["packages/tsts/schema/tsgo/ast.schema.json", "upstream-copy", "_scripts/ast.schema.json"],
      ["packages/tsts/schema/tsgo/nodeflags.go", "upstream-copy", "internal/ast/nodeflags.go"],
      ["packages/tsts/schema/tsgo/protocol.ts", "upstream-copy", "_packages/native-preview/src/api/node/protocol.ts"],
      ["packages/tsts/schema/tsgo/symbolflags.go", "upstream-copy", "internal/ast/symbolflags.go"],
    ].sort(),
  );
  const status = buildSchemaSourceSyncStatus(config);
  assert.equal(status.classifiedFileCount, 7);
  assert.deepEqual(status.policyIssues, []);
});

test("buildSchemaSourceSyncStatus flags a missing live source file (upstream removed it)", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "porter-schemasync2-"));
  try {
    const schemaDir = path.join(dir, "schema");
    mkdirSync(schemaDir, { recursive: true });
    writeFileSync(path.join(schemaDir, "nodeflags.go"), "package ast\n");
    const relSchema = path.relative(repoRoot, schemaDir).split(path.sep).join("/");
    const config = {
      sourceRoot: path.relative(repoRoot, dir).split(path.sep).join("/"),
      astSchemaDir: relSchema,
      schemaFilePolicies: [{ path: `${relSchema}/nodeflags.go`, kind: "upstream-copy", source: "internal/ast/nodeflags.go" }],
    };
    const status = buildSchemaSourceSyncStatus(config);
    assert.equal(status.mismatches.length, 1);
    assert.match(status.mismatches[0].reason, /live source file is missing/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("buildSchemaSourceSyncStatus passes when copies are byte-identical, and ignores CRLF", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "porter-schemasync3-"));
  try {
    const sourceRoot = path.join(dir, "src");
    const schemaDir = path.join(dir, "schema");
    mkdirSync(path.join(sourceRoot, "internal", "ast"), { recursive: true });
    mkdirSync(schemaDir, { recursive: true });
    writeFileSync(path.join(sourceRoot, "internal/ast/nodeflags.go"), "package ast\nconst A = 1\n");
    writeFileSync(path.join(schemaDir, "nodeflags.go"), "package ast\r\nconst A = 1\r\n"); // CRLF variant
    const relSchema = path.relative(repoRoot, schemaDir).split(path.sep).join("/");
    const config = {
      sourceRoot: path.relative(repoRoot, sourceRoot).split(path.sep).join("/"),
      astSchemaDir: relSchema,
      schemaFilePolicies: [{ path: `${relSchema}/nodeflags.go`, kind: "upstream-copy", source: "internal/ast/nodeflags.go" }],
    };
    assert.equal(buildSchemaSourceSyncStatus(config).mismatches.length, 0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("buildSchemaSourceSyncStatus rejects unclassified, duplicate, missing, and out-of-directory schema policies", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "porter-schema-policy-"));
  try {
    const schemaDir = path.join(dir, "schema");
    mkdirSync(schemaDir, { recursive: true });
    writeFileSync(path.join(schemaDir, "ast.json"), "{}\n");
    writeFileSync(path.join(schemaDir, "extra.json"), "{}\n");
    const relSchema = path.relative(repoRoot, schemaDir).split(path.sep).join("/");
    const outside = path.relative(repoRoot, path.join(dir, "outside.json")).split(path.sep).join("/");
    const config = {
      sourceRoot: path.relative(repoRoot, dir).split(path.sep).join("/"),
      astSchemaDir: relSchema,
      schemaFilePolicies: [
        { path: `${relSchema}/ast.json`, kind: "local-metadata" },
        { path: `${relSchema}/ast.json`, kind: "local-metadata" },
        { path: `${relSchema}/missing.json`, kind: "local-metadata" },
        { path: outside, kind: "local-metadata" },
      ],
    };
    const status = buildSchemaSourceSyncStatus(config);
    assert.equal(status.policyIssues.some((issue) => /no explicit policy/.test(issue.reason) && issue.path.endsWith("extra.json")), true);
    assert.equal(status.policyIssues.some((issue) => /duplicate policies/.test(issue.reason)), true);
    assert.equal(status.policyIssues.some((issue) => /classified schema directory file is missing/.test(issue.reason)), true);
    assert.equal(status.policyIssues.some((issue) => /is outside/.test(issue.reason)), true);
    assert.equal(collectSchemaSourceSyncFailures(status).some((failure) => /schema file policy issues/.test(failure)), true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("collectVerifyFailures fails when schemaSourceSync has mismatches", () => {
  const status = {
    counts: { parseErrors: 0, duplicateGoIDs: 0, duplicateTsIDs: 0, orphan: 0, forbiddenTsFiles: 0, untrackedTsFiles: 0, stale: 0, missing: 0 },
    schemaSourceSync: { mismatches: [{ schema: "packages/tsts/schema/tsgo/symbolflags.go", source: "internal/ast/symbolflags.go", reason: "differs" }] },
    rows: [],
  };
  const failures = collectVerifyFailures(status, {});
  assert.equal(failures.some((f) => /schema\/source sync/.test(f)), true);
});

test("collectVerifyFailures hard-gates signature mismatches", () => {
  const status = {
    counts: { parseErrors: 0, duplicateGoIDs: 0, duplicateTsIDs: 0, orphan: 0, forbiddenTsFiles: 0, untrackedTsFiles: 0, stale: 0, missing: 0 },
    signatureCheck: { checked: 2, overriddenUnits: 0, mismatches: 2, byKind: { "param-type": 1, "alias-type": 1 } },
    rows: [],
  };
  assert.deepEqual(collectVerifyFailures(status, {}), ["2 signature/type mismatches (param-type=1, alias-type=1)"]);
});

test("collectVerifyFailures hard-gates JSON-tag mismatches separately from signature overrides", () => {
  const status = {
    counts: { parseErrors: 0, duplicateGoIDs: 0, duplicateTsIDs: 0, orphan: 0, forbiddenTsFiles: 0, untrackedTsFiles: 0, stale: 0, missing: 0 },
    signatureCheck: { checked: 1, overrideIssues: 0, mismatches: 0, byKind: {} },
    jsonTagCheck: { taggedUnits: 1, taggedFields: 2, fieldMapUnits: 1, fieldMapFields: 2, mismatches: 1, byKind: { "json-tag-field-drift": 1 } },
    rows: [],
  };
  assert.deepEqual(collectVerifyFailures(status, {}), ["1 Go struct JSON-tag mismatches (json-tag-field-drift=1)"]);
});
