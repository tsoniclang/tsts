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

test("matchGlob supports recursive and single-segment patterns", () => {
  assert.equal(matchGlob("internal/jsnum/**", "internal/jsnum/jsnum.go"), true);
  assert.equal(matchGlob("internal/jsnum/**", "internal/jsnum/sub/a.go"), true);
  assert.equal(matchGlob("**/*_test.go", "internal/debug/debug_test.go"), true);
  assert.equal(matchGlob("internal/*/debug.go", "internal/debug/nested/debug.go"), false);
  assert.equal(matchGlob("internal/*/debug.go", "internal/foo/debug.go"), true);
});

test("@tsgo-unit metadata is exact and cannot fail open", () => {
  const valid = {
    id: "m::internal/a.go::func::Run",
    kind: "func",
    status: "implemented",
    sigHash: "a".repeat(64),
    bodyHash: "b".repeat(64),
  };
  assert.deepEqual(validateTsgoUnitMetadata(valid), []);
  for (const mutation of [
    { ...valid, status: undefined },
    { ...valid, sigHash: undefined },
    { ...valid, bodyHash: "short" },
    { ...valid, kind: "method" },
    { ...valid, extra: true },
  ]) {
    assert.notDeepEqual(validateTsgoUnitMetadata(mutation), []);
  }
});

test("extractor snapshots reject schema drift, unknown units, parse errors, and count drift", () => {
  const config = { ...baseConfig, sourceRoot: ".temp/source-fixture", goModulePath: "m" };
  const sourceRoot = path.resolve(repoRoot, config.sourceRoot).split(path.sep).join("/");
  const unit = unitRecord({
    id: "m::internal/a.go::func::Run",
    goPath: "internal/a.go",
    sigHash: testSigHash,
    bodyHash: testBodyHash,
  });
  const file = fileRecord({
    path: "internal/a.go",
    importPath: "m/internal",
    sourceHash: "c".repeat(64),
    gitBlobHash: "d".repeat(40),
    buildTags: [],
    implicitBuildTags: [],
    imports: [],
    nodeKindCounts: {},
    units: [unit],
  });
  const snapshot = {
    schemaVersion: 2,
    sourceRoot,
    modulePath: "m",
    gitRevision: "e".repeat(40),
    environment: { goVersion: "go1.26.4", goos: "linux", goarch: "amd64" },
    summary: {
      fileCount: 1,
      goFileCount: 1,
      generatedFiles: 0,
      lineCount: 10,
      unitCount: 1,
      unitKindCounts: { func: 1 },
      nodeKindCounts: {},
      buildTagCounts: {},
      packageCounts: { debug: 1 },
      importPathCount: 1,
    },
    files: [file],
  };
  assert.deepEqual(validatePorterSnapshot(snapshot, config), []);
  assert.match(validatePorterSnapshot({ ...snapshot, schemaVersion: 3 }, config)[0], /schemaVersion/);
  assert.ok(validatePorterSnapshot({ ...snapshot, files: [{ ...file, imports: [{ name: "x", packageName: "x", path: "example/x", resolutionError: "", futureField: true }] }] }, config).some((issue) => issue.includes("futureField")));
  assert.ok(validatePorterSnapshot({ ...snapshot, files: [{ ...file, units: [{ ...unit, kind: "futureDecl" }] }] }, config).some((issue) => issue.includes("unknown")));
  assert.ok(validatePorterSnapshot({ ...snapshot, files: [{ ...file, parseError: "broken" }] }, config).some((issue) => issue.includes("parse error")));
  assert.ok(validatePorterSnapshot({ ...snapshot, summary: { ...snapshot.summary, unitCount: 0 } }, config).some((issue) => issue.includes("unitCount")));
});

test("repeated Go declarations receive distinct deterministic TypeScript owners", () => {
  assert.equal(localTsName(unitRecord({ id: "m::a.go::func::init", name: "init" })), "init");
  assert.equal(localTsName(unitRecord({ id: "m::a.go::func::init::#2", name: "init" })), "init__2");
});

test("policyFor applies explicit generated dispositions and overrides before default literal ports", () => {
  assert.equal(policyFor(baseConfig, "internal/jsnum/jsnum.go", false).category, "manual-required");
  assert.equal(policyFor(baseConfig, "internal/debug/debug_test.go", false).category, "test");
  assert.equal(policyFor(baseConfig, "internal/ast/ast_generated.go", true).category, "generated-artifact");
  assert.equal(policyFor(baseConfig, "internal/ast/unclassified_generated.go", true).category, "unclassified-generated");
  assert.equal(policyFor(baseConfig, "internal/debug/debug.go", false).category, "literal-port");
});

test("generated source mechanisms fail on missing, ambiguous, stale, and non-generated matches", () => {
  const snapshot = {
    files: [
      { path: "internal/a_generated.go", generated: true, units: [] },
      { path: "internal/b_generated.go", generated: true, units: [] },
      { path: "internal/plain.go", generated: false, units: [] },
    ],
  };
  const status = buildGeneratedSourcePolicyStatus(snapshot, {
    mechanisms: [
      { id: "tracked", mode: "tracked", category: "literal-port", active: true, patterns: ["internal/a_generated.go"], reason: "track it" },
      { id: "duplicate", mode: "tracked", category: "literal-port", active: true, patterns: ["internal/a_*"], reason: "duplicate" },
      { id: "wrong", mode: "artifact", category: "generated-artifact", active: false, statusKey: "wrong", patterns: ["internal/plain.go"], reason: "wrong" },
      { id: "stale", mode: "artifact", category: "generated-artifact", active: false, statusKey: "stale", patterns: ["internal/stale_generated.go"], reason: "stale" },
    ],
  });

  assert.equal(status.relevantFileCount, 2);
  assert.ok(status.issues.some((issue) => issue.path === "internal/a_generated.go" && issue.reason.includes("2 registered mechanisms")));
  assert.ok(status.issues.some((issue) => issue.path === "internal/b_generated.go" && issue.reason.includes("no registered mechanism")));
  assert.ok(status.issues.some((issue) => issue.path === "internal/plain.go" && issue.reason.includes("non-generated")));
  assert.ok(status.issues.some((issue) => issue.path === "stale" && issue.reason.includes("matches no")));
});

