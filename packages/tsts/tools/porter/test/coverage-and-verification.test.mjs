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

test("large-file split plans must cover every declaration exactly once", () => {
  const sourceMethod = unitRecord({
    id: "m::internal/checker/checker.go::method::Checker.checkSourceFile",
    kind: "method",
    name: "checkSourceFile",
    qualifiedName: "Checker.checkSourceFile",
    receiver: "Checker",
    goPath: "internal/checker/checker.go",
  });
  const typeMethod = unitRecord({
    id: "m::internal/checker/checker.go::method::Checker.getTypeOfNode",
    kind: "method",
    name: "getTypeOfNode",
    qualifiedName: "Checker.getTypeOfNode",
    receiver: "Checker",
    goPath: "internal/checker/checker.go",
  });
  const orphanMethod = unitRecord({
    id: "m::internal/checker/checker.go::method::Checker.resolveName",
    kind: "method",
    name: "resolveName",
    qualifiedName: "Checker.resolveName",
    receiver: "Checker",
    goPath: "internal/checker/checker.go",
  });
  const config = {
    ...baseConfig,
    largeFileSplitPlan: {
      schemaVersion: 1,
      files: {
        "internal/checker/checker.go": {
          targetRoot: "packages/tsts/src/internal/checker/checker",
          targets: [
            {
              file: "source-files.ts",
              description: "Source-file checking",
              declarations: ["method::Checker.checkSourceFile", "method::Checker.gone"],
            },
            {
              file: "types.ts",
              description: "Type queries",
              matchers: [{ kind: "method", receiver: "Checker", nameRegex: "^getType" }],
            },
            {
              file: "duplicate-types.ts",
              description: "Duplicate type queries",
              declarations: ["method::Checker.getTypeOfNode"],
            },
          ],
        },
      },
    },
  };
  const splitStatus = buildLargeFileSplitStatus(config, snapshotWith([fileRecord({
    path: "internal/checker/checker.go",
    lineCount: 6000,
    units: [sourceMethod, typeMethod, orphanMethod],
  })]));

  assert.equal(splitStatus.requiredFileCount, 1);
  assert.equal(splitStatus.files[0].assigned, 2);
  assert.equal(splitStatus.files[0].unassigned, 1);
  assert.ok(splitStatus.issues.some((issue) => issue.kind === "stale-declaration"));
  assert.ok(splitStatus.issues.some((issue) => issue.kind === "duplicate-assignment"));
  assert.ok(splitStatus.issues.some((issue) => issue.kind === "unassigned-declaration"));
  assert.deepEqual(
    collectVerifyFailures({ counts: { ...emptyCounts(), largeFileSplitFailures: splitStatus.failureCount }, generatedArtifacts: emptyGeneratedArtifacts() }, {}),
    [`${splitStatus.failureCount} large-file split plan failures`],
  );
});

test("large-file split plans reject random line/chunk target names", () => {
  const unit = unitRecord({
    id: "m::internal/parser/parser.go::func::ParseSourceFile",
    kind: "func",
    name: "ParseSourceFile",
    qualifiedName: "ParseSourceFile",
    goPath: "internal/parser/parser.go",
  });
  const splitStatus = buildLargeFileSplitStatus({
    ...baseConfig,
    largeFileSplitPlan: {
      schemaVersion: 1,
      files: {
        "internal/parser/parser.go": {
          targetRoot: "packages/tsts/src/internal/parser/parser",
          targets: [
            {
              file: "part-001.ts",
              description: "Invalid line-range style split",
              declarations: ["func::ParseSourceFile"],
            },
          ],
        },
      },
    },
  }, snapshotWith([fileRecord({ path: "internal/parser/parser.go", lineCount: 6000, units: [unit] })]));

  assert.ok(splitStatus.issues.some((issue) => issue.kind === "random-split-target"));
});

