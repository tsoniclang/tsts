import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  authoredFacadePathSet,
  buildGeneratedArtifactStatus,
  buildGeneratedSourcePolicyStatus,
  buildLocalOverrideStatus,
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
import { finalizeGeneratedFacadeFixtureCatalog } from "./external-facade-fixtures.mjs";
import {
  buildAstGeneratedArtifactStatus,
  buildAstGeneratedFiles,
  buildGeneratedAstSkips,
  emitKinds,
  parseGoNodeDataMethods,
  parseGoFlagFile,
  writeAstGenerated,
} from "../ast-generator.mjs";
import { semanticDeclarationVariantsHash } from "../core/semantic-declaration-hash.mjs";
import { emptyGeneratedDeclarationOwnerCatalog } from "../core/generated-declaration-owner-catalog.mjs";
import { buildSemanticTypeCatalog } from "../core/type-storage-policies.mjs";
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
  completeDeclarationAuditStatus,
  completeVerificationStatus,
  emptyCounts,
  emptyLargeFileSplitStatus,
  emptyVerificationEvidence,
  fileRecord,
  funcType,
  identType,
  instantiationType,
  interfaceType,
  mapType,
  pointerType,
  semanticFunctionDeclaration,
  selectorType,
  sliceType,
  snapshotWith,
  testSigHash,
  tsUnitRecord,
  unitRecord,
} from "./helpers.mjs";


test("buildStatus excludes inactive LS/LSP/fourslash policies from active porter coverage", () => {
  const config = {
    ...baseConfig,
    policies: [
      { match: "internal/ls/**", category: "out-of-scope", reason: "ls excluded" },
      { match: "internal/lsp/**", category: "out-of-scope", reason: "lsp excluded" },
      { match: "**/*fourslash*", category: "out-of-scope", reason: "fourslash excluded" },
    ],
  };
  const status = buildStatus({
    config,
    snapshot: snapshotWith([
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
    ]),
    tsUnits: { fileCount: 0, files: [], units: [] },
    ...emptyVerificationEvidence(),
  });

  assert.equal(status.counts.portable, 0);
  assert.equal(status.counts.excluded, 2);
  assert.equal(status.counts.missing, 0);
  Object.assign(status, completeDeclarationAuditStatus());
  assert.deepEqual(collectVerifyFailures(status), []);
});

test("buildStatus excludes exact inactive unit policies without counting their TS stubs", () => {
  const id = "m::internal/execute/tsc.go::func::fmtMain";
  const config = {
    ...baseConfig,
    unitPolicies: [
      {
        id,
        category: "out-of-scope",
        reason: "formatter command path excluded",
      },
    ],
  };
  const status = buildStatus({
    config,
    snapshot: snapshotWith([
      fileRecord({
        path: "internal/execute/tsc.go",
        units: [unitRecord({
          id,
          kind: "func",
          qualifiedName: "fmtMain",
          goPath: "internal/execute/tsc.go",
          sigHash: testSigHash,
        })],
      }),
    ]),
    tsUnits: {
      fileCount: 1,
      files: [{ path: "packages/tsts/src/internal/execute/tsc.ts", metadataCount: 1 }],
      units: [tsUnitRecord({
        id,
        kind: "func",
        path: "packages/tsts/src/internal/execute/tsc.ts",
        status: "stub",
        sigHash: testSigHash,
      })],
    },
    ...emptyVerificationEvidence(),
  });

  assert.equal(status.counts.portable, 0);
  assert.equal(status.counts.excluded, 1);
  assert.equal(status.counts.stubbed, 0);
  assert.equal(status.counts.missing, 0);
  assert.equal(status.rows[0].status, "excluded");
  assert.equal(status.rows[0].reason, "formatter command path excluded");
  Object.assign(status, completeDeclarationAuditStatus());
  assert.deepEqual(collectVerifyFailures(status), []);
});

test("buildStatus excludes generated and Go test units from production scaffold coverage", () => {
  const status = buildStatus({
    config: baseConfig,
    snapshot: snapshotWith([
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
    ]),
    tsUnits: { fileCount: 0, files: [], units: [] },
    ...emptyVerificationEvidence(),
  });

  assert.equal(status.counts.portable, 0);
  assert.equal(status.counts.excluded, 2);
  assert.equal(status.counts.missing, 0);
  Object.assign(status, completeDeclarationAuditStatus());
  assert.deepEqual(collectVerifyFailures(status), []);
});

