import assert from "node:assert/strict";
import test from "node:test";

import { buildStatus, renderStatusMarkdown } from "../porter.mjs";
import { summarizeSignatureReport } from "../core/signature-command.mjs";
import { baseConfig, fileRecord, snapshotWith, unitRecord } from "./helpers.mjs";

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
  assert.match(markdown, /Signature, authored-facade, and unmatched-TypeScript audits: not run/);
  assert.match(markdown, /Go struct JSON-tag declaration audit: not run/);
  assert.doesNotMatch(markdown, /Authored facades checked\/bound methods\/Go-only\/TS-only: 0\/0\/0\/0/);
});

test("signature summaries retain audit state and every concrete inventory row", () => {
  const constructor = { file: "pkg/time.ts", memberKind: "constructor", name: "constructor", objectId: "time::type::Time" };
  const goOnlyMember = { file: "pkg/time.ts", memberKind: "method", name: "Add", objectId: "time::type::Time" };
  const methodBinding = { file: "pkg/fs.ts", methodId: "io/fs::type::FileMode::method::IsDir", objectId: "io/fs::type::FileMode", receiverName: "mode", tsName: "FileMode_IsDir" };
  const privateStorage = { file: "pkg/time.ts", memberKind: "property", name: "value", objectId: "time::type::Time" };
  const tsOnlyMember = { file: "pkg/time.ts", memberKind: "method", name: "ToDate", objectId: "time::type::Time" };
  const declaration = (name, exported, sourceVisible) => ({
    declarationHash: `${name}-hash`, exported, file: "pkg/extra.ts", fragmentIndex: 0,
    kind: "function", name, namespaces: ["value"], sourceVisible, statementIndex: 0,
  });
  const exportedDeclaration = declaration("extra", true, true);
  const privateDeclaration = declaration("helper", false, false);
  const reviewedDeclaration = declaration("reviewed", true, true);
  const reExport = {
    exported: true, file: "pkg/index.ts", kind: "re-export", name: "Time",
    namespace: "type", routeHash: "route-hash", target: "pkg/time.ts::Time",
  };
  const summary = summarizeSignatureReport({
    checked: 4,
    descriptors: 4,
    overriddenUnits: 0,
    mismatches: [],
    overrideIssues: [],
    authoredFacades: {
      checked: 2,
      constructorCount: 1,
      constructors: [constructor],
      goOnlyMemberCount: 1,
      goOnlyMembers: [goOnlyMember],
      methodBindingCount: 1,
      methodBindings: [methodBinding],
      privateStorageMemberCount: 1,
      privateStorageMembers: [privateStorage],
      tsOnlyMemberCount: 1,
      tsOnlyMembers: [tsOnlyMember],
    },
    untrackedTypeScript: {
      exportedDeclarationCount: 1,
      exportedDeclarations: [exportedDeclaration],
      privateDeclarationCount: 1,
      privateDeclarations: [privateDeclaration],
      reExportCount: 1,
      reExports: [reExport],
      reviewedDeclarationCount: 1,
      reviewedDeclarations: [reviewedDeclaration],
    },
  });
  assert.equal(summary.state, "complete");
  assert.deepEqual(summary.authoredFacades.constructors, [constructor]);
  assert.deepEqual(summary.authoredFacades.goOnlyMembers, [goOnlyMember]);
  assert.deepEqual(summary.authoredFacades.methodBindings, [methodBinding]);
  assert.deepEqual(summary.authoredFacades.privateStorageMembers, [privateStorage]);
  assert.deepEqual(summary.authoredFacades.tsOnlyMembers, [tsOnlyMember]);
  assert.deepEqual(summary.untrackedTypeScript.exportedDeclarations, [exportedDeclaration]);
  assert.deepEqual(summary.untrackedTypeScript.privateDeclarations, [privateDeclaration]);
  assert.deepEqual(summary.untrackedTypeScript.reExports, [reExport]);
  assert.deepEqual(summary.untrackedTypeScript.reviewedDeclarations, [reviewedDeclaration]);

  const markdown = renderStatusMarkdown({
    ...minimalStatus(),
    signatureCheck: summary,
    jsonTagCheck: {
      state: "complete", taggedUnits: 1, taggedFields: 2, contractUnits: 1, contractFields: 2, mismatches: 0,
    },
  });
  for (const evidence of ["Add", "ToDate", "FileMode_IsDir", "extra", "helper", "reviewed", "pkg/time.ts::Time", "route-hash"]) {
    assert.match(markdown, new RegExp(evidence));
  }
});

function minimalStatus() {
  return {
    generatedAt: "2026-07-12T00:00:00.000Z",
    source: { gitRevision: "a".repeat(40), fileCount: 0, lineCount: 0 },
    counts: {
      portable: 0, excluded: 0, implemented: 0, stubbed: 0, missing: 0, stale: 0, orphan: 0,
      forbiddenTsFiles: 0, untrackedTsFiles: 0, generatedSourcePolicyIssues: 0,
      generatedSourceCoverageIssues: 0, sourcePinIssues: 0, invalidTsMetadata: 0,
      globalGeneratedArtifactIssues: 0, sourceInterpretationIssues: 0, missingGeneratedArtifacts: 0,
      staleGeneratedArtifacts: 0, orphanGeneratedArtifacts: 0, untrackedGeneratedArtifacts: 0,
      invalidGeneratedArtifacts: 0, unresolvedGeneratedFacadeObligations: 0, missingAstArtifacts: 0,
      staleAstArtifacts: 0, orphanAstArtifacts: 0, untrackedAstArtifacts: 0, invalidAstArtifacts: 0,
      missingDiagnosticsArtifacts: 0, staleDiagnosticsArtifacts: 0, orphanDiagnosticsArtifacts: 0,
      untrackedDiagnosticsArtifacts: 0, invalidDiagnosticsArtifacts: 0, missingBundledArtifacts: 0,
      staleBundledArtifacts: 0, orphanBundledArtifacts: 0, untrackedBundledArtifacts: 0,
      invalidBundledArtifacts: 0, missingUnicodeArtifacts: 0, staleUnicodeArtifacts: 0,
      orphanUnicodeArtifacts: 0, untrackedUnicodeArtifacts: 0, invalidUnicodeArtifacts: 0,
      largeFileSplitFailures: 0, embeddedSourceMismatches: 0, schemaFilePolicyIssues: 0,
      schemaSourceMismatches: 0, unitlessGoFiles: 0,
    },
    categories: {}, rows: [], unitlessGoFiles: [], untrackedTsFiles: [], forbiddenTsFiles: [],
    generatedArtifacts: { missing: [], stale: [], orphan: [], untracked: [], invalid: [] },
    bundledGeneratedArtifacts: { missing: [], stale: [], orphan: [], untracked: [], invalid: [] },
    diagnosticsGeneratedArtifacts: { missing: [], stale: [], orphan: [], untracked: [], invalid: [] },
    excluded: [], missing: [],
  };
}