test("buildStatus excludes inactive LS/LSP/fourslash policies from active porter coverage", () => {
  const config = {
    ...baseConfig,
    largeFileSplitPlan: { schemaVersion: 1, files: {} },
    policies: [
      { match: "internal/ls/**", category: "out-of-scope", active: false, reason: "ls excluded" },
      { match: "internal/lsp/**", category: "out-of-scope", active: false, reason: "lsp excluded" },
      { match: "**/*fourslash*", category: "out-of-scope", active: false, reason: "fourslash excluded" },
    ],
  };
  const status = buildStatus(config, snapshotWith([
    fileRecord({
      path: "internal/ls/service.go",
      units: [unitRecord({
        id: "m::internal/ls/service.go::func::NewService",
        kind: "func",
        qualifiedName: "NewService",
        goPath: "internal/ls/service.go",
      })],
    }),
    fileRecord({
      path: "internal/lsp/server.go",
      units: [unitRecord({
        id: "m::internal/lsp/server.go::type::Server",
        kind: "type",
        qualifiedName: "Server",
        goPath: "internal/lsp/server.go",
      })],
    }),
  ]), { fileCount: 0, files: [], units: [] });

  assert.equal(status.counts.portable, 0);
  assert.equal(status.counts.excluded, 2);
  assert.equal(status.counts.missing, 0);
  assert.deepEqual(collectVerifyFailures(status, { "strict-port": true }), []);
});

test("buildStatus excludes exact inactive unit policies without counting their TS stubs", () => {
  const id = "m::internal/execute/tsc.go::func::fmtMain";
  const config = {
    ...baseConfig,
    unitPolicies: [
      {
        id,
        category: "out-of-scope",
        active: false,
        reason: "formatter command path excluded",
      },
    ],
  };
  const status = buildStatus(config, snapshotWith([
    fileRecord({
      path: "internal/execute/tsc.go",
      units: [unitRecord({
        id,
        kind: "func",
        qualifiedName: "fmtMain",
        goPath: "internal/execute/tsc.go",
        sigHash: "sig-1",
        bodyHash: "body-1",
      })],
    }),
  ]), {
    fileCount: 1,
    files: [{ path: "packages/tsts/src/internal/execute/tsc.ts", metadataCount: 1 }],
    units: [{
      id,
      kind: "func",
      path: "packages/tsts/src/internal/execute/tsc.ts",
      status: "stub",
      sigHash: "sig-1",
      bodyHash: "body-1",
    }],
  });

  assert.equal(status.counts.portable, 0);
  assert.equal(status.counts.excluded, 1);
  assert.equal(status.counts.stubbed, 0);
  assert.equal(status.counts.missing, 0);
  assert.equal(status.rows[0].status, "excluded");
  assert.equal(status.rows[0].reason, "formatter command path excluded");
  assert.deepEqual(collectVerifyFailures(status, { "strict-port": true }), [
    "1 stale or missing embedded Go source blocks (fmtMain)",
  ]);
});

test("buildStatus excludes generated and Go test units from production scaffold coverage", () => {
  const status = buildStatus(baseConfig, snapshotWith([
    fileRecord({
      path: "internal/ast/ast_generated.go",
      generated: true,
      units: [unitRecord({
        id: "m::internal/ast/ast_generated.go::type::Node",
        kind: "type",
        qualifiedName: "Node",
        goPath: "internal/ast/ast_generated.go",
      })],
    }),
    fileRecord({
      path: "internal/debug/debug_test.go",
      units: [unitRecord({
        id: "m::internal/debug/debug_test.go::func::TestDebug",
        kind: "func",
        qualifiedName: "TestDebug",
        goPath: "internal/debug/debug_test.go",
      })],
    }),
  ]), { fileCount: 0, files: [], units: [] });

  assert.equal(status.counts.portable, 0);
  assert.equal(status.counts.excluded, 2);
  assert.equal(status.counts.missing, 0);
  assert.deepEqual(collectVerifyFailures(status, { "strict-port": true }), []);
});