test("policyFor lets explicit inactive policies exclude generated LS/LSP files", () => {
  const policy = policyFor({
    ...baseConfig,
    policies: [
      { match: "internal/lsp/**", category: "out-of-scope", active: false, reason: "lsp excluded" },
    ],
  }, "internal/lsp/lsproto/lsp_generated.go", true);

  assert.equal(policy.category, "out-of-scope");
  assert.equal(policy.active, false);
});

test("expectedTsPath uses semantic large-file split plans without repeating source path metadata", () => {
  const unit = unitRecord({
    id: "m::internal/checker/checker.go::method::Checker.checkSourceFile",
    kind: "method",
    qualifiedName: "Checker.checkSourceFile",
    goPath: "internal/checker/checker.go",
  });
  const snapshot = snapshotWith([fileRecord({
    path: "internal/checker/checker.go",
    lineCount: 6000,
    units: [unit],
  })]);
  const config = {
    ...baseConfig,
    largeFileSplitPlan: {
      schemaVersion: 1,
      files: {
        "internal/checker/checker.go": {
          targetRoot: "packages/tsts/src/internal/checker/checker",
          reason: "test semantic split plan",
          targets: [
            {
              file: "source-files.ts",
              description: "Source-file checking methods",
              declarations: ["method::Checker.checkSourceFile"],
            },
          ],
        },
      },
    },
  };
  const splitStatus = buildLargeFileSplitStatus(config, snapshot);
  assert.equal(
    expectedTsPath(config, unit, splitStatus),
    "packages/tsts/src/internal/checker/checker/source-files.ts",
  );
});

test("buildStatus reports missing, stale, orphan, parse-error, unitless, and untracked TS files", () => {
  const snapshot = snapshotWith([
    fileRecord({
      path: "internal/debug/debug.go",
      units: [unitRecord({
        id: "m::internal/debug/debug.go::func::Fail",
        kind: "func",
        qualifiedName: "Fail",
        goPath: "internal/debug/debug.go",
        sigHash: "sig-1",
        bodyHash: "body-1",
      })],
    }),
    fileRecord({
      path: "internal/core/doc.go",
      units: [],
    }),
    fileRecord({
      path: "internal/bad/bad.go",
      units: [],
      parseError: "expected declaration",
    }),
  ]);
  const status = buildStatus(baseConfig, snapshot, {
    fileCount: 2,
    files: [
      { path: "packages/tsts/src/internal/debug/debug.ts", metadataCount: 1 },
      { path: "packages/tsts/src/internal/debug/helper.ts", metadataCount: 0 },
      { path: "packages/tsts/src/internal/ls/service.ts", metadataCount: 1 },
    ],
    units: [
      {
        id: "m::internal/debug/debug.go::func::Fail",
        path: "packages/tsts/src/internal/debug/debug.ts",
        status: "implemented",
        sigHash: "sig-1",
        bodyHash: "old-body",
      },
      {
        id: "m::internal/debug/debug.go::func::Gone",
        path: "packages/tsts/src/internal/debug/debug.ts",
        status: "implemented",
        sigHash: "sig",
        bodyHash: "body",
      },
    ],
  });

  assert.equal(status.counts.portable, 1);
  assert.equal(status.counts.stale, 1);
  assert.equal(status.counts.orphan, 1);
  assert.equal(status.counts.parseErrors, 1);
  assert.equal(status.counts.unitlessGoFiles, 1);
  assert.equal(status.counts.untrackedTsFiles, 1);
  assert.equal(status.counts.forbiddenTsFiles, 1);
  assert.match(renderStatusMarkdown(status), /Coverage Diagnostics/);
});

test("renderStatusMarkdown reports largest missing modules from missing rows only", () => {
  const snapshot = snapshotWith([
    fileRecord({
      path: "internal/checker/checker.go",
      units: [unitRecord({
        id: "m::internal/checker/checker.go::func::Implemented",
        kind: "func",
        qualifiedName: "Implemented",
        goPath: "internal/checker/checker.go",
        sigHash: "sig-1",
        bodyHash: "body-1",
      })],
    }),
    fileRecord({
      path: "internal/parser/parser.go",
      units: [unitRecord({
        id: "m::internal/parser/parser.go::func::Missing",
        kind: "func",
        qualifiedName: "Missing",
        goPath: "internal/parser/parser.go",
        sigHash: "sig-2",
        bodyHash: "body-2",
      })],
    }),
  ]);
  const status = buildStatus(baseConfig, snapshot, {
    fileCount: 1,
    files: [{ path: "packages/tsts/src/internal/checker/checker.ts", metadataCount: 1 }],
    units: [{
      id: "m::internal/checker/checker.go::func::Implemented",
      path: "packages/tsts/src/internal/checker/checker.ts",
      status: "implemented",
      sigHash: "sig-1",
      bodyHash: "body-1",
    }],
  });
  const markdown = renderStatusMarkdown(status);

  assert.match(markdown, /\| internal\/parser \| 1 \|/);
  assert.doesNotMatch(markdown, /\| internal\/checker \| 1 \|/);
});
