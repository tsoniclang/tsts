import assert from "node:assert/strict";
import test from "node:test";

import {
  collectDeclarationPrerequisiteIssues,
  prepareDeclarationAuditPrerequisites,
} from "./core/declaration-prerequisites.mjs";
import { computeSignatureReport } from "./sig-check.mjs";

test("every declaration-universe prerequisite blocks before signature comparison", () => {
  const status = cleanStatus();
  status.generatedArtifacts.missing.push({
    path: "packages/tsts/src/go/compat.ts",
    reason: "compatibility declarations are absent",
  });
  status.astGeneratedArtifacts.stale.push({
    path: "packages/tsts/src/internal/ast/generated/data.ts",
    reason: "AST declarations changed",
  });
  status.sourcePin.issues.push({ path: "source-pin.json", reason: "source revision drifted" });
  status.generatedSourceCoverage.issues.push({ path: "generated-source-coverage.json", reason: "coverage is stale" });

  const issues = collectDeclarationPrerequisiteIssues(status);
  assert.deepEqual(issues.map((issue) => `${issue.category}:${issue.path}`), [
    "generated-ast-stale:packages/tsts/src/internal/ast/generated/data.ts",
    "generated-facades-missing:packages/tsts/src/go/compat.ts",
    "generated-source-coverage:generated-source-coverage.json",
    "source-pin:source-pin.json",
  ]);
  assert.throws(
    () => collectDeclarationPrerequisiteIssues({ ...status, generatedArtifacts: { ...status.generatedArtifacts, missing: null } }),
    /generated-facades\.missing must be an array/,
  );
});

test("signature audits accept only finalized workspace-derived prerequisites", async () => {
  await assert.rejects(
    prepareDeclarationAuditPrerequisites({}),
    /finalized Porter workspace state/,
  );
  await assert.rejects(
    computeSignatureReport({}, { idFilter: "fixture::*" }),
    /finalized declaration prerequisites/,
  );
});

function cleanStatus() {
  return {
    generatedArtifacts: emptyArtifacts(),
    astGeneratedArtifacts: emptyArtifacts(),
    diagnosticsGeneratedArtifacts: emptyArtifacts(),
    bundledGeneratedArtifacts: emptyArtifacts(),
    unicodeGeneratedArtifacts: emptyArtifacts(),
    sourcePin: { issues: [] },
    schemaSourceSync: { policyIssues: [], mismatches: [] },
    generatedSourcePolicies: { issues: [] },
    generatedSourceCoverage: { issues: [] },
    globalGeneratedArtifacts: { issues: [] },
    localOverrides: { invalidInline: [] },
    invalidTsMetadata: [],
    sourceInterpretationIssues: [],
    largeFileSplits: { issues: [] },
    duplicateGoIDs: [],
    duplicateTsIDs: [],
  };
}

function emptyArtifacts() {
  return { missing: [], stale: [], orphan: [], untracked: [], invalid: [] };
}