test("renderUnitGroup treats references to excluded LS/LSP types as opaque boundary types", () => {
  const config = {
    ...baseConfig,
    policies: [
      { match: "internal/ls/**", category: "out-of-scope", active: false, reason: "ls excluded" },
      { match: "internal/lsp/**", category: "out-of-scope", active: false, reason: "lsp excluded" },
    ],
  };
  const formatCodeSettings = unitRecord({
    id: "m::internal/ls/lsutil/formatcodeoptions.go::type::FormatCodeSettings",
    kind: "type",
    name: "FormatCodeSettings",
    qualifiedName: "FormatCodeSettings",
    goPath: "internal/ls/lsutil/formatcodeoptions.go",
    typeKind: "struct",
  });
  const withFormatCodeSettings = unitRecord({
    id: "m::internal/format/api.go::func::WithFormatCodeSettings",
    kind: "func",
    name: "WithFormatCodeSettings",
    qualifiedName: "WithFormatCodeSettings",
    goPath: "internal/format/api.go",
    parameters: [
      { names: ["options"], type: selectorType("lsutil", "FormatCodeSettings") },
    ],
  });
  const text = renderUnitGroup(
    config,
    snapshotWith([
      fileRecord({
        path: "internal/ls/lsutil/formatcodeoptions.go",
        importPath: "github.com/microsoft/typescript-go/internal/ls/lsutil",
        packageName: "lsutil",
        units: [formatCodeSettings],
      }),
      fileRecord({
        path: "internal/format/api.go",
        importPath: "github.com/microsoft/typescript-go/internal/format",
        packageName: "format",
        imports: [{ name: "lsutil", path: "github.com/microsoft/typescript-go/internal/ls/lsutil" }],
        units: [withFormatCodeSettings],
      }),
    ]),
    "packages/tsts/src/internal/format/api.ts",
    [withFormatCodeSettings],
  );

  assert.doesNotMatch(text, /from ".*internal\/ls/);
  assert.match(text, /import type \{ GoUnresolved \}/);
  assert.ok(text.includes('options: GoUnresolved<"github.com/microsoft/typescript-go/internal/ls/lsutil.FormatCodeSettings">'));
});

test("verifyStatus fails hard on coverage and metadata defects", () => {
  const status = {
    counts: {
      duplicateGoIDs: 1,
      duplicateTsIDs: 1,
      orphan: 1,
      forbiddenTsFiles: 1,
      untrackedTsFiles: 1,
      stale: 1,
      missing: 1,
    },
    generatedArtifacts: {
      missing: [{ path: "packages/tsts/src/go/compat.ts" }],
      stale: [{ path: "packages/tsts/src/go/io.ts" }],
      orphan: [{ path: "packages/tsts/src/go/old.ts" }],
      untracked: [{ path: "packages/tsts/src/go/manual.ts" }],
      invalid: [{ path: "packages/tsts/src/go/bad.ts" }],
      unresolved: [{ path: "packages/tsts/src/go/runtime.ts", symbol: "runtime.Future" }],
    },
  };
  assert.deepEqual(collectVerifyFailures(status, { "strict-port": true }), [
    "1 duplicate Go IDs",
    "1 duplicate TS IDs",
    "1 orphan TS units",
    "1 forbidden TS files",
    "1 TS files without @tsgo-unit metadata",
    "1 stale TS units",
    "1 missing generated artifacts",
    "1 stale generated artifacts",
    "1 orphan generated artifacts",
    "1 untracked generated artifacts",
    "1 invalid generated artifacts",
    "1 missing Go units",
    "1 unresolved generated facade obligations",
  ]);
});

test("strict verification rejects traceable stubs and generated runtime scaffolds", () => {
  const status = {
    counts: { ...emptyCounts(), stubbed: 4 },
    generatedArtifacts: {
      ...emptyGeneratedArtifacts(),
      unresolved: [{ path: "packages/tsts/src/go/example.ts", symbol: "example.Run" }],
    },
  };
  assert.deepEqual(collectVerifyFailures(status, { "strict-port": true }), [
    "4 stub Go units",
    "1 unresolved generated facade obligations",
  ]);
  assert.deepEqual(collectVerifyFailures(status, {}), []);
});