test("renderUnitGroup requires explicit storage for excluded source-boundary types", () => {
  const config = {
    ...baseConfig,
    policies: [
      { match: "internal/ls/**", category: "out-of-scope", reason: "ls excluded" },
      { match: "internal/lsp/**", category: "out-of-scope", reason: "lsp excluded" },
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
  const sourceBoundaryPackage = "github.com/microsoft/typescript-go/internal/ls/lsutil";
  const sourceBoundaryObjectId = `${sourceBoundaryPackage}::type::FormatCodeSettings`;
  const sourceBoundaryObject = {
    id: sourceBoundaryObjectId,
    name: "FormatCodeSettings",
    packagePath: sourceBoundaryPackage,
    exported: true,
    type: { kind: "named", nilable: false, reference: { objectId: sourceBoundaryObjectId, packagePath: sourceBoundaryPackage, name: "FormatCodeSettings", typeArgs: [] } },
  };
  const sourceBoundaryDeclaration = {
    kind: "type",
    packagePath: sourceBoundaryPackage,
    object: sourceBoundaryObject,
    type: {
      alias: false,
      object: sourceBoundaryObject,
      typeParameters: [],
      rhs: { kind: "struct", nilable: false, struct: { fields: [] } },
      methodSurface: "complete",
      methods: [],
      valueMethodSet: [],
      pointerMethodSet: [],
    },
    profiles: [0],
  };
  formatCodeSettings.semantic = [sourceBoundaryDeclaration];
  const withFormatCodeSettings = unitRecord({
    id: "m::internal/format/api.go::func::WithFormatCodeSettings",
    kind: "func",
    name: "WithFormatCodeSettings",
    qualifiedName: "WithFormatCodeSettings",
    goPath: "internal/format/api.go",
    parameters: [
      { names: ["options"], type: selectorType("lsutil", "FormatCodeSettings") },
    ],
    semantic: semanticFunctionDeclaration({
      name: "WithFormatCodeSettings",
      packagePath: "github.com/microsoft/typescript-go/internal/format",
      parameters: [{ names: ["options"], type: selectorType("lsutil", "FormatCodeSettings") }],
      packages: { lsutil: "github.com/microsoft/typescript-go/internal/ls/lsutil" },
    }),
  });
  const snapshot = snapshotWith([
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
    ]);
  snapshot.semantic.dependencyTypeDeclarations = [sourceBoundaryDeclaration];
  assert.throws(
    () => finalizeGeneratedFacadeFixtureCatalog(config, snapshot),
    /requires an explicit go-type-storage relation/,
  );

  const mapped = {
    ...config,
    semanticRelations: [{
      kind: "go-type-storage",
      objectId: sourceBoundaryObjectId,
      storageIdentity: "packages/tsts/src/internal/format/source-boundaries.ts::FormatCodeSettings",
      goDeclarationHash: semanticDeclarationVariantsHash(buildSemanticTypeCatalog(snapshot).get(sourceBoundaryObjectId)),
      tsDeclarationHash: "0".repeat(64),
      reason: "The test pins an excluded source-boundary Go type to one exact reviewed TypeScript declaration.",
    }],
  };
  const text = renderUnitGroup(
    mapped,
    snapshot,
    "packages/tsts/src/internal/format/api.ts",
    [withFormatCodeSettings],
    { externalFacadeCatalog: finalizeGeneratedFacadeFixtureCatalog(mapped, snapshot), generatedDeclarationOwners: emptyGeneratedDeclarationOwnerCatalog(mapped, snapshot), largeFileSplits: emptyLargeFileSplitStatus() },
  );
  assert.match(text, /import type \{ FormatCodeSettings \} from "\.\/source-boundaries\.js";/);
  assert.match(text, /options: FormatCodeSettings/);
  assert.doesNotMatch(text, /GoUnresolved/);
});

test("verifyStatus fails hard on coverage and metadata defects", () => {
  const staleRow = { id: "stale", status: "stale" };
  const missingRow = { id: "missing", status: "missing" };
  const status = completeVerificationStatus({
    counts: {
      ...emptyCounts(), portable: 2, duplicateGoIDs: 1, duplicateTsIDs: 1, orphan: 1, forbiddenTsFiles: 1,
      untrackedTsFiles: 1, stale: 1, missing: 1,
      missingGeneratedArtifacts: 1, staleGeneratedArtifacts: 1, orphanGeneratedArtifacts: 1,
      untrackedGeneratedArtifacts: 1, invalidGeneratedArtifacts: 1,
    },
    duplicateGoIDs: ["duplicate-go"],
    duplicateTsIDs: ["duplicate-ts"],
    orphanTsUnits: [{ id: "orphan", path: "packages/tsts/src/orphan.ts", status: "implemented" }],
    forbiddenTsFiles: [{ path: "packages/tsts/src/forbidden.ts", reason: "forbidden" }],
    untrackedTsFiles: [{ path: "packages/tsts/src/untracked.ts", reason: "untracked" }],
    stale: [staleRow],
    missing: [missingRow],
    rows: [staleRow, missingRow],
    categories: { "literal-port": 2 },
    modules: { internal: 2 },
    missingModules: { internal: 1 },
    generatedArtifacts: {
      missing: [{ path: "packages/tsts/src/go/compat.ts" }],
      stale: [{ path: "packages/tsts/src/go/io.ts" }],
      orphan: [{ path: "packages/tsts/src/go/old.ts" }],
      untracked: [{ path: "packages/tsts/src/go/manual.ts" }],
      invalid: [{ path: "packages/tsts/src/go/bad.ts" }],
    },
  });
  assert.deepEqual(collectVerifyFailures(status), [
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
  ]);
});

test("trusted verification requires every whole-program declaration subaudit", () => {
  const status = completeVerificationStatus();
  status.signatureCheck.declarationOwnership = { state: "not-run", reason: "fixture omitted ownership" };
  assert.deepEqual(collectVerifyFailures(status), [
    "declaration ownership audit must be complete for trusted verification (not run — fixture omitted ownership)",
  ]);

  Object.assign(status, completeDeclarationAuditStatus());
  status.signatureCheck.selection = { kind: "id-filter", pattern: "m::one", matchedUnitCount: 1 };
  assert.deepEqual(collectVerifyFailures(status, {}), [
    "Go/TypeScript signature unit audit must cover all active units for trusted verification",
  ]);
});

test("blocked signature verification preserves the exact intended audit selection", () => {
  const status = completeVerificationStatus();
  const skipped = { state: "not-run", reason: "declaration prerequisites failed" };
  status.signatureCheck = {
    ...skipped,
    selection: { kind: "all-active" },
    authoredFacades: { ...skipped },
    externalPackageSurface: { ...skipped },
    typeStoragePolicies: { ...skipped },
    valueOperationProviders: { ...skipped },
    typeEquivalenceRelations: { ...skipped },
    ambientReferenceRelations: { ...skipped },
    declarationOwnership: { ...skipped },
    untrackedTypeScript: { ...skipped },
  };
  assert.doesNotThrow(() => collectVerifyFailures(status));

  delete status.signatureCheck.selection;
  assert.throws(() => collectVerifyFailures(status), /signatureCheck keys must be exactly/);
});

test("trusted verification rejects forged status envelopes and summary-only audit claims", () => {
  const extra = completeVerificationStatus();
  extra.trusted = true;
  assert.throws(() => collectVerifyFailures(extra), /Porter status keys must be exactly/);

  const countOnly = completeVerificationStatus({
    counts: { ...emptyCounts(), missing: 1, portable: 1 },
    categories: { "literal-port": 1 },
    modules: { internal: 1 },
    missingModules: { internal: 1 },
  });
  assert.throws(() => collectVerifyFailures(countOnly), /counts\.missing must equal Porter status\.missing/);

  const missingMismatchEvidence = completeVerificationStatus();
  delete missingMismatchEvidence.signatureCheck.mismatches;
  assert.throws(() => collectVerifyFailures(missingMismatchEvidence), /signatureCheck keys must be exactly/);

  const partialCompleteSubaudit = completeVerificationStatus();
  partialCompleteSubaudit.signatureCheck.declarationOwnership = { state: "complete" };
  assert.throws(() => collectVerifyFailures(partialCompleteSubaudit), /declarationOwnership keys must be exactly/);

  const accessor = completeVerificationStatus();
  Object.defineProperty(accessor.counts, "missing", { enumerable: true, get: () => 0 });
  assert.throws(() => collectVerifyFailures(accessor), /enumerable own data properties/);
});

test("verification always rejects traceable stubs", () => {
  const rows = Array.from({ length: 4 }, (_, index) => ({ id: `stub-${index}`, status: "stub" }));
  const status = completeVerificationStatus({
    counts: { ...emptyCounts(), portable: 4, stubbed: 4 },
    categories: { "literal-port": 4 },
    modules: { internal: 4 },
    rows,
  });
  assert.deepEqual(collectVerifyFailures(status), [
    "4 stub Go units",
  ]);
});
